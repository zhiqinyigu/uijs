/**
 * UI.ColorPicker
 * Author : xhlv@tencent.com
 * Datetime : 2010-12-16
 * Last Eidt: 
*/
(function(){
var appended;
UI.ColorPicker = {
	_body : UI.html('<div class="colorPicker">\
		<div class="colorPickerBox"><b class="colorPickerBoxArrow"></b></div>\
		<div class="colorPickerBar"><b class="colorPickerBarArrow"></b></div>\
		<div class="colorPickerColor"></div>\
		<div class="colorPickerValue"><input type="text" maxlength="7" size="7"></div>\
		<button class="colorPickerConfirm">确定</button>\
	</div>')[0],
	display : 0,
	target : null,
	scale : {},
	build : function(){
		var Self = this;
		//Dom
		Self._box = dom('.colorPickerBox');
		Self._boxArrow = dom('.colorPickerBoxArrow');
		Self._bar = dom('.colorPickerBar');
		Self._barArrow = dom('.colorPickerBarArrow');
		Self._box = dom('.colorPickerBox');
		Self._color = dom('.colorPickerColor');
		Self._value = dom('.colorPickerValue input');
		Self._confirm = dom('.colorPickerConfirm');

		//Event
		UI.EA(Self._body,'click',stop);
		UI.EA(Self._boxArrow,'click',stop);
		UI.EA(Self._confirm,'click',function(){
			Self.confirm();
		});
		UI.EA(Self._value,'blur',function(){
			Self.rgb = Self.RGB(Self._value.value);
			Self.hsb = Self.RGB_HSB(Self.rgb);
			Self.set();
		});
		var x,y,X,Y,top,left,Top,Left,barHeight,boxHeight;
		UI.drag(Self._barArrow,{
			start : function(e){
				var E = UI.E(e);
				y = E.y;
				top = parseInt(UI.C(Self._barArrow,'top'));
			},
			drag : function(e){
				var E = UI.E(e),
					Top = top + E.y - y;
				if (Top < 0 || Top > barHeight) {
					return;
				}
				UI.C(Self._barArrow,'top',Top + 'px');
				Self.hsb.h = Top * Self.scale.bar;
				Self.rgb = Self.HSB_RGB(Self.hsb);
				Self._value.value = Self.RGB_Hex(Self.rgb);
				UI.C(Self._box,'backgroundColor',Self._value.value);
				if (Self.call) {
					Self.call(Self._value.value);
				}
			}
		});
		UI.drag(Self._boxArrow,{
			start : function(e){
				var E = UI.E(e);
				y = E.y;
				x = E.x;
				top = parseInt(UI.C(Self._boxArrow,'top')),
				left = parseInt(UI.C(Self._boxArrow,'left'));
			},
			drag : function(e){
				var E = UI.E(e),
					Top = top + E.y - y,
					Left = left + E.x - x;
				if (Top >= 0 && Top <= boxHeight) {
					UI.C(Self._boxArrow,'top',Top + 'px')
					Self.hsb.b = 100 - Top * Self.scale.box;
				}
				if (Left >= 0 && Left <= boxHeight) {
					UI.C(Self._boxArrow,'left',Left + 'px')
					Self.hsb.s = Left * Self.scale.box;
				}
				Self.rgb = Self.HSB_RGB(Self.hsb);
				Self._value.value = Self.RGB_Hex(Self.rgb);
				UI.C(Self._box,'backgroundColor',Self._value.value);
				if (Self.call) {
					Self.call(Self._value.value);
				}
			}
		});

		UI.append(Self._body,document.body);
		barHeight = UI.height(Self._bar);
		boxHeight = UI.height(Self._box);
		Self.scale.bar = 360 / barHeight;
		Self.scale.box = 100 / boxHeight;
	},
	RGB : function(color){
		var rgb,type;
		if (color.hasString('#')) {
			rgb = color.match(/\w\w/g);
			type = 16;
		}
		else if (color.hasString('(')) {
			rgb = color.match(/\d{1,3}/g);
			type = 10;
		}
		return {
			r : parseInt(rgb[0],type),
			g : parseInt(rgb[1],type),
			b : parseInt(rgb[2],type)
		};
	},
	RGB_Hex : function(rgb){
		return '#' + UI.addZero(rgb.r.toString(16)) + UI.addZero(rgb.g.toString(16)) + UI.addZero(rgb.b.toString(16));
	},
	RGB_HSB : function(rgb) {
		var hsb = {
			h: 0,
			s: 0,
			b: 0
		};
		var min = Math.min(rgb.r,rgb.g,rgb.b);
		var max = Math.max(rgb.r,rgb.g,rgb.b);
		var delta = max - min;
		hsb.b = max;
		if (max != 0) {
			
		}
		hsb.s = max != 0 ? 255 * delta / max : 0;
		if (hsb.s != 0) {
			if (rgb.r == max) {
				hsb.h = (rgb.g - rgb.b) / delta;
			}
			else if (rgb.g == max) {
				hsb.h = 2 + (rgb.b - rgb.r) / delta;
			}
			else {
				hsb.h = 4 + (rgb.r - rgb.g) / delta;
			}
		}
		else {
			hsb.h = -1;
		}
		hsb.h *= 60;
		if (hsb.h < 0) {
			hsb.h += 360;
		}
		hsb.s *= 100 / 255;
		hsb.b *= 100 / 255;
		return hsb;
	},
	HSB_RGB : function (hsb) {
		var rgb = {};
		var h = Math.round(hsb.h);
		var s = Math.round(hsb.s * 255 / 100);
		var v = Math.round(hsb.b * 255 / 100);
		if(s == 0) {
			rgb.r = rgb.g = rgb.b = v;
		} else {
			var t1 = v;
			var t2 = (255 - s) * v / 255;
			var t3 = (t1 - t2) * (h % 60) / 60;
			if (h == 360) h = 0;
			if (h < 60) {
				rgb.r = t1;
				rgb.b = t2;
				rgb.g = t2 + t3;
			}
			else if (h < 120) {
				rgb.g = t1;
				rgb.b = t2;
				rgb.r = t1 - t3;
			}
			else if (h < 180){
				rgb.g = t1;
				rgb.r = t2;
				rgb.b = t2 + t3;
			}
			else if (h < 240) {
				rgb.b = t1;
				rgb.r = t2;
				rgb.g = t1 - t3;
			}
			else if (h < 300) {
				rgb.b = t1;
				rgb.g = t2;
				rgb.r = t2 + t3;
			}
			else if (h < 360) {rgb.r=t1; rgb.g=t2;	rgb.b=t1-t3}
			else {rgb.r=0; rgb.g=0;	rgb.b=0}
		}
		return {
			r : Math.round(rgb.r),
			g : Math.round(rgb.g),
			b : Math.round(rgb.b)
		};
	},
	confirm : function(){
		var Self = this,
			value = Self._value.value;
		if (Self.call) {
			Self.call(value);
		}
		Self.hide();
	},
	set : function(){
		var Self = this;
		Self._value.value = Self.RGB_Hex(Self.rgb);
		UI.C(Self._box,'backgroundColor',Self._value.value);
		UI.C(Self._barArrow,'top',Self.hsb.h / Self.scale.bar + 'px');
		UI.C(Self._boxArrow,'top',(100 - Self.hsb.b) / Self.scale.box + 'px')
		UI.C(Self._boxArrow,'left',Self.hsb.s / Self.scale.box + 'px')
		if (Self.call) {
			Self.call(Self._value.value);
		}
	},
	show : function(obj){ //Parameter:target,call
		var Self = this,
			E = UI.E(obj);
		E.stop();
		if (top.UI && top.UI.ColorPicker && top != self) { //Top Popup
			top.UI.ColorPicker.show(obj);
			return false;
		}
		if (!appended) { //Build
			Self.build();
			appended = 1;
		}

		Self.target = obj.target;
		Self.call = obj.call;
		Self.rgb = Self.RGB(UI.C(Self.target,'backgroundColor'));
		Self.hsb = Self.RGB_HSB(Self.rgb);
		Self.set();

		UI.EA(document.body,'click',hide);
		UI.show(this._body);
		this.display = 1;
	},
	hide : function(){
		if (this.display) {
			UI.ER(document.body,'click',hide);
			UI.hide(this._body);
			this.display = 0;
		}
	}
}
function dom(n) {
	return UI.GC(UI.ColorPicker._body,n)[0];
}
function hide() {
	UI.ColorPicker.hide();
}
function stop(e) {
	UI.E(e).stop();
}
})();