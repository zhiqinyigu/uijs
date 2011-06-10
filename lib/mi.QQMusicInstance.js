/**
 * QMFL Main Core
 * 
 * @author MUSICWebGroup
 */

if (typeof(MUSIC) == "undefined" || !MUSIC) {
	/**
	 * MUSIC全局对象
	 * 
	 * @namespace MUSIC
	 * @type {Object}
	 */
	 MUSIC = {
		version : "1.0",
		_QMFL : true,
		_debugMode : false
	};
}

/**
 * 客户浏览器类型判断
 * 
 * @namespace MUSIC.userAgent
 * @type Object @
 */
MUSIC.userAgent = (function() {
	var vie, vff, vopera, vsf, vapple, wintype, mactype, vair, vchrome;
	var discerned = false;
	var agent = (/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel|Minefield).(\d+\.\d+))|(?:Opera.(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))/)
			.exec(navigator.userAgent);
	var os = (/(Windows.*?;)|(Mac OS X.*?;)/).exec(navigator.userAgent);

	if (agent) {
		vie = agent[1] ? parseFloat(agent[1]) : NaN;
		vff = agent[2] ? parseFloat(agent[2]) : NaN;
		vopera = agent[3] ? parseFloat(agent[3]) : NaN;
		vsf = agent[4] ? parseFloat(agent[4]) : NaN;

		// webkit 判断逻辑
		if (!isNaN(vsf)) {
			var _ua = navigator.userAgent;
			if (/AdobeAIR/.test(_ua)) {
				vair = 1;
			} else if (/Chrome/.test(_ua)) {
				vchrome = 1;
			} else {
				vapple = parseFloat((/Version\/(\d+(?:\.\d+)?)/).exec(_ua)[1]);
			}
		}
	} else {
		vie = vff = vopera = vsf = vapple = vair = NaN;
	}
	if (os) {
		wintype = !!os[1];
		mactype = !!os[2];
	} else {
		wintype = mactype = false;
	}

	/**
	 * 调整浏览器行为
	 * 
	 * @ignore
	 */
	function adjustBehaviors() {
		if (ua.ie < 7) {
			try {
				document.execCommand('BackgroundImageCache', false, true);
			} catch (ignored) {
			}
		}
		adjusted = true;
	}

	return {
		/**
		 * 取firefox版本号
		 * 
		 * @type Number
		 */
		firefox : vff,

		/**
		 * 取IE版本号
		 * 
		 * @type Number
		 */
		ie : window.XDomainRequest ? 8 : vie,
		/**
		 * 取opera版本号
		 * 
		 * @type Number
		 */
		opera : vopera,
		/**
		 * 是否是AIR的浏览器
		 * 
		 * @type Number
		 */
		air : vair,
		/**
		 * 取safariAIR总版本号
		 * 
		 * @type Number
		 */
		safari : vsf,
		/**
		 * 取safari友好版本号
		 * 
		 * @type Number
		 */
		safariV : vapple,
		/**
		 * 取Windows版本
		 * 
		 * @type String
		 */
		windows : wintype,
		/**
		 * 取Mac版本
		 * 
		 * @type String
		 */
		macs : mactype,
		/**
		 * 取chrome版本
		 * 
		 * @type String
		 */
		chrome : vchrome,
		/**
		 * 微调浏览器行为
		 * 
		 * @function
		 */
		adjustBehaviors : adjustBehaviors
	};
})();
/**
 * 命名空间 MUSIC.userAgent 的缩写
 */
var ua = MUSIC.userAgent;
//浏览器类型判断定义
var Browser = 
{
	isMozilla : !!ua.firefox,
	isIE : !!ua.ie,
	isIE7 : ua.ie >= 7,
	isIE8 : ua.ie > 7,
	isFirefox : !!ua.firefox,
	isSafari : !!ua.safari,
	isOpera : !!ua.opera
};
/**
 * namespace 处理
 * 
 * @namespace MUSIC.namespace
 */
MUSIC.namespace = {
	/**
	 * 把命名空间的方法映射到全局。不推荐常使用，避免变量名冲突
	 * 
	 * @param {Object}
	 *            namespace MUSIC的命名空间
	 */
	map : function(namespace) {
		if (MUSIC.lang.isHashMap(namespace)) {
			for (var k in namespace) {
				window[k] = namespace[k];
			}
		}
	}
};

/**
 * 定义一个通用空函数
 */
MUSIC.emptyFn = function() {
};

/**
 * MUSIC 的 widget 扩展类库
 * 
 * @namespace MUSIC.widget
 * @type Object
 */
MUSIC.widget = {};

/**
 * 命名空间 MUSIC.userAgent 的缩写
 */
var ua = MUSIC.userAgent;

/**
 * QMFL 控制台，用于显示调试信息以及进行一些简单的脚本调试等操作
 * 
 * @ignore
 * @type MUSIC.console
 */
MUSIC.console = {
	/**
	 * 给浏览器输出控制台信息
	 * 
	 * @param {string}
	 *            msg 信息
	 */
	print : function(msg, type) {
		if (window.console) {
			console.log((type == 4 ? (new Date() + ":") : "") + msg);
		}
	}
}

/**
 * 数据监控和上报系统
 * 
 * @ignore
 * @type MUSIC.report
 */
MUSIC.report = {
	/**
	 * 数据分析上报接口
	 * 
	 * @param {string}
	 *            source 数据来源
	 * @param {number}
	 *            type 数据返回结果,<br/> <br/>1 加载完成 <br/>2 加载失败 <br/>3 数据异常 无法解释/截断
	 *            <br/>4 速度超时 <br/>5 访问无权限 <br/> 对应的转义符是 %status%
	 * 
	 * @param {string}
	 *            url 请求的数据路径
	 * @param {number}
	 *            time 响应时间
	 * @ignore
	 */
	receive : MUSIC.emptyFn,

	/**
	 * 添加监控规则,
	 * 
	 * @param {String}
	 *            url 需要监控的url
	 * @param {String}
	 *            reportUrl 出现异常后上报的地址 上报地址有几个变量替换 <br/>%status% 数据状态
	 *            <br/>%percent% 统计百分比 <br/>%url% 监听的url地址,自动encode
	 *            <br/>%fullUrl% 监听的完整的url地址，包括这个地址请求时所带 <br/>%source% js处理来源
	 *            <br/>%time% 请求花掉的时间 <br/>%scale% 比例,通常是指 1:n 其中的 n 就是 %scale%
	 * 
	 * <br/>
	 * @example
	 * MUSIC.report.addRule("http://imgcache.qq.com/data2.js","http://imgcache.qq.com/ok?flag1=3234&flag2=%status%&1=%percent%&flag4=123456");
	 * @ignore
	 */
	addRule : MUSIC.emptyFn
}

/**
 * MUSIC 的 频道逻辑
 * 
 * @namespace MUSIC.channel
 * @type Object
 */
MUSIC.channel = {};


/*/////////////////////////////////////////////////////////////////////////////////////////////////////////*/

var debugMode = false;
var isMusicVip=-1,isLoginVip=-1,isMusicWhite=-1,musicVipTime=-1,musicVipLevel=-1,musicVipScore=0,musicVipPlace=0,loginVipLevel=-1,loginVipScore=0,loginVipPlace=0;
var VQQPlayer=null,MediaPlayer=null,g_oPlayerCtrl=null,isSongPlaying = false;VH5Player=null;
//标记是否播放器工作
var qqplayer_play_flag = true;
//标记播放列表是否改变
var isPLChanged = false;
function getDynamicXmlData_Ex(itemno,url,callback,err_callback,data)
{	
	return loadXMLAsync(itemno,url,callback,err_callback,false,data);
}
if(!window.$)$=function(id){return document.getElementById(id);}
function playerv2_setinfo(name,value)
{
	var pobj = $("musicSwf");
	if(!!pobj && name=="pos")
	{
		var pos = parseInt(value);
		if(pos>=0&&pos<=1000)
		{
			pobj.setIndex2(pos);
		}
	}
}
function playerv2_setPURL()
{
	var pobj = $("musicSwf");
	if(!pobj) 
	{
		return;
	}
	pobj.SetVariable("default_url","http://imgcache.qq.com/music/photo/album/albumpic_0_que.jpg");
}
/*
function playerv2_setlist(ls)
{
	if(!haveFlashPlayer())
	{
		return;
	}
	var pobj = $("musicSwf");
	if(!pobj) 
	{
		return;
	}
	pobj.setList2(ls);
}
*/
function playerv2_setlist(ls)
{
	function flash_arrayToXML(obj) 
	{ 
		var s = "<array>"; 
		for (var i=0; i<obj.length; i++) 
		{  
			s += "<property id=\"" + i + "\">" + flash_toXML(obj[i]) + "</property>"; 
		}
		return s+"</array>";
	}
	
	function flash_objectToXML(obj) 
	{ 
		var s = "<object>"; 
		for (var prop in obj) 
		{ 
			s += "<property id=\"" + prop + "\">" + flash_toXML(obj[prop]) + "</property>"; 
		}
		return s+"</object>";
	}
	function flash_escapeXML(s) 
	{
		return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;");
	}
	function flash_toXML(value) 
	{   
		if (value instanceof Date) 
		{
			return "<date>" + value.getTime() + "</date>";   
		}
		else if (value instanceof Array) 
		{
			return flash_arrayToXML(value);   
		}
		var type = typeof(value); 
		switch(type)
		{
			case "string":return "<string>" + flash_escapeXML(value) + "</string>"; 
			case "undefined":return "<undefined/>";
			case "number":return "<number>" + value + "</number>"; 
			case null:return "<null/>"; 
			case "boolean":return value ? "<true/>" : "<false/>";
			case "object":return flash_objectToXML(value);   
			default:return "<null/>"; 
		}
	}
	if(!haveFlashPlayer())
	{
		return;
	}
	var pobj = $("musicSwf");
	if(!pobj) 
	{
		return;
	}
	//pobj.setList2(ls);

	pobj.CallFunction("<invoke name=\"setList2\" returntype=\"javascript\"><arguments>" +flash_arrayToXML(ls) + "</arguments></invoke>");
	/*
	function setList2() { 
		return eval(instance.CallFunction("<invoke name=\""+name+"\" returntype=\"javascript\">" + __flash__argumentsToXML(arguments,0) + "</invoke>"));
	}
  */
}

//if(!window.getCookie)
getCookie=function(n)
{
    var r = new RegExp("(\\b)"+n+"=([^;]*)(;|$)");
    var m = document.cookie.match(r);
    return (!m?"":m[2]);
}
function setCookie(n,v,p,d)
{
	if(!p)
	{
		p="/";
	}
	if(!d)
	{
		d="qq.com";
	}
	document.cookie=n+"="+v+"; path="+p+"; domain="+d;
}
function deleteCookie(n,p,d)
{
	if(!p)
	{
		p="/";
	}
	if(!d)
	{
		d="qq.com";
	}
	if(getCookie(n))
	{
		document.cookie=n+"="+"; path="+p+"; domain="+d+"; expires=Thu,01-Jan-70 00:00:01 GMT";
	}
}

//发送读统计状态请求
// @param {string} url
// @param {int} t 超时时间(ms)
function statImgSend(url,t)
{
	try{
		if (typeof(top.tmpMusicStat) != "object")
		{
			top.tmpMusicStat=[];
		}
	}
	catch(e)
	{
		top.tmpMusicStat=[];
	}
	var l = top.tmpMusicStat.length;
	top.tmpMusicStat[l] = new Image();
	with(top.tmpMusicStat[l])
	{
		onload=onerror=new Function('this.ready=true;this.onload=this.onerror=null;top.statImgClean();');
	}
	top.setTimeout("top.tmpMusicStat["+l+"].src = \'"+url+"\';",t);
}
//清理统计状态请求所使用的图片
function statImgClean()
{
	try{
		for(var i=0,l=top.tmpMusicStat.length;i<l;i++)
		{
			if(!!top.tmpMusicStat[i] && !!top.tmpMusicStat[i].ready)
			{
				delete top.tmpMusicStat[i];
			}
		}
	}catch(e){};
}
function openMusicUrl(ul)
{
	var a=ul.split("?");
	ul="http://imgcache.qq.com/music/qzone/musiccanvas.html?uin="+top.g_iUin+"&params="+a[0]+(a.length>1 ? "&"+a[1] : "");
	try{
		/*
		if(typeof(top.tall) == "function")
		{
			top.tall('tmusic',ul);
		}
		else
		*/
		if(typeof(top.QZONE) != "undefined" && "FrontPage" in top.QZONE && top.QZONE.FrontPage.toApp)
		{
			top.QZONE.FrontPage.toApp((!!top.g_OFPLite ? "/myhome" : "")+"/music/"+a[0]+(a.length>1 ? "&"+a[1] : ""));
		}
	}catch(e){}
	return ul;
}
function openMyIdol(id)
{
	openMusicUrl("music_idol");
}
var S_UNDEFINE= 0,S_STOP = 1,S_PAUSE = 2,S_PLAYING = 3,S_FORWORD = 4,S_RESERVSE = 5,S_BUFFERING = 6,S_WAITING = 7,S_MEDIAEND = 8,S_TRANSITION = 9,S_READY = 10,S_RECONNECTION = 11;
//播放列表最大个数
var MAX_PLAYLIST_NUM = 200;
//p2p服务器设置
var P2P_UDP_SVR_IP = "58.61.166.180",P2P_TCP_SVR_IP = "58.61.166.180";
if((new Date()).getTime()%2==0)
{
	P2P_UDP_SVR_IP="119.147.65.30";
	P2P_TCP_SVR_IP="119.147.65.30";
}
if(typeof imgcacheDomain == 'undefined')
{
	imgcacheDomain="imgcache.qq.com";
}
//if(!!top.imgcacheDomain && (top.imgcacheDomain != "imgcache.qq.com" && top.imgcacheDomain.indexOf("ctc") < 0))
if(!!top.g_ISP && ("i" in top.g_ISP && top.g_ISP.i != 4))
{
	P2P_UDP_SVR_IP=["58.251.60.219","60.28.190.121"][(new Date()).getTime()%2];
	P2P_TCP_SVR_IP=["58.251.60.219","60.28.190.121"][(new Date()).getTime()%2];
}

var P2P_UDP_SVR_PORT = 8000,P2P_TCP_SVR_PORT = 433;
var P2P_STUN_SVR_IP = "stun-a1.qq.com",P2P_STUN_SVR_PORT = 8000;
var P2P_TORRENT_URL = "http://219.134.128.55/",P2P_CACHE_SPACE = 100;
//var P2P_CACHE_SPACE = 300;
//上报服务器设置
var STAT_REPORT_SVR_IP = "219.134.128.41",STAT_REPORT_SVR_PORT = 17653;
//music听歌设置
var MUSIC_COOKIE_DOMAIN = "qq.com",PANEL_UIN_COOKIE_NAME = "zzpaneluin",PANEL_KEY_COOKIE_NAME = "zzpanelkey",SESSION_UIN_COOKIE_NAME = "uin",SESSION_KEY_COOKIE_NAME = "skey",MUSIC_UIN_COOKIE_NAME = "qqmusic_uin",MUSIC_KEY_COOKIE_NAME = "qqmusic_key";
//当前播放器版本
var CURRENT_WMP_VERSION = "7.0.0.0",CURRENT_PLAYER_VERSION = "1.3.0.0";
var ACTIVE_INTERVAL = 120;	
var REP_SONGLIST_PORT = 8000;
var REP_SONGLIST_IP_ARRAY = ["121.14.94.181","121.14.94.183"];
//REP_SONGLIST_IP_ARRAY[0] = "121.14.94.181";
//REP_SONGLIST_IP_ARRAY[1] = "121.14.94.183";
var REP_SONGLIST_PROGRAM = "QZoneWebClient";
var REP_PLAYSONG_IP_ARRAY = ["58.60.11.85","121.14.96.113","58.61.165.50","121.14.78.75"];
//seven,在测试环境配置
//音乐库歌曲正在收听上报的ip为 10.1.42.241  17679
//盗链正在收听上报的ip 为:　10.1.42.160   17785
//var REP_PLAYSONG_PORT = 17679;
//REP_PLAYSONG_IP_ARRAY[0] = "10.1.42.160";
//8000是正确端口
var REP_PLAYSONG_PORT = 8000;
//REP_PLAYSONG_IP_ARRAY[0] = "58.60.11.85";
//REP_PLAYSONG_IP_ARRAY[1] = "121.14.96.113";
//REP_PLAYSONG_IP_ARRAY[2] = "58.61.165.50";
//REP_PLAYSONG_IP_ARRAY[3] = "121.14.78.75";
function PlayListObject()
{	
	this.mId = -1;
	this.mSongId = 0;
	this.mSongType = 0;
	this.mSongUrl = "";
	this.mDuration = 0;
	this.mPlayURL = "";
	this.mTorrentURL = "";
	this.mSongName = "";
	this.mSingerName = "";
}
function PlayerListManager()
{	
	this.mFull  = false;
	this.mPosition = -1;
	this.mpList = new Array();
	//获取播放列表的长度
	this.getCount = function()
	{
		return this.mpList.length;
	};
	//获取指定下标的播放列表信息
	this.getObject = function(n)
	{
		return this.mpList[n];
	};
	//根据播放url查找播放列表的下标
	this.getPos = function(sul)
	{
		for(var i=0,l=this.getCount(); i<l; i++)
		{
			if(this.getObject(i).mPlayURL==sul)
			{
				return i ;
			}
		}
		return -1 ;
	};
	//根据播放id查找播放列表的下标
	this.getPosById = function(Id)
	{
		for(var i=0,l=this.getCount(); i<l; i++)
		{
			if(this.getObject(i).mId==Id)
			{
				return i ;
			}
		}
		return -1 ;
	};
	//根据播放id查找对应播放列表内容
	this.findObjectById = function(id)
	{
		var i = this.getPosById(id);
		return (i!=-1 ? this.getObject(i) : null);	
	};	
	//根据播放url查找对应播放列表
	this.findObject = function(sul)
	{	
		var i = this.getPos(sul);
		return (i!=-1 ? this.getObject(i) : null);	
	};
	//添加指定内容到播放列表function(id,sul,strTorrentURL,iDuration,strSongName,strSingerName,strQzoneKey)
	this.addObject = function(id,sul,stpt,iDuration,sSong,sSinger,sQzKey,iSongId,iSongType)
	{	
		if(sul=="")
		{
			return;
		}
		var obj,pos;
		if(id>0)
		{
			pos = this.getPosById(id);
		}
		else if(sul!="")
		{
			pos = this.getPos(sul);
		}
		if(pos==-1)
		{
			if(this.getCount()>=MAX_PLAYLIST_NUM)
			{
				this.mFull  = true;
				this.mPosition+=1;
				if(this.mPosition>=MAX_PLAYLIST_NUM)
				{
					this.mPosition = 0;
				}
				obj = this.getObject(this.mPosition);
			}	
			else
			{	
					obj = new Object();
					this.mpList[this.getCount()] = obj ;
			}
			obj.mId = id;
			obj.mPlayURL = sul;
			obj.mTorrentURL = stpt;
			obj.mDuration = iDuration;
			obj.mSongName = sSong;
			obj.mSingerName = sSinger;
			obj.mQzoneKey = sQzKey;
			//++b
			obj.mSongId = (iSongId || 0);
			obj.mSongType = (iSongType || 0);
			obj.mSongUrl = sul;
			//++e
		}
		return;			
	};
	/*
	//根据播放url更新播放列表
	this.updateObject = function(id,sul,stpt,iDuration,sSong,sSinger,sQzKey)
	{	
		var n = this.getPos(sul);
		if(n != -1)
		{
			this.mpList[n].mId = id;
			this.mpList[n].mDuration = iDuration ;
			this.mpList[n].mTorrentURL = stpt;
			this.mpList[n].mSongName = sSong;
			this.mpList[n].mSingerName = sSinger;
			this.mpList[n].mQzoneKey = sQzKey;
			return true;
		}
		return false;
	};
	
	//根据id更新播放列表
	this.updateObjectById = function(id,sul,stpt,iDuration,sSong,sSinger,sQzKey)
	{	
		var n = this.getPosById(id);
		if(n != -1)
		{
			this.mpList[n].mPlayURL = sul;
			this.mpList[n].mTorrentURL = stpt;
			this.mpList[n].mDuration = iDuration ;
			this.mpList[n].mSongName = sSong;
			this.mpList[n].mSingerName = sSinger;
			this.mpList[n].mQzoneKey = sQzKey;
			return true;
		}
		return false;
	};
	//根据播放url从播放列表中删除指定内容
	this.deleteObject = function(sul)
	{	
		var n = this.getPos(sul);
		if(n!=-1)
		{	
			delete this.mpList[n];
			this.mpList.length-- ;
			return true;
		}
		return false;
	}
	//根据播放id从播放列表中删除指定内容
	this.deleteObjectById = function(id)
	{	
		var n = this.getPosById(id);
		if(n!=-1)
		{	
			delete this.mpList[n];
			this.mpList.length-- ;
			return true;
		}
		return false;
	}
	*/
	//清空播放列表
	this.clearObject = function()
	{	
		for(var i=0,l=this.getCount(); i<l; i++)
		{
			delete this.mpList[i];
		}
		this.mpList.length = 0;
	};
}
function showElement(e)
{
	if(e)
	{
		e.style.display="";
	}
};
function hideElement(e)
{
	if(e)
	{
		e.style.display="none";
	}
}
//设置我喜欢页面的播放暂停状态显示isplay==true，播放状态
function setMyLovePlayState(isplay)
{
	try{
	if(!QZONE.music.isBgMusic)
	{
		var doc=QZONE.music.mylove_doc,tmpS="",ePlay=null,eStop=null;
		if(typeof(doc)=="object" && doc != null)
		{
			
			if(top.g_JData["mini_play_type"] == 1)
			{
				tmpS=""+top.g_JData["my_mini_play_uin"]+"_"+top.g_JData["my_mini_play_songid"];
				ePlay=doc.getElementById("play_"+tmpS);
				eStop=doc.getElementById("stop_"+tmpS);
				
			}
			else
			{
				tmpS=""+top.g_JData["mini_play_uin"]+"_"+top.g_JData["mini_play_songid"];
				ePlay=doc.getElementById("friend_play_"+tmpS);
				eStop=doc.getElementById("friend_stop_"+tmpS);
			}

			isplay ? hideElement(ePlay) : showElement(ePlay);
			isplay ? showElement(eStop) : hideElement(eStop);
			if(top.g_JData["mini_play_"+tmpS] && top.g_JData["mini_play_"+tmpS] == 1)
			{
			 top.g_JData["mini_play_"+tmpS]=(isplay?1:0);
			}
			
		}
	}
	}catch(e){QZONE.music.mylove_doc=null;};
}
//设置我喜欢页面播放进度
function setMyloveProgress(pPos,lCurPos, lTotal)
{
	try{
	
		if(!QZONE.music.isBgMusic)
		{
			var doc=QZONE.music.mylove_doc,tmpS="";
			if(typeof(doc) == "object" && doc != null)
			{
				top.g_JData["mini_play_type"] == 1 ? (tmpS="progress_"+top.g_JData["my_mini_play_uin"]+"_"+top.g_JData["my_mini_play_songid"]) : (tmpS="friend_progress_"+top.g_JData["mini_play_uin"]+"_"+top.g_JData["mini_play_songid"]);
				if(doc.getElementById(tmpS))
				{
				   doc.getElementById(tmpS).style.width=pPos + "%";
				}
			}
		}
	
	}catch(e){QZONE.music.mylove_doc=null;};
}
//设置当前页面播放的播放暂停状态显示isplay==true,播放状态
function setCurPagePlayState(isplay)
{
	try{
		if(!QZONE.music.isBgMusic)
		{
			var p=QZONE.music.pgp_btn_pp;
			if(typeof(p)=="object" && p != null)
			{
				p.className = (isplay ? "pgp_btn_pp pgp_btn_pause" : "pgp_btn_pp pgp_btn_play");
				p.title = (isplay ? _("暂停") : _("播放"));
			}
			
		}
	}catch(e){QZONE.music.pgp_btn_pp=null;};
	setQzicPlayState(isplay);
}
//设置当前页面播放进度
function setCurPageProgress(pPos,lCurPos, lTotal)
{
	try{
		if(!QZONE.music.isBgMusic)
		{
			var p=QZONE.music.pgp_time_prog;
			if(typeof(p)=="object" && p != null)
			{
				p.style.width = pPos + "%";
			}
		}
	}catch(e){QZONE.music.pgp_time_prog=null;};
	setQzicProgress(pPos,lCurPos, lTotal);
}
//设置信息中心页面播放的播放暂停状态显示isplay==true,播放状态
function setQzicPlayState(isplay)
{
	try{
		if(!QZONE.music.isBgMusic)
		{
			var w=QZONE.music.qzic_win;
			if(typeof(w)=="object" && w != null)
			{
				w.QZONE.ICFeeds.App.Music.changePlayState(isplay);
			}
		}
	}catch(e){QZONE.music.qzic_win=null;};

}
//设置信息中心页面的播放进度
function setQzicProgress(pPos,lCurPos, lTotal)
{
	try{
		if(!QZONE.music.isBgMusic)
		{
			var w=QZONE.music.qzic_win;
			if(typeof(w)=="object" && w != null)
			{
				w.QZONE.ICFeeds.App.Music.changePlayTime(lCurPos, lTotal);
			}
		}
	}catch(e){QZONE.music.qzic_win=null;};
}
function autoChangeMultiPlay()
{
	try{
		if(!QZONE.music.isBgMusic)
		{
			var w=QZONE.music.curpage_win;
			if(typeof(w)=="object" && w != null)
			{
				var o=getPlayer();
				if(o && o.mPlayingPos>=0 && o.mPlayList.getCount()>1)
				{
					w.changeMultiPlayState(o.mPlayingPos);
				}
				
			}
		}
	}catch(e){QZONE.music.curpage_win=null;};
}



if (typeof(QZONE) == "undefined" || !QZONE) 
{
	QZONE = {};
}
if(!QZONE.music)
{
	QZONE.music = {};
}
/**
 *获取保存在本地的音量设置
 *
 *@return {Boolean}
 */
function getSOVolume()
{
	try
	{
		var o = QZONE.shareObject.getValidSO();
		if (o) 
		{
			var volume=o.get("music_volume");
			return (!volume) ? 75 : parseInt(volume);		
		}
		else
		{
			return 75;
		}
	}
	catch (e)
	{
		return 75;
	}
}
/**
 *保存音量设置到本地存储
 *
 *@param {Number} volume 
 *@return {Boolean} 
 */
function setSOVolume(volume)
{
	try
	{
		var o = QZONE.shareObject.getValidSO();
		if (o) 
		{
			return o.set("music_volume", volume);	
		}
		else
		{
			return false;
		}
	}
	catch(e)
	{
		return false;
	}
}
/**
 *设置播放控件的音量
 *@param {Number} vol 音量百分比,为0到100的数字，代表0%-100%
 *@param {Boolean} isSave 是否保存 true or false
 */
QZONE.music.setMusicVolume=function(vol,isSave)
{
	if(vol > 100){vol = 100;}
	if(vol < 2){vol = 0;}
	getPlayer() && getPlayer().setVolumn(vol);
	isSave && setSOVolume(vol);
}
/**
 *获取播放控件的音量
 *@return {Number} vol 音量百分比,为0到100的数字，代表0%-100%
 */
QZONE.music.getMusicVolume=function()
{
	return getPlayer() ? getPlayer().getVolumn() : 75;
}
function qusicExpired(st,ct)
{
	return (parseInt(st)<parseInt(ct));
}
function getChildNodeValue(oDoc,sTag)
{
	try{
		var a=oDoc.getElementsByTagName(sTag);
		if(a.length > 0 && a[0].firstChild)
		{
			return a[0].firstChild.nodeValue;
		}
		else
		{
			return "";
		}
	}
	catch(e)
	{
		return "";
	}
}
function loadNewPLXML(it,cb,err_cb)
{
	var ul = "http://qzone-music.qq.com/fcg-bin/cgi_playlist_xml.fcg?uin="+top.g_iUin;
	/*
	if((top.g_XDoc[it])&&(!!top.g_XDoc[it].xml)&&(top.g_XDoc[it].xml!=""))
	{
		if(arguments.length >=2)
		{
			cb();
		}
		return top.g_XDoc[it];
	}
	*/
	if(!top.g_XDoc)
	{
		top.g_XDoc = {};
	}
	var xmlDoc= top.g_XDoc[it];
	if(Browser.isSafari || Browser.isFirefox || (ua && !!ua.chrome))
	{
		if(xmlDoc.nodeType == 9)
		{
			var os = new XMLSerializer();
			xmlDoc = {xml:''};
			xmlDoc.xml = os.serializeToString(top.g_XDoc[it], "text/xml");
		}
	}
	if(xmlDoc!=null && !!xmlDoc.xml && xmlDoc.xml != "")
	{
		if(arguments.length >=2)
		{
			cb();
		}
		return top.g_XDoc[it];
	}
	else
	{
		if(typeof(top.g_XDoc[10])=="object" && top.g_XDoc[10]!=null && "qqmusic" in top.g_XDoc[10])
		{
			top.g_JData[10] = top.g_XDoc[10];
		}
	}
	//top.getDynamicXmlData_Ex(it,ul,cb,err_cb);
	//return top.g_XDoc[it];
	if (top.g_JData[it] && !top.g_JData[it].error)
	{
		cb();
		return;
	}
	top.loadJsonData(it, ul+"&json=1", cb, err_cb, false, "GB2312", "jsonCallback");
	return top.g_JData[it];
}
function loadNewXML(it,cb,err_cb)
{
	loadNewPLXML(it,cb,err_cb);
}
function musicCb_New()
{
	/*
	//alert("musicCb_New 1");
	var o=top.g_XDoc[10];
	if(!o || (!!o.xml && o.xml==""))
	{
		top.g_XDoc[10] = null;
		top.loadNewPLXML(10,musicCb);
		statImgSend("http://qzone-music.qq.com/fcg-bin/fcg_update_playlist.fcg?uin="+top.g_iUin,1000);
	}
	else
	{
		top.loadNewPLXML(10,musicCb);
	}
	*/
	musicCb();
	//alert("musicCb_New 2");
}
String.prototype.entityReplace=function()
{
	return this.replace(/&#38;?/g,"&amp;").replace(/&amp;/g,"&").replace(/&#(\d+);?/g,function(a,b){return String.fromCharCode(b)}).replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,"\"").replace(/&nbsp;/g," ").replace(/&#13;/g,"\n").replace(/(&#10;)|(&#x\w*;)/g,"").replace(/&amp;/g,"&");
}
String.prototype.trim=function()
{
	return this.replace(/^\s+|\s+$/,"");
}
if(typeof(isStar) == "undefined"){try{isStar=(top.QZONE.FrontPage.getBitMapFlag(7)==1)}catch(e){}};
/**
 *获取禁止背景音乐自动播放的标志
 *
 *@param {Number} source : 1,web播放器;2,Qzone工具栏;0:两种来源都判断
 *@return {Boolean}
 */
function getBgForbidFlag(source)
{
	try
	{

		var o = QZONE.shareObject.getValidSO();
		if (o) 
		{
			var webPlayerForbidTime=o.get("music_forbid_time");			
			var webPlayerForbidFlag=o.get("music_forbid_flag");
			//var qzoneForbidTime=o.get("qzone_forbid_time");	
			//var qzoneForbidFlag=o.get("qzone_forbid_flag");
			var nowTime=(new Date()).getTime();
			//if((webPlayerForbidFlag==1 && webPlayerForbidTime > nowTime) || (qzoneForbidFlag==1 && qzoneForbidTime > nowTime))
			//if((webPlayerForbidFlag==1 && webPlayerForbidTime > nowTime) || getCookie('pausemusic')=='1') 
			if((webPlayerForbidFlag==1 && webPlayerForbidTime > nowTime)) 
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
		/*
		if(getCookie('pausemusic')=='1')
		{
			return true;
		}
		else
		{
			return false;
		}
		*/
		
	}
	catch (e)
	{
		return false;
	}
}
/**
 *禁止背景音乐自动播放
 *
 *@param {Boolean} isForbid
 *@return {Boolean} 
 */
function forbidBg(isForbid)
{
	try
	{
		/*
		var o = QZONE.shareObject.getValidSO();
		if (o) 
		{
			o.set("qzone_forbid_time", isForbid ? (new Date()).getTime()+24*60*60*1000 : 0);			
			return o.set("qzone_forbid_flag", isForbid ? 1 : 0);
		}
		else
		{
			return false;
		}
		*/
		setCookie('pausemusic',isForbid ? '1' : '0');
	}
	catch(e)
	{
	}
}
QZONE.music.limitLocal = false;
QZONE.music.getlimitLocal = false;
function getStarLimitLocal()
{
	var url="http://qzone-music.qq.com/fcg-bin/fcg_limit_upload_listen.fcg?uin="+top.g_iUin;
	top.loadJsonData("starlimitlocal", url, starLimitLocalCb, function(){QZONE.music.getlimitLocal = true;QZONE.music.limitLocal = false;musicCb();}, false, void(0),"getQQListCallback");
}
function starLimitLocalCb(data)
{
	QZONE.music.getlimitLocal = true;
	if(data.code==0)
	{
		if(data.limit == 1)
		{
			QZONE.music.limitLocal = true;
			musicCb();
			return;
		}
	}
	
	QZONE.music.limitLocal = false;
	musicCb();
}
QZONE.music.isFirstLoadBg=true;
QZONE.music.isBgMusic=false;
QZONE.music.triggerMusicLoaded=false;
QZONE.music.isNeedUpdatePlayer=false;
/*
(function(){
  //使得Mozilla浏览器能兼容IE的使用方法而定义xml属性和loadXML方法
  if (document.__defineGetter__) {
    Node.prototype.__defineGetter__("xml", function(){
      //Mozilla浏览器要获取xml代码，需要使用XMLSerializer对象
      //XMLSerializer对象对象的唯一方法是serializeToString()，
      //它接受一个oXmlDom节点和一个内容类型作为参数
      var os = new XMLSerializer();
      return os.serializeToString(this, "text/xml");
    });
  }
})();
*/
/**
 * 转化xml数据到json格式的类
 */
xml2json = {
	parser:function(xmlcode)
	{
		xmlcode=xmlcode.replace(/\s*\/>/g,'/>').replace(/<\?[^>]*>/g,"").replace(/<\!\[CDATA\[([^>]*)\]\]>/g,"$1");
		var x=this.no_fast_endings(xmlcode);
		//x=this.attris_to_tags(x);
		x=escape(x).split("%3C").join("<").split("%3E").join(">").split("%3D").join("=").split("%22").join("\"");
		x='<JSONTAGWRAPPER>'+x+'</JSONTAGWRAPPER>';
		this.xmlobject={};
		var y=this.xml_to_object(x).jsontagwrapper;
		
		return y;
	},
	xml_to_object:function(xmlcode)
	{
		var x=xmlcode.replace(/<\//g,"?").split("<"),y=[],level=0,opentags=[];
		for (var i=1;i<x.length;i++)
		{
			//var tagname=x[i].split(">")[0];
			opentags.push(x[i].split(">")[0]);
			level++;
			y.push(level+"<"+x[i].split("?")[0]);
			while(x[i].indexOf("?"+opentags[opentags.length-1]+">")>=0){level--;opentags.pop();};
		};
		var oldniva=-1,objname="this.xmlobject";
		for (var i=0;i<y.length;i++)
		{
			var preeval="",niva=y[i].split("<")[0],tagnamn=(y[i].split("<")[1].split(">")[0]).toLowerCase();
			var rest=y[i].split(">")[1];
			if(niva<=oldniva)
			{
				var tabort=oldniva-niva+1;
				for (var j=0;j<tabort;j++){objname=objname.substring(0,objname.lastIndexOf("."));};
			};
			objname+="."+tagnamn;
			var pobject=objname.substring(0,objname.lastIndexOf("."));
			if (eval("typeof "+pobject) != "object"){preeval+=pobject+"={value:"+pobject+"};\n";};
			var objlast=objname.substring(objname.lastIndexOf(".")+1),already=false;
			for (k in eval(pobject)){if(k==objlast){already=true;}};
			//var onlywhites=true;
			//for(var s=0;s<rest.length;s+=3){if(rest.charAt(s)!="%"){onlywhites=false;}};
			//if (rest!="" && !onlywhites)
			if (rest!="")
			{
				if(rest/1!=rest)
				{
					rest=("'"+rest.replace(/\'/g,"\\'")+"'").replace(/\*\$\*\*\*/g,"</").replace(/\*\$\*\*/g,"<").replace(/\*\*\$\*/g,">");
				}
			}
			else
			{
				rest="{}";
			};
			if(rest.charAt(0)=="'"){rest='unescape('+rest+')';};
			if (already && !eval(objname+".sort")){preeval+=objname+"=["+objname+"];\n";};
			var before="=",after="";
			if (already){before=".push(";after=")";};
			var toeval=preeval+objname+before+rest+after;
			eval(toeval);
			if(eval(objname+".sort")){objname+="["+eval(objname+".length-1")+"]";};
			oldniva=niva;
		};
		return this.xmlobject;
	},
	no_fast_endings:function(x)
	{
		x=x.split("/>");
		for (var i=1;i<x.length;i++)
		{
			var t=x[i-1].substring(x[i-1].lastIndexOf("<")+1).split(" ")[0];
			x[i]="></"+t+">"+x[i];
		};
		x=x.join("");
		return x;
	}
};

function musicJsonCb()
{
	//alert("musicCb 1");
	/**
	 * 是否字符串
	 * 
	 * @param {Object} o 目标
	 * @return {Boolean} 结果
	 */
	function isString(o) {
		return (typeof(o) != 'undefined') && (o!==null) && (typeof(o) == 'string');
	}
	window.addPlReady = true;
	try
	{	 
		var xmlDoc= top.g_XDoc[10];
		if(Browser.isSafari || Browser.isFirefox || (ua && !!ua.chrome))
		{
			if(xmlDoc.nodeType == 9)
			{
				var os = new XMLSerializer();
				xmlDoc = {xml:''};
				xmlDoc.xml = os.serializeToString(top.g_XDoc[10], "text/xml");
			}
		}

		//alert("musicCb 2");
		if(xmlDoc!=null && !!xmlDoc.xml && xmlDoc.xml != "")
		{
			top.g_JData[10]=xml2json.parser(xmlDoc.xml);
		}
		else
		{
			if(typeof(top.g_XDoc[10])=="object" && "qqmusic" in top.g_XDoc[10])
			{
				top.g_JData[10] = top.g_XDoc[10];
			}
		}
		//alert("musicCb 3");
		var musicJson = top.g_JData[10];
		
		if(musicJson!=null && typeof musicJson=="object" && "qqmusic" in musicJson)
		{
			//alert("musicCb 4");
			var obj = getPlayer();
			if(!obj)
			{
				return;
			}
			//alert("musicCb 5");
			var sSongName="",sSingerName="",sPlayURL="",iMusicId=-1,iDissId=-1,sTorrentURL="",sQzoneKey="",sTime=""; iType = 1,iSongId=0;
			var musicnum = 0;
			if(musicJson.qqmusic.xmusicnum!=null)
			{
				musicnum = musicJson.qqmusic.xmusicnum;
			}
			else
			{
				//setTimeout("InitializeDocument()",700);
				return;
			}
			if(parseInt(musicnum) == 0)
			{
				return;
			}
			var songNodes = musicJson.qqmusic.playlist.song;
			if(songNodes == null)
			{
				return;
			}
			if(songNodes.length==null)
			{
				songNodes=[];
				songNodes[0]=musicJson.qqmusic.playlist.song;
			}
			var curtime=musicJson.qqmusic.curtime;
			if(musicJson.qqmusic.systemtime!=null)
			{
				curtime=musicJson.qqmusic.systemtime;
			}
			var beVip = 0,iNetAddNum=0;
			beVip=musicJson.qqmusic.issmarter;
			if(beVip != -1)
			{
				//top.setCookie("beVip",beVip);
				top.isMusicVip = beVip;
			}
			else
			{
				statImgSend("http://qzone-music.qq.com/fcg-bin/fcg_update_playlist.fcg?uin="+top.g_iUin,1000);
				beVip = 1;
			}
		
			//alert("musicCb 6");
			var sLen=songNodes.length;
			if(sLen==0)
			{
				clearInterval(window.qusicName);
				return; 
			}
			//alert("musicCb 7");
			var ls = [];
			var beLimitNet = (beVip == 0);
			var strPath = /qqmusic.qq.com/i;
			var iAddSong = 0;
			for(var i=0;i<sLen;i++)
			{
				var o=songNodes[i];
				sSongName=(isString(o.xsong_name) ? o.xsong_name.entityReplace() : ' ');
				sSingerName=(isString(o.xsinger_name) ? o.xsinger_name.entityReplace() : ' ');
				sPlayURL=URLencode(isString(o.xsong_url) ? o.xsong_url.entityReplace().trim() : '');
				iMusicId=o.xqusic_id;
				iType=o.xctype;
				sTime=o.xexpire_time;
				iDissId=o.xsong_dissid;
				iSongId = iMusicId;
				if(sPlayURL=="")
				{
					continue;
				}
				if(parseInt(iType)>1)
				{
					if(parseInt(iType)==5)
					{
						sPlayURL=sPlayURL.replace(/\[/g,"").replace(/\]/g,"");
						iMusicId=getLocalReportID(sPlayURL);
						sPlayURL += (!!top.isStar) ? '?stdfrom=1' : '?stdfrom=3';
						if(!!top.isStar && (top.g_iLoginUin != top.g_iUin))
						{
							if(QZONE.music.getlimitLocal == true) 
							{
								if(QZONE.music.limitLocal == true)
								{
									continue;
								}
							}
							else
							{
								getStarLimitLocal();
								return;
							}
						}
					}
					sPlayURL=getQusicURL(sPlayURL);
					if(beVip == 1)
					{
					}	
					else
					{
						if(qusicExpired(sTime,curtime))
						{
							sPlayURL="";
							sSongName=sSongName+_("(已过期)");
							var item = 
							{
								label:sSongName+"--"+sSingerName,
								data:75,
								url:"http://imgcache.qq.com/music/photo/album/"+(iDissId%100)+"/albumpic_"+iDissId+"_0.jpg",
								location:""+iDissId
							};
							ls.push(item);
							continue;
						}
					}
					//sQzoneKey = getChildNodeValue(songList[i],"xkey");
					sTorrentURL = "";
					if(sPlayURL.search(strPath))
					{
						sTorrentURL = "http://tpt.music.qq.com/"+getExactQusicID(sPlayURL)+".tpt";
					}

				}
				else
				{
					iMusicId = -1;
					sQzoneKey = "";
					sTorrentURL="";
					
					if(beLimitNet && iNetAddNum==5)
					{
						continue;
					}
					
				}
				if(iAddSong == 0)
				{
					obj.mPlayList.clearObject();
					obj.mPlayingPos = -1;
				}
				iAddSong++;
				obj.mPlayList.addObject(iMusicId,sPlayURL,sTorrentURL,0,sSongName,sSingerName,sQzoneKey,iSongId,iType);
				
				if(parseInt(iType) == 1)
				{
					iNetAddNum++;
				}
				
				var item = 
				{
					label:sSongName+"--"+sSingerName,
					data:75,
					url:"http://imgcache.qq.com/music/photo/album/"+(iDissId%100)+"/albumpic_"+iDissId+"_0.jpg",
					location:""+iDissId
				};
				ls.push(item);
			}
			
			if(!!top.isNewPlayer)
			{
				try
				{
					playerv2_setlist(ls);
					playerv2_setPURL();
				}
				catch(e)
				{
				}
			}
			if(iAddSong == 0)
			{
				return;
			}
			//window.addPlReady=true;
			QZONE.music.isBgMusic=true;
			
			if(QZONE.music.isFirstLoadBg)
			{
				//added by ryanzhao start
				if(!QZONE.music.triggerMusicLoaded)
				{
					if(QZONE.FrontPage && QZONE.FrontPage.triggerMusicLoaded){
						//alert("QZONE.FrontPage.triggerMusicLoaded 1");
						QZONE.FrontPage.triggerMusicLoaded();
						//alert("QZONE.FrontPage.triggerMusicLoaded 2");
					}
					QZONE.music.triggerMusicLoaded=true;
				}
				
			
				//added by ryanzhao end
				//forbidBg(false);
				var forbidBgFlag=getBgForbidFlag();
				if(forbidBgFlag || top.window.isMusicBlog==1)
				{
				}
				else
				{
					if(!window.calledMusicReady)
					{
						//window.calledMusicReady = true;
						runPlayer();
					}
					window.calledMusicReady = false;
					//QZONE.toolbar.musicNotice("change",0);
				}

				//showPlayTool();
			}
			else
			{
				try{
					var w=QZONE.music.curpage_win;
					if(typeof(w)=="object" && w!=null)
					{
						w.resetPlayBtn(10);
						//++b
						clearArray(w.arraySelectPlay);
						//++e
						//window.pausemusic=0;
					}
				}catch(e){
					QZONE.music.curpage_win=null;
				};
				try{
					var w=QZONE.music.qzic_win;
					if(typeof(w)=="object" && w != null)
					{
						w.QZONE.ICFeeds.App.Music.resetPlayBtn(10);
					}
				}catch(e){QZONE.music.qzic_win=null;};
				noticeToolbar("list",obj.mPlayList);
				runPlayer();
				//QZONE.toolbar.musicNotice("change",0);
				QZONE.music.isFirstLoadBg=true;
				window.calledMusicReady = false;
			}
		}
		//alert("musicCb 8");
	}
	catch(e)
	{
		//if(debugMode)
		{
			status =("e 16 "+e.message);
			//alert("e 16 "+e.message);
		}
	}
	
	if(!top.isNewPlayer)
	{
		window.qusicName=setInterval(sendName,1000);
	}
}
function musicCb()
{
	//alert("musicCb 1");
	window.addPlReady = true;
	
	//var xmlDoc= top.g_XDoc[10];
	
	musicJsonCb();
	
}

function addPlayList()
{	
	//alert("addPlayList 1");
	addPlayList_music();
}
function addPlayList_music()
{
	try
	{
		if(window.musicInitReady)
		{
			//setCookie('qqmusic_fromtag',6,"/","qqmusic.qq.com");
			//alert("addPlayList_music 2");
			top.loadNewPLXML(10,musicCb_New);
			//alert("addPlayList_music 3");
		}
		else
		{
			//setTimeout(addPlayList_music,500);
			initMusicR(addPlayList_music);
		}
		
	}
	catch(e)
	{
		//setTimeout(addPlayList_music,500);
		//alert("addPlayList_music e:"+e.message);
	}
}
function loadPlaylist_music()
{
	addPlayList_music();
}
function runPlayer(pos)
{
	if((!top.VQQPlayer)&&(!top.MediaPlayer))
	{
		return;
	}
	if(pos==null)
	{
		pos = -1;
	}

	var bRandomPlay = false;
	try
	{
		top.QZONE.FrontPage.getSecondaryBitMapFlag(function(wholeBitmap,needBitmap){bRandomPlay=(needBitmap>0 ? true : false);if(top.bUseVQQPlayer){VQQPlayer.mRandomPlay = bRandomPlay;}},22,1,top.g_iUin);
	}
	catch(e)
	{
		bRandomPlay = false;
	}
	if(top.bUseVQQPlayer)
	{
		//VQQPlayer.mRandomPlay = bRandomPlay;
		if(pos==-1)
		{
			var cPos=top.VQQPlayer.mPlayingPos;
			if(cPos > -1)
			{
				top.VQQPlayer.runPlayerPos(cPos);
			}
			else
			{
				//top.VQQPlayer.runPlayer('');
				//setAutoPlay(true,bRandomPlay);
				try{
					top.QZONE.FrontPage.getSecondaryBitMapFlag(function(wholeBitmap,needBitmap){bRandomPlay=(needBitmap>0 ? true : false);setAutoPlay(true,bRandomPlay);},22,1,top.g_iUin);
				}
				catch(e)
				{
					setAutoPlay(true,bRandomPlay);
				}
			}
		}
		else
		{
			top.VQQPlayer.runPlayerPos(pos);
		}
	}
	else
	{
		if(pos==-1)
		{
			//top.MediaPlayer.runPlayer('');
			//setAutoPlay(true,bRandomPlay);
			try{
				top.QZONE.FrontPage.getSecondaryBitMapFlag(function(wholeBitmap,needBitmap){bRandomPlay=(needBitmap>0 ? true : false);setAutoPlay(true,bRandomPlay);},22,1,top.g_iUin);
			}
			catch(e)
			{
				setAutoPlay(true,bRandomPlay);
			}
		}
		else
		{
			top.MediaPlayer.runPlayerPos(pos);
		}
	}
	//setAutoPlay(true,bRandomPlay);
}
function setAutoPlay(ba,bRandomPlay)
{
	if(top.qqplayer_play_flag==null)
	{
		top.qqplayer_play_flag = true;
	}
	if(top.qqplayer_play_flag)
	{
		if(top.bUseVQQPlayer && top.VQQPlayer)
		{
			if(top.VQQPlayer.getPlayerSource()==top.VQQPlayer.getCurrentPlayerSource() || top.VQQPlayer.mPlayingPos < 0)
			{
				//if(!top.VQQPlayer.isPause())
				//{
					top.VQQPlayer.autoRandomPlay(top.VQQPlayer,ba,bRandomPlay);
				//}
			}
		}
		else if(top.MediaPlayer)
		{
			//if(!top.MediaPlayer.isPause())
			//{
				top.MediaPlayer.autoRandomPlay(top.MediaPlayer,ba,bRandomPlay);
			//}
		}
	}

	
	if(window.idAutoPlay)
	{
		clearTimeout(window.idAutoPlay);
	}
	window.idAutoPlay = setTimeout("setAutoPlay("+ba+","+bRandomPlay+")",5000);
	
}	
function getPlayer()
{
	return top.bUseVQQPlayer && top.VQQPlayer ? top.VQQPlayer : (!!top.MediaPlayer ? top.MediaPlayer : (!!top.VH5Player ? top.VH5Player : false));
}
function getPlayingPos()
{
	return getPlayer() ? getPlayer().mPlayingPos : -1;
}
function pausePlayer()
{	
	getPlayer() && getPlayer().pausePlayer();
	//QZONE.toolbar.musicNotice("pause");
}	
function stopPlayer()
{
	getPlayer() && getPlayer().stopPlayer();
	
}	
function lastPlayer()	
{
	getPlayer() && getPlayer().lastPlayer();
}	
function nextPlayer()	
{
	getPlayer() && getPlayer().nextPlayer();
}	

function sendName()
{
	try
	{
		if(haveFlashPlayer())
		{
			var pobj = $('musicSwf');
			if(!!pobj) 
			{
				var obj= getPlayer() && getPlayer().getCurrentMusic();
				if(!obj || (obj.mSongName=="")){return;}
				pobj.SetVariable("musicName",obj.mSongName);
			}
		}
	}
	catch(e)
	{
		if(debugMode){status =("e 19 "+e.message);}
	}
}
function swf_music_controller(c,a)
{
	musicSwf_DoFSCommand(c,a);
}
function musicSwf_DoFSCommand(c,args)
{
	switch(c)
	{
		case "Play":(!!top.isNewPlayer) ? Qplay(parseInt(args)) : Qplay(-1);break;
		case "Stop":Qstop();break;
		case "Pause":Qpause();break;
		case "next":
		case "Next":Qnext();break;
		case "previous":
		case "Previous":Qprevious();break;
		case "gotoMusic":top.openMusicUrl("playlist");break;
		case "DoAlbum":QdoAlbum(parseInt(args));break;
		default:break;		
	}
}

function QdoAlbum(id)
{
	openMusicUrl("music_album?id="+id);
}
//播放
function Qplay(pos)
{
	if(top.qqplayer_play_flag!=null)
	{
		top.qqplayer_play_flag = true;
	}
	initMusicR(function(){runPlayer(pos);});
	window.pausemusic=0;
	
}
function isQdo()
{
	if(top.bUseVQQPlayer && top.VQQPlayer)
	{
		if(top.VQQPlayer.getPlayerSource()==top.VQQPlayer.getCurrentPlayerSource())
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	else
	{
		return true;
	}
}
//停止
function Qstop()
{
	function realStop()
	{
		if(top.qqplayer_play_flag!=null)
		{
			top.qqplayer_play_flag = false;
		}
		clearTimeout(window.idAutoPlay);	
		stopPlayer();
	}
	isQdo() && realStop();
	window.pausemusic=1;
}   

QZONE.music.pauseMusic=function()
{
	if(isQdo()){clearTimeout(window.idAutoPlay);pausePlayer();};
	//forbidBg(true);
	window.pausemusic=1;
}
QZONE.music.playMusic=function()
{
	if(top.qqplayer_play_flag!=null)
	{
		top.qqplayer_play_flag = true;
	}
	initMusicR(function(){runPlayer(getPlayingPos());});
	window.pausemusic=0;
	forbidBg(false);
}
function blogPause()
{
	if(isQdo()){clearTimeout(window.idAutoPlay);pausePlayer();};
	/*
	if(QZONE.toolbar && typeof(QZONE.toolbar.pauseMusic)=="function")
	{
		try
		{
			QZONE.toolbar.pauseMusic(true);
		}
		catch (e)
		{
		}
	}
	*/
}
function blogPlay()
{
	try
	{
		if(getBgForbidFlag() ||(top.window.pausemusic&&top.window.pausemusic==1) || (top.Browser && top.Browser.isFirefox && ((!!top.ua && top.ua.windows >= '6.0') || top.QZONE.music.isNeedUpdatePlayer || ua.firefox >= 3.6)))
		{
		}
		else
		{
			initMusicR(function(){top.Qplay(top.getPlayingPos())});
		}
		forbidBg(false);
	}
	catch (e)
	{
	}
	
}
/**
 * 恢复背景音乐播放
 */
QZONE.music.resumeBgMusicPlay=function()
{
	//alert("QZONE.music.resumeBgMusicPlay");
	top.window.isMusicBlog=0;
	//blogPlay();
	try
	{
		if(getBgForbidFlag() ||(top.window.pausemusic&&top.window.pausemusic==1))
		{
		}
		else
		{
			isQdo() && initMusicR(function(){top.Qplay(top.getPlayingPos())});
					
			//initMusicR(function(){top.Qplay(top.getPlayingPos())});
		}
		forbidBg(false);
	}
	catch (e)
	{
	}
}
//暂停
function Qpause()
{
	blogPause();
	window.pausemusic=1;
}
//下一首
function Qnext()
{
    initMusicR(function(){nextPlayer()});
	window.pausemusic=0;
}
//上一首
function Qprevious()
{
   initMusicR(function(){lastPlayer()});
   window.pausemusic=0;
}
function getExactQusicID(sPlayUrl)
{
	var st=sPlayUrl.entityReplace();
	var sl = st.split("/");
	var sm = sl[sl.length - 1];
	var si = sm.split(".");
	return si[0]?si[0]:0;
}
function getLocalReportID(sPlayUrl)
{
	var st=sPlayUrl.entityReplace();
	var sl = st.split("/");
	//var sm = sl[sl.length - 2];
	var sm = sl[4];
	return sm?sm:0;
}

function getQusicURL(sPlayUrl)
{
	if(Browser && Browser.isSafari || (ua && !!ua.chrome))
	{
		return  getQusicH5URL(sPlayUrl);
	}
	else
	{
		var pos = sPlayUrl.indexOf("qqmusic.qq.com");
		if(pos!=-1)
		{
			//var sf=getExactQusicID(sPlayUrl);
			var qusidt = Number(getExactQusicID(sPlayUrl));
			if(qusidt>0 && qusidt<12000000)
			{
				qusidt+= 12000000;
			}
			sPlayUrl = sPlayUrl.substring(0,pos+14)+ "/"+qusidt+(qusidt>30000000 ? ".mp3" : ".wma");
		}
				
		return sPlayUrl;
	}
	
}
function getStreamID(sPlayUrl)
{
	var st=sPlayUrl.entityReplace();
	var sl = st.split("/");
	var sm = sl[2];
	var si = sm.split("m");
	return si[1]?si[1]:0;
}
function getQusicH5URL(sPlayUrl)
{
	var pos = sPlayUrl.indexOf("qqmusic.qq.com");
	if(pos!=-1)
	{
		//var sf=getExactQusicID(sPlayUrl);
		var qusidt = Number(getExactQusicID(sPlayUrl));
		
		if(qusidt>0 && qusidt<30000000)
		{
			if(qusidt > 12000000)
			{
				qusidt -= 12000000;
			}
			qusidt+= 30000000;
		}

		var streamId = parseInt(getStreamID(sPlayUrl));
		streamId=(streamId < 11 ? streamId+10 : streamId);
		sPlayUrl = "http://stream" +streamId+ ".qqmusic.qq.com/"+qusidt+".mp3";
	}
			
	return sPlayUrl;
}
function clearPlayList()
{
	getPlayer() && getPlayer().mPlayList.clearObject();
}
function loadPlaylist()
{
	addPlayList();

}
function URLencode(ss)
{
	if(ss=="http://" ||(ss.substring(0,7)!="http://"&&ss.substring(0,6)!="mms://"))
	{
		return "";
	}
	return ss.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\'/g,"&apos;").replace(/\"/g,"&quot;").replace(/&/g,"%26").replace(/\r/g,"%0A").replace(/\n/g,"%0D").replace(/,/g,"%27");
}
//------------------musicDemo.js 二级页面使用--------
function haveFlashPlayer()
{
	return true;//(top.QZONE.shop.searchItem(6)==null && top.QZONE.shop.searchItem(18)==null) ? false : true;
}
function playOneSong(name,urlin,qusid,ifexp,qzonekey,notCheck,singerName,iSongId,iSongType,call)
{
	QZONE.music.isFirstPlay = false;
	try
	{		
		var url = urlin.trim().entityReplace().replace(/\[/g,"").replace(/\]/g,"");
		//setCookie('qqmusic_fromtag',6,"/","qqmusic.qq.com");
		url=URLencode(url);
		name=name.replace(/&apos;/g,"\'");
		if(url.indexOf("music.qq.com") < 0)
		{
			qusid=0;
		}
		singerName = singerName || "";
		iSongId = iSongId || qusid;
		iSongType = iSongType || 0;
		if(top.bUseVQQPlayer)
		{
			top.VQQPlayer.mPlayList.clearObject();
			var sTorrentURL = "";
			var strPatch = /qqmusic.qq.com/i;
			if(url.search(strPatch))
			{
				if(parseInt(qusid)>0)
				{
					url=getQusicURL(url);
					sTorrentURL = "http://tpt.music.qq.com/"+getExactQusicID(url)+".tpt";
				}
				else
				{
					sTorrentURL = "";
				}
			}
			top.VQQPlayer.setPlayURL(qusid,url,sTorrentURL,0,name,singerName,qzonekey,iSongId,iSongType);
			top.VQQPlayer.mPlayingPos=0;
			QZONE.music.isBgMusic=false;
			if(!QZONE.music.triggerMusicLoaded)
			{
				if(QZONE.FrontPage && QZONE.FrontPage.triggerMusicLoaded){
					QZONE.FrontPage.triggerMusicLoaded();
				}
				QZONE.music.triggerMusicLoaded=true;
			}
			noticeToolbar("list",top.VQQPlayer.mPlayList);
			noticeToolbar("change",0);
			noticeToolbar("play");
			//alert("playOneSong 1");
			if(call){
				EventPlayer(top.VQQPlayer.mPlayerName,"OnStateChanged", call);
			}

			
		}
		else
		{ 
			if((Browser.isSafari || (ua && !!ua.chrome))&& top.VH5Player)
			{
				top.VH5Player.mPlayList.clearObject();
				var strPatch = /qqmusic.qq.com/i;
				if(url.search(strPatch))
				{
					if(parseInt(qusid)>0)
					{
						url=getQusicH5URL(url);
						
					}
				}
				//alert("url:"+url);
				top.VH5Player.runPlayer(url,name,singerName,iSongId,iSongType);	
				QZONE.music.isBgMusic=false;
				if(!QZONE.music.triggerMusicLoaded)
				{
					if(QZONE.FrontPage && QZONE.FrontPage.triggerMusicLoaded){
						QZONE.FrontPage.triggerMusicLoaded();
					}
					QZONE.music.triggerMusicLoaded=true;
				}
				noticeToolbar("list",top.VH5Player.mPlayList);
				noticeToolbar("change",0);
				noticeToolbar("play");
				if(call){
					//EventUtil(top.VH5Player.mPlayerName,"play", call);
					EventUtil(top.VH5Player.mPlayerName,"ended", call);
				}
			}
			/*else 
			{
				updateDownloadPlayer();
				return;
			}*/
			else 
			{
				//alert(333)
				MediaPlayer.mPlayList.clearObject();
				if(parseInt(qusid)>0)
				{
					url=getQusicURL(url);
				}
				//alert(url)
				/*
				if(g_setWmpCookie < 1)
				{
					MediaPlayer.runPlayer("http://qzone-music.qq.com/fcg-bin/fcg_set_musiccookie.fcg?fromtag=12&p="+Math.random());
					g_setWmpCookie = 1;
				}
				else
				{
					MediaPlayer.runPlayer(url);	
				}
				*/
				MediaPlayer.runPlayer(url);	
				if(window.idCheckPlayerTimer)
				{
					window.clearTimeout(idCheckPlayerTimer);
				}
				checkPlayer();
			}
		}
		//alert(5)
		/*if(haveFlashPlayer())
		{
			var pobj = $('musicSwf');
			alert(6)
			if(!!pobj) 
			{
				alert(7)
				pobj.SetVariable("musicName",name);
				if(top.isNewPlayer)
				{
					alert(8)
					pobj.setIndex2(0);
				}
			}
		}*/
	}
	catch(e)
	{
		//alert(e.description)
		if(debugMode)
		{
			status =("e 20 "+e.message);
		}
		//alert("e 20 "+e.message);
	}
}
function playSongWithNoCheck(name,url,qusid,ifexp,qzonekey,singerName,iSongId,iSongType,call)
{
	initMusicR(function(){playOneSong(name,url,qusid,ifexp,qzonekey,true,singerName,iSongId,iSongType,call)},call);
}
//更新播放器
function updateDownloadPlayer()
{
	//alert(updateDownloadPlayer.caller);
	  openDownloadDiv();
}

function openDownloadDiv()
{
	var strHTML = '<iframe id="download_QQPlayer" frameborder="0" src="http://imgcache.qq.com/music/musicbox_v2_1/doc/downloadPlayer.html" allowTransparency="true" style="width:474px;height:311px;"></iframe>';
	top.QZONE.FrontPage.popupDialog(_("下载最新版QQ音乐播放控件"),strHTML, 476, 311);
	top.popupCallback = function()
	{
	}
}
//如果不是QQPlayer控件,
function playOneSong2(name,url,qusid,ifexp,qzonekey,singerName,iSongId,iSongType)
{
	initMusicR(function(){playOneSong(name,url,qusid,ifexp,qzonekey,false,singerName,iSongId,iSongType)});
}
//alert("load music_all");
/*
function showIT()
{
	return;
	bat= 0;
	getUrl();
}
/////////////读取地址////////////////
function getUrl()
{
}
///////////检测歌曲下载////////////////
function load_Music()
{
}
*/
//------------------------------rponline.js---------------------
function m_r_SetCookie(n,v,s)
{
	var expires = new Date(); 
	expires.setTime(expires.getTime()+(s*1000)); 
	document.cookie = n+"="+escape(v)+"; Expires="+expires.toGMTString()+"; PATH=/; DOMAIN=qq.com;";
}
var m_r_r_s="";
function m_r_GetRUin()
{
	if(m_r_r_s.length>0){return m_r_r_s;}
	var u=getCookie("ruv");
	if(u!=null && u.length>0)
	{
		m_r_r_s = u;
		return m_r_r_s;
	}
	m_r_r_s=(""+(Math.random()*10000000000000)).split('.')[0];
	m_r_SetCookie("ruv",m_r_r_s,3600*24*7);
	return m_r_r_s;
}
function m_ru_GetIsLogin()
{
	return (top.g_iLoginUin!=null && top.g_iLoginUin > 10000) ? 1 : 0;
}
function m_rpt_url(url,data)
{
	var tmp =(""+Math.random()+"000000000").substring(2,9);
	var pul = url+"?"+"ruv="+(top.g_iLoginUin>10000 ? top.g_iLoginUin : m_r_GetRUin())+"&login="+m_ru_GetIsLogin()+"&tmp="+tmp+"&"+data;
	var tt = new Image();
	tt.src = pul;
	tt.onload=tt.onerror=function(){this.onload=this.onerror=null;};
}
var m_rpt_f = false;
function m_rpt_box(f,ul,v)
{
	if(ul.indexOf("music.qq.com")>-1 && (!m_rpt_f))
	{
		m_rpt_f = true;
		setTimeout("m_rpt_f=false;",1000*300);
		m_rpt_url("http://pt.music.qq.com/fcgi-bin/cgi_rponline.fcg","qqplay="+f+"&version="+v+"&");
	}
}

var g_isIE = window.ActiveXObject? true : false;
QZONE.music.isFirstPlay = true;
//初始化音乐播放器
//qzone flash加载成功后调用的初始化
function initMusic(cb)
{
	QZONE.music.isFirstPlay = true;
	//QZONE.console.print("initMusic,cb:"+cb);
	//var forbidFlag=getBgForbidFlag();
	//if(!forbidFlag)
	//{
		initMusicR(cb);
	//}
	/*
	else
	{
		if(typeof(cb) == "function")cb();
	}
	*/
	
}
window.calledMusicReady = false;
//当flash music proxy加载播放器完成后回调此方法
function musicReady()
{
	//alert("musicReady:"+musicReady.caller);
	//musicFlashReady();
	//QZONE.console.print("musicReady");
	window.calledMusicReady = true;
	QZONE.music.isFirstPlay = true;
	if(!window.addPlReady)
	{
		initMusicR(addPlayList);
	}
	/*
	else
	{
		Qplay();
	}
	*/
	
}

function includeJS(src, option, _doc)
{
	//var s = new MUSIC.JsLoader();
	//if (typeof(option) == 'function') s.onload = option;
	//s.load(src, _doc, "GB2312");
	UI.getScript(src,option,'gb2312');
}

//-----------------------------music_all_new begin--------------

//----------------------------music_all_new end-------------------
var gQzoneMusicVer = "0",bUseNewPlayer = false;
//真正初始化控件
function initMusicR(cb,call)
{
	//alert(initMusicR.caller);
	//alert("initMusicR 0");
	function realInit(){
	if(!window.musicInitReady)
	{
		if(g_isIE)
		{
			try
			{
				var oPlayerCtrl = new ActiveXObject("QzonePlayer.PlayerCtrl");
				gQzoneMusicVer = oPlayerCtrl.GetPlayerSvrVersion();
				if(gQzoneMusicVer < "3.1")
				{
					throw "QzonePlayer.PlayerCtrl version < 3.1";
				}
				if(gQzoneMusicVer >= "3.2")
				{
					P2P_UDP_SVR_IP = "pdlmusic.p2p.qq.com";
					P2P_TCP_SVR_IP = "pdlmusic.p2p.qq.com";
				}
				oPlayerCtrl.Uninitialize();
				bUseVQQPlayer = true;
				bUseNewPlayer = true;
				if(!window.loadMusicNew)
				{
					includeJS(MI.version.QQMusicPlayer,function(){
						try{
							window.loadMusicNew=true;
							if(!VQQPlayer)VQQPlayer = new QQPlayer();VQQPlayer.createActiveX(true, false, false, "qqplayer", "0", "0", PANEL_UIN_COOKIE_NAME, PANEL_KEY_COOKIE_NAME, "http://www.qq.com");
							VQQPlayer.initialize();
							window.musicInitReady = true;
							if(cb){cb();}
							top.VQQPlayer = VQQPlayer;
							top.bUseVQQPlayer = true;
							top.bUseNewPlayer = true;
						}catch(e){}
					})
				}
				else
				{
					try{
						if(!VQQPlayer)VQQPlayer = new QQPlayer();
						VQQPlayer.createActiveX(true, false, false, "qqplayer", "0", "0", PANEL_UIN_COOKIE_NAME, PANEL_KEY_COOKIE_NAME, "http://www.qq.com");
						VQQPlayer.initialize();
						window.musicInitReady = true;
						if(cb){cb();}
					}catch(e){}
				}
				return;
			}
			catch(e)
			{
				try
				{
					window.g_oPlayerCtrl = new ActiveXObject("QQPlayerSvr.PlayerCtrl");
					if(window.g_oPlayerCtrl.GetPlayerSvrVersion() >= "3.0")
					{
						throw "QQPlayerSvr.PlayerCtrl version >= 3.0";
					}
					bUseVQQPlayer = true;
				}
				catch (e)
				{
					bUseVQQPlayer = false;
				}
			}
			if(bUseVQQPlayer)
			{
				//使用vqq播放器
				if(!window.loadMusicOld)
				{
					includeJS("http://mat1.gtimg.com/www/mb/js/music_all_old.js",function(){
						try{
							window.loadMusicOld=true;
							if(!VQQPlayer)VQQPlayer = new QQPlayer();
							VQQPlayer.createActiveX(true, false, false, "qqplayer", "0", "0", PANEL_UIN_COOKIE_NAME, PANEL_KEY_COOKIE_NAME, "http://www.qq.com");
							VQQPlayer.initialize();
							window.musicInitReady = true;
							if(cb){cb();}
						}catch(e){}
					})
				}
				else
				{
					try{
						if(!VQQPlayer)VQQPlayer = new QQPlayer();
						VQQPlayer.createActiveX(true, false, false, "qqplayer", "0", "0", PANEL_UIN_COOKIE_NAME, PANEL_KEY_COOKIE_NAME, "http://www.qq.com");
						VQQPlayer.initialize();
						window.musicInitReady = true;
						if(cb){cb();}
					}catch(e){}
				}
				if(cb){cb();}
				return;
			}
			else
			{
				if(!window.loadMusicWmp)
				{
					includeJS(MI.version.QQMusicWmpPlayer,function(){
						try{
							window.loadMusicWmp=true;
							if(!MediaPlayer)MediaPlayer = new WMPlayer();MediaPlayer.createActiveX(true, false, "wmplayer", "0", "0",  PANEL_UIN_COOKIE_NAME, PANEL_KEY_COOKIE_NAME, "http://www.qq.com");
							MediaPlayer.initialize();
							window.musicInitReady = true;
							if(cb){cb();}
							}catch(e){}
						})
				}
				else
				{
					//使用媒体播放器
					if(!MediaPlayer)MediaPlayer = new WMPlayer();
					MediaPlayer.createActiveX(true, false, "wmplayer", "0", "0",  PANEL_UIN_COOKIE_NAME, PANEL_KEY_COOKIE_NAME, "http://www.qq.com");
					MediaPlayer.initialize();
					window.musicInitReady = true;
					if(cb){cb();}
					return;
				}

			}
			
		}
		else if(Browser.isFirefox || Browser.isOpera)
		{
			//alert("Browser.isFirefox");
			//FF下暂时屏蔽vista和win7,目前的控件有可能crash.
			if(ua.windows >= 6.0 || ua.firefox >= 3.6 || Browser.isOpera)
			{
				if(!window.loadMusicWmp)
				{
					includeJS(MI.version.QQMusicWmpPlayer,function(){
						try{
							window.loadMusicWmp=true;
							if(!MediaPlayer)MediaPlayer = new WMPlayer();MediaPlayer.createActiveX(true, false, "wmplayer", "0", "0",  PANEL_UIN_COOKIE_NAME, PANEL_KEY_COOKIE_NAME, "http://www.qq.com");
							MediaPlayer.initialize();
							window.musicInitReady = true;
							if(cb){cb();}
							return;
							}catch(e){}
						})
				}
				else
				{
					//使用媒体播放器
					if(!MediaPlayer)MediaPlayer = new WMPlayer();
					MediaPlayer.createActiveX(true, false, "wmplayer", "0", "0",  PANEL_UIN_COOKIE_NAME, PANEL_KEY_COOKIE_NAME, "http://www.qq.com");
					MediaPlayer.initialize();
					window.musicInitReady = true;
					if(cb){cb();}
					return;
				}
				
				
				/*MI.alert("对不起，该功能目前不支持您的浏览器。");
				QZONE.music.isFirstPlay = false;
				if(call){call(101);}*/
				return false;
				
			}
			if(!window.loadMusicNew)
			{
				includeJS(MI.version.QQMusicPlayer,function(){
					try{
						window.loadMusicNew=true;
						if(!VQQPlayer)VQQPlayer = new QQPlayer();
						VQQPlayer.createActiveX(true, false, false, "qqplayer", "0", "0", PANEL_UIN_COOKIE_NAME, PANEL_KEY_COOKIE_NAME, "http://www.qq.com");
						if(VQQPlayer.initialize()){
							window.musicInitReady = true;
							if(cb){cb();}
						}else{
							if((cb && cb.toString().indexOf("addPlayList") < 0) || !!top.g_OFPLite){
								updateDownloadPlayer();
							}
						}
					}catch(e){}
				})
			}
			else
			{
				try{
					if(!VQQPlayer)VQQPlayer = new QQPlayer();
					VQQPlayer.createActiveX(true, false, false, "qqplayer", "0", "0", PANEL_UIN_COOKIE_NAME, PANEL_KEY_COOKIE_NAME, "http://www.qq.com");
					if(VQQPlayer.initialize()){
						window.musicInitReady = true;
						if(cb){cb();}
					}else{
						if((cb && cb.toString().indexOf("addPlayList") < 0) || !!top.g_OFPLite){
							updateDownloadPlayer();
						}
					}
				}catch(e){}
			}	
		}else if(Browser.isSafari || (ua && !!ua.chrome))
		{
			if(/win/.test(navigator.platform.toLowerCase()) && Browser.isSafari && !!top.g_OFPLite && !QZONE.music.getQuickTimePlugin())
			{
				MI.alert(_("对不起，您需要先安装QuickTime才能播放"));
				if(call){call(102);}
			}
			bUseVQQPlayer = false;
			bUseNewPlayer = false;
			//alert("safari");
			if(!window.loadH5Audio)
			{
				includeJS(MI.version.QQMuicHtml5Player,function(){
					try{
						window.loadH5Audio=true;
						if(!VH5Player)VH5Player = new H5AudioPlayer();
						VH5Player.createActiveX(true, false, "h5player", "0", "0",  PANEL_UIN_COOKIE_NAME, PANEL_KEY_COOKIE_NAME, "http://www.qq.com");
						VH5Player.initialize();
						window.musicInitReady = true;
						if(cb){cb();}
					}catch(e){}
				})
			}
			else
			{
				//使用html5 audio播放器
				if(!VH5Player)VH5Player = new H5AudioPlayer();
				VH5Player.createActiveX(true, false, "h5player", "0", "0",  PANEL_UIN_COOKIE_NAME, PANEL_KEY_COOKIE_NAME, "http://www.qq.com");
				VH5Player.initialize();
				window.musicInitReady = true;
				if(cb){cb();}
				return;
			}

		}
		else if(!!top.g_OFPLite)
		{
			MI.alert(_("对不起，该功能目前不支持您的浏览器。"));
				if(call){call(101);}
		}
	}
	else
	{
		if(cb){cb();};
	}
	}
	if(g_isIE)
	{
		realInit();
	}
	else
	{
		setTimeout(realInit,1000);
	}
}
QZONE.music.getQuickTimePlugin = function()
{
	var n=navigator;
	if (n.plugins && n.plugins.length) 
	{
		for (var ii=0;ii<n.plugins.length;ii++) 
		{
			if(/quicktime/.test(n.plugins[ii].name.toLowerCase()))
			{
				return true;
			}
		}
	}
	
	return false;
}


//Qzone工具栏播放和暂停按钮显示控制和click功能实现
/*QZONE.music.isPlaying=function()
{
	var obj=getPlayer();
	if(!obj)
	{
		return false;
	}
	if(top.bUseVQQPlayer)
	{
		return (obj.getPlayerSource()==obj.getCurrentPlayerSource() && obj.isPlaying());
	}
	else
	{
		return obj.isPlaying();
	}
}*/
function isPlaying()
{
	return QZONE.music.isPlaying();
}
//获取当前播放状态
/*QZONE.music.getPlayStatus=function()
{
	return getPlayer() && getPlayer().getStatus();
}
//获取播放进度
QZONE.music.getPlayProgress=function()
{
	var obj=getPlayer();
	if(!obj)
	{
		return {lCurPos:0,lTotal:0};
	}
	if(top.bUseVQQPlayer)
	{
		return {lCurPos:obj.mCurPlayPos,lTotal:obj.mCurPlayTotal};
	}
	else
	{
		return {lCurPos:obj.mPlayerName.Controls.currentPosition,lTotal:obj.mPlayerName.currentMedia.duration};
	}
}*/
//获取当前播放歌曲信息
/*QZONE.music.getCurPlaySongInfo=function()
{
	var obj=getPlayer();
	if(!obj)
	{
		return null;
	}
	if(obj.mPlayList.getCount()>0)
	{
		var curPos = (obj.mPlayingPos >= 0 && obj.mPlayingPos < obj.mPlayList.getCount() ? obj.mPlayingPos : 0);
		return obj.mPlayList.getObject(curPos);
	}
}*/
//获取当前播放列表中所有的歌曲信息
/*QZONE.music.getAllPlaySongInfo=function()
{
	var curList=[];
	var o=getPlayer();
	if(!o)
	{
		return curList;
	}
	return o.mPlayList;
	
}*/
//听当前空间背景音乐
/*QZONE.music.playBgMusic=function()
{
	
	QZONE.music.isFirstLoadBg=false;
	initMusicR(addPlayList);
	
}*/
function noticeToolbar(c,d)
{
	if(QZONE.toolbar && typeof QZONE.toolbar.musicNotice=="function"){
		QZONE.toolbar.musicNotice(c,d);
	}
}
/*
//切换播放一首歌曲
QZONE.music.changePlayMusic=function(index)
{
	runPlayer(index);
	//QZONE.toolbar.musicNotice("change");
	noticeToolbar("change",index);
	
}
QZONE.music.scrollTop=function()
{
	try{
		//scrollTop 优化 100716 seven
		if (_d = $("mode_main")) {
			_p = QZFL.dom.getPosition(_d);
			_st = QZFL.dom.getScrollTop();
			//当工具栏占满到屏幕的30%或者越过某条线的时候走该逻辑
			if((_p.top - _st > 0.3 * QZFL.dom.getClientHeight()) || _st > _p.top - 80){
				// 返回到页面顶部某个位置
				QZFL.dom.setScrollTop(_p.top - 80); 
			}
		}
	}
	catch(e){};
}*/
/**
 * 获取用户bitmap
 * 
 * @param {}
 *            cb
 * @return {}
 */
/*QZONE.music.getUserBitmap = function(cb) {
	if (isHashMap(top.g_JData["usermusicbitmap"])&& ("ret" in top.g_JData["usermusicbitmap"])&& top.g_JData["usermusicbitmap"].ret >= 0) {
		if (cb) {
			cb();
		}
		return top.g_JData["usermusicbitmap"];
	}
	var queryurl = "http://qzone-music.qq.com/fcg-bin/fcg_get_option.fcg?uin=" + top.g_iLoginUin+"&p="+Math.random();
	function dealwith1() {
	
			if (cb) {
				cb();
			}
		
	}
	function err_dealwith1() {
		if (cb) {
			cb();
		}
	}
	
	loadJsonData("usermusicbitmap", queryurl, dealwith1, err_dealwith1,	true, "GB2312", "jsonCallback");
}*/
/**
 * 设置用户bitmap
 * 
 * @param {}  data {uin:,type:0,index:1,value:1}
 * @param {}  cb
 * @return {}
 */
/*QZONE.music.setUserBitmap = function(data,cb) {
	if (isHashMap(data)	&& ("uin" in data) && ("type" in data) && ("index" in data)	&& ("value" in data)) {
		
		var queryurl = "http://qzone-music.qq.com/fcg-bin/fcg_set_option.fcg?uin=" + data["uin"]+"&type="+data["type"]+"&index="+data["index"]+"&value="+data["value"]+"&p="+Math.random();
		function dealwith1() {
			if (cb) {
				cb();
			}
		}
		function err_dealwith1() {
			if (cb) {
				cb();
			}
		}
		
		loadJsonData("setmusicbitmap", queryurl, dealwith1, err_dealwith1, true, "GB2312", "jsonCallback");
	}
	else
	{
		MI.alert("参数非法");
	}
}*/
/**
 * 获取登录用户是否自动播放背景音乐标志
 */
/*QZONE.music.getNotAutoPlayFlag=function(cb)
{
	QZONE.music.getUserBitmap(function(){
		top.g_JData["notautoplayflag"] = 0;
		if (isHashMap(top.g_JData["usermusicbitmap"])&& ("ret" in top.g_JData["usermusicbitmap"])&& top.g_JData["usermusicbitmap"].ret >= 0) {
			top.g_JData["notautoplayflag"] = (top.g_JData["usermusicbitmap"].flag & 0x00000004);
		}
		if(cb)
		{
			cb(top.g_JData["notautoplayflag"]);
		}
	});
}*/
/**
 * 设置登录用户是否自动播放背景音乐标志
 */
/*QZONE.music.setNotAutoPlayFlag=function(flag,cb)
{
	if (isHashMap(top.g_JData["usermusicbitmap"])&& ("ret" in top.g_JData["usermusicbitmap"])&& top.g_JData["usermusicbitmap"].ret >= 0) {
		if(flag)
		{
			top.g_JData["notautoplayflag"] = 1;
			top.g_JData["usermusicbitmap"].flag=(top.g_JData["usermusicbitmap"].flag | 0x00000004);
		}
		else
		{
			top.g_JData["notautoplayflag"] = 0;
			top.g_JData["usermusicbitmap"].flag=(top.g_JData["usermusicbitmap"].flag & 0xFFFFFFFB);
		}
				
	}
	var data1={uin:top.g_iLoginUin,type:0,index:0,value: (flag ? 1 : 0)};
	QZONE.music.setUserBitmap(data1,function(){
		var ret = parseInt(top.g_JData["setmusicbitmap"].ret);
		if(ret >= 0)
		{
			if (isHashMap(top.g_JData["usermusicbitmap"])&& ("ret" in top.g_JData["usermusicbitmap"])&& top.g_JData["usermusicbitmap"].ret >= 0) {
				if(flag)
				{
					top.g_JData["notautoplayflag"] = 1;
					top.g_JData["usermusicbitmap"].flag=(top.g_JData["usermusicbitmap"].flag | 0x00000001);
				}
				else
				{
					top.g_JData["notautoplayflag"] = 0;
					top.g_JData["usermusicbitmap"].flag=(top.g_JData["usermusicbitmap"].flag & 0xFFFFFFFE);
				}
				
			}
		}
		else
		{
			switch(ret)
			{
				case -1: 
					//MI.alert("请先登录");
					break;
				case -11:
					//MI.alert("请先登录");
					break;
				default:
					break;
			}
		}
		if(cb)
		{
			cb(top.g_JData["setmusicbitmap"]);
		}
		
	});
}*/
//设置一首歌曲为背景音乐
/*QZONE.music.addOneBgMusic=function(songId,songType)
{
		var sid=songId;
		var stype=songType % 10;
		if(isNaN(parseInt(sid,10)) || parseInt(sid,10) < 1 || (stype in {2:1,3:1,4:1}) && parseInt(sid,10)>20000000)
		{
			MI.alert('歌曲信息非法！');
			return false;
		}
		if(top.g_iLoginUin==top.g_iUin && top.g_iUin>10000)
		{
			if(!window.loadMusicTool)
			{
				includeJS("http://mat1.gtimg.com/www/mb/js/music_tool.js",function(){try{window.loadMusicTool=true;QZONE.music.setBgMusic.addBgMusicFromFav(sid,stype,false);}catch(e){}});
			}
			else
			{
				QZONE.music.setBgMusic.addBgMusicFromFav(sid,stype,false);
			}
		}
		else
		{
			if(stype==1)
			{
				MI.alert('网络歌曲不允许转载到背景音乐！');
				return false;
			}
			if(stype==5)
			{
				MI.alert('本地上传歌曲不允许转载到背景音乐！');
				return false;
			}
			
			if(!window.loadMusicTool)
			{
				includeJS("http://mat1.gtimg.com/www/mb/js/music_tool.js",function(){try{window.loadMusicTool=true;QZONE.music.setBgMusic.quoteBgMusic(sid,stype);}catch(e){}});
			}
			else
			{
				QZONE.music.setBgMusic.quoteBgMusic(sid,stype);
			}
		}
		return false;
}
*/
