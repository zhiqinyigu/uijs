UI.Menu = function(o) {
	this.name = o.name;
	this.id = o.id;
	this.sub_id = o.sub_id;
	this.location_id = o.location_id;
	this.main = UI.G(o.id);
	this.body = UI.G(o.sub_id);
	this.wrap = UI.GC(this.body,'.sub_menu_wrap')[0];
	this.bar = UI.GC(this.body,'a.bar')[0];
	this.target = o.target; //Target Iframe
	this.cache = (o.cache == undefined ? true : o.cache); //Cache Menu Status
	this.large = o.large; //Large Icon For Menu Title
	this.extend = []; //Extend Menu
	this.data = o.data;

	//Show Location Information
	this.location = {
		data : [],
		rel : null,
		build : function() {
			for (var n=0;n<this.data.length;n++) {
				var h = UI.G(this.id);
				if (!n) h.innerHTML = '';
				if (n!=this.data.length-1) h.innerHTML += (n ? '<b class="dot"></b>' : '') + '<a href="' + this.data[n].url + '" target="' + this.target + '" ' + (!n && this.cache ? 'class="unlink" onclick="this.blur();return false;' : 'onclick="') + this.name + (this.data[n].fake ? '.location.show(' + n +');' : '.show(\'' + this.rel.slice(0,n+1) + '\');') + '" title="' + this.data[n].name + '">' + this.data[n].name + '</a>';
				else h.innerHTML += (n ? '<b class="dot"></b>' : '') + this.data[n].name;
			}
		},
		rebuild : function(o) {
			var o = eval('[' + o + ']');
			this.rel = o;
			this.data = [];
			for (var i=0;i<o.length;i++) {
				if (!i) this.data.push({name:this.tmp[o[i]].name,url:this.tmp[o[i]].url});
				try{
					if (i==1) this.data.push({name:this.tmp[o[i-1]].data[o[i]].name,url:(this.tmp[o[i-1]].data[o[i]].url ? this.tmp[o[i-1]].data[o[i]].url : this.tmp[o[i-1]].data[o[i]].data[0][1])});
					if (i==2) this.data.push({name:this.tmp[o[i-2]].data[o[i-1]].data[o[i]][0],url:this.tmp[o[i-2]].data[o[i-1]].data[o[i]][1]});
				}catch(e){}
			}
			this.build();
		},
		edit : function(n,u) {
			this.data.pop();
			this.data.push({name:n,url:u,fake:true});
			this.build();
		},
		add : function(n,u) {
			if (n != this.data[this.data.length - 1].name) {
				this.data.push({name:n,url:u,fake:true});
				this.build();
			}
		},
		remove : function() {
			this.data.pop();
			this.build();
		},
		show : function(n) {
			this.data.splice(n +1,50);
			this.build();
		}
	}
	this.location.name = this.name;
	this.location.id = this.location_id;
	this.location.target = this.target;
	this.location.cache = this.cache;
	this.location.tmp = o.data;

	this.show = function(o,load) { //Show Menu
		var url;
		if (UI.isArray(o)) o = this.index(o); //Search By Menu Name

		else var o = o.split(',');
		if (o.length <= 2) {
			o.push(0);
			if (o.length == 2 && this.location.tmp[o[0]].data.length) o.push(0);
		}
		if (load) {
			url = this.data[o[0]].data[o[1]].url || this.data[o[0]].url;
			try {
				url = this.data[o[0]].data[o[1]].data[o[2]][1];
			}catch(e){};
		}

		//List & Main Menu
		this.menu_list[this.cur_list].className = 'wrap hide';
		this.menu_list[o[0]].className = 'wrap show';
		UI.removeClass(this.main_menu[this.cur_list],'on');
		UI.addClass(this.main_menu[o[0]],'on');
		if (this.cache) this.main_menu[o[0]].setAttribute('rel',o)
		this.cur_list = o[0];

		try{
			UI.removeClass(UI.GC(this.menu_list[o[0]],'.on')[0],'on');
		}catch(e){};
		for (var i=1;i<o.length;i++) {
			if (i==1 && !this.location.tmp[o[0]].data[o[1]].data.length) {
				UI.addClass(UI.GC(UI.GC(this.body,'.wrap.show')[0],'.title')[o[1]],'on');
				this.main_menu[o[0]].href = this.location.tmp[o[0]].data[o[1]].url;
			}
			if (i==2 && !this.location.tmp[o[0]].data[o[1]].extend) {
				var menu_title = this.menu_title[o[0]][o[1]],menu_content = menu_title.nextSibling;
				UI.removeClass(menu_title,'off');
				UI.removeClass(menu_content,'hide');
				if (this.location.tmp[o[0]].data[o[1]].data.length) {
					UI.addClass(menu_content.getElementsByTagName('a')[o[2]],'on');
					if (this.cache) this.main_menu[o[0]].href = this.location.tmp[o[0]].data[o[1]].data[o[2]][1];
				}
				else if (this.cache) this.main_menu[o[0]].href = this.location.tmp[o[0]].data[o[1]].url;
			}
		}
		this.location.rebuild(o);
		if (url) window[this.target].location.href = url;
	}
	this.go = function(o) {
		this.show(o,true);
	}
	this.index = function(o) { //Get Menu Index Number With Menu Name
		var tmp = [];
		for (var i=0;i<o.length;i++) {
			if (i == 0) {
				for (var j=0;j<this.data.length;j++) {
					if (o[i] == this.data[j].name) {
						tmp.push(j);
						break;
					}
				}
			}
			if (i == 1) {
				for (var j=0;j<this.data[tmp[0]].data.length;j++) {
					if (o[i] == this.data[tmp[0]].data[j].name) {
						tmp.push(j);
						break;
					}
				}
			}
			if (i == 2) {
				for (var j=0;j<this.data[tmp[0]].data[tmp[1]].data.length;j++) {
					if (o[i] == this.data[tmp[0]].data[tmp[1]].data[j][0]) {
						tmp.push(j);
						break;
					}
				}
			}
		}
		return tmp;
	}

	this.refresh = function(o) {
		if (UI.isArray(o)) { //Search By Menu Name
			o = this.index(o);
			if (o.length == 1) tmp.push(0); //Auto To Find Second Menu
		}
		else if (o.split(',').length == 1) { //Auto To Find Second Menu
			o += ',0';
		}

		for (var i=0;i<this.extend.length;i++) {
			if (this.extend[i].rel == o) {
				var o = eval('[' + o + ']');
				var _extend = this.menu_title[o[0]][o[1]].nextSibling,_call = this.extend[i].call;
				_extend.innerHTML = '<div class="extend"><span class="content">loading...</span></div>';
				UI.get(this.extend[i].url,{},function(data){
					setTimeout(function(){
						_extend.innerHTML = '<div class="extend">' + data + '</div>';//.replace( /(?:\r\n|\n|\r)/g, '' )
						eval(_call);
					},200);
				})
			}
		}
	}
	var name = this.name;
	this.tree = function(n,m) {
		var o = UI.isString(n) ? UI.G(n) : n;
		var a = UI.GT(o,'a');
		var b = UI.GC(o,'b.arrow');
		for (var i=0;i<a.length;i++) {
			UI.A(a[i],'target',window[name].target);
			a[i].onfocus = function(){
				this.blur();
			}
			a[i].onclick = function() {
				try{
					UI.removeClass(UI.GC(window[name].menu_list[m],'.on')[0],'on');
				}catch(e){};
				UI.addClass(this,'on');
				var href = UI.A(this,'href');
				if (UI.next(this) && (href.hasString('void(0)') || href == '#')) {
					UI.toggleClass(this,'unfold');
					UI.toggleClass(UI.next(this),'hide');
					if (UI.hasClass(this,'extend')) {
						var o = this,next = UI.next(o);
						next.innerHTML = '<div class="extend"><span class="content">loading...</span></div>';
						UI.get(this.getAttribute('rel'),'',function(data){
							setTimeout(function(){
								next.innerHTML = data;
								window[name].tree(next,m);
							},100);
							UI.removeClass(o,'extend');
						});
					}
				}
			}
		}
		UI.each(b,function(o,i){
			b[i].onclick = function(e) {
				var parent = this.parentNode.parentNode;
				var next = UI.next(parent);
				UI.toggleClass(parent,'unfold');
				UI.toggleClass(next,'hide');
				if (UI.hasClass(parent,'extend')) {
					next.innerHTML = '<div class="extend"><span class="content">loading...</span></div>';
					UI.get(parent.getAttribute('rel'),'',function(data){
						setTimeout(function(){
							next.innerHTML = data;
							window[name].tree(next,m);
						},100);
						UI.removeClass(parent,'extend');
					});
				}
				UI.E(e).stop();
				return false;
			}
		});
	}

	/* Sub Menu & Main Menu */
	var html = [],html_main = [],rel = [];
	for(var i=0;i < o.data.length;i++) {
		//Location
		if (!i) rel = 0;

		html.push('<div class="wrap' + (!i ? ' show' : ' hide') + '">');
		for(var j=0;j < o.data[i].data.length;j++) {
			var off = title_large = arrow_empty = title_on = hide = cont_hide = '',title_url = '#';
			if (o.data[i].data[j].close) {
				off = ' off';
				hide = ' hide';
			}
			if (!o.data[i].data[j].data.length && !o.data[i].data[j].extend) {
				cont_hide = ' style="display:none"';
				arrow_empty = ' empty';
				if (this.large) title_large = ' large';
				if (!j) title_on = ' on';
			}
			if (!o.data[i].data[j].extend) {
				title_url = o.data[i].data[j].url ? o.data[i].data[j].url : o.data[i].data[j].data[0][1];
			}
			html.push('<div class="title' + title_large  + off + title_on + ' " onmouseover="UI.addClass(this,\'hover\')" onmouseout="UI.removeClass(this,\'hover\')"><a href="javascript:void(0)" onfocus="this.blur()" class="arrow' + arrow_empty + '" onclick="UI.toggleClass(this.parentNode,\'off\');UI.toggleClass(this.parentNode.nextSibling,\'hide\')"></a><a href="' + title_url + '" target="' + this.target + '" onfocus="this.blur()" onclick="' + (o.data[i].data[j].extend ? this.name + '.refresh(this.getAttribute(\'rel\'));UI.removeClass(this.parentNode,\'off\');UI.removeClass(this.parentNode.nextSibling,\'hide\');return false;': '') + this.name + '.show(this.getAttribute(\'rel\'));UI.removeClass(this.parentNode,\'hover\');" rel="' + i + ',' + j + (o.data[i].data[j].data.length ? ',0' : '') +'" title="' + o.data[i].data[j].name + '"><span>' + (o.data[i].data[j].ico ? '<b class="ico ' + o.data[i].data[j].ico + '"></b>' : '') + '<em>' + o.data[i].data[j].name + '</em></span></a></div><div class="content' + hide + '"' + cont_hide + '><span>');
			if (o.data[i].data[j].extend) this.extend.push({rel:i + ',' + j,url:o.data[i].data[j].extend.url,call:o.data[i].data[j].extend.call});
			else {
				for (var m=0;m<o.data[i].data[j].data.length;m++) {
					html.push('<a href="' + o.data[i].data[j].data[m][1] + '" target="' + this.target + '" onfocus="this.blur()" onclick="' + this.name + '.show(this.getAttribute(\'rel\'));"' + ((!title_on && !j && !m) ? ' class="on"' : '') + ' rel="' + i + ',' + j + ',' + m + '" title="' + o.data[i].data[j].data[m][0] + '"><span><b class="icon dot"></b>' + o.data[i].data[j].data[m][0] + '</span></a>');
				}
			}
			html.push('</span></div>');

			//Location
			if (!i && !j) {
				rel = '0,0' + (o.data[0].data[0].data.length ? ',0' : '');
			}
		}
		html.push('</div>');

		html_main.push('<a href="' + o.data[i].url + '" target="' + this.target + '" class="' + (i == 0 ? 'first on' :'') + (i == o.data.length - 1 ? 'last' : '') + '" title="' + o.data[i].name + '" onfocus="this.blur()" onclick="' + this.name + '.show(this.getAttribute(\'rel\'));' + (o.data[i].call ? o.data[i].call : '') + '" rel="' + i + ',0' + (o.data[i].data[0].data.length ? ',0' : '') + '" title="' + o.data[i].name + '"><span>' + o.data[i].name + '</span></a>');
	}
	this.wrap.innerHTML = html.join('');
	this.main.innerHTML = html_main.join('');
	if (o.data.length == 1) { //Hide Main Menu
		UI.addClass(this.main,'hide');
	}
	else UI.addClass(document.body,'HasMainMenu');

	//Menu list
	this.main_menu = UI.GT(this.main,'a');
	this.menu_list = UI.GC(this.body,'.wrap');
	this.menu_title = [];
	for (var i=0;i<this.menu_list.length;i++) {
		this.menu_title.push(UI.GC(this.menu_list[i],'.title'));
	}
	this.cur_list = 0;
	if (this.extend.length) { //Load Extend Menu
		for (var i=0;i<this.extend.length;i++) {
			this.refresh(this.extend[i].rel);
		}
	}

	//Hide Bar
	this.bar.onclick = function() {
		UI.toggleClass(this.parentNode,'close');
		UI.removeClass(this.parentNode,'open');
	}
	this.bar.onfocus = function() {
		this.blur();
	}
	var _name = this.name,_delay;
	this.body.onmouseover = function() {
		clearTimeout(_delay);
		_delay = setTimeout(function() {
			if (UI.hasClass(window[_name].body,'close')) {
				UI.addClass(window[_name].body,'open');
			}
		},250);
	}
	this.body.onmouseout = function() {
		clearTimeout(_delay);
		_delay = setTimeout(function() {
			if (UI.hasClass(window[_name].body,'close')) {
				UI.removeClass(window[_name].body,'open');
			}
		},250);
	}
	if (UI.Browser.ie6) { //IE6 Hack
		this.bg_iframe = UI.html('<iframe src="javascript:false;" class="bg"></iframe>')[0];
		this.bg_div = UI.html('<div class="bg"></div>')[0];
		this.wrap.appendChild(this.bg_iframe);
		this.wrap.appendChild(this.bg_div);
	}

	//List Auto Height
	document.documentElement.style.overflow = 'hidden';
	var _menu_height = UI.GC('td.header')[0].scrollHeight + UI.GC('a.bar')[0].scrollHeight;
	var _footer = UI.GC('td.footer');
	if (_footer) _menu_height += _footer[0].scrollHeight;
	this.autoHeight = function() {
		this.wrap.style.height = (UI.Browser.ie ? document.documentElement.scrollHeight - _menu_height - 4 : window.innerHeight - _menu_height) + 'px';
	};
	this.autoHeight();
	(function(n){
		UI.EA(window,'resize',function(){
			window[n].autoHeight();
		});
	})(this.name);

	//Default Show
	this.show(rel);
	window[this.target].document.location.href = o.data[0].url;
}