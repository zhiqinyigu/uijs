/**
 * UI Javascript Library
 * 
 * @author xhlv(<a href="mailto:lvxuhui@gmail.com">lvxuhui@gmail.com</a>)
 */

/**
 * �ж��Ƿ����ַ�
 * 
 * @param {String} String �ַ�
 * @return {Boolean} Boolean ���ز���ֵ
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
 * �ض��ַ���
 * 
 * @param {Number} Number �����
 * @param {String} String �ض���ʹ���ַ�
 * @return {String} String �����ַ���
 *            @example
 *            'aaaaaaaaa'.breakWord(1);
 *            'aaaaaaaaa'.breakWord(2,'<br>');
 */
String.prototype.breakWord = function(number,string) {
	string || (string = '<wbr/>');
	return this.replace(RegExp('(\\w{' + (number ? number : 0) + '})(\\w)','g'),function(all,str,chars){
		return str + string + chars;
	});
}
/**
 * UIȫ�ֶ���
 * 
 * @namespace UIȫ�ֶ���
 * @type {Object}
 */
UI = window.UI || {
	/**
	 * AJAX����
	 * 
	 * @param {Object} Object ����
	 * @return {Object} Object �����������
	 *            @example
	 *            //Post����
	 *            UI.ajax({
	 *                url:'json.html',
	 *                type:'post',
	 *                data:{id:1},
	 *                success:function(data){
	 *                    data = eval(data);
	 *                }
	 *            })
	 *            
	 *            //Get����
	 *            UI.ajax({
	 *                url:'json.html',
	 *                type:'get',
	 *                data:'id=1',
	 *                success:function(data){
	 *                    data = eval(data);
	 *                }
	 *            })
	 */
	ajax : function(o) {
		if (o.type == 'get') {
			UI.get(o.url,o.data,o.success);
		}
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
	/**
	 * Get����
	 * 
	 * @param {String} String url��ַ
	 * @param {String} String �������
	 * @param {Function} Function �ص�����
	 * @return {Object} Object �����������
	 *            @example
	 *            UI.get('json.html','id=1',function(data){
	 *                data = eval(data);
	 *            });
	 *            
	 *            UI.get('json.html',{id:1},function(data){
	 *                data = eval(data);
	 *            });
	 */
	get : function(url,o,f) {
		var xmlHttp = UI.xmlHttp(),search = url.hasString('?') ? '&' : '?';
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
	/**
	 * �첽����JS�ļ�
	 * 
	 * @param {String} String url��ַ
	 * @param {Function} Function �������Ļص�����
	 *            @example
	 *            UI.getScript('/test.js',function(){
	 *                    
	 *            })
	 */
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
	/**
	 * �첽����CSS�ļ�
	 * 
	 * @param {String} String url��ַ
	 * @param {Function} Function �������Ļص�����
	 *            @example
	 *            UI.getCss('/test.css',function(){
	 *                    
	 *            })
	 */
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
	/**
	 * ִ��<scrcript>���е�JS
	 * 
	 * @param {String} String ��Ҫִ�е��ַ���
	 *            @example
	 *            UI.evalScript('<script>var name = "xhlv";</script>');
	 */
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
	/**
	 * ����
	 * 
	 * @param {String} String ��Ҫ������ַ���
	 * @return {String} String �������ַ���
	 *            @example
	 *            UI.encode('����');
	 */
	encode : function (s) {
		return escape(UI.utfEncode(s));
	},
	/**
	 * ����
	 * 
	 * @param {String} String ��Ҫ������ַ���
	 * @return {String} String �������ַ���
	 *            @example
	 *            UI.decode('����');
	 */
	decode : function (s) {
		return UI.utfDecode(unescape(s));
	},
	/**
	 * ��ȡUTF-8����
	 * 
	 * @param {String} String ��Ҫ������ַ���
	 * @return {String} String �������ַ���
	 *            @example
	 *            UI.utfEncode('����');
	 */
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
	/**
	 * UTF-8����
	 * 
	 * @param {String} String ��Ҫ������ַ���
	 * @return {String} String �������ַ���
	 *            @example
	 *            UI.utfDecode('����');
	 */
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
	 * ��õ�ǰurl�Ĳ���
	 * 
	 * @param {String} String ȡֵ���ͣ� "?"�� "#" ��Ĭ��ֵΪ"?"��
	 * @return {Object} Object ��������
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
	/**
	 * cookie����
	 * 
	 * @param {String} String cookie��
	 * @param {String} String cookieֵ
	 * @param {Number} Number �洢ʱ�䣬����Ϊ��λ
	 * @return {String} String cookieֵ
	 *            @example
	 *            var refresh = UI.cookie('refresh');
	 *            UI.cookie('refresh',1);
	 *            UI.cookie('refresh',1,7);
	 */
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
	 * �϶�
	 * 
	 * @param {Object} Object Dom����
	 * @param {Object} Object �϶��¼�
	 * @param {Boolean} Boolean �Ƿ�������������¼���Ĭ��true
	 *            @example
	 *            var x,y,_x,_y,h_wrap,top,left,move;
	              UI.drag(el,{
	                  start : function(e){
	                      var E = UI.E(e);
	                      E.prevent();
	                      x = E.x;
	                      y = E.y;
	                      left = parseInt(UI.C(body,'marginLeft'));
	                      top = parseInt(UI.C(body,'marginTop'));
	                  },
	                  drag : function(e){
	                      var E = UI.E(e);
	                      E.prevent();
	                      body.style.marginLeft = left + E.x - x + 'px';
	                      body.style.marginTop = top + E.y - y + 'px';
	                  },
	                  stop : function(e){
	                  },
	                  call : function(){
	                  },
	              });
	 *            clearInterval(animate);
	 */
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
	/**
	 * ����
	 * 
	 * @param {Object} Object Dom����
	 * @param {String} String �����仯ֵ����
	 * @param {Number} Number �����������ֵ
	 * @param {Function} Function ����������Ļص�����
	 * @param {Number} Number �����˶��ٶȣ�0��1֮�䣩
	 * @default "0.4"
	 * @return {Number} Number ����ʱ�ӵı�־������ֹͣ����
	 *            @example
	 *            var animate = UI.animate(el,'opacity',0,function(){
	 *                el.style.display = 'none';
	 *            },0.4);
	 *            clearInterval(animate);
	 */
	animate : function(o,name,num,call,type,rate) {
		var type = type || 0.4,isScroll = name.hasString('scroll'),curTmp,delay = setInterval(function(){
			var cur = isScroll ? o[name] : UI.C(o,name),
				last,
				increase,
				isOpacity = name == 'opacity';
			if (isOpacity) {
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
			increase = (num - cur) * type;
			if (!isOpacity){
				if (increase > 0 && increase < 1){
					increase = 1;
				}
				else if (increase < 0 && increase > -1){
					increase = -1;
				}
			}
			last = curTmp = cur + increase;
			if (!isOpacity && ((increase < 0 && num - last > 0) || (increase > 0 && last - num > 0))){
				last = num;
			}
			if (isScroll) {
				o[name] = parseInt(last);
			}
			else UI.C(o,name,(!isOpacity ? last + 'px' : last/100 + ''));
			if (cur == num){
				if (UI.isString(call)) {
					eval(call);
				}
				else if (call) {
					call();
				}
			}
		},rate || 40);
		return delay;
	},
	/**
	 * ��ȡDom��ҳ��X������ֵ
	 * 
	 * @param {Object} Object Dom����
	 * @return {Number} Number X������
	 *            @example
	 *            UI.getX(el);
	 */
	getX : function(o) {
		return o.offsetParent ? o.offsetLeft + UI.getX(o.offsetParent) : o.offsetLeft;
	},
	/**
	 * ��ȡDom��ҳ��Y������ֵ
	 * 
	 * @param {Object} Object Dom����
	 * @return {Number} Number Y������
	 *            @example
	 *            UI.getY(el);
	 */
	getY : function(o) {
		return o.offsetParent ? o.offsetTop + UI.getY(o.offsetParent) : o.offsetTop;
	},
	/**
	 * �ж�Dom�Ƿ���Ŀ��Dom�����ڣ�������ק����ȣ�
	 * 
	 * @param {Object} Object Dom����
	 * @param {Object} Object Ŀ��Dom����
	 * @return {Object} Object �����Ƿ��������� {left:true,top:true}
	 *            @example
	 *            UI.within(el,target);
	 */
	within : function(o,t) {
		var x1 = UI.getX(t) - UI.scrollX(),x2 = UI.width(t) + x1,y1 = UI.getY(t) - UI.scrollY(),y2 = UI.height(t) + y1,obj = {};
		if (o[0] > x1 && o[0] < x2 && o[1] > y1 && o[1] < y2) {
			if (o[0] - x1 < (x2 - x1)/2) obj.left = true;
			if (o[1] - y1 < (y2 - y1)/2) obj.top = true;
			return obj;
		}
	},
	/**
	 * ��ȡIframe�ڸ�ҳ����X������ֵ
	 * 
	 * @param {Object} Object Window����
	 * @return {Number} Number X������
	 *            @example
	 *            UI.frameX(window);
	 */
	frameX : function(o) {
		return o.frameElement ? UI.getX(o.frameElement) + UI.frameX(o.parent) : 0;
	},
	/**
	 * ��ȡIframe�ڸ�ҳ����Y������ֵ
	 * 
	 * @param {Object} Object Window����
	 * @return {Number} Number Y������
	 *            @example
	 *            UI.frameY(window);
	 */
	frameY : function(o) {
		return o.frameElement ? UI.getY(o.frameElement) + UI.frameY(o.parent) : 0;
	},
	/**
	 * ��ȡDom���
	 * 
	 * @param {Object} Object Dom����
	 * @return {Number} Number ���
	 *            @example
	 *            UI.width(el);
	 */
	width : function(o) {
		return parseInt(o.offsetWidth);
	},
	/**
	 * ��ȡDom�߶�
	 * 
	 * @param {Object} Object Dom����
	 * @return {Number} Number �߶�
	 *            @example
	 *            UI.height(el);
	 */
	height : function(o) {
		return parseInt(o.offsetHeight);
	},
	/**
	 * ��ȡҳ����
	 * 
	 * @return {Number} Number ���
	 *            @example
	 *            var pageWidth = UI.pageWidth();
	 */
	pageWidth : function() {
		return document.body.scrollWidth || document.documentElement.scrollWidth;
	},
	/**
	 * ��ȡҳ��߶�
	 * 
	 * @return {Number} Number �߶�
	 *            @example
	 *            var pageHeight = UI.pageHeight();
	 */
	pageHeight : function() {
		return document.body.scrollHeight || document.documentElement.scrollHeight;
	},
	/**
	 * ��ȡ���ڿ��
	 * 
	 * @return {Number} Number ���
	 *            @example
	 *            var windowWidth = UI.windowWidth();
	 */
	windowWidth : function() {
		var E = document.documentElement;
		return self.innerWidth || (E && E.clientWidth) || document.body.clientWidth;
	},
	/**
	 * ��ȡ���ڸ߶�
	 * 
	 * @return {Number} Number �߶�
	 *            @example
	 *            var windowHeight = UI.windowHeight();
	 */
	windowHeight : function() {
		var E = document.documentElement;
		return self.innerHeight || (E && E.clientHeight) || document.body.clientHeight;
	},
	/**
	 * ��ȡDom��X���������
	 * 
	 * @param {Object} Object Dom����
	 * @return {Number} Number X���������
	 *            @example
	 *            var scrollX = UI.scrollX(el);
	 */
	scrollX : function(o) {
		var E = document.documentElement;
		if (o) {
			var P = o.parentNode,X = o.scrollLeft || 0;
			if (o == E) X = UI.scrollX();
			return P ? X + UI.scrollX(P) : X;
		}
		return self.pageXOffset || (E && E.scrollLeft) || document.body.scrollLeft;
	},
	/**
	 * ��ȡDom��Y���������
	 * 
	 * @param {Object} Object Dom����
	 * @return {Number} Number Y���������
	 *            @example
	 *            var scrollY = UI.scrollY(el);
	 */
	scrollY : function(o) {
		var E = document.documentElement;
		if (o) {
			var P = o.parentNode,Y = o.scrollTop || 0;
			if (o == E) Y = UI.scrollY();
			return P ? Y + UI.scrollY(P) : Y;
		}
		return self.pageYOffset || (E && E.scrollTop) || document.body.scrollTop;
	},
	/**
	 * ����ҳ��
	 * 
	 * @param {Object} Object Dom����
	 * @param {Number} Number X���������
	 * @param {Number} Number Y���������
	 *            @example
	 *            UI.scrollTo(document.body,0,300);
	 */
	scrollTo : function(o,x,y) {
		if (o == document.documentElement || o == document.body) {
			return window.scrollTo(x,y);
		}
	},
	/**
	 * ����Dom
	 * 
	 * @param {Object} Object Dom����
	 *            @example
	 *            UI.hide(el);
	 */
	hide : function(o) {
		if (UI.isString(o)) o = this.G(o);
		if (!o) return;
		var curDisplay = this.C(o,'display');
		if (curDisplay != 'none') {
			o.__curDisplay = curDisplay;
		}
		o.style.display = 'none';
	},
	/**
	 * ��ʾDom
	 * 
	 * @param {Object} Object Dom����
	 *            @example
	 *            UI.show(el);
	 */
	show : function(o) {
		if (UI.isString(o)) o = this.G(o);
		if (!o) return;
		o.style.display = o.__curDisplay || '';
	},
	/**
	 * ��ʾ������Dom
	 * 
	 * @param {Object} Object Dom����
	 *            @example
	 *            UI.toggle(el);
	 */
	toggle : function(o) {
		if (UI.isString(o)) o = this.G(o);
		if (this.C(o,'display') == 'none') {
			this.show(o);
		}
		else this.hide(o);
	},
	/**
	 * �ж�Dom�Ƿ�ĳclassName
	 * 
	 * @param {Object} Object Dom����
	 * @param {String} String ��ʽ��
	 * @return {Boolean} Boolean �Ƿ���
	 *            @example
	 *            UI.hasClass(el,'loading');
	 */
	hasClass : function(o,n){
		if (!o.className) return false;
		return o.className != o.className.replace(new RegExp('\\b' + n + '\\b'),'');
	},
	/**
	 * Dom���ĳclassName
	 * 
	 * @param {Object} Object Dom����
	 * @param {String} String ��ʽ��
	 *            @example
	 *            UI.addClass(el,'loading');
	 */
	addClass : function(o,n){
		if (!o.className) {
			o.className = n;
		}
		else if (this.hasClass(o,n)) {
			return false;
		}
		else o.className += ' ' + n;
	},
	/**
	 * Domɾ��ĳclassName
	 * 
	 * @param {Object} Object Dom����
	 * @param {String} String ��ʽ��
	 *            @example
	 *            UI.removeClass(el,'loading');
	 */
	removeClass : function(o,n){
		if (o) {
			o.className = o.className.replace(new RegExp('\\b' + n + '\\b'),'');
		}
	},
	/**
	 * Dom��ӻ�ɾ��ĳclassName
	 * 
	 * @param {Object} Object Dom����
	 * @param {String} String ��ʽ��
	 *            @example
	 *            UI.toggleClass(el,'loading');
	 */
	toggleClass : function(o,n){
		if (this.hasClass(o,n)) this.removeClass(o,n);
		else this.addClass(o,n);
	},
	/**
	 * ��ȡDom��һ���ڵ�
	 * 
	 * @param {Object} Object Dom����
	 * @return {Object} Object Dom����
	 *            @example
	 *            UI.next(el);
	 */
	next : function(o) {
		var n = o.nextSibling;
		if (n == null) return false;
		return UI.isElement(n) ? n : this.next(n);
	},
	/**
	 * ��ȡDom��һ���ڵ�
	 * 
	 * @param {Object} Object Dom����
	 * @return {Object} Object Dom����
	 *            @example
	 *            UI.prev(el);
	 */
	prev : function(o) {
		var n = o.previousSibling;
		if (n == null) return false;
		return UI.isElement(n) ? n : this.prev(n);
	},
	/**
	 * ��Dom�������Ƴ�
	 * 
	 * @param {Object} Object Dom����
	 *            @example
	 *            UI.remove(el);
	 */
	remove : function(o){
		if (o && o.parentNode){
			o.parentNode.removeChild(o);
		}
	},
	/**
	 * ��Dom���뵽Ŀ��Domβ��
	 * 
	 * @param {Object} Object Dom����
	 * @param {Object} Object Ŀ��Dom����
	 *            @example
	 *            UI.append(el,target);
	 */
	append : function(o,t) {
		t.appendChild(o);
	},
	/**
	 * ��Dom���뵽Ŀ��Domͷ��
	 * 
	 * @param {Object} Object Dom����
	 * @param {Object} Object Ŀ��Dom����
	 *            @example
	 *            UI.prepend(el,target);
	 */
	prepend : function(o,t) {
		var first = t.firstChild;
		if (first) UI.before(o,first);
		else UI.append(o,t);
	},
	/**
	 * ��Dom���뵽Ŀ��Dom����
	 * 
	 * @param {Object} Object Dom����
	 * @param {Object} Object Ŀ��Dom����
	 *            @example
	 *            UI.after(el,target);
	 */
	after : function(o,t) {
		var P = t.parentNode;
		if(P.lastChild == o) P.appendChild(o);
		else P.insertBefore(o,t.nextSibling);
	},
	/**
	 * ��Dom���뵽Ŀ��Domǰ��
	 * 
	 * @param {Object} Object Dom����
	 * @param {Object} Object Ŀ��Dom����
	 *            @example
	 *            UI.before(el,target);
	 */
	before : function(o,t) {
		t.parentNode.insertBefore(o,t);
	},
	/**
	 * ��Dom�滻��Ŀ��Dom
	 * 
	 * @param {Object} Object Dom����
	 * @param {Object} Object Ŀ��Dom����
	 *            @example
	 *            UI.replace(el,target);
	 */
	replace : function(o,t) {
		var P = t.parentNode;
		P.replaceChild(o,t);
	},
	/**
	 * Javascriptģ��
	 * 
	 * @param {String} String ģ��
	 * @param {Object} Object ����
	 *            @example
	 *                template :
	 *                <script type="text/html" id="tmpl">
	 *                    <div id="<%=id%>" class="<%=(i % 2 == 1 ? "even" : "")%>">
	 *                        <b><a href="/<%=from_user%>"><%=from_user%></a>:</b> <%=text%></p>
	 *                    </div>
	 *                    <% for ( var i = 0; i < users.length; i++ ) { %>
	 *                        <li><a href="<%=users[i].url%>"><%=users[i].name%></a>
	 *                        <% if (users[i].url == 1) { %>
	 *                            If Success
	 *                        <% } %>
	 *                        </li>
	 *                    <% } %>
	 *                </script>
	 *                <div id="results"></div>
	 *
	 *                var results = UI.G('results');
	 *                //results.innerHTML = UI.tmpl('tmpl',{id:1,i:1,from_user:'from_user',from_user:'from_user',text:'text',users:[{url:'1',name:'1'},{url:'2',name:'2'}]});
	 *                var show = UI.tmpl('tmpl');
	 *                results.innerHTML += show({id:1,i:1,from_user:'from_user',from_user:'from_user',text:'text',users:[{url:'1',name:'1'},{url:'2',name:'2'}]});
	 */
	tmpl : (function(){
		var cache = {};
		return function tmpl(str,data){
			var fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(UI.G(str).innerHTML) : UI.tmplString(str);
			return data ? fn(data) : fn;
		};
	})(),
	/**
	 * Javascriptģ��
	 * 
	 * @param {String} String ģ��
	 * @return {Function} Function ��ģ�庯�����ٴ������ݼ���
	 *            @example
	 *                string template :
	 *                var tmpl = '<div class="title clear"><span class="left">����<b><%=num%></b>λ��УУ��</span><a href="/search/user.php?high=1&school=<%=school%>" class="right ffsong" target="_blank"<%if(num<11){%> style="display:none"<%}%>>�鿴ȫ��&gt;&gt;</a></div>\
	 *                    <ul class="imgList"><%\
	 *                    %></ul>';
	 *                content.innerHTML = new UI.tmplString(tmpl)(data.info);
	 */
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
	/**
	 * ����Dom����
	 * 
	 * @param {String} String HTML�ַ���
	 * @return {Array} Array Dom��������
	 *            @example
	 *            var cont = UI.html('<div class="cont"></div>')[0];
	 */
	html : function(s) {
		var wrap = UI.DC('div'),tmp = [];
		wrap.innerHTML = s;
		UI.each(wrap.childNodes,function(o){
			tmp.push(o);
		});
		return tmp;
	},
	/**
	 * ����Css��ʽ
	 * 
	 * @param {String} String Css�ַ���
	 *            @example
	 *            UI.css('.error{color:red}');
	 */
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
	/**
	 * ��ȡDom�ڵ��ı�
	 * 
	 * @param {Object} Object Dom����
	 * @return {String} String �ı�����
	 *            @example
	 *            UI.text(UI.G('x'));
	 */
	text : function text(el) {//������
		var str = [],e = el.childNodes;
		for (var i = 0,num = e.length;i < num;i++) {
			str.push(e[i].nodeType != 1 ? e[i].nodeValue : text(e[i]));
		}
		return str.join('');
	},
	/**
	 * ��ȡDom�ĸ���
	 * 
	 * @param {Object} Object Dom����
	 * @param {String} String className
	 * @return {String} String �ı�����
	 *            @example
	 *            UI.parent(UI.G('x'));
	 */
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
	/**
	 * ��ȡDom��ĳclassName���漶
	 * 
	 * @param {Object} Object Dom����
	 * @param {String} String className
	 * @return {Object} Object Dom����
	 *            @example
	 *            <div class="cont"><span><b id="x"></b></span></div>
	 *
	 *            UI.parents(UI.G('x'),'cont');
	 */
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
	/**
	 * ��ȡDom���Ӽ�
	 * 
	 * @param {Object} Object Dom����
	 * @param {String} String className
	 * @return {Array} Array Dom��������
	 *            @example
	 *            <div id="x"><span></span><span class="cont"></span></div>
	 *
	 *            UI.children(UI.G('x'),'cont');
	 */
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
	/**
	 * ��ȡDom������
	 * 
	 * @param {Object} Object Dom����
	 * @param {String} String ������
	 * @param {String} String ���Ը�ֵ
	 * @return {String} String ����ֵ
	 *            @example
	 *            UI.A(UI.G('x'),'rel','rel');
	 *            var rel = UI.A(UI.G('x'),'rel');
	 */
	A : function(o,n,v) {
		if (v == undefined) {
			return o.getAttribute(n);
		}
		else if (v == '') {
			o.removeAttribute(n);
		}
		else o.setAttribute(n,v);
	},
	/**
	 * ��ȡDom����ʽ
	 * 
	 * @param {Object} Object Dom����
	 * @param {String} String ��ʽ��
	 * @param {String} String ��ʽ��ֵ
	 * @return {String} String ��ʽֵ
	 *            @example
	 *            UI.C(UI.G('x'),'opacity',0);
	 *            var opacity = UI.C(UI.G('x'),'opacity');
	 */
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
	/**
	 * ����Dom����
	 * 
	 * @param {String} String ��ǩ��
	 * @return {Object} Object Dom����
	 *            @example
	 *            var el = UI.DC('div');
	 */
	DC : function(n) { //Dom Create Element
		return document.createElement(n);
	},
	/**
	 * �¼�����
	 * 
	 * @param {Object} Object �¼�����
	 * @return {Object} Object �¼�����
	 *            @example
	 *            el.onclick = function(e){
	 *                var E = UI.E(e);
	 *                E.clone; //�Ƿ��ǿ�¡���¼�����
	 *                E.type; //�¼�����
	 *                E.target; //�¼�������Dom����
	 *                E.x; //�¼�������x����
	 *                E.y; //�¼�������y����
	 *                E.button; //��갴ťֵ
	 *                E.key; //���̰�ťֵ
	 *                E.shift; //�Ƿ���shift
	 *                E.alt; //�Ƿ���alt
	 *                E.ctrl; //�Ƿ���ctrl
	 *                E.wheel; //�����ֹ���ֵ
	 *                E.stop(); //��ֹ�¼�ð��
	 *                E.prevent(); //��ֹĬ���¼���Ϊ
	 *            }
	 */
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
	/**
	 * ���¼�
	 * 
	 * @param {Object} Object Dom����
	 * @param {String} String �¼���
	 * @param {Function} Function �¼�����
	 * @return {Boolean} Boolean �Ƿ�ȫ������
	 *            @example
	 *            UI.EA(el,'click',function(){
	 *            });
	 */
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
	/**
	 * �Ƴ��¼�
	 * 
	 * @param {Object} Object Dom����
	 * @param {String} String �¼���
	 * @param {Function} Function �¼�����
	 * @return {Boolean} Boolean �Ƿ�ȫ������
	 *            @example
	 *            var click = function(){
	 *            }
	 *            UI.EA(el,'click',click);
	 *            UI.ER(el,'click',click);
	 */
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
	/**
	 * ��ȡĳID��Dom
	 * 
	 * @param {String} String IDֵ
	 * @return {Object} Object Dom����
	 *            @example
	 *            <div id="x"></div>
	 *
	 *            UI.G('x');
	 */
	G : function(n) {
		return document.getElementById(n);
	},
	/**
	 * ��ȡĳ��ǩ����Dom
	 * 
	 * @param {Object} Object Dom������ҷ�Χ
	 * @param {String} String ��ǩ��
	 * @return {Array} Array Dom��������
	 *            @example
	 *            UI.GT(document.body,'x');
	 */
	GT : function(o,n) {
		return o.getElementsByTagName(n);
	},
	/**
	 * ��ȡĳ��ʽ��Dom
	 * 
	 * @param {Object} Object Dom������ҷ�Χ
	 * @param {String} String ��ʽ��
	 * @return {Array} Array Dom��������
	 *            @example
	 *            UI.GC(document.body,'li .cont');
	 *            UI.GC('li .cont');
	 */
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
	/**
	 * ��ʽ������ʱ�����
	 * 
	 * @param {String} String ��ʽ��ǰ��ʱ���ַ���
	 * @param {String} String ʱ���ʽ
	 * @return {Object} Object ʱ�����
	 *            @example
	 *            var date = UI.parseDate('2010-11-06 15:48:04','yyyy-MM-dd hh:mm:ss');
	 */
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
	/**
	 * �ж��Ƿ�Ϊ����
	 * 
	 * @param {Object} Object ����
	 * @return {Boolean} Boolean �Ƿ�Ϊ����
	 *            @example
	 *            UI.isObject(obj);
	 */
	isObject : function(o) {
		return typeof o == 'object';
	},
	/**
	 * �ж��Ƿ�ΪElement����
	 * 
	 * @param {Object} Object ����
	 * @return {Boolean} Boolean �Ƿ�ΪElement����
	 *            @example
	 *            UI.isElement(obj);
	 */
	isElement : function(o) {
		return o && o.nodeType == 1;
	},
	/**
	 * �ж��Ƿ�ΪUndefined
	 * 
	 * @param {Object} Object ����
	 * @return {Boolean} Boolean �Ƿ�ΪUndefined
	 *            @example
	 *            UI.isUndefined(obj);
	 */
	isUndefined : function(o) {
		return typeof o == 'undefined';
	},
	/**
	 * �ж��Ƿ�Ϊ��������
	 * 
	 * @param {Object} Object ����
	 * @return {Boolean} Boolean �Ƿ�Ϊ��������
	 *            @example
	 *            UI.isFunction(obj);
	 */
	isFunction : function(o) {
		return this.getType(o) == 'Function';
	},
	/**
	 * �ж��Ƿ�Ϊ����
	 * 
	 * @param {Object} Object ����
	 * @return {Boolean} Boolean �Ƿ�Ϊ����
	 *            @example
	 *            UI.isNumber(obj);
	 */
	isNumber : function(o) {
		return this.getType(o) == 'Number';
	},
	/**
	 * �ж��Ƿ�Ϊ�ַ���
	 * 
	 * @param {Object} Object ����
	 * @return {Boolean} Boolean �Ƿ�Ϊ�ַ���
	 *            @example
	 *            UI.isString(obj);
	 */
	isString : function(o) {
		return this.getType(o) == 'String';
	},
	/**
	 * �ж��Ƿ�Ϊ����
	 * 
	 * @param {Object} Object ����
	 * @return {Boolean} Boolean �Ƿ�Ϊ����
	 *            @example
	 *            UI.isArray(obj);
	 */
	isArray : function(o) {
		return this.getType(o) == 'Array';
	},
	getType : function(o){
		return Object.prototype.toString.call(o).slice(8,-1);
	},
	/**
	 * ���ֲ���
	 * 
	 * @param {Number} Number ����
	 * @return {Number} Number ����λ��
	 * @return {String} String �������ַ���
	 *            @example
	 *            UI.addZero(9,2); //���� 09
	 */
	addZero : function(num,n) {
		if (!n) n = 2;
		return Array(Math.abs(('' + num).length - (n + 1))).join(0) + num;
	},
	/**
	 * ȥ��ͷβ�ո�
	 * 
	 * @param {String} String �ַ���
	 * @return {String} String �ַ���
	 *            @example
	 *            UI.trim(' = ');
	 */
	trim : function(o) {
		return o.replace(/^\s+|\s+$/g,'');
	},
	/**
	 * ���������
	 * 
	 * @param {Number} Number ��Сֵ
	 * @param {Number} Number ���ֵ
	 * @return {Number} Number �����
	 *            @example
	 *            UI.random(); //Ĭ��0 - 9
	 *            UI.random(0,1000);
	 */
	random : function(a,b) {
		if (a == undefined) a = 0;
		if (b == undefined) b = 9;
		return Math.floor(Math.random() * (b - a + 1) + a);
	},
	/**
	 * �����Ƿ���ĳֵ
	 * 
	 * @param {Array} Array ����
	 * @param {All} All ֵ
	 * @return {Boolean} Boolean �����Ƿ���ĳֵ
	 *            @example
	 *            UI.has([1,2,3],4); //False
	 */
	has : function(o,v) {
		for (var i = 0,n = o.length;i < n;i++) {
			if (o[i] == v) return true;
		}
		return false;
	},
	/**
	 * ��������
	 * 
	 * @param {Array} Array ����
	 * @param {Function} Function ����
	 *            @example
	 *            UI.each([1,2,3],function(o,i){ //oΪ�����е��iΪ����
	 *                
	 *            });
	 */
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
	/**
	 * ҳ��Dom�����ɺ�ִ�к���
	 * 
	 * @param {Function} Function ����
	 *            @example
	 *            UI.ready(function(){
	 *            });
	 */
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
	/**
	 * ������汾
	 * 
	 * @type Object
	 *            @example
	 *            UI.B.ie
	 *            UI.B.ie6
	 *            UI.B.ipad
	 */
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