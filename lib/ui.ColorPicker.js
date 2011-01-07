(function() {
	/**
	 * UI.ColorPicker 取色控件
	 * 
	 * @namespace UI.ColorPicker 取色控件
	 * @author xhlv@tencent.com
	 * @type Object
	 */
	UI.ColorPicker = {
		/**
		 * HTML模版
		 * 
		 * @type {String} String HTML模版
		 *       @example
		 *       UI.ColorPicker.tmpl = '';
		 */

		tmpl : '<div class="colorPicker">\
			<h4 class="colorPickerTitle"></h4><a href="#" class="colorPickerClose" title="关闭"></a>\
			<div class="colorPickerBox"><div class="colorPickerBoxOpacity"></div><b class="colorPickerBoxArrow"><b></b></b></div>\
			<div class="colorPickerBar"><div></div><b class="colorPickerBarArrow"><b></b></b></div>\
			<div class="colorDetail"><div class="colorPickerColor"></div><div class="colorPickerValue"><span>#</span><input type="text" maxlength="6" size="6" value="43C632"></div></div>\
			<button class="colorPickerConfirm">确定</button>\
		</div>',
		appended : 0, // 是否插入Body
		display : 0, // 是否显示
		target : null, // 来源Dom
		cursor : 4, // 鼠标位置修正
		title : '选择颜色', // 标题
		scale : {}, // HSB值和样式值的比例
		/**
		 * 控件类型
		 * 
		 * @type {Array} Array 控件类型
		 *       @example
		 *       //HSB [色相,饱和度,亮度]
		 *            UI.ColorPicker.type = ['x','-y','-z']; //Windows模式
		 *            UI.ColorPicker.type = ['-z','x','-y']; //Photoshop模式
		 */
		type : ['-z', 'x', '-y'],
		action : {}, // 控制方向 0-正向 1-反向
		model : {}, // HSB和XYZ的对应表
		modelValue : function(value, model) { // 样式值 -> HSB值
			return this.action[model] ? this.model[model][1] - value
					* this.scale[model] : value * this.scale[model];
		},
		modelCss : function(value, model) { // HSB值 -> 样式值
			return (this.action[model] ? (this.model[model][1] - value)
					/ this.scale[model] : value / this.scale[model])
					+ 'px';
		},
		modelHtml : { // XYZ的HTML对照表
			x : ['_boxArrow', 'left'],
			y : ['_boxArrow', 'top'],
			z : ['_barArrow', 'top']
		},
		value : null, // 颜色值
		/**
		 * 构建HTML
		 * 
		 * @param {}
		 *            @example
		 *            UI.ColorPicker.build();
		 */
		build : function() {
			var Self = this;
			// Dom
			Self._body = UI.html(Self.tmpl)[0];
			Self._title = dom('.colorPickerTitle');
			Self._box = dom('.colorPickerBox');
			Self._boxArrow = dom('.colorPickerBoxArrow');
			Self._boxOpacity = dom('.colorPickerBoxOpacity');
			Self._bar = dom('.colorPickerBar');
			Self._barArrow = dom('.colorPickerBarArrow');
			Self._box = dom('.colorPickerBox');
			Self._color = dom('.colorPickerColor');
			Self._value = dom('.colorPickerValue input');
			Self._confirm = dom('.colorPickerConfirm');
			Self._close = dom('.colorPickerClose');

			// Model
			UI.each(Self.type, function(o, i) {
						var name = o.slice(-1);
						Self.action[name] = o.length == 2 ? 1 : 0;
						Self.type[i] = name;
					});
			Self.model[Self.type[0]] = ['h', 360]; // 色相 hues
			Self.model[Self.type[1]] = ['s', 100]; // 饱和度 saturation
			Self.model[Self.type[2]] = ['b', 100]; // 亮度 brightness
			Self.model.h = Self.type[0];
			Self.model.s = Self.type[1];
			Self.model.b = Self.type[2];
			if (Self.model.h == 'z') {
				Self.model.bg = '_box';
				Self._boxOpacity = null;
			} else {
				Self.model.bg = '_bar';
			}

			// Event
			UI.EA(document.body, 'click', hide);
			UI.EA(Self._body, 'click', stop);
			UI.EA(Self._boxArrow, 'click', stop);
			UI.EA(Self._confirm, 'click', function() {
						Self.confirm();
					});
			UI.EA(Self._value, 'blur', function() {
						Self.rgb = Self.RGB('#' + Self._value.value);
						Self.hsb = Self.RGB_HSB(Self.rgb);
						Self.setDom();
						setTimeout(function(){
							if (Self.stop) {
								Self.stop(Self.value);
							}
						},0);
					});
			Self._close.onclick = function() {
				Self.hide();
				return false;
			}
			Self._box.onselectstart = Self._bar.onselectstart = function() {
				return false;
			}
			var x, y, X, Y, top, left, Top, Left, scrollY, scrollX, barHeight, boxHeight;
			UI.drag(Self._bar, {
						start : function(e) {
							var E = UI.E(e);
							scrollY = UI.scrollY();
							y = E.y + scrollY;
							top = y - UI.getY(Self._bar) - Self.cursor;
							if (top < 0) { // Z Model
								top = 0;
							} else if (top > barHeight) {
								top = barHeight;
							}
							Self.hsb[Self.model.z[0]] = Self.modelValue(top,
									'z');
							UI.C(Self._barArrow, 'top', top + 'px');
							Self.setColor();
							if (Self.start) {
								Self.start(Self.value);
							}
						},
						drag : function(e) {
							var E = UI.E(e), Top = top + E.y - y + scrollY;
							if (Top < 0 || Top > barHeight) { // Z Model
								return;
							}
							UI.C(Self._barArrow, 'top', Top + 'px');
							Self.hsb[Self.model.z[0]] = Self.modelValue(Top,
									'z');
							Self.setColor();
							if (Self.drag) {
								Self.drag(Self.value);
							}
						},
						stop : function() {
							if (Self.stop) {
								Self.stop(Self.value);
							}
						}
					});
			UI.drag(Self._box, {
				start : function(e) {
					var E = UI.E(e);
					scrollY = UI.scrollY();
					scrollX = UI.scrollX();
					y = E.y + scrollY;
					x = E.x + scrollX;
					top = y - UI.getY(Self._box) - Self.cursor;
					left = x - UI.getX(Self._box) - Self.cursor;
					UI.C(Self._boxArrow, 'top', top + 'px');
					UI.C(Self._boxArrow, 'left', left + 'px');
					Self.hsb[Self.model.y[0]] = Self.modelValue(top, 'y');
					Self.hsb[Self.model.x[0]] = Self.modelValue(left, 'x');
					Self.setColor();
					if (Self.start) {
						Self.start(Self.value);
					}
				},
				drag : function(e) {
					var E = UI.E(e), Top = top + E.y - y + scrollY, Left = left + E.x - x + scrollX;
					if (Left >= 0 && Left <= boxWidth) { // X Model
						UI.C(Self._boxArrow, 'left', Left + 'px')
						Self.hsb[Self.model.x[0]] = Self.modelValue(Left, 'x');
					}
					if (Top >= 0 && Top <= boxHeight) { // Y Model
						UI.C(Self._boxArrow, 'top', Top + 'px')
						Self.hsb[Self.model.y[0]] = Self.modelValue(Top, 'y');
					}
					Self.setColor();
					if (Self.drag) {
						Self.drag(Self.value);
					}
				},
				stop : function() {
					if (Self.stop) {
						Self.stop(Self.value);
					}
				}
			});

			// Cursor Fixed
			if (UI.B.opera) {
				Self.cursor = 0;
			} else if (UI.B.ie){
				Self.cursor = 6;
			} else {
				Self.cursor = 4;
			}
			if (UI.B.mac) {
				Self.cursor++;
			}

			Self.appended = 1;
			UI.append(Self._body, document.body);
			barHeight = parseInt(UI.C(Self._bar, 'height'));
			boxWidth = parseInt(UI.C(Self._box, 'width'));
			boxHeight = parseInt(UI.C(Self._box, 'height'));
			Self.scale.x = Self.model.x[1] / boxWidth;
			Self.scale.y = Self.model.y[1] / boxHeight;
			Self.scale.z = Self.model.z[1] / barHeight;
			UI.hide(Self._body);
		},
		RGB : function(color) { // Hex -> RGB
			// IE,Firefox,Opera中透明为transparent，黑色为#000000
			// Chrome,Safari中透明为rgba(0,0,0,0)，黑色为rgb(0,0,0)
			var rgb = ['ff', 'ff', 'ff'], rgbTmp, type;
			if (color.hasString('#')) {
				rgbTmp = color.match(/\w\w/g);
				if (rgbTmp && rgbTmp.length == 3) {
					rgb = rgbTmp;
				}
				type = 16;
			} else if (color.hasString('b(')) {
				rgb = color.match(/\d{1,3}/g);
				type = 10;
			}
			return {
				r : parseInt(rgb[0], type),
				g : parseInt(rgb[1], type),
				b : parseInt(rgb[2], type)
			};
		},
		RGB_Hex : function(rgb) { // RGB -> Hex
			return '#' + UI.addZero(rgb.r.toString(16))
					+ UI.addZero(rgb.g.toString(16))
					+ UI.addZero(rgb.b.toString(16));
		},
		RGB_HSB : function(rgb) { // RGB -> HSB
			var hsb = {
				h : 0,
				s : 0,
				b : 0
			};
			var min = Math.min(rgb.r, rgb.g, rgb.b);
			var max = Math.max(rgb.r, rgb.g, rgb.b);
			var delta = max - min;
			hsb.b = max;
			if (max != 0) {

			}
			hsb.s = max != 0 ? 255 * delta / max : 0;
			if (hsb.s != 0) {
				if (rgb.r == max) {
					hsb.h = (rgb.g - rgb.b) / delta;
				} else if (rgb.g == max) {
					hsb.h = 2 + (rgb.b - rgb.r) / delta;
				} else {
					hsb.h = 4 + (rgb.r - rgb.g) / delta;
				}
			} else {
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
		HSB_RGB : function(hsb) { // HSB -> RGB
			var rgb = {};
			var h = Math.round(hsb.h);
			var s = Math.round(hsb.s * 255 / 100);
			var v = Math.round(hsb.b * 255 / 100);
			if (s == 0) {
				rgb.r = rgb.g = rgb.b = v;
			} else {
				var t1 = v;
				var t2 = (255 - s) * v / 255;
				var t3 = (t1 - t2) * (h % 60) / 60;
				if (h == 360)
					h = 0;
				if (h < 60) {
					rgb.r = t1;
					rgb.b = t2;
					rgb.g = t2 + t3;
				} else if (h < 120) {
					rgb.g = t1;
					rgb.b = t2;
					rgb.r = t1 - t3;
				} else if (h < 180) {
					rgb.g = t1;
					rgb.r = t2;
					rgb.b = t2 + t3;
				} else if (h < 240) {
					rgb.b = t1;
					rgb.r = t2;
					rgb.g = t1 - t3;
				} else if (h < 300) {
					rgb.b = t1;
					rgb.g = t2;
					rgb.r = t2 + t3;
				} else if (h < 360) {
					rgb.r = t1;
					rgb.g = t2;
					rgb.b = t1 - t3
				} else {
					rgb.r = 0;
					rgb.g = 0;
					rgb.b = 0
				}
			}
			return {
				r : Math.round(rgb.r),
				g : Math.round(rgb.g),
				b : Math.round(rgb.b)
			};
		},
		confirm : function() { // 确定按钮
			var Self = this;
			if (Self.stop) {
				Self.stop(Self.value);
			}
			Self.hide();
		},
		setColor : function() { // 设置颜色变化
			var Self = this;
			Self.rgb = Self.HSB_RGB(Self.hsb);
			Self.value = Self.RGB_Hex(Self.rgb);
			Self._value.value = Self.value.replace('#', '');
			UI.C(Self[Self.model.bg], 'backgroundColor', Self.RGB_Hex(Self
							.HSB_RGB({
										h : Self.hsb.h,
										s : 100,
										b : 100
									})));
			UI.C(Self._color, 'backgroundColor', Self.value);
			if (Self._boxOpacity) {
				UI.C(Self._boxOpacity, 'opacity', Self.hsb.b / 100);
			}
		},
		setDom : function() { // 设置箭头和取色点的位置
			var Self = this;

			UI.C(Self[Self.modelHtml[Self.type[0]][0]],
					Self.modelHtml[Self.type[0]][1], Self.modelCss(Self.hsb.h,
							Self.model.h));
			UI.C(Self[Self.modelHtml[Self.type[1]][0]],
					Self.modelHtml[Self.type[1]][1], Self.modelCss(Self.hsb.s,
							Self.model.s))
			UI.C(Self[Self.modelHtml[Self.type[2]][0]],
					Self.modelHtml[Self.type[2]][1], Self.modelCss(Self.hsb.b,
							Self.model.b))

			Self.setColor();
		},
		/**
		 * 显示取色控件
		 * 
		 * @param {Object}
		 *            Object event对象
		 * @param {Object}
		 *            Object 显示参数
		 *            @example
		 *            <a href="#" onclick="var T=this;UI.ColorPicker.show(event,{drag:function(value){UI.C(T,'background',value)}});return false" style="background:#FF6699"></a>
		 */
		show : function(e, obj) { // Parameter:target,call
			var Self = this, E = UI.E(e), obj = obj || {};
			E.stop();
			if (top.UI && top.UI.ColorPicker && top != self) { // Top Popup
				top.UI.ColorPicker.show(obj);
				return false;
			}
			if (!Self.appended) { // Build
				Self.build();
			}

			Self.target = E.target;
			Self.position = obj.position ? obj.position : E.target;
			Self.start = obj.start;
			Self.drag = obj.drag;
			Self.stop = obj.stop;
			Self.onHide = obj.hide;
			Self.rgb = Self.RGB(UI.C(Self.target, 'backgroundColor'));
			Self.hsb = Self.RGB_HSB(Self.rgb);
			Self.setDom();

			Self._title.innerHTML = obj.title || Self.title || '';
			Self._body.style.cssText += ';top:'
					+ (UI.getY(Self.position) + UI.height(Self.position) + 3)
					+ 'px;left:' + UI.getX(Self.position) + 'px;';
			UI.show(Self._body);
			Self.display = 1;
		},
		/**
		 * 隐藏取色控件
		 * 
		 * @example
		 * UI.ColorPicker.hide();
		 */
		hide : function() {
			if (this.display) {
				UI.hide(this._body);
				if (this.onHide) {
					this.onHide();
				}
				this.display = 0;
			}
		}
	}
	function dom(n) {
		return UI.GC(UI.ColorPicker._body, n)[0];
	}
	function hide() {
		UI.ColorPicker.hide();
	}
	function stop(e) {
		UI.E(e).stop();
	}
})();