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
		refresh 广播大厅自动刷新： 0不刷新、1刷新
		mb_vT_[account] 查看消息列表类型（viewType）： 只看原创|简约模式|只看我收听的人|客人页只看原创|客人页简约模式

	LocalStorage:
		option_[type]_[account] 首页右侧栏：1展开、-1收起 （type = topic/recommend/follow/hot）
		option_[type]_[account] 其他状态 （type = relayListCheck,sayHi）
		tips_[type]_[account] 提示/广告：1显示、-1隐藏 （type = relayList,list,college,QQx360,lxBannerTip,collegeView）
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
*/
$ = UI.G;
$$ = UI.GC;
onerror = function(msg,url,line){
	if(!MI.user.isLab){
		var tip = '';
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
};
try{document.domain='qq.com'}catch(e){}
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
	 *                flag:{}, //标志位
	 *                fun:{ //功能开关
	 *                    search:1, //搜索
	 *                    report:1, //主Timeline显示举报按钮
	 *                    autoPic:1, //自动加载大图
	 *                    turnPic:1 //长传图片可旋转
	 *                },
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
					case '.' : buf.push('\\x2E');break;
					case '$' : buf.push('\\x24');break;
					case '^' : buf.push('\\x5E');break;
					case '{' : buf.push('\\x7B');break;
					case '[' : buf.push('\\x5B');break;
					case '(' : buf.push('\\x28');break;
					case '|' : buf.push('\\x28');break;
					case ')' : buf.push('\\x29');break;
					case '*' : buf.push('\\x2A');break;
					case '+' : buf.push('\\x2B');break;
					case '?' : buf.push('\\x3F');break;
					case '\\' : buf.push('\\x5C');break;
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
		id : function(str){
			return str.match(/[^\/]+$/g)[0].replace('#M','');
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
	ajax : 0, //Ajax Times
	talkNew : [],
	talkMore : [],
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
		picTool : '<div class="tools"><a href="#" class="btnBack"><em></em>向左转</a><span>|</span><a href="#" class="btnPrev"><em></em>向右转</a><a href="$Url/2000" class="btnOriginal" onclick="MI.Bos(\'btnPicSource\')" target="_blank">查看原图</a></div>',
		reply : '<div class="talkWrap"><div class="SA"><em>◆</em><span>◆</span></div><div class="top"><span class="left"><span class="replyTitle"></span>　<span class="addReply"></span></span><a href="#" class="close" title="关闭">关闭</a></div><iframe class="comts" src="about:blank" frameborder="0" scrolling="no" style="height:0"></iframe><div class="cont"><textarea class="inputTxt"></textarea></div><div class="bot"><div class="left" style="margin-right:1ex"><span class="number cNote"></span></div><div class="left"></div><input type="button" class="inputBtn sendBtn" value="" /><span class="countTxt"></span><a href="#" class="ico_face" title="表情"></a></div><div class="talkSuc" style="display:none"><span class="ico_tsW"><span class="ico_ts"></span></span><span class="msg"></span></div></div>'
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
			var range = document.selection.createRange()
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
		if (!el || el.innerHTML.hasString('超过')) return;
		var cur = el.innerHTML.replace(/\D/g,'') || 0;
		if (format) {
			cur = MI.number.format(parseInt(cur.replace(/,/g,'')) + num);
		}
		else cur = parseInt(cur) + num;
		el.innerHTML = cur < 0 ? 0 : cur;
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
					url = '/follow.php';
				}
				else {
					url = '/unfollow.php';
				}

				el.sending = 1;

				var Time,Time_1,Time_2,Time_3;
				Time = + new Date();
				UI.ajax({
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

							//Callback Function
							if (call) {
								call(isFollow);
							}
							el.value = isFollow == 1 ? '取消收听' : '收听';
						}
						else if (data.result == -100) {
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
	sFollowTip : ['添加到特别收听','取消特别收听'],
	topic : function(id,el,del){
		if (!el.sending) {
			var isDel = del || UI.hasClass(el,'delAttention'),type = isDel ? '2' : '1',
				topic = $('gzTopic');
			if (topic){
				UI.A(topic,'tab',2);
			}
			//UI.get('/asyn/topic.php','r=' + MI.random() + '&tid=' + id + '&type=' + type,function(data){
			UI.ajax({
				url : '/asyn/topic.php',
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
							el.value = isDel ? '收听' : '取消收听';
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
			UI.ajax({
				url: '/asyn/messageSearch.php',
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
							el.innerHTML = isDel ? '+订阅关键词' : '-取消订阅';
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
		
		UI.get('/asyn/mysidebar.php', params, function(data) {
			data = MI.json(data);
			if (data.result == 0) {
				if (data.info && data.info.topic) {
					if (toggle) el.unfold = unfold;
					el.innerHTML = data.info.topic;

					UI.evalScript(data.info.topic);
				}
				MI.Load.bottom();
			}
		});
		
		if (toggle) MI.Bos(unfold?'btnMoreSub':'btnLessSub');
	},
	newCount : function(type){
		type = type || '4,3,2,1';
		//type = type || '4,3,2', //暂时去掉气泡提示
		var urlDataTmp = urlData = 'type=' + type + '&r=' + MI.random();
		setInterval(newCout,30000);
		setTimeout(function(){ //不加延迟，IE中偶尔请求会被阻断
			newCout();
		},10);
		var fail = 0;
		function newCout(){
			if (fail < 6) { //6次未登录后不再拉取
				urlData = urlDataTmp;
				if (MI.newCount.data){
					for (var i in MI.newCount.data){
						urlData += '&' + i + '=' + MI.newCount.data[i];
					}
				}
				var Time,Time_1,Time_2,Time_3;
				Time = + new Date();
				UI.get('/asyn/newMsgCount.php',urlData,function(data){
					data = MI.json(data);
					//data = {"result":0,"msg":"\u6210\u529f","info":[{"type":1,"value":999},{"type":2,"value":2},{"type":3,"value":3},{"type":4,"value":4}]};
					if (data.result == 0) {
						var target,num,maxNum,tip,_new;
						UI.each(data.info,function(o,i){
							num = o.value;
							if (o.type == 1) {
								target = $('newCountFollower');
								if (target && num) {
									var _num = target.firstChild,followerNum = $('followerNum');
									maxNum = 999;
									_num.innerHTML =  num > maxNum ? maxNum + '+' : '+' + num;
									_num.title =  '有' + (num > maxNum ? '超过' + maxNum : num) + '个新听众';
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
							}
							//名单新收录提醒
							if (o.type == 8) {
								target = $('newListonNum');
								if (target && num) {
									var _num = target.firstChild;
									maxNum = 999;
									_num.innerHTML =  num > maxNum ? maxNum + '+' : '+' + num;
									_num.title =  '有' + (num > maxNum ? '超过' + maxNum : num) + '个新名单收录你';
									UI.addClass(UI.next(_num),'bubble');
									UI.show(target);
								}
								else if (target){
									UI.hide(target);
								}
							}
							if (o.type == 2) {
								target = $('newCoutMsg');
								if (target) {
									target.innerHTML = target && num ? '(' + num + ')' : '';
								}
							}
							if ((o.type == 3 || o.type == 5 || o.type == 6 || o.type == 7) && !MI.noNewCount) {
								if (MI.talkList && MI.talkList._new) {
									maxNum = 50000;
									if (o.type == 6 || o.type == 7){
										maxNum = 100;
									}
									if (num >= maxNum) {
										tip = '超过<strong>' + maxNum + '</strong>条的';
									}
									else tip = '<strong>' + num + '</strong>条';
									_new = MI.talkList._new;
									_new.innerHTML = '<a href="javascript:void(0)" tabindex="4">有' + tip + '新广播，点击查看</a>';

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
							}
							if (o.type == 4) {
								target = $('newCoutAt');
								if (target) {
									target.innerHTML = target && num ? '(' + num + ')' : '';
								}
							}
						});
						fail = 0;
					}
					else if (data.result == -1) { //未登录
						fail++;
					}

					//Speed
					Time_2 = + new Date() - Time;
					setTimeout(function(){
						Time_3 = + new Date() - Time;
						MI.Speed('t_asyn_newmsg',0.02,Time_1,Time_2,Time_3);
					},0);
				});
			}
		}
	},
	addHover : function(el){
		var delayHover,delayOut;
		el.onmouseover = function(){
			var Self = this;
			clearTimeout(delayOut);
			delayHover = setTimeout(function(){
				UI.addClass(Self,'hover');
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
				UI.C(list,'marginBottom',y < 0 ? - y + 'px' : '');
			}
		}
	},
	goHome : function(){
		document.location.href = '/' + MI.user.account;
	},
	alert : function(str,call){
		if(str) {
			MI.dialog.alert(str,call);
		}
	},
	tip : function(str,call){
		if(str) {
			MI.dialog.showTip({html:str,end:call});
		}
	},
	version : (function(){
		var url = 'http://mat1.gtimg.com/www/mb/',
			js = {
				ui : {
					DatePicker : '100827',
					ColorPicker : '110107'
				},
				mi : {
					Base : '110111a',
					City : '100831',
					CityAll : '100831',
					Validate : '110112',
					ValidateNew : '101229',
					RelateSelect : '100921',
					Slide : '100806',
					College : '101216',
					Theme : '110110a',
					Tag : '110111a',
					List : '101215',
					SettingEdu : '110110',
					SettingWork : '110110',
					TalkListUpdate : '101111',
					Scroll : '101111',
					Capture : '101206',
					Music : '101220',
					QQMusicInstance : '101220',
					QQMusicPlayer : '101022',
					QQMusicWmpPlayer : '101022',
					QQMuicHtml5Player : '101022'
				}
			},
			css = {
				ui : {
					datePicker : '100827',
					colorPicker : '101228'
				}
			},
			all = {};
		for (var i in js) {
			for (var j in js[i]) {
				all[j] = url + 'js/' + i + '.' + j + '_' + js[i][j] + '.js'
			}
		}
		for (var i in css) {
			for (var j in css[i]) {
				all[j] = url + 'css/' + j + '_' + css[i][j] + '.css'
			}
		}
		return all;
	})(),
	versionSet : function(obj){
		for (var i in obj){
			var version = MI.version[i],arr,name,type;
			if (version) {
				arr = version.split('_');
				name = arr[0]; 
				type = arr[1].split('.')[1];
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
		var css;
		for (var i in obj || MI._app) {
			if (!MI[i]) {
				if (!MI._appLoading[i]){
					setTimeout((function(i){
						return function(){
							UI.getScript(MI.version[i],function(){
								MI.appLoadDo(i);
							},'utf-8');
						}
					})(i),0);
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
				delete MI._app[i];
				delete MI._appLoad[i];
			}
		}
		MI.appLoaded = 1;
	},
	appLoadDo : function(i){ //Run Callback Function
		if (UI.isFunction(MI._app[i])) {
			MI._app[i]();
		}
		for (var j in MI._appLoad[i]){
			if (UI.isFunction(MI._appLoad[i][j])) {
				MI._appLoad[i][j]();
			}
		}
		delete MI._appLoad[i];
		delete MI._app[i];
	},
	appLoaded : 0
}
/*
MI.DropTips = function(id){ //DropTips For Top Search
	var Self = this;
	this._key = $(id);
	if (this._key) {
		this._form = UI.parent(this._key);
		this._btn = this._key.nextSibling;
		this._select = UI.html('<ul class="dropTips"><li class="on">找人</li><li>搜话题</li></div>')[0];
		this._list = $$(this._select,'li');
		UI.after(this._select,this._key);
		this._key.value = '';
		this._key.blur();
		UI.hide(Self._select);

		//Event
		UI.each(Self._list,function(el,i){
			el.onmouseover = function(){
				Self.select(i);
			}
			el.onclick = function(){
				Self.submit();
			}
		});
		UI.EA(document.body,'click',function(){
			Self.hide();
		});
		this._key.onblur = function(){
			if(!this.value) UI.show(UI.prev(this));
		}
		this._key.onbeforeeditfocus = this._key.onfocus = function(){
			UI.hide(UI.prev(this));
			Self.select(Self.index);
		}
		this._key.onclick = function(e){
			UI.E(e).stop();
		}
		this._key.onkeyup = function(e){
			var E = UI.E(e),index = Self.index;
			if (E.key == 40) { //Down Key
				index++
			}
			else if (E.key == 38) { //Up Key
				index--;
			}
			Self.select(index);
		}
		this._form.onsubmit = function(){
			if(UI.trim(Self._key.value)) {
				Self.submit();
			}
			else {
				Self._key.focus();
			}
			return false;
		}
		this._key.previousSibling.onclick = function(){
			Self._key.focus();
		}
		MI.addHover(this._btn);
	}
}
MI.DropTips.prototype = {
	action : ['/search/index.php?pos=1&k=','/k/'],
	index : 0,
	hide : function(){
		UI.hide(this._select);
	},
	select : function(index){
	},
	submit : function(){
		var action = this.action[this.index],value = encodeURIComponent(this._key.value);
		document.location.href = action + (action.hasString('?') ? value : encodeURIComponent(value));
	}
}*/
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
	var filter = /^draft|top|time|option|tips/,local = window.localStorage; //|follow @联想数据过大，有时后会有问题
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
		_body.save('oXMLBranch');
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
			var ouin = MI.Uin(),data = '';//UI.trim(UI.cookie('o_cookie'));
			value = value || MI.boss;
			if (UI.isNumber(value)){
				data = '&sServerIp=&iBackInt1=' + value + '&iBackInt2=&sBackStr1=';
			}
			else if(UI.isString(value)){
				data = '&sServerIp=&iBackInt1=&iBackInt2=&sBackStr1=' + value;
			}
			MI.Bos.pic[UI.random(0,9)].src = 'http://btrace.qq.com/collect?sIp=&iQQ=' + ouin + '&sBiz=microblog&sOp=' + op + '&iSta=0&iTy=214&iFlow=0' + data + (op == 'btnOnerror' ? '' : '&r=' + MI.random());
		}catch(e){}
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
	clearTimeout(MI.delay.crs);
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
		if (!breaked && UI.hasClass(o,className)) {
			var _y = UI.getY(o.parentNode) || UI.getY(o.parentNode.parentNode);
			if (_y && _y < y && _y > yTop) {
				var src = UI.A(o,className),
					preview,
					iconPic = MI.Crs.iconPic && src.hasString('mblogpic') && !UI.hasClass(o,'noIconPic');
				setTimeout(function(){
					preview = $$(o.parentNode,'.preview')[0];
					if (iconPic) { //For Big Picture
						var md5 = src.match(/\w{10,30}/g) || ['NOMD5'];
						if (MI.Crs.iconPic.hasString(md5[0])) {
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
								MI.Bos('btnPicBigPreload','',0.1);
							},500);
						}
					}

					if (UI.hasClass(o.parentNode,"vThumbs")) { //For Video Thumbs
						var vThumbsBox = o.parentNode.parentNode,
							vSimple = $$(vThumbsBox,'.vSimple')[0],
							vThumbs = $$(vThumbsBox,'.vThumbs')[0];
						if (MI.Crs.iconPic.hasString(src)) {
							UI.hide(vThumbs);
							UI.show(vSimple);
							vThumbsBox.onmouseover = function(){
								vThumbs.style.display = 'inline';
								UI.addClass(this,'hover');
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
MI.Tips.txt = ['这条消息来自手机微博。<br>想要成为微博手机达人？点<a href="/client.php?t=mobile" onclick="MI.Bos(\'btnPhoneIconTip\')" target="_blank" class="ulink">这里</a>'];
MI.Tips.url = {};
MI.Load = function(id,url,type,boss){
	var _fold='收起',
		_unfold='展开',
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
		UI.get(url,'t=' + type.join(',') + '&r=' + r,function(data){
			Time_1 = + new Date() - Time;
			data = MI.json(data);
			if (data.result == 0){
				UI.each(id,function(o,i){
					var info = data.info[type[i]];
					if (info) {
						loaded(o,info);
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
		UI.get(url,'t=' + type + '&r=' + r,function(data){
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
		});
	}
	else {
		UI.toggleClass(P,_folded);
	}
	MI.Load.bottom();
	try{
		btn.blur();
	}catch(e){}
	if (!isRefresh) {
		MI.S('option_' + type + '_' + MI.user.account,folded ?  1 : -1);
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
	}
}
MI.Load.bottom = function(){
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
}
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
		Self._face = Self.$('.insertFace .txt,a.ico_face');
		Self._video = Self.$('.uploadVideo');
		Self._videoAnchor = $$(Self._video,'.txt')[0];
		Self._music = Self.$('.uploadMusic');
		Self._musicAnchor = $$(Self._music,'.txt')[0];
		Self._pic = Self.$('.uploadPic');
		Self._picForm = Self.$('.picForm');
		Self._picBtn = Self.$('.picForm input');
		Self._close = Self.$('.close');
		Self._num = [$('talkNum')];
		Self._addReply = Self.$('.addReply');
		Self._addComt = Self.$('.addComt');
		Self._comts = Self.$('.comts');

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
					showGuide();
				}
			},
			countTxtDelay = function(){
				clearTimeout(Self.delay.count);
				Self.delay.count = setTimeout(countTxt,75);
			};
			function guide(name){
				return '对 ' + name + ' 说：';
			}
			function showGuide(){
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
				showGuide();
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
				MI.app({
					Base : function(){
						new MI.AutoCmt({
							target : Self._txt,
							key : 1,
							topic : 1,
							face : 1,
							call : function(){
								countTxtDelay();
								MI.Bos('btnAutoAtAccount');
							}
						});
					}
				})
			}

			//New Topic
			if (Self._topic) {
				Self._topic.onclick = function(){
					Self.addTopic();
					MI.Bos('btnTopic');
					return false;
				}
			}
			
			//Insert Face
			if (Self._face) {
				Self._face.onclick = function(e){
					Self.addFace();
					UI.E(e).stop();
					MI.Bos('btnFace',(Self.type || 1) + '');
					Self._video && UI.hide(Self._videoBox);
					Self._music && MI.Music && Self._musicBox && MI.Music.hide();
					return false;
				}
			}
			
			//Add QQ Music
			if (Self._music) {
				Self._musicAnchor.onclick = function(){
					UI.hide(Self._videoBox);
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
					return false;
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
				Self._errMsg = ['请先登录再进行操作','稍等一下，喝杯茶，转贴的视频正在来的路上','转贴的视频丢在路上了，再试一次？','暂不支持该视频地址，<a href="#" class="vNormalBtn">作为普通链接显示</a>'];

				var html = UI.html('<div class="vloadWrap" style="display:none"><form name="videoUploadFrom" id="videoUploadFrom" class="videoUploadFrom" method="get"><a href="#" class="close" title="关闭">关闭</a><p>粘帖视频播放页地址<span class="cNote">(优酷、土豆、56等网站视频可直接播放)</span></p><p class="clear"><input type="text" class="inputTxt" /><input type="submit" class="btn" value="确定" /></p><p class="cError" style="display:none">'+Self._errMsg[3]+'</p></form></div>'),frag = document.createDocumentFragment();

				UI.each(html,function(o){
					UI.append(o,frag);
				});
				UI.append(frag,Self._video);

				Self._videoClose = $$(Self._video,'.close')[0];
				Self._videoBox = $$(Self._video,'.vloadWrap')[0];
				Self._videoForm = $$(Self._video,'.videoUploadFrom')[0];
				Self._videoTxt = $$(Self._video,'.inputTxt')[0];
				Self._videoBtn = $$(Self._video,'.btn')[0];
				Self._videoError = $$(Self._video,'.cError')[0];
				Self._videoNormalBtn = $$(Self._video,'.vNormalBtn')[0];
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
					if(MI.Music){
						if (!MI.Music.builded){
							MI.Music.build(Self);
						}
						MI.Music.hide();
					}
					UI.hide(Self._videoError);
					UI.show(Self._videoBox);
					if(UI.trim(Self._videoTxt.value)){
						Self._videoTxt.select();
					}else{
						Self._videoTxt.focus();
					}
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
				var html = UI.html('<p class="cutBox" style="display:none;"><span class="ico_cut"></span><a href="#" class="txt mOut" title="支持粘贴QQ截屏等剪贴板内容">截屏</a></p><span class="pidLoad" style="display:none">上传中 <a href="#" class="cancel">[取消]</a></span><span style="display:none" class="preview"><span class="link"></span><a href="#" class="del">[删除]</a></span><iframe id="imageUpload" name="imageUpload" src="about:blank" style="display:none"></iframe>'),
					frag = document.createDocumentFragment(),
					action = '/asyn/uploadpic.php';
				UI.each(html,function(o){
					UI.append(o,frag);
				});
				if (MI.user.fun.turnPic) {
					UI.append(MI.PicTurn.build(Self), frag);
					action = MI.UploadServer.get() + action;
				}
				UI.append(frag,Self._pic);

				Self._picForm.reset();
				UI.A(Self._picForm,'action',action);

				Self._iframe = $('imageUpload');
				Self._picIco = $$(Self._pic,'.ico_pic')[0];
				Self._picTxt = $$(Self._pic,'.txt')[0];
				Self._picCapture = $$(Self._pic,'.cutBox')[0];
				Self._picLoading = $$(Self._pic,'.pidLoad')[0];
				Self._picPreview = $$(Self._pic,'.preview')[0];
				Self._picLink = $$(Self._pic,'.link')[0];
				Self._picDel = $$(Self._pic,'.del')[0];
				Self._picCancel = $$(Self._pic,'.cancel')[0];
				Self._pic.onmouseover = function(){
					UI.addClass(this,'hover');
					clearTimeout(Self.delay.picBtn);
					if (!Self.pic && UI.C(Self._picLoading,'display') == 'none' && UI.B.win && (UI.B.ie || UI.B.firefox)){
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
										title : '你还未安装腾讯微博截屏插件',
										content : '安装后，你就可以使用截屏功能',
										confirmTxt : '安装',
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
				Self._pic.onmouseout = function(){
					UI.removeClass(this,'hover');
					Self.delay.picBtn = setTimeout(function(){
						UI.hide(Self._picCapture);
					},10);
				}
				Self._picCapture.onmouseover = function(e){
					UI.removeClass(this.lastChild,'mOut');
					UI.addClass(Self._picTxt,'mOut');
					clearTimeout(Self.delay.picBtn);
					UI.E(e).stop();
				}
				Self._picCapture.onmouseout = function(){
					UI.addClass(this.lastChild,'mOut');
					UI.removeClass(Self._picTxt,'mOut');
				}
				Self._picForm.onsubmit = function(){
					if (!Self._picBtn.value) {
						return false;
					}
				}
				Self._picBtn.onchange = function(){ //Upload
					var fileName = this.value,
						fileType = fileName.substring(fileName.lastIndexOf('.') + 1,fileName.length).toLowerCase();
					if (!'jpg,jpeg,gif,png'.hasString(fileType)) {
						MI.alert('仅支持jpg、jpeg、gif、png图片文件');
						return false;
					}
					Self.uploadPic();
					Self.PicUpTime = + new Date(); //图片上传时间
					Self._picForm.submit();
					MI.Bos('btnPic');
				}
				Self._picDel.onclick = function(){ //Delete
					Self.delPic();
					MI.Bos('btnPicDel');
					return false;
				}
				Self._picCancel.onclick = function(){ //Cancel
					Self.cancelPic();
					MI.Bos('btnPicCancel');
					return false;
				}
			}
			//Add Reply
			if (Self._addReply) {
				Self._addReply.onclick = function(){
					UI.hide(this);
					var length = Self._txt.value.length;
					Self._txt.value = Self._txt.value.replace(this.txt,'');
					Self.countTxt();
					Self._txt.focus();
					MI.selectTxt(Self._txt,length,length,length);
					MI.Bos('btnAddReply');
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

			//Submit Button
			//Self._btn.onfocus = MI.blur;
			Self._btn.onclick = function(){
				if (UI.hasClass(this,'disabled')) {
					return;
				}
				/*if (Self._btn.disable) {
					//Self.showTip(Self.txtTip.empty,true);
					return;
				}*/
				Self.countTxt();
				Self.send();
				switch (Self.type) {
					case null:
						MI.Bos('btnSend');
						break;
					case 1:
						MI.Bos('btnSendReply');
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
		if (UI.B.win && (UI.B.ie || UI.B.firefox)){
			setTimeout(function(){
				MI.app({Capture:null});
			},0);
		}
		MI.app({
			Base : function(){
				Self.tmpl = MI.tmpl.listAll;
			}
		});
	}
}
MI.TalkBox.prototype = {
	delay : {},
	delayTime : 1500,
	delayVideo : null,
	delayVideoTime : null,
	url : '/publish.php',
	type : null, //Value: null(Talk)  1(Relay)  2(Reply)  3(Message)  4(Timeline Comment)  5(Comment)
				 //Value In PHP: 1(Talk)  2(Relay)  4(Reply)  6(Empty Reply)  3(Message) 7(Comment)
	source : (function(){ //Talk's Source,example Web QQ
		var source = 0,hostname;
		try{
			hostname = top.document.location.hostname;
		}catch(e){}
		if (hostname == 'web2.qq.com') {
			source = 1009;
		}
		return source;
	})(),
	countType : '', //Count TalkBox's Type For Product
	iconPic : 0, //View Model 0 1(Simple Model)
	pic : '', //Save Pic's Url
	//video : '', //Save Video's Url
	code : null, //Verify Code
	topic : null, //Auto Add Topic
	talkId : null, //Id To Reply Or Relay
	txtMax : 140,
	txtCache : '', //Cache Success Talk
	txtTopic : '#输入话题标题#',
	txtPic : '#分享照片#',
	txtVideo : '',
	txtMusic : '#分享音乐#',
	txtTip : {
		empty : '请输入内容',
		fail : '发送失败,请重试',
		repeat : '请不要连续发表重复内容'
	},
	txtTipSend : '广播中',
	addList : 0, //If Add New Talk To List
	addCheck : null, //Check Content Of Add New Talk To List
	addNum : 1, //Add Num When Send Success
	autoHeight : 0, //Auto Change Textarea's Height
	tmpl : '',
	countUrl : 1,
	countTxt : function(){
		var Self = this,
			txt = Self._txt,
			value = txt.value,
			talkTip,
			length,
			len,
			url = value.match(new RegExp('((news|telnet|nttp|file|http|ftp|https)://){1}(([-A-Za-z0-9]+(\\.[-A-Za-z0-9]+)*(\\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\\.[0-9]{1,3}){3}))(:[0-9]*)?(/[-A-Za-z0-9_\\$\\.\\+\\!\\*\\(\\),;:@&=\\?/~\\#\\%]*)*','gi')) || [],
			urlExceed = 0,
			urlNum = 0;
		Self.length = length = MI.string.length(value);
		//Self.length = length = value.length;
		if (length < 500) {
			if (Self.countUrl) {
				UI.each(url,function(o){ //Dont's Match Small Url And Big Url
					value = value.replace(o,'_');
					urlNum++;
					len = o.length;
					if (len > 256) { //o.length > 20 && 
						urlExceed += len - 256;
					}
				});
			}
			Self.length = length = Math.ceil((MI.string.length(UI.trim(value).replace(new RegExp(Self.txtTopic,'g'),'')) + urlNum * 20 + urlExceed) / 2);
			//Self.length = length = Math.ceil(UI.trim(value).replace(new RegExp(Self.txtTopic,'g'),'').length + urlNum * 20 + urlExceed);
		}
		if (!length && Self._tip.innerHTML.hasString(Self.txtTip.empty)) {
			return;
		}
		if (length > this.txtMax) {
			talkTip = '超出<em class="error">';
			Self._btn.disable = 1;
			//UI.addClass(Self._btn,'disabled');
		}
		else {
			talkTip = '还能输入<em>';
			Self._btn.disable = 0;
			//UI.removeClass(Self._btn,'disabled');
		}
		if (length == 0) {
			Self._btn.disable = 1;
			//UI.addClass(Self._btn,'disabled');
		}
		Self.showTip(talkTip + Math.abs(Self.txtMax - length) + '</em>字');
		if (Self._msgTo && (Self._msgTo.value == '' || Self._msgTo.error)) {
			Self._btn.disable = 1;
			//UI.addClass(Self._btn,'disabled');
		}
		if (length <= Self.txtMax && Self.type == 1) {
			Self._btn.disable = 0;
			//UI.removeClass(Self._btn,'disabled');
		}
		if (Self.autoHeight) {
				/**/
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
	hide : function(){ //Hide TalkBox
		UI.remove(this._body);
		if (this.hideCall) {
			this.hideCall();
		}
	},
	hideCall : null, //Callback After Hide
	success : null, //Callback After Send Success
	send : function(){
		var Self = this,
			data,
			addCheck = 1,
			content = UI.trim( Self._txt.value.replace(new RegExp(Self.txtTopic,'g'),'') ),
			Time,Time_1,Time_2,Time_3;

		//if (UI.hasClass(Self._btn,'disabled')) {
		if (UI.hasClass(Self._btn,'disabled')) {
			return;
		}
		if (Self._btn.disable || UI.hasClass(Self._btn,'disabled')) {
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
		UI.addClass(Self._btn,'disabled');

		//Go To User's Page
		if (!Self.type && !Self.pic && !Self.topic && content.match(/^@[a-zA-Z]{1}[\w|-]{0,19}$/g)) {
			document.location.href = '/' + content.slice(1) + '?from=1';
			return;
		}

		//Show Sending Tip
		Self.delay.tip = setTimeout(function(){
			Self.showTip(Self.txtTipSend,2);
		},500);

		//Post Data
		data = {content:content.replace(/＠/g,'@').replace(/＃/g,'#'),pic:Self.pic,countType:Self.countType,viewModel:Self.iconPic};
		if (Self.code) {
			data.veriCode = Self.code;
		}
		if (Self.type) {
			data.pId = Self.talkId;
			data.type = Self.type;
		}
		if (Self._msgTo) {
			data.account = Self._msgTo.value.replace(/^@/,'');
		}
		if (Self.topic) {
			data.content = (data.content.match(new RegExp(MI.string.escapeReg(Self.topic))) ? '' : Self.topic) +  data.content;
		}
		if (Self.music && Self.music.id){
			data.musicID = Self.music.id;
			data.musicSong = Self.music.song;
			data.musicSinger = Self.music.singer;
			data.musicLocation = Self.music.songurl;
			data.musicShortUrl = Self.music.shorturl;
			if(Self.music.songtype)	data.musicSource = Self.music.songtype;
		}
		if (Self.video) {
			data.video = Self.video;
		}
		if (Self.addCheck && !data.content.hasString(Self.addCheck)) { //If Check False,Don't Add NewTalk To List
			addCheck = 0;
		}
		if (Self.source) {
			data.source = Self.source;
		}
		if (Self.start) {
			Self.start();
		}
		Time = + new Date();
		UI.ajax({
			url : Self.url,
			data : data,
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
				if (MI.user && data.info && UI.isObject(data.info)) {
					var talk = data.info.talk[0],user = MI.user;
					talk.pic = user.pic;
					talk.nick = talk.nick || user.name;
					talk.name = talk.name || user.account;
					talk.flag = (talk.flag && UI.isArray(talk.flag) ? user.flag : talk.flag);
					data.info.iconPic = Self.iconPic;
					data.info.guest = 0;
					data.info.fav = 0;
				}

				//Self._txt.blur();

				//Show Tips
				if (data.result == -100) { //Verify code
					MI.code.show({msg:data.msg,code:data.info,call:function(code){
						Self.code = code;
						Self.send();
					}});
					UI.removeClass(Self._btn,'disabled');
					Self._btn.disable = 0;
					setTimeout(function(){
						Self.countTxt();
					},500);
				}
				else {
					clearTimeout(Self.delay.tip);
					Self.showTip(data.msg || '',data.result < 0 ? 1 : 0);
					Self.flashTip();
					if (data.result == 0 && Self._tipBig) {
						$$(Self._tipBig,'.msg')[0].innerHTML = data.msg;
						if (Self.type != 4) { //除了主Timeline点评外
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
							UI.removeClass(Self._btn,'disabled');
							if (data.result == 0) {
								Self.delPic();
								Self.delVideo();
								Self.delMusic();
								Self.code = null;
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
					Self.successStart();
				}
				if (Self.failStart && data.result != 0) {
					Self.failStart(data);
				}

				//Add New Talk To List
				if (MI.talkList && Self.addList && data.result == 0 && addCheck) {
					/*idata.info.source = {};
					f (Self.type && Self.type != 4) { //From Reply And Relay
						data.info.action = Self.action;
						data.info.source = Self.source;
					}*/
					if (MI.talkList._tip) { //Hide Talk List's Tip
						UI.hide(MI.talkList._tip);
					}

					MI.talkList.add.push(data.info.talk[0].id);

					var newTalk = UI.html(new UI.tmplString(Self.tmpl)(data.info))[0];
					MI.talkList.addEvent(newTalk);
					UI.addClass(newTalk,'newMsg'); //Add Delete CSS
					//UI.C(newTalk,'opacity',0);
					UI.prepend(newTalk,MI.talkList._body);
					MI.talkList.card();
					MI.talkList.buildTips();
					MI.talkList._news.push(newTalk);
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
							MI.talkList.bottom();
							MI.Crs(1);
						},0.3);
					},0);
				}

				//Save Draft
				var draft = 'draft_' + MI.user.account;
				if (Self.autoSave && MI.isS) {
					MI.S(draft,'');
				}

				//Count Talk Number
				if (data.result == 0) {
					if (Self.type != 4 && Self.type != 5) {
						Self.countNum(1);
					}

					if (MI['talkList']) {
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
			UI.removeClass(Self._btn,'disabled');
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
		UI.show(Self._picLoading);
		UI.addClass(Self._picLoading,'loading');
		UI.hide(Self._picForm);
		UI.hide(Self._picTxt);
		UI.hide(Self._picIco);
		UI.hide(Self._picCapture);
	},
	addPic : function(o){
		var Self = this,
			Time,Time_1,Time_2,Time_3;
		Time = Self.PicUpTime;
		Time_1 = + new Date();
		UI.hide(this._picLoading);
		UI.hide(this._picTxt);
		UI.hide(this._picForm);
		UI.show(this._picIco);
		if (o.result == 0) {
			UI.removeClass(this._pic,'hover');
			this.pic = o.info.image;
			if (MI.user.fun.turnPic && o.info.path) {
				MI.PicTurn.reset(this.pic,o.info.path);
			}
			var fileName = o.info.fileName || this._picBtn.value,
				fileType = fileName.substring(fileName.lastIndexOf('.') + 1,fileName.length);
			fileName = fileName.match(/[^\/|\\]*$/)[0].replace(fileType,'');
			fileName = MI.string.cut(fileName,10) + fileType;
			if (MI.user.fun.turnPic && o.info.path) {
				this._picLink.innerHTML = '<a href="#" class="fileName" onclick="return false">' + fileName + '</a>';
				$$(this._picLink, '.fileName')[0].onmouseover = function() {
					MI.PicTurn.show();
				}
				$$(this._picLink, '.fileName')[0].onmouseout = function() {
					MI.PicTurn.hideT();
				}
			}
			else {
				this._picLink.innerHTML = '<a href="#" class="fileName" onclick="return false">' + fileName + '<img src="' + o.info.image + '/160" /></a>';
			}
			UI.show(this._picPreview);
			if (this._txt.value == '') {
				this._txt.value = this.txtPic;
				this.countTxt();
			}
			this.focus();
		}
		else {
			UI.show(this._picTxt);
			UI.show(this._picForm);
			alert(o.msg);
		}
		this._picForm.reset();

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
	delPic : function(){
		if (this._pic) {
			this.pic = '';
			this._picForm.reset();
			UI.hide(this._picPreview);
			UI.hide(this._picLoading);
			UI.show(this._picIco);
			UI.show(this._picTxt);
			UI.show(this._picForm);
			if (this._txt.value == this.txtPic) {
				this._txt.value = '';
			}
			if (MI.Capture && MI.Capture.uploader){
				MI.Capture.uploader.StopUpload();
			}
		}
	},
	delVideo : function(){
		if (this._video) {
			this.video = '';
			UI.remove(this._videoPreview);
			UI.show(this._videoAnchor);
			if (this._txt.value == this.txtVideo) {
				this._txt.value = '';
			}
		}
	},
	delMusic : function(){
		if (this._music) {
			this.music = '';
			UI.remove(this._musicPreview);
			UI.hide(this._musicBox);
			UI.show(this._musicAnchor);
			if (this._txt.value == this.txtMusic) {
				this._txt.value = '';
			}
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
			UI.get(
				'/asyn/validvideo.php',
				"url=" + encodeURIComponent(value)+'&r='+MI.random(),
				function(data){
					Self._videoBtn.disabled = false;
					data = MI.json(data);
					Self.ayncVideoResult = data.result;
					if (data.result == 0){
						UI.hide(Self._videoError);
						if(data.url){
							//Self.video = Self._videoTxt.value;//'http://url.cn/'+data.url;
							clearTimeout(Self.delayVideoTime);
							var title = data.title.replace(/\&lt;/g,'<').replace(/\&gt;/g,'>').replace(/\&quot;/g,'"');
							var v = '#分享视频#' + title + '：http://url.cn/'+data.url+' ';
							Self.video = data.url;
							Self.txtVideo = v;
							Self._txt.value += v;
							Self._videoTxt.value = '';
							Self.countTxt();
							Self.focus();

							//var preview = '<span class="preview"><span class="link"><a class="fileName" href="#">%title%<img src="%pic%"/></a></span><a class="del" href="#" title="删除">[删除]</a></span>';
							var preview = '<span class="preview"><span class="link"><a class="fileName" href="#">%title%<span class="vThumbs"><span class="mask"><em></em></span><img src="%pic%" /></span></a></span><a class="del" href="#" title="删除">[删除]</a></span>';
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
			)
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

MI.PicTurn = {
	pos: 0,
	path: '',
	cache: [],
	build: function(tb) {
		var Self = this;
		Self.talkBox = tb;
		Self._body = UI.html('<div '+(UI.B.ie6?'':'class="big"')+' style="display:none;margin:3px 0 8px;padding:4px;border:1px solid #e5e5e5;background:#f9f9f9;position:absolute;z-index:20;top:15px;left:0px;"><div class="tools" style="width:130px"><a class="btnBack" href="#" style=""><em'+(UI.B.ie6?' style="width:17px;background:url(\'http://mat1.gtimg.com/www/mb/images/b2_100907.png\') no-repeat scroll -162px -233px transparent;"':'')+'></em>向左转</a><span>|</span><a class="btnPrev" href="#"><em'+(UI.B.ie6?' style="width:17px;background:url(\'http://mat1.gtimg.com/www/mb/images/b2_100907.png\') no-repeat scroll -179px -233px transparent;"':'')+'></em>向右转</a></div><div class="loading" style="width:112px;line-height:1.231;height:19px;_height:21px;display:none;">处理中...</div><div class="imgct" style="clear:both;text-align:center;"></div><form method="POST" target="imageRotate" action="/asyn/rotatepic.php"><input type="hidden" id="irRetType" name="retType" value="0" /><input type="hidden" id="irPath" name="path" /><input type="hidden" id="irDegrees" name="degrees" /></form><iframe id="imageRotate" name="imageRotate" src="about:blank" style="display:none"></iframe></div>')[0];
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
		
		UI.A(Self._form, 'action', MI.UploadServer.get()+'/asyn/rotatepic.php');
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
		this._imgCt.innerHTML = '<img src="' + src + '/160" />';
	},
	show: function() {
		UI.show(this._body);
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

MI.UploadServer = {
	selected: undefined,
	all: [1,2,3,4,5],
	random: function() {
		var Self = this;
		if (!Self.all.length) Self.selected = undefined;
		else Self.selected = UI.random(0, Self.all.length-1);
	},
	get: function() {
		/*
		var Self = this;
		if (Self.selected === undefined) Self.random();
		if (Self.selected !== undefined) return 'http://upload'+Self.all[Self.selected]+'.t.qq.com';
		*/
		return 'http://upload.t.qq.com';
	},
	error: function() {
		var Self = this;
		Self.all.splice(Self.selected, 1);
		Self.random();
	}
}

MI.TalkList = function(id){ //Talk List
	var Self = this,_more = $('moreList');
	Self._body = UI.isString(id) ? $(id) : id;
	Self._more = Self._bottom = _more ? $$(_more,'a')[0] : UI.DC('a');
	Self._new = $('talkNew'); //New Talk Button
	Self._list = UI.children(Self._body);
	var html = new UI.tmplString(MI.tmpl.reply)({});
	Self._talk = Self._relay = UI.html(html)[0]; //Talk Box
	//Self._relay = UI.html(html.replace(/<\/textarea>/g,'').replace(/textarea/g,'input'))[0];
	Self._relayList = UI.html('<div class="relayList"><div class="top"><span class="left"><a href="#" class="vClose"><em></em>收起</a></span><a class="w_close" href="#" title="点击关闭"><b class="close"></b></a></div><div class="loading">正在加载...</div><div class="cont"></div></div>')[0];
	Self._relayListLoad = $$(Self._relayList,'.loading')[0];
	Self._relayListCont = $$(Self._relayList,'.cont')[0];
	Self._relay = UI.html(html)[0];
	Self._comt = UI.html(MI.tmpl.reply.replace('<div class="left"></div>','<div class="left"><label for="replayListCheckbox"><input id="replayListCheckbox" type="checkbox" class="check1">同时转播</label></div>'))[0];

	//Delete Confirm
	Self._confirm = UI.html('<div class="delChose"><span></span><br><input value="确定" type="button">&nbsp;&nbsp;<input value="取消" type="button"></div>')[0];
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
		MI.talkList.remove(this.parentNode.tid,this.parentNode.type);
	}
	button[1].onclick = function(){
		UI.removeClass(this.parentNode.parentNode.parentNode,'hover');
		UI.remove(Self._confirm);
	}

	Self.replyBox = new MI.TalkBox(Self._talk);
	Self.relayBox = new MI.TalkBox(Self._relay);
	Self.comtBox = new MI.TalkBox(Self._comt);

	//Count TalkBox's Type For Product
	//Self.replyBox.countType = 3;
	//Self.relayBox.countType = 4;

	Self.replyBox.autoHeight = 136;
	Self.relayBox.autoHeight = 30;
	Self.comtBox.autoHeight = 136;
	Self.replyBox.txtTipSend = '发送中';
	Self.relayBox.txtTipSend = '转播中';
	Self.comtBox.txtTipSend = '点评中';
	Self.replyBox._btn.title = '发送';
	Self.relayBox._btn.title = '转播';
	Self.comtBox._btn.title = '点评';
	Self.replyBox.hideCall = Self.relayBox.hideCall = Self.comtBox.hideCall = function(){
		UI.removeClass($(Self.cur),'cur');
	};
	Self.replyBox.start = Self.relayBox.start = Self.comtBox.start = function(){
		Self.updateRelayNum();
		Self.talkBox._txt.blur();
		Self.focus();
	}
	Self.replyBox.success = Self.relayBox.success = Self.comtBox.success = function(){
		Self.talkBox.hide();
		Self.talkBox.display = 0;
		UI.removeClass($(Self.cur),'hover');
		if (Self._relayNum) {
			MI.countNum(Self._relayNum,1);
			Self._relayNum.innerHTML = Self._relayNum.innerHTML;
			UI.addClass(Self._relayNum.parentNode,'zfNumShow');
			Self._relayNum = null;
		}
	};
	Self.relayBox._numSon = $$(Self.relayBox._body,'.number')[0];
	Self.comtBox.url = '/publish.php';
	Self.comtBox._numSon = $$(Self.comtBox._body,'.number')[0];
	Self.comtBox._relayCheck = $$(Self.comtBox._body,'.check1')[0];
	Self.comtBox.addListCheck = 0;
	Self.comtBox._relayCheck.onclick = function(){
		var checked = this.checked;
		//Self.comtBox.url = checked ? '/publish.php' : '/comment/publish.php';
		Self.comtBox.type = checked ? 1 : 5;
		Self.comtBox.talkId = checked ? Self.cur : Self.curSource;
		Self.comtBox._tip.innerHTML = '';
		Self.comtBox.countTxt();
		if (!Self.comtBox.addList || Self.comtBox.addListCheck){
			Self.comtBox.addList = checked ? Self.relayBox.addList : 0;
			Self.comtBox.addListCheck = 1;
		}
		//Self.comtBox.addList = Self.replyBox.addList; //点评也出现在主Timeline
		//MI.Bos('btnRelayistCheckbox');
	}

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

	//Cache Last
	Self.cacheLast();
	//Cache First
	Self.cacheFirst();

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
			var y = UI.scrollY() + UI.windowHeight();
			UI.each(Self._news,function(o){
				if (UI.hasClass(o,'newMsg') && UI.getY(o) + UI.height(o) + 70 < y) {
					UI.removeClass(o,'newMsg');
				}
			});
		}
	}
	$$(Self._relayList,'.w_close')[0].onclick = function(){
		var T = this;
		if (UI.B.ie) { //Kill ":hover" Bug In IE
			UI.C(T,'left','9999px');
		}
		setTimeout(function(){
			Self.relayListHide();
			UI.C(T,'left','');
		},0);
		MI.Bos('btnRelayListClose');
		return false;
	}
	var _relayListCont = Self._relayListCont;
	$$(Self._relayList,'.left a')[0].onclick = function(){
		Self.relayListHide();
		MI.Bos('btnRelayListUp');
		return false;
	}
	_relayListCont.ondblclick = function(){ //Auto Go Next Page When Double Click
		var hasNext = 0;
		UI.each($$(Self._relayListCont,'.pages a'),function(o){
			if (o.innerHTML.hasString('下一页')) {
				hasNext = o;
			}
		});
		if (hasNext) {
			hasNext.onclick();
		}
		else {
			Self.relayListPosition();
			Self.relayListHide();
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
	setTimeout(function(){ //页面渲染玩再执行
		Self.bottom();
		for (var i = 0,num = Self._list.length;i < num;i++) {
			Self.addEvent(Self._list[i]);
		}
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
}
MI.TalkList.prototype = {
	cur : null, //Current List
	curSource : null, //Current List's Sourse Message
	_tip : null, //List Tip
	_news : [], //New Talks
	auto : 0, //Auto Load Ajax Data When Browser's Back
	iconPic : 0, //Use Simple View Model
	moreTimes : 0, //More Times
	newlyUrl : '/asyn/home.php',
	refresh : 0, //Refresh Home Page Always
	removeUrl : '/delete.php',
	favorUrl : '/asyn/favoritemsg.php',
	removeTip : '确定删除这条广播？',
	removeCall : 0, //Call Function After Remove
	unfavTip : '确定删除这条收藏？',
	xhr : {}, //Cache XHR
	last : {}, //Cache Last List's Info
	first : { //Cache First List's Info
		time : 1
	},
	add : [], //Cache Added List
	time : [],
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
					MI.Card.build(Self._body,'.userPic img');
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
						target : '.url,.ico_video',
						txt : Self.urlTips,
						click : function(){
							MI.Bos('btnClickUrl');
						},
						width : 220
					});
				},100);
			}
		});
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
			data = {id:id,r:MI.random()},
			favBtn;
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
		if (!talk.sending) {
			//UI.get(url,data,function(data){
			UI.ajax({
				url : url,
				data : data,
				success : function(data){
					talk.sending = 0;
					data = MI.json(data);
					if (data.result == 0) {
						favBtn = $$(talk,'.fav')[0];
						if (type == 1) {
							UI.addClass(favBtn,'light');
							favBtn.title = "取消收藏";
							favBtn.type = 3;
							//favBtn.blur();
						}
						else {
							UI.remove(Self._confirm);
							if (MI.talkBox && !type && data.info != 7) {
								MI.talkBox.countNum(-1);
							}
							if (type == 3) {
								UI.removeClass(favBtn,'light');
								favBtn.title = "收藏";
								favBtn.type = 1;
								//favBtn.blur();
							}
							else {
								UI.addClass(talk,'delMsg'); //Add Delete CSS
								setTimeout(function(){
									UI.animate(talk,'opacity',0,function(){
										UI.remove(talk);
										if (Self.tip && !UI.children(Self._body).length) { //提示显示隐藏有问题
											//UI.append(Self.tip,Self._body);
										}
										//Check More's Position
										Self.bottom();
									});
								},300);
							}
						}
						if (Self.removeCall) {
							Self.removeCall();
						}
					}
					else if (data.result == -100) {
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
			tip = type ? Self.unfavTip : Self.removeTip;
		UI.append(Self._confirm,msg);
		Self.relayListHide();
		setTimeout(function(){
			$$(Self._confirm,'input')[0].focus();
		},0);
		Self._confirm.tid = talk.id;
		Self._confirm.type = type;
		Self._confirmTip.innerHTML = tip;

		if (Self.talkBox && Self.talkBox.display && Self.cur == talk.id) { //Hide TalkBox When Click Delete Button
			UI.remove(Self.talkBox._body);
			UI.removeClass(talk,'cur');
			Self.talkBox.display = 0;
		}
	},
	replyCont : '', //对话、转播、点评时输入框的默认值
	reply : function(id,type,number){ //type : 0(reply) 1(relay) 2(comt)
		var Self = this;
		if (MI.card) {
			UI.remove(MI.card._body);
		}

		//Relay List
		Self.relayListHide();

		if (Self.talkBox) {
			Self.talkBox.hide();
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
		UI.C(Self.talkBox._txt,'height','');
		UI.removeClass(Self.talkBox._btn,'disabled');
		UI.removeClass(Self._talk,'pubSuc');
		if (!Self.talkBox.display) {
			var li = $(id),
				sourceId = id,
				cur = Self.cur,
				viewRelay = $$(li,'.zfNum')[0],
				name = $$(li,'.userName strong a')[0].innerHTML,
				name2,
				account,
				vip = $$(li,'.userName .vip').length,
				expo = $$(li,'.userName .ico_expo').length,
				url = $$(li,'.userName a')[0].href,
				cont = $$(li,'.msgCnt')[0],
				contClone = cont.cloneNode(1),
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
					var face = o.title;
					if (face) {
						UI.after(UI.html('<b>/' + face + '</b>')[0],o);
					}
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

			this._relayNum = type ? $$(li,'.relayNum')[0] : null;

			var className,curTitle,
				//relayTitle = '转播 <b>' + name + '</b>: "' + MI.string.html(MI.string.cut(content,20)) + '"',
				relayTitle = '转播原文，转播内容会发送给你的听众',
				replyTitle = '对话是半公开的，不会出现在你听众的主页上，但是可以到你的页面看到<br>对 <b>' + name + '</b> 说:',
				//comtTitle = relayTitle.replace('转播','点评'),
				comtTitle = '点评原文，点评内容不会发送给你的听众',
				delayAddReply;
			relayTitle += '<br>顺便说两句:';
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
			}
			else {
				className = type ? 'zfWrap' : 'talkWrap';
			}
			this.talkBox._body.className = className;

			account = url.split('/');
			account = account[account.length - 1];
			if (replyBox && name2 && type == 1) { //添加转播点评
				this.talkBox._addReply.innerHTML = '<a href="#" title="你可以通过“删除之前的转播理由”来去掉前面人的转播理由">［删除之前的转播理由］</a>';
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
			Self.talkBox.talkId = id;
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
			UI.append(this._talk,$$(li,'.msgBox')[0]);
			setTimeout(function(){
				talkBoxTxt.focus();
				if (Self.replyCont){
					talkBoxTxt.value += Self.replyCont;
				}
				if (addReplyTxt) { //自动添加转播点评
					talkBoxTxt.value += addReplyTxt;
				}
				Self.talkBox.countTxt();
				MI.selectTxt(talkBoxTxt,0,0,0);
			},0);

			//Relay And Comt's Number
			if (type != 0) {
				var numberType = type == 1 ? '转播' : '点评',
					bossName = type == 1 ? 'Relay' : 'Comt',
					link = type == 1 ? '?t=1' : '?t=2';
				Self.talkBox._numSon.innerHTML = '<a href="/p/t/' + sourceId + '/' + link + '" onclick="MI.Bos(\'btn' + bossName + 'View\')" target="_blank">' + 
					((number != 0 && number) ? '查看所有 ' + number + ' 条' + numberType : '') + '</a>';
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
			UI.addClass($(this.cur),'hover');
		}

		Self.setArrow($$(this.talkBox._body,'.SA')[0]);
	},
	replyHide : function(){
		UI.removeClass($(this.cur),'cur');
		UI.removeClass($(this.cur),'hover');
		if (this.talkBox) {
			this.talkBox.display = 0;
		}
	},
	relayListHide : function(){
		if (this._relayList.display) {
			UI.remove(this._relayList);
			this._relayList.display = 0;
			UI.removeClass($(this.cur),'cur');
			UI.removeClass($(this.cur),'hover');
			this.focus();
		}
	},
	getRelayOld : function(relayBox,o,content){
		var cont = $$(o,content)[0],
			contClone,
			relayCiteUrl = $$(o,'strong a')[0].href.split('/'),
			relayCiteAccount = relayCiteUrl[relayCiteUrl.length - 1],
			noRelayOld;
		if(cont){
			if ($$(o,'.time').length == 1) {
				noRelayOld = 1;
			}
		}
		contClone = cont.cloneNode(1);
		if (!noRelayOld) {
			UI.each($$(contClone,'em'),function(o){
				var account = UI.A(o,'rel');
				if (account) {
					o.innerHTML = account;
				}
			});
			UI.each($$(contClone,'img'),function(o){
				var face = o.title;
				if (face) {
					UI.after(UI.html('<b>/' + face + '</b>')[0],o);
				}
			});
			relayBox._txt.value = ' || @' + relayCiteAccount +': ' + UI.text(contClone);
		}
		relayBox._txt.focus();
		MI.selectTxt(relayBox._txt,0,0,0);
		relayBox.countTxt();
	},
	updateRelayNum : function(){
		var el = $(this.cur),
			type = this.talkBox.type,
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
			UI.A(button,'num',1 + parseInt(UI.A(button,'num')));
		}
	},
	report : function(id){
		if (MI.user.fun.fastReport == 1){
			UI.ajax({
				url : '/asyn/reportSpam.php',
				data : {id:id,type:1},
				success : function(data){
					data = MI.json(data);
					if (data.result == 0){
						MI.tip('举报成功！');
					}
				}
			});
		}
		else {
			var name = UI.A($$($(id),'.userName')[0],'rel');
			jubao_msg(id,name);
		}
	},
	setArrow : function(el){
		el.style.cssText = 'left:' + (this.setArrow.x + 3) + 'px';
	},
	setArrowX : function(el,time){
		time = time.length == 2 ? time[1] : time[0];
		this.setArrow.x = UI.getX(el) - UI.getX(time) - UI.width(el) / 2;
	},
	addEvent : function(el){
		var Self = this,
			time = $$(el,'.time'),
			from = $$(el,'.f'),
			view = $$(el,'.view')[0],
			fav = $$(el,'.fav')[0],
			unfav = $$(el,'.light.fav')[0],
			report = $$(el,'.alarm')[0],
			viewContent = $$(el,'.talkDetail')[0],
			_viewRelay = $$(el,'.zfNum'),
			viewRelay = _viewRelay[_viewRelay.length - 1],
			content = $$(el,'.msgCnt')[0],
			comt = $$(el,'.comt')[0],
			reply = $$(el,'.reply')[0],
			relay = $$(el,'.relay')[0],
			del = $$(el,'.delBtn')[0],
			//moreFun = $$(el,'.moreFun')[0],
			replyMsg = $$(el,'.replyMsg')[0],
			picBox = $$(el,'.picBox'),
			videoBox = $$(el,'.videoBox'),
			musicBox = $$(el,'.musicBox');
		if (!UI.B.ipad && el.nodeName == 'LI') {
			MI.addHover(el);
		}
		if (from) { // 来自XXX
			UI.each(from,function(o){
				o.onclick = function(){
					try{
						var time = $$(this.parentNode,'.time')[0],id = UI.A(time,'from'),url = UI.A(this,'href'),source = encodeURI(this.innerHTML.replace('来自','')),user = MI.user.account;
						MI.Bos('http://r.t.qq.com/cgi-bin/v?L=1&F=1&sourceid=' + id + '&source=' + sourcek + '&url=' + url + '&name=' + user);
					}catch(e){}
				}
			});
		}
		if (comt) { // 点评
			comt.onclick = function(){
				Self.curSource = this.href.match(/[^\/]+$/g)[0];
				Self.setArrowX(this,time);
				Self.comtBox._relayCheck.checked = false;
				Self.comtBox._relayCheck.onclick();
				Self.reply(el.id,2,UI.A(this,'num'));
				Self.replyCont = UI.A(this,'cont');
				MI.Bos('btnComt');
				return false;
			}
		}
		if (reply) { // 对话
			reply.onclick = function(){
				Self.setArrowX(this,time);
				Self.reply(el.id,0);
				Self.replyCont = UI.A(this,'cont');
				MI.Bos('btnReply');
				return false;
			}
		}
		if (relay) { // 转播
			relay.onclick = function(){
				Self.setArrowX(this,time);
				Self.reply(el.id,1,UI.A(this,'num'));
				Self.replyCont = UI.A(this,'cont');
				MI.Bos('btnRelay');
				return false;
			}
		}
		if (view) { // 查看对话
			view.onmouseover = view.ontouchstart = function(){
				UI.C(viewContent,'display','block');
				MI.Bos('btnViewReply');
			}
			view.onmouseout = view.ontouchend = function(){
				UI.hide(viewContent);
			}
			view.style.cursor = 'pointer';
			UI.A(view,'target','_blank');
			/*view.onclick = function(){
				return false;
			}*/
		}
		if (viewRelay && !viewRelay.innerHTML.hasString('对话')) { // 查看转播
			var relayList = Self._relayList,
				relayListNum, //Cache View Relay List's Button
				relayTip,
				relayBox,
				delay,
				pageLinkClick = function(){
					UI.get(this.href,'&r=' + MI.random(),function(data){
						pageLink(data);
					});
					Self.relayListPosition();
					return false;
				},
				pageLink = function(data){
					UI.hide(Self._relayListLoad);
					Self._relayListCont.innerHTML = data;
					UI.show(Self._relayListCont);

					//Eval Javascript
					UI.evalScript(data);

					//Tips
					//if (UI.B.ipad || MI.S('tips_relayList_' + MI.user.account) == -1) {
						UI.hide($$(Self._relayListCont,'.nfunTips')[0]);
					//}

					//Page Control
					var pages = $$(Self._relayListCont,'.pages a');
					UI.each(pages,function(o){
						if (!UI.A(o,'target')) {
							o.onclick = pageLinkClick;
						}
					});
					//if (!pages.length) {
						var li = $$(Self._relayListCont,'li');
						if (li.length) {
							UI.addClass(li[li.length - 1],'nobor');
							UI.each(li,function(o){
								o.onmouseover = function(){
									UI.addClass(this,'subHover');
								}
								o.onmouseout = function(){
									UI.removeClass(this,'subHover');
								}
								try{
									var _relayCite = $$(o,'.relayCite')[0],
										_report = $$(o,'.alarm')[0];
									if (_relayCite) {
										_relayCite.onclick = function(){
											Self.getRelayOld(relayBox,o,'.content');

											//Auto Select CheckBox Of Relay
											relayBox._relayCheck.checked = true;
											relayBox._relayCheck.onclick();
											return false;
										}
									}
									if (_report){
										_report.onclick = function(){
											Self.report(o.id);
											return false;
										}
									}
								}catch(e){}
							});
						}
					//}
					
					//Relay Number
					var relayNum = $$(relayList,'.num')[0],relayNumValue,relayListNumValue = $$(relayListNum,'.relayNum')[0];
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
						relayListNumValue.innerHTML = relayNumValue;
					}

					//Relay Box
					var relayBoxTip = $$(Self._relayListCont,'.relayThumb')[0];
					if (relayBoxTip) {
						relayBoxTip.onclick = createRelayBox;
						relayBoxTip.onclick();
					}

					//Disabled dblclick select
					Self._relayListCont.onclick = function(){
						MI.DisableDblClickSelect(this);
					}

					//Build Tips
					Self.buildTips(relayList);
					
					//Show Face
					MI.Crs(1);

					MI.PV('relay');
				},
				createRelayBox = function(){
					UI.hide(this);
					var relay,isRelay = 1;//MI.S('option_relayListCheck_' + MI.user.account) != -1
					if (!this.appended) {
						relay = UI.html(MI.tmpl.reply.replace('talkWrap','zfWrap').replace('<div class="left"></div>','<div class="left" style="display:none"><label for="replayListCheckbox"><input id="replayListCheckbox" type="checkbox"' + (isRelay ? ' checked' : '') + ' class="check1">同时转播给你的听众</label></div>').replace('talkSuc',''))[0];
						relayTip = $$(Self._relayListCont,'.relayThumb')[0];
						relayBox = new MI.TalkBox(relay);
						relayBox.countTxt();
						relayBox.txtTipSend = '转播中';
						relayBox.addList = Self.relayBox.addList;
						relayBox.talkId = UI.A(viewRelay,'rel');
						relayBox.type = 1;
						relayBox.iconPic = Self.iconPic;
						relayBox.autoHeight = 30;
						relayBox._relayCheck = $$(relayBox._body,'.check1')[0];
						relayBox.successStart = function(){
							Self.updateRelayNum();
							var refresh = $$(Self._relayListCont,'.refreshBth')[0];
							if (refresh) {
								refresh.onclick();
							}
							MI.tip('转播成功！');
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
						relayBox._body.ondblclick = function(e){
							UI.E(e).stop();
						}
						if (!UI.B.ie) {
							relayBox._body.onmousedown = function(e){
								UI.E(e).stop();
							}
						}
						setTimeout(function(){
							Self.getRelayOld(relayBox,el,'.msgBox .msgCnt');
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
						Self.talkBox = relayBox;
					}
					else {
						UI.show(this.nextSibling);
					}
				};
			viewRelay.onclick = function(e){
				if (Self.xhr.relay) {
					Self.xhr.relay.abort();
				}
				var href = this.href,
					id = href.match(/[^\/]+$/g)[0],
					li = id == el.id ? id : el.id,
					Y,
					windowHeight = UI.windowHeight(),
					scrollTop,
					Time,Time_1,Time_2,Time_3;
				UI.A(this,'rel',id);
				relayListNum = this;
				if (relayList.display && Self.cur == li) {
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
					$$(this,'.relayNum')[0].innerHTML;
					UI.hide(Self._relayListCont);
					UI.show(Self._relayListLoad);
					UI.append(relayList,$$(el,'.msgBox')[0]);
					Time = + new Date();
					Self.xhr.relay = UI.get('/message_relay_frame.php','id=' + id + '&viewModel=' + Self.iconPic + '&r=' + MI.random(),function(data){
						Time_1 = + new Date() - Time;
						pageLink(data);

						//Speed
						Time_2 = + new Date() - Time;
						setTimeout(function(){
							Time_3 = + new Date() - Time;
							MI.Speed('t_asyn_relay',0.1,Time_1,Time_2,Time_3);
						},0);
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
				Self.relayListPosition = function(){
					var Y = UI.getY(viewRelay);
					if (UI.scrollY() > Y) {
						window.scrollTo(0,Y);
					}
				}
				Self.focus();
				UI.E(e).stop();
				MI.Bos('btnViewRelay');
				return false;
			}
		}
		if (fav) { // 收藏
			fav.type = 1;
			fav.title = (UI.hasClass(fav,'light') ? '取消' : '') + '收藏';
			fav.onclick = function(){
				Self.fav(el.id,this.type);
				MI.Bos('btnFav');
				return false;
			}
			fav.onmouseover = MI.hideFocus;
		}
		if (unfav) { // 取消收藏
			unfav.onclick = function(){
				Self.confirm(el.id,2);
				MI.Bos('btnUnFav');
				//Self.fav(el.id,2);
				return false;
			}
			unfav.onmouseover = MI.hideFocus;
		}
		if (del) { // 删除
			del.onclick = function(){
				Self.confirm(el.id);
				MI.Bos('btnDel');
				return false;
			}
		}
		if (report) { // 举报
			report.onclick = function(){
				Self.report(el.id);
				MI.Bos('btnReport');
				return false;
			}
		}
		if (content && content.innerHTML == '') {
			//UI.hide(content);
			content.innerHTML = '&nbsp;';
		}
		/*if (moreFun) { //More Function
			moreFun.tid = 'moreFun' + el.id; //Tmp Id
			moreFun.onclick = function(e){
				UI.E(e).stop();
				for (var i in MI.drop) { //Hide Other Drop Menu
					if (i != this.tid) {
						UI.addClass(MI.drop[i],'off');
						delete MI.drop[i];
					}
				}
				UI.toggleClass(this,'off');
				if (!UI.hasClass(this,'off') && !MI.drop[this.tid]) {
					MI.drop[this.tid] = this;
				}
				return false;
			}
		}*/
		if (replyMsg) { // 回信
			replyMsg.onclick = function(){
				MI.talkBox._msgTo.value = UI.A(this,'rel');
				UI.removeClass(MI.talkBox._btn,'disabled');
				MI.talkBox._txt.value = '';
				MI.talkBox.countTxt();
				if (MI.dialog) {
					MI.dialog.show({width:560,html:$('talkBoxMsg')});
					//MI.talkBox._msgTo.focus();
					//UI.hide(MI.talkBox._msgTo.previousSibling);
					try{setTimeout('MI.talkBox._txt.focus()',0);}catch(e){};
				}
				MI.Bos('btnReplyMsg');
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
		//Add Time Title
		for (var i = 0,num = time.length;i < num;i++) {
			if (!UI.A(time[i],'rel')) {
				UI.A(time[i],'rel',UI.A(el,'rel'));
			}
			var timeObj = new Date();
			timeObj.setTime(UI.A(time[i],'rel') + '000');
			time[i].title = UI.formatDate(timeObj,'yyyy年M月d日 hh:mm');
			Self.time.push(time[i]);
			time[i].onclick = timeBos;
		}
		function timeBos(){
			if (this.nodeName == 'A') {
				MI.Bos('btnTime');
			}
		}
	},
	cacheLast : function(){ //Cache Last Id For More
		var children = UI.children(this._body),
			last = children[children.length - 1],
			fav;

		if (last) {
			fav = UI.A(last,'fav');
			this.last = {
				id : last.id,
				time : UI.A(last,'rel'),
				fav : fav ? fav : 0
			};
		}
	},
	cacheFirst : function(){ //Cache First List
		var _first = UI.children(this._body)[0];
		if (_first) {
			this.first = {
				time : UI.A(_first,'rel'),
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
				UI.C(this._body,'marginBottom',y < 0 ? - y + 'px' : '');
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
					PubTime = new Date(),
					gapTime = now - pubTime,
					minute = parseInt(gapTime / 60),
					hour = parseInt(gapTime / 3600),
					day = parseInt(gapTime / 86400),
					clock = o.title.split(' ')[1];
				Now.setTime(now + '000');
				PubTime.setTime(pubTime + '000');
				if (minute == 0) {
					info = '刚刚';
				}
				else if (minute < 60) {
					info = minute + '分钟前';
				}
				/*else if (minute > 59 && hour < 6) {
					info = hour + '小时' + minute % 60 + '分钟前';
				}*/
				//else if (hour > 5 && day == 0) {
				else if (minute > 59 && day == 0) {
					info = (Now.getDate() == PubTime.getDate() ? '今天' : '昨天') + ' ' + clock;
				}
				else if (day == 1 && Now.getDate() - PubTime.getDate() < 2) {
					info = '昨天 ' + clock;
				}
				else if (Now.getFullYear() == PubTime.getFullYear()) {
					info = o.title.split('年')[1];
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
			url = 'r=' + MI.random() + '&time=' + (Self.last.fav ? Self.last.fav : Self.last.time) + '&id=' + Self.last.id + (Self.guest ? '&u=' + Self.guest : ''),
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
		if (!Self._more.sending) {
			UI.addClass(Self._more,'loading');
			if (rel) {
				Time = + new Date();
				UI.get(rel,url,function(json){
					Time_1 = + new Date() - Time;
					Self.addMore(json);
				
					//Speed
					Time_2 = + new Date() - Time;
					setTimeout(function(){
						Time_3 = + new Date() - Time;
						MI.Speed('t_asyn_more',0.005,Time_1,Time_2,Time_3);
					},0);
				});
				MI.Bos(auto ? 'btnMoreAuto' : 'btnMore');
			}
		}
		Self._more.sending = 1;
	},
	newly : function(){
		var Self = this,_new = Self._new,data;
		if (!_new.sending) {
			if (_new.num > 15 || Self.refresh) {
				document.location.href = UI.isString(Self.refresh) ? Self.refresh : '/' + MI.user.account; //location.reload()在Firefox中会导致发图表单重新提交的问题
			}
			else {
				UI.addClass(_new,'loading');
				data = {time:Self.first.time,p:2,type:1,r:MI.random()};
				if (MI.newCount.data){
					for (var i in MI.newCount.data){
						data[i] = MI.newCount.data[i];
					}
				}
				UI.get(Self.newlyUrl,data,function(json){
					Self.addNewly(json);
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

			var list,cache = document.createDocumentFragment(),o = UI.html(new UI.tmplString(MI.tmpl.listAll)(data.info).replace(/<li id="/gi,ajax ? '<li class="newMsg" id="' : '<li id="')),length = data.info.talk.length;
			if (length) {
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
				Self._news = $$(Self._body,'.newMsg');
				Self.card();
				Self.buildTips();


				UI.each(Self.add,function(o){ //Remove Added List's NewMsg ClassName
					if ($(o)) {
						UI.removeClass($(o),'newMsg');
					}
				});
				Self.cacheFirst();
				Self.add = [];
				
				//New Count Setting
				if (MI.newCount.data){
					MI.newCount.data.id = Self.first.id; 
					MI.newCount.data.time = Self.first.time; 
				}

				if (Self._tip) { //Hide Talk List's Tip
					UI.hide(Self._tip);
				}
				Self.updateTime(data.info.time);

				MI.PV('new');
				MI.Crs(1);

				//For Ajax Back Forward
				if (ajax) {
					MI.ajax++;
					MI.talkNew.push(json);
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
		//data = {result : 0,msg : '',info : { hasNext : 1,talk : [{id : '123456',time : '5分钟前',content : '内容'},{id : '1234567',time : '5分钟前',content : '内容'}] }};
		//data = {result:0,msg:'成功','info':{'hasNext':1,'talk':[]}};
		if (data.result == 0) {
			if (!Self.guest && data.info.user != MI.user.account) { //Kill Change Account Bug
				document.location.reload();
				return;
			}

			data.info.guest = Self.guest;
			data.info.fav = Self.last.fav ? 1 : 0; //Fav List Tmpl
			data.info.iconPic = Self.iconPic;

			var cache = document.createDocumentFragment(),o = UI.html(new UI.tmplString(MI.tmpl.listAll)(data.info));
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
					MI.ajax++;
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
			Self.moreTimes++;
		}
		else if (data.msg){
			//MI.alert(data.msg);
		}
		UI.removeClass(Self._more,'loading');
		Self._more.sending = 0;
	},
	newlyWall : function(){
		var Self = this;
		UI.get('/asyn/wall.php','id=&r='+MI.random(),function(json){
			Self.addNewlyWall(json);
		});
	},
	addNewlyWall : function(json){
		var Self = this,ajax = UI.isString(json);
		data = ajax ? MI.json(json) : json;
		if (data.result == 0 && data.info.talk.length > 0) {
			data.info.guest = Self.guest;
			data.info.fav = 0;
			data.info.iconPic = Self.iconPic;
			var list = $$(Self._body,'li');
			var removeAll = 0;
			if(list.length > 0){
				for(var i=0,num=list.length;i<num;i++){
					if(removeAll){
						UI.remove(list[i]);
					}else{
						if (list[i].id == data.info.talk[0].id && i > 0) {
							UI.remove(list[i]);
							break;
						}else if(list[i].id == data.info.talk[0].id && i == 0){
							return;
						}
					}
				}
			}
			list = null;
			var newTalk = UI.html(new UI.tmplString(MI.tmpl.listAll)(data.info))[0];
			Self.addEvent(newTalk);
			UI.prepend(newTalk,Self._body);
			Self.updateTime(data.info.time);
			Self.buildTips();
			var height = UI.height(newTalk),scrollY = UI.scrollY(),scroll;
			UI.C(newTalk,'height',0);

			UI.animate(newTalk,'height',height-22,function(){
				UI.C(newTalk,'height','');
				MI.Crs(1);
			},0.3);
		}
		setTimeout(function(){
			list = $$(Self._body,'li');
			if(list.length > 5){
				for(var i=5,num=list.length;i<num;i++){
					UI.remove(list[i]);
				}
			}
		},2000);
	}
}
MI.TalkList.videoEvent = function(videoBox){
	var Self = this;
	for (var i = 0,num = videoBox.length;i < num;i++) {
		var videoBoxCur = videoBox[i],
		vWrap = $$(videoBoxCur,'.vWrap')[0],
		bThumbs = Number(vWrap.getAttribute('thumbs')),
		vThumbsBox = $$(videoBoxCur,'.vThumbsBox')[0],
		vSimple = $$(vThumbsBox,'.vSimple')[0],
		vThumbs = $$(vThumbsBox,'.vThumbs')[0],
		//video = vButton//bThumbs ? vThumbs : vSimple,
		vTools = $$(videoBoxCur,'.vTools')[0],
		vClose = $$(videoBoxCur,'.vClose')[0],
		mask = $$(vThumbsBox,'span')[1];
		//alert(mask.innerHTML)
		if(bThumbs){
			vThumbs.style.display = 'inline';
			vSimple.style.display = 'none';
		}else{
			vSimple.style.display = 'inline';
		}
		if(bThumbs){
			var thumbs = $$(vThumbs,'img')[0];
			thumbs.onload = function(){
				this.load = 1;
				mask.style.display = 'inline';
			}
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
		ico_music = $$(musicBoxCur.parentNode.parentNode,'.msgCnt .ico_music')[0];
//alert($$(musicBoxCur.parentNode.parentNode,'.msgCnt .ico_music')[0])
		/*mSimplePic.onload = function(){
			UI.show(mSimple);
		}
		mSimplePic.onerror = function(){
			mSimple.innerHTML = '播放音乐';
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
		MI.Bos('btnPicBigPreloadUse');
	}
	else {
		MI.Bos(isBig ? 'btnPicSmall' : 'btnPicBig');
	}
	return false;
}
MI.TalkList.picEvent = function(picBox){
	for (var i = 0,num = picBox.length;i < num;i++) {
		var picBoxCur = picBox[i],pic = $$(picBoxCur,'img')[0],
			link = pic.parentNode,
			hasPic = $$(picBoxCur,'.tools'),
			preview;
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
			UI.A(pic,'alt','[图片]');

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
		var Self = this,fUser=$$(el || $$('.comList')[0],className),fAccount=[];
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
			}
		});
		UI.get('/asyn/userRelation.php','r=' + MI.random() + '&u=' + fAccount.join(','),function(data){
			data = MI.json(data);
			if(data.result == 0){
				var btn,p;
				UI.each(fUser,function(o){
					var id = MI.string.id(o.href),s;
					if(!UI.hasClass(o,'cusPic')){
						s = type ? '<a class="foFun addAttention" href="#">+收听</a>' : '<input type="button" class="addAttention" value="立即收听" />'
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
		UI.each($$(el || document.body,'.addAttention'),function(o){
			var del = UI.html(type ? '<div class="foFun disabled" style="display:none">已收听</div>' : '<a href="#" class="delAttention" style="display:none">取消</a>')[0];
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
	},
	user : function(el){
		var userList = UI.parents(el,'userList')[0];
		return MI.string.id((userList ? $$(userList,'.userInfo a')[0]: el.parentNode.previousSibling).href);
	}
}

//Base App
MI.app({
	Base : function(){
		MI.navMenu();
		MI.listDrop(MI.user.floatList);
		MI.searchKey();
		MI.linkBoss();
		
		setTimeout(function(){
			//Go Top
			MI.GoTop.build();
		},1000);

		//Theme Setting
		MI.themeSet();
		
		//Badge
		MI.badge.build();

		//Create Dialog && Card && DialogTip
		MI.dialog = MI.dialog || new MI.Dialog();
		MI.dialog._bg.style.height = UI.pageHeight() + 'px';
		//MI.dialogTip = new MI.DialogTip();

		MI.code = new MI.Code();
		MI.tips = new MI.Tips();
		MI.card = new MI.Card();
	}
});

UI.ready(function(){
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

	//Auto Get More Talk List
	if (MI.talkList && MI.talkList._more) {
		var maxTimes = 2,moreDelay,getMore = function(){
			clearTimeout(moreDelay);
			setTimeout(more,200);
		};
		function more(){
			if (MI.talkList.moreTimes < maxTimes && UI.pageHeight() - UI.scrollY() - UI.windowHeight() < 60) {
				MI.talkList.more(1);
			}
			if (MI.talkList.moreTimes > maxTimes) {
				UI.ER(window,'scroll',getMore);
			}
		}
		UI.EA(window,'scroll',getMore);
	}

	if (MI.talkList && MI.talkList.auto) { //自动加载更多消息
		var account = MI.user.account,
			listStorageName = account + '_' + MI.talkList.first.id + '_' + MI.talkList.last.id,
			//listName = 'list_' + account,
			newList = 'new_' + listStorageName,
			moreList = 'more_' + listStorageName,
			scrollTop = 'scroll_' + listStorageName,
			listTime = MI.S('listTime');
		window.onbeforeunload = function(){
			var time = + new Date();
			if (!MI.isS || !listStorageName) {
				return;
			}
			location.hash = 'M';
			MI.S(scrollTop,UI.scrollY());
			if (MI.talkList && MI.ajax && MI.ajax < 10) {
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

			setTimeout(function(){ //Auto Focus
				if (!MI.talkBox._msgTo && location.hash != '#M' && UI.scrollY() < 250) {
						try{
							var length = MI.talkBox._txt.value.length;
							MI.talkBox._txt.focus();
							MI.selectTxt(MI.talkBox._txt,length,length,length);
						}catch(e){}
				}
			},500);
		}
	}

	//MI.user.fun 的默认值
	if (MI.user.fun) {
		var fun = {search:1};
		for (var i in fun) {
			if (UI.isUndefined(MI.user.fun[i])) {
				MI.user.fun[i] = fun[i];
			}
		}
	}

	//MI.Crs
	setTimeout(function(){
		var delayCrs = function (){
			MI.delay.crs = setTimeout(MI.Crs,200);
		};
		if (!MI.Crs.disabled) {
			MI.Crs(1);
			UI.EA(window,'scroll',delayCrs);
			UI.EA(window,'resize',delayCrs);
		}
	},1);
	
	//MI.College
	if (MI.user.college) {
		MI.app({
			College : function(){
				MI.College.build();
			}
		});
	}

	//App Load
	MI.appLoad();
});

if (window._MIRun){
	for (var i in _MIRun){
		_MIRun[i]();
	}
}
MIRun = function(o){
	o();
}
