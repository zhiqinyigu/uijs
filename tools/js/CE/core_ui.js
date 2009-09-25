/*
****************************************************************
* 标题: 用户界面类
* 作者: coldera
* 日期: 2008-8-6
* 描述: 
****************************************************************
*/

/*
-------------------------------------
-- 继承: CE
-- 描述: DOM控制类
-- 属性: 
-- 方法: create:建立一个DOM对象; get:取得一个DOM对象; addEntry:添加一个DOM用于存放游戏对象;
		loadXML:加载XML返回XMLDOM; getXmlBoot:取得XML根DOM; setBgPos:设置图片背景位置
		getMapPos:返回指定地图坐标DOM;addEvent,delEvent:添加或删除一个事件;getBtnEvent:兼容鼠标事件;
-- 日期: 2008-8-6
-- 修改: 2008-8-13
-- 说明: 单例
-------------------------------------
*/
CE.dom = CE.extend(CE,{
	create : function(s){
		var e = document.createElement(s);
		return e;
	},
	get : function(s,p,returnText){
		if(p && typeof p=="object"){
			var e = p.getElementsByTagName(s);
			if(returnText){
				var text = e[0].firstChild ? e[0].firstChild.nodeValue : null;
				return text;
			}
		}else{
			var e = document.getElementById(s);
		}
		return e;
	},
	del : function(e){
		if(e) e.parentNode.removeChild(e);
	},
	addEvent : function(o,n,fn){
		if(typeof fn!="function"){
			alert("事件加载出错!");
			return;
		}
		if(!o.attachEvent){
			o.addEventListener(n,fn,false);
		}else{
			o.attachEvent("on"+n,fn);
		}
	},
	text : function(o,s){
		if(!o.innerText){
			var txtElm = document.createTextNode(s);
			o.appendChild(txtElm);
		}else{
			o.innerText = s;	
		}
	},
	delEvent : function(o,n,fn){
		if(!o.detachEvent){
			o.removeEventListener(n,fn,false);
		}else{
			o.detachEvent("on"+n,fn);
		}
	},
	addEntry : function(p,s,n,w,h){
		if(!p) p = document.body;
		if(!w) w = "100%";
		if(!h) h = "100%";
		var e = this.create(s);
		e.style.position = "absolute";
		e.style.width = w+"px";
		e.style.height = h+"px";
		if(n!="" && n!=null) e.id = n+"_"+CE.world.entrys.length+1;
		p.appendChild(e);
		CE.world.entrys.push(e);
		return e;
	},
	loadXML : function(data){
		var msxmlArr = ["MSXML2.DOMDocument.5.0","MSXML2.DOMDocument.4.0","MSXML2.DOMDocument.3.0","MSXML2.DOMDocument","Microsoft.XMLDOM"];
		for(var i=0;i<msxmlArr.length;i++){
			try{
				var xmlDoc = new ActiveXObject(msxmlArr[i]);
				xmlDoc.loadXML(data);
				return xmlDoc;
			}catch(err){}
		}
		if(!xmlDoc){
			//var xmlDoc = document.implementation.createDocument("","",null);
			var parser = new DOMParser();
			var xmlDoc = parser.parseFromString(data,"text/xml");
			return xmlDoc;
		}
	},
	getXmlBoot : function(doc){
		var o =  doc.childNodes[1] || doc.childNodes[0];
		return o;
	},
	setBgPos : function(o,x,y){
		var temXY = o.style.backgroundPosition.split(" ");
		if(x=="inherit") x=temXY[0]?temXY[0]:0;
		if(y=="inherit") y=temXY[1]?temXY[1]:0;
		if(!isNaN(x)) x=x+"px";
		if(!isNaN(y)) y=y+"px";
		o.style.backgroundPosition=x+" "+y;
	},
	getBtnEvent : function(e){
		if(!window.event){
			if(e.button==0) return 1;
			else if(e.button==1) return 4;
			else if(e.button==2) return 2;
			return e.button;
		}else{
			return event.button;
		}
	}
});

/*
-------------------------------------
-- 继承: CE
-- 描述: 场景布局类
-- 属性: dom:游戏窗口的DOM;width,height,top,left:游戏窗口的大小和相对于坐标的位置
-- 方法: init:初始化一个"mainScene"DOM对象; getCenterXY:获取地图中心点坐标或像素; centerView:地图定位到坐标x,y.
-- 日期: 2008-8-6
-- 修改: 2008-8-19
-- 说明: 单例
-------------------------------------
*/
CE.layout = CE.extend(CE,{
	dom : null,
	width : 900,
	height : 600,
	moveTO : null,
	init : function(){
		var bg = document.body;
		var winWidth = document.documentElement.clientWidth;
		var winHeight = document.documentElement.clientHeight;
		var e = CE.dom.create("div");
		e.id = "mainScene";
		e.style.position = "relative";
		e.style.width = this.width+"px";
		e.style.height = this.height+"px";
		e.style.marginTop = (winHeight-this.height)/2+"px";
		e.style.marginLeft = (winWidth-this.width)/2+"px";
		bg.appendChild(e);
		this.dom = e;
	},
	getCenterXY : function(isCoor){
		var objLeft = -parseInt(CE.world.objDom.style.left);
		var objTop = -parseInt(CE.world.objDom.style.top);
		var pxX = objLeft+parseInt(this.width/2);
		var pxY = objTop+parseInt(this.height/2);
		if(!isCoor) return [pxX,pxY];
		var coorX = parseInt(pxX/CE.world.cell);
		var coorY = parseInt(pxY/CE.world.cell);
		return [coorX,coorY];
	},
	centerView : function(x,y,t){
		if(this.moveTO) clearTimeout(this.moveTO);
		var x1 = this.getCenterXY()[0];
		var y1 = this.getCenterXY()[1];
		var x2 = x*CE.world.cell+parseInt(CE.world.cell/2);
		if(x2<parseInt(this.width/2)) x2=parseInt(this.width/2);
		else if(x2>CE.world.objDom.offsetWidth-parseInt(this.width/2)) x2=CE.world.objDom.offsetWidth-parseInt(this.width/2);
		var y2 = y*CE.world.cell+parseInt(CE.world.cell/2);
		if(y2<parseInt(this.height/2)) y2=parseInt(this.height/2);
		else if(y2>CE.world.objDom.offsetHeight-parseInt(this.height/2)) y2=CE.world.objDom.offsetHeight-parseInt(this.height/2);
		var tarLeft = parseInt((x2-x1)/2);
		var tarTop = parseInt((y2-y1)/2);
		//if(!confirm([y1,y2])) return;
		CE.map.at(tarLeft,tarTop);
		if(!t) t=10;
		if(Math.abs(x2-x1)>1 || Math.abs(y2-y1)>1){
			this.moveTO = setTimeout(function(x,y){
				return function(){CE.layout.centerView(x,y,t);}
			}(x,y,t),t);
		}else{
			this.moveTO = null;	
			CE.map.loadGrap();
		}
	},
	objEdgePos : function(o,x,y,isTest){
		var sign=0;
		if(!x || x=="") x=20;
		if(!y || y=="") y=20;
		var curLeft = parseInt(o.style.left);
		var curTop = parseInt(o.style.top);
		var objLeft = -parseInt(CE.world.objDom.style.left);
		var objTop = -parseInt(CE.world.objDom.style.top);
		if(curTop<objTop){
			if(!isTest) o.style.top = objTop+y+"px";
			sign = sign+1;
		}else if(curTop+o.offsetHeight>objTop+CE.layout.height){
			if(!isTest) o.style.top = objTop+CE.layout.height-o.offsetHeight-y+"px";
			sign = sign+4;
		}
		if(curLeft<objLeft){
			if(!isTest) o.style.left = objLeft+x+"px";
			sign = sign+2;
		}else if(curLeft+o.offsetWidth>objLeft+CE.layout.width){
			if(!isTest) o.style.left = objLeft+CE.layout.width-o.offsetWidth-x+"px";
			sign = sign+8;
		}
		return sign;
	}
});

/*
-------------------------------------
-- 继承: CE
-- 描述: 用户事件类
-- 属性: 
-- 方法: keyDown,keyUp:为对象绑定键盘事件;click:为对象绑定鼠标事件;
		arrFind:找出指定对象在数组中的位置,v2为是否二维数组;
-- 日期: 2008-8-7
-- 修改: 2008-8-19
-- 说明: 单例
-------------------------------------
*/

CE.handle = CE.extend(CE,{
	arrFind : function(a,o,v2){
		if(a.length==0)	return -1;
		for(var i=0;i<a.length;i++){
			if(v2){
				for(var j=0;j<a[i].length;j++){
					if(o==a[i][j]) return [i,j];	
				}
			}else{
				if(o==a[i]) return i;
			}
		}
		return -1
	},
	click : function(o){
		if(CE.world.dialogMode){
		}else{
			if(o.type=="role"){
				CE.dom.addEvent(o.dom,"mousedown",function(e){
					var btnEvent = CE.dom.getBtnEvent(e);
					if(btnEvent==1){
						if(CE.world.battleMode){
							if(CE.world.roleLock) return;
							CE.world.actNpc = o;
							CE.btlMenu.create();
							CE.btlMenu.at(o.x,o.y);
						}
					}else if(btnEvent==2){
						if(CE.world.battleMode){
						}else{
							var a = o.getRG(o.dialogMob);
							if(CE.handle.arrFind(a,CE.world.coor[CE.world.actNpc.y][CE.world.actNpc.x])>0){
								o.towards(CE.world.actNpc.x,CE.world.actNpc.y);
								CE.world.actNpc.towards(o.x,o.y);
								o.turn();
								CE.world.actNpc.turn();
								o.bublSay(1,"我想说一句话<br />换行啦");//just test
							}
						}
					}
				});	
			}else if(o.type=="btlMenu"){
				CE.dom.addEvent(o.dom,"click",function(e){
					var elm = e.target || event.srcElement;
					if(elm.tagName=="LI"){
						switch(parseInt(elm.getAttribute("num"))){
							case 1://移动
								CE.dom.del(o.dom);
								o.dom=null;
								var ef = new CE.effect();
								ef.moveRg(CE.world.actNpc.getMob());
								ef = null;
								break;
						}
					}									 
				});	
			}else if(o.type=="npcMob"){
				CE.dom.addEvent(o,"click",function(){
					CE.world.roleLock = true;
					var temCoor = o.id.split("_");
					var y = parseInt(temCoor[1]);
					var x = parseInt(temCoor[2]);
					CE.world.actPoint = [x,y];
					CE.world.actNpc.patch = CE.world.actNpc.bfs(x,y);
					for(var i=0;i<CE.world.npcMob.length;i++){
						CE.world.npcMob[i].style.zIndex = 1000;
					}
					CE.world.actNpc.play("move");
					CE.world.actNpc.goNext();
				});
			}
		}
	},
	overOut : function(o){
		if(CE.world.dialogMode) return;
		if(o.type="thing"){
			CE.dom.addEvent(o.dom,"mouseover",function(){
				if(CE.world.roleLock) return;
				o.baseZ = 2000,
				o.setZ(o.y);
			});	
			CE.dom.addEvent(o.dom,"mouseout",function(){
				setTimeout(function(o){
					return function(){
						o.baseZ = 3000,
						o.setZ(o.y);
					}					
				}(o),1000);
			});
		}
	},
	keyDown : function(e){
		if(!e) e = window.event;
		//if(e.keyCode==9) CE.world.battleMode = CE.world.battleMode ? false : true;
		if(CE.world.battleMode){
			switch(e.keyCode){
				case 27:	//esc
					if(CE.world.actNpc && !CE.world.roleLock){
						CE.world.actNpc=null;
						var ef=new CE.effect();
						ef.moveRg();
						ef=null;
					}
					if(CE.btlMenu.dom){
						CE.dom.del(CE.btlMenu.dom);
						CE.btlMenu.dom=null;
					}
					break;
				case 37:	//left
					if(parseInt(CE.world.objDom.style.left)>=0) return;
					var ss = CE.map.scrollSpeed;
					if(-parseInt(CE.world.objDom.style.left)<ss){
						ss = -parseInt(CE.world.objDom.style.left);
					}
					CE.map.dom.style.left = parseInt(CE.map.dom.style.left) + ss +"px";
					CE.world.objDom.style.left = parseInt(CE.world.objDom.style.left) + ss +"px";
					break;
				case 38:	//up
					if(parseInt(CE.world.objDom.style.top)>=0) return;
					var ss = CE.map.scrollSpeed;
					if(-parseInt(CE.world.objDom.style.top)<ss){
						ss = -parseInt(CE.world.objDom.style.top);
					}
					CE.map.dom.style.top = parseInt(CE.map.dom.style.top) + ss +"px";
					CE.world.objDom.style.top = parseInt(CE.world.objDom.style.top) + ss +"px";
					break;
				case 39:	//right
					if(CE.world.objDom.offsetWidth+parseInt(CE.world.objDom.style.left)<=CE.layout.width) return;
					var ss = CE.map.scrollSpeed;
					if(CE.world.objDom.offsetWidth+parseInt(CE.world.objDom.style.left)-CE.layout.width<ss){
						ss = CE.world.objDom.offsetWidth+parseInt(CE.world.objDom.style.left)-CE.layout.width;
					}
					CE.map.dom.style.left = parseInt(CE.map.dom.style.left) - ss +"px";
					CE.world.objDom.style.left = parseInt(CE.world.objDom.style.left) - ss +"px";
					break;
				case 40:	//down
					if(CE.world.objDom.offsetHeight+parseInt(CE.world.objDom.style.top)<=CE.layout.height) return;
					var ss = CE.map.scrollSpeed;
					if(CE.world.objDom.offsetHeight+parseInt(CE.world.objDom.style.top)-CE.layout.height<ss){
						ss = CE.world.objDom.offsetHeight+parseInt(CE.world.objDom.style.top)-CE.layout.height;
					}
					CE.map.dom.style.top = parseInt(CE.map.dom.style.top) - ss +"px";
					CE.world.objDom.style.top = parseInt(CE.world.objDom.style.top) - ss +"px";
					break;
			}
		}else{
			switch(e.keyCode){
				case 37:
					if(CE.world.actNpc && !CE.world.roleLock){
						var o = CE.world.actNpc;
						o.roleMove(o.x-1,o.y);
					}
					break;
				case 38:
					if(CE.world.actNpc && !CE.world.roleLock){
						var o = CE.world.actNpc;
						o.roleMove(o.x,o.y-1);
					}
					break;
				case 39:
					if(CE.world.actNpc && !CE.world.roleLock){
						var o = CE.world.actNpc;
						o.roleMove(o.x+1,o.y);
					}
					break;
				case 40:
					if(CE.world.actNpc && !CE.world.roleLock){
						var o = CE.world.actNpc;
						o.roleMove(o.x,o.y+1);
					}
					break;
			}
		}
	},
	keyUp : function(e){
		if(!e) e = window.event;
		if(CE.world.battleMode){
			switch(e.keyCode){
				case 37: case 39:
					var oldLeft = CE.map.osNum*CE.map.cell+CE.map.offsetXY[0];
					var newLeft = parseInt(CE.map.dom.style.left);
					if(newLeft<0){
						var moveDis = -newLeft>oldLeft ? -newLeft-oldLeft : oldLeft+newLeft;
					}else{
						var moveDis = oldLeft+newLeft;
					}
					if(e.keyCode==37) moveDis=-moveDis;
					CE.map.at(moveDis,null);
					CE.map.loadGrap();
					break;
				case 38: case 40:
					var oldTop = CE.map.osNum*CE.map.cell+CE.map.offsetXY[1];
					var newTop = parseInt(CE.map.dom.style.top);
					if(newTop<0){
						var moveDis = -newTop>oldTop ? -newTop-oldTop : oldTop+newTop;
					}else{
						var moveDis = oldTop+newTop;
					}
					if(e.keyCode==38) moveDis=-moveDis;
					CE.map.at(null,moveDis);
					CE.map.loadGrap();
					break;
			}
		}else{
			if(CE.world.keyupTO) clearTimeout(CE.world.keyupTO);
			switch(e.keyCode){
				case 37: case 38: case 39: case 40:
					CE.world.keyupTO = setTimeout(function(){CE.world.actNpc.stop();},1200/CE.world.actNpc.speed);
			}
		}
	}
});

/*
-------------------------------------
-- 继承: CE
-- 描述: 战斗菜单类
-- 属性: list:菜单列表;
-- 方法: create:创建菜单,at:定位菜单到坐标
-- 日期: 2008-8-13
-- 修改: 2008-8-13
-- 说明: 单例
-------------------------------------
*/

CE.btlMenu = CE.extend(CE,{
	type : "btlMenu",
	baseZ : 5000,
	//list : [[1,"移动·MOVE"],[2,"攻击·ATAK"],[3,"魔法·MAGIC"],[4,"物品·ITEM"],[5,"特殊·SPEC"],[6,"休息·REST"]],
	list : 6,
	btnWidth : 140,
	btnHeight : 32,
	dom : null,
	create : function(){
		if(this.dom){
			CE.dom.del(this.dom);
			this.dom=null
		}
		var e = CE.dom.create("div");
		e.style.position = "absolute";
		e.style.zIndex = this.baseZ;
		e.id = "btlMenu";
		e.className = "btlMenu";
		var topElm = CE.dom.create("div");
		topElm.className = "thetop";
		e.appendChild(topElm);
		var midElm = CE.dom.create("ul");
		e.appendChild(midElm);
		/*for(var i=0;i<this.list.length;i++){
			var liElm = CE.dom.create("li");
			//CE.dom.text(liElm,this.list[i][1]);
			liElm.setAttribute("num",this.list[i][0]);
			liElm.onmouseover = function(o){
				return function(){
					CE.dom.setBgPos(o,0,"bottom");
					//o.style.color = "#f40";
				}	
			}(liElm);
			liElm.onmouseout = function(o){
				return function(){
					CE.dom.setBgPos(o,0,0);
					//o.style.color = "#000";
				}	
			}(liElm);
			midElm.appendChild(liElm);
		}*/
		for(var i=0;i<this.list;i++){
			var liElm = CE.dom.create("li");
			liElm.setAttribute("num",i+1);
			CE.dom.setBgPos(liElm,-i*this.btnWidth,0);
			liElm.style.width = 140+"px";
			liElm.style.height = 32+"px";
			liElm.onmouseover = function(o){
				return function(){
					CE.dom.setBgPos(o,"inherit","bottom");
				}	
			}(liElm);
			liElm.onmouseout = function(o){
				return function(){
					CE.dom.setBgPos(o,"inherit",0);
				}	
			}(liElm);
			midElm.appendChild(liElm);
		}
		var botElm = CE.dom.create("div");
		botElm.className = "thebot";
		e.appendChild(botElm);
		CE.world.objDom.appendChild(e);
		this.dom = e;
		CE.handle.click(this);
	},
	at : function(x,y){
		var ox = CE.world.actNpc.width-CE.world.cell/2;
		var oy = -CE.world.actNpc.height;
		this.dom.style.left = x*CE.world.cell+ox+"px";
		this.dom.style.top = y*CE.world.cell+oy+"px";
		CE.layout.objEdgePos(this.dom);
	}
});

/*
-------------------------------------
-- 继承: CE
-- 描述: 对话类
-- 属性: 
-- 方法: 
-- 日期: 2008-8-19
-- 修改: 2008-8-19
-- 说明: 
-------------------------------------
*/

CE.dialog = CE.extend(CE,{
	graphic : null,
	headW : 120,
	headH : 120,
	baseZ : 4000,
	width : 0,
	height : 0,
	type : null,
	dom : null,
	roleName : null,
	create : function(){
		if(this.type == "bubl"){
			var e = CE.dom.create("div");
			e.style.width = (this.width = 386)+"px";
			e.style.height = (this.height = 156)+"px";
			e.style.position = "absolute";
			e.style.overflow = "hidden";
			e.className = "bubl1";
			e.style.zIndex = this.baseZ;
			var img = CE.dom.create("div");
			img.style.width = this.headW+"px";
			img.style.height = this.headH+"px";
			if(typeof img.style.styleFloat=="undefined"){
				img.style.cssFloat = "left";
			}else{
				img.style.styleFloat = "left";
			}
			var title = CE.dom.create("h1");
			CE.dom.text(title,this.roleName);
			var text = CE.dom.create("p");
			e.appendChild(img);
			e.appendChild(title);
			e.appendChild(text);
			CE.world.objDom.appendChild(e);
			this.dom = e;
		}
	},
	bublShow : function(i,s,t){
		this.dom.childNodes[0].style.background = "url("+this.graphic+"head"+i+".png)";
		this.dom.childNodes[2].innerHTML = s;
		if(t){
			setTimeout(function(o){
				return function(){CE.dom.del(o.dom);o.dom=null;}
			}(this),t*1000);
		}
	},
	at : function(x,y){
		this.dom.style.left = x*CE.world.cell-50+"px";
		this.dom.style.top = y*CE.world.cell-this.height-50+"px";
		var sign = CE.layout.objEdgePos(this.dom,"","",true);
		switch(sign){
			case 1:
				this.dom.className = "bubl2";
				CE.layout.objEdgePos(this.dom,"",this.height);
				CE.dom.setBgPos(this.dom,"inherit",-2*this.height);
				break;
			case 2:
				this.dom.className = "bubl1";
				CE.layout.objEdgePos(this.dom,"","");
				break;
			case 3:
				this.dom.className = "bubl2";
				CE.layout.objEdgePos(this.dom,"",this.height);
				CE.dom.setBgPos(this.dom,"inherit",-2*this.height);
				break;
			case 8:
				this.dom.className = "bubl1";
				CE.layout.objEdgePos(this.dom,120,"");
				CE.dom.setBgPos(this.dom,"inherit",-this.height);
				break;
			case 9:
				this.dom.className = "bubl2";
				CE.layout.objEdgePos(this.dom,120,this.height);
				CE.dom.setBgPos(this.dom,"inherit",-3*this.height);
				break;
		}
	}
});
