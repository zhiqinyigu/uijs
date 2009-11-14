UI.resize = function(n,config) {
	var arr = UI.isObject(n) ? [n] : UI.GC(n);
	UI.each(arr,function(o){
		if('TEXTAREA,SELECT,INPUT,BUTTON,IMG'.hasString(o.nodeName)) {
			var tipBox = '',title = ''; //Hack tipBox
			if (UI.hasClass(o,'tipBox')) {
				UI.removeClass(o,'tipBox');
				tipBox = ' tipBox';
				title = ' title="' + o.title + '"';
				o.title = '';
				UI.EA(o,'click',function(e){
					UI.E(e).stop();
				})
			}
			UI.wrap('<span class="resize_box' + tipBox + '"' + title + '><b class="ico"></b><span></span></span>',o);
		}
		else {
			var B = UI.html('<b class="ico"></b>')[0];
			o.appendChild(B);
		}
		new UI.Resize(o,config);
	});
}
UI.Resize = function(o,option) {
	var P = o.parentNode.parentNode;
	var ico = UI.GC(P,'.ico')[0];
	var w,h,x,y,action,padding_y = 0,padding_x = 0;

	if (!option) option = {
		min : {
			x : 20,
			y : 15
		},
		max : {
			x : Infinity,
			y : Infinity
		}
	}
	else {
		if (!option.min) option.min = {
			x : 20,
			y : 15
		}
		if (!option.max) option.max = {
			x : Infinity,
			y : Infinity
		}
	}

	UI.drag(ico,{
		start : function(e) {
			var E = UI.E(e);
			x = E.x;
			y = E.y;
			w = UI.width(o);
			h = UI.height(o);
			action = UI.C(ico,'cursor');
			if (!UI.B.ie && document.compatMode == 'BackCompat') {
				var Self = ico.parentNode;
				padding_x = parseInt(UI.C(Self,'paddingLeft')) + parseInt(UI.C(Self,'paddingRight'));
				padding_y = parseInt(UI.C(Self,'paddingBottom')) + parseInt(UI.C(Self,'paddingTop'));
			}
		},
		drag : function(e) {
			var E = UI.E(e),W,H;
			switch (action) {
				case 'ne-resize':
					W = w + E.x - x - padding_x;
					H = h - E.y + y - padding_y;
					break;
				case 'se-resize':
					W = w + E.x - x - padding_x;
					H = h + E.y - y - padding_y;
					break;
				case 'nw-resize':
					W = w - E.x + x - padding_x;
					H = h - E.y + y - padding_y;
					break;
				case 'sw-resize':
					W = w - E.x + x - padding_x;
					H = h + E.y - y - padding_y;
					break;
				case 'e-resize':
					W = w - E.x + x - padding_x;
					break;
				case 's-resize':
					H = h + E.y - y - padding_y;
					break;
			}
			if (W < option.min.x) W = option.min.x;
			if (W > option.max.x) W = option.max.x;
			if (H < option.min.y) H = option.min.y;
			if (H > option.max.y) H = option.max.y;
			try{
				UI.C(o,'width',W + 'px');
				UI.C(o,'height',H + 'px');
			}catch(e){};
		}
	},UI.isUndefined(option.capture) ? true : option.capture);
}