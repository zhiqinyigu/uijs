//UI.tipBox();	//Create TipBox With 'tipBox' Class Name
UI.tipBox = function(o,n) {
	if (UI.isString(o)) {
		n = o;
		o = document.documentElement;
	}
	if(!o) o = document.documentElement;

	var n = '.' + (n ? n : 'tipBox');
	var name = '__tipBox';
	var tag = 'tipbox';
	var delay;

	UI.each(UI.GC(o,n),function(o){
		UI.A(o,tag,o.title);
		o.title = '';
		var open = function(e){
			var t = UI.E(e).target,html = UI.A(t,tag);
			if (!html) {
				var parents = UI.parents(t,n.slice(1));
				if (parents.length > 0) {
					t = parents[0];
					html = UI.A(t,tag);
				}
				else return false;
			}
			delay = setTimeout(function(){
				var o = {html:html,target:t};//.breakWord(5)
				if (html.length > 500) o.large = true;
				UI[name].show(o);
			},300);
			//alert(delay + 'add');//连续被触发？
		}
		UI.EA(o,'mouseover',open);
		UI.EA(o,'focus',open);
		UI.EA(o,'mouseout',function(e){
			clearTimeout(delay);
			//alert(delay);
		});
	});
	UI.ready(function(){
		UI[name] = new UI.TipBox({name:'UI.' + name});
	});
};
UI.TipBox = function(o) {
	//Dom
	this._body = UI.DC('div');
	this._body.className = 'tip_box';
	this._body.innerHTML = '<a class="fix" href="javascript:void(0)" title="Hold" onclick="' + o.name + '.__fix = !' + o.name + '.__fix;UI.toggleClass(this,\'on\');return false;" onfocus="this.blur()" tabindex="-1"></a><a class="close" href="javascript:void(0)" title="Close" onclick="' + o.name + '.hide();" tabindex="-1"></a><b class="arrow"></b><b class="shadow"></b><div class="wrap"><div class="title"></div><div class="cont"></div></div>' + (UI.Browser.ie6 ? '<iframe src="javascript:false;" class="cover"></iframe>' : '');
	this._close = UI.GC(this._body,'a.close')[0];
	this._fix = UI.GC(this._body,'a.fix')[0];
	this._arrow = UI.GC(this._body,'b.arrow')[0];
	this._shadow = UI.GC(this._body,'b.shadow')[0];
	this._wrap = UI.GC(this._body,'div.wrap')[0];
	this._title = UI.GC(this._body,'div.title')[0];
	this._cont = UI.GC(this._body,'div.cont')[0];
	this._cover = UI.GC(this._body,'iframe.cover')[0];

	//Status
	this.__display = false;
	this.__large = o.__large;
	this.__fix = false;
	this._body.style.display = 'none';
	document.body.appendChild(this._body);
	if (o.html) {
		this.show(o);
	}

	//Event
	var name = o.name,body = this._body,wrap = this._wrap,title = this._title,shadow = this._shadow,close = this._close,cover = this._cover,Self = this;
	this.key = function(e) {
		switch(UI.E(e).key) {
			case 27:
				if (Self.__display) Self.hide();
				break;
		}
	}
	UI.EA(document,'keyup',this.key);
	UI.EA(document,'click',function(e){
		if (!Self.__fix && UI.E(e).target != Self._target) {
			Self.hide();
		}
	});
	UI.EA(body,'click',function(e){
		UI.E(e).stop();
	});
	if (UI.Browser.ie6) { //Kill IE6 Select Scroll Bug
		setInterval(function(){
			cover.style.zoom = cover.style.zoom == '1' ? '0' : '1';
		},200);
	};
	(function(){
		var x,y,_x,_y,h_wrap,top,left,move;
		UI.drag(title,{
			start : function(e){
				var P = wrap.parentNode;
				var E = UI.E(e);
				E.prevent();
				x = E.x;
				y = E.y;

				UI.hide(Self._arrow);
				left = parseInt(UI.C(body,'marginLeft'));
				top = parseInt(UI.C(body,'marginTop'));
			},
			drag : function(e){
				var E = UI.E(e);
				E.prevent();
				body.style.marginLeft = left + E.x - x + 'px';
				body.style.marginTop = top + E.y - y + 'px';
			}
		},false);
	})();
	this._body.onmouseover = this._cont.onmousedown = function(e) {
		UI.E(e).stop();
	};

	//Method
	this.show = function(o) {
		if (this.__display && this._target != o.target) {
			this.hide();
		}
		if (this.__display) return false;

		UI.show(this._arrow);
		this.__large = o.large;
		if (o.large) {
			wrap.style.cursor = 'move';
			body.style.width = '400px';
			wrap.style.height = '200px';
		}
		else wrap.style.cursor = '';

		this._target = o.target;
		this.__html = this._cont.innerHTML = o.html;

		var pt = 0,pr = 0,pb = 0,pl = 0; //Padding Value
		switch ('TH,TD,DT,DD,LI'.hasString(this._target.nodeName)) {
			case true:
				UI.prepend(this._body,this._target);
				pl = parseInt(UI.C(this._target,'paddingLeft'));
				if (pl == NaN) pl = 0;
				break;
			default:
				UI.before(this._body,this._target);
				break;
		}
		this._body.style.display = '';
		
		//Value
		var h_window = UI.windowHeight(),h_wrap = UI.height(this._wrap),h_target = UI.height(this._target),w_window = UI.windowWidth(),w_wrap = UI.width(this._wrap),w_target = UI.width(this._target),x_target = UI.getX(this._target),y_target = UI.getY(this._target);
		var w_arrow = 7,h_arrow = 17;
		var space = UI.scrollY(this._target) + h_window - y_target - h_wrap;

		this._body.style.margin = '0 0 0 ' + (w_target + w_arrow - pl) + 'px';

		if (((w_window < w_wrap + w_target + x_target) && (1)) || w_window < w_wrap) { //Right Arrow
			UI.addClass(this._body,'right');
			this._body.style.marginLeft = - (w_wrap + w_arrow + pl) + 'px';
			this.__right = true;
		}
		else {
			UI.removeClass(this._body,'right');
			this.__right = false;
		}

		if (((!this.__right && (w_target >= w_window - w_wrap)) || w_target > w_wrap || (w_window - x_target - w_target < w_wrap)) && (w_window > w_wrap) && (w_window > x_target + w_wrap)) { //Top && Bottom Arrow (w_target > w_wrap) && 
			w_arrow = 16;
			h_arrow = 9;
			pt = parseInt(UI.C(this._target,'paddingTop'));
			pb = parseInt(UI.C(this._target,'paddingBottom'));
			if (pt == NaN) pt = 0;
			if (pb == NaN) pb = 0;

			this._wrap.style.marginTop = this._fix.style.marginTop = this._close.style.marginTop = this._shadow.style.marginTop = '0';

			if (space - h_arrow < 0) {
				this._body.className = 'tip_box top';
				this._body.style.marginLeft = '';
				this._body.style.marginTop = - h_wrap - h_arrow - pt - pb + 2 + 'px';
			}
			else {
				this._body.className = 'tip_box bottom';
				this._body.style.marginLeft = '';
				this._body.style.marginTop = h_target + h_arrow - pt - pb + 2 + 'px';
			}
		}
		else {
			UI.removeClass(this._body,'top');
			UI.removeClass(this._body,'bottom');
			if (space < 0) {
				if (space > -23)  space = -23;
				if (h_window < h_wrap) {
					space = h_window - h_wrap;
				}
				if (h_wrap - 22 < - space) {
					space = 22 - h_wrap;
				}
				this._wrap.style.marginTop = this._fix.style.marginTop = this._close.style.marginTop = this._shadow.style.marginTop = space - 4 + 'px';
				this._arrow.style.top = '0';
			}
			else {
				this._wrap.style.marginTop = this._fix.style.marginTop = this._close.style.marginTop = this._shadow.style.marginTop = - 2 + 'px';
				this._arrow.style.top = '';
			}
		}

		if (this._cover) { //Select Cover For IE6
			if (!(UI.hasClass(this._body,'top') || UI.hasClass(this._body,'bottom'))) {
				this._cover.style.cssText = 'width:' + (w_wrap + 9) + 'px;height:' + (h_wrap + 3) + 'px;margin-top:' + this._wrap.style.marginTop;
			}
			else this._cover.style.cssText = 'width:' + (w_wrap + 4) + 'px;height:' + (h_wrap + 11) + 'px;';
		}

		this._shadow.style.height = UI.height(this._wrap) + 'px';
		this.__display = true;
	}
	this.hide = function() {
		UI.hide(this._body);
		this.__large = null;
		this.__display = false;
	}
}