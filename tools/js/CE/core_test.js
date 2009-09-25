window.onload = function(){
	//初始化
	worldInit();
	CE.layout.init();
		
	//生成地图
	var mapData = new CE.data();
	mapData.getData(CE.serverPath+"/map/002.txt");
	var md = mapData.arrData();
	CE.map.create(md);
	mapData.getData(CE.serverPath+"/map/001.xml");
	md = mapData.xmlData();
	CE.map.build(md);
	md = null;
	//模式
	CE.world.battleMode = true;
	//创建角色
	var hero = new CE.role();
	hero.graphic = CE.serverPath+"/npc/r/1/";
	hero.create("测试角色A");
	hero.mob = 5;
	
	//角色定位
	hero.at(15,8);
	hero.stop();
	CE.world.actNpc=hero;
	
	var hero2 = new CE.role();
	hero2.graphic = CE.serverPath+"/npc/r/1/";
	hero2.create("测试角色B");
	hero2.at(20,20);
	hero2.turn(5);
	hero2.mob = 7;
	hero2.stop();
	
	//hero2.play("move");
	//CE.layout.centerView(20,20);
	CE.layout.centerView(0,0);
	
	var mon = new CE.monster();
	mon.graphic = CE.serverPath+"/npc/m/test/";
	mon.create("测试怪物A");
	mon.mob = 7;
	mon.at(13,10);
	mon.turn(2);
	mon.speed=1;
	//CE.world.actNpc=mon;
	
}