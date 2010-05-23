UI.MacScroll = function(o){
	var Self = this;
	Self._body = UI.G(o.id);
	Self._y = UI.html('<div class="ad-scroll-indicator vertical indicator-default" style="opacity:0"><div></div><img src="http://help.apple.com/ipad/mobile/interface/assets/scrollindicator/UIScrollerIndicatorDefaultVerticalMiddle.png"><div></div></div>')[0];
	Self._yStart = Self._y.firstChild;
	Self._yMiddle = Self._yStart.nextSibling;
	Self._yEnd = Self._y.lastChild;

	UI.each(Self._body.childNodes,function(o){
		if (o.nodeType == 1){
			Self.yMax -= UI.height(o);
		}
	});
	Self.yMax += o.height || UI.height(Self._body);
	Self.width = UI.width(Self._body);
	Self._y.style.cssText = '-webkit-transform: translate3d(' + (Self.width - 8) + 'px,0, 0);opacity:0';


	UI.prepend(Self._y,Self._body);

	//Event
	var iPad = UI.B.ipad,
		startEvent = iPad ? 'touchstart': 'mousedown',
		moveEvent = iPad ? 'touchmove': 'mousemove',
		endEvent = iPad ? 'touchend': 'mouseup',
		x,X,y,Y,
		delay,
		time;
	UI.EA(Self._body,startEvent,start);
	function start(e){
		var E = UI.E(e);
		y = E.y;
		time = new Date().getTime();

		UI.EA(window,moveEvent,move);
		UI.EA(window,endEvent,end);
		E.prevent();
	}
	function move(e){
		var E = UI.E(e);
		Self._body.style.cssText = Self.setPosition(0,Self.y + E.y - y,0);
		clearTimeout(Self.delay.scroll);
	}
	function end(e){
		var E = UI.E(e);
		time = new Date().getTime() - time;
		length = Math.abs(E.y - y);
		speed = 1 + length / (time * 2);
		position(Self.y - (y - E.y) * speed);

		UI.ER(window,moveEvent,move);
		UI.ER(window,endEvent,end);
	}
	function position(Y){
		var type = 'Quadratic',speed = 250,y;
		if (Y > 0) {
			y = 0;
		}
		else if (Y < Self.yMax) {
			y = Self.yMax;
		}
		else {
			type = 'ease-out';
			speed = 550;
		}
		Self._body.style.cssText = Self.setPosition(0,Y,speed,type);
		if (UI.isNumber(y)) {
			setTimeout(function(){
				Self._body.style.cssText = Self.setPosition(0,y,400,type);
				Self.y = y;
			},speed);
		}
		else Self.y = Y;
	}
}
UI.MacScroll.prototype = {
	x : 0,
	y : 0,
	yMax : 0,
	height : 0,
	width : 0,
	duration : 250,
	delay : {},
	setPosition : function(x,y,time,type){
		var Self = this;
		clearTimeout(Self.delay.scroll);
		document.title = y;
		Self._y.style.cssText = '-webkit-transform: translate3d(' + (Self.width - 8) + 'px, ' + (- y + 200) + 'px, 0);opacity:1;' + (type ? '-webkit-transition-timing-function:' + type : '');
		Self._yMiddle.style.cssText = '-webkit-transform: translate3d(0px, 0px, 0px) scale(1,' + 100 + ')';
		Self._yEnd.style.cssText = '-webkit-transform: translate3d(0px, ' + (103) + 'px, 0px)';
		Self.delay.scroll = setTimeout(function(){
			Self._y.style.cssText += ';opacity:0';
		},500);
		return '-webkit-transform: translate3d(' + x + 'px,' + y + 'px,0);-webkit-transition-duration:' + (UI.isUndefined(time) ? this.duration : time) + 'ms;' + (type ? '-webkit-transition-timing-function:' + type : '');
	}
}