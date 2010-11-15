/**
 * MI.TalkListUpdate
 * Author : xhlv@tencent.com
 * Datetime : 
 * Last Eidt: 
*/
MI.TalkListUpdate = function(obj){
	var Self = this;
	Self._body = $(obj.id) || obj.id;
	Self.list = [];
	Self.cache = {};
	for (var i in obj){
		Self[i] = obj[i];
	}
	UI.each(Self._body.childNodes,function(o){
		Self.cache[o.id] = 1;
	});
	if (Self.hoverStop){
		UI.EA(Self._body,'mouseover',function(){
			Self.stop = 1;
		});
		UI.EA(Self._body,'mouseout',function(){
			Self.stop = 0;
		});
	}
	Self.load(1);
}
MI.TalkListUpdate.prototype = {
	cache : [],
	time : 5000,
	stop : 0,
	hoverStop : 0,
	speed : 0.2,
	num : 5,
	tmpl : '',
	heightHack : null,
	show : function(){
		var Self = this,
			listObj = Self.list[0];
		if (Self.stop) {
			return;
		}
		if (listObj) {
			var li = UI.html(new UI.tmplString(Self.tmpl)(listObj))[0],
				height;
			Self.cache[listObj.id] = 1;
			UI.prepend(li,Self._body);
			height = UI.height(li);
			UI.C(li,'height',0);
			UI.C(li,'opacity',0);
			if (!UI.isNumber(Self.heightHack)){
				Self.heightHack = parseInt(UI.C(li,'paddingTop')) + parseInt(UI.C(li,'paddingBottom'));
			}
			UI.animate(li,'height',height - Self.heightHack,function(){
				if (Self._body.childNodes.length > Self.num) {
					UI.remove(Self._body.lastChild);
				}
				//setTimeout(function(){
					UI.animate(li,'opacity',1,function(){
					},Self.speed,30);
				//},200);
			},Self.speed,20);
			Self.list.splice(0,1);
		}
		if (Self.list.length < Self.num) {
			Self.load();
		}
	},
	load : function(firstLoad){
		var Self = this;
		UI.ajax({
			url : Self.url,
			success : function(data){
				data = MI.json(data);
				if(data.result == 0){
					var tmp = [];
					for(var i in data.info.talk){
						if (!Self.cache[data.info.talk[i].id]) {
							tmp.push(data.info.talk[i]);
						}
					}
					Self.list = tmp.concat(Self.list);
					if (firstLoad) {
						setTimeout(function(){
							Self.show();
							setInterval(function(){
								Self.show();
							},Self.time);
						},1000);
					}
				}
			}
		});
	}
}