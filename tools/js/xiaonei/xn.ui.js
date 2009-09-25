if(!XN.UI)XN.UI = {};
/*
 * 	xui组件的基本属性和方法
 */
XN.UI.Element = {
/*
 *  该组件是否已经有父级元素
 */
	haveFather:false,
	
/*
 *  组件的最外层元素
 */
	frame:null,
	
/*
 *  可选参数
 */

//	options:{},
		
	//iHaveNoFather:true,
	addClass:function(className){
		this.frame.addClass(className);
	},
	delClass:function(className){
		this.frame.delClass(className);
	},
	show	:function() {
		this.frame.show();
	},
	hide	:function() {
		this.frame.hide()
	},
/*
 *  将组件从父容器中移除
 */
	remove:function(){
		this.frame.remove();
		this.haveFather = false;
	}
};
/*
 *  xui能够作为容器的组件的属性和方法
 */
XN.UI.Content = {
/*
 *  组件中充当容器的层
 */
	container:null,
	addChild:function(s){
		this.container.addChild(s);
	},
	delChild:function(s){
		this.container.delChild(s);
	},
	setContent:function(s){
		this.container.setContent(s);
	},
	clear:function(){
		this.container.innerHTML = '';
	}
};

$extend(XN.UI.Content,XN.UI.Element);

XN.UI.fixPositionMethods = {
	'1-1':function(f,el,x,y,p){
		f.style.left = x + el.realLeft() - p.realLeft() + 'px';
		f.style.top = y + el.realTop() - p.realTop() + 'px';
	},
	'1-2':function(f,el,x,y,p){
		f.style.left = x + el.realLeft() - p.realLeft() - f.offsetWidth + 'px';
		f.style.top = y + el.realTop() - p.realTop()  + 'px';
	},
	'1-3':function(f,el,x,y,p){
		f.style.left = x + el.realLeft() - p.realLeft() - f.offsetWidth + 'px';
		f.style.top = y + el.realTop() - p.realTop() - f.offsetHeight + 'px';
	},
	'1-4':function(f,el,x,y,p){
		f.style.left = x + el.realLeft() - p.realLeft() + 'px';
		f.style.top = y + el.realTop() - p.realTop()  - f.offsetHeight + 'px';
	},
	'2-1':function(f,el,x,y,p){
		f.style.left = x + el.realLeft() - p.realLeft() + el.offsetWidth + 'px';
		f.style.top = y + el.realTop() - p.realTop()  + 'px';
	},
	'2-2':function(f,el,x,y,p){
		f.style.left = x + el.realLeft() - p.realLeft() + el.offsetWidth - f.offsetWidth + 'px';
		f.style.top = y + el.realTop() - p.realTop() ;
	},
	'2-3':function(f,el,x,y,p){
		f.style.left = x + el.realLeft() - p.realLeft() + el.offsetWidth - f.offsetWidth + 'px';
		f.style.top = y + el.realTop() - p.realTop()  - f.offsetHeight + 'px';
	},
	'2-4':function(f,el,x,y,p){
		f.style.left = x + el.realLeft() - p.realLeft() + el.offsetWidth + 'px';
		f.style.top = y + el.realTop() - p.realTop()  - f.offsetHeight + 'px';
	},
	'3-1':function(f,el,x,y,p){
		f.style.left = x + el.realLeft() - p.realLeft() + el.offsetWidth + 'px';
		f.style.top = y + el.realTop() - p.realTop() + el.offsetHeight + 'px';
	},
	'3-2':function(f,el,x,y,p){
		f.style.left = x + el.realLeft() - p.realLeft() + el.offsetWidth - f.offsetWidth + 'px';
		f.style.top = y + el.realTop(p) + el.offsetHeight + 'px';
	},
	'3-3':function(f,el,x,y,p){
		f.style.left = x + el.realLeft() - p.realLeft() + el.offsetWidth - f.offsetWidth + 'px';
		f.style.top = y + el.realTop() - p.realTop() + el.offsetHeight - f.offsetHeight + 'px';
	},
	'3-4':function(f,el,x,y,p){
		f.style.left = x + el.realLeft() - p.realLeft() + el.offsetWidth + 'px';
		f.style.top = y + el.realTop() - p.realTop() + el.offsetHeight - f.offsetHeight + 'px';
	},
	'4-1':function(f,el,x,y,p){
		f.style.left = x + el.realLeft() - p.realLeft() + 'px';
		f.style.top = y + el.realTop() - p.realTop() + el.offsetHeight + 'px';
	},
	'4-2':function(f,el,x,y,p){
		f.style.left = x + el.realLeft() - p.realLeft() - f.offsetWidth + 'px';
		f.style.top = y + el.realTop() - p.realTop() + el.offsetHeight + 'px';
	},
	'4-3':function(f,el,x,y,p){
		f.style.left = x + el.realLeft() - p.realLeft() - f.offsetWidth + 'px';
		f.style.top = y + el.realTop() - p.realTop() + el.offsetHeight - f.offsetHeight + 'px';
	},
	'4-4':function(f,el,x,y,p){
		f.style.left = x + el.realLeft() - p.realLeft() + 'px';
		f.style.top = y + el.realTop() - p.realTop() + el.offsetHeight - f.offsetHeight + 'px';
	}
};
/**
 *  构造一个绝对定位的元素
 */

XN.UI.fixPositionElement = function(parameters){
	this.options = {};	
	$extend(this.options,parameters);
	this.init();
}
XN.UI.fixPositionElement.prototype = $extend({},XN.UI.Content);
$extend(XN.UI.fixPositionElement.prototype,{
	/**
	 * 对齐对象
	 */
	alignWith:null,
	
	/**
	 * 对齐方式
	 */
	alignType:'4-1',
	
	/**
	 * 定位偏移
	 */
	offsetX:0,
	offsetY:0,
	alignParent:'dropmenuHolder',
	left:null,
	top:null,
	init:function(){
		var ops = this.options,f,x,y;
		if(ops.id){
			this.frame = this.container = f = $X(ops.id);
			x = f.realLeft();
			y = f.realTop();
			if(f.parentNode)f.parentNode.removeChild(f);
		}else if(ops.tagName){
			this.frame = this.container = f = $xElement(ops.tagName);
		}else{
			throw new Error('need id or tagName');
		}
		if(ops.alignType){
			this.alignType = ops.alignType;
		}
		if(!isUndefined(ops.offsetX)){
			this.offsetX = ops.offsetX;
		}
		if(!isUndefined(ops.offsetY)){
			this.offsetY = ops.offsetY;
		}

		f.style.position = 'absolute';
		this.hide();
		f.style.display = 'block';
		f.style.zIndex = 10001;
//		f.setStyle('position:absolute;z-index:10001;left:-9999px;top:-9999px;display:block;');
		this.alignParent = $(ops.alignParent) || $(this.alignParent) || $(document.body);
		if(ops.father){
			ops.father.appendChild(f);
		}else{
			this.alignParent.appendChild(f);
		}
		if(ops.alignWith){
			this.alignWith = $(ops.alignWith);
		}else if(x){
			this.moveTo(x,y);
		}
		this.options = null;
	},
	refresh:function(){
		this.moveTo();
	},
	setOffsetX:function(x){
		this.offsetX = x;
		this.refresh();
	},
	setOffsetY:function(y){
		this.offsetY = y;
		this.refresh();
	},
	setAlignType:function(t){
		this.alignType = t;
		this.refresh();
	},
	setAlignParent:function(p){
		this.alignParent = p;
		this.frame.remove();
		this.alignParent.appendChild(this.frame);
		this.refresh();
	},
	hide:function(){
		var f = this.frame;
		this.left = f.offsetLeft;
		this.top = f.offsetTop;
		f.style.left = '-9999px';
		f.style.top = '-9999px';
	},
	show:function(){
		if(this.alignWith){
			this.moveTo(this.alignWith);
		}else{
			this.frame.style.left = this.left + 'px';
			this.frame.style.top = this.top + 'px';
		}
	},
	moveTo:function(x,y){
		if(isNumber(x) || isNumber(y)){
			this.alignWith = null;
			if(x){
				this.left = x;
				this.frame.style.left = x + 'px';
			}
			if(y){
				this.top = y;
				this.frame.style.top = y + 'px';
			}
		}else{
			if(x && $(x) != this.alignWith){
				this.alignWith = $(x);
			}
			if(this.alignWith){
				var _s = this;
				XN.UI.fixPositionMethods[_s.alignType](_s.frame,_s.alignWith,_s.offsetX,_s.offsetY,this.alignParent);
			}else{
				this.frame.style.left = this.left + 'px';
				this.frame.style.top = this.top + 'px';
			}
		}
	}
});


/**
 *  xui 按钮组件
 *  @class XN.UI.button
 */
XN.UI.button = function(parameters) {
	this.options = {};
	if(isString(parameters)){
		this.options.text = parameters;
	}else{
		this.options = parameters;
	}	
//	$extend(this.options,parameters);
	this.init();
};
XN.UI.button.prototype = $extend({},XN.UI.Element);
$extend(XN.UI.button.prototype,{
	init	:function() {
		var ops = this.options,b,s = this;
		if(ops.id){
			this.frame = $(ops.id);
		}else{
			this.frame = $element('input');
			if(ops.container){
				ops.container.appendChild(this.frame);
				this.haveFather = true;
			}
		}
		b = this.frame;
		switch (ops.type) {
			case "button" :
			default:
				b.type = "button";
				b.className = "input-submit";
			break;
		}
		if(ops.className){
			this.addClass(ops.className);
		}
		this.onclick = ops.onclick || XN.FUNC.empty;
		this.setText(ops.text);
		this.frame.addEvent("click",function(){
			s.onclick();
		},false);
		this.options = null;
	},
	setText	:function(s) {
		if(s){
			this.frame.value = s;
		}
	},
	disable:function(){
		this.frame.blur();
		this.frame.disabled = true;
		this.frame.addClass('gray');
	},
	enable:function(){
		this.frame.disabled = false;
		this.frame.delClass('gray');
	},
	focus:function(){
		this.frame.focus();
	},
	blur:function(){
		this.frame.blur();
	}
});

/**
 *  xui 菜单组件
 *  @class XN.UI.menu
 */
XN.UI.menu = function(parameters){
	this.options = parameters;	
	//$extend(this.options,parameters);
	this.init();
};
XN.UI.menu.prototype = $extend({},XN.UI.Content);
$extend(XN.UI.menu.prototype,{
	fireOn:'click',
	alignType:'4-1',
	isShow:true,
	barOnshowClass:'',
	tagName:'div',
	_menu:null,
	_canAddItem:true,
	_menuList:null,
	_iframe:null,
	_mouseInBar:false,
	_mouseInMenu:false,
	_timer:null,
	_keepTimer:null,
	keep:0.3,
	init:function(){
//		this.isShow = true;
		var _s = this,ops = this.options,f,fix,_if,div;
		if(ops.text){
			this.frame = f = $xElement(ops.tagName || this.tagName);
			f.addChild(ops.text);
		}else if(ops.bar){
			this.frame = f = $(ops.bar);
			if(f.parentNode)this.haveFather = true;
		}else{
			throw new Error('XN.UI.menu:need text or bar');
		}
		if(ops.alignType){
			this.alignType = ops.alignType;
		}
		if(ops.barOnshowClass){
			this.barOnshowClass = ops.barOnshowClass;
		}

		if(ops.menu){
			//alert(ops.menu);
			this._menu = new XN.UI.fixPositionElement({id:ops.menu,alignType:this.alignType,alignWith:(ops.alignWith || this.frame)});
			this._canAddItem = false;
			//alert(ops.menu);
		}else{
			this._menu = new XN.UI.fixPositionElement({tagName:'div',alignType:this.alignType,alignWith:(ops.alignWith || this.frame)});
			this.container = div = $xElement('div');
			this._menu.frame.appendChild(div);
		}
		
		this._menu.frame.style.zIndex = 10001;
		
		this._menu.frame.onclick = function(e){
			e = e || window.event;
			var el = XN.EVENT.element(e);
			if(el.tagName.toLowerCase() != 'a'){
				XN.EVENT.stop(e);
			}
		}
		
		if(XN.BROWSER.IE6){
			var _if = $element('iframe');
			_if.src = 'about:blank';
			_if.frameBorder = 0;
			_if.setStyle('position:absolute;border:0px;left:0px;top:0px;z-index:-1');
			this._iframe = _if;
			this._menu.frame.appendChild(_if);
		}
		if(ops.offsetX){
			this._menu.offsetX = ops.offsetX;
		}
		if(ops.offsetY){
			this._menu.offsetY = ops.offsetY;
		}
		this.fireOn = ops.fireOn || 'click';
		if(!isUndefined(ops.keep)){
			this.keep = ops.keep;
		}
		if(this.fireOn == 'click'){
			this.frame.onclick = function(event){
				event = event || window.event;
				XN.EVENT.stop(event);
				if(_s.isShow){
					_s.hide();
				}else{
					_s.show();
				}
			};
			XN.EVENT.addEvent(document,'click',this.hide.bind(this),false);
		}else if(this.fireOn == 'mouseover'){
			XN.EVENT.addEvent(this.frame,'mouseover',function(event){
				event = event || window.event;
				_s._mouseInBar = true;
				if(_s._keepTimer){
					clearTimeout(_s._keepTimer);
					_s._keepTimer = null;
				}	
				if(_s.keep){
					_s._keepTimer = setTimeout(function(){
						if(_s._mouseInBar){
							_s.show();
						}
					},_s.keep * 1000);
				}else{
					_s.show();
				}
				XN.EVENT.stop(event);
			},false);
			
			this.frame.onclick = function(e){
				e = e || window.event;
				XN.EVENT.stop(e);
			};
			
			XN.EVENT.addEvent(this.frame,'mouseleave',function(){_s._barMouseleave();},false);
			XN.EVENT.addEvent(this._menu.frame,'mouseleave',function(){_s._menuMouseleave();},false);
			XN.EVENT.addEvent(this._menu.frame,'mouseover',function(event){_s._mouseInMenu = true;},false);
		}else if(this.fireOn == 'manual'){
			
		}
		this.hide();
		this.options = null;

	},
	addSubMenu:function(m){
		try{
			if(!m.haveFather){
				this._menu.addChild(m);
			}
		m._menu.setAlignParent(this.frame);
		}catch(e){
			throw new Error(' you must add an available Menu Object');
		}
	},
	_barMouseleave:function(){
		this._mouseInBar = false;
		var s = this;
		if(this._timer){
			clearTimeout(this._timer);
			this._timer = null;
		}
		setTimeout(function(){
			if(!s._mouseInMenu){
//				if(this.keep){
//					s._timer = setTimeout(s.hide.bind(s),s.keep * 1000);
//				}else{
					s.hide();
//				}
			}
		},50);
	},
	_menuMouseleave:function(){
		this._mouseInMenu = false;
		var s = this;
		if(this._timer){
			clearTimeout(this._timer);
			this._timer = null;
		}
		setTimeout(function(){
			if(!s._mouseInBar){
//				if(s.keep){
//					s._timer = setTimeout(s.hide.bind(s),s.keep * 1000);
//				}else{
					s.hide();
//				}
			}
		},50);	
	},
	setWidth:function(w){
		this._menu.frame.style.width = w + 'px';
		if(this._iframe){
			this._iframe.style.width = this._menu.frame.offsetWidth + 'px';
		}
	},
	onShow:function(){
		
	},
	onHide:function(){
		
	},
	show:function(){
		if(this.isShow)return;
		this._menu.show();
		if(this._iframe){
			this._iframe.style.height = this._menu.frame.offsetHeight - 2 + 'px';
			this._iframe.style.width = this._menu.frame.offsetWidth + 'px';
		}
		this._menu.refresh();
//		if(this.barOnshowClass !== '')this.frame.addClass(this.barOnshowClass);
		if(this.barOnshowClass !== '')this._menu.alignWith.addClass(this.barOnshowClass);
		this.onShow();
		this.isShow = true;
	},
	hide:function(){
		if(!this.isShow)return;
		this._menu.hide();
//		if(this.barOnshowClass !== '')this.frame.delClass(this.barOnshowClass);
		if(this.barOnshowClass !== '')this._menu.alignWith.delClass(this.barOnshowClass);
		this.onHide();
		this.isShow = false;
	}
});


XN.UI.toggleView = function(parameters){
	this.options = parameters;
	//$extend(this.options,parameters);
	this.init();
};
XN.UI.toggleView.prototype = {
	bar:null,
	div:null,
	onShow:null,
	onHide:null,
	isShow:true,
	init:function(){
		var ops = this.options,o,s = this;
		this.bar = $(ops.bar);
		this.div = $(ops.div);
		this.onShow = ops.onShow || XN.FUNC.empty;
		this.onHide = ops.onHide || XN.FUNC.empty;
		o = ops.original || 'hide';
		if(o == 'show'){
			this.isShow = true;
			XN.Element.show(this.div);
		}else{
			this.isShow = false;
			XN.Element.hide(this.div);
		}
		this.fireOn = ops.fireOn || 'click';
		switch(this.fireOn){
			case 'mouseover':
			XN.EVENT.addEvent(this.bar,'mouseover',this.toggle.bind(this),false);
			XN.EVENT.addEvent(this.bar,'mouseleave',this.toggle.bind(this),false);
			break;
			default:
			XN.EVENT.addEvent(this.bar,'click',function(e){
				e = e || window.event;
				XN.EVENT.stop(e);
				s.toggle();
			},false);
			break;
		}
	},
	toggle:function(){
		this[(this.isShow ? 'hide' : 'show')]();
	},
	show:function(){
		this.div.style.display = 'block';
		this.isShow = true;
		this.onShow();
	},
	hide:function(){
		XN.Element.hide(this.div);
		this.isShow = false;
		this.onHide();
	},
	onShow:function(){
		
	},
	onHide:function(){
		
	}
};

XN.UI.tabView = function(parameters){
	this._tabs = [];
	$extend(this,parameters);
};
XN.UI.tabView.prototype = {
	selectedClass:'select',
	
//	_tabs:[],
	_currentTab:null,
	addTab:function(o){
		var label,el = {};
		label = el.label = $(o.label);
		el.content = $(o.content);
		el.onActive = o.onActive || XN.FUNC.empty;
		el.onClick = o.onclick || o.onClick || XN.FUNC.empty;
		el.onInactive = o.onInactive || XN.FUNC.empty;
		this._tabs[label.id] = el;
		label.tabView = this;
		if(o.active && this._currentTab === null){
			if(el.content)el.content.show();
			label.addClass(this.selectedClass);
			this._currentTab = label.id;
		}else{
			if(el.content)el.content.hide();
		}
		label.onclick = this._showTab;
	},
	refreshTab:function(id){
		var s = this;
		if(s._currentTab == id){
			s._tabs[id].onActive(s._tabs[id]);
		}else{
			this.showTab(id);
		}
	},
	showTab:function(id){
		var s = this;
		s._tabs[id].onClick();
		$(id).addClass(s.selectedClass);
		if (s._currentTab && s._currentTab == id){
			return;
		}
		try{
			s._tabs[s._currentTab].onInactive(s._tabs[s._currentTab]);
			s._tabs[s._currentTab].label.delClass(s.selectedClass);
			s._tabs[s._currentTab].content.hide();
		}catch(e){}
		try{
			s._tabs[id].content.show();
		}catch(e){}	
		s._tabs[id].onActive(s._tabs[id]);
		s._currentTab = id;
	},
	hideAll:function(){
		var s = this;
		try{
			s._tabs[s._currentTab].onInactive(s._tabs[s._currentTab]);
			s._tabs[s._currentTab].label.delClass(s.selectedClass);
			s._currentTab = null;
			s._tabs[s._currentTab].content.hide();
		}catch(e){}		
	},
	_showTab:function(e){
		e = e || window.event;
		XN.EVENT.stop(e);
		var s = this.tabView;
		s.showTab(this.id);
	}
};


XN.UI.DS_Array = function(p){
	$extend(this,p);
	this.init();
};
XN.UI.DS_Array.prototype = {
	DS_TYPE:'array',
	data:null,
	searchKey:null,
	init:function(){
		var key = this.searchKey,
		index = this._index = [];
		XN.ARRAY.each(this.data,function(i,v){
			index.push(v[key]);
		});
	},
	query:function(v){
		return this._search(v);
	},
	_search:function(v){
		var keys = this._index,
		data = this.data,
		rt = [],
		reg = new RegExp('^' + v,'i');
		XN.ARRAY.each(keys,function(i,v){
			if(reg.test(v)){
				rt.push(data[i]);
			}
		});
		return rt;
	}
};



XN.UI.DS_XHR = function(p){
	$extend(this,p);
};
XN.UI.DS_XHR.prototype = {
	url:null,
	useCache:false,
	queryParam:'query',
	query:function(v){
		var r = new XN.NET.xmlhttp({
			url:this.url,
			data:this.queryParam + '=' + encodeURIComponent(v),
			asynchronous:false
		});
		function parseDS_XML(r){
			var rt = [];
			function getResult(r){
				var tmp = {};
				XN.ARRAY.each(r.childNodes,function(i,v){
					tmp[v.tagName] = v.firstChild.nodeValue;
				});
				return tmp;
			}
			var rs = r.getElementsByTagName('Result');
			XN.ARRAY.each(rs,function(i,v){
				rt.push(getResult(v));
			});
			return rt;
		}
		return parseDS_XML(r.transport.responseXML);
	}
};
XN.UI.autoComplete = function(p){
	$extend(this,p);
	this.initAutoComplete();
};
XN.UI.autoComplete.prototype = {
	input:null,    //输入框
	inputTip:'', //输入框提示
	searchDelay:0.2,//匹配延迟
	DS:null,

	_inputTimer:null,

/**
 *  用户的上一次输入
 */
	_lastInput:null,

	_haveInput:false,

	initAutoComplete:function(){
		var input = this.input = $(this.input);
		var s = this;
		if(this.inputTip){
			(new XN.FORM.inputHelper(input)).setDefaultValue(this.inputTip);
		}
		XN.EVENT.addEvent(input,'focus',function(){
			s.fireEvent('focus');
		},false);
		XN.EVENT.addEvent(input,'blur',function(){
			s.fireEvent('blur');
		},false);
		XN.EVENT.addEvent(input,'keydown',function(e){
			e = e || window.event;
			if(e.keyCode == 13){
				XN.EVENT.stop(e);
			}
			s.fireEvent('keydown',e);
		},false);
		/**
		 * 阻止浏览器的自动完成
		 */
		input.setAttribute("AutoComplete", "off");
		
		this.addEvent('focus',function(){
			this._inputTimer = setInterval(this._checkInput.bind(this),this.searchDelay * 1000);
		});
		this.addEvent('blur',function(){
			clearInterval(this._inputTimer);
			this._inputTimer = null;
		});
	},
	_checkInput:function(){
		var cv = this.input.value;
		if(XN.STRING.isBlank(cv)){
			if(this._lastInput === ''){
//				this.fireEvent('noinput');
				return;
			}
			this._lastInput = '';
			this.fireEvent('noinput');
			return;
		}
		if(cv == this._lastInput)return;
		this._lastInput = cv;
		this.fireEvent('searchbegin');
		this.fireEvent('searchover',this.DS.query(cv));
	}
};




XN.EVENT.enableCustomEvent(XN.UI.autoComplete.prototype);


XN.UI.autoCompleteMenu = function(p){
	$extend(this,p);
	this.initAutoComplete();
	this.initAutoCompleteMenu();
};
XN.UI.autoCompleteMenu.prototype = $extend($extend({},XN.UI.autoComplete.prototype),{
	highLight:true,
	//highLightClass:'highlight',	
	ulClass:'',
	liClass:'',
	liMouseoverClass:'m-autosug-hover',
	aClass:'',
	noResult:'无匹配结果...',
	noInputTip:null,
	autoSelectFirst:false,
	
/**
 *  菜单控件
 */

	_menu:null,

/**
 * 菜单的外层
 */
	_menuList:null,

/**
 * 菜单的ul元素 
 */

	_ul:null,

/**
 * 当前高亮的的li元素
 */
	
	_liHasLight:null,



//	_liToLight:null,
//	lis:[], //要显示到菜单的内容

/**
 *  高亮一个菜单项
 */

	_highLightMenu:function(li){
		if(li == this._liHasLight)return;
		if(this._liHasLight !== null)XN.ELEMENT.delClass(this._liHasLight,this.liMouseoverClass	);
		XN.ELEMENT.addClass(li,this.liMouseoverClass	);
		this._liHasLight = li;	
	},

/**
 *  键盘事件处理函数
 */

	_inputOnkeydown:function(event){
		var li;

/**
 *   回车选择一个菜单项
 */

		if(event.keyCode == 13){
			if(this._menu.isShow && this._liHasLight){
				var aid = this._liHasLight.getAttribute('aid');
				if(aid){
					this._selectMenu(parseInt(aid));
				}
			}
			return false;
		}

/**
 *  向上高亮上一个
 */

		if(event.keyCode == 38){
			if(this._liHasLight && this._liHasLight.previousSibling){
				li = 	this._liHasLight.previousSibling;
			}else{
				li = this._ul.lastChild;			
			}
			this._highLightMenu(li);
			return false;
		}

/**
 *  向下高亮下一个
 */

		if(event.keyCode == 40){
			if(this._liHasLight && this._liHasLight.nextSibling){
				li = 	this._liHasLight.nextSibling;
			}else{
				li = this._ul.firstChild;			
			}
			this._highLightMenu(li);
			return false;
		}
		
		return true;
	},

/**
 *  当在菜单上点击时触发
 */	
 
	_menuOnclick:function(event){
		var el = XN.EVENT.element(event);
//		if(el.tagName.toLowerCase() == 'li'){
//			this._selectMenu(parseInt(el.getAttribute('aid')));
//		}
		if(el.tagName.toLowerCase() == 'li'){
		}else if(el.parentNode.tagName.toLowerCase() == 'li'){
			el = el.parentNode;
		}else if(el.parentNode.parentNode.tagName.toLowerCase() == 'li'){
			el = el.parentNode.parentNode;
		}
		if(!el.getAttribute('aid'))return;
		this._selectMenu(parseInt(el.getAttribute('aid')));
		return false;
	},

/**
 *  当在菜单上移动鼠标时触发
 */

	_menuOnmouseover:function(event){
		var el = XN.EVENT.element(event);
		var li;
		if(el.tagName.toLowerCase() == 'li'){
			li = el;
		}else if(el.parentNode.tagName.toLowerCase() == 'li'){
			li = el.parentNode;
		}else if(el.parentNode.parentNode.tagName.toLowerCase() == 'li'){
			li = el.parentNode.parentNode;
		}
		if(li && li.tagName && li.getAttribute('aid'))this._highLightMenu(li);
		return false;
	},
	
/**
 *  选择一个菜单项
 */

	_selectMenu:function(id){
		this._menu.hide();
		this.input.focus();
		this.fireEvent('select',this.result[id]);
		this._lastInput = this.input.value;
	},


/**
 *  初始化菜单
 */

	initAutoCompleteMenu:function(){
		var input = this.input;
		var s = this;
		var m = $element('div');
		this._menuList = m;
		m.className = 'm-autosug';
		m.innerHTML = '<span class="x1"><span class="x1a"></span></span><span class="x2"><span class="x2a"></span></span>';
		var div = $element('div');
		div.className = 'm-autosug-minwidth';
		var div2 = $element('div');
		div2.className = 'm-autosug-content';
		var ul = $element('ul');
		ul.className = this.ulClass;

		div2.appendChild(ul);
		div.appendChild(div2);
		m.appendChild(div);

		this._ul = this._menuList.getElementsByTagName('ul')[0];
		this._menu = new XN.UI.menu({bar:input,menu:m,fireOn:'manual'});

		this.addEvent('keydown',this._inputOnkeydown);
		
		this._ul.onclick = function(event){
			event = event || window.event;
			return s._menuOnclick(event);
		};
		
		this._ul.onmousemove = function(event){
			event = event || window.event;
			return s._menuOnmouseover(event);
		};
		
		XN.EVENT.addEvent(document,'click',function(){s._menu.hide();},false);
		
		this._menu.hide();
		
		/**
		 * 没有输入时关闭菜单
		 */
		this.addEvent('noinput',function(){
			if(this.noInputTip){
				this._buildMenu(this.noInputTip);
			}else{
				this._menu.hide();
			}
		});
				
		this.addEvent('searchover',this._buildMenu);
		
	},

	setMenuWidth:function(w){
		this._menu.setWidth(w);
	},


/**
 * 匹配结束,显示匹配结果
 */

	_buildMenu:function(result){
		var s = this;
		this.result = result;
		if(isString(result)){
			this._ul.innerHTML = '<li><p>' + result + '</p></li>';
			this._menu.show();
			this._liHasLight = null;
			return;
		}else if(result.length == 0){
			var noResult;
			if(this.noResult){
				if(isString(this.noResult)){
					noResult = this.noResult;
				}else{
					noResult = this.noResult();
				}
			}else{
				noResult = '无匹配结果...';
			}
			this._ul.innerHTML = '<li>' + noResult + '</li>';
			this._menu.show();
			this._liHasLight = null;
			return;
		}

		var lis = [];
		XN.ARRAY.each(result,function(i,v){
			lis.push('<li aid="' + i + '">' + s.buildMenu(v) + '</li>');
		});
		this._ul.innerHTML = lis.join('');
		if(this.autoSelectFirst)this._highLightMenu(this._ul.firstChild);
		this._menu.show();
	},
	buildMenu:function(r){
		return '<li>' + r.name + '</li>';
	}
});

XN.UI.friendSelector = function(parameters){
	$extend(this,parameters);
	this.init();
};

XN.UI.friendSelector.prototype = $extend({},XN.UI.Element);
$extend(XN.UI.friendSelector.prototype,{
	getFriendsUrl:'/getfriendsajax.do?s=1&642876017-1190355567-1&u=642876017&include_me=1&lists=1&include_emails=1',
	_isLoading:false,
	_ready:false,
	loadFriends:function(r){
		var cache = XN.UI.multiFriendSelector.friends;
		if(r){
			var s = r.responseText;
			s = s.substring(9,s.length);
			eval(s);
			var tmp = [];
			XN.ARRAY.each(friends,function(i,v){
				tmp.push({
					'name':v.t,
					'id':v.i,
					'net':v.n,
					'head':v.h,
					'profile':v.u
				});
			});
			XN.UI.multiFriendSelector.friends = tmp;
			this._isLoading = false;
		}
		
		if(!this._ready && !this._isLoading){
			if(XN.UI.multiFriendSelector.friends === null){
				XN.UI.multiFriendSelector.friends = {};
				this._isLoading = true;
				new XN.NET.xmlhttp(this.getFriendsUrl,'',arguments.callee.bind(this));
				return;
			}
			this._ready = true;
			this.onready();
		}
	},
	onready:function(){
		var s = this;
		var ds = new XN.UI.DS_Array({
			data:XN.UI.multiFriendSelector.friends,
			searchKey:'name'
		});
		this.autoComplete = new XN.UI.autoCompleteMenu({
			DS:ds,
			input:this.frame,
			noResult:(this.noResult || null),
			inputTip:(this.inputTip || null),
			noInputTip:(this.noInputTip || null)
		});
		this.autoComplete.buildMenu = function(r){
			return '<p>' + r.name + '</p>'
		}
		this.autoComplete.fireEvent('focus');
		this.autoComplete.setMenuWidth(this.frame.offsetWidth);
		this.autoComplete.addEvent('select',function(r){
			this.input.value = r.name;
			if(s.onSelectOne){
				s.onSelectOne({
					'id':r.id,
					'name':r.name,
					'net':r.net,
					'head':r.head,
					'profile':r.profile
				});
			}
		});
	},
	init:function(){
		var s = this;
		if(this.id){
			this.frame = $(this.id);
			this.haveFather= true;
		}else{
			this.frame = $element('input');
			this.haveFather = false;
		}
		if(document.activeElement == this.frame){
			if(s._ready)return;
			s.loadFriends();			
		}else{
			XN.EVENT.addEvent(this.frame,'focus',function(){
				if(s._ready)return;
				s.loadFriends();
			},false);			
		}
	}
});

XN.UI.friendSearchBar = function(p){
		var input = $(p.input);
		var submit = $(p.submit || null);
		var form = $(p.form);
		var tip = p.tip || '找人...';
		var action = p.action || function(p){
			window.location.href = 'http://' + XN.ENV.domain + '/profile.do?id=' + p.id;
		};
		var gotoUserPage = false;
		
		(new XN.FORM.inputHelper(input)).setDefaultValue(tip).onEnter(function(el){
			if(gotoUserPage)return;
			if(!XN.STRING.isBlank(el.value)){
				form.submit();
			}
		});

		var friendSelector = new XN.UI.friendSelector({
			id:input,
			noResult:function(){
				return '搜索"' + this.input.value + '"';
			}
		});


		friendSelector.onSelectOne = function(p){
			gotoUserPage = true;
			action(p);
		};

		if(submit)submit.onclick = function(){
			if(gotoUserPage)return;
			var v = input.value;
			if(v != tip && !XN.STRING.isBlank(v)){
				form.submit();
			}
		};
}

XN.UI.multiFriendSelector = function(parameters){
	//this._frame = $(container) || newElement('div');
	$extend(this,parameters);
	this.init();
};
XN.UI.multiFriendSelector.friends = null;
XN.UI.multiFriendSelector.prototype = $extend({},XN.UI.Element);
$extend(XN.UI.multiFriendSelector.prototype,{
//	label:null,
/**
 *  自定义生成的input的name属性
 */

	idInputName:'ids',
	nameInputName:'names',

/**
 * 获取好友列表的url
 */

	getFriendsUrl:'/getfriendsajax.do?s=1&642876017-1190355567-1&u=642876017&include_me=1&lists=1&include_emails=1',

	
	selectedFriends:'',
	friendsC:null,
	inputC:null,
	_ready:false,
	_isLoading:false,
	
/**
 *  已经选中的好友数
 */

	getFriendsNum:function(){
		return this.friendsC.getElementsByTagName('a').length;
	},
	

	getIds:function(){
		var rt = [],a = this.friendsC.getElementsByTagName('a');
		for(var i = 0,j = a.length;i < j;i++){
			rt.push(a[i].uid + '');
		}
		return rt;
	},

/**
 * 已经选中好友的name
 */


	deSelectAll:function(){
		var ns = this.friendsC.getElementsByTagName('a');
		for(var i = 0,j = ns.length;i < j;i++){
			this.deSelectFriend(ns[i].uid);
			this.friendsC.removeChild(ns[i]);
		}
	},
	
	initContainer:function(){
		var tmp = [],c = this.frame,s = this;
		tmp.push('<div  class="tokenizer">');
		tmp.push('<span class="tokenizer_stretcher">^_^</span>');
		tmp.push('<span class="tab_stop"><input/></span>');
		tmp.push('<span class="tokenizer_input"><input type="text" /></span>');
		tmp.push('</div>');
		c.innerHTML = tmp.join('');
		c.onclick = this._frameOnclick.bind(this);
		this.input = c.getElementsByTagName('input')[1];
		this.friendsC = c.firstChild;
		this.tapStop = c.getElementsByTagName('span')[1];
		this.inputC = c.getElementsByTagName('span')[2];
		
		if(document.activeElement == this.input){
			if(s._ready)return;
			s.loadFriends();			
		}else{
			XN.EVENT.addEvent(this.input,'focus',function(){
				if(s._ready)return;
				s.loadFriends();
			},false);			
		}
	},

	_frameOnclick:function(){
		this.input.focus();
	},

/**
 * 选中一个好友
 */
	selectFriend:function(o){
		if((new RegExp('#' + o.id + '#')).test(this.selectedFriends)){
			return;
		}
		this.selectedFriends += '#' + o.id + '#';
		this.friendsC.insertBefore(this.newFriendC(o.id,o.name),this.inputC);
	},

/**
 * 反选一个好友
 */

	deSelectFriend:function(id){
		this.selectedFriends = this.selectedFriends.replace('#' + id + '#','');
	},

	newFriendC:function(uid,uname){
		var a = $element('a'),x;
		//<a class="token" href="#" tabindex="-1">
//		a.aid = id;
		a.uid = uid;
		a.uname = uname;
//		a.unet = unet;
		a.href = '#';
		a.className = 'token';
		a.tabindex = '-1';
		a.innerHTML = '<span>\n<span>\n<span>\n<span>\n<input type=\"hidden\" value=\"' + uid + '\" name=\"' + this.idInputName + '\" />\n<input type=\"hidden\" value=\"' + uname + '\" name=\"' + this.nameInputName + '\" />\n' + uname + '<span class=\"x\" onmouseout=\"this.className=\'x\'\" onmouseover=\"this.className=\'x_hover\'\" >\n</span>\n</span>\n</span>\n</span>\n</span>';
		x = a.getElementsByTagName('span')[4];
		x.multiFriendSelector = this;
		x.uid = uid;
		x.onclick = function(e){
			e = e || window.event;
			XN.EVENT.stop(e);
			var s = this.multiFriendSelector;
			s.friendsC.removeChild(this.parentNode.parentNode.parentNode.parentNode.parentNode);
			s.deSelectFriend(this.uid);
		}
		return a;
	},

/**
 * 加载好友
 */	
 
	loadFriends:XN.UI.friendSelector.prototype.loadFriends,
	onready:function(){
		var s = this;
		var ds = new XN.UI.DS_Array({
			data:XN.UI.multiFriendSelector.friends,
			searchKey:'name'
		});
		this.autoComplete = new XN.UI.autoCompleteMenu({
			DS:ds,
			input:this.input,
			autoSelectFirst:true,
			noResult:(this.noResult || null),
			inputTip:(this.inputTip || null),
			noInputTip:this.noInputTip
		});
		this.autoComplete.buildMenu = function(r){
			return '<p>' + r.name + '</p>';
		}
		this.autoComplete.setMenuWidth(129);
		this.autoComplete.addEvent('keydown',function(e){
			s._onInputKeydown(e);
		});
		this.autoComplete.addEvent('select',function(r){
			this.input.value = '';
			s.selectFriend({
					'id':r.id,
					'name':r.name,
					'net':r.net,
					'head':r.head,
					'profile':r.profile
			});
		});
		this.autoComplete.fireEvent('focus');
	},
	_onInputKeydown:function(event){
		var i = this.inputC,pa = i.previousSibling,na = i.nextSibling,input = this.input;
		if(event.keyCode == 8 && this.input.value ==''){
				if(pa){
					this.friendsC.removeChild(pa);
					this.deSelectFriend(pa.aid);
				}
				return true;
		}else if(event.keyCode == 37 && this.input.value == ''){
			if(pa && pa.tagName.toLowerCase() == 'a'){
				i.parentNode.removeChild(i);
				this.friendsC.insertBefore(i,pa);
				setTimeout(function(){input.focus();},0);
			}
			return true;
		}else if(event.keyCode == 39 && this.input.value == ''){
			if(na && na.tagName.toLowerCase() == 'a'){
				i.parentNode.removeChild(i);
				XN.DOM.insertAfter(i,na);
				setTimeout(function(){input.focus();},0);
			}
			return true;
		}		
		return false;
	},
	
	init:function(){
		this.frame = $element('div');
		this.haveFather = false;
		this.initContainer();
	}
});

XN.UI.panel = function(parameters) {
	$extend(this.options,parameters);
	this.init();
};
XN.UI.panel.prototype = {
	//father	:null,
	width	:400,
	height	:null,
	X	:null,
	Y	:null,
	header	:null,
	body	 :null,
	footer	:null,

	frame	:null,
	container	:null,
	options:{},
	_fixElement:null,
	_table:null,
	init	:function() {
		var _frame,_table,_tbody,_tr,_td,_h,_span,_div,_div2,_iframe,ops = this.options;
		_frame = $element("div");
		_frame.style.position = "absolute";
		_frame.style.textAlign = "left";
		_frame.style.zIndex = 200008;
		this.frame = _frame;
		_table = $element("table");
		_table.style.width = "100%";
		_table.style.height = "100%";
		_table.className = "pop_dialog_table";
		this._table = _table;
		_tbody = $element("tbody");
		
		_tr = $element("tr");
		
		_td = $element("td");
		_td.className = "pop_topleft";
		_tr.appendChild(_td);
		
		_td = _td.cloneNode(false);
		_td.className = "pop_border";
		_tr.appendChild(_td);

		_td = _td.cloneNode(false);
		_td.className = "pop_topright";
		_tr.appendChild(_td);

		_tbody.appendChild(_tr);

		_tr = $element("tr");

		_td = $element("td");
		_td.className = "pop_border";
		_tr.appendChild(_td);
		
		_td = _td.cloneNode(false);
		this.container = _td;
		_td.className = "pop_content";
		_h = $element("h2");
		_span = $xElement('span');
		this.header = _span;
		
		_span.hide = function(){
			_h.hide();
		};
		_span.show = function(){
			_h.show();
		};
		
		
		_h.appendChild(_span);
		_td.appendChild(_h);

		_div = $element("div");
		_div.className = "dialog_content";

		_div2 = $xElement('div');
		this.body = _div2

		_div2.className = "dialog_body";
		_div.appendChild(_div2);

		_div2 = $xElement('div');
		this.footer = _div2;
		_div2.className = "dialog_buttons";
		_div.appendChild(_div2);
		_td.appendChild(_div);

		_tr.appendChild(_td);

		_td = $element("td");
		_td.className = "pop_border";
		_tr.appendChild(_td);

		_tbody.appendChild(_tr);

		_tr = $element("tr");

		_td = $element("td");
		_td.className = "pop_bottomleft";
		_tr.appendChild(_td);

		_td = _td.cloneNode(false);
		_td.className = "pop_border";
		_tr.appendChild(_td);

		_td = _td.cloneNode(false);
		_td.className = "pop_bottomright";
		_tr.appendChild(_td);
		

		_tbody.appendChild(_tr);

		_table.appendChild(_tbody);

		_frame.appendChild(_table);
		if(XN.BROWSER.IE6){
			this._iframe = _iframe = $element('iframe');
			_iframe.frameBorder = 0;
			_iframe.setStyle('position:absolute;border:0px;left:0px;top:0px;z-index:-1');
			_frame.appendChild(_iframe);
		}		

		this._fixElement = new XN.UI.fixPositionElement({id:_frame});

		this.frame.style.zIndex = 10000;//防止zindex值过高,而挡住菜单
		
		this.setWidth(ops.width || this.width);
		if(ops.height) {this.setHeight(ops.height);}

		if(ops.header)this.setHeader(ops.header);
		if(ops.body)this.setBody(ops.body);
		if(ops.footer)this.setFooter(ops.footer);

		if (ops.X) {
			this.setX(ops.X);
		} else {
			this.setX();
		}
		if (ops.Y) {
			this.setY(ops.Y);
		} else {
			this.setY(XN.EVENT.scrollTop() + 200);
		}
		
		if(ops.type){
			this.setType(ops.type);
		}
		this.options = null;
	},
	setType:function(t){
		t = t || 'normal';
		if(t == 'normal'){
			XN.Element.delClass(this._table,'errorDialog');
		}else if(t == 'error'){
			XN.Element.addClass(this._table,'errorDialog');
		}
	},
	setWidth	:function(w) {
		this.width = w;
		this.frame.style.width = w + "px";
		if(this.X === null){
			this.setX();
		}
	},
	setHeight	:function(h) {
		if(!h)return; //高度一般为默认的自动伸展,所以如果不想明确的设定高度可以传入一个false
		this.height = h;
		this.frame.style.height = h + "px";
	},
	resizeTo	:function(w,h) {
		this.setWidth(w);
		this.setHeight(h);
	},
	setOffsetX	:function(x) {
		this._fixElement.setOffsetX(x);
	},
	setOffsetY	:function(y) {
		this._fixElement.setOffsetY(y);
	},
	refresh:function(){
		this._fixElement.refresh();
	},
	setAlignType:function(t){
		this._fixElement.setAlignType(t);
	},
	setX:function(x){
		if(isUndefined(x) || !x){
			this.moveTo(parseInt(((this._fixElement.alignParent.offsetWidth - (this.width || this.frame.offsetWidth || 400)) / 2 ),10));
		}else{
			this.X = x;
			this.moveTo(x,null);
		}
	},
	setY:function(y){
		if(isUndefined(y) || !y){
			this.moveTo(null,XN.EVENT.scrollTop() + 200);
		}else{
			this.Y = y;
			this.moveTo(null,y);
		}
	},
	moveTo	:function(x,y) {
		this._fixElement.moveTo(x,y);
	},
	show	:function() {
		this.frame.show();
		if(this._iframe){
			this._iframe.style.width = this.frame.offsetWidth - 10 + 'px';
			this._iframe.style.height = this.frame.offsetHeight - 10 + 'px';
		}
	},
	hide	:function() {
		this.frame.hide();
	},
	clear:function(){
		this.setHeader(false);
		this.setBody(false);
		this.setFooter(false);
	},
	remove:function(){
		this.frame.parentNode.removeChild(this.frame);
	},
	setHeader	 :function(h) {
		if(h && h !== ''){
			this.header.addChild(h);
		}else{
			this.header.innerHTML = '';
		}
	},
	setBody	:function(b) {
		if(b && b !== ''){
			this.body.addChild(b);
		}else{
			this.body.innerHTML = '';
		}
	},
	setFooter	:function(f) {
		if(f && f !== ''){
			this.footer.addChild(f);
		}else{
			this.footer.innerHTML = '';
		}
	},
	setIndex:function(i){
		this.frame.style.zIndex = i;
	}
};