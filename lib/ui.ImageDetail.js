UI.ImageDetail = {
	_title : UI.G('imgTitle'),
	_current : UI.G('imgCurrent'),
	_currentCache : UI.DC('div'),
	_currentCover : UI.G('imgCover'),
	_prev : UI.G('imgPrev'),
	_next : UI.G('imgNext'),
	_prevBtn : UI.G('imgPrevBtn'),
	_nextBtn : UI.G('imgNextBtn'),
	_prevPage : UI.G('imgPrevPage'),
	_nextPage : UI.G('imgNextPage'),
	_imgFull : UI.G('imgFull'),
	_location : UI.G('imgLocation'),
	_numTotal : UI.G('imgNumTotal'),
	_numTotal2 : UI.G('imgNumTotal2'),
	_numCurrent : UI.G('imgNumCurrent'),
	_list : UI.G('imgList'),
	_class : { //DOM's ClassName
		p : 'prev_disable',
		n : 'next_disable'
	},
	config : { //Config
		numPerPage : 5,
		heightPerPage : 655,
		heightPerImg : 131,
		bigImg : {
			width : 798,
			height : 589
		},
		smallImg : {
			width : 110,
			height : 110
		},
		tmpl : '<% for ( var i = 0; i < list.length; i++ ) { %><li><a href="javascript:void(0)" onfocus="this.blur()" onclick="UI.ImageDetail.show(<%=i%>,this);return false;"><img rel="<%=list[i][2]%>" onload="UI.ImageDetail.positoin(this,1)" title="<%=list[i][1]%>" /></a></li><% } %>',
		tmplCache : '<% for ( var i = 0; i < list.length; i++ ) { %><img rel="<%=(UI.ImageDetail.urlRule ? UI.ImageDetail.urlRule(list[i][2]) : list[i][3])%>" onload="this.loaded = true"/><% } %>'
	},
	delay : {},
	init : function(o){
		var Self = this;
		//Event
		this._prev.onclick = this._prevBtn.onclick = function(){
			Self.prev();
			this.blur();
			return false;
		};
		this._next.onclick = this._nextBtn.onclick = function(){
			Self.next();
			this.blur();
			return false;
		};
		this._prevPage.onclick = function(){
			Self.prevPage();
			return false;
		};
		this._nextPage.onclick = function(){
			Self.nextPage();
			return false;
		};
		this._prev.onfocus = this._next.onfocus = this._prevBtn.onfocus = this._nextBtn.onfocus = this._prevPage.onfocus = this._nextPage.onfocus = function(){
			this.blur();
		}
		this._current.onload = function(){
			this.style.margin = '-9999px';
			UI.ImageDetail.positoin(this);
		};
		UI.EA(this._list,'mousewheel',function(e){ //List Mouse Wheel
			var E = UI.E(e);
			clearTimeout(Self.delay.wheel);
			Self.delay.wheel = setTimeout(function(){
				E.wheel == 1 ? Self.prevPage() : Self.nextPage();
			},100);
			E.prevent();
		});

		//Option
		this.animate = o.animate;
		this.loop = o.loop;
		this.urlRule = o.urlRule;
		this.urlRuleBig = o.urlRuleBig;
		this.call = o.call;
		this.index = 0;

		//Get Json Data
		o.json ? UI.getScript(o.json,init) : init();
		function init(){
			var data = Self.data; //Data
			Self._location.innerHTML = data[0]; //Location
			Self.list = data[1]; //List
			if (!Self.list.length) {
				return false;
			}
			Self.listImg = UI.GT(Self._list,'img'); //List Image
			Self.current = o.current || data[1][0][0]; //Current ID
			Self.numTotal = Self.list.length; //Total Number
			Self.pageTotal = Math.ceil(Self.numTotal/Self.config.numPerPage); //Page Number
			Self.getIndex(); //Get Index
			Self.buildList();

			//Big Image Cache
			Self._currentCache.innerHTML = new UI.tmplString(Self.config.tmplCache)({list:data[1]});

			Self.show(Self.index); //Build HTML
			setTimeout(function(){ //Scroll To Picture Area
				UI.scrollTo(document.body,0,UI.getY(Self._list.parentNode));
			},0);
		}
	},
	build : function(){
		var index = this.index,classNext = this._class.n,classPrev = this._class.p;
		if (!this.list || isNaN(index)) return false;

		//Loading Cover
		var cover = this._currentCover;
		UI.C(cover,'opacity','1');

		//Main HTML Change
		this._numTotal.innerHTML = this._numTotal2.innerHTML = this.numTotal;
		this._numCurrent.innerHTML = this.numCurrent = index + 1;
		this._title.innerHTML = this.list[index][1];
		this._current.src = this.urlRule ? this.urlRule(this.list[index][2]) : this.list[index][3];
		this._imgFull.href = this.urlRuleBig ? this.urlRuleBig(this.list[index][2]) : this.list[index][3];

		//Big Image Preload
		var child = this._currentCache.childNodes;
		this.preload(child[index]);
		this.preload(child[index + 1]);
		index > 0 && this.preload(child[index - 1]);
		if (!child[index].loaded) {
			UI.addClass(cover,'loading');
		}

		//Img Button Status
		if (!this.loop && index == 0) {
			UI.addClass(this._prevBtn,classPrev);
			UI.addClass(this._prev,classPrev);
			this._prev.title = '';
		}
		else {
			UI.removeClass(this._prevBtn,classPrev);
			UI.removeClass(this._prev,classPrev);
			this._prev.title = UI.A(this._prev,'rel');
		}
		if (!this.loop && index == this.numTotal - 1) {
			UI.addClass(this._nextBtn,classNext);
			UI.addClass(this._next,classNext);
			this._next.title = '';
		}
		else {
			UI.removeClass(this._nextBtn,classNext);
			UI.removeClass(this._next,classNext);
			this._next.title = UI.A(this._next,'rel');
		}

		//List Img Status
		var child = this._list.childNodes,cur = child[this.indexTmp];
		if (cur) {
			UI.removeClass(cur,'cur');
		}
		UI.addClass(child[index],'cur');
		this.indexTmp = index;

		//Url Status
		var hash = document.location.hash.split('=');
		if (hash.length) {
			hash[hash.length - 1] = this.list[index][0];
			document.location.hash = hash.join('=');
		}

		//List Page
		var indexMiddle = Math.floor(this.config.numPerPage / 2);
		this.indexScroll = index >= indexMiddle ? index - indexMiddle : 0;
		this.showPage(this.indexScroll);

		//Check Current Image To Center Position
		clearInterval(this.delay.page);
		this.delay.page = UI.animate(this._list,'scrollTop',this.config.heightPerImg * (index > indexMiddle ? index - indexMiddle : 0));

		//Callback Functoin
		this.call && this.call();
	},
	buildList : function(){
		this._list.innerHTML = new UI.tmplString(this.config.tmpl)({list:this.data[1]});
	},
	prev : function(){
		if (this.index > 0) {
			this.index--;
			this.build();
		}
		else if (this.loop) {
			this.index = this.numTotal - 1;
			this.build();
		}
	},
	next : function(){
		if (this.index < this.numTotal - 1) {
			this.index++;
			this.build();
		}
		else if (this.loop) {
			this.index = 0;
			this.build();
		}
	},
	prevPage : function(){
		if (this.indexScroll >= 0) {
			var numPerPage = this.config.numPerPage,indexTo = this.indexScroll - numPerPage;
			if (indexTo <= 0) {
				if (this.loop && indexTo == - numPerPage) {
					indexTo = this.numTotal - numPerPage;
				}
				else {
					indexTo = 0;
				}
			}
			this.showPage(indexTo);
		}
	},
	nextPage : function(){
		if (this.indexScroll < this.numTotal - 1) {
			var indexTo = this.indexScroll + this.config.numPerPage;
			if (indexTo >= this.numTotal) {
				if (this.loop) {
					indexTo = 0;
				}
				else {
					indexTo = this.indexScroll;
				}
			}
			this.showPage(indexTo);
		}
	},
	show : function(index,el){
		this.index = index;
		this.build();
	},
	showPage : function(indexTo){
		var classNext = this._class.n,classPrev = this._class.p,numPerPage = this.config.numPerPage;

		//Page Scroll Animate
		clearInterval(this.delay.page);
		this.delay.page = UI.animate(this._list,'scrollTop',indexTo * this.config.heightPerImg);

		this.indexScroll = indexTo;

		//Page Button Status
		if (!this.loop && this.indexScroll == 0) {
			UI.addClass(this._prevPage,classPrev);
		}
		else {
			UI.removeClass(this._prevPage,classPrev);
		}
		if (!this.loop && this.numTotal - this.indexScroll <= numPerPage) {
			UI.addClass(this._nextPage,classNext);
		}
		else {
			UI.removeClass(this._nextPage,classNext);
		}

		//Load Image
		for (var i = this.indexScroll - numPerPage,num = this.indexScroll + numPerPage;i < num;i++) { //Preload Next Page's Images
			if (i >= 0 && this._list.childNodes[i]) {
				this.preload(this.listImg[i]);
			}
		}
	},
	getIndex : function(id){ //Get Index By Image's ID
		for (var i = 0;i < this.numTotal;i++) {
			if (this.list[i][0] == (id || this.current)) {
				return this.index = i;
			}
		}
	},
	preload : function(el){ //Preload Image
		if (el) {
			var rel = UI.A(el,'rel')
			if (rel) {
				el.src = rel;
				UI.A(el,'rel','');
			}
		}
	},
	positoin : function(el,small){
		if (!small) { //Reset Width Attribute And Height Attribute
			UI.A(el,'width','');
			UI.A(el,'height','');
			var loading = this._currentCover; //Loading Image
			UI.removeClass(loading,'loading');
		}
		var size = small ? this.config.smallImg : this.config.bigImg;
		if (el.height > size.height) {
			el.width = el.width * size.height / el.height;
			el.height = size.height;
		}
		if (el.width > size.width) {
			el.height = el.height * size.width / el.width;
			el.width = size.width;
		}
		el.style.margin = '-' + el.height / 2 + 'px 0 0 -' + el.width / 2 + 'px';
		if (!small) {
			if (this.animate) {
				UI.animate(loading,'opacity',0,null,0.6);
			}
			else UI.C(loading,'opacity','0');
		}
	}
}