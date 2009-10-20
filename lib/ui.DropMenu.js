UI.DropMenu = function(o) { //UI.DropMenu({id:'menu',menu:'menu_list',multi:true,max:15,type:['click','mouseover']});
	o.open = false; //Menu Open Status To Reduce Memory
	if (UI.isString(o.id)) o.id = UI.G(o.id);
	if (o.max == undefined) o.max = 10; //Max Height
	if (o.type == undefined) o.type = ['click','click']; //o.type = [open,close]
	else if (o.type.length == 1) o.type = [o.type,o.type];
	if (o.menu != undefined) {
		if (UI.isString(o.menu)) o.menu = UI.G(o.menu);
		if (!o.id || !o.menu) return false;
		if (o.multi) { //Multi Select
			o.parent = o.id.parentNode;
			var li = UI.GT(o.menu,'li');
			if (li.length > o.max) {
				var height = UI.C(li[0],'height');
				height = height == 'auto' ? 20 : height.slice(0,-2);
				o.menu.style.height = o.max * height + 'px';
				o.menu.style.overflow = 'auto';
			}
		}
		UI.EA(document,o.type[1],function(e){ //Document
			if (o.open) {
				if (UI.E(e).target != o.id) {
					UI.hide(o.menu);
					if (o.multi) UI.removeClass(o.parent,'on');
					o.open = false;
				}
			}
		});
		UI.EA(o.id,o.type[0],function(e){ //Menu
			if (o.type == 'mouseover') {
				UI.E(e).stop();
				UI.show(o.menu);
			}
			else UI.toggle(o.menu);
			if (o.multi) UI.toggleClass(o.parent,'on');
			o.open = o.menu.style.display == 'block' ? true : false;
		});
		if (o.hover) {
			UI.EA(o.id,'mouseover',function(e){
				UI.addClass(this,o.hover);
			});
			UI.EA(o.id,'mouseout',function(e){
				UI.removeClass(this,o.hover);
			});
		}
		UI.EA(o.menu,o.type[1],function(e){ //Menu list
			UI.E(e).stop();
		});
	}
	else {
		
	}
}