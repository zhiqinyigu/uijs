if(XN.FORM)XN.FORM = null;
XN.Form = XN.FORM = {
	fillWithJSON:function(form,json) {
			form = $(form);
			var a = '';
			eval('(a='+json +')');
			XN.FORM.fillWithArray(form,a);
	},
	fillWithArray:function(form,a){
		form = $(form);
		for (var p in a){
			XN.FORM.Element.setValue(p,a[p],form);
		}
	},
	setValue:function(element,value){
		return XN.FORM.Element.setValue(element,value);
	},
	getValue:function(element){
		return XN.FORM.Element.getValue(element);
	},
	serialize:function(form,type) {
		return this.serializeElements(this.getElements(form),type || 'string');
	},
	serializeElements: function(elements, type,encode) {

		type = type || 'array';
		if(isUndefined(encode)){
			encode = false;
		} 
		var data = [],_key,_value;
		for (var i = 0,j = elements.length;i < j;i++){
			if (!elements[i].disabled && elements[i].name){
				_key = elements[i].name;
				_value = encode ? encodeURIComponent(XN.FORM.Element.getValue(elements[i])) : XN.FORM.Element.getValue(elements[i]);
				if (_value !== null){
					if (_key in data){
						if (!isArray(data[_key])) {data[_key] = [data[_key]];}
						data[_key].push(_value);
					}else{
						data[_key] = _value;
					}
				}
			}
		}
		if (type == 'array'){
			return data;
		}else if (type == 'string'){
			return XN.ARRAY.toQueryString(data);
		}else if(type == 'hash'){
			var tmp = {};
			for(var p in data){
				if(!isFunction(data[p])){
					tmp[p] = data[p];
				}
			}
			return tmp;
		}
		//return options.hash ? data : Object.toQueryString(data);
	},
	getElements: function(form) {
		form = $(form);
		var elements = [];
		var all = form.getElementsByTagName('*');
		for (var i = 0,j = all.length;i < j;i++ ){
			if (!isUndefined(XN.FORM.Element.Serializers[all[i].tagName.toLowerCase()])){
				elements.push(all[i]);
			}
		}

	return elements;
	}

};

$F = function(id,type){
	var el = $(id);
	if(el.tagName.toLowerCase() == 'form'){
		return XN.FORM.serialize(el,type);
	}else{
		return XN.FORM.getValue(el);
	}
};

XN.FORM.checkPasswordStrength =  function(el,callBack){
	el = $(el);
	function getStrength(str){
		var score = 0;
		var l = str.length;
		if(l <= 4){
			score += 5;
		}else if(l >4 && l < 8){
			score += 10;
		}else if(l > 7){
			score += 25;
		}
		
		var nums = 0;
		var marks = 0;
		var caps = 0;
		var mins = 0;
		
		var tchar;
		for (var i = str.length - 1;i >= 0; i--){
			tchar = str.charCodeAt(i);
			if(tchar > 47 && tchar <58){
				nums ++;
			}else if(tchar > 64 && tchar < 91){
				caps ++;
			}else if(tchar > 96 && tchar < 123){
				mins ++;
			}else if(tchar > 32 && tchar < 127){
				marks ++;
			}
		}
		
		if(caps && mins){
			score += 20;
		}else if((caps && !mins) || (mins && !caps)){
			score += 10;
		}else{
			score += 0;
		}
		
		if(nums > 2){
			score += 20;
		}else if(nums > 0 && nums < 3){
			score += 10;
		}else{
			score += 0;
		}
		
		if(marks > 1){
			score += 25;
		}else if(marks == 1){
			score += 10;
		}else{
			score += 0;
		}
		
		if(caps && mins && nums && marks){
			score += 5;
		}else if((caps || mins) && nums && marks){
			score += 3;
		}else if((caps || mins) && nums){
			score += 2;
		}
		
		var strength;
		var level;
		if(score >= 90){
			strength = '非常安全';
			level = 5;
		}else if(score >=80){
			strength = '安全';
			level = 4;
		}else if(score >= 70){
			strength = '非常强';
			level = 3;
		}else if(score >= 60){
			strength = '强';
			level = 3;
		}else if(score >= 50){
			strength = '一般';
			level = 2;
		}else if(score >= 25){
			strength = '弱';
			level = 1;
		}else if(score >= 0){
			strength = '非常弱';
			level = 1;
		}
		return {"level":level,"score":score,"strength":strength};
	}
	XN.EVENT.addEvent(el,'focus',function(){
		callBack(getStrength(el.value));
	},false);
	XN.EVENT.addEvent(el,'keyup',function(){
		callBack(getStrength(el.value));
	},false);
};

XN.FORM.richTextEditor = function(mode,id){
	this.mode = mode;
	this.id = id;
	this.init();
};
XN.FORM.richTextEditor.prototype = {
	mode:null,
	id:null,
	init	:function() {
		if(this.mode == "advanced"){
			tinyMCE.init({
				theme : "advanced",
				mode : "exact",
				width : "618",
				height:"450",
				elements:this.id,
				language : "zh_cn",
				plugins : "safari,emotions,media",//,inlinepopups",
				theme_advanced_buttons1:'bold,italic,underline,|,forecolor,backcolor,emotions,|,image,media,changeMode',
				theme_advanced_buttons2 : "fontselect,fontsizeselect,removeformat,justifyleft,justifycenter,bullist,numlist,link,unlink",
				theme_advanced_buttons3 : "",
				theme_advanced_toolbar_location : "top",
				theme_advanced_toolbar_align : "left",
				theme_advanced_path : false,
				theme_advanced_statusbar_location : "bottom",
				theme_advanced_resizing : true,
				theme_advanced_resize_horizontal : false,
				theme_advanced_resizing_use_cookie : 1,
				theme_advanced_more_colors : false,
				theme_advanced_font_sizes : '3,4,5,6,7',
				theme_advanced_fonts:'楷体_GB2312=楷体_GB2312;黑体=黑体;隶书=隶书;Times New Roman=Times New Roman;Arial=Arial;',
				invalid_elements : "applet,base,basefont,bgsound,blink,body,embed,frame,frameset,head,html,ilayer,iframe,link,meta,object,script,style",
				custom_undo_redo : false
			});
		}else if(mode == "simple"){
			tinyMCE.init({
			});
		}
	},
	save:function(){
		tinyMCE.get(this.id).save();
	},
	focus	:function() {
		tinyMCE.execCommand('mceFocus',false,this.id);
	},
	resizeTo	:function(w,h) {
		tinyMCE.get(this.id).theme.resizeTo(w,h);
	},
	resizeBy	:function(dw,dh) {
		tinyMCE.get(this.id).theme.resizeBy(dw,dh);
	},
	show	 :function() {
		tinyMCE.get(this.id).show();
	},
	hide:function() {
		tinyMCE.get(this.id).hide();
	}
};


XN.FORM.inputShadow = null;
XN.FORM.inputMethods = {
	maxSize:9000,
	minSize:30,
	timer:null,
	countSize:function(show,max,showMax){
		var s = this;
		//throw new Error('fsdfs');
		show = $(show);
		max = max || 999999;
		if(isUndefined(showMax)){
			showMax = true;
		}
		var el = this.element;
		
		function update(){
			show.innerHTML = el.value.length  + (showMax ? '/' +((max == 999999) ? '' : max) : '');
		}
		
		update();
		
		XN.EVENT.addEvent(this.element,'focus',update);
		
		XN.EVENT.addEvent(this.element,'keyup',function(){
			setTimeout(function(){
				var v = el.value;
				if(v.length >= max){
					el.value = v.substr(0,max);
					XN.Element.addClass(show,'full');
				}else{
					XN.Element.delClass(show,'full');
				}
				update();
			},0);
		},false);
		return this;
	},
	setDefaultValue:function(v){
		var el = this.element;
		v = v || el.value;
		if(document.activeElement == this.element){
				el.value = '';
		}else{
				el.value = v;
		}
		el.style.color='#888';
		XN.EVENT.addEvent(el,'focus',function(){
			if(el.value == v){
				el.value = '';
				el.style.color='#333';
			}
		},false);
		XN.EVENT.addEvent(el,'blur',function(){
			if(el.value == ''){
				el.value = v;
				el.style.color='#888';
			}
		},false);
		return this;
	},
	focus:function(e){
		var el = this.element;
		if(el.value.length == 0){
			el.focus();
			return;
		}
		if(el.setSelectionRange){
			el.focus();
			el.setSelectionRange(el.value.length, el.value.length);
		}else if(el.createTextRange){
			var range = el.createTextRange();
			range.moveStart('character', el.value.length);
			range.collapse(true);
			range.select();
		}else{
			el.focus();
		}
	},
	onEnter:function(callBack){
		var el = this.element;
		var isTextArea = el.tagName.toLowerCase() == 'textarea';
		XN.EVENT.addEvent(el,'keydown',function(e){
			e = e || window.event;
			if(e.keyCode == 13){
				if(isTextArea && !e.ctrlKey)return false;
				callBack(el);
				return false;
			}
		},false);
		return this;
	},
	onEsc:function(callBack){
		var el = this.element;
		XN.EVENT.addEvent(el,'keydown',function(e){
			e = e || window.event;
			if(e.keyCode == 27){
				callBack(el);
				return false;
			}
		},false);
		return this;		
	},
	_autoResize:function(type,min,max){
		var s = this,el = this.element;
		this.minSize = min || this.minSize;
		this.maxSize = max || this.maxSize;
		this.type = type;
		if(XN.FORM.inputShadow === null){
			var d = $element('div');
			d.setStyle('position:absolute;left:-99999px;top:-99999px');
			document.body.appendChild(d);
			XN.FORM.inputShadow = d;
		}
		this.shadow = XN.FORM.inputShadow;
		setTimeout(function(){
			if(min)return;
			s.minSize = type == 'width' ? el.offsetWidth : el.offsetHeight;
		},10);
		el.style.overflow = 'hidden';
		
		if(XN.BROWSER.IE){
			el.style.fontSize = '12px';
			el.style.fontFamily = "'lucida grande',tahoma,verdana,arial,simsun,sans-serif";
		}
		XN.EVENT.addEvent(el,'focus',function(){
			s.timer = setInterval(s.resize.bind(s),200);
		});
		XN.EVENT.addEvent(el,'blur',function(){
			clearInterval(s.timer);
			s.timer = null;
		});
	},
	resize:function(event){
		//if(event.type !='onchange' && event.keyCode !== 8 && event.keyCode !== 13)return;
//		if(event.keyCode){
//			if(event.keyCode !== 8 && event.keyCode !== 13 && event.keyCode !== 46)return;
//		}
		var el = this.element,sh = this.shadow,oh,type = this.type;
		sh.style.fontSize = el.getStyle('fontSize');
		sh.style.fontFamily = el.getStyle('fontFamily');
		(type == 'width') ? sh.style.height = el.offsetHeight : sh.style.width = el.offsetWidth;
		sh.innerHTML = XN.STRING.escapeHTML(el.value).replace(/\r\n/mg,'<br>').replace(/\r/mg,'<br>').replace(/\n/mg,'<br>');
		
		(type == 'width') ? oh = sh.offsetWidth : oh = sh.offsetHeight + 27;

		if(oh > this.minSize && oh < this.maxSize){
			el.style[type] = oh + 'px';
		}else if(oh < this.minSize){
			el.style[type] = this.minSize + 'px';
		}else if(oh > this.maxSize){
			el.style[type] = this.maxSize + 'px';
		}
	}
};

XN.FORM.inputHelper = function(id){
	this.element = $(id);
};
XN.FORM.inputHelper.prototype = {
	autoResize:function(min,max){
		this._autoResize('width',min,max);
		return this;
	}
};

$extend(XN.FORM.inputHelper.prototype,XN.FORM.inputMethods);


XN.FORM.textAreaHelper = function(id){
	this.element = $(id);
};
XN.FORM.textAreaHelper.prototype = {
	element:null,
	autoResize:function(min,max){
		this._autoResize('height',min,max);
		return this;
	}
};
$extend(XN.FORM.textAreaHelper.prototype,XN.FORM.inputMethods);

XN.FORM.Element = {
	getValue: function(element) {
		element = $(element);
		var method = element.tagName.toLowerCase();
		return XN.FORM.Element.Serializers[method](element);
	},
	setValue: function(element, value,form) {
		if(form){
			element = form[element];
			if((isElement(element) && element.tagName.toLowerCase() == 'select')){
				XN.FORM.Element.Serializers['select'](element, value);
			}else if(isElement(element)){
				XN.FORM.Element.Serializers[element.tagName.toLowerCase()](element, value);
			}else if(element[0]){
				var method = element[0].tagName.toLowerCase();
				for(var i = 0,j = element.length;i < j;i++){
					XN.FORM.Element.Serializers[method](element[i],(value[i] || value || ''));
				}
			}
		}else{
			element = $(element);
			var method = element.tagName.toLowerCase();
			XN.FORM.Element.Serializers[method](element, value);
			return element;
		}
	}
};
XN.FORM.Element.Serializers = {
	input: function(element, value) {
		switch (element.type.toLowerCase()) {
			case 'checkbox':
			case 'radio':
				return XN.FORM.Element.Serializers.inputSelector(element, value);
			default:
				return XN.FORM.Element.Serializers.textarea(element, value);
		}
	},
	inputSelector: function(element, value) {
		if (isUndefined(value)) {return element.checked ? element.value : null;}
		else {element.checked = !!value;}
	},

	textarea: function(element, value) {
		if (isUndefined(value)) {return element.value;}
		else {element.value = value;}
	},

	select: function(element, index) {
		if (isUndefined(index))
			{return this[element.type == 'select-one' ?'selectOne' : 'selectMany'](element);}
		else {
			var opt, value, single = !isArray(index);
			for (var i = 0, length = element.length; i < length; i++) {
				opt = element.options[i];
				value = this.optionValue(opt);
				if (single) {
					if (value == index) {
					opt.selected = true;
					return;
					}
				}
				else {opt.selected = XN.ARRAY.include(index,value);}
			}
		}
	},

	selectOne: function(element) {
		var index = element.selectedIndex;
		return index >= 0 ? this.optionValue(element.options[index]) : null;
	},

	selectMany: function(element) {
		var values = [], length = element.length;
		if (!length) {return null;}

		for (var i = 0; i < length; i++) {
			var opt = element.options[i];
			if (opt.selected) {values.push(this.optionValue(opt));}
		}
		return values;
	},

	optionValue: function(opt) {
    // extend element because hasAttribute may not be native
		//return Element.extend(opt).hasAttribute('value') ? opt.value : opt.text;
		return opt.value || opt.text;
	}
};

XN.FORM.tipMethods = {
	alert:function(s,el){
		XN.DO.alert(s,'提示');
	},
	div:function(s,el){
		el.innerHTML = s;
		XN.Element.show(el);
	},
	tip:function(s,el){
		var tip;
		if(!this.tipElement){
			tip = this.tipElement = new XN.UI.fixPositionElement({
				tagName:'div',
				alignType:'2-1',
				offsetY:-10,
				offsetX:170
			});
		}else{
			tip = this.tipElement;
		}
		
		if(XN.FORM.alertMethods.tipElement && XN.FORM.alertMethods.tipElement.isShow){
			return;
		}
		tip.setContent('<div>' +
'										<div class="regbox-t" style="width: 25em;">' +
'											<div class="box-outer">' +
'												<div class="box-inner">' + s + '</div>' +
'											</div>' +
'										</div>' +
'									</div>');
	tip.moveTo(el);
		try{
			$(el.name + '_err').hide();
		}catch(e){}
	}
};

XN.FORM.alertMethods = {
	alert:function(s,el){
		XN.DO.alert(s,'出错提示','error');
	},
	div:function(s,el){
		el.innerHTML = s;
		XN.Element.show(el);
	},
	tip:function(s,el){
		var tip;
		if(!this.tipElement){
			tip = this.tipElement = new XN.UI.fixPositionElement({
				tagName:'div',
				alignType:'2-1',
				offsetY:-10,
				offsetX:170
			});
			tip.hide();
		}else{
			tip = this.tipElement;
		}	
			tip.setContent('<div>' +
'										<div class="regbox" style="width: 25em;">' +
'											<div class="box-outer">' +
'												<div class="box-inner">' + s + '</div>' +
'											</div>' +
'										</div>' +
'									</div>');
		tip.moveTo(el);
		try{
			$(el.name + '_err').show();
			$(el.name + '_err').delClass('hide');
		}catch(e){}
	}
};

XN.FORM._helpTip = null;
XN.FORM._errorTip = null;
XN.FORM.autoChecker = function(ops){
	var s = this;
	this.form = $(ops.id);
	if(this.form.autoChecker)return;
	this.submitBar = $(ops.submit) || null;
	if(this.submitBar){
		this.submitBar.onclick = function(e){
			e = e || window.event;
			XN.EVENT.stop(e);
			s.submit();
			return false;
		}
	}
	this.checkers = [];
	var ck,els = XN.FORM.getElements(this.form),el;
	for(var i = 0,j = els.length;i < j;i++){
		el = els[i];
		if(!el.disabled && el.name && el.type != 'hidden'){
			var ck = new XN.FORM.elementChecker({
				id:els[i],
				checkMethod:(ops.checkMethod || 'auto'),
				alertMethod:(ops.alertMethod || 'alert'),
				alertDiv:(ops.alertDiv || null),
				tipDiv:(ops.tipDiv || null),
				tipMethod:(ops.tipMethod || 'div')
			});
			ck.form = this.form;
			ck.formControl = this;
			this.checkers.push(ck);
		}
	}
	this.form.autoChecker = true;
};
XN.FORM.autoChecker.prototype = {
	smartSubmit:false,
	submit:function(){
		if(this.isAllRight(true)){
			this.form.submit();
		}
	},
	enableSmartSubmit:function(){
		this.smartSubmit = true;
	},
	disableSmartSubmit:function(){
		this.smartSubmit = false;
	},
	isAllRight:function(showError){
		var rt = true,cks = this.checkers;
		for(var i = 0,j = cks.length;i < j;i++){
			cks[i].check(showError);
			if(!cks[i].passed){
				rt = false;
				break;
			}
		}
		return rt;
	},
	check:function(showError){
		//alert('eys');
		showError = showError || false;
		var cks = this.checkers;
		for(var i = cks.length - 1;i >= 0 ;i--){
			cks[i].check(showError);
		}
	},
	_onupdate:function(){
		if(this.smartSubmit){
			if(this.submitBar){
				var b = this.submitBar;
				if(this.isAllRight()){
					b.disabled = false;
					XN.Element.delClass(b,'gray');
				}else{
					b.disabled = true;
					XN.Element.addClass(b,'gray');
				}
			}
		}
		this.onupdate();
	},
	onupdate:function(){

	}
};
XN.FORM.elementChecker = function(parameters){
	this.options = parameters;
	this.checkers = [];
	this.params = [];
	//$extend(this.options,parameters);
	this.init();
};
XN.FORM.elementChecker.prototype = {
	element:null,
	form:null,
//	checkers:[],
//	params:[],
//	options:{},
	passed:true,
//	tip:null,
//	error:null,
	alertMethod:'alert',
	alertDiv:null,
	tipDiv:null,
	tipMethod:'div',
	submitBar:null,
	init:function(){
		var ops = this.options,el,s = this;

		this.element = el = $(ops.id);

		this.tip = el.getAttribute('tip');
		this.error = el.getAttribute('error');

		XN.EVENT.addEvent(el,'focus',function(){
			if(s.tip){
				s.showTip();
			}
		},false	);


		this.addRule(el.getAttribute('rule'));

		if(!ops.checkMethod || ops.checkMethod == 'auto'){
				XN.EVENT.addEvent(el,'blur',function(){
					try{
						XN.FORM.tipMethods.tipElement.hide();
					}catch(e){}
					s.check();
				},false);
		}

		this.tipMethod = ops.tipMethod;
		this.tipDiv = $(ops.tipDiv) || null;
		this.alertMethod = ops.alertMethod;
		this.alertDiv = $(ops.alertDiv) || null;
		this.options = null;
	},
	check:function(showError){
		try{
			$(this.element.name + '_ok').hide();
			$(this.element.name + '_err').hide();
		}catch(e){}
		if(this.checkers.length == 0)return;
		if(!this.form){
			this.searchForm();
		}
		if(isUndefined(showError)){
			showError = true;
		}
		var cks = this.checkers,pas = this.params,exes = XN.FORM.checkers;
		this.passed = true;
		var _errors = [],msg;
		if(this.error) _errors.push(this.error);
		for(var i = 0,j = cks.length;i < j;i++){
			if(!exes[cks[i]].exe.call(this,pas[i])){
				if(!this.error)_errors.push(exes[cks[i]].error);
				this.passed = false;
				break;
			}
		}
		if((!this.passed) && showError){
			if(_errors.length == 1){
				msg = '<p>' + _errors[0] + '</p>';
			}else{
				msg = '<ul><li>' + _errors.join('</li><li>') + '</li></ul>';
			}
			this.showError(msg);
		}else{
			try{
				$(this.element.name + '_err').hide();
				$(this.element.name + '_ok').show();
				$(this.element.name + '_ok').delClass('hide');
			}catch(e){}
			try{
				XN.FORM.alertMethods.tipElement.hide();
			}catch(e){}
			if(this.alertDiv)XN.Element.hide(this.alertDiv);
			if(this.tipDiv)XN.ELement.hide(this.tipDiv);
		}
		if(this.formControl){
			this.formControl._onupdate();
		}
	},
	addRule:function(str){
		if(!str)return;
		if(isFunction(str)){
			this.checkers.push(str);
			return;
		}
		var rs = str.split('#'),tmp;
		for(var i = 0,j = rs.length;i < j;i++){
			tmp = rs[i].split(':');
			this.checkers.push(tmp[0]);
			this.params.push(tmp[1]);
		}
	},
	searchForm:function(){
		var el = this.element.parentNode;
		while(el !== null && el !== document.body){
			if(el.tagName.toLowerCase() == 'from'){
				this.form =el;
				break;
			}
			el = el.parentNode;
		}
	},
	showTip:function(){
		var tip = this.tip;
		if(this.tipMethod == 'alert'){

			XN.FORM.tipMethods.alert(tip,this.element);

		}else if(this.tipMethod == 'div' && this.tipDiv !== null){

			XN.FORM.tipMethods.div(tip,this.tipDiv);

		}else if(this.tipMethod == 'tip'){

			XN.FORM.tipMethods.tip(tip,this.element);

		}else{
			$(this.element.name + '_err').hide();
			$(this.element.name + '_tip').show();
			$(this.element.name + '_tipMsg').innerHTML = tip;
		}
	},
	showError:function(e){
		if(this.alertMethod == 'alert'){

			XN.FORM.alertMethods.alert(e,this.element);

		}else if(this.alertMethod == 'div' && this.alertDiv !== null){

			XN.FORM.alertMethods.div(e,this.alertDiv);

		}else if(this.alertMethod == 'tip'){

			XN.FORM.alertMethods.tip(e,this.element);

		}else{
			try{
				var id = this.element.name;
				$(id + '_err').show();
				$(id + '_err').delClass('hide');
				$(id + '_tip').show();
				$(id + '_tipMsg').innerHTML = e;
			}catch(e){}
		}
	}
};

XN.FORM.checkers = {
	blank:{
		exe:function(p){
			var str = this.element.value;
			return !XN.STRING.isBlank(str);
		},
		error:'必填项不能为空'
	},
	email:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			return XN.STRING.isEmail(str);
		},
		error:'您输入的不是一个合法的 E-mail 地址'
	},
	phone:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			return XN.STRING.isPhone(str);
		},
		error:'您输入的不是一个合法的电话号码'
	},
	mobile:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			return XN.STRING.isMobile(str);
		},
		error:'您输入的不是一个合法的手机号码'
	},
	ip:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			return XN.STRING.isIp(str);
		},
		error:'您输入的不是一个合法的ip地址'
	},
	url:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			return XN.STRING.isUrl(str);
		},
		error:'您输入的不是一个合法的url'
	},
	num:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			return XN.STRING.isNum(str);
		},
		error:'您只能输入一个数字'
	},
	zip:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			return XN.STRING.isZip(str);
		},
		error:'您输入的不是一个合法的邮政编码'
	},
	en:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			return XN.STRING.isEN(str);
		},
		error:'您只能输入英文字母'
	},
	length:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			var tmp  = p.split(',');
			var min = parseInt(tmp[0]);
			var max = parseInt(tmp[1]);
			var l = str.length;
			if(l < min || l > max){
				XN.FORM.checkers.length.error = '您输入字符长度只能在' + min + '-' + max + '之间';
				return false;
			}
			return true;
		},
		error:''
	},
	file:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			var avs = p.split(',');
			var passed = false;
			for(var i = 0,j = avs.length;i < j;i++){
				if(XN.STRING.endsWith(str,'.' + avs[i])){
					passed = true;
					break;
				}
			}
			if(!passed){
				XN.FORM.checkers.file.error = '您只能提交' + p + '格式的文件';
			}
			return passed;
		},
		error:''
	},
	include:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			if(!XN.STRING.include(str,p)){
				XN.FORM.checkers.include.error = '您输入的字符必须包含' + p;
				return false;
			}
			return true;
		},
		error:''
	},
	startsWith:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			if(!XN.STRING.startsWith(str,p)){
				XN.FORM.checkers.startsWith.error = '您输入的字符只能以' + p + '开头';
				return false;
			}
			return true;
		},
		error:''
	},
	endsWith:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			if(!XN.STRING.endsWith(str,p)){
				XN.FORM.checkers.endsWith.error = '您输入的字符只能以' + p + '结尾';
				return false;
			}
			return true;
		},
		error:''
	},
	custom:{
		exe:function(p){
			try{
				return window[p](this.element);
			}catch(e){
			}
			return true;
		},
		error:''
	},
	compare:{
		exe:function(p){
			return (this.element.value == $(p).value);
		},
		error:''
	},
	sharelink:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			if(str.substr(0,7) != "http://" && str.substr(0,6) != "ftp://"){
				this.element.value = 'http://' + str;
				str = this.element.value;
			}
			if(!XN.STRING.isUrl(str)){
				XN.FORM.checkers.sharelink.error = '请您输入一个有效的链接';
				return false;
			}
			if(/xiaonei.com/.test(str)){
				XN.FORM.checkers.sharelink.error = '您必须输入一个站外链接';
				return false;
			}
			return true;
		},
		error:''
	},
	loginName:{
		exe:function(p){
			this.element.value = XN.STRING.trim(this.element.value);
			var str = this.element.value;
			if(!str)return true;
			var tmp = '';
			for(var i = 0,j = str.length;i < j;i++){
				var code = str.charCodeAt(i);
				if(code >= 65281 && code <= 65373){
					tmp += String.fromCharCode(code - 65248);
				}else{
					tmp += String.fromCharCode(code);
				}
			}
			tmp = tmp.replace(/·/,'@');
			tmp = tmp.replace(/[。|,|，|、]/g,'.');
			str = this.element.value = tmp;
			if(/@/.test(str)){
				if(XN.STRING.isEmail(str)){
					return true;
				}else{
					XN.FORM.checkers.loginName.error = 'E-mail 格式错误';
					return false;
				}
			}else{
				if(/^[\w@_.-]{3,50}$/.test(str)){
					return true;
				}else{
					XN.FORM.checkers.loginName.error = '帐号格式错误';
					return false;
				}
			}
		},
		error:'您必须输入一个用户名或者email地址'
	}
};

XN.FORM.userInfoAutoComplete = function(id,type){
	var action = {
		'elementaryschool':'/autocomplete_workplace.jsp',
		'juniorhighschool':'/autocomplete_juniorhighschool.jsp	',
		'workplace':'/autocomplete_workplace.jsp',
		'highschool':'/autocomplete_highschool.jsp',
		'allnetwork':'/autocomplete_all_network.jsp',
		'allSchool':'/autocomplete-school.jsp',
		'city':'/autocomplete-city.jsp',
		'college':'autocomplete_college.jsp'
	};
	var ds = new XN.UI.DS_XHR({
		url:action[type]
	});
	var at = this.at = new XN.UI.autoCompleteMenu({
		DS:ds,
		input:id
	});
	at.buildMenu = function(r){
		return '<p>' + r.name + '</p>';
	};
	at.addEvent('select',function(r){
		this.input.value = r.Name;
	});
};