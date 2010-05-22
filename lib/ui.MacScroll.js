UI.MacScroll = function(o){
	var Self = this;
	Self._body = UI.G(o.id);
	Self._y = UI.html('<div class="ad-scroll-indicator vertical indicator-default" style="opacity: 0.5;-webkit-transform: translate3d(220px, 100px, 0);"><div></div><img src="http://help.apple.com/ipad/mobile/interface/assets/scrollindicator/UIScrollerIndicatorDefaultVerticalMiddle.png" style="-webkit-transform: translate3d(0px, 0px, 0px) scale(1, 50); "><div style="-webkit-transform: translate3d(0px, 53px, 0px); "></div></div>')[0];
	Self._yStart = Self._y.firstChild;
	Self._yMiddle = Self._y.lastChild;
	Self._yEnd = Self._y.lastChild;

	UI.each(Self._body.childNodes,function(o){
		if (o.nodeType == 1){
			Self.yMax -= UI.height(o);
		}
	});
	Self.yMax += o.height || UI.height(Self._body);

	UI.prepend(Self._y,Self._body);

	//Event
	var iPad = UI.B.ipad,
		startEvent = iPad ? "touchstart": "mousedown",
		moveEvent = iPad ? "touchmove": "mousemove",
		endEvent = iPad ? "touchend": "mouseup",
		x,X,y,Y,
		delay,
		time;
	UI.EA(Self._body,startEvent,start);
	function start(e){
		var E = UI.E(e);
		y = E.y;
		time = new Date().getTime();

		UI.EA(window,moveEvent,move);
		E.prevent();
	}
	function move(e){
		var E = UI.E(e);
		Self._body.style.cssText = Self.setPosition(0,Self.y + E.y - y,0);

		UI.EA(window,endEvent,end);
	}
	/*function moveDelay(e){
		var E = UI.E(e);
		position(Self.y + E.y - y);

		UI.ER(window,moveEvent,moveDelay);
	}*/
	function end(e){
		var E = UI.E(e);
		/*clearTimeout(delay);
		delay = setTimeout(function(){
			UI.EA(window,moveEvent,moveDelay);
		},40);*/
		time = new Date().getTime() - time;
		length = Math.abs(E.y - y);
		speed = length / time;
		//console.log(speed);
		position(Self.y - (y - E.y) * (1 + speed * 1.2) );

		UI.ER(window,moveEvent,move);
		UI.ER(window,endEvent,end);
	}
	function position(Y){
		if (Y > 0) {
			Y = 0;
		}
		else if (Y < Self.yMax) {
			Y = Self.yMax;
		}
		Self._body.style.cssText = Self.setPosition(0,Y,500);
		Self.y = Y;
	}
}
UI.MacScroll.prototype = {
	x : 0,
	y : 0,
	yMax : 0,
	height : 0,
	duration : 250,
	/*createLayer : function() {
		this.layer = document.createElement("div");
		this.layer.addClassName("ad-scroll-indicator");
		this.layer.addEventListener("webkitTransitionEnd", this, false);
		this.start = this.layer.appendChild(document.createElement("div"));
		this.middle = this.layer.appendChild(document.createElement("img"));
		this.end = this.layer.appendChild(document.createElement("div"));
	}*/
	setPosition : function(x,y,time){
		return '-webkit-transform: translate3d(' + x + 'px,' + y + 'px,0);-webkit-transition-duration:' + (UI.isUndefined(time) ? this.duration : time) + 'ms;-webkit-transition-timing-function:linear;'
	}
}