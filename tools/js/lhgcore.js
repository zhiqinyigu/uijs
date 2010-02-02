/*!
 * lhgcore JavaScript Library v1.3.6
 * Date : 2010-01-01 23:06:11
 * Copyright (c) 2009 - 2010 By Li Hui Gang
 */

(function(){

var window = this,
    undefined,
    
	lhgcore = function( selector, context )
    {
	    return new lhgcore.fn.init( selector, context );
	},
	
	// Used for trimming whitespace
	rtrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,

	// Save a reference to some core methods
	toString = Object.prototype.toString,
	push = Array.prototype.push,
	slice = Array.prototype.slice;

lhgcore.fn = lhgcore.prototype =
{
    init: function( selector, context )
	{
	    context = context || document;
		
		if( !selector ) return this;
			
		if( selector.nodeType )
		{
		    this[0] = selector;
			this.length = 1; return this;
		}
		
		if( typeof selector === 'string' )
		{
		    if( selector.indexOf('<') === 0 )
			{
			    var doc = context.ownerDocument || context,
				ret = rsingleTag.exec( selector );
				
				if( ret )
				    selector = [ doc.createElement(ret[1]) ];
				else
				{
				    ret = buildFragment( [ selector ], [ doc ] );
					selector = ( ret.cacheable ? ret.fragment.cloneNode(true) : ret.fragment ).childNodes;
				}
			}
			else if( /^#\w+$/.test(selector) )
			{
			    var id = selector.substr(1),
				    el = context.getElementById(id);
				
				if( el )
				{
				    this.length = 1; this[0] = el;
				}
				
				return this;
			}
			else if( context.nodeType && /^\w+$/.test(selector) )
			    selector = context.getElementsByTagName( selector );
			else
			    selector = lhgcore.find( selector, context );
		}
		
		this.context = context;
		
		return this.setArray( lhgcore.isArray(selector) ?
		    selector : lhgcore.makeArray(selector) );
	},
	
	context: '', lhgren: 'LiHuiGang',
	
	setArray: function( elems )
	{
	    this.length = 0;
		push.apply( this, elems );
		
		return this;
	},
	
	each: function( callback, args )
	{
	    return lhgcore.each( this, callback, args );
	},
	
	get: function( num )
	{
	    return num === undefined ?
		    slice.call( this ) : this[ num ];
	},
	
	eq: function( i )
	{
	    return this.slice( i, +i + 1 );
	},
	
	slice: function()
	{
	    return lhgcore( slice.apply(this,arguments) );
	},
	
	map: function( callback )
	{
	    var ret = lhgcore.map( this,
		    function(elem,i){
		        return callback.call( elem, i, elem );
		    });
		
		return lhgcore(ret);
	},
	
	is: function( selector )
	{
		if( !selector ) return false;
		
		var ret = false,
		arr = lhgcore.find( selector, this.context );
		
		for( var i = 0, l = this.length; i < l; i++ )
			if( lhgcore.inArray(this[i],arr) !== -1 )
			{
			    ret = true; break;
			}
		
		return ret;
	}
};

lhgcore.fn.init.prototype = lhgcore.fn;

lhgcore.extend = lhgcore.fn.extend = function()
{
    var target = arguments[0] || {}, i = 1, length = arguments.length,
  	    deep = false, options, src, copy;
	
	if( typeof target === 'boolean' )
	{
		deep = target; target = arguments[1] || {}; i = 2;
	}
	
	if( typeof target !== 'object' && !lhgcore.isFunction(target) )
	    target = {};
		
	if( length == i ){ target = this; --i; }

	for( ; i < length; i++ )
		if( (options = arguments[ i ]) != null )
			for( var name in options )
			{
				src = target[ name ]; copy = options[ name ];
				if( target === copy ) continue;
				
				if( deep && copy && typeof copy === 'object' && !copy.nodeType )
					target[ name ] = lhgcore.extend( deep, 
						src || ( copy.length != null ? [] : {} ), copy );
				else if( copy !== undefined )
				    target[ name ] = copy;
			}

	return target;
};

function evalScript( i, elem )
{
	if( elem.src )
		lhgcore.ajax({
			url: elem.src,
			async: false,
			dataType: 'script'
		});
	else
		lhgcore.globalEval( elem.text || elem.textContent || elem.innerHTML || '' );

	if( elem.parentNode )
		elem.parentNode.removeChild( elem );
};

function now()
{
    return (new Date).getTime();
};

lhgcore.extend({
	isFunction: function( obj )
	{
	    return toString.call(obj) === '[object Function]';
	},
	
	isArray: function( obj )
	{
	    return toString.call(obj) === '[object Array]';
	},
	
	trim: function( text )
	{
	    return (text || '').replace( rtrim, '' );
	},
	
	globalEval: function( data )
	{
	    if( data && /\S/.test(data) )
		{
		    var head = document.getElementsByTagName('head')[0] || document.documentElement,
				script = document.createElement('script');
			
			script.type = 'text/javascript';
			
			if( !lhgcore.browser.ie )
			    script.appendChild( document.createTextNode( data ) );
			else
			    script.text = data;
				
			head.insertBefore( script, head.firstChild );
			head.removeChild( script );
		}
	},
	
	nodeName: function( elem, name )
	{
		return elem.nodeName && elem.nodeName.toUpperCase() == name.toUpperCase();
	},

	each: function( object, callback, args )
	{
		var name, i = 0, length = object.length;

		if( args )
		{
			if( length === undefined )
			{
				for( name in object )
					if ( callback.apply( object[ name ], args ) === false )
						break;
			}
			else
				for( ; i < length; )
					if( callback.apply( object[ i++ ], args ) === false )
						break;
		}
		else
		{
			if( length === undefined )
			{
				for( name in object )
					if( callback.call( object[name], name, object[name] ) === false )
						break;
			}
			else
				for( var value = object[0];
					i < length && callback.call( value, i, value ) !== false; value = object[++i] ){}
		}

		return object;
	},
	
	makeArray: function( array )
	{
		var ret = [];

		if( array != null )
		{
			var i = array.length;
			if( i == null || typeof array === 'string' || lhgcore.isFunction(array) || array.setInterval )
				ret[0] = array;
			else
				while( i )
					ret[--i] = array[i];
		}

		return ret;
	},
	
	inArray: function( elem, array )
	{
	    for( var i = 0, length = array.length; i < length; i++ )
		    if( array[ i ] === elem ) return i;
		return -1;
	},

	grep: function( elems, callback, inv )
	{
		var ret = [];

		// Go through the array, only saving the items
		// that pass the validator function
		for( var i = 0, length = elems.length; i < length; i++ )
			if( !inv != !callback( elems[ i ], i ) )
				ret.push( elems[ i ] );

		return ret;
	},

	merge: function( first, second )
	{
		// We have to loop this way because IE & Opera overwrite the length
		// expando of getElementsByTagName
		var i = 0, elem, pos = first.length;
		// Also, we need to make sure that the correct elements are being returned
		// (IE returns comment nodes in a '*' query)
		if( lhgcore.browser.ie ) {
			while( (elem = second[ i++ ]) != null )
				if( elem.nodeType != 8 )
					first[ pos++ ] = elem;

		}else
			while( (elem = second[ i++ ]) != null )
				first[ pos++ ] = elem;

		return first;
	},

	map: function( elems, callback )
	{
		var ret = [];

		// Go through the array, translating each of the items to their
		// new value (or values).
		for( var i = 0, length = elems.length; i < length; i++ ) {
			var value = callback( elems[ i ], i );

			if( value != null )
				ret[ ret.length ] = value;
		}

		return ret.concat.apply( [], ret );
	},
	
	prop: function( elem, value, type, i, name )
	{
	    if( lhgcore.isFunction( value ) )
		    value = value.call( elem, i );
		
		return typeof value === 'number' && type == 'curCSS' && !exclude.test( name ) ?
		    value + 'px' : value;
	}
});

// 浏览器检测
(function(ua){
    
	var b = {
	    ie: /msie/.test(ua) && !/opera/.test(ua),
		ch: /chrome/.test(ua),
		op: /opera/.test(ua),
		ff: /firefox/.test(ua),
		sa: /webkit/.test(ua) && !/chrome/.test(ua)
	};
	
	b.ver = ( ua.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,'0'] )[1];
	b.i7 = b.ie && b.ver >= 7;
	b.i8 = b.ie && b.ver == 8;
	b.isDTD = document.compatMode == 'CSS1Compat';
	
	lhgcore.browser = b;
	
	lhgcore.props = {
	    'for': 'htmlFor',
		'class': 'className',
		'float': b.ie ? 'styleFloat' : 'cssFloat'
	};
	
	lhgcore.fragments = {};
	
})(navigator.userAgent.toLowerCase());

/*
// <summary>
   A number of helper functions used for managing events.
   Many of the ideas behind this code originated from
   Dean Edwards' addEvent library.
// </summary>
*/
function cleanData( elems )
{
	for( var i = 0, elem, id; (elem = elems[i]) != null; i++ )
	{
		if( !lhgcore.noData[elem.nodeName.toLowerCase()] && (id = elem['lhguid']) )
			delete lhgcore.cache[ id ];
	}
};

function preventDefault()
{
    this.returnValue = false;
};

function stopPropagation()
{
    this.cancelBubble = true;
};

lhgcore.fn.extend({
	bind: function( type, func )
	{
	    return this.each(function(){
		    lhgcore.event.add( this, type, func );
		});
	},
	
	unbind: function( type, func )
	{
	    return this.each(function(){
		    lhgcore.event.remove( this, type, func );
		});
	},
	
	hover: function( fnOver, fnOut )
	{
	    return this.mouseover(fnOver).mouseout(fnOut);
	}
});

lhgcore.extend({
	cache: {
	    guid: 1, fuid: 1,
		
		addListener: function(guid)
		{
		    return typeof lhgcore !== 'undefined' ? function(){
			    lhgcore.event.handle.apply( lhgcore.cache[guid].elem, arguments );
			} : undefined;
		}
	},
	
	noData: {
		'embed': true,
		'object': true,
		'applet': true
	},
	
	event: {
	    add: function( elem, type, handler )
		{
			var guid = elem.lhguid || (elem.lhguid = lhgcore.cache.guid++);
			
			if( !lhgcore.cache[guid] )
				lhgcore.cache[guid] = {
					elem: elem,
					listener: lhgcore.cache.addListener(guid),
					events: {}
				};
			
			if( type && !lhgcore.cache[guid].events[type] )
			{
				lhgcore.cache[guid].events[type] = {};
				
				if( elem.addEventListener )
					elem.addEventListener( type, lhgcore.cache[guid].listener, false );
				else if( elem.attachEvent )
					elem.attachEvent( 'on' + type, lhgcore.cache[guid].listener );
			}
			
			if( handler )
			{
				if( !handler.fuid )
					handler.fuid = lhgcore.cache.fuid++
				lhgcore.cache[guid].events[type][handler.fuid] = handler;
			}
			
			elem = null;
		},
		
		remove: function( elem, type, handler )
		{
			try{
			    var handle = lhgcore.cache ?
				    lhgcore.cache[elem.lhguid] : undefined,
				events, ret;
			}
			catch(e){ return; }
			
			if( handle )
			{
				events = handle.events;
				
				if( type === undefined )
					for( var type in events )
						this.remove( elem, type );
				else
				{
					if( events[type] )
					{
						if( handler )
							delete events[type][handler.fuid];
						else
							for( var func in events[type] )
								delete events[type][func];
						
						for( ret in events[type] ) break;
						if( !ret )
						{
							if( elem.removeEventListener )
								elem.removeEventListener( type, handle.listener, false );
							else if( elem.detachEvent )
								elem.detachEvent( 'on' + type, handle.listener );
							
							ret = null;
							delete events[type];
						}
					}
				}
				
				for( ret in events ) break;
				if( !ret )
				{
					delete lhgcore.cache[elem.lhguid];

					try{
					    delete elem['lhguid'];
					}catch(e){
					    if( elem.removeAttribute )
						    elem.removeAttribute( 'lhguid' );
					}
				}
			}
		},
		
		handle: function(event)
		{
		    event = arguments[0] = lhgcore.event.fix( event || window.event );
			if( !event.currentTarget ) event.currentTarget = this;
			
			var handlers = lhgcore.cache[this.lhguid].events[event.type];
			
			for( var i in handlers )
			{
				this.func = handlers[i];
				
				if( this.func(event) === false )
				{
				    event.preventDefault();
					event.stopPropagation();
				}
			}
		},
		
		fix: function(event)
		{
			if( !event.preventDefault )
			    event.preventDefault = preventDefault;
				
			if( !event.stopPropagation )
			    event.stopPropagation = stopPropagation;
			
			if( !event.target )
			    event.target = event.srcElement || document;

		    if( event.pageX == null && event.clientX != null )
			{
		        var doc = document.documentElement, body = document.body;
			    event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0);
				event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0);
			}
			
			if( !event.relatedTarget && event.fromElement )
			    event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;
			
			return event;
		}
	}
});

lhgcore.each(('blur,focus,load,resize,scroll,unload,click,dblclick,contextmenu,' +
	'mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,' +
	'change,select,submit,keydown,keypress,keyup,error').split(','), function(i,name){
	// 此方法会把对象原来的事件覆盖掉
	lhgcore.fn[name] = function(fn)
	{
	    return this.each(function(){
			lhgcore.event.remove( this, name );
			this[ 'on' + name ] = null;
			lhgcore.event.add( this, name, fn );
		});
	};
});

lhgcore( window ).bind( 'unload', function(){
	for( var id in lhgcore.cache )
	    if( id != 1 && lhgcore.cache[id].listener )
	        lhgcore.event.remove( lhgcore.cache[id].elem );
});

/*
// <summary>
   Peppy - A lightning fast CSS 3 Compliant Selector Engine.
   http://www.w3.org/TR/css3-selectors/#selectors
   Author: James Donaghue - james.donaghue@gmail.com
// </summary>
*/
(function(){

var doc = document,
    cache = {},
	persistCache = {},
	_uid = 0,
	
	reg = {
	    trim: /^(\s|\u00A0)+|(\s|\u00A0)+$/g,
		quickTest: /^[^:\[>+~ ,]+$/,
		typeSelector: /(^[^\[:]+?)(?:\[|\:|$)/,
		tag: /^(\w+|\*)/,		
		id: /^(\w*|\*)#/,
		classRE: /^(\w*|\*)\./,
		attributeName: /(\w+)(?:[!+~*\^$|=])|\w+/,
		attributeValue: /(?:[!+~*\^$|=]=*)(.+)(?:\])/, 
		pseudoName:  /(\:[^\(]+)/,
		pseudoArgs: /(?:\()(.+)(?:\))/,				
		nthParts: /([+-]?\d)*(n)([+-]\d+)*/i,		
		combinatorTest: /[+>~ ](?![^\(]+\)|[^\[]+\])/,
		combinator:  /\s*[>~]\s*(?![=])|\s*\+\s*(?![0-9)])|\s+/g, 						
		recursive: /:(not|has)\((\w+|\*)?([#.](\w|\d)+)*(\:(\w|-)+(\([^\)]+\))?|\[[^\}]+\])*(\s*,\s*(\w+|\*)?([#.](\w|\d)+)*(\:(\w|-)+(\([^\)]+\))?|\[[^\}]+\])*)*\)/gi
    },
	
arrayIt = function(a)
{
	if( !!(window.attachEvent && !window.opera) )
	{
		return function(a)
		{
			if( a instanceof Array ) return a;
			for( var i=0, result = [], m; m = a[ i++ ]; )
				result[ result.length ] = m;
			return result;
		};
	}
	else
	{
		return function(a)
		{
			return Array.prototype.slice.call(a);
		};
	}
}();	

// Filters a list of elements for uniqueness.
function filter( a, tag )
{
	var r = [], 
		uids = {};
	if( tag ) tag = new RegExp( "^" + tag + "$", "i" );
	for( var i = 0, ae; ae = a[ i++ ]; )
	{
		ae.uid = ae.uid || _uid++;
		if( !uids[ae.uid] && (!tag || ae.nodeName.search( tag ) !== -1) )
			r[r.length] = uids[ae.uid] = ae;
	}
	return r;
};

// inspired by EXT
function getAttribute( e, a )
{
	if( !e ) return null;
	if( a === "class" || a === "className" )
		return e.className;
	if( a === "for" ) 
		return e.htmlFor;	
	return e.getAttribute( a ) || e[a];
};

function getByClass( selector, selectorRE, root, includeRoot, cacheKey, tag, flat )
{
	var result = [];
	
	if( !!flat )
		return selectorRE.test( root.className ) ? [root] : [];
	
	if( root.getElementsByClassName )
	{
		result = arrayIt( root.getElementsByClassName( selector) );			
		
		if( !!includeRoot )
		{
			if( selectorRE.test( root.className ) ) result[ result.length ] = root;
		}
		
		if( tag != "*" ) result = filter( result, tag );
		cache[ cacheKey ] = result.slice(0);
		return result;
		
	}
	else if( doc.getElementsByClassName )
	{
		result = arrayIt( doc.getElementsByClassName( selector ) ); 
		
		if( tag != "*" ) result = filter( result, tag );
		cache[ cacheKey ] = result.slice(0);
		return result;
	}
	
	var es = (tag == "*" && root.all) ? root.all : root.getElementsByTagName( tag );		
	
	if( !!includeRoot ) es[ es.length ] = root ;		
	
	for( var index = 0, e; e = es[ index++ ]; )
		if( selectorRE.test( e.className ) )
			result[ result.length ] = e;
	
	return result;
};

function getById( selector, root, includeRoot, cacheKey, tag, flat )
{
	var rs, result = [];
	
	if( !!flat )
		return getAttribute( root, "id" ) === selector ? [root] : [];
	
	if( root.getElementById )
		rs = root.getElementById( selector );
	else
		rs = doc.getElementById( selector );
	
	if( rs && getAttribute( rs, "id" ) === selector )
	{			
		result[ result.length ] = rs;
		cache[ cacheKey ] = result.slice(0);
		return result;
	}
	
	var es = root.getElementsByTagName( tag );
	
	if( !!includeRoot ) es[ es.length ] = root ;
	
	for( var index = 0, e; e = es[ index++ ]; )
		if( getAttribute( e, "id" ) === selector )
		{
			result[ result.length ] = e;
			break;
		}
	
	return result;
};

// TODO: Make use of xpath if available (look at Prototype.js for examples).
function getContextFromSequenceSelector( selector, roots, includeRoot, flat )
{
	var context, 
		tag, 
		contextType = "", 
		result = [], 
		tResult = [], 
		root, 
		rootCount, 
		rootsLength;
		
	reg.id.lastIndex = reg.typeSelector.lastIndex = reg.classRE.lastIndex = 0;
	if( !reg.tag.test( selector ) ) selector = "*" + selector;
	context = reg.typeSelector.exec( selector )[1];
	roots = roots instanceof Array ? roots.slice(0) : [roots];
	rootsLength = roots.length;
	rootCount = rootsLength - 1;

	if( reg.id.test( context ) )
	{			
		contextType = "id";
		tag = (tag = context.match( /^\w+/ )) ? tag[0] : "*";
		context = context.replace( reg.id, "");						
	}
	else if( reg.classRE.test( context ) )
	{
		contextType = "class";
		tag = (tag = context.match( reg.tag )) ? tag[0] : "*";
		context = context.replace( reg.tag, "" );
		contextRE = persistCache[context + "RegExp"] || 
					(persistCache[context + "RegExp"] = new RegExp( "(?:^|\\s)" + context.replace( /\./g, "\\s*" ) + "(?:\\s|$)" ));
		context = context.replace( /\./g, " " )
	}			
	
	while( rootCount > -1 )
	{ 
		root = roots[ rootCount-- ];
		root.uid = root.uid || _uid++;
		var cacheKey = selector + root.uid;
		
		if( cache[ cacheKey ] )
		{
			result = result.concat( cache[ cacheKey ] );
			continue;
		}
		
		if( contextType === "id" )
			tResult = getById( context, root, includeRoot, cacheKey, tag, flat );
		else if( contextType === "class" )
			tResult = getByClass( context, contextRE, root, includeRoot, cacheKey, tag, flat );
		else
		{   /* tagname */
			tResult = arrayIt( root.getElementsByTagName( context ) );
			if( !!includeRoot && (root.nodeName.toUpperCase() === context.toUpperCase() || context === "*") ) tResult[tResult.length] = root;
		}
		
		result = rootsLength > 1 ? result.concat( tResult ) : tResult;
		cache[ cacheKey ] = result.slice(0);
	}
	
	return result;
};

var css3 = {
	query: function( selectorGroups, root, includeRoot, recursed, flat )
	{
		var elements = [];
		if( !recursed )
		{  // TODO: try to clean this up. 
			selectorGroups = selectorGroups.replace( reg.trim, "" ) // get rid of leading and trailing spaces												 
										   .replace( /(\[)\s+/g, "$1" ) // remove spaces around '['  of attributes
										   .replace( /\s+(\])/g, "$1" ) // remove spaces around ']' of attributes
										   .replace( /(\[[^\] ]+)\s+/g, "$1" ) // remove spaces to the left of operator inside of attributes
										   .replace( /\s+([^ \[]+\])/g, "$1" ) // remove spaces to the right of operator inside of attributes
										   .replace( /(\()\s+/g, "$1") // remove spaces around '(' of pseudos											   
										   .replace( /(\+)([^0-9])/g, "$1 $2" ) // add space after + combinator
										   .replace( /['"]/g, "") // remove all quotations
										   .replace( /\(\s*even\s*\)/gi, "(2n)" ) // replace (even) with (2n) - pseudo arg (for caching)
										   .replace( /\(\s*odd\s*\)/gi, "(2n+1)" ); // replace (odd) with (2n+1) - pseudo arg (for caching)
		}
		if( typeof root === "string" )
			root = (root = getContextFromSequenceSelector( root, doc )).length > 0 ? root : undefined;
		root = root || doc;
		root.uid = root.uid || _uid++;
		
		var cacheKey = selectorGroups + root.uid;
		if( cache[ cacheKey ] ) return cache[ cacheKey ];
		
		reg.quickTest.lastIndex = 0;
		if( reg.quickTest.test( selectorGroups ) )
		{
			elements = getContextFromSequenceSelector( selectorGroups, root, includeRoot, flat );
			return (cache[ cacheKey ] = elements.slice(0));
		}
		
		var groupsWorker, 
			groups, 
			selector, 
			parts = [], 
			part;
			
		groupsWorker = selectorGroups.split( /\s*,\s*/g );
		groups = groupsWorker.length > 1 ? [""] : groupsWorker;
		
		// validate groups
		for( var gwi = 0, tc = 0, gi = 0, g; groupsWorker.length > 1 && (g = groupsWorker[ gwi++ ]) !== undefined; )
		{
			tc += (((l = g.match( /\(/g )) ? l.length : 0) - ((r = g.match( /\)/g )) ? r.length : 0));
			groups[gi] = groups[gi] || "";
			groups[gi] += (groups[gi] === "" ? g : "," + g);
			if( tc === 0 ) gi++;
		}
		
		var gCount = 0;				
		while( (selector = groups[gCount++]) !== undefined )
		{
			reg.quickTest.lastIndex = 0;
			if( reg.quickTest.test( selector ) )
			{
				result = getContextFromSequenceSelector( selector, root, includeRoot, flat )
				elements = groups.length > 1 ? elements.concat( result ) : result;
				continue;
			}
			reg.combinatorTest.lastIndex = 0;
			if( reg.combinatorTest.test( selector ) )
			{
				var parts, 
					pLength, 
					pCount = 0, 
					combinators, 
					cLength, 
					cCount = 0, 
					result;
					
				parts = selector.split( reg.combinator );
				pLength = parts.length;
				
				combinators = selector.match( reg.combinator ) || [""];					
				cLength = combinators.length;
				
				while( pCount < pLength )
				{
					var c, 
						part1, 
						part2;
						
					c = combinators[ cCount++ ].replace( reg.trim, "");
					
					part1 = result || css3.query( parts[pCount++], root, includeRoot, true, flat );								
					part2 = css3.query( parts[ pCount++ ], 
										c == "" || c == ">" ? part1 : root, 
										c == "" || c == ">", 
										true,
										flat );
										
					result = css3.queryCombinator( part1, part2, c );
				}
				
				elements = groups.length > 1 ? elements.concat( result ) : result;							   
				result = undefined;
			}
			else
			{
				result = css3.querySelector( selector, root, includeRoot );
				elements = groups.length > 1 ? elements.concat( result ) : result;
			}
		}	
		
		if( groups.length > 1 ) elements = filter(elements);
		
		return ( cache[ cacheKey ] = elements.slice(0) );
	},
	
	queryCombinator: function( l, r, c )
	{
		var result = [], 
			uids = {}, 
			proc = {}, 
			succ = {}, 
			fail = {}, 
			combinatorCheck = css3.simpleSelector.combinator[c];
			
		for( var li = 0, le; le = l[ li++ ]; )
		{
			le.uid = le.uid || _uid++
			uids[ le.uid ] = le;
		}	
				
		for( var ri = 0, re; re = r[ ri++ ]; )
		{
			re.uid = re.uid || _uid++; 
			if( !proc[ re.uid ] && combinatorCheck( re, uids, fail, succ ) )
				result[ result.length ] = re;
			proc[ re.uid ] = re;
		}
		return result;
	},
	
	querySelector : function( selector, root, includeRoot, flat )
	{
		var context, 
			passed = [],				 
			count, 
			totalCount, 
			e, 
			first = true, 
			localCache = {};

		context = getContextFromSequenceSelector( selector, root, includeRoot, flat ); 	
		count = context.length;
		totalCount = count - 1;			
		
		var tests, recursive;
		if( /:(not|has)/i.test( selector ) )
		{
			recursive = selector.match( reg.recursive );
			selector = selector.replace( reg.recursive, "" );
		}
		
		// Get the tests (if there aren't any just set tests to an empty array).
		if( !(tests = selector.match( /:(\w|-)+(\([^\(]+\))*|\[[^\[]+\]/g )) ) tests = [];	
			
		// If there were any recursive tests put them in the tests array (they were removed above).
		if( recursive ) tests = tests.concat( recursive );			

		// Process each tests for all elements.
		var aTest;
		while( (aTest = tests.pop()) !== undefined )
		{				
			var pc = persistCache[ aTest ], 
				testFuncScope,
				testFunc, 
				testFuncKey,				 	
				testFuncArgs = [],
				isTypeTest = false, 
				isCountTest = false;
				
			passed = [];
			
			if( pc )
			{
				testFuncKey = pc[ 0 ];
				testFuncScope = pc[ 1 ];					
				testFuncArgs = pc.slice( 2 );
				testFunc = testFuncScope[ testFuncKey ];											
			}
			else if( !/^:/.test( aTest ) )
			{ // attribute																
				var n = aTest.match( reg.attributeName );
				var v = aTest.match( reg.attributeValue );
									
				testFuncArgs[ 1 ] = n[ 1 ] || n[ 0 ];
				testFuncArgs[ 2 ] = v ? v[ 1 ] : "";						
				testFuncKey = "" + aTest.match( /[~!+*\^$|=]/ );
				testFuncScope = css3.simpleSelector.attribute;	
				testFunc = testFuncScope[ testFuncKey ];						
				persistCache[ aTest ] = [ testFuncKey, testFuncScope ].concat( testFuncArgs );					
			}
			else
			{ // pseudo						
				var pa = aTest.match( reg.pseudoArgs );					
				testFuncArgs[ 1 ] = pa ? pa[ 1 ] : "";						
				testFuncKey = aTest.match( reg.pseudoName )[ 1 ];
				testFuncScope = css3.simpleSelector.pseudos;
				
				if( /nth-(?!.+only)/i.test( aTest ) )
				{											
					var a, 
						b, 
						nArg = testFuncArgs[ 1 ],
						nArgPC = persistCache[ nArg ];
						
					if( nArgPC )
					{
						a = nArgPC[ 0 ];
						b = nArgPC[ 1 ];
					}
					else
					{								
						var nParts = nArg.match( reg.nthParts );
						if( nParts )
						{								
							a = parseInt( nParts[1],10 ) || 0;
							b = parseInt( nParts[3],10 ) || 0;
							
							if( /^\+n|^n/i.test( nArg ) )
								a = 1;
							else if( /^-n/i.test( nArg ) )
								a = -1;
							
							testFuncArgs[ 2 ] = a;
							testFuncArgs[ 3 ] = b;
							persistCache[ nArg ] = [a, b];									
						}
					}
				}
				else if( /^:contains/.test( aTest ) )
				{
					var cArg = testFuncArgs[1];
					var cArgPC = persistCache[ cArg ];
					
					if( cArgPC )
						testFuncArgs[1] = cArgPC;
					else
						testFuncArgs[1] = persistCache[ cArg ] = new RegExp( cArg );	
				}
				testFunc = testFuncScope[ testFuncKey ];
				persistCache[ aTest ] = [ testFuncKey, testFuncScope ].concat( testFuncArgs );	
			}				
			
			isTypeTest = /:(\w|-)+type/i.test( aTest);
			isCountTest = /^:(nth[^-]|eq|gt|lt|first|last)/i.test( aTest );					
			if( isCountTest ) testFuncArgs[ 3 ] = totalCount;	
			
			// Now run the test on each element (keep only those that pass)								
			var cLength = context.length, cCount = cLength -1;
			while( cCount > -1 )
			{
				e = context[ cCount-- ];
				if( first )
					e.peppyCount = cCount + 1;
				var pass = true;
				testFuncArgs[ 0 ] = e;
				
				if( isCountTest ) 
					testFuncArgs[2] = e.peppyCount;

				if( !testFunc.apply( testFuncScope, testFuncArgs ) )
					pass = false;
				
				if( pass )
					passed.push(e);
			}
			context = passed;
			first = false;
		}
		return passed;
	},
	
	simpleSelector: {
		attribute: {
			"null": function( e, a, v ){ return !!getAttribute(e,a); },
			"=": function( e, a, v ){ return getAttribute(e,a) == v; },
			"~": function( e, a, v ){ return getAttribute(e,a).match(new RegExp('\\b'+v+'\\b')) },
			"^": function( e, a, v ){ return getAttribute(e,a).indexOf( v ) === 0; },
			"$": function( e, a, v ){ var attr = getAttribute(e,a); return attr.lastIndexOf( v ) === attr.length - v.length; },
			"*": function( e, a, v ){ return getAttribute(e,a).indexOf( v ) != -1; },
			"|": function( e, a, v ){ return getAttribute(e,a).match( '^'+v+'-?(('+v+'-)*('+v+'$))*' ); },
			"!": function( e, a, v ){ return getAttribute(e,a) !== v; }
		},
		
		pseudos: {
			":root": function( e ){ return e === doc.getElementsByTagName( "html" )[0] ? true : false; },
			":nth-child": function( e, n, a, b, t )
			{	
				if( !e.nodeIndex )
				{
					var node = e.parentNode.firstChild, count = 0, last;
					for( ; node; node = node.nextSibling )
					{
						if( node.nodeType == 1 )
						{
							last = node;								
							node.nodeIndex = ++count;
						}
					}
					last.IsLastNode = true;
					if( count == 1 ) last.IsOnlyChild = true;
				}
				var position = e.nodeIndex;
				if( n == "first" ) 
					return position == 1;
				if( n == "last" )
					return !!e.IsLastNode;
				if( n == "only" )
					return !!e.IsOnlyChild;
				return (!a && !b && position == n) || 
					   ((a == 0 ? position == b : 
								  a > 0 ? position >= b && (position - b) % a == 0 :
										  position <= b && (position + b) % a == 0));
			},				
			":nth-last-child": function( e, n ){ return this[ ":nth-child" ]( e, n, a, b ); },  // TODO: n is not right.
			":nth-of-type": function( e, n, t ){ return this[ ":nth-child" ]( e, n, a, b, t); },
			":nth-last-of-type": function( e, n, t ){ return this[ ":nth-child" ](e, n, a, b, t ); }, // TODO: n is not right.
			":first-child": function( e ){ return this[ ":nth-child" ]( e, "first" ); },
			":last-child": function( e ){ return this[ ":nth-child" ]( e, "last" ); },
			":first-of-type": function( e, n, t ){ return this[ ":nth-child" ]( e, "first", null, null, t ); },
			":last-of-type": function( e, n, t ){ return this[ ":nth-child" ]( e, "last", null, null, t ); },
			":only-child": function( e ){ return this[ ":nth-child" ]( e, "only" ); },
			":only-of-type": function( e, n, t ){ return this[ ":nth-child" ]( e, "only", null, null, t ); },
			":empty": function( e )
			{ 
				for( var node = e.firstChild, count = 0; node !== null; node = node.nextSibling )
				{
					if( node.nodeType === 1 || node.nodeType === 3 ) return false;
				}
				return true;
			},
			":not": function( e, s ){ return css3.query( s, e, true, true, true ).length === 0; },
			":has": function( e, s ){ return css3.query( s, e, true, true, true ).length > 0; },
			":selected": function( e ){ return e.selected; },
			":hidden": function( e ){ return e.type === "hidden" || e.style.display === "none"; },
			":visible": function( e ){ return e.type !== "hidden" && e.style.display !== "none"; },
			":input": function( e ){ return e.nodeName.search( /input|select|textarea|button/i ) !== -1; },
			":radio": function( e ){ return e.type === "radio"; },
			":checkbox": function( e ){ return e.type === "checkbox"; },
			":text": function( e ){ return e.type === "text"; },
			":header": function( e ){ return e.nodeName.search( /h\d/i ) !== -1; },
			":enabled": function( e ){ return !e.disabled && e.type !== "hidden"; },
			":disabled": function( e ){ return e.disabled; },
			":checked": function( e ){ return e.checked; },
			":contains": function( e, s ){ return s.test( (e.textContent || e.innerText || "") ); },
			":parent": function( e ){ return !!e.firstChild; },
			":odd": function( e ){ return this[ ":nth-child" ]( e, "2n+2", 2, 2 ); },
			":even": function( e ){ return this[ ":nth-child" ]( e, "2n+1", 2, 1 ); },
			":nth": function( e, s, i ){ return s == i; },
			":eq": function( e, s, i ){ return s == i; },
			":gt": function( e, s, i ){ return i > s; },
			":lt": function( e, s, i ){ return i < s; },
			":first": function( e, s, i ){ return i == 0 },
			":last": function( e, s, i, end ){ return i == end; }
		},
		
		combinator: {
			"": function( r, u, f, s )
			{
				var rUID = r.uid;
				while( (r = r.parentNode) !== null && !f[ r.uid ])
				{
					if( !!u[ r.uid ] || !!s[ r.uid ] )
						return (s[ rUID ] = true);
				}
				return (f[ rUID ] = false);
			},
			">": function( r, u, f, s )
			{
				return r.parentNode && u[ r.parentNode.uid ] ;
			},
			"+": function( r, u, f, s )
			{
				while( (r = r.previousSibling) !== null && !f[ r.uid ] )
				{
					if( r.nodeType === 1 )
						return r.uid in u;
				}
				return false;
			},
			"~": function( r, u, f, s )
			{
				var rUID = r.uid;
				while( (r = r.previousSibling) !== null && !f[ r.uid ] ) {
					if( !!u[ r.uid ] || !!s[ r.uid ] )
						return (s[ rUID ] = true);
				}
				return (f[ rUID ] = false);
			}
		}
	}
};

// From John Resig -> http://ejohn.org/blog/thoughts-on-queryselectorall/
// Copyright 2008, John Resig (http://ejohn.org/)
// released under the MIT License
if( doc.querySelectorAll )
{
	(function(){
		var oldCss3 = css3.query;
		
		css3.query = function( sel, context )
		{
			context = context || doc;
			if( context === doc )
			{
				try {
					return context.querySelectorAll(sel);
				} catch(e){}
			}
			
			return oldCss3( sel, context );
		};
	})();
}
else
{
	var aEvent = doc.addEventListener || doc.attachEvent;
	function clearCache(){ cache = {}; }
	aEvent("DOMAttrModified", clearCache, false);
	aEvent("DOMNodeInserted", clearCache, false);
	aEvent("DOMNodeRemoved", clearCache, false);	
}

lhgcore.find = css3.query;
	
})();	

/*
// <summary>
   文档处理相关的代码部分，包括创建HTML代码、文档的追加等操作
// </summary>
*/
var rxhtmlTag = /(<([\w:]+)[^>]*?)\/>/g,
    rhtml = /<|&\w+;/,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
    rselfClosing = /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,
    fcloseTag = function( all, front, tag )
	{
	    return rselfClosing.test(tag) ?
		    all : front + '></' + tag + '>';
	},
	wrapMap = {
	    option: [ 1, '<select multiple="multiple">', '</select>' ],
		legend: [ 1, '<fieldset>', '</fieldset>' ],
		thead: [ 1, '<table>', '</table>' ],
		tr: [ 2, '<table><tbody>', '</tbody></table>' ],
		td: [ 3, '<table><tbody><tr>', '</tr></tbody></table>' ],
		col: [ 2, '<table><tbody></tbody><colgroup>', '</colgroup></table>' ],
		_default: lhgcore.browser.ie ? [ 1, 'div<div>', '</div>' ] : [ 0, '', '' ]
	};

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;
	
function buildFragment( args, nodes, scripts )
{
    var fragment, cacheable, cached, cacheresults, doc;
	
	if( args.length === 1 && typeof args[0] === 'string' &&
 	    args[0].length < 512 && args[0].indexOf('<option') < 0 )
	{
	    cacheable = true;
		cacheresults = lhgcore.fragments[ args[0] ];
		
		if( cacheresults )
		{
		    if( cacheresults !== 1 )
			    fragment = cacheresults;
			cached = true;
		}
	}
	
	if( !fragment )
	{
	    doc = ( nodes && nodes[0] ? nodes[0].ownerDocument || nodes[0] : document );
		fragment = doc.createDocumentFragment();
		lhgcore.clean( args, doc, fragment, scripts );
	}
	
	if( cacheable )
	    lhgcore.fragments[ args[0] ] = cacheresults ? fragment : 1;
	
	return { fragment: fragment, cacheable: cacheable };
};

lhgcore.fn.extend({
	html: function( value )
	{
		if( value === undefined )
		    return this[0] ? this[0].innerHTML : null;
		else if( typeof value === 'string' && !/<script/i.test(value) )
		{
			for( var i = 0, l = this.length; i < l; i++ )
			{
			    if( this[i].nodeType === 1 )
				{
				    cleanData( this[i].getElementsByTagName('*') );
					this[i].innerHTML = value;
				}
			}
		}
		else
		    this.empty().append( value );
		
		return this;
	},
	
	text: function( text )
	{
		return text === undefined ? ( this[0] ? this[0].innerText ?
		    this[0].innerText : this[0].textContent : null ) :
			    this.each(function(){
				    this.innerText ? this.innerText = text : this.textContent = text;
				});
	},
	
	val: function( value )
	{
	    if( value === undefined )
		{
		    var elem = this[0];
			
			if( elem )
			{
			    if( lhgcore.nodeName( elem, 'option' ) )
				    return ( elem.attributes.value || {} ).specified ? elem.value : elem.text;
				
				if( lhgcore.nodeName( elem, 'select' ) )
				{
				    var index = elem.selectedIndex, values = [],
					options = elem.options,
					one = elem.type == 'select-one';
					
					if( index < 0 )
					    return null;
					
					for( var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++ )
					{
					    var option = options[ i ];
						
						if( option.selected )
						{
						    value = lhgcore(option).val();
							
							if( one )
							    return value;
							
							values.push( value );
						}
					}
					
					return values;
				}
				
				return (elem.value || '').replace(/\r/g, '');
			}
			
			return undefined;
		}
		
		if( typeof value === 'number' )
		    value += '';
		
		return this.each(function(){
		    if( this.nodeType != 1 ) return;
			
			if( lhgcore.isArray(value) && /radio|checkbox/.test( this.type ) )
			    this.checked = ( lhgcore.inArray(this.value,value) >= 0 ||
				    lhgcore.inArray(this.name,value) >= 0 );
			else if( lhgcore.nodeName( this, 'select' ) )
			{
			    var values = lhgcore.makeArray(value);
				lhgcore( 'option', this ).each(function(){
				    this.selected = ( lhgcore.inArray(this.value,values) >= 0 ||
					    lhgcore.inArray(this.text,values) >= 0 );
				});
				if( !values.length )
				    this.selectedIndex = -1;
			}
			else
			    this.value = value;
		});
	},

	append: function()
	{
		return this.domManip( arguments, true, function(elem){
			if( this.nodeType === 1 )
				this.appendChild( elem );
		});
	},

	prepend: function()
	{
		return this.domManip( arguments, true, function(elem){
			if( this.nodeType === 1 )
				this.insertBefore( elem, this.firstChild );
		});
	},

	before: function()
	{
		return this.domManip( arguments, false, function(elem){
			this.parentNode.insertBefore( elem, this );
		});
	},

	after: function()
	{
		return this.domManip( arguments, false, function(elem){
			this.parentNode.insertBefore( elem, this.nextSibling );
		});
	},

	domManip: function( args, table, callback )
	{
		var results, first, value = args[0], scripts = [];

		if( lhgcore.isFunction(value) )
		{
			return this.each(function(){
				args[0] = value.call(this);
				return lhgcore(this).domManip( args, table, callback );
			});
		}

		if( this[0] )
		{
			// If we're in a fragment, just use that instead of building a new one
			if( args[0] && args[0].parentNode && args[0].parentNode.nodeType === 11 )
				results = { fragment: args[0].parentNode };
			else
				results = buildFragment( args, this, scripts );
			
			first = results.fragment.firstChild;

			if( first )
			{
				table = table && lhgcore.nodeName( first, 'tr' );

				for( var i = 0, l = this.length; i < l; i++ )
				{
					callback.call(
						table ? root(this[i],first) : this[i],
						results.cacheable || this.length > 1 || i > 0 ?
							results.fragment.cloneNode(true) : results.fragment
					);
				}
			}

			if( scripts )
				lhgcore.each( scripts, evalScript );
		}
		
		return this;
		
		function root( elem, cur )
		{
		    return table && lhgcore.nodeName(elem,'table') && lhgcore.nodeName(cur,'tr') ?
			    (elem.getElementsByTagName('tbody')[0] ||
				elem.appendChild(elem.ownerDocument.createElement('tbody'))) : elem;
		}
	}
});

lhgcore.extend({
    clean: function( elems, context, fragment, scripts )
	{
	    context = context || document;
		
		if( typeof context.createElement === 'undefined' )
		    context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
		
		var ret = [];
		
		lhgcore.each( elems, function(i,elem){
		    if( typeof elem === 'number' )
			    elem += '';
			
			if( !elem ) return;
			
			if( typeof elem === 'string' && !rhtml.test(elem) )
			    elem = context.createTextNode( elem );
			else if( typeof elem === 'string' )
			{
			    elem = elem.replace( rxhtmlTag, fcloseTag );
				
				var tag = ( rtagName.exec(elem) || ['',''] )[1].toLowerCase(),
				    wrap = wrapMap[ tag ] || wrapMap._default,
					depth = wrap[0],
					div = context.createElement('div');
				
				div.innerHTML = wrap[1] + elem + wrap[2];
				
				while( depth-- )
				    div = div.lastChild;

				// Remove IE's autoinserted <tbody> from table fragments
				if ( lhgcore.browser.ie )
				{
					// String was a <table>, *may* have spurious <tbody>
					var hasBody = rtbody.test(elem),
						tbody = tag === 'table' && !hasBody ?
							div.firstChild && div.firstChild.childNodes :

							// String was a bare <thead> or <tfoot>
							wrap[1] == '<table>' && !hasBody ?
								div.childNodes : [];

					for( var j = tbody.length - 1; j >= 0 ; --j )
					{
						if( lhgcore.nodeName( tbody[ j ], 'tbody' ) && !tbody[ j ].childNodes.length )
							tbody[ j ].parentNode.removeChild( tbody[ j ] );
					}
				}
				
				if( lhgcore.browser.ie && /^\s+/.test(elem) )
				    div.insertBefore( context.createTextNode( /^\s+/.exec(elem)[0] ), div.firstChild );
				elem = lhgcore.makeArray( div.childNodes );
			}
			
			if( elem.nodeType )
				ret.push( elem );
			else
				ret = lhgcore.merge( ret, elem );
		});
		
		if( fragment )
		{
		    for( var i = 0; ret[i]; i++ )
			{
			    if( scripts && lhgcore.nodeName(ret[i],'script') &&
				    (!ret[i].type || ret[i].type.toLowerCase() === 'text/javascript') )
				{
				    scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );
				}
				else
				{
				    if( ret[i].nodeType === 1 )
					    ret.splice.apply( ret, [i + 1, 0].concat(lhgcore.makeArray(ret[i].getElementsByTagName('script'))) );
					fragment.appendChild( ret[i] );
				}
			}
		}
		
		return ret;
	}
});

lhgcore.each({
    appendTo : 'append',
	prependTo : 'prepend',
	insertBefore : 'before',
	insertAfter : 'after'
}, function( name, original ){
    lhgcore.fn[name] = function( selector )
	{
		var insert = lhgcore( selector, this.context );
		
		for( var i = 0, l = this.length; i < l; i++ )
		    insert[original]( this[i] );
		
		return this;
	};
});

/*
// <summary>
   元素属性、样式，类处理的相关代码部分，主要包括attr、css、className部分
// </summary>
*/
var defaultView = document.defaultView || {},
    exclude = /z-?index|font-?weight|opacity|zoom|line-?height/i;

lhgcore.fn.extend({
	css: function( key, value )
	{
	    if( (key == 'width' || key == 'height') && parseFloat(value) < 0 )
		    value = undefined;
		return this.attr( key, value, 'curCSS' );
	},
	
	attr: function( name, value, type )
	{
		var options = name;

		// Look for the case where we're accessing a style value
		if( typeof name === 'string' )
			if( value === undefined )
				return this[0] && lhgcore[ type || 'attr' ]( this[0], name );
			else
			{
				options = {};
				options[ name ] = value;
			}

		// Check to see if we're setting style values
		return this.each(function(i){
			// Set all the styles
			for( name in options )
				lhgcore.attr(
					type ? this.style : this,
					name, lhgcore.prop( this, options[ name ], type, i, name )
				);
		});
	}
});

lhgcore.extend({
	attr: function( elem, name, value )
	{
		// don't set attributes on text and comment nodes
		if( !elem || elem.nodeType == 3 || elem.nodeType == 8 )
			return undefined;
		
		var set = value !== undefined;
		
		name = lhgcore.props[ name ] || name;
		
		if( elem.tagName )
		{
			// These attributes require special treatment
			var special = /href|src|style/.test( name );

			// Safari mis-reports the default selected property of a hidden option
			// Accessing the parent's selectedIndex property fixes it
			// 这行代码会在google的压缩中删除
			if( name == 'selected' && elem.parentNode )
				elem.parentNode.selectedIndex;

			// If applicable, access the attribute via the DOM 0 way
			if( name in elem && !special )
			{
				if( set )
				{
					// We can't allow the type property to be changed (since it causes problems in IE)
					if( name == 'type' && lhgcore.nodeName( elem, 'input' ) && elem.parentNode )
						throw "type property can't be changed";

					elem[ name ] = value;
				}

				// browsers index elements by id/name on forms, give priority to attributes.
				if( lhgcore.nodeName( elem, 'form' ) && elem.getAttributeNode(name) )
					return elem.getAttributeNode( name ).nodeValue;
				
				return elem[ name ];
			}

			if( lhgcore.browser.ie && name == 'style' )
				return lhgcore.attr( elem.style, 'cssText', value );

			if( set )
				// convert the value to a string (all browsers do this but IE) see #1070
				elem.setAttribute( name, '' + value );

			var attr = lhgcore.browser.ie && special
					// Some attributes require a special call on IE
					? elem.getAttribute( name, 2 )
					: elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return attr === null ? undefined : attr;
		}
		
		// IE uses filters for opacity
		if( lhgcore.browser.ie && name == 'opacity' ) {
			if( set )
			{
				// IE has trouble with opacity if it does not have layout
				// Force it by setting the zoom level
				elem.zoom = 1;

				// Set the alpha filter to set the opacity
				elem.filter = (elem.filter||'').replace( /alpha\([^)]*\)/, '' ) +
					(parseInt( value ) + '' == 'NaN' ? '' : 'alpha(opacity=' + value * 100 + ')');
			}

			return elem.filter && elem.filter.indexOf('opacity=') >= 0 ?
				( parseFloat( elem.filter.match(/opacity=([^)]*)/)[1] ) / 100 ) + '' : '';
		}

		name = name.replace(/-([a-z])/ig, function(all,letter){
			return letter.toUpperCase();
		});

		if( set )
			elem[ name ] = value;

		return elem[ name ];
	},
	
	curCSS : function( elem, name, force )
	{
	    var ret, style = elem.style;

		// We need to handle opacity special in IE
		if( name == 'opacity' && lhgcore.browser.ie )
		{
			ret = lhgcore.attr( style, 'opacity' );

			return ret == '' ? '1' : ret;
		}

		// Make sure we're using the right name for getting the float value
		if( name.match( /float/i ) )
			name = lhgcore.props['float'];

		if( !force && style && style[ name ] )
			ret = style[ name ];
		else if( defaultView.getComputedStyle )
		{
			// Only "float" is needed here
			if( name.match( /float/i ) )
				name = 'float';

			name = name.replace( /([A-Z])/g, '-$1' ).toLowerCase();

			var computedStyle = defaultView.getComputedStyle( elem, null );

			if( computedStyle )
				ret = computedStyle.getPropertyValue( name );

			// We should always get a number back from opacity
			if( name == 'opacity' && ret == '' )
				ret = '1';
		} else if( elem.currentStyle ) {
			var camelCase = name.replace(/\-(\w)/g, function(all,letter){
				return letter.toUpperCase();
			});

			ret = elem.currentStyle[ name ] || elem.currentStyle[ camelCase ];
			
			// If we're not dealing with a regular pixel number
			// but a number that has a weird ending, we need to convert it to pixels
			if( !/^\d+(px)?$/i.test( ret ) && /^\d/.test( ret ) )
			{
				// Remember the original values
				var left = style.left, rsLeft = elem.runtimeStyle.left;

				// Put in the new values to get a computed value out
				elem.runtimeStyle.left = elem.currentStyle.left;
				style.left = ret || 0;
				ret = style.pixelLeft + 'px';

				// Revert the changed values
				style.left = left;
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret;
	},
	
	className : {
		// internal only, use addClass("class")
		add : function( elem, classNames )
		{
			lhgcore.each((classNames || '').split(/\s+/), function(i, className){
				if( elem.nodeType == 1 && !lhgcore.className.has( elem.className, className ) )
					elem.className += (elem.className ? ' ' : '') + className;
			});
		},

		// internal only, use removeClass("class")
		remove : function( elem, classNames )
		{
			if(elem.nodeType == 1)
				elem.className = classNames !== undefined ?
					lhgcore.grep(elem.className.split(/\s+/), function(className){
						return !lhgcore.className.has( classNames, className );
					}).join(' ') : '';
		},

		// internal only, use hasClass("class")
		has: function( elem, className )
		{
			return elem && lhgcore.inArray( className, (elem.className || elem).toString().split(/\s+/) ) > -1;
		}
	}
});

lhgcore.each({
	removeAttr : function( name )
	{
		lhgcore.attr( this, name, '' );
		if(this.nodeType == 1)
			this.removeAttribute( name );
	},

	addClass : function( classNames )
	{
		lhgcore.className.add( this, classNames );
	},

	removeClass : function( classNames )
	{
		lhgcore.className.remove( this, classNames );
	},

	toggleClass : function( classNames, state )
	{
		if( typeof state !== 'boolean' )
			state = !lhgcore.className.has( this, classNames );
		lhgcore.className[ state ? 'add' : 'remove' ]( this, classNames );
	},
	
	remove : function()
	{
		if( this.nodeType === 1 )
		{
		    cleanData( this.getElementsByTagName('*') );
			cleanData( [this] );
		}
		
		if( this.parentNode )
		    this.parentNode.removeChild(this);
	},
	
	empty : function()
	{
		if( this.nodeType === 1 )
		    cleanData( this.getElementsByTagName('*') )
		
		while( this.firstChild )
		    this.removeChild( this.firstChild );
	}
}, function(name, fn){
	lhgcore.fn[ name ] = function(){
		return this.each( fn, arguments );
	};
});

/*
// <summary>
   查找相匹配的元素的一些代码函数，主要为扩展lhgcore的查找元素的方式
// </summary>
*/
lhgcore.extend({
    dir: function( elem, dir )
	{
		var matched = [], cur = elem[dir];
		while( cur && cur != document )
		{
			if( cur.nodeType == 1 )
				matched.push( cur );
			cur = cur[dir];
		}
		return matched;
	},
	
	nth: function( cur, result, dir, elem )
	{
		result = result || 1;
		var num = 0;
	
		for( ; cur; cur = cur[dir] )
			if( cur.nodeType == 1 && ++num == result )
				break;
	
		return cur;
	},
	
	sibling: function( n, elem )
	{
		var r = [];
	
		for( ; n; n = n.nextSibling )
			if( n.nodeType == 1 && n != elem )
				r.push( n );
	
		return r;
	}
});

lhgcore.each({
    parent: function(elem){ return elem.parentNode; },
	parents: function(elem){ return lhgcore.dir(elem,'parentNode'); },
	next: function(elem){ return lhgcore.nth(elem,2,'nextSibling'); },
	prev: function(elem){ return lhgcore.nth(elem,2,'previousSibling'); },
	nextAll: function(elem){ return lhgcore.dir(elem,'nextSibling'); },
	prevAll: function(elem){ return lhgcore.dir(elem,'previousSibling'); },
	siblings: function(elem){return lhgcore.sibling(elem.parentNode.firstChild,elem); },
	children: function(elem){ return lhgcore.sibling(elem.firstChild); },
	contents: function(elem){ return lhgcore.nodeName(elem,'iframe')?elem.contentDocument||elem.contentWindow.document:lhgcore.makeArray(elem.childNodes); }
}, function( name, fn ){
    lhgcore.fn[ name ] = function( selector )
	{
	    var ret = lhgcore.map( this, fn ), r = [];
		
		if( selector && typeof selector === 'string' )
		{
		    for( var i = 0, l = ret.length; i < l; i++ )
			{
			    if( lhgcore(ret[i]).is( selector ) )
				    r.push( ret[i] );
			}
			ret = r;
		}
		
		return lhgcore(ret);
	};
});

/*
// <summary>
   ajax相关操的部分，这里做了简化，只有一个lhgcore.ajax()一个底层的实现
// </summary>
*/
var jsc = now();

lhgcore.extend({
    ajaxSet : {
		url : location.href,
		type : 'GET',
		contentType : 'application/x-www-form-urlencoded',
		async : true,
		xhr : function(){
		    return window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
		},
		accepts : {
			xml : 'application/xml, text/xml',
			html : 'text/html',
			script : "text/javascript, application/javascript",
			json : "application/json, text/javascript",
			text : 'text/plain',
			_default : '*/*'
		},
		processData: true
	},
	
	lastModified: {},
	
	ajax : function( r )
	{
	    lhgcore.extend( true, r, lhgcore.extend(true,{},lhgcore.ajaxSet,r) );
		
		var jsonp, jsre = /=\?(&|$)/g, status, data,
		    type = r.type.toUpperCase();

		// convert data if not already a string
		if( r.data && r.processData && typeof r.data !== 'string' )
			r.data = lhgcore.param(r.data);

		// 构建jsonp请求字符集串。jsonp是跨域请求，要加上callback=？后面将会进行加函数名
		if( r.dataType == 'jsonp' )
		{
			if( type == 'GET' )
			{
				if( !r.url.match(jsre) )
					r.url += (r.url.match(/\?/) ? '&' : '?') + (r.jsonp || 'callback') + '=?';
			}
			else if( !r.data || !r.data.match(jsre) )
				r.data = (r.data ? r.data + '&' : '') + (r.jsonp || 'callback') + '=?';
			r.dataType = 'json';
		}

		// Build temporary JSONP function
		if( r.dataType == 'json' && (r.data && r.data.match(jsre) || r.url.match(jsre)) )
		{
			jsonp = 'jsonp' + jsc++;

			// Replace the =? sequence both in the query string and the data
			if( r.data )
				r.data = (r.data + '').replace(jsre, '=' + jsonp + '$1');
			r.url = r.url.replace(jsre, '=' + jsonp + '$1');

			// We need to make sure
			// that a JSONP style response is executed properly
			r.dataType = 'script';

			// Handle JSONP-style loading
			window[ jsonp ] = function(tmp)
			{
				data = tmp;
				success();
				complete();
				// Garbage collect
				window[ jsonp ] = undefined;
				try{ delete window[ jsonp ]; }catch(e){}
				if( head )
					head.removeChild( script );
			};
		}
		
		if( r.dataType == 'script' && r.cache == null )
		    r.cache = false;
		
		if( r.cache === false && type == 'GET' )
		{
		    var ts = now();
			var ret = r.url.replace( /(\?|&)_=.*?(&|$)/, '$1_=' + ts + '$2' );
			r.url = ret + ( (ret == r.url) ? (r.url.match(/\?/) ? '&' : '?') + '_=' + ts : '' );
		}
			
		if( r.data && type == 'GET' )
		{
		    r.url += ( r.url.match(/\?/) ? '&' : '?' ) + r.data;
			r.data = null;
		}
		
		// Matches an absolute URL, and saves the domain
		var parts = /^(\w+:)?\/\/([^\/?#]+)/.exec( r.url );

		// If we're requesting a remote document
		// and trying to load JSON or Script with a GET
		if( r.dataType == 'script' && type == 'GET' && parts
			&& ( parts[1] && parts[1] != location.protocol || parts[2] != location.host ))
		{
			var head = document.getElementsByTagName('head')[0];
			var script = document.createElement('script');
			script.src = r.url;
			if( r.scriptCharset )
				script.charset = r.scriptCharset;

			// Handle Script loading
			if( !jsonp )
			{
				var done = false;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function(){
					if( !done && (!this.readyState ||
							this.readyState == 'loaded' || this.readyState == 'complete') )
					{
						done = true;
						success();
						complete();

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;
						head.removeChild( script );
					}
				};
			}

			head.appendChild(script);

			// We handle everything using the script element injection
			return undefined;
		}
		
		var requestDone = false;
		
		var xhr = r.xhr();
		
		if( r.username )
			xhr.open( type, r.url, r.async, r.username, r.password );
		else
			xhr.open( type, r.url, r.async );
		
		try{
		    if( r.data )
			    xhr.setRequestHeader( 'Content-Type', r.contentType );
			
			if( r.ifModified )
			    xhr.setRequestHeader( 'If-Modified-Since',
				    lhgcore.lastModified[r.url] || 'Thu, 01 Jan 1970 00:00:00 GMT' );
			
			xhr.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' );
			
			xhr.setRequestHeader( 'Accept', r.dataType && r.accepts[ r.dataType ] ?
				r.accepts[ r.dataType ] + ', */*' :
				r.accepts._default );
		}catch(e){}
		
		if( r.beforeSend && r.beforeSend(xhr,r) === false )
		{
		    xhr.abort();
			return false;
		}
		
		var onreadystatechange = function(isTimeout)
		{
		    if( xhr.readyState == 0 )
			{
			    if(ival)
				{
				    clearInterval(ival);
					ival = null;
				}
			}
			else if( !requestDone && xhr && (xhr.readyState == 4 || isTimeout == 'timeout') )
			{
			    requestDone = true;
			    
				if(ival)
				{
				    clearInterval(ival);
					ival = null;
				}
				
				status = isTimeout == 'timeout' ? 'timeout' :
					!lhgcore.httpSuccess( xhr ) ? 'error' :
					r.ifModified && lhgcore.httpNotModified( xhr, r.url ) ? 'notmodified' :
					'success';
				
				if( status == 'success' )
				{
				    try{
					    data = lhgcore.httpData( xhr, r.dataType, r );
					}
					catch(e){
					    status = 'parsererror';
					}
				}
				
				if( status == 'success' )
				{
				    var modRes;
					try{
						modRes = xhr.getResponseHeader('Last-Modified');
					}catch(e){}

					if( r.ifModified && modRes )
						lhgcore.lastModified[r.url] = modRes;

					// JSONP handles its own success callback
					if( !jsonp )
						success();
				}
				else
				    lhgcore.handleError( r, xhr, status );
				
				complete();
				
				if( isTimeout )
				    xhr.abort();
				
				if( r.async )
				    xhr = null;
			}
		};
		
		if( r.async )
		{
		    var ival = setInterval( onreadystatechange, 13 );
			
			if( r.timeout > 0 )
			    setTimeout(function(){
				    if( xhr && !requestDone )
					    onreadystatechange( 'timeout' );
				}, r.timeout);
		}

		try{
			xhr.send( r.data );
		}catch(e){
			lhgcore.handleError( r, xhr, null, e );
		}

		// firefox 1.5 doesn't fire statechange for sync requests
		if( !r.async )
			onreadystatechange();

		function success()
		{
			if( r.success )
				r.success( data, status );
		}

		function complete()
		{
			if( r.complete )
				r.complete( xhr, status );
		}

		// return XMLHttpRequest to allow aborting the request etc.
		return xhr;
	},

	handleError : function( r, xhr, status, e )
	{
		// 本地的回调
		if( r.error )
			r.error( xhr, status, e );
	},

	// Determines if an XMLHttpRequest was successful or not
	httpSuccess: function( xhr )
	{
		try{
			// IE error sometimes returns 1223 when it should be 204 so treat it as success, see #1450
			return !xhr.status && location.protocol == 'file:' ||
				( xhr.status >= 200 && xhr.status < 300 ) || xhr.status == 304 || xhr.status == 1223;
		}catch(e){}
		return false;
	},

	// Determines if an XMLHttpRequest returns NotModified
	httpNotModified: function( xhr, url )
	{
		try{
			var xhrRes = xhr.getResponseHeader('Last-Modified');

			// Firefox always returns 200. check Last-Modified date
			return xhr.status == 304 || xhrRes == lhgcore.lastModified[url];
		}catch(e){}
		return false;
	},

	httpData: function( xhr, type, r )
	{
		var ct = xhr.getResponseHeader('content-type'),
			xml = type == 'xml' || !type && ct && ct.indexOf('xml') >= 0,
			data = xml ? xhr.responseXML : xhr.responseText;

		if( xml && data.documentElement.tagName == 'parsererror' )
			throw 'parsererror';
		
		// Allow a pre-filtering function to sanitize the response
		// s != null is checked to keep backwards compatibility
		if( r && r.dataFilter )
			data = r.dataFilter( data, type );

		// The filter can actually parse the response
		if( typeof data === 'string' )
		{
			// If the type is "script", eval it in global context
			if( type == "script" )
				lhgcore.globalEval( data );
				
		    // Get the JavaScript object, if JSON is used.
			if( type == 'json' )
				data = window['eval']('(' + data + ')');
		}
		
		return data;
	},
	
	param: function( a )
	{
	    var s = [];

		function add( key, value ){
			s[ s.length ] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
		};
		
		if( lhgcore.isArray(a) || a.lhgren )
			// Serialize the form elements
			lhgcore.each( a, function(){
				add( this.name, this.value );
			});
		else
			// Serialize the key/values
			for( var j in a )
				// If the value is an array then the key names need to be repeated
				if( lhgcore.isArray(a[j]) )
					lhgcore.each( a[j], function(){
						add( j, this );
					});
				else
					add( j, lhgcore.isFunction(a[j]) ? a[j]() : a[j] );

		// Return the resulting serialization
		return s.join('&').replace(/%20/g, '+');
	}
});

window.lhgcore = window.J = lhgcore;

})();