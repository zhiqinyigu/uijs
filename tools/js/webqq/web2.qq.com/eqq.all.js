/* == EQQ 模块 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2009.11.17 ----- */


//qqweb.app.eqq = new qqweb.businessClass.App(qqweb.portal.getAppConfig('eqq'));

var EQQ = qqweb.app.eqq;



Jet().$package("EQQ", function(J){
	var packageContext = this,
		$D = J.dom,
		$E = J.event,
		$C = J.cookie,
		$H = J.http;
	
	var isInit = false;
	var isChatting = false;
	var tidList = {};

	//var isLogin = false;
	var needPollFlag = false;
	var hasCloseHook = false;
	var dName;
	dName = window.location.host || "jetyu.qun.qq.com";
	J.out(">>dName: "+dName);
	
	//判断是否登录，否则显示登录界面
	this.showLogin = function(option){ 
			option = option || {};			 
			// EQQ 初始化
			if(!$C.get("ptwebqq") || qqweb.portal.getLoginLevel() < 3 ){
				//如果没有这个cookies不尝试登录，直接跳登录				 
				qqweb.portal.showLoginWindow("eqq");
				
				return;
			}
			 
			EQQ.init2({
				panel: {
					myPanel: qqweb.layout.getPanel("qqBar").body,
					mainPanel: EQQ.getSideBar().body,//qqweb.layout.sideBar.body,
					mainBar: qqweb.layout.getPanel("statusBar").body,
					taskBar: qqweb.layout.getPanel("taskBar").body
				}
			});	
	 };
		
		
	var observer = {
		/*onRun : function(uin){
			// EQQ 初始化
			if(!$C.get("ptwebqq")){
				//如果没有这个cookies不尝试登录，直接跳登录
				qqweb.portal.showLoginWindow("eqq");
				return;
			}
			EQQ.init2({
				panel: {
					myPanel: qqweb.layout.getPanel("qqBar").body,
					mainPanel: qqweb.layout.sideBar.body,
					mainBar: qqweb.layout.getPanel("statusBar").body,
					taskBar: qqweb.layout.getPanel("taskBar").body
				}
			});	
		},
		*/
		onExit : function(){
			if(!qqweb.portal.confirm("您确认要关闭 WebQQ 吗？")){
	            return;
	        };
	        packageContext.executeExit();
		},
		
		onNeedLogin : function(arg){
			qqweb.portal.showLoginWindow("eqq");
		}
	};
	//$E.addObserver(this, "runFirst", observer.onRun);
	
	// 定义EQQ的相关常量
	this.CONST = {
		// 主域名
		MAIN_DOMAIN: "qq.com",
		
		// EQQ服务器url
		EQQ_SERVER_URL: "http://"+dName+"/",
		
		// 连接服务器域名
		CONN_SERVER_DOMAIN: "http://web2-b.qq.com/",
		
		// 连接服务器域名2
		CONN_SERVER_DOMAIN2: "http://web.qq.com/",

		CONN_PROXY_URL: "http://web2-b.qq.com/proxy.html?v=2009102901",
		
		CHAT_PIC_SERVER : "http://172.24.6.80/",
		
		// 自定义头像主服务器域名
		AVATAR_SERVER_DOMAIN: "http://qun.qq.com/",

		// 自定义头像服务器域名
		AVATAR_SERVER_DOMAINS: [
			"http://face1.qun.qq.com/",
			"http://face2.qun.qq.com/",
			"http://face3.qun.qq.com/",
			"http://face4.qun.qq.com/",
			"http://face5.qun.qq.com/",
			"http://face6.qun.qq.com/",
			"http://face7.qun.qq.com/",
			"http://face8.qun.qq.com/",
			"http://face9.qun.qq.com/",
			"http://face10.qun.qq.com/"
		],
		
		//系统表情路径
		SYSTEM_FACE_URL: "./style/face/",
		
		LOGIN_PROTECT_FINISH_URL: "./login_protect.html",
		
		// qzone服务器域名
		UPLOAD_CUSTOM_FACE_SERVER: "http://web.qq.com/cgi-bin/cface_upload",
		
		DOWNLOAD_CHAT_LOG_SERVER : "http://sns.qq.com/buddy_state/feed/save_chat.php",
		
		FILE_SERVER : "http://file1.web.qq.com/",
		
		OFFLINE_FILE_SERVER : "http://weboffline.ftn.qq.com:80/ftn_access/",
		
		
		
		// qzone服务器域名
		QZONE_SERVER_DOMAIN: "http://qzone.qq.com/",
		// qzone服务器域名
		QZONE_USER_SERVER_DOMAIN: "http://user.qzone.qq.com/",
		
		QQ_GROUP_URL: "http://qun.qq.com/air/",
		
		
		
		
		MAX_LOGIN_AMOUNT: 1,
		
		MAX_FAIL_AMOUNT: 2,
		
		// z-index 基础值
		Z_INDEX_BASE: 3000,
		
		// z-index 基础值
		LOAD_AVATAR_AMOUNT: 50,
		
		
		// 表情数组
		TRANSFER_TABLE: [
			14,1,2,3,4,5,6,7,8,9,10,11,12,13,0,
			50,51,96,53,54,73,74,75,76,77,78,55,56,57,58,
			79,80,81,82,83,84,85,86,87,88,97,98,99,100,101,
			102,103,104,105,106,107,108,109,110,111,112,32,113,114,115,
			63,64,59,33,34,116,36,37,38,91,92,93,29,117,72,
			45,42,39,62,46,47,71,95,118,119,120,121,122,123,124,
			27,21,23,25,26,125,126,127,128,129,130,131,132,133,134,
			52,24,22,20,60,61,89,90,31,94,65,35,66,67,68,
			69,70,15,16,17,18,19,28,30,40,41,43,44,48,49
		],
		// 表情数组反向
		T_TRANSFER_TABLE: {
			14:0,
			1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:10, 11:11, 12:12, 13:13,
			0:14,
			50:15,51:16,96:17,53:18,54:19,73:20,74:21,75:22,76:23,77:24,78:25,55:26,56:27,57:28,58:29,
			79:30,80:31,81:32,82:33,83:34,84:35,85:36,86:37,87:38,88:39,
			97:40,98:41,99:42,100:43,101:44,102:45,103:46,104:47,105:48,106:49,107:50,108:51,109:52,110:53,111:54,112:55,32:56,113:57,114:58,115:59,
			63:60,64:61,59:62,33:63,34:64,116:65,36:66,37:67,38:68,91:69,92:70,93:71,29:72,117:73,72:74,45:75,42:76,39:77,62:78,46:79,47:80,71:81,95:82,
			118:83,119:84,120:85,121:86,122:87,123:88,124:89,27:90,21:91,23:92,25:93,26:94,125:95,126:96,127:97,128:98,129:99,130:100,131:101,132:102,133:103,134:104,
			52:105,24:106,22:107,20:108,60:109,61:110,89:111,90:112,31:113,94:114,
			65:115,35:116,66:117,67:118,68:119,69:120,70:121,15:122,16:123,17:124,18:125,19:126,28:127,30:128,40:129,41:130,43:131,44:132,48:133,49:134
		}


	};
	
	this.hash = {
		onlineStatus: {
			callme: "callme",
			online: "online",
			away: "away",
			busy: "busy",
			silent: "silent",
			hidden: "hidden",
			offline: "offline"
		},
		
		onlineStatusText:{
			callme:"Q我吧",
			online:"在线",
			away:"离开",
			busy:"忙碌",
			silent:"静音",
			hidden:"隐身",
			offline:"离线"
		},
		
		clientType:{
			1:"PC",
			2:"PC",
			3:"PC",
			4:"PC",
			5:"PC",
			6:"PC",
			10:"PC",
			21:"Phone",
			22:"Phone",
			23:"Phone",
			24:"Phone",
			41:"WebQQ",
			10000:"PC"
		},
		
		clientTypeText:{
			1:"PC",
			2:"PC",
			3:"PC",
			4:"PC",
			5:"PC",
			6:"PC",
			10:"PC",
			21:"手机QQ",
			22:"手机QQ",
			23:"手机QQ",
			24:"手机QQ",
			41:"WebQQ",
			10000:"PC"
		},
		
		userClassType : {
			online:"online",
			stranger:"stranger",
			blacklist:"blacklist"
			
		}
		
	},
		

	document.domain = this.CONST.MAIN_DOMAIN;
	
	
	// 阻止默认事件,因为想ff下，esc可能会有stop页面的功能
	var onDocumentKeydown = function(e){
		if(e.keyCode === 27){
			e.preventDefault();
		}
	};
	$E.on(document, "keydown", onDocumentKeydown);
	

	
	// 定义EQQ的初始化函数
	this.init2 = function(option){ 
		//this.option = option || {};
		this.panel = option.panel || {};
		
		//根据登录重新读取配置
		//qqweb.config.initEQQ();
		
		$E.addObserver(qqweb.portal, "exit",  onPortalExit );
		
		
		$E.addObserver(packageContext, "LoginSuccess", onLoginSuccess);
		$E.addObserver(packageContext, "LoginFailure", onLoginFailure);
		$E.addObserver(packageContext, "VerifyLoginProtectSuccess", onVerifyLoginProtectSuccess);
		
		$E.addObserver(packageContext, "exit", observer.onExit);
		$E.addObserver(packageContext, "needLogin", observer.onNeedLogin);
		
		$E.addObserver(EQQ.RPCService, "NotLogin", onNotLogin);
		
		$E.addObserver(EQQ.RPCService, "FailCountOverMax", onFailCountOverMax);
		
		$E.addObserver(EQQ.RPCService, "LogoutSuccess", onLogoutSuccess);
		
		$E.addObserver(EQQ.RPCService, "PollComplete", onPollComplete);
		
		$E.addObserver(EQQ.RPCService, "CheckProtectSuccess", onCheckProtectSuccess);
		

		
	
		
		
		//this.login();
		// 创建基础Dom
		packageContext.createContainer();
		
		EQQ.RPCService.init();
		
		// 初始化P层
		EQQ.Presenter.MainPanel.init();
		EQQ.Presenter.MainBar.init();
		EQQ.Presenter.MsgBox.init();
		
		EQQ.Presenter.ChatBox.init();
		EQQ.Presenter.TaskBar.init();
		
		EQQ.Presenter.LoginBox.init();
		
		// 初始化M模型层
		EQQ.Model.BuddyList.init();
		EQQ.Model.ChatMsg.init();
		


		
		
		var is_close_tips = EQQ.Presenter.MainPanel.getCookieTips();
		
		if(is_close_tips && is_close_tips == "hide"){
			
		}else{
			//EQQ.Presenter.MainPanel.showYellowTips();
		}
		
		//EQQ.Presenter.MainBar.show();
		//EQQ.RPCService.sendCheckProtect();

		
		EQQ.Presenter.MainPanel.show();
		
		
		//qqweb.portal.runApp("messageBox",{"noValidateLogin":true});
		qqweb.portal.runApp("msgBubble",{"noValidateLogin":true});
		
		packageContext.login();

		
		
		
	};
	//从游客模式ptlogin登录后，不刷新页面，初始化内容放在此处
	this.loginEQQ = function(option){
		//直接显示好友列表
		 this.showLogin();		
	};
	
	/*
	this.run = function(){
		// EQQ 初始化
		EQQ.init({
			panel: {
				myPanel: qqweb.layout.getPanel("qqBar").body,
				mainPanel: qqweb.layout.sideBar.body,
				mainBar: qqweb.layout.getPanel("statusBar").body,
				taskBar: qqweb.layout.getPanel("taskBar").body
			},
			isLogin: J.string.mapQuery(window.location.search).isLoginWebQQ || false,
			isPinDown: true
		
		});
		
		
	};*/
	
	// 获取默认的登录状态
	this.getDefaultState = function(){
		var state = EQQ.hash.onlineStatus[J.string.mapQuery(window.location.search).login_state || "online"];
		return state;
	};
	
	this.getUserDefaultAvatar = function(size){
		size = size || 40;
		return "./style/images/avatar_default_" + size + "_" + size + ".gif";
	};
	
	this.getFaceServer = function(uin){
		return EQQ.CONST.AVATAR_SERVER_DOMAINS[(uin % 10)];
	};
	this.getUserAvatar = function(uin, cache){
		return EQQ.getFaceServer(uin) + "cgi/svr/face/getface?cache=1&type=1&fid=0&uin=" + uin;
	};
	this.getGroupAvatar = function(code, cache){
		return EQQ.getFaceServer(code) + "cgi/svr/face/getface?cache=1&type=4&fid=0&uin=" + code;
	};
	
	this.getQzoneUrl = function(uin){
		return EQQ.CONST.QZONE_USER_SERVER_DOMAIN + uin;
	};
	
	this.getSendMailUrl = function(uin){
		return "http://mail.qq.com/cgi-bin/login?Fun=clientwrite&vm=pt&email=" + uin + "@qq.com";
	};
	
	
	// 创建EQQ的核心容器的方法
	this.createContainer = function(){
		this.document = $D.getDoc();
		
		/*
		var window = new qqweb.businessClass.Window({
			type : "",
			title : "好友列表",
			hasPinUpButton : true
		});
		
		*/
		
	 
		
		this.container = $D.node("div",{
			id:"EQQ_Container",
			"class":"EQQ_Container"
		});
		
		this.container.innerHTML = '\
			<div id="EQQ_MsgBox" class="EQQ_msgBox">\
				<div class="EQQ_titleInMsgBox">\
					<div class="EQQ_titleTextInMsgBox">消息盒子</div>\
					<div id="EQQ_ViewMainPanelButtonInMsgBox" class="EQQ_viewMainPanelButtonInMsgBox" title="点击查看好友列表">好友列表</div>\
				</div>\
				<div id="EQQ_MessageList" class="EQQ_messageList">\
				</div>\
				<div id="EQQ_IgnoreAllMsgButtonInMsgBox" class="EQQ_ignoreAllMsgButtonInMsgBox" title="点击忽略全部消息">忽略全部</div>\
			</div>\
			<div id="EQQ_LoginBox" class="EQQ_LoginBox">\
				<div class="EQQ_LoginBox_Title">\
					<div id="EQQ_LoginBox_CloseButton" class="EQQ_LoginBox_CloseButton" title="关闭">X</div>\
					<div class="EQQ_LoginBox_TitleText">WebQQ登录保护</div>\
				</div>\
				<iframe id="EQQ_LoginBox_Iframe" class="EQQ_LoginBox_Iframe" src="about:blank" frameborder="no" scrolling="no"></iframe>\
			</div>\
		';
		
		this.document.body.appendChild(this.container);
		
	};
	


	
	// 获取cookie中的uin
	this.getCookieUin = function(){
		return parseInt(J.cookie.get("uin", EQQ.CONST.MAIN_DOMAIN).substr(1), 10);
	};
	// 获取cookie中的skey
	this.getCookieSkey = function(){
		return J.cookie.get("skey", EQQ.CONST.MAIN_DOMAIN);
	};
	
	// 获取cookie中的ptwebqq
	this.getCookiePtWebQQ = function(){
		return J.cookie.get("ptwebqq", EQQ.CONST.MAIN_DOMAIN);
	};
	
	

	

	

	
	

	
	this.dna_result_key = "";
	
	this.login = function(state){

		EQQ.Presenter.MainPanel.showLogin();
		
		this.loginStart = (new Date()).getTime();
		var param = {
			//status: state || EQQ.hash.onlineStatus.online,
			ptwebqq : this.getCookiePtWebQQ(),
			passwd_sig: this.dna_result_key
		};
		EQQ.RPCService.sendLogin(param);
	};
	
	var onCheckProtectSuccess = function(result){
		
		if(result.type == "nop"){
			//直接登录
			EQQ.Presenter.MainPanel.toggleShow();
		}else if(result.type == "url"){
			//显示QQ登录保护的输入界面
			EQQ.Presenter.LoginBox.openUrl(result.value);
			//EQQ.Presenter.LoginBox.openUrl("http://emweb.qq.com/login_protect.html");
			EQQ.Presenter.LoginBox.show();
		}
	};
	
	var onVerifyLoginProtectSuccess = function(dna_result_key){
		EQQ.Presenter.LoginBox.hide();
		if(dna_result_key){
			packageContext.dna_result_key = dna_result_key;
			EQQ.Presenter.MainPanel.toggleShow();
		}
	};
	
	
	var onPortalExit = function(){
		packageContext.executeExit();
	}
	/*
	this.exit = function(){
		if(!qqweb.portal.confirm("您确认要关闭 WebQQ 吗？")){
            return;
        };
        this.executeExit();
	};
	*/
	this.executeExit = function(){
        // 移除页面卸载的钩子
        //this._qqclient.removeCloseHook();
		 EQQ.View.ChatBox.onExitHotkey();//
           
        $E.notifyObservers(EQQ,"CloseWebQQ");        
       
        
        EQQ.stopPoll();
		EQQ.logout();
		qqweb.portal.removeExitConfirm();
		
		
		
        // 发送登出请求
        setTimeout(function(){
        	 $E.notifyObservers(EQQ,"exitSuccess");
        },1000);
	};
	
	this.logout = function(){
		//this.setIsLogin(false);
		EQQ.setIsLogin(false);
		EQQ.RPCService.sendLogout();
		
	};
	
	this.reLogin = function(){
		this.login(EQQ.Model.BuddyList.getSelf().state);
	};
	
	var onFailCountOverMax = function(){
		var reasonText = "您已离线 >_< (FailCountOverMax)";
		$E.notifyObservers(packageContext, "SelfOffline", reasonText);
	};
	
	var onNotLogin = function(){
		var reasonText = "您已离线 >_< (NotLogin)";
		$E.notifyObservers(packageContext, "SelfOffline", reasonText);
	};
	
	
	var onLogoutSuccess = function(){
		var reasonText = "您已离线 >_< (Logout)";
		//$E.notifyObservers(this, "SelfOffline", reasonText);
		$E.notifyObservers(EQQ,"exitSuccess");
		// 全局定时器
		//window.clearInterval(this.timer);
	};
	
	
	
	
	
	
	
	var onPollComplete = function(){
		var tempIsLogin = EQQ.getIsLogin();//this.getIsLogin();
		if(tempIsLogin){
			if(typeof EQQ !== "undefined"){
				EQQ.keepPoll();
			}
			
		}
	};
	
	
	
	
	// 登录成功
	var onLoginSuccess = function(){
		J.out("登录第一步成功");
		packageContext.start();
	};
	
	this.start = function(){
		//this.setIsLogin(true);
		EQQ.setIsLogin(true);
		qqweb.portal.addExitConfirm();
		this.mode = "master";

		J.out("start: "+EQQ);
		
		EQQ.Model.BuddyList.reset();
		

		
		// 发起获取自己的资料
		qqweb.rpcService.sendGetBuddyList();
		
		// 发起获取群列表
		qqweb.rpcService.sendGetGroupList();
		
	

		if(isInit){
			this.startPoll();
			
		}else{
			isInit = true;
			// 全局定时器
			this.timer = window.setInterval(beat, 60000);
			/*
			if(!this.getCloseHook()){
				//this.addCloseHook();
			}
			*/
		}
		
	};
	
	
	/*
	// 设置登录状态
	this.setIsLogin = function(flag){
		isLogin = flag;

	};
	
	this.getIsLogin = function(){
		return isLogin;
	}*/
	

	// 未登录
	var onLoginFailure = function(data){
		//this.setIsLogin(false);
		EQQ.setIsLogin(false);
		J.out("对不起，登录失败！");
		//this.logout();
		
		EQQ.Presenter.MainPanel.showReLoginPanel();

	};
	
	// 全局定时器
	//var timer;
	// 节拍时间元
	var timerCount = 0;
	
	// 节拍触发器
	var beat = function(){
		if(timerCount > 240){
			timerCount = 0;
		}
	    
	    
	    // 1分钟通知
	    $E.notifyObservers(EQQ, "NotifyBeat_1");
	    
	    
		    
	    // 2分钟通知
		if((timerCount % 2) == 0){
	    	$E.notifyObservers(EQQ, "NotifyBeat_2");
		}
		
		// 5分钟通知
	    if((timerCount % 5) == 0){
	    	$E.notifyObservers(EQQ, "NotifyBeat_5");
	    	// 10分钟通知
		    if((timerCount % 10) == 0){
		    	$E.notifyObservers(EQQ, "NotifyBeat_10");
		    	
		    	// 30分钟通知
		    	if((timerCount % 30) == 0){
			    	$E.notifyObservers(EQQ, "NotifyBeat_30");
			    	
			    	// 60分钟通知
			    	if((timerCount % 60) == 0){
				    	$E.notifyObservers(EQQ, "NotifyBeat_60");
				    	
				    	// 两小时通知
				    	if((timerCount % 120) == 0){
					    	$E.notifyObservers(EQQ, "NotifyBeat_120");
					    	
					    	// 4小时通知
					    	if((timerCount % 240) == 0){
						    	$E.notifyObservers(EQQ, "NotifyBeat_240");
						    }
				    	}
			    	}
			    }
		    }
	    }
		
		timerCount++;
	    
	};
	
	
	
	
	
	
	// 节拍时间元2
	var timer2;
	var timerCount2 = 0;
	var isStartBeat2 = false;
	var needBeat2 = 0;
	
	this.startBeat2 = function(){
		isStartBeat2 = true;
		timerCount2 = 0;
		// 全局定时器2 
		timer2 = window.setInterval(beat2, 250);
		J.out(">>>>>>>>>: startBeat2")
	};
	
	this.stopBeat2 = function(){
		isStartBeat2 = false;
		// 全局定时器2
		window.clearInterval(timer2);
		timerCount2 = 0;
		timer2 = null;
		J.out(">>>>>>>>>: stopBeat2")
	};
	this.isStartBeat2 = function(){
		return isStartBeat2;
	};
	this.addNeedBeat2 = function(tid){
		
		if(!tidList[tid]){
			tidList[tid] = true;
			needBeat2++;
		}
		
		if(!EQQ.isStartBeat2()){
			EQQ.startBeat2();
		}
	};
	this.removeNeedBeat2 = function(tid){
		if(tidList[tid]){
			if(needBeat2>0){
				needBeat2--;
			}
		}
		if(needBeat2 === 0){
			EQQ.stopBeat2();
		}
		
		
	};
	

	
	// 节拍触发器2
	var beat2 = function(){
		if(timerCount2 > 5000){
			timerCount2 = 0;
		}
	    
	    
	    // 0.25秒通知
	    $E.notifyObservers(EQQ, "NotifyBeat_250");
	    
	    // 0.5秒通知
		if((timerCount2 % 2) == 0){
	    	$E.notifyObservers(EQQ, "NotifyBeat_500");
	    	
	    	// 1秒通知
		    if((timerCount2 % 6) == 0){
		    	$E.notifyObservers(EQQ, "NotifyBeat_1000");
		    }
		    
		    // 3秒通知
		    if((timerCount2 % 10) == 0){
		    	$E.notifyObservers(EQQ, "NotifyBeat_3000");
		    	
		    	// 5秒通知
		    	if((timerCount2 % 20) == 0){
			    	$E.notifyObservers(EQQ, "NotifyBeat_5000");
			    }
		    }
		}
		timerCount2++;
	    
	};
	
	
	
	this.startPoll = function(){
		
		this.setNeedPollFlag(true);
		this.keepPoll();
	};
	
	this.keepPoll = function(){
		if(this.getNeedPollFlag()){
			EQQ.RPCService.sendPoll();
		}
	};
	
	this.setNeedPollFlag = function(flag){
		return needPollFlag = flag;
	}
	this.getNeedPollFlag = function(){
		return needPollFlag;
	}
	this.stopPoll = function(){
		this.setNeedPollFlag(false);
		
	};
	
	
	


	
});

/* == EQQ 工具模块 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2010.3.16 ----- */
 
 
Jet().$package("EQQ.util", function(J){
	var $D = J.dom,
		$E = J.event,
		$H = J.http;
	
	/**
	 * 对聊天内容进行转换
	 * @author azrael
	 * @param msg 聊天消息
	 * @param isSelf 指示聊天内容的类型,为 true 时为自己发送的内容, false 为接收到的内容.<br/>
	 * 		默认 false
	 * @return 转换后的聊天内容
	 */
	var translateChatMsg = function(msg, isSelf) {
		  
		var contentHtml = ''; 
		if(isSelf){ //
			for (var i = 0; i < msg.content.length; i++) {
				var msgContent = msg.content[i];
				
				
				if (msgContent[0] === "face") {
					// 系统表情
					contentHtml += renderDefaultFace(msgContent[1]);
				} else if (msgContent[0] === "cface") {//自己发送的自定义表情，格式为：发送格式
					// 自定义表情
					if(msg.type == "group" )
						contentHtml += renderSelfCustomFace(msgContent[2]);
					else
					    contentHtml += renderSelfCustomFace(msgContent[1]);
				}
				// 如果是和前面的图片重复
				else if (msgContent[0] === "cface_idx") {
					if(msg.type == "group" )
					    contentHtml += renderSelfCustomFace(msgContent[2]);
					else
						contentHtml += renderSelfCustomFace(msgContent[1]);
				} else if (msgContent[0] === "pic_id") {
	
				} else if (msgContent[0] === "image") {
	
				} 
				else if( msgContent[0] === "offpic" ){//离线图片(发送图片、截屏)	renderOffPic(msgContent[1].file_path,from_uin);//from_uin
				    var file = EQQ.Model.ChatMsg.getSendPicUrlByFilePath(msgContent[1]);
					if( file != '' )
					   contentHtml += renderSelfSendPic(file);
					   
				}
				
				else if(msgContent[0] === "rffile" ){//拒绝接受文件rffile
					
					contentHtml +=  '<div class="msgFileBox">您拒绝接收"'+msgContent[1]+'",文件传输失败.</div>';
					
				}else if(msgContent[0] === "agfile" ){//同意接受文件agfile
					
					contentHtml +=  '<div class="msgFileBox">您同意了接收文件"'+msgContent[1]+'".</div>';
					
				}else if( msgContent[0] === "sendfile" )
				{
					contentHtml +=  '<div class="msgFileBox">您发送文件"'+msgContent[1]+'"给对方.</div>';
					
				}
				//filesrv_transfer
				else if( msgContent[0] === "transtimeout" )
				{
					contentHtml +=  '<div class="msgFileBox">接收文件"'+msgContent[1]+'"超时,文件传输失败.</div>';
					
				}else if( msgContent[0] === "refusedbyclient" )
				{
					contentHtml +=  '<div class="msgFileBox">对方取消了接收文件"'+msgContent[1]+'",文件传输失败.</div>';
					
				}else if( msgContent[0] === "transok" )
				{
					contentHtml +=  '<div class="msgFileBox">文件"'+msgContent[1]+'"传输成功.</div>';
					
				}else if( msgContent[0] === "transerror" )
				{
					contentHtml +=  '<div class="msgFileBox">对方取消了接收文件"'+msgContent[1]+'"或传输错误,文件传输失败.</div>';
					
				}
				
				else if (!J.isArray(msgContent)) {
					contentHtml += transUrl(J.string.toHtml(transUrl(msgContent,1)),2);
				}
	
			} // end for
		}else{
			var uin = msg.sender_uin || msg.from_uin;
			var from_uin = msg.from_uin || 0;
			var cfaces = [];
			var picId;
			var k;
			if(msg.content[0][0] !== "font") {
				k = 0;
			}else{
				k = 1;
			}
		 
			// 循环解析渲染本条消息中的所有图文元素
			for(; k<msg.content.length; k++) {
				var msgContent = msg.content[k];
				if(msgContent[0] === "face") {
					//系统默认表情
					contentHtml += renderDefaultFace(msgContent[1]);
				}else if(msgContent[0] === "cface"){//接收的自定义表情，数据格式采用客户端发送的格式
					//自定义表情
					cfaces.push(msgContent);
					if(msg.type == "group" )
					 {
						// contentHtml += renderReceiveCustomFaceGroup(msg.msg_id, msgContent[1], msg.group_code, msg.time);//msgContent[1]：存放标识group
						 contentHtml += renderReceiveCustomFaceGroup2(  msgContent[1], msg.group_code,msg.sender_uin );
					 }
					else
					   contentHtml += renderReceiveCustomFace(msg.msg_id, msgContent[1], uin);
					
				}
				// 如果是和前面的图片重复
				else if(msgContent[0] === "cface_idx"){
					//contentHtml += renderReceiveCustomFace(msg.msg_id, cfaces[msgContent[1]][1],  msg.group_code, msg.time);
					 
					if(msg.type == "group" )
					   contentHtml += renderReceiveCustomFaceGroup(msg.msg_id, cfaces[msgContent[1]][1],  msg.group_code, msg.time);
					else
					  contentHtml += renderReceiveCustomFace(msg.msg_id, cfaces[msgContent[1]][1], uin);
				}
				else if(msgContent[0] === "pic_id"){
					picId = msgContent[1];
				}
				else if(msgContent[0] === "image"){  
					contentHtml += renderReceivePic(picId, uin, msgContent[2], msgContent[1]);
				}
				else if( msgContent[0] === "offpic" ){//离线图片(发送图片、截屏)	
				    if( msgContent[1].success == 1 )
					   contentHtml += renderOffPic(msgContent[1].file_path,from_uin);//from_uin
					else
					   contentHtml += renderErrorPic();
					   
				}else if(msgContent[0] === "rfile" ){//rfile为chatmsg中封装格式
				 
					var _fileid = msg.from_uin+'_'+msgContent[2]; 
					var _filesList = EQQ.Model.ChatMsg.getFilesList();
					contentHtml += '<div class="msgFileBox">对方给您发送文件:<br />' ;
 					contentHtml += '<span class="icon_'+getFileTypeStyle(msgContent[1])+'">&nbsp;</span>'+msgContent[1] ;
					contentHtml += '<span class="fileAct">';	
					if(_filesList[_fileid].isread)
					{ 
						contentHtml += '&nbsp;[同意][拒绝]';						 
					}else
					{
						contentHtml += '&nbsp;<a id="agree_'+_fileid+'" href="#">'+'[同意]</a>';
						contentHtml += '&nbsp;<a id="refuse_'+_fileid+'" href="#">'+'[拒绝]</a>';

					}
					contentHtml += '</span>';	
					contentHtml += '</div>' ;
					 
				}else if(msgContent[0] === "rffile" ){
					
					contentHtml +=  '<div class="msgFileBox">对方取消了接收文件"'+msgContent[1]+'",文件传输失败.</div>';
					
				}else if(msgContent[0] === "rtfile" ){
					
					contentHtml +=  '<div class="msgFileBox">接收文件"'+msgContent[1]+'"超时,文件传输失败.</div>';
					
				}else if(msgContent[0] === "wrfile" ){//web端接收
					
					contentHtml +=  '<div class="msgFileBox">对方已同意接收"'+msgContent[1]+'",开始传输文件.</div>';
					
				}else if(msgContent[0] === "wrffile" ){//web端拒绝接收
					
					contentHtml +=  '<div class="msgFileBox">对方拒绝了接收文件"'+msgContent[1]+'",文件传输失败.</div>';
					
				}else if(msgContent[0] === "video" )	{  
					contentHtml +=   msgContent[1];
				}
				else{  
					contentHtml += transUrl(J.string.toHtml(transUrl(msgContent,1)),2);
				}
				
			}//end for
		}
		
		return contentHtml;
		
	};
	
	// 根据faceCode渲染生成系统默认表情的html
	var renderDefaultFace = function(faceCode){
		return '<img class="EQQ_faceImg" src="' + EQQ.CONST.SYSTEM_FACE_URL + EQQ.CONST.T_TRANSFER_TABLE[faceCode] + '.gif" />';
	};
	
	// 根据guid和uin渲染生成imgHtml
	var renderReceiveCustomFace = function(msgId, guid, fromUin, count){
		count = count || 1;
		return '<img src="'+EQQ.CONST.CONN_SERVER_DOMAIN+'channel/get_cface?lcid='+msgId+'&guid='+guid+'&to='+fromUin+'&count='+count+'&time=1" title="图片或自定义表情" />';
	};
	// 群：根据guid和uin渲染生成imgHtml  renderReceiveCustomFace(msg.msg_id, msgContent[1], uin) 
	var renderReceiveCustomFaceGroup = function(msgId, cFace, gCode, time){
	 	var vTime = Math.round(new Date().getTime()/1000);
 		return '<img src="'+EQQ.CONST.AVATAR_SERVER_DOMAIN+'cgi/svr/chatimg/get?pic='+cFace.name+'&gid='+gCode+'&time='+vTime+'" title="图片或自定义表情" />';
 	};
	
	// 群：(  msgContent[1], msg.group_code,msg.sender_uin ); 此函数采用star优化方法，处于测试阶段
	var renderReceiveCustomFaceGroup2 = function(cface, gCode,uin){	 	 
 		var rip = cface.server.toString().split(':');		
		return '<img src="'+EQQ.CONST.CHAT_PIC_SERVER+'getchatpic?gid='+gCode+'&uin='+uin+'&rip='+rip[0]+'&rport='+rip[1]+'&fid='+cface.file_id+'" title="图片或自定义表情" />';
	};
	// 自身的发送图片或者截图(离线方式)
	var renderSelfSendPic = function(picUrl){	  		
		return '<img src="'+picUrl+'" title="图片或自定义表情" />';
	};
	// 根据guid和uin, index, type渲染生成imgHtml
	var renderReceivePic = function(msgId, picId, fromUin, index, type){
		return '<img src="'+EQQ.CONST.CONN_SERVER_DOMAIN+'channel/get_image?lcid='+msgId+'&guid={'+picId+'}'+index+'.'+type+'&to='+fromUin+'&count=1&time=1" title="图片或自定义表情" />';
	};
	
	// 根据guid渲染生成imgHtml
	var renderSelfCustomFace = function(guid){
		return '<img src="'+EQQ.CONST.CONN_SERVER_DOMAIN2 + "cgi-bin/webqq_app/?cmd=2&bd=" + guid+'" title="图片或自定义表情" />';
	};
	
	//显示收信息的离线图片 
	var renderOffPic = function(filePath,fuin){
		return '<img src="'+ EQQ.CONST.CONN_SERVER_DOMAIN+"channel/get_offpic?file_path=" + filePath+'&f_uin='+fuin+'&clientid='+EQQ.Model.ChatMsg.getClientidFromRpc()+'" title="图片或自定义表情" />';
	};
	//插入错误图片
	var renderErrorPic = function(){	  		
		return '<img src="style/images/img_error.gif" title="图片或自定义表情接收错误或不存在" />';
	};
	var trimChatMsg = function(msg){//跑马灯消息提示：消息内容提取
		var trimedMsg = translateChatMsg(msg);
        
		trimedMsg = trimedMsg
			.replace(/^(<br \/>|&nbsp;)+/ig,'') // 去掉消息正文前面的换行和空格
			;
		trimedMsg = trimedMsg
			.replace(/(<a([^>]+)>|<\/a>)/ig,'') // 去掉链接
			;	 
		//处理文件信息		
		trimedMsg = trimedMsg.replace(/<div class="msgFileBox">([\s\S]+?)<\/div>/ig,function(word){
				word = word.replace(/(<span([\s\S]+?)<\/span>)+?/ig,'');
		        word = word.replace(/(:<br \/>)+?/ig,':');																			 
				return word.replace(/(<div([^>]+?)>|<\/div>)+/ig,'');			 
		});
			
		var brIndex = trimedMsg.indexOf("<br />");//取换行前半部分
		if (brIndex != -1) {
			trimedMsg = trimedMsg.substr(0, brIndex);
		}
		trimedMsg = trimedMsg
			.replace(/(&nbsp;)+$/ig,'') // 去掉消息正文后面的空格
			;
		// 替换自定义表情
		trimedMsg = trimedMsg.replace(/<img.*?\/?>/ig,function(word){
			if(/class="EQQ_faceImg"/.test(word)){
				return word;
			}else{
				return '<img src="./style/images/image_icon.png" />';
			}
		});
		return trimedMsg;
	};
	
	//url转换
	/*
	由于空格问题，所以必须转换两次:
	第一次先转换地址为[url][/url]
	第二次转换[url][/url]为实际链接
	*/
	var transUrl = function(content,type){ 
	    if( type === 2 ){   
			var strRegex = /\[url\][\s\S]+?\[\/url\]/g;
			content = content.replace(strRegex, function(url){	 
								   url = url.replace(/(\[url\]|\[\/url\])/g,'');
								   var href = url.replace(/^www\./,function(www){
												return 'http://'+www;									 
											});
								   
							       return '<a href="'+href+'" target="_blank"><span class="msgLink">'+url+'</span></a>';								 
								 						 
								   });
			
		}else{		
			//var strRegex = /(((https|http|ftp|rtsp|mms)?:\/\/)|(www\.)){1}[a-zA-Z0-9\.\/\?=%&@:#;]+([0-9a-zA-Z\/#])+?/g;
			//var strRegex = /(((https|http|ftp|rtsp|mms)?:\/\/)|(www\.)){1}[\w\.\/\?=%&@:#;\*\$\[\]\(\){}'"]+([0-9a-zA-Z\/#])+?/g;
			var strRegex = /((([a-zA-Z0-9]{3,10})?:\/\/)|(www\.)){1}[\w\.\/\?=%&@:#;\*\$\[\]\(\){}'"]+([0-9a-zA-Z\/#])+?/g;
			content = content.replace(strRegex, function(url){								  							 
								return '[url]'+url+'[/url]';								 
								   });
	  }
		return content;
	};
	
	
	var translateFontStyle = function(styleMsg){
		if(styleMsg[0] === "font"){
			var style = styleMsg[1].style;
			var styles = 'color:#'+styleMsg[1].color.match(/([0-9a-f]{6})/)[0]
				+ ';font-family:'+styleMsg[1].name
				+ ';font-size:'+styleMsg[1].size + 'pt'
				+ ';font-weight:'+(!!style[0]?'bold':'normal')
				+ ';font-style:'+(!!style[1]?'italic':'normal')
				+ ';text-decoration:'+(!!style[2]?'underline':'none')
				+ ';'
				;
			return styles;
		}else{
			return '';
		}
	};
	
	//处理接收文件的图片格式
	 
	var getFileTypeStyle = function(fileName){
		if( typeof(fileName) == 'undefined' || fileName == '' )
		   return;
		    var fns = fileName.split("."), fileNameSuffix = fns[fns.length - 1].toLowerCase();
			switch (fileNameSuffix) {
				case "excel": case "xls": case "xlsx":
					fileNameSuffix = "excel";
					break;
				case "doc": case "docx":
					fileNameSuffix = "word";
					break;
				case "ppt": case "pptx":
					fileNameSuffix = "ppt";
					break;
				case "bmp": case "png": case "gif": case "jpeg": case "jpg": case "ico":
					fileNameSuffix = "pic";//image
					break;
				case "tga": case "tif": case "psd": case "tiff":
					fileNameSuffix = "pic";
					break;
				case "mov": case "avi": case "mpeg": case "mpg": case "ra": case "rm": case "rmvb": case "qt": case "asf": case "wmv": case "swf": case "flv": case "mp4":
					fileNameSuffix = "media";
					break;
				case "mp3": case "wav": case "mid":
					fileNameSuffix = "music";
					break;
				case "arj": case "rar": case "zip": case "jar": case "7z": case "tar": case "uc2": case "gz": case "lha": case "ace": case "tgz":
					fileNameSuffix = "rar-zip";
					break;
				case "txt": case "text": 
					fileNameSuffix = "share-txt";
					break;
				case "pdf":
					fileNameSuffix = "pdf16";
					break;	
				case "com":
					fileNameSuffix = "exe16";
					break;	
				default :
					fileNameSuffix = "others";
					break;
			}
		return fileNameSuffix;
	};
	
	this.translateFontStyle = translateFontStyle;
	this.translateChatMsg = translateChatMsg;
	this.trimChatMsg = trimChatMsg;
	
	/**
	 * 文字走马灯滚动类
	 */
	this.Marquee = new J.Class({
		init : function(option){
			var marqueeContext = this;
			this.speed = option.speed || 40;
			this.stopTime = option.stopTime || 3000;
			this.lineHeight = option.lineHeight || 20;
			this.target = option.target;
			this.timer = null;
			this.lineTimer = null;
			this.intervaler = null;
		 	this.scrollHeight = this.lineHeight;
		 	this.isStop = false;
		 	
		 	this._onTimeRun = function(){
				marqueeContext.scrollOneLine();
			};
	
		},
		scrollOneLine : function(){
			if (this.scrollHeight > 0) {
				this.scrollHeight--;
				var currentTop = this.target.style.top.match(/-?\d+/);
				currentTop = (!currentTop) ? 0 : parseInt(currentTop[0]);
				this.target.style.top = (--currentTop) + 'px';
				

				this.lineTimer = setTimeout(this._onTimeRun, this.speed);
			}else{
				if(!this.isStop){
					this.update();
				}
			}

		},
		
		stop : function() {
			if (this.timer) {
				clearTimeout(this.timer);
			}
		},
		
		reset : function(){
			this.target.style.top = '0px';
		},
		
		update : function(){
			if(this.isStop){
				return;
			}
			if (this.timer) {
				clearTimeout(this.timer);
			}
			this.scrollHeight = this.lineHeight;
			var currentTop = this.target.style.top.match(/\d+/);
			var height = $D.getScrollHeight(this.target);
			if(!!currentTop && !!height){
				currentTop = parseInt(currentTop[0]);
				if(currentTop >= height){
					this.target.style.top = '0px';
				}
			}

			this.timer = setTimeout(this._onTimeRun, this.stopTime);
		}
		
		
	});
	
	
});

/* == EQQ RPC Service 模块 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2009.11.17 ----- */
 
 


Jet().$package("EQQ.RPCService", function(J){
	//== EQQ.RPCService 的局部变量声明 ==============================================================================
	//------------------------------------------------------------------------------------------------------------
	var packageContext = this,
		context = this,
		$D = J.dom,
		$E = J.event,
		lastPollTime = (new Date()).getTime(),
		failCount = 0,
		clientid = String(J.random(0,99))+String((new Date()).getTime()%1000000),
		pollCount = 0,
		pollMax = 0;
	
	var proxy;
		
	//== EQQ.RPCService 的私有方法 ===============================================================================
	//------------------------------------------------------------------------------------------------------------
	
	var onFail = function(){
		failCount++;
		J.out("onFail: "+failCount);

		if(failCount>3){
			failCount=0;
			$E.notifyObservers(packageContext, "FailCountOverMax");
		}
	};
	var resetFailCount = function(){
		failCount = 0;
	};
	
	var ajaxFrameUrlSetted=false;
	var ajaxCallbacks=[];
	
	// ajax proxy 代理请求封装
	var proxySend = function(url, option){
		if(proxy){
			startProxySend(url, option);
		}else{//TODO ,ippan:这个初始化无法保证（如果同时来两个请求，会调用两次proxy的iframe初始化，因为前一个还没加载完，此时proxy===undefined)
			ajaxCallbacks.push({'url':url,'option':option});
			if(ajaxFrameUrlSetted){
				return;
			}
			ajaxFrameUrlSetted=true;
			var bodyEl=document.body,
				divEl = $D.node("div");

			var html = '<iframe id="EQQ_ProxySendIframe" class="hiddenIframe" name="EQQ_ProxySendIframe" width="1" height="1" src="about:blank"></iframe>';
			divEl.innerHTML=html;
			bodyEl.appendChild(divEl);
			
			var EQQ_ProxySendIframe = $D.id("EQQ_ProxySendIframe");
			/*
			var onLoad = function(){//onload不等于函数已经初始化完毕 （IE7下有问题）
				var ajaxProxy = window.frames["EQQ_ProxySendIframe"];
				try{
					proxy = ajaxProxy.ajax;
					startProxySend(url, option);
				}catch(e){
					setTimeout(function(){
						try{
							proxy = ajaxProxy.ajax;
							startProxySend(url, option);
						}catch(e){
							J.out("ajax代理出错："+url+" "+EQQ.CONST.CONN_PROXY_URL);
							var data = {};
							data.arguments = option.arguments || {};
							option.onError.call(option.context, data);
						}
					},1000);
				}
			};
			*/
			var onAjaxFrameLoad=function(){
				var ajaxProxy = window.frames["EQQ_ProxySendIframe"];
				//try{
				proxy = ajaxProxy.ajax;
				//}catch(e){alert(e.message);}
				for(var i=0;i<ajaxCallbacks.length;++i){
					var url=ajaxCallbacks[i].url;
					var option=ajaxCallbacks[i].option;
					try{
						startProxySend(url, option);
					}catch(e){
						J.out("eqq ajax代理出错："+url+" "+EQQ.CONST.CONN_PROXY_URL);
						if(!option.onError){
							return;
						}
						var data = {};
						data.arguments = option.arguments || {};
						option.onError.call(option.context, data);
					}
				}
			};
			$E.on(EQQ_ProxySendIframe, "load", onAjaxFrameLoad);
			EQQ_ProxySendIframe.setAttribute("src",EQQ.CONST.CONN_PROXY_URL);
		}
	};
	
	var startProxySend = function(url, option){
		option = option ||{};
		// 默认不缓存
		option.cacheTime = option.cacheTime || 0;
		option.onSuccess = option.onSuccess || function(){};
		option.onError = option.onError || function(){};
		option.onTimeout = option.onTimeout || function(){};
		option.onComplete = option.onComplete || function(){};
		
		opt = {
			method: option.method || "GET",
			enctype: option.enctype || "",	//"multipart/form-data",
			data: option.data || {},
			//param: option.param || {},
			arguments: option.arguments || {},
			context: option.context || null,
			timeout: option.timeout ? option.timeout : 10000,
			
			onSuccess: function(o){
				var data = J.json.parse(o.responseText);
				data.arguments = option.arguments || {};
				option.onSuccess.call(option.context, data);
			},
			onError: function(o){
				var data = {};
				data.arguments = option.arguments || {};
				option.onError.call(option.context, data);
			},
			//尚未测试
			onTimeout: function(o){
				var data = {};
				data.arguments = option.arguments || {};
				option.onTimeout.call(option.context, data);
			},
			onComplete: function(o){
				var data = {};
				data.arguments = option.arguments || {};
				option.onComplete.call(option.context, data);
			}

			
		};
		opt.data.clientid = clientid;
		
		//J.out("ClientId: "+clientid);
		
		if(opt.method == "GET"){
			var queryString = J.string.toQueryString(opt.data);
			//var queryString = J.json.stringify(opt.data);
			
			if(option.cacheTime === 0){
				if(queryString){
					queryString += "&t=" + (new Date()).getTime();
				}else{
					queryString += "t=" + (new Date()).getTime();
				}
			}
			//url = url + "?" + queryString;		// + "&t=" + (new Date()).getTime();
			if(queryString){
				url = url + "?" + queryString;
			}
			opt.data = null;
			proxy(url, opt);
		}else{
			opt.contentType = "application/x-www-form-urlencoded";
			//opt.data = J.json.stringify(opt.data);
			//proxy(url+"?t=" + (new Date()).getTime(), opt);
			if( url.indexOf('?') === -1 ){
				proxy(url+"?t=" + (new Date()).getTime(), opt);
			}else{
				proxy(url+"&t=" + (new Date()).getTime(), opt);
			}
		}
		

	};
	
	
	
	
	//== qqweb.rpcService 的公共方法 ===============================================================================
	//------------------------------------------------------------------------------------------------------------
	
	this.init = function(){
		// 每隔离60秒清零错误计数器
		$E.addObserver(EQQ, "NotifyBeat_1", resetFailCount);
	};
	
	/*
	// form 方式请求封装
	this.formSend = function(url, option){
		var id = this.getId();
		opt = {
			method: option.method || "GET",
			enctype: option.enctype || "",	//"multipart/form-data",
			data: option.data || {},
			//param: option.param || null,
			arguments: option.arguments || null,
			context: option.context || null,
			onSuccess: option.onSuccess || function(){},
			onError: option.onError || function(){},
			onComplete: option.onComplete || function(){},
			//尚未测试
			onTimeout: option.onTimeout || function(){},

			timeout: option.timeout ? option.timeout : 10000
		};
		// 区分客户端
		//opt.data.clientid = clientid;
	    opt.data.callback=this.setCallback(id, opt);

		var bodyEl=document.body,
			divEl = $D.node("div",{
				id: "RPCService_"+id
			}),
			iframeEl,
			formEl = $D.node("form",{
				id: "webqq_form_"+id,
				target: "webqq_iframe_"+id,
				method: opt.method,
				action: url+"?t=" + (new Date()),
				enctype: opt.enctype
			});
		
	    var purge = function(id){
	    	$E.off(iframeEl, "load", onLoad);
	    	bodyEl.removeChild($D.id("RPCService_" + id));
	    };
	    var onLoad = function(){
			//J.out(id+" load success");
            purge(id);
        };
		var html = J.string.template('<iframe id="webqq_iframe_<%=id%>" name="webqq_iframe_<%=id%>" src="about:blank"></iframe>',{
			id:id
		});
		divEl.innerHTML=html;

		for(var p in opt.data){
			var inputEl=$D.node("input");
			inputEl.type="text";
			inputEl.name=p;
			inputEl.setAttribute("value",opt.data[p]);
			formEl.appendChild(inputEl);
		}
		divEl.appendChild(formEl);

		$D.hide(divEl);

		bodyEl.appendChild(divEl);

		iframeEl = $D.id("webqq_iframe_"+id);
		
		window.setTimeout(function(){
			if(context.getCallback(id)){
				J.out(id+" Timeout: ("+url+")");
				purge(id);
			}
        }, opt.timeout);
        
		$E.on(iframeEl, "load", onLoad);

		var func = function(){
			this._id=id;
			this._iframeEl=iframeEl;
			this._formEl=formEl;
			this._bodyEl=bodyEl;
			this._formEl.submit();
		};
		func.prototype={
			abort:function(){
				this._iframeEl.src="about:blank";
				this._bodyEl.removeChild(this._formEl);
				context.removeCallback(this._id);
			}
		}
		
		return new func();
	};
	
	this.id=0;
	this.callback={};
	this.getId = function(){
    	return this.id++;
    };

	this.setCallback = function(id, option){
		var context = this;
		this.callback["c"+id] = function(data){
			data.arguments = option.arguments || {};
			option.onSuccess.call(option.context, data);
			context.removeCallback(id);
		};
		return "parent." + this.packageName + ".callback.c" + id;
	}
	
	this.getCallback = function(id){
		return this.callback["c"+id];
	};
	this.removeCallback = function(id){
		this.callback["c"+id]=null;
		delete this.callback["c"+id];
	};
	
	
	
	*/
	

	
	//this.send = this.formSend;
	this.send = proxySend;
	

	
	// 登录 ===========================
	this.sendCheckProtect = function(param){
		var sender = this.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/is_protect",{
				context:this,
				data:param,
				onSuccess: function(data){
					if(data.retcode === 0){
						
						$E.notifyObservers(this, "CheckProtectSuccess", data.result);
						J.out(":CheckProtectSuccess...");
					}else{
						J.out("[sendCheckProtect] error: " + data.retcode);
						//onFail();
					}
				}
			});
	};

	
	
	// 登录 ===========================
	this.sendLogin = function(param){
		var sender = this.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/login",{
				context:this,
				data:param,
				onSuccess: this.sendLoginSuccess,
				onError: this.sendLoginError,
				onTimeout: this.sendLoginError
			});
	};
	// 登录成功的回调
	this.sendLoginSuccess = function(data){
		switch(data.retcode){
			case 0:
				
				pollMax=1;
				$E.notifyObservers(EQQ, "LoginSuccess", data.result);
				break;
			/*
			case 103:
				$E.notifyObservers(this, "NotLogin", data.result);
				break;
			*/
			default:
				J.out("未知登录失败");
				$E.notifyObservers(EQQ, "LoginFailure", data.result);
				J.out("[sendLogin] error: " + data.retcode);
				
				break;
		}
	};
	// 登录失败的回调
	this.sendLoginError = function(data){
		$E.notifyObservers(EQQ, "LoginFailure", data);
	};
	// 登出 ===========================
	this.sendLogout = function(param){
		var sender = this.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/logout",{
				context:this,
				data:param,
				onSuccess: function(data){
					if(data.retcode === 0 || data.retcode === 100){
						pollMax=0;
						$E.notifyObservers(this, "LogoutSuccess", data.result);
						J.out(":LogoutSuccess...");
					}else{
						J.out("[SendLogout] error: " + data.retcode);
						
					}
				}
			});
	};
	
	// 获取在线好友人数 ===========================
	this.sendGetOnlineBuddies = function(option){
		var sender = this.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/get_online_buddies",{
				context:this,
				onSuccess: function(data){
					if(data.retcode === 0){
						
						$E.notifyObservers(this, "GetOnlineBuddiesSuccess", data.result);
						//J.out(":GetOnlineBuddiesSuccess...");
					}else{
						//J.out("[sendGetOnlineBuddies] error: " + data.retcode);
						//onFail();
					}
				}
			});
	};

	
	// 发送消息 ===========================
	this.sendMsg = function(option) {
		 
		var sender = this.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/send_msg",{
			context:this,
			//method : "POST",
			cacheTime:0,
			data:option,//参数
			onSuccess: function(data){
				if(data.retcode === 0){
					$E.notifyObservers(this, "SendMsgSuccess", data.result);
				}else{
					J.out("[sendMsg] error: " + data.retcode + "-" + data.errmsg);
					$E.notifyObservers(this, "SendMsgError",{uin:option.to,retcode:data.retcode,errmsg:data.errmsg});
					//onFail();
				}
			}
		});
	};
	
	// 发送群消息 ===========================(无自定义表情)
	this.sendGroupMsg = function(option) {
		
		 
		var sender = this.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/send_group_msg",{
			context: this,
			data: option,//参数
			onSuccess: function(data){
				if(data.retcode === 0){ 
					$E.notifyObservers(this, "SendGroupMsgSuccess", data.result);
				}else{
					J.out("[sendGroupMsg] error: " + data.retcode + "-" + data.errmsg);
					$E.notifyObservers(this, "SendMsgError",{uin:option.to,retcode:data.retcode,errmsg:data.errmsg});
					//onFail();
				}
			}
		});
	};
	

	
	// 拉取信息 ===========================
	this.sendPoll = function(option){
		option = option || {};

		if(pollCount<pollMax){
			pollCount++;
			var sender = this.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/poll",{
					context:this,
					cacheTime:0,
					data:option.data || {},
					timeout:90000,
					onSuccess: this.sendPollSuccess,
					onError: this.sendPollError,
					onTimeout: this.sendPollError
				});
			//J.out("Polling:"+pollMax+" - "+pollCount);
		}
		
	};
	// 登录成功的回调
	this.sendPollSuccess = function(data){
		var now=(new Date()).getTime();
		var time= now - lastPollTime;
		lastPollTime = now;
		pollCount--;
		if(data.retcode === 0 || data.retcode === 102){
			resetFailCount();
			$E.notifyObservers(this, "PollSuccess", data.result);
			// 输出poll相关信息
			//J.out(":PollSuccess..."+pollMax+" - "+pollCount+ ", " + time+" - "+lastPollTime);
			$E.notifyObservers(this, "PollComplete");
			//J.out("PollComplete1");
		}else if(data.retcode === 100){
			$E.notifyObservers(this, "NotLogin");
		}else{
			//J.out("[sendPoll] error("+time+"): " + data.retcode + "-" + data.errmsg);
			onFail();
		} 
		
		
	};

	
	this.sendPollError = function(data){
		var context = this;

		pollCount--;
		//J.out("PollComplete2")
		$E.notifyObservers(context, "PollComplete");
		onFail();

	
	};
	
	
	
	// 设置在线状态 ===========================
	this.sendChangeStatus = function(data){
		var sender = this.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/change_status",{
				context:this,
				data:data || {newstatus:"hidden"},
				onSuccess: function(data){
					if(data.retcode === 0){
						$E.notifyObservers(this, "ChangeStatusSuccess", data.result);
						//J.out(":ChangeStatusSuccess...");
					}else{
						//J.out("[sendChangeStatus] error: " + data.retcode);
						//onFail();
					}
				}
			});
	};
	
	
	
	// 获取与群友(非好友)的会话权限签名 ===========================
	this.sendGetSessionSignature = function(param){
		var sender = this.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/get_session_sig",{
				context : this,
				// param = {group_uin:233432, to_uin:453467546};
				data :{
					group_uin : param.group_uin,
					to_uin : param.to_uin
				},
				arguments : {
					group_uin : param.group_uin,
					to_uin : param.to_uin
				},
				onSuccess : function(data){
					if(data.retcode === 0){
						
						$E.notifyObservers(this, "GetSessionSignatureSuccess", data);
						//J.out(":GetSessionSignatureSuccess...");
					}else{
						//J.out("[sendGetSessionSignature] error: " + data.retcode);
						//onFail();
					}
				}
			});
	};
	
	
	
	// 发送群友消息 ===========================
	this.sendGroupBuddyMsg = function(option) {
		var sender = this.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/send_session_msg",{
				context : this,
				data : option,
				onSuccess : function(data){
					if(data.retcode === 0){
						$E.notifyObservers(this, "SendMsgSuccess", data.result);
					}else{
						//J.out("[sendMsg] error: " + data.retcode + "-" + data.errmsg);
						$E.notifyObservers(this, "SendMsgError",{uin:option.to,retcode:data.retcode,errmsg:data.errmsg});
						//onFail();
					}
				}
			});
	};
	
	
	
	// 发送获取自定义表情id的请求 ===========================
	this.sendGetCustomFaceList = function() {
		// 请注意，这是 loadScript 方式的请求
		var sender = J.http.loadScript(EQQ.CONST.CONN_SERVER_DOMAIN2 + "cgi-bin/webqq_app/",{
				query : "cmd=1",
				onSuccess : function(data){
					//J.out("custom_face: ");
					if(typeof(custom_face) !== "undefined"){
						//J.out("SendGetCustomFaceListSuccess");

						$E.notifyObservers(packageContext, "SendGetCustomFaceListSuccess", custom_face);
						//J.out("SendGetCustomFaceListSuccess2");
					}else{
						//J.out("custom_face - 2");
						packageContext.sendGetCustomFaceList();
					}
					
				}
			});
	};
	
	
	
	// 发送 ===========================
	this.sendGetGroupCustomFaceKey = function(option) {
		var sender = this.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/get_gface_sig",{
			context: this,
			arguments : option.arguments,
			onSuccess: function(data){
				if(data.retcode === 0){
					$E.notifyObservers(this, "SendGetGroupCustomFaceKeySuccess", data);
				}else{
					//J.out("[SendGetGroupCustomFaceKeyError] error: " + data.retcode + "-" + data.errmsg);
					$E.notifyObservers(this, "SendGetGroupCustomFaceKeyError",{uin:option.to,retcode:data.retcode,errmsg:data.errmsg});
					//onFail();
				}
			}
		});
	};
	
	
	// 发送 ===========================发送有自定义表情信息
	this.sendGetGroupCustomFaceInfo = function(option) {	
		   
		 var sender = this.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/send_group_msg",{
			context: this,
			data: option,//参数
			onSuccess: function(data){
				/*if(data.retcode === 0){
					$E.notifyObservers(this, "SendGroupMsgSuccess", data.result);
				}else{
					J.out("[sendGroupMsg] error: " + data.retcode + "-" + data.errmsg);
					$E.notifyObservers(this, "SendMsgError",{uin:option.to,retcode:data.retcode,errmsg:data.errmsg});
					//onFail();
				}*/
				
				if(data.retcode === 0){
					$E.notifyObservers(this, "SendGetGroupCustomFaceInfoSuccess", data);
				}else{
					//J.out("[SendGetGroupCustomFaceInfoError] error: " + data.retcode + "-" + data.errmsg);
					//$E.notifyObservers(this, "SendGetGroupCustomFaceInfoError",{uin:option.to,retcode:data.retcode,errmsg:data.errmsg});
					$E.notifyObservers(this, "SendMsgError",{uin:option.to,retcode:data.retcode,errmsg:data.errmsg});//使用和"不包含表情"的相同响应函数
					//onFail();
				}
			}
		});
	};
	
	//申请离线图片地址
	this.sendGetOfflinePicUrl = function(option){
		 var sender = this.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/apply_offline_pic_dl",{
			context: this,
			data: option,//参数
			onSuccess: function(data){			
				if(data.retcode === 0){
					$E.notifyObservers(this, "sendGetOfflinePicUrlSuccess", data);
				}else{
					//J.out("[sendGetOfflinePicUrlError] error: " + data.retcode + "-" + data.errmsg);
					//alert(data.retcode);
					$E.notifyObservers(this, "getSendPicUrlError",data);
					J.out("[sendGetOfflinePicUrlError] error: ");
					//$E.notifyObservers(this, "SendGetGroupCustomFaceInfoError",{uin:option.to,retcode:data.retcode,errmsg:data.errmsg});					 
					//onFail();
				}
			}
		});
		
	};
    this.getClientid = function(){
		return clientid;
	};
	
	//发送拒绝接收文件/channel/refuse_file?to=...&face=...&lcid=...&clientid=....
	this.sendRefuseFile = function(option){  
		 var sender = this.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/refuse_file",{
			context: this,
			data: option,//参数
			onSuccess: function(data){			
				 
			}
		});
	};
	
});




/* == EQQ 好友信息模型层 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2009.11.17 ----- */
 

// 模型层：好友列表及相关模型
Jet().$package("EQQ.Model.BuddyList", function(J){
	//== EQQ.Model.BuddyList 的局部变量、类声明 ======================================================================
	//------------------------------------------------------------------------------------------------------------
	var packageContext = this,
		$E = J.event,
		
		// 自己的uin
		selfUin,
				
		// 好友分组：含在线好友、陌生人、黑名单分组？
		classList,
		
		// index到class的映射
		id2class,
		
		// 用户表
		userList,
		
		// uin到user的映射
		uin2user,
		
		
		// 好友列表：含在线好友中的联系人
		buddyList,
		// uin到buddy的映射
		uin2buddy,
		
		// 陌生人列表
		strangerList,
		// uin到stranger的映射
		uin2stranger,
		
		// 黑名单列表
		blackList,
		// uin到black的映射
		uin2black,
		
		

		// 在线好友
		onlineBuddy,
		
		
		// 群列表
		groupList,
		isGroupListReady=false,
		//最近联系人列表
		recentList,
		
		// gid到group的映射对象
		gid2group,
		
		// 群号到group的映射对象
		code2group,
		
		// 群总体设置信息
		groupMask;
		
		
		
		

	// User原型类定义
	var User = new J.Class({
		init: function(option){

			this.uin = option.uin;
			
			// 被添加好友的验证方式
			this.allow = option.allow;
			
			this.face = option.face;
			this.age = option.age;
			this.gender = option.gender;
			
			this.vip = option.vip || false;
			this.clientType=option.clientType || "10000";

			this.setAvatar(EQQ.getUserAvatar(this.uin));

			this.setNick(option.nick || option.uin);  
			this.setState(option.state || EQQ.hash.onlineStatus.offline);

		},
		setAvatar : function(url){
			this.avatarUrl = url;
			$E.notifyObservers(EQQ.Model.BuddyList, "AvatarChange", this);
		},
		getAvatar : function(){
			return EQQ.getUserAvatar(this.uin);
		},
		
		// 昵称
		setNick: function(name){
			
			this.nick = J.string.toSingleLine(name);
			this.htmlNick = J.string.toHtml(this.nick);
			this.titleNick = J.string.toTitle(this.nick);

			
			this.updateNames();

		},
		
		// 备注名
		setMarkName: function(name){
			this.markName = J.string.toSingleLine(name);
			this.htmlMarkName = J.string.toHtml(this.markName);
			this.titleMarkName = J.string.toTitle(this.markName);
			this.updateNames();
		},
		
		// 更新所有名字
		updateNames: function(){
			this.updateShowName();
			this.updateAllName();

			$E.notifyObservers(EQQ.Model.BuddyList, "UserNameChange", this);

		},
		
		// 显示名，备注名或昵称，备注优先
		updateShowName: function(){
			this.showName = this.markName || this.nick || this.uin;
			this.htmlShowName = J.string.toHtml(this.showName);
			this.titleShowName = J.string.toTitle(this.showName);
		},
		
		// 所有名显示，如：备注名(J.Kinvix)<4765078>、J.Kinvix<4765078>、4765078<4765078>
		updateAllName: function(){
			this.allName = "";
			if(this.markName){
				this.allName = this.markName+"("+this.nick+")"+"<"+this.uin+">";
			}else{
				this.allName = this.nick+"<"+this.uin+">";
			}
			this.htmlAllName = J.string.toHtml(this.allName);
			this.titleAllName = J.string.toTitle(this.allName);
		},
		
		// 分组id
		setClassId: function(classId){
			this.classId = classId;
		},
		
		// 签名
		setSignature: function(signature){
			this.signature = signature;
			this.htmlSignature = J.string.toHtml(signature);
			this.titleSignature = J.string.toTitle(signature);
			
			$E.notifyObservers(EQQ.Model.BuddyList, "UserSignatureChange", this);

		},
		
		// QQLevel
		setQQLevel : function(level){
			this.level = level;

			$E.notifyObservers(EQQ.Model.BuddyList, "UserQQLevelChange", this);


		},
		
		// 在线状态
		setState: function(state){ 
			this.state = state;
			this.stateText = state;
		},
		
		// 获取在线状态
		getState : function(state){ 
			return this.state;
		},
		
		// face
		setFace: function(face){
			this.face = face;
		},
		
		// gender
		setGender: function(gender){
			this.gender = gender;
		}
		
	});
	
	
	// User原型类定义
	var Group = new J.Class({
		init: function(option){
			this.gid = option.gid;
			this.code = option.code;
			this.mask = option.mask;
			this.preMask=this.mask;

			this.setName(option.name);
			this.setType(option.type);
			
			this.isLoadInfo = false;
			
			this.hasManageAuthority = false;
			
			this.uin2members = {};
			
			this.level = 0;

		},
		setMask: function(mask){
			this.preMask=this.mask;
			this.mask=mask;
			$E.notifyObservers(EQQ.Model.BuddyList, "SingleGroupMaskChange", this);
		},
		// 昵称
		setName: function(name){
			this.name = J.string.toSingleLine(name);
			this.htmlName = J.string.toHtml(name);
			this.titleName = J.string.toTitle(name);
			this.updateNames();
		},
		
		// 备注名
		setMarkName: function(markName){
			this.markName = J.string.toSingleLine(markName);
			this.htmlMarkName = J.string.toHtml(markName);
			this.titleMarkName = J.string.toTitle(markName);
			this.updateNames();
		},
		
		// 更新所有名字
		updateNames: function(){
			this.updateShowName();
			this.updateAllName();
			$E.notifyObservers(EQQ.Model.BuddyList, "GroupNameChange", this);
		},
		
		// 显示名，备注名或昵称，备注优先
		updateShowName: function(){
			this.showName = this.markName || this.name || this.code;
			this.htmlShowName = J.string.toHtml(this.showName);
			this.titleShowName = J.string.toTitle(this.showName);
			
		},
		
		// 所有名显示，如：备注名(J.Kinvix)<4765078>、J.Kinvix<4765078>、4765078<4765078>
		updateAllName: function(){
			this.allName = "";
			if(this.markName){
				this.allName = this.markName+"("+this.name+")"+"<"+this.code+">";
			}else{
				this.allName = this.name+"<"+this.code+">";
			}
			this.htmlAllName = J.string.toHtml(this.allName);
			this.titleAllName = J.string.toTitle(this.allName);
		},
		type2text: {
			commonGroup: "普通群",
			seniorGroup: "高级群",
			superGroup: "超级群",
			expireSuperGroup:"过期的超级群",
			enterpriseGroup:"企业群",
			forbiddenGroup:"禁用"
		},
		// 昵称
		setType: function(type){
			this.type = type;
			this.typeText = this.type2text[type] || "其他类型群";
			this.htmlTypeText = J.string.toHtml(this.typeText);
			this.titleTypeText = J.string.toTitle(this.typeText);
		},
		
		//等级
		 setLevel : function(level){
	  	    this.level = level || 0;
		 },
		
		// 群公告
		setAnnouncement: function(announcement){
			this.announcement = announcement;
			this.htmlAnnouncement = J.string.toHtml(announcement);
			this.titleAnnouncement = J.string.toTitle(announcement);
			$E.notifyObservers(packageContext, "GroupAnnouncementChange", this);
		},
		
		// 群成员列表
		updateMembers: function(members){
			
			this.members = members;
			this.uin2members[members.uin] = members;

			$E.notifyObservers(packageContext, "GroupMembersChange", this);
		},
		//更新成员状态
		updateMemberState:function(){
			$E.notifyObservers(packageContext, "GroupMembersChange", this);
		}
	});
	
	
		
		
	//== EQQ.Model.BuddyList 的观察者方法 ==========================================================================
	//------------------------------------------------------------------------------------------------------------
	
	var observer = {
		onGetUserInfoSuccess : function(data){
			
			var userData = data.result;

			
			if(userData){
				var uin = data.arguments.uin;
				var user = packageContext.getUserByUin(uin);
				if(user){
					user.setNick (userData.nick);
					user.setFace (userData.face);
					user.setGender (userData.gender);
				}else{
					var option = {
						uin: data.arguments.uin,
						allow : userData.allow,
						nick: userData.nick,
						face: userData.face,
						gender: userData.gender
					}
					user = packageContext.createUser(option);
					//J.out("user3-2: "+user+user.uin);
					packageContext.addUser(user);
					packageContext.addStranger(user);
				}
				//暂时没用
				$E.notifyObservers(packageContext, "GetUserInfoSuccess", user);
	
			}
					
		},
		onGetUserInfoError : function(){
			$E.notifyObservers(packageContext, "loginFail");
		},
		onGetBuddySignatureSuccess : function(data){
			var result = data.result;
			var signature;
			if(result.length==0){
				signature = "";
			}else{
				//signature = result[0].longnick;
				signature = result[0].lnick;
			}
			
			var user = packageContext.getUserByUin(data.arguments.uin);
			if(user){
				user.setSignature(signature);
			}
		},
		onChangeGroupMaskSuccess: function(data){
			J.out("群屏蔽改变成功");
			if(data.uin==packageContext.getSelfUin()){
				groupMask=data.mask;
				$E.notifyObservers(packageContext, "GroupMaskChange", groupMask);
			}else{
				var group=packageContext.getGroupByGid(data.uin);
				group.setMask(data.mask);
			}
		},
		onGetQQLevelSuccess : function(data){
			var level = data.result.level;
			var user = packageContext.getUserByUin(data.arguments.uin);
			if(user){
				user.setQQLevel(level);
			}
		},
	
	    ///从服务器获取群屏蔽配置,未使用
		onGetGroupMaskConfigSuccess : function (data) {
			 
			for(var key in data){
				var _mask = parseInt(data[key]);
				if( key === 'global' ){
					groupMask=_mask;
					$E.notifyObservers(packageContext, "GroupMaskChange", groupMask);
				}else{
					/*var group=packageContext.getGroupByGid(key);
					group.setMask(_mask);*/
				}
				
			}
			/*if(data.uin==packageContext.getSelfUin()){
				groupMask=data.mask;
				$E.notifyObservers(packageContext, "GroupMaskChange", groupMask);
			}else{
				var group=packageContext.getGroupByGid(data.uin);
				group.setMask(data.mask);
			}*/
		},
	

	
		// 在线好友载入后的回调
		onGetOnlineBuddiesSuccess : function(result){
			packageContext.setAllBuddyState(result);
		},
	
		// 群友会话验证载入后的回调
		onGetSessionSignatureSuccess : function(data){
			packageContext.setGroupBuddySessionSignature(data);
		},
	
	
	
	
		// 好友状态改变的回调
		onBuddyStatusChange : function(result){
			packageContext.setState(result.uin, result.status, result.client_type);
		},

		// 自己签名载入后的回调
		onGetSelfSignatureSuccess : function(result){
			packageContext.setSelfSignature(result);
		},

		// 好友列表全信息载入后的回调
		onGetBuddyListSuccess : function(result){
			packageContext.isBuddyList=true;
			packageContext.setBuddyClass(result);
			//J.out("===============setBuddyClass end!!!!")
			packageContext.setBuddyList(result);
			//J.out("================setBuddyList end!!!!")
	
			// 发起获取在线人数
			EQQ.RPCService.sendGetOnlineBuddies();
			// 发起获取最近联系人列表
			if(packageContext.isBuddyList&&packageContext.isGroupList){
				qqweb.rpcService.sendGetRecentList();
			}
	
			// 开始发送poll
			EQQ.startPoll();
	
		},
		// 好友列表全信息载入失败的回调
		GetBuddyListError : function(data){
			//J.out("00000")
			$E.notifyObservers(EQQ, "LoginFailure", data);
	
		},
		// 群列表载入后的回调
		onGetGroupListSuccess : function(result){
			packageContext.isGroupList=true;
			/*packageContext.setGroupList(result.list||result);
			packageContext.setGroupMask(result.mask||"0");*/ 
			
		 
			var _mask = result.gmasklist || [];
			var _state = 0;
			for( var i = 0; i < _mask.length; i++){
				var g = _mask[i];
				if( g.gid === 1000 ){
				   _state = g.mask;	
				  /// break;
				}else{ 
					for( var k=0; k < result.gnamelist.length; k++ ){
						var gn = result.gnamelist[k];
						if( gn.gid === g.gid ){
						   	result.gnamelist[k].mask = g.mask;
							break;
						}
					}
					
				}
			} 
			packageContext.setGroupList(result.gnamelist||result);
			packageContext.setGroupMask(_state);
			
			// 发起获取最近联系人列表
			if(packageContext.isBuddyList&&packageContext.isGroupList){
				qqweb.rpcService.sendGetRecentList();
			}
		},
		GetGroupListError : function(data){
			$E.notifyObservers(EQQ, "LoginFailure", data);
		},
		// 群信息载入后的回调
		onGetGroupInfoSuccess : function(result){
			packageContext.setGroupInfo(result);
		},
		
		onGetRecentListSuccess : function(result){
			packageContext.setRecentList(result);
		},
		
		
		
		onPollSuccess : function(result){
			if(result){
				for(var i=0; i<result.length; i++){
					var pollMsg = result[i];
					switch(pollMsg.poll_type){
						case "buddies_status_change":
							observer.onBuddyStatusChange(pollMsg.value);
							break;
					}
				}
			}
			

			
		},
	
		onLoginSuccess : function(result){
			var uin = packageContext.getSelfUin();
			packageContext.setState(uin, result.status, "QQWeb");
			//self.setStatus(result.status);
			EQQ.index=result.index;
			EQQ.port=result.port;

		},
		
		onAddANewBuddy : function(data) {
			var tuin= data.tuin;
			var gid= data.gid;
			var newstate= data.newstate;
			var markname= data.markname;
			//重写rpc的onSuccess方法
			qqweb.rpcService.sendGetUserInfo(tuin,function(data){
				if(data.retcode === 0){
					var userData = data.result;
					var uin = data.arguments.uin;
					var user = packageContext.getUserByUin(uin);
					if(user){
						user.setNick (userData.nick);
						user.setFace (userData.face);//face?
						user.setGender (userData.gender);
						user.setClassId(gid);
						packageContext.addBuddy(user);
					}else{
						var option = {
							uin: uin,
							allow : userData.allow,
							nick: userData.nick,
							face: userData.face,
							gender: userData.gender
						};
						user = packageContext.createUser(option);
						user.setClassId(gid);
						packageContext.addUser(user);
						packageContext.addBuddy(user);
					}
					$E.notifyObservers(EQQ.Presenter.MainPanel, "AddANewBuddy", {user:user,newstate:newstate,markname:markname});
				}else{
					//暂无
				}
			});
		}

	};
	
		
		
	//== EQQ.Model.BuddyList 的公共方法 ============================================================================
	//------------------------------------------------------------------------------------------------------------
	this.init = function(){

		//this.reset();
		
		// 好友列表全信息载入成功的观察者
		$E.addObserver(qqweb.rpcService, "GetBuddyListSuccess", observer.onGetBuddyListSuccess);
		$E.addObserver(qqweb.rpcService, "GetBuddyListError", observer.GetBuddyListError);
		// 群列表载入成功的观察者
		$E.addObserver(qqweb.rpcService, "GetGroupListSuccess", observer.onGetGroupListSuccess);
		$E.addObserver(qqweb.rpcService, "GetGroupListError", observer.GetGroupListError);
		// 最近联系人载入成功的观察者
		$E.addObserver(qqweb.rpcService, "GetRecentListSuccess", observer.onGetRecentListSuccess);
		//$E.addObserver()
		// User信息载入成功的观察者
		$E.addObserver(qqweb.rpcService, "GetUserInfoSuccess", observer.onGetUserInfoSuccess);
		// User信息载入失败
		$E.addObserver(qqweb.rpcService, "GetUserInfoError", observer.onGetUserInfoError);
		// 群信息载入成功的观察者
		$E.addObserver(qqweb.rpcService, "GetGroupInfoSuccess", observer.onGetGroupInfoSuccess);
		// 好友QQ等级载入成功的观察者
		$E.addObserver(qqweb.rpcService, "GetQQLevelSuccess", observer.onGetQQLevelSuccess);
		// 好友签名载入成功的观察者
		$E.addObserver(qqweb.rpcService, "GetBuddySignatureSuccess", observer.onGetBuddySignatureSuccess);
		//	群设置成功后的观察者
		$E.addObserver(qqweb.rpcService,"ChangeGroupMaskSuccess",observer.onChangeGroupMaskSuccess);
		
		 //	获取群屏蔽配置成功后 
		$E.addObserver(qqweb.config,"GetGroupMaskConfigSuccess",observer.onGetGroupMaskConfigSuccess);
		
		// 登录成功的观察者
		$E.addObserver(EQQ, "LoginSuccess", observer.onLoginSuccess);
		// 在线好友数据载入成功的观察者
		$E.addObserver(EQQ.RPCService, "GetOnlineBuddiesSuccess", observer.onGetOnlineBuddiesSuccess);
		// 自己签名载入成功的观察者
		$E.addObserver(EQQ.RPCService, "GetSelfSignatureSuccess", observer.onGetSelfSignatureSuccess);
		// 群友会话验证载入成功的观察者
		$E.addObserver(EQQ.RPCService, "GetSessionSignatureSuccess", observer.onGetSessionSignatureSuccess);
		// 添加在线好友数载入观察者
		$E.addObserver(EQQ.RPCService, "PollSuccess", observer.onPollSuccess);
		
		//添加需要增加好友观察者
		$E.addObserver(packageContext,"AddANewBuddy",observer.onAddANewBuddy);
		
		//添加状态改变观察者
		$E.addObserver(packageContext,"BuddyStatusChange",observer.onBuddyStatusChange);
		
	
		
		
	};
	
	
	this.reset = function(){
		selfUin = 0;
		
		classList = [];
		id2class = {};
		userList = [];
		uin2user = {};

		buddyList = [];
		uin2buddy = {};
		
		strangerList = [];
		uin2stranger = {};
		
		blackList = [];
		uin2black = {};
		
		uin2buddy = {};
		onlineBuddy = [];
		
		groupList = [];
		gid2group = {},
		code2group = {};
		
		// ===================================
		
		this.setSelf(qqweb.portal.self);

	};
	
	
	

	this.getUserSignature = function(uin) {
		qqweb.rpcService.sendGetSignature(uin);
	};
	
	this.sendGetQQLevel = function(uin){
		qqweb.rpcService.sendGetQQLevel(uin);
	};
	
	/* == 自己相关操作 =======================*/

	// 设置自己的user对象
	this.setSelf = function(userData){
		var option = {
			uin: userData.uin,
			allow : userData.allow,
			nick: userData.nick,
			face: userData.face,
			age: userData.age,
			gender: userData.gender,
			vip: userData.vip
		}
		var user = new User(option);
		this.addUser(user);
		this.setSelfUin(userData.uin);
		
		var state = EQQ.getDefaultState();
		//alert(state)

		this.setState(userData.uin, state, "QQWeb");
		$E.notifyObservers(this, "SelfInfoChange", this.getSelf());

	};
	
	// 获取自己的user对象
	this.getSelf = function(){
		return this.getUserByUin(this.getSelfUin());
	};
	
	// 获取自己的在线状态对象
	this.getSelfState = function(){
		var self = this.getSelf();
		if(self){
			return self.state;
		}
	};

	// 设置自己的uin
	this.setSelfUin = function(uin){
		selfUin = uin || 0;
	};
	
	// 获取自己的uin
	this.getSelfUin = function(){
		return selfUin;
	};
	
	this.setSelfSignature = function(result){
		this.getUserByUin(this.getSelfUin()).setSignature(result);
		$E.notifyObservers(this, "SelfSignatureChange", this.getSelf());

	};
	
	// 发起改变自己的状态
	this.sendChangeStatus = function(state){
		EQQ.RPCService.sendChangeStatus({newstatus:state});
	};
	
	// 设置群屏蔽信息
	this.sendChangeGroupMask = function(data){
		 	
		var _groupMaskState =  data.type === 'global' ?  data.mask : groupMask;
		var _groupMask = {'cAll':_groupMaskState, idx :EQQ.index, port:EQQ.port};
		for( var k = 0; k < groupList.length; k++){
			var _group = groupList[k];
			if( data.type === 'single' &&  data.uin === _group.gid ){
				_groupMask[_group.gid] = data.mask;	
			}else{
				_groupMask[_group.gid] = _group.mask;	
			}
		}
 	// qqweb.rpcService.sendChangeGroupMask({type:data.type,index:EQQ.index,port:EQQ.port,uin:data.uin,mask:data.mask});
		
		 var option = {   
							/*action: 'set', */
							retype : 3,
							callback : '',//parent.qqweb.layout.onSendThemeSuccess 跨域
							app:'EQQ',
							itemlist :'{"groupmask":'+J.json.stringify(_groupMask) +"}" 
					   };
		qqweb.rpcService.sendSetConfig(option);	
		observer.onChangeGroupMaskSuccess({uin:data.uin,mask:data.mask});//直接设置为成功
	};
	
	/* == 好友相关操作 =======================*/
	
	// 设置好友分组
	this.setBuddyClass = function(result){
		//var a={"result":[{"index":1,"name":"\u670b\u53cb"},{"index":2,"name":"\u5bb6\u4eba"},{"index":3,"name":"\u540c\u5b66"}]};
		classList = result.categories;
		for(var i=0; i<classList.length; i++){
			var oneClass = classList[i];

			//oneClass.index = oneClass.index;
			//oneClass.name = J.string.toSingleLine(oneClass.name);
			oneClass.htmlName=J.string.toHtml(oneClass.name);
			oneClass.titleName=J.string.toTitle(oneClass.name);
			oneClass.count=0;
			oneClass.onlineCount=0;
			oneClass.list={
				"callme":[],
				"online":[],
				"away":[],
				"busy":[],
				"silent":[],
				"offline":[]
				
			};

			id2class[oneClass.index] = oneClass;
		}
		$E.notifyObservers(this, "BuddyClassChange", this.getClassList());
	};
	
	// 获取好友分组
	this.getClassList = function(){
		return classList;
	};
	

	
	// 设置好友状态
	this.setAllBuddyState = function(result){
		onlineBuddy = [];
		var offlineStatus = EQQ.hash.onlineStatus.offline;
		for(var i=0; i<result.length; i++){
			var buddy = result[i];
			this.setState(buddy.uin, buddy.status, buddy.client_type);
		}
		
		$E.notifyObservers(this, "AllOnlineBuddyReady", this.getOnlineBuddy());
		$E.notifyObservers(this, "AllClassOnlineBuddyReady", this.getClassList());

	};
	
	
	// 设置一个人的状态、
	this.setState = function(uin, state, clientType){
		var user = this.getUserByUin(uin);
		if(user){
			var oldState = user.state;
	
			user.setState(state);
			user.clientType = clientType;
			
			if(uin == this.getSelfUin()){
				//alert("setState:"+state)
				$E.notifyObservers(this, "SelfStateChange", this.getSelfState());
			}else if(user.classId === EQQ.hash.userClassType.stranger){
				
			}else if(user.classId === EQQ.hash.userClassType.balck){
				
			}else{
	
				var buddyClass = this.getClassByUin(user.uin);
		
				buddyClass.list[user.state].unshift(user);
				var tempArr = buddyClass.list[oldState];
				for(var j=0; j<tempArr.length; j++){
					if(tempArr[j].uin == uin){
						tempArr.splice(j,1);
					}
				}
				var offlineStatus = EQQ.hash.onlineStatus.offline;
				if(oldState == offlineStatus || state == offlineStatus){
					buddyClass.onlineCount = buddyClass.count - buddyClass.list[offlineStatus].length;
					//TODO alert(buddyClass.list[offlineStatus].length)
					if(state == offlineStatus){
						for(var i=0; i<onlineBuddy.length; i++){
							if(onlineBuddy[i].uin == uin){
								onlineBuddy.splice(i,1);
							}
						}
					}else{
						onlineBuddy.push({uin:uin, state:state, clientType:clientType});
					}
					$E.notifyObservers(this, "OnlineBuddyChange", uin);
				}
				$E.notifyObservers(this, "BuddyStateChange", uin);
			}
		}
	};
	
	this.getBuddyCount = function(index, state){
		if(state){
		}else{
			this.getClass(index);
		}
	};
	
	// 读取一个人的状态
	this.getState = function(uin){
		var user = this.getUserByUin(uin);
		if(user){
			return user.getState();
		}else{
			return null;
		}
	};
	
	// 获取在线好友数
	this.getOnlineBuddy = function(){
		return onlineBuddy;
	};
	
	
	
	
	this.addUser = function(user){

		if(uin2user[user.uin]){
			
		}else{
			uin2user[user.uin] = user;
			userList.push(user);
		}
		return user;
	};
	
	this.addBuddy = function(user){

		if(uin2buddy[user.uin]){
			
		}else{
			user.type = "buddy";
			uin2buddy[user.uin] = user;
			buddyList.push(user);
		}
		return user;
	};
	
	this.createUser = function(option){
		return new User(option);
	};
	
	// 添加一个陌生人
	this.addStranger = function(user){
		if(uin2stranger[user.uin]){
			
		}else{
			user.type = "stranger";
			uin2stranger[user.uin] = user;
			strangerList.push(user);
		}
		return user;
	};
	
	this.addBlack = function(user){
		if(uin2black[user.uin]){
			
		}else{
			uin2black[user.uin] = user;
			blackList.push(user);
		}
		return user;
	};
	
	// 获取陌生人好友列表
	this.getStrangerList = function(){
		return strangerList;
	};
	
	// 数据模型负责业务逻辑和数据存储
	this.setBuddyList = function(result){

		buddyList = [];
		var friends = result.friends;
		var selfUin = this.getSelfUin();

		for(var i=0; i<friends.length; i++){
			
			if(friends[i].uin != selfUin){

				//J.out(friends[i].uin)
				var userData = result.info[i];

				var option = {
					uin: userData.uin,
					allow : userData.allow,
					nick: userData.nick,
					face: userData.face,
					age: userData.age,
					gender: userData.gender,
					vip: userData.vip
				}

				var user = new User(option);

				this.addUser(user);

				this.addBuddy(user);

				// 如果找不到分组id则放到我的好友中
				if(this.getClassById(friends[i].categories)){
					user.setClassId(friends[i].categories);
				}else{
					user.setClassId(0);
				}
				//J.out(userData.uin)
			}
		}

		// 设置备注名字段
		var marknames = result.marknames;
		if(marknames){

			for(var i=0; i<marknames.length; i++){
				var user = this.getUserByUin(marknames[i].uin);
				// 有时候会有非好友的备注出现
				if(user){
					user.setMarkName(marknames[i].markname);
				}

			}
		}

		for(var i=0; i<buddyList.length; i++){
			if(buddyList[i].uin != this.getSelfUin()){

				var oneBuddyClass = this.getClassById(buddyList[i].classId);

				if(!oneBuddyClass.list[buddyList[i].state]){
					oneBuddyClass.list[buddyList[i].state] = [];
				}
				oneBuddyClass.list[buddyList[i].state].push(buddyList[i]);
				oneBuddyClass.count++;
				if(buddyList[i].state != EQQ.hash.onlineStatus.offline){
					oneBuddyClass.onlineCount++;
				}
			}
		}
		$E.notifyObservers(this, "BuddyListChange", this.getBuddyList());

	};

	this.getBuddyList = function(){
		return buddyList;
	};
	
	// 判断是否已经在用户资料列表中
	this.isUser = function(uin){
		return (J.array.indexOf(userList, uin) !== -1);
	};
	
	// 判断是否已经在好友列表中
	this.isBuddy = function(uin){
		return uin2buddy[uin];
	};
	
	// 获取一个好友
	this.getBuddyByUin = function(uin){
		return uin2buddy[uin];
	};
	
	
	// 判断是否已经在陌生人列表中
	this.isStranger = function(uin){
		return uin2stranger[uin];
	};
	
	// 判断是否已经在黑名单列表中
	this.isBlack = function(uin){
		return uin2black[uin];
	};
	
	
	
	
	

	// 根据uin获取buddy对象
	this.getUserByUin = function(uin){
		if(uin2user){
			return uin2user[uin];
		}else{
			//J.out("a3:"+uin+uin2user);
		}

	};
	
	// 根据uin获取class id
	this.getClassIdByUin = function(uin){
		return uin2user[uin].classId;
	};
	
	// 根据uin获取class对象
	this.getClassByUin = function(uin){
		var classId = this.getClassIdByUin(uin)
		return this.getClassById(classId);
	};
	
	
	// 根据id获取class对象
	this.getClassById = function(id){
		return id2class[id];
	};
	
	
	/* == 群相关操作 =======================*/

	// 添加一个群
	this.addGroup = function(group){
		if(code2group[group.code]){
			
		}else{
			code2group[group.code] = gid2group[group.gid] = group;
			groupList.push(group);
		}
		return group;
	};
	

	
	// 数据模型负责业务逻辑和数据存储
	this.setGroupList = function(result){     
		groupList = [];
		
		for(var i=0; i<result.length; i++){
			var groupData = result[i];
			var type = "commonGroup";

			// 是否是高级群
			if(groupData.flag & 0x10){
				type = "seniorGroup";
			// 是否是超级群
			}else if(groupData.flag & 0x2000000){
				type = "superGroup";
			// 是否禁用
			}else if(groupData.flag & 0x2){
				type = "forbiddenGroup";
			// 是否企业群
			}else if(groupData.flag & 0x100){
				type = "enterpriseGroup";
			// 是否过期的超级群
			}else if(groupData.flag & 0x4000000){
				type = "expireSuperGroup";
			}
			
			var option = {
				gid: groupData.gid,
				code: groupData.code,
				type: type,
				name: groupData.name,
				mask: groupData.mask||"0"
			}
			var group = new Group(option); 
			this.addGroup(group);
		}

		$E.notifyObservers(this, "GroupListChange", this.getGroupList());

	};
	this.setGroupMask = function(state){
		groupMask=state;
		$E.notifyObservers(this, "GroupMaskChange", groupMask);
	};
   
	
	this.getGroupMask = function(){
		return groupMask;
	}
	this.getGroupList = function(){
		return groupList;
	};
	
	
	this.setRecentList = function(result){
		recentList=result.contents;
		$E.notifyObservers(this, "RecentListChange", this.getRecentList());
	};
	this.getRecentList = function(){
		return recentList;
	};
	
	
	// 数据模型负责业务逻辑和数据存储
	this.setGroupInfo = function(result){
		var ginfo = result.ginfo;
		var minfo = result.minfo;
		var stats = result.stats;
		var cards = result.cards||[];
		var group = this.getGroupByCode(ginfo.code);
		group.setLevel(ginfo.level);  
		
		var selfUin = this.getSelfUin();

		
		group.setAnnouncement(ginfo.memo);
		var membersData = ginfo.members;
		var members = [];
		var hasManageAuthority = false;
		
		for(var i = 0; i<membersData.length; i++){
			var flag = "common";
			if(membersData[i].mflag & 0x1){
				flag = "manager";
				if(membersData[i].muin === selfUin){
					hasManageAuthority = true;
				}
				
			}else if(membersData[i].mflag & 0x2){
				flag = "manager2";
				if(membersData[i].muin === selfUin){
					hasManageAuthority = true;
				}
			}
			if(membersData[i].muin == ginfo.owner){
				flag = "master";
				if(membersData[i].muin === selfUin){
					hasManageAuthority = true;
				}
			}
			
			var uin = membersData[i].muin;
			var nick = minfo[i].nick;
			var usercard = minfo[i].nick;
			var state = stats[i].stat;
			
			var showName = nick+"<"+uin+">";
			var allName = nick+"<"+uin+">";
			 
			//获取群名片
			for( var k = 0; k < cards.length; k++){
				if( cards[k].muin === uin ){
				     usercard = cards[k].card;
					 break;
				}
			}
			
			
			
			var user = this.getUserByUin(membersData[i].muin);  
			if(user){ //如果是我的好友
				if(user.uin !== selfUin){
					user.setState(qqweb.util.code2state(state));  
				}
			   
				if( user.type === 'groupBuddy' || user.uin === selfUin ){ //非好友和自己
				}else{
					usercard = usercard === nick ? user.showName : usercard;//user.htmlShowName : usercard;  
				}
 			}else{
				var option = {
					uin : uin,
					nick : nick,
					state :  qqweb.util.code2state(state)
				}
					 
				user = this.createUser(option);
				user.type = "groupBuddy";
				user.group = group;
				//J.out("user3-1: "+user+user.uin);
				this.addUser(user);
				//this.addStranger(user);
		    }
		    
			members[i] = {
				uin : uin,
				flag : flag,
				
				nick : nick,
				htmlNick : J.string.toHtml(nick),
				titleNick : J.string.toTitle(nick),
				
				showName : showName,
				htmlShowName : J.string.toHtml(showName),
				titleShowName : J.string.toTitle(showName),
				
				allName : allName,
				htmlAllName : J.string.toHtml(allName),
				titleAllName : J.string.toTitle(allName),
				usercard : J.string.toHtml(usercard) //usercard//J.string.toHtml(usercard) 
			};
			members[i].info = user;
			
			
		}
		
		group.isLoadInfo = true;
		
		group.hasManageAuthority = hasManageAuthority;
		 
		group.updateMembers(members);
		
		
		
		$E.notifyObservers(this, "GroupInfoChange", group);

	};
	
	//设置新的群员在先状态
	this.setMemberSate = function(result){
		var gcode = result.gcode;		 
		var stats = result.stats;		 
		var group = this.getGroupByCode(gcode);		 
	    var members = group.members;
		for (var i = 0,length = members.length; i < length; i++) {
			var user = members[i].info;
			//获取群名片
			for( var k = 0; k < stats.length; k++){
				if( stats[k].uin === user.uin ){
					var userObj = this.getUserByUin(user.uin);  
					if(userObj){ //如果是我的好友
					   userObj.setState(qqweb.util.code2state(stats[k].stat)); 
					}
				     user.state = qqweb.util.code2state(stats[k].stat);
					 break;
				}
			}
		}
		 
		group.updateMemberState( );
		 
		
	};
	//请求群资料
	this.sendGetGroupInfo = function(option){
		
		var sender = qqweb.rpcService.send(qqweb.CONST.API_SERVER_URL + "get_group_info_ext",{							 
				context : packageContext,
				data : option,//参数
				arguments : option,
				onSuccess : function(data){
					if(data.retcode === 0){
						 //packageContext.onGetGroupNewestStateSuc(data.result);
						 packageContext.setGroupInfo(data.result);
					}else{
						J.out("获取群最新信息失败");
					}
				},
				onError : function(data){
					   J.out("获取群最新信息失败");
				}
			});
	};
	
	//当群聊天窗口置顶时更新群员状态
	this.sendGetGroupNewestState = function(option){
		    
			//var sender = qqweb.rpcService.send(qqweb.CONST.API_SERVER_URL + "get_group_info_ext",{
			var sender = qqweb.rpcService.send(qqweb.CONST.API_SERVER_URL + "get_group_member_stat",{									 
				context : packageContext,
				data : option,//参数
				arguments : option,
				onSuccess : function(data){
					if(data.retcode === 0){
						 packageContext.onGetGroupNewestStateSuc(data.result);
					}else{
						J.out("获取群最新信息失败");
					}
				},
				onError : function(data){
					   J.out("获取群最新信息失败");
				}
			});
	 };
		//获取最新群信息成功后
	this.onGetGroupNewestStateSuc = function(result){
 			//this.setGroupInfo(result);
			this.setMemberSate(result);
	};	
	
	// 记录群友的会话签名
	this.setGroupBuddySessionSignature = function(data){
		var uin = data.arguments.to_uin;
		
		var user = this.getUserByUin(uin);
		//J.out("data.result.verify_sig.value:"+data.result.verify_sig.value);
		if(data.result.verify_sig.type === 0 && data.result.group_sig.type === 0){
			user.chatSession = data.result;
			$E.notifyObservers(this, "GroupBuddySessionSignatureChange", user.uin);
		}
		//J.out("data.result.group_sig.value:"+data.result.group_sig.value);
		
		
	};
	
	
	
	// 根据code获取group对象
	this.getGroupByCode = function(code){
		return code2group[code];
	};
	// 根据gid获取group对象
	this.getGroupByGid = function(gid){
		return gid2group[gid];
	};
	
	// 获取群详细信息
	this.getGroupInfo = function(code){
		
		
		/*var group = this.getGroupByCode(code);
		
		// 如果已经加载群详细信息
		if(group.isLoadInfo){
			$E.notifyObservers(this, "GroupInfoChange", group);
			return group;
		}else{
		// 否则,发起获取群详细信息的请求
			 
			 this.sendGetGroupInfo({gcode:code});
		}*/
		//修改为：重新打开窗口即重新拉取信息一次
		this.sendGetGroupInfo({gcode:code});
	};
	
	// 获取群友会话验证信息
	this.sendGetSessionSignature = function(uin){
		var user = this.getUserByUin(uin);
		var gid = user.group.gid;
		//J.out("gid:"+gid);
		EQQ.RPCService.sendGetSessionSignature({
			group_uin : gid,
			to_uin : uin
		});
	};
	
	
	this.sendGetUserInfo = function(uin){
		qqweb.rpcService.sendGetUserInfo(uin);
	};
	
	this.isGroupPrompt = function(gid){
		var group=this.getGroupByGid(gid);
		groupMask = parseInt(groupMask);
		switch(groupMask){
			case 0:
				switch(parseInt(group.mask)){
					case 0:
						return true;
						break;
					case 1:
						return false;
						break;
					case 2:
						return false;
						break;
				}
				break;
			case 1:
				return true;
				break;
			case 2:
				return false;
				break;
			case 3:
				return false;
				break;
		}
	};
	
	
	
});
/* == EQQ 聊天相关模型层 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2009.11.18 ----- */
 
 
// 模型：...
Jet().$package("EQQ.Model.ChatMsg", function(J){
	//== EQQ.Model.ChatMsg 的局部变量、类声明 ======================================================================
	//------------------------------------------------------------------------------------------------------------
	var packageContext = this,
		$E = J.event,		
		//聊天记录
		msgRecord = {},

		// 消息盒子中的用户列表
		messageBoxUserList = [],
		uin2messageBoxUser = {},
	
		// 消息盒子中的群列表
		messageBoxGroupList = [],
		gid2messageBoxGroup = {},
	
		customFaceList,
		
		//聊天输入框图片信息列表
		sendPicList = {},
		
		//接收文件对象列表,filsList对象包括isFinished当传输失败或超时为true，然后不处理此session_id的消息
		filesList = {},
		finishFilesList = [],//存储已经处理过的文件状态，防止超时消息提示
		
		//消息指针
		msgPointer= {},
		sequence = 0,
		t,
		groupCustomFaceKeyTime = 0,
		groupCustomFaceKey;
	
	t = (new Date()).getTime(),
	t = (t - t % 1000) / 1000;
	t = t % 10000 * 10000;
	
	
	
	//== EQQ.Model.ChatMsg 的私有方法 ======================================================================
	//------------------------------------------------------------------------------------------------------------
	var getMsgId = function(){
		sequence++;
		return t + sequence;
	};
	
	//处理日期的格式
	//返回如 2009-09-04 13:25
	var toLocaleTimeString = function(timestamp) {
		if(J.isNumber(timestamp)) {
			timestamp = timestamp*1000;
		}
		var date = new Date(timestamp);
		return J.date.format(date, "YYYY-MM-DD hh:mm:ss");
	};

	var onSendGetCustomFaceListSuccess = function(cFace){
		packageContext.setCustomFaceList(cFace);
	};
	
	
	//== EQQ.Model.ChatMsg 的公共方法 ======================================================================
	//------------------------------------------------------------------------------------------------------------
	// 初始化
	this.init = function(){
		// 
		$E.addObserver(EQQ.RPCService, "SendMsg", J.bind(this.onSendMsgSuccess,this));
		// 添加在线好友数载入观察者
		$E.addObserver(EQQ.RPCService, "PollSuccess", J.bind(this.onPollSuccess,this));
		//忽略
		$E.addObserver(EQQ.RPCService, "SendMsgError", J.bind(this.onSendMsgError,this));
		
		$E.addObserver(EQQ.RPCService, "SendGetGroupCustomFaceKeySuccess", J.bind(this.onSendGetGroupCustomFaceKeySuccess,this));
		
		//监听申请离线图片成功事件
		$E.addObserver(EQQ.RPCService, "sendGetOfflinePicUrlSuccess", J.bind(this.onGetOfflinePicUrlSuccess,this));
		//监听申请离线图片失败事件
		$E.addObserver(EQQ.RPCService, "getSendPicUrlError", J.bind(this.onSetSendPicUrlError,this));
		
		
	};
	
	
	
	this.setGroupCustomFaceKey = function(key){
		groupCustomFaceKeyTime = J.now();
		groupCustomFaceKey = {
			key : key.gface_key,
			signature : key.gface_sig
		};
	};
	this.getGroupCustomFaceKey = function(){
		return groupCustomFaceKey;
	};
	this.isGroupCustomFaceKeyTimeout = function(){
		// 20分钟超时,2个小时
		return (J.now() - groupCustomFaceKeyTime) > 1000*60*60* 60*2;
	};
	
	this.sendGetGroupCustomFaceKey = function(msg){
		
		EQQ.RPCService.sendGetGroupCustomFaceKey({
			arguments : {
				msg : msg
			}
		});
		
		
	};
	
	this.onSendGetGroupCustomFaceKeySuccess = function(data){
		var msg = data.arguments.msg;
		
		this.setGroupCustomFaceKey(data.result);
		this.sendGetGroupCustomFaceInfo(msg);
	};
	
	
	
	// 获取信息(发送后)
	this.sendGetGroupCustomFaceInfo = function(msg){
		var key = this.getGroupCustomFaceKey();		 
		EQQ.RPCService.sendGetGroupCustomFaceInfo({ 
			group_uin : msg.to,
			group_code : EQQ.Model.BuddyList.getGroupByGid(msg.to).code,
			key : key.key,
			sig : key.signature,			 
			content : J.json.stringify(msg.content)
			 
		});
		var msgId = getMsgId();
		var self = EQQ.Model.BuddyList.getSelf();
		var msgList = {
				type: msg.type,
				from_uin: 0,
				sender_uin: self.uin,
				sender: self,
				time: toLocaleTimeString(new Date()),
				content: msg.content,
				msg_id: msgId,
				group_code : EQQ.Model.BuddyList.getGroupByGid(msg.to).code 
			};
		 
		$E.notifyObservers(this, "GroupMessageListChange",{
				gid: msg.to,
				msgList: [msgList]
			});
	};
	
	
	// 获取信息
	this.onGetGroupCustomFaceInfoSuccess = function(data){
		alert(data);
		
		
	};
	////上传"发送图片"回调，申请图片地址(个人对个人)
	this.callbackSendPic = function(data){	
	   	 
		 if( data.filesize > ( 1*1024 * 1024) )//限制1mb
		 {		
		    data.retcode = "100";
			data.maxFileSize = "1MB";// 
			$E.notifyObservers(this, "uploadSendPicError", data);
		 }else if( data.retcode != 0 )
		 {
			$E.notifyObservers(this, "uploadSendPicError", data);
		 }else
		 {			
 			 sendPicList[data.filepath] = data;
			 var self = EQQ.Model.BuddyList.getSelf();
			 EQQ.RPCService.sendGetOfflinePicUrl({f_uin:self.uin,file_path : data.filepath,clientid : packageContext.getClientidFromRpc()});
		 }
	};
	//获取离线图片地址成功
	this.onGetOfflinePicUrlSuccess = function(data){   
	    sendPicList[data.result.file_path].fileurl = data.result.url;
		if( sendPicList[data.result.file_path] )
	        data.fileid = sendPicList[data.result.file_path].fileid;
			
		$E.notifyObservers(this, "GetSendPicUrlSuccess", data);
	};
	//监听申请离线图片失败事件
	this.onSetSendPicUrlError = function(data){
		if( sendPicList[data.result.file_path] )
	     data.fileid = sendPicList[data.result.file_path].fileid;
		$E.notifyObservers(this, "getSendPicUrlError", data);
	};
	this.getSendPicUrlByFilePath = function(filepath){
		if( typeof(sendPicList[filepath]) == "undefined" )
		  return '';
		else
		  return sendPicList[filepath].fileurl;
	};
	
	//群发送图片回调，	
	this.callbackSendPicGroup = function(data){		
		if (data.ret === 0) {			 
			$E.notifyObservers(this, "getSendPicGroupSuccess", data.msg); 		
		}else if(data.ret === 4){ //重复上传
			var _tmpArr = data.msg.split(" -");
			data.msg = _tmpArr[0];
			$E.notifyObservers(this, "getSendPicGroupSuccess", data.msg);
		}else {
			 $E.notifyObservers(this, "sendPicGroupError", data); 
		}
	};
	// 发送消息
	this.sendMsg = function(option) { 
		var msgId = getMsgId();
		var content_html = "";
		var content_string = "";
		var msg;
		var param = {};
		option = option || {};
		option.type = option.type || "single";
		var attach = typeof(option.attach) != 'undefined' && option.attach ? option.attach : '';
		
		var self = EQQ.Model.BuddyList.getSelf();
		

		for(var i=0; i<option.content.length; i++) {
			var msgContent = option.content[i];
			if(msgContent[0] === "face") {
				//系统表情做编号转换
				msgContent[1] = EQQ.CONST.TRANSFER_TABLE[msgContent[1]];
			}
		}
		

		content_string = J.json.stringify(option.content);
		
		
		
		
		
		// 发送群消息
		if(option.type === "group"){
			param = {
				group_uin:option.to,
				content:content_string,
				msg_id:msgId
			
			};
			EQQ.RPCService.sendGroupMsg(param);
			
			msg = {
				type: option.type,
				from_uin: 0,
				sender_uin: self.uin,
				sender: self,
				time: toLocaleTimeString(new Date()),
				content: option.content,
				msg_id: msgId
			};
			$E.notifyObservers(this, "GroupMessageListChange",{
				gid: option.to,
				msgList: [msg]
			});
			
		
		}
		// 发送个人消息
		else{
			var uin = option.to;
			var user = EQQ.Model.BuddyList.getUserByUin(uin);
			
			// 发送陌生群友消息
			if(user.type === "groupBuddy"){
				param = {
					to:option.to,
					verify_sig : (user.chatSession.verify_sig.value),
					group_sig : (user.chatSession.group_sig.value),
					face : option.face,
					content : content_string,
					msg_id : msgId
				
				};
				EQQ.RPCService.sendGroupBuddyMsg(param);
				
			// 发送双向好友和单向好友消息
			}else{
				param = {
					to:option.to,
					face:option.face,
					content:content_string,
					msg_id:msgId
				
				};
				EQQ.RPCService.sendMsg(param);
			}
			
			
			msg = {
				type: option.type,
				from_uin: 0,
				sender_uin: self.uin,
				sender: self,
				time: toLocaleTimeString(new Date()),
				content: option.content,
				msg_id: msgId,
				attach: attach 
			};
			$E.notifyObservers(this, "MessageListChange",{
				uin: option.to,
				msgList: [msg]
			});
		}
		
		
		
		if (msgRecord[option.to]) {
			msgRecord[option.to].msgList.push(msg);
		}else{
			msgRecord[option.to] = {last:0, msgList:[msg]};
		}
		
		
		
		
		
	};
	
	//增加消息到消息列表，并在聊天窗口中显示(不发送),区别：sendMsg
	this.addMsgToList = function(option){
	   var self = EQQ.Model.BuddyList.getSelf();	  
	   var msgId = getMsgId();
	   var msg = {
				type: option.type,
				from_uin: option.from_uin,
				sender_uin: self.uin,
				sender: self,
				time: toLocaleTimeString(new Date()),
				content: option.content,
				msg_id: msgId,
				attach: typeof(option.attach) != 'undefined' && option.attach ? option.attach : ''//option.attach
			};
			$E.notifyObservers(this, "MessageListChange",{
				uin: option.to,
				msgList: [msg]
			});
			
	    if (msgRecord[option.to]) {
			msgRecord[option.to].msgList.push(msg);
		}else{
			msgRecord[option.to] = {last:0, msgList:[msg]};
		}
	};
	
	// 消息发送成功处理
	this.onSendMsgSuccess = function(data) {
		if(data == "ok") {
			//插入到聊天窗口里面去
			//已经先插入了
		}else{
			// 发送失败
		}
	};
	
	// 消息发送失败处理
	this.onSendMsgError = function(data) {
		$E.notifyObservers(this, "SendMsgError", data);
	};
	
	
	
	
	// 获取消息记录
	this.getMsgHistory = function(uin) {
		if (msgRecord[uin]) {
			$E.notifyObservers(this, "MessageListChange", {uin:uin, msgList:msgRecord[uin].msgList});
		}
	};
	
	// 获取群消息记录
	this.getGroupMsgHistory = function(gid) {
		if (msgRecord[gid]) {
			$E.notifyObservers(this, "GroupMessageListChange", {gid:gid, msgList:msgRecord[gid].msgList});
		}
	};
	
	// 清空聊天记录
	this.clearChatLog = function(uinOrGid){
		if (msgRecord[uinOrGid]) {
			msgRecord[uinOrGid] = {last:0,msgList:[]};
		}
	};
	
	// 接收个人消息
	this.receiveMsg = function(message) { 
       
		var uin = message.from_uin,
			isExist = false,
			count = 0;
		var attach = typeof(message.attach) != 'undefined' && message.attach ? message.attach : '';
        
		var msg = {
			type: "single",
			from_uin: uin,
			sender_uin: uin,
			sender: EQQ.Model.BuddyList.getUserByUin(uin),
			msg_id: message.msg_id,
			content: message.content,			
			time: toLocaleTimeString(message.time),
			attach: attach
		};
		 
		//如果已存在
		if (msgRecord[uin]) {
			var msgList = msgRecord[uin].msgList;
			var length = msgList.length;
			// 查抄重复msg_id的消息
			for(var j=length-1; j>0; j--) {
				if(msgList[j].msg_id == msg.msg_id) {
					isExist = true;
					//J.out("发现重复个人消息，msg_id："+j);
					break;
				}
			}
			
			// 若无重复
			if(!isExist) {
				msgList.push(msg);
				count++;
			}
			
			// 消息游标
			msgPointer[uin] = msg.msg_id;
			//J.out("收到个人消息，MSG_ID" + msg.msg_id);
		}else{
			//如果不存在
			msgRecord[uin]={
				last:0,
				msgList:[]
			};
			msgRecord[uin].msgList.push(msg);
			count++;
			msgPointer[uin] = msg.msg_id;
			//J.out("收到个人第一条消息，MSG_ID" + msg.msg_id);
		}


		 
		var msgObj = {last:0,msgList:[]};
		if(count>0) {
			for(var j=0; j<count; j++) {
				msgObj.msgList.push(msgRecord[uin].msgList[msgRecord[uin].msgList.length-(count-j)]);
			}
		}

		msgRecord[uin].last = 0; //标志为还原
  
		$E.notifyObservers(this, "MessageListChange", {uin:uin, msgList:msgObj.msgList});  
		
		$E.notifyObservers(EQQ, "MessageReceive", {uin:uin, msgList:msgObj.msgList}); 
		
		 packageContext.playerMsgSound({msgType: "single"});
	};
	
	this.receiveSystemMsg = function(message) {
		
		var content;
		switch (message.type) {
			case 'added_buddy_sig':
			case 'added_buddy_nosig':
				content= '添加您为好友';
				break;
			case 'verify_pass_add':
				content= '接受了您的请求，并添加您为好友';
				var newstate= {uin: message.from_uin, status: qqweb.util.code2state(message.stat), client_type:message.client_type};
				$E.notifyObservers(EQQ.Model.BuddyList, "AddANewBuddy", {tuin:message.from_uin,gid:message.group_id,newstate:newstate});
				break;
			case 'verify_pass':
				content= '接受了您的请求';
				var newstate= {uin: message.from_uin, status: qqweb.util.code2state(message.stat), client_type:message.client_type};
				//这里由于后台协议不带gid，所以直接设0
				$E.notifyObservers(EQQ.Model.BuddyList, "AddANewBuddy", {tuin:message.from_uin,gid:0,newstate:newstate});
				break;
			case 'verify_required':
				content= '请求添加您为好友，附加信息('+ (message.msg||'无') +')';
				break;
			case 'verify_rejected':
				content= '拒绝了您的请求，附加信息('+ (message.msg||'无') +')';
				break;
			default:
				content= message.type;
		};
		var aMag= {
			type: "system",
			sender: {htmlShowName: message.from_uin},
			from_uin: message.from_uin,


			content: content,
			msg_id: message.seq,
			opt : {
				uin : message.from_uin,
				nick : message.from_uin,
				allow : message.allow,
				type : message.type,
				msg : message.msg,
				gid : message.group_id
			}
		};
		$E.notifyObservers(EQQ, "MessageReceive", {msgList: [aMag]});
		 packageContext.playerMsgSound({msgType: "system"});
	};
	
	
	
	
	// 接收群消息
	this.receiveGroupMsg = function(message) {
       
		var gid = message.from_uin,
			isExist = false,
			count = 0,
			msgList;

		var msg = {
			type: "group",
			from_uin: gid,
			sender_uin: message.send_uin,
			sender: EQQ.Model.BuddyList.getUserByUin(message.send_uin),
			msg_id: message.msg_id,
			content: message.content,	//content
			time: toLocaleTimeString(message.time)
		};
		
		//如果已存在
		if (msgRecord[gid]) {
			// 查抄重复msg_id的消息
			for(var j=0; j<msgRecord[gid].msgList.length; j++) {
				if(msgRecord[gid].msgList[msgRecord[gid].msgList.length-j-1].msg_id == msg.msg_id) {
					isExist = true;
					J.out("发现重复群消息，msg_id："+j);
					break;
				}
			}
			
			// 若无重复
			if(!isExist) {
				msgRecord[gid].msgList.push(msg);
				count++;
			}
			
			// 消息游标
			msgPointer[gid] = msg.msg_id;
			//J.out("收到群消息，MSG_ID" + msg.msg_id);
		}else{
			//如果不存在
			msgRecord[gid]={
				last:0,
				msgList:[]
			};
			msgRecord[gid].msgList.push(msg);
			count++;
			msgPointer[gid] = msg.msg_id;
			//J.out("收到群第一条消息，MSG_ID" + msg.msg_id);
		}


		

		
		msgList = msgRecord[gid].msgList;
		var length = msgList.length;
		
		var tempMsgList = [];
		if(count > 0) {
			for(var j=count; j>0; j--) {
				tempMsgList.push(msgList[length - j]);
			}
		}

		msgRecord[gid].last = 0; //标志为还原
		//J.out("收到群新消息条数：" + tempMsgList.length+","+count+","+length+"; "+tempMsgList);
		$E.notifyObservers(this, "GroupMessageListChange", {gid:gid, msgList:tempMsgList});
		
		$E.notifyObservers(EQQ, "MessageReceive", {gid:gid, msgList:tempMsgList});
		
		 packageContext.playerMsgSound({msgType: "group",gid: gid});
	};
	
	
	
	
	
	// 添加来消息的用户到消息盒子的用户列表
	this.addMessageBoxUserList = function(message){

		var oldMessage = uin2messageBoxUser[message.from_uin];
		if(oldMessage){
			J.array.remove(messageBoxUserList, oldMessage);
		}
		uin2messageBoxUser[message.from_uin] = message;
		messageBoxUserList.push(message);

		$E.notifyObservers(this, "MessageBoxUserListChange",this.getMessageBoxUserList());

	};
	this.getMessageBoxUserList = function(){
		return messageBoxUserList;
	};
	this.removeMessageBoxUserList = function(uin){
		var oldMessage = uin2messageBoxUser[uin];
		if(oldMessage){
			J.array.remove(messageBoxUserList, oldMessage);
		}

		delete uin2messageBoxUser[uin];

		$E.notifyObservers(this, "MessageBoxUserListChange",this.getMessageBoxUserList());

	};
	
	
	// 添加来消息的群到消息盒子的群列表
	this.addMessageBoxGroupList = function(message){

		var oldMessage = gid2messageBoxGroup[message.from_uin];
		if(oldMessage){
			J.array.remove(messageBoxGroupList, oldMessage);
		}
		gid2messageBoxGroup[message.from_uin] = message;
		messageBoxGroupList.push(message);

		$E.notifyObservers(this, "MessageBoxGroupListChange",this.getMessageBoxGroupList());

	};
	this.getMessageBoxGroupList = function(){
		return messageBoxGroupList;
	};
	this.removeMessageBoxGroupList = function(gid){
		var oldMessage = gid2messageBoxGroup[gid];
		if(oldMessage){
			J.array.remove(messageBoxGroupList, oldMessage);
		}

		delete gid2messageBoxGroup[gid];

		$E.notifyObservers(this, "MessageBoxGroupListChange",this.getMessageBoxGroupList());

	};
	
	
	
	
	
	this.onPollSuccess = function(result){  
		if(result){
			for(var i=0; i<result.length; i++){
				var pollMsg = result[i];
				
				switch(pollMsg.poll_type){
					case "message":
					    packageContext.playerMsgSound();
						//J.out("收到个人消息" + pollMsg.value);
						var message = pollMsg.value;
						var uin = message.from_uin;
						var isBuddy = EQQ.Model.BuddyList.isBuddy(uin);
						
						// 9: 可能是单向好友，也可能是双向好友
						if(message.msg_type === 9){
							// 是双向好友
							if(isBuddy){
								// 正常提示消息
								this.addMessageBoxUserList(message);
								this.receiveMsg(message);
								
							// 是单向好友
							}else{
								// 需要拉取单向好友的资料再提示消息
								this.receiveStrangerMsg(message);
							}
				
						// 10: 可能是单向好友，也可能互不为好友
						}else if(message.msg_type === 10){
							// 是单向好友
							if(isBuddy){
								// 需要拉取单向好友的资料再提示消息
								this.receiveStrangerMsg(message);
								
							// 互不为好友
							}else{
								//抛弃，不做任何处理
							}
						}else if(message.msg_type === 31){
							// 需要拉取群友会话签名再提示消息
							this.receiveGroupBuddyMsg(message);
						}
						break;
						
					case "group_message":
						//J.out("收到群消息" + pollMsg.value);
						var message = pollMsg.value;
						this.addMessageBoxGroupList(message);
						this.receiveGroupMsg(message);
						break;
						
					case "kick_message":
						J.out("踢线通知：" + pollMsg.value);
						var message = pollMsg.value;
						var reasonText = "您已离线 >_< (kick_message)";
						if(message.show_reason !== 0){
							reasonText = message.reason;
						}
						$E.notifyObservers(EQQ, "SelfOffline", reasonText);
						break;
					case "file_message" : 
					    J.out("接收文件通知" + pollMsg.value);						 
						this.receiveFile(pollMsg.value);
					    break;
					case "system_message" :
						J.out("收到系统消息" + pollMsg.value);
						this.receiveSystemMsg(pollMsg.value);
						$E.notifyObservers(EQQ, "SystemMessageRecive", pollMsg.value);
						break;
					case "filesrv_transfer":	
					    J.out("收到文件传输消息" + pollMsg.value);
						this.receiveTransferMsg(pollMsg.value);
					    break;
					case "tips":	
					    J.out("收到tips消息" + pollMsg.value);
						this.receiveTipsMsg(pollMsg.value);
					    break;	
				}
			}
		}

	};
	
	this.receiveStrangerMsg = function(message){
		var uin = message.from_uin;
		var isStranger = EQQ.Model.BuddyList.isStranger(uin);
		if(isStranger){
			
		}else{
			
			var option = {
				uin: uin
			}
			var user = EQQ.Model.BuddyList.createUser(option);
			EQQ.Model.BuddyList.addUser(user);
			EQQ.Model.BuddyList.addStranger(user);
			user.setClassId(EQQ.hash.userClassType.stranger);
			EQQ.Model.BuddyList.setState(user.uin, "online", "unknown");
			
			$E.notifyObservers(this, "NewStranger", user);
			
			
		}

		this.addMessageBoxUserList(message);
		this.receiveMsg(message);
		J.out("receiveStrangerMsg")
		
	};
	
	
	
	this.receiveGroupBuddyMsg = function(message){
		var uin = message.from_uin;
		var isStranger = EQQ.Model.BuddyList.isStranger(uin);
		
		if(isStranger){
			
		}else{
			
			var option = {
				uin: uin
			}
			
			var user = EQQ.Model.BuddyList.createUser(option);
			EQQ.Model.BuddyList.addUser(user);
			EQQ.Model.BuddyList.addStranger(user);
			user.type = "groupBuddy";
			
			user.setClassId(EQQ.hash.userClassType.stranger);
			EQQ.Model.BuddyList.setState(user.uin, "online", "unknown");

			$E.notifyObservers(this, "NewStranger", user);
			

			EQQ.Model.BuddyList.sendGetUserInfo(uin);

		}

		this.addMessageBoxUserList(message);
		this.receiveMsg(message);
		J.out("receiveGroupBuddyMsg, finish")
		
	};
	
	

	this.getMessagePointer = function(uin) {
		//J.out("给你一个MSGID" + msgPointer[uin]);
		return msgPointer[uin] || 0;
	};
	
	
	
	
	
	
	// 设置CustomFaceList
	this.setCustomFaceList = function(cFace){

		customFaceList = J.array.bubbleSort(cFace.data, function(item1, item2){
			return item1[1] - item2[1];
		});

		$E.notifyObservers(this, "GetCustomFaceListSuccess", customFaceList);
		$E.removeObserver(EQQ.RPCService, "SendGetCustomFaceListSuccess", onSendGetCustomFaceListSuccess);
	};
	
	
	
	this.getCustomFaceList = function(){
		return customFaceList;
	};
	this.getSendPicList = function(){
		return sendPicList;
	};
	// 获取群详细信息
	this.loadCustomFaceList = function(){
		
		$E.addObserver(EQQ.RPCService, "SendGetCustomFaceListSuccess", onSendGetCustomFaceListSuccess);
		EQQ.RPCService.sendGetCustomFaceList();
	};
	
	this.getClientidFromRpc = function(){
		return EQQ.RPCService.getClientid();
	};
    //发送文件消息
	this.sendFile = function(data){
		
		var content = [["sendfile",data.filename]];
		 
		var attach = {type:'sendfile',name:data.filename,from_uin:data.to_uin,time:(new Date().getTime()),isread:true,session_id:data.lcid};
		//data.lcid = '88888';
		var _fileid = data.to_uin+'_'+data.lcid; 
		filesList[_fileid] = attach;
		var msg = {
			     type: 'single',
				 from_uin: 0,
				 to: data.to_uin,
				 content: content,
				 attach: attach 
		};
		packageContext.addMsgToList(msg);
	};
	
	//获取接受文件消息
	this.receiveFile = function(msg){
		    
		   //封装成标准消息格式
		   if( msg.mode === 'recv')// ||  msg.mode === 'send_ack' 
		   {
				 var content = [["rfile",msg.name,msg.session_id]];
				 msg.content = content;
				 msg.attach = {type:'rfile',name:msg.name,from_uin:msg.from_uin,time:msg.time,isread:false,session_id:msg.session_id,msg_type:msg.msg_type};
				 var _fileid = msg.from_uin+'_'+msg.session_id; 
				 if( !filesList[_fileid] )
				 {
					 filesList[_fileid] = msg.attach;
					  // 正常提示消息
 				     this.fileMsgToJumpUserList(msg);
					 this.receiveMsg(msg);
					 
				 }else
				 {
					 filesList[_fileid] = msg.attach;
				 }
				 
		   }else if( msg.mode === 'refuse' ){
			    
				if(  msg.type === 161 ){ //视频消息，
				  return;	
				}
				
 				 /*
				   由于上次文件的LCID和拒绝获取的session_id不一致，必须去session_id的后12转换比较
				 */
				 if(  msg.cancel_type == 2 )
				 {  
				    finishFilesList[msg.session_id] = true;
					 var _tmp = parseInt(msg.session_id, 10).toString(2);
					  if( _tmp.length >= 12 )
					  {
						_tmp = _tmp.substr(_tmp.length - 12,12);
						 msg.session_id= parseInt(_tmp, 2).toString(10);
					  }
				 }
				 var _fileid = msg.from_uin+'_'+msg.session_id;//alert(_fileid);
				 var attach = filesList[_fileid];		 	  
				 if( typeof(attach) == 'undefined' )//失效
				   return false;
				 if(   attach.isFinished ){
					  return false;
				 }else{
					 filesList[_fileid].isFinished = true;//已经处理完
				 }
				 var content = [["rffile",attach.name]];
				 attach.type = 'rffile';
				 //if( msg.cancel_type == 1 )  //web2c,客户端取消	
				  if( msg.cancel_type == 2 ) { //web2web接,收方取消					      
					  content = [["wrffile",attach.name]];
					  attach.type = 'wrffile';
				  }else  if( msg.cancel_type == 3 ){//超时				 
					 content = [["rtfile",attach.name]];
					 attach.type = 'rtfile';
				  }				 
				  msg.content = content;				  
				  msg.attach = attach;	
				  
				   // 正常提示消息
 				  this.fileMsgToJumpUserList(msg);
				  this.receiveMsg(msg);
				 
			  if( msg.cancel_type != 2 ) //不是web取消
			  	 $E.notifyObservers(this, "fromCancenFile", _fileid);
			   
		   }else  if( msg.mode === 'send_ack' ){ //web接受方同意本方的文件 w2w
			     var _tmp = parseInt(msg.session_id, 10).toString(2);
				  if( _tmp.length < 12 )
				    return false;
				 _tmp = _tmp.substr(_tmp.length - 12,12);
				 msg.session_id= parseInt(_tmp, 2).toString(10);
				  
			     var _fileid = msg.from_uin+'_'+msg.session_id; 
				 var attach = filesList[_fileid];				
				 var content = [["wrfile",attach.name,attach.session_id]];
				 msg.content = content;
				 msg.attach = {type:'wrfile',name:attach.name,from_uin:attach.from_uin,time:msg.time,session_id:msg.session_id};
				 // 正常提示消息
 				  this.fileMsgToJumpUserList(msg);
				 this.receiveMsg(msg);	
				
			   
		   }else if( msg.type === 161){ //视频消息
		   
			     var content = [["video",'好友发起了视频或音频会话邀请，由于WebQQ目前暂不支持该功能，已自动拒绝好友的邀请。']];
				 msg.content = content;	
				 msg.attach = {type:'video'};
				  // 正常提示消息
				 this.fileMsgToJumpUserList(msg);
				 this.receiveMsg(msg);
 
		   }else
		   {
			 // alert('未知文件消息');   
		   }
			
			
			 
	};
    
   //同意接收文件
   this.agreeReceiveFile = function(attach){	   
	    var content = [["agfile",attach.name,attach.session_id]];
		attach.type = 'agfile';
		var msg = {
			     type: 'single',
				 from_uin: 0,
				 to: attach.from_uin,
				 content: content,
				 attach: attach
		};
		packageContext.addMsgToList(msg);
   };
   //web拒绝接收文件
   this.refuseReceiveFile = function(attach){	 
    
		var content = [["rffile",attach.name,attach.session_id]];
		attach.type = 'rffile';
		var msg = {
			     type: 'single',
				 from_uin: 0,
				 to: attach.from_uin,
				 content: content,
				 attach: attach
		};
		packageContext.addMsgToList(msg);
		var _fileid = attach.from_uin+'_'+attach.session_id;
		filesList[_fileid].isFinished = true;//已经处理完
		
		var clientid = packageContext.getClientidFromRpc();
		EQQ.RPCService.sendRefuseFile({
			 to: attach.from_uin,
			 lcid: attach.session_id,
			 clientid: clientid 
		});	 
   };
    
   this.getFilesList = function(){
	 return filesList;  
   };
   
   //把文件消息通知到头像跳动列表
   this.fileMsgToJumpUserList = function(message){
        
		//本人发送，对方拒绝
		if( message.cancel_type && message.cancel_type == 2 ) 
		{
		   this.addMessageBoxUserList(message);
		   return true;
		}
		
	   if( typeof(message.msg_type) === 'undefined' && !message.msg_type )
	   {
		   var _fileid = message.from_uin+'_'+message.session_id;  
	       var attach = filesList[_fileid];	
		   if( typeof(attach.msg_type) === 'undefined' && !attach.msg_type )
		    return false;
		    message.msg_type = attach.msg_type;//取消文件等消息没有msg_type参数，取原来的
	   }
	 
  
		var uin = message.from_uin;
		var isBuddy = EQQ.Model.BuddyList.isBuddy(uin);
			 
		 
		// 9: 可能是单向好友，也可能是双向好友
		if(message.msg_type === 9){
			// 是双向好友
			if(isBuddy){
				// 正常提示消息
				this.addMessageBoxUserList(message);
				//this.receiveFile(message);								
			// 是单向好友
			}else{
				// 需要拉取单向好友的资料再提示消息
				this.receiveStrangerFileMsg(message);
			}

		// 10: 可能是单向好友，也可能互不为好友
		}else if(message.msg_type === 10){
			// 是单向好友
			if(isBuddy){
				// 需要拉取单向好友的资料再提示消息
				this.receiveStrangerFileMsg(message);
				
			// 互不为好友
			}else{
				//抛弃，不做任何处理
			}
		}else if(message.msg_type === 31){
			// 需要拉取群友会话签名再提示消息
			 this.receiveGroupBuddyFileMsg(message);
		}
   }
   //陌生人文件消息
   this.receiveStrangerFileMsg = function(message){
		var uin = message.from_uin;
		var isStranger = EQQ.Model.BuddyList.isStranger(uin);
		if(isStranger){
			
		}else{
			
			var option = {
				uin: uin
			}
			var user = EQQ.Model.BuddyList.createUser(option);
			EQQ.Model.BuddyList.addUser(user);
			EQQ.Model.BuddyList.addStranger(user);
			user.setClassId(EQQ.hash.userClassType.stranger);
			EQQ.Model.BuddyList.setState(user.uin, "online", "unknown");
			
			$E.notifyObservers(this, "NewStranger", user);
			
			
		}

		this.addMessageBoxUserList(message);
		//this.receiveFile(message);
		J.out("receiveStrangerFileMsg")
		
	};
   
   this.receiveGroupBuddyFileMsg = function(message){
		var uin = message.from_uin;
		var isStranger = EQQ.Model.BuddyList.isStranger(uin);
		
		if(isStranger){
			
		}else{
			
			var option = {
				uin: uin
			}
			
			var user = EQQ.Model.BuddyList.createUser(option);
			EQQ.Model.BuddyList.addUser(user);
			EQQ.Model.BuddyList.addStranger(user);
			user.type = "groupBuddy";
			
			user.setClassId(EQQ.hash.userClassType.stranger);
			EQQ.Model.BuddyList.setState(user.uin, "online", "unknown");

			$E.notifyObservers(this, "NewStranger", user);
			

			EQQ.Model.BuddyList.sendGetUserInfo(uin);

		}

		this.addMessageBoxUserList(message);
		//this.receiveFile(message);
		J.out("receiveGroupBuddyFileMsg, finish")
		
	};
	
	//文件传输消息：超时传输完成等消息
	this.receiveTransferMsg = function(message){  
	    
		 var fileInfo = message.file_infos[0];
		 if( fileInfo.file_name == '' )
		    return;
		var content = '';
		var attach = '';
		 if( fileInfo.file_status == 51 )//
		 {
			 content = [["transtimeout",fileInfo.file_name,message.lc_id]];
			 attach = {type:'transtimeout',name:fileInfo.file_name,isread:true};
			 
		 }else if( fileInfo.file_status == 50 )//
		 {
			 content = [["transerror",fileInfo.file_name,message.lc_id]];
			 attach = {type:'transerror',name:fileInfo.file_name,isread:true};
			 
		 }else if( fileInfo.file_status == 53 ){// refuseed by client
		 
			 content = [["refusedbyclient",fileInfo.file_name,message.lc_id]];
			 attach = {type:'refusedbyclient',name:fileInfo.file_name,isread:true};
			 
		 }else if( fileInfo.file_status == 0 ){//  
		 
			 content = [["transok",fileInfo.file_name,message.lc_id]];
			 attach = {type:'transok',name:fileInfo.file_name,isread:true};
			 
		 }else if( fileInfo.file_status == 10 ){			   
			  //alert('上传完成');
			  return false;
		 }else{  
			return false; 
		 }
		  var _fileid = message.from_uin+'_'+message.lc_id;
		  var tmp = filesList[_fileid]||{};	 //alert(_fileid);
		  if(   tmp.isFinished || ( typeof(finishFilesList[message.session_id]) != 'undefined' &&  finishFilesList[message.session_id] === true) ){
				 return false;
		  }else{
			 tmp.isFinished = true;//已经处理完
		  }
		 //var content = [["transtimeout",fileInfo.file_name,message.lc_id]];		 
		
		 //var attach = {type:'transtimeout',name:fileInfo.file_name,isread:true};
		 var msg = {
			     type: 'single',
				 from_uin: 0,
				 to: message.to_uin,
				 content: content,
				 attach: attach
		};
		packageContext.addMsgToList(msg);
		
 };
 //tips消息
 this.receiveTipsMsg = function(message){	 
      //message.url
	  var url = message.url || '';
	  if( url.indexOf('run=mySignature') === -1 ){
		 return false;  
	  }
 	  var content =  message.txt3.replace('\r\n',':');
	  message.content = content;
	  message.type = "mysigntips";
 		var aMag= {
			type: "mysigntips",
			sender: {htmlShowName: message.from_uin},
			from_uin: message.from_uin,
			allow:1,
			//TODO deewii
			//区别TYPE
			content: content,
			msg_id: message.msg_id,
			opt : {
				uin : message.from_uin,
				nick : message.from_uin,
				msg_id: message.msg_id,
 				type : "mysigntips"
 				 
			}
		};
		message.aMag = aMag;
		$E.notifyObservers(EQQ, "MessageReceive", {msgList: [aMag]});
		packageContext.playerMsgSound({msgType: "mysigntips"});
 };
 //播放声音
 this.playerMsgSound = function(option){
	  option = option || {msgType : 'single'}; //类型消息类型一致
	 
	  switch(option.msgType){ 
				case 'single': 	
				     qqweb.sound.playSound('./sound/msg.mp3',true);
					 break;
				case 'group':
				   //EQQ.Model.BuddyList.getUserByUin(message.send_uin),
				   var groupMask = EQQ.Model.BuddyList.getGroupMask();
				   var group = EQQ.Model.BuddyList.getGroupByGid(option.gid);
				   //当全局设置为全部接收提示或不设置为全部接收提示同时单群设置为提示的时候				  
				   if( groupMask === 1 || ( parseInt(groupMask) === 0 && parseInt(group.mask) === 0 ) ){
					   qqweb.sound.playSound('./sound/msg.mp3',true);
				   }					 
					
					break;
				case 'system': 		 
				case 'mysigntips': //回复我的签名				
				case 'mail' : 
				      qqweb.sound.playSound('./sound/system.mp3',true);
					break;
				///default:qqweb.sound.playSound('./sound/msg.mp3',true);;
			};
	  
 }

});






Jet().$package("EQQ.View.MainPanel", function (J) {
    //== EQQ.View.MainPanel 的局部变量声明 =======================================================================================
    //------------------------------------------------------------------------------------------------------------
    var packageContext = this,
		$D = J.dom,
		$E = J.event,
		isStatePanelShow = false,
		isSettingPanelShow = false,
		jumpFlag = false,
		groupJumpFlag = false,
		recentJumpFlag = false,
		flickerClassFlag = false,

		classExpandFlag = {},
		avatarUins = [],
		unloadAvatarList = [],
		classAvatarLoadFlag = {},
		currentBuddyIndex = 0,
		KEY_UP = 38,
    	KEY_DOWN = 40,
    	KEY_ENTER = 13,

		classListCache,
		
		topMargin = 160,
		bottomMargin = 43,
		tipsHeight = 20,
		
		groupMask = "0",
		desktopBody = qqweb.layout.getPanel("desktop").body,

		mouseoverTimer = null,
		currentBuddy,
		searchResultCache,
		isChunkLoadingAvatar = false;


    EQQ.avatarMouseoverTimer = null;








    //== EQQ.View.MainPanel 的私有方法 =======================================================================================
    //------------------------------------------------------------------------------------------------------------


    var onPanelMouseover = function () {
        if (mouseoverTimer) {
            clearTimeout(mouseoverTimer);
        }
        packageContext.show();
    };
    var onPanelMouseout = function () {
        if (mouseoverTimer) {
            clearTimeout(mouseoverTimer);
        }
        mouseoverTimer = setTimeout(function () {
            packageContext.hide();
            mouseoverTimer = null;
        }, 500);
    };

    var onStateSelectButtonClick = function () {
        var state = this.getAttribute("state");
        packageContext.setSelfState(state);
        //packageContext.hideStatePanel();
    };
    var onStateSelectButtonMouseover = function () {
        $D.setStyle(this, "backgroundColor", "#cbe7fc");
    };
    var onStateSelectButtonMouseout = function () {
        $D.setStyle(this, "backgroundColor", "transparent");
    };

    var alertChangeState = function () {
        //alert("您的WebQQ现在处于辅模式，请从客户端QQ修改您的在线状态。");
    };
    var toggleStatePanel = function (xy) {
        packageContext.toggleStatePanel(xy);
    };
    var onMyStateClickCall = toggleStatePanel;
    var onMyStateClick = function (e) {
        e.stopPropagation();
        var xy = $D.getClientXY(packageContext.EQQ_MyState);
        xy[1] = xy[1] + 16;
        onMyStateClickCall(xy);
    };
    var onClassHeadElClick = function (e) {
        var index = this.getAttribute("classIndex");
        packageContext.toggleClass(index);
    };


    var onListMouseover = function () {
        $D.setStyle(this, "backgroundColor", "#cbe7fc");
    };
    var onListMouseout = function () {
        $D.setStyle(this, "backgroundColor", "transparent");
    };


    var onAvatarMouseover = function () {
        var uin = this.getAttribute("uin");
        if (EQQ.avatarMouseoverTimer) {
            clearTimeout(EQQ.avatarMouseoverTimer);
            EQQ.avatarMouseoverTimer = null;
        }
        var xy = $D.getClientXY(this);
        xy[0] = xy[0] - 218;
        xy[1] = xy[1] - 5;
        packageContext.showMiniCardPanel(uin, xy);
        $E.notifyObservers(packageContext, "AvatarMouseover", uin);
    };
    var onAvatarMouseout = function () {
        EQQ.avatarMouseoverTimer = window.setTimeout(onTimeHideMiniCardPanel, 500);
    };

    var onTimeHideMiniCardPanel = function () {
        packageContext.hideMiniCardPanel();
    };



    var onMiniCardMouseover = function () {
        if (EQQ.avatarMouseoverTimer) {
            clearTimeout(EQQ.avatarMouseoverTimer);
            EQQ.avatarMouseoverTimer = null;
        }
    };
    var onMiniCardMouseout = function () {
        EQQ.avatarMouseoverTimer = window.setTimeout(onTimeHideMiniCardPanel, 500);
    };

    var onMiniCardUserDetailsClick = function () {

        qqweb.portal.runApp("userDetails", packageContext.miniCardPanel.uin);
        //J.out("runApp: userDetails");
    };



    var onBuddyListClick = function () {
        var uin = this.getAttribute("uin");
        $E.notifyObservers(packageContext, "StartChat", uin);
    };
    var onGroupListClick = function () {
        var code = this.getAttribute("code");
        $E.notifyObservers(packageContext, "StartGroupChat", code);

    };




    //== EQQ.View.MainPanel 的公共方法 =======================================================================================
    //------------------------------------------------------------------------------------------------------------
    this.init = function () {

        $E.on(window, "resize", J.bind(this.onWindowResize, this));

        $E.addObserver(qqweb.layout, "SideBarPinUp", J.bind(this.onWindowResize, this));
        $E.addObserver(qqweb.layout, "SideBarPinDown", J.bind(this.onWindowResize, this));


        this.EQQ_Container = $D.id("EQQ_Container");
        this.EQQ_MainPanel = $D.id("EQQ_MainPanel");



        /*我的面板*/
        this.EQQ_MyPanel = $D.id("EQQ_MyPanel");
        this.EQQ_MyAvatar = $D.id("EQQ_MyAvatar");
        this.EQQ_MyNick = $D.id("EQQ_MyNick");
        this.EQQ_MyState = $D.id("EQQ_MyState");
        this.EQQ_MyStateShow = $D.id("EQQ_MyStateShow");

        this.EQQ_MyState.title = "更改在线状态";



        $E.on(this.EQQ_MyState, "click", onMyStateClick);
        $D.show(this.EQQ_MyState);




        this.EQQ_MySignature = $D.id("EQQ_MySignature");




        // 小黄条
        this.EQQ_YellowTips = $D.id("EQQ_YellowTips");
        $E.on(this.EQQ_YellowTips, "click", this.onYellowTipsClick);


        this.EQQ_LoginSuccess = $D.id("EQQ_LoginSuccess");


        // 搜索条
        this.EQQ_SearchBar = $D.id("EQQ_SearchBar");
        this.EQQ_SearchBox = $D.id("EQQ_SearchBox");
        this.EQQ_SearchButton = $D.id("EQQ_SearchButton");
        this.EQQ_SearchResultPanel = $D.id("EQQ_SearchResultPanel");
        $E.on(this.EQQ_SearchBox, "mouseover", this.onSearchBoxMouseover);
        $E.on(this.EQQ_SearchBox, "mouseout", this.onSearchBoxMouseout);
        $E.on(this.EQQ_SearchBox, "focus", this.onSearchBoxFocus);
        $E.on(this.EQQ_SearchBox, "blur", this.onSearchBoxBlur);
        $E.on(this.EQQ_SearchBox, "keyup", this.onSearchBoxKeyup);
        $E.on(this.EQQ_SearchBox, "keydown", this.onSearchBoxKeydown);
        $E.on(this.EQQ_SearchBox, "click", J.bind(this.startSearch, this));

        //$E.on(this.EQQ_SearchButton,"click",this.onSearchButtonClick);

        $E.on(this.EQQ_SearchButton, "click", J.bind(function () {
            if (currentBuddy) {
                packageContext.hideSearchResult();
                $E.notifyObservers(packageContext, "StartChat", currentBuddy.uin);
            }
        }, this));



        this.EQQ_Logining = $D.id("EQQ_Logining");
        this.EQQ_ReLoginPanel = $D.id("EQQ_ReLoginPanel");
        this.EQQ_ReLoginButton = $D.id("EQQ_ReLoginButton");
        $E.on(this.EQQ_ReLoginButton, "click", J.bind(this.onReLoginButtonClick, this));


        // 好友列表tab
        this.EQQ_TabBuddyList = $D.id("EQQ_TabBuddyList");

        // 群列表tab
        this.EQQ_TabGroupList = $D.id("EQQ_TabGroupList");

        // 最近联系人tab
        this.EQQ_TabRecentList = $D.id("EQQ_TabRecentList");



        // 所有列表总容器
        this.EQQ_ListContainer = $D.id("EQQ_ListContainer");


        // 好友列表面板
        this.EQQ_buddyListPanel = $D.id("EQQ_buddyListPanel");
        // 好友列表
        this.EQQ_buddyList = $D.id("EQQ_buddyList");
        
        
        $E.on(this.EQQ_buddyListPanel, "scroll", onListScroll);

        //好友列表下方工具条
        
        this.EQQ_createGroupButton = $D.id("EQQ_createGroupButton");
        this.EQQ_searchGroupButton = $D.id("EQQ_searchGroupButton");
        
        $E.on(this.EQQ_createGroupButton, "click", qqweb.util.observer.openInWebBrowser);
        $E.on(this.EQQ_searchGroupButton, "click", qqweb.util.observer.openInWebBrowser);
        
        //this.EQQ_ListBottom =$D.id("EQQ_ListBottom");
        this.EQQ_ListBottom_maskButton = $D.id("EQQ_ListBottom_maskButton");

        $E.on(this.EQQ_ListBottom_maskButton, "click", onListBottomClick);

        // 群列表面板
        this.EQQ_groupListPanel = $D.id("EQQ_groupListPanel");
        this.EQQ_groupListInner = $D.id("EQQ_groupListInner");

        // 最近联系人面板
        this.EQQ_recentListPanel = $D.id("EQQ_recentListPanel");
        this.EQQ_recentList = $D.id("EQQ_recentList");

        //查找/添加好友 
        this.EQQ_findBuddy = $D.id("EQQ_findBuddy");
        $E.on(this.EQQ_findBuddy, "click", function (e) {
            //TODO
            e.preventDefault();
            qqweb.portal.runApp("buddyFinder", {});


        });

        // WebQQ好友、群、最近联系人的Tab
        this.mainTab = new J.ui.Tab();
        this.mainTab.add({ trigger: this.EQQ_TabBuddyList, sheet: this.EQQ_buddyListPanel });
        this.mainTab.add({ trigger: this.EQQ_TabGroupList, sheet: this.EQQ_groupListPanel });
        this.mainTab.add({ trigger: this.EQQ_TabRecentList, sheet: this.EQQ_recentListPanel });
        this.mainTab.config['triggerEvent'] = 'click';
        this.mainTab.config['slideEnabled'] = false;
        /*
        $E.addObserver(this.mainTab, "show", function(a){
        //J.out('当前的tab是：' + this.indexOf(a)+"#"+a.sheet.id);
        //$('debug').innerHTML = '当前的tab是：' + this.indexOf(a)+"#"+a.sheet.id;
        //$D.setClass(a.sheet,a.sheet.id+"_current");
			
        });
        */
        this.mainTab.init();





        //$E.addObserver(EQQ, "NotifyBeat_250", onNotifyBeat_250);

        this.onWindowResize();

    };





    this.createStatePanelDom = function () {
        var statePanelEl = $D.node("ul", {
            id: "EQQ_StatePanel",
            "class": "EQQ_statePanel"
        });

        desktopBody.appendChild(statePanelEl);

        this.statePanel = new qqweb.layout.PopupBox({
            container: statePanelEl,
            html: '\
					<li id="EQQ_SetOnline" state="online"><div class="EQQ_stateSelect_icon EQQ_online"></div><div class="EQQ_stateSelect_text">我在线上</div></li>\
					<li id="EQQ_SetAway" state="away"><div class="EQQ_stateSelect_icon EQQ_away"></div><div class="EQQ_stateSelect_text">离开</div></li>\
					<li id="EQQ_SetHidden" state="hidden"><div class="EQQ_stateSelect_icon EQQ_hidden"></div><div class="EQQ_stateSelect_text">隐身</div></li>\
					<li id="EQQ_SetOffline" state="offline"><div class="EQQ_stateSelect_icon EQQ_offline"></div><div class="EQQ_stateSelect_text">离线</div></li>\
					<li id="EQQ_SetCallme" state="callme" style="display:none;"><div class="EQQ_stateSelect_icon EQQ_callme"></div><div class="EQQ_stateSelect_text">Q我吧</div></li>\
					<li id="EQQ_SetBusy" state="busy" style="display:none;"><div class="EQQ_stateSelect_icon EQQ_busy"></div><div class="EQQ_stateSelect_text">忙碌</div></li>\
					<li id="EQQ_SetSilent" state="silent" style="display:none;"><div class="EQQ_stateSelect_icon EQQ_silent"></div><div class="EQQ_stateSelect_text">请勿打扰</div></li>'
        });


        this.EQQ_SetOnline = $D.id("EQQ_SetOnline");
        this.EQQ_SetCallme = $D.id("EQQ_SetCallme");
        this.EQQ_SetAway = $D.id("EQQ_SetAway");
        this.EQQ_SetBusy = $D.id("EQQ_SetBusy");
        this.EQQ_SetSilent = $D.id("EQQ_SetSilent");
        this.EQQ_SetHidden = $D.id("EQQ_SetHidden");
        this.EQQ_SetOffline = $D.id("EQQ_SetOffline");

        var els = [
				this.EQQ_SetOnline,
				this.EQQ_SetCallme,
				this.EQQ_SetAway,
				this.EQQ_SetBusy,
				this.EQQ_SetSilent,
				this.EQQ_SetHidden,
				this.EQQ_SetOffline
			];

        J.array.forEach(els, function (item, i, arr) {
            $E.on(item, "mouseover", onStateSelectButtonMouseover);
        });

        J.array.forEach(els, function (item, i, arr) {
            $E.on(item, "mouseout", onStateSelectButtonMouseout);
        });

        J.array.forEach(els, function (item, i, arr) {
            $E.on(item, "click", onStateSelectButtonClick);
        });

    };
    this.createGroupMaskPanelDom = function () {
        var groupMaskPanelEl = $D.node("div", {
            "class": "groupMaskPanel"
        });

        desktopBody.appendChild(groupMaskPanelEl);

        packageContext.groupMaskPanel = new qqweb.layout.PopupBox({
            container: groupMaskPanelEl,
            html: ' <a id="GroupMask_Costom" state="0" class="simpleMenuItem" href="javascript:void(0);"><div class="selectedIcon"></div>使用群自身的消息设置</a>\
					<a id="GroupMask_Prompt" state="1" class="simpleMenuItem" href="javascript:void(0);"><div class="selectedIcon"></div>所有群接收并提示消息</a>\
					<a id="GroupMask_NoPrompt" state="2" class="simpleMenuItem" href="javascript:void(0);"><div class="selectedIcon"></div>所有群接收不提示消息</a>\
					<a id="GroupMask_Mask" state="3" class="simpleMenuItem" href="javascript:void(0);"><div class="selectedIcon"></div>所有群完全阻止群消息</a>'
        });
        this.costomDom = $D.id("GroupMask_Costom");
        this.promptDom = $D.id("GroupMask_Prompt");
        this.noPromptDom = $D.id("GroupMask_NoPrompt");
        this.maskDom = $D.id("GroupMask_Mask");
        var els = [
				this.costomDom,
				this.promptDom,
				this.noPromptDom,
				this.maskDom
			];

        J.array.forEach(els, function (item, i, arr) {
            $E.on(item, "click", onMaskStateButtonClick);
        });
        this.setGroupMaskState(groupMask);

    };

    var onMaskStateButtonClick = function () {
        var state = this.getAttribute("state");
        groupMask = state;
        packageContext.setGroupMaskState(groupMask);
        $E.notifyObservers(packageContext, "SetGroupMaskState", state);

    };
    this.setGroupMaskState = function (state) {  
        $D.removeClass(this.costomDom, "simpleMenuItemSelected");
        $D.removeClass(this.promptDom, "simpleMenuItemSelected");
        $D.removeClass(this.noPromptDom, "simpleMenuItemSelected");
        $D.removeClass(this.maskDom, "simpleMenuItemSelected");
		state = parseInt(state);
        switch (state) {
            case 0:
                $D.addClass(this.costomDom, "simpleMenuItemSelected");
                break;
            case 1:
                $D.addClass(this.promptDom, "simpleMenuItemSelected");
                break;
            case 2:
                $D.addClass(this.noPromptDom, "simpleMenuItemSelected");
                break;
            case 3:
                $D.addClass(this.maskDom, "simpleMenuItemSelected");
                break;
        }

    };
    this.setGroupListMaskState = function (gid, isGroupPrompt) {
        var groupState = $D.id("EQQ_GroupList_State_" + gid);
        var recentState = $D.id("EQQ_RecentList_State_" + gid); 
		
        //不提示则显示屏蔽图标    
        if (!isGroupPrompt) {
			if( groupState ){
            	$D.addClass(groupState, "EQQ_GroupMask_State");
			}
			if( recentState ){
				$D.addClass(recentState, "EQQ_GroupMask_State");
			}
            
        } else {
			if( groupState ){
            	$D.removeClass(groupState, "EQQ_GroupMask_State");
			}
			if( recentState ){
           	    $D.removeClass(recentState, "EQQ_GroupMask_State");
			}
        }
    }
    var onListBottomClick = function (e) {
        e.stopPropagation();
        var xy = $D.getClientXY(packageContext.EQQ_ListBottom_maskButton);
        packageContext.toggleGroupMaskStatePanel(xy);
    };
    this.toggleGroupMaskStatePanel = function (xy) {

        if (this.groupMaskPanel && this.groupMaskPanel.isShow()) {
            this.hideGroupMaskStatePanel();
        } else {
            this.showGroupMaskStatePanel(xy);
        }

    };
    this.showGroupMaskStatePanel = function (xy) {

        if (this.groupMaskPanel) {

        } else {
            this.createGroupMaskPanelDom();
        }
        if (xy) {
            var width = this.groupMaskPanel.getWidth();
            var height = this.groupMaskPanel.getHeight();

            var clientWidth = $D.getClientWidth();
            var clientHeight = $D.getClientHeight();
            var x = xy[0],
				y = xy[1] - 100;
            if (x < 2) {
                x = 2;
            }
            if (y < 2) {
                y = 2;
            }
            if (x > clientWidth - width - 2) {
                x = clientWidth - width - 2;
            }
            if (y > clientHeight - height - 2) {
                y = clientHeight - height - 2;
            }
            this.groupMaskPanel.setXY(x, y);
        }
        this.groupMaskPanel.show();

        //J.out("groupMaskPanelshow");

    };
    this.hideGroupMaskStatePanel = function () {

        if (this.groupMaskPanel) {
            this.groupMaskPanel.hide();
        }
    };

    this.createMiniCardPanelDom = function () {
        var miniCardPanelEl = $D.node("div", {
            id: "miniCard",
            "class": "panel_1"
        });
        miniCardPanelEl.innerHTML = '\
			<div class="panel_1_outer">\
				<div class="panel_1_inner">\
					<div class="panel_1_container">\
						<div id="panel_1_center" class="panel_1 panel_1_center"></div>\
						<div id="panel_1_t" class="panel_1 panel_1_t"></div>\
						<div id="panel_1_rt" class="panel_1 panel_1_rt"></div>\
						<div id="panel_1_r" class="panel_1 panel_1_r"></div>\
						<div id="panel_1_rb" class="panel_1 panel_1_rb"></div>\
						<div id="panel_1_b" class="panel_1 panel_1_b"></div>\
						<div id="panel_1_lb" class="panel_1 panel_1_lb"></div>\
						<div id="panel_1_l" class="panel_1 panel_1_l"></div>\
						<div id="panel_1_lt" class="panel_1 panel_1_lt"></div>\
					</div>\
					<div id="miniCardBody" class="panel_1_content">\
						<img id="miniCard_avatar" class="miniCard_avatar" />\
						<div class="miniCard_name">\
							<div id="miniCard_name_inner" class="miniCard_name_inner"></div>\
						</div>\
						<div id="miniCard_signature" class="miniCard_signature">\
							<div id="miniCard_signature_inner" class="miniCard_signature_inner"></div>\
						</div>\
						<div id="miniCard_clientType_inner" class="miniCard_clientType_inner"></div>\
						<div id="miniCard_level" class="miniCard_level">我是等级</div>\
						<div id="miniCard_quickLink" class="miniCard_quickLink">\
							<a id="miniCard_qzone" class="miniCard_qzone" type="qzone" title="访问QQ空间" hidefocus target="_blank" href="###"></a>\
							<a id="miniCard_qmail" class="miniCard_qmail" type="qmail" title="发送邮件" hidefocus target="_blank" href="###"></a>\
						</div>\
						<div id="miniCard_buddyOption_tabHead" class="buddyOption_tabHead">\
							<div id="miniCard_userDetails">详细资料</div>\
						</div>\
						<div id="miniCard_buddyOption_tabBody">\
						</div>\
					</div>\
				</div>\
			</div>';

        desktopBody.appendChild(miniCardPanelEl);

        var miniCardAvatarEl = $D.id("miniCard_avatar");
        var miniCardNameInnerEl = $D.id("miniCard_name_inner");
        var miniCardSignatureEl = $D.id("miniCard_signature");
        var miniCardSignatureInnerEl = $D.id("miniCard_signature_inner");
        var miniCardClientTypeInnerEl = $D.id("miniCard_clientType_inner");
        var miniCardLevelEl = $D.id("miniCard_level");
        var miniCardQzoneEl = $D.id("miniCard_qzone");
        var miniCardQmailEl = $D.id("miniCard_qmail");
        var miniCardUserDetailsEl = $D.id("miniCard_userDetails");

        $E.on(miniCardPanelEl, "mouseover", onMiniCardMouseover);
        $E.on(miniCardPanelEl, "mouseout", onMiniCardMouseout);
        $E.on(miniCardUserDetailsEl, "click", onMiniCardUserDetailsClick);
        
        // 会跳转top的url
        //$E.on(miniCardQzoneEl, "click", qqweb.util.observer.openInWebBrowser);
        $E.on(miniCardQmailEl, "click", qqweb.util.observer.openInWebBrowser);


        this.miniCardPanel = new qqweb.layout.Panel({
            container: miniCardPanelEl,
            body: $D.id("miniCardBody"),
            html: ''
        });




        this.miniCardPanel.setInfo = function (user) {
            this.uin = user.uin;
            miniCardAvatarEl.src = EQQ.getUserDefaultAvatar();
            miniCardAvatarEl.src = user.avatarUrl;
            miniCardNameInnerEl.innerHTML = user.htmlAllName;
            miniCardNameInnerEl.title = user.titleAllName;
            miniCardSignatureInnerEl.innerHTML = "";
            miniCardLevelEl.innerHTML = "";
            miniCardQzoneEl.href = EQQ.getQzoneUrl(user.uin);  
            miniCardQmailEl.href = EQQ.getSendMailUrl(user.uin);
           /* if (user.clientType == "1") {
                miniCardClientTypeInnerEl.className = "miniCard_clientType_" + EQQ.hash.clientType[user.clientType || "10000"];
                miniCardClientTypeInnerEl.innerHTML = EQQ.hash.clientTypeText[user.clientType || "10000"] + "登录中";
                //有在线终端的时候隐藏签名
                miniCardSignatureEl.style.display = "none";
            } else {
                miniCardClientTypeInnerEl.className = "miniCard_clientType_inner";
                miniCardSignatureEl.style.display = "block";
            }*/
			 //user.clientType = 1000 没有类型，隐身或未登录
			if (user.clientType == "1" || user.clientType == "10000" ) {
                miniCardClientTypeInnerEl.className = "miniCard_clientType_inner";
                miniCardSignatureEl.style.display = "block";
	        } else {
				miniCardClientTypeInnerEl.className = "miniCard_clientType_" + EQQ.hash.clientType[user.clientType || "10000"];
                miniCardClientTypeInnerEl.innerHTML = EQQ.hash.clientTypeText[user.clientType || "10000"] + "登录中";
                //有在线终端的时候隐藏签名
                miniCardSignatureEl.style.display = "none";               
            }
            $E.notifyObservers(packageContext, "MiniCardShow", user);



        };

        this.miniCardPanel.setSignature = function (user) {
            miniCardSignatureInnerEl.innerHTML = user.htmlSignature;
            miniCardSignatureInnerEl.title = user.titleSignature;
        };
        this.miniCardPanel.setClientType = function (user) {
            if (this.uin == user.uin) {
                if (user.clientType == "1") {
                    miniCardClientTypeInnerEl.className = "miniCard_clientType_" + EQQ.hash.clientType[user.clientType || "10000"];
                    miniCardClientTypeInnerEl.innerHTML = EQQ.hash.clientTypeText[user.clientType || "10000"] + "登录中";
                    //有在线终端的时候隐藏签名
                    miniCardSignatureEl.style.display = "none";
                } else {
                    miniCardClientTypeInnerEl.className = "miniCard_clientType_inner";
                    miniCardSignatureEl.style.display = "block";
                }
            }

        };

        this.miniCardPanel.setQQLevel = function (user) {
            var level = user.level;
            var queen = parseInt(level / 64),
                sun = parseInt((level % 64) / 16),
                moon = parseInt(((level % 64) % 16) / 4),
                star = ((level % 64) % 16) % 4,
                html = '';

            for (var i = 0; i < queen; i++) {
                html += '<div class="qqLevel_queen"></div>';
            };
            for (var i = 0; i < sun; i++) {
                html += '<div class="qqLevel_sun"></div>';
            };
            for (var i = 0; i < moon; i++) {
                html += '<div class="qqLevel_moon"></div>';
            };
            for (var i = 0; i < star; i++) {
                html += '<div class="qqLevel_star"></div>';
            };
            //this.mainPanel._my_qqlevel_panel_node.title="等级:"+this.level+" (使用WebQQ升级中...)\n在线天数:"+this.online_days+"，升级剩余天数:"+this.remain_days;


            miniCardLevelEl.innerHTML = html;
            miniCardLevelEl.title = "等级: " + level;
            //J.out("等级: " + level)
        };


    };


    this.showMiniCardPanel = function (uin, xy) {

        if (this.miniCardPanel) {

        } else {
            this.createMiniCardPanelDom();
        }
        if (xy) {
            var width = this.miniCardPanel.getWidth() + 10;
            var height = this.miniCardPanel.getHeight() + 10;

            var clientWidth = $D.getClientWidth();
            var clientHeight = $D.getClientHeight();
            var x = xy[0],
				y = xy[1];
            if (x < 2) {
                x = 2;
            }
            if (y < 2) {
                y = 2;
            }
            if (x > clientWidth - width - 2) {
                x = clientWidth - width - 2;
            }
            if (y > clientHeight - height - 2) {
                y = clientHeight - height - 2;
            }
            this.miniCardPanel.setXY(x, y);
        }
        var user = EQQ.Model.BuddyList.getUserByUin(uin);
        this.miniCardPanel.setInfo(user);
        this.miniCardPanel.show();

        //J.out("show");

    };
    this.hideMiniCardPanel = function () {

        if (this.miniCardPanel) {
            this.miniCardPanel.hide();
        }
    };



    this.createDom = function (parentContainer) {
        var node = $D.node("div", {
            id: "EQQ_MainPanel"
        });

        node.innerHTML = '\
				<div class="EQQ_title">\
					<div id="EQQ_PinDownButton" class="EQQ_PinDownButton" title="钉住/收起">钉住/收起</div>\
					<div id="EQQ_CloseButton" class="EQQ_CloseButton" title="隐藏好友列表">最小化</div>\
					<div id="EQQ_MinButton" class="EQQ_MinButton" title="设置">设置</div>\
					<a class="EQQ_FeedbackButton2" href="http://support.qq.com/portal/discuss_pdt/420_1.html" target="_blank">反馈</a>\
					<div id="EQQ_SettingButton" class="EQQ_settingButton" title="设置WebQQ">\
						<div class="EQQ_settingButtonIcon">下</div>\
						<div>设置</div>\
					</div>\
					<div class="EQQ_titleText" href="#" target="_blank" title="联系人">联系人</div>\
					<div class="EQQ_betaText" title="1.0.10.12"></div>\
				</div>\
				<div id="EQQ_YellowTips" class="EQQ_YellowTips">\
					<div id="EQQ_YellowTips_CloseButton" class="EQQ_YellowTips_CloseButton" title="关闭提示">X</div>\
					<a class="EQQ_YellowTips_Link" href="http://survey.qq.com/cgi-bin/submitsurvey?id=2473&qpage=1&page=1&rm=dnN4k1bBG" target="_blank">邀请参与WebQQ用户调查</a>\
				</div>\
				<div id="EQQ_LoginSuccess">\
					<div id="EQQ_SearchBar" class="EQQ_SearchBar">\
						<input id="EQQ_SearchBox" class="EQQ_SearchBox" name="" type="text" value="搜索好友..." title="搜索好友..." />\
						<div id="EQQ_SearchButton" class="EQQ_SearchButton" title="搜索...">搜索按钮</div>\
					</div>\
					<div id="EQQ_SearchResultPanel" class="EQQ_SearchResultPanel">\
						<div class="EQQ_SearchResultItem" title="">Kevity1(666666)</div>\
						<div class="EQQ_SearchResultItemHover" title="">Kevity2(666666)</div>\
						<div class="EQQ_SearchResultItem" title="">Kevity3(66666)</div>\
					</div>\
					<ul class="EQQ_tab">\
						<li id="EQQ_TabBuddyList" class="EQQ_tabBuddyList" title="联系人"><div class="EQQ_tabBuddyList_icon"></div></li>\
						<li id="EQQ_TabGroupList" class="EQQ_tabGroupList" title="群列表"><div class="EQQ_tabGroupList_icon"></div></li>\
						<li id="EQQ_TabRecentList" class="EQQ_tabRecentList" title="最近联系人"><div class="EQQ_tabRecentList_icon"></div></li>\
					</ul>\
					<div id="EQQ_ListContainer">\
						<div id="EQQ_buddyListPanel" class="EQQ_buddyListPanel">\
							<div id="EQQ_buddyList" class="EQQ_buddyList">\
							</div>\
							<div class="EQQ_ListBottom">\
								<a href="" id="EQQ_findBuddy" class="searchBuddy" target="_blank">查找好友</a>\
							</div>\
						</div>\
						<div id="EQQ_groupListPanel" class="EQQ_groupListPanel"><div class="EQQ_groupListOuter"><div id="EQQ_groupListInner" class="EQQ_groupListInner"></div></div>\
							<div class="EQQ_ListBottom">\
								<a id="EQQ_createGroupButton" class="createGroup" href="http://qun.qq.com/air/create" target="_blank" title="创建群">创建</a>\
								<a id="EQQ_searchGroupButton" class="searchGroup" href="http://qun.qq.com/air/search" target="_blank" title="查找群">查找</a>\
								<div id="EQQ_ListBottom_maskButton">群屏蔽</div>\
							</div>\
						</div>\
						<div id="EQQ_recentListPanel" class="EQQ_recentListPanel"><div id="EQQ_recentList" class="EQQ_recentList"></div></div>\
					</div>\
				</div>\
				<div id="EQQ_Logining">登录中...</div>\
				<div id="EQQ_ReLoginPanel">\
					登录失败，<span id="EQQ_ReLoginButton">重试</span>\
				</div>';
        parentContainer.innerHTML = '';
        parentContainer.appendChild(node);

        $D.setClass(node, "EQQ_mainPanel");

    };


    this.onYellowTipsClick = function () {
        packageContext.hideYellowTips();
        $E.notifyObservers(packageContext, "CloseYellowTipsFinish");
    };

    this.showYellowTips = function () {
        topMargin = topMargin + tipsHeight;
        this.onWindowResize();
        $D.show(this.EQQ_YellowTips);

    };
    this.hideYellowTips = function () {
        $D.hide(this.EQQ_YellowTips);
        topMargin = topMargin - tipsHeight;
        this.onWindowResize();
    };


    this.onWindowResize = function (e) {
        if (J.browser.ie && (J.browser.ie < 8)) {
            var h = $D.getClientHeight() - bottomMargin;
            if (h < topMargin) {
                h = topMargin;
            }
            $D.setStyle(this.EQQ_ListContainer, "height", (h - topMargin + 3) + "px");
            $D.setStyle(this.EQQ_ListContainer, "height", (h - topMargin) + "px");
            //J.out("<<<<< IE6-7: mainPanle: onWindowResize ok");

        }
        //J.out("onWindowResize");
        var h = $D.getClientHeight() - bottomMargin;
        if (h < topMargin) {
            h = topMargin;
        }
        $D.setStyle(this.EQQ_ListContainer, "height", (h - topMargin) + "px");
        $D.setStyle(this.EQQ_buddyListPanel, "height", (h - topMargin-25) + "px");
        
        // 检测加载头像
		toCheckLoadAvatar();

        //J.out("<<<<< IE6-7: mainPanle: onWindowResize ok");
    };



    // 搜索好友
    this.onSearchBoxMouseover = function () {
        $D.setClass(this, "EQQ_SearchBoxHover");
    };
    this.onSearchBoxMouseout = function () {
        $D.setClass(this, "EQQ_SearchBox");
    };
    this.onSearchBoxFocus = function () {
        $E.off(packageContext.EQQ_SearchBox, "mouseover", packageContext.onSearchBoxMouseover);
        $E.off(packageContext.EQQ_SearchBox, "mouseout", packageContext.onSearchBoxMouseout);
        $D.setClass(this, "EQQ_SearchBoxFocus");
        packageContext.clearSearchBox(this);
        this.select();
        packageContext.startSearch();
    };
    this.onSearchBoxBlur = function () {
        $E.on(packageContext.EQQ_SearchBox, "mouseover", packageContext.onSearchBoxMouseover);
        $E.on(packageContext.EQQ_SearchBox, "mouseout", packageContext.onSearchBoxMouseout);
        $D.setClass(this, "EQQ_SearchBox");
        packageContext.resetSearchBox(this);
    };



    this.resetSearchBox = function (searchBox) {
        if (searchBox.value == "") {
            searchBox.value = "搜索好友...";
        }
    };
    this.clearSearchBox = function (searchBox) {
        if (J.string.trim(searchBox.value) == "搜索好友...") {
            searchBox.value = "";
        }
    };

    this.onSearchButtonClick = function () {
        packageContext.startSearch();
    };
    this.onSearchBoxKeyup = function (e) {
        //去掉了enter的判别，解决一个中文输入法输入英文后回车不搜索的问题
        if (e.keyCode != KEY_UP && e.keyCode != KEY_DOWN) {
            packageContext.startSearch();

        }

    };

    this.onSearchBoxKeydown = function (e) {
        switch (e.keyCode) {
            case KEY_ENTER:
                if (currentBuddy) {
                    //防止聊天input换行
                    e.preventDefault();
                    packageContext.hideSearchResult();
                    $E.notifyObservers(packageContext, "StartChat", currentBuddy.uin);
                }
                break;
            case KEY_UP:
                if (currentBuddyIndex > 0) {
                    var currentBuddyEl = $D.id("EQQ_SearchResultItem_" + currentBuddy.uin);
                    $D.setStyle(currentBuddyEl, "backgroundColor", "transparent");
                    currentBuddyIndex--;
                    currentBuddy = searchResultCache[currentBuddyIndex];

                    currentBuddyEl = $D.id("EQQ_SearchResultItem_" + currentBuddy.uin);
                    if (currentBuddyEl) {
                        $D.setStyle(currentBuddyEl, "backgroundColor", "#cbe7fc");
                    }
                }
                break;
            case KEY_DOWN:
                if (currentBuddyIndex < searchResultCache.length - 1) {
                    var currentBuddyEl = $D.id("EQQ_SearchResultItem_" + currentBuddy.uin);
                    $D.setStyle(currentBuddyEl, "backgroundColor", "transparent");
                    currentBuddyIndex++;
                    currentBuddy = searchResultCache[currentBuddyIndex];

                    currentBuddyEl = $D.id("EQQ_SearchResultItem_" + currentBuddy.uin);
                    if (currentBuddyEl) {
                        $D.setStyle(currentBuddyEl, "backgroundColor", "#cbe7fc");
                    }
                }
                break;
            default:
                break;
        }

    };


    // 触发搜索事件
    this.startSearch = function () {
        this.clearSearchBox(this.EQQ_SearchBox);
        var keyword = this.EQQ_SearchBox.value;
        //J.out(keyword);
        $E.notifyObservers(this, "Search", keyword);
    };


    this.showSearchResult = function (searchResult) {
        searchResultCache = searchResult;
        var xy = $D.getRelativeXY(this.EQQ_SearchBox, this.EQQ_MainPanel);
        $D.setStyle(this.EQQ_SearchResultPanel, "left", xy[0] + "px");
        $D.setStyle(this.EQQ_SearchResultPanel, "top", (xy[1] + 26) + "px");
        $D.show(this.EQQ_SearchResultPanel);

        //J.out(searchResult)
        this.EQQ_SearchResultPanel.innerHTML = "";
        if (searchResult.length == 0) {
            currentBuddyIndex = null;
            currentBuddy = null;
            this.EQQ_SearchResultPanel.innerHTML = '<div class="EQQ_SearchResultNo">没有找到相关好友</div>';
        } else {
            currentBuddyIndex = 0;
            currentBuddy = searchResult[0];
            for (var i = 0; i < searchResult.length; i++) {
                var buddy = searchResult[i];

                var resultEl = $D.node("div");
                $D.setClass(resultEl, "EQQ_SearchResultItem");
                resultEl.id = "EQQ_SearchResultItem_" + buddy.uin;
                resultEl.setAttribute("uin", buddy.uin);



                resultEl.innerHTML = buddy.htmlAllName;
                resultEl.title = buddy.titleAllName;
                this.EQQ_SearchResultPanel.appendChild(resultEl);
                if (i == 0) {
                    $D.setStyle(resultEl, "backgroundColor", "#cbe7fc");
                }

                $E.on(resultEl, "mouseover", this.onSearchResultMouseover);
                $E.on(resultEl, "mouseout", this.onSearchResultMouseout);
                $E.on(resultEl, "mousedown", this.onSearchResultClick);
            }
        }
        $E.on(document, "mousedown", J.bind(this.hideSearchResult, this));

    };
    /*
    //这个方法在IE6下不适用
    //所以我最后折衷只改了CSS，用了对IE6 IE7有效的方法 firefox下就截断
    /white-space:nowrap 这句可以让空格后的Q号不换行
    this.caculateCharWidth= function(str) {
    var div = document.createElement("div");
    var width;
    width= div.offsetWidth;
    div.style.visibility = "hidden";
    this.EQQ_Container.appendChild(div);
    div.innerHTML = str;
    width = div.offsetWidth - width;
    this.EQQ_Container.removeChild(div);
    J.out("+++++"+width);
    return width;
    };
    */
    this.hideSearchResult = function () {
        $D.hide(this.EQQ_SearchResultPanel);
        $E.off(document, "mousedown");
    };

    this.onSearchResultMouseover = function () {
        $D.setStyle(this, "backgroundColor", "#cbe7fc");
    };
    this.onSearchResultMouseout = function () {
        $D.setStyle(this, "backgroundColor", "transparent");
    };
    this.onSearchResultClick = function () {
        var uin = this.getAttribute("uin");

        packageContext.hideSearchResult();
        $E.notifyObservers(packageContext, "StartChat", uin);
    };

    /*
    var onCloseButtonClick = function(){
    packageContext.hideSettingPanel();
    $E.notifyObservers(packageContext, "CloseWebQQ");
    };
    var onMyPanelExitButtonClick = function(){
		
    $E.notifyObservers(packageContext, "ExitPortal");
    };
	
    var onMinButtonClick = function(){
    $E.notifyObservers(packageContext, "MinMainPanel");
    };*/

    // 显示主面板
    this.show = function () {
        $D.show(this.EQQ_MainPanel);

        //$D.setStyle(this.EQQ_MainPanel, "height", "auto");
    };

    // 隐藏主面板
    this.hide = function () {
        $D.hide(this.EQQ_MainPanel);
        //$D.setStyle(this.EQQ_MainPanel, "height", "0px");
    };



    // 更新自己的信息
    this.updateSelfInfoChange = function (user) {
        this.EQQ_MyAvatar.src = EQQ.getUserAvatar(user.uin);
        this.EQQ_MyAvatar.title = "修改资料";
        this.EQQ_MyNick.innerHTML = user.htmlShowName;
        this.EQQ_MyNick.title = user.titleShowName + "<" + user.uin + ">";
    };

    this.updateSelfStateChange = function (state) {

        $D.setClass(this.EQQ_MyStateShow, "EQQ_myStateShow EQQ_" + state);
        if (state === "offline") {
            $D.addClass(this.EQQ_MyAvatar, "EQQ_myAvatar_offline");
        } else {
            $D.removeClass(this.EQQ_MyAvatar, "EQQ_myAvatar_offline");
        }
    };

    this.updateSelfSignatureChange = function (self) {
        if (self.signature) {
            this.EQQ_MySignature.innerHTML = self.htmlSignature;
            this.EQQ_MySignature.title = self.titleSignature;
        } else {
            this.EQQ_MySignature.innerHTML = '有个性，没签名';
            this.EQQ_MySignature.title = '有个性，没签名';
        }
    };

    // 创建
    this.createBuddyClass = function (classList) {
        classListCache = classList;

        this.addOnlineBuddyClass();

        for (var i = 0; i < classList.length; i++) {
            this.addBuddyClass(classList[i]);
        }

        this.addStrangerBuddyClass();
        this.addBlackListBuddyClass();

    };

    // 添加【在线好友】分组，index:online
    this.addOnlineBuddyClass = function () {
        var oneClass = {};

        oneClass.index = EQQ.hash.userClassType.online;
        oneClass.name = "在线好友";
        oneClass.htmlName = J.string.toHtml(oneClass.name);
        oneClass.titleName = J.string.toTitle(oneClass.name);
        oneClass.count = 0;
        oneClass.onlineCount = 0;
        oneClass.list = {
            "callme": [],
            "online": [],
            "away": [],
            "busy": [],
            "silent": [],
            "offline": []

        };

        this.addBuddyClass(oneClass);
    };

    // 添加【陌生人】分组，index:stranger
    this.addStrangerBuddyClass = function () {
        var oneClass = {};

        oneClass.index = EQQ.hash.userClassType.stranger;
        oneClass.name = "陌生人";
        oneClass.htmlName = J.string.toHtml(oneClass.name);
        oneClass.titleName = J.string.toTitle(oneClass.name);
        oneClass.count = 0;
        oneClass.onlineCount = 0;
        oneClass.list = {
            "callme": [],
            "online": [],
            "away": [],
            "busy": [],
            "silent": [],
            "offline": []

        };

        this.addBuddyClass(oneClass);
    };

    // 添加【黑名单】分组，index:blacklist
    this.addBlackListBuddyClass = function () {
        var oneClass = {};

        oneClass.index = EQQ.hash.userClassType.blacklist;
        oneClass.name = "黑名单";
        oneClass.htmlName = J.string.toHtml(oneClass.name);
        oneClass.titleName = J.string.toTitle(oneClass.name);
        oneClass.count = 0;
        oneClass.onlineCount = 0;
        oneClass.list = {
            "callme": [],
            "online": [],
            "away": [],
            "busy": [],
            "silent": [],
            "offline": []

        };

        this.addBuddyClass(oneClass);
    };

    // 添加【...】用户自定义分组
    this.addBuddyClass = function (buddyClass, inserBeforeNode) {
        var nodeClassHead,
			template,
			html;

        // EQQ_listClassHead节点
        nodeClassHead = $D.node("div", {
            "id": "EQQ_listClassHead_" + buddyClass.index,
            "classIndex": buddyClass.index
        });

 
        if (buddyClass.index == EQQ.hash.userClassType.online) {
            template = '\
					<div class="EQQ_listClassHeadIcon">icon</div>\
					<div class="EQQ_ClassList_RightContainer" title="<%=titleName%>">\
						<%=htmlName%>[<span id="EQQ_Class_<%=index%>_OnlineCounter"><%=onlineCount%></span>]\
					</div>\
				';
        } else {
            template = '\
					<div class="EQQ_listClassHeadIcon">icon</div>\
					<div class="EQQ_ClassList_RightContainer" title="<%=titleName%>">\
						<%=htmlName%>&nbsp;[<span id="EQQ_Class_<%=index%>_OnlineCounter"><%=onlineCount%></span>/<span id="EQQ_Class_<%=index%>_Counter"><%=count%></span>]\
					</div>\
				';
        }


        html = J.string.template(template, buddyClass);
        nodeClassHead.innerHTML = html;

        if (inserBeforeNode) {
            this.EQQ_buddyList.insertBefore(nodeClassHead, inserBeforeNode);
        } else {
            this.EQQ_buddyList.appendChild(nodeClassHead);
        }


        $E.on(nodeClassHead, "click", onClassHeadElClick);


        // EQQ_listClassBody节点
        var nodeClassBody = $D.node("div", {
            "id": "EQQ_listClassBody_" + buddyClass.index,
            "class": "EQQ_listClassBody"
        });

        template = '\
				<div id="EQQ_Class_<%=index%>_callme" class="EQQ_callmeBuddy"></div>\
				<div id="EQQ_Class_<%=index%>_online" class="EQQ_onlineBuddy"></div>\
				<div id="EQQ_Class_<%=index%>_busy" class="EQQ_busyBuddy"></div>\
				<div id="EQQ_Class_<%=index%>_away" class="EQQ_awayBuddy"></div>\
				<div id="EQQ_Class_<%=index%>_silent" class="EQQ_silentBuddy"></div>\
				<div id="EQQ_Class_<%=index%>_offline" class="EQQ_offlineBuddy"></div>\
			';
        html = J.string.template(template, buddyClass);
        nodeClassBody.innerHTML = html;
        this.EQQ_buddyList.insertBefore(nodeClassBody, nodeClassHead.nextSibling);

        this.collapsedClass(buddyClass.index);
    };

    this.hideLogin = function () {
        $D.hide(this.EQQ_Logining);
        $D.hide(this.EQQ_ReLoginPanel);
        $D.show(this.EQQ_LoginSuccess);
        $D.setStyle(this.EQQ_LoginSuccess, "height", "100%");
    };

    this.showLogin = function () {
        $D.show(this.EQQ_Logining);
        $D.hide(this.EQQ_ReLoginPanel);
        $D.hide(this.EQQ_LoginSuccess);
        $D.setStyle(this.EQQ_LoginSuccess, "height", "0px");
    };

    this.clearBuddyList = function () {
        this.EQQ_buddyList.innerHTML = '';
    };


    /* == 好友列表相关方法 ==================== 
    * Jetyu
    * 2009.12.06
    * ===================================== */

    
    // 创建好友列表
    this.createBuddyList = function (buddyList) {
        //J.out("buddyList: " + buddyList);

        J.timedChunk(buddyList, this.addBuddy, this, false, function () {
            $E.notifyObservers(packageContext, "BuddyListReady");
        });
    };
    
    
    // 返回好友分组的开闭状态
    this.getClassExpandFlag = function (index) {
        return classExpandFlag[index];
    };
    // 设置好友分组的开闭状态
    this.setClassExpandFlag = function (index, flag) {
        return classExpandFlag[index] = flag;
    };

    // 返回好友分组的头像加载状态
    this.getClassAvatarLoadFlag = function (index) {
        return classAvatarLoadFlag[index];
    };
    // 设置好友分组的头像加载状态
    this.setClassAvatarLoadFlag = function (index, flag) {
        return classAvatarLoadFlag[index] = flag;
    };





    // 展开/收起好友分组
    this.toggleClass = function (index) {
        if (classExpandFlag[index]) {
            this.collapsedClass(index);
        } else {
            this.expandClass(index);
        }
    };
    // 收起好友分组
    this.collapsedClass = function (index) {
        var classHeadEl = $D.id("EQQ_listClassHead_" + index),
			classBodyEl = $D.id("EQQ_listClassBody_" + index);
        if (index == EQQ.hash.userClassType.online) {
            $D.setClass(classHeadEl, "EQQ_onlineClassHeadCollapsed");
        } else {
            $D.setClass(classHeadEl, "EQQ_listClassHeadCollapsed");
        }

        //$D.setStyle(classBodyEl, "display", "none");
        $D.setStyle(classBodyEl, "height", "0");

        this.setClassExpandFlag(index, false);
    };
    // 展开好友分组
    this.expandClass = function (index) {
        var classHeadEl = $D.id("EQQ_listClassHead_" + index),
			classBodyEl = $D.id("EQQ_listClassBody_" + index);
        if (index == EQQ.hash.userClassType.online) {
            $D.setClass(classHeadEl, "EQQ_onlineClassHeadExpand");
        } else {
            $D.setClass(classHeadEl, "EQQ_listClassHeadExpand");
        }

        //$D.setStyle(classBodyEl, "display", "block");
        $D.setStyle(classBodyEl, "height", "auto");


        this.setClassExpandFlag(index, true);
		J.out("index: "+index)
        // 触发拉取头像
        loadBuddyListAvatar();

        /*
        if (!this.getClassAvatarLoadFlag(index)) {
            this.setClassAvatarLoadFlag(index, true);
            var uins = [];
            if (index === EQQ.hash.userClassType.stranger) {
                var strangerList = EQQ.Model.BuddyList.getStrangerList();
                for (var i = 0; i < strangerList.length; i++) {
                    uins.push(strangerList[i].uin);
                }
            } else if (index === EQQ.hash.userClassType.black) {
                var blackList = EQQ.Model.BuddyList.getBlackList();
                for (var i = 0; i < blackList.length; i++) {
                    uins.push(blackList[i].uin);
                }
            } else {
                for (var i = 0; i < classListCache.length; i++) {
                    var oneClass = classListCache[i];
                    if (oneClass.index == index) {
                        for (var p in oneClass.list) {
                            var subList = oneClass.list[p];
                            for (var j = 0; j < subList.length; j++) {
                                uins.push(subList[j].uin);
                            }
                        }
                    }

                }
            }
            avatarUins = uins.concat(avatarUins);
            
            EQQ.addNeedBeat2("loadAvatar");
            $E.addObserver(EQQ, "NotifyBeat_250", onNotifyBeat_250);
        }*/
    };

    
    
    // 加载头像机制

    var loadBuddyListAvatar = function(){
		checkAndLoadAvatar(packageContext.EQQ_buddyListPanel);
	};
	var onListScroll = function(e){
		toCheckLoadAvatar();
	};
	

	
	var toCheckLoadAvatar = function(e){
		if(onListScroll.timer){
			window.clearTimeout(onListScroll.timer);
			onListScroll.timer = null;
		}

		onListScroll.timer = window.setTimeout(loadBuddyListAvatar, 500);	
	};
	

	var checkAndLoadAvatar = function(userListConatiner){

		var containerHeight=parseInt($D.getStyle(userListConatiner,"height"),10);
		var scrollTop = userListConatiner.scrollTop;
		var y1 = $D.getXY(userListConatiner)[1];
		//J.out("unloadAvatarList.length:"+unloadAvatarList.length+"y1:"+y1);
		for(var i=0;i<unloadAvatarList.length;){
			var obj= unloadAvatarList[i];
			var imgEl =obj.imgEl;
			var uin = obj.uin;
			var classId = obj.classId;
			var y2 = $D.getXY(imgEl)[1];
			var imgOffsetTop = y2-y1;
			J.out("imgTop1:"+imgOffsetTop+"y2:"+y2);
			
			if(packageContext.getClassExpandFlag(classId) && imgEl && imgOffsetTop > 0 && imgOffsetTop < containerHeight){
				//J.out("imgTop2:"+imgOffsetTop);
				J.out("checkAndLoadAvatar & loadAvatar containerHeight: "+containerHeight+", imgTop2:"+imgOffsetTop);
				//imgEl.src = EQQ.Const.AVATAR_SERVER_DOMAIN + "cgi/svr/face/getface?type=1&fid=0&uin=" + uin;
    			imgEl.src = EQQ.getUserAvatar(obj.uin);
				unloadAvatarList.splice(i,1);
			}else{
				i++;
			}
		}
	};

    // 添加一个好友到好友列表
    this.addBuddy = function (buddy) {
        if (buddy) {
            var templateBuddy = '\
					<div class="EQQ_BuddyList_ClientType" uin="<%=uin%>" id="EQQ_BuddyList_ClientType_Title_<%=uin%>" title="' + EQQ.hash.clientTypeText[buddy.clientType || "PC"] + '">\
						<div id="EQQ_BuddyList_ClientType_<%=uin%>" class="EQQ_BuddyList_ClientType_' + EQQ.hash.clientType[buddy.clientType || "10000"] + '"></div>\
					</div>\
					<div id="EQQ_BuddyList_AvatarContainer_<%=uin%>" class="EQQ_BuddyList_AvatarContainer" uin="<%=uin%>" title="' + EQQ.hash.onlineStatusText[buddy.state] + '">\
						<img id="EQQ_BuddyList_Avatar_<%=uin%>" class="EQQ_BuddyList_Avatar" src="' + EQQ.CONST.EQQ_SERVER_URL + 'style/images/avatar_default_20_20.gif" />\
						<div class="EQQ_BuddyList_State"></div>\
					</div>\
					<div id="EQQ_BuddyList_RightContainer_<%=uin%>" class="EQQ_BuddyList_RightContainer" title="<%=titleAllName%> - ' + EQQ.hash.onlineStatusText[buddy.state] + '">\
						<div id="EQQ_BuddyList_Nick_<%=uin%>" class="EQQ_BuddyList_Nick"><%=htmlShowName%></div>\
					</div>\
				';
            var html = J.string.template(templateBuddy, buddy);
            var classStateEl = $D.id("EQQ_Class_" + buddy.classId + "_" + buddy.state);
            $D.show(classStateEl);

            var buddyEl = $D.node("div", {
                "id": "EQQ_Buddy_" + buddy.uin,
                "uin": buddy.uin
            });
            buddyEl.innerHTML = html;
            classStateEl.appendChild(buddyEl);
            //alert(classStateEl.innerHTML);
            $E.on(buddyEl, "mouseover", onListMouseover);
            $E.on(buddyEl, "mouseout", onListMouseout);
            $E.on(buddyEl, "click", onBuddyListClick);

            var avatarEl = $D.id("EQQ_BuddyList_AvatarContainer_" + buddy.uin);
            $E.on(avatarEl, "mouseover", onAvatarMouseover);
            $E.on(avatarEl, "mouseout", onAvatarMouseout);

            $D.addClass(buddyEl, "EQQ_BuddyList_Buddy");



			var imgEl = $D.id("EQQ_BuddyList_Avatar_" + buddy.uin);
		
		
			if(this.getClassExpandFlag(buddy.classId)){
				//checkAndLoadAvatar(packageContext.EQQ_BuddyList);
				//imgEl.src = EQQ.Const.AVATAR_SERVER_DOMAIN + "cgi/svr/face/getface?type=1&fid=0&uin=" + buddy.uin;
				J.out("addBuddy & loadAvatar");
				imgEl.src = EQQ.getUserAvatar(buddy.uin);
				//loadBuddyListAvatar();
			}else{
				unloadAvatarList.push({uin:buddy.uin, imgEl:imgEl, classId:buddy.classId});
			}
			
			/*
            // 若此分组已经被展开过
            if (this.getClassAvatarLoadFlag(buddy.classId)) {
                // 若此人头像未在等待加载的队列
                if (J.array.indexOf(avatarUins, buddy.uin) == -1) {
                    var imgEl = $D.id("EQQ_BuddyList_Avatar_" + buddy.uin);
                    if (buddy.uin && imgEl) {
                        imgEl.src = EQQ.getUserAvatar(buddy.uin);
                        //J.out('好烦啊好烦啊AVATAR:' + EQQ.getUserAvatar(buddy.uin));
                    };
                }
            }*/
        }
    };

    // 添加一个好友到在线好友列表
    this.addOnlineBuddy = function (buddy) {
    	if(buddy){
		    var _onlineTxt = EQQ.hash.clientTypeText[buddy.clientType || "pc"] === "PC" ? "" : EQQ.hash.clientTypeText[buddy.clientType || "pc"];
	        var templateBuddy = '\
					<div class="EQQ_BuddyList_ClientType" uin="<%=uin%>" id="EQQ_OnlineBuddyList_ClientType_Title_<%=uin%>" title="' + EQQ.hash.clientTypeText[buddy.clientType] + '">\
						<div id="EQQ_OnlineBuddyList_ClientType_<%=uin%>" class="EQQ_BuddyList_ClientType_' + EQQ.hash.clientType[buddy.clientType || "10000"] + '"></div>\
					</div>\
					<div id="EQQ_OnlineBuddyList_AvatarContainer_<%=uin%>" class="EQQ_BuddyList_AvatarContainer" uin="<%=uin%>" title="' + EQQ.hash.onlineStatusText[buddy.state] + '">\
						<img id="EQQ_OnlineBuddyList_Avatar_<%=uin%>" class="EQQ_BuddyList_Avatar" src="' + EQQ.CONST.EQQ_SERVER_URL + 'style/images/avatar_default_20_20.gif" />\
						<div class="EQQ_BuddyList_State"></div>\
					</div>\
					<div class="EQQ_BuddyList_RightContainer" title="<%=titleAllName%> - ' + _onlineTxt + EQQ.hash.onlineStatusText[buddy.state] + '">\
						<div class="EQQ_BuddyList_Nick"><%=htmlShowName%></div>\
					</div>\
				';
	        var html = J.string.template(templateBuddy, buddy);
	        var classStateEl = $D.id("EQQ_Class_" + EQQ.hash.userClassType.online + "_" + buddy.state);
	
	        $D.setStyle(classStateEl, "display", "block");
	
	        var buddyEl = $D.node("div", {
	            "id": "EQQ_OnlineBuddy_" + buddy.uin,
	            "uin": buddy.uin
	        });
	        buddyEl.innerHTML = html;
	        classStateEl.appendChild(buddyEl);
	        $E.on(buddyEl, "mouseover", onListMouseover);
	        $E.on(buddyEl, "mouseout", onListMouseout);
	        $E.on(buddyEl, "click", onBuddyListClick);
	        $D.addClass(buddyEl, "EQQ_BuddyList_Buddy");
	
	
	        var avatarEl = $D.id("EQQ_OnlineBuddyList_AvatarContainer_" + buddy.uin);
	        $E.on(avatarEl, "mouseover", onAvatarMouseover);
	        $E.on(avatarEl, "mouseout", onAvatarMouseout);
	
	
	        
	        var imgEl = $D.id("EQQ_OnlineBuddyList_Avatar_" + buddy.uin);
			
			
			if(this.getClassExpandFlag(EQQ.hash.userClassType.online)){
				//checkAndLoadAvatar(packageContext.EQQ_BuddyList);
				//imgEl.src = EQQ.Const.AVATAR_SERVER_DOMAIN + "cgi/svr/face/getface?type=1&fid=0&uin=" + buddy.uin;
				J.out("addOnlineBuddy & loadAvatar");
				imgEl.src = EQQ.getUserAvatar(buddy.uin);
				//loadBuddyListAvatar();
			}else{
				unloadAvatarList.push({uin:buddy.uin, imgEl:imgEl, classId:EQQ.hash.userClassType.online});
			}
	/*
	        // 若此人头像未在等待加载的队列
	        //TODO
	        if (J.array.indexOf(avatarUins, buddy.uin) == -1) {
	            var imgEl = $D.id("EQQ_OnlineBuddyList_Avatar_" + buddy.uin);
	            if (buddy.uin && imgEl) {
	                imgEl.src = EQQ.getUserAvatar(buddy.uin);
	            };
	        }*/
    	}
    };

    // 从在线好友列表view上删除一个好友
    this.removeOnlineBuddy = function (buddy) {
        var buddyEl = $D.id("EQQ_OnlineBuddy_" + buddy.uin);
        var parent = buddyEl.parentNode;
        $E.off(buddyEl);

        parent.removeChild(buddyEl);
    };

    this.updateOnlineBuddyClass = function (onlineBuddy) {
        var count = onlineBuddy.length;
        $D.id("EQQ_Class_" + EQQ.hash.userClassType.online + "_OnlineCounter").innerHTML = count;
    };




    // 个人头像跳上
    this.jumpUp = function (uins) {
        jumpFlag = true;
        for (var i = 0; i < uins.length; i++) {
            var buddyEl = $D.id("EQQ_Buddy_" + uins[i]);
            if (buddyEl) {
                $D.addClass(buddyEl, "EQQ_jumpUpInBuddyList");
            }

        }
    };
    // 个人头像跳下
    this.jumpDown = function (uins) {
        jumpFlag = false;
        for (var i = 0; i < uins.length; i++) {
            var buddyEl = $D.id("EQQ_Buddy_" + uins[i]);
            if (buddyEl) {
                $D.removeClass(buddyEl, "EQQ_jumpUpInBuddyList");
            }
        }
    };
    // 个人头像跳跃动画
    this.jumpAvatar = function (uins) {
        if (jumpFlag) {
            this.jumpDown(uins);
        } else {
            this.jumpUp(uins);
        }
    };

    // 好友分组名隐藏
    this.flickerClassHide = function (flickerClassIds) {
        flickerClassFlag = true;
        for (var i = 0; i < flickerClassIds.length; i++) {
            var classHeadEl = $D.id("EQQ_listClassHead_" + flickerClassIds[i]);
            $D.addClass(classHeadEl, "EQQ_flickerHideInBuddyList");
        }
    };
    // 好友分组名显示
    this.flickerClassShow = function (flickerClassIds) {  
        flickerClassFlag = false;
        for (var i = 0; i < flickerClassIds.length; i++) {
            var classHeadEl = $D.id("EQQ_listClassHead_" + flickerClassIds[i]);
            $D.removeClass(classHeadEl, "EQQ_flickerHideInBuddyList");
        }
    };
    // 好友分组名闪烁
    this.flickerClass = function (flickerClassIds) {
        if (flickerClassFlag) {
            this.flickerClassShow(flickerClassIds);
        } else {
            this.flickerClassHide(flickerClassIds);
        }
    };


    // 群头像跳上
    this.groupJumpUp = function (gids) {
        groupJumpFlag = true;
        for (var i = 0; i < gids.length; i++) {
            var buddyEl = $D.id("EQQ_Group_" + gids[i]);
            if (buddyEl) {
                $D.addClass(buddyEl, "EQQ_jumpUpInGroupList");
            }

        }
    };
    // 群头像跳下
    this.groupJumpDown = function (gids) {
        groupJumpFlag = false;
        for (var i = 0; i < gids.length; i++) {
            var buddyEl = $D.id("EQQ_Group_" + gids[i]);
            if (buddyEl) {
                $D.removeClass(buddyEl, "EQQ_jumpUpInGroupList");
            }
        }
    };
    // 群头像跳跃动画
    this.groupJumpAvatar = function (gids) {
        if (groupJumpFlag) {
            this.groupJumpDown(gids);
        } else {
            this.groupJumpUp(gids);
        }
    };

    // 最近联系人头像跳上
    this.recentJumpUp = function (uins) {
        recentJumpFlag = true;
        for (var i = 0; i < uins.length; i++) {
            var buddyEl = $D.id("EQQ_Recent_" + uins[i]);
            if (buddyEl) {
                $D.addClass(buddyEl, "EQQ_jumpUpInBuddyList");
                $D.addClass(buddyEl, "EQQ_jumpUpInGroupList");
            }

        }
    };
    // 最近联系人头像跳下
    this.recentJumpDown = function (uins) {
        recentJumpFlag = false;
        for (var i = 0; i < uins.length; i++) {
            var buddyEl = $D.id("EQQ_Recent_" + uins[i]);
            if (buddyEl) {
                $D.removeClass(buddyEl, "EQQ_jumpUpInBuddyList");
                $D.removeClass(buddyEl, "EQQ_jumpUpInGroupList");
            }
        }
    };
    // 最近联系人头像跳跃动画
    this.recentJumpAvatar = function (uins) {
        if (recentJumpFlag) {
            this.recentJumpDown(uins);
        } else {
            this.recentJumpUp(uins);
        }
    };


    // 移动好友状态
    this.moveBuddy = function (buddy) {
        var buddyEl = $D.id("EQQ_Buddy_" + buddy.uin);

        var parentEl = $D.id("EQQ_Class_" + buddy.classId + "_" + buddy.state);
        if (parentEl && buddyEl) {
            $D.setStyle(parentEl, "display", "block");
            var el = buddyEl.parentNode;
            parentEl.insertBefore(buddyEl, parentEl.firstChild);


            // 更新在线状态的title显示
            var buddyAvatarAreaEl = $D.id("EQQ_BuddyList_AvatarContainer_" + buddy.uin);
            var buddyRightAreaEl = $D.id("EQQ_BuddyList_RightContainer_" + buddy.uin);

            var recentAvatarAreaEl = $D.id("EQQ_RecentList_AvatarContainer_" + buddy.uin);
            var recentRightAreaEl = $D.id("EQQ_RecentList_RightContainer_" + buddy.uin);

            if (buddyAvatarAreaEl) {
                buddyAvatarAreaEl.title = EQQ.hash.onlineStatusText[buddy.state];
            }
            if (buddyRightAreaEl) {
                buddyRightAreaEl.title = buddy.titleAllName + ' - ' + EQQ.hash.onlineStatusText[buddy.state];
            }
            if (recentAvatarAreaEl) {
                recentAvatarAreaEl.title = EQQ.hash.onlineStatusText[buddy.state];
            }
            if (recentRightAreaEl) {
                recentRightAreaEl.title = buddy.titleAllName + ' - ' + EQQ.hash.onlineStatusText[buddy.state];
            }


            if (el.childNodes.length == 0) {
                $D.setStyle(el, "display", "none");
            }
        }
    };

    // 移动好友状态
    this.moveOnlineBuddy = function (buddy) {
        var buddyEl = $D.id("EQQ_OnlineBuddy_" + buddy.uin);

        var parentEl = $D.id("EQQ_Class_" + EQQ.hash.userClassType.online + "_" + buddy.state);

        if (parentEl && buddyEl) {
            $D.setStyle(parentEl, "display", "block");
            var el = buddyEl.parentNode;
            parentEl.insertBefore(buddyEl, parentEl.firstChild);

            if (el.childNodes.length == 0) {
                $D.setStyle(el, "display", "none");
            }
        }
    };
    //更新在线终端
    this.updateClientType = function (buddy) {
        var clientType = EQQ.hash.clientType[buddy.clientType];
        var clientTypeText = EQQ.hash.clientTypeText[buddy.clientType || "PC"];

        //更新好友列表
        var clientTypeEl = $D.id("EQQ_BuddyList_ClientType_" + buddy.uin) || {};
        var clientTypeTitleEl = $D.id("EQQ_BuddyList_ClientType_Title_" + buddy.uin) || {};
        clientTypeEl.className = "EQQ_BuddyList_ClientType_" + clientType;
        clientTypeTitleEl.title = clientTypeText;

        //更新在线好友列表
        clientTypeEl = $D.id("EQQ_OnlineBuddyList_ClientType_" + buddy.uin) || {};
        clientTypeTitleEl = $D.id("EQQ_OnlineBuddyList_ClientType_Title_" + buddy.uin) || {};
        clientTypeEl.className = "EQQ_BuddyList_ClientType_" + clientType;
        clientTypeTitleEl.title = clientTypeText;
        //J.out("Change ClientType Finish");


    };
    // 更新好友分组的在线人数
	this.updateBuddyClassOnlineBuddy = function (classObj) {
	    //J.out("好友在线数："+classObj.onlineCount)
	    $D.id("EQQ_Class_" + classObj.index + "_OnlineCounter").innerHTML = classObj.onlineCount;

	};
    this.updateRecentState = function (buddy) {
        //更新最近联系人列表
        var buddyEl = $D.id("EQQ_Recent_" + buddy.uin);
        if (buddyEl) {
            buddyEl.className = "";
            $D.addClass(buddyEl, "EQQ_BuddyList_Buddy");
            $D.addClass(buddyEl, "EQQ_" + EQQ.hash.onlineStatus[buddy.state] + "Buddy");
            var clientType = EQQ.hash.clientType[buddy.clientType];
            var clientTypeText = EQQ.hash.clientTypeText[buddy.clientType || "PC"];
            var clientTypeEl = $D.id("EQQ_RecentList_ClientType_" + buddy.uin) || {};
            clientTypeTitleEl = $D.id("EQQ_RecentList_ClientType_Title_" + buddy.uin) || {};
            clientTypeEl.className = "EQQ_BuddyList_ClientType_" + clientType;
            clientTypeTitleEl.title = clientTypeText;
            //J.out("Change ClientType Finish");
        }
    };


    // 更新好友分组的总人数
    this.updateBuddyClassCount = function (classObj) {
        $D.id("EQQ_Class_" + classObj.index + "_Counter").innerHTML = classObj.count;
    };



    // 更新陌生人分组的在线人数
    this.updateStrangerClassOnlineCount = function (onlineCount) {
        var el = $D.id("EQQ_Class_" + EQQ.hash.userClassType.stranger + "_OnlineCounter");
        el.innerHTML = onlineCount;
    };

    // 更新陌生人分组的总人数
    this.updateStrangerClassCount = function (strangerList) {
        var count = strangerList.length;
        $D.id("EQQ_Class_" + EQQ.hash.userClassType.stranger + "_Counter").innerHTML = count;

    };

    // 更新设置用户名称
    this.setUserName = function (user) {
        var uin = user.uin;

        var tempEl = $D.id("EQQ_BuddyList_Nick_" + uin);
        var tempEl2 = $D.id("EQQ_BuddyList_RightContainer_" + uin);
        //J.out(">>d-2");
        if (tempEl && tempEl2) {
            //J.out(">>d-3");
            tempEl.innerHTML = user.htmlShowName;
            tempEl2.title = user.titleAllName;
        }
        //J.out(">>d-4");


    };
    //更改群屏蔽总设置
    this.setGroupMask = function (state) {;
        groupMask = state;
        switch (state) {
            case "0":
			case 0:
                $D.id("EQQ_ListBottom_maskButton").className = "accept"; 
                break;
            case "1":
			case 1: 
                $D.id("EQQ_ListBottom_maskButton").className = "accept";
                break;
            case "2":
			case 2: 
                $D.id("EQQ_ListBottom_maskButton").className = "mask";
                break;
            case "3":
			case 3: 
                $D.id("EQQ_ListBottom_maskButton").className = "mask";
                break;
        }
    };




    this.showReLoginPanel = function () {
        $D.hide(this.EQQ_Logining);
        $D.show(this.EQQ_ReLoginPanel);
        $D.hide(this.EQQ_LoginSuccess);
        //$D.setStyle(this.EQQ_LoginSuccess, "height", "0px");
    };

    this.onReLoginButtonClick = function () {
        $D.show(this.EQQ_Logining);
        $D.hide(this.EQQ_ReLoginPanel);
        $D.hide(this.EQQ_LoginSuccess);
        //$D.setStyle(this.EQQ_LoginSuccess, "height", "0px");
        $E.notifyObservers(this, "ReLogin");
    };








    /* == 群列表相关方法 ==================== */

    // 创建群列表
    this.createGroupList = function (groupList) {
        this.EQQ_groupListInner.innerHTML = '';
        for (var i = 0; i < groupList.length; i++) {
            this.addGroup(groupList[i]);
        }
    };

    // 添加一个群
    this.addGroup = function (group) {
        var templateGroup = '\
				<div class="EQQ_GroupList_AvatarContainer" title="">\
					<img id="EQQ_GroupList_Avatar_' + group.gid + '" class="EQQ_GroupList_Avatar" src="' + EQQ.getGroupAvatar(group.code) + '" />\
					<div class="EQQ_GroupList_State" id="EQQ_GroupList_State_' + group.gid + '" title="群屏蔽"></div>\
				</div>\
				<div class="EQQ_GroupList_RightContainer" title="<%=titleAllName%> - <%=titleTypeText%>">\
					<div class="EQQ_GroupList_Name"><%=htmlShowName%></div>\
				</div>\
			';
        var html = J.string.template(templateGroup, group);

        var groupEl = $D.node("div", {
            "id": "EQQ_Group_" + group.gid,
            "code": group.code
        });

        groupEl.innerHTML = html;
        this.EQQ_groupListInner.appendChild(groupEl);

        $E.on(groupEl, "mouseover", onListMouseover);
        $E.on(groupEl, "mouseout", onListMouseout);
        $E.on(groupEl, "click", onGroupListClick);

        $D.addClass(groupEl, "EQQ_GroupList_Group");
    };



    /* == 最近联系人列表相关方法 ==================== */

    // 创建最近联系人列表
    this.createRecentList = function (recentList) {
        this.EQQ_recentList.innerHTML = '';
        for (var i = 0; i < recentList.length; i++) {
            this.addRecent(recentList[i]);
        }

    };

    // 添加一个最近联系人
    this.addRecent = function (recent) {
        if (recent.content) {
            if (recent.type == 0) {
                var buddy = recent.content;
                var templateBuddy = '\
						<div class="EQQ_RecentList_ClientType" uin="<%=uin%>" id="EQQ_BuddyList_ClientType_Title_<%=uin%>" title="' + EQQ.hash.clientTypeText[buddy.clientType || "PC"] + '">\
							<div id="EQQ_RecentList_ClientType_<%=uin%>" class="EQQ_BuddyList_ClientType_' + EQQ.hash.clientType[buddy.clientType || "10000"] + '"></div>\
						</div>\
						<div id="EQQ_RecentList_AvatarContainer_<%=uin%>" class="EQQ_BuddyList_AvatarContainer" uin="<%=uin%>" title="' + EQQ.hash.onlineStatusText[buddy.state] + '">\
							<img id="EQQ_RecentList_Avatar_<%=uin%>" class="EQQ_BuddyList_Avatar" src="' + EQQ.CONST.EQQ_SERVER_URL + 'style/images/avatar_default_20_20.gif" />\
							<div class="EQQ_BuddyList_State"></div>\
						</div>\
						<div id="EQQ_RecentList_RightContainer_<%=uin%>" class="EQQ_BuddyList_RightContainer" title="<%=titleAllName%> - ' + EQQ.hash.onlineStatusText[buddy.state] + '">\
							<div id="EQQ_BuddyList_Nick_<%=uin%>" class="EQQ_BuddyList_Nick"><%=htmlShowName%></div>\
						</div>\
					';
                var html = J.string.template(templateBuddy, buddy);

                var buddyEl = $D.node("div", {
                    "id": "EQQ_Recent_" + buddy.uin,
                    "uin": buddy.uin
                });
                buddyEl.innerHTML = html;
                this.EQQ_recentList.insertBefore(buddyEl, this.EQQ_recentList.firstChild);
                $E.on(buddyEl, "mouseover", onListMouseover);
                $E.on(buddyEl, "mouseout", onListMouseout);
                $E.on(buddyEl, "click", onBuddyListClick);

                var avatarEl = $D.id("EQQ_RecentList_AvatarContainer_" + buddy.uin);
                $E.on(avatarEl, "mouseover", onAvatarMouseover);
                $E.on(avatarEl, "mouseout", onAvatarMouseout);

                $D.addClass(buddyEl, "EQQ_BuddyList_Buddy");
                $D.addClass(buddyEl, "EQQ_" + EQQ.hash.onlineStatus[buddy.state] + "Buddy");
                var imgEl = $D.id("EQQ_RecentList_Avatar_" + buddy.uin);
                if (buddy.uin && imgEl) {
                    imgEl.src = EQQ.getUserAvatar(buddy.uin);
                };

            } else {
                var group = recent.content;
                var templateGroup = '\
					<div class="EQQ_GroupList_AvatarContainer" title="">\
						<img id="EQQ_GroupList_Avatar_' + group.gid + '" class="EQQ_GroupList_Avatar" src="' + EQQ.getGroupAvatar(group.code) + '" />\
						<div class="EQQ_GroupList_State" id="EQQ_RecentList_State_' + group.gid + '" title="群屏蔽"></div>\
					</div>\
					<div class="EQQ_GroupList_RightContainer" title="<%=titleAllName%> - <%=titleTypeText%>">\
						<div class="EQQ_GroupList_Name"><%=htmlShowName%></div>\
					</div>\
				';
                var html = J.string.template(templateGroup, group);

                var groupEl = $D.node("div", {
                    "id": "EQQ_Recent_" + group.gid,
                    "code": group.code
                });

                groupEl.innerHTML = html;
                this.EQQ_recentList.insertBefore(groupEl, this.EQQ_recentList.firstChild);

                $E.on(groupEl, "mouseover", onListMouseover);
                $E.on(groupEl, "mouseout", onListMouseout);
                $E.on(groupEl, "click", onGroupListClick);

                $D.addClass(groupEl, "EQQ_GroupList_Group");
            }
        }

    };
    this.updateRecentByBuddy = function (recent) {
        var buddyEl = $D.id("EQQ_Recent_" + recent.uin);
        if (buddyEl) {
            this.EQQ_recentList.insertBefore(buddyEl, this.EQQ_recentList.firstChild);
        } else {
            this.addRecent({ type: 0, content: recent });
        }

    };
    this.updateRecentByGroup = function (recent) {
        var buddyEl = $D.id("EQQ_Recent_" + recent.gid);
        if (buddyEl) {
            this.EQQ_recentList.insertBefore(buddyEl, this.EQQ_recentList.firstChild);
        } else {
            this.addRecent({ type: 1, content: recent });
        }
    };



    this.setMode = function (modeType) {

        switch (modeType) {
            case "master":

                onMyStateClickCall = toggleStatePanel;
                $D.removeClass(this.EQQ_MyState, "EQQ_DisableMyStateSelect");
                this.EQQ_MyState.title = "更改在线状态";
                //J.out("模式: " + modeType);
                break;
            case "slave":

                onMyStateClickCall = alertChangeState;
                $D.addClass(this.EQQ_MyState, "EQQ_DisableMyStateSelect");
                this.EQQ_MyState.title = "WebQQ现在处于辅模式，请从客户端QQ修改您的在线状态。";
                //J.out("模式: " + modeType);
                break;
        }
    };






    this.toggleStatePanel = function (xy) {

        if (this.statePanel && this.statePanel.isShow()) {
            this.hideStatePanel();
        } else {
            this.showStatePanel(xy);
        }

    };
    this.showStatePanel = function (xy) {

        if (this.statePanel) {

        } else {
            this.createStatePanelDom();
        }
        if (xy) {
            var width = this.statePanel.getWidth();
            var height = this.statePanel.getHeight();

            var clientWidth = $D.getClientWidth();
            var clientHeight = $D.getClientHeight();
            var x = xy[0],
				y = xy[1];
            if (x < 2) {
                x = 2;
            }
            if (y < 2) {
                y = 2;
            }
            if (x > clientWidth - width - 2) {
                x = clientWidth - width - 2;
            }
            if (y > clientHeight - height - 2) {
                y = clientHeight - height - 2;
            }
            this.statePanel.setXY(x, y);
        }
        this.statePanel.setTopZIndex();
        this.statePanel.show();

        //J.out("show");

    };
    this.hideStatePanel = function () {

        if (this.statePanel) {
            this.statePanel.hide();
        }
    };






    this.setSelfState = function (state) {
        $E.notifyObservers(this, "SelfStateChange", state);
        this.updateSelfStateChange(state);
    };


	/*

    this.loadAvatar = function (avatarUin) {
        var imgEl = $D.id("EQQ_BuddyList_Avatar_" + avatarUin);
        var onlineImgEl = $D.id("EQQ_OnlineBuddyList_Avatar_" + avatarUin);
        if (imgEl) {
            imgEl.src = EQQ.getUserAvatar(avatarUin);
        };
        if (onlineImgEl) {
            onlineImgEl.src = EQQ.getUserAvatar(avatarUin);
        };
    };






    // 分时加载头像
    var onNotifyBeat_250 = function () {
        if (avatarUins.length > 0) {
            if (!isChunkLoadingAvatar) {
                isChunkLoadingAvatar = true;
                J.timedChunk(avatarUins, packageContext.loadAvatar, packageContext, true, function () {
                    isChunkLoadingAvatar = false;
                });
            }
        }else{
        	$E.removeObserver(EQQ, "NotifyBeat_250", onNotifyBeat_250);
        	EQQ.removeNeedBeat2("loadAvatar");
        }
		

    };
    */	
});



		/* == EQQ 主控条的view层 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2009.11.17 ----- */
 
 
// 视图层：主控栏
Jet().$package("EQQ.View.MainBar", function(J){
	var $D = J.dom,
		$E = J.event;
	var jumpFlag = false;
	var packageContext = this;
	var avatarLoadedUin;
	var buttonFlag = false;
	
	// 初始化MainBar视图
	this.init = function(){
		this.container = $D.id("EQQ_MainBar");
		this.EQQ_StartButton = $D.id("EQQ_StartButton");
		this.EQQ_InfoShow = $D.id("EQQ_InfoShow");
		//this.EQQ_StartButtonIcon = $D.id("EQQ_StartButtonIcon");
		
		
		this.EQQ_MsgBoxButton = $D.id("EQQ_MsgBoxButton");
		this.EQQ_AvatarInMsgBoxButton = $D.id("EQQ_AvatarInMsgBoxButton");
		this.EQQ_MsgCounterInMsgBox = $D.id("EQQ_MsgCounterInMsgBox");
		
		
		
		$E.on(this.EQQ_StartButton, "click", J.bind(handleStartButtonClick,this));
		$E.on(this.EQQ_StartButton, "dblclick", function(e){e.preventDefault();});
		
		$E.on(this.EQQ_MsgBoxButton,"mouseover",J.bind(handleMsgBoxButtonMouseover,this));
		$E.on(this.EQQ_MsgBoxButton,"mouseout",J.bind(handleMsgBoxButtonMouseout,this));
		$E.on(this.EQQ_MsgBoxButton,"click",J.bind(handleMsgBoxButtonClick,this));
		
		
	};
	
	
	this.createDom = function(parentContainer){
		var node = $D.node("div", {
			id:"EQQ_MainBar",
			"class":"EQQ_mainBar"
		});
		
		node.innerHTML = '\
							<div id="EQQ_StartButton" class="EQQ_startButton" href="###" title="WebQQ"></div>\
							<div id="EQQ_MsgBoxButton" class="EQQ_msgBoxButton" href="###" title="来消息了">\
								<img id="EQQ_AvatarInMsgBoxButton" class="EQQ_avatarInMsgBoxButton" src="./style/images/avatar_default_20_20.gif" />\
							</div>\
							<div id="EQQ_InfoShow" class="EQQ_infoShow">WebQQ</div>\
							<div class="unreadMsgInMsgBoxButton">(<span id="EQQ_MsgCounterInMsgBox" title="未读消息">99</span>)</div>';
		parentContainer.appendChild(node);
		
		/*
		node = $D.node("div", {
			"class":"statusBar_line"
		});
		*/
		
		parentContainer.appendChild(node);
		
	};
	
	var handleStartButtonClick = function(e){
		e.preventDefault();
		// this.toggleButton();
		$E.notifyObservers(this, "ClickStart");
		
	};
	
	var handleMsgBoxButtonClick = function(e){
		e.preventDefault();
		$E.notifyObservers(this, "ReadLastMsg");
		
	};
	var handleMsgBoxButtonMouseover = function(e){
		$E.notifyObservers(this, "ShowMsgBox");
	};
	var handleMsgBoxButtonMouseout = function(e){
		$E.notifyObservers(this, "HideMsgBox");
	};
	
	
	this.show = function(){
		$D.setStyle(this.container,"display","block");
	};
	
	this.hide = function(){
		$D.setStyle(this.container,"display","none");
	}
	
	
	// 按下
	this.setStartButtonDown = function(){
		buttonFlag = true;
		
		$D.addClass(this.EQQ_StartButton,"EQQ_startButtonDown");
	};
	
	// 隐藏主面板
	this.setStartButtonUp = function(){
		buttonFlag = false;
		
		$D.removeClass(this.EQQ_StartButton,"EQQ_startButtonDown");
	};
	

	
	// 更新MainBar的在线好友数
	this.updateOnlineBuddy = function(count){
		
		this.EQQ_InfoShow.innerHTML = count + '人';
		this.EQQ_StartButton.title="在线好友 " +count+ " 人";
		//J.out("test1: "+this.EQQ_InfoShow.innerHTML);
	};
	
	// 设置为已离线
	this.setToOffline = function(){
		//$E.off(this.EQQ_StartButton, "click");
		//$D.setStyle(this.EQQ_StartButton, "cursor", "default");
		this.EQQ_InfoShow.innerHTML = 'WebQQ';

	};
	// 设置为上线
	this.setToOnline = function(){
		$D.removeClass(this.EQQ_StartButton,"EQQ_StartButton");
		$D.addClass(this.EQQ_StartButton,"EQQ_startButtonOnline");
		
	};
	
	// 设置为关闭
	this.setToCloseWebQQ = function(){
		this.EQQ_InfoShow.innerHTML = 'WebQQ';
		this.EQQ_StartButton.title="WebQQ"
		$D.removeClass(this.EQQ_StartButton,"EQQ_startButtonOnline");
		$D.addClass(this.EQQ_StartButton,"EQQ_StartButton");

	};
	
	
	
	
	// 更新闪动的头像
	this.updateFlicker = function(uin){
		if(uin){
			this.EQQ_AvatarInMsgBoxButton.src=EQQ.CONST.AVATAR_SERVER_DOMAIN + "cgi/svr/face/getface?type=1&fid=0&uin=" + uin;
		}
	};
	// 显示WebQQ Start的按钮
	this.showStartButton = function(){
		$D.setStyle(this.EQQ_StartButton,"display","block");
		$D.setStyle(this.EQQ_MsgBoxButton,"display","none");
		//$D.show(this.EQQ_StartButton);
		//$D.hide(this.EQQ_MsgBoxButton);
	};
	// 显示消息盒子的按钮
	this.showMsgBoxButton = function(){
		//$D.hide(this.EQQ_StartButton);
		//$D.show(this.EQQ_MsgBoxButton);
		$D.setStyle(this.EQQ_MsgBoxButton,"display","block");
		$D.setStyle(this.EQQ_StartButton,"display","none");
	};
	// 头像跳上
	this.jumpUp = function(){
		jumpFlag = true;
		$D.addClass(this.EQQ_MsgBoxButton,"EQQ_jumpUp");
		
	};
	// 头像跳下
	this.jumpDown = function(){
		jumpFlag = false;
		$D.removeClass(this.EQQ_MsgBoxButton,"EQQ_jumpUp");
	};
	// 头像闪动动画
	this.jumpAvatar = function(uin){
		if(avatarLoadedUin != uin){
			avatarLoadedUin = uin;
			this.EQQ_AvatarInMsgBoxButton.src=EQQ.CONST.AVATAR_SERVER_DOMAIN + "cgi/svr/face/getface?type=1&fid=0&uin=" + uin;
		}
		if(jumpFlag){
			this.jumpDown();
		}else{
			this.jumpUp();
		}
	};

	this.setAllMsgCount = function(count){
		this.EQQ_MsgCounterInMsgBox.innerHTML = count;
		this.EQQ_MsgCounterInMsgBox.title = "未读消息 " +count+ " 条";
	};
	
	
});



		/* == EQQ 消息盒子的view层 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2009.11.17 ----- */
 
 
// 视图层：消息盒子
Jet().$package("EQQ.View.MsgBox", function(J){
	var $D = J.dom,
		$E = J.event;
	var context = this;
	// 初始化MainBar视图
	this.init = function(){

		
		
		this.EQQ_MsgBox = $D.id("EQQ_MsgBox");
		this.EQQ_MessageList = $D.id("EQQ_MessageList");
		
		
		
		
		this.EQQ_ViewMainPanelButtonInMsgBox = $D.id("EQQ_ViewMainPanelButtonInMsgBox");
		this.EQQ_IgnoreAllMsgButtonInMsgBox = $D.id("EQQ_IgnoreAllMsgButtonInMsgBox");

		
		$E.on(this.EQQ_ViewMainPanelButtonInMsgBox,"click",J.bind(function(){
			EQQ.View.MainPanel.show();
			$D.hide(this.EQQ_MsgBox);
		}, this));
		

		
		$E.on(this.EQQ_MsgBox,"mouseover",J.bind(this.showMsgBox,this));
		$E.on(this.EQQ_MsgBox,"mouseout",J.bind(this.hideMsgBox,this));
		
		$E.on(this.EQQ_IgnoreAllMsgButtonInMsgBox,"click",J.bind(this.onIgnoreAllMsgButtonClick,this));
		
		
		
		//$E.on(this.EQQ_MessageList,"mouseover",J.bind(this.move,this));

	};
	
	this.onIgnoreAllMsgButtonClick = function(){
		$E.notifyObservers(this, "IgnoreAllMsg");
	};
	
	// 测试用的
	this.move = function(e){
		J.out(e.target.tagName+" : "+e.currentTarget.tagName+" : "+e.relatedTarget.tagName);
	};
	
	// 显示消息盒子
	this.showMsgBox = function(){
		window.clearTimeout(this._msgBoxTimer);
		$D.show(this.EQQ_MsgBox);
		
	};
	
	// 隐藏消息盒子
	this.hideMsgBox = function(){
		var context = this;
		this._msgBoxTimer = window.setTimeout(function(){
			$D.hide(context.EQQ_MsgBox);
    	},500);

	};
	
	// 显示消息盒子
	this.handleMsgBoxButtonClick = function(e){
		e.preventDefault();
		var uin = this.getAttribute("uin");
		$E.notifyObservers(context, "ReadMsg", uin);
		
	};
	
	// 消息盒子中的消息的mouseover事件
	this.handleMsgListMouseover = function(){
		$D.setStyle(this, "backgroundColor", "#cbe7fc");
	};
	
	// 消息盒子中的消息的mouseout事件
	this.handleMsgListMouseout = function(){
		$D.setStyle(this, "backgroundColor", "white");
	};
	
	// 更新MessageSummary
	this.updateMessageSummaryChange = function(msg){

		if(msg.length === 0){
			this.EQQ_MessageList.innerHTML='';
			$D.hide(this.EQQ_MsgBox);
		}else{
			var lastUin = msg[msg.length-1].from_uin;

			
			//数据格式[{"time":1251611310,"from_uin":828000057,"count":3}]
			var template = '\
					<div id="EQQ_MsgInMsgBox_<%=from_uin%>" class="EQQ_msgInMessageList" uin="<%=from_uin%>">\
						<img class="avatarInMsgBox" src="'+EQQ.CONST.AVATAR_SERVER_DOMAIN+'cgi/svr/face/getface?type=1&fid=0&uin=<%=from_uin%>" />\
						<div class="ignoreButtonInMsgBox" uin="<%=from_uin%>" targetElement="IgnoreButton" href="###" title="忽略">忽略</div>\
						<div class="msgCounterInMsgBox" title="消息条数">(<%=count%>)</div>\
						<div class="buddyNameInMsgBox" title="<%=titleShowName%><<%=from_uin%>>"><%=htmlShowName%></div>\
					</div>';
			var html='';
			for(var i=0;i<msg.length;i++){
				html += J.string.template(template, msg[i]);
			}
			this.EQQ_MessageList.innerHTML=html;
			for(var i=0;i<msg.length;i++){
				
				$E.on($D.id("EQQ_MsgInMsgBox_"+msg[i].from_uin),"mouseover",this.handleMsgListMouseover);
				$E.on($D.id("EQQ_MsgInMsgBox_"+msg[i].from_uin),"mouseout",this.handleMsgListMouseout);
				
				
				$E.on($D.id("EQQ_MsgInMsgBox_"+msg[i].from_uin),"click",function(e){
					switch(e.target.getAttribute("targetElement")){
						case "IgnoreButton":
							var uin = e.target.getAttribute("uin");
							$E.notifyObservers(context,"IgnoreMsg",uin);
							
							//context.EQQ_MessageList.removeChild(this);
							break;
						default:
							var uin = this.getAttribute("uin");
							$E.notifyObservers(context,"ReadMsg",uin);
							break;
					}
				});
			}
			

			
			
		}

	};
	
	
	
	
});



		/* == EQQ 聊天框的view层 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2009.11.17 ----- */
 
 
// 视图层：...
Jet().$package("EQQ.View.ChatBox", function(J){
	//== EQQ.View.ChatBox 的局部变量/局部类声明 ======================================================================
	//------------------------------------------------------------------------------------------------------------
	var packageContext = this,
		$D = J.dom,
		$E = J.event,
		
		// 记录输入框光标位置
		lastRange = null,

		chatBoxMode = "free",
       
		//截屏热键对象
		hotkeyHand = null,
		hotkeyTitle = "截屏",
		
		sendPicCount = 0,
		
		desktopBody = qqweb.layout.getPanel("desktop").body,

		facePanelEl,
		defaultFacePanelEl,
		customFacePanelEl,
		isCustomFaceLoaded = false,
		customFaceList,
		defaultFaceTabEl,
		customFaceTabEl,
		addCustomFaceButtonEl,
		
		chatLogOptionPanelEl,
		viewChatLog,
		exportCurrentChatLog,
		exportCurrentChatLogForm,
		exportCurrentChatLogFileName,
		exportCurrentChatLogFileContent,
		
		isNotNeedCtrlKey = false,
		sendOptionPanelEl,
		sendOption_enterKey,
		sendOption_ctrlEnterKey,
		
		
		
		chatBoxList = [],
		uin2ChatBox = {};
	
	// 需要加载的图像元素数组
	var needLoadImgEl = [];
	
	
	

	
	

	//== EQQ.View.ChatBox 的私有方法 ===============================================================================
	//------------------------------------------------------------------------------------------------------------

	// 延时加载
	var delayLoadCustomFace = function(){

		for(var i=0; i<needLoadImgEl.length; ){
			var imgEl = needLoadImgEl[i];
			var top = imgEl.parentNode.offsetTop;
			var scrollTop = customFacePanelEl.scrollTop;
			J.out("top: "+scrollTop+", y: "+top);
			if(top > (scrollTop - 70) && top < (scrollTop + 300)){
				$D.addClass(imgEl.parentNode, "loading");
				J.array.remove(needLoadImgEl, imgEl);
				imgEl.src = imgEl.getAttribute("lazySrc");
			}else{
				i++;
			}
		}
		
	};
	
	var adjustImgSize = function(){
		var size = 60,
			imgEl = this,
			radio,
			width,
			height,
			marginLeft,
			marginTop;
			
		imgEl.setAttribute("loaded", "true");
		$D.replaceClass(imgEl.parentNode, "loading", "loaded");
		if(imgEl.width > size || imgEl.height > size) {
			if (imgEl.width > imgEl.height ) {
				radio = size / imgEl.width,
				height = imgEl.height * radio,
				marginTop = (size - height) / 2;
				$D.setStyle(imgEl,'width',size+'px');
				$D.setStyle(imgEl,'height',height+'px');
				$D.setStyle(imgEl,'marginTop', marginTop +'px');

			}
			else if (imgEl.width < imgEl.height){
				radio = size/imgEl.height,
				width = imgEl.width * radio,
				marginLeft = (size - width) / 2;

				$D.setStyle(imgEl,'width',width+'px');
				$D.setStyle(imgEl,'height',size+'px');
				$D.setStyle(imgEl,'marginLeft', marginLeft +'px');

			}
			else {
				$D.setStyle(imgEl,'width',size+'px');
				$D.setStyle(imgEl,'height',size+'px');
			}
		}
		else {
				marginLeft = (size - imgEl.width) / 2,
				marginTop = (size - imgEl.height) / 2;
				$D.setStyle(imgEl,'marginLeft', marginLeft +'px');
				$D.setStyle(imgEl,'marginTop', marginTop +'px');

		}
		
		//J.out("imgEl:ok");
	};
	
	//== EQQ.View.ChatBox 的dom事件处理方法 =============================================================================
	//------------------------------------------------------------------------------------------------------------
	
	
	
	var stopPropagation = function(e){
		e.stopPropagation();
	};
	

	
	
	// 滚动事件处理函数
	var onCustomFacePanelScroll = function(){
		if(onCustomFacePanelScroll.timer){
			window.clearTimeout(onCustomFacePanelScroll.timer);
			onCustomFacePanelScroll.timer = null;
		}
		onCustomFacePanelScroll.timer = window.setTimeout(delayLoadCustomFace, 500);
		
	};
	
	var onSendOptionEnterKeyClick = function(e){
		e.stopPropagation();
		packageContext.sendOptionPanel.hide();
		$E.notifyObservers(packageContext, "SetNotNeedCtrlKey");
	};
	
	var onSendOptionCtrlEnterKeyClick = function(e){
		e.stopPropagation();
		packageContext.sendOptionPanel.hide();
		$E.notifyObservers(packageContext, "SetNeedCtrlKey");
	};
	var onViewChatLogClick = function(e){
		e.stopPropagation();
		packageContext.chatLogOptionPanel.hide();
		var chatBox = packageContext.getCurrent();
		$E.notifyObservers(packageContext, "ViewChatLog", chatBox.uin);
	};
	
	var onExportCurrentChatLogClick = function(e){
		e.stopPropagation();
		packageContext.chatLogOptionPanel.hide();
		var chatBox = packageContext.getCurrent();
		$E.notifyObservers(packageContext, "ExportCurrentChatLog", chatBox.uin);
	};

	//== EQQ.View.ChatBox 的公共方法 ===============================================================================
	//------------------------------------------------------------------------------------------------------------
	

	
	// 初始化
	this.init= function(){
		
		//保存一个实例的列表
		chatBoxList = [];
		uin2ChatBox = {}

        if ( packageContext.hotkeyHand == null )
		{   
			var tmpScapture = new HotKey();
			tmpScapture.hotkeyHand = tmpScapture;
			tmpScapture.installHotKey();
			packageContext.hotkeyHand = tmpScapture;
		} 

       //监听启动截屏APP事件
		$E.addObserver(packageContext, "runScreenCapture", packageContext.onRunScreenCapture);
	};
	
	
	
	
	
	
	this.getChatBox = function(uin){
		return uin2ChatBox[uin];
	};
	

	
	//设置好友在线状态
	this.setBuddyState= function(user) {
		var uin = user.uin;
		var chatBox = packageContext.getChatBox(uin);
		if(chatBox){
			chatBox.updateUserState(user.state);
			//$D.id("chatBox_avatarArea_"+uin).className = user.state + "BuddyInChatbox";
		}
		
	};
	//设置好友在线终端
	this.setClientType= function(user){
		var chatBox = packageContext.getChatBox(user.uin); 
		if(chatBox && (chatBox.uin == user.uin)){
			var clientTypeEle=$D.id("chatBox_clientType_"+user.uin)||{};
			clientTypeEle.className = "chatBox_clientType_"+EQQ.hash.clientType[user.clientType||"10000"];
			clientTypeEle.title=user.titleAllName+" - 使用"+EQQ.hash.clientTypeText[user.clientType||"10000"]+"中";
			clientTypeEle.innerHTML="[&nbsp&nbsp&nbsp&nbsp&nbsp使用"+EQQ.hash.clientTypeText[user.clientType||"10000"]+"中]";
		}
	};
	//实例化聊天窗口类
	this.addChatBox = function(user) {
		var chatBox = new EQQ.businessClass.ChatBox({
			modeSwitch : true,
			dragable : true,
			resize : true,
			dragProxy : qqweb.layout.getWindowDragProxy(),
			hasCloseButton : true,
			hasMaxButton : true,
			hasMinButton : true,
			
			// 窗口默认尺寸
			width: 450,
			height: 400,
			// 聊天窗自由模式的最小尺寸
			minWidth:330,
			minHeight:200,
			
			userOrGroup:user, 
			chatBoxType:"single"
		});
		//将实例加入实例列表中
		uin2ChatBox[chatBox.uin] = chatBox;
		chatBoxList.push(chatBox);
		$E.notifyObservers(packageContext, "ChatBoxAdd", chatBox);
		return chatBox;
	};
	
	//实例化聊天窗口类
	this.addGroupChatBox = function(group) {
		var chatBox = new EQQ.businessClass.ChatBox({
			modeSwitch : true,
			dragable : true,
			resize : true,
			dragProxy : qqweb.layout.getWindowDragProxy(),
			hasCloseButton : true,
			hasMaxButton : true,
			hasMinButton : true,
			// 窗口默认尺寸
			width: 450,
			height: 400,
			// 聊天窗自由模式的最小尺寸
			minWidth:330,
			minHeight:200,
			
			userOrGroup:group, 
			chatBoxType:"group"
		});
		//将实例加入实例列表中
		uin2ChatBox[chatBox.uin] = chatBox;
		chatBoxList.push(chatBox);
		$E.notifyObservers(packageContext, "ChatBoxAdd", chatBox);
		return chatBox;
	};
	
	this.shiftChatBox = function() {
		var firstChatbox = chatBoxList.shift();
		firstChatbox.close();
	};

	this.removeChatBox = function(chatBox){
		//从实例列表中去除实例
		J.array.remove(chatBoxList, chatBox);
		delete uin2ChatBox[chatBox.uin];
	};
	// 设置签名
	this.setChatboxSignature = function(buddy) {
		var sigEl= $D.id("chatBox_signature_"+buddy.uin);
		if(sigEl){
			J.out(buddy.htmlSignature)
			sigEl.innerHTML= buddy.htmlSignature;
			sigEl.title= buddy.titleSignature;
		}
		
	};
	

	
	this.getCurrent = function() { 
		//return ChatBox._current;
		return qqweb.layout.getCurrentWindow();
	};
	 
	this.setCurrent = function(window) {
		qqweb.layout.setCurrentWindow(window);
	};
	
	this.getCurrentUin = function() {
		//var chatBox = ChatBox._current;
		var current = this.getCurrent();
		return (current && current.uin) ? current.uin : null;
	};
	
	//获取实例列表的接口
	this.getChatBoxList= function() {
		return chatBoxList;
	};
	

	

	
	// 设置为吸附模式
	this.setAdsorbMode = function(){
		var current = this.getCurrent();

		for(var i=0; i<chatBoxList.length; i++){
		 
			chatBoxList[i].setAdsorbMode();
		}
		/*if(current){
			current.setCurrent();
		}*/
		chatBoxMode = "adsorb";
	};
	
	// 设置为自由模式
	this.setFreeMode = function(){
		var current = this.getCurrent();

		for(var i=0; i<chatBoxList.length; i++){
			chatBoxList[i].setFreeMode();
		}	 
		
		chatBoxMode = "free";
	};
	
	// 获取当前模式
	this.getMode = function(){
		return chatBoxMode;
	};

	
	
	//初始化表情整体面板
	this.createFacePanel = function(xy) {
		
		// 表情整体面板
		facePanelEl = $D.node("div",{
			"class": "facePanel"
		});
		
		// 系统默认表情tab
		var defaultFacePanelEl = $D.node("div",{
			"class": "defaultFacePanel"
		});
		var html = "";
		for(var i=0; i<=104; i++){
			html += '<a class="faceIcon" faceCode="[face' + i + ']" title="[face' + i + ']" href="javascript:;"></a>';
		}
		defaultFacePanelEl.innerHTML = html;
		facePanelEl.appendChild(defaultFacePanelEl);
		
		
		
		$E.on(defaultFacePanelEl, "click", function(e) {
			var faceCode = e.target.getAttribute("faceCode");
			var chatBox = packageContext.getCurrent();
			if(chatBox.editor && chatBox.editor.isEnable()){
				chatBox.editor.insertSystemFace(faceCode);
			}else{
				packageContext.insertText(faceCode);
			}
//			chatBox.focus();
			// 触发隐藏关闭face面板
			$E.notifyObservers(packageContext, "HideFacePanel");
		});
		
		
		// 自定义表情tab
		customFacePanelEl = $D.node("div",{
			"class": " customFacePanel"
		});
		html = '<div id="EQQ_Logining">载入中...</div>';
		customFacePanelEl.innerHTML = html;
		facePanelEl.appendChild(customFacePanelEl);
		
		// tab区域
		var tabAreaEl = $D.node("div",{
			"class": "tabArea"
		});
		html = '\
				<a id="defaultFaceTab" class="defaultFaceTab" href="javascript:;">默认</a>\
				<a id="customFaceTab" class="customFaceTab" href="javascript:;">自定义表情</a>\
				<a id="addCustomFaceButton" class="addCustomFaceButton" href="javascript:;"><div class="addCustomFaceIcon"></div>添加表情</a>\
				<iframe id="uploadCustomFaceIframe" name="uploadCustomFaceIframe" src="about:blank"></iframe>\
				<form id="uploadCustomFaceForm" target="uploadCustomFaceIframe" action="' +EQQ.CONST.UPLOAD_CUSTOM_FACE_SERVER+ '" method="POST" enctype="multipart/form-data">\
					<input id="uploadCustomFaceButton" class="uploadCustomFaceButton" name="custom_face" type="file" size="1" />\
					<input name="f" type="hidden" value="EQQ.View.ChatBox.uploadCustomFaceCallback" />\
				</form>\
				<div id="facePanelNotice"></div>\
			';
		tabAreaEl.innerHTML = html;
		facePanelEl.appendChild(tabAreaEl);
		
		
		desktopBody.appendChild(facePanelEl);
		
		$E.on(facePanelEl, "click", stopPropagation);
		$E.on(facePanelEl, "mouseup", stopPropagation);
		$E.on(customFacePanelEl, "scroll", onCustomFacePanelScroll);
		
		defaultFaceTabEl = $D.id("defaultFaceTab"),
		customFaceTabEl = $D.id("customFaceTab"),
		addCustomFaceButtonEl = $D.id("addCustomFaceButton"); 
		
		// WebQQ好友、群、最近联系人的Tab
		facePanelTab = new J.ui.Tab();
		facePanelTab.add({trigger:defaultFaceTabEl, sheet:defaultFacePanelEl});
		facePanelTab.add({trigger:customFaceTabEl, sheet:customFacePanelEl});

		facePanelTab.config['triggerEvent'] = 'click';
		facePanelTab.config['slideEnabled'] = false;
		$E.addObserver(facePanelTab, "show", function(a){
			switch(a.trigger){
				case customFaceTabEl:
					if(isCustomFaceLoaded){
						
					}else{
						isCustomFaceLoaded = true;
						// 触发隐藏关闭face面板
						$E.notifyObservers(packageContext, "LoadCustomFace");
					}
					
				break;
			}
			
		});
		facePanelTab.init();
		
		
		
		var facePanelNoticeEl = $D.id("facePanelNotice");
		this.facePanelNotice = function(text,isSuccess) {
			var context = this;
			var index=isSuccess?0:1;
			var colors=["#BDFDB8","#FDDFB8"];
			var times=[1000,3000];
			if (this.facePanelNotice.timer) {
				clearTimeout(this.facePanelNotice.timer);
				this.facePanelNotice.timer = null;
			}
			
			facePanelNoticeEl.innerHTML = text;
			$D.setStyle(facePanelNoticeEl,"background",colors[index]);
			$D.show(facePanelNoticeEl);
			
			this.facePanelNotice.timer = setTimeout(function(){
				$D.hide(facePanelNoticeEl);
			},times[index]);
		};
		
		var uploadCustomFaceButton = $D.id("uploadCustomFaceButton");
		var uploadCustomFaceForm = $D.id("uploadCustomFaceForm");
		
		
		//上传完成应该调用这个函数
		$E.on(uploadCustomFaceButton, "change", function(e) {
			e.preventDefault(); 
			J.out("change");
			var file = this;
			if (!(/\.(jpeg|jpg|gif|bmp|png|tiff)$/i).test(file.value)) {
				packageContext.facePanelNotice('禁止上传的文件类型');
				return 0;
			}
			var filesize = packageContext.getFileSize(file);
			if ( filesize > 0 ) {  //有可能是-1
				if (filesize > 250*1024) {
					//alert("文件不能大于250K"); //有待协商
					packageContext.facePanelNotice("文件大小超过250KB");
					return 0;
				}
			}
			uploadCustomFaceForm.submit();
			uploadCustomFaceForm.reset();//这个解决了IE下总是执行两次的问题
			J.out("submit");
		},this);
		
		
		this.facePanel = new qqweb.layout.PopupBox({
			container: facePanelEl,
			html: '',
			noCatchMouseUp:false
		});
		
		$E.addObserver(packageContext, "HideFacePanel", J.bind(this.hideFacePanel, this));
	};
	
	// 上传自定义表情的回调
	this.uploadCustomFaceCallback = function(response){
		J.out("uploadCustomFaceCallback");
		//真实url:http://web.qq.com/cgi-bin/cface_list

		if (response.ret === 0) {

			facePanelTab.select({trigger:customFaceTabEl, sheet:customFacePanelEl});
			
			this.facePanelNotice("上传成功",true);
			var get_img_url = 'http://web.qq.com/cgi-bin/webqq_app/?cmd=2&bd=';
			var img_pre = 'custface';
			var index = customFaceList.length;
			var customFace = [];
			customFace[0] = response.msg ;
			customFace[1] = 0;//timestamp 暂缺
			customFaceList.push(customFace);
			if(index==0) {
				customFacePanelEl.innerHTML = '';
			}
			this.addCustomFace(customFace, index, null, true);
			
			window.setTimeout(function(){
				customFacePanelEl.scrollTop = customFacePanelEl.scrollHeight;
			},1500);
			
		}
		else {
			switch (response.ret) {
				case 1 :
					this.facePanelNotice("文件格式错误");
					break;
				case 3 :
					this.facePanelNotice("文件大小超过250KB");
				    break;
				case 4 :
					this.facePanelNotice("此自定义表情已存在");	
				    break;
				default :
					this.facePanelNotice("发生上传错误");	
			} 
		}

	};
	
	//提示信息
	this.showTip = function( msg,uin ){
		
		 var chatBox = packageContext.getCurrent();
		if( uin != '' )
		{
			chatBox = packageContext.getChatBox(uin);
		} 
		chatBox.tips(msg);
	};
	
	
	
	
	this.getFileSize = function(obj) {　
	　  var image = new Image();//必须这样不能用document.createElement()
		var filePath = obj.value;
		var fileSize=0 ;
	　  try {
			image.dynsrc = filePath; 
		}
		catch(e) {
			return 0;
		}
	　  try {
			fileSize = image.fileSize||0;
		}
		catch(e) {
		}
		if(fileSize==0)
		{
			try {
				fileSize=obj.files[0].fileSize;
			}
			catch(e) {
			}
		};
		return fileSize;
	};


	
	
	
	// 创建自定义表情list
	this.createCustomFaceList = function(list){
		customFaceList = list;
		if(customFaceList.length === 0){
			customFacePanelEl.innerHTML = '<div class="noCustomFaceText">暂无自定义表情</div><a class="noCustomFaceAddButton"><div class="addCustomFaceIcon"></div>立即添加</a>';
		}else{
			customFacePanelEl.innerHTML = '';
			J.array.forEach(customFaceList, this.addCustomFace);
			var onCustomFacePanelClick = function(e) {

				var customFaceCode = $D.getAttributeByParent("customFaceCode", e.target, this);
				if(customFaceCode){
					//J.out("customFaceCode:"+customFaceCode)
					var chatBox = packageContext.getCurrent();
					if(chatBox.editor && chatBox.editor.isEnable()){
						chatBox.editor.insertCustomFace(customFaceCode);
					}else{
						packageContext.insertText(customFaceCode);
					}
					// chatBox.focus();
					// 触发隐藏关闭face面板
					$E.notifyObservers(packageContext, "HideFacePanel");
				}
				
			};
			$E.on(customFacePanelEl, "click", onCustomFacePanelClick);
		}
		
	};
	
	
	
	// 添加一个自定义表情
	this.addCustomFace = function(customFace, index, customFaceList, isLoad){
		var aEl = $D.node("a", {
			"title" : "[自定义表情"+index+"]" + customFace[0],
			"customFaceCode" : "[自定义表情"+index+"]",
			"href" : "javascript:;",
			"hidefocus":""
		});
		
		var imgEl = $D.node("img");
		$E.on(imgEl, "load", adjustImgSize);
		imgEl.setAttribute("loaded", "false");
		aEl.appendChild(imgEl);
		customFacePanelEl.appendChild(aEl);
		
		if((isLoad === true) || index < 18){
			$D.addClass(imgEl.parentNode, "loading");
			imgEl.src = EQQ.CONST.CONN_SERVER_DOMAIN2 + "cgi-bin/webqq_app/?cmd=2&bd=" + customFace[0];
			
		}else{
			imgEl.setAttribute("lazySrc", EQQ.CONST.CONN_SERVER_DOMAIN2 + "cgi-bin/webqq_app/?cmd=2&bd=" + customFace[0]);
			needLoadImgEl.push(imgEl);
			
		}
		
		 
	};
	
	
	// 显示系统表情面板
	this.showFacePanel = function(xy){
		if(this.facePanel){
			
		}else{
			this.createFacePanel();
		}
		if(xy){
			var width = this.facePanel.getWidth();
			var height = this.facePanel.getHeight();
			var clientWidth = $D.getClientWidth();
			var clientHeight = $D.getClientHeight();
	
			var x = xy[0] - (width/2);
			var y = xy[1] - height - 3;
	
			if(x < 2){
				x = 2;
			}
			if(y < 2){
				y = 2;
			}
			if(x > clientWidth - width - 2){
				x = clientWidth - width - 2;
			}
			if(y > clientHeight - height - 2){
				y = clientHeight - height - 2;
			}
			this.facePanel.setX(x);
			this.facePanel.setY(y);
		}

		//$D.setStyle(facePanelEl, "zIndex", qqweb.layout.getTopZIndex());
		this.facePanel.setTopZIndex();
		this.facePanel.show();
	};
	this.hideFacePanel = function(){
		if(this.facePanel){
			this.facePanel.hide();
		}
		
	};
	
	

	
	this.getSelection = function() {
		return window.getSelection ? window.getSelection() : document.selection;
	};
	
	//上传文件
	this.uploadSendFile = function(){//uploadSendFilefile_
		  var uploadSendForm = $D.id("uploadSendFilefile_"+this.getCurrentUin());		
		  var chatBox = packageContext.getCurrent(); 	
		  var fileName = ""; 
		  fileName = uploadSendForm.file.value;		  
		  if ( fileName == '' ) {				 
			  packageContext.getCurrent().tips('请选择文件!');
			  return 0;
		  }
		   
		  var maxUploadSize = 10;
		  if(packageContext.getFileSize(uploadSendForm.file) > maxUploadSize *1024*1024 ){		  
			  packageContext.getCurrent().tips('文件大小超出'+maxUploadSize+'M限制!');
			    uploadSendForm.reset();
			  return 0;
		  }
		  //if(fileSize>maxFileSizeMB*1024*1024)
		  //http://file1.web.qq.com/from/to/lcid/srvindex/srvport/1/f/1/0/0
		  var self = EQQ.Model.BuddyList.getSelf();
		  var samp = ((new Date().getTime())%4096);
		  uploadSendForm.action = EQQ.CONST.FILE_SERVER+self.uin+'/'+chatBox.uin+'/'+samp+'/'+EQQ.index+'/'+EQQ.port+'/1/f/1/0/0';	  
	    
		  uploadSendForm.submit();
		  uploadSendForm.reset();//这个解决了IE下总是执行两次的问题
		  
		  $E.notifyObservers(this, "sendFile", {filename:fileName,to_uin:chatBox.uin,lcid:samp});
		  chatBox.focus();	 
	};
	
	// 上传要“发送的图片”  
	this.uploadSendPic = function(){ 
		var uploadSendPicForm = $D.id("uploadSendPicfile_"+this.getCurrentUin());
				
		var chatBox = packageContext.getCurrent(); 		  
		var fileName = ""; 
		var fileOjb = '';
		if( chatBox.chatBoxType == "group" ){
			fileOjb = uploadSendPicForm.custom_face;
			fileName = uploadSendPicForm.custom_face.value;
			uploadSendPicForm.action = EQQ.CONST.UPLOAD_CUSTOM_FACE_SERVER+"?time="+(new Date().getTime());
		}
		else{
			fileName = uploadSendPicForm.file.value;
			uploadSendPicForm.action = EQQ.CONST.OFFLINE_FILE_SERVER+"upload_offline_pic?time="+(new Date().getTime());
			uploadSendPicForm.skey.value = qqweb.portal.getCookieSkey();
			var self = EQQ.Model.BuddyList.getSelf();
			uploadSendPicForm.uin.value = self.uin;
			fileOjb =uploadSendPicForm.file;
		}
		var maxUploadSize = 1;
		if(packageContext.getFileSize(fileOjb) > maxUploadSize *1024*1024 ){		  
			packageContext.getCurrent().tips('文件大小超出'+maxUploadSize+'M限制!');
			uploadSendPicForm.reset();
			return 0;
		}
		  
		if (!(/\.(jpeg|jpg|gif|bmp|png)$/i).test(fileName)) {
			//alert('请选择图片文件!');
			packageContext.getCurrent().tips('请选择图片文件!');
			uploadSendPicForm.reset();
			return 0;
		}
		var fileid = packageContext.geneSendPicId();				
		uploadSendPicForm.fileid.value = fileid;				
		uploadSendPicForm.submit();
		uploadSendPicForm.reset();//这个解决了IE下总是执行两次的问题
		//J.out("submit");	
			
		if( chatBox.chatBoxType !== "group" ){
			var chatBox = packageContext.getCurrent(); 
			packageContext.insertLoading(fileid);
		}
	};    
	 
	//插入离线图片
	this.insertSendPic = function(data){ 	     
		 var chatBox = packageContext.getCurrent();  
		 var mask = "[发送图片"+data.result.file_path+"]";
		 var obj = J.dom.id("loading_"+data.fileid);
		 //obj = J.dom.id("loading_1");
		 if( obj )
		 {
			 obj.src = data.result.url; 
			 obj.setAttribute("mark",mask);	
			 //obj.setAttribute("align","bottom");	
		 }
		//chatBox.editor.insertImage(mask,data.result.url);
 	};
	//插入群发送图片(自定义表情方法)
	this.insertSendPicGroup = function(fileName){ 	     
		 var chatBox = packageContext.getCurrent(); 
		 var mask = "[图片"+fileName+"]";
		 var get_img_url = 'http://web.qq.com/cgi-bin/webqq_app/?cmd=2&bd=';
		 chatBox.editor.insertImage(mask,get_img_url+fileName);
 	};
	
	/* 处理发送图片前loading图片相关 */
	//生成插入图片的ID
	this.geneSendPicId	 = function(){		
		return (++sendPicCount);
	};
	this.insertLoading = function(fileid){
		 var chatBox = packageContext.getCurrent(); 	 
		 var img = '<img mark="[发送图片loading]" src="style/images/img_loading.gif" id="loading_'+fileid+'"  style="vertical-align:bottom" />';
		 chatBox.editor.insertHtml(img);
	};
	this.removeLoading = function(fileid){
		if( typeof(fileid) == 'undefined' && fileid == '' )
		   return false;
		 var obj = J.dom.id("loading_"+fileid);
		 if( obj )
		   obj.parentNode.removeChild(obj);
	};
	
	// 给textarea插入文本
	this.insertText = function(text) {
		var chatBox = this.getCurrent();
		var textArea = chatBox._textArea;

		// ie浏览器添加系统表情
		if(J.browser.ie) {
			var range = chatBox.getRange();
			if (lastRange){
				range = lastRange;
			}
			if (range) {
				range.text = (text);
			} else { // 当没有焦点是添加到最后
				textArea.value += text;
			}

		// 非ie浏览器添加系统表情
		}else{
			//var selection = document.selection;
			if(J.isUndefined(textArea.selectionStart)){
				textArea.value += text;
			}else{
				textArea.value = textArea.value.substr(0, textArea.selectionStart) + text + textArea.value.substr(textArea.selectionEnd);
			};
		}
	};
	
	
	
	
	
	// 显示发送快捷键设置面板
	this.showSendOptionPanel = function(xy){
		if(this.sendOptionPanel){
			
		}else{
			this.createSendOptionPanel();
		}
		if(xy){
			var width = this.sendOptionPanel.getWidth();
			var height = this.sendOptionPanel.getHeight();
			var clientWidth = $D.getClientWidth();
			var clientHeight = $D.getClientHeight();
			var x = xy[0],
				y = xy[1] + 23;
			if(x < 2){
				x = 2;
			}
			if(y < 2){
				y = 2;
			}
			if(x > clientWidth - width - 2){
				x = clientWidth - width - 2;
			}
			if(y > clientHeight - height - 2){
				y = clientHeight - height - 2;
			}
			J.out("xy:"+x+","+y+" height:"+height+", width:"+width);
			this.sendOptionPanel.setXY(x, y);
		}
		//$D.setStyle(sendOptionPanelEl, "zIndex", qqweb.layout.getTopZIndex());
		this.sendOptionPanel.setTopZIndex();
		this.sendOptionPanel.show();
	};
	
	this.hideSendOptionPanel = function(){
		if(this.sendOptionPanel){
			this.sendOptionPanel.hide();
		}
		
	};
	
	// 初始化发送快捷键设置面板
	this.createSendOptionPanel = function(){
		sendOptionPanelEl = $D.node("div",{
			"class": "sendOptionPanel"
		});

		desktopBody.appendChild(sendOptionPanelEl);

		packageContext.sendOptionPanel = new qqweb.layout.PopupBox({
			container: sendOptionPanelEl,
			html: ' <a id="sendOption_enterKey" class="simpleMenuItem" href="javascript:void(0);"><div class="selectedIcon"></div>按Enter键发送</a>\
					<a id="sendOption_ctrlEnterKey" class="simpleMenuItem" href="javascript:void(0);"><div class="selectedIcon"></div>按Ctrl+Enter键发送</a>'
		});
		sendOption_enterKey = $D.id("sendOption_enterKey");
		sendOption_ctrlEnterKey = $D.id("sendOption_ctrlEnterKey");
		
		
		$E.on(sendOption_enterKey, "click", onSendOptionEnterKeyClick);
		$E.on(sendOption_ctrlEnterKey, "click", onSendOptionCtrlEnterKeyClick);
		
		if(isNotNeedCtrlKey === true){
			this.setNotNeedCtrlKey();
		}else{
			this.setNeedCtrlKey();
		}

	};
	
	// 设置为Enter键发送
	this.setNotNeedCtrlKey = function(){
		isNotNeedCtrlKey = true;
		if(this.sendOptionPanel){
			$D.removeClass(sendOption_ctrlEnterKey, "simpleMenuItemSelected");
			$D.addClass(sendOption_enterKey, "simpleMenuItemSelected");
		}
		
		
	};
	// 设置为Ctrl+Enter键发送
	this.setNeedCtrlKey = function(){
		isNotNeedCtrlKey = false;
		if(this.sendOptionPanel){
			$D.removeClass(sendOption_enterKey, "simpleMenuItemSelected");
			$D.addClass(sendOption_ctrlEnterKey, "simpleMenuItemSelected");
		}
		
	};

	//返回用户的发送消息按键设置
	this.getSendMsgKey = function(){
		return isNotNeedCtrlKey;
	};
	
	// 显示聊天记录选项面板
	this.showChatLogOptionPanel = function(xy){
		if(this.chatLogOptionPanel){
			
		}else{
			this.createChatLogOptionPanel();
		}
		if(xy){
			var width = this.chatLogOptionPanel.getWidth();
			var height = this.chatLogOptionPanel.getHeight();
	
			var clientWidth = $D.getClientWidth();
			var clientHeight = $D.getClientHeight();
			var x = xy[0],
				y = xy[1] + 18;
			if(x < 2){
				x = 2;
			}
			if(y < 2){
				y = 2;
			}
			if(x > clientWidth - width - 2){
				x = clientWidth - width - 2;
			}
			if(y > clientHeight - height - 2){
				y = clientHeight - height - 2;
			}
			this.chatLogOptionPanel.setXY(x, y);
		}

		//$D.setStyle(chatLogOptionPanelEl, "zIndex", qqweb.layout.getTopZIndex());
		this.chatLogOptionPanel.setTopZIndex();
		this.chatLogOptionPanel.show();
	};
	this.hideChatLogOptionPanel = function(){
		if(this.chatLogOptionPanel){
			this.chatLogOptionPanel.hide();
		}
		
	};

	// 初始化聊天记录选项面板
	this.createChatLogOptionPanel = function(){
		chatLogOptionPanelEl = $D.node("div",{
			"class": "chatLogOptionPanel"
		});

		desktopBody.appendChild(chatLogOptionPanelEl);

		packageContext.chatLogOptionPanel = new qqweb.layout.PopupBox({
			container: chatLogOptionPanelEl,
			html: ' <a id="viewChatLog" class="simpleMenuItem" href="javascript:;">查看历史消息</a>\
					<a id="exportCurrentChatLog" class="simpleMenuItem" href="javascript:;">导出当前消息</a>\
					<iframe id="exportCurrentChatLogIframe" name="exportCurrentChatLogIframe" class="exportCurrentChatLogIframe" src="about:blank"></iframe>\
					<form id="exportCurrentChatLogForm" target="exportCurrentChatLogIframe" action="'+EQQ.CONST.DOWNLOAD_CHAT_LOG_SERVER+'" method="POST">\
						<input id="exportCurrentChatLogFileName" name="filename" type="hidden" value="" />\
						<input id="exportCurrentChatLogFileContent" name="filecontent" type="hidden" value="" />\
					</form>\
			'
		});
		viewChatLog = $D.id("viewChatLog");
		exportCurrentChatLog = $D.id("exportCurrentChatLog");
		exportCurrentChatLogForm = $D.id("exportCurrentChatLogForm");
		exportCurrentChatLogFileName = $D.id("exportCurrentChatLogFileName");
		exportCurrentChatLogFileContent = $D.id("exportCurrentChatLogFileContent");
		
		
		$E.on(viewChatLog, "click", onViewChatLogClick);
		$E.on(exportCurrentChatLog, "click", onExportCurrentChatLogClick);

	};
	//群屏蔽面板控制
	this.createGroupMaskPanelDom = function(){
		var groupMaskPanelEl = $D.node("div",{
			"class": "groupMaskPanel"
		});

		desktopBody.appendChild(groupMaskPanelEl);

		packageContext.groupMaskPanel = new qqweb.layout.PopupBox({
			container: groupMaskPanelEl,
			html: ' <a id="SingleMask_Prompt" state="0" class="simpleMenuItem" href="javascript:void(0);"><div class="selectedIcon"></div>接收并提示消息</a>\
					<a id="SingleMask_NoPrompt" state="1" class="simpleMenuItem" href="javascript:void(0);"><div class="selectedIcon"></div>接收不提示消息</a>\
					<a id="SingleMask_Mask" state="2" class="simpleMenuItem" href="javascript:void(0);"><div class="selectedIcon"></div>完全阻止群消息</a>'
		});
		this.promptDom=$D.id("SingleMask_Prompt");
		this.noPromptDom=$D.id("SingleMask_NoPrompt");
		this.maskDom=$D.id("SingleMask_Mask");
		var els = [
				this.promptDom,
				this.noPromptDom,
				this.maskDom
			];
			
		J.array.forEach(els, function(item, i, arr){
			$E.on(item, "click",  onMaskStateButtonClick);
		});
		//this.setGroupMaskState(groupMask);
		 
	};
	//群消息屏蔽响应按钮
	var onMaskStateButtonClick = function(){
		var state= this.getAttribute("state");
		var current=packageContext.getCurrent();
		 
//		groupMask=state;
//		packageContext.setGroupMaskState(groupMask);
		$E.notifyObservers(packageContext, "SetSingleGroupMaskState", {type:'single', uin:current.uin,mask:state});
		
	};
	this.setGroupMaskState = function(state){
		$D.removeClass(this.promptDom, "simpleMenuItemSelected");
		$D.removeClass(this.noPromptDom, "simpleMenuItemSelected");
		$D.removeClass(this.maskDom, "simpleMenuItemSelected");
		switch(state){
			case "0":
			case 0:
				$D.addClass(this.promptDom, "simpleMenuItemSelected");
				break;
			case "1":
			case 1:
				$D.addClass(this.noPromptDom, "simpleMenuItemSelected");
				break;
			case "2":
			case 2:
				$D.addClass(this.maskDom, "simpleMenuItemSelected");
				break;
		}
		
	};
	this.toggleGroupMaskStatePanel = function(xy,mask){
		
		if(this.groupMaskPanel && this.groupMaskPanel.isShow()){
			this.hideGroupMaskStatePanel();
		}else{ 
			this.showGroupMaskStatePanel(xy);
			this.setGroupMaskState(mask);
		}
		
	};
	this.showGroupMaskStatePanel = function(xy){

		if(this.groupMaskPanel){

		}else{
			this.createGroupMaskPanelDom();
		}
		if(xy){
			var width = this.groupMaskPanel.getWidth();
			var height = this.groupMaskPanel.getHeight();
	
			var clientWidth = $D.getClientWidth();
			var clientHeight = $D.getClientHeight();
			var x = xy[0],
				y = xy[1]+20;
			if(x < 2){
				x = 2;
			}
			if(y < 2){
				y = 2;
			}
			if(x > clientWidth - width - 2){
				x = clientWidth - width - 2;
			}
			if(y > clientHeight - height - 2){
				y = clientHeight - height - 2;
			}
			this.groupMaskPanel.setXY(x, y);
		}
		this.groupMaskPanel.show();

		J.out("groupMaskPanelshow");

	};
	this.hideGroupMaskStatePanel = function(){

		if(this.groupMaskPanel){
			this.groupMaskPanel.hide();
		}
	};
	
	this.exportChatLog = function(self, user){
		var date = new Date();
		var dateString_1 = J.date.format(date, "YYYY-MM-DD");
		var dateString_2 = J.date.format(date, "YYYY-MM-DD hh:mm:ss");
		
		var chatBox = this.getChatBox(user.uin);
		if(chatBox){
			exportCurrentChatLogFileName.value = "WebQQ_"+self.uin+"_"+user.uin+"_"+dateString_1+".html";
			exportCurrentChatLogFileContent.value = '\
<!DOCTYPE HTML>\
<html>\
<head>\
	<title>与' + user.allName + '的聊天记录 - WebQQ</title>\
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\
	<style type="text/css">\
	<!-- \
		body{\
			font:12px/1.5 tahoma, helvetica, clean, sans-serif;\
		}\
		h3#title {\
			font-size:14px;\
			font-weight:bold;\
		}\
		#chatInfo {\
			clear:both;\
			color:#808080;\
			text-align:left;\
		}\
		#saveDate {\
			padding-left:20px;\
		}\
		#footer {\
			padding-top:30px;\
		}\
		#footer img {\
			border:0px;\
		}\
		.chatBox_myMsg{\
			display:block;\
			margin:0;\
			padding:5px;\
		}\
		.chatBox_myMsg .msgHead{\
			color:#004868;\
			overflow:hidden;\
			zoom:1;\
		}\
		.chatBox_myMsg .msgBody{\
			margin:0 0 0 13px;\
			word-wrap:break-word;\
		}\
		.chatBox_buddyMsg{\
			display:block;\
			margin:0;\
			padding:5px;\
		}\
		.chatBox_buddyMsg .msgHead{\
			color:#4a7200;\
		}\
		.chatBox_buddyMsg .msgBody{\
			margin:0 0 0 13px;\
			word-wrap:break-word;\
		}\
	--> \
	</style>\
</head>\
<body>\
	<h3 id="title">与' + user.htmlAllName + '的聊天记录 - WebQQ</h3>\
	<div id="chatInfo">\
		<span id="buddyInfo">聊天对象：' + user.htmlAllName + '</span>\
		<span id="saveDate">保存时间：' + dateString_2 + '</span>\
	</div>\
	<hr/>\
	<!-- 聊天内容开始 -->\
				' + chatBox._chatBox_msgList.innerHTML + '\
	<!-- 聊天内容结束 -->\
	<div id="footer">\
		<hr/>\
		<a href="' + EQQ.CONST.EQQ_SERVER_URL + '" target="_blank" title="WebQQ"><img src="'+EQQ.CONST.EQQ_SERVER_URL+'style/images/qqweb_logo.png" alt="WebQQ Logo"/></a>\
	</div>\
</body>\
</html>\
			';
		
			exportCurrentChatLogForm.submit();
		}
		
	};
	
	
	/* 截屏热键注册 */
	this.getHotKeyTitle = function(){  
		return hotkeyTitle;
	};
	this.onRunScreenCapture = function( chatBox ){
		qqweb.portal.runApp("screenCapture", {e:chatBox.e,mode:chatBox.mode,uin:chatBox.uin,chatBoxType:chatBox.chatBoxType});
	};
	this.onExitHotkey = function(){ 
		if( packageContext.hotkeyHand  )
		   packageContext.hotkeyHand.unstall();
	};
	var HotKey = function() {
		this.hotkeyctrl = null;
		this.hotkeyHand = null;
		 
	};
	HotKey.prototype = {
    
		init : function() {
			this.hotkeyctrl = null;
			if (J.browser.ie){//(YAHOO.env.ua.ie) {
				var element = document.createElement('div');
				$D.addClass(element,"hidden_div");
				element.innerHTML = '<object id="hotkeyctrlid" CLASSID="CLSID:E9E96A86-4CEC-4DBF-A5A2-37C8C7E66F1A" ></object>';
				document.body.appendChild(element);
				this.hotkeyctrl = document.getElementById("hotkeyctrlid").object;
			} else if ( J.browser.firefox ){//(J.browser.chrome || J.browser.firefox || J.browser.opera || J.browser.safari){ 
				var element = document.createElement('div');
				$D.addClass(element,"hidden_div");
				element.innerHTML = '<embed id="hotkeyctrlid" type="application/tencent-WebQQ-hotkey" hidden="true"></embed>';
				document.body.appendChild(element);
				this.hotkeyctrl = document.getElementById("hotkeyctrlid");
			}
		},
		detectPlugin : function() {
			try {
				var hotkeyctrl = new ActiveXObject("hotkeyctrl.Hotkey");
				if (hotkeyctrl)
					return true;
			} catch (e) {
				var mimetype = navigator.mimeTypes["application/tencent-WebQQ-hotkey"];
				if (mimetype) {
					var plugin = mimetype.enabledPlugin;
					if (plugin) {
						return true;
					}
				} else {
					return false;
				}
			}
		},
		reghotkey : function(keyId, modifiers, vk) {
			if (!this.hotkeyctrl)
				return;
			var result = this.hotkeyctrl.reg(keyId, modifiers, vk);
			if (0 == result) {
				return true;
			} else {
				// alert("Reg hotkey failed: " + result);
				return false;
			}
		},
		regCallback : function(callback) {
			if (this.hotkeyctrl) {
				this.hotkeyctrl.onhotkey = callback;
			}
		},
		unreg : function(id) {
			if (this.hotkeyctrl)
				this.hotkeyctrl.unreg(id);
		},
		unstall : function() {   
			if (this.hotkeyctrl)
				this.hotkeyctrl.unreg(1);
			this.hotkeyctrl = null;
		}
	};

	HotKey.prototype.installHotKey = function() {
		
		// 设置截屏快捷键
		if ( J.browser.ie || J.browser.firefox ){//|| J.browser.chrome || J.browser.opera || J.browser.safari){//(YAHOO.env.ua.ie || YAHOO.env.ua.gecko) {
			
			var scaptureHotkey = this.hotkeyHand;//scaptureHotkey = new HotKey();
			if (scaptureHotkey.detectPlugin()) {
				scaptureHotkey.init();
				var result = scaptureHotkey.reghotkey(1, 1 | 2, 65);
				if (result) {
					hotkeyTitle = "截屏(Ctrl + Alt + A)";
				} else {
					// 如果注册失败,则注册Ctrl+Alt+Shift+A
					result = scaptureHotkey.reghotkey(1, 1 | 2 | 4, 65);
					if (result) {						
						hotkeyTitle = "截屏(Ctrl + Alt + Shift + A)";
					}
				} 
				if (result) {
					scaptureHotkey.regCallback(function(id) { 
							var chatBox = packageContext.getCurrent();
							if( chatBox == null )
							   return false;
							  packageContext.onRunScreenCapture(packageContext.getChatBox(chatBox.uin));
							});
				} else {
					setTimeout(function() {
								//alert('截屏快捷键已被其他程序占用,若要进行截屏,请手动点击截屏按钮.');
								scaptureHotkey.hotKeyBusy();
							}, 1000);					 

				}
			}
		}
	};
	HotKey.prototype.hotKeyBusy = function(){	
		 var tipWindow = new qqweb.businessClass.Window({
				title : "温馨提示",
				modeSwitch : true,
				dragable : true,
				resize : true,
				width: 380,
				height: 120,
				hasCloseButton : true,
				hasOkButton : true,
				isSetCentered : true 
			});
			
		var inHtml = '<div style="width:100%; height:100%; background-color:#FFFFFF; line-height:60px;text-align:center; vertical-align:middle;">\
						截屏快捷键已被其他程序占用,若要进行截屏,请手动点击截屏按钮!\
					   </div>';
		tipWindow.setHtml(inHtml);
	};
	
	//接收文件
	this.receiveFile = function(option,clientid){
 		var fileUrl = EQQ.CONST.CONN_SERVER_DOMAIN+'channel/get_file?lcid='+option.session_id+'&guid='+option.name+'&to='+option.from_uin;
		fileUrl += '&count=1&time='+(new Date().getTime())+'&clientid='+clientid;
		
		var f = $D.id('f_download');
		if( typeof(f) == 'undefined' || f == null )
		{ 
			 f = document.createElement("IFRAME")   
			 f.id = 'f_download';
			 f.name = 'f_download';
			 f.src=""  
			 f.style.display = 'none';
			 document.body.appendChild(f) ; 
		}
		window.open(fileUrl,'f_download');
	};
	//移除接受文件按钮链接样式
	this.removeReceiveFileLink = function(fileid){
		if( fileid == '' || typeof($D.id('agree_'+fileid) ) === 'undefined' || $D.id('agree_'+fileid) == null )
		  return false;
		  
		$D.id('agree_'+fileid).style.color = "gray";
	    $D.id('agree_'+fileid).style.cursor="default";	
	    $D.id('refuse_'+fileid).style.color = "gray";
	    $D.id('refuse_'+fileid).style.cursor="default";	
		$E.off($D.id('agree_'+fileid),"click");
		$E.off($D.id('refuse_'+fileid),"click");
	};
	
	 
});



		/* == EQQ 聊天任务条的view层 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2009.11.17 ----- */
 
 
// 视图层：...
Jet().$package("EQQ.View.TaskBar", function(J){
	var $D = J.dom,
		$E = J.event;
		
	var packageContext = this,
		jumpFlag = false,
		
		curentModel = 'free',
		//showDesktopButton,
		adsorbModelButton,
		freeModelButton
		jumpUserCount = [];
	
	var quickPanel = qqweb.layout.getPanel("quickPanel");
	var statusBar = qqweb.layout.getPanel("statusBar");
	
	// 初始化
	this.init = function(){
		this.EQQ_Container = $D.id("EQQ_Container");
		this.EQQ_ChatBuddyList = $D.id("EQQ_ChatBuddyList");


		// 显示桌面按钮
		/*
		showDesktopButton = $D.node("div",{
			"id":"quickPanel_showDesktopButton",
			"class":"quickPanel_showDesktopButton",
			"title":"点击显示桌面"
		});
		//quickPanel.body.appendChild(showDesktopButton);
		statusBar.body.appendChild(showDesktopButton);
		*/
		//showDesktopButton = $D.id("quickPanel_showDesktopButton");
		//$E.on(showDesktopButton, "click", onShowDesktopButtonClick);
		
		// 自由模式切换按钮
		/*
		freeModelButton = $D.node("div",{
			"id":"quickPanel_freeModelButton",
			"class":"quickPanel_freeModelButton",
			"title":"点击切换到 - [自由模式]"
		});
		//quickPanel.body.appendChild(freeModelButton);
		statusBar.body.appendChild(freeModelButton);
		*/
		freeModelButton = $D.id("quickPanel_freeModelButton");
		$E.on(freeModelButton, "click", onFreeModelButtonClick);
		
		// 吸附模式切换按钮
		/*
		adsorbModelButton = $D.node("div",{
			"id":"quickPanel_adsorbModelButton",
			"class":"quickPanel_adsorbModelButton",
			"title":"点击切换到 - [吸附模式]"
		});
		//quickPanel.body.appendChild(adsorbModelButton);
		statusBar.body.appendChild(adsorbModelButton);
		*/
		adsorbModelButton=$D.id("quickPanel_adsorbModelButton");
		$E.on(adsorbModelButton, "click", onAdsorbModelButtonClick);


	};
	
	
	var onShowDesktopButtonClick = function(e){
		$E.notifyObservers(packageContext, "ClickShowDesktopButton");
	};
	
	var onFreeModelButtonClick = function(e){
		curentModel = 'free';
		$E.notifyObservers(packageContext, "ClickFreeModelButton");		 
	};
	
	var onAdsorbModelButtonClick = function(e){
		curentModel = 'adsorb';
		$E.notifyObservers(packageContext, "ClickAdsorbModelButton");
	};
	
	this.showFreeModelButton = function(){
		$D.hide(adsorbModelButton);
		$D.show(freeModelButton);
	};
	
	this.showAdsorbModelButton = function(){
		$D.hide(freeModelButton);
		$D.show(adsorbModelButton);
	};
	
	// 创建dom
	this.createTaskDom = function(user, taskunitObj) {
		var buddyFace_ele = document.createElement("div");
		buddyFace_ele.className = "EQQ_taskBar_buddy";
		buddyFace_ele.id = "BuddyInTaskbar_"+user.uin;
		buddyFace_ele.title = user.titleAllName + " - "+EQQ.hash.onlineStatusText[user.state];
		var buddyFaceHtml = '<div id="mask_BuddyInTaskbar_<%=uin%>" class="EQQ_taskBar_buddy_mask">\
				<div id="EQQ_FlashDiv_<%=uin%>" class="EQQ_TaskBar_FlashDiv">\
					<div id="EQQ_TaskBar_BuddyState_<%=uin%>" class="EQQ_taskBar_<%=state%>Buddy">\
						<img class="EQQ_taskBar_avatar" src="' + EQQ.getUserAvatar(user.uin) + '" />\
						<div class="EQQ_taskBar_state"><%=state%></div>\
					</div>\
					<div class="EQQ_taskBar_nick"><%=htmlShowName%></div>\
				</div>\
				<div id="EQQ_TaskBar_CloseChatboxButton_<%=uin%>" class="EQQ_TaskBar_CloseChatboxButton" title="关闭会话窗口">X</div>\
			</div>';
		buddyFaceHtml = J.string.template(buddyFaceHtml, user);
		buddyFace_ele.innerHTML = buddyFaceHtml;

		//插入新头像到任务栏
		this.EQQ_ChatBuddyList.appendChild(buddyFace_ele);
		
		var closeButtonEl = $D.id("EQQ_TaskBar_CloseChatboxButton_" + user.uin);
		if(closeButtonEl){
			$E.on(closeButtonEl,"click",function(e){
				e.stopPropagation();
				$E.notifyObservers(packageContext, "ClickCloseButton", user.uin);
			});
		}
		$E.on(buddyFace_ele,"click",function(e){
			e.preventDefault();
			$E.notifyObservers(taskunitObj, "TaskClick");
		});
		return buddyFace_ele;
	};
	
	
	// 创建群dom
	this.createGroupTaskDom = function(group, taskunitObj) {
		var buddyFace_ele = document.createElement("div");
		buddyFace_ele.className = "EQQ_taskBar_buddy";
		buddyFace_ele.id = "BuddyInTaskbar_"+group.gid;
		buddyFace_ele.title = group.titleShowName+"<"+group.code+"> - "+EQQ.hash.onlineStatusText[group.type];
		var buddyFaceHtml = '<div id="mask_BuddyInTaskbar_<%=gid%>" class="EQQ_taskBar_buddy_mask">\
				<div id="EQQ_FlashDiv_<%=gid%>" class="EQQ_TaskBar_FlashDiv">\
					<div id="EQQ_TaskBar_BuddyState_<%=gid%>" class="EQQ_taskBar_<%=type%>Buddy">\
						<img class="EQQ_taskBar_avatar" src="' + EQQ.getGroupAvatar(group.code) + '" />\
						<div class="EQQ_taskBar_state"><%=type%></div>\
					</div>\
					<div class="EQQ_taskBar_nick"><%=htmlShowName%></div>\
				</div>\
				<div id="EQQ_TaskBar_CloseChatboxButton_<%=gid%>" class="EQQ_TaskBar_CloseChatboxButton" title="关闭会话窗口">X</div>\
			</div>';
		buddyFaceHtml = J.string.template(buddyFaceHtml, group);
		buddyFace_ele.innerHTML = buddyFaceHtml;

		//插入新头像到任务栏
		this.EQQ_ChatBuddyList.appendChild(buddyFace_ele);
		
		var closeButtonEl = $D.id("EQQ_TaskBar_CloseChatboxButton_" + group.gid);
		if(closeButtonEl){
			$E.on(closeButtonEl,"click",function(e){
				e.stopPropagation();
				$E.notifyObservers(packageContext, "ClickCloseButton", group.gid);
			});
		}
		$E.on(buddyFace_ele,"click",function(e){
			e.preventDefault();
			$E.notifyObservers(taskunitObj, "TaskClick");
		});
		return buddyFace_ele;
	};
	
	this.getClientWidth = function(){
		return $D.getClientWidth();
		
	};

	
	
	this.setNotCurrent = function(ele){
		//隐藏图标		 
		$D.setClass(ele,"EQQ_taskBar_buddy");
		$D.setClass($D.id('mask_'+ele.id),"EQQ_taskBar_buddy_mask");
		$E.on(ele,"mouseover",packageContext.changeColor);
		$E.on(ele,"mouseout",packageContext.resetColor);
	};
	
	this.setCurrent = function(ele){    
		//显示图标
		//$D.setStyle(ele,"backgroundColor","transparent");
		$E.off(ele,"mouseover",packageContext.changeColor);
		$E.off(ele,"mouseout",packageContext.resetColor);
		 
		$D.setClass(ele,"EQQ_taskBar_buddy");
		$D.addClass(ele,"EQQ_taskBar_currentBuddy");
		if( curentModel === 'free' ){  	
 			$D.setClass($D.id('mask_'+ele.id),"EQQ_taskBar_buddy_mask");
		}else{
			$D.addClass($D.id('mask_'+ele.id),"EQQ_taskBar_buddy_mask_arr");
 		}
 	};
	 
	this.removeTask = function(ele){
		this.EQQ_ChatBuddyList.removeChild(ele);

	};

	this.resetTaskBar = function() {
		/*
		$D.setStyle(this.EQQ_TaskBar,"width",2+"px");
		$D.hide(this.EQQ_Line_1);
		*/
	};
	
	this.getRight = function(ele) {
		return ($D.getClientWidth()-$D.getClientXY(ele)[0]);
	};
	this.getLeft = function(ele) {
		return $D.getClientXY(ele)[0];
	};

	// 设置在线状态
	this.setBuddyState = function(user) {
		var buddyStateEl = $D.id("EQQ_TaskBar_BuddyState_" + user.uin);
		if(buddyStateEl){
			$D.setClass(buddyStateEl,'EQQ_taskBar_' + user.state + 'Buddy');
		}

		var buddyInTaskbarEl = $D.id("BuddyInTaskbar_" + user.uin);
		if(buddyInTaskbarEl){
			buddyInTaskbarEl.title = user.titleAllName + " - " + EQQ.hash.onlineStatusText[user.state];
		}
		
	};
	// mouseover时设置颜色
	this.changeColor = function(){
		//$D.setStyle(this,"backgroundColor","#beecfc");
		$D.addClass(this,"task_BuddyInTaskbar_over");
		//$D.setStyle(this,"backgroundImage","url(./style/images/warnning_blue.png)");
	};
	// 恢复透明色
	this.resetColor = function() {		 
		$D.setClass(this,"EQQ_taskBar_buddy");
 	};
	// 收到消息时设置颜色
	this.setReceiveMsgColor = function(){
		$D.addClass(this,"task_BuddyInTaskbar_msg");
	};
	
    /*  
	   根据用户消息的时候，判断是否要重置计数器
	 */
    this.resetJumpCount = function(uin,time){ 
		if( typeof(jumpUserCount[uin]) === 'undefined' ||  
			typeof(jumpUserCount[uin].time) === 'undefined' || 
			jumpUserCount[uin].time != time ){
			//跳动最大次数
			jumpUserCount[uin] = {count:5,time:time};
			
			var buddyEl = $D.id("BuddyInTaskbar_" + uin);
			if(buddyEl){ 				 
				(J.bind(this.resetColor, buddyEl))();
			}
		}
		
	};
	
	// 头像跳上
	this.jumpUp = function(uins){
		jumpFlag = true;
		for(var i=0; i<uins.length; i++){
			var buddyEl = $D.id("BuddyInTaskbar_" + uins[i]);
			if(buddyEl){
				//$D.addClass(buddyEl,"EQQ_taskBar_buddyJumpUp");
				jumpUserCount[uins[i]].count--;
				(J.bind(this.setReceiveMsgColor, buddyEl))();
			}
		}
	};
	// 头像跳下
	this.jumpDown = function(uins){
		jumpFlag = false;
		for(var i=0; i<uins.length; i++){
			var buddyEl = $D.id("BuddyInTaskbar_" + uins[i]);
			if(buddyEl){
				//$D.removeClass(buddyEl,"EQQ_taskBar_buddyJumpUp");
				if( jumpUserCount[uins[i]].count < 1 ){  
				   continue;	
				}
				(J.bind(this.resetColor, buddyEl))();
			}
		}
	};
	// 头像跳跃动画
	this.jumpAvatar = function(uins){
		if(jumpFlag){
			this.jumpDown(uins);
		}else{
			this.jumpUp(uins);
		}
	};
	
});

/* == EQQ 登录的view层 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2009.11.17 ----- */
 
 
// 视图层：...
Jet().$package("EQQ.View.LoginBox", function(J){
	var $D = J.dom,
		$E = J.event;
	
	// 初始化
	this.init = function(){
		this.EQQ_LoginBox = $D.id("EQQ_LoginBox");
		this.EQQ_LoginBox_CloseButton = $D.id("EQQ_LoginBox_CloseButton");
		this.EQQ_LoginBox_Iframe = $D.id("EQQ_LoginBox_Iframe");
		
		$E.on(this.EQQ_LoginBox_CloseButton,"click",J.bind(this.onCloseButtonClick,this));
	};
	
	
	// 更新
	this.onCloseButtonClick = function(){
		this.hide();
		
	};
	this.openUrl = function(url){
		this.EQQ_LoginBox_Iframe.src = url;
		//alert(this.EQQ_LoginBox_Iframe.contentWindow.document.location)
	};
	this.show = function(){
		$D.setStyle(this.EQQ_LoginBox,"display","block");
	};
	this.hide = function(){
		$D.setStyle(this.EQQ_LoginBox,"display","none");
	};
	
	
});



		/**
 * 聊天窗口所用的富文本编辑器 创建：Azrael 2009-12-4 2010-3-23 修改,以适应QQWEB
 */

Jet().$package("EQQ.View.ChatBox", function(J) {
	var packageContext=this,
	$E = J.event, $D = J.dom, $B = J.browser;

	var stopPropagation = function(e) {
		e.stopPropagation();
	};

	this.Editor = new J.Class({
		// == Editor 内部变量 ==========================================================================
		// ------------------------------------------------------------------------------------------------------------
		textArea : null,
		toolbar : null,
		editArea : null,
		chatbox : null,
		lastRange : null,
		lastBookmark:null,//for ie
		_isEnable : true,// 指示是否启用

		// toolbar 变量
		family : null,
		size : null,
		bold : null,
		italic : null,
		underline : null,
		color : null,
		colorPanel : null,

		// == Editor 公有方法==========================================================================
		// ------------------------------------------------------------------------------------------------------------
		/***********************************************************************
		 * @param tx
		 *            textarea 引用
		 * @param tl
		 *            toolbar 引用
		 */
		init : function(tx, tl,chatbox) {
			this.chatbox = chatbox;
			this.initEditArea(tx);
			this.initStyle();
			this.initToolbar(tl);
		
		},

		// 返回是否启用富文本
		isEnable : function() {
			return this._isEnable;
		},
		// 设置是否启用富文本,后期可以将输入框的操作都转移到Editor
		setEditorStatus : function(status) {
			if (!!status) {
				this._isEnable = true;
				$D.hide(textArea);
				$D.show(editArea);
			} else {
				this._isEnable = false;
				$D.show(textArea);
				$D.hide(editArea);
			}
		},
		/**
		 * @param force
		 *            强制聚焦
		 */
		focus : function(force) {
			
			if (!force && !!this.getRange()) { // 光标已经在输入框,则不聚焦
				return;
			}	
			this.editArea.focus();
			//将光标位置还原
			if(this.lastRange && window.getSelection){ //标准浏览器
				var selection = window.getSelection();
				selection.removeAllRanges();
				selection.addRange(this.lastRange);
			}
			if($B.opera){
				this.editArea.focus();
			}
			if(this.lastBookmark){ //ie
				var range = document.selection.createRange();
				range.moveToBookmark(this.lastBookmark);
				range.collapse(false);
				range.select();
				this.lastBookmark=null;
			}
			
		},
		timeoutFocus : function() {
			var self =this;
			setTimeout(function(){
				self.focus(true);
			},0);
			
		},
		blur : function() {
			this.editArea.blur();
		},
		clear : function() {
			if ($B.ie) {
				this.setHtml('');
			} else {
				this.setHtml('<br/>');
			}
			this.lastBookmark=null;
			this.lastRange=null;
			this.focus(true);
		},
		newLine : function() {
			if ($B.ie) {
				
				var range = document.selection.createRange();
				range.pasteHTML('<br />');
				range.collapse(false);
				range.select();
			} else if ($B.chrome) {// chrome,safari
				
				var selection = window.getSelection();
				var range = selection.getRangeAt(0);
				var fragment = range.createContextualFragment('<br/>&nbsp;');
				var lastNode = fragment.lastChild;
				range.insertNode(fragment);
				range.setEndAfter(lastNode);
				range.setStartAfter(lastNode);
				selection = window.getSelection();
				selection.removeAllRanges();
				selection.addRange(range);
				var brNode = lastNode.previousSibling;
				document.execCommand('Delete', false, null);// 删除附加的空格
				brNode.scrollIntoView();
			} else if ($B.opera) {
				// TODO opera换行
				
			} else if ($B.firefox) { // ff
				
				var range = window.getSelection().getRangeAt(0);
				var fragment = range.createContextualFragment('<br/>');
				var lastNode = fragment.lastChild;
				range.insertNode(fragment);
				range.setEndAfter(lastNode);
				range.setStartAfter(lastNode);
				var selection = window.getSelection();
				selection.removeAllRanges();
				selection.addRange(range);
				//TODO 下面这句注释掉的原因：bug [#3980441]整体样式-开了firebug后，在聊天窗口按enter键，就会导致样式乱掉
				//lastNode.scrollIntoView();
			} else {
				// this.insertHtml('<br />',true);
				
			}
		},

		insertSystemFace : function(faceCode) {
			var code = faceCode.match(/\d+/);
			if (!!code) {
				code = code[0];
			} else {
				code = faceCode;
			}
			var image = '<img mark="' + faceCode + '" src="'
					+ EQQ.CONST.SYSTEM_FACE_URL + code
					+ '.gif" class="system" />';
			this.insertHtml(image);

		},
		insertCustomFace : function(faceCode){
			var code = faceCode.match(/\d+/);
			if (!!code) {
				code = code[0];
			} else {
				code = faceCode;
			}
			var customFaceList = EQQ.Model.ChatMsg.getCustomFaceList();
			var filename = customFaceList[code][0];
			
			var image = '<img mark="' + faceCode + '" src="'
					+EQQ.CONST.CONN_SERVER_DOMAIN2 + "cgi-bin/webqq_app/?cmd=2&bd=" + filename
					+ '" />';
			this.insertHtml(image);
			
		},
		insertImage : function(imgText, imgSrc) {

			var image = '<img mark="' + imgText + '" src="' + imgSrc + '" />';
			this.insertHtml(image);

		},
		insertHtml : function(html, removeBr) {  
			var editArea = this.editArea;
			var self = this;
			if ($B.ie) {
//				this.focus(true);
				var range = this.getRange();
				if (this.lastRange) {
					range = this.lastRange;
				}
				if (range) {
					range.collapse(false);
					range.select();
					range.pasteHTML(html);
					range.select();
					
				} else { // 当没有焦点是添加到最后
					editArea.innerHTML += html;
					var lastNode = editArea.lastChild;
					// lastNode.scrollIntoView();
				}
				
				var lastNode = editArea.lastChild;
				if (removeBr) {
					while (lastNode && lastNode.nodeName.toLowerCase() == 'br') {
						var node = lastNode;
						lastNode = lastNode.previousSibling;
						editArea.removeChild(node);
					}
				}
			} else if (window.getSelection) {// 如果是支持window.getSelection的浏览器,则下面的方法都支持
//				this.focus(true);
				var range = this.getRange();
				if (this.lastRange)
					range = this.lastRange;
				if (!range) {// 当没有焦点时添加到最后
					editArea.innerHTML += html;
					var lastNode = editArea.lastChild;
					// lastNode.scrollIntoView();
				} else {
					range.collapse(false);
					var fragment = range.createContextualFragment(html);
					var lastNode = fragment.lastChild;
					if (removeBr) {
						while (lastNode
								&& lastNode.nodeName.toLowerCase() == 'br'
								&& lastNode.previousSibling
								&& lastNode.previousSibling.nodeName
										.toLowerCase() == 'br') {
							var node = lastNode;
							lastNode = lastNode.previousSibling;
							fragment.removeChild(node);
						}
					}
					range.insertNode(fragment);
					if (lastNode) {
						range.setEndAfter(lastNode);
						range.setStartAfter(lastNode);
					}
					var selection = getSelection();
					selection.removeAllRanges();
					selection.addRange(range);
					// if(lastNode.nextSibling)
					// lastNode.nextSibling.scrollIntoView();// 显示插入的内容

				}
				
			}
			this.focus(true);
//			this.simpleSaveRange();
			setTimeout(function() {
						self.editArea.scrollTop = self.editArea.scrollHeight;
						self.editArea.scrollLeft = self.editArea.scrollWidth;
					}, 200);
		},
		getAllStyles : function() {
			var editArea = this.editArea;
			var weight = $D.getStyle(editArea, 'fontWeight');
			if (/\d+/.test(weight)) {
				if (parseInt(weight) >= 700)
					weight = 'bold';
				else
					weight = 'normal';
			}
			var styles = [$D.getStyle(editArea, 'fontFamily'),
					$D.getStyle(editArea, 'fontSize'), weight,
					$D.getStyle(editArea, 'fontStyle'),
					$D.getStyle(editArea, 'textDecoration'),
					$D.getStyle(editArea, 'color')];
			return styles.join('|');// .toLowerCase();
		},
		// == Editor 私有方法 ==========================================================================
		// ------------------------------------------------------------------------------------------------------------

		initEditArea : function(element) {
			var textArea = this.textArea = element;
			var editAreaOuter = document.createElement('div');
			$D.addClass(editAreaOuter, 'chatBox_editArea_outer');

			var editArea = this.editArea = document.createElement('div');
			editArea.id = textArea.id + '_editArea';
			$D.addClass(editArea, 'chatBox_editArea');
			editAreaOuter.appendChild(editArea);
			textArea.parentNode.insertBefore(editAreaOuter, textArea);
			$D.hide(textArea);

			if ($B.ie) {
				editArea.contentEditable = 'true';
			} else {
				editArea.setAttribute('contentEditable', 'true');
				this.setHtml('<br />');
			}
			
			
			
			$E.on(editArea, 'keyup', J.bind(this.onEditAreaKeyup, this));
			
			//$E.on(window, 'keydown', function(){alert(2)});
			
			$E.on(editArea, 'click', J.bind(this.onEditAreaClick, this));
			$E.on(editArea, 'mousedown', J.bind(this.onEditAreaMousedown, this));
			
			$E.on(editArea, 'drop', J.bind(this.onEditAreaDrop, this));
			$E.on(editArea, 'paste', J.bind(this.onEditAreaPaste, this));
			$E.on(editArea, 'keydown', J.bind(this.onEditAreaKeydown, this));
			//onEditAreaPasteTxt
			$E.addObserver(EQQ, "notInstalledScreenCapture", this.onEditAreaPasteTxt);
			$E.addObserver(EQQ, "noClipBoadImage", this.onEditAreaPasteTxt);
		},
		
		initStyle : function() {
			var setting = this.getCookieStyles();
			var editArea = this.editArea;
			if (setting) {
				var styles = setting.split('|'), i = 0;
				$D.setStyle(editArea, 'fontFamily', styles[i++]);
				$D.setStyle(editArea, 'fontSize', styles[i++]);
				$D.setStyle(editArea, 'fontWeight', styles[i++]);
				$D.setStyle(editArea, 'fontStyle', styles[i++]);
				$D.setStyle(editArea, 'textDecoration', styles[i++]);
				$D.setStyle(editArea, 'color', styles[i++]);
			} else {
				$D.setStyle(editArea, 'fontFamily', '宋体');
				$D.setStyle(editArea, 'fontSize', '10pt');
				$D.setStyle(editArea, 'fontWeight', 'normal');
				$D.setStyle(editArea, 'fontStyle', 'normal');
				$D.setStyle(editArea, 'textDecoration', 'none');
				$D.setStyle(editArea, 'color', '#000000');
			}
		},
		
		initToolbar : function(element) {
			this.toolbar = element;
			var toolbarId = this.toolbar.id;

			this.family = $D.id(toolbarId + '_fontFamily');
			this.size = $D.id(toolbarId + '_fontSize');
			this.bold = $D.id(toolbarId + '_bold');
			this.italic = $D.id(toolbarId + '_italic');
			this.underline = $D.id(toolbarId + '_underline');
			this.color = $D.id(toolbarId + '_color');
			this.colorPanel = $D.id(toolbarId + '_colorPanel');

			// 加载样式
			this.loadStyle(this.getAllStyles());

			$E.on(this.family,'mousedown',stopPropagation);
			$E.on(this.family,'click',stopPropagation);
			$E.on(this.size,'mousedown',stopPropagation);
			$E.on(this.size,'click',stopPropagation);
					
			$E.on(this.toolbar, 'click', J.bind(this.onToolbarClick,this));
			
			$E.on(this.family, 'change', J.bind(this.onFontFamilyButtonChange,this.family,this));
			$E.on(this.size, 'change', J.bind(this.onFontSizeButtonChange,this.size,this));
			
			$E.on(this.bold, 'click', J.bind(this.onBoldButtonClick,this.bold,this));
			$E.on(this.italic, 'click', J.bind(this.onItalicButtonClick,this.italic,this));
			$E.on(this.underline, 'click', J.bind(this.onUnderlineButtonClick,this.underline,this));
			
			$E.on(this.color, 'click', J.bind(this.onColorButtonClick,this.color,this));
			$E.on(this.colorPanel, 'click', J.bind(this.onColorPanelClick,this));
			
			$E.addObserver(EQQ.View.ChatBox, "DesktopClick",J.bind(this.onDesktopClick,this));


		},
		clearHtml : function(htmltext) {
			var deleteNextBr = false;
			// 去掉html注释<!-- -->
			var text = htmltext.replace(/<!-{2,}[\s\S]*?-{2,}>/g, '');
			text = text.replace(/<([^>]+).*?>/ig, function(word, u) {
						var tag = u.split(' ')[0].toLowerCase();
						switch (tag) {
							// case 'p' :
							// return '&nbsp;';
							case '/p' :
								return '<br>';
							case 'br' :
								if (deleteNextBr) {
									deleteNextBr = false;
									return '';
								}
								return word;
							case 'img' :
								deleteNextBr = true;
								if (word.toLowerCase().indexOf('mark') > 0)
									return word;
								else
									return '';
							default :
								return '';
						}
					});
			text = text.replace(/\n/g, ''); // 去掉文本换行
			return text;
		},
		getSelection : function() {
			return (window.getSelection)
					? window.getSelection()
					: document.selection;
		},

		getRange : function() {
			var selection = this.getSelection();
			if (!selection) {
				return null;
			}
			try {
				var range = selection.createRange
						? selection.createRange()
						: selection.getRangeAt(0);
				var rangeParent = null;
				var editArea = this.editArea;
				if (range.commonAncestorContainer) {
					rangeParent = range.commonAncestorContainer;
				} else if (range.parentElement) {
					rangeParent = range.parentElement();
				}
				if (rangeParent
						&& (rangeParent == editArea
								|| rangeParent.parentNode == editArea || rangeParent.parentNode.parentNode == editArea)) {

					return range;
				} else {
					return null;
				}
			} catch (e) {
				return null;
			}
		},
		simpleSaveRange:function(){
			var selection = this.getSelection();
			this.lastRange = selection.createRange
						? selection.createRange()
						: selection.getRangeAt(0);
			if(this.lastRange.getBookmark){
				this.lastBookmark =this.lastRange.getBookmark();
			}
		},
		saveRange : function() {
			var range = this.getRange();
			if (!range)
				return;
			this.lastRange = range;
		},

		
		setHtml : function(html) {
			this.editArea.innerHTML = html;
		},
		getHtml : function() {
			return this.editArea.innerHTML;
		},
		getText : function() {
			this.saveContent();
			return this.textArea.value;
		},

		saveContent : function() {
			var textArea = this.textArea;
			if (textArea) {
				var content = this.getHtml();
				textArea.value = content;
				content = textArea.value;
				if ($B.opera) { // Fix opera
					content = content.replace(/<([^>]+).*?>/ig, function(word,u) {
								var tag = u.split(' ')[0].toLowerCase();
								switch (tag) {
									case 'br' :
										return '';
									case 'p' :
										return '';
									case '/p' :
										return '<br>';
									default :
										return word;
								}
							});
				}
				content = content.replace(// 先判断img标签,然后替换以兼容IE
						/<img\s+.*?mark="(.+?)".*?\/?>/ig, '$1').replace(
						/<div>/ig, '\n').replace(/<br>/ig, '\n').replace(
						/&nbsp;/g, ' ').replace(/(\s*$)/g, '')// 去掉后面(右边)的空格
				;
				content = content.replace(/<([^>]+).*?>/ig, '');
				content = content.replace(/&amp;/ig, '&')
						.replace(/&lt;/ig, '<').replace(/&gt;/ig, '>');
				textArea.value = content;
			}
		},

		
		setStyle : function(name, value) {
			$D.setStyle(this.editArea, name, value);
			// 聚焦
			this.focus(true);
			var self = this;
			setTimeout(function() {
						self.setCookieStyle(self.getAllStyles());
					}, 0);
		},
		
		setCookieStyle : function(styles) {

			J.cookie.set('font_format',encodeURIComponent(styles),'qq.com','/',365*24);

		},

		getCookieStyles : function() {
			var cookieSetting=J.cookie.get('font_format');
			if (!!cookieSetting) {
				return decodeURIComponent(cookieSetting);
			} else {
				return "";
			}
		},

		

		loadStyle : function(styles) {
			var styles = styles.split('|');
			this.family.value = styles[0];// .toUpperCase();
			this.size.value = styles[1].match(/\d+/)[0];
			if (styles[2] == 'bold') {
				$D.addClass(this.bold, 'selected');
			}
			if (styles[3] == 'italic') {
				$D.addClass(this.italic, 'selected');
			}
			if (styles[4] == 'underline') {
				$D.addClass(this.underline, 'selected');
			}
		},

		// == Editor 的事件处理 ==========================================================================
		// ------------------------------------------------------------------------------------------------------------

		onEditAreaMousedown : function(e){
			e.stopPropagation();
			this.chatbox.setCurrentWithoutFocus();
		},
	
		onEditAreaClick : function(e){
			this.simpleSaveRange();
		},
		
		onEditAreaKeyup : function(e){
			this.simpleSaveRange();
			
		},
		onEditAreaKeydown : function(e) {
			//if(((top.window.QQWebIME || 0).keyNum || 0)!==0){
			J.out("editor_key: "+e.keyCode+", keyNum: "+((top.window.QQWebIME || 0).keyNum || 0));
			
			if (e.keyCode == 8 && $B.ie ) {
				
				var selection = document.selection;
				if (selection.type.toLowerCase() === 'control') {
					e.preventDefault();
					var range = selection.createRange();
					range.execCommand('Delete', false, null);
					range = selection.createRange();
					range.select();
				} /*else {
					var range = selection.createRange();
					range.moveStart("character", -1);
					range.select();
					if (range.htmlText != '') {
						range
								.execCommand('Delete', false,
										null);
					} else {
						range.moveStart("character", 1);
					}
					range.select();
				}*/
			}
			 
		},
		//Yukin
		onEditAreaPaste : function(e) {  
			var self = this;
			setTimeout(function() {
						var html = self.clearHtml(self.getHtml());
						self.setHtml('');
						self.insertHtml(html);
						if (self.getHtml() == '' && !$B.ie)
							self.setHtml('<br/>');
						self.focus();
					}, 0);
			//提交给截屏控件处理，如果有图片，会阻止事件，只粘贴图片
			if( J.browser.ie || J.browser.firefox ){
				 $E.notifyObservers(EQQ.View.ChatBox, "runScreenCapture",{mode:'paste', uin: this.chatbox.uin, chatBoxType: this.chatbox.chatBoxType,e:e});
 			}
 		},
		 
		onEditAreaDrop : function(e) {
			var self = this;
			setTimeout(function() {
						var html = self.clearHtml(self.getHtml());
						self.setHtml('');
						self.insertHtml(html);
						if (self.getHtml() == '' && !$B.ie)
							self.setHtml('<br/>');
						self.focus();
					}, 0);
			 
		},
		onFontFamilyButtonChange: function(self,e) {
			e.stopPropagation();
//			this.blur();
			self.setStyle('fontFamily', this.value);
		},
		onFontSizeButtonChange: function(self,e) {
			e.stopPropagation();
//			this.blur();
			self.setStyle('fontSize', this.value + 'pt');
			
		},
		onBoldButtonClick: function(self,e) {
			e.stopPropagation();
			if ($D.hasClass(this, 'selected')) {
				self.setStyle('fontWeight', 'normal');
				$D.removeClass(this, 'selected');
			} else {
				self.setStyle('fontWeight', 'bold');
				$D.addClass(this, 'selected');
			}

		},
		onItalicButtonClick: function(self,e) {
			e.stopPropagation();
			if ($D.hasClass(this, 'selected')) {
				self.setStyle('fontStyle', 'normal');
				$D.removeClass(this, 'selected');
			} else {
				self.setStyle('fontStyle', 'italic');
				$D.addClass(this, 'selected');
			}

		},
		onUnderlineButtonClick: function(self,e) {
			e.stopPropagation();
			if ($D.hasClass(this, 'selected')) {
				self.setStyle('textDecoration', 'none');
				$D.removeClass(this, 'selected');
			} else {
				self.setStyle('textDecoration', 'underline');
				$D.addClass(this, 'selected');
			}

		},
		onColorButtonClick: function(self,e) {
			e.stopPropagation();
			
			if($D.isShow(self.colorPanel)){
				$D.hide(self.colorPanel);
				$D.removeClass(this, 'selected');
			}else{
				$D.show(self.colorPanel);
				$D.addClass(this, 'selected');
			}

		},
		onColorPanelClick: function(e) {
			e.stopPropagation();
			var target = e.target;
			var btn = null;
			// 判断是否是颜色按钮
			if(target.tagName.toLowerCase() === 'span'){
				btn = target;
			}else if(target.tagName.toLowerCase() === 'a'){
				btn = target.firstChild;
			}
			if(!!btn){
				var c = $D.getStyle(btn,'backgroundColor');
				this.setStyle('color',c);
				$D.hide(this.colorPanel);
				$D.removeClass(this.color, 'selected');
			}
			
		},
		onDesktopClick: function(e){
			$D.hide(this.colorPanel);
			$D.removeClass(this.color, 'selected');
		},
		onToolbarClick: function(e){
			e.stopPropagation();
			this.focus(true);
		}
		

	});
});
/* == EQQ 主面板presenter层 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2009.11.17 ----- */


Jet().$package("EQQ.Presenter.MainPanel", function(J){
	var packageContext = this,
		$D = J.dom,
		$E = J.event;
		
	var toggleFlag = false;
	var flickerUins=[],
		looksFlickerUins = [],
		flickerClassIds = [],
		flickerGids=[],
		oldMode = "";


	var isBuddyListReady = false;

	
	var isAllClassOnlineBuddyReadyFirst = false;

	
	// 初始化
	this.init = function(){
		
		this.View = EQQ.View.MainPanel;
		this.View.createDom(this.getContainer());
		//this.View.createMyPanelDom(this.getMyPanelContainer());
		
		// 对EQQ事件总线的观察者
		$E.addObserver(EQQ, "CloseWebQQ", J.bind(this.onCloseWebQQ,this));
		$E.addObserver(EQQ, "SelfOffline", J.bind(this.onSelfOffline,this));
		
		
		// 对BuddyList事件总线的观察者
		$E.addObserver(EQQ.Model.BuddyList, "SelfInfoChange", J.bind(this.onSelfInfoChange,this));
		$E.addObserver(EQQ.Model.BuddyList, "SelfStateChange", J.bind(this.updateSelfStateChange,this));
		$E.addObserver(EQQ.Model.BuddyList, "SelfSignatureChange", J.bind(this.handleSelfSignatureChange,this));
		$E.addObserver(EQQ.Model.BuddyList, "BuddyClassChange", J.bind(this.onBuddyClassChange,this));
		$E.addObserver(EQQ.Model.BuddyList, "BuddyListChange", J.bind(this.onBuddyListChange,this));
		$E.addObserver(EQQ.Model.BuddyList, "LoginFail", J.bind(this.onLoginFail,this));
		$E.addObserver(EQQ.Model.BuddyList, "GetUserInfoSuccess", J.bind(this.onGetUserInfoSuccess,this));
		$E.addObserver(EQQ.Model.BuddyList, "BuddyStateChange", J.bind(this.onBuddyStateChange,this));
		$E.addObserver(EQQ.Model.BuddyList, "OnlineBuddyChange", J.bind(this.onOnlineBuddyChange,this));
		$E.addObserver(EQQ.Model.BuddyList, "AllClassOnlineBuddyReady", J.bind(this.onAllClassOnlineBuddyReady,this));
		
		//添加好友观察者 TODO
		$E.addObserver(packageContext, "AddANewBuddy", J.bind(this.onAddANewBuddy,this));
		
		$E.addObserver(EQQ.Model.BuddyList, "GroupListChange", J.bind(this.onGroupListChange,this));
		$E.addObserver(EQQ.Model.BuddyList, "UserNameChange", J.bind(this.onUserNameChange,this));
		$E.addObserver(EQQ.Model.BuddyList, "GroupMaskChange", J.bind(this.onGroupMaskChange,this));
		$E.addObserver(EQQ.Model.BuddyList, "SingleGroupMaskChange", J.bind(this.onSingleGroupMaskChange,this));
		$E.addObserver(EQQ.Model.BuddyList, "RecentListChange", J.bind(this.onRecentListChange,this));

		
		// 对ChatMsg事件总线的观察者
		$E.addObserver(EQQ.Model.ChatMsg, "NewStranger", J.bind(this.onNewStranger,this));
		$E.addObserver(EQQ.Model.ChatMsg, "MessageBoxUserListChange", J.bind(this.onMessageBoxUserListChange,this));
		$E.addObserver(EQQ.Model.ChatMsg, "MessageBoxGroupListChange", J.bind(this.onMessageBoxGroupListChange,this));
		//监听消息
		$E.addObserver(EQQ.Model.ChatMsg, "MessageListChange", J.bind(this.onMessageListChange,this));
		//监听消息
		$E.addObserver(EQQ.Model.ChatMsg, "GroupMessageListChange", J.bind(this.onGroupMessageListChange,this));
		
		// 对MainPanel视图层事件总线的观察者
		$E.addObserver(this.View, "StartChat", onStartChat);
		$E.addObserver(this.View, "StartGroupChat", onStartGroupChat);
		$E.addObserver(this.View, "SelfStateChange", J.bind(this.onViewSelfStateChange,this));
		$E.addObserver(this.View, "SetGroupMaskState", onViewGroupMaskStateChange);
		// 来自view的点击退出portal的事件
		$E.addObserver(this.View, "ExitPortal", J.bind(this.onExitPortal,this));
		// 来自view的关闭qq事件
		$E.addObserver(this.View, "CloseWebQQ", J.bind(onViewCloseWebQQ,this));
		$E.addObserver(this.View, "MinMainPanel", J.bind(onViewMinMainPanel,this));
		$E.addObserver(this.View, "ReLogin", J.bind(onViewReLogin,this));

		
		$E.addObserver(this.View, "Search", J.bind(this.onSearch,this));
		$E.addObserver(this.View, "BuddyListReady", J.bind(this.onBuddyListDomReady,this));
		$E.addObserver(this.View, "CloseYellowTipsFinish",J.bind(this.onCloseYellowTipsFinish,this));
		//$E.addObserver(this.View, "PinUpButtonClick",J.bind(this.onPinUpButtonClick,this));
		
		$E.addObserver(this.View, "MiniCardShow", onMiniCardShow);

		this.View.init();
	};
	
	this.getContainer = function(){
		return EQQ.panel.mainPanel;
	};
	
	this.getMyPanelContainer = function(){
		return EQQ.panel.myPanel;
	};
	var onUserSignatureChange = function(user){
		if(packageContext.View.miniCardPanel){
			J.out("onUserSignatureChange 33:"+user.uin);
			packageContext.View.miniCardPanel.setSignature(user);
		}
		
	};
	
	var onUserQQLevelChange = function(user){
		if(packageContext.View.miniCardPanel){
			J.out("onUserQQLevelChange 33:"+user.uin);
			packageContext.View.miniCardPanel.setQQLevel(user);
		}
		
	};
	var onMiniCardShow = function(user){
		
		// 是好友才能去拉取签名，否则没有权限
		if(user){
			if(J.isUndefined(user.signature)){
				J.out("addObserver:"+user.uin);
				$E.addObserver(EQQ.Model.BuddyList, "UserSignatureChange", onUserSignatureChange);
				
				//获取聊天窗口的签名
				EQQ.Model.BuddyList.getUserSignature(user.uin);
			}else{
				packageContext.View.miniCardPanel.setSignature(user);
			}
			if(J.isUndefined(user.level)){
				J.out("addObserver UserQQLevelChange:"+user.uin);
				$E.addObserver(EQQ.Model.BuddyList, "UserQQLevelChange", onUserQQLevelChange);
				//获取聊天窗口的签名
				EQQ.Model.BuddyList.sendGetQQLevel(user.uin);
			}else{
				packageContext.View.miniCardPanel.setQQLevel(user);
			}
		}
	};
	

	
	this.showYellowTips = function(){
		this.View.showYellowTips();
	};
	this.hideYellowTips = function(){
		this.View.hideYellowTips();
	};
	this.onCloseYellowTipsFinish = function(){
		this.setCookieTips("hide");
	};
	this.getCookieTips = function(){
		return J.cookie.get("is_close_tips", EQQ.CONST.MAIN_DOMAIN);
	};
	this.setCookieTips = function(flag){
		J.cookie.set("is_close_tips", flag, EQQ.CONST.MAIN_DOMAIN, null, 120);
	};
	this.onSearch = function(keyword){
		keyword = String(keyword).toLowerCase();
		
		var buddyList = EQQ.Model.BuddyList.getBuddyList();
		
		var searchResult = [];
		if(keyword.length > 0){
			for(var i=0; i<buddyList.length; i++){
				var buddy = buddyList[i];
				
				if(String(buddy.uin).indexOf(keyword) > -1
					|| (String(buddy.nick).toLowerCase().indexOf(keyword) > -1 && String(buddy.nick) != "undefined")
					|| (String(buddy.markName).toLowerCase().indexOf(keyword) > -1 && String(buddy.markName)!="undefined")
					){

					searchResult.push(buddy);
				}
				if(searchResult.length >= 5){
					break;
				}
			}
		}
		this.View.showSearchResult(searchResult);
		
	};
	
	this.showMiniCardPanel = function(uin, xy){
		this.View.showMiniCardPanel(uin, xy);
	
	};
	this.hideMiniCardPanel = function(){
		this.View.hideMiniCardPanel();
	
	};
	//登录失败
	this.onLoginFail = function(){
		alert("登录失败，请稍后重试");
	};
	// 当自己的资料得到更新时
	this.onSelfInfoChange = function(user){
		this.View.updateSelfInfoChange(user);
		
	};
	// 当自己的在线状态得到更新时
	this.updateSelfStateChange = function(state){
		this.View.updateSelfStateChange(state);
	};
	// 当自己的签名得到更新时
	this.handleSelfSignatureChange = function(user){
		this.View.updateSelfSignatureChange(user);
	};
	
	this.onSelfOffline = function(message){

		var self = EQQ.Model.BuddyList.getSelf();

		isAllClassOnlineBuddyReadyFirst = false;
		isBuddyListReady = false;
		EQQ.stopPoll();

		if(self){
			self.state="offline";
		}

		this.updateSelfStateChange("offline");
		

		
		
		qqweb.portal.alert(message);
	}
	
	
	// 当好友分组得到更新时
	this.onBuddyClassChange = function(classList){
		this.clearBuddyList();
		this.View.createBuddyClass(classList);
		// 隐藏登录中的view
		this.View.hideLogin();
	};
	
	this.onAllClassOnlineBuddyReady = function(){
		if(!isAllClassOnlineBuddyReadyFirst){
			isAllClassOnlineBuddyReadyFirst = true;
			this.onBuddyClassListReady();
		}
	};
	
	this.onBuddyClassListReady = function(){
		// mainBar 设置为上线状态
		EQQ.Presenter.MainBar.setToOnline();
		// 隐藏登录中的view
		//this.View.hideLogin();
		
		//登录时间上报
		EQQ.loginEnd = (new Date()).getTime();
		var time = EQQ.loginEnd - EQQ.loginStart;
		time = time/1000;
		J.out("time: "+time);
		//一秒上报
		if(time<=1){
			//EQQ.report(64834);
		//5秒上报
		}else if(time<=5){
			//EQQ.report(64835);
		//10秒上报
		}else if(time<=10){
			//EQQ.report(64836);
		//60秒上报
		}else if(time<=60){
			//EQQ.report(64837);
		//大于60秒上报
		}else{
			//EQQ.report(64833);
		}
		
	};
	
	this.onBuddyListDomReady = function(){

	};
	

	// 当好友列表得到更新时
	this.onBuddyListChange = function(buddyList){
		if(isBuddyListReady){
			
		}else{
			isBuddyListReady = true;
			this.updateAllBuddyClassCount(EQQ.Model.BuddyList.getClassList());
			this.createBuddyList(buddyList);
		}
	};
	
	
	// 当好友列表得到更新时
	this.onGroupListChange = function(groupList){

		this.View.createGroupList(groupList);

	};
	
	//添加好友
	this.onAddANewBuddy= function(data) {
		var _this = this;
		var user= data.user;
		var newstate= data.newstate;
		this.View.addBuddy(user);
		var classId= user.classId;
		//调用BuddyList
		var classObj= EQQ.Model.BuddyList.getClassById(classId);
		classObj.count= classObj.count+1;
		this.View.updateBuddyClassCount(classObj);
		//修改备注名 setMarkName getBuddyByUin EQQ.Model.BuddyList
		if(data.markname) {
			var buddy = EQQ.Model.BuddyList.getBuddyByUin(user.uin);
			buddy.setMarkName(data.markname);
		}
		setTimeout(function() {
			_this.View.loadAvatar(user.uin);
		},13);
		//好友状态改变
		//也许应该放在View层？
		$E.notifyObservers(EQQ.Model.BuddyList, "BuddyStatusChange", newstate);
	};
	
	this.onRecentListChange = function(recentList){
		for(var i=0;i<recentList.length;i++){
			//0:好友 1:群
			if(recentList[i].type==0){
				recentList[i].content=EQQ.Model.BuddyList.getBuddyByUin(recentList[i].uin);
			}else{
				recentList[i].content=EQQ.Model.BuddyList.getGroupByGid(recentList[i].uin);
			}
		}
		this.View.createRecentList(recentList);
	};
	
	// 当好友列表得到更新时
	this.onUserNameChange = function(user){

		this.View.setUserName(user);

	};
	// 群屏蔽设置
	this.onGroupMaskChange = function(state){
		var groupList=EQQ.Model.BuddyList.getGroupList();
		for(var i=0;i<groupList.length;i++){
			var group=groupList[i];
			var isGroupPrompt=EQQ.Model.BuddyList.isGroupPrompt(group.gid);
			this.View.setGroupListMaskState(group.gid,isGroupPrompt);
		}
		this.View.setGroupMask(state);
	};
	//群单独设置通知
	this.onSingleGroupMaskChange = function(group){
		var isGroupPrompt=EQQ.Model.BuddyList.isGroupPrompt(group.gid);
		this.View.setGroupListMaskState(group.gid,isGroupPrompt);
	}

	// 当用户info得到更新时
	this.onGetUserInfoSuccess = function(user){
		J.console.info(user);

	};
	
	// 当陌生人列表得到更新时
	this.onNewStranger = function(user){
		var strangerList = EQQ.Model.BuddyList.getStrangerList();

		var onlineCount = strangerList.length;

		this.View.updateStrangerClassOnlineCount(onlineCount);

		this.View.updateStrangerClassCount(strangerList);

		this.View.addBuddy(user);


	};
	
	
	
	// 更新各个分组好友数目
	this.updateAllBuddyClassCount = function(classList){
		for(var i=0; i<classList.length; i++){
			this.updateBuddyClassCount(classList[i]);
		}
	}
	this.updateBuddyClassCount = function(classObj){
		this.View.updateBuddyClassCount(classObj);
	}
	// 当第一次打开好友列表时
	this.createBuddyList = function(buddyList){
		this.View.createBuddyList(buddyList);
	};
	this.updateRecentByBuddy=function(recent){
		this.View.updateRecentByBuddy(recent);
	};
	this.updateRecentByGroup=function(recent){
		this.View.updateRecentByGroup(recent);
	};

	
	// 好友在线状态改变回调
	this.onBuddyStateChange = function(uin){
		var buddy = EQQ.Model.BuddyList.getUserByUin(uin);
		this.View.moveBuddy(buddy);
		this.View.moveOnlineBuddy(buddy);
		this.View.updateClientType(buddy);
		this.View.updateRecentState(buddy);
		//minicard是在用户触发才会加载的，所以这里应该另作处理
		if(this.View.miniCardPanel){
			this.View.miniCardPanel.setClientType(buddy);
		}
		
	};
	
	// 好友在线状态改变回调
	this.onOnlineBuddyChange = function(uin){
		var buddy = EQQ.Model.BuddyList.getUserByUin(uin);
		var buddyClass = EQQ.Model.BuddyList.getClassByUin(uin);
		var offlineStatus = EQQ.hash.onlineStatus.offline;
		var onlineBuddy = EQQ.Model.BuddyList.getOnlineBuddy();
		
		this.View.updateBuddyClassOnlineBuddy(buddyClass);
		this.updateAllBuddyClassCount(EQQ.Model.BuddyList.getClassList());
		
		this.View.updateOnlineBuddyClass(onlineBuddy);
		
		if(buddy.state == offlineStatus){
			this.View.removeOnlineBuddy(buddy);
		}else{
			this.View.addOnlineBuddy(buddy);
		}

	}
	

	
	
	
	
	this.onMessageBoxUserListChange = function(messageBoxUserList){
		var self = EQQ.Model.BuddyList.getSelf();
		var currentUin = EQQ.Presenter.TaskBar.getCurrentTaskUin();
		this.View.jumpDown(looksFlickerUins);
		this.View.flickerClassShow(flickerClassIds);

		flickerUins = [];			
		looksFlickerUins = [];
		flickerClassIds = [];

		for(var i=0; i<messageBoxUserList.length; i++){
			if(currentUin != messageBoxUserList[i].from_uin){
				flickerUins.push(messageBoxUserList[i].from_uin);
				if(EQQ.Model.BuddyList.getSelfState()=="callme"){
					onStartChat(messageBoxUserList[i].from_uin);
				}
			}
		}
		if(flickerUins.length !== 0){
			EQQ.addNeedBeat2("mainPanel");
			$E.addObserver(EQQ, "NotifyBeat_250", onNotifyBeat_250);
			
		}
		//J.out("mainpanel我闪闪闪："+flickerUins);
	};
	
	
	this.onMessageBoxGroupListChange = function(messageBoxGroupList){
		var self = EQQ.Model.BuddyList.getSelf();
		var currentGid = EQQ.Presenter.TaskBar.getCurrentTaskUin();
		this.View.jumpDown(flickerGids);

		
		flickerGids = [];


		for(var i=0; i<messageBoxGroupList.length; i++){
			if(currentGid != messageBoxGroupList[i].from_uin&&EQQ.Model.BuddyList.isGroupPrompt(messageBoxGroupList[i].from_uin)){
				flickerGids.push(messageBoxGroupList[i].from_uin);
			}
			if(EQQ.Model.BuddyList.getSelfState()=="callme"&&EQQ.Model.BuddyList.isGroupPrompt(messageBoxGroupList[i].from_uin)){
				onStartGroupChat(messageBoxGroupList[i].group_code);
			}
		}

		if(flickerGids.length !== 0){
			EQQ.addNeedBeat2("mainPanel");
			$E.addObserver(EQQ, "NotifyBeat_250", onNotifyBeat_250);
			
		}
		//J.out("mainpanel我闪闪闪："+flickerGids);
	};
	this.onMessageListChange = function(option){
		var recent=EQQ.Model.BuddyList.getBuddyByUin(option.uin);
		if(recent){
			this.View.updateRecentByBuddy(recent);
		}
	};
	this.onGroupMessageListChange= function(option){
		var recent=EQQ.Model.BuddyList.getGroupByGid(option.gid);
		if(recent){
			this.View.updateRecentByGroup(recent);
		}
	};
	
	
	
	var onViewGroupMaskStateChange = function(state){
		EQQ.Model.BuddyList.sendChangeGroupMask({type:'global', uin:EQQ.Model.BuddyList.getSelfUin(),mask:state});
	};
	var onStartChat = function(uin){
		// 发起聊天
		EQQ.Presenter.ChatBox.chatWithUser(uin,"show");
	};
	
	var onStartGroupChat = function(code){
		// 发起群聊天
		EQQ.Presenter.ChatBox.chatWithGroup(code,"show");
	};
	
	

	
	this.collapsedAllClass = function(){
		var classList = EQQ.Model.BuddyList.getClassList();
		for(var i=0; i<classList.length; i++){
			this.View.collapsedClass(classList[i].index);
		}
	};
	
	var onViewCloseWebQQ = function(){
		EQQ.exit();
	};
	
	var onViewMinMainPanel = function(){
		this.hide();
	};
	
	var onViewReLogin = function(){
		EQQ.login();
	}
	
	// 退出portal
	this.onExitPortal = function(){
		qqweb.portal.exit();
	};
	
	this.onCloseWebQQ = function(){

		isAllClassOnlineBuddyReadyFirst = false;
		isBuddyListReady = false;
		
		this.hide();
		this.View.showLogin();
		
		EQQ.Presenter.MainBar.setToCloseWebQQ();
	};
	
	this.clearBuddyList = function(){
		this.View.clearBuddyList();
	}

	
	this.showLogin = function(){
		this.View.showLogin();
	}
	
	// 显示主面板
	this.show = function(){
		toggleFlag = true;
		this.View.show();

		EQQ.Presenter.MainBar.setStartButtonDown();

		
		
	};
	// 隐藏主面板
	this.hide = function(){
		toggleFlag = false;
		this.View.hide();
		EQQ.Presenter.MainBar.setStartButtonUp();
		
	};
	// 切换主面板的现实、隐藏
	this.toggleShow = function(){
		if(toggleFlag){
			this.hide();
		}else{
			this.show();
		}
		
	};
	
	
	this.showReLoginPanel = function(){
		this.View.showReLoginPanel();
	}
	
	
	
	// 头像跳动
	var onNotifyBeat_250 = function(){
		looksFlickerUins = [];
		flickerClassIds = [];
	 
		
		var flickerRecents = flickerUins.concat(flickerGids);
		
		if(flickerRecents.length === 0){
			$E.removeObserver(EQQ, "NotifyBeat_250", onNotifyBeat_250);
			EQQ.removeNeedBeat2("mainPanel");
		}
		
		for(var i=0; i<flickerUins.length; i++){
			var uin = flickerUins[i];
			var classId = EQQ.Model.BuddyList.getClassIdByUin(uin);
			
			// 如果此好友所在分组已经展开了
			if(packageContext.View.getClassExpandFlag(classId)){
				looksFlickerUins.push(uin);
				
			// 如果此好友所在分组没有展开，就闪其分组名
			}else if(J.array.indexOf(flickerClassIds, classId) == -1){
				flickerClassIds.push(classId);
			}
			//最近联系人数组
		}
		
		if(looksFlickerUins.length>0){
			packageContext.View.jumpAvatar(looksFlickerUins);
		}
		if(flickerClassIds.length>0){
			packageContext.View.flickerClass(flickerClassIds);
		}
		if(flickerGids.length>0){
			packageContext.View.groupJumpAvatar(flickerGids);
		}
		if(flickerRecents.length>0){
			packageContext.View.recentJumpAvatar(flickerRecents);
		}
	};

	this.onViewSelfStateChange = function(state){
		var oldState = "offline";
		var self = EQQ.Model.BuddyList.getSelf();
		if(self){
			oldState = self.state;
			self.state = state;
		}
		J.out("==onViewSelfStateChange, self: "+state+", old: "+oldState);

		if(oldState == "offline" && state != "offline"){
			self.state = state;
			EQQ.login(state);
		}else{
			EQQ.Model.BuddyList.sendChangeStatus(state);
		}

		if(state == "offline"){

			isAllClassOnlineBuddyReadyFirst = false;
			isBuddyListReady = false;
			EQQ.stopPoll();
		}
		
		if(state == "callme"){
			//EQQ.Model.ChatMsg.setMessageSummary(EQQ.Model.ChatMsg.getMessageSummary());
		}
		
		
		
	};
	

});


		/* == EQQ 主控条presenter层 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2009.11.17 ----- */
 
 
// 呈献层：主控栏
Jet().$package("EQQ.Presenter.MainBar", function(J){
	var packageContext = this,
		$E = J.event;
		
	var flickerUin;
	
	var onlineBuddyCount;
	
	var allMsgCount;
	
	this.init = function(){
		this.View = EQQ.View.MainBar;
		this.View.createDom(this.getContainer());
		
		$E.addObserver(EQQ.Model.BuddyList, "AllOnlineBuddyReady", J.bind(onAllOnlineBuddyReady,this));
		
		$E.addObserver(this.View, "ClickStart", J.bind(this.onClickStart,this));
		$E.addObserver(this.View, "ReadLastMsg", J.bind(this.handleReadLastMsg,this));
		$E.addObserver(this.View, "ShowMsgBox", J.bind(this.handleShowMsgBox,this));
		$E.addObserver(this.View, "HideMsgBox", J.bind(this.handleHideMsgBox,this));
		
		
		
		this.View.init();
		
		
	};
	this.getContainer = function(){
		return EQQ.panel.mainBar;
	};
	var onAllOnlineBuddyReady = function(onlineBuddy){
		var count = onlineBuddy.length;
		
		if(onlineBuddyCount != count){
			onlineBuddyCount = count;
			this.View.updateOnlineBuddy(onlineBuddyCount);
		}
		
	};
	
	this.show = function(){
		//this.View.show();
	};
	this.hide = function(){
		this.View.hide();
	};
	
	this.showStartButton = function(){
		this.View.showStartButton();
	};
	this.showMsgBoxButton = function(){
		this.View.showMsgBoxButton();
		
	};
	
	this.setStartButtonUp = function(){
		this.View.setStartButtonUp();
	};
	this.setStartButtonDown = function(){
		this.View.setStartButtonDown();
	};
	
	this.setFlickerUin = function(uin){
		if(uin){
			flickerUin = uin;
			
			EQQ.addNeedBeat2("mainBar");
			$E.addObserver(EQQ, "NotifyBeat_250", onNotifyBeat_250);
		}else{
			this.View.jumpDown(flickerUin);
			flickerUin = null;
		}
	};
	
	this.setAllMsgCount = function(count){
		allMsgCount = count;
		this.View.setAllMsgCount(allMsgCount);
	};
	
	this.setToOffline = function(){
		this.View.setToOffline();
	}
	
	this.setToOnline = function(){
		this.View.setToOnline();
	}
	this.setToCloseWebQQ = function(){
		this.View.setToCloseWebQQ();
	}
	
	this.onClickStart = function(){
		/*
		if(EQQ.getIsLogin()){
			EQQ.Presenter.MainPanel.toggleShow();
		}else{
			EQQ.checkProtect();
		}*/
		
		EQQ.Presenter.MainPanel.toggleShow();
		
	};
	this.handleReadLastMsg = function(){
		EQQ.Presenter.MsgBox.onReadMsg(flickerUin);
	};
	this.handleShowMsgBox = function(){
		EQQ.Presenter.MsgBox.showMsgBox();
	};
	this.handleHideMsgBox = function(){
		EQQ.Presenter.MsgBox.hideMsgBox();
	};
	
	
	
	var onNotifyBeat_250 = function(){
		if(flickerUin && EQQ.Model.BuddyList.getUserByUin(flickerUin)){
			packageContext.View.jumpAvatar(flickerUin);
		}else{
			$E.removeObserver(EQQ, "NotifyBeat_250", onNotifyBeat_250);
			EQQ.removeNeedBeat2("mainBar");
		}
	};
	
	
	

});


		/* == EQQ 消息盒子的presenter层 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2009.11.17 ----- */
 
 
// 呈献层：消息盒子
Jet().$package("EQQ.Presenter.MsgBox", function(J){
	var $E = J.event;
	var tempUins = [1146060008,99999];
	var flickerUinInMsgBox;
	var newMsg = [];
	this.init = function(){
		this.View = EQQ.View.MsgBox;
		$E.addObserver(EQQ.Model.ChatMsg, "MessageSummaryChange", J.bind(this.handleMessageSummaryChange,this));
		
		
		
		// 添加忽略消息的观察者
		$E.addObserver(this.View, "IgnoreMsg", J.bind(this.onIgnoreMsg,this));
		// 添加忽略所有消息的观察者
		$E.addObserver(this.View, "IgnoreAllMsg", J.bind(this.onIgnoreAllMsg,this));
		// 添加查看消息的观察者
		$E.addObserver(this.View, "ReadMsg", J.bind(this.onReadMsg,this));
		
		this.View.init();
	};
		
	this.handleMessageSummaryChange = function(msg){
		var self = EQQ.Model.BuddyList.getSelf();
		newMsg = [];
		if(self.state != "callme"){
			
			var chatingUins = EQQ.Presenter.TaskBar.getFacesArray();
			
			for(var i=0;i<msg.length;i++){
				if(J.array.indexOf(chatingUins, msg[i].from_uin) == -1){
					msg[i].showName = EQQ.Model.BuddyList.getUserByUin(msg[i].from_uin).showName;
					msg[i].htmlShowName =  J.string.toHtml(msg[i].showName);
					msg[i].titleShowName =  J.string.toTitle(msg[i].showName);
					newMsg.push(msg[i]);
					//J.out(J.$typeof(chatingUins[0])+" -> "+msg[i].from_uin+" || "+chatingUins.indexOf(msg[i].from_uin));
				}
			}

		}
		
		
		if(newMsg.length === 0){
			flickerUinInMsgBox=null;
			EQQ.Presenter.MainBar.showStartButton();
		}else{
			flickerUinInMsgBox=newMsg[0].from_uin;
			EQQ.Presenter.MainBar.showMsgBoxButton();
		}
		
		var msgCount = 0;
		for(var i=0; i<newMsg.length; i++){
			msgCount += newMsg[i].count;
		}
		
		
		EQQ.Presenter.MainBar.setFlickerUin(flickerUinInMsgBox);
		EQQ.Presenter.MainBar.setAllMsgCount(msgCount);
		this.View.updateMessageSummaryChange(newMsg);
		
		
		
	};
	
	this.onIgnoreMsg = function(uin){
		EQQ.Model.ChatMsg.ignoreMsg(uin);
	};
	this.onIgnoreAllMsg = function(){
		var uins=[];
		for(var i=0; i<newMsg.length; i++){
			uins.push(newMsg[i].from_uin);
		}
		EQQ.Model.ChatMsg.ignoreAllMsg(uins);
	};
	
	this.onReadMsg = function(uin){
		//EQQ.Present.ChatBox.open(uin);
		//触发消息盒子的点击，此时增加头像
		EQQ.Presenter.TaskBar.addChatTask(uin,"show");
	};
	this.showMsgBox = function(){
		this.View.showMsgBox();
	};
	
	this.hideMsgBox = function(){
		this.View.hideMsgBox();
	};
	
	
	

});



		/* == EQQ 聊天框presenter层 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2009.11.17 ----- */
 
 
// 呈献层：...EQQ.Presenter.ChatBox.hideCurrentWin
Jet().$package("EQQ.Presenter.ChatBox", function(J){
	var $E = J.event,
		$D = J.dom;
		
	var packageContext = this,
		mode = "free",
		
		onDesktopChatBoxList = [],
		onDesktopChatBoxCurrent = null,
		
		//判断聊天框是否打开，用于判断：如果已经打开则第一次不用拉取群成员状态信息
		hasGetGroupInfo = false,
		
		
		// 系统表情面板显示状态
		isFacePanelShow = false,
		isNotNeedCtrlKey = false;
		
		
	this.init = function(){
		this.View= EQQ.View.ChatBox;
		
		//$E.notifyObservers(EQQ,"CloseWebQQ");
		$E.addObserver(EQQ, "CloseWebQQ", J.bind(this.onCloseWebQQ,this));
		
		
		//监听设置签名
		$E.addObserver(EQQ.Model.BuddyList, "GroupAnnouncementChange", J.bind(this.onGroupAnnouncementChange,this));

		//监听设置签名
		$E.addObserver(EQQ.Model.BuddyList, "UserSignatureChange", J.bind(this.handleSetChatboxSignature,this));
		//观察状态改变
		$E.addObserver(EQQ.Model.BuddyList, "BuddyStateChange", J.bind(this.onBuddyStateChange,this));

		//监听设置签名
		$E.addObserver(EQQ.Model.BuddyList, "GroupMembersChange", J.bind(this.onGroupMembersChange,this));
		
		// 监听
		$E.addObserver(EQQ.Model.BuddyList, "GroupBuddySessionSignatureChange", J.bind(this.onGroupBuddySessionSignatureChange,this));

		// 监听获取群资料
		$E.addObserver(EQQ.Model.BuddyList, "GroupInfoChange", J.bind(this.onGroupInfoChange,this));
		//观察群屏蔽状态改变事件
		$E.addObserver(EQQ.Model.BuddyList, "SingleGroupMaskChange", J.bind(this.onSingleGroupMaskChange,this));
		
		
		//监听消息
		$E.addObserver(EQQ.Model.ChatMsg, "MessageListChange", J.bind(this.onMessageListChange,this));

		//监听消息
		$E.addObserver(EQQ.Model.ChatMsg, "GroupMessageListChange", J.bind(this.onGroupMessageListChange,this));
		
		//观察消息发送失败
		$E.addObserver(EQQ.Model.ChatMsg, "SendMsgError", J.bind(this.onSendMsgError,this));
		
		
		//观察获取自定义表情的请求
		$E.addObserver(EQQ.Model.ChatMsg, "GetCustomFaceListSuccess", J.bind(this.onGetCustomFaceListSuccess,this));
		
		//观察获取发送图片地址成功的请求
		$E.addObserver(EQQ.Model.ChatMsg, "GetSendPicUrlSuccess", J.bind(this.onGetSendPicUrlSuccess,this));		
		
		//监听申请离线图片失败事件
		$E.addObserver(EQQ.Model.ChatMsg, "getSendPicUrlError", J.bind(this.onSetSendPicUrlError,this));
		
		//监听上传离线图片失败事件		
		$E.addObserver(EQQ.Model.ChatMsg, "uploadSendPicError", J.bind(this.onUploadSendPicError,this));
		
		//监听发送群图片成功事件		 
		$E.addObserver(EQQ.Model.ChatMsg, "getSendPicGroupSuccess", J.bind(this.onGetSendPicGroupSuccess,this));
		//监听发送群图片失败事件		 
		$E.addObserver(EQQ.Model.ChatMsg, "sendPicGroupError", J.bind(this.onSendPicGroupError,this));
		
		
		
		//监听截屏快捷键事件
		$E.addObserver(EQQ.Model.ChatMsg, "runScreenCapture", J.bind(this.onRunScreenCapture,this));
		
		//监听对方取消文件
		$E.addObserver(EQQ.Model.ChatMsg, "fromCancenFile",  this.onFromCancelFile );
		
		 
		//监听ChatBoxCreate
		$E.addObserver(EQQ.View.ChatBox, "ChatBoxAdd", J.bind(this.onChatBoxAdd,this));
		// 打开窗口
		$E.addObserver(EQQ.View.ChatBox, "ChatBoxShow", J.bind(this.onChatBoxShow,this));
		// 监听设为当前
		$E.addObserver(EQQ.View.ChatBox, "ChatBoxSetCurrent", J.bind(this.onSetCurrent,this));
		// 监听设为非当前
		$E.addObserver(EQQ.View.ChatBox, "ChatBoxSetNotCurrent", J.bind(this.onSetNotCurrent,this));
		// 监听删除任务栏头像
		$E.addObserver(EQQ.View.ChatBox, "ChatBoxClose", J.bind(this.onChatBoxClose,this));
		// 窗口最小化2
		$E.addObserver(EQQ.View.ChatBox, "ChatBoxMin", J.bind(this.onChatBoxMin,this));
		//设置
		$E.addObserver(EQQ.View.ChatBox, "AutoAlign", J.bind(this.onAutoAlign,this));

	 
		
		//观察表情按钮点击事件
		$E.addObserver(EQQ.View.ChatBox, "FaceButtonClick", J.bind(onFaceButtonClick,this));
		
		//观察发送图片按钮点击事件
		$E.addObserver(EQQ.View.ChatBox, "SendPicButtonClick", J.bind(onSendPicButtonClick,this));
		
		//观察发送文件按钮点击事件
		$E.addObserver(EQQ.View.ChatBox, "SendFileButtonClick", J.bind(SendFileButtonClick,this));
		
		//观察群屏蔽按钮点击事件
		$E.addObserver(EQQ.View.ChatBox, "MaskButtonClick", J.bind(onMaskButtonClick,this));
		
		//观察群屏蔽设置事件
		$E.addObserver(EQQ.View.ChatBox, "SetSingleGroupMaskState", onSetSingleGroupMaskState);
		
		//观察消息清空按钮
		$E.addObserver(EQQ.View.ChatBox, "ClearChatLog", J.bind(onClearChatLog,this));
		
		//观察按钮
		$E.addObserver(EQQ.View.ChatBox, "ChatLogButtonClick", J.bind(onChatLogButtonClick,this));
		
		//观察消息发送
		$E.addObserver(EQQ.View.ChatBox, "SendMsg", J.bind(this.onSendMsg,this));
		//观察按钮
		$E.addObserver(EQQ.View.ChatBox, "SendOptionButtonClick", J.bind(onSendOptionButtonClick,this));

		//观察快捷键设置面板的按钮
		$E.addObserver(EQQ.View.ChatBox, "SetNotNeedCtrlKey", J.bind(onSetNotNeedCtrlKey,this));
		
		//观察快捷键设置面板的按钮
		$E.addObserver(EQQ.View.ChatBox, "SetNeedCtrlKey", J.bind(onSetNeedCtrlKey,this));

		//观察按钮
		$E.addObserver(EQQ.View.ChatBox, "ViewChatLog", onViewChatLog);
		
		//观察按钮
		$E.addObserver(EQQ.View.ChatBox, "ExportCurrentChatLog", onExportCurrentChatLog);
		
		// 监听发起会话的用户操作
		$E.addObserver(EQQ.View.ChatBox, "StartChat", J.bind(this.onStartChat,this));
		
		// 监听发起会话的用户操作
		$E.addObserver(EQQ.View.ChatBox, "LoadCustomFace", J.bind(this.onLoadCustomFace,this));
		
		//监听启动截屏APP事件
		//$E.addObserver(EQQ.View.ChatBox, "runScreenCapture", EQQ.View.ChatBox.onRunScreenCapture);
		
		//refuseReceive
        $E.addObserver(EQQ.View.ChatBox, "agreeReceive",  this.onAgreeReceiveFile);
		$E.addObserver(EQQ.View.ChatBox, "refuseReceive", this.onRefuseReceiveFile);
		
		$E.addObserver(EQQ.View.ChatBox, "sendFile", this.onSendFile);
		
		//$E.addObserver(packageContext, "setCurrent", this.sendGetGroupNewestState);//捕捉群聊天窗口置为当前
		
		EQQ.View.ChatBox.init();
		
		if(isNotNeedCtrlKey){
			packageContext.setNotNeedCtrlKey();
		}else{
			packageContext.setNeedCtrlKey();
		}
		
		

	};
	
	// 发送消息失败的提示
	this.onSendMsgError= function(data) { 
		var uin = data.uin;      
		var chatBox = this.View.getChatBox(uin); 
		if(chatBox){
			switch(data.retcode) {
				case "103":
					chatBox.tips("您的登录已失效，请登录后再尝试");
					break;
				case "100":
				
					chatBox.tips("您已经处于离线状态，请上线后再尝试");
					break;
				default:
					chatBox.tips("发送消息错误，请重新尝试");
			}
		}
		
	};
	
	
	this.onGetCustomFaceListSuccess = function(list){
		this.View.createCustomFaceList(list);
	};
	
	
	
	this.getChatBoxList = function(){
		return this.View.getChatBoxList();
	};
	
	this.onCloseWebQQ = function() {
		var list = this.View.getChatBoxList();
		for(var i=0; i<list.length; i++) {
			list[i].destroy();
		}
	};
	
	//当状态改变
	this.onBuddyStateChange = function(uin) {
		var user = EQQ.Model.BuddyList.getUserByUin(uin);
		//J.out("uin:"+uin+user);
		this.View.setBuddyState(user);
		this.View.setClientType(user);
	};
	
	// 当view传来发送消息的事件时
	this.onSendMsg = function(chatBox) {  
		//TODO
		if(EQQ.Model.BuddyList.getSelfState() == "offline") {
			if(chatBox){
				
				chatBox.tips("您已经处于离线状态，请上线后再尝试");
			}
			return false;
		}
		
		//对content进行处理
		var textArea = chatBox._textArea;
		   // alert("发送消息:"+textArea.value);                
		//这个正则在IE下不适用
		var content = [];
		var matchResult = [];
		var combineRE = /\[face\d{1,3}\]|\[自定义表情\d{1,10}\]/;
		var defaultFaceRE = /\[face\d{1,3}\]/;
		var customFaceRE = /\[自定义表情\d{1,10}\]/;
		var sendPicRE = /\[发送图片[/\-a-z0-9A-z]{1,50}\]/; //个人对个人，
		var sendPicCFaceRE = /\[图片[/.a-z0-9A-z]{1,50}\]/; //"自定义表情方式"发图
		var faceCode;
		var cface;
		var msgText = String(textArea.value);
		var customFaceList = EQQ.Model.ChatMsg.getCustomFaceList();
		var sendPicList = EQQ.Model.ChatMsg.getSendPicList();
		var hasCustomFace = false;
		//字体格式
		var fontMsg = [];

		// 查找系统默认表情& 查找自定义表情
		while(matchResult= msgText.match(combineRE)) {
			//查找系统默认表情
			if(String(matchResult).match(defaultFaceRE)) {
				content.push(msgText.slice(0, matchResult.index));
				faceCode = parseInt(matchResult[0].replace( /\[face|\]/,''));
				//J.out("faceCode:"+faceCode);
				if(faceCode < 135) {
					content.push(["face", faceCode]);
				}
				else {
					content.push("[face" + faceCode + "]");
				}
				msgText = msgText.slice(matchResult.index + matchResult[0].length);
			}
			//查找自定义表情
			else if(String(matchResult).match(customFaceRE)) {
				hasCustomFace = true;
				content.push(msgText.slice(0, matchResult.index));
				faceCode = parseInt(matchResult[0].replace( /\[自定义表情|\]/,''));
				cface = customFaceList[faceCode][0];
				// 发送群消息
				if(chatBox.chatBoxType === "group"){
					content.push(["cface", "group", cface]);
				}else
				{
					content.push(["cface", cface]);
				}
				msgText = msgText.slice(matchResult.index + matchResult[0].length);
			}
		}
		

		
		//查找发送图片	: 单条消息限制：10张或500K	 
		var tmpSendPic = '';
		var count = 0;
		var sumSize = 0;
		while(matchResult = msgText.match(sendPicRE)) {	
		    count++;
			if( count > 10 )
			{
				chatBox.tips("图片数目超过10张限制！");
				return false;
			}
			content.push(msgText.slice(0, matchResult.index));
			tmpSendPic = matchResult[0].replace( /\[发送图片|\]/g,'');	
			
			if( tmpSendPic == 'loading' )
			 {
				 chatBox.tips("图片加载中，请稍候！");
				 return false;
			 }			
			sumSize += sendPicList[tmpSendPic].filesize;
			var maxSize = 1.2 * 1024 * 1024;
			if( sumSize > maxSize )
			{
				chatBox.tips("图片容量超过1.2M限制！");
				return false;
			}
			content.push(["offpic",tmpSendPic, sendPicList[tmpSendPic].filename, sendPicList[tmpSendPic].filesize]);
			msgText = msgText.slice(matchResult.index + matchResult[0].length);
		}
		
		//查找"自定义表情方式"发图片(群)	 
		while(matchResult = msgText.match(sendPicCFaceRE)) {	
		   hasCustomFace = true;
			content.push(msgText.slice(0, matchResult.index));
			var tmpFileName = matchResult[0].replace( /\[图片|\]/g,'');				
			// 发送群消息
			if(chatBox.chatBoxType === "group"){
				content.push(["cface",'group',tmpFileName]);
			}else
			{
				content.push(["cface",tmpFileName]);
			}
			
			msgText = msgText.slice(matchResult.index + matchResult[0].length);
		}
		
		//alert(msgText); 
		content.push(msgText);
		
		fontMsg.push('font');
		if(chatBox.editor && chatBox.editor.isEnable()){
			var styles=chatBox.editor.getAllStyles();
			styles=styles.split('|');
	    	// 楷体_GB2312|16px|bold|italic|none|rgb(51, 51, 153);

	    	var color = styles[5].match(/^#([0-9a-f]{6})/); //#003366
	    	if(color){
	    		color=color[1];
	    	}else{
	    		color= styles[5].match(/\d{1,3}/g); //rgb(51, 51, 153)
	    		if(color.length == 3){ //将rgb转换为16进制表示
	    			var c1=parseInt(color[0]).toString(16),
	    				c2=parseInt(color[1]).toString(16),
	    				c3=parseInt(color[2]).toString(16);
	    			if(c1.length==1)	c1='0'+c1;
	    			if(c2.length==1)	c2='0'+c2;
	    			if(c3.length==1)	c3='0'+c3;
	    			color=c1+c2+c3;
	    		}else{
	    			color='000000';//取默认值
	    		}
	    	}
	    	fontMsg.push({
	    		'name' : styles[0],
				'size' : styles[1].match(/\d+/)[0],
				'style' : [(styles[2] === 'bold' ? 1 : 0),
						(styles[3] === 'italic' ? 1 : 0),
						(styles[4] === 'underline' ? 1 : 0)],
				'color' : color
			});
		}else{//如果没有启用富文本,则使用默认值
			fontMsg.push({
				'size':10,
				'color':'000000',
				'style':[0,0,0],
				'name':'宋体'
			});
		}
		
		var self = EQQ.Model.BuddyList.getSelf();
		//var tipsText = '\n【提示：' + self.allName + '正在使用QQWeb：http://qqweb.qq.com/】';
		var tipsText = '\n【提示：此用户正在使用WebQQ：http://web.qq.com/】';
		
		// 发送群消息
		if(chatBox.chatBoxType === "group"){
			var group = EQQ.Model.BuddyList.getGroupByGid(chatBox.gid);
			EQQ.Presenter.MainPanel.updateRecentByGroup(group);
			if(!group.isFirstSend){
				content.push(tipsText);
				group.isFirstSend = true;
			}
			// 加style
			content.push(fontMsg); 
			// 如果含有自定义表情
			if(hasCustomFace){
				// 如果key已经过期，需要重新拉取
				if(EQQ.Model.ChatMsg.isGroupCustomFaceKeyTimeout()){
					EQQ.Model.ChatMsg.sendGetGroupCustomFaceKey({
						type: "group",
						to: chatBox.gid,
						content: content
						
					});
				}
				// 如果key没有过期
				else{
					EQQ.Model.ChatMsg.sendGetGroupCustomFaceInfo({
						type: "group",
						to: chatBox.gid,
						content: content
						
					});
				}
				
			}
			// 如果没有自定义表情
			else{
				EQQ.Model.ChatMsg.sendMsg({
					type: "group",
					to: chatBox.gid,
					content: content
					
				});
			}
			
			

			
		}
		// 发送个人消息
		else{
			var user = EQQ.Model.BuddyList.getUserByUin(chatBox.uin);
			EQQ.Presenter.MainPanel.updateRecentByBuddy(user);
			if(!user.isFirstSend){
				content.push(tipsText);
				user.isFirstSend = true;
			}
			// 加style
			content.push(fontMsg);
			EQQ.Model.ChatMsg.sendMsg({
				type:"single",
				to: chatBox.uin,
				content: content,
				face: EQQ.Model.BuddyList.getSelf().face
				
			});
		}
		
		textArea.value = "";
		if(chatBox.editor && chatBox.editor.isEnable()){
			chatBox.editor.clear();
		}
	};
	
	//申请发送图片(离线)的地址成功
	this.onGetSendPicUrlSuccess = function(data){		 
		EQQ.View.ChatBox.insertSendPic(data);
	};
	//插入群发送图片
	this.onGetSendPicGroupSuccess = function(fileName){		 
		EQQ.View.ChatBox.insertSendPicGroup(fileName);
	};
	//上传发送图片(离线)的失败
	this.onUploadSendPicError = function(data){		
	    
		var chatBox = this.getCurrent(); 
		if(chatBox){
			//chatBox.tips("上传图片文件失败！");
			switch(data.retcode) {
				case "100":
					chatBox.tips("图片大小超过"+data.maxFileSize);
					break;				
				default:
					chatBox.tips("上传图片失败，请重新尝试!");
			}
			EQQ.View.ChatBox.removeLoading(data.fileid);
		}
	};
	//群发送图片失败提示
	this.onSendPicGroupError = function(data) { 
		var chatBox = this.getCurrent(); 
		if(chatBox){
 			switch(data.ret) {
				case 1 :
					chatBox.tips("文件格式错误");
					break;
				case 3 :
					chatBox.tips("文件大小超过250KB");
				    break;
				case 4 :
					chatBox.tips("此自定义表情已存在");	
				    break;
				default :
					chatBox.tips("发生上传错误");	
			}
		}
	};
	
	//申请发送图片(离线)的地址失败
	this.onSetSendPicUrlError = function(data){		
	   // var current=this.getCurrent();
		var chatBox = this.getCurrent();//this.View.getChatBox(uin);
		if(chatBox){
			 chatBox.tips("申请图片文件地址失败！");
			if(  typeof(data.fileid) !== 'undefined' && data.fileid )
			   EQQ.View.ChatBox.removeLoading(data.fileid);
			 
		}
	};
	
	
	// 清空消息记录的操作
	var onClearChatLog = function(chatBox){
		chatBox.clearChatLog();
		if(chatBox.chatBoxType == "group"){
			EQQ.Model.ChatMsg.clearChatLog(chatBox.gid);
		}else{
			EQQ.Model.ChatMsg.clearChatLog(chatBox.uin);
		}
		
	};
	
	// 发起个人会话
	this.chatWithUser = function(uin, onlineState){
		var chatBox = this.getChatBox(uin);
		var user = EQQ.Model.BuddyList.getUserByUin(uin);
		
		// 如果已经开启聊天窗
		if(chatBox){
			chatBox.setCurrent();
			
		// 如果已经有user信息
		}else if(user){
			// 如果是好友
			if(user.type === "buddy"){
				chatBox = this.addChatBox(user, onlineState);
				// 设置为当前
				chatBox.setCurrent();
				
			// 如果是群友
			}else if(user.type === "groupBuddy"){
				if(user.chatSession){
					chatBox = this.addChatBox(user, onlineState);
					chatBox.setCurrent();
				}else{
					EQQ.Model.BuddyList.sendGetSessionSignature(user.uin);
				}
				
				
				
			// 如果是陌生人
			}else if(user.type === "stranger"){
				chatBox = this.addChatBox(user, onlineState);
				// 设置为当前
				chatBox.setCurrent();
			// 如果是黑名单
			}else if(user.type === "black"){
				
			}
			//J.out("user.type:"+user.type);
			
		// 如果还没有user信息
		}else{

		}
	};
	
	// 发起群会话
	this.chatWithGroup = function(code){
		//J.out("chatWithGroup:"+code);
		
		var chatBox = this.getChatBoxByCode(code);

		if(chatBox){
			chatBox.setCurrent();
		}else{
			var group = EQQ.Model.BuddyList.getGroupByCode(code);
			chatBox = this.addGroupChatBox(group);
			chatBox.setCurrent();
		}

	};
	
	// 添加个人聊天框
	this.addChatBox = function(user){
		var chatBox = this.View.addChatBox(user);

		$E.notifyObservers(packageContext, "ChatBoxAdd", user);
		return chatBox;
	};
	
	// 添加群聊天框
	this.addGroupChatBox = function(group){
		var chatBox = this.View.addGroupChatBox(group);
		$E.notifyObservers(packageContext, "ChatBoxAdd", group);

		return chatBox;
	};
	
	
	
	
	
	
	
	
	
	//设置聊天窗口的公告
	this.onGroupAnnouncementChange = function(group) {
		this.View.getChatBox(group.gid).updateAnnouncement();
	};
	
	//设置聊天窗口的公告
	this.onGroupMembersChange = function(group) {

		this.View.getChatBox(group.gid).updateMembers();
	};
	
	//设置聊天窗口的设置按钮
	this.onGroupInfoChange = function(group) {

		this.View.getChatBox(group.gid).updateSettingButton();
	};
	
	this.onSingleGroupMaskChange = function(group) { 
		var groupChatBox=this.getChatBox(group.gid);
		//全局设置
		var groupMask=EQQ.Model.BuddyList.getGroupMask();
		groupChatBox.setMaskButton(group.mask);
		groupChatBox.setWarning(group.mask,group.preMask,groupMask);
		
	};
	
	
	
	//设置聊天窗口的签名
	this.handleSetChatboxSignature = function(buddy) {
		
		EQQ.View.ChatBox.setChatboxSignature(buddy);
	};
	
	
	
	// 聊天框创建回调
	this.onChatBoxAdd = function(chatBox){
		
		if(chatBox.chatBoxType === "group"){
			
			//J.out(">>>>>>>>>>>>>>getGroupMsgHistory, "+chatBox.gid+chatBox.chatBoxType)
			
			EQQ.Model.ChatMsg.getGroupMsgHistory(chatBox.gid);
			
			/*if(chatBox.group.isLoadInfo){
				chatBox.updateAnnouncement();
				chatBox.updateMembers();
			}else{
				// 获取群资料
				EQQ.Model.BuddyList.getGroupInfo(chatBox.code);
			}*/
			//修改为：重新打开窗口即重新拉取信息一次
			 EQQ.Model.BuddyList.getGroupInfo(chatBox.code);
			 
			 hasGetGroupInfo = true;
			 
		}else{
			EQQ.Model.ChatMsg.getMsgHistory(chatBox.uin);
			//J.out(">>>>>>>>>>>>>>getMsgHistory, "+chatBox.uin+chatBox.chatBoxType)
			
			var buddy = EQQ.Model.BuddyList.getBuddyByUin(chatBox.uin);
			
			// 是好友才能去拉取签名，否则没有权限
			if(buddy){
				if(J.isUndefined(buddy.signature)){
					//获取聊天窗口的签名
					EQQ.Model.BuddyList.getUserSignature(chatBox.uin);
				}else{
					EQQ.View.ChatBox.setChatboxSignature(buddy);
				}
			}
			
			
		}
		
		//J.out(">>>>> onChatBoxCreate, "+chatBox+chatBox.chatBoxType)
		
	};
	
	// 聊天框显示回调
	this.onChatBoxShow = function(chatBox){
		//J.out(">>>> 一个神奇的小窗口出现了");
		if(chatBox.chatBoxType === "group"){
			EQQ.Model.ChatMsg.removeMessageBoxGroupList(chatBox.gid);
			$E.notifyObservers(EQQ, "ChatBoxShow",chatBox.gid);
		}else{
			EQQ.Model.ChatMsg.removeMessageBoxUserList(chatBox.uin);
			$E.notifyObservers(EQQ, "ChatBoxShow",chatBox.uin);
		}
		
	};
	this.onSetCurrent = function(chatBox) {  
	     
		$E.notifyObservers(packageContext, "ChatBoxSetCurrent", chatBox.uin);
		if( chatBox.chatBoxType === 'group' ){		
		    if( !hasGetGroupInfo ){
				this.sendGetGroupNewestState(chatBox.code);
			}else{
			   hasGetGroupInfo = false;	
			}
		}
	};

	this.onSetNotCurrent = function(chatBox) {
		$E.notifyObservers(packageContext, "ChatBoxSetNotCurrent", chatBox.uin);
	};

	// 聊天框最小化回调2
	this.onChatBoxMin = function(chatBox){
		$E.notifyObservers(packageContext, "ChatBoxMin", chatBox.uin);
	};
	
	// 聊天框关闭回调
	this.onChatBoxClose= function(chatBox) {
		$E.notifyObservers(packageContext, "ChatBoxClose", chatBox.uin);
	};

	this.onStartChat = function(uin){
		// 发起聊天
		this.chatWithUser(uin, "show");
	};
	
	
	this.onLoadCustomFace = function(){
		// 发起加载自定义表情
		EQQ.Model.ChatMsg.loadCustomFaceList();
	};
	
	this.onGroupBuddySessionSignatureChange = function(uin){
		//J.out("chatWithUser:"+uin)
		// 发起聊天
		this.chatWithUser(uin, "show");
	};
	
	
	
	// 聊天框定位
	this.onAutoAlign= function(chatBox) {
		var x = EQQ.Presenter.TaskBar.getTaskLeft(chatBox.uin) - 5;
		if(x || x===0){
			chatBox.setX(x);
		}
	};
	

	
	// 根据uin获取chatbox对象
	this.getChatBox = function(uin){
		return this.View.getChatBox(uin);
	};
	
	// 根据uin获取chatbox对象
	this.getChatBoxByCode = function(code){
		var group = EQQ.Model.BuddyList.getGroupByCode(code);
		return this.View.getChatBox(group.gid);
	};

	
	// 处理收到消息
	this.onMessageListChange = function(option){  
		var chatBox = this.View.getChatBox(option.uin);
		//J.out("处理uin："+option.uin+", "+chatBox)
		if(chatBox){
			//J.out("处理中:"+option)
			chatBox.appendMsg(option);
			//J.out("处理完毕")
		}
	};
	
	
	// 处理收到消息
	this.onGroupMessageListChange = function(option){		
		var chatBox = this.View.getChatBox(option.gid);
		//J.out("处理gid："+option.gid+", "+chatBox)
		if(chatBox){
			//J.out("处理中"+option)
			chatBox.appendMsg(option);
			//J.out("处理完毕")
		}
	};
   
	
	this.shiftChatBox = function() {
		return this.View.shiftChatBox();
	};
	
	this.getCurrent = function() {
		return this.View.getCurrent();
	};
	

	
	this.getCurrentChatBoxPointer = function() {
		var uin,
			msg_id;
		if(this.View.getCurrent()) {
			//J.out();
			uin = this.View.getCurrent().uin;
			msg_id = EQQ.Model.ChatMsg.getMessagePointer(uin);
			return {uins:[uin], msg_ids:[msg_id]};
		}else{
			return {uins:[], msg_ids:[]};
		}
		
	};
	
	// 显示桌面
	this.showDesktop = function(){
		//var tempList = this.hasChatBoxOnDesktop();
		
		var tempList = [];

		var tempCurrent = this.View.getCurrent();
		var chatBoxList = this.View.getChatBoxList();
		for(var i=0; i<chatBoxList.length; i++){
			if(chatBoxList[i].isShow()){
				chatBoxList[i].min();
				tempList.push(chatBoxList[i]);
			}
		}


		if(tempList.length > 0){
			onDesktopChatBoxList = tempList;
			onDesktopChatBoxCurrent = tempCurrent;

		}else{
			if(onDesktopChatBoxCurrent){
				onDesktopChatBoxCurrent.setCurrent();
			}
			var chatBoxMode = this.View.getMode();
			if(chatBoxMode === "adsorb"){
				
			}else if(chatBoxMode === "free"){
				for(var i=0; i<onDesktopChatBoxList.length; i++){
					onDesktopChatBoxList[i].show();
				}
			}
			
		}

		
	};
	
	
	this.hasChatBoxOnDesktop = function(){
		
		var tempList = [];
		var chatBoxList = this.View.getChatBoxList();
		for(var i=0; i<chatBoxList.length; i++){
			if(chatBoxList[i].isShow()){
				tempList.push(chatBoxList[i]);
			}
		}
		if(tempList.length > 0){
			return tempList;
		}else{
			return false;
		}
	};
	
	
	// 设置吸附模式
	this.setMode = function(mode){ 
		switch(mode){
			case "adsorb":
				this.View.setAdsorbMode();

				break;
			case "free":
				this.View.setFreeMode();

				break;
		}
	};
	
	// 获取吸附模式状态
	this.getMode = function(){
		return this.View.getMode();
	};
	
	

	
	
	this.toggleFacePanel = function(xy){
		if(this.View.facePanel && this.View.facePanel.isShow()) {
			this.View.hideFacePanel();
		}else{
			this.View.showFacePanel(xy);
		}
	};
	
	var onFaceButtonClick = function(xy){
		this.toggleFacePanel(xy);
	};
	var onSendPicButtonClick = function(chatBox){ //处理选择的发送图片
		if(EQQ.Model.BuddyList.getSelf().state == "offline") {
			if(chatBox){
				chatBox.tips("您已经处于离线状态，请上线后再尝试");
			}
			return false;
		}
		
		this.View.uploadSendPic();
	};
	
	var SendFileButtonClick = function(chatBox){ //处理选择的发送文件
		if(EQQ.Model.BuddyList.getSelf().state == "offline") {
			if(chatBox){
				chatBox.tips("您已经处于离线状态，请上线后再尝试");
			}
			return false;
		}
		
		this.View.uploadSendFile();
	};
	
	var onMaskButtonClick = function(xy){
		var current=this.getCurrent();
		var group=EQQ.Model.BuddyList.getGroupByGid(current.gid);
		this.View.toggleGroupMaskStatePanel(xy,group.mask);
	};
	var onSetSingleGroupMaskState = function(data){
		EQQ.Model.BuddyList.sendChangeGroupMask(data);
	};
	
	this.toggleChatLogOptionPanel = function(xy){
		if(this.View.chatLogOptionPanel && this.View.chatLogOptionPanel.isShow()) {
			this.View.hideChatLogOptionPanel();
		}else{
			this.View.showChatLogOptionPanel(xy);
		}
	};
	var onChatLogButtonClick = function(xy){
		this.toggleChatLogOptionPanel(xy);
	};
	
	
	this.toggleSendOptionPanel = function(xy){
		if(this.View.sendOptionPanel && this.View.sendOptionPanel.isShow()) {
			this.View.hideSendOptionPanel();
		}else{
			this.View.showSendOptionPanel(xy);
		}
	};
	var onSendOptionButtonClick = function(xy){
		this.toggleSendOptionPanel(xy);
		
	};
	
	
	
	var onViewChatLog = function(uin){
		qqweb.portal.runApp("chatLogViewer", uin);

	};
	
	var onExportCurrentChatLog = function(uin){
		//J.out("onExportCurrentChatLog:"+uin);
		var self = EQQ.Model.BuddyList.getSelf();
		var user = EQQ.Model.BuddyList.getUserByUin(uin);
		packageContext.View.exportChatLog(self, user);
	};
	

	
	var onSetNotNeedCtrlKey = function(){
		packageContext.setNotNeedCtrlKey();
	};
	var onSetNeedCtrlKey = function(){
		packageContext.setNeedCtrlKey();
	};
	
	// 设置为Enter键发送
	this.setNotNeedCtrlKey = function(){
		isNotNeedCtrlKey = true;
		this.View.setNotNeedCtrlKey();
	};
	// 设置为Ctrl+Enter键发送
	this.setNeedCtrlKey = function(){
		isNotNeedCtrlKey = false;
		this.View.setNeedCtrlKey();
	};
	
	
	//onRunScreenCapture
	this. onRunScreenCapture = function(){
	   	
	}
	
	//同意接收文件
   this.onAgreeReceiveFile = function(fileid){	 
	    var filesList = EQQ.Model.ChatMsg.getFilesList();
	    filesList[fileid].isread = true;	  
		packageContext.View.removeReceiveFileLink(fileid);
		var clientid =EQQ.Model.ChatMsg.getClientidFromRpc();
		packageContext.View.receiveFile(filesList[fileid],clientid);
		EQQ.Model.ChatMsg.agreeReceiveFile(filesList[fileid]);
   };
   //同意接收文件
   this.onRefuseReceiveFile = function(fileid){
	    var filesList = EQQ.Model.ChatMsg.getFilesList();
	    filesList[fileid].isread = true;	 
		packageContext.View.removeReceiveFileLink(fileid);
		EQQ.Model.ChatMsg.refuseReceiveFile(filesList[fileid]);
	     
   };
   //对方取消发送文件
   this.onFromCancelFile = function(fileid){ 
	    var filesList = EQQ.Model.ChatMsg.getFilesList();
		if( !filesList[fileid] )
		   return false; 
	    filesList[fileid].isread = true;	  
		packageContext.View.removeReceiveFileLink(fileid);
   };
   //发送文件
   this.onSendFile = function(data){	   
	   EQQ.Model.ChatMsg.sendFile(data);
   };
   
   //更新群信息相关
   this.sendGetGroupNewestState = function(gcode){
 	   EQQ.Model.BuddyList.sendGetGroupNewestState({gcode:gcode});
   }

});



/* == EQQ 聊天任务条的presenter层 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2009.11.17 ----- */
 
 
// 呈献层：..
Jet().$package("EQQ.Presenter.TaskBar", function(J){
	var packageContext = this,
		$E = J.event,
		$D = J.dom,
		
		taskBarLeftMargin = 289,
		taskBarRightMargin = 225,
		buddyTabWidth = 122,
		flickerUins = [],
		userFlickerUins = [],
		groupFlickerUins = [],
		taskList = [],
		uin2task = {};

		
		
	// 点击taskbar的关闭操作时
	var onClickCloseButton = function(uin){
		var chatBox = EQQ.Presenter.ChatBox.getChatBox(uin);
		if(chatBox){
			chatBox.close();
		}
	};
	
	// 点击显示桌面按钮的监听
	var onClickShowDesktopButton = function(){
		EQQ.Presenter.ChatBox.showDesktop();
	};
	
	var onClickFreeModelButton = function(){
		packageContext.setMode("free");
	};
	
	
	
	var onClickAdsorbModelButton = function(){
		packageContext.setMode("adsorb");
	};
	
	
	// 观察者方法
	var observer = {
		onChatBoxAdd : function(userOrGroup){
			if(userOrGroup.gid){
				
				packageContext.addGroupChatTask(userOrGroup);
			}else{
				packageContext.addChatTask(userOrGroup);
			}
			
		},
		
		onChatBoxClose : function(uin){
			var task = packageContext.getTask(uin);
			if(task){
				task.close();
			}
		},
		onChatBoxSetCurrent : function(uin){
			var task = packageContext.getTask(uin);
			if(task){
				task.setCurrent();
			}
		},
		onChatBoxSetNotCurrent : function(uin){
			var task = packageContext.getTask(uin);
			if(task){
				task.setNotCurrent();
			}
		},
		onChatBoxMin : function(uin){
			var task = packageContext.getTask(uin);
			if(task){
				task.setNotCurrent();
			}
		}
		
	};
	
	var Task = new J.Class({
		init: function(userOrGroup, status, type){
			var context = this;
			this.type = type;
			this.status = status;
			
			if(type === "group"){
				// 群聊天
				var group = userOrGroup;
				this.code = group.code;
				this.gid = group.gid;
				this.uin = group.gid;
				this.group = group;
				this._el = packageContext.View.createGroupTaskDom(this.group, this);
				
			}else{
				// c2c聊天
				var user = userOrGroup;
				this.uin = user.uin;
				this.user = user;
				this._el = packageContext.View.createTaskDom(this.user, this);

			}

			if(taskList.length >= packageContext.getMaxCount()) {
				if(Task._current) {
					Task._current.setNotCurrent();
				}
				//packageContext.shiftTask();
				EQQ.Presenter.ChatBox.shiftChatBox();
			}
			
			taskList.push(this);
			uin2task[this.uin] = this;

			$E.addObserver(this, "TaskClick", J.bind(this.toggleTaskStatus,this));
			
			/*
			if(this.status === "current"){
				this.setCurrent();
			}else{
				//this.setNotCurrent();
			}
			*/
		},
		
		// 关闭task
		close: function(){
			this.destroy();
		},
		
		// 销毁task对象
		destroy: function(){
			if(Task._current && Task._current.uin == this.uin) {
				Task._current = null;
				J.out("Task._current = null;");
			}
			// 从taskList和uin2task中移除
			J.array.remove(taskList, this);
			delete uin2task[this.uin];

			//如果任务栏收起
			packageContext.View.removeTask(this._el);
			
			var chatbox = EQQ.Presenter.ChatBox.getCurrent();
			if(chatbox){
				var mode = EQQ.Presenter.ChatBox.getMode();
				if(mode === "adsorb"){
					//deewii:debug task的吸附模式有bug 经排查注释掉下面这句则正常
					//chatbox.autoAlign();
				}else if(mode === "free"){
					
				}
				
			}
			
			if(taskList.length == 0) {
				packageContext.View.resetTaskBar();
			}
			
		},

		toggleTaskStatus : function(){
			if(this.status === "current"){
				
				EQQ.Presenter.ChatBox.getChatBox(this.uin).min();
				EQQ.Presenter.ChatBox.getChatBox(this.uin).setNotCurrent();
				
			}else if(this.status === "notCurrent"){
				// 调用chatbox的方法
				EQQ.Presenter.ChatBox.getChatBox(this.uin).setCurrent();
				EQQ.Presenter.ChatBox.getChatBox(this.uin).scrollToBottom();
			}

		},
		
		// 设置为当前
		setCurrent:function(){  
			packageContext.View.setCurrent(this._el);  
			this.status = "current";
			
			Task._current = this;
			
		},

		
		// 设置为非当前
		setNotCurrent:function(){
			packageContext.View.setNotCurrent(this._el);
			this.status = "notCurrent";

			if(Task._current && Task._current.uin == this.uin) {
				Task._current = null;
			}
			
		},
		
		getRight:function(){
			return packageContext.View.getRight(this._el);	
		},
		
		getLeft:function(){
			return packageContext.View.getLeft(this._el);	
		}
		
	});
	
	Task._current = null;
	
	// 初始化
	this.init= function(){
		this.View = EQQ.View.TaskBar;
		this.View.init();


		// 添加一个500毫秒的节拍观察着
		$E.addObserver(EQQ, "NotifyBeat_250", onNotifyBeat_250);
		
		$E.addObserver(EQQ.Model.ChatMsg, "MessageBoxUserListChange", J.bind(this.onMessageBoxUserListChange,this));
		
		$E.addObserver(EQQ.Model.ChatMsg, "MessageBoxGroupListChange", J.bind(this.onMessageBoxGroupListChange,this));

		//观察状态改变
		$E.addObserver(EQQ.Model.BuddyList, "BuddyStateChange", this.onBuddyStateChange);
		
		//观察状态改变
		$E.addObserver(EQQ.Presenter.ChatBox, "ChatBoxAdd", observer.onChatBoxAdd);
		$E.addObserver(EQQ.Presenter.ChatBox, "ChatBoxClose", observer.onChatBoxClose);
		$E.addObserver(EQQ.Presenter.ChatBox, "ChatBoxSetCurrent", observer.onChatBoxSetCurrent);
		$E.addObserver(EQQ.Presenter.ChatBox, "ChatBoxSetNotCurrent", observer.onChatBoxSetNotCurrent);
		$E.addObserver(EQQ.Presenter.ChatBox, "ChatBoxMin", observer.onChatBoxMin);

		
		$E.addObserver(this.View, "ClickCloseButton", onClickCloseButton);
		
		// 点击显示桌面事件
		//$E.addObserver(qqweb, "ClickShowDesktopButton", onClickShowDesktopButton);
		
		// 点击自由模式事件
		$E.addObserver(this.View, "ClickFreeModelButton", onClickFreeModelButton);
		
		// 点击吸附模式事件
		$E.addObserver(this.View, "ClickAdsorbModelButton", onClickAdsorbModelButton);
		
		this.setMode("free");
	};

	
	// 计算可打开的最大窗口数
	this.getMaxCount = function(){
		return Math.floor((this.View.getClientWidth() - taskBarLeftMargin - taskBarRightMargin)/buddyTabWidth);
	};
	
	

	
	// 添加一个c2c聊天任务
	this.addChatTask = function(user, status){
		var task = this.getTask(user.uin);
		if(task){
			//task.setCurrent();
		}else{
			task = new Task(user, status);
		}

	};
	
	// 添加一个群聊天任务
	this.addGroupChatTask = function(group, status){
		var type = "group";
		var task = this.getTask(group.gid);
		if(task){
			//task.setCurrent();
		}else{
			task = new Task(group, status, type);
		}
		

	};
	
	// 获取当前的task
	this.getCurrent = function(){
		return Task._current;
	};
	
	// 获取当前的task
	this.getCurrentTaskUin = function(){
		var task = this.getCurrent();
		return task ? task.uin : null;
	};
	

	// 获取当前的task
	this.getTask = function(uin) {
		return uin2task[uin];
	};
	
	// 弹出第一个task
	this.shiftTask = function(){
		var firstTask = taskList.shift();
		firstTask.close();
	};
	
	this.getTaskLeft = function(uin) {
		var task = this.getTask(uin);
		if(task) {
			return task.getLeft();
		}
	};
	
	

	//当状态改变
	this.onBuddyStateChange = function(uin) {
		
		if(packageContext.getTask(uin)) {
			var user = EQQ.Model.BuddyList.getUserByUin(uin);
			packageContext.View.setBuddyState(user);
		}
	};

	//当窗口存在发起RPC
	this.onChatWinExist= function(uin) {
		EQQ.Presenter.ChatBox.onChatWinExist(uin);
	};



	//获取任务栏头像列表
	this.getFacesArray = function() {
		var temp= [];
		for(var i=0;i<taskList.length;i++) {
			temp.push(parseInt(taskList[i].uin));
		}
		return temp;
	};
	
	// 消息提示用户列表
	this.onMessageBoxUserListChange = function(messageBoxUserList) { 

		var self = EQQ.Model.BuddyList.getSelf();
		var currentUin = this.getCurrentTaskUin();

		/*if(flickerUins.length>0){
			this.View.jumpDown(flickerUins);			 
			flickerUins = [];
		}*/
		
		if(userFlickerUins.length>0){
 			this.View.jumpDown(userFlickerUins);
			userFlickerUins = [];
 		}

		if(self.state != "callme"){
			for(var i=0; i<messageBoxUserList.length; i++) {
				if (this.getTask(messageBoxUserList[i].from_uin)) {
					if (currentUin == messageBoxUserList[i].from_uin) {
						J.out("当前窗口的则直接设置为已读")
						// 如果是当前窗口的则直接设置为已读
						EQQ.Model.ChatMsg.removeMessageBoxUserList(currentUin);
						J.out("设置为已读finish")
					}else{
						// 跳动头像
						//flickerUins.push(messageBoxUserList[i].from_uin);
						packageContext.addJumpUserList('user',messageBoxUserList[i]);//messageBoxUserList[i].from_uin,messageBoxUserList[i].time);
					}

				}
			}
		}else{

			//有人Q我啦
			for(var i=0; i<messageBoxUserList.length; i++) {
				//对Q我吧的处理比较简单
				if (this.getTask(messageBoxUserList[i].from_uin)) {
					if (currentUin == messageBoxUserList[i].from_uin) {
						J.out("当前窗口的则直接设置为已读")
						// 如果是当前窗口的则直接设置为已读
						EQQ.Model.ChatMsg.removeMessageBoxUserList(currentUin);
						J.out("设置为已读finish")
					}else{
						// 跳动头像
						//flickerUins.push(messageBoxUserList[i].from_uin);
						packageContext.addJumpUserList('user',messageBoxUserList[i]);//messageBoxUserList[i].from_uin,messageBoxUserList[i].time);
					}
				}else{
					this.addChatTask(messageBoxUserList[i].from_uin, "notCurrent");
					//flickerUins.push(messageBoxUserList[i].from_uin);
					packageContext.addJumpUserList('user',messageBoxUserList[i]);//messageBoxUserList[i].from_uin, messageBoxUserList[i].time);
				}
			}
		}
		
		if(userFlickerUins.length !== 0){//if(flickerUins.length !== 0){
			EQQ.addNeedBeat2("taskBar");
			$E.addObserver(EQQ, "NotifyBeat_250", onNotifyBeat_250);
			
		}
		//J.out("taskbar个人闪："+flickerUins)
	};
	
	// 群消息提示用户列表
	this.onMessageBoxGroupListChange = function(messageBoxGroupList) { 
		var currentUin = this.getCurrentTaskUin();

		/*if(flickerUins.length>0){
			this.View.jumpDown(flickerUins);
			flickerUins = [];			 
		}*/
	   if(groupFlickerUins.length>0){			 
			this.View.jumpDown(groupFlickerUins);
			groupFlickerUins = [];
		}
		
		for(var i=0; i<messageBoxGroupList.length; i++) {
			if (this.getTask(messageBoxGroupList[i].from_uin)) {
				if (currentUin == messageBoxGroupList[i].from_uin) {
					J.out("当前窗口的则直接设置为已读")
					// 如果是当前窗口的则直接设置为已读
					EQQ.Model.ChatMsg.removeMessageBoxGroupList(currentUin);
					J.out("设置为已读finish")
				}else{
					// 跳动头像,群不提示的时候也闪动
					//flickerUins.push(messageBoxGroupList[i].from_uin);
					packageContext.addJumpUserList('group',messageBoxGroupList[i]);//messageBoxGroupList[i].from_uin, messageBoxGroupList[i].time);
				}
			}
		}
		
		
		
		if(groupFlickerUins.length !== 0){//if(flickerUins.length !== 0){
			EQQ.addNeedBeat2("taskBar");
			$E.addObserver(EQQ, "NotifyBeat_250", onNotifyBeat_250);
			
		}

		//J.out("taskbar群闪闪闪："+flickerUins)
	};
	
	//添加跳到用户到数组中
	this.addJumpUserList = function(type,messageList){  
		packageContext.View.resetJumpCount(messageList.from_uin,messageList.time);
		if( type === 'user' ){
			userFlickerUins.push(messageList.from_uin);
		}else{
			groupFlickerUins.push(messageList.from_uin);
		}
		 
	};
	
	
	// 设置吸附模式
	this.setMode = function(mode){
		switch(mode){
			case "adsorb":
				this.View.showFreeModelButton();
				EQQ.Presenter.ChatBox.setMode("adsorb");
				break;
			case "free":   
				this.View.showAdsorbModelButton();
				EQQ.Presenter.ChatBox.setMode("free");				
				break;
		}
		var currentUin = this.getCurrentTaskUin();
		var task = packageContext.getTask(currentUin);				
		if( task ){					  
			 task.setCurrent();
		}
		
	};
	
	
	
	// 500毫秒的节拍处理
	var onNotifyBeat_250 = function(){ 
		flickerUins = [];  
		flickerUins = flickerUins.concat(userFlickerUins,groupFlickerUins);
		 
		if(flickerUins.length>0){
			packageContext.View.jumpAvatar(flickerUins);
		}else{
			
			$E.removeObserver(EQQ, "NotifyBeat_250", onNotifyBeat_250);
			EQQ.removeNeedBeat2("taskBar");

		}
	};
	
	

});



		/* == EQQ 类模块 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2010.3.16 ----- */


Jet().$package("EQQ.businessClass", function (J) {
    var chatBoxManager = EQQ.View.ChatBox,
		$D = J.dom,
		$E = J.event;
	
	var editorBarHeight = 28;
    var onGroupMemberMainAreaClick = function (e) {
        var uin = $D.getAttributeByParent("uin", e.target, this);
        $E.notifyObservers(chatBoxManager, "StartChat", uin);
    };

    var onListMouseover = function () {
        $D.setStyle(this, "backgroundColor", "#cbe7fc");
    };
    var onListMouseout = function () {
        $D.setStyle(this, "backgroundColor", "transparent");
    };
    var onBuddyListClick = function (e) {
        var uin = this.getAttribute("uin");
        $E.notifyObservers(chatBoxManager, "StartChat", uin);
    };

    var onAvatarMouseover = function () {
        var uin = Number(this.getAttribute("uin"));
        if (EQQ.avatarMouseoverTimer) {
            clearTimeout(EQQ.avatarMouseoverTimer);
            EQQ.avatarMouseoverTimer = null;
        }
        var xy = $D.getClientXY(this);
        xy[0] = xy[0] - 218;
        xy[1] = xy[1] - 5;
        EQQ.Presenter.MainPanel.showMiniCardPanel(uin, xy);
        $E.notifyObservers(chatBoxManager, "AvatarMouseover", uin);
    };
    var onAvatarMouseout = function () {
        EQQ.avatarMouseoverTimer = window.setTimeout(onTimeHideMiniCardPanel, 500);
    };

    var onTimeHideMiniCardPanel = function () {
        EQQ.Presenter.MainPanel.hideMiniCardPanel();
    };

    var onNameClick = function () {
        var uin = Number(this.getAttribute("uin"));
        qqweb.portal.runApp("userDetails", uin);
    };

    var stopPropagation = function (e) {
		J.out("stopPropagation");
        e.stopPropagation();
    };


    //聊天窗口类
    var ChatBox = new J.Class({ extend: qqweb.businessClass.Window }, {

        // tips定时器
        _timer: null,

        // 记录最后发送时间
        _lastTime: null,


        // 初始化
        init: function (option) {
            var chatBoxContext = this;
 

            option = this.parseOption(option);


            this.type = option.type;
            this.chatBoxType = option.chatBoxType;

            // 窗口默认尺寸
            this._width = option.width;
            this._height = option.height;
            this._restoreWidth = option.width;
            this._restoreHeight = option.height;

            // 聊天窗自由模式的最小尺寸
            this._minWidth = option.minWidth;
            this._minHeight = option.minHeight;






            this.createDom();

            
            this.createEvent();
			this.createChatBoxDom();


            this.setZIndex(qqweb.layout.getTopZIndex());
            var pos = this.getDefaultPosition();
            this._x = pos.x;
            this._y = pos.y;

            switch (option.defaultMode) {
                case "max":
                    // 设置为max方式
                    this.max();
                    break;
                case "restore":
                    // 设置为restore方式
                    this.restore();
                    break;
                case "min":
                    // 设置为min方式
                    this.min();
                    break;
            }

            /*
            if(option.isSetCurrent){
            this.setCurrent();
            }else{
            this.setNotCurrent();
            }*/



        },


        createChatBoxDom: function () {
            var chatBoxContext = this;
            var userOrGroup = this.option.userOrGroup;
            //var onlineState = this.option.onlineState;

            // 观察者方法
            var observer = {
                onCloseButtonClick: function (e) {
                    e.preventDefault();
                    chatBoxContext.close();
                },

                // 聊天框按键处理
                onChatBoxKeyDown: function (e) {
					J.out("chatbox_kety: "+e.keyCode+", keyNum: "+((top.window.QQWebIME || 0).keyNum || 0)+", "+((top.window.QQWebIME || 0).get || function(){return false})('hasSpell'));
					
                    // 如果是回车键
                    if (e.keyCode === 13) {
                        var flag = chatBoxManager.getSendMsgKey();
                        // enter键发送
                        if (flag) {
                            if (!e.ctrlKey && !e.shiftKey && chatBoxContext.checkInput()) {
                                $E.notifyObservers(chatBoxManager, "SendMsg", chatBoxContext);
                                // 阻止默认事件
                                e.preventDefault();
                            }
                            else if (e.ctrlKey) {
                                if (chatBoxContext.editor && chatBoxContext.editor.isEnable()) {
                                    chatBoxContext.editor.newLine();
                                }
                                else {
                                    chatBoxManager.insertText("\n");
                                }
                                // 阻止默认事件
                                e.preventDefault();
                            }
                            // ctrl + enter键发送
                        } else {
                            if (e.ctrlKey && !e.shiftKey && chatBoxContext.checkInput()) {
                                $E.notifyObservers(chatBoxManager, "SendMsg", chatBoxContext);
                                // 阻止默认事件
                                e.preventDefault();
                            }
                            else {
                                if (chatBoxContext.editor && chatBoxContext.editor.isEnable()) {
                                    chatBoxContext.editor.newLine();
                                    e.preventDefault();
                                }
                            }
                        }
                        // alt + s
                    } else if (e.keyCode === 83 && e.altKey) {
                    	// 阻止冒泡
                    	e.stopPropagation();
                    	// 阻止默认事件
                        e.preventDefault();
                        if (chatBoxContext.checkInput()) {
                            $E.notifyObservers(chatBoxManager, "SendMsg", chatBoxContext);
                            
                        }


                    }
                },

				

                stopPropagationAndSetCurrent: function (e) {
                    e.stopPropagation();
                    chatBoxContext.setCurrent();
                },
                stopPropagationAndSetCurrentWithoutFocus: function (e) {
                    e.stopPropagation();
                    chatBoxContext.setCurrentWithoutFocus();
                },

                onFontButtonClick: function (e) {
                    //e.stopPropagation();
                    //e.preventDefault();

                    //$E.notifyObservers(chatBoxManager, "FontButtonClick", chatBoxContext);
                    if ($D.isShow(chatBoxContext._fontToolBar)) {
                        $D.hide(chatBoxContext._fontToolBar);
                        var height = parseInt($D.getStyle(chatBoxContext._chatBox_chatBoard, 'bottom'));
                        height = height - editorBarHeight;
                        $D.setStyle(chatBoxContext._chatBox_chatBoard, 'bottom', height + 'px');
                    } else {
                        var height = parseInt($D.getStyle(chatBoxContext._chatBox_chatBoard, 'bottom'));
                        height = height + editorBarHeight;
                        $D.setStyle(chatBoxContext._chatBox_chatBoard, 'bottom', height + 'px');
                        $D.show(chatBoxContext._fontToolBar);
                    }
                    //			chatBoxContext.focus();
                    //			chatBoxContext.saveRange();
                    //			chatBoxContext.focus();

                },
                onFaceButtonClick: function (e) {
                    e.stopPropagation();
                    //e.preventDefault();

                    var xy = $D.getClientXY(chatBoxContext._faceButton);

                    $E.notifyObservers(chatBoxManager, "FaceButtonClick", xy);
                },

                onSendFileButtonClick: function (e) {//发送文件
                    //alert("onSendFileButtonClick");EQQ.index=result.index;
                    $E.notifyObservers(chatBoxManager, "SendFileButtonClick", chatBoxContext); //发送消息到presenter	,chatBoxContext:聊天窗口对象 	
                    //alert(EQQ.index+'/'+EQQ.port);
                },
                onSnapButtonClick: function (e) {//截屏					
                    //qqweb.portal.runApp("screenCapture", chatBoxContext);
                    $E.notifyObservers(chatBoxManager, "runScreenCapture", chatBoxContext);
                },
                onSendPicButtonClick: function (e) {//发送图片
                    e.stopPropagation();
                    $E.notifyObservers(chatBoxManager, "SendPicButtonClick", chatBoxContext); //发送消息到presenter	,chatBoxContext:聊天窗口对象 		
                },
                onMaskButtonClick: function (e) {
                    e.stopPropagation();
                    var xy = $D.getClientXY(chatBoxContext._maskButton);
                    $E.notifyObservers(chatBoxManager, "MaskButtonClick", xy);
                },

                onClearButtonClick: function (e) {
                    e.preventDefault();
                    $E.notifyObservers(chatBoxManager, "ClearChatLog", chatBoxContext);
                },

                onChatLogButtonClick: function (e) {
                    e.stopPropagation();

                    var xy = $D.getClientXY(chatBoxContext._chatLogButton);
                    $E.notifyObservers(chatBoxManager, "ChatLogButtonClick", xy);

                },

                onSendMsgButtonClick: function (e) {
                    if (chatBoxContext.checkInput()) {
                        $E.notifyObservers(chatBoxManager, "SendMsg", chatBoxContext);
                        chatBoxContext.focus();
                    }
                },

                onSendOptionButtonClick: function (e) {
                    e.stopPropagation();
                    //e.preventDefault();
                    var xy = $D.getClientXY(chatBoxContext._sendOptionButton);
                    $E.notifyObservers(chatBoxManager, "SendOptionButtonClick", xy);
                },

                onShow: function () {
                    J.out("onShow >>>>>>>>>>>>>>>>>>>>");
                    $E.notifyObservers(chatBoxManager, "ChatBoxShow", chatBoxContext);
                },
                onMin: function () {
                    $E.notifyObservers(chatBoxManager, "ChatBoxMin", chatBoxContext);
                },

                onRestore: function () {
                    var chatBoxMode = chatBoxManager.getMode();
                    if (chatBoxMode === "adsorb") {
                        chatBoxContext.setWidth(chatBoxContext._adsorbWidth);
                        chatBoxContext.setHeight(chatBoxContext._adsorbHeight);
                        chatBoxContext.autoAlign();
                    } else if (chatBoxMode === "free") {
                        chatBoxContext.setXY(chatBoxContext._x, chatBoxContext._y);

                        if (chatBoxContext._restoreWidth < 0) {
                            chatBoxContext._restoreWidth = 0;
                        }
                        chatBoxContext.setWidth(chatBoxContext._restoreWidth);

                        if (chatBoxContext._restoreHeight < 0) {
                            chatBoxContext._restoreHeight = 0;
                        }
                        chatBoxContext.setHeight(chatBoxContext._restoreHeight);

                        chatBoxContext.enableDrag();
                    }
                    chatBoxManager.hideFacePanel();
                },

                onSetCurrent: function () {
                    J.out("ChatBoxSetCurrent1")
                    var status = chatBoxContext.getBoxStatus();
                    var chatBoxMode = chatBoxManager.getMode();
                    if (chatBoxMode === "adsorb") {
                        if (status === "max") {

                        } else {
                            chatBoxContext.autoAlign();
                        }
                    }
                    J.out("ChatBoxSetCurrent2")
                    $E.notifyObservers(chatBoxManager, "ChatBoxSetCurrent", chatBoxContext);
                },
                onSetNotCurrent: function () {
                    var chatBoxMode = chatBoxManager.getMode();
                    if (chatBoxMode === "adsorb") {
                        chatBoxContext.min();
                    } else if (chatBoxMode === "free") {

                    }
                    $E.notifyObservers(chatBoxManager, "ChatBoxSetNotCurrent", chatBoxContext);
                },


                onChatBoxResize: function () {    
				    
                    
					if (J.browser.ie && J.browser.ie < 8) {	
                        // fix ie6-7
                     
					   var height = chatBoxContext.getBodySize().height; 
						 
                        var chatBoardHeight = height - ChatBox.inputAndTipsHeight;
                       
                        if (chatBoardHeight < ChatBox.tipsHeight) {
                            chatBoardHeight = ChatBox.tipsHeight;
                        }
                        var msgListHeight = chatBoardHeight;
                        if (chatBoxContext._isShowTips) {
                            msgListHeight = chatBoardHeight - ChatBox.tipsHeight;
                        }

                        $D.setStyle(chatBoxContext._chatBox_chatBoard, "height", chatBoardHeight + "px");
                        $D.setStyle(chatBoxContext._chatBox_msgList, "height", msgListHeight + "px");

                        if (chatBoxContext.chatBoxType == "group") {
                            var groupMemberHeight = height - ChatBox.groupSpaceHeight;
                            if (groupMemberHeight < ChatBox.groupMemberTitleBarHeight) {
                                groupMemberHeight = ChatBox.groupMemberTitleBarHeight;
                            }
                            $D.setStyle(chatBoxContext._chatBox_groupMember, "height", groupMemberHeight + "px");
                            $D.setStyle(chatBoxContext._chatBox_groupMember_mainArea, "height", (groupMemberHeight - ChatBox.groupMemberTitleBarHeight) + "px");
                        }

                        J.out("<<<<< IE6-7: chatbox: resize ok");

                    }
                },


                onChatBoxClose: function () {
                    J.out("chatbox: close");
                    chatBoxManager.hideFacePanel();
                    var current = chatBoxManager.getCurrent();
                    if (current && (chatBoxContext.uin === current.uin)) {
                        chatBoxManager.setCurrent(null);
                        J.out("ChatBox._current = null;")
                    }

                    chatBoxManager.removeChatBox(chatBoxContext);

                    $E.notifyObservers(chatBoxManager, "ChatBoxClose", chatBoxContext);
                    J.out("onChatBoxClose1: ");
                },

                about: function () { }

            };

            if (this.chatBoxType == "group") {
                var group = userOrGroup;
                this.group = group;
 
                // 群聊天框吸附模式时的尺寸
                this._adsorbWidth = 430;
                this._adsorbHeight = 350;

                this.code = group.code;
                this.gid = group.gid;
                this.uin = group.gid;

                this._el = this.container;

                var htmlTitle =
						'\
							<a class="chatBox_groupAvatarArea" title="<%=titleTypeText%>" target="_blank" href="' + EQQ.CONST.QQ_GROUP_URL + '<%=code%>">\
								<img class="chatBox_groupAvatar" src="' + EQQ.getGroupAvatar(group.code) + '" />\
								<div class="chatBox_groupType"></div>\
							</a>\
							<div class="chatBox_nameArea">\
								<a id="chatBox_allName_<%=gid%>" class="chatBox_allName titleText" title="<%=titleAllName%> - <%=titleTypeText%>" target="_blank" href="' + EQQ.CONST.QQ_GROUP_URL + '<%=code%>">\
									<span class="chatBox_mainName"><%=htmlShowName%></span>\
									<span><<%=code%>></span>\
								</a>\
							</div>\
							<div class="chatBox_moreInfoArea">\
								<a id="EQQ_chatboxGspaceIcon_<%=gid%>" class="EQQ_chatboxGspaceIcon EQQ_gspaceLevel_' + (group.level||0) + '" title="查看公告" target="_blank" href="' + EQQ.CONST.QQ_GROUP_URL + '/<%=code%>"></a>\
								<div class="chatBox_announcementArea"><a id="chatBox_announcement_<%=gid%>" title="载入中..." target="_blank" href="' + EQQ.CONST.QQ_GROUP_URL + '<%=code%>"></a></div>\
							</div>\
						';

                var htmlBody =
						'\
								<div id="chatBox_sideBar_<%=gid%>" class="chatBox_sideBar">\
									<div class="chatBox_groupSpace">\
										<div class="chatBox_groupSpace_titleBar"><a id="chatBox_groupSpace_settingButton_<%=gid%>" class="chatBox_groupSpace_settingButton" title="群设置" hidefocus target="_blank" href="' + EQQ.CONST.QQ_GROUP_URL + '<%=code%>/admin"></a>群空间</div>\
										<div class="chatBox_groupSpace_mainArea">\
											<a id="chatBox_groupSpace_groupShare_<%=gid%>" class="chatBox_groupSpace_groupShare" title="群共享" hidefocus target="_blank" href="' + EQQ.CONST.QQ_GROUP_URL + '#<%=code%>/share"><div></div>群共享</a>\
											<a id="chatBox_groupSpace_groupForum_<%=gid%>" class="chatBox_groupSpace_groupForum" title="群论坛" hidefocus target="_blank" href="' + EQQ.CONST.QQ_GROUP_URL + '<%=code%>/bbs"><div></div>群论坛</a>\
											<a id="chatBox_groupSpace_groupAlbum_<%=gid%>" class="chatBox_groupSpace_groupAlbum" title="群相册" hidefocus target="_blank" href="' + EQQ.CONST.QQ_GROUP_URL + '<%=code%>/impress"><div></div>群相册</a>\
										</div>\
									</div>\
									<div id="chatBox_groupMember_<%=gid%>" class="chatBox_groupMember">\
										<div class="chatBox_groupMember_titleBar">群成员(<span id="chatBox_groupMember_onlineCount_<%=gid%>">0</span>/<span id="chatBox_groupMember_count_<%=gid%>">0</span>)</div>\
										<div id="chatBox_groupMember_mainArea_<%=gid%>" class="chatBox_groupMember_mainArea">\
											<div id="chatBox_<%=gid%>_groupMember_callmeArea" class="chatBox_groupMember_callmeArea"></div>\
											<div id="chatBox_<%=gid%>_groupMember_onlineArea" class="chatBox_groupMember_onlineArea"></div>\
											<div id="chatBox_<%=gid%>_groupMember_busyArea" class="chatBox_groupMember_busyArea"></div>\
											<div id="chatBox_<%=gid%>_groupMember_awayArea" class="chatBox_groupMember_awayArea"></div>\
											<div id="chatBox_<%=gid%>_groupMember_silentArea" class="chatBox_groupMember_silentArea"></div>\
											<div id="chatBox_<%=gid%>_groupMember_offlineArea" class="chatBox_groupMember_offlineArea"></div>\
										</div>\
									</div>\
								</div>\
								<div class="group_chatBox_mainArea">\
									<div id="chatBox_chatBoard_<%=gid%>" class="chatBox_chatBoard">\
										<div id="chatBox_msgList_<%=gid%>" class="chatBox_msgList"></div>\
										<div id="chatBox_yellowTipsBar_<%=gid%>" class="chatBox_yellowTipsBar"></div>\
									</div>\
									<div id="chatBox_fontToolBar_<%=gid%>" class="editorToolbar" unselectable="on">\
										<ul class="toolbar" unselectable="on">\
											<li><select id="chatBox_fontToolBar_<%=gid%>_fontFamily" class="fontFamily"><option value="宋体">宋体</option><option value="黑体">黑体</option><option value="隶书">隶书</option><option value="微软雅黑">微软雅黑</option><option value="楷体_GB2312">楷体_GB2312</option><option value="幼圆">幼圆</option><option value="Arial">Arial</option><option value="Arial Black">Arial Black</option><option value="Times New Roman">Times New Roman</option><option value="Verdana">Verdana</option></select></li>\
											<li><select id="chatBox_fontToolBar_<%=gid%>_fontSize" class="fontSize"><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option></select></li>\
											<li><a id="chatBox_fontToolBar_<%=gid%>_bold" href="#" class="icon" title="粗体"><span class="bold"></span></a></li>\
											<li><a id="chatBox_fontToolBar_<%=gid%>_italic" href="#" class="icon" title="斜体"><span class="italic"></span></a></li>\
											<li><a id="chatBox_fontToolBar_<%=gid%>_underline" href="#" class="icon" title="下划线"><span class="underline"></span></a></li>\
											<li><a id="chatBox_fontToolBar_<%=gid%>_color" href="#" class="icon" title="颜色"><span class="color"></span></a></li>\
										</ul>\
										<ul id="chatBox_fontToolBar_<%=gid%>_colorPanel"  class="colorPanel">\
											<li><a href="#"><span style="background: #000000"></span></a></li><li><a href="#"><span style="background: #993300"></span></a></li><li><a href="#"><span style="background: #333300"></span></a></li><li><a href="#"><span style="background: #003300"></span></a></li><li><a href="#"><span style="background: #003366"></span></a></li><li><a href="#"><span style="background: #000080"></span></a></li><li><a href="#"><span style="background: #333399"></span></a></li><li><a href="#"><span style="background: #333333"></span></a></li>\
											<li><a href="#"><span style="background: #800000"></span></a></li><li><a href="#"><span style="background: #FF6600"></span></a></li><li><a href="#"><span style="background: #808000"></span></a></li><li><a href="#"><span style="background: #008000"></span></a></li><li><a href="#"><span style="background: #008080"></span></a></li><li><a href="#"><span style="background: #0000FF"></span></a></li><li><a href="#"><span style="background: #666699"></span></a></li><li><a href="#"><span style="background: #808080"></span></a></li>\
											<li><a href="#"><span style="background: #FF0000"></span></a></li><li><a href="#"><span style="background: #FF9900"></span></a></li><li><a href="#"><span style="background: #99CC00"></span></a></li><li><a href="#"><span style="background: #339966"></span></a></li><li><a href="#"><span style="background: #33CCCC"></span></a></li><li><a href="#"><span style="background: #3366FF"></span></a></li><li><a href="#"><span style="background: #800080"></span></a></li><li><a href="#"><span style="background: #999999"></span></a></li>\
											<li><a href="#"><span style="background: #FF00FF"></span></a></li><li><a href="#"><span style="background: #FFCC00"></span></a></li><li><a href="#"><span style="background: #FFFF00"></span></a></li><li><a href="#"><span style="background: #00FFFF"></span></a></li><li><a href="#"><span style="background: #00FFFF"></span></a></li><li><a href="#"><span style="background: #00CCFF"></span></a></li><li><a href="#"><span style="background: #993366"></span></a></li><li><a href="#"><span style="background: #C0C0C0"></span></a></li>\
											<li><a href="#"><span style="background: #FF99CC"></span></a></li><li><a href="#"><span style="background: #FFCC99"></span></a></li><li><a href="#"><span style="background: #FFFF99"></span></a></li><li><a href="#"><span style="background: #CCFFCC"></span></a></li><li><a href="#"><span style="background: #CCFFFF"></span></a></li><li><a href="#"><span style="background: #99CCFF"></span></a></li><li><a href="#"><span style="background: #CC99FF"></span></a></li><li><a href="#"><span style="background: #FFFFFF"></span></a></li>\
										</ul>\
									</div>\
									<div class="chatBox_toolBar">\
										<div id="chatBox_fontButton_<%=gid%>"  class="chatBox_fontButton" title="设置字体颜色和格式"></div>\
										<div id="chatBox_faceButton_<%=gid%>" class="chatBox_faceButton" title="表情"></div>\
										<iframe id="uploadFilIframe_<%=gid%>" name="uploadFilIframe_<%=gid%>" style="display:none"></iframe>\
										<div id="chatBox_snapButton_<%=gid%>" class="chatBox_snapButton" title="' + chatBoxManager.getHotKeyTitle() + '"></div>\
										<form id="uploadSendPicfile_<%=gid%>" name="uploadSendPicfile_<%=gid%>"  title="发送图片..." class="sendPicForm" target="uploadFilIframe_<%=gid%>" action="" method="POST" enctype="multipart/form-data">\
											<div id="chatBox_sendPicButton_<%=gid%>" class="chatBox_sendPicButton" title="发送图片...">\
												 <input id="from_<%=gid%>" name="from" value="control" type="hidden">\
												 <input name="f" type="hidden" value="EQQ.Model.ChatMsg.callbackSendPicGroup">\
												 <input id="custom_face_<%=gid%>" class="f" name="custom_face" type="file">\
												 <input name="fileid" type="hidden" value="">\
											</div>\
										</form>\
										<div id="chatBox_clearButton_<%=gid%>" class="chatBox_clearButton" title="清屏"></div>\
										<div id="chatBox_maskButton_<%=gid%>" class="chatBox_acceptButton" title="群屏蔽"></div>\
										<a id="chatBox_chatLogButton_<%=gid%>" class="chatBox_historyButton" title="消息记录" href="' + EQQ.CONST.QQ_GROUP_URL + '<%=code%>chatlog" target="_blank"></a>\
									</div>\
									<textarea id="chatBox_textArea_<%=gid%>" class="chatBox_inputBox"></textarea>\
									<div class="chatBox_controlPanel">\
										<div id="chatBox_sendOptionButton_<%=gid%>" class="chatBox_sendOptionButton" title="修改发送快捷键"></div>\
										<div id="chatBox_sendMsgButton_<%=gid%>" class="chatBox_sendMsgButton" title="发送">发　送</div>\
										<div id="chatBox_closeButton_<%=gid%>" class="chatBox_closeButton" title="关闭">关　闭</div>\
									</div>\
								</div>';


                htmlTitle = J.string.template(htmlTitle, group);
                htmlBody = J.string.template(htmlBody, group);
                this.setTitleHtml(htmlTitle);
                this.setHtml(htmlBody);
                this.setTitleBarHeight(39);

                this._closeButton2 = $D.id("chatBox_closeButton_" + this.gid);

                
                this._chatBox_allName = $D.id("chatBox_allName_" + this.gid);
                this._chatboxGspaceIcon = $D.id("EQQ_chatboxGspaceIcon_" + this.gid);
                this._chatBox_announcement = $D.id("chatBox_announcement_" + this.gid);
                


                this._chatBox_sideBar = $D.id("chatBox_sideBar_" + this.gid);
                this._chatBox_groupSpace_settingButton = $D.id("chatBox_groupSpace_settingButton_" + this.gid);
                this._chatBox_groupSpace_groupShare = $D.id("chatBox_groupSpace_groupShare_" + this.gid);
                this._chatBox_groupSpace_groupForum = $D.id("chatBox_groupSpace_groupForum_" + this.gid);
                this._chatBox_groupSpace_groupAlbum = $D.id("chatBox_groupSpace_groupAlbum_" + this.gid);
                
                
                


                this._chatBox_chatBoard = $D.id("chatBox_chatBoard_" + this.gid);
                this._chatBox_msgList = $D.id("chatBox_msgList_" + this.gid);
                this._yellowTipsBar = $D.id("chatBox_yellowTipsBar_" + this.gid);

                this._fontToolBar = $D.id("chatBox_fontToolBar_" + this.gid);

                this._fontButton = $D.id("chatBox_fontButton_" + this.gid);
                this._faceButton = $D.id("chatBox_faceButton_" + this.gid);

                //this._selSendFile = $D.id("offline_file_"+this.gid);
                this._snapButton = $D.id("chatBox_snapButton_" + this.gid);

                this._sendPicButton = $D.id("chatBox_sendPicButton_" + this.gid);
                this._selSendPic = $D.id("custom_face_" + this.gid); //发送图片的file表单
                this._clearButton = $D.id("chatBox_clearButton_" + this.gid);
                this._maskButton = $D.id("chatBox_maskButton_" + this.gid);
                this._chatLogButton = $D.id("chatBox_chatLogButton_" + this.gid);

                this._textArea = $D.id("chatBox_textArea_" + this.gid);
                this._sendOptionButton = $D.id("chatBox_sendOptionButton_" + this.uin);
                this._sendMsgButton = $D.id("chatBox_sendMsgButton_" + this.gid);

                this._chatBox_groupMember = $D.id("chatBox_groupMember_" + this.gid);
                this._chatBox_groupMember_onlineCount = $D.id("chatBox_groupMember_onlineCount_" + this.gid);
                this._chatBox_groupMember_count = $D.id("chatBox_groupMember_count_" + this.gid);

                this._chatBox_groupMember_mainArea = $D.id("chatBox_groupMember_mainArea_" + this.gid);
                this._chatBox_groupMember_callmeArea = $D.id("chatBox_" + this.gid + "_groupMember_callmeArea");
                this._chatBox_groupMember_onlineArea = $D.id("chatBox_" + this.gid + "_groupMember_onlineArea");
                this._chatBox_groupMember_busyArea = $D.id("chatBox_" + this.gid + "_groupMember_busyArea");
                this._chatBox_groupMember_awayArea = $D.id("chatBox_" + this.gid + "_groupMember_awayArea");
                this._chatBox_groupMember_silentArea = $D.id("chatBox_" + this.gid + "_groupMember_silentArea");
                this._chatBox_groupMember_offlineArea = $D.id("chatBox_" + this.gid + "_groupMember_offlineArea");


                
                $E.on(this._chatBox_groupSpace_settingButton, "click", qqweb.util.observer.openInWebBrowser);
                $E.on(this._chatBox_groupSpace_groupShare, "click", qqweb.util.observer.openInWebBrowser);
                $E.on(this._chatBox_groupSpace_groupForum, "click", qqweb.util.observer.openInWebBrowser);
                $E.on(this._chatBox_groupSpace_groupAlbum, "click", qqweb.util.observer.openInWebBrowser);
                
                $E.on(this._chatLogButton, "click", qqweb.util.observer.openInWebBrowser);
                
                
                $E.on(this._chatboxGspaceIcon, "mousedown", observer.stopPropagationAndSetCurrentWithoutFocus);
                $E.on(this._chatboxGspaceIcon, "click", qqweb.util.observer.openInWebBrowser);
                $E.on(this._chatBox_allName, "mousedown", observer.stopPropagationAndSetCurrentWithoutFocus);
                $E.on(this._chatBox_allName, "click", qqweb.util.observer.openInWebBrowser);
                
                
                $E.on(this._chatBox_announcement, "mousedown", observer.stopPropagationAndSetCurrentWithoutFocus);
                $E.on(this._chatBox_announcement, "dblclick", observer.stopPropagationAndSetCurrentWithoutFocus);
                $E.on(this._chatBox_announcement, "click", qqweb.util.observer.openInWebBrowser);
                $E.on(this._chatBox_sideBar, "mousedown", observer.stopPropagationAndSetCurrentWithoutFocus);
                $E.on(this._chatBox_groupMember_mainArea, "click", onGroupMemberMainAreaClick);
                $E.on(this._maskButton, "click", observer.onMaskButtonClick);

                //$E.on(this._el, "mousedown", observer.onChatBoxGroupMousedown);//
                //$E.notifyObservers(this, "setCurrent");
                //
                //设置群屏蔽按钮
                this.setMaskButton(group.mask);





            } else {
                var user = userOrGroup;  

                // 个人聊天框吸附模式时的尺寸
                this._adsorbWidth = 320;
                this._adsorbHeight = 350;

                this.user = user;
                this.uin = user.uin;

             
                this._el = this.container;
				
				var clientTypeTips = '';
				var clientTypeTitle = '';
				
				//如果支持群友，非好友，则有些信息不用显示
				if( user.type === 'groupBuddy' || user.type === 'stranger' ){
					
				}else{
					 clientTypeTips = ' - 使用' + EQQ.hash.clientTypeText[user.clientType || "10000"] + '中"';
				     clientTypeTitle = '[&nbsp&nbsp&nbsp&nbsp&nbsp使用' + EQQ.hash.clientTypeText[user.clientType || "10000"] + '中]';					
				}
				

                var htmlTitle = '\
						<div id="chatBox_avatarArea_<%=uin%>" class="chatBox_buddyAvatarArea <%=state%>BuddyInChatbox" uin="<%=uin%>" title="' + EQQ.hash.onlineStatusText[user.state] + '">\
							<img class="avatarInChatbox" src="' + EQQ.getUserAvatar(user.uin) + '" />\
							<div class="stateInChatbox"></div>\
						</div>\
						<div class="chatBox_nameArea">\
							<a id="chatBox_allName_<%=uin%>" class="chatBox_allName titleText" uin="<%=uin%>" title="<%=titleAllName%> - ' + EQQ.hash.onlineStatusText[user.state] + '" href="###">\
								<span class="chatBox_mainName"><%=htmlShowName%></span>\
								<span><<%=uin%>></span>\
								<span id="chatBox_clientType_<%=uin%>" class="chatBox_clientType_' + EQQ.hash.clientType[user.clientType || "10000"] + '" title="<%=titleAllName%>' + clientTypeTips + '">' + clientTypeTitle + '</span>\
							</a>\
						</div>\
						<div class="chatBox_moreInfoArea">\
							<a id="EQQ_chatboxQzoneIcon_<%=uin%>" class="EQQ_chatboxQzoneIcon" title="查看QQ空间" href="' + EQQ.CONST.QZONE_USER_SERVER_DOMAIN + '<%=uin%>" target="_blank"></a>\
							<div class="chatBox_announcementArea"><span id="chatBox_signature_<%=uin%>" title="载入中..."></span></div>\
						</div>\
					';

                var htmlBody =
						'\
								<div class="chatBox_mainArea">\
									<div id="chatBox_chatBoard_<%=uin%>" class="chatBox_chatBoard">\
										<div id="chatBox_msgList_<%=uin%>" class="chatBox_msgList"></div>\
										<div id="chatBox_yellowTipsBar_<%=uin%>" class="chatBox_yellowTipsBar"></div>\
									</div>\
									<div id="chatBox_fontToolBar_<%=uin%>" class="editorToolbar" unselectable="on">\
										<ul class="toolbar" unselectable="on">\
											<li><select id="chatBox_fontToolBar_<%=uin%>_fontFamily" class="fontFamily"><option value="宋体">宋体</option><option value="黑体">黑体</option><option value="隶书">隶书</option><option value="微软雅黑">微软雅黑</option><option value="楷体_GB2312">楷体_GB2312</option><option value="幼圆">幼圆</option><option value="Arial">Arial</option><option value="Arial Black">Arial Black</option><option value="Times New Roman">Times New Roman</option><option value="Verdana">Verdana</option></select></li>\
											<li><select id="chatBox_fontToolBar_<%=uin%>_fontSize" class="fontSize"><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option></select></li>\
											<li><a id="chatBox_fontToolBar_<%=uin%>_bold" href="#" class="icon" title="粗体"><span class="bold"></span></a></li>\
											<li><a id="chatBox_fontToolBar_<%=uin%>_italic" href="#" class="icon" title="斜体"><span class="italic"></span></a></li>\
											<li><a id="chatBox_fontToolBar_<%=uin%>_underline" href="#" class="icon" title="下划线"><span class="underline"></span></a></li>\
											<li><a id="chatBox_fontToolBar_<%=uin%>_color" href="#" class="icon" title="颜色"><span class="color"></span></a></li>\
										</ul>\
										<ul id="chatBox_fontToolBar_<%=uin%>_colorPanel"  class="colorPanel">\
											<li><a href="#"><span style="background: #000000"></span></a></li><li><a href="#"><span style="background: #993300"></span></a></li><li><a href="#"><span style="background: #333300"></span></a></li><li><a href="#"><span style="background: #003300"></span></a></li><li><a href="#"><span style="background: #003366"></span></a></li><li><a href="#"><span style="background: #000080"></span></a></li><li><a href="#"><span style="background: #333399"></span></a></li><li><a href="#"><span style="background: #333333"></span></a></li>\
											<li><a href="#"><span style="background: #800000"></span></a></li><li><a href="#"><span style="background: #FF6600"></span></a></li><li><a href="#"><span style="background: #808000"></span></a></li><li><a href="#"><span style="background: #008000"></span></a></li><li><a href="#"><span style="background: #008080"></span></a></li><li><a href="#"><span style="background: #0000FF"></span></a></li><li><a href="#"><span style="background: #666699"></span></a></li><li><a href="#"><span style="background: #808080"></span></a></li>\
											<li><a href="#"><span style="background: #FF0000"></span></a></li><li><a href="#"><span style="background: #FF9900"></span></a></li><li><a href="#"><span style="background: #99CC00"></span></a></li><li><a href="#"><span style="background: #339966"></span></a></li><li><a href="#"><span style="background: #33CCCC"></span></a></li><li><a href="#"><span style="background: #3366FF"></span></a></li><li><a href="#"><span style="background: #800080"></span></a></li><li><a href="#"><span style="background: #999999"></span></a></li>\
											<li><a href="#"><span style="background: #FF00FF"></span></a></li><li><a href="#"><span style="background: #FFCC00"></span></a></li><li><a href="#"><span style="background: #FFFF00"></span></a></li><li><a href="#"><span style="background: #00FFFF"></span></a></li><li><a href="#"><span style="background: #00FFFF"></span></a></li><li><a href="#"><span style="background: #00CCFF"></span></a></li><li><a href="#"><span style="background: #993366"></span></a></li><li><a href="#"><span style="background: #C0C0C0"></span></a></li>\
											<li><a href="#"><span style="background: #FF99CC"></span></a></li><li><a href="#"><span style="background: #FFCC99"></span></a></li><li><a href="#"><span style="background: #FFFF99"></span></a></li><li><a href="#"><span style="background: #CCFFCC"></span></a></li><li><a href="#"><span style="background: #CCFFFF"></span></a></li><li><a href="#"><span style="background: #99CCFF"></span></a></li><li><a href="#"><span style="background: #CC99FF"></span></a></li><li><a href="#"><span style="background: #FFFFFF"></span></a></li>\
										</ul>\
									</div>\
									<div class="chatBox_toolBar">\
										<div id="chatBox_fontButton_<%=uin%>"  class="chatBox_fontButton" title="设置字体颜色和格式"></div>\
										<div id="chatBox_faceButton_<%=uin%>" class="chatBox_faceButton" title="表情"></div>\
										<iframe id="uploadFilIframe_<%=uin%>" name="uploadFilIframe_<%=uin%>" style="display:none"></iframe>\
										<form id="uploadSendFilefile_<%=uin%>" name="uploadSendFilefile_<%=uin%>"  title="发送文件..." class="sendPicForm" target="uploadFilIframe_<%=uin%>" action="" method="POST" enctype="multipart/form-data">\
										   <div id="chatBox_fileButton_<%=uin%>" class="chatBox_sendFileButton" title="发送文件...">\
										   		<input id="offline_file_<%=uin%>" class="f" name="file" type="file">\
										   </div>\
										</form>\
										<div id="chatBox_snapButton_<%=uin%>" class="chatBox_snapButton" title="' + chatBoxManager.getHotKeyTitle() + '"></div>\
										<form id="uploadSendPicfile_<%=uin%>" name="uploadSendPicfile_<%=uin%>"  title="发送图片..." class="sendPicForm" target="uploadFilIframe_<%=uin%>" action="" method="POST" enctype="multipart/form-data">\
										   <div id="chatBox_sendPicButton_<%=uin%>" class="chatBox_sendPicButton" title="发送图片...">\
											 <input name="callback" type="hidden" value="parent.EQQ.Model.ChatMsg.callbackSendPic">\
											 <input name="locallangid" type="hidden" value="2052">\
											 <input name="clientversion" type="hidden" value="1409">\
											 <input name="uin" type="hidden" value="<%=uin%>">\
											 <input name="skey" type="hidden" value="@325fz2vag">\
											 <input name="appid" type="hidden" value="1002101">\
											 <input name="peeruin" type="hidden" value="593023668">\
											 <input id="offline_pic_<%=uin%>" class="f" name="file" type="file">\
											 <input name="fileid" type="hidden" value="">\
										   </div>\
										</form>\
										<div id="chatBox_clearButton_<%=uin%>" class="chatBox_clearButton" title="清屏"></div>\
										<a id="chatBox_chatLogButton_<%=uin%>" class="chatBox_historyButton" title="消息记录" href="javascript:;"></a>\
									</div>\
									<textarea id="chatBox_textArea_<%=uin%>" class="chatBox_inputBox"></textarea>\
									<div class="chatBox_controlPanel">\
										<div id="chatBox_sendOptionButton_<%=uin%>" class="chatBox_sendOptionButton" title="修改发送快捷键"></div>\
										<div id="chatBox_sendMsgButton_<%=uin%>" class="chatBox_sendMsgButton" title="发送">发　送</div>\
										<div id="chatBox_closeButton_<%=uin%>" class="chatBox_closeButton" title="关闭">关　闭</div>\
									</div>\
								</div>';

                htmlTitle = J.string.template(htmlTitle, user);
                htmlBody = J.string.template(htmlBody, user);
                this.setTitleHtml(htmlTitle);
                this.setHtml(htmlBody);
                this.setTitleBarHeight(39);


                this._closeButton2 = $D.id("chatBox_closeButton_" + this.uin);

                this._chatBox_avatarArea = $D.id("chatBox_avatarArea_" + this.uin);
                this._chatBox_allName = $D.id("chatBox_allName_" + this.uin);
                this._chatboxQzoneIcon = $D.id("EQQ_chatboxQzoneIcon_" + this.uin);
                
                this._chatBox_signature = $D.id("chatBox_signature_" + this.uin);

                this._chatBox_chatBoard = $D.id("chatBox_chatBoard_" + this.uin);
                this._chatBox_msgList = $D.id("chatBox_msgList_" + this.uin);
                this._yellowTipsBar = $D.id("chatBox_yellowTipsBar_" + this.uin);

                this._fontToolBar = $D.id("chatBox_fontToolBar_" + this.uin);
                this._fontButton = $D.id("chatBox_fontButton_" + this.uin);
                this._faceButton = $D.id("chatBox_faceButton_" + this.uin);

                this._selSendFile = $D.id("offline_file_" + this.uin);
                this._snapButton = $D.id("chatBox_snapButton_" + this.uin);

                this._sendPicButton = $D.id("chatBox_sendPicButton_" + this.uin);
                this._selSendPic = $D.id("offline_pic_" + this.uin); //发送图片的file表单
                this._fileButton = $D.id("chatBox_fileButton_" + this.uin); //发送图片的file表单

                this._clearButton = $D.id("chatBox_clearButton_" + this.uin);
                this._chatLogButton = $D.id("chatBox_chatLogButton_" + this.uin);
                this._textArea = $D.id("chatBox_textArea_" + this.uin);

                this._sendOptionButton = $D.id("chatBox_sendOptionButton_" + this.uin);
                this._sendMsgButton = $D.id("chatBox_sendMsgButton_" + this.uin);

                $E.on(this._chatBox_avatarArea, "mouseover", onAvatarMouseover);
                $E.on(this._chatBox_avatarArea, "mouseout", onAvatarMouseout);
                $E.on(this._chatBox_allName, "click", onNameClick);
                $E.on(this._chatBox_allName, "mousedown", observer.stopPropagationAndSetCurrentWithoutFocus);
                //$E.on(this._chatboxQzoneIcon, "click", qqweb.util.observer.openInWebBrowser);
                $E.on(this._chatboxQzoneIcon, "mousedown", observer.stopPropagationAndSetCurrentWithoutFocus);
                
                $E.on(this._chatBox_signature, "mousedown", observer.stopPropagationAndSetCurrentWithoutFocus);
                $E.on(this._chatBox_signature, "dblclick", observer.stopPropagationAndSetCurrentWithoutFocus);
                $E.on(this._chatLogButton, "click", observer.onChatLogButtonClick);

                $E.on(this._selSendFile, "change", observer.onSendFileButtonClick); //只有个人才能发生文件
                //$E.on(this._selSendFile, 'mousedown', stopPropagation);
                $E.on(this._fileButton, 'mousedown', stopPropagation);

            }




            $E.on(this._el, "keydown", observer.onChatBoxKeyDown);
            $E.on(this._fontButton, "click", observer.onFontButtonClick);
            $E.on(this._faceButton, "click", observer.onFaceButtonClick);


            $E.on(this._snapButton, "click", observer.onSnapButtonClick);

            $E.on(this._selSendPic, "change", observer.onSendPicButtonClick);
            //$E.on(this._selSendPic, 'mousedown', stopPropagation);
            $E.on(this._sendPicButton, "mousedown", stopPropagation);

            $E.on(this._clearButton, "click", observer.onClearButtonClick);
            $E.on(this._chatBox_chatBoard, "mousedown", observer.stopPropagationAndSetCurrentWithoutFocus);
            $E.on(this._textArea, "mousedown", observer.stopPropagationAndSetCurrentWithoutFocus);
            $E.on(this._sendOptionButton, "click", observer.onSendOptionButtonClick);
            $E.on(this._sendMsgButton, "click", observer.onSendMsgButtonClick);
            $E.on(this._closeButton2, "click", observer.onCloseButtonClick);



            // 添加富文本
            this.editor = new chatBoxManager.Editor(this._textArea, this._fontToolBar, this);


            $E.addObserver(this, "show", observer.onShow);
            $E.addObserver(this, "restore", observer.onRestore);
            $E.addObserver(this, "min", observer.onMin);

            $E.addObserver(this, "setCurrent", observer.onSetCurrent);
            $E.addObserver(this, "setNotCurrent", observer.onSetNotCurrent);
            $E.addObserver(this, "resize", observer.onChatBoxResize);
            $E.addObserver(this, "close", observer.onChatBoxClose);


            var chatBoxMode = chatBoxManager.getMode();

            if (chatBoxMode === "adsorb") {
                this.setAdsorbMode();

            } else if (chatBoxMode === "free") {
                this.setFreeMode();

            }

            if (!J.browser.ie && !J.browser.firefox)//截屏只支持IE和ff
                J.dom.hide(this._snapButton);


        },




        // 更新公告
        updateAnnouncement: function () {
            // 多行转单行
            this._chatBox_announcement.innerHTML = J.string.toHtml(J.string.toSingleLine(this.group.announcement));
            this._chatBox_announcement.title = this.group.titleAnnouncement;
			this.updateGroupLevel();
        },




        setFreeMode: function () {
			 
            var status = this.getBoxStatus();

            if (status === "max") {

            } else if (status === "restore" || status === "min") {

                this.setX(this._freeX);
                this.setY(this._freeY);

                this.setWidth(this._freeWidth);
                this.setHeight(this._freeHeight);

                this.enableDrag();

            }
          
            if (this === chatBoxManager.getCurrent()) {
                J.out("1: " + status)
                this.show();
                J.out("2: " + status)
				
            }  

        },

        setAdsorbMode: function () {
			 
            if (this === chatBoxManager.getCurrent()) {
				  
            } else {
                this.min();
            }
			
		
            var status = this.getBoxStatus();  
            if (status === "max") {

            } else if (status === "restore" || status === "min" ) {
                this.disableDrag();

                this._freeX = this._x;
                this._freeY = this._y;
                this._freeWidth = this._restoreWidth;
                this._freeHeight = this._restoreHeight;

                this.setWidth(this._adsorbWidth);
                this.setHeight(this._adsorbHeight);

                this.autoAlign();
            }
 
        },

        // 更新聊天窗的好友在线状态
        updateUserState: function (state) {
            $D.setClass(this._chatBox_avatarArea, state + "BuddyInChatbox");
            this._chatBox_avatarArea.title = EQQ.hash.onlineStatusText[state];
        },


        // 更新群设置按钮
        updateSettingButton: function () {
            if (this.group.hasManageAuthority) {
                $D.show(this._chatBox_groupSpace_settingButton);
            } else {
                $D.hide(this._chatBox_groupSpace_settingButton);
            }
        },
         
		 //更新群等级
		 updateGroupLevel: function(){ 
			 var g = this.group;		 
			 var divLevel = $D.id('EQQ_chatboxGspaceIcon_'+g.gid);
			 $D.setClass(divLevel,'EQQ_chatboxGspaceIcon');
			 $D.addClass(divLevel,'EQQ_gspaceLevel_'+(g.level||0));
			
		 },		  
		  
        // 更新群成员列表
        updateMembers: function () {
            var members = this.group.members;
            var html = "";
            var onlineCount = 0;
            this.clearMembersListBox();

            for (var i = 0; i < members.length; i++) {
                var className, titleFlag;
                var user = members[i];


                switch (user.flag) {
                    case "master":
                        titleFlag = "(创建者)";
                        className = "groupMaster";
                        break;

                    case "manager":
                        titleFlag = "(管理员)";
                        className = "groupManager";
                        break;

                    case "common":
                        titleFlag = "";
                        className = "";
                        break;

                }

                if (user.info) {
                    user = user.info;
                } else {
                    user.state = "offline";
                }
				
			 
			  var _onlineTxt = EQQ.hash.clientTypeText[user.clientType || "pc"] === "PC" || !EQQ.hash.clientTypeText[user.clientType || "pc"]  ? "" : EQQ.hash.clientTypeText[user.clientType || "pc"]; 	
                var template = '\
						<div class="chatBox_groupMember_avatarArea">\
							<img class="chatBox_groupMember_avatar" src="' + EQQ.getUserAvatar(user.uin) + '" />\
							<div class="chatBox_groupMember_state"></div>\
						</div>\
						<div class="chatBox_groupMember_nameArea" title="<%=htmlAllName%> - ' +  _onlineTxt + EQQ.hash.onlineStatusText[user.state] + '' + titleFlag + '">\
							<div class="EQQ_Group_ClientType_' + EQQ.hash.clientType[user.clientType || "10000"] + '"></div>\
							<div class="chatBox_groupMember_nick">'+members[i].usercard+'</div>\
						</div>';

                var buddyEl = $D.node("div", {
                    "id": "chatBox_groupMember_buddy_" + user.uin,
                    "class": "chatBox_groupMember_buddy " + className,
                    "uin": user.uin
                });
                buddyEl.innerHTML = J.string.template(template, user);

                this["_chatBox_groupMember_" + user.state + "Area"].appendChild(buddyEl);
                if (user.state != "offline") {
                    onlineCount++;
                }
                $E.on(buddyEl, "mouseover", onListMouseover);
                $E.on(buddyEl, "mouseout", onListMouseout);

            }
            //this["_chatBox_groupMember_"+user.state+"Area"].innerHTML = html;
            this._chatBox_groupMember_onlineCount.innerHTML = onlineCount;
            this._chatBox_groupMember_count.innerHTML = members.length;

            this.setMemberStateDivDisplay();


        },
        //清空成员列表框
        clearMembersListBox: function () {
            this._chatBox_groupMember_callmeArea.innerHTML = '';
            this._chatBox_groupMember_onlineArea.innerHTML = '';
            this._chatBox_groupMember_busyArea.innerHTML = '';
            this._chatBox_groupMember_awayArea.innerHTML = '';
            this._chatBox_groupMember_silentArea.innerHTML = '';
            this._chatBox_groupMember_offlineArea.innerHTML = '';

        },
        //根据各种div里面的内容是否为空，判断是否要显示，否则IE下会多出空白为
        setMemberStateDivDisplay: function () {
            var state = ['callme', 'online', 'busy', 'away', 'silent', 'offline'];
            for (var i = 0; i < state.length; i++) {
                var obj = this["_chatBox_groupMember_" + state[i] + "Area"];
                if (obj.innerHTML === '') {
                    $D.setStyle(obj, "display", "none");
                } else {
                    $D.setStyle(obj, "display", "block");
                }
            }
        },
        // 清空消息记录
        clearChatLog: function () {
            this._chatBox_msgList.innerHTML = '';
            //this._chatBox_msgList.innerHTML = '<div class="systemMsg">消息记录已清空</div>';
        },

        // 检查输入内容是否通过
        checkInput: function () {
            if (this.editor && this.editor.isEnable()) {
                this.editor.saveContent();
            }
            var msgCount = J.string.byteLength(this._textArea.value);
            if (msgCount == 0) {
                this.tips("提示：消息内容不能为空，请输入内容");
                return false;
            } else if (msgCount > 1000) {
                this.tips("提示：消息内容请勿超过500字，请修改后再试");
                return false;
            }

            var nowTime = (new Date()).getTime();
            if (this._lastTime) {
                if ((nowTime - this._lastTime) < 1000) {
                    this.tips("提示：您发送消息的频率过快，请稍后发送");
                    return false;
                }
            }
            this._lastTime = nowTime;

            //			this.focus();
            return true;
        },

        tips: function (word) {    
            this._yellowTipsBar.innerHTML = word;

            if (this._isShowTips) {
                if (this._timer) {
                    clearTimeout(this._timer);
                }
            }
             
            this._isShowTips = true;
            if (J.browser.ie && (J.browser.ie < 8)) {
                J.out("inputAndTipsHeight1: " + ChatBox.inputAndTipsHeight);
               this.resize();

            } else {
                $D.setStyle(this._chatBox_msgList, "bottom", ChatBox.tipsHeight + "px");
            }
            $D.show(this._yellowTipsBar);

            this._timer = window.setTimeout(J.bind(function () {
                this._isShowTips = false;
                if (J.browser.ie && (J.browser.ie < 8)) {

                    J.out("inputAndTipsHeight2: " + ChatBox.inputAndTipsHeight);
                    this.resize();

                } else {
                    $D.setStyle(this._chatBox_msgList, "bottom", 0 + "px");

                }
                $D.hide(this._yellowTipsBar);

            }, this), 1000);



        },

          resize: function () { 
					 
					 var chatBoxContext = this;
                    if (J.browser.ie && J.browser.ie < 8) {  
                        // fix ie6-7
                      
					   var height = chatBoxContext.getBodySize().height; 
                        var chatBoardHeight = height  - ChatBox.inputAndTipsHeight;
						 
                        if (chatBoardHeight < ChatBox.tipsHeight) {
                            chatBoardHeight = ChatBox.tipsHeight;
                        }
                        var msgListHeight = chatBoardHeight;
                        if (chatBoxContext._isShowTips) {
                            msgListHeight = chatBoardHeight - ChatBox.tipsHeight;
                        }

                        $D.setStyle(chatBoxContext._chatBox_chatBoard, "height", chatBoardHeight + "px");
                        $D.setStyle(chatBoxContext._chatBox_msgList, "height", msgListHeight + "px");
						

                        if (chatBoxContext.chatBoxType == "group") {
                            var groupMemberHeight = height - ChatBox.groupSpaceHeight;
                            if (groupMemberHeight < ChatBox.groupMemberTitleBarHeight) {
                                groupMemberHeight = ChatBox.groupMemberTitleBarHeight;
                            }
                            $D.setStyle(chatBoxContext._chatBox_groupMember, "height", groupMemberHeight + "px");
                            $D.setStyle(chatBoxContext._chatBox_groupMember_mainArea, "height", (groupMemberHeight - ChatBox.groupMemberTitleBarHeight) + "px");
                        }

                        J.out("<<<<< IE6-7: chatbox: resize ok");

                    }
                },
        // 自动对齐task
        autoAlign: function () {
            this.setBottom(35);
            $E.notifyObservers(chatBoxManager, "AutoAlign", this);
        },

        /*
        // 设置窗口位置
        setRight:function(right) {
        $D.setStyle(this._el, "right", right+"px");
        $D.setStyle(this._el, "left", "");
        },
        // 设置窗口位置
        setBottom:function(bottom) {
        if(J.browser.ie && J.browser.ie < 7){
        bottom = bottom - 11;
        }
        $D.setStyle(this._el, "bottom", bottom+"px");
        $D.setStyle(this._el, "top", "");
        },
        */
        // 设置窗口高度
        setHeight: function (height) {
            $D.setStyle(this.container, "height", height + "px");
            $D.setStyle(this._window_outer, "height", (height - 20) + "px");
			var titleBarHeight;
            if(J.browser.ie&&J.browser.ie<7){
            	titleBarHeight = 44;
            }
            else {
            	titleBarHeight = 42;//$D.getClientHeight(this._windowTitle);
            }
            if (this.option.hasOkButton) {
                $D.setStyle(this.body, "height", (height - 47 - titleBarHeight) + "px");
            }
            else {
                $D.setStyle(this.body, "height", (height - 17 - titleBarHeight) + "px");
            }

            this._height = height;
            if (this.getBoxStatus() !== "max") {
                this._restoreHeight = height;
            }
        },
        setTitleBarHeight: function (height) {
            $D.setStyle(this._windowTitle, "height", height + "px");
            $D.setStyle(this.body, "top", height + "px");
        },

        // 聚焦聊天输入框
        focus: function () {
            var context = this;

            if (context && context.isShow()) {
                if (context.editor && context.editor.isEnable()) {
                    context.editor.timeoutFocus();
                } else {
                    context.textFocus();
                }
            }

        },

        textFocus: function () {
            var context = this;
            window.setTimeout(function () {
                if (context && context.isShow()) {
                    if (context._textArea) {
                        context._textArea.focus();
                    }
                }
            }, 0)
        },

        //吞下数据追加聊天窗口内容
        appendMsg: function (option) {

            var dl,
				name,
				titleAllName,
				isAutoScroll = false,
				msgList = option.msgList;

            if (this._chatBox_msgList.scrollHeight - this._chatBox_msgList.scrollTop - this._chatBox_msgList.offsetHeight < 10) {
                isAutoScroll = true;
            }
            J.out("isAutoScroll:" + isAutoScroll);

            J.out("【追加消息数】：" + msgList + msgList.length);
 
            // 循环生成所有消息
            for (var i = 0; i < msgList.length; i++) {
                var msg = msgList[i];
                if (msg.type == 'group'){
                    msg.group_code = EQQ.Model.BuddyList.getGroupByGid(option.gid).code; 
				}
                dl = document.createElement("dl");

                var hasAttach = false;
                if (typeof (msg.attach) != 'undefined' && msg.attach){
                    hasAttach = true;
				}

                // 自己发送的
                if (msg.from_uin == 0) {
                    var contentHtml = '';
                    dl.className = "chatBox_myMsg";

                    contentHtml = EQQ.util.translateChatMsg(msg, true);


                    var contentStyle = EQQ.util.translateFontStyle(msg.content[msg.content.length - 1]);
                    var _showName = msg.sender.htmlShowName
                    if (hasAttach){
                        _showName = this.getTitleIcon(msg.attach);
					}

                    var html = '<dt class="msgHead" title="' + msg.sender.titleAllName + '">' + _showName + '<span style="margin-left:5px">' + msg.time + '</span></dt>\
								<dd class="msgBody defaultFontStyle" style="' + contentStyle + '">' + contentHtml + '</dd>';

                    dl.innerHTML = html;

                    // 别人发送的
                } else {
                    var uin = msg.from_uin;
                    if (!msg.sender) {
                        msg.sender = {};
                        uin = msg.sender_uin || msg.from_uin;
                        msg.sender.htmlShowName = uin;
                        msg.sender.titleAllName = uin + "<" + uin + ">";
                    }


                    dl.className = "chatBox_buddyMsg";

                    var contentHtml = '';

                    contentHtml = EQQ.util.translateChatMsg(msg, false);

                    var _showName = msg.sender.htmlShowName
                    var contentStyle = EQQ.util.translateFontStyle(msg.content[0]);

                    if (hasAttach) {
                        _showName = this.getTitleIcon(msg.attach); //'<span class="warnning_yellow">&nbsp;</span>';
                    }



                    var html = '<dt class="msgHead" title="' + msg.sender.titleAllName + '">' + _showName + '<span style="margin-left:5px">' + msg.time + '</span></dt>\
								<dd class="msgBody defaultFontStyle" style="' + contentStyle + '">' + contentHtml + '</dd>';
                    dl.innerHTML = html;



                }
                this._chatBox_msgList.appendChild(dl);

                J.out("【添加消息】：" + msg.content);


                //有附件(文件)消息
                if (hasAttach) {
                    this.parseAttach(msg.from_uin, msg.attach);
                }
            }


            if (isAutoScroll) {
                this.scrollToBottom();
            } else {

            }

        },

        scrollToBottom: function () {
            var chatBoxContext = this;
            window.setTimeout(function () {
                chatBoxContext._chatBox_msgList.scrollTop = chatBoxContext._chatBox_msgList.scrollHeight;
				J.out("scorll to top");
            }, 0);
        },


        getRange: function () {
            var selection = chatBoxManager.getSelection();
            if (!selection) {
                return null;
            }
            try {
                var range = selection.createRange
						? selection.createRange()
						: selection.getRangeAt(0);

                var rangeParent = null;
                if (range.commonAncestorContainer) {
                    rangeParent = range.commonAncestorContainer;
                } else if (range.parentElement) {
                    rangeParent = range.parentElement();
                }
                if (rangeParent
						&& (rangeParent.id == this._textArea.id
								|| rangeParent.parentNode.id == this._textArea.id || rangeParent.parentNode.parentNode.id == this._textArea.id)) {

                    return range;
                } else {
                    return null;
                }
                return range;
            } catch (e) {
                return null;
            }
        },

        // 保存光标
        saveRange: function () {
            var range = this.getRange();
            if (range) {
                lastRange = range;
            } else {
                return null;
            }

        },
        setMaskButton: function (mask) {
            switch (mask) {
                case "0":
                    this._maskButton.className = "chatBox_acceptButton";
                    break;
                case "1":
                    this._maskButton.className = "chatBox_maskButton";
                    break;
                case "2":
                    this._maskButton.className = "chatBox_maskButton";
                    break;
                default:
                    this._maskButton.className = "chatBox_maskButton";
                    break;
            }
        },
        setWarning: function (mask, preMask, groupMask) {
            var warnMsg = "";
            switch (mask) {
                case "0":
                    break;
                case "1":
                    if (preMask == "0") {
                        warnMsg = "<span class=\"warnning_yellow\"></span>您开启了屏蔽消息(接收不提示消息)功能，该提示仅本人可见。";
                    } else if (preMask == "2") {
                        warnMsg = "<span class=\"warnning_yellow\"></span>您切换到屏蔽消息(接收不提示消息)功能，该提示仅本人可见。";
                    }
                    this.addWarning(warnMsg);
                    break;
                case "2":
                    if (preMask == "0") {
                        warnMsg = "<span class=\"warnning_yellow\"></span>您开启了屏蔽消息(完全阻止群消息)功能，该提示仅本人可见。";
                    } else if (preMask == "1") {
                        warnMsg = "<span class=\"warnning_yellow\"></span>您切换到屏蔽消息(完全阻止群消息)功能，该提示仅本人可见。";
                    }
                    this.addWarning(warnMsg);
                    break;
                default:
                    break;
            }
            if (groupMask != "0") {
                warnMsg = "<span class=\"warnning_green\"></span>您的设置仅在群消息设置为[使用群自身的消息设置]下生效！";
                this.addWarning(warnMsg);
            }
        },
        addWarning: function (msg) {
            J.out(msg);
            var dl = document.createElement("dl");
            dl.className = "chatBox_buddyMsg";
            var html = '<dt class="msgHead" >' + this.toLocaleTimeString(new Date()) + '</dt>\
						<dd class="msgBody defaultFontStyle">' + msg + '</dd>';
            dl.innerHTML = html;
            this._chatBox_msgList.appendChild(dl);
            this.scrollToBottom();
        },
        toLocaleTimeString: function (timestamp) {
            if (J.isNumber(timestamp)) {
                timestamp = timestamp * 1000;
            }
            var date = new Date(timestamp);
            var year = date.getFullYear();  // 年
            var month = date.getMonth() + 1; // 月
            var day = date.getDate(); // 日
            return year.toString() + "-" + ((month > 9) ? month : ("0" + month)) + "-" + ((day > 9) ? day : ("0" + day)) + " " +
				  (new Date(timestamp).toLocaleTimeString());
        },
        parseAttach: function (from_uin, attach) {
            if (!attach)
                return false;

            if (attach.type === "sendfile") {

            } else if (attach.isread === false) {

                var _fileid = from_uin + '_' + attach.session_id;
                $E.on($D.id('agree_' + _fileid), "click", function (e) {
                    $E.notifyObservers(chatBoxManager, "agreeReceive", _fileid);
                });

                $E.on($D.id('refuse_' + _fileid), "click", function (e) {
                    $E.notifyObservers(chatBoxManager, "refuseReceive", _fileid);
                });
            }
        },
        getTitleIcon: function (attach) {
            if (attach.type) {
                if (attach.type === 'agfile')
                    return '<span class="icon_green">&nbsp;</span>';
                else if (attach.type === 'rffile' || attach.type === 'rtfile' || attach.type === 'wrffile')
                    return '<span class="icon_red">&nbsp;</span>';
                else
                    return '<span class="icon_yellow">&nbsp;</span>';

            }
        }
    });


    ChatBox.groupMemberTitleBarHeight = 20;
    ChatBox.tipsHeight = 25;
    ChatBox.inputAndTipsHeight = 105;
    ChatBox.groupSpaceHeight = 95;

    this.ChatBox = ChatBox;





});

/* == EQQ 登录presenter层 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2009.11.17 ----- */
 
 
// 呈献层：...
Jet().$package("EQQ.Presenter.LoginBox", function(J){
	var $E = J.event;
		
		
	this.init = function(){
		this.View = EQQ.View.LoginBox;
		this.View.init();
		
		
		
		
	};
		

	this.handle = function(uin){

	};
	this.openUrl = function(url){
		url = url || "";
		this.View.openUrl(url);
	};
	this.show = function(){
		this.View.show();
	};
	this.hide = function(){
		this.View.hide();
	};
	

});



		