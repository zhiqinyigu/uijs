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
	MI.Bos('');
			1 /list/xxxx
			2 /list_user.php
			3 /list_listener.php
			4 /search/user.php
			5 /my/follower
			6 /my/following
			7 /his
			8 /his/follower
			9 /his/following
			10 /search/tag.php
			11 /my
			12 /ilist/xxxx
			13 /my/mine
			14 /at
			15 /favor
			16 /messages/inbox
			17 /messages/sendbox
			18 /list_mine.php
			19 /list_mylisten.php
			20 /list_selfon.php
			21 /p/news
			22 /college_anas.php
			23 /p/group
			24 /p/mobile
			25 /p/city
			26 /search/index.php
			27 /search/message.php
			28 /p/top
			29 /k/xxx
			30 /setting_tag.php

	talkBox:
		btnTopic 新建话题
		btnPic 上传图片
		btnPicCancel 图片上传中取消
		btnPicDel 图片删除
		btnPicTurn 图片旋转
		btnPicCapture 图片控件上传
		btnSend 广播
		btnSendReply 对话发送
		btnSendRelay 转播
		btnSendMsg 私信
		btnSendRelayList 转播列表中的发送按钮
		btnSendComt 点评
		btnOpenTalk 来说两句（话题）
		btnCloseTalk 收起来说两句（话题）
		btnCtrlEnter 快捷键
		btnGuideLink 引导词链接（右侧）
		btnGuideLinkLeft 引导词链接（左侧）
		btnAutoAtAccount 使用@联想
		btnRelayistCheckbox 同时转播给你的听众


	follow:
		btnHeadFollow 收听（头像下）
		btnHeadUnFollow 取消收听（头像下）
		btnFollowKnowUsersNews 收听-大家在说
		btnFollowKnowUsersGroup1-n 收听-娱乐明星等分组
		btnFollowKnowUsersCity 收听-同城广播
		btnFollowKnowUsersYulu 收听-经典语录
		btnFollowKnowUsersMobile 收听-手机广播
		btnFollowKnowUsersTop 取消收听-热门广播
		btnUnFollowKnowUsersNews 取消收听-大家在说
		btnUnFollowKnowUsersGroup1-n 取消收听-娱乐明星等分组
		btnUnFollowKnowUsersCity 取消收听-同城广播
		btnUnFollowKnowUsersYulu 取消收听-经典语录
		btnUnFollowKnowUsersMobile 取消收听-手机广播
		btnUnFollowKnowUsersTop 取消收听-热门广播
		btnFollowKnowUsersSchool 收听-找校友
		btnUnFollowKnowUsersSchool 取消收听-找校友
		btnFollowKnowUsersWork 收听-找同事
		btnUnFollowKnowUsersWork 取消收听-找同事
		btnFollowAllFindUser 找人页一键收听

	Portal：
		btnPublishNotLogin 转播时未登录
		btnPublishNotReg 转播时未注册
		btnQuickNotLogin 点击立即开通时未登录
		btnQuickNotReg 点击立即开通时未注册
		btnLoadNotLogin 进入时未登录
		btnLoadNotReg 进入时未注册
		btnClickClose 立即关闭
		btnAutoClose 自动关闭
		btnGoMyHome 点击 我的主页
		btnQuickEmailReg 点击电子邮箱开通

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
//举报
function jubao(urlParam){
	var url="http://jubao.qq.com/cgi-bin/jubao?";
	if(urlParam!='') url += urlParam;

	var wrap = UI.html('<div style="width:620px;height:436px;overflow:hidden;border:solid #FFF;border-width:5px 0 10px"><iframe src="about:blank" frameborder="0" scrolling="no" onload="MI.dialog.hideLoad()"></iframe></div>')[0],oIFrame = wrap.firstChild;
	oIFrame.style.cssText = 'width:628px;height:470px;background:#FFF;margin:-13px 0 0 -5px;-margin-top:-32px;border-style:none';
	MI.dialog.show({title:'腾讯举报平台',width:670,html:wrap});
	MI.dialog.showLoad();
	oIFrame.src = url;
}
try{document.domain='qq.com'}catch(e){}
function jubao_onClose(){
	MI.dialog.hide();
}
function jubao_msg(id){
	jubao('appname=micoblog&subapp=web&jubaotype=msg&tw_msg_id='+id+'&tw_name=&tw_vip=&envname=web');
}
function jubao_user(name){
	jubao('appname=micoblog&subapp=web&jubaotype=uin&tw_pic_url=&tw_name='+name+'&tw_vip=&envname=web');
}
onerror = function(msg,url,line){
	var tip = '';
	if (line) {
		tip += line + ',';
	}
	if (msg) {
		tip += line + ',';
	}
	if (url) {
		tip += url;
	}
	MI.Bos('btnOnerrorShare',encodeURIComponent(tip));
	return true;
};
var PATH=window.location.host!='t.qq.com'?'http://t.qq.com':'';
(function(){
var V1='talk[i].source',V2='info.source',V3='<div class="SA"><em>◆</em><span>◆</span></div>',V5=' href="#"',V6=' onerror="MI.Pic(this,50)"',V7=' title="<%=talk[i].nick.toTitle()%>(@<%=talk[i].name%>)"';
MIIco = ['auth','expo','cic','moon']; //Set Icon's Order
MIIcoHtml = ['<a href="'+PATH+'/certification" target="_blank" class="vip" title="腾讯认证"></a>','<a href="http://blog.qq.com/zt/2010/2010expo/shibovol.htm" title="2010上海世博志愿者" target="_blank" class="ico_expo"></a>','<a href="http://t.qq.com/group.php?g=cic2010" onclick="MI.Bos(\'btnIconCic\')" class="ico_net" title="互联网大会认证名人"></a>','<a href="http://t.qq.com/group_s.php?g=changetai" onclick="MI.Bos(\'btnIconMoon\')" class="ico_moon" title="嫦娥二号升空微博报道团认证用户"></a>'];
/*MIIcoWC = function(id){
	return '<a href="/k/' + MIIcoWC.v[id] + '队" title="去' + MIIcoWC.v[id] + '队主场一起狂欢" class="ico_flag flag' + id + '" target="_blank"></a>';
}
MIIcoWC.v = ['','南非','墨西哥','乌拉圭','法国','阿根廷','尼日利亚','韩国','希腊','英格兰','美国','阿尔及利亚','斯洛文尼亚','德国','澳大利亚','塞尔维亚','加纳','荷兰','丹麦','日本','喀麦隆','意大利','巴拉圭','新西兰','斯洛伐克','巴西','朝鲜','科特迪瓦','葡萄牙','西班牙','瑞士','洪都拉斯','智利','中国'];*/
MI_icon = function(obj){
	return '<%for(var k=0,num=MIIco.length;k<num;k++){if('+obj+'[MIIco[k]]){%><%=MIIcoHtml[k]%><%;break;}}%>';//if('+obj+'.wc){%><%=MIIcoWC('+obj+'.wc)%><%;}
}
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
	 * 控制Banner和Tips
	 * 
	 * @param {Object} Object Json字符串
	 *            @example
	 *            MI.bannerTips({banner:{......}});
	 *            MI.bannerTips(); //用于需要异步弹出的Tips，异步执行完调用
	 */
	bannerTips : function(obj){
		/*
		obj = {
			banner : {
				id : "14",
				title : "\u4e16\u535a", //标题
				pic : "http:\/\/img1.gtimg.com\/microblog\/pics\/hv1\/99\/165\/614\/39967524.jpg", //图片
				url : "http:\/\/blog.qq.com\/zt\/2010\/2010expo\/index.htm", //链接
				blank : "1", //新窗口
				close : "1" //点连接关闭banner
			},
			tips : {
				id : 14,
				target : '.tag a',
				content : 'html',
				css : 'css',
			}
		}
		*/
		obj = obj || MI.bannerTipsCache;
		var oBanner = obj.banner,
			oTips = obj.tips,
			talkBox = $('talkBox');
		if (oBanner && talkBox){
			UI.css('#homeBannerTip{position:relative;width:576px;height:129px;margin:9px 0 0 9px;background:url(' + oBanner.pic + ') 50% 50% no-repeat;overflow:hidden;}\
				#homeBannerTip .content{display:block;width:526px;height:61px;*zoom:1;padding:68px 23px 0 27px;color:#fff;line-height:20px;text-decoration:none}\
				#homeBannerTip .close{float:none;position:absolute;margin:0;top:10px;right:13px}');
			var close = 'UI.ajax({url:\'/asyn/updateTips.php\',data:{id:'+oBanner.id+',status:0}});',
				banner = UI.html('<div id="homeBannerTip"><a href="#" onclick="UI.hide(\'homeBannerTip\');' + close + 'return false" class="close" title="关闭"></a>\
					<a' + (oBanner.blank ? ' target="_blank"' : '') + ' href="' + oBanner.url + '" title="' + (oBanner.title || '') + '" onclick="' + (oBanner.close ? close : '') + 'MI.Bos(\'homeBannerTip_' + oBanner.id + '\');" class="content"></a></div>')[0];
			UI.after(banner,talkBox);
			delete obj.banner;
		}
		if (oTips){
			var target = $$(oTips.target)[0],html;
			if (target){
				//oTips.target = '';
				oTips.content = '<div class="mdTips"><a href="#" class="close TipsClose" onclick="return false">关闭</a><div class="SA"><em>◆</em><span>◆</span></div><div class="cntBox"><div class="ico ico_light"></div><p>体验围脖名单新功能？<br><em class="ffsong">·</em>点击创建，制作各种有趣的人名单<br><em class="ffsong">·</em>点击名单集市，围观大家的精彩名单</p><p class="links"><a href="http://user.qzone.qq.com/20100401/blog/1289549179" target="_blank">使用帮助</a><a href="#" class="TipsClose">不再提醒</a></p></div></div>';
				oTips.css = '.sideFun{position:relative;z-index:10;overflow:visible}.mdTips{position:absolute;z-index:999;top:-112px;right:-3px;width:210px;padding:10px 20px 10px 40px;border:1px solid #F0E5BA;background:#FFFFE9}.mdTips .close{position:absolute;float:none;margin-top:-2px;right:10px}.mdTips p{text-align:left;color:#333}.mdTips .links{text-align:right}.mdTips .SA{position:absolute;left:210px;top:auto;bottom:9px}.mdTips .SA em,.mdTips .SA span{width:17px;height:19px;color:#F0E5BA}.mdTips .SA span{top:-1px;left:0;color:#FFFFE9}.mdTips .links a{font-size:12px;margin:3px 0 0 20px;color:#2B4A78;text-decoration:underline}.mdTips .ico_light{position:absolute;left:14px;margin-top:5px}';
				UI.css(oTips.css);
				html = UI.html(oTips.content)[0];
				UI.after(html,target);
				UI.each($$(html,'.TipsClose'),function(o){
					o.onclick = function(){
						UI.ajax({url:"/asyn/updateTips.php",data:{t:18,v:1}});
						return false;
					}
				});
			}
		}
		MI.bannerTipsCache = obj;
	},
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
				<%if('+V1+' && talk[i].type==4){%>\
					<div class="userPic"><a href="'+PATH+'/<%=talk[i].name%>"'+V7+' class="masPic"><img src="<%=talk[i].pic%>"'+V6+'/></a><a href="/<%='+V1+'.name%>" title="<%='+V1+'.nick.toTitle()%>(@<%='+V1+'.name%>)" class="cusPic"><img src="<%='+V1+'.pic%>"'+V6+'/></a></div>\
				<%}else{%>\
					<div class="userPic"><a href="'+PATH+'/<%=talk[i].name%>"'+V7+'><img src="<%=talk[i].pic%>"'+V6+'/></a></div>\
				<%}%>\
			<%}%>\
			<div class="msgBox">\
				<div class="user_msgCnt"><div class="userName" rel="<%=talk[i].name%>"><strong><a href="'+PATH+'/<%=talk[i].name%>"'+V7+'><%=talk[i].nick%></a>'+MI_icon('talk[i].flag')+'<%=talk[i].icon%><%if(!'+V1+'){%>:<%}%></strong><%if('+V1+' && talk[i].type==2){%>转播:&nbsp;<%}else if('+V1+' && talk[i].type==7){%>点评:&nbsp;<%}else if('+V1+' && talk[i].type==4){%>对<strong class="userTo"><a href="/<%='+V1+'.name%>" title="<%='+V1+'.nick.toTitle()%>(@<%='+V1+'.name%>)"><%='+V1+'.nick%></a>'+MI_icon(V1+'.flag')+'说:<%}%></strong>\
				</div>\
				<div class="msgCnt"><%=talk[i].content||"&nbsp;"%></div></div>\
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
				<%if('+V1+' && talk[i].type==2){%>\
					<div class="replyBox">\
						<div class="msgBox">\
							<div class="msgCnt"><strong><a href="'+PATH+'/<%='+V1+'.name%>" title="<%='+V1+'.nick.toTitle()%>(@<%='+V1+'.name%>)"><%='+V1+'.nick%></a>'+MI_icon(V1+'.flag')+'<%='+V1+'.icon%>:</strong><%='+V1+'.content%></div>\
							<%var Imgage='+V1+'.image && '+V1+'.image.length,Videos='+V1+'.videos && '+V1+'.videos.length,Music='+V1+'.music && '+V1+'.music.length;if(Imgage || Videos || Music){%><div class="mediaWrap">\
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
							</div><%}%>\
							<div class="pubInfo"><span class="left"><a class="time" rel="<%='+V1+'.timestamp%>" href="'+PATH+'/p/t/<%='+V1+'.id%>" target="_blank"><%='+V1+'.time%></a> <%if(1 && '+V1+' && numAll){%>\
								 <a href="'+PATH+'/p/t/<%='+V1+'.id%>" class="zfNum" target="_blank">查看转播(<b class="relayNum"><%=numAll%></b>)</a>\
							<%}%></span></div>\
						</div>\
					</div>\
				<%}%>\
				<div class="pubInfo"><span class="left"><a class="time" href="'+PATH+'/p/t/<%=talk[i].id%>" target="_blank"><%=talk[i].time%></a> <%if(1 && !'+V1+' && numAll){%>\
					 <a href="'+PATH+'/p/t/<%=talk[i].id%>" class="zfNum" target="_blank">查看转播(<b class="relayNum"><%=numAll%></b>)</a><%}%><%if('+V1+' && '+V1+'.content && '+V1+'.content.length && talk[i].type==4){%>\
					<a class="view" href="'+PATH+'/p/r/<%=talk[i].id%>">查看对话</a><%}%><%if(MI.user.fun.report && talk[i].name != MI.user.account){%> <a'+V5+' class="alarm">举报</a><%}%></span><div class="funBox">\
						<a'+V5+' class="relay" num="<%=numRelay%>">转播</a><span>|</span><a href="'+PATH+'/p/t/<%=talk[i].id%>" rel="<%=talk[i].id%>" class="comt" num="<%=numComt%>">点评</a>\
					</div>\
				</div>\
				<%if('+V1+' && talk[i].type==4){%><div class="talkDetail"><b><%='+V1+'.nick%>:</b> <%='+V1+'.content%></div><%}%>\
			</div>\
		</li><%}%>',
		picTool : '<div class="tools"><a href="#" class="btnBack"><em></em>向左转</a><span>|</span><a href="#" class="btnPrev"><em></em>向右转</a><a href="$Url/2000" class="btnOriginal" target="_blank">查看原图</a></div>',
		videoTool : '<div class="vTools" style="display:block"><a href="#" class="vClose"><em></em>收起</a><a href="$VideoRealUrl" class="vUrl" target="_blank"><em></em>$VideoTitle</a></div>',
		videoThumbs : '<a href="#" class="vThumbs" url="$VideoPlayUrl"><span class="mask"><em></em></span><img src="$VideoPicUrl" /></a>',
		videoObject : '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,124,0" width="460" height="372" ><param name="wmode" value="transparent" /><param name="movie" value="$VideoPlayUrl" /><param name="allowScriptAccess" value="never" /><param name="allownetworking" value="internal" /><param name="allowFullScreen" value="true" /><param name="flashvars" value="playMovie=true"></object>',
		videoEmbed : '<embed src="$VideoPlayUrl" quality="high" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="460" height="372" allowScriptAccess="never" allowFullScreen="true" allownetworking="internal" flashvars="playMovie=true" wmode="transparent"></embed>',
		videoHTML5: '<video width="460" height="362" controls="1" autoplay="autoplay" autobuffer="true" src="$VideoPlayUrl"></video>',
		msg : '<%for(var i=0,n=talk.length;i<n;i++){%><li id="<%=talk[i].id%>" rel="<%=talk[i].timestamp%>"><div class="msgBox"><div class="userName">发给 <a href="'+PATH+'/<%=talk[i].name%>" title="<%=talk[i].nick%>(@<%=talk[i].name%>)"><%=talk[i].nick%></a>'+MI_icon('talk[i].flag')+'</div><div class="msgCnt"><%=talk[i].content%></div><div class="pubTime"><span class="time"><%=talk[i].time%></span></div><p class="btnBox"><a href="#" class="replyMsg btn" rel="<%=talk[i].name%>">再写一封</a><a class="btn delBtn"'+V5+'>删除</a></p></div></li><%}%>',
		msgBox : '<div><table border="0" cellspacing="0" cellpadding="0" class="letterBg"><tr><th>收信人</th><td><div class="txtWrap"><input type="text" name="userName" id="userName" class="msgTo inputTxt" value=""/> <span class="cNote">请输入你的听众的微博帐号</span></div></td></tr><tr><th>内　容</th><td><div class="txtWrap"><textarea type="text" class="inputArea noAutoCmt"></textarea></div></td></tr><tr><th></th><td><input type="button" class="sendBtn inputBtn" value="发送" title="快捷键 Crtl+Enter" /><span class="countTxt"></span></td></tr></table></div>',
		reply : '<div class="talkWrap">'+V3+'<div class="top"><span class="left"><span class="replyTitle"></span>　<span class="addReply"></span></span><a'+V5+' class="close" title="关闭">关闭</a></div><iframe class="comts" src="about:blank" frameborder="0" scrolling="no" style="height:0"></iframe><div class="cont"><textarea class="inputTxt"></textarea></div><div class="bot"><div class="left" style="margin-right:1ex"><span class="number cNote"></span></div><div class="left"></div><input type="button" class="inputBtn sendBtn" value="" /><span class="countTxt"></span></div><div class="talkSuc" style="display:none"><span class="ico_tsW"><span class="ico_ts"></span></span><span class="msg"></span></div></div>',
		black : '<div class="blackTip"><h2><span class="ico_tsW"><span class="ico_te"></span></span>确定将<%=sex%>拉入黑名单？</h2><p><span class="fs14">拉黑之后...</span><br/>你们之间的收听关系将被解除，对方无法再收听你，而且你也不再收到来自<%=sex%>的任何消息与通知</p><p><input type="button" value="确定" id="blackTipBtn" /><input type="button" value="取消" onclick="MI.dialog.hide()"/></p></div>',
		unblack : '<div class="blackTip"><h2><span class="ico_tsW"><span class="ico_te"></span></span>你真的原谅<%=sex%>了吗？</h2><p><span class="fs14">取消之后...</span><br/>你会重新收到来自<%=sex%>的私信和其它通知</p><p><input type="button" value="确定" id="blackTipBtn"/><input type="button" value="取消" onclick="MI.dialog.hide()"/></p></div>',
		card : '<div class="uCard"><div class="tip">这是你自己</div><div class="tip"></div><div class="userPic"><a></a><p class="btn"><input type="button" class="addAttention" value="" /><a href="#" class="delAttention" title="取消收听">取消</a></p></div><div class="uCardcnt"><p class="userName"></p><p class="nums loading"></p><p class="btn"><a href="#" class="reply">对话</a><a href="#" class="msg">私信</a><a href="#" class="black">拉黑</a></p><div class="tagBox"></div><a href="#" class="ico_sFo"></a></div></div>',
		code : '<div class="verify"><span class="ico_tsW"><span class="ico_te"></span></span><h3></h3><div class="clear"><form><div class="left">验证码：</div><div class="verifyInput"><input type="text" class="inputTxt" /><div class="cNote">输入下图中的字符，不区分大小写</div><img width="130" height="53">&nbsp;<a href="#" class="codeChange">看不清，换一张</a></div></div><div class="btnBox"><button type="submit" class="btn2">确定</button><button class="btn2">取消</button></form></div></div>'
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

				UI.ajax({
					url : url,
					data : {u:id,r:MI.random(),veriCode:veriCode||''},
					success : function(data){
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
					}
				});
			}
		}
	},
	sFollow : function(id,el,call){
		var className = 'foLight',follow = UI.hasClass(el,className) ? 0 : 1;
		if (!el.sending) {
			UI.ajax({
				url : '/asyn/group_oper.php',
				data : {u:id,op:follow},
				success : function(data){
					//data = "{result:0,msg:'',info:{nick:'t684000008',follow:1,followed:1,block:0,gender:1,'flag':{'wc':0},num:[84,3]},group:{'im':0}}";
					data = MI.json(data);
					if (data.result == 0) {
						if (follow) {
							UI.addClass(el,className);
							el.title = MI.sFollowTip[1];
						}
						else {
							UI.removeClass(el,className);
							el.title = MI.sFollowTip[0];
						}
						if (call) {
							call(follow);
						}
					}
					else {
						MI.alert(data.msg);
					}
					el.sending = 0;
				}
			});
			el.sending = 1;
		}
	},
	sFollowTip : ['添加到特别收听','取消特别收听'],
	black : function(o){
		var btn,blackDel = 'blackDel',isBlack = UI.hasClass(o.target,blackDel) ? 1 : 0,type = isBlack ? 'un' : '',txt = ['拉黑名单','取消拉黑'];
		MI.dialog.show({width:420,html:new UI.tmplString(MI.tmpl[type + 'black'])(o)});
		o.txt = UI.isUndefined(o.txt) ? 1 : o.txt; //Change Btn's Text
		if (UI.isArray(o.txt)) {
			txt = o.txt;
		}
		btn = $('blackTipBtn');
		btn.focus();
		btn.onclick = function(){
			var Self = this;
			if (!Self.sending) {
				UI.ajax({
					url : '/asyn/' + type + 'block.php',
					data : {u:o.u,r:MI.random()},
					success : function(data){
						data = MI.json(data);
						if (data.result == 0) {
							if (o.txt) {
								o.target.innerHTML = '<b></b>' + (isBlack ? txt[0] : txt[1]);
							}
							if (isBlack) {
								UI.removeClass(o.target,blackDel);
							}
							else {
								UI.addClass(o.target,blackDel);
							}
							MI.dialog.hide();
							if (o.call) {
								o.call(isBlack);
							}
						}
						else {
							MI.alert(data.msg);
						}
						Self.sending = 0;
					}
				});
				Self.sending = 1;
			}
		}
	},
	topic : function(id,el,del){
		if (!el.sending) {
			var isDel = del || UI.hasClass(el,'delAttention'),type = isDel ? '2' : '1';
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
			var isDel = del || (UI.A(el, 'fo') == '1');
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
		
		var unfold = el.unfold||0;
		if (toggle) unfold = unfold?0:1;
		var params = 't=topic' + '&unfold=' + unfold + '&r=' + MI.random();
		
		UI.get('/asyn/mysidebar.php', params, function(data) {
			data = MI.json(data);
			if (data.result == 0) {
				if (data.info && data.info.topic) {
					if (toggle) el.unfold = unfold;
					el.innerHTML = data.info.topic;;
				}
				MI.Load.bottom();
			}
		});
		
		if (toggle) MI.Bos(unfold?'btnMoreSub':'btnLessSub');
	},
	newCount : function(type){
		type = type || '4,3,2,1';
		//type = type || '4,3,2', //暂时去掉气泡提示
		setInterval(newCout,30000);
		setTimeout(function(){ //不加延迟，IE中偶尔请求会被阻断
			newCout();
		},10);
		var fail = 0;
		function newCout(){
			if (fail < 6) { //6次未登录后不再拉取
				UI.get('/asyn/newMsgCount.php','type=' + type + '&r=' + MI.random(),function(data){
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
									_num.innerHTML =  num > maxNum ? '<strong>' + maxNum + '</strong>+' : '+<strong>' + num + '</strong>';
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
							if (o.type == 2) {
								target = $('newCoutMsg');
								if (target) {
									target.innerHTML = target && num ? '(' + num + ')' : '';
								}
							}
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
	},
	viewSet : function(id){
		var target = $(id),btn = $$(target,'button'),input = $$(target,'input');
		MI.dialog.show({
			title : '<h1 class="DmainTit">浏览设置</h1>',
			html : target,
			width : 380
		});
		setTimeout(function(){
			btn[0].focus();
		},0);
		MI.Bos('btnViewSet');
		btn[0].onclick = function(){
			var url = UI.parseUrl(),value = [];
			UI.each(input,function(o){
				if (o.checked) {
					url[UI.A(o,'name')] = o.value;
				}
			});
			for (var i in url) {
				value.push(i + '=' + (url[i] || ''));
			}
			document.location.href = document.location.pathname + '?' + value.join('&');
		}
		btn[1].onclick = function(){
			MI.dialog.hide();
		}
	},
	goHome : function(){
		document.location.href = PATH + '/' + MI.user.account;
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
	confirm : function(obj){ //obj = {type:'success',title:'',content:'',confirmTxt:'下一步',confirm:function(){},cancelTxt:'取消',cancel:function(){}}
		var str;
		if(obj) {
			obj.type = obj.type ==  'success' ? 's' : 'e';
			obj.title = obj.title || '';
			obj.content = obj.content || '';
			obj.confirmTxt = obj.confirmTxt || '确定';
			obj.cancelTxt = obj.cancelTxt || '取消';
			if (MI.confirm.html) {
				UI.remove(MI.confirm.html);
				MI.confirm.html = null;
			}
			MI.confirm.html = UI.html('<div class="blackTip"><h2><span class="ico_tsW"><span class="ico_t' + obj.type + '"></span></span>' + obj.title + '</h2><p>' + obj.content + '</p><p><input type="button" value="' + obj.confirmTxt + '" id="__confirmBtn__" /><input type="button" value="' + obj.cancelTxt + '" id="__cancelBtn__" /></p></div>')[0];
			MI.dialog.show({html:MI.confirm.html,width:obj.width||410});
			if (obj.confirm) {
				$('__confirmBtn__').onclick = obj.confirm;
			}
			$('__cancelBtn__').onclick = function(){
				MI.dialog.hide();
				if (obj.cancel) {
					obj.cancel.apply(this);
				}
			}
			setTimeout(function(){
				$('__confirmBtn__').focus();
			},100);
		}
	},
	version : (function(){
		var url = 'http://mat1.gtimg.com/www/mb/',
			js = {
				ui : {
					DatePicker : '100827'
				},
				mi : {
					City : '100831',
					CityAll : '100831',
					Validate : '101115',
					ValidateNew : '101115',
					RelateSelect : '100921',
					Slide : '100806',
					College : '101012',
					Theme : '100913',
					Tag : '101122',
					List : '101129',
					SettingEdu : '101117',
					SettingWork : '101117',
					Music : '101130',
					QQMusicInstance : '101022',
					QQMusicPlayer : '101022',
					QQMusicWmpPlayer : '101022',
					QQMuicHtml5Player : '101022'
				}
			},
			css = {
				ui : {
					datePicker : '100827'
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
			MI._app[i] = obj[i];
		}
		if (MI.appLoaded) {
			MI.appLoad();
		}
	},
	_app : {},
	appLoad : function(){
		var css;
		for (var i in MI._app) {
			if (!MI[i]) {
				UI.getScript(MI.version[i],MI._app[i]);
				css = MI.version[i.slice(0,1).toLocaleLowerCase() + i.slice(1)];
				if (css) {
					UI.getCss(css);
				}
				css = 0;
			}
			else if(MI._app[i]){
				MI._app[i]();
			}
		}
		MI.appLoaded = 1;
		MI._app = {};
	},
	appLoaded : 0,
	jumpEvent : function(el){
		UI.each(el,function(o){
			var pref = config.pref ? config.pref : 'qqcom.radiowb';
			var url = UI.A(o,'href');
			if(url.hasString('qq.com') && !url.hasString(pref)){
				if (UI.B.ie6) {
					url = encodeURI(UI.utfDecode(url));
				}
				UI.A(o,'href',(UI.B.ie ? ' ' : '') + url + (url.hasString('?') ? '&' : '?') + 'pref='+pref);
			}
		});
	}
}

MI.SmartBox = function(id,callback,type,style){ //input element,callback,search type
	if(!$(id)) return;
	var Self = this;
	this._callback = callback?callback:null;
	this._key = $(id);
	this.url = '/asyn/messagetips.php';//smartbx统一服务接口
	this._type = type?type:'';//数据类型
	this._fix = UI.B.ie?[0,0]:[1,2];//用于修复ie，ff下的位置
	this.param = 'key=%key%';

	this._style = style?style:{left:0,top:0,width:306};
	this._pos = { //获取smartbox input 坐标
		x : UI.getX(this._key),
		y : UI.getY(this._key)
	};

	//初始化smartbox容器
	this._select = UI.html('<div class="smartBox"></div>')[0];
	this._list = [];//消息条数
	UI.append(this._select,document.body);
	this._key.blur();
	Self.hide();

	this._tip = this._key.previousSibling,this.tip = this._tip && this._tip.nodeName == 'LABEL';
	if (this.tip) {
		this._tip.onclick = function(){
			Self._key.focus();
		}
	}

	UI.EA(document.body,'click',function(){
		Self.hide();
	});
	/*UI.EA(window,'resize',function(){
		Self.resize();
	});*/
	UI.EA(this._key,'focus',function(){
		if (Self.tip) {
			UI.hide(Self._tip);
		}
		if(!Self.isDisplay) Self.hide();
		Self.getMsg(Self._key.value);
	});
	UI.EA(this._key,'blur',function(e){
		var target = UI.E(e).target;
		if(Self.tip && !target.value){
			UI.show(Self._tip);
		}
		setTimeout(function(){
			Self.hide();
		},500);
	});

	/*this._key.onblur = function(){
		if(!this.value) UI.show(UI.prev(this));
	}*/
	this._key.onbeforeeditfocus = function(){
		if(!Self.isDisplay) Self.hide();
	}
	this._key.onclick = function(e){
		UI.E(e).stop();
	}
	this._key.onkeydown = function(e){
		var E = UI.E(e);
		//document.title = Self.isDisplay;
		if(!Self.isDisplay){				
			if(UI.trim(this.value)){
				if(Self._list.length > 0 && (E.key == 40 ||E.key == 38)){
					Self.show();
				}else{
					Self.getMsg(this.value);
				}
			}
			return;
		}
		if (E.key == 40 || E.key == 38) {
			if (E.key == 38) {
				Self.index = (Self.index - 1 < 0) ? (Self.indexMax) :(Self.index - 1);
			}else if (E.key == 40) {
				Self.index = (Self.index + 1 > Self.indexMax) ? 0 :(Self.index + 1)
			}
			this.value = Self._list[Self.index].innerHTML;
			Self.select(Self.index);
		}else if (E.key == 13 || E.key == 27) { //Space Key : || E.key == 32 || E.key == 229
			if (E.key == 27) {
				Self.hide();
			}
			else {
				Self.select();
			}
		}
	}
	this._key.onkeyup = function(e){
		var E = UI.E(e);
		if(E.key == 40 || E.key == 38 || E.key == 13 || E.key == 27) return;
		Self.getMsg(this.value);
	}
}
MI.SmartBox.prototype = {
	//keyword : '',
	lastOrigin : null,
	isDisplay : false,
	timer : null,
	index : -1,
	indexMax : 0,
	hide : function(){
		UI.hide(this._select);
		this.isDisplay = false;
	},
	show : function(){
		if (!MI.user.fun.search) {
			return;
		}
		this.resize();
		UI.show(this._select);
		this.isDisplay = true;
	},
	select : function(index){
		this.index = index;
		if (this._list[this.index]) UI.addClass(this._list[this.index],'on');
		if (this.lastOrigin) UI.removeClass(this.lastOrigin,'on');
		this.lastOrigin = this._list[this.index];
	},
	resize : function(){
		var a = {
			x : UI.getX(this._key),
			y : UI.getY(this._key)
		}
		this._pos = a;
		this._select.style.width = this._style.width + 'px';
		this._select.style.left = this._pos.x + this._style.left + this._fix[0] + 'px';
		this._select.style.top = this._pos.y + this._key.offsetHeight + this._style.top - this._fix[1] + 'px';
	},
	getMsg : function(value){
		var Self = this;
		//document.title = UI.trim(value);
		//if(tmp == this.keyword){
		if(!UI.trim(value)){
			Self.hide();
			//this.keyword = tmp;
			return;
		}
		//}
		//this.keyword = UI.trim(value);
		var param = this.param.replace(/\%key\%/g,encodeURIComponent(value));
		if(this.timer)	clearTimeout(this.timer);
		if(this._type == 'music'){
			this.timer=window.setTimeout(function(){
				UI.getScript(Self.url+"?"+param);
			},150);
		}else{
			this.timer=window.setTimeout(function(){
				UI.get(
					Self.url,
					param,//"key=" + encodeURIComponent(value),
					function(data){
						data = MI.json(data);
						if (data.result == 0) {
							if(data.info){
								var s = [];
								var l = data.info.length;
								Self.indexMax = l - 1;
								Self.index = -1;
								s.push('<ul>');
								for(var i in data.info){
									//s.push('<p>' + Self.termJson(data.info[i],[Self.keyword]) + '</p>');
									s.push('<li value=\"'+ data.info[i] +'\" index="' + i + '">' + data.info[i] + '</li>');
								}
								s.push('</ul>');
								if (s.length == 2) {
									return;
								}
								Self._select.innerHTML = s.join("");
								Self.show();
								Self._list = $$(Self._select,'li');
								//Event
								UI.each(Self._list,function(el,i){
									el.onmouseover = function(){
										Self.select(i);
									}
									el.onclick = function(){
										Self._key.value = this.innerHTML;
										UI.A(Self._key,'index',UI.A(this,'index'));
										Self.submit();
									}
								});
							}else{Self.hide();}
							
							//Callback Function
							//if (call) {
								//call();
							//}
						}else{Self.hide();}
					}
				)
			},150);
		}
	},
	submit : function(){
		if(this._callback) this._callback();
		//var action = this.action,value = encodeURIComponent(this._key.value);
		//document.location.href = action + (action.hasString('?') ? value : encodeURIComponent(value));
	}
}
MI.AutoCmt = function(o){ //Auto Complete
	/*
		URL : /asyn/nicktips.php?type=1&num=100 //0-All, 1-Following, 2-Followed(Use In Message)
		{
			"result":0,
			"msg":"成功",
			"info":{"222":"\u5730\u65b9","232":"\u5730\u65b9\u5730\u65b9"} //[id,name]
		}
	*/
	var Self = this;
	Self._target = o.target;
	Self.key = o.key;
	Self.call = o.call; //Call Back After Select
	Self.clickCall = o.clickCall; //Call Back After Click Select List
	Self.type = o.type || 0; //Type
	Self.align = o.align || 'left'; //Align Action
	Self.minWidth = o.minWidth; //Min Width

	//Dom
	Self._shadow = UI.html('<div class="txtShadow"><span></span><b>|</b><span></span></div>')[0];
	UI.after(Self._shadow,o.target);
	Self._txt = Self._shadow.firstChild;
	Self._cursor = Self._txt.nextSibling;
	Self._txtEnd = Self._shadow.lastChild;
	if (UI.B.ie) {
		UI.before(UI.html('<b style="display:none;width:0;overflow:hidden">\001</b>')[0],o.target);
	}
	//Self._body = UI.html('<ul class="autoCmt" style="display:none"></ul>')[0];

	//Event
	UI.EA(o.target,'keydown',function(e){
		if (!Self.display || !UI.isNumber(Self.index)) {
			return;
		}
		var E = UI.E(e);
		if (E.key == 40 || E.key == 38) {
			UI.removeClass(Self.list[Self.index],'on');
			if (E.key == 38) {
				Self.index--;
			}
			else if (E.key == 40) {
				Self.index++;
			}
			if (Self.index < 0) {
				Self.index = Self.indexMax;
			}
			else if (Self.index > Self.indexMax) {
				Self.index = 0;
			}
			UI.addClass(Self.list[Self.index],'on');
			Self._body.scrollTop = (Self.index - 4) * 21;
			Self.clicks = 1;
			clearTimeout(Self.delay);
			E.prevent();
		}
		else if (E.key == 13 || E.key == 27) { //Space Key : || E.key == 32 || E.key == 229
			if (E.key == 27) {
				Self.hide();
			}
			else {
				Self.select();
			}
			Self.clicks = 1;
			clearTimeout(Self.delay);
			E.prevent();
		}
	});
	/**/
	//UI.EA(window,'resize',hide);
	UI.EA(document.body,'click',hide);
	/*UI.EA(Self._target,'click',function(e){
		UI.E(e).stop();
	});*/
	//UI.EA(Self._target,'blur',hide);
	UI.EA(o.target,'keyup',show);
	UI.EA(o.target,'focus',show);
	UI.EA(o.target,'mouseup',show);
	function show(e){
		var E = UI.E(e);
		clearTimeout(Self.delay);
		Self.delay = setTimeout(function(){
			_show();
		},150);
	}
	function _show(){
		var text,textEnd,textLength,
			value = Self._target.value;
		if (Self.clicks > 0) {
			Self.clicks--;
			return;
		}
		Self.cursorX = MI.cursorX(Self._target);
		value = value.replace(/\r/g,'');
		text = value.slice(0,Self.cursorX).replace(/＠/,'@');
		if (!Self.key && text.match(/^@/)) {
			Self.filter = '@';
			text = text.replace(/^@/,'');
		}
		else {
			Self.filter = '';
		}
		textEnd = value.slice(Self.cursorX);
		Self.word = Self.key ? text.match(/@[^\s@\n\r]{0,64}$/g) : text.match(/[^\s\n\r]{0,64}$/g);
		if (Self.word) {
			Self.word = Self.word[0];
			textLength = Self.word.length;
			if (textLength > 1) {
				text = text.slice(0,- textLength + 1);
			}
		}
		else {
			clearTimeout(Self.delay);
			Self.hide();
			return;
		}
		Self._txt.innerHTML = Self.key ? text.replace(/\r\n|\n/g,'<br>').replace(/ /g,'&nbsp;') : '';
		Self._txtEnd.innerHTML = textEnd.replace(/\r\n|\n/g,'<br>').replace(/ /g,'&nbsp;');

		//if (Self.word) { //E.key == 50
			if (!Self._body.appended) {
				UI.append(Self._body,document.body);
				Self._body.appended = 1;
				/*Self._body.onmouseover = function(e){
					var E = UI.E(e);
					if (E.target.nodeName == 'LI') {
						if (Self.index == null) {
							Self.index = 0;
						}
						UI.removeClass(Self.list[Self.index],'on');
						UI.addClass(E.target,'on');
						Self.index = E.target.index;
					}
				}*/
				/*Self._body.onmouseup = function(e){
					var E = UI.E(e);
					if (E.target != this) {
						Self.select();
					}
				}*/
				UI.EA(window,'beforeunload',function(){ //Store User Count
					var key = 'top_' + MI.user.account;
					if (MI.isS) {
						var arr = [];
						for (var i in MI.users) {
							arr.push(i + ':' + MI.users[i]);
						}
						MI.S(key,'{' + arr.join(',') + '}');
					}
				})
			}

			var type = 'follow_' + Self.type + '_',
				usersStorageKey = type + MI.user.account,
				usersTopStorageKey = 'top_' + MI.user.account,
				usersStorageKeyPY = usersStorageKey + '_PY',
				//usersKey = type + 'users',
				users = MI.S(usersStorageKey),
				usersTop = MI.S(usersTopStorageKey);
			if (!MI.isS) {
				return;
			}
			if (!usersTop) {
				MI.S(usersTopStorageKey,'{}')
			}
			if (!MI.users) {
				MI.users = MI.json(MI.S(usersTopStorageKey));
				Self.sort();
			}
			if (!Self.sending && (!users || (new Date().getTime() - MI.S('time') > 7200000) || !newData(users))){ //3600000
				Self.sending = 1;
				UI.get('/asyn/nicktips.php','user=' + MI.user.account + '&type=' + (Self.type ? Self.type : 0) + '&num=' + (UI.B.ie ? 1000 : 2000),function(data){
					//旧data = '{"result":0,"info":{"hecaitou":"Lecter","clarence":"kaka","pony":"pony","patrick":"贺炜","thomas":"唐沐"}}';
					//新data = '{"result":0,"info":[["hecaitou","Lecter","L|e|c|t|e|r"],["clarence","kaka","k|a|k|a"],["pony","pony","p|o|n|y"],["patrick","贺炜"],["thomas","唐沐",'tang|mu']]}';
					//var Data = MI.json(unescape(data));
					var Data = MI.json(data);
					if (Data.result == 0) {
						MI.S(usersStorageKey,data);
						MI.S('time',new Date().getTime());
						var ret = parseData(Data);
						MI[usersStorageKey] = ret[0];
						MI[usersStorageKeyPY] = ret[1];
						Self.show(MI[usersStorageKey], MI[usersStorageKeyPY]);
					}
					Self.sending = 0;
				});
			}
			else {
				if (!MI[usersStorageKey]) {
					var ret = parseData(MI.json(users));
					MI[usersStorageKey] = ret[0];
					MI[usersStorageKeyPY] = ret[1];
				}
				/*
				if (MI[usersStorageKey] && MI[usersStorageKey].info) {
					MI[usersStorageKey].info[MI.user.account] = MI.user.name; //Add Current User's Account
				}
				*/
				Self.show(MI[usersStorageKey], MI[usersStorageKeyPY]);
			}
		/*}
		else {
			Self.hide();
		}*/
	}
	function hide(){
		Self.hide();
	}
	function parseData(data) {
		//旧data = '{"result":0,"info":{"hecaitou":"Lecter","clarence":"kaka","pony":"pony","patrick":"贺炜","thomas":"唐沐"}}';
		//新data = '{"result":0,"info":[["hecaitou","Lecter","L|e|c|t|e|r"],["clarence","kaka","k|a|k|a"],["pony","pony","p|o|n|y"],["patrick","贺炜"],["thomas","唐沐",'tang|mu']]}';
		var nick = {info:{}}, py = {};
		if (UI.isArray(data.info)) {
			for (var i=0; i<data.info.length; ++i) {
				nick.info[data.info[i][0]] = data.info[i][1];
				if (data.info[i][2]) py[data.info[i][0]] = [data.info[i][2].toLowerCase(), MI.MatchPY.whole2sim(data.info[i][2])];
			}
		} else nick = data;
		return [nick, py];
	}
	// 新数据
	function newData(users) {
		return users.indexOf(']]}') != -1;
	}
}
MI.AutoCmt.prototype = {
	_body : UI.html('<ul class="autoCmt" style="display:none"></ul>')[0],
	display : 0,
	clicks : 0,
	index : 0,
	filter : '', //Filter @
	select : function(){
		if (UI.isNumber(this.index)) {
			var scrollTop = this._target.scrollTop,
				txt = this.list[this.index].txt,
				count;
			this._target.focus();

			//Save Use History
			MI.insertTxt(this._target,txt + ' ',this.cursorX,this.word.slice(1).length);
			count = MI.users[txt];
			MI.users[txt] = count ? count + 1 : 1;

			if (!this.key) {
				this._target.value = this.filter + txt;
			}
			if (this.call) {
				this.call();
			}
			this._target.scrollTop = scrollTop;
			this.hide();
		}
	},
	show : function(o, py){
		py = py || {};
		var Self = this;
		//if (this.word) {
			var match = [],
				matchLength = 0,
				hasWord = this.word,
				//word = MI.string.html(this.word.slice(1)),
				word = this.key ? this.word.slice(1) : this.word,
				regTxt = MI.string.escapeReg(word),
				reg = new RegExp('(^' + regTxt + ')','i'),
				regAll = new RegExp('(' + regTxt + ')','ig'),
				length = word.length,
				m,
				n,
				//html = word ? '<b>' + word + '</b>' : '',
				//html = 'з' + word + 'З',//有风险，暂时先这样，没有更好办法了
				index = 0,
				txt = [],
				txtObj = {},
				x,
				y,
				users = o.info;
			if (word) {
				for (var i in users) {
					/*if (!word && index > 9) {
						break;
					}*/
					if (matchLength >= 40) {
						break;
					}
					if (i.match(reg) || users[i].match(reg)) {
						//match.push(MI.string.html(o.info[i].replace(reg,html) + ' (' + i.replace(reg,html) + ')').replace(/з/,'<b>').replace(/З/,'</b>'));
						match.push(users[i].replace(reg,'<b>' + RegExp.$1 + '</b>') + ' (' + i.replace(reg,'<b>' + RegExp.$1 + '</b>') + ')');
						txt.push(i);
						txtObj[i] = 1;
						matchLength++;
					}
					index++;
				}
				if (matchLength < 40) {
					var w = word.toLowerCase();
					var rs;
					for (var i in users) {
						if (matchLength >= 40) {
							break;
						}
						if (!py[i] || txtObj[i]) continue;
						rs = MI.MatchPY.sim(py[i][1], w);
						if (rs) {
							match.push(users[i].substring(0, rs[0]) + '<b>' + users[i].substring(rs[0], rs[0]+rs[1]) + '</b>' + users[i].substring(rs[0]+rs[1]) + ' (' + i + ')');
							txt.push(i);
							txtObj[i] = 1;
							matchLength++;
						}
						index++;
					}
				}
				if (matchLength < 40) {
					var w = word.toLowerCase();
					var rs;
					for (var i in users) {
						if (matchLength >= 40) {
							break;
						}
						if (!py[i] || txtObj[i]) continue;
						rs = MI.MatchPY.whole(py[i][0], w);
						if (rs) {
							match.push(users[i].substring(0, rs[0]) + '<b>' + users[i].substring(rs[0], rs[0]+rs[1]) + '</b>' + users[i].substring(rs[0]+rs[1]) + ' (' + i + ')');
							txt.push(i);
							txtObj[i] = 1;
							matchLength++;
						}
						index++;
					}
				}
				if (matchLength < 40) {
					for (var i in users) {
						if (matchLength >= 40) {
							break;
						}
						if (( i.slice(1).match(regAll) || users[i].slice(1).match(regAll) ) && !txtObj[i]) {
							match.push(users[i].replace(regAll,'<b>' + RegExp.$1 + '</b>') + ' (' + i.replace(regAll,'<b>' + RegExp.$1 + '</b>') + ')');
							txt.push(i);
							txtObj[i] = 1;
							matchLength++;
						}
						index++;
					}
				}
			}
			else {
				if (MI.usersArr) {
					this.sort();
					for (var i = 0,num = MI.usersArr.length;i < num;i++) {
						if (i >= 10) {
							break;
						}
						var userName = MI.usersArr[i].account,userNick = o.info[userName]
						if(userNick) { //判断常用联系人是否在当前联系人中
							match.push(userNick + ' (' + userName + ')');
							matchLength++;
							txt.push(userName);
						}
					}
				}
			}
			//matchLength = match.length;
			if (matchLength) {
				if (matchLength > 10) {
					this._body.style.cssText = 'height:210px;overflow-y:scroll;overflow-x:hidden;';
					this._body.scrollTop = 0;
				}
				else {
					this._body.style.cssText = '';
				}
				this._body.innerHTML = '<li class="on"><span>' + match.join('</span></li><li>') + '</span></li>';
				this.list = this._body.childNodes;
				UI.each(this.list,function(o,i){
					UI.EA(o,'click',select);
					UI.EA(o,'mouseover',hover);
					o.txt = txt[i];
					o.index = i;
				});
				this.display = 0;
				this.index = 0;
				this.indexMax = this.list.length - 1;
			}
			else {
				this._body.innerHTML = '';
				this.indexMax = 0;
				this.hide();
				return;
			}
			if (!this.display) {
				if (this.key) {
					x = UI.getX(this._cursor) - 12;
					y = UI.getY(this._cursor) - this._target.scrollTop + 26;
				}
				else {
					x = UI.getX(this._target);
					y = UI.getY(this._target) + UI.height(this._target) - 1;
				}
				if (this.minWidth && UI.width(this._body) <= this.minWidth) {
					this._body.style.width = this.minWidth + 'px';
				}
				if (this.align == 'right') {
					x = x - (UI.width(this._body) - UI.width(this._target));
				}
				this._body.style.cssText += ';top:' + y + 'px;left:' + x + 'px';
			}
			this.display = 1;
		/*}
		else {
			this.hide();
		}*/
		function select(){
			Self.select();
			if (Self.clickCall) {
				Self.clickCall();
			}
		}
		function hover(e){
			var E = UI.E(e);
			if (E.target.nodeName == 'LI') {
				if (Self.index == null) {
					Self.index = 0;
				}
				UI.removeClass(Self.list[Self.index],'on');
				UI.addClass(E.target,'on');
				Self.index = E.target.index;
			}
		}
	},
	hide : function(){
		if (this.display) {
			UI.hide(this._body);
			this.index = null;
		}
	},
	sort : function(){ //Sort For Top Users
		delete MI.usersArr;
		var usersArr = [];
		for (var i in MI.users) {
			usersArr.push({account:i,count:MI.users[i]});
		}
		MI.usersArr = usersArr.sort(function(a,b){return b.count - a.count});
	}
}

MI.MatchPY = {
	sp: '|',
	sim: function(py, word) {
		var idx = py.indexOf(word);
		return (idx == -1) ? null : [idx, word.length];
	},
	whole: function(py, word) {
		var Self = this;
		var arr = py.split(Self.sp);
		var str = arr.join('');
		var len = arr.length;
		if (len == 1) return str == word ? [0, 1] : null;
		for (var i=0; i<len; ++i) {
			if (Self.startsWith(str, word)) {
				return [i, Self.len(arr, i, word)];
			}
			str = str.substring(arr[i].length);
		}
		return null;
	},
	whole2sim: function(whole) {
		var arr = whole.split(this.sp);
		var str = '';
		for (var i=0; i<arr.length; ++i) str += (arr[i].charAt(0)||'?');
		return str.toLowerCase();
	},
	len: function(arr, start, word) {
		var len = word.length;
		var sum = 0;
		var size = arr.length;
		for (var i=start; i<size; ++i) {
			sum += arr[i].length;
			if (len == sum) return i-start+1;
			else if (len < sum) return i-start;
		}
		return size;
	},
	startsWith: function(str, prefix) {
		return str.lastIndexOf(prefix, 0) == 0;
	}
}

MI.Dialog = function(o){ //Dialog
	o = o || {};
	var Self = this;

	//Dom
	//Self._body.innerHTML = o.tmpl || '<div class="bg"></div><div class="CR"><div class="top"><span class="left"><em></em></span><span class="right"><em></em></span></div><div class="DTitle"></div><a' + V5 + ' class="DClose" title="关闭">关闭</a><div class="DLoad"></div><div class="DCont"></div><div class="bot"><span class="left"><em></em></span><span class="right"><em></em></span></div></div>';
	var html = o.tmpl || '<div class="D">' + (UI.B.ie6 ? '<iframe src="javascript:false;" class="cover_select"></iframe>' : '') + '<div class="bg"></div><div class="CR"><table border="0" cellspacing="0" cellpadding="0" class="tbSendMsg"><tr><td class="tl"></td><td class="tm"></td><td class="tr"></td></tr><tr><td class="lm"></td><td><div class="DWrap"><div class="DTitle"></div><a title="关闭" class="DClose close" href="#">关闭</a><div class="DLoad"></div><div class="DCont"></div></div></div></td><td class="rm"></td></tr><tr><td class="bl"></td><td class="bm"></td><td class="br"></td></tr></table></div></div>';
	Self._body = UI.html(html)[0];
	Self._bg = Self.$('.bg');
	Self._cover = Self.$('.cover_select');
	Self._wrap = Self.$('.CR');
	Self._title = Self.$('.DTitle');
	Self._close = Self.$('.DClose');
	Self._cont = Self.$('.DCont');
	Self._load = Self.$('.DLoad');

	//Event
	/*Self.key = function(e) {
		switch(UI.E(e).key) {
			case 27:
				Self.hide();
				break;
		}
	};*/
	Self.resizeBg = function(init){
		if (Self.display) {
			if (UI.B.ie) Self._bg.style.cssText += ';width:100%;';
			Self.delay = setTimeout(function(){
				var h_page = UI.pageHeight(),h_window = UI.windowHeight();
				Self._bg.style.cssText += ';margin-left:0;width:' + UI.pageWidth() + 'px;height:' + (h_page < h_window ? h_window : h_page) + 'px;';
				if (UI.B.ie6) {
					Self._cover.style.cssText = Self._bg.style.cssText;
				}
			},0);
		}
	};
	var wrap = Self._wrap;
	Self._title.onmousedown = Self._title.ontouchstart = function(e) { //Move
		var E = UI.E(e);
		var _x = E.x - parseInt(wrap.style.marginLeft);
		var _y = E.y - parseInt(wrap.style.marginTop);
		var w = UI.windowWidth(),h = UI.windowHeight(); //Kill Bug
		E.prevent();
		//UI.addClass(wrap,'move');
		document.onmousemove = document.ontouchmove = function(e) {
			var E = UI.E(e);
			if (!UI.B.ie && (E.x < 0 || E.y < 0 || E.x > w || E.y > h)) return false;
			wrap.style.marginTop = E.y - _y + 'px';
			wrap.style.marginLeft = E.x - _x + 'px';
			return false;
		}
		document.onmouseup = document.ontouchend = function() {
			document.onmousemove = document.ontouchmove = null;
			document.onmouseup = document.ontouchend = null;
			//UI.removeClass(wrap,'move');
		}
		return false;
	};
	//UI.EA(document,'keyup',Self.key);
	UI.EA(window,'resize',Self.resizeBg);
	Self._close.onclick = function(){
		Self.hide();
		return false;
	}
}
MI.Dialog.prototype = {
	width : 462,
	close : 1,
	show : function(o){
		var Self = this,css;
		if (!Self._append) {
			document.body.appendChild(Self._body);
			Self._append = 1;
			//UI.C(Self._bg,'marginLeft','-9999px');
		}

		Self.close = o.close != undefined ? o.close : Self.close;
		Self.ico = o.ico;
		if (Self.close) {
			UI.show(Self._close);
		}
		else UI.hide(Self._close);

		Self._title.innerHTML = o.title || '';
		UI.C(Self._title,'height',o.title ? '' : '0');
		if (o.html) {
			for (var i = 0,num = Self._cont.childNodes.length;i < num;i++) {
				var contChild = Self._cont.childNodes[i];
				if (contChild.nodeType == 1) {
					UI.hide(contChild);
					UI.append(contChild,document.body);
				}
			}
		}
		if (UI.isString(o.html)) {
			Self._cont.innerHTML = o.html;
		}
		else if (UI.isObject(o.html)) {
			UI.append(o.html,Self._cont);
			UI.show(o.html);
		}
		if (o.width) {
			Self.width = o.width;
		}
		if (o.height) {
			Self.height = o.height;
		}
		UI.C(Self._wrap,'width',Self.width + 'px');
		UI.C(Self._wrap,'opacity',0);
		UI.show(Self._body);
		if (Self.height) {
			UI.C(Self._cont,'height',Self.height + 'px');
		}

		css = 'width:' + Self.width + 'px;margin:' + ( UI.scrollY() - UI.height(Self._wrap)/2 ) + 'px 0 0 -' + Self.width/2 + 'px;';
		if (o.left != undefined) {
			css += 'left:' + o.left + 'px;margin-left:0;';
		}
		if (o.top != undefined) {
			css += 'top:' + o.top + 'px;margin-top:0;';
		}
		setTimeout(function(){
			Self.resizeBg();
			Self._wrap.style.cssText = css;
		},0);
		Self._wrap.style.cssText = css;

		//Function
		if (o.html) {
			if (o.start) { //Run When Open Dialog
				o.start();
			}
			if (o.end) { //Run When Close Dialog
				Self.end = o.end;
			}
			else Self.end = null;
			if (this.call) { //Run Callback Function When Open Dialog
				this.call();
			}
		}

		Self.display = 1;
		if (!UI.B.firefox) {
			UI.C(UI.B.ie ? document.documentElement : document.body,'overflowX','hidden');
		}
	},
	hide : function(){
		UI.hide(this._body);
		this.hideLoad();
		if (this.end) {
			this.end();
		}
		this.display = 0;
		if (!UI.B.firefox) {
			UI.C(UI.B.ie ? document.documentElement : document.body,'overflowX','auto');
		}
	},
	showLoad : function(target,top,left,width,height){
		target = target || this._cont;
		var css = '',
			width = width || UI.width(target),
			height = height || UI.height(target);
		if (UI.isNumber(top)) {
			css += 'top:' + top + 'px;';
		}
		if (UI.isNumber(left)) {
			css += 'left:' + left + 'px;';
		}
		this._load.style.cssText = 'width:' + width + 'px;height:' + height + 'px;' + css;
	},
	hideLoad : function(){
		UI.hide(this._load);
	},
	showTip : function(o){ //{html:'发送成功！',ico:'ico_te',delay:1000}
		var Self = this,close = Self.close;
		o.close = 0;
		o.html = '<div class="popBox"><span class="ico_tsW"><span class="' + (o.ico ? o.ico : 'ico_ts') + '"></span></span><h2>' + o.html + '</h2><p></p></div>';
		o.end = o.end || Self.end;
		Self.show({width:9999});
		Self.show(o);
		Self.show({width:UI.width(Self._cont) + 40});
		setTimeout(function(){
			Self.hide();
			Self.close = close;
		},o.delay ? o.delay : 1000);
	},
	alert : function(str,call){
		var Self = this,btn;
		Self.show({width:9999});
		Self.show({html:'<div class="popBox"><span class="ico_tsW"><span class="ico_te"></span></span><h3>' + str + '</h3><p><input type="button" value="知道了" onclick="MI.dialog.hide()"></p></div>',end:call});
		setTimeout(function(){
			Self.show({width:UI.width(Self._cont) + 40});
			btn = $$(Self._cont,'input')[0];
			if (btn) {
				btn.focus();
			}
		},0);
	},
	$ : function(className){
		return $$(this._body,className)[0];
	}
}
/*MI.DialogTip = function(o){
	var Self = this;
	o = o || {};
	o.tmpl = '<div class="bg"></div><div class="CR"><div class="DTitle"></div><div class="DClose"></div><div class="DLoad"></div><div class="floatTip"><div class="lside"></div><span class="ico_tsW"><span class="ico_ts"></span></span><b class="DCont"></b><div class="rside"></div></div>';//ico_ts ico_te
	MI.Dialog.call(this,o);
	UI.hide(this._close);
	this.close = 0;
	this.delayHide = 1000;
	this.width = 860
	this._tip = this._cont.parentNode;
	this._tipWrap = $$(this._body,'.floatTip')[0];
	this._ico = $$(this._body,'.ico_tsW span')[0];
	UI.hide(this._title);
	this.call = function(){
		Self._ico.className = Self.ico || 'ico_ts';
		Self._tipWrap.style.marginLeft = - UI.width(Self._tipWrap) / 2 + 'px';
		clearTimeout(Self._delay);
		Self._delay = setTimeout(function(){
			//Self.hide();
			UI.animate(Self._tip,'opacity',0,function(){
				Self.hide();
				UI.C(Self._tip,'opacity',1);
			});
		},Self.delayHide);
	}
}
MI.DialogTip.prototype = MI.Dialog.prototype;

MI.DialogMsg = function(o){
	o = o || {};
	//o.tmpl = '<div class="bg"></div><div style="position:absolute;z-index:999;top:0;left:25%;padding:25px" class="CR"><table border="0" cellspacing="0" cellpadding="0" class="tbSendMsg"><tr><td class="tl"></td><td class="tm" style="overflow:hidden"></td><td class="tr"></td></tr><tr><td class="lm"></td><td style="*padding:0;"><div class="floatWrap"><div class="close DClose"></div><div class="DTitle" style="padding:0;border:0;"></div><div class="DLoad"></div><div class="DCont" style="padding:0;border:0;background:none;"></div></div></td><td class="rm"></td></tr><tr><td class="bl"></td><td class="bm"></td><td class="br"></td></tr></table></div></div>';
	o.tmpl = '<div class="bg"></div><div class="D"><div class="CR"><table border="0" cellspacing="0" cellpadding="0" class="tbSendMsg"><tr><td class="tl"></td><td class="tm"></td><td class="tr"></td></tr><tr><td class="lm"></td><td><div class="DWrap"><div class="DTitle"></div><div class="DClose close"></div><div class="DLoad"></div><div class="DCont"></div></div></td><td class="rm"></td></tr><tr><td class="bl"></td><td class="bm"></td><td class="br"></td></tr></table></div></div>';
	MI.Dialog.call(this,o);
}
MI.DialogMsg.prototype = MI.Dialog.prototype;*/
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
MI.Code = function(){
	var Self = this;
	this._body = UI.html(MI.tmpl.code)[0];
	this._msg = $$(this._body,'h3')[0]; //
	this._code = $$(this._body,'img')[0];
	this._form = $$(this._body,'form')[0];
	this._codeChange = $$(this._body,'.codeChange')[0];
	this._btn = $$(this._body,'button');
	this._value = $$(this._body,'input')[0];

	//Event
	this._btn[0].onclick = submit;
	this._btn[1].onclick = function(){
		MI.dialog.hide();
	}
	this._codeChange.onclick = function(){
		Self._code.src = UI.A(Self._code,'crs') + '&' + Math.random();
		Self._value.focus();
		return false;
	}
	this._form.onsubmit = submit;
	function submit(){
		var value = Self._value.value;
		if (!value || value.length < 4 || value.length > 5) {
			Self._value.focus();
			Self._msg.innerHTML = '你输入的验证码有误，请重新输入';
		}
		else if (value) {
			MI.dialog.hide();
			if (Self.call) {
				setTimeout(function(){
					Self.call(value);
				},300);
			}
		}
		return false;
	}
}
MI.Code.prototype = {
	show : function(o){ // o = {msg:'您的操作出现异常，请输入验证码',code:'http://ptlogin2.qq.com/getimage?aid=13001401&Math.random()',call:function(){}}
		var Self = this,dialog = MI.dialog,content,width;
		this._msg.innerHTML = o.msg;
		this._value.value = '';
		this.call = o.call;
		this._code.src = o.code + '&' + Math.random();
		UI.A(this._code,'crs',o.code);
		if (dialog.display) { //Show Old Dialog When Close Verify Code's Dialog
			content = dialog._cont.firstChild;
			width = dialog.width;
			Self.end = function(){
				dialog.show({html:content,width:width,end:function(){
					Self.end = null;
				}});
			}
		}
		dialog.show({
			html:this._body,
			width:o.width || 363,
			end:Self.end
		});
		setTimeout(function(){
			Self._value.focus();
		},0);
	}
}
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
MI.Tips.txt = ['这条消息来自手机微博。<br>想要成为微博手机达人？点<a href="'+PATH+'/client.php?t=mobile" onclick="MI.Bos(\'btnPhoneIconTip\')" target="_blank" class="ulink">这里</a>'];
MI.Tips.url = {};
MI.Load = function(id,url,type,boss){
	var _fold='收起',
		_unfold='展开',
		_loading='loading',
		_folded='fold',
		isRefresh,
		r = MI.random();
	if (UI.isArray(id) && id.length) {
		UI.each(id,function(o){
			var el = $(o),P = el.parentNode,btn = $$(P,'h3 .btn')[0] || UI.DC('a');
			//UI.addClass(btn,_loading);
		});
		UI.get(url,'t=' + type.join(',') + '&r=' + r,function(data){
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
		UI.get(url,'t=' + type + '&r=' + r,function(data){
			data = MI.json(data);
			if (data.result == 0){
				loaded(id,data.info[type]);
				MI.Load.bottom();
			}
			UI.removeClass(btn,_loading);
			UI.A(el,'refresh','')
		});
	}
	else {
		UI.toggleClass(P,_folded);
	}
	MI.Load.bottom();
	btn.blur();
	if (!isRefresh) {
		MI.S('option_' + type + '_' + MI.user.account,folded ?  1 : -1);
		if (boss != 0) {
			MI.Bos('btn' + (folded ? 'Un' : '') + 'Fold' + type);
		}
	}

	//Loaded Success
	function loaded(id,html){
		var el = $(id),P = el.parentNode,btn = $$(P,'h3 .btn')[0],folded = UI.hasClass(P,_folded);
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
MI.PV = function(name){
	if (window.pvCurUrl && pvCurUrl != '') {
		//if (!pvCurUrl.match(new RegExp(name + '$'))) {
			pvCurUrl = '/' + name;
		//}
		pvRepeatCount = 1;
		if(typeof(pgvMain) == 'function') pgvMain();
	}
}
MI.Bos = function(op,value){ //Boss Using : MI.Bos('frontClick');
	try{
		var ouin = MI.Uin(),data = '';//UI.trim(UI.cookie('o_cookie'));
		value = value || MI.boss;
		if (UI.isNumber(value)){
			data = '&sServerIp=&iBackInt1=' + value + '&iBackInt2=&sBackStr1=';
		}
		else if(UI.isString(value)){
			data = '&sServerIp=&iBackInt1=&iBackInt2=&sBackStr1=' + value;
		}
		MI.Bos.pic.src = 'http://btrace.qq.com/collect?sIp=&iQQ=' + ouin + '&sBiz=microblog&sOp=' + op + '&iSta=0&iTy=291&iFlow=0' + data;
	}catch(e){alert(e)}
}
MI.Uin = function(){
	var uin = UI.cookie('uin') || UI.cookie('luin');
	if (!uin) return 0;
	
	uin = parseInt(uin.replace(/[^\d]/g, ''), 10);
	if (!isNaN(uin) && (uin > 10000)) return uin;
	
	return 0;
}
MI.Bos.pic = new Image();
})();
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
					else if (MI.Capture && MI.Capture.uploader && E.key == 86){
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
				new MI.AutoCmt({
					target : Self._txt,
					key : 1,
					call : function(){
						countTxtDelay();
						MI.Bos('btnAutoAtAccount');
					}
				});
			}

			//New Topic
			if (Self._topic) {
				Self._topic.onclick = function(){
					Self.addTopic();
					MI.Bos('btnTopic');
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
	}
}
MI.TalkBox.prototype = {
	delay : {},
	delayTime : 1500,
	delayVideo : null,
	delayVideoTime : null,
	url : '/publish.php',
	type : null, //Value: null(Talk)  1(Relay)  2(Reply) 3(Message) 4(Timeline Comment) 5(Comment)
	source : (function(){ //Talk's Source,example Web QQ
		var source = 1000001,hostname;
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
		fail : '发送失败',
		repeat : '内容重复'
	},
	txtTipSend : '广播中',
	addList : 0, //If Add New Talk To List
	addCheck : null, //Check Content Of Add New Talk To List
	addNum : 1, //Add Num When Send Success
	autoHeight : 0, //Auto Change Textarea's Height
	tmpl : MI.tmpl.listAll,
	countUrl : 1,
	/*
		 * result:0 成功
		 *       -1 未登录
		 *       -2 未注册用户
		 *       -3 系统错误
		 *       -4 发表失败
		 *       -5 连接超时，请检查网络
		 *       -6 发表内容中含敏感词，请重新输入
		 *       -7 所在网络有安全问题，请稍候重试
		 *       -8 参数错误
	 */
	msgTips : {
		'm_0' : '广播成功',
		'm_-1' : '未登录',
		'm_-2' : '未注册用户',
		'm_-3' : '系统错误',
		'm_-4' : '发表失败',
		'm_-5' : '连接超时',
		'm_-6' : '含敏感词',
		'm_-7' : '网络安全问题',
		'm_-8' : '参数错误',
		'm_-9' : '说话太快了',
		'm_-10' : '原文已删除',
		'm_-11' : '系统繁忙',
		'm_-12' : '说话太快了',
		'm_-13' : '内容重复了',
		'm_-14' : '话题数过多',
		'm_-15' : '操作被限制',
		'm_-16' : '请输入内容',
		'm_-17' : '原文审核中',
		'm_-18' : '再说点什么',
		'm_-100' : '验证码有误',
		'm_-101' : '验证码非法',
		'm_-102' : '请输验证码'
	},
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
			talkTip = '还剩<em>';
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
			content = UI.trim( Self._txt.value.replace(new RegExp(Self.txtTopic,'g'),'') );

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
			document.location.href = PATH + '/' + content.slice(1) + '?from=1';
			return;
		}

		//Show Sending Tip
		Self.delay.tip = setTimeout(function(){
			Self.showTip(Self.txtTipSend,2);
		},500);

		//Post Data
		data = {content:content.replace(/＠/g,'@').replace(/＃/g,'#'),pic:Self.pic,countType:Self.countType,viewModel:Self.iconPic};
		if($('mbSourcePic')){
			if(UI.A($('mbSourcePic'),'send') == 1){
				data.sourcepic = UI.A($('mbSourcePic'),'value');
			}
		}
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
		if (article) {
			if(article.url){
				data.wizardurl = article.url;
			}
			if(article.pref){
				data.wizardpref = article.pref;
			}
		}
		if (Self.start) {
			Self.start();
		}
		UI.ajax({
			url : Self.url,
			data : data,
			success : function(data){
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
					var msg = Self.msgTips['m_'+data.result];//data.msg;
					Self.showTip(msg || '',data.result < 0 ? 1 : 0);
					Self.flashTip();

					if(data.result == -1 || data.result == -2){
						// 设置登录回调
						Portal.Login.setCallback('sharePublish',Portal.UI.bind(Portal.Share.publish,Portal.Share));
						
						// 设置取帐号信息回调
						Portal.AccountInfo.setCallback('sharePublish',Portal.UI.bind(Portal.Share.publish,Portal.Share));

						var uin = Portal.Login.getUin();
						var mbid = Portal.S('account_mbid_'+uin);
						if (!uin || !mbid){
							if(!uin){
								MI.Bos('btnPublishNotLogin');
							}else if(!mbid){
								MI.Bos('btnPublishNotReg');
							}
							//Portal.Share.hide();
							Portal.Login.showPopup('sharePublish', Portal.Popup);
							Portal.Share.close();
						}else{
							Self.send();
						}

						//MI.alert('<div>请登录后再转播或点评微博</div><div><a href="http://t.qq.com" target="_blank">点击登录&gt;&gt;</a></div>');
					}
					//if(data.result == -2){
						//MI.alert('<div>您还未开通腾讯微博</div><div><a href="http://t.qq.com/reg/index.php" target="_blank">点击开通&gt;&gt;</a></div>');
					//}
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
					var mbShareBox = $('mbShareBox');
					var mbShareSucBox = $('mbShareSucBox');
					var mbShareClose = $$(mbShareSucBox,'.mbShareClose')[0];
					var gotomymb = $$(mbShareSucBox,'.gotomymb')[0];
					var uin = Portal.Login.getUin();
					var mbid = Portal.S('account_mbid_'+uin);

					mbShareClose.onclick = function(){
						Portal.Share.close();
						MI.Bos('btnClickClose');
					}
					UI.A(gotomymb,'href','http://t.qq.com/'+mbid+'?pref=qqcom.dp.share')
					setTimeout(function(){Portal.Share.close();MI.Bos('btnAutoClose');},3000)

					UI.hide(mbShareBox);
					UI.show(mbShareSucBox);


					if (Self.type != 4) {
						Self.countNum(1);
					}

					if (MI['talkList']) {
						MI.talkList.updateTime(data.info.talk[0].timestamp);
					}

					Self.txtCache = content;
				}
			}
		});
		Self.delay.timeout = setTimeout(function(){ //Tips For Time Out
			Self.showTip(Self.txtTip.fail,1)
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
	addTopic : function(txt){
		this._txt.focus();

		var txtTopic = txt ? '#'+txt+'#' : this.txtTopic;

		//Add Topic
		if (!this._txt.value.hasString(txtTopic)) {
			MI.insertTxt(this._txt,txtTopic,MI.cursorX(this._txt));
			//this._txt.value = txt = txt + this.txtTopic;
		}
		var txt = this._txt.value,
			indexOf = txt.replace(/\r/g,'').indexOf(txtTopic),len;
		if (indexOf == -1) {
			indexOf = 0
		}
		len = txtTopic.length;
		MI.selectTxt(this._txt,indexOf + 1,indexOf + len - 1,indexOf);
		this._txt.scrollTop = 999; //Textarea Scroll To End

		this.countTxt();
	},
	uploadPic : function(){
		var Self = this;
		UI.show(Self._picLoading);
		UI.addClass(Self._picLoading,'loading');
		UI.hide(Self._picForm);
		UI.hide(Self._picTxt);
		UI.hide(Self._picIco);
	},
	addPic : function(o){
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

MI.DisableDblClickSelect = function(obj){
	if (obj) {
		var aau = "_MouseDownNoSelect_";
		function getAtts() {
			return (obj.getAttribute(aau) || "").toString().split(",");
		}
		function setAtts(jz, ao) {
			obj.setAttribute(aau, [jz, ao]);
		}
		function now() {
			return + new Date;
		}
		if (getAtts().length == 1) {
			setAtts(now(), "up");
			obj.onmousedown = function(ag) {
				var hd = now(),
				vb = parseInt(getAtts()[0]);
				setAtts(hd, "down");
				if (hd - vb < 500) {
					UI.E(ag).prevent();
				}
			}
			obj.onmouseup = function() {
				setAtts(getAtts()[0], "up");
			}
			obj.onselectstart = function(ag) {
				if (getAtts().pop() == "up") {
					UI.E(ag).prevent();
				}
			}
		}
	}
	return obj;
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
	Self.relayBox._num = $$(Self.relayBox._body,'.number')[0];
	Self.comtBox.url = '/publish.php';
	Self.comtBox._num = $$(Self.comtBox._body,'.number')[0];
	Self.comtBox._relayCheck = $$(Self.comtBox._body,'.check1')[0];
	Self.comtBox._relayCheck.onclick = function(){
		var checked = this.checked;
		//Self.comtBox.url = checked ? '/publish.php' : '/comment/publish.php';
		Self.comtBox.type = checked ? 1 : 5;
		Self.comtBox.talkId = checked ? Self.cur : Self.curSource;
		Self.comtBox._tip.innerHTML = '';
		Self.comtBox.countTxt();
		Self.comtBox.addList = checked ? Self.relayBox.addList : 0;
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
	MI.app({Music:null});
}
MI.TalkList.prototype = {
	cur : null, //Current List
	curSource : null, //Current List's Sourse Message
	_tip : null, //List Tip
	_news : [], //New Talks
	auto : 0, //Auto Load Ajax Data When Browser's Back
	iconPic : 0, //Use Simple View Model
	moreTimes : 0, //More Times
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
		//MI.Card.build(Self._body,'.userPic img');
	},
	buildTips : function(area){ //Build Phone Tips And Url Tips
		var Self = this;
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
		},200);
	},
	urlTips : function(tips){
		if (this.nodeName == 'A') {
			var target = this,
				urlTipsTxt = ['原链接有风险','原链接不建议打开','腾讯网','原链接'],
				id = target.innerHTML.match(/[^\/]+$/g)[0],
				tip = '',
				url = '',
				br = '',
				time = + new Date();
			if (target.title) { //Cache Title
				UI.A(target,'reltitle',target.title);
				target.title = '';
			}
			if (MI.Tips.url[id]) {
				show(MI.Tips.url[id]);
				MI.Bos('btnViewUrl');
			}
			else {
				UI.get('/asyn/urldetail.php','url=' + id,function(data){
					data = MI.json(data);
					if (data.result == 0) {
						show(data);
						MI.Tips.url[id] = data;
						MI.Bos('btnViewUrl',+ new Date() - time);
					}
				});
			}
		}
		function show(data){
			if (data.result == 0) {
				var title = UI.A(target,'reltitle');
				if (title) {
					data.info.title = title;
				}
				url = data.info.url;
				if (data.info.title && data.info.safe > 2) { //Show Title
					tip = MI.string.cut(data.info.title,26);
					url =  MI.string.cut(url,60);
					br = '<br>';
				}
				else {
					tip = urlTipsTxt[data.info.safe - 1] || urlTipsTxt[0];
					br = '：';
					url = MI.string.cut(url,80);
				}
				url = url.breakWord(0);
				if (UI.B.ie) { //Copy Button
					url += ' <textarea style="display:none">' + data.info.url + '</textarea><a href="#" onclick="var a=window.clipboardData.setData(\'Text\',this.previousSibling.value),b=this.nextSibling;UI.hide(this);UI.show(b);b.innerHTML=a?\'复制成功\':\'复制失败\';return false">[复制]</a><span class="cNote" style="display:none"></span>';
				}
				if (data.info.safe > 2) { //Go Source Url
					UI.A(target,'href',(UI.B.ie ? ' ' : '') + data.info.url);
				}
				tips.innerHTML = '<em class="ico safe_' + (data.info.safe || 1) + '"></em><div class="safeType">' + MI.string.html(tip) + br + url + '</div></div>';
				UI.show(tips);
				MI.tips.position(target);
			}
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
							if (MI.talkBox && !type) {
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
	reply : function(id,type,number){ //type : 0(reply) 1(relay) 2(comt)
		/*if(!MI.user.account){
			MI.dialog.show({
				title : '<h1 class="DmainTit">请先登录</h1>',
				html : UI.html('<div style="font-size:14px;line-height:35px;margin:0 auto;text-align:center;"><div>请登录后再转播或点评微博</div><div><a href="http://t.qq.com" target="_blank">点击登录&gt;&gt;</a></div></div>')[0],
				width : 380,
			});

			//MI.alert('<div>请登录后再转播或点评微博<br/><a href="http://t.qq.com" target="_blank">点击登录&gt;&gt;</a></div>')
			return;
		}*/
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
			MI.open.stop();
			var li = $(id),
				sourceId = id,
				cur = Self.cur,
				viewRelay = $$(li,'.zfNum')[0],
				name = $$(li,'.userName strong a')[0].innerHTML,
				name2,
				account,
				vip = $$(li,'.userName .vip').length,
				expo = $$(li,'.userName .ico_expo').length,
				url = UI.A($$(li,'.userName')[0],'rel'),/*.href,*/
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
				replyTitle = '对 <b>' + name + '</b> 说:',
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

			account = url;//url.split('/');
			//account = account[account.length - 1];
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
				if (addReplyTxt) { //自动添加转播点评
					talkBoxTxt.value += addReplyTxt;
				}
				Self.talkBox.countTxt();
				MI.selectTxt(talkBoxTxt,0,0,0);
			},0);

			//Relay And Comt's Number
			/*if (type != 0) {
				var numberType = type == 1 ? '转播' : '点评',
					bossName = type == 1 ? 'Relay' : 'Comt',
					link = type == 1 ? '?t=1' : '?t=2';
				Self.talkBox._num.innerHTML = '<a href="'+PATH+'/p/t/' + sourceId + '/' + link + '" onclick="MI.Bos(\'btn' + bossName + 'View\')" target="_blank">' + 
					((number != 0 && number) ? '查看所有 ' + number + ' 条' + numberType : '') + '</a>';
			}*/

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
		MI.open.start();
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
		var name = UI.A($$($(id),'.userName')[0],'rel');
		jubao_msg(id,name);
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
		if (comt) {
			//Old Comment
			/*UI.A(comt,'target','_blank');
			if (comt.href.hasString('#')) {
				comt.href = '/p/c/' + el.id;
			}
			comt.onclick = function(){
				var comtBox = Self.comtBox,href = comt.nextSibling.href;
				MI.dialog.show({html:Self._comt,width:500});
				comtBox._comtNum = $$(comt.nextSibling,'em')[0];
				comtBox.talkId = href.match(/\d+$/)[0];
				comtBox._talkTo.innerHTML = '发表评论:';
				comtBox._viewComt.innerHTML = '<a href="' + href + '" target="_blank">查看已有评论</a>';
				comtBox._txt.value = '';
				setTimeout(function(){
					comtBox._txt.focus();
					comtBox.countTxt();
				},0);
				MI.Bos('btnComt');
				return false;
			}*/
			comt.onclick = function(){
				Self.curSource = UI.A(this,'rel');//this.href.match(/[^\/]+$/g)[0].split('?')[0];
				Self.setArrowX(this,time);
				Self.comtBox._relayCheck.checked = false;
				Self.comtBox._relayCheck.onclick();
				Self.reply(el.id,2,UI.A(this,'num'));
				MI.Bos('btnComt');
				return false;
			}
		}
		if (reply) {
			reply.onclick = function(){
				Self.setArrowX(this,time);
				Self.reply(el.id,0);
				MI.Bos('btnReply');
				return false;
			}
		}
		if (relay) {
			relay.onclick = function(){
				Self.setArrowX(this,time);
				Self.reply(el.id,1,UI.A(this,'num'));
				MI.Bos('btnRelay');
				return false;
			}
		}
		if (view) {
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
		if (viewRelay && !viewRelay.innerHTML.hasString('对话')) { //View Relay List
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
									var _relayCite = $$(o,'.relayCite')[0];
									if (_relayCite) {
										_relayCite.onclick = function(){
											Self.getRelayOld(relayBox,o,'.content');

											//Auto Select CheckBox Of Relay
											relayBox._relayCheck.checked = true;
											relayBox._relayCheck.onclick();
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
			/*viewRelay.onclick = function(e){
				if (Self.xhr.relay) {
					Self.xhr.relay.abort();
				}
				var href = this.href,
					id = href.match(/[^\/]+$/g)[0],
					li = id == el.id ? id : el.id,
					Y,
					windowHeight = UI.windowHeight(),
					scrollTop;
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
					Self.xhr.relay = UI.get('/message_relay_frame.php','id=' + id + '&viewModel=' + Self.iconPic + '&r=' + MI.random(),function(data){
						pageLink(data);
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
			}*/
		}
		if (fav) {
			fav.type = 1;
			fav.title = (UI.hasClass(fav,'light') ? '取消' : '') + '收藏';
			fav.onclick = function(){
				Self.fav(el.id,this.type);
				MI.Bos('btnFav');
				return false;
			}
			fav.onmouseover = MI.hideFocus;
		}
		if (unfav) {
			unfav.onclick = function(){
				Self.confirm(el.id,2);
				MI.Bos('btnUnFav');
				//Self.fav(el.id,2);
				return false;
			}
			unfav.onmouseover = MI.hideFocus;
		}
		if (del) {
			del.onclick = function(){
				Self.confirm(el.id);
				MI.Bos('btnDel');
				return false;
			}
		}
		if (content && content.innerHTML == '') {
			//UI.hide(content);
			content.innerHTML = '&nbsp;';
		}
		if (report) {
			report.onclick = function(){
				Self.report(el.id);
				MI.Bos('btnReport');
				return false;
			}
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
		if (replyMsg) {
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
		if (videoBox) {
			MI.TalkList.videoEvent(videoBox);
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
			if (rel) {
				UI.get(rel,url,function(json){
					Self.addMore(json);
				});
				MI.Bos(auto ? 'btnMoreAuto' : 'btnMore');
			}
		}
		Self._more.sending = 1;
	},
	newly : function(){
		var Self = this,_new = Self._new;
		if (!_new.sending) {
			if (_new.num > 15 || Self.refresh) {
				document.location.href = '/' + MI.user.account; //location.reload()在Firefox中会导致发图表单重新提交的问题
			}
			else {
				UI.addClass(_new,'loading');
				UI.get('/asyn/home.php',{time:Self.first.time,p:2,type:1,r:MI.random()},function(json){
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
				//document.location.reload();
				//return;
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
				//document.location.reload();
				//return;
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


MI.MsgBox = function(id){ //MsgBox
	var Self = new MI.TalkBox(id);
	Self.txtTipSend = '发送中';
	Self._msgTo = Self.$('.msgTo');
	Self._num = $$('.msgNum');
	Self.type = 3;
	Self.url = '/messages/send.php';

	if (!UI.B.ie6 || !UI.hasClass(Self._txt,'noAutoCmt')) {
		new MI.AutoCmt({
			target : Self._msgTo,
			type : 2,
			call : function(){
				Self.countTxt();
				MI.Bos('btnAutoAtAccount');
			}
		});
	}

	//Event
	UI.EA(Self._msgTo,'keyup',count); //IE和FF中的执行顺序有差异，比较郁闷...
	UI.EA(Self._msgTo,'keydown',count);
	UI.EA(Self._msgTo,'blur',count);
	function count(){
		Self.countTxt();
	}
	return Self;
}
MI.MsgList = function(id){ //MsgList
	var Self = new MI.TalkList(id);
	Self.removeTip = '确定删除这条私信？';
	//Self.removeUrl = '/del.php';
	return Self;
}
MI.Talk = function(id){ //Talk
	var Self = this,html = new UI.tmplString(MI.tmpl.reply)({});
	Self.id = id;
	Self._body = $(id);
	Self._talk = UI.html(html)[0]; //Talk Box
	Self._relay = UI.html(html.replace(/<\/textarea>/g,'').replace(/textarea/g,'input'))[0];
	Self._relayNum = $('relay' + id);
	Self.replyBox = new MI.TalkBox(Self._talk);
	Self.relayBox = new MI.TalkBox(Self._relay);
	Self.replyBox.success = function(){
		MI.dialog.hide();
	};
	Self.relayBox.success = function(){
		MI.dialog.hide();
		if (Self._relayNum) {
			MI.countNum(Self._relayNum,1);
		}
	};
	Self.replyBox.talkId = this.relayBox.talkId = id;

	Self.reply = function(type){
		Self.talkBox = type ? Self.relayBox : Self.replyBox;
		UI.removeClass(Self.talkBox._body,'pubSuc');
		var replyTitle = '转播 <b>' + UI.trim(Self.name) + '</b>: "' + MI.string.html(Self.content.slice(0,25)),relayTitle = '对 <b>' + Self.name + '</b> 说:';
		if (Self.content.length > 25) {
			replyTitle += '...';
		}
		replyTitle += '"<br/>再说两句:';
		$$(Self.talkBox._body,'.replyTitle')[0].innerHTML = type ? replyTitle : relayTitle;
		Self.talkBox._body.className = type ? 'zfWrap' : 'talkWrap';
		Self.talkBox.type = type ? 1 : 2;
		Self.talkBox._txt.value = '';
		Self.talkBox.countTxt();
		MI.dialog.show({width:500,html:Self.talkBox._body});
		setTimeout(function(){
			Self.talkBox._txt.focus();
		},0);
	}

	//Talk Info
	var userLink = $$(Self._body,'a')[1];
	Self.name = UI.text(userLink);
	Self.account = UI.A(userLink,'rel');
	Self.content = UI.text($$(Self._body,'.msgCnt')[0]);

	var report = $$(Self._body,'.alarm')[0],
		reply = $$(Self._body,'.reply')[0],
		relays = $$(Self._body,'.relay'),
		relay = relays[0],
		relay2 = relays[1],
		fav = $$(Self._body,'.fav')[0],
		picBox = $$(Self._body,'.picBox');
	//Event
	if (reply) {
		reply.onclick = function(){
			Self.reply();
			return false;
		}
	}
	if (relay) {
		relay.onclick = function(){
			Self.reply(1);
			return false;
		}
	}
	if (relay2) {
		relay2.onclick = function(){
			Self.reply(1);
			return false;
		}
	}
	if (report) {
		report.onclick = function(){
			jubao_msg(Self.id,Self.account);
			return false;
		}
	}
	if (fav) {
		fav.type = 1;
		fav.onclick = function(){
			Self.fav(Self._body.id,this.type);
			MI.Bos('btnFav');
			return false;
		}
	}
	if (picBox) {
		MI.TalkList.picEvent(picBox);
	}
}
MI.Talk.prototype = MI.TalkList.prototype;

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
				var S = this;
				MI.follow(Self.user(S),S,function(){
					UI.hide(S);
					S.className='addAttention';
					UI.show(S.nextSibling);
				});
				if(!el) MI.Bos(bossFollow + (type || ''));
				if(Self.followCall) Self.followCall();
				return false;
			}
			if (!type){
				del.onclick = function(){
					var S = this;
					MI.follow(Self.user(S),S,function(){
						UI.hide(S);
						S.className='delAttention';
						UI.show(S.previousSibling);
					});
					if(!el) MI.Bos(bossUnFollow + (type || ''));
					if(Self.unFollowCall) Self.unFollowCall();
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
MI.Reply = function(){ //Reply Dialog
	var Self = this,talkBox,talkBox;
	UI.hide(Self._body);

	Self.talkBox = new MI.TalkBox(Self._body);
	Self._talkTo = $$(Self._body,'.replyTitle')[0];
	Self._msg = $$(Self._body,'.msg')[0];
	
	talkBox = Self.talkBox;
	talkBox.txtTipSend = '发送中';
	UI.addClass(talkBox._txt,'noAutoComplete');
	talkBox.successStart=function(){
		MI.dialog.showTip({html:'发送成功!'});
	}
	talkBox.success=function(){
		UI.removeClass(talkBox._body,'pubSuc');
	}
}
MI.Reply.prototype = {
	//_body : UI.html('<div class="talkWrap" id="reply' + MI.random() + '" style="display:none"><div class="SA"><em>◆</em><span>◆</span></div><div class="top"><span class="left"><span class="replyTitle">对 <b></b>说:</span></span></div><div class="cont"><textarea class="inputTxt noAutoComplete" style="overflow-y: hidden; height: 38px;"></textarea></div><div class="bot" style="margin:5px 0 7px"><input type="button" class="inputBtn sendBtn"/><span class="countTxt">还能输入<em>140</em>字</span></div><div style="display: none;" class="talkSuc"><span class="ico_tsW"><span class="ico_ts"></span></span><span class="msg" id="msg"></span></div></div>')[0],
	_body : UI.html(MI.tmpl.reply)[0],
	show : function(){
		var Self = this,talkBox = Self.talkBox;
		MI.dialog.show({html:Self._body,width:500});
		Self._talkTo.innerHTML = '对 <b>' + talkBox.talkTo + '</b> 说:';
		talkBox._txt.value = '';
		setTimeout(function(){
			talkBox._txt.focus();
			talkBox.countTxt();
		},0);
	}
}
MI.Msg = function(){ //Msg Dialog
	var Self = this,talkBox;
	UI.hide(Self._body);

	Self.talkBox = new MI.MsgBox(Self._body);
	talkBox = Self.talkBox;
	talkBox.successStart=function(){
		MI.dialog.showTip({html:'发送成功!'});
	}
	talkBox.success = function(){
		UI.removeClass(talkBox._body,'pubSuc');
	}
}
MI.Msg.prototype = {
	_body : UI.html(MI.tmpl.msgBox)[0],
	show : function(){
		var Self = this,talkBox = Self.talkBox;
		MI.dialog.show({width:570,html:Self._body,start:function(){
			//talkBox._msgTo.value = msgTo ? msgTo : '';
			talkBox._txt.value = '';
			UI.removeClass(talkBox._btn,'disabled');
			/*try{setTimeout(function(){
				talkBox._msgTo.focus();
				if (talkBox._msgTo.value) talkBox._txt.focus();
			},0);}catch(e){};*/
		}});
		setTimeout(function(){
			talkBox._txt.focus();
			talkBox.countTxt();
		},0);
	}
}
MI.Open = function(data){ //Msg Dialog
	var Self = this;
	if(!data || !data.info.talk.length)	return;
	Self.data = data;
	Self.length = data.info.talk.length;
	Self.data.info.time = Self.length ?  Self.data.info.talk[0].timestamp : 0;
	Self.num = data.info.talk.length - 1;
	Self.freq = ((!config.freq || config.freq < 1) ? 5 : config.freq)*1000;
	Self.initNum = (!config.initNum || config.initNum < 1) ? 5 : config.initNum;
	Self.pickNum = (!config.pickNum || config.pickNum < 1) ? 20 : config.pickNum;
	Self.init();
}
MI.Open.prototype = {
	delay : null,
	init : function(){
		var Self = this;
		Self.html = UI.html(new UI.tmplString(MI.tmpl.listAll)(Self.data.info));
		Self.addNew(Self.initNum);
		Self.start();
	},
	start : function(){
		var Self = this;
		Self.delay = setInterval(function(){Self.addNew(1)},Self.freq);
	},
	stop : function(){
		var Self = this;
		if(Self.delay)	clearInterval(Self.delay);
	},
	addNew : function(index){
		var Self = this;
		if(Self.num < 0 || index >= Self.length){
			Self.stop();
			//setTimeout(function(){document.location.reload();},10*1000);
			return;
		}
		var cache = document.createDocumentFragment();
		for (var i = Self.num,num = Self.num-index;i > num;i--) {
			//alert(Self.html[i].innerHTML)
			UI.prepend(Self.html[i],cache);
		}
		setTimeout(function(){ //渲染完再添加事件，比较耗时间
			for (var i = Self.num,num = Self.num-index;i > num;i--) {
				MI.talkList.addEvent(Self.html[i]);
				//Self.html[i].onmouseover = function(){Self.stop()};
				//Self.html[i].onmouseout = function(){Self.start()};
			}
			MI.talkList.updateTime(Self.data.info.time);
			Self.num = Self.num-index;
			MI.Crs(1);
		},0);
		UI.prepend(cache,MI.talkList._body);
		if(index == 1){
			var newTalk = $$(MI.talkList._body,'li')[0];
			var height = UI.height(newTalk),scrollY = UI.scrollY(),scroll;
			UI.C(newTalk,'height',0);
			UI.animate(newTalk,'height',height-22,function(){
				UI.C(newTalk,'height','');
			},0.3);
		}
	}
}
var Portal = {
	Popup : parent.window.frames['mbPopupWinFrame'],
	Login : parent.MI.Login,
	AccountInfo : parent.MI.AccountInfo,
	Share : parent._MI.Share,
	UI : parent.UI,
	PopupResize : function(){
		var w = {height:UI.height($('mbShareBox'))+30,width:UI.width($('mbShareBox'))}
		this.Share.popup.resizePopup(w);
	},
	S : parent.MI.S
}


UI.EA(window,'unload',function(){
	
	if (MI.talkBox && MI.talkBox.autoSave) {
		MI.talkBox.save();
	}
	try{
		for (var i in MI) {
			if (UI.isObject(MI[i]) && !UI.isElement(MI[i])) {
				for (var j in MI[i]) {
					if (UI.isObject(MI[i][j]) && !UI.isElement(MI[i][j])) {
						for (var k in MI[i][j]) {
							MI[i][j][k] = null;
						}
						MI[i][j] = null;
					}
					MI[i][j] = null;
				}
			}
			MI[i] = null;
		}
	}catch(e){}
});
UI.ready(function(){

	MI.talkBox=new MI.TalkBox('talkBox');
	var text = MI.talkBox._txt.value;
	MI.talkBox.addCheck=$('topic').value;
	MI.talkBox.autoSave=1;
	MI.talkBox.success = function(){
		MI.talkBox._txt.value = $('topic').value;
	};
	MI.talkBox.successStart = function(){
		if(!MI.talkBox._txt.value.hasString(text)) MI.talkBox.countNum(-1);
	}

	//Create Dialog && Card && DialogTip
	MI.dialog = MI.dialog || new MI.Dialog();
	MI.dialog._bg.style.height = UI.pageHeight() + 'px';


	var uin = Portal.Login.getUin();
	var mbid = Portal.S('account_mbid_'+uin);
	if (!uin || !mbid){
		//Portal.Login.showPopup('follow_send', Portal.Popup);
		$('talkBox_cnt').style.width = 'auto';
		UI.show($('Quick'));
		if(!uin){
			MI.Bos('btnLoadNotLogin');
		}else if(!mbid){
			MI.Bos('btnLoadNotReg');
		}
	}
	var quickbg = $$('.quickbg')[0];
	quickbg.onclick = function(){
		// 设置登录回调
		Portal.Login.setCallback('shareInfoWin',Portal.UI.bind(Portal.Share.show,Portal.Share));
		
		// 设置取帐号信息回调
		Portal.AccountInfo.setCallback('shareInfoWin',Portal.UI.bind(Portal.Share.show,Portal.Share));

		var uin = Portal.Login.getUin();
		var mbid = Portal.S('account_mbid_'+uin);
		if (!uin || !mbid){
			if(!uin){
				MI.Bos('btnQuickNotLogin');
			}else if(!mbid){
				MI.Bos('btnQuickNotReg');
			}
			Portal.Login.showPopup('shareInfoWin', Portal.Popup);
			Portal.Share.close();
		}
	}
	var del_pic = $$('.del_pic')[0],mbSourcePic = $('mbSourcePic'),mbSourcePicBox=$('mbSourcePicBox');
	if(del_pic){
		del_pic.onclick = function(){
			var s = UI.A(mbSourcePic,'send');
			if(s == 1){
				this.innerHTML = '选择图片'
				UI.A(mbSourcePic,'send','0');
				UI.hide(mbSourcePicBox);
				Portal.PopupResize();
			}else{
				this.innerHTML = '取消图片'
				UI.A(mbSourcePic,'send','1');
				UI.show(mbSourcePicBox);
				Portal.PopupResize();
			}
		
		}
	}
	Portal.PopupResize();
})