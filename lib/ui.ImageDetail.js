UI.ImageDetail = {
	_title : UI.G('imgTitle'),
	_current : UI.G('imgCurrent'),
	_currentCache : UI.DC('div'),
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
	_class : {
		p : 'prev_disable',
		n : 'next_disable'
	},
	config : {
		numPerPage : 5,
		heightPerPage : 655,
		bigImg : {
			width : 798,
			height : 589
		},
		smallImg : {
			width : 110,
			height : 110
		},
		tmpl : '<% for ( var i = 0; i < list.length; i++ ) { %><li><a href="javascript:void(0)" onfocus="this.blur()" onclick="UI.ImageDetail.show(<%=i%>,this)"><img src="about:blank" rel="<%=list[i].src%>" onload="UI.ImageDetail.positoin(this,1)" title="第<%=i+1%>张" /></a></li><% } %>',
		tmplCache : '<% for ( var i = 0; i < list.length; i++ ) { %><img src="about:blank" rel="<%=list[i].srcBig%>" onload="console.log(this.src)" /><% } %>'
	},
	delay : {},
	init : function(o){
		var Self = this;
		//Event
		this._prev.onclick = this._prevBtn.onclick = function(){
			Self.prev();
			this.blur();
		};
		this._next.onclick = this._nextBtn.onclick = function(){
			Self.next();
			this.blur();
		};
		this._prevPage.onclick = function(){
			Self.prevPage();
		};
		this._nextPage.onclick = function(){
			Self.nextPage();
		};
		this._prevBtn.onfocus = this._nextBtn.onfocus = this._prevPage.onfocus = this._nextPage.onfocus = function(){
			this.blur();
		}
		this._current.onload = function(){
			this.style.margin = '-9999px';
			UI.ImageDetail.positoin(this);
		};

		//Get Json Data
		UI.get(o.json,'',function(data){
			data = eval('(' + data + ')');
			Self.data = data; //Data
			Self._location.innerHTML = data.location; //Location
			Self.list = data.list; //List
			Self.current = o.current || data.list[0].id; //Current ID
			Self.numTotal = Self.list.length; //Total Number
			Self.pageTotal = Math.ceil(Self.numTotal/Self.config.numPerPage); //Page Number
			Self.getIndex(); //Get Index
			Self.buildList();

			//Big Image Cache
			Self._currentCache.innerHTML = new UI.tmplString(Self.config.tmplCache)(Self.data);

			Self.show(Self.index); //Build HTML
		});
	},
	build : function(){
		//Main HTML Change
		this._numTotal.innerHTML = this._numTotal2.innerHTML = this.numTotal;
		this._numCurrent.innerHTML = this.numCurrent = this.index + 1;
		this._title.innerHTML = this.list[this.index].title;
		this._current.src = this._imgFull.href = this.list[this.index].srcBig;
		//Big Image Preload
		//this._currentCache.childNodes[this.index + 1]

		//Img Button Status
		if (this.index == 0) {
			UI.addClass(this._prevBtn,this._class.p);
			UI.addClass(this._prev,this._class.p);
			this._prev.title = '';
		}
		else {
			UI.removeClass(this._prevBtn,this._class.p);
			UI.removeClass(this._prev,this._class.p);
			this._prev.title = UI.A(this._prev,'rel');
		}
		if (this.index == this.numTotal - 1) {
			UI.addClass(this._nextBtn,this._class.n);
			UI.addClass(this._next,this._class.n);
			this._next.title = '';
		}
		else {
			UI.removeClass(this._nextBtn,this._class.n);
			UI.removeClass(this._next,this._class.n);
			this._next.title = UI.A(this._next,'rel');
		}

		//List Img Status
		var cur = UI.GC(this._list,'li.cur');
		if (cur[0]) {
			UI.removeClass(cur[0],'cur');
		}
		UI.addClass(this._list.childNodes[this.index],'cur');

		//List Page
		this.showPage();
	},
	buildList : function(){
		this._list.innerHTML = new UI.tmplString(this.config.tmpl)(this.data);
	},
	prev : function(){
		this.index--;
		if (this.index < 0) {
			this.index = 0;
		}
		else this.build();
	},
	next : function(){
		this.index++;
		if (this.index > this.numTotal - 1) {
			this.index = this.numTotal - 1;
		}
		else this.build();
	},
	prevPage : function(){
		this.currentPage--;
		if (this.currentPage < 1) {
			this.currentPage = 1;
		}
		else this.showPage(this.currentPage);
	},
	nextPage : function(){
		this.currentPage++;
		if (this.currentPage > this.pageTotal) {
			this.currentPage = this.pageTotal;
		}
		else this.showPage(this.currentPage);
	},
	show : function(index,el){
		this.index = index;
		this.build();
	},
	showPage : function(num){
		var numPerPage = this.config.numPerPage;
		this.currentPage = num || Math.ceil((this.index + 1)/numPerPage);

		//Cache Page
		if (this.currentPage == this.currentPageTmp) return false;
		this.currentPageTmp = this.currentPage;

		if (this.currentPage == 1) {
			UI.addClass(this._prevPage,this._class.p);
		}
		else {
			UI.removeClass(this._prevPage,this._class.p);
		}
		if (this.currentPage == this.pageTotal) {
			UI.addClass(this._nextPage,this._class.n);
		}
		else {
			UI.removeClass(this._nextPage,this._class.n);
		}

		//Page Animate
		clearInterval(this.delay.page);
		this.delay.page = UI.animate(this._list.childNodes[0],'marginTop',- this.config.heightPerPage * (this.currentPage - 1));
		//this._list.childNodes[0].style.marginTop = - this.config.heightPerPage * (this.currentPage - 1) + 'px';

		//Load Image
		for (var i = (this.currentPage - 1) * numPerPage,num = (this.currentPage + 1) * numPerPage;i < num;i++) { //Preload Next Page's Images
			if (this._list.childNodes[i]) {
				var img = UI.GT(this._list.childNodes[i],'img')[0],rel = UI.A(img,'rel');
				if (rel) {
					img.src = rel;
					UI.A(img,'rel','');
				}
			}
		}
	},
	getIndex : function(id){
		for (var i = 0;i < this.numTotal;i++) {
			if (this.list[i].id == (id || this.current)) {
				return this.index = i;
			}
		}
	},
	positoin : function(el,small){
		if (!small) { //Reset Width Attribute And Height Attribute
			UI.A(el,'width','');
			UI.A(el,'height','');
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
		el.style.cssText = 'margin:-' + el.height/2 + 'px 0 0 -' + el.width/2 + 'px;';
	}
}