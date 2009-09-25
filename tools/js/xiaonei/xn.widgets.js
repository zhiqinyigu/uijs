if(XN.WIDEGETS)XN.WIDGETS = null;
XN.WIDGETS = XN.Widgets ={};
XN.WIDGETS.navBar = {
	menu:null,
	upBar:'navMenuScrollUp',
	downBar:'navMenuScrollDown',
	showAppNum:15,
	allApps:'navMenuAllApps',
	searchInput:'navSearchInput',
	allAppsTop:null,
	canScrollUp:false,
	canScrollDown:false,
	scrollSpeed:1,
	scrollStep:3,
	scrollTimer:null,
	initAppMenu:function(){
		if(!$('showAppMenu'))return;
		if(!$('navMyApps'))return;
		var myApps = $('navMyApps');

		myApps.show();

		var showMenuBar = $('showAppMenu');
		var baseWidth = 133;

		var menu = this.menu = new XN.UI.menu({
			bar:'showAppMenu',
			menu:'appMenu',
			fireOn:'mouseover'
		});

		var allApps = $('navAllApps');

		allApps.hide();

		if(!$('navShowAllApp'))return;

		var showAllBar = $('navShowAllApp');


		if(XN.BROWSER.IE){
			var appUls = allApps.getElementsByTagName('ul').length;
			if(appUls > 1){
				allApps.setStyle('width:' + (appUls * baseWidth + 3) + 'px');
			}
		}

		showAllBar.onclick = function(e){
			e = e || window.event;
			XN.EVENT.stop(e);
			menu.isShow = false;
			menu.frame.onmousemove = function(){
				menu.isShow = false;
			}
			myApps.hide();
			allApps.show();
			if (XN.BROWSER.IE){
				if(appUls > 1){
					menu.setWidth(271 + (appUls - 1) * baseWidth);
				}
			}
		}

		XN.EVENT.addEvent(document,'click',function(){
			menu.frame.onmousemove = null;
			menu.isShow = true;
			menu.hide();
			myApps.show();
			allApps.hide();
			if (XN.BROWSER.IE){
				if(appUls > 1){
					menu.setWidth(269);
				}
			}
		},false);

	},
	initSearch:function(){
		if(!$(this.searchInput))return;
		new XN.UI.friendSearchBar({
			input:this.searchInput,
			submit:$('navSearchSubmit'),
			form:$('globalSearchForm')
		});

		new XN.UI.menu({
			bar:'searchMenuAction',
			menu:'searchdropdownMenu',
			fireOn:'mouseover'
		});
	},
	initSettingMenu:function(){
		if ( !$( 'optionMenuActive' ) )return;
		new XN.UI.menu({
			bar:'optionMenuActive',
			menu:'optiondropdownMenu',
			fireOn:'mouseover'
		});
	},
	init:function(){
		this.initAppMenu();
		this.initSettingMenu();
		this.initSearch();
	}
};
//XN.DOM.readyDo(function(){
//	if($('publisherModule')){
//		XN.Widgets.publisher.init();
//	}
//});
XN.DOM.readyDo(function(){
	if($('showAppMenu')){
		XN.Widgets.navBar.init();
	}
});