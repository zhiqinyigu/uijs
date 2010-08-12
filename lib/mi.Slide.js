/**
 * 幻灯滚动
 * @constructor
 * @param {Object} {target:Dom,call:Function}
 *            @example
 *            MI.slide = new MI.Slide({target:$('tagsList'),call:function(num){
 *                $('tagsListTitle').innerHTML = UI.A($$('.tagsList li')[num - 1],'rel');
 *            }});
 */
MI.Slide = function(o){
	var Self = this;
	//Dom
	Self._parent = o.target.parentNode.parentNode;
	Self._body = o.target;
	Self._list = UI.GC(o.target,'ul')[0];
	Self._li = UI.GC(Self._body,'li');
	Self._page = Self.$('.page');
	Self._prev = Self.$('.prev');
	Self._next = Self.$('.next');

	//Data
	Self.stepSmall = UI.width(Self._li[0]);
	Self.perPage = parseInt(UI.width(Self._body) / Self.stepSmall);
	Self.total = Math.ceil(Self._li.length / Self.perPage);
	Self.step = Self.perPage * Self.stepSmall;
	Self._page.innerHTML = new UI.tmplString(Self.tmpl.page)({num:Self.total});
	Self.page();

	//Event
	UI.EA(Self._prev,'click',function(){
		Self.prev();
	});
	UI.EA(Self._prev,'click',MI.Slide.click);
	UI.EA(Self._next,'click',function(){
		Self.next();
	});
	UI.EA(Self._next,'click',MI.Slide.click);
	UI.each(Self._page.childNodes,function(o,i){
		o.num = i + 1;
		UI.EA(o,'click',MI.Slide.click);
		UI.EA(o,'click',page);
	});
	Self.call = o.call;

	function page(e){
		var el = UI.E(e).target;
		Self.page(el.num);
	}
}
MI.Slide.click = function(e){
	var E = UI.E(e);
	E.prevent();
	E.target.blur();
}
MI.Slide.prototype = {
	/**
	 * 是否循环
	 * @type Boolean
	 */
	loop : 1,
	/**
	 * 当前页
	 * @type Number
	 */
	cur : 1,
	tmpl : {
		page : '<%for(var i=0;i<num;i++){%><a href="#" class="<%if(i==0){%>on<%}%>"></a><%}%>'
	},
	$ : function(selector){
		return UI.GC(this._parent,selector)[0];
	},
	/**
	 * 跳到某页
	 * 
	 * @param {Number} Number 页码
	 *            @example
	 *            MI.slide.page(2);
	 */
	page : function(num){
		this.cur = num || this.cur;

		if (this.cur < 1) {
			this.cur = this.loop ? this.total : 1;
		}
		else if (this.cur > this.total) {
			this.cur = this.loop ? 1 : this.total;
		}

		UI.removeClass(UI.GC(this._page,'.on')[0],'on');
		UI.addClass(this._page.childNodes[this.cur - 1],'on');

		this.scroll();
		if (this.call) {
			this.call(this.cur);
		}
	},
	/**
	 * 上一页
	 * 
	 *            @example
	 *            MI.slide.prev();
	 */
	prev : function(){
		this.cur--;
		this.page();
	},
	/**
	 * 下一页
	 * 
	 *            @example
	 *            MI.slide.next();
	 */
	next : function(){
		this.cur++;
		this.page();
	},
	scroll : function(){
		clearInterval(this.delay);
		this.delay = UI.animate(this._list,'marginLeft',- (this.cur - 1) * this.step);
	}
}