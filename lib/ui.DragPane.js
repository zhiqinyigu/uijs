UI.dragPane = function(){
	DD = new UI.DragPane({id:'bd'});//
	//console.log(DD);
	//console.log(DD.getQueue(DD.body));
}
UI.DragPane = function(o){ //id,
	this.body = UI.G(o.id);

	this.paneNull = UI.html('<div class="paneNull"></div>')[0];
	UI.hide(this.paneNull);
	this.body.appendChild(this.paneNull);

	this.pane = [];//[{wrap:el,left:,right:,pane:}]
	this.target = o.id ? '#' + o.id : 'body';
	this.buildEvent();
}
UI.DragPane.prototype = {
	call : null, //Call Function When Drag Stop
	paneDel : [],
	paneTip : '<div class="paneTip">可将模块拖至此处...</div>',
	paneBtn : {
		del : '<input type="button" class="paneBtnDel" value="删除">'
	},
	wrapType : {
		'1' : 'mode_col_1',
		'11' : 'mode_col_11',
		'21' : 'mode_col_21',
		'12' : 'mode_col_12',
		'111' : 'mode_col_111',
		'121' : 'mode_col_121'
	},
	paneType : {
		
	},
	build : function(o){ //Build Pane List From JSON
		for (var i = 0,n = o.length;i < n;i++) {
			var html = [];
			html.push(this.buildHtml(o[i]));
			UI.append(UI.html(html.join(''))[0],this.body);
		}
		this.buildEvent(o);
	},
	buildHtml : function(o){
		var html = [];
		html.push('<div class="paneWrap mode_col_' + o.type + (o.isMove != 0 ? ' paneMove' : '') + '" id="' + o.id + '" tid="' + o.tId + '" type="' + o.type + '">');
		switch (o.pane.length) {
			case 0 :
				html.push(this.paneTip);
				break;
			case 1 :
				html.push(this.paneTip);
				html.push(this.buildPane(o.pane[0]));
				break;
			case 2 :
				html.push('<div class="paneLeft">' + this.paneTip);
				html.push(this.buildPane(o.pane[0]));
				html.push('</div>');
				html.push('<div class="paneRight">' + this.paneTip);
				html.push(this.buildPane(o.pane[1]));
				html.push('</div>');
				break;
			case 3 :
				html.push('<div class="paneLeft">' + this.paneTip);
				html.push(this.buildPane(o.pane[0]));
				html.push('</div>');
				html.push('<div class="paneCenter">' + this.paneTip);
				html.push(this.buildPane(o.pane[1]));
				html.push('</div>');
				html.push('<div class="paneRight">' + this.paneTip);
				html.push(this.buildPane(o.pane[2]));
				html.push('</div>');
				break;
		}
		html.push('</div>');
		return html.join('');
	},
	buildPane : function(o){
		var html = [];
		for (var i = 0,n = o.length;i < n;i++) {
			if (o[i].isWrap == -1) return '';
			if (o[i].pane) {
				html.push(this.buildHtml(o[i]));
			}
			else html.push('<div class="paneBox' + (o[i].isMove != 0 ? ' paneMove' : '') + '"' + (o[i].isWrap && o[i].isWrap != 0 && o[i].isWrap != 1 ? ' iswrap="-2"' : '') + ' tid="' + (o[i].tId ? o[i].tId : '') + '" id="' + o[i].id + '" paneTitle="' + o[i].title + '" paneType="' + (o[i].type ? o[i].type : '') + '"><div class="cont">' + (o[i].cont ? o[i].cont : '<br>') + '</div></div>');
		}
		return html.join('');
	},
	buildEvent : function(o){
		var target = this.target + ' ';
		var wrap = UI.GC(target + '.paneWrap');
		for (var i = 0,n = wrap.length;i < n;i++) {
			if (UI.hasClass(wrap[i],'paneMove')) {
				this.addTools(wrap[i]);
				this.addDrag(UI.GC(wrap[i],'.paneTools'),true);
			}
		}
		var pane = UI.GC(target + '.paneBox');
		for (var i = 0,n = pane.length;i < n;i++) {
			this.addTools(pane[i],'wrap');
			if (!UI.A(pane[i],'tid')) {
				this.buildPage('type=' + UI.A(pane[i],'paneType') + '&isfalse=1&width=0',pane[i]);
			}
			else {
				this.buildPage('libid=' + this.libId + '&moduleid=' + UI.A(pane[i],'tid') + '&type=' + UI.A(pane[i],'paneType') + '&width=' + UI.DragPane.getWidth(pane[i]) + '&istrue=1',pane[i]);
			}
			if (UI.hasClass(pane[i],'paneMove')) {
				this.addDrag(UI.GC(pane[i],'.paneTools'));
			}
		}
	},
	buildPage : function(url,pane){
		var Self = this;
		$.get("/page/take",url + '&r=' + new Date().getTime(),function(data){
			$('div.cont',pane || Self.currentPane)[0].innerHTML = data;
			//console.log(data);
		});
	},
	addWrap : function(type){ //Add Pane Wrap @ Value = "move|type|tid"
		var cont = '',id = type.split('|'),move = id[0],type = id[1],tid = id[2];
		switch (type.length) {
			case 1 : 
				cont = this.paneTip;
				break;
			case 2 :
				cont = '<div class="paneLeft">' + this.paneTip + '</div><div class="paneRight">' + this.paneTip + '</div>';
				break;
			case 3 :
				cont = '<div class="paneLeft">' + this.paneTip + '</div><div class="paneCenter">' + this.paneTip + '</div><div class="paneRight">' + this.paneTip + '</div>';
				break;
		}
		var wrap = UI.html('<div class="paneWrap mode_col_' + type + (move != 0 ? ' paneMove' : '') + '" id="' + this.setId() + '" tid="' + tid + '" type="' + type + '">' + cont + '</div>')[0],wrapFirst = UI.GC(this.body,'.paneWrap')[0];
		if (wrapFirst) {
			UI.after(wrap,wrapFirst);
		}
		else {
			UI.prepend(wrap,this.body);
		}
		if (move != 0) {
			this.addTools(wrap);
			this.addDrag(UI.GC(wrap,'.paneTools'),true);
		}
	},
	addPane : function(o,target){ //Add Pane
		var rootWrap = UI.children(this.body,'paneWrap');
		if (!target) target = rootWrap[1] || rootWrap[0];
		else target = UI.G(target);
		if (!target) {
			alert('请先添加区块！');
			return false;
		}
		var pane = UI.html('<div class="paneBox' + (o.isMove != 0 ? ' paneMove' : '') + '"' + (o.isWrap && o.isWrap != 0 && o.isWrap != 1 ? ' iswrap="-2"' : '') + ' tid="" id="' + this.setId() + '" paneTitle="' + o.title + '" paneType="' + o.type + '"><div class="cont">' + o.cont + '</div></div>')[0],last;
		this.addTools(pane,o);
		if (o.isMove != 0) {
			this.addDrag(UI.GC(pane,'.paneTools'));
		}
		if (UI.A(target,'type') == 1) {
			UI.after(pane,target.firstChild);
			UI.hide(UI.GC(target,'.paneTip')[0]);
		}
		else {
			if (o.position == 0) { //Pane's Position In Wrap
				last = target.firstChild;
				if (last.nodeName == 'SPAN') {
					last = last.nextSibling;
				}
			}
			else last = target.lastChild;
			UI.hide(UI.GC(last,'.paneTip')[0]);
			UI.prepend(pane,last);
		}
		this.currentPane = pane;
		this.buildPage('type=' + o.type + '&isfalse=1&width=0',pane);
	},
	addTools : function(el,o){
		var P = el.parentNode,Self = this;
		if (UI.isArray(el)) {
			for (var i = 0,n = el.length;i < n;i++) {
				this.addTools(el[i]);
			}
		}
		else if(o && o.isWrap != 1) {
			var title = UI.A(el,'paneTitle'),type = UI.A(el,'paneType'),tId = UI.A(el,'tid'),val = 'var P=this.parentNode.parentNode.parentNode,type=UI.A(P,\'paneType\'),tId=UI.A(P,\'tid\'),width=UI.DragPane.getWidth(P);',url = '/configure' + type + '/configdispatch/?cache=\'+new Date().getTime()+\'&width=\'+width+\'&id=' + el.id + '&moduletype=\'+type+\'&moduleid=\'+tId+\'&libid=' + this.libId + '&pageid=' + this.pageId;
			var tools = UI.html('<span class="paneTools' + (UI.hasClass(el,'paneMove') ? '' : ' paneNoMove') + '"><span class="title">' + title + '</span><span class="cont" onmousedown="UI.E(event).stop()"><input type="button" value="配置" onclick="' + val + 'dialog.show({title:\'' + title + '\',url:\'' + url + '&issuper=2\',size:\'big\',height:428});"> <input type="button" value="代码" onclick="' + val + 'dialog.show({title:\'' + title + '\',url:\'' + url + '&issuper=1\',size:\'big\',height:428});"> <input type="button" value="更新" onclick="' + val + 'if(!tId) {alert(\'请先配置模块再更新！\');} else UI.get(\'/update/do\',\'libid=' + this.libId + '&pageid=' + this.pageId + '&pagetype=1&type=\'+type+\'&moduleid=\'+tId,function(data){ if(data==0) showMsg(\'更新成功\'); else alert(data); })"/> ' + (UI.hasClass(el,'paneMove') ? this.paneBtn.del : '') + '</span></span>')[0];
			//console.log(tools.innerHTML);
			UI.prepend(tools,el);
			UI.EA(UI.GC(tools,'.cont')[0],'click',function(e){
				Self.currentPane = el;
			});
			UI.hide(UI.GC(P,'.paneTip')[0]); //Hide Pane's Tip
			el.onmouseover = function(){
				UI.addClass(this,'paneOn');
			}
			el.onmouseout = function(){
				UI.removeClass(this,'paneOn');
			}
		}
		else {
			var tools = UI.html('<span class="paneTools"><span class="cont" onmousedown="UI.E(event).stop()">' + this.paneBtn.del + '</span></span>')[0];
			UI.prepend(tools,el);
			if (P != this.body) {
				UI.hide(UI.GC(P,'.paneTip')[0]); //Hide Pane's Tip
			}
			el.onmouseover = function(){
				UI.addClass(this,'paneWrapOn');
			}
			el.onmouseout = function(){
				UI.removeClass(this,'paneWrapOn');
			}
		}
		var paneBtnDel = UI.GC(tools,'.paneBtnDel')[0];
		if (paneBtnDel) {
			paneBtnDel.onclick=function(){
				if(confirm('确定要删除？')) {
					var P = this.parentNode.parentNode.parentNode,PP = P.parentNode,tid = UI.A(P,'tid'),type = UI.A(P,'paneType');
					PP.removeChild(P);
					if(tid) Self.paneDel.push(tid + '_' + type);
					if(!UI.GC(PP,'.paneBox').concat(UI.GC(PP,'.paneWrap')).length) UI.show(UI.GC(PP,'.paneTip')[0]);
				}
			}
		}
	},
	addDrag : function(el,wrap){
		var Self = this;
		for (var i = 0,n = el.length;i < n;i++) {
			var D = document,captrue = true;
			(function(o){
				o.onmousedown = function(e){
					//Drag Start
					var E = UI.E(e);
					var x = E.x,y = E.y,o = this.parentNode,oY = UI.getY(o),scrollY = UI.scrollY(),pH = UI.pageHeight(),wH = UI.windowHeight();
					o.style.cssText = 'width:' + UI.width(o) + 'px;height:' + UI.height(o) + 'px;top:' + oY + 'px;left:' + UI.getX(o) + 'px;';
					UI.addClass(o,'paneTmp');
					var nullH = parseInt(o.style.height) - 2;
					Self.paneNull.style.height = (nullH < 100 && nullH > 0 ? nullH : 100) + 'px';
					//console.log(nullH);
					UI.before(Self.paneNull,o);
					UI.show(Self.paneNull);
					document.body.appendChild(o);
					Self.paneTmp = o;

					//Move Target
					Self.pane = UI.GC(Self.body,'.paneWrap .paneBox.paneMove').concat(UI.GC(Self.body,'.paneTip')).concat( UI.GC(Self.body,'.paneWrap .paneWrap.paneMove').concat(UI.GC(Self.target + ' > .paneWrap.paneMove')) );

					if (captrue) {
						if(o.setCapture) o.setCapture();
						else if(window.captureEvents) window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
					}

					//Drag Move
					D.onmousemove = function(e){
						var E = UI.E(e);
						o.style.cssText += ';margin:' + (E.y - y) + 'px 0 0 ' + (E.x - x) + 'px;';
						Self.paneFrom = Self.paneNull.parentNode;
						if (wrap) {
							clearTimeout(Self.delay);
							Self.delay = setTimeout(function(){
								Self.within([E.x,E.y],wrap);
							},0);
						}
						else Self.within([E.x,E.y],wrap);

						//Scroll Control
						var scroll = 0;
						if (wH - E.y < 40) scroll = 20;
						else if (E.y < 40) scroll = -20;
						clearInterval(Self.delayScroll);
						if (scroll != 0) {
							Self.delayScroll = setInterval(function(){
								var Y = UI.scrollY();
								if (Y + wH - pH > 50) {
									return false;
								}
								UI.scrollTo(document.body,0,Y + scroll);
								o.style.top = oY + Y - scrollY + 'px';
							},1);
						}
					}
					//Drag Stop
					D.onmouseup = function(e){
						if (captrue) {
							if(o.releaseCapture) o.releaseCapture();
							else if(window.captureEvents) window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
						}

						UI.removeClass(o,'paneOn');
						UI.removeClass(o,'paneTmp');
						o.style.cssText = '';
						UI.hide(Self.paneNull);
						UI.before(o,Self.paneNull);
						Self.body.appendChild(Self.paneNull);
						
						var P = o.parentNode,T = UI.children(P,'paneTools')[0],paneTip = UI.children(P,'paneTip')[0];
						if (P != Self.body) { //Reset paneTip to top for hide paneTip
							if (T) {
								UI.after(paneTip,T);
							}
							else UI.prepend(paneTip,P);
						}
						D.onmousemove = null;
						D.onmouseup = null;

						if (!UI.hasClass(o,'paneWrap')) {
							if (!UI.A(o,'tid')) {
								Self.buildPage('type=' + UI.A(o,'paneType') + '&isfalse=1&width=0',o);
							}
							else {
								Self.buildPage('libid=' + Self.libId + '&moduleid=' + UI.A(o,'tid') + '&type=' + UI.A(o,'paneType') + '&width=' + UI.DragPane.getWidth(o) + '&istrue=1',o);
							}
						}

						clearInterval(Self.delayScroll);
						clearInterval(Self.delay);
						if (Self.call) {
							Self.call();
						}
					}
				}
				o.onselectstart = function(e){
					return false;
				}
			})(el[i]);
		}
	},
	update : function(o){ //Update Pane
		if (this.currentPane) {
			UI.A(this.currentPane,'tid',o.tId);
			this.currentPane = null;
		}
	},
	setId : function(){ //Create Id
		var string = this.getQueue(),value = this.getRandom();
		return string.hasString(value) ? this.setId() : value;
	},
	getRandom : function(){
		return this.pageId + '' + new Date().getTime() + UI.random(100,999);
	},
	within : function(o,wrap){
		if (UI.within(o,this.paneNull)) return false; //In PaneNull Can't Move
		var result;
		for (var i = 0,n = this.pane.length;i < n;i++) {
			result = UI.within(o,this.pane[i]);
			if (wrap && ( (UI.GC(this.paneTmp,'.paneWrap').length > 0 && UI.parents(this.pane[i],'paneWrap').length == 1 ) || UI.parents(this.pane[i],'paneWrap').length > 1)) { //Wrap In Wrap Can't More Than Two
				result = false;
			}
			else if (!wrap && UI.hasClass(this.pane[i],'paneWrap') && UI.parents(this.pane[i],'paneWrap').length != 1) {
				result = false;
			}
			
			if (result) {
				if (result.top) UI.before(this.paneNull,this.pane[i]);
				else UI.after(this.paneNull,this.pane[i]);

				this.paneTo = this.paneNull.parentNode;
				var paneTip = UI.GC(this.paneTo,'.paneTip');
				if (!UI.children(this.paneFrom,'paneBox|paneWrap').length) UI.show(UI.GC(this.paneFrom,'.paneTip')[0]);
				if (this.paneTo != this.body && paneTip.length) UI.hide(paneTip[0]);
				break;
			}
		}
	},
	getQueue : function(o,son){
		if (!o) o = this.body;
		var arr = [],arr2 = [],arr3 = [],wrap = UI.children(o,son ? 'paneBox|paneWrap' : 'paneWrap'),child;
		for (var i = 0,n = wrap.length;i < n;i++) {
			arr2.push('"' + wrap[i].id + '"');
			if (UI.hasClass(wrap[i],'paneWrap')) {
				child = UI.children(wrap[i]);
				for (var j = 0,m = child.length;j < m;j++) {
					if (UI.hasClass(child[j],'paneLeft') || UI.hasClass(child[j],'paneRight') || UI.hasClass(child[j],'paneCenter')) {
						arr2.push('[' + this.getQueue(child[j],true) + ']');
					}
					else if (UI.hasClass(child[j],'paneBox')) arr3.push('"' + child[j].id + '"');
				}
				if (arr3.length) {
					arr2.push('[' + arr3.join(',') + ']');
				}
			}
			if (son && UI.hasClass(wrap[i],'paneBox')) arr.push(arr2.join(','));
			else arr.push('[' + arr2.join(',') + ']');
			arr2 = [];
			arr3 = [];
		}
		if (son) return arr.join(',');
		else return '[' + arr.join(',') + ']';
	},
	getJson : function(o,son){
		var queue = eval(this.getQueue()),arr = [],el;
		for (var i = 0,n = queue.length;i < n;i++) {
			arr.push( this.getObject(queue[i]) );
		}
		return '[' + arr + ']';
	},
	getObject : function(o){
		var arr = [],el = UI.G(o[0]);
		arr.push('"id":"' + o[0] + '"');
		var type = UI.A(el,'type'),move = UI.hasClass(el,'paneMove') ? 1 : 0;
		if (type) {
			arr.push('"tId":"' + UI.A(el,'tid') + '"');
			arr.push('"isWrap":1');
			arr.push('"isMove":' + move);
			arr.push('"type":' + type);

			var arr2 = [],el2;
			for (var i = 1,n = o.length;i < n;i++) {
				var arr3 = [];
				for (var j = 0,m = o[i].length;j < m;j++) {
					if (UI.isString(o[i][j])) {
						arr3.push( this.getObject([o[i][j]]) );
					}
					else {
						arr3.push( this.getObject(o[i][j]) );
					}
				}
				if (!arr3.length) { //Add Null Pane
					arr3.push('{"isWrap":-1}');
				}
				arr2.push('[' + arr3.join(',') + ']');
			}
			if (!arr2.length) { //Add Null Pane For "Col 1"
				arr2.push('[{"isWrap":-1}]');
			}
			arr.push('"pane":[' + arr2.join(',') + ']');
		}
		else {
			var isWrap = UI.A(el,'iswrap');
			arr.push('"isWrap":' + (isWrap ? isWrap : 0) + '');
			arr.push('"isMove":' + move);
			arr.push('"title":"' + UI.A(el,'panetitle') + '"');
			arr.push('"tId":"' + UI.A(el,'tid') + '"');
			arr.push('"type":"' + UI.A(el,'panetype') + '"');
			arr.push('"width":' + UI.DragPane.getWidth(el) + '');
		}
		return '{' + arr + '}';
	}
}
UI.DragPane.getWidth = function(el){ //Get Pane's Width
	var wrap = UI.parents(el,'paneWrap').length;
	return Math.round(UI.width(el.parentNode)/10)*10 + (wrap > 1 ? (wrap - 1) * 10 : 0);
}