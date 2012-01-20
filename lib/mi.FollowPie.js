var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var __mouseX = 0;
var __mouseY = 0;


function Sprite_arc(x, y, start,arcs, radius, value, color,text)
{
    this.x = x;
    this.y = y;
	this.arcs = arcs;
	this.radius = radius;
	this.start = start
	this.color = color;
    this.angle = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.alpha = 1;
	this.isDrug = false;
	this.text = text;

	this.select = false;

	if(value > 20)
	{
		this.text = this.text;
	}
	else if(value > 10)
	{
		this.text = value + "%";
	}
	else
	{
		this.text = "";
	}
	//this.text = this.text + value + "%";
	this.offset = {x:0,y:0};
}

Sprite_arc.prototype.draw = function()
{
	context.save();
	context.globalAlpha = this.alpha;
	context.rotate(this.angle);
	context.scale(this.scaleX, this.scaleY);
	context.fillStyle = this.color;
	context.beginPath();
	context.moveTo(this.x, this.y);
	context.lineTo(this.x + this.radius*Math.sin(Math.PI*this.start/180), this.y+this.radius*Math.cos(Math.PI*this.start/180));
	context.moveTo(this.x, this.y);
	context.lineTo(this.x + this.radius*Math.sin(Math.PI*(this.start+this.arcs)/180), this.y+this.radius*Math.cos(Math.PI*(this.start+this.arcs)/180));
	context.moveTo(this.x, this.y);
	context.arc(this.x, this.y, this.radius, Math.PI*this.start/180, Math.PI*(this.start+this.arcs)/180, false);
	context.closePath();
	context.fill();
/*
	context.fillStyle = "#000000";
	context.beginPath();

	var textY = this.x + .8*this.radius*Math.sin(Math.PI*(this.start + this.arcs*.5)/180);
	var textX = this.y + .8*this.radius*Math.cos(Math.PI*(this.start + this.arcs*.5)/180);

	context.fillText(this.text, textX, textY);
	context.closePath();
	context.fill();
*/
	context.restore();
}

Sprite_arc.prototype.drawSelect = function()
{
	if(this.select)
	{
	context.save();
	context.globalAlpha = this.alpha;
	context.rotate(this.angle);
	context.scale(this.scaleX, this.scaleY);
	context.fillStyle = this.color;

	context.shadowOffsetX = 2;
	context.shadowOffsetY = 2;
	context.shadowBlur    = 3;
	context.shadowColor   = 'rgba(12, 0, 12, 0.5)';

	context.beginPath();
	context.moveTo(this.x, this.y);
	context.lineTo(this.x + this.radius*Math.sin(Math.PI*this.start/180), this.y+this.radius*Math.cos(Math.PI*this.start/180));
	context.moveTo(this.x, this.y);
	context.lineTo(this.x + this.radius*Math.sin(Math.PI*(this.start+this.arcs)/180), this.y+this.radius*Math.cos(Math.PI*(this.start+this.arcs)/180));
	context.moveTo(this.x, this.y);
	context.arc(this.x, this.y, this.radius, Math.PI*this.start/180, Math.PI*(this.start+this.arcs)/180, false);
	context.closePath();
	context.fill();
/*
	context.fillStyle = "#000000";
	context.beginPath();

	var textY = this.x + .8*this.radius*Math.sin(Math.PI*(this.start + this.arcs*.5)/180);
	var textX = this.y + .8*this.radius*Math.cos(Math.PI*(this.start + this.arcs*.5)/180);

	context.fillText(this.text, textX, textY);
	context.closePath();
	context.fill();
*/
	context.restore();
	}
}

Sprite_arc.prototype.checkDrug = function()
{
    var xpos = (__mouseX - this.x);
	var ypos = (__mouseY - this.y);

	var tan = ypos/xpos;


	var mouseArcs = Math.atan(tan) * 180/Math.PI;

	if(xpos < 0 )
	{
		mouseArcs = 180 + mouseArcs;
	}
	else if(xpos > 0 && ypos < 0)
	{
		mouseArcs = 360 + mouseArcs;
	}
	else if(this.start < 360 && (this.arcs + this.start) >= 360 && (this.arcs + this.start) < 450)
	{
		mouseArcs = 360  + mouseArcs;
	}
	var lineLen = Math.sqrt(Math.pow(xpos,2) + Math.pow(ypos,2));

	if(mouseArcs <= (this.arcs + this.start) && lineLen<=this.radius && mouseArcs > this.start)
	{
		this.isDrug = true;
		this.offset.x = this.x - __mouseX;
		this.offset.y = this.y - __mouseY;
		this.scale = 1.2;
		return true;
	}
	else
	{
		this.scale = 1;
		return false;
	}
}


function Sprite_Title(x, y, width, height, value,color, text)
{
	this.x = x;
    this.y = y;
	this.width = width;
    this.height = height;
	this.text = text + value + "%";

	this.color = color;
    this.angle = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.alpha = 1;
	this.isDrug = false;
	this.select = false;
	this.offset = {x:0,y:0};
}

Sprite_Title.prototype.draw = function()
{
	context.save();
	context.globalAlpha = this.alpha;
	context.rotate(this.angle);
	context.scale(this.scaleX, this.scaleY);
	context.fillStyle = this.color;

	context.shadowOffsetX = 1;
	context.shadowOffsetY = 1;
	context.shadowBlur    = 2;
	context.shadowColor   = 'rgba(12, 12, 12, 0.5)';

	context.beginPath();
	context.fillRect(this.x,this.y,this.width, this.height);
	context.closePath();
	context.fill();
	context.fillStyle = "#000000";
	context.beginPath();
	if(this.select)
	{
		context.font="14px 宋体";
	}
	else
	{
		context.font="宋体";
	}
	//context.fillRect(this.x,this.y,this.width, this.height);
	context.fillText(this.text,this.x + this.width + 10  ,this.y + 10);
	context.closePath();
	context.fill();
	context.restore();
}


MI.FollowPie = function(colorConfig,dataArr,radius,arcPos,titlePos,canvasPos){
	this.colorArray = colorConfig;
	this.dataArray = dataArr;
	this.pieDataArray = [];
	this.titleDataArray = [];

	this.drawArray = [];
	this.NONE_COLOR = "#DDEFF7";

	this.MAX_LINE_NUM = 8;

	this.radius = radius;
	this.arcPos = arcPos;
	this.titlePos = titlePos;
	this.canvasPos = canvasPos;

	MI.FollowPie.prototype.canvasPos = canvasPos;
}
MI.FollowPie.prototype.configData = function(dataArr)
{
	var start = 0;
	var posx = 0;
	var posy = 0;
	var arc,title;
	this.pieDataArray = [];
	this.titleDataArray = [];
	this.drawArray = [];

	if(!dataArr)
	{
		var dataArr = this.dataArray;
	}

	var total = dataArr.total;

	var percentTotal = 0;
	var cnt = 0;
	for(var i in dataArr['list'])
	{
		var dname = dataArr['list'][i].name;
		var did = i;
		var dcolor = this.colorArray[i];

		var count = dataArr['list'][i].count;

		var dval = Math.floor(count/total * 100);

		var dpercent = count/total * 100;

		percentTotal += dval;

		var pos = {x:posx, y: posy};
		cnt ++;
		this.drawArray.push({id:did, color:dcolor, name:dname,percent:dpercent,value:dval,position:pos});
	}
	
	for(var i = 0; i < this.drawArray.length; i ++)
	{
		if(percentTotal < 100)
		{
			this.drawArray[cnt-1].value += (100 - percentTotal);
		}
		var temp = start;
		var arcsvalue = this.drawArray[i].percent * 360 / 100;
		arc = new Sprite_arc(this.arcPos.x, this.arcPos.y, temp, arcsvalue, this.radius,  this.drawArray[i].value, this.drawArray[i].color,this.drawArray[i].name)
		start += arcsvalue;
		title = new Sprite_Title(this.titlePos.x + posx, this.titlePos.y + posy, 10, 10,  this.drawArray[i].value, this.drawArray[i].color,this.drawArray[i].name);
		//x, y, width, height, value,color, text
		posy += 20;
		if(this.MAX_LINE_NUM == (i+1))
		{
			posy = 0;
			posx += 80;
		}

		this.pieDataArray.push(arc);
		this.titleDataArray.push(title);
	}
	
}
MI.FollowPie.prototype.reDraw = function ()
{
	context.clearRect(0, 0, 550, 400);

	for(var i=0; i < this.pieDataArray.length; i++)
	{
		this.pieDataArray[i].draw();
		this.titleDataArray[i].draw();
		this.pieDataArray[i].drawSelect();
	}
}

MI.FollowPie.prototype.onMouseDown = function(e)
{
	__mouseX = e.clientX - MI.FollowPie.prototype.canvasPos.x;
	__mouseY = e.clientY - MI.FollowPie.prototype.canvasPos.y;

	for(var i=0; i < this.pieDataArray.length; i++)
	{
		var isDrag = this.pieDataArray[i].checkDrug();
		this.titleDataArray[i].select = isDrag;
		this.pieDataArray[i].select = isDrag;		
	}
	this.reDraw();
}