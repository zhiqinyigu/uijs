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
UI.TagSearch = function(o){
	var Self = this;
	//Dom
	Self._body = UI.GC(o.target)[0];
	Self._tag = UI.GC(Self._body,'.tab a');

	//Data
	for (var i in o.value) {
		Self.action += '&' + i + '=' + o.value[i];
	}

	//Event
	UI.each(Self._tag,function(o){
		o.onclick = tag;
		o.onfocus = blur;
	});
	function tag(){
		if (!UI.hasClass(this,'disabled')) {
			UI.removeClass(UI.GC(this.parentNode,'.on')[0],'on');
			UI.addClass(this,'on');
			UI.getScript(Self.action + '&keyword=' + this.innerHTML);
		}
		return false;
	}
	function blur(){
		this.blur();
	}
}
UI.TagSearch.prototype = {
	action : 'http://ericapi.webdev.com/php/d_search_js.php?fun=UI.tagSearch.show',
	show : function(o){
		console.log(o);
	}
}