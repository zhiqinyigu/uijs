/**
 * MI.ValidateNew
 * Author : xhlv@tencent.com
 * Datetime : 
 * Last Eidt: 
*/
MI.ValidateNew = function(o){ //Validate New For Register
	this.data = o;
	this.check = o.check; //Other Validate
	this.isAjax = o.isAjax == undefined ? 1 : o.isAjax; //Submit By Ajax
	this._body  = $(o.id); //Form
	if (!this._body){
		return this;
	}
	
	var Self = this,msgFunction,index = 0,input,target;
	if (UI.isFunction(o.messages)) {
		msgFunction = 1;
	}

	for (var i in Self.data.inputs) {
		input = Self.data.inputs[i];
		target = input.target = $(i); //Target Dom
		if (target) {
			if (msgFunction) {
				input.message = o.messages(o.inputs[i].target);
			}
			else {
				input.message = o.messages[index];
				index++;
			}
			UI.A(input.message,'rel',input.message.innerHTML || '');
			UI.hide(input.message);
			input.ico = UI.html('<b class="pass" style="display:none"></b>')[0];
			UI.after(input.ico,input.target);
	
			//Event
			target.onfocus = function(){
				UI.show(Self.data.inputs[this.id].message);
				this.ico = 0;
				this.focused = 1;
			};
			target.onblur = function(){
				var message = Self.data.inputs[this.id].message;
				if (!UI.hasClass(message,'error')) {
					UI.hide(message);
				}
				else {
					UI.show(message);
				}
				this.blured = 1; //If Need To Check
				this.ico = 1; //If Need To Add Ico
				this.focused = 0;
			};
			UI.EA(target,'blur',validate);
			UI.EA(target,'keyup',reset);
		}
	}

	UI.EA(Self._body,'submit',function(e){
		var E = UI.E(e);
		if (Self.isAjax) {
			E.prevent();
		}
		submit();
	});
	var submit = function(){
		var dataPost = {},target,tmp;
		Self.success = 1; //No Error
		if (Self.check && Self.check()) {
			return;
		}
		for (var i in Self.data.inputs) { //Validate All Input
			validate(i);
		}
		//Submit
		if (Self.success && Self.isAjax) {
			for (var i in Self.data.inputs) {
				target = $(i);
				if (target.type == 'radio') {
					tmp = $$(target.parentNode.parentNode,'input[type=radio]');
					for (var j = 0,num = tmp.length;j < num;j++) {
						if (tmp[j].checked) {
							dataPost[i] = tmp[j].value;
							break;
						}
					}
				}
				else {
					dataPost[i] = $(i).value;
				}
			}
			post();
		}
		else if (!Self.success) {
			//E.prevent();
		}
		function post(){
			if (Self.xhr) {
				return;
			}
			Self.xhr = UI.ajax({url:UI.A(Self._body,'action'),data:dataPost,success:function(data){
				//data = {result:0,msg:'用户未登陆',info:[{result:0,msg:'正确'},{result:0,msg:'正确'}]};
				data = MI.json(data);
				var index = 0,success = 1,input,errorNum = 0;
				if (Self.data.fail) {
					Self.data.fail(data);
				}
				if (data.result == 0) {
					if (data.info) {
						for (var i in Self.data.inputs) {
							if (!data.info[index]) {
								continue;
							}
							input = Self.data.inputs[i];
							if(data.info[index]) {
								if (data.info[index].result == 0) {
									if (!input.removed) {
										if (input.success) {
											Self.showMessage(input,input.success,1);
										}
										else Self.hideMessage(input);
										if (input.remove) {
											UI.A(input.target,'disabled','disabled');
											input.removed = 1;
										}
									}
								}
								else if(data.info[index].result < 0) {
									if (errorNum == 0) {
										input.target.focus();
									}
									Self.showMessage(input,data.info[index].msg);
									MI.Bos('btnRegError');
									success = 0;
									errorNum++;
								}
							}
							index++;
						}
					}
					if (success && Self.data.success) {
						Self.data.success(data);
					}
				}
				else if (MI.code.check(data.result)) {
					MI.code.show({msg:data.msg,code:data.info,call:function(code){
						dataPost.veriCode = code;
						post();
					}});
				}
				else if (data.msg){
					MI.alert(data.msg);
				}
				Self.xhr = null;
			}});
		}
	}
	Self.submit = function(){
		submit();
	}
	function validate(e){
		var E,i,input,value,valueReplaced,error = 0,isSubmit = 0,url = {};
		if (UI.isString(e)) {
			i = e;
			isSubmit = 1;
		}
		else {
			E = UI.E(e);
			i = UI.A(E.target,'name');
		}
		input = Self.data.inputs[i],target = input.target,value = target.value;
		if (input.removed) { //Don't Validate Removed Input
			return;
		}
		if (input.replace) {
			valueReplaced = input.replace(value);
			if (value != valueReplaced) {
				target.value = valueReplaced;
			}
		}
		if (isSubmit ? 1 : target.blured) {
			error = input.rule ? input.rule(target.value) : 0;
			if (error == ''){
				UI.hide(input.ico);
			}
			else if (!error) { //Not Error
				if (!input.url || (input.url && target.focused) ) {
					Self.hideMessage(input);
					target.error = 0;
				}
			}
			else {
				Self.showMessage(input,error);
				target.error = 1;
				Self.success = 0;
			}
		}
		//Ajax Check
		url[i] = value;
		url.r = MI.random();
		if (!isSubmit && !error && input.url && target.blured && E.type == 'blur' && UI.trim(value)) {
			UI.get(UI.isFunction(input.url) ? input.url() : input.url,url,function(data){
				data = MI.json(data);
				if (data.result == 0) {
					Self.hideMessage(input);
				}
				else {
					Self.showMessage(input,data.msg);
					Self.success = 0;
					MI.Bos('btnRegError');
				}
				if (input.urlCall) {
					input.urlCall(data);
				}
			});
		}
	};
	function reset(e){
		var E = UI.E(e),i = UI.A(E.target,'name'),input = Self.data.inputs[i];
		Self.hideMessage(input);
	}
}
MI.ValidateNew.prototype = {
	xhr : null,
	showMessage : function(o,text,success){
		if (!text) {
			text = UI.A(o.message,'rel');
		}
		//o.message.innerHTML = '<div class="SA"><em>◆</em><span>◆</span></div>' + text;
		var rel = UI.A(o.message,'rel'),
			errorClassName = 'error';
		o.message.innerHTML = rel;
		if (!rel.hasString(text)){
			o.message.innerHTML = text;
		}
		else {
			errorClassName = 'idError';
			UI.each(o.message.childNodes,function(li){
				if (UI.trim(li.innerHTML) == text){
					UI.removeClass(li,'cNote');
				}
			});
		}
		UI.show(o.message);
		UI.addClass(o.message.parentNode,success ? '' : errorClassName);
		UI.addClass(o.message,success ? 'success' : errorClassName);
		if (!o.noIco && success) {
			UI.show(o.ico);
		}
		else UI.hide(o.ico);
	},
	hideMessage : function(o){
		o.message.innerHTML = UI.A(o.message,'rel') || '';
		UI.removeClass(o.message.parentNode,'error');
		UI.removeClass(o.message.parentNode,'idError');
		UI.removeClass(o.message,'error');
		UI.removeClass(o.message,'idError');
		UI.removeClass(o.message,'success');
		if (!o.noIco && o.target.ico) {
			UI.show(o.ico);
			UI.hide(o.message);
		}
	}
}