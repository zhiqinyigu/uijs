if(!window.getElementInBody)getElementInBody=function(id,tagName)
{
	var e = $(id);
	if (!e)
	{
		tagName = (!tagName)?"div":tagName; 
		//如果没有设置tagName 则默认为div
        e = document.createElement(tagName);
		e.id = id;
	   document.body.appendChild(e);
	}
	return e;
}
function StrBuf()
{
	this._s_=[];
}
StrBuf.prototype.a=function(s)
{
	this._s_.push(s);
}
StrBuf.prototype.c=function()
{
	this._s_=[];
}
StrBuf.prototype.d=function()
{
	this._s_=null;
}
StrBuf.prototype.toS=function()
{
	return this._s_.join("");
}
function insertMediaPlayer(args)
{
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
	objAttrs["classid"] = "CLSID:6BF52A52-394A-11D3-B153-00C04F79FAA6";
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
	g_wmplayerDiv = getElementInBody("wm_control","div");
	g_wmplayerDiv.innerHTML = str.toS();
	str.d();
	return g_wmplayerDiv.firstChild;
}
function createMediaPlayer()
{
	return insertMediaPlayer({id:'wmplayer',height:0,width:0,autoStart:'ture',invokeURLs:'false',uiMode:'invisible'});
}
function WMPlayer()
{
	this.mPlayerName = "";
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
	this.mFromTag=6;
	this.setUserIdent = function(iUin,sKey,iFromTag)
	{
		this.mUinCookie = iUin;
		this.mKeyCookie = sKey;
		this.mFromTag = iFromTag+"";
	};
	this.checkPlayer = function(dl)
	{
		var obj = this.mPlayerName;
		if(!obj || !obj.Controls)
		{
			return false;
		}
		return true;
	};
	//function(bVisible,bInstall,objName,objWidth,objHeight,strUinCookieName,strKeyCookieName,strDLLink)
	this.createActiveX = function(bv,bi,name,w,h,uincn,keycn,dl)
	{
		this.mPlayerName = createMediaPlayer();
		this.mVisible = bv;
		this.mInstall = bi;
		this.mUinCookieName = uincn;
		this.mKeyCookieName = keycn;
		this.mDLLink = dl;
		return "";
	};
	this.initialize = function()
	{
		if(!this.checkPlayer())
		{
			if(this.mInstall)
			{
				alert("对不起，您现在的媒体播放器版本太低，请升级媒体播放器。");
				window.location = this.mDLLink;
			}
			return false;
		}
		setCookie(MUSIC_UIN_COOKIE_NAME,getCookie(this.mUinCookieName));
		setCookie(MUSIC_KEY_COOKIE_NAME,getCookie(this.mKeyCookieName));
		setCookie("qqmusic_fromtag",6);
		
		this.mPlayerName.invokeURLs= false;
		try
		{
			//this.mPlayerName.settings.volume = 80;
			this.mPlayerName.settings.volume = getSOVolume();
		}
		catch(e)
		{
		};
		this.mInit = true;
		return true;
	};	
	this.isInitialize = function()
	{
		return this.mInit;
	};	
	this.getStatus = function()
	{
		if(!this.mInit)
		{
			return -1;
		}
		return this.mPlayerName.playState;
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
		if(pos>=0&&pos<this.mPlayList.getCount())
		{
			var curObj = this.mPlayList.getObject(pos);
			this.runPlayer(curObj.mPlayURL,curObj.mSongName,curObj.mSingerName,curObj.mSongId,curObj.mSongType);
			//this.runPlayer(this.mPlayList.getObject(pos).mPlayURL);
		}
	};

	this.runPlayer = function(ul,name,singerName,iSongId,iSongType)
	{
		if(!this.mInit)
		{
			return;
		}
		var uin=getCookie(PANEL_UIN_COOKIE_NAME);
		var key=getCookie(PANEL_KEY_COOKIE_NAME);
		if(uin==""){uin=getCookie("uin").replace(/[^\d]/g,"");};
		if(key==""){key=getCookie("skey");};
		this.setUserIdent(uin!="" ? uin : '12345678',key!="" ? key : '12345678',6);
		setCookie(MUSIC_UIN_COOKIE_NAME,this.mUinCookie);
		setCookie(MUSIC_KEY_COOKIE_NAME,this.mKeyCookie);
		setCookie("qqmusic_fromtag",this.mFromTag);
		
		var oplay = this.mPlayerName;
		if(this.isPause())
		{
			//this.startPlayer();
		}	
		else if((ul!=null)&&(ul!=""))
		{	
			oplay.URL = ul;
			name = name || "";
			singerName = singerName || "";
			iSongId = iSongId || 0;
			iSongType = iSongType || 0;
			//this.mPlayList.addObject(-1,ul,"",0,"","");
			this.mPlayList.addObject(iSongId,ul,"",0,name,singerName,"",iSongId,iSongType);
			this.mPlayingPos = this.mPlayList.getPos(ul);
			noticeToolbar("change",this.mPlayingPos);
			//noticeToolbar("play");
			
		}
		if((this.mPlayingPos<0)&&(this.mPlayList.getCount()>0	))
		{
			this.mPlayingPos = 0;
			oplay.URL = this.mPlayList.getObject(0).mPlayURL;
			noticeToolbar("change",this.mPlayingPos);
			//noticeToolbar("play");
		}
		try
		{
				//上报收听QQ音乐的独立用户数,
				m_rpt_box(0,ul,0);
		}
		catch(e)
		{
		}
		this.startPlayer();

		try
		{
			playerv2_setinfo("pos",""+this.mPlayingPos);
		}
		catch(e)
		{
		}
		try
		{
			if (window.idCheckPlayerTimer) 
			{
				window.clearTimeout(idCheckPlayerTimer);
			}
			window.idCheckPlayerTimer = checkPlayer();
		}
		catch(e)
		{
		}

		return;		
	};	
	this.startPlayer = function()
	{
		// 开始播放
		var oplay = (this.mPlayerName);
		try {
			if (oplay.controls.isAvailable('play')) {
				oplay.controls.Play();
				noticeToolbar("play");
				
			}
		} catch (e) {
			if (debugMode) {
				status = ("e 2 " + e.message);
			}
		}
		return false;
	};
	this.stopPlayer = function()
	{
		if(!this.mInit)
		{
			return false;
		}
		if((!this.isPlaying())&&(!this.isPause()))
		{
			return false;
		}
		try
		{	
			var oplay = this.mPlayerName;
			if(oplay.Controls.isAvailable('stop'))
			{
				oplay.Controls.Stop();
				noticeToolbar('stop');
			}
		}
		catch(e)
		{
			if(debugMode)
			{
				status =("e 3 "+e.message);
			}
		}		
		return true;
	};		
	this.pausePlayer = function()
	{
		if(!this.mInit)
		{
			return false;
		}
		if(!this.isPlaying())
		{
			return false;
		}
		try
		{	
			var oplay = this.mPlayerName;
			if(oplay.Controls.isAvailable('pause'))
			{
				oplay.Controls.Pause();
				noticeToolbar("pause");
			}
		}
		catch(e)
		{
			if(debugMode)
			{
				status =("e 4 "+e.message);
			}
		}			
		return true;
	};	
	this.isPlaying = function()
	{
		if(!this.mInit)
		{
			return false;
		}
		var _s = this.getStatus();
		return((_s==S_PLAYING)||(_s==S_BUFFERING));
	};
	this.isPause = function()
	{
		if(!this.mInit)
		{
			return false;
		}
		var _s = this.getStatus();
		return(_s==S_PAUSE);		
	};
	this.isStop = function()
	{
		if(!this.mInit)
		{
			return false;
		}
		var _s = this.getStatus();
		return 	((_s==S_STOP)||(_s==S_MEDIAEND)||(_s==S_UNDEFINE)||(_s==S_READY));
	};	
	this.setMute = function()
	{
		if(!this.mInit)
		{
			return false;
		}
		var oplay = this.mPlayerName;
		if(oplay.settings.mute)
		{
			oplay.settings.mute = false;
		}
		else
		{
			oplay.settings.mute = true;		
		}
		return true;
	};
	this.getVolumn = function()
	{
		if(!this.mInit)
		{
			return 0;
		}
		return (this.mPlayerName).settings.volume;
	};
	this.setVolumn = function(vol)
	{
		if(!this.mInit)
		{
			return false;
		}
		var oplay = (this.mPlayerName);
		if(oplay.settings.mute)
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
			oplay.settings.volume=vol;
		}
		
		return true;	
	};	
	this.quickPlayer = function(pos)
	{
		if(!this.mInit)
		{
			return false;
		}
		if(!this.isPlaying())
		{
			return false;
		}
		var oplay = this.mPlayerName;
		if((oplay.Controls.currentPosition+pos)>=oplay.currentMedia.duration)
		{
			return false;
		}
		if((oplay.Controls.currentPosition+pos)<=0)
		{
			return false;
		}
		oplay.Controls.currentPosition+=pos;
		return true;
	};
	this.lastPlayer = function()
	{
		if(this.mPlayList.getCount()==0)
		{
			return;
		}
		this.mPlayingPos = this.mPlayingPos - 1;
		if((this.mPlayingPos<0)||(this.mPlayingPos>=this.mPlayList.getCount()))
		{
			this.mPlayingPos = this.mPlayList.getCount()-1;
		}
		var curObj = this.mPlayList.getObject(this.mPlayingPos);
		this.runPlayer(curObj.mPlayURL,curObj.mSongName,curObj.mSingerName,curObj.mSongId,curObj.mSongType);
		/*
		if(QZONE.toolbar && typeof(QZONE.toolbar.musicNotice)=="function")
		{
			QZONE.toolbar.musicNotice("change",this.mPlayingPos);
			QZONE.toolbar.musicNotice("play");
		}
		*/
		return this.mPlayingPos;
	};
	this.nextPlayer = function()
	{
		if(this.mPlayList.getCount()==0)
		{
			return -1;
		}
		this.mPlayingPos = this.mPlayingPos+1;
		if((this.mPlayingPos>=this.mPlayList.getCount())||(this.mPlayingPos<0))
		{
			this.mPlayingPos = 0;
		}
		var curObj = this.mPlayList.getObject(this.mPlayingPos);
		this.runPlayer(curObj.mPlayURL,curObj.mSongName,curObj.mSingerName,curObj.mSongId,curObj.mSongType);
		/*
		if(QZONE.toolbar && typeof(QZONE.toolbar.musicNotice)=="function")
		{
			QZONE.toolbar.musicNotice("change",this.mPlayingPos);
			QZONE.toolbar.musicNotice("play");
		}
		*/
		return this.mPlayingPos;	
	};
	this.setBalance = function()
	{
		var oplay = this.mPlayerName;
		oplay.settings.balance = oplay.settings.balance=='100'?'-100':'100';
		return(oplay.settings.balance=='100'?'右声道':'左声道');
	};
	this.getErrorMsg = function()
	{
		var errorDesc = this.mPlayerName.error.item(0).errorDescription;
		return errorDesc;
	};	
	//function(name,bAutoPlay,bRandom)
	this.autoRandomPlay = function(name,ba,br)
	{
		var mCurrentPos;
		if(!this.isInitialize())
		{
			return;
		}
		if(this.mPlayList.getCount()==0)
		{
		}	
		else if(ba)
		{
			if(br)
			{
				//随机播放
				try
				{
					if( this.isStop() || this.mPlayingPos < 0)
					{
						mCurrentPos = this.mPlayingPos;
						do 
						{
							this.mPlayingPos = Math.floor(Math.random()*this.mPlayList.getCount());
						}
						while(mCurrentPos == this.mPlayingPos&&this.mPlayList.getCount()>1);
						var curObj = this.mPlayList.getObject(this.mPlayingPos);
						this.runPlayer(curObj.mPlayURL,curObj.mSongName,curObj.mSingerName,curObj.mSongId,curObj.mSongType);
						autoChangeMultiPlay();
						/*
						if(QZONE.toolbar && typeof(QZONE.toolbar.musicNotice)=="function")
						{
							QZONE.toolbar.musicNotice("change",this.mPlayingPos);
							QZONE.toolbar.musicNotice("play");
						}
						*/
					}
				}
				catch(e)
				{
					if(debugMode)
					{
						status =("e 5 "+e.message);
					}
				}			
			}
			else
			{	
				//顺序播放
				try
				{
					if( this.isStop())
					{
						this.nextPlayer();
					}
					if(this.mPlayingPos<0)
					{
						this.runPlayer();
					}
					autoChangeMultiPlay();
				}
				catch(e)
				{
					if(debugMode)
					{
						status =("e 6 "+e.message);
					}
				}				
			}
		}
		return;
	};	
	this.printPlayList = function()
	{
		var list = "";
		for(var i=this.mPlayList.getCount(); i>0; i--)
		{
			list = list+"第["+i+"]"+"播放记录:"+this.mPlayList.getObject(i-1).mPlayURL+"\n";  
		}	
		return list;
	};	
}

// wmp控件设置进度条位置
function PlayerPositioning() {
	// 设置进度条位置
	try {
		var lCurPos = MediaPlayer.mPlayerName.controls.currentPosition;
		var lTotal = MediaPlayer.mPlayerName.currentMedia.duration;
		var pPos = (lCurPos / lTotal).toFixed(2) * 148;
		if(!QZONE.music.isBgMusic)
		{
			//setCurPageProgress(pPos);
			setCurPageProgress(pPos,lCurPos, lTotal);
			setMyloveProgress(pPos);
		}
		
	} catch (e) {
		window.status = e;
	}
}
// wmp控件进度调节
var idCheckPlayerTimer;
function loopCheckPlayer()
{
	if(idCheckPlayerTimer)
	{
		window.clearTimeout(idCheckPlayerTimer);
	}
	idCheckPlayerTimer = window.setTimeout("checkPlayer()", 1000);
}
function checkPlayer() 
{
	try {
		var iStatus = MediaPlayer.mPlayerName.playState;
		switch (iStatus) {
			case 1 : // 如果播放停止
				loopCheckPlayer();
				try {
					if(!QZONE.music.isBgMusic)
					{
						setCurPagePlayState(false);
						setCurPageProgress(0,0,0);
						setMylovePlayState(false);
						setMyloveProgress(0);
					}
				} catch (e) {
				}
				//alert("status:"+iStatus);
				break;
			case 2 :// 如果播放暂停
				//window.IS_PAUSE = true;
				loopCheckPlayer();
				try {
					if(!QZONE.music.isBgMusic)
					{
						setCurPagePlayState(false);
						setMylovePlayState(false);
					}
				} catch (e) {
				}
				//alert("status:"+iStatus);
				break;
			case 3 :// 正在播放
				/*
				var iLeftTime = MediaPlayer.mPlayerName.currentMedia.duration - MediaPlayer.mPlayerName.controls.currentPosition;
				window.clearTimeout(idCheckPlayerTimer);
				if (iLeftTime > 0) {
					idCheckPlayerTimer = window.setTimeout("checkPlayer()",	1000);
				} else {
					// autoChangeMusic();
					idCheckPlayerTimer = window.setTimeout("checkPlayer()",	1000);
				}
				*/

				loopCheckPlayer();
				PlayerPositioning();
				try {
					if(!QZONE.music.isBgMusic)
					{
						setCurPagePlayState(true);
						setMylovePlayState(true);
					}
				} catch (e) {
				}
				//alert("status:"+iStatus);
				break;
			case 4 : // 向前
			case 5 : // 向后
			case 6 : // 缓冲中
			case 7 : // 等待中
			case 8 : // 播放结束
			case 9 : // 通信中
			case 11 : // 重新连接
				loopCheckPlayer();
				//alert("status:"+iStatus);
				break;
			case 10 : // 准备就绪
				loopCheckPlayer();
				//BQplay();
				top.QZONE.music.playMusic();
				//alert("status:"+iStatus);
				break;
			default :
				loopCheckPlayer();
				//alert("status:"+iStatus);
				break;
		}
	} catch (e) {
		window.status = "PLAYER ERROR:" + e.message;
	}
	return;
}