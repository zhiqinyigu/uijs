(function() {
    var a = YAHOO.util.Dom,
    b = YAHOO.util.Event;
    WEBQQ.namespace("WEBQQ.cls");
    WEBQQ.cls.AddBuddy = function(c) {
        this._id = c;
        this._qqclient = WEBQQ.obj.QQClient;
        this._lastSearch = null;
        this._page = 0;
        this._lastResults = {};
        this._search_buddy_by_account_tabhead_node = a.get(this._id + "_search_buddy_by_account_tabhead");
        this._search_buddy_by_nick_tabhead_node = a.get(this._id + "_search_buddy_by_nick_tabhead");
        this._search_buddy_by_account_node = a.get(this._id + "_search_buddy_by_account");
        this._search_buddy_by_nick_node = a.get(this._id + "_search_buddy_by_nick");
        this._account_input_node = a.get(this._id + "_account_input");
        b.on(this._account_input_node, "keydown", this.keydownSearchByAccount, this, true);
        this._account_search_button_node = a.get(this._id + "_account_search_button");
        b.on(this._account_search_button_node, "click", this.clickSearchByAccount, this, true);
        this._nick_input_node = a.get(this._id + "_nick_input");
        b.on(this._nick_input_node, "keydown", this.keydownSearchByNick, this, true);
        this._nick_search_button_node = a.get(this._id + "_nick_search_button");
        b.on(this._nick_search_button_node, "click", this.clickSearchByNick, this, true);
        this._search_result_node = a.get(this._id + "_search_result");
        this._search_buddy_turnpage_node = a.get(this._id + "_search_buddy_turnpage");
        this._current_pagenum_node = a.get(this._id + "_current_pagenum");
        this._prevpage_node = a.get(this._id + "_prevpage");
        this._nextpage_node = a.get(this._id + "_nextpage");
        this.searchModeTabs = new WEBQQ.cls.Tab();
        this.searchModeTabs.add({
            trigger: this._search_buddy_by_account_tabhead_node,
            sheet: this._search_buddy_by_account_node
        });
        this.searchModeTabs.add({
            trigger: this._search_buddy_by_nick_tabhead_node,
            sheet: this._search_buddy_by_nick_node
        });
        this.searchModeTabs.config.triggerEvent = "click";
        this.searchModeTabs.config.slideEnabled = false;
        this.searchModeTabs.onShow.subscribe(function(e, d) {
            var f = WEBQQ.obj.QQClient.mainPanel.addBuddy;
            f._search_result_node.innerHTML = "";
            switch (d[0].trigger) {
            case f._search_buddy_by_account_tabhead_node:
                a.replaceClass(f._search_buddy_turnpage_node, "turn_page_in_search_result", "no_turn_page_in_search_result");
                f._account_input_node.focus();
                f._account_input_node.select();
                break;
            case f._search_buddy_by_nick_tabhead_node:
                a.replaceClass(f._search_buddy_turnpage_node, "turn_page_in_search_result", "no_turn_page_in_search_result");
                b.removeListener(this._prevpage_node, "click");
                b.removeListener(this._nextpage_node, "click");
                a.replaceClass(this._prevpage_node, "prevpage", "disable");
                a.replaceClass(this._nextpage_node, "nextpage", "disable");
                f._nick_input_node.focus();
                f._nick_input_node.select();
                break
            }
        });
        this.searchModeTabs.init()
    };
    WEBQQ.cls.AddBuddy.prototype = {
        keydownSearchByAccount: function(d) {
            var c = b.getCharCode(d) || 0;
            if (c == 13) {
                this._lastSearch = this.searchByAccount;
                this.searchByAccount()
            }
        },
        clickSearchByAccount: function() {
            this._lastSearch = this.searchByAccount;
            this.searchByAccount()
        },
        keydownSearchByNick: function(d) {
            var c = b.getCharCode(d) || 0;
            if (c == 13) {
                this._lastSearch = this.searchByNick;
                this.searchByNick(0)
            }
        },
        clickSearchByNick: function() {
            this._lastSearch = this.searchByNick;
            this.searchByNick(0)
        },
        searchByAccount: function() {
            var c = this._account_input_node.value;
            this._page = 0;
            var d = /^([1-9]\d{4,9})$/;
            if (d.test(c)) {
                this._current_pagenum_node.innerHTML = "1";
                this.searchBuddy(3, [c])
            } else {
                alert("请正确输入QQ号码")
            }
        },
        searchByNick: function(d) {
            this._page = d || 0;
            this._current_pagenum_node.innerHTML = String(this._page + 1);
            var c = String(this._nick_input_node.value);
            if (c == "") {
                alert("请输入QQ昵称")
            } else {
                this.searchBuddy(1, [d, encodeURIComponent(c)])
            }
        },
        turnNextPage: function() {
            this._lastSearch(this._page + 1)
        },
        turnPrevPage: function() {
            if (this._page > 0) {
                this._lastSearch(this._page - 1)
            }
        },
        searchBuddy: function(f, h) {
            var e = '<div class="result_title"><div class="loading">载入中...</div></div>';
            this._search_result_node.innerHTML = e;
            a.replaceClass(this._search_buddy_turnpage_node, "turn_page_in_search_result", "no_turn_page_in_search_result");
            var c = this,
            g = {
                onSuccess: c.handleSearchCallback ||
                function() {},
                onFail: function() {
                    this._search_result_node.innerHTML = '<div class="result_title"><div class="loading">查询失败！</div></div>'
                },
                sscope: c,
                fscope: c,
                arguments: {
                    info: {
                        sub_cmd: f
                    }
                },
                cmd: "0115",
                body: c._qqclient.cs.cs0x0115(f, h)
            };
            var d = this._qqclient.getCmdInfo(g);
            YAHOO.log("searchBuddy:" + d)
        },
        handleSearchCallback: function(d) {
            var e = d.params;
            var c = parseInt(e[4]);
            if (c == 0) {
                if (e.length > 6) {
                    this.updateSearchResult(e)
                } else {
                    this.updateNoSearchResult(e)
                }
            } else {
                this.updateNoSearchResult(e)
            }
        },
        updateSearchResult: function(e) {
            var f = parseInt(e[3]);
            this._lastResults = {};
            var h = '<div class="result_title"><div>查找结果:</div></div>';
            var j = 0;
            for (var g = 5; g < e.length - 1; g = g + 5) {
                var d = e[g],
                c = decodeURIComponent(e[g + 1]),
                l = parseInt(e[g + 2]),
                k = parseInt(e[g + 3]),
                n = decodeURIComponent(e[g + 4]);
                this._lastResults[d] = {
                    nick: c,
                    face: l,
                    flag: k,
                    location: n
                };
                h += '<div class="one_user">						<div class="user_info">							<img class="avatar_icon" src="' + face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this._qqclient.uin + "&uin=" + d + '" />							<a id="AddBuddy_ex_user_details_button_' + d + '" class="show_user_details_button" href="#" uin="' + d + '" flag="' + k + '" title="显示"><span class="more_details">*</span>详细资料</a>							<a id="AddBuddy_add_button_' + d + '" class="add_button" href="#" uin="' + d + '" flag="' + k + '"><span class="button_icon add_buddy_icon">+</span>加为好友</a>							<div class="nameField">								<span class="name">' + String(c).forHtml() + "&lt;" + d + '&gt;</span>								<a class="qzone_icon" href="' + qzone_user_server_domain + "/" + d + '" target="_blank" title="打开QQ空间">Qzone</a>							</div>							<span class="location">来自:&nbsp;' + n + '</span>						</div>						<div id="AddBuddy_user_details_' + d + '" class="user_details"></div>					</div>';
                b.on("AddBuddy_add_button_" + d, "click", this.clickAddBuddyButton, this);
                b.on("AddBuddy_ex_user_details_button_" + d, "click", this.clickOpenUserDetailsButton, this);
                j++
            }
            this._search_result_node.innerHTML = h;
            a.replaceClass(this._search_buddy_turnpage_node, "no_turn_page_in_search_result", "turn_page_in_search_result");
            b.removeListener(this._prevpage_node, "click");
            b.removeListener(this._nextpage_node, "click");
            if (this._page === 0) {
                a.replaceClass(this._prevpage_node, "prevpage", "disable")
            } else {
                a.replaceClass(this._prevpage_node, "disable", "prevpage");
                b.on(this._prevpage_node, "click", this.turnPrevPage, this, true)
            }
            if (f == "3") {
                a.replaceClass(this._nextpage_node, "nextpage", "disable")
            } else {
                a.replaceClass(this._nextpage_node, "disable", "nextpage");
                b.on(this._nextpage_node, "click", this.turnNextPage, this, true)
            }
            if (j == 1 && this._page === 0) {
                var d = e[5];
                var o = this,
                m = {
                    onSuccess: function(i) {
                        var p = String(i.params[3]);
                        p = p.split("\x1e");
                        var q = o._qqclient.parseUserDetails(p);
                        o.setUserDetailsInSearchResult(q)
                    },
                    onFail: function(i) {
                        alert("获取查找好友的资料信息失败")
                    },
                    sscope: o,
                    fscope: o,
                    arguments: {}
                };
                a.get("AddBuddy_ex_user_details_button_" + d).style.visibility = "hidden";
                a.replaceClass(this, "show_user_details_button", "hide_user_details_button");
                if (a.get("AddBuddy_user_details_" + d).innerHTML == "") {
                    a.get("AddBuddy_user_details_" + d).innerHTML = this._qqclient.mainPanel._WebApp_loading_node.innerHTML;
                    this._qqclient.getUserDetails(d, m)
                }
                this.showUserDetailsInSearchResult(d)
            }
        },
        updateNoSearchResult: function(e) {
            this._lastResults = {};
            var d = "prevpage";
            if (this._page === 0) {
                d = "disable"
            }
            var c = '<div class="result_title">暂无查找结果!</div>';
            this._search_result_node.innerHTML = c;
            a.replaceClass(this._search_buddy_turnpage_node, "no_turn_page_in_search_result", "turn_page_in_search_result");
            b.removeListener(this._prevpage_node, "click");
            b.removeListener(this._nextpage_node, "click");
            if (this._page === 0) {
                a.replaceClass(this._prevpage_node, "prevpage", "disable")
            } else {
                a.replaceClass(this._prevpage_node, "disable", "prevpage");
                b.on(this._prevpage_node, "click", this.turnPrevPage, this, true)
            }
            a.replaceClass(this._nextpage_node, "nextpage", "disable")
        },
        openCantAddYourself: function() {
            this._addBuddyAlertBox_node = document.createElement("div");
            a.addClass(this._addBuddyAlertBox_node, "alertBox");
            var g = 0;
            var e = "",
            f = "",
            d = "",
            c = "";
            f = '<div id="alertCloseButton_1" class="alertCloseButton_1">X</div>			<div class="alertTitle_1">添加好友</div>			<div class="alertMsgTitle_1">				<img id="userAvatar" class="userAvatar" src="' + face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this._qqclient.uin + "&uin=" + this._qqclient.uin + '" /><p class="titleText">不能添加自己为好友！</p>			</div>			<div class="alertMsgContent_1">				<p></p>			</div>			<div class="buttonGroup_1">				<button id="alertCloseButton_2" class="button_1">关 闭</button>			</div>';
            e = f + d + c;
            this._addBuddyAlertBox_node.innerHTML = e;
            this._qqclient.mainPanel._sysbox_node.appendChild(this._addBuddyAlertBox_node);
            this._qqclient.mainPanel.mf_openSysBox();
            a.get("alertCloseButton_2").focus();
            b.on(a.get("alertCloseButton_1"), "click", this.closeAddBuddyWin, this, true);
            b.on(a.get("alertCloseButton_2"), "click", this.closeAddBuddyWin, this, true)
        },
        openOppositeIsYourBuddy: function(h) {
            var c = this._qqclient.bdylist.allUsers[h];
            this._addBuddyAlertBox_node = document.createElement("div");
            a.addClass(this._addBuddyAlertBox_node, "alertBox");
            var i = 0;
            var f = "",
            g = "",
            e = "",
            d = "";
            g = '<div id="alertCloseButton_1" class="alertCloseButton_1">X</div>			<div class="alertTitle_1">添加好友</div>			<div class="alertMsgTitle_1">				<img id="userAvatar" class="userAvatar" src="' + face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this._qqclient.uin + "&uin=" + h + '" /><p class="titleText">' + String(this._lastResults[h].nick).forHtml() + "<" + h + ">已经在您的【" + String(this._qqclient.bdylist.groups[c.group_id].name).forHtml() + '】组中！</p>			</div>			<div class="alertMsgContent_1">				<p></p>			</div>			<div class="buttonGroup_1">				<button id="alertCloseButton_2" class="button_1">关 闭</button>			</div>';
            f = g + e + d;
            this._addBuddyAlertBox_node.innerHTML = f;
            this._qqclient.mainPanel._sysbox_node.appendChild(this._addBuddyAlertBox_node);
            this._qqclient.mainPanel.mf_openSysBox();
            a.get("alertCloseButton_2").focus();
            b.on(a.get("alertCloseButton_1"), "click", this.closeAddBuddyWin, this, true);
            b.on(a.get("alertCloseButton_2"), "click", this.closeAddBuddyWin, this, true)
        },
        openAddBuddyWin: function(g) {
            this._addBuddyAlertBox_node = document.createElement("div");
            a.addClass(this._addBuddyAlertBox_node, "alertBox");
            var h = 0;
            var e = "",
            f = "",
            d = "",
            c = "";
            f = '<div id="alertCloseButton_1" class="alertCloseButton_1">X</div>			<div class="alertTitle_1">添加好友</div>			<div class="alertMsgTitle_1">				<img id="userAvatar" class="userAvatar" src="' + face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this._qqclient.uin + "&uin=" + g + '" /><p class="titleText">您将添加' + String(this._lastResults[g].nick).forHtml() + "<" + g + '>为好友!</p>			</div>			<div class="alertMsgContent_1">				<div id="alertMsgContent_connection"></div>				<div id="alertMsgContent_option"></div>			</div>			<div class="buttonGroup_1">				<button id="alertOkButton" class="button_1 disable" uin="' + g + '" >确 定</button>				<button id="alertCloseButton_2" class="button_1">关 闭</button>			</div>';
            e = f + d + c;
            this._addBuddyAlertBox_node.innerHTML = e;
            this._qqclient.mainPanel._sysbox_node.appendChild(this._addBuddyAlertBox_node);
            this._qqclient.mainPanel.mf_openSysBox();
            b.on(a.get("alertCloseButton_1"), "click", this.closeAddBuddyWin, this, true);
            b.on(a.get("alertCloseButton_2"), "click", this.closeAddBuddyWin, this, true);
            a.get("alertCloseButton_2").focus()
        },
        addToMyBuddy: function(c) {
            if (c == this._qqclient.uin) {
                this.openCantAddYourself()
            } else {
                if (this._qqclient.isFriend(c) != -1) {
                    this.openOppositeIsYourBuddy(c)
                } else {
                    this.openAddBuddyWin(c);
                    a.get("alertMsgContent_connection").innerHTML = '<div class="loading_2">查询用户设置...</div>';
                    var d = this.queryBuddySetting(c);
                    a.get("alertMsgContent_connection").setAttribute("seq", d[0])
                }
            }
        },
        clickAddBuddyButton: function(c, e) {
            var d = parseInt(this.getAttribute("uin"));
            e.addToMyBuddy(d)
        },
        clickOpenUserDetailsButton: function(f, e) {
            b.stopEvent(f);
            var c = e,
            g = {
                scope: this,
                onSuccess: function(h) {
                    var i = String(h.params[3]);
                    i = i.split("\x1e");
                    var j = this._qqclient.parseUserDetails(i);
                    this.setUserDetailsInSearchResult(j)
                },
                onFail: function() {},
                sscope: c,
                fscope: c,
                arguments: {}
            };
            var d = this.getAttribute("uin");
            if (this.getAttribute("title") == "显示") {
                this.setAttribute("title", "隐藏");
                a.replaceClass(this, "show_user_details_button", "hide_user_details_button");
                if (a.get("AddBuddy_user_details_" + d).innerHTML == "") {
                    a.get("AddBuddy_user_details_" + d).innerHTML = e._qqclient.mainPanel._WebApp_loading_node.innerHTML;
                    e._qqclient.getUserDetails(d, g)
                }
                e.showUserDetailsInSearchResult(d)
            } else {
                this.setAttribute("title", "显示");
                a.replaceClass(this, "hide_user_details_button", "show_user_details_button");
                e.hideUserDetailsInSearchResult(d)
            }
        },
        setUserDetailsInSearchResult: function(d) {
            var c = '<div class="user_details_in_search_results"><div class="user_sex">性别:&nbsp;' + d.sex + '</div><div class="user_age">年龄:&nbsp;' + d.age + "</div><div>来自:&nbsp;" + d.country + "/" + d.province + "/" + d.cityNo + "</div></div>					<div>个人主页:&nbsp;" + d.homepageLink + "</div>					<div>个人说明:&nbsp;" + d.perInfo + "</div>";
            if (a.get("AddBuddy_user_details_" + d.uin)) {
                a.get("AddBuddy_user_details_" + d.uin).innerHTML = c
            }
        },
        showUserDetailsInSearchResult: function(c) {
            a.get("AddBuddy_user_details_" + c).style.display = "block"
        },
        hideUserDetailsInSearchResult: function(c) {
            a.get("AddBuddy_user_details_" + c).style.display = "none"
        },
        queryBuddySetting: function(d) {
            var c = this,
            e = {
                onSuccess: function(g) {
                    c._qqclient.mainPanel.addBuddy.addOneBuddy(g.params)
                },
                onFail: function() {
                    a.get("alertMsgContent_connection").innerHTML = "<div>操作超时，请稍候再试!</div>"
                },
                sscope: c,
                fscope: c,
                arguments: {
                    info: {}
                },
                cmd: "a7",
                body: c._qqclient.cs.cs0xa7(d)
            };
            var f = this._qqclient.getCmdInfo(e);
            YAHOO.log("queryBuddySetting:" + f);
            return f
        },
        addOneBuddy: function(f) {
            var d = parseInt(f[3]),
            c = parseInt(f[4]);
            switch (c) {
            case 0:
                var e = parseInt(f[5]);
                switch (e) {
                case 0:
                    this.setBeAllowAddOppositeInfo(d);
                    break;
                case 1:
                    this.setNeedlVerifyInfo(d);
                    break;
                case 2:
                    this.setRefuseInfo(d);
                    break;
                case 3:
                    this.setNeedlVerifyInfo(d);
                    break
                }
                break;
            case 153:
                this.setOppositeIsYourBuddyInfo(d);
                break
            }
        },
        setOppositeIsYourBuddyInfo: function(h) {
            var c = this._qqclient.bdylist.allUsers[h];
            this._addBuddyAlertBox_node = document.createElement("div");
            a.addClass(this._addBuddyAlertBox_node, "alertBox");
            var i = 0;
            var f = "",
            g = "",
            e = "",
            d = "";
            g = "" + h + "<" + h + ">已经在您的【" + this._qqclient.bdylist.groups[c.group_id].name + "】组中！";
            f = g + e + d;
            a.get("alertMsgContent_connection").style.display = "none";
            a.get("alertMsgContent_option").innerHTML = f;
            b.on(a.get("alertOkButton"), "click", this.closeAddBuddyWin, this, true);
            a.removeClass(a.get("alertOkButton"), "disable")
        },
        setBeAllowAddOppositeInfo: function(j) {
            this._addBuddyAlertBox_node = document.createElement("div");
            a.addClass(this._addBuddyAlertBox_node, "alertBox");
            var k = 0;
            var g = "",
            h = "",
            f = "",
            d = "";
            h = '<div>			        <p>备注：<input id="buddyRemark" class="buddyRemark" type="text" value="" /></p>			        <p class="selectBuddyGroupOuter">						分组：<select id="selectBuddyGroup" class="selectBuddyGroup">';
            for (var c in this._qqclient.bdylist.groups) {
                if (c != "_1000" && c != "1000" && c != "1001") {
                    var e = "";
                    if (k == 0) {
                        e = 'selected="selected"'
                    }
                    f += '<option value="' + this._qqclient.bdylist.groups[c].id + '" ' + e + " >" + this._qqclient.bdylist.groups[c].name + "</option>";
                    k++
                }
            }
            d = "</select>					</p>			    </div>";
            g = h + f + d;
            a.get("alertMsgContent_connection").style.display = "none";
            a.get("alertMsgContent_option").innerHTML = g;
            b.on(a.get("alertOkButton"), "click", this.sendAddBuddyInfo, this);
            b.on(a.get("buddyRemark"), "keyup", this._qqclient.mainPanel.mf_checkBuddyRemarkInput, this._qqclient.mainPanel, true);
            b.on(a.get("buddyRemark"), "blur", this._qqclient.mainPanel.mf_checkBuddyRemarkInput, this._qqclient.mainPanel, true);
            a.get("alertOkButton").setAttribute("add_type", 0);
            a.removeClass(a.get("alertOkButton"), "disable");
            a.get("buddyRemark").focus()
        },
        setNeedlVerifyInfo: function(j) {
            this._addBuddyAlertBox_node = document.createElement("div");
            a.addClass(this._addBuddyAlertBox_node, "alertBox");
            var k = 0;
            var g = "",
            h = "",
            f = "",
            d = "";
            h = '<div>			        <p>						<span>请输入验证信息：</span>						<input id="verifyMsg" value="" maxlength="50" />					</p>			        <p class="selectBuddyGroupOuter">						分组：<select id="selectBuddyGroup" class="selectBuddyGroup">';
            for (var c in this._qqclient.bdylist.groups) {
                if (c != "_1000" && c != "1000" && c != "1001") {
                    var e = "";
                    if (k == 0) {
                        e = 'selected="selected"'
                    }
                    f += '<option value="' + this._qqclient.bdylist.groups[c].id + '" ' + e + " >" + this._qqclient.bdylist.groups[c].name + "</option>";
                    k++
                }
            }
            d = "</select>					</p>			    </div>";
            g = h + f + d;
            a.get("alertMsgContent_connection").style.display = "none";
            a.get("alertMsgContent_option").innerHTML = g;
            b.on(a.get("alertOkButton"), "click", this.sendVerifyInfo, this);
            a.get("alertOkButton").setAttribute("add_type", 1);
            a.removeClass(a.get("alertOkButton"), "disable");
            a.get("verifyMsg").focus()
        },
        setRefuseInfo: function(h) {
            var c = this._qqclient.bdylist.allUsers[h];
            this._addBuddyAlertBox_node = document.createElement("div");
            a.addClass(this._addBuddyAlertBox_node, "alertBox");
            var i = 0;
            var f = "",
            g = "",
            e = "",
            d = "";
            g = "<p>对方拒绝被添加！</p>";
            f = g + e + d;
            a.get("alertMsgContent_connection").style.display = "none";
            a.get("alertMsgContent_option").innerHTML = f
        },
        closeAddBuddyWin: function() {
            if (a.get("alertMsgContent_connection")) {
                var c = a.get("alertMsgContent_connection").getAttribute("seq");
                this._qqclient.pm.removePackage(c)
            }
            this._qqclient.mainPanel.mf_closeSysBox()
        },
        sendAddBuddyInfo: function(j, e) {
            a.get("alertMsgContent_connection").style.display = "block";
            a.get("alertMsgContent_connection").innerHTML = '<div class="loading_2">请求发送中...</div>';
            var g = this.getAttribute("uin"),
            i = parseInt(this.getAttribute("add_type"));
            if (a.get("buddyRemark")) {
                var c = a.get("buddyRemark").value.trim()
            }
            var k = parseInt(a.get("selectBuddyGroup").value);
            var d = e._qqclient.cs.cs0xa8(0, g, [1, k]);
            var l = e,
            h = {
                onSuccess: function(m) {
                    if (m.params[3] == 0) {
                        l.addBuddyFinished(m)
                    }
                },
                onFail: function() {
                    a.get("alertMsgContent_connection").innerHTML = "<div>操作超时，请稍候再试!</div>"
                },
                sscope: l,
                fscope: l,
                arguments: {
                    info: {
                        friend_uin: g,
                        nick: e._lastResults[g].nick,
                        group_id: k,
                        remark: c
                    }
                },
                cmd: "a8",
                body: d
            };
            var f = l._qqclient.getCmdInfo(h);
            YAHOO.log("sendAddBuddyInfo:" + f)
        },
        sendVerifyInfo: function(j, e) {
            a.get("alertMsgContent_connection").style.display = "block";
            a.get("alertMsgContent_connection").innerHTML = '<div class="loading_2">请求发送中...</div>';
            var g = this.getAttribute("uin"),
            i = parseInt(this.getAttribute("add_type"));
            var k = parseInt(a.get("selectBuddyGroup").value);
            var c = a.get("verifyMsg").value;
            var d = e._qqclient.cs.cs0xa8(2, g, [1, k, encodeURIComponent(c)]);
            var l = e,
            h = {
                onSuccess: function(m) {
                    if (m.params[3] == 0) {
                        if (l._qqclient.mainPanel.addBuddy) {
                            l._qqclient.mainPanel.addBuddy.closeAddBuddyWin()
                        }
                    }
                },
                onFail: function() {
                    a.get("alertMsgContent_connection").innerHTML = "<div>操作超时，请稍候再试!</div>"
                },
                sscope: l,
                fscope: l,
                arguments: {
                    info: {
                        friend_uin: g,
                        nick: e._lastResults[g].nick,
                        group_id: k,
                        msg: c
                    }
                },
                cmd: "a8",
                body: d
            };
            var f = l._qqclient.getCmdInfo(h);
            YAHOO.log("sendAddBuddyInfo:" + f)
        },
        addBuddyFinished: function(m) {
            var g = WEBQQ.obj.USER;
            var f = this._qqclient;
            var c = m.info.nick,
            n = m.info.friend_uin,
            p = m.info.group_id || 0,
            l = m.info.remark,
            d = f.bdylist.groups,
            k = parseInt(m.params[6], 10);
            this.closeAddBuddyWin();
            if (f.isFriend(n) === -1) {
                if (!f.bdylist.allUsers[n]) {
                    f.bdylist.allUsers[n] = new g(n, p)
                }
                f.bdylist.allUsers[n].group_id = p
            }
            var j = f.bdylist.allUsers[n];
            j.face = 0;
            if ((j.face) >= f.cs_params.FACE_MAX_INDEX) {
                j.face = 0
            }
            if (k == 40) {
                k = 20
            }
            j.nick = c || "";
            j.stat = k;
            var i = d[j.group_id];
            var e = d._1000;
            var o = n;
            var q = false,
            h = false;
            switch (k) {
            case 10:
                i.online_users.add_user(o);
                q = f.mainPanel.mf_addUser(o, "online", 1);
                d._1000.online_users.add_users(o);
                h = f.mainPanel.mf_addOnlineUser(o, "online", "_1000");
                break;
            case 20:
                i.offline_users.add_user(o);
                q = f.mainPanel.mf_addUser(o, "offline", 1);
                break;
            case 30:
                i.away_users.add_user(o);
                q = f.mainPanel.mf_addUser(o, "away", 1);
                d._1000.away_users.add_users(o);
                h = f.mainPanel.mf_addOnlineUser(o, "away", "_1000");
            default:
                break
            }
            if (q == true) {
                f.mainPanel.mf_updateGroupStat(i)
            }
            if (h == true) {
                f.mainPanel.mf_updateGroupStat(e)
            }
            f.RemarkFriend(j, l)
        }
    };
    WEBQQ.cls.AddBuddy.getInstance = function() {
        if (!WEBQQ.cls.AddBuddy.prototype.instance) {
            WEBQQ.cls.AddBuddy.prototype.instance = new WEBQQ.cls.AddBuddy("AddBuddy")
        }
        return WEBQQ.cls.AddBuddy.prototype.instance
    };
    WEBQQ.cls.AddBuddy.Destroy = function() {
        if (WEBQQ.cls.AddBuddy.prototype.instance) {
            WEBQQ.cls.AddBuddy.prototype.instance.destroy();
            WEBQQ.cls.AddBuddy.prototype.instance = null
        }
    }
})();