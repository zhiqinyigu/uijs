/*
 Author : xhlv@tencent.com
 Datetime : 2008-12-8
 Last Eidt: 2009-10-20

 Using:
	UI.animate();  <=> UI.animate(UI.G('news_bar'),'opacity',0);
	UI.tip();	//Create Title Tip
	UI.resize();	//Create Resize With 'Resize' Class Name
	UI.gotop(); <=> UI.gotop('id');	//Create Gotop Tool
*/

String.prototype.hasString = function(o) { //If Has String
	if (typeof o == 'object') {
		for (var i=0,n = o.length;i < n;i++) {
			if (!this.hasString(o[i])) return false;
		}
		return true;
	}
	else if (this.indexOf(o) != -1) return true;
}
String.prototype.breakWord = function(n,s) {
	if (!s) s = '<wbr/>';
	return this.replace(RegExp('(\\w{' + (n ? n : 0) + '})(\\w)','g'),function(all,str,char){
		return str + s + char;
	});
}
var UI = {
	resize : function(n,config) {
		var arr = UI.isObject(n) ? [n] : UI.GC(n);
		UI.each(arr,function(o){
			if('TEXTAREA,SELECT,INPUT,BUTTON,IMG'.hasString(o.nodeName)) {
				var tipBox = '',title = ''; //Hack tipBox
				if (UI.hasClass(o,'tipBox')) {
					UI.removeClass(o,'tipBox');
					tipBox = ' tipBox';
					title = ' title="' + o.title + '"';
					o.title = '';
					UI.EA(o,'click',function(e){
						UI.E(e).stop();
					})
				}
				UI.wrap('<span class="resize_box' + tipBox + '"' + title + '><b class="ico"></b><span></span></span>',o);
			}
			else {
				var B = UI.html('<b class="ico"></b>')[0];
				o.appendChild(B);
			}
			new UI.Resize(o,config);
		});
	},
	gotop : function(n) {
		this.Gotop.build(n);
	},
	ajax : function(o) { // UI.ajax({type:'',url:'json.html',data:'',success:''})
	},
	get : function(url,o,f) { // UI.get('json.html',{name:''},function(data){ alert(data); })
		if (window.ActiveXObject){
			var xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
		}else if (window.XMLHttpRequest){
			var xmlHttp = new XMLHttpRequest();
		}
		xmlHttp.onreadystatechange = function(){
			if (xmlHttp.readyState == 4){// && xmlHttp.status == 200
				f(xmlHttp.responseText);
			}else{
				return false;
			}
		}
		if (o != undefined) {
			url += '?' + o;
		}
		xmlHttp.open('GET',url,true)
		xmlHttp.send(null);
	},
	getScript : function(s,call){
		var el = UI.DC('script');
		if (call) {
			if (UI.Browser.ie) {
				el.onreadystatechange = function(){
					if (el.readyState == 'loaded' || el.readyState == 'complete') call();
				}
			}
			else el.onload = call;
		}
		UI.A(el,'type','text/javascript');
		UI.A(el,'src',s);
		UI.GT(document,'head')[0].appendChild(el);
	},
	getCss : function(s,call){
		var el = UI.DC('link');
		if (call) {
			el.onload = call;
		}
		UI.A(el,'rel','stylesheet');
		UI.A(el,'type','text/css');
		UI.A(el,'href',s);
		UI.GT(document,'head')[0].appendChild(el);
	},
	evalScript : function(s){
		var r = this.regExp.script;
		var s = s.match(new RegExp(r,'img'));
		UI.each(s,function(e){
			eval(e.match(new RegExp(r,'im'))[1]);
		})
	},
	regExp : {
		script : '<script[^>]*>([\\S\\s]*?)<\/script>'
	},
	url : {
		encode : function (s) {
			return escape(this._utf8_encode(s));
		},
		decode : function (s) {
			return this._utf8_decode(unescape(s));
		},
		_utf8_encode : function (s) {
			s = s.replace(/\r\n/g,'\n');
			var utftext = '';
			for (var n = 0; n < s.length; n++) {
				var c = s.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
	 
			}
			return utftext;
		},
		_utf8_decode : function (utftext) {
			var string = '';
			var i = 0;
			var c = c1 = c2 = 0;
			while ( i < utftext.length ) {
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				}
				else if((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i+1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				}
				else {
					c2 = utftext.charCodeAt(i+1);
					c3 = utftext.charCodeAt(i+2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		}
	},
	parseUrl : function() {
		var url = document.location.href,v = {};
		if (!url.hasString('?')) return v;
		var str = url.split('?')[1].split('&');
		for (var i=0;i<str.length;i++) {
			var value = str[i].split('=');
			v[value[0]] = UI.Browser.ie ? value[1] : UI.url.decode(value[1]);
		}
		return v;
	},
	cookie : function(n,v,d) { //Cookie
		if (v == undefined) {
			var N = n + '=',C = document.cookie.split(';');
			for(var i=0;i<C.length;i++) {
				var c = C[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(N) == 0) return decodeURIComponent(c.substring(N.length,c.length));
			}
			return null;
		}
		else {
			var k = '';
			if (d) {
				var D = new Date();
				D.setTime(D.getTime() + d * 24 * 60 * 60 * 1000);
				k = '; expires=' + D.toGMTString();
			}
			document.cookie = n + '=' + v + k + '; path=/';
		}
	},
	drag : function(o,f,captrue) {
		var D = document,captrue = captrue != undefined ? captrue : true;
		UI.EA(o,'mousedown',function(e){
			if (f.start) f.start(e);//start

			if (captrue) {
				if(o.setCapture) o.setCapture();
				else if(window.captureEvents) window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
			}

			if (f.drag) D.onmousemove = f.drag; //drag
			D.onmouseup = function(){
				if (captrue) {
					if(o.releaseCapture) o.releaseCapture();
					else if(window.captureEvents) window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
				}

				if (f.stop) f.stop(e); //stop
				D.onmousemove = null;
				D.onmouseup = null;
				if (f.call) f.call(e); //call
			}
		})
	},
	animate : function(o,name,num,call) { // UI.animate(UI.G('news_bar'),'width',100)
		var delay = setInterval(function(){
			var cur = UI.C(o,name);
			if (name == 'opacity') {
				cur = cur*100;
				num *= 100;
			}
			else cur = ( cur=='auto' ? 0 : Number(cur.slice(0,-2)) );
			if (Math.abs(num - cur) < 3) {
				cur = num;
				clearInterval(delay);
				eval(call);
			}
			UI.C(o,name,(name != 'opacity' ? (cur + (num-cur)*0.4 ) + 'px' : (cur + (num-cur)*0.4 )/100 + ''));
		},40);
		return delay;
	},
	getX : function(o) {
		return o.offsetParent ? o.offsetLeft + UI.getX(o.offsetParent) : o.offsetLeft;
	},
	getY : function(o) {
		return o.offsetParent ? o.offsetTop + UI.getY(o.offsetParent) : o.offsetTop;
	},
	within : function(o,t) {
		var x1 = UI.getX(t) - UI.scrollX(),x2 = UI.width(t) + x1,y1 = UI.getY(t) - UI.scrollY(),y2 = UI.height(t) + y1,obj = {};
		if (o[0] > x1 && o[0] < x2 && o[1] > y1 && o[1] < y2) {
			if (o[0] - x1 < (x2 - x1)/2) obj.left = true;
			if (o[1] - y1 < (y2 - y1)/2) obj.top = true;
			return obj;
		}
	},
	frameX : function(o) {
		return o.frameElement ? UI.getX(o.frameElement) + UI.frameX(o.parent) : 0;
	},
	frameY : function(o) {
		return o.frameElement ? UI.getY(o.frameElement) + UI.frameY(o.parent) : 0;
	},
	width : function(o) {
		return parseInt(o.offsetWidth);
	},
	height : function(o) {
		return parseInt(o.offsetHeight);
	},
	pageWidth : function() {
		return document.body.scrollWidth || document.documentElement.scrollWidth;
	},
	pageHeight : function() {
		return document.body.scrollHeight || document.documentElement.scrollHeight;
	},
	windowWidth : function() {
		var E = document.documentElement;
		return self.innerWidth || (E && E.clientWidth) || document.body.clientWidth;
	},
	windowHeight : function() {
		var E = document.documentElement;
		return self.innerHeight || (E && E.clientHeight) || document.body.clientHeight;
	},
	scrollX : function(o) {
		var E = document.documentElement;
		if (o) {
			var P = o.parentNode,X = o.scrollLeft || 0;
			if (o == E) X = UI.scrollX();
			return P ? X + UI.scrollX(P) : X;
		}
		return self.pageXOffset || (E && E.scrollLeft) || document.body.scrollLeft;
	},
	scrollY : function(o) {
		var E = document.documentElement;
		if (o) {
			var P = o.parentNode,Y = o.scrollTop || 0;
			if (o == E) Y = UI.scrollY();
			return P ? Y + UI.scrollY(P) : Y;
		}
		return self.pageYOffset || (E && E.scrollTop) || document.body.scrollTop;
	},
	scrollTo : function(o,x,y) {
		if (o == document.documentElement || o == document.body) {
			return window.scrollTo(x,y);
		}

	},
	hide : function(o) {
		if (!o) return false;
		if (UI.isString(o)) o = this.G(o);
		var curDisplay = this.C(o,'display');
		if (curDisplay != 'none') {
			o.__curDisplay = curDisplay;
		}
		o.style.display = 'none';
	},
	show : function(o) {
		if (!o) return false;
		if (UI.isString(o)) o = this.G(o);
		o.style.display = o.__curDisplay || '';
	},
	toggle : function(o) {
		if (UI.isString(o)) o = this.G(o);
		if (this.C(o,'display') == 'none') {
			this.show(o);
		}
		else this.hide(o);
	},
	hasClass : function(o,n){
		if (!o.className) return false;
		return o.className != o.className.replace(new RegExp('\\b' + n + '\\b'),'');
	},
	addClass : function(o,n){
		if (!o.className) {
			o.className = n;
		}
		else if (this.hasClass(o,n)) {
			return false;
		}
		else o.className += ' ' + n;
	},
	removeClass : function(o,n){
		o.className = o.className.replace(new RegExp('\\b' + n + '\\b'),'');
	},
	toggleClass : function(o,n){
		if (this.hasClass(o,n)) this.removeClass(o,n);
		else this.addClass(o,n);
	},
	node : {
		ELEMENT : 1,
		ATTRIBUTE : 2,
		TEXT : 3,
		CDATA_SECTION : 4,
		ENTITY : 6,
		COMMENT : 8,
		DOCUMENT : 9,
		DOCUMENT_TYPE : 10
	},
	next : function(o) {
		var n = o.nextSibling;
		if (n == null) return false;
		return UI.isElement(n) ? n : this.next(n);
	},
	prev : function(o) {
		var n = o.previousSibling;
		if (n == null) return false;
		return UI.isElement(n) ? n : this.prev(n);
	},
	append : function(o,t) {
		t.appendChild(o);
	},
	prepend : function(o,t) {
		var first = t.firstChild;
		if (first) UI.before(o,first);
		else UI.append(o,t);
	},
	after : function(o,t) {
		var P = t.parentNode;
		if(P.lastChild == o) P.appendChild(o);
		else P.insertBefore(o,t.nextSibling);
	},
	before : function(o,t) {
		t.parentNode.insertBefore(o,t);
	},
	replace : function(o,t) {
		var P = t.parentNode;
		/*UI.before(o,t);
		P.removeChild(t);*/
		P.replaceChild(o,t);
	},
	swap : function(o,t) {
		
	},
	wrap : function(o,t) {
		if (UI.isString(o)) {
			var reg = o.match(/(<[^\/][^<]*>)/g),name = 'wrapObject___';
			var last = RegExp.lastMatch;
			o = o.replace(last,last + '<pre class="' + name + '"></pre>');
			var tmp = UI.html(o)[0];
			UI.before(tmp,t);
			UI.replace(t,UI.GC(tmp,'pre.' + name)[0]);
		}
		else {
			UI.before(o,t);
			t.appendChild(t);
		}
	},
	html : function(s) {
		var wrap = UI.DC('div'),tmp = [];
		wrap.innerHTML = s;
		UI.each(wrap.childNodes,function(o){
			tmp.push(o);
		});
		return tmp;
	},
	text : function text(el) {//待完善
		var str = [],e = el.childNodes;
		for (var i = 0,num = e.length;i < num;i++) {
			str.push(e[i].nodeType != 1 ? e[i].nodeValue : text(e[i]));
		}
		return str.join('');
	},
	parent : function(o,n) {
		if (UI.isArray(o)) {
			var tmp = [];
			UI.each(o,function(o){
				if ((n && UI.hasClass(o.parentNode,n)) || !n) tmp.push(o.parentNode);
			});
			return tmp;
		}
		return o.parentNode;
	},
	parents : function(o,n) {
		if (n) {
			var tmp = [],arr = UI.parents(o);
			UI.each(arr,function(o){
				if (UI.hasClass(o,n)) {
					tmp.push(o);
				}
			});
			return tmp;
		}
		var P = o.parentNode;
		return P.nodeName == 'HTML' ? [P] : [P].concat(UI.parents(P));
	},
	children : function(o,n) {
		var tmp = [];
		if (n) n = n.split('|');
		UI.each(o.childNodes,function(o){
			var c = false;//HasClassName
			if (n){
				for (var i = 0,num = n.length;i < num;i++){
					if (UI.hasClass(o,n[i])) {
						c = true;
						break;
					}
				}				
			}
			if (UI.isElement(o) && (!n || c)) tmp.push(o);
		});
		return tmp;
	},
	A : function(o,n,v) {
		if (v==undefined) {
			return o.getAttribute(n);
		}
		else o.setAttribute(n,v);
	},
	C : function(o,n,v) { //CSS
		if (v==undefined) { //Get Style
			if (o.currentStyle) {
				if (n=='opacity') {
					return o.style.filter.indexOf('opacity=') >= 0 ? (parseFloat( o.style.filter.match(/opacity=([^)]*)/)[1] )/100):'1';
				}
				return o.currentStyle[n];
			}
			else if (window.getComputedStyle) {
				n = n.replace (/([A-Z])/g, '-$1');
				n = n.toLowerCase ();
				return window.getComputedStyle (o, null).getPropertyValue(n);
			}
		}
		else {
			if (n=='opacity' && UI.Browser.ie) {
				o.style.filter = (o.filter || '').replace( /alpha\([^)]*\)/, '') + 'alpha(opacity=' + v * 100 + ')';
			}
			else o.style[n] = v;
		}
	},
	DC : function(n) { //Dom Create Element
		return document.createElement(n);
	},
	E : function(e) {
		if (e && e.clone) return e;
		e = window.event || e;
		return {
			clone : true,
			stop : function() {
				if (e && e.stopPropagation) e.stopPropagation();
				else e.cancelBubble = true;
			},
			prevent : function(){
				if (e && e.preventDefault) e.preventDefault();
				else e.returnValue = false;
			},
			target : e.target || e.srcElement,
			x : e.clientX || e.pageX,
			y : e.clientY || e.pageY,
			button : e.button,
			key : e.keyCode,
			shift : e.shiftKey,
			alt : e.altKey,
			ctrl : e.ctrlKey,
			type : e.type
		};
	},
	EA : function (o,n,f,capture) {
		if (UI.isString(o)) {
			var tmp = f;
			f = function(e) {
				eval(tmp);
			}
		}
		if(o.addEventListener) {
			o.addEventListener(n,f,capture);
			return true;
		}
		else if(o.attachEvent) {
			var r = o.attachEvent('on'+n,f);
			//UI.EventCache.add(o,evType,fn);
			return r;
		}
		else return false;
	},
	ER : function (o,n,f) {
		if(o.removeEventListener) {
			o.removeEventListener(n,f,false);
			return true;
		}
		else if(o.detachEvent) {
			var r=o.detachEvent('on'+n,f);
			return r;
		}
		else return false;
	},
	ET : function(e) { //Event Target
		return e.target||e.srcElement;
	},
	G : function(n) {
		return document.getElementById(n);
	},
	GT : function(o,n) {
		return o.getElementsByTagName(n);
	},
	GC ://From http://james.padolsey.com/javascript/mini/
		(function(){var b=/(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,g=/^(?:[\w\-_]+)?\.([\w\-_]+)/,f=/^(?:[\w\-_]+)?#([\w\-_]+)/,j=/^([\w\*\-_]+)/,h=[null,null];function d(m,o){if(!o){o=m;m=document;};m=m||document;var k=/^[\w\-_#]+$/.test(o);if(!k&&m.querySelectorAll){return c(m.querySelectorAll(o))}if(o.indexOf(",")>-1){var v=o.split(/,/g),t=[],s=0,r=v.length;for(;s<r;++s){t=t.concat(d(v[s],m))}return e(t)}var p=o.match(b),n=p.pop(),l=(n.match(f)||h)[1],u=!l&&(n.match(g)||h)[1],w=!l&&(n.match(j)||h)[1],q;if(u&&!w&&m.getElementsByClassName){q=c(m.getElementsByClassName(u))}else{q=!l&&c(m.getElementsByTagName(w||"*"));if(u){q=i(q,"className",RegExp("(^|\\s)"+u+"(\\s|$)"))}if(l){var x=m.getElementById(l);return x?[x]:[]}}return p[0]&&q[0]?a(p,q):q}function c(o){try{return Array.prototype.slice.call(o)}catch(n){var l=[],m=0,k=o.length;for(;m<k;++m){l[m]=o[m]}return l}}function a(w,p,n){var q=w.pop();if(q===">"){return a(w,p,true)}var s=[],k=-1,l=(q.match(f)||h)[1],t=!l&&(q.match(g)||h)[1],v=!l&&(q.match(j)||h)[1],u=-1,m,x,o;v=v&&v.toLowerCase();while((m=p[++u])){x=m.parentNode;do{o=!v||v==="*"||v===x.nodeName.toLowerCase();o=o&&(!l||x.id===l);o=o&&(!t||RegExp("(^|\\s)"+t+"(\\s|$)").test(x.className));if(n||o){break}}while((x=x.parentNode));if(o){s[++k]=m}}return w[0]&&s[0]?a(w,s):s}var e=(function(){var k=+new Date();var l=(function(){var m=1;return function(p){var o=p[k],n=m++;if(!o){p[k]=n;return true}return false}})();return function(m){var s=m.length,n=[],q=-1,o=0,p;for(;o<s;++o){p=m[o];if(l(p)){n[++q]=p}}k+=1;return n}})();function i(q,k,p){var m=-1,o,n=-1,l=[];while((o=q[++m])){if(p.test(o[k])){l[++n]=o}}return l}return d})()
	,
	isDate : function(o) {
		if (!o) return o;
		if (o.getTime && o.getFullYear && o.getTimezoneOffset && o != 'NaN' && o != 'Invalid Date') return true;
	},
	cloneDate : function(v) {
		if (!v) return v;
		d = new Date();
		d.setTime(v.getTime());
		return d;
	},
	formatDate : function(v,f) {
		var F = f.replace(/\W/g,',').split(','),format = ['yyyy','MM','dd','hh','mm','ss','ww'];
		var date = {
			y : v.getFullYear(),
			M : v.getMonth() + 1,
			d : v.getDate(),
			h : v.getHours(),
			m : v.getMinutes(),
			s : v.getSeconds(),
			w : v.getDay()
		};
		for (var i = 0,num = F.length;i < num;i++) {
			var o = F[i];
			for (var j = 0;j < 7;j++) {
				var S = format[j].slice(-1);
				if (o.hasString(S)) {
					if (S == 'w' && date[S] == 0) date[S] = 7; //Sunday
					if (o.hasString(format[j])) {
						f = f.replace(RegExp(format[j],'g'),this.addZero(date[S]));
					}
					else f = f.replace(RegExp(format[j].slice(format[j].length/2),'g'),date[S]);
				}
			}
		}
		return f;
	},
	parseDate : function(v,f) {
		if (!f) f = 'yyyy-MM-dd';
		f = f.replace(/\W/g,',').split(',');
		v = v.replace(/\D/g,',').split(',');
		var y = 2000,M = 0,d = 1,h = 0,m = 0,s = 0,D = true;
		UI.each(f,function(o,i){
			if (v[i] == '' || isNaN(v[i])) D = false;
			if (o.hasString('y')) y = Number(v[i]);
			if (o.hasString('M')) M = Number(v[i]) - 1;
			if (o.hasString('d')) d = Number(v[i]);
			if (o.hasString('h')) h = Number(v[i]);
			if (o.hasString('m')) m = Number(v[i]);
			if (o.hasString('s')) s = Number(v[i]);
			if (o.hasString('w')) s = Number(v[i]);
		});
		if (!D) return false;
		return new Date(y,M,d,h,m,s);
	},
	isArray : function(o) {
		return o !== null && UI.isObject(o) && 'splice' in o && 'join' in o;
	},
	isElement : function(o) {
		return o && o.nodeType == 1;
	},
	isFunction : function(o) {
		return typeof o == 'function';
	},
	isNumber : function(o) {
		return typeof o == 'number';
	},
	isObject : function(o) {
		return typeof o == 'object';
	},
	isString : function(o) {
		return typeof o == 'string';
	},
	isUndefined : function(o) {
		return typeof o == 'undefined';
	},
	addZero : function(o,n) {
		var tmp = [],l = String(o).length;
		if (!n) n = 2;
		if (l < n) {
			for (var i = 0;i < n - l;i++) {
				tmp.push(0);
			}
		}
		tmp.push(o);
		return tmp.join('');
	},
	trim : function(o) {
		return o.replace(/^\s+|\s+$/g,'');
	},
	random : function(a,b) {
		if (a == undefined) a = 0;
		if (b == undefined) b = 9;
		return Math.floor(Math.random() * (b - a + 1) + a);
	},
	has : function(o,v) {
		for (var i = 0,n = o.length;i < n;i++) {
			if (o[i] == v) return true;
		}
		return false;
	},
	each : function(o,f) {
		if(UI.isUndefined(o[0])){
			for (var key in o){
				if(!UI.isFunction(o[key])) f(key,o[key]);
			}
		}
		else{
			for(var i = 0,n = o.length;i < n;i++){
				if(!UI.isFunction(o[i])) f(o[i],i);
			}
		}
	},
	map : function(o,f) {
		if (UI.isString(f)) f = eval('(function(a,i) { return ' + f + '})');
		var tmp = [];
		UI.each(o,function(o,i){
			var v = f(o,i);
			if (UI.isArray(v)) {
				tmp = tmp.concat(v);
			}
			else tmp.push(v);
		});
		return tmp;
	},
	grep : function(o,f) {
		if (UI.isString(f)) f = eval('(function(a,i) { return ' + f + '})');
		var tmp = [];
		UI.each(o,function(o,i){
			if (f(o,i)) tmp.push(o);
		});
		return tmp;
	},
	merge : function(A,B) {
		var tmp = [];
		if (B) { //Merge A + B
			UI.each(B,function(o,i){
				if (!UI.has(A,o)) tmp.push(o);
			});
			return A.concat(tmp);
		}
		else { //Merge Same Value For A
			UI.each(A,function(o,i){
				if (!UI.has(tmp,o)) tmp.push(o);
			});
			return tmp;
		}
	},
	apart : function(A,B) {
		var tmp = [];
		UI.each(A,function(o,i){
			if (!UI.has(B,o)) tmp.push(o);
		});
		return tmp;
	},
	sort : {
		number : function(a,b) {
			return a - b;
		},
		numberDesc : function(a,b) {
			return b - a;
		},
		string : function(a,b) {
			return a.localeCompare(b);
		},
		stringDesc : function(a,b) {
			return b.localeCompare(a);
		}
	},
	ready : function(f) {
		if (UI.ready.done) return f();
		if (UI.ready.timer) {
			UI.ready.ready.push(f);
		}
		else {
			//UI.EA(window,'load',UI.isReady);
			UI.ready.ready = [f];
			UI.ready.timer = setInterval(UI.isReady,13);
		}
	},
	isReady : function() {
		if (UI.ready.done) return false;
		if (document && document.getElementsByTagName && document.getElementById && document.body) {
			clearInterval(UI.ready.timer);
			UI.ready.timer = null;
			for (var i = 0;i < UI.ready.ready.length;i++)
				UI.ready.ready[i]();
			UI.ready.ready = null;
			UI.ready.done = true;
		}
	},
	Browser : (function(){
		var b = {},i = navigator.userAgent;
		b.ie6 = i.hasString('MSIE 6') && !i.hasString('MSIE 7') && !i.hasString('MSIE 8');
		b.ie = i.hasString('MSIE');
		b.tt = i.hasString('TencentTraveler');
		b.opera = window['opera'] || i.hasString('Opera');
		b.safari = i.hasString('WebKit');
		b.maxthon = !!(window['external'] && window['external']['max_version']);
		return b;
	})()
};
UI.Flash = function(o,src,width,height) {
	o.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+width+'" height="'+height+'" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0"><param name="allowScriptAccess" value="always" /><param name="movie" value="'+src+'" /><param name="quality" value="high" /><param name="wmode" value="transparent" /><embed src="'+src+'" width="'+width+'" height="'+height+'" quality="high" wmode="transparent" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" allowScriptAccess="always" type="application/x-shockwave-flash"/></object>';
}
UI.Resize = function(o,option) {
	var P = o.parentNode.parentNode;
	var ico = UI.GC(P,'.ico')[0];
	var w,h,x,y,action,padding_y = 0,padding_x = 0;

	if (!option) option = {
		min : {
			x : 20,
			y : 15
		},
		max : {
			x : Infinity,
			y : Infinity
		}
	}
	else {
		if (!option.min) option.min = {
			x : 20,
			y : 15
		}
		if (!option.max) option.max = {
			x : Infinity,
			y : Infinity
		}
	}

	UI.drag(ico,{
		start : function(e) {
			var E = UI.E(e);
			x = E.x;
			y = E.y;
			w = UI.width(o);
			h = UI.height(o);
			action = UI.C(ico,'cursor');
			if (!UI.Browser.ie && document.compatMode == 'BackCompat') {
				var Self = ico.parentNode;
				padding_x = parseInt(UI.C(Self,'paddingLeft')) + parseInt(UI.C(Self,'paddingRight'));
				padding_y = parseInt(UI.C(Self,'paddingBottom')) + parseInt(UI.C(Self,'paddingTop'));
			}
		},
		drag : function(e) {
			var E = UI.E(e),W,H;
			switch (action) {
				case 'ne-resize':
					W = w + E.x - x - padding_x;
					H = h - E.y + y - padding_y;
					break;
				case 'se-resize':
					W = w + E.x - x - padding_x;
					H = h + E.y - y - padding_y;
					break;
				case 'nw-resize':
					W = w - E.x + x - padding_x;
					H = h - E.y + y - padding_y;
					break;
				case 'sw-resize':
					W = w - E.x + x - padding_x;
					H = h + E.y - y - padding_y;
					break;
				case 'e-resize':
					W = w - E.x + x - padding_x;
					break;
				case 's-resize':
					H = h + E.y - y - padding_y;
					break;
			}
			if (W < option.min.x) W = option.min.x;
			if (W > option.max.x) W = option.max.x;
			if (H < option.min.y) H = option.min.y;
			if (H > option.max.y) H = option.max.y;
			try{
				UI.C(o,'width',W + 'px');
				UI.C(o,'height',H + 'px');
			}catch(e){};
		}
	},UI.isUndefined(option.capture) ? true : option.capture);
}
UI.Gotop = {
	title : '返回顶部',
	className : 'gotop',
	text : 'Top',
	body : UI.DC('a'),
	_delay : null,
	build : function(id) {
		this.body.className = this.className;
		this.body.title = this.title;
		this.body.innerHTML = this.text;
		this.body.href = '#' + (id||'');
		document.body.appendChild(this.body);
		this.body.onfocus = function(){
			this.blur();
		}
		UI.EA(window,'scroll',function(){
			clearTimeout(UI.Gotop._delay);
			UI.Gotop._delay = setTimeout(function(){
				( window.scrollY || document.documentElement.scrollTop ) < 52 ? UI.Gotop.body.style.display = 'none':UI.Gotop.body.style.display = 'block';
			},50);
		});
	}
}
if (UI.Browser.ie) {
	try{
		document.execCommand('BackgroundImageCache',false,true);
	}catch(e){}
}
if (!window['console']) {
	window['console'] = {
		log : function(){
			UI.each(arguments,function(o){
				//alert(o);
			});
		},
		dir : function(){
			
		}
	};
} 
