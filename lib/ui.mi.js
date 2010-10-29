/**
 * UI Javascript Library
 * 
 * @author xhlv(<a href="mailto:lvxuhui@gmail.com">lvxuhui@gmail.com</a>)
 */

/**
 * 判断是否有字符
 * 
 * @param {String} String 字符
 * @return {Boolean} Boolean 返回布尔值
 *            @example
 *            'abc'.hasString('a');
 *            'abc'.hasString(['a','b']);
 */
String.prototype.hasString = function(o) {
	if (typeof o == 'object') {
		for (var i = 0,n = o.length;i < n;i++) {
			if (!this.hasString(o[i])) return false;
		}
		return true;
	}
	else if (this.indexOf(o) != -1) return true;
}

/**
 * 截断字符串
 * 
 * @param {Number} Number 间隔数
 * @param {String} String 截断所使用字符
 * @return {String} String 返回字符串
 *            @example
 *            'aaaaaaaaa'.breakWord(1);
 *            'aaaaaaaaa'.breakWord(2,'&lt;br&gt;');
 */
String.prototype.breakWord = function(number,string) {
	string || (string = '<wbr/>');
	return this.replace(RegExp('(\\w{' + (number ? number : 0) + '})(\\w)','g'),function(all,str,chars){
		return str + string + chars;
	});
}
UI = window.UI || {
	ajax : function(o) { // UI.ajax({url:'json.html',data:'',success:''})
		var xmlHttp = UI.xmlHttp();
		xmlHttp.onreadystatechange = function(){
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
				try{
					o.success(xmlHttp.responseText);
				}catch(e){}
			}else{
				return xmlHttp;
			}
		}
		xmlHttp.open('POST',o.url,true);
		xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		if (UI.isObject(o.data)) {
			var data = [];
			for (var i in o.data) {
				data.push(i + '=' + encodeURIComponent(o.data[i]));
			}
			o.data = data.join('&');
		}
		xmlHttp.send(o.data);
		return xmlHttp;
	},
	get : function(url,o,f) { // UI.get('json.html','name=""',function(data){ alert(data); })
		var xmlHttp = UI.xmlHttp(),search = url.hasString('?') ? '' : '?';
		xmlHttp.onreadystatechange = function(){
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
				try{
					f(xmlHttp.responseText);
				}catch(e){}
			}else{
				return xmlHttp;
			}
		}
		if (o != undefined) {
			if (UI.isObject(o)) {
				var data = [];
				for (var i in o) {
					data.push(i + '=' + encodeURIComponent(o[i]));
				}
				url += search + data.join('&');
			}
			else url += search + o;
		}
		xmlHttp.open('GET',url,true)
		xmlHttp.send(null);
		return xmlHttp;
	},
	xmlHttp : function(){
		var xmlHttp;
		if (window.ActiveXObject){
			xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
		}else if (window.XMLHttpRequest){
			xmlHttp = new XMLHttpRequest();
		}
		return xmlHttp;
	},
	getScript : function(url,call,charset){
		var el = UI.DC('script');
		if (call) {
			if (UI.B.ie) {
				el.onreadystatechange = function(){
					if (el.readyState == 'loaded' || el.readyState == 'complete') call();
				}
			}
			else el.onload = call;
		}
		if(charset){
			UI.A(el,'charset',charset);
		}
		UI.A(el,'type','text/javascript');
		UI.A(el,'src',url);
		UI.GT(document,'head')[0].appendChild(el);
	},
	getCss : function(url,call){
		var el = UI.DC('link');
		if (call) {
			el.onload = call;
		}
		UI.A(el,'rel','stylesheet');
		UI.A(el,'type','text/css');
		UI.A(el,'href',url);
		UI.GT(document,'head')[0].appendChild(el);
	},
	evalScript : function(s){
		var r = this.regExp.script;
		var s = s.match(new RegExp(r,'img'));
		if (s) {
			UI.each(s,function(e){
				eval(e.match(new RegExp(r,'im'))[1]);
			})
		}
	},
	regExp : {
		script : '<script[^>]*>([\\S\\s]*?)<\/script>'
	},
	encode : function (s) {
		return escape(UI.utfEncode(s));
	},
	decode : function (s) {
		return UI.utfDecode(unescape(s));
	},
	utfEncode : function (s) {
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
	utfDecode : function (utftext) {
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
	},
	/**
	 * 获得当前url的参数
	 * 
	 * @param {String} String 取值类型： "?"、 "#" （默认值为"?"）
	 * @return {Object} Object 参数对象
	 *            @example
	 *            var url = UI.parseUrl();
	 */
	parseUrl : function(href,type) {
		var url = href ? href : document.location.href,v = {},type = type || '?';
		if (!url.hasString(type)) return v;
		var str = url.split(type)[1].split('&');
		for (var i=0;i<str.length;i++) {
			var value = str[i].replace(/#.*$/g,'').split('=');
			if (!value[1]) {
				value[1] = '';
			}
			v[value[0]] = UI.B.ie ? value[1] : UI.decode(value[1]);
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
	/**
	 * 动画
	 * 
	 * @param {Object} Object Dom对象
	 * @param {String} String 动画变化值名称
	 * @param {Number} Number 动画结束后的值
	 * @param {Function} Function 动画结束后的回调函数
	 * @param {Number} Number 动画运动速度（0到1之间）
	 * @default "0.4"
	 * @return {Number} Number 动画时钟的标志，用于停止动画
	 *            @example
	 *            var animate = UI.animate(el,'opacity',0,function(){
	 *                el.style.display = 'none';
	 *            },0.4);
	 *            clearInterval(animate);
	 */
	animate : function(o,name,num,call,type) {
		var type = type || 0.4,isScroll = name.hasString('scroll'),curTmp,delay = setInterval(function(){
			var cur = isScroll ? o[name] : UI.C(o,name),last;
			if (name == 'opacity') {
				cur = cur*100;
				num *= 100;
				if (num > 100) num = 100;
			}
			else if (!isScroll) {
				cur = ( cur == 'auto' ? 0 : Number(cur.slice(0,-2)) );
			}
			if (Math.abs(num - cur) <= 3 || (isScroll && curTmp == cur)) {
				cur = num;
				clearInterval(delay);
			}
			last = curTmp = cur + (num - cur) * type;
			if (isScroll) {
				o[name] = parseInt(last);
			}
			else UI.C(o,name,(name != 'opacity' ? last + 'px' : last/100 + ''));
			if (cur == num){
				if (UI.isString(call)) {
					eval(call);
				}
				else if (call) {
					call();
				}
			}
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
		if (o) {
			o.className = o.className.replace(new RegExp('\\b' + n + '\\b'),'');
		}
	},
	toggleClass : function(o,n){
		if (this.hasClass(o,n)) this.removeClass(o,n);
		else this.addClass(o,n);
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
	remove : function(o){
		if (o && o.parentNode){
			o.parentNode.removeChild(o);
		}
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
		P.replaceChild(o,t);
	},
	tmpl : (function(){ //Javascript Template From http://ejohn.org/blog/javascript-micro-templating
		/*
			template :
				<script type="text/html" id="tmpl">
					<div id="<%=id%>" class="<%=(i % 2 == 1 ? "even" : "")%>">
						<b><a href="/<%=from_user%>"><%=from_user%></a>:</b> <%=text%></p>
					</div>
					<% for ( var i = 0; i < users.length; i++ ) { %>
						<li><a href="<%=users[i].url%>"><%=users[i].name%></a>
						<% if (users[i].url == 1) { %>
							If Success
						<% } %>
						</li>
					<% } %>
				</script>
				<div id="results"></div>

			create :
				var results = UI.G('results');
				//results.innerHTML = UI.tmpl('tmpl',{id:1,i:1,from_user:'from_user',from_user:'from_user',text:'text',users:[{url:'1',name:'1'},{url:'2',name:'2'}]});
				var show = UI.tmpl('tmpl');
				results.innerHTML += show({id:1,i:1,from_user:'from_user',from_user:'from_user',text:'text',users:[{url:'1',name:'1'},{url:'2',name:'2'}]});
				
		*/
		var cache = {};
		return function tmpl(str,data){
			var fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(UI.G(str).innerHTML) : UI.tmplString(str);
			return data ? fn(data) : fn;
		};
	})(),
	tmplString : function(str){
		/*
			create : 
				var str = '<div id="<%=id%>" class="<%=(i % 2 == 1 ? "even" : "")%>"><b><a href="/<%=from_user%>"><%=from_user%></a>:</b> <%=text%></p></div><% for ( var i = 0; i < users.length; i++ ) { %><li><a href="<%=users[i].url%>"><%=users[i].name%></a><% if (users[i].url == 1) { %>If Success<% } %></li><% } %>';
				var oTmpl = new UI.tmplString(str);
				results.innerHTML += oTmpl({id:1,i:1,from_user:'from_user',from_user:'from_user',text:'text',users:[{url:'1',name:'1'},{url:'2',name:'2'}]});
		*/
		return new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('" + str
		.replace(/[\r\t\n]/g, " ")
		.split("<%").join("\t")
		.replace(/((^|%>)[^\t]*)'/g, "$1\r")
		.replace(/\t=(.*?)%>/g, "',$1,'")
		.split("\t").join("');")
		.split("%>").join("p.push('")
		.split("\r").join("\\'")
		+ "');}return p.join('');");
	},
	html : function(s) {
		var wrap = UI.DC('div'),tmp = [];
		wrap.innerHTML = s;
		UI.each(wrap.childNodes,function(o){
			tmp.push(o);
		});
		return tmp;
	},
	css : function(string) {
		var style = UI.DC('style'),text;
		UI.A(style,'type','text/css');
		if(style.styleSheet) {
			style.styleSheet.cssText = string;
		}
		else {
			text = document.createTextNode(string);
			UI.append(text,style);
		}
		UI.append(style,UI.GT(document,'head')[0]);
	},
	text : function text(el) {//
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
		if (v == undefined) {
			return o.getAttribute(n);
		}
		else if (v == '') {
			o.removeAttribute(n);
		}
		else o.setAttribute(n,v);
	},
	C : function(o,n,v) { //CSS
		if (v == undefined) { //Get Style
			if (window.getComputedStyle) {
				n = n.replace (/([A-Z])/g, '-$1');
				n = n.toLowerCase ();
				return window.getComputedStyle (o, null).getPropertyValue(n);
			}
			else if (o.currentStyle) {
				if (n == 'opacity') {
					return o.style.filter.indexOf('opacity=') >= 0 ? (parseFloat( o.style.filter.match(/opacity=([^)]*)/)[1] )/100):'1';
				}
				return o.currentStyle[n];
			}
		}
		else {
			if (n == 'opacity' && UI.B.ie) {
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
			type : e.type,
			wheel : e.wheelDelta/120 || -e.detail/3
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
			if (n == 'mousewheel') n = 'DOMMouseScroll';
			o.addEventListener(n,f,capture);
			return true;
		}
		else if(o.attachEvent) {
			var r = o.attachEvent('on'+n,f);
			//var r = o.attachEvent('on'+n,function(){ return f.call(o,window.event) });
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
	G : function(n) {
		return document.getElementById(n);
	},
	GT : function(o,n) {
		return o.getElementsByTagName(n);
	},
	GC :(function(){ //From http://james.padolsey.com/javascript/mini/
		//input[type=checkbox]  bug in ie
		/*
			Support:
				div.example1.example2 //Add By xhlv
				div
				body div
				div,p
				div,p,.example
				div p
				div > p
				div.example
				ul .example
				#title
				h1#title
				div #title
				ul.foo > * span
		*/
		var snack = /(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,
			exprClassName = /^(?:[\w\-_]+)?\.([\w\-_]+)/,
			exprId = /^(?:[\w\-_]+)?#([\w\-_]+)/,
			exprNodeName = /^([\w\*\-_]+)/,
			na = [null,null];
		function _find(context,selector) { //This is what you call via x() Starts everything off...
			if (!selector){
				selector = context;
				context = document;
			}
			context = context || document;
			var simple = /^[\w\-_#]+$/.test(selector);

			if (!simple && context.querySelectorAll) {
				return realArray(context.querySelectorAll(selector));
			}
			if (selector.indexOf(',') > -1) {
				var split = selector.split(/,/g), ret = [], sIndex = 0, len = split.length;
				for(; sIndex < len; ++sIndex) {
					ret = ret.concat( _find(context, split[sIndex]) );
				}
				return unique(ret);
			}

			var parts = selector.match(snack),
				part = parts.pop(),
				id = (part.match(exprId) || na)[1],
				className = !id && (part.match(exprClassName) || na)[1],
				classNameOther = part.split('.').slice(2), //Add By xhlv,For Find '.red.yellow'
				nodeName = !id && (part.match(exprNodeName) || na)[1],
				collection;
			if (className && !nodeName && context.getElementsByClassName) {
				collection = realArray(context.getElementsByClassName(className));
			}
			else {
				collection = !id && realArray(context.getElementsByTagName(nodeName || '*'));
				if (className) {
					collection = filterByAttr(collection,'className',RegExp('(^|\\s)' + className + '(\\s|$)'),classNameOther);
				}
				if (id) {
					var byId = context.getElementById(id);
					return byId?[byId]:[];
				}
			}
			return parts[0] && collection[0] ? filterParents(parts, collection) : collection;
		}
		function realArray(c) { //Transforms a node collection into a real array
			try {
				return Array.prototype.slice.call(c);
			}catch(e) {
				var ret = [], i = 0, len = c.length;
				for (; i < len; ++i) {
					ret[i] = c[i];
				}
				return ret;
			}
		}
		function filterParents(selectorParts, collection, direct) { //This is where the magic happens.Parents are stepped through (upwards) to see if they comply with the selector.
			var parentSelector = selectorParts.pop();

			if (parentSelector === '>') {
				return filterParents(selectorParts, collection, true);
			}

			var ret = [],
				r = -1,
				id = (parentSelector.match(exprId) || na)[1],
				className = !id && (parentSelector.match(exprClassName) || na)[1],
				nodeName = !id && (parentSelector.match(exprNodeName) || na)[1],
				cIndex = -1,
				node, parent,
				matches;
			nodeName = nodeName && nodeName.toLowerCase();
			while ( (node = collection[++cIndex]) ) {
				parent = node.parentNode;
				do {
					matches = !nodeName || nodeName === '*' || nodeName === parent.nodeName.toLowerCase();
					matches = matches && (!id || parent.id === id);
					matches = matches && (!className || RegExp('(^|\\s)' + className + '(\\s|$)').test(parent.className));
					
					if (direct || matches) { break; }
					
				} while ( (parent = parent.parentNode) );
				
				if (matches) {
					ret[++r] = node;
				}
			}
			return selectorParts[0] && ret[0] ? filterParents(selectorParts, ret) : ret;
		}
		var unique = (function(){
			var uid = +new Date();
			var data = (function(){
				var n = 1;
				return function(elem) {
					var cacheIndex = elem[uid],
						nextCacheIndex = n++;
					if(!cacheIndex) {
						elem[uid] = nextCacheIndex;
						return true;
					}
					return false;
				};
			})();
			return function(arr) { //Returns a unique array
				var length = arr.length,
					ret = [],
					r = -1,
					i = 0,
					item;
				for (; i < length; ++i) {
					item = arr[i];
					if (data(item)) {
						ret[++r] = item;
					}
				}
				uid += 1;
				return ret;
			};
		})();
		function filterByAttr(collection,attr,regex,other) { //Filters a collection by an attribute.
			var i = -1, node, r = -1, ret = [],other = other || '';
			while ( (node = collection[++i]) ) {
				if (regex.test(node[attr]) && node[attr].hasString(other)) {
					ret[++r] = node;
				}
			}
			return ret;
		}
		return _find;
	})(),
	isDate : function(o) {
		return this.getType(o) == 'Date';
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
			//if (v[i] == '' || isNaN(v[i])) D = false;
			if (v[i] != '' && !isNaN(v[i])) {
				if (o.hasString('y')) y = Number(v[i]);
				if (o.hasString('M')) M = Number(v[i]) - 1;
				if (o.hasString('d')) d = Number(v[i]);
				if (o.hasString('h')) h = Number(v[i]);
				if (o.hasString('m')) m = Number(v[i]);
				if (o.hasString('s')) s = Number(v[i]);
				if (o.hasString('w')) s = Number(v[i]);
			}
		});
		if (!D) return false;
		return new Date(y,M,d,h,m,s);
	},
	isObject : function(o) {
		return typeof o == 'object';
	},
	isElement : function(o) {
		return o && o.nodeType == 1;
	},
	isUndefined : function(o) {
		return typeof o == 'undefined';
	},
	isFunction : function(o) {
		return this.getType(o) == 'Function';
	},
	isNumber : function(o) {
		return this.getType(o) == 'Number';
	},
	isString : function(o) {
		return this.getType(o) == 'String';
	},
	isArray : function(o) {
		return this.getType(o) == 'Array';
	},
	getType : function(o){
		return Object.prototype.toString.call(o).slice(8,-1);
	},
	addZero : function(num,n) {
		if (!n) n = 2;
		return Array(Math.abs(('' + num).length - (n + 1))).join(0) + num;
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
	ready : function(f) {
		if (UI.ready.done) return f();
		if (UI.isReady.done) {
			UI.readyDo.push(f);
		}
		else {
			UI.readyDo = [f];
			UI.isReady();
		}
	},
	readyDo : [],
	isReady : function(){
		if (UI.isReady.done) return;
		UI.isReady.done = true;
		if (document.addEventListener) {
			document.addEventListener('DOMContentLoaded',function() {
				document.removeEventListener('DOMContentLoaded',arguments.callee,false);
				UI.onReady();
			},false);
		}
		else if (document.attachEvent) { // If IE event model is used
			var iframe = top != self;
			if (iframe) {
				document.attachEvent('onreadystatechange',function() {
					if (document.readyState === 'complete') {
						document.detachEvent('onreadystatechange',arguments.callee);
						UI.onReady();
					}
				});
			}
			else if (document.documentElement.doScroll && !iframe) { // If IE and not an iframe
				(function() {
					if (UI.ready.done) return;
					try {
						document.documentElement.doScroll('left');
					}catch(e){
						setTimeout(arguments.callee,0);
						return;
					}
					UI.onReady();
				})();
			}
		}
		UI.EA(window,'load',UI.onReady);
	},
	onReady : function() {
		if (!UI.ready.done) {
			UI.ready.done = true;
			for (var i = 0,num = UI.readyDo.length;i < num;i++){
				try{
					UI.readyDo[i]();
				}catch(e){}
			}
			UI.readyDo = null;
		}
	},
	B : (function(){ //Browser
		var b = {},i = navigator.userAgent;
		b.ie6 = i.hasString('MSIE 6') && !i.hasString('MSIE 7') && !i.hasString('MSIE 8');
		b.ie8 = i.hasString('MSIE 8');
		b.ie = i.hasString('MSIE');
		b.safari = i.hasString('WebKit');
		b.ipad = i.hasString('iPad');
		b.firefox = i.hasString('Firefox');
		return b;
	})()
};
UI.B.ie && document.execCommand('BackgroundImageCache', false, true);