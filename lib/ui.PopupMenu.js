(function(){
	var wrap = document.createElement('div'),wrap_append;
	wrap.style.display = 'none';
	wrap.className = 'popup_menu';
	UI.PopupMenu = function(el,leftClick){
		var Self = this;
		if (!wrap_append) {
			try{
				document.body.appendChild(wrap);
			}catch(e){
				UI.EA(window,'load',function(e) {
					document.body.appendChild(wrap);
				});
			};
			wrap_append = 1;
		}
		this.body = document.createElement('div');
		UI.EA(this.body,'click',function(e) {
			UI.E(e).stop();
		});
		this.body.oncontextmenu = function(e){
			UI.E(e).stop();
		}

		this.target = el;
		if (!leftClick) {
			this.target.oncontextmenu = clickEvent;
			document.documentElement.oncontextmenu = closeEvent;
		}
		else {
			this.leftClick = true;
			UI.EA(this.target,'click',clickEvent);
		}
		UI.EA(document.documentElement,'click',closeEvent);

		//Function
		function closeEvent(e) {
			Self.hide();
		}
		function clickEvent(e) {
			Self.show(e);
			return false;
		}
	}
	UI.PopupMenu.prototype = {
		body : null,
		target : null,
		actions : null,
		actionsCache : null,
		actionsSet : null,
		popupTmp : false,
		leftClick : false,
		display : false,
		setActions : function(actions){
			this.actionsSet = actions;
		},
		popup : function(actions){
			UI.hide(wrap);
			if (!actions) actions = this.actionsSet; //For No Arguments
			if (!actions || !actions.length) return false;
			if (!this.actionsCache) this.actionsCache = this.actions;
			this.actions = actions;
			this.build();
			this.popupTmp = true;
		},
		build : function(actions) {
			var Self = this;
			var html = [],call = [],iframe = [],iframeStr = '<iframe class="cover" src="javascript:false;"></iframe>';
			if (actions) this.actions = actions;
			parseMenu(this.actions);
			this.body.innerHTML = html.join('');
			if (UI.B.ie6) {
				UI.each(iframe,function(e){
					Self.body.appendChild(e);
				});
			}
			this.cover = iframe[0];

			//Menu List
			var list = this.body.getElementsByTagName('li'),w_son;
			UI.each(list,function(e){
				if (e.getAttribute('rel') == 'son') {
					e.son = true;
					UI.addClass(e,'son');
				}
				if (UI.hasClass(e,'Input')) e.input = true;
				e.onclick = function(e) { //Menu Click
					if (this.getAttribute('call') != null) { //Call Function
						call[this.getAttribute('call')].call(this);
						//Firefox has "this" bug
					}
					if (this.input) {
						UI.E(e).stop();
						var input = this.lastChild.previousSibling;
						var son = this.firstChild;
						input.setAttribute('rel',input.getAttribute('rel') ? '' : 'checked');
						var rel = input.getAttribute('rel');
						if (input.className.match(/radio/g)) { //Radio
							UI.each(this.parentNode.getElementsByTagName('b'),function(e){
								if (e.getAttribute('name') == input.getAttribute('name')) {
									e.className = 'radio';
									e.setAttribute('rel','');
								}
							});
							input.setAttribute('rel','checked');
							input.className = input.className.split('_')[0] + '_checked';
							if (this.son) {
								son.style.display = 'block'; //Show Son Menu
								if (UI.B.ie6) iframe[son.getAttribute('iframe')].style.display = 'block';
							}
						}
						else { //Checkbox
							input.className = input.className.split('_')[0] + (rel ? '_' + rel : '');
							son.style.display = this.son && (rel == 'checked') ? 'block' : 'none'; //Check Son Menu Display
							if (UI.B.ie6) iframe[son.getAttribute('iframe')].style.display = son.style.display;
						}
						return false;
					}
					if (!this.son) Self.hide();
					else UI.E(e).stop();
				}
				e.onmouseover = function(e){ //Menu Hover
					UI.addClass(this,'hover');
					if (this.son) {
						if (this.input && this.lastChild.previousSibling.getAttribute('rel') != 'checked') return false;
						var son = this.firstChild;
						son.style.display = 'block';
						if (UI.E(e).target == this) {
							if (!w_son) w_son = son.offsetWidth;
							son.style.left = '';
							if (w_son + UI.getX(son) > UI.windowWidth() || son.parentNode.parentNode.style.left != '') {
								son.style.left = - w_son + 'px';
							}
						}
						if (UI.B.ie6) {
							iframe[son.getAttribute('iframe')].style.cssText = 'display:block;top:' + (UI.getY(son) - UI.getY(Self.body)) + 'px;left:' + (UI.getX(son) - UI.getX(Self.body)) + 'px;width:' + son.offsetWidth + 'px;height:' + son.offsetHeight + 'px;';
						}
					}
				}
				e.onmouseout = function(e){ //Menu Out
					UI.removeClass(this,'hover');
					if (this.son) {
						var son = this.firstChild;
						son.style.display = '';
						if (UI.B.ie6) iframe[son.getAttribute('iframe')].style.cssText = '';
					}
				}
			})

			//Function
			function parseMenu(actions) {
				var input,checked,name;
				html.push('<ul iframe="' + iframe.length + '">');
				if (UI.B.ie6) iframe.push(UI.html(iframeStr)[0]);
				for (var i = 0,num = actions.length;i < num;i++) {
					input = actions[i].extend && actions[i].extend.match(/\binput\b/gi) ? 'Input' : '';
					if (actions[i].name) {
						html.push('<li' + (actions[i].data ? ' rel="son"' : '') + (actions[i].call ? ' call="' + call.length + '"' : '') + ' class="' + input + '">');
						if (actions[i].call) {
							call.push(actions[i].call);
						}
						if (actions[i].data) {
							var tmp = actions[i].data;
							parseMenu(tmp);
						}
						if (actions[i].extend) {
							html.push(actions[i].extend);
							checked = actions[i].extend.match(/\bchecked\b/gi) ? 'checked' : '';
							name = actions[i].extend.replace(/'/g,'"').match(/\bname="(\w*)"/gi);
							if (input) html.push('<b ' + (name ? name : '') + ' rel="' + checked + '" class="' + (actions[i].extend.match(/\bradio\b/gi) ? 'radio' : 'checkbox') + (checked ? '_' + checked : '') + '"></b>');
						}
						html.push('<span>' + actions[i].name + '</span></li>');
					}
					else html.push('<li class="line"></li>');
				}
				html.push('</ul>');
			}
		},
		show : function(e) {
			var E = UI.E(e);
			E.stop();
			if (!this.popupTmp && (!this.actions || !this.actions.length)) {
				this.hide();
				return false;
			}
			if ((!this.popupTmp || this.body.innerHTML == '') && this.actionsCache) {
				this.build();
			}

			if (wrap.innerHTML != '') wrap.removeChild(wrap.firstChild);
			wrap.appendChild(this.body);
			wrap.style.display = 'block';
			this.display = true;
			var w_window = UI.windowWidth(),w_self = this.body.offsetWidth,h_window = UI.windowHeight(),h_self = this.body.offsetHeight,x_scroll = UI.scrollX(),y_scroll = UI.scrollY(),x = E.x,y = E.y;
			wrap.style.top = (y + y_scroll) + 'px';
			wrap.style.left = (x + x_scroll) + 'px';
			wrap.style.margin = '';
			if (w_self + E.x > w_window) wrap.style.marginLeft = - w_self + 'px';
			if (h_self + E.y > h_window) wrap.style.marginTop = - h_self + 'px';
			if (this.cover) this.cover.style.cssText = 'display:block;width:' + (w_self + 2) + 'px;height:' + (h_self + 2) + 'px;';
			
			if (this.popupTmp) {
				this.actions = this.actionsCache;
				this.actionsCache = null;
			}
			this.popupTmp = false;
			return false;
		},
		hide : function() {
			wrap.style.display = 'none';
			if (this.cover) this.cover.style.cssText = '';
			this.display = false;
		}
	}
})();