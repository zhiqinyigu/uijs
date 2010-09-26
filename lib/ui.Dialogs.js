UI.Dialogs = function(o) {

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
}
UI.Dialogs.prototype = {
	
}
UI.Dialogs.cache = [];
UI.Dialogs.location = null; //Window Location Cache To Refresh Page