//引入微博命名空间
MI.WebQQ = {};
(function(){
        var id= function(id) {
        	return document.getElementById(id);
        }
        var on= window.attachEvent?function(d,e,f){
            d.attachEvent('on'+e, f);
        }:function(d,e,f){
            d.addEventListener(e, f, false);
        };
        var off= window.attachEvent?function(d,e,f){
            d.detachEvent('on'+e, f);
        }:function(d,e,f){
            d.removeEventListener(e, f, false);
        };
        /*
         * img内存池
         */
        var newImagePoll= new Array(15);
        var createImageFromPoll= function(src) {
            var now= (new Date()).getTime(), len= newImagePoll.length;
            for(;len--;) {
                var atom= newImagePoll[len];
                if(!atom) {
                    atom= {img:(new Image()),timestamp:now};
                    var img= atom.img;
                    on(img,"load",function(){atom.timestamp=0;});
                    on(img,"error",function(){atom.timestamp=0;});
                    img.src= src+"&t="+(new Date()).getTime();
                    break;
                }else if(atom.timestamp+imgTimeout*1000<now) {
                    atom.timestamp= now;
                    atom.img.src= src+"&t="+(new Date()).getTime();
                    break;
                }
            }
        };
        /**
         * api for WeiBo 
         * 保存发起对话参数队列
         */
        MI.WebQQ.chatQueue= [];
        /**
         * api for WeiBo 
         * 在JS文件加载后使用参数队列打开对话窗
         */
        MI.WebQQ.chat= function(id,nick,avatar){
            MI.WebQQ.chatQueue.push([].slice.call(arguments));
            addEQQMainJs();
        };
        /**
         * 上报api
         * ID: 151289    名称：allinone窗口打开次数(从无到有)
         * ID: 151290    名称：微博临时会话icon点击
         * ID: 151291    名称：allinone添加好友
         * ID: 151292    名称：allinone发送信息离线
         * ID: 151293    名称：allinone发送信息成功
         * ID: 151294    名称：allinone发送信息失败
         * ID: 151295    名称：用户禁用
         * url: http://tj.qstatic.com/getlog?m=1$123456&t=1309748658273
         */
        MI.WebQQ.report2m= function(id) {
            var url= "http://tj.qstatic.com/getlog?m=1$";
            createImageFromPoll(url+id);
        };

        var sa= "setAttribute";
        //http://mat1.gtimg.com/www/mb/js/
        //http://mat1.gtimg.com/www/mb/css/webqq/ 对应public\style\default\
        var EQQ_MAIN_URL= "http://mat1.gtimg.com/www/mb/";
        var EQQ_STYLE_URL= "http://mat1.gtimg.com/www/mb/css/webqq/"; //"http://t.www.qq.com/style/default/"
        var PRE_LOAD_CSS_URL =EQQ_STYLE_URL+"eqq.pre.load_110621.css";
        var FULL_LOAD_CSS_URL =EQQ_STYLE_URL+"eqq.main_110621.css";
        var FULL_LOAD_JS_URL = MI.version.WebQQFull;

        var head = document.getElementsByTagName("head") ? document.getElementsByTagName("head")[0] : document.documentElement,
            linkCss = document.createElement("link");
        linkCss[sa]("id","EQQ_Pre_SkinCss");
        linkCss[sa]("type","text/css");
        linkCss[sa]("charset","utf-8");
        linkCss[sa]("rel","stylesheet");
        linkCss[sa]("href",PRE_LOAD_CSS_URL);
        head.appendChild(linkCss);
        var container;
        if(id("EQQ_Container")) {
            container= id("EQQ_Container")
        }else {
            container = document.createElement("div");
            container.id="EQQ_Container";
            container.style.cssText= "position:fixed;right:275px;bottom:0;_position:absolute;_top:expression(documentElement.scrollTop+documentElement.clientHeight-this.offsetHeight);_left:expression(documentElement.scrollLeft+documentElement.clientWidth-this.offsetWidth-275);z-index:6000;border:0 solid red;font:12px/1.5 tahoma,helvetica,clean,sans-serif;color:#333;";
        }
        container.innerHTML = '\
                <div id="EQQ_MainBar" class="EQQ_mainBar">\
                        <div id="EQQ_StartButton" class="EQQ_startButton" title="'+_("点击登录微博聊天")+'">\
                            <div id="EQQ_StartButtonIcon" class="EQQ_startButtonIcon"><!--WebQQ logo--></div>\
                            <!--<div id="EQQ_InfoShow" class="EQQ_infoShow">'+_("在线聊天")+'</div>-->\
                        </div>\
                        <!--\
                        <div id="EQQ_lock" class="EQQ_lock" >\
                            \
                        </div>\
                        <div id="EQQ_MsgBoxButton" class="EQQ_msgBoxButton" href="###" title="'+_("消息盒子")+'">\
                            <img id="EQQ_AvatarInMsgBoxButton" class="EQQ_avatarInMsgBoxButton" src="http://imgcache.qq.com/ac/b.gif" />\
                            <div class="unreadMsgInMsgBoxButton">\
                                (<span id="EQQ_MsgCounterInMsgBox" title="'+_("未读消息")+'">99</span>)\
                            </div>\
                        </div>\
                        -->\
                        <!--<div class="EQQ_mainBar_bg_outer"><div class="EQQ_mainBar_bg"></div></div>-->\
                </div>\
                <!--\
                <div id="EQQ_CustomBar" class="EQQ_customBar">\
                    <div class="EQQ_rightBorder">'+_("右侧")+'</div>\
                    <div id="EQQ_CustomContainer" class="EQQ_customContainer"></div>\
                </div>\
                -->\
                <div id="EQQ_TaskBar" class="EQQ_taskBar">\
                    <div id="EQQ_Line_1" class="EQQ_line"><!--'+_("分割线")+'--></div>\
                    <div id="EQQ_ExtendButton" class="EQQ_noExtendButton"><div class="EQQ_extendButton_bg"><!--'+_("左右收缩按钮")+'--></div></div>\
                    <div id="EQQ_ChatBuddyList" class="EQQ_chatBuddyList">\
                    </div>\
                </div>\
        ';
        
        document.body.appendChild(container);
        
        id("EQQ_MainBar").style.display="block";
        
        var startButton=id("EQQ_MainBar");
        on(startButton, "mousedown", addEQQMainJs);
        
        var requestLock= false;
        function addEQQMainJs(){
        	if(!requestLock) {
        		requestLock= true;
                // 动态加载JS
                var js= document.createElement("script"),
                    linkCss= document.createElement("link");
                linkCss[sa]("id","EQQ_SkinCss");
                linkCss[sa]("type","text/css");
                linkCss[sa]("charset","utf-8");
                linkCss[sa]("rel","stylesheet");
                linkCss[sa]("href",FULL_LOAD_CSS_URL);
                head.appendChild(linkCss);
                js[sa]("type","text/javascript");
                js[sa]("src",FULL_LOAD_JS_URL);
                document.body.appendChild(js);
                off(startButton, 'mousedown', addEQQMainJs); 
                //15秒后解锁
                setTimeout(function(){requestLock=false;},15000);
        	}
        };
        
        //如果权限打开 则自动加载文件
        //否则通过手工点击打开。
        if(MI.user.fun.chat) {
            //if( (MI.user.medal[0] && MI.user.medal[0]>=3) || UI.cookie("mb_chat")) {
                addEQQMainJs();
            //}
        }else {
        	var start= id("EQQ_StartButton");
        	if(start) {
        		start[sa]("title",_("点击开启微博聊天功能"))
        	}
                id("EQQ_StartButtonIcon").className= "EQQ_startButtonIconForbidden";
        }
})();