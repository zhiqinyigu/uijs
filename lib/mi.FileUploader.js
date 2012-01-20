/**
 * 附件上传组件
 * 
 * @namespace MI.FileUploader
 * @author dazhao(<a href="mailto:dazhao@tencent.com">dazhao@tencent.com</a>)
 */
MI.FileUploader = (function() {
	var _SERVER = 'dts.weiqun.ftn.qq.com/ftn_handler/';//执行上传的server
	var _MAX_FLASH_CONCURRENCY = 1;//Flash最大并行上传数
	var _MAX_PLUGIN_CONCURRENCY = 3;//Plugin最大并行上传数
	var _MAX_SELECT_FILES = 12;//单次最多选择文件数
	var _MAX_FILE_NAME_LENGTH = 260;//文件名最大长度
	var _MAX_FLASH_UPLOAD_FILE_SIZE = 1024 * 1024 * 1024 - 1;//FLASH允许上传的单个文件最大尺寸
	var _MAX_PLUGIN_UPLOAD_FILE_SIZE = 1024 * 1024 * 1024 - 1;//插件允许上传的单个文件最大尺寸
	var _REQUEST_FOR_UPLOAD = 'http://t.qq.com/air/applyUpload.php';//FLASH申请上传文件的请求地址
	var _FILE_UPLOADER_SWF_URL = 'http://mat1.gtimg.com/www/mb/swf/FileUploader_20110828.swf';//FLASH文件地址
	var _LISTENER_CODE = {//传给回调方法的状态码
		EXCEED_MAX_SELECTION: 1,//超过单次最多选择文件数
		EXCEED_MAX_UPLOAD: 2,//超过最大上传文件个数
		FILE_POSTFIX_NOT_ALLOWED: 3,//文件扩展名不合法
		FILE_NAME_LENGTH_EXCEED_LIMIT: 4,//文件名超长
		FILE_SIZE_EXCEED_SINGLE_LIMIT: 5,//单个文件大小超过限制
		FILE_SIZE_ZERO: 6,//文件大小不能为0
		FILE_SIZE_EXCEED_TOTAL_LIMIT: 7,//上传总大小超过限制
		ADDED_TO_QUEUE: 8,//文件加入上传队列
		START_LOCAL_VERIFY: 9,//开始本地校验
		UPDATE_LOCAL_VERIFY: 10,//更新本地校验进度
		FINISH_LOCAL_VERIFY: 11,//完成本地校验
		FAIL_LOCAL_VERIFY: 12,//本地校验失败
		FAIL_CREATE: 13,//服务器创建文件失败
		START_UPLOAD: 14,//开始上传
		UPDATE_UPLOAD: 15,//更新上传进度
		FINISH_UPLOAD: 16,//上传完毕
		FAIL_UPLOAD: 17,//上传失败
		NOT_LOGIN: 18,//用户未登录
		NO_PRIVILEDGE: 19,//用户无权限上传（黄钻等级不足）
		SPACE_FULL: 20,//用户存储空间已满
		BAD_WORDS: 21,//文件名有脏话,
		CANCEL_UPLOAD: 22,//取消上传
		REMOVE_FILE: 23,//删除文件
		PAUSE_UPLOAD: 24,//暂停上传
		RESUME_UPLOAD_LOCAL: 25,//继续一个被StopUpload中断的上传
		START_RESUME: 26,//开始续传
		NONE: 0
	};
	var _LISTENER_CODE_NAME = (function() {
		var hash = {};
		for(var name in _LISTENER_CODE) {
			hash[_LISTENER_CODE[name]] = name;
		}
		return hash;
	})();
	var _STATUS_CODE = {//文件状态码
		INIT: 0,
		UPLOADING: 1,
		FINISHED: 2,
		FAIL_VERIFY: 3,
		FAIL_CREATE: 4,
		FAIL_UPLOAD: 5,
		CANCELLED: 6
	};
	
	var _count = 0;//文件计数
	var _conf = {
		postfixWhiteList: {
			'3gp': 1,
			'3gp2': 1,
			'3gpp': 1,
			'7z': 1,
			'aac': 1,
			'alx': 1,
			'ape': 1,
			'apk': 1,
			'ass': 1,
			'avi': 1,
			'bmp': 1,
			'caj': 1,
			'cfc': 1,
			'cod': 1,
			'csv': 1,
			'cue': 1,
			'dat': 1,
			'deb': 1,
			'dif': 1,
			'doc': 1,
			'docm': 1,
			'docx': 1,
			'dot': 1,
			'dotx': 1,
			'dwg': 1,
			'eip': 1,//QQ表情包
			'eif': 1,//QQ表情包
			'db': 1,//QQ表情包 数据库文件
			'emf': 1,
			'fif': 1,
			'flac': 1,
			'flv': 1,
			'gif': 1,
			'hlv': 1,
			'htm': 1,
			'html': 1,
			'ifo': 1,
			'ipa': 1,
			'iso': 1,
			'jar': 1,
			'jpeg': 1,
			'jpg': 1,
			'm3u': 1,
			'm4p': 1,
			'm4v': 1,
			'mht': 1,
			'mhtml': 1,
			'mid': 1,
			'midi': 1,
			'mkv': 1,
			'mov': 1,
			'mp3': 1,
			'mp4': 1,
			'mpa': 1,
			'mpe': 1,
			'mpeg': 1,
			'mpeg4': 1,
			'mpg': 1,
			'mrp': 1,
			'pdd': 1,
			'pdf': 1,
			'png': 1,
			'pot': 1,
			'potm': 1,
			'potx': 1,
			'pps': 1,
			'ppsx': 1,
			'ppt': 1,
			'pptm': 1,
			'pptx': 1,
			'psd': 1,
			'pss': 1,
			'pxl': 1,
			'pxr': 1,
			'rar': 1,
			'raw': 1,
			'rm': 1,
			'rmvb': 1,
			'rtf': 1,
			'sis': 1,
			'sisx': 1,
			'srt': 1,
			'ssa': 1,
			'swf': 1,
			'tar': 1,
			'tif': 1,
			'tiff': 1,
			'torrent': 1,
			'txt': 1,
			'vob': 1,
			'vsd': 1,
			'vss': 1,
			'vst': 1,
			'wav': 1,
			'wave': 1,
			'wm': 1,
			'wma': 1,
			'wmf': 1,
			'wmv': 1,
			'wps': 1,
			'wtf': 1,
			'xla': 1,
			'xls': 1,
			'xlsb': 1,
			'xlsm': 1,
			'xlsx': 1,
			'xlt': 1,
			'xltm': 1,
			'xltx': 1,
			'xml': 1,
			'zip': 1,
			'sgs': 1
		}
	};//配置信息
	var _flash = null;//Flash对象
	var _plugin = null;//插件对象
	var _pluginType = null;//插件的类型值
	var _listener = function() {};//上传文件状态监听器
	var _waitQueue = [];//等待上传队列
	var _fileList = {};//所有创建的文件对象总列表，通过fileId进行索引，用于通过fileId找到一个文件对象
	var _uploadList = {};//正在上传或已上传成功的文件对象列表，上传过程中出现异常会从该列表中移除，用户获取所有上传成功的文件对象
	var _localIdFileIdHash = {};//插件localId到fileId的映射
	var _flashIdFileIdHash = {};//FLASH ID到fileId的映射

	/**
	 * 判断是否支持ActiveX
	 * @returns {Boolean}
	 * @private
	 */
	function _isSupportActiveX() {
		return !(typeof ActiveXObject == 'undefined');
	};

	/**
	 * 判断是否是FireFox浏览器
	 * @returns {Boolean}
	 * @private
	 */
	function _isFF() {
		return navigator.userAgent.toLowerCase().indexOf('firefox') >= 0;
	};

	/**
	 * 设置_info信息给fileObject
	 * @param {Object} file
	 * @param {Object} infoObj
	 * @param {Array} pList 需要设置的属性名列表
	 * @private
	 */
	function _setFileInfo(file, infoObj, pList) {
		if(!infoObj || !pList) {
			return;
		}
		file._info = file._info || {};
		for(var i = 0, l = pList.length; i < l; i++) {
			file._info[pList[i]] = infoObj[pList[i]];
		}
	};

	/**
	 * 申请上传文件
	 * @param {Object} file
	 * @private
	 */
	function _requestForUpload(file) {
		file._verifiedBytes = file.fileSize;
		_listener(_LISTENER_CODE['FINISH_LOCAL_VERIFY'], file);
		
		// if(_conf.server && file.via == 'PLUGIN') {//通过插件创建
			// _localIdFileIdHash[file._info.LocalID = _plugin.Mail_CreateFile(
				// _conf.uin, _conf.cookie, _conf.skey, _conf.server, _conf.port,
				// file.localPath, file._info.Md5, file._info.SHA, file._info.SHA3, file.fileId
			// )] = file.fileId;
// 
		// } else {//通过CGI创建
			MI.ajax({
				url : _REQUEST_FOR_UPLOAD,
				type:'post',
				data : {
					prdid: _conf.prdid,
					appid: _conf.appid,
					qid: _conf.qid,
					g_tk: _conf.antiCsrfToken,
					uin: _conf.uin,
					ftype: file.type,
					name: file.fileName,
					size: file.fileSize,
					md5: file._info.Md5 || '',
					sha: file._info.SHA || '',
					path: file.localPath,
					utype: file.utype || 0,//缺省0-申请上传,1-申请续传
					fkey: file.fkey || '',
					_t: +new Date
				},
				success: function(data) {
					file = _getFile(file.fileId);
					if(!file) {
						return;
					}
					
					//example data
					//data = '{"result":0,"msg":"\u6210\u529f","info":{"ret":0,"file_exist":1,"server_ip":"113.142.8.120","file_path":"\/3c4fa641-d724-48f1-985e-a7ec057116d6","file_key":"89E60D2E30C5A166F36F0A22E2238466F2132B6B","check_key":"2ab58c066e4b56e091c530143215c150b6bc3d0ad67e55c68de218a5393ebeabff1e39d35dbc86d6b1a8df4a3322d64493951f55f8ef202183d468ffba69b1df797b1b3854d48c59afe7e09a128edaa1b314c385d6e7527aba5769e0f0ad28f4c050d02a7b3c17af7ee2ba5168d8cb29fd86c7a1c243ea66a63ae96d3b7aea69b1c8176807eb099f4dd9e9f49bfc5e7da3d6309bdaad1624c3fa0db143d3986b30edca07682f75ffb2ce75ef6126aa9f0f764d24de5a76188e888bedf225ed065545b133f734658e9047d813b6c1e85c7cb7fda003819c413c4cfb6acc05b8f192432ea5d126c40e67b4a847dd4a64c4a359db115da5a240fb2fbbfdfcacf678049bb7280489394f5597cd806292ed7b0dc07c5a77ee26b6f53fbf786dba0731affb36c94b4adeb666acadb3bd2fc3c2"}}';
					
					data = MI.json(data);
					if(!data || data.result !== 0) {
						file.errorMsg = data.msg || '';
						_onError(_LISTENER_CODE['FAIL_CREATE'], file, _STATUS_CODE['FAIL_CREATE']);
						return;
					}
					
					var info = data.info;
					// console.dir(info);

					switch(info.ret) {
					case 0:
						info.file_path = (function() {
							var tmp = info.file_path.split('/');
							tmp[1] = tmp[1].substr(0, 36);
							return tmp.join('/');
						})();
						_setFileInfo(file, info, ['server_ip', 'check_key', 'file_path', 'file_key', 'ttl']);
						if(file.via == 'PLUGIN') {
							file.startTime = +new Date();
							// console.log(file);
							// console.log(info);
							if(!file.utype) {//新上传
								_localIdFileIdHash[file._info.LocalID = _plugin.UploadFile(info.server_ip, _conf.port, info.check_key, file._info.SHA, info.file_path, file.localPath, file.fileId)] = file.fileId;
								_listener(_LISTENER_CODE['START_UPLOAD'], file);
							} else {//续传
								_localIdFileIdHash[file._info.LocalID = _plugin.ResumeFile(info.server_ip, _conf.port, info.check_key, file._info.SHA, info.file_path, file.localPath, file.fileId, info.offset || 0)] = file.fileId;
								_listener(_LISTENER_CODE['START_RESUME'], file);
							}
						} else {
							_uploadViaFlash(file, info.server_ip, _conf.port, info.file_key, info.check_key);
						}
						break;
					case 1002:
						_onError(_LISTENER_CODE['NOT_LOGIN'], file, _STATUS_CODE['FAIL_CREATE']);
						break;
					case 3012:
						_onError(_LISTENER_CODE['NO_PRIVILEDGE'], file, _STATUS_CODE['FAIL_CREATE']);
						break;
					case 3013:
						_onError(_LISTENER_CODE['SPACE_FULL'], file, _STATUS_CODE['FAIL_CREATE']);
						break;
					case 3021:
						_onError(_LISTENER_CODE['BAD_WORDS'], file, _STATUS_CODE['FAIL_CREATE']);
						break;
					case 3002:
						_onError(_LISTENER_CODE['FILE_NAME_LENGTH_EXCEED_LIMIT'], file, _STATUS_CODE['FAIL_CREATE']);
						break;
					case 3003:
					case 3004:
						_onError(_LISTENER_CODE['FILE_POSTFIX_NOT_ALLOWED'], file, _STATUS_CODE['FAIL_CREATE']);
						break;
					case 3005:
						_onError(_LISTENER_CODE['FILE_SIZE_EXCEED_SINGLE_LIMIT'], file, _STATUS_CODE['FAIL_CREATE']);
						break;
					default:
						file.errorMsg = data.msg || '';
						_onError(_LISTENER_CODE['FAIL_CREATE'], file, _STATUS_CODE['FAIL_CREATE']);
					}
				},
				fail: function() {
					file = _getFile(file.fileId);
					if(!file) {
						return;
					}
					_onError(_LISTENER_CODE['FAIL_CREATE'], file, _STATUS_CODE['FAIL_CREATE']);					
				}
           	});
		// }
	};
	
	/**
	 * 上报上传结果
	 * @param {Object} file
	 * @param {String} res 结果，success|fail|cancel
	 * @param {Function} callback 回调方法
	 * @private
	 */
	function _reportUploadRes(file, res, callback) {
		_conf.formSender({
			url: 'http://fj.qzone.qq.com/cgi-bin/cgi_upload_report',
			param: {
				prdid: _conf.prdid,
				appid: _conf.appid,
				g_tk: _conf.antiCsrfToken,
				uin: _conf.uin,
				path: file._info.file_path,
				postfix: file.fileName.split('.').pop(),
				upload: res
			},
			onSuccess: function(info) {
				callback && callback(info.ret);
				if(info.ret !== 0) {
					_onError(_LISTENER_CODE['FAIL_UPLOAD'], file, _STATUS_CODE['FAIL_UPLOAD']);
				}
			},
			onError: function() {
				callback && callback(1);
				_onError(_LISTENER_CODE['FAIL_UPLOAD'], file, _STATUS_CODE['FAIL_UPLOAD']);
			}
		});
	};
	
	/**
	 * 处理插件回调的方法
	 * @param {Object} info
	 * @private
	 */
	function _pluginEventListener(info) {
		var file = _getFile(_localIdFileIdHash[info.LocalID]);
		if(!file) {
			return;
		}
		//console.log(['PLUGIN', info.EventType, file.fileName, info.ErrorCode, info.Step].join(', '));
		switch(info.EventType) {
		case 1:
			_pluginReleaseLocal(info.LocalID);
			if(info.ErrorCode !== 0 || info.Step !== 0) {
				_onError(_LISTENER_CODE['FAIL_LOCAL_VERIFY'], file, _STATUS_CODE['FAIL_VERIFY']);
				return;
			} else {
				//如果选择的续传文件已经不是原来的文件，那么重新上传新文件
				if(file.sha && file.sha !== info.SHA) {
					file.utype = 0;
					file.fkey = '';
				}
				_setFileInfo(file, info, ['Md5', 'SHA', 'SHA3', 'LocalID']);
				_requestForUpload(file);
			}
			break;
		case 2:
			if(file._verifiedBytes == info.Processed) {
				return;
			}
			file._verifiedBytes = info.Processed;
			_listener(_LISTENER_CODE['UPDATE_LOCAL_VERIFY'], file, {percent: info.Processed / info.FileSize});
			break;
		case 3:
			_pluginReleaseLocal(info.LocalID);
			if(info.ErrorCode !== 0 || info.Step !== 0) {
				_onError(_LISTENER_CODE['FAIL_UPLOAD'], file, _STATUS_CODE['FAIL_UPLOAD']);
				/*_reportUploadRes(file, 'fail');*/
			} else {
				/*
				_reportUploadRes(file, 'success', function(ret) {
									if(ret === 0) {
										file.serverPath = file._info.file_path || file._info.FileIndex;
										_onSuccess(file);
									}
								});*/
				file.serverPath = file._info.file_path || file._info.FileIndex;
				_onSuccess(file);
				
			}
			break;
		case 4:
			if(file._uploadedBytes == info.Processed) {
				return;
			}
			file._uploadedBytes = info.Processed;
			_listener(_LISTENER_CODE['UPDATE_UPLOAD'], file, {percent: info.Processed / info.FileSize, processed: info.Processed});
			break;
		case 5:
			_pluginReleaseLocal(info.LocalID);
			if(info.ErrorCode !== 0 || info.Step !== 0) {
				_onError(_LISTENER_CODE['FAIL_CREATE'], file, _STATUS_CODE['FAIL_CREATE']);
				//debugger;
			} else {
				info.FileIndex = (function() {
					var tmp = info.FileIndex.split('/');
					tmp[1] = tmp[1].substr(0, 36);
					return tmp.join('/');
				})();
				_setFileInfo(file, info, ['SHA', 'OCServer', 'OCPort', 'SvrKey', 'FileIndex', 'LocalID']);
				file.startTime = +new Date();
				_localIdFileIdHash[file._info.LocalID = _plugin.UploadFile(info.OCServer, info.OCPort, info.SvrKey, info.SHA, info.FileIndex, info.Path, file.fileId)] = file.fileId;
				_listener(_LISTENER_CODE['START_UPLOAD'], file);
			}
			break;
		default:
		}
	};

	/**
	 * 上传成功的处理方法
	 * @param {Object} file
	 * @private
	 */
	function _onSuccess(file) {
		file._uploadedBytes = file.fileSize;
		file.status = _STATUS_CODE['FINISHED'];
		_listener(_LISTENER_CODE['FINISH_UPLOAD'], file);
		_checkWaitQueue();
	};

	/**
	 * 上传出错的处理方法
	 * @param {Number} code 错误代码
	 * @param {Object} file
	 * @param {Number} status 出错后给文件设置的状态
	 * @private
	 */
	function _onError(code, file, status) {
		file.status = status;
		delete _uploadList[file.fileId];
		_listener(code, file);
		_checkWaitQueue();
	};

	/**
	 * 释放插件处理异步方法的对象
	 * @param {Number} localId 插件为文件分配的LocalID
	 * @private
	 */
	function _pluginReleaseLocal(localId) {
		_plugin.ReleaseLocal(localId);
		delete _localIdFileIdHash[localId];
	};
	
	/**
	 * 生成标识上传文件的唯一ID，该ID用于标识一个上传周期中的文件，还用于生成插件标识文件的LocalID。
	 * @return {Number} fileId
	 * @private
	 */
	function genFileId() {
		return +(Math.round(Math.random() * 10000).toString() + new Date().getMilliseconds());
	};

	/**
	 * 创建文件信息对象
	 * @param {Number} type 存储类型，0-临时存储，1-永久存储
	 * @param {String} via 上传方式，'PLUGIN'，'FLASH'
	 * @param {String} localPath 本地路径
	 * @param {Number} fileSize 文件大小
	 * @param {Number} oldId 使用已经存在的ID进行替换
	 * @returns {Object}
	 * @private
	 */
	function _createFileObject(type, via, localPath, fileSize, oldId) {
		var file = {
			_uin: _conf.uin,
			_verifiedBytes: 0,
			_uploadedBytes: 0,
			index: _count++,//文件在列表中的顺序
			type: type ? type : 0,//0-临时存储，1-永久存储
			via: via,
			status: _STATUS_CODE['INIT'],
			fileId: genFileId(),
			localPath: localPath,
			fileName: localPath.split('\\').pop(),
			fileSize: fileSize,//bytes
			startTime: 0,//开始上传的时间
			_info: {}//验证信息
		};
		var oldFile = _fileList[oldId];
		if(oldFile) {
			file.fileId = oldId;
		}
		_fileList[file.fileId] = file;
		return file;
	};

	/**
	 * 获取文件
	 * @param {Number} id
	 * @return {Object}
	 * @private
	 */
	function _getFile(fileId) {
		return _fileList[fileId];
	};

	/**
	 * @param {String} via 上传方式，'FORM'、'FLASH'、'PLUGIN'
	 * @private
	 */
	function _getUploadingCountByVia(via) {
		var count = 0;
		var list = _uploadList;
		for(var fileId in list) {
			if(list[fileId].status == _STATUS_CODE['UPLOADING'] && list[fileId].via == via) {
				count++;
			}
		}
		return count;
	};

	/**
	 * 通过FLASH上传
	 * @param {Object} file
	 * @private
	 */
	function _uploadViaFlash(file, server, port, fileKey, checkKey) {
		if(checkKey) {
			//console.log([file._info.flashId, server, port, fileKey, checkKey, _conf.uin, _conf.skey].join(', '));
			file.status = _STATUS_CODE['UPLOADING'];
			_uploadList[file.fileId] = file;
			file.startTime = +new Date();
			_flash.uploadFile(file._info.flashId, _conf.server, _conf.port, fileKey, checkKey, {mode: 'flashupload', resp_charset: 'UTF-8', uin: _conf.uin, appid: _conf.appid, t: 'exs_ftn_uploadaction'});
			_listener(_LISTENER_CODE['START_UPLOAD'], file);
		} else {
			_requestForUpload(file);
		}
	};

	/**
	 * 通过PLUGIN上传
	 * @param {Object} file
	 * @private
	 */
	function _uploadViaPlugin(file) {
		var localId;
		if(!file || _uploadList[file.fileId]) {
			return;
		}
		file.status = _STATUS_CODE['UPLOADING'];
		_uploadList[file.fileId] = file;
		_listener(_LISTENER_CODE['START_LOCAL_VERIFY'], file);
		localId = _plugin.FileSign(file.localPath, file.fileId);
		_localIdFileIdHash[localId] = file.fileId;
		file._info.LocalID = localId;
		file.startTime = +new Date();
	};

	/**
	 * 加入等待上传队列
	 * @private
	 */
	function _addToWaitQueue() {
		var list = Array.prototype.slice.call(arguments);
		for(var i = 0, l = list.length; i < l; i++) {
			_waitQueue.push(list[i]);
			_listener(_LISTENER_CODE['ADDED_TO_QUEUE'], _fileList[list[i]]);
		}
		_checkWaitQueue();
	};
	
	/**
	 * 检查等待队列中是否有可以开始上传的文件，每当有文件完成/取消上传或新文件加入队列之后，都要执行该方法。
	 * @private
	 */
	function _checkWaitQueue() {
		var file, count;
		file = _getFile(_waitQueue.shift());
		if(!file || _uploadList[file.fileId]) {
			return;
		}
		count = _getUploadingCountByVia(file.via);
		//console.log(file.via + ' ' + count + ' uploading');
		switch(file.via) {
		case 'FLASH':
			if(count >= _conf.flashConcurrency) {
				_waitQueue.unshift(file.fileId);
				return;
			}
			_uploadViaFlash(file);
			break;
		case 'PLUGIN':
			if(count >= _conf.pluginConcurrency) {
				_waitQueue.unshift(file.fileId);
				return;
			}
			_uploadViaPlugin(file);
			break;
		default:
		}
		_checkWaitQueue();
	};

	/**
	 * 获取当前上传文件数目（包括已上传、正在上传和等待上传）
	 * @private
	 */
	function _getCurUploadCount() {
		var count = 0;
		for(var p in _uploadList) {
			count++;
		}
		count += _waitQueue.length;
		return count;
	};

	/**
	 * 获取当前上传文件总大小（包括已上传、正在上传和等待上传）
	 * @private
	 */
	function _getCurUploadTotalSize() {
		var size = 0;
		for(var p in _uploadList) {
			size += _uploadList[p].fileSize;
		}
		for(var i = 0, l = _waitQueue.length; i < l; i++) {
			size += _fileList[_waitQueue[i]].fileSize;
		}
		return size;
	};
	
	/**
	 * 验证选择文件的数量、总大小是否超过限制
	 * @param {Number} count 选择的数目
	 * @param {Number} totalSize 总大小
	 * @param {Number} fileId
	 * @returns {Number} 0-验证通过，1-验证不通过
	 * @private
	 */
	function _validateSelection(count, totalSize, fileId) {
		var maxSelection = fileId ? 1 : _conf.selectionLimit;
		if(_conf.totalUploadLimit && count + _getCurUploadCount() > _conf.totalUploadLimit) {
			_listener(_LISTENER_CODE['EXCEED_MAX_UPLOAD'], _conf.totalUploadLimit);
			return 1;
		}
		if(count > maxSelection) {
			_listener(_LISTENER_CODE['EXCEED_MAX_SELECTION'], count, maxSelection);
			return 1;
		}
		if(!_conf.isResume && _conf.totalSizeLimit && totalSize + _getCurUploadTotalSize() > _conf.totalSizeLimit) {
			_listener(_LISTENER_CODE['FILE_SIZE_EXCEED_TOTAL_LIMIT'], totalSize + _getCurUploadTotalSize(), _conf.totalSizeLimit);
			return 1;
		}
		return 0;
	};

	/**
	 * 验证选择的单个文件是否合法
	 * @param {Object} file
	 * @returns {Number} 0-合法，1-不合法
	 * @private
	 */
	function _validateFile(file) {
		var singleSizeLimit = Math.min(_conf.singleSizeLimit, file.via == 'PLUGIN' ? _MAX_PLUGIN_UPLOAD_FILE_SIZE : _MAX_FLASH_UPLOAD_FILE_SIZE);
		if(!_conf.postfixWhiteList[file.fileName.split('.').pop().toLowerCase()]) {
			file.status = _STATUS_CODE.FAIL_VERIFY;
			_listener(_LISTENER_CODE['FILE_POSTFIX_NOT_ALLOWED'], file);
			return 1;
		}
		if(file.fileName.replace(/[^\x00-\xff]/g, 'xx').length > _MAX_FILE_NAME_LENGTH) {
			file.status = _STATUS_CODE.FAIL_VERIFY;
			_listener(_LISTENER_CODE['FILE_NAME_LENGTH_EXCEED_LIMIT'], file, _MAX_FILE_NAME_LENGTH);
			return 1;
		} else if(file.fileSize > singleSizeLimit) {
			file.status = _STATUS_CODE.FAIL_VERIFY;
			_listener(_LISTENER_CODE['FILE_SIZE_EXCEED_SINGLE_LIMIT'], file, singleSizeLimit);
			return 1;
		} else if(file.fileSize === 0) {
			file.status = _STATUS_CODE.FAIL_VERIFY;
			_listener(_LISTENER_CODE['FILE_SIZE_ZERO'], file);
			return 1;
		}
		return 0;
	};

	/**
	 * 通过插件选择多个文件进行上传
	 * @param {Number} type 存储方式，1-群临时 2-群永久 3-个人临时 4-个人永久
	 * @param {Number} fileId 指定一个被取代的出错的文件ID
	 * @private
	 */
	function _selectFileByPlugin(type, fileId) {
		var i, l,  via, file, files, filePath, fileName, tmpWaitQueue, totalSize, maxSelection;
		via = 'PLUGIN';
		MI.Bos('btnFileUploadBtn');
		files = _plugin.SelectFiles(window);
		if(!files) {
			return 1;
		}
		files = files.split('\r\n');
		files.pop();//去掉最后一个空元素
		totalSize = 0;
		for(i = 0, l = files.length; i < l; i++) {
			if(typeof _plugin.GetFileSizeString != 'undefined') {
				totalSize += Math.abs(_plugin.GetFileSizeString(files[i]));
			} else {
				totalSize += Math.abs(_plugin.GetFileSize(files[i]));
			}
		}
		if(_validateSelection(files.length, totalSize, fileId) !== 0) {
			return 1;
		}
		tmpWaitQueue = [];
		for(i = 0, l = files.length; i < l; i++) {
			filePath = files[i];
			if(typeof _plugin.GetFileSizeString != 'undefined') {
				fileSize = Math.abs(_plugin.GetFileSizeString(filePath));
			} else {
				fileSize = Math.abs(_plugin.GetFileSize(filePath));
			}
			file = _createFileObject(type, via, filePath, fileSize, fileId);
			if(_validateFile(file) === 0) {
				tmpWaitQueue.push(file.fileId);
			}
			if(fileId) {
				break;
			}
		}
		_addToWaitQueue.apply(this, tmpWaitQueue);
		return 0;
	};

	/**
	 * 通过插件续传一个文件
	 * @param {Number} type 存储方式，1-群临时 2-群永久 3-个人临时 4-个人永久
	 * @param {String} localPath 文件的本地路径
	 * @param {String} fkey 文件在服务器上的索引
	 * @param {String} sha 文件的SHA值
	 */
	function resumeFileByPlugin(type, localPath, fkey, sha) {
		var i, l,  via, file, files, tmpWaitQueue, totalSize, maxSelection;
		via = 'PLUGIN';
		if(!localPath) {
			MI.Bos('btnFileUploadBtn');
			files = _plugin.SelectFiles(window);
			files = files.split('\r\n');
			localPath = files.shift();
		}
		if(typeof _plugin.GetFileSizeString != 'undefined') {
			totalSize = Math.abs(_plugin.GetFileSizeString(localPath));
		} else {
			totalSize = Math.abs(_plugin.GetFileSize(localPath));
		}
		if(_validateSelection(1, totalSize) !== 0) {
			return 1;
		}
		tmpWaitQueue = [];
		if(typeof _plugin.GetFileSizeString != 'undefined') {
			fileSize = Math.abs(_plugin.GetFileSizeString(localPath));
		} else {
			fileSize = Math.abs(_plugin.GetFileSize(localPath));
		}
		file = _createFileObject(type, via, localPath, fileSize);
		file.utype = 1;//设置文件为续传文件
		file.fkey = fkey;//设置文件的唯一索引
		file.sha = sha;
		if(_validateFile(file) === 0) {
			tmpWaitQueue.push(file.fileId);
		}
		_addToWaitQueue.apply(this, tmpWaitQueue);
		return 0;
	};
	
	/**
	 * 通过Flash选择多个文件进行上传
	 * @param {Number} type 存储方式，0-临时存储，1-永久存储
	 * @param {Number} fileId 指定一个被取代的出错的文件ID
	 * @private
	 */
	function _selectFileByFlash(type, files) {
		MI.Bos('btnFileUploadBtn');
		var i, l, via, file, filePath, tmpWaitQueue, totalSize;
		via = 'FLASH';
		if(!files || !files.length) {
			return 1;
		}
		totalSize = 0;
		for(i = 0, l = files.length; i < l; i++) {
			totalSize += +files[i].size;
		}
		if(_validateSelection(files.length, totalSize) !== 0) {
			return 1;
		}
		tmpWaitQueue = [];
		for(i = 0, l = files.length; i < l; i++) {
			filePath = files[i].name;
			fileSize = +files[i].size;
			file = _createFileObject(type, via, filePath, fileSize);
			if(_validateFile(file) === 0) {
				tmpWaitQueue.push(file.fileId);
				file._info.flashId = files[i].id;
				_flashIdFileIdHash[files[i].id] = file.fileId;
			}
		}
		_addToWaitQueue.apply(this, tmpWaitQueue);
		return 0;
	};
	
	/**
	 * 选择文件
	 * @param {Number} type 存储类型，0-临时存储，1-永久存储
	 * @param {Number} fileId 要进行替换的文件ID
	 * @returns {Number} 0-成功，1-异常
	 */
	function selectFile(type, fileId) {
		if(initPlugin() !== 0) {
			return 1;
		}
		return _selectFileByPlugin(type, fileId);
	};

	/**
	 * 对出错的文件进行重试
	 * @param {Number} fileId 文件ID
	 * @returns {Number} 0-重试成功（不代表上传成功），1-重试出错
	 */
	function retry(fileId) {
		var file = _getFile(fileId);
		if(!file || _uploadList[fileId]) {
			return 1;
		}
		_addToWaitQueue(fileId);
		return 0;
	};

	/**
	 * 检查是否安装了V10以上版本的Flash
	 * @return {Boolean}
	 */
	function hasFlash() {
		var o, v;
		if(_isSupportActiveX()) {
			try {
				new ActiveXObject('ShockwaveFlash.ShockwaveFlash.10');
			} catch(e) {
				return false;
			}
		} else if(!(o = navigator.plugins['Shockwave Flash'])) {
			return false;
		} else {
			v = o.description.match(/(?:\d+\.)*\d+/);
			if(!v || +v[0].split('.')[0] < 10) {
				return false;
			}
		}
		return true;
	};

	/**
	 * 检查是否安装了插件
	 * @return {Boolean}
	 */
	function hasPlugin() {
		var p;
		if(_isSupportActiveX()) {
			try {
				new ActiveXObject('TXFTNActiveX.FTNUpload');
			} catch(e) {
				return false;
			}
		} else {
			p = navigator.plugins['Tencent FTN plug-in'];
			if(!p || _isFF() && (p[0].type != 'application/txftn' && p[0].type != 'application/txftn-webkit') || !_isFF() && p[0].type != 'application/txftn-webkit') {
				return false;
			}
			_pluginType = p[0].type;
		}
		return true;
	};

	/**
	 * FLASH事件处理方法
	 * @param {Number} code 事件代码
	 * @param {Object} opt 数据
	 * @private
	 */
	function flashEventListener(code, opt) {
		// console.dir(code);
		// console.dir(opt);
		var file = _getFile(_flashIdFileIdHash[opt && opt.id]);
		var res;
		code = parseInt(code);
		if(!file && code > 2) {
			return;
		}
		switch(code) {
		case 0://FLASH初始化完毕
			break;
		case 1://选择文件
			_selectFileByFlash(_conf.storeType, opt);
			break;
		case 2://计算SHA，MD5结果
			break;
		case 3://更新上传进度
			if(file._uploadedBytes == opt.processed) {
				return;
			}
			file._uploadedBytes = opt.processed;
			//_listener(_LISTENER_CODE['UPDATE_UPLOAD'], file, opt.processed / file.fileSize);
			opt.percent = opt.processed / file.fileSize
			_listener(_LISTENER_CODE['UPDATE_UPLOAD'], file, opt);
			break;
		case 4://上传成功
			res = opt.res.match(/ftn_post_end\((\-?\d+)\)/);
			if(res && parseInt(res[1]) === 0) {
/*
				_reportUploadRes(file, 'success', function(ret) {
					if(ret === 0) {
						file.serverPath = file._info.file_path;
						_onSuccess(file);
					}
				});
*/
				file.serverPath = file._info.file_path;
				_onSuccess(file);
			} else {
				_onError(_LISTENER_CODE['FAIL_UPLOAD'], file, _STATUS_CODE['FAIL_UPLOAD']);
				//_reportUploadRes(file, 'fail');
			}
			break;
		case 5://上传失败
			_onError(_LISTENER_CODE['FAIL_UPLOAD'], file, _STATUS_CODE['FAIL_UPLOAD']);
			//_reportUploadRes(file, 'fail');
			break;
		default:
		}
	};
	
	/**
	 * 初始化Flash
	 * @param {DOMObject} holder 放置FLASH按钮的holder
	 * @param {Number} width 按钮宽度（px）
	 * @param {Nnumber} height 按钮高度（px）
	 * @param {Number} mode 0-单选，1-多选
	 * @returns {Number} 0-初始化成功，1-初始化失败
	 */
	function initFlash(holder, width, height, mode) {
		if(_flash) {
			return 0;
		}
		if(!hasFlash()) {
			return 1;
		}
		var isIe = _isSupportActiveX();
		var url = _FILE_UPLOADER_SWF_URL;
		holder.innerHTML = [
			'<object id="swfFileUploader"' + (isIe ? '' : ' data="' + url + '"') + ' width="' + width + 'px" height="' + height + 'px" ' + (isIe ? 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' : 'type="application/x-shockwave-flash"') + '>',
				isIe ? '<param name="movie" value="' + url + '"/>' : '',
				'<param name="allowScriptAccess" value="always" />',
				'<param name="allownetworking" value="all" />',
				'<param name="wmode" value="transparent" />',
				'<param name="flashVars" value="callback=MI.FileUploader.flashEventListener&selectionMode=' + (_conf.selectionLimit > 1 || mode === 1 ? 1 : 0) + '" />',
				'<param name="menu" value="false" />',
			'</object>'
		].join('');
		_flash = document.getElementById('swfFileUploader');
		return 0;
	};
	
	/**
	 * 初始化插件
	 * @returns {Number} 0-初始化成功，1-初始化失败
	 */
	function initPlugin() {
		if(_plugin) {
			return 0;
		}
		if(!hasPlugin()) {
			return 1;
		}
		if(_isSupportActiveX()) {
			_plugin = new ActiveXObject('TXFTNActiveX.FTNUpload');
		} else {
			_plugin = document.createElement('embed');
			_plugin.width = 0;
			_plugin.height = 0;
			_plugin.type = _pluginType;
			_plugin = document.body.appendChild(_plugin);
		}
		_plugin.OnEvent = _pluginEventListener;
		_plugin.RetryTime = 20;
		_plugin.BlockSize = 128 * 1024;
		_plugin.TimeOut = 90 * 1000;
		_plugin.BreakSize = 64 * 1024;
		_plugin.MaxConcurrentUploadNum = _MAX_PLUGIN_CONCURRENCY;
		return 0;
	};
	
	/**
	 * 这是配置信息，使用该组件之前必须先进行配置。
	 * @param {Object} conf 配置信息对象，描述如下： <br />
	 * { <br />
	 *     prdid: {Number},//产品ID，空间-0，朋友-6
	 *     appid: {Nunber},//应用的ID，空间日志/朋友日志-1，空间说说/朋友说说-2, required <br />
	 *     uin: {Number},//登录用户的UIN, required <br />
	 *     skey: {String},//Session Key, required <br />
	 *     antiCsrfToken: {String},//反CSRF攻击TOKEN, required <br />
	 *     jsonGetter: {Function},//required <br />
	 *          &nbsp;&nbsp;&nbsp;&nbsp;//jsonGetter({url: {String}, param: {Object}, onSuccess: {Function}, onError: {Function}, <br />
	 *          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//callbackName: {String}}); <br />
	 *     formSender: {Function},//required <br />
	 *          &nbsp;&nbsp;&nbsp;&nbsp;//formSender({url: {String}, param: {Object}, onSuccess: {Function}, onError: {Function}}); <br />
	 *     cookie: {String},//页面的cookie, required <br />
	 *     listener: {Function}//监听上传事件的方法, required <br />
	 *     server: {String},//执行上传的server <br />
	 *     port: {Number},//上传server的端口，默认80端口 <br />
	 *     selectionLimit: {Number},//单次选择文件个数限制 <br />
	 *     singleSizeLimit: {Number},//上传单个文件大小限制，默认1G <br />
	 *     totalSizeLimit: {Number},//上传文件总大小限制，默认无限制 <br />
	 *     totalUploadLimit: {Number},//允许上传文件数 <br />
	 *     flashConcurrency: {Number},//Flash最大并发上传数 <br />
	 *     pluginConcurrency: {Number},//Plugin最大并发上传数 <br />
	 *     postfixWhiteList: {Object},//文件后缀名白名单 <br />
	 *     storeType: {Number},//文件存储类型，1-群临时 2-群永久 3-个人临时 4-个人永久，默认2
	 * 	   qid: {String},//群id
	 * }
	 */
	function config(conf) {
		for(var p in conf) {
			_conf[p] = conf[p];
		}
		_conf.uin = +_conf.uin || 0;
		_conf.qid = _conf.qid || 0;
		_conf.skey = _conf.skey || '';
		_conf.cookie = document.cookie;
		_conf.server = _conf.server || _SERVER;
		_conf.port = _conf.port || 80;
		_conf.selectionLimit = _conf.selectionLimit || _MAX_SELECT_FILES;
		_conf.singleSizeLimit = _conf.singleSizeLimit || _MAX_PLUGIN_UPLOAD_FILE_SIZE;
		_conf.flashConcurrency = _conf.flashConcurrency || _MAX_FLASH_CONCURRENCY;
		_conf.pluginConcurrency = _conf.pluginConcurrency || _MAX_PLUGIN_CONCURRENCY;
		_conf.storeType = _conf.storeType || 2;
		_listener = _conf.listener || _listener;
	};
	
	/**
	 * 设置配置信息
	 */
	function setConfig(conf) {
		for(var p in conf) {
			_conf[p] = conf[p];
		}
	}

	/**
	 * 重设数据，以便开始新一轮上传
	 */
	function reset() {
		_count = 0;
		_fileList = {};
		_uploadList = {};
		_waitQueue = [];
	};
	
	/**
	 * 获取可上传的扩展名白名单
	 * @returns {Array}
	 */
	function getPostfixWhiteList() {
		var list = [];
		for(var item in _conf.postfixWhiteList) {
			list.push(item);
		}
		return list;
	};

	/**
	 * 获取上传列表（包括已上传、正在上传和等待上传的文件对象）
	 * @returns {Object}
	 */
	function getUploadList() {
		var list = {};
		for(var p in _uploadList) {
			list[p] = _uploadList[p];
		}
		for(var i = 0, l = _waitQueue.length; i < l; i++) {
			list[_waitQueue[i]] = _fileList[_waitQueue[i]];
		}
		return list;
	};

	/**
	 * 按照fileId移除文件
	 * @param {Number} fileId
	 * @returns {Number} 0-成功，1-失败
	 */
	function removeFileById(fileId) {
		var file = _getFile(fileId);
		if(!file) {
			return 1;
		}
		if(file.status == _STATUS_CODE['UPLOADING']) {
			if(file.via == 'PLUGIN') {
				_plugin.StopUpload(file._info.LocalID);
			} else {
				// TODO
			}
		}
		delete _fileList[fileId];
		delete _uploadList[fileId];
		_listener(_LISTENER_CODE[file.status == _STATUS_CODE['FINISHED'] ? 'REMOVE_FILE' : 'CANCEL_UPLOAD'], file);
		return 0;
	};
	
	/**
	 * 按照fileId暂停上传文件，仅支持插件上传方式
	 * @param {Number} fileId
	 * @returns {Number} 0-成功，1-失败
	 */
	function pauseFileById(fileId) {
		var file = _getFile(fileId);
		if(!file) {
			return 1;
		}
		_plugin.StopUpload(file._info.LocalID);
		_listener(_LISTENER_CODE['PAUSE_UPLOAD'], file);
		return 0;
	};
	
	/**
	 * 按照fileId继续上传文件，仅支持插件上传方式
	 * @param {Number} fileId
	 * @returns {Number} 0-成功，1-失败
	 */
	function resumeFileLocalById(fileId) {
		var file = _getFile(fileId);
		if(!file) {
			return 1;
		}
		_plugin.ResumeFileLocal(file._info.LocalID);
		_listener(_LISTENER_CODE['RESUME_UPLOAD_LOCAL'], file);
		return 0;
	};

	/**
	 * 判断当前浏览环境是否支持上传插件
	 * @returns {boolean}
	 */
	function isSupportPlugin() {
		function uaHas(str) {
			return ua.indexOf(str) >= 0;
		};
		var ua = navigator.userAgent.toLowerCase();
		var isWin = uaHas('windows') || uaHas('win32');
		var isWebkit = uaHas('applewebkit');
		var isKhtml = uaHas('khtml') || uaHas('konqueror') || isWebkit;
		var isFf = uaHas('gecko') && !isKhtml;
		var isChrome = isWebkit && uaHas('chrome');
		var isSafari = isWebkit && !isChrome;
		var isOpera = uaHas('opera');
		var isIe = uaHas('msie');
		var chromeVer = (/chrome\/((?:\d|\.)+)/).test(ua) && RegExp.$1.split('.');
		var ffVer = (/firefox\/((?:\d|\.)+)/).test(ua) && RegExp.$1.split('.');
		var isQbWebkit = isWebkit && navigator.appVersion.toLowerCase().indexOf('qqbrowser') >= 0;
		return isWin && (isFf && ffVer[0] >= 3 && (ffVer[1] > 0 || ffVer[2] >= 8 || navigator.buildID.substr(0, 8) >= 20090701)
						|| isChrome && chromeVer[0] >= 6
						|| isSafari
						|| isOpera
						|| isIe
						|| isQbWebkit);
	};

	/**
	 * 获取文件下载URL，callback(ret {Number}, url {String});
	 * @param {Number} uin 登录用户UIN
	 * @param {Number} oUin 文件上传用户UIN
	 * @param {String} path 文件server路径
	 * @param {String} fileName 文件名
	 * @param {Function} callback
	 * @param {Number} prdid 产品的ID，如调用方法前未进行config则此参数必须传
	 * @param {Number} appid 应用的ID，如调用方法前未进行config则此参数必须传
	 */
	function getDownloadUrl(uin, oUin, path, fileName, callback, prdid, appid) {
		_conf.jsonGetter({
			url: 'http://fj.qzone.qq.com/cgi-bin/cgi_download_req',
			param: {
				uin: uin,
				ouin: oUin,
				path: path,
				name: fileName,
				postfix: fileName.split('.').pop(),
				prdid: prdid || _conf.prdid,
				appid: appid || _conf.appid
			},
			onSuccess: function(o) {
				var url;
				if(o.ret === 0) {
					url = 'http://' + o.dns + '/ftn_handler/' + o.url + '/' + fileName;
					callback(o.ret, url);
				} else {
					callback(o.ret);
				}
			},
			onError: function() {
				callback(1);
			},
			callbackName: '_callback'
		});
	};
	
	/**
	 * 获取文件直接下载URL
	 * @param {Number} uin 登录用户UIN
	 * @param {Number} oUin 文件上传用户UIN
	 * @param {String} path 文件server路径
	 * @param {String} fileName 文件名
	 * @param {Number} prdid 产品的ID，如调用方法前未进行config则此参数必须传
	 * @param {Number} appid 应用的ID，如调用方法前未进行config则此参数必须传
	 * @returns {String}
	 */
	function getDirectDownloadUrl(uin, oUin, path, fileName, prdid, appid) {
		return 'http://fj.qzone.qq.com/cgi-bin/cgi_download_redirect?uin=' + uin + '&ouin=' + oUin + '&path=' + path + '&name=' + fileName + '&prdid=' + (prdid || _conf.prdid) + '&appid=' + (appid || _conf.appid);
	};

	/**
	 * 批量获取文件信息，callback(ret {Number}, [{file: {String}//文件的serverPath, download: {Number}//下载次数, ttl: {Number}//剩余有效时间（秒）, size: {Number}//文件大小（byte）}]);
	 * @param {Number} uin 登录用户的UIN
	 * @param {Array} files 文件描述对象数组，[{uin: {Number}//文件上传用户UIN, path: {String}//文件路径}]
	 * @param {Function} callback
	 * @param {Number} prdid 产品的ID，如调用方法前未进行config则此参数必须传
	 * @param {Number} appid 应用的ID，如调用方法前未进行config则此参数必须传
	 */
	function getFilesInfo(uin, files, callback, prdid, appid) {
		var res = [];
		_get();
		function _get() {
			var tmp = [];
			var file;
			while(files.length && tmp.length < 10) {
				file = files.shift();
				tmp.push(file.uin + ',' + file.path);
			}
			_conf.jsonGetter({
				url: 'http://fj.qzone.qq.com/cgi-bin/cgi_files_info',
				param: {
					uin: uin,
					files: tmp.join(';'),
					prdid: prdid || _conf.prdid,
					appid: appid || _conf.appid
				},
				onSuccess: function(o) {
					if(o.ret === 0) {
						res = res.concat(o.data);
						if(files.length) {
							_get();
						} else {
							callback(o.ret, res);
						}
					} else {
						callback(o.ret);
					}
				},
				onError: function() {
					callback(1);
				},
				callbackName: '_callback'
			});
		};
	};

	/**
	 * 获取用户可用空间大小（bytes），callback(ret {Number}, availableSpace {Number});
	 * @param {Number} uin
	 * @param {Function} callback
	 * @param {Number} prdid 产品的ID，如调用方法前未进行config则此参数必须传
	 * @param {Number} appid 应用的ID，如调用方法前未进行config则此参数必须传
	 */
	function getAvailableSpace(uin, callback, prdid, appid) {
		_conf.jsonGetter({
			url: 'http://fj.qzone.qq.com/cgi-bin/cgi_user_space',
			param: {
				uin: uin,
				prdid: prdid || _conf.prdid,
				appid: appid || _conf.appid
			},
			onSuccess: function(o) {
				if(o.ret === 0) {
					callback(o.ret, o.avaliable_space);
				} else {
					callback(o.ret);
				}
			},
			onError: function() {
				callback(1);
			},
			callbackName: '_callback'
		});
	};
	
	/**
	 * 获取插件安装地址
	 * @param {String} returnTo 安装成功后的返回地址，不传则返回邮箱登录页面。
	 * @param {String} s ‘install'-在线安装页面，‘select’-选择安装页面，默认为‘install’
	 * @returns {String}
	 */
	function getPluginInstallUrl(returnTo, s) {
		return 'http://mail.qq.com/cgi-bin/readtemplate?t=browser_addon&check=false&s=' + (s || 'install') + '&returnto=' + (returnTo || '');
	};
	
	//@import_testcase 1
	
	return {
		_fileList: _fileList,
		_uploadList: _uploadList,
		_waitQueue: _waitQueue,
		LISTENER_CODE: _LISTENER_CODE,
		LISTENER_CODE_NAME: _LISTENER_CODE_NAME,
		STATUS_CODE: _STATUS_CODE,
		genFileId: genFileId,
		hasFlash: hasFlash,
		hasPlugin: hasPlugin,
		resumeFileByPlugin: resumeFileByPlugin,
		selectFile: selectFile,
		retry: retry,
		flashEventListener: flashEventListener,
		initFlash: initFlash,
		initPlugin: initPlugin,
		config: config,
		setConfig: setConfig,
		reset: reset,
		getPostfixWhiteList: getPostfixWhiteList,
		getUploadList: getUploadList,
		removeFileById: removeFileById,
		pauseFileById: pauseFileById,
		resumeFileLocalById: resumeFileLocalById,
		isSupportPlugin: isSupportPlugin,
		getDownloadUrl: getDownloadUrl,
		getDirectDownloadUrl: getDirectDownloadUrl,
		getFilesInfo: getFilesInfo,
		getAvailableSpace: getAvailableSpace,
		getPluginInstallUrl: getPluginInstallUrl
	};
})();
