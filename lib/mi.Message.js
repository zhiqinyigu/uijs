/*
 * 微博私信
 */
if (window.MI){
	MI.Message = 1;
}
if (!window._){
	/**
	 * 国际化语言
	 * 
	 * @param {String} String 中文模版（动态变量使用{0},{1},{2}等）
	 * @param {String} String 动态变量
	 * @return {String} String 国际化后的语言
	 *            @example
	 *            el.value = isFollow == 1 ? _('取消收听') : _('收听');
	 *            var number = 30; 
	 *            el.innerHTML = _('查看所有 {0} 条',number);
	 */
	window._ = function(str){
		if (arguments.length == 1) return str;
		var args = Array.prototype.slice.call(arguments, 1);
		return str.replace(/\{(\d+)\}/g, function(m, i) {
					return args[i];
				});
	}
}
/**
 *
 *  @desc wbpm.js 用在微博私信的操作类
 *  功能：列表的操作；写信
 *  依赖mi基础库，如果在列表情况，就需要等待wbpm_list.js下载完，才能调用init
 *
 *
 

	默认规则:
	    有所id以pm开头

	暂时保存为UTF-8

如果边开发，边重构代码，而且保持同步，而且不会引入bug


	数据层，除了拉取数据之外，都与MI基础库

数据层
1. 插入数据
	假设：不考虑cgi的本地缓存，认为cgi是实时；访问过的时间段，不再访问
	目标，不管如何顺序插入数据，都不会乱
	插入数据，分为两种，列表的，和会话的
	i. 拉取列表，需要把原有的对应的会话放回去，修改c，tm
	ii. 拉取会话，如果还没有对应的列表，构造列表项，这个是可以准确构造
	iii. 第一次，插入数据

	注意点：
		1. 判断已经拉取最后，不再向cgi访问


	事件的响应：
		del
		add  下n项的数据，不自动发出add
		genstatus

		update就用del+add来实现，如果需要保存显示状态，就在视图层处理

		由于新邮件，是强制插入到视图层，不用视图层主动get数据

	数据的来源(_pmfrom)
		cgi  (异步)
		memory (同步)
	类型(bList)
		bList : 1 为 list，否则为conv
	参数
		add : function(_aoObject, _aoConfig)
		del : function(_aoArray, _aoConfig)


	list1 属于新数据，都会触发add时间，特别注意第一次加载，是放在list1中

1.1 发信后的插入数据

1.2 新建房间的插入数据

2. 删除数据
	i. 删除列表
	ii. 删除会话
		如果只有一封子信，当作清空会话来做（现在是按照删除会话）
		如果删除的是第一封，根据第二封，如果在查找的时间下限之下，删除会话，否则，移动位置
	iii. 清空会话

	事件的响应：
		del
		add
		genstatus


3. 获取数据
	getNext({ nexttid : string|function, tid : }) 通过事件更新



4. 设置状态


pm_mgr.html写信部分是pm_conversation.html的子集；pm_conversation.html是pm_list.html的子集，这用于构造


	邀请的信息，假设都是已读的

数据结构
	{
		//pm_list部分  list
		ptid : "",
		tid : "",

		t : number,
		u : number,

		ma : string, //自己信息
		mn : string,
		micn : string,
		mv : boolean,

		list : [
			//列表
			{
				//pm_conversation部分 list_item
				ptid : "",

				tid : string(如果多人会话，就是roomid，否则, accountname)
				st : number, //邮件的数目
				t : number,
				u : number,
				mc : boolean (如果多人会话，true，否则false) //multiply conversation
				//如果单人会话，等于icn
				//如果多人会话，就是多人会话图标
				licn : 列表图标 list icon (如果多人会话，模板上设置，如果单人会话，一直对方头像，在html模式计算)

				s : boolean, 是否我我发出 (没用，由 obj.a == obj.ma 判断是否我发出)
				tm : number,
				img : string, //内容带有图片
				oc : string, //没有转义连接
				c : string, //有转义连接
				sr : string, //来自...

				//重复用户信息
				ma : string, //自己信息 (me account)
				mn : string,
				micn : string,

				//对于单人私信，就是对方信息
				//对于多人会话，c内容发出者信息，如果是我，就没有意义（一般为空串)
				//对于多人会话，如果是邀请信息，a:10000, n:10000, f:false, icn:""
				a : string
				n : string
				f : boolean
				icn : string(这个头像是绑定a的信息，表现没用，用licn替代)
				v : string

				mi : [
					//群成员信息，包括自己
					//保持最新的，就算在多人会话再拉取新人
					{
						a : string
						n : string
						f : boolean
						icn : string
						v : boolean 是否通讯认证
					}
				]

				list : [
					//回话内容 
					{
						//pm_mgr部分   conversation_item
						ptid : string, //回话id
						tid : string, //自己的id

						//
						s : boolean, 是否我我发出
						tm : number,
						img : string, //内容带有图片
						oc : string, //没有转义连接
						c : string, //有转义连接
						sr : string, //来自...

						//[重复信息]
						//自己信息
						ma : string,
						mn : string,
						micn : string,

						//[重复信息]
						//对于单人私信，就是对方信息
						//对于多人会话，c内容发出者信息，如果是我，就没有意义（一般为空串)
						a : string
						n : string
						f : boolean
						icn : string
					},
					{
						...
					},
					...
				]
			},
			{
				...
			},
			...
		]
	}

	ptid, tid : 列表为空串, 单人会话为 "$account$,a" ，多人会话为"$roomid$,r"


		var data =
		{
			两个特殊的tid: inbox和sendbox，把inbox和sendbox看作聚合邮件
			oInstMap : {  只做查找用，需要先修改pminstance的list再修改它
					tid1 : pminstance1,
					tid2 : pminstance2,
					...
				}

			oStatMap : { 显示状态的map
					tid1 : pmstatus1,
					tid2 : pmstatus2,
					...
				}

			oAddrs : [ [id, nickname, 全拼如"liu|bing|jun"], ...]

			ts : 最新修改调用cgi时间戳

			mode : turn|scroll 翻页还是滚动
		}


		具体一页的显示状态数据
		有cgi数据设置
		pmstatus =
		{
			tid :
			pt : 最新的时间
			nt : 最后的时间

			//dirty : 是否脏
			//next : true|false 还有没数据
			//sc : 用于记住滚动条
		}




	//todo 一进入会话，设置未读问题





  */


/**
 *
 *  开发时，暂时文件，分离出模板给UI
 *
 */

(function()
{
	window.debug = function(_avData)
	{
		//# if (debug){
			if (typeof _avData == "undefined")
			{
				debugger;
			}
			else
			{
				if (window.console )
				{
					var _sMsg = _avData.join ? _avData.join(', ') : _avData;
					if ( window.console.debug )
					{
						window.console.debug(_sMsg);
					}
					else if (window.console.log)
					{
						window.console.log(_sMsg);
					}
					else
					{
						//document.title = _sMsg;
					}
				}
			}
		//# }
	};
	//# if (debug){
		function catchError(_asMsg, _asUrl, _anLine)
		{
			var _fFunc = arguments.callee.caller,
				_fFuncParent = _fFunc && _fFunc.caller,
				_fFuncParPar = _fFuncParent && _fFuncParent.caller,
				_sFuncStr = (_fFunc || "null").toString(),
				_sFuncParStr = (_fFuncParent || "").toString(),
				_sFuncPPStr = (_fFuncParPar || "").toString(),
				_sSelfErr;
			try
			{
				debug(
					[
						"error:",
						_asMsg,
						"\nline:",
						_anLine,
						"\nurl:",
						_asUrl,
						"\nfunction:",
						_sFuncStr.substr(0, 100),
						_sFuncParStr ? "\nparent function:"
							+ _sFuncParStr.substr(0, 100) : "",
						_sFuncPPStr ? "\nparent parent function:"
							+ _sFuncPPStr.substr(0, 100) : ""
					]
				);
			}
			catch (_oError)
			{
				_sSelfErr = _oError.message;
			}

			return false;
		}
		/*
		window.onerror = catchError;

		window._ = function(_asValue)
		{
			return window._Map && typeof window._Map[_asValue] != "undefined" ? window._Map[_asValue] : _asValue;
		};
		*/
	//# }
})();



(function()
	{
		var _oWin = window,
			_oPM = _oWin.PM = _oWin.PM || {},
			_oTMPL = _oPM.TMPL = _oPM.TMPL || {},
			//# if (!debug){
			_PM_UPLOADIMG = location.protocol + "//t.qq.com/inbox/pm_uploadimg.php",
			//# }else{
			//_PM_UPLOADIMG = location.protocol + "//pmdev.t.qq.com/cgi-bin/pm_uploadimg",
			//# }
			_VIP = ['<a class="vip" target="_blank" title="', _('腾讯认证'), '" href="http://t.qq.com/certification"></a>'].join('');

		/**
		 *  @desc 由于这是可能没有加载到ui.js，拷贝一份UI.tmplString
		 *
		 *	这里有o，用来放临时变量
		 */
		_oPM.T = function(_avStr)
		{
			_avStr = _avStr.join ? _avStr.join('') : _avStr;
			return new Function("obj", "obj2" ,"var o=obj2||{},p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('" + _avStr
			.replace(/[\r\t\n]/g, " ")
			.split("<%").join("\t")
			.replace(/((^|%>)[^\t]*)'/g, "$1\r")
			.replace(/\t=(.*?)%>/g, "',$1,'")
			.split("\t").join("');")
			.split("%>").join("p.push('")
			.split("\r").join("\\'")
			+ "');}return p.join('');");
		};

		//to UI，mi基础库以tag和class做选择符的，所有，注释了的classname修改需要说一声
		//为了减少classname与微博的冲突，QQ邮箱的class都用pm开头


		//列表模板，不能用mi基础库
		//写信模板，可用mi基础库
		_oTMPL.main = [
				//to UI，这里需要用js动态增加margin-bottom来撑开
				'<div class="wbpmlist" id="pmlist" style="display:none;"></div>', //列表
				'<div class="wbpmlist" id="pmrecord" style="display:none;"></div>'	//读具体私信
			].join('');

		//新的
		var _sUploadForm = [
				'<%if(o.li){o.ftid=o.li.tid;}else if(obj.tid){o.ftid=obj.tid;}else{o.ftid="";}%>',
			//'<div class="fileselect">',
				'<form method="POST"  action="', _PM_UPLOADIMG ,'" enctype="multipart/form-data" target="wbpm_uploadimg<%=o.ftid%>" tid="<%=o.ftid%>">',
					'<input type="file" name="file" hideFocus="true" class="wbpmimgfile">',
					'<input type="hidden" name="resp_charset" value="UTF8"/>',
					'<input type="hidden" name="pmlang" value="', _('zh_CN'), '"/>',
					'<input type="hidden" name="ef" value="if"/>',
				'</form>',
			//'</div>'
				''
			].join('');

		_oTMPL.uploadform = _oPM.T(
			_sUploadForm
		);

		//新的
		var _sComposeTmpl = [
				'<div class="replycontent">',
					'<%if(!(o.li && o.li.tid)){%>',
						'<span class="wbpm_left">', _('内　容：'), '</span>',
					'<%}%>',
					'<textarea kd="edit" id="wbpmcompose<%=cid%>editor"></textarea>',
				'</div>',
				'<div class="submit">',
					'<div class="wbpm_left wbpminsert">',
						_('插入：'),
						'<a href="javascript:;" title="', _('表情'), '" ck="face" class="inserticon"><span class="wbpm_ico_face"></span></a>',
						'<a href="javascript:;"title="', _('图片'), '" class="wbpmimg inserticon"><span class="wbpm_ico_addimg"></span>',
							'<div class="fileselect">',
								_sUploadForm,
							'</div>',
						'</a>',
						'<span title="', _('上传中'), '" class="wbpmimguploading">',
							'<img src="http://mat1.gtimg.com/www/mb/images/loading.gif" class="wbpm_ico_inline" style="margin-left:3px;" />', _('上传中...'), '&nbsp;&nbsp;<a href="javascript:;" ck="cancelupload">', _('取消'), '</a>',
						'</span>',
						'<span class="wbpmimgname"><span mor="showimg" mot="hideimg" style="cursor:pointer;"><span class="wbpm_ico_img"></span><span style="text-decoration:underline;" id="wbpmcompose<%=cid%>imgname"></span></span>&nbsp;<a href="javascript:;" ck="rmimg" class="ico_letterdel">x</a></span>',
						'<div class="wbpmimgpreview" style="left:61px; display:none;"  id="wbpmcompose<%=cid%>previewimg" mor="showimg" mot="hideimg">',
							'<img style="width:150px;">',
						'</div>',
						'<span class="wbpmfailuploadtxt">', _('上传失败，请重新上传'), '</span>',

						//todo 需要增加实验室
						'<a id="wbpmcompose<%=cid%>musicrecord" href="javascript:;" title="', _('录音'), '" ck="musicrecord" class="inserticon" style="margin-left:0;_margin-bottom:0;"><span class="wbpm_ico_mic"></span></a>',
						//成功录音的显示
						'<span id="wbpmcompose<%=cid%>musicrecordsuc" style="display:none">',
							'<span class="wbpm_ico_mic"></span>',
							_('录音已添加'), '&nbsp;<a href="javascript:;" ck="rmrecord" class="ico_letterdel">x</a>',
						'</span>',
						'<div class="mic_flash" style="display:none;" id="wbpmcompose<%=cid%>musicrecordcontainer">',
							'<a href="#" ck="rmrecord" style="display:inline;position:absolute;right:5px;top:3px;" class="DClose close" title="', _('关闭'), '">', _('关闭'), '</a>',
							'<div style="width:404px;height:160px;z-index:3;" id="wbpmcompose<%=cid%>recordflash">', _('加载中...'), '</div>',
						'</div>',

					'</div>',
					'<div class="wbpm_right" style="width:205px; text-align:right;">',
						'<span class="wbpmcount" id="wbpmcompose<%=cid%>count">',
							_('还能输入'),
							'<span class="wbpmtextlimit">140</span>',
							_('字'),
						'</span>',
						'<a href="javascript:;" id="wbpmcompose<%=cid%>send" class="btn_green btn_send wbpmsend btn_send_disabled" ck="send">&nbsp;', _('发送'), '&nbsp;</a>',
						'<span class="wbpmsendtxt"><a class="btn_green btn_send_disabled">', _('发送中'), '</a></span>',
						//'<a class="btn_gray" href="" ck="cancel">&nbsp;', _('取消'), '&nbsp;</a>',
					'</div>',
				'</div>'
			].join('');

		_oTMPL.textcnt = _oPM.T([
				'<%if(cnt<0){%>',
					_('超出'),
					'<span class="wbpmtextexceedlimit"><%=-cnt%></span>',
				'<%}else{%>',
					_('还能输入'),
					'<span class="wbpmtextlimit"><%=cnt%></span>',
				'<%}%>',
				_('字')
			] );

		var _sListItem,
			_sNickName,
			_sTurnPage;
		//new
		_oTMPL.list = _oPM.T([
			//'<div class="tabStyle2">',
				//'<ul>',
					//'<li class="select"><b>', _('私信'), '</b></li>',
					//'<li><a href="/messages/note.php">', _('记事本'), '</a></li>',
				//'</ul>',
			//'</div>',

			'<div class="heading">',
				'<h2><span class="wbpm_left"><span class="wbpm_ico_sms wbpm_left" ></span>', _('私信'), '</span><span style="font-weight:normal; color:#A0A0A0;" class="wbpm_left">&nbsp;&nbsp;|&nbsp;&nbsp;</span><a href="/messages/note.php" class="wbpm_left"><span class="wbpm_left wbpm_ico_note "></span>', _('记事本'), '</a></h2>',
				'<div class="intro">',

					'<span class="wbpm_ico_notice"></span>',
					[
						'<span>' + _('私信可以发送语音了！') + '<a href="http://t.qq.com/help.php?type=letterHelp#letterHelp" target="_blank">' + _('了解详情') + '</a>&nbsp;</span>',
						'<span>' + _('支持设置谁可以给我发私信了。') + '<a href="http://t.qq.com/setting/privacy">' + _('去设置') + '</a>&nbsp;</span>'
					][(new Date()).getTime() % 2],
				'</div>',
				'<a ck="compose" href="javascript:;" class="btn_green btn_compose">&nbsp;', _('发私信'), '&nbsp;</a>',
			'</div>',
			//'<%if(obj.loading===true){%>',
			//	'<div class="wbpminfo"><img src="http://mat1.gtimg.com/www/mb/images/loading.gif" class="wbpm_ico_inline" />', _('加载中...'), '</div>',
			//'<%}else if(obj.error){%>',
			//	'<div class="wbpminfo">', _('加载失败'), '<%if(obj.refresh){%>', _('，请'), '<a href="<%=refreshurl%>">', _('重试'), '</a><%}%></div>',
			//'<% }else if(obj.list.length==0){ %>',
			//	'<div class="wbpminfo">', _('没有私信')</div>',
			//'<%}else{%>',
				'<div class="wbpmlistitems">',
					'<div class="wbpminfo" id="wbpmlistloading" style="<%if(!obj.loading){%>display:none;<%}%>"><img src="http://mat1.gtimg.com/www/mb/images/loading.gif" class="wbpm_ico_inline" />', _('加载中...'), '</div>',
					'<div class="wbpminfo" id="wbpmlistloaderr" style="<%if(!obj.error){%>display:none;<%}%>">', _('加载失败'), _('，请'), '<a href="javascript:;" onclick="location.reload()">', _('重试'), '</a></div>',
					'<div class="wbpminfo" id="wbpmlistnomail" style="<%if(!obj.list||obj.list.length){%>display:none;<%}%>">', _('没有私信'), '</div>',
					'<div id="wbpmlistitems" style="<%if(!obj.list||!obj.list.length){%>display:none;<%}%>">',
						'<%if(obj.list){%>',
							'<%for(var i=0,len=obj.list.length;i<len;i++){o.li=obj.list[i];%>',
								_sListItem = [
									'<%{o.li=o.li||obj;}%>',
									'<div class="wbpmunit wbpmunit_index" mor="over" mot="out" ck="read" tid="<%=o.li.tid%>" tm="<%=o.li.tm%>" id="wbpmlist<%=o.li.tid%>">',
										'<div class="readstatus"><span class="<%if(o.li.u){%>unread<%}%>"></span></div>',
										'<div class="icon">',
											//头像
											//PM.getInfo(_aoInst, _asType, _asIncludeMe, _asSeparator)

											'<%if(o.li.mc){%>',
												//多人会话，不能弹出profile tip
												'<a href="javascript:;" ck="prevent" title="',
													'<%=PM.getInfo(o.li,"name",false,", ")%>',
												'"><img src="<%=o.li.licn%>" /></a>',
											'<%}else{%>',
												//单人会话，需要弹出profile tip
												'<a href="/<%=PM.getInfo(o.li,\'account\',false,\', \')%>" ck="prevent" title="<%=PM.getInfo(o.li,\'name\',false,\', \')%>(@<%=PM.getInfo(o.li,\'account\',false,\', \')%>)"><img src="<%=o.li.licn%>" /></a>',
											'<%}%>',
										'</div>',
										'<div class="wbpmcontent">',
											'<div class="users users_index">',
												//昵称

												_sNickName = [
													'<%{o.li=o.li||obj;}%>',
													'<%{o.litype=o.litype||"list"}%>',
													'<%for(var mij=0,mik=0;mij<o.li.mi.length&mik<3;mij++){%>',
														'<%if(o.li.mi[mij].a!=o.li.ma||o.li.mi.length==1){%>',
															'<%if(mik){%>, <%}%>',
															'<%mik++;%>',
															'<a href="/<%=o.li.mi[mij].a%>" ck="stop" title="<%=o.li.mi[mij].n%>(@<%=o.li.mi[mij].a%>)"><%=o.li.mi[mij].n%></a><%if(o.li.mi[mij].v){%>', _VIP, '<%}%>',
														'<%}%>',
													'<%}%>',
													'<%for(var mij2=mij,other=0;mij2<o.li.mi.length;mij2++){%>',
															'<%if(o.li.mi[mij2].a!=o.li.ma){other++;}%>',
													'<%}%>',
													'<%if(other){%> ',
														_('和'),
														' <a class="wbpmshowothers" id="wbpm<%=o.litype%>othernick<%=o.li.tid%>" ck="addsomeone" mor="showother" mot="hideother">',
															_('其他'),
															'<%=other%>',
															_('人'),
															'<span style="font-size:9px;">▼</span>',
														'</a>',
													'<%}%>',
													'<ul class="wbpmotherslist" id="wbpm<%=o.litype%>otherlist<%=o.li.tid%>" mor="showother" mot="hideother" style="display:none;">',
														'<%for(;mij<o.li.mi.length;mij++){%>',
															'<%if(o.li.mi[mij].a!=o.li.ma){%>',
																//暂时禁用profile tip
																//'<li><img src="<%=o.li.mi[mij].icn%>" /><a href="/<%=o.li.mi[mij].a%>" ck="stop" title="<%=o.li.mi[mij].n%>(@<%=o.li.mi[mij].a%>)"><%=o.li.mi[mij].n%></a></li>',
																'<li><img src="<%=o.li.mi[mij].icn%>" /><a href="/<%=o.li.mi[mij].a%>" ck="stop"><%=o.li.mi[mij].n%></a><%if(o.li.mi[mij].v){%>', _VIP, '<%}%></li>',
															'<%}%>',
														'<%}%>',
													'</ul>',
													''
												].join(''),


											'</div>',
											'<div class="latestmessage <%if(o.li.a==o.li.ma){%>gray<%}%>">',
												'<%if(o.li.audio){%><span class="wbpm_ico_mic" title="', _('本条信息包含录音'), '"></span><%}%>',
												'<%if(o.li.img){%><span class="wbpm_ico_img" title="', _('本条信息包含图片'), '"></span><%}%>',
												'<%if(o.li.a==o.li.ma){%>', _('我：'), '<%}else if(o.li.mc && o.li.a!=10000){%><%=o.li.n%>', _('：'), '<%}%><%=o.li.c%>',
											'</div>',
										'</div>',
										'<a ck="empty" href="javascript:;" class="removeitem" hidefocus title="', _('删除本组信息'), '"></a>',
										'<div class="wbpmrmconfirm" ck="rmcfm" unselectable="on">',
											'<div class="rmconfirminner" unselectable="on">',
												'<div unselectable="on">', _("确定删除本组所有信息吗？"), '</div>',
												'<div class="dooperate" unselectable="on"><a href="javascript:;" class="btn_gray" ck="rmcfm" info="y" unselectable="on" hidefocus>&nbsp;', _('确定'), '&nbsp;</a><a class="btn_gray" href="javascript:;" ck="rmcfm" info="n" unselectable="on"  hidefocus>&nbsp;', _('取消'), '&nbsp;</a></div>',
											'</div>',
										'</div>',

										'<div class="operate <%if(o.li.u==1){%>wbpmoneunreaddiv<%}else if(o.li.u>1){%>wbpmmoreunreaddiv<%}else{%>wbpmallreaddiv<%}%>">', //控制class: wbpmallreaddiv, wbpmoneunreaddiv, wbpmmoreunreaddiv
												'<a href="javascript:;" class="wbpmreadinfo" ck="read">',
													//wbpmallread0 就diplay:none
													'<span class="wbpmallread wbpmallread<%=o.li.t-o.li.st%>">',
														_('<span><%=o.li.t-o.li.st%></span>条信息'),
													'</span>',

													'<span class="wbpmoneunread">',
														_('1条新信息'),
													'</span>',

													'<span class="wbpmmoreunread">',
														_('<span class="unreadcnt"><%=o.li.u%></span>条新信息'),
													'</span>',
												'</a>',
												'<%if(PM.ableReply(o.li)){%>',
													'<span class="wbpmseparate wbpmallread<%=o.li.t-o.li.st%>">&nbsp;&nbsp;|&nbsp;&nbsp;</span>',
													'<a href="javascript:;" ck="listreply" class="wbpmrmply">', _('回复'), '</a>',
												'<%}%>',

											//'&nbsp;&nbsp;<a ck="empty" href="javascript:;">', _('删除'), '</a>',
										'</div>',
										'<div class="pubinfo"><span class="pubtime" tm="<%=o.li.tm%>"><%=PM.formatDate(o.li.tm)%></span> <%=o.li.sr%></div>',
										'<div class="wbpm_clear"></div>',
									'</div>'
								].join(''),
							'<%}%>',
						'<%}%>',
					'</div>',
				'</div>',

				'<div id="wbpmlistloadmore" style="display:none;">',
					'<img src="http://mat1.gtimg.com/www/mb/images/loading.gif" class="wbpm_ico_inline" />',_('加载中，请稍候...'),
				'</div>',
				_sTurnPage = [
					'<%if(obj.mode=="turn"){%>',
						//翻页
						'<div class="wbpmpager">',
							'<a href="javascript:;" ck="turn" class="<%if(obj.pp){%>wbpmprepage<%}else{%>wbpmdisable<%}%>">', _('上一页'), '</a> 1/7 <a href="javascript:;" ck="turn" class="<%if(obj.np){%>wbpmnextpage<%}else{%>wbpmdisable<%}%>">', _('下一页'), '</a>',
						'</div>',
					'<%}%>'
				].join(''),

			//'<%}%>'
			""
		]);
		//new
		_oTMPL.listItem = _oPM.T(_sListItem);
		_oTMPL.nickname = _oPM.T(_sNickName);


		var _sRecordItem,
			_sRecordMembers;
		_oTMPL.record = _oPM.T([
			'<div class="wbpmrecordhead tabStyle2">',
				'<a href="#" class="btn_return" ck="return">&nbsp;', _('私信'), '&nbsp;</a>',
				//参与人，先隐藏，有读到数据才显示
				'<a href="#" style="display:none;" class="btn_reply wbpmrmply" id="wbpmrecordinvitebtn" ck="addsomeone" title="', _('参与人'), '"><em></em></a>',
				'<h2 id="wbpmrecordname"><%if(obj.n){%><%=n%><%}%>',
				'</h2>',
			'</div>',
			'<div style="display:none;" class="wbpmnofollow" id="wbpmrecordnofollowedby"><span class="wbpm_ico_notice"></span><span id="wbpmrecordnofollowedbytext"></span></div>',
			'<div class="wbpmaddbox" id="wbpmrecordinvitepanel" style="display:none;">',
				'<div style="height:1px;"></div>',

				'<ul id="wbpmrecordmembers">',
					_sRecordMembers = [
						'<%if(obj.mi){%>',
							'<%for(var mij=0;mij<obj.mi.length;mij++){%>',
								//'<li><img class="wbpmportrait wbpmportrait1" src="<%=obj.mi[mij].icn%>" /><span><%=obj.mi[mij].n%></span></li>',
								//todo
								//'<li><a href=/<%=obj.mi[mij].a%>" ck="stop" title="<%=obj.mi[mij].n%>(@<%=obj.mi[mij].a%>)"><img class="wbpmportrait wbpmportrait1" src="<%=obj.mi[mij].icn%>" /></a><a href="/<%=obj.mi[mij].a%>" ck="stop" title="<%=obj.mi[mij].n%>(@<%=obj.mi[mij].a%>)"><%=obj.mi[mij].n%></a></li>',
								'<li><a href="/<%=obj.mi[mij].a%>" ck="stop" title="<%=obj.mi[mij].n%>(@<%=obj.mi[mij].a%>)"><img ctype="0" class="wbpmportrait wbpmportrait1" src="<%=obj.mi[mij].icn%>" /></a><a href="/<%=obj.mi[mij].a%>" ck="stop" title="<%=obj.mi[mij].n%>(@<%=obj.mi[mij].a%>)"><%=obj.mi[mij].n%></a></li>',
							'<%}%>',
						'<%}%>',
						'<li class="wbpmadd_but" ck="invite" id="wbpmrecordinvitesubmit"><a class="wbpmmember" href="javascript:;"><em></em><span>', _('添加参与人'), '<span></a></li>',
						''
					].join(''),
				'</ul>',
				
				'<div class="wbpmspline"></div>',
				'<a href="javascript:;" ck="exitroom" class="btn_gray wbpmexitroom" id="wbpmrecordexitroom">', _('退出本次会话'), '</a>',
				//退出确认框
				'<div class="wbpmrmconfirm" id="wbpmrecordexitcfm" ck="exitcfm" unselectable="on" style="display:none;">',
					'<div class="rmconfirminner" unselectable="on">',
						'<div unselectable="on">', _("确定退出本对话吗？"), '</div>',
						'<div class="dooperate" unselectable="on"><a href="javascript:;" class="btn_gray" ck="exitcfm" info="y" unselectable="on" hidefocus>&nbsp;', _('确定'), '&nbsp;</a><a class="btn_gray" href="javascript:;" ck="exitcfm" info="n" unselectable="on"  hidefocus>&nbsp;', _('取消'), '&nbsp;</a></div>',
					'</div>',
				'</div>',

			'</div>',


			'<div class="wbpmcompose wbpmadd wbpmr wbpmrecord" id="wbpmrecordcompose" style="display:none;">',
				_sComposeTmpl,
			'</div>',
			'<div class="wbpmreply" id="wbpmrecordnofollow" style="color:#A0A0A0; padding:12px 10px 11px; display:none;">',
				'<%if(obj.mc==true){%>',
					'<%=n%>', _('不是你的听众，不能回复TA的私信。'),
				'<%}%>',
			'</div>',

			'<div class="wbpmlistitems record">',
				'<div class="wbpminfo" id="wbpmrecordloading" style="<%if(!obj.loading){%>display:none;<%}%>"><img src="http://mat1.gtimg.com/www/mb/images/loading.gif" class="wbpm_ico_inline" />', _('加载中...'), '</div>',
				'<div class="wbpminfo" id="wbpmrecordloaderr" style="<%if(!obj.error){%>display:none;<%}%>">', _('加载失败'), '<%if(obj.refresh){%>', _('，请'), '<a href="<%=refreshurl%>">', _('重试'), '</a><%}%></div>',
				'<div class="wbpminfo" id="wbpmrecordnomail" style="<%if(!obj.list||obj.list.length){%>display:none;<%}%>">', _('没有私信'), '</div>',
				'<div id="wbpmrecorditems" tid="<%=tid%>" style="<%if(!obj.list||!obj.list.length){%>display:none;<%}%>">',
					'<%if(obj.list){%>',
						//'<% for(var i=list.length-1;i>=0;i--){o.li=list[i]; %>',
						'<%for(var i=0,len=list.length;i<len;i++){o.li=list[i];%>',

							_sRecordItem = [
								'<%{o.li=o.li||obj;}%>',
								'<%if(o.li.a==10000){%>',
									//系统邮件
									'<div class="wbpm_gray wbpmsystem" tid="<%=o.li.tid%>" tm="<%=o.li.tm%>" id="wbpmrecord<%=o.li.tid%>">',
										'<%=o.li.c%>',
									'</div>',
								'<%}else{%>',
									'<div class="wbpmunit<%if(o.li.u){%> wbpmunitunread<%}%>" tid="<%=o.li.tid%>" tm="<%=o.li.tm%>" id="wbpmrecord<%=o.li.tid%>" mor="over" mot="out" sn="<%if(o.li.a==o.li.ma){%>1<%}else{%>0<%}%>">', //tm: time, sn : send
										'<div class="readstatus"><span class="<%if(o.li.u){%>unread<%}%>"></span></div>',
										'<div class="icon">',
											'<%if(o.li.a==o.li.ma){%>',
												'<img src="<%=o.li.icn%>" />',
											'<%}else{%>',
												'<a href="/<%=o.li.a%>" title="<%=o.li.n%>(@<%=o.li.a%>)"><img src="<%=o.li.icn%>"/></a>',
											'<%}%>',
										'</div>',
										'<div class="wbpmcontent">',
											'<div class="users">',
												'<%if(o.li.a==o.li.ma){%>',
													'<span>', _('我'), '<%if(o.li.mv){%>', _VIP, '<%}%></span>',
												'<%}else if(o.li.a!=10000){%>',
													'<a href="/<%=o.li.a%>" ck="prevent" title="<%=o.li.n%>(@<%=o.li.a%>)"><%=o.li.n%></a><%if(o.li.v){%>', _VIP, '<%}%>',
												'<%}%>',
											'</div>',
											'<div class="message"><%=o.li.c%>',
											'</div>',

											//显示图片
											'<%if(o.li.img){%>',
												'<div class="picBox">',
													'<a class="pic" href="<%=o.li.img%>/460">',
														'<img class="crs" crs="<%=o.li.img%>/160">',
													'</a>',
												'</div>',
											'<%}%>',
											//'<div class="operate">',
											//'<a href="javascript:;" ck="recordreply" class="wbpmrmply">', _('回复'), '</a>',
											//'&nbsp;&nbsp;<a  ck="remove"  href="javascript:;">', _('删除'), '</a>',
											//'</div>',

											//todo
											'<%if(o.li.audio){%>',
												'<div class="musicBox" style="clear:both;" song="', _('录音'), '" singer="<%if(o.li.a==o.li.ma){%>', _('我'), '<%}else{%><%=o.li.n%><%}%>" songurl="<%=o.li.audio%>" songid="0" songtype="3">',
													'<a href="#" class="mThumbsBox" thumbs="1">',
														'<span class="mThumbs"><em class="ico_audios"></em>', _('录音'), '</span>',
													'</a>',
													'<div class="mBox">',
														'<button class="btn_mPlay" title="', _('播放'), '" style="display:none">', _('播放'), '</button>',
														'<button class="btn_mPause_hover" title="', _('暂停'), '" >', _('暂停'), '</button>',
														'<span class="mTitBox"></span>',
														'<button class="btn_mClose" title="', _('关闭'), '">', _('关闭'), '</button>',
													'</div>',
													'<div class="mBoxNew"></div>',
												'</div>',
											'<%}%>',
										'</div>',
										'<div class="pubinfo">',
											'<span class="pubtime" tm="<%=o.li.tm%>"><%=PM.formatDate(o.li.tm)%></span> <%=o.li.sr%>',
										'</div>',

										'<a ck="remove" href="" class="removeitem" hidefocus title="', _('删除本条信息'), '"></a>',
										'<div class="wbpmrmconfirm" unselectable="on">',
											'<div class="rmconfirminner" unselectable="on">',
												'<div unselectable="on">', _("确定删除本条信息吗？"), '</div>',
												'<div class="dooperate" unselectable="on"><a href="javascript:;" class="btn_gray" ck="rmcfm" info="y" unselectable="on" hidefocus>&nbsp;', _('确定'), '&nbsp;</a><a class="btn_gray" href="javascript:;" ck="rmcfm" info="n" unselectable="on">&nbsp;', _('取消'), '&nbsp;</a></div>',
											'</div>',
										'</div>',
										//'<div class="wbpmreply" style="display:none" ck="stop" tid="<%=tid%>">',
										//	'<div class="replyto">',
										//		_('回复给：'), '<strong><%=o.li.n%></strong>',
										//	'</div>',
										//	_sComposeTmpl,
										//'</div>',
										'<div class="wbpm_clear"></div>',
									'</div>',
								'<%}%>'
							].join(''),
						'<%}%>',
						'<%{o.li=null;}%>',
						'<%{o.compose=true;}%>',
					'<%}%>',
				'</div>',
				//_sTurnPage,
				'<div class="loadmore" id="wbpmrecordmore" style="display:none;" ck="more">',
					'<a href="javascript:;">', _('显示更早的私信记录...'), '</a>',
					'<span style="padding-top:15px;"><img src="http://mat1.gtimg.com/www/mb/images/loading.gif" class="wbpm_ico_inline" />', _('加载中...'), '</span>',
				'</div>',
			'</div>'
		]);
		_oTMPL.recordItem = _oPM.T(_sRecordItem);
		_oTMPL.recordMembers = _oPM.T(_sRecordMembers);

		//写信对话框内容
		_oTMPL.compose = _oPM.T([
			'<div class="wbpmcompose wbpmadd ', _('wbpmcn'), '">',
				//todo
				'<%if(obj.cid!="embed"){%>',
					'<div class="windowtitle">', _('发私信'), '</div>',
						'<%if(obj.name){%>',
							'<div class="wbpmcomposeintro">', _('已在会话中：'), '<%=name%></div>',
						'<%}%>',
				'<%}%>',
				'<%{o.canMultiSend=PM.getAbleMultiSend();}%>',
				'<div class="wbpmcomposeintro">', 
					'<%if(o.canMultiSend){%>',
						_('你可以发私信给一个或多个听众。默认不能发给非听众，除非对方设置了允许。'), 
					'<%}else{%>',
						_('私信只能发送给你的听众，每封私信只能有一个收信人。'), 
					'<%}%>',
				'</div>',
				'<div class="receiver <%if(!o.canMultiSend){%>wbpmsingle<%}%>">',
					'<span class="wbpm_left">',
						'<%if(obj.name){%>',
							_('邀　请：'),
						'<%}else{%>',
							_('收信人：'),
						'<%}%>',
					'</span>',
					'<span class="but"><a id="wbpmcompose<%=cid%>seladdr" href="javascript:;" md="seladdr" class="wbpmaddotherbut" unselectable="on" <%if(obj.dsa){%> dsa="1"<%}%> title="', _('增加'), '"></a></span>',
					//'<input type="text" id="wbpmcompose<%=cid%>to" <%if(n){%>value="<%=n%>"<%}%>/>',
					'<textarea id="wbpmcompose<%=cid%>to" <%if(obj.dsa){%> readonly="true"<%}%>><%if(n){%><%=n%><%}%></textarea>',
				'</div>',

				//	'<% if(!n) { %>',
				//		'<div class="windowtitle">', _('发私信'), '</div>',
				//		'<div class="receiver"><span class="wbpm_left">', _('收信人：'), '</span><input type="text" /></div>',
				//	'<% } else { %>',
				//		'<div class="windowtitle">', _('回复给：'), '<%=n%></div>',
				//	'<% } %>',
				_sComposeTmpl,
			'</div>'
		]);


		//回复对话框内容
		_oTMPL.replydlg = _oPM.T([
			'<div class="wbpmcompose wbpmr wbpmadd ', _('wbpmcn'), '">',
				'<div class="windowtitle"><div class="wbpmrtitle">', _('回复：'), '<%=n%></div></div>',
				//'<div class="receiver" style="display:none"><textarea id="wbpmcompose<%=cid%>to" value="<%=a%>"/></textarea>',
				_sComposeTmpl,
				'<%if(c){%>',
					'<div class="wbpmrlycontent">',
						'<span class="quotef"></span>',
						'<div class="quoteb"><span style="color:#A0A0A0;"><%=n%>', _('：'), '</span><%=c%><div>',
					'</div>',
				'<%}%>',
			'</div>'
		]);

		//_oTMPL.confirm = _oPM.T([
		//	'<div class="wbpmconfirm">',
		//		'<div>', _("确认删除本组私信"), '</div>',
		//		'<div><a href="javascript:;" ck="removesubmit">', _('确认'), '</a><a href="javascript:;" ck="removecancel">', _('取消'), '</a></div>',
		//	'</div>'
		//]);

		_oTMPL.autocomplete = [
			'<div unselectable="on" class="wbpmauto" style="display:none;">',
				'<div unselectable="on" class="wbpmbody"></div>',
				//'<div unselectable="on" class="wbpmfooter">', _('只能发给你收听的用户'), '</div>',
			'</div>'
		].join('');

		//邀请
		_oTMPL.invite = _oPM.T([
			'<div class="wbpmcompose wbpmaddothers wbpmadd ', _('wbpmcn'), '">',
				'<div class="windowtitle">', _('添加参与人'), '</div>',
				'<div class="wbpmaddintro">', _('请输入参与人：'), '</div>',
				'<div class="receiver">',
					'<span class="but"><a id="wbpminviteseladdr" href="javascript:;" md="seladdr" class="wbpmaddotherbut" unselectable="on" title="', _('添加参与人'), '"></a></span>',
					'<textarea id="wbpminviteto"></textarea>',
					'<br style="clear:both;" />',
					'<a href="javascript:;" id="wbpminvitesend" class="btn_green wbpmsend btn_send_disabled wbpmaddblock" ck="send">&nbsp;', _('添加'), '&nbsp;</a>',
					
				'</div>',
			'</div>'
		]);

		_oTMPL.addfollow = _oPM.T([
			'<div class="wbpmfollowguide">', 
				'<div class="popBox"><span class="ico_tsW"><span class="ico_ts"></span></span><h2>', '<%if(obj.func=="invite"){%>',  _('邀请成功'), '<%}else{%>', _('发送成功'), '<%}%>', ' </h2></div>',
				'<div class="wbpmafnotice">', _('你没有收听以下收信人，<%if(obj.addfollow && obj.addfollow.length > 1){%>他们<%}else{%>他/她<%}%>将无法回复你的私信。'), '</div>',
				'<div class="wbpmreceivers">',
					'<%for(var i=0;i<obj.addfollow.length;i++){%>',
						//wbpmafrequest 请求中的class
						//wbpmaffail 请求失败时的class
						//wbpmfollower class说明已经关注了对方
						'<div class="wbpmaf">',
							'<img src="<%=addfollow[i].icn%>"/>',
							'<div class="wbpmafname"><%=addfollow[i].n%></div>',
							'<a href="javascript:;" class="btn_green addtf"  ck="add" ac="<%=addfollow[i].a%>">&nbsp;', _('收听'), '&nbsp;</a>',
							'<span class="addingtf"><img src="http://mat1.gtimg.com/www/mb/images/loading.gif" class="wbpm_ico_inline" /></span>',
							'<div class="wbpm_gray addsinfo"><span class="ico_each"></span>', _('相互收听，'), '<a href="" style="text-decoration:underline;" ck="add" ac="<%=addfollow[i].a%>">', _('取消收听'), '</a></div>',
							'<div class="wbpm_gray addfinfo">', _('操作失败，请'), '<a href="" style="text-decoration:underline;" ck="add" ac="<%=addfollow[i].a%>">', _('重试'), '</a></div>',
						'</div>',
					'<%}%>',
				'<div>',
			'</div>'
		]);

		_oTMPL.musicRecorder = _oPM.T([
			'<object id="musicRecord" width="404" height="160" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">',
				'<param value="<%=recorder%>" name="movie"/>',
				'<param value="high" name="quality"/>',
				'<param value="#FFFFFF" name="bgcolor"/>',
				'<param value="langVer=<%=lang%>" name="FlashVars" />',
				'<param name="wmode" value="transparent" />',
				'<param value="always" name="allowScriptAccess"/>',
				'<param value="all" name="allowNetworking" />',
				'<embed width="404" height="160" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent" allownetworking="all" allowscriptaccess="always" loop="false" play="true" name="musicRecord" FlashVars="langVer=<%=lang%>" bgcolor="#FFFFFF" quality="high" src="<%=recorder%>"/>',
			'</object>'
		]);

	}
)();

(function(_aoUndefined)
	{
		var _oWin = window,
			_oDoc = _oWin.document;

		_oWin.PM = _oWin.PM || {};
		PM.data = PM.data || {};

		//只发信，PM.data没有oInstMap和oStatMap对象

		var _sTURN = "turn",
			_sSCROLL = "scroll",
			_sPMLIST = "pmlist",
			_sPMRECORD = "pmrecord",
			_sPMCOMPOSE = "pmcompose",
			//_sUN = "un",
			_sWBPMFOCUS = "wbpmfocus",
			_sWBPMTXTDEFAULT = "wbpmtxtdefault",
			_sFOLLOWERNUM = "followerNum",
			_sNEWCOUTMSG = "newCoutMsg",
			_sBACKGROUNDCOLOR = "backgroundColor",
			_sWBPMREMOVE = "wbpmremove",
			_sWBPMUNITUNREAD = "wbpmunitunread",
			_sWBPMDISABLEDINVITE = "wbpmdisabledinvite",
			_sTOPTID = "",
			_SYSTEM_ACCOUNT = "10000",
			_SYSTEM_NAME = "10000",
			_SYSTEM_FOLLOW = false,
			_SYSTEM_ICON = "";

		var _bABLEMULTISEND = false; //灰度策略，是否允许用户新建多人会话，或拉取更多的人。由微博的实验室 与 私信的cgi控制(优先)
		function _setABLEMULTISEND(_oJson)
		{
			_bABLEMULTISEND = _bABLEMULTISEND || _oJson.ms;
		}
		function _getABLEMULTISEND()
		{
			//return _bABLEMULTISEND;
			//return false;
			return true;
		}
		PM.getAbleMultiSend = _getABLEMULTISEND;

		//基础函数 {

		function _regFilter(_asRegExpStr)
		{
			return _asRegExpStr.replace(/([\^\.\[\$\(\)\|\*\+\?\{\\])/ig, "\\$1");
		}

		function _now()
		{
			return +new Date;
		}

		function _random()
		{
			return Math.random();
		}

		function _unikey(_asPrefix)
		{
			return [_asPrefix, _now(), _random()].join("").split(".").join("");
		}

		function _extend()
		{
			for (var _oArgs = arguments, _oDesc = _oArgs[0], i = 1, _nLen = _oArgs.length; i < _nLen; i++)
			{
				var _oSrce = _oArgs[i];
				for (var j in _oSrce)
				{
					_oDesc[j] = _oSrce[j];
				}
			}
			return _oDesc;
		}

		function _htmlDecode(_asStr)
		{
			return _asStr && _asStr.replace ? (_asStr.replace(/&nbsp;/gi," ").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">")
				.replace(/&amp;/gi, "&").replace(/&quot;/gi, "\"").replace(/&#39;/gi, "'")
				) : _asStr;
		}

		function _trim(_asStr)
		{
			return (_asStr && _asStr.replace ? _asStr : "").replace(/(^\s*)|(\s*$)/g, "");
		}

		function _waitFor(_afWaitFunc, _afFinishCallBackFunc,
			_anInterval, _anTimeout)
		{
			var _nTime = 0,
				_nInterval = _anInterval || 500,
				_nTimeoutTime = (_anTimeout || 10 * 500) / _nInterval;

			try
			{
				var _sfWaitFunc = _afWaitFunc.toString().substr(0, 50),
					_sFinishCallBackFunc = _afFinishCallBackFunc.toString().substr(0, 50);
			}
			catch (e)
			{
			}

			function _doFinish(_abIsOK)
			{
				try
				{
					_afFinishCallBackFunc && _afFinishCallBackFunc(_abIsOK)
				}
				catch (_oError)
				{
					_catchError(_oError, "waitFor_" + _sFinishCallBackFunc);
				}
			};

			(function()
			{
				try
				{
					if (_afWaitFunc(_nTime))
					{
						return _doFinish(true);
					}
				}
				catch (_oError)
				{
					_catchError(_oError, "waitFor2_" + _sfWaitFunc);
				}

				if (_nTime++ > _nTimeoutTime)
				{
					return _doFinish(false);
				}

				setTimeout(arguments.callee, _nInterval);
			})();
		}

		function _callback(_aoThis, _afCallBack, _aoParamList)
		{
			try
			{
				return typeof _afCallBack == "function"
					? _afCallBack.call(_aoThis, _aoParamList) : null;
			}
			catch (_oError)
			{
				_catchError(_oError, "callback");
			}
		}

		function _isSee(_aoDom)
		{
			var _sNONE = "none";
			if (_aoDom && _aoDom.style)
			{
				while(_aoDom && _aoDom.style && _aoDom.style.display != _sNONE)
				{
					_aoDom = _aoDom.parentNode;
				}
				return !(_aoDom && _aoDom.style && _aoDom.style.display == _sNONE);
			}
			return false;
		}

		//创建一个隐藏的iframe
		function _createIframe(_aoIframeConfig, _afOnload)
		{
			var _sOnload = _unikey("wbpm_iframe"),
				_oDiv = _oDoc.createElement("div"),
				_oContent = ['<iframe oid="', _sOnload, '" '];
			for (var k in _aoIframeConfig)
			{
				_oContent.push(k, '="', _aoIframeConfig[k], '" ');
			}
			_oContent.push('onload="', _sOnload, '(this)"></iframe>');
			_oWin[_sOnload] = function(_aoIframe)
			{
				if (_afOnload && _afOnload(_aoIframe) === false)
				{
					_oDiv.parentNode.removeChild(_oDiv);
				}
			};
			_oDiv.style.display = "none";
			_oDiv.innerHTML = _oContent.join('');
			_oDoc.body.insertBefore(_oDiv, _oDoc.body.firstChild);
			//_oDoc.body.appendChild(_oDiv);
		}

		function _removeIframe(_asId)
		{
			var _oIframe = _oDoc.getElementById(_asId),
				_oDiv;
			if (_oIframe)
			{
				_oDiv = _oIframe.parentNode;
				_oDiv.parentNode.removeChild(_oDiv);
			}
		}

		/**
		 *
		 *	@param {String} _asStr
		 *	@param {Integer} _anLen
		 *
		 */
		function _subAsiiStr(_asStr, _anLen, _asPlus)
		{
			_asPlus = _asPlus || '...';
			var _nStrLen = _asStr.length,
				_nCutLen = Math.max(_anLen - _asPlus.length, 1),
				_nCountLen = 0,
				_nCutPos = -1,
				_nCharCode;

			for (var i = 0; i < _nStrLen; i++)
			{
				_nCharCode = _asStr.charCodeAt(i);
				// asii -> 1 ( # W -> 1.3 )
				// not asii -> 1.5
				_nCountLen += _nCharCode == 35 || _nCharCode == 87
					? 1.2
					: (_nCharCode > 255 ? 1.5 : 1);
				if (_nCutPos == -1 && _nCountLen > _nCutLen)
				{
					_nCutPos = i;
				}
				if (_nCountLen > _anLen)
				{
					return _asStr.substr(0, _nCutPos) + _asPlus;
				}
			}
			return _asStr;
		}

		//不用MI基础库，为了不等MI就显示
		function G(_asId)
		{
			return _oDoc.getElementById(_asId);
		}
		function A(o,n,v)
		{
			if (v == _aoUndefined) {
				return o ? o.getAttribute(n) : null;
			}
			else if (v == '') {
				o.removeAttribute(n);
			}
			else o.setAttribute(n,v);
		}

		function _html(s)
		{
			var _oWrap = _oDoc.createElement('div');
			_oWrap.innerHTML = s;
			return _oWrap.childNodes[0];
		}

		function _append(o,t)
		{
			t.appendChild(o);
		}

		function _after(o,t)
		{
			var P = t.parentNode;
			if(P.lastChild == o) P.appendChild(o);
			else P.insertBefore(o,t.nextSibling);
		}

		function _before(o,t) {
			t.parentNode.insertBefore(o,t);
		}

		function _remove(o)
		{
			if (o && o.parentNode)
			{
				o.parentNode.removeChild(o);
			}
		}

		function _display(v,b)
		{
			v = typeof v == "string" ? G(v) : v;
			if (b == _aoUndefined)
			{
				return v.style.display != "none";
			}
			else
			{
				v.style.display = b ? "" : "none";
			}
		}

		//由于MI.Dialog 会对 dom节点 进行缓存，所以会出现两个id的dom，这里在隐藏dialog（end 回调），清空内容
		function _MIDialogCleanHack()
		{
			try
			{
				var _oBody = MI.dialog["_body"];
				_oBody.parentNode.removeChild(_oBody);
				MI.dialog["_cont"].innerHTML =  "";
			}
			catch (e)
			{
			}
		}
		//基础函数 }


		//通信 {
		var 
			//# if (!debug){
			_sHost = location.protocol + "//" + (window.PMHost || "t.qq.com") + "/",
			//# }else{
			//_sHost = location.protocol + "//pmdev.t.qq.com/",
			//# }
			_oUrl = {
				_LOG : _sHost + "inbox/getinvestigate.php?stat=wbpm",

				_PM_ADDR : _sHost + "inbox/pm_addr.php",
				//_PM_ADDR : _sHost + "cgi-bin/readtemplate?fun=addr&t=wbpm_mock&check=false&resp_charset=UTF8",

				_PM_LIST : _sHost + "inbox/pm_list.php",
				//_PM_LIST : _sHost + "cgi-bin/readtemplate?t=pm_list_mock&check=false&resp_charset=UTF8&appnm=pm_list&maxage=0",

				_PM_CONVERSATION : _sHost + "inbox/pm_conversation.php",
				//_PM_CONVERSATION : _sHost + "cgi-bin/readtemplate?t=pm_conversation_mock&check=false&resp_charset=UTF8&appnm=pm_conversation&maxage=0",

				_PM_COMPOSE : _sHost + "inbox/pm_mgr.php",
				//_PM_COMPOSE : _sHost + "cgi-bin/readtemplate?t=pm_mgr_mock&check=false&resp_charset=UTF8&maxage=0",

				_PM_UPLOADIMG : _sHost + "inbox/pm_uploadimg.php",

				_PM_MGR : _sHost + "inbox/pm_mgr.php",
				_WBPM_PROXY : _sHost + "proxy.html?v=110321"
			},
			_oProxyWin = null;

		//跨域，通过proxy交互数据

		try{document.domain='qq.com'}catch(e){}
		function _createProxy(_afOnload)
		{
			if (!_oProxyWin)
			{
				_createIframe(
					{
						src : _oUrl._WBPM_PROXY
					},
					function(_aoIframe)
					{
						_oProxyWin = _aoIframe.contentWindow;
						try
						{
							var _bFail = !_oProxyWin.xmlHttp;
						}
						catch(_oError)
						{
							_bFail = 1;
							_catchError(_oError, "createProxy");
						}
						//_oWin[UI.A(_aoIframe, "oid")] = null;
						_oWin[_aoIframe.getAttribute("oid")] = null;
						if (_bFail)
						{
							//加载失败
							//在IE，一个受信任页面，一个非受信任页面 互相访问，也会出现
							//todo log
							_oProxyWin = null;
						}
						(typeof _afOnload == "function") && _afOnload(_oProxyWin);
						return !!_oProxyWin;
					}
				);
			}
			else
			{
				(typeof _afOnload == "function") && _afOnload(_oProxyWin);
			}
		}

		PM.createProxy = _createProxy;

		function _setTimeStamp(_asTS)
		{
			if (_asTS)
			{
				PM.data.ts = parseInt(_asTS) - Math.floor(_now() / 1000);
			}
		}
		function _getTimeStamp()
		{
			return PM.data.ts + Math.floor(_now() / 1000);
		}

		var _sCgiExceptionText = "cgi exception",
			_oDefaultException =
			{
				title 	: _sCgiExceptionText,
				appname : "",
				errcode	: "0",
				errmsg  : ""
			};
		/**
		 *
		 *  @param {Object} _aoConfig 除了success和fail回调，_aoConfig与UI.ajax的参数相同
		 *  @param {Function} _afComplete function(_abSuccess, _aoJson)
		 */
		function _ajaxByProxy(_aoConfig, _afComplete)
		{
			if (!!_oProxyWin && _oWin.UI)
			{
				if (_aoConfig.single)
				{
					_aoConfig.xhr = _ajaxByProxy._oAjaxInst = _ajaxByProxy._oAjaxInst || _oProxyWin.xmlHttp();
					if (_ajaxByProxy._mfFail)
					{
						_aoConfig.xhr.abort();
						_ajaxByProxy._mfFail(false, _oDefaultException);
					}
				}
				else
				{
					_aoConfig.xhr = _aoConfig.xhr || _oProxyWin.xmlHttp();
				}

				var _oData = _aoConfig.data;
				//todo 打日志
				var _oLogContent = { url : _aoConfig.url.replace(/.*\//, "") },
					_oLogBegin = _now();
				for (var k in _oData)
				{
					if (k != "content" && _oData[k] && _oData[k].length < 32 )
					{
						_oLogContent[k] = _oData[k];
					}
				}

				_oData.ef = "js";
				_aoConfig.bUTF8 !== false && (_oData.resp_charset = "UTF8");
				_oData.pmlang = _oWin.MILang || "zh_CN";

				_aoConfig.timeout = _aoConfig.timeout || 20000;
				_aoConfig.success = function(_asData)
				{
					_oLogContent.success = 1;
					_oLogContent.logtm = _now() - _oLogBegin;
					_log("speedlog", 0, _oLogContent);

					_aoConfig.single && (_ajaxByProxy._mfFail = null);
					try
					{
						var _oJson = eval(_asData);
						_setTimeStamp(_oJson.ts);

						//灰度标志
						_setABLEMULTISEND(_oJson);
					}
					catch(_oError)
					{
						_oJson = _oDefaultException;
						_catchError(_oError, "ajaxByProxy");
					}
					_afComplete(_oJson.title != _sCgiExceptionText, _oJson);
				};
				_aoConfig.fail = function()
				{
					_oLogContent.success = 0;
					_oLogContent.logtm = _now() - _oLogBegin;
					_log("speedlog", 0, _oLogContent);

					_aoConfig.single && (_ajaxByProxy._mfFail = null);
					_afComplete(false, _oDefaultException);
				};
				_aoConfig.single && (_ajaxByProxy._mfFail = _aoConfig.fail);
				UI.ajax( _aoConfig );
			}
			else
			{
				_createProxy();
				_afComplete(false, _oDefaultException);
			}
		}
		//UI.ready(_createProxy);

		var _sMIRUN = "MIRun",
			_nMIRunInterval = 0,
			_MIRunList = [];

		function _wbpm_MIRun(_afCallback)
		{
			var _fMIRun = _oWin[_sMIRUN];
			if (_fMIRun)
			{
				if (_MIRunList.length)
				{
					clearInterval(_nMIRunInterval);
					for (var i = 0, _nLen = _MIRunList.length; i < _nLen; i++)
					{
						try
						{
							_fMIRun(_MIRunList[i]);
						}
						catch (_oError)
						{
							_catchError(_oError, "wbpm_MIRun");
						}
					}
				}
				try
				{
					(typeof _afCallback == "function") && _fMIRun(_afCallback);
				}
				catch (_oError)
				{
					_catchError(_oError, "wbpm_MIRun");
				}
			}
			else if (typeof _afCallback == "function")
			{
				_MIRunList.push(_afCallback);
				!_nMIRunInterval && (
					_nMIRunInterval = setInterval(arguments.callee, 200)
				);
			}
		}

		//日志{

		/**
		 *  打日志
		 *
		 *	@param {Integer} _anType 1: 写信, 2: 读列表, 3: 读会话, 4: 时间统计,  jserr
		 *
		 *
		 */
		function _log(_anType, _asSubType, _aoInfo)
		{
			/*
			var _sUin = _oWin.MI ? MI.Uin() : (/l?uin=o?(\d+);/.test(_oDoc.cookie)&& RegExp.$1),
				_oContent = [_oUrl._LOG, "&uin=", _sUin, "&type=", _anType, "&subtype=", _asSubType || 0, "&r=", _random()];
			for (var k in (_aoInfo || {}))
			{
				_oContent.push( "&", k, "=", encodeURIComponent(_aoInfo[k]) );
			}
			var _oLogger = PM.logger = PM.logger || [],
				_nIndex = _oLogger.length,
				_oImg = _oLogger[_nIndex] = new Image;
			_oImg.onload = _oImg.onerror = function()
			{
				_oLogger[_nIndex] = null;
			};			
			_oImg.src = _oContent.join('');
			*/
		}

		/**
		 *	时间统计
		 *
		 *  @param {String} _asName
		 *			pmlist: 进入私信列表时间统计
		 *			pmcompose : 在非私信页面上打开写私信对话框的时间统计
		 *
		 */
		function _speed(_asName, _abBaseTime, _anTime1, _anTime2, _anTime3)
		{
			var _nT1 = (_anTime1 - _abBaseTime) || 0,
				_nT2 = (_anTime2 - _abBaseTime) || 0,
				_nT3 = (_anTime3 - _abBaseTime) || 0;
			_wbpm_MIRun(function()
				{
					//给微博的
					var _sT_ASYN = "t_asyn_";
					if (_asName == _sPMLIST || _asName == _sPMCOMPOSE)
					{
						MI.Speed(_sT_ASYN + _asName, 1, _nT1, _nT2, _nT3);
					}
					//进入私信列表时间统计
					//MI.Speed("t_asyn_pmlist", 1, t1, t2, t3) //t1为wbpm.js加载完, t2为pm_list输入完，t3为用户看到私信列表所用的时间

					//在非私信页面上打开写私信对话框的时间统计
					//MI.Speed("t_asyn_pmcompose", 1, t1, t2, 0) //t1为wbpm.js加载完，t2为用户看到私信对话框所用的时间
				}
			);
			if (_asName == _sPMLIST)
			{
				_log(4, 2, { t1 : _nT1, t2 : _nT2, t3 : _nT3 } );
			}
			else if (_asName == _sPMCOMPOSE)
			{
				_log(4, 1, { t1 : _nT1, t2 : _nT2, t3 : _nT3 } );
			}
		}



		/**
		 * 错误收集函数
		 * @param {String} _asMsg
		 * @param {String} _asUrl
		 * @param {Number} _anLine
		 */
		function _doPageError(_asMsg, _asUrl, _anLine)
		{
			return; //先return掉，暂时不用
			try
			{
				var _fFunc = arguments.callee.caller,
					_fFuncParent = _fFunc && _fFunc.caller,
					_fFuncParPar = _fFuncParent && _fFuncParent.caller,
					_sFuncStr = (_fFunc || "null").toString(),
					_sFuncParStr = (_fFuncParent || "").toString(),
					_sFuncPPStr = (_fFuncParPar || "").toString(),
					_sSelfErr;

				// 不能执行已释放 Script 的代码 -- 过滤
				if (_asMsg.indexOf(" Script ") != -1)
				{
					return;
				}
				var _oContent = {
					msg : _asMsg,
					line : _anLine,
					url : _asUrl,
					func : _sFuncStr.substr(0, 100)
				}
				_log("jserr", 0, _oContent);

				debug([
						"error:",
						_asMsg,
						" line:",
						_anLine,
						" url:",
						_asUrl,
						" function:",
						_sFuncStr.substr(0, 100),
						_sFuncParStr ? " parent function:"
							+ _sFuncParStr.substr(0, 100) : "",
						_sFuncPPStr ? " parent parent function:"
							+ _sFuncPPStr.substr(0, 100) : ""
					]);
			}
			catch (_oError)
			{
			}
			return location.host.indexOf("pmdev.") != 0;
		}

		var _oSetErrorInterval = [5, 30, 60, 120],
			_nSetErrorIndex = 0;
		(function()
		{
			//由于mi基础库也会设置onerror，用轮询重新设置
			/*
			_oWin.onerror = _doPageError;
			if (_oSetErrorInterval[_nSetErrorIndex])
			{
				setTimeout(arguments.callee, _oSetErrorInterval[_nSetErrorIndex++] * 1000);
			}
			*/
		})();

		/**
		 *  用在catch部分
		 *
		 *
		 */
		function _catchError(_aoError, _asMsg)
		{
			_doPageError(_aoError.message, _asMsg, _aoError.number || _aoError.lineNumber || 0);
		}

		//日志}

		//通信 }


		//事件通信 {
		//这里粒度是功能点
		var _sADD = "add",
			//_sADDNEW = "addnew", //有新邮件
			_sDEL = "del",
			_sGENSTATUS = "genstatus",
			//_sUPDATE = "update",
			//_sUPDATEALL = "updateall", //用在需要所有列表更新
			//_sCHANGE = "change",
			//_sCOMPOSE = "compose",
			//_sDELCONVERSATION = "delconversation", //删除会话
			//_sDELSUBMAIL = "delsubmail", //删除会话的子私信
			_sSETUPROOM = "setuproom",
			_oEventList = {
				change : [
						//function(update, { tid : , time1: , time2 });

						//function(_asType[add,del,update,updateall], _avArgument1, _avArgument2, ...)
					],
				compose : [
						//function(_asTid)
					]
			};
		function _addEvent(_asEventType, _afFun)
		{
			//UI.isFunction(_afFun) && (_oEventList[_asEventType] = _oEventList[_asEventType] || []).push(_afFun);
			(_oEventList[_asEventType] = _oEventList[_asEventType] || []).push(_afFun);
		}
		function _delEvent(_asEventType, _afFun)
		{
			for (var _oList = _oEventList[_asEventType], i = _oList.length - 1; i >= 0; i--)
			{
				if (_oList[i] == _afFun)
				{
					_oList.splice(i, 1);
				}
			}
		}
		function _fireEvent(_asEventType, _aoArgument)
		{
			var _oList = _oEventList[_asEventType];
			if (_oList)
			{
				for (var _nLen = _oList.length, i = 0; i < _nLen; i++)
				{
					try
					{
						_oList[i].apply(this, _aoArgument)
					}
					catch (_oError)
					{
						//todo
						_catchError(_oError, "fireEvent");
					}
				}
			}
		}

		/**
		 *  简单的事件分配器
		 */
		function _simpleTagEvent(_aoEvent, _asType, _aoEventHandle, _aoContext)
		{
			_aoEvent = _aoEvent || _oWin.event;
			var _oTarget = UI.E(_aoEvent).target,
				_sValue;

			while(_oTarget && _oTarget.nodeName != 'HTML')
			{
				if( (_sValue = UI.A(_oTarget, _asType)) && _aoEventHandle[_sValue])
				{
					if (_aoEventHandle[_sValue].call(_aoContext, _aoEvent, _oTarget) === false)
					{
						break;
					}
				}
				_oTarget = _oTarget.parentNode;
			}
		}
		//事件通信 }

		//数据层 {
		//自动完成 {
		var _nGetAddrFromCgi = 0;
		function _getAddrFromCgi(_abUpdate)
		{
			if (PM.data.oAddrs && (PM.data.oAddrs.length > 1000 
				|| (_nGetAddrFromCgi && _now() - _nGetAddrFromCgi < 300000)) )
			{
				//为了减少后台压力
				return;
			}
			
			var _sLOCALSTORAGE = "storagepmaddress",
				_sLOCALSTORAGETIME = _sLOCALSTORAGE + "time";

			//尝试从本地获取数据
			function _toLocalStorage(_aoJson)
			{
				if (_oWin.MI)
				{
					var _oContent = ['['];
					for (var _oAddrList = _aoJson.info, i = 0, _nLen = _oAddrList.length; i < _nLen; i++)
					{
						//[ account, nickname, pinyin]
						_oContent.push(i ? ',' : '', '["', _oAddrList[i][0], '","', _oAddrList[i][1], '","', _oAddrList[i][2], '"]');
					}
					_oContent.push(']');
					MI.S(_sLOCALSTORAGE, _oContent.join(''));
					MI.S(_sLOCALSTORAGETIME, "" + _now());
				}
			}
			function _getLocalStorage()
			{
				if (_oWin.MI)
				{
					var _sInfo = MI.S(_sLOCALSTORAGE),
						_oInfo = null;
					try
					{
						return eval(_sInfo)
					}
					catch (e)
					{
					}
				}
				return null;
			}

			function _initAddress(_aoJson)
			{
				PM.data.oAddrs = _aoJson.info;
				for (var _oAddrList = _aoJson.info, i = _oAddrList.length - 1; i >= 0; i--)
				{
					var _oPinyin = _oAddrList[i][2],
						_oPinyinQuan = [_oPinyin.charAt(0)],
						_oPinyinTou = [_oPinyin.charAt(0)],
						_oArrayQuan = [0],
						_oArrayTou = [0],
						j = 1,
						_nIndex = 0,
						c;
					for (; j < _oPinyin.length; j++)
					{
						c = _oPinyin.charAt(j);
						if (c == '|')
						{
							c = _oPinyin.charAt(++j);
							_oPinyinTou.push(c);
							_oArrayTou.push(++_nIndex);
						}
						_oPinyinQuan.push(c);
						_oArrayQuan.push(_nIndex);
					}
					_oAddrList[i].push( [_oPinyinTou.join(''), _oArrayTou, _oPinyinQuan.join(''), _oArrayQuan ] );
				}
			}

			if (!PM.data.oAddrs || _abUpdate)
			{
				//获取本地存储
				var _nStorageTime = 0,
					_oStorageAddr = null;
				if (_oWin.MI)
				{
					_nStorageTime = parseInt(MI.S(_sLOCALSTORAGETIME));
					_oStorageAddr = _getLocalStorage();
				}

				if (_oStorageAddr && _nStorageTime && 
					(!_abUpdate && _now() - _nStorageTime < 10 * 60000
					|| _abUpdate && _now() - _nStorageTime < 3 * 60000 )
					)
				{
					_initAddress({
						info : _oStorageAddr
					});
				}
				else
				{
					_nGetAddrFromCgi = _now();
					_ajaxByProxy(
						{
							url : _oUrl._PM_ADDR,
							type : "get",
							data : {}
						},
						function(_abSuccess, _aoJson)
						{
							if (_abSuccess)
							{
								_initAddress(_aoJson);
								_toLocalStorage(_aoJson);
							}
						}
					);
				}
			}
		}

		function _filterAddr(_asValue)
		{
			var _sB_Begin = '<b unselectable="on">',
				_sB_End = '</b>',
				_sB = _sB_Begin + '$1' + _sB_End,

				_oHeadContent = [], //从开始就匹配
				_oNoHeadContent = [], //非_oHeadContent

				_oAddrs = PM.data.oAddrs;
			if (!_oAddrs)
			{
				_getAddrFromCgi();
				return _oHeadContent;
			}
			//if (!_asValue)
			//{
			//	return _oHeadContent;
			//}
			//if (_asValue.indexOf('@') == 0)
			//{
			//	_asValue = _asValue.substr(1);
			//}
			_asValue = _trim(_asValue.replace(/.*@/, ""));
			var _oReg1 = new RegExp("(" + _regFilter(_asValue) + ")", "i"),
				_bHead,
				_bAccord,
				_oAddr,
				_sAccountId,
				_sNickname;

			for (var i = 0, _nLen = _oAddrs.length; i < _nLen; i++)
			{
				_bAccord = false;
				_oAddr = _oAddrs[i];
				//1. nickname
				if ( (_sNickname = _oAddr[1].replace(_oReg1, _sB)) != _oAddr[1] )
				{
					_bHead = _sNickname.charAt(0) == "<";
					_bAccord = true;
					_sAccountId = _oAddr[0];
				}
				else if ( (_sAccountId = _oAddr[0].replace(_oReg1, _sB)) != _oAddr[0])
				{
					_bHead = _sAccountId.charAt(0) == "<";
					_bAccord = true;
					_sNickname = _oAddr[1];
				}
				else
				{
					//2. 全拼
					var _nIndex;

					if ((_nIndex = _oAddr[3][0].indexOf(_asValue)) >= 0)
					{
						//头字母配置
						_bAccord = true;
						_sAccountId = _oAddr[0];
						_sNickname = [_oAddr[1].substring(0, _nIndex), _sB_Begin, _oAddr[1].substr(_nIndex, _asValue.length), _sB_End, _oAddr[1].substr(_nIndex + _asValue.length)].join('');
						_bHead = _sNickname.charAt(0) == "<";
					}
					else
					{
						_nIndex = 0;
						while((_nIndex = _oAddr[3][2].indexOf(_asValue, _nIndex)) >= 0)
						{
							if (_nIndex == 0 || ( _oAddr[3][3][_nIndex - 1] != _oAddr[3][3][_nIndex]))
							{
								var _nLastBegin = _nIndex + _asValue.length >= _oAddr[3][3].length ? _oAddr[3][3].length : _oAddr[3][3][_nIndex + _asValue.length];
								_bAccord = true;
								_sAccountId = _oAddr[0];
								_sNickname = [
									_oAddr[1].substring(0, _oAddr[3][3][_nIndex]),
									_sB_Begin,
									_oAddr[1].substring(_oAddr[3][3][_nIndex], _nLastBegin),
									_sB_End,
									_oAddr[1].substr(_nLastBegin)
								].join('');
								_bHead = _sNickname.charAt(0) == "<";
								break;
							}
							_nIndex++;
						}
					}

				}
				if (_bAccord)
				{
					(_bHead ? _oHeadContent : _oNoHeadContent).push(['<div style="padding:0 4px;" unselectable="on" addr="', _oAddr[1], '|', _oAddr[0],'">', _sNickname, '(', _sAccountId, ")</div>"].join(''));
				}
			}
			return _oHeadContent.concat(_oNoHeadContent);
		}
		//自动完成 }

		/**
		 *  判断一个tid是否roomid
		 *  微博帐号：
		 *		请以字母开头
		 *		6-20 位字母、数字、下划线或减号
		 *		不与其他用户重复，开通后不能修改
		 */
		function _isRoomId(_asTid)
		{
			return /^\d/.test(_asTid);
		}

		/**
		 *  能否回复
		 *
		 *  @param {String|Object} _avTidOrInst
		 *  @return {Boolean} true 能回复，false，不能回复
		 */
		function _ableReply(_avTidOrInst)
		{
			var _oInst = typeof _avTidOrInst == "string" ? _getInst(_avTidOrInst) : _avTidOrInst;
			if (_oInst && !_oInst.mc)
			{
				//封住 腾讯薇薇，
				for (var i = 0; i < _oInst.mi.length; i++)
				{
					//以后多个封号，就用map
					if (_oInst.mi[i].a == "t")
					{
						return false;
					}
				}
			}
			return !_isExitRoom(_oInst);
		}
		PM.ableReply = _ableReply;

		/**
		 *  能否添加参与人
		 *
		 *  @param {String|Object} _avTidOrInst
		 *  @return {Boolean} true 能回复，false，不能回复
		 */
		function _ableInvite(_avTidOrInst)
		{
			var _oInst = typeof _avTidOrInst == "string" ? _getInst(_avTidOrInst) : _avTidOrInst;
			return _getABLEMULTISEND() && _oInst && _oInst.mi.length < _nINVITEMAX &&  _ableReply(_oInst);
		}

		/**
		 *  发信或回复
		 *
		 *	@param {Object} _aoParams
		 *		{
		 *			target : String 对方ID
		 *			content : String 内容
		 *
		 *		}
		 */
		function _sendToCgi(_aoParams, _afComplete)
		{
			_aoParams.func = "send";
			_ajaxByProxy(
				{
					bUTF8 : false,
					url : _oUrl._PM_COMPOSE,
					type : "post",
					data : _aoParams
				},
				_afComplete
			);
		}
		PM.sendToCgi = _sendToCgi;

		var _nINVITEMAX = 10; //多人会话参与人最多，包括自己

		/**
		 *  邀请
		 *
		 *  @param {Object} _aoParams {
		 *			target : account1,account2,account3,... 新邀请的人
		 *			roomid : string, 为roomid, 如果为空，就创建房间
		 *		}
		 */
		function _inviteToCgi(_aoParams, _afComplete)
		{
			//pm_mgr?func=addmember&target=a,b,c&roomid=XXX
			//如果roomid不传，就创建房间；否则把人加入到roomid对应的房间里
			_aoParams.func = "addmember";
			_ajaxByProxy(
				{
					url : _oUrl._PM_MGR,
					type : "post",
					data : _aoParams
				},
				_afComplete
			);
		}

		/**
		 *  添加关注人
		 *
		 *  @param {Object} _aoParams {
		 *			target : account1
		 *		}
		 */
		function _addFollowerToCgi(_aoParams, _afComplete)
		{
			_aoParams.func = "addfollow";
			_ajaxByProxy(
				{
					url : _oUrl._PM_MGR,
					type : "post",
					data : _aoParams
				},
				_afComplete
			);
		}

		/**
		 *  删除关注人
		 *
		 *  @param {Object} _aoParams {
		 *			target : account1
		 *		}
		 */
		function _delFollowerToCgi(_aoParams, _afComplete)
		{
			//使用微博的接口
			//http://t.qq.com/unfollow.php
			//u=icomes&r=1312894070803&veriCode=
			//{result:0,msg:'**'}
			if (!MI.url || !MI.url.unfollow)
			{
				_afComplete(false);
				return ;
			}

			var _aoConfig = {};
			_aoConfig.url = MI.url.unfollow; //  "http://mail.t.qq.com/unfollow.php", // 
			_aoConfig.type = "post";
			_aoConfig.data = {
					veriCode : "",
					r : Math.random(),
					u : _aoParams.target
				};
			_aoConfig.timeout = 20000;
			_aoConfig.success = function(_asData)
			{
				_afComplete(_asData.indexOf('result:0') > 0);
			};
			_aoConfig.fail = function()
			{
				_afComplete(false);
			};
			UI.ajax( _aoConfig );
		}

		/**
		 *  退出房间
		 *
		 *  @param {Object} _aoParams {
		 *			roomid : string, 为roomid
		 *		}
		 */
		function _exitRoomToCgi(_aoParams, _afComplete)
		{
			//func=quitroom&roomid=XXX
			_aoParams.func = "quitroom";
			_ajaxByProxy(
				{
					url : _oUrl._PM_MGR,
					type : "post",
					data : _aoParams
				},
				_afComplete
			);
		}

		//由于退出房间，是不可逆的，可以记下操作
		var _oExitRoom = {};

		/**
		 *	把自己的信息从mi去掉
		 *  @param {String} _asTid
		 */
		function _removeSelfFromMI(_asTid)
		{
			var _oInst = _getInst(_asTid);
			for (var i = _oInst.mi.length - 1; i >= 0; i--)
			{
				if (_oInst.mi[i].a == _oInst.ma)
				{
					_oInst.mi.splice(i, 1);
					_oExitRoom[_asTid] = 1;
					break;
				}
			}
		}

		/**
		 *  把自己的信息加入到mi，用来退出房间失败的回滚操作
		 *  @param {String} _asTid
		 */
		function _addSelfToMI(_asTid)
		{
			var _oInst = _getInst(_asTid);
			for (var i = _oInst.mi.length - 1; i >= 0; i--)
			{
				if (_oInst.mi[i].a == _oInst.ma)
				{
					_oInst.mi.splice(i, 1);
					return;
				}
			}
			_oExitRoom[_asTid] = 0;
			_oInst.mi.unshift({
				a : _oInst.ma,
				n : _oInst.mn,
				icn : _oInst.micn
			});
		}

		/**
		 *  判断是否已经退出了房间
		 *
		 *  @param {String|Object} _avTidOrInst
		 *  @return {Boolean} true 已经退出了或者数据对象未下载，否则，false
		 */
		function _isExitRoom(_avTidOrInst)
		{
			var _oInst = typeof _avTidOrInst == "string" ? _getInst(_avTidOrInst) : _avTidOrInst;
			if (!_oInst || _oExitRoom[_oInst.tid])
			{
				return true;
			}
			for (var i = _oInst.mi.length - 1; i >= 0; i--)
			{
				if (_oInst.mi[i].a == _oInst.ma)
				{
					return false;
				}
			}
			return true;
		}

		/**
		 *  对会话进行过滤，已退出房间[暂时不用]
		 *
		 *  @param {Object} _aoData pm_list,pm_conversation,pm_mgr输出的数据
		 */
		function _exitRoomFilter(_aoData)
		{
			if (_aoData.tid)
			{
				//会话
				if (_oExitRoom[_aoData.tid])
				{
					_removeSelfFromMI(_aoData.tid);
				}
			}
			else
			{
				for (var a = ["list1", "list2"], i = 0; i < 2 && _aoData[a[i]]; i++)
				{
					for (var _oList = _aoData[a[i]], j = _oList.length - 1; j >= 0; j--)
					{
						if (_oExitRoom[_oList[j].tid])
						{
							_removeSelfFromMI(_oList[j].tid);
						}
					}
				}
			}
		}


		//列表逻辑 {
		/**
		 *  删除私信
		 *
		 *
		 */
		function _delMailFromCgi(_asTid, _afComplete)
		{
			var _oMail = _getInst(_asTid),
				_sTid = _oMail.tid,
				_oParam = {};
			if (_oMail.ptid)
			{
				//删一封
				//多人会话
				_oParam.func = "delete";
				_oParam.id = _sTid;
				if (_isRoomId(_oMail.ptid))
				{
					//多人会话
					_oParam.roomid = _oMail.ptid;
				}
			}
			else if (_isRoomId(_sTid))
			{
				//删除一个房间
				_oParam.func = "deleteall";
				_oParam.roomid = _sTid;
			}
			else
			{
				//删一个人
				_oParam.func = "deleteall";
				_oParam.account = _sTid;
			}
			_ajaxByProxy(
				{
					url : _oUrl._PM_MGR,
					type : "post",
					data : _oParam
				}, function(_abSuccess, _aoJson)
				{
					_abSuccess && (_aoJson = null);
					_afComplete && _afComplete(_abSuccess, _aoJson);
				}
			);
		}

		function _setUnreadFromCgi(_asTid)
		{
			var _oParam = {};
			_oParam.func = "setallread";
			_ajaxByProxy(
				{
					url : _oUrl._PM_MGR,
					type : "post",
					data : _oParam
				}, function(_abSuccess, _aoJson)
				{
					if (_abSuccess)
					{
						_aoJson = null;
					}
					//_afComplete && _afComplete(_abSuccess, _aoJson);
				}
			);
		}


		/**
		 *  从cgi获取列表数据数据
		 *
		 *  @param {String} _asTid 如果为空，读所有列表的私信，如果非空，读取这个聚合私信tid的子私信
		 *
		 *	@param {Function} _afComplete function(_abSuccess, _aoException)
		 *
		 */
		function _getListFromCgi(_asTid, _afComplete)
		{
			var _oStatus = _getMailStatus(_asTid),
				_oParams = {};
			if (_oStatus)
			{
				_oParams.time1 = _oStatus.pt;
				_oParams.count1 = -50;
				_oParams.time2 = _oStatus.nt;
				_oParams.count2 = 50;
			}
			else
			{
				//第一次都下载50条
				_oParams.count1 = 50;
			}
			if (_asTid)
			{
				_oParams[_isRoomId(_asTid) ? "roomid" : "account"] = _asTid;
			}
			if (!_afComplete)
			{
				//默认如果没有回调，就是自动更新
				_oParams.auto = 1;
			}
			_oParams.r = _random();

			_ajaxByProxy(
				{
					url : _asTid ? _oUrl._PM_CONVERSATION : _oUrl._PM_LIST,
					type : "get",
					data : _oParams
				}, function(_abSuccess, _aoJson)
				{
					if (_abSuccess)
					{
						//_aoJson._mbFromCgi = true;
						//_setList(_aoJson);
						_delFilter(_aoJson);

						_setDataFromCgi(_aoJson, {_sType : _asTid ? _sCONVERSATION : _sLIST } );
						_aoJson = null;
					}
					_afComplete && _afComplete(_abSuccess, _aoJson);
				}
			);
		}


		/**
		 *  设置聚合邮件已读
		 *
		 */
		function _setReadFlag(_asTid)
		{
			//debug();
			var _oMail = _getInst(_asTid);
			if (_oMail.u)
			{
				_oMail.u = 0;
				for (var _oList = _oMail.list, i = _oList.length - 1; i >= 0; i--)
				{
					_oList[i].u = 0;
				}
			}
		}

		/**
		 *  记住拉取数据的前后时间点
		 *
		 */
		function _setListStatus(_aoData)
		{
			if (_aoData.manual)
			{
				return ;
			}
			var _sTid = _aoData.tid,
				_oStatMap = PM.data.oStatMap,
				_oStatus = _oStatMap[_sTid],
				_nNewTime,
				_nOldTime;

			if (_aoData.list1 && _aoData.list1.length)
			{
				_nNewTime = _aoData.list1[0].tm;
				_nOldTime = _aoData.list1[_aoData.list1.length - 1].tm;
			}
			if (_aoData.list2 && _aoData.list2.length)
			{
				_nNewTime = _nNewTime || _aoData.list2[0].tm;
				_nOldTime = _aoData.list2[_aoData.list2.length - 1].tm;
			}
			if (_oStatus)
			{
				_oStatus.pt < _nNewTime && (_oStatus.pt = _nNewTime);
				_oStatus.nt > _nOldTime && (_oStatus.nt = _nOldTime);
			}
			else if (_nNewTime && _nOldTime)
			{
				_oStatMap[_sTid] = {
					tid : _sTid,
					pt : _nNewTime,
					nt : _nOldTime
				};
			}
		}

		/**
		 * 由于cgi是合并输出的，把ma,mn,micn与a,n,icn设置
		 *
		 */
		function _setInfo(_aoData)
		{
			for (var a = ["list1", "list2"], i = 0; i < 2 && _aoData[a[i]]; i++)
			{
				for (var j = _aoData[a[i]].length - 1; j >= 0; j--)
				{
					var _oInst = _aoData[a[i]][j];
					if (!_oInst.a)
					{
						_oInst.icn = _aoData.icn;
						_oInst.n = _aoData.n;
						_oInst.a = _aoData.a;
						_oInst.f = _aoData.f;
						_oInst.v = _aoData.v;

					}
					if (!_oInst.ma)
					{
						_oInst.micn = _aoData.micn;
						_oInst.mn = _aoData.mn;
						_oInst.ma = _aoData.ma;
						_oInst.mv = _aoData.mv;
					}

					if (_oInst.mi)
					{
						//排重，由于tony的号能自己发给自己
						for (var ii = 0, _nLen = _oInst.mi.length, _oMap = {}, _oArray = []; ii < _nLen; ii++)
						{
							if (!_oMap[_oInst.mi[ii].a])
							{
								_oArray.push(_oInst.mi[ii]);
								_oMap[_oInst.mi[ii].a] = 1;
							}
						}
						_oInst.mi = _oArray;
					}
				}
			}

			if (_aoData && _aoData.mi)
			{
				//排重，由于tony的号能自己发给自己
				for (var ii = 0, _nLen = _aoData.mi.length, _oMap = {}, _oArray = []; ii < _nLen; ii++)
				{
					if (!_oMap[_aoData.mi[ii].a])
					{
						_oArray.push(_aoData.mi[ii]);
						_oMap[_aoData.mi[ii].a] = 1;
					}
				}
				_aoData.mi = _oArray;
			}


		}

		//新邮件的更新，同时事件
		//getList只是从cache中获取数据
		//	如果cache没有对应的数据或者不够，返回null，由V层调用_getListFromCgi，--》_setList，会触发"新邮件的更新", 但是不会触发旧邮件，这时，V层调用_getList获取相应的数据
		//_getLlist的回调与事件有冲突，可能


		//由于conv与list同一时间只显示一个，能没有list就存在conv，但是在list上向新account（没有这个account，或account在下一页）发信，就需要虚构list与conv来显示
		//这里统一虚构，如果在插入mail时，没有conv(没有这个account，或还没有调用pm_conversation读数据)，虚构conv；如果在插入conv时，没有list（本身没私信，或还没有调用pm_list读数据），虚构list
		//虚构数据插入，不响应genstatus时间

		//如果在列表上回复，
		//如果在会话上回复，_oPMail不为空，所以都是真实的
		function _makeupList(_aoData)
		{
			var _oMail = _getInst(_aoData.ptid),
				_firstConv = _aoData.list1.length ? _aoData.list1[0] : _aoData.list2[0];
			return {
				manual : 1,
				//ts不用
				ptid : _sTOPTID,
				tid : _sTOPTID,
				t : (_oMail && _oMail.t || 0) + (_aoData.t ? 1 : 0),	//注意，这里虚构
				u : (_oMail && _oMail.u || 0) + (_aoData.u ? 1 : 0),
				list1 : _firstConv ? [
					{
						manual : _aoData.manual,
						ptid : _sTOPTID,
						tid : _aoData.tid,
						st : _aoData.st,
						t : _aoData.t,
						u : _aoData.u,
						a : _firstConv.a,
						n : _firstConv.n,
						f : _firstConv.f,
						v : _firstConv.v,
						icn : _firstConv.icn,
						ma : _aoData.ma,
						mn : _aoData.mn,
						micn : _aoData.micn,
						mv : _aoData.mv,
						licn : _aoData.licn,

						s : _firstConv.s,
						tm : _firstConv.tm,
						img : _firstConv.img,
						audio : _firstConv.audio,
						c : _firstConv.c,
						oc : _firstConv.oc,
						sr : _firstConv.sr,

						//多人会话
						mc : _aoData.mc,
						mi : _aoData.mi,

						list : []
					}
				] : [],
				list2 : []
			};
		}

		//manual为1，作为虚构的标志位，在_queryListConv，读取整一页时用
		//manual为1，不会影响读取缓存的下一页

		//用在没有私信，第一次发私信，这时的构造是真实的
		//如果没有读取列表数据，直接读取会话，这时的构造不真实
		//
		/*
		function _makeupConversation(_aoData)
		{
			var _oMail = _getInst(_aoData.ptid),
				_bMC = _aoData.mc,
				_bMI = _aoData.mi;
			delete _aoData.mc;
			delete _aoData.mi;
			return {
				manual : 1,
				//ts不用
				ptid : _sTOPTID,
				tid : _aoData.ptid,
				t : (_oMail && _oMail.t || 0) + 1, //虚构
				u : (_oMail && _oMail.u || 0) + _aoData.u , //虚构
				s : _aoData.s,
				tm : _aoData.tm,
				img : _aoData.img,
				audio : _aoData.audio,
				c : _aoData.c,
				oc : _aoData.oc,
				sr : _aoData.sr,
				a : _aoData.a,
				n : _aoData.n,
				f : _aoData.f,
				icn : _aoData.icn,
				ma : _aoData.ma,
				mn : _aoData.mn,
				micn : _aoData.micn,
				//多人会话
				mc : _bMC,
				mi : _bMI,

				list1 : [_aoData],
				list2 : []
			};
		}
		*/

		var _sLIST = "list",
			_sCONVERSATION = "conversation",
			_sMAIL = "mail";
		/**
		 *  从cgi获取数据，整理存储到内存中
		 *
		 *  @param {Object} _aoConfig {
		 *		_sType : list|conversation|mail  (mail替代pm_mgr)
		 *		//写在数据上 _bManual : true|false 是否虚构 false是cgi输出
		 *
		 *	}
		 *
		 */
		function _setDataFromCgi(_aoData, _aoConfig)
		{
			_setInfo(_aoData);
			switch(_aoConfig._sType)
			{
				//	case _sMAIL:
				//		//写信返回
				//		var _oMail = _getInst(_aoData.tid);
				//		if (!_oMail)
				//		{
				//			var _oConv = _makeupConversation(_aoData);
				//			if (!_getInst(_oConv.tid))
				//			{
				//				_setListConv(_makeupList(_oConv), { _sType : _sLIST });
				//			}
				//			_setListConv(_oConv, { _sType : _sCONVERSATION });
				//		}
				//		//else
				//		//{
				//		//	可能存在，写信pm_mgr，接着自动更新pm_conversation，这是pm_conversation带上了新写信的信息，且比pm_mgr快返回
				//		//}
				//		break;
			case _sCONVERSATION:
				//list与conversation下载顺序没要求
				if (!_getInst(_aoData.tid))
				{
					//_setListConv(_makeupList(_aoData), { _sType : _sLIST });
					_setListToCache(_makeupList(_aoData));
				}
				_setListStatus(_aoData);
				_setConvToCache(_aoData);
				break;
			case _sLIST:
				_setListStatus(_aoData);
				//_setListConv(_aoData, _aoConfig);
				_setListToCache(_aoData);
				break;
			}
			
			//显示异步加载的图片
			setTimeout(function(){
				MI.Crs(1);
			},100);
		}

		function _setDataFromCompose(_aoData)
		{
			//debug();
			if (!PM.data.oInstMap)
			{
				//profile tip发信
				return;
			}

			var _oMail = _getInst(_aoData.tid),
				_nLen = _aoData.list1.length,
				_nSystem = 0;

			_aoData.manual = 1;
			_aoData.t = (_oMail && _oMail.t || 0) + _nLen;
			_aoData.u = _oMail && _oMail.u || 0;

			for (var i = _aoData.list1.length - 1; i >= 0; i--)
			{
				_nSystem += _aoData.list1[i].a == _SYSTEM_ACCOUNT ? 1 : 0;
			}
			_aoData.st = (_oMail && _oMail.st || 0) + _nSystem;

			//if (_nLen == 2)
			//{
			//	//此时是拉人操作
			//	var _oSysMail = _aoData.list1[1];
			//	_oSysMail.a = _SYSTEM_ACCOUNT;
			//	_oSysMail.n = _SYSTEM_NAME;
			//	_oSysMail.f = _SYSTEM_FOLLOW;
			//	_oSysMail.icn = _SYSTEM_ICON;
			//
			//	if (!_oMail)
			//	{
			//	}
			//}
			if (_isRoomId(_aoData.tid))
			{
				//如果在列表，不处理
				//如果在会话，需要换房间
				//由视图层判断处理
				_fireEvent(_sSETUPROOM, [ _aoData ]);
			}
			_setDataFromCgi(_aoData, { _sType : _sCONVERSATION });

		}

		/**
		 *
		 *
		 *	@param {Object} _aoExistList[in]
		 *  @param {Object} _aoNewList1[in,out]
		 *  @param {Object} _aoNewList2[in,out]
		 *	@return {Array}
		 */
		function _eliminateDuplication(_aoExistList, _aoNewList1, _aoNewList2, _aoStatus, _abList, _asTid)
		{
			//排重
			var	_oExistList = [],
				_oDataMap = [null, {}, {}],
				_oDelListId = [],
				//_nFrontSystem = 0, //多少封系统邮件
				_nFrontConflictSystem = 0, //多少封系统邮件冲突
				_nFrontConflict = 0,
				_nFrontConflickUnread = 0;
			for (var i = 1; i < 3; i++)
			{
				for (var _oNewList = i == 1 ? _aoNewList1 : _aoNewList2, j = _oNewList.length - 1; j >= 0; j--)
				{
					_oDataMap[i][_oNewList[j].tid] = 1;
				}
			}

			//1. 由于会话，需要过滤重复
			//2. 由于写信不是调用pm_list，就支持插入邮件，会造成重复，也会造成_oStatus为undefined
			//防止连续写，丢失显示
			for (var i = 0, _nExistListLen = _aoExistList.length; i < _nExistListLen; i++)
			{
				var _oExistListItem = _aoExistList[i],
					_bFront = !_aoStatus || _oExistListItem.tm > _aoStatus.pt;

				//_bFront && _oExistListItem.a == _SYSTEM_ACCOUNT && _nFrontSystem++;

				if (_oDataMap[1][_oExistListItem.tid])
				{
					//与list1重复
					_nFrontConflict++;
					_oExistListItem.a == _SYSTEM_ACCOUNT && _nFrontConflictSystem++;
					_oExistListItem.u && _nFrontConflickUnread++;
					_oDelListId.push(_oExistListItem.tid);
				}
				else if (_oDataMap[2][_oExistListItem.tid])
				{
					//与list2重复
					_oDelListId.push(_oExistListItem.tid);
				}
				else if ( _bFront || _oExistListItem.tm < _aoStatus.nt)
				{
					_oDelListId.push(_oExistListItem.tid);

					if (_bFront)
					{
						_nFrontConflict++;
						_oExistListItem.a == _SYSTEM_ACCOUNT && _nFrontConflictSystem++;
						_oExistListItem.u && _nFrontConflickUnread++;
					}
					//[算法]不考虑_aoNewList1或_aoNewList2的顺序，不使用增量比较，反正这种操作概率很小
					//把不重复数据添加上去，这些数据由于超前拉取得到的或由于删除子邮件而移位
					_oNewList = _bFront ? _aoNewList1 : _aoNewList2;
					for (var j = 0, _nNewListLen = _oNewList.length; j < _nNewListLen && _oNewList[j].tm >= _oExistListItem.tm; j++);
					_oNewList.splice(j, 0, _oExistListItem);
				}
				else
				{
					_oExistList.push(_aoExistList[i]);
				}
			}
			if (_oDelListId.length)
			{
				//删除事件
				_fireEvent(_sDEL, [_oDelListId, { _bList : _abList, _sTid : _asTid } ]);
			}
			return {
				//_nFrontSystem : _nFrontSystem,
				_nFrontConflictSystem : _nFrontConflictSystem,
				_nFrontConflict : _nFrontConflict,
				_nFrontConflickUnread : _nFrontConflickUnread,
				_oList : _oExistList
			};
		}
		/**
		 *  设置list数据，pm_list与pm_conversation的设置
		 *  private，由_setDataFromCgi调用
		 *
		 *
		 *  list: [时间按从新到旧排序]
		 *	触发事件
		 *	{
		 *		pdtid : 插入比dom时间小的位置
		 *		ndtid : 插入比dom时间大的位置
		 *		list : [时间按从新到旧排序]
		 *	}
		 */
		/**
		 *  列表放进缓存
		 *
		 */
		function _setListToCache(_aoData)
		{
			var _bManual = !!_aoData.manual,
				_sTid = _aoData.tid,
				_oExistInstance = _getInst(_sTid);

			if (!_oExistInstance)
			{
				//第一次加载list
				_aoData.list = _aoData.list1;
				delete _aoData.list1;
				delete _aoData.list2;
				PM.data.oInstMap[_sTid] = _aoData;
				_setInstMap(_aoData.list);

				_fireEvent( _sADD, [
					{
						pdtid : null,
						ndtid : null,
						data : _aoData,
						list : _aoData.list
					},
					{
						_bList : 1,
						_sTid : _aoData.tid
					}
				] );
				_fireEvent(_sGENSTATUS, [
					{
						tid : _aoData.tid,
						t : _aoData.t,
						u : _aoData.u
					},
					{
						_bList : 1
					}
				] );
				return;
			}


			//排重
			var	_oDataList1 = _aoData.list1,
				_oDataList2 = _aoData.list2,
				_oExistList = _eliminateDuplication(_oExistInstance.list, _oDataList1, _oDataList2, _getMailStatus(_sTid), 1, _sTid)._oList;

			_oExistInstance.manual = _bManual;
			_oExistInstance.list = _oDataList1.concat(_oExistList).concat(_oDataList2);

			//需要把会话list放回进去
			for (var _oTmpInst, i = _oExistInstance.list.length - 1; i >= 0; i--)
			{
				if (_oTmpInst = _getInst(_oExistInstance.list[i].tid))
				{
					if (_oTmpInst.t != _oExistInstance.list[i].t) //_oTmpInst.u != _oExistInstance.list[i].u
					{
						//证明conversation的数据有新数据（没考虑被删帖情况)
						_oExistInstance.list[i].manual = 1;
					}
					_oExistInstance.list[i].list = _oTmpInst.list;
				}
			}

			if (_oDataList1.length)
			{
				//插入头部，新邮件提醒
				_fireEvent(_sADD, [
					{
						pdtid : null,
						ndtid : _oExistList.length ? _oExistList[0].tid : null,
						data : _oExistInstance,
						list : _oDataList1
					},
					{
						_bList : 1,
						_sTid : _aoData.tid
					}
				]);
			}

			//末尾的，不用事件，用getList的回调
			//if (_oDataList2.length)
			//{
				//插入末尾(一般少用)
				//	_fireEvent(_sADD, [ {
				//		pdtid : _oExistList.length ? _oExistList[_oExistList.length - 1].tid : null,
				//		ndtid : null,
				//		data : _oExistInstance,
				//		list : _oDataList2
				//	}, { _bList : _bList, _sTid : _aoData.tid } ]);
			//}

			//总数，未读数
			var _nOldTotal = _oExistInstance.t,
				_nOldUnread = _oExistInstance.u;
			_oExistInstance.t = _aoData.t;
			_oExistInstance.u = _aoData.u;
			if (_nOldTotal != _oExistInstance.t || _nOldUnread != _oExistInstance.u)
			{
				_fireEvent(_sGENSTATUS, [
					{
						tid : _oExistInstance.tid,
						t : _oExistInstance.t,
						u : _oExistInstance.u
					},
					{
						_bList : 1
					}
				] );
			}

			_setInstMap(_oExistInstance.list);
		}

		/**
		 *  会话放进缓存
		 *
		 */
		function _setConvToCache(_aoData)
		{
			var _bManual = !!_aoData.manual,
				_sTid = _aoData.tid,
				_oExistInstance = _getInst(_sTid),
				
				_oDataList1 = _aoData.list1,
				_nDataList1Len = _oDataList1.length,
				_oDataList2 = _aoData.list2,
				_oDuplication =  _eliminateDuplication(_oExistInstance.list, _oDataList1, _oDataList2, _getMailStatus(_sTid), 0, _sTid),
				_oExistList = _oDuplication._oList;

			//总数，与未读数，js来维护，为了增加或删除问题
			var _nTotle,
				_nUnread,
				_nSystem;
			if (_oExistInstance.manual || (!_oExistInstance.list.length && _aoData.t) )
			{
				//第一次初始化
				_nTotle = _aoData.t;
				_nUnread = _aoData.u;
				_nSystem = _aoData.st;
			}
			else
			{
				_nTotle = _oExistInstance.t + _oDataList1.length - _oDuplication._nFrontConflict;
				_nUnread = _oExistInstance.u - _oDuplication._nFrontConflickUnread;

				//_nSystem = _oExistInstance.st + _oDuplication._nFrontSystem - _oDuplication._nFrontConflictSystem;
				_nSystem = _oExistInstance.st - _oDuplication._nFrontConflictSystem;

				for (var i = _oDataList1.length - 1; i >= 0; i--)
				{	
					_oDataList1[i].a == _SYSTEM_ACCOUNT && _nSystem++;
					_oDataList1[i].u && _nUnread++;
				}
			}

			//会话状态修改
			var _nOldTotal = _oExistInstance.t,
				_nOldSystem = _oExistInstance.st,
				_nOldUnread = _oExistInstance.u;
			_oExistInstance.t = _nTotle;
			_oExistInstance.u = _nUnread;
			_oExistInstance.st = _nSystem;

			//todo 这里不考虑，允许发送标志位f中途改变的情况，如果要做，需要与cgi确认

			if (_nOldTotal != _oExistInstance.t || _nOldUnread != _oExistInstance.u || _nOldSystem != _oExistInstance.st)
			{
				_fireEvent(_sGENSTATUS, [
					{
						tid : _oExistInstance.tid,
						st : _oExistInstance.st,
						t : _oExistInstance.t,
						u : _oExistInstance.u
					},
					{
						_bList : 0
					}
				] );
			}
			//多人会话参与人变化了
			_oExistInstance.mc = _aoData.mc;
			_oExistInstance.mi = _aoData.mi;

			//列表状态修改
			var _oListInstance = _getInst(_sTOPTID); //_sTOPTID == _aoData.ptid
			if (_nOldUnread == 0 && _oExistInstance.u != 0)
			{
				_oListInstance.u++;
				_fireEvent(_sGENSTATUS, [
					{
						tid : _oListInstance.tid,
						t : _oListInstance.t,
						u : _oListInstance.u,
						f : _oListInstance.f
					},
					{
						_bList : 1
					}
				] );
			}

			//假如，会话有两封子邮件(tm:100, tm98)，列表上时间是tm:100，读进会话，第一封却是tm:98，这时，需要调整列表 todo

			if (_oDataList1.length)
			{
				//todo

				var _nNid = _oExistList.length ? _oExistList[0].tid : null;
				_oExistList = _oDataList1.concat(_oExistList);

				//插入头部，新邮件提醒
				_fireEvent(_sADD, [
					{
						pdtid : null,
						ndtid : _nNid,
						data : _oExistInstance,
						list : _oDataList1
					},
					{
						_bList : 0,
						_sTid : _aoData.tid
					}
				] );

				//修改列表对应项

				//列表是不显示系统信息
				//for (var i = 0; i < _oDataList1.length; i++)
				//{
				//	if (_oDataList1[i].a != _SYSTEM_ACCOUNT)
				//	{
				//		break;
				//	}
				//}
				var i = 0;
				if (i < _oDataList1.length)
				{
					var _oFirstMail = _oDataList1[i],
						_nFirstMailTime = _oFirstMail.tm;

					_oExistInstance.c = _oFirstMail.c;
					_oExistInstance.oc = _oFirstMail.oc;
					_oExistInstance.s = _oFirstMail.s;
					_oExistInstance.sr = _oFirstMail.sr;
					_oExistInstance.img = _oFirstMail.img;
					_oExistInstance.audio = _oFirstMail.audio;
					//modify
					//if (_oExistInstance.mc)
					//{
					_oExistInstance.a = _oFirstMail.a;
					_oExistInstance.n = _oFirstMail.n;
					_oExistInstance.f = _oFirstMail.f;
					_oExistInstance.v = _oFirstMail.v;

					_oExistInstance.icn = _oFirstMail.icn;
					_oExistInstance.licn = _aoData.licn;
					//}


					if (_oExistInstance.tm < _nFirstMailTime)
					{
						//对列表重新排序
						_oExistInstance.tm = _nFirstMailTime;

						//删除
						for (var _oListItems = _oListInstance.list, i = 0, _nLen = _oListItems.length; i < _nLen && _oListItems[i].tid != _oExistInstance.tid; i++);
						if (i < _nLen)
						{
							_oListItems.splice(i, 1);

							//删除事件
							_fireEvent( _sDEL, [ [_oExistInstance.tid], { _bList : true, _sTid : _oExistInstance.ptid } ] );
						}

						//插入
						if (i >= _oListItems.length || _oListItems[i].tm < _nFirstMailTime)
						{
							_oListItems.unshift(_oExistInstance);

							//插入头部
							_fireEvent(_sADD, [
								{
									pdtid : null,
									ndtid : _oListItems.length > 1 ? _oListItems[1].tid : null,
									data : _oListInstance,
									list : [_oExistInstance]
								},
								{
									_bList : 1,
									_sTid : _oListInstance.tid
								}
							]);
						}
						else
						{
							for (var _nLen = _oListItems.length; i < _nLen && _oListItems[i].tm > _nFirstMailTime; i++);
							_oListItems.splice(i, 0, _oExistInstance);

							//插入中间
							_fireEvent(_sADD, [
								{
									pdtid : i - 1 >= 0 ? _oListItems[i - 1].tid : null,
									ndtid : _oListItems[i + 1] ? _oListItems[i + 1].tid : null,
									data : _oListInstance,
									list : [_oExistInstance]
								},
								{
									_bList : 1,
									_sTid : _oListInstance.tid
								}
							]);
						}
					}
				}
			}
			if (_oDataList2.length)
			{
				//var _nPid = _oExistList.length ? _oExistList[_oExistList.length - 1].tid : null;

				_oExistList = _oExistList.concat(_oDataList2);

				//末尾的，不用事件，用getList的回调
				//if (_oDataList2.length)
				//{
				//	插入末尾(一般少用)
				//	_fireEvent(_sADD, [ {
				//		pdtid : _nPid,
				//		ndtid : null,
				//		data : _oExistInstance,
				//		list : _oDataList2
				//	}, { _bList : _bList } ]);
				//}
			}
			_oExistInstance.list = _oExistList;
			_setInstMap(_oExistInstance.list);
			_oExistInstance.manual = _bManual;
		}

		/**
			{
				tid : {
						_bSuccess : 0|1 cgi返回成功
						_nTime : 时间
						_nBeforeTime : 0或number//某个时间点以下都删除
						如果没有_nBeforeTime，就是删除一封，否则就是清空
					}
			}

			清空操作特殊情况：读会话，回复一封，这时，会话显示可能不完整，回复那封之前还有没显示的，这是清空，主要是显示最新的那封为时间点，而不是最后拉取cgi的时间戳

			暂时没有清空操作，需要与cgi确认 如何表现
		 */
		var _oDelFilterMap = {};

		/**
		 *  
		 *
		 *
		 */
		function _addDelFilter(_asTid)
		{
			var _oInfo = _getInst(_asTid);
			_oDelFilterMap[_asTid] = {
				_bSuccess : 0, //cgi还没返回
				_nTime : _oInfo.tm,
				_nBeforeTime : _oInfo.ptid ? 0 : (_oInfo.list.length ? _oInfo.list[0].tm : _oInfo.tm)
			};
		}

		/**
		 *  
		 *
		 *
		 */
		function _delFilter(_aoData)
		{
			var _sTid = _aoData.tid,
				_oAlias;
			for (var a = ["list1", "list2"], i = 0; i < 2 && _aoData[a[i]]; i++)
			{
				for (var _oList = _aoData[a[i]], j = _oList.length - 1; j >= 0; j--)
				{
					if (_oAlias = _oDelFilterMap[_oList[j].tid])
					{
						if (_oAlias._nBeforeTime > _oList[j].tm || _oAlias._nTime == _oList[j].tm)
						{
							_oList.splice(j, 1);
							_aoData.manual = 1;
							//此时，可能认为总数与未读数与服务器不一致
						}
					}
				}
			}
		}

		/**
		 *
		 *
		 */
		function _delList(_asTid)
		{
			//debug();
			var _oMail = _getInst(_asTid),
				_sPTid = _oMail.ptid,
				_oPMail = _getInst(_sPTid),
				_nPListLen = _oPMail.list.length,
				_oEventCfg = {_bList : true, _sTid : _sPTid};

			_addDelFilter(_asTid);

			_delMailFromCgi(_asTid);

			for (var _oPList = _oPMail.list, j = 0; j < _nPListLen && _oPList[j] != _oMail; j++);
			_oPList.splice(j, 1);
			_fireEvent(_sDEL, [[_oMail.tid], _oEventCfg]);
			_delInstMail(_asTid);

			//调整未读数
			var _nOldTotal = _oPMail.t,
				_nOldUnread = _oPMail.u;
			_oPMail.t--;
			if (_oMail.u)
			{
				_oPMail.u--;
			}
			if (_nOldTotal != _oPMail.t || _nOldUnread != _oPMail.u)
			{
				_fireEvent(_sGENSTATUS, [
					{
						tid : _oPMail.tid,
						t : _oPMail.t,
						u : _oPMail.u
					},
					{
						_bList : 1
					}
				] );
			}
		}

		/**
		 *  删除邮件
		 *
		 *
		 */
		function _delMail(_asTid)
		{
			var _oMail = _getInst(_asTid),
				_sPTid = _oMail.ptid,
				_oPMail = _getInst(_sPTid),
				_nPListLen = _oPMail.list.length,
				_oEventCfg = {_bList : 0, _sTid : _sPTid};
			//如果会话邮件只有一封子私信，被删除掉，相当于删除会话邮件

			_addDelFilter(_asTid);
			_delMailFromCgi(_asTid);

			//特殊情况：读一封聚合邮件，显示1条子私信，删除这封子私信，返回列表，类表也会删除这封聚合邮件

			//删除会话私信的子私信
			//if (_nPListLen == 1)
			//{
			//	_delList(_sPTid);
			//}

			//不用调整列表的总数与未读数，进入列表后，对应项的未读数都设为0

			//删除子私信
			for (var i = _nPListLen - 1; i >= 0 && _oPMail.list[i] != _oMail; i--);
			_oPMail.list.splice(i, 1);
			//删除事件
			_fireEvent(_sDEL, [[_oMail.tid], _oEventCfg]);
			_delInstMail(_asTid);

			//调整未读数
			var _nOldTotal = _oPMail.t,
				//_nSystem 系统邮件不能删除的
				_nOldUnread = _oPMail.u;
			_oPMail.t--;
			if (_oMail.u)
			{
				_oPMail.u--;
			}
			if (_nOldTotal != _oPMail.t || _nOldUnread != _oPMail.u)
			{
				//列表与会话都触发
				_fireEvent(_sGENSTATUS, [
					{
						tid : _oPMail.tid,
						t : _oPMail.t,
						u : _oPMail.u
					},
					{
						_bList : 0
					}
				] );
			}

			//调整列表

			var _nBeforeTime1 = _oPMail.tm,
				_nDelTime1 = _oMail.tm;

			if (i == 0)
			{
				//删除第一封，修改调整在list的位置
				if (_oPMail.list.length > 0)
				{
					//需要修改list
					var _oTmpFirstItem = _oPMail.list[0];
					_oPMail.tm = _oTmpFirstItem.tm;
					_oPMail.c = _oTmpFirstItem.c;
					_oPMail.oc = _oTmpFirstItem.oc;
					_oPMail.s = _oTmpFirstItem.s;
					_oPMail.sr = _oTmpFirstItem.sr;
					_oPMail.img = _oTmpFirstItem.img;
					_oPMail.audio = _oTmpFirstItem.audio;
					//modify
					_oPMail.a = _oTmpFirstItem.a;
					_oPMail.n = _oTmpFirstItem.n;
					_oPMail.f = _oTmpFirstItem.f;
					_oPMail.v = _oTmpFirstItem.v;


					_oPMail.icn = _oTmpFirstItem.icn;
					//todo 列表头像不变
					//_oPMail.licn = _oTmpFirstItem.licn;

				}
				else
				{
					_oPMail.c = _oPMail.oc = _oPMail.sr = _oPMail.img = _oPMail.audio = "";
					_oPMail.s = false;
				}

				for (var _oPPList = _getInst(_oPMail.ptid).list, j = 0, _PPListLen = _oPPList.length; j < _PPListLen && _oPPList[j] != _oPMail; j++);
				_oPPList.splice(j, 1);

				//删除事件
				_fireEvent(_sDEL, [ [_oPMail.tid], {_bList : 1, _sTid : _oPMail.ptid} ]);
				//如果列表只有1条私信，在会话删除，这条应该不会被删除，是一个测试点
				//if(_getMailStatus(_oPMail.ptid).nt <= _oPMail.tm)
				//{
				if (_oPMail.list.length)
				{
					//调整聚合私信的位置，就是重新插入
					for (var _PPListLen = _oPPList.length; j < _PPListLen && _oPPList[j].tm > _oPMail.tm; j++);
					_oPPList.splice(j, 0, _oPMail);

					//插入
					_fireEvent(_sADD, [
						{
							pdtid : _oPPList[j - 1] ? _oPPList[j - 1].tid : null,
							ndtid : _oPPList[j + 1] ? _oPPList[j + 1].tid : null,
							data : _getInst(_oPMail.ptid),
							list : [_oPMail]
						},
						{
							_bList : 1,
							_sTid : _oPMail.ptid
						}
					]);
				}

			}
		}


		/**
		 *
		 *  获取列表
		 *  如果返回不为null，从缓存返回；如果为null，调用_afComplete(_aoJson)返回，_aoJson可能为异常
		 *
		 *
		 *  @param {Object} _aoParams
		 *		{
		 *			tid :
		 *			page : integer 如果有page，就用分页，如果undefined就是滚动
		 *			count : 多少项
		 *
		 *			nocgi : true | false, 不再请求cgi
		 *
		 *		}
		 *		//用于以下情况
		 *		//{	用于翻页
		 *		//	page : 从0开始
		 *		//	count : 默认(20)
		 *		//} 或
		 *		{	用于整页重画
		 *			tid : string
		 *			mode : turn | scroll
		 *			count : integer
		 *			等价与 page : 0, count : 20
		 *		} 或
		 *		{	用于滚动，时间小于私信tid2的n封私信
		 *			tid : string
		 *			mode : turn|scroll
		 *			count : integer
		 *			tid2 : string|function(){ return string }
		 *			count : 默认(20)
		 *		}
		 *
		 *  @return
		 *
		 */
		function _queryListConv(_aoParams)
		{
			var _sTid = _aoParams.tid || "",
				_bList = _sTid == _sTOPTID,
				_oMail = _getInst(_sTid),
				_nCount = _aoParams.count || 20,
				_oResult = null;
				//_sMode = PM.data.mode;
			//debug(["_queryListConv _oMail", !!_oMail]);
			if (_oMail)
			{
				var _oList = _oMail.list,
					_oResultList = [];
				if (_aoParams.page != _aoUndefined || _aoParams.mode != _aoUndefined)
				{
					//整页刷新
					var _nPage = _aoParams.page || 0;

					if ( !_aoParams.nocgi &&
						(
						_oMail.manual //需要从cgi确认
						|| _sTid && _oList.length && (_oList[0].oc != _oMail.oc || _oList[0].tm != _oMail.tm) //从列表进入会话
						)
					   )
					{
						debug("_queryListConv error1");
					}
					else
					{
						for (var i = _nCount * _nPage, _nLen = i + _nCount; i < _nLen && _oList[i]; i++)
						{
							_oResultList.push(_oList[i]);
						}
						//由于每次拉取，都会从头部拉完，从尾部拉取部分，所以通过总数与已经拉取的数据来判断是结尾

						//这里怎么判断是结尾呢
						if(_oResultList.length >= _nCount || _oMail.t <= _oList.length || _aoParams.nocgi)
						{
							//没考虑翻页
							//显示数据
							_fireEvent( _sADD, [
								_oResult = {
									pdtid : null,
									ndtid : null,
									//pp : !!_nPage, //还有没前一页
									//np : _oMail.t > _oList.length || _oList.length > _nLen,  //还有没下一页

									data : _oMail,
									list : _oResultList,
									expt : _aoParams.expt
								},
								{
									_bList : _bList,
									_bAsync : !!_aoParams.nocgi,
									_sTid : _oMail.tid
								}
							] );
							return _oResult;
						}
					}
				}
				else if (_aoParams.tid2 != _aoUndefined)
				{
					//与响应list1的事件不会重复
					var _sTids = typeof _aoParams.tid2 == "string" ? _aoParams.tid2 : _aoParams.tid2();
					for (var i = _oList.length - 1; i >= 0 && _oList[i].tid != _sTids; i--)
					{
						_oResultList.unshift(_oList[i]);
					}
					//极端例子：拉取下一页，把列表全部删除，下一页补上去，这时_sTids为null
					if (i >= 0)
					{
						_oResultList = _oResultList.slice(0, _nCount);

						if (_oResultList.length >= _nCount || _oMail.t <= _oList.length || _aoParams.nocgi)
						{
							_fireEvent( _sADD, [
								_oResult = {
									pdtid : _sTids,
									ndtid : null,
									data : _oMail,
									//pp : !!i, //还有没前一项
									//np : _oMail.t > _oList.length || i + 1 + _oResultList.length < _oList.length, //还有没下一项
									list : _oResultList,
									expt : _aoParams.expt
								},
								{
									_bList : _bList,
									_bAsync : !!_aoParams.nocgi,
									_sTid : _oMail.tid
								}
							] );
							return _oResult;
						}
					}
					else
					{
						//输出的tid2有误，不会出现
						debug(["_queryListConv tid2 error"]);
					}
				}
			}
			!_aoParams.nocgi && _getListFromCgi(_sTid, function(_abSuccess, _aoException)
				{
					_aoParams.nocgi = true;
					_aoParams.expt = _aoException;
					!_oResult && _queryListConv(_aoParams);
				}
			);
			//debug(["_queryListConv _oResult", !!_oResult]);

			return _oResult;
		}

		/**
		 *  获取邮件参与人的信息
		 *
		 *	@param {String|Object} _asTidOrInst tid 或者 _getInst(tid)
		 *	@param {Boolean} _abAccount true 获取帐号account，false获取昵称(nickname)
		 *  @param {String} _asType 值为"account", "name", "icon"
		 *  @param {String} 分隔符，默认为,
		 *  @return {String} ***,***
		 */
		function _getInfoString(_asTidOrInst, _asType, _asIncludeMe, _asSeparator)
		{
			_asType = {
					account : "a",
					name : "n",
					icon : "icn"
				}[_asType];
			_asSeparator = _asSeparator || (_asType == "a" ? _sSEPARATEADDRCGI : _sSEPARATEADDR);
			var _oInst = typeof _asTidOrInst == 'string' ? _getInst(_asTidOrInst) : _asTidOrInst,
				_oAccount = [];

			if (!_oInst.mc && _oInst.mi.length == 1 && _oInst.mi[0].a == _oInst.ma)
			{
				_asIncludeMe = true;
			}

			for (var mi = _oInst.mi, i = 0, len = mi.length; i < len; i++)
			{
				if (_asIncludeMe || mi[i].a != _oInst.ma)
				{
					_oAccount.push(mi[i][_asType]);
				}
			}
			return _oAccount.join(_asSeparator);
		}
		PM.getInfo = _getInfoString;

		function _getInst(_asTid)
		{
			return PM.data.oInstMap ? PM.data.oInstMap[_asTid] : null;
		}

		function _getMailStatus(_asTid)
		{
			return PM.data.oStatMap[_asTid];
		}

		function _setInstMap(_aoList)
		{
			for (var i = _aoList.length - 1; i >= 0; i--)
			{
				PM.data.oInstMap[_aoList[i].tid] = _aoList[i];
			}
		}
		
		function _delInstMail(_asTid)
		{
			PM.data.oInstMap[_asTid] = null;
			delete PM.data.oInstMap[_asTid];
		}

		function _delMailStatus(_asTid)
		{
			PM.data.oStatMap[_asTid] = null;
			delete PM.data.oStatMap[_asTid];
		}
		//列表逻辑 }

		//数据层 }


		//列表表现逻辑 {
		function _hashTid(_asTid)
		{
			location.hash = "pmtid=" + _asTid;
		}

		/**
		 *  @desc 显示错误信息
		 *
		 *  @param {Object} _aoErrJson {errcode:string, errcode:string}
		 *  @param {Object} _asDefaultMsg
		 *  @param {Integer} _anHideTime 默认3秒
		 */
		function _showError(_aoErrJson, _asDefaultMsg, _anHideTime)
		{
			(new MI.Dialog).showTip({
				//html	: _aoErrJson.errcode < -100 ? _aoErrJson.errmsg : _asDefaultMsg,
				html	: _aoErrJson.errmsg || _asDefaultMsg,
				ico		: 'ico_te',
				delay	: _anHideTime || 3000
			});
		}

		//listControl, recordControl 公用代码
		var _common = {
			_showother : function(_aoSelf, _aoEvent, _aoTarget)
			{
				//UI.E(_aoEvent).prevent();
				//UI.E(_aoEvent).stop();
				var _oSelf = _aoSelf,
					_oUnit = UI.parents(_aoTarget, "wbpmunit")[0],
					_sTid = _oUnit ? A(_oUnit, "tid") : _oSelf._moCfg.sTid,
					_oOtherNick = G(_oSelf._getDomId("othernick" + _sTid)),
					_sTimeout = A(_oOtherNick, "timeout"),
					_oOtherlist = G(_oSelf._getDomId("otherlist" + _sTid));
				_oOtherlist.style.left = (_oOtherNick.offsetLeft - 20) + "px";

				_oUnit && (_oUnit.style.zIndex = 2);
				_display(_oOtherlist, 1);

				var _nClientHeight = UI.windowHeight(),
					_nScrollTop = UI.scrollY(),
					_nListHeight = _oOtherlist.offsetHeight + UI.getY(_oOtherlist),
					_nScrollRemainder = _nListHeight - _nClientHeight - _nScrollTop;
				if (_nClientHeight + _nScrollTop < _nListHeight)
				{
					//向上显示
					_oOtherlist.style.top = (_oOtherNick.offsetTop - _oOtherlist.offsetHeight) + "px";
				}

				if (_sTimeout)
				{
					clearTimeout(_sTimeout);
					A(_oOtherNick, "timeout", "");
				}
				
				//return false;
			},

			_hideother : function(_aoSelf, _aoEvent, _aoTarget)
			{
				//listControl
				//UI.E(_aoEvent).prevent();
				//UI.E(_aoEvent).stop();
				var _oSelf = _aoSelf,
					_oUnit = UI.parents(_aoTarget, "wbpmunit")[0],
					_sTid = _oUnit ? A(_oUnit, "tid") : _oSelf._moCfg.sTid,
					_oOtherNick = G(_oSelf._getDomId("othernick" + _sTid)),
					_sTimeout = A(_oOtherNick, "timeout"),
					_oOtherlist = G(_oSelf._getDomId("otherlist" + _sTid));
				//_oOtherlist.style.left = _oOtherNick.offsetLeft - 20;
				if (_sTimeout)
				{
					clearTimeout(_sTimeout);
				}
				_sTimeout = setTimeout(function()
					{
						_display(_oOtherlist, 0);
						_oUnit.style.zIndex = "";
					},
					200
				);
				A(_oOtherNick, "timeout", _sTimeout);

				//return false;
			}
		};


		//_listControl与_recordControl有相同的代码，可以抽取出来

		var _FIRST_LIST_COUNT = 30,
			_NEXT_LIST_COUNT = 10;
		function _listControl(_aoCfg)
		{
			this._init(_aoCfg);
		}

		/**
		 *
		 */
		_listControl.prototype =
		{
			//_isAtive : function()
			//{
			//	return !!this._moDom;
			//},

			_isShow : function()
			{
				return _isSee(this._moDom);
			},

			_getDomId : function(_asId)
			{
				return "wbpmlist" + (_asId || "");
			},

			_getLastItem : function()
			{
				//跟_recordControl重复
				//html上保证，<div>内没有空格或换行，保证没有text node
				return G(this._getDomId("items")).lastChild;
			},

			_displayItems : function(_abErr)
			{
				//跟_recordControl重复
				var _oSelf = this,
					_sLoading = _oSelf._getDomId("loading"),
					_sLoaderr = _oSelf._getDomId("loaderr"),
					_sNomail = _oSelf._getDomId("nomail"),
					_sItems = _oSelf._getDomId("items");
				_display(_sLoading, 0);
				if (_abErr)
				{
					_display(_sLoaderr, 1);
					_display(_sNomail, 0);
					_display(_sItems, 0);
				}
				else if (_oSelf._getLastItem())
				{
					_display(_sLoaderr, 0);
					_display(_sNomail, 0);
					_display(_sItems, 1);
				}
				else
				{
					_display(_sLoaderr, 0);
					_display(_sNomail, 1);
					_display(_sItems, 0);
				}
				return _oSelf;
			},

			/**
			 *
			 *  与MI基础库无关
			 *  @param _aoTids [tid1, tid2, ...]
			 *
			 */
			_delete : function(_aoTids)
			{
				//_listControl
				//debug();

				var _oSelf = this;
				for (var i = _aoTids.length - 1; i >= 0; i--)
				{
					_remove( G(_oSelf._getDomId(_aoTids[i])) );
				}
				_oSelf._displayItems();
				_resizeList();
			},

			/**
			 *
			 *
			 *  与MI基础库无关
			 *  @param {Object} _aoParam
			 *		{
			 *			ptid :
			 *			ndtid :
			 *			list : [时间从新到旧]
			 *		}
			 */
			_add : function(_aoParam)
			{
				//debug("list._add");
				//debug();

				var _oSelf= this,
					_oList = _aoParam.list,
					_nLen = _oList.length,
					_oTmpl = PM.TMPL.listItem,
					_oDom,
					_oNewDom;
				if ( _aoParam.ndtid && (_oDom = G(_oSelf._getDomId(_aoParam.ndtid))) )
				{
					for (var i = 0; i < _nLen; i++)
					{
						_oNewDom = _html(_oTmpl(_oList[i]));
						_before(_oNewDom, _oDom);
					}
				}
				else if( _aoParam.pdtid && (_oDom = G(_oSelf._getDomId(_aoParam.pdtid))) )
				{
					for (var i = _nLen - 1; i >= 0; i--)
					{
						_oNewDom = _html(_oTmpl(_oList[i]));
						_after(_oNewDom, _oDom);
					}
				}
				else if (_aoParam.ndtid == null && _aoParam.pdtid == null)
				{
					//整页刷新
					var _oItems = G( _oSelf._getDomId("items") );
					_oItems.innerHTML = "";
					if (_nLen > 0)
					{
						//可能出现expt存在与_nLen>0，是
						for (var i = 0; i < _nLen; i++)
						{
							_oNewDom = _html(_oTmpl(_oList[i]));
							_append(_oNewDom, _oItems);
						}
					}
					else if (_aoParam.expt)
					{
						_display(_oSelf._getDomId("loaderr"), 1);
					}
					_oSelf._displayItems(!!_aoParam.expt);

					var _fShow = _oSelf._moCfg.onshow;
					_fShow && _fShow();
				}
				_display(_oSelf._getDomId("loadmore"), 0);
				_resizeList();
				_oSelf._initTips();
				if (_oWin.UI && UI.B.ie)
				{
					_oSelf._moDom.style.behavior = "";
				}
			},

			//整块div更新，包括显示下载中，错误情况
			_show : function(_abRefresh)
			{
				//debug("list._show");
				//debug();
				//与_recordControl几乎重复
				var _oSelf = this,
					_oCfg = _oSelf._moCfg,
					_sMode = _sSCROLL, //PM.data.mode,
					_oListTmpl = PM.TMPL.list;

				_oCfg.oDom.innerHTML = _oListTmpl({
					tid : _oCfg.sTid,
					loading : true
				});
				_abRefresh && _queryListConv({
					mode : _sSCROLL, //PM.data.mode,
					count : _FIRST_LIST_COUNT,
					tid : _oCfg.sTid
				});
				_resizeList();
				return _oSelf;
			},

			_showErr : function(_aoData)
			{
				//跟_recordControl重复
				//只loading下，才显示错误，
				//可能自动更新重拉了数据
				var _oSelf = this,
					_sLoading = _oSelf._getDomId("loading"),
					_sLoaderr = _oSelf._getDomId("loaderr"),
					_sNomail = _oSelf._getDomId("nomail");
				if (_display(_sLoading))
				{
					_display(_sLoading, 0);
					_display(_sLoaderr, 1);
				}
				return _oSelf;
			},

			_updateTime : function()
			{
				var _oSelf = this,
					_oPubTimes = UI.GC(_oSelf._moDom, "span.pubtime");
				for (var i = _oPubTimes.length - 1; i >= 0; i--)
				{
					_oPubTimes[i].innerHTML = PM.formatDate( A(_oPubTimes[i], "tm") );
				}
				return _oSelf;
			},

			_destroy : function()
			{
				//list
				var _oSelf = this;
				if (_oSelf._moDom)
				{
					_oSelf._moDom = null;
					_delEvent(_sDEL, _oSelf._mfDel);
					_delEvent(_sADD, _oSelf._mfAdd);
					_delEvent(_sGENSTATUS, _oSelf._mfStatus);

					if (_oSelf._mfScrollHandle)
					{
						UI.ER(_oWin, "scroll", _oSelf._mfScrollHandle);
						_oSelf._mfScrollHandle = null;
					}

					_oSelf._moGetNewerTimer && _oSelf._moGetNewerTimer._destroy();
					_oSelf._moUpdateTimeTimer && _oSelf._moUpdateTimeTimer._destroy();
				}
				return _oSelf;
			},

			//事件层{
			_listreply : function(_aoEvent, _aoTarget)
			{
				UI.E(_aoEvent).prevent();

				var _oSelf = this,
					_sAccontId = A( G(_oSelf._getDomId("items" )), "tid" ),
					_oUnit = UI.parents(_aoTarget, "wbpmunit")[0],
					_sTid = _oUnit && A(_oUnit, "tid") || "",
					_oMail = _getInst(_sTid),
					_oComposeControl,
					_oAccount = [],
					_oName = [],
					_oPerson,
					_sAccount = _getInfoString(_sTid, "account", true),
					_sName = _getInfoString(_sTid, "name");
				MI.dialog = MI.dialog || new (MI.Dialog);

				MI.dialog.show({
					width:590,
					noReserve : true,
					//title : '',//
					html : PM.TMPL.replydlg({
						cid : "dlg",
						c : _oMail.s ? '' : _oMail.c,
						a : _sTid,
						n : _sName
					}),

					start:function()
					{
						var _oDom = MI.dialog["_cont"];
						_oComposeControl = new _composeControl(
							{
								oDom : MI.dialog["_cont"],
								sCid : "dlg",
								bDlg : true,

								nFrom : 4,

								sTo : _sAccount,
								sTid : _sTid,
								onsendcomplete : function(_abSuccess, _aoParam)
								{
									MI.dialog.hide();
								}
							}
						);
						setTimeout(function()
							{
								UI.GC(_oDom,  "div.replycontent > textarea")[0].focus();
							}, 10
						);
					},
					end : function()
					{
						_oComposeControl && _oComposeControl._destroy();
						//解决缓存dom
						_MIDialogCleanHack();
					}
				});

				_log(1, 4);

				//MI.Bos('btnOpenSendMsg');
				return false;
			},

			_over : function(_aoEvent, _aoTarget)
			{
				UI.addClass(_aoTarget, "wbpmlistover");
			},

			_out : function(_aoEvent, _aoTarget)
			{
				UI.removeClass(_aoTarget, "wbpmlistover");
			},

			_read : function(_aoEvent, _aoTarget)
			{
				UI.E(_aoEvent).prevent();

				var _oSelf = this,
					_oUnit = UI.hasClass(_aoTarget, "wbpmunit") ? _aoTarget : UI.parents(_aoTarget, "wbpmunit")[0],
					_sTid = A(_oUnit, "tid"),
					_oPmrecord = G("pmrecord");

				UI.hide(_oSelf._moDom);
				UI.scrollTo(_oDoc.body, 0, 0);
				UI.show(_oPmrecord);

				//var _oUnread = UI.GC(_oUnit, "span.unread")[0],
				var _oUnreadcnt = UI.GC(_oUnit, "span.unreadcnt")[0];


				_gotoListConv(0, {
					sTid : _sTid,

					_nUnread : _oUnreadcnt ? parseInt(_oUnreadcnt.innerHTML) : 0, //头_nUnread封模拟未读
					//_nUnread : 0,

					onclose : function()
					{
						//debug();

						_oSelf._updateTime();
						_resizeList();

						var _oUnit = G(_oSelf._getDomId(_sTid));
						UI.GC(_oUnit, "div.operate")[0].className = "operate wbpmallreaddiv";
						var _oUnreadSpan = UI.GC(_oUnit, "div.readstatus > span")[0];
						_oUnreadSpan && (_oUnreadSpan.className = "");
					}
				});

				//if (_oUnread)
				//{
				//	UI.removeClass(_oUnread, "unread");
				//}
				//if (_oUnreadcnt)
				//{
				//	_oUnreadcnt.innerHTML = "";
				//	_oUnreadcnt.style.display = "none";
				//}

				return false;
			},

			//写新私信
			_compose : function(_aoEvent, _aoTarget)
			{
				UI.E(_aoEvent).prevent();

				//var _sTid = A(_aoTarget, "tid") || "";
				var _oComposeControl;
				MI.dialog = MI.dialog || new (MI.Dialog);
				MI.dialog.show({
					width:590,
					noReserve : true,
					//title : '',//
					html : PM.TMPL.compose({
						cid : "dlg",
						//n : _sTid ? _getInst(_sTid).n : ""
						n : ""
					}),

					start:function()
					{
						var _oDom = MI.dialog["_cont"];
						_oComposeControl = new _composeControl(
							{
								oDom : MI.dialog["_cont"],
								sCid : "dlg",
								bDlg : true,

								nFrom : 2,
								//sTid : _sTid,
								onsendcomplete : function(_abSuccess, _aoParam)
								{
									MI.dialog.hide();
								}
							}
						);
						//(_sTid ? UI.GC(_oDom,  "div.replycontent > textarea") : UI.GC(_oDom, "div.receiver > input"))[0].focus();
						//debug();
						setTimeout(function()
							{
								UI.GC(_oDom, "div.receiver > textarea")[0].focus();
							}, 10
						);
					},
					end : function()
					{
						_oComposeControl && _oComposeControl._destroy();
						_MIDialogCleanHack();
					}
				});

				_getAddrFromCgi();

				_log(1, 2);

				//MI.Bos('btnOpenSendMsg');
				return false;

			},

			_empty : function(_aoEvent, _aoTarget)
			{
				UI.E(_aoEvent).prevent();
				UI.E(_aoEvent).stop();

				var _oSelf = this,
					_oUnit = UI.parents(_aoTarget, "wbpmunit")[0],
					_sTid = A(_oUnit, "tid"),
					_oRmConfirm = UI.GC(_oUnit, "div.wbpmrmconfirm")[0],
					_oA = UI.GC(_oRmConfirm, "a")[1];
				UI.addClass(_oUnit, _sWBPMREMOVE);
				_oA.focus();
				_oSelf._moDom.style.behavior = "";

				if (UI.B.ie)
				{
					_oRmConfirm.onfocusout = function()
					{
						UI.removeClass(_oUnit, _sWBPMREMOVE);
					};
				}
				else
				{
					if (!A(_oRmConfirm, "sb"))
					{
						//不考虑释放事件
						_oRmConfirm.addEventListener("blur",
							function()
							{
								UI.removeClass(_oUnit, _sWBPMREMOVE);
							},
							true
						);
						A(_oRmConfirm, "sb", "1");
					}
					_oRmConfirm.onmousedown = function()
					{
						return false;
					};
				}
				return false;
			},

			_removeConfirm : function(_aoEvent, _aoTarget)
			{
				//跟_recordControl重复

				var _oSelf = this,
					_oUnit = UI.parents(_aoTarget, "wbpmunit")[0],
					_oRmConfirm = UI.GC(_oUnit, "div.wbpmrmconfirm")[0],
					_oEvent = UI.E(_aoEvent),
					_sInfo = A(_aoTarget, "info");
				_oEvent.prevent();
				_oEvent.stop();
				if(_sInfo == "y")
				{
					_delList(A(_oUnit, "tid"));

					_oSelf._displayItems();
					_resizeList();

					//todo，会出现删除+查询
					_queryListConv( {
						tid : _oSelf._moCfg.sTid,
						tid2 : function()
							{
								return A( _oSelf._getLastItem(), "tid");
							},
						count : 1
					} );
				}
				else if (_sInfo == "n")
				{
					UI.removeClass(_oUnit, _sWBPMREMOVE);
				}
				return false;
			},

			_showother : function(_aoEvent, _aoTarget)
			{
				return _common._showother(this, _aoEvent, _aoTarget);
			},

			_hideother : function(_aoEvent, _aoTarget)
			{
				return _common._hideother(this, _aoEvent, _aoTarget);
			},



			//翻页
			//	_turn : function(_aoEvent, _aoTarget)
			//	{
			//		UI.E(_aoEvent).prevent();
			//		var _oSelf = this;
			//
			//		return false;
			//	},

			_stopPropagation : function(_aoEvent, _aoTarget)
			{
				UI.E(_aoEvent).stop();
				return false;
			},

			_preventDefault : function(_aoEvent, _aoTarget)
			{
				UI.E(_aoEvent).prevent();
			},

			//设置，或取消滚动事件
			_scrollEvent : function()
			{
				var _oSelf = this;
				if (PM.data.mode == "turn")
				{
					if (_oSelf._mfScrollHandle)
					{
						UI.ER(_oWin, "scroll", _oSelf._mfScrollHandle);
						_oSelf._mfScrollHandle = null;
					}
				}
				else
				{
					if (!_oSelf._mfScrollHandle)
					{
						var _bLoadingTime = 0;
						UI.EA(_oWin, "scroll", _oSelf._mfScrollHandle = function()
							{
								var _oWbpmlistitems = G( _oSelf._getDomId("items") ),
									_nClientHeight = UI.windowHeight(),
									_nScrollTop = UI.scrollY(),
									_nListHeight = _oSelf._moDom.offsetHeight + UI.getY(_oSelf._moDom),
									_nScrollRemainder = _nListHeight - _nClientHeight - _nScrollTop;

								if ( _display(_oSelf._getDomId("items")) && _bLoadingTime > -1 && _now() - _bLoadingTime > 200
									&& _oSelf._isShow()
									&& _nScrollRemainder < 200
									&& _oWbpmlistitems.childNodes.length < _getInst(_oSelf._moCfg.sTid).t
									)
								{
									//debug(["_nScrollRemainder2", _nScrollRemainder]);
									_bLoadingTime = _now();
									UI.show(_oSelf._getDomId("loadmore"));

									_queryListConv( {
										tid : _oSelf._moCfg.sTid,
										tid2 : function()
											{
												return A(_oWbpmlistitems.lastChild, "tid");
											},
										count : _NEXT_LIST_COUNT
									} );
								}
							}
						);
					}
				}
				return _oSelf;
			},

			_initTips : function()
			{
				//list
				var _oSelf = this;
				_wbpm_MIRun(function()
				{
					MI.app({
						Base : function(){
							setTimeout(function(){
								if (_oSelf._moDom)
								{
									MI.Card.build(_oSelf._moDom,'.wbpmunit .icon img', 1);
									MI.Card.build(_oSelf._moDom,'.wbpmunit .users_index a', 2);
									MI.Card.build(_oSelf._moDom,'.wbpmunit em a', 2);

									MI.tips.build({
										area : _oSelf._moDom,
										width : 236,
										txt : MI.TalkList.prototype.urlTips,
										target : '.wbpmurl'
									});

								}
							},100);
						}
					});
					var _oUrls = UI.GC(_oSelf._moDom, 'a.wbpmurl').concat( UI.GC(_oSelf._moDom, 'a.wbpmaccount') ).concat( UI.GC(_oSelf._moDom, 'a.wbpmurlfrom') );
					for (var i = _oUrls.length - 1; i >= 0; i--)
					{
						UI.A(_oUrls[i], "ck", "stop");
					}
				});
				return _oSelf;
			},

			_initEvent : function()
			{
				//list
				var _oSelf = this;
				_oSelf._mfDel = function(_aoList, _aoCfg)
				{
					//debug();

					if (_oSelf._moDom && _aoCfg._bList)
					{
						_oSelf._delete(_aoList);
					}
				};
				_addEvent(_sDEL, _oSelf._mfDel);

				_oSelf._mfAdd = function(_aoParam, _aoCfg)
				{
					//debug();

					if (_oSelf._moDom && _aoCfg._bList)
					{
						_oSelf._add(_aoParam);
					}
				};
				_addEvent(_sADD, _oSelf._mfAdd);

				_oSelf._mfStatus = function(_aoParam, _aoCfg)
				{
					//if (_oSelf._moDom && !_aoParam.tid)
					//{
						//调整私信未读数
						//var _oCountMsg = G(_sNEWCOUTMSG);
						//if (_oCountMsg)
						//{
							//_oCountMsg.innerHTML = _aoParam.u ? "(" + _aoParam.t + ")" : "";
						//	_oCountMsg.innerHTML = "";
						//}
					//}
				};
				_addEvent(_sGENSTATUS, _oSelf._mfStatus);

				//_oSelf._initTips();

				_wbpm_MIRun(function()
				{
					if (!_oSelf._moDom)
					{
						return ;
					}
					var _oEvents =
					{
						listreply : _oSelf._listreply,
						//remove : _oSelf._remove,
						over : _oSelf._over,
						out : _oSelf._out,
						read : _oSelf._read,
						compose : _oSelf._compose,
						empty : _oSelf._empty,
						rmcfm : _oSelf._removeConfirm,

						showother : _oSelf._showother,
						hideother : _oSelf._hideother,
						//turn : _oSelf._turn,
						prevent : _oSelf._preventDefault,
						stop : _oSelf._stopPropagation
					};

					_oSelf._moDom.onclick = function(_aoEvent)
					{
						_simpleTagEvent(_aoEvent, "ck", _oEvents, _oSelf);
					};

					_oSelf._moDom.onmouseover = function(_aoEvent)
					{
						_simpleTagEvent(_aoEvent, "mor", _oEvents, _oSelf);
					};

					_oSelf._moDom.onmouseout = function(_aoEvent)
					{
						_simpleTagEvent(_aoEvent, "mot", _oEvents, _oSelf);
					};

					_oSelf._scrollEvent();

					//自动更新
					//这个可以不要，通过监听微博side的私信未读数来更新
					_oSelf._moGetNewerTimer = new _timer( {
						//_nBeginTime: 1000,
						//_nSpeed : 0,
						//_nEndTime : 120000,
						_ontimer : function()
						{
							_getListFromCgi(_oSelf._moCfg.sTid);
							//通过事件通知
						}
					} )._start();

					_oSelf._moUpdateTimeTimer = new _timer( {
						_nBeginTime: 60000,
						_nSpeed : 0,
						_nEndTime : 60000,
						_ontimer : function()
						{
							_oSelf._updateTime();
						}
					} )._start();

				});

				return _oSelf;
			},
			//事件层}

			/**
			 *
			 * @param {Object} _aoCfg
			 *		{
			 *			oDom : 一般为pmlist或pmrecord的div
			 *			sTid : inbox|具体的tid
			 *
			 *
			 *		}
			 */
			_init : function(_aoCfg)
			{
				var _oSelf = this;
				_oSelf._moCfg = _aoCfg;
				_oSelf._moDom = _aoCfg.oDom;
				 _oSelf._nPage = 0;
				_oSelf._initEvent()._show(!_aoCfg._bExtData);
			}
		};


		//会话内容的
		function _recordControl(_aoCfg)
		{
			this._init(_aoCfg);
		}

		var _FIRST_RECORD_COUNT = 30,
			_NEXT_RECORD_COUNT = 20,
			_sWBPMRECORDOVER = "wbpmrecordover",
			_sWBPMLOADINGMORE = "wbpmloadingmore",
			_oRecordHasShow = {};
		_recordControl.prototype = {

			//_isAtive : function()
			//{
			//	return !!this._moDom;
			//},

			_isShow : function()
			{
				return _isSee(this._moDom);
			},

			_getDomId : function(_asId)
			{
				return "wbpmrecord" + (_asId || "");
			},

			_getLastItem : function()
			{
				//html上保证，<div>内没有空格或换行，保证没有text node
				return G(this._getDomId("items")).lastChild;
			},

			_displayItems : function(_abErr)
			{
				//跟_listControl重复
				var _oSelf = this,
					_sLoading = _oSelf._getDomId("loading"),
					_sLoaderr = _oSelf._getDomId("loaderr"),
					_sNomail = _oSelf._getDomId("nomail"),
					_sItems = _oSelf._getDomId("items");
				_display(_sLoading, 0);
				if (_abErr)
				{
					_display(_sLoaderr, 1);
					_display(_sNomail, 0);
					_display(_sItems, 0);
				}
				else if (_oSelf._getLastItem())
				{
					_display(_sLoaderr, 0);
					_display(_sNomail, 0);
					_display(_sItems, 1);
				}
				else
				{
					_display(_sLoaderr, 0);
					_display(_sNomail, 1);
					_display(_sItems, 0);
				}
				return _oSelf;
			},

			//@param _aoTids [tid1, tid2, ...]
			_delete : function(_aoTids)
			{
				//debug();

				var _oSelf = this;
				for (var i = _aoTids.length - 1; i >= 0; i--)
				{
					_remove( G(_oSelf._getDomId(_aoTids[i])) );
				}
				_oSelf._displayItems();
				_resizeList();
			},

			/**
			 *
			 *  @param {Object} _aoParam
			 *		{
			 *			ptid :
			 *			ndtid :
			 *			list : [从新到旧]
			 *		}
			 */
			_add : function(_aoParam)
			{
				//debug("record._add");
				//debug();

				var _oSelf = this,
					_oList = _aoParam.list,
					_nLen = _oList.length,
					_oTmpl = PM.TMPL.recordItem,
					_oDom,
					_oNewDom,
					_bNew = 0,
					_bDisplayMore = 1;
				if ( _aoParam.ndtid && (_oDom = G(_oSelf._getDomId(_aoParam.ndtid))) )
				{
					_oSelf._removeUnreadBackground();
					for (var i = 0; i < _nLen; i++)
					{
						_oNewDom = _html(_oTmpl(_oList[i]));
						//A(_oNewDom, "unread", "1"); //1. 回复信，2. 收到新信
						if (!_oRecordHasShow[_oList[i].tid])
						{
							//新邮件
							UI.addClass(_oNewDom, _sWBPMUNITUNREAD);
							_oRecordHasShow[_oList[i].tid] = 1;
						}
						//UI.after
						_before(_oNewDom, _oDom);
					}
				}
				else if( _aoParam.pdtid && (_oDom = G(_oSelf._getDomId(_aoParam.pdtid))) )
				{
					for (var i = _nLen - 1; i >= 0; i--)
					{
						_oNewDom = _html(_oTmpl(_oList[i]));
						//UI.before
						_after(_oNewDom, _oDom);
					}
				}
				else if (_aoParam.ndtid == null && _aoParam.pdtid == null)
				{
					//整页刷新，在用_queryListConv，这里会出现重复事件
					var _oItems = G( _oSelf._getDomId("items") );
					_oItems.innerHTML = "";
					if (_nLen > 0)
					{
						//可能出现expt存在与_nLen>0，是
						for (var i = 0; i < _nLen; i++)
						{
							_oNewDom = _html(_oTmpl(_oList[i]));
							_append(_oNewDom, _oItems);
						}
						_oSelf._initRecordReply();
					}
					if (_aoParam.expt)
					{
						_bDisplayMore = 0;
					}
					_oSelf._displayItems(!!_aoParam.expt);

					var _fShow = _oSelf._moCfg.onshow;
					_fShow && _fShow();
				}
				var _oItems = G( _oSelf._getDomId("items") ),
					//_oMailInfo = _getInst(_oSelf._moCfg.sTid),
					_oMailInfo = _aoParam.data,
					_oWbpmlistloadmore = G(_oSelf._getDomId("more")),
					_sMoreClass = _oWbpmlistloadmore.className;
				_display(_oWbpmlistloadmore, _bDisplayMore && _oItems.childNodes.length && _oItems.childNodes.length < _oMailInfo.t);
				if (_sMoreClass.indexOf(_sWBPMLOADINGMORE) > -1)
				{
					_oWbpmlistloadmore.className = _sMoreClass.replace(_sWBPMLOADINGMORE, "");
				}

				//todo
				//G( _oSelf._getDomId("name") ).innerHTML = _getInfoString(_oMailInfo.tid, "name", false, ", ");
				//debug();
				G( _oSelf._getDomId("name") ).innerHTML = PM.TMPL.nickname(_oMailInfo, {litype:"record"});



				//G( _oSelf._getDomId("members") ).innerHTML = PM.TMPL.recordMembers(_oMailInfo);
				_oSelf._initInvitePanel();
				_display( _oSelf._getDomId("invitebtn"), 1 );

				_resizeList();

				_oSelf._initTips();
				if (_oWin.UI && UI.B.ie)
				{
					_oSelf._moDom.style.behavior = "";
				}
				if (_oDom)
				{
					_oSelf._moGetNewerTimer._restart();
				}
			},

			_show : function(_abRefresh)
			{
				//debug("record._show");

				var _oSelf = this,
					_oCfg = _oSelf._moCfg,
					_sMode = _sSCROLL, //PM.data.mode,
					_oListTmpl = PM.TMPL.record;

				_oCfg.oDom.innerHTML = _oListTmpl({
					tid : _oCfg.sTid,
					cid : "record",
					loading : true
				});
				_abRefresh && _queryListConv({
					mode : _sSCROLL, //PM.data.mode,
					count : _FIRST_RECORD_COUNT,
					tid : _oCfg.sTid
				});
				_resizeList();
				return _oSelf;
			},

			_showErr : function(_aoData)
			{
				//只loading下，才显示错误，
				//可能自动更新重拉了数据
				var _oSelf = this,
					_sLoading = _oSelf._getDomId("loading"),
					_sLoaderr = _oSelf._getDomId("loaderr");
				if (_display(_sLoading))
				{
					_display(_sLoading, 0);
					_display(_sLoaderr, 1);
				}
				return _oSelf;
			},



			_destroy : function()
			{
				//record
				var _oSelf = this;
				if (_oSelf._moDom)
				{
					//todo 有没危险
					if (_oWin.MUSIC && _oWin.MUSIC.ICMusic)
					{
						MUSIC.ICMusic.hideMusicFlash()
					}
					_oSelf._moDom.innerHTML = "";

					_oSelf._moDom = null;
					_delEvent(_sDEL, _oSelf._mfDel);
					_delEvent(_sADD, _oSelf._mfAdd);

					//_delEvent(_sCHANGE, _oSelf._mfChange);
					//_delEvent(_sCOMPOSE, _oSelf._mfCompose);
					_delEvent(_sSETUPROOM, _oSelf._mfSetupRoom);


					if (_oSelf._mfScrollHandle)
					{
						UI.ER(_oWin, "scroll", _oSelf._mfScrollHandle);
						_oSelf._mfScrollHandle = null;
					}

					_oSelf._moGetNewerTimer && _oSelf._moGetNewerTimer._destroy();
					_oSelf._moUpdateTimeTimer && _oSelf._moUpdateTimeTimer._destroy();
				}
				return _oSelf;
			},


			//事件层{
			_over : function(_aoEvent, _aoTarget)
			{
				UI.addClass(_aoTarget, _sWBPMRECORDOVER);
				//this._removeUnreadBackground(_aoTarget);
				return false;
			},

			_out : function(_aoEvent, _aoTarget)
			{
				UI.removeClass(_aoTarget, _sWBPMRECORDOVER);
				return false;
			},

			_remove : function(_aoEvent, _aoTarget)
			{
				UI.E(_aoEvent).prevent();
				UI.E(_aoEvent).stop();

				var _oSelf = this,
					_oUnit = UI.parents(_aoTarget, "wbpmunit")[0],
					_sTid = A(_oUnit, "tid"),
					_oRmConfirm = UI.GC(_oUnit, "div.wbpmrmconfirm")[0],
					_oA = UI.GC(_oRmConfirm, "a")[1];
				//UI.show(_oRmConfirm);
				UI.addClass(_oUnit, _sWBPMREMOVE);
				_oA.focus();
				_oSelf._moDom.style.behavior = "";
				if (UI.B.ie)
				{
					_oRmConfirm.onfocusout = function()
					{
						UI.removeClass(_oUnit, _sWBPMREMOVE);
						//UI.hide(_oRmConfirm);
					};
				}
				else
				{
					if (!A(_oRmConfirm, "sb"))
					{
						//不考虑释放事件
						_oRmConfirm.addEventListener("blur",
							function()
							{
								UI.removeClass(_oUnit, _sWBPMREMOVE);
								//UI.hide(_oRmConfirm);
							},
							true
						);
						A(_oRmConfirm, "sb", "1");
					}
					_oRmConfirm.onmousedown = function()
					{
						return false;
					};
				}
				return false;
			},

			_empty : function(_aoEvent, _aoTarget)
			{
			//	UI.E(_aoEvent).prevent();
			//
			//	var _sTid = A(_aoTarget, "tid");
			//
			//	_delList(_sTid);
			//	this._return();
			//
				return false;
			},

			_removeConfirm : function(_aoEvent, _aoTarget)
			{
				//_recordControl
				var _oEvent = UI.E(_aoEvent);
				_oEvent.prevent();
				_oEvent.stop();
				var _oSelf = this,
					_oUnit = UI.parents(_aoTarget, "wbpmunit")[0],
					_oRmConfirm = UI.GC(_oUnit, "div.wbpmrmconfirm")[0],
					_sInfo = A(_aoTarget, "info");
				//UI.hide(_oRmConfirm);
				UI.removeClass(_oUnit, _sWBPMREMOVE);
				if(_sInfo == "y")
				{
					_delMail(A(_oUnit, "tid"));
					_oSelf._displayItems();
					_resizeList();

					//todo，会出现删除+查询
					_queryListConv( {
						tid : _oSelf._moCfg.sTid,
						tid2 : function()
							{
								return A( _oSelf._getLastItem(), "tid");
							},
						count : 1
					} );
				}
				return false;
			},

			_more : function(_aoEvent, _aoTarget)
			{
				_aoEvent && UI.E(_aoEvent).prevent();

				//debug();

				var _oSelf = this;
				//todo
				UI.addClass(G( _oSelf._getDomId("more") ), _sWBPMLOADINGMORE);
				_queryListConv({
					tid : _oSelf._moCfg.sTid,
					tid2 : function()
						{
							return A( _oSelf._getLastItem(), "tid");
						},
					count : _NEXT_RECORD_COUNT
				});

				return false;
			},

			_recordreply : function(_aoEvent, _aoTarget)
			{
				UI.E(_aoEvent).prevent();

				var _oSelf = this,
					_sAccontId = A( G(_oSelf._getDomId("items" )), "tid" ),
					_oUnit = UI.parents(_aoTarget, "wbpmunit")[0],
					_sTid = _oUnit && A(_oUnit, "tid") || "",
					_bSend = _oUnit && A(_oUnit, "sn") == "1",
					_oComposeControl;
				MI.dialog = MI.dialog || new (MI.Dialog);
				MI.dialog.show({
					width:590,
					noReserve : true,
					//title : '',//
					html : PM.TMPL.replydlg({
						cid : "dlg",
						c : !_bSend && _sTid ? _getInst(_sTid).c : "",
						a : _sAccontId,
						n : _getInst(_sAccontId).n
					}),

					start:function()
					{
						var _oDom = MI.dialog["_cont"];
						_oComposeControl = new _composeControl(
							{
								oDom : MI.dialog["_cont"],
								sCid : "dlg",

								nFrom : 4,
								//sTo : _sAccontId,
								sTid : _sTid,
								bDlg : true,
								onsendcomplete : function(_abSuccess, _aoParam)
								{
									MI.dialog.hide();
								}
							}
						);
						//(_sTid ? UI.GC(_oDom,  "div.replycontent > textarea") : UI.GC(_oDom, "div.receiver > input"))[0].focus();
						setTimeout(function()
							{
								UI.GC(_oDom,  "div.replycontent > textarea")[0].focus();
							}, 10
						);
					},
					end : function()
					{
						_oComposeControl && _oComposeControl._destroy();
						_MIDialogCleanHack();
					}
				});

				_log(1, 4);

				//MI.Bos('btnOpenSendMsg');
				return false;
			},

			//临时代码
			//需要修改为 _addSomeone
			_addSomeone : function(_aoEvent, _aoTarget)
			{
				UI.E(_aoEvent).prevent();

				var _oSelf = this,
					_oInvitePanel = _oSelf._getDomId("invitepanel"),
					_sWBPMBUTVISITED = "wbpmbutvisited",
					_oInst = _getInst(_oSelf._moCfg.sTid);
				//if(!_getABLEMULTISEND() || _oInst.mi.length >= _nINVITEMAX)
				if (!_ableInvite(_oSelf._moCfg.sTid))
				{
				//	_display(_oSelf._getDomId("invitesubmit"), 0);
					UI.addClass(G(_oSelf._getDomId("invitesubmit")), _sWBPMDISABLEDINVITE);
				}
				if (UI.hasClass(_aoTarget, _sWBPMBUTVISITED))
				{
					//已经打开
					_display(_oInvitePanel, 0);
					UI.removeClass(_aoTarget, _sWBPMBUTVISITED);
				}
				else
				{
					_display(_oInvitePanel, 1);
					UI.addClass(_aoTarget, _sWBPMBUTVISITED);
				}
				if (_oWin.UI && UI.B.ie)
				{
					_oSelf._moDom.style.behavior = "";
				}
				//todo
				_getAddrFromCgi();
				return false;
			},

			_invite : function(_aoEvent, _aoTarget)
			{
				UI.E(_aoEvent).prevent();
				var _oSelf = this,
					_sTid = _oSelf._moCfg.sTid,
					_oInst = _getInst(_sTid),
					_oInviteSubmit = G(_oSelf._getDomId("invitesubmit"));
				if (UI.hasClass(_oInviteSubmit, _sWBPMDISABLEDINVITE))
				{
					return false;
				}

				//var _sTid = A(_aoTarget, "tid") || "";
				var _oAddrCtrl;
				MI.dialog.show({
					width:620,
					noReserve : true,
					//title : '',//
					html : PM.TMPL.invite({
						mi : _oInst.mi
					}),
					start:function()
					{
						//todo
						var _oDom = MI.dialog["_cont"],
							_oAddrTextarea = UI.GC(_oDom, "textarea")[0],
							_sBTN_SEND_DISABLED = "btn_send_disabled";
							
						_oAddrCtrl = new addrCtrl({
							oDom : _oDom,
							onchange : function()
								{
									UI[_oAddrCtrl.getAddr().length ? "removeClass" : "addClass"](_oSendDom, _sBTN_SEND_DISABLED);
								}
						});
						var _oSendDom = G(_oAddrCtrl._getDomId("send"));
						_oSendDom.onclick = function()
						{
							if (UI.hasClass(_sBTN_SEND_DISABLED))
							{
								return false;
							}
							var _oExistAccount = [],
								_nMiLen = _oInst.mi.length,
								i;
							for (i = 0; i < _nMiLen; i++)
							{
								_oExistAccount.push(_oInst.mi[i].a);
							}
							var _oNewAddr = _getAccount(_oAddrCtrl.getAddr(), _oExistAccount.join(_sSEPARATEADDRCGI), true, false);
							_oExistAccount.push(_oAddrCtrl.getAddr());
							var _oTotleAddr = _getAccount(_oExistAccount.join(_sSEPARATEADDRCGI), "", true, false);
							if (_oNewAddr.length)
							{
								if (_oTotleAddr.length > _nINVITEMAX)
								{
									(new MI.Dialog).showTip({
										html	: _('私信会话参与人数不能超过10人'),
										ico		: 'ico_te',
										delay	: 2000
									});
									return false;
								}
								_inviteToCgi(
									{
										target : _oTotleAddr.join(_sSEPARATEADDRCGI),
										roomid : _isRoomId(_sTid) ? _sTid : ""
									},
									function(_abSuccess, _aoParam)
									{
										if (_abSuccess)
										{
											//todo
											G( _oSelf._getDomId("members") ).innerHTML = PM.TMPL.recordMembers(_aoParam);

											_setDataFromCompose( _aoParam );

											var _oAddFollow = _aoParam.addfollow;
											if (_oAddFollow && _oAddFollow.length)
											{
												_aoParam.func = "invite";
												_showAddFollow(_aoParam);
											}
										}
										else
										{
											_showError(_aoParam);
										}									
									}
								);
							}
							_oAddrCtrl._destroy();
							MI.dialog.hide();
							return false;
						};

						setTimeout(function()
							{
								_oAddrTextarea.focus();
							}, 10
						);

					},
					end : function()
					{
						_oAddrCtrl && _oAddrCtrl._destroy();
						_MIDialogCleanHack();
					}
				});
			},

			_exitroom : function(_aoEvent, _aoTarget)
			{
				UI.E(_aoEvent).prevent();
				var _oSelf = this,
					_oRmConfirm = G(_oSelf._getDomId("exitcfm")),
					_oA = UI.GC(_oRmConfirm, "a")[1];
				UI.show(_oRmConfirm);
				//UI.addClass(_oUnit, _sWBPMREMOVE);
				_oA.focus();
				_oSelf._moDom.style.behavior = "";
				if (UI.B.ie)
				{
					_oRmConfirm.onfocusout = function()
					{
						//UI.removeClass(_oUnit, _sWBPMREMOVE);
						UI.hide(_oRmConfirm);
					};
				}
				else
				{
					if (!A(_oRmConfirm, "sb"))
					{
						//不考虑释放事件
						_oRmConfirm.addEventListener("blur",
							function()
							{
								//UI.removeClass(_oUnit, _sWBPMREMOVE);
								UI.hide(_oRmConfirm);
							},
							true
						);
						A(_oRmConfirm, "sb", "1");
					}
					_oRmConfirm.onmousedown = function()
					{
						return false;
					};
				}
				return false;
			},

			_exitConfirm : function(_aoEvent, _aoTarget)
			{
				//_recordControl
				var _oEvent = UI.E(_aoEvent);
				_oEvent.prevent();
				_oEvent.stop();
				var _oSelf = this,
					_sTid = _oSelf._moCfg.sTid,
					_oRmConfirm = G(_oSelf._getDomId("exitcfm")),
					_sInfo = A(_aoTarget, "info");
				UI.hide(_oRmConfirm);
				if(_sInfo == "y")
				{
					//debug();
					_removeSelfFromMI(_sTid);
					_oSelf._initInvitePanel()._initRecordReply();
					_exitRoomToCgi(
						{
							roomid : _sTid
						},
						function(_abSuccess, _aoParam)
						{
							if (_abSuccess)
							{
								_setDataFromCompose(_aoParam);
								//成功就不提示了
								//这里，需要考虑异步问题，如果这时 pm_conversation 更新数据 返回了，此时，可能出现自己的帐号又出现
								//简单的解决方法：延时1秒再执行_removeSelfFromMI, 操作
								//G( _oSelf._getDomId("members") ).innerHTML = PM.TMPL.recordMembers(_getInst(_sTid));
							}
							else if (_oSelf._moDom)
							{
								_showError(_aoParam);
								_addSelfToMI(_sTid);
								_oSelf._initInvitePanel()._initRecordReply();
							}									
						}
					);
				}
				return false;
			},

			_showother : function(_aoEvent, _aoTarget)
			{
				//debug();

				return _common._showother(this, _aoEvent, _aoTarget);
			},

			_hideother : function(_aoEvent, _aoTarget)
			{
				return _common._hideother(this, _aoEvent, _aoTarget);
			},


			_stopPropagation : function(_aoEvent, _aoTarget)
			{
				UI.E(_aoEvent).stop();
				return false;
			},

			_return : function(_aoEvent, _aoTarget)
			{
				_aoEvent && UI.E(_aoEvent).prevent();

				var _oSelf = this;

				if (_oSelf._moDom)
				{
					//释放，并返回第一层
					_setReadFlag(_oSelf._moCfg.sTid);
					_oSelf._destroy();
					//_resizeList();
					_oSelf._moCfg.onclose && _oSelf._moCfg.onclose();
					_gotoListConv(1, {
						sTid : _sTOPTID
					} );
				}
				return _oSelf;
			},

			//设置，或取消滚动事件
			//_scrollEvent : function()

			_initTips : function()
			{
				//record
				var _oSelf = this;
				MI.app({
					Base : function(){
						setTimeout(function(){
							if (_oSelf._moDom)
							{
								MI.Card.build(_oSelf._moDom,'.wbpmunit .icon img', 1);
								MI.Card.build(_oSelf._moDom,'.wbpmunit .users a', 2);

								MI.Card.build(G(_oSelf._getDomId("name")), 'a', 2);

								MI.Card.build(_oSelf._moDom,'.wbpmunit em a', 2);
								MI.Card.build(_oSelf._moDom,'.wbpmsystem em a', 2);

								MI.tips.build({
									area : _oSelf._moDom,
									width : 236,
									txt : MI.TalkList.prototype.urlTips,
									target : '.wbpmurl'
								});

								var _oPicBoxes = UI.GC(_oSelf._moDom, "div.picBox"),
									_oPicBox;
								for (var i = _oPicBoxes.length - 1; i >= 0; i--)
								{
									_oPicBox = _oPicBoxes[i];
									if (!A(_oPicBox, 'init'))
									{
										A(_oPicBox, 'init', '1');
										MI.TalkList.picEvent([_oPicBox]);
										UI.remove($$(_oPicBox, '.preview')[0]);
									}
								}
								MI.Crs(1);
							}
						},100);
					},
					TalkListRich : function()
					{
						setTimeout(function(){
							if (_oSelf._moDom)
							{
								//语音
								var _oMusicBoxes = UI.GC(_oSelf._moDom, "div.musicBox");
								//MI.TalkList.musicEvent(_oMusicBoxes);
								//MI.TalkList.musicEvent代码中有bug，没有使用闭包
								for (var i = _oMusicBoxes.length - 1; i >= 0; i--)
								{
									MI.TalkList.musicEvent([_oMusicBoxes[i]]);
								}
							}
						},100);
					}
				});
				return _oSelf;
			},

			/**
			 *  控制，能否显示参与人栏内的 添加参与人，退出本次会话
			 *
			 *
			 */
			_initInvitePanel : function ()
			{
				var _oSelf = this,
					_oInst = _getInst(_oSelf._moCfg.sTid),
					_hasExit = _isExitRoom(_oInst);
				G( _oSelf._getDomId("members") ).innerHTML = PM.TMPL.recordMembers(_oInst);
				//debug();
				//_display(_oSelf._getDomId("invitesubmit"), !_hasExit && _getABLEMULTISEND() && _oInst.mi.length < _nINVITEMAX );

				//_display(_oSelf._getDomId("invitesubmit"), _ableInvite(_oSelf._moCfg.sTid));

				_display( _oSelf._getDomId("exitroom"), _oInst.mc && !_hasExit );

				_wbpm_MIRun(function()
				{
					UI[_ableInvite(_oSelf._moCfg.sTid) ? 'removeClass' : 'addClass'](G(_oSelf._getDomId("invitesubmit")), _sWBPMDISABLEDINVITE);
					MI.app({
						Base : function(){
							setTimeout(function(){
								if (_oSelf._moDom)
								{
									//MI.Card.build(_oSelf._moDom,'#wbpmrecordmembers img', 1);
									MI.Card.build(_oSelf._moDom, '#' + _oSelf._getDomId('members') + ' a', 2);
								}
							},100);
						}
					});
				});


				return _oSelf;
			},

			/**
			 *  控制，能否回复，输入框是否重置
			 *
			 */
			_initRecordReply : function(_abReset)
			{
				var _oSelf = this,
					//_oDom = _oSelf._moDom,
					_sTid = _oSelf._moCfg.sTid,
					_oInst = _getInst(_sTid),
					_oSmsreply = G(_oSelf._getDomId("compose")),
					_oNoFollow = G(_oSelf._getDomId("nofollow"));
					//UI.GC(_oDom, "div.wbpmreply")[0],
				//UI.hide(_oNoFollow);
				_display(_oNoFollow, 0);


				//消除回信障碍 文字文字提示
				for (var i = 0, _oOther; i < _oInst.mi.length; i++)
				{
					if (_oInst.mi[i].a != _oInst.ma)
					{
						_oOther = _oInst.mi[i];
						break;
					}
				}
				var _bNoReply = true;
				//if (!_ableReply(_sTid) || (_oOther.f === false && !_oInst.mc))
				if (!_oInst.mc && (!_ableReply(_sTid) || !_oOther || _oOther.f === false ))
				{
					//单人会话
					var _oNoFollowedBy = G(_oSelf._getDomId("nofollowedbytext"));
					_oOther && (
					_oNoFollowedBy.innerHTML = _oOther.n + _('不是你的听众。'));
					_display(_oSelf._getDomId("nofollowedby"), 1);
				}
				if (_ableReply(_sTid))
				{
					var _oDefTxt = [_("回复给：")],
						_nOtherLen = 0;
					for (var i = 0, j = 0; i < _oInst.mi.length; i++)
					{
						if (_oInst.mi[i].a != _oInst.ma)
						{
							if (j < 3)
							{
								j++ && _oDefTxt.push(', ');
								_oDefTxt.push(_oInst.mi[i].n);
							}
							_nOtherLen++;
						}
					}
					j < _nOtherLen && _oDefTxt.push(" ", _('和'), _('其他'), _nOtherLen - j, _('人'));

					//UI.show(_oSmsreply);
					_display(_oSmsreply, 1);
					if (_abReset || !_oSelf._moComposeControl)
					{
						_oSelf._moComposeControl = new _composeControl(
							{
								oDom : _oSmsreply,
								sCid : "record",
								bDlg : false,
								nFrom : 4,
								sTo : _getInfoString(_sTid, "account", true),
								sTid : _sTid,
								//sDefTxt : _("回复给：") + _htmlDecode( _getInfoString(_sTid, "name") ),
								sDefTxt : _htmlDecode(_oDefTxt.join('')),
								onsendcomplete : function(_abSuccess, _aoParam)
								{
								}
							}
						);
					}
					//var _oTextarea = UI.GC(_oSmsreply, "textarea")[0];
					//_oTextarea.focus();
				}
				else
				{
					_display(_oSmsreply, 0);
				}
				return _oSelf;
			},
			//事件层}
			_removeUnreadBackground : function(_aoDiv)
			{
				var _oSelf = this,
					_oUnits = _aoDiv ? [_aoDiv] : UI.GC(_oSelf._moDom, "div.wbpmunit");
				for (var i = _oUnits.length - 1; i >= 0; i--)
				{
					UI.removeClass(_oUnits[i], _sWBPMUNITUNREAD);
				}
				return _oSelf;
			},

			_initEvent : function()
			{
				//record
				var _oSelf = this;

				_oSelf._mfDel = function(_aoList, _aoCfg)
				{
					//debug();
					//debug(["_mfDel", _aoCfg._sTid, _oSelf._moCfg.sTid]);

					if (_oSelf._moDom && !_aoCfg._bList && _aoCfg._sTid == _oSelf._moCfg.sTid)
					{
						_oSelf._delete(_aoList);
					}
				};
				_addEvent(_sDEL, _oSelf._mfDel);

				_oSelf._mfAdd = function(_aoParam, _aoCfg)
				{
					//debug(["_mfAdd", _aoCfg._sTid, _oSelf._moCfg.sTid]);
					//debug();

					if (_oSelf._moDom && !_aoCfg._bList && _aoCfg._sTid == _oSelf._moCfg.sTid)
					{
						_oSelf._add(_aoParam);
					}
				};
				_addEvent(_sADD, _oSelf._mfAdd);

				//debug();
				_oSelf._mfSetupRoom = function(_aoParam)
				{
					//debug();
					if (_aoParam.tid != _oSelf._moCfg.sTid)
					{
						//新房间，需要跳转
						_gotoListConv(0, {
							sTid : _aoParam.tid,
							_nUnread : 0,
							_bExtData : 1,
							onclose : function()
							{
								//debug();
							}
						});
					}
				};
				_addEvent(_sSETUPROOM, _oSelf._mfSetupRoom);

				//_oSelf._mfStatus = function(_aoParam)
				//{
				//	if (_oSelf._moDom && _aoParam.tid)
				//	{
						//调整私信未读状态
				//	}
				//};
				//_addEvent(_sGENSTATUS, _oSelf._mfStatus);


				//	_oSelf._mfCompose = function(_anTime)
				//	{
				//		debug();
				//		if (_oSelf._isShow())
				//		{
				//			//新写信或回复，插入新内容
				//			var _oList = _getList({
				//					nocgi : true,
				//					tid : _oSelf._moCfg.sTid,
				//					time1 : _anTime
				//				});
				//			_oSelf._update(_oList);
				//		}
				//	};

				//_addEvent(_sCHANGE, _oSelf._mfChange);
				//_addEvent(_sCOMPOSE, _oSelf._mfCompose);

				_wbpm_MIRun(function()
				{
					var _oEvents =
					{
						out : _oSelf._out,
						over : _oSelf._over,
						remove : _oSelf._remove,
						empty : _oSelf._empty,
						rmcfm : _oSelf._removeConfirm,
						recordreply : _oSelf._recordreply,
						addsomeone : _oSelf._addSomeone,
						invite : _oSelf._invite,
						exitroom : _oSelf._exitroom,
						exitcfm : _oSelf._exitConfirm,
						//showother : _oSelf._showother,
						//hideother : _oSelf._hideother,

						more : _oSelf._more,
						stop : _oSelf._stopPropagation,
						"return" : _oSelf._return
					};

					_oSelf._moDom.onclick = function(_aoEvent)
					{
						_simpleTagEvent(_aoEvent, "ck", _oEvents, _oSelf);
					};

					_oSelf._moDom.onmouseover = function(_aoEvent)
					{
						_simpleTagEvent(_aoEvent, "mor", _oEvents, _oSelf);
					};

					_oSelf._moDom.onmouseout = function(_aoEvent)
					{
						_simpleTagEvent(_aoEvent, "mot", _oEvents, _oSelf);
					};

					//自动更新
					_oSelf._moGetNewerTimer = new _timer( {
						_nBeginTime: 30000,
						_nSpeed : 0,
						_nEndTime : 30000,
						//_nSpeed : 30000,
						//_nEndTime : 120000,
						_ontimer : function()
						{
							//debug(["time", new Date().toString()]);
							_getListFromCgi(_oSelf._moCfg.sTid);
						}
					} )._start();

					_oSelf._moUpdateTimeTimer = new _timer( {
						_nBeginTime: 60000,
						_nSpeed : 0,
						_nEndTime : 60000,
						_ontimer : function()
						{
							//debug();
							var _oPubTimes = UI.GC(_oSelf._moDom, "span.pubtime");
							for (var i = _oPubTimes.length - 1; i >= 0; i--)
							{
								_oPubTimes[i].innerHTML = PM.formatDate( A(_oPubTimes[i], "tm") );
							}
						}
					} )._start();
				} );

				return _oSelf;
			},


			/**
			 *
			 * @param {Object} _aoCfg
			 *		{
			 *			oDom : 一般为pmlist或pmrecord的div
			 *			sTid : inbox|具体的tid
			 *
			 *			_bExtData : 初始化是否外部请求数据
			 *		}
			 */
			_init : function(_aoCfg)
			{
				var _oSelf = this;
				_oSelf._moCfg = _aoCfg;
				_oSelf._moDom = _aoCfg.oDom;

				//回复实例
				_oSelf._moComposeControl = null;

				// _oSelf._nPage = 0;
				_oWin.scrollTo(0, 0);

				_oSelf._initEvent()._show(!_aoCfg._bExtData);
			}
		};



		//列表表现逻辑 }

		//写信表现逻辑 {
		//从qmactivex截取一段来实现 插入图片
		var _qmActivex = {},
			_oPicTypeMap = {
				bmp : 0,
				jpg : 1,
				gif : 2
			};
		_qmActivex._uploader = function(_aoActivex)
		{
			var _oSelf = this;
			_oSelf._moActiveX = _aoActivex;
			_oSelf._moBaseConfig = {};
		};

		_qmActivex._uploader.prototype =
		{
			/**
				剪贴板文件
				@return {Array} [
						{
							name : 文件名
							size : 文件大小
							_sCode : 私有变量，用来上传的
							_nType : 私有变量，表示上传的类型，值为4
							_nSubType : 私有变量，表示上传的类型，值为0
						},
						...
					]
			 */
			getClipboardFiles : function()
			{
				var _oSelf = this,
					_oActiveX = _oSelf._moActiveX;
				return _oSelf._analyseFileList(_oActiveX.GetClipboardFiles(), 4);
			},

			/**
				剪贴板图片
				@param {String} _asType 值为bmp, jpg, gif，默认为bmp
					0: bmp
					1: jpg
					2: gif
					default: bmp


				@return {Array} [
						{
							name : "" 没意义
							size : -1 没意义
							_sCode : 私有变量，用来上传的
							_nType : 私有变量，表示上传的类型，值为1
							_nSubType : 图片类型
						},
						...
					]
			 */
			getClipboardPic : function(_asType)
			{
				var _oSelf = this,
					_oFileList = [],
					_nType = _oPicTypeMap[_asType] || 0,
					_oActiveX = _oSelf._moActiveX,
					_oScreenActiveX = 	MI.Capture.createActiveX('screencapture');
								//_qmActivex._createActiveX(0, _sActiveXDefaultId)
				if (_oScreenActiveX)
				{
					//'bmp' : 0, 'jpg' : 1, 'gif' : 2
					//subType gif: 2, bmp: 3, jpg: 4
					var _sFileHandle = _oScreenActiveX.SaveClipBoardBmpToFile( _nType );
					if (_sFileHandle)
					{
						_oFileList.push( {
							_nType : 1,
							_nSubType : [3, 4, 2][ _nType ],
							_sCode : _sFileHandle,
							name : '',
							size : -1
						} );
					}
				}
				return _oFileList;
			},

			/**
				上传一个文件
				上传是单线程的，如果还没有上传完，就再调用uplaod，那么就停止前一个上传的操作


				@param {Object} _aoConfig 临时替换setup所设置的参数值 {
					url : String,
					headers : [ [ key, value], [key, value], ... ], 比如 Cookie
					params : [ [key, value], [key, value], ... ],

					file : 为selectFiles, getClipboardFiles或getClipboardPic返回的一个文件对象

					//进度
					onprogress : function(_aoParams)
						_aoParams : {
							loaded: int
							totle : int
						}
					//http 返回200
					onsuccess : function(_aoParams)
						_aoParams : {
							status : _oActiveX.ResponseCode,
							responseText : _oActiveX.Response,
						}

					//http 返回错误，或控件本身错误
					onerror   : function(_aoParams)
						_aoParams : {
							activexError : boolean 是否控件本身出错
							errorCode : string
							errorMsg  : string
							status : string
							responseText : string
						}
				}
				@return {Object} uploader
			 */
			upload : function(_aoConfig)
			{
				var i,
					_oSelf = this,
					_oConfig = {},
					_oActiveX = _oSelf._moActiveX;
				try
				{
					_oConfig = _aoConfig;

					var i,
						_oHeaders = _oConfig.headers || [],
						_oParams = _oConfig.params || [],
						_oFile = _oConfig.file;

					_oActiveX.StopUpload();
					_oActiveX.ClearHeaders();
					_oActiveX.ClearFormItems();

					_oActiveX.URL = _oConfig.url;
					for (i = _oHeaders.length - 1; i >= 0; i--)
					{
						_oActiveX.AddHeader( _oHeaders[i][0], _oHeaders[i][1] );
					}
					for (i = _oParams.length - 1; i >= 0; i--)
					{
						_oActiveX.AddFormItem( _oParams[i][0], 0, 0, _oParams[i][1] );
					}
					_oActiveX.AddFormItem( "file", _oFile._nType, _oFile._nSubType, _oFile._sCode );

					_oActiveX.OnEvent = function( _aObj, _aEventId, _aP1, _aP2, _aP3 ) {
						switch( _aEventId )
						{
							case 2:
								//process
								_callback(_oSelf, _oConfig.onprogress,
									{
										loaded : _aP1,
										totle : _aP2
									}
								);
								break;
							case 3:
								//finish
								if ( _oActiveX.ResponseCode == "200" )
								{
									_callback(_oSelf, _oConfig.onsuccess,
										{
											status : _oActiveX.ResponseCode,
											responseText : _oActiveX.Response
										}
									);
									break;
								}
							case 1:
								//error
								_callback(_oSelf, _oConfig.onerror,
									{
										activexError : false,
										errorCode : _aP1,
										errorMsg  : _aP2,
										status : _oActiveX.ResponseCode,
										responseText : _oActiveX.Response
									}
								);
						}
					};

					_oActiveX.StartUpload();
				}
				catch (e)
				{
					_callback(_oSelf, _oConfig.onerror,
						{
							activexError : true,
							errorMsg : e.message,
							errorCode : -1,
							responseText : ''
						}
					);
				}
			},

			/**
				停止上传
				@return {Object} uploader
			 */
			abort : function()
			{
				var _oSelf = this;
				_oSelf._moActiveX.StopUpload();
				return _oSelf;
			},

			/**

			 */
			_analyseFileList : function(_asFileList, _anType)
			{
				var _oActiveX = this._moActiveX,
					_oFileList = [];
				if (_asFileList)
				{
					for (var _oResult = _asFileList.split("\r\n"), _nLen = _oResult.length, i = 0; i < _nLen; i++)
					{
						var _oFilePart = _oResult[i].replace(/(^\s*)|(\s*$)/g, "").split(' ')
						if (_oFilePart.length >= 2)
						{
							var _sCode = _oFilePart.shift(),
								_sFileName = _oFilePart.join(" "),
								_nSize = _oActiveX.GetFileSize(_sFileName);
							_oFileList.push(
								{
									_nType : _anType,
									_nSubType : 0,
									_sCode : _sCode,
									name : _sFileName.split("\\").pop(),
									size : _nSize
								}
							);
						}
					}
				}
				return _oFileList;
			}

		};

		/**
		 *  用activex上传图片
		 *  参数与_initUploadImage一样
		 */
		function _startUploadImageWithActiveX(_aoForm, _afUploading, _afComplete)
		{
			if (!_startUploadImageWithActiveX._oActiveInst)
			{
				if (_oWin.MI && MI.Capture && MI.Capture.enable)
				{
					_startUploadImageWithActiveX._oActiveInst = new _qmActivex._uploader(MI.Capture.createActiveX('uploader'));
				}
			}
			var _oActiveInst = _startUploadImageWithActiveX._oActiveInst;
			if (!_oActiveInst)
			{
				return false;
			}
			//如果用户拷贝多个文件，取第一个
			//
			var _oFileList = _oActiveInst.getClipboardFiles().concat(_oActiveInst.getClipboardPic());
			if (_oFileList.length)
			{
				var _oImgFile = _oFileList[0];
				if (!/\.(jpg|jpeg|gif|png)$/i.test(_oImgFile.name))
				{
					return false;
				}
				if (_oImgFile.size >= 2 * 1024 * 1024)
				{
					UI.A(_aoForm, "s", "2");
					UI.A(_aoForm, "u", "");
					_afComplete && _afComplete(
						{
							title 	: _sCgiExceptionText,
							appname : "pm_uploadimg",
							errcode	: "-200",
							errmsg  : _("文件超过2M")
						},
						_aoForm
					);
					return false;
				}
				UI.A(_aoForm, "s", "1");
				_afUploading && _afUploading(_aoForm);
				_oActiveInst.upload({
					url : _oUrl._PM_UPLOADIMG,
					headers : [ [ "Cookie", _oDoc.cookie]],
					params : [ ["resp_charset", "UTF8"], ["pmlang", _oWin.MILang || "zh_CN"], ["ef", "js"], ["activex", "1"] ],
					file : _oImgFile,
					onsuccess : function(_aoParams)
					{
						//_aoParams : {
						//	status : _oActiveX.ResponseCode,
						//	responseText : _oActiveX.Response,
						//}
						UI.A(_aoForm, "s", "2");
						try
						{
							var _oData = eval( _aoParams.responseText );
							//由于非200返回的，会出现跨域错误，用try捕获
							if (_oData.url)
							{
								//由于控件返回编码有问题
								_oData.filename = _oImgFile.name;
								UI.A(_aoForm, "n", _oData.filename);
								UI.A(_aoForm, "u", _oData.url);
								UI.A(_aoForm, "f", _oData.fid);
							}
							else
							{
								//失败
								UI.A(_aoForm, "u", "");
							}
						}
						catch (_oError)
						{
							UI.A(_aoForm, "u", "");
							_catchError(_oError, "startupload");
						}
						_afComplete && _afComplete(_oData, _aoForm);
					},

					//http 返回错误，或控件本身错误
					onerror   : function(_aoParams)
					{
						//_aoParams : {
						//	activexError : boolean 是否控件本身出错
						//	errorCode : string
						//	errorMsg  : string
						//	status : string
						//	responseText : string
						//}
						UI.A(_aoForm, "s", "2");
						UI.A(_aoForm, "u", "");
						_afComplete && _afComplete(null, _aoForm);
					}
				});
			}
		}

		function _stopUploadImageWidthActiveX()
		{
			_startUploadImageWithActiveX._oActiveInst && _startUploadImageWithActiveX._oActiveInst.abort();
		}

		/**
		 *  初始化上传图片，
		 *  如果input file上传过文件，重置；2. 绑定form的事件
		 *
		 *	@param {Object} _aoForm form的dom节点，其中设置私有数据
		 *				s : 状态值， 空: 没绑定input file的onchange事件；0: 绑定onchange事件；1: 上传中；2：上传完
		 *				n : 图片的名称
		 *				u : 图片的url 如果s=2且u=""，就是上传失败
		 *				f : 图片的fid
		 *
		 *	@param {Function} _afUploading(_aoForm)
		 *
		 *  @param {Function} _afComplete(_aoJson, _aoForm, _aoIframeWin) _aoJson 可能为图片数据 {filename:, url:, fid} 或异常数据{title:, appname:, errcode:, errmsg:}
		 */
		function _initUploadImage(_aoForm, _afUploading, _afComplete)
		{
			var _sTid = UI.A(_aoForm, "tid") || "",
				_oImgFile = UI.GC(_aoForm, "input")[0],
				_sStatus = UI.A(_aoForm, "s"),
				_sIframeId = "wbpm_uploadimg" + _sTid;
			_removeIframe(_sIframeId); //会暂停上传

			//如果input file已经选过文件，就重新设置form
			if (_sStatus == "1" || _sStatus == "2")
			{
				var _oParentNode = _aoForm.parentNode;
				_oParentNode.innerHTML = PM.TMPL.uploadform( { tid : _sTid } );
				_aoForm = _oParentNode.firstChild;
				_oImgFile = UI.GC(_aoForm, "input")[0];
			}

			//if (UI.A(_aoForm, "s"))
			//{
			//	绑定过事件了
			//	return ;
			//}
			UI.A(_aoForm, "s", "0");

			_oImgFile.onchange = function()
			{
				if (!/\.(jpg|jpeg|gif|png)$/i.test(_oImgFile.value))
				{
					//MI.dialog.alert( _('只支持jpg、jpeg、gif、png格式') );
					return false;
				}
				_removeIframe(_sIframeId);
				_createIframe(
					{
						name : _sIframeId,
						//src : "javascript:''",
						id : _sIframeId

					},
					function(_aoIframe)
					{
						if ( ({"0":1, "2":1})[UI.A(_aoForm, "s")])
						{
							UI.A(_aoForm, "s", "1");
							_afUploading && _afUploading(_aoForm);
							_aoForm.submit();
						}
						else
						{
							UI.A(_aoForm, "s", "2");
							try
							{
								//由于非200返回的，会出现跨域错误，用try捕获
								var _oWindow = _aoIframe.contentWindow,
									_oData = _oWindow.data;
								if (_oData.url)
								{
									UI.A(_aoForm, "n", _oData.filename);
									UI.A(_aoForm, "u", _oData.url);
									UI.A(_aoForm, "f", _oData.fid);
								}
								else
								{
									//失败
									UI.A(_aoForm, "u", "");
								}
							}
							catch (_oError)
							{
								UI.A(_aoForm, "u", "");
								_catchError(_oError, "uploadimg");
							}

							_afComplete && _afComplete(_oData, _aoForm, _oWindow);
						}
					}
				);
			};
			return ;
		}

		/**
		 *  textarea 自适应高度(通用)
		 *
		 *  @param {Object} _aoTextarea
		 *  @param {Function} _afCallback
		 *  @return {Function} function(_aoEvent) 用在onpropertychange或oninput中
		 */
		function _wrapTextareaResizeHeight(_aoTextarea, _afCallback)
		{
			var _sTextareaHeightId = (_aoTextarea.id || "wbpmtextarea") + "height",
				_oTextareaHeight = G( _sTextareaHeightId ),
				_oTextareaMinHeight = _aoTextarea.style.height;
			if (!UI.B.ie && !_oTextareaHeight)
			{
				//对于非IE，隐藏textarea来获取高度
				var _oTextareaHeight = _aoTextarea.cloneNode(false);
				_oTextareaHeight.id = _sTextareaHeightId;
				with (_oTextareaHeight.style)
				{
					position = "absolute";
					top = "-999px";
					left = "-999px";
					paddingBottom = "0px";
					paddingTop = "0px";
					visibility = "hidden";
				}
				_aoTextarea.parentNode.appendChild(_oTextareaHeight);
			}
			return function(_aoEvent)
				{
					if (UI.B.ie)
					{
						_aoTextarea.style.height = _aoTextarea.scrollHeight + 'px';
					}
					else
					{
						_oTextareaHeight.value = _aoTextarea.value;
						_oTextareaHeight.style.height = _oTextareaMinHeight;
						_aoTextarea.style.height = _oTextareaHeight.scrollHeight + 'px';
					}
					_afCallback && _afCallback(_aoEvent);
				};
		}

		/**
		 *  回复与新私信逻辑
		 *
		 *  情况：
		 *	1. 新写信，(表现，用户自己输入textarea)
		 *	2. 在profile tip回复  (表现，把发件人填到textarea)
		 *	3. 在_listControl或_recordControl回复 (表现，没有textrea)
		 *	4. 增加联系人 (表现，已存在的在textarea外，加上textaera里的)
		 *
		 *  @param {Object} _aoCfg {
		 *		oDom : wbpmadd的div
		 *		sCid: id的组成部分
		 *		bDlg : 是否对话框形式
		 *
		 *		nFrom : 用来打日志的["", "profile", "new", "home", "reply"]
		 *		sBosType : 用在MI.Bos(sBosType)
		 *
		 *		sTo : textarea外的收件人，发出时，自动合并到textarea中
		 *		sTid: 用在提交给cgi，ptid和roomid
		 *
		 *		sDefTxt : 如果用户没输入，默认显示
		 *
		 *		onsendcomplete : function() 发信完，回调
		 *  }
		 */
		function _composeControl(_aoCfg)
		{
			this._init(_aoCfg);
		}

		//要点：
		//    通过form来记录上传的状态s (0: 未上传, 1: 上传中, 2: 上传完); 对于s=2时，n为图片名，f为图片的fid
		//    显示状态通过设置div.wbpminsert 的class
		var _sSELECTORWBPMINSERT = "div.wbpminsert",
			_sWBMPSENDING = "wbmpsending",
			_sWBPMUPLOADING = "wbpmuploading",
			_sWBPMFAILUPLOAD = "wbpmfailupload",
			_sWBPMSECCUPLOAD = "wbpmseccupload",
			_oREGTEXTCOUNT = /[^\x00-\xFF]/g;
		_composeControl.prototype =
		{
			_destroy : function()
			{
				var _oSelf = this;
				_oSelf._moAutoComplete && _oSelf._moAutoComplete._hide(1);
				return _oSelf;
			},

			_getDomId : function(_asId)
			{
				return "wbpmcompose" + (this._moCfg.sCid || "") + (_asId || "");
			},

			_edit : function(_aoEvent, _aoTarget)
			{
				var _oSelf = this;
				if (_aoEvent.keyCode == 13)
				{
					if (_aoEvent.ctrlKey)
					{
						_oSelf._send(_aoEvent, _aoTarget);
					}
					else
					{
						UI.E(_aoEvent).prevent();
					}
				}
				else if ( _oSelf._mbCapture && (_aoEvent.ctrlKey || _aoEvent.metaKey) && (_aoEvent.keyCode == 86 || _aoEvent.keyCode == 118))
				{
					//ctrl+v
					_oSelf._initUpload(1);
				}
			},

			_cancel : function(_aoEvent, _aoTarget)
			{
				UI.E(_aoEvent).prevent();
				var _oSelf = this;
				_oSelf._moCfg.onsendcomplete && _oSelf._moCfg.onsendcomplete(false, null);
			},

			_setUploadStatus : function(_asStatus)
			{
				var _oSelf = this,
					_oDiv = UI.GC(_oSelf._moDom, _sSELECTORWBPMINSERT)[0],
					_sClassName = _oDiv.className,
					_sOldClassName = _sClassName;
				_sClassName = UI.trim( _sClassName.replace(_sWBPMUPLOADING, "").replace(_sWBPMFAILUPLOAD, "").replace(_sWBPMSECCUPLOAD, "") );
				_sClassName += " " + (_asStatus || "");
				if (_sClassName != _sOldClassName)
				{
					_oDiv.className = _sClassName;
				}
				return _oSelf;
			},

			_showimg : function(_aoEvent, _aoTarget)
			{
				var _oSelf = this,
					_sTIMER = "timer",
					_oPreviewImg = UI.G(_oSelf._getDomId("previewimg")),
					_sTimer = UI.A(_oPreviewImg, _sTIMER);
				_sTimer && clearTimeout(_sTimer);
				if (UI.A(_oPreviewImg, "hd") != "1")
				{
					UI.show(_oPreviewImg);
				}
				return false;
			},

			_hideimg : function(_aoEvent, _aoTarget)
			{
				var _oSelf = this,
					_sTIMER = "timer",
					_oPreviewImg = UI.G(_oSelf._getDomId("previewimg"));
				var _nTimer = setTimeout(function()
					{
						UI.hide(_oPreviewImg);
						UI.A(_oPreviewImg, _sTIMER, "");
					},
				150);
				UI.A(_oPreviewImg, _sTIMER, "" + _nTimer);
				return false;
			},

			_removeImage : function(_aoEvent, _aoTarget)
			{
				UI.E(_aoEvent).prevent();
				return this._setUploadStatus()._initUpload(0);
			},

			_selAddr : function(_aoEvent, _aoTarget, _abForceClose)
			{
				_aoEvent && UI.E(_aoEvent).prevent();
				var _oSelf = this,
					_sWBPMOPENSELECTADDR = "wbpmopenselctaddr";
				_aoTarget = _aoTarget || G(_oSelf._getDomId("seladdr"));
				if (A(_aoTarget,"dsa")=="1")
				{
					return false;
				}
				if (UI.hasClass(_aoTarget, _sWBPMOPENSELECTADDR) || _abForceClose === true)
				{
					UI.removeClass(_aoTarget, _sWBPMOPENSELECTADDR);
					_oSelf._moAutoComplete.setMultiple(0);
				}
				else
				{
					UI.addClass(_aoTarget, _sWBPMOPENSELECTADDR);
					_oSelf._moAutoComplete.setMultiple(1);
				}

				return false;
			},

			/**
			 *  删除上传后的语音，（也可以用在初始化上传语音）
			 *
			 */
			_rmRecord : function(_aoEvent)
			{
				_aoEvent && UI.E(_aoEvent).prevent();
				var _oSelf = this;
				_display(_oSelf._getDomId("musicrecordsuc"), 0);
				_display(_oSelf._getDomId("musicrecordcontainer"), 0);
				_display(_oSelf._getDomId("musicrecord"), 1); //!!MI.user.isLab
				_oSelf._msMusicReocrdUrl = "";
				_oWin.getMicRecUploadResult = _oWin.getRecDuration = null;
				return false;
			},

			_musicrecord : function(_aoEvent, _aoTarget)
			{
				UI.E(_aoEvent).prevent();
				//todo 暂时代码
				var _oSelf = this,
					_sFlashCode = PM.TMPL.musicRecorder( {
							recorder : MI.swf && MI.swf.MusicRecord,
							lang : _oWin.MILang
						} ),
					_oRecordContainer = G(_oSelf._getDomId("musicrecordcontainer"));
					_bShow = !_display(_oRecordContainer);
				_display(_oRecordContainer, _bShow);
				if (_bShow)
				{
					_oWin.getMicRecUploadResult = function(_anResult, _asUrl, _asShortUrl)
						{
							if (_anResult == 0)
							{
								//成功上传
								_display(_oSelf._getDomId("musicrecord"), 0);
								_display(_oSelf._getDomId("musicrecordsuc"), 1);
								_display(_oRecordContainer, 0);
								_oSelf._msMusicReocrdUrl = _asUrl;
							}
							//else
							//{
								//失败，会在flash上有提示，js不不再处理了
							//}
						};
					_oWin.getRecDuration = function()
						{
							// [总时间,警告开始时间,倒数开始时间,上传类型：私信语音微博]
							// 1分钟
							return [60, 40, 50, 16];
						};

					//设置flash，需要在getMicRecUploadResult与getRecDuration之后
					G(_oSelf._getDomId("recordflash")).innerHTML = MI.Flash.getVersion() < 9 ? MI.Flash.updateTip(9) : _sFlashCode;
				}
				else
				{
					_oWin.getMicRecUploadResult = _oWin.getRecDuration = null;
				}
				return false;
			},

			_addface : function(_aoEvent, _aoTarget)
			{
				UI.E(_aoEvent).prevent();
				var _oSelf = this;

				//debug(); 
				MI.TalkBox.prototype.addFace.call({
					"_face" : _aoTarget,
					"_pic" : _oSelf._moCfg.bDisImg ? null : MI.TalkBox.prototype.addFaceArt,
					hideFace : MI.TalkBox.prototype.hideFace,
					addFaceArt : _oSelf._moCfg.bDisImg ? null : MI.TalkBox.prototype.addFaceArt,
					addTopic : function(_asValue)
					{
						//var _oTextarea = UI.GC(_oSelf._moDom, 'textarea')[0];
						var _oTextarea = G(_oSelf._getDomId("editor"));
						_oTextarea.focus();
						setTimeout(function()
							{
								MI.insertTxt(_oTextarea, _asValue, MI.cursorX(_oTextarea));
								_oSelf._textCount(_oTextarea);
							},
							100
						);
					},
					addPic : function(_aoValue)
					{
						//{result:0,msg:_("上传成功"),info:{image:"http://t0.qpic.cn/mblogpic/"+a.addFaceArt[d],fileName:d+".jpg"}}
						if (_aoValue.result == 0)
						{
							//_asValue.info.image
							//_asValue.info.fileName
							_oSelf._initUpload(2, _aoValue);
						}
					}
				});
			},

			_textCount : function(_aoTextarea)
			{
				var _oSelf = this,
					_oTextCount = UI.G( _oSelf._getDomId("count") ),
					_nMAX = 140,
					_sValue = _aoTextarea.value,
					_sDefTxt = _oSelf._moCfg.sDefTxt,
					_nCount = _nMAX - MI.countTxt(_sDefTxt && _sValue == _sDefTxt ? '' : _sValue, 1);
					//_nCount = _nMAX - Math.ceil(_trim(_sDefTxt && _sValue == _sDefTxt ? '' : _sValue).replace(_oREGTEXTCOUNT, "aa").length / 2);
				_oTextCount.innerHTML = PM.TMPL.textcnt({ cnt : _nCount });

				_oSelf._checkSendDisabled();

				return _nCount;
			},

			_checkSendDisabled : function()
			{
				//btn_send_disabled
				var _oSelf = this,
					_oTo = UI.G(_oSelf._getDomId("to")),
					_bTo = !_oTo || !!_oTo.value,
					_sContent = UI.G(_oSelf._getDomId("editor")).value,
					_bContent = !!_sContent && (!_oSelf._moCfg.sDefTxt || _sContent != _oSelf._moCfg.sDefTxt);
				UI[_bTo && _bContent ? "removeClass" : "addClass"](UI.G(_oSelf._getDomId("send")), "btn_send_disabled");
				return _oSelf;
			},

			//回复
			_send : function(_aoEvent, _aoTarget)
			{
				UI.E(_aoEvent).prevent();
				var _oSelf = this,
					_oDom = _oSelf._moDom,
					_sTid = _oSelf._moCfg.sTid || "",
					_oTextarea = G(_oSelf._getDomId("editor")), 
					_sValue = _trim(_oTextarea.value),
					_oTipDlg = new MI.Dialog(),
					_sTRANSPARENT = "transparent",
					_sCOLOR = "#FFFBE9",
					_sToList = _oSelf._moCfg.sTo || "",
					_oToList = G(_oSelf._getDomId("to")),
					_sMeAccount = "";
				//1. 检测
				if (_oToList)
				{
					_sToList = _sToList + _sSEPARATEADDR + _oToList.value;
				}
				if (_sTid)
				{
					_sMeAccount = _getInst(_sTid).ma;
				}
				if (_sToList == _sMeAccount)
				{
					_sToList = _getAccount(_sToList, _sMeAccount, true, true).join(_sSEPARATEADDRCGI);
				}
				else
				{
					_sToList = _getAccount(_sToList, _sMeAccount, true).join(_sSEPARATEADDRCGI);
				}
				if (!_sToList)
				{
					_waitFor(
						function(_nTime)
						{
							UI.C(_oToList, _sBACKGROUNDCOLOR, (_nTime & 1) ? _sTRANSPARENT : _sCOLOR);
						},
						null,
						150,
						600
					);
					_oToList.focus();
					return;
				}
				if (!_getABLEMULTISEND())
				{
					//与产品确认了
					_sToList = _sToList.split(_sSEPARATEADDRCGI)[0];
				}

				if (!_sValue || (_oSelf._moCfg.sDefTxt && _sValue == _oSelf._moCfg.sDefTxt))
				{
					_waitFor(
						function(_nTime)
						{
							UI.C(_oTextarea, _sBACKGROUNDCOLOR, (_nTime & 1) ? _sTRANSPARENT : _sCOLOR);
						},
						null,
						150,
						600
					);
					_oTextarea.focus();
					return;
				}
				if (_oSelf._textCount(_oTextarea) < 0)
				{
					var _oComposeCount = UI.G(_oSelf._getDomId("count"));
					_waitFor(
						function(_nTime)
						{
							UI[(_nTime & 1) ? "show" : "hide"](_oComposeCount);
						},
						null,
						150,
						600
					);
					_oTextarea.focus();
					return;
				}

				_oSelf._mbSending = 1; //由于发送，阻止取消上传图片操作
				UI.addClass(_oSelf._moDom, _sWBMPSENDING);
				_oTextarea.blur();

				var _oForm = UI.GC(_oDom, "form")[0],
					_fSend = function(_aoJson, _abUploadImgCallback)
					{
						//2. 等待图片发送完回调
						if ( _abUploadImgCallback && !(_aoJson && _aoJson.url) )
						{
							UI.removeClass(_oSelf._moDom, _sWBMPSENDING);

							_oTipDlg.showTip({
								html	: _('上传图片失败'),
								ico		: 'ico_te',
								delay	: 2000
							});
							return ;
						}

						//3. 发送文本
						//向个人发信
						//?target=(联系人，如果多于1个，就是多人会话，格式：account1,account...)&content=(内容)&fid=(上传图片的fileid)&murl=(录音的url)&ptid=(如果有，就是回复)&roomid=(非空，就是多人会话回复)&source=(用来打日志，统计是那里操作)
						_sendToCgi(
							{
								//潜规则：如果source : reply, cgi不会加新人
								//解决，A 退出房间，B在这房间回复，把A加入这房间
								source : ["", "profile", "new", "home", "reply"][_oSelf._moCfg.nFrom] || "",
								ptid : _sTid,
								//roomid : _sTid && _getInst(_sTid).mc ? _sTid : "",
								roomid : _sTid && _isRoomId(_sTid) ? _sTid : "",
								//reply : _oSelf._moCfg.bDlg ? 0 : 1,
								content : _sValue,
								fid : UI.A(_oForm, "f") || '',
								arturl : UI.A(_oForm, "art") || '',
								//todo
								murl : _oSelf._msMusicReocrdUrl,
								target : _sToList
							},
							function(_abSuccess, _aoParam)
							{
								_oSelf._mbSending = 0;
								UI.removeClass(_oSelf._moDom, _sWBMPSENDING);

								//debug();
								if (_abSuccess)
								{
									//发送成功
									_oTextarea.value = "";
									_oSelf._initDefaultText(_oTextarea)._setUploadStatus()._initUpload(0)._textCount(_oTextarea);
									_oSelf._rmRecord();

									//debug();
									_setDataFromCompose( _aoParam );

									_oSelf._moCfg.onsendcomplete && _oSelf._moCfg.onsendcomplete(_abSuccess, _aoParam);

									if (_oSelf._moCfg.bDlg)
									{
										var _oAddFollow = _aoParam.addfollow;
										if (_oAddFollow && _oAddFollow.length)
										{
											_aoParam.func = "send";
											_showAddFollow(_aoParam);
										}
										else
										{
											_oTipDlg.showTip({
												html	: _aoParam.errmsg
													|| _("发送成功"),
												ico		: 'ico_ts',
												delay	: 1000
											});
										}
									}
								}
								else
								{
									//失败
									_oTipDlg.showTip({
										html	: _aoParam.errmsg || _("发送失败，请重试"),
										ico		: 'ico_te',
										delay	: 3000
									});

									if (_aoParam.errcode == "-210")
									{
										_oToList && _oToList.select();
									}
								}
							}
						);

						var _sBosType = _oSelf._moCfg.sBosType;
						_sBosType && MI.Bos(_sBosType);
					};

				if (UI.A(_oForm, "s") == "1")
				{
					_oSelf._mfUploadImageComplete = _fSend;
				}
				else
				{
					_fSend(null, false);
				}
			},

			/**
			 *
			 *  @param {Integer} _anType 0或undefined: form; 1: activex, 2: 艺术表情
			 *  @param {Object} _aoData
			 */
			_initUpload : function(_anType, _aoData)
			{
				_aoData = _aoData || {};
				var _oSelf = this,
					_fUploading = function(_aoForm)
						{
							_oSelf._setUploadStatus(_sWBPMUPLOADING);
						},
					_afComplete = function(_aoJson, _aoForm)
						{
							if (_aoJson && (_aoJson.url || _aoJson.arturl))
							{
								var	_oPreviewImg = UI.G(_oSelf._getDomId("previewimg")),
									_oPreview = UI.GT(_oPreviewImg, "img")[0],
									_sFileName = _aoJson.filename.replace(/.*(\\|\/)/, ""),
									_oFile = _sFileName.split("."),
									_sPostfixName = _oFile.pop(),
									_sPrefixName = _oFile.join(".");

								UI.A(_oPreviewImg, "hd", "1");
								_oPreview.onload = function()
								{
									UI.A(_oPreviewImg, "hd", "0");
								};
								if (_aoJson.url)
								{
									_oPreview.src = _sHost + _aoJson.url.substr(1);
								}
								else
								{
									_oPreview.src = _aoJson.arturl
								}
								_sPrefixName = _subAsiiStr(_sPrefixName, 10, "...");
								var _oSpan = UI.G( _oSelf._getDomId("imgname") );
								_oSpan.innerHTML = _sPrefixName + "." + _sPostfixName;
								_oSpan.title =  _sFileName;
								_oSelf._setUploadStatus(_sWBPMSECCUPLOAD);
							}
							else
							{
								UI.GC(_oSelf._moDom, "span.wbpmfailuploadtxt")[0].innerHTML = _aoJson && _aoJson.errmsg || _('上传失败，请重新上传');
								_oSelf._setUploadStatus(_sWBPMFAILUPLOAD);
								_oSelf._initUpload(0);
							}
							_oSelf._mfUploadImageComplete && _oSelf._mfUploadImageComplete(_aoJson, true);
						};

				//if (_oSelf._moCfg.sCid == "embed")
				if (_oSelf._moCfg.bDisImg)
				{
					//禁用图片
					_display( UI.GC(_oSelf._moDom, "a.wbpmimg")[0], false);
					return _oSelf;
				}
				
				_stopUploadImageWidthActiveX();

				var _oForm = UI.GC(_oSelf._moDom, "form")[0];
				UI.A(_oForm, "art", "");

				//注意，_initUploadImage会修改form，不能保存form变量
				!_anType && _initUploadImage(_oForm, _fUploading, _afComplete);
				
				_anType == 1 && _startUploadImageWithActiveX(_oForm, _fUploading, _afComplete);

				if (_anType == 2)
				{
					//艺术表情
					UI.A(_oForm, "s", "2");
					UI.A(_oForm, "n", _aoData.info.fileName);
					UI.A(_oForm, "u", "");
					UI.A(_oForm, "f", "");
					UI.A(_oForm, "art", _aoData.info.image);
					_afComplete({
						murl : _aoData.info.image + "/",
						filename : _aoData.info.fileName
					}, _oForm);
				}

				return _oSelf;
			},

			_initDefaultText : function(_aoTextarea)
			{
				var _oSelf = this,
					_oTextarea = _aoTextarea;// || UI.GC(_oSelf._moDom, "textarea")[0];
				if (_oSelf._moCfg.sDefTxt)
				{
					_oTextarea.value = _oSelf._moCfg.sDefTxt;
					UI.addClass(_oTextarea, _sWBPMTXTDEFAULT);
				}
				return _oSelf;
			},

			_initEvent : function()
			{
				var _oSelf = this,
					_oEvents =
					{
						edit : _oSelf._edit,
						cancel : _oSelf._cancel,
						showimg : _oSelf._showimg,
						hideimg : _oSelf._hideimg,
						rmimg : _oSelf._removeImage,
						cancelupload : _oSelf._removeImage,

						seladdr : _oSelf._selAddr,

						//stop : _oSelf._stopPropagation
						musicrecord : _oSelf._musicrecord,
						rmrecord : _oSelf._rmRecord,
						face : _oSelf._addface,
						send : _oSelf._send
					};

				_oSelf._moDom.onkeydown = function(_aoEvent)
				{
					_aoEvent = _aoEvent || _oWin.event;
					if (_oSelf._mbSending)
					{
						UI.E(_aoEvent).prevent();
					}
					else
					{
						if (_oSelf._moCfg.sCid == "dlg" && _aoEvent.keyCode == 27)
						{
							_oSelf._cancel(_aoEvent, _oSelf._moDom);
						}
						else
						{
							_simpleTagEvent(_aoEvent, "kd", _oEvents, _oSelf);
						}
					}
				};

				_oSelf._moDom.onclick = function(_aoEvent)
				{

					if (_oSelf._mbSending)
					{
						_aoEvent = _aoEvent || _oWin.event;
						UI.E(_aoEvent).prevent();
					}
					else
					{
						_simpleTagEvent(_aoEvent, "ck", _oEvents, _oSelf);
					}
				};

				_oSelf._moDom.onmousedown = function(_aoEvent)
				{
					if (_oSelf._mbSending)
					{
						_aoEvent = _aoEvent || _oWin.event;
						UI.E(_aoEvent).prevent();
						UI.E(_aoEvent).stop();
					}
					else
					{
						_simpleTagEvent(_aoEvent, "md", _oEvents, _oSelf);
					}
				};

				_oSelf._moDom.onmouseover = function(_aoEvent)
				{
					if (_oSelf._mbSending)
					{
						_aoEvent = _aoEvent || _oWin.event;
						UI.E(_aoEvent).prevent();
					}
					else
					{
						_simpleTagEvent(_aoEvent, "mor", _oEvents, _oSelf);
					}
				};

				_oSelf._moDom.onmouseout = function(_aoEvent)
				{
					if (_oSelf._mbSending)
					{
						_aoEvent = _aoEvent || _oWin.event;
						UI.E(_aoEvent).prevent();
					}
					else
					{
						_simpleTagEvent(_aoEvent, "mot", _oEvents, _oSelf);
					}
				};

				var _oTextarea = G(_oSelf._getDomId("editor"));
				//var _fTextareaResize = function(_aoTextarea){},
				//if (!_oSelf._moCfg.bDlg)
				//{
				//	_oTextarea.style.overflow = "hidden";
				//	if (UI.B.ie)
				//	{
				//		_fTextareaResize = function(_aoTextarea)
				//		{
				//			_aoTextarea.style.height = _aoTextarea.scrollHeight + "px";
				//		};
				//	}
				//	else
				//	{
				//		_fTextareaResize = function(_aoTextarea)
				//		{
				//			_aoTextarea.style.height = "18px";
				//			_aoTextarea.style.height = _aoTextarea.scrollHeight + "px";
				//		};
				//	}
				//}

				_oTextarea.onfocus = function()
				{
					//debug('onfocus');
					UI.addClass(_oTextarea, _sWBPMFOCUS);

					if (_oSelf._moCfg.sDefTxt && _oTextarea.value == _oSelf._moCfg.sDefTxt)
					{
						_oTextarea.value = "";
						UI.removeClass(_oTextarea, _sWBPMTXTDEFAULT);
					}
					//debug('onfocus end');
				};
				_oTextarea.onblur = function()
				{
					UI.removeClass(_oTextarea, _sWBPMFOCUS);
					if (_oSelf._moCfg.sDefTxt && !_oTextarea.value)
					{
						_oTextarea.value = _oSelf._moCfg.sDefTxt;
						UI.addClass(_oTextarea, _sWBPMTXTDEFAULT);
					}
				};

				_wbpm_MIRun(function()
				{
					_oSelf._initDefaultText(_oTextarea);

					MI.app({
						Base : function(){
							new MI.AutoCmt({
								target : _oTextarea,
								key : 1,
								topic : 1,
								face : 1,
								call : function(){
									_oSelf._textCount(_oTextarea);
								}
							});
						}
					});

					if (UI.B.ie)
					{
						UI.EA(_oTextarea, "propertychange", function()
							{
								_oSelf._textCount(_oTextarea);
								//_fTextareaResize(_oTextarea);
							}
						);
					}
					else
					{
						UI.EA(_oTextarea, "input", function()
							{
								_oSelf._textCount(_oTextarea);
								//_fTextareaResize(_oTextarea);
							}
						);
					}
					_oSelf._initUpload(0);

					//初始化控件
					MI.app(
						{
							Capture : function()
								{
									_oSelf._mbCapture = MI.Capture.enable;
								}
						}
					);

					var _oAddrInput = G(_oSelf._getDomId("to"));
					if (_oAddrInput)
					{
						var _fResizeHeight = _wrapTextareaResizeHeight(_oAddrInput, function()
								{
									_oSelf._checkSendDisabled();
								}
							);

						if (!A(_oAddrInput, "readonly"))
						{
							_oSelf._moAutoComplete = new _simpleAutoComplete({
								oDom : _oAddrInput,
								ongetdata : _filterAddr,
								onhide : function()
								{
									_oSelf._selAddr(null, null, true);
								},
								onselect : function(_asValue)
								{
									//_oAddrInput.value = _getAccount( (_oSelf._moCfg.sTo || "") + _sSEPARATEADDR + _oAddrInput.value ).join(_sSEPARATEADDR) + _sSEPARATEADDR;
									_oAddrInput.value = _getAccount(_oAddrInput.value, _oSelf._moCfg.sTo || "").join(_sSEPARATEADDR) + _sSEPARATEADDR;
									_oSelf._checkSendDisabled();
									//_oInput.value = _asValue;
									_fResizeHeight();

									_oSelf._moAutoComplete._pos();
								}
							});
						}

						if (UI.B.ie)
						{
							UI.EA(_oAddrInput, "propertychange", _fResizeHeight);
						}
						else
						{
							UI.EA(_oAddrInput, "input", _fResizeHeight);
						}
					}

					//录音
					_display(_oSelf._getDomId("musicrecord"), 1); //!!MI.user.isLab
				});

				return _oSelf;
			},

			/**
			 *
			 * @param {Object} _aoCfg
			 *		{
			 *			oDom : 一般为pmlist或pmrecord的div
			 *			sTo
			 *
			 *			onsendcomplete : function() 发信完，回调
			 *		}
			 */
			_init : function(_aoCfg)
			{
				var _oSelf = this;
				_oSelf._moCfg = _aoCfg;
				A(_oSelf._moDom = _aoCfg.oDom, "s", "1");
				_oSelf._mbSending = 0;
				_oSelf._mfUploadImageComplete = null; //用于在上传图片中，点击发信，让发信等待上传完图片

				_oSelf._msMusicReocrdUrl = "";

				_oSelf._initEvent();
			}
		};


		/**
		 *  发完信，邀请添加关注人
		 *
		 */
		function addFollowCtrl(_aoCfg)
		{
			this._init(_aoCfg);
		}

		addFollowCtrl.prototype = {
			_getDomId : function(_asId)
			{
				return "wbpminvite" + (_asId || "");
			},

			_destroy : function()
			{
				var _oSelf = this;
				if (_oSelf._moDom)
				{
					_oSelf._moDom = null;
				}
				return _oSelf;
			},

			_addFollower : function(_aoEvent, _aoTarget)
			{
				_aoEvent && UI.E(_aoEvent).prevent();
				var	_sWBPMAFREQUEST = "wbpmafrequest",
					_sWBPMFOLLOWER = "wbpmfollower",
					_sWBPMAFFAIL = "wbpmaffail";

				//debug();
				var _oSelf = this,
					_sAccount = A(_aoTarget, "ac"),
					_oWbpmaf = UI.parents(_aoTarget, "wbpmaf")[0],
					_bIsFollower = UI.hasClass(_oWbpmaf, _sWBPMFOLLOWER);
				
				UI.removeClass(_oWbpmaf, _sWBPMAFFAIL);
				UI.addClass(_oWbpmaf, _sWBPMAFREQUEST);
				(_bIsFollower ? _delFollowerToCgi : _addFollowerToCgi)({target : _sAccount}, function(_abIsOk)
					{
						if (_oSelf._moDom)
						{
							UI.removeClass(_oWbpmaf, _sWBPMAFREQUEST);
							if (_abIsOk)
							{
								UI[_bIsFollower ? "removeClass" : "addClass"](_oWbpmaf, _sWBPMFOLLOWER);
							}
							else
							{
								UI.addClass(_oWbpmaf, _sWBPMAFFAIL);
							}
						}
					}
				);
				return false;
			},

			_initEvent : function()
			{
				var _oSelf = this,
					_oEvents =
					{
						add : _oSelf._addFollower
					};

				_oSelf._moDom.onclick = function(_aoEvent)
				{
					_simpleTagEvent(_aoEvent, "ck", _oEvents, _oSelf);
				};
				return _oSelf;
			},

			_init : function(_aoCfg)
			{
				var _oSelf = this;
				_oSelf._moCfg = _aoCfg;
				_oSelf._moDom = _aoCfg.oDom;
				_oSelf._initEvent();
			}
		};

		function _showAddFollow(_aoParam)
		{
			var _oAddFollowControl;
			MI.dialog.show({
				width:590,
				noReserve : true,
				html : PM.TMPL.addfollow(_aoParam),
				start:function()
				{
					var _oDom = MI.dialog["_cont"];
					_oAddFollowControl = new addFollowCtrl(
						{
							oDom : _oDom
						}
					);
				},
				end : function()
				{
					_oAddFollowControl && _oAddFollowControl._destroy();
					_MIDialogCleanHack();
				}
			});
		}


		/**
		 *  收件人编辑
		 *
		 *  @param {Object} _aoCfg {
		 *		oDom : wbpmadd的div
		 *		sTo : 已经存在的收件人
		 *
		 *		onchange : function()
		 *  }
		 */
		function addrCtrl(_aoCfg)
		{
			this._init(_aoCfg);
		}

		addrCtrl.prototype = {
			_getDomId : function(_asId)
			{
				return "wbpminvite" + (_asId || "");
			},

			getAddr : function()
			{
				var _oSelf = this,
					_oAddrInput = UI.GC(_oSelf._moDom, "textarea")[0]; //潜规则
				return _oAddrInput.value;
			},

			_selAddr : function(_aoEvent, _aoTarget, _abForceClose)
			{
				_aoEvent && UI.E(_aoEvent).prevent();
				var _oSelf = this,
					_sWBPMOPENSELECTADDR = "wbpmopenselctaddr";
				_aoTarget = _aoTarget || G(_oSelf._getDomId("seladdr"));
				if (UI.hasClass(_aoTarget, _sWBPMOPENSELECTADDR) || _abForceClose === true)
				{
					UI.removeClass(_aoTarget, _sWBPMOPENSELECTADDR);
					_oSelf._moAutoComplete.setMultiple(0);
				}
				else
				{
					UI.addClass(_aoTarget, _sWBPMOPENSELECTADDR);
					_oSelf._moAutoComplete.setMultiple(1);
				}

				return false;
			},

			_destroy : function()
			{
				var _oSelf = this;
				if (_oSelf._moDom)
				{
					_oSelf._moAutoComplete._hide(1);
					_oSelf._moDom = null;
				}
				return _oSelf;
			},

			_initEvent : function()
			{
				var _oSelf = this,
					_oEvents =
					{
						seladdr : _oSelf._selAddr
					};

				_oSelf._moDom.onmousedown = function(_aoEvent)
				{
					//todo 正在发信过程的屏蔽
					_simpleTagEvent(_aoEvent, "md", _oEvents, _oSelf);
				};
				var _oAddrInput = UI.GC(_oSelf._moDom, "textarea")[0];
				if (_oAddrInput)
				{
					/*
					var _fResizeHeight = function()
						{
							//!UI.B.ie && (_oAddrInput.style.height = "0px");
							//_oAddrInput.style.height = _oAddrInput.scrollHeight + 'px';
							if (!UI.B.ie)
							{
								var _sPaddingBottom = _oAddrInput.style.paddingBottom,
									_sPaddingTop = _oAddrInput.style.paddingTop;
								
								_oAddrInput.style.paddingBottom = "0px;"
								_oAddrInput.style.paddingTop = "0px";
								_oAddrInput.style.height = "0px";
							}
							_oAddrInput.style.height = _oAddrInput.scrollHeight + 'px';
							if (!UI.B.ie)
							{
								_oAddrInput.style.paddingBottom = _sPaddingBottom;
								_oAddrInput.style.paddingTop = _sPaddingTop;
							}



							var _fChange = _oSelf._moCfg.onchange;
							_fChange && _fChange();
						};
					*/

					var _fResizeHeight = _wrapTextareaResizeHeight(_oAddrInput, function()
							{
								var _fChange = _oSelf._moCfg.onchange;
								_fChange && _fChange();
							}
						);

					_oSelf._moAutoComplete = new _simpleAutoComplete({
						oDom : _oAddrInput,
						ongetdata : _filterAddr,
						onhide : function()
						{
							_oSelf._selAddr(null, null, true);
						},
						onselect : function(_asValue)
						{
							//_oSelf._moCfg.sTo
							_oAddrInput.value = _getAccount(_oAddrInput.value, "").join(_sSEPARATEADDR) + _sSEPARATEADDR;
							//_oInput.value = _asValue;
							_fResizeHeight();

							_oSelf._moAutoComplete._pos();
						}
					});

					if (UI.B.ie)
					{
						UI.EA(_oAddrInput, "propertychange", _fResizeHeight);
					}
					else
					{
						UI.EA(_oAddrInput, "input", _fResizeHeight);
					}
				}
			},

			_init : function(_aoCfg)
			{
				var _oSelf = this;
				_oSelf._moCfg = _aoCfg;
				_oSelf._moDom = _aoCfg.oDom;
				_oSelf._initEvent();
			}
		};




		var _sWBPMSELECTED = "wbpmselected",
			_oSEPARATEREG = /[\x3B\x2C\uFF1B\uFF0C]/, //";", ",", "；", "，"  \x20空格
			_oACCOUNTFORMAT = /.*\(@?(.+)\)/,
			_sSEPARATEADDR = "; ",
			_sSEPARATEADDRCGI = ","	;


		/**
		 *
		 *
		 *
		 *
		 */
		function _getAccount(_asValue, _asOtherValue, _abOnlyAccount, _abCanRepeat)
		{
			//格式1: nickname1(@account1); nickname2(@account2);
			//输出 [account1, account2]
			//格式2: string1; string2;
			//输出 [string1, string2](可能包含@)
			var _sValue = _asValue,
				_oItems = _sValue.split(_oSEPARATEREG),
				_oOtherItems = _asOtherValue.split(_oSEPARATEREG),
				_oMap = {},
				_oResult = [],
				i,
				_sItem,
				_sAccount;
			for (i = _oOtherItems.length - 1; i >= 0; i--)
			{
				if (_sItem = _trim(_oOtherItems[i]))
				{
					_sAccount = _oACCOUNTFORMAT.test( _sItem ) ? RegExp.$1 : _sItem;
					_oMap[_sAccount] = 1;
				}
			}
			for (i = _oItems.length - 1; i >= 0; i--)
			{
				if (_sItem = _trim(_oItems[i]))
				{
					_sAccount = _oACCOUNTFORMAT.test( _sItem ) ? RegExp.$1 : _sItem;
					if (_abCanRepeat || !_oMap[_sAccount])
					{
						_oResult.unshift(_abOnlyAccount ? _sAccount : _sItem);
						_oMap[_sAccount] = 1;
					}
				}
			}
			return _oResult;
		}

		/**
		 *  简单的自动完成
		 *  特定，
		 *		1. 由于显示内容最大32+2字符，所以用定长宽
		 *		2. 不良好支持中文输入，就是不用定时器，不考虑挡住select；不解决opera连续输入向上键(38)和向下键(40)
		 *		3. 使用unselectable="on"和keydown false来防止失焦
		 *
		 */
		function _simpleAutoComplete(_aoCfg)
		{
			this._init(_aoCfg);
		}

		_simpleAutoComplete.prototype =
		{
			//	show : function(_asValue)
			//	{
			//		var _oSelf = this,
			//			_sFind = _oSelf._separate()[2];
			//		_oSelf._moHtml = _oSelf._moCfg.ongetdata(_sFind);
			//		return _oSelf._show();
			//	},

			_selected : function()
			{
				var _oSelf = this,
					_oSep = _oSelf._separate(),
					_nCursor,
					_sTmp,
					_sValue = "";
				if (_sTmp = _trim(_oSep[0]))
				{
					_sValue = _sTmp + " ";
				}
				_sValue = _sValue + _oSelf._getSelectData() + _sSEPARATEADDR;
				_nCursor = _sValue.length;
				if (_sTmp = _trim(_oSep[3]))
				{
					_sValue = _sValue + _sTmp + " ";
				}
				_oSelf._moDom.value = _sValue;
				MI.selectTxt(_oSelf._moDom, _nCursor, _nCursor, _nCursor);
				_oSelf._moCfg.onselect();
				return _oSelf;
			},

			setMultiple : function(_abMultiple)
			{
				var _oSelf = this;
				if (_oSelf._moCfg.bMultiple = !!_abMultiple)
				{
					_oSelf._show();
				}
				else
				{
					_oSelf._hide();
				}
				return _oSelf;
			},

			_separate : function()
			{
				//例子: 123;456;789;
				//           |(光标)
				//返回  ["123;", "456;", "45", "789;"]
				var _oSelf = this,
					_oDom = _oSelf._moDom,
					_sValue = _oDom.value,
					_nLen = _sValue.length,
					_nCursorX = MI.cursorX(_oDom),
					_nBegin = Math.max(_nCursorX - 1, 0),
					_nEnd = _nCursorX;
				while(_nBegin >= 0)
				{
					if (_oSEPARATEREG.test(_sValue.charAt(_nBegin)))
					{
						break;
					}
					_nBegin--;
				}
				_nBegin++;
				while(_nEnd < _nLen)
				{
					if (_oSEPARATEREG.test(_sValue.charAt(_nEnd)))
					{
						break;
					}
					_nEnd++;
				}
				return [ _sValue.substr(0, _nBegin), _sValue.substr(_nBegin, _nEnd - _nBegin), _sValue.substring(_nBegin, _nCursorX), _sValue.substr(_nEnd + 1) ];
			},

			_pos : function()
			{
				var _oSelf = this,
					_oDom = _oSelf._moDom,
					_oPanelStyle = _oSelf._moPanel.style;
				_oPanelStyle.top = (UI.getY(_oDom) + UI.height(_oDom) + 5) + 'px';
				_oPanelStyle.left = UI.getX(_oDom) + 'px';
				return _oSelf;
			},

			_show : function()
			{
				//debug();
				var _oSelf = this,
					_oDom = _oSelf._moDom,
					_oPanel = _oSelf._moPanel,
					_oBody = _oSelf._moBody,
					_sFind = _oSelf._separate()[2],
					_oHtml = _oSelf._moCfg.ongetdata(_sFind);

				if (!_oHtml || !_oHtml.length)
				{
					return UI.hide(_oPanel);
				}
				_oBody.innerHTML = _oHtml.join("");
				var _oItem = _oBody.firstChild,
					_nIndex = 0;
				_oSelf._moCacheDom = [];
				if (_oItem)
				{
					_oSelf._nSelIndex = 0;
					UI.addClass(_oItem, _sWBPMSELECTED);
				}
				while(_oItem)
				{
					if (_oItem.tagName == "DIV")
					{
						UI.A(_oItem, "idx", "" + _nIndex++);
						_oSelf._moCacheDom.push(_oItem);
					}
					_oItem = _oItem.nextSibling;
				}
				_oBody.scrollTop = 0;
				var _nCacheDomLen = _oSelf._moCacheDom.length;
				_oBody.style.height = _nCacheDomLen < 10 ? (_nCacheDomLen ? "auto" : "0px") : "150px";

				_oSelf._pos();
				UI.show(_oPanel);
				return _oSelf;
			},
			_hide : function(_abForce)
			{
				var _oSelf = this,
					_fhide = _oSelf._moCfg.onhide,
					_bMultiple = _oSelf._moCfg.bMultiple,
					_bDisplay = _display(_oSelf._moPanel);
				//debug(["_bMultiple", _bMultiple]);
				if ( (_abForce || !_bMultiple) && _bDisplay )
				{
					UI.hide(_oSelf._moPanel);
					_fhide && _fhide();
				}
				return _oSelf;
			},

			_isShow : function()
			{
				return this._moPanel.style.display != "none";
			},

			_getSelectData : function()
			{
				var _oSelf = this,
					_oDom = _oSelf._moCacheDom[_oSelf._nSelIndex];
				return _oDom ? UI.A(_oDom, "addr").replace(/(.+)\|(.+)/, "$1(@$2)") : "";
			},

			_setSelectItem : function(_aoOffset, _abAbsolute, _abMidView)
			{
				var _oSelf = this,
					_oDom = _oSelf._moCacheDom[_oSelf._nSelIndex],
					_nLen = _oSelf._moCacheDom.length;
				UI.removeClass(_oDom, _sWBPMSELECTED);
				_nIndex = (_abAbsolute ? _aoOffset : _oSelf._nSelIndex + _nLen + _aoOffset) % _nLen;
				UI.addClass(_oDom = _oSelf._moCacheDom[_oSelf._nSelIndex = _nIndex], _sWBPMSELECTED);
				_abMidView && _oSelf._scrollIntoMidView(_oDom);
				return _oSelf;
			},

			/**
			 *
			 *
			 *
			 */
			_scrollIntoMidView : function(_aoItem)
			{
				var _oSelf = this,
					_oBody = _oSelf._moBody,
					_nClientHeightPanel = _oBody.clientHeight,
					_nScrollTopPanel = _oBody.scrollTop,
					_nOffsetTopItem = _aoItem.offsetTop,
					_nOffsetHeightItem = _aoItem.offsetHeight;

				if (_nScrollTopPanel >= _nOffsetTopItem || _nScrollTopPanel + _nClientHeightPanel <= _nOffsetTopItem + _nOffsetHeightItem)
				{
					_oBody.scrollTop = _nOffsetTopItem - _nClientHeightPanel / 2;
				}
				return _oSelf;
			},

			_initEvent : function()
			{
				var _oSelf = this,
					_oDom = _oSelf._moDom,
					_oPanel = _oSelf._moPanel;

				UI.EA(_oDom, "keydown", function(_aoEvent)
					{
						var _oEvent = UI.E(_aoEvent),
							_nKeyCode = _aoEvent.keyCode;
						//keydown最近的keycode，解决在中文输入法打开下的情况
						_oSelf._mnKeydownCode = _nKeyCode;

						//debug(["_oSelf._isShow()", _oSelf._isShow(), _nKeyCode]);

						if (_oSelf._isShow())
						{
							switch (_nKeyCode)
							{
								case 13 : //enter
									_oEvent.prevent();
								case 9	: //Tab
									//todo
									//_oSelf._moCfg.onselect( _oSelf._getSelectData() );
									_oSelf._selected()._hide(0);
									break;
								case 38 : // up
								case 40 : // down
									_oSelf._setSelectItem(_nKeyCode - 39, false, true);
									_oEvent.prevent();
									break;
								case 27 : // esc
									_oSelf._hide(1);
									_oEvent.prevent();
									break;
							}
						}
					}
				);

				UI.EA(_oDom, "keyup", function(_aoEvent)
					{
						var _nKeyCode = _aoEvent.keyCode;
						if (!(_nKeyCode == 38 || _nKeyCode == 40 || (_nKeyCode == 13 && _oSelf._mnKeydownCode != 229) || _nKeyCode == 27))
						{
							_oSelf._keyupTimeout && clearTimeout(_oSelf._keyupTimeout);
							_oSelf._keyupTimeout = setTimeout(function()
								{
									//_oSelf.show(_nKeyCode == 32 ? '@' : _oSelf._moDom.value);//空白，列出所有列表
									//_oSelf._moHtml = _oSelf._moCfg.ongetdata(_nKeyCode == 32 ? '@' : _oSelf._moDom.value);
									_oSelf._show();
									_oSelf._keyupTimeout = 0;
								}, 30
							);
						}
					}
				);

				UI.EA(_oDom, "focus", function(_aoEvent)
					{
						UI.addClass(_oDom, _sWBPMFOCUS);
						//_oSelf.show(_trim(_oSelf._moDom.value).length ? _oSelf._moDom.value : '@');//空白，列出所有列表
						_oSelf._show();
					}
				);

				UI.EA(_oDom, "blur", function(_aoEvent)
					{
						UI.removeClass(_oDom, _sWBPMFOCUS);
						_oSelf._hide(1);
					}
				);

				function _getItem(_aoEvent)
				{
					var _oTarget = UI.E(_aoEvent).target;
					while(!UI.A(_oTarget, "idx") && _oPanel != _oTarget)
					{
						_oTarget = _oTarget.parentNode;
					}
					return _oTarget;
				}


				UI.EA(_oPanel, "click", function(_aoEvent)
					{
						var _oItem = _getItem(_aoEvent),
							_sIdx = UI.A(_oItem, "idx");
						if (_sIdx)
						{
							_oSelf._setSelectItem(parseInt(_sIdx), true, false);
							//_oSelf._moCfg.onselect( _oSelf._getSelectData() );
							_oSelf._selected()._hide(0);
						}
					}
				);
				UI.EA(_oPanel, "mousedown", function(_aoEvent)
					{
						var _oEvent = UI.E(_aoEvent);
						_oEvent.prevent();
						_oEvent.stop();
					}
				);
				UI.EA(_oPanel, "mouseover", function(_aoEvent)
					{
						var _oItem = _getItem(_aoEvent),
							_sIdx = UI.A(_oItem, "idx");
						if (_sIdx)
						{
							_oSelf._setSelectItem(parseInt(_sIdx), true, false);
						}
					}
				);
			},

			_createPanel : function()
			{
				var _oSelf = this;
				_oSelf._moPanel = UI.html(PM.TMPL.autocomplete)[0];//height，如果项数大于10动态设置
				_oSelf._moBody = _oSelf._moPanel.firstChild;
				UI.append(_oSelf._moPanel, _oDoc.body);
				return _oSelf;
			},

			/**
			 *
			 * @param {Object} _aoCfg
			 *		{
			 *			oDom : 一般为pmlist或pmrecord的div
			 *			ongetdata : function(_asValue)  ['<div  unselectable="on"><b unselectable="on">mc</b>03lbj</div>', ...]
			 *			onselect : function(_aoValue)
			 *		}
			 */
			_init : function(_aoCfg)
			{
				var _oSelf = this;
				_oSelf._moCfg = _aoCfg;
				_oSelf._moDom = _aoCfg.oDom;
				//_oSelf._moHtml = [];
				_aoCfg.bMultiple = _aoCfg.bMultiple || 0;
				_oSelf._moCacheDom = [];
				_oSelf._nSelIndex = -1;
				_oSelf._createPanel()._initEvent();
			}
		};
		//写信表现逻辑 }


		/**
		 *	定时器，用在自动拉取最新私信
		 *
		 *	@param {Object} _aoConfig
		 *		{
		 *			_nBeginTime: 120000, (2分钟)
		 *			_nSpeed : 120000, (2分钟)
		 *			_nEndTime : 1200 000 (20分钟)
		 *			2m, 4m, 6m, 8m, ...
		 *
		 *			_ontimer : function()
		 *		}
		 */
		function _timer(_aoCfg)
		{
			var _oSelf = this;
			_oSelf._mnTimeout = null;
			_oSelf._mnCurTime = _oSelf._mnBeginTime = _aoCfg._nBeginTime || 120000;
			_oSelf._mnSpeed = UI.isNumber(_aoCfg._nSpeed) ? _aoCfg._nSpeed : 120000;
			_oSelf._mnEndTime = _aoCfg._nEndTime || 1200000;
			_oSelf._ontimer = _aoCfg._ontimer;
		}

		_timer.prototype = {
			_start : function()
			{
				var _oSelf = this;
				if (_oSelf._mnCurTime > 0)
				{
					_oSelf._mnTimeout = setTimeout(function()
						{
							_oSelf._mnCurTime = Math.min(_oSelf._mnCurTime + _oSelf._mnSpeed, _oSelf._mnEndTime);
							_oSelf._start();
							try
							{
								_oSelf._ontimer();
							}
							catch (e)
							{
							}
						},
						_oSelf._mnCurTime
					);
				}
				return _oSelf;
			},
			_reset : function()
			{
				var _oSelf = this;
				_oSelf._mnCurTime = _oSelf._mnBeginTime;
				return _oSelf;
			},
			_pause : function()
			{
				var _oSelf = this;
				if (_oSelf._mnTimeout)
				{
					clearTimeout(_oSelf._mnTimeout);
					_oSelf._mnTimeout = null;
				}
				return _oSelf;
			},
			_stop : function()
			{
				return this._pause()._reset();
			},
			_restart : function()
			{
				return this._stop()._start();
			},
			_destroy : function()
			{
				var _oSelf = this;
				_oSelf._pause();
				_oSelf._mnCurTime = -1;
				return _oSelf;
			}
		};




		//视图层
		function _formatDate(_anSecond, _anSysMillTime)
		{
			if(+_anSecond < 0 || +_anSysMillTime < 0)
			{
				return "";
			}
			//_anSysMillTime = PM.data.ts;
			_anSysMillTime = _getTimeStamp();
			var _oRULE = _formatDate._getRule(_anSysMillTime),
				_nNow = +_anSysMillTime * 1000, //
				_nBefor = (+_anSecond) * 1000, //cgi返回秒数
				_nDt = _nNow - _nBefor;

			for(var i in _oRULE)
			{
				var _oRule = _oRULE[i];

				//符合最小规则
				if( _oRule.max > _nDt)
				{
					var _oDate = new Date(_nBefor),
						_shh = _oDate.getHours() + "",
						_smm = _oDate.getMinutes() + "",
						_oI18NMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

					_shh = _shh.length == 1 ? ("0" + _shh) : _shh;
					_smm = _smm.length == 1 ? ("0" + _smm) : _smm;

					//这个判断暂时保留先，不知道后期还要怎样改
					if(_oRule.unit != 0)
					{
						return i.replace("nn", Math.floor(_nDt/_oRule.unit))//取整 ceil上 floor下
								.replace("hh", _shh)
								.replace("mm", _smm)
								//.replace("MM", _oDate.getMonth()+1)
								.replace("MM", _oI18NMonth[_oDate.getMonth()])
								.replace("dd", _oDate.getDate());
					}
					else
					{
						return i.replace("yyyy", _oDate.getFullYear())
								//.replace("MM", _oDate.getMonth()+1)
								.replace("MM", _oI18NMonth[_oDate.getMonth()])
								.replace("dd", _oDate.getDate())
								.replace("hh", _shh)
								.replace("mm",_smm);
					}
				}
			}
		}
		_formatDate._oRules = {};
		_formatDate._getRule = function(_anSysMillTime)
		{
			if (!_formatDate._oRules[_anSysMillTime])
			{
				var _nNow = +_anSysMillTime * 1000,
					_nUNIT_SEC = 1000,
					_nUNIT_MIN = 60,
					_nUNIT_HOUR = 60,
					_nUNIT_DAY = 24,
					_nUNIT_WEEK = 7,
					//再多就没意义了
					_nOneDay = _nUNIT_SEC * _nUNIT_MIN * _nUNIT_HOUR * _nUNIT_DAY,
					_oRULE = {};

				function _getDateMileStone(_anTime, _anGap)
				{
					var _oDate = new Date(_anTime);
					_oDate.setUTCHours(15, 59, 59, 999);//设置为GMT 东8区当天最后一刻
					return (_nNow - (_oDate.getTime() - _anGap));
				};
				function _getYearMileStone(_anTime)
				{
					var _oDate = new Date(_anTime);
					_oDate.setFullYear(_oDate.getFullYear(), 0, 1);
					_oDate.setUTCHours(-8, 0, 0, 0);//设置为GMT
					return (_nNow - _oDate.getTime());
				};

				_oRULE[_("刚刚")] = {
					max : _nUNIT_SEC * _nUNIT_MIN,
					unit: _nUNIT_SEC
				};

				_oRULE["nn" + _("分钟前")] = {
					max : _nUNIT_SEC * _nUNIT_MIN * _nUNIT_HOUR,
					unit: _nUNIT_SEC * _nUNIT_MIN
				};

				//6小时前提示小时
				//_oRULE["nn" + _("小时前")] = {
				//	max : _nUNIT_SEC * _nUNIT_MIN * _nUNIT_HOUR * 6,
				//	unit: _nUNIT_SEC * _nUNIT_MIN * _nUNIT_HOUR
				//};

				//超过提示今天
				_oRULE[_("今天") + " hh:mm"] = {
					max : _getDateMileStone(_nNow, _nOneDay),//_nUNIT_SEC * _nUNIT_MIN * _nUNIT_HOUR * _nUNIT_DAY, //这个要通过new Date()去做了
					unit: _nUNIT_SEC * _nUNIT_MIN * _nUNIT_HOUR * _nUNIT_DAY
				};

				_oRULE[_("昨天") + " hh:mm"] = {
					max :  _getDateMileStone(_nNow, _nOneDay * 2),//_nUNIT_SEC * _nUNIT_MIN * _nUNIT_HOUR * _nUNIT_DAY * 2,
					unit: _nUNIT_SEC * _nUNIT_MIN * _nUNIT_HOUR * _nUNIT_DAY
				};

				//_oRULE[_("前天") + " hh:mm"] = {
				//	max :  _getDateMileStone(_nNow, _nOneDay * 3),//_nUNIT_SEC * _nUNIT_MIN * _nUNIT_HOUR * _nUNIT_DAY * 3,
				//	unit: _nUNIT_SEC * _nUNIT_MIN * _nUNIT_HOUR * _nUNIT_DAY
				//};

				//今年
				//_oRULE["MM" + _("月") + "dd" + _("日") + " hh:mm"] = {
				_oRULE[_('MM月dd日') + " hh:mm"] = {
					max :  _getYearMileStone(_nNow),//_nUNIT_SEC * _nUNIT_MIN * _nUNIT_HOUR * _nUNIT_DAY * 3,
					unit: _nUNIT_SEC * _nUNIT_MIN * _nUNIT_HOUR * _nUNIT_DAY
				};

				//_oRULE["yyyy" + _("年") + "MM" + _("月") + "dd" + _("日") + " hh:mm"] = 	{
				_oRULE[ _("yyyy年MM月dd日") + " hh:mm"] = 	{
					max : Infinity,
					unit: 0
				};

				_formatDate._oRules[_anSysMillTime] = _oRULE;
			}
			return _formatDate._oRules[_anSysMillTime];
		};
		PM.formatDate = _formatDate;

		/**
		 *  更新列表的时间
		 *
		 *  @param {Object} _aoDom 为pmlist或pmrecord
		 *
		 */
		//function _updateTime(_aoDom)
		//{
		//	var _oPubTimes = UI.GC(_aoDom || _oDoc.body, "div.pubtime");
		//	for (var i = _oPubTimes.length - 1; i >= 0; i--)
		//	{
		//		_oPubTimes[i].innerHTML = PM.formatDate( UI.A(_oPubTimes[i], "tm") );
		//	}
		//}

		//撑开list的高度
		//var _nTestCount = 0;

		var _nSideNewCountMsg = null,
			_nFollowerNum = null;
		function _resizeList()
		{
			var _oArea = G("pmArea");
			_oArea.style.marginBottom = "0px";
			_oArea.style.zoom = 1;
			var	_nMainHeight = parseInt( G("mainWrapper").offsetHeight),
				_nAreaHeight = parseInt( _oArea.offsetHeight );
			//document.title = [_nMainHeight, _nAreaHeight, _nTestCount++].join(',');
			if (_nMainHeight > _nAreaHeight)
			{
				_oArea.style.marginBottom = (_nMainHeight - _nAreaHeight) + "px";
			}
		}

		var _oReiszeListEvent = ["DOMNodeInserted", "DOMNodeRemoved"];
		function _addResizeListEvent()
		{
			var _oSide = UI.GC(_oDoc.body, "div.side")[0],
				_delayTimeout = null;
				_delayResizeList = function()
				{
					if (_delayTimeout)
					{
						clearTimeout(_delayTimeout);
					}
					_delayTimeout = setTimeout(function()
					{
						var _oFollowerNum = UI.G(_sFOLLOWERNUM),
							_nCurFollowerNum = _oFollowerNum && parseInt(_oFollowerNum.innerHTML),
							_oNewCountFollow = UI.GC(_oDoc.body, "#newCountFollower > a")[0],
							_oNewCountMsg = UI.G(_sNEWCOUTMSG),
							_nCurNewCountMsg = _oNewCountMsg && parseInt(_oNewCountMsg.innerHTML.substr(1));
						_oNewCountFollow && ( _nCurFollowerNum += parseInt(_oNewCountFollow.innerHTML) );
						if (_nCurFollowerNum)
						{
							if (_nFollowerNum != null && _nFollowerNum != _nCurFollowerNum)
							{
								_getAddrFromCgi(true);
							}
							_nFollowerNum = _nCurFollowerNum;
						}
						if (_nSideNewCountMsg != null && _nCurNewCountMsg)
						{
							if (_nSideNewCountMsg != _nCurNewCountMsg)
							{
								//有新会话
								_getListFromCgi(_sTOPTID);
							}
							_nSideNewCountMsg = _nCurNewCountMsg;
							_oNewCountMsg.innerHTML = "";
						}
						_resizeList();
					}, 500);
				};
			if (_oSide)
			{
				_resizeList();
				_oSide.onpropertychange = _delayResizeList;
				for (var i = 0; i < 2; i++)
				{
					UI.EA(_oSide, _oReiszeListEvent[i], _delayResizeList, false);
				}
				UI.EA(_oDoc.body, "unload", function()
					{
						_oSide.onpropertychange = null;
						UI.G(_sNEWCOUTMSG) && (UI.G(_sNEWCOUTMSG).onpropertychange = null);
						for (var i = 0; i < 2; i++)
						{
							UI.ER(_oSide, _oReiszeListEvent[i], _delayResizeList, false);
						}
					}
				);
				//去掉私信未读数
				_waitFor(function()
					{
						return !!UI.G(_sNEWCOUTMSG);
					},
					function(_abIsOk)
					{
						if (_abIsOk)
						{
							UI.G(_sNEWCOUTMSG).innerHTML = "";
							_nSideNewCountMsg = 0;
							UI.G(_sNEWCOUTMSG).onpropertychange = _delayResizeList;
						}
					}
				);
			}
			else if(_resizeListEvent._nRetryCount--)
			{
				setTimeout(arguments.callee, 500);
			}
		}
		_addResizeListEvent._nRetryCount = 20;


		/**
		 *  列表与会话切换
		 *
		 *  从列表到会话，或会话到列表，用户点击，拉取数据，延时切换dom
		 *  从会话到会话，只有在会话中建立房间，已经有数据  
		 *  从列表到列表，没有
		 */
		function _gotoListConv(_abList, _aoParam)
		{
			var _oPMlistDom = G(_sPMLIST),
				_oPMrecord = G(_sPMRECORD);

			_aoParam.oDom = _abList ? _oPMlistDom : _oPMrecord;
			_gotoListConv._clearTimeout();

			var _nBegin = _now(),
				_nEnd0,
				_nEnd1;

			_aoParam.onshow = function( _abDebugTimeout )
			{
				//# if (debug){
				if (!_abDebugTimeout)
				{
					_nEnd1 = _now();
					//document.title = ["time1", (_nEnd0 - _nBegin), _nEnd1 - _nBegin].join(',');
					debug(["time1", (_nEnd0 - _nBegin), _nEnd1 - _nBegin]);
				}
				else
				{
					_nEnd0 = _now();
					//document.title = ["time2", (_nEnd0 - _nBegin), _nEnd1 - _nBegin].join(',');
					debug(["time2", (_nEnd0 - _nBegin), _nEnd1 - _nBegin]);
				}
				//# }

				if (_gotoListConv._nTimeout)
				{
					_gotoListConv._clearTimeout();
					if (_abList)
					{
						_oWin.scrollTo(0, _gotoListConv._oListScrollY || 0);
						_display(_oPMrecord, 0);
						_display(_oPMlistDom, 1);
					}
					else
					{
						_oWin.UI && (_gotoListConv._oListScrollY = UI.scrollY());
						_display(_oPMlistDom, 0);
						_display(_oPMrecord, 1);
					}
					_hashTid(_aoParam.sTid);
				}
			};

			_gotoListConv._oConversationInstance && _gotoListConv._oConversationInstance._destroy();
			_gotoListConv._oListInstance && _gotoListConv._oListInstance._destroy();

			//_gotoListConv._nTimeout = setTimeout(_aoParam.onshow, 150);
			_gotoListConv._nTimeout = setTimeout(function(){
				_aoParam.onshow(true)
			}, 1000);

			return _abList ? ( _gotoListConv._oListInstance = new _listControl(_aoParam) ) : ( _gotoListConv._oConversationInstance = new _recordControl(_aoParam) );
		}
		_gotoListConv._clearTimeout = function()
		{
			if (_gotoListConv._nTimeout)
			{
				clearTimeout(_gotoListConv._nTimeout);
				_gotoListConv._nTimeout = null;
			}
		};

		///////////////////////////////////////
		//由于新需要，先不与_initCompose合并
		/**
		 *
		 *  @param {Object} _aoCfg {
		 *			dom: 
		 *			supportImg : true|false 是否显示图片(默认是false)
		 *			to
		 *			bostype :
		 *			content : 内容
		 *			from: 日志类型
		 *			onload : function() 初始化完毕
		 *			onsendcomplete: function() 发完信
		 *		}
		 *
		 */
		PM._initEmbedCompose = function(_aoCfg)
		{
			//限制是否群聊
			_bABLEMULTISEND = !!(_oWin.MI && MI.user.isLab);

			var _oComposeControl,
				_sCid = "embed",
				_oDom = _aoCfg.dom;
			_oDom.innerHTML = PM.TMPL.compose({
				dsa : _aoCfg.to && _aoCfg.disabledTo || 0,
				cid : _sCid,
				c : "",
				n : _aoCfg.to
			});

			_oComposeControl = new _composeControl(
				{
					oDom : _oDom,
					sCid : _sCid,
					bDisImg : !(_aoCfg.supportImg === true),
					//bDlg : true,
					nFrom : _aoCfg.from || 5,
					//sTo : "",
					sBosType : _aoCfg.bostype,
					onsendcomplete : function(_abSuccess, _aoParam)
					{
						//todo 需要重复发送吗
						//_oComposeControl && _oComposeControl._destroy();
						UI.isFunction(_aoCfg.onsendcomplete) && _aoCfg.onsendcomplete(_abSuccess, _aoParam);
					}
				}
			);
			setTimeout(function()
				{
					var _oTextarea = UI.GC(_oDom,  "div.replycontent > textarea")[0];
					if (_aoCfg.content)
					{
						MI.insertTxt(_oTextarea, _aoCfg.content, MI.cursorX(_oTextarea));
						_oComposeControl._textCount(_oTextarea);
					}
					_oTextarea.focus();
					UI.isFunction(_aoCfg.onload) && _aoCfg.onload();
				}, 10
			);

			//_speed(_sPMCOMPOSE, _oWin.PMCMarkTime, PM.wbpm_time, _now());
		};

		//# if (debug){
		//todo
		//function _testEmbedCompose()
		//{
			//var _oDiv = _oDoc.createElement("div");
			//_oDiv.id = "testembed";
			//G("pmArea").appendChild(_oDiv);
			//PM._initEmbedCompose({
			//	dom : _oDiv
			//});
		//}
		//# }

		PM._initCompose = function(_aoCfg)
		{
			//MI.dialog
			var _oComposeControl;
			MI.dialog.show({
				width:590,
				noReserve : true,
				//html : PM.TMPL.compose({
				//	cid : "dlg",
				//	n : _aoCfg.to
				//}),
				html : PM.TMPL.compose({
					dsa : _aoCfg.to && _aoCfg.disabledTo || 0,
					cid : "dlg",
					c : "",
					n : _aoCfg.to
				}),
				start:function()
				{
					var _oDom = MI.dialog["_cont"];
					//todo
					_oComposeControl = new _composeControl(
						{
							oDom : _oDom,
							sCid : "dlg",
							bDlg : true,
							nFrom : _aoCfg.from || 1,
							//sTo : "",
							sBosType : _aoCfg.bostype,
							onsendcomplete : function(_abSuccess, _aoParam)
							{
								MI.dialog.hide();

								UI.isFunction(_aoCfg.onsendcomplete) && _aoCfg.onsendcomplete(_abSuccess, _aoParam);
							}
						}
					);
					setTimeout(function()
						{
							//UI.GC(_oDom,  "div.replycontent > textarea")[0].focus();
							var _oTextarea = UI.GC(_oDom,  "div.replycontent > textarea")[0];
							if (_aoCfg.content)
							{
								MI.insertTxt(_oTextarea, _aoCfg.content, MI.cursorX(_oTextarea));
								_oComposeControl._textCount(_oTextarea);
							}
							_oTextarea.focus();
						}, 10
					);

					_speed(_sPMCOMPOSE, _oWin.PMCMarkTime, PM.wbpm_time, _now());
				},
				end : function()
				{
					_oComposeControl && _oComposeControl._destroy();
					_MIDialogCleanHack();
				}
			});
		};

		PM._initList = function(_aoCfg)
		{
			//与MI基础库无关
			//debug(["wbpm.js _initList"]);
			_bABLEMULTISEND = _aoCfg.MILab === "true";

			var _oArea = G(_aoCfg.area);
			_oArea.className = _("wbpmcn");
			_oArea.innerHTML = PM.TMPL.main;


			var _sIniTid = _oWin.PMIniTid || _sTOPTID,
				_bList = _sIniTid == _sTOPTID,
				_oCtrl = _gotoListConv(_bList,
					_bList ? {
							sTid : _sTOPTID,
							_bExtData : 1
						} : {
							sTid : _sIniTid,
							_nUnread : 0,
							_bExtData : 1,
							onclose : function()
							{
							}
						}
				);

			var _fShow = function(_aoData)
				{
					//debug("_initList _fShow");
					//debug();
					PM.data.mode = "scroll";
					//PM.data.mode = _aoCfg.mode;

					//加载完了
					if (_aoData.errmsg)
					{
						//不管，算是超时错误
						_oCtrl._showErr(_aoData);
					}
					else
					{
						//debug(["showList", +new Date]);
						_setTimeStamp(_aoData.ts);
						_setABLEMULTISEND(_aoData);
						_setDataFromCgi(_aoData, {_sType : _aoData.tid ? _sCONVERSATION : _sLIST } );

						//todo 如何处理
						_setUnreadFromCgi();

						//debug(["showList2", +new Date]);

						
						//# if (debug){
						//todo
						//_testEmbedCompose();
						//# }
					}

					_speed(_sPMLIST, _oWin.PMMarkTime, PM.wbpm_time, PM.wbpm_list_time, _now());
				};
			if (PM.PMListLoaded)
			{
				_fShow( PM.PMListLoaded() );
			}
			else
			{
				PM.PMListLoaded = _fShow;
			}

			//需要mi基础库下载完
			_wbpm_MIRun(function()
				{
					_addResizeListEvent();

					setTimeout(_getAddrFromCgi, 100);
				}
			);
		};
		//优先级最高，覆盖所有的PM.init，必定执行
		PM.init = function(_aoCfg)
		{
			_createProxy();
			var _sMethod = {
				embedcompose : PM._initEmbedCompose,
				compose : PM._initCompose,
				inbox : PM._initList
			}[_aoCfg.type];
			if (_sMethod)
			{
				_sMethod(_aoCfg);
			}
		};
		PM.wbpm_time = _now();

		//# if (test){
		if (window.PMTest)
		{
			PMTest._addEvent = _addEvent;
			PMTest._delEvent = _delEvent;
			PMTest._setDataFromCgi = _setDataFromCgi;
			PMTest._setDataFromCompose = _setDataFromCompose;
			//PMTest._setListConv = _setListConv;
			PMTest._delList = _delList;
			PMTest._delMail = _delMail;
			PMTest._queryListConv = _queryListConv;


			PMTest._delMailFromCgi = _delMailFromCgi = function(){};
			PMTest._getListFromCgi = _getListFromCgi = function(_asTid, _afComplete)
				{
					_afComplete(true, null);
				};
		}
		//# }
	}
)();

(function(_aoWin)
{
	if (_aoWin["_PMRun"])
	{
		var list = _aoWin["_PMRun"];
		_aoWin["_PMRun"] = [];
		while(list.length)
		{
			list.shift()();
		}
		_aoWin.PMRun = function(_fun) { _fun(); };
	}
})(window);