//oNews = new UI.ShowBar({name:'oNews',id:'news_bar',action:'marginTop',page:'mouseover',autoplay:false,pause:true,connect:true,speed:2000});
UI.ShowBar = function(o) {
	//Element
	this._body = UI.G(o.id);
	if (!this._body) return false;
	this._cont = UI.GC(this._body,'.cont')[0];
	this._li = UI.GT(this._cont,'li');
	this._first = this._li[0];
	this._next = UI.GC(this._body,'.next')[0];
	this._prev = UI.GC(this._body,'.prev')[0];
	
	//Option
	o.speed = o.speed||1500;
	this.cur = 1;
	this.num = this._li.length;
	this.animate = o.animate != undefined ? o.animate : true;
	this.autoplay = o.autoplay != undefined ? o.autoplay : true;
	this.pause = o.pause; //Stop Play When Mouseover Cont
	this.connect = o.connect; //No Disconnected
	this.step = Number(UI.C(this._first,o.action == 'marginTop' ? 'height' : 'width').slice(0,-2));
	this.delay = setInterval('if (' + o.name + '.autoplay) ' + o.name + '.next()',o.speed);
	this.delay2 = null; //Animate
	this.page = o.page;
	this.tmp_cur = 0;
	
	//Connect
	if (this.connect) this._li[0].parentNode.appendChild(this._li[0].cloneNode(true));
	//Page
	if (this.page) {
		if (UI.GC(this._body,'.page').length>0) {
			this._page = UI.GC(this._body,'.page')[0];
			this._li2 = UI.GT(this._page,'li');
			for (var i=0;i<this.num;i++) {
				UI.EA(this._li2[i],this.page,o.name + '.play(' + (i + 1) + ')');
			}
		}
		else {
			this._page = UI.DC('ul'),html=[];
			this._page.className = 'page';
			for (var i=0;i<this.num;i++) {
				html[i] = '<li '+ (!i ? 'class="on" ': '') +'on' + this.page + '="' + o.name + '.play(' + (i + 1) + ')">' + (i + 1) + '</li>';
			}
			this._page.innerHTML = html.join('');
			this._body.appendChild(this._page);
			this._li2 = UI.GT(this._page,'li');
		}
	}
	//Opacity
	if (o.action == 'opacity') {
		for (var i=0;i<this.num;i++) {
			UI.C(this._li[i],'opacity',0);
		}
		UI.C(this._li[0],'opacity',1);
	}
	
	//Event
	this._next.onclick = function(){ eval(o.name + '.next()'); }
	this._prev.onclick = function(){ eval(o.name + '.prev()'); }
	this._first.parentNode.onmouseover = function(){ eval('if(' + o.name + '.pause) clearInterval(' + o.name + '.delay)'); }
	this._first.parentNode.onmouseout = function(){ eval('if(' + o.name + '.pause) ' + o.name + '.delay = setInterval(\'' + o.name + '.next()\',' + o.speed + ')'); }
	this._next.onmouseover = this._prev.onmouseover = this._first.parentNode.onmouseover;
	this._next.onmouseout = this._prev.onmouseout = this._first.parentNode.onmouseout;

	//Function
	this.show = function(){
		if (this.page) {
			if (this.tmp_cur != null) {
				this._li2[this.tmp_cur].className = '';
			}
			var cur_page = this.cur>this.num ? 0 : this.cur-1;
			this._li2[cur_page].className = 'on';
			this.tmp_cur = cur_page;
		}
		if (this.animate) {
			clearInterval(this.delay2);
			if (o.action == 'opacity') {
				this.delay2 = UI.animate(this._li[this.cur-1],o.action,1,'clearInterval(' + o.name + '.delay2);');
				//UI.animate(this._li[this.tmp_cur],o.action,0);
				this.tmp_cur = this.cur>this.num ? 0 : this.cur-1;
			}
			else this.delay2 = UI.animate(this._first,o.action,-this.step * (this.cur-1),'clearInterval(' + o.name + '.delay2);');
		}
		else {
			if (o.action == 'opacity') {
				//this._li[this.cur-1].style.display = 'none';
			}
			else this._first.style[o.action] = -this.step * (this.cur-1) + 'px';
		}
	}
	this.next = function(){
		this.cur++;
		if (this.connect) {
			if (this.cur > this.num+1) {
				this._first.style.marginTop = '';
				this.cur = 2;
			}
		}
		else if (this.cur > this.num) this.cur = 1;
		this.show();
	}
	this.prev = function(){
		this.cur--;
		if (this.cur < 1) this.cur = this.num;
		this.show();
	}
	this.play = function(n){
		this.cur = n;
		this.show();
	}
}