/*
	Json Interface:
		{
			result : 0,
			msg : '发言成功',
			info : {
				id : '123456',
				time : '5分钟前',
				content : '内容'
			}
		}

		{
			result : 0,
			msg : '发言成功',
			info : [
				{
					name : 'xhlv',
					nick : 'xhlv',
					pic : 'http://mat1.gtimg.com/www/mb/images/img2.jpg'
				}
			]
		}

	Cookie:
		refresh 广播大厅自动刷新： 0-不刷新、1-刷新
		reg_quick 是否自动弹出快速注册框：0-不弹、1-弹
		mb_vT_[account] 查看消息列表类型（viewType）： 只看原创|简约模式|只看我收听的人|客人页只看原创|客人页简约模式
		mb_chat WebQQ

	LocalStorage:
		option_[type]_[account] 首页右侧栏：1展开、-1收起 （type = topic/recommend/follow/hot）
		option_[type]_[account] 其他状态 （type = relayListCheck,sayHi）
		tips_[type]_[account] 提示/广告：1显示、-1隐藏 （type = relayList,list,college,QQx360,lxBannerTip,collegeView）
		scroll_[account]_[index] 滚动条位置
		more_[account]_[index] 更多消息
		new_[account]_[index] 新消息
		time 时间
		top_[account] 常用@联想
		draft_[account] 草稿
		option_city[account] 最近看过的地方
		option_topic_[account] 最近发表的话题
		option_iUserCloseCnt_[account] 收听后浮层关闭次数
		option_shareMail_[account] 邮件分享地址
*/
/*
	MI.Speed();
	
	t_asyn_more 更多消息
	t_asyn_url 原链接
	t_asyn_relay 查看转播
	t_asyn_talk 发表广播
	t_asyn_card 资料卡片
	t_asyn_sidebar 右侧页面片
	t_asyn_tagadd 添加标签
	t_asyn_mylist 我的名单
	t_asyn_listbtn 名单操作
	t_asyn_listadmin 名单管理
	t_asyn_follow 订阅收听
	t_asyn_nicktips @联想
	t_asyn_smartbox SmartBox
	t_asyn_newmsg 新消息数
	t_asyn_fav 收藏
	t_asyn_uploadpic 上传图片
	t_asyn_pmlist 私信列表
	t_asyn_pmcompose 非私信页的私信浮层
*/
(function(){
/**
 * ID获取DOM
 * 
 * @param {String} String DOM的ID
 * @return {Object} Object DOM对象
 *            @example
 *            var talkBox = $('talkBox');
 */
var $ = UI.G;
/**
 * CSS路径获取DOM
 * 
 * @param {String} String DOM的CSS路径
 * @return {Array} Array DOM对象的数组
 *            @example
 *            var talkBox = $$('#talkBox')[0];
 *            var heads = $$('.LC .userPic img');
 */
var $$ = UI.GC;
if (!(window.MIApp && !window.MIApp.lib)){
	window.$ = UI.G;
	window.$$ = UI.GC;
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
/*onerror = function(msg,url,line){
	if(!MI.user.isLab){
		var tip = encodeURIComponent(document.location.href) + ',';
		if (line) {
			tip += line + ',';
		}
		if (msg) {
			tip += msg + ',';
		}
		if (url) {
			tip += url + ',';
		}
		tip += window.navigator.userAgent;
		MI.Bos('btnOnerror',encodeURIComponent(tip));
		return true;
	}
};*/
try{
	document.domain = 'qq.com';
}catch(e){}
/**
 * MI全局对象
 * 
 * @namespace MI全局对象
 * @type {Object}
 */
MI = {
	/**
	 * 服务器时间
	 * 
	 * @type {Number}
	 */
	time : null,
	/**
	 * 微博用户信息
	 * 
	 * @type {Object}
	 *            @example
	 *            MI.user={
	 *                account:'xhlv', //帐号
	 *                name:'xhlv', //昵称
	 *                collegeFinished:1, //是否完成广播学院
	 *                flag:{ //标志位
	 *                    auth : 1 //Vip
	 *                },
	 *                fun:{ //功能开关
	 *                    search:1, //搜索
	 *                    fastReport:1, //快速举报（针对名人）
	 *                    report:1, //主Timeline显示举报按钮
	 *                    autoPic:1, //自动加载大图
	 *                    mergePic:1, //异步加载图片去重
	 *                    turnPic:1, //上传图片可旋转
	 *                    iconPic:1, //图片图标化展示
	 *                    btnStyle:0, //按钮风格（1- 0-）
	 *                    goTop:1, //返回顶部
	 *                    followList:1, //收听后加入名单
	 *                    msgLab:1, //新私信
	 *                    chat:1, //实时聊天
	 *                    newCount:1, //新消息拉取方式
	 *                    card:1, //资料卡片
	 *                    note:1, //备注功能
	 *                    btnReply:1, //对话的对话按钮放外面
	 *                    shield:1 //屏蔽消息功能开关
	 *                },
	 *                isLab : 1, //实验室用户
	 *                floatList : 1, //名单漂浮
	 *                medal : [], //勋章级别 [劳模,转播]
	 *                qunAdmin:1, 是否是群管理员
	 *                pic:'http://t2.qlogo.cn/mbloghead/7509c670ff7865356ab4/50' //头像
	 *            };
	 */
	user : {
		fun : {}
	},
	/**
	 * 字符串相关方法
	 * 
	 * @type {Number}
	 *            @example
	 *            MI.string.length('中en'); //获取中英文总字符长度
	 *            MI.string.html('<div>'); //替换<和>
	 *            MI.string.cut('我是xhlv',4,''); //按字符长度裁剪字符串
	 */
	string : {
		length : function(str){
			var arr = str.match(/[^\x00-\x80]/g);
			return str.length + (arr ? arr.length : 0);
		},
		escape : function(str){
			return MI.string.html(str).replace(/'/g,"\\'");
		},
		escapeReg : function(str){
			var buf = [];
			for(var i = 0;i < str.length;i++){
				var c = str.charAt(i);
				switch (c) {
					case '.' :
					case '$' :
					case '^' :
					case '{' :
					case '[' :
					case '(' :
					case '|' :
					case ')' :
					case '*' :
					case '+' :
					case '?' :
					case '\\' :
						buf.push('\\x' + c.charCodeAt(0).toString(16).toUpperCase());
						break;
					default : buf.push(c);
				}
			}
			return buf.join('');
		},
		html : function(str){
			return str.replace(/</g,"&lt;").replace(/>/g,"&gt;");
		},
		cut : function(str,num,replace){
			replace = UI.isUndefined(replace) ? '...' : replace;
			var arrNew = [],
				strNew = '',
				arr,
				length = MI.string.length(str);
			if (length > num) {
				arr = str.split('');
				for (var i = 0,len = arr.length;i < len;i++) {
					if (num > 0) {
						arrNew.push(arr[i]);
						num -= MI.string.length(arr[i]);
					}
					else {
						break;
					}
				}
				strNew = arrNew.join('') + replace;
			}
			else {
				strNew = str;
			}
			return strNew;
		},
		/**
		 * 获取href帐号
		 * 
		 * @param {String} String href值
		 * @return {String} String 帐号
		 *            @example
		 *            MI.string.id('/xhlv');
		 */
		id : function(str){
			var str = str.match(/[^\/]+$/g);
			return str && str[0] ? str[0].replace('#M','') : '';
		},
		/**
		 * 获取title帐号
		 * 
		 * @param {String} String title值
		 * @return {String} String 帐号
		 *            @example
		 *            MI.string.account('xhlv(@xhlv)');
		 */
		account : function(str){
			var account = str.match(/@[^@]+$/g);
			return account && account[0] ? account[0].slice(1,-1) : '';
		}
	},
	number : {
		format : function(str){ //Format: 1000 --> 1,000
			return (str + '').replace(/(?=(?!\b)(?:\w{3})+$)/g,",")
		}
	},
	/**
	 * 获取随机数
	 * 
	 * @param {Number} Number 缓存间隔
	 * @return {Number} Number 随机数
	 *            @example
	 *            MI.random(); //1289039184642
	 *            MI.random(1000); //1289039204
	 */
	random : function(delay){ //delay = 1000 ---> 1s
		delay = delay || 1;
		return parseInt( new Date().getTime()/delay );
	},
	drop : {}, //Cache Drop Menu
	delay : {},
	validate : {
		
	},
	canvas : {}, //Cache Canvas Object
	/**
	 * 焦点到输入框最后一个字
	 * 
	 * @param {Object} Object Dom对象
	 *            @example
	 *            MI.focus($('x'));
	 */
	focus : function(el){
		var length = el.value.length;
		el.focus();
		MI.selectTxt(el,length,length,length);
	},
	blur : function(){ //For <a> Blur
		this.blur();
	},
	click : function(){ //For <a> No Href
		 return false;
	},
	hideFocus : function(){
		UI.A(this,'hideFocus','true');
		this.onmouseover = null;
	},
	boss : null, //Boss Source
	ajaxTimes : 0, //Ajax Times
	talkNew : [],
	talkMore : [],
	/**
	 * 当前页面的域名
	 * 
	 * @type {String}
	 *            @example
	 */
	host : '',
	/**
	 * 当前页面的域名类型（1-主站）
	 * 
	 * @type {String}
	 *            @example
	 */
	hostType : 0,
	/**
	 * 存储需要异步加载的图片
	 * 
	 * @type {Array}
	 *            @example
	 *            不需要对MI.crs进行操作，只要给图片加一个class="crs"就可以了
	 *            <img class="crs" crs="http://t3.qpic.cn/mblogpic/b8532efdd2591363fddc/160">
	 */
	crs : [], //Lazy Load Images With ClassName Of '.crs' (Src)
	/**
	 * 存储需要异步加载的HTML，主要用于延缓页面素材的加载
	 * 
	 * @type {Object}
	 *            @example
	 *            <div class="coopAdBox" id="coopAdBox"></div>
	 *
	 *            MI.lazy.coopAdBox='<a href="/group_s.php?g=0927ningbow"><img src="http://mat1.gtimg.com/www/mb/images/coopAd_ningbo.png" alt="" width="197" height="80"></a>';
	 */
	lazy : {}, //Lazy Load HTML
	/**
	 * 获取Json对象
	 * 
	 * @param {String} String Json字符串
	 * @return {Object} Object Json对象
	 *            @example
	 *            data = MI.json(data); //主要用于Json容错
	 */
	json : function(data){
		var o = {};
		try{
			o = eval('(' + data + ')');
		}catch(e){};
		return o;
	},
	/**
	 * 存储音乐信息
	 * 
	 * @type {Object}
	 *            @example
	 *            MI.music.info; //音乐信息json，用于播放
	 *            MI.music.state; //播放状态
	 *            MI.music.box; //当前音乐播放器容器
	 */
	music : {
		info : '',
		state : null,
		box : ''
	},
	/**
	 * 存储JS模板
	 * 
	 * @type {Object}
	 *            @example
	 *            MI.tmpl.listAll; //主Timeline
	 *            MI.tmpl.picTool; //图片操作
	 *            MI.tmpl.msg; //私信Timeline
	 *            MI.tmpl.msgBox; //发私信
	 *            MI.tmpl.reply; //对话框
	 *            MI.tmpl.black; //拉黑
	 *            MI.tmpl.unblack; //取消拉黑
	 *            MI.tmpl.card; //资料卡片
	 *            MI.tmpl.code; //验证码
	 */
	tmpl : {
		picTool : '<div class="tools"><a href="#" class="btnBack"><em></em>' + _('向左转') + '</a><span>|</span><a href="#" class="btnPrev"><em></em>' + _('向右转') + '</a><a href="$Url/2000" class="btnOriginal" onclick="MI.Bos(\'btnPicSource\')" target="_blank">' + _('查看原图') + '</a></div>',
		reply : '<div class="talkWrap"><div class="SA"><em>◆</em><span>◆</span></div>\
			<div class="top">\
				<span class="left"><span class="number cNote"></span><span class="replyTitle"></span><span class="addReply"></span></span>\
				<a href="#" class="close" title="' + _('关闭') + '">' + _('关闭') + '</a>\
			</div>\
			<iframe class="comts" src="about:blank" frameborder="0" scrolling="no" style="height:0"></iframe>\
			<div class="cont"><textarea class="inputTxt"></textarea></div>\
			<div class="bot">\
				<div class="insertFun"><div class="newTopic"><a href="#" class="creatNew" title="' + _('汇聚相同热点的广播') + '" tabindex="3">' + _('话题') + '</a></div><div class="atSome"><span class="ico_at"></span><a class="txt" href="#" title="' + _('@朋友帐号就可以提到他') + '">' + _('朋友') + '</a></div><div class="insertFace"><span class="ico_face"></span><a class="txt" href="#" title="' + _('表情') + '">' + _('表情') + '</a></div></div>\
				<div class="left"></div>\
				<input type="button" class="inputBtn sendBtn" value="" /><a hrer="#" class="autoBackspace" style="display:none">[自动缩减]</a><span class="countTxt"></span>\
			</div>\
			<div class="talkSuc" style="display:none"><span class="ico_tsW"><span class="ico_ts"></span></span><span class="msg"></span></div>\
		</div>'
	},
	/**
	 * 选取文本框中的文本
	 * 
	 * @param {Object} Object Dom对象
	 * @param {Number} Number 开始位置
	 * @param {Number} Number 结束位置
	 * @param {Number} Number 当前位置
	 *            @example
	 *            MI.selectTxt(el,1,2,2);
	 */
	selectTxt : function(el,start,end,curPosition){
		var range;
		if (document.createRange) {
			el.setSelectionRange(start,end);
		}
		else {
			range = el.createTextRange();
			range.collapse(1);
			range.moveStart('character',start);
			range.moveEnd('character',end - start);
			range.select();
		}
	},
	insertTxt : function(el,text,cursorX,del){
		if (del == undefined) {
			del = 0;
		}
		el.focus();
		if (document.selection) {
			var range = document.selection.createRange();
			range.moveStart('character',-del);
			range.text = text;
		}
		else {
			var textTmp = el.value,
				cursor = cursorX + text.length - del;
			el.value = textTmp.substring(0,cursorX - del) + text + textTmp.substring(cursorX,textTmp.length);
			MI.selectTxt(el,cursor,cursor,cursor);
		}
	},
	/**
	 * 获取光标位置
	 * 
	 * @param {Object} Object Dom对象
	 * @return {Number} Number 光标位置
	 *            @example
	 *            MI.cursorX(el);
	 */
	cursorX : function(el){
		if (document.selection){
			/*var range = document.selection.createRange();
			console.log(range.offsetTop);
			console.log(range.offsetLeft);*/

			var range = document.selection.createRange(),position = 0,txt;
			range.moveStart ('character',-el.value.length);
			txt = range.text.split('\001');
			position = txt[txt.length - 1].replace(/\r/g,'').length;
			//document.title = position + ' ' + txt.length;
			return position;

			/*var txt = "\001",
				range = document.selection.createRange(),
				rangeTmp = range.duplicate(),
				position = 0
				selectTxt = range.text;
			rangeTmp.moveToElementText(el);
			range.text = range.text + txt;
			position = rangeTmp.text.indexOf(txt);
			range.moveStart('character',-1);
			range.text = '';
			return position < 0 ? el.value.replace(/\r/g,'').length : position;*/

			/*var range = document.selection.createRange(),
				rangeTmp = range.duplicate(),
				rangeAll,
				position = 0;
			el.select();
			rangeAll = document.selection.createRange();
			while(rangeTmp.compareEndPoints('StartToStart',rangeAll) > 0){
				rangeTmp.moveStart('character',-1);
				position++;
			}
			range.select();
			return position;*/

			/*el.focus();
			document.selection.createRange().text = 'л';
			var  range = el.createTextRange(),
				value = el.value,
				position,br;
			position = value.indexOf('л');
			br = (el.value.match(/\n/g) || []).length;
			range.collapse(1);
			range.moveStart('character',position - br);
			range.moveEnd("character",1);
			range.select();
			if (range.text == 'л') {
				document.selection.clear();
			}
			return position;*/

			/*var range = document.selection.createRange(),tmp = document.selection.createRange(),position;
			tmp.collapse(true);
			tmp.select();
			range.setEndPoint('StartToStart',document.selection.createRange());
			position = range.text.length;
			MI.selectTxt(el,position,position,position);
			return position;*/
		}
		else return el.selectionStart;
	},
	countNum : function(el,num,format){
		if (!el || el.innerHTML.hasString(_('超过'))) return;
		var cur = el.innerHTML.replace(/\D/g,'') || 0;
		if (format) {
			cur = MI.number.format(parseInt(cur.replace(/,/g,'')) + num);
		}
		else cur = parseInt(cur) + num;
		el.innerHTML = cur < 0 ? 0 : cur;
	},
	/**
	 * 计算剩余字数
	 * 
	 * @param {String} String 需要计算的字符串
	 * @param {Boolean} Boolean 是否需要换算Url
	 * @return {Number} Number 字数
	 *            @example
	 *            var length = MI.countTxt('text',1);
	 */
	countTxt : function(value,countUrl){
		var length = MI.string.length(value),
			len,
			urlExceed = 0,
			urlNum = 0,
			url = value.match(new RegExp('((news|telnet|nttp|file|http|ftp|https)://){1}(([-A-Za-z0-9]+(\\.[-A-Za-z0-9]+)*(\\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\\.[0-9]{1,3}){3}))(:[0-9]*)?(/[-A-Za-z0-9_\\$\\.\\+\\!\\*\\(\\),;:@&=\\?/~\\#\\%]*)*','gi')) || [];
		if (length < 500) {
			if (countUrl) {
				UI.each(url,function(o){
					value = value.replace(o,'_');
					urlNum++;
					len = o.length;
					if (len > 256) {
						urlExceed += len - 256;
					}
				});
			}
			length = Math.ceil((MI.string.length(UI.trim(value).replace(new RegExp(_('#输入话题标题#'),'g'),'')) + urlNum * 20 + urlExceed) / 2);
		}
		return length;
	},
	fC : { //followConfig
		numFormat : [],
		num : []
	},
	follow : function(id,el,call,veriCode){
		/*
			DOM:
				'followNumAll'
				'followNum_' + id
				'followedNum_' + id
		*/
		if (!MI.fC.init) {
			MI.fC.numFormat = $$('.followNumFormat');
			MI.fC.num = $$('.followNum');
			MI.fC.init = 1;
		}
		/*
		//需求变更暂时用不到
		var block = UI.A(el,'block'),nick = UI.A(el,'nick'),sex = UI.A(el,'nick');
		if (block && nick && sex) {
			if (sex == 1) {
				sex = '他';
			}
			else if (sex == 0) {
				sex = '她';
			}
			else {
				sex = '它';
			}
			MI.confirm({
				type : 'error',
				title : MI.string.cut(nick,14) + '在你的黑名单中',
				content : '确定要将' + nick + '移出黑名单并收听' + sex + '吗？',
				confirm : function(){
					send();
				}
			});
		}
		else {
			send();
		}
		*/
		send();
		function send(){
			if (!el.sending) {
				var isFollow = -1,url,className = el.className,classNameFollow = 'addAttention',classNameUnfollow = 'delAttention',followedNum = $('followedNum_' + id),followNum = $('followNum_' + id),isNotButton = className != classNameFollow && className != classNameUnfollow;
				if (className == classNameFollow || isNotButton ) {
					isFollow = 1;
					url = MI.url.follow;
				}
				else {
					url = MI.url.unfollow;
				}

				el.sending = 1;

				var Time,Time_1,Time_2,Time_3;
				Time = + new Date();
				MI.ajax({
					url : url,
					data : {u:id,r:MI.random(),veriCode:veriCode||''},
					success : function(data){
						Time_1 = + new Date() - Time;
						el.sending = 0;
						data = MI.json(data);
						if (data.result == 0) {
							//Change Button's ClassName
							if (!isNotButton) {
								if (isFollow == 1) {
									el.className = classNameUnfollow;
								}
								else el.className = classNameFollow;
							}

							//Count Number
							if (followedNum) {
								MI.countNum(followedNum,isFollow);
							}
							if (followNum) {
								MI.countNum(followNum,isFollow);
							}
							for (var i = 0,num = MI.fC.numFormat.length;i < num;i++) {
								MI.countNum(MI.fC.numFormat[i],isFollow,1);
							}
							for (var i = 0,num = MI.fC.num.length;i < num;i++) {
								if (UI.A(MI.fC.num[i],'rel') == id) {
									MI.countNum(MI.fC.num[i],isFollow);
								}
							}
							
							//Join List
							if (!UI.isUndefined(data.followTips)){
								MI.user.fun.followList = data.followTips;
							}
							if (MI.user.fun.followList && data.info && isFollow == 1 && !id.hasString(',')){
								// && data.info.myfollow && data.info.myfollow[0] > 500
								//有标签打招呼设置时不弹名单设置
								if (!(MI.Tag && MI.Tag.sayHiStorage() == '')){
									MI.app({
										List : function(){
											MI.List.listFollow(id);
										}
									});
								}
							}

							//Callback Function
							if (call) {
								call(isFollow);
							}
							el.value = isFollow == 1 ? _('取消收听') : _('收听');
							
							//Clear Time For At AutoCmt
							if (isFollow == 1){
								MI.S('time',0);
							}
						}
						else if (MI.code.check(data.result)) {
							MI.code.show({msg:data.msg,code:data.info,call:function(code){
								MI.follow(id,el,call,code);
							}});
						}
						else if (data.msg){
							MI.alert(data.msg);
						}
				
						//Speed
						Time_2 = + new Date() - Time;
						setTimeout(function(){
							Time_3 = + new Date() - Time;
							MI.Speed('t_asyn_follow',0.1,Time_1,Time_2,Time_3);
						},0);
					}
				});
			}
		}
	},
	sFollowTip : [_('添加到特别收听'),_('取消特别收听')],
	topic : function(id,el,del){
		if (!el.sending) {
			var isDel = del || UI.hasClass(el,'delAttention'),type = isDel ? '2' : '1',
				topic = $('gzTopic');
			if (topic){
				UI.A(topic,'tab',2);
			}
			MI.ajax({
				url : MI.url.topicFollow,
				data : {tid:id,type:type,r:MI.random()},
				success : function(data){
					data = MI.json(data);
					if (data.result == 0) {
						if (del) {
							var Parent = el.parentNode;
							UI.animate(Parent,'opacity',0,function(){
								UI.remove(Parent);
								// 刷新订阅列表
								MI.updateTopic();
							});
						}
						else {
							el.className = isDel ? 'addAttention' : 'delAttention';
							el.value = isDel ? _('收听') : _('取消收听');
							// 刷新订阅列表
							MI.updateTopic();
						}
						MI.countNum($('followedNum_' + id),isDel ? -1 : 1);
					}
					else{
						MI.alert(data.msg);
					}
					el.sending = 0;
				}
			});
		}
		el.sending = 1;
	},
	topicDel : function(id,el){
		MI.topic(id,el,1);
	},
	topicOp : function(key,el,del) {
		if (!el) return;
		if (!el.sending) {
			var isDel = del || (UI.A(el, 'fo') == '1'),
				topic = $('gzTopic');
			if (topic){
				UI.A(topic,'tab',3);
			}
			MI.ajax({
				url: MI.url.searchFeed,
				data: {
					type: isDel?3:2,
					name: key,
					r: MI.random()
				},
				success: function(data) {
					data = MI.json(data);
					if (data.result == 0) {
						if (del) {
							var p = el.parentNode;
							UI.animate(p, 'opacity', 0, function() {
								UI.remove(p);
								// 刷新订阅列表
								MI.updateTopic();
							});
						} else {
							el.innerHTML = isDel ? '+' + _('订阅关键词') : '-' + _('取消订阅');
							UI.A(el, 'fo', (isDel?'0':'1'));
							// 刷新订阅列表
							MI.updateTopic();
						}
					}
					el.sending = 0;
				}
			});
		}
		el.sending = 1;
	},
	updateTopic : function(el, toggle) {
		el = el || $('gzTopic');
		if (!el) return;
		
		var unfold = el.unfold||0,
			tab = UI.A(el,'tab');
		if (toggle) unfold = unfold?0:1;
		var params = 't=topic' + '&unfold=' + unfold + '&r=' + MI.random();
		if (tab){
			params += '&tab=' + tab;
		}
		
		MI.ajax({
			url : MI.url.mySidebar,
			data : params,
			type : 'get',
			success : function(data){
				data = MI.json(data);
				if (data.result == 0) {
					if (data.info && data.info.topic) {
						if (toggle) el.unfold = unfold;
						el.innerHTML = data.info.topic;
	
						UI.evalScript(data.info.topic);
					}
					MI.Load.bottom();
				}
			}
		});
		
		if (toggle) MI.Bos(unfold?'btnMoreSub':'btnLessSub');
	},
	/*
	 * 1 =>  新听众的数量
	 * 2 =>  私信的数量
	 * 3 =>  新消息的数量
	 * 4 =>  提及我的消息数量
	 * 5 =>  原创新消息的数量
	 * 6 =>  List新消息数量
	 * 7 =>  List原创新消息数量
	 * 8 =>  名单新增收录数
	 * 9 =>  AT中认证用户
	 * 10 => AT中我收听的人
	 * 13 => 群内AT我的
	 * 14 => 提及我的消息数量（只看有理由的）
	 * 15 => 校园微博新消息数量
	 */
	newCount : function(type, url, time){
		type = type || '4,3,2,1';
		//type = type || '4,3,2', //暂时去掉气泡提示
		var reqUrl = MI.url.newCount;
		if ((url && typeof(url) == 'string')) {
			reqUrl = url;
		}
		else if (MI.user.fun.newCount && !url) {
			reqUrl = MI.url.newCountNew;
		}
		var interval = 30*1000;
		if (time && typeof(time) == 'number') {
			interval = time * 1000;
		}
		setInterval(newCout,interval);
		setTimeout(function(){ //不加延迟，IE中偶尔请求会被阻断
			newCout();
		},10);
		var fail = 0;
		function newCout(){
			var urlData = {type:type}; 
			if (fail < 6) { //6次未登录后不再拉取
				if (MI.newCount.data){
					for (var i in MI.newCount.data){
						urlData[i] = MI.newCount.data[i];
					}
					if (MI.talkList && MI.talkList.first && MI.talkList.first.id && !MI.newCount.data.id){
						urlData['id'] = MI.talkList.first.id;
						urlData['time'] = MI.talkList.first.time;
					}
				}
				var Time,Time_1,Time_2,Time_3;
				Time = + new Date();
				if (MI.user.fun.newCount && !url){
					urlData.cb = 'MI.newCountShow'; //回调函数
					
					var urlDataArray = [];
					for (var i in urlData){
						urlDataArray.push(i + '=' + urlData[i]);
					}
					if (!reqUrl.hasString('?')){
						reqUrl += '?';
					}
					UI.getScript(reqUrl + urlDataArray.join('&'),function(){
						//Speed
						Time_2 = + new Date() - Time;
						setTimeout(function(){
							Time_3 = + new Date() - Time;
							MI.Speed('t_asyn_newmsg',0.02,Time_1,Time_2,Time_3);
						},0);
					},'utf-8');
				}
				else {
					MI.ajax({
						url : reqUrl,
						data : urlData,
						type : 'get',
						success : function(data){
							data = MI.json(data);
							//data = {"result":0,"msg":"\u6210\u529f","info":[{"type":1,"value":999},{"type":2,"value":2},{"type":3,"value":3},{"type":4,"value":4}]};
							MI.app({
								Base : function(){
									MI.newCountShow(data);
								}
							});
		
							//Speed
							Time_2 = + new Date() - Time;
							setTimeout(function(){
								Time_3 = + new Date() - Time;
								MI.Speed('t_asyn_newmsg',0.02,Time_1,Time_2,Time_3);
							},0);
						}
					});
				}
			}
		}
		MI.newCount.dot = function(target,num){
			if (target){
				var dot = $$(target,'.ico_newMsg')[0];
				if (num && !dot){
					UI.append(UI.html('<sup class="ico_newMsg"><b>new</b></sup>')[0],target);
				}
				else if (num == 0){
					UI.remove(dot);
				}
			}
		}
		MI.newCount.checkDropList = function(target, num, list)
		{
			if (target){
				var dot = $$(target,'.ico_newMsg')[0];
				
				if (num && !dot || !num && dot){
					if(list)
					{
						list.innerHTML = '';
					}
				}
				
			}
		}
		MI.newCountShow = function(data){
			if (data.result == 0) {
				var target,
					num,
					maxNum,
					tip,
					tipNum = 0,
					showMsgBox,
					_new;
				UI.each(data.info,function(o,i){
					num = o.value;
					//听众
					if (o.type == 1) {
						tipNum++;
						target = $('newCount2Follower');
						if (target && num) {
							var _num = target.firstChild,followerNum = $('followerNum');
							maxNum = 99;
							_num.innerHTML =  num > maxNum ? maxNum + '+' : num;
							//_num.title = _('有') + (num > maxNum ? _('超过') + maxNum : num) + _('个新听众');
							_num.title = _('有{0}个新听众',num > maxNum ? _('超过') + maxNum : num);
							UI.addClass(UI.next(_num),'bubble');
							UI.show(target);
							/*if (followerNum) {
								followerNum.num = followerNum.num || parseInt(followerNum.innerHTML);
								followerNum.innerHTML = followerNum.num + num;
							}*/
						}
						else if (target){
							UI.hide(target);
						}
						target = $('newCountFollower');
						if (target && num) {
							var _num = target.firstChild,followerNum = $('followerNum');
							maxNum = 999;
							_num.innerHTML =  num > maxNum ? maxNum + '+' : '+' + num;
							_num.title = _('有{0}个新听众',num > maxNum ? _('超过') + maxNum : num);
							UI.addClass(UI.next(_num),'bubble');
							UI.show(target);
							showMsgBox = 1;
						}
						else if (target){
							UI.hide(target);
						}
					}
					//名单新收录提醒
					if (o.type == 8) {
						tipNum++;
						target = $('newListonNum');
						if (target && num) {
							var _num = target.firstChild;
							maxNum = 99;
							_num.innerHTML =  num > maxNum ? maxNum + '+' : '+' + num;
							//_num.title =  _('有') + (num > maxNum ? _('超过') + maxNum : num) + _('个新名单收录你');
							_num.title =  _('有{0}个新名单收录你',num > maxNum ? _('超过') + maxNum : num);
							UI.addClass(UI.next(_num),'bubble');
							UI.show(target);
						}
						else if (target){
							UI.hide(target);
						}
					}
					//私信
					if (o.type == 2) {
						tipNum++;
						target = $('newCout2Msg');
						if (target && num) {
							var _num = target.firstChild;
							maxNum = 99;
							_num.innerHTML =  num > maxNum ? maxNum + '+' : num;
							_num.title = _('有{0}封新私信',num > maxNum ? _('超过') + maxNum : num);
							UI.addClass(UI.next(_num),'bubble');
							UI.show(target);
							showMsgBox = 1;
						}
						else if (target){
							UI.hide(target);
						}
						target = $('newCoutMsg');
						if (target) {
							target.innerHTML = target && num ? '(' + num + ')' : '';
						}
					}
					//新消息数
					if ((o.type == 3 || o.type == 5 || o.type == 6 || o.type == 7 || o.type == 15 || o.type == 16 || o.type == 32) && !MI.noNewCount) {
						if (MI.talkList && MI.talkList._new) {
							maxNum = 50000;
							if (o.type == 6 || o.type == 7){
								maxNum = 100;
							}
							if (o.type == 16) {
								maxNum = 30;
							}
							if (num >= maxNum) {
								tip = _('超过<strong>{0}</strong>条的',maxNum);
							}
							else tip = _('<strong>{0}</strong>条',num);
							_new = MI.talkList._new;
							_new.innerHTML = '<a href="javascript:void(0)" tabindex="4" accesskey="x">' + _('约{0}新广播，点击查看',tip) + '</a>';
		
							//Title Tip
							if (!document.titleTmp) {
								document.titleTmp = document.title;
							}
							if (num > maxNum) {
								document.title = '(' + maxNum + '+) ' + document.titleTmp;
							}
							else {
								document.title = (num ? '(' + num + ') ' : '') + document.titleTmp;
							}
		
							if (num) {
								_new.style.display = 'block';
							}
							else {
								UI.hide(_new);
							}
							if (_new.num != num) {
								UI.C(_new,'opacity',0);
								UI.animate(_new,'opacity',1);
							}
							_new.num = num;
							/*if (num > 9) { //Auto Show New Talks
								MI.talkList.newly();
							}*/
						}
						if (o.type == 3 && MI.boss != 11){
							target = $$('.homeTab a')[0];
							MI.newCount.dot(target,num);
						}
					}
					// 微群聚合页的消息提醒
					if(o.type == 17){
						target = $$($('home_mygroup_top'),'a')[0];
						/// 是否要更新当前的下来列表
						MI.newCount.checkDropList(target,num,$$('.home_mygroup_top')[0]);
						MI.newCount.dot(target,num);
					}
					//提到我的
					if (o.type == 4 || o.type == 13 || o.type == 14) {
						tipNum++;
						target = $('newCout2At');
						if (target && num) {
							var _num = target.firstChild,
								_numOnlyAll = 1;
							maxNum = 99;
							if (UI.isArray(num)){ //[所有提到,我收听的,认证用户]
								var _tip = $$(UI.next(target),'em'),
									numTmp = num,
									num = numTmp[0];
									UI.each(_tip,function(o){
										var i = UI.A(o,'rel');
										if (numTmp[i]){
											o.innerHTML =  '(' + (numTmp[i] > 999 ? 999 + '+' : numTmp[i]) + ')';
											UI.show(o.parentNode);
											if (i != '0'){
												_numOnlyAll = '';
											}
										}
										else {
											UI.hide(o.parentNode);
										}
									});
							}
							UI.A(target,'onlyAll',_numOnlyAll);
							if (num){
								_num.innerHTML =  num > maxNum ? maxNum + '+' : num;
								_num.title = _('有{0}条新广播提到你',num > maxNum ? _('超过') + maxNum : num);
								UI.addClass(UI.next(_num),'bubble');
								UI.show(target);
								showMsgBox = 1;
							}
							else {
								UI.hide(target);
							}
						}
						else if (target){
							UI.hide(target);
						}
						target = $('newCoutAt');
						if (UI.isArray(num)) {
							num = num[0];
						}
						if (target) {
							target.innerHTML = target && num ? '(' + num + ')' : '';
						}
					}
				});
				MI.app({
					Base : function(){
						if (showMsgBox){
							MI.GoTop.showMsgBox();
						}
						else if (tipNum >= 2){
							MI.GoTop.hideMsgBox();
						}
					}
				});
				fail = 0;
			}
			else if (data.result == -1) { //未登录
				fail++;
			}
		}
	},
	addHover : function(el){
		var delayHover,delayOut;
		el.onmouseover = function(){
			var Self = this;
			clearTimeout(delayOut);
			delayHover = setTimeout(function(){
				if (UI.B.ie6){
					UI.addClass(Self,'hover');
				}
			},20);
		}
		el.onmouseout = function(){
			var Self = this;
			clearTimeout(delayHover);
			delayOut = setTimeout(function(){
				UI.removeClass(Self,'hover');
				UI.removeClass(Self,'newMsg');
			},20);
		}
	},
	bottom : function(id){ //Set Page Or More Bar To Bottom
		if ($(id)){
			var lists = $$('.main .LC'),list,main = UI.parents($(id),'main')[0],wrap,y = 0;
			if (main) {
				wrap = main.parentNode;
			}
			if (!lists.length) {
				lists = $$('.LC');
			}
			list = lists[lists.length - 1];
			if (list && UI.height($(id))) {
				UI.C(list,'marginBottom',0);
				if (main) {
					y = UI.height(main) - UI.height(wrap);
				}
				else {
					wrap = $('mainWrapper');
					UI.each(wrap.childNodes,function(o){
						if (o.nodeType == 1) {
							y += UI.height(o);
						}
					});
					y -= UI.height(wrap);
				}
				UI.C(list,'marginBottom',y < -1 ? - y + 'px' : '');
			}
		}
	},
	/**
	 * 回到我的主页
	 * 
	 *            @example
	 *            MI.goHome();
	 */
	goHome : function(){
		document.location.href = 'http://t.qq.com/' + MI.user.account;
	},
	/**
	 * 对话
	 * 
	 * @param {String} String 用户ID或者消息ID
	 * @param {String} String 用户昵称或备注
	 * @param {String} String 默认文本
	 *            @example
	 *            MI.reply('liuxiang','刘翔','你好');
	 *            MI.reply('2109004983375','刘翔','你好');
	 */
	reply : function(id,nick,txt){
		MI.app({
			Base : function(){
				MI.card.chName = id;
				MI.card.bkname = MI.card.name = nick;
				MI.card._reply.onclick();
				MI.card.reply.talkBox._txt.value = txt || '';
			}
		});
	},
	/**
	 * 聊天
	 * 
	 * @param {String} String 用户ID
	 * @param {String} String 用户昵称或备注
	 * @param {String} String 用户头像
	 *            @example
	 *            MI.chat('xhlv','xhlv','http://t3.qlogo.cn/mbloghead/0d2b6bf91dfad0d16f1c');
	 */
	chat : function(id,nick,avatar){
		MI.app({
			WebQQ:function(){
				MI.WebQQ.chat(id,nick,avatar);
			}
		})
	},
	/**
	 * 推荐
	 * 
	 * @param {String} String 用户ID
	 * @param {String} String 用户昵称或备注
	 *            @example
	 *            MI.recom('liuxiang','刘翔');
	 */
	recom : function(id,nick){
		MI.app({
			Base : function(){
				MI.card.account = id;
				MI.card.bkname = MI.card.name = nick;
				MI.card._recom.onclick();
			}
		});
	},
	/**
	 * 发私信
	 * 
	 * @param {String} String 用户ID
	 * @param {String} String 默认文本
	 * @param {String} String 私信框类型
	 *            @example
	 *            MI.message('liuxiang','hello');
	 */
	message : function(id,txt,boxtype){
		MI.app({
			Base : function(){
				if (MI.user.fun.msgLab){
					MI.pmcompose(id, 3 ,txt,boxtype);
				}
				else {
					MI.card.chName = id;
					MI.card._msg.onclick();
					MI.card.msg.talkBox._txt.value = txt || '';
				}
			}
		});
	},
	/**
	 * 添加QQ好友确认逻辑
	 * 用户指被申请的人，当前用户是指登录用户（发请求的人）
	 * 
	 * @param {String} String 用户昵称
	 * @param {String} String 用户QQ
	 * @param {String} String 用户帐号
	 * @param {String} String 当前用户昵称
	 * @param {String} String 当前用户帐号
	 * @param {String} String 用户性别
	 * @param {String} String 当前用户qq号
	 * * @param {String} String 用户是否允许加qq
	 *            @example
	 *            MI.addQQ('xiaom565');   //可以只发送一个请求帐号
	 *            MI.addQQ('肖敏','283540706','xiaom565','me','me565','她','60504224',1);
	 */
	addQQ : function(Uname,id,account,currentName,currentAccount,gender,currentQQ,isAddqq){
		var _Uname,
			_id,
			_account,
			_currentName,
			_currentAccount,
			_gender,
			_currentQQ,
			_isAddqq;
		var dataGet;
		//如果信息不全	,实时回话加qq入口发送的第一个参数是用户帐号
		if (arguments.length < 8) {
			//拉取用户资料卡
				MI.Bos('btnwebQQ');
				_account = arguments[0];
				MI.ajax({
							url : MI.url.userCard,
							type : 'get',
							data : {
								u : _account,
								r : MI.random()
							},
							success : function(data) {
								data = MI.json(data);
								if (data.result == 0) {
									dataGet = data.info;
									_Uname = dataGet.nick;
									_id = dataGet.qq;
									_gender = dataGet.gender ? _('他') : _('她');
									_isAddqq = dataGet.addQQ;
									//获取当前用户信息
									_currentName = MI.user.name;
									_currentAccount = MI.user.account;
									_currentQQ = MI.Uin();
									 add();
								}
								else{ //资料卡拉取不正确
									MI.alert(data.msg);
								}
							}
						});
		}
		//如果信息全
		else{
			_Uname = Uname;
			_id = id;
			_account = account;
			_currentName = currentName;
			_currentAccount = currentAccount;
			_gender = gender;
			_currentQQ = currentQQ;
			_isAddqq = isAddqq;
			add();
		}
		//异步拉取数据需要时间
		function add(){
				var text = _('发出申请后，会将你的QQ号告知给<b>{0}</b>', _Uname);
				var tem = _('可能是{0}尚未设置允许互听好友向{0}发起QQ好友申请，发条私信把你的QQ告诉<b>{1}</b>?',
						_gender, _Uname);
				var textMessage = _(
						'hi,我想加你为QQ好友,我的QQ是{0},可以加我吗?你可以在隐私设置里勾上允许相互收听的人加你为QQ好友那项，以后就可以在QQ上直接收到申请啦！设置地址是http://t.qq.com/setting/privacy',
						_currentQQ);
				// B设置为不允许的情况
				if (_isAddqq == 0) {
					MI.confirm({
								type : 'error',
								title : _('对方尚未设置允许申请'),
								content : tem,
								confirmTxt : _('继续'),
								confirm : function() {
									MI.Bos('btnAskAddqq');
									MI.message(_account, textMessage, 'btnNotAllow');
								},
								cancelTxt : _('取消'),
								cancel : function() {
	
								}
							});
				}
				// 只有用户设置为允许加为QQ好友时，才发送qq号
				else {
					MI.confirm({
						type : 'error',
						title : _('确定将{0}加为QQ好友?', _gender),
						content : text,
						confirmTxt : _('确定'),
						confirm : function() { // 确认的回调函数
							MI.Bos('btnAskAddqq');
							MI.Bos('btnAskSuccess');
							MI.dialog.hide();
	
							// 用户允许加qq申请
							// 接入文档 http://platform.server.com/af/guide.html
							var name = _currentName + '(@' + _currentAccount + ')';
							var validation = _('我是腾讯微博中与你相互收听的"{0}",想加你为QQ好友!',
									name);
							if (window.id_af_show) {
								id_af_show(_id, 1, {
											"al" : 1,
											"vcmsg" : validation
										});
							} else {
								UI.getScript('http://id.qq.com/af/js/id_af.js',
										function() {
											id_af_init({
														"appid" : 10025,
														"lang" : 2052,
														"defaultlogin" : true
													});
											id_af_show(_id, 1, {
														"al" : 1,
														"vcmsg" : validation
													});
											/**
											 * 重载发送添加好友申请的回调函数
											 */
											window.id_af_callback = function(type,
													obj) {
												if (type == 2) { // 发送申请成功
													if (obj.flag == 2) { // 发送申请成功，等待对方确认
														setTimeout(function() {
															MI.confirm({
																type : 'success',
																title : _('QQ申请已发出'),
																content : _('再发一条私信通知<b>{0}</b>?',_Uname),
																confirmTxt : _('确认'),
																confirm : function() {
																	MI.message(_account,	_('hi,我刚申请加你为QQ好友,快去你微博对应的QQ({0})上通过我的申请吧!',_id),'btnAllowMessage');
																},
																cancelTxt : _('取消'),
																cancel : function() {
	
																}
															});
														}, 4000); // end timeOut
													}
												}
											}
										});
							}						  
	
						}, //end confirm
						cancelTxt : _('取消'),
						cancel : function() { //取消的回调函数
	
						}
					});
			}
		}
	},
	
	/**
	 * 举报
	 * 
	 * @param {String} String 消息ID或者用户帐号
	 *            @example
	 *            MI.report('9077059366006');
	 *            MI.report('liuxiang');
	 */
	report : function(id){
		if (id && id.match(/[^\d]/g)){
			jubao_user(id);
		}
		else {
			jubao_msg(id);
		}
	},
	/**
	 * 警告提示
	 * 
	 * @param {String} String 提示文本
	 *            @example
	 *            MI.alert('你填写的地址有问题');
	 */
	alert : function(str,call){
		if(str) {
			MI.dialog.alert(str,call);
		}
	},
	/**
	 * 成功提示
	 * 
	 * @param {String} String 提示文本
	 *            @example
	 *            MI.tip('保存成功');
	 */
	tip : function(str,call){
		if(str) {
			MI.dialog.showTip({html:str,end:call});
		}
	},
	/**
	 * 发表框（浮层版）
	 * @param {String} title 标题
	 * @param {String} content 内容
	 * @param {Number} height 高度（默认40px）
	 *            @example
	 *            MI.talk('写出你的生存技巧：','我的生存技巧……',40);
	 */
	talk : function(title,content,height) {
		MI.app({
			Base : function(){
				MI.reply = new MI.Reply();
				MI.reply.show({
					title : title || '',
					cont : content || '',
					height : height || 40
				});
			}
		});
	},
	/**
	 * 转播
	 *            @example
	 *            MI.App.relay('1234567890', '这是上次转播的内容');
	 *            MI.App.relay('1234567890', domOfTheTweet);
	 * @param {String} talkId 被转播tweet的id
	 * @param {String|Object} content 该条tweet上次被转播的评语，或被转播的tweet的dom引用(利用dom元素自动查找上次被转播内容），该参数可以忽略
	 */
	relay : function(talkId,content) {
		var cfg = {};
		if (content) {
			if (UI.isString(content)) {
				cfg.content = content;
			} else if (UI.isElement(content)) {
				cfg.tweetDom = content;
			}
		}
		MI.TalkBox.showBox(talkId, 1, cfg);
	},
	/**
	 * 评论
	 *            @example
	 *            MI.App.comment('1234567890', '这是上次转播的内容');
	 *            MI.App.comment('1234567890', domOfTheTweet);
	 * @param {String} talkId 被评论tweet的id
	 * @param {String|Object} content 该条tweet上次被转播的评语，或被转播的tweet的dom引用(利用dom元素自动查找上次被转播内容），该参数可以忽略
	 */
	comment : function(talkId,content) {
		var cfg = {};
		if (content) {
			if (UI.isString(content)) {
				cfg.content = content;
			} else if (UI.isElement(content)) {
				cfg.tweetDom = content;
			}
		}
		MI.TalkBox.showBox(talkId, 4, cfg);
	},
	/**
	 * 图片容错
	 * 
	 * @param {Object} Object 图片DOM
	 *            @example
	 *            o.onerror = function(){
	 *                MI.picError(this);
	 *            }
	 */
	picError : function(el){
		var url = el.src;
		if (url.hasString('qlogo.cn') || url.hasString('qpic.cn')){
			el.src = url.replace(/\/t[\d]/,'/tb');
		}
		MI.Bos('btnOnerrorPic');
		el.onerror = null;
	},
	/**
	 * 跨域请求
	 * 
	 * @param {Object} Object 请求参数
	 * @param {Boolean} Boolean 强制发单一请求（用于处理跨域请求队列）
	 *            @example
	 *            MI.ajax({
	 *                url : 'http://api.t.qq.com/publish.php',
	 *                data : {op:1}
	 *            });
	 */
	ajax : function(o,lonely){
		if (!MI._ajaxProxy){
			MI._ajax.push(o);
			var name = 'ajaxProxy' + MI.random();
			MI._ajaxProxy = UI.html('<iframe id="' + name + '" name="' + name + '" src="' + MI.api.host + '/proxy.html" style="display:none" onload="MI.ajaxXhr = 1;MI.ajax();"></iframe>')[0];
			UI.ready(function(){
				UI.append(MI._ajaxProxy,document.body);
			});
		}
		else if (!MI.ajaxXhr){
			MI._ajax.push(o);
		}
		else {
			if (MI._ajax.length && !lonely){
				UI.each(MI._ajax,function(obj){
					MI.ajax(obj,true);
				});
				MI._ajax = [];
			}
			else {
				if (o.url && o.url.hasString(MI.api.host)){
					o.xhr = MI._ajaxProxy.contentWindow.xmlHttp();
				}
				return UI.ajax(o);
			}
		}
	},
	_ajax : [],
	/**
	 * API配置
	 * 
	 * @type {Object}
	 */
	api : {
		/**
		 * 统一的API调用地址
		 * 
		 * @type {String}
		 */
		host : (function(){
			return 'http://' + (window.MIAPIHost || 't.qq.com');
		})(),
		/**
		 * API类型，以参数apiType传给后台逻辑区分（0-主站,1-微群,2-校园微博,3-QQ浏览器面板）
		 * 
		 * @type {String}
		 */
		type : 0,
		/**
		 * API版本号
		 * 
		 * @type {String}
		 */
		version : '',
		/**
		 * API发布时间戳（用于接口升级等）
		 * 
		 * @type {String}
		 */
		time : '110602',
		/**
		 * 发表广播的来源ID
		 * 
		 * @type {String}
		 */
		source : null,
		/**
		 * 操作上报的Boss表ID（不同站点接入可以申请不同的上报ID）
		 * 
		 * @type {String}
		 */
		boss : null
	},
	version : (function(){
		var url = 'http://mat1.gtimg.com/www/mb/',
			js = {
				ui : {
					DatePicker : '110303',
					ColorPicker : '110107'
				},
				mi : {
					Base : '110704',
					Tmpl : '110705',
					Mood : '110705',
					City : '110406',
					CityAll : '110406',
					Validate : '110526',
					ValidateNew : '110526',
					RelateSelect : '110524',
					Slide : '110402',
					College : '110626a',
					Theme : '110307',
					Tag : '110705',
					List : '110704',
					SettingEdu : '110614',
					SettingWork : '110518',
					TalkListUpdate : '110505',
					TalkListShare : '110622',
					Scroll : '101111',
					Capture : '110613',
					Music : '110706b',
					QQMusicInstance : '110601',
					QQMusicPlayer : '110307',
					QQMusicWmpPlayer : '110406a',
					QQMuicHtml5Player : '110307',
					Face : '110706',
					MapPop : '110509',
					WebQQ : '110704',
					WebQQFull : '110706',
					NonTx : '110318',
					Group : '110623',
					QunList : '110510a',
					PicList : '110706c'
				}
			},
			css = {
				ui : {
					datePicker : '110303',
					colorPicker : '101228'
				},
				mi : {
					base : '110621'
				}
			},
			lab = { //实验室
				Base : 1,
				base : 1
			},
			lang = { //国际化
				City : 1,
				CityAll : 1
			},
			all = {};
		for (var i in js) {
			for (var j in js[i]) {
				all[j] = url + 'js/' + i + '.' + j + (lab[j] ? '.lab' : '') + (lang[j] && window.MILang ? '.' + window.MILang : '') + '_' + js[i][j] + '.js'
			}
		}
		for (var i in css) {
			for (var j in css[i]) {
				all[j] = url + 'css/' + i + '.' + j + (lab[j] ? '.lab' : '') + '_' + css[i][j] + '.css'
			}
		}
		return all;
	})(),
	versionSet : function(obj){
		for (var i in obj){
			var version = MI.version[i],arr,name,type;
			if (version) {
				arr = version.split('_');
				if (arr.length == 3){
					name = arr[0] + '_' + arr[1];
					type = arr[2].split('.')[1];
				}
				else {
					name = arr[0]; 
					type = arr[1].split('.')[1];
				}
				MI.version[i] = name + '_' + obj[i] + '.' + type;
			}
		}
	},
	app : function(obj){
		for (var i in obj) {
			if (MI._appLoad[i]) {
				MI._appLoad[i].push(obj[i]);
			}
			else {
				MI._app[i] = obj[i];
				MI._appLoad[i] = [];
				if (MI.appLoaded) {
					MI.appLoad(obj);
				}
			}
		}
	},
	_app : {}, //App Callback Function
	_appLoad : {}, //App To Load
	_appLoading : {}, //App In Loading
	appLoad : function(obj){
		var css,charset = 'utf-8';
		/*if (UI.parseUrl().jsDebug){
			charset = 'gb2312';
		}*/
		for (var i in obj || MI._app) {
			if (MI.version[i] && MI.version[i].hasString('www.qq.com')){
				charset = 'GB2312';
			}
			if (!MI[i]) {
				if (!MI._appLoading[i]){
					setTimeout((function(i){
						return function(){
							UI.getScript(MI.version[i],function(){
								MI.appLoadDo(i);
							},charset);
						}
					})(i),20);
					css = MI.version[i.slice(0,1).toLocaleLowerCase() + i.slice(1)];
					if (css) {
						setTimeout((function(css){
							return function(){
								UI.getCss(css);
							}
						})(css),0);
					}
					css = 0;
					MI._appLoading[i] = 1;
				}
			}
			else if(MI._app[i]){
				if (UI.isFunction(MI._app[i])) {
					MI._app[i]();
				}
				MI._appLoad[i] = MI._app[i] = null;
			}
		}
		MI.appLoaded = 1;
	},
	appLoadDo : function(i){ //Run Callback Function
		if (MI[i] || UI[i]) {
			if (UI.isFunction(MI._app[i])) {
				MI._app[i]();
			}
			for (var j in MI._appLoad[i]){
				if (MI._appLoad[i] && UI.isFunction(MI._appLoad[i][j]) && MI._appLoad[i].hasOwnProperty(j)) {
					MI._appLoad[i][j]();
				}
			}
			MI._appLoad[i] = MI._app[i] = null;
		}
		else {
			var version = MI.version[i],
				mat1 = 'mat1.gtimg.com/www',
				qq = 'www.qq.com/mb/mat1',
				app = {};
			if (version.hasString(mat1) && !version.hasString(qq)){
				MI.version[i] = MI.version[i].replace(mat1,qq);
				app[i] = function(){
					MI.Bos('btnOnerrorJsFileReload');
				}
				MI._appLoading[i] = 0;
				MI.appLoad(app);
			}
			MI.Bos('btnOnerrorJsFile',MI.version[i] + ',' + MI.user.account + ',' + encodeURIComponent(document.location.href) + ',' + window.navigator.userAgent);
		}
	},
	appLoaded : 0
}
/**
 * 异步接口地址
 * 
 * @type {Object}
 */
MI.url = (function(){
	var host = '';
	if (MI.api.host){
		host = MI.api.host + MI.api.version;
	}
	return {
		t : host + '/p/t/', //消息底层页（http://api.t.qq.com/p/t/90009082726679?format=1）
		
		mySidebar : host + '/asyn/mysidebar.php', //主页右侧
		userSidebar : host + '/asyn/usersidebar.php', //客人页右侧
		similarUser : host + '/asyn/samiliarRecStars.php', //客人页收听后推荐人
		recommend : host + '/api/1.0/recommend.json', //客人页收听后推荐人
		tag : host + '/asyn/tag_oper.php', //客人页标签
		
		list : host + '/asyn/mylist.php', //我的名单
		listAdd : host + '/asyn/createlist.php', //创建名单
		listEdit : host + '/asyn/editlist.php', //编辑名单
		listDel : host + '/asyn/dellist.php', //删除名单
		listFollow : host + '/asyn/list.php', //订阅名单
		listJoin : host + '/asyn/joinlist.php', //拉入名单
		listJoins : host + '/asyn/joinlists.php', //拉入多个名单
		listExit : host + '/asyn/exitlist.php', //拉出名单
		otherSave : host + '/asyn/others_save.php', //不再提示设置备注和名单分组
		
		uploadVideo : host + '/uploadvideo.php', //上传视频
		validateVideo : host + '/asyn/validvideo.php', //添加视频地址
		uploadUrlPic : host + '/uploadextpic.php', //上传Url图片
		uploadMusic : host + '/uploadaudio.php', //上传音频
		musicPlayUrl : host + '/asyn/musicPlayUrl.php', //添加音乐
		vote : host + '/vote/asyn/vote.php', //添加投票
		talkPublish : host + '/publish.php', //发表广播
		at : host + '/asyn/nicktips.php', //at联想
		notice : host + '/asyn/notice.php', //用户写广播监控
		talkDel : host + '/delete.php', //删除广播
		talkFavor : host + '/asyn/favoritemsg.php', //收藏广播
		talkShield : host + '/asyn/blockAtMsg.php', //屏蔽广播
		newCount : host + '/asyn/newMsgCount.php', //新消息数
		newly : host + '/asyn/home.php', //拉取新消息
		relayList : host + '/message_relay_frame.php', //查看转播列表
		relayListAt : host + '/asyn/atMessageFrame.php', //查看转播列表
		relayListSecond : host + '/message_relay_second.php', //查看二次转播列表
		allMyList : host + '/asyn/allmylist.php', //拉取名单列表
		qunList : host + '/asyn/myWQjson.php', //拉取微群列表
		mySidebar : host + '/asyn/mysidebar.php', //右侧模块拉取
		userBit : host + '/asyn/userBitAttrSave.php', //用户标志位
		userRelation : host + '/asyn/userRelation.php', //获取用户收听关系
		follow : host + '/follow.php', //收听
		unfollow : host + '/unfollow.php', //取消收听
		sFollow : host + '/asyn/group_oper.php', //特别收听
		block : host + '/asyn/block.php', //拉黑
		unblock : host + '/asyn/unblock.php', //取消拉黑
		bkName : host + '/asyn/bkName_oper.php', //添加备注
		topicFollow : host + '/asyn/topic.php', //(取消)收听话题
		searchFeed : host + '/asyn/messageSearch.php', //订阅列表
		shareQzone : host + '/share/shareQzone.php', //空间分享
		shareMail : host + '/mail/mailShare.php', //邮件分享
		shareMailActive : host + '/mail/mailActive.php', //邮件分享-激活
		shareMailList : host + '/mail/mailist.php', //邮件分享常用联系人
		shareQQ : host + '/share/shareMsg.php', //QQ分享
		shareQQList : host + '/share/qqList.php', //QQ分享-好友列表
		translate : host + '/asyn/translate.php', //翻译
		topicInfo : host + '/asyn/topicInfo.php', //大运会Icon
		medal : host + '/asyn/medalpoint.php', //勋章
		searchList : host + '/asyn/searchBoxList.php', //历史搜索
		userCard : host + '/asyn/userCard.php', //用户卡片
		message : host + '/messages/send.php', //私信
		comm : host + '/asyn/comm.php', //推荐
		urlDetail : host + '/asyn/urldetail.php', //查看短链接
		smartBox : host + '/asyn/messagetips.php', //smartBox统一服务接口
		reportSpam : host + '/asyn/reportSpam.php', //快速举报
		chatStat : host + '/chat/updateChatStat.php', //快速举报
		recommendStat : host + '/asyn/recommendStat.php', //用户行为反馈统计
		userTips : host + '/asyn/userTips.php', //搜索用户
		//下面的地址不需要加host
		newCountNew : 'http://message.t.qq.com/newMsgCount.php', //新消息数（新）
		updateTips : '/asyn/updateTips.php', //关闭Tips
		uploadPic : '/asyn/uploadpic.php' //上传图片
	}
})();
MI.S = function(name,value){ //Storage
	try{
		if (window.localStorage) { //For HTML5 : IE8+,FF3.5+,Chrome,Safari,Opera...
			/*if (value == '') {
				delete localStorage[name];
			}
			else */if (value != undefined) {
				localStorage[name] = value;
			}
			else return localStorage[name] || '';
		}
		/*else if (window.globalStorage) { //For Firefox2 And Firefox3
			//console.dir(window.globalStorage);
			var domain = MI.Storage.domain;
			if (value != undefined) {
				globalStorage[domain].setItem(name,value);
			}
			else return globalStorage[domain].getItem('time');
		}*/
		else if (UI.B.ie) { //For IE6,IE7
			var _body = MI.S._body;
			if (!_body.appended) {
				document.body.appendChild(_body);
				_body.appended = 1;
			}
			try{
				_body.load('oXMLBranch');
			}catch(e){}
			if (value != undefined) {
				if (value == '') {
					_body.removeAttribute(name);
				}
				else UI.A(_body,name,value);
				_body.save('oXMLBranch');
			}
			else {
				return UI.A(_body,name) || '';
			}
		}
		else {
			return '$No$';
		}
	}catch(e){
		MI.Bos('btnStorageFull');
		MI.S.clear();
	}
}
MI.S._body = UI.html('<input style="display:none;behavior:url(#default#userData)" id="usersData">')[0];
MI.S.clear = function(){
	var filter = /^draft|top|time|option|tips|follow/,local = window.localStorage; // @联想数据过大，有时后会有问题
	if (local) {
		try{
			for (var i in local) {
				if (!i.match(filter)) {
					local[i] = '';
					local.removeItem(i);
				}
			}
		}catch(e){};
	}
	else if (UI.B.ie) {
		var _body = MI.S._body;
		_body.load('oXMLBranch');
		var attrs = _body.xmlDocument.firstChild.attributes;
		UI.each(attrs,function(o){
			try{
				var nodeName = o.nodeName;
				if (!nodeName.match(filter)) {
					_body.removeAttribute(nodeName);
				}
			}catch(e){};
		});
		try{
			_body.save('oXMLBranch');
		}catch(e){};
	}
}
MI.Speed = function(name,random,n1,n2,n3){
	if (name && Math.random() < random){
		n1 = n1 || 0;
		n2 = n2 || 0;
		n3 = n3 || 0;
		MI.Speed.pic[UI.random(0,9)].src = 'http://qos.report.qq.com/collect?type=1&name=' + name + '&1=' + n1 + '&2=' + n2 + '&3=' + n3 + '&4=0&5=0';
	}
}
MI.Speed.pic = [];
MI.Bos = function(op,value,random){ //Boss Using : MI.Bos('frontClick');
	if (op.hasString('http')){
		MI.Bos.pic[UI.random(0,9)].src = op;
	}
	else {
		if (random && Math.random() > random){
			return;
		}
		try{
			var ouin = MI.Uin(),
				data = '',
				bossId = MI.api.boss || 214;//UI.trim(UI.cookie('o_cookie'));
			value = value || MI.boss;
			if (UI.isNumber(value)){
				data = '&sServerIp=&iBackInt1=' + value + '&iBackInt2=&sBackStr1=';
			}
			else if(UI.isString(value)){
				data = '&sServerIp=&iBackInt1=&iBackInt2=&sBackStr1=' + value;
			}
			MI.Bos.pic[UI.random(0,9)].src = 'http://btrace.qq.com/collect?sIp=&iQQ=' + ouin + '&sBiz=microblog&sOp=' + op + '&iSta=0&iTy=' + bossId + '&iFlow=0' + data + (op == 'btnOnerror' ? '' : '&r=' + MI.random());
		}catch(e){}
	}
}
/*
 * 推荐收听，用户行为反馈统计
 * @namespace MI.feedBack
 * @constructor lisaxiao
 * @param {object} object
 * 			String scene 推荐场景：1 : 主人页右侧“推荐收听” 2 : 微博注册 3 : 客人页收听时推荐 4 : 找人页推荐 5 : 主人页右侧“可能感兴趣的人” 6 : 认证用户客人页同类收听 7 : 登陆页面10个手动推荐 8 : 帐号设置时推荐 9 : AIO微博页卡 10: 客人页右侧“他收听的人 11:主timeline上方的推荐
 * 			String type 类型 1 :曝光用户 2 :点击头像 3 :点击收听 4 :一键收听 5：点击昵称 6：点X行为 7：更多 8：取消收听 9：点击“换一换” 10：点击“全部”
 * 			String account 被点击、曝光用户列表 
 * 			String medium 推荐中间人
 * 			String reasons 推荐人名.理由
 *            @example
 *            MI.feedBack({"scene":1,"type":3,"reasons":"xiaom565.2,xhlv.1"});
 */
MI.feedBack = function(obj,type,account){
	if(UI.isObject(obj)){
		var data = {};
		data.scene = obj.scene;
		data.type = obj.type;
		if(obj.medium) 
			data.medium = obj.medium;
		if (obj.account){
			data.account = obj.account;
		}
		else if(obj.reasons){
			data.reasons = obj.reasons;
		}
		var textUrl = MI.url.recommendStat + '?r=' + MI.random();
		MI.ajax({
			url : textUrl,
			type : 'get',
			data : data
		});
	}
	else{
		var textUrl = MI.url.recommendStat + '?r=' + MI.random();
		var data = {};
		if (account)
			data.account = account;
		data.type = type;
		data.scene = obj;
		MI.ajax({
			url : textUrl,
			type : 'get',
			data : data
		});
	}
}
MI.Uin = function(){
	var ouin = UI.trim(UI.cookie('luin') || UI.cookie('uin') || '');
	return Number(ouin.replace(/o/g,''));
}
MI.Bos.pic = [];
(function(){
	for (var i = 0;i < 10;i++) {
		MI.Bos.pic.push(new Image());
		MI.Speed.pic.push(new Image());
	}
})();
MI.Pic = function(o,size){
	size = size ? size : 50;
	o.src = 'http://mat1.gtimg.com/www/mb/images/head_' + size + '.jpg';
}
MI.videoThumb = function(o){
	o.src = 'http://mat1.gtimg.com/www/mb/images/vNoThumbs.jpg';
}
MI.Crs = function(reset){
	var scrollY = UI.scrollY(),
		y = scrollY + UI.windowHeight() * 1.5,
		yTop = scrollY - 100,
		noCrs = 1,
		className = 'crs',
		delay = 0,
		breaked = 0;
	if (MI.Crs.y) { //For Hack Bug Of Double Scroll Bar
		y += MI.Crs.y;
	}
	if (reset) {
		MI.crs = $$('.' + className);
	}
	if (!MI.Crs._body) {
		UI.ready(function(){
			MI.Crs._body = UI.html('<div style="display:none"></div>')[0];
			UI.append(MI.Crs._body,document.body);
		});
	}
	UI.each(MI.crs,function(o){
		o.onerror = function(){
			 MI.picError(this);
		}
		if (!breaked && UI.hasClass(o,className)) {
			var _y = UI.getY(o.parentNode) || UI.getY(o.parentNode.parentNode);
			if (_y && _y < y && _y > yTop) {
				var src = UI.A(o,className),
					iconPic = MI.Crs.iconPic && src.hasString('mblogpic') && !UI.hasClass(o,'noIconPic');
				setTimeout(function(){
					var preview = $$(o.parentNode,'.preview')[0];
					if (iconPic) { //For Big Picture
						var md5 = src.match(/\w{10,30}/g) || ['NOMD5'];
						if (MI.user.fun.mergePic && MI.Crs.iconPic.hasString(md5[0]) && !UI.A(o,'show')) {
							src = 'http://mat1.gtimg.com/www/mb/images/vT.png';
							UI.addClass(o.parentNode.parentNode.parentNode,'iconPic');
						}
						else {
							if (preview) {
								setTimeout(function(){
									UI.remove(preview);
								},50);
							}
							MI.Crs.iconPic += src;
						}
					}

					if (preview && MI.user.fun.autoPic) { //Auto Load Big Picture And Samll Picture
						var previewSrc = UI.A(preview,'crs'),
							img = UI.DC('img');
						UI.append(img,MI.Crs._body);
						if (previewSrc) {
							if (!iconPic) {
								UI.A(preview,'src',previewSrc);
								UI.A(preview,'crs','');
							}
							setTimeout(function(){
								UI.A(img,'src',previewSrc.replace(/[^\/]+$/g,'460'));
								img.onerror = function(){
									MI.picError(this);
								}
								MI.Bos('btnPicBigPreload','',0.0001);
							},500);
						}
					}

					if (UI.hasClass(o.parentNode,"vThumbs")) { //For Video Thumbs
						var vThumbsBox = o.parentNode.parentNode,
							vSimple = $$(vThumbsBox,'.vSimple')[0],
							vThumbs = $$(vThumbsBox,'.vThumbs')[0],
							thumbs = $$(vThumbs,'img')[0];


						if (MI.user.fun.mergePic && MI.Crs.iconPic.hasString(src) && !UI.A(o,'show')) {
							UI.hide(vThumbs);
							UI.show(vSimple);
							vThumbsBox.onmouseover = function(){
								vThumbs.style.display = 'inline';
								UI.addClass(this,'hover');
								MI.TalkList.resizePic(thumbs);
							}
							vThumbsBox.onmouseout = function(){
								UI.hide(vThumbs);
								UI.removeClass(this,'hover');
							}
						}else {
							MI.Crs.iconPic += src;
						}
					}
					o.src = src;
					o.style.display = 'inline';
					UI.removeClass(o,'loading');
				},delay);
				UI.removeClass(o,className);
			}
			if (_y > y) {
				breaked = 1;
			}
			delay += 2;
		}
	});
	clearTimeout(MI.delay.resetCrs);
	MI.delay.resetCrs = setTimeout(function(){
		MI.crs = $$('.' + className);
	},400);
}
MI.Crs.iconPic = 'x';
MI.Crs.disabled = 0; //是否禁用图片滚屏加载
MI.Tips = function(o){
	var Self = this;

	//Event
	Self._body.onmouseover = function(){
		UI.show(Self._body);
		clearTimeout(Self.delay);
	}
	Self._body.onmouseout = function(){
		clearTimeout(Self.delay);
		Self.delay = setTimeout(function(){
			Self.hide();
		},150);
	}
}
MI.Tips.prototype = {
	txt : '',
	delay : 0,
	_body : UI.html('<div class="cmtTip"></div>')[0],
	build : function(o){
		var Self = this,
			mouseover = function(){
				clearTimeout(Self.delay);
				var S = this;
				Self.delay = setTimeout(function(){
					Self.show(S,o.txt);
					UI.C(Self._body,'width',o.width ? o.width + 'px' : '');
				},150);
			},
			mouseout = function(){
				clearTimeout(Self.delay);
				Self.delay = setTimeout(function(){
					Self.hide();
				},150);
			};
		UI.each($$(o.area,o.target),function(el){
			if (!el.tips) {
				el.title = '';
				el.onmouseover = mouseover;
				el.onmouseout = mouseout;
				if (o.click) {
					UI.EA(el,'click',function(){
						o.click.apply(el);
					});
				}
				el.tips = 1;
			}
		});
	},
	show : function(target,txt){
		var Self = this;
		if (!Self.appended) {
			Self.appended = 1;
			UI.append(Self._body,document.body);
		}
		if (UI.isString(txt)) {
			Self._body.innerHTML = txt;
			UI.show(Self._body);
			Self.position(target);
		}
		else {
			txt.call(target,Self._body);
		}
	},
	position : function(target){
		var _body = this._body,
			targetX = UI.getX(target),
			targetY = UI.getY(target),
			targetHeight = UI.height(target),
			_bodyHeight,
			scrollY = UI.scrollY(),
			scrollHack = UI.scrollY(target) - scrollY * (UI.B.safari && !UI.B.ipad ? 2 : 1);
		_body.style.cssText += ';top:' + ( targetY + targetHeight - scrollHack + 5 ) + 'px;left:' + ( targetX - 20 ) + 'px';
		_bodyHeight = UI.height(_body);
		if (_bodyHeight + UI.getY(_body) > scrollY + UI.windowHeight()) {
			_body.style.top = targetY - _bodyHeight - 5 - scrollHack + 'px';
		}
	},
	hide : function(){
		UI.hide(this._body);
		this._body.style.left = '-999px';
	}
}
MI.Tips.txt = [_('这条消息来自手机微博。') + _('<br>想要成为微博手机达人？') + _('点') + '<a href="http://t.qq.com/client.php?t=mobile" onclick="MI.Bos(\'btnPhoneIconTip\')" target="_blank" class="ulink">' + _('这里') + '</a>'];
MI.Tips.url = {};
MI.Load = function(id,url,type,boss){
	var _fold=_('收起'),
		_unfold=_('展开'),
		_loading='loading',
		_folded='fold',
		isRefresh,
		r = MI.random(),
		Time,Time_1,Time_2,Time_3;
	if (UI.isArray(id) && id.length) {
		UI.each(id,function(o){
			var el = $(o),P = el.parentNode,btn = $$(P,'h3 .btn')[0] || UI.DC('a');
			//UI.addClass(btn,_loading);
		});
		Time = + new Date();
		MI.ajax({
			url : url,
			type : 'get',
			data : 't=' + type.join(',') + '&r=' + r,
			success : function(data){
				Time_1 = + new Date() - Time;
				data = MI.json(data);
				if (data.result == 0){
					UI.each(id,function(o,i){
						var info = data.info[type[i]];
						if (info) {
							try{
								loaded(o,info);
							}catch(e){}
						}
					});
					MI.Load.bottom();
				}
				UI.each(id,function(o){
					var el = $(o),P = el.parentNode,btn = $$(P,'h3 .btn')[0];
					UI.removeClass(btn,_loading);
				});
	
				//Speed
				Time_2 = + new Date() - Time;
				setTimeout(function(){
					Time_3 = + new Date() - Time;
					MI.Speed('t_asyn_sidebar',0.1,Time_1,Time_2,Time_3);
				},0);
			}
		});
		return;
	}
	var el = $(id),P = el.parentNode,btn = $$(P,'h3 .btn')[0] || UI.DC('a'),folded = UI.hasClass(P,_folded);
	btn.title = folded ? _fold : _unfold;
	if (UI.A(el,'refresh')) {
		isRefresh = 1;
		MI.Bos('btnRefresh' + type);
	}
	if (UI.hasClass(btn,_loading)) {
		return;
	}
	else if (el.innerHTML == '' || isRefresh) {
		if (!isRefresh){
			UI.addClass(btn,_loading);
		}
		Time = + new Date();
		MI.ajax({
			url : url,
			type : 'get',
			data : 't=' + type + '&r=' + r,
			success : function(data){
				Time_1 = + new Date() - Time;
				data = MI.json(data);
				if (data.result == 0){
					loaded(id,data.info[type]);
					MI.Load.bottom();
				}
				UI.removeClass(btn,_loading);
				UI.A(el,'refresh','')
	
				//Speed
				Time_2 = + new Date() - Time;
				setTimeout(function(){
					Time_3 = + new Date() - Time;
					MI.Speed('t_asyn_sidebar',0.1,Time_1,Time_2,Time_3);
				},0);
			}
		});
	}
	else {
		UI.toggleClass(P,_folded);
	}
	MI.Load.bottom();
	try{
		btn.blur();
	}catch(e){}
	if (!isRefresh && MI.Load.id[type]) {
		//MI.S('option_' + type + '_' + MI.user.account,folded ?  1 : -1);
		MI.ajax({
			url : MI.url.userBit,
			data : {
				t : MI.Load.id[type],
				v : folded ?  0 : 1,
				r : MI.random()
			}
		});
		if (boss != 0) {
			MI.Bos('btn' + (folded ? 'Un' : '') + 'Fold' + type);
		}
	}

	//Loaded Success
	function loaded(id,html){
		var el = $(id),P = el.parentNode,btn = $$(P,'h3 .btn')[0] || UI.DC('a'),folded = UI.hasClass(P,_folded);
		if (el.innerHTML == '' || isRefresh) {
			el.innerHTML = html;
		}
		UI.removeClass(P,_folded);
		btn.title = _fold;
		UI.evalScript(html); //Eval Javascript
		UI.removeClass(btn,_loading);
		MI.app({
			Base : function(){
				/*if(id == 'star') {
					MI.Card.build(el,'.imgList img',3);
					MI.Card.build(el,'.imgList .imgListName',2);
				}*/
				if(id == 'recommend' || id == 'star') {
					MI.Card.build(el,'.userPic img',3);
					MI.Card.build(el,'.knownInfo .BossHref,.kRelaBox a',2);
				}
			}
		});
	}
}
MI.Load.id = { //展开收起的状态标志位
	star : 36,
	topic : 37,
	tags : 38,
	recommend : 39,
	activity : 104,
	brand : 105
}
MI.Load.bottom = function(){
	setTimeout(function(){
		var className = 'pageNav';
		if (MI.talkList) {
			MI.talkList.bottom();
		}
		if ($(className)) {
			MI.bottom(className);
		}
		if ($(className + 'Wrap')) {
			MI.bottom(className + 'Wrap');
		}
		if (window.MIApp){ //微博App
			MI.App.autoHeight();
		}
	},0);
}
/**
 * 发表框
 * @namespace MI.TalkBox 发表框
 * @constructor
 * @param {String} String 发表框ID（或DOM对象）
 *            @example
 *            MI.talkBox = new MI.TalkBox('talkBox');
 */
MI.TalkBox = function(id){ //Talk Box
	this._body = UI.isString(id) ? $(id) : id;
	if (this._body) {
		var Self = this;

		//DOM
		//console.time('talkBox');
		Self._txt = Self.$('textarea') || Self.$('.inputTxt');
		Self._tip = Self.$('.countTxt');
		Self._guide = Self.$('h2 em');
		Self._tipBig = Self.$('.talkSuc');
		Self._btn = Self.$('.sendBtn');
		Self._topic = Self.$('.creatNew');
		Self._topicNewYear = Self.$('.atWen');
		Self._at = Self.$('.atSome');
		Self._face = Self.$('.insertFace .txt,a.ico_face');
		Self._mood = Self.$('.newFeel .txt');
		Self._vote = Self.$('.newVote .txt');
		Self._video = Self.$('.uploadVideo');
		Self._videoAnchor = $$(Self._video,'.txt')[0];
		Self._music = Self.$('.uploadMusic');
		Self._musicAnchor = $$(Self._music,'.txt')[0];
		Self._pic = Self.$('.uploadPic');
		Self._multiPic = Self.$('.uploadPics') || UI.DC('b');
		Self._picForm = Self.$('.picForm');
		Self._picBtn = Self.$('.picForm input');
		Self._close = Self.$('.close');
		Self._num = [$('talkNum')];
		Self._addReply = Self.$('.addReply');
		Self._addComt = Self.$('.addComt');
		Self._comts = Self.$('.comts'),
		Self._autoBackspace = Self.$('.autoBackspace');

		if (Self._guide) {
			Self.guide = Self._guide.innerHTML;
		}

		UI.ready(function(){
			setTimeout(function(){
				Self._txt.blur();
				Self.countTxt();

				//Fix IE6's Bug
				//UI.hide(UI.prev(Self._txt));
				//UI.show(UI.prev(Self._txt));
			},0);

			//Talk Text
			/*Self._txt.onkeydown = function(e){
				if (!Self.sending) {
					Self.countTxt();
				}
			};*/
			var countTxt = function(e){
				if (!Self.sending) {
					Self.countTxt();
					//showGuide();
				}
			},
			countTxtDelay = function(e){
				var type;
				if (!Self.startTime && e){
					type = UI.E(e).type;
					if (type == 'input' || type == 'paste' || type == 'cut' || type.hasString('key')){
						Self.startTime = + new Date();
						MI.ajax({
							url : MI.url.notice,
							type : 'get',
							data : 'op=1'
						});
					}
				}
				clearTimeout(Self.delay.count);
				Self.delay.count = setTimeout(countTxt,75);
			};
			/*
			function guide(name){
				return _('对{0}说：',' ' + name + ' ');
			}
			function showGuide(){
				return;
				clearTimeout(Self.delay.guide);
				Self.delay.guide = setTimeout(function(){
					if (Self._guide) { //智能引导提示 【对 xhlv 说：】
						var content = Self._txt.value,account = UI.trim(content).match(/^@[a-zA-Z]{1}[\w|-]{0,19}(?![\w-])/g),nick,users = MI['follow_' + MI.user.account];
						if (account && account[0].length != content.length) {
							account = account[0].slice(1);
							if (UI.A(Self._guide,'user') != account) {
								if (users) { //从@联想中获取姓名
									nick = users.info[account];
								}
								if (nick) {
									Self._guide.innerHTML = guide(nick);
								}
								else { //异步拉取姓名
									UI.get('/asyn/userCard.php','u=' + account + '&r=' + MI.random(),function(data){
										//data = "{result:0,msg:'',info:{nick:'xhlv'}}";
										data = MI.json(data);
										if (data.result == 0 && data.info.nick) {
											Self._guide.innerHTML = guide(data.info.nick);
										}
										else { //拉取失败或帐号不存在，直接当普通广播处理
											Self.guideReset();
										}
									});
								}
								UI.A(Self._guide,'user',account);
							}
						}
						else {
							Self.guideReset();
						}
					}
				},200);
			}
			*/
			UI.EA(Self._txt,'keypress',countTxtDelay);
			UI.EA(Self._txt,'input',countTxtDelay);
			UI.EA(Self._txt,'paste',countTxtDelay);
			UI.EA(Self._txt,'cut',countTxtDelay);
			Self._txt.onbeforeeditfocus = countTxtDelay;
			Self._body.onkeydown = function(e){
				if (!Self.sending) {
					var E = UI.E(e);
					if (E.ctrl && E.key == 13) { //Alt+S : E.alt && E.key == 83
						//E.prevent();
						Self.sending = 1; //Don't Count And Send When 'sending == true'
						countTxtDelay();
						Self.send();
						MI.Bos('btnCtrlEnter');
					}
					else if (Self._pic && MI.Capture && MI.Capture.uploader && E.key == 86 && E.ctrl){
						MI.Capture.upload();
					}
				}
			};
			Self._body.onkeyup = function(){
				if (!Self.sending) {
					countTxtDelay();
				}
			};
			Self._txt.onfocus = function(){
				//UI.hide(UI.prev(this));
				UI.addClass(this,'focus');
				this.focused = 1;
				//showGuide();
			};
			Self._txt.onblur = function(){
				var el = this;
				clearTimeout(Self.delay.blur);
				Self.delay.blur = setTimeout(function(){
					UI.removeClass(el,'focus');
					if (!Self.sending) {
						Self.countTxt();
					}
				},0);
				/*if (Self._txt.value == 0) {
					UI.show(UI.prev(this));
				}*/
				this.focused = 0;
			};

			//Auto Complete
			if (!UI.hasClass(Self._txt,'noAutoCmt')) {
				setTimeout(function(){
					MI.app({
						Base : function(){
								Self.autoCmt = new MI.AutoCmt({
									target : Self._txt,
									key : 1,
									topic : 1,
									face : 1,
									call : function(){
										countTxtDelay();
									}
								});
						}
					});
				},50);
			}

			//New Topic
			if (Self._topic) {
				Self._topic.onclick = function(){
					Self.addTopic();
					MI.Bos('btnTopic');
					return false;
				}
				/*MI.app({
					Base : function(){
						if (MI.isS) {
							Self._topicWrap = UI.html('<div class="mytopicWrap" style="display:none"></div>')[0];
							UI.after(Self._topicWrap,Self._topic);
							Self._topicWrap.onclick = function(e){
								var E = UI.E(e),
									target = E.target;
								if (target.nodeName == 'A'){
									Self.addTopic('#' + target.innerHTML + '# ');
								}
								return false;
							}
							Self._topicWrap.onmouseover = Self._topic.onmouseover = function(){
								clearTimeout(Self.delay.topic);
								Self.delay.topic = setTimeout(function(){
									Self.showTopic();
								},200);
							}
							Self._topicWrap.onmouseout = Self._topic.onmouseout = function(){
								clearTimeout(Self.delay.topic);
								Self.delay.topic = setTimeout(function(){
									Self.hideTopic();
								},200);
							}
						}
					}
				});*/
			}

			//New Year Topic
			if (Self._topicNewYear){
				Self._topicNewYear.onclick = function(){
					var word = '',
						user = UI.A(this,'user'),
						topic = '#' + (UI.A(this,'topic') || _('微博拜年')) + '#',
						txt = Self._txt.value;
					if (!txt.hasString(topic)){
						word += topic;
					}
					if (txt.slice(MI.cursorX(Self._txt) - 1) != '@' && !user){
						word += '@';
					}
					if (user && !txt.hasString(user)){
						word += '@' + user + ' ';
					}
					if (word){
						Self.addTopic(word);
					}
					else {
						MI.focus(Self._txt);
					}
					MI.Bos('btnTopicNewYear');
					return false;
				}
			}
			
			//At
			if (Self._at){
				Self._at.onclick = function(e){
					var T = this;
					Self.hideMedia();
					setTimeout(function(){
						if (Self.autoCmt) {
							Self.autoCmt.showAll(T);
						}
					},0);
					MI.Bos('btnAt');
					return false;
				}
			}
			
			//Insert Face
			if (Self._face) {
				Self._face.onclick = function(){
					Self.hideMedia();
					if (MI.Base){
						Self.addFace();
					}
					MI.Bos('btnFace',(Self.type || 1) + '');
					return false;
				}
			}

			// Add Mood
			if (Self._mood) {
				Self._mood.onclick = function() {
					var sign = UI.A(this, 'sign') * 1;
					MI.app({
						Mood : function(){
							MI.Mood.floatBox.show(sign);
						}
					});
					MI.Bos(sign
							? 'btnMoodTalkBoxLook'
							: 'btnMoodTalkBoxWrite');
					return false;
				}
			}
			
			// Add Vote
			if (Self._vote){
				Self._vote.onclick = function(){
					Self.hideMedia();
					if (MI.Base){
						Self.addVote();
					}
					MI.Bos('btnVote');
					return false;
				}
			}
			
			//Add QQ Music
			if (Self._music) {
				Self._musicAnchor.onclick = function(){
					Self.hideMedia();
					Self.removeSrcpic();
					if(!MI.Music){
						//UI.addClass(html , 'loading');
						//UI.show(html);
						//alert(MI.version.Music)
						MI.app({Music:function(){
							//UI.removeClass(html , 'loading');
							if(MI.Music){
								MI.Music.build(Self);
								MI.Music.show();
							}
						}});
					}else{
						if (!MI.Music.builded){
							MI.Music.build(Self);
						}
						MI.Music.show();
					}
					MI.Bos('btnMusic');
					return false;
				}
				

				Self.musicMoreBtn = {
					body : UI.html('<div class="cutBox" style="display:none;">\
						<p style="display:' + (UI.B.ipad ? 'none':'') + '"><span class="ico_record"></span><a class="txt mRecord" href="#" title="' + _('可以通过麦克风录下声音') +'">' +_('录音') + '</a></p>\
						<p style="display:' + (UI.B.ipad ? 'none':'none') + '"><span class="ico_upAudio"></span><a class="txt mUpload" href="#" title="' + _('自己上传音频') +'">' +_('上传') + '</a></p></div>')[0],
					recordHtml:'<div class="recordWrap"></div>',
					recordFlash:'<a class="close" href="#"></a><object width="270" height="150" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="flashTest" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param value="http://mat1.gtimg.com/www/mb/swf/MusicRecord/Main.swf" name="movie"><param value="high" name="quality"><param value="#FFFFFF" name="bgcolor"><param name="wmode" value="transparent" /><param value="always" name="allowScriptAccess"><param value="all" name="allowNetworking"><embed width="270" height="150" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent" allownetworking="all" allowscriptaccess="always" loop="false" play="true" name="flashTest" bgcolor="#FFFFFF" quality="high" src="http://mat1.gtimg.com/www/mb/swf/MusicRecord/Main_110706.swf"></object>',
					recordBtn:null,
					recordBody:null,
					showAble:true,
					close:null,
					target:null,
					build:function(el){
						var Self = this;
						Self.target = el;
						UI.append(Self.body,el);
						Self.recordBtn = $$(Self.body,'.mRecord')[0];
						Self.recordBtn.onclick = function(){
							Self.showRecord();
							return false;
						};
						Self.musicUploadBtn = $$(Self.body,'.mUpload')[0];
						//灰度测试名单
						if ('xhlv,clarass,crazytest,ericcao,localhost-8080,weiwei,reneecheng76,weibofisher,assassin,hshmoxing,danger,kwang,gavikzhang,clarence,hobo,onlyavivi,s050097,baby5464,minfree,yu792008'.hasString(MI.user.account)){
							UI.show(Self.musicUploadBtn.parentNode);
						}
						Self.musicUploadBtn.onclick = function(){
							openUploadWindow(MI.url.uploadMusic);
							return false;
						};
						Self.body.onmouseout = function(){
							Self.hide();
						};
						Self.body.onmouseover = function(){
							clearTimeout(Self.delay);
						};
					},
					showRecord:function(){
						var Self = this;
						MI.talkBox.hideMedia();
						if(!Self.recordBody) {
							Self.recordBody = UI.html(Self.recordHtml)[0];
							UI.append(Self.recordBody,Self.target);
						}	
						Self.recordBody.innerHTML = Self.recordFlash;	
						Self.close = $$(Self.recordBody,'.close')[0];
						Self.close.onclick = function(){
							UI.hide(Self.recordBody);
							return false;
						}
						UI.show(Self.recordBody);
						MI.Bos('btnMusicRecord');
						//if(MI.Music && MI.Music.builded) MI.Music.hide();
						return false;
					},
					hideRecord:function(){
						var Self = this;
						if(Self.recordBody) {
							UI.hide(Self.recordBody);
							Self.recordBody.innerHTML = '';
						}
					},
					show:function(){
						var Self = this;
						if(Self.showAble) UI.show(Self.body);
					},
					hide:function(){
						var Self = this;
						Self.delay = setTimeout(function(){
							UI.hide(Self.body);
						},100);	
					}
				};

				if(!UI.B.ipad){
					Self.musicMoreBtn.build(Self._music);
					Self._musicAnchor.onmouseover = function(){
							clearTimeout(Self.musicMoreBtn.delay);
							Self.musicMoreBtn.show();
					}
					Self._musicAnchor.onmouseout = function(){
						Self.musicMoreBtn.hide();
					}
				}

				window.getMicRecUploadResult = function($result, $url, $shortUrl){  //录音回调
					if($result ==0) {
						var _moreBox = Self.musicMoreBtn;
						_moreBox.hideRecord();
						UI.A(_moreBox.recordBtn,'music','0,' + $url + ',' + MI.user.account + ',' + _('录音'));
						if (!MI.Music.builded){
							MI.Music.build(Self);
						}
						MI.Music.addPreview(_moreBox.recordBtn,'',true);
						Self.music.songtype = 3;
						Self.music.shorturl = $shortUrl;
						Self.txtMusic = _('我刚刚发布了一条#语音微博#，快来听听我说了什么吧。')  + ' http://url.cn/'  + $shortUrl + ' ';
						if(Self._txt.value != Self.txtMusic){
							Self._txt.value += Self.txtMusic;
						}else{
							Self._txt.value = Self.txtMusic;
						}
						Self.countTxt();
						Self.focus();
					}	
						//851300,http://stream2.qqmusic.qq.com/12851300.wma,井柏然,情歌变得不好
				}
			

				/*UI.EA(document.body,'keydown',function(e){
					var E = UI.E(e);
					if(E.key == 27 && MI.Music){
						MI.Music.hide();
					}
				},true);*/
			}
			//Add Video //qq video,tudou//youku,56
			if (Self._video) {
				/* URL : /asyn/validvideo.php		Size : 160 460 2000
					{
						result : 0,
						url : '',
						title : ''
					}
				*/
				Self._errMsg = [_('请先登录再进行操作'),_('稍等一下，喝杯茶，转贴的视频正在来的路上'),_('转贴的视频丢在路上了，再试一次？'),_('暂不支持该视频地址，') + '<a href="#" class="vNormalBtn">' + _('作为普通链接显示') + '</a>'];

				var html = UI.html('<div class="vloadWrap" style="display:none"><form name="videoUploadFrom" id="videoUploadFrom" class="videoUploadFrom" method="get"><a href="#" class="close" title="' + _('关闭') + '">' + _('关闭') + '</a><p>' + _('粘帖视频播放页地址') + '<br><span class="cNote">(' + _('腾讯视频、优酷、土豆、凤凰视频、56等网站视频可直接播放') + ')</span></p><p class="clear"><input type="text" class="inputTxt" /><input type="submit" class="btn" value="' + _('确定') + '" /></p></form><p class="cError" style="display:none">'+Self._errMsg[3]+'</p>' +  '<p><a href="#" class="ulink">' + _('我要自己上传视频') + '<em class="ffsong">&gt;&gt;</em></a></p></div>')[0];

				UI.append(html,Self._video);

				Self._videoClose = $$(Self._video,'.close')[0];
				Self._videoBox = $$(Self._video,'.vloadWrap')[0];
				Self._videoForm = $$(Self._video,'.videoUploadFrom')[0];
				Self._videoTxt = $$(Self._video,'.inputTxt')[0];
				Self._videoBtn = $$(Self._video,'.btn')[0];
				Self._videoError = $$(Self._video,'.cError')[0];
				Self._videoNormalBtn = $$(Self._video,'.vNormalBtn')[0];
				Self._videoUpload = Self._videoBox.lastChild;
				if(Self._videoClose){
					Self._videoClose.onclick = function(){
						UI.hide(Self._videoBox);
						clearTimeout(Self.delayVideoTime);
						return false;
					}
				}
				Self._videoForm.onsubmit = function(){
					if(!UI.trim(Self._videoTxt.value)){
						Self._videoTxt.focus();
						return false;
					}
					Self.getVideo(UI.trim(Self._videoTxt.value));
					this.disabled = true;
					return false;
				}
				Self._videoNormalBtn.onclick = function(){
					if(UI.trim(Self._videoTxt.value)){
						Self._txt.value += UI.trim(Self._videoTxt.value);
						clearTimeout(Self.delayVideoTime);
						UI.hide(Self._videoBox);
					}
					return false;
				}
				Self._videoAnchor.onclick = function(){
					//UI.hide(Self._musicBox);
					Self.hideMedia();
					if(MI.Music){
						if (!MI.Music.builded){
							MI.Music.build(Self);
						}
					}
					Self.removeSrcpic();//关闭粘贴图片链接弹层
					UI.hide(Self._videoError);
					UI.show(Self._videoBox);
					if(UI.trim(Self._videoTxt.value)){
						Self._videoTxt.select();
					}else{
						Self._videoTxt.focus();
					}
					MI.Bos('btnVideo');
					return false;
				}
				Self._videoBtn.onclick = function(){
					if(!UI.trim(Self._videoTxt.value)){
						Self._videoTxt.focus();
						return;
					}
					Self.getVideo(UI.trim(Self._videoTxt.value));
					this.disabled = true;
					return false;
				}
				Self._videoUpload.onclick = function(){
					openUploadWindow(MI.url.uploadVideo);
					MI.Bos('btnVideoUpload');
					return false;
				}
			}
			function openUploadWindow(upUrl){
				UI.hide(Self._videoBox);
				var width = 594,
					height = 320,
					top = (window.screen.availHeight - 30 - height)/2,
					left = (window.screen.availWidth - 10 - width)/2; 
				if(Self.data && Self.data.wqid)
				{
					upUrl = upUrl + "?qid=" + Self.data.wqid + "&zone=" + Self.data.cflag;
				}
				window.open(upUrl,'wbVideo','height=' + height + ',width=' + width + ',top=' + top + ',left=' + left + ',scrollbars=yes,resizable=yes');
			}

			//Add Photo
			if (Self._pic) {
				/* URL : /asyn/uploadpic.php		Size : 160 460 2000
					{
						result : 0,
						msg : '',
						info : {
							image : 'http://url.cn/a32j98'
						}
					}
				*/
				var imageUploadName = 'imageUpload_' + MI.random(),
					html = UI.html('<div class="cutBox" style="display:none;">\
						<p style="display:' + (UI.B.ipad ? 'none':'')   +  '"><span class="ico_pics"></span><a href="#" class="multi txt mOut" title="' + _('支持多张图片拼接') + '">' + _('多图') + '</a></p>\
						<p style="display:none;"><span class="ico_cut"></span><a href="#" class="txt mOut" title="'+_("支持粘贴QQ截屏等剪贴板内容") +'">'+_("截屏") +'</a></p>\
						<p><span class="ico_pUrl"></span><a href="#" class="txt mOut" title="'+_("粘贴图片链接")+'">'+ _("链接") +'</a></p>\
						<p style="display:"><span class="ico_wpic"></span><a href="#" class="text2pic txt mOut" title="' + _('文字转图片') + '">' + _('文图') + '</a></p></div>\
						<span class="pidLoad" style="display:none">' + _("上传中") + ' <a href="#" class="cancel">[' + _("取消") + ']</a></span>\
						<span style="display:none" class="preview"><span class="link"></span><a href="#" class="del">[' + _("删除") + ']</a></span>\
						<iframe id="' + imageUploadName + '" name="' + imageUploadName + '" src="about:blank" style="display:none"></iframe>'),

					copyPicHTML = UI.html('<div class="vloadWrap" style="display:none"><a href="#" class="close" title="' + _('关闭') + '">' + _('关闭') + '</a><p>' + _('粘帖图片地址') + '<span class="cNote">(' + _('可在广播中直接显示图片') + ')</span></p><form name="sourcepicFrom" class="sourcepicFrom" method="get"><p class="clear"><input type="text" class="inputTxt" /><input type="submit" class="btn" value="' + _('确定') + '" /></p><p class="cError" style="display:none"></p></form></div>'),

					cppyfrag = document.createDocumentFragment(),
					frag = document.createDocumentFragment(),
					action = MI.url.uploadPic;
				UI.each(html,function(o){
					UI.append(o,frag);
				});
				UI.each(copyPicHTML,function(o){
					UI.append(o,cppyfrag);
				});
				UI.append(cppyfrag,Self._pic);

				if (MI.user.fun.turnPic) {
					UI.append(MI.PicTurn.build(Self), frag);
					action = MI.PicTurn.url + action;
				}
				UI.append(frag,Self._pic);

				Self._picForm.reset();
				UI.A(Self._picForm,'action',action);
				UI.A(Self._picForm,'target',imageUploadName);

				Self._iframe = $(imageUploadName);
				Self._picIco = $$(Self._pic,'.ico_pic')[0];
				Self._picTxt = $$(Self._pic,'.txt')[0];
				Self._picCapture = $$(Self._pic,'.cutBox')[0];
				Self._picLoading = $$(Self._pic,'.pidLoad')[0];
				Self._picPreview = $$(Self._pic,'.preview')[0];
				Self._picLink = $$(Self._pic,'.link')[0];
				Self._picDel = $$(Self._pic,'.del')[0];
				Self._picCancel = $$(Self._pic,'.cancel')[0];

				Self._picInsertBox = $$(Self._pic,".cutBox")[0];//图片下拉菜单盒子
				Self._picCapture = $$(Self._picInsertBox, "p")[1];//图片截屏项
				Self._sourcepicUrl = $$(Self._picInsertBox,"p")[2];//图片粘贴项
				Self._sourcepicAnchor = $$(Self._sourcepicUrl,'.txt')[0];
				Self._sourcepicBox = $$(Self._pic,'.vloadWrap')[0];//图片粘贴浮动层
				Self._sourcepicClose = $$(Self._sourcepicBox, ".close")[0];
				Self._sourcepicTxt = $$(Self._sourcepicBox, ".inputTxt")[0];
				Self._sourcepicBtn = $$(Self._sourcepicBox, ".btn")[0];
				Self._sourceError = $$(Self._sourcepicBox, ".cError")[0];
				Self._sourcepicFrom = $$(Self._sourcepicBox, ".sourcepicFrom")[0];
				
				
				Self._multi = $$(Self._pic,'.multi')[0];  //悬浮出现多图
                Self._text2Pic = $$(Self._pic,'.text2pic')[0];  //长文字

                Self._text2Pic.onclick = function(){
                    MI.app({
						Base:function(){
							MI.Text2Pic.build('http://t.qq.com/asyn/updateGrabPic.php');
						}	
					});
					MI.Bos('btnText2Pic');
                    return false;
                }

				Self._multiPic.onclick = Self._multi.onclick = function(){
					MI.app({
						Base:function(){
							MI.PhotoMultiUpload.build('http://t.qq.com/asyn/updateGrabPic.php');
						}	
					});
					MI.Bos('btnPhotoMulti');
					return false;
				}

				Self._text2Pic.onmouseover = Self._multi.onmouseover = function(e){
					clearTimeout(Self.delay.picBtn);
					UI.E(e).stop();
				}
				
				Self._sourcepicFrom.reset();

				var picNav = function(){
					UI.addClass(this,'hover');
					clearTimeout(Self.delay.picBtn);
					UI.show(Self._picInsertBox);
					if (!Self.pic && UI.C(Self._picLoading,'display') == 'none' && MI.TalkBox.captureEnable()){
						UI.show(Self._picCapture);
						var txt = $$(Self._picCapture,'.txt')[0];
						if (!UI.A(txt,'Event')){
							if (MI.Capture && MI.Capture.enable){
								txt.onclick = function(){
									MI.Capture.screen.DoCapture();
									return false;
								}
							}
							else {
								txt.onclick = function(){
									MI.confirm({
										title : _('你还未安装腾讯微博截屏插件'),
										content : _('安装后，你就可以使用截屏功能'),
										confirmTxt : _('安装'),
										confirm : function(){
											MI.Capture.install();
										}
									});
									return false;
								}
							}
							UI.A(txt,'Event',1)
						}
					}
				}

				Self._pic.onmouseover = picNav;
				Self.picNav = picNav;

				Self.removeSrcpic = function(){
					Self._pic.onmouseover = (Self._picPreview.style.display == 'none') ? picNav : null ;
					UI.hide(Self._sourcepicBox);
				}

				Self._pic.onmouseout = function(){
					UI.removeClass(this,'hover');
					Self.delay.picBtn = setTimeout(function(){
						UI.hide(Self._picInsertBox)
					},10);
				}
				Self._picTxt.onmouseover = function(j){
					UI.removeClass(this, "mOut");
					UI.E(j).stop();
				}
				Self._picCapture.onmouseover = function(e){
					UI.removeClass(this.lastChild, "mOut");
					UI.addClass(Self._sourcepicAnchor, "mOut");
					UI.addClass(Self._picTxt, "mOut");
					clearTimeout(Self.delay.picBtn);
					UI.E(e).stop();
				}
				Self._picCapture.onmouseout = function(){
					UI.addClass(this.lastChild, "mOut");
					UI.addClass(Self._sourcepicAnchor, "mOut");
					UI.removeClass(Self._picTxt, "mOut");
				}
				Self._picForm.onsubmit = function(){
					if (!Self._picBtn.value) {
						return false;
					}
				}

				var picChange = function(){ //Upload
					var fileName = this.value,
						fileType = fileName.substring(fileName.lastIndexOf('.') + 1,fileName.length).toLowerCase();
					if (!'jpg,jpeg,gif,png'.hasString(fileType)) {
						MI.alert(_('仅支持jpg、jpeg、gif、png图片文件'));
						return false;
					}
					UI.hide(Self._picInsertBox);
					UI.hide(Self._sourcepicBox);
					Self._video && UI.hide(Self._videoBox);
					Self._music && MI.Music && Self._musicBox && MI.Music.hide();
					Self.uploadPic();
					Self.PicUpTime = + new Date(); //图片上传时间
					Self._picForm.submit();
					MI.Bos('btnPic');
				}
				
				Self.picChange = picChange;
				Self._picBtn.onchange = Self.picChange; 

				if (UI.hasClass(document.body,'ipad')){ //Disable Upload
					Self._pic.onclick = function(){
						alert(_('对不起，由于您的浏览器安全限制不支持图片上传，建议您使用QQ浏览器。'));
						MI.Bos('btnPicDisable');
						return false;
					}
					UI.hide(Self._picForm);
				}
				Self._sourcepicUrl.onmouseover = function(j){
					UI.removeClass(this.lastChild, "mOut");
					UI.addClass(Self._picTxt, "mOut");
					clearTimeout(Self.delay.picBtn);
					UI.E(j).stop();
				}
				Self._sourcepicUrl.onmouseout = function(){
					UI.removeClass(Self._picTxt, "mOut");
					UI.addClass(this.lastChild, "mOut");
				}
				Self._sourcepicUrl.onclick = function(){
					UI.hide(Self._sourceError);
					Self._pic.onmouseover = null;
					Self._sourcepicTxt.value = '';
					Self._sourceError.innerHTML = '';
					Self._sourcepicBtn.disabled = false;
					UI.show(Self._sourcepicBox);
					Self._sourcepicTxt.focus();
					return false;
				}
				if (Self._sourcepicClose) Self._sourcepicClose.onclick = function(){
					Self.removeSrcpic();
					return false
				};
				Self._sourcepicBtn.onclick = Self._sourcepicFrom.onsubmit  = function(){
					var  IsURL = function(strUrl){
							var strRegex = new RegExp('((news|telnet|nttp|file|http|ftp|https)://){1}(([-A-Za-z0-9]+(\\.[-A-Za-z0-9]+)*(\\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\\.[0-9]{1,3}){3}))(:[0-9]*)?(/[-A-Za-z0-9_\\$\\.\\+\\!\\*\\(\\),;:@&=\\?/~\\#\\%]*)*','gi');
							if (strRegex.test(strUrl)){
								return true; 
							}else{ 
								return false; 
							}
					}
					var srcPicErr = [_('你输入的图片链接已提交，请等待'), _('图片地址不能为空，请在输入框粘贴或输入') ,_('你输入的图片地址不是正确的URL格式，请重新输入')];
					Self._sourcepicValue = UI.trim(Self._sourcepicTxt.value);
					if(IsURL(Self._sourcepicValue)){
						Self._sourcepicBtn.disabled = true;
						Self._sourceError.innerHTML = srcPicErr[0];
						UI.show(Self._sourceError);
						MI.ajax({
							url : MI.url.uploadUrlPic,
							type : 'get',
							data : "sourcepic=" + encodeURIComponent(Self._sourcepicValue)+'&r='+MI.random(),
							success : function(data){
								data =  MI.json(data);
								if (data.result == 0 && data.info){
									Self.addPic({result:0,msg:'上传成功','info':{'image':data.info.image,'fileName':_('链接.jpg')}});
									Self._sourceError.innerHTML = data.msg;
									setTimeout(function(){
										UI.hide(Self._sourcepicBox);	
									},200);								
								}else{
									Self._sourcepicBtn.disabled = false;
									Self._sourceError.innerHTML = data.msg;								
								}								
							}
						});
						MI.Bos('btnSourcePic');
					}else{
						Self._sourcepicTxt.focus();
						Self._sourceError.innerHTML = (Self._sourcepicValue == '' || Self._sourcepicValue == null ) ?   srcPicErr[1] :  srcPicErr[2];
						UI.show(Self._sourceError);
						MI.Bos('btnSourcePic');
					}
					return false;
				}
				Self._picDel.onclick = function(){ //Delete
					Self.delPic();
					Self._pic.onmouseover = picNav;
					MI.Bos('btnPicDel');
					return false;
				}
				Self._picCancel.onclick = function(){ //Cancel
					Self.cancelPic();
					Self._pic.onmouseover = picNav;
					MI.Bos('btnPicCancel');
					return false;
				}
			}
			//Add Reply
			if (Self._addReply) {
				Self._addReply.onclick = function(e){
					var E = UI.E(e);
					if (E.target.nodeName == 'A'){
						UI.hide(this);
						var length = Self._txt.value.length;
						Self._txt.value = Self._txt.value.replace(this.txt,'');
						Self.countTxt();
						Self._txt.focus();
						MI.selectTxt(Self._txt,length,length,length);
						MI.Bos('btnAddReply');
					}
					return false;
				}
			}
			//Add Comment
			if (Self._addComt) {
				Self._addComt.onclick = function(){
					Self._txt.focus();
					return false;
				}
			}

			if (Self._autoBackspace) {
				Self._autoBackspace.onclick = function(){
					var val = Self._txt.value;
					var length = Self._txt.value.length;
					var txtMax = MI.TalkBox.prototype.txtMax;
					var valArr = val.split('||');
					if(MI.string.length(valArr[0]) >= txtMax){
						Self._txt.value = valArr[0];
						MI.selectTxt(Self._txt,length,length,length);
					}else{
						while(MI.string.length(valArr.join('||')) > txtMax*2-20) {
							valArr.pop();
						}
						Self._txt.value = valArr.join('||');
						MI.selectTxt(Self._txt,0,0,0);
					}
					Self.countTxt();
					UI.hide(Self._autoBackspace);
					Self._txt.focus();
					MI.Bos('btnAutoBackspace');
					return false;
				}
			}

			//Submit Button
			//Self._btn.onfocus = MI.blur;
			Self._btn.onclick = function(){
				if (UI.hasClass(this,'btnNoStr')) {
					return;
				}
				/*if (Self._btn.disable) {
					//Self.showTip(Self.txtTip.empty,true);
					return;
				}*/
				Self.countTxt();
				Self.send();
				if(Self._pic) Self._pic.onmouseover = picNav;
				switch (Self.type) {
					case null:	
						if(Self.boxType == 'recom') {
							MI.Bos('btnSendRecom');
						}
						MI.Bos('btnSend','',0.01);
						break;
					case 1:
						if(Self.boxType == 'trans'){
							MI.Bos('btnSendTrans');
						}
						else {
							MI.Bos('btnSendReply','',0.01);
						}	
						break;
					case 2:
						MI.Bos('btnSendRelay');
						break;
					case 3:
						MI.Bos('btnSendMsg');
						break;
					case 4:
						MI.Bos('btnSendRelayList');
						break;
					case 5:
						MI.Bos('btnSendComt');
						break;
					case 6:
						MI.Bos('btnSendNotepad');
						break;
				}
			};
			if (Self._close) {
				Self._close.onclick = function(){
					if (UI.B.ie) { //Kill ":hover" Bug In IE
						UI.C(Self._close,'right','9999px');
					}
					setTimeout(function(){
						Self.hide();
						UI.C(Self._close,'right','');
					},0);
					MI.Bos('btnClose');
					return false;
				}
			}
		});
		//console.timeEnd('talkBox');

		//截屏
		if (MI.TalkBox.captureEnable()){
			setTimeout(function(){
				MI.app({Capture:null});
			},0);
		}
		
		Self.iconPic = MI.user.fun.iconPic;
	}
}
/**
 * MI.TalkBox.showBox 显示一个浮层形式的talk
 * @namespace MI.TalkBox.showBox
 * @type Function
 * @param {string} talkId 被转播/回复/评论的tweet的id
 * @param {integer} type talkbox 类型, 1: 转播，2: 回复, 3: 评论
 * @param {object} config 其他可选参数
 * @config {string} content 被预填充到talkbox textarea中的文本内容
 * @config {string} talkTo 被回复人的账号
 * @config {object} tweetDom 被转播/回复/评论的tweet的dom对象
 */
MI.TalkBox.showBox = function (talkId, type, config) {
	var title, content,
		box = new MI.Reply(),
		talkBox = box.talkBox,
		ctn = config && config.tweetDom,
		userNamea,
		h;

	config = config || {};

	switch (type) {
	case 1:
		title = '转播原文，顺便说两句：';
		if (ctn) {
			if (UI.GC(ctn, '.replyBox').length) {
				content = MI.TalkList.getRelayOld(ctn);
				h = 80;
			}
		}
		break;
	case 2:
		if (config.talkTo) {
			talkBox.talkTo = config.talkTo;
		} else if (ctn) {
			userNamea = UI.GC(ctn, 'strong a')[0];
			talkBox.talkTo = MI.string.account(userNamea.title ||
				UI.A(userNamea, 'rel'));
		}
		break;
	case 4:
		title = '评论原文：';
		if (ctn && UI.GC(ctn, '.replyBox').length) {
			content = MI.TalkList.getRelayOld(ctn);
			h = 80;
		}
		break;
	default:
		return;
	}

	if (config.content) {
		content = config.content;
		h = 80;
	}

	box.show({
		title : title,
		cont : content,
		height : h,
		type : type,
		talkId : talkId,
		doFocus : false
	});

	setTimeout(function () {
		try {
			talkBox._txt.focus();
			MI.selectTxt(talkBox._txt, 0, 0, 0);
			talkBox.countTxt();
		} catch (e) {}
	}, 200);
};
MI.TalkBox.prototype = {
	delay : {},
	delayTime : 1500,
	delayVideo : null,
	delayVideoTime : null,
	/**
	 * 发表框的提交地址
	 * @type String
	 */
	url : MI.url.talkPublish,
	/**
	 * 发表框的类型
	 * @type Number
	 *            @example
	 *            //Value In JS: null-原创  1-转播  2-对话  3-私信  4-Timeline评论  5-底层页评论  6-记事本  7-空回对话
	 *            //Value In PHP: 1-原创发表、2-转载、3-私信 4-回复 5-空回 6-提及 7-评论
	 *            MI.talkBox.type = 4;
	 */
	type : null, 
	/**
	 * 发表框的消息来源
	 * @type Number
	 */
	source : (function(){ //Talk's Source,example Web QQ
		var source = 0,hostname,temp;
		try{
			hostname = top.document.location.hostname;
			temp = parent.source;
		}catch(e){}
		if (hostname == 'web2.qq.com' || hostname == 'web.qq.com') {
			source = 1009;
		}
		else if(temp){
			source = temp;
		}
		return source;
	})(),
	/**
	 * 发表框的统计类型（产品分析）
	 * @type Number
	 *            @example
	 *            MI.talkBox.countType = 2;
	 */
	countType : '', //Count TalkBox's Type For Product
	/**
	 * 发表消息后是否显示Icon图片（是-true,否-false）
	 * @type Boolean
	 *            @example
	 *            MI.talkBox.iconPic = 1;
	 */
	iconPic : 0, //View Model 0 1(Simple Model)
	/**
	 * 发表图片的地址
	 * @type String
	 */
	pic : '', //Save Pic's Url
	/**
	 * 发表站外图片的地址
	 * @type String
	 */
	sourcePic : '', //Save Source Pic's Url
	//video : '', //Save Video's Url
	code : null, //Verify Code
	pass : null, //发表时的确定码
	/**
	 * 发表时自动添加的默认话题（也可以作其他用途）
	 * @type String
	 *            @example
	 *            MI.talkBox.topic = '#意见反馈#'; //默认话题
	 *            MI.talkBox.topic = '@xhlv '; //默认对话
	 */
	topic : null, //Auto Add Topic
	/**
	 * 转播、对话的来源ID
	 * @type String
	 */
	talkId : null, //Id To Reply Or Relay
	/**
	 * 发表的最大字数限制
	 * @type String
	 *            @example
	 *            MI.talkBox.txtMax = 140 - MI.talkBox.topic.length; //默认话题时需要减去相应字数
	 */
	txtMax : 140,
	txtCache : '', //Cache Success Talk
	txtTopic : _('#输入话题标题#'),
	txtPic : _('#分享照片#'),
	txtVideo : '',
	txtMusic : _('#分享音乐#'),
	txtTip : {
		empty : _('请输入内容'),
		fail : _('发送失败,请重试'),
		repeat : _('请不要连续发表重复内容')
	},
	/**
	 * 正在发送的文字提示
	 * @type String
	 *            @example
	 *            MI.talkBox.txtTipSend = '发送中';
	 */
	txtTipSend : _('广播中'),
	/**
	 * 写消息的开始时间
	 * @type String
	 */
	startTime : 0, //Talk's Start Time
	/**
	 * 发表成功后是否异步添加到MI.talkList中
	 * @type Boolean
	 *            @example
	 *            MI.talkBox.addList = 1;
	 */
	addList : 0, //If Add New Talk To List
	addCheck : null, //Check Content Of Add New Talk To List
	addNum : 1, //Add Num When Send Success
	autoHeight : 0, //Auto Change Textarea's Height
	tmpl : '',
	/**
	 * 写消息时是否折算短Url
	 * @type Boolean
	 *            @example
	 *            MI.talkBox.countUrl = 0; //关闭短Url字数折算
	 */
	countUrl : 1,
	/**
	 * 计算剩余字数
	 *            @example
	 *            MI.talkBox.countTxt();
	 */
	countTxt : function(){
		var Self = this,
			txt = Self._txt,
			value = txt.value,
			autoBackspace = Self._autoBackspace,
			talkTip,
			length;
		Self.length = length = MI.countTxt(value,Self.countUrl);
		if (!length && Self._tip.innerHTML.hasString(Self.txtTip.empty)) {
			return;
		}
		if (length > this.txtMax) {
			talkTip = _('超出') + '<em class="error">';
			Self._btn.disable = 1;
			autoBackspace && value.indexOf('||') === -1 ? UI.hide(autoBackspace) : UI.show(autoBackspace);//是否显示’自动缩减
		}
		else {
			talkTip = _('还能输入') + '<em>';
			if(autoBackspace) UI.hide(autoBackspace);
			Self._btn.disable = 0;

		}
		if (length == 0) {
			Self._btn.disable = 1;
		}
		Self.showTip(talkTip + Math.abs(Self.txtMax - length) + '</em>' + _('字') );
		if (Self._msgTo && (Self._msgTo.value == '' || Self._msgTo.error)) {
			Self._btn.disable = 1;
		}
		if (length <= Self.txtMax && Self.type == 1 && Self.boxType !='trans') {
			Self._btn.disable = 0;
		}
		if (Self.autoHeight) {
			clearTimeout(this.delay.height);
			this.delay.height = setTimeout(function(){
				UI.C(Self._txt,'height','');
				//if (Self._txt.scrollHeight <= 136) {
				//	UI.C(Self._txt,'height','');
				//}
				var height = Self._txt.scrollHeight;
				if (UI.B.ie) {
					if (Self.autoHeight > 40 && height < 38) {
						height = 37;
					}
					else if (Self.autoHeight <= 40 && height <= 18) {
						height = 16;
					}
				}
				if (Self.autoHeight > 40 && height >= Self.autoHeight) {
					height = Self.autoHeight;
				}
				if (height >= 136) {
					height = 136;
					UI.C(Self._txt,'overflowY','auto');
				}
				else {
					UI.C(Self._txt,'overflowY','hidden');
				}
				UI.C(Self._txt,'height',height + 'px');
				if (Self._txt.nextSibling) {
					UI.C(Self._txt.nextSibling,'height',height + 'px');
				}
			},UI.B.ipad ? 800 : 100);
		}
		if (Self.autoSave && length <= this.txtMax && MI.isS) {
			clearTimeout(Self.delay.save);
			Self.delay.save = setTimeout(function(){
					Self.save();
			},80);
		}
	},
	/**
	 * 焦点到输入框最后一个字符
	 *            @example
	 *            MI.talkBox.focus();
	 */
	focus : function(){
		MI.focus(this._txt);
	},
	guideReset : function(){
		this._guide.innerHTML = this.guide;
		UI.A(this._guide,'user','');
	},
	save : function(){
		try{
			MI.S('draft_' + MI.user.account,this._txt.value.replace(new RegExp(this.txtTopic,'g'),'') || '');
		}catch(e){};
	},
	showTip : function(msg,type){ //type: 1-error 2-loading
		if (type == 2) {
			UI.addClass(this._tip,'loading');
		}
		else {
			UI.removeClass(this._tip,'loading');
		}
		this._tip.innerHTML = type == 1 ? '<span class="error">' + msg + '</span>' : msg;
	},
	flashTip : function(){
		clearInterval(this.delay.flashTip);
		UI.C(this._tip,'opacity','0');
		this.delay.flashTip = UI.animate(this._tip,'opacity',1,0,0.1);
	},
	hideMedia : function(){ //隐藏浮层 - 视频/音乐/投票
		var Self = this;
		Self._video && UI.hide(Self._videoBox);
		Self._music && MI.Music && Self._musicBox && MI.Music.hide();
		Self._vote && Self.hideVote && Self.hideVote();
		Self._music && Self.musicMoreBtn && Self.musicMoreBtn.hideRecord();
	},
	/**
	 * 隐藏发表框
	 *            @example
	 *            MI.talkBox.hide();
	 */
	hide : function(){ //Hide TalkBox
		UI.remove(this._body);
		if (this.hideCall) {
			this.hideCall();
		}
	},
	/**
	 * 隐藏发表框的回调函数
	 *            @example
	 *            MI.talkBox.hideCall = function(){
	 *                
	 *            }
	 */
	hideCall : null, //Callback After Hide
	/**
	 * 发表成功的回调函数
	 *            @example
	 *            MI.talkBox.success = function(){
	 *                
	 *            }
	 */
	success : null, //Callback After Send Success
	reset : function(){ //重置到可发表状态
		var Self = this;
		UI.removeClass(Self._btn,'btnNoStr');
		Self._btn.disable = 0;
		setTimeout(function(){
			Self.countTxt();
		},500);
	},
	/**
	 * 发表提交时的扩展参数
	 *            @example
	 *            //单个talkBox
	 *            MI.talkBox.data = {
	 *                group : '123'
	 *            }
	 *            //所有talkBox
	 *            MI.TalkBox.prototype.data = {
	 *                group : '123'
	 *            }
	 */
	data : {},
	send : function(){
		var Self = this,
			obj,
			addCheck = 1,
			content = UI.trim( Self._txt.value.replace(new RegExp(Self.txtTopic,'g'),'').replace(/＠/g,'@').replace(/＃/g,'#') ),
			Time,Time_1,Time_2,Time_3;
		if (!Self.tmpl){
			MI.app({
				Tmpl : function(){
					Self.tmpl = MI.tmpl.listAll;
				}
			});
		}

		//if (UI.hasClass(Self._btn,'btnNoStr')) {
		if (UI.hasClass(Self._btn,'btnNoStr')) {
			return;
		}
		if (Self._btn.disable || UI.hasClass(Self._btn,'btnNoStr')) {
			if (Self.length == 0) {
				Self.showTip(Self.txtTip.empty,1);
			}
			Self._txt.focus();
			/*if (UI.trim(Self._txt.value).length) {
				Self._txt.focus();
			}*/
			if (Self._msgTo && UI.trim(Self._msgTo.value) == '') {
				Self._msgTo.focus();
			}
			Self.sending = 0;
			Self.flashTip();
			return;
		}
		/*if (content && content == Self.txtCache) {
			Self.showTip(Self.txtTip.repeat,1);
			Self.flashTip();
			Self.sending = 0;
			return;
		}*/
		Self._btn.disable = 1;
		UI.addClass(Self._btn,'btnNoStr');

		//Go To User's Page
		if (!Self.type && !Self.pic && !Self.sourcePic && !Self.topic && content.match(/^@[a-zA-Z]{1}[\w|-]{0,19}$/g)) {
			MI.Bos('btnAtAccountOnly');
			Self.goUser('http://t.qq.com/' + content.slice(1) + '?from=1');
			return;
		}

		//Show Sending Tip
		Self.delay.tip = setTimeout(function(){
			Self.showTip(Self.txtTipSend,2);
		},500);

		//Start Callback
		if (Self.start) {
			Self.start();
		}

		//Post Data
		obj = {
			content : content,
			startTime : Self.startTime,
			endTime : new Date().getTime(),
			countType : Self.countType,
			viewModel : Self.iconPic
		};
		if (Self.code) {
			obj.veriCode = Self.code;
		}
		if (Self.pass) {
			obj.pass = Self.pass;
		}
		if (Self.type) {
			obj.pId = Self.talkId;
			obj.type = Self.type;
		}
		if (Self._msgTo) {
			obj.account = Self._msgTo.value.replace(/^@/,'');
		}
		if (Self.sourcePic) {
			obj.sourcepic = Self.sourcePic;
		}
		else {
			obj.pic = Self.pic;
		}
		if (Self.topic) {
			obj.content = (obj.content.match(new RegExp(MI.string.escapeReg(Self.topic))) ? '' : Self.topic) +  obj.content;
		}
		if (Self.music && Self.music.id){
			obj.musicID = Self.music.id;
			obj.musicSong = Self.music.song;
			obj.musicSinger = Self.music.singer;
			obj.musicLocation = Self.music.songurl;
			obj.musicShortUrl = Self.music.shorturl;
			if(Self.music.songtype)	obj.musicSource = Self.music.songtype;
		}
		if (Self.video) {
			obj.video = Self.video;
		}
		if (Self.vid) { // 上传视频的ID
			obj.vid = Self.vid;
		}
		if (Self.vote) {
			obj.vote = Self.vote;
		}
		if (Self.addCheck && !obj.content.toLocaleLowerCase().hasString(Self.addCheck.toLocaleLowerCase())) { //If Check False,Don't Add NewTalk To List
			addCheck = 0;
		}
		if (Self.source) {
			obj.source = Self.source;
		}
		if (MI.api.type) {
			obj.apiType = MI.api.type;
		}
		if (Self.data) { // 附加数据
			for (var i in Self.data){
				obj[i] = Self.data[i];
			}
		}
		Time = + new Date();
		MI.ajax({
			url : Self.url,
			data : obj,
			success : function(data){
				Time_1 = + new Date() - Time;
				clearTimeout(Self.delay.timeout);
				data = MI.json(data);
				/*
					data = {
						result : 0,
						msg : '发言成功',
						info : {
							id : '123456',
							time : '5分钟前',
							content : '内容',
							form : '腾讯微博'
						}
					};
					//Verify Code
					data = {
						result : -100,
						msg : '您的操作出现异常，请输入验证码',
						info : 'http://ptlogin2.qq.com/getimage?aid=13001401&Math.random()'
					};
				*/
				if (MI.user && data.result == 0 && data.info && UI.isObject(data.info)) {
					var talk = data.info.talk[0],user = MI.user;
					talk.pic = user.pic;
					talk.nick = talk.nick || user.name;
					talk.name = talk.name || user.account;
					if (Self.type != 4){
						talk.chName = talk.chName || user.chName;
					}
					talk.flag = (talk.flag && UI.isArray(talk.flag) ? user.flag : talk.flag);
					data.info.iconPic = Self.iconPic;
					data.info.guest = 0;
					data.info.fav = 0;
					data.info.shield = 0;
				}

				//Self._txt.blur();

				//Show Tips
				if (MI.code.check(data.result)) { //Verify code
					MI.code.show({msg:data.msg,code:data.info,call:function(code){
						Self.code = code;
						Self.send();
					}});
					Self.reset();
				}
				else if (data.result == -104){ //只@了一个存在的中文帐号
					MI.Bos('btnAtAccountOnlyCN');
					if (data.info){
						Self.goUser('http://t.qq.com/' + data.info + '?from=1');
					}
				}
				else if (data.result == -103){ //不规则中文帐号
					var accountError = [];
					if (UI.isArray(data.info)){
						UI.each(data.info,function(o){
							if (UI.isString(o)){
								accountError.push(o.slice(1));
							}
						});
					}
					MI.app({
						Base : function(){
							MI.confirm({
								title : _('确定继续发送？'),
								content : _('你在广播中@到了{0}，可能忘了添加空格，因此未成功@到正确账号。','“' + accountError.join('”、“') + '”'),
								confirmTxt : _('继续发送'),
								confirm : function(){
									MI.dialog.hide();
									Self.pass = data.result;
									Self.send();
									MI.Bos('btnSendAtConfirm');
								},
								cancelTxt : _('返回修改'),
								cancel : function(){
									if (UI.isArray(data.info) && UI.isString(data.info[0])){
										var index = Self._txt.value.indexOf(data.info[0]);
										if (index != -1){
											index += data.info[0].length;
											MI.selectTxt(Self._txt,index,index,index);
										}
										else {
											Self.focus();
										}
									}
									MI.Bos('btnSendAtCancel');
								}
							});
							Self.reset();
						}
					});
				}
				else {
					clearTimeout(Self.delay.tip);
					Self.showTip(data.msg || '',data.result < 0 ? 1 : 0);
					Self.flashTip();
					if (data.result == 0 && Self._tipBig) {
						$$(Self._tipBig,'.msg')[0].innerHTML = data.msg;
						if (Self.type != 4) { //除了主Timeline评论外
							UI.addClass(Self._body,'pubSuc');
						}
						UI.show(Self._tipBig);
					}
					Self.delay.tip = setTimeout(function(){
						UI.animate(Self._tip,'opacity',1,function(){
							if (data.result == 0) {
								Self._txt.value = '';
							}
							try{
								Self._txt.focus(); //Hided Element Can't Be Focused In IE (Bug)
							}catch(e){};
							Self.countTxt();
							if (Self._msgTo && data.result > -9 && data.result < -5) { //result : -6 -7 -8
								try{
									Self._msgTo.select();
								}catch(e){};
							}
							UI.C(Self._tip,'opacity','');
							Self._tip.style.filter = '';
							Self.sending = 0;
							UI.removeClass(Self._btn,'btnNoStr');
							if (data.result == 0) {
								Self.delPic();
								Self.delVideo();
								Self.delMusic();
								Self.vote = null;
								Self.code = null;
								Self.pass = null;
								if(MI.Music && MI.Music.builded){
									MI.Music.clear();
								}
								if (Self._guide) {
									Self.guideReset();
								}
							}
							if (Self.success && data.result == 0) {
								Self.success(data);
								UI.hide(Self._tipBig);
							}
						});
					},data.result == 0 ? Self.delayTime : Self.delayTime + 1000);
				}

				//Callback
				if (Self.successStart && data.result == 0) {
					Self.successStart(data);
				}
				if (Self.failStart && data.result != 0) {
					Self.failStart(data);
				}

				//Add New Talk To List
				// 默认的加入list是MI.talkList
				// 群里边 要 加入 MI.talkListHot
				var AddedTalkList = MI.talkList;
				if(Self.data.wqid && MI.talkListHot) {
					AddedTalkList = MI.talkListHot;
				}
				if (AddedTalkList && Self.addList && data.result == 0 && addCheck) {
					/*idata.info.source = {};
					f (Self.type && Self.type != 4) { //From Reply And Relay
						data.info.action = Self.action;
						data.info.source = Self.source;
					}*/
					if (AddedTalkList._tip) { //Hide Talk List's Tip
						UI.hide(AddedTalkList._tip);
					}

					AddedTalkList.add.push(data.info.talk[0].id);

					var newTalk = UI.html(new UI.tmplString(Self.tmpl)(data.info))[0];
					AddedTalkList.addEvent(newTalk);
					UI.addClass(newTalk,'newMsg'); //Add Delete CSS
					//UI.C(newTalk,'opacity',0);
					UI.prepend(newTalk,AddedTalkList._body);
					AddedTalkList.addFollowBtn(newTalk);
					AddedTalkList.card();
					AddedTalkList.buildTips();
					AddedTalkList._news.push(newTalk);
					AddedTalkList.news++;
					var height = UI.height(newTalk),scrollY = UI.scrollY(),scroll;
					UI.C(newTalk,'height',0);
					/*
						偶尔会有抖动，跟dom元素个数及内容多少有关，越多则样式渲染所需时间越多，抖动越明显。
						IE里设置一个延迟效果要好很多，其他浏览器则不需要（效果反而更差）。
						这也反映出浏览器的性能，chrome不会有任何抖动。
					*/
					/*if (scrollY > UI.getY(MI.talkList._body)) { //Auto Scroll Page With NewTalk Height
						scroll = function(){
							UI.scrollTo(document.documentElement,0,scrollY + height);
							//document.documentElement.scrollTop = UI.scrollY() + height;
						}
						if (UI.B.ie) {
							setTimeout(scroll,0);
						}
						else scroll();
					}*/
					setTimeout(function(){
						UI.animate(newTalk,'height',height - 22,function(){
							UI.C(newTalk,'height','');
							AddedTalkList.bottom();
							MI.Crs(1);
						},0.3);
					},0);
				}

				if (data.result == 0) {
					//Clear Start Time
					Self.startTime = 0;

					//Save Draft
					if (Self.autoSave && MI.isS) {
						var draft = 'draft_' + MI.user.account;
						MI.S(draft,'');
					}
					
					//Save Topic
					if (MI.isS && !Self.type) {
						MI.app({
							Base : function(){
								Self.cacheTopic(obj.content);
							}
						});
					}
					
					//Count Talk Number
					if (Self.type != 4 && Self.type != 5) {
						Self.countNum(1);
					}
					if (MI['talkList'] && data.info.talk[0].timestamp) {
						MI.talkList.updateTime(data.info.talk[0].timestamp);
					}
					if(MI['talkListHot'] && data.info.talk[0].timestamp)
					{
						MI.talkListHot.updateTime(data.info.talk[0].timestamp);
					}
					Self.txtCache = content;
				}
				
				//Speed
				Time_2 = + new Date() - Time;
				setTimeout(function(){
					Time_3 = + new Date() - Time;
					MI.Speed('t_asyn_talk',0.1,Time_1,Time_2,Time_3);
				},0);
			}
		});
		Self.delay.timeout = setTimeout(function(){ //Tips For Time Out
			Self.showTip(Self.txtTip.fail,1);
			Self._btn.disable = 0;
			UI.removeClass(Self._btn,'btnNoStr');
		},20000);//定的是15s，但为了安全起见，算上网络延迟、请求排队等因素，将时间扩大到20秒
		return;
	},
	countNum : function(value){ //Count Talk Num
		if (value > 0 && !this.addNum) {
			return;
		}
		if (this._num.length) {
			for (var i = 0,num = this._num.length;i < num;i++) {
				MI.countNum(this._num[i],value);
			}
		}
	},
	/**
	 * 插入话题或表情
	 *            @example
	 *            MI.talkBox.addTopic(); //新建话题
	 *            MI.talkBox.addTopic('#历史话题#'); //插入话题
	 *            MI.talkBox.addTopic('/微笑'); //插入表情
	 */
	addTopic : function(topic){
		var topicNew = 1; //新建话题
		if (topic){
			topicNew = 0;
		}
		else {
			topic = this.txtTopic;
		}
		this._txt.focus();

		//Add Topic
		if (!this._txt.value.hasString(this.txtTopic) || !topicNew) {
			MI.insertTxt(this._txt,topic,MI.cursorX(this._txt));
			//this._txt.value = txt = txt + this.txtTopic;
		}
		if (topicNew){
			var txt = this._txt.value,
				indexOf = txt.replace(/\r/g,'').indexOf(topic),len;
			if (indexOf == -1) {
				indexOf = 0
			}
			len = topic.length;
			MI.selectTxt(this._txt,indexOf + 1,indexOf + len - 1,indexOf);
		}
		//this._txt.scrollTop = 999; //Textarea Scroll To End

		this.countTxt();
	},
	uploadPic : function(){
		var Self = this;
		Self._pic.onmouseover = null;
		UI.show(Self._picLoading);
		UI.addClass(Self._picLoading,'loading');
		UI.hide(Self._picForm);
		UI.hide(Self._picTxt);
		UI.hide(Self._picIco);
		UI.hide(Self._picCapture);
	},
	/**
	 * 跳往某人客人页
	 * @param {String} String URL地址
	 *            @example
	 *            MI.talkBox.goUser('http://t.qq.com/xhlv');
	 */
	goUser : function(url){
		if (MI.hostType == 1){
			document.location.href = url;
		}
		else {
			window.open(url);
		}
	},
	/**
	 * 插入图片
	 * @param {Object} Object 图片数据
	 *            @example
	 *            MI.talkBox.addPic({result:0,msg:'上传成功','info':{'image':'http://mblogpic.store.qq.com/mblogpic/912aac4876512cda449a','path':'20110322/bb8e2c6c6dca28470e9f6e353614087a','host':'upload5.t.qq.com'});
	 */
	addPic : function(o){
		var Self = this,
			pic,
			normalPic,
			host,
			Time,Time_1,Time_2,Time_3;
		Self._pic.onmouseover = null;
		Time = Self.PicUpTime;
		Time_1 = + new Date();
		UI.hide(Self._picLoading);
		UI.hide(Self._picTxt);
		UI.hide(Self._picForm);
		UI.show(Self._picIco);
		if (o.result == 0) {
			UI.removeClass(Self._pic,'hover');
			host = o.info.host;
			pic = o.info.image;
			normalPic = pic.hasString('mblogpic.store.qq.com/mblogpic') || pic.hasString('qpic.cn'); 
			if (normalPic){
				Self.pic = pic;
			}
			else {
				Self.sourcePic = pic;
			}
			if (MI.PicTurn){
				MI.PicTurn.url = 'http://' + (host ? host : 'upload.t.qq.com');
			}
			if (MI.user.fun.turnPic && o.info.path) {
				MI.PicTurn.reset(Self.pic,o.info.path);
			}
			var turnPicAble = MI.user.fun.turnPic && o.info.path,
				fileName = o.info.fileName || Self._picBtn.value,
				fileType = fileName.substring(fileName.lastIndexOf('.') + 1,fileName.length);
			fileName = fileName.match(/[^\/|\\]*$/)[0].replace(fileType,'');
			fileName = MI.string.cut(fileName,10) + fileType;
			if (turnPicAble) {
				Self._picLink.innerHTML = '<a href="' + pic  + '/2000" class="fileName" target="_blank">' + fileName + '</a>';
			}
			else {
				Self._picLink.innerHTML = '<a href="' + pic + '/2000" class="fileName" target="_blank" style="position:relative;">' + fileName + '<span class="simg" style="cursor:default;"><img  src="' + pic +  "/160" + '" /><span style="white-space:nowrap;width:100%;padding:5px 0;display:' + (UI.B.ipad ? 'none':'inline-block' ) + '"><span class="useFilter" style="cursor:pointer;display:inline;" href="javascript:void(0)">' + _('魔法滤镜') + '</span></span></span></a>';
				$$(Self._picLink,'.useFilter')[0].onclick = function(){
					MI.app({
						Base:function(){
							var src = pic.replace('mblogpic.store.qq.com/mblogpic','t0.qpic.cn/mblogpic');
							MI.photoFilter.build(src + "/2000",'http://t.qq.com/asyn/updateGrabPic.php');
						}	
					});
					MI.Bos('btnPhotoFilter');
					return false;
				}		
			}

			var _fileName = $$(Self._picLink,'.fileName')[0],delayHide,
				show = function(){
					if(turnPicAble) {
						MI.PicTurn.show();
					} else {			
						clearTimeout(delayHide);
						clearTimeout(MI.PicTurn.autoHideDelay);
						UI.addClass(_fileName,'hover');
					}	
				},
				hide = function(){
					if(turnPicAble) {
						MI.PicTurn.hideT();
					} else {		
						delayHide = setTimeout(function(){
							UI.removeClass(_fileName,'hover');
						},200);
					}
				};

			UI.EA(_fileName,'mouseover',show);
			UI.EA(_fileName,'mouseout',hide);

			show();
			MI.PicTurn.autoHideDelay = setTimeout(hide,3000);
			
			UI.show(Self._picPreview);
			if (Self._txt.value == '' && fileName != _('表情.jpg')) {
				Self._txt.value = Self.txtPic;
				Self.countTxt();
			}
			Self.focus();
		}
		else {
			UI.show(this._picTxt);
			UI.show(this._picForm);
			Self._pic.onmouseover =	Self.picNav; 
			MI.alert(o.msg);
		}
		Self._picForm.reset();

		//Speed
		if (Time){
			Time_2 = + new Date() - Time;
			setTimeout(function(){
				Time_3 = + new Date() - Time;
				MI.Speed('t_asyn_uploadpic',1,Time_1,Time_2,Time_3);
			},0);
		}
		Self.PicUpTime = null;
	},
	/**
	 * 删除图片
	 *            @example
	 *            MI.talkBox.delPic();
	 */
	delPic : function(){
		var Self = this;
		if (Self._pic) {
			Self.pic = this.sourcePic = '';
			Self._picForm.reset();
			UI.hide(Self._picPreview);
			UI.hide(Self._picLoading);
			UI.show(Self._picIco);
			UI.show(Self._picTxt);
			UI.show(Self._picForm);
			UI.show(Self._multiPic);
			if (Self._txt.value == Self.txtPic) {
				Self._txt.value = '';
			}
            if(Self.txtSummary){
                Self._txt.value = Self._txt.value.replace(Self.txtSummary,'');
                Self.txtSummary = '';
            }
			if (MI.Capture && MI.Capture.uploader){
				MI.Capture.uploader.StopUpload();
			}
			
			if(UI.B.chrome) {
				Self._picForm.innerHTML = Self._picForm.innerHTML;
				Self._picBtn = Self._picForm.firstChild;
				Self._picBtn.onchange = Self.picChange;
			}
            Self.countTxt();
		}
	},
	/**
	 * 删除视频
	 *            @example
	 *            MI.talkBox.delVideo();
	 */
	delVideo : function(){
		if (this._video) {
			this.video = '';
			UI.remove(this._videoPreview);
			UI.show(this._videoAnchor);
			if (this._txt.value == this.txtVideo) {
				this._txt.value = '';
			}
            this.countTxt();
		}
	},
	/**
	 * 删除音乐
	 *            @example
	 *            MI.talkBox.delMusic();
	 */
	delMusic : function(){
		if (this._music) {
			this.music = '';
			UI.remove(this._musicPreview);
			UI.hide(this._musicBox);
			UI.show(this._musicAnchor);
			if (this._txt.value == this.txtMusic) {
				this._txt.value = '';
			}
            this.countTxt();
		}
	},
	cancelPic : function(){
		if (this._pic) {
			this.pic = '';
			UI.hide(this._picLoading);
			UI.show(this._picIco);
			UI.show(this._picForm);
			UI.show(this._picTxt);
			this._iframe.src = 'about:blank';
			this._picForm.reset();
		}
	},
	getVideo : function(value){
		var Self = this;
		Self.ayncVideoResult = null;
		if(!UI.trim(value)){
			//Self.hide();
			return;
		}
		if(this.delayVideo)	clearTimeout(this.delayVideo);
		this.delayVideo=window.setTimeout(function(){
			Self._videoError.innerHTML = Self._errMsg[1];
			UI.show(Self._videoError);
			MI.ajax({
				url : MI.url.validateVideo,
				type : 'get',
				data : "url=" + encodeURIComponent(value)+'&r='+MI.random(),
				success : function(data){
					Self._videoBtn.disabled = false;
					data = MI.json(data);
					Self.ayncVideoResult = data.result;
					if (data.result == 0){
						UI.hide(Self._videoError);
						if(data.url){
							//Self.video = Self._videoTxt.value;//'http://url.cn/'+data.url;
							clearTimeout(Self.delayVideoTime);
							var title = data.title.replace(/\&lt;/g,'<').replace(/\&gt;/g,'>').replace(/\&quot;/g,'"');
							var v = _('#分享视频#') + title + ' http://url.cn/'+data.url+' ';
							Self.video = data.url;
							Self.txtVideo = v;
							Self._txt.value += v;
							Self._videoTxt.value = '';
							Self.countTxt();
							Self.focus();

							var preview = '<span class="preview"><span class="link"><a class="fileName" href="#">%title%<span class="vThumbs"><span class="mask"><em></em></span><img src="%pic%" /></span></a></span><a class="del" href="#" title="' + _('删除') + '">[' + _('删除') + ']</a></span>';
							data.pic = data.pic ? data.pic : 'http://mat1.gtimg.com/www/mb/images/vNoThumbs.jpg';
							var op = $$(Self._videoBox,'.preview')[0];
							var p = preview.replace(/\%title\%/g,MI.string.cut(MI.string.html(title),10)).replace(/\%pic\%/g,data.pic);
							Self._videoPreview = UI.html(p)[0];
							if(op)	UI.remove(op);
							UI.before(Self._videoPreview,Self._videoBox);

							var del = $$(Self._videoPreview,'.del')[0];
							del.onclick = function(e){
								UI.E(e).stop();
								Self.delVideo();
								return false;
							}
							UI.hide(Self._videoAnchor);
							UI.hide(Self._videoBox);
						}
					}else if(data.result == -1){//未登录errMsg
						Self._videoError.innerHTML = Self._errMsg[0];
						UI.show(Self._videoError);
					}else if(data.result == -3){//暂不支持
						Self._videoError.innerHTML = Self._errMsg[3];
						UI.show(Self._videoError);
						Self._videoNormalBtn = $$(Self._video,'.vNormalBtn')[0];
						Self._videoNormalBtn.onclick = function(){
							if(UI.trim(Self._videoTxt.value)){
								Self._txt.value += UI.trim(Self._videoTxt.value);
								Self._videoTxt.value = '';
								clearTimeout(Self.delayVideoTime);
								UI.hide(Self._videoBox);
							}
							return false;
						}
					}else{//获取不到或异常
						Self._videoError.innerHTML = Self._errMsg[2];
						UI.show(Self._videoError);
					}
				}
			});
			Self.delayVideoTime = setTimeout(function(){ //Get Video For Time Out
				if(!Self.ayncVideoResult){
					Self._videoError.innerHTML = Self._errMsg[2];
					UI.show(Self._videoError);
				}
			},20000);//
		},200);
	},
	$ : function(className){
		return $$(this._body,className)[0];
	}
}
/**
 * 判断是否支持截屏
 * @type Function
 * @return {Boolean} Boolean
 */
MI.TalkBox.captureEnable = function(){
	return (UI.B.win && (UI.B.ie || UI.B.chrome || UI.B.firefox)) || (UI.B.mac && (UI.B.firefox || UI.B.chrome || UI.B.safari));
}
/**
 * 当前激活的TalkBox实例
 * @type Object
 */
MI.TalkBox.cur = null;

MI.PicTurn = {
	pos: 0,
	url : 'http://upload.t.qq.com',
	path: '',
	cache: [],
	build: function(tb) {
		var Self = this;
		Self.talkBox = tb;
		Self._body = UI.html('<div '+(UI.B.ie6?'':'class="big"')+' style="display:none;margin:3px 0 8px;padding:4px;border:1px solid #e5e5e5;background:#f9f9f9;position:absolute;z-index:20;top:15px;left:0px;"><div class="tools" style="width:130px"><a class="btnBack" href="#" style=""><em'+(UI.B.ie6?' style="width:17px;background:url(\'http://mat1.gtimg.com/www/mb/images/b2_100907.png\') no-repeat scroll -162px -233px transparent;"':'')+'></em>' + _('向左转') + '</a><span>|</span><a class="btnPrev" href="#"><em'+(UI.B.ie6?' style="width:17px;background:url(\'http://mat1.gtimg.com/www/mb/images/b2_100907.png\') no-repeat scroll -179px -233px transparent;"':'')+'></em>' + _('向右转') + '</a></div><div class="loading" style="width:112px;line-height:1.231;height:19px;_height:21px;display:none;">' + _('处理中') + '...</div><div class="imgct" style="clear:both;text-align:center;"></div><form method="POST" target="imageRotate" action="/asyn/rotatepic.php"><input type="hidden" id="irRetType" name="retType" value="0" /><input type="hidden" id="irPath" name="path" /><input type="hidden" id="irDegrees" name="degrees" /></form><iframe id="imageRotate" name="imageRotate" src="about:blank" style="display:none"></iframe></div>')[0];
		Self._imgCt = $$(Self._body, '.imgct')[0];
		Self._picLoading = $$(Self._body,'.loading')[0];
		Self._tools = $$(Self._body, '.tools')[0];
		Self._form = $$(Self._body, 'form')[0];
		$$(Self._body, '.btnPrev')[0].onclick = function() {
			this.blur();
			Self.turn(1);
			MI.Bos('btnPicTurn');
			return false;
		}
		$$(Self._body, '.btnBack')[0].onclick = function() {
			this.blur();
			Self.turn(-1);
			MI.Bos('btnPicTurn');
			return false;
		}
		Self._body.onmouseover = function() {
			clearTimeout(Self.hl);
			Self.show();
		}
		Self._body.onmouseout = function() {
			Self.hide();
		}
		return Self._body;
	},
	// 1: 顺时针 -1: 逆时针
	turn: function(dir) {
		var Self = this;
		Self.pos += dir;
		if (Self.pos > 3) Self.pos -= 4;
		else if (Self.pos < 0) Self.pos += 4;
		var pic = Self.cache[Self.pos];
		if (!pic) Self.get();
		else {
			Self.talkBox.pic = pic;
			Self.set(pic);
		}
	},
	get: function() {
		var Self = this;
		UI.hide(Self._tools);
		Self._picLoading.style.display = 'block';
		
		UI.A(Self._form, 'action', MI.PicTurn.url+'/asyn/rotatepic.php');
		$('irPath').value = Self.path;
		$('irDegrees').value = Self.pos*90;
		Self._form.submit();
	},
	over: function(data) {
		var Self = this;
		if (data.result == 0) {
			var pic = data.info.image;
			Self.talkBox.pic = pic;
			Self.cache[Self.pos] = pic;
			Self.set(pic);
		}
		UI.hide(Self._picLoading);
		UI.show(Self._tools);
	},
	set: function(src) {
		this._imgCt.innerHTML = '<img src="' + src + '/160" /><div style="width:100%;display:' + (UI.B.ipad ? 'none':'inline-block') + ';padding:5px 0;white-space:nowrap;"><a href="#" class="useFilter" style="float:none;display:inline;">' + _('魔法滤镜') + '</a></div>';

		$$(this._imgCt,'.useFilter')[0].onclick = function(){
			MI.app({
				Base:function(){
					var pic = src.replace('mblogpic.store.qq.com/mblogpic','t0.qpic.cn/mblogpic');
					MI.photoFilter.build(pic + '/2000','http://t.qq.com/asyn/updateGrabPic.php');
				}	
			});
			MI.Bos('btnPhotoFilter');
			return false;
		}
	},
	show: function() {
		var Self= this;
		clearTimeout(Self.autoHideDelay);
		UI.show(Self._body);
	},
	hide: function() {
		UI.hide(this._body);
	},
	hideT: function() {
		var Self = this;
		Self.hl = setTimeout(function() {
			Self.hide();
		}, 200);
	},
	reset: function(src, path) {
		var Self = this;
		Self.pos = 0;
		Self.path = path;
		Self.cache = [src];
		Self.set(src);
		UI.hide(Self._picLoading);
		UI.show(Self._tools);
	}
}
/**
 * 消息列表
 * @namespace MI.TalkList 消息列表
 * @constructor
 * @param {String} String 发表框ID（或DOM对象）
 *            @example
 *            MI.talkList = new MI.TalkList('talkList');
 */
MI.TalkList = function(id){ //Talk List
	var Self = this,_more = $('moreList');
	Self._body = UI.isString(id) ? $(id) : id;
	Self._more = Self._bottom = _more ? $$(_more,'a')[0] : UI.DC('a');
	Self._new = $('talkNew'); //New Talk Button
	Self._list = UI.children(Self._body);
	Self._talk = UI.html(MI.tmpl.reply)[0];
	//Self._relay = UI.html(html.replace(/<\/textarea>/g,'').replace(/textarea/g,'input'))[0];
	Self._relay = UI.html(MI.tmpl.reply.replace('<div class="left"></div>','<div class="left"><label for="replayQzoneCheckbox" style="display:"><input id="replayQzoneCheckbox" type="checkbox" class="check1">' + _('分享到空间') + '</label></div>'))[0];
	Self._comt = UI.html(MI.tmpl.reply.replace('<div class="left"></div>','<div class="left"><label for="replayListCheckbox" style="display:"><input id="replayListCheckbox" type="checkbox" class="check1">' + _('同时转播') + '</label></div>'))[0];

	//Delete Confirm
	Self._confirm = UI.html('<div class="delChose"><span></span><br><input value="' + _('确定') + '" type="button">&nbsp;&nbsp;<input value="' + _('取消') + '" type="button"></div>')[0];
	Self._confirmTip = $$(Self._confirm,'span')[0];
	var button = $$(Self._confirm,'input');
	button[0].onclick = function(){
		//音乐播放器 如果删除的广播正在播放音乐，则停止播放音乐。否则不停止播放。
		try{
			var s = 0;
			var p = MI.TalkList.lastMusic;
			if(p){
				try{
					if(this.parentNode.tid == p.parentNode.parentNode.parentNode.id)	s=1;
				}catch(e){}
			}
			if(s){
				MI.TalkList.musicClose();
			}
		}catch(e){}
		Self.remove(this.parentNode.tid,this.parentNode.type);
	}
	button[1].onclick = function(){
		UI.removeClass(this.parentNode.parentNode.parentNode,'hover');
		UI.remove(Self._confirm);
	}

	setTimeout(function(){
		//Cache Last
		Self.cacheLast();
		//Cache First
		Self.cacheFirst();
	},0);
	
	//Event
	if (Self._more) {
		Self._more.onmouseover = MI.hideFocus;
		Self._more.onclick = function(e){
			Self.more();
			UI.E(e).prevent();
		}
		//Self._more.onfocus = MI.blur;
	}
	if (Self._new) {
		Self._new.onclick = function(){
			Self.newly();
			MI.Bos('btnkNew');
			return false;
		}
		var hideNewDelay;
		UI.EA(window,'scroll',function(){
			clearTimeout(hideNewDelay);
			hideNewDelay = setTimeout(hideNew,50);
		});
		function hideNew(){
			if (Self.news){
				var y = UI.scrollY() + UI.windowHeight();
				UI.each(Self._news,function(o){
					if (UI.hasClass(o,'newMsg') && UI.getY(o) + UI.height(o) + 70 < y) {
						UI.removeClass(o,'newMsg');
						Self.news--;
					}
				});
			}
		}
	}
	setTimeout(function(){ //页面渲染玩再执行
		Self.bottom();
		for (var i = 0,num = Self._list.length;i < num;i++) {
			Self.addEvent(Self._list[i]);
		}
		Self.addFollowBtn(Self._body);
		if (MI.user.account) {
			Self.card();
		}
		/*UI.EA(document.body,'click',function(){
			Self.relayListHide();
		});*/
		Self.buildTips();

		Self._body.onmouseover = function(){ //非盲人不做焦点处理
			Self.focus = function(){
			
			}
			Self._body.onmouseover = null;
		}

	},0);
	MI.app({
		Music : null
	});
	
	Self.iconPic = MI.user.fun.iconPic;
	if (Self.iconPic){
		UI.addClass(Self._body,'iconPic');
	}
}
/**
 * 通过tweet dom引用获得上次转播的内容
 * @param {Object} tweetDom 该tweet的dom引用
 * @param {Object} oldMessageDom 该tweet中的上次转播内容的容器dom，如果忽略，将自动使用className为msgCnt的dom元素
 */
MI.TalkList.getRelayOld = function (tweetDom, oldMessageDom) {
	var cont = oldMessageDom || UI.GC(tweetDom, '.msgCnt')[0],
		contClone,
		relayCite = UI.GC(tweetDom, 'strong a')[0],
		relayCiteAccount = MI.string.account(relayCite.title ||
			UI.A(relayCite, 'rel')),
		noRelayOld,
		result = '';

	if (cont) {
		if (UI.GC(tweetDom, '.replyBox').length === 0) {
			noRelayOld = 1;
		}
	}
	contClone = cont.cloneNode(1);
	if (!noRelayOld) {
		UI.each(UI.GC(contClone, 'em'), function (obj) {
			var account = UI.A(obj, 'rel');
			if (account) {
				obj.innerHTML = account;
			}
		});
		UI.each(UI.GC(contClone, 'img'), function (oneImg) {
			var face = oneImg.title;
			if (face) {
				UI.after(UI.html('<b>/' + face + '</b>')[0], oneImg);
			}
		});
		UI.each(UI.GC(contClone, '.btn_trans'), function (oneTrans) {
			UI.remove(oneTrans);
		});
		result = ' || @' + relayCiteAccount + ': ' +
			UI.text(contClone);
	}

	return result;
};
MI.TalkList.prototype = {
	/**
	 * 当前操作消息的ID
	 * @type String
	 */
	cur : null, //Current List
	/**
	 * 当前操作消息的来源消息ID
	 * @type String
	 */
	curSource : null, //Current List's Sourse Message
	/**
	 * 当前talklist是否是群的
	 * @type boolean
	 */
	isQun:0,
	/**
	 * 消息列表的为空提示DOM
	 * @type String
	 */
	_tip : null, //List Tip
	/**
	 * 新广播数组（用于黄色背景交互）
	 * @type String
	 */
	_news : [], //New Talks
	/**
	 * 未读新广播数（用于黄色背景交互）
	 * @type Number
	 */
	news : 0, //New Talk's Number
	/**
	 * 是否开启日历模式
	 * @type Boolean
	 *            @example
	 *            MI.talkList.date = 1;
	 */
	date : 0,
	/**
	 * 消息列表类型
	 * @type Number
	 *            @example
	 *            //0-普通列表 1-群微博列表对外， 2-群微博列表对内
	 *            MI.talkList.type = 1;
	 */
	type : 0,
	/**
	 * 客人页用户ID
	 * @type String
	 *            @example
	 *            MI.talkList.guest = 'liuxiang';
	 */
	guest : '',
	/**
	 * 滚动到页面底部是否自动加载更多消息
	 * @type Boolean
	 *            @example
	 *            MI.talkList.auto = 1;
	 */
	auto : 0,
	/**
	 * 转播列表是否支持同时打开多个
	 * @type Boolean
	 *            @example
	 *            MI.talkList.relayListMulti = 1;
	 */
	relayListMulti : 0,
	/**
	 * 特殊转播列表（暂时为：At聚合、二次转播）
	 * @type Boolean
	 *            @example
	 *            MI.talkList.relayListSpecial = 1;
	 */
	relayListSpecial : 0,
	/**
	 * 当前的At聚合按钮
	 * @type Boolean
	 *            @example
	 */
	relayAtCur : 0,
	/**
	 * At聚合的查看模式（默认为0）
	 * @type Boolean
	 *            @example
	 *            MI.talkList.relayAtModel = 1;
	 */
	relayAtModel : 0,
	/**
	 * 当前的二次转播按钮
	 * @type Boolean
	 *            @example
	 */
	relay2Cur : 0,
	/**
	 * 转播列表是否是默认打开切隐藏talkbox
	 * @type Boolean
	 *            @example
	 *            MI.talkList.msgMode = 1;
	 */
	msgMode : 0,
	/**
	 * 头像下是否有收听按钮
	 * @type Boolean
	 *            @example
	 *            MI.talkList.followBtn = 1;
	 */
	followBtn : 0,
	/**
	 * 消息列表模版
	 * @type String
	 *            @example
	 *            MI.talkList.tmpl = '';
	 */
	tmpl : '', //List Tmpl
	/**
	 * 是否显示Icon图片
	 * @type Boolean
	 *            @example
	 *            MI.talkList.iconPic = 1;
	 */
	iconPic : 0, //Use Simple View Model
	moreTimes : 0, //More Times
	/**
	 * 拉取新消息的地址
	 * @type String
	 */
	newlyUrl : MI.url.newly, //新消息拉取地址
	/**
	 * 拉取新消息后的回调函数
	 * @type String
	 */
	newlyCall : null,
	/**
	 * 拉取新消息时是否强制刷新
	 * @type Boolean
	 */
	refresh : 0, //Refresh Home Page Always
	/**
	 * 拉取新消息后刷新跳往的地址
	 * @type Boolean
	 */
	refreshUrl : '', //刷新去往的地址
	/**
	 * 删除消息的地址
	 * @type String
	 */
	removeUrl : MI.url.talkDel,
	/**
	 * 删除消息的提示
	 * @type String
	 */
	removeTip : _('确定删除这条广播？'),
	/**
	 * 删除消息的回调函数
	 * @type Function
	 */
	removeCall : 0, //Call Function After Remove
	/**
	 * 收藏消息的地址
	 * @type String
	 */
	favorUrl : MI.url.talkFavor,
	/**
	 * 屏蔽消息的地址
	 * @type String
	 */
	shieldUrl : MI.url.talkShield,
	/**
	 * 取消收藏消息的提示
	 * @type String
	 */
	unfavTip : _('确定删除这条收藏？'),
		/**
	 * 取消屏蔽消息的提示
	 * @type String
	 */
	unShieldTip : _('确定取消屏蔽这条信息？'),
	shieldTip : _('不再接收来自本条广播的<br>@提醒？'),
	xhr : {}, //Cache XHR
	/**
	 * 最后一条消息属性
	 * @type Object
	 *            @example
	 *            //{fav:0,id:"13065094958415",time:"1300803067"}
	 *            var id = MI.talkList.last.id;
	 */
	last : {}, //Cache Last List's Info
	/**
	 * 第一条消息属性
	 * @type Object
	 *            @example
	 *            //{fav:0,id:"13065094958415",time:"1300803067"}
	 *            var id = MI.talkList.first.id;
	 */
	first : { //Cache First List's Info
		time : 1
	},
	add : [], //Cache Added List
	time : [],
	/**
	 * 更多的页数
	 * @type Number
	 *            @example
	 */
	page : 1,
	lastVideo : null,
	lastMusic : null,
	musicState : 0,//Music Play State 0:stop,1:playing,2:pause
	musicPlayDetec : 0,
	musicDelay : 0,
	card : function(){
		var Self = this;
		MI.app({
			Base : function(){
				setTimeout(function(){
					MI.Card.build(Self._body,'.userPic img',1);
					MI.Card.build(Self._body,'.msgBox strong a,.msgBox em a',2);
				},100);
			}
		});
	},
	buildTips : function(area){ //Build Phone Tips And Url Tips
		var Self = this;
		MI.app({
			Base : function(){
				setTimeout(function(){
					MI.tips.build({
						area : area || Self._body,
						target : '.ico_phone',
						txt : MI.Tips.txt[0]
					});
					MI.tips.build({
						area : area || Self._body,
						target : '.url,.ico_video,.ico_vote',
						txt : Self.urlTips,
						click : function(){
							MI.Bos('btnClickUrl');
						},
						width : 220
					});
					MI.tips.build({
						area : area || Self._body,
						target : '.ico_dyh',
						txt : Self.sportTips,
						click : function(){
							MI.Bos('btnClickDyh');
						}
					});
				},100);
			}
		});
	},
	replyBox : {}, // 对话
	relayBox : {}, // 转播
	comtBox : {}, // 评论
	checkTalkId : function(){ //验证发表框ID
		
	},
	creatBox : function(){
		var Self = this,
			box = [new MI.TalkBox(Self._talk),new MI.TalkBox(Self._relay),new MI.TalkBox(Self._comt)];
		UI.each(['replyBox','relayBox','comtBox'],function(o,i){
			for (var j in Self[o]){
				box[i][j] = Self[o][j];
			}
			Self[o] = box[i];
		});
	
		//Count TalkBox's Type For Product
		//Self.replyBox.countType = 3;
		//Self.relayBox.countType = 4;
	
		Self.replyBox.autoHeight = 30;
		Self.relayBox.autoHeight = 136;
		Self.comtBox.autoHeight = 136;
		Self.replyBox.txtTipSend = _('发送中');
		Self.relayBox.txtTipSend = _('转播中');
		Self.comtBox.txtTipSend = _('评论中');
		Self.replyBox._btn.title = _('发送');
		Self.relayBox._btn.title = _('转播');
		Self.comtBox._btn.title = _('评论');
		if(Self.type == 1 || Self.type == 2)
		{
			Self.comtBox._btn.title = _('评论');
		}
		Self.replyBox.hideCall = Self.relayBox.hideCall = Self.comtBox.hideCall = function(){
			UI.removeClass($(Self.cur),'cur');
		};
		Self.replyBox.start = Self.relayBox.start = Self.comtBox.start = function(){
			Self.checkTalkId();
			Self.updateRelayNum();
			Self.talkBox._txt.blur();
			Self.focus();
		}
		Self.replyBox.success = Self.relayBox.success = Self.comtBox.success = function(data){
			Self.talkBox.hide();
			Self.talkBox.display = 0;
			UI.removeClass($(Self.cur),'hover');
			if (Self._relayNum) {
				UI.each(Self._relayNum,function(o,i){
					if (!(Self.talkBox.type != 1 && i)){ //评论的二次转播数不+1
						MI.countNum(o,1);
					}
				});
				Self._relayNum = null;
			}
			if (Self.relayCall && Self.talkBox.type == 1){
				Self.relayCall(data);
			}
			else if (Self.replyCall && Self.talkBox.type == 2){
				Self.replyCall(data);
			}
			else if (Self.commentCall && (Self.talkBox.type == 4 || Self.talkBox.type == 5)){
				Self.commentCall(data);
			}
		};
		Self.relayBox._numSon = $$(Self.relayBox._body,'.number')[0];
		Self.relayBox._relayCheck = $$(Self.relayBox._body,'.check1')[0];
		Self.relayBox._relayCheck.onclick = function(){
			Self.relayBox.data.share = this.checked ? 1 : 0;
			MI.Bos('btnRelayQzoneCheckbox');
		}
		Self.comtBox._numSon = $$(Self.comtBox._body,'.number')[0];
		Self.comtBox._relayCheck = $$(Self.comtBox._body,'.check1')[0];
		Self.comtBox.addListCheck = 0;
		Self.comtBox._relayCheck.onclick = function(){
			var checked = this.checked;
			Self.comtBox.type = checked ? 1 : 5;
			Self.comtBox.talkId = checked ? Self.cur : Self.curSource;
			Self.comtBox._tip.innerHTML = '';
			Self.comtBox.countTxt();
			if (!Self.comtBox.addList || Self.comtBox.addListCheck){
				Self.comtBox.addList = checked ? Self.relayBox.addList : 0;
				Self.comtBox.addListCheck = 1;
			}
			MI.Bos('btnRelayistCheckbox');
		}
		
		//评论列表
		/*
		Self.comtBox._relayList = UI.html('<div class="relayList"></div>')[0];
		UI.append(Self.comtBox._relayList,Self.comtBox._body);
		*/
	
		if (UI.B.ipad) { //Focus To The First Position
			UI.EA(Self.relayBox._txt,'focus',function(){
				setTimeout(function(){
					MI.selectTxt(Self.relayBox._txt,0,0,0);
				},100);
			});
		}
	
		UI.EA(Self.replyBox._close,'click',function(){
			Self.replyHide();
		});
		UI.EA(Self.relayBox._close,'click',function(){
			Self.replyHide();
		});
		UI.EA(Self.comtBox._close,'click',function(){
			Self.replyHide();
		});
		
		Self.creatBox = function(){
		}
	},
	bosHead : function(){
		MI.Bos('btnHead');
	},
	focus : function(){ //Focus To Current List's Time
		if (UI.hasClass(document.body,'ipad')) {
			return;
		}
		var Self = this,time = $$($(Self.cur),'.time'),length = time.length;
		if (length) {
			time = time[length - 1];
			if (UI.B.ie) { //IE中按Tab时焦点会丢掉，很怪异，没找到原因，先这样处理
				time.onfocusout = function(){
					if (document.activeElement.nodeName == 'BODY'){
						time.focus();
					}
				}
			}
			time.focus();
		}
	},
	remove : function(id,type,veriCode){
		id = String(id);
		var Self = this,
			talk = $(id),
			url = Self.removeUrl,
			data = {r:MI.random()},
			favBtn,
			shieldBtn;
		if (isNaN( parseInt(id) )){
			data.id = id;
		}
		else {
			data.id = parseInt(id);
		}
		if (veriCode) {
			data.veriCode = veriCode;
		}
		if (type) {
			url = Self.favorUrl;
			data.op = type < 2 ? 1 : 2;
		}
		if (Self.mId) { //For Delete Comment
			data.mId = Self.mId;
		}
		if(Self.type == 1 || Self.type == 2 || 
			MI.user.fun.btnStyle == 6 || MI.user.fun.btnStyle == 5)
		{
			// TODO::
			if(MI.Group.qid)
			{
				data.time = ($$(talk,'.time')[0].rel);;
				data.qid = MI.Group.qid;
				data.zone = Self.type?Self.type:MI.TalkBox.prototype.data.cflag;
			}
		}
		var temp = data.id;
		if(type == 4){  //屏蔽
			data={id:temp,t:0};
			url = Self.shieldUrl;
		}
		else if(type == 5 || type == 6){ //取消屏蔽
			data = {id:temp,t:1};
			url = Self.shieldUrl;
		}
		if (!talk.sending) {
			MI.ajax({
				url : url,
				data : data,
				type : 'post',
				success : function(data){
					talk.sending = 0;
					data = MI.json(data);
					if (data.result == 0) {
						favBtn = $$(talk,'.fav')[0];
						shieldBtn = $$(talk,'.shield')[0];
						if (type == 1) {
							UI.addClass(favBtn,'light');
							favBtn.innerHTML = _('取消收藏');
							favBtn.type = 3;
							//favBtn.blur();
						}
						else {
							UI.remove(Self._confirm);
							if (type == 4){
								UI.addClass(shieldBtn,'light');
								shieldBtn.innerHTML = _('取消屏蔽');
								shieldBtn.type = 5;
							}
							else {
								if (MI.talkBox && !type && data.info != 7) {
									MI.talkBox.countNum(-1);
								}
								if (type == 3) {
									UI.removeClass(favBtn,'light');
									favBtn.innerHTML = _('收藏');
									favBtn.type = 1;
									//favBtn.blur();
								}
								else if(type == 5){
									UI.removeClass(shieldBtn,'light');
									shieldBtn.innerHTML = _('屏蔽@提醒');
									shieldBtn.type = 4;
									//UI.remove(talk);																	
								}
								else {
									UI.addClass(talk,'delMsg'); //Add Delete CSS
									setTimeout(function(){
										if (UI.hasClass(talk,'orginCnt')){ //消息底层页，删除后跳到首页
											MI.tip(_('删除成功'),function(){
												MI.goHome();
											})
										}
										else {
											UI.animate(talk,'opacity',0,function(){
												UI.remove(talk);
												/*if (Self.tip && !UI.children(Self._body).length) { //提示显示隐藏有问题
													UI.append(Self.tip,Self._body);
												}*/
												//Check More's Position
												Self.bottom();
											});
										}
									},300);
								}
							}
						}
						if (Self.removeCall) {
							Self.removeCall();
						}
					}
					else if (MI.code.check(data.result)) {
						MI.code.show({msg:data.msg,code:data.info,call:function(code){
							Self.remove(id,type,code);
						}});
					}
					else if (data.msg){
						//alert(data.msg);
					}
				}
			});

			talk.sending = 1;
		}
	},
	fav : function(id,type){
		this.remove(id,type);
	},
	confirm : function(id,type,call){
		id = String(id);
		var Self = this,
			talk = $(id),
			msg = $$(talk,'.msgBox')[0],
			tipMsg;
		if(type){ //type=6时，屏蔽删除，type=2，收藏删除, type =4, 屏蔽消息二次提醒
		if(type == 2) tipMsg = Self.unfavTip;
		else if(type == 4) tipMsg = Self.shieldTip;
			else if(type == 6) tipMsg = Self.unShieldTip;
		}
		var	tip = type ? tipMsg : Self.removeTip,
			replyBox = $$(talk,'.replyBox')[0],
			relayNum = $$(talk,'.relayNum')[0];
		UI.append(Self._confirm,msg);
		Self.relayListHide(id);
		setTimeout(function(){
			$$(Self._confirm,'input')[0].focus();
		},0);
		Self._confirm.tid = talk.id;
		Self._confirm.type = type;
		if (!type && !replyBox && relayNum){
			tip = _('这条广播已经被{0}人转播点评过，确认删除吗？',relayNum.innerHTML);
		}
		Self._confirmTip.innerHTML = tip;

		if (Self.talkBox && Self.talkBox.display && Self.cur == talk.id) { //Hide TalkBox When Click Delete Button
			UI.remove(Self.talkBox._body);
			UI.removeClass(talk,'cur');
			Self.talkBox.display = 0;
		}
	},
	/**
	 * 转播成功的回调函数
	 * @type Function
	 */
	relayCall : null,
	/**
	 * 对话成功的回调函数
	 * @type Function
	 */
	replyCall : null,
	/**
	 * 评论成功的回调函数
	 * @type Function
	 */
	commentCall : null,
	replyCont : '', //对话、转播、评论时输入框的默认值
	replyTarget : null, //对话、转播、评论链接按钮
	reply : function(id,type,number){ //type : 0(reply) 1(relay) 2(comt)
		var Self = this,
			li = $(id);
		if (MI.card) {
			UI.remove(MI.card._body);
		}

		//Relay List
		Self.relayListHide(id);

		if (Self.talkBox) {
			Self.talkBox.hide();
			if (Self.replyTarget){
				Self.replyTarget.cont = Self.talkBox._txt.value;
			}
		}
		if (Self.talkBox && Self.cur && Self.cur != id && Self.talkBox.display) {
			Self.talkBox.display = 0;
		}
		if (type == 2) {
			Self.talkBox = Self.comtBox;
		}
		else {
			Self.talkBox = type ? Self.relayBox : Self.replyBox;
		}

		Self._talk = Self.talkBox._body;
		Self.talkBox.iconPic = Self.iconPic;
		Self.talkBox.startTime = 0;
		UI.C(Self.talkBox._txt,'height','');
		UI.removeClass(Self.talkBox._btn,'disabled');
		UI.removeClass(Self._talk,'pubSuc');
		if (!Self.talkBox.display) {
			var sourceId = id,
				cur = Self.cur,
				viewRelay = $$(li,'.zfNum')[0],
				author = $$(li,'.userName a')[0],
				name = '',
				name2,
				account,
				vip = $$(li,'.userName .vip').length,
				expo = $$(li,'.userName .ico_expo').length,
				url = '',
				title = '',
				cont = $$(li,'.msgCnt')[0],
				contClone = cont ? cont.cloneNode(1) : UI.DC('b'),
				content,
				contentBase,
				contentTmp,
				/*contentTopic,
				contentTopicLength,*/
				replyBox = $$(li,'.replyBox')[0],
				relay = $$(li,'.replyBox .msgCnt')[0],/*relayUser,*/
				userPic = $$(li,'.userPic')[0],
				addReplyTxt,
				talkBoxTxt = Self.talkBox._txt;
			if (author){
				name = author.innerHTML;
				url = author.href;
				title = author.title || UI.A(author,'rel');
			}
			if (viewRelay){
				sourceId = viewRelay.href.match(/[^\/]+$/g)[0];
			}
			//<a hre="" rel="@account">nick</a> : Replace "nick" Use "@account"
			if (type) { //Don't Change For Reply
				UI.each($$(contClone,'em'),function(o){
					var account = UI.A(o,'rel');
					if (account) {
						o.innerHTML = account;
					}
				});
				UI.each($$(contClone,'img'),function(o){
					var face = (UI.A(o,'k') || '') + o.title;
					if (face) {
						UI.after(UI.html('<b>/' + face + '</b>')[0],o);
					}
				});
				UI.each($$(contClone,'.btn_trans'),function(o){
					UI.remove(o);
				});
			}
			content = contentBase = UI.text(contClone);

			if (relay) {
				contentTmp = UI.text(relay).split(':');
				if (type) {
					name2 = name;
					name = contentTmp[0];
				}
				contentTmp = contentTmp.slice(1).join(':');
				if (type) {
					content = contentTmp;
				}
			}
			/*if (!replyBox) {
				content = name + ':&nbsp;"' + content;
			}*/
			if (cur) {
				UI.removeClass($(cur),'cur');
			}
			UI.addClass(li,'cur');

			this._relayNum = type ? $$(li,'.relayNum') : null;

			var className,curTitle,
				//relayTitle = '转播 <b>' + name + '</b>: "' + MI.string.html(MI.string.cut(content,20)) + '"',
				relayTitle = '',
				replyTitle = _('对话是半公开的，不会出现在你听众的主页上，但是可以到你的页面看到<br>对 <b>{0}</b> 说:',name),
				//comtTitle = relayTitle.replace('转播','评论'),
				comtTitle = '',
				delayAddReply;
			relayTitle += _('<br>顺便说两句:');
			//Title
			if (type == 2) {
				curTitle = comtTitle;
			}
			else {
				curTitle = type ? relayTitle : replyTitle;
			}
			$$(this._talk,'.replyTitle')[0].innerHTML = curTitle;

			//ClassName
			if (type == 2) {
				className = 'talkWrap comtWrap';
				if(Self.type==1 || Self.type==2)
				{
					//className = 'talkWrap';
				}
			}
			else {
				className = type ? 'zfWrap' : 'talkWrap';
			}
			this.talkBox._body.className = className;

			account = MI.string.account(title);
			if (replyBox && name2 && (type == 1 || type == 2)) { //添加转播评论
				this.talkBox._addReply.innerHTML = '&nbsp;<a href="#">[' + (type == 1 ? _('清空转播理由') : _('清空评论')) + ']</a>';
				addReplyTxt = this.talkBox._addReply.txt = ' || @' + account + ': ' + UI.trim(contentBase);
				UI.show(this.talkBox._addReply);
				if (!UI.B.ipad) {
					talkBoxTxt.onkeyup = function(){
						clearTimeout(delayAddReply);
						delayAddReply = setTimeout(function(){
							if (!talkBoxTxt.value.hasString(addReplyTxt)) {
								UI.hide(Self.talkBox._addReply);
								talkBoxTxt.onkeyup = null;
							}
						},400);
					}
				}
			}
			else {
				UI.hide(this.talkBox._addReply);
				talkBoxTxt.onkeyup = null;
			}
			//Bug After Gzip
			//$$(this._talk,'.replyTitle')[0].innerHTML = type ? '转播 "' + MI.string.escape(content.slice(0,30)) + (content.length > 30 ? '...' : '') + '"<br/>再说两句:' : '回复 ' + name + ':';

			//Set TalkBox Prototype
			if (isNaN( parseInt(id) )){
				Self.talkBox.talkId = id;
			}
			else {
				Self.talkBox.talkId = parseInt(id);
			}
			Self.talkBox.type = type ? 1 : 2;
			if (!Self.comtBox._relayCheck.checked && type == 2) { //评论
				Self.talkBox.talkId = Self.curSource;
				Self.talkBox.type = 5;
			}
			/*if (relay) {
				relayUser = $$(li,'.replyBox strong')[0].innerHTML;
			}
			else {
				relayUser = $$(li,'.userName strong')[0].innerHTML;
				if (!relayUser.match(/:$/g)) {
					relayUser += ':';
				}
			}*/
			/*this.talkBox.action = type ? '转播:&nbsp;' : '对<strong class="userTo"><a href="' + url + '" title="' + name + '(@' + account + ')">' + name + '</a>' + (vip ? '<a href="/certification" target="_blank" class="vip" title="腾讯认证"></a>': '') + (expo ? '<a href="/certification" target="_blank" class="ico_expo" title="上海世博"></a>': '') + '说:</strong>';
			if (type && !replyBox) {
				var clone = li.cloneNode(1),msgCnt = $$(clone,'.msgCnt')[0];
				UI.remove($$(clone,'.zfWrap')[0]);
				UI.remove($$(clone,'.talkWrap')[0]);
				UI.remove($$(clone,'.funBox')[0]);
				UI.C($$(clone,'.userName')[0],'display','inline');
				UI.C(msgCnt,'display','inline');
				msgCnt.innerHTML = msgCnt.innerHTML;
			}
			this.talkBox.source = {
				type : type ? 1 : 2,
				content : type ? (replyBox ? replyBox.innerHTML : clone.innerHTML) : contentBase,
				nick : name,
				cusPic : ( userPic && userPic.innerHTML.replace(/cusPic/gi,'hide').replace(/<a/i,'<a class="cusPic"') ) || 0 //Small Pic For Reply
			};*/

			this.talkBox._txt.value = '';
			/*contentTopic = (contentTmp || content).match(/(#\s*[^#\s]{1}[^#]{0,59}?\s*#)/g); //Auto Add Topic

			this.talkBox._txt.value = contentTopic && type ? contentTopic.join('') : '';
			contentTopicLength = this.talkBox._txt.value.length*/
			this.talkBox.countTxt();
			var atDetail = $$(li,'.at_detail')[0];
			if (atDetail){ //如果有At聚合，就插到At聚合前面
				UI.before(this._talk,atDetail);
			}
			else {
				UI.append(this._talk,$$(li,'.msgBox')[0]);
			}
			setTimeout(function(){
				talkBoxTxt.focus();
				if (Self.replyCont){
					talkBoxTxt.value += Self.replyCont;
				}
				if (addReplyTxt && !Self.replyCont) { //自动添加转播评论
					talkBoxTxt.value += addReplyTxt;
				}
				Self.talkBox.countTxt();
				MI.selectTxt(talkBoxTxt,0,0,0);
			},50);

			//Relay And Comt's Number
			if (type != 0) {
				var numHTML,
					numberType = type == 1 ? _('转播') : _('评论'),
					bossName = type == 1 ? 'Relay' : 'Comt',
					link = type == 1 ? '?t=1' : '?t=2';
				if((Self.type==1 || Self.type==2) && type!=1)
				{
					numberType =  _('评论');
				}
				numHTML = numberType + _('原文');
				if (number > 0){
					numHTML += '，<a href="http://t.qq.com/p/t/' + sourceId + '/' + link + '" onclick="MI.Bos(\'btn' + bossName + 'View\')" target="_blank">' + 
						((number != 0 && number) ? _('共{0}条',number) + numberType : '') + '<em class="ffsong">>></em></a>';
				}
				else {
					numHTML += type == 1 ? '，把它分享给你的听众' : '';
				}
				Self.talkBox._numSon.innerHTML = numHTML;
			}

			this.cur = id;
			this.talkBox.display = 1;
		}
		else {
			this.talkBox.hide();
			this.replyHide();
		}
		var boxs = [this.replyBox,this.relayBox,this.comtBox];
		UI.each(boxs,function(o,i){
			if (type != i) {
				o.hide();
				o.display = 0;
			}
		});
		if (this.replyBox.display || this.relayBox.display || this.comtBox.display) {
			UI.addClass($(this.cur),'cur');
			if (UI.B.ie6){
				UI.addClass($(this.cur),'hover');
			}
		}

		Self.setArrow($$(this.talkBox._body,'.SA')[0]);
		
		function checkTalkId(){ //兼容没有微博ID的情况
			var id = li.id;
			if (isNaN( parseInt(id) )){
				Self.talkBox.talkId = id;
			}
			else {
				Self.talkBox.talkId = parseInt(id);
			}
		}
		Self.checkTalkId = UI.isElement(id) ? checkTalkId : function(){};
	},
	replyHide : function(){
		UI.removeClass($(this.cur),'cur');
		UI.removeClass($(this.cur),'hover');
		if (this.talkBox) {
			this.talkBox.display = 0;
		}
	},
	/**
	 * 查看转播的的配置项
	 * @type Object
	 *            @example
	 *            MI.talkList.relayListOption = {
	 *                url : ''
	 *            }
	 */
	relayListOption : null,
	relayListCreate : function(id){
		id = id || '';
		var Self = this,
			relayList = '_relayList' + id,
			relayListLoad = '_relayListLoad' + id,
			relayListCont = '_relayListCont' + id;
		Self[relayList] = UI.html('<div class="relayList"><div class="top"><span class="left"><a href="#" class="vClose"><em></em>' + _('收起') + '</a></span><a class="w_close" href="#" title="' + _('点击关闭') + '"><b class="close"></b></a></div><div class="loading">' + _('正在加载') + '...</div><div class="cont"></div></div>')[0];
		Self[relayListLoad] = $$(Self[relayList],'.loading')[0];
		Self[relayListCont] = $$(Self[relayList],'.cont')[0];
		$$(Self[relayList],'.w_close')[0].onclick = function(){
			var T = this;
			if (UI.B.ie) { //Kill ":hover" Bug In IE
				UI.C(T,'left','9999px');
			}
			setTimeout(function(){
				Self.relayListHide(id);
				UI.C(T,'left','');
			},0);
			MI.Bos('btnRelayListClose');
			return false;
		}
		var _relayListCont = Self[relayListCont];
		$$(Self[relayList],'.left a')[0].onclick = function(){
			Self.relayListHide(id);
			MI.Bos('btnRelayListUp');
			return false;
		}
		_relayListCont.ondblclick = function(){ //Auto Go Next Page When Double Click
			var hasNext = 0;
			UI.each($$(Self[relayListCont],'.pages a'),function(o){
				if (o.innerHTML.hasString(_('下一页'))) {
					hasNext = o;
				}
			});
			if (hasNext) {
				hasNext.onclick();
			}
			else {
				Self.relayListPosition();
				Self.relayListHide(id);
			}
			MI.S('tips_relayList_' + MI.user.account,-1);
		}
		if (UI.B.ie) { //Kill Select Txt Bug In IE
			_relayListCont.onmousedown = function(){
				_relayListCont.onselectstart = null;
			}
			_relayListCont.onmouseup = function(){
				_relayListCont.onselectstart = function(){
					return false;
				}
			}
		}
		/*Self._relayList.onclick = function(e){ //For Hide List When Click Other Space
			UI.E(e).stop();
		}*/
	},
	relayListHide : function(id){
		var relayList = this['_relayList' + id] || this['_relayList'];
		if (relayList && relayList.display) {
			UI.remove(relayList);
			relayList.display = 0;
			UI.removeClass($(this.cur),'cur');
			UI.removeClass($(this.cur),'hover');
			this.relayAtCur = null; //At聚合
			this.relay2Cur = null; //二次转播
			this.focus();
		}
	},
	getRelayOld : function(o,content,relayBox){
		var cont = $$(o,content)[0],
			contClone,
			relayCite = $$(o,'strong a')[0],
			relayCiteUrl = relayCite.href.split('/'),
			relayCiteAccount = MI.string.account(relayCite.title || UI.A(relayCite,'rel')),
			text = '',
			noRelayOld;
		if(cont){
			if ($$(o,'.time').length == 1) {
				noRelayOld = 1;
			}
			contClone = cont.cloneNode(1);
			if (!noRelayOld || !relayBox) {
				UI.each($$(contClone,'em'),function(o){
					var account = UI.A(o,'rel');
					if (account) {
						o.innerHTML = account;
					}
				});
				UI.each($$(contClone,'img'),function(o){
					var face = (UI.A(o,'k') || '') + o.title;
					if (face) {
						UI.after(UI.html('<b>/' + face + '</b>')[0],o);
					}
				});
				UI.each($$(contClone,'.btn_trans'),function(o){
					UI.remove(o);
				});
				text = ' || @' + relayCiteAccount +': ' + UI.text(contClone);
			}
		}
		else {
			text = ' || @' + relayCiteAccount +': ';
		}
		if (relayBox){
			relayBox._txt.value = text;
			try{
				relayBox._txt.focus();
				MI.selectTxt(relayBox._txt,0,0,0);
				relayBox.countTxt();
			}catch(e){}
		}
		else {
			return text;
		}
	},
	updateRelayNum : function(type){
		var el = $(this.cur),
			type = type || this.talkBox.type,
			button,
			className;
		if (type == 4 || type == 5){
			className = '.comt';
		}
		else if (type == 1){
			className = '.relay';
		}
		if (className && el){
			button = $$(el,className)[0];
			if (button){
				UI.A(button,'num',1 + parseInt(UI.A(button,'num')));
			}
		}
	},
	report : function(id,el){
		var Self = this,
			type = MI.user.fun.fastReport;
		if (el.innerHTML != _('举报')){ // 去掉fun.fastReport限制，强制有删除功能
			MI.ajax({
				url : MI.url.reportSpam,
				data : {id:id,type:1},
				success : function(data){
					data = MI.json(data);
					if (data.result == 0){
						var talk = $(id);
						MI.tip(_('删除成功'),function(){
							if (UI.hasClass(talk,'orginCnt')){ //消息底层页，删除后跳到首页
								MI.goHome();
							}
							else {
								UI.animate(talk,'opacity',0,function(){
									UI.remove(talk);
									Self.bottom();
								});
							}
						});
					}
				}
			});
			MI.Bos('btnReportFast');
		}
		else {
			var name = UI.A($$($(id),'.userName')[0] || $$($(id),'.msgCnt strong a')[0],'rel');
			jubao_msg(id,name);
		}
	},
	reportQun : function(id, qid, zone)
	{
		zone=zone?zone:1;
		var name = UI.A($$($(id),'.userName')[0] || $$($(id),'.msgCnt strong a')[0],'rel');
		jubao_qun_msg(id,qid,zone);
	},
	setArrow : function(el){
		el.style.cssText = 'left:' + (this.setArrow.x + 3) + 'px';
	},
	setArrowX : function(el,time){
		time = time.length == 2 ? time[1] : time[0];
		if (time){
			this.setArrow.x = UI.getX(el) - UI.getX(time) - 12 + (UI.width(el) - 24) / 2;
		}
	},
	addFollowBtn : function(el){
		if (this.followBtn){
			MI.FollowBtn.build(el,'.userPic a');
		}
	},
	/**
	 * 事件回调函数
	 * @type Function
	 * @param {Object} Object 列表DOM（一般是li）
	 *            @example
	 *            MI.talkList.eventCall = function(li){
	 *                
	 *            }
	 */
	eventCall : null,
	addEvent : function(el){
		var Self = this,
			elId = el.id,
			time = $$(el,'.time'),
			userPic = $$(el,'.userPic img'),
			from = $$(el,'.f'),
			view = $$(el,'.view')[0],
			fav = $$(el,'.fav')[0],
			unfav = $$(el,'.light.fav')[0],
			shield = $$(el,'.shield')[0],    //屏蔽
			unshield = $$(el,'.light.shield')[0],  //取消屏蔽
			report = $$(el,'.alarm'),
			viewContent = $$(el,'.talkDetail')[0],
			_viewRelay = $$(el,'.zfNum'),
			viewRelay = _viewRelay[_viewRelay.length - 1],
			viewRelay2 = $$(el,'.zfNum2')[0],
			viewRelayAt = $$(el,'.at_detail')[0],
			content = $$(el,'.msgCnt')[0],
			comt = $$(el,'.comt')[0],
			reply = $$(el,'.reply')[0],
			relay = $$(el,'.relay')[0],
			del = $$(el,'.delBtn')[0],
			moreFun = $$(el,'.mFun a')[0],
			trans = $$(el,'.btn_trans'),
			//moreFun = $$(el,'.moreFun')[0],
			replyMsg = $$(el,'.replyMsg')[0],
			areaInfo = $$(el,'.areaInfo a')[0],
			picBox = $$(el,'.picBox'),
			videoBox = $$(el,'.videoBox'),
			musicBox = $$(el,'.musicBox'),
			voteBox = $$(el,'.voteBox');
		if (!UI.B.ipad && el.nodeName == 'LI') {
			MI.addHover(el);
		}
		if (from) { // 来自XXX
			UI.each(from,function(o){
				o.onclick = function(){
					try{
						var time = $$(this.parentNode,'.time')[0],id = UI.A(time,'from'),url = UI.A(this,'href'),source = encodeURI(this.innerHTML.replace(_('来自'),'')),user = MI.user.account;
						MI.Bos('http://r.t.qq.com/cgi-bin/v?L=1&F=1&sourceid=' + id + '&source=' + source + '&url=' + url + '&name=' + user);
					}catch(e){}
				}
			});
		}
		if (comt) { // 评论
			comt.onclick = function(){
				if(Self.type == 2) //如果是群内讨论页面的评论
				{
					Self._comt=UI.html(MI.tmpl.reply.replace('<div class="left"></div>','<div class="left"><label for="replayListCheckbox" style="display:"><input id="replayListCheckbox" type="checkbox" class="check1" style="display:none;">'  + '</label></div>'))[0];
				}
				else
				{
					Self._comt=UI.html(MI.tmpl.reply.replace('<div class="left"></div>','<div class="left"><label for="replayListCheckbox" style="display:"><input id="replayListCheckbox" type="checkbox" class="check1">' + _('同时转播') + '</label></div>'))[0];
				}
				Self.creatBox();
				if(Self.isQun==1)
				{
					var wqid=parseInt(UI.A(el,"wqid"));
					Self.comtBox.data.wqid=wqid;
				}
				try{
					Self.curSource = this.href.match(/[^\/]+$/g)[0].match(/[0-9]*[0-9]/g);
				}catch(e){}
				Self.setArrowX(UI.parents(this,'mFun')[0] || this,time);
				Self.comtBox._relayCheck.checked = false;
				Self.comtBox._relayCheck.onclick();
				Self.reply(elId || el,2,UI.A(this,'num'));
				Self.replyCont = this.cont || UI.A(this,'cont');
				Self.replyTarget = this;
				
				MI.Bos('btnComt');
				return false;
			}
		}
		if (reply) { // 对话
			reply.onclick = function(){
				Self.creatBox();
				Self.setArrowX(UI.parents(this,'mFun')[0] || this,time);
				Self.reply(elId || el,0);
				Self.replyCont = this.cont || UI.A(this,'cont');
				Self.replyTarget = this;
				MI.Bos('btnReply');
				return false;
			}
		}
		if (relay) { // 转播
			relay.onclick = function(){
				Self.creatBox();
				if(Self.isQun==1)
				{
					var wqid=parseInt(UI.A(el,"wqid"));
					Self.relayBox.data.wqid=wqid;
				}
				Self.setArrowX(this,time);
				Self.reply(elId || el,1,UI.A(this,'num'));
				Self.replyCont = this.cont || UI.A(this,'cont');
				Self.replyTarget = this;
				
				// 分享到空间
				Self.relayBox._relayCheck.checked = false;
				Self.relayBox.data.share = 0;
				
				MI.Bos('btnRelay','',0.01);
				return false;
			}
		}
		if (view) { // 查看对话
			view.onmouseover = function(){
				if (!UI.hasClass(document.body,'ipad')){
					UI.C(viewContent,'display','block');
				}
				MI.Bos('btnViewReply');
			}
			view.onmouseout = function(){
				UI.hide(viewContent);
			}
			view.style.cursor = 'pointer';
			UI.A(view,'target','_blank');
		}
		if (viewRelay && !viewRelay.innerHTML.hasString(_('对话'))) { // 查看转播
			var relayList,
				relayListLoad,
				relayListCont,
				relayListId = '',
				relayListNum, //Cache View Relay List's Button
				relayTip,
				relayBox,
				delay,
				pageLinkClick = function(){
					Self.msgMode = 0;
					var data = '&r=' + MI.random();
					if (MI.api.type){
						data += '&apiType=' + MI.api.type;
					}
					MI.ajax({
						url : this.href,
						type : 'get',
						data : data,
						success : function(data){
							pageLink(data);
						}
					});
					Self.relayListPosition();
					return false;
				},
				pageLink = function(data){
					data = MI.json(data);
					if (data.result != 0){
						if (data.msg){
							MI.alert(data.msg);
						}
						Self.relayListHide();
						return;
					}
					UI.hide(relayListLoad);
					relayListCont.innerHTML = data.info;
					UI.show(relayListCont);

					//Eval Javascript
					UI.evalScript(data.info);

					//Tips
					//if (UI.B.ipad || MI.S('tips_relayList_' + MI.user.account) == -1) {
						UI.hide($$(relayListCont,'.nfunTips')[0]);
					//}

					//Page Control
					var pages = $$(relayListCont,'.pages a,.tabStyle1 a');
					UI.each(pages,function(o){
						if (!UI.A(o,'target')) {
							o.onclick = pageLinkClick;
						}
						
					});
					//if (!pages.length) {
						var li = $$(relayListCont,'ul.clear li');
						if (li.length) {
							if(Self.type !=1 && Self.type != 2)
							{
								UI.addClass(li[li.length - 1],'nobor');
							}
							UI.each(li,function(o){
								o.onmouseover = function(){
									UI.addClass(this,'subHover');
								}
								o.onmouseout = function(){
									UI.removeClass(this,'subHover');
								}
								try{
									var _relayCite = $$(o,'.relayCite')[0],
										_replyCite = $$(o,'.replyCite')[0],
										_report = $$(o,'.alarm')[0];
									if (_relayCite) {
										_relayCite.onclick = function(){
											UI.show(relayBox._body);
											UI.addClass(relayBox._body,'zfWrap');
											if(UI.hasClass(relayBox._body,'comtWrap'))
											{
												UI.removeClass(relayBox._body,'comtWrap');
											}
											Self.getRelayOld(o,'.content',relayBox);
											relayBox.txtTipSend = _('转播中');
											relayBox.talkId = o.id;

											//Auto Select CheckBox Of Relay
											relayBox._relayCheck.checked = true;
											relayBox._relayCheck.onclick();
											return false;
										}
									}
									if (_replyCite){
										_replyCite.onclick = function(){
											UI.show(relayBox._body);
											UI.addClass(relayBox._body,'zfWrap');
											if(Self.type!=2 && Self.type!=1)
											{
												//UI.addClass(relayBox._body,'comtWrap');
											}
											UI.addClass(relayBox._body,'comtWrap');
											if(Self.type==1 || Self.type == 2)
											{
												if(UI.hasClass(relayBox._body,'zfWrap'))
												{
													//UI.removeClass(relayBox._body,'zfWrap');
													//UI.addClass(relayBox._body,'talkWrap');
												}
											}
											Self.getRelayOld(o,'.content',relayBox);
											relayBox.txtTipSend = _('评论中');
											relayBox.talkId = o.id;
											
											//Auto Select CheckBox Of Relay
											relayBox._relayCheck.checked = false;
											relayBox._relayCheck.onclick();
											return false;
										}
									}
									if (_report){
										_report.onclick = function(){
											if(MI.user.fun.btnStyle==5 || MI.user.fun.btnStyle==6)
											{
												Self.reportQun(o.id,MI.Group.qid,1);
											}
											else
											{
												Self.report(o.id,this);
											}
											return false;
										}
									}
								}catch(e){}
							});
						}
					//}
					
					//Relay Number
					try{
						var relayNum = $$(relayList,'.num')[0],
							relayNumValue,
							relayListNumValue = $$(relayListNum,'.relayNum')[0],
							relay2Num = $$(relayList,'.num2')[0],
							relay2NumValue,
							relay2ListNumValue = $$(el,'.relayNum')[1];
						if (relayNum) {
							relayNumValue = relayNum.innerHTML;
							/*relayListNumValue.innerHTML = relayNumValue != 0 ? relayNumValue : '';
							if (relayNumValue != 0) {
								UI.addClass(viewRelay,'zfNumShow');
							}
							else {
								UI.removeClass(viewRelay,'zfNumShow');
							}*/
							if (relayNumValue == 0 && $$(relayList,'ul li').length == 0) {
								UI.hide($$(relayList,'ul')[0]);
								UI.hide($$(relayList,'.pages')[0]);
							}
							if (relayNumValue > parseInt(relayListNumValue.innerHTML)){
								relayListNumValue.innerHTML = relayNumValue;
							}
						}
						if (relay2Num && relay2ListNumValue){ //二次转播
							relay2NumValue = relay2Num.innerHTML;
							if (relay2NumValue > parseInt(relay2ListNumValue.innerHTML)){
								relay2ListNumValue.innerHTML = relay2NumValue;
							}
						}
					}catch(e){}

					//Relay Box
					var relayBoxTip = $$(relayListCont,'.relayThumb')[0];
					if (relayBoxTip) {
						relayBoxTip.onclick = createRelayBox;
						relayBoxTip.onclick();
					}

					//Disabled dblclick select
					relayListCont.onclick = function(){
						MI.DisableDblClickSelect(this);
					}

					//Build Tips
					Self.buildTips(relayList);
					MI.Card.build(relayList,'.msgCnt strong a,.msgCnt em a,.cNote2 a,.more a',2);
					
					//Show Face
					MI.Crs(1);

					MI.PV('relay');
				},
				createRelayBox = function(){
					UI.hide(this);
					var relay,isRelay = 1;//MI.S('option_relayListCheck_' + MI.user.account) != -1
					if (!this.appended) {
						relay = UI.html(MI.tmpl.reply.replace('talkWrap','zfWrap').replace('<div class="left"></div>','<div class="left" style="display:none"><label for="replayListCheckbox"><input id="replayListCheckbox" type="checkbox"' + (isRelay ? ' checked' : '') + ' class="check1">' + _('同时转播给你的听众') + '</label></div>').replace('talkSuc',''))[0];
						if(Self.type==2)		//群内私聊没有转播
						{
							isRelay = 0;
							relay = UI.html(MI.tmpl.reply.replace('talkWrap','zfWrap comtWrap').replace('<div class="left"></div>','<div class="left" style="display:none"><label for="replayListCheckbox"><input id="replayListCheckbox" type="checkbox"' + (isRelay ? ' checked' : '') + ' class="check1">' + _('同时转播给你的听众') + '</label></div>').replace('talkSuc',''))[0];
						}
						relayTip = $$(relayListCont,'.relayThumb')[0];
						relayBox = new MI.TalkBox(relay);
						if(Self.isQun==1)
						{
							var wqid=parseInt(UI.A(el,"wqid"));
							relayBox.data.wqid=wqid;
						}
						relayBox.countTxt();
						relayBox.txtTipSend = _('转播中');
						relayBox.addList = Self.relayBox.addList;
						//relayBox.talkId = UI.A(viewRelay,'rel');
						relayBox.talkId = elId;
						relayBox.type = 1;
						relayBox.iconPic = Self.iconPic;
						relayBox.autoHeight = 30;
						relayBox._relayCheck = $$(relayBox._body,'.check1')[0];
						relayBox.successStart = function(){
							var refresh = $$(relayListCont,'.refreshBth')[0];
							if (refresh) {
								refresh.onclick();
							}
							MI.tip(relayBox.type == 1 ? _('转播成功！') : _('评论成功！'));
							Self.updateRelayNum(relayBox.type);
						}
						relayBox.start = function(){
							clearTimeout(delay);
						}
						if (!isRelay) {
							relayBox.type = 4;
							relayBox.addList = 0;
						}
						/*UI.EA(relayBox._txt,'blur',function(){
							if (!relayBox._txt.value) {
								delay = setTimeout(function(){
									UI.hide(relayBox._body);
									UI.show(relayTip); 
								},300);
							}
						});*/
						UI.after(relay,this);
						/*
						if(Self.type==1 && Self.msgMode == 1)
						{
							UI.hide(relay);
							//Self.msgMode = 0;
							relay.blur();
						}
						else
						{
							UI.show(relay);
						}
						*/
						relayBox._body.ondblclick = function(e){
							UI.E(e).stop();
						}
						if (!UI.B.ie) {
							relayBox._body.onmousedown = function(e){
								UI.E(e).stop();
							}
						}
						setTimeout(function(){
							Self.getRelayOld(el,'.msgBox .msgCnt',relayBox);
						},100);

						//同时转播给你的听众
						relayBox._relayCheck.onclick = function(){
							var checked = this.checked;
							relayBox.type = checked ? 1 : 4;
							relayBox._tip.innerHTML = '';
							relayBox.countTxt();
							relayBox.addList = checked ? Self.relayBox.addList : 0;
							//MI.S('option_relayListCheck_' + MI.user.account,checked ? 1 : -1);
							MI.Bos('btnRelayistCheckbox');
						}
						this.appended = 1;
						if (!Self.relayListMulti){
							Self.talkBox = relayBox;
						}
					}
					else {
						UI.show(this.nextSibling);
					}
				};
			viewRelay.onclick = function(e){
				var E = UI.E(e),
					userClick = E.type;
				Self.msgMode = userClick ? 0 : 1;
				if (!relayList){ //设置转播列表DOM
					if (Self.relayListMulti){
						relayListId = elId;
					}
					if (!Self['_relayList' + relayListId] || Self.relayListMulti){
						Self.relayListCreate(relayListId);
					}
					relayList = Self['_relayList' + relayListId];
					relayListLoad = Self['_relayListLoad' + relayListId];
					relayListCont = Self['_relayListCont' + relayListId];
				}
				if (Self.xhr.relay && !Self.relayListMulti) {
					Self.xhr.relay.abort();
				}
				var href = this.href,
					id = href.match(/[^\/]+$/g)[0],
					li = id == elId ? id : elId,
					Y,
					windowHeight = UI.windowHeight(),
					scrollTop,
					relayListOption,
					Time,Time_1,Time_2,Time_3;
				if (Self.relayListOption){
					relayListOption = {};
					for (var i in Self.relayListOption){
						relayListOption[i] = Self.relayListOption[i];
					}
				}
				UI.A(this,'rel',id);
				relayListNum = this;
				if ((!Self.relayAtCur || !relayListOption) && ((userClick && !Self.relayListSpecial) || (!userClick && Self.relayListSpecial)) && relayList.display && (Self.cur == li || Self.relayListMulti)) {
					$$(relayList,'.w_close')[0].onclick();
				}
				else {
					UI.removeClass($(Self.cur),'cur');
					UI.remove(Self._confirm);
					Self.replyHide();
					if (Self.talkBox) {
						Self.talkBox.hide();
					}

					//$$(relayList,'.left a')[0].href = href;
					//$$(this,'.relayNum')[0].innerHTML;
					UI.hide(relayListCont);
					UI.show(relayListLoad);
					UI.append(relayList,$$(el,'.msgBox')[0]);
					
					Time = + new Date();
					
					var ajaxUrl = MI.url.relayList, //请求地址
						messageUrl = { //请求参数
							id : id,
							viewModel : Self.iconPic,
							r : MI.random()
						};
					if (MI.api.type){
						messageUrl.apiType = MI.api.type;
					}
					if(Self.type==2){
						messageUrl.zone = 2;
					}
					if (relayListOption){ //如果是At聚合
						ajaxUrl = relayListOption.url;
						if (relayListOption.data){
							for (var i in relayListOption.data){
								messageUrl[i] = relayListOption.data[i]
							}
						}
					}
					
					/*
					if(Self.type == 1 && Self.msgMode != 0)
					{
						messageUrl += '&pi=0';
					}*/
					
					//拉取转播列表
					Self.xhr.relay = MI.ajax({
						url : ajaxUrl,
						type : 'get',
						data : messageUrl,
						success : function(data){
							Time_1 = + new Date() - Time;
							pageLink(data);
							if (relayListOption && relayListOption.call){
								relayListOption.call();
							}
							
							//Speed
							Time_2 = + new Date() - Time;
							setTimeout(function(){
								Time_3 = + new Date() - Time;
								MI.Speed('t_asyn_relay',0.1,Time_1,Time_2,Time_3);
							},0);
						}
					});
					
					scrollTop = UI.scrollY();
					Y = UI.getY(this);
					if (Y && Y < scrollTop) { //(Y > scrollTop + windowHeight * 3 / 4) || 
						window.scrollTo(0,Y);
					}

					UI.addClass(el,'cur');
					Self.cur = li;
					relayList.display = 1;
				}
				Self.relayListPosition = function(){ //列表定位
					var Y = UI.getY(viewRelay);
					if (Y && UI.scrollY() > Y) {
						window.scrollTo(0,Y);
					}
				}
				
				try{
					Self.focus();
				}catch(e){}
				
				E && E.stop();
				if (userClick){
					Self.relayListSpecial = 0;
				}
				Self.relayListOption = null;
				
				MI.Bos('btnViewRelay');
				return false;
			}
		}
		if (viewRelay2 && viewRelay2.nodeName == 'A'){ //二次转播
			viewRelay2.onclick = function(){
				Self.relayListOption = {
					url : MI.url.relayListSecond, //请求地址
					data : { //请求参数
						id : elId
					},
					call : function(){ //回调函数
						
					}
				}
				if (Self.relay2Cur && Self.relay2Cur == this){ //隐藏列表
					Self.relayListHide();
				}
				else { //显示列表
					if (relayList){
						relayList.display = 0;
					}
					viewRelay.onclick();
					Self.relay2Cur = this;
				}
				Self.relayListSpecial = 1;
				MI.Bos('btnViewRelay2');
				return false;
			}
		}
		if (viewRelayAt){ //At聚合
			UI.each($$(viewRelayAt,'a'),function(o){
				o.onclick = function(e){
					Self.relayListOption = {
						url : MI.url.relayListAt, //请求地址
						data : { //请求参数
							type : UI.A(this,'rel') || 0, //类型
							viewModel : Self.relayAtModel //只看有理由的
						},
						call : function(){ //回调函数
							var relayListAtNumValue = $$(o,'em')[0];
							if (relayListAtNumValue){
								relayListAtNumValue.innerHTML = '';
							}
						}
					}
					if (Self.relayAtCur && Self.relayAtCur == this){ //隐藏列表
						Self.relayListHide();
					}
					else { //显示列表
						if (relayList){
							relayList.display = 0;
						}
						viewRelay.onclick();
						Self.relayAtCur = this;
					}
					Self.relayListSpecial = 1;
					MI.Bos('btnViewRelayAt');
					return false;
				}
			});
		}
		if (moreFun) { // 更多
			var moreFunWrap = moreFun.parentNode,
				moreFunDelay,
				moreFunOpenDelay;
			moreFun.onclick = function(e){
				clearTimeout(moreFunDelay);
				var T = this;
				moreFunOpenDelay = setTimeout(function(){
					Self.moreFun(T.parentNode,elId || el);
					MI.Bos('btnMoreFun',null,0.01);
				},150);
				if (UI.hasClass(T.parentNode,'mFunDis')){
					if (UI.hasClass(document.body,'ipad')){
						setTimeout(function(){
							UI.removeClass(T.parentNode,'mFunDis');
						},200);
					}
					UI.E(e).stop();
				}
				return false;
			}
			if (!UI.hasClass(document.body,'ipad')){
				moreFun.onmouseover = moreFun.onclick;
				moreFun.onmouseout = function(e){
					clearTimeout(moreFunOpenDelay);
				}
				moreFunWrap.onmouseover = function(){
					clearTimeout(moreFunDelay);
				}
				moreFunWrap.onmouseout = function(e){
					moreFunDelay = setTimeout(function(){
						clearTimeout(moreFunOpenDelay);
						Self.moreFunHide();
					},100);
				}
			}
		}
		UI.each(trans,function(o){
			o.onclick = function(){
				Self.trans.show(this);
				return false;
			}
			o.onmouseover = function(){
				Self.trans.show(this);
				return false;
			}
			o.onmouseout = function(){
				Self.trans.hide();
				return false;
			}
		})
		if (fav) { // 收藏
			fav.type = 1;
			fav.innerHTML = (UI.hasClass(fav,'light') ? _('取消') : '') + _('收藏');
			fav.onclick = function(e){
				if(Self.isQun==1)
				{
					var wqid=parseInt(UI.A(el,"wqid"));
					MI.Group.qid=wqid;
				}
				Self.fav(elId,this.type);
				UI.E(e).stop();
				MI.Bos('btnFav');
				return false;
			}
			fav.onmouseover = MI.hideFocus;
		}
		if (unfav) { // 取消收藏
			unfav.onclick = function(){
				if(Self.isQun==1)
				{
					var wqid=parseInt(UI.A(el,"wqid"));
					MI.Group.qid=wqid;
				}
				Self.confirm(elId,2);
				MI.Bos('btnUnFav');
				//Self.fav(elId,2);
				return false;
			}
			unfav.onmouseover = MI.hideFocus;
		}
		if (shield) { // 屏蔽
			shield.type = UI.hasClass(shield,'light') ? 5 : 4;
			shield.innerHTML = (UI.hasClass(shield,'light') ? _('取消屏蔽') : _('屏蔽@提醒'));
			shield.onclick = function(e){
				if(Self.isQun==1)
				{
					var wqid=parseInt(UI.A(el,"wqid"));
					MI.Group.qid=wqid;
				}
				if(this.type == 4)
					Self.confirm(elId,this.type);
				else{
					Self.remove(elId,this.type);
					UI.E(e).stop();
				}
				MI.Bos('btnShield');
				return false;
			}
			shield.onmouseover = MI.hideFocus;
		}
		if (unshield) { // 取消屏蔽
			unshield.type = 5;
			unshield.onclick = function(){
				if(Self.isQun==1)
				{
					var wqid=parseInt(UI.A(el,"wqid"));
					MI.Group.qid=wqid;
				}
				//var talk = $(elId);
				Self.confirm(elId,6);	
				MI.Bos('btnUnShield');	
							
				return false;
			}
			unshield.onmouseover = MI.hideFocus;
		}
		if (del) { // 删除
			del.onclick = function(){
				if(Self.isQun==1)
				{
					var wqid=parseInt(UI.A(el,"wqid"));
					MI.Group.qid=wqid;
				}
				Self.confirm(elId);
				if (MI.talkBox && MI.talkBox.type == 6){
					MI.Bos('btnNotepadDel');
				}
				else {
					MI.Bos('btnDel');
				}
				return false;
			}
		}
		if (report.length) { // 举报
			UI.each(report,function(o){
				o.onclick = function(){
					if((MI.user.fun.btnStyle==5 || MI.user.fun.btnStyle==6) )
					{
						Self.reportQun(el.id, MI.Group.qid, 1);
						MI.Bos('btnReport_ qun');
					}
					else
					{
						Self.report(elId,this);
						MI.Bos('btnReport');
					}
					return false;
				}
			});
		}
		if (content && content.innerHTML == '') {
			//UI.hide(content);
			content.innerHTML = '&nbsp;';
		}
		if (replyMsg) { // 回信、修改记事本
			replyMsg.onclick = function(){
				if (MI.talkBox){
					if (MI.talkBox.type == 6){
						MI.dialog.show({width:560,title:'<h1 class="DmainTit">' + _('修改记事本') + '</h1>',html:$('talkBoxMsg')});
						MI.talkBoxMsg._txt.value = UI.text($$(el,'.msgCnt')[0]);
						MI.talkBoxMsg.talkId = elId;
						MI.talkBoxMsg.countTxt();
						MI.talkBoxMsg.successStart = function(data){
							$$(el,'.msgCnt')[0].innerHTML = MI.string.html(data.info.talk[0].content);
							MI.tip(_('修改成功'));
						}
						MI.focus(MI.talkBoxMsg._txt);
						MI.Bos('btnNotepadEdit');
					}
					else {
						MI.talkBox._msgTo.value = UI.A(this,'rel');
						UI.removeClass(MI.talkBox._btn,'btnNoStr');
						MI.talkBox._txt.value = '';
						MI.talkBox.countTxt();
						if (MI.dialog) {
							MI.dialog.show({width:560,html:$('talkBoxMsg')});
							//MI.talkBox._msgTo.focus();
							//UI.hide(MI.talkBox._msgTo.previousSibling);
							try{setTimeout('MI.talkBox._txt.focus()',0);}catch(e){};
							MI.talkBox.getMsgTo();
						}
						MI.Bos('btnReplyMsg');
					}
				}
				return false;
			}
		}
		UI.each(userPic,function(o){ //图片加载容错
			o.onerror = function(){
				MI.picError(this);
			}
		});
		if (areaInfo) {
			areaInfo.onclick = function(){
				Self.geolocation.show(this);
				return false;
			}
		}
		if (picBox) {
			MI.TalkList.picEvent(picBox);
		}
		if (videoBox) {
			MI.TalkList.videoEvent(videoBox);
		}
		if (musicBox) {
			MI.TalkList.musicEvent(musicBox);
		}
		if (voteBox) {
			MI.TalkList.voteEvent(voteBox);
		}
		//Add Time Title
		for (var i = 0,num = time.length;i < num;i++) {
			if (!UI.A(time[i],'rel')) {
				UI.A(time[i],'rel',UI.A(el,'rel'));
			}
			var timeObj = UI.zoneDate(UI.A(time[i],'rel') + '000',8);
			time[i].title = UI.formatDate(timeObj,_('yyyy年M月d日 hh:mm'));
			Self.time.push(time[i]);
			time[i].onclick = timeBos;
		}
		function timeBos(){
			if (this.nodeName == 'A') {
				MI.Bos('btnTime');
			}
		}
		
		//列表事件回调
		if (Self.eventCall){
			Self.eventCall(el);
		}
	},
	moreFun : function(btn,id){ // 更多
		var Self = this,
			sameBtn,
			displayClassName = 'mFunDis';
		if (!Self._shareBtn){
			UI.EA(document.body,'click',function(){
				UI.removeClass(Self._shareBtn,displayClassName);
			});
		}
		else if (Self._shareBtn != btn){
			UI.removeClass(Self._shareBtn,displayClassName);
		}
		Self._shareBtn = btn;
		UI.addClass(btn,displayClassName);
		if (!UI.A(btn,'event')){
			Self.moreFunEvent(btn,id);
			UI.A(btn,'event',1);
		}
	},
	moreFunHide : function(btn,id){ // 隐藏更多
		var Self = this;
		UI.removeClass(Self._shareBtn,'mFunDis');
	},
	moreFunEvent : function(btn,id){ // 更多功能事件绑定
		var Self = this,
			a = $$(btn,'.shareBtn a'),
			mail = a[0],
			qq = a[1],
			qzone = a[2],
			copy = a[3];
		if (mail){
			mail.onclick = function(){
				MI.app({
					TalkListShare : function(){
						MI.TalkList.shareCollection.show(id);
					}
				});
				return false;
			}
		}
		/*if (qq){
			qq.onclick = function(){
				MI.TalkList.shareCollection.shareQQ(id);
				return false;
			}
		}
		if (qzone){
			qzone.onclick = function(){
				MI.TalkList.shareCollection.shareQzone(id);
				return false;
			}
		}*/
	},
	cacheLast : function(){ //Cache Last Id For More
		var children = UI.children(this._body),
			last = children[children.length - 1],
			time,
			fav,
			shield;
		if (last) {
			fav = UI.A(last,'fav'); //消息收藏时间
			time = UI.A(last,'rel'); //消息发表时间
			shield = UI.A(last,'shield'); //消息屏蔽时间
			this.last = {
				id : last.id,
				time : time,
				fav : fav ? fav : 0,
				shield : shield ? shield : 0
			};
			if (this.date){
				MI.TalkList.date = UI.formatDate(UI.zoneDate(time + '000',8),'yyyy-MM-d');
			}
		}
	},
	cacheFirst : function(){ //Cache First List
		var _first = UI.children(this._body)[0],time;
		if (_first) {
			time = UI.A(_first,'rel'); //消息发表时间
			this.first = {
				time : time,
				id : _first.id
			};
		}
	},
	bottom : function(){ //Check More's Position
		var main = UI.parents(this._body,'main')[0],side,wrap,y;
		if (main && this._more.innerHTML) {
			side = UI.next(main),wrap = main.parentNode,y
			if (side) {
				UI.C(this._body,'marginBottom',0);
				y = UI.height(main) - UI.height(wrap) - 1;
				UI.C(this._body,'marginBottom',y < -1 ? - y + 'px' : '');
			}
		}
	},
	updateTime : function(newTime){ //Update Talk's Time
		newTime = Number(newTime);
		if (!MI.time || newTime - MI.time > 60) { //Don't Update In 60 Seconds
			MI.time = newTime;
			UI.each(this.time,function(o,i){
				var info,
					now = MI.time,
					Now = new Date(),
					pubTime = UI.A(o,'rel'),
					PubTime = UI.zoneDate(pubTime + '000',8),
					gapTime = now - pubTime,
					minute = parseInt(gapTime / 60),
					hour = parseInt(gapTime / 3600),
					day = parseInt(gapTime / 86400),
					clock = o.title.split(' ')[1];
				Now.setTime(now + '000');
				if (minute <= 0) {
					info = _('刚刚');
				}
				else if (minute < 60) {
					info = minute + _('分钟前');
				}
				/*else if (minute > 59 && hour < 6) {
					info = hour + _('小时') + minute % 60 + _('分钟前');
				}*/
				//else if (hour > 5 && day == 0) {
				else if (minute > 59 && day == 0) {
					info = (Now.getDate() == PubTime.getDate() ? _('今天') : _('昨天')) + ' ' + clock;
				}
				else if (day == 1 && Now.getDate() - PubTime.getDate() < 2) {
					info = _('昨天 ') + clock;
				}
				else if (Now.getFullYear() == PubTime.getFullYear()) {
					info = o.title.split(_('年'))[1];
				}
				else {
					info = o.title;
				}
				if (info) {
					o.innerHTML = info;
				}
			});
		}
	},
	more : function(auto){
		var Self = this,
			children = UI.children(Self._body),
			last = children[children.length - 1],
		    tempTime;
		if(Self.last.fav) tempTime = Self.last.fav;
		else if(Self.last.shield) tempTime = Self.last.shield;
			else tempTime = Self.last.time;
		var url = {
				r : MI.random(),
				time : tempTime,
				page : Self.page + 1,
				id : Self.last.id
			},
			rel = UI.A(Self._more,'rel'),
			Time,Time_1,Time_2,Time_3;
		/*
			/home.php?time=
			/at.php?time=
			/index.php?time=

			/index.php?time=&u=

			{
				result : 0,
				msg : '',
				info : {
					hasNext : 1,
					talk : [
						{
							id : '123456',
							type : 1,
							//vip : 1,
							flag : {
								auth : 0,
								vivi : 0,
								expo : 0
							},
							name : 'xhlv',
							nick : 'xhlv',
							pic : 'http://mat1.gtimg.com/www/mb/images/img2.jpg',
							image : [],
							count : null,
							time : '5分钟前',
							from : 'web',
							timestamp : '1232542321',
							content : '内容',
							source : {
								...
							}
						}
					]
				}
			}
		*/
		if (Self.guest){
			url.u = Self.guest;
		}
		if (!Self._more.sending) {
			UI.addClass(Self._more,'loading');
			if (rel) {
				Time = + new Date();
				MI.ajax({
					url : rel,
					type : 'get',
					data : url,
					timeout : 30000,
					fail : function(){
						UI.removeClass(Self._more,'loading');
						Self._more.sending = 0;
					},
					success : function(json){
						Time_1 = + new Date() - Time;
						MI.app({
							Tmpl : function(){
								if (!Self.tmpl){
									Self.tmpl = MI.tmpl.listAll;
								}
								Self.addMore(json);
							}
						});
					
						//Speed
						Time_2 = + new Date() - Time;
						setTimeout(function(){
							Time_3 = + new Date() - Time;
							MI.Speed('t_asyn_more',0.005,Time_1,Time_2,Time_3);
						},0);
					}
				});
				MI.Bos(auto ? 'btnMoreAuto' : 'btnMore','',0.01);
			}
		}
		Self._more.sending = 1;
	},
	newly : function(){
		var Self = this,_new = Self._new,data,refreshUrl = '';
		if (!_new.sending) {
			if (_new.num > 15 || Self.refresh) {
				if (Self.refreshUrl && UI.isString(Self.refreshUrl)){
					refreshUrl = Self.refreshUrl + (Self.refreshUrl.hasString('?') ? '' : '?');
					if (MI.newCount.data){
						for (var i in MI.newCount.data){
							refreshUrl += '&' + i + '=' + MI.newCount.data[i];
						}
					}
				}
				document.location.href = UI.isString(Self.refreshUrl) ? refreshUrl : '/' + MI.user.account; //location.reload()在Firefox中会导致发图表单重新提交的问题
			}
			else {
				UI.addClass(_new,'loading');
				data = {time:Self.first.time,id:Self.first.id,p:2,type:1,r:MI.random()};
				if (MI.newCount.data){
					for (var i in MI.newCount.data){
						data[i] = MI.newCount.data[i];
					}
				}

				MI.ajax({
					url : Self.newlyUrl,
					type : 'get',
					data : data,
					fail : function(){
						UI.removeClass(Self._new,'loading');
						Self._new.sending = 0;
					},
					success : function(json){
						MI.app({
							Tmpl : function(){
								if (!Self.tmpl){
									Self.tmpl = MI.tmpl.listAll;
								}
								Self.addNewly(json);
							}
						});
					}
				});
			}
		}
		_new.sending = 1;
	},
	addNewly : function(json){
		var Self = this,
			_new = Self._new,
			ajax = UI.isString(json);
		data = ajax ? MI.json(json) : json;
		if (data.result == 0) {
			data.info.guest = Self.guest;
			data.info.fav = 0;
			data.info.shield = 0;
			data.info.iconPic = Self.iconPic;

			if (!Self.guest && data.info.user != MI.user.account) { //Kill Change Account Bug
				document.location.reload();
				return;
			}

			UI.each(Self.add,function(o){ //Remove Added List
				if ($(o)) {
					UI.remove($(o));
				}
			});

			var list,
				cache = document.createDocumentFragment(),
				o = UI.html(new UI.tmplString(Self.tmpl)(data.info).replace(/<li id="/gi,ajax ? '<li class="newMsg" id="' : '<li id="')),
				length = data.info.talk.length;
			if (length) {
				if (Self.newlyCall){ //新消息拉取成功后回调函数
					Self.newlyCall(o);
				}
				if (Self._newLine) {
					UI.removeClass(Self._newLine,'pageLine');
				}
				for (var i = 0,num = o.length;i < num;i++) {
					Self.addEvent(o[i]);
					UI.append(o[i],cache);
					if (i == num - 1) {
						Self._newLine = o[i]; //New Line Dom
						UI.addClass(o[i],'pageLine');
					}
				}
				if (length > 50) {
					Self._body.innerHTML = '';
				}
				list = Self._news;
				for (var i = 0,num = list.length;i < num;i++) {
					UI.removeClass(list[i],'newMsg');
				}

				UI.prepend(cache,Self._body);
				Self.addFollowBtn(o);
				Self._news = $$(Self._body,'.newMsg');
				Self.news = Self._news.length;
				Self.card();
				Self.buildTips();


				UI.each(Self.add,function(o){ //Remove Added List's NewMsg ClassName
					if ($(o)) {
						UI.removeClass($(o),'newMsg');
					}
				});
				Self.cacheFirst();
				Self.add = [];

				if (Self._tip) { //Hide Talk List's Tip
					UI.hide(Self._tip);
				}
				Self.updateTime(data.info.time);

				MI.PV('new');
				MI.Crs(1);

				//For Ajax Back Forward
				if (ajax) {
					MI.ajaxTimes++;
					MI.talkNew.push(json);
				}
				
				//新消息数和拉取的消息条数不符上报
				if (_new.num != length) {
					MI.Bos('btnNewTalkNumError');
				}
			}
		}
		UI.hide(_new);
		if (document.titleTmp) {
			document.title = document.titleTmp;
		}
		Self.bottom();
		UI.removeClass(_new,'loading');
		_new.sending = 0;
	},
	addMore : function(json){
		var Self = this,
			_new = Self._new,
			ajax = UI.isString(json),
			children = UI.children(Self._body),
			last = children[children.length - 1];
		data = ajax ? MI.json(json) : json;
		/*
		data = {
			result : 0,
			msg : '',
			info : {
				hasNext : 1, //是否有更多
				talk : [ //消息数组
					{
						id : "5608028663149", //消息ID
						content : "", //消息内容
						image : ["http://t3.qpic.cn/mblogpic/e554cec67fa14048e8ba"], //图片
						time : "6月17日 18:46", //消息时间
						type : 2, //消息类型
						status : 0, //消息状态
						from : "来自网页", //来自
						name : "xhlv", //用户帐号
						nick : "xhlv", //用户昵称
						bkname : "", //用户备注
						icon : "", //用户图标
						flag : { //用户标志位
							dyh : 1 //大运会
						},
						pic : "http://t3.qlogo.cn/mbloghead/63e310532c88f055a322/50", //用户头像
						count : 0, //转播数
						counts : [0,0,0], //[转播数,评论数]
						at : [0,0,0], //[提到我的,收听的人,认证用户]
						timestamp : 1308307583, //消息时间戳
						source : { //源消息（格式同上）
							
						}
					}
				]
			}
		};
		*/
		if (data.result == 0) {
			if (!Self.guest && data.info.user != MI.user.account) { //Kill Change Account Bug
				document.location.reload();
				return;
			}

			data.info.guest = Self.guest;
			data.info.fav = Self.last.fav ? 1 : 0; //Fav List Tmpl
			data.info.iconPic = Self.iconPic;
			data.info.shield = Self.last.shield ? 1 :0;

			var cache = document.createDocumentFragment(),o = UI.html(new UI.tmplString(Self.tmpl)(data.info));
			if (data.info.talk.length) {
				for (var i = 0,num = o.length;i < num;i++) {
					UI.append(o[i],cache);
				}
				setTimeout(function(){ //渲染完再添加事件，比较耗时间
					for (var i = 0,num = o.length;i < num;i++) {
						Self.addEvent(o[i]);
					}
					Self.card();
					Self.buildTips();
					MI.Crs(1);
				},0);
				UI.append(cache,Self._body);
				Self.addFollowBtn(o);
				UI.C(Self._body,'marginBottom','');
				if (!UI.B.ie) {
					MI.GoTop.position();
				}

				//Resize Dialog's Bg
				if (MI.dialog && MI.dialog.display) {
					MI.dialog.resizeBg();
				}

				MI.PV('more');

				//For Ajax Back Forward
				if (ajax) {
					MI.ajaxTimes++;
					MI.talkMore.push(json);
				}
			}

			//More
			if (data.info.hasNext == 0 || !data.info.talk.length) {
				UI.addClass(Self._more.parentNode,'hide');
				Self.more = function(){};
			}
			else {
				if (last) {
					UI.addClass(last,'pageLine');
				}
				Self.cacheLast();
			}

			Self.updateTime(data.info.time);
			Self.page++;
		}
		else if (data.msg){
			//MI.alert(data.msg);
		}
		Self.moreTimes++;
		Self.bottom();
		UI.removeClass(Self._more,'loading');
		Self._more.sending = 0;
	}
}
/**
 * 当前激活的TalkList实例
 * @type Object
 */
MI.TalkList.cur = null;
MI.TalkList.date = 0;
MI.TalkList.videoEvent = function(videoBox){
	var Self = this;
	// 只取一个视频，因为投票的DOM和视频的className是共用的 - by xhlv
	if (videoBox.length && !UI.hasClass(videoBox[0],'voteBox')){
		var videoBoxCur = videoBox[0],
		vWrap = $$(videoBoxCur,'.vWrap')[0],
		bThumbs = Number(vWrap.getAttribute('thumbs')),
		vThumbsBox = $$(videoBoxCur,'.vThumbsBox')[0],
		vSimple = $$(vThumbsBox,'.vSimple')[0],
		vThumbs = $$(vThumbsBox,'.vThumbs')[0],
		//video = vButton//bThumbs ? vThumbs : vSimple,
		vTools = $$(videoBoxCur,'.vTools')[0],
		vClose = $$(videoBoxCur,'.vClose')[0],
		mask = $$(vThumbsBox,'span')[1],
		thumbs = $$(vThumbs,'img')[0];
		if(thumbs){
			thumbs.onload = function(){
				Self.resizePic(this);
				if(bThumbs){
					this.load = 1;
					mask.style.display = 'inline';
				}
			}
			setTimeout(function(){
				Self.resizePic(thumbs);
			},2000);
		}

		if(bThumbs){
			vThumbs.style.display = 'inline';
			vSimple.style.display = 'none';
		}else{
			vSimple.style.display = 'inline';
		}
		if(bThumbs){
			thumbs.onerror = function(){
				MI.videoThumb(this);
			}
			setTimeout(function(){
				if(thumbs.load){
					mask.style.display = 'inline';
				}
			},1500);
		}else{
			vThumbsBox.onmouseover = function(){
				UI.addClass(this,'hover');
				MI.TalkList.resizePic(thumbs);
			}
			vThumbsBox.onmouseout = function(){
				UI.removeClass(this,'hover');
			}
		}		
		vThumbsBox.onclick = function(){
			MI.TalkList.video(this,2);
			return false;
		}
		vClose.onclick = function(){
			MI.TalkList.videoClose();
			return false;
		}

		var msgCnt = $$(videoBoxCur.parentNode.parentNode,'.msgCnt')[0];
		var videoLink = $$(msgCnt,'.ico_video');
		if(videoLink && videoLink.length > 0){
			for(var j = 0,n = videoLink.length;j < n;j++){
				var vLink = videoLink[j];
				vLink.onclick = function(e){
					MI.TalkList.video(this,1);
					return false;
				}
			}
		}
	}
}
MI.TalkList.resizePic = function(pic){
	var normal = {width:150,height:150}
	var w =UI.width(pic),h = UI.height(pic);
	var els = pic.style;
	if(w >normal.width || h > normal.height){
		els.visibility = 'hidden';
		resize(pic,normal.width,normal.height);
	}
	function resize(pic,width,height){
		var els = pic.style;
		var w = pic.clientWidth,h=pic.clientHeight;
		if(w<width && h<height)	return;
		var v1 = pic.clientWidth / pic.clientHeight;
		if(v1 > width / height){
			pic.style.height = width / v1 + "px";
			pic.style.width = width + "px";
		}else{
			pic.style.height = height + "px";
			pic.style.width = height * v1 + "px";
		}
		els.visibility = 'visible';
	}
}
MI.TalkList.musicEvent = function(musicBox){
	var Self = this;
	for (var i = 0,num = musicBox.length;i < num;i++) {
		var musicBoxCur = musicBox[i],
		mThumbsBox = $$(musicBoxCur,'.mThumbsBox')[0],
		//bThumbs = Number(mThumbsBox.getAttribute('thumbs')),
		//mSimple = $$(mThumbsBox,'.mSimple')[0],
		//mThumbs = $$(mThumbsBox,'.mThumbs')[0],
		//mSimplePic = $$(mSimple,'img')[0],
		mBox = $$(musicBoxCur,'.mBox')[0],
		mTitBox = $$(mBox,'.mTitBox')[0],
		mClose = $$(mBox,'.btn_mClose')[0],
		mPlay = $$(mBox,'.btn_mPlay')[0],
		mPause = $$(mBox,'.btn_mPause_hover')[0];
		ico_music = $$(musicBoxCur.parentNode.parentNode,'.msgCnt .ico_music')[0] || $$(musicBoxCur.parentNode.parentNode,'.msgCnt .ico_qlz')[0];
		/*mSimplePic.onload = function(){
			UI.show(mSimple);
		}
		mSimplePic.onerror = function(){
			mSimple.innerHTML = _('播放音乐');
			UI.show(mSimple);
		}
		*/
		mThumbsBox.onclick = mPlay.onclick = function(){
			MI.TalkList.music(musicBoxCur);
			return false;
		}
		if(ico_music){
			ico_music.onclick  = function(){
				MI.TalkList.music(musicBoxCur);
				return false;
			}
		}
		mPause.onclick = function(){
			MI.TalkList.musicStop();
			return false;
		}
		mClose.onclick  = function(){
			MI.TalkList.musicClose();
		}
		var musicLink = $$(musicBoxCur.parentNode.parentNode,'.msgCnt .ico_qlz');
		UI.each(musicLink,function(o){
			o.title = _('绿钻贵族分享的高品质音乐，欢迎收听');
			UI.before(UI.html('<span>（' + _('QQ音乐高品质试听') + '）</span>')[0],o);
		})
	}
}
MI.TalkList.voteEvent = function(voteBox){
	var Self = this;
	for (var i = 0,num = voteBox.length;i < num;i++) {
		var curBox = voteBox[i],
		vThumbsBox = $$(curBox,'.vtThumbs')[0],
		vTools = $$(curBox,'.vTools')[0],
		vClose = $$(curBox,'.vClose')[0];
		vThumbsBox.onclick = function(){
			MI.TalkList.vote(this);
			return false;
		}
		vClose.onclick = function(){
			MI.TalkList.voteClose(this);
			return false;
		}
	}
}
MI.TalkList.pic = function(){ //Picture Event
	var pic = $$(this,'img')[0],
		picBig,
		picBigUrl = pic.parentNode.href,
		P,
		isBig = UI.hasClass(this.parentNode,'big');
	if (UI.hasClass(pic,'preview')) {
		pic = pic.nextSibling;
	}
	//pic.load = 0;
	if (!pic.loaded) {
		MI.mediaMutex && MI.mediaMutex(pic);
		if (pic.loading) {
			return false;
		}
		pic.loading = 1;
		var _loading = UI.html('<em class="ico_load"></em>')[0];
		P = this;
		_loading.style.cssText = 'width:' + UI.width(P) + 'px;height:' + UI.height(P) + 'px;';
		UI.prepend(_loading,P);

		picBig = UI.DC('img');
		picBig.className = 'large';
		picBig.r = 0;
		UI.after(picBig,pic);
		picBig.onload = function(){
			if (UI.B.ie && !this.fileSize && this.load) { //Kill IE's Bug While Load Fail,Dont's Show Error Pic
				return;
			}
			this.load = 1;
			setTimeout(function(){
				MI.TalkList.picSize(picBig);
			},0);
			pic.loading = 0;
			pic.loaded = 1;
			pic.parentNode.blur();
			UI.remove(_loading);
			UI.toggleClass(pic.parentNode.parentNode,'big');
			this.onload = null;
		}
		picBig.onerror = function(){
			MI.picError(this);
		}
		picBig.src = picBigUrl;
	}
	else {
		/*UI.A(pic,'width','');
		UI.A(pic,'height','');
		pic.sUrl = pic.sUrl || pic.src;
		if (pic.src == pic.sUrl) {
			pic.src = picBigUrl;
		}
		else {
			pic.src = pic.sUrl;
		}*/
		pic.parentNode.blur();
		picBig = pic.nextSibling;
		if (picBig.style.display == 'none') {
			UI.toggle(picBig.nextSibling);
		}
		if (isBig) {
			var Y = UI.getY(picBig);
			if (UI.height(picBig) > UI.windowHeight() && Y < UI.scrollY()) {
				setTimeout(function(){
					window.scrollTo(0,Y);
				},0);
			}
			MI.mediaMutex && MI.mediaMutex(pic,1);
		}else{
			MI.mediaMutex && MI.mediaMutex(pic);
		}
		UI.toggleClass(this.parentNode,'big');

	}
	if (!isBig && !pic.use) {
		pic.use = 1;
		MI.Bos('btnPicBigPreloadUse','',0.001);
	}
	else {
		MI.Bos(isBig ? 'btnPicSmall' : 'btnPicBig','',0.01);
	}
	return false;
}
MI.TalkList.picEvent = function(picBox){
	for (var i = 0,num = picBox.length;i < num;i++) {
		var picBoxCur = picBox[i],pic = $$(picBoxCur,'img')[0],
			link = pic.parentNode,
			hasPic = $$(picBoxCur,'.tools'),
			preview;
		if (!link.href){
			return;
		}
		if (!hasPic.length) {
			UI.before(UI.html(MI.tmpl.picTool.replace('$Url',link.href.replace(/\/460$/g,'')))[0],link); //Add Tools
		}
		else {
			UI.each(hasPic,function(o){
				var P = o.parentNode,img = $$(P,'img')[0];
				UI.removeClass(P,'big');
				img.src = img.src.replace(/460$/,'160');
			});
		}
		preview = UI.html('<img class="preview" crs="' + link.href.replace(/460$/,'160') + '"/>')[0];
		UI.prepend(preview,link);
		/*preview.onmousemove = function(){
			UI.removeClass(this.parentNode,'hover');
		}*/
		if (!UI.B.ipad) {
			link.onmouseover = function(){
				var src = UI.A(preview,'crs');
				if (src) {
					UI.A(preview,'src',src);
					UI.A(preview,'crs','');
				}
				UI.addClass(this,'hover');
				UI.A(this,'hideFocus','true');
			}
			link.onmouseout = function(){
				UI.removeClass(this,'hover');
			}
		}
		link.onclick = MI.TalkList.pic;
		//link.onfocus = MI.blur;
		if (!UI.B.ie) {
			UI.A(pic,'alt',_('[图片]'));

			var canvas = document.createElement('canvas');
			canvas.id = MI.random() * Math.random() + 'C';
			MI.canvas[canvas.id] = canvas.getContext('2d');
			if (hasPic) {
				UI.remove($$(picBoxCur,'canvas')[0]);
				UI.remove($$(picBoxCur,'.large')[0]);
			}
			link.appendChild(canvas);
			UI.A(canvas,'width',pic.width);
			UI.A(canvas,'height',pic.height);
			/*try{
				MI.canvas[canvas.id].drawImage(pic,0,0);
				UI.hide(pic);
			}catch(e){ //If Pic Load Fail
				UI.hide(canvas);
			}*/
			//canvas.onclick = MI.TalkList.pic;
		}
		//pic.onclick = MI.TalkList.pic;
		//pic.sUrl = pic.src;
		pic.r = 0;
		pic.onload = MI.TalkList.picLoad;
		$$(picBoxCur,'.btnBack')[0].onclick = $$(picBoxCur,'.btnPrev')[0].onclick = MI.TalkList.picTool;
	}
}
MI.TalkList.picLoad = function(){
	if (this.load) {
		return;
	}
	this.load = 1; //Image's Loaded Status,To Kill GIF's Load Bug In IE
	var T = this;
	setTimeout(function(){
		if (T.width && T.width < 30){
			T.style.paddingLeft = T.style.paddingRight = '30px';
		}
	},0);
	//this.style.display = this.whirl ? 'none' : 'inline';
	if (!UI.B.ie && this.whirl) {
		MI.TalkList.picDraw(this,this.nextSibling);
	}
	if (this.loaded) { //Show Tools After Loading
		UI.toggleClass(this.parentNode.parentNode,'big');
	}
}
MI.TalkList.picTool = function(){
	var P = this.parentNode.parentNode,clockWise = UI.hasClass(this,'btnPrev'),
		Pic = $$(P,'img'),
		pic = Pic[Pic.length - 1];
	if (!UI.B.ie) { //Don't Use Canvas For Gif
		pic.whirl = 1;
	}

	if (clockWise) {
		pic.r++;
	}
	else {
		pic.r--;
	}
	if (pic.r > 3) {
		pic.r = 0;
	}
	else if (pic.r < 0) {
		pic.r = 4 + pic.r;
	}
	if (pic.r % 2 != 0) {
		if (pic.h > 460) {
			pic.width = 460 / pic.h * pic.w;
			pic.height = 460;
		}
	}
	else {
		pic.height = pic.h;
		pic.width = pic.w;
	}
	if (UI.B.ie) {
		pic.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(Rotation=' + pic.r + ')';
	}
	else {
		MI.TalkList.picDraw(pic,pic.nextSibling);
	}
	this.blur();
	MI.Bos('btnPicWhirl');
	return false;
}
MI.TalkList.picDraw = function(pic,canvas){
	var ctx = MI.canvas[canvas.id];
	//UI.hide(pic);
	pic.style.cssText = 'display:none!important';
	canvas.style.display = 'inline';
	canvas.t = pic.width; //Kill Chorme Bug
	switch (pic.r){
		case 0:
			UI.A(canvas,'width',pic.width);
			UI.A(canvas,'height',pic.height);
			ctx.drawImage(pic,0,0);
			break;
		case 1:
			UI.A(canvas,'width',pic.height);
			UI.A(canvas,'height',pic.width);
			ctx.rotate(90 * Math.PI / 180);
			ctx.drawImage(pic,0,-pic.height,pic.width,pic.height);
			break;
		case 2:
			UI.A(canvas,'width',pic.width);
			UI.A(canvas,'height',pic.height);
			ctx.rotate(180 * Math.PI / 180);
			ctx.drawImage(pic,-pic.width,-pic.height);
			break;
		case 3:
			UI.A(canvas,'width',pic.height);
			UI.A(canvas,'height',pic.width);
			ctx.rotate(270 * Math.PI / 180);
			ctx.drawImage(pic,-pic.width,0,pic.width,pic.height);
			break;
	}
}
MI.TalkList.picSize = function(pic){
	pic.w = pic.width;
	pic.h = pic.height;
	/*if (pic.r % 2 != 0) {
		if (pic.h > 460) {
			pic.width = 460 / pic.h * pic.w;
			pic.height = 460;
		}
	}*/
}
MI.FollowBtn = {
	boss : null,
	followCall : null, //收听回调函数
	unFollowCall : null, //取消收听回调函数
	build : function(el,className,type){
		className = className || '.pic a';
		var Self = this,fUserAll = [],fAccount=[];
		if (UI.isArray(el)){
			UI.each(el,function(o){
				getUser(o);
			});
		}
		else {
			getUser(el);
		}
		function getUser(element){
			var fUser = $$(element || $$('.comList')[0],className);
			UI.each(fUser,function(o,i){
				if(!UI.hasClass(o,'cusPic')){
					fAccount.push(MI.string.id(o.href));
					if (!$$(o.parentNode,'.attentBoxWrap').length){
						var head = o;
						if(UI.hasClass(o,'masPic')){
							head = UI.next(o);
						}
						UI.after(UI.html('<div class="attentBoxWrap ' + (type ? '' : 'attentBox') + '"></div>')[0],head);
					}
					fUserAll.push(o);
				}
			});
		}
		MI.ajax({
			url : MI.url.userRelation,
			type : 'get',
			data : 'r=' + MI.random() + '&u=' + fAccount.join(','),
			success : function(data){
				data = MI.json(data);
				if(data.result == 0){
					var btn,p;
					UI.each(fUserAll,function(o){
						var id = MI.string.id(o.href),s;
						if(!UI.hasClass(o,'cusPic')){
							s = type ? '<a class="foFun addAttention" href="#">+' + _('收听') + '</a>' : '<input type="button" class="addAttention" value="' + _('立即收听') + '" />'
							if(data.info[id]){
								p = o.parentNode;
								btn = $$(p,'.attentBoxWrap')[0];
								if(id == MI.user.account){
									s = '';
								}
								btn.innerHTML = s;
								if(data.info[id][0]){
									UI.hide(btn.firstChild);
								}
							}
						}
					});
					Self.addEvent(el,type);
				}
			}
		});
		return false;
	},
	addEvent : function(el,type){
		var Self = this,
			bossFollow = 'btnHeadFollow',
			bossUnFollow = 'btnHeadUnFollow';
		if (Self.boss){
			bossFollow = Self.boss[0];
			bossUnFollow = Self.boss[1];
		}
		if (UI.isArray(el)){
			UI.each(el,function(o){
				addEvent(o);
			});
		}
		else {
			addEvent(el);
		}
		function addEvent(element){
			UI.each($$(element || document.body,'.addAttention'),function(o){
				var del = UI.html(type ? '<div class="foFun disabled" style="display:none">' + _('已收听') + '</div>' : '<a href="#" class="delAttention" style="display:none">' + _('取消') + '</a>')[0];
				UI.after(del,o);
				if(o.style.display == 'none') UI.show(del);
				o.onclick = function(){
					var S = this,user = Self.user(S),rel=UI.A(this.parentNode.parentNode.parentNode,'rel');
					
					MI.follow(user,S,function(){
						UI.hide(S);
						S.className='addAttention';
						UI.show(S.nextSibling);
					});
					MI.Bos(bossFollow + (type || ''), rel||'');
					if(Self.followCall) Self.followCall(S);
					return false;
				}
				if (!type){
					del.onclick = function(){
						var S = this,user = Self.user(S),rel=UI.A(this.parentNode.parentNode.parentNode,'rel');
						MI.follow(user,S,function(){
							UI.hide(S);
							S.className='delAttention';
							UI.show(S.previousSibling);
						});
						MI.Bos(bossUnFollow + (type || ''),rel||'');
						if(Self.unFollowCall) Self.unFollowCall(S);
						return false;
					}
				}
			});
		}
	},
	user : function(el){
		var userList = UI.parents(el,'userList')[0];
		return MI.string.id((userList ? $$(userList,'.userInfo a,.userPic a')[0]: el.parentNode.previousSibling).href);
	}
}
/**
 * 控制Banner和Tips
 * 
 * @param {Object} Object Json字符串
 *            @example
 *            MI.bannerTips({banner:{......}});
 *            MI.bannerTips(); //用于需要异步弹出的Tips，异步执行完调用
 */
MI.bannerTips = function(obj){
	/*
	obj = {
		banner : { //Banner
			id : "14",
			title : "\u4e16\u535a", //标题
			pic : "http:\/\/img1.gtimg.com\/microblog\/pics\/hv1\/99\/165\/614\/39967524.jpg", //图片
			url : "http:\/\/blog.qq.com\/zt\/2010\/2010expo\/index.htm", //链接
			blank : "1", //新窗口
			close : "1" //点连接关闭banner
		},
		msg : { //推广消息
			id : "14",
			content : "html",
		},
		tips : { //新功能Tips
			id : 14,
			target : '.tag a',
			content : 'html',
			css : 'css',
		}
	}
	*/
	obj = obj || MI.bannerTipsCache;
	if (!obj){
		return;
	}
	var oBanner = obj.banner,
		oTips = obj.tips,
		oMsg = obj.msg,
		talkBox = $('talkBox'),
		tipsPosition = function(){};
	if (oMsg && talkBox){
		var idMsg = 'homeMsgTip',
			msg,
			link,
			followAll,
			user = [];
		msg = $(idMsg);
		if (msg){
			msg.innerHTML = '<em class="ico_ntips"></em><span class="left">' + oMsg.content + '</span><a href="#" onclick="UI.hide(\'' + idMsg + '\');MI.ajax({url:\'' + MI.url.updateTips + '\',data:{id:\''+oMsg.id+'\',status:0}});MI.Bos(\'btnMsg_' + oMsg.id + '\');return false" class="close" title="' + _('关闭') + '"></a>';
			/*msg.onmouseover = function(){
				UI.addClass(this,'h1');
			}
			msg.onmouseout = function(){
				UI.removeClass(this,'h1');
			}*/
			link = $$(msg,'.left a');
			followAll = $$(msg,'.newsTipsFollow')[0];
			UI.each(link,function(o){
				var href = UI.A(o,'href'),
					id = MI.string.id(href);
				if (!href.hasString('#') && !href.hasString('/k/') && id.length <= 20){
					user.push(id);
					UI.EA(o,'click',function(){
						MI.Bos('btnMsgUser_' + oMsg.id);
					});
				}
			});
			if (followAll){
				followAll.onclick = function(){
					if (user.length){
						MI.follow(user.join(','),this,function(){
							if (!MI.user.fun.followList || user.length > 1){
								MI.tip(_('收听成功'));
							}
						});
					}
					MI.Bos('btnMsgFollow_' + oMsg.id);
					return false;
				}
			}
		}
		delete obj.msg;
	}
	if (oBanner && talkBox){
		var id = 'homeBannerTip',
			link,
			close = 'MI.ajax({url:\'' + MI.url.updateTips + '\',data:{id:\''+oBanner.id+'\',status:0}});',
			bannerHtml = [],
			bannerPic = oBanner.pic.split(','),
			bannerUrl = oBanner.url.split(','),
			bannerTitle = oBanner.title.split(','),
			banner;
		UI.each(bannerPic,function(o,i){
			if (o){
				bannerHtml.push('<li><a' + (oBanner.blank ? ' target="_blank"' : '') + ' href="' + bannerUrl[i] + '" style="background:url(' + bannerPic[i] + ') 50% 50% no-repeat;" title="' + (bannerTitle[i] || '') + '" class="content"></a></li>');
			}
		});
		if ($(id)){
			$(id).innerHTML = '<a href="#" class="close" title="' + _('关闭') + '"></a>\
					<ul>' + bannerHtml.join('') + '</ul><div class="nums_list page"></div>';
			link = $$($(id),'a');
			link[0].onclick = function(){
				UI.hide(id);
				eval(close);
				tipsPosition();
				return false;
			}
			link[1].onclick = function(){
				MI.Bos('homeBannerTip_' + oBanner.id);
				if (oBanner.close){
					eval(close);
				}
			}
			if (bannerPic.length > 1){
				MI.app({
					Slide : function(){
						MI.slide = new MI.Slide({
							target : $('homeBannerTip'),
							auto : 5000,
							tmpl : '<%for(var i=0;i<num;i++){%><a href="#" class="<%if(i==0){%>on<%}%>"><%=i+1%></a><%}%>'
						});
					}
				});
			}
			delete obj.banner;
		}
	}
	if (oTips){
		var target = $$(oTips.target)[0],html,type;
		if (target){
			/*
				{
					id:'',
					target:'',
					css:'',
					content
				}
			*/
			UI.css(oTips.css);
			html = UI.html(new UI.tmplString(oTips.content)({
						name : MI.user.account,
						nick : MI.user.name
					}))[0];
			type = UI.A(html,'type'); //普通Tips
			setTimeout(function(){
				if (type == 1){
					UI.after(html,target);
				}
				else if (type == 2){
					UI.append(html,target);
				}
				else {
					UI.append(html,document.body);
				}
				tipsPosition();
			},200);
			//if (target.nodeName == 'A'){
				UI.EA(target,'click',function(e){
					closeTips(UI.E(e).target);
					return false;
				});
			//}
			UI.each($$(html,'.TipsClose'),function(o,i){
				o.onclick = function(e){
					closeTips(UI.E(e).target);
					return false;
				}
			});
			function closeTips(el){
				var url = el.href;
				MI.ajax({url:MI.url.updateTips,data:{id:oTips.id,status:0}});
				MI.Bos('btnTips_' + oTips.id + '_' + i);
				UI.hide(html);
				if (url){
					if (!url.hasString('#')){
						document.location.href = url;
					}
				}
			}
			if (!type){
				tipsPosition = function(){
					times--;
					html.style.cssText += ';top:' + UI.getY(target) + 'px;left:' + UI.getX(target) + 'px;';
				}
			}
			delete obj.tips;
		}
	}
	var times = 5;
	var t = setInterval(function(){
		if(times != 0){
			tipsPosition();
		}
		else
			clearInterval(t);
	},1000);
	if (obj){
		MI.bannerTipsCache = obj;
	}
}
/**
 * MI.App 微博App接口
 * @namespace MI.App 个人标签
 * @type Object
 */
MI.App = {
	/**
	 * 主人页帐号信息
	 * 
	 * @type {Object}
	 *            @example
	 *            MI.App.user={
	 *                //QQ号
	 *                uin : '283540706',
	 *                //帐号ID
	 *                name : 'xhlv',
	 *                //中文帐号ID
	 *                chName: 'xhlv',
	 *                //昵称
	 *                nick : 'xhlv',
	 *                //头像
	 *                pic : 'http://t2.qlogo.cn/mbloghead/7cc80671f469f8b92828/50',
	 *                //听众
	 *                follower : 1866
	 *                //收听
	 *                follower : 948,
	 *                //广播数
	 *                talk : 1572,
	 *                //标志位
	 *                flag : {
	 *                	
	 *                },
	 *                //勋章级别 [劳模]
	 *                medal : [4]
	 *            };
	 */
	user : {
	},
	/**
	 * 客人页帐号信息（与主人类似）
	 * 
	 * @type {Object}
	 *            @example
	 */
	guest : null,
	/**
	 * 页面左侧自适应高度
	 * 
	 *            @example
	 *            MI.App.autoHeight();
	 */
	autoHeight : function(){
		var mainWrapper = $('mainWrapper'),
			main = $$('.main')[0];
		if (mainWrapper && main){
			UI.C(main,'padding','');
			UI.C(main,'paddingBottom',UI.height(mainWrapper) - UI.height(main) + 'px');
		}
	},
	/**
	 * 显示页面右侧
	 * 
	 *            @example
	 *            MI.App.showSide();
	 */
	showSide : function(){
		UI.removeClass(document.body,'noSide');
	},
	/**
	 * 隐藏页面右侧
	 * 
	 *            @example
	 *            MI.App.hideSide();
	 */
	hideSide : function(){
		UI.addClass(document.body,'noSide');
	},
	/**
	 * 隐藏客人页用户信息
	 * 
	 *            @example
	 *            MI.App.hideUserInfo();
	 */
	hideUserInfo : function(){
		UI.addClass(document.body,'noUserInfo');
	},
	/**
	 * 显示客人页用户信息
	 * 
	 *            @example
	 *            MI.App.showUserInfo();
	 */
	showUserInfo : function(){
		UI.removeClass(document.body,'noUserInfo');
	},
	/**
	 * 隐藏客人页App页卡
	 * 
	 *            @example
	 *            MI.App.hideUserAppTab();
	 */
	hideUserAppTab : function(){
		UI.hide('userAppTab');
	},
	/**
	 * 显示客人页App页卡
	 * 
	 *            @example
	 *            MI.App.showUserAppTab();
	 */
	showUserAppTab : function(){
		var tab = $('userAppTab'),
			tabs = {
				MicroBlog : {
					name : '微博',
					url : 'http://t.qq.com/',
					on : false
				},
				QzoneBlog : {
					name : '日志',
					url : 'http://t.qq.com/app/qzblog/',
					on : false
				}/*,
				QzonePhoto : {
					name : '相册',
					url : 'http://t.qq.com/app/qzphoto/',
					on : false
				}*/
			},
			type = MIApp.id,
			html = [],
			user;
		if (MI.App.guest && MI.App.guest.name){
			user = MI.App.guest.name;
		}
		if (user){
			if (tabs[type]){
				tabs[type].on = true;
			}
			html.push('<ul>');
			for (var i in tabs){
				if (tabs[i].on){
					html.push('<li class="select"><b>' + tabs[i].name + '</b></li>');
				}
				else {
					html.push('<li><a href="' + tabs[i].url + user + '">' + tabs[i].name + '</a></li>');
				}
			}
			tab.innerHTML = html.join('');
			html.push('</ul>');
			UI.show(tab);
		}
	},
	/**
	 * 弹出对话框
	 * 
	 * @param {Object} {
	 *            title : 标题
	 *            html : 内容，DOM对象或者HTML字符串
	 *            width : 宽度
	 *            height : 高度，不指定则自适应
	 *            start : 弹出对话框的回调函数
	 *            end : 对话框关闭的回调函数
	 *            closeEnd : 关闭对话框（右上角关闭按钮）的回调函数
	 * }
	 *            @example
	 *            MI.App.showDialog({
	 *                title : '<h1 class="DmainTit">发图片微博</h1><p class="qz-pop-tit-other">好精彩的照片！转播给你的听众吧！</p>',
	 *                html : $('qz-talk'),
	 *                width : 530, //宽度
	 *                height : 200, //高度
	 *                start : function(){ //弹出对话框的回调函数
	 *                    
	 *                },
	 *                end : function(){ //对话框关闭的回调函数
	 *                    
	 *                },
	 *                closeEnd : function(){ //关闭对话框（右上角关闭按钮）的回调函数
	 *                    
	 *                }
	 *            });
	 */
	showDialog : function(o){
		MI.app({
			Base : function(){
				MI.dialog.show(o);
			}
		});
	},
	/**
	 * 关闭对话框
	 * 
	 *            @example
	 *            MI.App.hideDialog();
	 */
	hideDialog : function(){
		MI.app({
			Base : function(){
				MI.dialog.hide();
			}
		});
	},
	/**
	 * 创建广播框
	 * 
	 * @param {Object} {
	 *            target : Object 目标DOM，通常为包含TalkBox的DIV
	 *            autoSave : Boolean 是否保存未发表的内容，默认false
	 *            addList : Boolean 是否插入到MI.talkList，默认false
	 *            txtMax : Number 最大输入字数，默认140
	 *            txt : String 默认输入框文字
	 *            sourcePic : String 需要插入的图片地址
	 *            success : Function 广播成功的回调
	 *            successStart : Function 广播成功的回调（文字提示前）
	 *            failStart : Function 广播失败的回调（文字提示前）
	 * }
	 * @return {Object} {
	 *            sourcePic : String 需要插入的图片地址
	 *            focus : Function 焦点到输入框
	 *            countTxt : Function 统计字数
	 *            addPic : Function 插入图片（有插入图片的按钮才支持）
	 * }
	 *            @example
	 *            var talkBox = MI.App.talk({target : $('qz-talk')});
	 *            talkBox.countTxt();
	 *            talkBox.sourcePic = 'http://t3.qpic.cn/mblogpic/a5b10e75b73f412aeb9e/460';
	 */
	talk : function(o){
		var talkBox = new MI.TalkBox(o.target);
		if (o.addList){
			talkBox.addList = o.addList;
		}
		if (o.txtMax){
			talkBox.txtMax = o.txtMax;
		}
		if (o.txt){
			talkBox._txt.value = o.txt;
			talkBox.countTxt();
		}
		if (o.sourcePic){
			talkBox.sourcePic = o.sourcePic;
		}
		if (o.success){
			talkBox.success = o.success;
		}
		if (o.successStart){
			talkBox.successStart = o.successStart;
		}
		if (o.failStart){
			talkBox.failStart = o.failStart;
		}
		return talkBox;
	},
	/**
	 * 创建广播列表
	 * 
	 * @param {Object} {
	 *            target : Object 目标DOM，通常为包含TalkList的UL
	 *            relayCall : Function 转播成功的回调函数
	 *            commentCall : Function 评论成功的回调函数
	 *            replyCall : Function 对话成功的回调函数
	 * }
	 * @return {Object} {
	 *            addEvent : Function 对某条消息绑定事件
	 * }
	 *            @example
	 *            var talkList = MI.App.talkList({target : $('qz-talkList')});
	 *            talkList.addEvent(li);
	 */
	talkList : function(o){
		var talkList = new MI.TalkList(o.target);
		if (o.relayCall){
			talkList.relayCall = o.relayCall;
		}
		if (o.commentCall){
			talkList.commentCall = o.commentCall;
		}
		if (o.replyCall){
			talkList.replyCall = o.replyCall;
		}
		return talkList;
	},
	/**
	 * 获取转播列表
	 * 
	 * @param {Object} {
	 *            target : Object 目标DOM，通常为包含TalkList的UL
	 *            id : String 消息ID
	 *            type : String 接口类型，默认为"html"，暂时不支持"json"
	 *            success : Function 成功回调函数
	 *            fail : Function 失败回调函数
	 * }
	 * @return {Object} {
	 * }
	 *            @example
	 *            var relayList = MI.App.relayList({target : $('qz-relayList'),id:'24106133577475'});
	 */
	relayList : function(o){
		if (o.target && o.id){
			var format = 1,
				page  = function(url){
				MI.ajax({
					url : url,
					type : 'get',
					data : 'format=' + format,
					success : function(data){
						data = MI.json(data);
						if (data.result == 0){
							if (format == 1){
								o.target.innerHTML = data.info;
								var relayList = new MI.TalkList($$(o.target,'ul')[0]);
								relayList.eventCall = function(el){
									var text = relayList.getRelayOld(el,'.msgCnt');
									UI.each($$(el,'.relay,.comt'),function(o){
										UI.A(o,'cont',text);
									});
								}
								UI.each($$(o.target,'.title .left a,.blueFoot a'),function(e){
									e.onclick = function(){
										page(this.href);
										return false;
									}
								});
								UI.each($$(o.target,'a'),function(e){
									UI.A(e,'target','_blank');
								});
								MI.Crs(1);
							}
							o.success(data);
						}
						else if (data.msg){
							//MI.alert(data.msg);
							o.fail(data);
						}
					}
				});
			}
			if (o.type == 'json'){
				format = 2;
			}
			page(MI.url.t + o.id);
		}
	},
	/**
	 * 对话
	 * 
	 * @param {String} String 用户ID或消息ID
	 * @param {String} String 用户昵称或备注
	 * @param {String} String 默认文本
	 *            @example
	 *            MI.App.reply('liuxiang','刘翔','你好');
	 *            MI.App.reply('2109004983375','刘翔','你好');
	 */
	reply : function(id,nick,txt){
		MI.reply(id,nick,txt);
	},
	/**
	 * 聊天
	 * 
	 * @param {String} String 用户ID
	 * @param {String} String 用户昵称或备注
	 * @param {String} String 用户头像
	 *            @example
	 *            MI.App.chat('xhlv','xhlv','http://t3.qlogo.cn/mbloghead/0d2b6bf91dfad0d16f1c');
	 */
	chat : function(id,nick,avatar){
		MI.chat(id,nick,avatar);
	},
	/**
	 * 推荐
	 * 
	 * @param {String} String 用户ID
	 * @param {String} String 用户昵称或备注
	 *            @example
	 *            MI.App.recom('liuxiang','刘翔');
	 */
	recom : function(id,nick){
		MI.recom(id,nick);
	},
	/**
	 * 发私信
	 * 
	 * @param {String} String 用户ID
	 * @param {String} String 默认文本
	 *            @example
	 *            MI.App.message('liuxiang','hello');
	 */
	message : function(id,txt){
		MI.message(id,txt);
	},
	/**
	 * 举报
	 * 
	 * @param {String} String 消息ID或者用户帐号
	 *            @example
	 *            MI.report('9077059366006');
	 *            MI.App.report('liuxiang');
	 */
	report : function(id){
		MI.report(id);
	},
	/**
	 * 警告提示
	 * 
	 * @param {String} String 提示文本
	 *            @example
	 *            MI.App.alert('你填写的地址有问题');
	 */
	alert : function(str,call){
		MI.alert(str,call);
	},
	/**
	 * 成功提示
	 * 
	 * @param {String} String 提示文本
	 *            @example
	 *            MI.App.tip('保存成功');
	 */
	tip : function(str,call){
		MI.tip(str,call);
	},
	/**
	 * 转播
	 *            @example
	 *            MI.App.relay('1234567890', '这是上次转播的内容');
	 *            MI.App.relay('1234567890', domOfTheTweet);
	 * @param {String} talkId 被转播tweet的id
	 * @param {String|Object} content 该条tweet上次被转播的评语，或被转播的tweet的dom引用(利用dom元素自动查找上次被转播内容），该参数可以忽略
	 */
	relay : function(talkId,content) {
		MI.relay(talkId,content);
	},
	/**
	 * 评论
	 *            @example
	 *            MI.App.comment('1234567890', '这是上次转播的内容');
	 *            MI.App.comment('1234567890', domOfTheTweet);
	 * @param {String} talkId 被评论tweet的id
	 * @param {String|Object} content 该条tweet上次被转播的评语，或被转播的tweet的dom引用(利用dom元素自动查找上次被转播内容），该参数可以忽略
	 */
	comment : function(talkId,content) {
		MI.comment(talkId,content);
	}
}

MI.newCount.data = {};
MI.host = document.location.host;
if (MI.host == 't.qq.com' || MI.host == 'qun.t.qq.com' || MI.host == 'app.t.qq.com'){
	MI.hostType = 1;
}

//Base App
MI.app({
	Base : function(){
		if (MI.hostType == 1){
			//Set Accesskey
			if (UI.B.ie && MI.hostType == 1){
				UI.each([$$('.side a')[0],$$('.AL a')[0]],function(o){
					if (UI.isElement(o)){
						UI.A(o,'accessKey','x');
					}
				});
			}

			setTimeout(function(){
				MI.navMenu();
				//MI.listDrop(MI.user.floatList);
				MI.listDrop.build();
				MI.searchKey();
				MI.linkBoss();
			},0);

			//Theme Setting
			setTimeout(function(){
				MI.themeSet();
			},0);
			
			//Badge
			setTimeout(function(){
				MI.badge.build();
			},0);
		}
			
		//Go Top
		if (MI.user.fun.goTop && MI.user.account){
			MI.GoTop.build();
		}

		//Auto Get More Talk List
		setTimeout(function(){
			if (MI.talkList && MI.talkList.auto && MI.talkList._more) {
				MI.autoMore();
			}
		},0);

		//Create Dialog && Card && DialogTip
		MI.dialog = MI.dialog || new MI.Dialog();
		MI.dialog._bg.style.height = UI.pageHeight() + 'px';

		setTimeout(function(){
			MI.code = new MI.Code();
		},0);
		MI.tips = new MI.Tips();
		MI.card = new MI.Card();
	}
});

UI.ready(function(){
	//MI.user.fun 的默认值
	if (MI.user.fun) {
		var fun = {search:1,goTop:1,mergePic:1,card:1};
		for (var i in fun) {
			if (UI.isUndefined(MI.user.fun[i])) {
				MI.user.fun[i] = fun[i];
			}
		}
	}
	
	//API逻辑处理
	if (MI.api.source){
		MI.TalkBox.prototype.source = MI.api.source;
	}

	try{MI.isS = MI.S('x') != '$No$';}catch(e){};
	UI.EA(document.body,'click',function(){
		for (var i in MI.drop) {
			UI.addClass(MI.drop[i],'off');
			delete MI.drop[i];
		}
	});

	//MI.lazy
	setTimeout(function(){
		var lazyHtml;
		for (var i in MI.lazy) {
			lazyHtml = $(i);
			if (lazyHtml) {
				lazyHtml.innerHTML = MI.lazy[i];
			}
		}
	},0);

	//MI.Crs
	setTimeout(function(){
		var delayCrs = function (){
			clearTimeout(MI.delay.crs);
			MI.delay.crs = setTimeout(MI.Crs,200);
		};
		if (!MI.Crs.disabled) {
			MI.Crs(1);
			UI.EA(window,'scroll',delayCrs);
			UI.EA(window,'resize',delayCrs);
		}
	},10);
	
	if (MI.talkList && MI.talkList.auto && 0) { //自动加载更多消息
		var account = MI.user.account,
			listStorageName = account + '_' + MI.talkList.first.id + '_' + MI.talkList.last.id,
			//listName = 'list_' + account,
			newList = 'new_' + listStorageName,
			moreList = 'more_' + listStorageName,
			scrollTop = 'scroll_' + listStorageName,
			listTime = MI.S('listTime');
		if (MI.talkBox){
			window.onbeforeunload = function(){
				var time = + new Date();
				if (!MI.isS || !listStorageName) {
					return;
				}
				location.hash = 'M';
				MI.S(scrollTop,UI.scrollY());
				if (MI.talkList && MI.ajaxTimes && MI.ajaxTimes < 10) {
					//try{
						MI.S(newList,'[' + MI.talkNew.join(',') + ']');
						MI.S(moreList,'[' + MI.talkMore.join(',') + ']');
	
						/*var listStorage = MI.S(listName),
							list = listStorage ? MI.json(listStorage) : [];
						list.push('"' + listStorageName + '"');
						MI.S(listName,'[' + list.join(',') + ']');*/
					//}catch(e){
					//	clear();
					//}
				}
				/*function clear(){ //Clear Storage
					var list = MI.json(MI.S(listName));
					if (UI.isArray(list)) {
						UI.each(list,function(o){
							MI.S('new_' + o,'');
							MI.S('more_' + o,'');
							MI.S('scroll_' + o,'');
						});
					}
					MI.S(listName,'');
					MI.S('listTime',new Date().getTime());
				}*/
			};
		}
		if (MI.isS) {
			var time = + new Date();
			if (!listTime || time - listTime > 1200000) { //3600000
				MI.S.clear();
				MI.S('listTime',time);
			}

			if (location.hash == '#M') {
				//if (document.referrer == '' || document.referrer == location.href) {
				//	return;
				//}
				var _newList = MI.S(newList),
					_new = MI.json(_newList),
					_moreList = MI.S(moreList),
					_more = MI.json(_moreList);
				MI.app({
					Base : function(){
						if (_newList) {
							MI.talkNew.push(_newList.slice(1,-1) || '{}');
						}
						if (_moreList) {
							MI.talkMore.push(_moreList.slice(1,-1) || '{}');
						}
						if (_new) {
							UI.each(_new,function(o){
								MI.talkList.addNewly(o);
							});
						}
						if (_more) {
							UI.each(_more,function(o){
								MI.talkList.addMore(o);
							});
						}
						window.scrollTo(0,MI.S(scrollTop));
					}
				});
			}
		}
	}

	if (MI.talkBox && !UI.B.ipad) {
		var draft = 'draft_' + MI.user.account;
		if (MI.talkBox.autoSave && MI.isS) {
			/*UI.EA(window,'beforeunload',function(){
				var txt = MI.talkBox._txt.value;
				MI.S(draft,txt || '');
			});*/
			MI.talkBox._txt.value = MI.S(draft).replace(/^undefined|^Null/,'') || ''; //有隐患，有时间再查一下
			MI.talkBox.countTxt();

			if (UI.parseUrl().p > 1){ //翻页模式自动定位到消息列表
				var scrollY = 250,
					talkBox = $('talkBox');
				if (talkBox){
					scrollY = UI.getY(talkBox) + UI.height(talkBox);
				}
				window.scrollTo(0,scrollY);
			}
			else {
				setTimeout(function(){ //Auto Focus
					if (!MI.talkBox._msgTo && location.hash != '#M' && UI.scrollY() < 250) {
						try{
							MI.talkBox.focus();
						}catch(e){}
					}
				},500);
			}
		}
	}

	if (MI.hostType == 1){
		//MI.College
		if (MI.user.college) {
			MI.app({
				College : function(){
					MI.College.build();
				}
			});
		}
	
		//页面大运会/微博等级图标tips构建，不包括talklist
		var areaTitle;
		var guest = $('LUI');  //客人页
		var host = $('UIn'); //主人页
		if (guest == null)
			areaTitle = host;
		else
			areaTitle = guest;
		MI.app({
			Base : function(){
				setTimeout(function(){
					MI.tips.build({
						area : areaTitle,
						target : '.ico_dyh',
						txt : MI.TalkList.prototype.sportTips,
						click : function(){
							MI.Bos('btnClickDyh');
						}
					});
					MI.tips.build({
						area : areaTitle,
						target : '.ico_level',
						txt : MI.TalkList.prototype.levelTips
					});
				},100);
			}
		});
		//用户列表展示微博等级图标tips
		var areaList;
		var userList = $$('.listWrapper .LC')[0];
		areaList = userList;
		if(userList != null){
			MI.app({
				Base : function(){
					setTimeout(function(){
						MI.tips.build({
							area : areaList,
							target : '.ico_level',
							txt : MI.TalkList.prototype.levelTips
						});
					},100);
				}
			});
		}
	
		//安全中心的蠕虫监控
		if (Math.random() <= 0.1) {
			//灰度10%
			setTimeout(function(){
				UI.getScript('http://mat1.gtimg.com/www/js/common.js',function(){
					checkNonTxDomain(0.1,10);
				});
			},3000);
		}
		/*if (Math.random() < 0.1){
			MI.app({
				NonTx : function(){
					MI.NonTx.build();
				}
			});
		}*/
	}

	//App Load
	MI.appLoad();
});

})();

if (window._MIRun){
	for (var i in _MIRun){
		try{
			_MIRun[i]();
		}catch(e){}
	}
}
MIRun = function(o){
	o();
}
