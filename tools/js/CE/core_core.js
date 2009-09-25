/*
****************************************************************
* 标题: 核心基础类
* 作者: coldera
* 日期: 2008-8-6
* 版本: v CE_2.01
* 描述: 2008-8-6重写大部分程序,所以升级为第二版,实现一些基础类
****************************************************************
*/
var CE = function(){
	this.version = "v CE_2.01";	
	this.advScreen = "1152*864";
	this.serverPath = "";
}

/*
-------------------------------------
-- 继承: 无
-- 描述: 类的基本继承方法
-- 参数: p:父类对象 c:原来的对象
-- 返回: function 继承后的新类
-- 日期: 2008-6-26
-- 修改: 2008-6-26
-- 说明:
-------------------------------------
*/

CE.extend = function(p,c){
	if(typeof p != "function" || typeof c != "object") return;
	var fn = function(){
		p.call(this);	
	}
	fn.prototype = new p();
	for(var n in c){
		fn.prototype[n] = c[n];
    }
	c = null;
	return fn;
}

/*
-------------------------------------
-- 继承: CE
-- 描述: 全局类
-- 属性: cell:坐标基本单元大小; coor:保存地图坐标,是数组格式[值,row,col]; 
		objPoint:保存坐标上的物件点;objDom:object对象所在的层;actNpc:当前激活的NPC
		battleMode:进入战斗模式; dialogMode:进入剧情模式; roleLock:进入角色行动锁定状态
-- 方法: getCoor:形成一个数字对象组成的三维坐标数组
-- 日期: 2008-8-6
-- 修改: 2008-8-13
-- 说明: 单例,用于保存大部分临时交换数据,和一些全局数据
-------------------------------------
*/

CE.world = CE.extend(CE,{
	cell : 45,
	entrys : new Array(),
	coor : null,
	objPoint : new Array(),
	actPoint : new Array(),
	objDom : null,
	actNpc : null,
	npcMob : new Array(),
	battleMode : false,
	dialogMode : false,
	roleLock : false,
	speed : 20,
	keyupTO : null,
	setCoor : function(data){
		var row = data.length;
		var col = data[0].length;
		this.coor = new Array(row);
		for(var i=0;i<row;i++){
			this.coor[i] = new Array(col);
			for(var j=0;j<col;j++){
				this.coor[i][j] = [data[i][j],i,j];
			}	
		}
	}
});


/*
-------------------------------------
-- 继承: CE
-- 描述: 游戏地图类
-- 属性: name:地图名; dom:地图的DOM; baseZ:地图层次; cell:地图图片大小;scrollSpeed:图片滚动速度;
		graphic:用于保存地图图片; row,col:地图总行列; xNum,yNum:地图每次加载行列; startXY:地图起始图片号; offsetXY:地图调整值;
-- 方法: create:创建并初始化地图原始数据;loadGrap:加载地图数据; build:初始化地图对象; at:定位地图,参数xy是调整值; resetXY:重新计算startXY,offsetXY
-- 日期: 2008-8-6
-- 修改: 2008-8-12
-- 说明: 单例
-------------------------------------
*/
CE.map = CE.extend(CE,{
	name : null,
	type : "map",
	dir : null,
	graphic : new Array(),
	dom : null,
	baseZ : 1000,
	cell : 225,
	row : 0,
	col : 0,
	xNum : 0,
	yNum : 0,
	osNum : 2,
	startXY : [-2,-2],
	offsetXY : [10,100],
	scrollSpeed : 45,
	create : function(data){
		if(CE.map.dom){
			CE.dom.del(CE.map.dom);
			CE.map.dom=null;
		}
		if(data.length==0){
			alert("地图加载错误");
			return;
		}
		this.name = data[0][0];
		this.dir = data[0][3];
		this.row = parseInt(data[0][2]*CE.world.cell/this.cell);
		this.col = parseInt(data[0][1]*CE.world.cell/this.cell);
		var osNum = this.osNum;
		this.yNum = parseInt(CE.layout.height/this.cell)+osNum*2;
		this.xNum = parseInt(CE.layout.width/this.cell)+osNum*2;
		
		var tab = CE.dom.addEntry(CE.layout.dom,"div","",CE.layout.width+osNum*2*this.cell,CE.layout.height+osNum*2*this.cell);
		tab.className = "mapTable";
		tab.style.zIndex = this.baseZ;
		tab.style.top = -(this.cell*osNum)+"px";
		tab.style.left = -(this.cell*osNum)+"px";
		data.shift();
		CE.world.setCoor(data);
		
		var temElm = document.createDocumentFragment();
		for(var i=0;i<this.xNum*this.yNum;i++){
			var temImg = CE.dom.create("img");
			temImg.width = this.cell;
			temImg.height = this.cell;
			temElm.appendChild(temImg);
			this.graphic.push(temImg);
		}
		tab.appendChild(temElm);
		temElm = null;
		this.dom = tab;
	},
	build : function(data){
		if(data.length==0){
			alert("游戏对象加载错误");
			return;
		}
		
		var e = CE.dom.addEntry(CE.layout.dom,"div","",CE.map.col*CE.map.cell,CE.map.row*CE.map.cell);
		e.style.zIndex = 3000;
		e.style.top = 0;
		e.style.left = 0;
		CE.world.objDom = e;
		
		for(var i=0;i<data.length;i++){
			var o = new CE.thing();
			o.graphic = data[i].img;
			o.width = parseInt(data[i].size[0]);
			o.height = parseInt(data[i].size[1]);
			o.x = parseInt(data[i].pos[0]);
			o.y = parseInt(data[i].pos[1]);
			o.area = eval("["+data[i].area+"]");
			o.id = data[i].id;
			o.create(o.id);
		}
		this.at();
		this.loadGrap();
	},
	loadGrap : function(){
		var startNum = this.startXY[0]+this.startXY[1]*this.col+1;
		for(var i=0;i<this.graphic.length;i++){
			var num = startNum+(i+this.xNum)%this.xNum+parseInt(i/this.xNum)*this.col;
			var temRow = parseInt(i/this.xNum)+this.startXY[1];
			if(num>0 && num>temRow*this.col && num <= (temRow+1)*this.col && num<=this.row*this.col){
				this.graphic[i].src = CE.serverPath+"/game/"+this.dir+"/map/"+num+".jpg";
			}else{
				this.graphic[i].src = CE.serverPath+"/game/nomap.gif";
			}
			//CE.dom.addEvent(this.graphic[i],"error",function(){alert(i);})
		}
	},
	resetXY : function(){
		//alert(CE.map.startXY+"___"+CE.map.offsetXY);
		var objLeft = -parseInt(CE.world.objDom.style.left);
		var objTop = -parseInt(CE.world.objDom.style.top);
		this.startXY[0] = parseInt(objLeft/this.cell)-this.osNum;
		this.startXY[1] = parseInt(objTop/this.cell)-this.osNum;
		this.offsetXY[0] = objLeft%this.cell;
		this.offsetXY[1] = objTop%this.cell;
		//alert(CE.map.startXY+"___"+CE.map.offsetXY);
	},
	at : function(x,y){ 
		//参数x,y是调整值,单位像素
		if(!x) x=0;
		if(!y) y=0;
		//alert([x,y]+"__"+this.offsetXY);
		this.startXY[0] += parseInt((x+this.offsetXY[0])/this.cell);
		if(x+this.offsetXY[0]>=0){
			this.offsetXY[0] = (x+this.offsetXY[0]+this.cell)%this.cell;
		}else{
			this.offsetXY[0] = (x+this.offsetXY[0]-this.cell)%this.cell;
			if(this.offsetXY[0]!=0){
				this.offsetXY[0] = this.cell+this.offsetXY[0];
				this.startXY[0] -= 1;
			}
		}
		this.startXY[1] += parseInt((y+this.offsetXY[1])/this.cell);
		if(y+this.offsetXY[1]>=0){
			this.offsetXY[1] = (y+this.offsetXY[1]+this.cell)%this.cell;
		}else{
			this.offsetXY[1] = (y+this.offsetXY[1]-this.cell)%this.cell;
			if(this.offsetXY[1]!=0){
				this.offsetXY[1] = this.cell+this.offsetXY[1]
				this.startXY[1] -= 1;
			}
		}
		//alert(CE.map.startXY+"___"+CE.map.offsetXY);
		this.dom.style.top = -(this.cell*this.osNum)-this.offsetXY[1]+"px";
		this.dom.style.left = -(this.cell*this.osNum)-this.offsetXY[0]+"px";
		if(CE.world.objDom){
			CE.world.objDom.style.top = -(this.osNum+this.startXY[1])*CE.map.cell-this.offsetXY[1]+"px";
			CE.world.objDom.style.left = -(this.osNum+this.startXY[0])*CE.map.cell-this.offsetXY[0]+"px";
			var layerLeft = parseInt(CE.world.objDom.style.left);
			var layerTop = parseInt(CE.world.objDom.style.top);
			if(layerLeft>=0) CE.world.objDom.style.left=0;
			else if(layerLeft<CE.layout.width-CE.world.objDom.offsetWidth) CE.world.objDom.style.left=CE.layout.width-CE.world.objDom.offsetWidth;
			if(layerTop>=0) CE.world.objDom.style.top=0;
			else if(layerTop<CE.layout.height-CE.world.objDom.offsetHeight) CE.world.objDom.style.top=CE.layout.width-CE.world.objDom.offsetHeight;
		}
		this.resetXY();
	}
});

/*
-------------------------------------
-- 继承: CE
-- 描述: 数据加载类
-- 属性: xmlHttp:创建XMLHTTP对象;data:保存获取到的数据;
-- 方法: getData:请求数据;arrData:以数组形式处理数据;xmlData:以XML形式处理数据
-- 日期: 2008-8-6
-- 修改: 2008-8-7
-- 说明: 
-------------------------------------
*/

CE.data = CE.extend(CE,{
	xmlHttp : window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest(),
	data : null,
	getData : function(url){
		this.xmlHttp.open("get",url,false);
		this.xmlHttp.send(null);
		this.data = this.xmlHttp.responseText;
	},
	arrData : function(){
		var a = eval("["+this.data+"]");
		return a;
	},
	xmlData : function(){
		if(!this.data) return;
		var xmlDoc = CE.dom.loadXML(this.data);
		var boot = CE.dom.getXmlBoot(xmlDoc);
		var type = boot.getAttribute("type");
		var data = new Array();
		if(type == "map"){
			var map = boot.getAttribute("map");
			var a = CE.dom.get("object",boot);
			for(var i=0;i<a.length;i++){
				var o = new Object();
				o.img = CE.serverPath+"/game/"+map+"/"+CE.dom.get("name",a[i],true)+".png";
				o.pos = CE.dom.get("pos",a[i],true).split(",");
				o.size = CE.dom.get("size",a[i],true).split(",");
				o.area = CE.dom.get("area",a[i],true).split(",");
				o.id = CE.dom.get("id",a[i],true);
				data.push(o);
			}
		}
		return data;
	}
});

/*
-------------------------------------
-- 继承: CE
-- 描述: 游戏模型的基类
-- 特性: name:对象名称; graphic:对象贴图路径;x,y,z:对象的坐标和层次;
-- 方法: showGrap:显示贴图; delGrap:去除贴图;at:定位对象,参数x,y为地图坐标;p2p:使对象移动到目标坐标;setZ:设置z坐标;
		 bfs:获取行走路线数组
-- 日期: 2008-8-8
-- 修改: 2008-8-18
-- 说明: 游戏基础对象目前可以扩展成 NPC,物品,场景
-------------------------------------
*/
CE.object = CE.extend(CE,{
	name : null,
	graphic : null,
	x : 0,
	y : 0,
	z : null,
	baseZ : 1000,
	setZ : function(i){
		this.dom.style.zIndex = this.baseZ + i;
		this.z = i;
	},
	at : function(x,y){
		this.dom.style.left = x*CE.world.cell+(CE.world.cell-this.width)/2+"px";
		this.dom.style.top = (y+1)*CE.world.cell-this.height+"px";
		this.x = x;
		this.y = y;
		this.z = y;
		this.setZ(y);
		CE.world.objPoint.push([CE.world.coor[y][x],y,x]);
		CE.world.coor[y][x][0] = 0;
	},
	showGrap : function(url,rp){
		if(rp==null) rp="no-repeat";
		this.dom.style.background = "url("+url+") "+rp;
	},	
	bfs : function(x,y){
		var a = new Array();
		var b = new Array(new Array());
		a.push(CE.world.coor[this.y][this.x]);
		b[0][0] = CE.world.coor[this.y][this.x];
		var tar = CE.world.coor[y][x];
		//alert(tar);
		while(true){
			try{
			var x = b[0][b[0].length-1][2];
			var y = b[0][b[0].length-1][1];
			try{
				var c = [CE.world.coor[y-1][x],CE.world.coor[y][x+1],CE.world.coor[y+1][x],CE.world.coor[y][x-1],CE.world.coor[y-1][x+1],CE.world.coor[y+1][x+1],CE.world.coor[y+1][x-1],CE.world.coor[y-1][x-1]]
			}catch(err){}
			for(var i=0;i<c.length;i++){
				if(c[i] && c[i][0]>0 && CE.handle.arrFind(a,c[i])==-1){
					a.push(c[i]);
					var patch = new Array();
					for(var n in b[0]){
						patch[n] = b[0][n];	
					}
					patch.push(c[i]);
					b[b.length] = patch;
					if(c[i]==tar){
						a = null; b = null; c = null;
						patch.shift();
						var ef = new CE.effect();
						ef.bfsPatch(patch);
						ef = null;
						return patch;
					}
				}
			}
			b.shift();
			}catch(err){
				a = null; b = null; c = null;
				//alert(err);	
				alert("寻路异常");
				return;
			}
		}
	},
	p2p : function(x,y){
		var endX = parseInt(x*CE.world.cell+(CE.world.cell-this.width)/2);
		var endY = parseInt((y+1)*CE.world.cell-this.height);
		var curX = parseInt(this.dom.style.left);
		var curY = parseInt(this.dom.style.top);
		
		if(curX > endX){
			this.dom.style.left = (curX - this.speed)<=endX ? endX+"px" : (curX - this.speed)+"px";
		}else if(curX < endX){
			this.dom.style.left = (curX + this.speed)>=endX ? endX+"px" : (curX + this.speed)+"px";
		}else{
			this.dom.style.left = endX+"px";	
		}
		if(curY > endY){
			this.dom.style.top = (curY - this.speed)<=endY ? endY+"px" : (curY - this.speed)+"px";
		}else if(curY < endY){
			this.dom.style.top = (curY + this.speed)>=endY ? endY+"px" : (curY + this.speed)+"px";
		}else{
			this.dom.style.top = endY+"px";
		}
		//alert([curX,endX,curY,endY])
		if(curX == endX  && curY == endY ){
			if(this.type == "role" || this.type == "monster" ){
				if(this.x == CE.world.actPoint[0] && this.y == CE.world.actPoint[1]){
					this.at(CE.world.actPoint[0],CE.world.actPoint[1]);
					CE.world.roleLock = false;
					if(CE.world.battleMode){
						this.stop();
						var ef = new CE.effect();
						ef.moveRg();
						ef=null;
						CE.layout.centerView(CE.world.actNpc.x,CE.world.actNpc.y,30);
						CE.world.actNpc=null;
					}
				}else{
					this.goNext();
				}
			}
		}else{
			setTimeout(function(o,x,y){
				return function(){
					o.p2p(x,y);
				}
			}(this,x,y),CE.world.speed);
		}
	}
});
