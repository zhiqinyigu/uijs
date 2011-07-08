;(function(){
    if(typeof webq == "undefined") {
        webq= {};
    }
    var q= webq.framework= {};
    
    var $D= q.dom= {},
    	$S= q.string= {},
        $E= q.event= {},
        $F= q.func= {},
        $S= q.string= {};
        
    //mvc
    q.model= {},
    q.view= {},
    q.controller= {},
    q.collection= {};
        
    $D.id= function(id) {
        return document.getElementById(id);
    };
    $D.hasClass = function(el, className){
        var re = new RegExp("(^|\\s)" + className + "(\\s|$)");
        return re.test(el.className);
    };
    $D.addClass = function(el, className){
        if (!$D.hasClass(el, className)){
            el.className = el.className + " " + className;
        }
    };
    $D.removeClass = function(el, className){
        el.className = el.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)'), '$1');
    };
    $D.getElementsByClassName= function(indexNode,tagName,className) {
        if(arguments.length!=3) {
            alert("Be careful with it...");
            return;
        }
        var doms= indexNode.getElementsByTagName(tagName);
        var targets=[];
        for(var i=0,len=doms.length;i<len;i++) {
            if($D.hasClass(doms[i],className)) {
                targets.push(doms[i]);
            }
        }
        return targets;
    };
     var getDocumentElement = function(){
        if(document.compatMode === 'CSS1Compat'){
            return document.documentElement;
        }else{
            return document.body;
        }
    };
    $D.getClientWidth= function(el) {
    	el= el||getDocumentElement();
    	return el.getClientWidth;
    }
    _findPapa= function(dom,selector) {
        var max=4,id=selector.substr(1),type=selector.charAt(0),fun;
        
        fun= ({"#":function(dom,id) {
            return dom.id==id;
        },".":function(dom,id){
            return $D.hasClass(dom,id)
        }})[type];
        
        return function () {
            if(fun(dom,id)) {
                return dom;
            }else if(max>0) {
                max--;
                if(dom.parentNode) {
                    dom= dom.parentNode;
                }else {
                	max= 0;
                }
                return arguments.callee();
            }
            return null;
        }
    };
    $D.superFindPapa= _findPapa;
    $D.findPapa= function() {
    	//最多寻找四层
        var max=4;
        return function (dom,className) {
            if($D.hasClass(dom,className)) {
                return dom;
            }else if(max>0) {
                max--;
                return arguments.callee(dom.parentNode,className);
            }
            return null;
        }
    };
    $D.node = function(type, attrObj, win){
        var p,
            w = win || window,
            d = w.document,
            n = d.createElement(type);
        for (p in attrObj) {
            var mapObj = {
                "class":function(){
                    n.className = attrObj[p];
                },
                "style":function(){
                	n.style.cssText= attrObj[p];
                	
                }
            }
            if(mapObj[p]){
                mapObj[p]();
            }else{
                n.setAttribute(p, attrObj[p]);
            }
        }
        return n;
    };
    $D.hide= function(el) {
    	if(typeof el=="string") {
    		$D.id(el).style.display= "none";
    	}else {
        	el.style.display= "none";
    	}
    };
    $D.show= function(el) {
    	if(typeof el=="string") {
    		$D.id(el).style.display= "block";
    	}else {
        	el.style.display= "block";
    	}
    };
    var DocumentElement;
    var getDocumentElement = function(){
        if(DocumentElement) {
            return DocumentElement;
        }
        if(document.compatMode === 'CSS1Compat'){
            DocumentElement= document.documentElement;
        }else{
            DocumentElement= document.body;
        }
        return DocumentElement;
        
    };
    $D.getClientHeight = function(el) {
        el = el || getDocumentElement();
        return el.clientHeight; // IE, Gecko
    };
    $D.getClientWidth = function(el) {
        el = el || getDocumentElement();
        return el.clientWidth; // IE, Gecko
    };
    $D.getOffsetHeight = function(el) {
        el = el || getDocumentElement();
        return el.offsetHeight; 
    };
    $D.getOffsetWidth = function(el) {
        el = el || getDocumentElement();
        return el.offsetWidth;
    };
    /**
     * 获取当前文档的左边已卷动的宽度
     * Returns the left scroll value of the document 
     * @method getDocumentScrollLeft
     * @memberOf dom
     * @param {HTMLDocument} document (optional) The document to get the scroll value of
     * @return {Int}  The amount that the document is scrolled to the left
     */
    var getScrollLeft = function(el) {
        var scrollLeft;
        if(el){
            scrollLeft = el.scrollLeft;
        }else{
            scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        }
        return scrollLeft || 0;
    };

    /**
     * 获取当前文档的上边已卷动的宽度
     * Returns the top scroll value of the document 
     * @method getDocumentScrollTop
     * @memberOf dom
     * @param {HTMLDocument} document (optional) The document to get the scroll value of
     * @return {Int}  The amount that the document is scrolled to the top
     */
    var getScrollTop = function(el) {
        var scrollTop;
        if(el){
            scrollTop = el.scrollTop;
        }else{
            scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        }
        return scrollTop || 0;
    };
    $D.getClientXY = function(el) {
        var _t = 0,
            _l = 0;

        if (el) {
            //这里只检查document不够严谨, 在el被侵染置换(jQuery做了这么恶心的事情)
            //的情况下, el.getBoundingClientRect() 调用回挂掉
            if (document.documentElement.getBoundingClientRect && el.getBoundingClientRect) { // 顶IE的这个属性，获取对象到可视范围的距离。
                //现在firefox3，chrome2，opera9.63都支持这个属性。
                var box = {left:0,top:0,right:0,bottom:0};//
                try{
                    box=el.getBoundingClientRect();
                }catch(ex){
                    return [0,0];
                }
                var oDoc = el.ownerDocument;
                
                var _fix = 0;//J.browser.ie ? 2 : 0; //修正ie和firefox之间的2像素差异
                
                _t = box.top - _fix + getScrollTop(oDoc);
                _l = box.left - _fix + getScrollLeft(oDoc);
            } else {//这里只有safari执行。
                while (el.offsetParent) {
                    _t += el.offsetTop;
                    _l += el.offsetLeft;
                    el = el.offsetParent;
                }
            }
        }
        return [_l, _t];
    };
	webq.framework.cookie = 
	/**
	 * @lends cookie
	 */	
	{
		
		/**
		 * 设置一个cookie
		 * 
		 * @param {String} name cookie名称
		 * @param {String} value cookie值
		 * @param {String} domain 所在域名
		 * @param {String} path 所在路径
		 * @param {Number} hour 存活时间，单位:小时
		 * @return {Boolean} 是否成功
		 */
		set : function(name, value, domain, path, hour) {
			if (hour) {
				var today = new Date();
				var expire = new Date();
				expire.setTime(today.getTime() + 3600000 * hour);
			}
			window.document.cookie = name + "=" + value + "; " + (hour ? ("expires=" + expire.toGMTString() + "; ") : "") + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + domainPrefix + ";"));
			return true;
		},
	
		/**
		 * 获取指定名称的cookie值
		 * 
		 * @param {String} name cookie名称
		 * @return {String} 获取到的cookie值
		 */
		get : function(name) {
			var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)");
			// var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*?)(?:;|$)");
			var m = window.document.cookie.match(r);
			return (!m ? "" : m[1]);
			// document.cookie.match(new
			// RegExp("(?:^|;+|\\s+)speedMode=([^;]*?)(?:;|$)"))
		},
	
		/**
		 * 删除指定cookie,复写为过期
		 * 
		 * @param {String} name cookie名称
		 * @param {String} domain 所在域
		 * @param {String} path 所在路径
		 */
		remove : function(name, domain, path) {
			window.document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + domainPrefix + ";"));
		}
	};
    $S.encodeHtmlSimple = function(sStr){
		sStr = sStr.replace(/&/g,"&amp;");
		sStr = sStr.replace(/>/g,"&gt;");
		sStr = sStr.replace(/</g,"&lt;");
		sStr = sStr.replace(/"/g,"&quot;");
		sStr = sStr.replace(/'/g,"&#39;");
		return sStr;
	};
	$S.obj2queryString = function(opt) {
        var result=[],value;
        for(var key in opt){
            value= opt[key];
            result.push(encodeURIComponent(String(key)) + "=" + encodeURIComponent(String(value)));
        }
        return result.join("&");
    };
    
    var JSON = {};
        /*
            http://www.JSON.org/json2.js
            2009-08-17
        
            Public Domain.
        
            NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
        
            See http://www.JSON.org/js.html
        
            This file creates a global JSON object containing two methods: stringify
            and parse.
        
                JSON.stringify(value, replacer, space)
                    value       any JavaScript value, usually an object or array.
        
                    replacer    an optional parameter that determines how object
                                values are stringified for objects. It can be a
                                function or an array of strings.
        
                    space       an optional parameter that specifies the indentation
                                of nested structures. If it is omitted, the text will
                                be packed without extra whitespace. If it is a number,
                                it will specify the number of spaces to indent at each
                                level. If it is a string (such as '\t' or '&nbsp;'),
                                it contains the characters used to indent at each level.
        
                    This method produces a JSON text from a JavaScript value.
        
                    When an object value is found, if the object contains a toJSON
                    method, its toJSON method will be called and the result will be
                    stringified. A toJSON method does not serialize: it returns the
                    value represented by the name/value pair that should be serialized,
                    or undefined if nothing should be serialized. The toJSON method
                    will be passed the key associated with the value, and this will be
                    bound to the value
        
                    For example, this would serialize Dates as ISO strings.
        
                        Date.prototype.toJSON = function (key) {
                            function f(n) {
                                // Format integers to have at least two digits.
                                return n < 10 ? '0' + n : n;
                            }
        
                            return this.getUTCFullYear()   + '-' +
                                 f(this.getUTCMonth() + 1) + '-' +
                                 f(this.getUTCDate())      + 'T' +
                                 f(this.getUTCHours())     + ':' +
                                 f(this.getUTCMinutes())   + ':' +
                                 f(this.getUTCSeconds())   + 'Z';
                        };
        
                    You can provide an optional replacer method. It will be passed the
                    key and value of each member, with this bound to the containing
                    object. The value that is returned from your method will be
                    serialized. If your method returns undefined, then the member will
                    be excluded from the serialization.
        
                    If the replacer parameter is an array of strings, then it will be
                    used to select the members to be serialized. It filters the results
                    such that only members with keys listed in the replacer array are
                    stringified.
        
                    Values that do not have JSON representations, such as undefined or
                    functions, will not be serialized. Such values in objects will be
                    dropped; in arrays they will be replaced with null. You can use
                    a replacer function to replace those with JSON values.
                    JSON.stringify(undefined) returns undefined.
        
                    The optional space parameter produces a stringification of the
                    value that is filled with line breaks and indentation to make it
                    easier to read.
        
                    If the space parameter is a non-empty string, then that string will
                    be used for indentation. If the space parameter is a number, then
                    the indentation will be that many spaces.
        
                    Example:
        
                    text = JSON.stringify(['e', {pluribus: 'unum'}]);
                    // text is '["e",{"pluribus":"unum"}]'
        
        
                    text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
                    // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'
        
                    text = JSON.stringify([new Date()], function (key, value) {
                        return this[key] instanceof Date ?
                            'Date(' + this[key] + ')' : value;
                    });
                    // text is '["Date(---current time---)"]'
        
        
                JSON.parse(text, reviver)
                    This method parses a JSON text to produce an object or array.
                    It can throw a SyntaxError exception.
        
                    The optional reviver parameter is a function that can filter and
                    transform the results. It receives each of the keys and values,
                    and its return value is used instead of the original value.
                    If it returns what it received, then the structure is not modified.
                    If it returns undefined then the member is deleted.
        
                    Example:
        
                    // Parse the text. Values that look like ISO date strings will
                    // be converted to Date objects.
        
                    myData = JSON.parse(text, function (key, value) {
                        var a;
                        if (typeof value === 'string') {
                            a =
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                            if (a) {
                                return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                                    +a[5], +a[6]));
                            }
                        }
                        return value;
                    });
        
                    myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                        var d;
                        if (typeof value === 'string' &&
                                value.slice(0, 5) === 'Date(' &&
                                value.slice(-1) === ')') {
                            d = new Date(value.slice(5, -1));
                            if (d) {
                                return d;
                            }
                        }
                        return value;
                    });
        
        
            This is a reference implementation. You are free to copy, modify, or
            redistribute.
        
            This code should be minified before deployment.
            See http://javascript.crockford.com/jsmin.html
        
            USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
            NOT CONTROL.
        */
        
        /*jslint evil: true */
        
        /*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
            call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
            getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
            lastIndex, length, parse, prototype, push, replace, slice, stringify,
            test, toJSON, toString, valueOf
        */
        
        "use strict";
        
        // Create a JSON object only if one does not already exist. We create the
        // methods in a closure to avoid creating global variables.
        
        /*
        if (!this.JSON) {
            this.JSON = {};
        }
        */
        
        (function () {
        
            function f(n) {
                // Format integers to have at least two digits.
                return n < 10 ? '0' + n : n;
            }
            // if (typeof Date.prototype.toJSON !== 'function') {
            if (typeof Date.prototype.toJSON !== 'function' && false) {
                /** 
                 * @ignore
                 */
                Date.prototype.toJSON = function (key) {
        
                    return isFinite(this.valueOf()) ?
                           this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z' : null;
                };
                /** 
                 * @ignore
                 */
                String.prototype.toJSON =
                /** 
                 * @ignore
                 */
                Number.prototype.toJSON =
                /** 
                 * @ignore
                 */
                Boolean.prototype.toJSON = function (key) {
                    return this.valueOf();
                };
        
            }
        
            var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                gap,
                indent,
                meta = {    // table of character substitutions
                    '\b': '\\b',
                    '\t': '\\t',
                    '\n': '\\n',
                    '\f': '\\f',
                    '\r': '\\r',
                    '"' : '\\"',
                    '\\': '\\\\'
                },
                rep;
        
        
            function quote(string) {
        
        // If the string contains no control characters, no quote characters, and no
        // backslash characters, then we can safely slap some quotes around it.
        // Otherwise we must also replace the offending characters with safe escape
        // sequences.
        
                escapable.lastIndex = 0;
                return escapable.test(string) ?
                    '"' + string.replace(escapable, function (a) {
                        var c = meta[a];
                        return typeof c === 'string' ? c :
                            '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                    }) + '"' :
                    '"' + string + '"';
            }
        
        
            function str(key, holder) {
        
        // Produce a string from holder[key].
        
                var i,          // The loop counter.
                    k,          // The member key.
                    v,          // The member value.
                    length,
                    mind = gap,
                    partial,
                    value = holder[key];
        
        // If the value has a toJSON method, call it to obtain a replacement value.
        
                if (value && typeof value === 'object' &&
                        typeof value.toJSON === 'function') {
                    value = value.toJSON(key);
                }
        
        // If we were called with a replacer function, then call the replacer to
        // obtain a replacement value.
        
                if (typeof rep === 'function') {
                    value = rep.call(holder, key, value);
                }
        
        // What happens next depends on the value's type.
        
                switch (typeof value) {
                case 'string':
                    return quote(value);
        
                case 'number':
        
        // JSON numbers must be finite. Encode non-finite numbers as null.
        
                    return isFinite(value) ? String(value) : 'null';
        
                case 'boolean':
                case 'null':
        
        // If the value is a boolean or null, convert it to a string. Note:
        // typeof null does not produce 'null'. The case is included here in
        // the remote chance that this gets fixed someday.
        
                    return String(value);
        
        // If the type is 'object', we might be dealing with an object or an array or
        // null.
        
                case 'object':
        
        // Due to a specification blunder in ECMAScript, typeof null is 'object',
        // so watch out for that case.
        
                    if (!value) {
                        return 'null';
                    }
        
        // Make an array to hold the partial results of stringifying this object value.
        
                    gap += indent;
                    partial = [];
        
        // Is the value an array?
        
                    if (Object.prototype.toString.apply(value) === '[object Array]') {
        
        // The value is an array. Stringify every element. Use null as a placeholder
        // for non-JSON values.
        
                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || 'null';
                        }
        
        // Join all of the elements together, separated with commas, and wrap them in
        // brackets.
        
                        v = partial.length === 0 ? '[]' :
                            gap ? '[\n' + gap +
                                    partial.join(',\n' + gap) + '\n' +
                                        mind + ']' :
                                  '[' + partial.join(',') + ']';
                        gap = mind;
                        return v;
                    }
        
        // If the replacer is an array, use it to select the members to be stringified.
        
                    if (rep && typeof rep === 'object') {
                        length = rep.length;
                        for (i = 0; i < length; i += 1) {
                            k = rep[i];
                            if (typeof k === 'string') {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    } else {
        
        // Otherwise, iterate through all of the keys in the object.
        
                        for (k in value) {
                            if (Object.hasOwnProperty.call(value, k)) {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    }
        
        // Join all of the member texts together, separated with commas,
        // and wrap them in braces.
        
                    v = partial.length === 0 ? '{}' :
                        gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                                mind + '}' : '{' + partial.join(',') + '}';
                    gap = mind;
                    return v;
                }
            }
        
        // If the JSON object does not yet have a stringify method, give it one.
        
            if (typeof JSON.stringify !== 'function') {
                JSON.stringify = function (value, replacer, space) {
        
        // The stringify method takes a value and an optional replacer, and an optional
        // space parameter, and returns a JSON text. The replacer can be a function
        // that can replace values, or an array of strings that will select the keys.
        // A default replacer method can be provided. Use of the space parameter can
        // produce text that is more easily readable.
        
                    var i;
                    gap = '';
                    indent = '';
        
        // If the space parameter is a number, make an indent string containing that
        // many spaces.
        
                    if (typeof space === 'number') {
                        for (i = 0; i < space; i += 1) {
                            indent += ' ';
                        }
        
        // If the space parameter is a string, it will be used as the indent string.
        
                    } else if (typeof space === 'string') {
                        indent = space;
                    }
        
        // If there is a replacer, it must be a function or an array.
        // Otherwise, throw an error.
        
                    rep = replacer;
                    if (replacer && typeof replacer !== 'function' &&
                            (typeof replacer !== 'object' ||
                             typeof replacer.length !== 'number')) {
                        throw new Error('JSON.stringify');
                    }
        
        // Make a fake root object containing our value under the key of ''.
        // Return the result of stringifying the value.
        
                    return str('', {'': value});
                };
            }
        
        
        // If the JSON object does not yet have a parse method, give it one.
        
            if (typeof JSON.parse !== 'function') {
                JSON.parse = function (text, reviver) {
        
        // The parse method takes a text and an optional reviver function, and returns
        // a JavaScript value if the text is a valid JSON text.
        
                    var j;
        
                    function walk(holder, key) {
        
        // The walk method is used to recursively walk the resulting structure so
        // that modifications can be made.
        
                        var k, v, value = holder[key];
                        if (value && typeof value === 'object') {
                            for (k in value) {
                                if (Object.hasOwnProperty.call(value, k)) {
                                    v = walk(value, k);
                                    if (v !== undefined) {
                                        value[k] = v;
                                    } else {
                                        delete value[k];
                                    }
                                }
                            }
                        }
                        return reviver.call(holder, key, value);
                    }
        
        
        // Parsing happens in four stages. In the first stage, we replace certain
        // Unicode characters with escape sequences. JavaScript handles many characters
        // incorrectly, either silently deleting them, or treating them as line endings.
        
                    cx.lastIndex = 0;
                    if (cx.test(text)) {
                        text = text.replace(cx, function (a) {
                            return '\\u' +
                                ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                        });
                    }
        
        // In the second stage, we run the text against regular expressions that look
        // for non-JSON patterns. We are especially concerned with '()' and 'new'
        // because they can cause invocation, and '=' because it can cause mutation.
        // But just to be safe, we want to reject all unexpected forms.
        
        // We split the second stage into 4 regexp operations in order to work around
        // crippling inefficiencies in IE's and Safari's regexp engines. First we
        // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
        // replace all simple value tokens with ']' characters. Third, we delete all
        // open brackets that follow a colon or comma or that begin the text. Finally,
        // we look to see that the remaining characters are only whitespace or ']' or
        // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.
        
                    if (/^[\],:{}\s]*$/.
        test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        
        // In the third stage we use the eval function to compile the text into a
        // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
        // in JavaScript: it can begin a block or an object literal. We wrap the text
        // in parens to eliminate the ambiguity.
        
                        j = eval('(' + text + ')');
        
        // In the optional fourth stage, we recursively walk the new structure, passing
        // each name/value pair to a reviver function for possible transformation.
        
                        return typeof reviver === 'function' ?
                            walk({'': j}, '') : j;
                    }
        
        // If the text is not JSON parseable, then a SyntaxError is thrown.
        
                    throw new SyntaxError('JSON.parse');
                };
            }
        }());
    q.json= JSON;
    $F.toggle= function(func1,func2,reset) {
    	var flag= 0;
    	var func= function() {
    		if(!flag) {
    			func1();
    		}else {
    			func2();
    		}
    		flag= !flag;
    	};
    	if(reset) {
    		func.reset= function(){
    			func2();
    			flag= 0;
    		}
    	}else {
    		func.reset= function() {
    			flag= 0;
    		}
    	}
    	return func;
    };
    $F.each= function(object,func) {
    	var result;
    	for(var k in object) {
    		if(object.hasOwnProperty(k)) {
    			if(result=func(k,object[k],object)) {
    				return result;
    			}
    		}
    	}
    };
    fx= function(frames,func,id) {
    	var time= Math.floor(1000/frames);
    	this.time= time;
    	this.func= func;
    	if(!fx._intervals[time]) {
    		fx._funcs[time]=[];
    		fx._funcs[time].push(func);
    		fx._intervals[time]= setInterval(this._run(time),time)
    	}else {
    		fx._funcs[time].push(func);
    	}
    	if(id) {
    		fx._ids[id]= fx._ids[id]||[];
    		fx._ids[id].push([time,func]);
    	}
    };
    fx._ids= {};
    fx._intervals= {};
    fx._funcs= {};
    fx.prototype= {
    	_run: function(time) {
    		var _this= this;
    		return function() {
    			var funcs= fx._funcs[time];
    			for(var len= funcs.length-1;len>=0;len--) {
    				funcs[len]();
    			}
    		}
    	},
    	_addFunc: function(time,func) {
    		fx._funcs[time]= fx._funcs[time]||[];
    		fx._funcs[time].push(func);
    	},
    	_removeFunc: function(time,func) {
    		var funcs= fx._funcs[time];
    		for(var len=funcs.length-1;len>=0;len--) {
    			if(funcs[len]==func) {
    				funcs.splice(len,1);
    				break;
    			}
    		}
    		if(funcs.length==0) {
    			clearInterval(fx._intervals[time]);
    			delete fx._intervals[time];
    		}
    		if(func.reset) {
    			func.reset();
    		}
    	},
    	stop: function(id) {
    		if(id) {
    			if(fx._ids[id]) {
	    			for(var i=0;i<fx._ids[id].length;i++) {
	    				this._removeFunc(fx._ids[id][i][0],fx._ids[id][i][1]);
	    			}
	    			delete fx._ids[id];
    			}
    		}else {
    			this._removeFunc(this.time,this.func)
    		}
    	}
    };
    $F.fx= fx;
    $F.arrayIndexOf= function(a,elt) {
        var len = a.length;
    
        var from = Number(arguments[2]) || 0;
        from = (from < 0)
             ? Math.ceil(from)
             : Math.floor(from);
        if (from < 0)
          from += len;
    
        for (; from < len; from++)
        {
          if (from in a &&
              a[from] === elt)
            return from;
        }
        return -1;
    };
    // From: David Flanagan.
    // In DOM-compliant browsers, our functions are trivial wrappers around
    // addEventListener( ) and removeEventListener( ).
    if (document.addEventListener) {
        /**
         * 
         * 添加事件监听器
         * 
         * @method addEventListener
         * @memberOf Event
         * 
         * @param element 元素
         * @param eventType 事件类型，不含on
         * @param handler 事件处理器
         * @return {Element} 返回元素
         */
        var addEventListener = function(element, eventType, handler) {
            //var id = $E._uid( );  // Generate a unique property name
            var isExist = false;
            if(!element){
                J.out('targetModel undefined:'+eventType+handler);
            }
            if(!element._eventTypes){
                element._eventTypes = {};
            }
            if (!element._eventTypes[eventType]){
                element._eventTypes[eventType] = [];
            }
            element.addEventListener(eventType, handler, false);
            
            var handlers= element._eventTypes[eventType];
            for(var i=0; i<handlers.length; i++){
                if(handlers[i] == handler){
                    isExist = true;
                }
            }
            if(!isExist){
                handlers.push(handler);
            }
        };
        
        /**
         * 
         * 移除事件监听器
         * 
         * @memberOf event
         * @method removeEventListener
         * 
         * @param element 元素
         * @param eventType 事件类型，不含on
         * @param handler 事件处理器
         * @return {Element} 返回元素
         */
        var removeEventListener = function(element, eventType, handler) {
            if(eventType){
                if(handler){
                    element.removeEventListener(eventType, handler, false);
                    if(element._eventTypes && element._eventTypes[eventType]){
                        var handlers = element._eventTypes[eventType];
                        for(var i=0; i<handlers.length; i++){
                            if(handlers[i] === handler){
                                handlers[i]=null;
                                handlers.splice(i, 1);
                                break;
                            }
                        }
                    }
                }else{
                    
                    if(element._eventTypes && element._eventTypes[eventType]){
                        var handlers = element._eventTypes[eventType];
                        
                        for(var i=0; i<handlers.length; i++){
                            element.removeEventListener(eventType, handlers[i], false);
                        }
                        element._eventTypes[eventType] = [];
                    }
                    
                }
            }else{
                if(element._eventTypes){
                    var eventTypes = element._eventTypes;
                    for(var p in eventTypes){
                        var handlers = element._eventTypes[p];
                        for(var i=0; i<handlers.length; i++){
                            element.removeEventListener(p, handlers[i], false);
                        }
                    }
                    eventTypes = {};
                }
            }
            
        };
    }
    // In IE 5 and later, we use attachEvent( ) and detachEvent( ), with a number of
    // hacks to make them compatible with addEventListener and removeEventListener.
    else if (document.attachEvent) {
        /**
         * 兼容ie的写法
         * @ignore
         */
        var addEventListener = function(element, eventType, handler) {

            if ($E._find(arguments) != -1){
                return;
            }
        
            var wrappedEvent = function(e){
                if(!e){
                    e = window.event;
                }

                var event = {
                    _event: e,// In case we really want the IE event object
                    
                    type: e.type,           // Event type
                    target: e.srcElement,   // Where the event happened
                    currentTarget: element, // Where we're handling it
                    relatedTarget: e.fromElement ? e.fromElement : e.toElement,
                    eventPhase: (e.srcElement == element) ? 2 : 3,
    
                    // Mouse coordinates
                    clientX: e.clientX,
                    clientY: e.clientY,
                    screenX: e.screenX,
                    screenY: e.screenY,
                    layerX: e.offsetX,
                    layerY: e.offsetY,
                    pageX: e.clientX + document.body.scrollLeft,
                    pageY: e.clientY + document.body.scrollTop,
                    
                   // Key state
                    altKey: e.altKey,
                    ctrlKey: e.ctrlKey,
                    shiftKey: e.shiftKey,
                    //原有的charCode
                    charCode: e.keyCode,
                    //keyCode
                    keyCode: e.keyCode,
                    /*
                     * keyCode 值附表：
                     * ===============================
                     * 
                     * 1.主键盘区字母和数字键的键码值
                     * 按键   键码
                     * 0    48
                     * 1    49
                     * 2    50
                     * 3    51
                     * 4    52
                     * 5    53
                     * 6    54
                     * 7    55
                     * 8    56
                     * 9    57
                     * 
                     * A    65
                     * B    66
                     * C    67
                     * D    68
                     * E    69
                     * F    70
                     * G    71
                     * H    72
                     * I    73
                     * J    74
                     * K    75
                     * L    76
                     * M    77
                     * N    78
                     * O    79
                     * P    80
                     * Q    81
                     * R    82
                     * S    83
                     * T    84
                     * U    85
                     * V    86
                     * W    87
                     * X    88
                     * Y    89
                     * Z    90
                     * 
                     * 
                     * 3.控制键键码值
                     * 按键           键码
                     * BackSpace    8
                     * Tab          9
                     * Clear        12
                     * Enter        13
                     * Shift        16
                     * Control      17
                     * Alt          18
                     * Cape Lock    20
                     * Esc          27
                     * Spacebar     32 
                     * Page Up      33
                     * Page Down    34
                     * End          35
                     * Home         36
                     * Left Arrow   37
                     * Up Arrow     38
                     * Right Arrow  39
                     * Down Arrow   40
                     * Insert       45
                     * Delete       46
                     * 
                     * Num Lock     144
                     * 
                     * ;:           186
                     * =+           187
                     * ,<           188
                     * -_           189
                     * .>           190
                     * /?           191
                     * `~           192
                     * 
                     * [{           219
                     * \|           220
                     * }]           221
                     * ’"           222
                     * 
                     * 2.功能键键码值
                     * F1   112
                     * F2   113
                     * F3   114
                     * F4   115
                     * F5   116
                     * F6   117
                     * F7   118
                     * F8   119
                     * F9   120
                     * F10  121
                     * F11  122
                     * F12  123
                     * 
                     * 2.数字键盘上的键的键码值
                     * 按键   键码
                     * 0    96
                     * 1    97
                     * 2    98
                     * 3    99
                     * 4    100
                     * 5    101
                     * 6    102
                     * 7    103
                     * 8    104
                     * 9    105
                     * 
                     * *    106
                     * +    107
                     * Enter108
                     * -    109
                     * .    110
                     * /    111
                     * 
                     */

                    stopPropagation: function(){
                        this._event.cancelBubble = true;
                    },
                    preventDefault: function(){
                        this._event.returnValue = false;
                    }
                }
    

                if (Function.prototype.call){
                    handler.call(element, event);
                }else {
                    // If we don't have Function.call, fake it like this.
                    element._currentHandler = handler;
                    element._currentHandler(event);
                    element._currentHandler = null;
                }
            };
    
            // Now register that nested function as our event handler.
            element.attachEvent("on" + eventType, wrappedEvent);
    

            var h = {
                element: element,
                eventType: eventType,
                handler: handler,
                wrappedEvent: wrappedEvent
            };
    

            var d = element.document || element;
            // Now get the window associated with that document.
            var w = d.parentWindow;
    
            // We have to associate this handler with the window,
            // so we can remove it when the window is unloaded.
            var id = $E._uid( );  // Generate a unique property name
            if (!w._allHandlers) w._allHandlers = {};  // Create object if needed
            w._allHandlers[id] = h; // Store the handler info in this object
    
            // And associate the id of the handler info with this element as well.
            if (!element._handlers) element._handlers = [];
            element._handlers.push(id);
    
            // If there is not an onunload handler associated with the window,
            // register one now.
            if (!w._onunloadEventRegistered) {
                w._onunloadEventRegistered = true;
                w.attachEvent("onunload", $E._removeAllEvents);
            }
        };
        
        /**
         * 兼容ie的写法
         * @ignore
         */
        var removeEventListener = function(element, eventType, handler) {
            
            // Find this handler in the element._handlers[] array.
            var handlersIndex = $E._find(arguments);
            if (handlersIndex == -1) return;  // If the handler was not registered, do nothing
            // Get the window of this element.
            var d = element.document || element;
            var w = d.parentWindow;
            for(var j=0; j<handlersIndex.length; j++){
                var i = handlersIndex[j];
                // Look up the unique id of this handler.
                var handlerId = element._handlers[i];
                // And use that to look up the handler info.
                var h = w._allHandlers[handlerId];
                // Using that info, we can detach the handler from the element.
                element.detachEvent("on" + h.eventType, h.wrappedEvent);
                // Remove one element from the element._handlers array.
                element._handlers[i]=null;
                element._handlers.splice(i, 1);
                // And delete the handler info from the per-window _allHandlers object.
                delete w._allHandlers[handlerId];
            }
            if(element._handlers && element._handlers.length==0){
                element._handlers=null;
            }
        };
    
        // A utility function to find a handler in the element._handlers array
        // Returns an array index or -1 if no matching handler is found
        $E._find = function(args) {
            var element = args[0],
                eventType = args[1],
                handler = args[2],
                handlers = element._handlers;
                
            if (!handlers){
                return -1;  // if no handlers registered, nothing found
            }
    
            // Get the window of this element
            var d = element.document || element;
            var w = d.parentWindow;
    
            var handlersIndex = [];

            if(args.length === 3){
                // Loop through the handlers associated with this element, looking
                // for one with the right type and function.
                // We loop backward because the most recently registered handler
                // is most likely to be the first removed one.
                for(var i = handlers.length-1; i >= 0; i--) {
                    var handlerId = handlers[i];        // get handler id
                    var h = w._allHandlers[handlerId];  // get handler info
                    // If handler info matches type and handler function, we found it.
                    if (h.eventType == eventType && h.handler == handler){
                        handlersIndex.push(i);
                        return handlersIndex;
                    }
                }
            }else if(args.length === 2){
                
                for(var i = handlers.length-1; i >= 0; i--) {
                    var handlerId = handlers[i];        // get handler id
                    var h = w._allHandlers[handlerId];  // get handler info
                    // If handler info matches type and handler function, we found it.
                    if (h.eventType == eventType){
                        handlersIndex.push(i);
                    }
                }
                if(handlersIndex.length>0){
                    return handlersIndex;
                }
                
            }else if(args.length === 1){

                for(var i = handlers.length-1; i >= 0; i--) {
                    handlersIndex.push(i);
                }
                if(handlersIndex.length>0){
                    return handlersIndex;
                }
            }
            
            
            
            
            
            
            return -1;  // No match found
        };
    
        $E._removeAllEvents = function( ) {
            // This function is registered as the onunload handler with
            // attachEvent. This means that the this keyword refers to the
            // window in which the event occurred.
            var id,
                w = this;
    
            // Iterate through all registered handlers
            for(id in w._allHandlers) {
                // Get handler info for this handler id
                var h = w._allHandlers[id];
                // Use the info to detach the handler
                h.element.detachEvent("on" + h.eventType, h.wrappedEvent);
                h.element._handlers=null;
                // Delete the handler info from the window
                delete w._allHandlers[id];
            }
        }
    
        // Private utility to generate unique handler ids
        $E._counter = 0;
        $E._uid = function(){
            return "h" + $E._counter++;
        };
    }
    
    $E.off= removeEventListener;
    $E.on= addEventListener;
    
    ;(function(){
      var cache = {};
      $S.template = function tmpl(str, data){
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
          cache[str] = cache[str] ||
            tmpl(document.getElementById(str).innerHTML) :
          
          // Generate a reusable function that will serve as a template
          // generator (and which will be cached).
          new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +
            
            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +
            
            // Convert the template into pure JavaScript
            str
              .replace(/[\r\t\n]/g, " ")
              .split("<%").join("\t")
              .replace(/((^|%>)[^\t]*)'/g, "$1\r")
              .replace(/\t=(.*?)%>/g, "',$1,'")
              .split("\t").join("');")
              .split("%>").join("p.push('")
              .split("\r").join("\\'")
          + "');}return p.join('');");
        
        // Provide some basic currying to the user
        return data ? fn( data ) : fn;
      };
    })();
    var MicroEvent  = function(){};
    MicroEvent.prototype = {
        bind    : function(event, fct){
            this._events = this._events || {};
            this._events[event] = this._events[event]   || [];
            this._events[event].push(fct);
        },
        unbind  : function(event, fct){
            this._events = this._events || {};
            if( event in this._events === false  )  return;
            
            this._events[event].splice($F.arrayIndexOf(this._events[event],fct), 1);
        },
        trigger : function(event /* , args... */){
            this._events = this._events || {};
            if( event in this._events === false  )  return;
            for(var i = 0; i < this._events[event].length; i++){
                this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1))
            }
        }
    };
    MicroEvent.mixin = function(destObject){
        var props   = ['bind', 'unbind', 'trigger'];
        for(var i = 0; i < props.length; i ++){
            destObject.prototype[props[i]]  = MicroEvent.prototype[props[i]];
        }
    };
    /*注入有危险，使用请谨慎
    if (!Array.prototype.indexOf)
    {
      Array.prototype.indexOf = function(elt)
      {
        var len = this.length;
    
        var from = Number(arguments[1]) || 0;
        from = (from < 0)
             ? Math.ceil(from)
             : Math.floor(from);
        if (from < 0)
          from += len;
    
        for (; from < len; from++)
        {
          if (from in this &&
              this[from] === elt)
            return from;
        }
        return -1;
      };
    }
    */
    q.view= function(options) {
        this.init(options);
    };
    q.model= function(options) {
        this.init(options);
    };
    q.collection= function(options) {
        this.init(options);
    };
    q.controller= function(options) {
        this.init(options);
    };
    q.view.eventParser= function() {
    	this.init();
    };
    q.view.eventParser.prototype= {
    	init: function() {
    		var _this= this;
            this.op= [
                {
                    "!": function(story,func,e) {
                        var words= story.split(",");
                        for(var p= words.length-1;p>=0;p--) {
                            if(_this.match(words[p],func,e)) {
                                return false;
                            }
                        }
                        return true;
                    }
                },
                {
                    ".": function(letter,func,e) {
                        return e.target.className==letter;
                    },
                    "#": function(letter,func,e) {
                        return e.target.id==letter;
                    },
                    ".~": function(letter,func,e) {
                        return $D.hasClass(e.target,letter);
                    },
                    "..#": function(letter,func,e) {
                    	return _findPapa(e.target,"#"+letter)();
                    },
                    "...": function(letter,func,e) {
                    	return _findPapa(e.target,"."+letter)();
                    }
                },
                {
                    ">": function(word,func,e,p) {
                        var p,wordP,wordS,s;
                        s= word.split(">");
                        wordP= s[0];
                        wordS= s[1];
                        if( (wordS=="*"?true:_this.match(wordS,func,e)) && (p= _findPapa(e.target,wordP)())) {
                            return [true,{target:p,stopPropagation:function(){
                               e.stopPropagation();
                            }}];
                        }
                        return false;
                    }
                }
            ];
            this.op2Level= ["!",[".","#",".~","...","..#"],">"];
    	},
        match: function(word,func,e) {
        	var p,wordP,wordS;
        	if(word.indexOf(this.op2Level[2]) >-1 ) {
        		//level 3
        		return this.op[2][this.op2Level[2]](word,func,e,p);
        	}else {
        		//level 2
    			//(".~").length2
        		var i=3;
        		while(i>0) {
        			if(p= this.op[1][word.substr(0,i)]) {
                        if(p(word.substr(i),func,e)) {
                            return true;
                        }
                    }
        			i--;
        		}
        	}
        	return false;
        },
        router: function(story/* .aa,.~bb,#cc,.aa>.dd */,func/* function */,e/* event */,p) {
        	var result;
            if(p= this.op[0][story.charAt(0)]) {
            	//level 1
            	if(p(story.substr(1),func,e)) {
            		
            		return true
            	}
            }else {
            	var words= story.split(",");
            	for(p= words.length-1;p>=0;p--) {
            		if(result= this.match(words[p],func,e)) {
            			return result;
            		}
            	}
            }
            return false;
        },
        parse: function(story,func,e) {
            var result= this.router(story,func,e);
            if(result.length==2) {
                func(result[1]);
            }else if(result){
                func(e);
            }
        }
    };
    q.view.eventParser= new q.view.eventParser();
    q.view.prototype= {
        init: function(data,option) {
        	if(option) {
            	this.initOption(option);
        	}
        	if(data) {
        		this._data= data;
        	}
        },
        initOption: function(option) {
        	//option for view
        	//not in prototype
        	this.beforeRender= option.beforeRender||this.beforeRender;
        },
        afterInit: function() {
        	
        },
        render: function() {
        	var _this= this;
        	if(this.target && typeof this.target == "string" ) {
        		this.target= $D.id(this.target);
        	}
        	if((this.template||this.html) && this.target) {
            	if(this.template) {
            		//initial dom...
    	            var html= $S.template(this.template,this._data); 
            	}else if(this.html) {
            		var html= this.html;
            	}
	            if(this.container) {
	            	this.container;
	            	var f= this.container.pop();
	            	if(typeof f!="function") {
	            		this.container.push(f);
	            		f= null;
	            	}
	            	this.el= $D.node.apply(null,this.container);
	            	if(f) {
	            		f(this.el,this);
	            		this.container.push(f);
	            	}
	            	this.el.innerHTML= html;
	            	this.beforeRender(this.el);
	                this.target.appendChild(this.el);
	            }else {
	            	this.el= this.target;
	            	this.beforeRender(this.el);
	            	this.el.innerHTML= html;
	            }
	            //initial event...
	            if(this.events) {
	            	this.initEvents();
	            }
	            
        		this.incrId();
        	//only binding events 
        	}else if(this.target && this.events) {
        		this.el= this.target;
        		this.initEvents();
        	}
        },
        beforeRender: function() {
        	
        },
        afterRender: function() {
        	
        },
        update: function(data) {
        	this._data= data;
        	this.removeEvents();
        	var _this= this;
            if(this.template && this.target) {
                //initial dom...
                var html= $S.template(this.template,this._data);
                if(this.container) {
                    this.container;
                    var f= this.container.pop();
                    if(typeof f!="function") {
                        this.container.push(f);
                        f= null;
                    }
                    //this.el= $D.node.apply(null,this.container);
                    if(f) {
                        f(this.el,this);
                        this.container.push(f);
                    }
                    this.beforeRender(this.el);
                    this.el.innerHTML= html;
                    //this.target.appendChild(this.el);
                }else {
                    this.el= this.target;
                    this.beforeRender(this.el);
                    this.el.innerHTML= html;
                }
                //initial event...
                if(this.events) {
                    this.initEvents();
                }
            }
        },
        hash: {"#":"id", ".":"className", "@":"el","!":"!"},
        eventsNotBubble: {
        	"@click":1,
        	"blur":1,
        	"focus":1,
        	"change":1
        	//"mouseenter":1,//onlyIE
        	//"mouseleave":1
        },
        initEvents: function() {
            var events= {},
                _this=this,
                hash= this.hash,
                eventsNotBubble= this.eventsNotBubble;
            $F.each(this.events,function(k,v) {
            	if(typeof v=="string") {
            		v= _this.observers[v];
            	}
            	var temp= v;
            	v= function(e) {
            		//e.stopPropagation();
            		Array.prototype.push.call(arguments,_this);
            		temp.apply(this,arguments);
            	};
            	var arg= k.split(" ");
                var targets= arg[0],event= arg[1];
                events[event]= events[event]||[];
                events[event].push([targets,v]);
                this._events= events;
            });
            $F.each(events,function(k,v) {
            	if(eventsNotBubble[k]) {
                    for(var len=v.length-1;len>=0;len--) {
                        var targets= v[len][0].split(",");
                        for(var l=targets.length-1;l>=0;l--) {
                            var type= hash[targets[l].charAt(0)];
                            if(type=="id") {
                            	$E.on($D.id(targets[l].substr(1)),k,v[len][1]);
                            }else if(type=="el") {
                            	$E.on(_this.el,k.substr(1),v[len][1]);
                            }
                        }
                    }
            	}else {
                    $E.on(_this.el,k,function(e) {
                    	//e.stopPropagation();
                    	var dom= e.target;
                    	var not=null;
                        for(var len=v.length-1;len>=0;len--) {
                        	q.view.eventParser.parse(v[len][0],v[len][1],e);
                        	/* ugly code
                        	var targets= v[len][0].split(",");
                        	for(var l=targets.length-1;l>=0;l--) {
                        		type= hash[targets[l].charAt(0)];
                        		if(type=="className"&&targets[l].charAt(1)=="~") {
	                        		if($D.hasClass(dom,targets[l].substr(2))) {
	                        			v[len][1](e);
	                        		}
                        		}else if(type=="!") {
                        			not= (not===null?v[len][1]:not);
                        			type= hash[targets[l].charAt(1)];
                        		    if(type=="className"&&targets[l].charAt(2)=="~") {
                                        if($D.hasClass(dom,targets[l].substr(3))) {
                                            not= false;
                                        }
                        		    }else {
                        		    	if(targets[l].substr(2)==dom[type]) {
                                            not= false;
                                        }
                        		    }
                        		}else {
                        			//加入子元素选择支持
                        			if(targets[l].substr(1).indexOf(">")>-1) {
                        				var pa= targets[l].split(">")[0];
                        				var son= targets[l].split(">")[1];
                        				if(son.substr(1)==dom[hash[son.charAt(0)]]) {
                                            var p= _findPapa(dom,pa)();
                                            if(p) {
                                            	//置换e.target
                                            	v[len][1]({target:p,stopPropagation:function(){
                                            	   e.stopPropagation();
                                            	}});
                                            }
                        				}
                        			}else {
    	                        		if(targets[l].substr(1)==dom[type]) {
    	                        			v[len][1](e);
    	                        		}
                        			}
                        		}
                        	}
                        	if(not) {
                        		not(e);
                        		not= null;
                        	}
                        	*/
                        }
                        
                    });
            	}
            });
        },
        removeEvents: function() {
            var _this= this,
                hash= this.hash,
                eventsNotBubble= this.eventsNotBubble;
            $F.each(this.events,function(k,v) {
                if(eventsNotBubble[k]) {
                    for(var len=v.length-1;len>=0;len--) {
                        var targets= v[len][0].split(",");
                        for(var l=targets.length-1;l>=0;l--) {
                            type= hash[targets[l].split("")[0]];
                            if(type=="id") {
                                $E.off($D.id(targets[l].substr(1)));
                            }else if(type=="el"){
                                $E.off(_this.el);
                            }
                        }
                    }
                }
            });
            $E.off(_this.el);
        },
        id: function(id) {
        	//a cache layer
            this._domsCache= this._domsCache||{};
            if(this._domsCache[id]) {
            	return this._domsCache[id];
            }else {
            	return (this._domsCache[id]=$D.id(id))
            }
        },
        destory: function() {
        	delete this._domsCache;
        	this.removeEvents();
        	this.el.parentNode.removeChild(this.el);
        },
        _id: 0,
        incrId: function() {
        	//return this.constructor.prototype._id++;
        },
        getCount: function() {
        	//return this.constructor.prototype._id;
        },
        setId: function(id) {
        	this.__id= id;
        },
        getId: function(id) {
        	return this.__id;
        },
        show: function() {
            this.isShow= true;
            $D.show(this.el);
        },
        hide: function() {
            this.isShow= false;
            $D.hide(this.el);
        }
    };
    q.controller.prototype= {
    	init: function() {
    		if(this.collection) {
	    		var _this= this;
	    		this._hash= {};
	            this.collection= new this.collection(); 
	            this.key= this.collection.key;
	            this.collection.bind("add",function(item,option) {
	                _this.add(item,option);
	            });
	            this.collection.bind("update",function(item,option) {
	                _this.update(item,option);
	            });
	            this.collection.bind("remove",function(id) {
	                _this.remove(id);
	            });
    		}
    	},
    	feed: function(data) {
    		var _this= this;
    		this.collection.init(data);
    	},
    	bite: function(data,option) {
    		this.collection.add(data,option);
    	},
    	puke: function(id) { //:)
    		this.collection.remove(id);
    	},
        find: function(id) {
            return this._hash[id];
        },
    	add: function(item,option) {
    		var _this= this;
    		var view= new this.view(item,option);
    		view.setId(item[this.key]);
    		this._hash[view.getId()]= view;
    		$F.each(this.viewObserver,function(k,v) {
    			var temp= v;
    			v= function() {
    				Array.prototype.push.call(arguments,_this);
    				temp.apply(this,arguments);
    			};
    			view.bind(k,v);
    		});
    		view.afterInit();
    		view.render();
    		view.afterRender();
    	},
    	update: function(item,option) {
    		this.find(item[this.key]).update(item,option);
    	},
    	remove: function(id) {
    		this.find(id).destory();
    		delete this._hash[id];
    	}
    };
    q.collection.prototype= {
    	init: function(data) {
    		if(data) {
    			var _this= this;
				$F.each(data,function(k,v) {
	    			_this.add(v);
	    		});
    		}else {
    			this._hash= {};
                //一个ID队列,有序
                this._queue= [];
    		}
    	},
        key: "id",
        find: function(id) {
            return this._hash[id];
        },
    	add: function(data,option) {
    		if(!this._hash[data[this.key]]) {
        		var item= new this.model(data);
        		var id= item[this.key];
        		this._hash[id]= item;
        		this._queue.push(id);
        		this.trigger("add",item,option);
    		}else {
    			this.update(data,option);
    		}
    	},
        update: function(data,option) {
            var item= this.find(data[this.key]);
            $F.each(data,function(k,v) {
                item.setter(k,v);
            });
            this.trigger("update",item,option);
        },
        getFirst: function() {
        	return this.find(this._queue[0])[this.key];
        },
        getLast: function() {
        	return this.find(this._queue[this._queue.length-1])[this.key];
        },
        getLength: function() {
        	return this._queue.length;
        },
        insertBefore: function(id) {
        	var i= $F.arrayIndexOf(this._queue,id);
            if(i>-1) {
                var item= this._queue.splice(i,1);
                this._queue.unshift(id);
            }
        },
        remove: function(id) {
        	delete this._hash[id];
        	var i= $F.arrayIndexOf(this._queue,id);
        	if(i>-1) {
        		this._queue.splice(i,1);
        	}
        	this.trigger("remove",id);
        },
    	filter: function(object) { //basic filter
    		var result=[];
    		$F.each(this._hash,function(key,value) {
    			var detect= false;
    			$F.each(object,function(k,v) {
    				v= v.toLowerCase();
    				if(String(value[k]).toLowerCase().indexOf(v)!=-1) {
    					detect= true;
    				}
    				return detect;
    			});
    			if(detect) {
    				result.push(value);
    			}
    		});
    		return result;
    	},
    	map: function(func) {
    		$F.each(this._hash,function(key,value){
    			func(key,value);
    		});
    	}
    };
    q.model.prototype= {
    	init: function(data) {
    		var _this= this;
    		if(data) {
	    		$F.each(data,function(k,v) {
	    			_this.setter(k,v);
	    		});
    		}
    	},
    	setter: function(k,v) {
    		this[k]= this.map(k,v,this);
			var xss= this.xss[k];
			if(xss) {
				this[xss]= $S.encodeHtmlSimple(v);
			}
    		return this;
    	},
    	getter:function(k) {
    		return this[k];
    	},
    	xss: {},
    	map: function(k,v,_this) {
    		return v;
    	},
    	toString: function() {
    		var j={};
            $F.each(this,function(k,v) {
                j[k]= v;
            });
            return q.json.stringify(j);
    	}
    };
    MicroEvent.mixin(q.view);
    MicroEvent.mixin(q.controller);
    MicroEvent.mixin(q.collection);
    MicroEvent.mixin(q.model);
    
    var extend= function(options) {
        var func= function() {
	    	if(arguments[0]) {
	            this.init.apply(this,[].slice.call(arguments));
	    	}
	    },p;
        p= func.prototype= new this;
        for(var k in options) {
        	if(options.hasOwnProperty(k)) {
        		if(k=="init") {
        			var tempf1= options["init"];
        			var tempf2= p["init"];
        			delete p["init"];
        			p["init"]= function(options) {
                        tempf2.call(this,options);
                        //call last
        				tempf1.call(this,options);
        			}
        		}else {
        			p[k]= options[k];
        		}
        	}
        }
        p.constructor= func;
        return  func;
    };
    q.controller.extend= q.collection.extend= q.model.extend= q.view.extend= extend;
    
})();;(function(){
    var q= webq.framework;
    var $D= q.dom,
        $V= q.view,
        $M= q.model,
        $CL= q.collection,
        $C= q.controller,
        $F= q.func,
        $E= q.event,
        faceHtml=[];
    // 定义EQQ的相关常量
    var dName= "t.www";
    webq.module={};
    webq.CONST = {
        //同步指针
    	msg_id: 0,
    	// 主域名
        MAIN_DOMAIN: "qq.com",

        CLIENTID: String(Math.round(Math.random()*100)+((new Date()).getTime()%1000000)),//页面标识ID

        // 连接服务器域名
        CONN_SERVER_DOMAIN: "http://t.web2.qq.com/",
        //CONN_SERVER_DOMAIN: "../",
        
        //CONN_PROXY_URL: "http://web3.qq.com/eqq/proxy.html",
        CONN_PROXY_URL: "http://t.web2.qq.com/proxy.html?v=20110331001",
        
        //系统表情路径
        SYSTEM_FACE_URL: "http://mat1.gtimg.com/www/mb/images/face/",
        
        //默认头像
        DEFAULT_FACE_URL: "http://mat1.gtimg.com/www/mb/css/webqq/images/default_30.jpg",
        
        MAX_LOGIN_AMOUNT: 1,
        
        MAX_FAIL_AMOUNT: 2,
        
        // z-index 基础值
        Z_INDEX_BASE: 3000,
        
        // z-index 基础值
        LOAD_AVATAR_AMOUNT: 50,
        
        
        //表情数组
        TRANSFER_TABLE: [
            14,1,2,3,4,5,6,7,8,9,10,11,12,13,0,
            50,51,96,53,54,73,74,75,76,77,78,55,56,57,58,
            79,80,81,82,83,84,85,86,87,88,97,98,99,100,101,
            102,103,104,105,106,107,108,109,110,111,112,32,113,114,115,
            63,64,59,33,34,116,36,37,38,91,92,93,29,117,72,
            45,42,39,62,46,47,71,95,118,119,120,121,122,123,124,
            27,21,23,25,26,125,126,127,128,129,130,131,132,133,134,
            52,24,22,20,60,61,89,90,31,94,65,35,66,67,68,
            69,70,15,16,17,18,19,28,30,40,41,43,44,48,49
        ],
        
        T_TRANSFER_TABLE: {14:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,11:11,12:12,13:13,0:14,50:15,51:16,96:17,53:18,54:19,73:20,74:21,75:22,76:23,77:24,78:25,55:26,56:27,57:28,58:29,79:30,80:31,81:32,82:33,83:34,84:35,85:36,86:37,87:38,88:39,97:40,98:41,99:42,100:43,101:44,102:45,103:46,104:47,105:48,106:49,107:50,108:51,109:52,110:53,111:54,112:55,32:56,113:57,114:58,115:59,63:60,64:61,59:62,33:63,34:64,116:65,36:66,37:67,38:68,91:69,92:70,93:71,29:72,117:73,72:74,45:75,42:76,39:77,62:78,46:79,47:80,71:81,95:82,118:83,119:84,120:85,121:86,122:87,123:88,124:89,27:90,21:91,23:92,25:93,26:94,125:95,126:96,127:97,128:98,129:99,130:100,131:101,132:102,133:103,134:104,52:105,24:106,22:107,20:108,60:109,61:110,89:111,90:112,31:113,94:114,65:115,35:116,66:117,67:118,68:119,69:120,70:121,15:122,16:123,17:124,18:125,19:126,28:127,30:128,40:129,41:130,43:131,44:132,48:133,49:134},
        
        FACE_2_SHORTCUT: ["/微笑","/撇嘴","/色","/发呆","/得意","/流泪","/害羞","/闭嘴","/睡","/大哭","/尴尬","/发怒","/调皮","/呲牙","/惊讶","/难过","/酷","/冷汗","/抓狂","/吐","/偷笑","/可爱","/白眼","/傲慢","/饥饿","/困","/惊恐","/流汗","/憨笑","/大兵","/奋斗","/咒骂","/疑问","/嘘...","/晕","/折磨","/衰","/骷髅","/敲打","/再见","/擦汗","/抠鼻","/鼓掌","/糗大了","/坏笑","/左哼哼","/右哼哼","/哈欠","/鄙视","/委屈","/快哭了","/阴险","/亲亲","/吓","/可怜","/菜刀","/西瓜","/啤酒","/篮球","/乒乓","/咖啡","/饭","/猪头","/玫瑰","/凋谢","/示爱","/爱心","/心碎","/蛋糕","/闪电","/炸弹","/刀","/足球","/瓢虫","/便便","/月亮","/太阳","/礼物","/拥抱","/强","/弱","/握手","/胜利","/抱拳","/勾引","/拳头","/差劲","/爱你","/NO","/OK","/爱情","/飞吻","/跳跳","/发抖","/怄火","/转圈","/磕头","/回头","/跳绳","/挥手","/激动","/街舞","/献吻","/左太极","/右太极"],
        SHORTCUT_2_FACE: {"/微":{"/微笑":14},"/撇":{"/撇嘴":1},"/色":{"/色":2},"/发":{"/发呆":3,"/发怒":11,"/发抖":41},"/得":{"/得意":4},"/流":{"/流泪":5,"/流汗":27,"/流淚":5},"/害":{"/害羞":6},"/闭":{"/闭嘴":7},"/睡":{"/睡":8},"/大":{"/大哭":9,"/大兵":29},"/尴":{"/尴尬":10},"/调":{"/调皮":12},"/呲":{"/呲牙":13},"/惊":{"/惊讶":0,"/惊恐":26},"/难":{"/难过":15},"/酷":{"/酷":16},"/冷":{"/冷汗":96},"/抓":{"/抓狂":18},"/吐":{"/吐":19},"/偷":{"/偷笑":20},"/可":{"/可爱":21,"/可怜":111,"/可愛":21,"/可憐":111},"/白":{"/白眼":22},"/傲":{"/傲慢":23},"/饥":{"/饥饿":24},"/困":{"/困":25},"/憨":{"/憨笑":28},"/奋":{"/奋斗":30},"/咒":{"/咒骂":31,"/咒罵":31},"/疑":{"/疑问":32,"/疑問":32},"/嘘":{"/嘘...":33},"/晕":{"/晕":34},"/折":{"/折磨":35},"/衰":{"/衰":36},"/骷":{"/骷髅":37,"/骷髏":37},"/敲":{"/敲打":38},"/再":{"/再见":39,"/再見":39},"/擦":{"/擦汗":97},"/抠":{"/抠鼻":98},"/鼓":{"/鼓掌":99},"/糗":{"/糗大了":100},"/坏":{"/坏笑":101},"/左":{"/左哼哼":102,"/左太极":133,"/左太極":133},"/右":{"/右哼哼":103,"/右太极":134,"/右太極":134},"/哈":{"/哈欠":104},"/鄙":{"/鄙视":105,"/鄙視":105},"/委":{"/委屈":106},"/快":{"/快哭了":107},"/阴":{"/阴险":108},"/亲":{"/亲亲":109},"/吓":{"/吓":110},"/菜":{"/菜刀":112},"/西":{"/西瓜":89},"/啤":{"/啤酒":113},"/篮":{"/篮球":114},"/乒":{"/乒乓":115},"/咖":{"/咖啡":60},"/饭":{"/饭":61},"/猪":{"/猪头":46},"/玫":{"/玫瑰":63},"/凋":{"/凋谢":64},"/示":{"/示爱":116,"/示愛":116},"/爱":{"/爱心":66,"/爱你":122,"/爱情":42},"/心":{"/心碎":67},"/蛋":{"/蛋糕":53},"/闪":{"/闪电":54},"/炸":{"/炸弹":55,"/炸彈":55},"/刀":{"/刀":56},"/足":{"/足球":57},"/瓢":{"/瓢虫":117,"/瓢蟲":117},"/便":{"/便便":59},"/月":{"/月亮":75},"/太":{"/太阳":74,"/太陽":74},"/礼":{"/礼物":69},"/拥":{"/拥抱":49},"/强":{"/强":76},"/弱":{"/弱":77},"/握":{"/握手":78},"/胜":{"/胜利":79},"/抱":{"/抱拳":118},"/勾":{"/勾引":119},"/拳":{"/拳头":120,"/拳頭":120},"/差":{"/差劲":121,"/差勁":121},"/N":{"/NO":123},"/O":{"/OK":124},"/飞":{"/飞吻":85},"/跳":{"/跳跳":43,"/跳绳":128,"/跳繩":128},"/怄":{"/怄火":86},"/转":{"/转圈":125},"/磕":{"/磕头":126,"/磕頭":126},"/回":{"/回头":127,"/回頭":127},"/挥":{"/挥手":129},"/激":{"/激动":130,"/激動":130},"/街":{"/街舞":131},"/献":{"/献吻":132},"/發":{"/發呆":3,"/發怒":11,"/發抖":41},"/閉":{"/閉嘴":7},"/尷":{"/尷尬":10},"/調":{"/調皮":12},"/驚":{"/驚訝":0,"/驚恐":26},"/難":{"/難過":15},"/饑":{"/饑餓":24},"/奮":{"/奮鬥":30},"/噓":{"/噓...":33},"/暈":{"/暈":34},"/摳":{"/摳鼻":98},"/壞":{"/壞笑":101},"/陰":{"/陰險":108},"/親":{"/親親":109},"/嚇":{"/嚇":110},"/籃":{"/籃球":114},"/飯":{"/飯":61},"/豬":{"/豬頭":46},"/雕":{"/雕謝":64},"/愛":{"/愛心":66,"/愛你":122,"/愛情":42},"/閃":{"/閃電":54},"/禮":{"/禮物":69},"/擁":{"/擁抱":49},"/強":{"/強":76},"/勝":{"/勝利":79},"/飛":{"/飛吻":85},"/慪":{"/慪火":86},"/轉":{"/轉圈":125},"/揮":{"/揮手":129},"/獻":{"/獻吻":132}}
        //SHORTCUT_2_FACE: {"/微":{"/微笑":14},"/撇":{"/撇嘴":1},"/色":{"/色":2},"/发":{"/发呆":3,"/发怒":11,"/发抖":41},"/得":{"/得意":4},"/流":{"/流泪":5,"/流汗":27},"/害":{"/害羞":6},"/闭":{"/闭嘴":7},"/睡":{"/睡":8},"/大":{"/大哭":9,"/大兵":29},"/尴":{"/尴尬":10},"/调":{"/调皮":12},"/呲":{"/呲牙":13},"/惊":{"/惊讶":0,"/惊恐":26},"/难":{"/难过":15},"/酷":{"/酷":16},"/冷":{"/冷汗":96},"/抓":{"/抓狂":18},"/吐":{"/吐":19},"/偷":{"/偷笑":20},"/可":{"/可爱":21,"/可怜":111},"/白":{"/白眼":22},"/傲":{"/傲慢":23},"/饥":{"/饥饿":24},"/困":{"/困":25},"/憨":{"/憨笑":28},"/奋":{"/奋斗":30},"/咒":{"/咒骂":31},"/疑":{"/疑问":32},"/嘘":{"/嘘...":33},"/晕":{"/晕":34},"/折":{"/折磨":35},"/衰":{"/衰":36},"/骷":{"/骷髅":37},"/敲":{"/敲打":38},"/再":{"/再见":39},"/擦":{"/擦汗":97},"/抠":{"/抠鼻":98},"/鼓":{"/鼓掌":99},"/糗":{"/糗大了":100},"/坏":{"/坏笑":101},"/左":{"/左哼哼":102,"/左太极":133},"/右":{"/右哼哼":103,"/右太极":134},"/哈":{"/哈欠":104},"/鄙":{"/鄙视":105},"/委":{"/委屈":106},"/快":{"/快哭了":107},"/阴":{"/阴险":108},"/亲":{"/亲亲":109},"/吓":{"/吓":110},"/菜":{"/菜刀":112},"/西":{"/西瓜":89},"/啤":{"/啤酒":113},"/篮":{"/篮球":114},"/乒":{"/乒乓":115},"/咖":{"/咖啡":60},"/饭":{"/饭":61},"/猪":{"/猪头":46},"/玫":{"/玫瑰":63},"/凋":{"/凋谢":64},"/示":{"/示爱":116},"/爱":{"/爱心":66,"/爱你":122,"/爱情":42},"/心":{"/心碎":67},"/蛋":{"/蛋糕":53},"/闪":{"/闪电":54},"/炸":{"/炸弹":55},"/刀":{"/刀":56},"/足":{"/足球":57},"/瓢":{"/瓢虫":117},"/便":{"/便便":59},"/月":{"/月亮":75},"/太":{"/太阳":74},"/礼":{"/礼物":69},"/拥":{"/拥抱":49},"/强":{"/强":76},"/弱":{"/弱":77},"/握":{"/握手":78},"/胜":{"/胜利":79},"/抱":{"/抱拳":118},"/勾":{"/勾引":119},"/拳":{"/拳头":120},"/差":{"/差劲":121},"/N":{"/NO":123},"/O":{"/OK":124},"/飞":{"/飞吻":85},"/跳":{"/跳跳":43,"/跳绳":128},"/怄":{"/怄火":86},"/转":{"/转圈":125},"/磕":{"/磕头":126},"/回":{"/回头":127},"/挥":{"/挥手":129},"/激":{"/激动":130},"/街":{"/街舞":131},"/献":{"/献吻":132}}

    };
    if(typeof MILang!="undefined" && MILang=='zh_TW') {
    	webq.CONST.FACE_2_SHORTCUT= ["/微笑","/撇嘴","/色","/發呆","/得意","/流淚","/害羞","/閉嘴","/睡","/大哭","/尷尬","/發怒","/調皮","/呲牙","/驚訝","/難過","/酷","/冷汗","/抓狂","/吐","/偷笑","/可愛","/白眼","/傲慢","/饑餓","/困","/驚恐","/流汗","/憨笑","/大兵","/奮鬥","/咒罵","/疑問","/噓...","/暈","/折磨","/衰","/骷髏","/敲打","/再見","/擦汗","/摳鼻","/鼓掌","/糗大了","/壞笑","/左哼哼","/右哼哼","/哈欠","/鄙視","/委屈","/快哭了","/陰險","/親親","/嚇","/可憐","/菜刀","/西瓜","/啤酒","/籃球","/乒乓","/咖啡","/飯","/豬頭","/玫瑰","/雕謝","/示愛","/愛心","/心碎","/蛋糕","/閃電","/炸彈","/刀","/足球","/瓢蟲","/便便","/月亮","/太陽","/禮物","/擁抱","/強","/弱","/握手","/勝利","/抱拳","/勾引","/拳頭","/差勁","/愛你","/NO","/OK","/愛情","/飛吻","/跳跳","/發抖","/慪火","/轉圈","/磕頭","/回頭","/跳繩","/揮手","/激動","/街舞","/獻吻","/左太極","/右太極"];
    	//webq.CONST.SHORTCUT_2_FACE= {"/微":{"/微笑":14},"/撇":{"/撇嘴":1},"/色":{"/色":2},"/發":{"/發呆":3,"/發怒":11,"/發抖":41},"/得":{"/得意":4},"/流":{"/流淚":5,"/流汗":27},"/害":{"/害羞":6},"/閉":{"/閉嘴":7},"/睡":{"/睡":8},"/大":{"/大哭":9,"/大兵":29},"/尷":{"/尷尬":10},"/調":{"/調皮":12},"/呲":{"/呲牙":13},"/驚":{"/驚訝":0,"/驚恐":26},"/難":{"/難過":15},"/酷":{"/酷":16},"/冷":{"/冷汗":96},"/抓":{"/抓狂":18},"/吐":{"/吐":19},"/偷":{"/偷笑":20},"/可":{"/可愛":21,"/可憐":111},"/白":{"/白眼":22},"/傲":{"/傲慢":23},"/饑":{"/饑餓":24},"/困":{"/困":25},"/憨":{"/憨笑":28},"/奮":{"/奮鬥":30},"/咒":{"/咒罵":31},"/疑":{"/疑問":32},"/噓":{"/噓...":33},"/暈":{"/暈":34},"/折":{"/折磨":35},"/衰":{"/衰":36},"/骷":{"/骷髏":37},"/敲":{"/敲打":38},"/再":{"/再見":39},"/擦":{"/擦汗":97},"/摳":{"/摳鼻":98},"/鼓":{"/鼓掌":99},"/糗":{"/糗大了":100},"/壞":{"/壞笑":101},"/左":{"/左哼哼":102,"/左太極":133},"/右":{"/右哼哼":103,"/右太極":134},"/哈":{"/哈欠":104},"/鄙":{"/鄙視":105},"/委":{"/委屈":106},"/快":{"/快哭了":107},"/陰":{"/陰險":108},"/親":{"/親親":109},"/嚇":{"/嚇":110},"/菜":{"/菜刀":112},"/西":{"/西瓜":89},"/啤":{"/啤酒":113},"/籃":{"/籃球":114},"/乒":{"/乒乓":115},"/咖":{"/咖啡":60},"/飯":{"/飯":61},"/豬":{"/豬頭":46},"/玫":{"/玫瑰":63},"/雕":{"/雕謝":64},"/示":{"/示愛":116},"/愛":{"/愛心":66,"/愛你":122,"/愛情":42},"/心":{"/心碎":67},"/蛋":{"/蛋糕":53},"/閃":{"/閃電":54},"/炸":{"/炸彈":55},"/刀":{"/刀":56},"/足":{"/足球":57},"/瓢":{"/瓢蟲":117},"/便":{"/便便":59},"/月":{"/月亮":75},"/太":{"/太陽":74},"/禮":{"/禮物":69},"/擁":{"/擁抱":49},"/強":{"/強":76},"/弱":{"/弱":77},"/握":{"/握手":78},"/勝":{"/勝利":79},"/抱":{"/抱拳":118},"/勾":{"/勾引":119},"/拳":{"/拳頭":120},"/差":{"/差勁":121},"/N":{"/NO":123},"/O":{"/OK":124},"/飛":{"/飛吻":85},"/跳":{"/跳跳":43,"/跳繩":128},"/慪":{"/慪火":86},"/轉":{"/轉圈":125},"/磕":{"/磕頭":126},"/回":{"/回頭":127},"/揮":{"/揮手":129},"/激":{"/激動":130},"/街":{"/街舞":131},"/獻":{"/獻吻":132}};
    }
    //var reg= /\/[\u4e00-\u9fa5]/
    /**
    webq.hash = {
        onlineStatus:{
            callme:"Q我吧",
            online:"在线",
            away:"离开",
            busy:"忙碌",
            silent:"静音",
            offline:"离线"
        },
        onlineStatusText:{
            callme:"Q我吧",
            online:"在线",
            away:"离开",
            busy:"忙碌",
            silent:"静音",
            offline:"离线"
        }
    };
    **/
    for(var i=0;i<105;i++){
            faceHtml.push('<div class="EQQ_qqfaces" title="'+webq.CONST.FACE_2_SHORTCUT[i]+'" id="EQQ_qqface_'+i+'" ></div>');
    }
    faceHtml= faceHtml.join("");
    var html= '\
            <div style="display:none;" class="EQQ_faceSelection" id="EQQ_FaceSelection" style="display:none">\
                '+faceHtml+'\
            </div>\
            <div id="EQQ_MainPanel" class="EQQ_mainPanel">\
                <div class="EQQ_title">\
                    <div style="display:none;" id="EQQ_CloseButton" class="EQQ_CloseButton" title="'+_("隐藏好友列表")+'">'+_("最小化")+'</div>\
                    <a href="#"><div id="EQQ_MinButton" class="EQQ_MinButton" title="'+_("最小化")+'">'+_("最小化")+'</div></a>\
                    <a class="EQQ_FeedbackButton2" href="http://support.qq.com/portal/discuss_pdt/420_1.html" target="_blank">'+_("反馈")+'</a>\
                    <ul id="EQQ_SettingPanel" class="EQQ_SettingPanel" style="display:none;">\
						<a href="#" onclick="return false;">\
						<li flag="online" class="EQQ_SettingPanel_item" style="margin-top:6px;">\
                            <div class="EQQ_setIcon EQQ_setOnlineIcon">icon</div>\
                            <div class="EQQ_SettingPanel_Text">'+_("在线")+'</div>\
                        </li>\
						</a>\
						<a href="#" onclick="return false;">\
                        <li title="'+_("断开服务器连接")+'" flag="offline" class="EQQ_SettingPanel_item">\
                            <div class="EQQ_setIcon EQQ_setOfflineIcon">icon</div>\
                            <div class="EQQ_SettingPanel_Text">'+_("离线")+'</div>\
                        </li>\
						</a>\
						<a href="#" onclick="return false;">\
                        <li title="'+_("不接受实时聊天消息")+'" flag="lock" class="EQQ_SettingPanel_item">\
                            <div class="EQQ_setIcon EQQ_setLockIcon">icon</div>\
                            <div class="EQQ_SettingPanel_Text">'+_("禁用")+'</div>\
                        </li>\
						</a>\
                    </ul>\
					<a href="#" onclick="return false;">\
	                    <div id="EQQ_SettingButton" class="EQQ_settingButton" title="'+_("设置")+'">\
	                        <div class="EQQ_settingButtonIcon">'+_("下")+'</div>\
	                        <div id="EQQ_settingButtonText" class="EQQ_settingButtonText">'+_("设置")+'</div>\
	                    </div>\
					</a>\
                    <div class="EQQ_titleText">'+_("在线互听")+'<span id="EQQ_onlineCount">(0)</span></div>\
                    <div class="EQQ_betaText" title="1.0.10.12"></div>\
                </div>\
                <div style="display:none;" id="EQQ_MyPanel" class="EQQ_myPanel">\
                    <div class="EQQ_myInfo">\
                        <div id="EQQ_MyState" class="EQQ_myState" title="'+_("我的状态")+'">\
                            <div id="EQQ_MyStateShow" class="EQQ_myStateShow EQQ_offline">'+_("状态")+'</div>\
                            <div class="EQQ_myStateDown">'+_("下")+'</div>\
                        </div>\
                        <div id="EQQ_MyNick" class="EQQ_myNick" title="'+_("昵称")+'">'+_("昵称")+'</div>\
                        <ul id="EQQ_StateSelectPanel" class="EQQ_stateSelectPanel">\
                            <li id="EQQ_SetOnline" state="online"><div class="EQQ_stateSelect_icon EQQ_online"></div><div class="EQQ_stateSelect_text">'+_("我在线上")+'</div></li>\
                            <li id="EQQ_SetCallme" state="callme"><div class="EQQ_stateSelect_icon EQQ_callme"></div><div class="EQQ_stateSelect_text">Q'+_("我吧")+'</div></li>\
                            <li id="EQQ_SetAway" state="away"><div class="EQQ_stateSelect_icon EQQ_away"></div><div class="EQQ_stateSelect_text">'+_("离开")+'</div></li>\
                            <li id="EQQ_SetBusy" state="busy"><div class="EQQ_stateSelect_icon EQQ_busy"></div><div class="EQQ_stateSelect_text">'+_("忙碌")+'</div></li>\
                            <li id="EQQ_SetSilent" state="silent"><div class="EQQ_stateSelect_icon EQQ_silent"></div><div class="EQQ_stateSelect_text">'+_("请勿打扰")+'</div></li>\
                            <li id="EQQ_SetHidden" state="hidden"><div class="EQQ_stateSelect_icon EQQ_hidden"></div><div class="EQQ_stateSelect_text">'+_("隐身")+'</div></li>\
                            <li id="EQQ_SetOffline" state="offline"><div class="EQQ_stateSelect_icon EQQ_offline"></div><div class="EQQ_stateSelect_text">'+_("离线")+'</div></li>\
                        </ul>\
                    </div>\
                    <div id="EQQ_MySignature" class="EQQ_mySignature" title="'+_("载入中")+'...">'+_("载入中")+'...</div>\
                </div>\
                <div id="EQQ_YellowTips" class="EQQ_YellowTips">\
                    <div id="EQQ_YellowTips_CloseButton" class="EQQ_YellowTips_CloseButton" title="'+_("关闭提示")+'">X</div>\
                    <a class="EQQ_YellowTips_Link" href="http://survey.qq.com/cgi-bin/submitsurvey?id=2473&qpage=1&page=1&rm=dnN4k1bBG" target="_blank">'+_("邀请参与")+'WebQQ'+_("用户调查")+'</a>\
                </div>\
                <div id="EQQ_SearchBar" class="EQQ_SearchBar">\
                    <input id="EQQ_SearchBox" class="EQQ_SearchBox" name="" type="text" value="'+_("输入微博帐号")+'..." title="'+_("直接输入微博帐号")+'..." />\
                    <div id="EQQ_SearchButton" class="EQQ_SearchButton" title="'+_("回车打开会话窗口")+'">'+_("搜索按钮")+'</div>\
                </div>\
                <div id="EQQ_SearchResultPanel" class="EQQ_SearchResultPanel">\
                    <div class="EQQ_SearchResultItem" title="">Kevity1(666666)</div>\
                    <div class="EQQ_SearchResultItemHover" title="">Kevity2(666666)</div>\
                    <div class="EQQ_SearchResultItem" title="">Kevity3(66666)</div>\
                </div>\
                <div id="EQQ_Logining" class="EQQ_Logining">'+_("登录中")+'...</div>\
                <div id="EQQ_ReLoginPanel" class="EQQ_ReLoginPanel">\
            '+_("登录失败")+'，<span id="EQQ_ReLoginButton" class="EQQ_ReLoginButton">'+_("重试")+'</span>\
                </div>\
                <!--\
                <div id="EQQ_VerifyPanel" class="EQQ_VerifyPanel">\
                    <div id="EQQ_VerifyText" class="EQQ_VerifyText">'+_("请输入验证码")+'</div>\
                    <div id="EQQ_VerifyTip" class="EQQ_VerifyTip">'+_("输入验证码有误")+','+_("请重试")+'</div><input type="text" id="EQQ_VerifyInput" class="EQQ_VerifyInput" maxlength=4 />\
                    <img id="EQQ_VerifyImg" class="EQQ_VerifyImg" src="http://imgcache.qq.com/ac/b.gif" />\
                    <a id="EQQ_VerifyChange" class="EQQ_VerifyChange" href="#">'+_("换一张")+'</a>\
                    <div id="EQQ_VerifySummit" class="EQQ_VerifySummit"></div>\
                </div>\
                -->\
                <div style="display:none;" id="EQQ_BuddyList" class="EQQ_buddyList">\
					<div id="EQQ_listClassHead_0" class="EQQ_listClassHeadCollapsed" classIndex="0">\
						<div class="EQQ_listClassHeadIcon">icon</div>\
						<div class="EQQ_ClassList_RightContainer" title="">\
							&nbsp;[<span id="EQQ_Class_0_OnlineCounter"></span>/<span id="EQQ_Class_0_Counter"></span>]\
						</div>\
					</div>\
					<div id="EQQ_listClassBody_0" class="EQQ_listClassBody">\
						<div id="EQQ_Class_0_callme" class="EQQ_callmeBuddy"></div>\
						<div style="display:block;" id="EQQ_Class_0_online" class="EQQ_onlineBuddy"></div>\
						<div id="EQQ_Class_0_busy" class="EQQ_busyBuddy"></div>\
						<div id="EQQ_Class_0_away" class="EQQ_awayBuddy"></div>\
						<div id="EQQ_Class_0_silent" class="EQQ_silentBuddy"></div>\
						<div id="EQQ_Class_0_offline" class="EQQ_offlineBuddy"></div>\
					</div>\
                </div>\
            </div>\
            <!--\
            <div id="EQQ_MsgBox" class="EQQ_msgBox">\
                <div class="EQQ_titleInMsgBox">\
                    <div class="EQQ_titleTextInMsgBox">'+_("消息盒子")+'</div>\
                    <div id="EQQ_ViewMainPanelButtonInMsgBox" class="EQQ_viewMainPanelButtonInMsgBox" title="'+_("点击查看好友列表")+'">'+_("好友列表")+'</div>\
                </div>\
                <div id="EQQ_MessageList" class="EQQ_messageList">\
                </div>\
                <div id="EQQ_IgnoreAllMsgButtonInMsgBox" class="EQQ_ignoreAllMsgButtonInMsgBox" title="'+_("点击忽略全部消息")+'">'+_("忽略全部")+'</div>\
            </div>\
            <div id="EQQ_LoginBox" class="EQQ_LoginBox">\
                <div class="EQQ_LoginBox_Title">\
                    <div id="EQQ_LoginBox_CloseButton" class="EQQ_LoginBox_CloseButton" title="'+_("关闭")+'">X</div>\
                    <div class="EQQ_LoginBox_TitleText">WebQQ'+_("登录保护")+'</div>\
                </div>\
            </div>\
            -->\
    ';
    
    var globalYellowTipsView= $V.extend({
        target: "EQQ_Container",
        container: ["div",{"class":"EQQ_global_yellowTips"}],
        template: '\
        <div style="width:<%=Math.floor(text.length*14.5)+8%>px" class="EQQ_global_yellowTips_content">\
            <div class="EQQ_global_yellowTips_content_left"></div>\
            <div style="width:<%=Math.floor(text.length*14.5)%>px" class="EQQ_global_yellowTips_content_middle">\
                <div class="EQQ_global_yellowTips_content_middle_text">\
                    <%=text%>\
                </div>\
                <div class="EQQ_global_yellowTips_content_middle_close">\
                </div>\
            </div>\
            <div class="EQQ_global_yellowTips_content_right"></div>\
        </div>\
        <div class="EQQ_global_yellowTips_arrow">^</div>\
        ',
        events: {
        	".EQQ_global_yellowTips_content_middle_close click": function(e,_this) {
        		_this.trigger("puke",_this.getId());
        	}
        },
        resetPosition: function(dom) {
            var clientWidth= $D.getClientWidth();
            var clientHeight= $D.getClientHeight();
            var clientXY= $D.getClientXY(dom);
    		var clientX= clientXY[0];
    		var clientY= clientXY[1];
    		var r= clientWidth - (clientX + parseInt(this.id("EQQ_Container").style.right) + 25);
    		var b= clientHeight - clientY;
    		this.el.style["right"]= r -Math.floor(this._data.text.length*14.5)+ 25 + "px";
			this.el.style["bottom"]= b + 3 + "px";
		},
		delayClose: function(t) {
			var _this= this;
			setTimeout(function(){
				try {
				_this.trigger("puke",_this.getId());
				}catch(e) {
					
				}
			},t*1000);
		}
    });
    var globalYellowTipsModel= $M.extend({
    });
    var globalYellowTipsCollection= $CL.extend({
        model: globalYellowTipsModel,
        key: "type"
    });
    var globalYellowTipsController= $C.extend({
    	collection: globalYellowTipsCollection,
        view: globalYellowTipsView,
        viewObserver: {
        	"puke": function(id,_this) {
        		_this.puke(id);
        	}
        }
    });
    var yellowTips= (new  globalYellowTipsController({}));
    //yellowTips.bite({type:"pollovermax",text:_("登录失效请刷新页面")})
    
    
    
    
    var searchResultViewClass= $V.extend({
    	target: "EQQ_SearchResultPanel",
    	template: '\
			<% for(var i=0;i<results.length;i++) {%>\
				<div flag="<%=results[i].id%>" class="EQQ_SearchResultItem" title=""><%=results[i].htmlNick%>(<%=results[i].id%>)</div>\
			<% } %>\
		',
		events: {
			".EQQ_SearchResultItem click" :function(e,_this) {
				var id= e.target.getAttribute("flag");
				var item= webq.module.buddyList.collection.find(id);
    		    webq.module.taskBar.chat(item);
    		    webq.module.chatBox.chat(item);
			}
		},
		arrowDown: function(bool) {
			if(!this.isHide) {
				if(!this.pointer) {
					var divs= $D.getElementsByClassName(this.el,"div","EQQ_SearchResultItem");
					this.pointer= [divs,0,divs.length];
				}else {
					this.pointer[0][this.pointer[1]].className= "EQQ_SearchResultItem"
					if(!bool) {
						this.pointer[1]++;
					}else {
						this.pointer[1]--;
					}
					this.pointer[1]= (this.pointer[1]+this.pointer[2])%this.pointer[2];
				}
				this.pointer[0][this.pointer[1]].className= "EQQ_SearchResultItemHover"
			}
		},
		arrowUp: function() {
			this.arrowDown(true);
		},
		hide: function() {
			this.isHide= true;
			$D.hide(this.el);
			this.pointer= null;
		},
		show: function() {
			this.isHide= false;
			this.pointer= null;
			$D.show(this.el);
		}
    });
    //搜索浮层
    var autoCmt;
    var container= $V.extend({
    	target: "EQQ_Container",
    	events: {
    		"#EQQ_ExtendButton,#EQQ_ExtendButton>.EQQ_extendButton_bg click": function(e,_this) {
	    		if(_this.isTaskBarRightExtend()) {
	    		    _this.hideTaskBar();
	    		}else if(_this.isTaskBarLeftExtend()) {
	    		    _this.showTaskBar();
	    		}
    		},
    		"!.faceButtonInChatbox click": function(e,_this) {
    			ammo.hideFacePanel();
    		},
    		"@ @click": function(e,_this) {
    			e.stopPropagation();
                if(autoCmt) {
                    autoCmt.hide();
                }
                _this.hideSettingPanel();
                toggleSettingPanel.reset();
    		}
    	},
    	hideTaskBar: function() {
            if(this.isTaskBarRightExtend()) {
            	var dom= this.id("EQQ_ExtendButton");
                dom.className="EQQ_leftExtendButton"
                this.taskBarWidth= parseInt(this.id("EQQ_TaskBar").style.width);
                this.id("EQQ_TaskBar").style.width= "17px";
                $D.hide(this.id("EQQ_ChatBuddyList"));
            }
    	},
    	showTaskBar: function() {
            if(this.isTaskBarLeftExtend()) {
            	var dom= this.id("EQQ_ExtendButton");
                dom.className="EQQ_rightExtendButton";
                $D.show(this.id("EQQ_ChatBuddyList"));
                this.id("EQQ_TaskBar").style.width= this.taskBarWidth+"px";
                this.unflashTaskBar();
            }
    	},
    	TASKWIDTH: 35,
    	taskAdd: function() {
    		var _w= this.TASKWIDTH;
            if(this.id("EQQ_ExtendButton").className=="EQQ_noExtendButton") {
                var taskbarWith= (2+15)+_w;
                var buddyWith= 0+_w;
            }else if(this.isTaskBarLeftExtend()) {
            	var taskbarWith= this.taskBarWidth= this.taskBarWidth + _w;
                var buddyWith= parseInt(this.id("EQQ_ChatBuddyList").style.width||0)+_w;
            }else{
                var taskbarWith= parseInt(this.id("EQQ_TaskBar").style.width||2+15)+_w;
                var buddyWith= parseInt(this.id("EQQ_ChatBuddyList").style.width||0)+_w;
            }
            this.id("EQQ_ExtendButton").className= "EQQ_rightExtendButton";
            this.id("EQQ_TaskBar").style.width= taskbarWith+"px";
            this.id("EQQ_ChatBuddyList").style.width= buddyWith+"px";
            $D.show(this.id("EQQ_ChatBuddyList"));
    	},
    	taskRemove: function() {
    		var _w= this.TASKWIDTH;
    		if(this.isTaskBarLeftExtend()) {
    			this.taskBarWidth= this.taskBarWidth - _w;
    			var buddyWith= parseInt(this.id("EQQ_ChatBuddyList").style.width||0)-_w;
    			this.id("EQQ_ChatBuddyList").style.width= buddyWith+"px";
    			if(this.taskBarWidth==17) {
    				this.id("EQQ_ExtendButton").className= "EQQ_noExtendButton";
                    this.id("EQQ_TaskBar").style.width= "2px";
    			}
    		}else {
	    		var taskbarWith= parseInt(this.id("EQQ_TaskBar").style.width||2+15)-_w;
	            var buddyWith= parseInt(this.id("EQQ_ChatBuddyList").style.width||0)-_w;
	            if(taskbarWith==17) {
	                this.id("EQQ_ExtendButton").className= "EQQ_noExtendButton";
	                this.id("EQQ_TaskBar").style.width= "2px";
	            }else {
	                this.id("EQQ_TaskBar").style.width= taskbarWith+"px";
	            }
	            this.id("EQQ_ChatBuddyList").style.width= buddyWith+"px";
    		}
    	},
    	flashMainBar: function() {
    		if(!ammo.isMainPanelShow) {
	    		var el= this.id("EQQ_StartButtonIcon");
	    		this.unflashMainBar();
	    		$D.addClass(el,"EQQ_startButtonIconRadio");
	    		this.isMainBarFlashing= new $F.fx(4,$F.toggle(function() {
			        $D.addClass(el,"EQQ_startButtonIconFlash");
		        },function(){
			        $D.removeClass(el,"EQQ_startButtonIconFlash");
		    	},true));
    		}
    	},
    	unflashMainBar: function() {
    		if(this.isMainBarFlashing) {
    			var el= this.id("EQQ_StartButtonIcon");
    			$D.removeClass(el,"EQQ_startButtonIconRadio");
    			this.isMainBarFlashing.stop();
    			this.isMainBarFlashing= null;
    		}
    	},
    	flashTaskBar: function() {
    		if(this.isTaskBarLeftExtend()) {
	    		var el= this.id("EQQ_ExtendButton");
	    		this.unflashTaskBar();
	    		this.isTaskBarFlashing= new $F.fx(4,$F.toggle(function() {
			        $D.addClass(el,"EQQ_flashExtendButton");
		        },function(){
			        $D.removeClass(el,"EQQ_flashExtendButton");
		    	},true));
    		}
    	},
    	unflashTaskBar: function() {
    		if(this.isTaskBarFlashing) {
    			this.isTaskBarFlashing.stop();
    			this.isTaskBarFlashing= null;
    		}
    	},
    	isTaskBarLeftExtend: function() {
    		return $D.hasClass(this.id("EQQ_ExtendButton"),"EQQ_leftExtendButton");
    	},
    	isTaskBarRightExtend: function() {
    		return $D.hasClass(this.id("EQQ_ExtendButton"),"EQQ_rightExtendButton");
    	},
    	showSettingPanel: function() {
    		this.id("EQQ_SettingButton").className= "EQQ_settingButton_buttonDown";
    		$D.show(this.id("EQQ_SettingPanel"));
    	},
    	hideSettingPanel: function() {
    		this.id("EQQ_SettingButton").className= "EQQ_settingButton";
    		$D.hide(this.id("EQQ_SettingPanel"));
    	}
    });
    container= new container();
    container.render();
    
    var toggle= $F.toggle(function() {
            ammo.show();
            container.unflashMainBar();
            $D.addClass(EQQ_StartButton,"EQQ_startButtonDown");
            MI.WebQQ.report2m(151290);
        },function(){
            ammo.hide();
            $D.removeClass(EQQ_StartButton,"EQQ_startButtonDown");
    });
    var toggleSettingPanel= $F.toggle(function() {
            container.showSettingPanel();
        },function(){
            container.hideSettingPanel();
    },true);
    var AmmoClass= $V.extend({
        target: "EQQ_Container",
        container: ["div"],
        html: html,
        afterRender: function() {
        var _this = this;
            if(MI.AutoCmt) {
                autoCmt = new MI.AutoCmt({
                    target : _this.id("EQQ_SearchBox"),
                    key : 0,
                    tips : '输入微博帐号，发起聊天',
                    topic : 1,
                    maxWidth: 159,
                    face : 1,
                    call : function(E){
                        E.stop();
                        var input = _this.id("EQQ_SearchBox"),
                            id = input.value;
                        input.blur();
                        setTimeout(function(){
                            var item= webq.module.buddyList.collection.find(id);
                            if(item) {
                                webq.module.taskBar.chat(item);
                                webq.module.chatBox.chat(item);
                            }else {
                                _this.remoteAtChat();
                            }
                        },0);
                    }
                });
                UI.EA(window,'scroll',function(){
                    autoCmt.hide();
                });
            }
        },
        observers: {
        	"search": function(e,_this) {
        		var v= _this.id("EQQ_SearchBox").value;
        		v= v.split("@").join("");
        		if(v!="") {
        			var results= webq.module.buddyList.collection.filter({nick:v,id:v});
        			if(results.length) {
	        			var searchResultView;
	        			if(searchResultView= _this.searchResultView) {
	        				_this.searchResultView.update({results: results.slice(0,5)});
	        				searchResultView.show();
	        			}else {
	        				searchResultView= _this.searchResultView= new searchResultViewClass({results: results.slice(0,5)});
		        			searchResultView.render();
		        			searchResultView.show();
	        			}
	        			_this.searchKeyWord= null;
        			}
        			//<div class="EQQ_SearchResultItem" title="">Kevity1(666666)</div>\
        		}
        		_this.id("EQQ_SearchBox").focus();
        	}
        },
        events: {
        	".EQQ_SearchButton click": function(e,_this) {
        		/*
        		_this.remoteAtChat();
        		*/
        	},
        	".EQQ_SearchBox keyup": function(e,_this) {
        		/*
        		if(e.keyCode==13) {
        			if(_this.id("EQQ_SearchBox").value=="") {
		        		if(_this.searchResultView) {
		        			_this.searchResultView.hide();
		        		}
        				return;
        			}
        			if(_this.searchResultView&&_this.searchResultView.pointer
        				&&(!_this.searchKeyWord||_this.searchKeyWord==_this.id("EQQ_SearchBox").value)) {
	        			_this.searchKeyWord= _this.id("EQQ_SearchBox").value;
	        			var p=_this.searchResultView.pointer;
	        			var id= (p[0][p[1]].getAttribute("flag"));
						var item= webq.module.buddyList.collection.find(id);
		    		    webq.module.taskBar.chat(item);
		    		    webq.module.chatBox.chat(item);
        			}else {
	        			_this.remoteAtChat();
        			}
        		}else if(e.keyCode==40) { //down
        			_this.searchResultView.arrowDown();
        		}else if(e.keyCode==38) { //up
        			_this.searchResultView.arrowUp();
        		}else {
        			_this.observers["search"](e,_this);
        		}
        		*/
        	},
        	"!.faceButtonInChatbox click": function(e,_this) {
                ammo.hideFacePanel();
            },
        	"#EQQ_SearchBox click": function(e) {
        		
        		if(e.target.value==_("输入微博帐号")+"...") {
        			e.target.value= "";
        			e.target.style.color= "black";
        		}
        		
        	},
        	"#EQQ_SearchBox blur": function(e,_this) {//very careful with this, not using event delegated
        		
        		if(e.target.value=="") {
        			e.target.value= _("输入微博帐号...");
        			e.target.style.color= "#999";
        		}
        		setTimeout(function(){
        			if(_this.searchResultView) {
        				if(!_this.searchResultView.isHide) {
        					_this.searchResultView.hide();
        				}
        			}
        		},2000);
        		
        	},
            ".EQQ_qqfaces click": function(e,_this) {
                webq.module.chatBox.appendFace(e.target.title);
                _this.hideFacePanel();
            },
    		".EQQ_settingButton,.EQQ_settingButtonIcon,#EQQ_settingButtonText click": function(e,_this) {
    			e.preventDefault();
    			toggleSettingPanel();
    		},
    		"!.EQQ_settingButton,.EQQ_settingButtonIcon,#EQQ_settingButtonText click": function(e,_this) {
                e.preventDefault();
                container.hideSettingPanel();
                toggleSettingPanel.reset();
            },
            ".~EQQ_SettingPanel_item,.~EQQ_setIcon,.EQQ_SettingPanel_Text click": function(e,_this) {
            	var dom= $D.findPapa()(e.target,"EQQ_SettingPanel_item");
            	var items= $D.getElementsByClassName(_this.id("EQQ_SettingPanel"),"li","EQQ_SettingPanel_item");
            	for(var len=items.length-1;len>=0;len--) {
            		$D.removeClass(items[len],"EQQ_CurrentMode")
            	}
            	$D.addClass(dom,"EQQ_CurrentMode");
            	toggleSettingPanel.reset();
            	switch(dom.getAttribute("flag")) {
            		case "offline":
				        setNotAutoLogin();
						setOffline(function(){
                            _this.id("EQQ_settingButtonText").className= "EQQ_settingButtonText_offline";
                            _this.id("EQQ_StartButtonIcon").className= "EQQ_startButtonIconOffline";
                        });
            			break;
            		case "online":
            			unlock(function(){
                            _this.id("EQQ_settingButtonText").className= "EQQ_settingButtonText_online";
                            _this.id("EQQ_StartButtonIcon").className= "EQQ_startButtonIconActive";
                        });
            			setAutoLogin();
            			break;
            		case "lock":
                        setNotAutoLogin();
            			lock(function(){
                            _this.id("EQQ_settingButtonText").className= "EQQ_settingButtonText_lock";
                            _this.id("EQQ_StartButtonIcon").className= "EQQ_startButtonIconForbidden";
                        });
            			break;
            		default:
            			
            	}
            	
            },
        	".~EQQ_MinButton click": function(e) {
        		e.preventDefault();
        		toggle();
        	},
            "@ @click": function(e) {
                e.stopPropagation();
                if(autoCmt) {
                    autoCmt.hide();
                }
                //container.hideSettingPanel();
            }
        },
    	show: function() { //reload
    		this.isMainPanelShow= true;
    		$D.show(this.id("EQQ_MainPanel"));
    	},
    	hide: function() { //reload
    		this.isMainPanelShow= false;
    		$D.hide(this.id("EQQ_MainPanel"));
    	},
    	showFacePanel: function(right) {
    		if(!this.isFacePanelShow) {
    			this.id("EQQ_FaceSelection").style.right= right+"px";
                $D.show(this.id("EQQ_FaceSelection"));
                this.isFacePanelShow= true;
    		}else {
    			this.hideFacePanel();
    		}
    	},
    	hideFacePanel: function() {
    		$D.hide(this.id("EQQ_FaceSelection"));
    		this.isFacePanelShow= false;
    	},
    	remoteAtChat: function() {
    		webq.framework.rpcservice.send(webq.CONST.CONN_SERVER_DOMAIN + "channel/get_friend_info",{
                context:this,
                data:{to:this.id("EQQ_SearchBox").value.split("@").join("")},
                onSuccess: function(data){
                    if(data.retcode === 0){
                        webq.module.buddyList.chat(data.result.id,data.result);
                    }else{
                        webq.module.yellowTips.bite({type:"remoteAtChatFail",text:_("未相互收听，无法即时聊天")},{beforeRender:function(el){
		  					this.resetPosition(this.id("EQQ_SearchBox"));
		  					this.delayClose(3);
		                }});
                    }
                },
                onError: function(data) {
                    webq.module.yellowTips.bite({type:"remoteAtChatFail",text:_("未相互收听，无法即时聊天")},{beforeRender:function(el){
	  					this.resetPosition(this.id("EQQ_SearchBox"));
	  					this.delayClose(3);
	                }});
                }
            });
    	}
    });
    
    webq.CONST.index=0;
    var ammo= new AmmoClass(webq.CONST);
    ammo.render();
    ammo.afterRender();

    var EQQ_StartButton= $D.id("EQQ_StartButton");
    var loginLock= true;
    var startUp= function(silent){
    	if(loginLock) {
    		loginLock= false;
            webq.framework.rpcservice.send(webq.CONST.CONN_SERVER_DOMAIN + "channel/login",{
                    context:this,
                    data:{},
                    onSuccess: function(data){
                        if(data.retcode === 0){
                        	//{"retcode":0,"result":{"uin":414912,"id":"webweb","nick":"\u4ECA\u5929\u5929\u6C14\u4E0D\u9519\u633A\u98CE\u548C\u65E5\u4E3D\u7684","avatar":"http://t0.qlogo.cn/mbloghead/88fdc315ca7690c4e53e"}}
                            webq.CONST.myId=  data.result.id;
                            webq.CONST.myNick=  data.result.nick;
                            webq.CONST.uin= data.result.uin;
                            webq.module.buddyList.fetch();
                            $E.off(EQQ_StartButton);
                            $E.on(EQQ_StartButton,"click",toggle);
                            EQQ_StartButton.setAttribute("title","");
                            setAutoLogin();
                            if(!silent) {
                            	toggle();
                            }
                            remoteSetUnLock();
                            current_state= STATE_IS_ALLOW | STATE_IS_LOGIN;
                            if(MI && MI.bannerTips) {
                                MI.bannerTips();
                            }
                        }else{
                            loginLock= true;
                        }
                    },
                    onError: function(data) {
                        loginLock= true;
                    },
                    onTimeout: function() {
                    	loginLock= true;
                    }
            });
    	}
    };
    $E.on(EQQ_StartButton,"click",startUp);
    
    //var EQQ_lock= $D.id("EQQ_lock");
    var hide= function(func) {
    	ammo.hide();
    	toggle.reset();
    	$D.removeClass(EQQ_StartButton,"EQQ_startButtonDown");
    	webq.module.chatBox.hide();
    	//container.hideTaskBar();
    };
    var lock= function(func){
    	//EQQ_lock.className= "EQQ_lock";
    	webq.module.taskBar.clear();
    	webq.module.chatBox.clear();
    	//$E.off(EQQ_StartButton);
		ammo.hide();
		toggle.reset();
	    $D.removeClass(EQQ_StartButton,"EQQ_startButtonDown");
        if(current_state & STATE_IS_ALLOW) {
            remoteSetLock(func);
        }
        if(current_state & STATE_IS_LOGIN) {
            setTimeout(function(){
                remoteSetOffline();
            },0);
        }

    };
    var unlock= function(func){
    	//EQQ_lock.className= "EQQ_unlock";
    	//toggle.reset();
    	//$E.on(EQQ_StartButton,"click",toggle);
        //current_state= STATE_IS_ALLOW | STATE_IS_LOGIN;
        if(!(current_state & STATE_IS_ALLOW)) {
            remoteSetUnLock();
        }
        if(!(current_state & STATE_IS_LOGIN)) {
            setTimeout(function(){
                remoteSetOnline(func);
            },0);
        }
    };
    //登陆标志位
    var isOnline= false;
    //状态标志位
    var STATE_IS_ALLOW= 1,
        STATE_IS_LOGIN= 2;
    //当前状态标志位
    var current_state= 0;
    

    var setOffline= function(func) {
        if(!(current_state & STATE_IS_ALLOW)) {
            remoteSetUnLock(func);
        }
    	if(current_state & STATE_IS_LOGIN) {
            setTimeout(function(){
                remoteSetOffline(func);
            },0);
        }
    };
    var remoteSetOnline= function(func) {
        webq.framework.rpcservice.send(webq.CONST.CONN_SERVER_DOMAIN + "channel/login",{
            context:this,
            data:{},
            onSuccess: function(data){
                if(data.retcode === 0){
                    //{"retcode":0,"result":{"info":{"uin":414912,"id":"webweb","nick":"\u4E00\u7897\u55F1\u55B3\u9762"}}}
                    webq.CONST.msg_id= 0;

                    webq.module.poll.poll();
                    $D.id("EQQ_StartButtonIcon").className= "EQQ_startButtonIconActive";
                    if(func) {
                        func();
                    }
                    
                    current_state= current_state | STATE_IS_LOGIN;
                }
            },
            onError: function(data) {

            }
        });
    };
    var remoteSetOffline= function(func) {
        webq.framework.rpcservice.send(webq.CONST.CONN_SERVER_DOMAIN + "channel/logout",{
            onSuccess: function(data){
                if(data.retcode === 0){
                    webq.module.poll.stopPoll();
                    webq.CONST.msg_id= 0;
                    
                    current_state= current_state ^ STATE_IS_LOGIN;
                    
                    if(func) {
                        setTimeout(func,0);
                    }
                }
            }
        });
    };
    var remoteSetLock= function(func) {
    	if(typeof UI!="undefined" && MI.ajax) {
			MI.ajax({
	           url: MI.url.chatStat,
	           type:'post',
	           data:{v:0},
	           success:function(data){
	               //{result:0,msg:'成功'}
                   //这里居然是个json字面量
	               if(data.indexOf("result:0")>-1) {
	                   if(func) {
                           func();
                       }
                       current_state= current_state ^ STATE_IS_ALLOW;
	               }
	           }
	        })
    	}
        MI.WebQQ.report2m(151295);
    };
    var remoteSetUnLock= function(func) {
    	if(typeof UI!="undefined" && MI.ajax) {
			MI.ajax({
	           url:MI.url.chatStat,
	           type:'post',
	           data:{v:1},
	           success:function(data){
                   if(data.indexOf("result:0")>-1) {
                       if(func) {
                           func();
                       }
                       current_state= current_state | STATE_IS_ALLOW;
                   }
	           }
	        })
    	}
    };
    //$E.on(EQQ_lock,"click", $F.toggle(lock,unlock));
    var DocumentView= $V.extend({
        target: document,
        events: {
        	"!.addAttention,.reply,.chat,.msg,...moreFun,...talkWrap,...DWrap,...tbSendMsg click": function(e,_this) {
        		ammo.hideFacePanel();
                hide();
        	}
        }
    });
    (new DocumentView).render();
    webq.module.container= container;
    webq.module.ammo= ammo;
    //cookie记录自动login标志位
    var setAutoLogin= function() {
    	webq.framework.cookie.set("mb_chat",1,"t.qq.com");
    };
    var setNotAutoLogin= function() {
    	webq.framework.cookie.remove("mb_chat","t.qq.com");
    };
    var getIsAutoLogin= function() {
    	return webq.framework.cookie.get("mb_chat")==1;
    };
    //如果有cookie自动登录标志位 或者 有发起聊天队列 或者在放量范围内
    //if(getIsAutoLogin() || MI.WebQQ.chatQueue.length>0 || (MI.user.medal[0] && MI.user.medal[0]>=3)) {
        setTimeout(function(){
            startUp(true);
        },100);
    //}
    
    webq.module.login= {
    	setOffline: setOffline
    }
    webq.module.yellowTips= yellowTips;
    
    
})();;(function(){
    var q= webq.framework;
    var $R= q.rpcservice= {},
    	$S= q.string;
    document.domain = "qq.com";
    if(typeof window.XMLHttpRequest === "undefined"){
        window.XMLHttpRequest = function(){
            return new window.ActiveXObject(navigator.userAgent.indexOf("MSIE 5") >=0 ? "Microsoft.XMLHTTP" : "Msxml2.XMLHTTP");
        };
    }
    webq.tProxyReady= function() {
    	
    };
    
    
    var clientid= webq.CONST.CLIENTID, 
        proxySender;
    var proxy;
    var ajaxInstance;
    var send;
    var ifIframeLoaded= function(iframe,callback) {
        if (iframe.attachEvent){
            iframe.attachEvent("onload", callback);
        } else {
            iframe.onload = callback;
        }
    };
    var $= function(id) {
        return document.getElementById(id);
    };
    var onFail = function(){
        
    };
    var resetFailCount = function(){
        failCount = 0;
    };

    var ajaxFrameUrlSetted=false;
    var ajaxCallbacks=[];
    
    var proxySend = function(url, option){
        if(proxy){
            startProxySend(url, option);
        }else{
            ajaxCallbacks.push({'url':url,'option':option});
            if(ajaxFrameUrlSetted){
                return;
            }
            ajaxFrameUrlSetted=true;
            var bodyEl=document.body,
                divEl = document.createElement("div");

            var html = '<iframe id="EQQ_ProxySendIframe" class="hiddenIframe" name="EQQ_ProxySendIframe" width="1" height="1" src="about:blank;"></iframe>';
            divEl.innerHTML=html;
            bodyEl.appendChild(divEl);

            var EQQ_ProxySendIframe = $("EQQ_ProxySendIframe");
            var onAjaxFrameLoad=function(){
                var ajaxProxy = window.frames["EQQ_ProxySendIframe"];
                //try{
                proxy = ajaxProxy.ajax;
                //}catch(e){alert(e.message);}
                
                for(var i=0;i<ajaxCallbacks.length;++i){
                    var url=ajaxCallbacks[i].url;
                    var option=ajaxCallbacks[i].option;
                    try{
                        startProxySend(url, option);
                    }catch(e){
                        if(!option.onError){
                            return;
                        }
                        var data = {};
                        data.arguments = option.arguments || {};
                        option.onError.call(option.context, data);
                    }
                }
                
            };
            //ifIframeLoaded(EQQ_ProxySendIframe, onAjaxFrameLoad);
            webq.tProxyReady= onAjaxFrameLoad;
            EQQ_ProxySendIframe.setAttribute("src",webq.CONST.CONN_PROXY_URL);
        }
    };
    var getPollAjaxInstance= function(url,opt) {
    	/*
        if(url.indexOf('channel/poll') != -1) {
            ajaxInstance= proxy(url, opt);
        }else {
            
        }
        */
        proxy(url, opt);
    };
    var startProxySend = function(url, option){
        option = option ||{};
        // 默认不缓存
        option.cacheTime = option.cacheTime || 0;
        option.onSuccess = option.onSuccess || function(){};
        option.onError = option.onError || function(){};
        option.onTimeout = option.onTimeout || function(){};
        option.onComplete = option.onComplete || function(){};
        
        var opt = {
            method: option.method || "GET",
            enctype: option.enctype || "",  //"multipart/form-data",
            data: option.data || {},
            //param: option.param || {},
            arguments: option.arguments || {},
            context: option.context || null,
            timeout: option.timeout,
            
            onSuccess: function(o){
                var data={};
                //在JSON格式出错的情况下添加标记
                var jsonfail=false;
                //防止后台返回200，但内容为空，会导致json解析出错
                o.responseText= o.responseText||"-";
                try {
                    data = q.json.parse(o.responseText);
                }catch(e) {
                    o.responseText= o.responseText+":bad-JSON-format:"
                    jsonfail=true;
                }finally {
                    data.arguments = option.arguments || {};
                    data.o = o;
                    option.onSuccess.call(option.context, data,jsonfail);
                }
            },
            onError: function(o){
                option.onError.call(option.context, o);
            },
            //尚未测试
            onTimeout: function(o){
                var data = {};
                data.arguments = option.arguments || {};
                option.onTimeout.call(option.context, data);
            },
            onComplete: function(o){
                var data = {};
                data.arguments = option.arguments || {};
                option.onComplete.call(option.context, data);
            }

            
        };
        opt.data.clientid = clientid;
        
        /*
        if(loadingIframe) {
            opt.onError();
            return;
        }
        */
        
        //J.out("ClientId: "+clientid);
        
        
        //覆写cookie中的uin、skey等
        //qqweb.portal.recoverCookie();
        
        
        if(opt.method == "GET"){
            var queryString = $S.obj2queryString(opt.data);
            //var queryString = J.json.stringify(opt.data);
            
            if(option.cacheTime === 0){
                if(queryString){
                    queryString += "&t=" + (new Date()).getTime();
                }else{
                    queryString += "t=" + (new Date()).getTime();
                }
            }
            //url = url + "?" + queryString;        // + "&t=" + (new Date()).getTime();
            if(queryString){
                url = url + "?" + queryString;
            }
            opt.data = null;
           
            getPollAjaxInstance(url, opt);
            
        }else{
            opt.contentType = "application/x-www-form-urlencoded";
            //opt.data = J.json.stringify(opt.data);
            //proxy(url+"?t=" + (new Date()).getTime(), opt);
            if( url.indexOf('?') === -1 ){
                getPollAjaxInstance(url, opt);
            }else{
                getPollAjaxInstance(url, opt);
            }
        }
    };
    var ajax = function(uri, options){
        var httpRequest,
            httpSuccess,
            timeout,
            isTimeout = false,
            isComplete = false;
        
        options = {
            method: options.method || "GET",
            data: options.data || null,
            arguments: options.arguments || null,

            onSuccess: options.onSuccess || function(){},
            onError: options.onError || function(){},
            onComplete: options.onComplete || function(){},
            //尚未测试
            onTimeout: options.onTimeout || function(){},

            isAsync: options.isAsync || true,
            timeout: options.timeout ? options.timeout : 10000,
            contentType: options.contentType ? options.contentType : "utf-8",
            type: options.type || "xml"
        };
        uri = uri || "";
        timeout = options.timeout;
        
        
        httpRequest = new window.XMLHttpRequest();
        httpRequest.open(options.method, uri, options.isAsync);
        //设置编码集
        //httpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        httpRequest.setRequestHeader("Content-Type",options.contentType);

        /**
         * @ignore
         */
        httpSuccess = function(r){
            try{
                return (!r.status && location.protocol == "file:")
                    || (r.status>=200 && r.status<300)
                    || (r.status==304)
                    || (navigator.userAgent.indexOf("Safari")>-1 && typeof r.status=="undefined");
            }catch(e){
                //J.out("错误：[" + e.name + "] "+e.message+", " + e.fileName+", 行号:"+e.lineNumber+"; stack:"+typeof e.stack, 2);
            }
            return false;
        }
        

        httpRequest.onreadystatechange=function (){
            if(httpRequest.readyState==4){
                if(!isTimeout){
                    var o={};
                        o.responseText = httpRequest.responseText;
                        o.responseXML = httpRequest.responseXML;
                        o.data= options.data;
                        o.status= httpRequest.status;
                        o.uri=uri;
                        o.arguments=options.arguments;
                        
                    if(httpSuccess(httpRequest)){
                        if(options.type === "script"){
                            eval.call(window, data);
                        }
                        options.onSuccess(o);
                        
                    }else{
                        options.onError(o);
                    }
                    options.onComplete(o);
                }
                isComplete = true;
                //删除对象,防止内存溢出
                httpRequest=null;
            }
        };
        
        httpRequest.send(options.data);
        
        window.setTimeout(function(){
            var o;
            if(!isComplete){
                isTimeout = true;
                o={};
                o.uri=uri;
                o.arguments=options.arguments;
                options.onTimeout(o);
                options.onComplete(o);
            }
        }, timeout);    
        
        return httpRequest;
    };
    var selfSend = function(url, option){
        option = option ||{}; 
        // 默认不缓存
        option.cacheTime = option.cacheTime || 0;
        option.onSuccess = option.onSuccess || function(){};
        option.onError = option.onError || function(){};
        option.onTimeout = option.onTimeout || function(){};
        option.onComplete = option.onComplete || function(){};
        
        var opt = {
            method: option.method || "GET",
            contentType : option.contentType || "",
            enctype: option.enctype || "",    //"multipart/form-data",
//            data: option.data || {},
            param: option.param || {},
            arguments: option.arguments || {},
            context: option.context || null,
            //无跨子域
            timeout: option.timeout || 30000,
            
            onSuccess: function(o){
                var data = q.json.parse((o.responseText));
                data.arguments = option.arguments || {};
                option.onSuccess.call(option.context, data);
            },
            onError: function(o){
                option.onError.call(option.context, o);
            },
            //尚未测试
            onTimeout: function(o){
                var data = {};
                data.arguments = option.arguments || {};
                option.onTimeout.call(option.context, data);
            },
            onComplete: function(o){
                var data = {};
                data.arguments = option.arguments || {};
                option.onComplete.call(option.context, data);
            }

            
        };
        
        //区分客户端
        //opt.data.clientid = clientid;
        //覆写cookie中的uin、skey等
        //qqweb.portal.recoverCookie();

        if(opt.method == "GET"){
            opt.data = option.data || {};
            var queryString = q.string.Obj2QueryString(opt.data);
            if(option.cacheTime === 0){
                if(queryString){
                    queryString += "&t=" + (new Date()).getTime();
                }else{
                    queryString += "t=" + (new Date()).getTime();
                }
            }
            if(queryString){
                url = url + "?" + queryString;
            }
            opt.data = null;
            ajax(url, opt);
        }else{
            opt.data = option.data || '';
            opt.contentType = "application/x-www-form-urlencoded";
            if( url.indexOf('?') === -1 ){
                ajax(url, opt);
            }else{
                ajax(url, opt);
            }
        }
        

    };
    /**
     * 加载模块
     * @param {Array} args 等待加载的模块函数
     * @param {Function} func 等待加载的模块函数
     * @return 
     */
    function require(args,func) {
        var counter= args.length;
        var stateback= function(){
            counter--;
            if(counter==0){
                setTimeout(func,13);;
            }
        }
        for(var i=0;i<counter;i++){
            args[i](stateback);
        }
        
    }

    /**
     * 依赖加载
     * @param {Object} obj CGI调用的函数
     * @param {Function} func 等待加载的模块函数
     * @return {Function} 返回一个接收状态回调函数的匿名函数
     * @Type {Function}
     */ 
    function combine(url,obj,combine) {
        var _return= function (stateback) {
            obj.onError= obj.errback||function(){};
            stateback= stateback||function(){};
            obj.onSuccess= function(data){
                //stateback(data);
                obj.callback(data,stateback);
            };
            proxySend(url,obj);
        };
        if(combine) {
            /**
             * @return {Function}
             * @for combine
             */
            return _return;
        }else {
            /**
             * direct call
             * @return {Function}
             */
            return _return();
        }
    }
    function abortProxy() {
        try{
           ajaxInstance.abort();
        }catch(e) {
           //console.info("abortProxyFaild");
        }
    }
    
    $R.send= proxySend;
    $R.combine= combine;
    $R.require= require;
    $R.abortProxy= abortProxy;
    $R.ajax= selfSend;
    
})();;(function(){
    var q= webq.framework;
    var $D= q.dom,
        $V= q.view,
        $M= q.model,
        $C= q.controller,
        $CL= q.collection,
        $F= q.func,
        $E= q.event,
        rpc= q.rpcservice,
        CONST= webq.CONST;
    /**
     * @description 
     * @class 
     * @name Poll
     * @param {Object} initial options
     * @return _poll.api
     */
    function Poll(option) {
        if(this instanceof arguments.callee) {
            return this.init.call(this,option);
        }else {
            return _poll.api;
        }
    };
    /**
     * @description 
     * @constructor
     */
    Poll.prototype= {
        init: function() {

        },
        timeout: 90000,
        pollCount: 0,
        pollMax: 1,
        failCount: 0,

        /**
         * @description poll changes or message from server
         * @description heart beat
         */
        sendPoll: function(option) {
            option = {
                msg_id: webq.CONST.msg_id,
                clientid: webq.CONST.clientid
            };
            var param = option;
            var timeout= this.timeout;
            /**
             * @description at the same time only one poll exists
             */
            if(this.pollCount<this.pollMax){
                this.pollCount++;
                var sender = rpc.send(CONST.CONN_SERVER_DOMAIN + "channel/poll",{
                        context:this,
                        //cacheTime:0,
                        data:param,
                        timeout: this.timeout,
                        onSuccess: this.sendPollSuccess,
                        onError: this.sendPollError,
                        onTimeout: this.sendPollTimeout
                });
            }            
        },
        startPoll: function(){
            this.pollMax= 1;
            this.sendPoll();
        },
        stopPoll: function() {
            this.pollMax= 0;
            try {
                //Webq().use("Adapter.Rpc").abortProxy();
            	//TODO
            }catch(e) {

            }
            //$$.fire(signal['POLL:STOP']);
        },
        sendPollSuccess: function(data) {
            this.pollCount--;
            if(data.retcode === 0 || data.retcode === 102){
                this.resetFailCount();
                //$$.fire(signal['POLL:SUCCESS'], data.result);
                this.router(data.result);
                this.sendPoll();
            }else{
                this.sendPoll();
                this.onFail();
            }
        },
        sendPollError: function() {
            this.sendPollTimeout();
        },
        /**
         * @description front-end timeout
         */
        sendPollTimeout: function() {
            this.pollCount--;
            this.sendPoll();
            this.onFail();
        },
        resetFailCount: function() {
            this.failCount=0;
        },
        onFail: function() {
            this.failCount++;
            if(this.failCount>4){
                this.failCount=0;
                
                Poll().stopPoll();
  				webq.module.yellowTips.bite({type:"pollovermax",text:_("登录失效请刷新页面")},{beforeRender:function(el){
  					this.resetPosition(this.id("EQQ_MainBar"));
                    if(UI && $$('#EQQ_Container .mdTips') && $$('#EQQ_Container .mdTips')[0]) {
                        UI.hide($$('#EQQ_Container .mdTips')[0]);
                    }
                }});
            }
        },
        /**
         * @description router the message
         * @param {Object} poll-data
         */
        router: function(result) {
//{"retcode":0,"result":{"message_history":[["message",{"msg_id":2,"from_id":"hackforsurvive","to_id":"webweb","time":1301623624,"content":"hi"}]]}}
//{"retcode":0,"result":{"buddies_status_change":{"id":"hackforsurvive","nick":"\u9ED1\u5373\u662F\u6D3B","statu":"online"}}}
//{"retcode":0,"result":{"logout":{"clientid":653085}}}
            if(result){
            	try {
                    var message= result.message;
                    var history= result.history;
                    var buddies_status_change= result.buddies_status_change;
                    var logout= result.logout;
                    if(message) {
                    	//resort
    	                message.sort(function(a,b) {
    	                	return (a[1].msg_id>b[1].msg_id)?1:-1;
    	                });
    	                for(var i=0;i<message.length;i++) {
    	                	webq.module.chatBox.msgRouter(webq.module.msg.setItem(message[i]));
    	                	webq.CONST.msg_id= message[i][1].msg_id;
    	                }//
    	                
                    }
                    if(history) {
                    	//resort
    	                history.sort(function(a,b) {
    	                	return (a[1].msg_id>b[1].msg_id)?1:-1;
    	                });
    	                for(var i=0;i<history.length;i++) {
    	                	webq.module.chatBox.msgRouter(webq.module.msg.setItem(history[i]),true);
                            webq.CONST.msg_id= history[i][1].msg_id;
    	                }
                    }
                    if(buddies_status_change) {
                    	webq.module.buddyList.buddyRouter(buddies_status_change);
                    }
                    if(logout) {
                    	webq.module.login.setOffline();
                    }
            	}catch(e) {
            	}
            }
        }
    };
    /**
     * @name _poll
     */
    var _poll= {};
    /**
     * @type {Object}
     * @name _poll.api
     * @constructor
     */
    _poll.api= {
        /**
         * an instance of Class Poll
         */
        core:(new Poll()),
        poll: function() {
            this.core.startPoll();
            $D.id("EQQ_StartButtonIcon").className= "EQQ_startButtonIconActive";
        },
        stopPoll: function() {
            this.core.stopPoll();
        }
    };
    
    webq.module.poll= Poll();
    
})();;(function(){
    var q= webq.framework;
    var $D= q.dom,
        $V= q.view,
        $M= q.model,
        $C= q.controller,
        $CL= q.collection,
        $F= q.func,
        $E= q.event;
        
    var view= $V.extend({
    	target: "EQQ_Class_0_online",
    	container: ["div",{style:"height:34px;overflow:auto;"},function(el,view){
    		//if(view.getId()%2) {
    		//	el.style.background="#F3F8FC";
    		//}
    	}],
    	template: '<div id="EQQ_BuddyList_AvatarContainer_<%=id%>" class="EQQ_BuddyList_AvatarContainer" uin="<%=id%>" title="<%=id%>">\
					<img id="EQQ_BuddyList_Avatar_<%=id%>" class="EQQ_BuddyList_Avatar" src="<%=avatar%>" />\
					<div class="EQQ_BuddyList_State"></div>\
				</div>\
				<div id="EQQ_BuddyList_RightContainer_<%=id%>" class="EQQ_BuddyList_RightContainer" title="<%=htmlNick%>(<%=id%>)">\
					<div class="EQQ_BuddyList_Nick"><div class="EQQ_BuddyList_Nick_inner"><%=htmlNick%>(<%=id%>)</div></div>\
					<a class="EQQ_BuddyList_QzoneIcon" target="_blank" href="http://t.qq.com/<%=id%>" title="'+_("查看最新微博")+'"></a>\
				</div>',
    	events: {
    		".EQQ_BuddyList_RightContainer,.EQQ_BuddyList_Nick,.EQQ_BuddyList_Nick_inner,.EQQ_BuddyList_Avatar click": function(e,_this) {
    		    _this.trigger("chat",_this.getId());
    		    _this.trigger("unflash",_this.getId());
    		}
    	},
    	init: function(model) {
    		//bind
    		//also init
    	},
    	flash: function() {
    		var _this= this;
    		this.unflash();
    		this.isFlashing= new $F.fx(4,$F.toggle(function() {
		        _this.el.style.background="#73cff1";
	        },function(){
		        _this.el.style.background="transparent";
	    	},true));
    	},
    	unflash: function() {
    		if(this.isFlashing) {
    			this.el.style.background="transparent";
                this.isFlashing.stop();
    			delete this.isFlashing;
    		}
    	},
    	insertBefore: function() {
    		this.target.insertBefore(this.el,this.target.childNodes[0]);
    	},
    	renew: function() {
    		$D.removeClass(this.el,"fade");
            this.trigger("renew",this.getId());
    	},
    	fade: function() {
    		$D.addClass(this.el,"fade");
    		this.target.appendChild(this.el);
            this.trigger("fade",this.getId());
    	},
    	update: function(item) {
            if(item.statu=="online") {
                this.renew();
                this.insertBefore();
            }else if(item.statu=="offline") {
                //not puke but fade
                //this.puke(data.id);
                this.fade();
            }
    	}
    });
    var model= $M.extend({
    	xss: {
    		nick: "htmlNick"
    	},
    	map: function(key,value,_this) {
    		if(key=="avatar") {
    			var value_20;
    			if(!value) {
    				value= webq.CONST.DEFAULT_FACE_URL;
    				value_20= value;
    			}else {
    				value_20= value + "/20";
    				value= value + "/30";
    				
    			}
    			_this[key+"_20"]= value_20;
    		}
    		return value;
    	}
    });
    var collection= $CL.extend({
    	model: model,
    	key: "id"
    });
    var controller= $C.extend({
        init: function() {
            var _this= this;
            this.collection.bind("add",function(item,option) {
                _this.updateOnlineCount(+1);
            });
        },
    	collection: collection,
    	view: view,
    	viewObserver: {
    		"chat": function(from,_this) {
    		    _this.chat(from);
    		    webq.module.container.unflashTaskBar();
    		},
    		"unflash": function(id,_this) {
    			_this.unflash(id);
                webq.module.taskBar.unflash(id);
    		},
            "renew": function(id, _this) {
                _this.updateOnlineCount(+1);
            },
            "fade": function(id, _this) {
                _this.updateOnlineCount(-1);
            }
    	},
        _onlineCount: 0,
        updateOnlineCount: function(num) {
            this._onlineCount+= num;
            $D.id("EQQ_onlineCount").innerHTML= "("+this._onlineCount+")";
        },
    	chat: function(from,item) {
    		if(!item) {
    			
    		}else {
    			this.bite(item);
    			if(item.statu=="offline") {
    				this.find(from).fade();
    			}
    		}
    		item= this.collection.find(from);
            webq.module.taskBar.chat(item);
            webq.module.chatBox.chat(item);
    	},
    	fetch: function(data) {
    		//here a ajax call 
            webq.framework.rpcservice.send(webq.CONST.CONN_SERVER_DOMAIN + "channel/get_online_buddies",{
                    context:this,
                    data:{},
                    onSuccess: function(data){
                        if(data.retcode === 0){
                            //{"retcode":0,"result":[{"id":"janejingyang","nick":"pandajane","avatar":"http://t3.qlogo.cn/mbloghead/0a0c3a60c40f96c38c4c"}]}
                        	//按照id字母顺序排序
                        	data.result.sort(function(a,b){return a.id<b.id?-1:1});
                        	for(var len=data.result.length-1;len>=0;len--) {
                        		data.result[len].statu= "online";
                        	}
                            $D.hide("EQQ_Logining");
                            $D.show("EQQ_BuddyList");
                            this.feed(data.result);
                            //webq.module.poll.poll();
                            setTimeout(function(){
                                webq.module.poll.poll();
                                var q= MI.WebQQ.chatQueue;
                                for(var i=0;i<q.length;q++) {
                                	MI.WebQQ.chat.apply(null,q[i]);
                                }
                            },0);
                                
                        }else{
                            
                        }
                    },
                    onError: function(data) {
                        
                    }
            });
    	},
    	buddyRouter: function(data) {
    		//{"id":"webweb","nick":"\u4E00\u7897\u55F1\u55B3\u9762","statu":"online"}
    		this.bite(data);
    	},
        unflash: function(id) {
        	if(this.flashingViews) {
                var i= $F.arrayIndexOf(this.flashingViews,id);
                if(i>-1) {
                    this.flashingViews.splice(i,1);
                    this.find(id).unflash();
                    if(this.flashingViews.length==0) {
                        webq.module.container.unflashMainBar();
                    }
                }
        	}
        },
        insertBefore: function(id) {
        	var view= this.find(id);
        	if(view) {
        		view.insertBefore();
        	}
        },
        GET_FRIEND_INFO_LOCK: {},
    	msgRouter: function(id) {
    		var view= this.find(id);
    		var _this= this;
    		if(view) {
    			
                webq.module.titleMaquee.run();
                view.flash();
                this.flashingViews= this.flashingViews||[];
                if($F.arrayIndexOf(this.flashingViews,id)>-1) {
                
                }else {
                    this.flashingViews.push(id);
                }
                view.insertBefore();
                webq.module.container.flashMainBar();
    		}else {
    			if(!_this.GET_FRIEND_INFO_LOCK[id]) {
        			_this.GET_FRIEND_INFO_LOCK[id]= true;
                    webq.framework.rpcservice.send(webq.CONST.CONN_SERVER_DOMAIN + "channel/get_friend_info",{
                        data:{to:id},
                        timeout: 5000,
                        onSuccess: function(data){
                            if(data.retcode === 0){
                                _this.bite(data.result);
                                var view= _this.find(id);
                                view.flash();
                                //离线用户发的离线消息
                                if(data.result.statu=="offline") {
                                	view.fade();
                                }
                                _this.flashingViews= _this.flashingViews||[];
                                _this.flashingViews.push(id);
                                view.insertBefore();
                                webq.module.container.flashMainBar();
                                webq.module.titleMaquee.run();
                            }else{
                                
                            }
                            delete _this.GET_FRIEND_INFO_LOCK[id];
                        },
                        onError: function() {
                            delete _this.GET_FRIEND_INFO_LOCK[id];
                        },
                        onTimeout: function() {
                            delete _this.GET_FRIEND_INFO_LOCK[id];
                        }
                    });
    			}
    		}
    	}
    });


    var buddyList= new controller({});
    
    webq.module.buddyList= buddyList;
    
    //for t.qq.com
    MI.WebQQ.chat= function(id,nick,avatar) {
    	buddyList.chat(id,{id:id,nick:nick,avatar:avatar});
    }
    
})();;(function(){
    var q= webq.framework;
    var $D= q.dom,
        $V= q.view,
        $M= q.model,
        $C= q.controller,
        $CL= q.collection,
        $F= q.func,
        $E= q.event;
        
        
    var TASKWIDTH= 35;
    var view= $V.extend({
    	target: "EQQ_ChatBuddyList",
    	container: ["div",{style: "width:"+TASKWIDTH+"px;height:35px;float:left;cursor: pointer;"}],
    	template: '<div id="EQQ_FlashDiv_<%=id%>" class="EQQ_TaskBar_FlashDiv EQQ_taskBar_currentBuddy">\
                    <div id="EQQ_TaskBar_BuddyState_<%=id%>" class="EQQ_taskBar_onlineBuddy">\
                        <img class="EQQ_taskBar_avatar" src="<%=avatar_20%>" />\
                        <div class="EQQ_taskBar_state">online</div>\
                    </div>\
                    <div class="EQQ_taskBar_nick"><%=htmlNick%></div>\
                </div>\
                <div id="EQQ_TaskBar_CloseChatBoxButton_<%=id%>" class="EQQ_TaskBar_CloseChatBoxButton" title="'+_("关闭会话窗口")+'">X</div>\
            ',
    	init: function(model) {
    		//bind
    		
    	},
    	afterInit: function() {
    		this.trigger("taskAdd");
    	},
    	destory: function() { //rewrite
    		this.el.parentNode.removeChild(this.el);
            this.trigger("taskRemove");
    	},
    	getRight: function() {
            var clientWidth= $D.getClientWidth();
            var clientX= $D.getClientXY(this.el)[0];
            var r= clientWidth - (clientX + parseInt(this.id("EQQ_Container").style.right) + 25);
            if(clientX<290-25) {
                r= r-(290-25-clientX);
            }else {
                
            }
    		return r;
    	},
    	setCurrent: function() {
    		$D.addClass(this.el.childNodes[0],"EQQ_taskBar_currentBuddy");
    	},
    	setUnCurrent: function() {
    		$D.removeClass(this.el.childNodes[0],"EQQ_taskBar_currentBuddy");
    	},
    	events: {
    		"@ @click": function(e,_this) { //this.el
    			var id= _this.getId();
    			_this.trigger("click",_this);
    			_this.trigger("unflash",id);
    		}
    	},
    	update: function() {
    		$D.show(this.el);
    	},
        flash: function() {
            var _this= this;
            this.unflash();
            this.isFlashing= new $F.fx(4,$F.toggle(function() {
                _this.el.style.background="#C9F1FF";
            },function(){
                _this.el.style.background="transparent";
            },true));
        },
        unflash: function() {
            if(this.isFlashing) {
                this.el.style.background="transparent";
                this.isFlashing.stop();
                delete this.isFlashing;
            }
        },
        insertBefore: function() {
    		this.target.appendChild(this.el);
    		this.trigger("insertBefore",this.getId());
    	}
    });
    var model= $M.extend({
    });
    var collection= $CL.extend({
    	model: model,
    	key: "id"
    });
    var controller= $C.extend({
    	collection: collection,
    	view: view,
    	viewObserver: {
    		"click": function(view,_this) {
    			var item= _this.collection.find(view.getId());
    			_this.chat(item);
    			webq.module.chatBox.chat(item);
    			webq.module.container.unflashTaskBar();
    		},
    		"taskAdd": function(_this) {
    			webq.module.container.taskAdd();
    			_this.checkTaskLimit();
    		},
    		"taskRemove": function() {
    			webq.module.container.taskRemove();
    		},
    		"insertBefore": function(id,_this) {
    			_this.collection.insertBefore(id);
    		},
    		"unflash": function(id,_this) {
    			_this.unflash(id);
                webq.module.buddyList.unflash(id);
    		}
    	},
    	chat: function(item) {
    		this.bite(item);
    		this.setCurrent(item[this.key]);
    	},
    	setCurrent: function(id) {
    		if(this.currentId) {
    			var v= this.find(this.currentId);
    			if(v) {
    				v.setUnCurrent();
    			}
    		}
    		this.currentId= id;
    		this.find(id).setCurrent();
    	},
    	setUnCurrent: function(id) {
    		this.find(id).setUnCurrent();
    	},
    	unflash: function(id) {
    		if(this.flashingViews) {
        		var i= $F.arrayIndexOf(this.flashingViews,id);
        		if(i>-1) {
        			this.flashingViews.splice(i,1);
        			this.find(id).unflash();
                    if(this.flashingViews.length==0) {
                        webq.module.container.unflashTaskBar();
                    }
        		}
    		}
     	},
        msgRouter: function(id) {
            var view= this.find(id);
            if(view) {
                view.flash();
                this.flashingViews= this.flashingViews||[];
                this.flashingViews.push(id);
                view.insertBefore();
                webq.module.container.flashTaskBar();
            }
        },
        clear: function() {
        	var _this= this;
        	this.collection.map(function(id,item){
        		_this.puke(id);
        	});
        	this.currentId= null;
        },
        taskLimit: Math.floor(800-147/TASKWIDTH),//根据微博屏幕分辨率-tipsbox2长度,
        checkTaskLimit: function() {
        	if(this.collection.getLength()>this.taskLimit) {
        		var id= this.collection.getFirst();
        		this.puke(id);//taskBar
        		webq.module.chatBox.puke(id);
        	}
        }
    });


    var taskBar= new controller({}); //{} important for initial

    webq.module.taskBar= taskBar;
})();;(function(){
    var q= webq.framework;
    var $D= q.dom,
        $V= q.view,
        $M= q.model,
        $C= q.controller,
        $CL= q.collection,
        $J= q.json,
        $S= q.string,
        $F= q.func,
        $E= q.event;
        
    var getCookieUin= function() {
    	return parseInt(webq.framework.cookie.get("luin").substr(1),"10") ||parseInt(webq.framework.cookie.get("uin").substr(1),"10"); 
    }
    var zeropad= function(s) {
    	return String(s).length<2?"0"+s:s;
    }
    var ts4hmmd= function(timestamp) {
        if(String(timestamp).length<13) {
            timestamp= parseInt(timestamp)*1000;
        }
        var data= new Date(parseInt(timestamp));
        return [zeropad(data.getHours())+":"+zeropad(data.getMinutes()),data.getMonth()+1+"-"+data.getDate()];
    };
    var tips_msgs= {
    	//TODO
    	toofast:_("您的说话速度太快了，请稍后再发。"),
    	uinconflict: _("登录失效请刷新页面"),
    	charsovermax: _("消息内容请勿超过300字，请修改后再试。"),
    	selfoffline: _("您已经离线，无法进行会话，请重新上线后再试。"),
		offline: _("对方已经下线，可能无法即时回复，您可以给他发送离线消息或者私信。"),
		msgmiss: _("聊天记录暂时无法保存，关闭会话窗口前注意保存聊天中的重要信息。"),
		dirtyword: _("您输入的内容有误，请修改后再次发送。"),
		notfollow: _("会话方与您不存在互听关系，如需发起实时聊天，需要双方微博互听。"),
		notopen: function(id) { 
			var htmlNick = chatBox.collection.find(id).getter("htmlNick");
			
			return _('对方禁用了聊天，无法收到本条消息。。<a style="text-decoration:underline;cursor:pointer" onclick=\'MI.message("'+id+'","Hi~'+htmlNick+'，我正在使用腾讯微博的实时聊天功能，快来这里开通实时聊天功能，与我在线聊天吧！http://t.qq.com/setting/others");return false;\'>点这里</a>，发封私信告诉Ta开通实时聊天权限吧。');
		}
	};
	var tips_template= '\
			<div class="EQQ_yellowTips_info">!</div>\
			<div class="EQQ_yellowTips_text"><%=content%></div>\
			<div class="EQQ_yellowTips_close">X</div>\
	';
					
    var view= $V.extend({
        target: "EQQ_Container",
        container: ["div",{"class": "EQQ_chatbox"}],
        template: '<div id="EQQ_uin_chatboxTitle" class="EQQ_chatboxTitle">\
                <div id="chatBox_avatarArea_<%=id%>" class="onlineBuddyInChatbox" title="">\
                    <a title="<%=nick%>(@<%=id%>)" href="/<%=id%>"><img id="EQQ_Chatbox_Avatar_<%=id%>" class="avatarInChatbox" title="<%=nick%>(@<%=id%>)" src="<%=avatar%>" /></a>\
                    <div class="stateInChatbox">'+_("状态")+'</div>\
                </div>\
                <div class="EQQ_chatboxControler">\
                    <a href="#" onclick="return false;"><div id="EQQ_ChatboxCloseButton_<%=id%>" class="EQQ_chatboxCloseButton" title="'+_("关闭")+'" href="#"></div></a>\
                    <a href="#" onclick="return false;"><div id="EQQ_ChatboxMinButton_<%=id%>" class="EQQ_chatboxMinButton" title="'+_("最小化")+'" href="#"></div></a>\
                </div>\
                <div class="EQQ_chatboxNameLine">\
                    <a id="EQQ_ChatboxName_<%=id%>" class="EQQ_chatboxName" href="/<%=id%>" ><span id="EQQ_ChatboxMainName_<%=id%>" class="mainName"><%=htmlNick%>(<%=id%>)</span></a>\
                </div>\
                <div id="EQQ_ChatboxMoreInfo_<%=id%>" class="EQQ_chatboxMoreInfo">\
                    <a href="#" onclick="return false;" title="'+_("加为QQ好友")+'"><div class="EQQ_addBuddyIcon"></div><div class="EQQ_addBuddyText">加为QQ好友</div></a>\
                </div>\
            </div>\
            <div class="EQQ_chatOutline">\
                <div id="ChatContentInChatbox_<%=id%>" class="chatContentInChatbox">\
					<!--\
					<dl class= "myMsgInChatbox">\
						<dt class="msgHead">dasdasdasdsa</dt>\
						<dd class="msgBody">dasdasdas</dd>\
					</dl>\
					<dl class="buddyMsgInChatbox">\
						<dt class="msgHead">asdasdads</dt>\
						<dd class="msgBody">dasdasd</dd>\
					</dl>\
					-->\
                </div>\
            </div>\
            </div>\
            <div class="optionInChatbox">\
            		<a href="#" style="width: 20px;display: block;" onclick="return false;">\
            			<div id="FaceButtonInChatbox_<%=id%>" class="faceButtonInChatbox">'+_("表情")+'</div>\
					</a>\
			</div>\
            <textarea id="TextareaInChatbox_<%=id%>" class="textareaInChatbox"></textarea>\
            <div class="EQQ_chatControler">\
				<a href="#" onclick=\'MI.report("<%=id%>");return false;\' style="display: block; margin-left: 5px; position: absolute; margin-top: 3px;"><div class="EQQ_chatReport">'+_("举报")+'</div></a>\
                <a href="#" onclick="return false;"><div id="EQQ_sendMsgButton_<%=id%>" class="EQQ_sendMsgButton" title="'+_("发送")+'" >'+_("发送")+'</div></a>\
                <a href="#" onclick="return false;"><div id="EQQ_ChatboxCloseButton2_<%=id%>" class="EQQ_chatboxCloseButton2" title="'+_("关闭")+'" >'+_("关闭")+'</div></a>\
            </div>',
        events: {
        	".EQQ_chatboxCloseButton,.EQQ_chatboxCloseButton2 click": function(e,_this) {
        		_this.trigger("puke",_this.getId());
        		webq.module.ammo.hideFacePanel();
        	},
        	".EQQ_chatboxMinButton click": function(e,_this) {
        		_this.hide();
        		_this.trigger("mini",_this.getId());
        	},
        	".textareaInChatbox keydown": function(e,_this) {
        		if(e.keyCode==13&&e.ctrlKey) {
        			var to= _this.getId(), content= _this.getContent();
        			_this.trigger("send",to,content);
        		}
        	},
        	".EQQ_sendMsgButton click": function(e,_this) {
     			var to= _this.getId(), content= _this.getContent();
        		_this.trigger("send",to,content);
        	},
        	".faceButtonInChatbox click": function(e,_this) {
        		e.preventDefault();
        		e.stopPropagation();
        		var clientWidth= $D.getClientWidth();
        		var clientX= $D.getClientXY(e.target)[0];
        		var r= clientWidth - (clientX + parseInt(_this.id("EQQ_Container").style.right) + 25);
        		if(clientX<436-25) {
        			r= r-(436-25-clientX);
        		}else {
        			
        		}
                try {
                    _this.id("TextareaInChatbox_"+_this.getId()).focus();
                }catch(e) {
                    
                }
                var selection = document.selection;
                if(selection && selection.createRange) {
                    this.selection= selection.createRange();
                }
        		_this.trigger("face",_this.getId(),r);
        	},
        	".EQQ_yellowTips_close click": function(e,_this) {
        		var dom= e.target.parentNode;
        		_this.closeTips(dom);
        		if(dom.getAttribute("flag")== "msgmiss") {
        			_this.trigger("setNoWarnning");
        		}
        	},
            "...EQQ_chatboxMoreInfo click": function(e, _this) {
                if(MI && MI.addQQ) {
                    MI.addQQ(_this.getId());
                }
                MI.WebQQ.report2m(151291);
            }
        },
        tipsCount: 0,
        renderTips: function(name,fade) {
        	var dom,close=false;
        	if(dom= $D.id("EQQ_yellowTips_"+this.getId()+"_"+name)) {
        		this.closeTips(dom);
        	}
    		var _this= this;
        	dom= $D.node("div",{id:"EQQ_yellowTips_"+this.getId()+"_"+name,"class":"EQQ_yellowTips","flag":name});
        	if(name=="notopen") {
        		dom.innerHTML= $S.template(tips_template,{content:tips_msgs[name](this.getId())});
        		close= true;
        	}else {
				dom.innerHTML= $S.template(tips_template,{content:tips_msgs[name]});
        	}
			this.id("ChatContentInChatbox_"+this.getId()).appendChild(dom);
			this.tipsCount++;
			//缩短
			$D.addClass(this.id("ChatContentInChatbox_"+this.getId()),"tips");
			if(!close||fade) {
				setTimeout(function(){
					_this.closeTips(dom);
				},6000)
			}
        },
        closeTips: function(dom) {
        	try {
	        	dom.parentNode.removeChild(dom);
	        	this.tipsCount--;
	        	if(this.tipsCount==0) {
	        		$D.removeClass(this.id("ChatContentInChatbox_"+this.getId()),"tips");
	        	}
        	}catch(e) {
        		
        	}
        },
        afterInit: function() {
        	this.isShow= true;
        },
    	update: function() {
    		var _this =this;
    		$D.show(this.el);
    		var inputArea= this.id("ChatContentInChatbox_"+this.getId());
            setTimeout(function(){
                inputArea.scrollTop= inputArea.scrollHeight;
                try {
                    _this.id("TextareaInChatbox_"+_this.getId()).focus();
                }catch(e) {
                    
                }
            },0);
    		this.trigger("update",this.getId())
    	},
    	afterRender: function() {
    		this.id("TextareaInChatbox_"+this.getId()).focus();
            this.trigger("fillMe",this.getId());
            this.trigger("setTips",this.getId());
            if(MI.Card&&MI.Card.build) {
            	MI.Card.build(document,"#EQQ_Chatbox_Avatar_"+this.getId(),3);
            }
    	},
    	appendMsg: function(data) {
    		//{"msg_id":2,"from_id":"hackforsurvive","to_id":"webweb","time":1301623624,"content":"hi"}
    		var template= '<dt class="msgHead"><%=htmlAllName%> <%=hm%></dt>\
                        <dd class="msgBody"><%=htmlContent%></dd>\
            ';
            if(webq.CONST.myId==data.from_id) {
            	var dl= $D.node("dl",{"class":"myMsgInChatbox"});
            }else {
            	var dl= $D.node("dl",{"class":"buddyMsgInChatbox"});
            }
            var content= data.content;
            var time= ts4hmmd(data.time)[0];
            var S2F= webq.CONST.SHORTCUT_2_FACE;
            var matchs= [],len;
            content= $S.encodeHtmlSimple(content);
            content.replace(/\/[\u4e00-\u9fa5ON]/g,function(word,pos){
            	var t,m;
                if(t=S2F[word]) {
                	m= $F.each(t,function(k,v){
                		var s= content.substr(pos,k.length);
                	    if(typeof t[s] != "undefined") {
                	    	return [s,t[s]];
                	    }
                	});
                	if(m) {
                		matchs.push(m);
                	}
                	return word;
                }
            });
            for(len=matchs.length-1;len>=0;len--) {
            	var html= "<img class=\"EQQ_faceImg\" src=\""+webq.CONST.SYSTEM_FACE_URL + matchs[len][1] + ".gif\" />";
            	content= content.split(matchs[len][0]).join(html);
            }
            content= content.replace(/\r\n|\r|\n/ig, '<br />');
            dl.innerHTML= $S.template(template,{
                htmlContent: content,
                htmlAllName: data.htmlNick+"("+data.from_id+")",
                hm: time
            });
            var inputArea= this.id("ChatContentInChatbox_"+this.getId());
            inputArea.appendChild(dl);
            setTimeout(function(){
                inputArea.scrollTop= inputArea.scrollHeight;
            },0);
    	},
    	appendFace: function(textFace) {
    		var textObj= this.id("TextareaInChatbox_"+ this.getId());
    		textObj.focus();
            var selection = document.selection;
            if(typeof textObj.selectionStart!="undefined") {
                textObj.value=textObj.value.substr(0,textObj.selectionStart)+textFace+textObj.value.substr(textObj.selectionEnd);
            }else if(selection && selection.createRange) {
                var sel = selection.createRange();
                sel.text = textFace;
                try{
                    sel.moveStart("character", -strlen(textFace));
                }catch(e) {
                }
            }else {
            	textObj.value+=textFace;
            }
    	},
        setRight: function(right) {
        	this.el.style.right= right+"px";
        },
        getContent: function() {
        	return this.id("TextareaInChatbox_"+this.getId()).value;
        },
        clearContent: function() {
        	this.id("TextareaInChatbox_"+this.getId()).value= ""; 
	        this.id("TextareaInChatbox_"+this.getId()).focus();
        }
    });
    var model= $M.extend({
    });
    var collection= $CL.extend({
        model: model,
        key: "id"
    });
    var controller= $C.extend({
        init: function() {
            this.collection.bind("add",function(item,option) {
                MI.WebQQ.report2m(151289);
            });
        },
        collection: collection,
        view: view,
        viewObserver: {
        	"puke": function(id,_this) {
        		_this.puke(id);
        		var taskBar= webq.module.taskBar;
        		taskBar.puke(id);
        		if(id==_this.currentId) {
        			_this.currentId= null;
        		}
        	},
        	"update": function(id,_this) {
	        	_this.setRight(id);
	            if(_this.currentId) {
	                _this.find(_this.currentId).hide();
	            }
	            _this.currentId= id;
        	},
        	"fillMe": function(id,_this) {
        	    var view= _this.find(id);
        	    var msgs= webq.module.msg.getItem(id);
        	    for(var i=0;i<msgs.length;i++) {
        	    	view.appendMsg(msgs[i][1]);
        	    }
        	},
        	"mini": function(id,_this) {
        		webq.module.taskBar.setUnCurrent(id);
        		if(id==_this.currentId) {
        			_this.currentId= null;
        		}
        	},
        	"send": function(to,content,_this) {
        		if(content&&content.length>300) {
        			_this.find(to).renderTips("charsovermax");
        			return;
        		}
        		if(_this.find(to).SENDING) {
        			_this.find(to).renderTips("toofast");
                    return;
        		}
        		if(content) {
        			_this.find(to).SENDING= true;
    				webq.framework.rpcservice.send(webq.CONST.CONN_SERVER_DOMAIN + "channel/send_msg",{
    	                    method: "post",
    	                    timeout:5000,
    	                    data: $S.obj2queryString({
    	                    	r: $J.stringify({
    	                    		to: to,
    	                    		content: content 
    	                    	})
    	                    }),
    	                    onSuccess: function(data){
    	                    	delete _this.find(to).SENDING;
    	                    	switch(data.retcode) {
    	                    		case 0:
    	                    			_this.find(to).clearContent();
                                        MI.WebQQ.report2m(151293);
    	                    			break;
    	                    		//不在线
    	                    		case 118:
    	                    			_this.find(to).renderTips("offline");
    	                    			//伪造一个poll来的消息
    	                    			_this.msgRouter(webq.module.msg.setItem(["message",{
    	                    				"msg_id":webq.module.msg.getSequence(),
    	                    				"from_id":webq.CONST.myId,
    	                    				"to_id":to,
    	                    				"time":Math.floor((new Date()).getTime()/1000),
    	                    				"content":content
    	                    			}]));
    	                    			_this.find(to).clearContent();
                                        MI.WebQQ.report2m(151292);
    	                    			break;
    	                    		//脏字
    	                    		case 117:
    	                    		    _this.find(to).renderTips("dirtyword");
    	                    		    //_this.find(to).clearContent();
                                        MI.WebQQ.report2m(151294);
    	                    			break;
    	                    		//不是互听
    	                    		case 119:
    	                    			//_this.find(to).clearContent();
                                        if(getCookieUin() != webq.CONST.uin) {
                                            webq.module.yellowTips.bite({type:"uinconflict",text:_("登录失效请刷新页面")},{beforeRender:function(el){
							  					this.resetPosition(this.id("EQQ_StartButtonIcon"));
							                }});
                                            //_this.find(to).renderTips("uinconflict");
                                        }else {
                                            _this.find(to).renderTips("notfollow");
                                        }
                                        MI.WebQQ.report2m(151294);
    	                    			break;
    	                    		case 121:
    	                    			_this.find(to).renderTips("notopen");
                                        MI.WebQQ.report2m(151294);
    	                    			break;
    	                    		case 103:
    	                    		case 100:
    	                    		    if(getCookieUin() != webq.CONST.uin) {
    	                    		    	webq.module.yellowTips.bite({type:"uinconflict",text:_("登录失效请刷新页面")},{beforeRender:function(el){
							  					this.resetPosition(this.id("EQQ_StartButtonIcon"));
							                }});
    	                    		    	//_this.find(to).renderTips("uinconflict");
    	                    		    }else {
    	                    		        _this.find(to).renderTips("selfoffline");
    	                    		    }
                                        MI.WebQQ.report2m(151294);
    	                    		    break;
    	                    		default:
    	                    		
    	                    	}
    	                    },
    	                    onError: function(data) {
    	                        delete _this.find(to).SENDING;
    	                    },
    	                    onTimeout: function() {
    	                    	delete _this.find(to).SENDING;
    	                    }
    	            });
        		}
        	},
        	"face": function(id,right,_this) {
        		webq.module.ammo.showFacePanel(right);
        	},
        	"setTips": function(id,_this) {
        		if(_this.isWarnning) {
        			_this.find(id).renderTips("msgmiss",true);
        		}
        	},
        	"setNoWarnning": function(_this) {
        		_this.isWarnning= false;
        	}
        },
        isWarnning: true,
        appendFace: function(text) {
        	if(this.currentId) {
        		var view= this.find(this.currentId);
        		if(view.isShow) {
        			view.appendFace(text);
        		}
        	}
        },
        setRight: function(id) {
            if(webq.module.container.isTaskBarRightExtend()) {
            	var taskBar= webq.module.taskBar;
            	var right= taskBar.find(id).getRight()
            	this.find(id).setRight(right);
            }
        },
        chat: function(item) {
        	if(item[this.key]==this.currentId) {
        		this.find(this.currentId).hide();
        		webq.module.taskBar.setUnCurrent(this.currentId);
        		this.currentId= null;
        		return;
        	}
        	var id= item[this.key];
        	this.bite(item);
        	this.setRight(id);
            if(this.currentId) {
                this.find(this.currentId).hide();
            }
            this.currentId= id;
            this.find(id).show();
        },
        msgRouter: function(data,history) {
        	var msg= data[1];
        	//["message",{"msg_id":2,"from_id":"hackforsurvive","to_id":"webweb","time":1301623624,"content":"hi"}]
        	var v,id;
        	id= msg.from_id;
        	if(id==webq.CONST.myId) {
        		id= msg.to_id;
        	}
        	if( (v=this.find(id)) ) {
        		v.appendMsg(msg);
        	}
        	if((v=this.find(id))&& v.isShow){
        		
        	}else {
        		if(!history) {
            		if(id!=msg.to_id) {
            		    webq.module.buddyList.msgRouter(id);
            		    webq.module.taskBar.msgRouter(id);
            		    
            		}
        		}else {
        			if(id!=msg.to_id) {
        				//重排序，有历史消息优先
        			    webq.module.buddyList.insertBefore(id);
        			}
        		}
        	}
        },
        clear: function() {
        	var _this= this;
        	this.collection.map(function(id,item){
        		_this.puke(id);
        	});
        	this.currentId= null;
        },
        hide: function() {
        	if(this.currentId) {
        		this.find(this.currentId).hide();
        		webq.module.taskBar.setUnCurrent(this.currentId);
        		this.currentId= null;
        	}
        }
    });


    var chatBox= new controller({});

    //chatbox.bite({id:10,from:10,htmlName:"duwei10",name:"duwei10",t:"hello world8"});

    webq.module.chatBox= chatBox;
})();;(function(){
    var q= webq.framework;
    var $D= q.dom,
        $V= q.view,
        $M= q.model,
        $C= q.controller,
        $CL= q.collection,
        $F= q.func,
        $E= q.event;
        
    	
	    //struct

		
		

	    var msg= function() {
	    	var hash={};
			var t = (new Date()).getTime();
			t= (t-t%1000)/1000;
			t= t%10000*10000;
			var sequence= 0;
	    	var getSequence = function(){
				sequence++;
				return t + sequence;
			}
	    	return {
	    		getItem: function(id) {
	    			return hash[id]||[];
	    		},
	    		setItem: function(data) {
	    			//["message",{"msg_id":2,"from_id":"hackforsurvive","to_id":"webweb","time":1301623624,"content":"hi"}]
	    			var record,model;
	    			if(data[1].from_id== webq.CONST.myId) {
	    				record= (hash[data[1].to_id]= hash[data[1].to_id]||[]);
                        data[1].htmlNick= _(webq.CONST.myNick);
	    			}else {
	    				record= (hash[data[1].from_id]= hash[data[1].from_id]||[]);
	    				model= webq.module.buddyList.collection.find(data[1].from_id);
                        data[1].htmlNick= model?model.getter("htmlNick"):data[1].from_id;
                        
	    			}
	    			record.push(data);
	    			return data;
	    		},
	    		getSequence: getSequence
	    	}
	    };
	    var titleMaquee= function() {
	    	var maquee;
	    	var t= _(" 收到新的微博实时聊天消息");
	    	var msg= t;
	    	var originTitle= document.title+"";
	    	var canRun= false;
            var run= function() {
            	stop();
                if(canRun) {
                	maquee= new $F.fx(2,function(){
                	    msg= msg.substr(1) + msg.charAt(0)
                	    document.title= msg;
                	});
                }
            };
            var stop= function() {
                if(maquee) {
                    maquee.stop();
                    maquee= null;
                }
                msg= t;
                document.title= document.titleTmp||originTitle;
            };
            if("onfocusin" in document){
                $E.on(document, "focusin", function(){
                	canRun= false;
                    stop();
                });
                $E.on(document, "focusout", function(){
                    canRun= true;
                });
            }else{
                $E.on(window, "focus", function(){
                	canRun= false;
                    stop();
                });
                $E.on(window, "blur", function(){
                    canRun= true;
                });
            }
	    	return {
	    		run: run,
	    		stop: stop
	    	}
	    }
	    webq.module.msg= msg();
	    webq.module.titleMaquee= titleMaquee();
})();