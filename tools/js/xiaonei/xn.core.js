/**
	created by lu.hua@opi-corp.com 23:32 2008-6-22
*/

try{
	document.domain='xiaonei.com';
}catch(e){}

try{
	top.location.href.indexOf('xiaonei.com');
}catch(e){
	try{
		top.location = self.location;
	}catch(e){}
}

var XN = {};

function isUndefined(object) {
	return typeof object == "undefined";
}
function isString(object) {
    return typeof object == "string";
}
function isElement(object) {
	return object && object.nodeType == 1;
}
function isFunction(object) {
	return typeof object == "function";
}
function isObject(object) {
	return typeof object == "object";
}
function isArray(object) {
	return object !== null && typeof object == "object" &&'splice' in object && 'join' in object;
}
function isNumber(object){
	return typeof object == 'number';
}
function isJSON(str){
	if (!isString(str) || str === '') {return false;}
	str = str.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
	return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
}

/**
 *  字符串的操作和判断方法
 */
XN.STRING = XN.String = {
	nl2br:function(str){
		return str.replace(/([^>])\n/g, '$1<br />');
	},
	trim : function(str) {
		return str.replace(/^\s+|\s+$/g,"");
	},
	ltrim :function(str) {
		return str.replace(/^\s+/,"");
	},
	rtrim :function(str) {
		return str.replace(/\s+$/,"");
	},
	strip: function(str) {
    	return str.replace(/^\s+/, '').replace(/\s+$/, '');
	},
	stripTags: function(str) {
		return str.replace(/<\/?[^>]+>/gi, '');
	},
	escapeHTML: function(str) {
		return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
	},
	unescapeHTML: function(str) {
		return str.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,' ').replace(/&quot;/g,'"');
	},
	include:function(str,key){
		return str.indexOf(key) > -1;
	},
	startsWith:function(str,key){
		return str.indexOf(key) === 0;
	},
	endsWith:function(str,key){
	    var d = str.length - key.length;
	    return d >= 0 && str.lastIndexOf(key) === d;	
	},
	isBlank:function(str){
		return XN.STRING.strip(str) == '';
	},
	isEmail:function(str){
		return /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/.test(str);
	},
	isPhone:function(str){
		return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test(str);
	},
	isMobile:function(str){
		return /^((\(\d{2,3}\))|(\d{3}\-))?((1[35]\d{9})|(18[89]\d{8}))$/.test(str);
	},
	isUrl:function(str){
		return /^(http:|ftp:)\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"])*$/.test(str);
	},
	isIp:function(str){
		return /^(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5])$/.test(str);
	},
	isNum:function(str){
		return /^\d+$/.test(str);
	},
	isZip:function(str){
		return /^[1-9]\d{5}$/.test(str);
	},
	isEN:function(str){
		return /^[A-Za-z]+$/.test(str);
	}
};

/**
 *  数组操作的方法
 */

XN.ARRAY = XN.Array = {
	toQueryString:function(a,key){
		var rt = [],t;
		for(var k in a){
			t = a[k];
			if(isFunction(t))continue;
			if(isObject(t)){
				rt.push(XN.ARRAY.toQueryString(t,k));
			}else{
				if(/^\d+$/.test(k)){
					rt.push(encodeURIComponent(key || k) + '=' + encodeURIComponent(t));
				}else{
					rt.push(encodeURIComponent(k) + '=' + encodeURIComponent(t));
				}	
			}
		}
		return rt.join('&');
	},
	each:function(a,func){
		if(!isUndefined(a[0])){
			for(var i = 0,j = a.length;i < j;i++){
				if(!isFunction(a[i]))func(i,a[i]);
			}
		}else{
			for (var key in a){
				if(!isFunction(a[key]))func(key,a[key]);
			}
		}
	},
	include:function(a,value){
		var r = false;
		for(var key in a){
			if(a[key] == value){
				r = true;
				break;
			}
		}
		return r;
	}
};

/**
 *  后面将用于实参的转换,因为用Array.call(null,XX)转换会有莫名的bug
 */
if(isUndefined($A)){
	var $A = function(o){
	  	var rt = [];
		for (var i = 0,j = o.length;i < j;i++){
			rt.push(o[i]);
		}
		return rt;
	}
}

/**
 *  元素获取的基本方法,为了防止被prototype覆盖,当文档加载完成之后还会重新声明此函数
 */

var $,ge,getEl;
function _reload$_(){
	ge =  getEl = $ = function(id,level) {
		if(!id)return false;
		var el;
		level == level || 1;
		if(isString(id) || isNumber(id)){
			el = document.getElementById(id + '');
		}else{
			el = id;
		}
		if(!el){
			return null;
		}
		if(!el._extendLevel)XN.ELEMENT.extend(el,1);
		if(level == 2 && el._extendLevel != 2)XN.ELEMENT.extend(el,2);
		return el;
	}
}
_reload$_();

/**
 * 扩展超级元素的方法 
 */

function $X(id){
	return $(id,2);
}

function $extend(object,src){
	if(!src)return object;
	for (var p in src){
		object[p] = src[p];
	}
	return object;
}

function $element(tagName){
	tagName = tagName.toLowerCase();
	if(!XN.DOM._elementsCache[tagName]){
		XN.DOM._elementsCache[tagName] = document.createElement(tagName);
	}
	return $(XN.DOM._elementsCache[tagName].cloneNode(false));
}

function $xElement(tagName){
	return $($element(tagName),2);
}

if(!Function.prototype.bind){
	Function.prototype.bind = function(object) { 
		var method = this; 
		return function() { 
			method.apply(object, arguments); 
		} 
	}
}

XN.DEBUG_MODE = false;
XN.staticPath = "http://xnimg.cn/";

XN.ENV = XN.Env = {
	siteName:'校内',
	domain:'xiaonei.com',
	staticRoot:'http://xnimg.cn/',
	swfRoot:'http://static.xiaonei.com/',
	wwwRoot:'http://xiaonei.com/'
};

XN.Browser = XN.BROWSER =  {
    IE:     !!(window.attachEvent && !window.opera),
	IE6:navigator.userAgent.indexOf('MSIE 6.0') > -1,
	IE7:navigator.userAgent.indexOf('MSIE 7.0') > -1,
    Opera:  !!window.opera,
    WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
    Gecko:  navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1,
	copy:function( text ){
		if ( isElement( text ) )
		{
			text = text.value;
		}
		if ( window.clipboardData && clipboardData.setData )
		{
			if ( clipboardData.setData( 'Text' , text ) ) return true;
		}
		else
		{
			alert( '您的浏览器不支持脚本复制,请尝试手动复制' );
			return false;
		}
		alert( '您的浏览器设置已经禁止脚本访问剪切板\n请重试,或者尝试手动复制' );
		return false;		
	},
	addHomePage:function(url){
		if(XN.BROWSER.IE){
			document.body.style.behavior = 'url(#default#homepage)';
			document.body.setHomePage(url);
		}else{
			XN.BROWSER.copy(url);
			XN.DO.alert('网址已经拷贝到剪切板,请您打开浏览器的选项,<br/>把地址粘到主页选项中即可~');
		}
	},
	addBookMark:function(url,title){
		var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL';					
		try{
				window.external.addFavorite(url,title || '校内-因为真实,所以精彩');
		}catch(e){
			try{
				window.sidebar.addPanel(url,title || '校内-因为真实,所以精彩');
			}catch(e){
				XN.DO.alert('您可以尝试通过快捷键' + ctrl + ' + D 添加书签~');
			}
		}
	}
};

XN.COOKIE = XN.Cookie = {
	get:function(name){
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length));
		}
		return null;
	},
	set:function(name,value,days,path,domain,secure){
		var expires;
		if(isNumber(days)){
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = date.toGMTString();
		}else if(isString(days)){
			expires = days;
		}else{
			expires = false;
		}
		document.cookie = name + '=' + encodeURIComponent(value) +
				(expires ? ';expires=' + expires  : '') +
				(path ? ';path=' + path : '') +
				(domain ? ';domain=' + domain : '') +
				(secure ? ';secure' : '');
	},
	del:function(name,path,domain,secure){
		XN.COOKIE.set(name,'',-1,path,domain,secure);
	}
};

XN.Debug = XN.DEBUG = {
	win	:null,
	log	:null,
	On	:function() {
		XN.DEBUG_MODE = true;
		if(typeof console == 'undefined' || typeof console.log == 'undefined'){
			if (XN.DEBUG.win == null || XN.DEBUG.win.closed)
			{
				XN.DEBUG.win = window.open(XN.ENV.swfRoot +'jspro/debug.html',"xnDebug","width = 500,height = 400,location = no,menubar = no,toolbar = no,scrollbars = yes");
				XN.DEBUG.win.focus();
			}
			XN.log = XN.DEBUG.log = function(s){
				var _d,_p;
				_d = XN.DEBUG.win.document;
				_p = _d.createElement("p");
				_p.appendChild(_d.createTextNode(s));
				_d.body.appendChild(_p);
				_d.body.scrollTop = _d.body.scrollHeight;
			};
			window.onerror = function(){
				XN.log('错误:' + arguments[0] + '\n' + '出错文件:' + arguments[1] + '\n' + '行号:' + arguments[2] + '\n');
			};
		}else{
			XN.log = XN.DEBUG.log = function(s){
				console.log(s);
			}
		}
	},
	Off	:function() {
		XN.DEBUG_MODE = false;
		window.onerror = null;
		XN.log = XN.DEBUG.log = function() {};
	},
	init	:function(){
		XN.DEBUG[(XN.DEBUG_MODE?"On":"Off")]();
	}
};
XN.DEBUG.init();


XN.Do = XN.DO = {};
XN.DO._alert = null;
XN.DO._alertDefaultButton = null;
XN.DO._alertCallBack = null;
XN.DO.alert = function(message,title,type,X,Y,w,h,callBack) {
	var _f,_yes,ops = {},_s = XN.DO,timer;
	if(isObject(arguments[0])){
		ops = arguments[0];
	}
	_s._alertCallBack = ops.callBack || callBack || XN.FUNC.empty;
	if (!_s._alert) {
		_f = _s._alert = new XN.UI.panel();
		_s._alertDefaultButton = _yes = new XN.UI.button({text:'确定',onclick:function(){
			if(!XN.DOM._isable)XN.DOM.enable();
			if(timer !== null) {
				clearTimeout(timer);
				timer = null;
			}
			XN.DO._alert.hide();
			XN.DO._alertCallBack.call(XN.DO._alert);
			}});
		_f.setFooter(_yes);
	} else {
		_f = _s._alert;
	}
	_f.header.show();
	_f.body.show();
	_f.footer.show();
	_f.setHeader(false);
	_f.setBody(false);
	type = ops.type || type || 'normal';
	if(type == 'error'){
		_f.setHeader(ops.title || title || "错误提示");
	}else{
		_f.setHeader(ops.title || title || "提示");
	}
	XN.DO._alertDefaultButton.setText(ops.button || '确定');
	_f.setBody(ops.message || ops.msg || message || '未指定提示信息');
	_f.setWidth(ops.width || w || 400);
	_f.setHeight(ops.height || h || false);
	_f.setType(type);
	_f.setX(ops.X || X || false);
	_f.setY(ops.Y || Y || XN.EVENT.scrollTop() + 200);


	if(ops.noHeader){
		_f.header.hide();
	}
		
	if(ops.noFooter){
		_f.footer.hide();
	}
	
	_f.show();
	
	try{
		XN.DO._alertDefaultButton.focus();
	}catch(e){}
	
	if(ops.autoHide){
		timer = setTimeout(function(){
			_f.hide();
		},(ops.autoHide * 1000));
	}
	return _f;
};

XN.DO._confirm = null;
XN.DO._confirmYesButton = null;
XN.DO._confirmNoButton = null;
XN.DO._confirmCallBack = null;
XN.DO.confirm = function(message,title,callBack,yes,no,X,Y,w,h) {
	var _f,_yes,_no,_s = XN.DO,ops = {};
	if(isObject(arguments[0])){
		ops = arguments[0];
	}
	_s._confirmCallBack = ops.callBack || callBack || XN.FUNC.empty;
	if (!_s._confirm) {
		_f = _s._confirm = new XN.UI.panel();
		_s._confirmYesButton = _yes = new XN.UI.button({text:(yes || "确定"),onclick:function(){
			if(!XN.DOM._isable)XN.DOM.enable();
			XN.DO._confirm.hide();
			XN.DO._confirmCallBack.call(XN.DO._confirm,true);
			}});
		_s._confirmNoButton = _no = new XN.UI.button({text:(no ||"取消"),className:'gray',onclick:function(){
			if(!XN.DOM._isable)XN.DOM.enable();
			XN.DO._confirm.hide();
			XN.DO._confirmCallBack.call(XN.DO._confirm,false);
			}});
		_f.setFooter(_yes);
		_f.setFooter(_no);
	}else{
		_f = XN.DO._confirm;
	}
	_f.header.show();
	_f.body.show();
	_f.footer.show();
	_f.setWidth(ops.width || w || 400);
	_f.setHeight(ops.height || h || false);
	_f.setX(ops.X || X || false);
	_f.setY(ops.Y || Y || XN.EVENT.scrollTop() + 200);
	_f.setHeader(false);
	_f.setHeader(ops.title || title || "提示");
	_f.setBody(false);
	_f.setBody(ops.message || ops.msg || message || '未指定提示信息');
	_s._confirmYesButton.setText(ops.yes || yes || '确定');
	_s._confirmNoButton.setText(ops.no || no || '取消');
	_f.show();
	_s._confirmYesButton.focus();
	return _f;
};

XN.DO.showMessage = XN.DO.showMsg = function(msg,title,time){
	XN.DO.alert({
		'msg':msg,
		'title':(title || '提示'),
		noFooter:true,
		autoHide:(time || 2)
	});
};

XN.DO.showError = function(msg,title,time){
	XN.DO.alert({
		'msg':msg,
		'type':'error',
		'title':(title || '错误提示'),
		noFooter:true,
		autoHide:(time || 2)
	});
};

XN.Dom = XN.DOM = {
	loaded:false,
	_timer:null,
	_shadow:null,
	_elementsCache:[],
	_currentElement:null,
	_isable:true,
	hooks:{onload:[],onunload:[]},
	disable:function(opacity){
		if(!XN.DOM._isable)return;
		if(XN.DOM._shadow === null){
			var s =$element('div');
			s.setStyle('background:#000;position:absolute;width:100%;height:100%;z-index:2000;top:0;left:0;')
			XN.DOM._shadow = s;
			document.body.appendChild(s);
		}
		XN.ELEMENT.setOpacity(XN.DOM._shadow,opacity || 0.3);
		XN.DOM._shadow.show();
		var ph = XN.EVENT.pageHeight();
		var wh = XN.EVENT.winHeight();
		XN.DOM._shadow.style.height = Math.max(ph,wh) + 'px';
		XN.DOM._isable = false;
	},
	enable:function(){
		if(XN.DOM._isable)return;
		XN.DOM._shadow.hide();
		XN.DOM._isable = true;
	},
	insertAfter:function($element, targetElement){
		var parent = targetElement.parentNode;
		if(parent.lastChild == targetElement){
			parent.appendChild($element);
		}else{
			parent.insertBefore($element, targetElement.nextSibling);
		}
	},
	getElementsByClassName : function(className,element,tagName) { 
		var children = ($(element) || document).getElementsByTagName( tagName || '*' ) || document.all; 
		var elements = []; 
		var _exp = new RegExp('\\b' + className +'\\b');
		for ( var i = 0,child; child = children[i]; i++) { 
			if (_exp.test(child.className)){
				elements.push(child);
			}
		}   
  	return elements; 
	},
	readyDo:function(f){
		XN.DOM.loaded ? f() : XN.DOM.addHook('onload',f);
	},
	unloadDo:function(f){
		XN.DOM.addHook('onunload',f);
	},
	addHook:function(type,f){
		XN.DOM.hooks[type].push(f);
	},
	runHooks:function(type){
		if(XN.DOM.hooks === null){
			return;
		}
		var hooks = XN.DOM.hooks;
		for(var i = 0,f;f = hooks[type][i];i++){
			try{f()}catch(e){
				if(XN.DEBUG_MODE){
					throw e;
				}
			};
		}
		XN.DOM.hooks = null;
	},
	preloadImg:function(src){
		function newImg(src){
			var _img = $element('img');
			_img.style.display = 'none';
			_img.src = src;
			_img.onload = function(){XN.Element.remove(this);};
			document.body.appendChild(_img);
		}
		if(isString(src)){
			newImg(src);
		}else if(isArray(src)){
			XN.ARRAY.each(src,function(i,v){
				newImg(v);
			});
		}
	},
	preloadPage:function(url){
		function newIframe(url){
			var _iframe = $element('iframe');
			XN.DOM.setStyle(_iframe,'position:absolute;width:0;height:0;left:-9999px;');
			_iframe.src = url;
			_iframe.onload = function(){XN.Element.remove(this);};
			document.body.appendChild(_iframe);			
		}
		if(isString(url)){
			newIframe(url);
		}else if(isArray(url)){
			XN.ARRAY.each(url,function(i,v){
				newIframe(v);
			});
		}
	}
};
XN.ELEMENT = XN.Element = {
	extend:function(el,level){
		 if (!el|| !el.tagName || el.nodeType == 3 || el == window) return el;
		var ms;
		if(level == 1)ms = XN.ELEMENT.regularMethods;
		if(level == 2)ms = XN.ELEMENT.methods;
		var cache = XN.ELEMENT.extend.cache;
		 for(var m in ms){
		 	if(!(m in el)){
				el[m] = cache.findOrStore(ms[m]);
			}
		 }
		 el._extendLevel = level;
		 return el;
	}
};
XN.ELEMENT.extend.cache = {
  findOrStore: function(value) {
    return this[value] = this[value] || function() {
      return value.apply(null, [this].concat($A(arguments)));
    }
  }
};

XN.ELEMENT.regularMethods = {
	hover:function(element,className,hover){
		element = $(element);
		hover =  hover ? $(hover) : element;
		XN.EVENT.addEvent(element,'mouseover',function(){
			hover.addClass(className);
		},false);
		XN.EVENT.addEvent(element,'mouseleave',function(){
			hover.delClass(className);
		},false);
	},
	scrollTo: function(element,effect) {
		element = $(element);
		effect = effect || 'normal';
		switch(effect){
			case 'slow':
			XN.EFFECT.scrollTo(element);
			break;
			default:
			window.scrollTo(0,element.realTop());
			break;
		}
		return element;
	},
	visible: function(element) {
		element = $(element);
		return element.style.display != 'none';
	},
	addClass:function(element,className){
		element = $(element);
		if((new RegExp('\\b' + className + '\\b')).test(element.className))return;
		element.className += ' ' + className;
		return element;
	},
	delClass:function(element,className){
		element = $(element);
		element.className = element.className.replace(new RegExp('\\b' + className + '\\b'),'');
		return element;
	},
	show : function (element,effect){
		element = $(element);
		if(element.style.display != 'none')return;
		effect = effect || 'normal';
	 	switch(effect){
			case 'normal':
			element.style.display = '';
			break;
			case 'fade':
			XN.EFFECT.fadeIn(element,function(e){
				e.style.display = '';
			});
			break;
			case 'slide':
			XN.EFFECT.slideOpen(element);
			break;
			case 'delay':
			setTimeout(function(){
				element.style.display = '';
			},2000);
			break;
		}
		return element;
	},
	hide : function (element,effect){
		element = $(element);
		if(element.style.display == 'none')return;
		effect = effect || 'normal';
	 	switch(effect){
			case 'normal':
			element.style.display = 'none';
			break;
			case 'fade':
			XN.EFFECT.fadeOut(element,function(e){
				e.style.display = 'none';
			});
			break;
			case 'slide':
			XN.EFFECT.slideClose(element);
			break;
			case 'delay':
			setTimeout(function(){
				element.style.display = 'none';
			},2000);
			break;
		}
		return element;
	},
	remove:function(element){
		var element = $(element);
		element.parentNode.removeChild(element);
		return element;
	},
	setStyle:function(element,style){
		var element = $(element);
			element.style.cssText += ';' + style;
		return element;
	},
	getStyle: function(element, style) {
		element = $(element);
		style = style == 'float' ? 'cssFloat' : style;
		var value = element.style[style];
		if (!value) {
			var css = document.defaultView.getComputedStyle(element, null);
			value = css ? css[style] : null;
		}
		if (style == 'opacity') return value ? parseFloat(value) : 1.0;
		return value == 'auto' ? null : value;
	},
	addEvent:function(){
		XN.EVENT.addEvent.apply(XN.EVENT,arguments);
		return arguments[0];
	},
	delEvent:function(element,type,func,useCapture){
		XN.EVENT.delEvent.apply(XN.EVENT,arguments);
		return arguments[0];
	}
};


(function(){
	if ( XN.BROWSER.IE ) {
		XN.ELEMENT.regularMethods.getStyle = function( element , style ){
		    element = $(element);
		    style = (style == 'float' || style == 'cssFloat') ? 'styleFloat' : style;
		    var value = element.style[style];
		    if (!value && element.currentStyle) value = element.currentStyle[style];
		
		    if (style == 'opacity') {
		      if (value = (element.getStyle('filter') || '').match(/alpha\(opacity=(.*)\)/))
		        if (value[1]) return parseFloat(value[1]) / 100;
		      return 1.0;
		    }
		
		    if (value == 'auto') {
		      if ((style == 'width' || style == 'height') && (element.getStyle('display') != 'none'))
		        return element['offset'+ ( style == 'width' ? 'Width' : 'Height' )] + 'px';
		      return null;
		    }
		    return value;
		}
	}
})();


XN.ELEMENT.methods = {
	addChild:function(father,s){
		father = $(father);
		if (isString(s)) {
		var element = (s.substring(0,1) == '#') ? $(s.substring(1,s.length)) : s;
			if(isString(element)){
				father.innerHTML += s;
			}else {
				if(element.parentNode){
					//father.innerHTML += element.innerHTML;
					father.appendChild(element.cloneNode(true).removeAttribute('id'));
				}else{
					father.appendChild(s);
				}
			}
		} else if(isElement(s)) {
			father.appendChild(s);
		}else if(s.haveFather == false){
			father.appendChild($(s.frame));
			s.haveFather = true;
		}else if(s.iAmXmlhttp){
			s.fillTo = father;
			father.startLoading();
		}
		return father;
	},
	delChild:function(father,s){
		father = $(father);
		try{
			father.removeChild($(s));
			return father;
		}catch(e){}
			//s.remove();
		try{
			father.removeChild(s.frame);
			s.haveFather = false;
			return father;
		}catch(e){}
	},
	setContent:function(element,s){
		element = $(element);
		element.innerHTML = '';
		if(s){
			element.addChild(s);
		}
		return element;
	},
	clean:function(element){
		var node;
		element = $(element);
		node = element.firstChild;
		while(node){
			if(node.nodeType == 3 && !/\S/.test(node.nodeValue)){
				element.removeChild(node);
			}
			node = node.nextSibling;
		}
		return element;
	},
	startLoading:function(element,msg){
		element = $(element);
		element.innerHTML = '<center><img src=\"' + XN.ENV.staticRoot + 'img/indicator.gif\" />' + (msg || '加载中...') + '</center>';
		return element;
	},
	stopLoading:function(element){
		element = $(element);
		return element;
	}
};
(function(){
	//var timer;
	if (document.addEventListener) {
		XN.ELEMENT.regularMethods.setOpacity = function(element,opacity){
			element = $(element);
			element.style.opacity = opacity;
			return element;
		};
		if (XN.BROWSER.WebKit) {
			var timer = setInterval(function(){if(/loaded|complete/.test(document.readyState)){XN.DOM.loaded = true;XN.DOM.runHooks('onload');clearTimeout(timer);}},10); 
		}else{
			document.addEventListener('DOMContentLoaded',function(){XN.DOM.loaded = true;XN.DOM.runHooks('onload');},false);
		}
	}else{
			XN.ELEMENT.regularMethods.setOpacity = function(element,opacity){
				element = $(element);
				element.style.zoom = 1;
				element.style.filter = 'Alpha(opacity=' + Math.ceil(opacity * 100) +')';
				return element;
			};
			
			//var n = document.createElement('p');  

            XN.DOM._timer = setInterval(function() {
                try {
                    document.body.doScroll('left');
                    clearInterval(XN.DOM._timer);
                    XN.DOM._timer = null;
                    XN.DOM.loaded = true;
                    //n = null;
					XN.DOM.runHooks('onload');
                } catch (ex) { 
                }
            }, 20); 
	}
})();


XN.Event = XN.EVENT = {
	isCapsLockOn:function(e){
		var c = e.keyCode || e.which;
		var s = e.shiftKey;
//		alert(c);
		if(((c >= 65 && c <= 90) && !s) || ((c >=97 && c <= 122) && s)){
			return true;
		}
		return false;
	},
	element: function(event) {
		var n = event.target || event.srcElement;
		return XN.EVENT.resolveTextNode(n);
	},
	relatedTarget: function(event) {
		var t = event.relatedTarget;
		if (!t) {
		    if (event.type == 'mouseout' || event.type == 'mouseleave') {
		        t = event.toElement;
		    } else if (event.type == 'mouseover') {
		        t = event.fromElement;
		    }
		}	
		return XN.EVENT.resolveTextNode(t);
	},
	resolveTextNode: function(n) {
		try {
		    if (n && 3 == n.nodeType) {
		        return n.parentNode;
		    }
		} catch(e) { }
		
		return n;
	},
	pointerX	:function(event) {
		return event.pageX || (event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
	},
	pointerY	:function(event) {
		return event.pageY || (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
	},
	pageHeight:function(){
		if(window.innerHeight && window.scrollMaxY){
			return window.innerHeight + window.scrollMaxY;
		}else{
			return document.body.scrollHeight;
		}
	},
	pageWidth:function(){
  		if(window.innerWidth && window.scrollMaxX){
			return window.innerWidth + window.scrollMaxX;
		}else{
			return document.body.scrollWidth;
		}
	},
	winWidth	:function() {
	  return window.innerWidth || document.body.clientWidth;
	},
	winHeight	 :function() {
	  return window.innerHeight || document.body.clientHeight;
	},
	scrollTop	:function(){
		if (document.documentElement){
			return document.documentElement.scrollTop;
		}
		return document.body.scrollTop;
	},
	scrollLeft:function(){
		if (document.documentElement){
			return document.documentElement.scrollLeft;
		}
		return document.body.scrollLeft;
	},
	stop	:null,
	addEvent	:function(){return false;},
	delEvent	:function(){return false;},
	_mouseleave:function(){		
	},
	enableCustomEvent:function(obj){
		$extend(obj,{
			addEvent:function(type,func){
				if(!this._customEventListeners)this._customEventListeners = {};
				var funcs = this._customEventListeners;
				if(isUndefined(funcs[type])){
					funcs[type] = [];
				}
				funcs[type].push(func);
				return this;
			},
			delEvent:function(type,func){
				var funcs = this._customEventListeners[type];
				if(funcs){
					for(var i = funcs.length - 1; i >= 0;i--){
						if(funcs[i] == func){
							funcs[i] = null;
							break;
						}
					}
				}
				return this;
			},
			fireEvent:function(type){
				if( !this._customEventListeners || !this._customEventListeners[type] )return;
				var funcs = this._customEventListeners[type],s = this,ars = $A(arguments);
				ars.shift();
				for(var i = funcs.length - 1; i >= 0; i--){
					if(funcs[i])
						funcs[i].apply(s,ars);
				}
			}
		});
	}
 };
 
(function(){
	if (XN.BROWSER.IE) {
		XN.EVENT.stop = function(event) {
			event.returnValue = false;
			event.cancelBubble = true;
		};
	}else{
		XN.EVENT.stop = function(event) {
			event.preventDefault();
			event.stopPropagation();
		};
	}
//	if(XN.BROWSER.IE || XN.BROWSER.Opera){
		XN.ELEMENT.regularMethods.realLeft = function(element,parent){
			parent = $(parent) || document.body;
			element = $(element);
			if(!element.offsetParent || element.offsetParent == parent){
				return element.offsetLeft;
			}else{
				var rt = 0;
		    	var p = element;
		    	while (p !=null && p != parent)
		    	{
		        	rt += p.offsetLeft;
					//rt.top += offsetParent.offsetTop;
		        	p=p.offsetParent;
		    	}
				return rt;
			}
		};
		XN.ELEMENT.regularMethods.realTop = function(element,parent){
			parent = $(parent) || document.body;
			element = $(element);
			if(!element.offsetParent || element.offsetParent == parent){
				return element.offsetTop;
			}else{
				var rt = 0;
		    	var p = element;
		    	while (p !=null && p != parent)
		    	{
		        	rt += p.offsetTop;
					//rt.top += offsetParent.offsetTop;
		        	p = p.offsetParent;
		    	}
				return rt;
			}
		};
	if (window.attachEvent && !XN.BROWSER.Opera) {
		XN.EVENT.addEvent = function(element,name,func) {
			 if (name == 'keypress')name = 'keydown';
			 if (name == 'input' )name = 'propertychange';
			return $(element).attachEvent("on" + name,func);
		};
		XN.EVENT.delEvent = function(element,name) {
			if (name == 'keypress')name = 'keydown';
			if (name == 'input' )name = 'propertychange';
			return $(element).detachEvent('on' + name, func);
		};
	}else if (window.addEventListener) {
		XN.EVENT._mouseleave = function(event){
			var p = event.relatedTarget;
			while ( p && p != this ) try { p = p.parentNode; } catch(error) { p = this; }
			if(p != this){
				this.onmouseleave(event);
			}
		};
		XN.EVENT.addEvent = function(element,name,func,useCapture) {
			element = $(element);
			if(name == 'mouseleave'){
				element.onmouseleave = func;
				element.addEventListener('mouseout',XN.EVENT._mouseleave,useCapture);
				return element;
			}
			if (name == 'keypress' && XN.BROWSER.WebKit)name = 'keydown';
			element.addEventListener(name,func,useCapture);
			return element;
		};
		XN.EVENT.delEvent = function(element,name,func,useCapture) {
			element = $(element);
			if(name == 'mouseleave'){
				element.onmouseleave = null;
				element.removeEventListener('mouseout',XN.EVENT._mouseleave,useCapture);
				return element;
			}
			if (name == 'keypress' && XN.BROWSER.WebKit)name = 'keydown';
			element.removeEventListener(name,func,useCapture);
			return element;
		};
	}else {
		XN.EVENT.addEvent = function(element,name,func) {
			 if (name == 'keypress')name = 'keydown';
			$(element)["on" + name] = func;
			return element;
		};
		XN.EVENT.delEvent = function(element,name) {
			if (name == 'keypress')name = 'keydown';
			$(element)['on' + name] = null;
			return element;
		};
	}
})();

$extend(XN.ELEMENT,XN.ELEMENT.regularMethods);
$extend(XN.ELEMENT,XN.ELEMENT.methods);

XN.Func = XN.FUNC = {
	_runOnceFuncs:[],
	empty:function(){},
	runOnce:function(func){
		var fs = XN.FUNC._runOnceFuncs;
		if(fs[func])return null;
		fs[func] = true;
		return func();
	},
	tryDo:function(func){
		try{
			func();
		}catch(e){
		}
	}
};

/*
 *  based on YUI:YAHOO.lang.JSON 
 */
XN.Json = XN.JSON= {
	_ESCAPES : /\\["\\\/bfnrtu]/g,
	_VALUES  : /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
	_BRACKETS : /(?:^|:|,)(?:\s*\[)+/g,
	_INVALID  : /^[\],:{}\s]*$/,
	_SPECIAL_CHARS : /["\\\x00-\x1f\x7f-\x9f]/g,
	_PARSE_DATE : /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/,
	_CHARS : {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
    },
    dateToString : function (d) {
        function _zeroPad(v) {
            return v < 10 ? '0' + v : v;
        }

        return '"' + d.getUTCFullYear()   + '-' +
            _zeroPad(d.getUTCMonth() + 1) + '-' +
            _zeroPad(d.getUTCDate())      + 'T' +
            _zeroPad(d.getUTCHours())     + ':' +
            _zeroPad(d.getUTCMinutes())   + ':' +
            _zeroPad(d.getUTCSeconds())   + 'Z"';
    },
    stringToDate : function (str) {
        if (XN.JSON._PARSE_DATE.test(str)) {
            var d = new Date();
            d.setUTCFullYear(RegExp.$1, (RegExp.$2|0)-1, RegExp.$3);
            d.setUTCHours(RegExp.$4, RegExp.$5, RegExp.$6);
            return d;
        }
    },
	parse:function(str){
		return eval('(' + str + ')');
	},
	build:function(o,w,d){
	    var m = XN.JSON._CHARS,str_re = XN.JSON._SPECIAL_CHARS,pstack = [];
		var _char = function (c) {
            if (!m[c]) {
                var a = c.charCodeAt();
                m[c] = '\\u00' + Math.floor(a / 16).toString(16) +
                                           (a % 16).toString(16);
            }
            return m[c];
    	};
		var _string = function (s) {
            return '"' + s.replace(str_re, _char) + '"';
        };
		var _date = XN.JSON.dateToString;
        var _stringify = function (o,w,d) {
            var t = typeof o,
                i,len,j,k,v,vt,a;
            if (t === 'string') {
                return _string(o);
            }
            if (t === 'boolean' || o instanceof Boolean) {
                return String(o);
            }
            if (t === 'number' || o instanceof Number) {
                return isFinite(o) ? String(o) : 'null';
            }
            if (o instanceof Date) {
                return _date(o);
            }
            if (isArray(o)) {
                for (i = pstack.length - 1; i >= 0; --i) {
                    if (pstack[i] === o) {
                        return 'null';
                    }
                }
                pstack[pstack.length] = o;

                a = [];
                if (d > 0) {
                    for (i = o.length - 1; i >= 0; --i) {
                        a[i] = _stringify(o[i],w,d-1) || 'null';
                    }
                }
                pstack.pop();

                return '[' + a.join(',') + ']';
            }

            if (t === 'object') {
                if (!o) {
                    return 'null';
                }
                for (i = pstack.length - 1; i >= 0; --i) {
                    if (pstack[i] === o) {
                        return 'null';
                    }
                }
                pstack[pstack.length] = o;

                a = [];
                if (d > 0) {
                    if (w) {
                        for (i = 0, j = 0, len = w.length; i < len; ++i) {
                            if (typeof w[i] === 'string') {
                                v = _stringify(o[w[i]],w,d-1);
                                if (v) {
                                    a[j++] = _string(w[i]) + ':' + v;
                                }
                            }
                        }
                    } else {
                        j = 0;
                        for (k in o) {
                            if (typeof k === 'string' && typeof o[k] != 'undefined') {
                                v = _stringify(o[k],w,d-1);
                                if (v) {
                                    a[j++] = _string(k) + ':' + v;
                                }
                            }
                        }
                    }
                }
                pstack.pop();
                return '{' + a.join(',') + '}';
            }
            return undefined; 
        };
		d = d >= 0 ? d : 1/0;
		return _stringify(o,w,d);
	}
};

XN.NET = XN.Net = {};
XN.NET.xmlhttp = XN.NET.ajax = function(url,data,onSuccess,parameters){
	if(isObject(url)){
		$extend(this,url);
	}else{
		this.url = url || '';
		this.data = data || '';
		this.onSuccess = onSuccess;
		$extend(this,parameters);
	}
	this.init();
};
XN.NET.xmlhttp.prototype = {
	url:null,
	data:'',
	onSuccess:null,
	onFailure:null,
	onError:null,
	fillTo:null,
	method:'post',
	asynchronous:true,
	transport:null,
	headers:null,
	//getTransport:null,
	iAmXmlhttp:true,
	isRuning:false,
	init:function(){
		this.transport = this.getTransport();
		if(this.url !=='') {
			this.send(this.method);
		}
	},
	abort:function(){
		this.transport.abort();
	},
	get:function(url,data,onSuccess,parameters){
		if(this.isRuning)return false;
		if(isObject(url)){
			$extend(this,parameters);
			this.send('get');
			return this;
		}
		this.url = url;
		this.data = data || '';
		this.onSuccess = onSuccess;
		$extend(this,parameters);
		this.send('get');
		return this;
	},
	post:function(url,data,onSuccess,parameters){
		if(this.isRuing)return false;
		if(isObject(url)){
			$extend(this,parameters);
			this.send('post');
			return this;
		}
		this.url = url;
		this.data = data || '';
		this.onSuccess = onSuccess;
		$extend(this,parameters);
		this.send('post');
		return this;
	},
	sendForm:function(id,url,onSuccess,parameters){
		if(this.isRuing)return false;
		if(isObject(id)){
			$extend(this,parameters);
			this.data = XN.FORM.serialize(this.id);
			this.send(this.method);
			return this;
		}
		var a = XN.FORM.serialize(id);
		this.data = a || '';
		this.url = url;
		this.onSuccess = onSuccess;
		$extend(this,parameters);
		this.send(this.method);
		return this;
	},
	send:function(method){
		this.isRuning = true;
		var _url;
		if(method == 'get' && this.data !== ''){
			_url = this.url + (/\?/.test(this.url) ? '&' : '?') + this.data;			
		}
		if(this.asynchronous){
			this.transport.onreadystatechange = this.onStateChange.bind(this);
		}
		this.transport.open(method,(_url || this.url),this.asynchronous);
		this.transport.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		if (this.headers !== null) {
			for (var i in this.headers){
				this.transport.setRequestHeader(i,this.headers[i]);
			}
		}
		this.transport.send(method == 'post' ? this.data : null);
	},
	onStateChange:function(){
		if (this.transport.readyState == 4){
			try{(this.onComplete || XN.FUNC.empty).call(null,this.transport);}catch(e){
				if(XN.DEBUG_MODE){
					throw e;
				}
			}
			if(this.transport.status == undefined || this.transport.status == 0 || (this.transport.status >= 200 && this.transport.status < 300)){
				if (this.fillTo !== null){
					try{this.fillTo.stopLoading();}catch(e){}
					this.fillTo.innerHTML = this.transport.responseText;
				}
				try{(this.onSuccess || XN.FUNC.empty).call(null,this.transport);}catch(e){
					if(XN.DEBUG_MODE){
						throw e;
					}
				}
			}else{
				try{(this.onError || this.onFailure || XN.FUNC.empty).call(null,this.transport);}catch(e){
					if(XN.DEBUG_MODE){
						throw e;
					}						
				}
			}
			this.isRuning = false;
		}
	}
};
(function(){
	if(XN.BROWSER.IE){
		XN.NET.xmlhttp.prototype.getTransport = function(){
			try{
				return new ActveXObject("Msxml2.XMLHTTP");
			}catch(e){
				return new ActiveXObject("Microsoft.XMLHTTP");
			}
		}
	}else{
		XN.NET.xmlhttp.prototype.getTransport = function(){
			return new XMLHttpRequest();
		}
	}
})();
//XN.DEBUG.On();
XN.EFFECT = XN.Effect = {
	fadeIn:function(element,callBack){
		if(element.fadetimer)return;
		callBack = callBack || XN.FUNC.empty;
		var op = 0;
		element.setOpacity(0);
		element.style.display = '';
		element.fadetimer = setInterval(function(){
				XN.Element.setOpacity(element,(op += 0.20));
				if(op >= 1){
					clearInterval(element.fadetimer);
					element.fadetimer = null;
					callBack(element);
				}
		},60);
	},
	fadeOut:function(element,callBack){
		if(element.fadetimer)return;
		callBack = callBack || XN.FUNC.empty;
		var op =1;
		element.setOpacity(1);
		element.fadetimer = setInterval(function(){
				XN.Element.setOpacity(element,(op -= 0.20));
				if(op <= 0){
					clearInterval(element.fadetimer);
					element.fadetimer = null;
					callBack(element);
					element.setOpacity(1);
				}
		},60);		
	},
	gradient:function(element,r,g,b,callBack){
		if(element.gradientTimer)return;
		callBack = callBack || XN.FUNC.empty;
		element.style.backgroundColor = '#fff';
		element.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
		element.gradientTimer = setInterval(function(){
			b += 10;
			element.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + (b >255 ? 255 : b) + ')';
			if(b > 255){
				clearInterval(element.gradientTimer);
				element.gradientTimer = null;
				callBack(element);
			}
		},60);
	},
	slideOpen:function(element){
		if(element.slidetimer)return;
		if(!element.slideHeight){
			var _position = element.getStyle('position');
			element.setStyle('position:absolute;left:-99999px;top:-99999px;');
			element.show();
			element.slideHeight = element.offsetHeight;
			element.hide();
			element.setStyle('position:' + _position + ';left:auto;top:auto;');
		}
		var eh = element.slideHeight,h = 0;
		var step = parseInt(eh / 10);
		element.style.height = '0px';
		element.style.display = '';
		element.style.overflow = 'hidden';
		element.slidetimer = setInterval(function(){
			element.style.height = (h += step) + 'px';
			if(h >= eh){
				clearInterval(element.slidetimer);
				element.slidetimer = null;
				element.style.height = eh;
				element.style.overflow = element.slideOverflow;
			}
		},50);
	},
	slideClose:function(element){
		if(element.slidetimer)return;
		var eh = element.offsetHeight,h = eh;
		element.slideHeight = eh;
		element.slideOverflow = element.getStyle('overflow');
		element.style.overflow = 'hidden';
		var step = parseInt(eh / 10);
		element.slidetimer = setInterval(function(){
			element.style.height = (h -= step) + 'px';
			if(h <= 0){
				clearInterval(element.slidetimer);
				element.slidetimer = null;
				element.style.display = 'none';
				element.style.height = eh;
				element.style.overflow = element.slideOverflow;
			}
		},50);
	},
	scrollTo:function(element,speed,callBack){
		if(element.scrolltimer)return;
		speed = speed || 10;
		callBack = callBack || XN.FUNC.empty;
		var d = element.realTop();
		var i = XN.EVENT.winHeight();
		var h = document.body.scrollHeight;
		var a = XN.EVENT.scrollTop();;
		var offsetTop = null;
		if(d > a){
			if(d + element.offsetHeight < i + a )return;
			element.scrolltimer = setInterval(function(){
				a +=Math.ceil((d-a) / speed) || 1;
				window.scrollTo(0,a);
			  	if(a == d){
					clearInterval(element.scrolltimer);
					element.scrolltimer = null;
				}
			},10);
		}else{
			element.scrolltimer = setInterval(function(){
				a += Math.ceil((d-a) / speed) || -1;
				window.scrollTo(0,a);
			  	if(a == d){
					clearInterval(element.scrolltimer);
					element.scrolltimer = null;
				}
			},10);			
		}
	}
};

/**
 *  常用的html代码模板,用于快速组建代码
 */
XN.TEMPLATE = XN.Template = {
	mediaPlayer:function(o){
		return '<object classid="CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95" width="' + (o.width || '352') + '" height="' + (o.height || '70') + '" >\n' +
		'<param name="autostart" value="' + (o.autostart || '1')+'" >\n' +
		'<param name="showstatusbar" value="' + (o.showstatusbar || '1')+ '">\n' +
		'<param name="filename" value="'+ o.filename +'">\n' +
		'<embed type="application/x-oleobject" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701" ' +
		'flename="mp"' +
		'autostart="' + (o.autostart || '1') + '" showstatusbar="' + (o.showstatusbar || '1') + '" ' +
		'src="' + o.filename + '" width="' + (o.width || '352') + '" height="' + (o.height || '70') + '"></embed>';
	},
	flashPlayer:function(o){
		return '<embed src="' + XN.ENV.staticRoot + '/swf/player.swf" flashvars="url=' + o.filename + '&Rwid=' + (o.width || '450') + '&Autoplay=' + (o.autostart || '1')+ '" wmode="' + (o.wmode || 'transparent') +'" loop="false" menu="false" quality="high" scale="noscale" salign="lt" bgcolor="#ffffff" width="' + (o.width || '450') + '" height="' + (o.height || '30') + '" align="middle" allowScriptAccess="sameDomain" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>';
	},
	flash:function(o){
		return '&nbsp;<embed src="' + o.filename + '" type="application/x-shockwave-flash" ' +
		'width="' + (o.width || '320') + '" height="' + (o.height || '240') + '" allowFullScreen="true" wmode="' + (o.wmode || 'transparent') + '" allowScriptAccess="always"></embed>';
	}
};
XN.USER = XN.User = {};
XN.USER.me = function(parameters){
	$extend(this,parameters);
	this.init();
};
XN.USER.me.prototype = {
	id:null,
	email:null,
	addFriendUrl:'/ajax_request_friend.do',
	init:function(){
//		this.id = XN.COOKIE.get('id');
	},
	addFriend:function(user){
		this.showAddFriendDialog(user);
	},
	addFriendRequest:function(id,why,from){
		var s = this;
		why = why || '';
		from = from || '';
		var data = 'id=' + id + '&why=' + why +'&from=' + from;
		try{
			$('addFriendAlert_' + id ).innerHTML = '请求发送中~'
			this.addFriendDialog.footer.hide();
		}catch(e){}
		new XN.NET.xmlhttp(this.addFriendUrl,data,function(r){
			r = r.responseText;
			try{
				$('addFriendAlert_' + id ).innerHTML = r;
				setTimeout(function(){
					s.addFriendDialog.hide();
					s.addFriendDialog.footer.show();
				},1000);
			}catch(e){}
			s.onaddFriendSuccess(id,r);
		})
	},
	showAddFriendDialog:function(user){
		if(!this.addFriendDialog)this.createAddFriendDialog();
		var d = this.addFriendDialog,s = this;
		d.clear();
		d.setHeader('添加好友');
		if(XN.BROWSER.IE6){
			new Image().src = user.head_url;
		}
		d.setBody('<div class="friend-request">\n<div class="avatar">\n' +
		'<img src="' + user.head_url + '"/>\n</div>\n' +
		'<div class="msg" id="addFriendAlert_' + user.id + '">发送好友申请后，对方会收到提示，经对方确认后，你们即可成为好友。<br/><br/><br/><div style="display: block;" id="addMsgBox"><p>添加一条个人信息<font color="gray">（选填）</font>：</p><textarea id="addFriendMessage_' + user.id + '" name="message" class="textarea" cols="30" rows="3" style="width: 270px;"></textarea>' +
		(user.star ? '' : '<p><a href="' + XN.ENV.wwwRoot + '/notselectuser.do">成为星级用户</a>，方便TA认识你，接受你的好友请求。</p>') +
		'</div></div>'
		);
		var y = new XN.UI.button({text:'确定',onclick:function(){
			var msg = $('addFriendMessage_' + user.id).value;
			if(msg.length > 45){
				XN.DO.showError('个人信息不能超过45个字');
				return;
			}
			s.addFriendRequest(user.id,msg,user.from);
		}});
		var n = new XN.UI.button({text:'取消',className:'gray',onclick:function(){
			d.hide();
		}});
		d.setFooter(y);
		d.setFooter(n);
		d.show();
		y.focus();
	},
	onaddFriendSuccess:function(id,message){
		
	},
	createAddFriendDialog:function(){
		this.addFriendDialog = new XN.UI.panel();
		this.addFriendDialog.setWidth(465);
	}
};
XN.UI = XN.Ui = {};
XN.APP = XN.App = {};
XN.PAGE = XN.Page = {};
XN.CONFIG = XN.Config = {};
XN.UTIL = XN.Util = {};
XN.DOM.readyDo(_reload$_);

XN.UTIL.cache = function(p) {
	$extend( this , p );
	this.init();
};

XN.UTIL.cache.prototype = {
	cacheLength	:	null,
	_cacheData	:	null,
	
	init	:	function(){
		this._cacheData = [];
	},
	
	isExist	:	function( key ){
		return this.get( key );
	},
	
	add	: function( key ,value ){
		
		XN.log( '//----XN.UTIL.cache.add----' );
		XN.log( 'add key:' + key );
		
		if ( !isUndefined( this.isExist( key ) ) ) {
			XN.log( 'key has exist');
			XN.log( '----XN.UTIL.cache.add----//' );
			return;
		}
		
		if ( this.cacheLength && this.cacheLength == this._cacheData.length ) {
			this._cacheData.shift();
			
			XN.log( 'cache out of length' );	
			XN.log( this._cacheData );
			
		}
		this._cacheData.push( {
			'key'	:	key,
			'value':	value
		} );
		
		XN.log ( 'has add key:' + key + 'value:');
		XN.log ( value );
		XN.log ( this._cacheData );
		XN.log( '----XN.UTIL.cache.add----//' );
	},
	
	get	:	function( key ){
		
		XN.log( '//----XN.UTIL.cache.get----' );
		XN.log( 'key:' + key );
		

		for ( var i = this._cacheData.length - 1 ; i >= 0 ; i-- ) {
			if( this._cacheData[i].key == key ) {
				
				XN.log( 'get the value');
				XN.log( '----XN.UTIL.cache.get----//' );
				
				return this._cacheData[i].value;
			}
		}
		
		XN.log( 'find none' );
		XN.log( '----XN.UTIL.cache.get----//' );
		
	},
	
	clear	:	function(){
		this._cacheData = [];
	}
};


/**
 * patch for old js
 */

if(typeof Ajax == 'undefined'){
	Ajax = {};
	Ajax.Request = function(url,o){
		var p = o.parameters;
		o['url'] = url;
		o['data'] = p;
		delete o.parameters;
		return new XN.NET.xmlhttp(o);
	} 
}
