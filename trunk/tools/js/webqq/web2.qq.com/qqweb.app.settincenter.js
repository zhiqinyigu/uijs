/* == QQWeb 设置中心 =============================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2010.04.14 ----- */
 
 

/*{
	id : "settingCenter",
	title : "设置中心"
});
*/
Jet().$package(qqweb.app.settingCenter = new qqweb.businessClass.App(qqweb.portal.getAppConfig('settingCenter')), function(J){
	//== qqweb.app.settingCenter 的局部变量声明 =======================================================================
	//------------------------------------------------------------------------------------------------------------
	var $D = J.dom,
		$E = J.event,
		packageContext = this;
		
		
	//== qqweb.app.settingCenter 的私有方法 ==========================================================================
	//------------------------------------------------------------------------------------------------------------
	
	

	
	//== qqweb.app.settingCenter 的观察者方法 ========================================================================
	//------------------------------------------------------------------------------------------------------------
	
	
	
	var observer = {
		onRunFirst : function(uin){

			var html = '\
				<div class="settingCenter_area">\
					<div class="settingCenter_globalSettingHead">全局设置</div>\
					<div id="settingCenter_globalSettingBody" class="settingCenter_globalSettingBody">\
						<a class="settingCenter_settingButton" appId="themeSetting" href="###">\
							<div class="settingButton_icon"></div>\
							<div class="settingButton_text">主题</div>\
						</a>\
						<a class="settingCenter_settingButton" style="display:none" appId="wallpaperSetting" href="###">\
							<div class="settingButton_icon"></div>\
							<div class="settingButton_text">壁纸</div>\
						</a>\
						<a class="settingCenter_settingButton" appId="appManager" href="###">\
							<div class="settingButton_icon"></div>\
							<div class="settingButton_text">应用管理</div>\
						</a>\
						<a class="settingCenter_settingButton" style="display:none" appId="wallpaperSetting" href="###">\
							<div class="settingButton_icon"></div>\
							<div class="settingButton_text">性能</div>\
						</a>\
						<a class="settingCenter_settingButton" style="display:none" appId="wallpaperSetting" href="###">\
							<div class="settingButton_icon"></div>\
							<div class="settingButton_text">快捷键</div>\
						</a>\
					</div>\
					<div class="settingCenter_appSettingHead" style="display:none">聊天设置</div>\
					<div id="settingCenter_appSettingBody" style="display:none" class="settingCenter_appSettingBody">\
						<a class="settingCenter_settingButton" appId="qqSetting" href="###">\
							<div class="settingButton_icon"></div>\
							<div class="settingButton_text">消息</div>\
						</a>\
						<a class="settingCenter_settingButton" appId="musicSetting" href="###">\
							<div class="settingButton_icon"></div>\
							<div class="settingButton_text">声音</div>\
						</a>\
						<a class="settingCenter_settingButton" appId="musicSetting" href="###">\
							<div class="settingButton_icon"></div>\
							<div class="settingButton_text">安全</div>\
						</a>\
					</div>\
				</div>\
			';

			this.window.setHtml(html);
			

			var globalSettingBody = $D.id("settingCenter_globalSettingBody");
			var appSettingBody = $D.id("settingCenter_appSettingBody");
			 
			$E.on(globalSettingBody, "click", observer.onGlobalSettingBodyClick);
			$E.on(appSettingBody, "click", observer.onAppSettingBodyClick);
			 

		},
	
		onGlobalSettingBodyClick : function(e){
			var appId = $D.getAttributeByParent("appId", e.target, this);
			if(appId){
				qqweb.portal.runApp(appId);
			}
			
			
		},
		
		onAppSettingBodyClick : function(e){
			var appId = $D.getAttributeByParent("appId", e.target, this);
			if(appId){
				qqweb.portal.runApp(appId);
			}
		},
		 
		onOkButtonClick : function(){

		}
	};
	
	$E.addObserver(this, "runFirst", observer.onRunFirst);
	
	
	//== qqweb.app.settingCenter 的公共方法 ==========================================================================
	//------------------------------------------------------------------------------------------------------------
	

	
	
	
	
	


});
		

