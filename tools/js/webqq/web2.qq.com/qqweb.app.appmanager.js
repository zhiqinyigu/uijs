/* == QQWeb 应用管理器 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2010.04.06 ----- */

Jet().$package(qqweb.app.appManager = new qqweb.businessClass.App(qqweb.portal.getAppConfig('appManager')), function(J){
	//== qqweb.app.appManager 的局部变量声明 =======================================================================
	//------------------------------------------------------------------------------------------------------------
	var packageContext = this,
		$D = J.dom,
		$E = J.event,
		appManager_body,
		appManager_openAllButton,
		appManager_closeAllButton,
		noneSystemAppIdList=[];//非系统级APPID列表


	//== qqweb.app.appManager 的私有方法 ==========================================================================
	//------------------------------------------------------------------------------------------------------------


	var createDom = function(){
		var html = '\
			<div class="appManager_mainArea">\
				<div class="appManager_topBar">\
					<div id="appManager_openAllButton" class="appManager_openAllButton">全部开启</div>\
					<div id="appManager_closeAllButton" class="appManager_closeAllButton">全部关闭</div>\
				</div>\
				<div id="appManager_body" class="appManager_body">\
					<div id="appManager_bodyInner" class="appManager_bodyInner"></div>\
				</div>\
			</div>\
		';
		packageContext.window.setHtml(html);
		
		appManager_body_ID = $D.id("appManager_body");
		appManager_body = $D.id("appManager_bodyInner");
		appManager_closeAllButton = $D.id("appManager_closeAllButton");
		appManager_openAllButton = $D.id("appManager_openAllButton");

		$D.setStyle(appManager_body_ID,"height",packageContext.window.getBodySize().height-52);
		
	};
	
	// 创建app列表
	var createAppList = function(appList){
		noneSystemAppIdList = appList;  
		var appHtml = '\
			<div class="appManager_appItem">\
				<img class="appManager_appThumb" onerror="qqweb.util.setDefaultAppThumb(this)" src="./app/appmanager/images/thumb_<%=id%>.png" />\
				<div id="appManager_appButton_<%=id%>" class="appManager_appButton" appId="<%=id%>"></div>\
				<div class="appManager_appCenter">\
					<div class="appManager_appName"><%=title%></div>\
					<div class="appManager_appIntroduce" title="<%=introduce%>"><%=introduce%></div>\
					<div class="appManager_appInfo">\
						<span>提供者：<%=provider%></span>\
						<span>版本：<%=ver%></span>\
					</div>\
				</div>\
			</div>\
		';
		
		var htmlArray = [];
		for(var p in appList){
			var appConfig = appList[p];
			htmlArray.push(J.string.template(appHtml, appConfig));
		}
		var appListHtml = htmlArray.join("");
		appManager_body.innerHTML = appListHtml;
		
		for(var p in appList){
			var appConfig = appList[p];
			var button = $D.id("appManager_appButton_" + appConfig.id);
			if(button){
				var app = qqweb.portal.getApp("appBar");
				if(app){
					
					if(app.isInAppBar(appConfig.id)){
						$D.addClass(button, "appManager_appButton_on");
					}
				}
				$E.on(button, "click", observer.onAppButtonClick);
			}
			
		}
		
		$E.on(appManager_openAllButton, "click", observer.onaOpenAllButtonClick);
		$E.on(appManager_closeAllButton, "click", observer.onaCloseAllButtonClick);
		
		
	};
	 
	var setAppButtonOn = function(appId){   
		var button = $D.id("appManager_appButton_" + appId);
		if(button){
			$D.addClass(button, "appManager_appButton_on");			 
 		}
		 
	};
	
	var setAppButtonOff = function(appId){ 
		var button = $D.id("appManager_appButton_" + appId);
		if(button){
			$D.removeClass(button, "appManager_appButton_on");
 		}
		
	};
	//@Desperate 已废弃
	var sendGetAllAppList = function(){
		$E.notifyObservers(qqweb.rpcService, "GetAllAppListSuccess", appConfigList);
		
	};

	//== qqweb.app.appManager 的观察者方法 ========================================================================
	//------------------------------------------------------------------------------------------------------------
	
	
	
	
	
	var observer = {
		onRun : function(uin){
			createDom();
			//@Notice 已移除rpcservice方式，appConfigList以文件形式保存，不通过后台获取
			/*
			$E.addObserver(qqweb.rpcService, "GetAllAppListSuccess", observer.onGetAllAppListSuccess);
			sendGetAllAppList();
			*/
			var list=qqweb.appconfig.getAppConfig(function(cfg){
				if(cfg.appLevel && cfg.appLevel=="system")return false;
				return true;
			});
			createAppList(list);
			$E.addObserver(qqweb.app.appBar, "addAppButton", observer.onAppBarAddAppButton);
			$E.addObserver(qqweb.app.appBar, "removeAppButton", observer.onAppBarRemoveAppButton);

			$E.addObserver(this.window, "resize", observer.onAppWindowResize);
		},
		//@Desperate 已废弃
		onGetAllAppListSuccess : function(list){
			createAppList(list);
			
		},
		onAppButtonClick : function(){  
			var appId = this.getAttribute("appId");
			var app = qqweb.portal.getApp("appBar");
			if(app){
				app.toggleAppButton(appId);
			}
			packageContext.sendSetupApp();
			  
		},
		
		onaOpenAllButtonClick : function(){  
			for(var i=0;i<noneSystemAppIdList.length;++i){
				var id = noneSystemAppIdList[i];
				qqweb.app.appBar.addAppButton(id); 				 
			} 
			packageContext.sendSetupApp();
		},
		
		onaCloseAllButtonClick : function(){  
			for(var i=0;i<noneSystemAppIdList.length;++i){
				var id = noneSystemAppIdList[i]; 
				qqweb.app.appBar.removeAppButton(id);				
			}
			packageContext.sendSetupApp();
		},
		
		onAppBarAddAppButton : function(appId){ 
			setAppButtonOn(appId);
		},
		onAppBarRemoveAppButton : function(appId){
			setAppButtonOff(appId);
		},
		onAppWindowResize : function(obj){
			$D.setStyle(appManager_body_ID,"height",obj.height-52);	
		}
	};
	$E.addObserver(this, "run", observer.onRun);

   //保存app状态到服务器,appSate是json数据
	this.sendSetupApp = function( ){
		 
		/*var option = {
			//action: 'set', 
			retype : 3,
			callback : '',//parent.qqweb.layout.onSendThemeSuccess 跨域
			app:appName,
			itemlist :J.json.stringify(setupApp)
	    };
		qqweb.rpcService.sendSetConfig(option);*/	
		  
		var itemlist = '[';
		for(var i=0;i<noneSystemAppIdList.length;i++){
			var id = noneSystemAppIdList[i].id; 
			if(qqweb.app.appBar.isInAppBar(id)){
				itemlist += itemlist === '[' ? '' : ',';
				itemlist += "'"+id+"'";
			}
		}
		itemlist += ']';
	 
		var option = {						 
			retype : 3,
			callback : '',//parent.app.appmanager.sendSetupAppSuc 跨域
			app:'QQWeb',
			itemlist :J.json.stringify({setupAppList:itemlist})
	    };
		qqweb.rpcService.sendSetConfig(option);
		  
	};
	//暂不提示
	this.sendSetupAppRespone = function(data){
		 
		if(data.retcode === 0 ){
			
		}else{
			qqweb.portal.alert('设置失败，请重试！');
		}
	};
	
	//== qqweb.app.appManager 的公共方法 ==========================================================================
	//------------------------------------------------------------------------------------------------------------
	/*
	this.createWindow = function(option){

		var appContext = this;
		var window = new qqweb.businessClass.Window({
			title : this.option.title,
			modeSwitch : true,
			dragable : true,
			resize : true,
			width: 600,
			height: 500,
			hasCloseButton : true,
			hasMaxButton : true,
			hasMinButton : true,
			hasOkButton : true,
			hasCancelButton : true
		});
		
		this.window = window;
		
		var observer = {
			onWindowClose : function(){
				appContext.destroy();
			},
			onExit : function(){
				window.close();
			}
		};
		$E.addObserver(window, "close", observer.onWindowClose);
		$E.addObserver(this, "exit", observer.onExit);
		return window;
	};
	*/


});
		

