//oType = new UI.Select({name:'oType',id:'select_type'});
UI.select = function(n) { //UI.select();	//Set Style For Select:<span class="cmn_select"><select/></span>
	this.Select.build(n);
};
UI.Select = function(o) {
	this._body = UI.G(o.id);
	this._input = UI.GT(this._body,'input')[0];
	this._select = UI.GT(this._body,'select')[0];
	this._ul = UI.DC('ul');
	
	this._input.value = this._select.options[this._select.selectedIndex].innerHTML;
	this.cur = this._select.selectedIndex;

	var li = [];
	for (var i=0;i<this._select.options.length;i++) {
		var text = this._select.options[i].innerHTML;
		li[i] = '<li' + ( text==this._input.value ? ' class="on"' : '' ) + ' onmouseover="UI.addClass(this,\'hover\')" onmouseout="UI.removeClass(this,\'hover\')" onclick="' + o.name + '.select(this.innerHTML,' + i + ');UI.addClass(this,\'on\')" title="' + text + '">' + text + '</li>'
	}
	this._ul.innerHTML = li.join('');
	this._body.appendChild(this._ul);
	this._li = UI.GT(this._ul,'li');

	if (UI.Browser.ie6) {
		this._cover = UI.DC('div');
		this._cover.style.cssText = 'position:absolute;';
		this._cover.innerHTML = '<iframe src="javascript:false;" style="position:absolute;z-index:-1;"></iframe>';
		this._body.appendChild(this._cover);
		var iframe = UI.GT(this._cover,'iframe')[0];
	}

	UI.EA(this._body,'click','UI.toggleClass(' + o.name + '._body,"on");' + o.name + '.iframe();');
	UI.EA(document,'click','e=window.event||e;if(UI.ET(e)!=' + o.name + '._input) UI.removeClass(' + o.name + '._body,"on");');

	this.select = function(n,i) {
		this._input.value = n;
		UI.A(this._select.options[this.cur],'selected','');
		UI.removeClass(this._li[this.cur],'on');
		UI.A(this._select.options[i],'selected','selected');
		this._select.value = this._select.options[i].value;
		this.cur = i;
	}
	this.iframe = function() {
		if (UI.Browser.ie6) {
			iframe.style.width = this._ul.offsetWidth+'px';
			iframe.style.height = this._ul.offsetHeight+'px';
			this._cover.style.top = UI.C(this._ul,'top');
			this._cover.style.left = UI.C(this._ul,'left');
		}
	}
};