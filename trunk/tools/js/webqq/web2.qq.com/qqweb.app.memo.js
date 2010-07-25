/* == QQWeb 便签 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2010.04.10 ----- */




Jet().$package(qqweb.app.memo = new qqweb.businessClass.App(qqweb.portal.getAppConfig('memo')), function(J){
	var packageContext = this,
		$D = J.dom,
		$E = J.event,
		$S = J.string,
		uin2widget= {},
		widgetList= [],
		memo={},
		id2IsAdded={},
		id2widgets={},
		self;
	
	//TODO 地址先写在这里
	var MEMO_API_SERVER_URL= 'http://web2.qq.com/cgi-bin/mydata_api/';
	
	//响应jsonp
	this.getMydata = function(data) {
		var widget= packageContext.getMydata.widget;
		if(!J.isUndefined(data.ok)){
			if(data.ok.c==2 && data.ok.m=='no data') {
				$E.notifyObservers(widget, "getEmpty",widget);
			}
			else {
				//$E.notifyObservers(widget, "getExist",widget);
			}
		}else{
			$E.notifyObservers(widget, "saveOrUpdateFaild",widget);
		}
		delete widget;
	};
	//响应jsonp
	this.getMydataFirst = function(data) {
		var widget= packageContext.getMydataFirst.widget;
		if(!J.isUndefined(data.ok)){
			if(data.ok.c==2 && data.ok.m=='no data') {
				//
				widget.els.div.innerHTML= 'My Note';
			}
			else {
				memo[widget.id]= data.ok.n;
				if(memo[widget.id]==' ') {
					memo[widget.id]='';
				}
				id2IsAdded[widget.id]= true;
				widget.els.div.innerHTML= J.string.toHtml(memo[widget.id]);
				widget.els.textarea.value= memo[widget.id];
				checkLength(widget,memo[widget.id]);
			}
		}else{
			$E.notifyObservers(widget, "saveOrUpdateFaild",widget);
		}
		delete widget;
	};
	//调用
	var sendGetMydata = function(option,widget,callback) {
		/* 	get
			http://qqweb.qq.com/cgi-bin/mydata_api/19822?t=1&id=1
			{"ok":{"c":2,"m":"no data"}}
			{"ok":{"u":55586648,"t":1,"n":"test1","c":1272366052}}
		 */
		//动态注入
		
		if(callback) {
			var funcName= callback.split('.');
			funcName= funcName[funcName.length-1];
			packageContext[funcName].widget= widget;
		}
		else {
			packageContext['getMydata'].widget= widget;
		}
		var queryString = J.string.toQueryString(option);
		J.http.loadScript(MEMO_API_SERVER_URL + "19822",{
			//callback参数替换
			query : queryString+'&callback='+(callback||'qqweb.app.memo.getMydata')+'&tt=' + (new Date()).getTime(),
			onSuccess : function(data){
				//
			},
			onError : function(data){
				$E.notifyObservers(widget, "saveOrUpdateFaild",widget);
			}
		});
	};
	//响应jsonp
	this.addMydata = function(data) {
		var widget= packageContext.addMydata.widget;
		if(!J.isUndefined(data.ok)){
			if(data.ok.c==0 && data.ok.m=='ok') {
				$E.notifyObservers(widget, "saveSucess",widget);
			}
			else {
				$E.notifyObservers(widget, "saveOrUpdateFaild",widget);
			}
		}else{
			$E.notifyObservers(widget, "saveOrUpdateFaild",widget);
		}
		delete widget;
	};
	//调用
	var sendAddMydata = function(option,widget) {
		/* 	add
			http://qqweb.qq.com/cgi-bin/mydata_api/19820?t=1&n=test
			{"ok":{"c":0,"m":"ok","id":1}}
		 */
		//动态注入
		packageContext.addMydata.widget= widget;
		
		var queryString = J.string.toQueryString(option);
		J.http.loadScript(MEMO_API_SERVER_URL + "19820",{
			query : queryString+'&callback=qqweb.app.memo.addMydata'+'&tt=' + (new Date()).getTime(),
			onSuccess : function(data){
	
			},
			onError : function(data){
				$E.notifyObservers(widget, "saveOrUpdateFaild",widget);
			}
		});
	};
	//响应jsonp
	this.updateMydata = function(data) {
		var widget= packageContext.updateMydata.widget;
		if(!J.isUndefined(data.ok)){
			if(data.ok.c==0 && data.ok.m=='ok') {
				$E.notifyObservers(widget, "saveSucess",widget);
			}
			else {
				$E.notifyObservers(widget, "saveOrUpdateFaild",widget);
			}
		}else{
			$E.notifyObservers(widget, "saveOrUpdateFaild",widget);
		}
		delete widget;
	};	
	//调用
	var sendUpdateMydata = function(option,widget) {
		/* 	update
			http://qqweb.qq.com/cgi-bin/mydata_api/19823?t=1&id=1&n=testnew
			{"ok":{"c":0,"m":"ok"}}
		 */
		//动态注入
		packageContext.updateMydata.widget= widget;
		
		var queryString = J.string.toQueryString(option);
		J.http.loadScript(MEMO_API_SERVER_URL + "19823",{
			query : queryString+'&callback=qqweb.app.memo.updateMydata'+'&tt=' + (new Date()).getTime(),
			onSuccess : function(data){
				//
			},
			onError : function(data){
				$E.notifyObservers(widget, "saveOrUpdateFaild",widget);
			}
		});
	};	
	
	
	var renderHTML = function(id) {
		return '<div id="memo_area_'+id+'" class="memo_area">\
			<div id="div_memo_area_content_'+id+'" class="memo_area_content"></div>\
			<div class="memo_area_content" style="display:none;">\
			<textarea id="textarea_memo_area_content_'+id+'" class="memo_area_content memo_area_content_plus" ></textarea>\
			</div>\
			<div class="memo_area_tips" id="memo_area_tips_'+id+'">0/200</div>\
			</div>';
		//overflow-y:scroll; 
	};
	var checkLength= function(widget,value) {
		var length= $S.byteLength(value);
		var tips= widget.els.tips;
		tips.innerHTML= length+"/200";
		if(length>200) {
			$D.addClass(tips,"memo_area_tips_over");
			widget._overLength= true;
		}
		else {
			$D.removeClass(tips,"memo_area_tips_over");
			widget._overLength= false;
		}			
	};
	var switchMode= function(widget) {
		var textarea= widget.els.textarea;
		var div= widget.els.div;
		$D.hide(textarea.parentNode);
		$D.show(div);
	}
	
	
	var observer = {
		onRun : function(){
			var widget = packageContext.getWidget(0);
			if (widget) {
				widget.setCurrent();
			}else {
				var widget = new qqweb.businessClass.Widget({
					width: 181,
					height: 220,
					//,left: 10
					//,bottom: 41
					hasCloseButton:true,
    				hasPinDownButton:true,
    				/*
					closeStyle: 'memo_tool_bar_button_close',
					pinUpStyle: 'memo_tool_bar_button_pinUp',
					pinDownStyle: 'memo_tool_bar_button_pinDown',
					*/
					
					left:30,
					top:420,
					isFix:true //可以固定widget位置
					//,dragable: false
				});
				var id= widget.getId();
				var html = renderHTML(id);
				widget.setHtml(html);
				//添加观察者
				$E.addObserver(widget, "close", observer.onWidgetClose);
				$E.addObserver(widget, "mouseoverWindow", observer.onMouseoverWindow);
				$E.addObserver(widget, "mouseoutWindow", observer.onMouseoutWindow);
				$E.addObserver(widget, "clickPinUpButton", observer.onClickPinUpButton);
				$E.addObserver(widget, "clickPinDownButton", observer.onClickPinDownButton);
				$E.addObserver(widget, "clickCloseButton", observer.onWidgetClose);
				$E.addObserver(widget, "getExist", observer.onGetExist);
				$E.addObserver(widget, "getEmpty", observer.onGetEmpty);
				$E.addObserver(widget, "saveSucess", observer.onSaveSucess);
				$E.addObserver(widget, "saveOrUpdateFaild", observer.onSaveOrUpdateFaild);
				$E.addObserver(widget, "shortMoveClick",observer.onShortMoveClick);	
				//DOM
				var textarea,div,tips;
				memo[id]= 'My memo';
				widget.els= {};
				//引用dom元素
				widget.els.textarea= textarea= $D.id("textarea_memo_area_content_"+id);
				widget.els.div= div= $D.id("div_memo_area_content_"+id);
				widget.els.tips= tips= $D.id("memo_area_tips_"+id);
				$D.hide(tips);
				$E.on(textarea,"keyup",function(e){
					observer.onKeyup(e,widget);
				});
				packageContext.setWidget(0, widget);
				sendGetMydata({t:1,id:1},widget,'qqweb.app.memo.getMydataFirst');
			}
			packageContext.widget=widget;
		},
		onWidgetClose : function(widget) {
			//packageContext.closeWidget(Widget.getId());
			packageContext.closeWidget(0);
		},
		onShortMoveClick : function(widget) {
			var id= widget.id;
			var textarea= widget.els.textarea;
			var div= widget.els.div;
			var tips= widget.els.tips;
			$D.hide(div);
			$D.show(textarea.parentNode);
			widget.setDisableDrag();
			textarea.focus();
			$D.show(tips);
			$E.on(textarea, "blur",function(e) {
				observer.onBlur(e,widget);
			});
		},
		onBlur : function(e,widget) {
			var id= widget.id;
			//强制截断 也许需要提示？200
			var textarea= widget.els.textarea;
			var div= widget.els.div;
			var tips= widget.els.tips;
			var value= textarea.value;
			$D.hide(tips);
			
			value = $S.cutByBytes(value,200);
			
			textarea.value= value;
			
			value= textarea.value||' ';
			checkLength(widget,textarea.value);
		
			if(id2IsAdded[id]) {
				
				sendUpdateMydata({t:1,id:1,n:value},widget)
			}
			else {
				sendGetMydata({t:1,id:1},widget)
			}
			
	
			$E.off(textarea, "blur");
			widget.setEnableDrag();
		},
		onMouseoverWindow : function(widget) {
			
		},
		onMouseoutWindow : function(widget) {
			
		},
		onKeyup : function(e,widget) {
			var id= widget.id;
			var textarea= widget.els.textarea; 
			var value= textarea.value;
			checkLength(widget,value);
		},
		onClickPinUpButton : function(widget) {
			//这里可以增加处默认z-index置顶外的动作
		},
		onClickPinDownButton : function(widget) {
			//这里可以增加处默认z-index置顶外的动作
		},
	 	onSaveSucess: function(widget) {
	 		var id= widget.id;
			memo[id]= widget.els.textarea.value;
			if(memo[id]==' '){
				memo[id]='';
			}
			widget.els.div.innerHTML= J.string.toHtml(memo[id]);
			id2IsAdded[id]= true;
			switchMode(widget);
		},
		onSaveOrUpdateFaild: function(widget) {
			var id= widget.id;
			widget.els.div.innerHTML= J.string.toHtml(memo[id]);
			widget.els.textarea.value= memo[id];
			switchMode(widget);
		},
		onGetExist: function(widget) {
			//id2IsAdded[widget.id]= true;
			//sendUpdateMydata({t:1,id:1,n:widget.els.textarea.value},widget)
		},
		onGetEmpty: function(widget) {
			sendAddMydata({t:1,n:widget.els.textarea.value},widget);
		}
	};
	
	$E.addObserver(this, "run", observer.onRun);
	
	
	this.createWindow = function(option){
		//重写createWindow函数
		//这里将APP类的默认Window置空
	};
	
	this.getWidget = function(id){
		return uin2widget[id];
	};
	
	this.setWidget = function(id, w){
		uin2widget[id] = w;
		widgetList.push(w);
		return w;
	};
	
	this.closeWidget = function(id){
		var w = uin2widget[id];
		J.array.remove(widgetList, w);
		delete uin2widget[id];
		if(widgetList.length==0) {
			//清空动作
			//这里可以解耦合
			$E.notifyObservers(packageContext, "appExit");
		}
		return true;
	};
	
	this.closeAllWidget = function(){
		for(var i=0; i<widgetList.length; i++){
			this.closeWidget(widgetList[i].getId());
		}
		return true;
	};
		
});