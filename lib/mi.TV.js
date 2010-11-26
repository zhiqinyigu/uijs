/**
 * MI TV
 * Author : xhlv@tencent.com
 * Datetime : 2010-11-26
 * Last Eidt: 
*/
$ = UI.G;
$$ = UI.GC;
MI = {
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
	}
}
function trim(str) {
	return str.replace(/^\s*|\s*$/g, '');
}
function gcookie(n) {
	var N = n + '=',C = document.cookie.split(';');
	for(var i=0;i<C.length;i++) {
		var c = C[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(N) == 0) return decodeURIComponent(c.substring(N.length,c.length));
	}
	return null;
}
var Bos = function(op,value) {
	try{
		var ouin = trim(gcookie('o_cookie')||'');
		Bos.pic.src = 'http://btrace.qq.com/collect?sIp=&iQQ=' + ouin + '&sBiz=microblog&sOp=' + op + '&iSta=0&iTy=18&iFlow=0' + (value ? '&sServerIp=&iBackInt1=&iBackInt2=&sBackStr1=' + value : '');
	}catch(e){}
}
Bos.pic = new Image();
MI.TV = {
	delay : null,
	cur : 1, //当前显示的页面
	page : {
		cur : 1, //当前页数
		num : 0, //总页数
		totalNum : 0, //总条数
		perNum : 3, //每页条数
		height : 576 //每页高度
	},
	img : {
		width : 800,
		height : 600
	},
	talks : {},
	tmpl : {
		list : '<%for(var i=0,n=talk.length;i<n;i++){MI.TV.talks[talk[i].id]=talk[i];%><li id="<%=talk[i].id%>">\
					<div class="userPic"><img src="<%=talk[i].pic.replace("/50","/100")%>"></div>\
					<div class="msgBox">\
						<%for(var j=0;j<talk[i].image.length;j++){%>\
							<p class="pic"><span><img src="<%=talk[i].image[j]%>/160"></span></p>\
						<%}%>\
						<p class="msgCnt"><b><%=talk[i].nick%>:</b><%=talk[i].content||"&nbsp;"%></p>\
					</div>\
				</li><%}%>',
		talk : '<div class="<%=(image.length ? "cntImg" : "cntTxt")%>">\
					<div class="userPic"><img src="<%=pic.replace("/50","/100")%>" /></div>\
					<div class="msgBox">\
						<%if(image.length){%><p class="pic" onclick="MI.TV.showPic(\'<%=image[0]%>\')"><span><img src="<%=image[0]%>/460" /></span><b class="copySign">腾讯微博</b></p><%}%>\
						<p class="msgCnt"><b><%=nick%>:</b><%=content%></p>\
					</div>\
				</div>\
				<div class="pageNav"><a href="#" onclick="MI.TV.show(1)" class="btn_back">返回</a></div>',
		pic : '<div class="Dwrap">\
					<a href="#" onclick="MI.TV.show(2)" class="close">关闭</a>\
					<div class="picBox"><img src="<%=image%>/2000" /></div></div><div class="bg">\
				</div>'
	},
	build : function(){
		var Self = this;
		Self._list = $$('.listCnt')[0];
		Self._prev = $$('.btn_prev')[0];
		Self._next = $$('.btn_next')[0];
		Self._showAll = $('showAll');
		Self._showOne = $('showOne');
		Self._showPic = $('showPic');
		Self._loadPic = UI.html('<div style="display:none"></div>')[0];
		UI.ready(function(){
			UI.append(Self._loadPic,document.body);
		});
		
		Self.height = parseInt(UI.C(Self._list.parentNode,'height'));
		
		//Event
		Self._next.onclick = function(){
			Self.next();
			return false;
		}
		Self._prev.onclick = function(){
			Self.prev();
			return false;
		}
		document.body.onkeydown = function(e){
			/*
			 * 向上翻页：PgUp（键） 或 4（键） 
			 * 向下翻页：PgDn（键） 或 6（键） 
			 * 打开当前页的某一条：1（键） 2（键） 3（键）
			 * 打开当前某一条的图片：Enter（回车键）
			 * 返回：Esc（键）
			 */
			var key = UI.E(e).key;
			if (key == 27){ //ESC
				Self.show(Self.cur - 1);
			}
			else if (key == 33 || key == 100){ //Prev
				Self.prev();
			}
			else if (key == 34 || key == 102){ //Next
				Self.next();
			}
			else if (key == 97){ //Show 1
				Self.showTalk(1);
			}
			else if (key == 98){ //Show 2
				Self.showTalk(2);
			}
			else if (key == 99){ //Show 3
				Self.showTalk(3);
			}
			else if ((key == 13 || key == 101) && Self.cur == 2){ //Enter
				var img = $$(Self._showOne,'.pic')[0];
				if (img){
					img.onclick();
				}
			}
		}
	},
	addTalk : function(data){
		var Self = this;
		if(data.result == 0){
			var list,
				cache = document.createDocumentFragment(),
				o = UI.html(new UI.tmplString(Self.tmpl.list)(data.info)),
				length = data.info.talk.length;
			if (length) {
				for (var i = 0,num = o.length;i < num;i++) {
					Self.addEvent(o[i]);
					UI.append(o[i],cache);
				}
				UI.prepend(cache,Self._list);
				Self.showPage(1);
			}
			UI.each(data.info.talk,function(o){
				if (o.image && o.image.length){
					var img1 = UI.DC('img'),
						img2 = UI.DC('img'),
						img3 = UI.DC('img');
					img1.src = o.image[0] + '/2000';
					img2.src = o.image[0] + '/460';
					img3.src = o.image[0] + '/160';
					UI.append(img1,Self._loadPic);
					UI.append(img2,Self._loadPic);
					UI.append(img3,Self._loadPic);
				}
			});
		}
	},
	addEvent : function(el){
		var Self = this;
		el.onclick = function(){
			var T = this;
			Self._showOne.innerHTML = new UI.tmplString(Self.tmpl.talk)(Self.talks[this.id]);
			Self.killLink(Self._showOne);
			UI.C(this,'background-color','#0D3C62');
			setTimeout(function(){
				Self.show(2);
				UI.C(T,'background-color','');
			},400);
			return false;
		}
		Self.killLink(el);
	},
	killLink : function(el){
		UI.each($$(el,'.msgBox a'),function(o){
			o.title = '';
			o.onclick = function(){
				return false;
			}
		});
	},
	show : function(type){ //1-All 2-One 3-Pic
		var Self = this;
		if (type < 1){
			type = 1;
		}
		switch (type){
			case 1:
				UI.show(Self._showAll);
				UI.hide(Self._showOne);
				UI.hide(Self._showPic);
				break;
			case 2:
				UI.show(Self._showOne);
				UI.hide(Self._showAll);
				UI.hide(Self._showPic);
				break;
			case 3:
				UI.show(Self._showPic);
				break;
		}
		Self.cur = type;
	},
	showPic : function(imgUrl){
		var Self = this,img,imgHeight,imgWidth;
		Self._showPic.innerHTML = new UI.tmplString(Self.tmpl.pic)({
				image : imgUrl
			});
		img = $$(Self._showPic,'.picBox img')[0];
		Self.show(3);
		imgHeight = UI.height(img);
		imgWidth = UI.width(img);
		if (imgHeight > Self.img.height){
			imgWidth = imgWidth *  Self.img.height / imgHeight
			imgHeight = Self.img.height;
		}
		if (imgWidth > Self.img.width){
			imgHeight = imgHeight *  Self.img.width / imgWidth
			imgWidth = Self.img.width;
		}
		img.style.cssText = 'width:' + imgWidth + 'px;height:' + imgHeight + ';';
		$$(Self._showPic,'.Dwrap')[0].style.cssText = 'margin:-' + UI.height(img)/2 + 'px 0 0 -' + UI.width(img)/2 + 'px';
	},
	showTalk : function(num){
		var Self = this,li = $$(Self._list,'li')[(Self.page.cur - 1) * Self.page.perNum + num - 1];
		li.onclick();
	},
	showPage : function(page){
		var Self = this;
		Self.page.totalNum = $$(Self._list,'li').length;
		Self.page.num = Math.ceil(Self.page.totalNum / Self.page.perNum);
		if (Self.page.cur < 1){
			Self.page.cur = 1;
		}
		else if (Self.page.cur > Self.page.num){
			Self.page.cur = Self.page.num
		}
		page = page || Self.page.cur;
		if (page == 1){
			UI.hide(Self._prev);
		}
		else {
			UI.show(Self._prev);
		}
		if (page >= Self.page.num){
			UI.hide(Self._next);
		}
		else {
			UI.show(Self._next);
		}
		//Self._list.style.cssText += ';margin-top:-' + (page - 1) * Self.page.height + 'px;';
		clearInterval(Self.delay);
		Self.delay = UI.animate(Self._list,'marginTop',- (page - 1) * Self.page.height);
	},
	prev : function(){
		this.page.cur--;
		this.showPage();
	},
	next : function(){
		this.page.cur++;
		this.showPage();
	}
}
Self = MI.TV;
