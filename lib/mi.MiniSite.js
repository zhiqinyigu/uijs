/**
 * MI.MiniSite
 * Author : xhlv@tencent.com
 * Datetime : 
 * Last Eidt: 
*/
/*
	talkList:
		btnTime 广播时间链接点击
		btnMore 更多消息（点击）
		btnMoreAuto 更多消息（自动）
		btnMoreOpen 更多消息（新窗口）
		btnZfNum 查看转播/对话

	other:
		btnGoReg 立即开通微博
		btnGoLogin 登录微博
		btnGoNews 看看大家在说什么
		btnGoAt 提到我的
		btnGoHome 我的主页
		btnGoTalk 发表广播
		btnFindUser 找人
		btnStayTime 页面停留时间
		btnScroll 页面滚动行为
		btnHotTopic 热门话题
		btnHotUser 推荐用户

		btnTabsHome 我的主页
		btnTabsAtMe 提到我的
		btnTabsHotTopic 热点
		btnTabsMyTopic 订阅
		btnMoreTopic 订阅更多话题 登录用户
		btnMoreTopic2 订阅更多话题 未登录用户
		btnUserPage 推荐用户翻页
		btnAddAttention 收听
		btndelAttention 取消收听

*/
String.prototype.toTitle = function(){
	return this.replace(/\r/g, '')
		.replace(/\n/g, "")
		.replace(/\'/g, '&#39;')
		.replace(/\"/g, '&#34;')
		.replace(/</g,"&#60;")
		.replace(/>/g,"&#62;");
};
$ = UI.G;
$$ = UI.GC;
onerror = function(msg,url,line){
/*	var tip = '';
	if (line) {
		tip += line + ',';
	}
	if (msg) {
		tip += line + ',';
	}
	if (url) {
		tip += url;
	}
	MI.Bos('btnOnerror',encodeURIComponent(tip));
*/
	return true;
};
(function(){
var V1='talk[i].source',V2='info.source',V3='<div class="SA"><em>◆</em><span>◆</span></div>',V5=' href="#"',V6=' onerror="MI.Pic(this,50)"',V7=' title="<%=talk[i].nick.toTitle()%>(@<%=talk[i].name%>)"';
MIIco = ['auth','expo','cic','moon']; //Set Icon's Order
MIIcoHtml = ['<a href="http://t.qq.com/certification" target="_blank" class="vip" title="腾讯认证"></a>','<a href="http://blog.qq.com/zt/2010/2010expo/shibovol.htm" title="2010上海世博志愿者" target="_blank" class="ico_expo"></a>','<a href="http://t.qq.com/group.php?g=cic2010" onclick="MI.Bos(\'btnIconCic\')" class="ico_net" title="互联网大会认证名人"></a>','<a href="http://t.qq.com/group_s.php?g=changetai" onclick="MI.Bos(\'btnIconMoon\')" class="ico_moon" title="嫦娥二号升空微博报道团认证用户"></a>'];
/*MIIcoWC = function(id){
	return '<a href="/k/' + MIIcoWC.v[id] + '队" title="去' + MIIcoWC.v[id] + '队主场一起狂欢" class="ico_flag flag' + id + '" target="_blank"></a>';
}
MIIcoWC.v = ['','南非','墨西哥','乌拉圭','法国','阿根廷','尼日利亚','韩国','希腊','英格兰','美国','阿尔及利亚','斯洛文尼亚','德国','澳大利亚','塞尔维亚','加纳','荷兰','丹麦','日本','喀麦隆','意大利','巴拉圭','新西兰','斯洛伐克','巴西','朝鲜','科特迪瓦','葡萄牙','西班牙','瑞士','洪都拉斯','智利','中国'];*/
MI_icon = function(obj){
	return '<%for(var k=0,num=MIIco.length;k<num;k++){if('+obj+'[MIIco[k]]){%><%=MIIcoHtml[k]%><%;break;}}%>';//if('+obj+'.wc){%><%=MIIcoWC('+obj+'.wc)%><%;}
}
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
		listAll : '<%for(var i=0,n=talk.length;i<n;i++){\
		var numAll,numRelay,numComt;numRelay=talk[i].counts[0]||0;numComt=talk[i].counts[1]||0;\
		if('+V1+'){numRelay='+V1+'.counts[0]||0;numComt='+V1+'.counts[1]||0;}\
		numAll=numRelay+numComt;%><li id="<%=talk[i].id%>"<%if(fav){%> fav="<%=talk[i].favortimestamp%>"<%}%> rel="<%=talk[i].timestamp%>">\
			<%if(!guest){%>\
				<div class="userPic"><a href="http://t.qq.com/<%=talk[i].name%>"'+V7+'><img src="<%=talk[i].pic%>"'+V6+'/></a></div>\
			<%}%>\
			<div class="msgBox">\
				<div class="userName" rel="<%=talk[i].name%>"><strong><a href="http://t.qq.com/<%=talk[i].name%>"'+V7+'><%=talk[i].nick%></a>'+MI_icon('talk[i].flag')+'<%=talk[i].icon%><%if(!'+V1+'){%>:<%}%></strong><%if('+V1+' && talk[i].type==2){%>转播:&nbsp;<%}else if('+V1+' && talk[i].type==7){%>点评:&nbsp;<%}else if('+V1+' && talk[i].type==4){%>对<strong class="userTo"><a href="http://t.qq.com/<%='+V1+'.name%>" title="<%='+V1+'.nick.toTitle()%>(@<%='+V1+'.name%>)"><%='+V1+'.nick%></a>'+MI_icon(V1+'.flag')+'说:<%}%></strong>\
				</div>\
				<div class="msgCnt"><%=talk[i].content||"&nbsp;"%></div>\
				<%var Imgage=talk[i].image && talk[i].image.length,Videos=talk[i].videos && talk[i].videos.length,Music=talk[i].music && talk[i].music.length;if(Imgage || Videos || Music){%><div class="mediaWrap">\
					<%if(Imgage){%>\
						<%for(var j=0;j<talk[i].image.length;j++){%>\
							<div class="picBox"><a href="http://t.qq.com/p/t/<%=talk[i].id%>" class="pic"><img class="crs" crs="<%=talk[i].image[j]%>/160"/></a></div>\
						<%}%>\
					<%}%>\
					<%if(Videos){%>\
						<div class="videoBox" realurl="<%=talk[i].videos[0].realUrl%>" playurl="<%=talk[i].videos[0].playerUrl%>" minipicurl="<%=talk[i].videos[0].miniPicUrl%>" shorturl="<%=talk[i].videos[0].shortUrl%>" reltitle="<%=talk[i].videos[0].title%>">\
							<div class="vWrap" thumbs="<%if(iconPic){%>0<%}else{%>1<%}%>"><a href="http://t.qq.com/p/t/<%=talk[i].id%>" class="vThumbsBox"><span class="vThumbs"><span class="mask"><em></em></span><img class="crs" crs="<%=talk[i].videos[0].miniPicUrl%>" /></span><span class="vSimple"><img class="crs" crs="http://mat1.gtimg.com/www/mb/images/vSimple.png" /></span></a></div>\
						</div>\
					<%}%>\
					<%if(Music){%>\
						<div class="musicBox" song="<%=talk[i].music[0].sMusicName%>" singer="<%=talk[i].music[0].sMusicAuthor%>" songurl="<%=talk[i].music[0].sMusicUrl%>" songid="<%=talk[i].music[0].dwMusicID%>">\
							<a href="http://t.qq.com/p/t/<%=talk[i].id%>" class="mThumbsBox" thumbs="<%if(iconPic){%>0<%}else{%>1<%}%>">\
								<span class="mThumbs"><em class="ico_audios"></em><%=talk[i].music[0].sMusicName%>-<%=talk[i].music[0].sMusicAuthor%></span>\
							</a>\
						</div>\
					<%}%>\
				</div><%}%>\
				<%if('+V1+' && (talk[i].type==2 || talk[i].type==4 || talk[i].type==7)){%>\
					<div class="replyBox">\
						<div class="msgBox">\
							<div class="msgCnt"><strong><a href="http://t.qq.com/<%='+V1+'.name%>" title="<%='+V1+'.nick.toTitle()%>(@<%='+V1+'.name%>)"><%='+V1+'.nick%></a>'+MI_icon(V1+'.flag')+'<%='+V1+'.icon%>:</strong><%='+V1+'.content%></div>\
							<%if(talk[i].type != 4){var Imgage='+V1+'.image && '+V1+'.image.length,Videos='+V1+'.videos && '+V1+'.videos.length,Music='+V1+'.music && '+V1+'.music.length;if(Imgage || Videos || Music){%><div class="mediaWrap">\
								<%if(Imgage){%>\
										<%for(var j=0;j<'+V1+'.image.length;j++){%>\
											<div class="picBox"><a href="http://t.qq.com/p/t/<%='+V1+'.id%>" class="pic"><img class="crs" crs="<%='+V1+'.image[j]%>/160" /></a></div>\
										<%}%>\
								<%}%>\
								<%if(Videos){%>\
									<div class="videoBox" realurl="<%='+V1+'.videos[0].realUrl%>" playurl="<%='+V1+'.videos[0].playerUrl%>" minipicurl="<%='+V1+'.videos[0].miniPicUrl%>" shorturl="<%='+V1+'.videos[0].shortUrl%>" reltitle="<%='+V1+'.videos[0].title%>">\
										<div class="vWrap" thumbs="<%if(iconPic){%>0<%}else{%>1<%}%>"><a href="http://t.qq.com/p/t/<%='+V1+'.id%>" class="vThumbsBox" ><span class="vThumbs"><span class="mask"><em></em></span><img class="crs" crs="<%='+V1+'.videos[0].miniPicUrl%>" /></span><span class="vSimple"><img class="crs" crs="http://mat1.gtimg.com/www/mb/images/vSimple.png" /></span></a></div>\
									</div>\
								<%}%>\
								<%if(Music){%>\
									<div class="musicBox" song="<%='+V1+'.music[0].sMusicName%>" singer="<%='+V1+'.music[0].sMusicAuthor%>" songurl="<%='+V1+'.music[0].sMusicUrl%>" songid="<%='+V1+'.music[0].dwMusicID%>">\
										<a href="http://t.qq.com/p/t/<%='+V1+'.id%>" class="mThumbsBox" thumbs="<%if(iconPic){%>0<%}else{%>1<%}%>">\
											<span class="mThumbs"><em class="ico_audios"></em><%='+V1+'.music[0].sMusicName%>-<%='+V1+'.music[0].sMusicAuthor%></span>\
										</a>\
									</div>\
								<%}%>\
							</div><%}}%>\
							<%if(talk[i].type != 4){%>\
							<div class="pubInfo">\
								<span class="left"><a class="time" rel="<%='+V1+'.timestamp%>" href="http://t.qq.com/p/t/<%='+V1+'.id%>" target="_blank"><%='+V1+'.time%></a></span>\
								<div class="funBox">\
								<%if(1 && '+V1+' && numAll){if(MI.user.account){%>\
									 <a href="http://t.qq.com/p/t/<%='+V1+'.id%>" class="zfNum" target="_blank">转播和点评(<%=numAll%>)</a>\
								<%}else{%>\
									 <em class="zfNum">转播和点评(<%=numAll%>)</em>\
								<%}}%>\
								</div>\
							</div>\
							<%}%>\
						</div>\
					</div>\
				<%}%>\
				<div class="pubInfo">\
					<span class="left"><a class="time" href="http://t.qq.com/p/t/<%=talk[i].id%>" target="_blank"><%=talk[i].time%></a><%if('+V1+' && '+V1+'.content && '+V1+'.content.length && talk[i].type==4){%> <a class="view" href="http://t.qq.com/p/r/<%=talk[i].id%>">查看对话</a><%}%></span>\
					<div class="funBox">\
					<%if(1 && !'+V1+' && numAll){if(MI.user.account){%>\
						<a href="http://t.qq.com/p/t/<%=talk[i].id%>" class="zfNum" target="_blank">转播和点评(<%=numAll%>)</a><%}else{%>\
						<em class="zfNum">转播和点评(<%=numAll%>)</em><%}}%>\
					</div>\
				</div>\
			</div>\
		</li><%}%>',
		userInfo : '<div class="userName"><a href="http://t.qq.com/<%=userinfo.id%>" title="点击打开我的主页" target="_blank"<%=MI.bos[0]%>><em class="ico_pgy"></em><%=userinfo.nick%></a></div><div class="right"><span class="atMe"><a href="http://t.qq.com/at"<%=MI.bos[1]%>>@我的<b id="newCoutAt"></b></a></span><span><a href="http://t.qq.com/<%=userinfo.id%>" class="btn_pub"<%=MI.bos[2]%>>发表广播</a></span></div>'
	},
	bos : [
		' onclick="MI.Bos(\'btnGoHome\')"',
		' onclick="$(\'newCoutAt\').innerHTML=\'\';MI.Bos(\'btnGoAt\')"',
		' onclick="MI.Bos(\'btnGoTalk\')"'
	],
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
		send();
		function send(){
			if (!el.sending) {
				var isFollow = -1,url,className = el.className,classNameFollow = 'addAttention',classNameUnfollow = 'delAttention',followedNum = $('followedNum_' + id),followNum = $('followNum_' + id),isNotButton = className != classNameFollow && className != classNameUnfollow;
				if (className == classNameFollow || isNotButton ) {
					isFollow = 1;
					url = 'http://mini.t.qq.com/mini/follow.php';
				}
				else {
					url = 'http://mini.t.qq.com/mini/unfollow.php';
				}

				el.sending = 1;

				UI.crossAsynJson(url+'?u='+id+'&callback=followCallback&'+MI.AcInfo()+'&r='+MI.random(),'followCallback',function(data){
						el.sending = 0;
						//data = MI.json(data);
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
							//MI.alert(data.msg);
						}
					}
				);
			}
		}
	},
	newCount : function(type){
		type = type || '4,3,2,1';
		//type = type || '4,3,2', //暂时去掉气泡提示
		setInterval(newCout,30000);
		setTimeout(function(){ //不加延迟，IE中偶尔请求会被阻断
			newCout();
		},10);
		function newCout(){
			if (MI.newCountFail < 6) { //6次未登录后不再拉取
				UI.getScript('http://mini.t.qq.com/mini/newMsgCount.php?type=' + type + '&callback=MI.newCountCall&'+MI.AcInfo()+'&r=' + MI.random());
				//MI.newCountCall({"result":0,"msg":"\u6210\u529f","info":[{"type":1,"value":999},{"type":2,"value":2},{"type":3,"value":3},{"type":4,"value":4}]});
			}
		}
	},
	newCountFail : 0,
	newCountCall : function(data){
		if (data.result == 0) {
			var target,num,maxNum,tip,_new;
			UI.each(data.info,function(o,i){
				num = o.value;
				/*if (o.type == 1) {
					target = $('newCountFollower');
					if (target && num) {
						var _num = target.firstChild,followerNum = $('followerNum');
						maxNum = 999;
						_num.innerHTML =  num > maxNum ? '<strong>' + maxNum + '</strong>+' : '+<strong>' + num + '</strong>';
						_num.title =  '有' + (num > maxNum ? '超过' + maxNum : num) + '个新听众';
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
				}*/
				if ((o.type == 3 || o.type == 5) && !MI.noNewCount) {
					if (MI.talkList && MI.talkList._new) {
						maxNum = 50000;
						if (num > maxNum) {
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

						if (num && MI.aio.tabs == 0) {
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
					}
				}
				if (o.type == 4) {
					target = $('newCoutAt');
					if (target) {
						target.innerHTML = target && num ? '(' + num + ')' : '';
					}
				}
			});
			MI.newCountFail = 0;
		}
		else if (data.result == -1) { //未登录
			MI.newCountFail++;
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
	jump : {},
	jumpEvent : function(el){
		if (MI.ClientUin && MI.ClientKey) {
			UI.each(el,function(o){
				var url = UI.A(o,'href');
				if (url.hasString('qq.com')) {
					if (UI.B.ie6) {
						url = encodeURI(UI.utfDecode(url));
					}
					UI.A(o,'href',(UI.B.ie ? ' ' : '') + 'http://ptlogin2.qq.com/jump?clientuin=' + MI.ClientUin + '&clientkey=' + MI.ClientKey + '&u1=' + encodeURIComponent(url) + (url.hasString('?') ? '&' : '?') + 'pref=minisite');
				}
			});
		}
	}
}
MI.Pic = function(o,size){
	size = size ? size : 50;
	o.src = 'http://mat1.gtimg.com/www/mb/images/head_' + size + '.jpg';
}
MI.videoThumb = function(o){
	o.src = 'http://mat1.gtimg.com/www/mb/images/vNoThumbs.jpg';
}
MI.Crs = function(reset){
	clearTimeout(MI.delay.crs);
	var scrollY = UI.scrollY($('AL')),
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
								MI.Bos('btnPicBigPreload');
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
			delay += 20;
		}
	});
	clearTimeout(MI.delay.resetCrs);
	MI.delay.resetCrs = setTimeout(function(){
		MI.crs = $$('.' + className);
	},400);
}
MI.Crs.iconPic = 'x';
MI.PV = function(name){
	if (window.pvCurUrl && pvCurUrl != '') {
		//if (!pvCurUrl.match(new RegExp(name + '$'))) {
			pvCurUrl = '/mini_' + name;
		//}
		pvRepeatCount = 1;
		if(typeof(pgvMain) == 'function') pgvMain();
	}
}
MI.Bos = function(op,value){ //Boss Using : MI.Bos('frontClick');
	try{
		var ouin = MI.Uin();//UI.trim(UI.cookie('o_cookie'));
		MI.Bos.pic.src = 'http://btrace.qq.com/collect?sIp=&iQQ=' + ouin + '&sBiz=microblog&sOp=' + op + '&iSta=0&iTy=202&iFlow=0' + (value ? '&sServerIp=&iBackInt1=&iBackInt2=&sBackStr1=' + value : '');
	}catch(e){}
}
MI.Uin = function(){
	var ouin = '';
	try{
		ouin = UI.trim(UI.cookie('luin') || UI.cookie('uin'));
	}catch(e){}
	return Number(ouin.replace(/o/g,''));
}
MI.ClientUin = MI.ClientKey = '';
MI.AcInfo = function(){
	return 'uin='+MI.Uin()+'&clientuin='+MI.ClientUin+'&clientkey='+MI.ClientKey;
}
MI.Bos.pic = new Image();
})();
MI.TalkList = function(id){
	var Self = this,_more = $('moreList');
	Self._body = UI.isString(id) ? $(id) : id;
	Self._more = Self._bottom = _more ? $$(_more,'a')[0] : UI.DC('a');
	Self._new = $('talkNew'); //New Talk Button
	Self._list = UI.children(Self._body);

	//Cache Last
	Self.cacheLast();
	//Cache First
	Self.cacheFirst();

	//Event
	if (Self._more) {
		Self._more.onmouseover = MI.hideFocus;
		Self._more.onclick = function(e){
			if(MI.aio.tabs == 0){
				UI.A(this,'href','http://t.qq.com');
			}else if(MI.aio.tabs == 1){
				UI.A(this,'href','http://t.qq.com/at');
			}
			if (UI.B.ie && Self.moreTimes > 2) {
				MI.Bos('btnMoreOpen');
				return true;
			}
			Self.more();
			UI.E(e).prevent();
		}
		//Self._more.onfocus = MI.blur;
	}
	if (Self._new) {
		Self._new.onclick = function(){
			Self.newly();
			MI.aio.bindTabsClick(0);
			MI.Bos('btnkNew');
			return false;
		}
		/*var hideNewDelay;
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
		}*/
	}
	setTimeout(function(){ //页面渲染玩再执行
		for (var i = 0,num = Self._list.length;i < num;i++) {
			Self.addEvent(Self._list[i]);
		}
	},0);
}
MI.TalkList.prototype = {
	cur : null, //Current List
	curSource : null, //Current List's Sourse Message
	_tip : null, //List Tip
	_news : [], //New Talks
	auto : 0, //Auto Load Ajax Data When Browser's Back
	iconPic : 0, //Use Simple View Model
	moreTimes : 0, //More Times
	removeUrl : '/delete.php',
	favorUrl : '/mini/favoritemsg.php',
	removeTip : '确定删除这条广播？',
	removeCall : 0, //Call Function After Remove
	unfavTip : '确定删除这条收藏？',
	callBack : { //Call Back Name For JSON
		newly : '',
		more : ''
	},
	xhr : {}, //Cache XHR
	last : {}, //Cache Last List's Info
	first : { //Cache First List's Info
		time : 1
	},
	add : [], //Cache Added List
	time : [],
	addEvent : function(el){
		var Self = this,
			time = $$(el,'.time'),
			zfNum = $$(el,'.zfNum'),
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

		MI.jumpEvent($$(el,'a'));
		
		//Add zfNum Bos
		if(zfNum.length > 0){
			for (var i = 0,num = zfNum.length;i < num;i++) {
				zfNum[i].onclick = function(){
					MI.Bos('btnZfNum');
				};
			}
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
		if (videoBox) {
			MI.TalkList.videoEvent(videoBox);
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
			url = 'r=' + MI.random() + '&num=10&category=1&time=' + (Self.last.fav ? Self.last.fav : Self.last.time) + '&id=' + Self.last.id + (Self.guest ? '&u=' + Self.guest : ''),
			rel = UI.A(Self._more,'rel');
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
			if(MI.aio.tabs == 1){
				rel = 'http://mini.t.qq.com/mini/at.php'
			}
			if (rel) {
				UI.getScript(rel + '?callback=' + Self.callBack.more + '&' + url);
				//UI.get(rel,url,function(json){
				//	Self.addMore(json);
				//});
				MI.Bos(auto ? 'btnMoreAuto' : 'btnMore');
			}
		}
		Self._more.sending = 1;
	},
	newly : function(){
		var Self = this,_new = Self._new;
		if (!_new.sending) {
			if (_new.num > 15) {
				document.location.reload();
				//document.location.href = '/' + MI.user.account; //location.reload()在Firefox中会导致发图表单重新提交的问题
			}
			else {
				UI.addClass(_new,'loading');
				UI.getScript('http://mini.t.qq.com/mini/home.php?callback=' + Self.callBack.newly + '&category=0&time=' + Self.first.time + '&p=2&type=1&'+MI.AcInfo()+'&r=' + MI.random());
				//UI.get('/mini/home.php',{time:Self.first.time,p:2,type:1,r:MI.random()},function(json){
				//	Self.addNewly(json);
				//});
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
				//Self.card();
				//Self.buildTips();


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
					MI.ajax++;
					MI.talkNew.push(json);
				}
			}
		}
		UI.hide(_new);
		if (document.titleTmp) {
			document.title = document.titleTmp;
		}
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
			if (!Self.guest && MI.user.account && data.info.user != MI.user.account) { //Kill Change Account Bug
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
					/*Self.card();
					Self.buildTips();*/
					MI.Crs(1);
				},0);
				UI.append(cache,Self._body);

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
				Self.cacheFirst();
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
	empty : function(){
		var Self = this;
		Self._body.innerHTML = '';
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
		mask = $$(vThumbsBox,'span')[1];
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
		}
	}
}

MI.MiniSite = function(id){
	this._body = UI.isString(id) ? $(id) : id;
	if (this._body) {
		var Self = this;

		//DOM
		//用户信息
		Self._mainWrap = Self.$('.AL')
		Self._recomWrap = Self.$('.recomList');//Self.$('.regWrap');
		Self._tabStyle = Self.$('.tabStyle');
		Self._talklist = Self.$('.LC');
		Self._topicTabs = Self.$('.sideTab');
		//Self._userInfo = Self.$('.userInfo');
		Self._userInfoRight = Self.$('.right');

		Self._loading = Self.$('.loadBox');
		Self._more = Self.$('.moreFoot');

		//tips
		Self._tipsFind = $$(this._body,'.goFind')[0];
		Self._tipsLogin = $$(this._body,'.goLogin')[0];
		Self._tipsReg = $$(this._body,'.goReg')[0];
		Self._tipsNews = $$(this._body,'.goNews')[0];

		/*Self._btnReg = Self.$('.btn_reg');

		if(Self._btnReg){//注册按钮点击事件
			Self._btnReg.onclick = function(){
				var p = UI.parseUrl();//url中传递了uin，key
				var uin = p.clientuin;
				var key = p.clientkey;
				var href = UI.A(this,'href')
				if(uin && key){//通过ptlogin2 jump，保证带登录态跳转到t.qq.com
					var url ='http://ptlogin2.qq.com/jump?clientuin='+uin+'&clientkey='+key+'&u1='+href+'&from=minisite'
					UI.A(this,'href',url);
				}
			}
		}*/
	}
}
MI.MiniSite.prototype = {
	timeout : null,
	followBuild : null,
	bindTabs : function(){
		var Self = this;
		var tabs = $$(Self._tabStyle,'li');

		UI.each(tabs,function(o,num){
			if(num == 0){
				MI.aio.lastTabs = o;
			}
			o.onclick = function(){
				Self.bindTabsClick(num);
				return false;
			}
		});
	},
	bindTabsClick : function(num){
		var Self = this;
		var tabs = $$(Self._tabStyle,'li');
		if(num < 0 || num > tabs.length)	num=0;
		var o = tabs[num];
		UI.A(Self._tabStyle,'tabs',num);
		if(o != MI.aio.lastTabs || $('newCoutAt').innerHTML!=''){
			$$(o,'a')[0].blur();
			UI.removeClass(MI.aio.lastTabs,'select');
			UI.addClass(o,'select');
			MI.aio.lastTabs = o;
			Self.switchTabs(num);
		}
	},
	switchTabs : function(idx){
		MI.aio.tabs = idx;
		MI.talkList.moreTimes = 0;
		MI.Crs.iconPic = '';
		switch(idx){
			case 0:
				MI.aio.home();
				MI.Bos('btnTabsHome');
				break;
			case 1:
				UI.hide($('talkNew'));
				MI.aio.at();
				MI.Bos('btnTabsAtMe');
				break;
		}
	},
	bindTopicTabs : function(){
		var Self = this;
		var tabs = $$(Self._topicTabs,'li');

		UI.each(tabs,function(o,num){
			if(num == 0){
				MI.aio.lastTopicTabs = o;
			}
			o.onclick = function(){
				Self.bindTopicTabsClick(this,num);
				return false;
			}
		});
	},
	bindTopicTabsClick : function(o,num){
		if(!o)	return;
		var Self = this;
		UI.A(Self._topicTabs,'tabs',num);
		if(o != MI.aio.lastTopicTabs){
			$$(o,'a')[0].blur();
			UI.removeClass(MI.aio.lastTopicTabs,'cur');
			UI.addClass(o,'cur');
			MI.aio.lastTopicTabs = o;
			Self.switchTopicTabs(num);
		}
	},
	switchTopicTabs : function(idx){
		switch(idx){
			case 0:
				UI.show($('hotTopicList'));
				UI.hide($('myTopicList'));
				MI.Bos('btnTabsHotTopic');
				break;
			case 1:
				UI.hide($('hotTopicList'));
				UI.show($('myTopicList'));
				MI.aio.myTopic();
				MI.Bos('btnTabsMyTopic');
				break;
		}
	},
	myTopic : function(){
		$('myTopicList').innerHTML = '';
		UI.addClass($('myTopicList'),'loading');
		UI.getScript('http://mini.t.qq.com/mini/mySubs.php?callback&num=4&callback=MiniSite.myTopicCallback&'+MI.AcInfo()+'&r='+MI.random(),null,'utf-8');
	},
	myTopicCallback : function(data){
		UI.removeClass($('myTopicList'),'loading');
		var list = $('myTopicList'),err=0;
		if(data.result == 0){//返回成功
			if(data.info.topic && data.info.topic.length > 0){//有广播
				var s=[],t=data.info.topic;
				s.push('<ul class="hotTopicList">')
				for(var i=0,l=t.length;i<l;i++){
					s.push('<li><a href="http://t.qq.com/'+(t[i].type == 1 ? 'k/' :'search/index.php?pos=2&k=')+encodeURIComponent(t[i].text)+'" target="_blank" title="'+t[i].text+'" >'+((t[i].type == 1) ? ('#'+MI.string.cut(t[i].text,10)+'#') : MI.string.cut(t[i].text,14))+'</a></li>');
				}
				s.push('<li><a href="http://t.qq.com/p/topic" onclick="MI.Bos(\'btnMoreTopic\');" target="_blank">更多话题>></a></li>')
				s.push('</ul>')
				list.innerHTML = s.join('');
			}else{
				err = 1;
			}
		}else{
			err = 1;
		}
		if(err){
			list.innerHTML = '<div class="nohotTopic">还没有任何订阅，<br /><a href="http://t.qq.com/p/topic" target="_blank" class="ffsong" onclick="MI.Bos(\'btnMoreTopic2\');")">更多话题>></a></div>';
		}
		MI.jumpEvent($$(list,'a'));
	},
	home : function(){
		MI.talkList.empty();
		UI.hide(this._mainWrap);
		if(MI.user.account){
			UI.show(this._loading);
		}
		UI.getScript('http://mini.t.qq.com/mini/home.php?num=10&p=0&category=0viewModel=1&callback=MiniSite.callback&'+MI.AcInfo()+'&r='+MI.random(),null,'utf-8');
	},
	at : function(){
		MI.talkList.empty();
		UI.hide(this._mainWrap);
		if(MI.user.account){
			UI.show(this._loading);
		}
		UI.getScript('http://mini.t.qq.com/mini/at.php?callback=MiniSite.callback&p=0&'+MI.AcInfo()+'&r='+MI.random(),null,'utf-8');
	},
	callback : function(data,s){
		//测速代码
		QosSS.t[4]= (new Date()).getTime();

		var Self = this;
		var html;
		if(!data){
			data = {result:null,msg:'未知错误'}
		}
		UI.hide(Self._loading);
		if(MI.aio.tabs == 1){
			$('newCoutAt').innerHTML = '';
		}
		//data.result = -2
		if(data.result == 0){//返回成功
			//登录成功且开通微博 加载用户信息
			var user = data.info.userinfo;
			if(user){
				MI.user.account = data.info.userinfo.id;

				/*html = UI.html(new UI.tmplString(MI.tmpl.userInfo)(data.info));
				var frag = document.createDocumentFragment();
				UI.each(html,function(o){
					UI.append(o,frag);
				});
				Self._userInfo.innerHTML = '';
				UI.append(frag,Self._userInfo);
				MI.jumpEvent($$(Self._userInfo,'a'));*/
				Self.followBtn();
			}
			//user.num[2] = 0;
			//data.info.talk = '';
			if(data.info.talk && data.info.talk.length > 0){//有广播
				MI.talkList.addMore(data);
				MI.newCount('4,5,2,1');
				Self.showContent();
				UI.show($('tabsAtMe'));
				UI.show(Self._more);
				$('AL').scrollTop=0;
			}else{//fo一些人试试吧
				if(user.num[2] == 0){//如果没有fo任何人
					Self.showFind();
				}else{//fo了人，但是这些人都没有广播
					Self.showNews();
				}
			}			
		}else if(data.result == -1){//未登录
			Self.showLogin();
		}else if(data.result == -2){//登录成功但是未开通微博
			Self.showReg();
		}

		//测速代码
		QosSS.c = new Image();
		QosSS.c.onload = (QosSS.c.onerror = function() {delete QosSS.c;});
		QosSS.t[5]= (new Date()).getTime();
		QosSS.c.src="http://qos.report.qq.com/collect?type=1&name="+"mini_t_my_index"+"&1="+ (QosSS.t[1]- QosSS.t[0])+"&2="+ (QosSS.t[2]- QosSS.t[0])+ "&3="+ (QosSS.t[3]- QosSS.t[0])+"&4="+ (QosSS.t[4]- QosSS.t[0])+ "&5="+ (QosSS.t[5]- QosSS.t[0]);
	},
	followBtn : function(){
		if(this.followBuild || !MI.user.account)	return;
		UI.each($$('.hotUserBox .userAccount'),function(o){
			UI.hide(o);
		})
		MI.FollowBtn.build($('hotUserList'),'.hotUserBox .userPic a');
		this.followBuild = true;

	},
	showContent : function(){
		UI.show(this._mainWrap);
		UI.hide(this._recomWrap);
		UI.hide(this._tipsLogin);
		UI.hide(this._tipsReg);
		UI.hide(this._tipsFind);
	},
	showLogin : function(){
		UI.hide(this._mainWrap);
		UI.show(this._recomWrap);
		UI.show(this._tipsLogin);
	},
	showReg : function(){
		UI.hide(this._mainWrap);
		UI.show(this._recomWrap);
		UI.show(this._tipsReg);
	},
	showFind : function(){
		UI.hide(this._mainWrap);
		UI.show(this._recomWrap);
		UI.show(this._tipsFind);
	},
	showNews : function(){
		UI.hide(this._mainWrap);
		UI.show(this._recomWrap);
		UI.show(this._tipsNews);
	},
	$ : function(className){
		return $$(this._body,className)[0];
	}

}
MI.Slide = function(o){
	var Self = this;
	//Param
	Self.autodelay = null;
	Self.autotime = 5000;

	//Dom
	Self._parent = o.target.parentNode.parentNode;
	Self._body = o.target;
	Self._list = UI.GC(o.target,'.hotUserBox')[0];
	Self._ul = UI.GC(Self._list,'ul');
	Self._page = Self.$('.btn_page');
	Self._prev = Self.$('.btn_prev');
	Self._next = Self.$('.btn_next');

	//Data
	Self.stepSmall = UI.width(Self._ul[0]);
	Self.perPage = parseInt(UI.width(Self._body) / Self.stepSmall);
	Self.total = Math.ceil(Self._ul.length / Self.perPage);
	Self.step = Self.perPage * Self.stepSmall;
	Self._page.innerHTML = new UI.tmplString(Self.tmpl.page)({num:Self.total});
	Self.page();
	autoStart();


	//Event
	UI.EA(Self._prev,'click',function(){
		Self.prev();
	});
	UI.EA(Self._prev,'click',MI.Slide.click);
	UI.EA(Self._next,'click',function(){
		Self.next();
	});
	UI.EA(Self._next,'click',MI.Slide.click);
	UI.each(Self._page.childNodes,function(o,i){
		o.num = i + 1;
		UI.EA(o,'click',MI.Slide.click);
		UI.EA(o,'click',page);
		UI.EA(o,'mouseover',autoStop);
		UI.EA(o,'mouseout',autoStart);
	});
	Self.call = o.call;

	Self._list.onmouseover = Self._prev.onmouseover = Self._next.onmouseover = autoStop;
	Self._list.onmouseout = Self._prev.onmouseout = Self._next.onmouseout = autoStart;
	function page(e){
		var el = UI.E(e).target;
		Self.page(el.num);
	}
	function autoStart(e){
		//UI.E(e).stop();
		autoStop();
		Self.autodelay = setInterval(function(){
			Self.page(Self.cur+1);
		},Self.autotime)
	}
	function autoStop(e){
		//UI.E(e).stop();
		if(Self.autodelay){
			clearInterval(Self.autodelay);
		}
	}
}
MI.Slide.click = function(e){
	var E = UI.E(e);
	E.prevent();
	E.target.blur();
}
MI.Slide.prototype = {
	/**
	 * 是否循环
	 * @type Boolean
	 */
	loop : 1,
	/**
	 * 当前页
	 * @type Number
	 */
	cur : 1,
	tmpl : {
		page : '<%for(var i=0;i<num;i++){%><a href="#" class="<%if(i==0){%>cur<%}%>"></a><%}%>'
	},
	$ : function(selector){
		return UI.GC(this._parent,selector)[0];
	},
	/**
	 * 跳到某页
	 * 
	 * @param {Number} Number 页码
	 *            @example
	 *            MI.slide.page(2);
	 */
	page : function(num){
		this.cur = num || this.cur;

		if (this.cur < 1) {
			this.cur = this.loop ? this.total : 1;
		}
		else if (this.cur > this.total) {
			this.cur = this.loop ? 1 : this.total;
		}

		UI.removeClass(UI.GC(this._page,'.cur')[0],'cur');
		UI.addClass(this._page.childNodes[this.cur - 1],'cur');

		this.scroll();
		if (this.call) {
			this.call(this.cur);
		}
		MI.Bos('btnUserPage'+this.cur);
	},
	/**
	 * 上一页
	 * 
	 *            @example
	 *            MI.slide.prev();
	 */
	prev : function(){
		this.cur--;
		this.page();
	},
	/**
	 * 下一页
	 * 
	 *            @example
	 *            MI.slide.next();
	 */
	next : function(){
		this.cur++;
		this.page();
	},
	scroll : function(){
		clearInterval(this.delay);
		this.delay = UI.animate(this._list,'marginLeft',- (this.cur - 1) * this.step);
	}
}
MI.FollowBtn = {
	boss : null,
	build : function(el,className,type){
		className = className || '.pic a';
		var Self = this,fUser=$$(el || $$('.comList')[0],className),fAccount=[];
		UI.each(fUser,function(o,i){
			if(!UI.hasClass(o,'cusPic')){
				fAccount.push(MI.string.id(UI.A(o,'rel')));
				if (!$$(o.parentNode,'.attentBoxWrap').length){
					var head = $$(o.parentNode.parentNode,'.userName a')[0]//o;
					if(UI.hasClass(o,'masPic')){
						head = UI.next(o);
					}
					UI.after(UI.html('<div class="attentBoxWrap ' + (type ? '' : 'attentBox') + '"></div>')[0],head);
				}
			}
		});
		UI.crossAsynJson('http://mini.t.qq.com/mini/userRelation.php?&u=' + fAccount.join(',')+'&callback=userRelationCallback&'+MI.AcInfo()+'&r=' + MI.random(),'userRelationCallback',function(data){
			if(data.result == 0){
				var btn,p;
				UI.each(fUser,function(o){
					var id = MI.string.id(UI.A(o,'rel')),s;
					if(!UI.hasClass(o,'cusPic')){
						s = type ? '<a class="addAttention" href="#">+收听</a>' : '<a class="addAttention" href="#">收听</a>'
						if(data.info[id]){
							p = o.parentNode.parentNode;
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
			var del = UI.html(type ? '<div class="disabled" style="display:none">取消</div>' : '<a href="#" class="delAttention" style="display:none">取消收听</a>')[0];
			UI.after(del,o);
			if(o.style.display == 'none') UI.show(del);
			o.onclick = function(){
				var S = this;
				MI.follow(Self.user(S),S,function(){
					UI.hide(S);
					S.className='addAttention';
					UI.show(S.nextSibling);
					MI.Bos('btnAddAttention');
				});
				if(!el) MI.Bos(bossFollow + (type || ''));
				return false;
			}
			if (!type){
				del.onclick = function(){
					var S = this;
					MI.follow(Self.user(S),S,function(){
						UI.hide(S);
						S.className='delAttention';
						UI.show(S.previousSibling);
						MI.Bos('btndelAttention');
					});
					if(!el) MI.Bos(bossUnFollow + (type || ''));
					return false;
				}
			}
		});
	},
	user : function(el){
		return MI.string.id(UI.A($$(el.parentNode.parentNode.parentNode,'.userPic a')[0],'rel'));
	}
}
UI.ready(function(){
	MI.aio = MiniSite = new MI.MiniSite('wbMiniWrap');
	MI.talkList = new MI.TalkList('talkList');
	MI.talkList.callBack.more = 'MI.talkList.addMore';
	MI.talkList.callBack.newly = 'MI.talkList.addNewly';
	QosSS.t[3]= (new Date()).getTime();
	MI.aio.tabs = 0;
	MI.aio.home();
	MI.aio.bindTabs();
	MI.aio.bindTopicTabs();

	$('AL').onscroll = function(){
		MI.Crs();
		MI.Bos('btnScroll');
		//$('AL').onscroll = null;
	}
	window.onbeforeunload = function(){
		MI.Bos('btnStayTime',new Date().getTime() - QosSS.t[0]);
	}
	UI.each($$('.hotTopicList a'),function(o){
		o.onclick = function(){
			MI.Bos('btnHotTopic');
		}
	});
	UI.each($$('.hotUser a'),function(o){
		o.onclick = function(){
			MI.Bos('btnHotUser');
		}
	});
	//全局clientkey，clientuin
	var url = UI.parseUrl();
	MI.ClientUin = url.clientuin || '';
	MI.ClientKey = url.clientkey || '';

	MI.jumpEvent($$('a'));

	//延时调用
	setTimeout(function(){
		//避免img tag未载入就执行，造成图片无法显示
		MI.Crs(1);
		//include的页面片加载有延时，会导致翻页计算有误\
		MI.slide = new MI.Slide({target:$('hotUserList')});
	},100);
});
