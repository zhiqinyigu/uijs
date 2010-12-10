/**
 * MI Login
 * Author : xhlv@tencent.com
 * Datetime : 
 * Last Eidt: 
*/
$ = UI.G;
$$ = UI.GC;
MI = {
	/**
	 * 获取Json对象
	 * 
	 * @param {String} String Json字符串
	 * @return {Object} Object Json对象
	 *            @example
	 *            data = MI.json(data); //主要用于Json容错
	 */
	json : function(data){
		var o = {};
		try{
			o = eval('(' + data + ')');
		}catch(e){};
		return o;
	}
}
function trim(str) {
	return str.replace(/^\s*|\s*$/g, '');
}
function gcookie(n) {
	var N = n + '=',C = document.cookie.split(';');
	for(var i=0;i<C.length;i++) {
		var c = C[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(N) == 0) return decodeURIComponent(c.substring(N.length,c.length));
	}
	return null;
}
var Bos = function(op,value) {
	try{
		var ouin = trim(gcookie('o_cookie')||'');
		Bos.pic.src = 'http://btrace.qq.com/collect?sIp=&iQQ=' + ouin + '&sBiz=microblog&sOp=' + op + '&iSta=0&iTy=18&iFlow=0' + (value ? '&sServerIp=&iBackInt1=&iBackInt2=&sBackStr1=' + value : '');
	}catch(e){}
}
Bos.pic = new Image();
UI.ready(function(){
	new MI.TalkListUpdate({
		id : 'wording',
		hoverStop : 1,
		url : '/login/loginNews.php',
		tmpl : '<li class="clear">\
		<div class="pic"><a><img src="<%=pic%>"></a></div>\
		<div class="msgBox"><p><strong><a><%=nick%></a><%=icon%>：</strong><%=content%></p><p class="pubInfo"><%=from%></p></div>\
		</li>'
	});
	function show(){
	}
	function load(firstLoad){

	}
	var story = $('story').firstChild,
		topic = $$(story,'a'),
		length = topic.length;
	UI.C(topic[0],'border',0);
	UI.C(topic[length - 1],'marginRight','100px');
	/*new MI.Scroll({
		id : 'story',
		width : 475
	});*/
	UI.each($$('.story a'),function(o){
		o.onclick = function(){
			Bos('btnLoginTopic');
		}
	});
	UI.each($$('.people a'),function(o){
		o.onclick = function(){
			Bos('btnLoginUser');
		}
	});
	UI.each($$('.rank a'),function(o){
		o.onclick = function(){
			Bos('btnLoginHotUser');
		}
	});
});