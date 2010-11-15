/**
 * MI.Scroll
 * Author : xhlv@tencent.com
 * Datetime : 
 * Last Eidt: 
*/
MI.Scroll = function(obj){
	var Self = this;
	Self._body = UI.isString(obj.id) ? $(obj.id) : obj.id;
	if (Self._body) {
		Self._first = Self._body.firstChild;
		Self._clone = UI.html('<span style="width:auto;display:inline-block">' + Self._first.innerHTML + '</span>')[0];
		UI.append(Self._clone,Self._first);
		Self.left = parseInt(UI.C(Self._first,'marginLeft'));
		Self.width = UI.width(Self._clone);
		if (obj.width && Self.width < obj.width){
			UI.remove(Self._clone);
			return;
		}

		if (obj.step) {
			Self.step = obj.step;
		}
		if (obj.speed) {
			Self.speed = obj.speed;
		}

		//Event
		UI.EA(Self._body,'mouseover',function(){
			Self.stop = 1;
		});
		UI.EA(Self._body,'mouseout',function(){
			Self.stop = 0;
		});

		setInterval(function(){
			if (!Self.stop) {
				var left = parseInt(UI.C(Self._first,'marginLeft') || Self.left);
				if (left < - Self.width) {
					left = Self.left; 
				}
				Self._first.style.marginLeft = left - Self.step + 'px';
			}
		},Self.speed);
	}
}
MI.Scroll.prototype = {
	stop : 0,
	step : 1,
	speed : 50
}