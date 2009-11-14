UI.tip = function() {
	this.Tip.build();
};
UI.Tip = { //Title Tip
	wrap : UI.DC('div'),
	build : function() {
		this.wrap.className = 'cmn_tip';
		this.wrap.innerHTML = '<iframe src="javascript:false;" style="display:none;position:absolute;z-index:-1;"></iframe><div class="cont"></div>';
		this.cover = UI.GT(this.wrap,'iframe')[0];
		this.cont = UI.GT(this.wrap,'div')[0];
		this.wrap.appendChild(this.cont);
		document.body.appendChild(this.wrap);
		UI.EA(document,'mouseover',function(e) {
			e = window.event || e;
			var o = UI.ET(e);
			if (o.title) {
				var css = UI.Tip.wrap.style,html=document.documentElement,body=document.body,W,H,T,L;
				W = html.clientWidth;
				H = html.clientHeight;
				T = html.scrollTop||body.scrollTop;
				L = html.scrollLeft||body.scrollLeft;
				UI.Tip.cont.innerHTML = o.title;
				o.title = '';
				css.cssText = '';
				e.clientY < H/2 ? css.top = e.clientY + T + 'px':css.bottom = H - e.clientY - (UI.B.ie6 ? 0:T) + 'px';
				e.clientX < W/2 ? css.left = e.clientX + L + 12 + 'px':css.right = W - e.clientX - L + 12 + 'px';
				UI.Tip.show();
				if (UI.B.ie6) {
					var cover = UI.Tip.cover.style,cont = UI.Tip.cont;
					cover.display = 'block';
					cover.width = cont.offsetWidth+'px';
					cover.height = cont.offsetHeight+'px';
				}
			}
		});
		UI.EA(document,'mouseout',function(e) {
			if (UI.Tip.cont.innerHTML) {
				e = window.event || e;
				var o = UI.ET(e);
				o.title = UI.Tip.cont.innerHTML;
				UI.Tip.cont.innerHTML = '';
				UI.Tip.hide();
			}
		});
	},
	show : function(e) {
		this.wrap.style.display = 'block';
	},
	hide : function() {
		this.wrap.style.display = 'none';
	}
};