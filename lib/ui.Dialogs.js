UI.Dialogs = function(o) {
	var Self = this;
	if (o.task) {
		Self.task = {};
		Self._taskPrev = o.task.prev;
		Self._taskList = o.task.list;
		Self._taskNext = o.task.next;
		Self._taskPrev.onmouseover = Self._taskPrev.onmouseout = Self._taskPrev.onmousedown = Self._taskPrev.onmouseup = Self._taskNext.onmouseover = Self._taskNext.onmouseout = Self._taskNext.onmousedown = Self._taskNext.onmouseup = UI.Dialogs.create.prototype.hover;
		Self._taskPrev.onclick = function(){
			Self.taskPageCur--;
			Self.taskPage(Self.taskPageCur);
		}
		Self._taskNext.onclick = function(){
			Self.taskPageCur++;
			Self.taskPage(Self.taskPageCur);
		}
	}
	if (o.maxSize) {
		Self.maxSize = o.maxSize;
	}
	if (o.wrap) {
		Self._wrap = o.wrap;
	}
}
UI.Dialogs.prototype = {
	cur : '', //Current Dialog's Id
	zIndex : 99, //Dialog's Z Index
	maxSize : { //Max Dialog's Size
		width : 900,
		height : 700,
		top : 0,
		left : 0
	},
	delay : {}, //Time Delay
	cache : {}, //Cache Dialog
	task : null, //Cache Task List
	taskCss : ['li_hover','li_active'], //Task List's Class Name
	taskNum : 0, //Task List Num
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
			}
			else {
				Self.cache[id].show();
				Self.current(id);
			}
		}
	},
	taskAutoScreen : function(){
		var Self = this,li,width;
		li = Self._taskList.firstChild;
		if (li) {
			width = UI.width(li);
			Self.taskPageNum = parseInt(UI.width(UI.parent(Self._taskList)) / width);
			Self.taskPageWidth = (width + parseInt(UI.C(li,'paddingLeft')) + parseInt(UI.C(li,'paddingRight'))) * Self.taskPageNum;
		}
		if (Self.cur) {
			Self.taskScroll(Self.cur);
		}
	},
	taskScroll : function(id){
		var Self = this,index = 0,hasIndex,num = 0;
		if (!Self.taskPageNum) {
			Self.taskAutoScreen();
		}
		for (var i in Self.task) {
			if (!hasIndex) {
				index++;
			}
			if (i == id) {
				hasIndex = 1;
			}
			num++;
		}

		//Button
		Self.taskListNum = Math.ceil(num / Self.taskPageNum);
		if (Self.taskListNum > 1) {
			UI.show(Self._taskPrev);
			UI.show(Self._taskNext);
		}
		else {
			UI.hide(Self._taskPrev);
			UI.hide(Self._taskNext);
		}

		//Scroll
		if (id) {
			Self.taskPage(Math.ceil(index / Self.taskPageNum));
		}
	},
	taskPage : function(num){ //Task List Page
		var Self = this,
			prevClass = Self._taskPrev.className.split('_')[0],
			nextClass = Self._taskNext.className.split('_')[0];
		if (num < 1) {
			num = 1;
		}
		else if (num > Self.taskListNum) {
			num = Self.taskListNum;
		}
		Self._taskPrev.className = num == 1 ? prevClass + '_disabled' : prevClass;
		Self._taskNext.className = num == Self.taskListNum ? nextClass + '_disabled' : nextClass;
		clearInterval(Self.delay.taskPage);
		Self.delay.taskPage = UI.animate(Self._taskList,'marginLeft',- Self.taskPageWidth * (num - 1));
		Self.taskPageCur = num;
	},
	taskPageCur : 1, //Task Current Page
	taskPageWidth : 0, //Task Width Per Page
	taskPageNum : 0, //Task Num Per Page
	taskListNum : 0, //Task List Num
	current : function(id){ //Set Current Dialog
		var Self = this;
		if (Self.cur) {
			if (Self.task[Self.cur]) {
				UI.removeClass(Self.task[Self.cur],Self.taskCss[1]);
			}
		}
		if (id) {
			if (Self.task[id]) {
				UI.addClass(Self.task[id],Self.taskCss[1]);
			}
			Self.zIndex++;
			UI.C(Self.cache[id]._body,'zIndex',Self.zIndex);
			if (!Self.cache[id].task) {
				Self.taskScroll(id);
			}
		}
		Self.cur = id;
	},
	close : function(id){ //Close Dialog
		var Self = this;
		if (Self.cache[id]) {
			Self.cache[id].hide();
			UI.remove(Self.cache[id]._body);
			UI.remove(Self.task[id]);
			delete Self.cache[id];
			delete Self.task[id];
			Self.taskScroll();
		}
	},
	min : function(id){ //Min Dialog
		var Self = this,
			after,
			first;
		Self.cache[id].hide();
		Self.current('');
		for (var i in Self.task) { //Show Next Dialog In List
			if (!first) {
				first = i;
			}
			if (i == id) {
				after = 1;
			}
			if (after && Self.cache[i].display) {
				Self.current(Self.cache[i].id);
				break;
			}
		}
	},
	max : function(id){ //Max Dialog
		var Self = this,
			dialog = Self.cache[id];
		dialog.tmp.width = UI.width(dialog._wrap);
		dialog.tmp.height = UI.height(dialog._wrap);
		dialog.tmp.top = parseInt(UI.C(dialog._body,'top'));
		dialog.tmp.left = parseInt(UI.C(dialog._body,'left'));
		dialog._wrap.style.cssText += ';width:' + Self.maxSize.width + 'px;height:' + Self.maxSize.height + 'px';
		dialog._body.style.cssText += ';top:' + Self.maxSize.top + 'px;left:' + Self.maxSize.left + 'px';
		UI.hide(dialog._max);
		UI.show(dialog._restore);
		UI.addClass(dialog._body,'fullScreen');
	},
	restore : function(id){  //Restore Dialog
		var Self = this,
			dialog = Self.cache[id];
		dialog._wrap.style.cssText += ';width:' + dialog.tmp.width + 'px;height:' + dialog.tmp.height + 'px';
		dialog._body.style.cssText += ';top:' + dialog.tmp.top + 'px;left:' + dialog.tmp.left + 'px';
		UI.show(dialog._max);
		UI.hide(dialog._restore);
		UI.removeClass(dialog._body,'fullScreen');
	},
	show : function(o){ //Show Dialog
		var Self = this,
			dialog = Self.cache[o.id];
		if (dialog) {
			dialog.show(o);
		}
		else {
			//Create
			dialog = new UI.Dialogs.create(o);

			//Append To Body
			UI.append(dialog._body,Self._wrap || document.body);

			//Event
			dialog._title.ondblclick = function(e){
				if (o.max) {
					if (UI.C(dialog._restore,'display') == 'none') {
						Self.max(o.id);
					}
					else {
						Self.restore(o.id);
					}
				}
				return false;
			}
			dialog._body.onmousedown = function(){
				Self.current(o.id);
			}
			dialog.onClose = function(){
				Self.close(o.id);
			}
			dialog.onMin = function(){
				Self.min(o.id);
			}
			dialog.onMax = function(){
				Self.max(o.id);
			}
			dialog.onRestore = function(){
				Self.restore(o.id);
			}

			//Cache
			Self.cache[o.id] = dialog;

			//Task
			if (Self.task && !dialog.task) {
				Self.task[o.id] = UI.html('<li title="' + dialog.title + '" rel="' + o.id + '"><span class="bgL"><span class="bgR">' + (o.ico ? '<img _png="yes" src="' + o.ico + '">' : '') + dialog.title + '</span></span></li>')[0];
				Self.taskEvent(Self.task[o.id]);
				UI.append(Self.task[o.id],Self._taskList);
			}

			//Show
			dialog.show(o);
		}
		if (Self.task && !dialog.task) { //Task Scroll
			Self.taskScroll(o.id);
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
				Self.current('');
			}
		}
	},
	toggle : function(o){
		var Self = this,
			display,
			id = UI.isObject(o) ? o.id : o;
		if (id) { //Toggle Dialog
			if (Self.cache[id]) {
				if (Self.cache[id].display) {
					Self.cache[id].onMin();
				}
				else {
					Self.cache[id].show();
					Self.current(Self.cache[id].id);
				}
			}
			else {
				Self.show(o);
			}
		}
		else { //Toggle All Dialogs
			for (var i in Self.cache) {
				if (Self.cache[i].display) {
					display = 1;
				}
			}
			for (var i in Self.cache) {
				if (display) {
					Self.cache[i].onMin();
				}
				else if (Self.cache[i].tmp.display) {
					Self.cache[i].show();
					Self.current(Self.cache[i].id);
				}
			}
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
			<td class="tmhc"><div class="mhc"><span class="eswn nResize"></span><h2 class="mhH2">' + (o.ico ? '<img class="mhImg" _png="yes" src="' + o.ico + '">' : '') + '' + Self.title + '</h2><div class="modBtn' + (!o.min && !o.max ? ' modBtn01' : '') + '"><span class="close close_" title="关闭"><b class="pngBg"></b></span><span class="restore restore_" style="display:none" title="还原"><b class="pngBg"></b></span><span class="maximize maximize_" title="最大化"><b class="pngBg"></b></span><span class="minimize minimize_" title="最小化"><b class="pngBg"></b></span></div></div></td>\
			<td class="tmhr"><div class="mhr"><div class="pngBg"><span class="eswn neResize"></span></div></div></td>\
		</tr>\
		<tr class="tmm">\
			<td class="tmml">&nbsp;</td>\
			<td class="tmmc"><div class="mmc" style="' + size + (o.url ? 'position:relative;overflow:hidden;' : '') + '">' + (o.url ? '<div style="width:100%;height:100%;position:absolute;background:white;filter:alpha(opacity=0);-moz-opacity:0;opacity:0;display:none" class="dialogsIframeCover"></div><iframe allowtransparency="true" src="javascript:false" style="width:100%;height:100%;" scrolling="auto" frameborder="no" onload="try{this.contentWindow.document.body.onmousedown=function(){parent.UI.Dialogs.prototype.cache[\'' + o.id + '\']._body.onmousedown();}}catch(e){}"></iframe>' : '') + '</div></td>\
			<td class="tmmr">&nbsp;</td>\
		</tr>\
		<tr class="tmf">\
			<td class="tmfl"><div class="mfl"><div class="pngBg"><span class="eswn swResize"></span></div></div></td>\
			<td class="tmfc"><div class="mfc"><span class="eswn sResize"></span></div></td>\
			<td class="tmfr"><div class="mfr"><div class="pngBg"><span class="eswn seResize"></span></div></div></td>\
		</tr>\
		</tbody></table>')[0];
	Self._wrap = Self.$('.mmc');
	Self._cover = Self.$('.dialogsIframeCover');
	Self._title = Self.$('.mhH2');
	Self._btn = Self.$('.modBtn span');
	Self._close = Self._btn[0];
	Self._restore = Self._btn[1];
	Self._max = Self._btn[2];
	Self._min = Self._btn[3];
	Self._resize = Self.$('.eswn,.tmm .tmml,.tmm .tmmr');
	if (!Self.move) {
		UI.C(Self._title,'cursor','default');
	}
	if (!Self.max) {
		UI.hide(Self._max);
		UI.hide(Self._restore);
	}
	if (!Self.min) {
		UI.hide(Self._min);
	}
	if (!Self.close) {
		UI.hide(Self._close);
		console.log(Self._close);
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
	Self._close.onclick = function(){ //Close
		Self.onClose();
	}
	Self._restore.onclick = function(){ //Restore
		Self.onRestore();
	}
	Self._max.onclick = function(){ //Max
		Self.onMax();
	}
	Self._min.onclick = function(){ //Min
		Self.onMin();
	}
	function move(e){
		if (!Self.move || UI.C(Self._title,'cursor') != 'move') {
			return;
		}
		var event = window.event || e;
		var _x = event.clientX - parseInt(Self._body.style.left);
		var _y = event.clientY - parseInt(Self._body.style.top);
		var w = UI.windowWidth(),h = UI.windowHeight(); //Kill Bug
		if(event.preventDefault){
			event.preventDefault();
		}

		UI.show(Self._cover);
		Self._body.onselectstart = function(){
			return false;
		}

		document.onmousemove = function(e) {
			var event = window.event || e,E = UI.E(e);
			if (!UI.B.ie && (E.x < 0 || E.y < 0 || E.x > w || E.y > h)) return;
			Self._body.style.top = event.clientY - _y + 'px';
			Self._body.style.left = event.clientX - _x + 'px';
			return;
		}
		document.onmouseup = function() {
			UI.hide(Self._cover);
			Self._body.onselectstart = null;

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

		UI.show(Self._cover);
		Self._body.onselectstart = function(){
			return false;
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
			UI.hide(Self._cover);
			Self._body.onselectstart = null;

			this.onmousemove = null;
			document.onmouseup = null;
		}
		return;
	}
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
		Self.task = o.task;
		Self.url = o.url;
		Self.html = o.html;
		Self.tmp = {}; //Tmp Value
	},
	display : 0, //Display Status
	curWidth : 0,
	curHeight : 0,
	hover : function(e){ //Button's Hover Event
		var E = UI.E(e),className = this.className.split('_')[0];
		if (this.className.hasString('disabled')) {
			return;
		}
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
				UI.A(UI.GC(Self._wrap,'iframe')[0],'src',o.url);
			}
		}
		UI.show(Self._body);
		Self.display = 1;
	},
	hide : function(){
		var Self = this;
		UI.hide(Self._body);
		Self.tmp.display = Self.display;
		Self.display = 0;
	}
}