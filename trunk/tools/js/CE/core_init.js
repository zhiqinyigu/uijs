function worldInit(){
	CE.serverPath = "http://cedeyy.cn/test/2008v2";
	CE.world = new CE.world();
	CE.dom = new CE.dom();
	CE.layout = new CE.layout();
	CE.map = new CE.map();
	CE.handle = new CE.handle();
	CE.btlMenu = new CE.btlMenu();
	document.onkeydown = CE.handle.keyDown;
	document.onkeyup = CE.handle.keyUp;
	document.oncontextmenu = function(){return false;}
	//CE.scene = new CE.scene();
}
