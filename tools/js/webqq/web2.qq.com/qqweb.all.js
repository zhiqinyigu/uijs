/* == QQ Web 核心模块 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2009.11.17 ----- */

Jet().$package("qqweb", function(J){
	//== qqweb 的局部变量声明 =======================================================================================
	//------------------------------------------------------------------------------------------------------------
	var packageContext = this,
		$E = J.event,
		$D = J.dom;
		
	var dName;
	dName = window.location.host || "jetyu.qun.qq.com";

	//== qqweb 的私有方法 ===================================================================================
	//------------------------------------------------------------------------------------------------------------
	
	
	
	
	
	//== qqweb 的公共类和方法属性 ===================================================================================
	//------------------------------------------------------------------------------------------------------------
	
	this.init = function(){
		var option = {};
			
		// 给app创建名字空间
		J.$namespace("qqweb.app");
		this.portal.init(option);

		//this.runSystemApps();
		
		//setTimeout(this.runDefaultApps,1000);

	};
	
	
	
	
	
	this.CONST = {
		// 主域名
		MAIN_DOMAIN: "qq.com",
		
		// EQQ服务器url
		MAIN_URL: "http://"+dName+"/",

		// 连接服务器域名
		API_SERVER_URL: "http://web2-b.qq.com/api/",
		
		CGI_BIN_SERVER_URL: "http://web2-b.qq.com/cgi-bin/",
		
		CGI_BIN_SERVER_URL2: "http://web2.qq.com/cgi-bin/",
		
		API_PROXY_URL: "http://web2-b.qq.com/proxy.html?v=20100624001",
		
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
		// qzone服务器域名
		QZONE_SERVER_DOMAIN: "http://qzone.qq.com/",
		// qzone服务器域名
		QZONE_USER_SERVER_DOMAIN: "http://user.qzone.qq.com/",
		
		// qmail服务器域名
		QMAIL_SERVER_DOMAIN: "http://mail.qq.com/", 
		
		MAX_LOGIN_AMOUNT: 1,
		
		MAX_FAIL_AMOUNT: 2,
					
		// 同时加载头像的最大数量
		LOAD_AVATAR_AMOUNT: 50,
		
		//登录级别
		LOGIN_LEVEL_NONE:1,
		LOGIN_LEVEL_NOCHAT:2,
		LOGIN_LEVEL_ALL:3,
		
		
		WINDOW_FLAG_MIN:1,
		WINDOW_FLAG_NORMAL:2,
		WINDOW_FLAG_MAX:4,
		WINDOW_FLAG_CURRENT:8,
		WINDOW_FLAG_NOT_CURRENT:16

	};
	

	
});
//适应外部app所用的全局函数

//ptlogin所用的回调
function ptlogin2_onResize(width,height){

}










/* == qqweb 工具模块 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2010.3.29 ----- */
 
 
Jet().$package("qqweb.util", function(J){
	var packageContext = this,
		$D = J.dom,
		$E = J.event,
		$B = J.browser,
		$H = J.http;
	
		
	this.observer = {
		openInWebBrowser : function(e){
			e.preventDefault();
			var url = this.getAttribute("href");
			var title  = this.getAttribute("title");
			qqweb.portal.runApp("webBrowser", {url:url,isHideBar:true,title:title});
		}
		
	}
	this.getUserDefaultAvatar = function(size){
		size = size || 40;
		return "./style/images/avatar_default_" + size + "_" + size + ".gif";
	};
	this.code2state = function(code) {
		var map = {10:'online',20:'offline',30:'away',40:'hidden',50:'busy',60:'callme',70:'silent'};
		return map[code] || 'online';
	};
	this.getFaceServer = function(uin){
		return qqweb.CONST.AVATAR_SERVER_DOMAINS[(uin % 10)];
	};
	this.getUserAvatar = function(uin, cache){
		if(isNaN(uin)){
			return this.getDefaultUserAvatar();
		}
		return this.getFaceServer(uin) + "cgi/svr/face/getface?cache=1&type=1&fid=0&uin=" + uin;
	};
	this.getGroupAvatar = function(code, cache){
		return this.getFaceServer(code) + "cgi/svr/face/getface?cache=1&type=4&fid=0&uin=" + code;
	};
	
	this.getQzoneUrl = function(uin){
		return qqweb.CONST.QZONE_USER_SERVER_DOMAIN + uin;
	};
	
	this.getSendMailUrl = function(uin){
		return "http://mail.qq.com/cgi-bin/login?Fun=clientwrite&vm=pt&email=" + uin + "@qq.com";
	};
	this.getDefaultUserAvatar=function(){
		return "./app/appbar/images/app_eqq_icon.png";
	};
	this.setDefaultAppThumb=function(dom){
		dom.src="./app/appmanager/images/thumb_default.png";
	};
	this.IEAddOption=function(selectElement,optionObject){//optionObject = { 'value':v,'text':t,"selected":true/false}
		if($B.ie){
			var option=$D.node("option",{
				"value":optionObject.value,
				"text":optionObject.text
			});
			if(optionObject.selected){
				option['selected']="selected";
			}
			selectElement.options.add(option);
		}
	};
});

	$D=Jet().dom;
	var proxy=null;
	function setProxyPosition(targetObj){
	//console.info(targetObj);
	//console.info(proxy);
		//info(targetObj.left+","+targetObj.top);
		try{
		$D.setStyle(proxy,"left",targetObj.left+"px");
		$D.setStyle(proxy,"top",targetObj.top+"px");
		$D.setStyle(proxy,"width",targetObj.width+"px");
		$D.setStyle(proxy,"height",targetObj.height+"px");
		}catch(e){}
	}
	var t=0;
	var srcObj={};
	var targetObj={}
	function animate_do(){
		t++;//3次
		$D.show(proxy);
		Jet().out(t);
		if(t>=5){
			setProxyPosition(targetObj);
			$D.hide(proxy);
		}else{
			var dl=targetObj.left-srcObj.left;
			var dt=targetObj.top-srcObj.top;
			var dw=targetObj.width-srcObj.width;
			var dh=targetObj.height-srcObj.height;
			var n=0.8;
			var newObj={
				'left':srcObj.left+n*dl,
				'top':srcObj.top+n*dt,
				'width':srcObj.width+n*dw,
				'height':srcObj.height+n*dh
			};
			srcObj = newObj;
			setProxyPosition(newObj);
			setTimeout(animate_do,100);
		}
	}
	Jet().$package("qqweb.appconfig", function(J){
	var packageContext = this;
	this.appConfigList = {
		////settingCenter:设置中心显示配置类型：0不显示，1全局设置，2应用设置
		messageBox : {
			id : "messageBox",
			title : "消息盒子",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce : "消息盒子是一款QQ消息管理应用。它可以分类收纳未读的好友、群及邮件消息，同时还提供消息预览服务，点击预览内容，可一键发起聊天或查看邮件。",
			type : "js",
			css : "./app/messagebox/qqweb.app.messagebox.css",
			js : "./app/messagebox/qqweb.app.messagebox.js",
			needApp : ["eqq"],
			loginLevel:qqweb.CONST.LOGIN_LEVEL_ALL,
			width : 570,
			height: 500,
			settingCenter : 0  

		},
		
		qqMusic : {
			id : "qqMusic",
			title : "亦歌音乐",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce : "亦歌音乐是由亦歌提供的小型音乐播放器，它提供简单、快捷的在线音乐播放服务，无需用户操作即可连续不断地播放广受好评的歌曲。",
			type : "iframe",
			//url : "http://music.qq.com/musicbox/player/music_player_webqq.html"
			url:"http://www.1g1g.com/",
			flashMode:true,//有flash的app要特殊处理
			alterPage:"",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NONE,
			width : 240,
			height: 390,
			isSetCurrent :true,
			alterMode : true,//非当前窗口里需要用遮罩
			settingCenter : 0  

		},
		
		qqMblog : {
			id : "qqMblog",
			title : "腾讯微博",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce : "腾讯微博是由Tencent推出微型博客。它可以通过网页、QQ和手机访问，支持140个文字输入，随时随地记录生活点滴。",
			type : "iframe",
			url : "http://t.qq.com/",
			//width:840,
			defaultMode : "max",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NOCHAT,
			settingCenter : 0  

		},
		
		ccbMap : {
			id : "ccbMap",
			title : "三维地图",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce : "三维地图是由查查吧出品的三维深圳地图应用，它提供最全的深圳三维地图查询、深圳公交查询、公交路线、商家信息等。",
			type : "iframe",
			url:"http://sz.chachaba.com/api.html",
			width:540,
			height:240,
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NONE,
			settingCenter : 0  

		},
		
		qqMap : {
			id : "qqMap",
			title : "QQ地图",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce : "QQ地图提供互动地图、行车路线、公交路线像，可利用地区或企业名称作关键词搜索。",
			type : "iframe",
			url:"http://map.qq.com/",
			defaultMode : "max",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NONE,
			settingCenter : 0  

		},
		
		buddyManager : {
			id : "buddyManager",
			title : "好友管理",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce : "好友管理是一个快捷的批量管理QQ好友的应用。它提供批量删除、批量移动分组等功能，还可按条件展示好友，快速设置隐身权限。",
			type : "iframe",
			url : "http://web2.qq.com/myflqq/index.html",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_ALL,
			needApp : ["eqq"],
			settingCenter : 0 , 
			alterMode : true,//非当前窗口里需要用遮罩
			flashMode:true//有flash的app要特殊处理			
		},
		
		
		webBrowser : {
			id : "webBrowser",
			type : "js",
			title : "浏览网页",//浏览器
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce : "浏览器是WebQQ内嵌的小型浏览器，它提供网页浏览、热门书签、网络收藏夹及最近收藏等功能。",
			css : "./app/webbrowser/qqweb.app.webbrowser.css",
			js : "./app/webbrowser/qqweb.app.webbrowser.js",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NONE,
			defaultMode : "max",
			settingCenter : 0  

		},
		buddyFeed	: {
			id : "buddyFeed",
			type : "js",
			title : "好友近况",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce : "好友近况是一款基于QQ好友动态的SNS应用。它提供QQ好友的签名、QQ空间日志及印象的最新动态展示，支持评论签名和预览日志等功能。",
			css : "./app/buddyfeed/qqweb.app.buddyfeed.css",
			js : "./app/buddyfeed/qqweb.app.buddyfeed.js",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NOCHAT,
			width : 570,
			height: 500,
			settingCenter : 0  
		},
		mySignature	: {
			id : "mySignature",
			type : "js",
			title : "我的签名",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce : "我的签名是一款基于QQ签名的应用。它帮您记录最近三个月的QQ签名及好友回复情况，提供发表签名，管理签名等功能。",
			css : "./app/mysignature/qqweb.app.mysignature.css",
			js : "./app/mysignature/qqweb.app.mysignature.js",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NOCHAT,
			width : 570,
			height: 500,
			settingCenter : 0  
		},
		miniGames	: {
			id : "miniGames",
			type : "js",
			title : "游戏基地",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce : "游戏基地是多款Flash休闲小游戏的集合，它的游戏选自腾讯游戏频道，无需注册帐号，可随时随地享受欢乐。",
			css : "./app/minigames/qqweb.app.minigames.css",
			js : "./app/minigames/qqweb.app.minigames.js",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NONE,
			width:540,
			height:230,
			settingCenter : 0  
		},
		memo	: {
			id : "memo",
			type : "js",
			title : "便笺",
			provider : "Tencent 腾讯",
			ver : "1.0",
			introduce : "便笺是WebQQ团队开发的微型记事贴，它可以记录日程、提醒、留言等信息，内容自动漫游，方便您随时读取。",
			css : "./app/memo/style.css",
			js : "./app/memo/main.js",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NOCHAT,
			windowMode : "multi",
			settingCenter : 0  
		},		
		roseGarden	: {
			id : "roseGarden",
			type : "iframe",
			url : "http://1314.qq.com",
			title : "玫瑰小镇",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce : "玫瑰小镇是腾讯QQ游戏旗下的一款以以玫瑰园为背景的模拟经营类游戏。它模拟了鲜花的生长过程，历经获取花种、浇水、播种、浇水、除害、收获花朵、布置花园、出售等过程，带您充分享受鲜花养成带来的乐趣。",
			css : "./app/roseGarden/qqweb.app.roseGarden.css",
			js : "./app/roseGarden/qqweb.app.roseGarden.js",
			//width:820,
			//height:490,
			defaultMode : "max",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NOCHAT,
			settingCenter : 0  
		},
		qq_Music : {
			id : "qq_Music",
			title : "QQ音乐",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce : "QQ音乐是腾讯公司推出的一款免费网页音乐播放器，向广大用户提供方便流畅的在线音乐服务，海量乐库在线试听、超好用音乐管理，绿钻用户还可享受免费空间背景音乐设置等特权。",
			type : "iframe",
			url : "http://music.qq.com/musicbox/player/music_player_webqq.html",
			alterPage:"",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NOCHAT,
			//width : 700,
			//height: 450,
			defaultMode : "max",
			ieOnly:true,
			isSetCurrent :true,
			flashMode:true,//有flash的app要特殊处理
			settingCenter : 0  
		},
		qqDisk : {
			id : "qqDisk",
			title : "网络硬盘",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce : "网络硬盘是腾讯公司推出的在线存储服务。服务面向所有QQ用户，提供文件的存储、访问、共享、备份等功能。",
			type : "iframe",
			url : "http://webdisk.mail.qq.com/cgi-bin/login?lc=zh_CN&vm=pt&Fun=clientdiskpannel&ptlang=2052&ADUIN=25500128",
			alterPage:"",
			ieOnly:true,
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NOCHAT,
			width : 240,
			height: 390,
			isSetCurrent :true,
			settingCenter : 0  
		},
		miniNews : {
			id : "miniNews",
			title : "迷你新闻",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce : "迷你新闻是有腾讯网提供的今日要闻栏目，提供新闻、财经、娱乐、体育、汽车、读书、购物等领域的最新报道。",
			type : "iframe",
			url : "http://minisite2009.qq.com/othercity/all.htm",
			alterPage:"",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NONE,
			width : 456,
			height: 400,
			isSetCurrent :true,
			settingCenter : 0  
		},
		qqLive : {
			id : "qqLive",
			title : "QQLive",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce : "QQLive一款由腾讯开发的用于通过互联网进行大规模视频直播的软件。它采用了先进的P2P流媒体播放技术，可以确保在大量用户同时观看节目的情况下，节目依然流畅清晰。",
			type : "iframe",
			url : "http://live.qq.com/zb/index.html",
			alterPage:"",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NONE,
			defaultMode:"max",
			isSetCurrent :true,
			flashMode:true,//有flash的app要特殊处理
			settingCenter : 0  
		},
		qZone : {
			id : "qZone",
			title : "QQ空间",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce : "QQ空间是由腾讯公司出品的个性展示网站，具有博客的功能。在QQ空间上用户可以写日记，传图片，听音乐，写心情等多种方式展现自己。此外， 用户还可以根据自己的喜爱设定空间的背景、小挂件等，从而使每个空间都有自己的特色。",
			type : "js",
			url : "http://user.qzone.qq.com/",
			alterPage:"",
			css : "./app/qzone/qqweb.app.qzone.css",
			js : "./app/qzone/qqweb.app.qzone.js",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NOCHAT,
			defaultMode:"max",
			isSetCurrent :true,
			settingCenter : 0  
		},
		/*qqDict : {
			id : "qqDict",
			title : "QQ词典",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce : "QQ词典是腾讯公司最新推出的在线词典查询工具，它提供海量词汇的丰富解释，包括词语基本解释、网络解释和例句、百科等内容。",
			type : "iframe",
			url : "http://dict.qq.com/",
			alterPage:"",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NONE,
			defaultMode : "max",
			isSetCurrent :true,
			settingCenter : 0  
		},*/
		qqMail : {
			id : "qqMail",
			title : "QQ邮箱",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce : "QQ邮箱是腾讯公司提供的电子邮件服务，它采用高容错性的内部服务器架构，确保任何故障都不影响用户的使用，随时随地稳定登录邮箱，收发邮件通畅无阻。",
			type : "iframe",
			url : "http://mail.qq.com/cgi-bin/login?fun=passport&from=webqq",
			alterPage:"",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NOCHAT,
			defaultMode:"max",
			isSetCurrent :true,
			settingCenter : 0  
		},
		
		outlook : {
			id : "outlook",
			title : "Outlook",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce : "Office Outlook 是 Microsoft office 套装软件的组件之一，可以用它来收发电子邮件、管理联系人信息、记日记、安排日程、分配任务。",
			type : "iframe",
			url : "http://ig.gmodules.com/gadgets/ifr?view=home&url=http://hosting.gmodules.com/ig/gadgets/file/118137453981720645697/MSOutlookWidget.xml&nocache=0&lang=en&country=us&.lang=en&.country=us&synd=ig&mid=118&ifpctok=5982535097224412002&exp_rpc_js=1&exp_track_js=1&exp_ids=17259&parent=http://www.google.com&refresh=3600&libs=core:core.io:core.iglegacy:auth-refresh&is_signedin=1&up_DefaultView=Inbox",
			//defaultMode:"max",
			flashMode:true,//有flash的app要特殊处理
			width : 570,
			height: 490,
			ieOnly:true,
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NONE,
			alterMode : true,//非当前窗口里需要用遮罩
			settingCenter : 0  
		},
		weather	: {
			id : "weather",
			type : "js",
			title : "天气",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce: "天气是腾讯提供的天气预报小应用，它展示实时天气状况，支持自定义省份。",
			css : "./app/weather/style.css",
			js: "./app/weather/main.js",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NONE,
			settingCenter : 0  
		},
		soso: {
			id : "soso",
			type : "js",
			title : "搜索",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce: "搜索是SOSO搜索的快捷小应用，支持网页、新闻、图片、视频、音乐等内容。",
			css : "./app/soso/style.css",
			js: "./app/soso/main.js",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NONE,
			settingCenter : 0  
		},
		clock	: {
			id : "clock",
			type : "js",
			title : "时钟",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce: "时钟是由WebQQ提供的小应用，显示当前系统时间，您可以选择是否置顶展示。",
			css : "./app/clock/style.css",
			js: "./app/clock/main.js",
			windowMode : "multi",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NONE,
			settingCenter : 0  
		},
		//以下为系统APP(appLevel=='system')
		/*eqq : {
			id : "eqq",
			title : "QQ 2010",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce : "WebQQ是由Tencent提供的网页IM服务，它支持在线聊天、传输文件、截图、消息记录漫游等多种功能。",
			type : "js",
			appLevel : "system",
			css : "./style/eqq.main.css",
			js : "./js/eqq.all.js",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_ALL,
			settingCenter : 0  ,
			windowMode : "none",
			customLoginValidate : true
		},*/
		 
		
		eqq : {
			id : "eqq",
			title : "QQ",
			provider : "Tencent 腾讯",
			ver : "2.2",
			introduce : "WebQQ是由Tencent提供的网页IM服务，它支持在线聊天、传输文件、截图、消息记录漫游等多种功能。",
			type : "js",
			appLevel : "system",
			css : "",
			js : "./app/eqq/main.js",
			//loginLevel:qqweb.CONST.LOGIN_LEVEL_ALL,
			settingCenter : 0  ,
			windowMode : "none" 
			//customLoginValidate : false
			
			/*isTask : false,
            modeSwitch: false,
            dragable: false,
            resize: false,
            isFixedZIndex: false,
            width: 200,
            height: 500,
            hasCloseButton: false,
            hasMaxButton: false,
            hasPinUpButton: true*/
		},
		myPanel : {
			id : "myPanel",
			title : "我的面板",
			type : "js",
			appLevel : "system",
			css : "./app/mypanel/qqweb.app.mypanel.css",
			js : "./app/mypanel/qqweb.app.mypanel.js",
			windowMode : "none",
			customLoginValidate : true,
			settingCenter : 0  
			
		},
		
		// QQ云输入法
		qqWebIme : {
			id : "qqWebIme",
			title : "QQ云输入法",
			type : "js",
			appLevel : "system",
			css : "./app/qqwebime/style.css",
			js : "./app/qqwebime/main.js",
			windowMode : "none",
			customLoginValidate : false,
			settingCenter : 0  
		},
		
		appBar : {
			id : "appBar",
			title : "appBar",
			type : "js",
			appLevel : "system",
			css : "./app/appbar/qqweb.app.appbar.css",
			js : "./app/appbar/qqweb.app.appbar.js",
			windowMode : "none",
			settingCenter : 0  
		},
		appManager : {
			id : "appManager",
			title : "应用管理器",
			type : "js",
			appLevel : "system",
			css : "./app/appmanager/qqweb.app.appmanager.css",
			js : "./app/appmanager/qqweb.app.appmanager.js",
			hasCloseButton : true,
			hasMinButton : false,
			hasMaxButton : false,
			settingCenter : 0/*,
			hasCancelButton : true,
			hasOkButton :true*/
		},
		settingCenter : {
			id : "settingCenter",
			title : "设置中心",
			type : "js",
			appLevel : "system",
			css : "./app/settingcenter/qqweb.app.settingcenter.css",
			js : "./app/settingcenter/qqweb.app.settingcenter.js",
			hasCloseButton : true,
			hasMinButton : false,
			hasMaxButton : false,
			settingCenter : 0  
		},


		
		qqPhoto : {
			id : "qqPhoto",
			title : "QQ 相册",
			type : "js",
			appLevel : "system",
			css : "./app/qqphoto/style.css",
			js : "./app/qqphoto/main.js",
			hasMinButton : false,
			hasMaxButton : false,
			settingCenter : 0  
		},
		
		themeSetting : {
			id : "themeSetting",
			title : "主题设置",
			type : "js",
			appLevel : "system",
			css : "./app/themesetting/qqweb.app.themesetting.css",
			js : "./app/themesetting/qqweb.app.themesetting.js",
			hasMinButton : false,
			hasMaxButton : false,
			settingCenter : 0  
		},
		
		msgBubble : {
			id : "msgBubble",
			type : "js",
			appLevel : "system",
			title : "消息走马灯",
			css : "./app/messagebubble/qqweb.app.msgbubble.css",
			js : "./app/messagebubble/qqweb.app.msgbubble.js",
			settingCenter : 0  

		},
		chatLogViewer : {
			id : "chatLogViewer",
			title : "聊天记录管理器",
			type : "js",
			appLevel : "system",
			css : "./app/chatlogviewer/qqweb.app.chatlogviewer.css",
			js : "./app/chatlogviewer/qqweb.app.chatlogviewer.js",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_ALL,
			needApp : ["eqq"],
			settingCenter : 0  
		},
		userDetails : {
			id : "userDetails",
			title : "详细资料",
			type : "js",
			appLevel : "system",
			css : "./app/userdetails/qqweb.app.userdetails.css",
			js : "./app/userdetails/qqweb.app.userdetails.js",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NOCHAT,
			windowMode : "multi",
			needApp : ["eqq"],
			settingCenter : 0  
		},
		buddyFinder : {
			id : "buddyFinder",
			title : "查找好友",
			type : "js",
			appLevel : "system",
			css : "./app/buddyfinder/qqweb.app.buddyfinder.css",
			js : "./app/buddyfinder/qqweb.app.buddyfinder.js",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_ALL,
			width : 520,
			height : 360,
			modeSwitch : false,
			resize : false,
			hasMinButton : false,
			hasMaxButton : false,
			needApp : ["eqq"],
			settingCenter : 0  
		},
		buddyAdder : {
			id : "buddyAdder",
			title : "添加好友",
			type : "js",
			appLevel : "system",
			css : "./app/buddyadder/qqweb.app.buddyadder.css",
			js : "./app/buddyadder/qqweb.app.buddyadder.js",
			loginLevel:qqweb.CONST.LOGIN_LEVEL_ALL,
			windowMode : "multi",
			hasCloseButton : true,
			needApp : ["eqq"],
			settingCenter : 0  
		},

		gmail : {
			id : "gmail",
			title : "Gmail Preview",
			provider : "Tencent 腾讯",
			ver : "0.1",
			introduce : "在这里，您只需要输入帐号密码，就可以预览您的Gmail未读邮件",
			type : "js",
			css : "./app/gmail/qqweb.app.gmail.css",
			js : "./app/gmail/qqweb.app.gmail.js",
			width : 570,
			height: 500,
			loginLevel:qqweb.CONST.LOGIN_LEVEL_NONE
		},

		screenCapture:{
			id : "screenCapture",
			title : "截屏",
			type : "js",
			appLevel : "system",
			css : "./app/screencapture/qqweb.app.screencapture.css",
			js : "./app/screencapture/qqweb.app.screencapture.js",
			windowMode : "none",
			settingCenter : 0  
		}
		
	};
	this.getAppConfig = function(filter){//filter可为string或函数
		if(filter&&filter.call){//函数
			var ret=[];
			for(var i in this.appConfigList){
				var item=this.appConfigList[i];
				if(filter(item)){
					ret.push(item);
				}
			}
			return ret;
		}else{//字符串（不做判断）
			return this.appConfigList[filter];
		}
	};
});
/* == QQ Web config 模块 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2010.05.11 ----- */

Jet().$package("qqweb.config", function(J){
	var packageContext = this,
		$E = J.event,
		appbarSetupList = [], //appbar列表，如果为null则使用默认的列表
		/*groupMaskList = [],*/
		isSetupAppListLoaded = false;
		
	this.configList = {
		theme : {
			id : "purple" 
		},
		//默认appbar上的app列表，按顺序显示
		defaultSetupAppList:[
			'messageBox',
			'buddyFeed',
			'qq_Music',
			'webBrowser',
			'qqMblog',
			'gmail',
			'outlook',
			'qqMail',
			'qqDisk',
			'memo',
			'ccbMap',
			'qqMap',
			
			'weather',
			'soso',
			'clock',
			
			/*'qqDict',*/
			'clock',
			'qqMusic',
			'qqLive',
			'miniGames',
			'roseGarden',
			'miniNews',
			'qZone',
			'buddyManager',
			'mySignature'
		],
		setupAppList:[] //从服务器返回的用户配置
	};	
	 
	
	//发送配置数据后回调
	this.onSetConfig = function(data){   
		 
	};
	
	//获取QQWeb配置数据后回调
	this.onConfigGetSuc = function(data){ 
		
		if( !data.result ){
			return false;
		}
		 
		var result =  data.result.app || [];
		var i = 0;
		var appList = [];
		  
		for( var key in result){
		   
			if( key === 'QQWeb' ){
				for( var key2 in result[key] ){
					var _qqweb = result[key];
					if( key2 === 'theme' &&  _qqweb[key2] != '' ){
						qqweb.layout.applyTheme( _qqweb[key2]);
						this.configList.theme.id = _qqweb[key2];
					}else if( key2 === 'setupAppList' ){
						this.configList.setupAppList = _qqweb[key2];
						isSetupAppListLoaded = true;
					}else if( key2 === 'runStatus' ){
						
						this.configList.runStatus = _qqweb[key2];
					}
				}
			}else if( key === 'EQQ' ){
				/* groupMaskList = result[key].groupmask;*/
			}
		}
		if( isSetupAppListLoaded ){ 
			
			$E.notifyObservers(this, "GetUserAppListSuccess", this.getUserSetupAppList());
		}
		
		var level = qqweb.portal.getLoginLevel();
		$E.notifyObservers(qqweb.portal, "portalReady", level);
		   
	};
	 
 
	this.getUserSetupAppList = function(){
	   return  eval(this.configList.setupAppList);
	};
	
	this.getDefaultSetupAppList = function(){
		return  eval(this.configList.defaultSetupAppList);
	};
	
	this.isSetupAppListLoaded = function(){
		return isSetupAppListLoaded;
	};
	

	 
	this.init = function(){
	     if( typeof(J.cookie.get('skey')) === 'undefined' || J.cookie.get('skey') === '' ){
			return true;
		 }
		 var option = {
			    callback: 'qqweb.config.onConfigGetSuc',
		        action: 'get_all',
				retype : 2
		   };
		 qqweb.rpcService.sendGetConfig(option);
	};
	
	//qqweb中调用初始化
	this.initQQWeb = function(){

 
		var itemlist = {'QQWeb':['theme','setupAppList','runStatus']};				 
 
		var option = {
			callback: 'qqweb.config.onConfigGetSuc',
			action: 'get_custom',
			retype : 2 ,
			itemlist : J.json.stringify(itemlist)
		};
		qqweb.rpcService.sendGetConfig(option);
		
	};
	
	//EQQ中初始化
	this.initEQQ = function(){

		
		var itemlist = {'QQWeb':['theme','setupAppList','runStatus']};
		var option = {
			callback: 'qqweb.config.onConfigGetSuc',
			action: 'get_custom',				 
			retype : 2 ,
			itemlist : J.json.stringify(itemlist)  
		};
		qqweb.rpcService.sendGetConfig(option);
		
	}
	
	
});/* == EQQ 类模块 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2010.3.16 ----- */
 
 
Jet().$package("qqweb.businessClass", function(J){
	var packageContext = this,
		$D = J.dom,
		$E = J.event;
	
	
	// App类
	var App = new J.Class({
		init : function(option){
			//J.out(option.id+" initialing..");
			//J.console.info(option);
			if(!option.id){
				J.out("App: ["+option.title+"] 缺少 id !!!");
			}
			this.option = {
				id : option.id, 
				title : option.title || "未命名应用",
				type : option.type || "js",
				windowMode : option.windowMode || "single",
				url : option.url || null,
				width : option.width||600,
				height : option.height||500,
				
				hasCloseButton : J.isUndefined(option.hasCloseButton) ? true : option.hasCloseButton,
				
				hasMaxButton : J.isUndefined(option.hasMaxButton) ? true : option.hasMaxButton,
				hasMinButton : J.isUndefined(option.hasMinButton) ? true : option.hasMinButton,
				hasOkButton : option.hasOkButton || false,
				hasCancelButton : option.hasCancelButton || false,
				
				modeSwitch : J.isUndefined(option.modeSwitch)?true:option.modeSwitch,
				dragable : J.isUndefined(option.dragable)?true:option.dragable,
				dragProxy : J.isUndefined(option.dragProxy) ? qqweb.layout.getWindowDragProxy() : option.dragProxy,
				resize : J.isUndefined(option.resize)?true:option.resize,
				defaultMode : J.isUndefined(option.defaultMode)?"restore":option.defaultMode,
				flashMode : J.isUndefined(option.flashMode)?false:option.flashMode,
				loginLevel : J.isUndefined(option.loginLevel)?qqweb.CONST.LOGIN_LEVEL_NONE:option.loginLevel,
				customLoginValidate : option.customLoginValidate,
				alterMode : J.isUndefined(option.alterMode)?false:option.alterMode,
				ieOnly : J.isUndefined(option.ieOnly)?false:option.ieOnly
			};
			J.out("id:"+this.option.id+", hasCloseButton:"+this.option.hasCloseButton);
			this._isRunning = false;
			$E.notifyObservers(this, "init", this);

		},
		run : function(option){
			var appContext = this;
			option = option || {};

			// 扩展更新this.option
			J.extend(this.option, option);
			
			var level = qqweb.portal.getLoginLevel();
			if((!option.noValidateLogin) && this.option.loginLevel > level){//权限值越大权限越大
				if(this.option.customLoginValidate){
					$E.notifyObservers(this, "needLogin", {'has':this.option.loginLevel,'need':level});
				}else{
					qqweb.portal.showIntroduceWindow(this.option.id);
				}
				return;
			}
			if(this.isRunning()){
				
				$E.notifyObservers(this, "runAgain", option);
			}else{
				this._isRunning = true;
				if(this.option.windowMode === "none"){
					
				}
				else{
					this.createWindow(option);
				}
				
				if(this.option.type === "js"){
					var o = qqweb.portal.getAppConfig;
				}
				else if(this.option.type === "iframe"){
				
					//判断浏览器是否支持该应用
					if(this.option.ieOnly&&!J.browser.ie||this.option.id=='buddyManager'){return;}
					var html = '\
						<div id="container_iframeApp_' + this.window.getId() + '" class="content_area"><iframe id="iframeApp_' + this.window.getId() + '" class="iframeApp" src="about:blank" frameborder="no" allowtransparency="true" scrolling="auto" hidefocus ></iframe></div>\
					';
					
					this.window.setHtml(html);
					this._iframe = $D.id("iframeApp_" + this.window.getId());
					this._containerIframe = $D.id("container_iframeApp_" + this.window.getId());
					$E.on(this._iframe, "load", function(){
						$E.notifyObservers(appContext, "load");
					});
					
					var url = (option && option.url) || this.option.url;
					
					this._iframe.src = url;
					
					var onWindowResize = function(bodySize){
						if(appContext.option.flashMode && appContext.window!=qqweb.layout.getCurrentWindow()){
							//appContext.window.showAlterDom();
							//不是当前窗口并且是flash模式
							return;
						}
						appContext._resizeIframe(bodySize);
					};
					var onWindowShow = function(bodySize){
						var bodySize = appContext.window.getBodySize();
						appContext._resizeIframe(bodySize);
					};
					this._resizeIframe = function(size){
						$D.setStyle(this._iframe, "width", size.width+"px");
						$D.setStyle(this._iframe, "height", size.height+"px");
					};
					onWindowShow();
					$E.addObserver(this.window, "resize", onWindowResize);
					$E.addObserver(this.window, "show", onWindowShow);
					
				}
				var onRunAgain = function(bodySize){
					appContext.window.setCurrent();
					
				};
				if(this.option.windowMode === "single"){
					$E.addObserver(this, "runAgain", onRunAgain);
				}
				
				$E.notifyObservers(this, "runFirst", option);
				//J.out("appRun："+ this.option.id);
				$E.addObserver(this, "appExit", appContext.exit);
			}
			$E.notifyObservers(qqweb.portal, "appRun", this.option.id);
			$E.notifyObservers(this, "run", option);
			//------------------------ //TODO!!!
				/*
				var id=this.option.id;
				var l=this.option.appLevel;
				var t = this.option.title;
				if(l && l=="system"){//系统级app不需要增加
					return;
				}

				
				var appNode = $D.node("div",{
					"id":"quickPanel_"+id,
					"class":"quickPanel_showDesktopButton",
					"title":t
				});
				
				//var str="<img src='./images/app_"+id+"_icon.png' onerror='this.src=\"./images/app_messagebox_icon.png\"'>";
				$D.setStyle(appNode,"background","url(./images/app_messagebox_icon.png) no-repeat center center");
				$D.setStyle(appNode,"width","20px");
				$D.setStyle(appNode,"height","20px");
				//appNode.innerHTML=str;
				var quickPanelEl = document.getElementById("quickPanel");
				quickPanelEl.appendChild(appNode);
				*/
			//------------------------
		},
		
		createWindow : function(option){
			var appContext = this;
			//TODO 这里传给window的参数与option相关的不应重写一次（否则添加一个option，要修改多处地方）
			option = option || {};
			
			var window = new qqweb.businessClass.Window({
				appId : appContext.option.id,
				flashMode : appContext.option.flashMode,
				loginLevel :appContext.option.loginLevel,
				title : appContext.option.title,
				modeSwitch : appContext.option.modeSwitch,
				dragProxy : appContext.option.dragProxy,
				dragable : appContext.option.dragable,
				resize : appContext.option.resize,
				width: appContext.option.width,
				height: appContext.option.height,
				defaultMode : appContext.option.defaultMode,
				
				hasCloseButton : appContext.option.hasCloseButton,
				hasMaxButton : appContext.option.hasMaxButton,
				hasMinButton : appContext.option.hasMinButton,
				hasOkButton : appContext.option.hasOkButton,
				hasCancelButton : appContext.option.hasCancelButton,
				
				alterMode : appContext.option.alterMode,
				ieOnly : appContext.option.ieOnly,
				x:option.x,
				y:option.y
			});
			this.window = window;
			
			var observer = {
				onWindowClose : function(){
					appContext.destroy();
				},
				onExit : function(){
					//window.close();
					//appContext.destroy();
					$E.notifyObservers(window, "closeWindow", window);
				},
				onSetCurrent : function(){//flash mode使用
					window.setX(window._x);
					$D.setStyle(appContext._containerIframe,"height","99%");
					$D.setStyle(appContext._containerIframe,"width","100%");
					window.hideAlterDom();
				},
				onSetNotCurrent : function(){//flash mode使用
					$D.setStyle(appContext._iframe,"width","1px");
					$D.setStyle(appContext._iframe,"height","1px");
					$D.setStyle(appContext._containerIframe,"width","1px");
					$D.setStyle(appContext._containerIframe,"height","1px");
					window.showAlterDom();
				},
				onWindowMin : function(){
					if(appContext.option.flashMode){
						var tmpx = window.getX();
						window._x = tmpx;
						window.setX(-10000);
						window._x = tmpx;
					}
				}
			};
			$E.addObserver(this.window, "min", observer.onWindowMin);
			if(this.option.alterMode&&(J.browser.ie||!this.option.ieOnly)&&this.option.id!='buddyManager'){
				$E.addObserver(this.window, "setNotCurrent", observer.onSetNotCurrent);
			}
			if(this.option.flashMode&&(J.browser.ie||!this.option.ieOnly)&&this.option.id!='buddyManager'){
				$E.addObserver(this.window, "setCurrent", observer.onSetCurrent);
				$E.addObserver(this.window, "min", observer.onWindowMin);
			}
			$E.addObserver(window, "close", observer.onWindowClose);
			$E.addObserver(this, "exit", observer.onExit);
			return window;
		},

		// App设置为当前
		setCurrent : function(){
			$E.notifyObservers(this, "setCurrent");
			if(this.window){
				this.window.setCurrent();
			}
			/*else{
				this.widget.setCurrent();
			}*/
		},
		
		getCurrent : function(){
			return null;
		},
		
		// 判断是否正在运行
		isRunning : function(){
			return this._isRunning;
		},
		
		exit : function(){
			$E.notifyObservers(this, "exit");
			this.destroy();

		},
		
		destroy : function(){
			$E.notifyObservers(this, "destroy");
			this._isRunning = false;
			$E.notifyObservers(qqweb.portal, "appExit", this.option.id);
		}
	});
	




	this.App = App;
	
});

/* == QQ Web portal 模块 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2009.11.17 ----- */
 
Jet().$package("qqweb.portal", function(J){
	//== qqweb.portal 的局部变量声明 ================================================================================
	//------------------------------------------------------------------------------------------------------------
	var packageContext = this,
		$D = J.dom,
		$E = J.event,
		$H = J.http,
		$C = J.cookie,
		appConfigList,
		appLoading,
		
		loginLevel = qqweb.CONST.LOGIN_LEVEL_NONE,
		introduceWindow = false,//无权限时显示介绍页所用window
		loginWindow = false,
		
		//是否有登录成功
		isLoginSuccess = false,
		isLoadEqqScript = false,
		hasCloseHook = false,
		needExitConfirmCount;
		
		
	//== qqweb.portal 的私有方法 ===================================================================================
	//------------------------------------------------------------------------------------------------------------

	var runSystemApps = function(){
		// 启动appBar
		packageContext.runApp("appBar");
	};
	
	var runDefaultApps = function(){
		
		// 默认启动的App
		packageContext.runApp("weather");
		packageContext.runApp("soso");
		packageContext.runApp("clock");
		//packageContext.runApp("qqPhoto");
		//packageContext.runApp("ccbMap",{x:250,y:70});
		//packageContext.runApp("miniGames",{x:250,y:315});
		packageContext.runApp("eqq");

	};
		
	// 获取url中指定的要求运行的appid
	var getUrlRunParam = function(){
		var appJsonString = J.string.mapQuery(window.location.search).run || "";
		if(appJsonString){
			var urlApp = J.json.parse(appJsonString);
			return urlApp;
		}
		
	};
	var runUrlApps = function(){
		// 通过url运行app的部分
		var urlApp = getUrlRunParam();
		for(var id in urlApp){
			qqweb.portal.runApp(id, urlApp[id]);
		}
		
	};
		
	var setLoginLevel = function(level){//暂时处理成不允许从高设成低..
		if(level<loginLevel)return;
		var eqq=packageContext.getApp("eqq");
		
		if(eqq && eqq.getIsLogin()){
			$E.notifyObservers(qqweb.portal,"loginLevelChanged",qqweb.CONST.LOGIN_LEVEL_ALL);
		}else{
			//if(window.location.search.indexOf("eqq") != -1){
				//if($C.get("ptwebqq"))level = qqweb.CONST.LOGIN_LEVEL_ALL;
			//}
			$E.notifyObservers(qqweb.portal,"loginLevelChanged",level);
		} 
		loginLevel = level;
		
		
	};
	
	
		
	//== qqweb.portal 的观察者方法 =================================================================================
	//------------------------------------------------------------------------------------------------------------
	
	
	// 为好友近况特殊处理的代码
	var forBuddyFeeds = function(){
		var bodyEl=document.body,
			divEl = $D.node("div");

		var html = '<iframe id="forBuddyFeeds" class="hiddenIframe" name="forBuddyFeeds" width="1" height="1" src="http://qqweb-b.qq.com/api/get_buddy_feed?businesstype=10"></iframe>';
		divEl.innerHTML=html;
		bodyEl.appendChild(divEl);
	};
	
	var observer ={
		
		// portal ready时的事件。。。
		onPortalReady : function(level){
			
			if(level > qqweb.CONST.LOGIN_LEVEL_NONE){
				//qqweb.config.initQQWeb();
			}
	
			// 运行系统app
			runSystemApps();
			
			// 运行默认app
			if(window.location.search.indexOf("nodefault") === -1){
				var runStatus = qqweb.config.configList.runStatus;
				
				if(runStatus){
					
					for(var i=0; i<runStatus.appList.length; i++){
						var option = runStatus.appList[i];
						
						if(option.appId === "eqq"){
							qqweb.portal.runApp(option.appId, {
								isHide : option.isHide
								
							});
							//alert(2)
							
						}else{
							if(option.width){
								qqweb.portal.runApp(option.appId, {
									defaultMode : option.defaultMode,
									x : option.x,
									y : option.y,
									width : option.width,
									height : option.height
									
								});
							}else{
								qqweb.portal.runApp(option.appId, {
									x : option.x,
									y : option.y
									
								});
							}
						}
						
						
						
					}
					if(runStatus.currentApp){
						qqweb.portal.runApp(runStatus.currentApp);
					}
					
					
				}else{
					
					runDefaultApps();
				}
				
			}
			
			// 运行url中指定的app
			runUrlApps();
			
			
		},
		
		
		// 退出的操作执行成功后。。。
		onExitSuccess : function(){
			location.reload();
			//packageContext.returnLogin();
		},
		onGetLoginInfoError : function(){
			setLoginLevel(qqweb.CONST.LOGIN_LEVEL_NONE);
			var level = packageContext.getLoginLevel();
			$E.notifyObservers(qqweb.portal, "portalReady", level);
			
			
		},
		onGetLoginInfoSuccess : function() {
			setLoginLevel(qqweb.CONST.LOGIN_LEVEL_NOCHAT);
			var level = packageContext.getLoginLevel();
			//$E.notifyObservers(qqweb.portal, "portalReady", level);

			qqweb.config.initQQWeb();
			
			/*
			if(level > qqweb.CONST.LOGIN_LEVEL_NONE){
				qqweb.config.initQQWeb();
			}*/
			
			
		}
	
	};
	
	
	
	
	//== qqweb.portal 的公共类和方法 ===================================================================================
	//------------------------------------------------------------------------------------------------------------
	
	
	
	// 初始化方法
	this.init = function(option){
		option = {};
		
		appLoading = {};
		
		needExitConfirmCount = 0;

		$E.addObserver(qqweb.portal, "exitSuccess", observer.onExitSuccess);

		$E.addObserver(qqweb.rpcService, "GetLoginInfoError", observer.onGetLoginInfoError);
		$E.addObserver(qqweb.rpcService, "GetLoginInfoSuccess", observer.onGetLoginInfoSuccess);
		
		$E.addObserver(qqweb.portal, "portalReady", observer.onPortalReady);
		//TODO 强登录
		//$E.addObserver(qqweb.rpcService, "GetBuddyListError", observer.onGetLoginInfoError);			
		
		qqweb.layout.init();
		qqweb.sound.init();
		
		
		// 启动myPanel验证登录状态
		this.runApp("myPanel");
		
		
	};
		
		
	this.getLoginLevel = function(){
		var eqq=this.getApp("eqq");
		
		if(eqq && eqq.getIsLogin()){
			return qqweb.CONST.LOGIN_LEVEL_ALL;
		}
		if(window.location.search.indexOf("eqq")!=-1){
			//if($C.get("ptwebqq"))return qqweb.CONST.LOGIN_LEVEL_ALL;
		}
		return loginLevel;
	};
	
	
	//注意，此函数必须是用户强登录后才调用！！！
	this.reRunApps=function(apps){
		//TODO bad smell...
		
		qqweb.portal.init();
		setLoginLevel(qqweb.CONST.LOGIN_LEVEL_ALL);
		/*
		qqweb.portal.runApp("myPanel",{"noValidateLogin":true});
		*/
		var appArray=apps.split(",");
		for(var i=0; i<appArray.length; ++i){
			//TODO 处理好这个逻辑BAD SMELL
			//if(appArray[i]=="messageBox")continue;
			qqweb.portal.runApp(appArray[i],{"noValidateLogin":true});
		}
		
		//qqweb.config.initEQQ();
		
		//qqweb.app.eqq.loginEQQ();
	   if( isLoadEqqScript ){	 	  
			EQQ.loginEQQ();
	   }else{ 
			//isLoadEqqScript = true;					
			J.http.loadCss("style/eqq.main.css?t="+(new Date().getTime()));
			J.http.loadScript( "./js/eqq.all.js?t="+(new Date().getTime()),{
				//callback参数替换
				query : '',
				onSuccess : function(data){
					isLoadEqqScript = true;
					EQQ.loginEQQ();
				},
				onError : function(data){
					 
				}
			});					
	   }
		
		forBuddyFeeds();
		
		
	};
	
	this.hideLoginWindow=function(){
		try{
			this.hideIntroduceWindow();
		}catch(e){}
		try{
			loginWindow.close();
		}catch(e){}
	};
	this.showLoginWindow=function(appId){
		var config={
			width:400,
			height:380,
			title:"登录WebQQ",
			hasCloseButton:true,
			isSetCurrent:true,
			//type:"iframe",
			dragable : true,
			src:"http://ui.ptlogin2.qq.com/cgi-bin/login?style=4&appid=1002101&enable_qlogin=0&no_verifyimg=1&s_url=http://web.qq.com/main.shtml?direct__2&f_url=loginerroralert"
		};
		//var jumpUrl=encodeURIComponent(window.location.protocol+"//"+window.location.host+window.location.pathname+"?run=eqq,"+appId);
		appId = appId?appId:"eqq";
		var apps=((appId=="eqq")?appId:("eqq,"+appId));
		var jumpUrl=encodeURIComponent(window.location.protocol+"//"+window.location.host+"/loginproxy.html"+"?run="+apps);
		config.src="http://ui.ptlogin2.qq.com/cgi-bin/login?target=self&style=4&appid=1002101&enable_qlogin=0&no_verifyimg=1&s_url="
			+jumpUrl
			+"&f_url=loginerroralert"
		if(!loginWindow || !loginWindow.isShow()){
			loginWindow = new qqweb.businessClass.Window(config);
		}else{
			loginWindow.setCurrent();
		}
		var html = '\
			<div class="content_area"><div class="login_window_wrap">\
			<iframe id="ifram_login"  src="'+config.src+'" frameborder="no" allowtransparency="true" scrolling="hidden" hidefocus ></iframe>\
					</div></div>';
		loginWindow.setHtml(html);
		loginWindow.show();
	};
	this.hideIntroduceWindow=function(){
		if(!introduceWindow)return;
		introduceWindow.close();
	};
	this.showIntroduceWindow =function(appId){
		var appConfig = qqweb.appconfig.getAppConfig(appId);
		var tmpHtml = '<div class="content_area"><div class="intro_window_wrap">\
		<div id="intro_window_area" class="intro_window_area" title="<%=introduce%>">\
			<h3><%=title%></h3>\
			<%=introduce%>\
		</div>\
		<div style="padding: 50px; text-align: center; font-weight: bold;">hi,您还没有登录哦，赶快<a id="portal_login_btn" href="###">登录</a>尝试一下吧！</div>\
		</div></div>';
		appConfig.flashMode=false;
		appConfig.windowMode = "single";
		appConfig.dragable = true;
		appConfig.hasCloseButton = true;
		appConfig.defaultMode = "restore";
		appConfig.isSetCurrent=true;
		appConfig.width=false;//用默认大小
		appConfig.height=false;//用默认大小
		
		if(!introduceWindow || !introduceWindow.isShow()){
			introduceWindow = new qqweb.businessClass.Window(appConfig);
		}
		introduceWindow.setTitle(appConfig.title);
		introduceWindow.setCurrent()
		introduceWindow.setHtml(J.string.template(tmpHtml,appConfig));
		var onLoginButtonClicked=function(){
			packageContext.showLoginWindow(appId);
		};
		var instro_area=$D.id("intro_window_area");
		var background="url(./app/appmanager/images/thumb_"+appConfig.id+".png)";
		$D.setStyle(instro_area,"backgroundImage",background);
		var d=$D.id("portal_login_btn");
		$E.on(d,"click",function(){packageContext.showLoginWindow(appId);})//onLoginButtonClicked);
	};
	
	
	// 获取cookie中的uin
	this.getCookieUin = function(){
		var uin = J.cookie.get("uin", qqweb.CONST.MAIN_DOMAIN);
		uin = parseInt(uin.substr(1), 10);
		J.out("uin:" + uin);
		return uin;
	};
		
	// 获取cookie中的skey
	this.getCookieSkey = function(){
		return J.cookie.get("skey", qqweb.CONST.MAIN_DOMAIN);
	};
	

		
	// 运行一个app
	this.runApp = function(id, option){
		var appConfig = this.getAppConfig(id);
		if(!appConfig)return;
		var app = this.getApp(id);
		
		/*
		if(appConfig.needApp){
			for(var i=0;i<appConfig.needApp.length;++i){
				var appTmp = this.getApp(appConfig.needApp[i]);
				if(appTmp && appTmp.isRunning())continue;
				qqweb.portal.runApp(appConfig.needApp[i]);
			}
		}
		*/
		
		// 如果app已经加载注册
		if(app){
			if(app.run){
				app.run(option);
			}

		}else if(appConfig){
			if(appConfig.type === "js"){
				
				this.loadApp(appConfig, option);
			
			}
			else if(appConfig.type === "iframe"){
				qqweb.app[id] = new qqweb.businessClass.App(appConfig);
				qqweb.portal.runApp(id, option);
			}

		}
	};
		
		
		
	// 添加一个app的方法
	this.loadApp = function(appConfig, option){
		appConfig = appConfig || {};
		if(!this.getAppLoading(appConfig.id)){
			this.setAppLoading(appConfig.id);
			if(appConfig.css){
				$H.loadCss(appConfig.css);
			}
			if(appConfig.js){
				$H.loadScript(appConfig.js, {
					onSuccess : function(o){
						var app = qqweb.portal.getApp(appConfig.id);
						if(app){
							if(app.run){
								app.run(option);
							}else{
								J.out(appConfig.id + " : 此 App 没有run方法!");
							}
							
						}else{
							J.out("App 运行失败!");
						}
					}
				});
			}
		}
	};
	
	//@Desperate 已废弃
	//  由于所有配置都通过一个文件保存，不再动态获取，这里不需要再保存一个配置
	//  运用场景：appBar获取用户定义的appConfig
	//  但实际上这个远程只能获取id，而不能获取具体config，所以传进来的只是id而非config
	this.addAppConfig = function(appConfig){
		//qqweb.appconfig.addAppConfig(appConfig);
	};
	
	// 获取app的配置列表对象
	this.getAppConfigList = function(){
		return qqweb.appconfig.appConfigList;
	};
	
	// 获取一个appConfig的方法
	this.getAppConfig = function(id){
		return qqweb.appconfig.getAppConfig(id);
	};
		
	// 获取一个app的方法
	this.getApp = function(id){
		return qqweb.app[id];
	};
	
	// 
	this.setAppLoading = function(id){
		return appLoading[id] = true;
	};
	
	// 
	this.getAppLoading = function(id){
		return appLoading[id];
	};
		
   this.setIsLoginSuccess = function(flag){
	   isLoginSuccess = flag; 
   };
   this.getIsLoginSuccess = function(flag){
	    return  isLoginSuccess;
   };
		
	// 统一确认提示样式
	this.confirm = function(msg){
		return window.confirm("== WebQQ 确认提示 ====================\n\n"+msg);
	};
		
	// 统一提示样式
	this.alert = function(msg){
		return window.alert("== WebQQ 提示 ====================\n\n"+msg);
	};
	
	
	
	
	//关闭钩子Hook
	this.closeHook= function(e){
	    var message = "== WebQQ 警告提示 ====================\n\n" + "执行此操作后将丢失本次聊天中的信息，确认继续？\n\n";
	    if(J.browser.safari){
	        return message;
	    }else{
		    e.returnValue = message;
	    }
	};
	
	//添加关闭时的钩子Hook
	this.addCloseHook= function(){
		if(!hasCloseHook){
			hasCloseHook = true;
		    $E.on(window, "beforeunload", this.closeHook);
		    $E.on(window, "unload", function(){
			
			});
		}
		
	};
	//删除关闭时的钩子Hook
	this.removeCloseHook= function(){
	    $E.off(window, "beforeunload" );
	    hasCloseHook = false;
	};
	//获取钩子状态
	this.getCloseHook=function(){
		return hasCloseHook;
	};
	
	
	this.addExitConfirm = function(n){
		needExitConfirmCount += (n || 1);
		if(needExitConfirmCount > 0){
			this.addCloseHook();
		}
		return needExitConfirmCount;
	};
	
	this.removeExitConfirm = function(n){
		needExitConfirmCount -= (n || 1);
		if(needExitConfirmCount < 1){
			this.removeCloseHook();
		}
		return needExitConfirmCount;
	};
	
	this.getExitConfirm = function(){
		return needExitConfirmCount;
	};
	
	// 点击退出QQWeb
	this.exit = function(){
		if(this.getExitConfirm() > 0){
			if(this.confirm("您确认要离开 WebQQ 吗？")){
	        	// 解除页面钩子
				this.removeCloseHook();
	        }else{
	        	return;
	        }
		}
		
		
		var currentWindow = qqweb.layout.getCurrentWindow();
		var currentAppId = "";
		if(currentWindow){
			currentAppId = currentWindow.getAppId();
		}
		
		/**/
		var option = {
			/*action: 'set', */
			retype : 3,
			callback : 'parent.qqweb.portal.onSendDesktopLayoutSuccess',		//parent.qqweb.layout.onSendThemeSuccess 跨域
			app:'QQWeb',
			itemlist :J.json.stringify({runStatus:this.getQQWebStatus()})
		};
		qqweb.rpcService.sendSetConfig(option);
		
		
		
		
		
		
		
	};
	
	this.getQQWebStatus = function(){
		
		
		var currentWindow = qqweb.layout.getCurrentWindow();
		var currentAppId = "";
		if(currentWindow){
			currentAppId = currentWindow.getAppId();
		}
		var status={
			currentAppId:currentAppId,
			appList:[]
		};
		
		var windowList = qqweb.layout.getWindowList();
		
		for(var i=0; i<windowList.length; i++){
			var win = windowList[i];
			var appId = win.getAppId();

			if(appId === "eqq"){

			}else{
				var x = win.getX();
				var y = win.getY();
				
				if(win.windowType === "window"){
					var defaultMode = win.getBoxStatus();
					if(defaultMode !== "min"){
						var width = win.getWidth();
						var height = win.getHeight();
						appStatus = {
							appId : appId,
							defaultMode:defaultMode,
							x:x,
							y:y,
							width:width,
							height:height
						};
						status.appList.push(appStatus);
					}
					

				}else if(win.windowType === "widget"){
					appStatus = {
						appId : appId,
						x:x,
						y:y
					};
					status.appList.push(appStatus);
				}
			}
		}
		
		if(qqweb.app.eqq){
			appStatus = {
				appId : "eqq",
				isHide:String(qqweb.app.eqq.isSideBarPinDown())
			};
			status.appList.push(appStatus);
		}
		
		return status;
	};
		
	
	
	
	
	
	this.onSendDesktopLayoutSuccess = function(){
		
		// 通知广播各个观察者
		$E.notifyObservers(qqweb.portal,"exit");
		// 删除qqweb相关cookie
        J.cookie.remove("ptwebqq", qqweb.CONST.MAIN_DOMAIN);
        J.cookie.remove("skey", qqweb.CONST.MAIN_DOMAIN);
        
        // 发送登出请求
        setTimeout(function(){
        	 $E.notifyObservers(qqweb.portal,"exitSuccess");
        },1000);
        
	};
		
	//跳转到登陆
	this.returnLogin = function(){
        window.location="./";
    };
	

		
		



});



/* == QQ Web sound 模块 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2009.12.02 ----- */
 
Jet().$package("qqweb.sound", function(J){
	var $E = J.event,
		$H = J.http;
	
	var isMute = false,
		volume,
		soundObjList = [],
		curIdSound = null,
		isSwfSoundLoad = false;
		
	qqweb.sound = {
		// qqweb.portal的初始化方法
		init: function(option){ 
			 J.sound.onload = function(){ 
				isSwfSoundLoad = true;
			 }	
			  J.sound.embedSWF( './swf/swfsound.swf' );
			isMute = false;
		},

		
		playSound: function(url,streamAndAutoPlay){
			if(this.isMute()){// 被静音
				return false;
			}
			if( url == '' ){
			   return false;	
			}
			streamAndAutoPlay = streamAndAutoPlay || false; 
			if( typeof(soundObjList[url]) === 'undefined' ){
			      if( !isSwfSoundLoad ){
					 return false;  
				  }
				  soundObjList[url] = curIdSound = J.sound.loadSound( url, streamAndAutoPlay, qqweb.sound.playSoundObj );		
			}else{  		 
			     curIdSound =  soundObjList[url];
				 qqweb.sound.playSoundObj( );
			}
			
		},
		playSoundObj : function( ){

				J.sound.startSound(curIdSound);	
			 	
		},
		setMute: function(flag){
			isMute = flag;
		},
		
		isMute: function(){
			return isMute;
		},
		
		setVol: function(value){
			volume = value;
		},
		getVol: function(){
			return volume;
		}
		
		
	};


});

/* == EQQ 类模块 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2010.3.16 ----- */
 
 
Jet().$package("qqweb.businessClass", function(J){
	var packageContext = this,
		$D = J.dom,
		$E = J.event;
		
	
	
	// Panel类
	var Panel = new J.Class({
		init:function(option){
			var node;
			
			option = option || {};
			this.id = option.id;
			this.name = option.name;
			this.container = option.container;
			this.body = option.body || option.container;
			
			option.html = option.html || "";
			if(option.html){
				this.setHtml(option.html);
			}
			if($D.isShow(this.container)){
				this.show();
			}else{
				this.hide();
			}

		},
		showName:function(){
			alert(this.name);
		},
		setHtml: function(html){
			this.html = html;
			this.body.innerHTML = html;
		},
		append: function(node){
			this.body.appendChild(node);
		},

		getSize:function(){
			return {
				width:$D.getClientWidth(this.container),
				height:$D.getClientHeight(this.container)
			};
		},
		getBodySize:function(){
			
			return {
				width:$D.getClientWidth(this.body),
				height:$D.getClientHeight(this.body)
			};
		},
		show : function(){
			$D.show(this.container);
			$E.notifyObservers(this, "show", this.getBodySize());
			this._isShow = true;
		},
		hide : function(){
			$D.hide(this.container);
			$E.notifyObservers(this, "hide");
			this._isShow = false;
		},
		isShow : function(){
			return this._isShow;
		},
		toggleShow : function(){
			if(this.isShow()){
				this.hide();
			}else{
				this.show();
			}
		},
		getZIndex : function(){
			return this._zIndex;
		},
		
		setZIndex : function(zIndex){
			$D.setStyle(this.container, "zIndex", zIndex);
			this._zIndex = zIndex;
		},
		
		setTopZIndex : function(){
			this.setZIndex(qqweb.layout.getTopZIndex());
		},
		setXY : function(x, y){
			this.setX(x);
			this.setY(y);
		},
		// 设置窗口位置
		setX: function(x) {
			$D.setStyle(this.container, "left", x + "px");
		},
		// 设置窗口位置
		setY: function(y) {
			$D.setStyle(this.container, "top", y + "px");
		},
		
		setWidth : function(w){
			$D.setStyle(this.container, "width", w + "px");
		},
		getWidth : function(){
			return parseInt($D.getStyle(this.container, "width"));
		},
		setHeight : function(h){
			$D.setStyle(this.container, "height", h + "px");
		},
		getHeight : function(){
			return parseInt($D.getStyle(this.container, "height"));
		}
		
	});
	




	this.Panel = Panel;
	
});

/* == EQQ 类模块 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2010.3.16 ----- */
 
 
Jet().$package("qqweb.businessClass", function(J){
	var packageContext = this,
		$D = J.dom,
		$E = J.event,
		currentPopupBox = null;
		
	
	
	// PopupBox类
	var PopupBox = new J.Class({
		init:function(option){
			var context = this;
			var node;
			
			option = option || {};
			this.id = option.id;
			this.container = option.container;
			this.body = option.body || option.container;
			this.catchMouseUp = true;
			option.html = option.html || "";
			if(option.html){
				this.setHtml(option.html);
			}
			
			if(option.noCatchMouseUp){
				this.catchMouseUp = false;
			}
			
			this.onDocumentKeydown = function(e){
				if(e.keyCode === 27){
					// 阻止默认事件,因为想ff下，esc可能会有stop页面的功能
					e.preventDefault();
					context.hide();
				}
			};
			this.onMouseUp = function(){
				if(context.isShow()){
					context.hide();
				}
			};
			this.onDocumentClick = function(){
				context.hide();
			};
			this.onWindowResize = function(){
				context.hide();
			};
			
			
			
			if($D.isShow(this.container)){
				this.show();
			}else{
				this.hide();
			}
		},

		showName:function(){
			alert(this.name);
		},
		setHtml: function(html){
			this.html = html;
			this.body.innerHTML = html;
		},
		show : function(){
			if(currentPopupBox){
				currentPopupBox.hide();
			}
			
			$D.show(this.container);
			if(this.catchMouseUp){
				$E.on(document, "mouseup", this.onMouseUp);
			}else{
				$E.off(document, "mouseup", this.onMouseUp);
			}
			$E.on(document, "click", this.onDocumentClick);
			$E.on(document, "keydown", this.onDocumentKeydown);
			$E.on(window, "resize", this.onWindowResize);
			currentPopupBox = this;

			this._isShow = true;
			
			$E.notifyObservers(this, "show");

		},
		hide : function(){
			$E.off(document, "click", this.onDocumentClick);
			$E.off(document, "keydown", this.onDocumentKeydown);
			$E.off(window, "resize", this.onWindowResize);
			$E.off(document, "mouseup", this.onMouseUp);
			$D.hide(this.container);
			if(currentPopupBox){
				if(currentPopupBox !== this){
					currentPopupBox.hide();
				}
				currentPopupBox = null;
			}
			this._isShow = false;
			
			$E.notifyObservers(this, "hide");
		},
		isShow : function(){
			return this._isShow;
		},
		toggleShow : function(){
			if(this.isShow()){
				this.hide();
			}else{
				this.show();
			}
		},
		getZIndex : function(){
			return this._zIndex;
		},
		
		setZIndex : function(zIndex){
			$D.setStyle(this.container, "zIndex", zIndex);
			this._zIndex = zIndex;
		},
		
		setTopZIndex : function(){
			this.setZIndex(qqweb.layout.getTopZIndex());
		},
		setXY : function(x, y){
			this.setX(x);
			this.setY(y);
		},
		// 设置窗口位置
		setX: function(x) {
			$D.setStyle(this.container, "left", x + "px");
		},
		// 设置窗口位置
		setY: function(y) {
			$D.setStyle(this.container, "top", y + "px");
		},
		setWidth : function(w){
			$D.setStyle(this.container, "width", w + "px");
		},
		getWidth : function(){
			return parseInt($D.getStyle(this.container, "width"));
		},
		setHeight : function(h){
			$D.setStyle(this.container, "height", h + "px");
		},
		getHeight : function(){
			return parseInt($D.getStyle(this.container, "height"));
		}
	});
	




	this.PopupBox = PopupBox;
	
});

/* == EQQ 类模块 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2010.3.16 ----- */


Jet().$package("qqweb.businessClass", function (J) {
    var packageContext = this,
		$D = J.dom,
		$E = J.event,
		//当默认开启多个app后，防止用户打开第一个app时候，位置不正确
		openWindowNum = 5,
		dragProxy;

    var createDragProxy = function () {
        var maskEl = $D.node("div", {
            "class": "dragMask"
        });
        var proxyEl = $D.node("div", {
            "class": "dragProxy"
        });
        maskEl.appendChild(proxyEl);
        $D.getDoc().body.appendChild(maskEl);
        return { maskEl: maskEl, proxyEl: proxyEl };
    };

    var getDragProxy = function () {
        if (!dragProxy) {
            dragProxy = createDragProxy();
        }
        return dragProxy;
    };


    // Window类
    var Window = new J.Class({

		windowType : "window",
        _zIndex: 1,
        _inBorder: 5,
        _outBorder: 5,

        //拖拽边距控制
        _leftMargin: 0,
        _topMargin: 65,
        _rightMargin: 0,
        _bottomMargin: 0,
		
		_windowFlag: 0,

        // 聊天窗位置自动闪避距离（为了不把好友列表挡住）
		_leftArea: 250,
		
		// 15
		_topArea : 5,
        _rightArea: 200,
        _bottomArea: 40,

        init: function (option) { 
            var windowContext = this;
            option = this.parseOption(option);

            this.type = option.type;

            // 窗口默认尺寸
            this._width = option.width;
            this._height = option.height;
            this._restoreWidth = option.width;
            this._restoreHeight = option.height;
            this._minWidth = option.minWidth;
            this._minHeight = option.minHeight;

			this._appId = option.appId;



            this.createDom();
            
            
			
            
            
            var pos = this.getDefaultPosition();
            this._x = option.x?option.x : pos.x; 
            this._y = option.y?option.y :pos.y;
			this._restoreX=this._x;
			this._restoreY=this._y;
            this.setZIndex(this.option.zIndex);
            this.createEvent();

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

            if (option.isSetCurrent) {
                this.setCurrent();
            } else {
                this.setNotCurrent();
            }
            if (option.isSetCentered){
                this.setWindowCentered();
            }
            
            
            
        },

        parseOption: function (option) {
            option = option || {};
            option.type = option.type || "default";

            //J.console.info("Window parseOption");
            //J.console.info(option);
            option.flashMode = J.isUndefined(option.flashMode) ? false : option.flashMode;
            option.ieOnly = J.isUndefined(option.ieOnly) ? false : option.ieOnly;
            option.loginLevel = J.isUndefined(option.loginLevel) ? qqweb.CONST.LOGIN_LEVEL_NONE : option.loginLevel;
			
            option.isTask = J.isUndefined(option.isTask) ? true : option.isTask;
            
            
            // 窗口默认尺寸
            option.width = option.width || 600;
            option.height = option.height || 450;
            option.minWidth = option.minWidth || 100;
            option.minHeight = option.minHeight || 100;
            option.zIndex = !J.isUndefined(option.zIndex) ? option.zIndex : qqweb.layout.getTopZIndex();

            option.title = option.title || "未命名";
            option.html = option.html || "";
            // 是否可以切换窗口模式
            option.modeSwitch = (option.modeSwitch === true) ? true : false;
            option.isSetCurrent = option.isSetCurrent ? option.isSetCurrent : "true";
            option.defaultMode = option.defaultMode ? option.defaultMode : "restore";

            // 是否可以拖拽移动位置
            option.dragable = (option.dragable === true) ? true : false;
            // 是否可以拖拽改变窗口大小
            option.resize = (option.resize === true) ? true : false;
            // 是否加拖拽和resize代理
            option.dragProxy = (option.dragProxy === true) ? true : false;

            // 是否固定层次
            option.isFixedZIndex = (option.isFixedZIndex === true) ? true : false;
            //窗口是否居中
            option.isSetCentered = (option.isSetCentered === true) ? true : false;

            // 标题栏的按钮参数
            option.hasCloseButton = (option.hasCloseButton === true) ? true : false;
            option.hasMaxButton = (option.hasMaxButton === true) ? true : false;
            option.hasRestoreButton = (option.hasRestoreButton === true) ? true : false;
            option.hasMinButton = (option.hasMinButton === true) ? true : false;
            option.hasRefreshButton = (option.hasRefreshButton === true) ? true : false;
            option.hasPinUpButton = (option.hasPinUpButton === true) ? true : false;
            option.hasPinDownButton = (option.hasPinDownButton === true) ? true : false;

            //窗口下部的按钮参数
            option.hasOkButton = (option.hasOkButton === true) ? true : false;
            option.hasCancelButton = (option.hasCancelButton === true) ? true : false;
            option.hasPreviousButton = (option.hasPreviousButton === true) ? true : false;
            option.hasNextButton = (option.hasNextButton === true) ? true : false;

            this.option = option;
            return option;
        },
		
		getAppId : function(){
			return this._appId;
		},
		
		
		
		getWindowFlags:function(){
			return this._windowFlag;
		},
		setWindowFlags:function(flag){
			this._windowFlag = flag;
		},

        createDom: function () {
            var windowContext = this;
            var html;

            var windowId = qqweb.layout.getWindowId();
            this.getId = function () {
                return windowId;
            };
            //var windowId = this.getId();

            this.container = $D.node("div", {
                "id": "appWindow_" + windowId,
                "class": "window window_current"
            });


            html = '\
				<div id="window_outer_' + windowId + '" class="window_outer">\
					<div id="window_inner_' + windowId + '" class="window_inner"  style="z-index:' + this.option.zIndex + '">\
						<div class="window_bg_container">\
							<div id="window_center" class="window_bg window_center"></div>\
							<div id="window_t" class="window_bg window_t"></div>\
							<div id="window_rt" class="window_bg window_rt"></div>\
							<div id="window_r" class="window_bg window_r"></div>\
							<div id="window_rb" class="window_bg window_rb"></div>\
							<div id="window_b" class="window_bg window_b"></div>\
							<div id="window_lb" class="window_bg window_lb"></div>\
							<div id="window_l" class="window_bg window_l"></div>\
							<div id="window_lt" class="window_bg window_lt"></div>\
						</div>\
						<div class="window_content">\
							<div id="window_titleBar_' + windowId + '" class="window_titleBar">\
								<a id="window_closeButton_' + windowId + '" class="window_close" title="关闭" href="###" hidefocus></a>\
								<a id="window_maxButton_' + windowId + '" class="window_max" title="最大化" href="###" hidefocus></a>\
								<a id="window_restoreButton_' + windowId + '" class="window_restore" title="还原" href="###" hidefocus></a>\
								<a id="window_minButton_' + windowId + '" class="window_min" title="最小化" href="###" hidefocus></a>\
								<a id="window_refreshButton_' + windowId + '" class="window_refresh" title="刷新" href="###" hidefocus></a>\
								<a id="window_pinUpButton_' + windowId + '" class="window_pinUp" title="浮动" href="###" hidefocus></a>\
								<a id="window_pinDownButton_' + windowId + '" class="window_pinDown" title="钉住" href="###" hidefocus></a>\
								<div id="window_title_' + windowId + '" class="window_title titleText">App</div>\
							</div>\
							<div id="window_body_' + windowId + '" class="window_bodyArea"></div>\
							<div id="window_controlArea_' + windowId + '" class="window_controlArea">\
								<a id="window_cancelButton_' + windowId + '" class="window_button window_cancel" title="取　消" href="###" hidefocus>取　消</a>\
								<a id="window_okButton_' + windowId + '" class="window_button window_ok" title="确　定" href="###" hidefocus>确　定</a>\
								<a id="window_nextButton_' + windowId + '" class="window_button window_next" title="下一步" href="###" hidefocus>下一步</a>\
								<a id="window_previousButton_' + windowId + '" class="window_button window_previous" title="上一步" href="###" hidefocus>上一步</a>\
							</div>\
						</div>\
					</div>\
				</div>\
			';
            this.container.innerHTML = html;
            qqweb.layout.getDesktop().body.appendChild(this.container);

            this._titleBar = $D.id("window_titleBar_" + windowId);
            this._title = $D.id("window_title_" + windowId);
            this.body = $D.id("window_body_" + windowId);
            //this.maskIframe = $D.id("maskIframe_"+windowId);
            this._window_outer = $D.id("window_outer_" + windowId);
            this._window_inner = $D.id("window_inner_" + windowId);

            this._closeButton = $D.id("window_closeButton_" + windowId);
            this._maxButton = $D.id("window_maxButton_" + windowId);
            this._restoreButton = $D.id("window_restoreButton_" + windowId);
            this._minButton = $D.id("window_minButton_" + windowId);
            this._refreshButton = $D.id("window_refreshButton_" + windowId);
            this._pinUpButton = $D.id("window_pinUpButton_" + windowId);
            this._pinDownButton = $D.id("window_pinDownButton_" + windowId);

            this._controlArea = $D.id("window_controlArea_" + windowId);

            this._cancelButton = $D.id("window_cancelButton_" + windowId);
            this._okButton = $D.id("window_okButton_" + windowId);
            this._nextButton = $D.id("window_nextButton_" + windowId);
            this._previousButton = $D.id("window_previousButton_" + windowId);




            // 根据参数生成标题栏按钮
            if (this.option.hasCloseButton) {
                this.showCloseButton();
            }
            if (this.option.hasMaxButton) {
                this.showMaxButton();
            }
            if (this.option.hasRestoreButton) {
                this.showRestoreButton();
            }
            if (this.option.hasMinButton) {
                this.showMinButton();
            }
            if (this.option.hasRefreshButton) {
                this.showRefreshButton();
            }
            if (this.option.hasPinUpButton) {
                this.showPinUpButton();
            }
            if (this.option.hasPinDownButton) {
                this.showPinDownButton();
            }


            // 根据参数生成窗体下部按钮
            if (this.option.hasOkButton) {
                this.showOkButton();
            }
            if (this.option.hasCancelButton) {
                this.showCancelButton();
            }
            if (this.option.hasPreviousButton) {
                this.showPreviousButton();
            }
            if (this.option.hasNextButton) {
                this.showNextButton();
            }

            this.setTitle(this.option.title);

            if (this.option.html) {
                this.setHtml(this.option.html);
            }

			if(this.getAppId()=='buddyManager')
			{
				this.createStopServiceDom(windowId);
				return;
			}
            //创建flash隐藏时的节点
            if (this.option.flashMode) {
                this.createAlterDom(windowId);
            }
            
 			//判断当前浏览器是否支持此应用
			if(this.option.ieOnly&&!J.browser.ie){
                this.createWarningDom(windowId);
			}
           
            if (this.option.isTask) {
                // 添加到layout, 注意子类Chatbox不写入，Chatbox自行管理
           		qqweb.layout.addWindow(this);
            }
            

        },
        createAlterDom: function (windowId) {
			// windowId = ( typeof(windowId === undefined) ? windowId : this.getId();
			windowId = ( typeof(windowId) === 'undefined') ? this.getId() : windowId;																	
            this.alterDom = $D.node("div", {
                "id": "appWindow_" + windowId + "_alt",
                "class": "flash_alt"
            });
            this.alterDom.innerHTML = "<div class='appIframeAlter'></div><div  class='appIframeAlterTxt'>运行中，点击恢复显示 :)</div>";
			this.body.appendChild(this.alterDom);
        },
        createWarningDom: function (windowId) {
			// windowId = ( typeof(windowId === undefined) ? windowId : this.getId();
			windowId = ( typeof(windowId) === 'undefined') ? this.getId() : windowId;																	
            this.warnDom = $D.node("div", {
                "id": "appWindow_" + windowId + "_warn",
                "class": "no_available_alt"
            });
            this.warnDom.innerHTML = "<div class='appWarning'></div><div  class='appWarningTxt'><span class='strong_text'>很抱歉，服务受限啦！</span><br />此应用仅支持ie内核浏览器，请使用ie等浏览器。</div>";
			this.body.innerHTML = '';
            $D.setStyle(this.body, "background", "#7b7b7b");
			this.body.appendChild(this.warnDom);
        },
        createStopServiceDom: function (windowId) {
			// windowId = ( typeof(windowId === undefined) ? windowId : this.getId();
			windowId = ( typeof(windowId) === 'undefined') ? this.getId() : windowId;																	
            this.warnDom = $D.node("div", {
                "id": "appWindow_" + windowId + "_warn",
                "class": "no_available_alt"
            });
            this.warnDom.innerHTML = "<div class='appWarning'></div><div  class='appWarningTxt'>很抱歉，应用改造中，暂时无法提供服务.</div>";
			this.body.innerHTML = '';
            $D.setStyle(this.body, "background", "#7b7b7b");
			this.body.appendChild(this.warnDom);
        },
        showAlterDom: function () {
            $D.setStyle(this.body, "background", "#FFF");
            $D.show(this.alterDom);
        },
        hideAlterDom: function () {
            $D.setStyle(this.body, "background", "transparent none");
            $D.hide(this.alterDom);
        },
        createEvent: function () {
            var windowContext = this;
            this.observer = {
                onCloseButtonClick: function (e) {
                    windowContext.close();
					e.preventDefault();
                    e.stopPropagation();
                    //$E.notifyObservers(windowContext, "clickCloseButton");
                },

                stopPropagation: function (e) {
                    e.stopPropagation();
                },
                onMaxButtonClick: function (e) {
					e.preventDefault();
                    if (windowContext.option.modeSwitch) {
                        windowContext.max();
                    }
                },
                onRestoreButtonClick: function (e) {
					e.preventDefault();
                    if (windowContext.option.modeSwitch) {
                        windowContext.restore();
                    }
                    //$E.notifyObservers(windowContext, "clickRestoreButton");

                },
                onMinButtonClick: function (e) {
					e.preventDefault();
                    if (windowContext.option.modeSwitch) {
                        windowContext.min();
                    }
                    //$E.notifyObservers(windowContext, "clickMinButton");
                },

                onRefreshButtonClick: function (e) {
					e.preventDefault();
                    $E.notifyObservers(windowContext, "clickRefreshButton");
                },
                onPinUpButtonClick: function (e) {
					e.preventDefault();
                    $E.notifyObservers(windowContext, "clickPinUpButton");
                    windowContext.showPinDownButton();
                },
                onPinDownButtonClick: function (e) {
					e.preventDefault();
                    $E.notifyObservers(windowContext, "clickPinDownButton");
                    windowContext.showPinUpButton();
                },

                onOkButtonClick: function (e) {
					e.preventDefault();
                    if ($E.notifyObservers(windowContext, "clickOkButton")) {
                        setTimeout(function () {
                            windowContext.close();
                        }, 0);
                    }

                },
                onCancelButtonClick: function (e) {
					e.preventDefault();
                    if ($E.notifyObservers(windowContext, "clickCancelButton")) {
                        setTimeout(function () {
                            windowContext.close();
                        }, 0);
                    }
                },
                onPreviousButtonClick: function (e) {
					e.preventDefault();
                    $E.notifyObservers(windowContext, "clickPreviousButton");
                },
                onNextButtonClick: function (e) {
					e.preventDefault();
                    $E.notifyObservers(windowContext, "clickNextButton");
                },


                onMouseoverWindow: function (e) {
                    e.stopPropagation();
                    $E.notifyObservers(windowContext, "mouseoverWindow");
                },
                onMouseoutWindow: function (e) {
                    e.stopPropagation();
                    $E.notifyObservers(windowContext, "mouseoutWindow");
                },
                // 聊天框鼠标按键处理
                onMousedownWindow: function (e) {
                    if (windowContext) {
                        setTimeout(function () {
                            windowContext.setCurrent();
                        }, 0);
                    }
                },
                onKeyDownWindow: function (e) {

                },

                onWindowResize: function () {
                    if (windowContext.getBoxStatus() === "max") {
                        windowContext.adjustMaxSize();
                    }
                    $E.notifyObservers(windowContext, "resize", windowContext.getBodySize());
                },

                onTitleBarDblClick: function (e) {
                    e.preventDefault();
                    $E.notifyObservers(windowContext, "dblClickTitleBar");
                    if (windowContext.option.modeSwitch) {
                        if (windowContext.getBoxStatus() === "max") {
                            windowContext.restore();
                        } else if (windowContext.getBoxStatus() === "restore") {
                            windowContext.max();
                        }
                    }
                },
                onResize: function (o) {
                    windowContext.setWidth(o.width);
                    windowContext.setHeight(o.height);
                    $E.notifyObservers(windowContext, "resize", windowContext.getBodySize());
                },
                onMove: function (xy) {
                    windowContext._x = xy.x;
                    windowContext._y = xy.y;
                    //J.out("move: "+xy.x)
                },
                onMousedown: function () {
                    J.out("onMousedown ")
                    //console.dir(windowContext);
					var n=(new Date()).getTime();
                    $D.setStyle(windowContext._dragProxy.proxyEl, "left", windowContext.getX() + windowContext._outBorder + "px");
                    $D.setStyle(windowContext._dragProxy.proxyEl, "top", windowContext.getY() + windowContext._outBorder + "px");
                    $D.setStyle(windowContext._dragProxy.proxyEl, "width", windowContext._width - windowContext._outBorder * 2 + "px");
                    $D.setStyle(windowContext._dragProxy.proxyEl, "height", windowContext._height - windowContext._outBorder * 2 + "px");
                    $D.setStyle(windowContext._dragProxy.maskEl, "zIndex", 60002);
					J.out(((new Date()).getTime() - n));
                    $D.show(windowContext._dragProxy.maskEl);
                },
                onDragProxyEnd: function (xy) {
                    $D.hide(windowContext._dragProxy.maskEl);
                    windowContext.setXY(xy.x - windowContext._outBorder, xy.y - windowContext._outBorder);

                },

                onDragProxyResizeEnd: function (o) {
                    $D.hide(windowContext._dragProxy.maskEl);
                    J.out(o.x);
                    windowContext.setXY(o.x - windowContext._outBorder, o.y - windowContext._outBorder);

                    var easing = 1.1;
                    var easingInterval = 200;
                    var mostStick = 5;
                    var currentStick = 0;
                    var easingFun = function () {
                        currentStick++;
                        var currentBodySize = windowContext.getBodySize();
                        var dw = o.width - currentBodySize.width;
                        var dh = o.height - currentBodySize.height;
                        windowContext.setWidth(currentBodySize.width + dw * easing + windowContext._outBorder * 2);
                        windowContext.setHeight(currentBodySize.height + dh * easing + windowContext._outBorder * 2);
                        $E.notifyObservers(windowContext, "resize", windowContext.getBodySize());
                        if (currentStick < mostStick && (dw >= 5 || dw <= -5)) {
                            J.out("setting timeout " + dw + " " + dh + " " + currentStick + " mostStick:" + mostStick);
                            setTimeout(easingFun, easingInterval);
                        } else {
                            windowContext.setWidth(o.width + windowContext._outBorder * 2);
                            windowContext.setHeight(o.height + windowContext._outBorder * 2);
                            $E.notifyObservers(windowContext, "resize", windowContext.getBodySize());
                        }
                    };
                    //TODO Resize动画
                    //easingFun();
                    windowContext.setWidth(o.width + windowContext._outBorder * 2);
                    windowContext.setHeight(o.height + windowContext._outBorder * 2);

                    $E.notifyObservers(windowContext, "resize", windowContext.getBodySize());

                },

                stopPropagationAndSetCurrent: function (e) {
                    e.stopPropagation();
                    windowContext.setCurrent();
                },
                stopPropagationAndSetCurrentWithoutFocus: function (e) {
                    e.stopPropagation();
                    windowContext.setCurrentWithoutFocus();
                }
            };


            if (this.option.dragProxy) {
                this.enableDragProxy();
            }
            if (this.option.dragable) {
                this.enableDrag();
            }
            if (this.option.resize) {
                this.enableResize();
            }

            $E.on(this.container, "mousedown", this.observer.onMousedownWindow);
			$E.on(this.container, "mouseover", this.observer.onMouseoverWindow);
            $E.on(this.container, "mouseout", this.observer.onMouseoutWindow);
            $E.on(this.container, "keydown", this.observer.onKeyDownWindow);
            $E.on(this.body, "mousedown", this.observer.stopPropagationAndSetCurrent);
            $E.on(this._titleBar, "dblclick", this.observer.onTitleBarDblClick);
            $E.on(this._closeButton, "click", this.observer.onCloseButtonClick);
            $E.on(this._closeButton, "mousedown", this.observer.stopPropagation);
            $E.on(this._maxButton, "click", this.observer.onMaxButtonClick);
            $E.on(this._maxButton, "mousedown", this.observer.stopPropagationAndSetCurrent);
            $E.on(this._restoreButton, "click", this.observer.onRestoreButtonClick);
            $E.on(this._restoreButton, "mousedown", this.observer.stopPropagationAndSetCurrent);
            $E.on(this._minButton, "click", this.observer.onMinButtonClick);
            $E.on(this._minButton, "mousedown", this.observer.stopPropagation);
            $E.on(this._refreshButton, "click", this.observer.onRefreshButtonClick);
            $E.on(this._refreshButton, "mousedown", this.observer.stopPropagation);
            $E.on(this._pinUpButton, "click", this.observer.onPinUpButtonClick);
            $E.on(this._pinUpButton, "mousedown", this.observer.stopPropagation);
            $E.on(this._pinDownButton, "click", this.observer.onPinDownButtonClick);
            $E.on(this._pinDownButton, "mousedown", this.observer.stopPropagation);

            $E.on(this._okButton, "click", this.observer.onOkButtonClick);
            $E.on(this._okButton, "mousedown", this.observer.stopPropagation);
            $E.on(this._cancelButton, "click", this.observer.onCancelButtonClick);
            $E.on(this._cancelButton, "mousedown", this.observer.stopPropagation);
            $E.on(this._previousButton, "click", this.observer.onPreviousButtonClick);
            $E.on(this._previousButton, "mousedown", this.observer.stopPropagation);
            $E.on(this._nextButton, "click", this.observer.onNextButtonClick);
            $E.on(this._nextButton, "mousedown", this.observer.stopPropagation);
			$E.addObserver(this, "closeWindow", this.close);
        },

        // 设置标题栏
        setTitle: function (title) {
            this._title.innerHTML = J.string.toHtml(title);
        },
        setTitleHtml: function (htmlTitle) {
            this._title.innerHTML = htmlTitle;
        },

        // 显示各种按钮
        showCloseButton: function () {
            $D.show(this._closeButton);
        },

        showMaxButton: function () {
            $D.hide(this._restoreButton);
            $D.show(this._maxButton);

        },

        showRestoreButton: function () {
            $D.hide(this._maxButton);
            $D.show(this._restoreButton);
        },
        showMinButton: function () {
            $D.show(this._minButton);
        },
        showRefreshButton: function () {
            $D.show(this._refreshButton);
        },
        showPinUpButton: function () {
            $D.hide(this._pinDownButton);
            $D.show(this._pinUpButton);
        },
        showPinDownButton: function () {
            $D.hide(this._pinUpButton);
            $D.show(this._pinDownButton);
        },


        showOkButton: function () {
            $D.show(this._controlArea);
            $D.setStyle(this.body, "bottom", "26px");
            $D.show(this._okButton);

        },

        showCancelButton: function () {
            $D.show(this._controlArea);
            $D.setStyle(this.body, "bottom", "26px");
            $D.show(this._cancelButton);
        },
        showPreviousButton: function () {
            $D.show(this._controlArea);
            $D.setStyle(this.body, "bottom", "26px");
            $D.show(this._previousButton);
        },
        showNextButton: function () {
            $D.show(this._controlArea);
            $D.setStyle(this.body, "bottom", "26px");
            $D.show(this._nextButton);
        },

        // 窗体显示方法
        show: function () {
            $D.show(this.container);
            var windowContext = this;
			
			$E.on(window, "resize", this.observer.onWindowResize);
            J.out(">>>> Window: show")
            $E.notifyObservers(this, "show", this.getBodySize());
            this._isShow = true;

            
        },
        hide: function () {
            $E.off(window, "resize", this.observer.onWindowResize);
            $D.hide(this.container);
            $E.notifyObservers(this, "hide");
            this._isShow = false;
        },
        isShow: function () {
            return this._isShow;
        },
        toggleShow: function () {
            if (this.isShow()) {
                this.hide();
            } else {
                this.show();
            }
        },

        // 设置为当前激活的窗口,并聚焦
        setCurrent: function () {
			this.setWindowFlags(this.getWindowFlags() | qqweb.CONST.WINDOW_FLAG_CURRENT);
            this.setCurrentWithoutFocus();
            this.focus();
        },


        // 设置为非当前的窗口
        setNotCurrent: function (isIE) {
            // 将样式设置为非当前
			if(this === qqweb.layout.getCurrentWindow())return;
			this.setWindowFlags(this.getWindowFlags() & ~qqweb.CONST.WINDOW_FLAG_CURRENT | qqweb.CONST.WINDOW_FLAG_NOT_CURRENT);
			
			if(isIE){
				var c=this;
				setTimeout(function(){
					if(c== qqweb.layout.getCurrentWindow()){
						return;
					}
					c.setStyleNotCurrent();
				},300);
			}else{
				this.setStyleNotCurrent();
			}
			if(this === qqweb.layout.getCurrentWindow()){
				qqweb.layout.setCurrentWindow(null);
			}
            $E.notifyObservers(this, "setNotCurrent");
        },

        // 设置为当前激活的窗口
        setCurrentWithoutFocus: function () {
            var currentWindow = qqweb.layout.getCurrentWindow();
            if (currentWindow == this) {

            } else {


                qqweb.layout.setCurrentWindow(this);

                // 将样式设置为当前
                this.setStyleCurrent();
                this.show();
				
                if (currentWindow) {
					if(J.browser.ie){
						currentWindow.setNotCurrent(true);
					}else{
						currentWindow.setNotCurrent();
					}
                }
                if (this.option.isFixedZIndex) {

                } else {
                    this.setZIndex(qqweb.layout.getTopZIndex());
                }

                //J.out(">> Window: setCurrent");
                $E.notifyObservers(this, "setCurrent");


            }
        },

        // 设置为当前窗口的样式
        setStyleCurrent: function () {
            $D.addClass(this.container, "window_current");
        },

        // 设置非当前窗口的样式
        setStyleNotCurrent: function () {
			//避免被设为非当前的窗口已经被关闭出错(IE下)
			if(!this.container){
				return;
			}
            $D.removeClass(this.container, "window_current");
        },

        // 聚焦聊天输入框
        focus: function () {
            $E.notifyObservers(this, "focus");
        },

        // 设置窗口大小模式
        setBoxStatus: function (status) {
            this._status = status;

        },
        // 获取窗口大小模式
        getBoxStatus: function () {
            return this._status;
        },

        // 调整最大化的窗口尺寸
        adjustMaxSize: function () {
			this._restoreX=this._x;
			this._restoreY=this._y;
            this.setXY(5, 70);
            var clientWidth = $D.getClientWidth();
            var clientHeight = $D.getClientHeight();
            var sideBarWidth;
            if (qqweb.app.eqq && qqweb.app.eqq.isSideBarPinDown()) {//if (qqweb.layout.isSideBarPinDown()) {
                sideBarWidth = 200;
            } else {
                sideBarWidth = 0;
            }

            this.setWidth(clientWidth - sideBarWidth - 10);
            this.setHeight(clientHeight - 105);
            $E.notifyObservers(this, "resize", this.getBodySize());
        },

        // 窗口最大化
        max: function () {
            this.setDisableDrag();

			this.setWindowFlags(this.getWindowFlags() & ~qqweb.CONST.WINDOW_FLAG_NORMAL | qqweb.CONST.WINDOW_FLAG_MAX);
            this.setBoxStatus("max");
            $E.notifyObservers(this, "max");

            this.showRestoreButton();


            this.adjustMaxSize();

            $E.on(window, "resize", this.observer.onWindowResize);
            $E.addObserver(qqweb.layout, "sideBarPinUp", this.observer.onWindowResize);
            $E.addObserver(qqweb.layout, "sideBarPinDown", this.observer.onWindowResize);
        },

        // 窗口最小化
        min: function () {
			this.setWindowFlags(this.getWindowFlags() & ~qqweb.CONST.WINDOW_FLAG_CURRENT | qqweb.CONST.WINDOW_FLAG_NOT_CURRENT | qqweb.CONST.WINDOW_FLAG_MIN);
			
            var currentWindow = qqweb.layout.getCurrentWindow();
            if (currentWindow === this) {
                //currentWindow = null;
                qqweb.layout.setCurrentWindow(null);
            }
            if (!this.option.flashMode) {//flash mode 由app自已处理hide的具体方式
                this.hide();
            }
			this.setBoxStatus("min");
            $E.notifyObservers(this, "min");
            this._isShow = false;
            
            
        },


        // 窗口还原
        restore: function () { 
			this.setWindowFlags(this.getWindowFlags() & ~qqweb.CONST.WINDOW_FLAG_MAX | qqweb.CONST.WINDOW_FLAG_NORMAL);
            $E.off(window, "resize", this.observer.onWindowResize);
            $E.removeObserver(qqweb.layout, "sideBarPinUp", this.observer.onWindowResize);
            $E.removeObserver(qqweb.layout, "sideBarPinDown", this.observer.onWindowResize);

        
            this.setXY(this._restoreX, this._restoreY);

            if (this._restoreWidth < 0) {
                this._restoreWidth = 0;
            }
            if (this._restoreHeight < 0) {
                this._restoreHeight = 0;
            }

            this.setWidth(this._restoreWidth);
            this.setHeight(this._restoreHeight);
            J.out("resize: " + this.getBodySize());
			J.out("resize w: " + this.getBodySize().width);
			J.out("resize h: " + this.getBodySize().height);
            $E.notifyObservers(this, "resize", this.getBodySize());

            this.setEnableDrag();


            if (this.option.hasMaxButton) {
                this.showMaxButton();
            }
            this.setBoxStatus("restore");

            $E.notifyObservers(this, "restore");

        },
        // 设置窗口宽度
        setWidth: function (width) {
            $D.setStyle(this.container, "width", width + "px");
			$D.setStyle(this.body, "width", (width - 20) + "px");
            this._width = width;
            if (this.getBoxStatus() !== "max") {
                this._restoreWidth = width;
				
            }
			
        },
        
        getWidth:function(){
        	return this._width;
        },
        
        getHeight:function(){
        	return this._height;
        },
        
        
        // 设置窗口高度
        setHeight: function (height) {
            $D.setStyle(this.container, "height", height + "px");
            $D.setStyle(this._window_outer, "height", (height - 20) + "px");
			var titleBarHeight = 21;
            if(J.browser.ie&&J.browser.ie<7){
            	titleBarHeight = 22;
            }

            if (this.option.hasOkButton) {
                $D.setStyle(this.body, "height", (height - 47 - titleBarHeight) + "px");
            }
            else {
                $D.setStyle(this.body, "height", (height - 20 - titleBarHeight) + "px");
            }

            this._height = height;
            if (this.getBoxStatus() !== "max") {
                this._restoreHeight = height;
            }
        },




        getZIndex: function () {
            return this._zIndex;
        },

        setZIndex: function (zIndex) {
            $D.setStyle(this.container, "zIndex", zIndex);
            //$D.setStyle(this.maskIframe,"zIndex", zIndex-1);
            $D.setStyle(this._window_inner, "zIndex", zIndex);
            this._zIndex = zIndex;
        },

        setTopZIndex: function () {
            this.setZIndex(qqweb.layout.getTopZIndex());
        },


        // 设置窗口位置
        setXY: function (x, y) { 
            if (x || x === 0) {
                this.setX(x);
            }
            if (y || y === 0) {
                this.setY(y);
            }

        },

        // 设置窗口位置
        setX: function (x) {
            this._x = x;
            $D.setStyle(this.container, "left", x + "px");
            //$D.setStyle(this.container, "right", "");
        },
        // 设置窗口位置
        setY: function (y) {
            this._y = y;
            $D.setStyle(this.container, "top", y + "px");
            //$D.setStyle(this.container, "bottom", "");
        },

        // 获取窗口位置
        getX: function (x) {
            return parseInt($D.getStyle(this.container, "left"));
            //$D.setStyle(this.container, "right", "");
        },
        
        getRestoreX : function(){
        	return this._restoreX;
        },
        
        getRestoreY : function(){
        	return this._restoreY;
        },
        
		//获取窗口左上角坐标
		getLeft: function(){
			return this._x;
		},
        // 获取窗口位置
        getY: function (y) {
            return parseInt($D.getStyle(this.container, "top"));
            //$D.setStyle(this.container, "bottom", "");
        },

        // 设置窗口位置
        setLeft: function (left) {
            $D.setStyle(this.container, "left", left + "px");
            $D.setStyle(this.container, "right", "");
        },
        // 设置窗口位置
        setTop: function (top) {
            $D.setStyle(this.container, "top", top + "px");
            $D.setStyle(this.container, "bottom", "");
        },
        // 设置窗口位置
        setRight: function (right) {
            $D.setStyle(this.container, "right", right + "px");
            $D.setStyle(this.container, "left", "");
        },
        // 设置窗口位置
        setBottom: function (bottom) {
            $D.setStyle(this.container, "bottom", bottom + "px");
            $D.setStyle(this.container, "top", "");
        },

        //设置窗口居中
        setWindowCentered: function () {  
            var w = J.dom.getClientWidth();
            var h = J.dom.getClientHeight();
            var l = (w > this._width) ? (w - this._width) / 2 : 0;
            var t = (h > this._height) ? (h - this._height) / 2 : 0;
            this.setXY(l, t);
        },

        // 获取窗口打开的默认位置
        getDefaultPosition: function () {    
            var clientWidth = $D.getClientWidth();
            var clientHeight = $D.getClientHeight();
 
            var w1 = clientWidth - this._width - this._leftMargin - this._rightMargin;
            var h1 = clientHeight - this._height - this._topMargin - this._bottomMargin;

            var w2 = clientWidth - this._width - this._leftMargin - this._rightMargin - this._rightArea - this._leftArea;
            var h2 = clientHeight - this._height - this._topMargin - this._bottomMargin - this._bottomArea;

 
            w1 = w1 > 0 ? w1 : 0;
            w2 = w2 > 0 ? w2 : 1;
            h1 = h1 > 0 ? h1 : 0;
            h2 = h2 > 0 ? h2 : 1;
            
            J.out("ID: "+this.getId())
            var count = this.getId() - openWindowNum - 1;
            count = count < 0 ? 0 : count;
			/*
            var x = this._leftMargin + this._leftArea + ((w1 / 2 + (count * 25)) % w2),
				y = this._topMargin + ((h1 / 2 + (count * 25)) % h2);
			*/
            
			var x = this._leftMargin + this._leftArea + (((count * 25)) % w2),
				y = this._topMargin + this._topArea + (((count * 25)) % h2);
 
            return {
                x: x,
                y: y
            }
        },

        // 开启drag
        enableDrag: function () {
            this.option.dragable = true;
            if (this.getBoxStatus() !== "max") {
                this.setEnableDrag();
            }

        },
        disableDrag: function () {
            this.option.dragable = false;
            this.setDisableDrag();
        },

        // 开启drag代理
        enableDragProxy: function () {
            this.option.dragProxy = true;
            //this.setEnableDragProxy();

        },
        disableDragProxy: function () {
            this.option.dragProxy = false;
            //this.setDisableDragProxy();
        },



        // 开启拖拽
        setEnableDrag: function () {
            if (this.option.dragable) {
                if (this._dragController) {
                    if (this.option.dragProxy) {
                        $E.on(this.container, "mousedown", this.observer.onMousedown);
                    }
                    this._dragController.unlock();
                } else {

                    if (this.option.dragProxy) {

                        this._dragProxy = getDragProxy();
                        $E.on(this.container, "mousedown", this.observer.onMousedown);
                        this._dragController = new J.ui.Drag(this.container, this._dragProxy.proxyEl, {
                            isLimited: true,
                            leftMargin: this._leftMargin + this._outBorder,
                            topMargin: this._topMargin + this._outBorder,
                            rightMargin: this._rightMargin + this._outBorder,
                            bottomMargin: this._bottomMargin + this._outBorder

                        });

                        $E.addObserver(this._dragController, "end", this.observer.onDragProxyEnd);
                    } else {
                        this._dragController = new J.ui.Drag(this.container, this.container, {
                            isLimited: true,
                            leftMargin: this._leftMargin,
                            topMargin: this._topMargin,
                            rightMargin: this._rightMargin,
                            bottomMargin: this._bottomMargin

                        });
                        $E.addObserver(this._dragController, "move", this.observer.onMove);
                    }

                }
                this.setEnableResize();
            }
        },
        // 关闭拖拽
        setDisableDrag: function () {
            if (this._dragController) {
                this._dragController.lock();
                if (this.option.dragProxy) {
                    $E.off(this.container, "mousedown", this.observer.onMousedown);
                }
            }
            this.setDisableResize();
        },


        // 开启resize
        enableResize: function () {
            this.option.resize = true;
            if (this.getBoxStatus() !== "max") {
                this.setEnableResize();
            }
        },
        disableResize: function () {
            this.option.dragable = false;
            this.setDisableResize();
        },
        // 开启resize
        setEnableResize: function () {
            if (this.option.resize) {
                if (this._resizeController) {
                    if (this.option.dragProxy) {
                        $E.addObserver(this._resizeController, "mousedown", this.observer.onMousedown);
                    }
                    this._resizeController.show();
                } else {
                    if (this.option.dragProxy) {
                        this._dragProxy = getDragProxy();
                        this._resizeController = new J.ui.Resize(this._window_inner, this._dragProxy.proxyEl, {
                            minWidth: this._minWidth,
                            minHeight: this._minHeight,
                            dragProxy: this._dragProxy
                        });
                        $E.addObserver(this._resizeController, "mousedown", this.observer.onMousedown);
                        $E.addObserver(this._resizeController, "end", this.observer.onDragProxyResizeEnd);

                    }
                    else {
                        this._resizeController = new J.ui.Resize(this._window_inner, this.container, {
                            minWidth: this._minWidth,
                            minHeight: this._minHeight
                        });
                        $E.addObserver(this._resizeController, "resize", this.observer.onResize);
                    }

                }
            }
        },

        // 关闭resize
        setDisableResize: function () {
            if (this._resizeController) {
                this._resizeController.hide();
                if (this.option.dragProxy) {
                    $E.removeObserver(this._resizeController, "mousedown", this.observer.onMousedown);
                }
            }
        },


        setHtml: function (html) {
            this.html = html;
            this.body.innerHTML = html;
            if (this.option.flashMode) {
                this.createAlterDom(this.getId());
            }
        },

        append: function (node) {
            this.body.appendChild(node);
        },


        getSize: function () {
            return {
                width: $D.getClientWidth(this.container),
                height: $D.getClientHeight(this.container)
            };
        },
        getBodySize: function () {

            return {
                width: parseInt($D.getStyle(this.body, "width"), 10),
                height: parseInt($D.getStyle(this.body, "height"), 10)
            };
        },
 
		//返回本身的dom对象
		getSelfDomObj : function(){
			return this.container;			
		},
		
		
		
        close: function () {
            $E.notifyObservers(this, "close", this);
            this.destroy();
        },
        destroy: function () {
        	
        	if (this.option.isTask) {
                // 添加到layout, 注意子类Chatbox不写入，Chatbox自行管理
           		qqweb.layout.removeWindow(this);
            }
            J.out(">>>>>>>>>>>destroy :" + this.container.id);
            $E.off(window, "resize", this.observer.onWindowResize);

            var currentWindow = qqweb.layout.getCurrentWindow();
            if (currentWindow == this) {
                qqweb.layout.setCurrentWindow(null);
            }

            qqweb.layout.getDesktop().body.removeChild(this.container);
            
            for (var p in this) {
                if (this.hasOwnProperty(p)) {
                    delete this[p];
                }
            }
            
            
            
            
        }

    });





    this.Window = Window;

});

/* == EQQ 类模块 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2010.4.22 ----- */
 
 Jet().$package("qqweb.businessClass", function(J){
	var packageContext = this,
		$D = J.dom,
		$E = J.event;
		
	var widget = new J.Class({
		windowType : "widget",
		
		init : function(option) {
			this.parseOption(option)
			this.createDom();
			
			this.setTopZIndex();
			var pos= this.getDefaultPosition();
			
			
			if(option.x && option.y){
				var x = option.x;
				var y = option.y;
			}else{
				var x = pos.x;
				var y = pos.y;
			}
			
			this.setLT(x, y);
			this._x= x;
			this._y= y;
			this._appId = option.appId;
			
			this.setWidth(this._width);
			this.setHeight(this._height);
			this.createEvent();
			this.setEnableDrag();
		},
		//往body注入html
		setHtml : function(html) {
			this.body.innerHTML= html;
		},
		parseOption : function(option) {
			option = option || {};
			
			option.isTask = J.isUndefined(option.isTask) ? true : option.isTask;

			option.windowMode = option.windowMode || "single",
			option.width= option.width>0 ? option.width : 0,
			option.height= option.height>0 ? option.height : 0,
			option.dragable = (option.dragable === false) ? false : true,
			
			option.pinUpStyle= option.pinUpStyle || 'default-class',
			option.pinDownStyle= option.pinDownStyle || 'default-class',
			option.closeStyle= option.closeStyle || 'default-class',
			
			// 浮动按钮参数
            option.hasCloseButton = (option.hasCloseButton === true) ? true : false,
            option.hasMinButton = (option.hasMinButton === true) ? true : false,
            option.hasRefreshButton = (option.hasRefreshButton === true) ? true : false,
            option.hasPinUpButton = (option.hasPinUpButton === true) ? true : false,
            option.hasPinDownButton = (option.hasPinDownButton === true) ? true : false,
            
			option.isFix= option.isFix || false,
			option.left= option.left>0? option.left : 0,
			option.top= option.top>0? option.top : 0
			
			this._isFix = option.isFix;
			this._left = option.left;
			this._top = option.top;
			this._width= option.width;
			this._height= option.height;
			
			this._pinUpStyle= option.pinUpStyle;
			this._pinDownStyle= option.pinDownStyle;
			this._closeStyle= option.closeStyle;
			
			this.option = option;
			
            return option;
		},
		createDom : function(){
			var windowContext = this;
			var html;
			
			//这里使用了跟获取windowID一样的方法。
			var widgetId = qqweb.layout.getWindowId();
			this.getId = function(){
				return widgetId;
			};
			
			this.container = $D.node("div", {
                "id": "widget_" + widgetId,
                "class" : "widget widget_current"
            });


            html = '\
				<div id="widget_outer_' + widgetId + '" class="widget_outer">\
					<div id="widget_inner_' + widgetId + '" class="widget_inner"  style="z-index:' + this.option.zIndex + '">\
						<div id="widget_bg_container_' + widgetId + '" class="widget_bg_container">\
							<div class="widget_bg widget_center"></div>\
							<div class="widget_bg widget_t"></div>\
							<div class="widget_bg widget_rt"></div>\
							<div class="widget_bg widget_r"></div>\
							<div class="widget_bg widget_rb"></div>\
							<div class="widget_bg widget_b"></div>\
							<div class="widget_bg widget_lb"></div>\
							<div class="widget_bg widget_l"></div>\
							<div class="widget_bg widget_lt"></div>\
						</div>\
						<div class="widget_content">\
							<div id="widget_titleBar_' + widgetId + '" class="widget_titleBar">\
								<a id="widget_closeButton_' + widgetId + '" class="widget_close" title="关闭" href="###" hidefocus></a>\
								<a id="widget_minButton_' + widgetId + '" class="widget_min" title="最小化" href="###" hidefocus></a>\
								<a id="widget_refreshButton_' + widgetId + '" class="widget_refresh" title="刷新" href="###" hidefocus></a>\
								<a id="widget_pinUpButton_' + widgetId + '" class="widget_pinUp" title="浮动" href="###" hidefocus></a>\
								<a id="widget_pinDownButton_' + widgetId + '" class="widget_pinDown" title="钉住" href="###" hidefocus></a>\
								<div id="widget_title_' + widgetId + '" class="widget_title"></div>\
							</div>\
							<div id="widget_Body_' + widgetId + '" class="widget_bodyArea"></div>\
						</div>\
					</div>\
				</div>\
			';
            this.container.innerHTML = html;
            qqweb.layout.getDesktop().body.appendChild(this.container);
			
            
            this._bg_container = $D.id("widget_bg_container_" + widgetId);
			this._titleBar = $D.id("widget_titleBar_" + widgetId);
            this._title = $D.id("widget_title_" + widgetId);
			this.body = $D.id("widget_Body_" + widgetId);
			
			this._window_outer=$D.id("widget_outer_" + widgetId);
			
			this._closeButton = $D.id("widget_closeButton_" + widgetId);
            this._maxButton = $D.id("widget_maxButton_" + widgetId);
            this._restoreButton = $D.id("widget_restoreButton_" + widgetId);
            this._minButton = $D.id("widget_minButton_" + widgetId);
            this._refreshButton = $D.id("widget_refreshButton_" + widgetId);
            this._pinUpButton = $D.id("widget_pinUpButton_" + widgetId);
            this._pinDownButton = $D.id("widget_pinDownButton_" + widgetId);
			

			
			// 根据参数生成标题栏按钮
            if (this.option.hasCloseButton) {
                this.showCloseButton();
               
            }
            if (this.option.hasMinButton) {
                this.showMinButton();
            }
            if (this.option.hasRefreshButton) {
                this.showRefreshButton();
            }
            if (this.option.hasPinUpButton) {
                this.showPinUpButton();
            }
            if (this.option.hasPinDownButton) {
                this.showPinDownButton();
            }
			
		
			//$D.setStyle(this.body, "height", "100%");
			//$D.setStyle(this.body, "width", "100%");	
            
            if (this.option.isTask) {
                // 添加到layout, 注意子类Chatbox不写入，Chatbox自行管理
           		qqweb.layout.addWindow(this);
            }
			

			//qqweb.layout.getDesktop().body.appendChild(this.container);	
			

		},
		createEvent : function(){
			var windowContext = this;
			this.observer = {
				onMouseoverWindow : function(e){
					e.stopPropagation();
					$D.show(windowContext._titleBar);
					$D.show(windowContext._bg_container);
					
					$E.notifyObservers(windowContext, "mouseoverWindow",windowContext);
				},
				onMouseoutWindow : function(e){
					e.stopPropagation();
					$D.hide(windowContext._titleBar);
					$D.hide(windowContext._bg_container);
					$E.notifyObservers(windowContext, "mouseoutWindow",windowContext);
				},
				//提供给 J.ui.Drag 类使用
				onMove : function(xy){
					windowContext._x = xy.x;
					windowContext._y = xy.y;
				},
				stopPropagationAndSetCurrent : function(e){
					e.stopPropagation();
					windowContext.setCurrent();
				},
				setCurrent : function(e) {
					J.out(0)
					windowContext.setCurrent();
				},
				onMousedownWidget : function(e) {
					windowContext._offX= e.clientX;
					windowContext._offY= e.clientY;
				},
				onMouseupWidget : function(e) {
					if(Math.abs(windowContext._offX-e.clientX)+Math.abs(windowContext._offY-e.clientY)<10) {
						$E.notifyObservers(windowContext, "shortMoveClick",windowContext);
					};
				},
				onClickPinDownButton : function(e) {
					e.stopPropagation();
					$E.off(windowContext.container, "mousedown",windowContext.observer.setCurrent);

					windowContext.setPinZIndex();
					windowContext.showPinUpButton();
					$E.notifyObservers(windowContext, "clickPinUpButton",windowContext);
				},
				onClickPinUpButton : function(e) {
					qqweb.layout.setCurrentWindow(windowContext);
					e.stopPropagation();
					$E.on(windowContext.container, "mousedown", windowContext.observer.setCurrent);

					windowContext.setZIndex(qqweb.layout.getTopZIndex());
					windowContext.showPinDownButton();
					$E.notifyObservers(windowContext, "clickPinDownButton",windowContext);
				},
				onClickCloseButton : function(e) {
					e.stopPropagation();
					
					$E.notifyObservers(windowContext, "clickCloseButton",windowContext);
					setTimeout(function(){
						windowContext.close();
					},0);
				}
			};
			$E.on(this.body, "mousedown", this.observer.onMousedownWidget);
			$E.on(this.body, "mouseup", this.observer.onMouseupWidget);
			$E.on(this.container, "mousedown", this.observer.setCurrent);
			$E.on(this.container, "mouseover", this.observer.onMouseoverWindow);
			$E.on(this.container, "mouseout", this.observer.onMouseoutWindow);
			$E.on(this._closeButton, "click", this.observer.onClickCloseButton);
			$E.on(this._pinUpButton, "click", this.observer.onClickPinUpButton);
			$E.on(this._pinDownButton, "click", this.observer.onClickPinDownButton);
			$E.addObserver(this, "closeWindow", this.close);

			
		},
		
		getAppId : function(){
			return this._appId;
		},
		
		setZIndex : function(zIndex){
			$D.setStyle(this.container, "zIndex", zIndex);
			this._zIndex = zIndex;
		},
		getZindex : function() {
			return this._zIndex;
		},
		setCurrent : function() {
			var currentWidget = qqweb.layout.getCurrentWindow();
			if(currentWidget == this) {
				//
			}else {
				qqweb.layout.setCurrentWindow(this);
				// 将样式设置为当前
				this.setStyleCurrent();
				this.setZIndex(qqweb.layout.getTopZIndex());
				if(currentWidget){
					currentWidget.setNotCurrent();
				}
				$E.notifyObservers(this, "setCurrent");
			}			
		},
		// 设置为非当前的窗口
		setNotCurrent : function(){
			// 将样式设置为非当前
			var currentWidget = qqweb.layout.getCurrentWindow();
			if(currentWidget == this) {
				this.setStyleNotCurrent();
				qqweb.layout.setCurrentWindow(null);
			}
			$E.notifyObservers(this, "setNotCurrent");
		},
		setStyleCurrent : function() {
			$D.addClass(this.container, "widget_current");
		},
		setStyleNotCurrent : function() {
			$D.removeClass(this.container, "widget_current");
		},
		
		// 设置窗口宽度
		setWidth:function(width) {
			this._width= width;
			$D.setStyle(this.container, "width", width+"px");
		},
		// 设置窗口高度
		setHeight:function(height) {
			this._height= height;
			$D.setStyle(this.container, "height", height+"px");


            $D.setStyle(this._window_outer, "height", (height - 20) + "px");
            
            var titleBarHeight = 21;
            if(J.browser.ie&&J.browser.ie<7){
            	titleBarHeight = 22;
            }
            
            $D.setStyle(this.body, "height", (height - 20 - titleBarHeight) + "px");
			
		},
		setTopZIndex : function(){
			this.setZIndex(qqweb.layout.getTopZIndex());
		},
		setPinZIndex : function() {
			this.setZIndex(qqweb.layout.getPinZIndex());
		},
		
		
		// 获取窗口位置
        getX: function (x) {
            return parseInt($D.getStyle(this.container, "left"));
            //$D.setStyle(this.container, "right", "");
        },

        // 获取窗口位置
        getY: function (y) {
            return parseInt($D.getStyle(this.container, "top"));
            //$D.setStyle(this.container, "bottom", "");
        },
        
        
        
		//获取默认位置
		getDefaultPosition : function(){
			//this._space;
			//focus on left and bottom
			var left=10,
			 	bottom=41,
			 	right=200,
			 	top= 60,
			 	x,
			 	y;
			
			if(this._isFix) {
				x= this._left;
				y= this._top;
			}
			else {
				var clientWidth = $D.ClientWidth();
				var clientHeight = $D.getClientHeight();
				
				if(J.isUndefined(qqweb.businessClass.Widget._space)) {
					x= clientWidth-right-this._width-left;
					y= clientHeight-top-this._height;
					qqweb.businessClass.Widget._space= x - this._width;
					
				}
				else {
					if(qqweb.businessClass.Widget._space < 0){
						qqweb.businessClass.Widget._space= clientWidth-right-1.5*this._width-left;
					}
					var random_int= Math.floor(Math.random()*11);
					x= Math.ceil(qqweb.businessClass.Widget._space + this._width/2*random_int/10);
					random_int= Math.floor(Math.random()*11);
					y= (clientHeight-this._height-top-bottom)*random_int/10+bottom;
					qqweb.businessClass.Widget._space= x - this._width;
				}
			
			
				y= clientHeight-y-this._height;
			}
			//var z= this.getZindex();
			return {
				x: x,
				y: y
			};
		},		
		// 显示各种按钮
		showCloseButton : function(){
			$D.show(this._closeButton);
		},
		showPinUpButton : function(){
			$D.hide(this._pinDownButton);
			$D.show(this._pinUpButton);
		},
		showPinDownButton : function(){
			$D.hide(this._pinUpButton);
			$D.show(this._pinDownButton);
		},
		// 开启拖拽
		setEnableDrag : function(){
			if(this.option.dragable){
				if(this._dragController){
					this._dragController.unlock();
				}else{
					this._dragController = new J.ui.Drag(this.container, this.container);
					$E.addObserver(this._dragController, "move", this.observer.onMove);
				}
			}
		},
		// 关闭拖拽
		setDisableDrag : function(){
			if(this._dragController){
				this._dragController.lock();
			}
		},
		setLT: function(l,t) {
			if(l||l===0) {
				this.setLeft(l);
			}
			if(t||t===0) {
				this.setTop(t);
			}
		},
		setLB: function(l,b) {
			if(l||l===0) {
				this.setLeft(l);
			}
			if(b||b===0) {
				this.setBottom(b);
			}
		},
		// 设置窗口位置
		setLeft: function(left) {
			$D.setStyle(this.container, "left", left + "px");
			$D.setStyle(this.container, "right", "");
		},
		// 设置窗口位置
		setTop: function(top) {
			$D.setStyle(this.container, "top", top + "px");
			$D.setStyle(this.container, "bottom", "");
		},
		// 设置窗口位置
		setRight: function(right) {
			$D.setStyle(this.container, "right", right + "px");
			$D.setStyle(this.container, "left", "");
		},
		// 设置窗口位置
		setBottom: function(bottom) {
			$D.setStyle(this.container, "bottom", bottom + "px");
			$D.setStyle(this.container, "top", "");
		},
		setToCenter:function(){
			    var w = J.dom.getClientWidth();
				var h = J.dom.getClientHeight();			
				var l = (w > this._width) ? ( w - this._width )/2 : 0;
				var t = (h > this._height) ? ( h - this._height )/2 : 0;	  				     
				this.setLT(l, t);
		},
		close:function(){
			$E.notifyObservers(this, "close", this);
			this.destroy();
		},
		destroy : function(){
			//与Window类共用相同的方法
			
			if (this.option.isTask) {
                // 添加到layout, 注意子类Chatbox不写入，Chatbox自行管理
           		qqweb.layout.removeWindow(this);
            }
			//J.out('destroy'+this);
			for(var p in this) {
				J.out(p);
				//J.out(this[p]);
			}
			var currentWidget = qqweb.layout.getCurrentWindow();
			if(currentWidget == this) {
				qqweb.layout.setCurrentWindow(null);
			}
			qqweb.layout.getDesktop().body.removeChild(this.container);
			for(var p in this) {
				if(this.hasOwnProperty(p)) {
					delete this[p];
				}
			}
		}
	});
	
	this.Widget = widget;
});/* == QQ Web layout 模块 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2009.11.17 ----- */



Jet().$package("qqweb.layout", function (J) {
    //== qqweb.layout 的局部变量声明 ================================================================================
    //------------------------------------------------------------------------------------------------------------
    var packageContext = this,
		$D = J.dom,
		$E = J.event,


    	//id = 0,
    	// window的dom元素id
		windowId = 0,
   		// 当前window的
		isDragProxy = true,
		currentWindow = null,
		windowList = [],
		id2window = {},
		onDesktopWindowList = [],
		onDesktopWindowCurrent = null,
		
		zIndex = 10,
		pinZIndex = 2000000,
		isSideBarPinDown = true,
		sideBarMargin = 106,
		desktopEl = $D.id("desktop"),
		showDesktopButton,
		qqWebImeButton,
		

		
		maskLayer,

		panelList = {},
		
		taskBarLeftMargin = 289,
		taskBarRightMargin = 225,

		quickPanel,
		quickPanelPopup,
		maxQuickPanel = 12,//减2个节点 TODO


    // el元素
		quickPanelPopupArrowElm,
		topBarEl = $D.id("topBar"),
		qqBarEl = $D.id("qqBar"),

		settingCenterButtonEl,// = $D.id("settingCenterButton"),


		mainPanelEl = $D.id("mainPanel"),
		toggleBarEl = $D.id("toggleBar"),

		//sideBarReplacementEl = $D.id("sideBarReplacement"),

		appWindowEl = $D.id("appWindow"),
		appWindowBodyEl = $D.id("appWindowBody"),

		toolBarEl = $D.id("toolBar"),
		taskBarEl = $D.id("taskBar"),
		statusBarEl = $D.id("statusBar"),
		buttonStatusBarSound = $D.id("layout_statusBar_sound"),
		taskBarMainEl;


    //== qqweb.layout 的私有方法 ===================================================================================
    //------------------------------------------------------------------------------------------------------------




    // 桌面
    var createDesktop = function () {
        var desktop = new packageContext.Panel({
            id: "desktop",
            name: "desktop",
            container: packageContext.getBody(),
            body: desktopEl,
            html: ''
        });
       packageContext.addPanel(desktop);

        // 顶部条
        var topBar = new packageContext.Panel({
            id: "topBar",
            name: "topBar",
            container: topBarEl,
            body: topBarEl,
            html: ''
        });
        packageContext.addPanel(topBar);


        var observer = {
        	onClickDesktop : function(){
        		$E.notifyObservers(qqweb.layout, "clickDesktop", desktop);
        	},
            onClickAppStartButton: function () {
                var appId = this.getAttribute("appId");
                qqweb.portal.runApp(appId, {});
            },
            // 获取用户信息成功后。。。
            onSelfInfoReady: function (user) {
                 J.console.info(user);
				 
               /* accountAvatar.src = qqweb.util.getUserAvatar(user.uin);
                accountNick.innerHTML = user.htmlNick;
                loginAccount.innerHTML = '&lt;' + user.uin + '&gt;';*/
				 
            },
			onAppRun: function(appId){//./images/app_messagebox_icon.png
				var config = qqweb.portal.getAppConfig(appId);
				if(config.appLevel && config.appLevel=="system"){//系统级app不需要增加
					return;
				}
				var appNode = $D.id("quickPanel_"+config.id);
				if(!appNode){
					var appNode = $D.node("a",{
						"id":"quickPanel_"+config.id,
						"class":"quickPanelRunningApp",
						"title":config.title,
						"href":"###"
					});
					appNode.aid=config.id;
					var img = $D.node('img',{
						'src':"./app/appmanager/images/app_small_"+config.id+".png"
					});
					var textNode = $D.node("span",{
						'id':"quickPanel_"+config.id+"_txtnode",
						'class':'quickPanelRunningAppPopupTxt'
					});
					textNode.innerHTML=config.title;
					appNode.appendChild(img);
					appNode.appendChild(textNode);
					
					// TODO
					//img.onerror=function(){this.src='./style/images/taskbar_desk.png'};
					
					// TODO
					var childrenCount=quickPanel.body.children || quickPanel.body.childNodes;
					
					if(childrenCount.length>=maxQuickPanel){
						$D.show(quickPanelPopupArrowElm);
						//quickPanelPopupContainer.appendChild(appNode);
						var popupChildren = quickPanelPopupContainer.children || quickPanelPopupContainer.childNodes;
						var lastPopupChild = (popupChildren.length>0)?popupChildren[0]:null;
						quickPanelPopupContainer.insertBefore(appNode,lastPopupChild);
						//$D.show($D.id("quickPanel_"+config.id+"_txtnode"));
						//$D.setStyle(this,"backgroundColor","#BDDDF4");
						//$E.on(appNode, "mouseover", function(){$D.setStyle(this,"backgroundColor","#8CB8D3");});
						//$E.on(appNode, "mouseout", function(){$D.setStyle(this,"backgroundColor","#FFFFFF");});

						$D.show(quickPanelPopupArrowElm);
						$D.setStyle(quickPanel.body,"width",getQuickPanelWidth()+"px");
					}else{
						quickPanel.body.appendChild(appNode);
						$D.setStyle(quickPanel.body,"width",getQuickPanelWidth(childrenCount.length-2)+"px");
					}
					$E.on(appNode, "click", onQuickPanelIconClicked);
				}
					
				//$D.show(appNode);
				
			},
			onShowDesktopButtonClick : function(e){
				var onDesktopWindowList = packageContext.showDesktop();
				$E.notifyObservers(qqweb, "ClickShowDesktopButton", onDesktopWindowList);
			},
			
			onQQWebImeButtonClick : function(){
				qqweb.portal.runApp("qqWebIme");
			},
			onAppExit: function(appId){
				var config = qqweb.portal.getAppConfig(appId);
				if(config.appLevel && config.appLevel=="system"){//系统级app不需要增加
					return;
				}
				
				var appNode = $D.id("quickPanel_"+config.id);
				if(!appNode){
					return;
				}
				//$D.hide(appNode);
				try{
					quickPanel.body.removeChild(appNode);
				}catch(e){
					quickPanelPopupContainer.removeChild(appNode);
				}
				
				var showingChildren = quickPanel.body.children || quickPanel.body.childNodes;
				var popupChildren = quickPanelPopupContainer.children || quickPanelPopupContainer.childNodes;
				//TODO 
				var showingCount = showingChildren.length;
				var popupCount = popupChildren.length;
				if(showingCount<maxQuickPanel){
					if(popupCount>0){
						//将popup的元素移到正在显示的dom里
						var l=maxQuickPanel - showingCount;
						for(var i=0;i<showingCount;++i){
							popupCount--;
							//var txtNode = $D.id("quickPanel_"+ (popupChildren[i]).aid+"_txtnode");
							//$D.hide(txtNode);
							quickPanel.body.appendChild(popupChildren[i]);
							if(popupCount<=0)break;
						}
					}
				}
				var newShowingChildren = quickPanel.body.children || quickPanel.body.childNodes;
				if(popupCount<=0){
					$D.hide(quickPanelPopupArrowElm);
					$D.setStyle(quickPanel.body,"width",getQuickPanelWidth(newShowingChildren.length-2)+"px");
				}else{
					$D.setStyle(quickPanel.body,"width",getQuickPanelWidth()+"px");
				}
			}
        };



        // qqBar
        var qqBar = new packageContext.Panel({
            id: "qqBar",
            name: "qqBar",
            container: qqBarEl,
            body: qqBarEl,
            html: ''

        });
        packageContext.addPanel(qqBar);






        // 工具条
        var toolBar = new packageContext.Panel({
            id: "toolBar",
            name: "toolBar",
            container: toolBarEl,
            body: toolBarEl,
            html: ''
        });
        packageContext.addPanel(toolBar);

        // 任务条
        var taskBar = new packageContext.Panel({
            id: "taskBar",
            name: "任务条",
            container: taskBarEl,
            body: taskBarEl,
            html: ' <div id="startButton" class="startButton"></div>\
					<div id="quickPanel" class="quickPanel"><div class="statusBar_line" style="float:right;margin-left:5px;"></div>\
					<div id="quickPanelPopupArrow"></div></div>\
					<!-div id="quickPanelPopupArrow"></div-->\
					<div id="taskBar_main" class="EQQ_taskBar">\
						<div id="EQQ_ChatBuddyList" class="EQQ_chatBuddyList"></div>\
					</div>'
        });
        packageContext.addPanel(taskBar);
		
        taskBarMainEl = $D.id("taskBar_main");


        // 状态条
        var statusBar = new packageContext.Panel({
            id: "statusBar",
            name: "状态条",
            container: statusBarEl,
            body: statusBarEl,
			
            html: '\
				<div id="quickPanel_freeModelButton" class="quickPanel_freeModelButton login_level_3" title="点击切换到 - [自由模式]" _olddisplay="inline"></div>\
				<div id="quickPanel_adsorbModelButton" class="quickPanel_adsorbModelButton login_level_3" title="点击切换到 - [吸附模式]" _olddisplay="inline"></div>\
				<a id="EQQ_MyPanel_ExitButton" class="layout_signout login_level_2" href="###" hidefocus title="退出">退出</a>\
				<a id="settingCenterButton" class="settingCenterButton login_level_2" href="###" hidefocus title="设置中心">设置</a>\
				<a class="statusBar_help login_level_1" href="http://service.qq.com/category/webQQ.html" target="_blank" hidefocus title="帮助"></a>\
				<!--div class="statusBar_line login_level_1" style="float:left"></div-->\
				<!--a class="statusBar_suggestion login_level_3" href="http://ce.oa.com/WebQQ/add" target="_blank" title="反馈" hidefocus></a-->\
				<div class="statusBar_sound login_level_3" ><div class="statusBar_sound_open" id="layout_statusBar_sound" title="切换声音模式"></div></div>\
				<div id="quickPanel_qqWebImeButton" class="quickPanel_qqWebImeButton login_level_1" title="QQ云输入法"></div>\
				<div id="quickPanel_showDesktopButton" class="quickPanel_showDesktopButton login_level_1" title="点击显示桌面"></div>\
				<div class="statusBar_line"></div>'
/*				<a class="statusBar_lock login_level_0" href="###" title="锁定" hidefocus><div class="statusBar_lock_icon"></div></a>\

				<a id="appTaskButton" style="float:right; display:none" class="appTaskButton appTaskButtonOn login_level_2" title="任务管理器" href="###"></a>\
			html : '\
				<div id="statusBarQuick1" class="statusBar_sub">\
					<div id="quickPanel_freeModelButton" class="quickPanel_freeModelButton" title="点击切换到 - [自由模式]" _olddisplay="block" style="display: none;"></div>\
					<div id="quickPanel_adsorbModelButton" class="statusBar_sound quickPanel_adsorbModelButton" title="点击切换到 - [吸附模式]" style="display: block;" _olddisplay="block"></div>\
					<div id="quickPanel_showDesktopButton" class="quickPanel_showDesktopButton" title="点击显示桌面"></div>\
					\
				</div>\
				<div id="statusBarQuick2" class="statusBar_sub">\
					<a class="statusBar_sound" href="###" hidefocus><div class="statusBar_sound_open" id="layout_statusBar_sound"></div></a>\
					<a class="statusBar_lock" href="###" title="锁定" hidefocus><div class="statusBar_lock_icon"></div></a>\
				</div>\
				<div class="statusBar_sub">\
					<a class="statusBar_help" href="http://service.qq.com/category/webQQ.html" target="_blank" title="帮助" hidefocus><img src="./style/images/transparent.gif" border="0" /></a>\
				</div>\
				<div id="statusBarQuick3" class="statusBar_sub">\
					<a id="appTaskButton" class="appTaskButton appTaskButtonOn" title="任务管理器" href="###"></a>\
					<div class="settingCenterButton" style="float:right" id="settingCenterButton">设置</div>\
					<div style="float:right"><a href="###" id="EQQ_MyPanel_ExitButton">退出</a></div>\
				</div>\
			'*/
        });
        packageContext.addPanel(statusBar);
		settingCenterButtonEl = $D.id("settingCenterButton");
        // 快捷面板
        var quickPanelEl = $D.id("quickPanel");
        quickPanel = new packageContext.Panel({
            id: "quickPanel",
            name: "快捷面板",
            container: quickPanelEl,
            body: quickPanelEl,
            html: ''
        });
        packageContext.addPanel(quickPanel);
		
		// 快捷面板超出部分popup
		var quickPanelPopupContainer = $D.node('div',{
			'class':'quickPanelPopupContainer'
		});
		document.body.appendChild(quickPanelPopupContainer);
		var quickPanelPopup = new qqweb.layout.PopupBox({
			container: quickPanelPopupContainer,
			html: ''
		});
		quickPanelPopupArrowElm = $D.id('quickPanelPopupArrow');
		var onQuickPanelIconClicked = function(e){
			e.preventDefault();
			var app=qqweb.portal.getApp(this.aid);
			
			// TODO app.getUIContext()
			var appUIContext = app.window || app.widget;
			if(!appUIContext){
				return;
			}
			
			//Widget无最小化模式
			if(appUIContext.getWindowFlags && (appUIContext.getWindowFlags() & qqweb.CONST.WINDOW_FLAG_CURRENT)){
				appUIContext.min();
				
			}else{
				appUIContext.setCurrent();
			}
			
		};
		var getQuickPanelWidth = function(numOfQuickIcon){
			if(!numOfQuickIcon && numOfQuickIcon!==0){
				numOfQuickIcon = maxQuickPanel-2;
			}
			if(numOfQuickIcon<0)numOfQuickIcon=0;
			var ret=9;
			ret+=numOfQuickIcon*26;
			if($D.isShow(quickPanelPopupArrowElm)){
				ret+=20;
			}
			return ret;
		};
		
		var onQuickPanelPopupArrowClicked = function(e){
			var popupChildren = quickPanelPopupContainer.children || quickPanelPopupContainer.childNodes;
			var count = popupChildren.length;
			
			//quickPanelPopup.setXY((maxQuickPanel+1)*20,$D.getClientHeight()-20*count-40);
			//quickPanelPopup.setX((maxQuickPanel+1)*20);
			quickPanelPopup.setX(getQuickPanelWidth()-27);
			quickPanelPopup.setTopZIndex();
			quickPanelPopup.show();
			e.stopPropagation();
		};
		$E.on(quickPanelPopupArrowElm, "click", onQuickPanelPopupArrowClicked);

		
      
		var stopPropagation = function(e){
			e.stopPropagation();
		}
		
        var onSettingCenterButtonClick = function () {
			J.out("click setting center");
            qqweb.portal.runApp("settingCenter");
        };

      
		
		//登录权限变化
		var onLoginLevelChanged = function(loginLevel){
			var func = packageContext.layoutFunctions['loginLevel_'+loginLevel];
			if(func){
				func();
			}else{
				alert(loginLevel);
			}
		};
		//melody 先显示一级登录状态的按钮
		onLoginLevelChanged(1);
	
        //静音操作按钮layout_statusBar_sound
        var onStatusBarSound = function () {
            if (qqweb.sound.isMute()) {
                qqweb.sound.setMute(false);
                buttonStatusBarSound.className = 'statusBar_sound_open';
            } else {
                qqweb.sound.setMute(true);
                buttonStatusBarSound.className = 'statusBar_sound_mute';
            }
        };
		
  
       
        qqweb.portal.getCookieUin();
		
        $E.addObservers({
			"targetModel":qqweb.portal,
			'eventMapping':{
				'selfInfoReady':observer.onSelfInfoReady,
				'appRun':observer.onAppRun,
				'appExit':observer.onAppExit
			}
		});
			
		$E.on(settingCenterButtonEl, "click", onSettingCenterButtonClick);
        $E.on(settingCenterButtonEl, "click", stopPropagation);
		buttonStatusBarSound = $D.id("layout_statusBar_sound");
        $E.on(buttonStatusBarSound, "click", onStatusBarSound);

		
        $E.addObserver(qqweb.portal, "loginLevelChanged", onLoginLevelChanged);

        var onWindowResize = function () {
 
            var clientWidth = $D.getClientWidth(),
				clientHeight = $D.getClientHeight();
            var docElement = $D.getDocumentElement();
			
			var showingChildren = quickPanel.body.children || quickPanel.body.childNodes;
			
            $D.setStyle(taskBarMainEl, "width", (clientWidth - taskBarLeftMargin - taskBarRightMargin) + "px");

           
			if( packageContext.sideBar != undefined && packageContext.sideBar){
			   qqweb.app.eqq.onResize();	
			}
            if (clientWidth >= 200) {
                $D.setStyle(docElement, "overflow", "hidden");
                $D.setStyle(desktopEl, "width", "");
            } else {
                $D.setStyle(docElement, "overflowX", "auto");
                $D.setStyle(desktopEl, "width", (200) + "px");
            }
            if (clientHeight % 2 == 0) {
                $D.setStyle(toolBarEl, "bottom", "0px");
            } else {
                $D.setStyle(toolBarEl, "bottom", "-1px");
            }
			$D.setStyle(document.body,"height",clientHeight+"px");
            //alert(1);

        };
		if(J.browser.firefox){
			setTimeout(onWindowResize, 100);
		}
        else {
        	onWindowResize();
        }

        $E.on(window, "resize", onWindowResize);
        
        showDesktopButton = $D.id("quickPanel_showDesktopButton");
		$E.on(showDesktopButton, "click", observer.onShowDesktopButtonClick);
		
		qqWebImeButton = $D.id("quickPanel_qqWebImeButton");
		$E.on(qqWebImeButton, "click", observer.onQQWebImeButtonClick);
		
		$E.on(desktopEl, "click", observer.onClickDesktop);
		
        return desktop;
    };


	this.mainLayoutParam={
		top:70,
		bottom:31,
		right:5
	}

    //== qqweb.layout 的公共方法和类 ================================================================================
    //------------------------------------------------------------------------------------------------------------
    this.init = function () {
        createDesktop();
    };

	//根据权限刷新面板
	this.refreshPanel = function(){
		
	};
	
    // 面板类
    this.Panel = qqweb.businessClass.Panel;


    // 弹框类
    this.PopupBox = qqweb.businessClass.PopupBox;

    this.getWindowId = function () {
        return windowId++;
    };

    this.getWindowDragProxy = function () {
        return isDragProxy;
    };

    this.getTopZIndex = function () {
        //J.out("zIndex: "+zIndex)
        return zIndex += 2;
    };
    this.getPinZIndex = function () {
        return pinZIndex++;
    }

    // 获取当前的window
    this.getCurrentWindow = function () {  
        return currentWindow;
    };

    // 设置当前的window
    this.setCurrentWindow = function (window) {   
        currentWindow = window;
    };
    
    // 获取window list
    this.getWindowList = function () {
        return windowList;
    };
    
    // 根据id获取window
    this.getWindow = function (id) {
        return id2window[id];
    };
    
    // 添加一个window
    this.addWindow = function (window) {
        windowList.push(window);
        id2window[window.getId()] = window;
        return window;
    };
    
    // remove一个window
    this.removeWindow = function (window) {
        J.array.remove(windowList, window);
        id2window[window.getId()] = null;
        delete id2window[window.getId()];
    };
    
    // 显示桌面
	this.showDesktop = function(){
		//var tempList = this.hasChatBoxOnDesktop();
		
		var tempList = [];
		var tempCurrent = packageContext.getCurrentWindow();
		var list = packageContext.getWindowList();
		for(var i=0; i<list.length; i++){
			if(list[i].isShow&&list[i].isShow()){
				list[i].min();
				tempList.push(list[i]);
			}
		}

		
		if(tempList.length > 0){
			onDesktopWindowList = tempList;
			onDesktopWindowCurrent = tempCurrent;

		}else{
			if(onDesktopWindowCurrent){
				onDesktopWindowCurrent.setCurrent();
			}
			
			for(var i=0; i<onDesktopWindowList.length; i++){
				onDesktopWindowList[i].show();
			}
			/*
			var chatBoxMode = EQQ.Presenter.ChatBox.getMode();
			if(chatBoxMode === "adsorb"){
				
			}else if(chatBoxMode === "free"){
				for(var i=0; i<onDesktopWindowList.length; i++){
					onDesktopWindowList[i].show();
				}
			}*/
			
		}

		
	};


    // 获取maskLayer
    this.getMaskLayer = function () {
        if (!maskLayer) {
            maskLayer = new J.ui.MaskLayer({ appendTo: qqweb.layout.getDesktop().body });
        }
        return maskLayer;
    };

    // 显示遮罩层
    this.showMaskLayer = function () {
        this.getMaskLayer().show();
    };

    // 隐藏遮罩层
    this.hideMaskLayer = function () {
        this.getMaskLayer().hide();
    };

    this.getDesktop = function () {
        return this.getPanel("desktop");
    };



    this.getBody = function () {
        return document.body;
    };


    this.addPanel = function (panel, parentContainer) {

        if (parentContainer) {
            parentContainer.appendChild(panel.container);
        }

        return panelList[panel.id] = panel;
    };

    this.getPanel = function (id) {
        return panelList[id];
    };


    // 获取覆盖显示层
    this.getCoverLayer = function () {
        return $D.id("coverLayer");
    };
    
	//设置sidebar对象
    this.setSideBar = function(sideBar){
		packageContext.sideBar = sideBar;
	};
    this.getSideBarMargin = function(){
		return sideBarMargin;
	};
    
 

    //修改主题
    this.applyTheme = function (themeId) {
        //J.out(themeId);
       // J.cookie.set("theme", themeId);
        J.http.loadCss("./style/" + themeId + "/qqweb.theme.css", { node: J.dom.id("qqwebSkin") });

    };
    this.onSendThemeSuccess = function (data) {
        if (data.retcode === 0) {
            //alert('onSendThemeSuccess');
        } else {

        }
    };
	
	
	//根据登录级别修改layout表现 
	this.layoutFunctions={};
	this.layoutFunctions['loginLevel_'+qqweb.CONST.LOGIN_LEVEL_NONE]=function(){
		$D.removeClass(statusBarEl,"statusBar_login_level_3");
		$D.removeClass(statusBarEl,"statusBar_login_level_2");
		$D.addClass(statusBarEl,"statusBar_login_level_1");
		var childNodes = statusBarEl.children || statusBarEl.childNodes;
		for(var i=0;i<childNodes.length;++i){
			if(childNodes[i].nodeType==1)
			{
				if($D.hasClass(childNodes[i],"login_level_3") || $D.hasClass(childNodes[i],"login_level_2")){
					$D.hide(childNodes[i]);
				}else{
					$D.show(childNodes[i]);
				}
			}
		}		
	};
	this.layoutFunctions['loginLevel_'+qqweb.CONST.LOGIN_LEVEL_NOCHAT]=function(){
		$D.removeClass(statusBarEl,"statusBar_login_level_3");
		$D.removeClass(statusBarEl,"statusBar_login_level_1");
		$D.addClass(statusBarEl,"statusBar_login_level_2");
		var childNodes = statusBarEl.children || statusBarEl.childNodes;
		for(var i=0;i<childNodes.length;++i){
			if($D.hasClass(childNodes[i],"login_level_3")){
				$D.hide(childNodes[i]);
			}else{
				$D.show(childNodes[i]);
			}
		}
	}
	this.layoutFunctions['loginLevel_'+qqweb.CONST.LOGIN_LEVEL_ALL]=function(){
		$D.removeClass(statusBarEl,"statusBar_login_level_1");
		$D.removeClass(statusBarEl,"statusBar_login_level_2");
		$D.addClass(statusBarEl,"statusBar_login_level_3");
		var childNodes = statusBarEl.children || statusBarEl.childNodes;
		for(var i=0;i<childNodes.length;++i){
			$D.show(childNodes[i]);
		}
	};
	
	//获取相应app处于quickPanle的位置
	this.getIconIndex = function(appId){
		var children = quickPanel.body.children || quickPanel.body.childNodes;
		for(var i=0;i<children.length;++i){
			if(children[i].id=="quickPanel_"+appId){
				return i-2;
			}
		}
		return maxQuickPanel-2;
	};
});
/* == QQWeb RPC Service 模块 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2009.12.01 ----- */
 
 


Jet().$package("qqweb.rpcService", function(J){
	//== qqweb.rpcService 的局部变量声明 ============================================================================
	//------------------------------------------------------------------------------------------------------------
	var packageContext = this,
		context = this,
		$D = J.dom,
		$E = J.event,
		failCount = 0,
		clientid = String(J.random(0,99))+String((new Date()).getTime()%1000000),
		pollCount = 0,
		pollMax = 0;
	var id = 0;
	var proxy;
	
	
	
	//== qqweb.rpcService 的私有方法 ===============================================================================
	//------------------------------------------------------------------------------------------------------------
	
	var getId = function(){
    	return id++;
    };
    
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
	
	
	
	
	
	
	
	document.domain="qq.com";
	var ajaxFrameUrlSetted=false;
	var ajaxCallbacks=[];

	var onAjaxFrameLoad=function(){
		var ajaxProxy = window.frames["qqweb_proxySendIframe"];
		//try{
		proxy = ajaxProxy.ajax;
		//}catch(e){alert(e.message+"  qqweb.rpc");}
		for(var i=0;i<ajaxCallbacks.length;++i){
			var url=ajaxCallbacks[i].url;
			var option=ajaxCallbacks[i].option;
			startProxySend(url, option);
		}
	};
	// ajax proxy 代理请求封装
	var proxySend = function(url, option){
		if(proxy){
			startProxySend(url, option);
		}else{
			ajaxCallbacks.push({'url':url,'option':option});
			if(ajaxFrameUrlSetted){
				return;
			}
			ajaxFrameUrlSetted=true;
			var bodyEl=document.body,
				divEl = $D.node("div",{
					"class":"hiddenIframe"
				});
			

			var html = '<iframe id="qqweb_proxySendIframe" class="hiddenIframe" name="qqweb_proxySendIframe" width="1" height="1" src="about:blank"></iframe>';
			divEl.innerHTML=html;
			bodyEl.appendChild(divEl);
			
			var qqweb_proxySendIframe = $D.id("qqweb_proxySendIframe");
			/*
			var onLoad = function(){alert('onload');
				var ajaxProxy = window.frames["qqweb_proxySendIframe"];
				
				try{
					proxy = ajaxProxy.ajax;
					startProxySend(url, option);
				}catch(e){
					
					setTimeout(function(){
						try{
							proxy = ajaxProxy.ajax;
							startProxySend(url, option);
						}catch(e){
							J.out("qqweb代理出错2："+url+"  "+e.message);
							var data = {};
							data.arguments = option.arguments || {};
							option.onError.call(option.context, data);
						}
					},2000);
				}
			};
			*/
			$E.on(qqweb_proxySendIframe, "load", onAjaxFrameLoad);
			qqweb_proxySendIframe.setAttribute("src",qqweb.CONST.API_PROXY_URL);
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
			param: option.param || {},
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
		
		// 区分客户端
		//opt.data.clientid = clientid;

		if(opt.method == "GET"){
			var queryString = J.string.toQueryString(opt.data);
			//var queryString = J.json.stringify(opt.data);
			//url = url + "?" + queryString + "&t=" + (new Date()).getTime();
			if(option.cacheTime === 0){
				if(queryString){
					queryString += "&t=" + (new Date()).getTime();
				}else{
					queryString += "t=" + (new Date()).getTime();
				}
			}
			if(queryString){
				url = url + "?" + queryString;
			}
			
			opt.data = null;
			proxy(url, opt);
		}else{
			//opt.data = J.json.stringify(opt.data);
			
			opt.contentType = "application/x-www-form-urlencoded";
			// 由于后台某个cgi在有时间戳时会出错，暂时去掉POST方式下的时间戳
			if( url.indexOf('?') === -1 ){
				//proxy(url+"?t=" + (new Date()).getTime(), opt);
				proxy(url, opt);
			}else{
				//proxy(url+"&t=" + (new Date()).getTime(), opt);
				proxy(url, opt);
			}
			
			//proxy(url+"?t=" + (new Date()).getTime(), opt);
			//proxy(url, opt);
		}
		

	};
	
	
	
	
	this.selfSend = function(url, option){
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
			param: option.param || {},
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
		
		// 区分客户端
		//opt.data.clientid = clientid;

		if(opt.method == "GET"){
			var queryString = J.string.toQueryString(opt.data);
			//var queryString = J.json.stringify(opt.data);
			//url = url + "?" + queryString + "&t=" + (new Date()).getTime();
			if(option.cacheTime === 0){
				if(queryString){
					queryString += "&t=" + (new Date()).getTime();
				}else{
					queryString += "t=" + (new Date()).getTime();
				}
			}
			if(queryString){
				url = url + "?" + queryString;
			}
			
			opt.data = null;
			J.http.ajax(url, opt);
		}else{
			//opt.data = J.json.stringify(opt.data);
			
			opt.contentType = "application/x-www-form-urlencoded";
			// 由于后台某个cgi在有时间戳时会出错，暂时去掉POST方式下的时间戳
			if( url.indexOf('?') === -1 ){
				//proxy(url+"?t=" + (new Date()).getTime(), opt);
				J.http.ajax(url, opt);
			}else{
				//proxy(url+"&t=" + (new Date()).getTime(), opt);
				J.http.ajax(url, opt);
			}
			
			//proxy(url+"?t=" + (new Date()).getTime(), opt);
			//proxy(url, opt);
		}
		

	};
	
	//== qqweb.rpcService 的公共方法 ===============================================================================
	//------------------------------------------------------------------------------------------------------------
	
	/* ********************* */ 
	// form 方式请求封装
	/*this.formSend = function(url, option){
		var id = getId();
		opt = {
			method: option.method || "GET",
			enctype: option.enctype || "",	//"multipart/form-data",
			data: option.data || {},
			param: option.param || null,
			arguments: option.arguments || null,
			context: option.context || null,
			onSuccess: option.onSuccess || function(){},
			onError: option.onError || function(){},
			onComplete: option.onComplete || function(){},
			//尚未测试
			onTimeout: option.onTimeout || function(){},

			timeout: option.timeout ? option.timeout : 10000
		};
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
				action: url+"?t=" + (new Date().getTime()),
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
	
	
	
	
	
    this.callback = {};
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
	this.formSend = function(url, option){
		 
		opt = {
			method: option.method || "GET",
			enctype: option.enctype || "",	//"multipart/form-data",
			data: option.data || {},  //表单项	
			//尚未测试
			onSuccess: option.onSuccess || function(){},   //iframe 载入成功回调,区别与获取数据成功
			onError: option.onError || function(){},      //iframe 载入失败回调
			onComplete: option.onComplete || function(){},
			
			onTimeout: option.onTimeout || function(){},
			timeout: option.timeout ? option.timeout : 10000
		};
		var bodyEl=document.body;
		var divEl = $D.id('RPCService_hDiv');
		
	    if( divEl ){
				
		}else{
			divEl = $D.node("div",{
				id: "RPCService_hDiv"
			});
			$D.hide(divEl);		
			divEl.innerHTML = '<iframe id="RPCService_hIframe" name="RPCService_hIframe" src="about:blank"></iframe>';	
			bodyEl.appendChild(divEl);
		}
		var formEl = $D.id('RPCService_form');
		if( formEl ){
			 divEl.removeChild(formEl);
		}
		 formEl = $D.node("form",{
					id: "RPCService_form",
					target: "RPCService_hIframe",
					method: opt.method,
					action: url+"?t=" + (new Date().getTime()),
					enctype: opt.enctype
				})
		 
		for(var p in opt.data){
			var inputEl=$D.node("input");
			inputEl.type="text";
			inputEl.name=p;
			inputEl.setAttribute("value",opt.data[p]);
			formEl.appendChild(inputEl);
		}
		
		divEl.appendChild(formEl);			
		formEl.submit();
		
		/* 
		  iframe事件未处理，当载入成功会自动调用回调函数 	 
		  var iframeEl = $D.id("RPCService_hIframe");
		  $E.on(iframeEl, "load", opt.onSuccess); 
		  oFrm.onload = oFrm.onreadystatechange = function() {   
			 if (this.readyState &amp;&amp; this.readyState != 'complete') return;   
			 else {   
				 onComplete();   
			 }  
		*/
	};
	
	/* ************** End ***************** */ 
	

	//this.send = this.formSend;
	this.send = proxySend;
	

	
	
	// 登录 ===========================
	this.sendCheckProtect = function(param){
		var sender = this.send(qqweb.CONST.API_SERVER_URL + "is_protect",{
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
	
	

	// 通过获取一个人的资料来判断登录态是否有效 ===========================
	this.sendGetLoginInfo = function(uin,_onSuccess,_onError){
		var sender = this.send(qqweb.CONST.API_SERVER_URL + "get_single_info",{
				context:this,
				data : {tuin:uin},//参数
				arguments : {uin:uin},
				onSuccess: _onSuccess || function(data){
					if(data.retcode === 0){
						J.out(":GetLoginInfoSuccess...");
						$E.notifyObservers(this, "GetLoginInfoSuccess", data);
						
					}else{
						J.out("[sendGetLoginInfo：数据格式错误] error: " + data.retcode + "-" + data.errmsg);
						//onFail();
						$E.notifyObservers(this, "GetLoginInfoError", data);
					}
					
				},
				onError: _onError || function(data){
					J.out("获取一个人的登录信息失败");
					$E.notifyObservers(this, "GetLoginInfoError", data);
					
				}
			});
	};
	
	
	// 获取一个人的详细资料 ===========================
	this.sendGetUserInfo = function(uin,_onSuccess,_onError){
		var sender = this.send(qqweb.CONST.API_SERVER_URL + "get_single_info",{
				context:this,
				data : {tuin:uin},//参数
				arguments : {uin:uin},
				onSuccess: _onSuccess || function(data){
					if(data.retcode === 0){
						J.out(":GetUserInfoSuccess...");
						$E.notifyObservers(this, "GetUserInfoSuccess", data);
						
					}else{
						J.out("[sendGetUserInfo：数据格式错误] error: " + data.retcode + "-" + data.errmsg);
						//onFail();
						$E.notifyObservers(this, "GetUserInfoError", data);
					}
					
				},
				onError: _onError || function(data){
					J.out("获取一个人的信息失败");
					$E.notifyObservers(this, "GetUserInfoError", data);
					
				}
			});
	};
	
	// 修改自己的的详细资料 ===========================
	this.sendModifyMyDetails = function(data){
		var sender = this.send(qqweb.CONST.API_SERVER_URL + "modify_my_details",{
				context:this,
				method : "POST",
				data : "r="+ encodeURIComponent(J.json.stringify(data)),
				arguments : {},
				onSuccess: function(data){
					if(data.retcode === 0){
						J.out(":ModifyMyDetailsSuccess...");
						$E.notifyObservers(this, "ModifyMyDetailsSuccess", data);
						
					}else{
						J.out("[sendModifyMyDetails：数据格式错误] error: " + data.retcode + "-" + data.errmsg);
						//onFail();
						$E.notifyObservers(this, "ModifyMyDetailsError", data);
					}
					
				},
				onError: function(data){
					J.out("修改自己的的详细资料失败");
					$E.notifyObservers(this, "ModifyMyDetailsError", data);
					
				}
			});
	};
	
	
	
	
	// 获取好友列表全信息 ===========================
	this.sendGetBuddyList = function(option){
		var sender = this.send(qqweb.CONST.API_SERVER_URL + "get_user_friends_nocache",{
				context:this,
				data:option,
				onSuccess: function(data){
					if(data.retcode === 0){
						var categories = data.result.categories || [];
						var flag=false;
						for(var i=0; i<categories.length; i++){
							//categories.push(data.categories[i]);
							if(categories[i].index==0){
								flag=true;
							}
						}
						if(!flag){
							categories.unshift({"index":0,"name":"我的好友"});
						}
						J.out(":GetBuddyListSuccess...1");
						$E.notifyObservers(this, "GetBuddyListSuccess", data.result);
						J.out(":GetBuddyListSuccess...2");
					}else{
						J.out("[sendGetBuddyList] error: " + data.retcode + "-" + data.errmsg);
						//onFail();
						$E.notifyObservers(this, "GetBuddyListError", data);
						J.out("[sendGetBuddyList] error: end");
						//$E.notifyObservers(EQQ, "LoginFailure", data.result);
					}
					
				},
				onError: function(data){
					J.out("好友列表失败");
					$E.notifyObservers(this, "GetBuddyListError", data);
					
				}
			});
	};
	
	
	// 获取群列表全信息 ===========================
	this.sendGetGroupList = function(option){
		//var sender = this.send(qqweb.CONST.API_SERVER_URL + "get_group_name_list",{
	     var sender = this.send(qqweb.CONST.API_SERVER_URL + "get_group_name_list_mask",{					 
				context:this,
				data:option,
				onSuccess: function(data){
					if(data.retcode === 0){
						$E.notifyObservers(this, "GetGroupListSuccess", data.result);
						J.out(":GetGroupListSuccess...");
					}else{
						J.out("[sendGetGroupList] error: " + data.retcode + "-" + data.errmsg);
						//onFail();
						$E.notifyObservers(this, "GetGroupListError", data);
					}
				},
				onError: function(data){
					J.out("群列表失败");
					$E.notifyObservers(this, "GetGroupListError", data);
					
				}
			});
	};
	
	// 获取最近联系人列表全信息 ===========================
	this.sendGetRecentList = function(option){
		var sender = this.send(qqweb.CONST.API_SERVER_URL + "get_recent_contact",{
				context:this,
				data:option,
				onSuccess: function(data){
					if(data.retcode === 0){
						$E.notifyObservers(this, "GetRecentListSuccess", data.result);
						J.out(":GetRecentListSuccess...");
					}else{
						J.out("[sendGetRecentList] error: " + data.retcode + "-" + data.errmsg);
						//onFail();
						$E.notifyObservers(this, "GetRecentListError", data);
					}
				},
				onError: function(data){
					J.out("最近联系人列表失败");
					$E.notifyObservers(this, "GetRecentListError", data);
					
				}
			});
	};
	
	//设置群屏蔽消息====
	this.sendChangeGroupMask = function(option){
		/*var sender = this.send(qqweb.CONST.API_SERVER_URL + "set_group_mask",{
				context:this,
				data:option,
				arguments : option,
				onSuccess: function(data){
					if(data.retcode === 1022){
						$E.notifyObservers(this, "ChangeGroupMaskSuccess", data.arguments);
						J.out(":GetGroupMaskSuccess...");
					}else{
						J.out("[sendGetGroupList] error: " + data.retcode + "-" + data.errmsg);
						//onFail();
						//$E.notifyObservers(this, "GetGroupListError", data);
					}
				},
				onError: function(data){
					J.out("群列表失败");
//					$E.notifyObservers(this, "GetGroupListError", data);
					
				}
			});*/
		
	};
	
	// 获取群列表全信息 ===========================
	this.sendGetGroupInfo = function(option){
		var sender = this.send(qqweb.CONST.API_SERVER_URL + "get_group_info_ext",{
				context:this,
				data:option,
				onSuccess: function(data){
					if(data.retcode === 0){
						J.out(":GetGroupInfoSuccess 1...");
						$E.notifyObservers(this, "GetGroupInfoSuccess", data.result);
						J.out(":GetGroupInfoSuccess 2...");
					}else{
						J.out("[sendGetGroupInfo] error: " + data.retcode + "-" + data.errmsg);
						//onFail();
						$E.notifyObservers(this, "GetGroupInfoError", data);
					}
				},
				onError: function(data){
					J.out("群资料失败");
					$E.notifyObservers(this, "GetGroupInfoError", data);
					
				}
			});
	};
	
	
	// 获取群列表全信息 ===========================
	this.sendGetQQLevel = function(uin){
		var sender = this.send(qqweb.CONST.API_SERVER_URL + "get_qq_level",{
				context:this,
				method : "GET",
				data : {tuin:uin},//参数
				arguments : {uin:uin},
				onSuccess: function(data){
					if(data.retcode === 0){
						J.out(":GetQQLevelSuccess 1...");
						$E.notifyObservers(packageContext, "GetQQLevelSuccess", data);
						J.out(":GetQQLevelSuccess 2...");
					}else{
						J.out("[sendGetQQLevel] error: " + data.retcode + "-" + data.errmsg);
						//onFail();
						$E.notifyObservers(packageContext, "GetQQLevelError", data);
					}
				},
				onError: function(data){
					J.out("QQ等级拉去失败");
					$E.notifyObservers(packageContext, "GetQQLevelError", data);
					
				}
			});
	};
	
	// 获取某个好友签名 ===========================
	this.sendGetSignature = function(uin) {
		//J.out("我要签名："+uin);
		var sender = this.send(qqweb.CONST.API_SERVER_URL + "get_single_long_nick",{
				context : this,
				method : "GET",
				data : {tuin:uin},//参数
				arguments : {uin:uin},
				onSuccess : function(data){
					if(data.retcode === 0){
						$E.notifyObservers(this, "GetBuddySignatureSuccess", data);//单个好友
					}else{
						J.out("[sendGetSignature] error: " + data.retcode + "-" + data.errmsg);
						//onFail();
					}

				},
				onError: function(data){
					J.out(" sendGetSignatureError");
					
				}
				
			});
	};
	
	//发送设置配置,retype = 2;操作成功使用回调函数。
	this.sendSetConfig = function(option){ 
	     this.formSend( "cgi/uac/set",{method : "POST",	data : option} );			 
	};
	//发送设置配置,retype = 2;操作成功使用回调函数。
	this.sendGetConfigByPost = function(option){ 
	     this.formSend( "cgi/uac",{method : "POST",	data : option} );			 
	};
	
	//获取配置 
	this.sendGetConfig = function(option){		 
		//var query = "callback="+option.callback+"&action="+option.action+"&retype="+option.retype;
		var query = "callback="+option.callback+"&retype="+option.retype;
		query = option.itemlist ? query+'&itemlist='+ option.itemlist: query;
		query = option.app ? query+'&app='+ option.app: query+'&t='+ (new Date().getTime());
		 
		var sender = J.http.loadScript("cgi/uac/"+option.action,{
			query : query				 
		});
		
	};

});




/* == QQWeb 入口 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2009.11.18 ----- */
 
 

Jet().$package(function(J){
	// qqweb 初始化
	if(qqweb && qqweb.init){
		qqweb.init();
	}

});
		

