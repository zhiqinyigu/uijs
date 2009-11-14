UI.Topology = function(o){
	var Self = this;
	if (!o.line) o.line = {};
	this.lineStyle = {
		color : o.line.color || 'black',
		width : o.line.width || 1,
		alpha : o.line.alpha || 1
	};

	//Canvas Object
	this.canvas = UI.G(o.id);
	this.canvas.width = o.width;
	this.canvas.height = o.height;
	this.ctx = this.canvas.getContext('2d');
	this.ctx.strokeStyle = this.lineStyle.color;
	this.ctx.lineWidth = this.lineStyle.width;
	this.ctx.globalAlpha = this.lineStyle.alpha;
	this.ctx.save();

	//Dom
	this.body = UI.html('<div class="' + this.canvas.className + '"><div class="tmpBox"></div><div class="contBox"></div></div>')[0];
	this.body.style.cssText = 'top:' + UI.getY(this.canvas) + 'px;left:' + UI.getX(this.canvas) + 'px;width:' + UI.width(this.canvas) + 'px;height:' + UI.height(this.canvas) + 'px;';
	this.tmpBox = UI.GC(this.body,'.tmpBox')[0];
	this.contBox = UI.GC(this.body,'.contBox')[0];
	this.tmp = null; //Tmp Dom
	this.current = null; //Current Icon
	this.currentId = null; //Current Icon's Index ID
	this.data = o.data;
	this.dataTmp = this.cloneData(o.data);
	this.draw();
	UI.before(this.body,this.canvas);
	this.x = UI.getX(this.body);
	this.y = UI.getY(this.body);

	//PopupMenu
	this.popupMenuData = o.popupMenu || {};
	if (o.popupMenu) {
		this.popupMenu = new UI.PopupMenu(this.body);
		this.popupMenu.setActions(this.popupMenuData.main);
		UI.EA(this.body,'mousedown',function(e){
			var E = UI.E(e);
			if (E.button == 2 || (UI.B.ie && E.button == 0)) {
				Self.popupMenu.popup(Self.popupMenuData.main);
			}
		});
	}

	//Kill Select Font And Picture
	this.body.onselectstart = function(e){
		return false;
	};
}
UI.Topology.prototype = {
	draw : function(){
		this.currentId = null;
		this.parseData(this.data);
		this.drawLine(this.data);
	},
	drawIco : function(ico,wrap){
		var Self = this;
		if (ico.complete) {
			wrap.style.cssText += ';display:block;margin:0 0 0 -99999px;'; //Kill Icon's Sparkle
			setTimeout(function(){
				wrap.style.cssText += ';margin:-' + ico.width/2 + 'px 0 0 -' + ico.height/2 + 'px;';
			},0);
		}
		else setTimeout(function(){ //Kill Load Bug
			Self.drawIco(ico,wrap);
		},100);
	},
	drawLine : function(o,parent){
		if (!parent) {
			this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		}
		for (var i = 0,num = o.length;i < num;i++) {
			if (parent) {
				if (o[i].line) {
					this.ctx.strokeStyle = o[i].line.color || this.lineStyle.color;
					this.ctx.lineWidth = o[i].line.width || this.lineStyle.width;
					this.ctx.globalAlpha = o[i].line.alpha || this.lineStyle.alpha;
				}
				this.line(parent.x,parent.y,o[i].x,o[i].y);
				this.ctx.restore();
				this.ctx.save();
			}
			if (o[i].son) {
				this.drawLine(o[i].son,{x:o[i].x,y:o[i].y});
			}
		}
	},
	line : function(x1,y1,x2,y2){
		this.ctx.beginPath();
		this.ctx.moveTo(x1,y1);
		this.ctx.lineTo(x2,y2);
		this.ctx.stroke();
	},
	reset : function(){
		this.clear();
		this.data = this.cloneData(this.dataTmp);
		this.draw();
	},
	clear : function(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.contBox.innerHTML = '';
	},
	save : function(){
		this.dataTmp = this.cloneData(this.data);
	},
	add : function(o){
		if (this.currentId) {
			var target = this.findData(this.currentId,this.data),num = parseInt(Math.random() * 120);
			target.son = target.son || [];
			o.x = target.x + 40 + parseInt(Math.random() * 60);
			o.y = target.y + parseInt(Math.random() * 60);
			target.son.push(o);
		}
		else this.data.push(o);
		this.clear();
		this.draw();
	},
	edit : function(o){
		if (this.currentId) {
			var target = this.findData(this.currentId,this.data);
			target.name = o.name;
			target.ico = o.ico;
			this.clear();
			this.draw();
		}
	},
	remove : function(){
		if (this.currentId) {
			try{
				this.findData(this.currentId.slice(0,-1),this.data).son.splice(this.currentId.slice(-1),1);
			}catch(e){
				this.data.splice(this.currentId.slice(-1),1)
			};
		}
		this.clear();
		this.draw();
	},
	findData : function(arr,data){
		var obj = data[arr[0]];
		if (arr.length == 1) return obj;
		else {
			arr.splice(0,1);
			return this.findData(arr,obj.son);
		}
	},
	cloneData : function(o){
		var oTmp = []
		for (var i = 0,num = o.length;i < num;i++) {
			var obj = {};
			for (var j in o[i]) {
				obj[j] = o[i][j];
			}
			if (o[i].son) obj.son = this.cloneData(o[i].son);
			oTmp.push(obj);
		}
		return oTmp;
	},
	parseData : function(o,parent){
		var Self = this;
		for (var i = 0,num = o.length;i < num;i++) {
			var ico = UI.DC('img'),wrap = UI.DC('span');
			ico.ondragstart = wrap.onmousedown = this.prevent;
			wrap.onmouseover = function(){
				var ok = false;
				if (Self.tmpBox.innerHTML) {
					//Check Move (Father can't move to son)
					var targetRel = UI.A(this,'rel').toString().split(','),wrapRel = UI.A(Self.tmp,'rel').toString().split(',');
					if (targetRel.length <= wrapRel.length) ok = true;
					else {
						for (var i = 0,n = wrapRel.length;i < n;i++) {
							if (wrapRel[i] != targetRel[i]) {
								ok = true;
								break;
							}
						}
					}
				}
				//document.title = ok + ',' + !UI.hasClass(this,'onSelf');
				if (!UI.hasClass(this,'onSelf') && ok) UI.addClass(this,'on');
			};
			wrap.onmouseout = function(){
				UI.removeClass(this,'on');
			};
			UI.A(wrap,'rel',parent ? parent.rel + ',' + i : i); //Data Index
			wrap.className = 'icon';
			wrap.style.cssText = 'top:' + o[i].y + 'px;left:' + o[i].x + 'px;';

			//Drag Event
			UI.drag(wrap,{start:(function(wrap){
				return function(e){
					var E = UI.E(e);
					if (E.button == 2 || (UI.B.ie && E.button == 0)) {
						Self.currentId = UI.A(wrap,'rel').toString().split(',');
						Self.current = Self.findData(Self.currentId.concat([]),Self.data);
						Self.popupMenu.popup(Self.popupMenuData.son);
						Self.rightClick = true;
						E.stop();
						return false;
					}
					else Self.rightClick = false;
					UI.addClass(Self.body,'onMove');
					UI.addClass(wrap,'onSelf');
					UI.removeClass(wrap,'on');
					Self.tmp = wrap.cloneNode(wrap,true);
					Self.tmp.style.cssText = 'top:' + (E.y - Self.y) + 'px;left:' + (E.x - Self.x) + 'px;';
					Self.tmpBox.appendChild(Self.tmp);
				}
			})(wrap),drag:function(e){
				var E = UI.E(e);
				if (Self.rightClick) return false;
				Self.tmp.style.cssText = 'top:' + (E.y - Self.y) + 'px;left:' + (E.x - Self.x) + 'px;';
			},stop:(function(wrap,o){
				return function(e){
					if (Self.rightClick) return false;
					var on = UI.GC(Self.contBox,'.on');
					if (on.length) {
						var targetRel = UI.A(on[0],'rel').toString().split(','),wrapRel = UI.A(wrap,'rel').toString().split(',');
						var target = Self.findData(targetRel,Self.data);
						//Add
						if (!target.son) target.son = [o];
						else target.son.push(o);
						//Delete
						try{
							Self.findData(wrapRel.slice(0,-1),Self.data).son.splice(wrapRel.slice(-1),1);
						}catch(e){
							Self.data.splice(wrapRel.slice(-1),1)
						};
						Self.clear();
						Self.draw();
					}
					else {
						var x = parseInt(UI.C(Self.tmp,'left')),y = parseInt(UI.C(Self.tmp,'top'));
						if (x < 0) x = 0;
						else if (x > Self.canvas.width) x = Self.canvas.width;
						if (y < 0) y = 0;
						else if (y > Self.canvas.height) y = Self.canvas.height;
						o.x = x;
						o.y = y;
						wrap.style.cssText += ';left:' + o.x + 'px;top:' + o.y + 'px;';
						Self.drawLine(Self.data);
					}
					UI.removeClass(Self.body,'onMove');
					UI.removeClass(wrap,'onSelf');
					Self.tmpBox.innerHTML = '';
				}
			})(wrap,o[i])},false);

			UI.A(ico,'src',o[i].ico);
			if (ico.complete) {
				this.drawIco(ico,wrap);
			}
			else {
				ico.onload = (function(ico,wrap){
					return function(){
						Self.drawIco(ico,wrap);
					}
				})(ico,wrap);
			}
			wrap.innerHTML = '<b>' + o[i].name + '</b>';
			wrap.appendChild(ico);
			this.contBox.appendChild(wrap);
			if (o[i].son) {
				this.parseData(o[i].son,{x:o[i].x,y:o[i].y,rel:UI.A(wrap,'rel')});
			}
		}
	},
	prevent : function(e){
		UI.E(e).prevent();
	}
};