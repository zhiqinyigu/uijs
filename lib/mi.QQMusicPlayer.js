//debugMode=true;
//新控件只有7种状态
var S_UNDEFINE= 0,S_STOP = 1,S_PAUSE = 2,S_PLAYING = 3,S_BUFFERING = 4,S_PLAYBEGIN = 5,S_PLAYEND = 6;
//var REP_PLAYURL_IP = "121.14.94.183";
var REP_PLAYURL_IP_ARRAY = [];
REP_PLAYURL_IP_ARRAY[0] = "121.14.73.62";
REP_PLAYURL_IP_ARRAY[1] = "121.14.73.48";
REP_PLAYURL_IP_ARRAY[2] = "58.60.9.178";
REP_PLAYURL_IP_ARRAY[3] = "58.61.165.54";
var REP_PLAYURL_PORT=17785;
if(!window.m_rpt_box)m_rpt_box=function(f,ul,v){}
if(!window.$)$=function(id){return document.getElementById(id);}
if(!window.getElementInBody)getElementInBody=function(id,tagName)
{
	var e = $(id);
	if (!e)
	{
		tagName = (!tagName)?"div":tagName; 
		e = document.createElement(tagName);
		e.id = id;
	   document.body.appendChild(e);
	}
	return e;
}
function StrBuf(){this._s_=[];}
StrBuf.prototype.a=function(s){this._s_.push(s);}
StrBuf.prototype.c=function(){this._s_=[];}
StrBuf.prototype.d=function(){this._s_=null;}
StrBuf.prototype.toS=function(){return this._s_.join("");}
function insertQQPlayer(args)
{
	g_isIE = window.ActiveXObject? true : false;
	if(g_isIE)
	{
		//alert("insertQQPlayer 0");
		params = {};
		objAttrs = {};
		for (var k in args)
		{
			switch (k)
			{	
				case "classid":
					continue;
					break;
				case "style":
				case "name":
				case "height":
				case "width":
				case "id":
					objAttrs[k] = args[k];
					break;
				default:
					params[k] = args[k];
			}
		}
		objAttrs["classid"] = "CLSID:E05BC2A3-9A46-4A32-80C9-023A473F5B23";
		var str = new StrBuf();
		str.a('<object ');
		for (var i in objAttrs)
		{
			str.a(i);str.a('="');str.a(objAttrs[i]);str.a('" ');
		}
		str.a('>');
		for (var i in params)
		{
			str.a('<param name="');str.a(i);str.a('" value="');str.a(params[i]);str.a('" /> ');
		}
		str.a('</object>');
		g_playerDiv = getElementInBody("musicproxy","div");
		g_playerDiv.innerHTML = str.toS();
		str.d();
		return g_playerDiv.firstChild;
	}
	else
	{
		//FF下暂时屏蔽vista和win7,目前的控件有可能crash.
		if(!!ua && ua.windows >= '6.0')
		{
			return false;
		}
		//alert("insertQQPlayer 1");
		g_playerDiv = getElementInBody("musicproxy","div");
		g_playerDiv.innerHTML = '<embed id="QzoneMusic" type="application/tecent-qzonemusic-plugin" width="0px" height="0px" />';
		var QzonePlayer = document.getElementById('QzoneMusic');
		
		QzonePlayer.CreateAX("QzoneMusic.dll");
		for (var k in args)
		{
			switch (k)
			{	
				case "classid":
				case "style":
				case "name":
				case "height":
				case "width":
				case "id":
				//case "UsedWhirl":
				case "P2PUDPServ_IP":
				case "P2PTCPServ_IP":
					continue;
					break;
				default:
					QzonePlayer.setAttribute(k, args[k]);
			}
		}
		gQzoneMusicVer = QzonePlayer.GetPlayerSvrVersion();
		//QzonePlayer.setAttribute("UsedWhirl", ((compareString(gQzoneMusicVer,"3.3.196.1216") >= 0 ) ? 0 : 1));
		if(gQzoneMusicVer >= "3.2")
		{
			P2P_UDP_SVR_IP = "pdlmusic.p2p.qq.com";
			P2P_TCP_SVR_IP = "pdlmusic.p2p.qq.com";
		}
		QzonePlayer.setAttribute("P2PUDPServ_IP",P2P_UDP_SVR_IP);
		QzonePlayer.setAttribute("P2PTCPServ_IP",P2P_TCP_SVR_IP);
		
		bUseVQQPlayer = true;
		bUseNewPlayer = true;
		//alert("insertQQPlayer 1");
		return QzonePlayer;
	}
}

// 设置播放控件的各种参数，有如下列表：
//	参数名					值类型		说明
//PlayerType				long			使用播放控件类型（0-非法 1=VQQPlayer 2-QMP其它值预留）
//CacheSize				long			缓冲区大小
//ValidDomain				string		播放器有效域名
//EnableSyncListen			bool			启用同步听歌上报(0,1)
//UploadStatCount			long			在播放过程中达到UploadStatCount首歌曲就上报收听列表
//ExitDelayTime			long			延时退出时间（单位：秒）
//UsedWhirl				long			使用旋风下载
//RestrictHttpStartInterval		long			HTTP限速下限
//RestrictHttpStopInterval		long			HTTP限速上限
//P2PUDPServ_IP 			string		P2P UDP服务器IP地址
//P2PUDPServ _Port			short		P2P UDP服务器IP端口
//P2PTCPServ_IP 			string		P2P TCP服务器IP地址
//P2PTCPServ _Port			short		P2P TCP服务器IP端口
//P2PStunServ_IP 			string		P2P Stun服务器IP地址
//P2PStunServ _Port			short		P2P Stun服务器IP端口
//RepSongList_IP			string		上报收听列表服务器IP地址
//RepSongList_Port			short		上报收听列表服务器端口
//RepSongList_Program		string		上报收听列表应用程序名称
//RepPlaySong_IP			string		上报正在收听QQ音乐服务器IP地址
//RepPlaySong_Port			short		上报正在收听QQ音乐服务器端口
//RepPlayURL_IP 			string		上报正在收听网络URL服务器IP地址
//RepPlayURL_Port			short		上报正在收听网络URL服务器IP端口
//<OBJECT ID="QzonePlayer" CLASSID="CLSID:E05BC2A3-9A46-4A32-80C9-023A473F5B23">
//p2p服务器设置
/*
P2P_UDP_SVR_IP = "pdlmusic.p2p.qq.com";
P2P_TCP_SVR_IP = "pdlmusic.p2p.qq.com";
if(!imgcacheDomain)
{
	imgcacheDomain="imgcache.qq.com";
}
if(!!top.imgcacheDomain && top.imgcacheDomain != "imgcache.qq.com")
{
	if((new Date()).getTime()%2==0)
	{
		P2P_UDP_SVR_IP="58.251.60.219";
		P2P_TCP_SVR_IP="58.251.60.219";
	}
	else
	{
		P2P_UDP_SVR_IP="60.28.190.121";
		P2P_TCP_SVR_IP="60.28.190.121";
	}
}
*/
//检查并初始化控件参数
function compareString(s1,s2)
{
	var ss1 = s1.split(".");
	var ss2 = s2.split(".");
	var num = ss1.length;
	if(num>ss2.length)
	{
		num = ss2.length;
	}
	for(var i=0;i<num;i++)
	{
		if(parseInt(ss1[i],10)>parseInt(ss2[i],10))
		{
			return 1;
		}
		else if(parseInt(ss1[i],10)<parseInt(ss2[i],10))
		{
			return -1;
		}
	}
	return 0;
}
function EventPlayer(oTarget,sEventType,fnHandler)
{
	if(oTarget.attachEvent)
	{
		oTarget.attachEvent(sEventType,fnHandler);
	}
	else if(oTarget.addEventListener)
	{
		oTarget.addEventListener(sEventType,fnHandler,false);
	}
	else
	{
		oTarget[sEventType]=fnHandler;
	}
}
function EventPlayerRemove(oTarget,sEventType,fnHandler)
{
	if(oTarget.detachEvent)
	{
		oTarget.detachEvent(sEventType,fnHandler);
	}
	else if(oTarget.removeEventListener)
	{
		oTarget.removeEventListener(sEventType,fnHandler,false);
	}
	else
	{
		oTarget[sEventType]=null;
	}
}
function EventUtil(oTarget,sEventType,fnHandler)
{
	if(oTarget.attachEvent)
	{
		oTarget.attachEvent("on"+sEventType,fnHandler);
	}
	else if(oTarget.addEventListener)
	{
		oTarget.addEventListener(sEventType,fnHandler,false);
	}
	else
	{
		oTarget["on"+sEventType]=fnHandler;
	}
}
function EventUtilRemove(oTarget,sEventType,fnHandler)
{
	if(oTarget.detachEvent)
	{
		oTarget.detachEvent("on"+sEventType,fnHandler);
	}
	else if(oTarget.removeEventListener)
	{
		oTarget.removeEventListener(sEventType,fnHandler,false);
	}
	else
	{
		oTarget["on"+sEventType]=null;
	}
}
function createPlayer()
{
	//alert("createPlayer 0");
	var ttii =(parseInt(Math.random()*1000))%REP_PLAYSONG_IP_ARRAY.length;
	var ttii2 =(parseInt(Math.random()*1000))%REP_SONGLIST_IP_ARRAY.length;
	var ttii3 =(parseInt(Math.random()*1000))%REP_PLAYURL_IP_ARRAY.length;
	if(typeof gQzoneMusicVer != "string")
	{
		gQzoneMusicVer = "0";
	}
	return insertQQPlayer(
	{
		id:'QzonePlayer',height:0,width:0,PlayerType:2,CacheSize:P2P_CACHE_SPACE,
		ValidDomain:'qq.com',EnableSyncListen:1,UploadStatCount:10,ExitDelayTime:5,
		UsedWhirl:((compareString(gQzoneMusicVer,"3.3.196.1216") >= 0 ) ? 0 : 1),RestrictHttpStartInterval:1,RestrictHttpStopInterval:100,
		P2PUDPServ_IP:P2P_UDP_SVR_IP,P2PUDPServ_Port:P2P_UDP_SVR_PORT,
		P2PTCPServ_IP:P2P_TCP_SVR_IP,P2PTCPServ_Port:P2P_TCP_SVR_PORT,
		P2PStunServ_IP:P2P_STUN_SVR_IP,P2PStunServ_Port:P2P_STUN_SVR_PORT,
		RepPlaySong_IP:REP_PLAYSONG_IP_ARRAY[ttii],RepPlaySong_Port:REP_PLAYSONG_PORT,
		RepSongList_IP:REP_SONGLIST_IP_ARRAY[ttii2],RepSongList_Port:REP_SONGLIST_PORT,
		RepPlayURL_IP:REP_PLAYURL_IP_ARRAY[ttii3],RepPlayURL_Port:REP_PLAYURL_PORT
	});
}
function QQPlayer()
{
	//播放歌曲列表
	this.mPlayList = new PlayerListManager();	
	//当前播放的歌曲在播放列表中的位置
	this.mPlayingPos = -1;
	//当前歌曲的播放进度位置
	this.mCurPlayPos = 0;
	//当前歌曲的长度
	this.mCurPlayTotal = 0;
	//this.mCurPausePos = 0;
	//this.startFromPausePos = false;
	this.mPlayerSource = "";
	//当前控件播放源
	this.mCurPlaySrc = "";
	this.mPlayerType = "";
	//++当前播放器状态
	this.mPlayerState = S_UNDEFINE;
	//++是否随机播放
	this.mRandomPlay = false;
	this.mPlayerName = "";
	this.mP2P = false;
	this.mSyncStatus = false;
	this.mExistTime = 0;
	this.mUinCookie = 0;
	this.mKeyCookie = "";
	this.mFromTag = 0;
	this.mIsInit = false;
	this.mInstall = false;
	this.mAlwreadyCheck = false;
	//user click "stop"　button
	this.mHumanStop = false;								
	this.mHumanPause = false;
	//set udp report svr info
	this.mNotSetUdpReport = false;		
	this.plv = "0";
	this.setPlayParams = function(iMusicId,sul)
	{
		//设置播放的参数
		//this.mPlayerName.SetParameter("ValidDomain","qq.com");
		//alert("ver:"+this.mPlayerName.GetPlayerSvrVersion());
		this.mPlayerName.SetCookie("qqmusic_uin",this.mUinCookie);
		this.mPlayerName.SetCookie("qqmusic_key",this.mKeyCookie);
		this.mPlayerName.SetCookie("qqmusic_fromtag",this.mFromTag);
		//iMusicId = iMusicId - 2000000;
		var tiMusicId = ""+iMusicId;
		this.mPlayerName.SetCookie("qqmusic_musicid",tiMusicId);
		this.mPlayerName.SetCookie("qqmusicchkkey_key",this.mKeyCookie);
		this.mPlayerName.SetCookie("qqmusicchkkey_url",sul);
		if(!this.mNotSetUdpReport)
		{
			this.mNotSetUdpReport = true;
			this.setUploadStatCount();
			this.launchUdpReport();
		}
		return;
	};	
	this.setUploadStatCount = function()
	{
		//return this.mPlayerName.SetParameter("UploadStatCount",10);
	};
	this.launchUdpReport = function()
	{
		//try
		//{
			//var ttii =(parseInt(Math.random()*1000))%REP_PLAYSONG_IP_ARRAY.length;
			//this.mPlayerName.SetParameter("RepPlaySong_IP",REP_PLAYSONG_IP_ARRAY[ttii]);
			//this.mPlayerName.SetParameter("RepPlaySong_Port",REP_PLAYSONG_PORT);
			//this.mPlayerName.SetParameter("RepPlaySong_IP","10.1.42.241");
			//this.mPlayerName.SetParameter("RepPlaySong_Port",17679);
			//var ttii2 =(parseInt(Math.random()*1000))%REP_SONGLIST_IP_ARRAY.length;
			//this.mPlayerName.SetParameter("RepSongList_IP",REP_SONGLIST_IP_ARRAY[ttii2]);
			//this.mPlayerName.SetParameter("RepSongList_Port",REP_SONGLIST_PORT);
			//this.mPlayerName.SetParameter("RepSongList_Program",REP_SONGLIST_PROGRAM);
		//}
		//catch(e)
		//{
			
		//}
	};	
	this.checkPlayer = function()
	{
		var sWMPVersion = this.mPlayerName.GetVersion(1);
		if(sWMPVersion=="")
		{
			return false;
		}
		if(compareString(sWMPVersion,CURRENT_WMP_VERSION)<0)
		{
			return false;
		}
		//老的VQQPLAYER的版本号，新版本已经没有VQQPLAYER.dll
		//var sPlayerVersion = this.mPlayerName.GetVersion(2);
		try
		{
			this.plv=this.mPlayerName.GetPlayerSvrVersion();
			if(debugMode)
			{
				//this.mPlayerName.SetParameter("AutoUpdate", 305);
			}
		}
		catch (e)
		{
			this.plv="0";
		}
		/*
		if((sPlayerVersion=="")||(sPlayerVersion.length>20)||(compareString(sPlayerVersion,CURRENT_PLAYER_VERSION)<0))
		{
			return false;
		}
		*/
		//禁止VQQPlayer使用旋风下载来下载盗链歌曲
		/*
		try
		{
			
			//if(compareString(this.plv,"2.5.0.0") >= 0)
			if(compareString(this.plv,"3.3.1216.196") >= 0 )
			{
				//this.mPlayerName.SetParameter("UsedWhirl", 1);
				this.mPlayerName.SetParameter("UsedWhirl", 0);
			}
			else
			{
				this.mPlayerName.SetParameter("UsedWhirl", 1);
			}
			
			
		}
		catch (e)
		{
			//alert("禁止VQQPlayer使用旋风下载失败");
		}
		*/
		return true;
	};
	//get the player source of this window
	this.getPlayerSource = function()
	{
		return this.mPlayerSource;
	};	
	this.getCurrentPlayerSource = function()
	{
		//return this.mPlayerName.PlaySrc;
		return this.mCurPlaySrc;
	};	
	this.createActiveX = function(bv,bi,bp2p,name,w,h,uincn,keycn,dl)
	{ 
		//alert("createActiveX 0");
		try
		{
			this.mPlayerName = createPlayer();	
			if(!this.mPlayerName)
			{
				return false;
			}
			if(top.g_iUin)
			{
				this.mPlayerSource = "qzone_player_"+top.g_iUin+"_"+new Date().getTime();
			}
			else
			{
				this.mPlayerSource = "qzone_player_20061016"+"_"+new Date().getTime();
			}
			this.mPlayerName.PlaySrc = this.mPlayerSource;
			this.mCurPlaySrc = this.mPlayerSource;
		}
		catch(e)
		{
			if(debugMode)
			{
				status =("e 7 "+e.message);
			}
			//updateDownloadPlayer();
			QZONE.music.isNeedUpdatePlayer=true;
			//alert("e 7 "+e.message);
		}
		//alert("createActiveX 1");
		return true;
	};
	this.initialize = function()
	{
		//alert("initialize 0");
		try
		{
			if(!this.mPlayerName)
			{
				return false;
			}
			//if(Browser && Browser.isFirefox && !(this.mPlayerName.GetVersion(4) >= "7.69"))
			if(Browser && Browser.isFirefox && !(this.mPlayerName.GetVersion(4) >= "3.4"))
			{
				QZONE.music.isNeedUpdatePlayer=true;
				//updateDownloadPlayer();
				return false;
			}
			if(!this.checkPlayer())
			{
				return false;
			}	
			this.mP2P = true;
			this.mSyncStatus = true;
			this.mInstall = true;
			this.mExistTime = 5;
			if(!this.mPlayerName)
			{
				return false;
			}
			/*
			// 播放器初始化结果回调，调用Initialize方法即会收到该回调
			//	[id(1), helpstring("method OnInitialized")] HRESULT OnInitialized(BOOL bSucceed);
			this.mPlayerName.attachEvent("OnInitialized", OnInitialized);
			// 播放器反初始化结果回调，调用Uninitialize方法即会收到该回调
			//	[id(2), helpstring("method OnUninitialized")] HRESULT OnUninitialized();
			this.mPlayerName.attachEvent("OnUninitialized", OnUnitialized);
			// 播放状态改变回调，只有当前正在播放的播放源会收到该回调，QzoneMusic Crash会返回状态0。
			//	[id(3), helpstring("method OnStateChanged")] HRESULT OnStateChanged (long lNewState);
			this.mPlayerName.attachEvent("OnStateChanged", OnStateChanged);
			// 播放进度回调，只有当前正在播放的播放源会收到该回调
			//	[id(4), helpstring("method OnPlayProgress")] HRESULT OnPlayProgress(long nCurPos, long nTotal);
			this.mPlayerName.attachEvent("OnPlayProgress", OnPlayProgress);
			// 播放错误回调，只有当前正在播放的播放源会收到该回调
			//	[id(5), helpstring("method OnPlayError")] HRESULT OnPlayError(long nErrorCode, BSTR bstrErrorDesc);
			this.mPlayerName.attachEvent("OnPlayError", OnPlayError);
			// 歌曲下载进度回调，只有当前正在播放的播放源会收到该回调，nProgress为下载百分比（0到100）
			//	[id(6), helpstring("method OnDnldProgress")] HRESULT OnDnldProgress(long nErrorCode, long nProgress);
			//this.mPlayerName.attachEvent("OnDnldProgress", OnDownloadProgress);
			// 播放器静音和音量属性改变回调，所有播放源都可以收到。
			//	[id(7), helpstring("method OnPlayerPropChanged")] HRESULT OnPlayerPropChanged(BOOL bMute, long nVolume);
			//this.mPlayerName.attachEvent("OnPlayerPropChanged", OnPlayerPropChanged);
			// 播放源改变回调，只有新旧两个播放源可以收到。
			//	[id(8), helpstring("method OnPlaySrcChanged")] HRESULT OnPlaySrcChanged(BSTR bstrNewPlaySrc, BSTR bstrOldPlaySrc);
			this.mPlayerName.attachEvent("OnPlaySrcChanged", OnPlaySrcChanged);
			//this.mPlayerName.SetParameter("CacheSize",P2P_CACHE_SPACE);
			*/

			EventPlayer(this.mPlayerName,"OnInitialized", OnInitialized);
			EventPlayer(this.mPlayerName,"OnUninitialized", OnUnitialized);
			EventPlayer(this.mPlayerName,"OnStateChanged", OnStateChanged);
			EventPlayer(this.mPlayerName,"OnPlayProgress", OnPlayProgress);
			EventPlayer(this.mPlayerName,"OnPlayError", OnPlayError);
			//EventPlayer(this.mPlayerName,"OnDnldProgress", OnDownloadProgress);
			//EventPlayer(this.mPlayerName,"OnPlayerPropChanged", OnPlayerPropChanged);
			EventPlayer(this.mPlayerName,"OnPlaySrcChanged", OnPlaySrcChanged);

			this.mPlayerName.Initialize();
			//this.mPlayerName.Volume=80;
			this.mPlayerName.Volume=getSOVolume();
		}
		catch(e)
		{
			if(debugMode)
			{
				//alert("e 8 "+e.message);
				status =("e 8 "+e.message);
			}
			QZONE.music.isNeedUpdatePlayer=true;
			//updateDownloadPlayer();
			return false;
		}	
		this.mIsInit = true;
		//alert("initialize 1");
		return true;
	};
	this.unInitialize = function()
	{
		//alert("Uninitialize");
		//释放播放器所占用资源
		try
		{
			/*
			this.mPlayerName.detachEvent("OnInitialized", OnInitialized);
			this.mPlayerName.detachEvent("OnUninitialized", OnUnitialized);
			this.mPlayerName.detachEvent("OnStateChanged", OnStateChanged);
			this.mPlayerName.detachEvent("OnPlayProgress", OnPlayProgress);
			this.mPlayerName.detachEvent("OnPlayError", OnPlayError);
			//this.mPlayerName.detachEvent("OnDnldProgress", OnDownloadProgress);
			//this.mPlayerName.detachEvent("OnPlayerPropChanged", OnPlayerPropChanged);
			this.mPlayerName.detachEvent("OnPlaySrcChanged", OnPlaySrcChanged);
			*/
			EventPlayerRemove(this.mPlayerName,"OnInitialized", OnInitialized);
			EventPlayerRemove(this.mPlayerName,"OnUninitialized", OnUnitialized);
			EventPlayerRemove(this.mPlayerName,"OnStateChanged", OnStateChanged);
			EventPlayerRemove(this.mPlayerName,"OnPlayProgress", OnPlayProgress);
			EventPlayerRemove(this.mPlayerName,"OnPlayError", OnPlayError);
			//EventPlayer(this.mPlayerName,"OnDnldProgress", OnDownloadProgress);
			//EventPlayer(this.mPlayerName,"OnPlayerPropChanged", OnPlayerPropChanged);
			EventPlayerRemove(this.mPlayerName,"OnPlaySrcChanged", OnPlaySrcChanged);
			if((this.mPlayerName).Uninitialize())	
			{
				this.mIsInit = false;
				return true;
			}
		}
		catch(e)
		{	
			if(debugMode)
			{
				status =("e 9 "+e.message);
			}
			//alert("e 9 "+e.message);
			return false;	
		}
	};	
	this.isInitialize = function()
	{
		//播放器是否被初始化
		return this.mIsInit;
	};	
	//新控件不支持获取状态，已要求mint加上，但是不会像之前一样定时频繁调用
	this.getStatus = function()
	{
		//获取当前播放状态
		if(!this.mIsInit)
		{
			return -1;
		}
		var _s = -1;
		//_s = this.mPlayerName.CurState;
		_s = this.mPlayerState;
		return _s;
	};		
	this.setPlayURL = function(id,ul,stpt,iDuration,sSong,sSinger,sQzKey,iSongId,iSongType)
	{
		//alert("type of id: "+(typeof id));
		id=parseInt(id);
		//set fromtag=6
		//this.setUserIdent(0,"",6);
		var uin=getCookie(PANEL_UIN_COOKIE_NAME);
		var key=getCookie(PANEL_KEY_COOKIE_NAME);
		if(uin==""){uin=getCookie("uin").replace(/[^\d]/g,"");};
		if(key==""){key=getCookie("skey");};
		this.setUserIdent(uin!="" ? uin : '12345678',key!="" ? key : '12345678',6);
		//this.setUserIdent(uin,key,6);
		//alert("setPlayURL 1 ");
		//设置播放URL
		if(!this.mIsInit)
		{
			//alert("setPlayURL 2 ");
			return;
		}
		//alert("setPlayURL 3 ");
		if(((ul==null)||(ul==""))&&(id<0))
		{
			//alert("setPlayURL 4 ");
			return;
		}
		var tpp = 0;
		if(this.mP2P)
		{
			tpp = 1;
		}
		iSongId = iSongId || 0;
		iSongType = iSongType || 0;
		if(id<=0)
		{
			//alert("setPlayURL 5 ");
			this.setPlayParams(id,ul);
			this.mPlayingPos = this.mPlayList.getPos(ul);
			//alert("SetPlayURL 6 mplayingPos:"+this.mPlayingPos);
			this.mPlayerName.SetPlayURL(id,ul,stpt);
			this.mPlayList.addObject(id,ul,stpt,0,sSong,sSinger,"",iSongId,iSongType);	
			//alert("setPlayURL 6 ");
		}
		else
		{
			//alert("setPlayURL 7");
			this.setPlayParams(id,ul);
			//alert("setPlayURL 8");
			this.mPlayingPos = this.mPlayList.getPosById(id);
			//alert("setPlayURL 8,id:"+id+";ul:"+ul+";stpt:"+stpt+";mplayingPos:"+this.mPlayingPos);
			//this.mPlayerName.SetPlayURL(id,ul,stpt,tpp);
			//alert("SetPlayURL 9");
			//this.mPlayerName.SetPlayURL(id,ul,stpt);
			this.mPlayerName.SetPlayURL(id,ul,stpt);
			//this.mPlayerName.SetPlayURL(394184, "http://stream7.qqmusic.qq.com/12394184.wma", "http://tpt.music.qq.com:8000/12394184.tpt")
			
			//alert("setPlayURL 10");
			this.mPlayList.addObject(id,ul,stpt,0,sSong,sSinger,"",iSongId,iSongType);	
			//alert("setPlayURL 11");
			try
			{
				//上报独立用户数
				m_rpt_box(1,ul,this.plv);
			}
			catch(e)
			{
			}
		}
		//alert("SetPlayURL,ul:"+ul);
		try
		{
			//alert("setPlayURL 5");
			playerv2_setinfo("pos",""+this.mPlayingPos);
			//alert("setPlayURL 6");
		}
		catch(e)
		{
		}
		//alert("setPlayURL 7");
		return;				
	};	
	//新版播放控件不支持
	this.setPlayList = function()
	{
	};	
	//新版播放控件不支持
	this.resetCache = function()
	{
		//清空p2p cache数据
	};	
	this.isPlaying = function()
	{
		//判断播放是否正在进行
		if(!this.mIsInit)
		{
			return false;
		}
		//var _s = this.getStatus();
		var _s = this.mPlayerState;
		return((_s==S_PLAYING)||(_s==S_BUFFERING) ||(_s==S_PLAYBEGIN));
	};
	this.isPause = function()
	{
		//判断播放是否被暂停
		if(!this.mIsInit)
		{
			return false;
		}
		//var _s = this.getStatus();
		var _s = this.mPlayerState;
		return(_s==S_PAUSE);
	};
	//防止qq控件缓冲时间过程,调用isStop函数始终返回9
	this.lastBufTime = 0;
	//新控件不支持，修改实现方式
	this.isStop = function()
	{
		//判断播放是否被中断
		if(!this.mIsInit)
		{
			return false;
		}
		//var _s = this.getStatus();
		var _s = this.mPlayerState;
		//只在缓冲时间段在20-60秒时候,返回true
		//if(_s==S_TRANSITION)
		if(_s==S_BUFFERING)
		{
			var cur = new Date().getTime();
			if(cur-this.lastBufTime>1000*60)
			{
				this.lastBufTime = new Date().getTime();
			}
			if(cur-this.lastBufTime>1000*20)
			{
				this.lastBufTime = new Date().getTime();
				return true;
			}
		}
		else
		{
			this.lastBufTime = 0;
		}
		//return((_s==S_STOP)||(_s==S_MEDIAEND)||(_s==S_READY));
		return((_s==S_STOP)||(_s==S_PLAYEND));
	};	
	this.getCurrentMusic = function()
	{
		if(this.mPlayingPos<0)
		{
			return null;
		}
		return this.mPlayList.getObject(this.mPlayingPos);
	};	

	this.runPlayerPos = function(pos)
	{
		//alert("runPlayerPos 0:"+pos);
		if(this.isPause() && this.mPlayingPos == pos)
		{
			//alert("runPlayerPos 1:"+this.mCurPlayPos);
			//this.mCurPausePos = this.mCurPlayPos;
			//this.startFromPausePos = true;
			this.startPlayer();
			//this.mPlayerName.CurPos = this.mCurPlayPos;
			//alert("runPlayerPos 2:"+this.mCurPlayPos);
		}
		else if (pos>=0 && pos<this.mPlayList.getCount())
		{
			//alert("runPlayerPos 3");
			var obj = this.mPlayList.getObject(pos);
			this.setPlayURL(obj.mId, obj.mPlayURL, obj.mTorrentURL, obj.mDuration, obj.mSongName, obj.mSingerName, obj.mQzoneKey, obj.mSongId, obj.mSongType);
			/*
			if(QZONE.toolbar && typeof(QZONE.toolbar.musicNotice)=="function")
			{
				QZONE.toolbar.musicNotice("play");
			}
			*/
			noticeToolbar("play");
			//alert("runPlayerPos 4");
		}
	};
	this.SetPrepareSong = function()
	{
		if(g_isIE)
		{
			var strPatch = /qqmusic.qq.com/i;
			var tpos = this.mPlayingPos+1;
			if(tpos>0&&tpos<this.mPlayList.getCount())
			{
				if(this.mPlayList.getObject(tpos).mPlayURL.search(strPatch))
				{
					this.mPlayerName.SetPrepareSong(this.mPlayList.getObject(tpos).mPlayURL,this.mPlayList.getObject(tpos).mTorrentURL);
				}
			}
		}
	};
	this.runPlayer = function(ul)
	{
		//alert("runPlayer 1");
		//开始播放
		if(!this.mIsInit)
		{
			return;
		}
		//alert("runPlayer 2");
		if(this.isPause())
		{
			this.startPlayer();
			//this.mPlayerName.CurPos = this.mCurPlayPos;
			//alert("runPlayer 3");
		}
		else if(this.mPlayingPos<0 && this.mPlayList.getCount()>0)
		{
			this.mPlayingPos = 0;
			var obj = this.mPlayList.getObject(0);
			//alert("runPlayer");
			this.setPlayURL(obj.mId,obj.mPlayURL,obj.mTorrentURL,obj.mDuration,obj.mSongName,obj.mSingerName,obj.mQzoneKey,obj.mSongId,obj.mSongType);
			/*
			if(QZONE.toolbar && typeof(QZONE.toolbar.musicNotice)=="function")
			{
				QZONE.toolbar.musicNotice("play");
			}
			*/
			noticeToolbar("play");
			//alert("runPlayer 4");
		}
		else
		{	
			this.startPlayer();
		}
		//alert("runPlayer 5");
		
		setTimeout(function(){VQQPlayer.SetPrepareSong();},30000);
			
		//alert("runPlayer 6");
		return;
	};
	this.startPlayer = function()
	{
		//alert("startPlayer 1");
		//开始播放
		if(!this.mIsInit)
		{
			return false;
		}
		try
		{
			(this.mPlayerName).Play();		
			/*
			if(QZONE.toolbar && typeof(QZONE.toolbar.musicNotice)=="function")
			{
				QZONE.toolbar.musicNotice("play");
			}
			*/
			noticeToolbar("play");
			return true;
		}
		catch(e)
		{
			if(debugMode)
			{
				status =("e 11 "+e.message);
			}
		}	
		//alert("startPlayer 2");
		return false;
	};
	this.stopPlayer = function()
	{
		//停止播放
		if(!this.mIsInit)
		{
			return false;
		}
		if((!this.isPlaying())&&(!this.isPause()))
		{
			return false;
		}
		try
		{
			(this.mPlayerName).Stop();
			/*
			if(QZONE.toolbar && typeof(QZONE.toolbar.musicNotice)=="function")
			{
				QZONE.toolbar.musicNotice("stop");
			}
			*/
			noticeToolbar("stop");
			return true;
		}
		catch(e)
		{
			if(debugMode)
			{
				status =("e 12 "+e.message);
			}
		}
		return false;
	};
	this.pausePlayer = function()
	{
		//暂停播放
		if(!this.mIsInit)
		{
			return false;
		}
		
		if(!this.isPlaying())
		{
			return false;
		}
		
		try
		{
			(this.mPlayerName).Pause();	
			/*
			if(QZONE.toolbar && typeof(QZONE.toolbar.musicNotice)=="function")
			{
				QZONE.toolbar.musicNotice("pause");
			}
			*/
			noticeToolbar("pause");
		}
		catch(e)
		{
			if(debugMode)
			{
				status =("e 13 "+e.message);
			}
		}
	};
	this.setMute = function()
	{
		//false:未设置静音   true:设置静音
		if(!this.mIsInit)
		{
			return false;
		}
		var bSet = ((this.mPlayerName).Mute == 1 ? 0:1);
		(this.mPlayerName).Mute = bSet;
		return bSet;
	};
	this.getVolumn = function()
	{
		if(!this.mIsInit)
		{
			return 0;
		}
		return (this.mPlayerName).Volume;
	};
	this.setVolumn = function(vol)
	{
		if(!this.mIsInit)
		{
			return false;
		}
		if((this.mPlayerName).Mute==1)
		{
			return false;
		}
		if(vol>100)
		{
			vol=100;
		}
		if(vol<0)
		{
			vol=0;
		}
		if(vol>=0 && vol<=100)
		{
			(this.mPlayerName).Volume=vol;
		}
		/*
		//var vol =(this.mPlayerName).Volume;
		switch(type)
		{
			case "up":
				vol+=10;
				if(vol>100)
				{
					vol = 100;
				}
				(this.mPlayerName).Volume=vol;
				break;
			case "down":
				vol-=10;
				if(vol<0)
				{
					vol = 0;
				}
				(this.mPlayerName).Volume=vol;	
				break;
			default:
				break;		
		}
		*/
		return true;
	};
	this.quickPlayer = function(pos)
	{
		//快进：pos>0  回退:pos<0
		if(!this.mIsInit)
		{
			return false;
		}
		if(!this.isPlaying())
		{
			return false;
		}
		var curr =(this.mPlayerName).CurPos;
		curr = curr+pos;
		if(curr<=0)
		{
			return false;
		}
		
		(this.mPlayerName).CurPos=curr;
		return true;
	};
	this.lastPlayer = function()
	{
		//上一首歌
		if(this.mPlayList.getCount()==0)
		{
			return -1;
		}
		this.mPlayingPos = this.mPlayingPos - 1;
		if((this.mPlayingPos<0)||(this.mPlayingPos>=this.mPlayList.getCount()))
		{
			this.mPlayingPos = 0;
		}
		var obj = this.mPlayList.getObject(this.mPlayingPos);
		this.setPlayURL(obj.mId,obj.mPlayURL,obj.mTorrentURL,obj.mDuration,obj.mSongName,obj.mSingerName,obj.mQzoneKey,obj.mSongId,obj.mSongType);
		/*
		if(QZONE.toolbar && typeof(QZONE.toolbar.musicNotice)=="function")
		{
			QZONE.toolbar.musicNotice("change",this.mPlayingPos);
			QZONE.toolbar.musicNotice("play");
		}
		*/
		noticeToolbar("change",this.mPlayingPos);
		noticeToolbar("play");
		return this.mPlayingPos;
	};
	this.nextPlayer = function()
	{
		//alert("nextPlayer 1");
		//下一首歌
		if(this.mPlayList.getCount()==0)
		{
			//alert("nextPlayer 2");
			return -1;
		}
		//alert("nextPlayer 3,mPlayingPos:"+this.mPlayingPos);
		this.mPlayingPos = this.mPlayingPos+1;
		if((this.mPlayingPos>=this.mPlayList.getCount())||(this.mPlayingPos<0))
		{
			this.mPlayingPos = 0;
		}
		
		var obj = this.mPlayList.getObject(this.mPlayingPos);
		//alert("nextPlayer 4,mPlayingPos:"+this.mPlayingPos+";id:"+obj.mId);
		this.setPlayURL(obj.mId,obj.mPlayURL,obj.mTorrentURL,obj.mDuration,obj.mSongName,obj.mSingerName,obj.mQzoneKey,obj.mSongId,obj.mSongType);
		/*
		if(QZONE.toolbar && typeof(QZONE.toolbar.musicNotice)=="function")
		{
			QZONE.toolbar.musicNotice("change",this.mPlayingPos);
			QZONE.toolbar.musicNotice("play");
		}
		*/
		//alert("nextPlayer 5,mPlayingPos:"+this.mPlayingPos);
		noticeToolbar("change",this.mPlayingPos);
		noticeToolbar("play");
		//alert("nextPlayer 5");
		setTimeout(function(){VQQPlayer.SetPrepareSong();},30000);
		//alert("nextPlayer 7");
		return this.mPlayingPos;	
	};
	this.setUserIdent = function(iUin,sKey,iFromTag)
	{
		this.mUinCookie = iUin;
		this.mKeyCookie = sKey;
		this.mFromTag = iFromTag+"";
	};
	this.autoRandomPlay = function(name,ba,br)
	{
		//alert("autoRandomPlay 1");
		if(this.mPlayList.getCount()==0)
		{
			//alert("autoRandomPlay 2");
		}
		else if(ba)
		{
			//alert("autoRandomPlay 3");
			if(br && QZONE.music.isBgMusic)
			{
				//随机播放
				try
				{
					//alert("autoRandomPlay 4");
					//if(this.isStop() || this.mPlayingPos<0)
					if(this.mPlayerState==S_PLAYEND || this.mPlayingPos<0)
					{
						//alert("autoRandomPlay 5");
						var mCurrentPos = this.mPlayingPos;
						do 
						{
							this.mPlayingPos = Math.floor(Math.random()*this.mPlayList.getCount());
						}
						while(mCurrentPos == this.mPlayingPos&&this.mPlayList.getCount()>1);
						var obj = this.mPlayList.getObject(this.mPlayingPos);
						this.setPlayURL(obj.mId,obj.mPlayURL,obj.mTorrentURL,obj.mDuration,obj.mSongName,obj.mSingerName,obj.mQzoneKey,obj.mSongId,obj.mSongType);
						/*
						if(QZONE.toolbar && typeof(QZONE.toolbar.musicNotice)=="function")
						{
							QZONE.toolbar.musicNotice("change",this.mPlayingPos);
							QZONE.toolbar.musicNotice("play");
						}
						*/
						noticeToolbar("change",this.mPlayingPos);
						noticeToolbar("play");
						//alert("autoRandomPlay 6");
					}
					//alert("autoRandomPlay 7");
				}
				catch(e)
				{
					//alert("autoRandomPlay 8");
					if(debugMode)
					{
						status =("e 14 "+e.message);
					}
				}
			}
			else
			{	
				//alert("autoRandomPlay 9");
				//顺序播放
				try
				{
					//if(this.isStop())
					if(this.mPlayerState==S_PLAYEND || this.mPlayingPos<0)
					{
						//alert("autoRandomPlay 10");
						this.nextPlayer();
					}
					/*
					if(this.mPlayingPos<0)
					{	
						this.runPlayer();
					}
					*/
					
				}
				catch(e)
				{
					//alert("autoRandomPlay 11");
					if(debugMode)
					{
						status =("e 15 "+e.message);
					}
				}	
				//alert("autoRandomPlay 12");
			}
		}
		return;
	};	
	this.printPlayList = function()
	{
		//打印播放列表
		var list = "";
		for(var i=this.mPlayList.getCount(); i>0; i--)
		{
			list = list+"第["+i+"]"+"播放记录:"+this.mPlayList.getObject(i-1).mPlayURL+"\n";
		}	
		return list;
	};
}
/*
function window.onunload()
{
	if(VQQPlayer)
	{
		VQQPlayer.unInitialize();
	}
}
*/
EventUtil(window,"unload",function(){if(VQQPlayer){VQQPlayer.unInitialize();}});
//初始化完毕时回调
function OnInitialized(bSucc)
{
	if(bSucc)
	{
		if(!!VQQPlayer)
		{
			VQQPlayer.mPlayerName.Volume=getSOVolume();
		}
		if(debugMode)
		{
			status+="QzonePlayer initialize succ";
			//setTimeout("status='';",5000);
		}
	}
}
//反初始化完毕时回调
function OnUnitialized()
{
}
//播放状态改变时回调，只有当前正在播放的播放源会收到该回调，QzoneMusic Crash会返回状态0。
//QPS_Undefined       = 0,     Undefined (Initial or crashed)
//QPS_Stopped         = 1,     Player has been stopped
//QPS_Paused          = 2,     Player has been paused
//QPS_Playing         = 3,     Player is playing media
//QPS_Buffering       = 4,     Player is in data buffering
//QPS_BeginPlay       = 5,     Player begin to play
//QPS_PlayEnd         = 6,     Player meet the end of media
//var S_UNDEFINE= 0;
//var S_STOP = 1;
//var S_PAUSE = 2;
//var S_PLAYING = 3;
//var S_BUFFERING = 4;
//var S_PLAYBEGIN = 5;
//var S_PLAYEND = 6;
function OnStateChanged(lNewState)
{
	if(debugMode)
	{
		status='OnStateChanged:'+lNewState;
	}
	
	if(!!VQQPlayer)
	{
		switch(lNewState)
		{
			case 0:VQQPlayer.mPlayerState=S_UNDEFINE;break;
			case 1:
				VQQPlayer.mPlayerState=S_STOP;
				try {
					if(!QZONE.music.isBgMusic)
					{
						setCurPagePlayState(false);
						setCurPageProgress(0,0,0);
						setMyLovePlayState(false);
						setMyloveProgress(0,0,0);
					}
				} catch (e) {
				}
				break;
			case 2:
				VQQPlayer.mPlayerState=S_PAUSE;
				try {
					if(!QZONE.music.isBgMusic)
					{
						setCurPagePlayState(false);
						setMyLovePlayState(false);
					}
				} catch (e) {
				}
				break;
			case 3:
			{
				//alert('OnStateChanged:'+lNewState);
				VQQPlayer.mPlayerState=S_PLAYING;
				/*
				if(VQQPlayer.startFromPausePos)
				{
					VQQPlayer.mPlayerName.CurPos = VQQPlayer.mCurPausePos;
					VQQPlayer.startFromPausePos = false;
				}
				*/
				if(QZONE.toolbar && typeof(QZONE.toolbar.playMusic)=="function")
				{
					try
					{
						//oControl.className="pause";
						//oControl.innerHTML="暂停歌曲";
						QZONE.toolbar.playMusic(true);
					}
					catch (e)
					{
					}
				}
				
				try {
					
					if(!QZONE.music.isBgMusic)
					{
						//$("pgp_btn_pp").className = "pgp_btn_pp pgp_btn_pause";
						//$("pgp_btn_pp").title = "暂停";
						setCurPagePlayState(true);
						setMyLovePlayState(true);
					}
				} catch (e) {
				}
				
				break;
			}
			case 4:VQQPlayer.mPlayerState=S_BUFFERING;break;
			case 5:
				VQQPlayer.mPlayerState=S_PLAYBEGIN;
				try {
					autoChangeMultiPlay();
					if(!QZONE.music.isBgMusic)
					{
						setCurPagePlayState(true);
						setMyLovePlayState(true);
					}
				} catch (e) {
				}
				break;
			case 6:
				try {
					if(!QZONE.music.isBgMusic)
					{
						//$("pgp_btn_pp").className = "pgp_btn_pp pgp_btn_play";
						//$("pgp_btn_pp").title = "播放";
						//$("pgp_time_prog").style.width = 0 + "%";
						setCurPagePlayState(false);
						setCurPageProgress(0,0,0);
						setMyLovePlayState(false);
						setMyloveProgress(0,0,0);
				
					}
				} catch (e) {
				}
				VQQPlayer.mPlayerState=S_PLAYEND;VQQPlayer.autoRandomPlay(VQQPlayer,true,VQQPlayer.mRandomPlay);
				//autoChangeMultiPlay();
				break;
			default:break;
		}
		if(debugMode)
		{
			status='playState:'+lNewState;
		}
		
	}
}

//播放进度改变时回调，只有当前正在播放的播放源会收到该回调
function OnPlayProgress(lCurPos, lTotal)
{
	if(debugMode)
	{
		status="PlayProgress,curPos:"+lCurPos+",total:"+lTotal;
	}
	
	if(!!VQQPlayer)
	{
		VQQPlayer.mCurPlayPos = lCurPos;
		VQQPlayer.mCurPlayTotal = lTotal;
	}
	try {
		var pPos = (lCurPos / lTotal).toFixed(2) * 100;
		if(!QZONE.music.isBgMusic)
		{
			setCurPageProgress(pPos,lCurPos, lTotal);
			setMyloveProgress(pPos,lCurPos, lTotal);
		}
	} catch (e) {}
}

//播放错误回调，只有当前正在播放的播放源会收到该回调
function OnPlayError(lErrCode,sErrDesc)
{
	//alert("playError,ErrCode:"+lErrCode+",ErrDesc:"+sErrDesc);
	if(debugMode)
	{
		status="playError,ErrCode:"+lErrCode+",ErrDesc:"+sErrDesc;
	}
}
//歌曲下载进度回调，只有当前正在播放的播放源会收到该回调，nProgress为下载百分比（0到100）
function OnDownloadProgress(lErrCode,lProgress)
{
}
//播放器静音和音量属性改变回调，所有播放源都可以收到。
function OnPlayerPropChanged(bMute,lVolume)
{
}
//播放源改变回调，只有新旧两个播放源可以收到。
function OnPlaySrcChanged(sNewPlaySrc,sOldPlaySrc)
{
	//alert("PlaySrcChanged,NewPlaySrc:"+sNewPlaySrc+",OldPlaySrc:"+sOldPlaySrc);
	if(debugMode)
	{
		status="PlaySrcChanged,NewPlaySrc:"+sNewPlaySrc+",OldPlaySrc:"+sOldPlaySrc;
	}
	if(!!VQQPlayer)
	{
		VQQPlayer.mCurPlaySrc=sNewPlaySrc;
		/*
		if(QZONE.toolbar && typeof(QZONE.toolbar.pauseMusic)=="function" && (VQQPlayer.mCurPlaySrc != VQQPlayer.getPlayerSource()))
		{
			try
			{
				//oControl.className="play";
				//oControl.innerHTML="播放歌曲";
				QZONE.toolbar.pauseMusic(true);
			}
			catch (e)
			{

			}
		}
		*/
		if(VQQPlayer.mCurPlaySrc != VQQPlayer.getPlayerSource())
		{
			try
			{
				//QZONE.toolbar.musicNotice("pause");
				noticeToolbar("pause");
				VQQPlayer.mPlayerState=S_PAUSE;
			}
			catch (e)
			{

			}
		}
		
	}
}
var bRandomPlay = false;
function runPlayer(pos)
{
	//alert("runPlayers 1");
	if(pos==null)
	{
		pos = -1;
	}
	//alert("runPlayers 2:"+top.VQQPlayer);
	// call from frame
	if((!top.VQQPlayer)&&(!top.MediaPlayer))
	{
		return;
	}
	//alert("runPlayers 3");
	try
	{
		if(top.g_iLoginUin == top.g_iUin && top.g_iUin > 10000)
		{
			top.QZONE.FrontPage.getSecondaryBitMapFlag(function(wholeBitmap,needBitmap){bRandomPlay=(needBitmap>0 ? true : false);if(top.bUseVQQPlayer){VQQPlayer.mRandomPlay = bRandomPlay;}},22,1,top.g_iUin);
		}
		else
		{
			bRandomPlay = false;
		}
	}
	catch(e)
	{
		bRandomPlay = false;
	}
	//alert("runPlayers 4:"+top.bUseVQQPlayer);
	if(top.bUseVQQPlayer)
	{
		//VQQPlayer.mRandomPlay = bRandomPlay;
		if(pos==-1)
		{
			//alert("runPlayers 5");
			var cPos=top.VQQPlayer.mPlayingPos;
			if(cPos > -1)
			{
				//alert("runPlayers 6");
				top.VQQPlayer.runPlayerPos(cPos);
			}
			else
			{
				//top.VQQPlayer.runPlayer('');
				//setAutoPlay(true,bRandomPlay);
				//alert("runPlayers 7");
				try{
					if(top.g_iLoginUin == top.g_iUin && top.g_iUin > 10000)
					{
					top.QZONE.FrontPage.getSecondaryBitMapFlag(function(wholeBitmap,needBitmap){bRandomPlay=(needBitmap>0 ? true : false);setAutoPlay(true,bRandomPlay);},22,1,top.g_iUin);
					}
					else
					{
						bRandomPlay = false;
						setAutoPlay(true,bRandomPlay);
					}
				}
				catch(e)
				{
					setAutoPlay(true,bRandomPlay);
				}
				//alert("runPlayers 8");
			}
		}
		else
		{
			//alert("runPlayers 9");
			top.VQQPlayer.runPlayerPos(pos);
		}
		//alert("runPlayers 10");
	}
	else
	{
		if(pos==-1)
		{
			//top.MediaPlayer.runPlayer('');
			//setAutoPlay(true,bRandomPlay);
			try{
				if(top.g_iLoginUin == top.g_iUin && top.g_iUin > 10000)
				{
				top.QZONE.FrontPage.getSecondaryBitMapFlag(function(wholeBitmap,needBitmap){bRandomPlay=(needBitmap>0 ? true : false);setAutoPlay(true,bRandomPlay);},22,1,top.g_iUin);
				}
			}
			catch(e)
			{
				bRandomPlay = false;
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
	//alert("setAutoPlay 1");
	if(top.qqplayer_play_flag==null)
	{
		top.qqplayer_play_flag = true;
	}
	//alert("setAutoPlay 2 :"+top.qqplayer_play_flag);
	if(top.qqplayer_play_flag)
	{
		//alert("setAutoPlay 3");
		if(top.bUseVQQPlayer && top.VQQPlayer)
		{
			//alert("setAutoPlay 4");
			if(top.VQQPlayer.getPlayerSource()==top.VQQPlayer.getCurrentPlayerSource() || top.VQQPlayer.mPlayingPos < 0)
			{
				//if(!top.VQQPlayer.isPause())
				//{
					//alert("setAutoPlay 5");
					top.VQQPlayer.autoRandomPlay(top.VQQPlayer,ba,bRandomPlay);
				//}
			}
			//alert("setAutoPlay 6");
		}
		else if(top.MediaPlayer)
		{
			//if(!top.MediaPlayer.isPause())
			//{
				top.MediaPlayer.autoRandomPlay(top.MediaPlayer,ba,bRandomPlay);
			//}
		}
	}
//alert("setAutoPlay 7");
	/*
	if(window.idAutoPlay)
	{
		clearTimeout(window.idAutoPlay);
	}
	window.idAutoPlay = setTimeout("setAutoPlay("+ba+","+bRandomPlay+")",5000);
	*/
}	
