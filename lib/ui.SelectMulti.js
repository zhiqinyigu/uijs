UI.selectMulti = function(o,n) {
	if (UI.isString(o)) {
		n = o;
		o = document.documentElement;
	}
	if(!o) o = document.documentElement;

	var n = '.' + (n ? n : 'selectMulti');
	
	UI.each(UI.GC(o,n),function(o,i){
		var name = 'selectMulti_' + new Date().getTime() + i;
		o.name = name;
		window[name] = new UI.SelectMulti(o);
	});
};
UI.SelectMulti = function(o) {
	this.name = o.name;
	this.body = o;
	this.cont = UI.GC(o,'.cont')[0];
	this.input = o.firstChild;
	this.checkbox = UI.GT(UI.GT(this.cont,'ul')[0],'input');
	this.tools = UI.GC(o,'div.tools')[0];
	this.value = this.input.value;
	this.readyonly = UI.A(this.input,'readonly');
	this.display = false;
	this.click = false; //If Click The Menu

	var cont = this.cont,input = this.input,name = this.name,checkbox = this.checkbox;

	new UI.resize(this.cont,{min:{x:100,y:30}});
	UI.EA(UI.GC(this.body,'b.ico')[0],'click',function(e){
		UI.E(e).stop();
	})

	if (UI.Browser.ie6) {
		var iframe = UI.html('<iframe src="javascript:false;" style="display:none;"></iframe>')[0];
		UI.before(iframe,this.cont);
		setInterval(function(){
			iframe.style.cssText = 'position:absolute;filter:alpha(opacity=0);z-index:-1;top:' + cont.offsetTop + ';left:' + cont.offsetLeft + ';width:' + cont.offsetWidth + 'px;height:' + cont.offsetHeight + 'px;';
		},200);
	}
	if (this.checkbox.length > 7) {
		this.cont.style.height = '161px';
	}
	if (!this.tools) {
		this.cont.style.padding = '0';
	}
	else {
		var button = UI.GT(this.tools,'input');
		UI.each(button,function(o){
			UI.EA(o,'click',function(e){
				var T = UI.E(e).target;
				if (UI.hasClass(T,'SelectAll')) {
					UI.each(checkbox,function(o){
						o.checked = true;
					});
				}
				if (UI.hasClass(T,'SelectReverse')) {
					UI.each(checkbox,function(o){
						o.checked = o.checked ? false : true;
					});
				}
			});
		});
	}

	UI.EA(document,'click',function(e){
		var E = UI.E(e);
		if (E.target != input) {
			window[name].hide();
		}
	});
	UI.EA(this.input,'click',function(){
		if (window[name].display) window[name].hide();
		else window[name].show();
	});
	UI.EA(this.cont,'click',function(e){
		UI.E(e).stop();
		var num = 0,cur = 0;
		UI.each(checkbox,function(o,i){
			if (o.checked) {
				cur = i
				num++;
			}
		});
		var P = checkbox[cur].parentNode;
		if (window[name].readyonly) {
			if (num == 0) {
				input.value = '';
			}
			else if (num == 1) {
				input.value = P.innerText || P.textContent;
			}
			else {
				input.value = UI.A(input,'rel') + ' x ' + num;
			}
		}
		else {
			window[name].fillValue();
		}
		window[name].click = true;
	});

	//Hide
	var delay;
	UI.EA(this.cont,'mouseout',function(e){
		delay = setTimeout(function(){
			if (window[name].click) window[name].hide();
		},50);
	});
	UI.EA(this.cont,'mouseover',function(e){
		clearTimeout(delay);
	});

	this.fillValue = function(){
		var arr_1 = this.input.value ? this.input.value.split(',') : [],arr_2 = [],arr_3 = [];
		for (var i = 0,n = checkbox.length;i < n;i++) {
			var text = checkbox[i].parentNode.innerText || checkbox[i].parentNode.textContent;
			if (checkbox[i].checked) arr_2.push(text);
			else arr_3.push(text);
		}
		this.input.value = UI.apart(UI.merge(UI.merge(arr_1),arr_2),arr_3).join(',');
	}
	this.hide = function(){
		UI.removeClass(this.body,'on');
		this.cont.style.display = 'none';
		UI.removeClass(this.body,'top');
		this.display = false;
		this.click = false;
	}
	this.show = function(){
		UI.addClass(this.body,'on');
		this.cont.style.display = 'block';
		var h_cont = UI.height(this.cont),h_input = UI.height(this.input),h_window = UI.windowHeight(),h_page = UI.pageHeight(),y_input = UI.getY(this.input),y_scroll = UI.scrollY();
		var h_hack = (this.tools && !UI.Browser.ie && document.compatMode == 'BackCompat') ? UI.height(this.tools) : 0; //CSS Hack
		if (h_cont + h_input + y_input - y_scroll > h_window) {
			UI.addClass(this.body,'top');
			if (UI.height(this.cont) >= y_input - y_scroll) {
				UI.C(this.cont,'height',y_input - y_scroll - 20 - h_hack + 'px');
			}
			if (UI.height(this.cont) > y_input) {
				UI.C(this.cont,'height',y_input - h_hack + 'px');
			}
		}
		else if (h_cont + h_input + y_input > h_window) {
			UI.C(this.cont,'height',h_window - h_input - y_input + 'px');
		}
		this.display = true;
	}
}