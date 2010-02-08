//var dialog = new UI.Dialog({name:'dialog',title:'',url:'',width:200,height:200,call:function(){},close:true,move:true,resize:true});
UI.Dialog = function(o) {
	//Default Size
	size.call(this,o);

	//Dom
	this._body = UI.DC('div');
	this._body.className = 'dialog2';
	this._body.innerHTML = (UI.B.ie6 ? '<iframe src="javascript:false;" class="cover_select"></iframe>' : '') + '<div class="bg"></div><div style="margin:-' + o.height/2 + 'px 0 0 -' + o.width/2 + 'px;width:' + o.width + 'px;height:' + o.height + 'px;" class="wrap"><div class="title">' + o.title + '</div><a class="close ' + (o.close!=false ? '' : 'hide') + '" href="javascript:void ' + o.name + '.hide();" onfocus="this.blur();" title="Close" tabindex="-1"></a><div class="cont"><div class="loading"><span>loading...</span></div><iframe allowtransparency="true" src="' + (o.url ? o.url : 'javascript:false') + '" style="height:' + o.height + 'px;display:none;" scrolling="auto" frameborder="no" onload="if(this.contentWindow.document.body.innerHTML == \'false\'){return}var Self = ' + o.name + ' || top.' + o.name + ';if (UI.A(this,\'src\') != \'undefined\') { this.style.display=\'block\';this.previousSibling.style.display=\'none\';UI.EA(' + o.name + '._iframe.contentWindow.document,\'keyup\',Self.key); }" class="iframe"></iframe><div class="data"></div></div><b class="cor_1"></b><b class="cor_2"></b><b class="cor_3"></b><b class="cor_4"></b><div class="resize"></div></div><div class="border"></div>';
	this._bg = UI.GC(this._body,'div.bg')[0];
	this._wrap = UI.GC(this._body,'div.wrap')[0];
	this._title = UI.GC(this._body,'div.title')[0];
	this._close = UI.GC(this._body,'a.close')[0];
	this._cont = UI.GC(this._body,'div.cont')[0];
	this._iframe = UI.GC(this._body,'iframe.iframe')[0];
	this._data = UI.GC(this._body,'div.data')[0];
	this._resize = UI.GC(this._body,'div.resize')[0];
	this._border = UI.GC(this._body,'div.border')[0];
	this._loading = UI.GC(this._body,'div.loading')[0];
	
	//Status
	this.checkStaus = function(o) {
		if (!this._titleHeight) {
			this._titleHeight = this._title.offsetHeight;
			if (UI.B.ie && document.compatMode == 'CSS1Compat') { //For Standards Mode
				var padding = parseInt(UI.C(this._title,'paddingTop')) + parseInt(UI.C(this._title,'paddingBottom'))
				this._titleHeight -= padding;
				this._title.style.height = this._titleHeight - padding + 'px';
			}
		}
		try{
			this._cont.style.height = this._iframe.style.height = o.height - this._titleHeight + 'px';
		}catch(e){};
		if (o.move == false) {
			this.__move = false;
			this._title.style.cursor = 'default';
		}
		else if (this.__move == undefined || o.move) {
			this.__move = true;
			this._title.style.cursor = '';
		}
		if (o.resize == false) {
			this.__resize = false;
			this._resize.style.display = 'none';
		}
		else if (this.__resize == undefined || o.resize) {
			this.__resize = true;
			this._resize.style.display = '';
		}
		if (o.html) {
			UI.hide(this._loading);
		}
	}
	this.__name = o.name;
	this._cache = []; //Dialog Cache
	this._append = false;
	this.autoHeightMax = 420;
	this.__close = o.close == undefined ? true : o.close;

	var Self = this;

	if (o.url) {
		UI.EA(window,'load',function(){
			document.body.appendChild(Self._body);
			Self._append = true;
			Self.__display = true;
			Self.checkStaus.call(Self,o);
			Self._cache.push(o);
		});
	}

	//Event
	var wrap = this._wrap,border = this._border,name = o.name;
	this.key = function(e) {
		switch(UI.E(e).key) {
			case 27:
				if (window[name].__display) window[name].hide();
				break;
		}
	};
	this.resizeBg = function(){
		if (Self.__display) {
			if (UI.B.ie) Self._bg.style.cssText += ';width:100%;';
			Self._body.style.height = UI.windowHeight();
			Self.delay = setTimeout(function(){
				var h_page = UI.pageHeight(),h_window = UI.windowHeight();
				Self._bg.style.cssText += ';width:' + UI.pageWidth() + 'px;height:' + (h_page < h_window ? h_window : h_page) + 'px;';
			},0);
		}
	};
	UI.EA(document,'keyup',this.key);
	UI.EA(window,'resize',this.resizeBg);
	this._title.onmousedown = function(e) { //Move
		if (window[name].__move) {
			var event = window.event || e;
			var _x = event.clientX - parseInt(wrap.style.marginLeft);
			var _y = event.clientY - parseInt(wrap.style.marginTop);
			var w = UI.windowWidth(),h = UI.windowHeight(); //Kill Bug
			if(event.preventDefault){
				event.preventDefault();
			}
			UI.addClass(wrap,'move');
			document.onmousemove = function(e) {
				var event = window.event || e;
				var E = UI.E(e);
				if (!UI.B.ie && (E.x < 0 || E.y < 0 || E.x > w || E.y > h)) return false;
				wrap.style.marginTop = event.clientY - _y + 'px';
				wrap.style.marginLeft = event.clientX - _x + 'px';
				return false;
			}
			document.onmouseup = function() {
				this.onmousemove = null;
				document.onmouseup = null;
				UI.removeClass(wrap,'move');
			}
			return false;
		}
	};
	this._title.ondblclick = function(e) { //Restore
		var o = window[name]._cache[window[name]._cache.length - 1];
		window[name].reset(o);
	}
	this._resize.onmousedown = function(e) { //Resize
		if (window[name].__resize) {
			var width = parseInt(UI.C(wrap,'width')),height = parseInt(UI.C(wrap,'height')),top = parseInt(UI.getY(wrap)),left = parseInt(UI.getX(wrap));
			if (!UI.B.ie || document.compatMode == 'CSS1Compat') {
				width -= 2;
				height -= 2;
			}
			border.style.cssText = 'top:' + top + 'px;left:' + left + 'px;width:' + width + 'px;height:' + height + 'px;display:block;';
			window[name]._body.style.cursor = 'se-resize';
			var event = window.event || e;
			var _x = event.clientX;
			var _y = event.clientY;
			if(event.preventDefault){
				event.preventDefault();
			}
			UI.addClass(wrap,'move');
			document.onmousemove = function(e) {
				var event = window.event || e,_Y = event.clientY - _y,_X = event.clientX - _x;
				var min_X = (150 - width)/2,min_Y = (100 - height)/2;
				if (_Y < min_Y) _Y = min_Y;
				if (_X < min_X) _X = min_X;
				var css = 'height:' + (_Y*2 + height) + 'px;width:' + (_X*2 + width) + 'px;top:' + (top - _Y) + 'px;left:' + (left - _X) + 'px;display:block;';
				if (UI.B.ie6 && document.compatMode == 'BackCompat') { //Delay To Kill IE6 Bug
					setTimeout(function(){
						border.style.cssText = css;
					},10);
				}
				else border.style.cssText = css;
				return false;
			}
			document.onmouseup = function() {
				window[name]._wrap.style.cssText = 'margin:0;left:' + border.style.left + ';top:' + border.style.top + ';width:' + border.offsetWidth + 'px;height:' + border.offsetHeight + 'px;';
				window[name].checkStaus({height:border.offsetHeight});
				setTimeout(function(){ //Delay To Kill IE6 Bug
					border.style.display = 'none';
				},15);
				window[name]._body.style.cursor = '';
				this.onmousemove = null;
				document.onmouseup = null;
				UI.removeClass(wrap,'move');
			}
			return false;
		}
	};
	this._cont.onclick = function(e){ //Auto Height Mode
		if (Self.autoHeight) {
			clearTimeout(Self.delay);
			Self.delay = setTimeout(function(){
				if (!Self.__display) return false;
				Self.height();
			},100);
		}
	};

	//Method
	this.hide = function() {
		var cache = UI.Dialog.cache;
		if (!this.__close || (cache[cache.length - 1] != this.__name && cache.length > 0)) return false;
		var length = this._cache.length;
		if (length > 1) {
			this.reset(this._cache[length - 2]);
			if (this._cache[length - 1].call) eval(this._cache[length - 1].call);
		}
		else if (length == 0) {
			UI.hide(this._body);
			this.__display = false;
			return false;
		}
		else {
			UI.hide(this._body);
			var html = this._cache[0].html;
			if (html && !UI.isString(html)) {
				document.body.appendChild(html);
				UI.hide(html);
			}
			if (this._cache[0].call) eval(this._cache[0].call);
			this.__display = false;
		}
		this.__title = this._cache[0].title; //Save Last Title
		this._cache.pop();

		//Dialogs Cache
		if (this._cache.length < 1 && cache[cache.length - 1] == this.__name) {
			cache.pop();
			if (cache.length > 0) {
				UI.show(window[cache[cache.length - 1]]._bg);
			}
		}

		this.title();
	}
	this.show = function(o) {
		if (!this._append) {
			document.body.appendChild(this._body);
			this._append = true;
		}
		if (!this.__display) {
			UI.show(this._body);
			this.__display = true;
		}
		if (o) {
			//Auto Height Mode
			this.autoHeight = o.autoHeight || false;
			if (o.autoHeightMax) this.autoHeightMax = o.autoHeightMax;

			if (o.html == null) { //Cross Iframe Dom
				
			}
			if (o.url || o.html) {
				this._cache.push(o);

				//Dialogs Cache
				var cache = UI.Dialog.cache;
				if (cache[cache.length - 1] != this.__name) {
					cache.push(this.__name);
					for (var i = 0,n = cache.length - 1;i < n;i++) {
						UI.hide(window[cache[i]]._bg);
					}
				}

				if (o.url) this._cont.style.overflow = 'hidden';
				else {
					this._cont.style.overflow = 'auto';
				}
			}
			else {
				if (o.title) this._cache[this._cache.length - 1].title = o.title;
			}
			this.reset(o);
		}
		else {
			this.reset({});
		}
	}
	this.reset = function(o) {
		if (o.title) this.title();
		if (o.size) {
			size.call(this,o);
		}
		var autoHeight = !!(o.html && !UI.isString(o.html) && !o.height);

		//Check Postion
		this._wrap.style.top = '50%';
		this._wrap.style.left = '50%';
		this._wrap.style.margin = -parseInt(UI.C(this._wrap,'height'))/2 + UI.scrollY() + 'px 0 0 ' + (-parseInt(UI.C(this._wrap,'width'))/2 + UI.scrollX()) + 'px';
		var h_page = UI.pageHeight(),h_window = UI.windowHeight();
		this._bg.style.cssText = 'width:' + UI.pageWidth() + 'px;height:' + (h_page < h_window ? h_window : h_page) + 'px;';
		this._body.style.height = UI.windowHeight();

		if (o.width) {
			if (o.width%2) o.width += 1; //Kill IE Bug
			this._wrap.style.width = o.width + 'px';
			this._wrap.style.marginLeft = -o.width/2 + UI.scrollX() + 'px';
		}
		if (o.height) {
			if (o.height%2) o.height += 1; //Kill IE Bug
			this._wrap.style.height = o.height + 'px';
			this._wrap.style.marginTop = -o.height/2 + UI.scrollY() + 'px';
		}
		if (o.close) this._close.className = 'close' + (o.close != false ? '' : 'hide');
		if (o.url) {
			UI.hide(this._iframe);
			UI.show(this._loading);
			this._iframe.contentWindow.location.replace(o.url);
		}
		else if (o.html) {
			UI.hide(this._iframe);
			if (UI.isString(o.html)) {
				UI.hide(this._loading);
				this._data.innerHTML = o.html;
			}
			else {
				this._data.appendChild(o.html);
				UI.show(o.html);
			}
		}
		this.checkStaus.call(this,o);

		if (autoHeight) { //Auto Heihgt For Dom
			this.height();
		}
	}
	this.title = function() {
		var title=[];
		for (var i=0;i<this._cache.length;i++) {
			if (this._cache[i].title) {
				title.push(this._cache[i].title);
			}
		}
		if (title.length == 0) title.push(this.__title);
		this._title.innerHTML = '<span>' + title.join('<b class="dot"></b>') + '</span>';
	}
	this.height = function() {
		var H = UI.height(this._data) + this._titleHeight;
		this.show({autoHeight:this.autoHeight,height:H > this.autoHeightMax ? this.autoHeightMax : H});
	}
	function size(o){
		switch(o.size) {
			case 'small':
				if(!o.width) o.width = 380;
				if(!o.height) o.height = 220;
				break;
			case 'medium':
				if(!o.width) o.width = 530;
				if(!o.height) o.height = 420;
				break;
			case 'big':
				if(!o.width) o.width = 760;
				if(!o.height) o.height = 540;
				break;
		}
	}
}
UI.Dialog.cache = [];
UI.Dialog.location = null; //Window Location Cache To Refresh Page