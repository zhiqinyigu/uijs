/*
****************************************************************
* 标题: 游戏模型类
* 作者: coldera
* 日期: 2008-8-7
* 描述: 
****************************************************************
*/
/*
-------------------------------------
-- 继承: CE.object
-- 描述: npc模型类
-- 特性: id:标识NPC的ID;dom:NPC的DOM;type:用于区分不同的对象;baseZ:基础层次
		 height,width:对象DOM高宽;frame:对象行走状态帧数;speed:角色一次移动距离(px);faceTo:角色当前朝向;patch:保存角色行走路线
		 mob:基础行动力
		 isMove:移动状态;isStop:停止状态
-- 方法: create:创建新NPC;
		 stop:使角色进入停止状态;play:行走动画;towardes,turn:朝向,转向;setState:切换状态;getMob:获取角色可行动范围;
		 goNext:使角色走到下一格;roleMove:非战斗模式角色移动
-- 日期: 2008-8-9
-- 修改: 2008-8-19
-- 说明: 
-------------------------------------
*/

CE.npc = CE.extend(CE.object,{
	id : null,
	dom : null,
	type : "npc",
	
	height : 100,
	width : 80,
	frame : [1,2],			   
	speed : 2,
	baseZ : 3000,
	moveTimeout : null,
	
	mob : 1,
	
	dialogMob : 3,
	faceTo : 0,
	nextStep : 0,
	patch : new Array(),

	isMove : false,
	isStop : true,
	
	create : function(s,n){
		var e = CE.dom.addEntry(CE.world.objDom,"div",n,this.width,this.height);
		this.dom = e;
		if(s && s!="") this.name = s;
		this.showGrap(this.graphic+"move.gif");
		CE.handle.click(this);
	},
	stop : function(){
		this.setState("isStop");
		this.turn();
		this.showGrap(this.graphic+"move.gif");
		clearTimeout(this.moveTimeout);
		CE.dom.setBgPos(this.dom,-(this.faceTo*this.width)+"px", -((this.frame[1]-1)*this.height)+"px");
	},
	play : function(s){
		if(s=="move"){
			if(!this.isMove){
				this.showGrap(this.graphic+"move.gif");
				this.turn();
				this.setState("isMove");
			}
			var os = parseInt(this.dom.style.backgroundPosition.split(" ")[0]);
			var num = parseInt(os - this.width);
			if(num+this.width*this.frame[0]==0) num=0;
			CE.dom.setBgPos(this.dom,num,"inherit");
			this.moveTimeout = setTimeout(function(o){
				return function(){if(!o.isStop) o.play("move");}
			}(this),120);
		}
	},
	turn : function(i){
		if(!i) i = this.faceTo;
		CE.dom.setBgPos(this.dom,0,-(i*this.height)+"px");
		this.faceTo = i;
	},
	goNext : function(){
		this.setZ(this.y);
		var num = CE.handle.arrFind(CE.world.objPoint,CE.world.coor[this.y][this.x]);
		CE.world.objPoint.splice(num,1);
		CE.world.coor[this.y][this.x][0]=1;
		if(!this.patch[0]) return;
		var x = this.patch[0][2];
		var y = this.patch[0][1];
		var temFaceTo = this.faceTo;
		this.towards(x,y);
		if(temFaceTo != this.faceTo) this.turn();
		switch(this.nextStep){
			case 0:
				this.p2p(this.x,this.y+1);
				break;
			case 1:
				this.p2p(this.x-1,this.y);
				break;
			case 2:
				this.p2p(this.x+1,this.y);
				break;
			case 3:
				this.p2p(this.x,this.y-1);
				break;
			case 4:
				this.p2p(this.x-1,this.y+1);
				break;
			case 5:
				this.p2p(this.x+1,this.y+1);
				break;
			case 6:
				this.p2p(this.x-1,this.y-1);
				break;
			case 7:
				this.p2p(this.x+1,this.y-1);
				break;
		}
		this.patch.shift();
		this.x = x;
		this.y = y;
	},
	roleMove : function(x,y){
		var isEdge = x*CE.world.cell>(CE.layout.width-parseInt(CE.world.objDom.style.left)) || (y+1)*CE.world.cell>(CE.layout.height-parseInt(CE.world.objDom.style.top)) || (x-1)*CE.world.cell<-parseInt(CE.world.objDom.style.left) || (y-2)*CE.world.cell<-parseInt(CE.world.objDom.style.top);
		if(isEdge) CE.layout.centerView(x,y);
		CE.world.roleLock = true;
		if(CE.world.coor[y] && CE.world.coor[y][x] && CE.world.coor[y][x][0]>0){
			if(CE.world.keyupTO) clearTimeout(CE.world.keyupTO);
			var o = CE.world.actNpc;
			o.patch[0] = CE.world.coor[y][x];
			CE.world.actPoint = [x,y];
			clearTimeout(o.moveTimeout);
			o.play("move");
			o.goNext();
		}else{
			CE.world.roleLock = false;
		}
	},
	setState : function(n){
		this.isMove = false;
		this.isStop = false;
		this[n] = true;
	},
	getMob : function(){
		var a = new Array();
		var b = new Array();
		a.push(CE.world.coor[this.y][this.x]);
		b.push(CE.world.coor[this.y][this.x]);
		for(var i=0;i<this.mob;i++){
			var tem = b.length;
			for(var j=0;j<tem;j++){
				x = b[j][2];
				y = b[j][1];
				try{
					var c = [CE.world.coor[y-1][x],CE.world.coor[y][x+1],CE.world.coor[y+1][x],CE.world.coor[y][x-1]];
				}catch(err){}
				for(var n=0;n<c.length;n++){
					if(c[n] && c[n][0]>0 && CE.handle.arrFind(a,c[n])==-1){
						a.push(c[n]);
						b.push(c[n]);
					}
				}
			}
			b.splice(0,tem);
		}
		a.shift();
		b = null;
		return a;
	},
	bublSay : function(i,s,t){
		if(this.bubl){
			CE.dom.del(this.bubl.dom);
			this.bubl.dom=null;
			this.bubl=null;
		}
		var o = new CE.dialog();
		o.type = "bubl";
		o.graphic = this.graphic;
		o.roleName = this.name;
		o.create();
		o.at(this.x,this.y);
		this.bubl = o;
		o.bublShow(i,s,t);
	},
	getRG : function(mob){
		var tab = CE.map.dom;
		var arr = new Array();
		for(var i=this.x-mob;i<=this.x+mob;i++){
			for(var j=this.y-mob;j<=this.y+mob;j++){
				var posElm = CE.world.coor[j][i];
				var isIn = Math.abs(this.x-i)+Math.abs(this.y-j)<=mob;
				if(posElm && isIn){
					arr.push(posElm);
				}
			}
		}
		return arr;
	}
});

/*
-------------------------------------
-- 继承: CE.object.npc
-- 描述: 角色模型类
-- 属性:
-- 方法: 
-- 日期: 2008-8-9
-- 修改: 2008-8-9
-- 说明: 
	     		6 3 7
   角色朝向图:	1 * 2
		    	4 0 5
-------------------------------------
*/

CE.role = CE.extend(CE.npc,{
	frame : [8,9],
	type : "role",
	
	towards : function(x2,y2){
		var x1 = this.x;
		var y1 = this.y;
		if(x1==x2 && y1<y2) this.faceTo=0;
		else if(x1>x2 && y1==y2) this.faceTo=1;
		else if(x1<x2 && y1==y2) this.faceTo=2;
		else if(x1==x2 && y1>y2) this.faceTo=3;
		else if(x1>x2 && y1<y2) this.faceTo=4;
		else if(x1<x2 && y1<y2) this.faceTo=5;
		else if(x1>x2 && y1>y2) this.faceTo=6;
		else if(x1<x2 && y1>y2) this.faceTo=7;
		this.nextStep = this.faceTo;
	}
});
/*
-------------------------------------
-- 继承: CE.object.npc
-- 描述: 怪物模型类
-- 属性: 
-- 方法: 
-- 日期: 2008-8-19
-- 修改: 2008-8-19
-- 说明: 
	     		2 ? 3
 朝向图:		? * ?
		    	0 ? 1
-------------------------------------
*/

CE.monster = CE.extend(CE.npc,{
	frame : new Array(8,5),
	type : "monster",
	ai : null,

	towards : function(x2,y2){
		var x1 = this.x;
		var y1 = this.y;
		if(x1==x2 && y1<y2) {
			this.faceTo=this.faceTo%2?1:0;
			this.nextStep=0;
		}else if(x1>x2 && y1==y2){
			this.faceTo=this.faceTo>1?2:0;
			this.nextStep=1;
		}else if(x1<x2 && y1==y2){
			this.faceTo=this.faceTo>1?3:1;
			this.nextStep=2;
		}else if(x1==x2 && y1>y2){
			this.faceTo=this.faceTo%2?3:2;
			this.nextStep=3;
		}else if(x1>x2 && y1<y2){
			this.faceTo=0;
			this.nextStep=4;
		}else if(x1<x2 && y1<y2){
			this.faceTo=1;
			this.nextStep=5;
		}else if(x1>x2 && y1>y2){
			this.faceTo=2;
			this.nextStep=6;
		}else if(x1<x2 && y1>y2){
			this.faceTo=3;
			this.nextStep=7;
		}
	}
});
/*
-------------------------------------
-- 继承: CE.object
-- 描述: 特效类
-- 特性: width,height:物件的高宽;dom:物件的DOM;type:用于区分不同的对象;baseZ:基础层次;area:物件占据的区域
-- 方法: create:创建新物件
-- 日期: 2008-8-7
-- 修改: 2008-8-7
-- 说明: 
-------------------------------------
*/

CE.thing = CE.extend(CE.object,{
	width : 0,
	height : 0,
	area : null,
	dom : null,
	baseZ : 3000,
	type : "thing",
	create : function(n){
		var e = CE.dom.addEntry(CE.world.objDom,"div",n,this.width,this.height);
		this.dom = e;
		this.showGrap(this.graphic);
		this.at(this.x,this.y);
		if(this.area!=null && this.area!=0){
			for(var i=0;i<this.area.length;i++){
				var temX = this.area[i][0];
				var temY = this.area[i][1];
				CE.world.coor[temY][temX][0] = 0;
				CE.world.objPoint.push([CE.world.coor[temY][temX],temY,temX]);
			}
		}
		CE.handle.overOut(this);
	}
});

/*
-------------------------------------
-- 继承: CE.object
-- 描述: 特效类
-- 属性: 
-- 方法: moveRg:显示角色可行走区域
-- 日期: 2008-8-13
-- 修改: 2008-8-18
-- 说明: 
-------------------------------------
*/

CE.effect = CE.extend(CE.object,{
	baseZ : 5000,
	moveRg : function(a){
		for(var i=0;i<CE.world.npcMob.length;i++){
			CE.dom.del(CE.world.npcMob[i]);
		}
		CE.world.npcMob=new Array();
		if(a){
			var temDoc = document.createDocumentFragment();
			for(var j=0;j<a.length;j++){
				var grid = CE.dom.create("div");
				grid.type = "npcMob";
				grid.style.position = "absolute";
				grid.style.width = CE.world.cell-2+"px";
				grid.style.height = CE.world.cell-2+"px";
				grid.style.top = a[j][1]*CE.world.cell+"px";
				grid.style.left = a[j][2]*CE.world.cell+"px";
				grid.style.background="url("+CE.serverPath+"/ui/td1.png)";
				grid.style.border="1px dotted #fff";
				grid.style.zIndex = this.baseZ;
				grid.id = "grid_"+a[j][1]+"_"+a[j][2];
				grid.onmouseover = function(o){
					return function(){
						if(CE.world.roleLock) return;
						o.style.background="url("+CE.serverPath+"/ui/td3.png)";
						o.style.border="1px dotted #ff0";
					}	
				}(grid);
				grid.onmouseout = function(o){
					return function(){
						if(CE.world.roleLock) return;
						o.style.background="url("+CE.serverPath+"/ui/td1.png)";
						o.style.border="1px dotted #fff";
					}	
				}(grid);
				CE.handle.click(grid);
				temDoc.appendChild(grid);
				CE.world.npcMob.push(grid);
			}
			CE.world.objDom.appendChild(temDoc);
		}
	},
	bfsPatch : function(a){
		if(CE.world.npcMob.length==0) return;
		for(var i=0;i<a.length;i++){
			var temId = "grid_"+a[i][1]+"_"+a[i][2];
			var elm = CE.dom.get(temId);
			elm.style.background="url("+CE.serverPath+"/ui/td2.png)";
			elm.style.border="1px dotted #fff";
		}
	}
});
