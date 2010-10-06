UI.Dialogs = function(o) {
	var Self = this;
	if (o.task) {
		Self.task = {};
		Self._taskPrev = o.task.prev;
		Self._taskList = o.task.list;
		Self._taskNext = o.task.next;
	}
}
UI.Dialogs.prototype = {
	cur : '', //Current Dialog's Id
	cache : {}, //Cache Dialog
	task : null, //Cache Task List
	taskCss : ['li_hover','li_active'], //Task List's Class Name
	taskEvent : function(el){ //Task List's Event
		var Self = this;
		el.onmouseover = function(){
			UI.addClass(this,Self.taskCss[0]);
		}
		el.onmouseout = function(){
			UI.removeClass(this,Self.taskCss[0]);
		}
		el.onclick = function(){
			var id = UI.A(this,'rel');
			if (id == Self.cur) {
				Self.min(id);
				for (var i in Self.task) { //Show Next Dialog In List
					if (Self.cache[i].display) {
						Self.current(Self.cache[i].id);
						break;
					}
				}
			}
			else {
				Self.cache[id].show();
				Self.current(id);
			}
		}
	},
	current : function(id){
		var Self = this;
		if (Self.cur) {
			UI.removeClass(Self.task[Self.cur],Self.taskCss[1]);
			UI.C(Self.cache[Self.cur]._body,'zIndex','');
		}
		if (id) {
			UI.addClass(Self.task[id],Self.taskCss[1]);
			UI.C(Self.cache[id]._body,'zIndex','999');
		}
		Self.cur = id;
	},
	min : function(id){
		var Self = this;
		Self.cache[id].hide();
		Self.current('');
	},
	max : function(id){
		
	},
	restore : function(id){
		
	},
	show : function(o){
		var Self = this,
			dialog = Self.cache[o.id],
			title = o.title || '';
		if (dialog) {
			dialog.show(o);
		}
		else {
			//Create
			dialog = new UI.Dialogs.create(o);

			//Event
			dialog._body.onmousedown = function(){
				Self.current(o.id);
			}
			dialog.min = function(){
				Self.min(o.id);
			}
			dialog.max = function(){
				Self.max(o.id);
			}
			dialog.restore = function(){
				Self.restore(o.id);
			}

			//Cache
			Self.cache[o.id] = dialog;

			//Task
			if (Self.task) {
				Self.task[o.id] = UI.html('<li title="' + title + '" rel="' + o.id + '"><span class="bgL"><span class="bgR">' + (o.ico ? '<img _png="yes" src="' + o.ico + '">' : '') + title + '</span></span></li>')[0];
				Self.taskEvent(Self.task[o.id]);
				UI.append(Self.task[o.id],Self._taskList);
			}

			//Show
			dialog.show(o);
		}

		Self.current(o.id);
	},
	hide : function(id){
		var Self = this;
		if (id) { //Hide Dialog
			Self.cache[id].hide();
		}
		else { //Hide All Dialogs
			for (var i in Self.cache) {
				Self.cache[i].hide();
			}
			Self.current('');
		}
	}
}
UI.Dialogs.create = function(o){ //Create Dialog
	var Self = this,position = '',size = '';
	Self.init(o);
	if (o.top) {
		position += 'top:' + o.top + 'px;';
	}
	if (o.left) {
		position += 'left:' + o.left + 'px;';
	}
	if (o.width) {
		size += 'width:' + o.width + 'px;';
	}
	if (o.height) {
		size += 'height:' + o.height + 'px;';
	}

	//Dom
	Self._body = UI.html('<table class="tmod' + (Self.resize ? ' resize' : '') + '" cellpadding="0" cellspacing="0" border="0" style="display:none;' + position + '">\
		<tbody><tr class="tmh">\
			<td class="tmhl"><div class="mhl"><div class="pngBg"><span class="eswn nwResize"></span></div></div></td>\
			<td class="tmhc"><div class="mhc"><span class="eswn nResize"></span><h2 class="mhH2">' + (o.ico ? '<img class="mhImg" _png="yes" src="' + o.ico + '">' : '') + '' + Self.title + '</h2><div class="modBtn"><span class="close close_" title="关闭"><b class="pngBg"></b></span><span class="restore restore_" style="display:none" title="还原"><b class="pngBg"></b></span><span class="maximize maximize_" title="最大化"><b class="pngBg"></b></span><span class="minimize minimize_" title="最小化"><b class="pngBg"></b></span></div></div></td>\
			<td class="tmhr"><div class="mhr"><div class="pngBg"><span class="eswn neResize"></span></div></div></td>\
		</tr>\
		<tr class="tmm">\
			<td class="tmml">&nbsp;</td>\
			<td class="tmmc">\
				<div class="mmc" style="' + size + '"></div>\
			</td>\
			<td class="tmmr">&nbsp;</td>\
		</tr>\
		<tr class="tmf">\
			<td class="tmfl"><div class="mfl"><div class="pngBg"><span class="eswn swResize"></span></div></div></td>\
			<td class="tmfc"><div class="mfc"><span class="eswn sResize"></span></div></td>\
			<td class="tmfr"><div class="mfr"><div class="pngBg"><span class="eswn seResize"></span></div></div></td>\
		</tr>\
		</tbody></table>')[0];
	Self._wrap = Self.$('.mmc');
	Self._title = Self.$('.mhH2');
	Self._btn = Self.$('.modBtn span');
	Self._resize = Self.$('.eswn,.tmm .tmml,.tmm .tmmr');
	if (!Self.move) {
		UI.C(Self._title,'cursor','default');
	}

	//Event
	Self._title.onmousedown = move; //Move
	UI.each(Self._resize,function(el){ //Resize
		if (!Self.resize) {
			if (el.nodeName == 'TD') {
				UI.C(el,'cursor','default');
			}
			else {
				UI.hide(el);
			}
		}
		el.onmousedown = resize;
	})
	UI.each(Self._btn,function(el){ //Button Status
		el.onmouseover = el.onmouseout = el.onmousedown = el.onmouseup = Self.hover;
	});
	Self._btn[0].onclick = function(){ //Close
		Self.hide();
	}
	Self._btn[1].onclick = function(){ //Restore
		Self.restore();
	}
	Self._btn[2].onclick = function(){ //Max
		Self.max();
	}
	Self._btn[3].onclick = function(){ //Min
		Self.min();
	}
	function move(e){
		if (!Self.move) {
			return;
		}
		var event = window.event || e;
		var _x = event.clientX - parseInt(Self._body.style.left);
		var _y = event.clientY - parseInt(Self._body.style.top);
		var w = UI.windowWidth(),h = UI.windowHeight(); //Kill Bug
		if(event.preventDefault){
			event.preventDefault();
		}
		document.onmousemove = function(e) {
			var event = window.event || e,E = UI.E(e);
			if (!UI.B.ie && (E.x < 0 || E.y < 0 || E.x > w || E.y > h)) return;
			Self._body.style.top = event.clientY - _y + 'px';
			Self._body.style.left = event.clientX - _x + 'px';
			return;
		}
		document.onmouseup = function() {
			this.onmousemove = null;
			document.onmouseup = null;
		}
		return;
	}
	function resize(e){
		var width = parseInt(UI.C(Self._wrap,'width')),
			height = parseInt(UI.C(Self._wrap,'height')),
			top = parseInt(UI.getY(Self._body)),
			left = parseInt(UI.getX(Self._body)),
			type = UI.C(this,'cursor').replace('-resize','');
		if (type == 'default') {
			return;
		}
		var event = window.event || e;
		var _x = event.clientX;
		var _y = event.clientY;
		if(event.preventDefault){
			event.preventDefault();
		}
		document.onmousemove = function(e) {
			var event = window.event || e,
				_Y = event.clientY - _y,
				_X = event.clientX - _x,
				w,
				h,
				minWidth = Self.minWidth,
				minHeight = Self.minHeight;
			if (type.hasString('e')) {
				w = width + _X;
			}
			else if (type.hasString('w')) {
				w = width - _X;
				if (w > minWidth) {
					Self._body.style.left = left + _X + 'px';
				}
			}
			if (type.hasString('s')) {
				h = height + _Y;
			}
			else if (type.hasString('n')) {
				h = height - _Y;
				if (h > minHeight) {
					Self._body.style.top = top + _Y + 'px';
				}
			}
			if (w) {
				Self._wrap.style.width = (w > minWidth ? w : minWidth) + 'px';
			}
			if (h) {
				Self._wrap.style.height = (h > minHeight ? h : minHeight) + 'px';
			}
			return;
		}
		document.onmouseup = function() {
			this.onmousemove = null;
			document.onmouseup = null;
		}
		return;
	}

	//Append To Body
	UI.append(Self._body,document.body);
}
UI.Dialogs.create.prototype = {
	$ : function(className){
		var el = UI.GC(this._body,className);
		return el.length > 1 ? el : el[0];
	},
	init : function(o){ //Init
		var Self = this,
			list = ['resize','move','close','min','max'];
		UI.each(list,function(i){
			Self[i] = UI.isUndefined(o[i]) ? 1 : o[i];
		});
		Self.id = o.id;
		Self.minWidth = o.minWidth || 200;
		Self.minHeight = o.minHeight || 50;
		Self.title = o.title || '';
	},
	display : 0, //Display Status
	curWidth : 0,
	curHeight : 0,
	hover : function(e){ //Button's Hover Event
		var E = UI.E(e),className = this.className.split('_')[0];
		switch (E.type) {
			case 'mouseover':
				this.className = className + '_hover';
				break;
			case 'mousedown':
				this.className = className + '_active';
				break;
			case 'mouseout':
				this.className = className;
				break;
			case 'mouseup':
				this.className = className;
				break;
		}
	},
	show : function(o){
		var Self = this;
		if (o) {
			if (o.html) {
				Self._wrap.innerHTML = o.html;
			}
			else if (o.url) {
				
			}
		}
		UI.show(Self._body);
		Self.display = 1;
	},
	hide : function(){
		var Self = this;
		UI.hide(Self._body);
		Self.display = 0;
	}
}