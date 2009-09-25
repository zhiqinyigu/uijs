/*
 * Cavy Framework
 *
 * (C) 1999-2006 NSFOCUS Corporation. All rights Reserved
 *  
 * Information:
 * 
 *   $Id: cavy.js 3163 2008-09-26 07:11:15Z jiangxiaodong $
 * 
 */
function timestamp() {
	return Date.parse(new Date());
}

var ASSERT = function(comment,exp) {
        if (!exp) {
                alert(comment + ", in function:" + arguments.callee.caller);
                throw comment;
        }
};

var Cavy = {};
Cavy.util = {};
Cavy.widgets = {};

Cavy.tables = {}; // hash of {id=>Cavy.Table}
Cavy.Table = Class.create();
Cavy.Table.prototype = {
	/**
	 * @param options {'paginal':[boolean],'pageSize':[int],'sortable':[boolean],'optionalPageSizes':[optional page size array]}
	 */
	initialize: function(tableId, url, options) {
		this.table = $(tableId);
		this.url = url;
		this.sortMethod = 'desc';
		this.options = options;
		this.currentColumn = null;
		if (this.options.paginal) {
			this.header = $(tableId + '-header');
			this.footer = $(tableId + '-footer');
			this.page = {
				num:1,
				end:false,
				total:-1
			};
			this.page.size = this.options.pageSize;
			this.page.SIZES = this.options.optionalPageSizes;
		}
		if (this.options.sortable) {
			this.orders = {};
		}
	},
	/**
	 * @param params hash of {'column', 'order', 'pageNumber', 'pageSize'}
	 */
	load: function() {
	
		var params = {};
		if (this.options.sortable && this.currentColumn != null) {
			params.column = this.currentColumn;
			if (this.orders[this.currentColumn] != null) {
				params.order = this.orders[this.currentColumn];
			}
		}
		if (this.options.paginal) {
			params.pageNumber = this.page.num;
			params.pageSize = this.page.size;
			this._fillBar(this.header);
			this._fillBar(this.footer);
		}
		
		var pars = '';
		for (var par in params) {
			if (params[par] == null) continue;
			if (pars != '') pars += '&';
			pars += par + '=' + params[par];
		}
		var url = this.url;
		var failure = false;
		var table = this;
		new Ajax.Request(url,{
			parameters: pars,
			method: 'get',
			onComplete: function(xhr) {
				if (failure) return;
				if (xhr.responseXML == null) {
					alert('Cavy cannot get xml from "' + url + '?' + pars + '"\n with html:' + xhr.responseText + "\n");
					return;
				}
				try {
					table._show(xhr.responseXML);
					if (table.options.paginal) {
						table._setPageButtons(table.header);
						table._setPageButtons(table.footer);
					}
				}
				catch (e) {
					alert('show table error:\n' + e + '\n with xml:\n' + xhr.responseText);
				}
			},
			onFailure: function(xhr,object) {
				alert('Resource not found:' + url);
				failure = true;
			},
			onSuccess: function(xhr,object) {
			}
		});
	},
	changePageSize: function(size) {
		this.page.size = parseInt(size);
		this.page.num = 1;
		this.load();
	},
	_fillPageCountInBar: function(bar) {
		$(bar.id + '-count').innerHTML = parseInt((this.page.total + this.page.size - 1) / this.page.size);
	},
	_fillBar: function(bar) {
		// fill page number
		$(bar.id + '-num').innerHTML = this.page.num;
		// fill page size
		var select = $(bar.id + '-size');
		var options = select.options;
		/*
		if (options.length == 0) {
			// init
			for (var i=0; i<this.page.SIZES.length; i++ ) {
				var option = new Option(this.page.SIZES[i]);
				if (this.page.SIZES[i] == this.page.size) {
					option.selected = true;
				}
				options[options.length] = option;
			}
			var table = this;
			select.onchange = function() {
				table.changePageSize($F(select));
			}
		}*/
		//清空select框
		select.innerHTML="";
		// init
		for (var i=0; i<this.page.SIZES.length; i++ ) {
			var option = new Option(this.page.SIZES[i]);
			options[options.length] = option;//options[xx].selected = true;
			if (this.page.SIZES[i] == this.page.size) {
				option.selected = true;
			}
		}
		var table = this;
		select.onchange = function() {
			table.changePageSize($F(select));
		}		
		// fill buttons
		var table = this;
		$(bar.id + '-first').onclick = function() {
			table._goFirst(bar.id);
		}
		$(bar.id + '-next').onclick = function() {
			table._goNext(bar.id);
		}
		$(bar.id + '-last').onclick = function() {
			table._goLast(bar.id);
		}
		$(bar.id + '-prev').onclick = function() {
			table._goPrev(bar.id);
		}
		// fill goto button
		var f = function() {
			var number = $F(bar.id + '-goto-text');
			if (isNaN(number)) {
				$(bar.id + '-goto-text').select();
				return;
			}
			var page = parseInt(number);
			if (!table._goto(page)) {
				$(bar.id + '-goto-text').select();
				return;
			}
		};
		$(bar.id + '-goto').onclick = f;
		$(bar.id + '-goto-text').onkeydown = function(evt) {
			evt = evt || window.event;
			if (evt.keyCode == Event.KEY_RETURN) {
				f();
			}
		};
	},
	_setPageButtons: function(bar) {
		if (this.page.num != 1) {
			this._enablePageButton($(bar.id + '-first'));
			this._enablePageButton($(bar.id + '-prev'));
		}
		else {
			this._disablePageButton($(bar.id + '-first'));
			this._disablePageButton($(bar.id + '-prev'));
		}
		var lastNum = this._getLastNum();
		if (this.page.num >= lastNum) {
			this._disablePageButton($(bar.id + '-last'));
			this._disablePageButton($(bar.id + '-next'));
		}
		else {
			this._enablePageButton($(bar.id + '-last'));
			this._enablePageButton($(bar.id + '-next'));
		}
	},
	_getLastNum: function() {
		return parseInt((this.page.total + this.page.size - 1) / this.page.size);
	},
	_enablePageButton: function(button) {
		var img = button.getElementsByTagName('img')[0];
		var fn = img.src.substr(img.src.lastIndexOf('/') + 1);
		if (fn.indexOf('d_') == 0) {
			// enable it
			var tmp = img.src;
			img.src = img.getAttribute('d-src');
			img.setAttribute('d-src',tmp);
		}
	},
	_disablePageButton: function(button) {
		var img = button.getElementsByTagName('img')[0];
		var fn = img.src.substr(img.src.lastIndexOf('/') + 1);
		if (fn.indexOf('d_') < 0) {
			// disable it
			var tmp = img.src;
			img.src = img.getAttribute('d-src');
			img.setAttribute('d-src',tmp);
		}
		button.onclick = null;
	},
	_goto: function(page) {
		if (page <= 0 || page > this._getLastNum()) {
			return false;
		}
		this.page.num = page;
		this.load();
		return true;
	},
	_goFirst: function(barid) {
		this.page.num = 1;
		this.load();
	},
	_goNext: function(barid) {
		this.page.num ++;
		this.load();
	},
	_goPrev: function(barid) {
		if (this.page.num -- ==0 ) return;
		this.load();
	},
	_goLast: function(barid) {
		this.page.num = parseInt((this.page.total + this.page.size - 1) / this.page.size);
		this.load();
	},
	_show: function(xmldom) {
		this._cleanTable();
		var total = parseInt(xmldom.documentElement.getAttribute('total'));
		if (this.page != null && total != null) {
			this.page.total = total;
		}
		// set page count label
		if (this.options.paginal) {
			this._fillPageCountInBar(this.header);
			this._fillPageCountInBar(this.footer);
		}
		
		var xmlhead = xmldom.getElementsByTagName('thead')[0];
		var thead = this.table.insertRow(-1);
		var expandNodes = xmlhead.getElementsByTagName('expand');
		for (var i=0; i<expandNodes.length; i++) {
			var th = document.createElement('th');
			thead.appendChild(th);
		}
		var cellNodes = xmlhead.getElementsByTagName('th');
		for (var i=0; i<cellNodes.length; i++) {
			var xmlcell = cellNodes[i];
			var th = document.createElement('th');
			if (xmlcell.getAttribute('width') != null) {
				th.width = xmlcell.getAttribute('width');
			}
			var col = xmlcell.getAttribute('column');
			if (col != null) th.setAttribute('column',col);
			var isSortable = xmlcell.getAttribute('isSortable');
			th.setAttribute('isSortable',isSortable == null ? false : isSortable);
			th.innerHTML = '<label>' + xmlcell.childNodes[0].nodeValue + '</label>';
			thead.appendChild(th);

			if (isSortable != 'true') continue;

			if (this.options.sortable) { 
				// init order
				var order = this.orders[col];
				if (order == null) {
					if (xmlcell.getAttribute('order') != null) {
						order = xmlcell.getAttribute('order');
					}
					else {
						order = 'desc';
					}
					// save sort status
					this.orders[col] = order;
				}
				else if (col == this.currentColumn) {
					// add order flag
					th.innerHTML += '<img class="sort" src="' + this.options.images[order] + '" />';
				}
				// add sort function
				th.onclick = this._sortColumn.bindAsEventListener(this);
				th.onmouseover = function() {
					this.className = 'light';
				}
				th.onmouseout = function() {
					this.className = '';
				}
	
			}
		}
		var xmlbody = xmldom.getElementsByTagName('tbody')[0];
		var rowNodes = xmlbody.getElementsByTagName('tr');
		for (var i=0; i<rowNodes.length; i++) {
			var xmlrow = rowNodes[i];
			var row = this.table.insertRow(-1);
			if (i % 2 == 0) row.className = 'even';
			else row.className = 'odd';
			var expandNodes = xmlrow.getElementsByTagName('expand');
			for (var j=0; j<expandNodes.length; j++) {
				var node = this._createExpandNode(expandNodes[j]);
				var cell = row.insertCell(-1);
				node.onclick = this._onExpand.bindAsEventListener(this,node);
				cell.appendChild(node);
			}
			var cellNodes = xmlrow.getElementsByTagName('td');
			for (var j=0; j<cellNodes.length; j++) {
				var cell = row.insertCell(-1);
				if (!cellNodes[j].hasChildNodes()) {
					continue;
				}
				var textNode = cellNodes[j].childNodes[0];
				if (textNode.nodeName == '#text' || textNode.nodeName == '#cdata-section') {
					var encode_attr = cellNodes[j].getAttribute('encoding');
					var text = textNode.nodeValue;
					if (encode_attr == 'base64') {
						text = Cavy.Encoder.utf8to16(Cavy.Base64.decode(text));
					}
					cell.innerHTML = text;
				}
				else {
					alert('invalid element:' + textNode);
					return;
				}
			}
		}
	},
	_createExpandNode: function(expand) {
		if (expand.getAttribute('width') != null) {
			node.width = expand.getAttribute('width');
		}
		var url = expand.getAttribute('url');
		var img = document.createElement('img');
		img.setAttribute('url',url);
		img.src = this.options.images.expand;
		img.width = 16;
		img.height = 16;
		img.className = 'ico plus';
		return img;
	},
	_onExpand: function(event,img) {
		var url = img.getAttribute('url');
		var expand = Element.hasClassName(img,'plus');
		if (!expand) {
			img.className="ico plus";
			var next_row = img.parentNode.parentNode.nextSibling;
			if (next_row != null && !Element.hasClassName(next_row,'more')) {
				alert(next_row);
				next_row = null;
			}
			if (next_row) {
				next_row.parentNode.removeChild(next_row);
			}
		}
		else {
			img.className="ico minus";
			var row = img.parentNode.parentNode;
			var tbody = row.parentNode;
			next_row = tbody.insertRow(row.rowIndex+1);
			next_row.className = 'more';
			var clmnum = row.getElementsByTagName('td').length;
			var cell = next_row.insertCell(-1);
			cell.colSpan = clmnum;
			cell.innerHTML = 'Loading...';
			new Ajax.Updater(cell,url, {
				method: 'get' 
			});
		}
	},
	_sortColumn: function(evt) {
		var target = document.all ? evt.srcElement : evt.target;
		if (target.nodeName != 'TH') target = target.parentNode;
		var tableId = target.parentNode.parentNode.parentNode.id;
		var table = Cavy.tables[tableId];
		var col = target.getAttribute('column');
		var order = this.orders[col];
		order = (order == 'asc' ? 'desc' : 'asc');
		table.currentColumn = col;
		this.orders[col] = order;
		table.load({'column':col,'order':order});
	},
	_cleanTable: function() {
		while (this.table.rows.length > 0) {
			this.table.deleteRow(-1);
		}
	}
}

var browser = {};
(function() {
	var dua = browser.UA = navigator.userAgent;
	var dav = browser.AV = navigator.appVersion;
	browser.opera = dua.indexOf("Opera") >= 0;
	browser.khtml = (dav.indexOf("Konqueror") >= 0)||(dav.indexOf("Safari") >= 0);
	browser.safari = dav.indexOf("Safari") >= 0;
	var geckoPos = dua.indexOf("Gecko");
	browser.mozilla = browser.moz = (geckoPos >= 0)&&(!browser.khtml);
	if (browser.mozilla) {
		// gecko version is YYYYMMDD
		browser.geckoVersion = dua.substring(geckoPos + 6, geckoPos + 14);
	}
	browser.ie = (document.all)&&(!browser.opera);
	browser.ie50 = browser.ie && dav.indexOf("MSIE 5.0")>=0;
	browser.ie55 = browser.ie && dav.indexOf("MSIE 5.5")>=0;
	browser.ie60 = browser.ie && dav.indexOf("MSIE 6.0")>=0;
})();

Cavy.Style = {

	/* float between 0.0 (transparent) and 1.0 (opaque) */
	setOpacity: function(node, opacity, dontFixOpacity) {
		node = $(node);
		if(!dontFixOpacity){
			if( opacity >= 1.0){
				if(browser.ie){
					ds.clearOpacity(node);
					return;
				}else{
					opacity = 0.999999;
				}
			}else if( opacity < 0.0){ opacity = 0; }
		}
		if(browser.ie){
			if(node.nodeName.toLowerCase() == "tr"){
				// FIXME: is this too naive? will we get more than we want?
				var tds = node.getElementsByTagName("td");
				for(var x=0; x<tds.length; x++){
					tds[x].style.filter = "Alpha(Opacity="+opacity*100+")";
				}
			}
			node.style.filter = "Alpha(Opacity="+opacity*100+")";
		}else if(browser.moz){
			node.style.opacity = opacity; // ffox 1.0 directly supports "opacity"
			node.style.MozOpacity = opacity;
		}else if(browser.safari){
			node.style.opacity = opacity; // 1.3 directly supports "opacity"
			node.style.KhtmlOpacity = opacity;
		}else{
			node.style.opacity = opacity;
		}
	},
	getOpacity: function(node) {
		node = $(node);
		if(browser.ie){
			var opac = (node.filters && node.filters.alpha &&
				typeof node.filters.alpha.opacity == "number"
				? node.filters.alpha.opacity : 100) / 100;
		}else{
			var opac = node.style.opacity || node.style.MozOpacity ||
				node.style.KhtmlOpacity || 1;
		}
		return opac >= 0.999999 ? 1.0 : Number(opac);
	},
	clearOpacity: function(node) {
		node = $(node);
		var ns = node.style;
		if(browser.ie){
			try {
				if( node.filters && node.filters.alpha ){
					ns.filter = ""; // FIXME: may get rid of other filter effects
				}
			} catch(e) {
				/*
				 * IE7 gives error if node.filters not set;
				 * don't know why or how to workaround (other than this)
				 */
			}
		}else if(browser.moz){
			ns.opacity = 1;
			ns.MozOpacity = 1;
		}else if(browser.safari){
			ns.opacity = 1;
			ns.KhtmlOpacity = 1;
		}else{
			ns.opacity = 1;
		}
	}

}

Cavy.Screen = {
//	getViewWidth: function() {
//		return document.documentElement.clientWidth || window.innerWidth || 0;
//	},
//	getHeight: function() {
//		return document.documentElement.clientHeight || window.innerHeight || 0;
//	},
//	getPageWidth: function() {
//		//return document.body.offsetWidth + document.body.style.marginLeft + document.body.style.marginRight;
//		//return document.body.offsetWidth;// + window.screenLeft;
//		//return window.screen.width;
//		return this.getViewPortWidth();
//	},
	getViewportWidth:function() {
		var w = 0;
	
		if(window.innerWidth){
			w = window.innerWidth;
		}
	
		if(this.exists(document, "documentElement.clientWidth")){
			// IE6 Strict
			var w2 = document.documentElement.clientWidth;
			// this lets us account for scrollbars
			if(!w || w2 && w2 < w) {
				w = w2;
			}
			return w;
		}
	
		if(document.body){
			// IE
			return document.body.clientWidth;
		}
	
		return 0;	
	},
//	getPageHeight: function() {
////		return document.body.offsetHeight + document.body.style.marginTop + document.body.style.marginBottom;
////		alert(window.screenTop);
//		//return document.body.offsetHeight;// + window.screenTop;
////		return document.body.offsetWidth + document.body.scrollTop ;
////		return window.screen.height;
//		return this.getViewPortHeight();
//	},
	getViewportHeight: function() {
		if (window.innerHeight){
			return window.innerHeight;
		}
	
		if (this.exists(document, "documentElement.clientHeight")){
			// IE6 Strict
			return document.documentElement.clientHeight;
		}
	
		if (document.body){
			// IE
			return document.body.clientHeight;
		}
	
		return 0;
	},
	exists: function(obj, name){
		var p = name.split(".");
		for(var i = 0; i < p.length; i++){
		if(!(obj[p[i]])) return false;
			obj = obj[p[i]];
		}
		return true;
	},
	getScrollLeft: function() {
		return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
	},
	getScrollTop: function() {
		return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	}
	//getPageSize: function(){
//	
//	var xScroll, yScroll;
//	
//	if (window.innerHeight && window.scrollMaxY) {
//	xScroll = document.body.scrollWidth;
//	yScroll = window.innerHeight + window.scrollMaxY;
//	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
//	xScroll = document.body.scrollWidth;
//	yScroll = document.body.scrollHeight;
//	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
//	xScroll = document.body.offsetWidth;
//	yScroll = document.body.offsetHeight;
//	}
//	
//	var windowWidth, windowHeight;
//	if (self.innerHeight) { // all except Explorer
//	windowWidth = self.innerWidth;
//	windowHeight = self.innerHeight;
//	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
//	windowWidth = document.documentElement.clientWidth;
//	windowHeight = document.documentElement.clientHeight;
//	} else if (document.body) { // other Explorers
//	windowWidth = document.body.clientWidth;
//	windowHeight = document.body.clientHeight;
//	}
//	
//	// for small pages with total height less then height of the viewport
//	if(yScroll < windowHeight){
//	pageHeight = windowHeight;
//	} else {
//	pageHeight = yScroll;
//	}
//	
//	// for small pages with total width less then width of the viewport
//	if(xScroll < windowWidth){
//	pageWidth = windowWidth;
//	} else {
//	pageWidth = xScroll;
//	}
//	
//	
//	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight)
//	return arrayPageSize;
//	}
	 	
};
Cavy.Dialog = Class.create();
Cavy.Dialog._current = null;
Cavy.Dialog.getCurrent = function() {
	return Cavy.Dialog._current;
};
Cavy.Dialog.resources = {
	'loading.text': '...'
};
Cavy.Dialog.prototype = {
	dlgEl:null,
	dlgBg:null,
	options:null,
	tpl:null,
	title:null,
	keyObserver:null,
	scrollObserver: null,
	isVisible:false,
	shim: null,
	/**
	 * @params options {width:[integer],height:[integer],context:[cavy app context path],'blank-page':[blank page path, used by iframe src attribute]}
	 */
	initialize: function(title,templateUrl, options) {
		this.title = title;
		this.tpl = templateUrl;
		this.options = options == null ? {} : options;
		if (typeof this.options.width == 'undefined') {
			this.options.width = 320;
		}
		if (typeof this.options.height == 'undefined') {
			this.options.height = 480;
		}
		this._createWnd();
	},
	fillByHtml: function(innerHTML) {
		var container = this.getContainer();
		container.innerHTML = innerHTML;
	},
	fill: function(el) {
		var container = this.getContainer();
		container.innerHTML = '';
		el = $(el);
		var new_node = el.cloneNode(true);
		container.appendChild(new_node);
		if (new_node.style.display != null && new_node.style.display == 'none') {
			new_node.style.display = '';
		}
	},
	fillByAjax: function(url,mtd) {
		var container = this.getContainer();
		container.innerHTML = 'Loading...';
		this._toWaitingStatus();
		var dialog = this;
		new Ajax.Updater(container,url,{
			method: ( mtd == null ? 'get' : mtd ),
			evalScripts: true,
			onComplete: function(xhr) {
				dialog._toNormalStatus();
			}
		});
	},
	show: function() {
		this.dlgBg.style.display = 'block';
		this.dlgBg.style.zIndex = 99;
		if (this.shim != null) {
			with (this.shim.style) {
				position = 'absolute';
				border = "0px";
			}
		}
		this._placeDialog();

		Element.observe(document,'keydown',this.keyObserver);
		Element.observe(window,'scroll',this.scrollObserver);
	
		this.isVisible = true;
		Cavy.Dialog._current = this;
	},
	close: function() {
		if (this.isVisible) {
			Element.stopObserving(document,'keydown',this.keyObserver);
			Element.stopObserving(window,'scroll',this.scrollObserver);
			this.dlgEl.style.display = 'none';
			this.dlgBg.style.display = 'none';
			this.isVisible = false;
		}
		Cavy.Dialog._current = null;
	},
	submitInnerForm: function(frm) {
		var url = frm.action;
		var pars = Form.serialize(frm);
		this._toWaitingStatus();
		var dialog = this;
		new Ajax.Updater(this.getContainer(),url,{
			method:'post',parameters: pars,
			evalScripts: true,
			onComplete: function(xhr) {
				dialog._toNormalStatus();
			}
		});
	},
	_placeDialog: function() {
		var left = Cavy.Screen.getScrollLeft() + (Cavy.Screen.getViewportWidth() - this.options.width ) / 2;
		var top = Cavy.Screen.getScrollTop() + (Cavy.Screen.getViewportHeight() - this.options.height ) / 2;
		if (top <= 0) top = 0;
		if (left <= 0) left = 0;

		this.dlgBg.style.width = Cavy.Screen.getScrollLeft() + Cavy.Screen.getViewportWidth() + 'px';
		this.dlgBg.style.height = Cavy.Screen.getScrollTop() + Cavy.Screen.getViewportHeight() + 'px';
		
		// set shim size and position
		if (this.shim != null) {
			this.shim.style.left = left + 'px';
			this.shim.style.top = top + 'px';
		}
		
		this.dlgEl.style.left = left + 'px';
		this.dlgEl.style.top = top + 'px';
		this.dlgEl.style.display = 'block';
		this.dlgEl.style.zIndex = 100;
	
		var container = this.getContainer();
		with(container.style) {
			width = this.options.width + 'px';
			height = this.options.height + 'px';
		}
		this._getTable().width = this.getContainer().scrollWidth + 'px';
		if (this.shim != null) {
			this.shim.style.width = this.dlgEl.offsetWidth + 'px';
			this.shim.style.height = this.dlgEl.offsetHeight + 'px';
		}
//	
//		var scroll_left = Cavy.Screen.getScrollLeft();
//		var scroll_top = Cavy.Screen.getScrollTop();
//		var vw = Cavy.Screen.getViewportWidth();
//		var vh = Cavy.Screen.getViewportHeight();
//
//		var w = Element.getWidth(this.dlgEl);
//		var h = Element.getHeight(this.dlgEl);
//		with (this.dlgEl.style) {
//			left = scroll_left + (vw - w ) / 2 + 'px';
//			top = scroll_top + (vh - h) / 2 + 'px';
//		}
//		
//		var w = Element.getWidth(this.dlgBg);
//		var h = Element.getHeight(this.dlgBg);
//		with (this.dlgBg.style) {
//			left = scroll_left + (vw - w ) / 2 + 'px';
//			top = scroll_top + (vh - h) / 2 + 'px';
//		}
//		
//		var w = Element.getWidth(this.shim);
//		var h = Element.getHeight(this.shim);
//		with (this.shim.style) {
//			left = scroll_left + (vw - w ) / 2 + 'px';
//			top = scroll_top + (vh - h) / 2 + 'px';
//		}
		
	},
	/**
	 * Create an iframe shim that prevents selects from showing through
	 */
	_createShim: function() {
		var shim = document.createElement("IFRAME");
		if (this.options['context'] == null && this.options['blank-page']) {
			alert("Dialog options has no 'context' or 'blank.page' property so iframe src attribute will be blank.\n Please use Ajax Helper to set context automatically");
		}
		else {
			shim.src = this.options['blank-page'] == null ? 
				(this.options['context'] + '/__sys_blank__')
				: this.options['blank-page'];
		}
		shim.className = 'dialog-shim';
		shim.frameBorder = 0;
		return shim;
	},
	_createWnd: function() {
		this.dlgBg = document.createElement("DIV");
		this.dlgBg.className = 'dialog-bg';
		with(this.dlgBg.style) {
			left = '0px';
			top = '0px';
			display = 'none';
			position = 'absolute';
		}
		Cavy.Style.setOpacity(this.dlgBg,0.5);
		document.body.appendChild(this.dlgBg);
		if (Prototype.Browser.IE) {
			this.shim = this._createShim();
			this.dlgBg.appendChild(this.shim);
		}

		this.dlgEl = document.createElement("DIV");
		this.dlgEl.className = 'dialog';
		with(this.dlgEl.style) {
			position = 'absolute';
			display = 'none';
		}
		new Ajax.Updater(this.dlgEl,this.tpl,{asynchronous:false});
		document.body.appendChild(this.dlgEl);

		// set title
		this._getTitleCell().innerHTML = this.title;

		this.getContainer().style.width = this.options.width + 'px';
		this.getContainer().style.height = this.options.height + 'px';

		// set windowClose event
		this._getCloseButtonCell().onclick = this.close.bindAsEventListener(this);

		// set key observer
		var dlg = this;
		this.keyObserver = function(evt) {
			if (evt.keyCode == Event.KEY_ESC) {
				dlg.close();
			}
		};
		this.scrollObserver = function(evt) {
			dlg._placeDialog();
		};
	},
	getContainer: function() {
		return this._getTable().rows[1].cells[0].getElementsByTagName('DIV')[0];
	},
	_toWaitingStatus: function() {
		var cell = this._getTitleCell();
		Element.removeClassName(cell,'status-normal');
		Element.addClassName(cell,'status-waiting');
		cell.innerHTML = Cavy.Dialog.resources['loading.text'];
	},
	_toNormalStatus: function() {
		var cell = this._getTitleCell();
		Element.removeClassName(cell,'status-waiting');
		Element.addClassName(cell,'status-normal');
		cell.innerHTML = this.title;
	},
	_getTitleCell: function() {
		return this._getTable().rows[0].cells[0];
	},
	_getCloseButtonCell: function() {
		return this._getTable().rows[0].cells[1];
	},
	_getTable: function() {
		return this.dlgEl.getElementsByTagName('TABLE')[0];
	},
	setWidth:function(width){
		this.dlgEl.style.width=width+'px';
		if (this.shim != null) {
			this.shim.style.width=width+'px';
		}
	}
}

/**
 * Abstract box
 */
Cavy.Box = Class.create();
Cavy.Box.prototype = {
	_initForms: function(el) {
		var form_nodes = $A(el.getElementsByTagName('FORM'));
		if (form_nodes == null) return;
		var pane = this;
		form_nodes.each(function(form_node) {
			if (form_node.onsubmit != null) {
				alert('onsubmit must be empty');
				throw $break;
			}
			form_node.onsubmit = pane._submitForm.bindAsEventListener(pane,el,form_node);
		});
	},
	_submitForm: function(event,el,form_node) {
		var pane = this;
		var params = Form.serialize(form_node);
		new Ajax.Request(form_node.action,{
			method: 'post',
			parameters: params,
			onComplete: function(transport) {
				pane.processResult(transport.responseText,el);
			}
		});
		return false;
	},
	processResult: function(responseText,container) {
		var html = responseText.stripScripts();
		var script = responseText.extractScripts();
		container.innerHTML = html;
		this._initForms(container);
		var paneObj = {onLoad:null,'container':container};
		eval("var pane = paneObj;");
		try {
        	if (typeof(script) == 'string') {
            	eval(script);
			}
            else {
            	for (var i=0; i<script.length; i++) {
                	eval(script[i]);
                }
            }
            if (paneObj.onload != null) {
            	paneObj.onload();
            }
            else if (paneObj.onLoad != null) {
				paneObj.onLoad();
            }
        }
        catch(e) {
        	alert('Pane script error:' + e);
		}		
	}
};

Cavy.Pane = Class.create();
Object.extend(Cavy.Pane.prototype,Cavy.Box.prototype); 
Object.extend(Cavy.Pane.prototype, {
	url: null,
	buttons: null,
	container: null,
	status: null,
	options: {},
	initialize: function(url,buttons,container,options) {
		this.url = url;
		this.buttons = buttons;
		this.container = container;
		this.options = Object.extend({
			status: 'max'
		},options);
		this._initActions();
		this.status = this.options.status;
		this._setStatus();
		if (this.status == 'max') {
			this.load();
		}
	},
	_initActions: function() {
		this.buttons['resize'].onclick = this.onResize.bindAsEventListener(this);
		this.buttons['refresh'].onclick = this.onReload.bindAsEventListener(this);
	},
	load: function() {
		this.container.innerHTML = 'Loading...';
		var paneObj = this;
		new Ajax.Request(this.url,{
			method: 'get',
			onComplete: function(transport) {
				paneObj.processResult(transport.responseText,paneObj.container);
			}
		});
	},
	onReload: function(event) {
		this.load();
		this.status = 'max';
		this._setStatus();
	},
	_setStatus: function() {
		if (this.status == 'min') {
			this.buttons['resize'].addClassName('min');
		}
		else {
			this.buttons['resize'].removeClassName('min');
		}
	},
	onResize: function(event) {
		if (this.status == 'min') {
			this.maximize();
		}
		else {
			this.minimize();
		}
	},
	maximize: function() {
		this.load();
		this.status = 'max';
		this._setStatus();
	},
	minimize: function() {
		this.container.innerHTML = '';
		this.status = 'min';
		this._setStatus();
	}
});

/**
 * ShrinkablePane
 */
var Shrinkable_contents = {};
function Shrinkable_switchImg(img,path) {
	if (img.src.indexOf('up.gif') > 0) {
		img.src = path + '/down.gif';
	}
	else {
		img.src = path + '/up.gif';
	}
}
Cavy.ShrinkablePane = Class.create();
Object.extend(Cavy.ShrinkablePane.prototype, Cavy.Box.prototype);
Object.extend(Cavy.ShrinkablePane.prototype,{
	elmt:null,
	min:null,
	duration:null,
	go_times:null,
	isExtended:null,
	options:{},
	initialize: function(el,min,duration,options) {
		this.elmt = $(el);
		this.min = min;
		this.duration = duration;
		this.go_times = 0;
		this.isExtended = true;
		if (options != null) this.options = options;
		this._initStatus();
		this._initForms(this.elmt);
	},
	_set_height: function(height) {
		if (height == '') {
			this.elmt.parentNode.style.height = '';
			this.elmt.style.height = '';
		}
		else {
			this.elmt.parentNode.style.height = height + 'px';
			this.elmt.style.height = height + 'px';
		}
	},
	_initStatus: function() {
		if (this.elmt.style.height == '') {
			this.max = parseInt(this.elmt.offsetHeight);
			//this.elmt.style.height = this.max + 'px';
			//this._set_height(this.max);
		}
		else {
			this.max = parseInt(this.elmt.style.height);
		}
		this.max = this.elmt.offsetHeight;
		if (this.options.min) {
		    this._to_min_status();
		}
	},
	_to_min_status: function() {
		Shrinkable_contents[this.elmt.id] = this.elmt.innerHTML; 
		this.elmt.innerHTML = ' ';
//	    this.elmt.style.height = this.min + 'px';
		this._set_height(this.min);
	    this.isExtended = false;
	},
	resize: function(callback) {
		if (this.isExtended) {
			this.shrink(callback);
		}
		else {
			this.spread(callback);
		}
	},
	shrink: function(callback) {
		if (window.resizeOptions != null) return;
		var times = parseInt(this.duration /10);
		var step = (this.max - this.min) / times;
		step = parseInt(step + 0.5);
		this.go_times = 0; 
		window.resizeOptions = {
			'panel':this,
			'step':step,
			'callback': function(panel, elmt, isExtended) {
				elmt.innerHTML = ' ';
				if (callback != null) callback(elmt,isExtended);
				elmt.style.position = 'relative';
			}
		};
		Shrinkable_contents[this.elmt.id] = this.elmt.innerHTML; 
		this.elmt.style.position = 'absolute';
		this._set_height(this.max);
		this._set_clip_box();
		this.elmt.innerHTML = Shrinkable_contents[this.elmt.id];
		this._enter_timer(this.on_timer_shrink);
	},
	spread: function (callback) {
		if (window.resizeOptions != null) return;
		var times = parseInt(this.duration /10);
		var step = (this.max - this.min) / times;
		step = parseInt(step + 0.5);
		this.go_times = 0; 
		window.resizeOptions = {
			'panel':this,
			'step':step,
			'callback': function(panel, elmt, isExtended) {
				if (callback != null) callback(elmt,isExtended);			
				elmt.style.position = 'relative';
			}
		};
		this.elmt.style.position = 'absolute';
		this._set_height(this.min);
		this._set_clip_box();
		if (browser.mozilla) {
			/* patch for firefox for firefox process clip box on delay. */
			this._set_clip_box();
		}
		this.elmt.innerHTML = Shrinkable_contents[this.elmt.id];
		this._enter_timer(this.on_timer_spread);
	},
	_set_clip_box: function() {
		var right = parseInt(this.elmt.offsetWidth);
		var bottom = parseInt(this.elmt.offsetHeight);
		this.elmt.style.clip = 'rect(0px,' + right + 'px,' + bottom + 'px,0px)';
	},
	_enter_timer: function(handler) {
		this.interval_handle = window.setInterval(handler,10);
	},
	on_timer_shrink: function() {
		var panel = window.resizeOptions['panel'];
		var step = window.resizeOptions['step'];
		var callback = window.resizeOptions['callback'];
		var h = parseInt(panel.elmt.style.height) - step;
		if (h <= panel.min) {
			window.clearInterval(panel.interval_handle);
			panel._set_height(panel.min);
			panel.elmt.style.clip = 'rect(auto auto auto auto)';
			panel.isExtended = !(panel.isExtended);
			window.resizeOptions = null; 
			if (callback != null) callback(panel,panel.elmt,panel.isExtended);
		}
		else {
			panel._set_height(h);
			panel._set_clip_box();
		}
	},
	on_timer_spread: function() {
		var panel = window.resizeOptions['panel'];
		var step = window.resizeOptions['step'];
		var callback = window.resizeOptions['callback'];
		var h = parseInt(panel.elmt.style.height) + step;
		if (h >= panel.max) {
			window.clearInterval(panel.interval_handle);
			panel._set_height('');
			panel.elmt.style.clip = 'rect(auto auto auto auto)';
			panel.isExtended = !(panel.isExtended);
			window.resizeOptions = null; 
			if (callback != null) callback(panel,panel.elmt,panel.isExtended);
		}
		else {
			panel._set_height(h);
			panel._set_clip_box();
		}
	}
});

Cavy.Slidebar = Class.create();
Cavy.Slidebar.prototype = {
	onChange: null,
	onDrag: null,
	dom: null,
	upHandle: null,
	moveHandle: null,
	offset: 8,
	start: {
		x:0,
		y:0
	},
	/**
	 * @param container dom element
	 * @param size size in px
	 * @param value int value between 0,100
	 * @param position 'horizontal' | 'vertical'
	 * @param onChange js callback function
	 * @param onDrag js callback function
	 */
	initialize: function(container,size,value,position,onChange,onDrag) {
		this.dom = new Cavy.Slidebar.Dom(container);
		this.hor = (position == 'horizontal');
		this.size = size;
		this.value = value;
		this.onChange = onChange;
		this.onDrag = onDrag;
		var btn = this.dom.getButton();
		btn.onmousedown = this.onMouseDown.bindAsEventListener(this);
	},
	setValue: function(value) {
		if (isNaN(value)) {
			alert(value + ' is not number');
			return;
		}
		value = parseInt(value);
		if (value > 100) value = 100;
		if (value < 0) value = 0;
		this.value = value;
		var now_pos = this.offset + (value * this.size / 100); 
		this.dom.moveButton(now_pos + "px",this.hor);
		this.onChange(value);
	},
	onMouseDown: function(event) {
		this.upHandle = this.onMouseUp.bindAsEventListener(this);
		Event.observe(window,'mouseup',this.upHandle);
		this.moveHandle = this.onMouseMove.bindAsEventListener(this)
		Event.observe(window,'mousemove',this.moveHandle);
		var slidebar = this;
		this.start = {x:event.clientX,y:event.clientY};
	},
	onMouseMove: function(event) {
		var now_value = this._queryNowValue(event);
		var now_pos = this.offset + (now_value * this.size / 100); 
		this.dom.moveButton(now_pos + "px",this.hor);
		this.onDrag(now_value);
	},
	_queryNowValue: function(event) {
		var distance = event.clientX - this.start.x;
		var now_value = parseInt(this.value + (distance * 100 / this.size) + 0.5);
		if (now_value > 100) now_value = 100;
		if (now_value < 0) now_value = 0;
		return now_value;
	},
	onMouseUp: function(event) {
		Event.stopObserving(window,'mousemove',this.moveHandle);
		Event.stopObserving(window,'mouseup',this.upHandle);
		this.value = this._queryNowValue(event);
		this.start = {x:null,y:null};
		this.onChange(this.value);
	}
};
Cavy.Slidebar.Dom = Class.create();
Cavy.Slidebar.Dom.prototype = {
	container: null,
	initialize: function(container) {
		this.container = $(container);
	},
	getButton: function() {
		return this.container.getElementsBySelector('P')[0];
	},
	moveButton: function(offset,hor) {
		if (hor)
			this.getButton().style.marginLeft = offset;
		else
			this.getButton().style.marginTop = offset;
	}
};

/**********************************************************
 * Browser Extensions
 **********************************************************/
Cavy.Window = {}
Cavy.Window.stop = function() {
	if (browser.ie) {
		document.execCommand('Stop')
	}
	else {
		window.stop();
	}
}

Cavy.util.DateResource = {};
Cavy.util.DateResource.MonthNames = {
    en: ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
    en_US: ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
    zh_CN: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
};
Cavy.util.DateResource.WeekNames = {
    en: ['S','M','T','W','T','F','S'],
    en_US: ['S','M','T','W','T','F','S'],
    zh_CN: ['日','一','二','三','四','五','六']
};
Cavy.util.DateResource.MonthDays = [31,28,31,30,31,30,31,31,30,31,30,31];
Cavy.util.DateResource.MonthDaysInLeapYear = [31,29,31,30,31,30,31,31,30,31,30,31];

Cavy.util.DateFormatter = {
    /**
     * @param format 'dd/mm/yyyy', 'mm/dd/yyyy' or 'yyyy-mm-dd'
     * @param dateStr date text
     */
    parse: function(format,dateStr) {
        switch (format) {
        case 'dd/mm/yyyy':
            var nums = dateStr.split('/');
            if (this._invalid(nums)) return null;
            return new Date(parseInt(nums[2]),parseInt(nums[1]-1),parseInt(nums[0]));
        case 'mm/dd/yyyy':
            var nums = dateStr.split('/');
            if (this._invalid(nums)) return null;
            return new Date(parseInt(nums[2]),parseInt(nums[0]-1),parseInt(nums[1]));
        case 'yyyy-mm-dd':
            var nums = dateStr.split('-');
            if (this._invalid(nums)) return null;
            return new Date(parseInt(nums[0]),parseInt(nums[1]-1),parseInt(nums[2]));
        }
    },
    /**
     * @param format 'dd/mm/yyyy', 'mm/dd/yyyy' or 'yyyy-mm-dd'
     * @param date Date object
     */
    format: function(format,date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (day < 10) day = "0" + day;
        if (month < 10) month = "0" + month;
        if (year < 10) year = "000" + year;
        else if (year < 100) year = "00" + year;
        else if (year < 1000) year = "0" + year;
        switch (format) {
        case 'dd/mm/yyyy':
            return "" + day + "/" + month + "/" + year;
        case 'mm/dd/yyyy':
            return "" + month + "/" + day + "/" + year;
        case 'yyyy-mm-dd':
            return "" + year + "-" + month + "-" + day;
        }
    },
    isFormatStr: function(str) {
        return (str == 'dd/mm/yyyy' || str == 'mm/dd/yyyy' || str == 'yyyy-mm-dd')
    },
    _invalid: function(nums) {
    	for(var k=0;k<3;k++) {
    		if (isNaN(parseInt(nums[k]))) {
    		    return true;
    		}
    	}
    	return false;
    }
};

Cavy.widgets.DatePickerDom = {
    wnd: 'date-picker',
    textbar: 'date-picker-text',
    showOn: function(textbox) {
        var pos = Position.cumulativeOffset(textbox);
        $(this.wnd).style.left = pos[0] + 'px';
        $(this.wnd).style.top = pos[1] + Element.getHeight(textbox) + 'px';
        Element.show($(this.wnd));
    },
    hide: function() {
        Element.hide($(this.wnd));
    },
    getGrid: function(row,clm) {
        var rownode = $(this.wnd).rows[2+row];
        if (rownode == null) alert('row:' + row + ';clm:' + clm);
        var grid = rownode.cells[clm];
        return grid;
    },
    fillWeekNames: function(weekNames) {
        var nameRow = $(this.wnd).rows[1];
        for (var i = 0; i < 7; i++ ) {
            nameRow.cells[i].innerHTML = weekNames[i];
        }
    },
    setText: function(text) {
        $(this.textbar).innerHTML = text;
    },
    inWnd: function(x,y) {
        var wnd = $(this.wnd);
        var pos = Position.cumulativeOffset(wnd);
        return (x >= pos[0] && x < pos[0] + wnd.getWidth()
            && y >= pos[1] && y < pos[1] + wnd.getHeight());
    }
};

Cavy.widgets.DatePicker = {
    textbox: null,
    curDate: null,
    dom: null,
    overGrid: null,
    formatStr: null,
    evtHandler: null,
    closed: true,
    oldTextBoxHandler: null,
    onOpen: function(event,textbox,formatStr,locale) {
        var event = event || window.event;
       	ASSERT(event != null,'event is null');
       	event.cancelBubble = true;
        if (!this.closed && Event.element(event) != this.textbox) {
        	this.close();
        }
        this.open(textbox,formatStr,locale);
    },
    onWndClick: function(event) {
        var event = event || window.event;
       	event.cancelBubble = true;
    },
    open: function(textbox,formatStr,locale) {
        this.dom = Cavy.widgets.DatePickerDom;
        this.locale = locale;
        this.formatStr = formatStr;
        this.textbox = textbox;
        if (!this._genCurrentDate()) return;

        this.dom.showOn(this.textbox);
        this.dom.fillWeekNames(Cavy.util.DateResource.WeekNames[this.locale]);
        this._fillData();
        this.closed = false;

        this.oldTextBoxHandler = this.textbox.onfocus;
		this.textbox.onfocus = null;
        this.evtHandler = this.onClose.bindAsEventListener(this);
        Event.observe(document,'click',this.evtHandler);
    },
    close: function() {
		if (this.evtHandler != null) {
	        Event.stopObserving(document,'click',this.evtHandler);
        }
        this.evtHandler = null;
        this.locale = null;
        this.formatStr = null;
        this.textbox.onfocus = this.oldTextBoxHandler;
        this.textbox = null;
        this.oldTextBoxHandler = null;
        this.dom.hide();
        
		for (var row = 0; row < 6; row++ ) {
            for (var clm = 0; clm < 7; clm ++ ) {
                var grid = this.dom.getGrid(row,clm);
       			grid.onmouseover=null;
       			grid.onmouseout=null;
       			grid.onclick = null;
            }
        }
        this.closed = true;
    },
    onClose: function(event) {
    	if (this.closed) {
    		return;
    	}
    	if (!this.closed && Event.element(event) == this.textbox) {
			// leave current wnd
			return;
        }
        if (!this.closed) {
	        var pos = Position.cumulativeOffset(this.textbox);
	        if (!this.dom.inWnd(event.clientX,event.clientY)) {
	            this.close();
	        }
        }
    },
    subMonth: function() {
        var new_month = this.curDate.getMonth() - 1;
        if (new_month < 0) {
            this.curDate.setFullYear(this.curDate.getFullYear() -1);
            this.curDate.setMonth(11);
        }
        else {
            this.curDate.setMonth(new_month);
        }
        this._fillData();
    },
    incMonth: function() {
        var new_month = this.curDate.getMonth() + 1;
        if (new_month >= 12) {
            this.curDate.setFullYear(this.curDate.getFullYear() + 1);
            this.curDate.setMonth(0);
        }
        else {
            this.curDate.setMonth(new_month);
        }
        this._fillData();
    },
    _genCurrentDate: function() {
        var curDate = null;
        if (Cavy.util.DateFormatter.isFormatStr(this.textbox.value))
            curDate = new Date();
        else
            curDate = Cavy.util.DateFormatter.parse(this.formatStr,this.textbox.value);
        if (curDate == null) {
            curDate = new Date();
        }
        this.curDate = curDate;
        return true;
    },
    _setMonthText: function() {
        this.dom.setText(this.curDate.getFullYear() + ' ' + Cavy.util.DateResource.MonthNames[this.locale][this.curDate.getMonth()]);
    },
    onGridOver: function(event,grid) {
        Element.addClassName(grid,'over');
        this.overGrid = grid;
    },
    onGridOut: function(event,grid) {
        Element.removeClassName(this.overGrid,'over');
        this.overGrid = null;
    },
    /**
     * @param day start from 1
     */
    onDaySelected: function(event,day) {
        var dt = new Date();
        dt.setFullYear(this.curDate.getFullYear());
        dt.setMonth(this.curDate.getMonth());
        dt.setDate(day);
        this.textbox.value = Cavy.util.DateFormatter.format(this.formatStr,dt);
        this.close();
    },
    /**
     * echo days in window
     */
    _fillData: function() {
        this._setMonthText();
    	now = new Date();
    	sd = now.getDate();
    	
    	var begin = new Date();
    	begin.setDate(1);
    	begin.setFullYear(this.curDate.getFullYear());
    	begin.setMonth(this.curDate.getMonth());
        
    	var isLeapYear = ((this.curDate.getFullYear() % 4 ) == 0);
    	var days = isLeapYear ? Cavy.util.DateResource.MonthDaysInLeapYear : Cavy.util.DateResource.MonthDays;
    	
    	var start_num = begin.getDay();
    	var end_num = begin.getDay() + days[begin.getMonth()];
        for (var row = 0; row < 6; row++ ) {
            for (var clm = 0; clm < 7; clm ++ ) {
                var grid = this.dom.getGrid(row,clm);
                var number = row * 7 + clm;
       		    grid.innerHTML = number - begin.getDay() + 1;
        		if (number >= start_num && number < end_num) {
        		    var day = number - begin.getDay() + 1;
        		    if (day == this.curDate.getDate()) {
            		    grid.className = 'grid-curday';
        		    }
        		    else {
            		    grid.className = 'grid-day';
        		    }
        			grid.onmouseover = this.onGridOver.bindAsEventListener(this,grid);
        			grid.onmouseout = this.onGridOut.bindAsEventListener(this,grid);
        			grid.onclick = this.onDaySelected.bindAsEventListener(this,number - begin.getDay() + 1);
        		}
        		else {
        		    grid.className = 'grid'; 
        			grid.onmouseover=null;
        			grid.onmouseout=null;
        			grid.onclick = null;
        		}
            }
        }
    }
    
};

Cavy.widgets.TabbedPane = Class.create();
Cavy.widgets.TabbedPane.prototype = {
	dom: null,
	titles: null,
	options: null,
	cbFuncs: null,
	tabs: null,
	actions: null,
	currTab: null,
	texts: null,
	initialize: function(titles,options,actions,cbFuncs,texts) {
		this.tabs = [];
		this.currTab = null;
		this.titles = titles;
		this.texts = Object.extend({
			'delete.confirm': 'do you confirm to delete this tab'
		},texts);
		this.options = Object.extend({
			'useIcon': false,
			'autoRefresh': 0,
			'cookieId': null // save on cookie if set
		},options);
		if (this.options.expandable) {
			this.actions = actions;
			// default includes remove, rename, refresh buttons
			this.actions.push('refresh');
			this.actions.push('rename');
			this.actions.push('delete');
			this.actions = this.actions.uniq().reverse();
		}
		this.cbFuncs = Object.extend({
			'onTabAdd':function(tabObj){
				alert('Please listen to onTabAdd event');
			},
			'onTabInit':function(tabObj){
				// do nothing
			},
			'onTabDelete': function(tabObj) {
				alert('Please listen to onTabRemove event');
				return true;
			},
			'onTabRename': function(tabObj) {
				alert('Please listen to onTabRename event');
				return true;
			}
		},cbFuncs);
		this.dom = new Cavy.widgets.TabbedPane.Dom(this.options);
		this._bindListeners();
		this._initTabs();
		this._initMenuItems();

		if (this.options.autoRefresh > 0) {
			var dom = this.dom;
			var pane = this;
			var interval = this.options.autoRefresh;
			new PeriodicalExecuter(function(pe) {
				if (pane.currTab != null) {
					dom.refreshContent(pane.currTab.url);
				}
			},interval);
		}
	},
	_initTabs: function() {
		var activeTab = null;
		if (this.options.expandable) {
			var i;
			var keys = Object.keys(this.titles);
			var pane = this;
			keys.each(function(key) {
				var tabObj = pane.dom.addTab(pane.tabs.length +1,key);
				tabObj.url = pane.titles[key];
				pane.addTab(tabObj,false);
				if (activeTab == null) activeTab = tabObj;
			});
		}
		else {
			var i;
			// only active first tab
			var pane = this;
			var keys = Object.keys(this.titles);
			keys.each(function(key) {
				var tabObj = pane.dom.addTab(pane.tabs.length +1,key);
				tabObj.url = pane.titles[key];
				pane.addTab(tabObj,false);
				
				var isActive = false;
				if (pane.options.cookieId) {
					var value = Cavy.Cookie.getCookie(pane.options.cookieId);
					if (value == null) {
						isActive = (pane.options.activeTabs.indexOf(key) >= 0);
					}
					else {
						// get from cookie
						var urls = value.split(',');
						var decodeUrls = [];
						var i;
						for (i=0; i<urls.length; i++) {
							decodeUrls.push(Cavy.Base64.decode(urls[i]));
						}
						isActive = (decodeUrls.indexOf(tabObj.url) >= 0);
					}
				}
				
				if (isActive) {
					tabObj.active = true;
					if (activeTab == null) activeTab = tabObj;
				}
				else {
					tabObj.enabledNode.style.display = 'none';
					tabObj.disabledNode.style.display = 'none';
					tabObj.active = false;
				}
			});
		}
		this.dom.refreshBlank();
		if (activeTab != null) {
			this.loadTab(activeTab);
		}
		this._checkCommentNode();
	},
	_initMenuItems: function() {
		var dom = this.dom;
		var tabbedpane = this;
		if (this.options.expandable) {
			this.actions.each(function(action) {
				var cbfunc = action;
				ASSERT('action.length must be more than 1',action.length > 1);
				var f = cbfunc.charAt(0).toUpperCase();
				cbfunc = f + cbfunc.substr(1,cbfunc.length - 1);
				var func = null;
				if (tabbedpane['_onTab' + cbfunc]) {
					func = eval('tabbedpane._onTab' + cbfunc + '.bindAsEventListener(tabbedpane)');
				}
				else if (tabbedpane.cbFuncs['onTab' + cbfunc]){
					func = tabbedpane._onTabCustomeEvent.bindAsEventListener(tabbedpane,action);
				}
				else {
					alert('onTab' + cbfunc + " undefined");
				}
				dom.addTabMenuItem(action,func);
			}); 
		}
	},
	_bindListeners: function() {
		if (this.options.expandable) {
			var addBtn = this.dom.getAddButton();
			addBtn.onclick = this._onTabAdd.bindAsEventListener(this);
		}
		if (this.options.selectable) {
			var selectBtn = this.dom.getSelectButton();
			ASSERT('select button is null', selectBtn != null);
			selectBtn.onclick = this._onSelectMenuButtonClicked.bindAsEventListener(this);
		}
	},
	_saveOnCookie: function() {
		if (this.options.cookieId == null || !this.options.selectable) return;
		var value = '';
		this.tabs.each(function(tab){
			if (!tab.active) return;
			value += Cavy.Base64.encode(tab.url) + ",";
			//value += tab.url + ",";
		});
		Cavy.Cookie.setCookie(this.options.cookieId,value,60);
	},
	addTab: function(tabObj,cbFlag) {
		var tabbedPane = this;
		var titleNode = this.dom.getTitleNode(tabObj.enabledNode);
		var title = tabObj.title;
		if (this.options.expandable) {
			var inplaceEditor = new Cavy.widgets.InplaceEditor(titleNode,title.length,function(text) {
				if (tabbedPane.cbFuncs.onTabRename(tabObj,text)) {
					tabbedPane.renameTab(tabObj,text);
				}
				else {
					tabbedPane.renameTab(tabObj,tabObj.title);
				}
			},{'notnull':false});
			tabObj.inplaceEditor = inplaceEditor;
		}
		if (cbFlag) {
			this.cbFuncs.onTabAdd(tabObj);
		}
		else {
			this.cbFuncs.onTabInit(tabObj);
		}
		this.tabs.push(tabObj);
		var lisn = this._onTabClicked.bindAsEventListener(this,tabObj);
		tabObj.disabledNode.onclick = lisn;
		this._checkCommentNode();
	},
	loadBlank: function() {
		this.dom.refreshBlank();
	},
	loadTab: function(tabObj) {
		this.dom.activate(this.tabs,tabObj);
		this.dom.refreshContent(tabObj.url);
		this.currTab = tabObj;
	},
	renameTab: function(tabObj,title) {
		tabObj.title = title;
		this.dom.setTabTitle(tabObj.disabledNode,title);
		this.dom.setTabTitle(tabObj.enabledNode,title);
		return true;
	},
	_onTabClicked: function(event,tabObj) {
		this.loadTab(tabObj);
	},
	_onTabCustomeEvent: function(event,action) {
		this.dom.hideTabMenu(this.currTab);
		var cbfunc = action;
		var f = cbfunc.charAt(0).toUpperCase();
		cbfunc = f + cbfunc.substr(1,cbfunc.length - 1);
		eval('this.cbFuncs.onTab' + cbfunc + '(this.currTab)');
	},
	_onTabRename: function(event) {
		var tabObj = this.currTab;
		tabObj.inplaceEditor.enable();
		this.dom.hideTabMenu(tabObj);
		event.cancelBubble = true;
	},
	_onTabRefresh: function(event) {
		var tabObj = this.currTab;
		var pane = this.dom.getContentPane();
		this.dom.hideTabMenu(tabObj);
		this.dom.refreshContent(tabObj.url);
		/*
		new Ajax.Updater(pane,tabObj.url,{
			parameters: 'ts=' + timestamp()
		});
		*/
	},
	_onTabDelete: function(event) {
		var tabObj = this.currTab;
		this.dom.hideTabMenu(tabObj);
		var res = this.cbFuncs.onTabDelete(tabObj);
		if (res) {
			this.dom.deleteTab(tabObj);
			// activate last tab
			var index = this.tabs.indexOf(tabObj);
			this.tabs.splice(index,1);
			this._autoSwitchTab(index);
			this._checkCommentNode();
		}
//		else {
//			alert('Tab cannot be deleted');
//		}
		event.cancelBubble = true;
	},
	_checkCommentNode: function() {
		var activeCount = 0;
		if (this.options.expandable) activeCount = this.tabs.length;
		else {
			var i;
			for (i=0; i<this.tabs.length;i++) {
				if (this.tabs[i].active) activeCount ++;
			}
		}
		if (activeCount == 0) {
			this.dom.addComment();
		}
		else {
			this.dom.removeComment();
		}
	},
	_autoSwitchTab: function(index) {
			if (this.options.expandable) {
				if (index == 0 && this.tabs.length > 0) {
					var lastTab = this.tabs[0];
					this.loadTab(lastTab);
				}
				else if (this.tabs.length > index-1 && index-1 >=0) {
					var lastTab = this.tabs[index-1];
					this.loadTab(lastTab);
				}
				else {
					this.loadBlank();
				}
			}
			else {
				// search ahead
				var lastTab = null;
				var i;
				for (i=index;i>=0;i--) {
					var tab = this.tabs[i];
					if (tab.active) {
						lastTab = tab;
					}
				}
				// search 
				for (i=index;i<this.tabs.length;i++) {
					var tab = this.tabs[i];
					if (tab.active) {
						lastTab = tab;
					}
				}
				if (lastTab)
					this.loadTab(lastTab);
				else
					this.loadBlank();
			
			}
	},
	_onTabAdd: function(event) {
		var num = this.tabs.length + 1;
		var tabObj = this.dom.addTab(num);
		this.addTab(tabObj,true);
		this.loadTab(tabObj);
	},
	_onSelectMenuButtonClicked: function(event) {
		if (this.dom.isSelectMenuPoped()) {
			this.dom.hideSelectMenu();
		}
		else {
			this.dom.showSelectMenu();
			this._fillSelectMenuItems();
		}
	},
	_onSelectItemClicked: function(checked,title) {
		if (checked) {
			var activeTab;
			this.tabs.each(function(tab) {
				if (tab.title == title && !tab.active) {
					activeTab = tab;
					throw $break;
				}
			});
			// activate
			//activeTab.enabledNode.style.display = 'none';
			activeTab.disabledNode.style.display = '';
			activeTab.active = true;
			if (this.currTab == null) {
				this.loadTab(activeTab);
			}
		}
		else {
			var inactiveTab;
			this.tabs.each(function(tab) {
				if (tab.title == title && tab.active) {
					inactiveTab = tab;
					throw $break;
				}
			});
			// inactivate
			inactiveTab.enabledNode.style.display = 'none';
			inactiveTab.disabledNode.style.display = 'none';
			inactiveTab.active = false;
			if (inactiveTab == this.currTab) {
				this.currTab = null;
				var i=0;
				var index = 0;
				for (i=0;i<this.tabs;i++) {
					if (this.tabs[i].active) {
						index ++;
					}
				}
				this._autoSwitchTab(index);
//				this.dom.refreshBlank();
			}
		}
		this._checkCommentNode();
		this._saveOnCookie();
	},
	_fillSelectMenuItems: function() {
		//this.selectMenuNode.innerHTML = '';
		checkList = {};
		var tabbedpane = this;
		Object.keys(this.titles).each(function(title) {
			var i;
			found = false;
			for (i=0; i<tabbedpane.tabs.length;i++) {
				var tab = tabbedpane.tabs[i];
				if (tab.active && title == tab.title) {
					found = true;
				}
			}
			checkList[title] = found;
		});
		var checkLisn = function(checked,title) {
			tabbedpane._onSelectItemClicked(checked,title);
		};
		//this._onSelectItemClicked.bindAsEventListener(this);
		this.dom.fillSelectMenuItems(checkList,checkLisn);
	}
};
Cavy.widgets.TabbedPane.Dom = Class.create();
Cavy.widgets.TabbedPane.Dom.prototype = {
	pane: null,
	options: null,
	cont: null,
	tabMenuNode: null,
	contentPane: null,
	currTab: null,
	selectBtn: null,
	selectShim: null,
	selectMenuPoped: false,
	initialize: function(options) {
		this.options = options;
		this.tpl = $('__tabbed-pane-tpl');
		var tplPane = this.tpl.getElementsByClassName('_pane')[0];
		this.pane = tplPane.cloneNode(true);
		document.body.appendChild(this.pane);
		this.cont = this.pane.getElementsByClassName('_container')[0];
		ASSERT('cont is null',this.cont != null);
		if (this.options.expandable) {
			this._insertAddButton();
			this._createTabMenu();
		}
		if (this.options.selectable) {
			this._createSelectButton();
			//this._createSelectMenu();
		}
		var div = this.pane.getElementsByClassName('content')[0];
		var iframe = this.pane.getElementsByClassName('content')[1];
		if (this.options.iframe) {
			this.contentPane = iframe;
			div.parentNode.removeChild(div);
		}
		else {
			this.contentPane = div;
			iframe.parentNode.removeChild(iframe);
		}
	},
	addComment: function() {
		if (this._getCommentNode() != null) return;
		var cls = this.options.expandable ? '_comment-node-add' : '_comment-node-select';
		var tplnode = this.tpl.getElementsByClassName(cls)[0].rows[0].cells[0];
		var last_cell = this.cont.getElementsByClassName('_border')[0];
		//var node = tplnode.cloneNode(true);
		var node = last_cell.parentNode.insertCell(-1);
		node.className = tplnode.className;
		node.innerHTML = tplnode.innerHTML;
		last_cell.parentNode.insertBefore(node,last_cell);
		//node.getElementsByTagName('DIV').item(0).innerHTML = text;
	},
	removeComment:function() {
		var node = this._getCommentNode();
		if (node != null)
			node.parentNode.removeChild(node);
	},
	_getCommentNode:function() {
		var nodes = this.cont.getElementsByClassName('_comment-cell');
		if (nodes != null && nodes.length > 0) {
			return nodes[0];
		}
		else
			return null;
	},
	refreshBlank: function() {
		if (this.options.iframe) {
			this.contentPane.src = this.options.blankPage;
		}
		else {
			this.contentPane.innerHTML = '';
		}
	},
	refreshContent: function(url) {
		if (this.options.iframe) {
			this.contentPane.src = url;
		}
		else {
//			this.contentPane.innerHTML = '';
			new Ajax.Updater(this.contentPane,url,{evalScripts:true});
		}
	},
	deleteTab: function(tabObj) {
		this.cont.removeChild(tabObj.enabledNode);
		this.cont.removeChild(tabObj.disabledNode);
	},
	addTab: function(num,title) {
		var enabledNode = null;
		var disabledNode = null;
		enabledNodeTpl = this.tpl.getElementsByClassName('_enabled-tab')[0].getElementsByTagName('TD').item(0);
		disabledNodeTpl = this.tpl.getElementsByClassName('_disabled-tab')[0].getElementsByTagName('TD').item(0);
		ASSERT('enabledNode create failed',enabledNodeTpl != null);
		ASSERT('disabledNode create failed',disabledNodeTpl != null);
		
		var enabledNode = this._newTabNode();
		enabledNode.innerHTML = enabledNodeTpl.innerHTML;
		enabledNode.className = enabledNodeTpl.className;
		enabledNode.style.display = 'none';
		
		var disabledNode = this._newTabNode();
		disabledNode.innerHTML = disabledNodeTpl.innerHTML;
		disabledNode.className = disabledNodeTpl.className;
		disabledNode.style.display = '';

		var contNode = null;
		if (Prototype.Browser.IE) {
			contNode = Element.getElementsByClassName(enabledNode,'current')[0];
		}
		else {
			contNode = enabledNode.getElementsByClassName('current')[0];
		}
		var beforeNode = contNode.getElementsByTagName('IMG').item(0);
		ASSERT('beforeNode is null', beforeNode != null);
		var tabNode = null;
		if (this.options.useIcon) {
			tabNode = this.tpl.getElementsByClassName('_icon-tab')[0].cloneNode(true);
		}
		else {
			tabNode = this.tpl.getElementsByClassName('_noicon-tab')[0].cloneNode(true);
		}
		
		beforeNode.parentNode.insertBefore(tabNode,beforeNode);
		if (title == null) {
			title = this.getTabTitle(enabledNode) + " " + num;
		}
		this.setTabTitle(enabledNode,title);
		this.setTabTitle(disabledNode,title);

		var tabObj = {'enabledNode':enabledNode,'disabledNode':disabledNode,'title':title,'menuPoped':false};
		if (this.options.expandable) {
			var menuBtn = enabledNode.getElementsByTagName('IMG').item(0);
			menuBtn.onclick = this._onTabMenuClicked.bindAsEventListener(this,tabObj);
		}
		else {
			var menuBtn = enabledNode.getElementsByTagName('IMG').item(0);
//			menuBtn.parentNode.removeChild(menuBtn);
			// hide down icon
			Element.addClassName(menuBtn.parentNode,'hidden');
		}
		tabObj.menuBtn = menuBtn;
		return tabObj;
	},
	hideTabMenu: function(tabObj) {
		var parent = this.tabMenuNode.parentNode;
		//var menuCont = tabObj.enabledNode.getElementsByClassName('current')[0];
		this.tabMenuNode.style.display = 'none';

		if (this.tabMenuShim != null) {
			//this.tabMenuShim.className = '';
			parent.removeChild(this.tabMenuShim);
			document.body.appendChild(this.tabMenuShim);
		}

		parent.removeChild(this.tabMenuNode);
		document.body.appendChild(this.tabMenuNode);
		
		if (this.tabMenuShim) this.tabMenuShim.style.display = 'none';
		tabObj.menuPoped = false;
	},
	showTabMenu: function(tabObj) {
		var parent = this.tabMenuNode.parentNode;
		var menuCont = tabObj.enabledNode.getElementsByClassName('current')[0].parentNode;

		parent.removeChild(this.tabMenuNode);
		menuCont.appendChild(this.tabMenuNode);

		if (this.tabMenuShim != null) {
			parent.removeChild(this.tabMenuShim);
			this.tabMenuShim.style.display = '';
			menuCont.insertBefore(this.tabMenuShim,this.tabMenuNode);
			//this.tabMenuShim.className = this.tabMenuShim.getAttribute('classbak');
			//with(this.tabMenuShim.style) {
//				position = absolute;
//				zIndex = 50;
//				width = this.nextSibling.offsetWidth;
//				height = this.nextSibling.offsetHeight;
//			}
		}

		
		this.tabMenuNode.style.display = '';
		/* 
		var btn_pos = Position.cumulativeOffset(tabObj.menuBtn);
		var setPos = {
			'x': btn_pos[0] + 10,
			'y': btn_pos[1] + 24
		};
		with(this.tabMenuNode) {
			style.zIndex = 100;
			style.top = setPos.y;
			style.left = setPos.x;
		}
		var pos = Position.cumulativeOffset(this.tabMenuNode);
		var menunode = this.tabMenuNode;
		if (this.tabMenuShim) this.tabMenuShim.style.display = '';
		if (this.tabMenuShim) {
			with(this.tabMenuShim) {
				style.position = 'absolute';
				style.zIndex = 50;
				style.width = menunode.offsetWidth;
				style.height = menunode.offsetHeight;
				style.top = setPos.y;
				style.left = setPos.x;
				style.display = '';
			}
		}
		 */

		tabObj.menuPoped = true;
	},
	_onTabMenuClicked: function(event,tabObj) {
		var parent = this.tabMenuNode.parentNode;
		var menuCont = tabObj.enabledNode.getElementsByClassName('current')[0];
		if (tabObj.menuPoped) {
			// hide
			this.hideTabMenu(tabObj);
		}
		else {
			// show
			this.showTabMenu(tabObj);
		}
		event.cancelBubble = true;
	},
	getContentPane: function() {
		return this.contentPane;
	},
	_createTabMenu: function() {
		var shimtpl = this.tpl.getElementsByClassName('_enabled-tab-menu-shim')[0].getElementsByTagName('IFRAME').item(0);
		if (browser.ie) {
			this.tabMenuShim = document.createElement('IFRAME');
			//this.tabMenuShim.setAttribute('classbak',shimtpl.getAttribute('classbak'));
			this.tabMenuShim.src = this.options.blankPage;
			this.tabMenuShim.style.display = 'none';
			document.body.appendChild(this.tabMenuShim);
		}
		var menutpl = this.tpl.getElementsByClassName('_enabled-tab-menu')[0];
		var menunode = menutpl.cloneNode(true);
		menunode.innerHTML = '';
		document.body.appendChild(menunode);
		this.tabMenuNode = menunode;
		
		if (browser.ie) {
			this.tabMenuShim.className = shimtpl.getAttribute('classbak');
		}
	},
	_createSelectButton: function() {
		var cont = this.tpl.getElementsByClassName('_select-tab-btn')[0];
		var btntpl = cont.getElementsByTagName('TD').item(0);
		var cell = this._appendCell();
		cell.className = btntpl.className;
		cell.innerHTML = btntpl.innerHTML;
		if (browser.ie) {
			this.selectShim = cell.getElementsByTagName('IFRAME').item(0);
		}
		else {
			var shim = cell.getElementsByTagName('IFRAME').item(0);
			shim.parentNode.removeChild(shim);
		}
		this.selectBtn = cell.getElementsByTagName('IMG').item(0);
		ASSERT('select btn is null', this.selectBtn != null);
		
//		var menutpl = this.tpl.getElementsByClassName('_select-menu')[0];
//		var menunode = menutpl.cloneNode(true);
		this.selectMenuNode = cell.getElementsByTagName('DIV').item(0);
		this.selectMenuNode.innerHTML = '';
//		menunode.innerHTML = '';
//		document.body.appendChild(menunode);
		//cell.appendChild(menunode);
//		this.selectMenuNode = menunode;
		if (this.selectShim != null) {
			this.selectShim.className = this.selectShim.getAttribute('classbak');
			this.selectShim.style.display = 'none';
		}
	},
		/*
	_createSelectMenu: function() {
		var menutpl = this.tpl.getElementsByClassName('_select-menu')[0];
		var menunode = menutpl.cloneNode(true);
		menunode.innerHTML = '';
		document.body.appendChild(menunode);
		this.selectMenuNode = menunode;
	},
		*/
	isSelectMenuPoped: function() {
		return this.selectMenuPoped;
	},
	hideSelectMenu: function() {
		if (this.selectShim != null) this.selectShim.style.display = 'none';
		this.selectMenuNode.style.display = 'none';
		//document.body.appendChild(this.selectMenuNode);
		this.selectMenuPoped = false;
	},
	showSelectMenu: function(tabObj) {
		if (this.selectShim != null) {
			ASSERT("shim is error",this.selectShim.nextSibling.nodeName == 'DIV');
		}
		if (this.selectShim != null) {
			this.selectShim.style.display = '';
//			this.selectShim.className = this.selectShim.className;
		}
		this.selectMenuNode.style.display = '';
		this.selectMenuPoped = true;
	},
	fillSelectMenuItems: function(checkList,checkLisn) {
		this.selectMenuNode.innerHTML = '';
		var keys = Object.keys(checkList);
		var dom = this;
		keys.each(function(key) {
			dom._insertSelectMenuItem(key,checkList[key],checkLisn);
		});
	},
	_insertSelectMenuItem: function(title,checked,checkLisn) {
		var itemtpl = this.tpl.getElementsByClassName('_select-menu-item')[0].getElementsByTagName('A').item(0);
		var menuitem = itemtpl.cloneNode(true);
		var label = menuitem.getElementsByTagName('LABEL').item(0);
		label.innerHTML = title;
		this.selectMenuNode.appendChild(menuitem);

		var checkbox = menuitem.getElementsByTagName('INPUT').item(0);
		checkbox.name = title;
		var dom = this;
		checkbox.onclick = function() {
			checkLisn.call(null,checkbox.checked,title);
		};
		checkbox.checked = checked;
		return menuitem;
	},
	addTabMenuItem: function(type,cbFunc) {
		var menutpl = this.tpl.getElementsByClassName('_enabled-tab-menu')[0];
		var itemTpl = menutpl.getElementsByClassName(type)[0];
		var item = itemTpl.cloneNode(true);
		this.tabMenuNode.appendChild(item);
		item.onclick = cbFunc;
	},
	_insertAddButton: function() {
		var cont = this.tpl.getElementsByClassName('_add-tab-btn')[0];
		var btntpl = cont.getElementsByTagName('TD').item(0);
		var cell = this._appendCell();
		cell.className = btntpl.className;
		cell.innerHTML = btntpl.innerHTML;
		return cell;
	},
	_appendCell: function() {
		var last_cell = this._getCommentNode();
		if (last_cell == null) {
			last_cell = this.cont.getElementsByClassName('_border')[0];
		}
		var cell = this.cont.insertCell(last_cell.cellIndex);
		return cell;
	},
	_newTabNode: function() {
		var last_btn = this.options.selectable ? this.getSelectButton() : this.getAddButton();
		var last_cell = last_btn.parentNode;
		ASSERT('index >= 0',last_cell.cellIndex >= 0);
		var cell = this.cont.insertCell(last_cell.cellIndex);
		return cell;
	},
	getAddButton: function() {
		if (this.options.expandable)
			return this.pane.getElementsByClassName('__add-tab-btn')[0];
		return null;
	},
	getSelectButton: function() {
		return this.selectBtn;
	},
	activate: function(tabs,tab) {
		var i=0;
		for(i=0; i<tabs.length; i++) {
			if (this.options.selectable) {
				if (!tabs[i].active) continue;
			}
			if (tabs[i].enabledNode == tab.enabledNode) {
				// active
				tabs[i].enabledNode.style.display = '';
				tabs[i].disabledNode.style.display = 'none';
			}
			else {
				// inactive
				tabs[i].enabledNode.style.display = 'none';
				tabs[i].disabledNode.style.display = '';
			}
		}
		var e_tabs = this.cont.getElementsByClassName('__enabled-tab');
		var d_tabs = this.cont.getElementsByClassName('__disabled-tab');
	},
	getTabTitle: function(tabNode) {
		var titleNode = this.getTitleNode(tabNode);
		return titleNode.innerHTML;
	},
	setTabTitle: function(tabNode,title) {
		var titleNode = this.getTitleNode(tabNode);
		titleNode.innerHTML = title;
	},
	getTitleNode: function(tabNode) {
		var titleNode = null;
		if (Element.hasClassName(tabNode,'__enabled-tab')) {
			titleNode = tabNode.getElementsByTagName('B').item(0); 
		}
		else {
			titleNode = tabNode;
		}
		if (titleNode == null) {
			alert(tabNode.innerHTML);
		}
		ASSERT('titleNode is null',titleNode != null);
		return titleNode;
	}
};

Cavy.widgets.InplaceEditor = Class.create();
Cavy.widgets.InplaceEditor.prototype = {
	text: null,
	ctrl: null,
	size: 20,
	el: null,
	onComplete: null,
	options: null,
	initialize: function(el,size,onComplete) {
		this.el = $(el);
		this.text = this.el.childNodes[0].nodeValue;
		this.size = size;
		this.onComplete = onComplete;
		this._createControl();
		this.el.onclick = this.enable.bindAsEventListener(this);
	},
	enable: function() {
		Element.show(this.ctrl);
		Element.hide(this.el);
		this.ctrl.value = this.text;
		this.ctrl.select();
		this.ctrl.focus();
	},
	focus: function() {
		this.ctrl.select();
		this.ctrl.focus();
	},
	disable: function() {
		Element.hide(this.ctrl);
		Element.show(this.el);
	},
	_onComplete: function(event) {
		event.cancelBubble = true;
		this.text = this.ctrl.value;
		this.el.childNodes[0].nodeValue = this.text;
		this.onComplete(this.text);
		this.disable();
	},
	_createControl: function() {
		var parent = this.el.parentNode;
		var ctrl = document.createElement('INPUT');
		with(ctrl) {
			type = 'text';
			className = 'inplace-editor';
			size = this.size;
		}
		if (this.el.nextSibling == null) {
			parent.appendChild(ctrl);
		}
		else {
			parent.insertBefore(ctrl,this.el);
		}
		this.ctrl = ctrl;

		var onComplete = this.onComplete;
		ctrl.onblur = this._onComplete.bindAsEventListener(this);
		ctrl.onkeypress = function(event) {
			event = event || window.event;
			if (event.keyCode == Event.KEY_RETURN) {
				ctrl.blur();
			}
		};
		this.disable();
	}
};

Cavy.Base64 = {
    /**
     * 此变量为编码的key，每个字符的下标相对应于它所代表的编码。
     */
    enKey: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    /**
     * 此变量为解码的key，是一个数组，BASE64的字符的ASCII值做下标，所对应的就是该字符所代表的编码值。
     */
    deKey: new Array(
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
        52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
        -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
        -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
    ),
    /**
     * 编码
     */
    encode: function(src){
        //用一个数组来存放编码后的字符，效率比用字符串相加高很多。
        var str=new Array();
        var ch1, ch2, ch3;
        var pos=0;
       //每三个字符进行编码。
        while(pos+3<=src.length){
            ch1=src.charCodeAt(pos++);
            ch2=src.charCodeAt(pos++);
            ch3=src.charCodeAt(pos++);
            str.push(this.enKey.charAt(ch1>>2), this.enKey.charAt(((ch1<<4)+(ch2>>4))&0x3f));
            str.push(this.enKey.charAt(((ch2<<2)+(ch3>>6))&0x3f), this.enKey.charAt(ch3&0x3f));
        }
        //给剩下的字符进行编码。
        if(pos<src.length){
            ch1=src.charCodeAt(pos++);
            str.push(this.enKey.charAt(ch1>>2));
            if(pos<src.length){
                ch2=src.charCodeAt(pos);
                str.push(this.enKey.charAt(((ch1<<4)+(ch2>>4))&0x3f));
                str.push(this.enKey.charAt(ch2<<2&0x3f), '=');
            }else{
                str.push(this.enKey.charAt(ch1<<4&0x3f), '==');
            }
        }
       //组合各编码后的字符，连成一个字符串。
        return str.join('');
    },
    /**
     * 解码。
     */
    decode: function(src){
        //用一个数组来存放解码后的字符。
        var str=new Array();
        var ch1, ch2, ch3, ch4;
        var pos=0;
       //过滤非法字符，并去掉'='。
        src=src.replace(/[^A-Za-z0-9\+\/]/g, '');
        //decode the source string in partition of per four characters.
        while(pos+4<=src.length){
            ch1=this.deKey[src.charCodeAt(pos++)];
            ch2=this.deKey[src.charCodeAt(pos++)];
            ch3=this.deKey[src.charCodeAt(pos++)];
            ch4=this.deKey[src.charCodeAt(pos++)];
            str.push(String.fromCharCode(
                (ch1<<2&0xff)+(ch2>>4), (ch2<<4&0xff)+(ch3>>2), (ch3<<6&0xff)+ch4));
        }
        //给剩下的字符进行解码。
        if(pos+1<src.length){
            ch1=this.deKey[src.charCodeAt(pos++)];
            ch2=this.deKey[src.charCodeAt(pos++)];
            if(pos<src.length){
                ch3=this.deKey[src.charCodeAt(pos)];
                str.push(String.fromCharCode((ch1<<2&0xff)+(ch2>>4), (ch2<<4&0xff)+(ch3>>2)));
            }else{
                str.push(String.fromCharCode((ch1<<2&0xff)+(ch2>>4)));
            }
        }
       //组合各解码后的字符，连成一个字符串。
        return str.join('');
    }
};

Cavy.Encoder = {
	utf16to8: function(str) {
	    var out, i, len, c;

	    out = "";
	    len = str.length;
	    for(i = 0; i < len; i++) {
	        c = str.charCodeAt(i);
	        if ((c >= 0x0001) && (c <= 0x007F)) {
	            out += str.charAt(i);
	        } else if (c > 0x07FF) {
	            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
	            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
	            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
	        } else {
	            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
	            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
	        }
	    }
	    return out;
	},
	utf8to16: function(str) {
	    var out, i, len, c;
	    var char2, char3;

	    out = "";
	    len = str.length;
	    i = 0;
	    while(i < len) {
	        c = str.charCodeAt(i++);
	        switch(c >> 4){
	          case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
	            // 0xxxxxxx
	            out += str.charAt(i-1);
	            break;
	          case 12: case 13:
	            // 110x xxxx   10xx xxxx
	            char2 = str.charCodeAt(i++);
	            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
	            break;
	          case 14:
	            // 1110 xxxx  10xx xxxx  10xx xxxx
	            char2 = str.charCodeAt(i++);
	            char3 = str.charCodeAt(i++);
	            out += String.fromCharCode(((c & 0x0F) << 12) |
	                                           ((char2 & 0x3F) << 6) |
	                                           ((char3 & 0x3F) << 0));
	            break;
	        }
	    }
	
	    return out;
	}
};

Cavy.Cookie = {
	
	getCookie: function( name ) {
		var start = document.cookie.indexOf( name + "=" );
		var len = start + name.length + 1;
		if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) {
			return null;
		}
		if ( start == -1 ) return null;
		var end = document.cookie.indexOf( ';', len );
		if ( end == -1 ) end = document.cookie.length;
		return unescape( document.cookie.substring( len, end ) );
	},
	
	setCookie: function( name, value, expires, path, domain, secure ) {
		var today = new Date();
		today.setTime( today.getTime() );
		if ( expires ) {
			expires = expires * 1000 * 60 * 60 * 24;
		}
		var expires_date = new Date( today.getTime() + (expires) );
		document.cookie = name + '=' + escape( value ) +
			( ( expires ) ? ';expires=' + expires_date.toGMTString() : '' ) + //expires.toGMTString()
			( ( path ) ? ';path=' + path : '' ) +
			( ( domain ) ? ';domain=' + domain : '' ) +
			( ( secure ) ? ';secure' : '' );
	},
	
	deleteCookie: function ( name, path, domain ) {
		if ( getCookie(name)) {
			document.cookie = name + '=' +
			( ( path ) ? ';path=' + path : '') +
			( ( domain ) ? ';domain=' + domain : '' ) +
			';expires=Thu, 01-Jan-1970 00:00:01 GMT';
		}
	}
};