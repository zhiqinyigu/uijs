var Qmail = {}; (function() {
    var c = YAHOO.util.Dom,
    e = YAHOO.util.Event;
    WEBQQ.namespace("WEBQQ.cls");
    var b = YAHOO.util.Dom;
    var a = YAHOO.util.Event;
    var d = YAHOO.util.CustomEvent;
    WEBQQ.cls.Tab = function(g, h, f) {
        this.tabs = [];
        this.currentTab = null;
        this.config = {
            defaultIndex: 0,
            triggerEvent: "click",
            slideEnabled: false,
            slideInterval: 3 * 60 * 1000,
            slideDelay: 300,
            autoInit: true,
            onShow: function() {}
        };
        this.setConfig(f);
        this.onShow = new d("onShow", this);
        this.onShow.subscribe(this.config.onShow);
        if (g && h) {
            this.addRange(g, h);
            if (this.config.autoInit) {
                this.init()
            }
        }
    };
    WEBQQ.cls.Tab.prototype = {
        setConfig: function(f) {
            if (!f) {
                return
            }
            for (var g in f) {
                this.config[g] = f[g]
            }
        },
        add: function(h) {
            if (!h) {
                return
            }
            var f = b.get(h.trigger);
            var g = b.get(h.sheet);
            if (f) {
                this.tabs.push(h);
                f.style.display = "block"
            }
        },
        addRange: function(h, j) {
            if (!h || !j) {
                return
            }
            if (h.length && j.length && h.length == j.length) {
                for (var g = 0,
                f = h.length; g < f; g++) {
                    this.add({
                        trigger: h[g],
                        sheet: j[g]
                    })
                }
            }
        },
        select: function(f) {
            if (!f || ( !! this.currentTab && f.trigger == this.currentTab.trigger)) {
                return
            }
            if (this.currentTab) {
                b.removeClass(this.currentTab.trigger, "current");
                if (this.currentTab.sheet) {
                    this.currentTab.sheet.style.display = "none"
                }
            }
            this.currentTab = f;
            this.show()
        },
        cancelSelected: function() {
            if (this.currentTab) {
                b.removeClass(this.currentTab.trigger, "current");
                if (this.currentTab.sheet) {
                    this.currentTab.sheet.style.display = "none"
                }
            }
            this.currentTab = null
        },
        remove: function(g) {
            if (!g) {
                return
            }
            if (g.trigger) {
                b.removeClass(g.trigger, "current");
                g.trigger.style.display = "none"
            }
            if (g.sheet) {
                g.sheet.style.display = "none"
            }
            var f = this.indexOf(g);
            this.tabs.splice(f, f);
            if (g.trigger == this.currentTab.trigger) {
                if (f == 0) {
                    this.select(this.tabs[(f + 1)])
                } else {
                    this.select(this.tabs[(f - 1)])
                }
            }
        },
        show: function() {
            if (this.currentTab.trigger) {
                this.currentTab.trigger.style.display = "block"
            }
            b.addClass(this.currentTab.trigger, "current");
            if (this.currentTab.sheet) {
                this.currentTab.sheet.style.display = "block"
            }
            this.onShow.fire(this.currentTab)
        },
        slide: function() {
            var i = this.config,
            l = this,
            j, g;
            b.batch(this.tabs,
            function(m) {
                a.on([m.trigger, m.sheet], "mouseover", f);
                a.on([m.trigger, m.sheet], "mouseout", h)
            });
            k();
            function k() {
                var m = l.indexOf(l.currentTab);
                if (m == -1) {
                    return
                }
                j = window.setInterval(function() {
                    var n = l.tabs[++m % l.tabs.length];
                    if (n) {
                        l.select(n)
                    }
                },
                i.slideInterval)
            }
            function f() {
                window.clearTimeout(g);
                window.clearInterval(j)
            }
            function h() {
                g = window.setTimeout(k, i.slideDelay)
            }
        },
        indexOf: function(h) {
            for (var g = 0,
            f = this.tabs.length; g < f; g++) {
                if (h.trigger == this.tabs[g].trigger) {
                    return g
                }
            }
            return - 1
        },
        init: function() {
            var f = this.config,
            g = this;
            b.batch(this.tabs,
            function(h) {
                a.on(h.trigger, f.triggerEvent,
                function(i) {
                    a.stopEvent(i);
                    g.select.call(g, h)
                });
                if (h.sheet) {
                    h.sheet.style.display = "none"
                }
            });
            this.select(this.tabs[f.defaultIndex]);
            if (f.slideEnabled) {
                this.slide()
            }
        }
    };
    WEBQQ.addFav = function(f, g) {
        if (window.sidebar && "object" == typeof(window.sidebar) && "function" == typeof(window.sidebar.addPanel)) {
            window.sidebar.addPanel(g, f, "")
        } else {
            if (document.all && "object" == typeof(window.external)) {
                window.external.addFavorite(f, g)
            }
        }
    };
    a.on(b.get("site_setHome"), "click",
    function() {
        var g = window.location;
        var i = this;
        g = "http://web.qq.com/";
        try {
            i.style.behavior = "url(#default#homepage)";
            i.setHomePage(g)
        } catch(h) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
                } catch(h) {
                    alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。")
                }
                try {
                    var f = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
                    f.setCharPref("browser.startup.homepage", g)
                } catch(h) {}
            }
        }
    });
    a.on(b.get("site_addFav"), "click",
    function() {
        var f = window.location;
        f = "http://web.qq.com/";
        WEBQQ.addFav(f, "WebQQ - QQ 网页版")
    });
    WEBQQ.cls.MainPanel = function(aq) {
        if (typeof(aq) !== "string") {
            throw new Error("WEBQQ.cls.MainPanel call failed, the parameter(" + aq + ")'s type is not string!")
        }
        this._qqclient = WEBQQ.obj.QQClient;
        this.defaultSignature = "编辑个性签名";
        this._id = "Main_" + aq;
        this._id_pre = this._id + "_";
        this._newWin = {};
        this._group_el = {};
        this._sysMsgBox = [];
        this._taskbar_id = this._id_pre + "tf";
        var M = this._id_pre + "minimize";
        var L = this._id_pre + "close";
        var r = this._id_pre + "sta_mnu";
        var m = this._id_pre + "set_mnu";
        var ao = this._id_pre + "ext_mnu";
        var t = this._id_pre + "cls_mnu";
        var Z = this._id_pre + "face_panel";
        var ac = this._id_pre + "swc_sta";
        var ae = this._id_pre + "sta_mnu_pos";
        var y = this._id_pre + "user_nick";
        var ah = this._id_pre + "title";
        var af = this._id_pre + "qqtitle_exit";
        var h = this._id_pre + "man_statistic";
        var H = this._id_pre + "girl_statistic";
        var aa = this._id_pre + "total_statistic";
        var B = this._id_pre + "friend";
        var ag = this._id_pre + "class";
        var W = this._id_pre + "class_list";
        var ak = this._id_pre + "content_area";
        var J = this._id_pre + "show_qzoneBlog";
        var an = this._id_pre + "qzoneBlog_head";
        var l = this._id_pre + "qzoneBlog_close";
        var al = this._id_pre + "qzoneBlog_title";
        var z = this._id_pre + "qzoneBlog_datetime";
        var x = this._id_pre + "qzoneBlog_content";
        var n = this._id_pre + "friend_offmsg";
        var ar = this._id_pre + "friend_offmsg_ig";
        var aw = this._id_pre + "friend_offmsg_ex";
        var U = this._id_pre + "class_offmsg";
        var f = this._id_pre + "class_offmsg_ig";
        var q = this._id_pre + "class_offmsg_ex";
        var ap = this._id_pre + "mail_msg";
        var av = this._id_pre + "mail_msg_ex";
        var D = this._id_pre + "search_input";
        var au = this._id_pre + "search_button";
        var aj = this._id_pre + "friend_msg_count";
        var T = this._id_pre + "friend_msg_link";
        var at = this._id_pre + "class_msg_count";
        var Y = this._id_pre + "class_msg_link";
        var k = this._id_pre + "mail_count";
        var E = this._id_pre + "mail_link";
        var ab = this._id_pre + "friend_msg_count2";
        var S = this._id_pre + "class_msg_count2";
        var G = this._id_pre + "mail_count2";
        var I = this._id_pre + "friend_offmsg_area";
        var K = this._id_pre + "friend_offmsg_area_h";
        var C = this._id_pre + "friend_offmsg_area_c";
        var w = this._id_pre + "class_offmsg_area";
        var u = this._id_pre + "class_offmsg_area_h";
        var p = this._id_pre + "class_offmsg_area_c";
        var A = this._id_pre + "mail_msg_area";
        var R = this._id_pre + "mail_msg_area_h";
        var N = this._id_pre + "mail_msg_area_c";
        var o = this._id_pre + "friend_impression";
        var ai = document.getElementById(this._id);
        this._eleRef = ai;
        this._my_avatar_node = c.get(this._id + "_my_avatar");
        e.on(this._my_avatar_node, "click", this.clickMyAvatarIconHandler, this, true);
        this._my_avatar_img_node = c.get(this._id + "_my_avatar_img");
        this._my_info_node = c.get(this._id + "_my_info");
        this._WebApp_loading_node = c.get("WebApp_loading");
        this._main_leftpanel_el = c.get(this._id + "_main_leftpanel");
        this._buddy_list_panel_el = c.get(this._id + "_buddy_list_panel");
        this._buddyListPanelWidth = 220;
        this._webqqTopHeight = 63;
        this._taskbarHeight = 53;
        this._status_menu_button_node = c.get(this._id + "_status_menu_button");
        this._my_qqlevel_button_node = c.get(this._id + "_my_qqlevel_button");
        this._my_qqlevel_panel_node = c.get(this._id + "_my_qqlevel_panel");
        this._title_el = c.get(ah);
        this._qzone_button_node = c.get(this._id_pre + "qzone_button");
        this._signature_el = c.get(this._id_pre + "signature");
        this.mf_setSigContent("载入中...");
        this._signature_input_el = c.get(this._id + "_signature_input");
        this._qq_lock_button_el = c.get(this._id + "_qq_lock_button");
        this._qqtitle_exit_el = c.get(af);
        this._tabs_setting_el = c.get(this._id + "_tabs_setting_button");
        this._recommend_list_el = c.get(this._id + "_recommend_list");
        this._weather_button_el = c.get("WeatherButton");
        this._WeatherPic_el = c.get("WeatherPic");
        this._CityAndTemperature_el = c.get("CityAndTemperature");
        this._more_weather_board_el = c.get("MoreWeatherBoard");
        this._setting_menu_el = c.get(this._id_pre + "setting_menu");
        this._message_marquee_el = c.get(this._id_pre + "message_marquee");
        this._message_marquee_inner_el = c.get(this._id_pre + "message_marquee_inner");
        this._no_message_marquee_el = c.get(this._id_pre + "no_message_marquee");
        e.on(this._message_marquee_el, "click", this.mf_openMarqueeMsg, this, true);
        this._man_statistic_el = c.get(h);
        this._girl_statistic_el = c.get(H);
        this._total_statistic_el = c.get(aa);
        this._user_list_option_el = c.get(this._id + "_user_list_option");
        this._add_buddy_button_el = c.get(this._id + "_add_buddy_button");
        e.on(this._add_buddy_button_el, "click", this.mf_openAddBuddyTab, this, true);
        this._buddy_manager_button_el = c.get(this._id + "_buddy_manager_button");
        e.on(this._buddy_manager_button_el, "click", this.mf_openBuddyManagerTab, this, true);
        this._user_list_el = c.get(this._id_pre + "user_list");
        this._qqgroup_list_option_el = c.get(this._id_pre + "qqgroup_list_option");
        this._class_list_el = c.get(W);
        this._user_friend_el = c.get(B);
        this._user_class_el = c.get(ag);
        this._content_area_el = c.get(ak);
        this._show_qzoneBlog_el = c.get(J);
        this._qzoneBlog_head_el = c.get(an);
        this._qzoneBlog_close_el = c.get(l);
        this._qzoneBlog_title_el = c.get(al);
        this._qzoneBlog_datetime_el = c.get(z);
        this._qzoneBlog_content_el = c.get(x);
        this._friend_offmsg_el = c.get(n);
        this._friend_offmsg_ex_el = c.get(aw);
        this._class_offmsg_el = c.get(U);
        this._class_offmsg_ex_el = c.get(q);
        this._mail_msg_el = c.get(ap);
        this._mail_msg_re_el = c.get(this._id_pre + "mail_msg_re");
        this._mail_msg_ex_el = c.get(av);
        this._sysmsg_el = c.get(this._id_pre + "sysmsg");
        this._sysmsg_ex_el = c.get(this._id_pre + "sysmsg_ex");
        this._search_input_el = c.get(D);
        this._search_button_el = c.get(au);
        this._all_msg_count_el = c.get(this._id_pre + "all_msg_count");
        this._friend_msg_link_ref = c.get(T);
        this._friend_msg_count_ref = c.get(aj);
        this._friend_msg_count2_ref = c.get(ab);
        this._class_msg_link_ref = c.get(Y);
        this._class_msg_count_ref = c.get(at);
        this._class_msg_count2_ref = c.get(S);
        this._mail_link_ref = c.get(E);
        this._mail_count_ref = c.get(k);
        this._mail_count2_ref = c.get(G);
        this._sysmsg_link_ref = c.get(this._id_pre + "sysmsg_link");
        this._sysmsg_count_ref = c.get(this._id_pre + "sysmsg_count");
        this._sysmsg_count2_ref = c.get(this._id_pre + "sysmsg_count2");
        this._friend_offmsg_area_el = c.get(I);
        this._friend_offmsg_area_h_el = c.get(K);
        this._friend_offmsg_area_c_el = c.get(C);
        this._class_offmsg_area_el = c.get(w);
        this._class_offmsg_area_h_el = c.get(u);
        this._class_offmsg_area_c_el = c.get(p);
        this._mail_msg_area_el = c.get(A);
        this._mail_msg_area_h_el = c.get(R);
        this._mail_msg_area_c_el = c.get(N);
        this._sysmsg_area_el = c.get(this._id_pre + "sysmsg_area");
        this._sysmsg_area_h_el = c.get(this._id_pre + "sysmsg_area_h");
        this._sysmsg_area_c_el = c.get(this._id_pre + "sysmsg_area_c");
        this._cover_layer_node = c.get(this._id + "_cover_layer");
        this._sysbox_node = c.get(this._id + "_sysbox");
        this._buddy_details_loading_node = c.get(this._id + "_buddy_details_loading");
        this._buddy_details_loadend_node = c.get(this._id + "_buddy_details_loadend");
        this._buddyDetails_view_button_node = c.get("BuddyDetails_view_button");
        this._buddyDetails_qzone_panel_node = c.get("BuddyDetails_qzone_panel");
        this._buddyDetails_buddy_impression_panel_node = c.get("BuddyDetails_buddy_impression_panel");
        this._buddyDetails_modify_ok_button_node = c.get("BuddyDetails_modify_ok_button");
        this._buddyDetails_avatar_node = c.get("BuddyDetails_avatar");
        this._buddyDetails_nickname_node = c.get("BuddyDetails_nickname");
        this._buddyDetails_nickname_2_node = c.get("BuddyDetails_nickname_2");
        this._buddyDetails_qqlevel_node = c.get("BuddyDetails_qqlevel");
        this._buddyDetails_signature_node = c.get("BuddyDetails_signature");
        this._buddyDetails_uin_node = c.get("BuddyDetails_uin");
        this._buddyDetails_realname_container1_node = c.get("BuddyDetails_realname_container1");
        this._buddyDetails_realname_node = c.get("BuddyDetails_realname");
        this._buddyDetails_realname_input_node = c.get("BuddyDetails_realname_input");
        e.on(this._buddyDetails_realname_input_node, "keydown", this.onKeydownRealnameInput, this, true);
        e.on(this._buddyDetails_realname_input_node, "keyup", this.checkRealnameInputInDetails, this, true);
        e.on(this._buddyDetails_realname_input_node, "blur", this.checkRealnameInputInDetails, this, true);
        this._buddyDetails_sex_node = c.get("BuddyDetails_sex");
        this._buddyDetails_age_node = c.get("BuddyDetails_age");
        this._buddyDetails_bloodtype_node = c.get("BuddyDetails_bloodtype");
        this._buddyDetails_shengxiao_node = c.get("BuddyDetails_shengxiao");
        this._buddyDetails_constellation_node = c.get("BuddyDetails_constellation");
        this._buddyDetails_country_node = c.get("BuddyDetails_country");
        this._buddyDetails_province_node = c.get("BuddyDetails_province");
        this._buddyDetails_city_node = c.get("BuddyDetails_city");
        this._buddyDetails_city2_node = c.get("BuddyDetails_city2");
        this._buddyDetails_mobile_node = c.get("BuddyDetails_mobile");
        this._buddyDetails_phone_node = c.get("BuddyDetails_phone");
        this._buddyDetails_email_node = c.get("BuddyDetails_email");
        this._buddyDetails_language_node = c.get("BuddyDetails_language");
        this._buddyDetails_occupation_node = c.get("BuddyDetails_occupation");
        this._buddyDetails_college_node = c.get("BuddyDetails_college");
        this._buddyDetails_homepage_node = c.get("BuddyDetails_homepage");
        this._buddyDetails_ps_node = c.get("BuddyDetails_ps");
        this._buddyDetails_remarks_node = c.get("BuddyDetails_remarks");
        this._buddyDetails_buddy_qzone_node = c.get("BuddyDetails_buddy_qzone");
        this._buddyDetails_last_blog_node = c.get("BuddyDetails_last_blog");
        this._buddyDetails_impression_node = c.get("BuddyDetails_impression");
        this._buddyDetails_tab_head_node = c.get("Main_mainwindow_buddy_details_tab_head_text");
        var g = document.createElement("DIV");
        g.id = r;
        g.className = "switch-status";
        g.style.display = "none";
        g.innerHTML = '<a href="#" class="online">在线</a><a href="#" class="away">离开</a><a href="#" class="hidden">隐身</a><a href="#" class="offline">离线</a><a href="#" class="exit">退出</a>';
        document.body.appendChild(g);
        this._status_menu_panel_node = g;
        this._chatlogMenuPanelEl = c.get("chatlogMenuPanel");
        this._chatlogViewButtonEl = c.get("chatlogViewButton");
        this._chatlogExportButtonEl = c.get("chatlogExportButton");
        e.on(this._chatlogViewButtonEl, "mousedown", this.clickChatlogViewButton, this, true);
        var g = document.createElement("DIV");
        g.id = m;
        g.className = "sportvoice";
        g.style.display = "none";
        g.innerHTML = '<div><a href="#"><span class="openvoice"></span>开启声音提示</a></div><div><a href="#"><span class="closevoice"></span>关闭声音提示</a></div><div><a href="#"><span class="shieldingallmessage"></span>屏蔽所有消息(仅使用消息盒子)</a></div>';
        document.body.appendChild(g);
        this._setting_menu_panel_node = g;
        this._shield_grounp_msg_el = c.get("shield_grounp_msg");
        var V = document.createElement("DIV");
        V.className = "keyboard";
        V.style.display = "none";
        V.innerHTML = '<a href=""><span></span><span>按Enter键发送消息</span></a><a href=""><span></span><span>按Ctrl+Enter键发送消息</span></a><a href=""><span></span><span>以上两者均可发送消息</span></a>';
        document.body.appendChild(V);
        V.childNodes[Math.max(this._qqclient.getBitValue(30, 2) - 1, 0)].childNodes[0].className = "changeway";
        this._sset_panel_ref = V;
        if (!this._qqclient.isMaskSound()) {
            this._setting_menu_el.className = "voice";
            this._setting_menu_el.title = "声音已开启"
        }
        if (this._qqclient.getBitValue(27, 2) == 3) {
            this._setting_menu_el.className = "noallvoice";
            this._setting_menu_el.title = "所有消息已屏蔽"
        }
        var Q = document.createElement("DIV");
        Q.className = "search";
        Q.style.display = "none";
        Q.innerHTML = '<a href="#"><span>周星星周星星</span><span>(50095826)</span></a><a href="#"><span>周星星周星星</span><span>(50095826)</span></a>';
        document.body.appendChild(Q);
        this._search_panel_ref = Q;
        var F = document.createElement("DIV");
        F.className = "usercard";
        F.style.display = "none";
        F.innerHTML = '<div class="userAvatar">									<span><img id="QQTips_avatar" class="avatar" src="images/qq_avatar_shadow.gif" alt="...!" title="发起会话..." /></span>									<span id="BuddyOnlineStateInTips">状态</span>								</div>								<div class="userSimpleInfoInTips">										<div class="quickPanelInTips">											<a id="BuddyQzoneInTips" class="qzoneButtonInTips" href="#" target="_blank" title="进入Qzone!">Qzone</a>											<a id="SendEmailButtonInTips" class="sendEmailButtonInTips" href="' + qmail_server_domain + '/cgi-bin/login?Fun=clientwrite&vm=pt&email=4765078@qq.com" target="_blank" title="发送邮件">发送邮件</a>										</div>										<a id="QQTips_buddy_name" class="buddyNameInTips" href="###" uin="" title="查看资料">QQ昵称</a>										<div id="BuddySignatureInTips" class="signatureInTips">加载中...</div>										<div id="BuddyQQLevelInTips" class="buddyQQLevelInTips" title="等级:"></div>									</ul>								</div>								<div id="' + o + '" class="buddyImpressionInTips">									<div class="userys"></div>									<div class="bewriteInTips"><a href="#">我来评价</a></div>								</div>								<div id="BuddyOptionPanel">									<div class="buddyOptionTab">										<a id="RemoveBuddyButtonInTips" style="display:none;" href="###" title="删除好友">删除</a>										<a id="MoveBuddyButtonInTips" style="display:none;" href="###" title="移动分组">移动到</a>										<a id="ModifyRemarkButtonInTips" style="display:none;" href="###" title="修改备注">修改备注</a>										<a id="ViewBuddyDetailsButtonInTips" style="display:none;" uin="" href="###" title="查看资料">查看资料</a>									</div>									<div>										<div id="RemoveBuddyPanelInTips" class="optionPanelBoxInTipsA" style="display:none;">											<div class="optionPanelArrowInTips1">箭头</div>											<div class="removeBuddyInnerInTips">												<span>确认删除此好友？</span>												<a id="RemoveBuddyConfirmButtonInTips" href="#">确定</a>												<a id="RemoveBuddyCancelButtonInTips" href="#">取消</a>											</div>										</div>										<div id="MoveBuddyPanelInTips" class="optionPanelBoxInTipsB" style="display:none;">											<div class="optionPanelArrowInTips2">箭头</div>											<div id="MyBuddyClassListInTips" class="myBuddyClassListInTips"></div>										</div>										<div id="ModifyRemarkPanelInTips" class="optionPanelBoxInTipsA" style="display:none;">											<div class="optionPanelArrowInTips3">箭头</div>											<input id="RemarkInputInTips" class="remarkInputInTips" uin="" type="text" maxleng="16" />											<!--<div id="ModifyRemarkSendButtonInTips" class="modifyRemarkSendButtonInTips" title="确定(快捷键：Enter)">确定</div>-->										</div>										<div id="ViewBuddyDetailsPanelInTips" style="display:none;"></div>									</div>								</div>								<div id="StrangerOptionPanel">									<div class="buddyOptionTab">										<a id="AddBuddyButtonInTips" style="display:none;" href="###" title="加为好友">加为好友</a>										<a id="ViewBuddyDetailsButtonInTips2" style="display:none;" uin="" href="###" title="查看资料">查看资料</a>									</div>									<div>										<div id="AddBuddyPanelInTips"></div>										<div id="AddBuddyPanelInTips"></div>									</div>								</div>';
        document.body.appendChild(F);
        this._private_info_panel_ref = F;
        this._QQTips_avatar_node = c.get("QQTips_avatar");
        this._BuddyOnlineStateInTips_node = c.get("BuddyOnlineStateInTips");
        this._BuddyQzoneInTips_node = c.get("BuddyQzoneInTips");
        this._SendEmailButtonInTips_node = c.get("SendEmailButtonInTips");
        this._BuddySignatureInTips_node = c.get("BuddySignatureInTips");
        this._BuddyQQLevelInTips_node = c.get("BuddyQQLevelInTips");
        e.on(this._QQTips_avatar_node, "click", this.mf_ChatWithUser, this, true);
        this._QQTips_buddy_name_node = c.get("QQTips_buddy_name");
        e.on(this._QQTips_buddy_name_node, "click", this.clickViewBuddyDetailsInTips, this);
        this._BuddyOptionPanel_node = c.get("BuddyOptionPanel");
        this._RemoveBuddyButtonInTips_node = c.get("RemoveBuddyButtonInTips");
        this._MoveBuddyButtonInTips_node = c.get("MoveBuddyButtonInTips");
        this._ModifyRemarkButtonInTips_node = c.get("ModifyRemarkButtonInTips");
        this._ViewBuddyDetailsButtonInTips_node = c.get("ViewBuddyDetailsButtonInTips");
        this._RemoveBuddyPanelInTips_node = c.get("RemoveBuddyPanelInTips");
        this._MoveBuddyPanelInTips_node = c.get("MoveBuddyPanelInTips");
        this._ModifyRemarkPanelInTips_node = c.get("ModifyRemarkPanelInTips");
        this._ViewBuddyDetailsPanelInTips_node = c.get("ViewBuddyDetailsPanelInTips");
        this._RemoveBuddyConfirmButtonInTips_node = c.get("RemoveBuddyConfirmButtonInTips");
        this._RemoveBuddyCancelButtonInTips_node = c.get("RemoveBuddyCancelButtonInTips");
        this._MyBuddyClassListInTips_node = c.get("MyBuddyClassListInTips");
        this._RemarkInputInTips_node = c.get("RemarkInputInTips");
        e.on(this._RemarkInputInTips_node, "keyup",
        function() {
            this.editingRemarkUin = this._RemarkInputInTips_node.getAttribute("uin");
            this.checkRealnameInputInTips.call(this)
        },
        this, true);
        e.on(this._RemarkInputInTips_node, "blur", this.mf_onUserTipBlur, this, true);
        e.on(this._ViewBuddyDetailsButtonInTips_node, "click", this.clickViewBuddyDetailsInTips, this);
        e.on(this._MyBuddyClassListInTips_node, "click", this.clickMyBuddyClassListInTips, this, true);
        this.buddyOptionTabInTips = new WEBQQ.cls.Tab();
        this.buddyOptionTabInTips.add({
            trigger: this._RemoveBuddyButtonInTips_node,
            sheet: this._RemoveBuddyPanelInTips_node
        });
        this.buddyOptionTabInTips.add({
            trigger: this._MoveBuddyButtonInTips_node,
            sheet: this._MoveBuddyPanelInTips_node
        });
        this.buddyOptionTabInTips.add({
            trigger: this._ModifyRemarkButtonInTips_node,
            sheet: this._ModifyRemarkPanelInTips_node
        });
        this.buddyOptionTabInTips.add({
            trigger: this._ViewBuddyDetailsButtonInTips_node,
            sheet: this._ViewBuddyDetailsPanelInTips_node
        });
        this.buddyOptionTabInTips.config.triggerEvent = "click";
        this.buddyOptionTabInTips.config.slideEnabled = false;
        this.buddyOptionTabInTips.onShow.subscribe(function(ax, i) {
            var ay = WEBQQ.obj.QQClient.mainPanel;
            ay.resetUserCardPosition(ay._currentUserCardEl);
            switch (i[0].trigger) {
            case ay._ModifyRemarkButtonInTips_node:
                ay._RemarkInputInTips_node.value = ay._qqclient.bdylist.allUsers[ay._RemarkInputInTips_node.getAttribute("uin")].remark || "";
                ay._RemarkInputInTips_node.focus();
                ay._RemarkInputInTips_node.select();
                break;
            default:
                break
            }
        });
        this.buddyOptionTabInTips.setConfig({
            defaultIndex:
            -1
        });
        this.buddyOptionTabInTips.init();
        e.on(this._RemarkInputInTips_node, "keydown", this.keydownModifyRemarkSendButtonInTips, this, true);
        e.on(this._RemoveBuddyConfirmButtonInTips_node, "click", this.handleClickRemoveBuddy, this, true);
        e.on(this._RemoveBuddyCancelButtonInTips_node, "click", this.cancelBuddyOptionSelected, this, true);
        this._StrangerOptionPanel_node = c.get("StrangerOptionPanel");
        this._AddBuddyButtonInTips_node = c.get("AddBuddyButtonInTips");
        this._ViewBuddyDetailsButtonInTips2_node = c.get("ViewBuddyDetailsButtonInTips2");
        this._AddBuddyPanelInTips_node = c.get("AddBuddyPanelInTips");
        this._ViewBuddyDetailsPanelInTips2_node = c.get("ViewBuddyDetailsPanelInTips2");
        e.on(this._ViewBuddyDetailsButtonInTips2_node, "click", this.clickViewBuddyDetailsInTips, this);
        this.strangerOptionTabInTips = new WEBQQ.cls.Tab();
        this.strangerOptionTabInTips.add({
            trigger: this._AddBuddyButtonInTips_node,
            sheet: this._AddBuddyPanelInTips_node
        });
        this.strangerOptionTabInTips.add({
            trigger: this._ViewBuddyDetailsButtonInTips2_node,
            sheet: this._ViewBuddyDetailsPanelInTips2_node
        });
        this.strangerOptionTabInTips.config.triggerEvent = "click";
        this.strangerOptionTabInTips.config.slideEnabled = false;
        this.strangerOptionTabInTips.onShow.subscribe(function(ax, i) {
            var ay = WEBQQ.obj.QQClient.mainPanel;
            ay.resetUserCardPosition(ay._currentUserCardEl)
        });
        this.strangerOptionTabInTips.setConfig({
            defaultIndex: -1
        });
        this.strangerOptionTabInTips.init();
        g = document.createElement("DIV");
        g.id = ao;
        g.className = "yuimenu select-status exit-status";
        g.style.visibility = "hidden";
        g.innerHTML = '<div class="left"></div><div class="bd middle"><ul class="first-of-type"><li class="yuimenuitem"><a class="yuimenuitemlabel offline" href="#">退出</a></li></ul></div><div class="right"></div>';
        this._ext_menu_ref = g;
        g = document.createElement("DIV");
        g.id = t;
        g.className = "yuimenu class-right-key";
        g.style.visibility = "hidden";
        g.innerHTML = '<div class="top"><div class="left"></div><div class="right"></div><div class="middle"></div></div><div class="middle-area"><div class="left"></div><div class="right"></div><div class="middle"><a href="#">发送群消息</a><a href="#" class="selected">接受并提示消息</a><a href="#">屏蔽消息(只显示消息数目)</a></div></div><div class="bottom"><div class="left"></div><div class="right"></div><div class="middle"></div></div>';
        this._cls_menu_ref = g;
        var O = document.createElement("DIV");
        var ad = document.createElement("DIV");
        ad.id = Z;
        ad.style.display = "none";
        ad.className = "face";
        O.id = Z;
        O.style.display = "none";
        O.className = "face";
        ad.innerHTML = '	<div class="faceBg">		<div style="display:none;" class="faceImg" id="faceImgPanel">			<a title="[/:)]" id="qqface_0" ></a><a title="[/:~]" id="qqface_1"></a><a title="[/:B]" id="qqface_2"></a>			<a title="[/:|]" id="qqface_3"></a><a title="[/8-)]" id="qqface_4"></a><a title="[/:<]" id="qqface_5"></a>			<a title="[/:$]" id="qqface_6"></a><a title="[/:X]" id="qqface_7"></a><a title="[/:Z]" id="qqface_8"></a>			<a title="[/:\'(]" id="qqface_9"></a><a title="[/:-|]" id="qqface_10"></a><a title="[/:@]" id="qqface_11"></a>			<a title="[/:P]" id="qqface_12"></a><a title="[/:D]" id="qqface_13"></a><a title="[/:O]" id="qqface_14"></a>			<a title="[/:(]" id="qqface_15"></a><a title="[/:+]" id="qqface_16"></a><a title="[/--b]" id="qqface_17"></a>			<a title="[/:Q]" id="qqface_18"></a><a title="[/:T]" id="qqface_19"></a><a title="[/;P]" id="qqface_20"></a>			<a title="[/;-D]" id="qqface_21"></a><a title="[/;d]" id="qqface_22"></a><a title="[/;o]" id="qqface_23"></a>			<a title="[/:g]" id="qqface_24"></a><a title="[/|-)]" id="qqface_25"></a><a title="[/:!]" id="qqface_26"></a>			<a title="[/:L]" id="qqface_27"></a><a title="[/:>]" id="qqface_28"></a><a title="[/:;]" id="qqface_29"></a>			<a title="[/;f]" id="qqface_30"></a><a title="[/:-S]" id="qqface_31"></a><a title="[/?]" id="qqface_32"></a>			<a title="[/;x]" id="qqface_33"></a><a title="[/;@]" id="qqface_34"></a><a title="[/:8]" id="qqface_35"></a>			<a title="[/;!]" id="qqface_36"></a><a title="[/!!!]" id="qqface_37"></a><a title="[/xx]" id="qqface_38"></a>			<a title="[/bye]" id="qqface_39"></a><a title="[/wipe]" id="qqface_40"></a><a title="[/dig]" id="qqface_41"></a>			<a title="[/handclap]" id="qqface_42"></a><a title="[/&-(]" id="qqface_43"></a><a title="[/B-)]" id="qqface_44"></a>			<a title="[/<@]" id="qqface_45"></a><a title="[/@>]" id="qqface_46"></a><a title="[/:-O]" id="qqface_47"></a>			<a title="[/>-|]" id="qqface_48"></a><a title="[/P-(]" id="qqface_49"></a><a title="[/:\'|]" id="qqface_50"></a>			<a title="[/X-)]" id="qqface_51"></a><a title="[/:*]" id="qqface_52"></a><a title="[/@x]" id="qqface_53"></a>			<a title="[/8*]" id="qqface_54"></a><a title="[/pd]" id="qqface_55"></a><a title="[/<W>]" id="qqface_56"></a>			<a title="[/beer]" id="qqface_57"></a><a title="[/basketb]" id="qqface_58"></a><a title="[/oo]" id="qqface_59"></a>			<a title="[/coffee]" id="qqface_60"></a><a title="[/eat]" id="qqface_61"></a><a title="[/pig]" id="qqface_62"></a>			<a title="[/rose]" id="qqface_63"></a><a title="[/fade]" id="qqface_64"></a><a title="[/showlove]" id="qqface_65"></a>			<a title="[/heart]" id="qqface_66"></a><a title="[/break]" id="qqface_67"></a><a title="[/cake]" id="qqface_68"></a>			<a title="[/li]" id="qqface_69"></a><a title="[/bome]" id="qqface_70"></a><a title="[/kn]" id="qqface_71"></a>			<a title="[/footb]" id="qqface_72"></a><a title="[/ladybug]" id="qqface_73"></a><a title="[/shit]" id="qqface_74"></a>			<a title="[/moon]" id="qqface_75"></a><a title="[/sun]" id="qqface_76"></a><a title="[/gift]" id="qqface_77"></a>			<a title="[/hug]" id="qqface_78"></a><a title="[/strong]" id="qqface_79"></a><a title="[/weak]" id="qqface_80"></a>			<a title="[/share]" id="qqface_81"></a><a title="[/v]" id="qqface_82"></a><a title="[/@)]" id="qqface_83"></a>			<a title="[/jj]" id="qqface_84"></a><a title="[/@@]" id="qqface_85"></a><a title="[/bad]" id="qqface_86"></a>			<a title="[/loveu]" id="qqface_87"></a><a title="[/no]" id="qqface_88"></a><a title="[/ok]" id="qqface_89"></a>			<a title="[/love]" id="qqface_90"></a><a title="[/<L>]" id="qqface_91"></a><a title="[/jump]" id="qqface_92"></a>			<a title="[/shake]" id="qqface_93"></a><a title="[/<O>]" id="qqface_94"></a><a title="[/circle]" id="qqface_95"></a>			<a title="[/kotow]" id="qqface_96"></a><a title="[/turn]" id="qqface_97"></a><a title="[/skip]" id="qqface_98"></a>			<a title="[/oY]" id="qqface_99"></a><a title="[/#-O]" id="qqface_100"></a><a title="[/hiphop]" id="qqface_101"></a>			<a title="[/kiss]" id="qqface_102"></a><a title="[/<&]" id="qqface_103"></a><a title="[/&>]" id="qqface_104"></a>		</div>		<div class="custImg" id="custImgPanel" style="display:none;"></div>		<div class="facetab">			<a class="face_switch_button" id="faceImgTrigger">默认</a><a class="face_switch_button" id="custImgTrigger">自定义表情(漫游)</a>			<a class="img_upload_icon" href="#">添加自定义表情</a>			<form class="upload_cust_img_form" target="custom_face_iframe" action="http://web.qq.com/cgi-bin/cface_upload" method="POST" enctype="multipart/form-data">				<input id="img_upload_icon" class="upload_cust_img" name="custom_face" type="file" size="1">				<input name="go" type="submit" value="Send File" style="display:none;">				<input name="f" type="hidden" value="WEBQQ.obj.QQClient.mainPanel._custImgPanelRePre" >			</form>		</div>		<div id="faceUploadNotice" style="display:none;" ></div>	</div>	';
        O.innerHTML = '	<div class="faceBg">		<div class="faceImg" id="faceImgPanel_g">			<a title="[/:)]" id="qqface_g_0" ></a><a title="[/:~]" id="qqface_g_1"></a><a title="[/:B]" id="qqface_g_2"></a>			<a title="[/:|]" id="qqface_g_3"></a><a title="[/8-)]" id="qqface_g_4"></a><a title="[/:<]" id="qqface_g_5"></a>			<a title="[/:$]" id="qqface_g_6"></a><a title="[/:X]" id="qqface_g_7"></a><a title="[/:Z]" id="qqface_g_8"></a>			<a title="[/:\'(]" id="qqface_g_9"></a><a title="[/:-|]" id="qqface_g_10"></a><a title="[/:@]" id="qqface_g_11"></a>			<a title="[/:P]" id="qqface_g_12"></a><a title="[/:D]" id="qqface_g_13"></a><a title="[/:O]" id="qqface_g_14"></a>			<a title="[/:(]" id="qqface_g_15"></a><a title="[/:+]" id="qqface_g_16"></a><a title="[/--b]" id="qqface_g_17"></a>			<a title="[/:Q]" id="qqface_g_18"></a><a title="[/:T]" id="qqface_g_19"></a><a title="[/;P]" id="qqface_g_20"></a>			<a title="[/;-D]" id="qqface_g_21"></a><a title="[/;d]" id="qqface_g_22"></a><a title="[/;o]" id="qqface_g_23"></a>			<a title="[/:g]" id="qqface_g_24"></a><a title="[/|-)]" id="qqface_g_25"></a><a title="[/:!]" id="qqface_g_26"></a>			<a title="[/:L]" id="qqface_g_27"></a><a title="[/:>]" id="qqface_g_28"></a><a title="[/:;]" id="qqface_g_29"></a>			<a title="[/;f]" id="qqface_g_30"></a><a title="[/:-S]" id="qqface_g_31"></a><a title="[/?]" id="qqface_g_32"></a>			<a title="[/;x]" id="qqface_g_33"></a><a title="[/;@]" id="qqface_g_34"></a><a title="[/:8]" id="qqface_g_35"></a>			<a title="[/;!]" id="qqface_g_36"></a><a title="[/!!!]" id="qqface_g_37"></a><a title="[/xx]" id="qqface_g_38"></a>			<a title="[/bye]" id="qqface_g_39"></a><a title="[/wipe]" id="qqface_g_40"></a><a title="[/dig]" id="qqface_g_41"></a>			<a title="[/handclap]" id="qqface_g_42"></a><a title="[/&-(]" id="qqface_g_43"></a><a title="[/B-)]" id="qqface_g_44"></a>			<a title="[/<@]" id="qqface_g_45"></a><a title="[/@>]" id="qqface_g_46"></a><a title="[/:-O]" id="qqface_g_47"></a>			<a title="[/>-|]" id="qqface_g_48"></a><a title="[/P-(]" id="qqface_g_49"></a><a title="[/:\'|]" id="qqface_g_50"></a>			<a title="[/X-)]" id="qqface_g_51"></a><a title="[/:*]" id="qqface_g_52"></a><a title="[/@x]" id="qqface_g_53"></a>			<a title="[/8*]" id="qqface_g_54"></a><a title="[/pd]" id="qqface_g_55"></a><a title="[/<W>]" id="qqface_g_56"></a>			<a title="[/beer]" id="qqface_g_57"></a><a title="[/basketb]" id="qqface_g_58"></a><a title="[/oo]" id="qqface_g_59"></a>			<a title="[/coffee]" id="qqface_g_60"></a><a title="[/eat]" id="qqface_g_61"></a><a title="[/pig]" id="qqface_g_62"></a>			<a title="[/rose]" id="qqface_g_63"></a><a title="[/fade]" id="qqface_g_64"></a><a title="[/showlove]" id="qqface_g_65"></a>			<a title="[/heart]" id="qqface_g_66"></a><a title="[/break]" id="qqface_g_67"></a><a title="[/cake]" id="qqface_g_68"></a>			<a title="[/li]" id="qqface_g_69"></a><a title="[/bome]" id="qqface_g_70"></a><a title="[/kn]" id="qqface_g_71"></a>			<a title="[/footb]" id="qqface_g_72"></a><a title="[/ladybug]" id="qqface_g_73"></a><a title="[/shit]" id="qqface_g_74"></a>			<a title="[/moon]" id="qqface_g_75"></a><a title="[/sun]" id="qqface_g_76"></a><a title="[/gift]" id="qqface_g_77"></a>			<a title="[/hug]" id="qqface_g_78"></a><a title="[/strong]" id="qqface_g_79"></a><a title="[/weak]" id="qqface_g_80"></a>			<a title="[/share]" id="qqface_g_81"></a><a title="[/v]" id="qqface_g_82"></a><a title="[/@)]" id="qqface_g_83"></a>			<a title="[/jj]" id="qqface_g_84"></a><a title="[/@@]" id="qqface_g_85"></a><a title="[/bad]" id="qqface_g_86"></a>			<a title="[/loveu]" id="qqface_g_87"></a><a title="[/no]" id="qqface_g_88"></a><a title="[/ok]" id="qqface_g_89"></a>			<a title="[/love]" id="qqface_g_90"></a><a title="[/<L>]" id="qqface_g_91"></a><a title="[/jump]" id="qqface_g_92"></a>			<a title="[/shake]" id="qqface_g_93"></a><a title="[/<O>]" id="qqface_g_94"></a><a title="[/circle]" id="qqface_g_95"></a>			<a title="[/kotow]" id="qqface_g_96"></a><a title="[/turn]" id="qqface_g_97"></a><a title="[/skip]" id="qqface_g_98"></a>			<a title="[/oY]" id="qqface_g_99"></a><a title="[/#-O]" id="qqface_g_100"></a><a title="[/hiphop]" id="qqface_g_101"></a>			<a title="[/kiss]" id="qqface_g_102"></a><a title="[/<&]" id="qqface_g_103"></a><a title="[/&>]" id="qqface_g_104"></a>		</div>	</div>	';
        document.body.appendChild(ad);
        document.body.appendChild(O);
        this._face_panel_ref_g = O;
        this._face_panel_ref = ad;
        this._faceImgPanel = c.get("faceImgPanel");
        this._faceImgPanel_g = c.get("faceImgPanel_g");
        this._custImgPanel = c.get("custImgPanel");
        this._custImgTrigger = c.get("custImgTrigger");
        this._faceImgTrigger = c.get("faceImgTrigger");
        this._custImgTab = new WEBQQ.cls.Tab();
        this._custImgTab.add({
            trigger: this._faceImgTrigger,
            sheet: this._faceImgPanel
        });
        this._custImgTab.add({
            trigger: this._custImgTrigger,
            sheet: this._custImgPanel
        });
        this._custImgTab.config.triggerEvent = "click";
        this._custImgTab.config.slideEnabled = false;
        this._faceUploadNotice_ref = c.get("faceUploadNotice");
        this._is_cface_empty = false;
        this._new_custom_face = null;
        this._a_little_clock_tick_tick = null;
        this._the_first_time_init_self_define_img = true;
        this._secret_record_the_selection_postion = null;
        this._custface_img_size = 80;
        this._custface_img_size_with_boder = 81;
        this._2addIEFace = function(i, aB) {
            var az = WEBQQ.obj.QQClient.mainPanel;
            var ax = document.selection;
            if (ax && ax.createRange) {
                var ay = ax.createRange();
                if (az._secret_record_the_selection_postion != null) {
                    ay = az._secret_record_the_selection_postion
                }
                ay.text = aB;
                try {
                    ay.moveStart("character", -strlen(aB))
                } catch(aA) {}
            } else {
                i.value += aB
            }
        };
        this._2addNotIEFace = function(i, ay) {
            var ax = document.selection;
            if (! (typeof i.selectionStart == "undefined")) {
                i.value = i.value.substr(0, i.selectionStart) + ay + i.value.substr(i.selectionEnd)
            } else {
                i.value += ay
            }
        };
        this._re_sort_data_by_timestamp = function() {
            var aB = custom_face.data;
            var aA = 0;
            var az = 0;
            var ax = false;
            for (aA = 0; aA < aB.length; aA++) {
                if (ax) {
                    break
                } else {
                    ax = true
                }
                for (az = 0; az < aB.length - aA - 1; az++) {
                    if (aB[az][1] > aB[az + 1][1]) {
                        var ay = aB[az + 1];
                        aB[az + 1] = aB[az];
                        aB[az] = ay;
                        ax = false
                    }
                }
            }
            return aB
        };
        this._img_resize_and_centered = function(aA, i) {
            if (aA.width > i || aA.height > i) {
                if (aA.width > aA.height) {
                    var ay = (parseInt(i) / parseInt(aA.width));
                    ay = i - ay.toFixed(3) * parseInt(aA.height);
                    ay = ay / i;
                    ay = (ay / 2).toFixed(3) * 100;
                    c.setStyle(aA, "width", i + "px");
                    c.setStyle(aA, "height", "auto");
                    c.setStyle(aA, "margin-top", ay + "%");
                    c.setStyle(aA, "margin-bottom", ay + "%");
                    c.setStyle(aA, "bottom", "-" + ay + "%")
                } else {
                    if (aA.width < aA.height) {
                        var ay = (parseInt(i) / parseInt(aA.height));
                        ay = i - ay.toFixed(3) * parseInt(aA.width);
                        ay = ay / i;
                        ay = (ay / 2).toFixed(3) * 100;
                        c.setStyle(aA, "height", i + "px");
                        c.setStyle(aA, "width", "auto");
                        c.setStyle(aA, "margin-left", ay + "%");
                        c.setStyle(aA, "margin-right", ay + "%")
                    } else {
                        c.setStyle(aA, "width", i + "px");
                        c.setStyle(aA, "height", i + "px")
                    }
                }
            } else {
                var ax = ((i - parseInt(aA.width)) / i / 2).toFixed(3) * 100;
                var az = ((i - parseInt(aA.height)) / i / 2).toFixed(3) * 100;
                c.setStyle(aA, "margin-top", az + "%");
                c.setStyle(aA, "margin-bottom", az + "%");
                c.setStyle(aA, "bottom", "-" + az + "%");
                c.setStyle(aA, "margin-left", ax + "%");
                c.setStyle(aA, "margin-right", ax + "%")
            }
        };
        this._custImgPanelReCall = function() {
            if (this._the_first_time_init_self_define_img == true) {
                this._new_custom_face = this._re_sort_data_by_timestamp();
                this._custImgPanel.innerHTML = "";
                var aD = "http://web.qq.com/cgi-bin/webqq_app/?cmd=2&bd=";
                var aB = this._new_custom_face.length;
                var az = "custface";
                if (!aB) {
                    this._is_cface_empty = true;
                    this._custImgPanel.innerHTML = '<div style="position:relative;border:0px;height:40px;width:100px;top:90px;left:150px;">				<div style="text-align:center; 				border:0px;				height: 20px; line-height: 20px; width: 100px;">暂无自定义表情</div>				<div style="text-align: center; height: 20px;				 border:0px;background:transparent url(images/icon.gif) no-repeat scroll -545px -772px;				 line-height: 20px; width: 80px;margin-left:8px;">				 <a style="height:20px;width:80px;				 cursor:pointer;">				 立即添加</a>				 <form enctype="multipart/form-data" style="cursor:pointer;float:left;height:20px;margin:-20px 0 0 0;				 opacity:0;overflow:hidden;				 filter:alpha(opacity=0);				 width:100px;"				 method="POST" action="http://web.qq.com/cgi-bin/cface_upload" target="custom_face_iframe" 				 class="upload_cust_img_form">				 <input id="img_upload_icon2" style="cursor:pointer;display:block;float:left;					height:20px;overflow:hidden;width:80px;"				 type="file" size="1" name="custom_face" class="upload_cust_img" id="img_upload_icon"/>				 <input type="submit" style="display: none;" value="Send File" name="go"/>				 <input type="hidden" value="WEBQQ.obj.QQClient.mainPanel._custImgPanelRePre" name="f"/>				 </form>				 </div>				 </div>';
                    e.on(c.get("img_upload_icon2"), "change",
                    function(aF, aG) {
                        YAHOO.util.Event.preventDefault(aF);
                        var aE = this;
                        if (! (/.[jpeg|jpg|gif|bmp|png|tiff]$/i).test(aE.value)) {
                            aG._face_upload_notice("禁止上传的文件类型");
                            return 0
                        }
                        var i = aG._getFileSize(aE);
                        if (i > 0) {
                            if (i > 250 * 1024) {
                                aG._face_upload_notice("文件大小超过250KB");
                                return 0
                            }
                        }
                        this.parentNode.submit();
                        this.parentNode.reset()
                    },
                    this)
                }
                for (var aA = 0; aA < aB; aA++) {
                    var ay = document.createElement("img");
                    ay.title = "[自定义表情" + parseInt(aA + 1) + "]";
                    var aC = document.createElement("div");
                    var ax = document.createElement("a");
                    ax.href = "";
                    ax.appendChild(ay);
                    aC.appendChild(ax);
                    ay.id = az + aA;
                    this._custImgPanel.appendChild(aC);
                    e.on(ay, "load",
                    function(i, aF) {
                        var aE = WEBQQ.obj.QQClient.mainPanel;
                        aE._img_resize_and_centered(aF, aE._custface_img_size)
                    },
                    ay);
                    e.on(aC, "mouseover",
                    function(i, aE) {
                        c.setStyle(aE, "border-color", "#1E90FF")
                    },
                    aC);
                    e.on(aC, "mouseout",
                    function(i, aE) {
                        c.setStyle(aE, "border-color", "#DFE6F6")
                    },
                    aC);
                    e.on(aC, "click",
                    function(aE, aG) {
                        var aF = WEBQQ.obj.QQClient.mainPanel;
                        e.preventDefault(aE);
                        aF.mf_FaceHide();
                        var i = aF._tabsManage._actTalkWin._talkTabs.mf_getActUinMsg();
                        i.input.focus();
                        if (e.isIE) {
                            aF._2addIEFace(i.input, aG.title)
                        } else {
                            aF._2addNotIEFace(i.input, aG.title)
                        }
                        i.input.focus()
                    },
                    ay);
                    if (aA < 15) {
                        ay.src = aD + this._new_custom_face[aA][0]
                    } else {
                        ay.src = "images/loading.gif"
                    }
                }
                e.on(this._custImgPanel, "scroll",
                function(aF, aJ) {
                    var aH = WEBQQ.obj.QQClient.mainPanel;
                    if (aH._a_little_clock_tick_tick != null) {
                        clearTimeout(aH._a_little_clock_tick_tick);
                        aH._a_little_clock_tick_tick = null
                    }
                    var aI = "http://web.qq.com/cgi-bin/webqq_app/?cmd=2&bd=";
                    var i = aH._custImgPanel.offsetHeight;
                    var aE = aH._custImgPanel.getElementsByTagName("img");
                    var aG = function() {
                        var aM = (parseInt(aH._custImgPanel.scrollTop) / aH._custface_img_size_with_boder).toFixed(0);
                        aM = aM * 5;
                        var aK = aM;
                        for (; aM < aK + 15; aM++) {
                            if ((aE[aM].src).slice( - 18) == "images/loading.gif") {
                                var aN = aE[aM].parentNode;
                                aN.removeChild(aE[aM]);
                                var aL = document.createElement("img");
                                aN.appendChild(aL);
                                aL.src = aI + aH._new_custom_face[aM][0];
                                e.on(aL, "load",
                                function(aO, aQ) {
                                    var aP = WEBQQ.obj.QQClient.mainPanel;
                                    aP._img_resize_and_centered(aQ, aP._custface_img_size)
                                },
                                aL)
                            } else {}
                        }
                    };
                    aH._a_little_clock_tick_tick = setTimeout(aG, 450)
                },
                this);
                this._the_first_time_init_self_define_img = false
            }
        };
        this._custImgPanelRePre = function(aA) {
            if (aA) {
                if (aA.ret == 0) {
                    this._custImgTab.select({
                        trigger: this._custImgTrigger,
                        sheet: this._custImgPanel
                    });
                    this._face_upload_notice("上传成功");
                    var aE = "http://web.qq.com/cgi-bin/webqq_app/?cmd=2&bd=";
                    var az = "custface";
                    var aB = this._new_custom_face.length;
                    var aC = new Array();
                    aC[0] = aA.msg;
                    aC[1] = 0;
                    this._new_custom_face.push(aC);
                    var ay = document.createElement("img");
                    ay.title = "[自定义表情" + parseInt(aB + 1) + "]";
                    var aD = document.createElement("div");
                    var ax = document.createElement("a");
                    ax.href = "";
                    ax.appendChild(ay);
                    aD.appendChild(ax);
                    if (this._is_cface_empty) {
                        this._custImgPanel.innerHTML = "";
                        this._is_cface_empty = false
                    }
                    this._custImgPanel.appendChild(aD);
                    e.on(ay, "load",
                    function(i, aG) {
                        var aF = WEBQQ.obj.QQClient.mainPanel;
                        aF._img_resize_and_centered(aG, aF._custface_img_size)
                    },
                    ay);
                    ay.src = aE + aA.msg;
                    e.on(aD, "mouseover",
                    function(i, aF) {
                        c.setStyle(aF, "border-color", "#1E90FF")
                    },
                    aD);
                    e.on(aD, "mouseout",
                    function(i, aF) {
                        c.setStyle(aF, "border-color", "#DFE6F6")
                    },
                    aD);
                    e.on(aD, "click",
                    function(aF, aH) {
                        var aG = WEBQQ.obj.QQClient.mainPanel;
                        e.preventDefault(aF);
                        aG.mf_FaceHide();
                        var i = aG._tabsManage._actTalkWin._talkTabs.mf_getActUinMsg();
                        i.input.focus();
                        if (e.isIE) {
                            aG._2addIEFace(i.input, aH.title)
                        } else {
                            aG._2addNotIEFace(i.input, aH.title)
                        }
                        i.input.focus()
                    },
                    ay)
                } else {
                    switch (aA.ret) {
                    case 1:
                        this._face_upload_notice("文件格式错误");
                        break;
                    case 3:
                        this._face_upload_notice("文件大小超过250KB");
                        break;
                    case 4:
                        this._face_upload_notice("此自定义表情已存在");
                        break;
                    default:
                        this._face_upload_notice("发生上传错误")
                    }
                }
            } else {
                this.mf_getRemoteJs("http://web.qq.com/cgi-bin/webqq_app/?cmd=1", this._custImgPanelReCall, this)
            }
        };
        this._face_upload_notice = function(ax) {
            var ay = this;
            var i = this._face_upload_notice.t;
            if (i) {
                clearTimeout(i)
            }
            this._faceUploadNotice_ref.innerHTML = ax;
            this._faceUploadNotice_ref.style.display = "block";
            i = setTimeout(function() {
                ay._faceUploadNotice_ref.style.display = "none"
            },
            2000)
        };
        this._custImgTab.onShow.subscribe(function(ax, i) {
            var ay = WEBQQ.obj.QQClient.mainPanel;
            if (i[0].sheet.id == "custImgPanel") {
                ay._custImgPanelRePre()
            }
        });
        this._custImgTab.setConfig({
            defaultIndex: -1
        });
        this._custImgTab.init();
        this._custImgTab.select({
            trigger: this._faceImgTrigger,
            sheet: this._faceImgPanel
        });
        this._getFileSize = function(aA) {
            var az = new Image();
            var ax = aA.value;
            var i = 0;
            try {
                az.dynsrc = ax
            } catch(ay) {
                return 0
            }
            try {
                i = az.fileSize || 0
            } catch(ay) {}
            if (i == 0) {
                try {
                    i = aA.files[0].fileSize
                } catch(ay) {}
            }
            return i
        };
        e.on(c.get("img_upload_icon"), "change",
        function(ay, az) {
            YAHOO.util.Event.preventDefault(ay);
            var ax = this;
            if (! (/.[jpeg|jpg|gif|bmp|png|tiff]$/i).test(ax.value)) {
                az._face_upload_notice("禁止上传的文件类型");
                return 0
            }
            var i = az._getFileSize(ax);
            if (i > 0) {
                if (i > 250 * 1024) {
                    az._face_upload_notice("文件大小超过250KB");
                    return 0
                }
            }
            this.parentNode.submit();
            this.parentNode.reset()
        },
        this);
        this._tabsManage = new WEBQQ.cls.TabsManage(this, {});
        this._taskBar = WEBQQ.cls.Taskbar.getInstance();
        this._menu_tabs_el = c.get(this._id + "_menu_tabs");
        this._impression_of_my_el = c.get(this._id + "_impression_of_my");
        this._impression_of_buddy_el = c.get(this._id + "_impression_of_buddy");
        this._message_area_el = c.get(this._id + "_message_area");
        this._msg_box_tab_head_el = c.get(this._id + "_msg_box_tab_head");
        this._msg_box_el = c.get(this._id + "_msg_box");
        this._refresh_msg_box_button_el = c.get(this._id + "_refresh_msg_box_button");
        this._buddys_feeds_tab_head_el = c.get(this._id + "_buddys_feeds_tab_head");
        this._buddys_feeds_el = c.get(this._id + "_buddys_feeds");
        this._refresh_buddys_feeds_button_el = c.get(this._id + "_refresh_buddys_feeds_button");
        this._buddys_impressions_tab_head_el = c.get(this._id + "_buddys_impressions_tab_head");
        this._buddys_impressions_el = c.get(this._id + "_buddys_impressions");
        this._refresh_buddys_impressions_button_el = c.get(this._id + "_refresh_buddys_impressions_button");
        this._web_browser_tab_head_el = c.get(this._id + "_web_browser_tab_head");
        this._web_browser_el = c.get(this._id + "_web_browser");
        this._refresh_web_browser_button_el = c.get(this._id + "_refresh_web_browser_button");
        this._web_browser_iframe_el = c.get("web_browser_iframe");
        var v = this;
        e.on(this._web_browser_iframe_el, "load",
        function() {
            e.removeListener(window.frames.web_browser_iframe.document, "mouseup", v.hideRecommendList);
            e.on(window.frames.web_browser_iframe.document, "mouseup", v.hideRecommendList, v, true);
            e.removeListener(window.frames.web_browser_iframe.document, "keydown", v.mf_ShortKey);
            e.on(window.frames.web_browser_iframe.document, "keydown", v.mf_ShortKey, v, true);
            e.removeListener(window.frames.web_browser_iframe, "mouseup", v.hideRecommendList);
            e.on(window.frames.web_browser_iframe, "mouseup", v.hideRecommendList, v, true);
            e.removeListener(window.frames.web_browser_iframe, "keydown", v.mf_ShortKey);
            e.on(window.frames.web_browser_iframe, "keydown", v.mf_ShortKey, v, true)
        },
        this, true);
        e.on(this._music_box_iframe_el, "load",
        function() {
            e.removeListener(window.frames.music_box_iframe.document, "keydown", v.mf_ShortKey);
            e.on(window.frames.music_box_iframe.document, "keydown", v.mf_ShortKey, v, true)
        },
        this, true);
        this._web_browser_home_button_el = c.get("web_browser_home_button");
        this._web_browser_recommend_button_el = c.get("web_browser_recommend_button");
        this._webqq_top_el = c.get("webqq_top");
        this._taskbar_el = c.get("Taskbar_taskbar");
        this._web_browser_enter_button_el = c.get("web_browser_enter_button");
        this._web_browser_max_button_el = c.get("web_browser_max_button");
        this._web_browser_clear_button_el = c.get("web_browser_clear_button");
        this._web_browser_refresh_button_el = c.get("web_browser_refresh_button");
        this._web_browser_back_button_el = c.get("web_browser_back_button");
        this._web_browser_forward_button_el = c.get("web_browser_forward_button");
        this._web_browser_address_input_el = c.get("web_browser_address_input");
        this._music_box_tab_head_el = c.get(this._id + "_music_box_tab_head");
        this._music_box_el = c.get(this._id + "_music_box");
        this._refresh_music_box_button_el = c.get(this._id + "_refresh_music_box_button");
        this._music_box_iframe_el = c.get("music_box_iframe");
        this._setting_center_tab_head_el = c.get(this._id + "_setting_center_tab_head");
        this._setting_center_el = c.get(this._id + "_setting_center");
        this._close_setting_center_button_el = c.get(this._id + "_close_setting_center_button");
        this._setting_center_tabhead0_el = c.get("setting_center_tabhead0");
        this._setting_center_tabhead1_el = c.get("setting_center_tabhead1");
        this._setting_center_tabbody0_el = c.get("setting_center_tabbody0");
        this._setting_center_tabbody1_el = c.get("setting_center_tabbody1");
        this._msgbox_set_display_el = c.get("msgbox_set_display");
        this._msgbox_set_default_el = c.get("msgbox_set_default");
        this._buddy_state_set_display_el = c.get("buddy_state_set_display");
        this._buddy_state_set_default_el = c.get("buddy_state_set_default");
        this._impression_set_display_el = c.get("impression_set_display");
        this._impression_set_default_el = c.get("impression_set_default");
        this._musicbox_set_display_el = c.get("musicbox_set_display");
        this._musicbox_set_default_el = c.get("musicbox_set_default");
        this._web_browser_set_display_el = c.get("web_browser_set_display");
        this._web_browser_set_default_el = c.get("web_browser_set_default");
        this._setting_center_tabbody0_submit_el = c.get("setting_center_tabbody0_submit");
        this._setting_center_tabbody0_cancel_el = c.get("setting_center_tabbody0_cancel");
        this._buddy_details_tab_head_el = c.get(this._id + "_buddy_details_tab_head");
        this._buddy_details_el = c.get(this._id + "_buddy_details");
        this._close_buddy_details_button_el = c.get(this._id + "_close_buddy_details_button");
        this._buddy_manager_tab_head_el = c.get(this._id + "_buddy_manager_tab_head");
        this._buddy_manager_el = c.get(this._id + "_buddy_manager");
        this._buddy_manager_iframe_el = c.get("buddy_manager_iframe");
        this._close_buddy_manager_button_el = c.get(this._id + "_close_buddy_manager_button");
        this._finger_friend_tab_head_el = c.get(this._id + "_finger_friend_tab_head");
        this._finger_friend_el = c.get(this._id + "_finger_friend");
        this._close_finger_friend_button_el = c.get(this._id + "_close_finger_friend_button");
        this._chatlog_tab_head_el = c.get(this._id + "_chatlog_tab_head");
        this._chatlog_el = c.get(this._id + "_chatlog");
        this._close_chatlog_button_el = c.get(this._id + "_close_chatlog_button");
        e.on(this._refresh_msg_box_button_el, "click", this.mf_refreshMailMsg, this, true);
        e.on(this._refresh_buddys_feeds_button_el, "click", this.mf_refreshBuddyFeeds, this, true);
        e.on(this._refresh_buddys_impressions_button_el, "click", this.mf_refreshImpressionOfBuddys, this, true);
        e.on(this._close_finger_friend_button_el, "click", this.mf_clickCloseAddBuddyTab, this, true);
        e.on(this._close_buddy_details_button_el, "click", this.mf_clickCloseBuddyDetailsTab, this, true);
        e.on(this._close_buddy_manager_button_el, "click", this.mf_clickCloseBuddyManagerTab, this, true);
        e.on(this._close_chatlog_button_el, "click", this.mf_clickCloseChatlogTab, this, true);
        e.on(this._close_setting_center_button_el, "click", this.clickCloseSettingCenterTab, this, true);
        e.on(this._setting_center_tabbody0_submit_el, "click", this.clickSubmitSettingCenterTab, this, true);
        e.on(this._setting_center_tabbody0_cancel_el, "click", this.clickCloseSettingCenterTab, this, true);
        e.on(document.body, "click",
        function() {
            pgvWatchClick()
        },
        this, true);
        e.on(this._weather_button_el, "mouseover", this.showMoreWeatherBoard, this, true);
        e.on(this._weather_button_el, "mouseout", this.hideMoreWeatherBoard, this, true);
        e.on(this._more_weather_board_el, "mouseover", this.showMoreWeatherBoard, this, true);
        e.on(this._more_weather_board_el, "mouseout", this.hideMoreWeatherBoard, this, true);
        e.on(document, "click", this.mf_HideQzoneWindow, this, true);
        e.on(this._show_qzoneBlog_el, "click", this.mf_DontHideQzoneWindow, this, true);
        e.on(this._status_menu_button_node, "click", this.mf_clickStatusMenu, this, true);
        e.on(this._tabs_setting_el, "click", this.openSettingCenterTab, this, true);
        e.on(this._my_qqlevel_button_node, "click", this.mf_clickMyQQLevelButton, this, true);
        e.on(this._setting_menu_el, "click", this.mf_clickSettingMenu, this, true);
        e.on(this._message_area_el.parentNode, "click", this.mf_HideActWindow, this, true);
        e.on(this._taskBar._eleRef, "click", this.mf_HideActWindow, this, true);
        e.on(this._user_friend_el, "click", this.mf_FriendExpand, this, true);
        e.on(this._user_class_el, "click", this.mf_ClassExpand, this, true);
        e.on(this._signature_el, "mouseover", this.mf_MouseoverSignature, this, true);
        e.on(this._signature_el, "mouseout", this.mf_MouseoutSignature, this, true);
        e.on(this._signature_el, "mousedown", this.mf_ModifySignature, this, true);
        e.on(this._signature_input_el, "change", this.mf_update_signature_input, this);
        e.on(this._signature_input_el, "blur", this.mf_handleSignatureInputBlur, this, true);
        e.on(this._signature_input_el, "keydown", this.signatureInputOnKeydownHandler, this);
        e.on(document, "keydown", this.mf_ShortKey, this, true);
        var P = window.frames;
        for (var am = 0; am < P.length; am++) {
            e.on(P[am], "keydown", this.mf_ShortKey, this, true)
        }
        e.on(this._qq_lock_button_el, "click", this.handleClickToLockQQ, this, true);
        e.on(this._qqtitle_exit_el, "click", this.mf_CloseWindow, this, true);
        e.on(this._search_input_el, "keyup", this.mf_SearchFriend, this, true);
        e.on(this._search_input_el, "mouseout", this.mf_SearchInputMouseOut, this, true);
        e.on(this._search_button_el, "click", this.mf_OpenFriend, this, true);
        e.on(this._search_input_el, "focus",
        function() {
            if (String(this.value).replace(/(^\s|\s$)/gi, "") == "搜索我的好友或群") {
                this.value = ""
            }
        });
        e.on(this._search_input_el, "blur",
        function() {
            if (String(this.value).replace(/(^\s|\s$)/gi, "") == "") {
                this.value = "搜索我的好友或群"
            }
        });
        e.on(this._mail_msg_re_el, "click", this.mf_refreshMailMsg, this, true);
        e.on(this._mail_msg_re_el, "focus",
        function() {
            this.blur()
        });
        e.on(this._friend_offmsg_ex_el, "click", this.mf_ExpandFriendOffMsg, this, true);
        e.on(this._friend_offmsg_ex_el, "focus",
        function() {
            this.blur()
        });
        e.on(this._class_offmsg_ex_el, "click", this.mf_ExpandClassOffMsg, this, true);
        e.on(this._class_offmsg_ex_el, "focus",
        function() {
            this.blur()
        });
        e.on(this._mail_msg_ex_el, "click", this.mf_ExpandMailMsg, this, true);
        e.on(this._mail_msg_ex_el, "focus",
        function() {
            this.blur()
        });
        e.on(this._sysmsg_ex_el, "click", this.mf_ExpandSysMsg, this, true);
        e.on(this._sysmsg_ex_el, "focus",
        function() {
            this.blur()
        });
        e.on(this._qzoneBlog_close_el, "click", this.mf_close_qzoneBlog, this, true);
        e.on(this._web_browser_back_button_el, "click", this.clickWebBrowserBackButton, this, true);
        e.on(this._web_browser_forward_button_el, "click", this.clickWebBrowserForwardButton, this, true);
        e.on(this._web_browser_refresh_button_el, "click", this.clickWebBrowserRefreshButton, this, true);
        e.on(this._web_browser_home_button_el, "click", this.clickWebBrowserHomeButton, this, true);
        e.on(this._web_browser_recommend_button_el, "click", this.clickWebBrowserRecommendButton, this, true);
        e.on(this._web_browser_enter_button_el, "click", this.clickWebBrowserEnterButton, this, true);
        e.on(this._web_browser_max_button_el, "click", this.clickWebBrowserMaxButton, this, true);
        e.on(this._web_browser_clear_button_el, "click", this.clickWebBrowserClearButton, this, true);
        e.on(this._refresh_web_browser_button_el, "click", this.clickWebBrowserEnterButton, this, true);
        e.on(this._web_browser_address_input_el, "click", this.clickWebBrowserAddressInput, this, true);
        e.on(this._web_browser_address_input_el, "blur", this.blurWebBrowserAddressInput, this, true);
        e.on(this._web_browser_address_input_el, "keydown", this.keydownWebBrowserAddressInput, this, true);
        e.on(this._refresh_music_box_button_el, "click", this.clickMusicBoxRefreshButton, this, true);
        this.messageMarquee = new WEBQQ.cls.Marquee({
            speed: 30,
            stopTime: 3000,
            lineHeight: 24,
            isScrollOneLine: false,
            div: c.get("Main_mainwindow_message_marquee"),
            div1: c.get("Main_mainwindow_message_marquee_inner")
        });
        this.messageMarquee.init();
        c.setStyle(this._class_list_el, "display", "none");
        c.setStyle(this._cancel_signature_el, "display", "none");
        for (var am = 0; am < 105; am++) {
            var j = c.get("qqface_" + am);
            e.on(j, "mousedown", this.mf_InsertFace, this, true)
        }
        for (var am = 0; am < 105; am++) {
            var j = c.get("qqface_g_" + am);
            e.on(j, "mousedown", this.mf_InsertFace, this, true)
        }
        this._search_panel_obj = new YAHOO.widget.Overlay(this._search_panel_ref, {
            visible: false,
            context: [null, "bl", "tl"]
        });
        this._search_panel_obj.render();
        this._private_info_panel_obj = new YAHOO.widget.Overlay(this._private_info_panel_ref, {
            iframe: false,
            visible: false,
            context: [null, "bl", "tl"]
        });
        this._private_info_panel_obj.render();
        e.on(window.document, "mouseover",
        function(ax, i) {
            var ay = e.getTarget(ax);
            if (c.isAncestor(i._private_info_panel_ref, ay) || (c.isAncestor(i._user_list_el, ay) && ay.className != "names") || (i._user_list_el == ay) || (i._private_info_panel_ref == ay)) {
                return
            }
            if (i.editingRemarkUin) {
                i.editingRemarkUin = null;
                i.mf_onUserTipBlur.call(i)
            }
            i.buddyOptionTabInTips.cancelSelected();
            i._RemarkInputInTips_node.blur();
            i._private_info_panel_ref.style.display = "none";
            i._private_info_panel_obj.hide()
        },
        this);
        this._sset_panel_obj = new YAHOO.widget.Overlay(this._sset_panel_ref, {
            visible: false,
            context: [null, "bl", "tl"]
        });
        this._sset_panel_obj.render();
        e.on(this._status_menu_panel_node.childNodes[0], "mousedown", this._qqclient.changeStat2Online, this._qqclient, true);
        e.on(this._status_menu_panel_node.childNodes[1], "mousedown", this._qqclient.changeStat2Away, this._qqclient, true);
        e.on(this._status_menu_panel_node.childNodes[2], "mousedown", this._qqclient.changeStat2Invisible, this._qqclient, true);
        e.on(this._status_menu_panel_node.childNodes[3], "mousedown", this._qqclient.changeStat2Offline, this._qqclient, true);
        var s = this;
        e.on(this._status_menu_panel_node.childNodes[4], "mousedown",
        function() {
            setTimeout(function() {
                s.mf_CloseWindow.call(s)
            },
            300)
        },
        s, true);
        e.on(this._setting_menu_panel_node.childNodes[0], "mousedown", this.mf_OpenVoice, this, true);
        e.on(this._setting_menu_panel_node.childNodes[1], "mousedown", this.mf_CloseVoice, this, true);
        e.on(this._setting_menu_panel_node.childNodes[2], "mousedown", this.mf_StopAllMsg, this, true);
        this.isClickWebBrowserTabFirst = 0;
        this.isClickMusicBoxTabFirst = 0;
        this.isFocus = false;
        this.mainTab = new WEBQQ.cls.Tab();
        if (this._qqclient.getBitValue(14, 1) == 0 || true) {
            this.mainTab.add({
                trigger: this._msg_box_tab_head_el,
                sheet: this._msg_box_el
            });
            this._msgbox_set_display_el.checked = true;
            pgvSendClick({
                hottag: "MAINTAB.MSGBOX.ENABLE"
            })
        } else {
            pgvSendClick({
                hottag: "MAINTAB.MSGBOX.DISABLE"
            })
        }
        if (this._qqclient.getBitValue(15, 1) == 0) {
            this.mainTab.add({
                trigger: this._buddys_feeds_tab_head_el,
                sheet: this._buddys_feeds_el
            });
            this._buddy_state_set_display_el.checked = true;
            pgvSendClick({
                hottag: "MAINTAB.BUDDYSTATE.ENABLE"
            })
        } else {
            pgvSendClick({
                hottag: "MAINTAB.BUDDYSTATE.DISABLE"
            })
        }
        if (this._qqclient.getBitValue(16, 1) == 0) {
            this.mainTab.add({
                trigger: this._buddys_impressions_tab_head_el,
                sheet: this._buddys_impressions_el
            });
            this._impression_set_display_el.checked = true;
            pgvSendClick({
                hottag: "MAINTAB.IMPRESSION.ENABLE"
            })
        } else {
            pgvSendClick({
                hottag: "MAINTAB.IMPRESSION.DISABLE"
            })
        }
        if (this._qqclient.getBitValue(17, 1) == 0) {
            if (window.ActiveXObject) {
                var X = c.get("musicbox_setting_item");
                if (X) {
                    X.style.display = "inline"
                }
                this.mainTab.add({
                    trigger: this._music_box_tab_head_el,
                    sheet: this._music_box_el
                });
                this._musicbox_set_display_el.checked = true;
                pgvSendClick({
                    hottag: "MAINTAB.QQMusic.ENABLE"
                })
            }
        } else {
            pgvSendClick({
                hottag: "MAINTAB.QQMusic.DISABLE"
            })
        }
        if (this._qqclient.getBitValue(18, 1) == 0) {
            this.mainTab.add({
                trigger: this._web_browser_tab_head_el,
                sheet: this._web_browser_el
            });
            this._web_browser_set_display_el.checked = true;
            pgvSendClick({
                hottag: "MAINTAB.WEBBROWSER.ENABLE"
            })
        } else {
            pgvSendClick({
                hottag: "MAINTAB.WEBBROWSER.DISABLE"
            })
        }
        this._urlTips = this._web_browser_address_input_el.value;
        this.mainTab.config.triggerEvent = "click";
        this.mainTab.config.slideEnabled = false;
        this.mainTab.onShow.subscribe(function(ax, i) {
            var ay = WEBQQ.obj.QQClient.mainPanel;
            switch (i[0].trigger) {
            case ay._msg_box_tab_head_el:
                document.title = "消息盒子 - " + ay._qqclient.uin;
                pgvSendClick({
                    hottag: "MainTab.MsgBox.点击消息盒子Tab"
                });
                break;
            case ay._buddys_feeds_tab_head_el:
                document.title = "好友近况 - " + ay._qqclient.uin;
                pgvSendClick({
                    hottag: "MainTab.BuddyState.click_BuddyState_Tab"
                });
                break;
            case ay._buddys_impressions_tab_head_el:
                document.title = "好友印象 - " + ay._qqclient.uin;
                pgvSendClick({
                    hottag: "MainTab.Impression.click_Impression_Tab"
                });
                break;
            case ay._music_box_tab_head_el:
                document.title = "QQ 音乐 - " + ay._qqclient.uin;
                if (ay.isClickMusicBoxTabFirst === 0) {
                    ay.openUrlInMusicBox();
                    ay.isClickMusicBoxTabFirst = 1
                }
                pgvSendClick({
                    hottag: "MainTab.QQMusic.click_QQMusic_Tab"
                });
                break;
            case ay._web_browser_tab_head_el:
                document.title = "浏览网页 - " + ay._qqclient.uin;
                if (ay.isClickWebBrowserTabFirst === 0) {
                    ay.openBrowserHome();
                    ay.isClickWebBrowserTabFirst = 1
                }
                pgvSendClick({
                    hottag: "MainTab.WebBrowser.click_WebBrowser_Tab"
                });
                break;
            case ay._buddy_details_tab_head_el:
                document.title = "详细资料 - " + ay._qqclient.uin;
                pgvSendClick({
                    hottag: "MainTab.Detail.click_Detail_Tab"
                });
                break;
            case ay._buddy_manager_tab_head_el:
                document.title = "管理好友 - " + ay._qqclient.uin;
                pgvSendClick({
                    hottag: "MainTab.BuddyManager.click_BuddyManager_Tab"
                });
                break;
            case ay._finger_friend_tab_head_el:
                document.title = "添加好友 - " + ay._qqclient.uin;
                pgvSendClick({
                    hottag: "MainTab.AddBuddy.click_AddBuddy_Tab"
                });
                break;
            default:
                break
            }
        });
        this.mainTab.init();
        this.addBuddy = WEBQQ.cls.AddBuddy.getInstance();
        e.on(this._AddBuddyButtonInTips_node, "click", this.addBuddy.clickAddBuddyButton, this.addBuddy);
        this.settingCenterTabs = new WEBQQ.cls.Tab();
        this.settingCenterTabs.add({
            trigger: this._setting_center_tabhead0_el,
            sheet: this._setting_center_tabbody0_el
        });
        this.settingCenterTabs.config.triggerEvent = "click";
        this.settingCenterTabs.config.slideEnabled = false;
        this.settingCenterTabs.init()
    };
    WEBQQ.cls.MainPanel.getInstance = function() {
        if (!WEBQQ.cls.MainPanel.prototype.instance) {
            WEBQQ.cls.MainPanel.prototype.instance = new WEBQQ.cls.MainPanel("mainwindow")
        }
        return WEBQQ.cls.MainPanel.prototype.instance
    };
    WEBQQ.cls.MainPanel.Destroy = function() {
        if (WEBQQ.cls.MainPanel.prototype.instance) {
            WEBQQ.cls.MainPanel.prototype.instance.destroy();
            WEBQQ.cls.MainPanel.prototype.instance = null
        }
    };
    WEBQQ.cls.MainPanel.prototype = {
        mf_onUserTipBlur: function(g, j) {
            if (!g) {
                g = this._RemarkInputInTips_node.getAttribute("uin");
                j = this._RemarkInputInTips_node.value
            }
            this.checkRealnameInputInTips.call(this);
            if (!this._qqclient.bdylist.allUsers[g]) {
                return
            }
            var i = this._qqclient.bdylist.allUsers[g].remark;
            if (j != i) {
                var f = this,
                h = {
                    onSuccess: function(q) {
                        var p = this._qqclient.sc.sc0x3e(q);
                        YAHOO.log("sc0x3e: ret=" + p);
                        if (0 == p) {
                            var l = q.info.uin,
                            r = q.info.remark;
                            var n = this._qqclient.bdylist.allUsers[l];
                            if (!n || (!this._group_el[n.group_id])) {
                                return false
                            }
                            if (r == "") {
                                r = n.nick
                            }
                            var o = this._group_el[n.group_id].user_ele[l];
                            if (!o) {
                                return false
                            }
                            o.title = String(r).forTitle() + "<" + l + ">";
                            o.childNodes[1].innerHTML = String(r).forHtml();
                            var m = this._group_el._1000;
                            if (m && m.user_ele[l]) {
                                m.user_ele[l].title = String(r).forTitle() + "<" + l + ">";
                                m.user_ele[l].childNodes[1].innerHTML = String(r).forHtml()
                            }
                            var k = this._tabsManage._uin2container[l];
                            if (k) {
                                k.mf_setTitle(l, n.nick)
                            }
                            if (this._QQTips_buddy_name_node.getAttribute("uin") == n.uin) {
                                var s = n.remark ? (n.remark + "(" + n.nick + ")<" + n.uin + ">") : (n.nick + "<" + n.uin + ">");
                                this._QQTips_buddy_name_node.innerHTML = s.forHtml();
                                this._QQTips_buddy_name_node.setAttribute("title", s.forTitle() + ", 点击查看详细资料");
                                this._QQTips_buddy_name_node.setAttribute("uin", n.uin)
                            }
                        }
                    },
                    onFail: function() {},
                    sscope: f,
                    fscope: f,
                    arguments: {
                        info: {
                            uin: g,
                            remark: j
                        }
                    },
                    cmd: "3e",
                    body: f._qqclient.cs.cs0x3e_0x05(g, encodeURIComponent(j))
                };
                this._qqclient.getCmdInfo(h)
            }
        },
        showMoreWeatherBoard: function() {
            var f = c.getXY(this._weather_button_el);
            window.clearTimeout(this._weatherTimer);
            c.setStyle(this._more_weather_board_el, (f[0] - 250) + "left", "px");
            c.setStyle(this._more_weather_board_el, f[1] + "top", "px");
            c.setStyle(this._more_weather_board_el, "display", "block")
        },
        hideMoreWeatherBoard: function() {
            var f = this;
            this._weatherTimer = window.setTimeout(function() {
                c.setStyle(f._more_weather_board_el, "display", "none")
            },
            500)
        },
        mf_resetDocumentTitle: function() {
            switch (this.mainTab.currentTab.trigger) {
            case this._msg_box_tab_head_el:
                document.title = "消息盒子 - " + this._qqclient.uin;
                break;
            case this._buddys_feeds_tab_head_el:
                document.title = "好友近况 - " + this._qqclient.uin;
                break;
            case this._buddys_impressions_tab_head_el:
                document.title = "好友印象 - " + this._qqclient.uin;
                break;
            case this._buddy_details_tab_head_el:
                document.title = "详细资料 - " + this._qqclient.uin;
                break;
            case this._buddy_manager_tab_head_el:
                document.title = "管理好友 - " + this._qqclient.uin;
                break;
            case this._music_box_tab_head_el:
                document.title = "QQ 音乐 - " + this._qqclient.uin;
                break;
            case this._web_browser_tab_head_el:
                document.title = "浏览网页 - " + this._qqclient.uin;
                break;
            case this._finger_friend_tab_head_el:
                document.title = "添加好友 - " + this._qqclient.uin;
                break;
            default:
                break
            }
        },
        loadWeather: function() {
            this.mf_getRemoteJs("http://www.soso.com/tb.q?fn=WEBQQ.obj.QQClient.mainPanel.handleLoadWeather")
        },
        handleLoadWeather: function(f) {
            f = f.split(";");
            this._CityAndTemperature_el.innerHTML = f[0] + "&nbsp;" + f[1] + "~" + f[2];
            this._WeatherPic_el.src = f[3]
        },
        openMsgboxTab: function() {
            var f = this.mainTab.indexOf({
                trigger: this._msg_box_tab_head_el,
                sheet: this._msg_box_el
            });
            if (f == -1) {
                this.addMsgboxTab()
            } else {
                this.selectMsgboxTab()
            }
        },
        addMsgboxTab: function() {
            this.mainTab.add({
                trigger: this._msg_box_tab_head_el,
                sheet: this._msg_box_el
            });
            this.mainTab.init();
            this.selectMsgboxTab()
        },
        removeMsgboxTab: function() {
            this.mainTab.remove({
                trigger: this._msg_box_tab_head_el,
                sheet: this._msg_box_el
            })
        },
        selectMsgboxTab: function() {
            var f = this.mainTab.indexOf({
                trigger: this._msg_box_tab_head_el,
                sheet: this._msg_box_el
            });
            if (f != -1) {
                this.mainTab.select({
                    trigger: this._msg_box_tab_head_el,
                    sheet: this._msg_box_el
                })
            }
        },
        openBuddyStateTab: function() {
            var f = this.mainTab.indexOf({
                trigger: this._buddys_feeds_tab_head_el,
                sheet: this._buddys_feeds_el
            });
            if (f == -1) {
                this.addBuddyStateTab()
            } else {
                this.selectBuddyStateTab()
            }
        },
        addBuddyStateTab: function() {
            this.mainTab.add({
                trigger: this._buddys_feeds_tab_head_el,
                sheet: this._buddys_feeds_el
            });
            this.mainTab.init();
            this.selectBuddyStateTab()
        },
        removeBuddyStateTab: function() {
            this.mainTab.remove({
                trigger: this._buddys_feeds_tab_head_el,
                sheet: this._buddys_feeds_el
            })
        },
        selectBuddyStateTab: function() {
            var f = this.mainTab.indexOf({
                trigger: this._buddys_feeds_tab_head_el,
                sheet: this._buddys_feeds_el
            });
            if (f != -1) {
                this.mainTab.select({
                    trigger: this._buddys_feeds_tab_head_el,
                    sheet: this._buddys_feeds_el
                })
            }
        },
        openImpressionTab: function() {
            var f = this.mainTab.indexOf({
                trigger: this._buddys_impressions_tab_head_el,
                sheet: this._buddys_impressions_el
            });
            if (f == -1) {
                this.addImpressionTab()
            } else {
                this.selectImpressionTab()
            }
        },
        addImpressionTab: function() {
            this.mainTab.add({
                trigger: this._buddys_impressions_tab_head_el,
                sheet: this._buddys_impressions_el
            });
            this.mainTab.init();
            this.selectImpressionTab()
        },
        removeImpressionTab: function() {
            this.mainTab.remove({
                trigger: this._buddys_impressions_tab_head_el,
                sheet: this._buddys_impressions_el
            })
        },
        selectImpressionTab: function() {
            var f = this.mainTab.indexOf({
                trigger: this._buddys_impressions_tab_head_el,
                sheet: this._buddys_impressions_el
            });
            if (f != -1) {
                this.mainTab.select({
                    trigger: this._buddys_impressions_tab_head_el,
                    sheet: this._buddys_impressions_el
                })
            }
        },
        openMusicBoxTab: function() {
            var f = this.mainTab.indexOf({
                trigger: this._music_box_tab_head_el,
                sheet: this._music_box_el
            });
            if (f == -1) {
                this.addMusicBoxTab()
            } else {
                this.selectMusicBoxTab()
            }
        },
        addMusicBoxTab: function() {
            this.mainTab.add({
                trigger: this._music_box_tab_head_el,
                sheet: this._music_box_el
            });
            this.mainTab.init();
            this.selectMusicBoxTab()
        },
        removeMusicBoxTab: function() {
            this.openUrlInMusicBox("about:blank");
            this.mainTab.remove({
                trigger: this._music_box_tab_head_el,
                sheet: this._music_box_el
            })
        },
        selectMusicBoxTab: function() {
            var f = this.mainTab.indexOf({
                trigger: this._music_box_tab_head_el,
                sheet: this._music_box_el
            });
            if (f != -1) {
                this.mainTab.select({
                    trigger: this._music_box_tab_head_el,
                    sheet: this._music_box_el
                })
            }
        },
        openWebBrowserTab: function() {
            var f = this.mainTab.indexOf({
                trigger: this._web_browser_tab_head_el,
                sheet: this._web_browser_el
            });
            if (f == -1) {
                this.addWebBrowserTab()
            } else {
                this.selectWebBrowserTab()
            }
        },
        addWebBrowserTab: function() {
            this.mainTab.add({
                trigger: this._web_browser_tab_head_el,
                sheet: this._web_browser_el
            });
            this.mainTab.init();
            this.selectWebBrowserTab()
        },
        removeWebBrowserTab: function() {
            this.openUrlInWebBrowser("about:blank");
            this.mainTab.remove({
                trigger: this._web_browser_tab_head_el,
                sheet: this._web_browser_el
            })
        },
        selectWebBrowserTab: function() {
            var f = this.mainTab.indexOf({
                trigger: this._web_browser_tab_head_el,
                sheet: this._web_browser_el
            });
            if (f != -1) {
                this.mainTab.select({
                    trigger: this._web_browser_tab_head_el,
                    sheet: this._web_browser_el
                })
            }
        },
        openSettingCenterTab: function() {
            var f = this.mainTab.indexOf({
                trigger: this._setting_center_tab_head_el,
                sheet: this._setting_center_el
            });
            if (f == -1) {
                this.addSettingCenterTab()
            } else {
                this.selectSettingCenterTab()
            }
        },
        addSettingCenterTab: function() {
            this.mainTab.add({
                trigger: this._setting_center_tab_head_el,
                sheet: this._setting_center_el
            });
            this.mainTab.init();
            this.selectSettingCenterTab()
        },
        removeSettingCenterTab: function() {
            this.mainTab.remove({
                trigger: this._setting_center_tab_head_el,
                sheet: this._setting_center_el
            })
        },
        selectSettingCenterTab: function() {
            var f = this.mainTab.indexOf({
                trigger: this._setting_center_tab_head_el,
                sheet: this._setting_center_el
            });
            if (f != -1) {
                this.mainTab.select({
                    trigger: this._setting_center_tab_head_el,
                    sheet: this._setting_center_el
                })
            }
        },
        clickSubmitSettingCenterTab: function(f) {
            e.stopEvent(f);
            if (this._msgbox_set_default_el.checked) {
                if (!this._msgbox_set_display_el.checked) {
                    alert("[消息盒子]未被选为可见栏目,不能设置为默认栏目!");
                    return
                }
                this.mf_SetTabPos(0)
            }
            if (this._buddy_state_set_default_el.checked) {
                if (!this._buddy_state_set_display_el.checked) {
                    alert("[好友近况]未被选为可见栏目,不能设置为默认栏目!");
                    return
                }
                this.mf_SetTabPos(1)
            }
            if (this._impression_set_default_el.checked) {
                if (!this._impression_set_display_el.checked) {
                    alert("[好友印象]未被选为可见栏目,不能设置为默认栏目!");
                    return
                }
                this.mf_SetTabPos(2)
            }
            if (this._musicbox_set_default_el.checked) {
                if (!this._musicbox_set_display_el.checked) {
                    alert("[QQ音乐]未被选为可见栏目,不能设置为默认栏目!");
                    return
                }
                this.mf_SetTabPos(3)
            }
            if (this._web_browser_set_default_el.checked) {
                if (!this._web_browser_set_display_el.checked) {
                    alert("[浏览网页]未被选为可见栏目,不能设置为默认栏目!");
                    return
                }
                this.mf_SetTabPos(4)
            }
            if (this._msgbox_set_display_el.checked) {
                this._qqclient.setBitValue(14, 1, 0);
                this.addMsgboxTab();
                pgvSendClick({
                    hottag: "MAINTAB.MSGBOX.SETTOENABLE"
                })
            } else {
                this._qqclient.setBitValue(14, 1, 1);
                this.removeMsgboxTab();
                pgvSendClick({
                    hottag: "MAINTAB.MSGBOX.SETTODISABLE"
                })
            }
            if (this._buddy_state_set_display_el.checked) {
                this._qqclient.setBitValue(15, 1, 0);
                this.addBuddyStateTab();
                pgvSendClick({
                    hottag: "MAINTAB.BUDDYSTATE.SETTOENABLE"
                })
            } else {
                this._qqclient.setBitValue(15, 1, 1);
                this.removeBuddyStateTab();
                pgvSendClick({
                    hottag: "MAINTAB.BUDDYSTATE.SETTODISABLE"
                })
            }
            if (this._impression_set_display_el.checked) {
                this._qqclient.setBitValue(16, 1, 0);
                this.addImpressionTab();
                pgvSendClick({
                    hottag: "MAINTAB.IMPRESSION.SETTOENABLE"
                })
            } else {
                this._qqclient.setBitValue(16, 1, 1);
                this.removeImpressionTab();
                pgvSendClick({
                    hottag: "MAINTAB.IMPRESSION.SETTODISABLE"
                })
            }
            if (this._musicbox_set_display_el.checked) {
                this._qqclient.setBitValue(17, 1, 0);
                this.addMusicBoxTab();
                pgvSendClick({
                    hottag: "MAINTAB.QQMusic.SETTOENABLE"
                })
            } else {
                this._qqclient.setBitValue(17, 1, 1);
                this.removeMusicBoxTab();
                pgvSendClick({
                    hottag: "MAINTAB.QQMusic.SETTODISABLE"
                })
            }
            if (this._web_browser_set_display_el.checked) {
                this._qqclient.setBitValue(18, 1, 0);
                this.addWebBrowserTab();
                pgvSendClick({
                    hottag: "MAINTAB.WEBBROWSER.SETTOENABLE"
                })
            } else {
                this.openUrlInWebBrowser();
                this._qqclient.setBitValue(18, 1, 1);
                this.removeWebBrowserTab();
                pgvSendClick({
                    hottag: "MAINTAB.WEBBROWSER.SETTODISABLE"
                })
            }
            this.removeSettingCenterTab()
        },
        clickCloseSettingCenterTab: function(f) {
            e.stopEvent(f);
            this.removeSettingCenterTab()
        },
        mf_openAddBuddyTab: function() {
            var f = this.mainTab.indexOf({
                trigger: this._finger_friend_tab_head_el,
                sheet: this._finger_friend_el
            });
            if (f == -1) {
                this.mf_addAddBuddyTab()
            } else {
                this.mf_selectAddBuddyTab()
            }
            var g = this;
            window.setTimeout(function() {
                g.addBuddy.searchModeTabs.select({
                    trigger: g.addBuddy._search_buddy_by_account_tabhead_node,
                    sheet: g.addBuddy._search_buddy_by_account_node
                })
            },
            0);
            pgvSendClick({
                hottag: "WEBQQ.click_AddBuddyQuickButton"
            })
        },
        mf_addAddBuddyTab: function() {
            this.mainTab.add({
                trigger: this._finger_friend_tab_head_el,
                sheet: this._finger_friend_el
            });
            this.mainTab.init();
            this.mf_selectAddBuddyTab()
        },
        mf_removeAddBuddyTab: function() {
            this.mainTab.remove({
                trigger: this._finger_friend_tab_head_el,
                sheet: this._finger_friend_el
            })
        },
        mf_selectAddBuddyTab: function() {
            var f = this.mainTab.indexOf({
                trigger: this._finger_friend_tab_head_el,
                sheet: this._finger_friend_el
            });
            if (f != -1) {
                this.mainTab.select({
                    trigger: this._finger_friend_tab_head_el,
                    sheet: this._finger_friend_el
                })
            }
        },
        mf_clickCloseAddBuddyTab: function(f) {
            e.stopEvent(f);
            this.mf_removeAddBuddyTab()
        },
        clickWebBrowserBackButton: function(f) {
            this.backWebBrowser()
        },
        clickWebBrowserForwardButton: function(f) {
            this.forwardWebBrowser()
        },
        clickWebBrowserRefreshButton: function(f) {
            this.refreshWebBrowser()
        },
        clickWebBrowserEnterButton: function(g) {
            var f = (this._web_browser_address_input_el.value);
            this.openUrlInWebBrowser(f)
        },
        clickWebBrowserRecommendButton: function(f) {
            e.stopEvent(f);
            this.showRecommendList(f)
        },
        showRecommendList: function() {
            var f = c.getXY(this._web_browser_recommend_button_el);
            c.setStyle(this._recommend_list_el, "left", f[0] + "px");
            c.setStyle(this._recommend_list_el, "top", f[1] + 24 + "px");
            c.setStyle(this._recommend_list_el, "display", "block");
            e.on(document.body, "mouseup", this.hideRecommendList, this, true)
        },
        hideRecommendList: function() {
            e.removeListener(document.body, "mouseup", this.hideRecommendList);
            c.setStyle(this._recommend_list_el, "display", "none")
        },
        clickWebBrowserMaxButton: function(f) {
            this.maxMainpanel()
        },
        clickWebBrowserRestorexButton: function(f) {
            this.restoreMainpanel()
        },
        switchMainpanelMax: function() {
            if (this.isMainpanelMax === true) {
                this.restoreMainpanel()
            } else {
                this.maxMainpanel()
            }
        },
        maxMainpanel: function() {
            this.isMainpanelMax = true;
            e.removeListener(this._web_browser_max_button_el, "click", this.clickWebBrowserMaxButton);
            c.replaceClass(this._web_browser_max_button_el, "max_button", "restore_button");
            this._web_browser_max_button_el.title = "还原(快捷键：Alt + W)";
            this.hideBuddyList();
            this.hideWebQQTop();
            this.hideTaskBar();
            this._taskBar.mf_handleOnResize();
            this._taskBar.setMagnetOff();
            e.on(this._web_browser_max_button_el, "click", this.clickWebBrowserRestorexButton, this, true)
        },
        restoreMainpanel: function() {
            this.isMainpanelMax = false;
            e.removeListener(this._web_browser_max_button_el, "click", this.clickWebBrowserRestorexButton);
            c.replaceClass(this._web_browser_max_button_el, "restore_button", "max_button");
            this._web_browser_max_button_el.title = "最大化(快捷键：Alt + W)";
            this.showBuddyList();
            this.showWebQQTop();
            this.showTaskBar();
            this._taskBar.mf_handleOnResize();
            e.on(this._web_browser_max_button_el, "click", this.clickWebBrowserMaxButton, this, true)
        },
        showWebQQTop: function() {
            c.setStyle(this._webqq_top_el, "display", "block");
            this._webqqTopHeight = 63
        },
        hideWebQQTop: function() {
            c.setStyle(this._webqq_top_el, "display", "none");
            this._webqqTopHeight = 0
        },
        showBuddyList: function() {
            c.setStyle(this._buddy_list_panel_el, "display", "block");
            this._buddyListPanelWidth = 220;
            c.setStyle(this._main_leftpanel_el, "marginRight", this._buddyListPanelWidth + 13 + "px")
        },
        hideBuddyList: function() {
            c.setStyle(this._buddy_list_panel_el, "display", "none");
            this._buddyListPanelWidth = 0;
            c.setStyle(this._main_leftpanel_el, "marginRight", this._buddyListPanelWidth + 13 + "px")
        },
        showTaskBar: function() {
            c.setStyle(this._taskbar_el, "display", "block");
            this._taskbarHeight = 53
        },
        hideTaskBar: function() {
            c.setStyle(this._taskbar_el, "display", "none");
            this._taskbarHeight = -16
        },
        clickWebBrowserClearButton: function(f) {
            this.openUrlInWebBrowser()
        },
        clickWebBrowserHomeButton: function(f) {
            this.openBrowserHome()
        },
        clickWebBrowserAddressInput: function(f) {
            if (!this.isFocus) {
                this.isFocus = true;
                if (this._web_browser_address_input_el.value == this._urlTips) {
                    this._web_browser_address_input_el.value = ""
                } else {
                    this._web_browser_address_input_el.select()
                }
            }
        },
        blurWebBrowserAddressInput: function(f) {
            this.isFocus = false;
            if (this._web_browser_address_input_el.value == "") {
                this._web_browser_address_input_el.value = this._urlTips
            }
        },
        keydownWebBrowserAddressInput: function(h) {
            var f = e.getCharCode(h) || 0;
            if (f == 13) {
                var g = (this._web_browser_address_input_el.value);
                this.openUrlInWebBrowser(g)
            }
        },
        handleWithInputAddress: function(j) {
            var g = j.trim(),
            f = /(^[a-zA-Z0-9]+[^.]):/,
            k = /^[\S.]+\.[\S.]+$/,
            i = /[\w.]+\/(\S*)/,
            h = /;$/;
            if ((!f.test(g)) && (!k.test(g))) {
                g = "http://soso.qq.com/q?bid=203&cid=webq.a&ie=utf-8&w=" + encodeURIComponent(g)
            } else {
                if (!f.test(g)) {
                    g = "http://" + g
                }
                if (!i.test(g)) {
                    g = g + "/"
                }
            }
            return g
        },
        openThisLinkInWebBrowser: function(f) {
            this.openWebBrowserTab();
            this.openUrlInWebBrowser(f.href)
        },
        openUrlInWebBrowser: function(g) {
            if (g) {
                if (g !== "about:blank") {
                    g = this.handleWithInputAddress(g)
                }
                g = g || "web_browser_home.html"
            } else {
                g = "web_browser_home.html"
            }
            if (g == "web_browser_home.html") {
                this._web_browser_address_input_el.value = this._urlTips
            } else {
                this._web_browser_address_input_el.value = g
            }
            this._web_browser_iframe_el.src = g;
            var f = this;
            window.setTimeout(function() {
                e.removeListener(window.frames.web_browser_iframe, "keydown", f.mf_ShortKey, f);
                e.on(window.frames.web_browser_iframe, "keydown", f.mf_ShortKey, f, true)
            },
            1500);
            pgvSendClick({
                hottag: "WEBQQ.WebBrowser.Access." + this._qqclient.uin + "." + g
            });
            this._qqclient.reportBrowserRecord(this._qqclient.uin, g)
        },
        openBrowserHome: function() {
            var f = ssn("webbrowser_home");
            this.openUrlInWebBrowser(f)
        },
        runJsInWebBrowser: function(f) {
            f = f || "alert(null)";
            this._web_browser_iframe_el.src = "javascript:" + f + ";";
            this._qqclient.reportBrowserRecord(this._qqclient.uin, url)
        },
        refreshWebBrowser: function() {
            var f = this._web_browser_iframe_el.src;
            window.open(f, "web_browser_iframe")
        },
        backWebBrowser: function() {
            var f = this._web_browser_iframe_el.contentWindow;
            if (this._web_browser_iframe_el.contentWindow) {
                this._web_browser_iframe_el.contentWindow.history.back()
            }
        },
        forwardWebBrowser: function() {
            var f = this._web_browser_iframe_el.contentWindow;
            if (this._web_browser_iframe_el.contentWindow) {
                this._web_browser_iframe_el.contentWindow.history.forward()
            }
        },
        clickMusicBoxRefreshButton: function(f) {
            this.openUrlInMusicBox()
        },
        openUrlInMusicBox: function(g) {
            var f;
            if (window.ActiveXObject) {
                f = "http://music.qq.com/musicbox/player/music_player_webqq.html"
            } else {
                f = "http://music.soso.com/m.q?ty=box&sc=mus&ch=i.home.al.play&pid=i.home.play&append=0"
            }
            g = g || f;
            this._music_box_iframe_el.src = g
        },
        clickMyAvatarIconHandler: function(f) {
            e.stopEvent(f);
            this.showMyDetailsTab()
        },
        showMyDetailsTab: function(f) {
            this.mf_openBuddyDetailsTab();
            this.loadMyDetails()
        },
        showModifyMyDetails: function(f) {
            this.mf_openBuddyDetailsTab();
            this.loadMyDetailsToModify()
        },
        mf_openBuddyDetailsTab: function() {
            var f = this.mainTab.indexOf({
                trigger: this._buddy_details_tab_head_el,
                sheet: this._buddy_details_el
            });
            if (f == -1) {
                this.mf_addBuddyDetailsTab()
            } else {
                this.mf_selectBuddyDetailsTab()
            }
        },
        mf_addBuddyDetailsTab: function() {
            this.mainTab.add({
                trigger: this._buddy_details_tab_head_el,
                sheet: this._buddy_details_el
            });
            this.mainTab.init();
            this.mf_selectBuddyDetailsTab()
        },
        mf_removeBuddyDetailsTab: function() {
            this.mainTab.remove({
                trigger: this._buddy_details_tab_head_el,
                sheet: this._buddy_details_el
            })
        },
        mf_selectBuddyDetailsTab: function() {
            var f = this.mainTab.indexOf({
                trigger: this._buddy_details_tab_head_el,
                sheet: this._buddy_details_el
            });
            if (f != -1) {
                this.mainTab.select({
                    trigger: this._buddy_details_tab_head_el,
                    sheet: this._buddy_details_el
                })
            }
        },
        mf_clickCloseBuddyDetailsTab: function(f) {
            e.stopEvent(f);
            this.mf_removeBuddyDetailsTab()
        },
        mf_openBuddyManagerTab: function() {
            var f = this.mainTab.indexOf({
                trigger: this._buddy_manager_tab_head_el,
                sheet: this._buddy_manager_el
            });
            if (f == -1) {
                this.mf_addBuddyManagerTab()
            } else {
                this.mf_selectBuddyManagerTab()
            }
            var g = "http://myqq1.qq.com/";
            g = "./myqq/buddy_manager.shtml";
            this._buddy_manager_iframe_el.src = g
        },
        mf_addBuddyManagerTab: function() {
            this.mainTab.add({
                trigger: this._buddy_manager_tab_head_el,
                sheet: this._buddy_manager_el
            });
            this.mainTab.init();
            this.mf_selectBuddyManagerTab()
        },
        mf_removeBuddyManagerTab: function() {
            this.mainTab.remove({
                trigger: this._buddy_manager_tab_head_el,
                sheet: this._buddy_manager_el
            })
        },
        mf_selectBuddyManagerTab: function() {
            var f = this.mainTab.indexOf({
                trigger: this._buddy_manager_tab_head_el,
                sheet: this._buddy_manager_el
            });
            if (f != -1) {
                this.mainTab.select({
                    trigger: this._buddy_manager_tab_head_el,
                    sheet: this._buddy_manager_el
                })
            }
        },
        mf_clickCloseBuddyManagerTab: function(f) {
            e.stopEvent(f);
            this.mf_removeBuddyManagerTab()
        },
        openChatlogTab: function() {
            var f = this.mainTab.indexOf({
                trigger: this._chatlog_tab_head_el,
                sheet: this._chatlog_el
            });
            if (f == -1) {
                this.addChatlogTab()
            } else {
                this.selectChatlogTab()
            }
        },
        addChatlogTab: function() {
            this.mainTab.add({
                trigger: this._chatlog_tab_head_el,
                sheet: this._chatlog_el
            });
            this.mainTab.init();
            this.selectChatlogTab()
        },
        removeChatlogTab: function() {
            this.mainTab.remove({
                trigger: this._chatlog_tab_head_el,
                sheet: this._chatlog_el
            })
        },
        selectChatlogTab: function() {
            var f = this.mainTab.indexOf({
                trigger: this._chatlog_tab_head_el,
                sheet: this._chatlog_el
            });
            if (f != -1) {
                this.mainTab.select({
                    trigger: this._chatlog_tab_head_el,
                    sheet: this._chatlog_el
                })
            }
        },
        mf_clickCloseChatlogTab: function(f) {
            e.stopEvent(f);
            this.removeChatlogTab()
        },
        setBuddyDetails: function(f) {
            if (f.uin == this._qqclient.uin) {
                this._buddyDetails_realname_container1_node.style.display = "none";
                this._buddyDetails_view_button_node.style.display = "block";
                this._buddyDetails_modify_ok_button_node.style.display = "block"
            } else {
                this._buddyDetails_view_button_node.style.display = "none";
                this._buddyDetails_modify_ok_button_node.style.display = "none";
                if (this._qqclient.isFriend(f.uin) !== -1) {
                    this._buddyDetails_realname_container1_node.style.display = "block"
                } else {
                    this._buddyDetails_realname_container1_node.style.display = "none"
                }
                this._buddyDetails_realname_node.innerHTML = String(this._qqclient.bdylist.allUsers[f.uin].remark).forHtml() || "-";
                this._buddyDetails_realname_node.setAttribute("realname", this._qqclient.bdylist.allUsers[f.uin].remark);
                this._buddyDetails_realname_node.setAttribute("uin", f.uin)
            }
            this._buddy_details_loadend_node.scrollTop = 0;
            this._buddyDetails_avatar_node.src = face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this._qqclient.uin + "&uin=" + f.uin;
            this._buddyDetails_nickname_node.innerHTML = f.nickName.toHtml();
            this._buddyDetails_nickname_2_node.innerHTML = f.nickName.toHtml();
            this._buddyDetails_tab_head_node.innerHTML = f.nickName.toHtml();
            this._buddyDetails_uin_node.innerHTML = f.uin;
            var g = this.getSmartUserArea(f);
            this._buddyDetails_city2_node.innerHTML = g;
            if (g == "" || g == "-") {
                this._buddyDetails_city2_node.title = "未填写地区"
            } else {
                this._buddyDetails_city2_node.title = ""
            }
            if (f.sex.toHtml() == "" || f.sex.toHtml() == "-") {
                this._buddyDetails_sex_node.innerHTML = "-";
                this._buddyDetails_sex_node.title = "未填写性别"
            } else {
                this._buddyDetails_sex_node.innerHTML = f.sex.toHtml();
                this._buddyDetails_sex_node.title = ""
            }
            if (f.age.toHtml() == "" || f.age.toHtml() == "-") {
                this._buddyDetails_age_node.innerHTML = "-";
                this._buddyDetails_age_node.title = "未填写年龄"
            } else {
                this._buddyDetails_age_node.innerHTML = f.age.toHtml() + "岁";
                this._buddyDetails_age_node.title = ""
            }
            this._buddyDetails_bloodtype_node.innerHTML = f.bloodType.toHtml();
            this._buddyDetails_shengxiao_node.innerHTML = f.shengXiao.toHtml();
            this._buddyDetails_constellation_node.innerHTML = f.constellation.toHtml();
            this._buddyDetails_country_node.innerHTML = f.country.toHtml();
            this._buddyDetails_province_node.innerHTML = f.province.toHtml();
            this._buddyDetails_city_node.innerHTML = f.cityNo.toHtml();
            this._buddyDetails_mobile_node.innerHTML = f.mobile.toHtml();
            this._buddyDetails_phone_node.innerHTML = f.phone.toHtml();
            this._buddyDetails_email_node.innerHTML = f.email.toHtml();
            this._buddyDetails_occupation_node.innerHTML = f.occupation.toHtml();
            this._buddyDetails_college_node.innerHTML = f.college.toHtml();
            this._buddyDetails_homepage_node.innerHTML = f.homepageLink;
            this._buddyDetails_ps_node.innerHTML = f.perInfo.toHtml();
            this._buddyDetails_buddy_qzone_node.innerHTML = '<a href="' + qzone_user_server_domain + "/" + f.uin + '" target="_blank" title="去' + f.nickName.toHtml() + '的Qzone空间看看...">' + f.nickName.toHtml() + "的QQ空间</a>"
        },
        getSmartUserArea: function(f) {
            var g = f.cityNo;
            if (g == "" || g == "-") {
                g = f.province;
                if (g == "" || g == "-") {
                    g = f.country
                }
            }
            g = String(g).forHtml();
            return g
        },
        setMyDetailsToModify: function(m) {
            this._buddyDetails_view_button_node.style.display = "block";
            e.removeListener(this._buddyDetails_view_button_node, "click");
            e.on(this._buddyDetails_view_button_node, "click", this.mf_clickCloseBuddyDetailsTab, this, true);
            e.removeListener(this._buddyDetails_modify_ok_button_node, "click");
            e.on(this._buddyDetails_modify_ok_button_node, "click", this.clickModifyOkButtonHandler, this, true);
            this._buddyDetails_realname_container1_node.style.display = "none";
            this._buddy_details_loadend_node.scrollTop = 0;
            this._buddyDetails_avatar_node.src = face_server_domain + "/cgi/svr/face/getface?type=1&cache=1&me=" + this._qqclient.uin + "&uin=" + m.uin + "&" + (new Date()).getTime();
            this._buddyDetails_nickname_node.innerHTML = '<input id="ModifyMyDetails_nickname_input_node" class="col3" type="text" value="' + (m.nickName.toHtml() == "-" ? "": m.nickName.toHtml()) + '" />';
            this._buddyDetails_nickname_2_node.innerHTML = m.nickName.toHtml();
            this._buddyDetails_uin_node.innerHTML = m.uin;
            var j = '<select id="ModifyMyDetails_sex_input_node" class="col4">';
            for (var g in this._qqclient.sex) {
                var h = "";
                if (this._qqclient.sex[g] == m.sex) {
                    h = 'selected="selected"'
                }
                j += '<option value="' + this._qqclient.sex[g] + '" ' + h + " >" + this._qqclient.sex[g] + "</option>"
            }
            j += "</select>";
            this._buddyDetails_sex_node.innerHTML = j;
            this._buddyDetails_age_node.innerHTML = '<input id="ModifyMyDetails_age_input_node" class="col4" type="text" maxLength="3" value="' + (m.age == "-" ? "": m.age) + '" />岁';
            var k = '<select id="ModifyMyDetails_bloodtype_input_node" class="col3">';
            for (var g in this._qqclient.bloodType) {
                var h = "";
                if (this._qqclient.bloodType[g] == m.bloodType) {
                    h = 'selected="selected"'
                }
                k += '<option value="' + g + '" ' + h + " >" + this._qqclient.bloodType[g] + "</option>"
            }
            k += "</select>";
            this._buddyDetails_bloodtype_node.innerHTML = k;
            var f = '<select id="ModifyMyDetails_shengxiao_input_node" class="col3">';
            for (var g in this._qqclient.shengXiao) {
                var h = "";
                if (this._qqclient.shengXiao[g] == m.shengXiao) {
                    h = 'selected="selected"'
                }
                f += '<option value="' + g + '" ' + h + " >" + this._qqclient.shengXiao[g] + "</option>"
            }
            f += "</select>";
            this._buddyDetails_shengxiao_node.innerHTML = f;
            var l = '<select id="ModifyMyDetails_constellation_input_node" class="col3">';
            for (var g in this._qqclient.constellation) {
                var h = "";
                if (this._qqclient.constellation[g] == m.constellation) {
                    h = 'selected="selected"'
                }
                l += '<option value="' + g + '" ' + h + " >" + this._qqclient.constellation[g] + "</option>"
            }
            l += "</select>";
            this._buddyDetails_constellation_node.innerHTML = l;
            this._buddyDetails_country_node.innerHTML = m.country;
            this._buddyDetails_province_node.innerHTML = m.province;
            this._buddyDetails_city_node.innerHTML = m.cityNo;
            var n = this.getSmartUserArea(m);
            this._buddyDetails_city2_node.innerHTML = (n == "") ? "-": n;
            if (n == "" || n == "-") {
                this._buddyDetails_city2_node.title = "未填写地区"
            }
            this._buddyDetails_sex_node.title = "";
            this._buddyDetails_age_node.title = "";
            this._buddyDetails_mobile_node.innerHTML = '<input id="ModifyMyDetails_mobile_input_node" class="col2" type="text" maxLength="12" value="' + (m.mobile.toHtml() == "-" ? "": m.mobile.toHtml()) + '" />';
            this._buddyDetails_phone_node.innerHTML = '<input id="ModifyMyDetails_phone_input_node" class="col2" type="text" maxLength="20" value="' + (m.phone.toHtml() == "-" ? "": m.phone.toHtml()) + '" />';
            this._buddyDetails_email_node.innerHTML = '<input id="ModifyMyDetails_email_input_node" class="col2" type="text" maxLength="30" value="' + (m.email.toHtml() == "-" ? "": m.email.toHtml()) + '" />';
            this._buddyDetails_occupation_node.innerHTML = '<input id="ModifyMyDetails_occupation_input_node" class="col2" type="text" value="' + (m.occupation.toHtml() == "-" ? "": m.occupation.toHtml()) + '" />';
            this._buddyDetails_college_node.innerHTML = '<input id="ModifyMyDetails_college_input_node" class="col2" type="text" value="' + (m.college.toHtml() == "-" ? "": m.college.toHtml()) + '" />';
            this._buddyDetails_homepage_node.innerHTML = '<input id="ModifyMyDetails_homepage_input_node" class="col2" type="text" maxLength="50" value="' + (m.homepage.toHtml() == "-" ? "": m.homepage.toHtml()) + '" />';
            this._buddyDetails_ps_node.innerHTML = '<textarea id="ModifyMyDetails_ps_input_node" class="buddyDetails_ps">' + (m.perInfo.toTextareaHtml() == "-" ? "": m.perInfo.toTextareaHtml()) + "</textarea>";
            e.on(c.get("ModifyMyDetails_mobile_input_node"), "keypress", this.checkNumberInput, this, true);
            e.on(c.get("ModifyMyDetails_phone_input_node"), "keypress", this.checkNumberInput, this, true);
            e.on(c.get("ModifyMyDetails_age_input_node"), "keypress", this.checkNumberInput, this, true);
            e.on(c.get("ModifyMyDetails_age_input_node"), "keyup", this.checkAgeInput, this);
            e.on(c.get("ModifyMyDetails_nickname_input_node"), "keyup", this.checkNickInput, this, true);
            e.on(c.get("ModifyMyDetails_occupation_input_node"), "keyup", this.checkOccupationInput, this, true);
            e.on(c.get("ModifyMyDetails_college_input_node"), "keyup", this.checkCollegeInput, this, true);
            e.on(c.get("ModifyMyDetails_ps_input_node"), "keyup", this.checkPsInput, this, true);
            e.on(c.get("ModifyMyDetails_email_input_node"), "blur", this.checkEmailInput, this)
        },
        checkNumberInput: function(g) {
            var f = e.getCharCode(g) || 0;
            if ((f < 48 || f > 57) & f != 8) {
                e.stopEvent(g)
            }
        },
        checkAgeInput: function(f, g) {
            if (this.value > 119) {
                alert("年龄必须小于或等于119！");
                g.mf_adjustInput(this, 2)
            }
        },
        checkEmailInput: function(f) {
            var g = c.get("ModifyMyDetails_email_input_node");
            if (g.value !== "" && !g.value.isEmail()) {
                alert("邮箱地址不正确！");
                return false
            }
            return true
        },
        checkNickInput: function() {
            this.mf_adjustInput(c.get("ModifyMyDetails_nickname_input_node"), 12)
        },
        checkOccupationInput: function() {
            this.mf_adjustInput(c.get("ModifyMyDetails_occupation_input_node"), 20)
        },
        checkCollegeInput: function() {
            this.mf_adjustInput(c.get("ModifyMyDetails_college_input_node"), 20)
        },
        checkPsInput: function() {
            this.mf_adjustInput(c.get("ModifyMyDetails_ps_input_node"), 255)
        },
        checkBuddyDetailsNumberInput: function() {
            var g = c.get("ModifyMyDetails_age_input_node").value;
            var h = c.get("ModifyMyDetails_mobile_input_node").value;
            var f = c.get("ModifyMyDetails_phone_input_node").value;
            if (g !== "" && !g.isNumber()) {
                alert("年龄含有非法字符！");
                return false
            } else {
                if (h !== "" && !h.isNumber()) {
                    alert("手机含有非法字符！");
                    return false
                } else {
                    if (f !== "" && !f.isNumber()) {
                        alert("电话含有非法字符！");
                        return false
                    }
                }
            }
            return true
        },
        clickModifyOkButtonHandler: function(g) {
            var i = this.getMyDetailsInfo();
            var f = this,
            h = {
                onSuccess: f.submitMyDetailsCallback ||
                function() {},
                onFail: function() {
                    alert("设置失败")
                },
                sscope: f,
                fscope: f,
                arguments: {}
            };
            if (this.checkEmailInput(g) && this.checkBuddyDetailsNumberInput()) {
                this._qqclient.submitMyDetails(h, i)
            }
        },
        submitMyDetailsCallback: function(g) {
            var f = String(g.params[3]);
            if (Number(f) == this._qqclient.uin) {
                var h = this._qqclient.orig_info;
                h[1] = String(c.get("ModifyMyDetails_nickname_input_node").value.trim() || "-");
                h[6] = String(c.get("ModifyMyDetails_phone_input_node").value.trim() || "-");
                h[7] = String((c.get("ModifyMyDetails_age_input_node").value.trim()) || "-");
                h[8] = String((c.get("ModifyMyDetails_sex_input_node").value.trim()) || "-");
                h[10] = String((c.get("ModifyMyDetails_email_input_node").value.trim() || "-"));
                h[16] = String((c.get("ModifyMyDetails_occupation_input_node").value.trim() || "-"));
                h[17] = String((c.get("ModifyMyDetails_homepage_input_node").value.trim() || "-"));
                h[22] = String((c.get("ModifyMyDetails_mobile_input_node").value.trim() || "-"));
                h[24] = String((c.get("ModifyMyDetails_ps_input_node").value.trim() || "-"));
                h[31] = String((c.get("ModifyMyDetails_college_input_node").value.trim() || "-"));
                h[32] = String((c.get("ModifyMyDetails_constellation_input_node").value.trim() || "0"));
                h[33] = String((c.get("ModifyMyDetails_shengxiao_input_node").value.trim() || "0"));
                h[34] = String((c.get("ModifyMyDetails_bloodtype_input_node").value.trim() || "0"));
                this._qqclient.orig_info = h;
                this._qqclient.nick = String(h[1] || "") || uin;
                this._title_el.innerHTML = String(this._qqclient.nick + "<" + this._qqclient.uin + ">").forHtml();
                this._buddyDetails_tab_head_node.innerHTML = String(this._qqclient.nick).forHtml();
                alert("修改成功!");
                this.mf_removeBuddyDetailsTab()
            } else {
                alert("修改失败，请检查你输入的信息!")
            }
        },
        getMyDetailsInfo: function() {
            var g = this._qqclient.parseUserDetails(this._qqclient.orig_info);
            var f = {
                nickName: String(encodeURIComponent(String(c.get("ModifyMyDetails_nickname_input_node").value.trim()).replaceAll("\xa0", "\x20"))),
                country: String(g.country),
                province: String(g.province),
                postcode: String(g.postcode),
                address: String(g.address),
                phone: String(encodeURIComponent(c.get("ModifyMyDetails_phone_input_node").value.trim())),
                age: String(encodeURIComponent(c.get("ModifyMyDetails_age_input_node").value.trim())),
                sex: String(encodeURIComponent(c.get("ModifyMyDetails_sex_input_node").value.trim())),
                realName: String(g.realName),
                email: String(encodeURIComponent(c.get("ModifyMyDetails_email_input_node").value.trim())),
                pagerProvider: String(g.pagerProvider),
                stationName: String(g.stationName),
                stationNO: String(g.stationNO),
                pagerNO: String(g.pagerNO),
                pagerType: String(g.pagerType),
                occupation: String(encodeURIComponent(c.get("ModifyMyDetails_occupation_input_node").value.trim())),
                homepage: String(encodeURI(c.get("ModifyMyDetails_homepage_input_node").value.trim())),
                author: String(g.author),
                icqNO: String(g.icqNO),
                icqPwd: String(g.icqPwd),
                avatar: String(g.avatar),
                mobile: String(encodeURIComponent(c.get("ModifyMyDetails_mobile_input_node").value.trim())),
                secret: String(g.secret),
                perInfo: String(encodeURIComponent(c.get("ModifyMyDetails_ps_input_node").value.trim())),
                cityNo: String(g.cityNo),
                secretEmail: String(g.secretEmail),
                idCard: String(g.idCard),
                GSMType: String(g.GSMType),
                GSMOpenInfo: String(g.GSMOpenInfo),
                contactOpenInfo: String(g.contactOpenInfo),
                college: String(encodeURIComponent(c.get("ModifyMyDetails_college_input_node").value.trim())),
                constellation: String(encodeURIComponent(c.get("ModifyMyDetails_constellation_input_node").value.trim())),
                shengXiao: String(encodeURIComponent(c.get("ModifyMyDetails_shengxiao_input_node").value.trim())),
                bloodType: String(encodeURIComponent(c.get("ModifyMyDetails_bloodtype_input_node").value.trim()))
            };
            return f
        },
        loadMyDetails: function() {
            var f = this._qqclient.uin;
            this.showBuddyDetailsLoading();
            if (this._qqclient.orig_info) {
                var g = this._qqclient.parseUserDetails(this._qqclient.orig_info);
                this.setRealnameButtonDefault();
                this.setBuddyDetails(g);
                if (this._qqclient.level > -1) {
                    this.setQQLevelInDetails(this._qqclient.level)
                } else {
                    this.loadMyQQLevel()
                }
                this.loadSignatureInDetails(f);
                this.loadQzoneBlogInDetails(f);
                this.loadMyImpressionInDetails();
                this.showBuddyDetailsLoadend()
            } else {}
            this.loadMyDetailsToModify()
        },
        loadMyDetailsToModify: function() {
            var f = this._qqclient.uin;
            this.showBuddyDetailsLoading();
            if (this._qqclient.orig_info) {
                var g = this._qqclient.parseUserDetails(this._qqclient.orig_info);
                this.setRealnameButtonDefault();
                this.setMyDetailsToModify(g);
                this.loadSignatureInDetails(f);
                this.showBuddyDetailsLoadend()
            } else {}
        },
        loadBuddyDetails: function(i) {
            var g = this._qqclient.bdylist.allUsers[i];
            if (g && g.orig_info) {
                var k = g.orig_info;
                var l = this._qqclient.parseUserDetails(k);
                this.setRealnameButtonDefault();
                this.setBuddyDetails(l);
                this.loadSignatureInDetails(i);
                this.loadQzoneBlogInDetails(i);
                this.loadImpressionInDetails(i);
                this.showBuddyDetailsLoadend()
            } else {
                var f = this,
                j = {
                    onSuccess: function(m) {
                        var n = String(m.params[3]);
                        n = n.split("\x1e");
                        var o = this._qqclient.parseUserDetails(n);
                        this.setRealnameButtonDefault();
                        this.setBuddyDetails(o);
                        if (g && g.level > -1) {
                            this.setQQLevelInDetails(g.level)
                        } else {
                            this.loadQQLevel(i)
                        }
                        this.loadSignatureInDetails(i);
                        this.loadQzoneBlogInDetails(i);
                        this.loadImpressionInDetails(i);
                        this.showBuddyDetailsLoadend()
                    },
                    onFail: function() {},
                    sscope: f,
                    fscope: f,
                    arguments: {},
                    cmd: "06",
                    body: f._qqclient.cs.cs0x06(i)
                };
                this.showBuddyDetailsLoading();
                this.mf_openBuddyDetailsTab();
                var h = this._qqclient.getCmdInfo(j);
                YAHOO.log("loadBuddyDetails:" + h)
            }
        },
        clickViewBuddyDetailsInTips: function(h, g) {
            e.stopEvent(h);
            var f = this.getAttribute("uin");
            g.loadBuddyDetails(f)
        },
        resetBuddyDetails: function() {
            this._buddyDetails_avatar_node.src = "images/qq_avatar_shadow.gif";
            this._buddyDetails_signature_node.innerHTML = "";
            this._buddyDetails_signature_node.innerHTML = "";
            this._buddyDetails_signature_node.innerHTML = "";
            this._buddyDetails_signature_node.innerHTML = ""
        },
        showBuddyDetailsLoading: function() {
            this._buddy_details_loadend_node.style.display = "none";
            this._buddy_details_loading_node.style.display = "block"
        },
        showBuddyDetailsLoadend: function() {
            this._buddy_details_loadend_node.style.display = "block";
            this._buddy_details_loading_node.style.display = "none"
        },
        loadSignatureInDetails: function(g) {
            var f = this,
            h = {
                onSuccess: f.setSignatueToDetails ||
                function() {},
                onFail: function() {},
                sscope: f,
                fscope: f,
                arguments: {},
                cmd: "67",
                body: f._qqclient.cs.cs0x67_0x03([g])
            };
            this._qqclient.getCmdInfo(h)
        },
        setSignatueToDetails: function(f) {
            if (f.params[7] !== "") {
                this._buddyDetails_signature_node.innerHTML = String(decodeURIComponent(f.params[7])).forHtml()
            } else {
                this._buddyDetails_signature_node.innerHTML = "暂无个性签名"
            }
        },
        loadMyQQLevel: function() {
            var g = this._qqclient.uin;
            var f = this,
            h = {
                onSuccess: f.handleQQLeavel ||
                function() {},
                onFail: function() {},
                sscope: f,
                fscope: f,
                arguments: {},
                cmd: "5c",
                body: f._qqclient.cs.cs0x5c_0x88([g])
            };
            this._qqclient.getCmdInfo(h)
        },
        loadQQLevel: function(g) {
            var f = this,
            h = {
                onSuccess: f.handleQQLeavel ||
                function() {},
                onFail: function() {},
                sscope: f,
                fscope: f,
                arguments: {
                    info: {
                        uin: g
                    }
                },
                cmd: "5c",
                body: f._qqclient.cs.cs0x5c_0x89([g])
            };
            this._qqclient.getCmdInfo(h)
        },
        handleQQLeavel: function(h) {
            if (true == this._qqclient.sc.sc0x5c(h)) {
                var g = h.info.uin,
                f = this._qqclient.bdylist.allUsers[g];
                if (f) {
                    this.setQQLevelInDetails(f.level)
                }
            }
        },
        setQQLevelInDetails: function(m) {
            var g = parseInt(m / 64),
            j = parseInt((m % 64) / 16),
            f = parseInt(((m % 64) % 16) / 4),
            l = ((m % 64) % 16) % 4,
            k = "";
            for (var h = 0; h < g; h++) {
                k += '<span class="queen"></span>'
            }
            for (var h = 0; h < j; h++) {
                k += '<span class="sun"></span>'
            }
            for (var h = 0; h < f; h++) {
                k += '<span class="moon"></span>'
            }
            for (var h = 0; h < l; h++) {
                k += '<span class="star"></span>'
            }
            this._buddyDetails_qqlevel_node.innerHTML = k;
            this._buddyDetails_qqlevel_node.title = "等级：" + m
        },
        loadQzoneBlogInDetails: function(g) {
            var f = buddy_situation_server_domain + "/qzone/viewLast/u/" + g + "?webqq_t=" + (new Date().getTime());
            var h = ssn("uin");
            if (h == null || (h && h != this._qqclient.cookie_uin)) {
                document.cookie = "uin=" + this._qqclient.cookie_uin + "; PATH=/; DOMAIN=qq.com; ";
                document.cookie = "skey=" + this._qqclient.password + "; PATH=/; DOMAIN=qq.com; "
            }
            this.mf_getRemoteJs(f, this.handleQzoneBlogInDetails, this)
        },
        handleQzoneBlogInDetails: function() {
            if (qzoneBlog && qzoneBlog.retcode == 0) {
                if (qzoneBlog.result == "") {
                    this._buddyDetails_last_blog_node.innerHTML = '<div class="black5">该用户无最近更新日志</div>'
                } else {
                    for (var f in qzoneBlog.result) {
                        var g = qzoneBlog.result[f].qzone;
                        this._buddyDetails_last_blog_node.innerHTML = '最新日志:&nbsp;<a href="' + g.url + '" target="_blank" title="">' + g.title + "</a><br/>" + g.content + '<a isOpenQzoneBox="true" buddy_uin="' + f + '" onclick="WEBQQ.obj.QQClient.mainPanel.mf_show_qzoneBlog(' + f + "," + g.time + ",'" + g.url + '\');return false;" href="#" title="预览此日志">预览>></a>'
                    }
                }
            }
        },
        loadMyImpressionInDetails: function() {
            var h = this._qqclient.uin;
            var f = buddy_impression_server_domain + "/app/yx/cgi-bin/show_mel?hc=8&lc=4&time=" + ((new Date()).getTime());
            var g = c.get("BuddyDetails_impression");
            g.setAttribute("uin", h);
            g.innerHTML = "";
            this.mf_getRemoteJs(f, this.handleMyImpressionInDetails, this)
        },
        handleMyImpressionInDetails: function() {
            if (typeof data2 == "object" && data2.err == 0) {
                var k = data2;
                var f = k.d;
                var o = c.get("BuddyDetails_impression");
                var u = parseInt(o.getAttribute("uin"));
                if (f == u) {
                    if (o) {
                        var g = document.createElement("div");
                        var m = '<div class="tag">';
                        if (k.el == 0) {
                            m += '	<span class="no_impression">暂无印象评价</span>								<span id="BuddyDetails_bewrite_button_outer"></span>'
                        } else {
                            var j = Math.rand(1, 4);
                            for (var l = 0; l < k.el.length; l++) {
                                var q = k.el[l].ew;
                                var t = q.ewToOriginal();
                                var h = t.toTitle();
                                var n = t.toHtml();
                                var p = n;
                                var s = t.getCharLength();
                                if (s > 14) {
                                    n = (t.subStringByChar(0, 14) + "…").toHtml();
                                    p = n
                                }
                                m += '<span class="cs' + ((l + j) % 4 + 1) + '" title="被这样评价 ' + k.el[l].cn + " 次：" + h + '">' + p + "</span>"
                            }
                            m += '<span id="BuddyDetails_bewrite_button_outer"></span>'
                        }
                        m += "	</div>";
                        o.innerHTML = m;
                        var r = c.get("BuddyDetails_bewrite_button_outer");
                        r.innerHTML = ""
                    }
                }
            }
        },
        loadImpressionInDetails: function(h) {
            var f = buddy_impression_server_domain + "/app/yx/cgi-bin/show_fel?d=" + h + "&hc=8&lc=4&time=" + ((new Date()).getTime());
            var g = c.get("BuddyDetails_impression");
            g.setAttribute("uin", h);
            g.innerHTML = "";
            this.mf_getRemoteJs(f, this.handleImpressionInDetails, this)
        },
        handleImpressionInDetails: function() {
            if (typeof data3 == "object" && data3.err == 0) {
                var l = data3;
                var g = l.d;
                var p = c.get("BuddyDetails_impression");
                var v = parseInt(p.getAttribute("uin"));
                if (g == v) {
                    if (p) {
                        var h = document.createElement("div");
                        var n = '<div class="tag">';
                        if (l.el == 0) {
                            n += '	<span class="no_impression">暂无印象评价</span>								<span id="BuddyDetails_bewrite_button_outer"></span>'
                        } else {
                            var k = Math.rand(1, 4);
                            for (var m = 0; m < l.el.length; m++) {
                                var r = l.el[m].ew;
                                var u = r.ewToOriginal();
                                var j = u.toTitle();
                                var o = u.toHtml();
                                var q = o;
                                var t = u.getCharLength();
                                if (t > 14) {
                                    o = (u.subStringByChar(0, 14) + "…").toHtml();
                                    q = o
                                }
                                n += '<span class="cs' + ((m + k) % 4 + 1) + '" title="被这样评价 ' + l.el[m].c + " 次：" + j + '">' + q + "</span>"
                            }
                            n += '<span id="BuddyDetails_bewrite_button_outer"></span>'
                        }
                        n += "	</div>";
                        p.innerHTML = n;
                        var s = c.get("BuddyDetails_bewrite_button_outer");
                        s.innerHTML = "";
                        var f = document.createElement("a");
                        f.href = "#";
                        c.addClass(f, "otheras");
                        f.setAttribute("uin", g);
                        f.title = g;
                        e.on(f, "click", this.mf_gotoBewriteBuddy, this);
                        f.innerHTML = "我来评价";
                        s.appendChild(f)
                    }
                }
            }
        },
        clickRealnameModifyButton: function(f) {
            this._buddyDetails_realname_node.style.display = "none";
            this._buddyDetails_realname_input_node.style.display = "block";
            this._buddyDetails_realname_input_node.value = this._buddyDetails_realname_node.getAttribute("realname")
        },
        setRealnameButtonDefault: function(f) {},
        clickRealnameSubmitButton: function(h) {
            this.setRealnameButtonDefault();
            var f = this._buddyDetails_realname_input_node.value.trim();
            var g = this._buddyDetails_realname_node.getAttribute("uin");
            this._buddyDetails_realname_node.setAttribute("realname", f);
            this._buddyDetails_realname_node.innerHTML = String(f).forHtml();
            this.sendSetRealname(g, f)
        },
        sendSetRealname: function(g, i) {
            var f = this,
            h = {
                onSuccess: function(l) {
                    var k = this._qqclient.sc.sc0x3e(l);
                    YAHOO.log("sc0x3e: ret=" + k);
                    if (0 == k) {
                        var j = l.info.uin,
                        m = l.info.remark;
                        this._qqclient.mainPanel.mf_updateUserRealName(j, m)
                    }
                },
                onFail: function() {},
                sscope: f,
                fscope: f,
                arguments: {
                    info: {
                        uin: g,
                        remark: i
                    }
                },
                cmd: "3e",
                body: f._qqclient.cs.cs0x3e_0x05(g, encodeURIComponent(i))
            };
            this._qqclient.getCmdInfo(h)
        },
        onKeydownRealnameInput: function(g) {
            g = e.getEvent(g);
            var f = e.getCharCode(g) || 0;
            if (f == 13) {
                this.clickRealnameSubmitButton()
            }
        },
        checkRealnameInputInDetails: function() {
            this.mf_adjustInput(c.get("BuddyDetails_realname_input"), 16)
        },
        checkRealnameInputInTips: function() {
            this.mf_adjustInput(this._RemarkInputInTips_node, 16)
        },
        mf_updateMarqueeMsg: function() {
            this.messageMarquee.update()
        },
        mf_HideActWindow: function(g) {
            var f = e.getTarget(g);
            if (this._tabsManage && this._tabsManage._actTalkWin) {
                var h = f.getAttribute("isOpenChatBox");
                if (h != "true" && this._tabsManage._magnetState === 1) {
                    this._tabsManage._actTalkWin.mf_HideWindow()
                }
            }
        },
        mf_HideQzoneWindow: function(h) {
            var g = e.getTarget(h);
            var f = g.getAttribute("isOpenQzoneBox");
            if (f != "true" && h.button < 2) {
                this.mf_hide_qzoneBlog(h)
            }
        },
        mf_DontHideQzoneWindow: function(f) {
            e.stopPropagation(f)
        },
        mf_MouseoverSignature: function(h) {
            var g = this._my_info_node.offsetWidth;
            var f = c.getDocumentWidth();
            var i = f - g - 365;
            this._signature_el.style.width = i + "px";
            c.replaceClass(this._signature_el, "my_signature", "my_signature_mouseover")
        },
        mf_MouseoutSignature: function(f) {
            c.replaceClass(this._signature_el, "my_signature_mouseover", "my_signature")
        },
        mf_ModifySignature: function(i) {
            c.setStyle(this._signature_el, "display", "none");
            var h = this._my_info_node.offsetWidth;
            var f = c.getDocumentWidth();
            var j = f - h - 365;
            this._signature_input_el.style.width = j + "px";
            c.setStyle(this._signature_input_el, "display", "inline");
            if (this._signature_el.innerHTML == this.defaultSignature) {
                this._signature_input_el.value = ""
            } else {
                this._signature_input_el.value = this._signature_el.innerText || this._signature_el.textContent
            }
            var g = this;
            window.setTimeout(function() {
                g._signature_input_el.select();
                g._signature_input_el.focus()
            },
            0)
        },
        mf_update_signature_input: function(g, f) {
            this.setAttribute("value", this.value);
            f.mf_submitNewSigContent()
        },
        mf_submitNewSigContent: function() {
            if (this._signature_input_el.value.trim() == "") {
                this.mf_setSigContent(this.defaultSignature)
            } else {
                this.mf_setSigContent(this._signature_input_el.value.trim())
            }
            var h = encodeURIComponent(this._signature_input_el.value.trim());
            var f = this,
            i = {
                onSuccess: function(k) {
                    var j = this._qqclient.sc.sc0x67(k);
                    if (true == j) {} else {
                        alert("设置失败")
                    }
                },
                onFail: function(j) {},
                sscope: f,
                fscope: f,
                arguments: {},
                cmd: "67",
                body: f._qqclient.cs.cs0x67_0x01(h)
            };
            var g = this._qqclient.getCmdInfo(i);
            YAHOO.log("changeStat2Online:" + g)
        },
        mf_handleSignatureInputBlur: function() {
            this._signature_el.style.width = "";
            c.setStyle(this._signature_input_el, "display", "none");
            c.setStyle(this._signature_el, "display", "inline")
        },
        signatureInputOnKeydownHandler: function(h, f) {
            h = e.getEvent(h);
            var g = e.getCharCode(h) || 0;
            if (g == 13) {
                this.blur()
            }
        },
        mf_setSigContent: function(f) {
            f = (f == "" ? this.defaultSignature: f);
            if (this._signature_el.innerText) {
                this._signature_el.innerText = unescape(f)
            } else {
                this._signature_el.textContent = unescape(f)
            }
            if (f == this.defaultSignature) {} else {}
            this._signature_el.setAttribute("title", unescape(f))
        },
        mf_OpenVoice: function(f) {
            this._setting_menu_el.className = "voice";
            this._setting_menu_el.title = "声音已开启";
            this._qqclient.setBitValue(28, 1, 1);
            this._qqclient.setBitValue(27, 2, 0)
        },
        mf_CloseVoice: function(f) {
            this._setting_menu_el.className = "novoice";
            this._setting_menu_el.title = "声音已关闭";
            this._qqclient.setBitValue(28, 1, 0)
        },
        disableGroupMsg: function(f) {
            this._shield_grounp_msg_el.innerHTML = '<span class="button_icon disable_group_msg_icon">X</span>开启群消息';
            e.removeListener(this._shield_grounp_msg_el, "click", this.disableGroupMsg);
            e.on(this._shield_grounp_msg_el, "click", this.enableGroupMsg, this, true);
            this._qqclient.setBitValue(27, 2, 2);
            pgvSendClick({
                hottag: "WEBQQ.clickToDisableGroupMsg"
            })
        },
        enableGroupMsg: function(f) {
            this._shield_grounp_msg_el.innerHTML = '<span class="button_icon enable_group_msg_icon">O</span>屏蔽群消息';
            e.removeListener(this._shield_grounp_msg_el, "click", this.enableGroupMsg);
            e.on(this._shield_grounp_msg_el, "click", this.disableGroupMsg, this, true);
            this._qqclient.setBitValue(27, 2, 0);
            pgvSendClick({
                hottag: "WEBQQ.clickToEnableGroupMsg"
            })
        },
        mf_StopAllMsg: function(f) {
            this._setting_menu_el.className = "noallvoice";
            this._setting_menu_el.title = "所有消息已屏蔽";
            this._qqclient.setBitValue(27, 2, 3)
        },
        mf_GetTabPos: function() {
            var f = this._qqclient.getBitValue(25, 6) || 0;
            return f
        },
        mf_SetTabPos: function(f) {
            f = f || 0;
            this._qqclient.setBitValue(25, 6, f)
        },
        mf_SetTabDefault: function(f) {
            var g = WEBQQ.obj.QQClient.mainPanel;
            this.mf_SetTabPos(f);
            c.setStyle(g._set_tab_default_button_el, "display", "none");
            c.setStyle(g._cancel_tab_default_button_el, "display", "block")
        },
        mf_CancelTabDefault: function() {
            this.mf_SetTabPos(0);
            c.setStyle(this._set_tab_default_button_el, "display", "block");
            c.setStyle(this._cancel_tab_default_button_el, "display", "none")
        },
        mf_InitMainContent: function() {
            this._man_statistic_el.innerHTML = this._qqclient.bdylist.male.on + "/" + this._qqclient.bdylist.male.total;
            this._girl_statistic_el.innerHTML = this._qqclient.bdylist.female.on + "/" + this._qqclient.bdylist.female.total;
            e.on(this._friend_msg_link_ref, "click", this.mf_switchToFriendMsg, this, true);
            e.on(this._class_msg_link_ref, "click", this.mf_switchToClassMsg, this, true);
            e.on(this._mail_link_ref, "click", this.mf_switchToMail, this, true);
            e.on(this._sysmsg_link_ref, "click", this.mf_switchToSysMsg, this, true)
        },
        mf_switchToFriendMsg: function(f) {
            if (this._friend_offmsg_ex_el.title == "展开") {
                this.mf_ExpandFriendOffMsg(f)
            }
            if (this._class_offmsg_ex_el.title == "收起") {
                this.mf_ExpandClassOffMsg(f)
            }
            if (this._mail_msg_ex_el.title == "收起") {
                this.mf_ExpandMailMsg(f)
            }
            if (this._sysmsg_ex_el.title == "收起") {
                this.mf_ExpandSysMsg(f)
            }
        },
        mf_switchToClassMsg: function(f) {
            if (this._friend_offmsg_ex_el.title == "收起") {
                this.mf_ExpandFriendOffMsg(f)
            }
            if (this._class_offmsg_ex_el.title == "展开") {
                this.mf_ExpandClassOffMsg(f)
            }
            if (this._mail_msg_ex_el.title == "收起") {
                this.mf_ExpandMailMsg(f)
            }
            if (this._sysmsg_ex_el.title == "收起") {
                this.mf_ExpandSysMsg(f)
            }
        },
        mf_switchToMail: function(f) {
            if (this._friend_offmsg_ex_el.title == "收起") {
                this.mf_ExpandFriendOffMsg(f)
            }
            if (this._class_offmsg_ex_el.title == "收起") {
                this.mf_ExpandClassOffMsg(f)
            }
            if (this._mail_msg_ex_el.title == "展开") {
                this.mf_ExpandMailMsg(f)
            }
            if (this._sysmsg_ex_el.title == "收起") {
                this.mf_ExpandSysMsg(f)
            }
        },
        mf_switchToSysMsg: function(f) {
            if (this._friend_offmsg_ex_el.title == "收起") {
                this.mf_ExpandFriendOffMsg(f)
            }
            if (this._class_offmsg_ex_el.title == "收起") {
                this.mf_ExpandClassOffMsg(f)
            }
            if (this._mail_msg_ex_el.title == "收起") {
                this.mf_ExpandMailMsg(f)
            }
            if (this._sysmsg_ex_el.title == "展开") {
                this.mf_ExpandSysMsg(f)
            }
        },
        mf_IgnoreFriendOffMsg: function(m) {
            var l = this._friend_offmsg_area_c_el.childNodes;
            for (var j = l.length - 1; j >= 0; j--) {
                var h = l[j],
                f = h.id || "",
                k = f.substr(f.indexOf("middle_") + 7);
                this._qqclient.removeNotify(k);
                this._friend_offmsg_area_c_el.removeChild(h);
                var g = this._qqclient.offline_msg;
                for (var j = 0; j < g.length; j++) {
                    if (g[j] == k) {
                        g.splice(j, 1);
                        break
                    }
                }
            }
            this._friend_msg_count_ref.innerHTML = 0;
            this._friend_msg_count2_ref.innerHTML = 0;
            this._friend_offmsg_area_h_el.style.display = "block";
            e.stopEvent(m)
        },
        mf_IgnoreClassOffMsg: function(m) {
            var l = this._class_offmsg_area_c_el.childNodes;
            for (var j = l.length - 1; j >= 0; j--) {
                var h = l[j],
                f = h.id || "",
                k = f.substr(f.indexOf("middle_") + 7);
                this._qqclient.removeNotify(k);
                this._class_offmsg_area_c_el.removeChild(h);
                var g = this._qqclient.offline_msg;
                for (var j = 0; j < g.length; j++) {
                    if (g[j] == k) {
                        g.splice(j, 1);
                        break
                    }
                }
            }
            this._class_msg_count_ref.innerHTML = 0;
            this._class_msg_count2_ref.innerHTML = 0;
            this._class_offmsg_area_h_el.style.display = "block";
            e.stopEvent(m)
        },
        mf_refreshMailMsg: function(f) {
            this.mf_setMailLoadingStatus();
            this.mf_getLoginMailInfo();
            e.stopEvent(f)
        },
        mf_ExpandFriendOffMsg: function(f) {
            this._friend_offmsg_ex_el.title = this._friend_offmsg_ex_el.title == "展开" ? "收起": "展开";
            if (this._friend_offmsg_ex_el.title == "展开") {
                c.replaceClass(this._friend_offmsg_ex_el, "showall", "hiddenall")
            } else {
                c.replaceClass(this._friend_offmsg_ex_el, "hiddenall", "showall")
            }
            this._friend_offmsg_area_el.style.display = this._friend_offmsg_area_el.style.display == "none" ? "block": "none";
            e.stopEvent(f)
        },
        mf_ExpandClassOffMsg: function(f) {
            this._class_offmsg_ex_el.title = this._class_offmsg_ex_el.title == "展开" ? "收起": "展开";
            if (this._class_offmsg_ex_el.title == "展开") {
                c.replaceClass(this._class_offmsg_ex_el, "showall", "hiddenall")
            } else {
                c.replaceClass(this._class_offmsg_ex_el, "hiddenall", "showall")
            }
            this._class_offmsg_area_el.style.display = this._class_offmsg_area_el.style.display == "none" ? "block": "none";
            e.stopEvent(f)
        },
        mf_ExpandMailMsg: function(f) {
            this._mail_msg_ex_el.title = this._mail_msg_ex_el.title == "展开" ? "收起": "展开";
            if (this._mail_msg_ex_el.title == "展开") {
                c.replaceClass(this._mail_msg_ex_el, "showall", "hiddenall")
            } else {
                c.replaceClass(this._mail_msg_ex_el, "hiddenall", "showall")
            }
            this._mail_msg_area_el.style.display = this._mail_msg_area_el.style.display == "none" ? "block": "none";
            e.stopEvent(f)
        },
        mf_ExpandSysMsg: function(f) {
            this._sysmsg_ex_el.title = this._sysmsg_ex_el.title == "展开" ? "收起": "展开";
            if (this._sysmsg_ex_el.title == "展开") {
                c.replaceClass(this._sysmsg_ex_el, "showall", "hiddenall")
            } else {
                c.replaceClass(this._sysmsg_ex_el, "hiddenall", "showall")
            }
            this._sysmsg_area_el.style.display = this._sysmsg_area_el.style.display == "none" ? "block": "none";
            e.stopEvent(f)
        },
        mf_chatWithBuddy: function(g, h) {
            e.stopEvent(g);
            var f = this.getAttribute("buddy_uin");
            h._qqclient.actChat(f)
        },
        mf_openMarqueeMsg: function(j) {
            var h = this.mf_getMarqueeMsgType(j);
            if (h == "beAddedMsg40") {
                var g = this.mf_getMarqueeSysMsgId(j);
                this.mf_beAddedByOtherUser40(g);
                var i = this.mf_getNodeOfEvent(j);
                this.mf_removeMarqueeMsg(i);
                var f = c.get("beAddedMsgInSysMsgBox_" + i.id.split("beAddedMsgInMarqueeMsgBox_")[1]);
                c.replaceClass(f, "sysMsgNotRead", "sysMsgHadRead")
            } else {
                if (h == "beAddedMsg41") {
                    var g = this.mf_getMarqueeSysMsgId(j);
                    this.mf_beAddedByOtherUser41(g);
                    var i = this.mf_getNodeOfEvent(j);
                    this.mf_removeMarqueeMsg(i);
                    var f = c.get("beAddedMsgInSysMsgBox_" + i.id.split("beAddedMsgInMarqueeMsgBox_")[1]);
                    c.replaceClass(f, "sysMsgNotRead", "sysMsgHadRead")
                } else {
                    if (h == "beAddedMsg43") {
                        var g = this.mf_getMarqueeSysMsgId(j);
                        this.mf_allowAddbuddy43(g);
                        var i = this.mf_getNodeOfEvent(j);
                        this.mf_removeMarqueeMsg(i);
                        var f = c.get("beAddedMsgInSysMsgBox_" + i.id.split("beAddedMsgInMarqueeMsgBox_")[1]);
                        c.replaceClass(f, "sysMsgNotRead", "sysMsgHadRead")
                    } else {
                        if (h == "beAddedMsg3") {
                            var g = this.mf_getMarqueeSysMsgId(j);
                            this.mf_beAddedByOtherUser3(g);
                            var i = this.mf_getNodeOfEvent(j);
                            this.mf_removeMarqueeMsg(i);
                            var f = c.get("beAddedMsgInSysMsgBox_" + i.id.split("beAddedMsgInMarqueeMsgBox_")[1]);
                            c.replaceClass(f, "sysMsgNotRead", "sysMsgHadRead")
                        } else {
                            if (h == "beAddedMsg4") {
                                var g = this.mf_getMarqueeSysMsgId(j);
                                this.mf_beAddedByOtherUser4(g);
                                var i = this.mf_getNodeOfEvent(j);
                                this.mf_removeMarqueeMsg(i);
                                var f = c.get("beAddedMsgInSysMsgBox_" + i.id.split("beAddedMsgInMarqueeMsgBox_")[1]);
                                c.replaceClass(f, "sysMsgNotRead", "sysMsgHadRead")
                            } else {
                                if (h == "") {
                                    this.mf_ChatWithUser(j)
                                }
                            }
                        }
                    }
                }
            }
        },
        mf_removeMarqueeMsg: function(f) {
            if (f && f.parentNode == this._message_marquee_inner_el) {
                this._message_marquee_inner_el.removeChild(f);
                this.mf_updateMarqueeMsg();
                if (this._message_marquee_inner_el.childNodes.length == 0) {
                    c.setStyle(this._no_message_marquee_el, "display", "block")
                }
            } else {}
        },
        mf_addSysMsg: function(f) {
            switch (f.cs_cmd) {
            case 128:
                this.mf_handleSysMsg_beAddedByOtherUser(f);
                break
            }
        },
        mf_handleSysMsg_beAddedByOtherUser: function(g) {
            var j = new Date();
            j.setTime(parseInt(g.time) * 1000);
            switch (g.msg_type) {
            case 40:
                var k = g.msg_array[0];
                var j = j.format("yyyy-MM-dd") + "&nbsp;&nbsp;&nbsp;" + j.format("hh:mm:ss");
                var f = document.createElement("div");
                f.id = "beAddedMsgInSysMsgBox_" + this._sysMsgBox.length;
                c.addClass(f, "infos");
                c.addClass(f, "sysMsgNotRead");
                f.setAttribute("sysMsgId", this._sysMsgBox.length);
                f.innerHTML = '<div class="rb">												<div class="rbnr">' + j + '</div>										  </div>										  <div class="lb">												 <div class="userinfo userinfo2">														<div class="ltt">															<div class="imnr">																<span class="webico system"></span>													<span class="webname">' + String(g.nick).forHtml() + '</span>															 </div>														</div>														<div class="rtt">															 <div class="rnr rnr2">																 <div id="beAddedMsgText_' + this._sysMsgBox.length + '" class="sysMsgText">' + String(g.nick).forHtml() + "&lt;" + g.from_uin + "&gt;添加您为好友</div>															 </div>														</div>												  </div>										  </div>";
                this._sysmsg_area_c_el.appendChild(f);
                e.on(f, "mouseover", this.mf_msgMouseover);
                e.on(f, "mouseout", this.mf_msgMouseout);
                e.on(f, "click", this.mf_handle_beAddedByOtherUser40, this);
                var l = document.createElement("a");
                c.addClass(l, "sysMsgInMarquee");
                l.setAttribute("uin", g.from_uin);
                l.setAttribute("sysMsgId", this._sysMsgBox.length);
                l.setAttribute("msgType", "beAddedMsg40");
                l.setAttribute("href", "#");
                l.id = "beAddedMsgInMarqueeMsgBox_" + this._sysMsgBox.length;
                l.setAttribute("msg_count", 1);
                l.setAttribute("title", g.nick.forTitle() + "<" + g.from_uin + ">");
                l.innerHTML = g.nick.forHtml() + "<" + g.from_uin + ">添加您为好友";
                this._message_marquee_inner_el.appendChild(l);
                if (this._message_marquee_inner_el.childNodes.length > 0) {
                    c.setStyle(this._no_message_marquee_el, "display", "none")
                }
                this.mf_updateMarqueeMsg();
                break;
            case 41:
                var i = g.msg_array[0] == "" ? "(无)": g.msg_array[0];
                var j = j.format("yyyy-MM-dd") + "&nbsp;&nbsp;&nbsp;" + j.format("hh:mm:ss");
                var f = document.createElement("div");
                f.id = "beAddedMsgInSysMsgBox_" + this._sysMsgBox.length;
                c.addClass(f, "infos");
                c.addClass(f, "sysMsgNotRead");
                f.setAttribute("sysMsgId", this._sysMsgBox.length);
                f.innerHTML = '<div class="rb">												<div class="rbnr">' + j + '</div>										  </div>										  <div class="lb">												 <div class="userinfo userinfo2">														<div class="ltt">															<div class="imnr">																<span class="webico system"></span>													<span class="webname">' + g.nick.forHtml() + '</span>															 </div>														</div>														<div class="rtt">															 <div class="rnr rnr2">																 <div id="beAddedMsgText_' + this._sysMsgBox.length + '" class="sysMsgText">' + g.nick.forHtml() + "&lt;" + g.from_uin + '&gt;请求添加您为好友，附加消息：<span class="buddyMsg">' + String(i).forHtml() + "</span></div>															 </div>														</div>												  </div>										  </div>";
                this._sysmsg_area_c_el.appendChild(f);
                e.on(f, "mouseover", this.mf_msgMouseover);
                e.on(f, "mouseout", this.mf_msgMouseout);
                e.on(f, "click", this.mf_handle_beAddedByOtherUser41, this);
                var l = document.createElement("a");
                c.addClass(l, "sysMsgInMarquee");
                l.setAttribute("uin", g.from_uin);
                l.setAttribute("sysMsgId", this._sysMsgBox.length);
                l.setAttribute("msgType", "beAddedMsg41");
                l.setAttribute("href", "#");
                l.id = "beAddedMsgInMarqueeMsgBox_" + this._sysMsgBox.length;
                l.setAttribute("msg_count", 1);
                l.setAttribute("title", g.nick.forTitle() + "<" + g.from_uin + ">");
                l.innerHTML = g.nick.forHtml() + "<" + g.from_uin + ">请求添加您为好友，附加消息：" + String(i).forHtml();
                this._message_marquee_inner_el.appendChild(l);
                if (this._message_marquee_inner_el.childNodes.length > 0) {
                    c.setStyle(this._no_message_marquee_el, "display", "none")
                }
                this.mf_updateMarqueeMsg();
                break;
            case 42:
                break;
            case 43:
                var j = j.format("yyyy-MM-dd") + "&nbsp;&nbsp;&nbsp;" + j.format("hh:mm:ss");
                var f = document.createElement("div");
                f.id = "beAddedMsgInSysMsgBox_" + this._sysMsgBox.length;
                c.addClass(f, "infos");
                c.addClass(f, "sysMsgNotRead");
                f.setAttribute("sysMsgId", this._sysMsgBox.length);
                f.innerHTML = '<div class="rb">												<div class="rbnr">' + j + '</div>										  </div>										  <div class="lb">												 <div class="userinfo userinfo2">														<div class="ltt">															<div class="imnr">																<span class="webico system"></span>													<span class="webname">' + String(g.nick).forHtml() + '</span>															 </div>														</div>														<div class="rtt">															 <div class="rnr rnr2">																 <div id="beAddedMsgText_' + this._sysMsgBox.length + '" class="sysMsgText">' + g.nick.forHtml() + "&lt;" + g.from_uin + "&gt;接受了您的请求并添加您为好友!</div>															 </div>														</div>												  </div>										  </div>";
                this._sysmsg_area_c_el.appendChild(f);
                e.on(f, "mouseover", this.mf_msgMouseover);
                e.on(f, "mouseout", this.mf_msgMouseout);
                e.on(f, "click", this.mf_handle_beAddedByOtherUser43, this);
                var l = document.createElement("a");
                c.addClass(l, "sysMsgInMarquee");
                l.setAttribute("uin", g.from_uin);
                l.setAttribute("sysMsgId", this._sysMsgBox.length);
                l.setAttribute("msgType", "beAddedMsg43");
                l.setAttribute("href", "#");
                l.id = "beAddedMsgInMarqueeMsgBox_" + this._sysMsgBox.length;
                l.setAttribute("msg_count", 1);
                l.setAttribute("title", g.nick.forTitle() + "(" + g.from_uin + ")");
                l.innerHTML = g.nick.forHtml() + "&lt;" + g.from_uin + "&gt;接受了您的请求并添加您为好友!";
                this._message_marquee_inner_el.appendChild(l);
                if (this._message_marquee_inner_el.childNodes.length > 0) {
                    c.setStyle(this._no_message_marquee_el, "display", "none")
                }
                this.mf_updateMarqueeMsg();
                break;
            case 44:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                var j = j.format("yyyy-MM-dd") + "&nbsp;&nbsp;&nbsp;" + j.format("hh:mm:ss");
                var f = document.createElement("div");
                f.id = "beAddedMsgInSysMsgBox_" + this._sysMsgBox.length;
                c.addClass(f, "infos");
                c.addClass(f, "sysMsgNotRead");
                f.setAttribute("sysMsgId", this._sysMsgBox.length);
                f.innerHTML = '<div class="rb">												<div class="rbnr">' + j + '</div>										  </div>										  <div class="lb">												 <div class="userinfo userinfo2">														<div class="ltt">															<div class="imnr">																<span class="webico system"></span>													<span class="webname">' + g.nick.forHtml() + '</span>															 </div>														</div>														<div class="rtt">															 <div class="rnr rnr2">																 <div id="beAddedMsgText_' + this._sysMsgBox.length + '" class="sysMsgText">' + g.nick.forHtml() + "&lt;" + g.from_uin + "&gt;同意了您的请求</div>															 </div>														</div>												  </div>										  </div>";
                this._sysmsg_area_c_el.appendChild(f);
                e.on(f, "mouseover", this.mf_msgMouseover);
                e.on(f, "mouseout", this.mf_msgMouseout);
                e.on(f, "click", this.mf_handle_beAddedByOtherUser3, this);
                var l = document.createElement("a");
                c.addClass(l, "sysMsgInMarquee");
                l.setAttribute("uin", g.from_uin);
                l.setAttribute("sysMsgId", this._sysMsgBox.length);
                l.setAttribute("msgType", "beAddedMsg3");
                l.setAttribute("href", "#");
                l.id = "beAddedMsgInMarqueeMsgBox_" + this._sysMsgBox.length;
                l.setAttribute("msg_count", 1);
                l.setAttribute("title", g.nick.forTitle() + "(" + g.from_uin + ")");
                l.innerHTML = g.nick.forHtml() + "&lt;" + g.from_uin + "&gt;同意了您的请求";
                this._message_marquee_inner_el.appendChild(l);
                if (this._message_marquee_inner_el.childNodes.length > 0) {
                    c.setStyle(this._no_message_marquee_el, "display", "none")
                }
                this.mf_updateMarqueeMsg();
                break;
            case 4:
                var h = g.msg_array[0] || "";
                var j = j.format("yyyy-MM-dd") + "&nbsp;&nbsp;&nbsp;" + j.format("hh:mm:ss");
                var f = document.createElement("div");
                f.id = "beAddedMsgInSysMsgBox_" + this._sysMsgBox.length;
                c.addClass(f, "infos");
                c.addClass(f, "sysMsgNotRead");
                f.setAttribute("sysMsgId", this._sysMsgBox.length);
                f.innerHTML = '<div class="rb">												<div class="rbnr">' + j + '</div>										  </div>										  <div class="lb">												 <div class="userinfo userinfo2">														<div class="ltt">															<div class="imnr">																<span class="webico system"></span>													<span class="webname">' + g.nick.forHtml() + '</span>															 </div>														</div>														<div class="rtt">															 <div class="rnr rnr2">																 <div id="beAddedMsgText_' + this._sysMsgBox.length + '" class="sysMsgText">' + g.nick.forHtml() + "&lt;" + g.from_uin + "&gt;拒绝了您的请求，附加消息：" + String(h).forHtml() + "</div>															 </div>														</div>												  </div>										  </div>";
                this._sysmsg_area_c_el.appendChild(f);
                e.on(f, "mouseover", this.mf_msgMouseover);
                e.on(f, "mouseout", this.mf_msgMouseout);
                e.on(f, "click", this.mf_handle_beAddedByOtherUser4, this);
                var l = document.createElement("a");
                c.addClass(l, "sysMsgInMarquee");
                l.setAttribute("uin", g.from_uin);
                l.setAttribute("sysMsgId", this._sysMsgBox.length);
                l.setAttribute("msgType", "beAddedMsg4");
                l.setAttribute("href", "#");
                l.id = "beAddedMsgInMarqueeMsgBox_" + this._sysMsgBox.length;
                l.setAttribute("msg_count", 1);
                l.setAttribute("title", g.nick.forTitle() + "(" + g.from_uin + ")");
                l.innerHTML = g.nick.forHtml() + "&lt;" + g.from_uin + "&gt;拒绝了您的请求，附加消息：" + String(h).forHtml() + "";
                this._message_marquee_inner_el.appendChild(l);
                if (this._message_marquee_inner_el.childNodes.length > 0) {
                    c.setStyle(this._no_message_marquee_el, "display", "none")
                }
                this.mf_updateMarqueeMsg();
                break;
            default:
                break
            }
            this._sysMsgBox.push(g);
            this._sysmsg_count_ref.innerHTML = parseInt(this._sysmsg_count_ref.innerHTML) + 1;
            this._sysmsg_count2_ref.innerHTML = parseInt(this._sysmsg_count2_ref.innerHTML) + 1;
            this._all_msg_count_el.innerHTML = parseInt(this._friend_msg_count_ref.innerHTML) + parseInt(this._class_msg_count_ref.innerHTML) + parseInt(this._mail_count_ref.innerHTML.split("+")[0]) + parseInt(this._sysmsg_count_ref.innerHTML);
            if (this._mail_count_ref.innerHTML.indexOf("+") > 0) {
                this._all_msg_count_el.innerHTML = this._all_msg_count_el.innerHTML + "+"
            }
            if (parseInt(this._sysmsg_count_ref.innerHTML) > 0) {
                c.setStyle(this._sysmsg_area_h_el, "display", "none")
            }
        },
        mf_handle_beAddedByOtherUser3: function(i, g) {
            var f = this.getAttribute("sysMsgId");
            c.replaceClass(this, "sysMsgNotRead", "sysMsgHadRead");
            var h = c.get("beAddedMsgInMarqueeMsgBox_" + this.id.split("beAddedMsgInSysMsgBox_")[1]);
            g.mf_removeMarqueeMsg(h);
            g.mf_beAddedByOtherUser3(f)
        },
        mf_beAddedByOtherUser3: function(f) {
            var g = this._sysMsgBox[f];
            this._beAddedAlertBox_node = document.createElement("div");
            c.addClass(this._beAddedAlertBox_node, "alertBox");
            this._beAddedAlertBox_node.setAttribute("sysMsgId", f);
            var h = "",
            k = "",
            j = "",
            i = "";
            k = '<div id="alertCloseButton_1" class="alertCloseButton_1">X</div>											<div class="alertTitle_1">添加好友</div>											<div class="alertMsgTitle_1">												<img id="userAvatar" class="userAvatar" src="' + face_server_domain + "/cgi/svr/face/getface?type=1&fid=0&me=" + this._qqclient.uin + "&uin=" + g.from_uin + '" /><p class="titleText">' + g.nick.forHtml() + "<" + g.from_uin + '>同意了您的请求!</p>											</div>											<div class="alertMsgContent_1">												<p>备注：<input id="buddyRemark" class="buddyRemark" type="text" value="" maxlength="24" /></p>											</div>											<div class="buttonGroup_1">												<input id="alertOkButton" class="button_1" type="button" value="确 定" buddy_uin="' + g.from_uin + '" />												<input id="alertCloseButton_2" class="button_1" type="button" value="关 闭" />											</div>';
            h = k + j + i;
            this._beAddedAlertBox_node.innerHTML = h;
            this._sysbox_node.appendChild(this._beAddedAlertBox_node);
            e.on(c.get("alertCloseButton_1"), "click", this.mf_closeBeAddedAlertBox, this, true);
            e.on(c.get("alertCloseButton_2"), "click", this.mf_closeBeAddedAlertBox, this, true);
            e.on(c.get("buddyRemark"), "keyup", this.mf_checkBuddyRemarkInput, this, true);
            e.on(c.get("buddyRemark"), "blur", this.mf_checkBuddyRemarkInput, this, true);
            e.on(c.get("alertOkButton"), "click", this.clickBeAllowToAddOkButton, this);
            this.mf_openSysBox();
            c.get("buddyRemark").focus();
            this.mf_setSysMsgProcessed(f)
        },
        clickBeAllowToAddOkButton: function(j, h) {
            var g = this.getAttribute("buddy_uin");
            var i = c.get("buddyRemark").value;
            var f = h._qqclient.bdylist.allUsers[g];
            h._qqclient.RemarkFriend(f, i);
            h.mf_closeBeAddedAlertBox()
        },
        mf_setSysMsgProcessed: function(f) {
            if (c.get("beAddedMsgText_" + f).innerHTML.indexOf("(已处理)") == -1) {
                c.get("beAddedMsgText_" + f).innerHTML = "(已处理)&nbsp;" + c.get("beAddedMsgText_" + f).innerHTML
            }
        },
        mf_handle_beAddedByOtherUser4: function(i, g) {
            var f = this.getAttribute("sysMsgId");
            c.replaceClass(this, "sysMsgNotRead", "sysMsgHadRead");
            var h = c.get("beAddedMsgInMarqueeMsgBox_" + this.id.split("beAddedMsgInSysMsgBox_")[1]);
            g.mf_removeMarqueeMsg(h);
            g.mf_beAddedByOtherUser4(f)
        },
        mf_beAddedByOtherUser4: function(f) {
            var g = this._sysMsgBox[f];
            var i = g.msg_array[0] || "";
            this._beAddedAlertBox_node = document.createElement("div");
            c.addClass(this._beAddedAlertBox_node, "alertBox");
            this._beAddedAlertBox_node.setAttribute("sysMsgId", f);
            var h = "",
            l = "",
            k = "",
            j = "";
            l = '<div id="alertCloseButton_1" class="alertCloseButton_1">X</div>											<div class="alertTitle_1">添加好友</div>											<div class="alertMsgTitle_1">												<img id="userAvatar" class="userAvatar" src="' + face_server_domain + "/cgi/svr/face/getface?type=1&fid=0&me=" + this._qqclient.uin + "&uin=" + g.from_uin + '" /><p class="titleText">' + g.nick.forHtml() + "<" + g.from_uin + ">拒绝了您的请求，附加消息：" + String(i).forHtml() + '</p>											</div>											<div class="alertMsgContent_1">											</div>											<div class="buttonGroup_1">';
            j = '<input id="alertCloseButton_2" class="button_1" type="button" value="关 闭" />											</div>';
            h = l + k + j;
            this._beAddedAlertBox_node.innerHTML = h;
            this._sysbox_node.appendChild(this._beAddedAlertBox_node);
            e.on(c.get("alertCloseButton_1"), "click", this.mf_closeBeAddedAlertBox, this, true);
            e.on(c.get("alertCloseButton_2"), "click", this.mf_closeBeAddedAlertBox, this, true);
            this.mf_openSysBox();
            c.get("alertCloseButton_2").focus();
            this.mf_setSysMsgProcessed(f)
        },
        mf_handle_beAddedByOtherUser40: function(i, g) {
            var f = this.getAttribute("sysMsgId");
            c.replaceClass(this, "sysMsgNotRead", "sysMsgHadRead");
            var h = c.get("beAddedMsgInMarqueeMsgBox_" + this.id.split("beAddedMsgInSysMsgBox_")[1]);
            g.mf_removeMarqueeMsg(h);
            g.mf_beAddedByOtherUser40(f)
        },
        mf_beAddedByOtherUser40: function(f) {
            var g = this._sysMsgBox[f];
            this._beAddedAlertBox_node = document.createElement("div");
            c.addClass(this._beAddedAlertBox_node, "alertBox");
            this._beAddedAlertBox_node.setAttribute("sysMsgId", f);
            var i = "",
            l = "",
            k = "",
            j = "";
            l = '<div id="alertCloseButton_1" class="alertCloseButton_1">X</div>											<div class="alertTitle_1">添加好友</div>											<div class="alertMsgTitle_1">												<img id="userAvatar" class="userAvatar" src="' + face_server_domain + "/cgi/svr/face/getface?type=1&fid=0&me=" + this._qqclient.uin + "&uin=" + g.from_uin + '" /><p class="titleText">' + g.nick.forHtml() + "<" + g.from_uin + '>添加您为好友!</p>											</div>											<div class="alertMsgContent_1">											</div>											<div class="buttonGroup_1">';
            if (this._qqclient.isFriend(g.from_uin) === -1) {
                k = '<input id="addOppositeButton" class="button_1" type="button" value="加为好友" /> '
            }
            j = '<input id="alertCloseButton_2" class="button_1" type="button" value="关 闭" />											</div>';
            i = l + k + j;
            this._beAddedAlertBox_node.innerHTML = i;
            this._sysbox_node.appendChild(this._beAddedAlertBox_node);
            var h = c.get("addOppositeButton");
            if (h) {
                e.on(h, "click", this.mf_handle_addOpposite, this, true)
            }
            e.on(c.get("alertCloseButton_1"), "click", this.mf_closeBeAddedAlertBox, this, true);
            e.on(c.get("alertCloseButton_2"), "click", this.mf_closeBeAddedAlertBox, this, true);
            this.mf_openSysBox();
            c.get("alertCloseButton_2").focus();
            this.mf_setSysMsgProcessed(f)
        },
        mf_handle_addOpposite: function() {
            var g = this._beAddedAlertBox_node.getAttribute("sysMsgId");
            var f = this._sysMsgBox[g];
            var p = (f.msg_array[0] == "" ? "(无)": f.msg_array[0]),
            j = f.msg_array[1];
            var l = 0;
            var h = "",
            o = "",
            n = "",
            m = "";
            o = '<div id="alertCloseButton_1" class="alertCloseButton_1">X</div>											<div class="alertTitle_1">添加好友</div>											<div class="alertMsgTitle_1">												<img id="userAvatar" class="userAvatar" src="' + face_server_domain + "/cgi/svr/face/getface?type=1&fid=0&me=" + this._qqclient.uin + "&uin=" + f.from_uin + '" /><p class="titleText">添加' + f.nick.forHtml() + "<" + f.from_uin + '>为好友!</p>											</div>											<div class="alertMsgContent_1">												<label id="acceptBeAddedLabel_1" class="labelBeAddedRadio" for="acceptBeAddedRadio_1">													<div id="acceptBeAddedLabel_1_reveal" class="acceptBeAddedLabel_1_reveal">												        <p>备注：<input id="buddyRemark" class="buddyRemark" type="text" value="" maxlength="24" /></p>												        <p class="selectBuddyGroupOuter">															分组：<select id="selectBuddyGroup" class="selectBuddyGroup">';
            for (var k in this._qqclient.bdylist.groups) {
                if (k != "_1000" && k != "1000" && k != "1001") {
                    var q = "";
                    if (l == 0) {
                        q = 'selected="selected"'
                    }
                    n += '<option value="' + this._qqclient.bdylist.groups[k].id + '" ' + q + " >" + this._qqclient.bdylist.groups[k].name + "</option>";
                    l++
                }
            }
            m = '</select>														</p>												    </div>												</label>											</div>											<div class="buttonGroup_1">												<input id="alertOkButton" class="button_1" type="button" value="确 定" />												<input id="alertCloseButton_2" class="button_1" type="button" value="关 闭" />											</div>';
            h = o + n + m;
            this._beAddedAlertBox_node.innerHTML = h;
            e.on(c.get("buddyRemark"), "keyup", this.mf_checkBuddyRemarkInput, this, true);
            e.on(c.get("buddyRemark"), "blur", this.mf_checkBuddyRemarkInput, this, true);
            e.on(c.get("alertOkButton"), "click", this.mf_reversedAddOpposite, this, true);
            e.on(c.get("alertCloseButton_1"), "click", this.mf_closeBeAddedAlertBox, this, true);
            e.on(c.get("alertCloseButton_2"), "click", this.mf_closeBeAddedAlertBox, this, true);
            this.mf_openSysBox();
            c.get("buddyRemark").focus()
        },
        mf_handle_beAddedByOtherUser41: function(i, g) {
            var f = this.getAttribute("sysMsgId");
            c.replaceClass(this, "sysMsgNotRead", "sysMsgHadRead");
            var h = c.get("beAddedMsgInMarqueeMsgBox_" + this.id.split("beAddedMsgInSysMsgBox_")[1]);
            g.mf_removeMarqueeMsg(h);
            g.mf_beAddedByOtherUser41(f)
        },
        mf_beAddedByOtherUser41: function(g) {
            var f = this._sysMsgBox[g];
            var p = f.msg_array[0] == "" ? "(无)": f.msg_array[0];
            var j = f.msg_array[1];
            this._beAddedAlertBox_node = document.createElement("div");
            c.addClass(this._beAddedAlertBox_node, "alertBox");
            this._beAddedAlertBox_node.setAttribute("sysMsgId", g);
            var l = 0;
            var h = "",
            o = "",
            n = "",
            m = "";
            o = '<div id="alertCloseButton_1" class="alertCloseButton_1">X</div>												<div class="alertTitle_1">添加好友</div>												<div class="alertMsgTitle_1">													<img id="userAvatar" class="userAvatar" src="' + face_server_domain + "/cgi/svr/face/getface?type=1&fid=0&me=" + this._qqclient.uin + "&uin=" + f.from_uin + '" /><p class="titleText">' + f.nick.forHtml() + "<" + f.from_uin + '>请求添加您为好友!</p>												</div>												<div class="alertMsgContent_1">													<p>附加消息:</p>													<p class="userSendMsg">' + String(p).forHtml() + '</p>													<label id="acceptBeAddedLabel_1" class="labelBeAddedRadio" for="acceptBeAddedRadio_1">														<input id="acceptBeAddedRadio_1" name="beAddedRadio" class="radio" type="radio" value="同意并添加对方为好友" checked="checked" /><span class="selectLabelText">同意并添加对方为好友</span>														<div id="acceptBeAddedLabel_1_reveal" class="acceptBeAddedLabel_1_reveal">													        <p>备注：<input id="buddyRemark" class="buddyRemark" type="text" value="" maxlength="24" /></p>													        <p class="selectBuddyGroupOuter">																分组：<select id="selectBuddyGroup" class="selectBuddyGroup">';
            for (var k in this._qqclient.bdylist.groups) {
                if (k != "_1000" && k != "1000" && k != "1001") {
                    var q = "";
                    if (l == 0) {
                        q = 'selected="selected"'
                    }
                    n += '<option value="' + this._qqclient.bdylist.groups[k].id + '" ' + q + " >" + this._qqclient.bdylist.groups[k].name + "</option>";
                    l++
                }
            }
            m = '</select>															</p>													    </div>													</label>													<label style="display:none;" id="acceptBeAddedLabel_2" class="labelBeAddedRadio" for="acceptBeAddedRadio_2">														<input id="acceptBeAddedRadio_2" name="beAddedRadio" class="radio" type="radio" value="同意" /><span class="selectLabelText">同意</span>													</label>													<label id="refuseBeAddedLabel" class="labelBeAddedRadio" for="refuseBeAddedRadio">														<input id="refuseBeAddedRadio" name="beAddedRadio" class="radio" type="radio" value="拒绝" /><span class="selectLabelText">拒绝</span>													    <div id="refuseBeAddedRadio_reveal" class="refuseBeAddedRadio_reveal">													        <textarea id="refuseBeAddedRadioMsg" class="refuseBeAddedRadioMsg" maxlength="50">拒绝理由</textarea>													    </div>													</label>												</div>												<div class="buttonGroup_1">													<input id="alertOkButton" class="button_1" type="button" value="确 定" />													<input id="alertCloseButton_2" class="button_1" type="button" value="关 闭" />												</div>';
            h = o + n + m;
            this._beAddedAlertBox_node.innerHTML = h;
            this._sysbox_node.appendChild(this._beAddedAlertBox_node);
            this.mf_openSysBox();
            e.on(c.get("buddyRemark"), "keyup", this.mf_checkBuddyRemarkInput, this, true);
            e.on(c.get("buddyRemark"), "blur", this.mf_checkBuddyRemarkInput, this, true);
            e.on(c.get("acceptBeAddedLabel_1"), "click", this.mf_setToAcceptAndAddOpposite, this, true);
            e.on(c.get("acceptBeAddedLabel_2"), "click", this.mf_setToAcceptBeAdded, this, true);
            e.on(c.get("refuseBeAddedLabel"), "click", this.mf_setToRefuseBeAdded, this, true);
            e.on(c.get("refuseBeAddedRadioMsg"), "focus", this.mf_handle_refuseBeAddedRadioMsgOnFocus);
            this.mf_setToAcceptAndAddOpposite();
            c.get("buddyRemark").focus();
            e.on(c.get("alertCloseButton_1"), "click", this.mf_closeBeAddedAlertBox, this, true);
            e.on(c.get("alertCloseButton_2"), "click", this.mf_closeBeAddedAlertBox, this, true)
        },
        mf_checkBuddyRemarkInput: function() {
            this.mf_adjustInput(c.get("buddyRemark"), 16)
        },
        mf_adjustInput: function(i, g) {
            var f = i.value;
            var h = f.getCharLength();
            if (h > g) {
                i.value = f.cutRight(1);
                this.mf_adjustInput(i, g)
            }
        },
        mf_handle_beAddedByOtherUser43: function(i, g) {
            var f = this.getAttribute("sysMsgId");
            c.replaceClass(this, "sysMsgNotRead", "sysMsgHadRead");
            var h = c.get("beAddedMsgInMarqueeMsgBox_" + this.id.split("beAddedMsgInSysMsgBox_")[1]);
            g.mf_removeMarqueeMsg(h);
            g.mf_allowAddbuddy43(f)
        },
        mf_allowAddbuddy43: function(f) {
            var g = this._sysMsgBox[f];
            this._beAddedAlertBox_node = document.createElement("div");
            c.addClass(this._beAddedAlertBox_node, "alertBox");
            this._beAddedAlertBox_node.setAttribute("sysMsgId", f);
            var i = "",
            l = "",
            k = "",
            j = "";
            l = '<div id="alertCloseButton_1" class="alertCloseButton_1">X</div>											<div class="alertTitle_1">添加好友</div>											<div class="alertMsgTitle_1">												<img id="userAvatar" class="userAvatar" src="' + face_server_domain + "/cgi/svr/face/getface?type=1&fid=0&me=" + this._qqclient.uin + "&uin=" + g.from_uin + '" /><p class="titleText">' + String(g.nick).forHtml() + "<" + g.from_uin + '>接受了您的请求并添加您为好友!</p>											</div>											<div class="alertMsgContent_1">												<p>备注：<input id="buddyRemark" class="buddyRemark" type="text" value="" maxlength="24" /></p>											</div>											<div class="buttonGroup_1">												<input id="alertOkButton" class="button_1" type="button" value="确 定" buddy_uin="' + g.from_uin + '" />												<input id="alertCloseButton_2" class="button_1" type="button" value="关 闭" />											</div>';
            i = l + k + j;
            this._beAddedAlertBox_node.innerHTML = i;
            this._sysbox_node.appendChild(this._beAddedAlertBox_node);
            var h = c.get("addOppositeButton");
            if (h) {
                e.on(h, "click", this.mf_handle_addOpposite, this, true)
            }
            e.on(c.get("alertCloseButton_1"), "click", this.mf_closeBeAddedAlertBox, this, true);
            e.on(c.get("alertCloseButton_2"), "click", this.mf_closeBeAddedAlertBox, this, true);
            e.on(c.get("buddyRemark"), "keyup", this.mf_checkBuddyRemarkInput, this, true);
            e.on(c.get("buddyRemark"), "blur", this.mf_checkBuddyRemarkInput, this, true);
            e.on(c.get("alertOkButton"), "click", this.clickBeAllowToAddOkButton, this);
            this.mf_openSysBox();
            c.get("alertCloseButton_2").focus();
            this.mf_setSysMsgProcessed(f)
        },
        mf_handle_refuseBeAddedRadioMsgOnFocus: function() {
            if (this.value.trim() == "拒绝理由") {
                this.value = ""
            }
        },
        mf_reversedAddOpposite: function() {
            var g = c.get("selectBuddyGroup").value;
            var i = c.get("buddyRemark").value.trim();
            var f = this._beAddedAlertBox_node.getAttribute("sysMsgId");
            var h = {
                type: 1,
                from_uin: this._sysMsgBox[f].from_uin,
                signature: this._sysMsgBox[f].msg_array[0],
                group_id: g,
                realname: i
            };
            this._qqclient.addFriendPassive(h);
            this.mf_closeBeAddedAlertBox()
        },
        mf_setToAcceptAndAddOpposite: function() {
            c.setStyle(c.get("acceptBeAddedLabel_1_reveal"), "display", "block");
            c.setStyle(c.get("refuseBeAddedRadio_reveal"), "display", "none");
            e.removeListener(c.get("alertOkButton"), "click");
            e.on(c.get("alertOkButton"), "click", this.mf_acceptAndAddOpposite, this, true)
        },
        mf_setToAcceptBeAdded: function() {
            c.setStyle(c.get("acceptBeAddedLabel_1_reveal"), "display", "none");
            c.setStyle(c.get("refuseBeAddedRadio_reveal"), "display", "none");
            e.removeListener(c.get("alertOkButton"), "click");
            e.on(c.get("alertOkButton"), "click", this.mf_acceptBeAdded, this, true)
        },
        mf_setToRefuseBeAdded: function() {
            c.setStyle(c.get("acceptBeAddedLabel_1_reveal"), "display", "none");
            c.setStyle(c.get("refuseBeAddedRadio_reveal"), "display", "block");
            e.removeListener(c.get("alertOkButton"), "click");
            e.on(c.get("alertOkButton"), "click", this.mf_refuseBeAdded, this, true)
        },
        mf_acceptAndAddOpposite: function() {
            var g = c.get("selectBuddyGroup").value;
            var i = c.get("buddyRemark").value.trim();
            var f = this._beAddedAlertBox_node.getAttribute("sysMsgId");
            var h = {
                type: 3,
                from_uin: this._sysMsgBox[f].from_uin,
                group_id: g,
                realname: i
            };
            this._qqclient.addFriendPassive(h);
            this.mf_closeBeAddedAlertBox();
            var j = c.get("beAddedMsgInSysMsgBox_" + f);
            e.removeListener(j, "click");
            e.on(j, "click", this.mf_hadAcceptAndAddOpposite, this);
            this.mf_setSysMsgProcessed(f)
        },
        mf_hadAcceptAndAddOpposite: function(j, g) {
            var f = this.getAttribute("sysMsgId");
            var h = g._sysMsgBox[f];
            var i = "";
            i = '<div id="alertCloseButton_1" class="alertCloseButton_1">X</div>											<div class="alertTitle_1">添加好友</div>											<div class="alertMsgTitle_1">												<img id="userAvatar" class="userAvatar" src="' + face_server_domain + "/cgi/svr/face/getface?type=1&fid=0&me=" + g._qqclient.uin + "&uin=" + h.from_uin + '" /><p class="titleText">你已经同意' + h.nick.forHtml() + "<" + h.from_uin + '>的请求并添加其为好友!</p>											</div>											<div class="alertMsgContent_1">											</div>											<div class="buttonGroup_1">												<input id="alertCloseButton_2" class="button_1" type="button" value="关 闭" />											</div>';
            g._beAddedAlertBox_node.innerHTML = i;
            g._sysbox_node.appendChild(g._beAddedAlertBox_node);
            e.on(c.get("alertCloseButton_1"), "click", g.mf_closeBeAddedAlertBox, g, true);
            e.on(c.get("alertCloseButton_2"), "click", g.mf_closeBeAddedAlertBox, g, true);
            g.mf_openSysBox();
            c.get("alertCloseButton_2").focus()
        },
        mf_acceptBeAdded: function() {
            var f = this._beAddedAlertBox_node.getAttribute("sysMsgId");
            var g = {
                type: 4,
                from_uin: this._sysMsgBox[f].from_uin
            };
            this._qqclient.addFriendPassive(g);
            this.mf_closeBeAddedAlertBox();
            var h = c.get("beAddedMsgInSysMsgBox_" + f);
            e.removeListener(h, "click");
            e.on(h, "click", this.mf_hadAcceptBeAdded, this);
            this.mf_setSysMsgProcessed(f)
        },
        mf_hadAcceptBeAdded: function(j, g) {
            var f = this.getAttribute("sysMsgId");
            var h = g._sysMsgBox[f];
            var i = "";
            i = '<div id="alertCloseButton_1" class="alertCloseButton_1">X</div>											<div class="alertTitle_1">添加好友</div>											<div class="alertMsgTitle_1">												<img id="userAvatar" class="userAvatar" src="' + face_server_domain + "/cgi/svr/face/getface?type=1&fid=0&me=" + g._qqclient.uin + "&uin=" + h.from_uin + '" /><p class="titleText">你已经同意' + h.nick.forHtml() + "<" + h.from_uin + '>的请求!</p>											</div>											<div class="alertMsgContent_1">											</div>											<div class="buttonGroup_1">												<input id="alertCloseButton_2" class="button_1" type="button" value="关 闭" />											</div>';
            g._beAddedAlertBox_node.innerHTML = i;
            g._sysbox_node.appendChild(g._beAddedAlertBox_node);
            e.on(c.get("alertCloseButton_1"), "click", g.mf_closeBeAddedAlertBox, g, true);
            e.on(c.get("alertCloseButton_2"), "click", g.mf_closeBeAddedAlertBox, g, true);
            g.mf_openSysBox();
            c.get("alertCloseButton_2").focus()
        },
        mf_refuseBeAdded: function() {
            var f = this._beAddedAlertBox_node.getAttribute("sysMsgId");
            var j = c.get("refuseBeAddedRadioMsg");
            var g = String(j.value) == "拒绝理由" ? "": String(j.value);
            var h = {
                type: 5,
                from_uin: this._sysMsgBox[f].from_uin,
                msg: g
            };
            this._qqclient.addFriendPassive(h);
            this.mf_closeBeAddedAlertBox();
            var i = c.get("beAddedMsgInSysMsgBox_" + f);
            e.removeListener(i, "click");
            e.on(i, "click", this.mf_hadRefuseBeAdded, this);
            this.mf_setSysMsgProcessed(f)
        },
        mf_hadRefuseBeAdded: function(j, g) {
            var f = this.getAttribute("sysMsgId");
            var h = g._sysMsgBox[f];
            var i = "";
            i = '<div id="alertCloseButton_1" class="alertCloseButton_1">X</div>											<div class="alertTitle_1">添加好友</div>											<div class="alertMsgTitle_1">												<img id="userAvatar" class="userAvatar" src="' + face_server_domain + "/cgi/svr/face/getface?type=1&fid=0&me=" + g._qqclient.uin + "&uin=" + h.from_uin + '" /><p class="titleText">你已经拒绝' + h.nick.forHtml() + "<" + h.from_uin + '>的请求!</p>											</div>											<div class="alertMsgContent_1">											</div>											<div class="buttonGroup_1">												<input id="alertCloseButton_2" class="button_1" type="button" value="关 闭" />											</div>';
            g._beAddedAlertBox_node.innerHTML = i;
            g._sysbox_node.appendChild(g._beAddedAlertBox_node);
            e.on(c.get("alertCloseButton_1"), "click", g.mf_closeBeAddedAlertBox, g, true);
            e.on(c.get("alertCloseButton_2"), "click", g.mf_closeBeAddedAlertBox, g, true);
            g.mf_openSysBox();
            c.get("alertCloseButton_2").focus()
        },
        mf_closeBeAddedAlertBox: function() {
            this.mf_closeSysBox()
        },
        mf_openSysBox: function() {
            this.showCoverLayer()
        },
        mf_closeSysBox: function() {
            this._sysbox_node.innerHTML = "";
            this.hideCoverLayer()
        },
        showCoverLayer: function() {
            this._cover_layer_node.style.display = "block"
        },
        hideCoverLayer: function() {
            this._cover_layer_node.style.display = "none"
        },
        mf_countOffMsg: function(h, f, i) {
            var g = this._qqclient.bdylist.allUsers[h] || this._qqclient.bdylist.allClasses[h];
            if (! (g.getOffMessagCount)) { (function(j) {
                    var k;
                    j.getOffMessagCount = function(n, p) {
                        k = p;
                        var m = false;
                        for (var o = Math.max(0, (this.history._history_list.length - 30)), l = this.history._history_list.length; o < l; ++o) {
                            if (this.history._history_list[o]._msg_id == n) {
                                m = true;
                                break
                            }
                        }
                        if (!m) {
                            k++
                        }
                        return k
                    }
                })(g)
            }
            return g.getOffMessagCount(f, i)
        },
        mf_addOffMsg: function(h, E, l, r, k, f) {
            var w = l;
            while (w.indexOf("<br />") == 0) {
                w = w.substr(6)
            }
            while (w.indexOf("&nbsp;") == 0) {
                w = w.substr(6);
                while (w.indexOf("<br />") == 0) {
                    w = w.substr(6)
                }
            }
            var g = w.indexOf("<br />");
            if (g != -1) {
                w = w.substr(0, g)
            }
            var y = 20;
            var j = 5;
            var s = w.match(RegExp("<[^>]*>", "g"));
            var D = 0;
            if (w.search(RegExp("<[^>]*>", "g")) > y) {
                D = 0
            } else {
                if (s) {
                    if (s.length >= j) {
                        s = s.slice(0, j)
                    }
                    D = s.join("").length
                }
            }
            var B = w.length - D;
            y = (y > B) ? B: y;
            if (w.length - D > y) {
                w = w.substr(0, y + D) + "..."
            }
            w += "&nbsp;";
            var x = this._qqclient.offline_msg;
            var z = false;
            if (this._qqclient.bdylist.allUsers[h] && this._qqclient.bdylist.allUsers[h].group_id == "1001") {
                return false
            }
            for (var C = 0; C < x.length; C++) {
                if (x[C] == h) {
                    z = true
                }
            }
            r = r || "   ";
            var u = r.split(" ");
            r = u[0] + "&nbsp;&nbsp;&nbsp;" + u[1];
            var o, F = this._qqclient.bdylist.allClasses[h];
            var G;
            if (1 == k) {
                o = this._qqclient.bdylist.allUsers[h].remark || this._qqclient.bdylist.allUsers[h].nick || h;
                var t = this._qqclient.bdylist.allUsers[h].face || 0;
                G = face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this._qqclient.uin + "&uin=" + h
            } else {
                var F = this._qqclient.bdylist.allClasses[h],
                A = (F.property == 1) ? 2002 : 2001;
                o = F.name || F.code;
                G = face_server_domain + "/cgi/svr/face/getface?type=4&me=" + this._qqclient.uin + "&uin=" + f || F.code
            }
            if (!z) {
                x.push(h);
                var H, m;
                switch (k) {
                case 1:
                    H = this._friend_offmsg_area_h_el;
                    m = this._friend_offmsg_area_c_el;
                    this._friend_msg_count_ref.innerHTML = parseInt(this._friend_msg_count_ref.innerHTML) + 1;
                    this._friend_msg_count2_ref.innerHTML = parseInt(this._friend_msg_count2_ref.innerHTML) + 1;
                    break;
                case 2:
                    H = this._class_offmsg_area_h_el;
                    m = this._class_offmsg_area_c_el;
                    this._class_msg_count_ref.innerHTML = parseInt(this._class_msg_count_ref.innerHTML) + 1;
                    this._class_msg_count2_ref.innerHTML = parseInt(this._class_msg_count2_ref.innerHTML) + 1;
                    break;
                default:
                    break
                }
                this._all_msg_count_el.innerHTML = parseInt(this._friend_msg_count_ref.innerHTML) + parseInt(this._class_msg_count_ref.innerHTML) + parseInt(this._mail_count_ref.innerHTML.split("+")[0]) + parseInt(this._sysmsg_count_ref.innerHTML);
                if (this._mail_count_ref.innerHTML.indexOf("+") > 0) {
                    this._all_msg_count_el.innerHTML = this._all_msg_count_el.innerHTML + "+"
                }
                var q = document.createElement("div");
                q.id = "middle_" + h;
                q.setAttribute("msg_count", 1);
                c.addClass(q, "middle-menus infos");
                q.innerHTML = '<div class="rb">								 <div class="rbnr">' + r + '</div>									</div>									<div class="lb">									   <div class="userinfo userinfo2">											<div class="ltt">												<div class="imnr">													<a href="#" uin="' + h + '"><img src="' + G + '" alt="" /></a>													<span><a href="#" uin="' + h + '">' + String(o).forHtml() + '</a></span>												</div>											</div>											<div class="rtt">												<div class="rnr rnr2">													<div><a href="#" uin="' + h + '">' + w + "</a></div>												</div>											 </div>										</div>									</div>";
                m.appendChild(q);
                e.on(q, "click", this.mf_ChatWithUser, this, true);
                e.on(q, "mouseover", this.mf_msgMouseover);
                e.on(q, "mouseout", this.mf_msgMouseout);
                var v = document.createElement("a");
                v.setAttribute("uin", h);
                v.setAttribute("href", "#");
                v.id = "marqueeMsg_" + h;
                v.setAttribute("msg_count", 1);
                v.setAttribute("isOpenChat", "true");
                if (k == 1) {
                    v.setAttribute("title", String(o).forTitle() + "<" + h + ">");
                    v.innerHTML = "【" + String(o).forHtml() + "】来消息了: " + w
                } else {
                    v.setAttribute("title", String(o).forTitle() + "<" + f + ">");
                    v.innerHTML = "【" + String(o).forHtml() + "】来消息了: " + w
                }
                this._message_marquee_inner_el.appendChild(v);
                if (this._message_marquee_inner_el.childNodes.length > 0) {
                    c.setStyle(this._no_message_marquee_el, "display", "none")
                }
                if (m.childNodes.length > 0) {
                    c.setStyle(H, "display", "none")
                }
            } else {
                var q = c.get("middle_" + h);
                var p = this.mf_countOffMsg(h, E, parseInt(q.getAttribute("msg_count")));
                q.setAttribute("msg_count", p);
                q.innerHTML = '<div class="rb">								 <div class="rbnr">' + r + '</div>									</div>									<div class="lb">									   <div class="userinfo userinfo2">											<div class="ltt">												<div class="imnr">													<a href="#" uin="' + h + '"><img src="' + G + '" alt="" /></a>													<span><a href="#" uin="' + h + '">' + String(o).forHtml() + '</a></span>												</div>											</div>											<div class="rtt">												<div class="rnr rnr2">													<div><a href="#" uin="' + h + '">' + w + "<span style='font-weight:bold;'>(" + q.getAttribute("msg_count") + ")</span></a></div>												</div>											 </div>										</div>									</div>";
                var v = c.get("marqueeMsg_" + h);
                if (!v) {
                    this.mf_updateMarqueeMsg();
                    return
                }
                v.setAttribute("msg_count", p);
                if (k == 1) {
                    v.innerHTML = "【" + String(o).forHtml() + "】来消息了: " + w + "<span style='font-weight:bold;'>(" + v.getAttribute("msg_count") + ")</span>"
                } else {
                    v.innerHTML = "【" + String(o).forHtml() + "】来消息了: " + w + "<span style='font-weight:bold;'>(" + v.getAttribute("msg_count") + ")</span>"
                }
            }
            this.mf_updateMarqueeMsg()
        },
        mf_getRemoteJs: function(g, f, i) {
            var h = document.createElement("script");
            h.type = "text/javascript";
            if (YAHOO.env.ua.ie) {
                h.onreadystatechange = function() {
                    if (h.readyState == "complete" || h.readyState == "loaded") {
                        setTimeout(function() {
                            if (f) {
                                f.apply(i)
                            }
                        },
                        0)
                    }
                }
            } else {
                e.on(h, "load", f, this, true)
            }
            h.src = g;
            document.body.appendChild(h)
        },
        mf_getLoginMailInfo: function() {
            var f = ssn("uin");
            if (f == null || (f && f != this._qqclient.cookie_uin)) {
                document.cookie = "uin=" + this._qqclient.cookie_uin + "; PATH=/; DOMAIN=qq.com; ";
                document.cookie = "skey=" + this._qqclient.password + "; PATH=/; DOMAIN=qq.com; "
            }
            this.mf_getRemoteJs(qmail_server_domain + "/cgi-bin/login?fun=passport&target=MLIST&t=login.js&pagesize=10&resp_charset=UTF8&webqq_t=" + (new Date().getTime()), this.mf_checkLoginMail, this)
        },
        mf_setMailLoadingStatus: function() {
            var f = this._mail_msg_area_c_el;
            f.innerHTML = "";
            this._mail_count_ref.innerHTML = 0;
            this._mail_count2_ref.innerHTML = 0;
            var g = document.createElement("div");
            c.addClass(g, "noinfo");
            g.innerHTML = '<div class="loading">载入中...</div>';
            f.appendChild(g);
            if (f.childNodes.length > 0) {
                c.setStyle(this._mail_msg_area_h_el, "display", "none")
            }
        },
        mf_checkLoginMail: function() {
            if (Qmail.newMailsList && Qmail.newMailsList.loginType == 0) {
                this.mf_getMail()
            } else {
                this.mf_mailCantLogin()
            }
        },
        mf_mailCantLogin: function() {
            var f = this._mail_msg_area_c_el;
            f.innerHTML = "";
            this._mail_count_ref.innerHTML = 0;
            this._mail_count2_ref.innerHTML = 0;
            if (Qmail.newMailsList && Qmail.newMailsList.nextUrl) {
                var g = document.createElement("div");
                c.addClass(g, "noinfo");
                g.innerHTML = '<div class="weak_tips">您没有开通Qmail，或者您为Qmail设置了独立密码，无法直接读取邮件，您可以<a target="_blank" href="' + Qmail.newMailsList.nextUrl + '">点击此处登录我的QQ邮箱</a></div>';
                f.appendChild(g);
                if (f.childNodes.length > 0) {
                    c.setStyle(this._mail_msg_area_h_el, "display", "none")
                }
            }
        },
        mf_getMail: function() {
            this.mf_getRemoteJs(Qmail.newMailsList.nextUrl + "&webqq_t=" + (new Date().getTime()), this.mf_listMail, this)
        },
        mf_msgMouseover: function() {
            c.setStyle(this, "backgroundColor", "#f9fcfe")
        },
        mf_msgMouseout: function() {
            c.setStyle(this, "backgroundColor", "#fff")
        },
        mf_removeThisFromMailList: function(g, h) {
            var f = this.getAttribute("url");
            window.open(f, "_s", "");
            h._mail_msg_area_c_el.removeChild(this);
            h._mail_count_ref.innerHTML = parseInt(h._mail_count_ref.innerHTML) - 1;
            h._mail_count2_ref.innerHTML = parseInt(h._mail_count_ref.innerHTML);
            h._all_msg_count_el.innerHTML = parseInt(h._friend_msg_count_ref.innerHTML) + parseInt(h._class_msg_count_ref.innerHTML) + parseInt(h._mail_count_ref.innerHTML.split("+")[0]) + parseInt(this._sysmsg_count_ref.innerHTML);
            if (h._mail_count_ref.innerHTML.indexOf("+") > 0) {
                h._all_msg_count_el.innerHTML = h._all_msg_count_el.innerHTML + "+"
            }
        },
        mf_delayRefreshMailMsg: function(g, h) {
            var f = this.getAttribute("url");
            window.open(f, "_s", "");
            if (h._timer_loadMail) {
                clearTimeout(h._timer_loadMail)
            }
            h._timer_loadMail = setTimeout(function() {
                h.mf_setMailLoadingStatus();
                h.mf_getLoginMailInfo()
            },
            5000)
        },
        mf_listMail: function(p) {
            var l = this._mail_msg_area_c_el;
            l.innerHTML = "";
            if (Qmail.newMailsList && Qmail.newMailsList.from) {
                var g = Qmail.newMailsList.total > 10 ? 10 : Qmail.newMailsList.total;
                var f = Qmail.newMailsList.total > 10 ? "10+": Qmail.newMailsList.total;
                this._mail_count_ref.innerHTML = f;
                this._mail_count2_ref.innerHTML = f;
                for (var k = 1; k <= g; k++) {
                    var s;
                    switch (Qmail.newMailsList.type[k]) {
                    case 0:
                        s = "mail";
                        break;
                    case 1:
                        s = "system";
                        break;
                    default:
                        break
                    }
                    var q = Qmail.newMailsList.mailurl[k];
                    var t = Qmail.newMailsList.from[k];
                    var j = Qmail.newMailsList.title[k];
                    var n = Qmail.newMailsList.summary[k];
                    var m = Qmail.newMailsList.datetime[k] || "   ";
                    var r = document.createElement("div");
                    var o = m.split(" ");
                    m = o[0] + "&nbsp;&nbsp;&nbsp;" + o[1];
                    c.addClass(r, "infos");
                    r.setAttribute("url", q);
                    r.innerHTML = '<div class="rb">												<div class="rbnr">' + m + '</div>										  </div>										  <div class="lb">												 <div class="userinfo userinfo2">														<div class="ltt">															<div class="imnr">																<span class="webico ' + s + '"></span>													<span class="webname">' + t + '</span>															 </div>														</div>														<div class="rtt">															 <div class="rnr rnr2">																 <div>' + j + '<span class="black4"> - ' + n + "</span></div>															 </div>														</div>												  </div>										  </div>";
                    e.on(r, "mouseover", this.mf_msgMouseover);
                    e.on(r, "mouseout", this.mf_msgMouseout);
                    var h = this;
                    if (this._mail_count_ref.innerHTML == "10+") {
                        e.on(r, "click", h.mf_delayRefreshMailMsg, this)
                    } else {
                        e.on(r, "click", this.mf_removeThisFromMailList, this)
                    }
                    l.appendChild(r)
                }
                if (l.childNodes.length == 0) {
                    c.setStyle(this._mail_msg_area_h_el, "display", "block")
                } else {
                    c.setStyle(this._mail_msg_area_h_el, "display", "none")
                }
            } else {
                var l = this._mail_msg_area_c_el;
                l.innerHTML = "";
                this._mail_count_ref.innerHTML = 0;
                this._mail_count2_ref.innerHTML = 0;
                if (Qmail.newMailsList && Qmail.newMailsList.nextUrl) {
                    var r = document.createElement("div");
                    c.addClass(r, "noinfo");
                    r.innerHTML = '<div class="weak_tips">系统忙，您可以稍后点击“刷新”，或者<a target="_blank" href="' + Qmail.newMailsList.nextUrl + '">点击此处登陆我的QQ邮箱</a></div>';
                    l.appendChild(r);
                    if (l.childNodes.length > 0) {
                        c.setStyle(this._mail_msg_area_h_el, "display", "none")
                    }
                }
            }
            this._all_msg_count_el.innerHTML = parseInt(this._friend_msg_count_ref.innerHTML) + parseInt(this._class_msg_count_ref.innerHTML) + parseInt(this._mail_count_ref.innerHTML.split("+")[0]) + parseInt(this._sysmsg_count_ref.innerHTML);
            if (this._mail_count_ref.innerHTML.indexOf("+") > 0) {
                this._all_msg_count_el.innerHTML = this._all_msg_count_el.innerHTML + "+"
            }
        },
        mf_refreshBuddyFeeds: function() {
            var h = this._buddys_feeds_el;
            h.innerHTML = "";
            var g = document.createElement("div");
            c.addClass(g, "loading");
            g.innerHTML = "载入中...";
            h.appendChild(g);
            this._loading_flag = true;
            this.mf_loadBuddyFeeds();
            var f = this;
            if (this._timer) {
                clearTimeout(this._timer)
            }
            this._timer = setTimeout(function() {
                f.mf_delayHandle()
            },
            1500)
        },
        mf_delayHandle: function() {
            if (this._loading_flag && this.cache_buddy_feeds) {
                var f = this._buddys_feeds_el;
                f.innerHTML = this.cache_buddy_feeds
            }
        },
        mf_loadBuddyFeeds: function() {
            var f = buddy_situation_server_domain + "/feed/?webqq_t=" + (new Date().getTime());
            var g = ssn("uin");
            if (g == null || (g && g != this._qqclient.cookie_uin)) {
                document.cookie = "uin=" + this._qqclient.cookie_uin + "; PATH=/; DOMAIN=qq.com; ";
                document.cookie = "skey=" + this._qqclient.password + "; PATH=/; DOMAIN=qq.com; "
            }
            this.mf_getRemoteJs(f, this.mf_handleBuddyFeeds, this)
        },
        mf_handleBuddyFeeds: function() {
            this._loading_flag = false;
            var g = this._buddys_feeds_el;
            if (typeof buddyFeeds != "undefined") {
                if (buddyFeeds.retcode == 0) {
                    g.innerHTML = "";
                    if (buddyFeeds.result == "") {
                        var y = document.createElement("div");
                        c.addClass(y, "weak_tips");
                        y.innerHTML = "您还没有收到好友近况。";
                        g.appendChild(y)
                    } else {
                        var q = buddyFeeds.result.ul;
                        var x = function(z) {
                            z = z || document;
                            var A = z.firstChild;
                            while (A != null) {
                                if (A.nodeType == 3 && !/\S/.test(A.nodeValue)) {
                                    z.removeChild(A)
                                } else {
                                    if (A.nodeType == 1) {
                                        x(A)
                                    }
                                }
                                A = A.nextSibling
                            }
                        };
                        this._buddyFeedsAmount = 0;
                        for (var t in q) {
                            this._buddyFeedsAmount++;
                            var y = document.createElement("div");
                            c.addClass(y, "infos2 buddy_item_inBuddyState");
                            var o = "",
                            m = "",
                            k = "",
                            j = "";
                            var u;
                            if (q[t].qzone) {
                                u = buddyFeeds.result.nowtime - q[t].qzone.time
                            } else {
                                if (q[t].signature) {
                                    u = buddyFeeds.result.nowtime - q[t].signature.time
                                }
                            }
                            var n = Math.floor(u / 60);
                            var p = Math.floor(u / 3600);
                            var r = Math.floor(u / 86400);
                            var l = Math.floor(u / 2635200);
                            var s = Math.floor(u / 31557600);
                            var v = "前";
                            if (s >= 1) {
                                v = s + "年" + v
                            } else {
                                if (l >= 1) {
                                    if (l == 2) {
                                        l = "两"
                                    }
                                    v = l + "个月" + v
                                } else {
                                    if (r >= 1) {
                                        if (r == 2) {
                                            r = "两"
                                        }
                                        v = r + "天" + v
                                    } else {
                                        if (p >= 1) {
                                            if (p == 2) {
                                                p = "两"
                                            }
                                            v = p + "个小时" + v
                                        } else {
                                            if (n >= 1) {
                                                if (n == 2) {
                                                    n = "两"
                                                }
                                                v = n + "分钟" + v
                                            } else {
                                                v = "刚刚"
                                            }
                                        }
                                    }
                                }
                            }
                            var w = q[t].uinfo.nick;
                            var f = q[t].uinfo.face;
                            var i = String(q[t].uinfo.nick);
                            if (this._qqclient.bdylist.allUsers[t] && this._qqclient.bdylist.allUsers[t].remark) {
                                w = this._qqclient.bdylist.allUsers[t].remark;
                                i = String(w + "(" + q[t].uinfo.nick + ")")
                            }
                            o = '<div class="userinfo userinfo3">										<a class="buddy_avatar_inBuddyState" isOpenChatBox="true" onclick="WEBQQ.obj.QQClient.actChat(' + t + ');return false;" title="发起会话...">											<img src="' + face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this._qqclient.uin + "&uin=" + t + '" isOpenChatBox="true" width="40" height="40" />										</a>										<div class="rtt">											<div id="buddy_"' + t + ' class="rnr3">												<div class="time">													<span id="feed_buddy_name_' + t + '" class="buddy_name_inBuddyState" isOpenChatBox="true" onclick="WEBQQ.obj.QQClient.actChat(' + t + ');return false;" title="' + i.forTitle() + "<" + t + '>">' + i.forHtml() + '</span>													<a class="qzoneicon_in_chatbox" title="进入Qzone!" href="http://user.qzone.qq.com/' + t + '" target="_blank"></a>													<span class="times">' + v + "</span>												</div>";
                            if (q[t].qzone) {
                                m = '<div class="qzone"><a href="http://' + t + '.qzone.qq.com/" target="_blank" class="qzoneico" title="进入空间"></a>													<span>更新了QQ空间：<a isOpenQzoneBox="true" buddy_uin="' + t + '" onclick="WEBQQ.obj.QQClient.mainPanel.mf_show_qzoneBlog(' + t + "," + buddyFeeds.result.ul[t].qzone.time + ",'" + buddyFeeds.result.ul[t].qzone.url + '\');return false;" href="#">' + q[t].qzone.title.forHtml() + '</a></span></div>												<div class="qzonenr">													<span>' + q[t].qzone.content.forHtml().replace(RegExp("(<[^>]*>)", "gi"), "&nbsp;") + '</span>													<a isOpenQzoneBox="true" buddy_uin="' + t + '" onclick="WEBQQ.obj.QQClient.mainPanel.mf_show_qzoneBlog(' + t + "," + buddyFeeds.result.ul[t].qzone.time + ",'" + buddyFeeds.result.ul[t].qzone.url + '\');return false;" href="#">预览>></a>												</div>'
                            } else {
                                if (q[t].signature) {
                                    m = '<div class="qzone la_name">更新了个性签名：<font>' + q[t].signature.sig.forHtml() + "</font></div>"
                                }
                            }
                            if (q[t].impression) {
                                k = '<div class="qqdt">													<span>好友眼中的【' + w.forHtml() + '】：</span>													<span class="tag">载入中...</span>												</div>'
                            } else {
                                k = '<div id="buddyImpressions_' + t + '" class="qqdt"></div>'
                            }
                            j = "</div>										</div>									</div>";
                            y.innerHTML = o + m + k + j;
                            x(this._message_area_el);
                            g.appendChild(y)
                        }
                        this.mf_getBuddyImpressions()
                    }
                } else {
                    if (buddyFeeds.retcode == -1) {} else {
                        if (buddyFeeds.retcode == -2) {}
                    }
                }
            } else {
                if (this.cache_buddy_feeds) {
                    var g = this._buddys_feeds_el;
                    g.innerHTML = this.cache_buddy_feeds
                } else {}
            }
            if (this._auto_refresh_timer) {
                clearTimeout(this._auto_refresh_timer)
            }
            var h = this;
            this._auto_refresh_timer = setTimeout(function() {
                h.mf_refreshBuddyFeeds()
            },
            1200000)
        },
        mf_setRealnameOfBuddy: function(g, h, f) {
            var i = c.get("feed_buddy_name_" + g);
            var j = c.get("impressions_buddy_name_" + g);
            if (i) {
                i.innerHTML = (h + "(" + f + ")").forHtml();
                i.title = (h + "(" + f + ")<" + g + ">").forTitle()
            }
            if (j) {
                j.innerHTML = h.forHtml()
            }
        },
        mf_getBuddyImpressions: function() {
            var g = "";
            var i = 0;
            for (var h in buddyFeeds.result.ul) {
                i++;
                g += "&u" + i + "=" + h
            }
            var f = buddy_impression_server_domain + "/app/yx/cgi-bin/get_web_feeds?hc=6&lc=4&c=" + this._buddyFeedsAmount + g + "&webqq_t=" + (new Date().getTime());
            this.mf_getRemoteJs(f, this.mf_handleBuddyImpressions, this)
        },
        mf_handleBuddyImpressions: function() {
            if (typeof data10 == "object" && data10.err == 0) {
                var k = data10;
                var p = k.ul;
                for (var l = 0; l < p.length; l++) {
                    var r = c.get("buddyImpressions_" + p[l].u);
                    if (r) {
                        var m = '<div><span>好友眼中的【<font id="impressions_buddy_name_' + p[l].u + '">' + ((this._qqclient.bdylist.allUsers[p[l].u] && this._qqclient.bdylist.allUsers[p[l].u].remark) || buddyFeeds.result.ul[p[l].u].uinfo.nick).forHtml() + '</font>】：</span><span class="tag">';
                        var h = Math.rand(1, 4);
                        for (var g = 0; g < p[l].el.length; g++) {
                            var s = p[l].el[g].ew;
                            var v = s.ewToOriginal();
                            var f = v.toTitle();
                            var o = v.toHtml();
                            var q = o;
                            var u = v.getCharLength();
                            if (u > 14) {
                                o = (v.subStringByChar(0, 14) + "…").toHtml();
                                q = o
                            }
                            m += '<span class="cs' + ((g + h) % 4 + 1) + '" title="被这样评价 ' + p[l].el[g].c + " 次：" + f + '">' + q + "</span>"
                        }
                        m += '</span><a id="Tab1_bewrite_button_el_' + p[l].u + '" href="#" uin="' + p[l].u + '">我来评价</a></div>';
                        r.innerHTML = m;
                        var n = c.get("Tab1_bewrite_button_el_" + p[l].u);
                        e.on(n, "click", this.mf_gotoBewriteBuddy, this);
                        c.setStyle(r, "display", "block")
                    }
                }
            } else {}
            var t = this._buddys_feeds_el;
            this.cache_buddy_feeds = t.innerHTML
        },
        mf_show_qzoneBlog: function(h, i, f) {
            var g = buddy_situation_server_domain + "/qzone/view/u/" + h + "/id/" + i + "/?webqq_t=" + (new Date().getTime());
            this._qzoneBlog_head_el.innerHTML = "最新日志";
            this._qzoneBlog_title_el.href = f;
            this._qzoneBlog_title_el.innerHTML = "";
            this._qzoneBlog_datetime_el.innerHTML = "";
            this._qzoneBlog_content_el.innerHTML = '<div class="loading">载入中...</div>';
            c.setStyle(this._show_qzoneBlog_el, "display", "block");
            this.mf_getRemoteJs(g, this.mf_handelQzoneBlog, this)
        },
        mf_handelQzoneBlog: function() {
            if (qzoneBlog && qzoneBlog.retcode == 0) {
                this._qzoneBlog_title_el.innerHTML = String(qzoneBlog.result.title).forHtml();
                var h = new Date();
                h.setTime(parseInt(qzoneBlog.result.time) * 1000);
                this._qzoneBlog_datetime_el.innerHTML = h.format("yyyy年MM月dd日");
                try {
                    var f = ubbReplace(qzoneBlog.result.content.convSP().convCR(), "all", null, null, qzone_imgcache_server_domain);
                    this._qzoneBlog_content_el.innerHTML = f
                } catch(g) {
                    this._qzoneBlog_content_el.innerHTML = "暂不支持Flash及视频查看，你可以点击文章标题去Qzone查看。"
                }
            } else {
                alert("获取日志内容出错！")
            }
        },
        mf_hide_qzoneBlog: function(f) {
            e.stopPropagation(f);
            c.setStyle(this._show_qzoneBlog_el, "display", "none")
        },
        mf_close_qzoneBlog: function(f) {
            e.stopEvent(f);
            c.setStyle(this._show_qzoneBlog_el, "display", "none")
        },
        mf_loadMyBuddyImpression: function() {
            var f = buddy_impression_server_domain + "/app/yx/cgi-bin/show_mel?hc=8&lc=4&time=" + ((new Date()).getTime());
            this._impression_of_my_el.innerHTML = '<div class="loading">载入中...</div>';
            this.mf_getRemoteJs(f, this.mf_handleMyBuddyImpression, this)
        },
        mf_handleMyBuddyImpression: function() {
            if (typeof data2 == "object" && data2.err == 0) {
                var W = data2;
                this._impression_of_my_el.innerHTML = "";
                if (W.el == 0) {
                    c.setStyle(this._impression_of_my_el, "height", "50px");
                    var C = document.createElement("div");
                    C.innerHTML = "<span>还没有好友对你进行评价，你可以先去评价下面的好友。</span>";
                    c.addClass(C, "noys");
                    this._impression_of_my_el.appendChild(C)
                } else {
                    c.setStyle(this._impression_of_my_el, "height", "350px");
                    var F = ["#406ec3", "#e97238", "#00998a", "#4646be", "#e050c3", "#66b82b", "#0b6795", "#00998a", "#ef8a58", "#c45454", "#44c2b6", "#0185c7"];
                    var u = [[184, 66], [177, 116], [71, 127], [56, 75], [70, 25], [172, 2], [270, 10], [285, 58], [279, 106], [275, 155], [172, 169], [76, 172]];
                    var k = [ - 50, -29];
                    var q = document.createElement("label");
                    q.innerHTML = "大家对我的印象是:";
                    c.addClass(q, "label01");
                    this._impression_of_my_el.appendChild(q);
                    var Z = document.createElement("div");
                    c.addClass(Z, "impressionListOfMe");
                    this._impression_of_my_el.appendChild(Z);
                    var f = 38;
                    var L = 14;
                    for (var U = 0; U < W.el.length; U++) {
                        var J = W.el[U].ew;
                        var R = J.ewToOriginal();
                        var Q = R.toTitle();
                        var y = R.getCharLength();
                        var D = "";
                        var z = "12px";
                        var t = 0;
                        if (y <= 4) {
                            z = "30px"
                        } else {
                            if (y <= 8) {
                                z = "20px"
                            } else {
                                if (y <= 12) {
                                    z = "14px"
                                } else {
                                    z = "12px"
                                }
                            }
                        }
                        if (y <= L) {
                            D = R.toHtml();
                            t = 2
                        } else {
                            if (y <= (L * 2)) {
                                var H = Math.ceil(y / 2);
                                D = R.subStringByChar(0, H).toHtml() + "<br />" + R.subStringByChar(H).toHtml();
                                t = 1
                            } else {
                                if (y <= f) {
                                    var H = Math.ceil(y / 3);
                                    D = R.subStringByChar(0, H).toHtml() + "<br />" + R.subStringByChar(H, (H * 2)).toHtml() + "<br />" + R.subStringByChar(H * 2).toHtml();
                                    t = 0
                                } else {
                                    var P = R.subStringByChar(0, f) + "...";
                                    var O = P.getCharLength();
                                    var H = Math.ceil(O / 3);
                                    D = P.subStringByChar(0, H).toHtml() + "<br />" + P.subStringByChar(H, (H * 2)).toHtml() + "<br />" + P.subStringByChar(H * 2).toHtml();
                                    t = 0
                                }
                            }
                        }
                        var v = document.createElement("a");
                        c.addClass(v, "impressionListItemA" + t);
                        c.setStyle(v, "cursor", "default");
                        c.setStyle(v, "position", "absolute");
                        v.setAttribute("href", "#");
                        Z.appendChild(v);
                        var Y = document.createElement("span");
                        c.addClass(Y, "ew");
                        c.setStyle(Y, "fontSize", z);
                        Y.setAttribute("eid", W.el[U].eid);
                        Y.setAttribute("ew", W.el[U].ew);
                        Y.setAttribute("ewInDb", W.el[U].EW);
                        Y.innerHTML = D;
                        v.appendChild(Y);
                        var p = document.createElement("span");
                        c.addClass(p, "span_right");
                        p.setAttribute("title", "删除此印象");
                        v.appendChild(p);
                        var x = document.createElement("span");
                        c.addClass(x, "delete" + t);
                        p.appendChild(x);
                        e.on(p, "click", this.mf_removeThisMyBuddyImpression, this);
                        c.setStyle(v, "left", (u[U][0] - (v.offsetWidth / 2)) + "px");
                        c.setStyle(v, "top", u[U][1] + "px");
                        var G = "";
                        if (W.el[U].ul) {
                            var V = W.el[U].ul.length - 1;
                            for (var T = V; T > 0; T--) {
                                var X = (W.el[U].ul[T].n && W.el[U].ul[T].n.trim() != "") ? W.el[U].ul[T].n: W.el[U].ul[T].u;
                                G += X + "、"
                            }
                            G += (W.el[U].ul[0].n && W.el[U].ul[0].n.trim() != "") ? W.el[U].ul[0].n: W.el[U].ul[0].u
                        }
                        if (G.length > 150) {
                            G = G.substring(0, 149) + "..."
                        }
                        var C = document.createElement("div");
                        c.setStyle(C, "display", "none");
                        document.body.appendChild(C);
                        C.innerHTML = G;
                        G = C.innerText ? C.innerText: C.textContent;
                        var N = 1;
                        if (W.el[U].ul == 0) {
                            if (W.el[U].cn) {
                                N = W.el[U].cn
                            }
                            v.setAttribute("title", "被这样描述 " + N + " 次：" + R)
                        } else {
                            v.setAttribute("title", G + " 这样描述我：" + R)
                        }
                        if (U < F.length) {
                            c.setStyle(Y, "color", F[U])
                        } else {
                            c.setStyle(Y, "color", F[A - 1])
                        }
                    }
                    var w = document.createElement("ul");
                    c.addClass(w, "feedList");
                    this._impression_of_my_el.appendChild(w);
                    var S = W.el;
                    BubbleSort(S, "ts");
                    var A = (S.length > 4 ? 4 : S.length);
                    for (var U = 0; U < A; U++) {
                        var n;
                        var K = (new Date().getTime() / 1000);
                        var K = W.sct;
                        n = K - S[U].ts;
                        var M = Math.floor(n / 60);
                        var I = Math.floor(n / 3600);
                        var o = Math.floor(n / 86400);
                        var l = Math.floor(n / 2635200);
                        var B = Math.floor(n / 31557600);
                        var h = "前";
                        if (B >= 1) {
                            h = B + "年" + h
                        } else {
                            if (l >= 1) {
                                if (l == 2) {
                                    l = "两"
                                }
                                h = l + "个月" + h
                            } else {
                                if (o >= 1) {
                                    if (o == 2) {
                                        o = "两"
                                    }
                                    h = o + "天" + h
                                } else {
                                    if (I >= 1) {
                                        if (I == 2) {
                                            I = "两"
                                        }
                                        h = I + "个小时" + h
                                    } else {
                                        if (M >= 1) {
                                            if (M == 2) {
                                                M = "两"
                                            }
                                            h = M + "分钟" + h
                                        } else {
                                            h = n + "秒" + h
                                        }
                                    }
                                }
                            }
                        }
                        if (S[U].ul != 0) {
                            var m = document.createElement("li");
                            c.addClass(m, "feedListItem" + (U % 2));
                            var s = S[U].ul[0];
                            var J = S[U].ew;
                            var R = J.ewToOriginal();
                            var Q = R.toTitle();
                            var r = R.toHtml();
                            var E = r;
                            var g = R.getCharLength();
                            if (g > 16) {
                                r = (R.subStringByChar(0, 16) + "...").toHtml();
                                E = r
                            }
                            var X = (s.n && s.n.trim() != "") ? s.n: s.u;
                            m.innerHTML = '<a id="impression_feed_link_id_' + U + "_" + s.u + '" class="link01" href="#" uin="' + s.u + '" title="描述' + String(X).forTitle() + '">' + String(X).forHtml() + '</a>&nbsp;<span class="feed_time">' + h + '描述了我:</span>&nbsp;<span class="feed_word">' + E + "</span>";
                            w.appendChild(m);
                            e.on(c.get("impression_feed_link_id_" + U + "_" + s.u), "click", this.mf_gotoBewriteBuddy, this)
                        }
                    }
                }
            }
        },
        mf_removeThisMyBuddyImpression: function(i, k) {
            var f = this.previousSibling.getAttribute("ewInDb").ewToOriginal();
            var j = this.previousSibling.getAttribute("ew").ewToOriginal();
            var h = this.previousSibling.getAttribute("eid");
            if (confirm("确认删除印象词【" + j + "】吗？")) {
                var g = buddy_impression_server_domain + "/app/yx/cgi-bin/del_e?eid=" + h + "&EW=" + (f) + "&time=" + ((new Date()).getTime());
                k.mf_getRemoteJs(g, k.mf_handleRemoveMyBuddyImpression, k)
            }
        },
        mf_handleRemoveMyBuddyImpression: function() {
            if (typeof data5 == "object" && data5.err == 0) {
                this.mf_loadMyBuddyImpression();
                alert("删除成功！")
            } else {
                alert("删除失败！")
            }
        },
        mf_loadImpressionOfBuddy: function(g) {
            var f = buddy_impression_server_domain + "/app/yx/cgi-bin/show_fel?d=" + g + "&hc=8&lc=4&time=" + ((new Date()).getTime());
            this.mf_getRemoteJs(f, this.mf_handleImpressionOfBuddy, this)
        },
        mf_handleImpressionOfBuddy: function() {
            if (typeof data3 == "object" && data3.err == 0) {
                var A = data3;
                var g = A.d;
                var j = c.get("ImpressionOfBuddyItem_el_" + g);
                if (j) {
                    try {
                        c.replaceClass(j, "infos4", "infos3")
                    } catch(w) {}
                    var n = c.get("Tab3_bewrite_button_el_" + g);
                    n.innerHTML = "";
                    var y = document.createElement("a");
                    y.href = "#";
                    y.setAttribute("uin", g);
                    e.on(y, "click", this.mf_toBewriteBuddy, this);
                    y.innerHTML = "我来评价";
                    n.appendChild(y)
                } else {
                    j = document.createElement("div");
                    j.id = "ImpressionOfBuddyItem_el_" + g;
                    c.addClass(j, "infos");
                    c.addClass(j, "infos3");
                    this._impression_of_buddy_el.appendChild(j);
                    var u = document.createElement("div");
                    c.addClass(u, "rb");
                    var z = document.createElement("div");
                    z.id = "Tab3_bewrite_button_el_" + g;
                    c.addClass(z, "rbnr");
                    var y = document.createElement("a");
                    y.href = "#";
                    y.setAttribute("uin", g);
                    e.on(y, "click", this.mf_toBewriteBuddy, this);
                    y.innerHTML = "我来评价";
                    z.appendChild(y);
                    u.appendChild(z);
                    j.appendChild(u);
                    var o = document.createElement("div");
                    c.addClass(o, "lb");
                    var q = (this._qqclient.bdylist.allUsers[String(g)] && this._qqclient.bdylist.allUsers[String(g)].remark != "") ? this._qqclient.bdylist.allUsers[String(g)].remark: A.n;
                    var l = '<div class="userinfo userinfo2">								<div class="ltt">									<div class="imnr">										<span class="webico"><img src="' + face_server_domain + "/cgi/svr/face/getface?type=1&fid=0&me=" + this._qqclient.uin + "&uin=" + g + '" alt="" /></span>										<span class="webname" title="' + q + "<" + g + '>">' + q + '</span>									</div>								</div>								<div class="rtt">									<div id="TAB3_impression_of_buddy_el_' + g + '" class="rnr height3">									</div>								 </div>							</div>';
                    o.innerHTML = l;
                    j.appendChild(o)
                }
                var s = c.get("TAB3_impression_of_buddy_el_" + g);
                var m = '<div class="tag">';
                if (A.el == 0) {
                    m += "暂无印象评价"
                } else {
                    var p = Math.rand(1, 4);
                    for (var t = 0; t < A.el.length; t++) {
                        var v = A.el[t].ew;
                        var f = v.ewToOriginal();
                        var k = f.toTitle();
                        var h = f.toHtml();
                        var r = h;
                        var x = f.getCharLength();
                        if (x > 14) {
                            h = (f.subStringByChar(0, 14) + "…").toHtml();
                            r = h
                        }
                        m += '<span class="cs' + ((t + p) % 4 + 1) + '" title="被这样评价 ' + A.el[t].c + " 次：" + k + '">' + r + "</span>"
                    }
                }
                m += "</div>";
                s.innerHTML = m
            }
        },
        mf_refreshImpressionOfBuddys: function() {
            this.mf_loadMyBuddyImpression();
            var g = this._impression_of_buddy_el;
            g.innerHTML = "";
            var f = document.createElement("div");
            c.addClass(f, "loading");
            f.innerHTML = "载入中...";
            g.appendChild(f);
            this.mf_loadAllImpressionsOfBuddys(this._qqclient.bdylist.friendList.uins)
        },
        mf_loadAllImpressionsOfBuddys: function(m) {
            this._allUinsArr = m;
            var k = [];
            var f = 50;
            var l = m.length;
            for (var h = 0; h < l; h++) {
                if (this._qqclient.bdylist.allUsers[m[h]].remark != "") {
                    k.push(m[h]);
                    if (k.length == f) {
                        break
                    }
                } else {
                    if (this._qqclient.bdylist.allUsers[m[h]].stat != 20) {
                        k.push(m[h]);
                        if (k.length == f) {
                            break
                        }
                    }
                }
            }
            l = (m.length < f) ? m.length: f;
            if (k.length < f) {
                var n = false;
                for (var h = 0; h < m.length; h++) {
                    for (var g = k.length; g < l; g++) {
                        if (k[g] == m[h]) {
                            n = true
                        }
                    }
                    if (n === false) {
                        k.push(m[h])
                    }
                    if (k.length == f) {
                        break
                    }
                }
            }
            this._impressionBuddysUinsArr = k;
            this.mf_loadImpressionsOfBuddys(k)
        },
        mf_loadImpressionsOfBuddys: function(j) {
            var h = "";
            if (j.length > 0) {
                for (var g = 0; g < j.length; g++) {
                    h += "&u" + (g + 1) + "=" + j[g]
                }
                var f = buddy_impression_server_domain + "/app/yx/cgi-bin/get_web_feeds?hc=6&lc=4&c=" + j.length + h + "&time=" + ((new Date()).getTime());
                this.mf_getRemoteJs(f, this.mf_handleImpressionsOfBuddys, this)
            } else {
                this._impression_of_buddy_el.innerHTML = ""
            }
        },
        mf_handleImpressionsOfBuddys: function() {
            if (typeof data10 == "object" && data10.err == 0) {
                var E = data10;
                var o = E.ul;
                this._impression_of_buddy_el.innerHTML = "";
                for (var w = 0; w < this._impressionBuddysUinsArr.length; w++) {
                    var g = this._impressionBuddysUinsArr[w];
                    var k = c.get("ImpressionOfBuddyItem_el_" + g);
                    if (k) {
                        try {
                            c.replaceClass(k, "infos4", "infos3")
                        } catch(A) {}
                        var q = c.get("Tab3_bewrite_button_el_" + g);
                        q.innerHTML = "";
                        var C = document.createElement("a");
                        C.href = "#";
                        C.setAttribute("uin", g);
                        e.on(C, "click", this.mf_toBewriteBuddy, this);
                        C.innerHTML = "我来评价";
                        q.appendChild(C)
                    } else {
                        k = document.createElement("div");
                        k.id = "ImpressionOfBuddyItem_el_" + g;
                        c.addClass(k, "infos");
                        c.addClass(k, "infos3");
                        this._impression_of_buddy_el.appendChild(k);
                        var y = document.createElement("div");
                        c.addClass(y, "rb");
                        var D = document.createElement("div");
                        D.id = "Tab3_bewrite_button_el_" + g;
                        c.addClass(D, "rbnr");
                        var C = document.createElement("a");
                        C.href = "#";
                        C.setAttribute("uin", g);
                        e.on(C, "click", this.mf_toBewriteBuddy, this);
                        C.innerHTML = "我来评价";
                        D.appendChild(C);
                        y.appendChild(D);
                        k.appendChild(y);
                        var s = document.createElement("div");
                        c.addClass(s, "lb");
                        var t = (this._qqclient.bdylist.allUsers[String(g)]) ? (this._qqclient.bdylist.allUsers[String(g)].remark || this._qqclient.bdylist.allUsers[String(g)].nick) : String(g);
                        var m = '<div class="userinfo userinfo2">									<div class="ltt">										<div class="imnr">											<span class="webico"><img src="' + face_server_domain + "/cgi/svr/face/getface?type=1&fid=0&me=" + this._qqclient.uin + "&uin=" + g + '" alt="" /></span>											<span class="webname" title="' + t.forTitle() + "<" + g + '>">' + t.forHtml() + '</span>										</div>									</div>									<div class="rtt">										<div id="TAB3_impression_of_buddy_el_' + g + '" class="rnr height3">										</div>									 </div>								</div>';
                        s.innerHTML = m;
                        k.appendChild(s)
                    }
                    var x = c.get("TAB3_impression_of_buddy_el_" + g);
                    var n = '<div class="tag">';
                    var p = false;
                    for (var v = 0; v < o.length; v++) {
                        if (this._impressionBuddysUinsArr[w] == o[v].u) {
                            p = v
                        }
                    }
                    if (p !== false && o[p].el != 0) {
                        var r = Math.rand(1, 4);
                        for (var v = 0; v < o[p].el.length; v++) {
                            var z = o[p].el[v].ew;
                            var f = z.ewToOriginal();
                            var l = f.toTitle();
                            var h = f.toHtml();
                            var u = h;
                            var B = f.getCharLength();
                            if (B > 14) {
                                h = (f.subStringByChar(0, 14) + "…").toHtml();
                                u = h
                            }
                            n += '<span class="cs' + ((v + r) % 4 + 1) + '" title="' + l + '">' + u + "</span>"
                        }
                    } else {
                        n += "暂无印象评价"
                    }
                    n += "</div>";
                    x.innerHTML = n
                }
            }
        },
        mf_toBewriteBuddy: function(j, f) {
            var g = e.getTarget(j);
            var i = g.getAttribute("uin");
            var h = buddy_impression_server_domain + "/app/yx/cgi-bin/get_t?d=" + i + "&time=" + ((new Date()).getTime());
            f.mf_getRemoteJs(h, f.mf_testBewriteDate, f)
        },
        mf_testBewriteDate: function() {
            if (typeof data9 == "object" && data9.err == 0) {
                var h = data9;
                var f = h.d;
                var k = "TA";
                if (h.g == 1) {
                    k = "她"
                } else {
                    if (h.g == 0) {
                        k = "他"
                    }
                }
                var l = h.ew;
                var n = l.ewToOriginal();
                var j = l.toHtml();
                var m = c.get("ImpressionOfBuddyItem_el_" + f);
                var i = Math.ceil(h.lvt / 60 / 60 / 24) - Math.ceil(h.sct / 60 / 60 / 24);
                if (i <= 0) {
                    var g = buddy_impression_server_domain + "/app/yx/cgi-bin/download?d=" + f + "&c=17&time=" + ((new Date()).getTime());
                    this.mf_getRemoteJs(g, this.mf_handleLoadBwriteImpression, this)
                } else {
                    if (i == 1) {
                        if (m) {
                            this._message_area_el.scrollTop = (c.getY(m) + this._message_area_el.scrollTop) - 135
                        }
                        alert("你对" + k + "的印象是：\n\n　　【" + n + "】\n\n明天才能给" + k + "添加新印象，你可以先去评价其他人！")
                    } else {
                        if (i >= 2) {
                            if (m) {
                                this._message_area_el.scrollTop = (c.getY(m) + this._message_area_el.scrollTop) - 135
                            }
                            alert("你对" + k + "的印象是：\n\n　　【" + n + "】\n\n后天才能给" + k + "添加新印象，你可以先去评价其他人！")
                        }
                    }
                }
            }
        },
        mf_handleLoadBwriteImpression: function() {
            if (typeof data8 == "object") {
                if (data8.err == 0) {
                    var R = data8;
                    var g = R.d;
                    var v = "TA";
                    var n = [[109, 72], [195, 60], [252, 75], [87, 107], [161, 90], [259, 97], [144, 128], [215, 118], [263, 131], [119, 165], [190, 149], [215, 173], [256, 188], [138, 188], [88, 226], [178, 210], [262, 226]];
                    var j = [ - 20, -29];
                    var s = [30, 24, 22, 18, 15, 20, 18, 16, 15, 14, 13, 12];
                    var B = function() {
                        this.style.zIndex = 100;
                        this.style.fontSize = "16px";
                        this.style.fontWeight = "bold";
                        this.style.cursor = "pointer";
                        var i = this.className.split("_off ");
                        this.className = i[0] + "_on " + i[1]
                    };
                    var O = function() {
                        this.style.zIndex = 0;
                        this.style.fontSize = "14px";
                        this.style.fontWeight = "normal";
                        var i = this.className.split("_on ");
                        this.className = i[0] + "_off " + i[1]
                    };
                    if (R.g == 1) {
                        v = "她"
                    } else {
                        if (R.g == 0) {
                            v = "他"
                        }
                    }
                    var w = c.get("ImpressionOfBuddyItem_el_" + g);
                    if (w) {
                        try {
                            c.replaceClass(w, "infos3", "infos4")
                        } catch(P) {}
                        var M = c.get("Tab3_bewrite_button_el_" + g)
                    } else {
                        w = document.createElement("div");
                        w.id = "ImpressionOfBuddyItem_el_" + g;
                        c.addClass(w, "infos");
                        c.addClass(w, "infos4");
                        this._impression_of_buddy_el.insertBefore(w, this._impression_of_buddy_el.firstChild);
                        var t = document.createElement("div");
                        c.addClass(t, "rb");
                        var r = document.createElement("div");
                        r.id = "Tab3_bewrite_button_el_" + g;
                        c.addClass(r, "rbnr");
                        t.appendChild(r);
                        w.appendChild(t);
                        var f = document.createElement("div");
                        c.addClass(f, "lb");
                        var H = (this._qqclient.bdylist.allUsers[String(g)] && this._qqclient.bdylist.allUsers[String(g)].remark != "") ? this._qqclient.bdylist.allUsers[String(g)].remark: R.n;
                        var E = '<div class="userinfo userinfo2">									<div class="ltt">										<div class="imnr">											<span class="webico"><img src="' + face_server_domain + "/cgi/svr/face/getface?type=1&fid=0&me=" + this._qqclient.uin + "&uin=" + g + '" alt="" /></span>											<span class="webname">' + H + '</span>										</div>									</div>									<div class="rtt">										<div id="TAB3_impression_of_buddy_el_' + g + '" class="rnr height3">										</div>									 </div>								</div>';
                        f.innerHTML = E;
                        w.appendChild(f)
                    }
                    var C = c.get("TAB3_impression_of_buddy_el_" + g);
                    var y = '	<div class="rnr rnr2 qiangzhi_kuandu">								<div id="bewrite_impression_list_' + g + '" class="yslist">加载中...</div>								<div class="inputlist">									<div>以上都不是我想说的， 让我自己输入吧：</div>									<div class="button">										<input id="Tab3_buddyImpression_input_ew_el_' + g + '" uin="' + g + '" type="text" maxlength="100" />										<a id="Tab3_buddyImpression_ok_button_el_' + g + '" uin="' + g + '" href="#">确定</a>										<a id="Tab3_buddyImpression_cancel_button_el_' + g + '" uin="' + g + '" href="#">取消</a>									</div>								</div>							</div>';
                    C.innerHTML = y;
                    var m = c.get("Tab3_buddyImpression_input_ew_el_" + g);
                    e.on(m, "keyup", this.mf_checkImpressionInput, this);
                    e.on(m, "keydown", this.mf_enterImpressionInput, this);
                    var u = c.get("Tab3_buddyImpression_ok_button_el_" + g);
                    e.on(u, "click", this.mf_addImpressionInput, this);
                    var z = c.get("Tab3_buddyImpression_cancel_button_el_" + g);
                    e.on(z, "click", this.mf_toViewBuddyImpression, this);
                    this._message_area_el.scrollTop = (c.getY(w) + this._message_area_el.scrollTop) - 135;
                    var k = c.get("bewrite_impression_list_" + g);
                    var A = (R.n && R.n.trim() != "") ? R.n: R.d;
                    var H = this._qqclient.bdylist.allUsers[String(g)].remark || A;
                    var y = "请选择你对【" + H + "】的印象:";
                    k.innerHTML = y;
                    var T = document.createElement("div");
                    c.addClass(T, "impressionList");
                    k.appendChild(T);
                    var q = 0;
                    if (R.el != 0) {
                        q = R.el.length
                    }
                    var h = 37;
                    var G = 20;
                    for (var N = 0; N < q; N++) {
                        var F = R.el[N].ew;
                        var L = F.ewToOriginal();
                        var K = L.toTitle();
                        var p = L.getCharLength();
                        var y = "";
                        var o = document.createElement("a");
                        T.appendChild(o);
                        var Q = N % 10 + 1;
                        var l = Math.ceil(Math.random() * 2);
                        c.setStyle(o, "position", "absolute");
                        e.on(o, "mouseover", B);
                        e.on(o, "mouseout", O);
                        o.setAttribute("uin", g);
                        o.setAttribute("href", "#");
                        o.setAttribute("title", "此印象全文：" + L);
                        e.on(o, "click", this.mf_addThis, this);
                        e.on(o, "focus",
                        function() {
                            this.blur()
                        },
                        this);
                        var x = document.createElement("span");
                        x.setAttribute("eid", R.el[N].eid);
                        x.setAttribute("ew", R.el[N].ew);
                        if (p <= 6) {
                            l = 4
                        } else {
                            if (p <= 14) {
                                l = 3
                            } else {
                                if (p <= G) {
                                    l = 2
                                } else {
                                    l = 1
                                }
                            }
                        }
                        c.addClass(o, "size" + l);
                        if (p <= G) {
                            c.addClass(o, "impressionListItemB_" + Q + "_off");
                            y = L.toHtml()
                        } else {
                            if (p <= h) {
                                c.addClass(o, "impressionListItem" + Q + "_off");
                                var D = Math.ceil(p / 2);
                                y = L.subStringByChar(0, D).toHtml() + "<br />" + L.subStringByChar(D).toHtml()
                            } else {
                                c.addClass(o, "impressionListItem" + Q + "_off");
                                var J = L.subStringByChar(0, h) + "...";
                                var I = J.getCharLength();
                                var D = Math.ceil(I / 2);
                                y = J.subStringByChar(0, D).toHtml() + "<br />" + J.subStringByChar(D).toHtml()
                            }
                        }
                        c.addClass(o, "link02");
                        x.innerHTML = y;
                        o.appendChild(x);
                        c.setStyle(o, "left", j[0] + parseInt(n[N][0] * 0.8) - (o.offsetWidth / 2) + "px");
                        c.setStyle(o, "top", j[1] + parseInt(n[N][1] * 1.3) - (o.offsetHeight / 2) + "px")
                    }
                } else {
                    if (data8.err == 1011) {
                        alert("此人已经不在你的好友列表中，无法评价印象！")
                    }
                }
            }
            var U = c.get("Tab3_bewrite_button_el_" + g);
            if (U) {
                U.innerHTML = "";
                var S = document.createElement("a");
                S.href = "#";
                S.setAttribute("uin", g);
                e.on(S, "click", this.mf_toViewBuddyImpression, this);
                S.innerHTML = "取消评价";
                U.appendChild(S)
            }
        },
        mf_addThis: function(h, f) {
            var g = this.firstChild.getAttribute("eid") || 0;
            f.mf_addImpression(this.getAttribute("uin"), this.firstChild.getAttribute("ew").ewToOriginal(), g)
        },
        mf_checkImpressionInput: function(h, f, j) {
            j = j || this;
            var i = j.value;
            var g = i.getCharLength();
            if (g > 100) {
                j.value = i.cutRight(1);
                f.mf_checkImpressionInput(h, f, j)
            }
        },
        mf_enterImpressionInput: function(j, f) {
            j = e.getEvent(j);
            var g = e.getCharCode(j) || 0;
            if (g == 13) {
                var i = this.getAttribute("uin");
                var h = this.value.toString().trim();
                if (h == "") {
                    alert("请填写评价内容！")
                } else {
                    f.mf_addImpression(i, h, 0)
                }
            }
        },
        mf_addImpressionInput: function(j, g) {
            var i = this.getAttribute("uin");
            var f = c.get("Tab3_buddyImpression_input_ew_el_" + i);
            var h = f.value.toString().trim();
            if (h == "") {
                alert("请填写评价内容！")
            } else {
                g.mf_addImpression(i, h, 0)
            }
        },
        mf_addImpression: function(i, h, f) {
            f = f || 0;
            var g = buddy_impression_server_domain + "/app/yx/cgi-bin/add_e?d=" + i + "&eid=" + f + "&ew=" + encodeURIComponent(h) + "&time=" + ((new Date()).getTime());
            this.mf_getRemoteJs(g, this.mf_handleAddImpressionOK, this)
        },
        mf_handleAddImpressionOK: function() {
            if (typeof data6 == "object" && data6.err == 0) {
                var g = data6;
                var f = g.d;
                alert("评价成功！");
                this.mf_loadImpressionOfBuddy(f)
            } else {
                alert("评价未成功，请检查填写内容！")
            }
        },
        mf_toViewBuddyImpression: function(k, f) {
            var h = e.getTarget(k);
            var i = h.getAttribute("uin");
            var j = c.get("ImpressionOfBuddyItem_el_" + i);
            if (j) {
                try {
                    c.replaceClass(j, "infos4", "infos3")
                } catch(l) {}
                var g = c.get("TAB3_impression_of_buddy_el_" + i);
                g.innerHTML = '<div class="loading">载入中...</div>'
            }
            f.mf_loadImpressionOfBuddy(i)
        },
        mf_gotoBewriteBuddy: function(h, f) {
            e.stopEvent(h);
            var g = this.getAttribute("uin");
            f.mainTab.select({
                trigger: f._buddys_impressions_tab_head_el,
                sheet: f._buddys_impressions_el
            });
            f.mf_toBewriteBuddy(h, f)
        },
        mf_updateImpression: function(h) {
            var f = buddy_impression_server_domain + "/app/yx/cgi-bin/show_fel?d=" + h + "&hc=8&lc=4&time=" + ((new Date()).getTime());
            var g = c.get("Main_mainwindow_friend_impression");
            g.setAttribute("uin", h);
            g.innerHTML = "";
            this.mf_getRemoteJs(f, this.mf_handleUpdateImpression, this)
        },
        mf_handleUpdateImpression: function() {
            if (typeof data3 == "object" && data3.err == 0) {
                var l = data3;
                var g = l.d;
                var p = c.get("Main_mainwindow_friend_impression");
                var v = parseInt(p.getAttribute("uin"));
                if (g == v) {
                    if (p) {
                        var h = document.createElement("div");
                        var n = '<div class="userys">';
                        if (l.el == 0) {
                            n += '	<span>暂无印象评价</span>								<span id="buddyTips_bewrite_button_outer"></span>'
                        } else {
                            var k = Math.rand(1, 4);
                            for (var m = 0; m < l.el.length; m++) {
                                var r = l.el[m].ew;
                                var u = r.ewToOriginal();
                                var j = u.toTitle();
                                var o = u.toHtml();
                                var q = o;
                                var t = u.getCharLength();
                                if (t > 14) {
                                    o = (u.subStringByChar(0, 14) + "…").toHtml();
                                    q = o
                                }
                                n += '<span class="as' + ((m + k) % 4 + 1) + '" title="被这样评价 ' + l.el[m].c + " 次：" + j + '">' + q + "</span>"
                            }
                            n += '<span id="buddyTips_bewrite_button_outer"></span>'
                        }
                        n += "	</div>";
                        p.innerHTML = n;
                        var s = c.get("buddyTips_bewrite_button_outer");
                        s.innerHTML = "";
                        var f = document.createElement("a");
                        f.href = "#";
                        c.addClass(f, "otheras");
                        f.setAttribute("uin", g);
                        f.title = g;
                        e.on(f, "click", this.mf_gotoBewriteBuddy, this);
                        f.innerHTML = "我来评价";
                        s.appendChild(f)
                    }
                }
                this.resetUserCardPosition(this._currentUserCardEl)
            }
        },
        mf_ShowFace: function(i) {
            var j = WEBQQ.obj.QQClient.mainPanel;
            var f = j._tabsManage._actTalkWin._talkTabs.mf_getActUinMsg();
            f.input.focus();
            var h = document.selection;
            if (h && h.createRange) {
                j._secret_record_the_selection_postion = h.createRange()
            }
            var g = e.fromEle(i);
            var l = c.getX(g) - 2;
            var k = c.getY(g) - 250;
            this._face_panel_ref.style.left = l + "px";
            this._face_panel_ref.style.top = k + "px";
            this._face_panel_ref.style.display = "block";
            e.stopEvent(i)
        },
        mf_ShowFace_g: function(i) {
            var j = WEBQQ.obj.QQClient.mainPanel;
            var f = j._tabsManage._actTalkWin._talkTabs.mf_getActUinMsg();
            f.input.focus();
            var h = document.selection;
            if (h && h.createRange) {
                j._secret_record_the_selection_postion = h.createRange()
            }
            var g = e.fromEle(i);
            var l = c.getX(g) - 2;
            var k = c.getY(g) - 220;
            this._face_panel_ref_g.style.left = l + "px";
            this._face_panel_ref_g.style.top = k + "px";
            this._face_panel_ref_g.style.display = "block";
            e.stopEvent(i)
        },
        mf_FaceHide: function() {
            clearTimeout(this._face_upload_notice.t);
            this._faceUploadNotice_ref.style.display = "none";
            this._face_panel_ref.style.display = "none";
            this._face_panel_ref_g.style.display = "none";
            e.removeListener(window.document, "mousedown", this.mf_FaceHide)
        },
        mf_OpenFriend: function(h) {
            var f = this._search_target.id || "";
            if (f.indexOf("search_") >= 0) {
                var g = f.substr(f.indexOf("search_") + 7);
                this.mf_act_chat_with(g, false)
            }
        },
        mf_SearchInputMouseOut: function(g) {
            for (var f = 0; f < this._search_panel_ref.childNodes.length; f++) {
                this._search_panel_ref.childNodes[f].className = "search-menus"
            }
        },
        UP: 38,
        DOWN: 40,
        ENTER: 13,
        mf_SearchFriend: function(p) {
            var n = String(this._search_input_el.value).replace(/(^\s|\s$)/gi, "").toUpperCase();
            if (n != "" && n != "搜索我的好友或群" && e.getCharCode(p) != this.ENTER && e.getCharCode(p) != this.DOWN && e.getCharCode(p) != this.UP) {
                if (n.length) {
                    this._search_panel_ref.innerHTML = "";
                    var g = this._qqclient.bdylist.allUsers,
                    k = this._qqclient.bdylist.allClasses;
                    var m = 0;
                    for (var h in g) {
                        var l = g[h];
                        if ((l.group_id > -1) && (String(h).indexOf(n) > -1 || String(l.nick).toUpperCase().indexOf(n) > -1 || String(l.remark).toUpperCase().indexOf(n) > -1)) {
                            var j = document.createElement("A");
                            j.href = "#";
                            j.className = "search-menus";
                            j.innerHTML = "<span>" + String(l.remark ? l.remark + "(" + l.nick + ")": l.nick).forHtml() + "</span><span>(" + h + ")</span>";
                            if (m == 0) {
                                this._search_target = j
                            }
                            j.id = "search_" + h;
                            this._search_panel_ref.appendChild(j);
                            e.on(j, "mousedown",
                            function() {
                                this.mf_OpenFriend();
                                this.mf_SearchHide()
                            },
                            this, true);
                            m++;
                            if (m == 5) {
                                break
                            }
                        }
                    }
                    if (m < 5) {
                        for (var q in k) {
                            var o = k[q],
                            f = o.code;
                            if (String(f).indexOf(n) > -1 || String(o.name).toUpperCase().indexOf(n) > -1) {
                                var j = document.createElement("A");
                                j.href = "#";
                                j.className = "search-menus";
                                j.innerHTML = "<span>" + String(o.name).forHtml() + "</span><span>(" + f + ")</span>";
                                if (m == 0) {
                                    this._search_target = j
                                }
                                j.id = "search_" + q;
                                this._search_panel_ref.appendChild(j);
                                e.on(j, "mousedown",
                                function() {
                                    this.mf_OpenFriend();
                                    this.mf_SearchHide()
                                },
                                this, true);
                                m++;
                                if (m == 5) {
                                    break
                                }
                            }
                        }
                    }
                    if (m == 0) {
                        var j = document.createElement("A");
                        j.innerHTML = "未找到符合好友";
                        this._search_panel_ref.appendChild(j)
                    }
                }
                this.mf_ShowSearch()
            } else {
                switch (e.getCharCode(p)) {
                case this.ENTER:
                    this.mf_OpenFriend();
                    this.mf_SearchHide();
                    break;
                case this.DOWN:
                    if (this._search_target) {
                        this._search_target.className = "search-menus";
                        this._search_target = this._search_target.nextSibling || this._search_panel_ref.firstChild;
                        this._search_target.className = "search-menus target";
                        this.mf_ShowSearch()
                    }
                    break;
                case this.UP:
                    if (this._search_target) {
                        this._search_target.className = "search-menus";
                        this._search_target = this._search_target.previousSibling || this._search_panel_ref.lastChild;
                        this._search_target.className = "search-menus target";
                        this.mf_ShowSearch()
                    }
                    break;
                default:
                    break
                }
            }
        },
        mf_ShowSearch: function() {
            var f = c.getClientHeight();
            var h = "tl",
            g = "bl";
            if (this._search_target) {
                this._search_target.className = "search-menus target"
            }
            this._search_panel_ref.style.display = "block";
            this._search_panel_obj.cfg.applyConfig({
                context: [this._search_input_el, h, g],
                visible: true
            });
            this._search_panel_obj.cfg.fireQueue();
            e.on(window.document, "mousedown", this.mf_SearchHide, this, true)
        },
        mf_SearchHide: function() {
            this._search_panel_obj.hide();
            this._search_panel_ref.style.display = "none";
            e.removeListener(window.document, "mousedown", this.mf_SearchHide)
        },
        _addIEFace: function(f, j) {
            var g = document.selection;
            if (g && g.createRange) {
                var h = g.createRange();
                h.text = j;
                try {
                    h.moveStart("character", -strlen(j))
                } catch(i) {}
            } else {
                f.value += j
            }
        },
        _addNotIEFace: function(f, h) {
            var g = document.selection;
            if (! (typeof f.selectionStart == "undefined")) {
                f.value = f.value.substr(0, f.selectionStart) + h + f.value.substr(f.selectionEnd)
            } else {
                f.value += h
            }
        },
        mf_InsertFace: function(i) {
            e.stopEvent(i);
            var g = e.fromEle(i);
            this.mf_FaceHide();
            var h = parseInt(g.id.substr(g.id.search("qqface_") + String("qqface_").length));
            var f = this._tabsManage._actTalkWin._talkTabs.mf_getActUinMsg();
            f.input.focus();
            if (e.isIE) {
                this._2addIEFace(f.input, g.title)
            } else {
                this._2addNotIEFace(f.input, g.title)
            }
            f.input.focus()
        },
        mf_ReceiveClassMsg: function(g) {
            var f = this._qqclient.bdylist.allClasses(this._qqclient.bdylist.currentClass);
            if (f) {
                f.msg_flag = 0;
                if (this._qqclient.bdylist.allUsers[String(f.uin)].history.get_msg_count() > 0) {
                    this._qqclient.mainPanel._tabsManage.mf_notify_recv(this._qqclient.bdylist.currentClass)
                }
                this.mf_ResetClassMsg(f)
            }
        },
        mf_PreventClassMsg: function(g) {
            var f = this._qqclient.bdylist.allClasses(this._qqclient.bdylist.currentClass);
            if (f) {
                f.msg_flag = 1
            }
        },
        mf_ResetClassMsg: function(g) {
            var f = c.get("qqclass_" + g.uin);
            f.firstChild.innerHTML = String(g.name).forHtml();
            this._qqclient.bdylist.allUsers[String(g.uin)].history.reset_msg_count()
        },
        mf_VisitClassSpace: function() {
            var f = this._qqclient.bdylist.allClasses(this._qqclient.bdylist.currentClass);
            if (f) {
                window.open(group_space_server_domain + "/group_index.shtml?groupid=" + f.code, "class_space")
            }
        },
        mf_onActivate: function() {
            this._hideAllMenus();
            this.bringToTop()
        },
        _hideAllMenus: function() {
            this.mf_FaceHide()
        },
        mf_IsShow: function() {
            return this.cfg.getProperty("visible")
        },
        mf_switch_show: function(f) {
            this.mf_TaskStatMenuShow(f)
        },
        mf_btn_mouse_ev: function(f) {
            var g = e.fromEle(f);
            if (!g) {
                return
            }
            if (f.type == "mouseover") {
                if (g.nodeName.toUpperCase() == "IMG") {
                    g.src = g.src.replace("g.gif", "l.gif")
                }
            } else {
                if (f.type == "mouseout") {
                    if (g.nodeName.toUpperCase() == "IMG") {
                        g.src = g.src.replace("l.gif", "g.gif")
                    }
                }
            }
        },
        mf_FriendExpand: function(f) {
            e.stopEvent(f);
            this._user_friend_el.className = "mshover";
            this._user_class_el.className = "";
            this._user_list_option_el.style.display = "block";
            this._user_list_el.style.display = "block";
            this._qqgroup_list_option_el.style.display = "none";
            this._class_list_el.style.display = "none"
        },
        mf_ClassExpand: function(f) {
            e.stopEvent(f);
            this._user_friend_el.className = "";
            this._user_class_el.className = "mshover";
            this._user_list_option_el.style.display = "none";
            this._user_list_el.style.display = "none";
            this._qqgroup_list_option_el.style.display = "block";
            this._class_list_el.style.display = "block"
        },
        showChatlogMenu: function(f, g) {
            if ( !! f && !!g) {
                c.setStyle(this._chatlogMenuPanelEl, "left", f + "px");
                c.setStyle(this._chatlogMenuPanelEl, "top", g + "px")
            }
            c.setStyle(this._chatlogMenuPanelEl, "display", "block");
            e.on(window.document, "mouseup", this.hideChatlogMenu, this, true)
        },
        hideChatlogMenu: function() {
            c.setStyle(this._chatlogMenuPanelEl, "display", "none");
            e.removeListener(window.document, "mouseup", this.hideChatlogMenu)
        },
        clickChatlogViewButton: function(g) {
            e.preventDefault(g);
            WEBQQ.chatLogOpening = true;
            var h = this._tabsManage._actTalkWin;
            var f;
            if (h) {
                f = h.uin;
                this.viewChatlog(f, 1)
            }
        },
        clickChatlogExportButton: function(g) {
            e.preventDefault(g);
            var h = this._tabsManage._actTalkWin;
            var f;
            if (h) {
                f = h.uin;
                this.exportChatlog(f);
                return false
            }
        },
        compareTimeForChatLog: function(j, h) {
            var g = new Date(j);
            var i = g.getFullYear();
            var k = g.getMonth() + 1;
            var f = g.getDate();
            if (h == 1) {
                return i.toString() + ((k > 9) ? k: ("0" + k)) + ((f > 9) ? f: ("0" + f))
            }
            return i.toString() + "-" + ((k > 9) ? k: ("0" + k)) + "-" + ((f > 9) ? f: ("0" + f))
        },
        chatLogRemoveDuplicates: function(j) {
            var h = null;
            var g = [];
            var f;
            j = this.reSortChatLog(j, "seq");
            for (f = 0; f < j.length; f++) {
                if (j[f].seq != h) {
                    g.push(j[f]);
                    h = j[f].seq
                }
            }
            return g
        },
        reSortChatLog: function(m, n) {
            var l = m;
            var k = 0;
            var h = 0;
            var f = false;
            for (k = 0; k < l.length; k++) {
                if (f) {
                    break
                } else {
                    f = true
                }
                for (h = 0; h < l.length - k - 1; h++) {
                    if (l[h][n] > l[h + 1][n]) {
                        var g = l[h + 1];
                        l[h + 1] = l[h];
                        l[h] = g;
                        f = false
                    }
                }
            }
            return l
        },
        a_unit_for_chat_log: {
            row: 10,
            xhr_url: "http://web.qq.com/cgi-bin/webqq_chat/"
        },
        viewChatlog: function(h, p) {
            var j = c.get("Main_mainwindow_chatlog_loading");
            var u = c.get("Main_mainwindow_chatlog_loadend");
            j.style.display = "block";
            u.style.display = "none";
            this.a_unit_for_chat_log.loading = j;
            this.a_unit_for_chat_log.loadend = u;
            var n = this._qqclient.mainPanel._tabsManage._actTalkWin;
            this.a_unit_for_chat_log.uin = h;
            var k = this._qqclient.bdylist.allUsers[h];
            var q = k.remark || k.nick;
            this.a_unit_for_chat_log.buddy = q;
            var r = n._qqclient.nick;
            this.a_unit_for_chat_log.me = r;
            var f = null;
            var m = '		<div class="chatlogTabTitle">			<div class="chatlog_top_bar">				<div class="web_browser_tips">				提示：WebQQ将为您保留最近一周使用WebQQ产生的消息记录				</div>                <!--<button id="Chatlog_export_button" style="display:none;" class="exportChatlogButtonInTab" uid="' + h + '" >导出消息</button>-->                <h3 style="display:inline;margin-left:20px;font-weight:bold;">与 <span id="Chatlog_buddy_name_intitle">' + String(q).toHtml() + '</span> 的消息记录</h3>				<div id="ChatlogPageOption2" class="chatlogPageOption">					<div page="1" class="firstPage">首页</div>					<div class="pageUp">上页</div>					<div style="display:none;" class="firstPage_f">首页</div>					<div style="display:none;" class="pageUp_f">上页</div>					<div>　第</div>					<div class="currentPage">						<input class="pageInput" type="text" value="" />						<div class="pageGo">Go</div>					</div>					<div>页/共</div>					<div class="pageTotal">0</div>					<div class="ye">页　</div>					<div class="pageDown">下页</div>					<div class="lastPage">尾页</div>					<div style="display:none;" class="pageDown_f">下页</div>					<div style="display:none;" class="lastPage_f">尾页</div>				</div>			</div>        </div>		<div id="ChatlogInTab" class="chatlogInTab">		</div>';
            u.innerHTML = m;
            this.mf_getRemoteJs(this.a_unit_for_chat_log.xhr_url + "?tuin=" + h + "&page=0&row=" + this.a_unit_for_chat_log.row + "&" + (new Date()).getTime());
            this.openChatlogTab();
            var o = c.getViewportWidth();
            var l = c.getViewportHeight();
            var g = this._qqclient.mainPanel._buddyListPanelWidth;
            var i = this._qqclient.mainPanel._webqqTopHeight;
            var t = this._qqclient.mainPanel._taskbarHeight;
            var s = i + t;
            c.setStyle(c.get("ChatlogInTab"), "height", Math.max((l - (s + 75 + 35 + 60)), 0) + "px");
            c.setStyle(c.get("ChatlogInTab"), "width", Math.max((o - g - 55), 510) + "px");
            this.a_unit_for_chat_log.up = c.getElementsByClassName("pageUp");
            this.a_unit_for_chat_log.down = c.getElementsByClassName("pageDown");
            this.a_unit_for_chat_log.first = c.getElementsByClassName("firstPage");
            this.a_unit_for_chat_log.last = c.getElementsByClassName("lastPage");
            this.a_unit_for_chat_log.input = c.getElementsByClassName("pageInput");
            this.a_unit_for_chat_log.go = c.getElementsByClassName("pageGo");
            this.a_unit_for_chat_log.total = c.getElementsByClassName("pageTotal");
            this.a_unit_for_chat_log.u_down_last = c.getElementsByClassName("pageDown_f").concat(c.getElementsByClassName("lastPage_f"));
            this.a_unit_for_chat_log.u_up_first = c.getElementsByClassName("pageUp_f").concat(c.getElementsByClassName("firstPage_f"));
            e.on(this.a_unit_for_chat_log.up, "mousedown", this.viewChatlogXHR, this.a_unit_for_chat_log.up, true);
            e.on(this.a_unit_for_chat_log.down, "mousedown", this.viewChatlogXHR, this.a_unit_for_chat_log.down, true);
            e.on(this.a_unit_for_chat_log.first, "mousedown", this.viewChatlogXHR, this.a_unit_for_chat_log.first, true);
            e.on(this.a_unit_for_chat_log.last, "mousedown", this.viewChatlogXHR, this.a_unit_for_chat_log.last, true);
            e.on(this.a_unit_for_chat_log.go[0], "mousedown",
            function() {
                var y = WEBQQ.cls.MainPanel.getInstance();
                var w = Number(y.a_unit_for_chat_log.total[0].innerHTML);
                var x = y.a_unit_for_chat_log.input[0].value;
                if (x > w || x < 1) {
                    return
                }
                var v = y.a_unit_for_chat_log.uin;
                y.mf_getRemoteJs(y.a_unit_for_chat_log.xhr_url + "?tuin=" + v + "&page=" + y.a_unit_for_chat_log.input[0].value + "&row=" + y.a_unit_for_chat_log.row)
            },
            this.a_unit_for_chat_log.go[0], true);
            e.on(this.a_unit_for_chat_log.input[0], "keypress",
            function(y) {
                y = e.getEvent(y);
                var v = e.getCharCode(y) || 0;
                if (v == 13) {
                    var A = WEBQQ.cls.MainPanel.getInstance();
                    var x = Number(A.a_unit_for_chat_log.total[0].innerHTML);
                    var z = this.value;
                    if (z > x || z < 1) {
                        return
                    }
                    var w = A.a_unit_for_chat_log.uin;
                    A.mf_getRemoteJs(A.a_unit_for_chat_log.xhr_url + "?tuin=" + w + "&page=" + this.value + "&row=" + A.a_unit_for_chat_log.row)
                }
            },
            this.a_unit_for_chat_log.input[0], true)
        },
        viewChatlogXHR: function() {
            var h = WEBQQ.cls.MainPanel.getInstance();
            var g = h.a_unit_for_chat_log.uin;
            var f = "http://web.qq.com/cgi-bin/webqq_chat/?tuin=" + g + "&page=" + this[0].getAttribute("page") + "&row=" + h.a_unit_for_chat_log.row;
            if (this[0].getAttribute("page") == "0") {
                f += "&" + (new Date().getTime())
            }
            h.mf_getRemoteJs(f)
        },
        viewChatlogMiddle: function(r) {
            this.a_unit_for_chat_log.loadend.style.display = "block";
            this.a_unit_for_chat_log.loading.style.display = "none";
            var g = this.a_unit_for_chat_log.uin;
            var o = this.a_unit_for_chat_log.buddy;
            var p = this.a_unit_for_chat_log.me;
            var l = r.chatlogs;
            var f = null;
            var m = "";
            var s = c.get("ChatlogInTab");
            var n = r.page;
            var q = r.total;
            var h;
            var j = this._qqclient;
            if (r.ret != 0) {
                s.innerHTML = '<h3 style="padding-left:50%" >暂无消息记录</h3>';
                c.get("ChatlogPageOption2").innerHTML = "";
                return
            }
            l = this.chatLogRemoveDuplicates(l);
            l = this.reSortChatLog(l, "time");
            for (var k = 0; k < l.length; k++) {
                the_re_sent_flag = l[k].seq;
                if (this.compareTimeForChatLog(l[k].time * 1000, 1) != f) {
                    m += '<div class="dateLine">[ ' + this.compareTimeForChatLog(l[k].time * 1000, 0) + " ]</div>"
                }
                f = this.compareTimeForChatLog(l[k].time * 1000, 1);
                if (l[k].cmd == 16) {
                    h = (decodeURIComponent(l[k].msg));
                    h = String(h).forHtml();
                    h = h.replace(/\t(\d|[a-f]){2}/gi,
                    function(i) {
                        return '<img align="absmiddle" src=' + j.face_domain + "Face2/" + j.t_transfer_table[parseInt("0x" + i.substr(1))] + ".gif>"
                    });
                    h = h.replace(/\x15/gi,
                    function(i) {
                        return '<img align="absmiddle" src="/images/def_face.gif">'
                    });
                    m += '<dl class="me">                            <dt>' + String(p).toHtml() + " " + (new Date(l[k].time * 1000).toLocaleTimeString()) + "</dt>                            <dd>" + h + "</dd>                        </dl>"
                } else {
                    if (l[k].cmd == 17) {
                        h = l[k].msg;
                        h = String(h).forChatlog();
                        h = String(h).forHtml();
                        h = h.replace(/\x14(\d|[a-f]){2}/g,
                        function(i) {
                            return '<img align="absmiddle" src=' + j.face_domain + "Face2/" + parseInt("0x" + i.substr(1)) + ".gif>"
                        });
                        h = h.replace(/\x15/gi,
                        function(i) {
                            return '<img align="absmiddle" src="/images/def_face.gif">'
                        });
                        m += '<dl class="buddy">							<dt>' + String(o).toHtml() + " " + (new Date(l[k].time * 1000).toLocaleTimeString()) + "</dt>							<dd>" + h + "</dd>						</dl>"
                    }
                }
            }
            s.innerHTML = m;
            if (n == q) {
                this.a_unit_for_chat_log.up[0].setAttribute("page", ((n - 1) > 0 ? (n - 1) : 1));
                c.setStyle(this.a_unit_for_chat_log.down, "display", "none");
                c.setStyle(this.a_unit_for_chat_log.last, "display", "none");
                c.setStyle(this.a_unit_for_chat_log.u_down_last, "display", "block");
                c.setStyle(this.a_unit_for_chat_log.u_up_first, "display", "none");
                c.setStyle(this.a_unit_for_chat_log.up, "display", "block");
                c.setStyle(this.a_unit_for_chat_log.first, "display", "block");
                this.a_unit_for_chat_log.up[0].setAttribute("page", ((n - 1) > 0 ? (n - 1) : 1))
            } else {
                if (n == 1) {
                    c.setStyle(this.a_unit_for_chat_log.u_up_first, "display", "block");
                    c.setStyle(this.a_unit_for_chat_log.u_down_last, "display", "none");
                    c.setStyle(this.a_unit_for_chat_log.up, "display", "none");
                    c.setStyle(this.a_unit_for_chat_log.first, "display", "none");
                    c.setStyle(this.a_unit_for_chat_log.down, "display", "block");
                    c.setStyle(this.a_unit_for_chat_log.last, "display", "block");
                    this.a_unit_for_chat_log.down[0].setAttribute("page", ((n + 1) < q ? (n + 1) : q));
                    this.a_unit_for_chat_log.last[0].setAttribute("page", q)
                } else {
                    c.setStyle(this.a_unit_for_chat_log.u_down_last, "display", "none");
                    c.setStyle(this.a_unit_for_chat_log.u_up_first, "display", "none");
                    c.setStyle(this.a_unit_for_chat_log.up, "display", "block");
                    c.setStyle(this.a_unit_for_chat_log.first, "display", "block");
                    c.setStyle(this.a_unit_for_chat_log.down, "display", "block");
                    c.setStyle(this.a_unit_for_chat_log.last, "display", "block");
                    this.a_unit_for_chat_log.up[0].setAttribute("page", ((n - 1) > 0 ? (n - 1) : 1));
                    this.a_unit_for_chat_log.down[0].setAttribute("page", ((n + 1) < q ? (n + 1) : q));
                    this.a_unit_for_chat_log.last[0].setAttribute("page", q)
                }
            }
            this.a_unit_for_chat_log.input[0].value = n;
            this.a_unit_for_chat_log.total[0].innerHTML = q;
            if (WEBQQ.chatLogOpening) {
                WEBQQ.chatLogOpening = false;
                setTimeout(function() {
                    c.get("ChatlogInTab").scrollTop = c.get("ChatlogInTab").scrollHeight
                },
                500)
            } else {
                c.get("ChatlogInTab").scrollTop = 0
            }
        },
        exportChatlog: function(g) {
            this._qqclient.reportStat(59501);
            var f = this._qqclient.mainPanel._tabsManage._uin2container[g];
            if (f) {
                f._ExportChatlogPostContentEl.value = f._history_ref.innerHTML;
                f._ExportChatlogFormEl.submit()
            }
        },
        mf_StatMenuShow: function(f) {
            var g = c.getXY(this._sta_mnu_pos_ref);
            this._sta_menu_obj.cfg.applyConfig({
                x: g[0],
                y: g[1],
                visible: true
            });
            this._sta_menu_obj.cfg.fireQueue();
            e.stopEvent(f);
            this._sta_menu_obj.bringToTop();
            e.on(document.body, "mousedown", this.mf_StatMenuHide, this, true)
        },
        mf_clickStatusMenu: function(f) {
            e.stopEvent(f);
            this.mf_TaskStatMenuShow(f)
        },
        mf_clickSettingMenu: function(f) {
            var h = c.getX(this._setting_menu_el);
            var g = c.getY(this._setting_menu_el) + 20;
            this._setting_menu_panel_node.style.left = h + "px";
            this._setting_menu_panel_node.style.top = g + "px";
            this._setting_menu_panel_node.style.display = "block";
            e.on(document.body, "mousedown", this.mf_SettingMenuHide, this, true)
        },
        mf_TaskStatMenuShow: function(f) {
            var h = c.getX(this._status_menu_button_node);
            var g = c.getY(this._status_menu_button_node) + 18;
            this._status_menu_panel_node.style.left = h + "px";
            this._status_menu_panel_node.style.top = g + "px";
            this._status_menu_panel_node.style.display = "block";
            e.on(document.body, "mousedown", this.mf_StatMenuHide, this, true)
        },
        mf_StatMenuHide: function() {
            e.removeListener(document.body, "mousedown", this.mf_StatMenuHide);
            this._status_menu_panel_node.style.display = "none"
        },
        mf_SettingMenuHide: function(f) {
            e.removeListener(document.body, "mousedown", this.mf_SettingMenuHide);
            this._setting_menu_panel_node.style.display = "none"
        },
        mf_TaskExitMenuShow: function(g) {
            var f = e.getTarget(g);
            var h = c.getXY(f);
            this._ext_menu_obj.cfg.applyConfig({
                x: h[0],
                y: (h[1] - parseInt(c.getStyle(this._ext_menu_ref, "height"))),
                visible: true
            });
            this._ext_menu_obj.cfg.fireQueue();
            e.preventDefault(g);
            this._ext_menu_obj.bringToTop();
            e.on(document.body, "mousedown", this.mf_TaskExitMenuHide, this, true)
        },
        mf_ClassMenuShow: function(i) {
            var g = e.getTarget(i);
            if (g.id.search("qqclass_") < 0) {
                return
            }
            var j = e.getXY(i),
            h = 0;
            this._qqclient.bdylist.currentClass = parseInt(g.id.substring(g.id.search("qqclass_") + String("qqclass_").length));
            var f = this._qqclient.bdylist.allClasses(this._qqclient.bdylist.currentClass);
            if (f) {
                h = f.msg_flag
            }
            c.removeClass(this._cls_menu_ref.childNodes[1].childNodes[2].childNodes[1], "selected");
            c.removeClass(this._cls_menu_ref.childNodes[1].childNodes[2].childNodes[2], "selected");
            switch (h) {
            case 0:
                c.addClass(this._cls_menu_ref.childNodes[1].childNodes[2].childNodes[1], "selected");
                break;
            case 1:
                c.addClass(this._cls_menu_ref.childNodes[1].childNodes[2].childNodes[2], "selected");
                break;
            default:
                break
            }
            this._cls_menu_obj.cfg.applyConfig({
                x:
                j[0],
                y: j[1],
                visible: true
            });
            this._cls_menu_obj.cfg.fireQueue();
            e.preventDefault(i);
            this._cls_menu_obj.bringToTop();
            e.on(document.body, "mousedown", this.mf_ClassMenuHide, this, true)
        },
        mf_TaskExitMenuHide: function() {
            e.removeListener(document.body, "mousedown", this.mf_TaskExitMenuHide);
            this._ext_menu_obj.hide()
        },
        mf_ClassMenuHide: function() {
            e.removeListener(document.body, "mousedown", this.mf_ClassMenuHide);
            this._cls_menu_obj.hide()
        },
        mf_clickMyQQLevelButton: function(f) {
            e.stopEvent(f);
            this.mf_showMyQQLevelPanel(f)
        },
        mf_showMyQQLevelPanel: function(f) {
            var h = c.getX(this._my_qqlevel_button_node);
            var g = c.getY(this._my_qqlevel_button_node) + 18;
            this._my_qqlevel_panel_node.style.left = h + "px";
            this._my_qqlevel_panel_node.style.top = g + "px";
            this._my_qqlevel_panel_node.style.display = "block";
            e.on(document.body, "mouseup", this.mf_hideMyQQLevelPanel, this, true)
        },
        mf_hideMyQQLevelPanel: function(f) {
            e.removeListener(document.body, "mouseup", this.mf_hideQQAppsQuickLinkPanel);
            this._my_qqlevel_panel_node.style.display = "none"
        },
        mf_UpdateWindow: function() {
            this.render();
            var f = Math.max(0, c.getViewportWidth() - parseInt(c.getStyle(this._eleRef, "width")) - (e.isSafari ? 16 : 0));
            this.cfg.setProperty("xy", [f, 0])
        },
        mf_SetHead: function(f, g) {
            this._my_avatar_img_node.src = face_server_domain + "/cgi/svr/face/getface?type=1&uin=" + f + "&cache=1&" + (new Date()).getTime()
        },
        mf_ShortKey: function(h) {
            h = e.getEvent(h);
            var f = e.getCharCode(h);
            if (h.ctrlKey && h.altKey) {
                switch (f) {
                case 67:
                    if (confirm("您确定关闭所有的会话窗口吗？")) {
                        this._tabsManage.closeAllChatbox();
                        e.stopEvent(h)
                    }
                    break;
                case 76:
                    e.stopEvent(h);
                    this.toLockQQ();
                    break;
                default:
                    break
                }
            } else {
                if (h.ctrlKey) {
                    switch (f) {
                    case 37:
                        this._tabsManage.mf_SwcPrevWindow();
                        e.stopEvent(h);
                        break;
                    case 39:
                        this._tabsManage.mf_SwcNextWindow();
                        e.stopEvent(h);
                        break;
                    case 81:
                        this._taskBar.mf_flick_click(null);
                        e.stopEvent(h);
                        break;
                    case 32:
                    case 38:
                    case 40:
                        break;
                    default:
                        break
                    }
                } else {
                    if (h.altKey) {
                        switch (f) {
                        case - 1 : e.stopEvent(h);
                            break;
                        case 76:
                            e.stopEvent(h);
                            this.toLockQQ();
                            break;
                        case 87:
                            e.stopEvent(h);
                            this.switchMainpanelMax();
                            break;
                        case 88:
                            e.stopEvent(h);
                            this.mf_CloseWindow();
                            break;
                        case 67:
                            var j = this._qqclient.mainPanel._tabsManage._actTalkWin;
                            if (j) {
                                j.mf_CloseWindow()
                            }
                        default:
                            break
                        }
                    } else {
                        switch (f) {
                        case 191:
                            var g = e.fromEle(h);
                            var i = g.tagName.toLowerCase();
                            if (i !== "input" && i !== "textarea") {
                                this._search_input_el.focus();
                                e.stopEvent(h)
                            }
                            break;
                        default:
                            break
                        }
                    }
                }
            }
        },
        mf_ShowWindow: function() {
            c.setStyle(this._eleRef, "display", "block")
        },
        mf_HideWindow: function() {
            c.setStyle(this._eleRef, "display", "none")
        },
        handleClickToLockQQ: function(f) {
            this.toLockQQ();
            e.preventDefault(f)
        },
        toLockQQ: function() {
            if (!this._isLocked && !this._isToLocked) {
                this._isToLocked = true;
                this._qqToLockMaskDiv = document.createElement("div");
                c.addClass(this._qqToLockMaskDiv, "qqlock_mask");
                document.body.appendChild(this._qqToLockMaskDiv);
                this._setPasswordDiv = document.createElement("div");
                c.addClass(this._setPasswordDiv, "qqlock_set_password_box");
                document.body.appendChild(this._setPasswordDiv);
                this._setPasswordDiv.innerHTML = '<div id="setPasswordCloseButton" class="alertCloseButton_1">X</div>										<div class="alertTitle_1">设置QQ挂机锁定</div>										<div class="setPasswordMsg">											<div class="qqlock_icon_1">LockIcon</div><p class="setPasswordText">您可以在此设置WebQQ锁定密码，进入锁定状态后QQ将仍然保持在线，在输入正确的[解锁密码]前任何人都无法动您的QQ，可以更安全的保护您的隐私！</p>										</div>										<div class="setPasswordTitle_2">请先设置[解锁密码](请不要与QQ密码相同)</div>										<div class="setPasswordInput">解锁密码：<input id="Set_Password_Input_1" type="password" maxlength="32" value="" /></div>										<div class="setPasswordInput">重　　复：<input id="Set_Password_Input_2" type="password" maxlength="32" value="" /></div>										<div class="buttonGroup_1">											<input id="setPasswordOKButton" class="button_1" type="button" value="确 定" />											<input id="setPasswordCloseButton_2" class="button_1" type="button" value="取 消" />										</div>';
                e.on(c.get("setPasswordOKButton"), "click", this.checkToLockQQ, this, true);
                e.on(c.get("setPasswordCloseButton"), "click", this.cancelLockQQ, this, true);
                e.on(c.get("setPasswordCloseButton_2"), "click", this.cancelLockQQ, this, true);
                e.on(c.get("Set_Password_Input_2"), "keydown", this.keydownSetPasswordInput2, this, true);
                pgvSendClick({
                    hottag: "WEBQQ.clickLockQQ"
                })
            }
        },
        keydownSetPasswordInput2: function(g) {
            var f = e.getCharCode(g);
            if (f == 13) {
                this.checkToLockQQ()
            }
        },
        cancelLockQQ: function() {
            e.removeListener(c.get("setPasswordOKButton"), "click");
            e.removeListener(c.get("setPasswordCloseButton"), "click");
            e.removeListener(c.get("setPasswordCloseButton_2"), "click");
            this._qqToLockMaskDiv.parentNode.removeChild(this._qqToLockMaskDiv);
            this._setPasswordDiv.parentNode.removeChild(this._setPasswordDiv);
            this._isToLocked = false;
            pgvSendClick({
                hottag: "WEBQQ.clickCancelLockQQ"
            })
        },
        checkToLockQQ: function() {
            var g = c.get("Set_Password_Input_1").value,
            f = c.get("Set_Password_Input_2").value;
            if (g == "") {
                alert("密码不能为空！")
            } else {
                if (g === f) {
                    this.cancelLockQQ();
                    this.lockQQ(g.md5(32, 3))
                } else {
                    alert("两次密码输入不一致！")
                }
            }
        },
        lockQQ: function(f) {
            this._isLocked = true;
            this._pw_md5 = f;
            this._qqLockDiv = document.createElement("div");
            c.addClass(this._qqLockDiv, "qqlock");
            document.body.appendChild(this._qqLockDiv);
            this._enterUnlockPasswordDiv = document.createElement("div");
            c.addClass(this._enterUnlockPasswordDiv, "qqlock_unlock_password_box");
            document.body.appendChild(this._enterUnlockPasswordDiv);
            this._enterUnlockPasswordDiv.innerHTML = '<div class="alertTitle_1">已进入QQ挂机锁定状态...</div>										<div class="setPasswordMsg">											<div class="qqlock_icon_1">LockIcon</div><p class="setPasswordText">已进入QQ挂机锁定状态，您的QQ将仍然保持在线，请输入[解锁密码]解锁！</p>										</div>										<div class="setPasswordTitle_2">请输入[解锁密码]：</div>										<div class="enterUnlockPasswordInput"><input id="Unlock_Password_Input" type="password" maxlength="32" value="" /></div>										<div class="buttonGroup_1">											<input id="enterUnlockPasswordOKButton" class="button_1" type="button" value="确 定" />										</div>';
            e.on(this._enterUnlockPasswordDiv, "mousemove", this.stopEvent, this, true);
            e.on(this._qqLockDiv, "mousemove", this.stopEvent, this, true);
            e.on(document.body, "mousemove", this.checkIsBeHacked, this, true);
            e.on(c.get("enterUnlockPasswordOKButton"), "click", this.checkToUnlockQQ, this, true);
            e.on(c.get("Unlock_Password_Input"), "keydown", this.keydownUnlockPasswordInput, this, true);
            pgvSendClick({
                hottag: "WEBQQ.lockedQQ"
            })
        },
        keydownUnlockPasswordInput: function(g) {
            var f = e.getCharCode(g);
            if (f == 13) {
                this.checkToUnlockQQ()
            }
        },
        stopEvent: function(f) {
            e.stopEvent(f)
        },
        checkIsBeHacked: function() {
            this.lockQQ(this._pw_md5);
            pgvSendClick({
                hottag: "WEBQQ.hackLockedQQ"
            });
            alert("请勿非法修改程序！")
        },
        checkToUnlockQQ: function() {
            var f = c.get("Unlock_Password_Input").value;
            if (f.md5(32, 3) === this._pw_md5) {
                this.unlockQQ()
            } else {
                pgvSendClick({
                    hottag: "WEBQQ.inputUnlockPwdError"
                });
                alert("解锁密码错误！");
                c.get("Unlock_Password_Input").value = "";
                c.get("Unlock_Password_Input").focus()
            }
        },
        unlockQQ: function() {
            this._pw_md5 = null;
            delete this._pw_md5;
            e.removeListener(document.body, "mousemove");
            e.removeListener(c.get("enterUnlockPasswordOKButton"), "click");
            this._qqLockDiv.parentNode.removeChild(this._qqLockDiv);
            this._enterUnlockPasswordDiv.parentNode.removeChild(this._enterUnlockPasswordDiv);
            this._isLocked = false;
            pgvSendClick({
                hottag: "WEBQQ.clickUnlockQQ"
            })
        },
        mf_CloseWindow: function() {
            if (!confirm("您确认要退出WebQQ吗？")) {
                return
            }
            this._qqclient.removeCloseHook();
            var f = this,
            g = {
                onSuccess: function() {
                    f._qqclient.closeConn();
                    f._qqclient.showLoginPage()
                },
                onFail: function() {},
                sscope: f,
                fscope: f,
                arguments: {},
                cmd: "01",
                body: f._qqclient.cs.cs0x01()
            };
            this._qqclient.getCmdInfo(g);
            setTimeout(function() {
                f._qqclient.closeConn();
                f._qqclient.showLoginPage()
            },
            500)
        },
        mf_updateUinStat: function() {
            this._taskBar.mf_update_status_icon(true)
        },
        mf_SwcGroupInfo: function(j, f) {
            var i = this._qqclient.bdylist.groups[j];
            if (!i || !this._group_el[j] || !this._group_el[j].group_a_ele) {
                return
            }
            if (this._group_el[j].group_a_ele.className == "sdown") {
                f = true
            }
            if (f) {
                var h = i.online_users.index.length + i.away_users.index.length;
                var g = h + i.offline_users.index.length;
                this._group_el[j].group_a_ele.innerHTML = (String(i.name).forHtml() + "&nbsp;[" + h + (i.id == "_1000" ? "": ("/" + g)) + "]")
            } else {
                this._group_el[j].group_a_ele.innerHTML = "&nbsp;"
            }
        },
        mf_SwcUinStat: function(i, g) {
            var f = this._qqclient.bdylist.allUsers[i] || this._qqclient.bdylist.allClasses[i];
            if (f && f.class_id == -1 && f.group_id == -1) {
                if (!this._group_el[i] || !this._group_el[i].group_a_ele) {
                    return
                }
                if (g) {
                    this._group_el[i].group_a_ele.lastChild.innerHTML = String(this._group_el[i].nick).forHtml()
                } else {
                    this._group_el[i].group_a_ele.lastChild.innerHTML = ""
                }
                return
            }
            if (!f || (!this._group_el[f.group_id])) {
                return
            }
            var h = this._group_el[f.group_id].user_ele[i];
            if (!h) {
                return
            }
            h.firstChild.className = (g) ? "icos": "icos htmenu"
        },
        mf_updateGroupStat: function(h) {
            var g = h.online_users.index.length + h.away_users.index.length;
            var f = g + h.offline_users.index.length;
            if (this._group_el[h.id]) {
                this._group_el[h.id].group_a_ele.innerHTML = (String(h.name).forHtml() + "&nbsp;[" + g + (h.id == "_1000" ? "": ("/" + f)) + "]")
            }
        },
        mf_updateGenderStat: function(g, f) {
            this._man_statistic_el.innerHTML = g.on + "/" + g.total;
            this._girl_statistic_el.innerHTML = f.on + "/" + f.total
        },
        mf_addGroup: function(j) {
            if (j) {
                var i = document.createElement("A");
                i.id = this._id_pre + "group_" + j.id;
                i.className = (j.id == "_1000") ? "sup2": "sup";
                var h = j.online_users.index.length + j.away_users.index.length;
                var g = h + j.offline_users.index.length;
                i.innerHTML = (String(j.name).forHtml() + "&nbsp;[" + h + (j.id == "_1000" ? "": ("/" + g)) + "]");
                this._user_list_el.appendChild(i);
                var f = document.createElement("div");
                f.id = this._id_pre + "group_" + j.id + "_div";
                f.style.display = "none";
                this._user_list_el.appendChild(f);
                this._group_el[j.id] = {
                    group_a_ele: i,
                    group_div_ele: f,
                    split_ele: [],
                    user_ele: []
                };
                e.on(i, "click", this.mf_UserlistExpand, this, true)
            }
        },
        mf_addClass: function(h) {
            var i = h.uin;
            if (!h || c.get("qqclass_" + i)) {
                return
            }
            var l = document.createElement("DIV");
            l.id = "qqclass_" + i;
            l.className = "tmenus";
            c.setStyle(l, "margin-left", "6px");
            var g = h.name || i,
            j = 1,
            k = (h.property == 1) ? 2002 : 2001;
            var f = "webqq_image_" + h.uin;
            l.innerHTML = '<div class="icos"><a href="#"><img id="' + f + '" src="' + face_server_domain + "/cgi/svr/face/getface?type=4&me=" + this._qqclient.uin + "&uin=" + h.code + '" /></a></div><div title="' + String(g).forTitle() + "(" + h.code + ')" class="names">' + String(g).forHtml() + "</div>";
            l.title = String(h.name).forTitle() + "(" + h.code + ")";
            if (this._class_list_el) {
                this._class_list_el.appendChild(l)
            }
            this._group_el[i] = {
                group_a_ele: l,
                nick: h.name,
                split_ele: [],
                user_ele: []
            };
            e.on(l, "dblclick", this.mf_ChatWithClass, this, true);
            e.on(l, "mouseover",
            function() {
                this.style.background = "#e0edfe"
            });
            e.on(l, "mouseout",
            function() {
                this.style.background = "none"
            })
        },
        mf_addClassSplitter: function(f, g) {
            var i = f.uin;
            if (f) {
                var h = document.createElement("DIV");
                this._group_el[String(i)].group_div_ele.appendChild(h);
                this._group_el[String(i)].split_ele[g] = h
            }
        },
        mf_UpdateMember: function(f) {
            if (f.member_nick_got == true) {
                var g = this._qqclient.mainPanel._tabsManage._uin2container[f.uin] || null;
                if (g) {
                    g.mf_UpdateMemberHeader(f);
                    g.mf_UpdateMemberContent(f)
                }
            }
        },
        mf_updateClassUserSta: function(h, g, j) {
            var f = h.uin,
            k = (this._group_el[String(f)]) ? this._group_el[String(f)].user_ele[g] : "";
            if (!k) {
                return false
            }
            e.removeListener(k, "dblclick", this.mf_ChatWithUser);
            this._group_el[f].group_div_ele.removeChild(k);
            this._group_el[f].user_ele[g] = null;
            var n = (h.members[g] == 1) ? "admin": "";
            if (g == h.creator) {
                n = "creator"
            }
            var i = this._qqclient.bdylist.allUsers[g];
            var m = i.remark || i.nick || g;
            var k = document.createElement("DIV");
            k.id = this._id_pre + "user_" + g;
            k.className = "tmenus";
            k.title = String(((n == "creator") ? "创建者:": (n == "admin" ? "管理员:": "")) + String(m).forTitle() + "(" + g + ")").forTitle();
            var l = i.face || 0;
            switch (j) {
            case "online":
                k.innerHTML = '<div class="member ' + n + '"></div><div class="icos"><a href="#"><img src="' + face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this._qqclient.uin + "&uin=" + g + '" /></a></div><div class="names">' + String(m).forHtml() + "</div>";
                break;
            case "offline":
                k.innerHTML = '<div class="member ' + n + '"></div><div class="icos"><a href="#"><img class="offline" src="' + face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this._qqclient.uin + "&uin=" + g + '" /></a></div><div class="names">' + String(m).forHtml() + "</div>";
                break;
            case "away":
                k.innerHTML = '<div class="member ' + n + '"></div><div class="icos"><a href="#"><img src="' + face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this._qqclient.uin + "&uin=" + g + '" /></a></div><div class="names">' + String(m).forHtml() + '</div><div class="away" title="离开"></div>';
                break;
            default:
                break
            }
            if (j == "offline") {
                this._group_el[f].group_div_ele.appendChild(k)
            } else {
                c.insertAfter(k, this._group_el[f].split_ele[j])
            }
            this._group_el[f].user_ele[g] = k;
            e.on(k, "dblclick", this._qqclient.mainPanel.mf_ChatWithUser, this._qqclient.mainPanel, true);
            e.on(k, "mouseover",
            function() {
                this.style.background = "#e0edfe"
            });
            e.on(k, "mouseout",
            function() {
                this.style.background = "none"
            });
            return true
        },
        mf_addGroupSplitter: function(h, f) {
            if (h) {
                var g = document.createElement("DIV");
                this._group_el[h.id].group_div_ele.appendChild(g);
                this._group_el[h.id].split_ele[f] = g
            }
        },
        longnickTimer: null,
        userlevelTimer: null,
        editingRemarkUin: null,
        mf_UpdateUserCard: function(x, j) {
            if (this.editingRemarkUin) {
                var w = this.editingRemarkUin;
                this.editingRemarkUin = null;
                this.mf_onUserTipBlur.call(this, w, this._RemarkInputInTips_node.value)
            }
            this._QQTips_avatar_node.src = face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this._qqclient.uin + "&uin=" + x.uin;
            this._BuddyOnlineStateInTips_node.innerHTML = x.stat == 10 ? "在线": (x.stat == 30 ? "离开": "离线");
            this._BuddySignatureInTips_node.innerHTML = String(x.long_nick.content || "").forHtml();
            this._BuddySignatureInTips_node.title = String(x.long_nick.content || "").forTitle();
            this._BuddyQQLevelInTips_node.innerHTML = "";
            this._QQTips_avatar_node.setAttribute("uin", x.uin);
            var u = x.remark ? (x.remark + "(" + x.nick + ")<" + x.uin + ">") : (x.nick + "<" + x.uin + ">");
            this._QQTips_buddy_name_node.innerHTML = u.forHtml();
            this._QQTips_buddy_name_node.setAttribute("title", u.forTitle() + ", 点击查看详细资料");
            this._QQTips_buddy_name_node.setAttribute("uin", x.uin);
            if (x.level >= 0) {
                var f = parseInt(x.level / 64),
                h = parseInt((x.level % 64) / 16),
                g = parseInt(((x.level % 64) % 16) / 4),
                v = ((x.level % 64) % 16) % 4,
                k = "";
                for (var t = 0; t < f; t++) {
                    k += '<span class="queen"></span>'
                }
                for (var t = 0; t < h; t++) {
                    k += '<span class="sun"></span>'
                }
                for (var t = 0; t < g; t++) {
                    k += '<span class="moon"></span>'
                }
                for (var t = 0; t < v; t++) {
                    k += '<span class="star"></span>'
                }
                this._BuddyQQLevelInTips_node.innerHTML = k;
                this._BuddyQQLevelInTips_node.title = "等级：" + x.level
            } else {
                if (x.level < 0) {
                    var p = this._qqclient;
                    var r = 60,
                    o = Math.max(x.pointer, 0),
                    m = this._qqclient.bdylist.friendList.uins.slice(o, o + r) || [x.id];
                    var q = {
                        onSuccess: function(A) {
                            if (true == this.sc.sc0x5c(A) && x && x.uin == this.mainPanel._private_info_panel_ref.uin && x.level >= 0) {
                                var z = parseInt(x.level / 64),
                                C = parseInt((x.level % 64) / 16),
                                y = parseInt(((x.level % 64) % 16) / 4),
                                E = ((x.level % 64) % 16) % 4,
                                D = "";
                                for (var B = 0; B < z; B++) {
                                    D += '<span class="queen"></span>'
                                }
                                for (var B = 0; B < C; B++) {
                                    D += '<span class="sun"></span>'
                                }
                                for (var B = 0; B < y; B++) {
                                    D += '<span class="moon"></span>'
                                }
                                for (var B = 0; B < E; B++) {
                                    D += '<span class="star"></span>'
                                }
                                this.mainPanel._BuddyQQLevelInTips_node.innerHTML = D;
                                this.mainPanel._BuddyQQLevelInTips_node.title = "等级：" + x.level
                            }
                        },
                        onFail: p.onFailLevelInfo ||
                        function() {},
                        sscope: p,
                        fscope: p,
                        arguments: {},
                        cmd: "5c",
                        body: p.cs.cs0x5c_0x89(m)
                    };
                    p.getCmdInfo(q)
                }
            }
            this.mf_updateImpression(x.id);
            this._BuddyQzoneInTips_node.href = qzone_user_server_domain + "/" + x.id;
            this._ViewBuddyDetailsButtonInTips_node.setAttribute("uin", x.id);
            this._ViewBuddyDetailsButtonInTips2_node.setAttribute("uin", x.id);
            this._AddBuddyButtonInTips_node.setAttribute("uin", x.id);
            this._SendEmailButtonInTips_node.href = qmail_server_domain + "/cgi-bin/login?Fun=clientwrite&vm=pt&email=" + x.id + "@qq.com";
            this._private_info_panel_ref.uin = x.id;
            if (this._qqclient.uin === x.id) {
                c.setStyle(this._BuddyOptionPanel_node, "display", "none");
                c.setStyle(this._StrangerOptionPanel_node, "display", "none")
            } else {
                if (this._qqclient.isFriend(x.id) === -1) {
                    c.setStyle(this._BuddyOptionPanel_node, "display", "none");
                    c.setStyle(this._StrangerOptionPanel_node, "display", "block");
                    this.addBuddy._lastResults[x.id] = this._qqclient.bdylist.allUsers[x.id]
                } else {
                    this.buddyOptionTabInTips.cancelSelected();
                    this._RemarkInputInTips_node.setAttribute("uin", x.id);
                    c.setStyle(this._BuddyOptionPanel_node, "display", "block");
                    c.setStyle(this._StrangerOptionPanel_node, "display", "none");
                    var n = "";
                    for (var t in this._qqclient.bdylist.groups) {
                        if (t != "_1000" && t != "1000") {
                            n += '<a class="buddyClassItemInTips" classId="' + this._qqclient.bdylist.groups[t].id + '" href="###">' + this._qqclient.bdylist.groups[t].name + "</a>"
                        }
                    }
                    this._MyBuddyClassListInTips_node.innerHTML = n
                }
            }
            this._currentUserCardEl = j;
            if (!x.long_nick.got) {
                if (this.longnickTimer) {
                    clearTimeout(this.longnickTimer)
                }
                var p = this;
                var l = 20,
                s = Math.max(x.pointer, 0),
                m = this._qqclient.bdylist.friendList.uins.slice(s, s + l) || [x.id];
                this.longnickTimer = setTimeout(function() {
                    p._qqclient.getLDLongNickInfo(m)
                },
                1000)
            }
        },
        handleClickRemoveBuddy: function(i) {
            var g = this._private_info_panel_ref.uin;
            var f = this,
            h = {
                onSuccess: f.handleRemoveBuddySuccess ||
                function() {},
                onFail: function() {
                    alert("删除好友失败")
                },
                sscope: f,
                fscope: f,
                arguments: {
                    info: {
                        friend_uin: g
                    }
                }
            };
            this._qqclient.sendRemoveBuddy(h, g)
        },
        handleRemoveBuddySuccess: function(h) {
            var k = h.info.friend_uin,
            g = this._qqclient.bdylist.allUsers[k];
            if (!g) {
                return
            }
            var l = g.group_id;
            var j = this._qqclient.bdylist.groups[l];
            var f = this._qqclient.bdylist.allUsers[k].stat;
            var m = this._qqclient.bdylist.groups._1000;
            this.removeBuddyFromListDom(k);
            this.removeBuddyFromOnlineListDom(k);
            this._qqclient.bdylist.allUsers[k].group_id = -1;
            if (f === 10) {
                m.online_users.rmv_user(k);
                m.away_users.rmv_user(k);
                j.online_users.rmv_user(k);
                this.mf_updateGroupStat(this._qqclient.bdylist.groups._1000)
            } else {
                if (f === 20) {
                    j.offline_users.rmv_user(k)
                } else {
                    if (f === 30) {
                        j.away_users.rmv_user(k)
                    }
                }
            }
            this.mf_updateGroupStat(this._qqclient.bdylist.groups[l]);
            var i = this._tabsManage._uin2container[k] || null;
            if (i) {
                i.mf_HideWindow();
                i._tabs_manage.mf_unreg(i)
            }
            this._private_info_panel_ref.style.display = "none";
            this._private_info_panel_obj.hide();
            alert("删除好友成功!")
        },
        removeBuddyFromOnlineListDom: function(g) {
            var f = c.get("online_user_" + g);
            if (f) {
                var h = f.parentNode;
                h.removeChild(f)
            }
        },
        removeBuddyFromListDom: function(f) {
            var h = c.get("user_" + f);
            if (h) {
                var g = h.parentNode;
                g.removeChild(h)
            }
        },
        cancelBuddyOptionSelected: function() {
            this.buddyOptionTabInTips.cancelSelected()
        },
        clickMyBuddyClassListInTips: function(m) {
            var h = e.getTarget(m);
            var j = String(h.getAttribute("classId"));
            var g = this._private_info_panel_ref.uin;
            var l = this;
            h.blur();
            var f = this,
            k = {
                onSuccess: f.handleMoveBuddySuccess ||
                function() {},
                onFail: function() {
                    alert("移动好友分组失败")
                },
                sscope: f,
                fscope: f,
                arguments: {
                    info: {
                        friend_uin: g,
                        group_id: j
                    }
                }
            };
            var i = {
                onSuccess: f.handleMoveBuddySuccess,
                scope: f,
                argument: {
                    friend_uin: g,
                    group_id: j
                }
            };
            if (j == "1001") {
                if (window.confirm("确定将此好友移动到黑名单吗？")) {
                    this._qqclient.sendMoveBuddyToBlacklist(i)
                }
            } else {
                this._qqclient.sendMoveBuddy(k, g, j)
            }
        },
        handleMoveBuddySuccess: function(g) {
            var i = g.info.friend_uin;
            var k = g.info.group_id;
            var j = this._qqclient.bdylist.allUsers[i].group_id;
            this.removeBuddyFromListDom(i);
            this.moveBuddyDomToClass(i, k);
            this.mf_updateGroupStat(this._qqclient.bdylist.groups[j]);
            this.mf_updateGroupStat(this._qqclient.bdylist.groups[k]);
            if (k == "1001") {
                var h = this._tabsManage._uin2container[i] || null;
                if (h) {
                    h.mf_HideWindow();
                    h._tabs_manage.mf_unreg(h)
                }
                var l = this._qqclient.bdylist.groups._1000;
                var f = this._qqclient.bdylist.allUsers[i].stat;
                if (f === 10) {
                    l.online_users.rmv_user(i);
                    l.away_users.rmv_user(i);
                    this.removeBuddyFromOnlineListDom(i);
                    this.mf_updateGroupStat(this._qqclient.bdylist.groups._1000)
                }
            }
            alert("移动成功!")
        },
        moveBuddyDomToClass: function(i, k) {
            var j = this._qqclient.bdylist.allUsers[i].group_id;
            var f = this._qqclient.bdylist.allUsers[i].stat;
            var g = this._qqclient.bdylist.groups[j];
            var h = this._qqclient.bdylist.groups[k];
            if (f === 10) {
                g.online_users.rmv_user(i);
                this._qqclient.bdylist.allUsers[i].group_id = k;
                h.online_users.add_user(i);
                this.mf_addUser(i, "online", 1)
            } else {
                if (f === 20) {
                    g.offline_users.rmv_user(i);
                    this._qqclient.bdylist.allUsers[i].group_id = k;
                    h.offline_users.add_user(i);
                    this.mf_addUser(i, "offline", 1)
                } else {
                    if (f === 30) {
                        g.away_users.rmv_user(i);
                        this._qqclient.bdylist.allUsers[i].group_id = k;
                        h.away_users.add_user(i);
                        this.mf_addUser(i, "away", 1)
                    }
                }
            }
        },
        clickModifyRemarkSendButtonInTips: function() {
            var g = this._RemarkInputInTips_node.getAttribute("uin"),
            f = this._RemarkInputInTips_node.value;
            this.sendSetRealname(g, f);
            this.buddyOptionTabInTips.cancelSelected();
            this._private_info_panel_ref.style.display = "none"
        },
        keydownModifyRemarkSendButtonInTips: function(g) {
            var f = e.getCharCode(g);
            if (f == 13) {
                this.clickModifyRemarkSendButtonInTips()
            }
        },
        loadQQLevelAndSignature: function(f) {},
        mf_addUser: function(g, m, q, j) {
            var k = this._qqclient.bdylist.allUsers[g];
            var f = (q == 1) ? k.group_id: j;
            if (!k || !this._group_el[f]) {
                return false
            }
            var o = c.get("user_" + g);
            if (o) {
                if (String(o.getAttribute("group_id")) == "1000") {
                    var h = this._qqclient.bdylist.groups["1000"];
                    this.removeBuddyFromListDom(g);
                    h.online_users.rmv_user(g);
                    h.offline_users.rmv_user(g);
                    h.away_users.rmv_user(g);
                    this.mf_updateGroupStat(h)
                } else {
                    if (String(o.getAttribute("group_id")) == "1001") {
                        var l = this._qqclient.bdylist.groups["1001"];
                        this.removeBuddyFromListDom(g);
                        l.online_users.rmv_user(g);
                        l.offline_users.rmv_user(g);
                        l.away_users.rmv_user(g);
                        this.mf_updateGroupStat(l)
                    } else {
                        return false
                    }
                }
            }
            var n = document.createElement("DIV");
            n.id = "user_" + g;
            n.className = "tmenus";
            if (k.group_id == "1000") {
                n.setAttribute("group_id", "1000")
            } else {
                if (k.group_id == "1001") {
                    n.setAttribute("group_id", "1001")
                }
            }
            var s = k.remark || k.nick || g;
            var p = k.face || 0;
            var r = "webqq_image_" + g;
            var i = ((k.vip == 1) ? "red;": "");
            switch (m) {
            case "online":
                n.innerHTML = '<div class="icos"><a href="#"><img id="' + r + '" src="' + img_server_domain + '/images/qq_avatar_shadow.gif" /></a></div><div style="color:' + i + '" class="names">' + String(s).forHtml() + "</div>";
                break;
            case "offline":
                n.innerHTML = '<div class="icos"><a href="#"><img id="' + r + '" class="offline" src="' + img_server_domain + '/images/qq_avatar_shadow.gif" /></a></div><div class="names">' + String(s).forHtml() + "</div>";
                break;
            case "away":
                n.innerHTML = '<div class="icos"><a href="#"><img id="' + r + '" src="' + img_server_domain + '/images/qq_avatar_shadow.gif" /></a></div><div class="names">' + String(s).forHtml() + '</div><div class="away" title="离开"></div>';
                break;
            default:
                break
            }
            if (m == "offline") {
                this._group_el[f].group_div_ele.appendChild(n)
            } else {
                c.insertAfter(n, this._group_el[f].split_ele[m])
            }
            this._group_el[f].user_ele[g] = n;
            var t = c.get(r);
            this._qqclient.image_el.push({
                img: t,
                uin: g
            });
            e.on(n, "dblclick", this.mf_ChatWithUser, this, true);
            e.on(n, "mouseover",
            function() {
                this.style.background = "#e0edfe"
            });
            e.on(n, "mouseout",
            function() {
                this.style.background = "none"
            });
            e.on(n.firstChild, "mouseover",
            function(v, u) {
                u.mf_UpdateUserCard(k, this);
                u._private_info_panel_ref.style.display = "block";
                u.resetUserCardPosition(this)
            },
            this);
            return true
        },
        mf_addOnlineUser: function(g, j, p) {
            var i = this._qqclient.bdylist.allUsers[g];
            var f = p;
            if (!i || !this._group_el[f]) {
                return false
            }
            if (c.get("online_user_" + g)) {
                return false
            }
            var k = document.createElement("DIV");
            k.id = "online_user_" + g;
            k.className = "tmenus";
            var n = i.remark || i.nick || g;
            var l = i.face || 0;
            var m = "webqq_online_image_" + g;
            var h = ((i.vip == 1) ? "red;": "");
            switch (j) {
            case "online":
                k.innerHTML = '<div class="icos"><a href="#"><img id="' + m + '" src="' + img_server_domain + '/images/qq_avatar_shadow.gif" /></a></div><div style="color:' + h + '" class="names">' + String(n).forHtml() + "</div>";
                break;
            case "offline":
                k.innerHTML = '<div class="icos"><a href="#"><img id="' + m + '" class="offline" src="' + img_server_domain + '/images/qq_avatar_shadow.gif" /></a></div><div class="names">' + String(n).forHtml() + "</div>";
                break;
            case "away":
                k.innerHTML = '<div class="icos"><a href="#"><img id="' + m + '" src="' + img_server_domain + '/images/qq_avatar_shadow.gif" /></a></div><div class="names">' + String(n).forHtml() + '</div><div class="away" title="离开"></div>';
                break;
            default:
                break
            }
            if (j == "offline") {
                this._group_el[f].group_div_ele.appendChild(k)
            } else {
                c.insertAfter(k, this._group_el[f].split_ele[j])
            }
            this._group_el[f].user_ele[g] = k;
            var o = c.get(m);
            this._qqclient.image_el.push({
                img: o,
                uin: g
            });
            e.on(k, "dblclick", this.mf_ChatWithUser, this, true);
            e.on(k, "mouseover",
            function() {
                this.style.background = "#e0edfe"
            });
            e.on(k, "mouseout",
            function() {
                this.style.background = "none"
            });
            e.on(k.firstChild, "mouseover",
            function(r, q) {
                q.mf_UpdateUserCard(i, this);
                q._private_info_panel_ref.style.display = "block";
                q.resetUserCardPosition(this)
            },
            this);
            return true
        },
        resetUserCardPosition: function(f) {
            this._private_info_panel_obj.cfg.applyConfig({
                iframe: false,
                context: [f, "tr", "tl"],
                visible: true,
                constraintoviewport: true
            });
            this._private_info_panel_obj.cfg.fireQueue()
        },
        mf_updateUserSta: function(l, k) {
            var h = this._qqclient.bdylist.allUsers[l];
            if (!h || (!this._group_el[h.group_id])) {
                return false
            }
            var j = this._group_el[h.group_id].user_ele[l];
            if (!j) {
                return false
            }
            e.removeListener(j, "dblclick", this.mf_ChatWithUser);
            this._group_el[h.group_id].group_div_ele.removeChild(j);
            this._group_el[h.group_id].user_ele[l] = null;
            j = document.createElement("DIV");
            j.id = "user_" + l;
            j.className = "tmenus";
            var f = h.remark || h.nick || l;
            var m = h.face || 0;
            var g = ((h.vip == 1) ? "red;": "");
            switch (k) {
            case "online":
                j.innerHTML = '<div class="icos"><a href="#"><img src="' + face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this._qqclient.uin + "&uin=" + l + '" /></a></div><div title="' + (h.remark ? String(h.remark).forTitle() + "(" + String(h.nick).forTitle() + ")": String(h.nick).forTitle() + "<" + l + ">") + '" class="names">' + String(f).forHtml() + "</div>";
                if (h.vip == 1) {
                    j.childNodes[1].style.color = "red"
                }
                break;
            case "offline":
                j.innerHTML = '<div class="icos"><a href="#"><img class="offline" src="' + face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this._qqclient.uin + "&uin=" + l + '" /></a></div><div title="' + (h.remark ? String(h.remark).forTitle() + "(" + String(h.nick).forTitle() + ")": String(h.nick).forTitle() + "(" + l + ")") + '" class="names">' + String(f).forHtml() + "</div>";
                break;
            case "away":
                j.innerHTML = '<div class="icos"><a href="#"><img src="' + face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this._qqclient.uin + "&uin=" + l + '" /></a></div><div title="' + (h.remark ? String(h.remark).forTitle() + "(" + String(h.nick).forTitle() + ")": String(h.nick).forTitle() + "(" + l + ")") + '" class="names">' + String(f).forHtml() + '</div><div class="away" title="离开"></div>';
                if (h.vip == 1) {
                    j.childNodes[1].style.color = "red"
                }
                break;
            default:
                break
            }
            var i = this._tabsManage._uin2container[l];
            if (i) {
                i.mf_setTitle(l, h.nick)
            }
            if (k == "offline") {
                this._group_el[h.group_id].group_div_ele.appendChild(j)
            } else {
                c.insertAfter(j, this._group_el[h.group_id].split_ele[k])
            }
            this._group_el[h.group_id].user_ele[l] = j;
            e.on(j, "dblclick", this.mf_ChatWithUser, this, true);
            e.on(j, "mouseover",
            function() {
                this.style.background = "#e0edfe"
            });
            e.on(j, "mouseout",
            function() {
                this.style.background = "none"
            });
            e.on(j.firstChild, "mouseover",
            function(o, n) {
                n.mf_UpdateUserCard(h, this);
                n._private_info_panel_ref.style.display = "block";
                n.resetUserCardPosition(this)
            },
            this);
            return true
        },
        mf_updateOnlineUserSta: function(k, j, l) {
            var h = this._qqclient.bdylist.allUsers[k];
            if (!h || (!this._group_el[l])) {
                return false
            }
            var i = this._group_el[l].user_ele[k];
            if (i) {
                e.removeListener(i, "dblclick", this.mf_ChatWithUser);
                this._group_el[l].group_div_ele.removeChild(i)
            }
            this._group_el[l].user_ele[k] = null;
            i = document.createElement("DIV");
            i.id = "online_user_" + k;
            i.className = "tmenus";
            i.title = h.remark ? String(h.remark).forTitle() + "(" + String(h.nick).forTitle() + ")": String(h.nick).forTitle() + "(" + k + ")";
            var f = h.remark || h.nick || k;
            var m = h.face || 0;
            var g = ((h.vip == 1) ? "red;": "");
            switch (j) {
            case "online":
                i.innerHTML = '<div class="icos"><a href="#"><img src="' + face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this._qqclient.uin + "&uin=" + k + '" /></a></div><div title="' + (h.remark ? String(h.remark).forTitle() + "(" + String(h.nick).forTitle() + ")": String(h.nick).forTitle() + "<" + k + ">") + '" class="names">' + String(f).forHtml() + "</div>";
                if (h.vip == 1) {
                    i.childNodes[1].style.color = "red"
                }
                break;
            case "offline":
                i.innerHTML = '<div class="icos"><a href="#"><img class="offline" src="' + face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this._qqclient.uin + "&uin=" + k + '" /></a></div><div class="names">' + String(f).forHtml() + "</div>";
                break;
            case "away":
                i.innerHTML = '<div class="icos"><a href="#"><img src="' + face_server_domain + "/cgi/svr/face/getface?type=1=&me=" + this._qqclient.uin + "&uin=" + k + '" /></a></div><div class="names">' + String(f).forHtml() + '</div><div class="away" title="离开"></div>';
                if (h.vip == 1) {
                    i.childNodes[1].style.color = "red"
                }
                break;
            default:
                break
            }
            if (j == "offline") {} else {
                c.insertAfter(i, this._group_el[l].split_ele[j]);
                this._group_el[l].user_ele[k] = i
            }
            e.on(i, "dblclick", this.mf_ChatWithUser, this, true);
            e.on(i, "mouseover",
            function() {
                this.style.background = "#e0edfe"
            });
            e.on(i, "mouseout",
            function() {
                this.style.background = "none"
            });
            e.on(i.firstChild, "mouseover",
            function(o, n) {
                n.mf_UpdateUserCard(h, this);
                n._private_info_panel_ref.style.display = "block";
                n.resetUserCardPosition(this)
            },
            this);
            return true
        },
        mf_updateUserVip: function(h) {
            var f = this._qqclient.bdylist.allUsers[h];
            if (!f || (!this._group_el[f.group_id])) {
                return false
            }
            var g = this._group_el[f.group_id].user_ele[h];
            if (!g) {
                return false
            }
            g.childNodes[1].style.color = "red";
            if (!this._group_el._1000) {
                return false
            }
            var g = this._group_el._1000.user_ele[h];
            if (!g) {
                return false
            }
            g.childNodes[1].style.color = "red"
        },
        mf_updateUserRealName: function(i, k) {
            var f = this._qqclient.bdylist.allUsers[i];
            if (!f || (!this._group_el[f.group_id])) {
                return false
            }
            var h = this._group_el[f.group_id].user_ele[i];
            if (!h) {
                return false
            }
            k = k || f.nick || String(f.uin);
            h.title = String(k).forTitle() + "<" + i + ">";
            h.childNodes[1].innerHTML = String(k).forHtml();
            var j = this._group_el._1000;
            if (j && j.user_ele[i]) {
                j.user_ele[i].title = String(k).forTitle() + "<" + i + ">";
                j.user_ele[i].childNodes[1].innerHTML = String(k).forHtml()
            }
            var g = this._tabsManage._uin2container[i];
            if (g) {
                g.mf_setTitle(i, f.nick)
            }
            return true
        },
        mf_getMarqueeMsgType: function(h) {
            var i = e.fromEle(h);
            var g;
            g = c.getAncestorByClassName(i, "tmenus") || c.getAncestorByClassName(i, "group") || c.getAncestorByClassName(i, "search-menus") || c.getAncestorByClassName(i, "middle-menus") || i;
            if (i.tagName.toLowerCase() == "img" && i.parentNode.getAttribute("isOpenChat") == "true") {
                g = i.parentNode
            }
            if (!g) {
                return null
            }
            var f = g.getAttribute("msgType") || "";
            return f
        },
        mf_getMarqueeSysMsgId: function(h) {
            var i = e.fromEle(h);
            var g;
            g = c.getAncestorByClassName(i, "tmenus") || c.getAncestorByClassName(i, "group") || c.getAncestorByClassName(i, "search-menus") || c.getAncestorByClassName(i, "middle-menus") || i;
            if (i.tagName.toLowerCase() == "img" && i.parentNode.getAttribute("isOpenChat") == "true") {
                g = i.parentNode
            }
            if (!g) {
                return null
            }
            var f = g.getAttribute("sysMsgId");
            return f
        },
        mf_getNodeOfEvent: function(g) {
            var h = e.fromEle(g);
            var f;
            f = c.getAncestorByClassName(h, "tmenus") || c.getAncestorByClassName(h, "group") || c.getAncestorByClassName(h, "search-menus") || c.getAncestorByClassName(h, "middle-menus") || h;
            if (h.tagName.toLowerCase() == "img" && h.parentNode.getAttribute("isOpenChat") == "true") {
                f = h.parentNode
            }
            if (!f) {
                return null
            }
            return f
        },
        mf_getChatUser: function(i) {
            var j = e.fromEle(i);
            var g;
            g = c.getAncestorByClassName(j, "tmenus") || c.getAncestorByClassName(j, "tboxmenus") || c.getAncestorByClassName(j, "group") || c.getAncestorByClassName(j, "search-menus") || c.getAncestorByClassName(j, "middle-menus") || j;
            if (j.tagName.toLowerCase() == "img" && j.parentNode.getAttribute("isOpenChat") == "true") {
                g = j.parentNode
            }
            if (!g) {
                return null
            }
            var f = g.id || "";
            if (f.indexOf("user_") >= 0) {
                return f.substr(f.indexOf("user_") + 5)
            } else {
                if (f.indexOf("qqclass_") >= 0) {
                    return f.substr(f.indexOf("qqclass_") + 8)
                } else {
                    if (f.indexOf("search_") >= 0) {
                        return f.substr(f.indexOf("search_") + 7)
                    } else {
                        if (f.indexOf("marqueeMsg_") >= 0) {
                            return f.substr(f.indexOf("marqueeMsg_") + 11)
                        } else {
                            if (f.indexOf("middle_") >= 0) {
                                return f.substr(f.indexOf("middle_") + 7)
                            } else {
                                if (f.indexOf("online_user_") >= 0) {
                                    return f.substr(f.indexOf("online_user_") + 12)
                                }
                            }
                        }
                    }
                }
            }
            var h = g.getAttribute("uin");
            if (h) {
                return h
            }
            return null
        },
        mf_removeFromMidArea: function(g) {
            var k = this._qqclient.bdylist.allUsers[g] || this._qqclient.bdylist.allClasses[g],
            m = this._friend_offmsg_area_c_el,
            h = this._friend_offmsg_area_h_el,
            n = this._friend_msg_count_ref,
            o = this._friend_msg_count2_ref;
            if (k && k.group_id == -1 && k.class_id == -1) {
                m = this._class_offmsg_area_c_el;
                h = this._class_offmsg_area_h_el;
                n = this._class_msg_count_ref,
                o = this._class_msg_count2_ref
            }
            var p = c.get("marqueeMsg_" + g);
            var j = c.get("middle_" + g);
            if (j) {
                n.innerHTML = Math.max(parseInt(n.innerHTML) - 1, 0);
                o.innerHTML = Math.max(parseInt(o.innerHTML) - 1, 0);
                this._all_msg_count_el.innerHTML = parseInt(this._friend_msg_count_ref.innerHTML) + parseInt(this._class_msg_count_ref.innerHTML) + parseInt(this._mail_count_ref.innerHTML.split("+")[0]) + parseInt(this._sysmsg_count_ref.innerHTML);
                if (this._mail_count_ref.innerHTML.indexOf("+") > 0) {
                    this._all_msg_count_el.innerHTML = this._all_msg_count_el.innerHTML + "+"
                }
                var f = this._qqclient.offline_msg;
                for (var l = 0; l < f.length; l++) {
                    if (f[l] == g) {
                        f.splice(l, 1);
                        break
                    }
                }
                m.removeChild(j);
                this._message_marquee_inner_el.removeChild(p);
                this.mf_updateMarqueeMsg();
                if (this._message_marquee_inner_el.childNodes.length == 0) {
                    c.setStyle(this._no_message_marquee_el, "display", "block")
                }
                if (m.childNodes.length == 0) {
                    c.setStyle(h, "display", "block")
                }
            }
        },
        mf_ChatWithUser: function(i) {
            var f = new Date().getTime();
            var g = Math.abs(f - this._qqclient.last_oper_time);
            if (g >= 0 && g < 1000) {
                return
            }
            this._qqclient.last_oper_time = f;
            var h = this.mf_getChatUser(i);
            e.stopEvent(i);
            this.mf_act_chat_with(h, false);
            return h
        },
        mf_ChatWithClass: function(i) {
            var f = new Date().getTime();
            if (f - this._qqclient.last_oper_time < 1000) {
                return
            }
            this._qqclient.last_oper_time = f;
            var h = this.mf_getChatUser(i) || this._qqclient.bdylist.currentClass;
            var g = this._qqclient.bdylist.allClasses[h];
            if (g) {
                this.mf_act_chat_with_class(g, false)
            }
        },
        mf_act_chat_with: function(h, i) {
            var g = this._qqclient.bdylist.allUsers[String(h)] || {};
            if (h == this._qqclient.uin) {
                alert("对不起，您不能和自己交谈！");
                return
            }
            if (g && g.group_id == "1001") {
                return
            }
            var f = this._qqclient.bdylist.allClasses[h] || null;
            if (f) {
                this.mf_act_chat_with_class(f, i);
                return
            }
            var g = this._qqclient.bdylist.allUsers[h] || {};
            this._tabsManage.mf_act_create(h, g.nick || h, i)
        },
        mf_GetMemberRemarkInfo: function(g) {
            if (g && g.member_nick_got == false) {
                var f = this,
                h = {
                    onSuccess: function(j) {
                        var i = this._qqclient.sc.sc0x30(j);
                        if (0 == i) {
                            this.mf_GetMemberNickInfo(g)
                        } else {
                            if (1 == i) {
                                this.mf_GetMemberRemarkInfo(g)
                            }
                        }
                    },
                    onFail: function(j) {
                        YAHOO.log("拉取群名片失败");
                        var i = j.info.acs;
                        this.mf_GetMemberNickInfo(i)
                    },
                    sscope: f,
                    fscope: f,
                    arguments: {
                        info: {
                            acs: g
                        }
                    },
                    cmd: "30",
                    body: f._qqclient.cs.cs0x30_0x0f(g.uin, 0, g.cs_0x30_0x0f_next_pos)
                };
                this._qqclient.getCmdInfo(h);
                YAHOO.log("mf_GetMemberRemarkInfo")
            }
        },
        mf_GetMemberNickInfo: function(g) {
            if (g && g.member_nick_got == false) {
                var f = this,
                h = {
                    onSuccess: function(j) {
                        var i = this._qqclient.sc.sc0x0126(j);
                        if (0 == i) {
                            this.mf_UpdateMember(g)
                        } else {
                            if (1 == i) {
                                this.mf_GetMemberNickInfo(g)
                            }
                        }
                    },
                    onFail: function() {},
                    sscope: f,
                    fscope: f,
                    arguments: {
                        info: {
                            acs: g
                        }
                    },
                    cmd: "0126",
                    body: f._qqclient.cs.cs0x0126(g)
                };
                this._qqclient.getCmdInfo(h);
                YAHOO.log("mf_GetMemberNickInfo")
            }
        },
        mf_act_chat_with_class: function(g, i) {
            var h = g.uin,
            f = this._qqclient.bdylist.allClasses[h];
            if (f) {
                this._tabsManage.mf_act_create_class(h, f.nick, i)
            }
            if (this._qqclient.uin_online_stat == this._qqclient.ONLINE_STAT_ENUM.offline) {
                return
            }
            this.mf_GetMemberRemarkInfo(g)
        },
        mf_UserlistExpand: function(g) {
            var h = e.fromEle(g);
            e.preventDefault(g);
            if (!h) {
                return
            }
            if (h.className.indexOf("s") > -1) {
                var f = c.hasClass(h, "sup2") || c.hasClass(h, "sup");
                var i = c.getNextSibling(h);
                if (!i) {
                    return
                }
                c.setStyle(i, "display", (f ? "block": "none"));
                if (f) {
                    c.replaceClass(h, c.hasClass(h, "sup2") ? "sup2": "sup", c.hasClass(h, "sup2") ? "sdown2": "sdown")
                } else {
                    c.replaceClass(h, c.hasClass(h, "sdown2") ? "sdown2": "sdown", c.hasClass(h, "sdown2") ? "sup2": "sup")
                }
            }
        },
        mf_ClasslistExpand: function(m) {
            var j = e.fromEle(m);
            j = c.getAncestorByClassName(j, "group") || j;
            e.preventDefault(m);
            if (!j) {
                return
            }
            var k = j.id.substr(String("qqclass_").length);
            var f = this._qqclient.bdylist.allClasses[k];
            if (f.member_got == false) {
                return
            }
            var o = this.mf_getChatUser(m) || this._qqclient.bdylist.currentClass;
            for (var h = 0,
            l = this._qqclient.notify_uin_list.length; h < l; h++) {
                if (this._qqclient.notify_uin_list[h].uin == o) {
                    return
                }
            }
            var n = c.getNextSibling(j);
            if (!n) {
                return
            }
            c.setStyle(n, "display", ((c.getStyle(n, "display") == "none") ? "block": "none"));
            if (this._qqclient.uin_online_stat == this._qqclient.ONLINE_STAT_ENUM.offline) {
                return
            }
            if (f.member_nick_got == false) {
                var g = this._qqclient.cs.cs0x30_0x0f(this._qqclient.uin, this._qqclient.uin_session, o, 0, 0);
                if (g) {
                    this._qqclient._tmp_callback.success = this._qqclient.send_msg_callback;
                    this._qqclient._tmp_callback.failure = this._qqclient.send_msg_callback;
                    this._qqclient._tmp_callback.argument.info = {
                        uin: this._qqclient.uin,
                        cs_cmd: 48,
                        sub_cmd: 15,
                        cmd_str: g
                    };
                    this._qqclient._tmp_callback.scope = this._qqclient;
                    this._qqclient._tmp_callback.timeout = 22000;
                    this._qqclient._act_conn.asyncSend("POST", this._qqclient.webqq_proxy_uri, this._qqclient._tmp_callback, g)
                }
            }
        },
        destroy: function() {
            this.mf_HideWindow();
            if (this._tabsManage) {
                this._tabsManage.destroy();
                this._tabsManage = null
            }
            if (this._sta_menu_obj) {
                this._sta_menu_obj.destroy();
                this._sta_menu_obj = null
            }
            if (this._resizeHandle) {
                this._resizeHandle.destroy();
                this._resizeHandle = null
            }
            if (this._face_panel_obj) {
                this._face_panel_obj.destroy();
                this._face_panel_obj = null
            }
            WEBQQ.cls.MainPanel.superclass.destroy.call(this)
        },
        toString: function() {
            return "WEBQQ.cls.MainPanel " + this.id
        }
    }
})();