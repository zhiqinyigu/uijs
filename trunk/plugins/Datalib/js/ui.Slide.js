UI.Slide = function(o){
	var Self = this;
	o.target.Slide = 1;

	//Dom
	Self._parent = o.target.parentNode;
	Self._body = o.target;
	Self._list = UI.GC(o.target,'ul')[0];
	Self._list.style.cssText = 'width:9999px;';
	Self._li = UI.GC(Self._body,'li');
	Self._page = Self.$('.page');
	Self._prev = Self.$('.prev');
	Self._next = Self.$('.next');

	//Data
	Self.stepSmall = UI.width(Self._li[0]) + Self._li[0].offsetLeft;
	Self.perPage = parseInt(UI.width(Self._body) / Self.stepSmall) + 1;
	Self.total = Math.ceil(Self._li.length / Self.perPage);
	Self.step = Self.perPage * Self.stepSmall;
	Self._page.innerHTML = new UI.tmplString(Self.tmpl.page)({num:Self.total});
	if (Self.total > 1) {
		UI.show(Self._page);
	}
	else {
		UI.hide(Self._page);
		UI.hide(Self._prev);
		UI.hide(Self._next);
	}
	Self.page();

	//Event
	UI.EA(Self._prev,'click',function(){
		Self.prev();
	});
	UI.EA(Self._prev,'click',UI.Slide.click);
	UI.EA(Self._next,'click',function(){
		Self.next();
	});
	UI.EA(Self._next,'click',UI.Slide.click);
	UI.each(Self._page.childNodes,function(o,i){
		o.num = i + 1;
		UI.EA(o,'click',UI.Slide.click);
		UI.EA(o,'click',page);
	});

	function page(e){
		var el = UI.E(e).target;
		Self.page(el.num);
	}
}
UI.Slide.click = function(e){
	var E = UI.E(e);
	E.prevent();
	E.target.blur();
}
UI.Slide.prototype = {
	auto : 0,
	loop : 1,
	cur : 1,
	tmpl : {
		page : '<%for(var i=0;i<num;i++){%><a href="#" class="ico dot<%if(i==0){%> dot_on<%}%>"></a><%}%>'
	},
	$ : function(selector){
		return UI.GC(this._parent,selector)[0];
	},
	page : function(num){
		this.cur = num || this.cur;

		if (this.cur < 1) {
			this.cur = 1;
		}
		else if (this.cur > this.total) {
			this.cur = this.total;
		}

		if (this.cur == 1) {
			UI.addClass(this._prev,'prev_off');
		}
		else {
			UI.removeClass(this._prev,'prev_off');
		}
		if (this.cur == this.total) {
			UI.addClass(this._next,'next_off');
		}
		else {
			UI.removeClass(this._next,'next_off');
		}

		UI.removeClass(UI.GC(this._page,'.dot_on')[0],'dot_on');
		UI.addClass(this._page.childNodes[this.cur - 1],'dot_on');

		this.scroll();
	},
	prev : function(){
		this.cur--;
		this.page();
	},
	next : function(){
		this.cur++;
		this.page();
	},
	scroll : function(){
		clearInterval(this.delay);
		this.delay = UI.animate(this._body,'scrollLeft',(this.cur - 1) * this.step);
	}
}
UI.slide = function(selector){
	UI.each(UI.GC(selector),function(el){
		if (!el.Slide) {
			new UI.Slide({
				target : el,
				action : 'x'
			});
		}
	});
}
