UI.gotop = function(n) {
	this.Gotop.build(n);
}
UI.Gotop = {
	title : '返回顶部',
	className : 'gotop',
	text : 'Top',
	body : UI.DC('a'),
	_delay : null,
	build : function(id) {
		this.body.className = this.className;
		this.body.title = this.title;
		this.body.innerHTML = this.text;
		this.body.href = '#' + (id||'');
		document.body.appendChild(this.body);
		this.body.onfocus = function(){
			this.blur();
		}
		UI.EA(window,'scroll',function(){
			clearTimeout(UI.Gotop._delay);
			UI.Gotop._delay = setTimeout(function(){
				( window.scrollY || document.documentElement.scrollTop ) < 52 ? UI.Gotop.body.style.display = 'none':UI.Gotop.body.style.display = 'block';
			},50);
		});
	}
}