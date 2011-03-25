/**
 * MI.RelateSelect
 * Author : xhlv@tencent.com
 * Datetime : 
 * Last Eidt: 
*/
MI.RelateSelect = function(o){ //RelateSelect
	var Self = this,select,selectFirst,option,value;
	Self._body = UI.isString(o.id) ? $(o.id) : o.id;
	select = $$(Self._body,'select');
	Self._first = select[0];
	Self._second = select[1];
	Self._third = select[2];
	Self.data = o.data;
	if (o.tips) {
		Self.tips = o.tips;
	}

	Self.build();

	if (Self.tips[0]) {
		option = UI.DC('option');
		option.innerHTML = Self.tips[0];
		option.value = '';
		UI.prepend(option,this._first);
	}

	//Event
	Self._first.onchange = function(){
		Self.first(Self.index(this));
	}
	Self._second.onchange = function(){
		Self.second(Self.index(this));
	}
}
MI.RelateSelect.prototype = {
	tips : [],
	build : function(data){
		var Self = this,select,selectFirst,option,value;
		if (data) {
			Self.data = data;
		}
		Self._first.innerHTML = Self._second.innerHTML = Self._second.innerHTML = '';
		for (var i in Self.data) {
			if (UI.isString(i)){
				option = UI.DC('option'),value = i.split(',');
				option.innerHTML = value[0];
				option.value = value[1];
				UI.append(option,this._first);
	
				if (!selectFirst) {
					selectFirst = value;
				}
			}
		}
		//Self.first(selectFirst);
	},
	first : function(index) {
		if (!this.data[index]) {
			UI.hide(this._second);
			UI.hide(this._third);
			return;
		}
		var option,value,secondEmpty,secondTop,third;
		this._second.innerHTML = this._third.innerHTML = '';
		for (var i in this.data[index]) {
			if (!secondTop) {
				secondTop = i;
			}
			if (UI.isString(i)){
				option = UI.DC('option'),value = i.split(',');
				option.innerHTML = value[0];
				option.value = value[1];
				if (value[1]) {
					UI.append(option,this._second);
				}
			}
		}
		if (!this._second.innerHTML) {
			UI.hide(this._second);
			this._second.value = '';
			secondEmpty = 1;
		}
		else {
			UI.show(this._second);
		}
		third = this.data[index][secondEmpty ? ',' : secondTop];
		for (var i in third) {
			if (UI.isString(third[i])){
				option = UI.DC('option'),value = third[i].split(',');
				option.innerHTML = value[0];
				option.value = value[1];
				UI.append(option,this._third);
			}
		}
		if (!this._third.innerHTML) {
			UI.hide(this._third);
			this._third.value = '';
		}
		else {
			UI.show(this._third);
		}
		if (this.tips[2]) {
			option = UI.DC('option');
			option.value = '';
			option.innerHTML = this.tips[2];
			UI.prepend(option,this._third);
		}
		if (this.tips[1]) {
			option = UI.DC('option');
			option.value = '';
			option.innerHTML = this.tips[1];
			UI.prepend(option,this._second);
		}
	},
	second : function(index) {
		if (this.data[this.index(this._first)]) {
			var option,value,third = this.data[this.index(this._first)][index];
			if (third && third.length) {
				this._third.innerHTML = '';
				for (var i = 0,num = third.length;i < num;i++) {
					if (UI.isString(third[i])){
						option = UI.DC('option'),value = third[i].split(',');
						option.innerHTML = value[0];
						option.value = value[1];
						UI.append(option,this._third);
					}
				}
				UI.show(this._third);
				if (this.tips[2]) {
					option = UI.DC('option');
					option.value = '';
					option.innerHTML = this.tips[2];
					UI.prepend(option,this._third);
				}
			}
			else {
				UI.hide(this._third);
				this._third.value = '';
			}
			UI.show(this._second);
		}
		else {
			UI.hide(this._second);
			this._second.value = '';
		}
	},
	index : function(el){
		return el.childNodes[el.selectedIndex].innerHTML + ',' + el.value;
	},
	set : function(el,name){
		if (name) {
			UI.each(el.childNodes,function(o){
				if (UI.isObject(o)) {
					var select = o.innerHTML == name ? 'selected' : '';
					UI.A(o,'selected',select);
					o.selected = select;
				}
			});
		}
	}
}