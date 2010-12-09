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
		height : 567 //每页高度
	},
	txtNum : [53,80],
	txtHeight : [220,500], //[有图,无图]
	img : {
		small : [168,168],
		middle : [298,314],
		big : [700,600]
	},
	imgLoad : function(pic,size){
		if(pic.width > size[0]){
			pic.height = pic.height * size[0] / pic.width;
			pic.width = size[0];
		}
		if(pic.height > size[1]){
			pic.width = pic.width * size[1] / pic.height;
			pic.height = size[1];
		}
	},
	talks : {},
	tmpl : {
		list : '<%for(var i=0,n=talk.length;i<n;i++){MI.TV.talks[talk[i].id]=talk[i];%><li id="<%=talk[i].id%>">\
					<div class="userPic"><img src="<%=talk[i].pic.replace("/50","/100")%>"></div>\
					<div class="msgBox">\
						<%for(var j=0;j<talk[i].image.length;j++){%>\
							<p class="pic"><span><img src="<%=talk[i].image[j]%>/460" onload="MI.TV.imgLoad(this,MI.TV.img.small)"></span></p>\
						<%}%>\
						<p class="msgCnt"><b><%=talk[i].nick%>:</b><%var text=talk[i].nick+talk[i].content,txtNum=MI.TV.txtNum[talk[i].image && talk[i].image.length ? 0 : 1]*2;if(MI.string.length(text)>txtNum){%><%=MI.string.cut(talk[i].content,txtNum,"...")%><%}else{%><%=talk[i].content||"&nbsp;"%><%}%></p>\
					</div>\
				</li><%}%>',
		talk : '<div class="<%=(image.length ? "cntImg" : "cntTxt")%>">\
					<div class="userPic"><img src="<%=pic.replace("/50","/100")%>" /></div>\
					<div class="msgBox">\
						<%if(image.length){%><div class="pic" onclick="MI.TV.showPic(\'<%=image[0]%>\')"><span><img src="<%=image[0]%>/460" onload="MI.TV.imgLoad(this,MI.TV.img.middle)" /></span><b class="copySign">腾讯微博</b></div><%}%>\
						<div class="msgCnt" style="line-height:1.4;height:auto;font-size:100px">\
							<b><%=nick%>:</b><%=content%>\
						</div>\
					</div>\
				</div>\
				<div class="pageNav"><a href="#" onclick="MI.TV.show(1);return false" class="btn_back">返回</a></div>',
		pic : '<div class="Dwrap" onclick="MI.TV.show(2)">\
					<a href="#" onclick="return false" class="close">关闭</a>\
					<div class="picBox"><img src="<%=image%>/2000" /></div></div><div class="bg" onclick="MI.TV.show(2)">\
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
			 * 打开当前某一条的图片：Enter（回车键）或 5（键）
			 * 返回：Esc（键）
			 */
			var key = UI.E(e).key;
			if (key == 27){ //ESC
				Self.show(Self.cur - 1);
			}
			else if ((key == 33 || key == 100) && Self.cur == 1){ //Prev
				Self.prev();
			}
			else if ((key == 34 || key == 102) && Self.cur == 1){ //Next
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
			UI.hide(Self._showOne);
			UI.addClass(T,'click');
			//UI.C(this,'background','#1E1E1E');
			setTimeout(function(){
				Self.show(2);
				var cont = $$(Self._showOne,'.msgCnt')[0];
				Self.autoFontSize(cont,Self.txtHeight[Self.talks[T.id].image.length ? 0 : 1]);
				UI.removeClass(T,'click');
				//UI.C(T,'background','');
			},Self.cur == 1 ? 200 : 0);
			return false;
		}
		Self.killLink(el);
	},
	autoFontSize : function(cont,height){
		var Self = this;
		if (cont.scrollHeight > height){
			UI.C(cont,'font-size',parseInt(UI.C(cont,'font-size')) - 1 + 'px');
			Self.autoFontSize(cont,height);
		}
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
				UI.removeClass(document.body,'childPage');
				break;
			case 2:
				UI.show(Self._showOne);
				UI.hide(Self._showAll);
				UI.hide(Self._showPic);
				UI.addClass(document.body,'childPage');
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
		Self.imgLoad(img,Self.img.big)
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
	},
	_voteBody : null,
	_voteList : null,
	voteXhr : 'http://t.qq.com/asyn/tvwall_votecount.php', //异步请求地址
	voteIds : '', //数据
	voteStop : 0, //停止投票
	voteUpdateTime : 10000, //更新时间
	vote : function(obj){
		var Self = this;
		Self.voteIds = obj.ids;
		//Dom
		Self._voteBody = $('voteList');
		Self._voteCtrl = $('voteCtrl');
		
		//Event
		Self._voteCtrl.onclick = function(){
			Self.voteStop = !Self.voteStop;
			return false;
		}
		
		Self.voteUpdate();
	},
	voteUpdate : function(){ //更新数据
		var Self = this;
		if (Self.voteStop){
			return;
		}
		UI.get(Self.voteXhr,'ids=' + Self.voteIds,function(data){
			var data = MI.json(data);
			//data = {result:0,msg:'','info':{"5000000558080":{"count":40,"name":"T684000002","nick":"T684000002","url":"http:\/\/t2.qlogo.cn\/mbloghead\/b77e3a6860b9e1160a5c"},"9000000734208":{"count":60,"name":"T684000013","nick":"T684000013","url":"http:\/\/t1.qlogo.cn\/mbloghead\/dabc58443f898398f6d0"}}};
			if (data.result == 0){
				var html = [],
					index = 0;
				if (!Self._voteList){
					html.push('<tr>');
					for (var i in data.info){
						index++;
						html.push('<td><div class="rateWrap c' + index + '"><div class="rateBox" style="height:' + data.info[i].count + '%"><div class="tface">' + data.info[i].count + '%</div><div class="mface"></div><div class="bface"></div></div></div><div class="userPic"><a href="http://t.qq.com/' + data.info[i].name + '" target="_blank"><img src="' + data.info[i].url + '/50" />' + data.info[i].nick + '</a></div></td>');
					}
					html.push('</tr>');
					Self._voteBody.innerHTML = html.join('');
					Self._voteList = $$(Self._voteBody,'.rateWrap');
					Self._voteListBox = $$(Self._voteBody,'.rateBox');
					Self._voteListNum = $$(Self._voteBody,'.tface');
				}
				else {
					for (var i in data.info){
						UI.C(Self._voteListBox[index],'height',data.info[i].count + '%');
						Self._voteListNum[index].innerHTML = data.info[i].count + '%';
						index++;
					}
				}
			}
		});
		setTimeout(function(){
			Self.voteUpdate();
		},Self.voteUpdateTime);
	}
}
