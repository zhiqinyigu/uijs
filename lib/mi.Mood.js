MI.Mood = {
	dataString:{},		//缓存收听的心情String数据，传给flash
    curveData:{},		//缓存收听的心情数据
    place:(MI.boss && {'11':1,'13':2,'7':3}[MI.boss]) || 0,  //所在页面位置1：主页，2：我的广播，3客人页
    flashCount:0,  //递增计数，避免页面多个曲线flash，混淆
    isFloat:function(){   //返回当前是否是浮层状态
        return MI.dialog.display;  
    },
    getCurveData:function(account,callBack){
        var Self = this;
        MI.ajax({
            url:'/asyn/signList.php',
            //url:MI.url.signList,
            data:{u:account},
            success:function(sourceData){
                var data = MI.json(sourceData);
                if(data.result==0){
                	Self.dataString[account] = sourceData;
                    Self.curveData[account] = data.info;
                    if(callBack) callBack(sourceData); //传入字符串
                } 
            }
        });       
    },
    insertFlash:function(account,target){  //加载flash曲线数据
        var Self = this,flashId = 'MoodCurve';
        if(!Self.curveData[account]) Self.getCurveData(account,buildFlash);
        else buildFlash();
        
        function buildFlash(){
        	var o = Self.curveData[account];
            if(!o.total*1){ //没有签过到banner
                target.parentNode.innerHTML = '<a href="#" onclick="MI.Mood.floatBox.show(0);MI.Bos(\'btnMoodHomeBanner_0\');return false" class="bannerBG">'  + _('绘制心情曲线，分享你的喜悦悲伤。') + '<br><span>' + _('快来心情签到吧！&gt;&gt;') + '</span></a>';  
            } else if (!o.talk.length){  //近10天内没有签过到
                target.parentNode.innerHTML = '<a href="#" onclick="MI.Mood.floatBox.show(0);MI.Bos(\'btnMoodHomeBanner_1\');return false"  class="bannerBG">' + _('最近忙么？你已经有些日子没有发表心情了，<br>大家都很在乎你! ') + '<span>' + _('心情签到&gt;&gt;') + '</span></a>';
            } else {
            	Self.flashCount++;
            	flashId += Self.flashCount;
                var htmlStr = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="' + flashId + '" width="100%" height="100%" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"><param name="movie" value="http://mat1.gtimg.com/www/mb/swf/Mood.swf" /><param name="wmode" value="transparent" /><param name="quality" value="high" /><param name="align" value="middle" /><param name="allowScriptAccess" value="always" /> <embed src="http://mat1.gtimg.com/www/mb/swf/Mood.swf" quality="high" width="100%" height="100%" name="' + flashId + '" align="middle" play="true" loop="false" quality="high" wmode="transparent" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed></object>';
                target.innerHTML = htmlStr; 
                drawCurve();
            }
        }
        
        function drawCurve(){
        	clearTimeout(Self.delayDraw);
        	if(document[flashId] && document[flashId]._drawCurve) {
			//	setTimeout(function(){
                	document[flashId]._drawCurve(Self.dataString[account]);
                    Self.Bos('CurveShow');
            //	},100);   
			} else {
				Self.delayDraw = setTimeout(drawCurve,200);
			}
        }
    },
    Bos:function(eventType,moodType){  //曲线上的点，统计
        if(!eventType) return;
    	var Self = this;
        var place = Self.isFloat()? 'Box' : ['','Home','Home','Guest'][Self.place];
    	MI.Bos('btnMood' + place + eventType,moodType); 
    },
    showDetail:function(account,type,timestamp){     //日历筛选模式
    	var Self = this,
            isMe = account == MI.user.account,
            user = isMe ? (account + '/mine') : account,
            t =  new Date(timestamp*1000),
            y = t.getFullYear(),
            m = t.getMonth(),
            d = t.getDate();

    	//UI.DatePicker.daySelected(time);
        if((m + 1 + '').length == 1)  m = '0' + (m + 1);
        if((d + '').length == 1)  d = '0' + d;
    	var url = 'http://' + MI.host + '/' +  user + '?filter=9&date=' + y + m + d;
    	if(!Self.place || Self.place==1 || (Self.place==3 && Self.isFloat())){  
            window.open(url);
    	} else {
            //自己的广播页，和客人页的客人日历，才当前页跳转  
            location.href = url;
    	}
    	return false;
    }
};

window['_flash_Mood_Bos'] = function(e,t){
	MI.Mood.Bos(e,t);
}	
window['_flash_Mood_calendar'] = function(u,t,d){
	MI.Mood.showDetail(u,t,d);
}
/**
 * 打开签到浮层
 *
 * @param {Number} type 要显示的浮层选项卡，0表示签到，1表示收听的心情
 *
 *  @example
 *		MI.Mood.floatBox.show(0);
 *
 */
MI.Mood.floatBox = (function(){
        var ico_50 = 'http://mat1.gtimg.com/www/mb/images/tFace/';
        var ico_20 = 'http://mat1.gtimg.com/www/mb/images/tFace/';
        var html = '<div class="DshareWrap">\
                            	<div class="tabStyle1 shareTitle">\
                                	<ul>\
                                    	<li class="select"><a href="#">' + _('心情签到') + '</a></li>\
                                        <li><a href="#">' + _('最新心情') + '</a></li>\
                                    </ul>\
                                </div>\
                                <div class="temper wMood">\
                                	<div style="display:none;"><p class="guide"></p></div>\
                                	<dl class="clear">\
                                    	<dt>' + _('选择心情：') + '</dt>\
                                        <dd class="temperList">\
                                        	<a title="' + _('狂喜') + '" href=""><img alt="" src="' + ico_50 + '01_50.gif"><em></em></a>\
                                            <a title="' + _('偷乐') + '" href=""><img alt="" src="' + ico_50 + '02_50.gif"><em></em></a>\
                                            <a title="' + _('无感') + '" href=""><img alt="" src="' + ico_50 + '03_50.gif"><em></em></a>\
                                            <a title="' + _('伤心') + '" href=""><img alt="" src="' + ico_50 + '04_50.gif"><em></em></a>\
                                            <a title="' + _('咆哮') + '" href=""><img alt="" src="' + ico_50 + '05_50.gif"><em></em></a>\
                                        </dd>\
                                    	<dt>' + _('抒发情绪：') + '</dt>\
                                        <dd><textarea id="tempertext" class="tempertext inputArea textarea" style="border-color: rgb(206, 206, 206);"></textarea></dd>\
                                        <dt></dt>\
                                        <dd><p class="btnBox" style="float:none;"><button class="tsendBtn" style="float:right;">' + _('广播') + '</button>\
                                        <span class="countTxt" style="height:33px;">' + _('还能输入<em>140</em>字') + '</span></p></dd>\
                                        <dt class="lastMLabel" style="display:none;">' + _('最近心情：') + '</dt>\
                                        <dd class="lastMCont" style="display:none;"></dd>\
                                        </dl>\
                                </div>\
                        <div class="temper rMood" style="display:none;">\
                                	<div class="recent">\
                                    	<span class="recentTitle"></span>\
                                        <a class="select" href="">' + _('全部') + '<em></em></a>\
                                        <a href=""><img class="temperPic20" alt="" src="' + ico_20 + '01_20.gif"><em></em></a>\
                                        <a href=""><img class="temperPic20" alt="" src="' + ico_20 + '02_20.gif"><em></em></a>\
                                        <a href=""><img class="temperPic20" alt="" src="' + ico_20 + '03_20.gif"><em></em></a>\
                                        <a href=""><img class="temperPic20" alt="" src="' + ico_20 + '04_20.gif"><em></em></a>\
                                        <a href=""><img class="temperPic20" alt="" src="' + ico_20 + '05_20.gif"><em></em></a>\
                                    </div>\
                                    <div class="temperConList">\
                                        <ul>\
                                        </ul>\
                                    </div>\
                                    <div class="pages">\
                                    </div>\
                                </div>\
                     <div class="temper success" style="display:none;">\
                                    <div class="talkSuc" style="">\
                                    	<span class="ico_tsW"><span class="ico_ts"></span></span><span class="msg">' + _('广播成功！') + '</span>\
                                    	<p><a href="#" class="lookOther">' + _('查看其他人的心情') + '</a></p>\
                                    </div>\
                                    <div class="temperFlash">\
                                    	<p><a href="http://t.qq.com/' + MI.user.account + '/mine?filter=9" target="_blank" onclick="MI.Bos(\'btnMoodBoxCurveLink\')"><span>' + _('心情曲线：') + '</span></a>' + _('每日心情签到，绘制你的专属心情曲线！') + '</p>\
                                    	<div class="flashWrap" style="height:100px;"></div>\
                                    </div>\
                                </div>\
                     </div>';           
            
            var _body,_wTab,_rTab,_wMood,_rMood,_sMood,_guide,_mList,_talkBox,_lastMLabel,_lastCont,_lookOther,
            	_send,_count,_flashWrap,_rTitle,_rList,_rMoodList,_page;
            	
            var wType=0;
            var typeArr = [1,2,4,8,16];
            var published = 0;
            var rType=0;
            var currData;       //当前心情数据
            var userType = 'undefined';   //是收听的人还是随机
            var moodCache = {};  //心情数据缓存
            var SHOW_NUM = 6;  //一页显示的心情数目
            var typeArr2 = [0,1,2,4,8,16];
            //var strObj = {'1':'05','2':'04','4':'03','8':'02','16':'01'} //表情图片序号
            var u = MI.user.account;
            var today = new Date();
            	
            	
            function buildBody(){
            	if(!_body) {
		             _body = UI.html(html)[0];
		             _wTab = $$(_body,'.shareTitle a')[0];
		             _rTab = $$(_body,'.shareTitle a')[1];
		             _wMood = $$(_body,'.wMood')[0];            
		             _rMood = $$(_body,'.rMood')[0];
		             _sMood = $$(_body,'.success')[0];
		             _guide = $$(_wMood,'.guide')[0];
		             _mList = $$(_body,'.temperList a'); //心情种类
		             _talkBox = $$(_body,'.tempertext')[0];
		             _lastMLabel = $$(_body,'.lastMLabel')[0];
		             _lastMCont = $$(_body,'.lastMCont')[0];
		             _lookOther = $$(_body,'.lookOther')[0];
		             _send = $$(_body,'.tsendBtn')[0];
		             _count = $$(_body,'.countTxt')[0];
                     _flashWrap = $$(_body,'.flashWrap')[0];
	
		   	         _rTitle = $$(_body,'.recentTitle')[0];
		             _rList = $$(_body,'.recent a');  //心情种类
		             _rMoodList = $$(_body,'.temperConList')[0];
		             _page = $$(_body,'.pages')[0];	
	            } 
	            return _body
            }    
 
            function selectCurr(list,curr){
                UI.each(list,function(o,i){
                    UI.removeClass(o,'select');
                    if(i==curr) UI.addClass(o,'select');
                })
            }
            
            //选择wording
            function showWording(){
                if(!MI.Mood.curveData[u]) {
                    MI.Mood.getCurveData(u,toggleWording);
                } else {
                    toggleWording();
                };
                showWording = function(){};
            }

            function toggleWording(){
                var oldMoods = MI.Mood.curveData[u].talk;
                var total = MI.Mood.curveData[u].total;
                var P = _guide.parentNode;
                if(total<=3){
                    _guide.innerHTML = _('今天心情怎么样？选个心情，记录下你的心情点滴吧~');
                    UI.addClass(P,'relayList');    
                } else {
                    UI.addClass(P,'guide02');
                    _guide.innerHTML = [
                        _('今天，你开心么？'),
                        _('今天遇上什么事了？'),
                        _('每日心情调频，今天的你在哪个波段？'),
                        _('记录每日微心情'),
                        _('抓拍下你的心情吧'),
                        _('Mark 一下今天的心情吧'),
                        _('为每天的心情留个爪~')
                        ][today.getDay()];
                }
                UI.show(P);

                if(total>0) {
                    var o = oldMoods[0];
                    _lastMCont.innerHTML = '<a href="#">' + o.content + '</a>';
                    UI.show(_lastMLabel);
                    UI.show(_lastMCont);
                    _lastMCont.onclick = function(){
                        MI.Mood.showDetail(u,o.sign,o.timestamp);
                        MI.Bos('btnMoodBoxCurrent');
                        return false;
                    }
                }
            };
            //计算字数
            function countTxt(){
                var n = MI.string.length(_talkBox.value);
                if(n<=280) {
                    _count.innerHTML = _('还能输入<em>{0}</em>字',Math.floor((280-n)/2));
                    return true;
                } else {
                    _count.innerHTML = _('超出<em class="error">{0}</em>字',Math.ceil((n-280)/2));
                    return false;
                }

            };
            //显示错误提示
            function setTip(str){
                _count.innerHTML = '<span class="error">' + str + '</span>';
            };
            //发布前检查
            function checkPublish(){   
                if(!wType) {
                    setTip(_('请选择一个心情'));
                    MI.Bos('btnMoodWriteNoType');
                    return false;
                }
                if(!UI.trim(_talkBox.value)) {
                    setTip(_('为心情写点话吧'));
                    MI.Bos('btnMoodWriteNoCont');
                    return false;
                }  
                return true;
            }
            //切换选项卡
            function switchBox(n){
                if(published && n==0) n = 2; 
                UI.each([_wMood,_rMood,_sMood],function(o,i){
                    UI.hide(o);
                    if(n==i) UI.show(o);
                });
                if(n==0) showWording();
                if(n==1) showMoodList(rType);
                if(n==2 && !UI.B.ie) MI.Mood.insertFlash(u,_flashWrap);
            }
            //切换选项卡样式
            function switchTab(n) {
                UI.each([_wTab,_rTab],function(o,i){
                    if(n==i) UI.addClass(o.parentNode,'select');
                    else UI.removeClass(o.parentNode,'select');
                });
            }
            //发布心情
            function publish(){
                if(!(countTxt() && checkPublish())) return;
                MI.dialog.showLoad();
                MI.ajax({
                    url:MI.url.talkPublish,
                    data:{emotion:wType,content:_talkBox.value},
                    success:function(data){
                        MI.dialog.hideLoad();
                        data = MI.json(data);
                        if(data.result==0){
                            MI.Mood.curveData[u] = null;  //清除之前的数据，重新拉取
                            switchBox(2);
                            published = 1;  //今日已发表过
                            setTimeout(function(){
                                if(UI.B.ie) MI.Mood.insertFlash(u,_flashWrap);
                            },100);
                        } else {
                            setTip(data.msg);
                        }
                    }
                })
            };
            
            //显示收听的心情列表100条
            function showMoodList(type){
                if(moodCache[type + '_' + userType]) {          
                    buildList(moodCache[type + '_' + userType]);
                    return;
                }
                if(userType === 'undefined') _rTitle.parentNode.style.visibility = 'hidden';
                MI.dialog.showLoad();
                MI.ajax({
                    url:'/asyn/friendSigns.php',
                    //url:MI.url.friendSigns,
                    /*
                    {result:0,msg:'','info':{'user':'haierer','hasNext':1,'time':1309352680,'talk':[{"id":"55017111981143","content":"dsfsdfds","image":[],"time":"6\u670824\u65e5 17:17","type":1,"sign":16,"status":0,"from":"\u6765\u81ea\u7f51\u9875<\/span>","tran":0,"name":"bullnba","nick":"\u8def\u4eba","bkname":"","icon":"","flag":[],"pic":"http:\/\/t2.qlogo.cn\/mbloghead\/8aafbfdf6bef9c145a0e\/50","count":0,"counts":[0,0,0],"timestamp":1308907067}]}}
                     */
                    data:{t:rType,ut:userType,index:0,num:100},
                    success:function(data){
                        MI.dialog.hideLoad();
                        _rTitle.parentNode.style.visibility = 'visible';
                        data = MI.json(data);
                        if(data.result==0){
                            userType = data.info.ut;
                            moodCache[type + '_' + userType] = data.info;
                            buildList(moodCache[type + '_' + userType]);
                        }
                    }
                })
            }
            

            //初始化列表
            function buildList(o){
                currData = o;
                var num = o.talk.length;
                _rTitle.innerHTML = (userType == 0) ? _('我收听的人的最新心情签到：') : _('{0}条最新心情签到：',num);
                if(!num) {
                    _rMoodList.innerHTML = '<p class="empty">' + _('最近没有人发表此心情') + '</p>';
                    return;
                }   
                createPage(num,0);
                createList(0,SHOW_NUM);
            }
            
            //创建列表
            function createList(start,end){
                var str = '<ul>',o,src,len,date,y,m,d,time;
                for(i=start;i<end;i++){
                    o = currData.talk[i];
                    if(!o) continue;
                    //src = strObj[o.sign];

                    date = new Date(o.timestamp*1000);
                    y = date.getFullYear();
                    m = date.getMonth();
                    d = date.getDate();
                    if(m == today.getMonth() && d == today.getDate()){
                        time = date.getHours() + ':' +  date.getMinutes();  //是今天则显示时间
                    } else {
                        time = (m + 1) + _('月') + d + _('日');  //不是今天 显示日期
                    }
                    if((m + 1 + '').length == 1) m = '0' + (m + 1);
                    if((d + '').length == 1) d = '0' + d;
                    

                    len = 90 + 54 - MI.string.length((o.bkName || o.nick) + time);  //90是心情图片img标签的html字段长
                    var url = 'http://' + MI.host + '/' + o.name + '?filter=9&date=' + y + m  + d;
                    str += '<li><a target="_blank" href="' + url + '" onclick="MI.Bos(\'btnMoodBoxLookSingle\')">';
                    str += '<img class="userPic" src="' + o.pic.replace(/\/50$/,'/20') + ' />';
                    str += '<p class="temperCon" title="' + o.content + '">' + (o.bkName || o.nick);
                    //str += '<img class="temperPic20" src="' + ico_20  + src + '_20.gif" />';
                    str +=  MI.string.cut(o.content,len) + '</p>';
                    str += '<span class="time" rel="' + o.timestamp +'" title="' + '' + '">' + time + '</span>';
                    str += '</a></li>';
                }
                str += '</ul>';
                _rMoodList.innerHTML = str;
            }
            
            //翻页
            function createPage(num,pn){
                //都从0计算
                var p = Math.ceil(num/SHOW_NUM);
                var str = '';
                //if(pn!=0) str += '<a href="#" p="' + (pn-1) + '">' + _('上一页') + '</a>';
                str += pn==0 ? '<span class="gray">' + _('上一页') + '</span>' : '<a href="#" p="' + (pn-1) + '">' + _('上一页') + '</a>';
                for(i=0;i<p;i++){
                    str +=(pn == i) ? ('<strong style="margin-left:5px;">' + (i+1) + '</strong>') :('<a href="#" p="' + i + '">' + (i+1) +  '</a>');
                };
                //if(pn!=p-1) str += '<a href="#" p="' + (pn+1) + '">' + _('下一页') + '</a>';
                str += pn==p-1 ? '<span class="gray">' + _('下一页') + '</span>' : '<a href="#" p="' + (pn+1) + '">' + _('下一页') + '</a>';
                _page.innerHTML = str;

                UI.each(UI.GT(_page,'a'),function(o,j){
                    o.onclick = function(){
                        var n = parseInt(UI.A(this,'p'));
                        createList(n*SHOW_NUM,(n+1)*SHOW_NUM);
                        createPage(num,n);
                        return false;
                    }
                })
            }
                    
            function bindEvent(){
                UI.each(_mList,function(o,i){
                    o.onclick = function(){
                        selectCurr(_mList,i);
                        setTip(' ');
                        wType = typeArr[i];
                        return false;
                    };
                })

                UI.each([_wTab,_rTab],function(o,i){
                    o.onclick = function(){
                        if(!UI.hasClass(o,'select')) {
                            switchTab(i);
                            switchBox(i);
                            MI.Bos(i==0 ? 'btnMoodBoxWriteTab':'btnMoodBoxLookTab');
                        }
                        return false;
                    }
                });
                
                UI.each(_rList,function(o,i){
                    o.onclick = function(){
                        selectCurr(_rList,i);
                        rType = typeArr2[i];
                        showMoodList(rType);
                        MI.Bos('btnMoodBoxLookFilter_' + rType);
                        return false;
                    };
                })
                
                _lookOther.onclick = function(){
                    switchTab(1);
                    switchBox(1);
                    MI.Bos('btnMoodBoxLookOther');
                    return false;
                }
                _talkBox.onkeyup = countTxt;
                _send.onclick = publish;
            }    

            function show(type){
                MI.dialog.show({
                    title:'<h1 class="DmainTit"></h1>',
                    html:buildBody(),
                    width:460,
                    start:function(){
                        //根据type，显示对应的tab
                        type = type || 0;
                        if(type==0 && published) type=1; //如果今天签过到，签到层改收听层 
                        switchTab(type);
                        switchBox(type);
                        bindEvent(); 
                    }
                });
            };
            
            return {
                show:show
            }           
})();
