/* == QQWeb 我的面板 ========================================
 * Copyright (c) 2009, Tencent.com All rights reserved.
 * version: 1.0
 * -------------------------------------------- 2010.03.27 ----- */
 


/*{
	id : "myPanel",
	title : "我的面板",
	windowMode : "none"
});
*/
Jet().$package(qqweb.app.myPanel = new qqweb.businessClass.App(qqweb.portal.getAppConfig('myPanel')), function (J) {
    //== qqweb.app.myPanel 的局部变量声明 =======================================================================
    //------------------------------------------------------------------------------------------------------------
    var packageContext = this,
		$D = J.dom,
		$E = J.event,
		desktopEl = qqweb.layout.getDesktop().body,
		qqBarEl = qqweb.layout.getPanel("qqBar").body;

    /*我的面板*/
    var EQQ_MyPanel,
		EQQ_MyAvatar,
		EQQ_MyNick,
		EQQ_MyState,
		EQQ_MyStateShow,
		EQQ_LoginNode,
		EQQ_NotLoginNode,
		EQQ_MySignature,
		EQQ_qZoneButton,
		EQQ_MySignature_input,
		EQQ_MyPanel_ExitButton;
		
	//保存数据
	var _signature="";


    //== qqweb.app.myPanel 的私有方法 ==========================================================================
    //------------------------------------------------------------------------------------------------------------

    var createMyPanelDom = function (user) {
        var node = $D.node("div", {
            id: "EQQ_MyPanel",
            "class": "EQQ_myPanel"
        });

        var html = '\
					<img id="EQQ_MyAvatar" class="EQQ_myAvatar" uin=' + user.uin + ' src="' + qqweb.util.getUserAvatar(user.uin) + '" />\
					<div class="EQQ_myInfo">\
						<div id="EQQ_MyState" class="EQQ_myState" title="我的状态">\
							<div id="EQQ_MyStateShow" class="EQQ_myStateShow EQQ_offline">状态</div>\
							<div class="EQQ_myStateDown">下</div>\
						</div>\
						<div id="EQQ_MyNick" class="EQQ_myNick" title="<%=uin%>"><%=uin%></div>\
						<!--div id="EQQ_MyPanel_ExitButton" title="退出">退出</div-->\
					</div>\
					<div id="EQQ_myService" class="EQQ_myService">\
						<a id="EQQ_qZoneButton" class="EQQ_qZoneButton" title="QQ空间" hidefocus href="###"></a>\
						<!--a id="EQQ_qqMailButton" class="EQQ_qqMailButton" title="QQ邮箱" hidefocus target="_blank" href="http://mail.qq.com/cgi-bin/login?fun=passport&from=webqq"></a>\
						<a id="EQQ_sosoButton" class="EQQ_sosoButton" title="搜搜" hidefocus target="_blank" href="http://soso.qq.com/q?bid=200"></a>\
						<a id="EQQ_qqVipButton" class="EQQ_qqVipButton" title="QQ Vip 会员" hidefocus target="_blank" href="http://vip.qq.com/"></a-->\
						<a href="###" id="EQQ_MySignature" class="EQQ_mySignature" title=""></a>\
						<input type="text" id="EQQ_mySignature_input" title="按ESC取消编辑" maxLength="50" />\
					</div>\
					';

        if (isNaN(user.uin)) {//TODO 
            user.uin = "请登录";
        }
        html = J.string.template(html, user);
        node.innerHTML = html;
		
        qqBarEl.innerHTML = '';
        qqBarEl.appendChild(node);
		EQQ_LoginNode = node;
		//melody 先隐藏
		EQQ_LoginNode.style.display = "none";
		
		var node2 = $D.node("div", {
			"class" : "EQQ_myPanel_noLogin"
		});
		var html2='<div style="float: right; margin-top: 12px; margin-right: 50px;">欢迎您，请<a href="###" id="qqbar_login_link">登录</a></div><img src="style/images/avatar.png"/>';
		node2.innerHTML = "";//html2;
		qqBarEl.appendChild(node2);
		EQQ_NotLoginNode = node2;
		EQQ_MySignature = $D.id("EQQ_MySignature");
		EQQ_MySignature_input = $D.id("EQQ_mySignature_input");
		$E.on(EQQ_MySignature,"click",observer.onSignatureClicked);
		//$E.on($D.id("qqbar_login_link"),"click",observer.onLoginButtonClicked);
		
		
        /*我的面板*/
        EQQ_MyPanel = $D.id("EQQ_MyPanel");
        EQQ_MyAvatar = $D.id("EQQ_MyAvatar");
        EQQ_MyNick = $D.id("EQQ_MyNick");
        EQQ_MyState = $D.id("EQQ_MyState");
        EQQ_MyStateShow = $D.id("EQQ_MyStateShow");
        EQQ_MyPanel_ExitButton = $D.id("EQQ_MyPanel_ExitButton");
		EQQ_qZoneButton = $D.id("EQQ_qZoneButton");

        $E.on(EQQ_MyAvatar, "click", observer.onMyPanelMyAvatarClick);
        $E.on(EQQ_qZoneButton, "click", observer.onQZoneButtonClick);
        $E.on(EQQ_MyPanel_ExitButton, "click", observer.onMyPanelExitButtonClick);


    };

	var updateMySignature = function(signature){
		_signature=signature;
		if(!signature){
			signature = "点击编辑签名";
		}
		EQQ_MySignature.innerHTML = J.string.cutByBytes(J.string.toHtml(signature), 15);
		EQQ_MySignature.title = J.string.toTitle(signature);
		EQQ_MySignature_input.value="";
	};

    // 更新自己的信息
    var updateSelfInfoChange = function (user) {
        EQQ_MyAvatar.src = qqweb.util.getUserAvatar(user.uin);
        EQQ_MyNick.innerHTML = user.htmlNick;
        EQQ_MyNick.title = user.titleNick + "<" + user.uin + ">";
    };


    //== qqweb.app.myPanel 的观察者方法 ========================================================================
    //------------------------------------------------------------------------------------------------------------



    var observer = {
        onRun: function (uin) {
            qqweb.portal.self = {
                uin: qqweb.portal.getCookieUin()
            };


            createMyPanelDom(qqweb.portal.self);

            $E.addObserver(qqweb.rpcService, "GetLoginInfoSuccess", observer.onGetLoginInfoSuccess);
            $E.addObserver(qqweb.rpcService, "GetLoginInfoError", observer.onGetLoginInfoError);
			qqweb.rpcService.sendGetLoginInfo(qqweb.portal.self.uin);
			//setTimeout(function () { qqweb.rpcService.sendGetLoginInfo(qqweb.portal.self.uin); }, 100);
			qqweb.rpcService.send(qqweb.CONST.API_SERVER_URL +"get_single_long_nick",{
				context:packageContext,
				method : "GET",
				data : {tuin:qqweb.portal.self.uin},//参数
				arguments : {tuin:qqweb.portal.self.uin},
				onSuccess: function(data){
					if(data.retcode === 0){
						var tmp="";
						if(data.result.length!=0){
							tmp=data.result[0].lnick;
						}
						updateMySignature(tmp);
					}else{
						J.out("[sendGetSelfSignature] error: " + data.retcode + "-" + data.errmsg);
					}
				}
			});
        },
        /*
		onRunAgain: function(){//BAD SMELL
            qqweb.portal.self = {
                uin: qqweb.portal.getCookieUin()
            };
			//setTimeout(function () { qqweb.rpcService.sendGetLoginInfo(qqweb.portal.self.uin); }, 100);
			qqweb.rpcService.sendGetLoginInfo(qqweb.portal.self.uin);
		},
*/

        // 获取用户信息成功后。。。
        onGetLoginInfoSuccess: function (data) {
			$D.hide(EQQ_NotLoginNode);
			$D.show(EQQ_LoginNode);
            var uin = data.arguments.uin;
            var result = data.result;
            if (qqweb.portal.self.uin === uin) {
                var oneUser = result;
                qqweb.portal.self.allow = oneUser.allow;
                qqweb.portal.self.age = oneUser.age;
                qqweb.portal.self.nick = oneUser.nick;
                qqweb.portal.self.htmlNick = J.string.toHtml(oneUser.nick);
                qqweb.portal.self.titleNick = J.string.toTitle(oneUser.nick);
                qqweb.portal.self.country = oneUser.country;
                qqweb.portal.self.province = oneUser.province;
                qqweb.portal.self.city = oneUser.city;
                qqweb.portal.self.gender = oneUser.gender;
                qqweb.portal.self.face = oneUser.face;
            }
            qqweb.portal.setIsLoginSuccess(true);
            
            $E.notifyObservers(qqweb.portal, "selfInfoReady", qqweb.portal.self);
			
            updateSelfInfoChange(qqweb.portal.self);


        },
        //获取用户本人信息失败，未有登录态
        onGetLoginInfoError: function () {
			$D.hide(EQQ_LoginNode);
			$D.show(EQQ_NotLoginNode);
			
        },
        onNeedLogin: function (arg) {
            alert("need login");
        },
        onMyPanelMyAvatarClick: function () {
            var uin = parseInt(this.getAttribute("uin"), 10);
            qqweb.portal.runApp("userDetails", uin);
        },
        onQZoneButtonClick: function () {
            qqweb.portal.runApp("qZone");
        },

        onMyPanelExitButtonClick: function () {
            qqweb.portal.exit();
            $E.notifyObservers(qqweb.portal, "Exit");
        },
		onLoginButtonClicked: function(){
			qqweb.portal.showLoginWindow();
		},
		onSignatureClicked : function(){
			packageContext.toggleSignatureToEditor();
		},
		onSignatureKeyDown:function(e){
			switch(e.keyCode){
				case 13:
					packageContext.confirmSignatureEdit();
					break;
				case 27: // ESC
					packageContext.cancelSignatureEdit();
				default://do nothing
					
			}
		},
		onSignatureCancel:function(){
		
		},
		onSignatureBlur: function(){
			packageContext.confirmSignatureEdit();
		},
        // 处理逻辑
		
        onWdinwoClose: function (window) {
            packageContext.closeWindow(window.uin);
        }



    };

    $E.addObserver(this, "run", observer.onRun);
    //$E.addObserver(this, "runAgain", observer.onRunAgain);
    $E.addObserver(this, "needLogin", observer.onNeedLogin);

    //== qqweb.app.myPanel 的公共方法 ==========================================================================
    //------------------------------------------------------------------------------------------------------------

	this.toggleSignatureToEditor = function(){
		$E.on(EQQ_MySignature_input,"keydown",observer.onSignatureKeyDown);
		$E.on(EQQ_MySignature_input,"blur",observer.onSignatureBlur);
		$D.hide(EQQ_MySignature);
		$D.show(EQQ_MySignature_input);
		EQQ_MySignature_input.value=_signature;
		EQQ_MySignature_input.focus();
		EQQ_MySignature_input.select();
	};
	this.toggleSignatureToShow = function(){
		$E.off(EQQ_MySignature_input,"keydown",observer.onSignatureKeyDown);
		$E.off(EQQ_MySignature_input,"blur",observer.onSignatureBlur);
		$D.hide(EQQ_MySignature_input);
		$D.show(EQQ_MySignature);
	};
	this.cancelSignatureEdit = function(){
		this.toggleSignatureToShow();
	};
	this.confirmSignatureEdit = function(){
		this.toggleSignatureToShow();
		if(EQQ_MySignature_input.value==_signature)return;
		//EQQ_MySignature.innerHTML=J.string.toHtml(EQQ_MySignature_input.value);
		EQQ_MySignature.title=J.string.toTitle("签名更新中:"+EQQ_MySignature_input.value);
		//TODO submit it!
		this.sendSetSignatuer(EQQ_MySignature_input.value);
	};
	
    this.getWindow = function (uin) {
        return uin2window[uin];
    };

    this.setWindow = function (uin, window) {
        uin2window[uin] = window;
        windowList.push(window);
        window.uin = uin;
        return window;
    };

    this.closeWindow = function (uin) {
        var window = uin2window[uin];
        J.array.remove(windowList, window);
        delete uin2window[uin];
        return true;
    };

    this.closeAllWindow = function () {
        for (var i = 0; i < windowList.length; i++) {
            this.closeWindow(windowList[i].uin);
        }
        return true;
    };

	this.sendSetSignatuer = function(signature){
		var sender = qqweb.rpcService.send(qqweb.CONST.API_SERVER_URL +"set_long_nick",{
				context:packageContext,
				method : "GET",
				data : {nlk:signature},//参数
				arguments : {nlk:signature},
				onSuccess: function(data){
					if(data.retcode === 0){
						packageContext.onSetSelfSignatureSuccess(signature);
					}else{
						alert('签名修改失败');
						J.out("[sendSetSelfSignature] error: " + data.retcode + "-" + data.errmsg);
					}
				}
			});
		
	};
	this.onSetSelfSignatureSuccess=function(signature){
		//update
		updateMySignature(signature);
		if(qqweb.app.mySignature){
			qqweb.app.mySignature.updateSignature(signature);
		}
	};
	
});
		

