(function() {
    var a = YAHOO.util.Dom,
    b = YAHOO.util.Event;
    WEBQQ.namespace("WEBQQ.cls");
    WEBQQ.cls.Taskbar = function(d) {
        if (typeof(d) !== "string") {
            throw new Error("WEBQQ.cls.Taskbar call failed, the parameter(" + d + ")'s type is not string!")
        }
        this._id = "Taskbar_" + d;
        this._id_pre = this._id + "_";
        var h = this._id_pre + "left_prev";
        var g = this._id_pre + "right_next";
        var f = this._id_pre + "right_profile";
        var c = this._id_pre + "short_key";
        var e = document.getElementById(this._id);
        this._eleRef = e;
        this._chat_area_ref = a.get(this._id + "_chat_session");
        this._magnet_button_node = a.get("Taskbar_magnet_button");
        this._left_prev_ref = a.get(h);
        this._right_next_ref = a.get(g);
        this._right_profile_ref = a.get(f);
        this._short_key_ref = a.get(c);
        this._ie6 = (YAHOO.env.ua.ie == 6);
        this._chat_tasks = {};
        this._active_task_bar = null;
        this._qqclient = WEBQQ.obj.QQClient;
        this._notify_icon_hide = false;
        this.md_flick_timer = null;
        this.init(this._id, {})
    };
    WEBQQ.cls.Taskbar.getInstance = function() {
        if (!WEBQQ.cls.Taskbar.prototype.instance) {
            WEBQQ.cls.Taskbar.prototype.instance = new WEBQQ.cls.Taskbar("taskbar")
        }
        return WEBQQ.cls.Taskbar.prototype.instance
    };
    WEBQQ.cls.Taskbar.prototype = {
        _id_pre: "",
        _id: "",
        _eleRef: null,
        _chat_area_ref: null,
        _nav_area_ref: null,
        _checkbox_ref: null,
        _usr_stat_icon_ref: null,
        _isResizing: false,
        _ie6: false,
        _chat_tasks: {},
        _active_task_bar: null,
        _qqclient: null,
        instance: null,
        init: function(d, c) {
            if (YAHOO.env.ua.opera) {
                a.setStyle(this._eleRef, "zIndex", 1)
            }
            b.on(window, "resize", this.mf_handleOnResize, this, true);
            b.on(this._magnet_button_node, "click", this.switchMagnetState, this, true);
            b.on(this._left_prev_ref, "click", this.mf_page_prev, this, true);
            b.on(this._right_next_ref, "click", this.mf_page_next, this, true)
        },
        switchMagnetState: function(c) {
            b.stopEvent(c);
            if (this._qqclient.mainPanel._tabsManage._magnetState === 0) {
                this.setMagnetOn();
                pgvSendClick({
                    hottag: "WEBQQ.setToMagnetOn"
                })
            } else {
                this.setMagnetOff();
                pgvSendClick({
                    hottag: "WEBQQ.setToMagnetOff"
                })
            }
        },
        setMagnetOn: function() {
            var e = this._qqclient.mainPanel._tabsManage._actTalkWin;
            this._qqclient.mainPanel._tabsManage._magnetState = 1;
            a.replaceClass(this._magnet_button_node, "magnet_button_off", "magnet_button_on");
            this._magnet_button_node.title = "吸附模式(当前)";
            var c = this._qqclient.mainPanel._tabsManage._uin2container;
            for (var d in c) {
                c[d].mf_HideWindow()
            }
            if (e) {
                e.mf_ShowWindow()
            }
            this._qqclient.setBitValue(19, 1, 1)
        },
        setMagnetOff: function() {
            var c = this._qqclient.mainPanel._tabsManage._actTalkWin;
            this._qqclient.mainPanel._tabsManage._magnetState = 0;
            a.replaceClass(this._magnet_button_node, "magnet_button_on", "magnet_button_off");
            this._magnet_button_node.title = "自由模式(当前)";
            if (c) {
                c.mf_ShowWindow()
            }
            this._qqclient.setBitValue(19, 1, 0)
        },
        mf_update_scrollbar: function() {
            this.mf_update_arrow()
        },
        TASKBAR_HEIGHT: 55,
        mf_page_next: function(c) {
            b.stopEvent(c);
            var d = Math.ceil((parseInt(a.getStyle(this._chat_area_ref, "top")) || 0) / this.TASKBAR_HEIGHT) * this.TASKBAR_HEIGHT - this.TASKBAR_HEIGHT;
            if (Math.abs(d) + this.TASKBAR_HEIGHT > this._chat_area_ref.offsetHeight) {
                return
            }
            if (this._qqclient.mainPanel._tabsManage._actTalkWin) {
                this._qqclient.mainPanel._tabsManage._actTalkWin.mf_HideWindow()
            }
            a.setStyle(this._chat_area_ref, "top", d + "px");
            if (Math.abs(d) + 2 * this.TASKBAR_HEIGHT >= this._chat_area_ref.offsetHeight) {
                this._right_next_ref.className = "nrarrow"
            }
            this._left_prev_ref.className = "larrow";
            this.mf_update_arrow()
        },
        mf_page_prev: function(c) {
            b.stopEvent(c);
            var d = Math.ceil((parseInt(a.getStyle(this._chat_area_ref, "top")) || 0) / this.TASKBAR_HEIGHT) * this.TASKBAR_HEIGHT;
            if (d + this.TASKBAR_HEIGHT > 0) {
                return
            }
            if (this._qqclient.mainPanel._tabsManage._actTalkWin) {
                this._qqclient.mainPanel._tabsManage._actTalkWin.mf_HideWindow()
            }
            a.setStyle(this._chat_area_ref, "top", (d + this.TASKBAR_HEIGHT) + "px");
            if (d + 2 * this.TASKBAR_HEIGHT > 0) {
                this._left_prev_ref.className = "nlarrow"
            }
            this._right_next_ref.className = "rarrow";
            this.mf_update_arrow()
        },
        mf_update_arrow: function() {
            var c = Math.ceil((parseInt(a.getStyle(this._chat_area_ref, "top")) || 0) / this.TASKBAR_HEIGHT) * this.TASKBAR_HEIGHT;
            if (c + this.TASKBAR_HEIGHT > 0) {
                this._left_prev_ref.className = "nlarrow"
            } else {
                this._left_prev_ref.className = "larrow"
            }
            if (Math.abs(c) + 2 * this.TASKBAR_HEIGHT > this._chat_area_ref.offsetHeight) {
                this._right_next_ref.className = "nrarrow"
            } else {
                this._right_next_ref.className = "rarrow"
            }
        },
        mf_handleOnResize: function(i) {
            if (!this._isResizing) {
                this._isResizing = true;
                this.mf_update_scrollbar();
                if (this._qqclient.mainPanel) {
                    var e = a.getViewportWidth();
                    var f = a.getViewportHeight();
                    var d = this._qqclient.mainPanel._buddyListPanelWidth;
                    var h = this._qqclient.mainPanel._webqqTopHeight;
                    var j = this._qqclient.mainPanel._taskbarHeight;
                    var c = h + j;
                    a.setStyle(this._qqclient.mainPanel._content_area_el, "height", Math.max((f - c), 0) + "px");
                    a.setStyle(this._qqclient.mainPanel._message_area_el, "height", Math.max((f - (c + 75)), 0) + "px");
                    a.setStyle(this._qqclient.mainPanel._web_browser_address_input_el, "width", Math.max((e - (d + 325)), 220) + "px");
                    a.setStyle(this._qqclient.mainPanel._web_browser_iframe_el, "width", Math.max((e - (d + 26)), 510) + "px");
                    a.setStyle(this._qqclient.mainPanel._web_browser_iframe_el, "height", Math.max((f - (c + 75 + 57)), 0) + "px");
                    a.setStyle(a.get("ChatlogInTab"), "height", Math.max((f - (c + 75 + 35 + 60)), 0) + "px");
                    a.setStyle(a.get("ChatlogInTab"), "width", Math.max((e - d - 55), 510) + "px");
                    a.setStyle(this._qqclient.mainPanel._music_box_iframe_el, "width", Math.max((e - (d + 26)), 510) + "px");
                    a.setStyle(this._qqclient.mainPanel._music_box_iframe_el, "height", Math.max((f - (c + 78)), 0) + "px");
                    a.setStyle(this._qqclient.mainPanel._buddy_manager_iframe_el, "width", Math.max((e - (d + 29)), 510) + "px");
                    a.setStyle(this._qqclient.mainPanel._buddy_manager_iframe_el, "height", Math.max((f - (c + 75)), 0) + "px");
                    a.setStyle(this._qqclient.mainPanel._user_list_el, "height", Math.max((f - (c + 130)), 0) + "px");
                    a.setStyle(this._qqclient.mainPanel._class_list_el, "height", Math.max((f - (c + 130)), 0) + "px");
                    if (this._qqclient.mainPanel._tabsManage && this._qqclient.mainPanel._tabsManage._actTalkWin) {
                        this._qqclient.mainPanel._tabsManage._actTalkWin.mf_handleOnResize(i)
                    }
                    this._qqclient.mainPanel.mf_handleSignatureInputBlur()
                }
                var g = this;
                window.setTimeout(function() {
                    g._isResizing = false
                },
                0)
            }
        },
        mf_regMainPanelTf: function(c) {
            this._usr_stat_icon_ref.id = c
        },
        _notify_icon_hide: false,
        mf_flick: function() {
            this._qqclient.showClassChatPic();
            if (this._qqclient.notify_uin_list.length == 0) {
                return
            }
            var c = this._qqclient.uin_online_stat;
            if (!c) {
                return
            }
            this.mf_update_status_icon(this._notify_icon_hide);
            this._notify_icon_hide = !this._notify_icon_hide
        },
        mf_update_status_icon: function(c) {
            var d = this._qqclient.uin_online_stat;
            if (d) {
                this._qqclient.mainPanel._status_menu_button_node.className = "my_state " + this._qqclient.css_stat
            }
            this._qqclient.updateUinIcon(c);
            this._qqclient.updateArrowIcon(c)
        },
        mf_update_flick_status: function() {
            if (this._qqclient.notify_uin_list.length == 0) {
                this.mf_update_status_icon(true);
                this._notify_icon_hide = false;
                return
            }
        },
        mf_flick_click: function(d) {
            if (d) {
                b.stopEvent(d)
            }
            if (this._qqclient.notify_uin_list.length > 0) {
                var c = this._qqclient.notify_uin_list[0].uin;
                this._qqclient.removeNotify(c);
                this._qqclient.actChat(c, false)
            } else {}
        },
        mf_bring_mainpanel: function() {
            this._qqclient.mainPanel.mf_ShowWindow()
        },
        md_flick_timer: null,
        mf_startupFlick: function() {
            if (this.md_flick_timer) {
                return
            }
            var c = this;
            this.md_flick_timer = setInterval(function() {
                c.mf_flick.apply(c)
            },
            400)
        },
        mf_stopFlick: function() {
            if (this.md_flick_timer) {
                clearInterval(this.md_flick_timer);
                this.md_flick_timer = null;
                this.mf_update_status_icon(true);
                this._qqclient.updateArrowIcon(true);
                this._notify_icon_hide = false
            }
        },
        mf_add: function(h, j) {
            a.setStyle(this._short_key_ref, "display", "none");
            var g = document.createElement("A");
            g.id = h._task_avatar_node;
            g.className = "no-message";
            g.href = "#";
            var f = this._qqclient.bdylist.allUsers[h.uin] || this._qqclient.bdylist.allClasses[h.uin],
            i = f.face || 0;
            var c = this._qqclient.bdylist.allClasses[h.uin] || null;
            var m, k, e = "";
            if (c) {
                m = 4;
                k = c.code;
                i = (c.property == 1) ? 2002 : 2001
            } else {
                m = 1;
                k = h.uin;
                if (f.stat == 20) {
                    e = "offline"
                }
            }
            g.innerHTML = '<img class="' + e + '" title="' + j + '" alt="' + j + '" src="' + face_server_domain + "/cgi/svr/face/getface?type=" + m + "&me=" + this._qqclient.uin + "&uin=" + k + '"/>';
            var l = h._auto;
            a.insertAfter(g, l ? this._chat_area_ref.lastChild: this._chat_area_ref.firstChild);
            var d = this._chat_tasks;
            d[h.uin] = {
                eleRef: g,
                winref: h
            };
            if (!l) {
                this.mf_update_sta(h, this.UPDATE_TYPE.activate)
            }
            this.mf_update_arrow();
            return {
                bar_el: g,
                title_el: g.childNodes[0]
            }
        },
        mf_remove: function(g) {
            var d = this._chat_tasks;
            if (!d[g.uin]) {
                return
            }
            var c = d[g.uin].eleRef;
            this._chat_area_ref.removeChild(c);
            d[g.uin].eleRef = null;
            d[g.uin].winref = null;
            delete d[g.uin];
            d[g.uin] = null;
            var f = 0;
            for (var e in d) {
                f++;
                break
            }
            if (f == 0) {
                this._active_task_bar = null;
                return
            }
            this.mf_SwitchNext()
        },
        mf_IsActivate: function(d) {
            var c = this._chat_tasks[d.uin];
            if (!c) {
                return
            }
            if (this._active_task_bar && (this._active_task_bar == c.eleRef)) {
                return true
            } else {
                return false
            }
        },
        mf_SwitchNext: function() {
            var d = this._chat_tasks;
            var g = 0,
            c = null,
            f;
            for (var e in d) {
                if (d[e]) {
                    f = d[e].winref;
                    if (!f.isShowing()) {
                        continue
                    }
                    if (g < f.mf_getIndex()) {
                        c = f
                    }
                }
            }
            if (c) {
                c.mf_onActivate()
            }
        },
        UPDATE_TYPE: {
            activate: 0,
            notify: 1,
            inactivate: 2,
            go: 3
        },
        mf_update_sta: function(f, c) {
            var e = this._chat_tasks,
            d = e[f.uin];
            if (!d) {
                return
            }
            switch (c) {
            case this.UPDATE_TYPE.activate:
                f._state = this.UPDATE_TYPE.activate;
                if (this._active_task_bar && (this._active_task_bar != d.eleRef)) {
                    this._active_task_bar.className = "no-message"
                }
                this._active_task_bar = d.eleRef;
                a.setStyle(this._chat_area_ref, "top", ( - this._active_task_bar.offsetTop) + "px");
                this.mf_update_arrow();
                if (this._qqclient.mainPanel._tabsManage._magnetState === 0) {
                    d.eleRef.className = "activeWithDisableMagnet"
                } else {
                    if (this._qqclient.mainPanel._tabsManage._magnetState === 1) {
                        d.eleRef.className = "act-message"
                    }
                }
                if (f._eleObj) {
                    if (f.isChatboxRestore()) {
                        f.restoreChatbox()
                    } else {
                        f.maxChatbox()
                    }
                }
                break;
            case this.UPDATE_TYPE.notify:
                f._state = this.UPDATE_TYPE.notify;
                if (this._active_task_bar != d.eleRef) {
                    d.eleRef.className = "get-message"
                }
                break;
            case this.UPDATE_TYPE.inactivate:
                f._state = this.UPDATE_TYPE.inactivate;
                d.eleRef.className = "no-message";
                if (this._active_task_bar == d.eleRef) {
                    this._active_task_bar = null
                }
                break;
            case this.UPDATE_TYPE.go:
                f._state = this.UPDATE_TYPE.go;
                d.eleRef.className = "go-message";
                break;
            default:
                break
            }
        },
        mf_ShowWindow: function() {
            this._eleRef.style.visibility = "visible"
        },
        mf_HideWindow: function() {
            this._eleRef.style.visibility = "hidden"
        },
        toString: function() {
            return "WEBQQ.cls.Taskbar " + this._id
        }
    }
})(); (function() {
    var a = YAHOO.util.Dom,
    b = YAHOO.util.Event;
    WEBQQ.namespace("WEBQQ.cls");
    WEBQQ.cls.TabWin = function(Q, J, G) {
        if (typeof(Q) !== "string") {
            throw new Error("WEBQQ.cls.TabWin call failed, the parameter(" + Q + ")'s type is not string!")
        }
        this._x = null;
        this._y = null;
        this._z = null;
        this._width = this._defaultWidth;
        this._height = this._defaultHeight;
        this._chatInputHeight = this._defaultChatInputHeight;
        this._taskBarHeight = 60;
        this._buddyListWidth = 220;
        this._state = 0;
        this.resizeController = null;
        this._id = "Talk_" + Q;
        this._id_pre = this._id + "_";
        this._task_avatar_node = this._id + "_tf";
        this._qqclient = WEBQQ.obj.QQClient;
        this.uin = J.uin;
        var l = this._id_pre + "clear_tab";
        var j = this._id + "chatbox_title_panel";
        var O = this._id + "_title";
        var x = this._id + "_signature";
        var v = this._id + "_image";
        var H = this._id + "_title_signature";
        var t = this._id + "_minimize";
        var n = this._id + "_max";
        var s = this._id + "_close";
        var e = this._id + "_close2";
        var r = this._id + "_nav";
        var d = this._id + "_history";
        var I = this._id + "_chatlog_button";
        var B = this._id + "_transfer_file";
        var m = this._id + "_face_tab";
        var D = this._id + "_input";
        var c = this._id + "_send";
        var q = this._id + "_sset";
        var L = this._id + "_chat";
        var u = this._id + "_mbr_title";
        var M = this._id + "_class_member";
        var E = this._id + "_class_body";
        var h = this._id + "_memo_content";
        var y = this._id + "_member_header";
        var P = this._id + "_member_content";
        var i = this._id + "_ExportChatlogForm";
        var C = this._id + "_ExportChatlogPostContent";
        var N = document.createElement("DIV");
        N.id = this._id;
        N.className = "chatbox";
        N.style.display = "none";
        var A = this._qqclient.bdylist.allUsers[this.uin] || this._qqclient.bdylist.allClasses[this.uin];
        var o = (A && A.face) || 0;
        var K = G ? "online": ((this._qqclient.STAT2DESC[A.stat] == "offline") ? "offline": "");
        var z, F, p = "公告：",
        g = "",
        f = "",
        w = "",
        k = "";
        if (G) {
            z = 4;
            F = G.code;
            p += G.memo;
            g = G.code;
            o = (G.property == 1) ? 2002 : 2001;
            f = '<a target="_blank" href="' + qun_space_server_domain + "/air/" + g + '#chatlog"  onclick="WEBQQ.obj.QQClient.mainPanel._tabsManage.minAllChatbox();WEBQQ.obj.QQClient.mainPanel.openThisLinkInWebBrowser(this);return false;" class="chatlogButton">消息记录</a>';
            w = '<a id="' + l + '" class="clearico" href="#" title="清屏"></a>';
            N.innerHTML = '<div id="' + j + '" class="chatbox_title_panel">							<div class="avatar">								<img id="' + v + '" class="' + K + '" uin="' + F + '" src="' + face_server_domain + "/cgi/svr/face/getface?type=" + z + "&me=" + this._qqclient.uin + "&uin=" + F + '" alt="QQ头像" title="查看详细资料" />							</div>							<div class="chatbox_controler">								<a id="' + s + '" class="close" href="#" onfocus="this.blur();" title="关闭"></a>								<a id="' + n + '" class="small" href="#" onfocus="this.blur();" title="最大化"></a>								<a id="' + t + '" class="min" href="#" onfocus="this.blur();" title="最小化"></a>							</div>							<div class="buddy_name"><a id="' + O + '" uin="' + F + '" onfocus="this.blur();">下午茶餐厅(24568789)</a></div>							<div id="' + H + '" class="buddy_signature"><a href="' + qun_space_server_domain + "/air/#" + g + '" target="_blank" title="' + p.forTitle() + '">' + p.forHtml() + '</a></div>						</div>						<div class="groupright">							<div class="groupmemo">								<div class="memoheader">群空间</div>								<div id="' + h + '" class="memocontent">									<a class="group_link" href="' + qun_space_server_domain + "/air/" + g + '#chatlog" title="进入 群聊精华" target="_blank"><div class="icon_marrow">!</div>群聊精华</a>									<a class="group_link" href="' + qun_space_server_domain + "/air/" + g + '#bbs" title="进入 群论坛" target="_blank"><div class="icon_bbs">!</div>群论坛</a>									<a class="group_link" href="' + qun_space_server_domain + "/air/" + g + '#album" title="进入 群相册" target="_blank"><div class="icon_album">!</div>群相册</a>								</div>							</div>							<div class="groupmember">								<div class="memberheader"><span id="' + y + '">群成员(0/0)</span></div>								<div id="' + P + '" class="membercontent"><div class="loading">载入中...</div></div>							</div>						</div>						<div class="groupleft">							<div id="' + d + '" class="chat_content">								<div></div>							</div>							<div class="chat_option">                                <a id="' + m + '_g" class="faceico" href="#" title="选择表情"></a>								' + w + f + '							</div>							<div id="' + D + '" class="chat_input"><textarea></textarea></div>							<div class="chat_controler_button">								<a id="' + q + '" class="changesend" href="#" onfocus="this.blur();"></a>								<a id="' + c + '" class="send" href="#" onfocus="this.blur();" title="快捷键: Alt+S">发 送(<u>S</u>)</a>								<a id="' + e + '" class="close" href="#" onfocus="this.blur();" title="快捷键: Alt+C">关 闭(<u>C</u>)</a>							</div>						</div>'
        } else {
            z = 1;
            F = this.uin;
            p = "";
            if (this._qqclient.isFriend(F) > -1) {
                k = '<a href="#" class="filetransfer" style="display:block;">发送文件</a><form class="send_file_form" style="display:block;" title="发送文件..." target="filetransfer" action="' + file_send_server_domain + '/uinA/uinP/ibertSrvIndex/ibertSrvPort/fileTotal/fileType/fileIndex/progressId/md5/fileNameFromFile" method="POST" enctype="multipart/form-data"><input id="' + B + '" class="select_file" name="file" type="file" size="1" ><input style="display:none;" name="go" type="submit" value="Send File"></form>'
            }
            f = '<form id="' + i + '" target="_blank" action="' + chat_tmp_server_domain + '/buddy_state/feed/save_chatlog.php" method="POST">						<input id="' + C + '" type="hidden" name="chatlog" value="chatlog" />						<input type="hidden" name="myqq" value="' + this._qqclient.uin + '" />						<input type="hidden" name="mynick" value="' + String(this._qqclient.nick).forTitle() + '" />						<input type="hidden" name="friendqq" value="' + A.id + '" />						<input type="hidden" name="friendnick" value="' + String(A.nick).forTitle() + '" />						<input type="hidden" name="friendrealname" value="' + String(A.remark).forTitle() + '" />					</form>					<a id="' + I + '" class="chatlogButton" href="#">消息记录</a>';
            w = "";
            N.innerHTML = '<div id="' + j + '" class="chatbox_title_panel">							<div class="avatar">								<img id="' + v + '" class="' + K + '" uin="' + F + '" src="' + face_server_domain + "/cgi/svr/face/getface?type=" + z + "&me=" + this._qqclient.uin + "&uin=" + F + '" alt="QQ头像" title="查看详细资料" />							</div>							<div class="chatbox_controler">								<a id="' + s + '" class="close" href="#" onfocus="this.blur();" title="关闭"></a>								<a id="' + n + '" class="small" href="#" onfocus="this.blur();" title="最大化"></a>								<a id="' + t + '" class="min" href="#" onfocus="this.blur();" title="最小化"></a>							</div>							<div class="buddy_name">								<a id="' + O + '" class="nick_in_chatbox" uin="' + F + '" onfocus="this.blur();">未知...</a>								<a class="qzoneicon_in_chatbox" title="进入Qzone!" href="http://user.qzone.qq.com/' + F + '" target="_blank">Qzone</a>							</div>							<div id="' + H + '" class="buddy_signature"><a href="' + qun_space_server_domain + "/air/#" + g + '" target="_blank">' + p.forHtml() + '</a></div>						</div>						<div class="buddyleft">							<div id="' + d + '" class="chat_content"></div>							<div class="chat_option">                            <a id="' + m + '" class="faceico" href="#" title="选择表情"></a>								' + k + w + f + '							</div>							<div id="' + D + '" class="chat_input"><textarea></textarea></div>							<div class="chat_controler_button">								<a id="' + q + '" class="changesend" href="#" onfocus="this.blur();"></a>								<a id="' + c + '" class="send" href="#" onfocus="this.blur();" title="快捷键: Alt+S">发 送(<u>S</u>)</a>								<a id="' + e + '" class="close" href="#" onfocus="this.blur();" title="快捷键: Alt+C">关 闭(<u>C</u>)</a>							</div>						</div>'
        }
        document.body.appendChild(N);
        this._eleRef = N;
        b.on(this._eleRef, "mousedown", this.handleMousedownChatbox, this, true);
        this.chatbox_title_panel_node = a.get(j);
        b.on(this.chatbox_title_panel_node, "dblclick", this.handleDblclickChatbox, this, true);
        this._buddy_name_node = a.get(O);
        this._image_ref = a.get(v);
        this._title_signature_ref = a.get(H);
        this._mini_btn_ref = a.get(t);
        this._max_btn_ref = a.get(n);
        this._close_btn_ref = a.get(s);
        this._close_btn_ref2 = a.get(e);
        this._nav_ref = a.get(r);
        this._history_ref = a.get(d);
        this._history_ref.style.cursor = "default";
        this._chatlog_button_ref = a.get(I);
        this._transfer_file_ref = a.get(B);
        this._face_tab_ref_g = a.get(m + "_g");
        this._face_tab_ref = a.get(m);
        this._clear_tab_ref = a.get(l);
        this._input_ref = a.get(D);
        this._ExportChatlogFormEl = a.get(i);
        this._ExportChatlogPostContentEl = a.get(C);
        this._send_ref = a.get(c);
        this._sset_ref = a.get(q);
        this._mbr_title_ref = a.get(u);
        this._memo_content_ref = a.get(h);
        this._member_header_ref = a.get(y);
        this._member_content_ref = a.get(P);
        this._split_ele = {};
        this.user_ele = {};
        this._tabs_manage = J.tabs_manage || null;
        this._auto = J.auto || false;
        this._talkTabs = new WEBQQ.cls.TabNav(this._id, {
            owner: this
        });
        this._taskBar = WEBQQ.cls.Taskbar.getInstance();
        this._taskbar_ctl_ref = this._taskBar.mf_add(this, "WebQQ会话");
        if (G) {
            this._qqclass = G;
            this.mf_UpdateMemberHeader(G);
            this.mf_UpdateMemberContent(G)
        }
        this.init(this._id, J)
    };
    WEBQQ.cls.TabWin.prototype = {
        _id_pre: "",
        _id: "",
        _task_avatar_node: "",
        _eleObj: null,
        _padding: 5,
        _defaultWidth: 520,
        _defaultHeight: 390,
        _magnetingWidth: 430,
        _magnetingHeight: 365,
        _defaultChatInputHeight: 170,
        _defaultGroupMemberHeight: 165,
        _minWidth: 375,
        _minHeight: 195,
        _byX: 25,
        _byY: 25,
        _resizeHandle: null,
        _qqclient: null,
        _auto: false,
        _talkTabs: null,
        _taskBar: null,
        _name_chk_poll_timer: null,
        _qqclass: null,
        _split_ele: {},
        user_ele: {},
        uin: 0,
        init: function(h, g) {
            var c = this;
            b.on(this._task_avatar_node, "click", this.mf_switch_show, this, true);
            b.on(this._chatlog_button_ref, "click", this.handleClickChatlogButton, this, true);
            if (!this._qqclass) {
                b.on(this._transfer_file_ref, "change",
                function(z, t) {
                    if (t._qqclient.uin_online_stat == t._qqclient.ONLINE_STAT_ENUM.offline) {
                        alert("您已经离线，不能发送文件，请重新登录！");
                        return
                    }
                    var q = GetFileSize(this);
                    var n = this.value;
                    var B = n.substring(n.lastIndexOf("\\") + 1);
                    if (q > 3 * 1024 * 1024) {
                        alert("暂不支持大于3MB的文件，" + B + "(" + Number(q / 1048576).toFixed(2) + "MB)传输失败");
                        return
                    }
                    var o = t._qqclient.pm.cs_seq++;
                    t._qqclient.lc[o] = B;
                    this.parentNode.action = file_send_server_domain + "/" + t._qqclient.uin + "/" + t.uin + "/" + o + "/" + t._qqclient.svrindex_and_port[0] + "/" + t._qqclient.svrindex_and_port[1] + "/1/f/1/0/0";
                    this.parentNode.submit();
                    var k = c.uin;
                    var w = c._qqclient.pm.cs_seq + 1000000;
                    var j = new Date();
                    var p = j.getFullYear(),
                    u = j.getMonth() + 1,
                    v = j.getDate(),
                    m = j.getHours(),
                    s = j.getMinutes(),
                    A = j.getSeconds();
                    var l = (j.getFullYear() + "-" + ((u > 9) ? u: "0" + u) + "-" + ((v > 9) ? v: "0" + v) + "&nbsp;" + ((m > 9) ? m: "0" + m) + ":" + ((s > 9) ? s: "0" + s) + ":" + ((A > 9) ? A: "0" + A));
                    var x = '<span class="filemsg_warning_icon"></span><span class="time">' + l + "</span>";
                    var r = x;
                    var y = '<span class="file_msg">发送文件"' + B + '"给对方</span>';
                    c.toSendQQC2CMsg(k, w, r, y);
                    this.parentNode.reset();
                    c._qqclient.pm.cs_seq++
                },
                this);
                var d = this._qqclient.bdylist.allUsers[this.uin];
                if (!d.long_nick.got) {
                    var f = 20,
                    i = Math.max(d.pointer, 0),
                    e = this._qqclient.bdylist.friendList.uins.slice(i, i + f) || [this.uin];
                    this._qqclient.getLDLongNickInfo(e)
                } else {
                    this.mf_setSignature(d.long_nick.content)
                }
            }
            b.on(this._mini_btn_ref, "click",
            function(j) {
                b.stopEvent(j);
                this.mf_HideWindow()
            },
            this, true);
            b.on(this._max_btn_ref, "click", this.onClickSwitchMaxOrRestoreHandler, this, true);
            b.on(this._mini_btn_ref, "mouseover", this.mf_btn_mouse_ev, this, true);
            b.on(this._mini_btn_ref, "mouseout", this.mf_btn_mouse_ev, this, true);
            b.on([this._close_btn_ref, this._close_btn_ref2], "click", this.clickClostWindow, this, true);
            b.on([this._close_btn_ref, this._close_btn_ref2], "mousedown",
            function(j) {
                b.stopEvent(j)
            });
            b.on(this._close_btn_ref, "mouseover", this.mf_btn_mouse_ev, this, true);
            b.on(this._close_btn_ref, "mouseout", this.mf_btn_mouse_ev, this, true);
            b.on(this._face_tab_ref_g, "click", this._qqclient.mainPanel.mf_ShowFace_g, this._qqclient.mainPanel, true);
            b.on(this._face_tab_ref, "click", this._qqclient.mainPanel.mf_ShowFace, this._qqclient.mainPanel, true);
            b.on(this._clear_tab_ref, "click", this.mf_clearScreen, this, true);
            b.on(this._face_tab_ref, "keydown", this.mf_PreventDefault, this, true);
            b.on(this._send_ref, "click", this.mf_OnSend, this, true);
            b.on(this._sset_ref, "click", this.mf_ShowSendSet, this, true);
            b.on(this._qqclient.mainPanel._sset_panel_ref.childNodes[0], "mousedown",
            function(j) {
                this._qqclient.mainPanel._sset_panel_ref.childNodes[0].childNodes[0].className = "changeway";
                this._qqclient.mainPanel._sset_panel_ref.childNodes[1].childNodes[0].className = "";
                this._qqclient.mainPanel._sset_panel_ref.childNodes[2].childNodes[0].className = "";
                this._qqclient.setBitValue(30, 2, 1)
            },
            this, true);
            b.on(this._qqclient.mainPanel._sset_panel_ref.childNodes[1], "mousedown",
            function(j) {
                this._qqclient.mainPanel._sset_panel_ref.childNodes[0].childNodes[0].className = "";
                this._qqclient.mainPanel._sset_panel_ref.childNodes[1].childNodes[0].className = "changeway";
                this._qqclient.mainPanel._sset_panel_ref.childNodes[2].childNodes[0].className = "";
                this._qqclient.setBitValue(30, 2, 2)
            },
            this, true);
            b.on(this._qqclient.mainPanel._sset_panel_ref.childNodes[2], "mousedown",
            function(j) {
                this._qqclient.mainPanel._sset_panel_ref.childNodes[0].childNodes[0].className = "";
                this._qqclient.mainPanel._sset_panel_ref.childNodes[1].childNodes[0].className = "";
                this._qqclient.mainPanel._sset_panel_ref.childNodes[2].childNodes[0].className = "changeway";
                this._qqclient.setBitValue(30, 2, 3)
            },
            this, true);
            this._eleObj = new YAHOO.widget.Overlay(this._eleRef, {
                iframe: false,
                visible: false,
                context: [this._taskBar, "bl", "tl"]
            });
            this._eleObj.render()
        },
        handleClickChatlogButton: function(e) {
            b.preventDefault(e);
            var d = a.getX(this._chatlog_button_ref) - 2;
            var f = a.getY(this._chatlog_button_ref) + 20;
            var c = a.get("chatlogExportButton");
            b.removeListener(c);
            b.on(c, "click", this.handleClickChatlogButton2, this, true);
            this._qqclient.mainPanel.showChatlogMenu(d, f)
        },
        handleClickChatlogButton2: function(c) {
            this._qqclient.reportStat(59501);
            b.stopEvent(c);
            this._ExportChatlogPostContentEl.value = this._history_ref.innerHTML;
            this._ExportChatlogFormEl.action = this._ExportChatlogFormEl.action + "&" + Math.random();
            this._ExportChatlogFormEl.submit()
        },
        handleMousedownChatbox: function(c) {
            this.setCurrent();
            this.mf_HideSendSet()
        },
        handleMousedownChatboxOtherArea: function(c) {
            b.stopPropagation(c);
            this.setCurrent()
        },
        handleMousedownCurrentChatboxOtherArea: function(c) {
            b.stopPropagation(c);
            this._qqclient.mainPanel.mf_FaceHide();
            this.mf_HideSendSet()
        },
        handleDblclickChatbox: function(c) {
            b.stopEvent(c);
            this.switchChatboxMaxOrRestore()
        },
        setCurrent: function() {
            this.showChatbox();
            if (this._tabs_manage._actTalkWin && this._tabs_manage._actTalkWin !== this) {
                if (this._tabs_manage._magnetState === 0) {
                    this._tabs_manage._actTalkWin.setToNotCurrentStyle()
                } else {
                    if (this._tabs_manage._magnetState === 1) {
                        this._tabs_manage._actTalkWin.mf_HideWindow()
                    }
                }
            }
            this._qqclient.removeNotify(this.uin);
            this._taskBar.mf_update_sta(this, this._taskBar.UPDATE_TYPE.activate);
            this._tabs_manage._actTalkWin = this;
            this._qqclient.mainPanel._hideAllMenus();
            if (this._talkTabs) {
                this._talkTabs.mf_FocusInput()
            }
            this.setToCurrentStyle()
        },
        mf_setSignature: function(c) {
            this._title_signature_ref.innerHTML = String(c).escape2name();
            this._title_signature_ref.title = c
        },
        mf_addClassSplitter: function(c) {
            var d = document.createElement("DIV");
            this._member_content_ref.appendChild(d);
            this._split_ele[c] = d
        },
        mf_UpdateMemberHeader: function(c) {
            var d = (c || this._qqclass).online_users.index.length + (c || this._qqclass).away_users.index.length,
            e = d + (c || this._qqclass).offline_users.index.length,
            f = "群成员(" + d + "/" + e + ")";
            this._member_header_ref.innerHTML = f
        },
        mf_UpdateMemberContent: function(f) {
            if (f.member_nick_got == true) {
                var g = "",
                o = "",
                n, d = f.online_users.index,
                e = f.uin;
                this._member_content_ref.innerHTML = "";
                this.mf_addClassSplitter("online");
                for (var i = 0,
                k = d.length; i < k; ++i) {
                    o = (f.all_members[d[i]].uin_flag == 1) ? "admin": "";
                    if (d[i] == f.creator) {
                        o = "creator"
                    }
                    var h = this._qqclient.bdylist.allUsers[d[i]] || null;
                    if (!h) {
                        continue
                    }
                    var c = (f.all_members[d[i]] ? (f.all_members[d[i]].remark || h.nick) : (h.remark || h.nick)) || d[i];
                    var l = document.createElement("DIV");
                    var m = h.face || 0;
                    l.id = this._id_pre + "user_" + d[i];
                    l.className = "tboxmenus";
                    l.title = String(((o == "creator") ? "创建者:": (o == "admin" ? "管理员:": "")) + c + "(" + d[i] + ")").forTitle();
                    l.innerHTML = '<div class="chatbox_member ' + o + '"></div><div class="icos"><a href="#"><img src="' + face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this._qqclient.uin + "&uin=" + d[i] + '" /></a></div><div class="names ' + o + '_name">' + String(c).forHtml() + "</div>";
                    this._member_content_ref.appendChild(l);
                    this.user_ele[d[i]] = l;
                    b.on(l, "dblclick", this.mf_ClassMemberClick, this, true);
                    b.on(l, "mouseover",
                    function() {
                        this.style.background = "#e0edfe"
                    });
                    b.on(l, "mouseout",
                    function() {
                        this.style.background = "none"
                    })
                }
                d = f.away_users.index;
                this.mf_addClassSplitter("away");
                for (var i = 0,
                k = d.length; i < k; ++i) {
                    o = (f.all_members[d[i]].uin_flag == 1) ? "admin": "";
                    if (d[i] == f.creator) {
                        o = "creator"
                    }
                    var h = this._qqclient.bdylist.allUsers[d[i]] || null;
                    if (!h) {
                        continue
                    }
                    var c = (f.all_members[d[i]] ? (f.all_members[d[i]].remark || h.nick) : (h.remark || h.nick)) || d[i];
                    var l = document.createElement("DIV");
                    var m = h.face || 0;
                    l.id = this._id_pre + "user_" + d[i];
                    l.className = "tboxmenus";
                    l.title = String(((o == "creator") ? "创建者:": (o == "admin" ? "管理员:": "")) + c + "(" + d[i] + ")").forTitle();
                    l.innerHTML = '<div class="chatbox_member ' + o + '"></div><div class="icos"><a href="#"><img src="' + face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this._qqclient.uin + "&uin=" + d[i] + '" /></a></div><div class="names ' + o + '_name">' + String(c).forHtml() + '</div><div class="away" title="离开"></div>';
                    this._member_content_ref.appendChild(l);
                    this.user_ele[d[i]] = l;
                    b.on(l, "dblclick", this.mf_ClassMemberClick, this, true);
                    b.on(l, "mouseover",
                    function() {
                        this.style.background = "#e0edfe"
                    });
                    b.on(l, "mouseout",
                    function() {
                        this.style.background = "none"
                    })
                }
                d = f.offline_users.index;
                this.mf_addClassSplitter("offline");
                for (var i = 0,
                k = d.length; i < k; ++i) {
                    o = (f.all_members[d[i]].uin_flag == 1) ? "admin": "";
                    if (d[i] == f.creator) {
                        o = "creator"
                    }
                    var h = this._qqclient.bdylist.allUsers[d[i]] || null;
                    if (!h) {
                        continue
                    }
                    var c = (f.all_members[d[i]] ? (f.all_members[d[i]].remark || h.nick) : (h.remark || h.nick)) || d[i];
                    var l = document.createElement("DIV");
                    var m = h.face || 0;
                    l.id = this._id_pre + "user_" + d[i];
                    l.className = "tboxmenus";
                    l.title = String(((o == "creator") ? "创建者:": (o == "admin" ? "管理员:": "")) + c + "(" + d[i] + ")").forTitle();
                    l.innerHTML = '<div class="chatbox_member ' + o + '"></div><div class="icos"><a href="#"><img class="offline" src="' + face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this._qqclient.uin + "&uin=" + d[i] + '" /></a></div><div class="names ' + o + '_name">' + String(c).forHtml() + "</div>";
                    this._member_content_ref.appendChild(l);
                    this.user_ele[d[i]] = l;
                    b.on(l, "dblclick", this.mf_ClassMemberClick, this, true);
                    b.on(l, "mouseover",
                    function() {
                        this.style.background = "#e0edfe"
                    });
                    b.on(l, "mouseout",
                    function() {
                        this.style.background = "none"
                    })
                }
            }
        },
        mf_ClassMemberClick: function(d) {
            this._qqclient.bdylist.currentClass = this.uin;
            var e = this._qqclient.mainPanel.mf_ChatWithUser(d);
            var c = this._qqclient.bdylist.allUsers[e];
            c.SessionTime = new Date().getTime();
            if (!c || c.group_id < 0) {
                this._qqclient.getClassTempSession(this.uin, e)
            }
            if (!c || c.group_id < 0) {
                this._qqclient.getVerifyCodeSession(0, e)
            }
        },
        mf_updateUserSta: function(i, h) {
            var e = this._qqclient.bdylist.allUsers[i],
            g = this.user_ele[i];
            if (!e || !g) {
                return false
            }
            b.removeListener(g, "dblclick", this._qqclient.mainPanel.mf_ChatWithUser);
            this._member_content_ref.removeChild(g);
            var d = this._qqclass,
            c;
            c = (d.all_members[i] == 1) ? "admin": "";
            if (i == d.creator) {
                c = "creator"
            }
            var f = d.all_members[i] ? (d.all_members[i].remark || e.nick) : (e.remark || e.nick);
            var g = document.createElement("DIV");
            var j = e.face || 0;
            g.id = this._id_pre + "user_" + i;
            g.className = "tboxmenus";
            g.title = String(((c == "creator") ? "创建者:": (c == "admin" ? "管理员:": "")) + f + "(" + i + ")").forTitle();
            switch (h) {
            case "online":
                g.innerHTML = '<div class="chatbox_member ' + c + '"></div><div class="icos"><a href="#"><img src="' + face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this._qqclient.uin + "&uin=" + i + '" /></a></div><div class="names ' + c + '_name">' + String(f).forHtml() + "</div>";
                break;
            case "away":
                g.innerHTML = '<div class="chatbox_member ' + c + '"></div><div class="icos"><a href="#"><img src="' + face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this._qqclient.uin + "&uin=" + i + '" /></a></div><div class="names ' + c + '_name">' + String(f).forHtml() + '</div><div class="away" title="离开"></div>';
                break;
            case "offline":
                g.innerHTML = '<div class="chatbox_member ' + c + '"></div><div class="icos"><a href="#"><img class="offline" src="' + face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this._qqclient.uin + "&uin=" + i + '" /></a></div><div class="names ' + c + '_name">' + String(f).forHtml() + "</div>";
                break
            }
            this.user_ele[i] = g;
            if (h != "offline") {
                a.insertAfter(g, this._split_ele[h])
            } else {
                this._member_content_ref.appendChild(g)
            }
            b.on(g, "dblclick", this._qqclient.mainPanel.mf_ChatWithUser, this._qqclient.mainPanel, true);
            b.on(g, "mouseover",
            function() {
                this.style.background = "#e0edfe"
            });
            b.on(g, "mouseout",
            function() {
                this.style.background = "none"
            });
            return true
        },
        mf_TranslateMessage: function(d) {
            var j = "",
            e = "";
            var l = function(i) {
                var n = 0;
                switch (String(i).toUpperCase()) {
                case "[/:)]":
                    n = 0;
                    break;
                case "[/:~]":
                    n = 1;
                    break;
                case "[/:B]":
                    n = 2;
                    break;
                case "[/:|]":
                    n = 3;
                    break;
                case "[/8-)]":
                    n = 4;
                    break;
                case "[/:<]":
                case "[/:&LT;]":
                    n = 5;
                    break;
                case "[/:$]":
                    n = 6;
                    break;
                case "[/:X]":
                    n = 7;
                    break;
                case "[/:Z]":
                    n = 8;
                    break;
                case "[/:'(]":
                case "[/:&#39;(]":
                    n = 9;
                    break;
                case "[/:-|]":
                    n = 10;
                    break;
                case "[/:@]":
                    n = 11;
                    break;
                case "[/:P]":
                    n = 12;
                    break;
                case "[/:D]":
                    n = 13;
                    break;
                case "[/:O]":
                    n = 14;
                    break;
                case "[/:(]":
                    n = 15;
                    break;
                case "[/:+]":
                    n = 16;
                    break;
                case "[/--B]":
                    n = 17;
                    break;
                case "[/:Q]":
                    n = 18;
                    break;
                case "[/:T]":
                    n = 19;
                    break;
                case "[/;P]":
                    n = 20;
                    break;
                case "[/;-D]":
                    n = 21;
                    break;
                case "[/;D]":
                    n = 22;
                    break;
                case "[/;O]":
                    n = 23;
                    break;
                case "[/:G]":
                    n = 24;
                    break;
                case "[/|-)]":
                    n = 25;
                    break;
                case "[/:!]":
                    n = 26;
                    break;
                case "[/:L]":
                    n = 27;
                    break;
                case "[/:>]":
                case "[/:&GT;]":
                    n = 28;
                    break;
                case "[/:;]":
                    n = 29;
                    break;
                case "[/;F]":
                    n = 30;
                    break;
                case "[/:-S]":
                    n = 31;
                    break;
                case "[/?]":
                    n = 32;
                    break;
                case "[/;X]":
                    n = 33;
                    break;
                case "[/;@]":
                    n = 34;
                    break;
                case "[/:8]":
                    n = 35;
                    break;
                case "[/;!]":
                    n = 36;
                    break;
                case "[/!!!]":
                    n = 37;
                    break;
                case "[/XX]":
                    n = 38;
                    break;
                case "[/BYE]":
                    n = 39;
                    break;
                case "[/WIPE]":
                    n = 40;
                    break;
                case "[/DIG]":
                    n = 41;
                    break;
                case "[/HANDCLAP]":
                    n = 42;
                    break;
                case "[/&-(]":
                case "[/&AMP;-(]":
                    n = 43;
                    break;
                case "[/B-)]":
                    n = 44;
                    break;
                case "[/<@]":
                case "[/&LT;@]":
                    n = 45;
                    break;
                case "[/@>]":
                case "[/@&GT;]":
                    n = 46;
                    break;
                case "[/:-O]":
                    n = 47;
                    break;
                case "[/>-|]":
                case "[/&GT;-|]":
                    n = 48;
                    break;
                case "[/P-(]":
                    n = 49;
                    break;
                case "[/:'|]":
                case "[/:&#39;|]":
                    n = 50;
                    break;
                case "[/X-)]":
                    n = 51;
                    break;
                case "[/:*]":
                    n = 52;
                    break;
                case "[/@X]":
                    n = 53;
                    break;
                case "[/8*]":
                    n = 54;
                    break;
                case "[/PD]":
                    n = 55;
                    break;
                case "[/<W>]":
                case "[/&LT;W&GT;]":
                    n = 56;
                    break;
                case "[/BEER]":
                    n = 57;
                    break;
                case "[/BASKETB]":
                    n = 58;
                    break;
                case "[/OO]":
                    n = 59;
                    break;
                case "[/COFFEE]":
                    n = 60;
                    break;
                case "[/EAT]":
                    n = 61;
                    break;
                case "[/PIG]":
                    n = 62;
                    break;
                case "[/ROSE]":
                    n = 63;
                    break;
                case "[/FADE]":
                    n = 64;
                    break;
                case "[/SHOWLOVE]":
                    n = 65;
                    break;
                case "[/HEART]":
                    n = 66;
                    break;
                case "[/BREAK]":
                    n = 67;
                    break;
                case "[/CAKE]":
                    n = 68;
                    break;
                case "[/LI]":
                    n = 69;
                    break;
                case "[/BOME]":
                    n = 70;
                    break;
                case "[/KN]":
                    n = 71;
                    break;
                case "[/FOOTB]":
                    n = 72;
                    break;
                case "[/LADYBUG]":
                    n = 73;
                    break;
                case "[/SHIT]":
                    n = 74;
                    break;
                case "[/MOON]":
                    n = 75;
                    break;
                case "[/SUN]":
                    n = 76;
                    break;
                case "[/GIFT]":
                    n = 77;
                    break;
                case "[/HUG]":
                    n = 78;
                    break;
                case "[/STRONG]":
                    n = 79;
                    break;
                case "[/WEAK]":
                    n = 80;
                    break;
                case "[/SHARE]":
                    n = 81;
                    break;
                case "[/V]":
                    n = 82;
                    break;
                case "[/@)]":
                    n = 83;
                    break;
                case "[/JJ]":
                    n = 84;
                    break;
                case "[/@@]":
                    n = 85;
                    break;
                case "[/BAD]":
                    n = 86;
                    break;
                case "[/LOVEU]":
                    n = 87;
                    break;
                case "[/NO]":
                    n = 88;
                    break;
                case "[/OK]":
                    n = 89;
                    break;
                case "[/LOVE]":
                    n = 90;
                    break;
                case "[/<L>]":
                case "[/&LT;L&GT;]":
                    n = 91;
                    break;
                case "[/JUMP]":
                    n = 92;
                    break;
                case "[/SHAKE]":
                    n = 93;
                    break;
                case "[/<O>]":
                case "[/&LT;O&GT;]":
                    n = 94;
                    break;
                case "[/CIRCLE]":
                    n = 95;
                    break;
                case "[/KOTOW]":
                    n = 96;
                    break;
                case "[/TURN]":
                    n = 97;
                    break;
                case "[/SKIP]":
                    n = 98;
                    break;
                case "[/OY]":
                    n = 99;
                    break;
                case "[/#-O]":
                    n = 100;
                    break;
                case "[/HIPHOP]":
                    n = 101;
                    break;
                case "[/KISS]":
                    n = 102;
                    break;
                case "[/<&]":
                case "[/&LT;&AMP;]":
                    n = 103;
                    break;
                case "[/&>]":
                case "[/&AMP;&GT;]":
                    n = 104;
                    break;
                default:
                    n = -1;
                    break
                }
                return n
            };
            if (b.isIE) {
                for (var f = 0; f < d.childNodes.length; f++) {
                    var c = d.childNodes[f];
                    switch (c.nodeName.toUpperCase()) {
                    case "BR":
                        e += "\n";
                        j += "<br/>";
                        break;
                    case "#TEXT":
                        j += c.nodeValue.escape2html();
                        e += c.nodeValue;
                        break;
                    case "IMG":
                        j += '<img src="' + c.src + '">';
                        var h = c.src.search("Face2/") + String("Face2/").length;
                        var g = this._qqclient.transfer_table[parseInt(c.src.substr(h))];
                        if (!isNaN(g)) {
                            e += ("\t" + g.toHex())
                        }
                        break;
                    default:
                        break
                    }
                }
            } else {
                j = String(d.value).forHtml();
                e = d.value
            }
            var m = this;
            j = j.replace(/\t/g, "&nbsp;");
            j = j.replace(/\[[^\]\n]{2,10}\]/g,
            function(i) {
                var n = l(i);
                return (n < 0) ? i: ('<img align="absmiddle" src="' + m._qqclient.face_domain + "Face2/" + n + '.gif" />')
            });
            j = j.replace(/\[自定义表情\d{1,10}\]/g,
            function(o) {
                var p = WEBQQ.obj.QQClient.mainPanel;
                var q = "http://web.qq.com/cgi-bin/webqq_app/?cmd=2&bd=";
                var n = parseInt(o.replace(/\[自定义表情|\]/g, ""));
                if (n > p._new_custom_face.length || n == 0) {
                    return o
                }
                n -= 1;
                return '<img align="absmiddle" src="' + q + p._new_custom_face[n][0] + '" />'
            });
            e = e.replace(/\t/g, " ");
            var k = e.split(/\[[^\]\n]{2,9}\]|\[自定义表情\d{1,10}\]/g);
            for (var f = 0; f < k.length; f++) {
                e = e.replace(k[f], encodeURIComponent(k[f]))
            }
            e = e.replace(/\[[^\]\n]{2,9}\]/g,
            function(i) {
                var n = l(i);
                return (n < 0) ? i: ("\t" + parseInt(m._qqclient.transfer_table[n]).toHex())
            });
            e = e.replace(/\[自定义表情\d{1,10}\]/g,
            function(o) {
                var p = WEBQQ.obj.QQClient.mainPanel;
                var n = parseInt(o.replace(/\[自定义表情|\]/g, ""));
                if (n > p._new_custom_face.length || n == 0) {
                    return encodeURIComponent(o)
                }
                n -= 1;
                return "\x15\x33\x32" + String(p._new_custom_face[n][0]).replace(/[{}-]/g, "") + "\x42\x1f"
            });
            return [j, e]
        },
        mf_clearScreen: function(d) {
            var c = this._qqclient.bdylist.allUsers[this.uin] || this._qqclient.bdylist.allClasses[this.uin];
            if (!c) {
                return
            }
            c.history.remove_msg();
            this._talkTabs.mf_clearHistory(this.uin)
        },
        mf_PreventDefault: function(c) {
            b.stopEvent(c)
        },
        mf_OnSend: function(r) {
            b.preventDefault(r);
            if (this._qqclient.uin_online_stat == this._qqclient.ONLINE_STAT_ENUM.offline) {
                alert("您已经离线，不能再发消息，请重新登录！");
                return
            }
            var g = this._talkTabs.mf_getActUinMsg();
            if (!g) {
                return
            }
            var u = this._qqclient.bdylist.allUsers[g.uin] || this._qqclient.bdylist.allClasses[g.uin];
            if (!u) {
                return
            }
            var e = g.uin,
            h = this.mf_TranslateMessage(g.input),
            s = h[0],
            p = h[1],
            q,
            o = new Date().getTime();
            if (p == "") {
                alert("发送内容不能为空，请重新输入！");
                return
            } else {
                if (String(decodeURIComponent(p)).length > 400) {
                    alert("对不起，您输入的内容过长！");
                    return
                }
            }
            this._qqclient.last_oper_time = o;
            var d = new Date();
            var j = d.getFullYear(),
            m = d.getMonth() + 1,
            n = d.getDate(),
            i = d.getHours(),
            l = d.getMinutes(),
            t = d.getSeconds();
            var f = (d.getFullYear() + "-" + ((m > 9) ? m: "0" + m) + "-" + ((n > 9) ? n: "0" + n) + " " + ((i > 9) ? i: "0" + i) + ":" + ((l > 9) ? l: "0" + l) + ":" + ((t > 9) ? t: "0" + t));
            var c = String(this._qqclient.remark || this._qqclient.nick + "[" + this._qqclient.uin + "]") + "  " + f;
            if (u.msg_sent_flag != true) {
                p += encodeURIComponent("\n【提示：" + String(this._qqclient.nick).escape2taskbar() + "(" + this._qqclient.uin + ")正在使用WebQQ：http://web.qq.com/?w】");
                u.msg_sent_flag = true
            }
            var k = this;
            if (u.group_id == -1 && u.class_id == -1) {
                q = k._qqclient.sendClassMsg(e, (p))
            } else {
                if (u.group_id == -1 && u.class_id > -1) {
                    q = k._qqclient.sendSessionMsg(e, u.VerifySig, u.SigC2CMsg, this._qqclient.face, p);
                    if (q == 0) {
                        alert("临时会话已超时，请重新发送。");
                        return
                    }
                    c = String(k._qqclient.remark || k._qqclient.nick) + "  " + f
                } else {
                    q = k._qqclient.sendC2CMsg(e, this._qqclient.face, (p));
                    c = String(k._qqclient.remark || k._qqclient.nick) + "  " + f
                }
            }
            this.toSendQQC2CMsg(e, q, c.forHtml(), s)
        },
        toSendQQC2CMsg: function(h, g, c, f) {
            var e = this._talkTabs.mf_getActUinMsg();
            var d = this._qqclient.bdylist.allClasses[e.uin] || this._qqclient.bdylist.allUsers[e.uin];
            d.history.append(g, {
                style: "my-id",
                msg: c
            },
            {
                style: "content",
                msg: f
            });
            e.input.value = "";
            this._talkTabs.mf_updateHistory(h);
            this._talkTabs.mf_FocusInput()
        },
        mf_ShowSendSet: function(c) {
            this._qqclient.mainPanel._sset_panel_ref.style.display = "block";
            this._qqclient.mainPanel._sset_panel_obj.hide();
            this._qqclient.mainPanel._sset_panel_obj.cfg.applyConfig({
                iframe: false,
                context: [this._sset_ref, "tl", "bl"],
                visible: true
            });
            this._qqclient.mainPanel._sset_panel_obj.cfg.fireQueue();
            b.on(window.document, "mousedown", this.mf_HideSendSet, this, true)
        },
        mf_HideSendSet: function(c) {
            this._qqclient.mainPanel._sset_panel_ref.style.display = "none";
            this._qqclient.mainPanel._sset_panel_obj.hide();
            b.removeListener(window.document, "mousedown", this.mf_HideSendSet)
        },
        mf_setTitle: function(d, c) {
            var g = this._qqclient.bdylist.allUsers[d] || this._qqclient.bdylist.allClasses[d];
            var i = g.face || 0;
            var h = this._qqclient.STAT2DESC[g.stat] || "online";
            b.removeListener(this._image_ref, "click");
            b.removeListener(this._buddy_name_node, "click");
            this._buddy_name_node.href = "#";
            this._buddy_name_node.setAttribute("target", "_self");
            var k = this._qqclient.bdylist.allClasses[d] || null;
            if (k) {
                var n = (k.property == 1) ? "高级群": (k.property == "class-corp" ? "企业群": "普通群");
                this._buddy_name_node.innerHTML = '<span class="main_name">' + String(k.name).forHtml() + "</span><" + k.code + "> - " + n;
                this._buddy_name_node.href = qun_space_server_domain + "/air/#" + k.code;
                this._buddy_name_node.setAttribute("target", "_blank");
                this._buddy_name_node.setAttribute("title", "进入群空间");
                var m = this;
                b.on(this._image_ref, "click",
                function() {
                    window.open(qun_space_server_domain + "/air/#" + k.code, "_blank");
                    return true
                },
                this);
                this._image_ref.setAttribute("title", "进入群空间")
            } else {
                var j = g.remark,
                f = "";
                if (g && g.group_id == -1 && g.class_id > 0) {
                    var e = this._qqclient.bdylist.allClasses;
                    var l = this._qqclient.bdylist.currentClass || g.class_id,
                    k = e[l],
                    j = k.all_members[d].remark || c;
                    f = this._qqclient.bdylist.allClasses[l].name;
                    this._title_signature_ref.innerHTML = '<a href="#"><span class="add_buddy_icon_in_group_chatbox">+</span>加为好友</a>';
                    b.on(this._title_signature_ref.lastChild, "click",
                    function(o, p) {
                        this.addBuddy._lastResults[d] = g;
                        this.addBuddy.addToMyBuddy(d)
                    },
                    this._qqclient.mainPanel, true)
                }
                switch (h) {
                case "online":
                    this._buddy_name_node.innerHTML = '<span class="main_name">' + (j.forHtml() || c.forHtml()) + "</span><span><" + d + ">" + (f.forHtml() ? (" - " + f.forHtml()) : "") + "</span>";
                    this._image_ref.setAttribute("title", "在线中, 点击查看资料");
                    this._buddy_name_node.setAttribute("title", "在线中, 点击查看资料");
                    this._image_ref.className = "";
                    break;
                case "offline":
                    this._buddy_name_node.innerHTML = '<span class="main_name">' + (j.forHtml() || c.forHtml()) + "</span><span><" + d + ">" + (f.forHtml() ? (" - " + f.forHtml()) : "") + "</span>";
                    this._image_ref.setAttribute("title", "离线, 点击查看资料");
                    this._buddy_name_node.setAttribute("title", "离线, 点击查看资料");
                    this._image_ref.className = "offline";
                    break;
                case "away":
                    this._buddy_name_node.innerHTML = '<span class="main_name">' + (j.forHtml() || c.forHtml()) + "</span><span><" + d + ">" + (f.forHtml() ? (" - " + f.forHtml()) : "") + '</span><span class="away" title="离开"></span>';
                    this._image_ref.setAttribute("title", "离开, 点击查看资料");
                    this._buddy_name_node.setAttribute("title", "离开, 点击查看资料");
                    this._image_ref.className = "";
                    break;
                default:
                    break
                }
                b.on(this._image_ref, "click", this._qqclient.mainPanel.clickViewBuddyDetailsInTips, this._qqclient.mainPanel);
                b.on(this._buddy_name_node, "click", this._qqclient.mainPanel.clickViewBuddyDetailsInTips, this._qqclient.mainPanel)
            }
            this._taskbar_ctl_ref.title_el.title = "与 " + String(j || c || d).forTitle() + " 交谈中";
            if (g.stat == 20) {
                a.addClass(this._taskbar_ctl_ref.bar_el.firstChild, "offline")
            } else {
                a.removeClass(this._taskbar_ctl_ref.bar_el.firstChild, "offline")
            }
            this._taskbar_ctl_ref.title_el.alt = String(j || c || d).forTitle()
        },
        isShowing: function() {
            return (this._eleRef.style.display == "block" && this._eleRef.style.visibility == "visible")
        },
        isCurrent: function() {
            return (parseInt(this._eleRef.style.zIndex) == this._tabs_manage._max_z - 1)
        },
        mf_getIndex: function() {
            var c = a.getStyle(this.element, "zIndex");
            if (!isNaN(c)) {
                return parseInt(c, 10)
            } else {
                return 0
            }
        },
        mf_switch_show: function(c) {
            b.stopEvent(c);
            this._qqclient.removeMsg();
            if (this._tabs_manage._magnetState === 0) {
                if (this.isCurrent() && this.isShowing()) {
                    this.mf_HideWindow()
                } else {
                    this.mf_ShowWindow()
                }
            } else {
                if (this._tabs_manage._magnetState === 1) {
                    if (this.isShowing()) {
                        this.mf_HideWindow()
                    } else {
                        this.mf_ShowWindow()
                    }
                }
            }
        },
        mf_btn_mouse_ev: function(c) {
            var d = b.fromEle(c);
            if (!d) {
                return
            }
            if (c.type == "mouseover") {
                if (d.nodeName.toUpperCase() == "IMG") {
                    d.src = d.src.replace("g.gif", "l.gif")
                }
            } else {
                if (c.type == "mouseout") {
                    if (d.nodeName.toUpperCase() == "IMG") {
                        d.src = d.src.replace("l.gif", "g.gif")
                    }
                }
            }
        },
        _getXY: function(d) {
            var c = (a.getViewportWidth() - parseInt(a.getStyle(this._eleRef, "width"))) / 8;
            var e = (a.getViewportHeight() - parseInt(a.getStyle(this._eleRef, "height"))) / 8;
            d = d % 15;
            c += (50 * parseInt(d / 5) + 50 * (d % 5));
            e += (27 * (d % 5));
            return [c, e]
        },
        mf_SyncHistoryScroll: function() {
            this._history_ref.scrollTop = this._history_ref.scrollHeight
        },
        mf_UpdateWindow: function() {
            this.render();
            var c = this._getXY(parseInt(this._eleRef.id.substr(this._eleRef.id.indexOf("Talk_group") + String("Talk_group").length)));
            this.cfg.setProperty("xy", c);
            if (this._qqclient.chat_mode == 1) {
                this._qqclient.mainPanel._newWin[this.uin].moveTo(c[0], c[1])
            }
        },
        mf_handleOnResize: function(c) {
            var d = this._tabs_manage._actTalkWin;
            if (d) {
                if (this._tabs_manage._magnetState === 1 || d.isChatboxMax()) {
                    this._tabs_manage._actTalkWin = null;
                    window.setTimeout(function() {
                        d.mf_ShowWindow()
                    },
                    0)
                }
            }
        },
        setChatboxPos: function() {
            if (this._x === null) {
                var d = a.getViewportWidth() - this._buddyListWidth,
                f = a.getViewportHeight() - this._taskBarHeight;
                var e = Math.floor((d - this._width) / 2),
                g = Math.floor((f - this._height) / 2);
                var c = e + (this._byX * (this._tabs_manage._max_index - 1)),
                i = g + (this._byY * (this._tabs_manage._max_index - 1));
                if ((c > d - this._width) || (i > f - this._height)) {
                    c = 0 + c % (d - this._width);
                    i = 0 + c % (f - this._height)
                }
                this._x = c;
                this._y = i
            }
            a.setStyle(this._eleRef, "left", this._x + "px");
            a.setStyle(this._eleRef, "top", this._y + "px")
        },
        isChatboxMax: function() {
            return this._max_btn_ref.className == "big"
        },
        isChatboxRestore: function() {
            return this._max_btn_ref.className == "small"
        },
        isChatboxMin: function() {},
        isChatboxclose: function() {},
        setToCurrentStyle: function() {
            a.addClass(this._eleRef, "chatbox_current");
            this._eleRef.style.zIndex = this._tabs_manage._max_z++;
            b.removeListener(this._history_ref, "mousedown", this.handleMousedownChatboxOtherArea);
            b.removeListener(this._input_ref, "mousedown", this.handleMousedownChatboxOtherArea);
            b.removeListener(this._memo_content_ref, "mousedown", this.handleMousedownChatboxOtherArea);
            b.removeListener(this._member_content_ref, "mousedown", this.handleMousedownChatboxOtherArea);
            b.on(this._history_ref, "mousedown", this.handleMousedownCurrentChatboxOtherArea, this, true);
            b.on(this._input_ref, "mousedown", this.handleMousedownCurrentChatboxOtherArea, this, true);
            b.on(this._memo_content_ref, "mousedown", this.handleMousedownCurrentChatboxOtherArea, this, true);
            b.on(this._member_content_ref, "mousedown", this.handleMousedownCurrentChatboxOtherArea, this, true)
        },
        setToNotCurrentStyle: function() {
            a.removeClass(this._eleRef, "chatbox_current");
            b.removeListener(this._history_ref, "mousedown", this.handleMousedownCurrentChatboxOtherArea);
            b.removeListener(this._input_ref, "mousedown", this.handleMousedownCurrentChatboxOtherArea);
            b.removeListener(this._memo_content_ref, "mousedown", this.handleMousedownCurrentChatboxOtherArea);
            b.removeListener(this._member_content_ref, "mousedown", this.handleMousedownCurrentChatboxOtherArea);
            b.on(this._history_ref, "mousedown", this.handleMousedownChatboxOtherArea, this, true);
            b.on(this._input_ref, "mousedown", this.handleMousedownChatboxOtherArea, this, true);
            b.on(this._memo_content_ref, "mousedown", this.handleMousedownChatboxOtherArea, this, true);
            b.on(this._member_content_ref, "mousedown", this.handleMousedownChatboxOtherArea, this, true)
        },
        showChatboxWithMagnetOn: function() {
            this.disableResizeController();
            a.setStyle(this._eleRef, "width", this._magnetingWidth - (this._padding * 2) + "px");
            a.setStyle(this._eleRef, "height", this._magnetingHeight - (this._padding * 2) + "px");
            a.setStyle(this._history_ref, "height", (this._magnetingHeight - this._chatInputHeight) + "px");
            a.setStyle(this._input_ref.firstChild, "display", "inline");
            a.setStyle(this._eleRef, "display", "block");
            this._eleObj.show();
            this._eleObj.cfg.applyConfig({
                iframe: false,
                context: [this._taskBar._active_task_bar, "bl", "tl"],
                visible: true,
                constraintoviewport: true
            });
            this._eleObj.cfg.fireQueue()
        },
        showChatboxWithMagnetOff: function() {
            if (this.isChatboxRestore()) {
                this.enableResizeController();
                this.setChatboxPos();
                a.setStyle(this._eleRef, "width", this._width - (this._padding * 2) + "px");
                a.setStyle(this._eleRef, "height", this._height - (this._padding * 2) + "px");
                a.setStyle(this._history_ref, "height", (this._height - this._defaultChatInputHeight) + "px");
                a.setStyle(this._member_content_ref, "height", (this._height - this._defaultGroupMemberHeight) + "px")
            }
            a.setStyle(this._eleRef, "display", "block");
            a.setStyle(this._eleRef, "visibility", "visible");
            a.setStyle(this._eleRef, "visibility", "visible");
            a.setStyle(this._input_ref.firstChild, "display", "inline")
        },
        showChatbox: function() {
            if (this._tabs_manage._magnetState === 0) {
                this.showChatboxWithMagnetOff()
            } else {
                if (this._tabs_manage._magnetState === 1) {
                    this.showChatboxWithMagnetOn()
                }
            }
        },
        mf_ShowWindow: function() {
            if (this._tabs_manage._magnetState === 0) {
                this.showChatboxWithMagnetOff();
                if (this._tabs_manage._actTalkWin) {
                    this._tabs_manage._actTalkWin.setToNotCurrentStyle()
                }
            } else {
                if (this._tabs_manage._magnetState === 1) {
                    this.showChatboxWithMagnetOn();
                    if (this._tabs_manage._actTalkWin) {
                        this._tabs_manage._actTalkWin.mf_HideWindow()
                    }
                }
            }
            this._qqclient.removeNotify(this.uin);
            this._taskBar.mf_update_sta(this, this._taskBar.UPDATE_TYPE.activate);
            this._tabs_manage._actTalkWin = this;
            this._qqclient.mainPanel._hideAllMenus();
            this._talkTabs.mf_updateHistory(this.uin);
            if (this._talkTabs) {
                this._talkTabs.mf_FocusInput()
            }
            this.setToCurrentStyle()
        },
        enableResizeController: function() {
            if (this.resizeController !== null) {
                this.resizeController.unlock(true)
            } else {
                this.resizeController = new YAHOO.util.Resize(this._eleRef, {
                    handles: "all",
                    knobHandles: false,
                    minWidth: this._minWidth,
                    minHeight: this._minHeight,
                    draggable: true,
                    animate: false,
                    animateDuration: 0.5,
                    animateEasing: YAHOO.util.Easing.backBoth
                });
                this.resizeController.on("resize", this.handleResize, this, true);
                this.resizeController.on("endDrag", this.handleDragEnd, this, true);
                this.resizeController.lock(true);
                this.resizeController.unlock(true)
            }
        },
        disableResizeController: function() {
            if (this.resizeController !== null) {
                this.resizeController.lock(true)
            }
        },
        handleResize: function(c) {
            this._x = c.x;
            this._y = c.y;
            this._width = c.width;
            this._height = c.height;
            this._history_ref.style.height = (this._height - this._defaultChatInputHeight) + "px";
            this._member_content_ref.style.height = (this._height - this._defaultGroupMemberHeight) + "px"
        },
        handleDragEnd: function(c) {
            this._x = c.x;
            this._y = c.y
        },
        mf_HideWindow: function() {
            this._eleObj.hide();
            a.setStyle(this._eleRef, "display", "none");
            this._taskBar.mf_update_sta(this, this._taskBar.UPDATE_TYPE.inactivate);
            this._tabs_manage._actTalkWin = null;
            this._qqclient.mainPanel._hideAllMenus()
        },
        maxChatbox: function() {
            var e, g;
            this.disableResizeController();
            this._max_btn_ref.className = "big";
            this._max_btn_ref.title = "还原";
            if (this._qqclient.mainPanel.isMainpanelMax) {
                e = a.getViewportWidth() - 25;
                g = a.getViewportHeight() - 35
            } else {
                var c = a.getViewportWidth() - 10 - 210,
                i = a.getViewportHeight() - 10 - 95 - 60,
                f = a.getViewportWidth() - 20,
                d = a.getViewportHeight() - 10 - 95 - 60;
                if (f >= 530 && f <= 760) {
                    e = 520
                } else {
                    if (f < 530) {
                        e = f
                    } else {
                        if (f > 760) {
                            e = f - 10 - 210
                        }
                    }
                }
                g = Math.min(i, d)
            }
            var j = a.getXY(this._qqclient.mainPanel._main_leftpanel_el);
            a.setStyle(this._eleRef, "left", j[0] + 13 + "px");
            a.setStyle(this._eleRef, "top", j[1] + 32 + "px");
            a.setStyle(this._eleRef, "width", e - 13 + "px");
            a.setStyle(this._eleRef, "height", g + "px");
            a.setStyle(this._history_ref, "height", (g - this._defaultChatInputHeight) + "px");
            a.setStyle(this._member_content_ref, "height", (g - this._defaultGroupMemberHeight) + "px")
        },
        restoreChatbox: function() {
            this._max_btn_ref.className = "small";
            this._max_btn_ref.title = "最大化";
            if (this._qqclient.mainPanel._tabsManage._magnetState === 0) {
                this.enableResizeController();
                this.setChatboxPos();
                a.setStyle(this._eleRef, "width", this._width - (this._padding * 2) + "px");
                a.setStyle(this._eleRef, "height", this._height - (this._padding * 2) + "px");
                a.setStyle(this._history_ref, "height", (this._height - this._defaultChatInputHeight) + "px");
                a.setStyle(this._member_content_ref, "height", (this._height - this._defaultGroupMemberHeight) + "px");
                a.setStyle(this._eleRef, "visibility", "visible")
            } else {
                if (this._qqclient.mainPanel._tabsManage._magnetState === 1) {
                    a.setStyle(this._eleRef, "width", this._magnetingWidth - (this._padding * 2) + "px");
                    a.setStyle(this._eleRef, "height", this._magnetingHeight - (this._padding * 2) + "px");
                    a.setStyle(this._history_ref, "height", (this._magnetingHeight - this._defaultChatInputHeight) + "px");
                    a.setStyle(this._member_content_ref, "height", (this._magnetingHeight - this._defaultGroupMemberHeight) + "px");
                    this._eleObj.cfg.applyConfig({
                        iframe: false,
                        context: [this._taskBar._active_task_bar, "bl", "tl"],
                        visible: true,
                        constraintoviewport: true
                    });
                    this._eleObj.cfg.fireQueue()
                }
            }
        },
        onClickSwitchMaxOrRestoreHandler: function(c) {
            b.stopEvent(c);
            this.switchChatboxMaxOrRestore()
        },
        switchChatboxMaxOrRestore: function() {
            if (this.isChatboxRestore()) {
                this.maxChatbox()
            } else {
                this.restoreChatbox()
            }
        },
        clickClostWindow: function(c) {
            this.mf_CloseWindow();
            b.stopEvent(c)
        },
        mf_CloseWindow: function() {
            this.mf_HideWindow();
            this._tabs_manage.mf_unreg(this)
        },
        mf_onActivate: function() {},
        destroy: function() {
            if (this._talkTabs) {
                this._talkTabs.destroy();
                this._talkTabs = null
            }
            if (this._qqclass) {
                var d, f = this._qqclass.online_users.index;
                for (var e = 0,
                c = f.length; e < c; ++e) {
                    d = this._id_pre + "user_" + f[e];
                    b.removeListener(d, "dblclick", this._qqclient.mainPanel.mf_ChatWithUser)
                }
                f = this._qqclass.away_users.index;
                for (var e = 0,
                c = f.length; e < c; ++e) {
                    d = this._id_pre + "user_" + f[e];
                    b.removeListener(d, "dblclick", this._qqclient.mainPanel.mf_ChatWithUser)
                }
                f = this._qqclass.offline_users.index;
                for (var e = 0,
                c = f.length; e < c; ++e) {
                    d = this._id_pre + "user_" + f[e];
                    b.removeListener(d, "dblclick", this._qqclient.mainPanel.mf_ChatWithUser)
                }
            }
            this._taskBar.mf_remove(this);
            if (--this._tabs_manage._win_count == 0) {
                this._tabs_manage.destroy()
            }
            b.removeListener(this._eleRef, "mousedown", this.mf_onActivate);
            b.removeListener(this._task_avatar_node, "click", this.mf_switch_show);
            b.removeListener(this._mini_btn_ref, "click", this.mf_HideWindow);
            b.removeListener(this._mini_btn_ref, "mouseover", this.mf_btn_mouse_ev);
            b.removeListener(this._mini_btn_ref, "mouseout", this.mf_btn_mouse_ev);
            b.removeListener([this._close_btn_ref, this._close_btn_ref2], "click", this.clickClostWindow);
            b.removeListener(this._close_btn_ref, "mouseover", this.mf_btn_mouse_ev);
            b.removeListener(this._close_btn_ref, "mouseout", this.mf_btn_mouse_ev);
            b.removeListener(this._face_tab_ref, "click", this._qqclient.mainPanel.mf_ShowFace);
            b.removeListener(this._face_tab_ref, "keydown", this.mf_PreventDefault);
            b.removeListener(this._send_ref, "click", this.mf_OnSend);
            document.body.removeChild(this._eleRef)
        },
        toString: function() {
            return "WEBQQ.cls.TabWin " + this.id
        }
    }
})(); (function() {
    var a = YAHOO.util.Dom,
    b = YAHOO.util.Event;
    WEBQQ.cls.TabNav = function(d, c) {
        if (typeof(d) !== "string") {
            throw new Error("WEBQQ.cls.TabNav call failed, the parameter(" + d + ")'s type is not string!")
        }
        this._id = "Tabs_" + d;
        this._id_pre = (this._id + "_");
        this._owner = c.owner || null;
        this._qqclient = WEBQQ.obj.QQClient;
        this._tabs_manage = this._owner._tabs_manage;
        this._tabParent = this._owner._nav_ref;
        this._historyParent = this._owner._history_ref;
        this._inputParent = this._owner._input_ref;
        this._uin_2_nav = {};
        this._nav_set = [];
        this._active_nav_index = -1;
        this.init(d, c)
    };
    WEBQQ.cls.TabNav.prototype = {
        _id_pre: "",
        _id: "",
        _owner: null,
        _qqclient: null,
        _tabs_manage: null,
        _tabParent: null,
        _historyParent: null,
        _inputParent: null,
        _uin_2_nav: {},
        _nav_set: [],
        _active_nav_index: -1,
        _testTransferreTable: [14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 50, 51, 96, 53, 54, 73, 74, 75, 76, 77, 78, 55, 56, 57, 58, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 32, 113, 114, 115, 63, 64, 59, 33, 34, 116, 36, 37, 38, 91, 92, 93, 29, 117, 72, 45, 42, 39, 62, 46, 47, 71, 95, 118, 119, 120, 121, 122, 123, 124, 27, 21, 23, 25, 26, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 52, 24, 22, 20, 60, 61, 89, 90, 31, 94, 65, 35, 66, 67, 68, 69, 70, 15, 16, 17, 18, 19, 28, 30, 40, 41, 43, 44, 48, 49],
        init: function(d, c) {},
        mf_add: function(d, c) {
            var g = this._id_pre + d + "_nav",
            l = this._id_pre + d + "_history",
            k = this._id_pre + d + "_input",
            h = this._id_pre + d + "_close";
            var n = '<div class="left"><div class="right"><div class="padder" unselectable="on"><span>' + (String(c).forHtml() || d) + '</span><em id="' + h + '"></em></div></div></div>';
            var f = document.createElement("DIV");
            f.id = g;
            f.className = "middle-one-nm middle-one-nm-n";
            f.innerHTML = n;
            var m = document.createElement("UL");
            m.id = l;
            m.style.display = "block";
            var i = this._inputParent.firstChild;
            i.id = k;
            i.className = "textarea";
            i.maxLength = 1024;
            var e = a.get(h);
            b.on(f, "mouseover", this.mf_OnMouseOver, this, true);
            b.on(f, "mouseout", this.mf_OnMouseOut, this, true);
            b.on(f, "click", this.mf_OnClick, this, true);
            b.on(f, "dblclick", this.mf_OnClose, this, true);
            b.on(e, "click", this.mf_OnClose, this, true);
            b.on(i, "keydown", this.mf_OnTextareaKey, this, true);
            b.on(i, "focus",
            function() {
                this._qqclient.removeMsg()
            },
            this, true);
            b.on(i, "click",
            function() {
                this._qqclient.removeMsg()
            },
            this, true);
            this._uin_2_nav[d] = {
                nav: f,
                history: this._historyParent,
                history_pos: 0
            };
            this._nav_set.push({
                nav: f,
                history: m,
                input: i,
                close: e,
                uin: d,
                nick: c
            });
            var j = this._nav_set.length - 1;
            this.mf_activate(j, true);
            return j
        },
        mf_OnTextareaKey: function(f) {
            this._qqclient.removeMsg();
            var g = f;
            f = b.getEvent(f);
            var c = b.getCharCode(f);
            if (c == 13) {
                switch (this._qqclient.getBitValue(30, 2)) {
                case 0:
                    break;
                case 1:
                    if (!f.ctrlKey) {
                        this._owner.mf_OnSend(f)
                    } else {
                        var d = this.mf_getActUinMsg();
                        d.input.value = d.input.value + "\n"
                    }
                    break;
                case 2:
                    if (f.ctrlKey) {
                        this._owner.mf_OnSend(f)
                    }
                    break;
                case 3:
                    this._owner.mf_OnSend(f);
                    break;
                default:
                    break
                }
            } else {
                if (c == 83 && f.altKey) {
                    b.stopEvent(f);
                    this._owner.mf_OnSend(f)
                }
            }
        },
        mf_remove: function(c) {
            if (!c.between(0, this._nav_set.length)) {
                return false
            }
            var d = this._nav_set[c];
            b.removeListener(d.nav, "mouseover", this.mf_OnMouseOver);
            b.removeListener(d.nav, "mouseout", this.mf_OnMouseOut);
            b.removeListener(d.nav, "click", this.mf_OnClick);
            b.removeListener(d.nav, "dblclick", this.mf_OnClose);
            b.removeListener(d.close, "click", this.mf_OnClose);
            b.removeListener(d.input, "keydown", this.mf_OnTextareaKey);
            delete this._tabs_manage._uin2container[d.uin];
            delete this._uin_2_nav[d.uin];
            this._nav_set.splice(c, 1);
            return true
        },
        mf_getActUinMsg: function() {
            var d = this._nav_set;
            if (!this._active_nav_index.between(0, d.length)) {
                return null
            } else {
                var c = d[this._active_nav_index];
                return {
                    uin: c.uin,
                    input: c.input
                }
            }
        },
        mf_IsActivate: function(d) {
            var c = this._nav_set;
            if (this._active_nav_index.between(0, c.length)) {
                return (d == c[this._active_nav_index].uin)
            } else {
                return false
            }
        },
        mf_FocusInput: function() {
            var c = this._nav_set;
            if (this._active_nav_index.between(0, c.length)) {
                if (this._owner.isShowing()) {
                    c[this._active_nav_index].input.focus()
                }
            }
        },
        mf_BlurInput: function() {
            var c = this._nav_set;
            if (this._active_nav_index.between(0, c.length)) {
                c[this._active_nav_index].input.blur()
            }
        },
        mf_activate: function(c, f) {
            if (!f && (c == this._active_nav_index)) {
                return
            }
            var d = this._nav_set;
            if (!c.between(0, d.length)) {
                return
            }
            var e;
            if (this._active_nav_index.between(0, d.length) && (this._active_nav_index != c)) {
                e = d[this._active_nav_index];
                e.nav.className = "middle-one-nm middle-one-nm-n";
                e.input.blur();
                a.setStyle(e.history, "display", "none");
                a.setStyle(e.input, "display", "none")
            }
            e = d[c];
            e.nav.className = "middle-one-at";
            a.setStyle(e.history, "display", "block");
            a.setStyle(e.input, "display", "block");
            this._owner.mf_setTitle(d[c].uin, d[c].nick);
            this._active_nav_index = c;
            this._owner.mf_SyncHistoryScroll();
            this.mf_FocusInput()
        },
        mf_notifyTab: function(c) {
            var d = this._nav_set,
            e;
            if (c.between(0, d.length) && (this._active_nav_index != c)) {
                e = d[c];
                e.nav.className = "middle-one-gm middle-one-gm-n"
            }
        },
        mf_updateHistory: function(c) {
            var q = this._uin_2_nav[c];
            if (!q) {
                return
            }
            var g = this._qqclient.bdylist.allClasses[c] || this._qqclient.bdylist.allUsers[c];
            if (!g) {
                return
            }
            var n = g.history._history_list,
            o, p, f;
            for (var h = q.history_pos,
            m = n.length; h < m; h++) {
                o = document.createElement("div");
                p = document.createElement("p");
                p.className = n[h]._title.style;
                p.innerHTML = n[h]._title.msg;
                o.appendChild(p);
                f = document.createElement("P");
                f.className = n[h]._content.style;
                f.innerHTML = n[h]._content.msg;
                o.appendChild(f);
                q.history.appendChild(o);
                var l = n[h]._content.msg.match(/<img id='[^'<\r\n]{10,}'/gi) || [],
                k = String("<img id='").length,
                d = this._qqclient.bdylist.allClasses[c] ? this._qqclient: g;
                for (var e = 0; e < l.length; e++) {
                    d.tmp_pic_ref.push(l[e].substr(k, l[e].length - k - 1))
                }
            }
            q.history_pos = n.length;
            var r = this;
            window.setTimeout(function() {
                r._owner.mf_SyncHistoryScroll()
            },
            0)
        },
        mf_clearHistory: function(d) {
            var c = this._uin_2_nav[d];
            if (!c) {
                return
            }
            c.history.innerHTML = "";
            c.history_pos = 0
        },
        mf_OnMouseOver: function(e) {
            var f = b.fromEle(e);
            if (!f) {
                return
            }
            var c = this.mf_getIndex(f),
            d = this._nav_set;
            if (!c.between(0, d.length)) {
                return
            }
            f = d[c].nav;
            if (a.hasClass(f, "middle-one-at")) {
                return
            } else {
                if (a.hasClass(f, "middle-one-gm")) {
                    f.className = "middle-one-gm middle-one-gm-a"
                } else {
                    f.className = "middle-one-nm middle-one-nm-a"
                }
            }
        },
        mf_OnMouseOut: function(e) {
            var f = b.fromEle(e);
            if (!f) {
                return
            }
            var c = this.mf_getIndex(f),
            d = this._nav_set;
            if (!c.between(0, d.length)) {
                return
            }
            f = d[c].nav;
            if (a.hasClass(f, "middle-one-at")) {
                return
            } else {
                if (a.hasClass(f, "middle-one-gm")) {
                    f.className = "middle-one-gm middle-one-gm-n"
                } else {
                    f.className = "middle-one-nm middle-one-nm-n"
                }
            }
        },
        mf_OnClick: function(c) {
            var d = b.fromEle(c);
            if (!d) {
                return
            }
            this.mf_activate(this.mf_getIndex(d))
        },
        mf_OnClose: function(g) {
            var h = b.fromEle(g);
            if (!h) {
                return
            }
            var f = this.mf_getIndex(h);
            this.mf_remove(f);
            var c = this._nav_set.length;
            if (c == 0) {
                this._active_nav_index = -1;
                var e = this._owner;
                e.mf_HideWindow();
                setTimeout(function() {
                    e.mf_CloseWindow()
                },
                10);
                return
            }
            if (this._active_nav_index > f) {
                var d = this._active_nav_index - 1;
                d = Math.max(0, d);
                this.mf_activate(d, true)
            } else {
                if (this._active_nav_index == f) {
                    var d = this._active_nav_index;
                    d = Math.min((c - 1), d);
                    this.mf_activate(d, true)
                }
            }
        },
        mf_getIndex: function(g) {
            var j = this._tabParent;
            if (a.isAncestor(j, g)) {
                var h, f = null,
                e = this._nav_set;
                for (var d = 0,
                c = e.length; d < c; d++) {
                    h = e[d].nav;
                    if ((g == h) || a.isAncestor(h, g)) {
                        return d
                    }
                }
            }
            return - 1
        },
        destroy: function() {
            while (this._nav_set.length > 0) {
                this.mf_remove(this._nav_set.length - 1)
            }
            this._owner = null;
            this._qqclient = null;
            this._tabs_manage = null;
            this._tabParent = null;
            this._historyParent = null;
            this._inputParent = null;
            this._uin_2_nav = null;
            this._nav_set = [];
            this._active_nav_index = -1
        },
        toString: function() {
            return "WEBQQ.cls.TabNav " + this._id
        }
    }
})(); (function() {
    var a = YAHOO.util.Dom,
    b = YAHOO.util.Event;
    WEBQQ.cls.TabsManage = function(d, c) {
        this._owner = d;
        this._uin2container = {};
        this._max_index = 0;
        this._magnetState = 1;
        this._objContainer = {};
        this._qqclient = WEBQQ.obj.QQClient;
        this._taskBar = WEBQQ.cls.Taskbar.getInstance();
        this._actTalkWin = null
    };
    WEBQQ.cls.TabsManage.prototype = {
        _owner: null,
        _uin2container: {},
        _max_z: 100,
        _max_index: 0,
        _objContainer: {},
        _qqclient: null,
        _taskBar: null,
        _actTalkWin: null,
        _win_count: 0,
        mf_unreg: function(c) {
            delete this._objContainer[c._id];
            this._objContainer[c._id] = null;
            for (var d in this._uin2container) {
                if (this._uin2container[d] == c) {
                    this._uin2container[d] = null;
                    break
                }
            }
            c.destroy()
        },
        mf_notify_recv: function(d) {
            var c = this._uin2container[d];
            if (!c) {
                return
            }
            var e = c._talkTabs;
            if (c == this._actTalkWin) {
                if (!this._taskBar.mf_IsActivate(c)) {
                    this._taskBar.mf_update_sta(c, this._taskBar.UPDATE_TYPE.notify)
                }
                if (e && e._uin_2_nav && !e._uin_2_nav[d]) {
                    return
                }
                e.mf_notifyTab(e.mf_getIndex(e._uin_2_nav[d].nav))
            } else {
                this._qqclient.addNotify(d)
            }
            e.mf_updateHistory(d)
        },
        MAX_FRIENDS: 1,
        mf_act_create: function(e, c, i, g) {
            var d = this._uin2container[e];
            if (!d) {
                if (!g) {
                    for (var f in this._objContainer) {
                        if (this._objContainer[f] && this._objContainer[f]._talkTabs._nav_set.length < this.MAX_FRIENDS) {
                            d = this._objContainer[f];
                            this._uin2container[e] = d;
                            if (!this._taskBar.mf_IsActivate(d)) {
                                d.mf_onActivate()
                            }
                            if (!i) {
                                d.mf_ShowWindow();
                                this._qqclient.removeNotify(e)
                            }
                            if (d._talkTabs) {
                                d._talkTabs.mf_add(e, c);
                                d._talkTabs.mf_updateHistory(e)
                            }
                            return
                        }
                    }
                }
                d = new WEBQQ.cls.TabWin("group" + this._max_index++, {
                    tabs_manage: this,
                    uin: e,
                    auto: i
                },
                false);
                this._win_count++;
                this._objContainer[d._id] = d;
                this._uin2container[e] = d;
                if (!i) {
                    d.mf_ShowWindow();
                    this._qqclient.removeNotify(e)
                }
                if (d._talkTabs) {
                    d._talkTabs.mf_add(e, c);
                    d._talkTabs.mf_updateHistory(e)
                }
                return
            }
            var h = d._talkTabs;
            if (!h._uin_2_nav[e]) {
                return
            }
            h.mf_activate(h.mf_getIndex(h._uin_2_nav[e].nav), true);
            if (!this._taskBar.mf_IsActivate(d)) {
                d.mf_ShowWindow()
            }
        },
        mf_act_create_class: function(f, c, j, h) {
            var e = this._uin2container[f];
            if (!e) {
                if (!h) {
                    for (var g in this._objContainer) {
                        if (this._objContainer[g] && this._objContainer[g]._talkTabs._nav_set.length < this.MAX_FRIENDS) {
                            e = this._objContainer[g];
                            this._uin2container[f] = e;
                            if (!this._taskBar.mf_IsActivate(e)) {
                                e.mf_onActivate()
                            }
                            if (!j) {
                                e.mf_ShowWindow();
                                this._qqclient.removeNotify(f)
                            }
                            e._talkTabs.mf_add(f, c);
                            e._talkTabs.mf_updateHistory(f);
                            return
                        }
                    }
                }
                var d = this._qqclient.bdylist.allClasses[f];
                if (d) {
                    e = new WEBQQ.cls.TabWin("group" + this._max_index++, {
                        tabs_manage: this,
                        uin: f,
                        auto: j
                    },
                    d);
                    this._win_count++;
                    this._objContainer[e._id] = e;
                    this._uin2container[f] = e;
                    e._talkTabs.mf_add(f, c);
                    e._talkTabs.mf_updateHistory(f);
                    if (!j) {
                        e.mf_ShowWindow();
                        this._qqclient.removeNotify(f)
                    }
                }
                return
            }
            var i = e._talkTabs;
            if (!i._uin_2_nav[f]) {
                return
            }
            i.mf_activate(i.mf_getIndex(i._uin_2_nav[f].nav), true);
            if (!this._taskBar.mf_IsActivate(e)) {
                e.mf_ShowWindow()
            }
        },
        mf_SwcPrevWindow: function() {
            var e = null,
            c = null;
            if (this._actTalkWin) {
                c = a.getLastChildBy(this._taskBar._chat_area_ref,
                function(f) {
                    return (f.tagName.toUpperCase() == "A")
                });
                c = a.getPreviousSiblingBy(this._taskBar._chat_tasks[this._actTalkWin.uin].eleRef,
                function(f) {
                    return (f.tagName.toUpperCase() == "A")
                }) || c
            } else {
                c = a.getFirstChildBy(this._taskBar._chat_area_ref,
                function(f) {
                    return (f.tagName.toUpperCase() == "A")
                })
            }
            if (c) {
                var d = String(c.id).split("_tf");
                e = this._objContainer[d[0]]
            }
            if (e && (e != this._actTalkWin)) {
                e.mf_ShowWindow();
                this._qqclient.removeNotify(e.uin)
            }
        },
        mf_SwcNextWindow: function() {
            var e = null,
            c = null;
            if (this._actTalkWin) {
                c = a.getFirstChildBy(this._taskBar._chat_area_ref,
                function(f) {
                    return (f.tagName.toUpperCase() == "A")
                });
                c = a.getNextSiblingBy(this._taskBar._chat_tasks[this._actTalkWin.uin].eleRef,
                function(f) {
                    return (f.tagName.toUpperCase() == "A")
                }) || c
            } else {
                c = a.getFirstChildBy(this._taskBar._chat_area_ref,
                function(f) {
                    return (f.tagName.toUpperCase() == "A")
                })
            }
            if (c) {
                var d = String(c.id).split("_tf");
                e = this._objContainer[d[0]]
            }
            if (e && (e != this._actTalkWin)) {
                e.mf_ShowWindow();
                this._qqclient.removeNotify(e.uin)
            }
        },
        minAllChatbox: function() {
            for (var c in this._objContainer) {
                if (this._objContainer[c]) {
                    this._objContainer[c].mf_HideWindow()
                }
            }
        },
        closeAllChatbox: function() {
            for (var c in this._objContainer) {
                if (this._objContainer[c]) {
                    this._objContainer[c].mf_CloseWindow()
                }
            }
            this._taskBar._left_prev_ref.className = "nlarrow";
            this._taskBar._right_next_ref.className = "nrarrow"
        },
        destroy: function() {
            for (var c in this._objContainer) {
                if (this._objContainer[c]) {
                    this._objContainer[c].destroy()
                }
            }
            this._objContainer = {};
            this._uin2container = {};
            this._max_index = 0
        },
        toString: function() {
            return "WEBQQ.cls.TabsManage"
        }
    }
})(); (function() {
    WEBQQ.namespace("WEBQQ.cls");
    WEBQQ.cls.Indicator = function(b) {
        if (typeof(b) !== "string") {
            throw new Error("WEBQQ.cls.Indicator call failed, the parameter(" + b + ")'s type is not string!")
        }
        this._id = "indicator_" + b;
        this._id_pre = this._id + "_";
        var c = document.createElement("DIV");
        c.id = this._id;
        c.className = "indicator";
        c.style.visibility = "hidden";
        c.innerHTML = '<span class="indicator-loding"></span>';
        document.body.appendChild(c);
        this._eleRef = c;
        var a = {};
        a.visible = false;
        a.modal = true;
        a.draggable = false;
        a.close = false;
        a.fixedcenter = true;
        WEBQQ.cls.Indicator.superclass.constructor.call(this, this._id, a)
    };
    WEBQQ.cls.Indicator.getInstance = function() {
        if (!WEBQQ.cls.Indicator.prototype.instance) {
            WEBQQ.cls.Indicator.prototype.instance = new WEBQQ.cls.Indicator("login")
        }
        return WEBQQ.cls.Indicator.prototype.instance
    };
    YAHOO.extend(WEBQQ.cls.Indicator, YAHOO.widget.Panel, {
        _id_pre: "",
        _id: "",
        _eleRef: null,
        instance: null,
        init: function(b, a) {
            WEBQQ.cls.Indicator.superclass.init.call(this, b, a);
            this.mf_InitComponent()
        },
        mf_InitComponent: function() {
            this.mf_UpdateWindow()
        },
        mf_setPrompt: function(a) {
            this._eleRef.childNodes[0].innerHTML = a
        },
        mf_UpdateWindow: function() {
            this.render()
        },
        mf_ShowWindow: function() {
            this.bringToTop();
            this.show()
        },
        mf_HideWindow: function() {
            this.hide()
        },
        toString: function() {
            return "WEBQQ.cls.Indicator " + this._id
        }
    })
})(); (function() {
    var a = YAHOO.util.Dom,
    b = YAHOO.util.Event;
    WEBQQ.namespace("WEBQQ.cls");
    WEBQQ.cls.LoginDialog = function(d) {
        if (typeof(d) !== "string") {
            throw new Error("WEBQQ.cls.LoginDialog call failed, the parameter(" + d + ")'s type is not string!")
        }
        this._id = "login_" + d;
        this._id_pre = this._id + "_";
        var c = document.createElement("DIV");
        c.id = this._id;
        c.className = "signin";
        c.style.display = "none";
        c.style.visibility = "hidden";
        c.innerHTML = '<iframe name="login_frame" frameborder="0" scrolling="none" width="100%" height="100%" src="">';
        document.body.appendChild(c);
        this._eleRef = c;
        this._login_call_back = null;
        this.init()
    };
    WEBQQ.cls.LoginDialog.getInstance = function() {
        if (!WEBQQ.cls.LoginDialog.prototype.instance) {
            WEBQQ.cls.LoginDialog.prototype.instance = new WEBQQ.cls.LoginDialog("signin")
        }
        return WEBQQ.cls.LoginDialog.prototype.instance
    };
    WEBQQ.cls.LoginDialog.prototype = {
        _id_pre: "",
        _id: "",
        _eleRef: null,
        _login_call_back: null,
        instance: null,
        init: function(d, c) {
            a.setStyle(this._eleRef, "position", "absolute");
            a.setStyle(this._eleRef, "overflow", "hidden")
        },
        mf_SetFrameUrl: function() {
            this._eleRef.childNodes[0].src = ptlogin_server_domain + "/cgi-bin/login?style=2&appid=1002101&s_url=" + webapp_server_domain + "/&f_url=loginerroralert"
        },
        mf_UpdateWindow: function() {
            var c = (a.getViewportWidth() - parseInt(a.getStyle(this._eleRef, "width"))) / 2;
            var d = (a.getViewportHeight() - parseInt(a.getStyle(this._eleRef, "height"))) / 3;
            a.setStyle(this._eleRef, "left", c + "px");
            a.setStyle(this._eleRef, "top", d + "px")
        },
        mf_ShowWindow: function() {
            a.setStyle(this._eleRef, "visibility", "visible");
            this.mf_UpdateWindow()
        },
        mf_HideWindow: function() {
            a.setStyle(this._eleRef, "visibility", "hidden")
        },
        mf_setCallback: function(c) {
            this._login_call_back = c || null
        },
        toString: function() {
            return "WEBQQ.cls.LoginDialog " + this._id
        }
    }
})(); (function() {
    var a = YAHOO.util.Dom,
    b = YAHOO.util.Event;
    WEBQQ.cls.Marquee = function(c) {
        this.speed = c.speed || 40;
        this.stopTime = c.stopTime || 3000;
        this.lineHeight = c.lineHeight || 24;
        this.isScrollOneLine = typeof c.isScrollOneLine == "undefined" ? true: c.isScrollOneLine;
        this.current_speed = this.speed;
        this.div = c.div || null;
        this.div1 = c.div1 || null;
        this.div2 = null;
        this.timer = null
    };
    WEBQQ.cls.Marquee.prototype = {
        init: function() {
            b.on(this.div, "mouseover", this.onmouseoverHandle, this, true);
            b.on(this.div, "mouseout", this.onmouseoutHandle, this, true);
            this.update()
        },
        update: function() {
            if (this.timer) {
                clearTimeout(this.timer)
            }
            this.div2 = document.getElementById(this.div.id + "_copy");
            if (!this.div2) {
                this.div2 = document.createElement("div");
                this.div2.id = this.div.id + "_copy";
                this.div.appendChild(this.div2)
            }
            this.div2.innerHTML = this.div1.innerHTML;
            if (this.isScrollOneLine || this.div1.offsetHeight > this.lineHeight) {
                var c = this;
                this.timer = setTimeout(function() {
                    c.marqueeGo()
                },
                this.current_speed)
            } else {
                this.div.scrollTop = 0
            }
        },
        marqueeGo: function() {
            if (this.div1.offsetHeight <= this.div.scrollTop) {
                this.div.scrollTop -= this.div1.offsetHeight
            } else {
                this.div.scrollTop++;
                if (this.div.scrollTop % this.lineHeight == 0) {
                    this.current_speed = this.stopTime
                } else {
                    this.current_speed = this.speed
                }
            }
            var c = this;
            this.timer = setTimeout(function() {
                c.marqueeGo()
            },
            this.current_speed)
        },
        onmouseoverHandle: function() {
            if (this.timer) {
                clearTimeout(this.timer)
            }
        },
        onmouseoutHandle: function() {
            if (this.isScrollOneLine || this.div1.offsetHeight > this.lineHeight) {
                var c = this;
                this.timer = setTimeout(function() {
                    c.marqueeGo()
                },
                this.current_speed)
            }
        }
    }
})();
YAHOO.util.Event.onDOMReady(function() {
    var e = YAHOO.util.Dom,
    d = YAHOO.util.Event,
    b = WEBQQ.obj.QQClient,
    a = e.get("modifyPortraitContainter");
    if (YAHOO.util.DD) {
        var f = new YAHOO.util.DD(e.get("modifyPortraitContainter"));
        f.setHandleElId("modifyPortraitContainterTitlebar");
        f.setHandleElId("modifyPortraitContainterButtonBar")
    }
    d.on(e.get("changePortrait"), "click",
    function() {
        if (!WEBQQ.obj.modifyPortrait.initialed) {
            WEBQQ.obj.modifyPortrait.init()
        }
        g()
    });
    d.on(e.get("modifyPortraitCloseButton"), "click",
    function() {
        var h = WEBQQ.obj.modifyPortrait;
        h._clearFile();
        h._clearStatus();
        c()
    });
    d.on(e.get("cancelModification"), "click",
    function() {
        var h = WEBQQ.obj.modifyPortrait;
        h._clearFile();
        h._clearStatus();
        c()
    });
    e.get("modifyPortraitClientKey").value = b.clientKey;
    function c() {
        a.style.display = "none"
    }
    function g() {
        a.style.display = "block"
    }
    WEBQQ.obj.modifyPortrait = {
        isReady: false,
        initialed: false,
        uploadingToServer: false,
        uploadedToBuffer: false,
        sign: 0,
        priviledgeToUploadCustomer: false,
        iframe: null,
        avatar: 0,
        bufferUrl: "",
        timeOfLastSignGot: 0,
        timer: null,
        _type: 1,
        _isSignExpired: function() {
            return (new Date()).getTime() - this.timeOfLastSignGot >= 120 * 60 * 60 * 1000
        },
        uploadToServer: function() {
            var h = YAHOO.util.Dom;
            if (this.uploadedToBuffer && !this._isSignExpired()) {
                h.get("modifyPortraitCase").value = 2;
                h.get("modifyPortraitUrl").value = this.bufferUrl;
                h.get("portraitValue").setAttribute("disabled", "true");
                var i = h.get("formUploadPortrait");
                i.submit()
            } else {
                h.get("portraitValue").removeAttribute("disabled");
                h.get("modifyPortraitCase").value = 3;
                var i = h.get("formUploadPortrait");
                i.enctype = "multipart/form-data";
                this.uploadingToServer = true;
                i.submit()
            }
        },
        _updatePortrait: function(h) {
            e.get("Main_mainwindow_my_avatar_img").src = h;
            e.get("BuddyDetails_avatar").src = h;
            e.get("portraint-1").src = h
        },
        uploadToBuffer: function() {
            var h = this;
            e.get("portraitValue").style.width = "10px";
            if (!this.isReady || this._isSignExpired()) {
                this.isReady = false;
                timer = setTimeout(function() {
                    h.uploadToBuffer.call(h)
                },
                2000);
                this._getSign();
                alert(" 过期//@DELETE");
                return
            } else {
                if (h.timer) {
                    clearTimeout(h.timer)
                }
                e.get("modifyPortraitCase").value = 1;
                var i = e.get("formUploadPortrait");
                i.enctype = "multipart/form-data";
                i.submit()
            }
        },
        _getSign: function() {
            this.isReady = false;
            var h = this;
            b.getCmdInfo({
                onSuccess: function(i) {
                    h.sign = i.params[6];
                    h.priviledgeToUploadCustomer = (i.params[5] == 1);
                    e.get("sign").value = h.sign;
                    h.isReady = true
                },
                onFail: function() {
                    alert("获取验证码失败！")
                },
                sscope: h,
                fscope: h,
                arguments: {},
                cmd: "6d",
                body: b.cs.cs0x6d(1)
            })
        },
        getPortraitType: function() {
            if (this._type == 1) {
                return "system"
            }
            if (this._type == 2) {
                return "customer"
            }
            return "none"
        },
        changePortraitType: function(h) {
            if (h == "system") {
                this._type = 1
            } else {
                if (h == "customer") {
                    this._type = 2
                } else {
                    this._type = 0
                }
            }
        },
        _initPortraitImageHandler: function() {
            var k = YAHOO.util.Dom;
            var j = YAHOO.util.Event;
            var l = k.getElementsByClassName("portraitItem");
            var i = document.getElementsByTagName("a");
            var h = this;
            j.on(l, "click",
            function(m) {
                k.get("portraitPreview").src = this.getElementsByTagName("img")[0].src;
                h.avatar = Number(this.getElementsByTagName("img")[0].id.substr(9));
                if (h.avatar == "-1") {
                    h.changePortraitType("none")
                } else {
                    h.changePortraitType("system")
                }
                j.stopEvent(m)
            });
            j.on(k.get("confirmModification"), "click",
            function(n) {
                var m = h.getPortraitType();
                if (m == "none") {
                    h._clearStatus();
                    h._clearFile()
                } else {
                    if (m == "system") {
                        h._submitPortrait("system");
                        h._clearFile()
                    } else {
                        h.uploadToServer()
                    }
                }
                c()
            });
            h._bindFileEvent()
        },
        _clearStatus: function() {
            this.uploadingToServer = false;
            this.uploadedToBuffer = false;
            this._enableUpload()
        },
        _clearFile: function() {
            var h = WEBQQ.obj.modifyPortrait;
            var i = e.get("portraitValue");
            i.outerHTML = i.outerHTML;
            i.value = "";
            h._bindFileEvent()
        },
        _iframeOnLoad: function(i) {
            if (!i) {
                i = 1
            }
            var h = WEBQQ.obj.modifyPortrait;
            i = i.trim();
            if (h.uploadedToBuffer) {
                if (i != "0") {
                    alert("头像更新失败!")
                } else {
                    alert("头像更新成功!");
                    if (!h.uploadingToServer) {
                        h._updatePortrait(h.bufferUrl + "&" + (new Date()).getTime())
                    } else {
                        h.uploadingToServer = false;
                        h._updatePortrait("http://qun.qq.com/cgi/svr/face/getface?type=1&uin=" + b.uin + "&cache=1")
                    }
                }
                if (h._isSignExpired()) {
                    h._getSign();
                    h.uploadedToBuffer = false
                }
                e.get("portraitValue").removeAttribute("disabled");
                h._clearStatus();
                h._clearFile()
            } else {
                h._enableUpload();
                if (i == 1) {
                    h.uploadedToBuffer = false;
                    alert("预览生成失败！请检查文件类型及大小(*.jpg,*.bmp,*.gif <20K)")
                } else {
                    h.uploadedToBuffer = true;
                    h.bufferUrl = i;
                    e.get("portraitPreview").src = i + "&" + (new Date()).getTime()
                }
            }
        },
        _submitPortrait: function(k, m) {
            if (k == "none") {
                return
            } else {
                if (k == "customer") {} else {
                    var h = this;
                    var i = Math.ceil(Number(this.avatar) - 1) * 3;
                    var l = {
                        onSuccess: function(n) {
                            h._updatePortrait("heads/" + n.avatar + ".png");
                            h._clearStatus();
                            h._clearFile()
                        },
                        onFail: function() {
                            alert("头像设置失败");
                            h._clearStatus();
                            h._clearFile()
                        },
                        sscope: h,
                        fscope: h,
                        arguments: {
                            avatar: h.avatar
                        }
                    };
                    var j = {
                        onSuccess: function() {
                            var n = b.parseUserDetails(b.orig_info);
                            n.avatar = String(Math.ceil(Number(this.avatar) - 1) * 3);
                            b.submitMyDetails(l, n)
                        },
                        onFail: function(n) {
                            alert("修改头像失败")
                        },
                        sscope: h,
                        fscope: h,
                        arguments: {},
                        cmd: "0125",
                        body: b.cs.cs0x0125(b.uin)
                    };
                    b.getCmdInfo(j)
                }
            }
        },
        _disableUpload: function() {
            e.get("portraitValue").setAttribute("disabled", "");
            e.get("btnUploadPortrait").className = "disable";
            e.get("formUploadPortrait").style.display = "none"
        },
        _enableUpload: function() {
            e.get("btnUploadPortrait").innerHTML = "选择图片";
            e.get("btnUploadPortrait").className = "";
            e.get("formUploadPortrait").style.display = "block";
            e.get("portraitValue").removeAttribute("disabled")
        },
        _bindFileEvent: function() {
            var h = WEBQQ.obj.modifyPortrait;
            var i = e.get("portraitValue");
            d.removeListener(i);
            d.on(e.get("portraitValue"), "change",
            function() {
                alert("teset");
                h.uploadedToBuffer = false;
                e.get("btnUploadPortrait").innerHTML = "预览中...";
                h.changePortraitType("customer");
                h.uploadToBuffer();
                h._disableUpload()
            })
        },
        init: function() {
            var h = this;
            if (!h.isReady) {
                this.timeOfLastSignGot = (new Date()).getTime();
                this._getSign();
                setTimeout(function() {
                    h.init.call(h)
                },
                1500);
                return
            }
            if (!this.priviledgeToUploadCustomer) {
                h._disableUpload()
            }
            e.get("portraitSelector").style.display = "block";
            this.iframe = e.get("modifyPortraitIframe");
            e.get("clientuinInput").value = b.uin;
            this.initialed = true;
            var o = this.data;
            var p = '<div class="f-clear portraitGroup">';
            p += '<h3 class="f-clear portraitListTitle">当前使用的头像</h3>';
            p += '<div class="f-clear portraitList">';
            p += '<a class="f-clear portraitItem" href="#"><img src="http://qun.qq.com/cgi/svr/face/getface?type=1&cache=1&uin=' + b.uin + "&r" + (new Date()).getTime() + '" id="portraint-1" alt="头像" title="当前使用头像" /></a>';
            p += "</div></div>";
            var n = o.length;
            for (var m = 0; m < n; ++m) {
                p += '<div class="f-clear portraitGroup">';
                p += '<h3 class="f-clear portraitListTitle">' + o[m].groupName + "(共 " + o[m].data.length + " 个)</h3>";
                p += '<div class="f-clear portraitList">';
                var k = o[m].data;
                for (var l = 0; l < k.length; ++l) {
                    p += '<a class="f-clear portraitItem" href="#"><img src="' + k[l].url + '" id="portraint' + k[l].value + '" alt="头像" title="' + k[l].title + '" /></a>'
                }
                p += "</div></div>"
            }
            document.getElementById("portraitLists").innerHTML = p;
            this._initPortraitImageHandler()
        },
        data: [{
            groupName: "推荐头像",
            data: [{
                title: "174",
                url: "heads/174.png",
                value: "174"
            },
            {
                title: "175",
                url: "heads/175.png",
                value: "175"
            },
            {
                title: "176",
                url: "heads/176.png",
                value: "176"
            },
            {
                title: "177",
                url: "heads/177.png",
                value: "177"
            },
            {
                title: "178",
                url: "heads/178.png",
                value: "178"
            },
            {
                title: "179",
                url: "heads/179.png",
                value: "179"
            },
            {
                title: "180",
                url: "heads/180.png",
                value: "180"
            },
            {
                title: "181",
                url: "heads/181.png",
                value: "181"
            },
            {
                title: "182",
                url: "heads/182.png",
                value: "182"
            },
            {
                title: "183",
                url: "heads/183.png",
                value: "183"
            },
            {
                title: "184",
                url: "heads/184.png",
                value: "184"
            },
            {
                title: "185",
                url: "heads/185.png",
                value: "185"
            },
            {
                title: "186",
                url: "heads/186.png",
                value: "186"
            },
            {
                title: "187",
                url: "heads/187.png",
                value: "187"
            },
            {
                title: "188",
                url: "heads/188.png",
                value: "188"
            },
            {
                title: "189",
                url: "heads/189.png",
                value: "189"
            },
            {
                title: "190",
                url: "heads/190.png",
                value: "190"
            },
            {
                title: "191",
                url: "heads/191.png",
                value: "191"
            },
            {
                title: "192",
                url: "heads/192.png",
                value: "192"
            },
            {
                title: "193",
                url: "heads/193.png",
                value: "193"
            },
            {
                title: "194",
                url: "heads/194.png",
                value: "194"
            },
            {
                title: "195",
                url: "heads/195.png",
                value: "195"
            },
            {
                title: "196",
                url: "heads/196.png",
                value: "196"
            },
            {
                title: "197",
                url: "heads/197.png",
                value: "197"
            },
            {
                title: "198",
                url: "heads/198.png",
                value: "198"
            },
            {
                title: "199",
                url: "heads/199.png",
                value: "199"
            },
            {
                title: "200",
                url: "heads/200.png",
                value: "200"
            },
            {
                title: "201",
                url: "heads/201.png",
                value: "201"
            }]
        },
        {
            groupName: "男性头像",
            data: [{
                title: "5",
                url: "heads/5.png",
                value: "5"
            },
            {
                title: "7",
                url: "heads/7.png",
                value: "7"
            },
            {
                title: "10",
                url: "heads/10.png",
                value: "10"
            },
            {
                title: "14",
                url: "heads/14.png",
                value: "14"
            },
            {
                title: "15",
                url: "heads/15.png",
                value: "15"
            },
            {
                title: "16",
                url: "heads/16.png",
                value: "16"
            },
            {
                title: "27",
                url: "heads/27.png",
                value: "27"
            },
            {
                title: "28",
                url: "heads/28.png",
                value: "28"
            },
            {
                title: "36",
                url: "heads/36.png",
                value: "36"
            },
            {
                title: "37",
                url: "heads/37.png",
                value: "37"
            },
            {
                title: "43",
                url: "heads/43.png",
                value: "43"
            },
            {
                title: "44",
                url: "heads/44.png",
                value: "44"
            },
            {
                title: "46",
                url: "heads/46.png",
                value: "46"
            },
            {
                title: "50",
                url: "heads/50.png",
                value: "50"
            },
            {
                title: "52",
                url: "heads/52.png",
                value: "52"
            },
            {
                title: "53",
                url: "heads/53.png",
                value: "53"
            },
            {
                title: "54",
                url: "heads/54.png",
                value: "54"
            },
            {
                title: "60",
                url: "heads/60.png",
                value: "60"
            },
            {
                title: "61",
                url: "heads/61.png",
                value: "61"
            },
            {
                title: "63",
                url: "heads/63.png",
                value: "63"
            },
            {
                title: "68",
                url: "heads/68.png",
                value: "68"
            },
            {
                title: "72",
                url: "heads/72.png",
                value: "72"
            },
            {
                title: "74",
                url: "heads/74.png",
                value: "74"
            },
            {
                title: "77",
                url: "heads/77.png",
                value: "77"
            },
            {
                title: "79",
                url: "heads/79.png",
                value: "79"
            },
            {
                title: "80",
                url: "heads/80.png",
                value: "80"
            },
            {
                title: "72",
                url: "heads/72.png",
                value: "72"
            },
            {
                title: "85",
                url: "heads/85.png",
                value: "85"
            },
            {
                title: "94",
                url: "heads/94.png",
                value: "94"
            },
            {
                title: "95",
                url: "heads/95.png",
                value: "95"
            }]
        },
        {
            groupName: "女性头像",
            data: [{
                title: "6",
                url: "heads/6.png",
                value: "6"
            },
            {
                title: "9",
                url: "heads/9.png",
                value: "9"
            },
            {
                title: "12",
                url: "heads/12.png",
                value: "12"
            },
            {
                title: "20",
                url: "heads/20.png",
                value: "20"
            },
            {
                title: "29",
                url: "heads/29.png",
                value: "29"
            },
            {
                title: "30",
                url: "heads/30.png",
                value: "30"
            },
            {
                title: "34",
                url: "heads/34.png",
                value: "34"
            },
            {
                title: "38",
                url: "heads/38.png",
                value: "38"
            },
            {
                title: "40",
                url: "heads/40.png",
                value: "40"
            },
            {
                title: "45",
                url: "heads/45.png",
                value: "45"
            },
            {
                title: "47",
                url: "heads/47.png",
                value: "47"
            },
            {
                title: "49",
                url: "heads/49.png",
                value: "49"
            },
            {
                title: "51",
                url: "heads/51.png",
                value: "51"
            },
            {
                title: "55",
                url: "heads/55.png",
                value: "55"
            },
            {
                title: "57",
                url: "heads/57.png",
                value: "57"
            },
            {
                title: "58",
                url: "heads/58.png",
                value: "58"
            },
            {
                title: "62",
                url: "heads/62.png",
                value: "62"
            },
            {
                title: "67",
                url: "heads/67.png",
                value: "67"
            },
            {
                title: "70",
                url: "heads/70.png",
                value: "70"
            },
            {
                title: "75",
                url: "heads/75.png",
                value: "75"
            },
            {
                title: "78",
                url: "heads/78.png",
                value: "78"
            },
            {
                title: "81",
                url: "heads/81.png",
                value: "81"
            },
            {
                title: "83",
                url: "heads/83.png",
                value: "83"
            },
            {
                title: "84",
                url: "heads/84.png",
                value: "84"
            },
            {
                title: "86",
                url: "heads/86.png",
                value: "86"
            },
            {
                title: "87",
                url: "heads/87.png",
                value: "87"
            },
            {
                title: "88",
                url: "heads/88.png",
                value: "88"
            },
            {
                title: "89",
                url: "heads/89.png",
                value: "89"
            },
            {
                title: "90",
                url: "heads/90.png",
                value: "90"
            }]
        },
        {
            groupName: "宠物头像",
            data: [{
                title: "1",
                url: "heads/1.png",
                value: "1"
            },
            {
                title: "2",
                url: "heads/2.png",
                value: "2"
            },
            {
                title: "3",
                url: "heads/3.png",
                value: "3"
            },
            {
                title: "4",
                url: "heads/4.png",
                value: "4"
            },
            {
                title: "8",
                url: "heads/8.png",
                value: "8"
            },
            {
                title: "11",
                url: "heads/11.png",
                value: "11"
            },
            {
                title: "13",
                url: "heads/13.png",
                value: "13"
            },
            {
                title: "17",
                url: "heads/17.png",
                value: "17"
            },
            {
                title: "18",
                url: "heads/18.png",
                value: "18"
            },
            {
                title: "19",
                url: "heads/19.png",
                value: "19"
            },
            {
                title: "21",
                url: "heads/21.png",
                value: "21"
            },
            {
                title: "22",
                url: "heads/22.png",
                value: "22"
            },
            {
                title: "23",
                url: "heads/23.png",
                value: "23"
            },
            {
                title: "24",
                url: "heads/24.png",
                value: "24"
            },
            {
                title: "25",
                url: "heads/25.png",
                value: "25"
            },
            {
                title: "26",
                url: "heads/26.png",
                value: "26"
            },
            {
                title: "31",
                url: "heads/31.png",
                value: "31"
            },
            {
                title: "32",
                url: "heads/32.png",
                value: "32"
            },
            {
                title: "33",
                url: "heads/33.png",
                value: "33"
            },
            {
                title: "35",
                url: "heads/35.png",
                value: "35"
            },
            {
                title: "39",
                url: "heads/39.png",
                value: "39"
            },
            {
                title: "41",
                url: "heads/41.png",
                value: "41"
            },
            {
                title: "42",
                url: "heads/42.png",
                value: "42"
            },
            {
                title: "48",
                url: "heads/48.png",
                value: "48"
            },
            {
                title: "56",
                url: "heads/56.png",
                value: "56"
            },
            {
                title: "59",
                url: "heads/59.png",
                value: "59"
            },
            {
                title: "64",
                url: "heads/64.png",
                value: "64"
            },
            {
                title: "65",
                url: "heads/65.png",
                value: "65"
            },
            {
                title: "66",
                url: "heads/66.png",
                value: "66"
            },
            {
                title: "69",
                url: "heads/69.png",
                value: "69"
            },
            {
                title: "71",
                url: "heads/71.png",
                value: "71"
            },
            {
                title: "73",
                url: "heads/73.png",
                value: "73"
            },
            {
                title: "76",
                url: "heads/76.png",
                value: "76"
            },
            {
                title: "91",
                url: "heads/91.png",
                value: "91"
            },
            {
                title: "92",
                url: "heads/92.png",
                value: "92"
            },
            {
                title: "93",
                url: "heads/93.png",
                value: "93"
            }]
        },
        {
            groupName: "QQ宠物头像",
            data: [{
                title: "128",
                url: "heads/128.png",
                value: "128"
            },
            {
                title: "129",
                url: "heads/129.png",
                value: "129"
            },
            {
                title: "130",
                url: "heads/130.png",
                value: "130"
            },
            {
                title: "131",
                url: "heads/131.png",
                value: "131"
            },
            {
                title: "132",
                url: "heads/132.png",
                value: "132"
            },
            {
                title: "133",
                url: "heads/133.png",
                value: "133"
            },
            {
                title: "134",
                url: "heads/134.png",
                value: "134"
            }]
        },
        {
            groupName: "QQ飞车头像",
            data: [{
                title: "164",
                url: "heads/164.png",
                value: "164"
            },
            {
                title: "165",
                url: "heads/165.png",
                value: "165"
            },
            {
                title: "166",
                url: "heads/166.png",
                value: "166"
            },
            {
                title: "167",
                url: "heads/167.png",
                value: "167"
            },
            {
                title: "168",
                url: "heads/168.png",
                value: "168"
            }]
        },
        {
            groupName: "地下城与勇士头像",
            data: [{
                title: "147",
                url: "heads/147.png",
                value: "147"
            },
            {
                title: "148",
                url: "heads/148.png",
                value: "148"
            },
            {
                title: "149",
                url: "heads/149.png",
                value: "149"
            },
            {
                title: "150",
                url: "heads/150.png",
                value: "150"
            },
            {
                title: "151",
                url: "heads/151.png",
                value: "151"
            }]
        },
        {
            groupName: "QQ炫舞头像",
            data: [{
                title: "159",
                url: "heads/159.png",
                value: "159"
            },
            {
                title: "160",
                url: "heads/160.png",
                value: "160"
            },
            {
                title: "161",
                url: "heads/161.png",
                value: "161"
            },
            {
                title: "162",
                url: "heads/162.png",
                value: "162"
            },
            {
                title: "163",
                url: "heads/163.png",
                value: "163"
            }]
        },
        {
            groupName: "穿越火线头像",
            data: [{
                title: "135",
                url: "heads/135.png",
                value: "135"
            },
            {
                title: "136",
                url: "heads/136.png",
                value: "136"
            },
            {
                title: "137",
                url: "heads/137.png",
                value: "137"
            },
            {
                title: "138",
                url: "heads/138.png",
                value: "138"
            },
            {
                title: "139",
                url: "heads/139.png",
                value: "139"
            }]
        },
        {
            groupName: "QQ飞车头像",
            data: [{
                title: "152",
                url: "heads/152.png",
                value: "152"
            },
            {
                title: "153",
                url: "heads/153.png",
                value: "153"
            },
            {
                title: "154",
                url: "heads/154.png",
                value: "154"
            },
            {
                title: "155",
                url: "heads/155.png",
                value: "155"
            },
            {
                title: "156",
                url: "heads/156.png",
                value: "156"
            },
            {
                title: "157",
                url: "heads/157.png",
                value: "157"
            },
            {
                title: "158",
                url: "heads/158.png",
                value: "158"
            }]
        },
        {
            groupName: "QQ三国",
            data: [{
                title: "140",
                url: "heads/140.png",
                value: "140"
            },
            {
                title: "141",
                url: "heads/141.png",
                value: "141"
            },
            {
                title: "142",
                url: "heads/142.png",
                value: "142"
            },
            {
                title: "143",
                url: "heads/143.png",
                value: "143"
            },
            {
                title: "144",
                url: "heads/144.png",
                value: "144"
            },
            {
                title: "145",
                url: "heads/145.png",
                value: "145"
            },
            {
                title: "146",
                url: "heads/146.png",
                value: "146"
            }]
        },
        {
            groupName: "QQ音速",
            data: [{
                title: "101",
                url: "heads/101.png",
                value: "101"
            },
            {
                title: "102",
                url: "heads/102.png",
                value: "102"
            },
            {
                title: "103",
                url: "heads/103.png",
                value: "103"
            },
            {
                title: "104",
                url: "heads/104.png",
                value: "104"
            },
            {
                title: "105",
                url: "heads/105.png",
                value: "105"
            }]
        },
        {
            groupName: "QQ幻想",
            data: [{
                title: "113",
                url: "heads/113.png",
                value: "113"
            },
            {
                title: "114",
                url: "heads/114.png",
                value: "114"
            },
            {
                title: "115",
                url: "heads/115.png",
                value: "115"
            },
            {
                title: "116",
                url: "heads/116.png",
                value: "116"
            },
            {
                title: "117",
                url: "heads/117.png",
                value: "117"
            }]
        },
        {
            groupName: "QQ堂",
            data: [{
                title: "96",
                url: "heads/96.png",
                value: "96"
            },
            {
                title: "97",
                url: "heads/97.png",
                value: "97"
            },
            {
                title: "98",
                url: "heads/98.png",
                value: "98"
            },
            {
                title: "99",
                url: "heads/99.png",
                value: "99"
            },
            {
                title: "100",
                url: "heads/100.png",
                value: "100"
            }]
        },
        {
            groupName: "QQ华夏",
            data: [{
                title: "118",
                url: "heads/118.png",
                value: "118"
            },
            {
                title: "119",
                url: "heads/119.png",
                value: "119"
            },
            {
                title: "120",
                url: "heads/120.png",
                value: "120"
            },
            {
                title: "121",
                url: "heads/121.png",
                value: "121"
            },
            {
                title: "122",
                url: "heads/122.png",
                value: "122"
            },
            {
                title: "126",
                url: "heads/126.png",
                value: "126"
            },
            {
                title: "127",
                url: "heads/127.png",
                value: "127"
            }]
        },
        {
            groupName: "QQGame",
            data: [{
                title: "169",
                url: "heads/169.png",
                value: "169"
            },
            {
                title: "170",
                url: "heads/170.png",
                value: "170"
            },
            {
                title: "171",
                url: "heads/171.png",
                value: "171"
            },
            {
                title: "172",
                url: "heads/172.png",
                value: "172"
            },
            {
                title: "173",
                url: "heads/173.png",
                value: "173"
            }]
        }]
    }
});