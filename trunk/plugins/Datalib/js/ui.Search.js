UI.Search = {
	_body : UI.G('search'),
	_result : UI.G('result'),
	_page : UI.G('page'),
	_tipKey : UI.G('tipKey'),
	_tipNum : UI.G('tipNum'),
	_tipResult : UI.G('tipResult'),
	_tipLoad : UI.G('tipLoad'),
	key : [],
	checked : 0,
	type : 0,
	field : [[],[]],
	numTotal : 0,
	libName : '',
	pageNum : 20, //Number Of Per Page
	action : 'http://search.dataliba.qq.com?callback=UI.Search.show',
	tmpl : ['<div class="pane"><ul class="pohto s_100_75 left"><%for(var i=0;i<data.length;i++){%><li><a href="<%=data[i][2]%>" class="box" style="background:url(<%=data[i][1]%>)"><img src="images/pic_14.png" /></a><a href="<%=data[i][2]%>" class="txt"><%=data[i][0]%></a><%for(var j=0;j<data[i][3].length;j++){%><br /><%=UI.Search.field[UI.Search.type][j]%>:<%=data[i][3][j]%><%}%></li><%}%></ul></div>','<div class="data_list"><ul><%for(var i=0;i<data.length;i++){%><li<% if(i+1==data.length){%> class="last"<%}%>><img src="<%=data[i][1]%>" width="120" height="90" class="box" /><p><a href="<%=data[i][2]%>"><%=data[i][0]%></a><%for(var j=0;j<data[i][3].length;j++){%><br /><%=UI.Search.field[UI.Search.type][j]%>:<%=data[i][3][j]%><%}%></p></li><%}%></ul></div>'],
	reset : function(){
		UI.each(UI.Search.key,function(o,i){
			UI.Search.keySelect(UI.GT(o,'a')[0],i);
		});
	},
	keySelect : function(el,i){ //选择关键字
		UI.G('key_' + i).value = UI.A(el,'rel');
		UI.removeClass(UI.GC(UI.Search.key[i],'.on')[0],'on');
		UI.addClass(el,'on');
	},
	typeSelect : function(){ //选择模板类型
		UI.Search.type = UI.A(this,'rel');
		UI.Search.submit();
		return false;
	},
	tabSelect : function(){ //选择排序页签
		UI.G('key_sort').value = UI.A(this,'rel');
		var P = this.parentNode;
		UI.removeClass(UI.GC(P.parentNode,'.on')[0],'on');
		UI.addClass(this.parentNode,'on');
		this.blur();
		UI.Search.submit();
		return false;
	},
	submit : function(){
		if (!UI.Search.checked) { //Kill Value Bug By Refresh
			UI.each(UI.Search.key,function(o,i){
				UI.G('key_' + i).value = UI.A(UI.GC(o,'.on')[0],'rel');
			});
			UI.Search.checked = 1;
		}
		var url = UI.Search.action;
		UI.each(UI.GT(UI.Search._body,'input'),function(o,i){
			url += '&' + UI.A(o,'name') + '=' + o.value;
		});
		UI.getScript(url);
	},
	show : function(o){
		var key = [];
		if (o.num) {
			UI.Search.numTotal = UI.G('key_numTotal').value = o.num;
		}
		UI.each(UI.Search.key,function(o,i){
			var cur = UI.GC(o,'.on')[0];
			if (UI.A(cur,'rel') != 0) {
				key.push(cur.innerHTML);
			}
		});
		UI.Search._tipKey.innerHTML = key.length ? '<span id="tipKey">搜索“' + key.join('”“') + '”，</span>' : '';
		UI.Search._tipNum.innerHTML = UI.Search.numTotal;
		if (o.result) {
			if (o.data.length) {
				UI.Search._result.innerHTML = new UI.tmplString(UI.Search.tmpl[UI.Search.type])(o);
				UI.hide(UI.Search._tipResult);
			}
			else {
				UI.Search._result.innerHTML = '';
				UI.show(UI.Search._tipResult);
			}
			UI.Search.page = o.page;
			UI.Search.pageShow(o.page[0],o.page[1]);
			UI.hide(UI.Search._tipLoad);
		}
	},
	pageShow : function(cur,total){
		if (total > 1) {
			var html = [],start,end;
			html.push('<a id="prev" ' + (cur == 1 ? 'class="disabled"' : 'href="#"') + '>上一页</a>');
			html.push('<a ' + (cur == 1 ? 'class="selected"' : 'href="#"') + '>1</a>');
			if (total > 2) {
				if (cur - 4 > 2) {
					html.push('<span class="dot">...</span>');
				}
				start = cur > 5 ? cur - 4 : 2;
				if (total - start < 8) {
					start = total - 8;
				}
				end = start + (start == 2 ? 8 : 9);
				for (var i = start;i < end && i < total;i++) {
					html.push('<a ' + (cur == i ? 'class="selected"' : 'href="#"') + '>' + i + '</a>');
				}
				if (i <= total - 1) {
					html.push('<span class="dot">...</span>');
				}
			}
			html.push('<a ' + (cur == total ? 'class="selected"' : 'href="#"') + '>' + total + '</a>');
			html.push('<a id="next" ' + (cur == total ? 'class="disabled"' : 'href="#"') + '>下一页</a>');
			UI.Search._page.innerHTML = html.join('');
			UI.each(UI.GC(UI.Search._page,'a'),function(o){
				o.onclick = UI.Search.pageSelect;
			});
			UI.show(UI.Search._page);
		}
		else {
			UI.hide(UI.Search._page);
		}
		UI.G('key_num').value = cur;
	},
	pageSelect : function(){
		var num = UI.G('key_num').value;
		if (UI.hasClass(this,'disabled')) return;
		if (this.id == 'prev') {
			num--;
		}
		else if (this.id == 'next') {
			num++;
		}
		else {
			num = parseInt(this.innerHTML);
		}

		if (num <= 0) {
			num = 1;
		}
		else if (num > UI.Search.page[1]) {
			num = UI.Search.page[1];
		}
		UI.G('key_num').value = num;
		UI.Search.submit();
		return false;
	}
};
UI.each(UI.GC('.key'),function(o,i){
	UI.Search.key.push(o);
	UI.each(UI.GT(o,'a'),function(O){
		O.onclick = function(){
			UI.Search.keySelect(this,i);
			return false;
		}
	});
});
UI.each(UI.GC('.dl_tab_tools a'),function(o){
	o.onclick = UI.Search.typeSelect;
});
UI.each(UI.GC('.dl_tab_title a'),function(o){
	o.onclick = UI.Search.tabSelect;
});