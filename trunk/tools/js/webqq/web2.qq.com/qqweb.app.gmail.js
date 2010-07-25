/* 消息盒子 App
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * 2010-3-12
 **/
//qqweb.portal.runApp("messageBox", {});
qqweb.app.gmail = new qqweb.businessClass.App(qqweb.portal.getAppConfig('gmail'));
/*{
	id : "messageBox",
	title:"消息盒子"
});
*/
var Qmail={};

Jet().$package("qqweb.app.gmail", function(J){
	var $D = J.dom,
		$E = J.event,
		$S = J.string,
		packageContext = this,
		g_user,
		g_pass,
		//保存所有 element 引用
		gmailEls,
		loadMailTimer,
		html='\
<div id="qwGmail" class="gmailPanel">\
	<div id="qwGmailTwitterTip" ></div>\
	<div class="messdetail" id="qwGmailPanel">\
                <div class="mailLogo">\
                    <div class="mailOwner"><strong id="qwGmailOwner"></strong>　<a href="#" class="link" id="qwGmailExit">退出</a></div>\
                </div>\
                <div class="infos clearfix">\
                        <strong>未读邮件(<span class="infos_mail_tips">共<span id="qwGmailCount">0</span>封，当前显示<span id="qwGmailCountDis">0</span>封</span>)</strong>\
                        &nbsp;&nbsp;&nbsp;&nbsp;<a class="link" href="http://mail.google.com/" target="_blank">查看全部</a>\
                        &nbsp;&nbsp;&nbsp;&nbsp;<!--<span class="refresh button" >--></span><a href="#" id="qwGmailRefreshBtn"  class="link" title="刷新">刷新</a>\
                </div>\
                <div id="qwGmailArea"  class="messageArea">\
                        <div class="weakTips mailTips">您目前还没有未读邮件，<a  target="_blank" href="http://mail.google.com">进入我的Gmail邮箱</a></div>\
                        <ul class="clearfix"></ul>\
                </div>\
	</div>\
        <div class="gmailLogin" id="qwGmailLogin">\
            <div class="loginLogo"></div>\
            <div class="loginBorder">\
                <div class="loginForm" style="font-size: 14px; padding: 10px;">\
                    <div style="font-size: 16px; padding-top: 10px; padding-bottom: 10px">Google 账户</div>\
                    <div style="padding-left: 20px; padding-top: 10px; padding-bottom: 0px">用户名： <input type="text" id="qwGmailUser" style="padding: 3px;" /></div>\
                    <div style="padding-left: 20px; padding-top: 10px; padding-bottom: 10px">密　码： <input type="password" id="qwGmailPass" style="padding: 3px;"  /></div>\
                    <div style="padding-top: 5px;">　　　　　　<input type="button" value="登录" id="qwGmailSubmit" style=" width:90px;padding-left:20px; padding-right: 20px;" /></div>\
                </div>\
            </div>\
        </div>\
</div>';
		
	var onWindowCreate = function(){

		this.window.setHtml(html);

		var qwGmailArea=$D.id("qwGmailArea");

                gmailEls = {
                    owner: $D.id("qwGmailOwner"),
                    exit: $D.id("qwGmailExit"),
                    user: $D.id("qwGmailUser"),
                    pass: $D.id("qwGmailPass"),
                    submit: $D.id("qwGmailSubmit"),
                    login: $D.id("qwGmailLogin"),
                    panel: $D.id("qwGmailPanel"),
                    count: $D.id("qwGmailCount"),
                    countDis: $D.id("qwGmailCountDis"),
                    area: $D.id("qwGmailArea"),
                    refreshBtn: $D.id("qwGmailRefreshBtn"),
                    noMsgTip: qwGmailArea.getElementsByTagName('div')[0],
                    list: qwGmailArea.getElementsByTagName('ul')[0],
                    yellowTip: $D.id("qwGmailTwitterTip")
                };
		$E.on(gmailEls.refreshBtn, "click", onMailRefreshButtonClick);
        $E.on(gmailEls.submit,'click', onSubmitClick);
		$E.on(gmailEls.exit, "click", onMailExitButtonClick);
		$E.on(gmailEls.pass, "keyup", onMailPwdKeydown);
		
//		$E.on(msgboxFriendAreaBtnEl, "click", onMsgAreaOptionBtnClick);
//		$E.on(msgboxGroupAreaBtnEl, "click", onMsgAreaOptionBtnClick);
//		$E.on(msgboxSystemAreaBtnEl, "click", onMsgAreaOptionBtnClick);
//		$E.on(msgboxMailAreaBtnEl, "click", onMsgAreaOptionBtnClick);
//      	
//		$E.on(msgboxFriendBtnEl, "click", onMessageButtonClick);
//		$E.on(msgboxGroupBtnEl, "click", onMessageButtonClick);
//		$E.on(msgboxSystemBtnEl, "click", onMessageButtonClick);
//		$E.on(msgboxMailBtnEl, "click", onMessageButtonClick);
		
		// 注册为消息到达的观察者
//		$E.addObserver(EQQ, "MessageReceive", onMessageReceive);
//		$E.addObserver(EQQ, "SystemMessageRecive", onSystemMessageRecive);
//		$E.addObserver(EQQ, "AdderShow", onAdderShow);
//		$E.addObserver(EQQ, "ChatBoxShow", onChatBoxShow);
//		$E.addObserver(EQQ, "sysMsgMySignaTips", onSysMsgMySignaTips);//如果其他地方已经响应查看好友评论签名

		
	};
	
	var onRun = function(){
		if(g_pass && g_user) {
			J.out("Running...have pass and user");
			$D.show(gmailEls.panel);
			$D.hide(gmailEls.login);
	        getLoginMailInfo();
		}
		else {
			$D.show(gmailEls.panel);
			$D.hide(gmailEls.login);
	        getLoginMailInfo();			
		}
	};
	
	var showTips = function(str) {
		var tip_container= gmailEls.yellowTip;
		var _node= $D.node("div",{"class":"qwGmailTwitterTip"});
		_node.innerHTML= str;
		_node.style.top= 0;
		tip_container.appendChild(_node);
		var height= parseInt($D.getStyle(_node, "height")); 
		var frame= 15;
		setTimeout(function(){
			for(var i=1;i<frame+1;i++) {
				(function(){
					var j= i;
					setTimeout(function() {
						$D.setStyle(_node,"top",-(height/frame*j)+"px");
						if(j==frame) {
							tip_container.removeChild(_node);
						}
					},60*i);
				})();
			}
		},3000);
	};
	
	var onSubmitClick = function(){
            var user = gmailEls.user.value;
            g_user = user;
            var pass = gmailEls.pass.value;
            g_pass = pass;
            if (user != '' && pass != '') {
                $D.show(gmailEls.panel);
                $D.hide(gmailEls.login);
                getLoginMailInfo(user, pass);
            } else {
                showTips("请正确输入");
            }
	};
	
	var onMailRefreshButtonClick = function(){
		$D.show(gmailEls.panel);
		$D.hide(gmailEls.login);
        getLoginMailInfo();
	};
	var onMailExitButtonClick = function(){
            var uri = "/index.php?r=dao/default/clear";
            J.http.ajax(uri + "&webqq_t="+(new Date().getTime()),{
                onSuccess : function(o){
                }
            });
            g_user = null;
            g_pass = null;
            $D.hide(gmailEls.panel);
            $D.show(gmailEls.login);
            gmailEls.count.innerHTML = 0;
            gmailEls.countDis.innerHTML = 0;
            gmailEls.owner.innerHTML = '';
            gmailEls.user.value= '';   
            gmailEls.pass.value= '';
	};
	var onMailPwdKeydown = function(evt){
		if(evt.keyCode==13 && gmailEls.login.value!=""){
			onSubmitClick();
		}
	};
	//获取邮箱的登陆情况
	var getLoginMailInfo= function(u, p){
		gmailEls.noMsgTip.innerHTML='<div class="loading">载入中...</div>';
		$D.show(gmailEls.noMsgTip);
		$D.hide(gmailEls.list);
        getMail(u, p);
	};
	
	//获取mail列表数据
    var getMail= function(u, p)
    {
        //var uri = "/index.php?r=dao";
        var uri = "/cgi/gmail";
        var arg = null;
        if (u != null && p != null) {
            uri = uri + "?u=" + encodeURIComponent(u) + "&p=" + encodeURIComponent(p);
        }
    	J.http.ajax(uri + "&webqq_t="+(new Date().getTime()),{
				onSuccess : function(o){
								if(o.responseText) {
	                                  eval("var data = " + o.responseText +";");
	                                  listMail(data);
								}
								else {
									listMail({});
								}
				}
		});
    };
    var onMailChangeClick = function(msg, evt) {
        $D.show(gmailEls.login);
        $D.hide(gmailEls.panel);
    }
    var onMailMsgLiClick = function(msg,evt){
    	evt.preventDefault();
		window.open(msg,"_s","");
    };
    
    var removeMailMsg = function(aMsg){
    	var msgElList = msgboxEls.mail.msgElList;
		msgboxEls.mail.msgUl.removeChild(aMsg.el);
		$E.off(aMsg.el,'click');
		
		if(msgElList.length == 0){
			msgboxEls.mail.noMsgTip.innerHTML='您目前还没有未读邮件，<a  target="_blank" href="'
				+ qqweb.CONST.QMAIL_SERVER_DOMAIN +'cgi-bin/login?fun=passport&from=webqq">进入我的QQ邮箱</a>';
			$D.show(msgboxEls.mail.noMsgTip);
			$D.hide(msgboxEls.mail.msgUl);
		}
		updateMsgCount();

		delete aMsg;
    };
    
    var addMailMsg = function(msg){
		var msgElList = gmailEls.list; 

		var liNode=document.createElement('li');
		$D.addClass(liNode,'message');
		msgElList.appendChild(liNode);
		liNode.innerHTML='\
			<div class="time">'+msg.day+'   '+msg.time+'</div>\
			<div class="from" ><span class="icon mail"></span><span class="name">'+msg.author+'</span></div>\
			<div class="msgbody">\
				<span class="title">'+msg.title+'</span>\
				<span class="content" > - '+msg.summary+'</span>\
                </div>';
        $E.on(liNode,'click',J.bind(onMailMsgLiClick, this, msg.link));
		
    };
    
     //添加mail列表
    var listMail= function(data)  {
        if(data.c == '200') {
            gmailEls.count.innerHTML = data.d.count;
			data.d.entry = data.d.entry || [];
            gmailEls.countDis.innerHTML = data.d.entry.length;
            gmailEls.owner.innerHTML = data.d.owner;
            if (data.d.count > 0) {
            	gmailEls.list.innerHTML = '';
                for (var i=0; i<data.d.entry.length; i++) {
                    addMailMsg(data.d.entry[i]);
                }
                $D.hide(gmailEls.noMsgTip);
                $D.show(gmailEls.list);
            } else if (data.d.count == 0) {
                showTips('您目前还没有未读邮件，<a  target="_blank" href=" \
                http://mail.google.com">进入我的Gmail邮箱</a>');
                $D.show(gmailEls.noMsgTip);
                $D.hide(gmailEls.list);
            } else {
                showTips('对不起，系统无法获取Gmail信息，\
                  请您检查您的Gmail账号信息输入是否正确, 或者尝试刷新');
				$D.hide(gmailEls.panel);
				$D.show(gmailEls.login);
            }
        }
        else {
                showTips('对不起，系统无法获取Gmail信息，\
                  请您检查您的Gmail账号信息输入是否正确, 或者尝试刷新');
	            var uri = "/index.php?r=dao/default/clear";
	            J.http.ajax(uri + "&webqq_t="+(new Date().getTime()),{
	                onSuccess : function(o){
	                }
	            });
				$D.hide(gmailEls.panel);
				$D.show(gmailEls.login);
				g_pass= null;
				g_user= null;
        }
    };

	
    
	this.exit = function(){
		this.window.min();
	};
	

	
	$E.addObserver(this, "runFirst", onWindowCreate);
	
	$E.addObserver(this, "run", onRun);
	
});
		

