if(!window.getElementInBody)getElementInBody=function(id,tagName,insertFirst,parentNodeID,className,initCSSText)
{
	var e = $(id);
	if (!e)
	{
		tagName = (!tagName)?"div":tagName; 
		//���û������tagName ��Ĭ��Ϊdiv
        e = document.createElement(tagName);
		e.id = id;
		var parentNode = (!parentNodeID)?document.body:$(parentNodeID);
		if (insertFirst)
		{
		    parentNode.insertBefore(e,parentNode.firstChild);
		}
        else
		{
		    parentNode.appendChild(e);
		}
		e.className = className?className:"";
		e.style.cssText = initCSSText?initCSSText:"";
	}
	parentNode = null;
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
function arg2arr(refArgs, start) {
		if (typeof start == 'undefined') {
			start = 0;
		}
		return Array.prototype.slice.apply(refArgs, [start, refArgs.length]);
}
function isString(o) {
	return (typeof(o) != 'undefined') && (o!==null) && (typeof(o) == 'string' || !!o.toString);
}
/**
 * �Ƿ��������
 * 
 * @param {Object} o Ŀ��
 * @return {Boolean} ���
 */
function isArrayfunction(o) {
	//return (typeof(o) == 'object' && (o instanceof Array));
	return (Object.prototype.toString.apply(o) === '[object Array]');
}
/**
 * �Ƿ��ϣ��ṹ
 * 
 * @param {Object} o Ŀ��
 * @return {Boolean} ���
 */
function isHashMap(o) {
	return ((o !== null) && (typeof(o) == 'object'));
}

/**
 * ��arguments����ת��Ϊ������
 * 
 * @param {Object} refArgs ��һ��arguments���������
 * @param {Number} start ��ʼƫ����
 * @return {Array} �������
 */
function arg2arr(refArgs, start) {
	if (typeof start == 'undefined') {
		start = 0;
	}
	return Array.prototype.slice.apply(refArgs, [start, refArgs.length]);
}

/**
 * JSON������ȸ���
 * 
 * @param {All} obj ��Ҫ���Ƶ�JSON���ݸ���
 * @return {All} ���Ƴ�����JSON����
 */
function objectClone(obj, preventName) {
	if ((typeof obj) == 'object') {
		var res = (QZONE.lang.isArray(obj) || !!obj.sort) ? [] : {};
		for (var i in obj) {
			if (i != preventName)
				res[i] = objectClone(obj[i], preventName);
		}
		return res;
	} else if ((typeof obj) == 'function') {
		return (new obj()).constructor;
	}
	return obj;
}
/**
 * �����Ա����(ǳ����)
 * 
 * @param {Object} s ���Ƶ�Ŀ�����
 * @param {Object} b ���Ƶ�Դ����
 * @param {Object} propertiSet ����Ҫ���������Ƽ���
 * @return {Object} Ŀ�����
 */
/*
propertieCopy : function(s, b, propertiSet) {
	if (typeof propertiSet == 'undefined') {
		for (var p in b) {
			s[p] = b[p];
		}
	} else {
		for (var p in propertiSet) {
			s[p] = b[p];
		}
	}
	return s;
},
*/
/**
 * ȥ���������ظ���Ԫ��
 * 
 * @param {Array} arr
 */
 /*
uniqueArray : function(arr) {
	var flag = {};

	var index = 0;
	while (index < arr.length) {
		if (flag[arr[index]] == typeof(arr[index])) {
			arr.splice(index, 1);
			continue;
		}

		flag[arr[index].toString()] = typeof(arr[index]);
		++index;
	}

	return arr;
}
*/
/**
 * �ַ���������
 * 
 * @class StringBuilder
 * @constructor
 */
var StringBuilder = function() {
	this._strList = arg2arr(arguments);
};
/**
 * ����һ���ַ���
 * 
 * @param {String} str ��Ҫ������ַ���
 */
StringBuilder.prototype.append = function(str) {
	if (isString(str)) {
		this._strList.push(str.toString());
	}
};

/**
 * ����ǰ׷��һ���ַ���
 * 
 * @param {String} str ��Ҫ������ַ���
 */
StringBuilder.prototype.insertFirst = function(str) {
	if (isString(str)) {
		this._strList.unshift(str.toString());
	}
};

/**
 * ����һϵ���ַ���
 * 
 * @param {Array} arr ��Ҫ������ַ�������
 */
StringBuilder.prototype.appendArray = function(arr) 
{
	if (isArray(arr)) 
	{
		this._strList = this._strList.concat(arr);
	}
};
/**
 * ���л�����ʵ��
 * 
 * @param {String} spliter �����ָ��ַ���ķ���
 * @return {String} �ַ������������
 */
StringBuilder.prototype.toString = function(spliter) {return this._strList.join(!spliter ? '' : spliter);};
/**
 * ����ַ���������
 */
StringBuilder.prototype.clear = function() {this._strList.splice(0, this._strList.length);};

function insertMediaPlayer(wmpArguments, cid) 
{
	var params = new StringBuilder();
	var objArgm = new StringBuilder();
	if (typeof(cid) == 'undefined') {
		cid = "clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6";
	}

	for (var k in wmpArguments) {
		switch (k) {
			case "id" :
			case "width" :
			case "height" :
			case "style" :
				objArgm.append(k + '="' + wmpArguments[k] + '" ');
				break;
			case "src" :
				objArgm.append(k + '="' + wmpArguments[k] + '" ');
				break;
			default :
				objArgm.append(k + '="' + wmpArguments[k] + '" ');
				params.append('<param name="' + k + '" value="'
						+ wmpArguments[k] + '" />');
		}
	}
	if (wmpArguments["src"]) {
		params.append('<param name="URL" value="' + wmpArguments["src"]
				+ '" />');
	}

	if (ua.ie) {
		return '<object classid="' + cid + '" ' + objArgm + '>' + params
				+ '</object>';
	} else {
		return '<object  type="application/x-ms-wmp" ' + objArgm + '></object>';
	}
}
function insertWMP(args) {
	g_wmplayerDiv = getElementInBody("wm_control", "div");
	g_wmplayerDiv.innerHTML = insertMediaPlayer(args);
	return g_wmplayerDiv.firstChild;
}
	
function createMediaPlayer()
{
	return insertWMP({
		id : 'wmplayer',
		height : 0,
		width : 0,
		autoStart : 'ture',
		invokeURLs : 'false',
		uiMode : 'invisible',
		enablePositionControls : 'true',
		canScan : 'true',
		canSeek : 'true',
		src : 'http://qzone-music.qq.com/fcg-bin/fcg_set_musiccookie.fcg?fromtag=12&p='+Math.random()
		//src : 'http://cgi.music.soso.com/fcgi-bin/fcg_set_sosokey.q'
	});
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
		if(!obj || !obj.controls)
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
				alert("�Բ��������ڵ�ý�岥�����汾̫�ͣ�������ý�岥������");
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
		/*alert(this.mInit)
		if(!this.mInit)
		{
			return;
		}*/
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
				//�ϱ�����QQ���ֵĶ����û���,
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
	this.startPlayer = function() {
		// ��ʼ����
		var oplay = (this.mPlayerName);
		try {
			document.title = oplay.controls.isAvailable('play');
			if (oplay.controls.isAvailable('play')) {
				document.title = 'play';
				oplay.controls.play();
			}
		} catch (e) {
			if (debugMode) {
				status = ("e 2 " + e.message);
			}
		}

		return false;
	};
	this.stopPlayer = function() {
		/*if (!this.mInit) {
			return false;
		}
		if ((!this.isPlaying()) && (!this.isPause())) {
			return false;
		}*/
		try {
			var oplay = (this.mPlayerName);
			if (oplay.controls.isAvailable('stop')) {
				oplay.controls.stop();
			}
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
			var oplay = (this.mPlayerName);
			if (oplay.controls.isAvailable('pause')) {
				oplay.controls.pause();
			}
		} catch (e) {
			if (debugMode) {
				status = ("e 4 " + e.message);
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
		if((oplay.controls.currentPosition+pos)>=oplay.currentMedia.duration)
		{
			return false;
		}
		if((oplay.controls.currentPosition+pos)<=0)
		{
			return false;
		}
		oplay.controls.currentPosition+=pos;
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
		return(oplay.settings.balance=='100'?'������':'������');
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
				//�������
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
				//˳�򲥷�
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
			list = list+"��["+i+"]"+"���ż�¼:"+this.mPlayList.getObject(i-1).mPlayURL+"\n";  
		}	
		return list;
	};	
}

// wmp�ؼ����ý�����λ��
function PlayerPositioning() {
	// ���ý�����λ��
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
// wmp�ؼ����ȵ���
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
			case 1 : // �������ֹͣ
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
			case 2 :// ���������ͣ
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
			case 3 :// ���ڲ���
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
			case 4 : // ��ǰ
			case 5 : // ���
			case 6 : // ������
			case 7 : // �ȴ���
			case 8 : // ���Ž���
			case 9 : // ͨ����
			case 11 : // ��������
				loopCheckPlayer();
				//alert("status:"+iStatus);
				break;
			case 10 : // ׼������
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