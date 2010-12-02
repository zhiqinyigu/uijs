/**
 * MI.Capture
 * Author : xhlv@tencent.com
 * Datetime : 2010-11-25
 * Last Eidt: 
*/
MI.Capture = {};
(function(_aoWin, _aoUndefine) {
	//�������Ϣ
	var	_oNavigator = navigator,
		_sAgent = _oNavigator.userAgent.toLowerCase(),
		_bIsWin = /(windows|win32)/.test(_sAgent),
		_bIsOpera = _sAgent.indexOf("opera") > -1,
		_bIsIE = (_sAgent.indexOf("compatible") > -1 && !_bIsOpera)
		|| _sAgent.indexOf("msie") > -1,
		_bIsKHTML = /(khtml|konqueror|applewebkit)/.test(_sAgent),
		_bIsFF = _sAgent.indexOf("gecko") > -1 && !_bIsKHTML,
		_sFFVer = /firefox\/((\d|\.)+)/i.test(_sAgent) && RegExp.$1;

	var _oNameMap = {
			screencapture	: 0,
			//'UploadFilePartition' : 1, ftn������
			uploader		: 2,
			ftn				: 3,
			dropfile		: 4
		},

		_oPicTypeMap = {
			bmp : 0,
			jpg : 1,
			gif : 2
		},

		//���ߺ���
		_fParseInt = parseInt,

		_fExtend = function(_aoDest, _aoSrc, _abForce)
		{
			for (var i in _aoSrc)
			{
				if (_aoDest[i] == _aoUndefine || _abForce)
				{
					_aoDest[i] = _aoSrc[i];
				}
			}
		},

		_fCallback = function(_aoThis, _afCallBack, _aoParamList)
		{
			try
			{
				return typeof _afCallBack == "function"
					? _afCallBack.call(_aoThis, _aoParamList) : null;
			}
			catch (e)
			{
				throw e;
			}
		},

		_fUnikey = function (_asPrefix)
		{
			return [_asPrefix, +new Date, Math.random()].join("").split(".").join("");
		};

	//�ؼ���Ϣ
	var _sAliasTXGYMailActiveX = 'TXGYMailActiveX.',
		_sAliasScreenCapture = 'ScreenCapture',
		_sAliasUploader = 'Uploader',
		_sAliasFTNUpload = 'FTNUpload',
		_sActiveXDefaultId = _fUnikey('FF'),
		_oActiveXInfo = { _mbAble : false };
	if (_bIsIE)
	{
		_oActiveXInfo =
		{
			_msLastWholeVer : '1.0.1.32', //��1.0.1.32Ϊ���㣬�Ժ�ÿ���ؼ��İ汾��+1����Ӧ��λ��+1�� ����: ��ק��1.0.0.8��Ϊ1.0.0.9����ô��ʱ�汾��Ϊ1.0.1.33
			_msCurWholeVer : "", //�����ؼ��İ汾��
			_mbAble : true, //�ر������

			//��ʱû��
			//_msPath: "/activex/",
			//_msOnline : "TencentMailActiveX.cab",
			//_msDownload : "TencentMailActiveXInstall.exe",

			_moProgId : [_sAliasTXGYMailActiveX + _sAliasScreenCapture, "",
					_sAliasTXGYMailActiveX + _sAliasUploader, "TXFTNActiveX." + _sAliasFTNUpload, _sAliasTXGYMailActiveX + "DropFile"],
			_moCurVer : new Array(5),
			_moBaseVer : ["0.0.0.1", "", "1.0.1.31", "1.0.0.12", "1.0.0.8"], //_moBaseVer��Ϊ���㣬�ǲ���ģ��������������ؼ��İ汾��
			_moLastVer : ["1.0.1.31", "", "1.0.1.31", "1.0.0.12", "1.0.0.8"],
			_moMiniVer : ["1.0.0.28", "", "1.0.1.28", "1.0.0.10", "1.0.0.7"]
		};
	}
	else if (_bIsFF)
	{
		var _oFFVer = _sFFVer.split("."),
			_sAliasQQMailPlugin = "QQMail Plugin";
		_oActiveXInfo =
		{
			_msLastWholeVer: '1.0.1.32',
			_msCurWholeVer : "", //�����ؼ��İ汾��
			_mbAble : _bIsWin && _bIsFF && _oFFVer[0] >= 3 && (_oFFVer[1] > 0 || _oFFVer[2] >= 8 || parseInt(_oNavigator.buildID.substr(0, 8)) >= 20090701),

			//��ʱû��
			//_msPath: "/xpi/",
			//_msOnline : "TencentMailPlugin.xpi",
			//exe : "QQMailFireFoxplugin.exe",

			_moProgId	: [_sAliasScreenCapture, "", _sAliasUploader, _sAliasFTNUpload, ""],
			_moPluginName : [_sAliasQQMailPlugin, "", _sAliasQQMailPlugin, "Tencent FTN plug-in", _sAliasQQMailPlugin],
			_moCurVer : new Array(5),
			_moBaseVer : ["0.0.0.2", "", "1.0.1.32", "1.0.0.1", "1.0.0.0"],
			_moLastVer : ["1.0.1.32", "", "1.0.1.32", "1.0.0.1", "1.0.0.2"],
			_moMiniVer : ["1.0.0.28", "", "1.0.1.28", "1.0.0.1", "1.0.0.0"]
		};
	}

	var _qmActivex =
	{
		/**
			�����ؼ����°汾��
		 */
		lastVersion : _oActiveXInfo._msLastWholeVer,

		/**
			��ȡ�ؼ��İ汾��

			@param {String|Integer} _asType���ֵΪscreencapture, uploader, ftn, dropfile���ͻ�ȡ����Ŀؼ��İ汾��; ���򣬾��ǻ�ȡ�����ؼ��İ汾�ţ�Ϊintegerһ��Ϊ�ڲ��õ�
			@return {String} �汾�ţ����û�а�װ�ؼ������ؿ��ַ���
		 */
		getVersion : function(_asType)
		{
			if (!_oActiveXInfo._mbAble)
			{
				return "";
			}
			var _oSelf = this,
				_nType = typeof _asType == 'number' ? _asType : _oNameMap[_asType];
			if (_nType === _aoUndefine)
			{
				if (_oActiveXInfo._msCurWholeVer)
				{
					return _oActiveXInfo._msCurWholeVer;
				}
				//�汾�ŵĲ��ԣ���_oInfosIE�Ķ���
				for (var _sConcreteVer, _oVersion = [0, 0, 0, 0], i = 0; i < 5; i++)
				{
					if (_sConcreteVer = _oSelf.getVersion(i))
					{
						for (var _oConcreateVer = _sConcreteVer.split('.'), _oBaseVer = _oActiveXInfo._moBaseVer[i].split('.'), j = 0; j < 4; j++)
						{
							_oVersion[j] += parseInt(_oConcreateVer[j]) - _oBaseVer[j];
						}
					}
				}
				return _oVersion[0] ? ( _oActiveXInfo._msCurWholeVer = _oVersion.join('.') ) : '';
			}
			else
			{
				var _oCurVer = _oActiveXInfo._moCurVer;
				if (!_oCurVer[_nType])
				{
					_oSelf._createActiveX(_nType, _sActiveXDefaultId);
				}
				return _oCurVer[_nType] || '';
			}
		},

		/**
			�жϵ�ǰ�Ƿ�֧�����в��

			@param {String} _asType ���ͣ�ֵΪscreencapture, uploader, ftn, dropfile
			@return {Integer} 1: �ɵ�����, 2: ���°��
							  -1: ̫�ɲ�����
							  -2: û��װ���
							  -3: �������֧�ְ�װ�ؼ�
							  -4: �ؼ���֧�ָ���(ֻ������qq.com��foxmail.com��)
							  -5: �����Ƿ�

		 */
		isSupport : function(_asType)
		{
			var _oSelf = this,
				_sVersion,
				_nType = _oNameMap[_asType];
			if (_nType !== _aoUndefine)
			{
				if (!/:\.(qq|foxmail)\.com\//i.test( _aoWin.location.href ) && document.domain != 'qq.com')
				{
					return -4;
				}
				if (!_oActiveXInfo._mbAble)
				{
					return -3;
				}
				if (!(_sVersion = _oSelf.getVersion(_asType)) )
				{
					return -2;
				}
				if (_sVersion == _oActiveXInfo._moLastVer[_nType])
				{
					return 2;
				}
				for (var _oCurVersion = _sVersion.split('.'), _oMinVersion = _oActiveXInfo._moMiniVer[_nType].split('.'), i = 0; i < 4; i++)
				{
					if ( parseInt(_oCurVersion[i]) < parseInt(_oMinVersion[i]) )
					{
						return -1;
					}
				}
				return 1;
			}
			return -5;
		},

		/**
			�жϵ�ǰ�Ƿ�֧�����в��

			@param {String} _asType ���ͣ�ֵΪscreencapture, uploader, ftn, dropfile
			@return {Object} Object��������� �� null����ʱ��isSupport����ʲô�쳣
		 */
		getInstance : function(_asType)
		{
			var _oSelf = this,
				_nType = _oNameMap[_asType];
			if (_oActiveXInfo._mbAble && _nType !== _aoUndefine)
			{
				try
				{
					return new ([_qmActivex._screencapture, null, _qmActivex._uploader, _qmActivex._ftn, _qmActivex._dropfile][_nType])(_qmActivex._createActiveX(_nType));
				}
				catch (e)
				{
				}
			}
			return  null;
		},

		/**
			�����ؿؼ���ҳ��

			@param {Object} _aoWin �����window����ô��window.location.replace����ԭ���Ĵ��ڴ�, �����null�����´��ڴ�
			@return {Boolean} �Ƿ�򿪳ɹ�
		 */
		openDonwload : function(_aoWin)
		{
			//����version����cache������û����������������Ϊ�ؼ��и��£�version��cache���
			var _oSelf = this;
			_oActiveXInfo._msCurWholeVer = '';
			_oActiveXInfo._moCurVer = new Array(5);

			//_oActiveXInfo

			//bingjun todo

			return true;
		},


		//˽�к���//////////////////////////////////////
		/**
			��ȡ��������ʵ��

			����FF�����ftn��ÿ��ʵ������һ��embed���������̫���ʵ��������Ҫ����һ��id������

			@param {Integer} _anActivexId 0, 2, 3, 4 ��ϸ��_oNameMap
			@param {String} _asAddonInstanceId ֻ����FF��ftn����Ϊid
			@return {Object} ���null����ȡʧ��
		 */
		_createActiveX : function(_anActivexId, _asAddonInstanceId)
		{
			var _oSelf = this;
				_oInstance = null;
			if (_bIsIE)
			{
				try
				{
					_oInstance = new ActiveXObject(_oActiveXInfo._moProgId[_anActivexId]);
					//˳���ȡ����İ汾��
					//IE��activex��DropFile��û��Version�ģ��������Ǹ�
					_oActiveXInfo._moCurVer[_anActivexId] = _anActivexId == 4 ? _oActiveXInfo._moLastVer[4] : _oInstance.version;
				}
				catch (_oError)
				{
				}
			}
			else if (_oSelf._checkInstallPlugin(_anActivexId))
			{
				var _oDoc = _aoWin.document,
					_oAddonIns,
					_sInsid = "QQMailFFPluginIns";
				if (_anActivexId == 3)
				{
					_sInsid = _asAddonInstanceId || _sInsid + (+new Date);
					if ( !(_oAddonIns = _oDoc.getElementById(_sInsid)) )
					{
						_oAddonIns = _oDoc.createElement('embed');
						_oAddonIns.id = _sInsid;
						_oAddonIns.type = "application/txftn";
						//_oAddonIns.hidden = "true";
						_oAddonIns.setAttribute("hidden", "true");
						_oDoc.body.appendChild(_oAddonIns);
					}
					_oInstance = _oAddonIns.Version ? _oAddonIns : null;
				}
				else
				{
					if ( !(_oAddonIns = _oDoc.getElementById(_sInsid)) )
					{
						_oAddonIns = _oDoc.createElement('embed');
						_oAddonIns.id = _sInsid;
						_oAddonIns.type = "application/x-tencent-qmail";
						//_oAddonIns.hidden = "true";
						_oAddonIns.setAttribute("hidden", "true");
						_oDoc.body.appendChild(_oAddonIns);
					}
					var _sFun = {	0 : "CreateScreenCapture",
									2 : "CreateUploader",
									4 : "CreateDragDropManager"
								} [_anActivexId];
					if (typeof _oAddonIns[_sFun] != "undefined")
					{
						_oInstance = _oAddonIns[_sFun]();
					}
				}
				if (_oInstance)
				{
					//˳���ȡ����İ汾��
					_oActiveXInfo._moCurVer[_anActivexId] = _oInstance.Version;
				}
			}
			return _oInstance;
		},

		/**
		 *  ����������ûװ���
			@param {Integer} _anPluginId 0, 2, 3, 4 ��ϸ��_oNameMap
			@return {Boolean} �Ƿ�װ�˲��
		 */
		_checkInstallPlugin : function(_anPluginId)
		{
			var _sName = _oActiveXInfo._moPluginName[_anPluginId],
				_bCheckPluginVersion = _anPluginId != 3 && (_sAgent.indexOf("vista") > -1 || /nt 6/gi.test(_sAgent) ),
				_oPlugins	= _oNavigator.plugins;
			if (_oActiveXInfo._mbAble && _oPlugins && _sName )
			{
				for ( var i = _oPlugins.length - 1; i >= 0; i-- )
				{
					if ( _oPlugins[i].name.indexOf( _sName ) != -1 )
					{
						//��vista��window 7�û�����Զ��ֹ����ʹ�õ�һ���汾��FF���
						if ( _bCheckPluginVersion && !_oPlugins[i].description.split('#')[1] )
						{
							//return false;
							continue;
						}
						return true;
					}
				}
			}
			return false;
		}
	};

	_qmActivex._uploader = function(_aoActivex)
	{
		var _oSelf = this;
		_oSelf._moActiveX = _aoActivex;
		_oSelf._moBaseConfig = {};
	};

	_qmActivex._screencapture = function(_aoActivex)
	{
		this._moActiveX = _aoActivex;
	};

	MI.Capture = _qmActivex;

})(window);
MI.Capture.createActiveX = function(type){
	return MI.Capture.getInstance(type)._moActiveX;
}
MI.Capture.enable = MI.Capture.isSupport('screencapture') > 0;
MI.Capture.install = function(){
	UI.ready(function(){
		UI.append(UI.html('<iframe onload="if(MI && MI.dialog)MI.dialog.hide();" src="http://mail.qq.com/cgi-bin/readtemplate?check=false&t=control_install&action=install" style="display:none"></iframe>')[0],document.body);
	});
}
UI.ready(function(){
	if(MI.Capture.enable){
		MI.Capture.screen = MI.Capture.createActiveX('screencapture');
		if (MI.Capture.screen){
			MI.Capture.screen.OnCaptureFinished = function(){
				MI.Capture.screen.BringToFront(window);
				MI.Capture.upload();
			}
		}
		MI.Capture.uploader = MI.Capture.createActiveX('uploader');
		if (MI.Capture.uploader){
			MI.Capture.uploader.URL = 'http://upload.t.qq.com/asyn/uploadpic.php';
			MI.Capture.uploader.CodePage = 65001;
			MI.Capture.uploader.AddHeader('cookie',document.cookie);
			MI.Capture.uploader.OnEvent = function(obj,eventID,p1,p2,p3){
				var percent;
				switch(eventID){
					case 1: //Error
						break;
					case 2: //Progress
						percent = p1 * 100 / p2;
						break;
					case 3: //Finished
						if (MI.talkBox){
							var json = MI.Capture.uploader.Response.replace('parent.MI','MI').replace("'image'","'fileName':MI.Capture.fileName,'image'");
							UI.evalScript(json);
						}
						break;
				}
			}
		}
		MI.Capture.fileName = '';
		MI.Capture.upload = function(){
			if(MI.talkBox && MI.talkBox.pic){
				MI.alert('ÿ���㲥ֻ�ܲ���һ����Ƭ');
				return;
			}
			var clipboardFiles = MI.Capture.uploader.GetClipboardFiles(),fileID;
			if(MI.Capture.screen.IsClipBoardImage){
				fileID = MI.Capture.screen.SaveClipBoardBmpToFile(1);
				MI.Capture.fileName = '����.jpg';
			}
			else if(clipboardFiles){
				var file = clipboardFiles.split(' ');
				fileID = file[0];
				MI.Capture.fileName = clipboardFiles.replace(fileID + ' ','').split('\r')[0];
			}
			if(fileID){
				MI.Capture.uploader.StopUpload();
				MI.Capture.uploader.ClearFormItems();
				MI.Capture.uploader.AddFormItem('pic',1,0,fileID);
				MI.Capture.uploader.StartUpload();
				if(MI.talkBox){
					MI.talkBox.uploadPic();
				}
				MI.Bos('btnPicCapture');
			}
		}
	}
	else if (UI.B.win && (UI.B.ie || UI.B.firefox)){
		//MI.Capture.install();
	}
});