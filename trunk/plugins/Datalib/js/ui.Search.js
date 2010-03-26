/*
	http://ericapi.webdev.com/php/d_search_js.php?lib=joazhang&fun=UI.Search.show&mid=81&pn=1&tc=2&tp=2&cp=2
	* lib           The Alias of lib.
	* orderby       The condition for sorting.
	* isaudited     The status of publish.
	* exceptid      The data id which will be excluded.
	* shorttextonly Exclude the attribute of text type.
	* filtervalue   The value of attribute for query, '|' means 'and'.
	* filterattr    The name of attribute for query, ',' means 'or'.
	* keyword       The key word for query. It is more preferable than filterattr。
	* attr          The attribute for query.
	* stype         The flag for fuzzy query. 1 for fuzzy, 2 for accurate.
	* cp            The current page.
	* tc            The total records.
	* tp            The total pages.
	* pn            The number of record in each page.
	* fun           The function name of js.
	* f             The flag of simple or complex style.
*/
UI.Search = {
	_body : UI.G('search'),
	_result : UI.G('result'),
	_resultWrap : UI.G('search_result_wrap'),
	_searchWrap : UI.G('search_wrap'),
	_page : UI.G('page'),
	_tipKey : UI.G('tipKey'),
	_tipNum : UI.G('tipNum'),
	_tipResult : UI.G('tipResult'),
	_tipLoad : UI.G('tipLoad'),
	key : [],
	checked : 0,
	type : 0,
	picName : ['4.','2.'],
	field : [[],[]],
	numTotal : 0,
	libName : '',
	pageNum : 20, //Number Of Per Page
	action : 'http://ericapi.webdev.com/php/d_search_js.php?fun=UI.Search.show',
	tmpl : ['<div class="pane"><ul class="pohto s_100_75 left"><%for(var i=0;i<data.length;i++){%><li><a href="<%=data[i][2]%>" class="box" style="background-image:url(<%=data[i][1]%>)" target="_blank"><img src="<%=data[i][1]%>" /></a><div class="li"><a href="<%=data[i][2]%>" class="txt" target="_blank" title="<%=data[i][0]%>"><%=data[i][0]%></a></div><%for(var j=0;j<field[UI.Search.type].length;j++){%><div class="li" title="<%=data[i][3][j]%>"><%=field[UI.Search.type][j]%>:<%=data[i][3][j]%></div><%}%></li><%}%></ul></div>','<div class="data_list"><ul><%for(var i=0;i<data.length;i++){%><li<% if(i+1==data.length){%> class="last"<%}%>><img src="<%=data[i][1]%>" width="120" class="box" /><p><a href="<%=data[i][2]%>" target="_blank"><%=data[i][0]%></a><%for(var j=0;j<field[UI.Search.type].length;j++){%><br /><%=field[UI.Search.type][j]%>:<%=data[i][3][j]%><%}%></p></li><%}%></ul></div>'],
	reset : function(){
		UI.each(UI.Search.key,function(o,i){
			UI.Search.keySelect(UI.GT(o,'a')[0],i);
		});
	},
	keySelect : function(el,i){ //选择关键字
		UI.G('key_numTotal').value = 0;
		UI.G('key_' + i).value = UI.A(el,'rel') === '0' ? '' : el.innerHTML;
		UI.removeClass(UI.GC(UI.Search.key[i],'.on')[0],'on');
		UI.addClass(el,'on');
	},
	typeSelect : function(){ //选择模板类型
		UI.removeClass(UI.GC(this.parentNode,'.on')[0],'on');
		UI.addClass(this,'on');
		this.blur();
		UI.Search.type = UI.G('key_type').value = UI.A(this,'rel');
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
				var cur = UI.GC(o,'.on')[0];
				UI.G('key_' + i).value = UI.A(cur,'rel') == 0 ? '' : cur.innerHTML;
			});
			UI.Search.checked = 1;
		}
		UI.each(UI.GC(UI.Search._body,'input'),function(o){ //UI.GC(UI.Search._body,'input[name=lib]')在IE中有bug，有空看一下
			if (UI.A(o,'name') == 'lib') {
				UI.Search.libName = o.value;
			}
		});
		var url = UI.Search.action,attr = [],value = [],key;
		attr.value = value.value = '';
		UI.each(UI.Search.key,function(o,i){
			key = UI.G('key_' + i);
			if (key.value) {
				attr.push(UI.A(key,'name').replace('key_',''));
				value.push(key.value);
			}
		});
		UI.G('key_attr').value = attr.join('|');
		UI.G('key_value').value = value.join('|');
		UI.each(UI.GT(UI.Search._body,'input'),function(o,i){
			url += '&' + UI.A(o,'name') + '=' + o.value;
		});
		UI.getScript(url);
	},
	show : function(o){
		var key = [];
		UI.each(UI.Search.key,function(o,i){
			var cur = UI.GC(o,'.on')[0];
			if (UI.A(cur,'rel') == '') {
				key.push(cur.innerHTML);
			}
		});
		UI.Search._tipKey.innerHTML = key.length ? '<span id="tipKey">搜索“' + key.join('”“') + '”，</span>' : '';
		UI.Search.numTotal = UI.G('key_numTotal').value = UI.Search._tipNum.innerHTML = o.num;
		if (o.result) {
			if (o.data.length) {
				o.field = UI.Search.field;
				UI.each(o.data,function(o){
					o[1] = o[1] ? 'http://img1.gtimg.com/' + o[1].replace('.',UI.Search.picName[UI.Search.type]) : 'about:blank';
					o[2] = '/d/' + UI.Search.libName + '/' + Math.ceil(o[2] / 1000) + '/' + o[2] % 1000;
				});
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
		UI.show(UI.Search._resultWrap);
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
					if (start < 2) {
						start = 2;
					}
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

UI.ready(function(){
	//Search From Url
	var input;
	UI.Search.url = UI.parseUrl();
	for (var i in UI.Search.url) {
		input = UI.GC(UI.Search._body,'input[name=' + i + ']')[0];
		if (input) {
			input.value = UI.Search.url[i]
		}
		UI.Search.submit();
	}

	//Hide Wrap Which Is Not Need
	if (document.location.search) {
		UI.hide(UI.Search._searchWrap);
	}
	else UI.hide(UI.Search._resultWrap);
});
