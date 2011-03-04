//debugMode=true;
if (!window.getElementInBody)
	getElementInBody = function(id, tagName) {
		var e = $(id);
		if (!e) {
			tagName = (!tagName) ? "div" : tagName;
			// 如果没有设置tagName 则默认为div
			e = document.createElement(tagName);
			e.id = id;
			document.body.appendChild(e);
		}
		return e;
	}
/**
 * 动态创建html5中的audio标签
 *
 * @param {Object} objAttrs 属性列表对象
 * @return {Object} 创建好的audio对象
 */
function insertH5AudioPlayer(objAttrs) {

	g_wmplayerDiv = getElementInBody("h5audio_media_con", "div");
	var html = [];
	html.push("<audio ")
	for (var key in objAttrs) {
		html.push(key);
		html.push("='");
		html.push(objAttrs[key]);
		html.push("' ");
	}
	html.push("></audio>");
	g_wmplayerDiv.innerHTML = html.join("");

	return g_wmplayerDiv.firstChild;
}
/**
 * 动态创建html5中audio播放对象
 *
 */
function createH5AudioPlayer() {
	return insertH5AudioPlayer({
				id : 'h5audio_media',
				height : 0,
				width : 0,
				//style : 'display:none;',
				//controls : 'false',
				autoplay : 'false'

			});
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
var S_UNDEFINE= 0,S_STOP = 1,S_PAUSE = 2,S_PLAYING = 3,S_BUFFERING = 4,S_PLAYBEGIN = 5,S_PLAYEND = 6;
/**
 * audio播放对象控制类
 */
function H5AudioPlayer() {
	this.mPlayerName = "";
	this.mPlayerSrc = "";
	this.mInit = false;
	this.mMute = false;
	this.mPlayList = new PlayerListManager();
	this.mPlayingPos = -1;
	this.mVisible = true;
	this.mInstall = true;
	this.mDLLink = "";
	this.mUinCookie = 0;
	this.mKeyCookie = "";
	this.mUinCookieName = "";
	this.mKeyCookieName = "";
	this.mFromTag = 6;
	this.mRandomPlay = false;
	this.mPlayerState = 0;
	this._clientPlatform = false;
	this.firstPlay = true;
	this.mSetedCookie = false;
	//是否需要重新加载歌曲
	this.bereload = true;
	this._checkClientPlatform = function()
	{
		var pl = navigator.platform.toLowerCase();
		var ipad = pl.match(/ipad/);
		if (ipad) {
			this._clientPlatform = "ipad";
			return true;
		}
		var iphone = pl.match(/iphone/);
		if (iphone) {
			this._clientPlatform = "iphone";
			return true;
		}
		var ipod = pl.match(/ipod/);
		if (ipod) {

			this._clientPlatform = "ipod";
			return true;
		}
		var win = pl.match(/win/);
		if(win){
			this._clientPlatform = "win";
			return false;
		}
		else
		{
			this._clientPlatform = "not win";
			return true;
		}
		return false;
	}
	this.setUserIdent = function(iUin, sKey, iFromTag) {
		this.mUinCookie = iUin;
		this.mKeyCookie = sKey;
		//this.mFromTag = iFromTag + "";
	};
	this.setMusicCookie = function(){
		//alert("setMusicCookie 1");
		if(this._checkClientPlatform())
		{
			var uin = getCookie("qqmusic_uin");
			var key = getCookie("qqmusic_key");
			if (uin == "") {
				uin = getCookie("uin").replace(/[^\d]/g, "");
			};
			if (key == "") {
				key = getCookie("skey");
			};
			this.setUserIdent(uin != "" ? uin : '12345678', key != "" ? key	: '12345678', 6);
			setCookie("qqmusic_uin",uin);
			setCookie("qqmusic_key",key)
			setCookie("qqmusic_fromtag",this.mFromTag);
			//alert("setMusicCookie 2");
		
			this.mSetedCookie = true;
		}
		else
		{
			//alert("setMusicCookie 3");
			this.mPlayerName.setAttribute("src","http://qzone-music.qq.com/fcg-bin/fcg_set_musiccookie.fcg?fromtag=6&p="+Math.random()); 
			//alert("setMusicCookie 3");
			this.mPlayerName.load();
			this.mPlayerName.play();
		}
	};
	this.checkPlayer = function(dl) {
		var obj = this.mPlayerName;
		if (!obj) {
			return false;
		}
		return true;
	};
	// function(bVisible,bInstall,objName,objWidth,objHeight,strUinCookieName,strKeyCookieName,strDLLink)
	this.createActiveX = function(bv, bi, name, w, h, uincn, keycn, dl) {
		this.mPlayerName = createH5AudioPlayer();
		//this.mPlayerSrc = this.mPlayerName.getElementsByTagName("source")[0];
		this.mVisible = bv;
		this.mInstall = bi;
		this.mUinCookieName = uincn;
		this.mKeyCookieName = keycn;
		this.mDLLink = dl;
		return "";
	};
	this.initialize = function() {
		//alert("initialize 1");
		if (!this.checkPlayer()) {
			if (this.mInstall) {
				alert(_("对不起，您的浏览器不支持HTML5 音频播放！"));
				window.location = this.mDLLink;
			}
			return false;
		}
		//alert("initialize 2");
		
		this.setMusicCookie();
		//alert("initialize 3");
		try {
			this.setVolumn(getSOVolume());
		} catch (e) {
		};
		//alert("initialize 4");
		this.mInit = true;
		//alert("initialize 5");
		this.bindPlayEvent();//绑定播放器事件
		//alert("initialize 6");
		return true;
	};
	this.isInitialize = function() {
		return this.mInit;
	};
	this.getStatus = function() {
		if (!this.mInit) {
			return -1;
		}
		return this.mPlayerName.getAttribute("state");// audio 标签自定义属性
	};
	this.getCurrentMusic = function() {
		if (this.mPlayingPos < 0) {
			return null;
		}
		return this.mPlayList.getObject(this.mPlayingPos);
	};

	this.runPlayerPos = function(pos) {
		if (pos >= 0 && pos < this.mPlayList.getCount()) {
			var curObj = this.mPlayList.getObject(pos);
			this.runPlayer(curObj.mPlayURL, curObj.mSongName, curObj.mSingerName, curObj.mSongId, curObj.mSongType);
			// this.runPlayer(this.mPlayList.getObject(pos).mPlayURL);
		}
	};
	this.runPlayer = function(ul, name, singerName, iSongId, iSongType) {
		if(this.mSetedCookie)
		{
			//alert("runPlayer 1");
			if(window.idRunPlayer)
			{
				clearTimeout(window.idRunPlayer);
			}
			this.realRunPlayer(ul, name, singerName, iSongId, iSongType);
		}
		else
		{
			//alert("runPlayer 2");
			window.idRunPlayer = setTimeout(function(){VH5Player.runPlayer(ul, name, singerName, iSongId, iSongType)},500);
		}

		return;
	};
	this.realRunPlayer = function(ul, name, singerName, iSongId, iSongType) {
		//alert("runPlayer 1,ul:"+ul);
		if (!this.mInit) {
			return;
		}
		//alert("runPlayer 2");
		/*
		var uin = getCookie(PANEL_UIN_COOKIE_NAME);
		var key = getCookie(PANEL_KEY_COOKIE_NAME);
		if (uin == "") {
			uin = getCookie("uin").replace(/[^\d]/g, "");
		};
		if (key == "") {
			key = getCookie("skey");
		};
		this.setUserIdent(uin != "" ? uin : '12345678', key != "" ? key	: '12345678', 6);
		*/
		
		//this.setMusicCookie();
		var oplay = this.mPlayerName;
		this.bereload = true;
		//var oplaySrc = this.mPlayerSrc;
		if (this.isPause() && oplay.src == ul) {
			//alert("runPlayer 3,oplay.src:"+oplay.src+";ul:"+ul);
			this.bereload = false;
			// this.startPlayer();
		} else if ((ul != null) && (ul != "")) {
			//oplay.setAttribute("src",ul); 
			oplay.setAttribute("src",ul); 
			name = name || "";
			singerName = singerName || "";
			iSongId = iSongId || 0;
			iSongType = iSongType || 0;
			// this.mPlayList.addObject(-1,ul,"",0,"","");
			this.mPlayList.addObject(iSongId, ul, "", 0, name, singerName, "",
					iSongId, iSongType);
			this.mPlayingPos = this.mPlayList.getPos(ul);
			noticeToolbar("change", this.mPlayingPos);
			// noticeToolbar("play");
			//alert("runPlayer 4,ul:"+ul);
		}
		if ((this.mPlayingPos < 0) && (this.mPlayList.getCount() > 0)) {
			this.mPlayingPos = 0;
			
			//oplay.setAttribute("src",this.mPlayList.getObject(0).mPlayURL); 
			oplay.setAttribute("src",this.mPlayList.getObject(0).mPlayURL); 
			noticeToolbar("change", this.mPlayingPos);
			// noticeToolbar("play");
			//alert("runPlayer 5");
		}
		try {
			// 上报收听QQ音乐的独立用户数,
			m_rpt_box(0, ul, 0);
		} catch (e) {
		}
		
		if(this._checkClientPlatform() && this.firstPlay)
		{
			setTimeout(function(){VH5Player.startPlayer()},0);
			setTimeout(function(){VH5Player.startPlayer()},1000);
			this.firstPlay = false;
		}
		else
		{
			this.startPlayer();
		}
		
		
		//alert("runPlayer 6");
		try {
			playerv2_setinfo("pos", "" + this.mPlayingPos);
		} catch (e) {
		}
		

		return;
	};
	this.bindPlayEvent = function() {
		var oplay = (this.mPlayerName);
		//var oPlaySrc = (this.mPlayerSrc);
		var _this = this;
		// 开始加载
		EventUtil(oplay,"loadstart",function() {
			var oplay=VH5Player.mPlayerName;
			oplay.setAttribute("state", S_PLAYBEGIN);
			//alert("loadstart");
		});
		//开始播放
		EventUtil(oplay,"play",function() {
			var oplay=VH5Player.mPlayerName;
			oplay.setAttribute("state", S_PLAYBEGIN);
			//alert("onplay:1,src:"+oplay.getAttribute("src"));
			/*
			if(oplay.getAttribute("src").indexOf('fcg_set_musiccookie') > -1)
			{
				//alert("onplay:2");
				VH5Player.mSetedCookie = true;
			}
			*/
			//alert("play");
		});
		// 播放中
		EventUtil(oplay,"playing",function() {
			var oplay=VH5Player.mPlayerName;
			oplay.setAttribute("state", S_PLAYING);
			//alert("playing");
		});
		// 暂停
		EventUtil(oplay,"pause",function() {
			var oplay=VH5Player.mPlayerName;
			oplay.setAttribute("state", S_PAUSE);
			//alert("pause");
		});
		//取回媒介数据过程中（延迟）存在错误
		EventUtil(oplay,"stalled",function() {
			var oplay=VH5Player.mPlayerName;
			oplay.setAttribute("state", S_STOP);
			//alert("onerror:1,src:"+oplay.getAttribute("src"));
			if(oplay.getAttribute("src").indexOf('fcg_set_musiccookie') > -1)
			{
				//alert("onerror:2,src:"+oplay.getAttribute("src"));
				VH5Player.mSetedCookie = true;
			}
			//alert("error");
		});
		// 加载失败
		EventUtil(oplay,"error",function() {
			var oplay=VH5Player.mPlayerName;
			oplay.setAttribute("state", S_STOP);
			//alert("onerror:1,src:"+oplay.getAttribute("src"));
			if(oplay.getAttribute("src").indexOf('fcg_set_musiccookie') > -1)
			{
				//alert("onerror:2,src:"+oplay.getAttribute("src"));
				VH5Player.mSetedCookie = true;
			}
			//alert("error");
		});
		// 播放结束

		EventUtil(oplay,"ended",function() {
			//alert("ended");
			/*
			var oplay=VH5Player.mPlayerName;
			oplay.setAttribute("state", S_PLAYEND);
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
			*/
			var oplay=VH5Player.mPlayerName;
			VH5Player.mPlayerState=S_PLAYEND;
			//VH5Player.autoRandomPlay(VH5Player,true,VH5Player.mRandomPlay);
		});
		
		EventUtil(oplay,"timeupdate",function(){
			var oplay=VH5Player.mPlayerName;
			var lCurPos = Math.floor(oplay.currentTime);
			var lTotal = Math.floor(oplay.duration);
			if(debugMode)
			{
				status="PlayProgress,curPos:"+lCurPos+",total:"+lTotal;
			}
			/*
			if(!!VQQPlayer)
			{
				VQQPlayer.mCurPlayPos = lCurPos;
				VQQPlayer.mCurPlayTotal = lTotal;
			}
			*/
			try {
				var pPos = (lCurPos / lTotal).toFixed(2) * 100;
				if(!QZONE.music.isBgMusic)
				{
					setCurPageProgress(pPos,lCurPos, lTotal);
					setMyloveProgress(pPos,lCurPos, lTotal);
				}
			} catch (e) {}
			
			if(lCurPos == lTotal)
			{
				var oplay=VH5Player.mPlayerName;
				oplay.setAttribute("state", S_PLAYEND);
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
				VH5Player.mPlayerState=S_PLAYEND;
				VH5Player.autoRandomPlay(VH5Player,true,VH5Player.mRandomPlay);
			}
			
		});
	}
	this.startPlayer = function() {
		// 开始播放
		var oplay = (this.mPlayerName);
		try {
			if (this.bereload)
			{
				oplay.load();
			}
			oplay.play();
			noticeToolbar("play");

			
		} catch (e) {
			if (debugMode) {
				status = ("e 2 " + e.message);
			}
		}
		return false;
	};
	this.stopPlayer = function() {
		if (!this.mInit) {
			return false;
		}
		if ((!this.isPlaying()) && (!this.isPause())) {
			return false;
		}
		try {
			var oplay = this.mPlayerName;

			//oplay.stop();
			//noticeToolbar('stop');
			oplay.pause();
			noticeToolbar("pause");

		} catch (e) {
			if (debugMode) {
				status = ("e 3 " + e.message);
			}
		}
		return true;
	};
	this.pausePlayer = function() {
		if (!this.mInit) {
			return false;
		}
		if (!this.isPlaying()) {
			return false;
		}
		try {
			var oplay = this.mPlayerName;
			oplay.pause();
			noticeToolbar("pause");
		} catch (e) {
			if (debugMode) {
				status = ("e 4 " + e.message);
			}
		}
		return true;
	};
	this.isPlaying = function() {
		
		if (!this.mInit) {
			return false;
		}
		
		var _s = this.getStatus();
		return ((_s == S_PLAYING) || (_s == S_BUFFERING) || (_s == S_PLAYBEGIN));
	};
	this.isPause = function() {
		if (!this.mInit) {
			return false;
		}
		var _s = this.getStatus();
		return (_s == S_PAUSE || this.mPlayerName.paused);
	};
	this.isStop = function() {
		if (!this.mInit) {
			return false;
		}
		var _s = this.getStatus();
		return ((_s == S_STOP) || this.mPlayerName.ended || (_s == S_MEDIAEND) || (_s == S_UNDEFINE) || (_s == S_READY));
	};
	this.setMute = function() {
		if (!this.mInit) {
			return false;
		}
		var oplay = this.mPlayerName;
		if (oplay.muted) {
			oplay.muted = false;
		} else {
			oplay.muted = true;
		}
		return true;
	};
	this.getVolumn = function() {
		if (!this.mInit) {
			return 0;
		}
		return (this.mPlayerName).volume * 100;
	};
	this.setVolumn = function(vol) {
		if (!this.mInit) {
			return false;
		}
		var oplay = (this.mPlayerName);
		if (oplay.muted) {
			return false;
		}
		if (vol > 100) {
			vol = 100;
		}
		if (vol < 0) {
			vol = 0;
		}
		if (vol >= 0 && vol <= 100) {
			oplay.volume = vol / 100;
		}

		return true;
	};
	this.quickPlayer = function(pos) {
		if (!this.mInit) {
			return false;
		}
		if (!this.isPlaying()) {
			return false;
		}
		var oplay = this.mPlayerName;
		if ((oplay.currentTime + pos) >= oplay.duration) {
			return false;
		}
		if ((oplay.currentTime + pos) <= 0) {
			return false;
		}
		oplay.currentTime += pos;
		return true;
	};
	this.lastPlayer = function() {
		if (this.mPlayList.getCount() == 0) {
			return;
		}
		this.mPlayingPos = this.mPlayingPos - 1;
		if ((this.mPlayingPos < 0)
				|| (this.mPlayingPos >= this.mPlayList.getCount())) {
			this.mPlayingPos = this.mPlayList.getCount() - 1;
		}
		var curObj = this.mPlayList.getObject(this.mPlayingPos);
		this.runPlayer(curObj.mPlayURL, curObj.mSongName, curObj.mSingerName,
				curObj.mSongId, curObj.mSongType);
		/*
		 * if(QZONE.toolbar && typeof(QZONE.toolbar.musicNotice)=="function") {
		 * QZONE.toolbar.musicNotice("change",this.mPlayingPos);
		 * QZONE.toolbar.musicNotice("play"); }
		 */
		return this.mPlayingPos;
	};
	this.nextPlayer = function() {
		if (this.mPlayList.getCount() == 0) {
			return -1;
		}
		this.mPlayingPos = this.mPlayingPos + 1;
		if ((this.mPlayingPos >= this.mPlayList.getCount())
				|| (this.mPlayingPos < 0)) {
			this.mPlayingPos = 0;
		}
		var curObj = this.mPlayList.getObject(this.mPlayingPos);
		this.runPlayer(curObj.mPlayURL, curObj.mSongName, curObj.mSingerName,
				curObj.mSongId, curObj.mSongType);
		/*
		 * if(QZONE.toolbar && typeof(QZONE.toolbar.musicNotice)=="function") {
		 * QZONE.toolbar.musicNotice("change",this.mPlayingPos);
		 * QZONE.toolbar.musicNotice("play"); }
		 */
		return this.mPlayingPos;
	};
	this.setBalance = function() {
		
	};
	this.getErrorMsg = function() {
		var errorDesc = this.mPlayerName.error.item(0).errorDescription;
		return errorDesc;
	};
	// function(name,bAutoPlay,bRandom)
	this.autoRandomPlay = function(name, ba, br) {
		var mCurrentPos;
		if (!this.isInitialize()) {
			return;
		}
		if (this.mPlayList.getCount() == 0) {
		} else if (ba) {
			if (br && QZONE.music.isBgMusic) {
				// 随机播放
				try {
					if (this.isStop() || this.mPlayingPos < 0) {
						mCurrentPos = this.mPlayingPos;
						do {
							this.mPlayingPos = Math.floor(Math.random()
									* this.mPlayList.getCount());
						} while (mCurrentPos == this.mPlayingPos
								&& this.mPlayList.getCount() > 1);
						var curObj = this.mPlayList.getObject(this.mPlayingPos);
						this.runPlayer(curObj.mPlayURL, curObj.mSongName,
								curObj.mSingerName, curObj.mSongId,
								curObj.mSongType);
						autoChangeMultiPlay();
						/*
						 * if(QZONE.toolbar &&
						 * typeof(QZONE.toolbar.musicNotice)=="function") {
						 * QZONE.toolbar.musicNotice("change",this.mPlayingPos);
						 * QZONE.toolbar.musicNotice("play"); }
						 */
					}
				} catch (e) {
					if (debugMode) {
						status = ("e 5 " + e.message);
					}
				}
			} else {
				// 顺序播放
				try {
					if (this.isStop()) {
						this.nextPlayer();
					}
					if (this.mPlayingPos < 0) {
						this.runPlayer();
					}
					autoChangeMultiPlay();
				} catch (e) {
					if (debugMode) {
						status = ("e 6 " + e.message);
					}
				}
			}
		}
		return;
	};
	this.printPlayList = function() {
		var list = "";
		for (var i = this.mPlayList.getCount(); i > 0; i--) {
			list = list + _("第[{0}]播放记录:",i)
					+ this.mPlayList.getObject(i - 1).mPlayURL + "\n";
		}
		return list;
	};
}

var bRandomPlay = false;
function runPlayer(pos)
{
	if(pos==null)
	{
		pos = -1;
	}
	// call from frame
	if(!top.VH5Player)
	{
		return;
	}
	
	try
	{
		if(top.g_iLoginUin == top.g_iUin && top.g_iUin > 10000)
		{
			top.QZONE.FrontPage.getSecondaryBitMapFlag(function(wholeBitmap,needBitmap){bRandomPlay=(needBitmap>0 ? true : false);if(top.VH5Player){top.VH5Player.mRandomPlay = bRandomPlay;}},22,1,top.g_iUin);
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
	if(top.VH5Player)
	{
		//VQQPlayer.mRandomPlay = bRandomPlay;
		if(pos==-1)
		{
			var cPos=top.VH5Player.mPlayingPos;
			if(cPos > -1)
			{
				top.VH5Player.runPlayerPos(cPos);
			}
			else
			{
				//top.VQQPlayer.runPlayer('');
				//setAutoPlay(true,bRandomPlay);
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
			}
		}
		else
		{
			top.VH5Player.runPlayerPos(pos);
		}
	}
	
	//setAutoPlay(true,bRandomPlay);
}
function setAutoPlay(ba,bRandomPlay)
{
	// call from frame
	if(top.qqplayer_play_flag==null)
	{
		top.qqplayer_play_flag = true;
	}
	if(top.qqplayer_play_flag)
	{
		if(top.VH5Player)
		{
			//if(!top.VH5Player.isPause())
			//{
				top.VH5Player.autoRandomPlay(top.VH5Player,ba,bRandomPlay);
			//}
		}
	}

}	


