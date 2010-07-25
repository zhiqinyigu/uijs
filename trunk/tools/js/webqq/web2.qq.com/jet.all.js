/**	
 * JET (Javascript Extension Tools) 
 * Copyright (c) 2009, KDV.cn, All rights reserved.
 * http://code.google.com/p/j-et/
 *
 * @version	1.0
 * @author	Kinvix(<a href="mailto:Kinvix@gmail.com">Kinvix@gmail.com</a>)
 * 
 */

/**	
 * @description
 * Package: jet
 *
 * Need package:
 * no.
 * 
 */

/**
 * 1.[JET core]: JET 微内核
 */
;(function(){
	var version = "1.0",
		mark = "JetMark",
		topNamespace = this,
		
		// 将顶级命名空间中可能存在的 Jet 对象引入
		Jet = topNamespace.Jet,
		
		VERSIONS = {},
		PACKAGES = {},
		
		DEBUG = {
			NO_DEBUG: 0,
			SHOW_ERROR: 1,
			SHOW_WARNING: 2,
			SHOW_INFO: 3,
			SHOW_ALL: 4
		},
		
		option = {
			debug: DEBUG.SHOW_ALL
		},
		
		/**
		 * @ignore
		 */
		out = function(msg, type){
			msg = String(msg);
			type = type || 3;
			if(type < option.debug){
				if(this.console){
					if(this.console.out){
						this.console.out(msg, type);
					}else{
						alert(msg+" - 消息类型["+type+"]");
					}
					
				}
			}
			return msg;
		};
		

	try{
		// 判断Jet名字空间是否已经存在
		if(typeof Jet === "undefined" || (Jet.mark && Jet.mark === mark)){
			
			// 如果已经有Jet对象则记录已有的信息
			if(Jet){
				VERSIONS = Jet.VERSIONS;
				PACKAGES = Jet.PACKAGES;
			}
			
			/**
			 * 【Jet 对象原型】
			 * 
			 * @class Jet
			 * @constructor Jet
			 * @global
			 * 
			 * @since version 1.0
			 * @description Jet 对象原型的描述
			 * 
			 * @param {Number} ver 要使用的 Jet 的版本号，当前是1.0
			 * @param {Boolean} isCreateNew 是否创建一个新的 Jet 实例，默认为 false 不创建新的 Jet 实例，只返回同一版本在全局中的唯一一个实例，注意：除非特殊需要，否则一般不要创建新的 Jet 实例
			 * @return {Object} 返回对应版本的 Jet 对象
			 * 
			 * @example
			 * //代码组织方式一(传统)：
			 * var J = new Jet();
			 * J.out(J.version);	//输出当前Jet的版本
			 * 
			 * @example
			 * //代码组织方式二(推荐)：
			 * Jet().$package(function(J){
			 * 	J.out(J.version);	//输出当前Jet的版本
			 * };
			 * //注：此种方式可以利用匿名函数来防止变量污染全局命名空间，尤其适合大型WebApp的构建！
			 * 
			 * @example
			 * //范例：
			 * Jet().$package("tencent.qqweb", function(J){
			 * 	var $ = J.dom.id,
			 * 	$D = J.dom,
			 * 	$E = J.event,
			 * 	$H = J.http;
			 * 	this.name = "腾讯WebQQ";
			 * 	J.out(this.name);
			 * };
			 * 
			 */
			Jet = function(ver, isCreateNew){
				var J = this;

				if(isCreateNew){
					// 如果是第一次执行则初始化对象
					this._init();
				}else{
					if(ver){
						ver = String(ver);
						try{
							if(Jet.VERSIONS[ver]){
								J = Jet.VERSIONS[ver];
							}else{
								J = Jet.VERSIONS[Jet.DEFAULT_VERSION];
								throw new Error("没有找到 JET version " + ver + ", 所以返回默认版本 JET version " + Jet.DEFAULT_VERSION + "!");
							}
						}catch(e){
							//J.out(e.fileName+";"+e.lineNumber+","+typeof e.stack+";"+e.name+","+e.message, 2);
							J.out("A.错误：[" + e.name + "] "+e.message+", " + e.fileName+", 行号:"+e.lineNumber+"; stack:"+typeof e.stack, 2);
						}
					}else{
						J = Jet.VERSIONS[Jet.DEFAULT_VERSION];
					}
				}
				return J;
			};
			
			Jet.prototype = {
				/**
				 * 当前 Jet 的版本号，此版本是 1.0 <br/>
				 * Version 1.0
				 * 
				 * @description {Num} 当前 Jet 的版本号！
				 * @constant
				 * @type Number
				 */
				version: version,
				
				DEBUG: DEBUG,
				
				/**
				 * Jet 配置
				 * @ignore
				 */
				option: option,
				
				/**
				 * Jet 的初始化方法
				 * initialize method
				 * 
				 * @private
				 * @param {Object} o config 对象
				 */
				_init: function(){
					this.constructor = Jet;
					//return true;
				},
			
				/**
				 * 创建一个命名空间，创建的命名空间将会在 window 根命名空间下。
				 * Create a new namespace, the top namespace is window.
				 * 
				 * @since version 1.0
				 * @description 可以一次性连续创建命名空间
				 * 
				 * @param {String} name 命名空间名称
				 * @returns {Object} 返回对最末命名空间的引用
				 * 
				 * @example
				 * //在全局环境中创建tencent.qqweb名字空间, $namespace完成的操作相当于在全局环境中执行如下语句：
				 * //var tencent = {};
				 * //tencent.qqweb = {};
				 * 
				 * J.$namespace("tencent.qqweb");
				 * 
				 * //注：Jet的$namespace方法与其他JS框架的namespace的方法不同，其他框架如YUI是在其YAHOO对像下创
				 * //建命名空间，而Jet的$namespace测试直接在顶级命名空间window的下边直接创建命名空间。
				 * 
				 */
				$namespace: function(name) {
					var i,
						ni,
						nis = name.split("."),
						ns = topNamespace;

					for(i = 0; i < nis.length; i=i+1){
						ni = nis[i];
						ns[ni] = ns[ni] || {};
						ns = ns[nis[i]];
					}

					return ns;
				},
	
				/**
				 * 创建一个 Javascript 代码包
				 * 
				 * @param {String} name 要创建的包的名字空间
				 * @param {Function} func 要创建的包的包体
				 * @returns {Mixed} 返回任何自定义的变量
				 * 
				 * @example
				 * //创建一个匿名package包：
				 * Jet().$package(function(J){
				 * 	//这时上下文对象this指向全局window对象
				 * 	alert("Hello world! This is " + this);
				 * };
				 * 
				 * @example
				 * //创建一个名字为tencent.kinvix的package包：
				 * Jet().$package("tencent.kinvix", function(J){
				 * 	//这时上下文对象this指向window对象下的tencent.kinvix对象
				 * 	alert("Hello world! This is " + this);
				 * };
				 * 
				 * 
				 * 
				 */
				$package: function(){
					var name = arguments[0],
						func = arguments[arguments.length-1],
						ns = topNamespace,
						returnValue;
						if(typeof func === "function"){
							if(typeof name === "string"){
								ns = this.$namespace(name);
								if(Jet.PACKAGES[name]){
									//throw new Error("Package name [" + name + "] is exist!");
								}else{
							   		Jet.PACKAGES[name] = {
										isLoaded: true,
										returnValue: returnValue
									};
								}
								ns.packageName = name;
							}else if(typeof name === "object"){
								ns = name;
							}
							
							returnValue = func.call(ns, this);
						}else{
							throw new Error("Function required");
						}
	
				},
				
				/**
				 * 检查一个 Javascript 模块包是否已经存在
				 * 
				 * @param {String} name 包名
				 * @return {Object} 如果已加载则返回包对象，否则返回 undefined
				 * 
				 * @example
				 * //创建一个匿名package包：
				 * Jet().$package(function(J){
				 * 	// 输出undefined
				 * 	J.out(J.checkPackage("tencent.kinvix"));
				 * };
				 * 
				 * 
				 * @example
				 * //创建一个名字为tencent.kinvix的package包：
				 * Jet().$package("tencent.kinvix", function(J){
				 * 	//这时上下文对象this指向window下的tencent.kinvix对象
				 * 	alert("Hello world! This is " + this);
				 * };
				 * 
				 * Jet().$package(function(J){
				 * 	// J.checkPackage("tencent.kinvix")结果返回的将是tencent.kinvix的引用
				 * 	var kinvix = J.checkPackage("tencent.kinvix");
				 * 	if(kinvix){
				 * 		J.out("tencent.kinvix包已加载...");
				 * 	}
				 * };
				 * 
				 */
				checkPackage: function(name){
					return Jet.PACKAGES[name];
				},
				
				/**
				 * 标准化 Javascript 的核心输出方法，注意：在不同的Javascript嵌入宿主中会覆盖此方法！
				 * 
				 * @method out
				 * @function
				 * 
				 * @param {String} msg 要输出的信息
				 * @param {Number} type 输出信息的类型
				 * @return {String} msg 返回要输出的信息
				 * 
				 * @example
				 * //创建一个匿名package包：
				 * Jet().$package(function(J){
				 * 	// 向Jet的控制台输出信息,在不同的js宿主中具体实现细节会不同,但不会影响out方法的使用;
				 * 	J.out("Hello, world!");
				 * };
				 * 
				 */
				out: out,
				
				startTime: +new Date(),
				
				/**
				 * 关于 Jet
				 * 
				 * @return {String} 返回 Jet 的 about 信息
				 */
				about: function(){
					return this.out("JET (Javascript Extend Tools)\nversion: " + this.version + "\n\nCopyright (c) 2009, KDV.cn, All rights reserved.", 3);
				},
				
				/**
				 * Jet 对象转化为字符串的方法
				 * 
				 * @ignore
				 * @return {String} 返回 Jet 对象串行化后的信息
				 */
				toString: function(){
					return "JET version " + this.version + " !";
				}
			};

			/**
			 * Jet 版本库对象
			 * 
			 * @ignore
			 * @type Object
			 */
			Jet.VERSIONS = VERSIONS;
			
			/**
			 * 记录加载的包的对象
			 * 
			 * @ignore
			 * @type Object
			 */
			Jet.PACKAGES = PACKAGES;

			/**
			 * 创建一个当前版本 Jet 的实例
			 * 
			 * @ignore
			 * @type Object
			 */
			Jet.VERSIONS[version] = new Jet(version, true);
		
			/**
			 * Jet 默认版本的版本号，默认将会是最后一个加载的Jet版本
			 * 
			 * @constant
			 * @type Number
			 */
			Jet.DEFAULT_VERSION = version;
			/**
			 * Jet 对象验证标记
			 * 
			 * @ignore
			 * @description 用于验证已存在的Jet对象是否是本框架某子版本的Jet对象
			 * @type String
			 */
			Jet.mark = mark;
			
			// 让顶级命名空间的 Jet 对象引用新的 Jet 对象
			topNamespace.Jet = Jet;
		}else{
			throw new Error("\"Jet\" name is defined in other javascript code !!!");
		}
	}catch(e){
		// 微内核初始化失败，输出出错信息
		out("JET 微内核初始化失败! " + "B.错误：[" + e.name + "] "+e.message+", " + e.fileName+", 行号:"+e.lineNumber+"; stack:"+typeof e.stack, 1);
	}
})();











/**
 * 2.[Javascript core]: 常用工具函数扩展
 */
Jet().$package(function(J){
	var isUndefined,
		isNull,
		isNumber,
		isString,
		isBoolean,
		isObject,
		isArray,
		isArguments,
		isFunction,
		$typeof,
		
		$return,
		$try,
		
		emptyFunc,
		
		random,
		extend,
		clone,
		now,
		timedChunk,

		getLength,


		rebuild,
		pass,
		bind,
		bindNoEvent,

		

		
		Class;

	/**
	 * 判断变量的值是否是 undefined
	 * Determines whether or not the provided object is undefined
	 * 
	 * @method isUndefined
	 * @memberOf Jet.prototype
	 * 
	 * @param {Mixed} o 传入被检测变量的名称
	 * @return {Boolean} 当 o 的值是 undefined 时返回 true
	 */
	isUndefined = function(o) {
		return typeof(o) === "undefined";
	};
		
	/**
	 * 判断变量的值是否是 null
	 * Determines whether or not the provided object is null
	 * 
	 * @method isNull
	 * @memberOf Jet.prototype
	 * 
	 * @param {Mixed} o 传入被检测变量的名称
	 * @return {Boolean} 当 o 的值是 null 时返回 true
	 */
	isNull = function(o) {
		return o === null;
	};
	
	/**
	 * 判断变量的类型是否是 Number
	 * Determines whether or not the provided object is a number
	 * 
	 * @memberOf Jet.prototype
	 * @method isNumber
	 * 
	 * @param {Mixed} o 传入被检测变量的名称
	 * @return {Boolean} 当 o 的类型是 number 时返回 true
	 */
	isNumber = function(o) {
		return (o === 0 || o) && o.constructor === Number;
	};
	
	/**
	 * 判断变量的类型是否是 Boolean
	 * Determines whether or not the provided object is a boolean
	 * 
	 * 
	 * @method isBoolean
	 * @memberOf Jet.prototype
	 * 
	 * @static
	 * @param {Mixed} o 传入被检测变量的名称
	 * @return {Boolean} 当 o 的类型是 boolean 时返回 true
	 */
	isBoolean = function(o) {
		return (o === false || o) && (o.constructor === Boolean);
	};
	
	/**
	 * 判断变量的类型是否是 String
	 * Determines whether or not the provided object is a string
	 * 
	 * 
	 * @method isString
	 * @memberOf Jet.prototype
	 * 
	 * @static
	 * @param {Mixed} o 传入被检测变量的名称
	 * @return {Boolean} 当 o 的类型是 string 时返回 true
	 */
	isString = function(o) {
		return (o === "" || o) && (o.constructor === String);
	};
	
	/**
	 * 判断变量的类型是否是 Object
	 * Determines whether or not the provided object is a object
	 * 
	 * 
	 * @method isObject
	 * @memberOf Jet.prototype
	 * 
	 * @param {Mixed} o 传入被检测变量的名称
	 * @return {Boolean} 当 o 的类型是 object 时返回 true
	 */
	isObject = function(o) {
		return (o && (o.constructor === Object))
			|| (String(o)==="[object Object]");
	};
	
	/**
	 * 判断变量的类型是否是 Array
	 * Determines whether or not the provided object is a array
	 * 
	 * 
	 * @method isArray
	 * @memberOf Jet.prototype
	 * 
	 * @param {Mixed} o 传入被检测变量的名称
	 * @return {Boolean} 当 o 的类型是 array 时返回 true
	 */
	isArray = function(o) {
		return o && (o.constructor === Array);
	};
	
	/**
	 * 判断变量的类型是否是 Arguments
	 * Determines whether or not the provided object is a arguments
	 * 
	 * 
	 * @method isArguments
	 * @memberOf Jet.prototype
	 * 
	 * @param {Mixed} o 传入被检测变量的名称
	 * @return {Boolean} 当 o 的类型是 arguments 时返回 true
	 */
	isArguments = function(o) {
		return o && o.callee && isNumber(o.length) ? true : false;
	};
	
	/**
	 * 判断变量的类型是否是 Function
	 * Determines whether or not the provided object is a function
	 * 
	 * 
	 * @method isFunction
	 * @memberOf Jet.prototype
	 * 
	 * @param {Mixed} o 传入被检测变量的名称
	 * @return {Boolean} 当 o 的类型是 function 时返回 true
	 */
	isFunction = function(o) {
		return o && (o.constructor === Function);
	};
	
	/**
	 * 判断变量类型的方法
	 * Determines the type of object
	 * 
	 * 
	 * @method $typeof
	 * @memberOf Jet.prototype
	 * 
	 * @param {Mixed} o 传入被检测变量的名称
	 * @return {String} 返回变量的类型，如果不识别则返回 other
	 */
	$typeof = function(o) {
		if(isUndefined(o)){
			return "undefined";
		}else if(isNull(o)){
			return "null";
		}else if(isNumber(o)){
			return "number";
		}else if(isBoolean(o)){
			return "boolean";
		}else if(isString(o)){
			return "string";
		}else if(isObject(o)){
			return "object";
		}else if(isArray(o)){
			return "array";
		}else if(isArguments(o)){
			return "arguments";
		}else if(isFunction(o)){
			return "function";
		}else{
			return "other";
		}
		
	};
	
	/**
	 * 生成随机数的方法
	 * 
	 * @method random
	 * @memberOf Jet.prototype
	 * 
	 * @param {Number} min 生成随机数的最小值
	 * @param {Number} max 生成随机数的最大值
	 * @return {Number} 返回生成的随机数
	 */
	random = function(min, max){
		return Math.floor(Math.random() * (max - min + 1) + min);
	};
	
	
	
	/**
	 * 克隆一个对象
	 * 
	 * @method clone
	 * @memberOf Jet.prototype
	 * 
	 * @param {Object} o 要克隆的对象
	 * @return {Object} 返回通过克隆创建的对象
	 * 
	 * @example
	 * Jet().$package(function(J){
	 * 	var objA = {name: "Kinvix"};
	 * 	// 克隆一个 objA 对象，并存入 objB 中。
	 * 	var objB = J.clone(objA);
	 * };
	 */
	clone = function(o){
		var tempClass = function(){};
		tempClass.prototype = o;
		
		// 返回新克隆的对象
		return (new tempClass());
	};

	

	

	
	
	
	/**
	 * 生成一个返回值是传入的 value 值的函数
	 * 
	 * @method $return
	 * @memberOf Jet.prototype
	 * 
	 * @param {Mixed} value 要返回的值
	 * @return {Mixed} 返回一个返回值是 value 的函数
	 */
	$return = function(result){
		return J.isFunction(result) ? result : function(){
				return result;
			};
	};
	
	/**
	 * 从第一个函数开始try，直到尝试出第一个可以成功执行的函数就停止继续后边的函数，并返回这个个成功执行的函数结果
	 * 
	 * @method $try
	 * @memberOf Jet.prototype
	 * 
	 * @param {Function} fn1, fn2, .... 要尝试的函数
	 * @return {Mixed} 返回第一个成功执行的函数的返回值
	 * 
	 * @example
	 * Jet().$package(function(J){
	 * 	// 按顺序执行 funcA, funcB, funcC，当中途有一个 func 的执行结果返回 true 则不再往下执行，并返回成功执行的 func 的返回值；
	 * 	J.$try(funcA, funcB, funcC);
	 * };
	 */
	$try = function(){
		var i,
			l = arguments.length,
			result;
			
		for(i = 0; i < l; i++){
			try{
				result = arguments[i]();
				// 如果上边语句执行成功则执行break跳出循环
				break;
			}catch(e){
				J.out("C.错误：[" + e.name + "] "+e.message+", " + e.fileName+", 行号:"+e.lineNumber+"; stack:"+typeof e.stack, 2);
			}
		}
		return result;
	};
	
	/**
	 * 对一个对象或数组进行扩展
	 * 
	 * @method extend
	 * @memberOf Jet.prototype
	 * 
	 * @param {Mixed} beExtendObj 被扩展的对象或数组
	 * @param {Mixed} extendObj1, extendObj2, .... 用来参照扩展的对象或数组
	 * @return {Mixed} 返回被扩展后的对象或数组
	 * 
	 * @example
	 * Jet().$package(function(J){
	 * 	// 用 objB 和objC 扩展 objA 对象；
	 * 	J.extend(objA, objB, objC);
	 * };
	 * 
	 */
	extend = function(beExtendObj, extendObj1, extendObj2){
    	var a = arguments,
    		i,
    		p,
    		beExtendObj,
    		extendObj;
    		
    	if(a.length === 1){
    		beExtendObj = this;
    		i=0;
    	}else{
    		beExtendObj = a[0] || {};
    		i=1;
    	}
    	
    	for(; i<arguments.length; i++){
    		extendObj = arguments[i];
			for(p in extendObj){
				var src = beExtendObj[p],
					obj = extendObj[p];
				if ( src === obj ){
					continue;
				}
				
				if ( obj && isObject(obj) && !obj.nodeType && !isFunction(obj)){
					src = beExtendObj[p] = {};
					src = extend( beExtendObj[p], 
						// Never move original objects, clone them
						obj || ( obj.length != null ? [ ] : { } ));

				// Don't bring in undefined values
				}else if ( obj !== undefined ){
					beExtendObj[p] = obj;
				}
			}
    	}

		return beExtendObj;
    };
    
    
    /*
	extend = function(beExtendObj, target, extendObj2) {
		
		// copy reference to target object
		var target = arguments[0] || {}, 
		i = 2, 
		length = arguments.length, 
		options;
	
	
		target = arguments[1] || {};


	
		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !J.isFunction(target) ){
			target = {};
		}
		// extend jQuery itself if only one argument is passed
		if ( length == i ) {
			target = this;
			--i;
		}
	
		for ( ; i < length; i++ ){
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ){
				// Extend the base object
				for ( var name in options ) {
					var src = target[ name ], 
						copy = options[ name ];
	
					// Prevent never-ending loop
					if ( target === copy ){
						continue;
					}
					// Recurse if we're merging object values
					if ( copy && typeof copy === "object" && !copy.nodeType ){
						target[ name ] = extend( target, 
							// Never move original objects, clone them
							src || ( copy.length != null ? [ ] : { } )
						, copy );
	
					// Don't bring in undefined values
					}else if ( copy !== undefined ){
						target[ name ] = copy;
					}
				}
			}
		}
		// Return the modified object
		return target;
	};
    */
    
    /**
	 * 获取当前时间的函数
	 * 
	 * @method now
	 * @memberOf Jet.prototype
	 * 
	 * 
	 * 
	 * @example
	 * alert(J.now());
	 * 
	 */
    now = function(){
		return +new Date;
	}
	
    
	/**
	 * 通用分时处理函数
	 * 
	 * @method timedChunk
	 * @memberOf Jet.prototype
	 * 
	 * 
	 * 
	 * @example
	 * Jet().$package(function(J){
	 * };
	 * 
	 */
    timedChunk = function(items, process, context, isShift, callback) {
        var todo = items.concat(), delay = 25;
        if(isShift){
        	todo = items;
        }
 
        window.setTimeout(function() {
            var start = +new Date();
 
            do {
                process.call(context, todo.shift());
            } while(todo.length > 0 && (+new Date() - start < 50));
 
            if(todo.length > 0) {
                window.setTimeout(arguments.callee, delay);
            } else if(callback) {
                callback(items);
            }
 
        }, delay);
    }
    

	
	/**
	 * 获取对象自身具有的属性和方法的数量
	 * 
	 * @method getLength
	 * @memberOf Jet.prototype
	 * 
	 * @param {Object} obj 要获取的对象
	 * @return {Number} 返回对象自身具有属性和方法的数量
	 */
	getLength = function(obj) {
		var p,
			count = 0;
		for(p in obj){
			if(obj.hasOwnProperty(p)){
				count++;
			}
		}
		return count;
	};
	
	/**
	 * 一个空函数函数
	 * 
	 * @memberOf Jet.prototype
	 */
    emptyFunc = function(){};
    


		
	/**
	 * 函数的重构方法
	 * 
	 * 
	 * @private
	 * @memberOf Jet.prototype
	 * @param {Object} option 选项对象
	 * @return {Function} 返回重构后的函数的执行结果
	 */
	rebuild = function(func, option){
		option = option || {};
		
		func.$$rebuildedFunc = func.$$rebuildedFunc || function(){
			var self2 = this,
				scope,
				args,
				returns;
			scope = option.contextObj || self2;
			args = Array.prototype.slice.call(arguments, 0);

			if(args !== undefined){
				args = args.concat(option.arguments);
			}
			if(option.event === false){
				args = args.slice(1);
			}

			return func.apply(scope, args);
		};

		return func.$$rebuildedFunc;
	};
	
	/**
	 * 给函数传入参数并执行
	 * 
	 * @memberOf Jet.prototype
	 * @param {Mixed} args 参数列表
	 * @return {Mixed} 返回函数执行结果
	 * 
	 * @example
	 * Jet().$package(function(J){
	 * 	// 将"a"、"b"两个字符串传入funcA函数并执行
	 * 	funcA.pass("a","b");
	 * };
	 * 
	 */
	pass = function(func, var_args) {
		var slice = Array.prototype.slice;
		var a = slice.call(arguments, 1);
		return function(){
			var context = this;
			return func.apply(context, a.concat(slice.call(arguments)));
		};
	};
	/*
	pass = function(func){
		var args = Array.prototype.slice.call(arguments, 1);
		return rebuild(func, {contextObj: null, arguments: args});
	};
	*/
	
	/**
	 * 给函数绑定一个上下文对象再执行
	 * 
	 * @memberOf Jet.prototype
	 * @param {Object} contextObj 要绑定的上下文对象
	 * @param {Mixed} args 参数列表
	 * @return {Mixed} 返回函数执行结果
	 * 
	 * @example
	 * Jet().$package(function(J){
	 * 	// 以 contextObjB 对象为上下文对象 this 来执行funcA函数
	 * 	funcA.bind(contextObjB);
	 * };
	 * 
	 */
	/*
	bind = function(func, contextObj){
		var args = Array.prototype.slice.call(arguments, 2);
		//args = [this].extend(args);
		return rebuild(func, {contextObj: contextObj, arguments: args});
	};
	*/
	
	/**
	 * 将一个函数绑定给一个对象作方法，返回的函数将总被传入{@code obj} as {@code this}
	 * 
	 * @memberOf Jet.prototype
	 * @param {Function} func 要绑定的函数
	 * @param {Object} contextObj 要绑定的对象
	 * @param {Mixed} args 参数列表，长度任意
	 * @return {Function} 返回一个被绑定this上下文对象的函数
	 * 
	 * @example
	 * Jet().$package(function(J){
	 *   funcB = J.bind(funcA, obj, a, b)
	 *   funcB(c, d) // 相当于执行 funcA.call(obj, a, b, c, d)
	 * };
	 */
	
	bind = function(func, context, var_args) {
		var slice = Array.prototype.slice;
		var a = slice.call(arguments, 2);
		return function(){
			return func.apply(context, a.concat(slice.call(arguments)));
		};
	};
	


	
	

	
	
	/**
	 * 创建Class类的类
	 * 
	 * @class Class
	 * @param {Object} option = {extend: superClass} 在option对象的extend属性中指定要继承的对象，可以不写
	 * @param {Object} object 扩展的对象
	 * @return {Object} 返回生成的日期时间字符串
	 * 
	 * @example
	 * Jet().$package(function(J){
	 * 	var Person = new J.Class({
	 *  	init : function(name){
	 *  		this.name = name;
	 *  		alert("init");
	 *  	},
	 *  	showName : function(){
	 *  		alert(this.name);
	 *  
	 *  	}
	 *  
	 *  });
	 *  
	 *  // 继承Person
	 * 	var Person2 = new J.Class({extend : Person}, {
	 *  	init : function(name){
	 *  		this.name = name;
	 *  		alert("init");
	 *  	},
	 *  	showName : function(){
	 *  		alert(this.name);
	 *  
	 *  	}
	 *  
	 *  });
	 * 	
	 * };
	 * 
	 */
	Class = function(){
		var length = arguments.length;
		var option = arguments[length-1];
		
		option.init = option.init || function(){};
		
		// 如果参数中有要继承的父类
		if(length === 2){
			/**
			 * @ignore
			 */
			var superClass = arguments[0].extend;
			
			/**
			 * @ignore
			 */
			var tempClass = function() {};
			tempClass.prototype = superClass.prototype;
			
			/**
			 * @ignore
			 */
			var subClass = function() {
				this.init.apply(this, arguments);
			}
			
			// 加一个对父类原型引用的静态属性
			subClass.superClass = superClass.prototype;
			
			// 指定原型
			subClass.prototype = new tempClass();
			
			// 重新指定构造函数
			subClass.prototype.constructor = subClass;
			
			J.extend(subClass.prototype, option);
			
			// 重载init方法，插入对父类init的调用
			subClass.prototype.init = function(){
				// 调用父类的构造函数
				// subClass.superClass.init.apply(this, arguments);
				// 调用此类自身的构造函数
				option.init.apply(this, arguments);
			};
			
			return subClass;
			
		// 如果参数中没有父类，则单纯构建一个类
		}else if(length === 1){
			/**
			 * @ignore
			 */
			var newClass = function() {
				this.init.apply(this, arguments);
			}
			newClass.prototype = option;
			return newClass;
		}
		
		
	};
	
	/*
	Class = function(obj){
		var tempClass = function() {
			this.init.apply(this, arguments);
		}
		tempClass.prototype = obj;
		return tempClass;
	};
	*/
	
	
	
	
	
	J.isUndefined = isUndefined;
	J.isNull = isNull;
	J.isNumber = isNumber;
	J.isString = isString;
	J.isBoolean = isBoolean;
	J.isObject = isObject;
	J.isArray = isArray;
	J.isArguments = isArguments;
	J.isFunction = isFunction;
	J.$typeof = $typeof;
	
	J.$return = $return;
	J.$try = $try;
	
	J.emptyFunc = emptyFunc;
	
	J.clone = clone;

	J.getLength = getLength;
	J.random = random;
	J.extend = extend;
	
	J.now = now;
	J.timedChunk = timedChunk;
	
	
	J.rebuild = rebuild;
	J.pass = pass;
	J.bind = bind;
	J.bindNoEvent = bindNoEvent;
	

	
	J.Class = Class;
	


});
















/**
 * 3.[Browser part]: Browser 资料分析包
 */
Jet().$package(function(J){
	J.browserOptions = {
		adjustBehaviors: true,
		htmlClass: true
	};
	//J.query = J.string.mapQuery(window.location.search);
	J.host = window.location.host;
	
	// 设置 domain
	// document.domain = 'kdv.cn';
	
	
	var pf = navigator.platform.toLowerCase(),
		ua = navigator.userAgent.toLowerCase(),
		plug = navigator.plugins,
		
		platform,
		browser,
		engine,

		toFixedVersion,
		s;
	
	/**
	 * @ignore
	 * @param String ver
	 * @param Number floatLength
	 * @return Number 
	 */
	toFixedVersion = function(ver, floatLength){
		floatLength = floatLength || 1;
		ver = String(ver).split(".");
		ver = ver[0] + "." + (ver[1] || "0");
		ver = Number(ver).toFixed(floatLength);
		return ver;
	};
	
	/**
	 * platform 名字空间
	 * 
	 * @namespace
	 * @name platform
	 * @type Object
	 */
	platform = {
		getPlatform:function(){
			return pf;
		},
		
		/**
		 * 操作系统的名称
		 * 
    	 * @property name
		 * @lends platform
		 */
		name: (window.orientation != undefined) ? 'iPod' : (pf.match(/mac|win|linux/i) || ['unknown'])[0],
		
		version: 0,
		
		/**
		 * 操作系统的版本号，如果是0表示不是此操作系统
		 * iPod touch
		 * Mozilla/5.0 (iPod; U; CPU iPhone OS 3_0 like Mac OS X; zh-cn) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16
		 * 
		 * @description {Num} 操作系统的版本号，如果是0表示不是此操作系统
		 * @constant
		 * @type Number
		 */
		iPod: 0,
		
		/**
		 * 操作系统的版本号，如果是0表示不是此操作系统
		 * Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) version/4.0.4 Mobile/7B367 Safari/531.21.10
		 * 
		 * @description {Num} 操作系统的版本号，如果是0表示不是此操作系统
		 * @constant
		 * @type Number
		 */
		iPad:0,
		
		/**
		 * 操作系统的版本号，如果是0表示不是此操作系统
		 * Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0_1 like Mac OS X; zh-cn) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A400 Safari/528.16
		 * 
		 * @description {Num} 操作系统的版本号，如果是0表示不是此操作系统
		 * @constant
		 * @type Number
		 */
		iPhone:0,
		
		
		/**
		 * 操作系统的版本号，如果是0表示不是此操作系统
		 * Mozilla/5.0 (Linux; U; Android 2.0; en-us; Droid Build/ESD20) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17
		 * 
		 * @description {Num} 操作系统的版本号，如果是0表示不是此操作系统
		 * @constant
		 * @type Number
		 */
		android:0,
		
		
		
		/**
		 * 操作系统的版本号，如果是0表示不是此操作系统
		 * 
		 * 
		 * @description {Num} 操作系统的版本号，如果是0表示不是此操作系统
		 * @constant
		 * @type Number
		 */
		win: 0,
		
		/**
		 * 操作系统的版本号，如果是0表示不是此操作系统
		 * 
		 * 
		 * @description {Num} 操作系统的版本号，如果是0表示不是此操作系统
		 * @constant
		 * @type Number
		 */
		linux: 0,
		
		/**
		 * 操作系统的版本号，如果是0表示不是此操作系统
		 * 
		 * 
		 * @description {Num} 操作系统的版本号，如果是0表示不是此操作系统
		 * @constant
		 * @type Number
		 */
		mac: 0,
		
		/**
		 * 设置浏览器类型和版本
		 * 
		 * @ignore
		 * @private
		 * @memberOf browser
		 * 
		 */
		set: function(name, ver){
			this.name = name;
			this.version = ver;
			this[name] = ver;
		}
	};
	
	platform[platform.name] = true;
	
	// 探测操作系统版本
    (s = ua.match(/windows ([\d.]+)/)) ? platform.set("win",toFixedVersion(s[1])):
    (s = ua.match(/windows nt ([\d.]+)/)) ? platform.set("win",toFixedVersion(s[1])):
    (s = ua.match(/linux ([\d.]+)/)) ? platform.set("linux",toFixedVersion(s[1])) :
    (s = ua.match(/mac ([\d.]+)/)) ? platform.set("mac",toFixedVersion(s[1])):
    (s = ua.match(/ipod ([\d.]+)/)) ? platform.set("iPod",toFixedVersion(s[1])):
    (s = ua.match(/ipad ([\d.]+)/)) ? platform.set("iPad",toFixedVersion(s[1])):
    (s = ua.match(/iphone ([\d.]+)/)) ? platform.set("iPhone",toFixedVersion(s[1])):
    (s = ua.match(/android ([\d.]+)/)) ? platform.set("android",toFixedVersion(s[1])) : 0;
	
	/**
	 * browser 名字空间
	 * 
	 * @namespace
	 * @name browser
	 */
	browser = {
		/**
    	 * @namespace
    	 * @name features
		 * @memberOf browser
		 */
		features: 
		/**
		 * @lends browser.features
		 */	
		{
			/**
	    	 * @property xpath
			 */
			xpath: !!(document.evaluate),
			
			/**
	    	 * @property air
			 */
			air: !!(window.runtime),
			
			/**
	    	 * @property query
			 */
			query: !!(document.querySelector)
		},
		
		/**
		 * 获取浏览器的插件信息
		 * 
		 */
		getPlugins: function(){
			return plug;
		},
		
		/**
    	 * @namespace
    	 * @name plugins
		 * @memberOf browser
		 */
		plugins: {
			flash: (function(){
				var ver = "none";
				if (plug && plug.length) {
				    flash = plug['Shockwave Flash'];
				    if (flash && flash.description) {
				    	ver = toFixedVersion(flash.description.match(/\b(\d+)\.\d+\b/)[1], 1) || ver;
				    }
				} else {
					var startVer = 13;
				    while (startVer--) {
				        try {
				            new ActiveXObject('ShockwaveFlash.ShockwaveFlash.' + startVer);
				            ver = toFixedVersion(startVer);
				            break;
				        } catch(e) {}
				    }
				}
				
				return ver;
			})()
		},
		
		
		
		/**
		 * 获取浏览器的userAgent信息
		 * 
		 * @memberOf browser
		 */
		getUserAgent: function(){
			return ua;
		},
		
		/**
		 * 用户使用的浏览器的名称，如：chrome
		 * 
		 * 
		 * @description {String} 用户使用的浏览器的名称，如：chrome
		 * @type Number
		 */
		name: "unknown",
		
		/**
    	 * @property version
		 * @lends browser
		 */
		version: 0,
		
		/**
		 * 用户使用的浏览器的版本号，如果是0表示不是此浏览器
		 * 
		 * 
		 * @description {Number} 用户使用的浏览器的版本号，如果是0表示不是此浏览器
		 * @type Number
		 */
		ie: 0,
		
		/**
		 * 用户使用的浏览器的版本号，如果是0表示不是此浏览器
		 * 
		 * 
		 * @description {Number} 用户使用的浏览器的版本号，如果是0表示不是此浏览器
		 * @type Number
		 */
		firefox: 0,
		
		/**
		 * 用户使用的浏览器的版本号，如果是0表示不是此浏览器
		 * 
		 * 
		 * @description {Number} 用户使用的浏览器的版本号，如果是0表示不是此浏览器
		 * @type Number
		 */
		chrome: 0,
		
		
		/**
		 * 用户使用的浏览器的版本号，如果是0表示不是此浏览器
		 * 
		 * 
		 * @description {Number} 用户使用的浏览器的版本号，如果是0表示不是此浏览器
		 * @type Number
		 */
		opera: 0,
		
		/**
		 * 用户使用的浏览器的版本号，如果是0表示不是此浏览器
		 * 
		 * 
		 * @description {Number} 用户使用的浏览器的版本号，如果是0表示不是此浏览器
		 * @type Number
		 */
		safari: 0,
		
		/**
		 * 设置浏览器类型和版本
		 * 
		 * @ignore
		 * @private
		 * @memberOf browser
		 * 
		 */
		set: function(name, ver){
			this.name = name;
			this.version = ver;
			this[name] = ver;
		}
	};
	
	// 探测浏览器并存入 browser 对象
    (s = ua.match(/msie ([\d.]+)/)) ? browser.set("ie",toFixedVersion(s[1])):
    (s = ua.match(/firefox\/([\d.]+)/)) ? browser.set("firefox",toFixedVersion(s[1])) :
    (s = ua.match(/chrome\/([\d.]+)/)) ? browser.set("chrome",toFixedVersion(s[1])) :
    (s = ua.match(/opera.([\d.]+)/)) ? browser.set("opera",toFixedVersion(s[1])) :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? browser.set("safari",toFixedVersion(s[1])) : 0;
    
    //J.out(browser.name);
    //J.out(browser.ua);
    
    //!!navigator.userAgent.match(/Apple.*Mobile.*Safari/);
	
	/**
	 * engine 名字空间
	 * 
	 * @namespace
	 * @name engine
	 * @memberOf browser
	 */
	engine = {
		/**
		 * 浏览器的引擎名字
		 * 
		 * @memberOf browser.engine
		 */
		name: 'unknown',
		
		/**
		 * 浏览器的引擎版本
		 * 
		 * @memberOf browser.engine
		 */
		version: 0,
		
		/**
		 * trident 引擎的版本，0表示非此引擎
		 * 
		 * @lends browser.engine
		 */
		trident: 0,
		
		/**
		 * gecko 引擎的版本，0表示非此引擎
		 * 
		 * @lends browser.engine
		 * 
		 */
		gecko: 0,
		
		/**
		 * webkit 引擎的版本，0表示非此引擎
		 * 
		 * @lends browser.engine
		 */
		webkit: 0,
		
		/**
		 * presto 引擎的版本，0表示非此引擎
		 * 
		 * @lends browser.engine
		 * @property presto
		 */
		presto: 0,
		
		/**
		 * 设置浏览器引擎的类型和版本
		 * 
		 * @ignore
		 * @private
		 * @memberOf browser.engine
		 * 
		 */
		set: function(name, ver){
			this.name = name;
			this.version = ver;
			this[name] = ver;
		}
		
	};
	
	/*
	// 探测浏览器的内核并存入 browser.engine 对象
    (s = (!window.ActiveXObject) ? 0 : ((window.XMLHttpRequest) ? 5 : 4)) ? engine.set("trident", s):
    (s = (document.getBoxObjectFor == undefined) ? 0 : ((document.getElementsByClassName) ? 19 : 18)) ? engine.set("gecko",s) :
    (s = (navigator.taintEnabled) ? false : ((browser.features.xpath) ? ((browser.features.query) ? 525 : 420) : 419)) ? engine.set("webkit", s) :
    (s = (!window.opera) ? false : ((arguments.callee.caller) ? 960 : ((document.getElementsByClassName) ? 950 : 925))) ? engine.set("presto", s) : 0;
    */
	
    // 探测浏览器的内核并存入 browser.engine 对象
	
    (s = ua.match(/trident\/([\d.]+)/)) ? engine.set("trident",toFixedVersion(s[1])):
    (s = ua.match(/gecko\/([\d.]+)/)) ? engine.set("gecko",toFixedVersion(s[1])) :
    (s = ua.match(/applewebkit\/([\d.]+)/)) ? engine.set("webkit",toFixedVersion(s[1])) :
    (s = ua.match(/presto\/([\d.]+)/)) ? engine.set("presto",toFixedVersion(s[1])) : 0;
    
	if(browser.ie){
		if(browser.ie == 6){
			engine.set("trident", toFixedVersion("4"));
		}else if(browser.ie == 7 || browser.ie == 8){
			engine.set("trident", toFixedVersion("5"));
		}
	}
    
    
    /**
	 * 调整浏览器行为
	 * 
	 * @ignore
	 */
	var adjustBehaviors = function() {
		// ie6 背景图片不能被缓存的问题
		if (browser.ie && browser.ie < 7) {
			try {
				document.execCommand('BackgroundImageCache', false, true);
			}catch(e){
				//J.out("错误：[" + e.name + "] "+e.message+", " + e.fileName+", 行号:"+e.lineNumber+"; stack:"+typeof e.stack, 2);
			}
		}
	}
	
	if(J.browserOptions.adjustBehaviors){
		 adjustBehaviors();
	}
	
	var filterDot = function(string){
		//return J.string.replaceAll(string, "\.", "_");
		return String(string).replace(/\./gi,"_");
	};
	
	// 给html标签添加不同浏览器的参数className
	var addHtmlClassName = function() {
		var htmlTag = document.documentElement;
    	var htmlClassName = [htmlTag.className];
    	htmlClassName.push('javascriptEnabled');
    	htmlClassName.push(platform.name);
    	htmlClassName.push(platform.name + filterDot(platform.version));
    	htmlClassName.push(browser.name);
    	htmlClassName.push(browser.name + filterDot(browser.version));
    	htmlClassName.push(engine.name);
    	htmlClassName.push(engine.name + filterDot(engine.version));
    	if(browser.plugins.flash){
    		htmlClassName.push("flash");
    		htmlClassName.push("flash" + filterDot(browser.plugins.flash));
    	}
    	htmlTag.className = htmlClassName.join(' ');
	}

	
    if(J.browserOptions.htmlClass){
    	addHtmlClassName();
    }
    
    



	
	
	
	
	
	
	
	

	
	J.platform = platform;
	J.browser = browser;
	J.browser.engine = engine;

	

	
});














/**
 * 4.[Browser part]: dom 扩展包
 */
Jet().$package(function(J){
	var $D,
		$B,
		id,
		name,
		tagName,
		getText,
		getAttributeByParent,
		node,
		setClass,
		getClass,
		hasClass,
		addClass,
		removeClass,
		toggleClass,
		replaceClass,
		setStyle,
		getStyle,
		setCssText,
		getCssText,
		addCssText,
		show,
		isShow,
		recover,
		hide,
		
		
		getScrollHeight,
		getScrollWidth,
		getClientHeight,
		getClientWidth,
		getOffsetHeight,
		getOffsetWidth,
		
		getScrollLeft,
		getScrollTop,
		getClientXY,
		setClientXY,
		getXY,
		setXY,
		getRelativeXY,
		
		getSelection,
		getSelectionText,
		getTextFieldSelection,
		
	
		getDoc,
		getWin,
		w,
		getDocumentElement;
	/**
	 * dom 名字空间
	 * 
	 * @namespace
	 * @name dom
	 * @type Object
	 */
	J.dom = J.dom || {};
	$D = J.dom;
	$B = J.browser;
	
		

	// find targeted window and @TODO create facades
	w = ($D.win) ? ($D.win.contentWindow) : $D.win  || window;
	$D.win = w;
	$D.doc = w.document;
	
	/**
	 * 获取DocumentElement
	 * 
	 * @memberOf dom
	 */
	getDocumentElement = function(){
		if(document.compatMode === 'CSS1Compat'){
			return document.documentElement;
		}else{
			return document.body;
		}
		
	};
	
	/**
	 * 获取元素所属的根文档
	 * 
	 * @memberOf dom
	 */
	getDoc = function(element) {
		element = element || window.document;
		return (element["nodeType"] === 9) ? element : element["ownerDocument"]
			|| $D.doc;
	};
	
	/**
	 * 获取元素所属的 window 对象
	 * returns the appropriate window.
	 * 
	 * @memberOf dom
	 * @private
	 * @param {HTMLElement} element optional Target element.
	 * @return {Object} The window for the given element or the default window. 
	 */
	getWin = function(element) {
		var doc = getDoc(element);
		return (element.document) ? element : doc["defaultView"] ||
			doc["parentWindow"] || $D.win;
	};
	
	/**
	 * 
	 * 根据 id 获取元素
	 * 
	 * @method id
	 * @memberOf dom
	 * 
	 * @param {String} id 元素的 id 名称
	 * @param {Element} doc 元素所属的文档对象，默认为当前文档
	 * @return {Element} 返回元素
	 * 
	 * @example
	 * 
	 * 
	 */
	id = function(id, doc) {
		return getDoc(doc).getElementById(id);
	};
	
	/**
	 * 
	 * 根据 name 属性获取元素
	 * 
	 * @memberOf dom
	 * 
	 * @param {String} name 元素的 name 属性
	 * @param {Element} doc 元素所属的文档对象，默认为当前文档
	 * @return {Element} 返回元素
	 */
	name = function(name, doc) {
		var el = doc;
		return getDoc(doc).getElementsByName(name);
	};
	
	/**
	 * 
	 * 根据 tagName 获取元素
	 * 
	 * @memberOf dom
	 * 
	 * @param {String} tagName 元素的 tagName 标签名
	 * @param {Element} doc 元素所属的文档对象，默认为当前文档
	 * @return {Element} 返回元素
	 */
	tagName = function(tagName, el) {
		var el = el || getDoc();
		return el.getElementsByTagName(tagName);
	};
	
	/**
	 * 获取元素中的文本内容
	 * Returns the text content of the HTMLElement. 
	 * 
	 * @memberOf dom
	 * @param {HTMLElement} element The html element. 
	 * @return {String} The text content of the element (includes text of any descending elements).
	 */
	getText = function(element) {
		var text = element ? element[TEXT_CONTENT] : '';
		if (text === UNDEFINED && INNER_TEXT in element) {
			text = element[INNER_TEXT];
		} 
		return text || '';
	};
	
	
	/**
	 * 从起始元素查找某个属性，直到找到，或者到达顶层元素位置
	 * Returns the text content of the HTMLElement. 
	 * 
	 * @memberOf dom
	 * @param {HTMLElement} element The html element. 
	 * @return {String} The text content of the element (includes text of any descending elements).
	 */
	getAttributeByParent = function(attribute, startNode,  topNode){
		var jumpOut = false;
		var el = startNode;
		var result;
		do{
			result = el.getAttribute(attribute);
			// 如果本次循环未找到result
			if(J.isUndefined(result) || J.isNull(result)){
				// 如果本次循环已经到了监听的dom
				if(el === topNode){
					jumpOut = true;
				}
				// 如果本次循环还未到监听的dom，则继续向上查找
				else {
					el = el.parentNode;
				}
			}
			// 如果找到了result
			else{
				jumpOut = true;
			}
		}
		while(!jumpOut);
		
		return result;
	};
	
	
	/** 
	 * 生成一个 DOM 节点
     * Generates an HTML element, this is not appended to a document
     * 
     * @memberOf dom
     * 
     * @param type {string} the type of element
     * @param attr {string} the attributes
     * @param win {Window} optional window to create the element in
     * @return {HTMLElement} the generated node
     */
    node = function(type, attrObj, win){
        var p,
        	w = win || $D.win,
        	d = w.document,
        	n = d.createElement(type);

        for (p in attrObj) {
        	var mapObj = {
        		"class":function(){
        			n.className = attrObj[p];
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
    
    


	/**
	 * 获取文档的 scroll 高度，即文档的实际高度
     * Returns the height of the document.
     * 
     * @method getDocumentHeight
     * @memberOf dom
     * 
     * @param {HTMLElement} element The html element. 
     * @return {Number} The height of the actual document (which includes the body and its margin).
     */
    getScrollHeight = function(el) {
        var scrollHeight;
    	if(el){
    		scrollHeight = el.scrollHeight;
    	}else{
    		scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    	}
        return scrollHeight || 0;
    };
    
    /**
     * 获取文档的 scroll 宽度，即文档的实际宽度
     * Returns the width of the document.
     * 
     * @method getDocumentWidth
     * @memberOf dom
     * 
     * @param {HTMLElement} element The html element. 
     * @return {Int} The width of the actual document (which includes the body and its margin).
     */
    getScrollWidth = function(el) {
        var scrollWidth;
    	if(el){
    		scrollWidth = el.scrollWidth;
    	}else{
    		scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
    	}
        return scrollWidth || 0;
    };

    /**
     * 获取当前视窗的高度
     * Returns the current height of the viewport.
     * 
     * @method getClientHeight
     * @memberOf dom
     * @return {Int} The height of the viewable area of the page (excludes scrollbars).
     */
    getClientHeight = function(el) {
    	var name = J.browser.engine.name;
    	el = el || getDocumentElement();
    	return el.clientHeight; // IE, Gecko
    };
    
    /**
     * 获取元素的client宽度
     * Returns the current width of the viewport.
     * @method getClientWidth
     * @memberOf dom
     * @param {Element} el 要获取client宽度的元素
     * @return {Number} 宽度值.
     */
    
    getClientWidth = function(el) {
    	var name = J.browser.engine.name;
    	el = el || getDocumentElement();
    	return el.clientWidth; // IE, Gecko
    };
    
    
    /**
     * 获取当前视窗的高度
     * Returns the current height of the viewport.
     * 
     * @method getOffsetHeight
     * @memberOf dom
     * @return {Int} The height of the viewable area of the page (excludes scrollbars).
     */
    getOffsetHeight = function(el) {
    	var name = J.browser.engine.name;
    	el = el || getDocumentElement();
    	return el.offsetHeight; 
    };
    
    /**
     * 获取元素的client宽度
     * Returns the current width of the viewport.
     * @method getOffsetWidth
     * @memberOf dom
     * @param {Element} el 要获取client宽度的元素
     * @return {Number} 宽度值.
     */
    getOffsetWidth = function(el) {
    	var name = J.browser.engine.name;
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
    getScrollLeft = function(el) {
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
    getScrollTop = function(el) {
        var scrollTop;
    	if(el){
    		scrollTop = el.scrollTop;
    	}else{
    		scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    	}
        return scrollTop || 0;
    };

    
    /**
	 * 
	 * 设置元素的class属性
	 * 
	 * @method setClass
	 * @memberOf dom
	 * 
	 * @param {Element} el 元素
	 * @param {String} className class 名称
	 */
    setClass = function(el, className){
    	el.className = className;
    };
    
    /**
	 * 
	 * 获取元素的class属性
	 * 
	 * @method getClass
	 * @memberOf dom
	 * 
	 * @param {Element} el 元素
	 * @param {String} className class 名称
	 */
    getClass = function(el){
    	return el.className;
    };

    /**
	 * 
	 * 判断元素是否含有 class
	 * 
	 * @method hasClass
	 * @memberOf dom
	 * 
	 * @param {Element} el 元素
	 * @param {String} className class 名称
	 */
    hasClass = function(el, className){
	    var re = new RegExp("(^|\\s)" + className + "(\\s|$)");
	    return re.test(el.className);
	};

	/**
	 * 
	 * 给元素添加 class
	 * 
	 * @method addClass
	 * @memberOf dom
	 * 
	 * @param {Element} el 元素
	 * @param {String} className class 名称
	 */
	addClass = function(el, className){
		if (!hasClass(el, className)){
			el.className = el.className + " " + className;
		}
	};

	/**
	 * 
	 * 给元素移除 class
	 * 
	 * @method addClass
	 * @memberOf dom
	 * 
	 * @param {Element} el 元素
	 * @param {String} className class 名称
	 */
    removeClass = function(el, className){
		el.className = el.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)'), '$1');
	};
    
	/*
	removeClass2 = function(el, className){
    	replaceClass(el, className, "");
    };
	*/
    
    
    /**
	 * 
	 * 对元素 class 的切换方法，即：如果元素用此class则移除此class，如果没有此class则添加此class
	 * 
	 * @method toggleClass
	 * @memberOf dom
	 * 
	 * @param {Element} el 元素
	 * @param {String} className class 名称
	 */
    toggleClass = function(el, className){
		return hasClass(el, className) ? removeClass(el, className) : addClass(el, className);
	};

	/**
	 * 
	 * 替换元素 oldClassName 为 newClassName
	 * 
	 * @method toggleClass
	 * @memberOf dom
	 * 
	 * @param {Element} el 元素
	 * @param {String} oldClassName 被替换的 class 名称
	 * @param {String} newClassName 要替换成的 class 名称
	 */
    replaceClass = function(el, oldClassName, newClassName){
    	removeClass(el, oldClassName);
    	addClass(el, newClassName);
    	//el.className = (" "+el.className+" ").replace(" "+oldClassName+" "," "+newClassName+" ");
    };
    /*
    replaceClass2 = function(el, oldClassName, newClassName){
    	var i,
    		tempClassNames = el.className.split(" ");
    		
		for(i=0; i<tempClassNames.length; i++){
			if(tempClassNames[i] === oldClassName){
				tempClassNames[i] = newClassName;
			}
		}
    	//J.out(tempClassNames);

    	el.className = tempClassNames.join(" ");
    };
    */
	
    /**
	 * 
	 * 设置元素的样式，css 属性需要用驼峰式写法，如：fontFamily
	 * 
	 * @method setStyle
	 * @memberOf dom
	 * 
	 * @param {Element} el 元素
	 * @param {String} styleName css 属性名称
	 * @param {String} value css 属性值
	 */
    setStyle = function(el, styleName, value){
		if(!el){
    		return;
    	}
    	
		var name = J.browser.name;
		if(styleName === "float" || styleName === "cssFloat"){
    		if(name === "ie"){
    			styleName = "styleFloat";
    		}else{
    			styleName = "cssFloat";
    		}
    	}
    	
    	//J.out(styleName);
    	
    	if(styleName === "opacity" && name === "ie"){
    		
    		el.style.filter = 'alpha(opacity=' + (value*100) + ')';
    		if(!el.style.zoom){
    			el.style.zoom = 1;
    		}
			return;
    	}
		el.style[styleName] = value;
    };
    
    /**
	 * 
	 * 获取元素的当前实际样式，css 属性需要用驼峰式写法，如：fontFamily
	 * 
	 * @method getStyle
	 * @memberOf dom
	 * 
	 * @param {Element} el 元素
	 * @param {String} styleName css 属性名称
	 * @return {String} 返回元素样式
	 */
    getStyle = function(el, styleName){
    	if(!el){
    		return;
    	}
    	
    	var win = getWin(el);
    	var name = J.browser.name;
    	//J.out(name);
		if(styleName === "float" || styleName === "cssFloat"){
    		if(name === "ie"){
    			styleName = "styleFloat";
    		}else{
    			styleName = "cssFloat";
    		}
    	}
    	if(styleName === "opacity" && name === "ie"){
    		var opacity = 1,
    			result = el.style.filter.match(/opacity=(\d+)/);
    		if(result && result[1]){
    			opacity = result[1]/100;
    		}
			return opacity;
    	}
    	
    	if(el.style[styleName]){
    		return el.style[styleName];
    	}else if(el.currentStyle){
    		//alert(el.currentStyle[styleName]);
    		return el.currentStyle[styleName];
    	}else if(win.getComputedStyle){
    		//J.out(win.getComputedStyle(el, null));
    		return win.getComputedStyle(el, null)[styleName];
    	}else if(document.defaultView && document.defaultView.getComputedStyle){
    		styleName = styleName.replace(/([/A-Z])/g, "-$1");
    		styleName = styleName.toLowerCase();
    		var style = document.defaultView.getComputedStyle(el, "");
    		return style && style.getPropertyValue(styleName);
    	}

    };
    
    
    
    
    /**
	 * 
	 * 给元素添加cssText
	 *  
	 * @method addCssText
	 * @memberOf dom
	 * 
	 * @param {Element} el 元素
	 * @param {String} cssText css 属性
	 */
    addCssText = function(el, cssText){
    	el.style.cssText += ';' + cssText;
    };
    
    /**
	 * 
	 * 给元素设置cssText
	 *  
	 * @method setCssText
	 * @memberOf dom
	 * 
	 * @param {Element} el 元素
	 * @param {String} cssText css 属性
	 */
    setCssText = function(el, cssText){
    	el.style.cssText = cssText;
    };
    /**
	 * 
	 * 获取元素的cssText
	 *  
	 * @method getCssText
	 * @memberOf dom
	 * 
	 * @param {Element} el 元素
	 */
    getCssText = function(el){
    	return el.style.cssText;
    };
    
    /**
	 * 
	 * 显示元素
	 * 
	 * @method show
	 * @memberOf dom
	 * 
	 * @param {Element} el 元素
	 * @param {String} displayStyle 强制指定以何种方式显示，如：block，inline，inline-block等等
	 */
    show = function(el, displayStyle){
    	var display;
    	var _oldDisplay = el.getAttribute("_oldDisplay");
    	
    	if(_oldDisplay){
    		display = _oldDisplay;
    	}else{
    		display = getStyle(el, "display");
    	}

    	if(displayStyle){
    		setStyle(el, "display", displayStyle);
    	}else{
	    	if(display === "none"){
	    		setStyle(el, "display", "block");
	    	}else{
	    		setStyle(el, "display", display);
	    	}
    	}
    };
    
    /**
	 * 
	 * 判断元素是否是显示状态
	 * 
	 * @method isShow
	 * @memberOf dom
	 * 
	 * @param {Element} el 元素
	 */
    isShow = function(el){
    	var display = getStyle(el, "display");
    	if(display === "none"){
    		return false;
    	}else{
    		return true;
    	}
    };
    
    /**
	 * 
	 * 还原元素原来的display属性
	 * 
	 * @method recover
	 * @memberOf dom
	 * 
	 * @param {Element} el 元素
	 */
    recover = function(el){
    	var display;
    	var _oldDisplay = el.getAttribute("_oldDisplay");
    	
    	if(_oldDisplay){
    		display = _oldDisplay;
    	}else{
    		display = getStyle(el, "display");
    	}
    	if(display === "none"){
    		setStyle(el, "display", "");
    	}else{
    		setStyle(el, "display", display);
    	}
    };
    
    /**
	 * 
	 * 隐藏元素
	 * 
	 * @method hide
	 * @memberOf dom
	 * 
	 * @param {Element} el 元素
	 */
    hide = function(el){
    	var display = getStyle(el, "display");
    	var _oldDisplay = el.getAttribute("_oldDisplay");
    	
    	if(!_oldDisplay){
    		if(display === "none"){
    			el.setAttribute("_oldDisplay", "");
    		}else{
    			el.setAttribute("_oldDisplay", display);
    		}
    	}
    	setStyle(el, "display", "none");
    };
	
    
    
    /**
	 * 获取对象坐标
	 *
	 * @method getClientXY
	 * @memberOf dom
	 * 
	 * @param {HTMLElement} el
	 * @return Array [top,left]
	 * @type Array
	 */
	getClientXY = function(el) {
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
				
				var _fix = J.browser.ie ? 2 : 0; //修正ie和firefox之间的2像素差异
				
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
	
	/**
	 * 设置dom坐标
	 * 
	 * @method setClientXY
	 * @memberOf dom
	 
	 * @param {HTMLElement} el
	 * @param {string|number} x 横坐标
	 * @param {string|number} y 纵坐标
	 */
	setClientXY = function(el, x, y) {
		x = parseInt(x) + getScrollLeft();
		y = parseInt(y) + getScrollTop();
		setXY(el, x, y);
	};

	/**
	 * 获取对象坐标
	 * 
	 * @method getXY
	 * @memberOf dom
	 *
	 * @param {HTMLElement} el
	 * @return Array [top,left]
	 * @type Array
	 */
	getXY = function(el) {
		var xy = getClientXY(el);

		xy[0] = xy[0] + getScrollLeft();
		xy[1] = xy[1] + getScrollTop();
		return xy;
	}

	/**
	 * 设置dom坐标
	 * @method setXY
	 * @memberOf dom
	 * 
	 * @param {HTMLElement} el
	 * @param {string|number} x 横坐标
	 * @param {string|number} y 纵坐标
	 */
	setXY = function(el, x, y) {
		var _ml = parseInt(getStyle(el, "marginLeft")) || 0;
		var _mt = parseInt(getStyle(el, "marginTop")) || 0;

		setStyle(el, "left", parseInt(x) - _ml + "px");
		setStyle(el, "top", parseInt(y) - _mt + "px");
	};
	
	/**
	 * 获取对象坐标
	 *
	 * @method getRelativeXY
	 * @memberOf dom
	 * 
	 * @param {HTMLElement} el
	 * @return Array [top,left]
	 * @type Array
	 */
	getRelativeXY = function(el, relativeEl) {
		var xyEl = getXY(el);
		var xyRelativeEl = getXY(relativeEl);
		var xy=[];
		
		xy[0] = xyEl[0] - xyRelativeEl[0];
		xy[1] = xyEl[1] - xyRelativeEl[1];
		return xy;
	}
	
	/**
	 * 获取选择的文本
	 *
	 * @method getSelectionText
	 * @memberOf dom
	 * 
	 * @param {Window} win
	 * @return {String} 返回选择的文本
	 */
	getSelectionText = function(win) {
		win = win || window;
		var doc = win.document;
		if (win.getSelection) {
			// This technique is the most likely to be standardized.
			// getSelection() returns a Selection object, which we do not document.
			return win.getSelection().toString();
		}else if (doc.getSelection) {
			// This is an older, simpler technique that returns a string
			return doc.getSelection();
		}else if (doc.selection) {
			// This is the IE-specific technique.
			// We do not document the IE selection property or TextRange objects.
			return doc.selection.createRange().text;
		}
	
	};


	/**
	 * FireFox 下获取 input 或者 textarea 中选中的文字
	 *
	 * @method getTextFieldSelection
	 * @memberOf dom
	 * 
	 * @param {HTMLElement} el
	 * @return {String} 返回选择的文本
	 */
	getTextFieldSelection = function(el) {
		if (el.selectionStart != undefined && el.selectionEnd != undefined) {
			var start = el.selectionStart;
			var end = el.selectionEnd;
			return el.value.substring(start, end);
		}else{
			return ""; // Not supported on this browser
		}
	
	};
	
	
	
	
	
	
    
    
    var scripts = tagName("script");
    for(var i=0; i<scripts.length; i++){
    	
    	if(scripts[i].getAttribute("hasJet")=="true"){
    		//J.out("hasJet: "+(scripts[i].getAttribute("hasJet")=="true"));
    		J.src = scripts[i].src;
    	}
    }
    if(!J.src){
    	J.src = scripts[scripts.length-1].src;
    }
	
	J.filename = J.src.replace(/(.*\/){0,}([^\\]+).*/ig,"$2");
	//J.out(J.src+" _ "+J.filename)
	J.path = J.src.split(J.filename)[0];
	
	
	$D.getDoc = getDoc;
	
	$D.id = id;
	$D.name = name;
	$D.tagName = tagName;
	$D.getText = getText;
	$D.getAttributeByParent = getAttributeByParent;
	$D.node = node;
	$D.setClass = setClass;
	$D.getClass = getClass;
	$D.hasClass = hasClass;
	
	$D.addClass = addClass;
	$D.removeClass = removeClass;
	$D.toggleClass = toggleClass;
	$D.replaceClass = replaceClass;
	
	$D.setStyle = setStyle;
	$D.getStyle = getStyle;
	
	$D.setCssText = setCssText;
	$D.getCssText = getCssText;
	$D.addCssText = addCssText;
	
	$D.show = show;
	$D.isShow = isShow;
	$D.recover = recover;
	$D.hide = hide;
	
	
	$D.getScrollLeft = getScrollLeft;
	$D.getScrollTop = getScrollTop;
	$D.getScrollHeight = getScrollHeight;
	$D.getScrollWidth = getScrollWidth;
	
	$D.getClientHeight = getClientHeight;
	$D.getClientWidth = getClientWidth;
	
	$D.getOffsetHeight = getOffsetHeight;
	$D.getOffsetWidth = getOffsetWidth;
	
	$D.getClientXY = getClientXY;
	$D.setClientXY = setClientXY;
	
	$D.getXY = getXY;
	$D.setXY = setXY;
	$D.getRelativeXY = getRelativeXY;
	$D.getSelection = getSelection;
	$D.getSelectionText = getSelectionText;
	
	$D.getTextFieldSelection = getTextFieldSelection;
	
	$D.getDocumentElement = getDocumentElement;
	
	
	
});


/**
 * 5.[Browser part]: event 扩展包
 */
Jet().$package(function(J){
	var $E,
		addEventListener,
		removeEventListener,
		onDomReady,
		isDomReady,
		Publish,
		addObserver,
		notifyObservers,
		removeObserver;
	/**
	 * event 名字空间
	 * 
	 * @namespace
	 * @name event
	 */
	J.event = J.event || {};
	
	$E = J.event;
	/*
	 	经典的彩蛋必备代码:老外称之为 Tweetable Konami code
		[上上下下左右左右BA]
		var k=[];
		addEventListener("keyup",function(e){ 
		   k.push(e.keyCode);
		   if(k.toString().indexOf("38,38,40,40,37,39,37,39,66,65")>=0){      
		       cheat();
		   }
		},true);
		
		什么不知道 Konami Code? 只能说明你没童年了 - -!
		http://en.wikipedia.org/wiki/Konami_Code
	 */
	
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
		addEventListener = function(element, eventType, handler) {
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
		removeEventListener = function(element, eventType, handler) {
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
		addEventListener = function(element, eventType, handler) {

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
					 * 按键 	键码
					 * 0 	48
					 * 1 	49
					 * 2 	50
					 * 3 	51
					 * 4 	52
					 * 5 	53
					 * 6 	54
					 * 7 	55
					 * 8 	56
					 * 9 	57
					 * 
					 * A 	65
					 * B 	66
					 * C 	67
					 * D 	68
					 * E 	69
					 * F 	70
					 * G 	71
					 * H 	72
					 * I 	73
					 * J 	74
					 * K 	75
					 * L 	76
					 * M 	77
					 * N 	78
					 * O 	79
					 * P 	80
					 * Q 	81
					 * R 	82
					 * S 	83
					 * T 	84
					 * U 	85
					 * V 	86
					 * W 	87
					 * X 	88
					 * Y 	89
					 * Z 	90
					 * 
					 * 
					 * 3.控制键键码值
					 * 按键			键码
					 * BackSpace	8
					 * Tab			9
					 * Clear		12
					 * Enter		13
					 * Shift		16
					 * Control		17
					 * Alt			18
					 * Cape Lock	20
					 * Esc			27
					 * Spacebar		32 
					 * Page Up		33
					 * Page Down	34
					 * End			35
					 * Home			36
					 * Left Arrow	37
					 * Up Arrow 	38
					 * Right Arrow	39
					 * Down Arrow	40
					 * Insert		45
					 * Delete		46
					 * 
					 * Num Lock		144
					 * 
					 * ;:			186
					 * =+			187
					 * ,<			188
					 * -_			189
					 * .>			190
					 * /?			191
					 * `~			192
					 * 
					 * [{			219
					 * \|			220
					 * }]			221
					 * ’"			222
					 * 
					 * 2.功能键键码值
					 * F1 	112
					 * F2 	113
					 * F3 	114
					 * F4 	115
					 * F5 	116
					 * F6 	117
					 * F7 	118
					 * F8 	119
					 * F9 	120
					 * F10 	121
					 * F11 	122
					 * F12 	123
					 * 
					 * 2.数字键盘上的键的键码值
					 * 按键 	键码
					 * 0 	96
					 * 1 	97
					 * 2 	98
					 * 3 	99
					 * 4 	100
					 * 5 	101
					 * 6 	102
					 * 7 	103
					 * 8 	104
					 * 9 	105
					 * 
					 * * 	106
					 * + 	107
					 * Enter108
					 * - 	109
					 * . 	110
					 * / 	111
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
	    removeEventListener = function(element, eventType, handler) {
	    	
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
	
	
	
	
	
	
	
	
	
	/**
	 * 
	 * 文档加载完成时事件监听器
	 * 
	 * @method onDomReady
	 * @memberOf event
	 * 
	 * @param element 元素
	 * @param eventType 事件类型，不含on
	 * @param handler 事件处理器
	 */
	onDomReady = function( f ) {
	    // If the DOM is already loaded, execute the function right away
	    if ( onDomReady.done ) {
	    	return f();
	    }
	
	    // If we’ve already added a function
	    if ( onDomReady.timer ) {
	        // Add it to the list of functions to execute
	        onDomReady.ready.push( f );
	    } else {
	        // 初始化onDomReady后要执行的function的数组
	        onDomReady.ready = [ f ];
	        
	        // Attach an event for when the page finishes  loading,
	        // just in case it finishes first. Uses addEvent.
	        $E.on(window, "load", isDomReady);
	
	        //  Check to see if the DOM is ready as quickly as possible
	        onDomReady.timer = window.setInterval( isDomReady, 300 );
	    }
	}
	
	/**
	 * 
	 * 判断文档加载是否完成
	 * 
	 * @method isDomReady
	 * @memberOf event
	 * 
	 * @param element 元素
	 * @param eventType 事件类型，不含on
	 * @param handler 事件处理器
	 */
	// Checks to see if the DOM is ready for navigation
	isDomReady = function() {
	    // If we already figured out that the page is ready, ignore
	    if ( onDomReady.done ) {
	    	return true;
	    }
	
	    // Check to see if a number of functions and elements are
	    // able to be accessed
	    if ( document && document.getElementsByTagName && document.getElementById && document.body ) {
	    	// Remember that we’re now done
			onDomReady.done = true;
			
	        // If they’re ready, we can stop checking
	        window.clearInterval( onDomReady.timer );
	        onDomReady.timer = null;
	
	        // Execute all the functions that were waiting
	        for ( var i = 0; i < onDomReady.ready.length; i++ ){
	            onDomReady.ready[i]();
	        }

	        onDomReady.ready = null;
	        
	        return true;
	    }
	}
	
	
	
	
	/**
	 * 创建一个消息源发布者的类
	 * 
	 * @class Publish
	 * @return {Object} 返回生成的消息源
	 * 
	 * @example
	 * Jet().$package(function(J){
	 * 	var onMsg = new J.Publish();
	 *  var funcA = function(option){
	 *  	alert(option);
	 *  };
	 *  // 注册一个事件的观察者
	 * 	onMsg.subscribe(funcA);
	 * 	var option = "demo";
	 * 	onMsg.deliver(option);
	 * 	onMsg.unsubscribe(funcA);
	 * 	onMsg.deliver(option);
	 * 	
	 * };
	 * 
	 */
	Publish = function(){
		this.subscribers = [];
	};
	
	/**
	 * 注册观察者
	 * @memberOf Publish.prototype
	 * @param {Function} func 要注册的观察者
	 * @return {Function} 返回结果
	 */
	Publish.prototype.subscribe = function(func){
		var alreadyExists = J.array.some(this.subscribers, function(el){
			return el === func;
		});
		if(!alreadyExists){
			this.subscribers.push(func);
		}
		return func;
	};
	
	/**
	 * 触发事件
	 * @memberOf Publish.prototype
	 * @param {Mixed} msg 要注册的观察者
	 * @return {Function} 返回结果
	 */
	Publish.prototype.deliver = function(msg){
		J.array.forEach(this.subscribers, function(fn){
			fn(msg);
		});
	};
	
	/**
	 * 注销观察者
	 * @memberOf Publish.prototype
	 * @param {Function} func 要注销的观察者
	 * @return {Function} 返回结果
	 */
	Publish.prototype.unsubscribe = function(func){
		this.subscribers = J.array.filter(this.subscribers, function(el){
			return el !== func;
		});
		return func;
	};
	
	
	
	
	
	
	
	
	/**
	 * 
	 * 为自定义Model添加事件监听器
	 * 
	 * @method addObserver
	 * @memberOf event
	 * 
	 * @param targetModel 目标 model，即被观察的目标
	 * @param eventType 事件类型，不含on
	 * @param handler 观察者要注册的事件处理器
	 */
	addObserver = function(targetModel, eventType, handler){
		var handlers,
			length,
			index,
			i;
		if(handler){
			
		
			// 转换成完整的事件描述字符串
			eventType = "on" + eventType;
			
			// 判断对象是否含有$events对象
			if(!!!targetModel._$events){
				targetModel._$events={};
			}
			
			// 判断对象的$events对象是否含有eventType描述的事件类型
			if(!targetModel._$events[eventType]){
				//若没有则新建
				targetModel._$events[eventType]=[];
			}
		
			handlers = targetModel._$events[eventType];
			length = handlers.length;
			index = -1;
		
			// 通过循环，判断对象的handlers数组是否已经含有要添加的handler
			for(i=0; i<length; i++){
				if(handlers[i] === handler){
					index = i;
					break;
				}		
			}
			// 如果没有找到，则加入此handler
			if(index === -1){
				handlers.push(handler);
				//alert(handlers[handlers.length-1])
			}
		}else{
			J.out(">>> 添加的观察者方法不存在："+targetModel+eventType+handler);
		}
	};
	/**
	 * 
	 * 批量为自定义Model添加事件监听器
	 * 
	 * @method addObservers
	 * @memberOf event
	 * 
	 * @param obj 目标 model，即被观察的目标
	 *     obj = { targetModel : {eventType:handler,eventType2:handler2...} , targetModel2: {eventType:handler,eventType2:handler2...}  }
	 */
	addObservers = function(obj){
		//TODO 这里的代码是直接复制addObserver的（为避免太多函数调用耗费栈）
		var t=obj['targetModel'];
		var m=obj['eventMapping'];
		for(var i in m){
			addObserver(t,i,m[i]);
		}
	
	};
	/**
	 * 
	 * 触发自定义Model事件的监听器
	 * 
	 * @method notifyObservers
	 * @memberOf event
	 * 
	 * @param targetModel 目标 model，即被观察目标
	 * @param eventType 事件类型，不含on
	 * @param options 触发的参数对象
	 * @return {Boolean} 是否出发到至少一个的观察者
	 */
	notifyObservers = function(targetModel, eventType, argument){addInvokeTime(eventType);
		var handlers,
			i;
			
		eventType = "on" + eventType;
		var flag = true;
		if(targetModel._$events && targetModel._$events[eventType]){
			handlers = targetModel._$events[eventType];
			if(handlers.length > 0){
				// 通过循环，执行handlers数组所包含的所有函数function
				for(i=0; i<handlers.length; i++){
					if(handlers[i].apply(targetModel, [argument])){
						
					}else{
						flag = false;
					}
				}
				//return flag;
			}
		}else{
			// throw new Error("还没有定义 [" + targetModel + "] 对象的: " + eventType + " 事件！");
			//return false;
		}
		return flag;
	};
	
	
	/**
	 * 
	 * 为自定义 Model 移除事件监听器
	 * 
	 * @method removeObserver
	 * @memberOf event
	 * 
	 * @param targetModel 目标 model，即被观察的目标
	 * @param eventType 事件类型，不含on
	 * @param handler 观察者要取消注册的事件处理器
	 */
	// 按照对象和事件处理函数来移除事件处理函数
	removeObserver = function(targetModel, eventType, handler){
		var i,
			j,
			handlers,
			length,
			events = targetModel._$events;
		if(handler){
			
			if(events){
				eventType = "on" + eventType;
				handlers = events[eventType];
				
				if(handlers){
					length = handlers.length;
					for(i=0; i<length; i++){
						if(handlers[i] == handler){
							handlers[i] = null;
							handlers.splice(i, 1);
							break;
						}	
					}
				}
				
				
			}
		}else if(eventType){
			if(events){
				eventType = "on" + eventType;
				handlers = events[eventType];
				if(handlers){
					length = handlers.length;
					for(i=0; i<length; i++){
						handlers[i] = null;
					}
					delete events[eventType];
				}
				
			}
			
		}else if(targetModel){
			if(events){
				for(i in events){
					delete events[i];
				}
				delete targetModel._$events;
			}
		}
	};
	
	$E.addEventListener = addEventListener;
	$E.removeEventListener = removeEventListener;
	// alias
	$E.on = $E.addEventListener;
	$E.off = $E.removeEventListener;
	
	$E.onDomReady = onDomReady;
	
	$E.Publish = Publish;
	
	// Model 事件方法
	$E.addObserver = addObserver;
	$E.addObservers = addObservers;
	$E.notifyObservers = notifyObservers;
	$E.removeObserver = removeObserver;
});


/**
 * 6.[Date part]: date 扩展包
 */
Jet().$package(function(J){
	var format;
	
	/**
	 * dom 名字空间
	 * 
	 * @namespace
	 * @name date
	 * @type Object
	 */
	J.date = J.date || {};
	
	
	/**
	 * 让日期和时间按照指定的格式显示的方法
	 * 
	 * @memberOf date
	 * @param {String} format 格式字符串
	 * @return {String} 返回生成的日期时间字符串
	 * 
	 * @example
	 * Jet().$package(function(J){
	 * 	var d = new Date();
	 * 	// 以 YYYY-MM-dd hh:mm:ss 格式输出 d 的时间字符串
	 * 	J.date.format(d, "YYYY-MM-DD hh:mm:ss");
	 * };
	 * 
	 */
	format = function(date, formatString){
		/*
		 * eg:formatString="YYYY-MM-DD hh:mm:ss";
		 */
		var o = {
			"M+" : date.getMonth()+1,	//month
			"D+" : date.getDate(),	//day
			"h+" : date.getHours(),	//hour
			"m+" : date.getMinutes(),	//minute
			"s+" : date.getSeconds(),	//second
			"q+" : Math.floor((date.getMonth()+3)/3),	//quarter
			"S" : date.getMilliseconds()	//millisecond
		}
	
		if(/(Y+)/.test(formatString)){
			formatString = formatString.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
		}
	
		for(var k in o){
			if(new RegExp("("+ k +")").test(formatString)){
				formatString = formatString.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
			}
		}
		return formatString;
	};
	
	J.date.format = format;
	
});


var elementHandlerMapping={};

/**
计算调用平均时间
	增加计算机量 pushToTotal(field,d)
	显示平均量	 getAverage(field);
	清除数据 	 clearTotal(field)  // field为空时清除所有统计
	

**/
function insertAt(array,index,obj){
	array.splice(index,0,obj);
} 
var eventInvokes={};
function addInvokeTime(t){
	eventInvokes[t] = eventInvokes[t]?eventInvokes[t]+1:1;
}

var totals={};
function pushToTotal(field,d){
	if(!totals[field]){
		totals[field]=[0,0];
	}
	totals[field][0]+=1;
	totals[field][1]+=d;
}
function clearTotal(field){
	if(!field){
		totals={};
	}else{
		totals[field]=[0,0];
	}
}
function getAverage(field){
	if(!field){
		//TODO
	}else{
		var t=totals[field];
		var total = t[1];
		var time = t[0];
		var average = total/time;
		Jet().out(average+" "+total+"/"+time);
	}
}
function reportIt(){
	for(var i in eventInvokes){
		if(!isNaN(eventInvokes[i])){
			Jet().out(i+":"+eventInvokes[i]);
		}
	}
}
function ip_s(n){
	n=n?n:0;
	var sorted=[];
	for(var i in eventInvokes){
		if(!isNaN(eventInvokes[i])){
			var j=0;
			for(;j<sorted.length;++j){
				if(sorted[j].total<=eventInvokes[i]){
					break;
				}
			}
			insertAt(sorted,j,{'t':i,'total':eventInvokes[i]});
		}
	}
	
	for(var i=0;i<sorted.length;++i){
		if(sorted[i]['total']<n)continue;
		Jet().out(sorted[i]['t']+" : "+sorted[i]['total']);
	}
	sorted=null;
}
function ip_c(){
	eventInvokes={};
}/**	
 * JET (Javascript Extension Tools) 
 * Copyright (c) 2009, KDV.cn, All rights reserved.
 * Code licensed under the BSD License:
 * http://developer.kdv.cn/jet/license.txt
 *
 * @fileOverview Jet!
 * @version	1.0
 * @author	Kinvix(<a href="mailto:Kinvix@gmail.com">Kinvix@gmail.com</a>)
 * @description 
 * 
 */

/**	
 * @description
 * Package: jet.array
 *
 * Need package:
 * jet.core.js
 * 
 */

/**
 * 4.[Javascript core]: array 数组处理
 */
Jet().$package(function(J){
	
	/**
	 * array 名字空间
	 * 
	 * @namespace
	 * @name array
	 */
	J.array = J.array || {};
	var $A = J.array,
		// javascript1.6扩展
		indexOf,
		lastIndexOf,
		forEach,
		filter,
		some,
		map,
		every,
		// javascript1.8扩展
		reduce,
		reduceRight,
		
		// JET扩展
		toArray,
		remove,
		replace,
		bubbleSort,
		binarySearch;
	
	
	
	/**
	 * 正向查找数组元素在数组中的索引下标
	 * 
	 * @link http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Objects:Array:indexOf
	 * @memberOf array
	 * @function
	 * 
	 * @param {Array} arr 要执行操作的数组
	 * @param {Object} obj 要查找的数组的元素
	 * @param {Number} fromIndex 开始的索引编号
	 * 
	 * @return {Number}返回正向查找的索引编号
	 */
	indexOf = Array.prototype.indexOf 
		? function(){
			var args = Array.prototype.slice.call(arguments, 1);
			return Array.prototype.indexOf.apply(arguments[0], args);
		}
		: function (arr, obj, fromIndex) {
	
	        if (fromIndex == null) {
	            fromIndex = 0;
	        } else if (fromIndex < 0) {
	            fromIndex = Math.max(0, arr.length + fromIndex);
	        }
	        for (var i = fromIndex; i < arr.length; i++) {
	            if (arr[i] === obj){
	                return i;
	            }
	        }
	        return -1;
	    };
    
    
        
    /**
	 * 反向查找数组元素在数组中的索引下标
	 * 
	 * @link http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Objects:Array:lastIndexOf
	 * @memberOf array
	 * @function
	 * 
	 * @param {Array} arr 要执行操作的数组
	 * @param {Object} obj 要查找的数组元素
	 * @param {Number} fromIndex 开始的索引编号
	 * 
	 * @return {Number}返回反向查找的索引编号
	 */
    lastIndexOf = Array.prototype.lastIndexOf 
		? function(){
			var args = Array.prototype.slice.call(arguments, 1);
			return Array.prototype.lastIndexOf.apply(arguments[0], args);
		}
		: function (arr, obj, fromIndex) {
	        if (fromIndex == null) {
	            fromIndex = arr.length - 1;
	        } else if (fromIndex < 0) {
	            fromIndex = Math.max(0, arr.length + fromIndex);
	        }
	        for (var i = fromIndex; i >= 0; i--) {
	            if (arr[i] === obj){
	                return i;
	            }
	        }
	        return -1;
	    };
	
	

	
	
	/**
	 * 遍历数组，把每个数组元素作为第一个参数来执行函数
	 * 
	 * @link http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:forEach
	 * @memberOf array
	 * @function
	 * 
	 * @param {Array} arr 要执行操作的数组
	 * @param {Function} fun 要执行的函数
	 * @param {Object} contextObj 执行函数时的上下文对象，可以省略
	 * 
	 */
	forEach = Array.prototype.forEach 
		? function(){
			var args = Array.prototype.slice.call(arguments, 1);
			return Array.prototype.forEach.apply(arguments[0], args);
		}
		: function(arr, fun /*, thisp*/) {
			var len = arr.length;
			if (typeof fun != "function") {
				throw new TypeError();
			}
			var thisp = arguments[2];
			for (var i = 0; i < len; i++) {
				if (i in arr) {
					fun.call(thisp, arr[i], i, arr);
				}
			}
		};
	
	/**
	 * 用一个自定义函数来过滤数组
	 * 
	 * @link http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:filter
	 * @memberOf array
	 * @function
	 * 
	 * @param {Array} arr 要执行操作的数组
	 * @param {Function} fun 过滤函数
	 * @param {Object} contextObj 执行函数时的上下文对象，可以省略
	 * 
	 * @return {Array}返回筛选出的新数组
	 */
	filter = Array.prototype.filter 
		? function(){
			var args = Array.prototype.slice.call(arguments, 1);
			return Array.prototype.filter.apply(arguments[0], args);
		}
		: function(arr, fun) {
			var len = arr.length;
			if (typeof fun != "function") {
			  throw new TypeError();
			}
			var res   = [];
			var thisp = arguments[2];
			for (var i = 0; i < len; i++) {
				if (i in arr) {
					var val = arr[i]; // in case fun mutates this
					if (fun.call(thisp, val, i, arr)) {
						res.push(val);
					}
				}
			}
			return res;
		};
	
	
	


	
	/**
	 * 遍历数组，把每个数组元素作为第一个参数来执行函数，如果有任意一个或多个数组成员使得函数执行结果返回 true，则最终返回 true，否则返回 false
	 * 
	 * @link http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:some
	 * @memberOf array
	 * @function
	 * 
	 * @param {Array} arr 要执行操作的数组
	 * @param {Function} fun 要执行的函数
	 * @param {Object} contextObj 执行函数时的上下文对象，可以省略
	 * 
	 * @return {Boolean}
	 */
	some = Array.prototype.some 
		? function(){
			var args = Array.prototype.slice.call(arguments, 1);
			return Array.prototype.some.apply(arguments[0], args);
		}
		: function(arr, fun /*, thisp*/) {
			var len = arr.length;
			if (typeof fun != "function") {
				throw new TypeError();
			}
	
			var thisp = arguments[2];
			for (var i = 0; i < len; i++) {
				if (i in arr && fun.call(thisp, arr[i], i, arr)) {
					return true;
				}
			}
	
			return false;
		};
	

	/**
	 * 遍历数组，把每个数组元素作为第一个参数来执行函数，并把函数的返回结果以映射的方式存入到返回的数组中
	 * 
	 * @link http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:map
	 * @memberOf array
	 * @function
	 * 
	 * @param {Array} arr 要执行操作的数组
	 * @param {Function} fun 要执行的函数
	 * @param {Object} contextObj 执行函数时的上下文对象，可以省略
	 * 
	 * @return {Array}返回映射后的新数组
	 */
    map = Array.prototype.map 
		? function(){
			var args = Array.prototype.slice.call(arguments, 1);
			return Array.prototype.map.apply(arguments[0], args);
		}
		: function(arr, fun /*, thisp*/) {
	        var len = arr.length;
	        if (typeof fun != "function") {
	            throw new TypeError();
	        }
	        var res   = new Array(len);
	        var thisp = arguments[2];
	        for (var i = 0; i < len; i++) {
	            if (i in arr) {
	                res[i] = fun.call(thisp, arr[i], i, arr);
	            }
	        }
	
	        return res;
	    };
	
    
    /**
	 * 遍历数组，把每个数组元素作为第一个参数来执行函数，如果所有的数组成员都使得函数执行结果返回 true，则最终返回 true，否则返回 false
	 * 
	 * @link http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Objects:Array:every
	 * @memberOf array
	 * @function
	 * 
	 * @param {Array} arr 要执行操作的数组
	 * @param {Function} fun 要执行的函数
	 * @param {Object} contextObj 执行函数时的上下文对象，可以省略
	 * 
	 * @return {Boolean}
	 */
    every = Array.prototype.every 
		? function(){
			var args = Array.prototype.slice.call(arguments, 1);
			return Array.prototype.every.apply(arguments[0], args);
		}
		: function(arr, fun) {
	        var len = arr.length;
	        if (typeof fun != "function") {
	            throw new TypeError();
	        }
	        var thisp = arguments[2];
	        for (var i = 0; i < len; i++) {
	            if (i in arr && !fun.call(thisp, arr[i], i, arr)) {
	                return false;
	            }
	        }
	        return true;
	    };
	
	
	
	
    
	/**
	 * 对该数组的每项和前一次调用的结果运行一个函数，收集最后的结果。
	 * 
	 * @link http://developer.mozilla.org/en/docs/Core_JavaScript_1.8_Reference:Objects:Array:reduce
	 * @memberOf array
	 * @function
	 * 
	 * @param {Array} arr 要执行操作的数组
	 * @param {Function} fun 要执行的函数
	 * @param {Object} contextObj 执行函数时的上下文对象，可以省略
	 * 
	 * @return {Boolean}
	 */
	reduce = Array.prototype.reduce 
		? function(){
			var args = Array.prototype.slice.call(arguments, 1);
			return Array.prototype.reduce.apply(arguments[0], args);
		}
		: function(arr, fun /*, initial*/){
			var len = arr.length >>> 0;
			if (typeof fun != "function"){
				throw new TypeError();
			}
			// no value to return if no initial value and an empty array
			if (len == 0 && arguments.length == 2){
				throw new TypeError();
			}
			var i = 0;
			if (arguments.length >= 3){
				var rv = arguments[2];
			}
			else{
				do{
				    if (i in arr){
				      rv = arr[i++];
				      break;
				    }
				
				    // if array contains no values, no initial value to return
				    if (++i >= len){
				    	throw new TypeError();
				    }
				}
				while (true);
			}
			
			for (; i < len; i++){
				if (i in arr){
					rv = fun.call(null, rv, arr[i], i, arr);
				}
			}
			
			return rv;
		};
	
	
	
	/**
	 * 同上，但从右向左执行。
	 * 
	 * @link http://developer.mozilla.org/en/docs/Core_JavaScript_1.8_Reference:Objects:Array:reduceRight
	 * @memberOf array
	 * @function
	 * 
	 * @param {Array} arr 要执行操作的数组
	 * @param {Function} fun 要执行的函数
	 * @param {Object} contextObj 执行函数时的上下文对象，可以省略
	 * 
	 * @return {Boolean}
	 */
	reduceRight = Array.prototype.reduceRight 
		? function(){
			var args = Array.prototype.slice.call(arguments, 1);
			return Array.prototype.reduceRight.apply(arguments[0], args);
		}
		: function(arr, fun /*, initial*/){
			var len = arr.length >>> 0;
			if (typeof fun != "function"){
				throw new TypeError();
			}
			// no value to return if no initial value, empty array
			if (len == 0 && arguments.length == 2){
				throw new TypeError();
			}
			var i = len - 1;
			if (arguments.length >= 3){
				var rv = arguments[2];
			}
			else{
				do{
					if (i in arr){
						rv = arr[i--];
						break;
					}
			
					// if array contains no values, no initial value to return
					if (--i < 0){
						throw new TypeError();
					}
				}
				while(true);
			}
			
			for (; i >= 0; i--){
				if (i in arr){
					rv = fun.call(null, rv, arr[i], i, arr);
				}
			}
			
			return rv;
		};

    
    
    
    /**
	 * 将任意变量转换为数组的方法
	 * 
	 * @memberOf array
	 * @param {Mixed} o 任意变量
	 * @return {Array} 返回转换后的数组
	 */
	toArray = function(o){
		var type = J.$typeof(o);
		return (type) ? ((type != 'array' && type != 'arguments') ? [o] : o) : [];
	};
	
	
	
	
	/**
	 * 从数组中移除一个或多个数组成员
	 * 
	 * @memberOf array
	 * @param {Array} arr 要移除的数组成员，可以是单个成员也可以是成员的数组
	 */
	remove = function(arr, members){
		var members = toArray(members),
			i,
			j,
			flag = false;
		for(i=0; i<members.length; i++){
			for(j=0; j<arr.length; j++){
				if(arr[j] === members[i]){
					arr.splice(j,1);
					flag = true;
				}
			}
		}
		return flag;
	};
	
	/**
	 * 替换一个数组成员
	 * 
	 * @memberOf array
	 * @param {Object} oldValue 当前数组成员
	 * @param {Object} newValue 要替换成的值
	 * @return {Boolean} 如果找到旧值并成功替换则返回 true，否则返回 false
	 */
	replace = function(arr, oldValue, newValue){
		var i;
		for(i=0; i<arr.length; ij++){
			if(arr[i] === oldValue){
				arr[i] = newValue;
				return true;
			}
		}
		return false;
	};
	
	// 冒泡排序,默认从小到大排序
	bubbleSort = function(arr, compareFunc) {
		compareFunc = compareFunc || function(num1, num2){
			return num1 - num2;
		};
		//数组长度
		var n = arr.length;
		//交换顺序的临时变量
		var temp;//
		//交换标志
		var exchange;
		//最多做n-1趟排序
		for (var time=0; time<n-1; time++){
			exchange = false;
			for (var i=n-1; i>time; i--) {
				if (compareFunc(arr[i], arr[i - 1]) < 0) {
				//if (arr[i] < arr[i - 1]) {
					exchange = true;
					temp = arr[i - 1];
					arr[i - 1] = arr[i];
					arr[i] = temp;
				}
			}
			//若本趟排序未发生交换，提前终止算法
			if (!exchange) {
				break;
			}
		}
		return arr;
	};
	
	// 二叉搜索
	binarySearch = function(arr, item, compareFunc){
	    var start = 0;
	    var end = arr.length;
	    var current = Math.floor(arr.length/2);
	    while(end != current){
	        if(compareFunc(item, arr[current]) > 0){
	            start = current + 1;
	        }
	        else{
	            end = current;
	        };
	
	        current = Math.floor((start + end) / 2);
	    };
	    return current;
	};
	
	
	
	
    
    $A.indexOf = indexOf;
    $A.lastIndexOf = lastIndexOf;
	$A.forEach = forEach;
	$A.filter = filter;
	$A.some = some;
	$A.map = map;
	$A.every = every;
	$A.reduce = reduce;
	$A.reduceRight = reduceRight;

	$A.toArray = toArray;
	$A.remove = remove;
    $A.replace = replace;
    $A.bubbleSort = bubbleSort;
    $A.binarySearch = binarySearch;
	
    
});








/**	
 * JET (Javascript Extension Tools) 
 * Copyright (c) 2009, KDV.cn, All rights reserved.
 * Code licensed under the BSD License:
 * http://developer.kdv.cn/jet/license.txt
 *
 * @fileOverview Jet!
 * @version	1.0
 * @author	Kinvix(<a href="mailto:Kinvix@gmail.com">Kinvix@gmail.com</a>)
 * @description 
 * 
 */

/**	
 * @description
 * Package: jet.string
 * 
 * Need package:
 * jet.core.js
 * 
 */


/**
 * 3.[Javascript core]: String 字符串处理
 */
Jet().$package(function(J){
	
	/**
	 * string 名字空间
	 * 
	 * @namespace
	 * @name string
	 */
	J.string = J.string || {};
	var $S = J.string,
		toString,
		template,
		isURL,
		mapQuery,
		test,
		contains,
		trim,
		clean,
		camelCase,
		hyphenate,
		capitalize,
		escapeRegExp,
		toInt,
		toFloat,
		toSingleLine,
		toHtml,
		toTitle,
		toQueryPair,
		toQueryString,
		
		hexToRgb,
		rgbToHex,
		stripScripts,
		substitute,
		replaceAll,
		
		byteLength,
		cutRight,
		cutByBytes,
		isNumber,
		isEmail,
		
		encodeHtmlSimple,
		decodeHtmlSimple,
		encodeHtmlAttributeSimple,
		encodeHtmlAttribute,
		encodeHtml,
		encodeScript,
		encodeHrefScript,
		encodeRegExp,
		encodeUrl,
		encodeUriComponent,
		vaildTencentUrl;
		
	
	/**
	 * 将任意变量转换为字符串的方法
	 * 
	 * @method toString
	 * @memberOf string
	 * 
	 * @param {Mixed} o 任意变量
	 * @return {String} 返回转换后的字符串
	 */
	toString = function(o){
		return (o + "");
	};
	
	var cache = {};
	  
	/**
	 * 多行或单行字符串模板处理
	 * 
	 * @method template
	 * @memberOf string
	 * 
	 * @param {String} str 模板字符串
	 * @param {Object} obj 要套入的数据对象
	 * @return {String} 返回与数据对象合成后的字符串
	 * 
	 * @example
	 * <script type="text/html" id="user_tmpl">
	 *   <% for ( var i = 0; i < users.length; i++ ) { %>
	 *     <li><a href="<%=users[i].url%>"><%=users[i].name%></a></li>
	 *   <% } %>
	 * </script>
	 * 
	 * Jet().$package(function(J){
	 * 	// 用 obj 对象的数据合并到字符串模板中
	 * 	J.template("Hello, {name}!", {
	 * 		name:"Kinvix"
	 * 	});
	 * };
	 */
	template = function(str, data){
		// Figure out if we're getting a template, or if we need to
		// load the template - and be sure to cache the result.
		var fn = !/\W/.test(str) ?
		  cache[str] = cache[str] ||
			template(document.getElementById(str).innerHTML) :
		  
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

	
	/*
	template = function(str, obj){
		var p,
			RE;
	
		for(p in obj){
			if(obj.hasOwnProperty(p)){
				// RE = new RegExp("\\${" + p + "}","g");
				// str = str.replace(RE, o[p]);
				str = str.split("${" + p + "}").join(obj[p]);
			}
		}
		return str;
	};
	*/

	
	

	/**
	 * 判断是否是一个可接受的 url 串
	 * 
	 * @method isURL
	 * @memberOf string
	 * 
	 * @param {String} str 要检测的字符串
	 * @return {Boolean} 如果是可接受的 url 则返回 true
	 */
	isURL = function(str) {
		return isURL.RE.test(str);
	};
	
	/**
	 * @ignore
	 */
	isURL.RE = /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i;
	
	/**
	 * 将 uri 的查询字符串参数映射成对象
	 * 
	 * @method mapQuery
	 * @memberOf string
	 * 
	 * @param {String} uri 要映射的 uri
	 * @return {Object} 按照 uri 映射成的对象
	 * 
	 * @example
	 * Jet().$package(function(J){
	 * 	var url = "http://web.qq.com/?qq=4765078&style=blue";
	 * 	// queryObj 则得到一个{qq:"4765078", style:"blue"}的对象。
	 * 	var queryObj = J.mapQuery(url);
	 * };
	 */
	mapQuery = function(uri){
		//window.location.search
		var i,
			key,
			value,
			uri = uri || window.location.href,
			index = uri.indexOf("?"),
			pieces = uri.substring(index + 1).split("&"),
			params = {};
			
		for(i=0; i<pieces.length; i++){
			try{
				index = pieces[i].indexOf("=");
				key = pieces[i].substring(0,index);
				value = pieces[i].substring(index+1);
				if(!(params[key] = unescape(value))){
					throw new Error("uri has wrong query string.");
				}
			}
			catch(e){
				//J.out("错误：[" + e.name + "] "+e.message+", " + e.fileName+", 行号:"+e.lineNumber+"; stack:"+typeof e.stack, 2);
			}
		}
		return params;
	};
	
	/**
	 * 
	 * test的方法
	 * 
	 * @memberOf string
	 * 
	 * @param {String, RegExp} regex 正则表达式，或者正则表达式的字符串
	 * @param {String} params 正则的参数
	 * @return {Boolean} 返回结果
	 */
	test = function(string, regex, params){
		return ((typeof regex == 'string') ? new RegExp(regex, params) : regex).test(string);
	};

	/**
	 * 判断是否含有指定的字符串
	 * 
	 * @memberOf string
	 * 
	 * @param {String} string 是否含有的字符串
	 * @param {String} separator 分隔符，可选
	 * @return {Boolean} 如果含有，返回 true，否则返回 false
	 */
	contains = function(string1, string2, separator){
		return (separator) ? (separator + string1 + separator).indexOf(separator + string2 + separator) > -1 : string1.indexOf(string2) > -1;
	};

	/**
	 * 清除字符串开头和结尾的空格
	 * 
	 * @memberOf string
	 * 
	 * @return {String} 返回清除后的字符串
	 */
	trim = function(string){
		return String(string).replace(/^\s+|\s+$/g, '');
	};

	/**
	 * 清除字符串开头和结尾的空格，并把字符串之间的多个空格转换为一个空格
	 * 
	 * @memberOf string
	 * 
	 * @return {String} 返回清除后的字符串
	 */
	clean = function(string){
		return trim(string.replace(/\s+/g, ' '));
	};

	/**
	 * 将“-”连接的字符串转换成驼峰式写法
	 * 
	 * @memberOf string
	 * 
	 * @return {String} 返回转换后的字符串
	 */
	camelCase = function(string){
		return string.replace(/-\D/g, function(match){
			return match.charAt(1).toUpperCase();
		});
	};
	
	/**
	 * 将驼峰式写法字符串转换成“-”连接的
	 * 
	 * @memberOf string
	 * 
	 * @return {String} 返回转换后的字符串
	 */
	hyphenate = function(string){
		return string.replace(/[A-Z]/g, function(match){
			return ('-' + match.charAt(0).toLowerCase());
		});
	};

	/**
	 * 将字符串转换成全大写字母
	 * 
	 * @memberOf string
	 * 
	 * @return {String} 返回转换后的字符串
	 */
	capitalize = function(string){
		return string.replace(/\b[a-z]/g, function(match){
			return match.toUpperCase();
		});
	};

	/**
	 * 转换 RegExp 正则表达式
	 * 
	 * @memberOf string
	 * 
	 * @return {String} 返回转换后的字符串
	 */
	escapeRegExp = function(string){
		return string.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
	};

	/**
	 * 将字符串转换成整数
	 * 
	 * @memberOf string
	 * 
	 * @return {Number} 返回转换后的整数
	 */
	toInt = function(string, base){
		return parseInt(string, base || 10);
	};

	/**
	 * 将字符串转换成浮点数
	 * 
	 * @memberOf string
	 * @param {Sring} string 要转换的字符串
	 * @return {Number} 返回转换后的浮点数
	 */
	toFloat = function(string){
		return parseFloat(string);
	};
	
	/**
	 * 将带换行符的字符串转换成无换行符的字符串
	 * 
	 * @memberOf string
	 * @param {Sring} str 要转换的字符串
	 * @return {Sring} 返回转换后的字符串
	 */
	toSingleLine = function(str){
		return String(str).replace(/\r/gi,"")
							.replace(/\n/gi,"");
	};
	
	/**
	 * 将字符串转换成html源码
	 * 
	 * @memberOf string
	 * @param {Sring} str 要转换的字符串
	 * @return {Sring} 返回转换后的html代码字符串
	 */
	toHtml = function(str){
		return String(str).replace(/&/gi,"&amp;")
							.replace(/\\/gi,"&#92;")
							.replace(/\'/gi,"&#39;")
							.replace(/\"/gi,"&quot;")
							.replace (/</gi,"&lt;")
							.replace(/>/gi,"&gt;")
							.replace(/ /gi,"&nbsp;")
							.replace(/\r\n/g,"<br />")
							.replace(/\n\r/g,"<br />")
							.replace(/\n/g,"<br />")
							.replace(/\r/g,"<br />");
	};
	
	
	
	/**
	 * 将字符串转换成用于title的字符串
	 * 
	 * @memberOf string
	 * @param {Sring} str 要转换的字符串
	 * @return {Number} 返回转换后的in title字符串
	 */
	toTitle = function(str){
		return String(str).replace(/\\/gi,"\\")
							.replace(/\'/gi,"\'")
							.replace(/\"/gi,"\'");
	};

	
	
	
	

	/**
	 * 将颜色 Hex 写法转换成 RGB 写法
	 * 
	 * @memberOf string
	 * @return {String} 返回转换后的字符串
	 */
	hexToRgb = function(string, array){
		var hex = string.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
		return (hex) ? hex.slice(1).hexToRgb(array) : null;
	};

	/**
	 * 将颜色 RGB 写法转换成 Hex 写法
	 * 
	 * @memberOf string
	 * @return {String} 返回转换后的字符串
	 */
	rgbToHex = function(string, array){
		var rgb = string.match(/\d{1,3}/g);
		return (rgb) ? rgb.rgbToHex(array) : null;
	};

	/**
	 * 脱去script标签
	 * 
	 * @memberOf string
	 * @return {String} 返回转换后的字符串
	 */
	stripScripts = function(string, option){
		var scripts = '';
		var text = string.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function(){
			scripts += arguments[1] + '\n';
			return '';
		});
		if (option === true){
			$exec(scripts);
		}else if($type(option) == 'function'){
			option(scripts, text);
		}
		return text;
	};
	
	/**
	 * 。。。。
	 * 
	 * @memberOf string
	 * @param {Object} obj 要转换成查询字符串的对象
	 * @return {String} 返回转换后的查询字符串
	 */
	toQueryPair = function(key, value) {
		return encodeURIComponent(String(key)) + "=" + encodeURIComponent(String(value));
	};
	
	/**
	 * 。。。。
	 * 
	 * @memberOf string
	 * @param {Object} obj 要转换成查询字符串的对象
	 * @return {String} 返回转换后的查询字符串
	 */
	toQueryString = function(obj){
		var result=[];
		for(var key in obj){
			result.push(toQueryPair(key, obj[key]));
		}
		return result.join("&");
	};



	/**
	 * 。。。。
	 * 
	 * @memberOf string
	 * @return {String} 返回转换后的字符串
	 */
	substitute = function(string, object, regexp){
		return string.replace(regexp || (/\\?\{([^{}]+)\}/g), function(match, name){
			if (match.charAt(0) == '\\') return match.slice(1);
			return (object[name] != undefined) ? object[name] : '';
		});
	};
	
	/**
	 * 全局替换指定的字符串
	 * 
	 * @memberOf string
	 * @return {String} 返回替换后的字符串
	 */
	replaceAll = function(string, reallyDo, replaceWith, ignoreCase) {
	    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
	        return string.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);
	    } else {
	        return string.replace(reallyDo, replaceWith);
	    }
	};
	
	/**
	 * 计算字符串的字节长度
	 * 
	 * @memberOf string
	 * @return {String} 返回自己长度
	 */
	byteLength = function(string){
		return string.replace(/[^\x00-\xff]/g,"aa").length;
	};
	
	cutRight = function(string, n){
		return string.substring(0, (string.length - n));
	};
	cutByBytes = function(string,n) {
		var s= string;
		while(byteLength(s)>n) {
			s= cutRight(s,1);
		}
		return s;
	}
	isNumber = function(string){
		if (string.search(/^\d+$/) !== -1){
			return true;
		}
		else{
		   	return false;
		}
	};
	isEmail = function(emailStr){
		if (emailStr.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) !== -1){
			return true;
		}
		else{
		   	return false;
		}
	};
	
	
	
	
	/*
	JS安全API v1.1
	Created By Web Application Security Group of TSC
	UpDate: 2007-12-08
	*/

	
	//html正文编码：对需要出现在HTML正文里(除了HTML属性外)的不信任输入进行编码
	var encodeHtmlSimple = function(sStr){
		sStr = sStr.replace(/&/g,"&amp;");
		sStr = sStr.replace(/>/g,"&gt;");
		sStr = sStr.replace(/</g,"&lt;");
		sStr = sStr.replace(/"/g,"&quot;");
		sStr = sStr.replace(/'/g,"&#39;");
		return sStr;
	};
	
	//html正文解码：对HtmlEncode函数的结果进行解码
	var decodeHtmlSimple = function(sStr){
		sStr = sStr.replace(/&amp;/g,"&");
		sStr = sStr.replace(/&gt;/g,">");
		sStr = sStr.replace(/&lt;/g,"<");
		sStr = sStr.replace(/&quot;/g,'"');
		sStr = sStr.replace(/&#39;/g,"'");
		return sStr;
	};
	
	/*
	html属性编码：对需要出现在HTML属性里的不信任输入进行编码
	注意:
	(1)该函数不适用于属性为一个URL地址的编码.这些标记包括:a/img/frame/iframe/script/xml/embed/object...
	属性包括:href/src/lowsrc/dynsrc/background/...
	(2)该函数不适用于属性名为 style="[Un-trusted input]" 的编码
	*/
	var encodeHtmlAttributeSimple = function(sStr){
		sStr = sStr.replace(/&/g,"&amp;");
		sStr = sStr.replace(/>/g,"&gt;");
		sStr = sStr.replace(/</g,"&lt;");
		sStr = sStr.replace(/"/g,"&quot;");
		sStr = sStr.replace(/'/g,"&#39;");
		sStr = sStr.replace(/=/g,"&#61;");
		sStr = sStr.replace(/`/g,"&#96;");
		return sStr;
	};

	
	
	
	//用做过滤直接放到HTML里的
	var encodeHtml = function(sStr) { 
		return sStr.replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g, function(r){ 
			return "&#"+r.charCodeAt(0)+";";
		}).replace(/\r\n/g, "<br />").replace(/\n/g, "<br />").replace(/\r/g, "<br />").replace(/ /g, "&nbsp;"); 
	};
	
	//用做过滤HTML标签里面的东东 比如这个例子里的<input value="XXXX">  XXXX就是要过滤的
	var encodeHtmlAttribute = function(sStr) { 
		return sStr.replace(/[&'"<>\/\\\-\x00-\x1f\x80-\xff]/g, function(r){ 
			return "&#"+r.charCodeAt(0)+";";
		}); 
	};
	
	//用做过滤直接放到HTML里js中的
	var encodeScript = function(sStr) {
		sStr+="";//确保为String
		return sStr.replace(/[\\"']/g, function(r){ 
			return "\\"+r; 
		}).replace(/%/g, "\\x25").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\x01/g, "\\x01");
	};
	
	
	
	//用做过滤直接放到<a href="javascript:XXXX">中的
	var encodeHrefScript = function(sStr) {
		return sStr.escScript().escMiniUrl().escHtmlEp();
	};
	
	//用做过滤直接放到正则表达式中的
	var encodeRegExp = function(sStr) {
		return sStr.replace(/[\\\^\$\*\+\?\{\}\.\(\)\[\]]/g, function(a,b){
			return "\\"+a;
		});
	};
	
	//用做过滤直接URL参数里的  比如 http://show8.qq.com/abc_cgi?a=XXX  XXX就是要过滤的
	var encodeUrl = function(sStr) {
		return escape(sStr).replace(/\+/g, "%2B");
	};
	
	/*
	对需要出现在一个URI的一部分的不信任输入进行编码 
	例如:
	<a href="http://search.msn.com/results.aspx?q1=[Un-trusted-input]& q2=[Un-trusted-input]">Click Here!</a>
	以下字符将会被编码: 
	除[a-zA-Z0-9.-_]以外的字符都会被替换成URL编码
	*/
	var encodeUriComponent = function(sStr){
		sStr = encodeURIComponent(sStr);
		sStr = sStr.replace(/~/g,"%7E");
		sStr = sStr.replace(/!/g,"%21");
		sStr = sStr.replace(/\*/g,"%2A");
		sStr = sStr.replace(/\(/g,"%28");
		sStr = sStr.replace(/\)/g,"%29");
		sStr = sStr.replace(/'/g,"%27");
		sStr = sStr.replace(/\?/g,"%3F");
		sStr = sStr.replace(/;/g,"%3B");
		return sStr;
	};
	
	/*
	url转向验证
	描述：对通过javascript语句载入（或转向）的页面进行验证，防止转到第三方网页和跨站脚本攻击
	返回值：true -- 合法；false -- 非法
	例：
	合法的值
	    http://xxx.qq.com/hi/redirect.html?url=http://www.qq.com
	    http://xxx.qq.com/hi/redirect.html?url=a.html
	    http://xxx.qq.com/hi/redirect.html?url=/a/1.html
	非法的值
	    http://xxx.qq.com/hi/redirect.html?url=http://www.baidu.com
	    http://xxx.qq.com/hi/redirect.html?url=javascript:codehere
	    http://xxx.qq.com/hi/redirect.html?url=//www.qq.com
	*/
	var vaildTencentUrl = function(sUrl){
		return (/^(https?:\/\/)?[\w\-.]+\.(qq|paipai|soso|taotao)\.com($|\/|\\)/i).test(sUrl)||(/^[\w][\w\/\.\-_%]+$/i).test(sUrl)||(/^[\/\\][^\/\\]/i).test(sUrl) ? true : false;
	};
    /*
	toHtml = function(str){
		return encodeHtml(str);
	};
	
	toTitle = function(str){
		return encodeHtmlAttribute(str);
	};
	
	*/
	
		
	$S.toString = toString;
	$S.template = template;
	$S.isURL = isURL;
	$S.mapQuery = mapQuery;
	$S.test = test;
	$S.contains = contains;
	$S.trim = trim;
	$S.clean = clean;
	$S.camelCase = camelCase;
	$S.hyphenate = hyphenate;
	$S.capitalize = capitalize;
	$S.escapeRegExp = escapeRegExp;
	$S.toInt = toInt;
	$S.toFloat = toFloat;
	$S.toSingleLine = toSingleLine;
	
	$S.toHtml = toHtml;
	$S.toTitle = toTitle;
	$S.toQueryPair = toQueryPair;
	$S.toQueryString = toQueryString;
	
	$S.hexToRgb = hexToRgb;
	$S.rgbToHex = rgbToHex;
	$S.stripScripts = stripScripts;
	$S.substitute = substitute;
	$S.replaceAll = replaceAll;
	
	$S.byteLength = byteLength;
	$S.cutRight = cutRight;
	
	$S.isNumber = isNumber;
	$S.isEmail = isEmail;
	
	$S.cutByBytes = cutByBytes;
	
	$S.encodeHtmlSimple = encodeHtmlSimple;
	$S.decodeHtmlSimple = decodeHtmlSimple;
	$S.encodeHtmlAttributeSimple = encodeHtmlAttributeSimple;
	$S.encodeHtmlAttribute = encodeHtmlAttribute;
	$S.encodeHtml = encodeHtml;
	$S.encodeScript = encodeScript;
	$S.encodeHrefScript = encodeHrefScript;
	$S.encodeRegExp = encodeRegExp;
	$S.encodeUrl = encodeUrl;
	$S.encodeUriComponent = encodeUriComponent;
	$S.vaildTencentUrl = vaildTencentUrl;

	
	












});








/**	
 * JET (Javascript Extension Tools) 
 * Copyright (c) 2009, KDV.cn, All rights reserved.
 * Code licensed under the BSD License:
 * http://developer.kdv.cn/jet/license.txt
 *
 * @fileOverview Jet!
 * @version	1.0
 * @author	Kinvix(<a href="mailto:Kinvix@gmail.com">Kinvix@gmail.com</a>)
 * @description 
 * 
 */

/**	
 * @description
 * Package: jet.http
 *
 * Need package:
 * jet.core.js
 * 
 */

/**
 * 1.[Browser part]: http 包,含有ajax,comet,loadScript,loadCss封装
 */
Jet().$package(function(J){
	var $=J.dom.id,
		$D=J.dom,
		$E=J.event,
		ajax,
		comet,
		load,
		loadCss,
		loadScript;
	
	// 兼容不同浏览器的 Adapter 适配层
	if(typeof window.XMLHttpRequest === "undefined"){
		window.XMLHttpRequest = function(){
			return new window.ActiveXObject(navigator.userAgent.indexOf("MSIE 5") >=0 ? "Microsoft.XMLHTTP" : "Msxml2.XMLHTTP");
		};
	}
	
	/**
	 * http 名字空间
	 * 
	 * @namespace
	 * @name http
	 */
	J.http = J.http || {};

	/**
	 * 这是Ajax对象名字空间的一个方法
	 * 
	 * @memberOf http
	 * @method	ajax
	 * 
	 * @param {String} uri 要加载的数据的uri
	 * @param {Object} options 配置对象，如：isAsync,data,arguments,onSuccess,onError,onComplete,onTimeout,timeout,contentType,type
	 * @return {Object} ajax 返回一个ajax对象，可以abort掉
	 */
	ajax = function(uri, options){
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

	
	/**
	 * comet方法
	 * 
	 * @memberOf http
	 * @method	comet
	 * @param {String} uri uri地址
	 * @param {Object} options 配置对象
	 * @return {Object} 返回一个comet dom对象
	 */
	comet = function(uri, options){

		uri = uri || "";
		options = {
			method : options.method || "GET",
			data : options.data || null,
			arguments : options.arguments || null,
			callback : options.callback || function(){},
			onLoad : options.onLoad || function(){},

			contentType: options.contentType ? options.contentType : "utf-8"
		};

		var connection;
		if(J.browser.ie){
			var htmlfile = new ActiveXObject("htmlfile");
			htmlfile.open();
			htmlfile.close();
			var iframediv = htmlfile.createElement("div");
			htmlfile.appendChild(iframediv);
			htmlfile.parentWindow._parent = self;
      		iframediv.innerHTML = '<iframe id="_cometIframe" src="'+uri+'?callback=window.parent._parent.'+options.callback+'"></iframe>';
      		
			connection = htmlfile.getElementById("_cometIframe");
		
		}
		else{
			connection = $D.node("iframe");
			connection.setAttribute("id", "_cometIframe");
			connection.setAttribute("src", uri+'?callback=window.parent._parent.'+options.callback);
			connection.style.position = "absolute";
			connection.style.visibility = "hidden";
			connection.style.left = connection.style.top = "-999px";
			connection.style.width = connection.style.height = "1px";
			document.body.appendChild(connection);
			self._parent = self;
		};

		$E.on(connection,"load", options.onLoad);

		return connection;
		
	};
	

	
	
	
	
	/**
	 * 这是load方法
	 * 
	 * @memberOf http
	 * @method load
	 * 
	 * @param {String} type 一个配置对象
	 * @param {Object} options 一个配置对象
	 * @return {Object} ajax 返回一个ajax对象
	 */
	load = function(type, uri, options){
		var node,
			linkNode,
			scriptNode,
			id,
			head = document.getElementsByTagName("head") ? document.getElementsByTagName("head")[0] : document.documentElement,
			timer,
			isTimeout = false,
			isComplete = false,
			options = options || {},
			isDefer = options.isDefer || false,
			query = options.query || null,
			arguments = options.arguments || null,
			
			onSuccess = options.onSuccess || function(){},
			onError = options.onError || function(){},
			onComplete = options.onComplete || function(){},
			purge,
			//尚未测试
			onTimeout = options.onTimeout || function(){},

			timeout = options.timeout ? options.timeout : 10000,
			charset = options.charset ? options.charset : "utf-8",
			win = options.win || window,
			o,
			
			getId;

        uri = uri || "";
		if(query !== null){
			uri = uri + "?" + query;
		}
		/**
		 * @ignore
		 */
		getId = function(){
	    	return load.Id++;
	    };
	    id = getId();
	    
	    /**
		 * @ignore
		 */
	    purge = function(id){
	    	head.removeChild($("jet_load_" + id));
	    };

        /**
	     * Generates a link node
	     * @method _linkNode
	     * @param uri {string} the uri for the css file
	     * @param win {Window} optional window to create the node in
	     * @return {HTMLElement} the generated node
	     * @private
	     */
	    linkNode = function(uri, win, charset) {
	        var c = charset || "utf-8";
	        return $D.node("link", {
		                "id":		"jet_load_" + id,
		                "type":		"text/css",
		                "charset":	c,
		                "rel":		"stylesheet",
		                "href":		uri
		            }, win);
	    };
	    
		/**
	     * Generates a script node
	     * @method _scriptNode
	     * @param uri {string} the uri for the script file
	     * @param win {Window} optional window to create the node in
	     * @return {HTMLElement} the generated node
	     * @private
	     */
	    scriptNode = function(uri, win, charset, isDefer) {
	        var c = charset || "utf-8";
	        var node = $D.node("script", {
		                "id":		"jet_load_" + id,
		                "type":		"text/javascript",
		                "charset":	c,
		                "src":		uri
		            }, win);
		    if(isDefer){
		    	node.setAttribute("defer", "defer");
		    }
		    
	        return node;
	    };
	    
        
	    
	    if(type === "script"){
            node = options.node || scriptNode(uri, win, charset, isDefer);
        }else if(type === "css"){
            node = options.node || linkNode(uri, win, charset);
        }
        
        
        
        if(J.browser.engine.trident){
            node.onreadystatechange = function() {
                var rs = this.readyState;
                if (rs === "loaded" || rs === "complete") {
                    node.onreadystatechange = null;

                    if(!isTimeout){
                    	isComplete = true;
                    	window.clearTimeout(timer);
                		timer = null;
                    	o={};
						o.id = id;
						o.uri = uri;
						o.arguments = arguments;
                    	onSuccess(o);
                    	onComplete(o);
                    	if(type === "script"){
	                		//purge(id);
	                	}
                    }
                }
            };

        // webkit prior to 3.x is no longer supported
        }else if(J.browser.engine.webkit){
			
            // Safari 3.x supports the load event for script nodes (DOM2)
            $E.on(node, "load", function(){
            	var o;
                if(!isTimeout){
                	isComplete = true;
                	window.clearTimeout(timer);
                	timer = null;
                	o={};
					o.id = id;
					o.uri = uri;
					o.arguments = arguments;
                	onSuccess(o);
                	onComplete(o);
                	if(type === "script"){
                		purge(id);
                	}
                }
            });


        // FireFox and Opera support onload (but not DOM2 in FF) handlers for
        // script nodes.  Opera, but not FF, supports the onload event for link
        // nodes.
        }else{ 
			
            node.onload = function(){
            	var o;
            	//J.out("else:"+J.browser.engine.name);
                if(!isTimeout){
                	isComplete = true;
                	window.clearTimeout(timer);
                	timer = null;
                	o={};
					o.id = id;
					o.uri = uri;
					o.arguments = options.arguments;
                	onSuccess(o);
                	onComplete(o);
                	
                	if(type === "script"){
                		purge(id);
                	}
                }
            };

            node.onerror = function(e){
            	var o;
            	//J.out("else:"+J.browser.engine.name);
                if(!isTimeout){
                	isComplete = true;
                	window.clearTimeout(timer);
                	timer = null;
                	o={};
					o.id = id;
					o.uri = uri;
					o.arguments = arguments;
					o.error = e;
                	onError(o);
                	onComplete(o);
                	//if(type === "script"){
                		purge(id);
                	//}
                }
            };
        }
        
        
        if(options.node){
        	if(type === "script"){
	            node.src = uri;
	        }else if(type === "css"){
	            node.href = uri;
	        }
        }else{
        	head.appendChild(node);
        }
       
        
        if(type === "script"){
            timer = window.setTimeout(function(){
				var o;
				if(!isComplete){
					isTimeout = true;
					o = {};
					o.uri = uri;
					o.arguments = arguments;
					onTimeout(o);
					onComplete(o);
					purge(id);
				}
			}, timeout);
        }
        
		var func = function(node){
			this._node = node;
			this._head = head;
		};
		func.prototype={
			abort:function(){
				this._node.src="";
				this._head.removeChild(this._node);
				delete this._node;
			}
			
		};
		return new func(node);
	};
	load.Id=0;
	
	/**
	 * 加载CSS
	 * 
	 * @memberOf http
	 * @method loadCss
	 * 
	 * @param {String} uri 要加载的css的uri
	 * @param {Object} options 配置对象，如：isDefer,query,arguments,onSuccess,onError,onComplete,onTimeout,timeout,charset
	 * @return {Object} ajax 返回一个ajax对象
	 */
	loadCss = function(uri, options){
		return load("css", uri, options);
	};
	
	/**
	 * 加载Javascript
	 * 
	 * @memberOf http
	 * @method loadScript
	 * 
	 * @param {String} uri 要加载的js脚本的uri
	 * @param {Object} options 配置对象，如：isDefer,query,arguments,onSuccess,onError,onComplete,onTimeout,timeout,charset
	 * @return {Element} 返回控制对象，可以abort掉
	 */
	loadScript = function(uri, options){
		return load("script", uri, options);
	};
	
	J.http.ajax = ajax;
	J.http.comet = comet;
	J.http.load = load;
	J.http.loadCss = loadCss;
	J.http.loadScript = loadScript;
});



/**	
 * JET (Javascript Extension Tools) 
 * Copyright (c) 2009, KDV.cn, All rights reserved.
 * Code licensed under the BSD License:
 * http://developer.kdv.cn/jet/license.txt
 *
 * @fileOverview Jet!
 * @version	1.0
 * @author	Kinvix(<a href="mailto:Kinvix@gmail.com">Kinvix@gmail.com</a>)
 * @description 
 * 
 */

/**	
 * @description
 * Package: jet.cookie
 *
 * Need package:
 * jet.core.js
 * 
 */


/**
 * cookie类
 * 
 * @namespace J.cookie
 */
Jet().$package(function(J){
	var domainPrefix = window.location.host;
	
	/**
	 * @namespace cookie 名字空间
	 * @name cookie
	 */
	J.cookie = 
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

});













/**	
 * JET (Javascript Extension Tools) 
 * Copyright (c) 2009, KDV.cn, All rights reserved.
 * Code licensed under the BSD License:
 * http://developer.kdv.cn/jet/license.txt
 *
 * @fileOverview Jet!
 * @version	1.0
 * @author	Kinvix(<a href="mailto:Kinvix@gmail.com">Kinvix@gmail.com</a>)
 * @description 
 * 
 */

/**	
 * @description
 * Package: jet.console
 *
 * Need package:
 * jet.core.js
 * jet.string.js
 * jet.http.js
 * 
 */


/**
 * 10.[Browser part]: console 控制台
 */
Jet().$package(function(J){
	var $ = J.dom.id,
		$D = J.dom,
		$E = J.event,
		$H = J.http;
		
	
	
	var _open=window.open;
	var open=function(sURL, sName, sFeatures, bReplace){
		if(sName == undefined){
			sName="_blank";
		};
		if(sFeatures == undefined){
			sFeatures="";
		};
		if(bReplace == undefined){
			bReplace=false;
		};
		
		var win=_open(sURL, sName, sFeatures, bReplace);
		if(!win){
			J.out("天啦！你的机器上竟然有软件拦截弹出窗口耶~~~");
			return false;
		}
		
		return true;
	};
	window.open = open;
	
	
	
	
	
	
	
	J.config={
		debugLevel: 1
	};
	
	
	
	
	
	/**
	 * Jet 控制台，用于显示调试信息以及进行一些简单的脚本调试等操作。可以配合 J.debug J.runtime 来进行数据显示和调试.
	 * 
	 * @type console
	 * @namespace
	 * @name console
	 */
	J.console = {
		/**
		 * 在console里显示信息
		 * 
		 * @param {String} msg 信息
		 * @param {Number} type 信息类型, 可以参考 J.console.TYPE <br/> TYPE:{<br/>
		 *            &nbsp;&nbsp;&nbsp; DEBUG:0,<br/> &nbsp;&nbsp;&nbsp; ERROR:1,<br/>
		 *            &nbsp;&nbsp;&nbsp; WARNING:2,<br/> &nbsp;&nbsp;&nbsp; INFO:3,<br/>
		 *            &nbsp;&nbsp;&nbsp; PROFILE:4<br/> }<br/>
		 * 
		 * @example
		 * J.console.print("这里是提示信息",J.console.TYPE.ERROR)
		 */
		print : function(msg, type){
			if(J.console.log){
				J.console.log((type === 4 ? (new Date() + ":") : "") + msg);
			}
		}
	};

	/**
	 * 数据监控和上报系统
	 * 
	 * @ignore
	 * @type J.Report
	 */
	J.Report = {
		/**
		 * 数据分析上报接口
		 * 
		 * @param {string} source 数据来源
		 * @param {number} type 数据返回结果,<br/> <br/>1 加载完成 <br/>2 加载失败 <br/>3 数据异常
		 *            无法解释/截断 <br/>4 速度超时 <br/>5 访问无权限 <br/> 对应的转义符是 %status%
		 * 
		 * @param {string} url 请求的数据路径
		 * @param {number} time 响应时间
		 * @ignore
		 */
		receive : J.emptyFunc,
	
		/**
		 * 添加监控规则,
		 * 
		 * @param {String} url 需要监控的url
		 * @param {String} reportUrl 出现异常后上报的地址 上报地址有几个变量替换 <br/>%status% 数据状态
		 *            <br/>%percent% 统计百分比 <br/>%url% 监听的url地址,自动encode
		 *            <br/>%fullUrl% 监听的完整的url地址，包括这个地址请求时所带 <br/>%source% js处理来源
		 *            <br/>%time% 请求花掉的时间 <br/>%scale% 比例,通常是指 1:n 其中的 n 就是 %scale%
		 * 
		 * <br/>
		 * @example
		 * J.Report.addRule("http://imgcache.qq.com/data2.js","http://imgcache.qq.com/ok?flag1=3234&flag2=%status%&1=%percent%&flag4=123456");
		 * @ignore
		 */
		addRule : J.emptyFunc
	};
	
	
	

	
	J.extend(J.console,
	/**
	 * @lends console
	 */
	{
		/**
		 * 是否进行了初始化
		 * 
		 * @type Boolean
		 */
		_isCreated : false,
	
		/**
		 * console表现模板
		 * 
		 * @type String
		 */
		_html :    '<div id="ConsoleBoxHead" class="consoleBoxHead">\
						<button id="ConsoleCloseButton" class="consoleCloseButton">x</button>\
						<h5 class="title">Console</h5>\
					</div>\
					<ul id="ConsoleOutput" class="consoleOutput"></ul>\
					<div class="consoleInputBox">\
						&gt;<input id="ConsoleInput" class="consoleInput" />\
					</div>',
	
		/**
		 * 提示框是否打开了
		 * 
		 * @type Boolean
		 */
		_opened : false,
		
		//日志记录对象
		_log_record: [],
		
		_cmd_history:[],
		_cmd_last_index:0,
	
		/**
		 * 信息类型常量，一共五种类型<br/> <br/> DEBUG : 0 <br/> ERROR : 1 <br/> WARNING : 2
		 * <br/> INFO : 3 <br/> PROFILE : 4 <br/>
		 * 
		 * @type Object
		 */
		TYPE : {
			DEBUG : 0,
			ERROR : 1,
			WARNING : 2,
			INFO : 3,
			PROFILE : 4
		},
	
		/**
		 * 样式类
		 * 
		 * @type
		 */
		_typeInfo : [["log_debug_type", "√"], ["log_error_type", "x"], ["log_warning_type", "!"], ["log_info_type", "i"], ["log_profile_type", "└"]],
	
		/**
		 * 显示console
		 */
		show : function() {
			if (!this._isCreated) {
				this._create();
			}
			this._opened = true;
			
			this._main.style.display = "block";
				
			//输入焦点过来
			window.setTimeout(J.bind(this.focusCommandLine, this), 0);
		},
	
		/**
		 * 隐藏console
		 */
		hide : function() {
			J.console._main.style.display = "none";
			J.console._opened = false;
			
		},
		
		/**
		 * 开启console
		 */
		enable : function() {
			J.option.console = true;
			this.show();
			
		},
		
		/**
		 * 关闭console
		 */
		disable : function() {
			J.option.console = false;
			this.hide();
			
		},
	
		/**
		 * 初始化控制台
		 * 
		 * @ignore
		 */
		_init : function() {
			this.print = this.out;
			// 快捷键开启
			$E.on(document, "keydown", J.bind(this.handleDocumentKeydown, this));
			if (J.option.console) {
				this.show();
			}
		},
		_create:function(){
			
			
			$H.loadCss(J.path+"assets/jet.css");
			this._main = document.createElement("div");
			
			this._main.id="JetConsole";
			this._main.style.display="none";
			this._main.className = "consoleBox";
			this._main.innerHTML = this._html;
			//alert(window.document.body)
			window.document.body.appendChild(this._main);
			
			
			this._headEl = $("ConsoleBoxHead");
			this._inputEl = $("ConsoleInput");
			this._closeButtonEl = $("ConsoleCloseButton");
			this._outputEl = $("ConsoleOutput");

			// 如果存在拖拽类
			if (J.dragdrop) {
				J.dragdrop.registerDragdropHandler(this._headEl, this._main);
			}
			
	
			// 绑定方法
			$E.on(this._inputEl, "keyup", J.bind(this._execScript,this));
			//$E.on(this._inputEl, "keypress", J.bind(this._execScript,this));
			$E.on(this._closeButtonEl, "click", this.hide);
			// 输入焦点过来
			// $E.on(this._main, "dblclick", this.focusCommandLine.bind(this));
			

			
			if(J.option.debug > J.DEBUG.NO_DEBUG){
				this.setToDebug();
			}else{
				this.setToNoDebug();
			}
			this._isCreated = true;
			this.out("Welcome to JET(Javascript Extension Tools)...", this.TYPE.INFO);
			
			
		},
		
		handleDocumentKeydown: function(e){
			switch(e.keyCode){
				//case 74:	// J 键:74
				case 192:	// `~键:192
					if(e.ctrlKey){
						
						this.toggleShow();
						e.preventDefault();
					}
					break;
				default: break;
			}
		},
		
		focusCommandLine: function(){
			this._inputEl.focus();
		},
		
		toggleShow:function(){
			if(this._opened){
				this.hide();
				
				//J.option.debug = J.DEBUG.NO_DEBUG;
			}else{
				this.show();
				//J.option.debug = J.DEBUG.SHOW_ALL;
				
			}
			
		},
		
		/**
		 * 控制台记录信息
		 * 
		 * @param {String} msg 要输出的信息
		 * @param {Number} type 要输出的信息的类型，可选项
		 * @return {String} 返回要输出的信息
		 */
		outConsoleShow:function(msg, type){
			this.outConsole(msg, type);
			
			if ((!this._opened) && J.option.console) {
				this.show();
			}
		},
		
		/**
		 * 向控制台输出信息并显示
		 * 
		 * @param {String} msg 要输出的信息
		 * @param {Number} type 要输出的信息的类型，可选项
		 * @return {String} 返回要输出的信息
		 */
		outConsole: function(msg, type) {
			type = type || 3;
			this.log(msg, type);
			
			if(type < J.option.debug){
				var _item = document.createElement("li");
				this._outputEl.appendChild(_item);
				
				var _ti = J.console._typeInfo[type] || J.console._typeInfo[0];
				_item.className = _ti[0];
				_item.innerHTML = '<span class="log_icon">' + _ti[1] + '</span>' + msg;
		
				this._outputEl.scrollTop = this._outputEl.scrollHeight;
			}
		},
		
		/**
		 * 向控制台输出信息的方法
		 * 
		 * @param {String} msg 要输出的信息
		 * @param {Number} type 要输出的信息的类型，可选项
		 * @return {String} 返回要输出的信息
		 */
		out:function(){	
		},
		
		
		setToDebug:function(){
			this.out = this.outConsoleShow;
		},
		
		setToNoDebug:function(){
			this.out = this.outConsole;
		},

		log: function(msg, type){
			
			this._log_record.push([msg,type]);
		},

		/**
		 * 清空log
		 */
		clear : function() {
			J.console._outputEl.innerHTML = "";
		},
	
		/**
		 * 执行脚本
		 */
		_execScript : function(e) {
			switch(e.keyCode){
				case 13:
					this._cmd_history.push(J.console._inputEl.value);
					this._cmd_last_index=this._cmd_history.length;
					break;
				case 38://上一命令
					if(this._cmd_history.length==0)return;
					var s="";
					if(this._cmd_last_index>0){
						this._cmd_last_index--;
						s=this._cmd_history[this._cmd_last_index];
					}else{
						this._cmd_last_index=-1;
					}
					J.console._inputEl.value=s;
					return;
				case 40://下一命令
					if(this._cmd_history.length==0)return;
					var s="";
					if(this._cmd_last_index<this._cmd_history.length-1){
						this._cmd_last_index++;
						s=this._cmd_history[this._cmd_last_index];
					}else{
						this._cmd_last_index=this._cmd_history.length;
					}
					J.console._inputEl.value=s;
					return;
				default:
					return;
			}
			// 控制台命令
			switch (J.console._inputEl.value) {
				case "help" :
					var _rv = "&lt;&lt; Console Help &gt;&gt;<br/>\
								help  : 控制台帮助<br/>\
								clear : 清空控制台输出<br/>\
								hide  : 隐藏控制台，或者使用 Ctrl + `(~) 快捷键"
					J.console.out(_rv, 3);
					break;
				case "clear" :
					J.console.clear();
					break;
				case "hide" :
				
					J.console.hide();
					break;
				default :
					var _rv = '<span style="color:#ccff00">' + J.console._inputEl.value + '</span><br/>';
					try {
						_rv += (eval(J.console._inputEl.value) || "").toString().replace(/</g, "&lt;").replace(/>/g, "&gt;")
						J.console.out(_rv, 0);
					} catch (e) {
						_rv += e.description;
						J.console.out(_rv, 1);
					}
			}
	
			J.console._inputEl.value = "";
		}
	});
	

	
	
	
	
	
	
	var topNamespace = this,
		query = J.string.mapQuery(window.location.search);
		
	if(query.console){
		if(query.console == "firebug"){
			
			if(topNamespace.console){
				topNamespace.console.out = function(msg){
					topNamespace.console.log(msg);
				};
				J.console = topNamespace.console;
			
			}else{
				// http://getfirebug.com/releases/lite/1.2/firebug-lite.js
				$H.loadScript(J.path+"firebug/firebug-lite.js",{
					onSuccess : function(){
						firebug.env.height = 220;
						// http://getfirebug.com/releases/lite/1.2/firebug-lite.css
						firebug.env.css = "../../source/firebug/firebug-lite.css";
						
						topNamespace.console.out = function(msg){
							topNamespace.console.log(msg);
						};
						J.console = topNamespace.console;

						J.out("...控制台开启");
						J.out("...测试成功");
					}
				});
			}
		}
		else if(query.console == "true"){
			$E.onDomReady(function(){
				J.console._init();
				J.console.show();
			});
			
			J.console=J.extend(J.console,{
				'log':J.emptyFunc,
				'info':J.emptyFunc,
				'warn':J.emptyFunc,
				'dir':J.emptyFunc
			});
		}
	}else{
		J.console={
			'log':J.emptyFunc,
			'info':J.emptyFunc,
			'warn':J.emptyFunc,
			'dir':J.emptyFunc,
			'out':J.emptyFunc
		};
	}
	
	
	

	
	
	
	
	
	
	
	
	/**
	 * runtime处理工具静态类
	 * 
	 * @namespace runtime处理工具静态类
	 * @name runtime
	 */
	J.runtime = (function() {
		/**
		 * 是否debug环境
		 * 
		 * @return {Boolean} 是否呢
		 */
		function isDebugMode() {
			return (J.config.debugLevel > 0);
		}
	
		/**
		 * log记录器
		 * 
		 * @ignore
		 * @param {String} msg 信息记录器
		 */
		function log(msg, type) {
			var info;
			if (isDebugMode()) {
				info = msg + '\n=STACK=\n' + stack();
			} else {
				if (type == 'error') {
					info = msg;
				} else if (type == 'warn') {
					// TBD
				}
			}
			J.Debug.errorLogs.push(info);
		}
	
		/**
		 * 警告信息记录
		 * 
		 * @param {String} sf 信息模式
		 * @param {All} args 填充参数
		 */
		function warn(sf, args) {
			log(write.apply(null, arguments), 'warn');
		}
	
		/**
		 * 错误信息记录
		 * 
		 * @param {String} sf 信息模式
		 * @param {All} args 填充参数
		 */
		function error(sf, args) {
			log(write.apply(null, arguments), 'error');
		}
	
		/**
		 * 获取当前的运行堆栈信息
		 * 
		 * @param {Error} e 可选，当时的异常对象
		 * @param {Arguments} a 可选，当时的参数表
		 * @return {String} 堆栈信息
		 */
		function stack(e, a) {
			function genTrace(ee, aa) {
				if (ee.stack) {
					return ee.stack;
				} else if (ee.message.indexOf("\nBacktrace:\n") >= 0) {
					var cnt = 0;
					return ee.message.split("\nBacktrace:\n")[1].replace(/\s*\n\s*/g, function() {
						cnt++;
						return (cnt % 2 == 0) ? "\n" : " @ ";
					});
				} else {
					var entry = (aa.callee == stack) ? aa.callee.caller : aa.callee;
					var eas = entry.arguments;
					var r = [];
					for (var i = 0, len = eas.length; i < len; i++) {
						r.push((typeof eas[i] == 'undefined') ? ("<u>") : ((eas[i] === null) ? ("<n>") : (eas[i])));
					}
					var fnp = /function\s+([^\s\(]+)\(/;
					var fname = fnp.test(entry.toString()) ? (fnp.exec(entry.toString())[1]) : ("<ANON>");
					return (fname + "(" + r.join() + ");").replace(/\n/g, "");
				}
			}
	
			var res;
	
			if ((e instanceof Error) && (typeof arguments == 'object') && (!!arguments.callee)) {
				res = genTrace(e, a);
			} else {
				try {
					({}).sds();
				} catch (err) {
					res = genTrace(err, arguments);
				}
			}
	
			return res.replace(/\n/g, " <= ");
		}
	
		return {
			/**
			 * 获取当前的运行堆栈信息
			 * 
			 * @param {Error} e 可选，当时的异常对象
			 * @param {Arguments} a 可选，当时的参数表
			 * @return {String} 堆栈信息
			 */
			stack : stack,
			/**
			 * 警告信息记录
			 * 
			 * @param {String} sf 信息模式
			 * @param {All} args 填充参数
			 */
			warn : warn,
			/**
			 * 错误信息记录
			 * 
			 * @param {String} sf 信息模式
			 * @param {All} args 填充参数
			 */
			error : error,
			
			/**
			 * 是否调试模式
			 */
			isDebugMode : isDebugMode
		};
	
	})();

});














/**	
 * @description
 * Package: jet.mini
 *
 * Need package:
 * jet.core.js
 * 
 */
 
Jet().$package(function(J){

	
/**
 * "mini" Selector Engine
 * Copyright (c) 2009 James Padolsey
 * -------------------------------------------------------
 * Dual licensed under the MIT and GPL licenses.
 *    - http://www.opensource.org/licenses/mit-license.php
 *    - http://www.gnu.org/copyleft/gpl.html
 * -------------------------------------------------------
 * Version: 0.01 (BETA)
 */


var mini = (function(){
    
    var snack = /(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,
        exprClassName = /^(?:[\w\-_]+)?\.([\w\-_]+)/,
        exprId = /^(?:[\w\-_]+)?#([\w\-_]+)/,
        exprNodeName = /^([\w\*\-_]+)/,
        na = [null,null];
    
    function _find(selector, context) {
        
        /**
         * This is what you call via x()
         * Starts everything off...
         */
        
        context = context || document;
        
        var simple = /^[\w\-_#]+$/.test(selector);
        
        if (!simple && context.querySelectorAll) {
            return realArray(context.querySelectorAll(selector));
        }
        
        if (selector.indexOf(',') > -1) {
            var split = selector.split(/,/g), ret = [], sIndex = 0, len = split.length;
            for(; sIndex < len; ++sIndex) {
                ret = ret.concat( _find(split[sIndex], context) );
            }
            return unique(ret);
        }
        
        var parts = selector.match(snack),
            part = parts.pop(),
            id = (part.match(exprId) || na)[1],
            className = !id && (part.match(exprClassName) || na)[1],
            nodeName = !id && (part.match(exprNodeName) || na)[1],
            collection;
            
        if (className && !nodeName && context.getElementsByClassName) {
            
            collection = realArray(context.getElementsByClassName(className));
            
        } else {
            
            collection = !id && realArray(context.getElementsByTagName(nodeName || '*'));
            
            if (className) {
                collection = filterByAttr(collection, 'className', RegExp('(^|\\s)' + className + '(\\s|$)'));
            }
            
            if (id) {
                var byId = context.getElementById(id);
                return byId?[byId]:[];
            }
        }
        
        return parts[0] && collection[0] ? filterParents(parts, collection) : collection;
        
    }
    
    function realArray(c) {
        
        /**
         * Transforms a node collection into
         * a real array
         */
        
        try {
            return Array.prototype.slice.call(c);
        } catch(e) {
            var ret = [], i = 0, len = c.length;
            for (; i < len; ++i) {
                ret[i] = c[i];
            }
            return ret;
        }
        
    }
    
    function filterParents(selectorParts, collection, direct) {
        
        /**
         * This is where the magic happens.
         * Parents are stepped through (upwards) to
         * see if they comply with the selector.
         */
        
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
        
        return function(arr) {
        
            /**
             * Returns a unique array
             */
            
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
    
    function filterByAttr(collection, attr, regex) {
        
        /**
         * Filters a collection by an attribute.
         */
        
        var i = -1, node, r = -1, ret = [];
        
        while ( (node = collection[++i]) ) {
            if (regex.test(node[attr])) {
                ret[++r] = node;
            }
        }
        
        return ret;
    }
    
    return _find;
    
})();




	/*
	 * ////////////////////////////////////////////////////////////////
	 * 
	 * Adapter to JET
	 * 
	 * ////////////////////////////////////////////////////////////////
	 */
	/**
	 * 一个据说比jq还快的筛选器，可以满足日常99%的筛选需要
	 * 
	 * @param {String} query string 筛选器语法
	 * @returns {Element} 返回筛选出的dom元素
	 * 
	 * @example
	 * //创建一个匿名package包：
	 * Jet().$package(function(J){
	 * 	//这时上下文对象this指向全局window对象
	 * 	var lists = J.dom.mini(".list");
	 * };
	 * 
	 */
	J.dom.mini = mini;



});
/**	
 * JET (Javascript Extend Tools) 
 * Copyright (c) 2009, KDV.cn, All rights reserved.
 * 
 *
 * @version	1.0
 * @author	Kinvix(<a href="mailto:Kinvix@gmail.com">Kinvix@gmail.com</a>)
 * 
 */

/**	
 * @description
 * Package: jet.json
 *
 * Need package:
 * jet.core.js
 * 
 */

/**
 * [Javascript core part]: JSON 扩展
 */
 
 
Jet().$package(function(J){
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


	J.json = JSON;


});


















/**	
 * JET (Javascript Extension Tools) 
 * Copyright (c) 2009, KDV.cn, All rights reserved.
 * Code licensed under the BSD License:
 * http://developer.kdv.cn/jet/license.txt
 *
 * @fileOverview Jet!
 * @version	1.0
 * @author	Kinvix(<a href="mailto:Kinvix@gmail.com">Kinvix@gmail.com</a>)
 * @description 
 * 
 */
 
 
/**	
 * @description
 * Package: jet.fx
 * 
 * Need package:
 * jet.core.js
 * 
 */
 
 
 /**
 * fx
 */
Jet().$package(function(J){
	J.fx = J.fx || {};
	
});
/**
 * tween模块
 */
Jet().$package(function(J){
	var $D = J.dom,
		$E = J.event,
		$T = J.fx.tween;
	/*
	http://www.cnblogs.com/cloudgamer/archive/2009/01/06/Tween.html
	
	Linear：无缓动效果；
	Quadratic：二次方的缓动（t^2）；
	Cubic：三次方的缓动（t^3）；
	Quartic：四次方的缓动（t^4）；
	Quintic：五次方的缓动（t^5）；
	Sinusoidal：正弦曲线的缓动（sin(t)）；
	Exponential：指数曲线的缓动（2^t）；
	Circular：圆形曲线的缓动（sqrt(1-t^2)）；
	Elastic：指数衰减的正弦曲线缓动；
	Back：超过范围的三次方缓动（(s+1)*t^3 - s*t^2）；
	Bounce：指数衰减的反弹缓动。


	每个效果都分三个缓动方式（方法），分别是：
	easeIn：从0开始加速的缓动；
	easeOut：减速到0的缓动；
	easeInOut：前半段从0开始加速，后半段减速到0的缓动。
	其中Linear是无缓动效果，没有以上效果。



	t: current time（当前时间）；
	b: beginning value（初始值）；
	c: change in value（变化量）；
	d: duration（持续时间）。

	*/
	var tween = {
		// linear：无缓动效果；
		linear: function(t,b,c,d){ return c*t/d + b; },
		
		// quadratic：二次方的缓动（t^2）；
		quadratic: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t + b;
			},
			easeOut: function(t,b,c,d){
				return -c *(t/=d)*(t-2) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t + b;
				return -c/2 * ((--t)*(t-2) - 1) + b;
			}
		},
		
		// cubic：三次方的缓动（t^3）；
		cubic: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return c*((t=t/d-1)*t*t + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t + b;
				return c/2*((t-=2)*t*t + 2) + b;
			}
		},
		
		// quartic：四次方的缓动（t^4）；
		quartic: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return -c * ((t=t/d-1)*t*t*t - 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
				return -c/2 * ((t-=2)*t*t*t - 2) + b;
			}
		},
		
		// quintic：五次方的缓动（t^5）；
		quintic: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return c*((t=t/d-1)*t*t*t*t + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
				return c/2*((t-=2)*t*t*t*t + 2) + b;
			}
		},
		
		// sinusoidal：正弦曲线的缓动（sin(t)）；
		sinusoidal: {
			easeIn: function(t,b,c,d){
				return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
			},
			easeOut: function(t,b,c,d){
				return c * Math.sin(t/d * (Math.PI/2)) + b;
			},
			easeInOut: function(t,b,c,d){
				return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
			}
		},
		
		// exponential：指数曲线的缓动（2^t）；
		exponential: {
			easeIn: function(t,b,c,d){
				return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
			},
			easeOut: function(t,b,c,d){
				return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if (t==0) return b;
				if (t==d) return b+c;
				if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
				return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
			}
		},
		
		// circular：圆形曲线的缓动（sqrt(1-t^2)）；
		circular: {
			easeIn: function(t,b,c,d){
				return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
			},
			easeOut: function(t,b,c,d){
				return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
				return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
			}
		},
		
		// elastic：指数衰减的正弦曲线缓动；
		elastic: {
			easeIn: function(t,b,c,d,a,p){
				if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
				if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			},
			easeOut: function(t,b,c,d,a,p){
				if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
				if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
			},
			easeInOut: function(t,b,c,d,a,p){
				if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
				if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
				return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
			}
		},
		
		// back：超过范围的三次方缓动（(s+1)*t^3 - s*t^2）；
		back: {
			easeIn: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158;
				return c*(t/=d)*t*((s+1)*t - s) + b;
			},
			easeOut: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158;
				return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
			},
			easeInOut: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158; 
				if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
				return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
			}
		},
		
		// bounce：指数衰减的反弹缓动。
		bounce: {
			easeIn: function(t,b,c,d){
				return c - tween.bounce.easeOut(d-t, 0, c, d) + b;
			},
			easeOut: function(t,b,c,d){
				if ((t/=d) < (1/2.75)) {
					return c*(7.5625*t*t) + b;
				} else if (t < (2/2.75)) {
					return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
				} else if (t < (2.5/2.75)) {
					return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
				} else {
					return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
				}
			},
			easeInOut: function(t,b,c,d){
				if (t < d/2) return tween.bounce.easeIn(t*2, 0, c, d) * .5 + b;
				else return tween.bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
			}
		}
	}
	
	
	var Animation = new J.Class({
		init : function(el, style, begin, end, fx, total){

			var fx = fx,
				total = total || 20,
				context = this,
				value;
				
			this._begin = begin;
			this._end = end;

			var _run = this._run = function(){
				
				if(context.current < total){
					context.current++;
					/*
					current:当前比率
					begin:0%时输出的实际值
					end:100%时输出的实际值
					total:总比率
					*/
					if(context._begin > context._end){
						value = context._begin - Math.ceil(fx(context.current, 0, (context._begin - context._end), total));
					}else{
						value = context._begin + Math.ceil(fx(context.current, 0, (context._end - context._begin), total));
					}
					
					$D.setStyle(el, style, value + "px");
					context._timer = setTimeout(_run, 30);
				}else{
					//$D.setStyle(el, style, end + "px");
					$E.notifyObservers(context, "finish");
				}
			};
		
			
			
		},
		setBegin : function(begin){
			this._begin = begin;
		},
		
		setEnd : function(end){
			this._end = end;
		},

		start : function(){
			clearTimeout(this._timer);
			this.current = 0;
			//$D.setStyle(this.el, this.style, this.begin + "px");
			this._run();
		}
	});
	
	
	J.fx.Animation = Animation;
	J.fx.tween = tween;
});













/**	
 * JET (Javascript Extension Tools) 
 * Copyright (c) 2009, KDV.cn, All rights reserved.
 * Code licensed under the BSD License:
 * http://developer.kdv.cn/jet/license.txt
 *
 * @fileOverview Jet!
 * @version	1.0
 * @author	Kinvix(<a href="mailto:Kinvix@gmail.com">Kinvix@gmail.com</a>)
 * @description 
 * 
 */


/**	
 * @description
 * Package: jet.ui
 *
 * Need package:
 * jet.core.js
 * 
 */


/**
 * ui模块包
 */
Jet().$package(function(J){
	/**
	 * ui 名字空间
	 * 
	 * @namespace
	 * @name ui
	 */
	J.ui = J.ui || {};
});


/**
 * 拖拽模块
 */
Jet().$package(function (J) {
    var $D = J.dom,
		$E = J.event;

    var ieSelectFix = function (e) {
        e.preventDefault();
        //return false;
    };
	
	var _clientWidth=false,
		_clientHeight=false,
		_width=false,
		_height=false;
    /**
	 * 拖拽类
	 * 
	 * @memberOf ui
	 * @Class
	 * 
	 * @param {Element} apperceiveEl 监听拖拽动作的元素
	 * @param {Element} effectEl 展现拖拽结果的元素
	 * @param {Object} option 其他选项，如:isLimited,leftMargin...
	 * @returns
	 * 
	 * 
	 */
    J.ui.Drag = new J.Class({
        init: function (apperceiveEl, effectEl, option) {
            var context = this;
            var curDragElementX, curDragElementY, dragStartX, dragStartY;
            this.apperceiveEl = apperceiveEl;
            option = option || {};
            this.isLimited = option.isLimited || false;
            if (this.isLimited) {
                this._leftMargin = option.leftMargin || 0;
                this._topMargin = option.topMargin || 0;
                this._rightMargin = option.rightMargin || 0;
                this._bottomMargin = option.bottomMargin || 0;
            }


            if (effectEl === false) {
                this.effectEl = false;
            } else {
                this.effectEl = effectEl || apperceiveEl;
            }




            this.dragStart = function (e) {
                e.preventDefault();
                e.stopPropagation();
				
				//缓存高宽
				_clientWidth = $D.getClientWidth();
				_clientHeight = $D.getClientHeight();
				_width = parseInt($D.getStyle(effectEl, "width"));
				_height = parseInt($D.getStyle(effectEl, "height"));
				
				if(J.browser.ie)
				{
					curDragElementX = parseInt($D.getStyle(context.apperceiveEl, "left")+10) || 0;
					curDragElementY = parseInt($D.getStyle(context.apperceiveEl, "top")+10) || 0;
				}
				else{
					curDragElementX = parseInt($D.getStyle(context.effectEl, "left")) || 0;
					curDragElementY = parseInt($D.getStyle(context.effectEl, "top")) || 0;
				}
                dragStartX = e.pageX;
                dragStartY = e.pageY;
                $E.on(document, "mousemove", context.dragMove);
                $E.on(document, "mouseup", context.dragStop);
                if (J.browser.ie) {
                    $E.on(document.body, "selectstart", ieSelectFix);
                }

                $E.notifyObservers(context, "start", { x: curDragElementX, y: curDragElementY });
            };

            this.dragMove = function (e) {
                var x = curDragElementX + (e.pageX - dragStartX);
                var y = curDragElementY + (e.pageY - dragStartY);
                var isMoved = false;


                if (context.isLimited) {
                    var tempX = _clientWidth - _width - context._rightMargin;
                    if (x > tempX) {
                        x = tempX;
                    }
                    tempX = context._leftMargin;
                    if (x < tempX) {
                        x = tempX;
                    }

                }
                if (context._oldX !== x) {
                    context._oldX = x;
                    if (context.effectEl) {
                        context.effectEl.style.left = x + "px";
                    }
                    isMoved = true;
                }

                //J.out("context._topMargin: "+context._topMargin);
                if (context.isLimited) {
                    var tempY = _clientHeight - _height - context._bottomMargin;
                    if (y > tempY) {
                        y = tempY;
                    }
                    tempY = context._topMargin;
                    if (y < tempY) {
                        y = tempY;
                    }

                }

                if (context._oldY !== y) {
                    context._oldY = y;
                    if (context.effectEl) {
                        context.effectEl.style.top = y + "px";
                    }
                    isMoved = true;
                }


                if (isMoved) {
                    $E.notifyObservers(context, "move", { x: x, y: y });
                }

            };
			
            this.dragStop = function (e) {
                $E.notifyObservers(context, "end", { x: context._oldX, y: context._oldY });
				_clientWidth = false;
				_clientHeight = false;
				_width = false;
				_height = false;
                $E.off(document, "mousemove", context.dragMove);
                $E.off(document, "mouseup", context.dragStop);
                if (J.browser.ie) {
                    $E.off(document.body, "selectstart", ieSelectFix);
                }
                J.out("end")
            };

            $E.on(this.apperceiveEl, "mousedown", this.dragStart);
        },
        lock: function () {
            $E.off(this.apperceiveEl, "mousedown", this.dragStart);
        },
        unlock: function () {
            $E.on(this.apperceiveEl, "mousedown", this.dragStart);
        },
        show: function () {
            $D.show(this.apperceiveEl);
        },
        hide: function () {
            $D.hide(this.apperceiveEl);
        }
    });



});






/**
 * Resize 模块
 */
Jet().$package(function (J) {
    J.ui = J.ui || {};
    var $D = J.dom,
		$E = J.event;

    var id = 0;
    var handleNames = {
        t: "t",
        r: "r",
        b: "b",
        l: "l",
        rt: "rt",
        rb: "rb",
        lb: "lb",
        lt: "lt"
    };


    /**
    * resize类
    * 
    * @memberOf ui
    * @Class
    * 
    * @param {Element} apperceiveEl 监听resize动作的元素
    * @param {Element} effectEl 展现resize结果的元素
    * @param {Object} option 其他选项，如:dragProxy,size,minWidth...
    * @returns 
    * 
    * 
    */
    J.ui.Resize = new J.Class({
        init: function (apperceiveEl, effectEl, option) {
            var context = this;
            option = option || {};

            this.apperceiveEl = apperceiveEl;
            if (effectEl === false) {
                this.effectEl = false;
            } else {
                this.effectEl = effectEl || apperceiveEl;
            }

            this.size = option.size || 5;
            this.minWidth = option.minWidth || 0;
            this.minHeight = option.minHeight || 0;
            this._dragProxy = option.dragProxy;

            this._left = this.getLeft();
            this._top = this.getTop();
            this._width = this.getWidth();
            this._height = this.getHeight();

            this.id = this.getId();

            var styles = {
                t: "cursor:n-resize; z-index:1; left:0; top:-5px; width:100%; height:5px;",
                r: "cursor:e-resize; z-index:1; right:-5px; top:0; width:5px; height:100%;",
                b: "cursor:s-resize; z-index:1; left:0; bottom:-5px; width:100%; height:5px;",
                l: "cursor:w-resize; z-index:1; left:-5px; top:0; width:5px; height:100%;",
                rt: "cursor:ne-resize; z-index:2; right:-5px; top:-5px; width:5px; height:5px;",
                rb: "cursor:se-resize; z-index:2; right:-5px; bottom:-5px; width:5px; height:5px;",
                lt: "cursor:nw-resize; z-index:2; left:-5px; top:-5px; width:5px; height:5px;",
                lb: "cursor:sw-resize; z-index:2; left:-5px; bottom:-5px; width:5px; height:5px;"
            };

            this._onMousedown = function () {
                $E.notifyObservers(context, "mousedown", { width: context._width, height: context._height });
            };
            this._onDragEnd = function () {
                J.out("this._width： " + context._width);
			    J.out("this._height： " + context._height);
                $E.notifyObservers(context, "end", {
                    x: context.getLeft(),
                    y: context.getTop(),
                    width: context.getWidth(),
                    height: context.getHeight()
                });
            };

            for (var p in handleNames) {
                var tempEl = $D.node("div", {
                    "id": "window_" + this.id + "_resize_" + handleNames[p]
                });

                this.apperceiveEl.appendChild(tempEl);
                $D.setCssText(tempEl, "position:absolute; overflow:hidden; background:url(" + J.path + "assets/images/transparent.gif);" + styles[p]);
                if (this._dragProxy) {
                    //$E.on(tempEl, "mousedown", this._onMousedown);
                } else {

                }

                this["_dragController_" + handleNames[p]] = new J.ui.Drag(tempEl, false);

            }



            // 左侧
            this._onDragLeftStart = function (xy) {
                $E.notifyObservers(context, "mousedown", { width: context._width, height: context._height });
                context._startLeft = context._left = context.getLeft();
                context._startWidth = context._width = context.getWidth();
            };
            this._onDragLeft = function (xy) {
                var w = context._startWidth - xy.x;
                var x = context._startLeft + xy.x;
                if (w < context.minWidth) {
                    w = context.minWidth;
                    x = context._startLeft + (context._startWidth - w);
                }
                context.setLeft(x);
                context.setWidth(w);
                $E.notifyObservers(context, "resize", { width: context._width, height: context._height });

            };

            // 上侧
            this._onDragTopStart = function (xy) {
                $E.notifyObservers(context, "mousedown", { width: context._width, height: context._height });
                context._startTop = context._top = context.getTop();
                context._startHeight = context._height = context.getHeight();
            };
            this._onDragTop = function (xy) {
                var h = context._startHeight - xy.y;
                var y = context._startTop + xy.y;
                if (h < context.minHeight) {
                    h = context.minHeight;
                    y = context._startTop + (context._startHeight - h);
                }
                context.setTop(y);
                context.setHeight(h);
                $E.notifyObservers(context, "resize", { width: context._width, height: context._height });
            };



            // 右侧
            this._onDragRightStart = function (xy) {
                 $E.notifyObservers(context, "mousedown", { width: context._width, height: context._height });
				context._startWidth = context._width = context.getWidth();
                 //context._startWidth = ;
                //context._startWidth = context._width = context.startSize.width; // context.startWidth;
            };
            this._onDragRight = function (xy) {
                var w = context._startWidth + xy.x;
                if (w < context.minWidth) {
                    w = context.minWidth;
                }
                context.setWidth(w);
                $E.notifyObservers(context, "resize", { width: context._width, height: context._height });
            };


            // 下侧
            this._onDragBottomStart = function (xy) {
                $E.notifyObservers(context, "mousedown", { width: context._width, height: context._height });
                context._startHeight = context._height = context.getHeight();
            };
            this._onDragBottom = function (xy) {
                var h = context._startHeight + xy.y;
                if (h < context.minHeight) {
                    h = context.minHeight;
                }
                context.setHeight(h);
                $E.notifyObservers(context, "resize", { width: context._width, height: context._height });
            };

            // 左上
            this._onDragLeftTopStart = function (xy) {
                context._onDragLeftStart(xy);
                context._onDragTopStart(xy);
            };
            this._onDragLeftTop = function (xy) {
                context._onDragLeft(xy);
                context._onDragTop(xy);
            };

            // 左下
            this._onDragLeftBottomStart = function (xy) {
                context._onDragLeftStart(xy);
                context._onDragBottomStart(xy);
            };
            this._onDragLeftBottom = function (xy) {
                context._onDragLeft(xy);
                context._onDragBottom(xy);
            };


            // 右下
            this._onDragRightBottomStart = function (xy) {
                context._onDragRightStart(xy);
                context._onDragBottomStart(xy);
            };
            this._onDragRightBottom = function (xy) {
                context._onDragRight(xy);
                context._onDragBottom(xy);
            };

            // 右上
            this._onDragRightTopStart = function (xy) {
                context._onDragRightStart(xy);
                context._onDragTopStart(xy);
            };
            this._onDragRightTop = function (xy) {
                context._onDragRight(xy);
                context._onDragTop(xy);
            };



            $E.addObserver(this["_dragController_" + handleNames.t], "start", this._onDragTopStart);
            $E.addObserver(this["_dragController_" + handleNames.t], "move", this._onDragTop);
            $E.addObserver(this["_dragController_" + handleNames.t], "end", this._onDragEnd);

            $E.addObserver(this["_dragController_" + handleNames.r], "start", this._onDragRightStart);
            $E.addObserver(this["_dragController_" + handleNames.r], "move", this._onDragRight);
            $E.addObserver(this["_dragController_" + handleNames.r], "end", this._onDragEnd);

            $E.addObserver(this["_dragController_" + handleNames.b], "start", this._onDragBottomStart);
            $E.addObserver(this["_dragController_" + handleNames.b], "move", this._onDragBottom);
            $E.addObserver(this["_dragController_" + handleNames.b], "end", this._onDragEnd);

            $E.addObserver(this["_dragController_" + handleNames.l], "start", this._onDragLeftStart);
            $E.addObserver(this["_dragController_" + handleNames.l], "move", this._onDragLeft);
            $E.addObserver(this["_dragController_" + handleNames.l], "end", this._onDragEnd);



            $E.addObserver(this["_dragController_" + handleNames.rb], "start", this._onDragRightBottomStart);
            $E.addObserver(this["_dragController_" + handleNames.rb], "move", this._onDragRightBottom);
            $E.addObserver(this["_dragController_" + handleNames.rb], "end", this._onDragEnd);

            $E.addObserver(this["_dragController_" + handleNames.rt], "start", this._onDragRightTopStart);
            $E.addObserver(this["_dragController_" + handleNames.rt], "move", this._onDragRightTop);
            $E.addObserver(this["_dragController_" + handleNames.rt], "end", this._onDragEnd);

            $E.addObserver(this["_dragController_" + handleNames.lt], "start", this._onDragLeftTopStart);
            $E.addObserver(this["_dragController_" + handleNames.lt], "move", this._onDragLeftTop);
            $E.addObserver(this["_dragController_" + handleNames.lt], "end", this._onDragEnd);

            $E.addObserver(this["_dragController_" + handleNames.lb], "start", this._onDragLeftBottomStart);
            $E.addObserver(this["_dragController_" + handleNames.lb], "move", this._onDragLeftBottom);
            $E.addObserver(this["_dragController_" + handleNames.lb], "end", this._onDragEnd);
        },

        setWidth: function (w) {
            $D.setStyle(this.effectEl, "width", w + "px");
            this._width = w;
        },
        setHeight: function (h) {
            $D.setStyle(this.effectEl, "height", h + "px");
            this._height = h;
        },

        setLeft: function (x) {
            $D.setStyle(this.effectEl, "left", x + "px");
            this._left = x;
        },
        setTop: function (y) {
            $D.setStyle(this.effectEl, "top", y + "px");
            this._top = y;
        },


        getWidth: function () {
            return parseInt($D.getStyle(this.effectEl, "width"));
        },
        getHeight: function () {
            return parseInt($D.getStyle(this.effectEl, "height"));
        },

        getLeft: function () {
            return parseInt($D.getStyle(this.effectEl, "left"));
        },
        getTop: function () {
            return parseInt($D.getStyle(this.effectEl, "top"));
        },
        getId: function () {
            return id++;
        },

        lock: function () {
            for (var p in handleNames) {
                this["_dragController_" + handleNames[p]].lock();
            }
        },
        unlock: function () {
            for (var p in handleNames) {
                this["_dragController_" + handleNames[p]].unlock();
            }
        },
        show: function () {
            for (var p in handleNames) {
                this["_dragController_" + handleNames[p]].show();
            }
        },
        hide: function () {
            for (var p in handleNames) {
                this["_dragController_" + handleNames[p]].hide();
            }
        }
    });



});

/**
 * tab模块
 */
Jet().$package(function(J){
	var $ = J.dom.id,
		$D = J.dom,
		$E = J.event;
		
		
	/**
	 * Tab类
	 * 
	 * @memberOf ui
	 * 
	 * @param {Element} triggers tab head元素
	 * @param {Element} sheets tab body元素
	 * @param {Object} config 其他选项，如:isLimited,leftMargin...
	 * @returns
	 * 
	 * 
	 */
	J.ui.Tab = function(triggers,sheets,config){
		this.tabs = [];             //tab的集合
		this.currentTab = null;     //当前tab
		this.config = {
			defaultIndex : 0,       //默认的tab索引
			triggerEvent : 'click', //默认的触发事件
			slideEnabled : false,   //是否自动切换
			slideInterval : 5*1000,   //切换时间间隔
			slideDelay : 300,       //鼠标离开tab继续切换的延时
			autoInit : true,        //是否自动初始化
			onShow:function(){ }    //默认的onShow事件处理函数
		};
	
		this.setConfig(config);

		if(triggers && sheets) {
			this.addRange(triggers,sheets);
			if(this.config.autoInit){
				this.init();
			}
		}
	};
	
	J.ui.Tab.prototype = {
		/**
		 * 设置config
		 * @param {object} config 配置项如{'slideEnabled':true,'defaultIndex':0,'autoInit':false}
		 */
		setConfig:function(config){
			if(!config) return;
			for(var i in config){
				this.config[i] = config[i];
			}
		},
		/**
		 * 增加tab
		 * @param tab={trigger:aaaa, sheet:bbbb} 
		 * @param {string|HTMLElement} trigger
		 * @param {string|HTMLElement} sheet
		 * */
		add:function(tab){
			if(!tab) return;
			
			if(tab.trigger){
				this.tabs.push(tab);
				tab.trigger.style.display = 'block';
			}
		},
		
		/**
		 * 增加tab数组
		 * @param {array} triggers HTMLElement数组
		 * @param {array} sheets HTMLElement数组
		 * */
		addRange:function(triggers, sheets){
			if(!triggers||!sheets) return;
			if(triggers.length && sheets.length && triggers.length == sheets.length){
				for(var i = 0, len = triggers.length; i < len; i++){
					this.add({trigger:triggers[i],sheet:sheets[i]});
				}
			}
		},
		
		/**
		 * 设置tab为当前tab并显示
		 * @param {object} tab  tab对象 {trigger:HTMLElement,sheet:HTMLElement}
		 * */
		select:function(tab){
			if(!tab || (!!this.currentTab && tab.trigger == this.currentTab.trigger)) return;
			if(this.currentTab){
				$D.removeClass(this.currentTab.trigger, 'current');
				if(this.currentTab.sheet){
					this.currentTab.sheet.style.display = 'none';
				}
				
			}
			this.currentTab = tab;
			this.show();
		},
		
		/**
		 * 设置tab为隐藏的
		 * @param {object} tab  tab对象 {trigger:HTMLElement,sheet:HTMLElement}
		 * */
		remove:function(tab){
			if(!tab) return;
			
			
			if(tab.trigger){
				$D.removeClass(tab.trigger, 'current');
				tab.trigger.style.display = 'none';
			}
			if(tab.sheet){
				tab.sheet.style.display = 'none';
			}
			
			var index=this.indexOf(tab);
			this.tabs.splice(index,index);
	
			if(tab.trigger == this.currentTab.trigger){
				if(index==0){
					//this.currentTab=this.tabs[(index+1)];
					this.select(this.tabs[(index+1)]);
				}else{
					//this.currentTab=this.tabs[(index-1)];
					this.select(this.tabs[(index-1)]);
				}
			}
		},
		/**
		 * 显示当前被选中的tab
		 * */
		show:function(){
			
			if(this.currentTab.trigger){
				this.currentTab.trigger.style.display = 'block';
			}
			$D.addClass(this.currentTab.trigger, 'current');
			if(this.currentTab.sheet){
				this.currentTab.sheet.style.display = 'block';
			}
			$E.notifyObservers(this, "show", this.currentTab);

		},
		/**
		 * 自动切换
		 * */
		slide:function(){
			var	config = this.config,
				_this = this,
				intervalId,
				delayId;
			J.array.forEach(this.tabs, function(tab, index, tabs){
				$E.on(tab.trigger, 'mouseover' , clear);
				$E.on(tab.sheet, 'mouseover' , clear);
				
				$E.on(tab.trigger, 'mouseout' , delay);
				$E.on(tab.sheet, 'mouseout' , delay);
			});
			start();
			function start() {
				var i = _this.indexOf(_this.currentTab);
				if( i == -1 ) return;
				intervalId = window.setInterval(function(){
					var tab = _this.tabs[ ++i % _this.tabs.length ];
					if(tab){
						_this.select(tab);
					}
				},config['slideInterval']);
			}
			function clear() {
				window.clearTimeout(delayId);
				window.clearInterval(intervalId);	
			}
			function delay() {
				delayId = window.setTimeout(start,config['slideDelay']);
			}
		},
		/**
		 * 获取tab在tabs数组中的索引
		 * @param {object} tab  tab对象 {trigger:HTMLElement,sheet:HTMLElement}
		 * */
		indexOf:function(tab){
			for(var i = 0, len = this.tabs.length; i < len; i++){
				if(tab.trigger == this.tabs[i].trigger)
					return i;
			}
			return -1;
		},
		/**
		 * 初始化函数
		 * */
		init:function(){
			var config = this.config,
				_this = this;

			J.array.forEach(this.tabs, function(tab, index, tabs){
				$E.on(tab.trigger,config['triggerEvent'], function(){
					_this.select.call(_this,tab);
				});
				if(tab.sheet){
					tab.sheet.style.display = 'none';
				}
			});
			
			this.select(this.tabs[config['defaultIndex']]);
			if(config['slideEnabled']){
				this.slide();
			}
		}
	};

});






/**
 * MaskLayer模块
 */
Jet().$package(function(J){
	var $ = J.dom.id,
		$D = J.dom,
		$E = J.event;
		
	/**
	 * MaskLayer 遮罩层类
	 * 
	 * @memberOf ui
	 * @Class
	 * 
	 * @param {Object} option 其他选项，如:zIndex,appendTo...
	 * @returns
	 * 
	 * 
	 */
	J.ui.MaskLayer = new J.Class({

		/**
		 * 初始化函数
		 * */
		init:function(option){
			var context = this;
			option.zIndex = !J.isUndefined(option.zIndex) ? option.zIndex : 9000000;
			option.appendTo = option.appendTo || $D.getDocument();
			
			this.container = $D.node("div", {
				"class" : "maskLayer"
			});
			this.container.innerHTML = '\
					<div class="maskBackground"></div>\
					<div id="maskLayerBody"></div>\
				'
			this.setZIndex(option.zIndex);
			option.appendTo.appendChild(this.container);
			
			
			var observer = {
				onMaskLayerClick : function(){
					$E.notifyObservers(context, "click", context);
				}
			};
			
			$E.on(this.container, "click", observer.onMaskLayerClick);
			
			this.body = $D.id("maskLayerBody");
		},
		
		append : function(el){
			this.body.appendChild(el);
		},
		
		show : function(){
			$D.show(this.container);
			$E.notifyObservers(this, "show");
			this._isShow = true;
		},
		hide : function(){
			$D.hide(this.container);
			$E.notifyObservers(this, "hide");
			this._isShow = false;
		},
		isShow : function(){
			return this._isShow;
		},
		toggleShow : function(){
			if(this.isShow()){
				this.hide();
			}else{
				this.show();
			}
		},
		getZIndex : function(){
			return this._zIndex;
		},
		
		setZIndex : function(zIndex){
			$D.setStyle(this.container, "zIndex", zIndex);
			this._zIndex = zIndex;
		},
		
		setTopZIndex : function(){
			this.setZIndex(qqweb.layout.getTopZIndex());
		},
		fadeIn : function(){
			this.show();
		},
		
		fadeOut : function(){
			this.hide();
		},
		
		// 关于
		about : function(){
			
		}
	});

});











/**
 * [Javascript core part]: swfobject 扩展
 */
 
 
Jet().$package(function(J){




/*!	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
/**
 * @namespace swfobject 名字空间
 * @name swfobject
 */
var swfobject = function() {
	
	var UNDEF = "undefined",
		OBJECT = "object",
		SHOCKWAVE_FLASH = "Shockwave Flash",
		SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
		FLASH_MIME_TYPE = "application/x-shockwave-flash",
		EXPRESS_INSTALL_ID = "SWFObjectExprInst",
		ON_READY_STATE_CHANGE = "onreadystatechange",
		
		win = window,
		doc = document,
		nav = navigator,
		
		plugin = false,
		domLoadFnArr = [main],
		regObjArr = [],
		objIdArr = [],
		listenersArr = [],
		storedAltContent,
		storedAltContentId,
		storedCallbackFn,
		storedCallbackObj,
		isDomLoaded = false,
		isExpressInstallActive = false,
		dynamicStylesheet,
		dynamicStylesheetMedia,
		autoHideShow = true,
	
	/* Centralized function for browser feature detection
		- User agent string detection is only used when no good alternative is possible
		- Is executed directly for optimal performance
	*/	
	ua = function() {
		var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF,
			u = nav.userAgent.toLowerCase(),
			p = nav.platform.toLowerCase(),
			windows = p ? /win/.test(p) : /win/.test(u),
			mac = p ? /mac/.test(p) : /mac/.test(u),
			webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, // returns either the webkit version or false if not webkit
			ie = !+"\v1", // feature detection based on Andrea Giammarchi's solution: http://webreflection.blogspot.com/2009/01/32-bytes-to-know-if-your-browser-is-ie.html
			playerVersion = [0,0,0],
			d = null;
		if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) {
			d = nav.plugins[SHOCKWAVE_FLASH].description;
			if (d && !(typeof nav.mimeTypes != UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) { // navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
				plugin = true;
				ie = false; // cascaded feature detection for Internet Explorer
				d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
				playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
				playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
				playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
			}
		}
		else if (typeof win.ActiveXObject != UNDEF) {
			try {
				var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
				if (a) { // a will return null when ActiveX is disabled
					d = a.GetVariable("$version");
					if (d) {
						ie = true; // cascaded feature detection for Internet Explorer
						d = d.split(" ")[1].split(",");
						playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
					}
				}
			}
			catch(e) {}
		}
		return { w3:w3cdom, pv:playerVersion, wk:webkit, ie:ie, win:windows, mac:mac };
	}(),
	
	/* Cross-browser onDomLoad
		- Will fire an event as soon as the DOM of a web page is loaded
		- Internet Explorer workaround based on Diego Perini's solution: http://javascript.nwbox.com/IEContentLoaded/
		- Regular onload serves as fallback
	*/ 
	onDomLoad = function() {
		if (!ua.w3) { return; }
		if ((typeof doc.readyState != UNDEF && doc.readyState == "complete") || (typeof doc.readyState == UNDEF && (doc.getElementsByTagName("body")[0] || doc.body))) { // function is fired after onload, e.g. when script is inserted dynamically 
			callDomLoadFunctions();
		}
		if (!isDomLoaded) {
			if (typeof doc.addEventListener != UNDEF) {
				doc.addEventListener("DOMContentLoaded", callDomLoadFunctions, false);
			}		
			if (ua.ie && ua.win) {
				doc.attachEvent(ON_READY_STATE_CHANGE, function() {
					if (doc.readyState == "complete") {
						doc.detachEvent(ON_READY_STATE_CHANGE, arguments.callee);
						callDomLoadFunctions();
					}
				});
				if (win == top) { // if not inside an iframe
					(function(){
						if (isDomLoaded) { return; }
						try {
							doc.documentElement.doScroll("left");
						}
						catch(e) {
							setTimeout(arguments.callee, 0);
							return;
						}
						callDomLoadFunctions();
					})();
				}
			}
			if (ua.wk) {
				(function(){
					if (isDomLoaded) { return; }
					if (!/loaded|complete/.test(doc.readyState)) {
						setTimeout(arguments.callee, 0);
						return;
					}
					callDomLoadFunctions();
				})();
			}
			addLoadEvent(callDomLoadFunctions);
		}
	}();
	
	function callDomLoadFunctions() {
		if (isDomLoaded) { return; }
		try { // test if we can really add/remove elements to/from the DOM; we don't want to fire it too early
			var t = doc.getElementsByTagName("body")[0].appendChild(createElement("span"));
			t.parentNode.removeChild(t);
		}
		catch (e) { return; }
		isDomLoaded = true;
		var dl = domLoadFnArr.length;
		for (var i = 0; i < dl; i++) {
			domLoadFnArr[i]();
		}
	}
	
	function addDomLoadEvent(fn) {
		if (isDomLoaded) {
			fn();
		}
		else { 
			domLoadFnArr[domLoadFnArr.length] = fn; // Array.push() is only available in IE5.5+
		}
	}
	
	/* Cross-browser onload
		- Based on James Edwards' solution: http://brothercake.com/site/resources/scripts/onload/
		- Will fire an event as soon as a web page including all of its assets are loaded 
	 */
	function addLoadEvent(fn) {
		if (typeof win.addEventListener != UNDEF) {
			win.addEventListener("load", fn, false);
		}
		else if (typeof doc.addEventListener != UNDEF) {
			doc.addEventListener("load", fn, false);
		}
		else if (typeof win.attachEvent != UNDEF) {
			addListener(win, "onload", fn);
		}
		else if (typeof win.onload == "function") {
			var fnOld = win.onload;
			win.onload = function() {
				fnOld();
				fn();
			};
		}
		else {
			win.onload = fn;
		}
	}
	
	/* Main function
		- Will preferably execute onDomLoad, otherwise onload (as a fallback)
	*/
	function main() { 
		if (plugin) {
			testPlayerVersion();
		}
		else {
			matchVersions();
		}
	}
	
	/* Detect the Flash Player version for non-Internet Explorer browsers
		- Detecting the plug-in version via the object element is more precise than using the plugins collection item's description:
		  a. Both release and build numbers can be detected
		  b. Avoid wrong descriptions by corrupt installers provided by Adobe
		  c. Avoid wrong descriptions by multiple Flash Player entries in the plugin Array, caused by incorrect browser imports
		- Disadvantage of this method is that it depends on the availability of the DOM, while the plugins collection is immediately available
	*/
	function testPlayerVersion() {
		var b = doc.getElementsByTagName("body")[0];
		var o = createElement(OBJECT);
		o.setAttribute("type", FLASH_MIME_TYPE);
		var t = b.appendChild(o);
		if (t) {
			var counter = 0;
			(function(){
				if (typeof t.GetVariable != UNDEF) {
					var d = t.GetVariable("$version");
					if (d) {
						d = d.split(" ")[1].split(",");
						ua.pv = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
					}
				}
				else if (counter < 10) {
					counter++;
					setTimeout(arguments.callee, 10);
					return;
				}
				b.removeChild(o);
				t = null;
				matchVersions();
			})();
		}
		else {
			matchVersions();
		}
	}
	
	/* Perform Flash Player and SWF version matching; static publishing only
	*/
	function matchVersions() {
		var rl = regObjArr.length;
		if (rl > 0) {
			for (var i = 0; i < rl; i++) { // for each registered object element
				var id = regObjArr[i].id;
				var cb = regObjArr[i].callbackFn;
				var cbObj = {success:false, id:id};
				if (ua.pv[0] > 0) {
					var obj = getElementById(id);
					if (obj) {
						if (hasPlayerVersion(regObjArr[i].swfVersion) && !(ua.wk && ua.wk < 312)) { // Flash Player version >= published SWF version: Houston, we have a match!
							setVisibility(id, true);
							if (cb) {
								cbObj.success = true;
								cbObj.ref = getObjectById(id);
								cb(cbObj);
							}
						}
						else if (regObjArr[i].expressInstall && canExpressInstall()) { // show the Adobe Express Install dialog if set by the web page author and if supported
							var att = {};
							att.data = regObjArr[i].expressInstall;
							att.width = obj.getAttribute("width") || "0";
							att.height = obj.getAttribute("height") || "0";
							if (obj.getAttribute("class")) { att.styleclass = obj.getAttribute("class"); }
							if (obj.getAttribute("align")) { att.align = obj.getAttribute("align"); }
							// parse HTML object param element's name-value pairs
							var par = {};
							var p = obj.getElementsByTagName("param");
							var pl = p.length;
							for (var j = 0; j < pl; j++) {
								if (p[j].getAttribute("name").toLowerCase() != "movie") {
									par[p[j].getAttribute("name")] = p[j].getAttribute("value");
								}
							}
							showExpressInstall(att, par, id, cb);
						}
						else { // Flash Player and SWF version mismatch or an older Webkit engine that ignores the HTML object element's nested param elements: display alternative content instead of SWF
							displayAltContent(obj);
							if (cb) { cb(cbObj); }
						}
					}
				}
				else {	// if no Flash Player is installed or the fp version cannot be detected we let the HTML object element do its job (either show a SWF or alternative content)
					setVisibility(id, true);
					if (cb) {
						var o = getObjectById(id); // test whether there is an HTML object element or not
						if (o && typeof o.SetVariable != UNDEF) { 
							cbObj.success = true;
							cbObj.ref = o;
						}
						cb(cbObj);
					}
				}
			}
		}
	}
	
	function getObjectById(objectIdStr) {
		var r = null;
		var o = getElementById(objectIdStr);
		if (o && o.nodeName == "OBJECT") {
			if (typeof o.SetVariable != UNDEF) {
				r = o;
			}
			else {
				var n = o.getElementsByTagName(OBJECT)[0];
				if (n) {
					r = n;
				}
			}
		}
		return r;
	}
	
	/* Requirements for Adobe Express Install
		- only one instance can be active at a time
		- fp 6.0.65 or higher
		- Win/Mac OS only
		- no Webkit engines older than version 312
	*/
	function canExpressInstall() {
		return !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac) && !(ua.wk && ua.wk < 312);
	}
	
	/* Show the Adobe Express Install dialog
		- Reference: http://www.adobe.com/cfusion/knowledgebase/index.cfm?id=6a253b75
	*/
	function showExpressInstall(att, par, replaceElemIdStr, callbackFn) {
		isExpressInstallActive = true;
		storedCallbackFn = callbackFn || null;
		storedCallbackObj = {success:false, id:replaceElemIdStr};
		var obj = getElementById(replaceElemIdStr);
		if (obj) {
			if (obj.nodeName == "OBJECT") { // static publishing
				storedAltContent = abstractAltContent(obj);
				storedAltContentId = null;
			}
			else { // dynamic publishing
				storedAltContent = obj;
				storedAltContentId = replaceElemIdStr;
			}
			att.id = EXPRESS_INSTALL_ID;
			if (typeof att.width == UNDEF || (!/%$/.test(att.width) && parseInt(att.width, 10) < 310)) { att.width = "310"; }
			if (typeof att.height == UNDEF || (!/%$/.test(att.height) && parseInt(att.height, 10) < 137)) { att.height = "137"; }
			doc.title = doc.title.slice(0, 47) + " - Flash Player Installation";
			var pt = ua.ie && ua.win ? "ActiveX" : "PlugIn",
				fv = "MMredirectURL=" + win.location.toString().replace(/&/g,"%26") + "&MMplayerType=" + pt + "&MMdoctitle=" + doc.title;
			if (typeof par.flashvars != UNDEF) {
				par.flashvars += "&" + fv;
			}
			else {
				par.flashvars = fv;
			}
			// IE only: when a SWF is loading (AND: not available in cache) wait for the readyState of the object element to become 4 before removing it,
			// because you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
			if (ua.ie && ua.win && obj.readyState != 4) {
				var newObj = createElement("div");
				replaceElemIdStr += "SWFObjectNew";
				newObj.setAttribute("id", replaceElemIdStr);
				obj.parentNode.insertBefore(newObj, obj); // insert placeholder div that will be replaced by the object element that loads expressinstall.swf
				obj.style.display = "none";
				(function(){
					if (obj.readyState == 4) {
						obj.parentNode.removeChild(obj);
					}
					else {
						setTimeout(arguments.callee, 10);
					}
				})();
			}
			createSWF(att, par, replaceElemIdStr);
		}
	}
	
	/* Functions to abstract and display alternative content
	*/
	function displayAltContent(obj) {
		if (ua.ie && ua.win && obj.readyState != 4) {
			// IE only: when a SWF is loading (AND: not available in cache) wait for the readyState of the object element to become 4 before removing it,
			// because you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
			var el = createElement("div");
			obj.parentNode.insertBefore(el, obj); // insert placeholder div that will be replaced by the alternative content
			el.parentNode.replaceChild(abstractAltContent(obj), el);
			obj.style.display = "none";
			(function(){
				if (obj.readyState == 4) {
					obj.parentNode.removeChild(obj);
				}
				else {
					setTimeout(arguments.callee, 10);
				}
			})();
		}
		else {
			obj.parentNode.replaceChild(abstractAltContent(obj), obj);
		}
	} 

	function abstractAltContent(obj) {
		var ac = createElement("div");
		if (ua.win && ua.ie) {
			ac.innerHTML = obj.innerHTML;
		}
		else {
			var nestedObj = obj.getElementsByTagName(OBJECT)[0];
			if (nestedObj) {
				var c = nestedObj.childNodes;
				if (c) {
					var cl = c.length;
					for (var i = 0; i < cl; i++) {
						if (!(c[i].nodeType == 1 && c[i].nodeName == "PARAM") && !(c[i].nodeType == 8)) {
							ac.appendChild(c[i].cloneNode(true));
						}
					}
				}
			}
		}
		return ac;
	}
	
	/* Cross-browser dynamic SWF creation
	*/
	function createSWF(attObj, parObj, id) {
		var r, el = getElementById(id);
		if (ua.wk && ua.wk < 312) { return r; }
		if (el) {
			if (typeof attObj.id == UNDEF) { // if no 'id' is defined for the object element, it will inherit the 'id' from the alternative content
				attObj.id = id;
			}
			if (ua.ie && ua.win) { // Internet Explorer + the HTML object element + W3C DOM methods do not combine: fall back to outerHTML
				var att = "";
				for (var i in attObj) {
					if (attObj[i] != Object.prototype[i]) { // filter out prototype additions from other potential libraries
						if (i.toLowerCase() == "data") {
							parObj.movie = attObj[i];
						}
						else if (i.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
							att += ' class="' + attObj[i] + '"';
						}
						else if (i.toLowerCase() != "classid") {
							att += ' ' + i + '="' + attObj[i] + '"';
						}
					}
				}
				var par = "";
				for (var j in parObj) {
					if (parObj[j] != Object.prototype[j]) { // filter out prototype additions from other potential libraries
						par += '<param name="' + j + '" value="' + parObj[j] + '" />';
					}
				}
				el.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + att + '>' + par + '</object>';
				objIdArr[objIdArr.length] = attObj.id; // stored to fix object 'leaks' on unload (dynamic publishing only)
				r = getElementById(attObj.id);	
			}
			else { // well-behaving browsers
				var o = createElement(OBJECT);
				o.setAttribute("type", FLASH_MIME_TYPE);
				for (var m in attObj) {
					if (attObj[m] != Object.prototype[m]) { // filter out prototype additions from other potential libraries
						if (m.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
							o.setAttribute("class", attObj[m]);
						}
						else if (m.toLowerCase() != "classid") { // filter out IE specific attribute
							o.setAttribute(m, attObj[m]);
						}
					}
				}
				for (var n in parObj) {
					if (parObj[n] != Object.prototype[n] && n.toLowerCase() != "movie") { // filter out prototype additions from other potential libraries and IE specific param element
						createObjParam(o, n, parObj[n]);
					}
				}
				el.parentNode.replaceChild(o, el);
				r = o;
			}
		}
		return r;
	}
	
	function createObjParam(el, pName, pValue) {
		var p = createElement("param");
		p.setAttribute("name", pName);	
		p.setAttribute("value", pValue);
		el.appendChild(p);
	}
	
	/* Cross-browser SWF removal
		- Especially needed to safely and completely remove a SWF in Internet Explorer
	*/
	function removeSWF(id) {
		var obj = getElementById(id);
		if (obj && obj.nodeName == "OBJECT") {
			if (ua.ie && ua.win) {
				obj.style.display = "none";
				(function(){
					if (obj.readyState == 4) {
						removeObjectInIE(id);
					}
					else {
						setTimeout(arguments.callee, 10);
					}
				})();
			}
			else {
				obj.parentNode.removeChild(obj);
			}
		}
	}
	
	function removeObjectInIE(id) {
		var obj = getElementById(id);
		if (obj) {
			for (var i in obj) {
				if (typeof obj[i] == "function") {
					obj[i] = null;
				}
			}
			obj.parentNode.removeChild(obj);
		}
	}
	
	/* Functions to optimize JavaScript compression
	*/
	function getElementById(id) {
		var el = null;
		try {
			el = doc.getElementById(id);
		}
		catch (e) {}
		return el;
	}
	
	function createElement(el) {
		return doc.createElement(el);
	}
	
	/* Updated attachEvent function for Internet Explorer
		- Stores attachEvent information in an Array, so on unload the detachEvent functions can be called to avoid memory leaks
	*/	
	function addListener(target, eventType, fn) {
		target.attachEvent(eventType, fn);
		listenersArr[listenersArr.length] = [target, eventType, fn];
	}
	
	/* Flash Player and SWF content version matching
	*/
	function hasPlayerVersion(rv) {
		var pv = ua.pv, v = rv.split(".");
		v[0] = parseInt(v[0], 10);
		v[1] = parseInt(v[1], 10) || 0; // supports short notation, e.g. "9" instead of "9.0.0"
		v[2] = parseInt(v[2], 10) || 0;
		return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
	}
	
	/* Cross-browser dynamic CSS creation
		- Based on Bobby van der Sluis' solution: http://www.bobbyvandersluis.com/articles/dynamicCSS.php
	*/	
	function createCSS(sel, decl, media, newStyle) {
		if (ua.ie && ua.mac) { return; }
		var h = doc.getElementsByTagName("head")[0];
		if (!h) { return; } // to also support badly authored HTML pages that lack a head element
		var m = (media && typeof media == "string") ? media : "screen";
		if (newStyle) {
			dynamicStylesheet = null;
			dynamicStylesheetMedia = null;
		}
		if (!dynamicStylesheet || dynamicStylesheetMedia != m) { 
			// create dynamic stylesheet + get a global reference to it
			var s = createElement("style");
			s.setAttribute("type", "text/css");
			s.setAttribute("media", m);
			dynamicStylesheet = h.appendChild(s);
			if (ua.ie && ua.win && typeof doc.styleSheets != UNDEF && doc.styleSheets.length > 0) {
				dynamicStylesheet = doc.styleSheets[doc.styleSheets.length - 1];
			}
			dynamicStylesheetMedia = m;
		}
		// add style rule
		if (ua.ie && ua.win) {
			if (dynamicStylesheet && typeof dynamicStylesheet.addRule == OBJECT) {
				dynamicStylesheet.addRule(sel, decl);
			}
		}
		else {
			if (dynamicStylesheet && typeof doc.createTextNode != UNDEF) {
				dynamicStylesheet.appendChild(doc.createTextNode(sel + " {" + decl + "}"));
			}
		}
	}
	
	function setVisibility(id, isVisible) {
		if (!autoHideShow) { return; }
		var v = isVisible ? "visible" : "hidden";
		if (isDomLoaded && getElementById(id)) {
			getElementById(id).style.visibility = v;
		}
		else {
			createCSS("#" + id, "visibility:" + v);
		}
	}

	/* Filter to avoid XSS attacks
	*/
	function urlEncodeIfNecessary(s) {
		var regex = /[\\\"<>\.;]/;
		var hasBadChars = regex.exec(s) != null;
		return hasBadChars && typeof encodeURIComponent != UNDEF ? encodeURIComponent(s) : s;
	}
	
	/* Release memory to avoid memory leaks caused by closures, fix hanging audio/video threads and force open sockets/NetConnections to disconnect (Internet Explorer only)
	*/
	var cleanup = function() {
		if (ua.ie && ua.win) {
			window.attachEvent("onunload", function() {
				// remove listeners to avoid memory leaks
				var ll = listenersArr.length;
				for (var i = 0; i < ll; i++) {
					listenersArr[i][0].detachEvent(listenersArr[i][1], listenersArr[i][2]);
				}
				// cleanup dynamically embedded objects to fix audio/video threads and force open sockets and NetConnections to disconnect
				var il = objIdArr.length;
				for (var j = 0; j < il; j++) {
					removeSWF(objIdArr[j]);
				}
				// cleanup library's main closures to avoid memory leaks
				for (var k in ua) {
					ua[k] = null;
				}
				ua = null;
				for (var l in swfobject) {
					swfobject[l] = null;
				}
				swfobject = null;
			});
		}
	}();
	
	return {
		/* Public API
			- Reference: http://code.google.com/p/swfobject/wiki/documentation
		*/ 
		registerObject: function(objectIdStr, swfVersionStr, xiSwfUrlStr, callbackFn) {
			if (ua.w3 && objectIdStr && swfVersionStr) {
				var regObj = {};
				regObj.id = objectIdStr;
				regObj.swfVersion = swfVersionStr;
				regObj.expressInstall = xiSwfUrlStr;
				regObj.callbackFn = callbackFn;
				regObjArr[regObjArr.length] = regObj;
				setVisibility(objectIdStr, false);
			}
			else if (callbackFn) {
				callbackFn({success:false, id:objectIdStr});
			}
		},
		
		getObjectById: function(objectIdStr) {
			if (ua.w3) {
				return getObjectById(objectIdStr);
			}
		},
		
		/**
		 * swfobject 嵌入flash的方法
		 * 
		 * @memberOf swfobject
		 * 
		 * @param {String} path swf文件的路径
		 * @returns 
		 * 
		 * @example
		 * Jet().$package(function(J){
		 * 	J.swfobject.embedSWF( path, 'swfSound_Flash_div', '1', '1', '8.0.0', './expressInstall.swf', flashvars, params, attributes);
		 * };
		 * 
		 */
		embedSWF: function(swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj, callbackFn) {
			var callbackObj = {success:false, id:replaceElemIdStr};
			if (ua.w3 && !(ua.wk && ua.wk < 312) && swfUrlStr && replaceElemIdStr && widthStr && heightStr && swfVersionStr) {
				setVisibility(replaceElemIdStr, false);
				addDomLoadEvent(function() {
					widthStr += ""; // auto-convert to string
					heightStr += "";
					var att = {};
					if (attObj && typeof attObj === OBJECT) {
						for (var i in attObj) { // copy object to avoid the use of references, because web authors often reuse attObj for multiple SWFs
							att[i] = attObj[i];
						}
					}
					att.data = swfUrlStr;
					att.width = widthStr;
					att.height = heightStr;
					var par = {}; 
					if (parObj && typeof parObj === OBJECT) {
						for (var j in parObj) { // copy object to avoid the use of references, because web authors often reuse parObj for multiple SWFs
							par[j] = parObj[j];
						}
					}
					if (flashvarsObj && typeof flashvarsObj === OBJECT) {
						for (var k in flashvarsObj) { // copy object to avoid the use of references, because web authors often reuse flashvarsObj for multiple SWFs
							if (typeof par.flashvars != UNDEF) {
								par.flashvars += "&" + k + "=" + flashvarsObj[k];
							}
							else {
								par.flashvars = k + "=" + flashvarsObj[k];
							}
						}
					}
					if (hasPlayerVersion(swfVersionStr)) { // create SWF
						var obj = createSWF(att, par, replaceElemIdStr);
						if (att.id == replaceElemIdStr) {
							setVisibility(replaceElemIdStr, true);
						}
						callbackObj.success = true;
						callbackObj.ref = obj;
					}
					else if (xiSwfUrlStr && canExpressInstall()) { // show Adobe Express Install
						att.data = xiSwfUrlStr;
						showExpressInstall(att, par, replaceElemIdStr, callbackFn);
						return;
					}
					else { // show alternative content
						setVisibility(replaceElemIdStr, true);
					}
					if (callbackFn) { callbackFn(callbackObj); }
				});
			}
			else if (callbackFn) { callbackFn(callbackObj);	}
		},
		
		switchOffAutoHideShow: function() {
			autoHideShow = false;
		},
		
		ua: ua,
		
		getFlashPlayerVersion: function() {
			return { major:ua.pv[0], minor:ua.pv[1], release:ua.pv[2] };
		},
		
		hasFlashPlayerVersion: hasPlayerVersion,
		
		createSWF: function(attObj, parObj, replaceElemIdStr) {
			if (ua.w3) {
				return createSWF(attObj, parObj, replaceElemIdStr);
			}
			else {
				return undefined;
			}
		},
		
		showExpressInstall: function(att, par, replaceElemIdStr, callbackFn) {
			if (ua.w3 && canExpressInstall()) {
				showExpressInstall(att, par, replaceElemIdStr, callbackFn);
			}
		},
		
		removeSWF: function(objElemIdStr) {
			if (ua.w3) {
				removeSWF(objElemIdStr);
			}
		},
		
		createCSS: function(selStr, declStr, mediaStr, newStyleBoolean) {
			if (ua.w3) {
				createCSS(selStr, declStr, mediaStr, newStyleBoolean);
			}
		},
		
		addDomLoadEvent: addDomLoadEvent,
		
		addLoadEvent: addLoadEvent,
		
		getQueryParamValue: function(param) {
			var q = doc.location.search || doc.location.hash;
			if (q) {
				if (/\?/.test(q)) { q = q.split("?")[1]; } // strip question mark
				if (param == null) {
					return urlEncodeIfNecessary(q);
				}
				var pairs = q.split("&");
				for (var i = 0; i < pairs.length; i++) {
					if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
						return urlEncodeIfNecessary(pairs[i].substring((pairs[i].indexOf("=") + 1)));
					}
				}
			}
			return "";
		},
		
		// For internal usage only
		expressInstallCallback: function() {
			if (isExpressInstallActive) {
				var obj = getElementById(EXPRESS_INSTALL_ID);
				if (obj && storedAltContent) {
					obj.parentNode.replaceChild(storedAltContent, obj);
					if (storedAltContentId) {
						setVisibility(storedAltContentId, true);
						if (ua.ie && ua.win) { storedAltContent.style.display = "block"; }
					}
					if (storedCallbackFn) { storedCallbackFn(storedCallbackObj); }
				}
				isExpressInstallActive = false;
			} 
		}
	};
}();


	
	J.swfobject = swfobject;


});
/**
 * [Javascript core part]: sound 扩展
 */
 
var swfsound;
Jet().$package(function(J){
	var $D = J.dom,
		$E = J.event;

	//J.sound = J.sound || {};

	

	/*! SWFSound v1.1 <http://code.google.com/p/swfsound/>
		Copyright (c) 2009 Frank Baumgartner, www.b-nm.at
		This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
	
		*** Requires SWFObject 2.1 or higher ! ***
		*** Requires Flash Player 8.0 or higher! ***
		
		History:	
		===================================
		xx.01.2009 	- v1.0 - Initial release
		14.03.2009 	- v1.1 - Added "pause" feature
		30.03.2009  - v1.2 - Added some fine-tuning by Ben Long (shift.insert@gmail.com)
		07.06.2009	- v1.3 - Removed Array keyword, changed visibility to top left pixel corner 
												 (both reported by pellicierraphael@neuf.fr)
	*/
	/**
	 * @namespace sound 名字空间
	 * @name sound
	 */
	swfsound = function()
	{
		// Public API
		return {
	
			pauseStatus: [],
	
			embedSWF: function( path ){
				if ( path == undefined ) {
					path = "./swf/swfsound.swf";
				}
				
				var flashvars = false;
				
				var attributes = {
						id : 'swfSound_Flash'
				};
	
				var params = {
		      		menu : 'false',
		       	   	wmode : 'transparent',
		       	   	swLiveConnect : 'true',
		       	   	allowScriptAccess : 'always'
				};
	
				// document.write( '<div id="swfSound_Flash_div" style="position:absolute; left:0; top:0;"></div>' );
		        var d = document, div;
		            div = d.createElement('div');
		            div.id = "swfSound_Flash_div";
		            div.style.position = "absolute";
		            div.style.left = 0;
		            div.style.top = 0;
		            d.getElementsByTagName('body')[0].appendChild(div);
		
				// make sure the flash movie is visible, otherwise the onload is not fired!
				var def = "#swfSound_Flash { left:0; position:absolute; top: 0; }";
				var ss1 = document.createElement('style');
				ss1.setAttribute("type", "text/css");
				if (ss1.styleSheet) 
				{   	
						// IE
				    ss1.styleSheet.cssText = def;
				} 
				else 
				{
					  // W3C
				    var tt1 = document.createTextNode(def);
				    ss1.appendChild(tt1);
				}
				var hh1 = document.getElementsByTagName('head')[0];
				hh1.appendChild(ss1);
		
				try
				{
					 J.swfobject.embedSWF( path, 'swfSound_Flash_div', '1', '1', '8.0.0', './expressInstall.swf', flashvars, params, attributes);
		       	}
		       	catch ( e )
		       	{
		       		alert( 'Seems like you are missing swfobject! - Please include the swfobject javascript into your HTML!' );
		      	}
			},
	
	
			/*
					loadSound( mp3URL, streamingMode )
					=========================================
					mp3URL: String ... relative or absolute URL path to a sound
					streamingMode: Boolean ... true streams the mp3 progressively and automatically starts playback,
																		false just loads the sound for later event based triggering with "startSound" 
					onLoadCallbackFunctionName ... STRING of the JavaScript function that should be called when the sound is fully loaded
					onID3CallbackFunctionName ... STRING of the JavaScript function that should be claled when MP3 ID3 information is available
	
					return value: id of loaded sound
			*/
			/**
			 * 加载声音文件的方法
			 * 
			 * @memberOf sound
			 * 
			 * @param {String} mp3URL sound文件的路径，目前支持mp3
			 * @param {Bool} streamingMode 是否采用流模式
			 * @returns 
			 * 
			 */
			loadSound: function( mp3URL, streamingMode, onLoadCallbackFunctionName, onID3CallbackFunctionName )
			{
					if ( streamingMode == undefined ) streamingMode = false;
					if ( onLoadCallbackFunctionName == undefined ) onLoadCallbackFunctionName = null;
					if ( onID3CallbackFunctionName == undefined ) onID3CallbackFunctionName = null;
	
					var obj = document.getElementById( 'swfSound_Flash' );	
				
					return obj.loadSound( mp3URL, streamingMode, onLoadCallbackFunctionName, onID3CallbackFunctionName );
			},
	
	
			/*
					startSound( id_Sound, offsetSecondsFloat )
					=========================================
					mp3URL: String ... relative or absolute URL path to a sound
					offsetSecondsFloat: Number ... offset in seconds (float values possible)
					loopCount ... number of loops the sound should be played
					onSoundCompleteCallbackFunctionName ... the name of the function (as String!) that should be called when the sound playback has been completed 
			*/
			/**
			 * 开始播放的声音的方法
			 * 
			 * @memberOf sound
			 * 
			 * @param {Object} id_sound 要播放声音的对象
			 * @returns
			 * 
			 */
			startSound: function( id_sound, offsetSecondsFloat, loopCount, onSoundCompleteCallbackFunctionName )
			{
					if ( offsetSecondsFloat == undefined ) offsetSecondsFloat = 0.0;
					if ( onSoundCompleteCallbackFunctionName == undefined ) onSoundCompleteCallbackFunctionName = null;
					if ( loopCount == undefined ) loopCount = 1;
	
					var obj = document.getElementById( 'swfSound_Flash' );
					
					obj.startSound( id_sound, offsetSecondsFloat, loopCount, onSoundCompleteCallbackFunctionName );
	
					return true;
			},
	
			/**
			 * 停止播放的声音的方法
			 * 
			 * @memberOf sound
			 * 
			 * @param {Object} id_sound 声音对象
			 * @returns
			 * 
			 */
			stopSound: function( id_sound )
			{
					var obj = document.getElementById( 'swfSound_Flash' );
					obj.stopSound( id_sound );
					
					return true;
			},
	
	
			/*
					Pause Sound:
					==================================				
					Added in v1.1 - pause/play toggle feature
			*/
			/**
			 * 暂停播放的声音的方法
			 * 
			 * @memberOf sound
			 * 
			 * @param {Object} id_sound 声音对象
			 * @returns
			 * 
			 */
			pauseSound: function( id_sound )
			{
					var obj = document.getElementById( 'swfSound_Flash' );
					var pstatus = swfsound.pauseStatus[id_sound];
	
					if ( pstatus == true )
					{
							swfsound.startSound( id_sound, swfsound.getPosition(id_sound)/1000 );
							swfsound.pauseStatus[id_sound] = false;
					}
					else
					{
							swfsound.stopSound( id_sound );
							swfsound.pauseStatus[id_sound] = true;
					}
					return swfsound.pauseStatus[id_sound];
			},
	
	
			/*
					Set Volume:
					==================================				
					valid values: 0 (= silent) ... 100 (= maximum volume)
			*/
			/**
			 * 设置音量
			 * 
			 * @memberOf sound
			 * 
			 * @param {Object} id_sound 声音对象
			 * @param {Number} newVolume 声音大小
			 * @returns
			 * 
			 */
			setVolume: function( id_sound, newVolume )
			{
					var obj = document.getElementById( 'swfSound_Flash' );
					obj.setVolume( id_sound, newVolume );
					
					return true;
			},
			
			/**
			 * 获取音量
			 * 
			 * @memberOf sound
			 * 
			 * @param {Object} id_sound 声音对象
			 * @returns
			 * 
			 */
			getVolume: function( id_sound )
			{
					var obj = document.getElementById( 'swfSound_Flash' );
					return obj.getVolume( id_sound );
			},
	
			
			/*
					Returns the duration of a sound, in milliseconds
			*/
			getDuration: function( id_sound )
			{
					var obj = document.getElementById( 'swfSound_Flash' );
					return obj.getDuration( id_sound );
			},
	
	
			/*
					Returns the current playback position of a sound, in milliseconds
			*/
			getPosition: function( id_sound )
			{
					var obj = document.getElementById( 'swfSound_Flash' );
					return obj.getPosition( id_sound );
			},
	
	
			/*
					Returns the current ID3 object
			*/
			getID3: function( id_sound )
			{
					var obj = document.getElementById( 'swfSound_Flash' );
					return obj.getID3( id_sound );
			},
			
	
			/*
					Set left/right panning:
					==================================
					-100 	= left
					0 		= center
					+100 	= right
			*/
			setPan: function( id_sound, newPan )
			{
					var obj = document.getElementById( 'swfSound_Flash' );
					obj.setPan( id_sound, newPan );
					
					return true;
			},
			
			
			getPan: function( id_sound )
			{
					var obj = document.getElementById( 'swfSound_Flash' );
					return obj.getPan( id_sound );
			},
	
	
			/*
					Returns the number of bytes of a sound that have already been loaded
			*/
			getBytesLoaded: function( id_sound )
			{
					var obj = document.getElementById( 'swfSound_Flash' );
					return obj.getBytesLoaded( id_sound );
			},
	
	
			/*
					Returns the total number of bytes of a sound file
			*/
			getBytesTotal: function( id_sound )
			{
					var obj = document.getElementById( 'swfSound_Flash' );
					return obj.getBytesTotal( id_sound );
			}
	
		};
	
	}();
	
	//swfsound.embedSWF( './swfsound.swf' );
	
	J.sound = swfsound;

});
