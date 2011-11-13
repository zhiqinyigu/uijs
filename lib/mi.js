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
		mb_mayBeKnown 主timeline上方是否显示可能认识的人
		mb_hiq_novip 主页的热门广播（1-非认证用户、0-全部）
		mb_faqbox_[topic] 是否回答过问答

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
onerror = function(msg,url,line){
	if(!MI.user.isLab && MI.hostType){
		MI.Bos({
			name : 'btnOnerror',
			iBak1 : line || '',
			sBak1 : encodeURIComponent(msg || ''),
			sBak2 : window.navigator.userAgent,
			id : 1210
		});
		return true;
	}
};
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
	 *                    btnStyle:0, //按钮风格（0-转播.评论.更多  1-转播.对话.更多  1-转播.对话.更多）
	 *                    goTop:1, //返回顶部
	 *                    followList:1, //收听后加入名单
	 *                    msgLab:1, //新私信
	 *                    chat:1, //实时聊天
	 *                    newCount:1, //新消息拉取方式
	 *                    newRelay2:1, //新二传手
	 *                    relayListBoxCondensed:1, //转播列表转播框只保留一行
	 *                    card:1, //资料卡片
	 *                    note:1, //备注功能
	 *                    btnReply:1, //对话的对话按钮放外面
	 *                    comtReply:1, //默认显示评论的回复框
	 *                    shield:1, //屏蔽消息功能开关
	 *                    msgBox:1, //消息盒子功能开关
	 *                    noti:1, //消息盒子通知入口
	 *                    comm:1, //消息盒子评论我的入口
	 *                    relayFilter:1, //是否屏蔽没有转播理由的@提醒
	 *                    favGroup:1, //是否收藏分组
	 *                    newViewSet:1, //新的浏览设置
	 *                    autoMoreContinue:1, //每次手动点击更多后，自动加载2次
	 *                    relTopic:1, //发表框相关话题引导
	 *                    uptop:1 //置顶按钮开关
	 *                    checkBtnOriginalPic:1 //简版微博 根据原图大小 判断是否有必要显示 查看原图icon
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
			var arr = (str || '').match(/[^\x00-\x80]/g);
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
		/**
		 * 按字符长度裁剪字符串
		 * 
		 * @param {String} String 原字符串
		 * @return {number}  number截取长度
		 * @return {string}  string 截取后填充字符
		 *            @example
		 *            MI.string.cut('我是xiaom565',4,'');    //返回  '我是'
		 *            MI.string.cut('daklfjsklafjas',7,''); //返回  'daklfjs' 
		 */
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
			var str = (str || '').match(/[^\/]+$/g);
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
			var account = (str || '').match(/@[^@]+$/g);
			return account && account[0] ? account[0].slice(1,-1) : '';
		},
		/**
		 * 拼接字符串,主要为了支持英文版人称的翻译
		 * 
		 * @param {String} String 字符窜
		 * @param {String} String 变量
		 * @return {String} String 拼接后的字符串
		 *            @example
		 *            MI.string.sprintf('搜%s的广播',MI.guest.sex);
		 */
		sprintf : function(){
			var arg = arguments,
			str = arg[0] || '',
			i, n;
			for (i = 1, n = arg.length; i < n; i++) {
				str = str.replace(/%s/, arg[i]);
			}
			return str;
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
				<div class="insertFun"><div class="sendList insertFace"><a class="txt" href="#" title="' + _('表情') + '"><em class="sico ico_face"></em></a></div><div class="sendList newTopic"><a href="#" class="creatNew txt" title="' + _('汇聚相同热点的广播') + '" tabindex="3"><em class="sico ico_topic"></em>' + _('话题') + '</a></div><div class="sendList atSome"><a class="txt" href="#" title="' + _('@朋友帐号就可以提到他') + '"><em class="sico ico_at"></em>' + _('朋友') + '</a></div></div>\
				<div class="left"></div>\
				<input type="button" class="inputBtn sendBtn" value="" /><a hrer="#" class="autoBackspace" style="display:none">'+_('[自动缩减]')+'</a><span class="countTxt"></span>\
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
	/**
	 * 返回文本框中的文本参数
	 * 
	 * @param {Object} Object Dom对象
	 * @return {Object} Object {start:开始位置,end:结束位置,txt:选中文本}
	 *            @example
	 *            getSelectTxt(el);
	 */
	getSelectTxt : function(el){
		var start = MI.cursorX(el),end = 0,txt = '';
		if (document.selection) {
			txt = document.selection.createRange().text;
			end = start + txt.length;
		} else {
			end = el.selectionEnd;
			txt = el.value.substring(start, end);
		}
		return {
			start : start,
			end : end,
			txt : txt
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
			var selectedTxt = document.selection.createRange().text; //有文字选中时，取到的MI.cursorX包括了选中的文字长度
			position = txt[txt.length - 1].replace(/\r/g,'').length - selectedTxt.length;
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
	 * @param {Boolean} Boolean 是否需要换算url
	 * @param {Boolean} Boolean 是否要计算中文字符，为1是计算
	 * @param {Number} Number 最大字数
	 * @return {Number} Number 字数
	 *            @example
	 *            var length = MI.countTxt('text',1);
	 */
	countTxt : function(value,countUrl,zhCount,txtMax){
		if(zhCount==null) zhCount=1;
		var length = MI.string.length(value),
			len,
			urlExceed = 0,
			urlNum = 0,
			url = value.match(new RegExp('((news|telnet|nttp|file|http|ftp|https)://){1}(([-A-Za-z0-9]+(\\.[-A-Za-z0-9]+)*(\\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\\.[0-9]{1,3}){3}))(:[0-9]*)?(/[-A-Za-z0-9_\\$\\.\\+\\!\\*\\(\\),;:@&=\\?/~\\#\\%]*)*','gi')) || [];
		if(!zhCount) length = value.length;
		if (txtMax != 140 || length < 1000) {//兼容群公告500字的情况
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
			var temp = UI.trim(value).replace(new RegExp(_('#输入话题标题#'),'g'),'');
			length = Math.ceil((MI.string.length(temp) + urlNum * 20 + urlExceed)/2);
			if(!zhCount) length = temp.length + urlNum * 20 + urlExceed;
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
				var isFollow = -1,isEach = -1,url,className = el.className,classNameFollow = 'addAttention',classNameUnfollow = 'delAttention',classNameEach = 'delEach', followedNum = $('followedNum_' + id),followNum = $('followNum_' + id),isNotButton = className != classNameFollow && className != classNameUnfollow && className != classNameEach;
				if (className == classNameFollow || isNotButton ) {
					isFollow = 1;
					url = MI.url.follow;
				}
				else {
					if(className == classNameEach){
						isFollow = 1;
						isEach = 1;
					}
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
									if(isEach==1)
										el.className = classNameEach;
									else
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
								call(isFollow, el, id);
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
	/**
	 * 存储新消息数
	 * 
	 * @type {Number}
	 *            @example
	 *            MI.newCountNum = 0;
	 */
	newCountNum : 0,
	/**
	 * 第一次拉取新消息数
	 * 
	 * @type {Number}
	 *            @example
	 *            MI.newCountFirst = false;
	 */
	newCountFirst : 1,
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
	 * 17 => 微群聚合页的消息提醒
	 * 18 => 评论的数量
	 * 20 => 任务提醒数
	 */
	newCount : function(type, url, time){
		type = type || '4,3,2,1';
		MI.newCount.type = type;
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
			var urlData = {type:MI.newCount.type,r:MI.random()}; 
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
				if (MI.newCount.currentTime)
				{
					urlData['time'] = MI.newCount.currentTime;
					MI.newCount.data['time'] = MI.newCount.currentTime;
				}
				var Time,Time_1,Time_2,Time_3;
				Time = + new Date();
				
				if (MI.newCountFirst && !url){ //JSONP回调方式
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
				MI.newCountFirst = 0;
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
		MI.newCount.checkDropList = function(target, num, list){
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
		//顶部消息盒子
		if(!MI.newTopMsgBox) {
			MI.newTopMsgBox = function(data){
				var navMsgBox = $$(document.body,'.headWrap .topNavMsg')[0];
				if(!navMsgBox) return;
				var navMsgList = UI.GT(navMsgBox,'ul')[0];
				if(!navMsgList) {
					navMsgList = UI.html('<ul class="topNavSub" style="display: none; ">\
						<li><a href="http://t.qq.com/at" onclick="MI.Bos(\'btnNewNavNews\')">' + _('提到我的') + '<b></b></a></li>\
						<li style="display:' + (MI.user.fun.comm ? 'block' : 'none') + '"><a href="http://t.qq.com/comm" onclick="MI.Bos(\'btnNewNavComt\')">' + _('评论我的') + '<b></b></a></li>\
						<li><a href="http://t.qq.com/' + MI.user.account + '/follower" onclick="MI.Bos(\'btnNewNavFollower\')">' + _('听众') + '<b></b></a></li>\
						<li><a href="http://t.qq.com/messages/inbox" onclick="MI.Bos(\'btnNewNavMessage\')">' + _('私信') + '<b></b></a></li>\
						<li style="display:none"><a href="http://t.qq.com/at?filter=1" onclick="MI.Bos(\'btnNewNavFollowing\')">' + _('我收听的人') + '<b></b></a></li>\
						<li style="display:none"><a href="http://t.qq.com/at?filter=2" onclick="MI.Bos(\'btnNewNavAuth\')">' + _('认证用户') + '<b></b></a></li>\
						<li style="display:none"><a href="http://t.qq.com/at?qun" onclick="MI.Bos(\'btnNewNavGroup\')">' + _('微群') + '<b></b></a></li>\
						<li><a href="javascript:void(0)">' + _('任务') + '<b></b></a></li>\
						<li style="display:' + (MI.user.fun.noti ? 'block' : 'none') + '"><a href="http://t.qq.com/messages/notice" onclick="MI.Bos(\'btnNewNavNoti\')">' + _('通知') + '<b></b></a></li>\
					</ul>')[0];
					UI.append(navMsgList,navMsgBox);
				}	
				var msgBoxTotal = $$(navMsgBox,'.defaultCur strong')[0];
				var msgBoxItem = [msgBoxTotal].concat($$(navMsgList,'li b'));
				var msgBoxNum = [0,0,0,0,0,0,0,0,0,0];
				var msgBoxType = { //消息type : 对应的元素在消息盒子下拉菜单中的位置
					18 : 2, //评论我的
					1 : 3, //新听众
					2 : 4, //私信
					4 : [1,5,6], //@消息[所有，我收听的，认证用户]
					14 : [1,5,6], //@有理由的消息[所有，我收听的，认证用户]
					13 : 7,  //微群
					20 : 8, // 任务,type临时为100，需要修改
					19 : 9 //通知
				};
				var maxNum = 999;
				
				UI.each(data.info,function(o,i){
					num = o.value;
					if(o.type in msgBoxType) {
						if((o.type == 4 || o.type ==14) && UI.isArray(num)) {
							UI.each(num,function(p,i){
								msgBoxNum[msgBoxType[o.type][i]] = p;
							})
						} else {
							msgBoxNum[msgBoxType[o.type]] = num;
						}
					}
				});	
				
				if(!MI.user.fun.noti) msgBoxNum[9] = 0; 
				if(!MI.user.fun.comm) msgBoxNum[2] = 0;

				//总数
				msgBoxNum[0] = msgBoxNum[1] + msgBoxNum[2] + msgBoxNum[3] + msgBoxNum[4] + msgBoxNum[8] + msgBoxNum[9];

				//下拉菜单
				UI.each(msgBoxNum,function(p,i){
					changeNum(p,i);
				});

				function changeNum(p,i){
					var item = msgBoxItem[i];
					p = parseInt(p) || 0;
					if(i==6 || i==7) return false; //临时隐藏我收听的，认证用户和微群
					if(p) {
						if(i == 0) {
							p = p > maxNum ? maxNum + '+' : p;
						} else if(i == 3) { //新增听众 
							p = p > maxNum ? maxNum + '+' : '+' + p;
						} else if(i == 1 || i == 2 || i == 4 || i == 8 || i== 9) { //私信
							p = '+' + p;
						};

						(i == 0) ? UI.addClass(item.parentNode,'newMsg') :  //总数
								UI.show(item); 								//其他
					} else {
						(i == 0) ? UI.removeClass(item.parentNode,'newMsg') :
								UI.hide(item);
					}
					item.innerHTML = p;
				};		

				UI.show(navMsgBox); //显示整个消息盒子
				//任务
				msgBoxItem[msgBoxItem.length-2].parentNode.onclick = function(){
					UI.hide(this.lastChild);
					changeNum(msgBoxNum[1] + msgBoxNum[2] + msgBoxNum[3] + msgBoxNum[4] + msgBoxNum[9],0);   //改变总数
					MI.app({Task:function(){MI.Task.build()}});
					MI.Bos('btnNewNavTask');
					return false
				};
			}
		};
		MI.newCountShow = MI.newCountShow || function(data){
			if (data.result == 0) {
				var target,
					num,
					maxNum,
					tip,
					tipNum = 0,
					showMsgBox,
					_new;

				//当前与页面帐号不符时，刷新页面
				if (data.user && data.user != MI.user.account){
					document.location.reload();
					return;
				}
					
				//消息盒子
				MI.newTopMsgBox(data);
				
				UI.each(data.info,function(o,i){
					num = o.value;
					//听众
					if (o.type == 1) {
						target = $('newCountFollower');
						if (target && num) {
							var _num = target.firstChild,followerNum = $('followerNum');
							maxNum = 999;
							_num.innerHTML =  num > maxNum ? maxNum + '+' : '+' + num;
							_num.title = _('有{0}个新听众',num > maxNum ? _('超过') + maxNum : num);
							UI.addClass(UI.next(_num),'bubble');
							UI.show(target);
						}
						else if (target){
							UI.hide(target);
						}
					}
					//名单新收录提醒
					if (o.type == 8) {
						target = $('newListonNum');
						if (target && num) {
							var _num = target.firstChild;
							maxNum = 999;
							_num.innerHTML =  num > maxNum ? maxNum + '+' : '+' + num;
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
							var tips = '';
							if(num==1)
								tips = _('约{0}新广播，点击查看',tip);
							else if(num>1)
								tips = _('约{0}新广播，点击查看<i class="l"></i>',tip);
							//搜索广播添加
							if (MI.newCount.showNum)
								tips = _('<strong></strong>有新广播，点击查看');
							_new.innerHTML = '<a href="javascript:void(0)" tabindex="4" accesskey="x">' + tips + '</a>';
							
							if (!MI.newCount.showNum)
							{
								//Title Tip
								MI.newCount.setTitle(num,maxNum);
								MI.newCountNum = num;
							} else {
								MI.newCountNum = 0;
							}
		
							if (num) {
								_new.style.display = 'block';
								MI.Bos('btnkNewShow',num,0.001);
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
					//任务提醒,旧版导航
					if(o.type == 20) {
						target = $$(document.body,'.topMenu .task')[0];
						if(target) {
							if(!UI.A(target,'event')) {
								UI.append(UI.html('<sup style="display:none" class="ico_newMsg"><b>new</b></sup>')[0],target);
								target.onclick = function(){
									UI.hide($$(this,'.ico_newMsg')[0]);
									MI.app({
										Task : function(){
											MI.Task.build();
										}
									});		   
									MI.Bos('btnTopMenuMyTask');
									return false;
								}
								UI.A(target,'event',1);
							}
							UI.GT(target,'sup')[0].style.display = num ? '' : 'none';
						}
					}
					//通知,旧版导航
					if((o.type == 19) && MI.user.fun.noti) {
						target = $$(document.body,'.topMenu .noti')[0];
						if(target) {
							if(!UI.A(target,'event')) {
								UI.append(UI.html('<sup style="display:none" class="ico_newMsg"><b>new</b></sup>')[0],target);
								UI.A(target,'event',1);
							}
							UI.GT(target,'sup')[0].style.display = num ? '' : 'none';
						}
					}
					//评论我的
					if((o.type == 18) && MI.user.fun.comm) {
						target = $('newCoutComt');
						if(target) {
							target.innerHTML =  num ? '(' + num + ')' : '';
						}
					}
					//提到我的
					//if (o.type == 4 || o.type == 13 || o.type == 14) {
					if(o.type == 4 || o.type == 14) {
						target = $('newCoutAt');
						if (UI.isArray(num)) {
							num = num[0];
						}
						if (target) {
							target.innerHTML =  num ? '(' + num + ')' : '';
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
	changeLang : function(event){
		var dom = UI.E(event).target;
		var href = UI.A(dom,'href');
		//以下两行兼容ie取出的href带http://的情况
		var index1 = href.indexOf('?');
		if(index1 != 0) href = href.substring(index1,href.length);
		var url='';
		var hrefNow = document.location.href;
		if(hrefNow.indexOf('?')==-1)
			url = hrefNow + href;
		else{
			if(hrefNow.indexOf('?lang=')!= -1)
				url = hrefNow.substring(0,index-1) + href;
			else{
				var index = hrefNow.indexOf('lang=');
				if(index != -1)
					url = hrefNow.substring(0,index-1) + '&' + href.substring(1,href.length);
				else
					url = hrefNow + '&' + href.substring(1,href.length);
			}
		}
		document.location = url;
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
		else if (!id) {
			var className = 'pageNav';
			if ($(className)) {
				MI.bottom(className);
			}
			if ($(className + 'Wrap')) {
				MI.bottom(className + 'Wrap');
			}
			if (window.MIApp){ //微博App
				MI.App.autoHeight();
			}
		}
		else if (id && $$('.' + id)[0]){
			var pageNav = $$('.' + id)[0];
			var lists = $$('.main .LC'),list,main = UI.parents(pageNav,'main')[0],wrap,y = 0;
			if (main) {
				wrap = main.parentNode;
			}
			if (!lists.length) {
				lists = $$('.LC');
			}
			list = lists[lists.length - 1];
			if (list && UI.height(pageNav)) {
				UI.C(pageNav,'marginBottom',0);
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
				UI.C(pageNav,'marginBottom',y < -1 ? - y + 'px' : '');
			}
		}
	},
	/**
	 * 回到我的主页
	 * 
	 * @param {String} String 跳转时的参数
	 *            @example
	 *            MI.goHome();
	 *            MI.goHome('preview');
	 */
	goHome : function(data){
		document.location.href = 'http://t.qq.com/' + MI.user.account + (data ? '?' + data : '');
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
	 * 求收听
	 * 
	 * @param {String} String 用户ID
	 * @param {String} String 用户昵称或备注
	 *            @example
	 *            MI.reFollow('liuxiang','刘翔');
	 */
	reFollow : function(id,nick) {
		MI.app({
			Base : function(){
				MI.card.account = id;
				MI.card.bkname = MI.card.name = nick;
				MI.card._reFollow.onclick();
				MI.Bos('btnGuestReFollow');
			}
		});
		return false;
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
	 * @param {} media
	 * @param {function} call 执行成功后的回调函数
	 *            @example
	 *            MI.talk('写出你的生存技巧：','我的生存技巧……',40);
	 */
	talk : function(title,content,height,media) {
		MI.app({
			Base : function(){
				MI.reply = new MI.Reply();
				if (media){
					MI.reply.talkBox.addMusic(media);
					if(media.vid){
						MI.reply.talkBox.vid = media.vid;
						MI.reply.talkBox.successStart = function(){
							//MI.tip(media.msg);
							MI.confirm({
								type : 'success',
								title : '发布提示',
								content : media.msg,
								confirmTxt : '确定',
								confirm : function() {
									MI.dialog.hide();
								},
								cancelTxt : '取消',
								cancel :function(){}
							});
						};
					}
					if (media.video){
						MI.reply.talkBox.getVideo(media.video);
					}
					if(media.pic){
						MI.reply.talkBox.sourcePic = media.pic;
					}
				}
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
		MI.Bos({
			name : 'btnOnerrorPic',
			id : 1210
		});
		el.onerror = null;
	},
	/**
	 * 定位时多重滚动条兼容
	 * 
	 * @param {Object} Object 定位目标DOM
	 *            @example
	 *            var scrollHack = MI.scrollHack(element);
	 */
	scrollHack : function(el){
		return UI.scrollY(el) - UI.scrollY() * (UI.B.safari && !UI.B.ipad ? 2 : 1);
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
		var iframe = '_ajaxProxy_', ajax = '_ajax_', xhr = '_ajaxXhr_', pageHost = 'http://' + document.location.host, host = pageHost, hostMatch, hostName ,isObject = UI.isObject(o);
		if (isObject) {
			if (o.url) {
				hostMatch = o.url.match(/(http:\/\/)+([^\/]+)/i);
				if (hostMatch && hostMatch[0]) {
					host = hostMatch[0];
				}
			}
			if (host.hasString(pageHost)) { //同域跳过
				return UI.ajax(o);
			}
		}
		else if (UI.isString(o)) {
			host = 'http://' + o.replace(ajax,'');
		}
		hostName = host.replace('http://', ''); //域名
		iframe += hostName;
		xhr += hostName;
		ajax += hostName;
		if (UI.isString(o)){ //处理队列
			ajax = o;
		}
		if (!MI[ajax]) { //请求队列
			MI[ajax] = [];
		}
		if (!MI[iframe]) { //创建proxy.html
			isObject && MI[ajax].push(o);
			var name = 'ajaxProxy' + MI.random();
			MI[iframe] = UI
					.html('<iframe id="'
							+ name
							+ '" name="'
							+ name
							+ '" src="'
							+ host
							+ '/proxy.html" style="display:none" onload="MI[\''
							+ xhr + '\'] = 1;MI.ajax(\'' + ajax
							+ '\');"></iframe>')[0];
			UI.ready(function() {
						UI.append(MI[iframe], document.body);
					});
		} else if (!MI[xhr]) { //正在加载proxy.html
			isObject && MI[ajax].push(o);
		} else { //已经加载proxy.html
			if (MI[ajax].length && !lonely) {
				UI.each(MI[ajax], function(obj) {
							MI.ajax(obj, true);
						});
				MI[ajax] = [];
			} else if (o) {
				if (o.url && o.url.hasString(host)) {
					o.xhr = MI[iframe].contentWindow.xmlHttp();
				}
				return UI.ajax(o);
			}
		}
	},
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
		 * 操作上报的Boss表ID（不同站点接入可以申请不同的上报ID: 561-微群, 470-校园微博, 1249-极简版微博, 1250-Qzone版微博）
		 * 
		 * @type {String}
		 *            @example
		 *            MI.api.boss = 1249;
		 */
		boss : null
	},
	version : (function(){
		var url = 'http://mat1.gtimg.com/www/mb/',
		//var url = 'http://www.qq.com/mb/mat1/mb/',
			js = {
				ui : {
					/* 通用控件 */
						//时间控件
						DatePicker : '110906',
						//取色控件
						ColorPicker : '110107'
				},
				mi : {
					/* 通用模块 */
						//基础库
						Base : '111110',
						//模版
						Tmpl : '111108',
						//地图微博
						MapPop : '110822',
						//在线聊天
						WebQQ : '110704',
						WebQQFull : '110927',
						//微电台
						Radio : '110905',
						//FAQ问答发表框
						FAQBox : '111104',
						//蠕虫监测
						NonTx : '110318',
	
					/* 发表框 */
						//富媒体
						TalkBoxRich : '111110b',
						//心情
						Mood : '111110',
						//截屏
						Capture : '110817',
						//简繁体转换
						TransformST : '110823',
						//文件上传
						FileUploader : '111010b',
	
					/* 消息列表 */
						//富媒体
						TalkListRich : '111110b',
						//收藏
						TalkListFav : '111017',
						//自动更新
						TalkListUpdate : '110505',
						//分享
						TalkListShare : '111101',
						//滚动显示
						Scroll : '101111',
						//音乐相关
						Music : '111108',
						QQMusicInstance : '111029',
						QQMusicPlayer : '110711',
						QQMusicWmpPlayer : '110711',
						QQMuicHtml5Player : '110711',
						//QQ旋风下载
						QQDownload : '111101',
	
					/* 通用控件 */
						//表单验证
						Validate : '110920',
						//注册表单验证
						ValidateNew : '110920',
						//幻灯
						Slide : '110402',
						//图片模式
						PicList : '111101',
						//关联下拉
						RelateSelect : '110524',
						//全球城市
						City : '111017b',
						//中国城市
						CityAll : '110802b',
						//行业
						Occupation : '111024a',
						
					/* t.qq.com */
						//任务
						Task : '111110',
						//广播学院
						College : '110812',
						//皮肤设置
						Theme : '110825',
						//标签
						Tag : '111017',
						//名单
						List : '110809',
						//教育信息设置
						SettingEdu : '111011',
						//工作信息设置
						SettingWork : '110518',
						//历史头像
						Face : '110706',
						//页面右侧模块
						Sidebar : '111026',
	
					/* qun.t.qq.com */
						//微群
						Group : '111103a',
						//群分类
						QunList : '110804',
	
					/* 1.t.qq.com */
						//极简版
						Nano : '111108b'
				}
			},
			css = {
				ui : {
					datePicker : '110303',
					colorPicker : '101228'
				},
				mi : {
					base : '111107'
				}
			},
			lab = { //实验室
				//Base : 1,
				//base : 1
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
					MI.Bos({
						name : 'btnOnerrorJsFileReload',
						id : 1210
					});
				}
				MI._appLoading[i] = 0;
				MI.appLoad(app);
			}
			MI.Bos({
				name : 'btnOnerrorJsFile',
				sBak1 : MI.version[i],
				sBak2 : MI.user.account || '',
				id : 1210
			});
		}
	},
	appLoaded : 0
}
/**
 * Flash地址
 * 
 * @type {Object}
 */
MI.swf = (function(){
	var host = 'http://mat1.gtimg.com/www/mb/swf/';
	return {
		Mood : host + 'Mood_111031.swf', //心情
		MoodDemo : host + 'MoodDemo_110805.swf', //心情
		MusicRecord : host + 'MusicRecord_111101.swf', //录音
		VideoRecord : host + 'VideoRecord_111104.swf', //视频录制
		CameraPhoto : host + 'CameraPhoto_111001.swf', //拍照
		Text2Pic : host + 'Text2Pic_110926.swf', //文图
		FilterPhoto : host + 'FilterPhoto_110804.swf', //滤镜
		MultiPhoto : host + 'MultiPhoto_111018.swf' //多图
	}
})();
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
	if (window.MIApiHost){ //用于分支的API测试设置
		host = MIApiHost;
		MI.api.host = MIApiHost;
	}
	//是否是微群
	var isQun = location.href.match(/^https?:\/\/qun\.t\.qq\.com/i) ? true : false;
	return {
		t : host + '/p/t/', //消息底层页（http://api.t.qq.com/p/t/90009082726679?format=1）
		
		mySidebar : host + '/asyn/mysidebar.php', //主页右侧
		userSidebar : host + '/asyn/usersidebar.php', //客人页右侧
		similarUser : host + '/asyn/samiliarRecStars.php', //客人页收听后推荐人
		recommend : host + '/api/1.0/recommend.json', //客人页收听后推荐人
		relations : host + '/api/1.0/relations', //关系链接口
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
		uploadSearchPic : host + '/asyn/searchpic.php', //搜索配图
		uploadUrlPic : host + '/uploadextpic.php', //上传Url图片
		uploadMusic : host + '/uploadaudio.php', //上传音频
		uploadOrder : host + '/asyn/richMsgOp.php', //添加商品、订单
		musicPlayUrl : host + '/asyn/musicPlayUrl.php', //添加音乐
		vote : host + '/vote/asyn/vote.php', //添加投票
		talkPublish : host + '/publish.php', //发表广播
		at : host + '/asyn/nicktips.php', //at联想
		topic : host + '/asyn/topicSuggest.php', //话题联想
		relativeTopics : host + '/asyn/relativeTopics.php', //话题引导
		topic : host + '/asyn/relativeTopics.php', //获取关联话题
		notice : host + '/asyn/notice.php', //用户写广播监控
		
		talkDel : host + '/delete.php', //删除广播
		talkFavor : host + '/asyn/favoritemsg.php', //收藏广播
		talkUpTop : host + '/asyn/myTopTweet.php',  //置顶广播
		talkShield : host + '/asyn/blockAtMsg.php', //屏蔽广播
		favGroup : host + '/asyn/favoritemsggroup.php',  //收藏分类
		newCount : host + '/asyn/newMsgCount.php', //新消息数
		newly : host + '/asyn/home.php', //拉取新消息
		relayList : host + '/message_relay_frame.php', //查看转播列表
		relayListAt : host + '/asyn/atMessageFrame.php', //查看转播列表
		relayListSecond : host + '/message_relay_second.php', //查看二次转播列表
		urlPreview : host + '/asyn/urlpreview.php', //短URL预览
		
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
		applyDownload : host + '/air/applyDownload.php',  //文件下载
		signList : host + '/asyn/signList.php', //最近心情（我）
		friendSigns : host + '/asyn/friendSigns.php', //最近心情（收听）
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
		taskUrl : host + '/asyn/taskInfo.php',//获取任务信息
		userAttrSave : host + '/asyn/userAttrSave.php',//任务功能，用户属性保存
		//下面的地址需要判断在什么情况下才加host
		updateTips : (isQun ? host : '') + '/asyn/updateTips.php', //关闭Tips
		//下面的地址不需要加host
		newCountNew : 'http://message.t.qq.com/newMsgCount.php', //新消息数（新）
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
/**
 * 操作上报
 * 
 * @param {String} String 操作名
 * @param {String} String 操作值
 * @param {Number} Number 抽样比例
 * @param {Number} Number 表ID （214-主站, 1158-话题和banner实时统计）
 *            @example
 *            //老的上报方式
 *            MI.Bos('btnSend');
 *            
 *            //新的单独表上报方式
 *            //必选参数name（操作名）,id（表ID）；
 *            //可选参数iBak1（整型值）,iBak2（整型值）,sBak1（字符串值）,sBak2（字符串值），iPos（页面上的位置），random（抽样比例）；
 *            MI.Bos({
 *                name : 'btnHotTopicList',
 *                iBak1 : 0,
 *                sBak1 : '/k/%E8%82%A1%E5%B8%82%E5%A4%A7%E9%9C%87%E8%8D%A1',
 *                id : 1158
 *            });
 *            
 */
MI.Bos = function(op, value, random, bossId) {
	var newBoss, // 是否为新上报方式
		newBossData = { // 新表数据
			iFlow : 0,
			iFrom : '', // 操作来源
			iPubFrom : '', // 操作二级来源
			sUrl : '', // 页面URL
			iUrlType : '', // 页面类型
			iPos : '', // 操作在页面上的位置
			sText : '', // 操作对象描述
			iBak1 : '', // 扩展字段-整型值
			iBak2 : '', // 扩展字段-整型值
			sBak1 : '', // 扩展字段-字符串值
			sBak2 : '' // 扩展字段-字符串值
		};
		if (UI.isObject(op)) { // 新的Boss上报
			newBoss = 1;

			op.iUrlType = MI.boss || '';
			op.sUrl = document.location.host + document.location.pathname;
			for (var i in newBossData) {
				if (!UI.isUndefined(op[i])) {
					newBossData[i] = op[i];
				}
			}
			random = op.random;
			bossId = op.id;
			op = op.name;
		}
		if (op.hasString('http')) {
			MI.Bos.pic[UI.random(0, 9)].src = op;
		} else {
			if (random && Math.random() > random) {
				return;
			}
			try {
				var ouin = MI.Uin(), data = '', src = '';
				if (!bossId) {
					bossId = MI.api.boss || 214;
				}
				if (newBoss) {
					for (var i in newBossData) {
						data += '&' + i + '=' + newBossData[i];
					}
				} else {
					value = value || MI.boss;
					if (UI.isNumber(value)) {
						data = '&iFlow=0&sServerIp=&iBackInt1=' + value
								+ '&iBackInt2=&sBackStr1=';
					} else if (UI.isString(value)) {
						data = '&iFlow=0&sServerIp=&iBackInt1=&iBackInt2=&sBackStr1='
								+ value;
					}
				}
				src = 'http://btrace.qq.com/collect?sIp=&iQQ=' + ouin
						+ '&sBiz=microblog&sOp=' + op + '&iSta=0&iTy=' + bossId
						+ data
						+ (op == 'btnOnerror' ? '' : '&r=' + MI.random());
				MI.Bos.pic[UI.random(0, 9)].src = src;
			} catch (e) {
			}
		}
}
 /*       	推荐反馈上报
 *         	推荐反馈场景参考：http://tapd.oa.com/v3/microblog/wikis/view/%E7%94%A8%E6%88%B7%E8%A1%8C%E4%B8%BA%E5%8F%8D%E9%A6%88%E7%BB%9F%E8%AE%A1
 * 			String iPos 推荐场景：1 : 主人页右侧“推荐收听” 2 : 微博注册 3 : 客人页收听时推荐 4 : 找人页推荐 5 : 主人页右侧“可能感兴趣的人” 6 : 认证用户客人页同类收听 7 : 登陆页面10个手动推荐 8 : 帐号设置时推荐 9 : AIO微博页卡 10: 客人页右侧“他收听的人 11:主timeline上方的推荐
 * 			String iBak1 类型 1 :曝光用户 2 :点击头像 3 :点击收听 4 :一键收听 5：点击昵称 6：点X行为 7：更多 8：取消收听 9：点击“换一换” 10：点击“全部”
 * 			String sBak1 被点击、曝光用户列表 
 * 			String sText 推荐中间人
 * 			String sBak2 推荐人名.理由
 *            @example           
 *     		  MI.Bos({
 *     			name : 'feebBack',
 *     			iPos : 1,
 *     			iBak1 : 1,
 *     			sBak2 : 'a5431e58ff1cd36aa06a582456e19412.65536,47d27743589fa63edcb68ee372c69a5b.65536,d6ba4cd66841f46c3f67d393853a9a6d.458752,62fa6ce2fceab19d3b6e6976adcf6c66.458752',id:1191
 *           	id : 1191
 *            });
 *            
 */
MI.feedBack = function(o,iBak){
	//计算上报的曝光用户数
	function  countLen(str){
		var accountArray = [];
		accountArray = str.split(',');
		var iSum = accountArray.length;
		return iSum;
	}
	//克隆对象
	function cloneAll(fromObj,toObj){   
	   for(var i in fromObj){   
	      if(typeof fromObj[i] == "object"){   
	         toObj[i]={};   
	         cloneAll(fromObj[i],toObj[i]);   
	         continue;   
	      }   
	      toObj[i] = fromObj[i];   
	   }   
	} 
	if(o.sBak1)
		o.iFlow = countLen(o.sBak1);
	else if(o.sBak2)
		o.iFlow = countLen(o.sBak2);
		
	//账户列表太长，分开上报,保证每次最多上报20个,防止后台字段溢出,用同一个流水号iBak2
	var iBak2;
	if(iBak)
		iBak2 = iBak;
	else
		iBak2 = new Date().getTime();
	if(o.iFlow>20){
		o.iBak2 = iBak2;
		var arr1 = [];
		var arr2 = [];
		var list1,list2,o1,o2;
		o1={};
		o2={};
		cloneAll(o,o1);
		cloneAll(o,o2);
		var tempSbak = '';
		if(o.sBak1) tempSbak = o.sBak1;
		else if(o.sBak2) tempSbak = o.sBak2;
		var accountArray = [];
		accountArray = tempSbak.split(',');
		for(var index=0;index<20;index++)
			arr1.push(accountArray[index]);
		for(index=20;index<o.iFlow;index++)
			arr2.push(accountArray[index]);
		if(o.sBak1){
			o1.sBak1 = arr1.join(',');
			o2.sBak1 = arr2.join(',');	
		}
		else if(o.sBak2){
			o1.sBak2 = arr1.join(',');
			o2.sBak2 = arr2.join(',');			
		}
		o1.iFlow = 20;
		o2.iFlow = o.iFlow - 20;
		MI.Bos(o1);
		MI.feedBack(o2,iBak2);
	}
	else{
		MI.Bos(o);
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
							src = 'http://mat1.gtimg.com/www/mb/images/' + ((window.MILang=="en_US") ? 'en/' : '') + 'vT.png';
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

MI.Crs.onLoadResize = (function () {
	var _fitWidth = function(size, width) {
			var s = {};
			s.w = width;
			s.h = size.h * width / size.w;
			return s;
		}, _fitHeight = function(size, height) {
			var s = {};
			s.h = height;
			s.w = size.w * height / size.h;
			return s;
		}, _fitInSize = function(size, insize) {
			var s = _fitWidth(size, insize.w);
			if (s.h > insize.h)
				s = _fitHeight(size, insize.h);
			return s;
		}, _parseSize = function(str) {
			if (!str)
				return null;
			var matched = str.match(/(fitfill|fitbound|min|max),([-\d]+)x([-\d]+)/);
			if (!matched)
				return null;

			var w = parseInt(matched[2]), h = parseInt(matched[3]);

			if (isNaN(w) || isNaN(h))
				return null;
			if (w == -1)
				w = 999999;
			if (h == -1)
				h = 999999;

			return {'w': w, 'h': h,
				'min': (matched[1] == 'min'),
				'max': (matched[1] == 'max'),
				'fitfill': (matched[1] == 'fitfill'),
				'fitbound': (matched[1] == 'fitbound')
			};
		}, _parseSizes = function(str) {
			if (!str)
				return null;

			var strs = str.split(';');
			var arr = [];

			for (i = 0; i < strs.length; ++i) {
				var policy = _parseSize(strs[i]);
				if (policy == null)
					continue;
				arr.push(policy);
			}

			return arr;
		},

		_resizeImg = function(el, cursize, targetsizes) {
			var newsize = {w: cursize.w, h: cursize.h};
			var i;

			for (i = 0; i < targetsizes.length; ++i) {
				var policy = targetsizes[i];

				if (policy.min) {
					if (newsize.w < policy.w)
						newsize = _fitWidth(cursize, policy.w);
					if (newsize.h < policy.h)
						newsize = _fitHeight(cursize, policy.h);
				} else if (policy.max) {
					if (newsize.w > policy.w)
						newsize = _fitWidth(cursize, policy.w);
					if (newsize.h > policy.h)
						newsize = _fitHeight(cursize, policy.h);
				} else if (policy.fitfill) {
					if (newsize.w != policy.w)
						newsize = _fitWidth(cursize, policy.w);
					if (newsize.h < policy.h)
						newsize = _fitHeight(cursize, policy.h);
				} else if (policy.fitbound) {
					if (newsize.w != policy.w)
						newsize = _fitWidth(cursize, policy.w);
					if (newsize.h > policy.h)
						newsize = _fitHeight(cursize, policy.h);
				} else {
					return;
					//throw 'should not reached';
				}
			}

			UI.C(el, 'width', newsize.w + 'px');
			UI.C(el, 'height', newsize.h + 'px');
		}, _adjustImg = function(el, mode) {
			//     top
			// left 1 2 3 right
			//      4 5 6
			//      7 8 9
			//    bottom
			
			// width, height, parent-width, parent-height
			var w = parseInt(UI.C(el, 'width'), 10) || el.clientWidth;
			var h = parseInt(UI.C(el, 'height'), 10) || el.clientHeight;
			var pw = el.parentNode.clientWidth;
			var ph = el.parentNode.clientHeight;

			// horizonal mode & vertical mode
			mode--;
			var hmode = mode % 3;
			var vmode = (mode - hmode) / 3;

			// new left & new top
			var l, t;

			if (hmode == 0)
				l = 0;
			else if (hmode == 1)
				l = -(w - pw) / 2;
			else if (hmode == 2)
				l = -(w - pw);
			else {
				return;
				//throw 'should not reached';
			}

			if (vmode == 0)
				t = 0;
			else if (vmode == 1)
				t = -(h - ph) / 2;
			else if (vmode == 2)
				t = -(h - ph);
			else {
				return;
				//throw 'should not reached';
			}

			UI.C(el, 'left', l + 'px');
			UI.C(el, 'top', t + 'px');

			if (UI.C(el, 'position') == 'static')
				UI.C(el, 'position', 'relative');
		}, _reloadImg = function(el) {
			var i;

			// find the image's loaded size and resized size.
			var oldid = el.src.match(/\/(\d+)$/);
			if (!oldid)
				return;

			oldid = parseInt(oldid[1]);
			var oldlimit;

			for (i=0; i<_limits.length; ++i) {
				if (_limits[i].id == oldid) {
					oldlimit = _limits[i];
					break;
				}
			}

			if (!oldlimit)
				return;

			var resized = {w: parseInt(UI.C(el, 'width')), h: parseInt(UI.C(el, 'height'))};
			var oldsize = _fitInSize(resized, oldlimit);

			// if the image's loaded size is larger than the resized size, do nothing.
			// if it's only a bit smaller, OK, do nothing.
			if (oldsize.w >= resized.w * 0.9 && oldsize.h >= resized.h * 0.9)
				return;

			// find which limit fits the resized size.
			for (i=0; i<_limits.length; ++i) {
				var newsize = _fitInSize(resized, _limits[i]);

				if (resized.w <= newsize.w && resized.h <= newsize.h)
					break;
			}

			// and finally replace the image's src.
			if (i >= 0 && i < _limits.length) {
				var newsrc = el.src.replace(/\/\d+$/, '/' + _limits[i].id);
				el.src = newsrc;
			}
		}, _limits = [
			{id:60, w:60, h:60},
			{id:80, w:80, h:80},
			{id:120, w:120, h:120},
			{id:150, w:150, h:150},
			{id:160, w:160, h:150},
			{id:240, w:240, h:320},
			{id:320, w:320, h:480},
			{id:460, w:460, h:999999},
			{id:2000, w:2000, h:999999}
		], _onloadCallbackState0 = function(el) {
			var size = {
				'w' : parseInt(UI.C(el, 'width'), 10) || el.offsetWidth,
				'h': parseInt(UI.C(el, 'height'), 10) || el.offsetHeight
			};
			var complete = UI.B.ie ? el.complete : (size.w > 0 && size.h > 0);

			if (complete) {
				UI.A(el, 'onloadState', 1);

				var resizeto = UI.A(el, 'resizeto');
				resizeto = _parseSizes(resizeto);

				if (resizeto) {
					// Note:
					// 使用小图来计算 resize 长宽比会有一定误差。
					// 例如，10x2000 压缩成 1x150 之后，
					// _resizeImg 就会把长宽比计算 1:150，而本来应该是 1:200。
					// 此处应该在 _reloadImg 的新图片加载之后重新计算长宽比，
					// 并使用 _resizeImg 重新调整 img 的大小。
					_resizeImg(el, size, resizeto);
					_adjustImg(el, 2);
					_reloadImg(el);
				}
			}
		};

	return function (e) {
		var el, state;
		
		if (!e) {
			el = this;
		} else {
			el = UI.isElement(e) ? e : UI.E(e).target;
		}
		state = UI.A(el, 'onloadState');

		if (!state)
			state = 0;

		if (state == 0) {
			setTimeout(function() {
				_onloadCallbackState0(el);
			}, 0);
		} else if (state == 1) {
			// do nothing
		} else {
			// should not reached
			return;
			//throw 'should not reached';
		}
	};
}());

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
		//勋章小黄条构建
		if(id == 'medaltips'){
			MI.app({
					Sidebar : function(){
						MI.Sidebar.medalShow(html);
					}
				});
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
		if (MI.talkList) {
			MI.talkList.bottom();
		}
		MI.bottom();
		MI.bottom('pageNav');
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
		Self._txt = Self.$('textarea') || Self.$('.inputTxt');
		Self._tip = Self.$('.countTxt');
		Self._guide = Self.$('h2 em');
		Self._tipBig = Self.$('.talkSuc');
		Self._btn = Self.$('.sendBtn');
		Self._close = Self.$('.close');
		Self._num = [$('talkNum')];
		Self._addReply = Self.$('.addReply');
		Self._addComt = Self.$('.addComt');
		Self._comts = Self.$('.comts');
		Self._sendCnt = Self.$('.sendCnt');

		//TalkBox事件绑定优化
		var addEvent = function(){
			UI.ER(Self._body,UI.B.ipad ? 'touchstart' : 'mouseover',addEvent);
			UI.ER(Self._txt,'focus',addEvent);
			MI.app({
				TalkBoxRich : function(){
					Self.addEvent();
				}
			});
		}
		UI.EA(Self._body,UI.B.ipad ? 'touchstart' : 'mouseover',addEvent);
		UI.EA(Self._txt,'focus',addEvent);
		UI.EA(Self._txt,'click',function(){
			Self.guideTextRemove(); //移除引导词
		});
		
		
		//引导词
		if (Self._guide) {
			UI.ready(function(){
				if (UI.B.chrome && UI.text(Self._guide) == '来，说说你在做什么，想什么'){
					Self._speech = UI.html('<input type=”text” speech="speech" x-webkit-speech="x-webkit-speech" onclick="MI.Bos(\'btnSpeech\')" title="' + _('语音输入') + '" />')[0];
					Self._speech.onwebkitspeechchange = function(){
						Self.addTopic(this.value);
						this.value = '';
						MI.Bos('btnSpeechOK');
					}
					UI.append(Self._speech,Self._guide);
				}
				Self.guide = Self._guide.innerHTML;
			});
		}
		Self.guideTextValue = UI.trim(UI.A(Self._txt,'guide') || '');
		if (Self.guideTextValue){
			setTimeout(function(){
				Self.guideTextAdd(Self.guideTextValue);
			},200);
		}
		
		//焦点事件
		Self._txt.onfocus = function(){
			UI.removeClass(Self._body,'condensed');
			UI.addClass(Self._sendCnt,'focus');
			this.focused = 1;
			//showGuide();
		};
		Self._txt.onblur = function(){
			var el = this;
			clearTimeout(Self.delay.blur);
			Self.delay.blur = setTimeout(function(){
				UI.removeClass(Self._sendCnt,'focus');
				if (!Self.sending) {
					Self.countTxt();
				}
			},0);
			this.focused = 0;
			Self.guideTextAdd(Self.guideTextValue);
		};

		UI.ready(function(){
			setTimeout(function(){
				Self._txt.blur();
				Self.countTxt();
			},0);

		});
		Self.zhCount = (window.MILang && window.MILang=='en_US') ? 0 : 1;
		Self.txtMax = (Self.zhCount ? Self.txtMax : 140); //英文版420字
		
		Self.iconPic = MI.user.fun.iconPic;
	}
}
MI.TalkBox.showDraft = function(talkBox){
	if (talkBox && !UI.B.ipad) {
		var draft = 'draft_' + MI.user.account;
		if (talkBox.autoSave && MI.isS) {
			/*UI.EA(window,'beforeunload',function(){
				var txt = MI.talkBox._txt.value;
				MI.S(draft,txt || '');
			});*/
			if (!talkBox._txt.value){
				talkBox._txt.value = MI.S(draft).replace(/^undefined|^Null/,'') || ''; //有隐患，有时间再查一下
			}
			talkBox.countTxt();

			if (UI.parseUrl().p > 1){ //翻页模式自动定位到消息列表
				var scrollY = 250,
					_body = talkBox._body;
				if (_body){
					scrollY = UI.getY(_body) + UI.height(_body);
				}
				window.scrollTo(0,scrollY);
			}
			else {
				setTimeout(function(){ //Auto Focus
					if (!talkBox._msgTo && location.hash != '#M' && UI.scrollY() < 250 && !talkBox._txt.value && !MI.Nano) {
						try{
							talkBox.focus();
						}catch(e){}
					}
				},500);
			}
		}
	}
}
/**
 * MI.TalkBox.showBox 显示一个浮层形式的talk
 * @namespace MI.TalkBox.showBox
 * @type Function
 * @param {string} talkId 被转播/回复/评论的tweet的id
 * @param {integer} type talkbox 类型, 0: 原创, 1: 转播, 2: 回复,
 *                       4: 评论, 7:对话
 * @param {object} config 其他可选参数
 * @config {string} content 被预填充到talkbox textarea中的文本内容
 * @config {string} talkTo 被回复人的账号
 * @config {object} tweetDom 被转播/回复/评论的tweet的dom对象
 * @config {string} title 对话框标题
 * @config {function} success 发布成功后的回调函数
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
	case 0:
		title = _(config.title || '来，说说你在做什么，想什么');
		type = null;
		break;
	case 1:
		title = _(config.title || '转播原文，顺便说两句：');
		if (ctn) {
			if (UI.GC(ctn, '.replyBox').length) {
				content = MI.TalkList.getRelayOld(ctn);
				h = 80;
			}
		}
		break;
	case 2:
	case 7:
		if (config.title) {
			title = _(config.title);
		}
		if (config.talkTo) {
			talkBox.talkTo = config.talkTo;
		} else if (ctn) {
			userNamea = UI.GC(ctn, '.userName strong a')[0];
			talkBox.talkTo = MI.string.account(userNamea.title ||
				UI.A(userNamea, 'rel'));
		}
		if (type === 7) {
			talkBox.topic = '@' + talkBox.talkTo + ' ';
			talkBox.txtMax = talkBox.txtMax - talkBox.topic.length;
		} else {
			talkBox.topic = '';
			talkBox.txtMax = MI.TalkBox.prototype.txtMax;
		}

		break;
	case 4:
		title = _(config.title || '评论原文：');
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
		doFocus : false,
		success : config.success || null
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
	 *            //Value In JS: null-原创  1-转播  2-对话  3-私信  4-Timeline评论  5-底层页评论  6-记事本  7-空回对话  8-Feed
	 *            //Value In PHP: 1-原创发表、2-转载、3-私信 4-回复 5-空回 6-提及 7-评论 8-Feed
	 *            MI.talkBox.type = 4;
	 */
	type : null, 
	/**
	 * 消息列表API类型
	 * @type Number
	 *            @example
	 *            MI.talkBox.apiType = MI.api.type;
	 */
	apiType : 0,
	/**
	 * 发表框的消息来源
	 * @type Number
	 */
	source : (function(){ //Talk's Source,example Web QQ
		var source = 0,hostname,temp;
		try{
			temp = parent.source;
			hostname = top.document.location.hostname;
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
	 * @type Number	产品分析boss统计 主人页: 1（默认空） 话题底层页: 10 腾讯网接口: 11
	 *            @example
	 *            MI.talkBox.countType = 2;
	 *
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
	autoSave : 0, //Auto Save Text
	audioUpload : function(){
		var Self = this,
			upUrl = MI.url.uploadAudio || 'http://t.qq.com/uploadaudio.php',
			width = 594,
			height = 320,
			top = (window.screen.availHeight - 30 - height)/2,
			left = (window.screen.availWidth - 10 - width)/2; 
		if(Self.data && Self.data.wqid){
			upUrl = upUrl + "?qid=" + Self.data.wqid + "&zone=" + Self.data.cflag;
		}
		window.open(upUrl,'wbAudio','height=' + height + ',width=' + width + ',top=' + top + ',left=' + left + ',scrollbars=yes,resizable=yes');
		MI.Bos('btnAudioUpload');
	},
	guideTextKeep : 1, //点击引导词后保留引导词并选中
	guideTextAdd : function(guideText){ //添加发表框中的引导词
		if ((this._txt.value == '' || this._txt.value == guideText) && guideText){
			var topic = guideText.match(/#[^#]+#/g),
				topicPublished = MI.json(MI.S('option_topic_' + MI.user.account)), //已经发表过的话题
				published;
			if (topic && topicPublished){ //判断是否发表过
				UI.each(topic,function(o){
					if (topicPublished[encodeURI(o)]){
						published = 1;
					}
				});
			}
			if (!published) { //没发表过才添加
				this.guideText = guideText;
				UI.addClass(this._txt,'cNote');
				this._txt.value = this.guideText;
			}
		}
	},
	guideTextRemove : function(clear){ //移除发表框中的引导词
		var Self = this;
		if (Self.guideText){
			if (clear){
				Self._txt.value = '';
			}
			else if (Self._txt.value == Self.guideText){
				var topic = Self.guideText.match(/#[^#]+#/g);
				if (Self.guideTextKeep){
					setTimeout(function(){
						Self._txt.select();
					},0);
				}
				else {
					if (topic){
						Self._txt.value = topic.join('');
					}
					else {
						Self._txt.value = '';
					}
					Self.focus();
				}
			}
			UI.removeClass(Self._txt,'cNote');
			Self.countTxt();
			Self.guideText = null;
		}
	},
	talkBoxTmpl : '',
	tmpl : '',
	/**
	 * 写消息时是否折算短Url
	 * @type Boolean
	 *            @example
	 *            MI.talkBox.countUrl = 0; //关闭短Url字数折算
	 */
	countUrl : 1,
	/**
	 * 发表的最大字数限制
	 * @type String
	 *            @example
	 *            MI.talkBox.txtMax = 140 - MI.talkBox.topic.length; //默认话题时需要减去相应字数
	 */
	txtMax : 140,
	/**
	 * 写消息时是否计算中文字符
	 * @type Boolean
	 *            @example
	 *            MI.talkBox.zhCount = 0; //关闭中文字符计算
	 *            MI.talkBox.zhCount = (window.MILang && window.MILang=='en_US') ? 0 : 1;
	 */
	zhCount : 1,	
	/**
	 * 发表的内容是否可以为空
	 * @type Boolean
	 *            @example
	 *            MI.talkBox.isEmpty = 0; //0-不可以为空 1-可以为空
	 */
	isEmpty: 0,
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
		if (Self.guideText && value == Self.guideText){
			value = '';
		}
		Self.length = length = MI.countTxt(value,Self.countUrl,Self.zhCount,Self.txtMax);
		if (!length && Self._tip.innerHTML.hasString(Self.txtTip.empty)) {
			return;
		}
		if (length > this.txtMax) {
			talkTip = '<em class="error">';
			Self._btn.disable = 1;	
			autoBackspace && value.indexOf('||') === -1 ? UI.hide(autoBackspace) : UI.show(autoBackspace);//是否显示’自动缩减
		}
		else {
			talkTip ='<em>';
			if(autoBackspace) UI.hide(autoBackspace);
			Self._btn.disable = 0;

		}
		if (!Self.isEmpty && length == 0) {//兼容群公告允许为空的情况
			Self._btn.disable = 1;
		}
		var temp = Math.abs(Self.txtMax - length);
		if(length > this.txtMax) {
			Self.showTip(_('超出{0}{1}</em>字',talkTip,temp));
		}	
		else {
			Self.showTip(_('还能输入{0}{1}</em>字',talkTip,temp));
		}	
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
				if (!UI.A(Self._txt,'padding')){ //获取padding值，用于修正高度
					UI.A(Self._txt,'padding',parseInt(UI.C(Self._txt,'paddingTop')) + parseInt(UI.C(Self._txt,'paddingBottom')));
				}
				var scrollHeight = Self._txt.scrollHeight,
					clientHeight = Self._txt.clientHeight,
					padding = Number(UI.A(Self._txt,'padding')),
					height = (scrollHeight > clientHeight ? scrollHeight : clientHeight) - padding;
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
		if(MI.Text2Pic && Self.uploadCollection && !UI.B.ipad) { //只在顶部广播对话框出现
			if(Self._picPreview && Self._picPreview.style.display == 'none') {
				MI.Text2Pic.formTalk(Self,length - this.txtMax > 20);
			}
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
		return; //暂时不用，先return掉
		this._guide.innerHTML = this.guide;
		UI.A(this._guide,'user','');
	},
	save : function(){
		var value = this._txt.value;
		if (!(this.guideText && value != this.guideText)){
			try{
				var text = value.replace(new RegExp(this.txtTopic,'g'),'') || '';
				if (this.guideText && text == this.guideText){
					text = '';
				}
				MI.S('draft_' + MI.user.account,text);
			}catch(e){};
		}
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
		Self._video && Self.upVideo && Self.upVideo.hide();
		Self._music && Self.upMusic && Self.upMusic.hide();
		Self._vote && Self.hideVote && Self.hideVote();
		Self._pic && Self.upPic && Self.upPic.hide();
		Self._order && Self.upOrder && Self.upOrder.hide();
		Self.upRelTopic && Self.upRelTopic.hide();
		Self.upVote && Self.upVote.hide();
		Self.guideTextRemove(true);
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
			Self.reset();
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
			viewModel : Self.iconPic || ''
		};
		if (Self.code) {
			obj.veriCode = Self.code;
		}
		if (Self.emotion){  //心情签到类型
			obj.emotion = Self.emotion; 
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
		if(Self.longText){
			obj.longText = Self.longText;
		}
		if (Self.topic) {
			obj.content = (obj.content.match(new RegExp(MI.string.escapeReg(Self.topic))) ? '' : Self.topic) +  obj.content;
		}
		if (Self.music && Self.music.id){ //歌曲
			obj.musicID = Self.music.id;
			obj.musicSong = Self.music.song;
			obj.musicSinger = Self.music.singer;
			obj.musicLocation = Self.music.songurl;
			obj.musicShortUrl = Self.music.shorturl;
			if(Self.music.songtype)	obj.musicSource = Self.music.songtype;
		}
		if (Self.mlist){ //歌单
			//obj.mlistId = Self.mlist.id;
			obj.mlistUin = Self.mlist.uin;
			obj.mlistName = Self.mlist.name;
			obj.mlistCnt = Self.mlist.num;
			obj.mlistUrl = Self.mlist.url;
			obj.mlistPic = Self.mlist.pic;
		}
		if (Self.file && Self.file.uriId){ //文件
			obj.fileUriId = Self.file.uriId;//文件id
			obj.fileName = Self.file.name;//文件名字
			obj.fileValidTime = Self.file.validTime;//失效时间
			obj.fileFlag = Self.file.flag;//存储方式
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
		if (MI.api.type){
			Self.apiType = MI.api.type;
		}
		if (Self.apiType) {
			obj.apiType = Self.apiType;
		}
		if (Self.rmsg) { // 富媒体
			obj.rmsgType = Self.rmsg.type;
			obj.rmsgId = Self.rmsg.id;
		}
		if (Self.data) { // 附加数据
			for (var i in Self.data){
				obj[i] = Self.data[i];
			}
		}
		if(UI.parseUrl().pref){ //增加来源参数上报
			obj.pref = UI.parseUrl().pref;
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
					UI.hasClass(Self._sendCnt,'hasMedia') && UI.removeClass(Self._sendCnt,'hasMedia');
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
						Self.reset();
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
									if (Self.emotion) MI.Mood.floatBox.show(); //恢复心情浮层
									if (Self.QX && MI.Gift) MI.Gift.buildTalk(); //恢复七雄争霸的广播框 
								},
								cancelTxt : _('返回修改'),
								cancel : function(){
									if (Self.emotion) MI.Mood.floatBox.show();  //恢复心情浮层
									if (Self.QX && MI.Gift) MI.Gift.buildTalk(); //恢复七雄争霸的广播框
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
				else if (data.result == -206 || data.result == -207 || data.result == -208){ //@*微群错误（想关掉可以给cgi多传一个参数attips=0）
					var accountError = [],
						contentError = [];
					if (UI.isArray(data.info)){
						UI.each(data.info,function(o){
							accountError.push(o);
							contentError.push(_('“') + o + _('”'));
						});
						contentError.join(_('、'));
					}
					switch(data.result) {
						case -206:
							contentError = _('您在广播中@*到群{0}，可能输入有误，这个群不存在，请返回修改。', contentError);
							break;
						case -207:
							contentError = _('您在广播中@*到群{0}，您还不是这个群的成员，请<a href="http://qun.t.qq.com/' + accountError[0] + '" target="_blank">点击这里</a>先加入这个群，或者返回修改。', contentError);
							break;
						case -208:
							contentError = _('不能从私密群转发消息，这条广播将不会被转发。');
							break;
					}
					MI.app({
						Base : function(){
							MI.confirm({
								title : _('确定继续发送？'),
								content : contentError,
								confirmTxt : _('继续发送'),
								confirm : function(){
									MI.dialog.hide();
									Self.pass = data.result;
									Self.send();
									MI.Bos('btnSendAtConfirm');
									if (Self.emotion) MI.Mood.floatBox.show(); //恢复心情浮层
									if (Self.QX && MI.Gift) MI.Gift.buildTalk(); //恢复七雄争霸的广播框 
								},
								cancelTxt : _('返回修改'),
								cancel : function(){
									if (Self.emotion) MI.Mood.floatBox.show();  //恢复心情浮层
									if (Self.QX && MI.Gift) MI.Gift.buildTalk(); //恢复七雄争霸的广播框
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
								if(Self._body.style.display != 'none') Self._txt.focus(); //Hided Element Can't Be Focused In IE (Bug)
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
								Self.rmsg = null;
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
					
					data.info.type = AddedTalkList.type;

					var newTalk = UI.html(new UI.tmplString(Self.tmpl)(data.info))[0];
					AddedTalkList.addEvent(newTalk);
					UI.addClass(newTalk,'newMsg'); //Add Delete CSS
					// fill-back样式用于标识消息是否为刚刚发布 拥有叫fill-back标识的消息，被删除时会将它的内容回填到发布框中。
					// 非原创消息不进行回填。原创消息中的富媒体内容不回填。
					if (!Self.type) {
						UI.addClass(newTalk, 'fill-back');
						// 发布后30秒清除刚刚发布的标识fill-back样式 删除此消息时不会
						setTimeout(function () {
							UI.removeClass(newTalk, 'fill-back');
						}, 30000);
					}
					UI.prepend(newTalk,AddedTalkList._body);
					AddedTalkList.addFollowBtn(newTalk);
					AddedTalkList._news.push(newTalk);
					AddedTalkList.news++;
					var height = UI.height(newTalk),scrollY = UI.scrollY(),scroll;
					UI.C(newTalk,'height',0);

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
							TalkBoxRich : function(){
								Self.cacheTopic(obj.content);
							}
						});
					}
										
					//如果是群私聊区发起评论，分享条数也+1
					try {
						if(MI.Group && MI.Group.qid && MI.talkList && MI.talkList.type === 2 && Self.type === 5) {
							Self.countNum(1);
						}
					} catch(e) {}
										
					//Count Talk Number					
					if (Self.type != 4 && Self.type != 5) {
						//如果不是在群里发起的对话，才+1
						if(!MI.Group || !MI.Group.qid || (Self.type !== 7 && Self.type !== 2)) {
							Self.countNum(1);							
						}
					}
					if (MI['talkList'] && data.info.talk[0].timestamp) {
						MI.talkList.updateTime(data.info.talk[0].timestamp);
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
		
		this.hideMedia(); //隐藏浮层

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
		if (Self.upPic.flashCapture) {   //截屏到多图时loading
			UI.addClass(Self.upPic._picCapture[1],'loading');
		}	
		else {
			Self.upPic.hide();
			UI.append(Self._uploadPicS,Self._sendStatus);
			!(UI.hasClass(Self._sendCnt,'hasMedia')) && UI.addClass(Self._sendCnt,'hasMedia');
			UI.show(Self._picLoading);
			UI.addClass(Self._picLoading,'loading');
		}
		MI.TalkBox.cur = Self;
	},
	qbUploadCookie : function () {
		return document.cookie;
	},
	qbUploadPosition : function () {
		return $$(this.upPic._picForm, 'input')[0];
	},
	qbUploadAddPic : function (o) {
		if (o && o.info && !o.info.fileName)
			o.info.fileName = _('图片.jpg');
		this.addPic(o);
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
		Time = Self.upPic.PicUpTime;
		Time_1 = + new Date();
		UI.hide(Self._picLoading);
		if (o.result == 0) {
			if(Self.upPic.flashCapture) { //截屏到多图flash
				MI.PhotoMultiUpload.captureImg(o.info.image + "/2000");
				UI.removeClass(Self.upPic._picCapture[1],'loading');
				return;
			}
			!(UI.hasClass(Self._sendCnt,'hasMedia')) && UI.addClass(Self._sendCnt,'hasMedia');
			//UI.removeClass(Self._pic,'hover');
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
				fileName = o.info.fileName || Self.upPic._picBtn.value,
				fileType = fileName.substring(fileName.lastIndexOf('.') + 1,fileName.length);

			fileName = fileName.match(/[^\/|\\]*$/)[0].replace(new RegExp(fileType + '$'),'');
			fileName = MI.string.cut(fileName,10) + fileType;
			if (turnPicAble) {
				Self._picLink.innerHTML = '<em class="sico ico_pic"></em><a href="' + pic  + '/2000" class="fileName" target="_blank">' + fileName + '</a>';
				UI.addClass(Self._picAnchor,'disabled');
			}
			else {
				UI.append(Self._uploadPicS,Self._sendStatus);
				UI.addClass(Self._picAnchor,'disabled');
				Self._picLink.innerHTML = '<em class="sico ico_pic"></em><a href="' + pic + '/2000" class="fileName" target="_blank" style="position:relative;">' + fileName + '<span class="simg" style="cursor:default;"><img  src="' + pic +  "/160" + '" /><br /><span style="white-space:nowrap;display:' + (UI.B.ipad ? 'none':'inline' ) + '"><span class="useFilter" style="cursor:pointer;display:inline-block;padding:5px 0;" href="javascript:void(0)">' + _('魔法滤镜') + '</span></span></span></a>';
				$$(Self._picLink,'.useFilter')[0].onclick = function(){
					MI.app({
						Base:function(){
							var src = pic.replace('mblogpic.store.qq.com/mblogpic','t0.qpic.cn/mblogpic');
							MI.photoFilter.build(src + "/2000",'http://t.qq.com/asyn/updateGrabPic.php');
							MI.TalkBox.cur = Self;
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
			Self.guideTextRemove();
			if (Self._txt.value == '' && fileName != _('表情.jpg')) {
				Self._txt.value = Self.txtPic;
				Self.countTxt();
			}
			Self.focus();
		}
		else {
			Self.cancelPic();
			MI.alert(o.msg);
		}
		Self.upPic._picForm.reset();

		//Speed
		if (Time){
			Time_2 = + new Date() - Time;
			setTimeout(function(){
				Time_3 = + new Date() - Time;
				MI.Speed('t_asyn_uploadpic',1,Time_1,Time_2,Time_3);
			},0);
		}
		Self.upPic.PicUpTime = null;
	},
	/**
	 * 删除图片
	 *            @example
	 *            MI.talkBox.delPic();
	 */
	delPic : function(){
		var Self = this;
		if (Self._pic && Self.upPic) {
			Self.pic = this.sourcePic = '';
			Self.upPic._picForm.reset();
			UI.hide(Self._picPreview);
			UI.hide(Self._picLoading);
			if (Self._txt.value == Self.txtPic) {
				Self._txt.value = '';
			}
			if(Self.txtSummary){
				Self._txt.value = Self._txt.value.replace(Self.txtSummary,'');
				Self.txtSummary = '';
			}
			Self.longText = '';  //文转图，完整文本
			if (MI.Capture && MI.Capture.uploader){
				MI.Capture.uploader.StopUpload();
			}
			
			if(UI.B.chrome) {  //解决chrome下 传同一张图片不触发change事件的问题
				Self.upPic._picForm.innerHTML = Self.upPic._picForm.innerHTML;
				Self.upPic._picBtn = UI.GT(Self.upPic._picForm,'input')[0];
				Self.upPic._picBtn.onchange = Self.upPic.picChange;
			}
			Self.countTxt();
			UI.removeClass(Self._picAnchor,'disabled');
			(UI.children(Self._sendStatus,'sendThumbs').length < 2) && UI.removeClass(Self._sendCnt,'hasMedia');
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
			//UI.show(this._videoAnchor);
			UI.removeClass(this._videoAnchor,'disabled');
			(UI.children(this._sendStatus,'sendThumbs').length < 2) && (this._picPreview.style.display == 'none') && UI.removeClass(this._sendCnt,'hasMedia');
			if (this._txt.value == this.txtVideo) {
				this._txt.value = '';
			}
			this.countTxt();
		}
	},
	/**
	 * 添加音乐（歌曲或歌单）
	 *            @example
	 *            MI.talkBox.addMusic({
	 *                music : {
	 *                    id : "479703",
	 *                    shorturl : "0gk12Y",
	 *                    singer : "郭子",
	 *                    song : "你是我一首唱不完的歌",
	 *                    songurl : "http://stream5.qqmusic.qq.com/12479703.wma"
	 *                },
	 *                mlist : {
	 *                    uin : "321548563",
	 *                    name : "歌单名",
	 *                    num : "3",
	 *                    url : "",
	 *                    pic : "",
	 *                }
	 *            });
	 */
	addMusic : function(obj){
		var Self = this, type;
		if (obj.music || obj.mlist) {
			if (obj.music) {
				Self.music = obj.music;
			}
			if (obj.mlist) {
				Self.mlist = obj.mlist;
			}
			if (Self._music) {
				MI.app({
					Music : function() {
						if (Self.music && Self.music.id) {
							UI.A(Self._music, 'music', ''
											+ Self.music.id + ','
											+ Self.music.songurl
											+ ','
											+ Self.music.singer
											+ ',' + Self.music.song
											+ ',3');
							type = 2;
						} else if (Self.mlist) {
							UI.A(Self._music, 'music', ''
											+ Self.mlist.uin + ','
											+ Self.mlist.url + ','
											+ '' + ','
											+ Self.mlist.name
											+ ',3');
							type = 3;
						}
						MI.Music.addPreview(Self._music, '', type);
						MI.Music.hide();
					}
				});
			}
		}
	},
	/**
	 * 删除音乐
	 *            @example
	 *            MI.talkBox.delMusic();
	 */
	delMusic : function(){
		this.music = '';
		this.mlist = '';
		if (this._music && this.upMusic) {
			UI.remove(this._musicPreview);
			UI.hide(this.upMusic._musicBox);
			//UI.show(this._musicAnchor);
			UI.removeClass(this._musicAnchor,'disabled');
			if (this._txt.value.hasString(this.txtMusic)) {
				this._txt.value = this._txt.value.replace(this.txtMusic,'');
			}
			this.countTxt();
		}
	},
	cancelPic : function(){
		if (this._pic && this.upPic) {
			this.pic = '';
			UI.hide(this._picLoading);
			this.upPic._iframe.src = 'about:blank';
			this.upPic._picForm.reset();
			UI.removeClass(this._picAnchor,'disabled');
			this.upPic._picCapture[1] && UI.removeClass(this.upPic._picCapture[1],'loading');
			(UI.children(this._sendStatus,'sendThumbs').length < 2) && UI.removeClass(this._sendCnt,'hasMedia');
		}
	},
	getVideo : function(value){
		var Self = this;
		var upV = Self.upVideo;
		Self.ayncVideoResult = null;
		if(!UI.trim(value)){
			//Self.hide();
			return;
		}
		if(this.delayVideo)	clearTimeout(this.delayVideo);
		this.delayVideo=window.setTimeout(function(){
			if (upV){
				upV._videoError.innerHTML = upV._errMsg[1];
				UI.show(upV._videoError);
			}
			MI.ajax({
				url : MI.url.validateVideo,
				type : 'get',
				data : "url=" + encodeURIComponent(value)+'&r='+MI.random(),
				success : function(data){
					if (upV){
						upV._videoBtn.disabled = false;
					}
					data = MI.json(data);
					Self.ayncVideoResult = data.result;
					if (data.result == 0){
						if (upV){
							UI.hide(upV._videoError);
						}
						if(data.url){
							//upV.video = upV._videoTxt.value;//'http://url.cn/'+data.url;
							clearTimeout(Self.delayVideoTime);
							var title = data.title.replace(/\&lt;/g,'<').replace(/\&gt;/g,'>').replace(/\&quot;/g,'"');
							var v = _('#分享视频#') + title + ' http://url.cn/'+data.url+' ';
							Self.video = data.url;
							Self.txtVideo = v;
							if (upV){
								Self.addTopic(v);
								upV._videoTxt.value = '';
							}
							Self.countTxt();
							Self.focus();

							var preview = '<div class="sendThumbs uploadVideo"><span class="preview"><span class="link"><em class="sico ico_videos"></em><a class="fileName" href="#">%title%<span class="vThumbs"><span class="mask"><em></em></span><img src="%pic%" /></span></a></span><a class="del" href="#" title="' + _('删除') + '">[' + _('删除') + ']</a></span></div>';
							data.pic = data.pic ? data.pic : 'http://mat1.gtimg.com/www/mb/images/vNoThumbs.jpg';
						//	var op = $$(upV._box,'.preview')[0];
							var p = preview.replace(/\%title\%/g,MI.string.cut(MI.string.html(title),10)).replace(/\%pic\%/g,data.pic);
							Self._videoPreview = UI.html(p)[0];
						//	if(op)	UI.remove(op);
							UI.append(Self._videoPreview,Self._sendStatus);
							UI.addClass(this,'disabled');
							!(UI.hasClass(Self._sendCnt,'hasMedia')) && UI.addClass(Self._sendCnt,'hasMedia');

							var del = $$(Self._videoPreview,'.del')[0];
							del.onclick = function(e){
								UI.E(e).stop();
								Self.delVideo();
								return false;
							}
							UI.addClass(Self._videoAnchor,'disabled');
							if (upV){
								upV.hide();
							}
						}
					}else if(data.result == -1){//未登录errMsg
						if (upV){
							upV._videoError.innerHTML = upV._errMsg[0];
							UI.show(upV._videoError);
						}
					}else if(data.result == -3){//暂不支持
						if (upV){
							upV._videoError.innerHTML = upV._errMsg[3];
							UI.show(upV._videoError);
							Self._videoNormalBtn = $$(upV._box,'.vNormalBtn')[0];
							Self._videoNormalBtn.onclick = function(){
								if(UI.trim(upV._videoTxt.value)){
									Self._txt.value += UI.trim(upV._videoTxt.value);
									upV._videoTxt.value = '';
									clearTimeout(Self.delayVideoTime);
									upV.hide();
								}
								return false;
							}
						}
				
					}else{//获取不到或异常
						if (upV){
							upV._videoError.innerHTML = upV._errMsg[2];
							UI.show(upV._videoError);
						}
					}
				}
			});
			if (upV){
				Self.delayVideoTime = setTimeout(function(){ //Get Video For Time Out
					if(!Self.ayncVideoResult && upV){
						upV._videoError.innerHTML = upV._errMsg[2];
						UI.show(upV._videoError);
					}
				},20000);//
			}
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
		var Self = this,
			iframeId = 'imageRotate' + MI.random();
		Self.talkBox = tb;
		Self._body = UI.html('<div '
						+ (UI.B.ie6 ? '' : 'class="big"')
						+ ' style="display:none;margin:3px 0 8px;padding:4px;border:1px solid #e5e5e5;background:#f9f9f9;position:absolute;z-index:20;top:15px;left:0px;"><div class="tools"'
						+ ((window.MILang == "en_US")
								? 'style="width:200px"'
								: 'style="width:130px"')
						+ '><a class="btnBack" href="#" style=""><em'
						+ (UI.B.ie6
								? ' style="width:17px;background:url(\'http://mat1.gtimg.com/www/mb/images/b2_100907.png\') no-repeat scroll -162px -233px transparent;"'
								: '')
						+ '></em>'
						+ _('向左转')
						+ '</a><span>|</span><a class="btnPrev" href="#"><em'
						+ (UI.B.ie6
								? ' style="width:17px;background:url(\'http://mat1.gtimg.com/www/mb/images/b2_100907.png\') no-repeat scroll -179px -233px transparent;"'
								: '')
						+ '></em>'
						+ _('向右转')
						+ '</a></div><div class="loading" style="width:112px;line-height:1.231;height:19px;_height:21px;display:none;">'
						+ _('处理中')
						+ '...</div><div class="imgct" style="clear:both;text-align:center;_width:160px;"></div><form method="POST" target="' + iframeId + '" action="/asyn/rotatepic.php"><input type="hidden" id="irRetType" name="retType" value="0" /><input type="hidden" id="irPath" name="path" /><input type="hidden" id="irDegrees" name="degrees" /></form><iframe id="' + iframeId + '" name="' + iframeId + '" src="about:blank" style="display:none"></iframe></div>')[0];
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
		var Self = this;
		Self._imgCt.innerHTML = '<img src="' + src + '/160" /><br /><div style="display:' + (UI.B.ipad ? 'none':'inline') + ';white-space:nowrap;"><a href="#" class="useFilter" style="float:none;display:inline-block;padding:5px 0;">' + _('魔法滤镜') + '</a></div>';

		$$(Self._imgCt,'.useFilter')[0].onclick = function(){
			MI.app({
				Base:function(){
					var pic = src.replace('mblogpic.store.qq.com/mblogpic','t0.qpic.cn/mblogpic');
					MI.photoFilter.build(pic + '/2000','http://t.qq.com/asyn/updateGrabPic.php');
					MI.TalkBox.cur = Self.talkBox;
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
	if(!Self._body) {
		return false;
	}
	Self._more = Self._bottom = _more ? $$(_more,'a')[0] : UI.DC('a');
	Self._new = $('talkNew'); //New Talk Button
	Self._list = UI.children(Self._body);
	Self.talkBoxTmpl = MI.tmpl.reply;
	Self._talk = UI.html(Self.talkBoxTmpl)[0];
	Self._relay = UI.html(Self.talkBoxTmpl.replace('<div class="left"></div>','<div class="left"><label for="replayQzoneCheckbox" style="display:"><input id="replayQzoneCheckbox" type="checkbox" class="check1">' + _('分享到空间') + '</label></div>'))[0];
	Self._comt = UI.html(Self.talkBoxTmpl.replace('<div class="left"></div>','<div class="left"><label for="replayListCheckbox" style="display:"><input id="replayListCheckbox" type="checkbox" class="check1">' + _('同时转播') + '</label></div>'))[0];

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
			MI.Bos('btnkNew',parseInt($$(Self._new,'strong')[0].innerHTML));
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
		/*UI.EA(document.body,'click',function(){
			Self.relayListHide();
		});*/

		Self._body.onmouseover = function(){ //非盲人不做焦点处理
			Self.focus = function(){
			
			}
			Self._body.onmouseover = null;
		}

	},0);
	
	//图标模式
	Self.iconPic = MI.user.fun.iconPic;
	if (Self.iconPic){
		UI.addClass(Self._body,'iconPic');
	}

	//满足同一页面不同TalkList的需求，放prototype里会有问题
	Self.replyBox = {}; // 对话框
	Self.relayBox = {}; // 转播框
	Self.comtBox = {}; // 评论框
	Self.relayListBox = {}; // 转播列表转播框
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
	 *            //0-普通列表  1-群微博列表对外  2-群微博列表对内
	 *            MI.talkList.type = 1;
	 */
	type : 0,
	/**
	 * 消息列表API类型
	 * @type Number
	 *            @example
	 *            MI.talkList.apiType = MI.api.type;
	 */
	apiType : 0,
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
	 * 置顶消息的地址
	 * @type String
	 */
	upTopUrl : MI.url.talkUpTop,
	/**
	 * 取消收藏消息的提示
	 * @type String
	 */
	unfavTip : _('确定删除这条收藏？'),
	/**
	 * 取消置顶消息的提示
	 * @type String
	 */
	unUpTopTip : _('确定删除这条置顶？'),
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
	checkTalkId : function(){ //验证发表框ID
		
	},
	bosHead : function(){
		MI.Bos('btnHead');
	},
	focus : function(){ //Focus To Current List's Time
		if (UI.B.ipad) {
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
	fav : function(id,type){
		this.remove(id,type);
	},
	upTop : function(id,type){
		this.remove(id,type);
	},
	unfav : function(id){ //取消收藏
		var Self = this,
			el = $(id);
		if(Self.isQun==1){
			var wqid=parseInt(UI.A(el,"wqid"));
			MI.Group.qid=wqid;
		}
		Self.confirm(id,2);
		MI.Bos('btnUnFav');			
	},
	selectFav : function(el){
		MI.app({
			TalkListFav : function(){
				MI.favorites && MI.favorites.showDrop(el);
			}
		})
		MI.Bos('btnSelectFav');
		return false;		
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
	/**
	 * 评论框下是否显示列表
	 * @type Function
	 */
	comtBoxList : 1,
	replyCont : '', //对话、转播、评论时输入框的默认值
	replyTarget : null, //对话、转播、评论链接按钮
	replyHide : function(){
		UI.removeClass($(this.cur),'cur');
		UI.removeClass($(this.cur),'hover');
		if (this.talkBox) {
			this.talkBox.display = 0;
		}
	},
	/**
	 * 查看列表的回调函数
	 * @type Function
	 */
	relayListCall : null,
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
		Self[relayList] = UI.html('<div class="relayList"><div class="top"><span class="left"><a href="#" class="vClose"><em></em>' + _('收起') + '</a></span><a class="w_close" href="#" title="' + _('点击关闭') + '"><b class="close">×</b></a></div><div class="loading">' + _('正在加载') + '...</div><div class="cont"></div></div>')[0];
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
			relayCite = $$(o,'.userName strong a')[0] || $$(o,'strong a')[0],
			relayCiteUrl,
			relayCiteAccount,
			text = '',
			noRelayOld;
		if (relayCite){
			relayCiteUrl = relayCite.href.split('/');
			relayCiteAccount = MI.string.account(relayCite.title || UI.A(relayCite,'rel'));
		}
		if(cont){
			if ($$(o,'.time').length == 1 && !UI.hasClass(o,'subHover')) { //原创消息：只有一个时间，且没有subHover的className
				noRelayOld = 1;
			}
			contClone = cont.cloneNode(1);
			if (!noRelayOld || !relayBox) {
				UI.each($$(contClone,'strong'),function(o){
					UI.remove(o);
				});
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
	setArrow : function(el){
		if (el){
			el.style.cssText = 'left:' + (this.setArrow.x + 3) + 'px';
		}
	},
	setArrowX : function(el,time){
		time = time.length == 2 ? time[1] : time[0];
		if (time){
			this.setArrow.x = UI.getX(el) - UI.getX(time) - 12 + (UI.width(el) - 24) / 2;
		}
	},
	card : function(area){
		var Self = this;
		MI.app({
			Base : function(){
				setTimeout(function(){
					MI.Card.build(area || Self._body,'.userPic img',1);
					MI.Card.build(area || Self._body,'.msgBox strong a,.msgBox em a',2);
					MI.Card.build(area || Self._body,'.msgBox .uList_tbst img',3);
					MI.Card.build(area || Self._body,'.msgBox .uList_tbst li p a',2);					
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
						width : 236
					});
					MI.tips.build({
						area : area || Self._body,
						target : '.tIcon.ico_gy',
						txt : Self.gongyiTips,
						click : function(){
							MI.Bos('btnClickGongyi');
						}
					});
				},100);
			}
		});
	},
	addFollowBtn : function(el){
		if (this.followBtn){
			MI.FollowBtn.build(el,'.userPic a');
		}
		if (this.eventsCall){
			this.eventsCall(el);
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
	/**
	 * 事件组回调函数
	 * @type Function
	 * @param {Array} Array 列表DOM数组（ul或li）
	 *            @example
	 *            MI.talkList.eventsCall = function(el){
	 *                
	 *            }
	 */
	eventsCall : null,
	addEvent : function(el){
		var Self = this,
			firstLink = $$(el,'a')[0],
			userPic = $$(el,'.userPic img'),
			comt = $$(el,'.comt')[0],
			reply = $$(el,'.reply')[0],
			relay = $$(el,'.relay')[0],
			picBox = $$(el,'.picBox'),
			videoBox = $$(el,'.videoBox');
		
		//TalkList事件绑定优化
		var addEvent = function(call){
			UI.ER(el,UI.B.ipad ? 'touchstart' : 'mouseover',addEvent);
			firstLink && UI.ER(firstLink,'focus',addEvent);
			MI.app({
				TalkListRich : function(){
					Self._addEvent(el);
					if (call && UI.isFunction(call)){
						call();
					}
				}
			});
		}
		UI.EA(el,UI.B.ipad ? 'touchstart' : 'mouseover',addEvent);
		firstLink && UI.EA(firstLink,'focus',addEvent);

		if (comt) { // 评论
			comt.onclick = function(){
				addEvent(function(){
					comt.onclick();
				});
				return false;
			}
		}
		if (reply) { // 对话
			reply.onclick = function(){
				addEvent(function(){
					reply.onclick();
				});
				return false;
			}
		}
		if (relay) { // 转播
			relay.onclick = function(){
				addEvent(function(){
					relay.onclick();
				});
				return false;
			}
		}

		if (!UI.B.ipad && el.nodeName == 'LI') {
			MI.addHover(el);
		}
		
		UI.each(userPic,function(o){ //图片加载容错
			o.onerror = function(){
				MI.picError(this);
			}
		});
		if (picBox) {
			MI.TalkList.picEvent(picBox);
		}
		if (videoBox) {
			MI.TalkList.videoEvent(videoBox);
		}
	
		//Card And Tips
		Self.card(el);
		Self.buildTips(el);

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
	/**
	 * 是否有底部自适应高度的功能（默认true）
	 * @type boolean
	 *            @example
	 *            MI.talkList.hasBottom = 0;
	 */
	hasBottom : 1,
	bottom : function(){ //Check More's Position
		if (this.hasBottom){
			var main = UI.parents(this._body,'main')[0],side,wrap,y;
			if (main && this._more.innerHTML) {
				side = UI.next(main),wrap = main.parentNode,y
				if (side) {
					UI.C(this._body,'marginBottom',0);
					y = UI.height(main) - UI.height(wrap) - 1;
					UI.C(this._body,'marginBottom',y < -1 ? - y + 'px' : '');
				}
			}
			MI.bottom();
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
					if(minute>1)
						info = minute + _('分钟前<i class="l"></i>');
					else
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
	/**
	 * 是否有更多
	 * @type Boolean
	 *            @example
	 *            MI.talkList.hasNext = 1;
	 */
	hasNext : 1,
	more : function(auto){
		var Self = this,
			children = UI.children(Self._body),
			last = children[children.length - 1],
			tempTime;
		if (!Self.hasNext){ //没有更多
			return;
		}
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
			ajax = UI.isString(json),
			data = ajax ? MI.json(json) : json;
		if (data.result == 0) {
			data.info.guest = Self.guest;
			data.info.fav = 0;
			data.info.shield = 0;
			data.info.iconPic = Self.iconPic;
			data.info.type = Self.type;

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
		MI.newCountNum = 0;
		Self.bottom();
		UI.removeClass(_new,'loading');
		_new.sending = 0;
	},
	addMore : function(json){
		var Self = this,
			_new = Self._new,
			ajax = UI.isString(json),
			children = UI.children(Self._body),
			last = children[children.length - 1],
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
						rich : { //富文本-小报、订单
						    html : "",
						    type : 0
						},
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
						counts : [0,0,0,0], //[转播数,评论数,二次转播数,二次评论数]
						at : [0,0,0], // 未读的信息数 [提到我的,收听的人,认证用户]
						atNum : [0, 0, 0], // 总的信息数 [提到我的, 收听的人, 认证用户]
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
			data.info.type = Self.type;
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
				Self.hasNext = 0;
			}
			else {
				if(data.info.hasNext == 1){
				UI.removeClass(Self._more.parentNode,'hide');
				 Self.hasNext = 1;
			}
				
				
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
		if (MI.user.fun.autoMoreContinue && Self.moreTimes > 2){
			Self.moreTimes = 0;
		}
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
			MI.TalkList.video && MI.TalkList.video(this,2);
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
				  //获取是否已经展开了视频
				  var box = $$(this.parentNode.parentNode,'.videoBox')[0];
				  if(box && box.isOpen) {
					Self.videoClose();
				  } else {
  				  Self.video(this,1);
  				}
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
				
				//根据图片宽度是否大于460   限制查看原图是否显示  by wujian 
		                if(MI.user.fun.checkBtnOriginalPic){
		                    var ele=UI.GC(this.parentNode,".btnOriginal")[0];          
		                        if(link.clientWidth<460){
		                        UI.C(ele,"display","none");
		                    }else{
		                        UI.C(ele,"display","");
		                    }   
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

MI.TalkList.picTool = function() {
	var P = this.parentNode.parentNode,
		clockWise = UI.hasClass(this,'btnPrev'),
		Pic = $$(P,'img'),
		pic = Pic[Pic.length - 1];

	MI.TalkList.rotateImg(clockWise, pic);
	this.blur();
	MI.Bos('btnPicWhirl');
	return false;
};

MI.TalkList.rotateImg = function(clockWise, pic) {
	if (!UI.B.ie) { //Don't Use Canvas For Gif
		pic.whirl = 1;
	}

	if (pic.w === undefined) {
		pic.w = pic.width;
		pic.h = pic.height;
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
		else {
			pic.width = pic.w;
			pic.height = pic.h;
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
		MI.TalkList.picDraw(pic, pic.nextSibling);
	}
};

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
							s = type ? '<a class="foFun addAttention" href="#">' + _('+') + _('收听') + '</a>' : '<input type="button" class="addAttention" value="' + _('立即收听') + '" />'
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
				//收听取消格式串
				var fcancle = '<a href="#" class="delAttention" style="display:none">' + _('取消<i class="l"></i>') + '</a>';
				if (MI.tmpl.fcancle) {
					fcancle = MI.tmpl.fcancle;
				}
				var del = UI.html(type ? '<div class="foFun disabled" style="display:none">' + _('已收听') + '</div>' : fcancle)[0];
				UI.after(del,o);
				if(o.style.display == 'none') UI.show(del);
				o.onclick = function(){
					var S = this,user = Self.user(S);
					
					MI.follow(user,S,function(){
						UI.hide(S);
						S.className='addAttention';
						UI.show(S.nextSibling);
					});
					MI.Bos(bossFollow + (type || ''));
					if(Self.followCall) Self.followCall(S);
					return false;
				}
				if (!type){
					del.onclick = function(){
						var S = this,user = Self.user(S);
						MI.follow(user,S,function(){
							UI.hide(S);
							S.className='delAttention';
							UI.show(S.previousSibling);
						});
						MI.Bos(bossUnFollow + (type || ''));
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
		var bannerGet = function(){
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
				UI.each(link,function(o,i){
					o.onclick = function(){
						if (i == 0){
							UI.hide(id);
							eval(close);
							tipsPosition();
							return false;
						}
						else {
							//MI.Bos('homeBannerTip',i,1,1125);
							MI.Bos({
								name : 'homeBannerTip',
								iBak1 : i - 1,
								id : 1158
							});
							MI.Bos('homeBannerTip_' + oBanner.id);
							if (oBanner.close){
								eval(close);
							}
						}
					}
				});
				if (bannerPic.length > 1){
					MI.app({
						Slide : function(){
							MI.slide = new MI.Slide({
								target : $(id),
								auto : 5000,
								tmpl : '<%for(var i=0;i<num;i++){%><a href="#" class="<%if(i==0){%>on<%}%>"><%=i+1%></a><%}%>'
							});
						}
					});
				}
				delete obj.banner;
			}
		}
		if(MI.user.fun.showRecommend){
			UI.hide('homeBannerTip');
			UI.hide('NewGuideBannerTip');
			MI.app({
				Base : function(){
					var times = 10;
					var t = setInterval(function(){
						if(times != 0){
							times--;
							//如果拉取到有推荐数据可展示
							if(MI.MayBeKnow.returnResult==1){
								clearInterval(t);
							}
						}
						else{
							clearInterval(t);
							bannerGet();
							UI.show('NewGuideBannerTip');
							UI.show('homeBannerTip');
						}
					},200);
				}
			});
		}
		else {
			bannerGet();
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
			html = UI.html(oTips.content.replace(/{name}/g,MI.user.account))[0];
			/*html = UI.html(new UI.tmplString(oTips.content)({
						name : MI.user.account,
						nick : MI.user.name
					}))[0];*/
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
				MI.ajax({
					url : MI.url.updateTips,
					data : {
						id : oTips.id,
						status : 0
					},
					success : function(data){
						data = MI.json(data);
						if(data.result==0){
							if (url){
								if (!url.hasString('#')){
									document.location.href = url;
								}
							}
						}
					}
				});
				MI.Bos('btnTips_' + oTips.id + '_' + i);
				UI.hide(html);
			}
			if (!type){
				tipsPosition = function(){
					times--;
					target = $$(oTips.target)[0];
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
	 *                medal : [4],
	 *                sex : '他'
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
				},
				QzonePhoto : {
					name : '相册',
					url : 'http://t.qq.com/app/qzphoto/',
					on : false
				},
				QQMusic : {
					name : '音乐',
					url : 'http://t.qq.com/app/music/',
					on : false
				}
			},
			type = MIApp.id,
			html = [],
			user;
		if (!MI.user.fun.app){ //相册灰度到劳模三级
			delete tabs.QzonePhoto;
		}
		if (!(MI.user.isLab || MI.user.medal[1] > 2)){ //音乐灰度到劳模三级
			delete tabs.QQMusic;
		}
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
					html.push('<li><a href="' + tabs[i].url + user + '?preview">' + tabs[i].name + '</a></li>');
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
	},
	/**
	 * 旋风下载
	 *            @example
	 *            MI.App.qqDownload(this,event,21506);
	 *            MI.App.comment('1234567890', domOfTheTweet);
	 *            下载按钮需要有qHref属性，值为文件地址
	 * @param {Object} 下载链接的dom对象  
	 * @param {Object} 点击事件对象
	 * @param {Number|String} 应用id，由旋风分配给调用方的服务id
	 */
	qqDownload : function(el,event,appid){
		 MI.app({
			 QQDownload : function(){
				  MI.qqdl.OnDownloadClick_Game(el,event,appid);
				  el.oncontextmenu = function(){
					  MI.qqdl.OnContextClick(el,event);
				  }
			  }
		 });
		 return false;
	 }
	
}
/**
 * 设置页面标题的新消息数
 * 
 * @param {Number} Number 当前新消息数
 * @param {Number} Number 最大新消息数
 *            @example
 *            MI.newCount.setTitle(); //清空标题的新消息数
 *            MI.newCount.setTitle(10); //设置标题10条新消息数
 */
MI.newCount.setTitle = function(num,maxNum){
	num = num || 0;
	if (!document.titleTmp) {
		document.titleTmp = document.title;
	}
	if (maxNum && num > maxNum) {
		document.title = '(' + maxNum + '+) ' + document.titleTmp;
	}
	else {
		document.title = (num ? '(' + num + ') ' : '') + document.titleTmp;
	}
}
MI.newCount.data = {};
MI.host = document.location.host;
if (MI.host == 't.qq.com' || MI.host == 'qun.t.qq.com' || MI.host == 'app.t.qq.com' || MI.host == 'event.t.qq.com'){
	MI.hostType = 1;
} else if(MI.host == 'xy.t.qq.com') {	//校园微博
	MI.hostType = 2;
}

if (window._MIVersion) {
	MI.versionSet(_MIVersion);
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
		} else if(MI.hostType == 2) {	//校园微博
			//Badge
			setTimeout(function() {
				MI.url.medal = 'http://xy.t.qq.com/asyn/medalpoint.php';
				MI.badge.build();
			},0);
		}
			
		setTimeout(function(){
			//Go Top
			if (MI.user.fun.goTop && MI.user.account){
				MI.GoTop.build();
			}

			//Auto Get More Talk List
			if (MI.talkList && MI.talkList.auto && MI.talkList._more) {
				MI.autoMore();
			}
		},100);

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

UI.ready(function(){
	if (UI.hasClass(document.body,'ipad')){
		UI.B.ipad = 1;
	}
	
	//MI.user.fun 的默认值
	if (MI.user.fun) {
		var fun = {search:1,goTop:1,mergePic:1,card:1,msgLab:1};
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
	var lazyHtml;
	for (var i in MI.lazy) {
		lazyHtml = $(i);
		if (lazyHtml) {
			lazyHtml.innerHTML = MI.lazy[i];
			delete MI.lazy[i];
		}
	}

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

	MI.TalkBox.showDraft(MI.talkBox);

	if (MI.hostType == 1){
		//MI.College
		if (MI.user.college) {
			MI.app({
				College : function(){
					MI.College.build();
				}
			});
		}
	
		setTimeout(function(){
			//页面大运会/微博等级图标tips构建，不包括talklist
			var areaTitle;
			var guest = $('LUI');  //客人页
			var host = $('UIn'); //主人页
			if (guest == null)
				areaTitle = host;
			else
				areaTitle = guest;
			if (areaTitle){
				MI.app({
					Base : function(){
						MI.tips.build({
							area : areaTitle,
							target : '.tIcon.ico_gy',
							txt : MI.TalkList.prototype.gongyiTips,
							click : function(){
								MI.Bos('btnClickGongyi');
							}
						});
						MI.tips.build({
							area : areaTitle,
							target : '.ico_level',
							txt : MI.TalkList.prototype.levelTips
						});
					}
				});
			}
			//用户列表展示微博等级图标tips
			var areaList;
			var userList = $$('.listWrapper .LC')[0];
			areaList = userList;
			if(userList){
				MI.app({
					Base : function(){
						MI.tips.build({
							area : areaList,
							target : '.ico_level',
							txt : MI.TalkList.prototype.levelTips
						});
					}
				});
			}
		},3000);
	
		//安全中心的蠕虫监控
		setTimeout(function(){
			UI.getScript('http://mat1.gtimg.com/www/js/common.js',function(){
				//灰度10%
				checkNonTxDomain(0.2,10);
			});
			MI.Bos({
				name : 'btnHost_' + MI.host,
				random : MI.host == 't.qq.com' ? 0.000001 : 0.0001,
				id : 1210
			});
		},3000);
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
	
	//Pre Load
	setTimeout(function(){
		var vJS=['TalkListRich','Tmpl','Music'];
		var html = [];
		html.push('<div style="display:none">');
		UI.each(vJS,function(o){
			if (MI.version[o]){
				html.push('<img src="' + MI.version[o] + '">');
			}
		});
		html.push('</div>');
		UI.append(UI.html(html.join(''))[0],document.body);
	},2000);
	
	
	//Lab Test
	var urlData = UI.parseUrl();
	if (urlData.newMusic){
		MI.user.fun.newMusicBox = 1;
	}
	if (urlData.relTopic || MI.user.isLab){
		MI.user.fun.relTopic = 1;
	}
	if (urlData.urlPreview){
		MI.user.fun.urlPreview = 1;
	}
	if(urlData.doTask){
		MI.app({Task:function(){MI.Task.build()}});
	}
	if (MI.user.isLab || MI.user.fun.newMusicBox){ // || 'xhlv,lunar_moon,piboye,armstrong,pagepeng,zhengguo,hadeszh'.hasString(MI.user.account)
		MI.user.fun.newMusic = 1;
	}

});

})();
