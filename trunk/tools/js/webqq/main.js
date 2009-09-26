function ssn(c) {
    var d = document.cookie.split("; ");
    for (var b = 0; b < d.length; b++) {
        if (d[b].search(c) > -1) {
            var a = d[b].split("=");
            if (a[0] == c) {
                return a[1]
            }
        }
    }
    return null
} (function() {
    function f(l, m, k, n, j) {
        this.head = {
            uin: l,
            cmd: m,
            seq: k,
            session: n
        };
        this.body = j
    }
    f.TIMEOUT = 30000;
    f.RETRYCNT = 3;
    f.prototype = {
        head: {
            uin: 0,
            cmd: 0,
            seq: 0,
            session: ""
        },
        body: "",
        dwSendTime: 0,
        dwTimeout: 0,
        dwRetryCnt: 1,
        sfn: null,
        sscope: null,
        ffn: null,
        fscope: null,
        option: null,
        setOption: function(j) {
            this.option = j;
            this.dwTimeout = j.timeout || f.TIMEOUT;
            this.dwRetryCnt = j.retrycnt || f.RETRYCNT
        },
        setSendTime: function(j) {
            this.dwSendTime = j
        },
        toString: function() {
            var k = ";";
            var j = [this.head.uin, this.head.cmd, this.head.seq, this.head.session, this.body];
            return j.join(k)
        }
    };
    Transport = {
        cs_seq: 0,
        RELAY_TIME: 500,
        relay_timer: null,
        qqclient: null,
        package_queue: {},
        ready_queue: [],
        init: function(j) {
            this.qqclient = j
        },
        pushPackage: function(j) {
            this.package_queue[j.head.seq] = j
        },
        findPackage: function(j) {
            return this.package_queue[j] || null
        },
        removePackage: function(j) {
            var k = this.package_queue[j] || null;
            if (k && k.head.cmd == "30") {
                YAHOO.log("[" + j + "]=" + k, "warn")
            }
            delete this.package_queue[j];
            return k
        },
        peekPackage: function() {
            var k = null;
            for (var j in this.package_queue) {
                k = this.package_queue[j];
                break
            }
            return k
        },
        shiftPackage: function() {
            var k = null;
            for (var j in this.package_queue) {
                k = this.package_queue[j];
                delete this.package_queue[j];
                break
            }
            return k
        },
        sendPackage: function(j) {
            this.relaySendPackage(j)
        },
        relaySendPackage: function(j) {
            if (!j || !j.head) {
                return
            }
            this.ready_queue.push(j);
            if (this.relay_timer) {
                clearTimeout(this.relay_timer);
                this.relay_timer = null
            }
            var k = this;
            this.relay_timer = setTimeout(function() {
                k.sendMultiPackage()
            },
            k.RELAY_TIME)
        },
        sendMultiPackage: function() {
            this.relay_timer = null;
            var m = this.ready_queue;
            if (m.length <= 0) {
                return
            }
            var o = "\x1d";
            for (var l = 0; l < m.length; l++) {
                m[l].setSendTime(new Date().getTime());
                if (m[l] && m[l].head.cmd != "00") {
                    this.package_queue[m[l].head.seq] = m[l]
                }
            }
            var n = "";
            for (var k in this.package_queue) {
                n += this.package_queue[k]
            }
            YAHOO.log("sendMultiPackage:" + n);
            var j = m.join(o);
            this.ready_queue = [];
            this.qqclient.act_conn.asyncSend("POST", this.qqclient.webqq_proxy_uri, this.qqclient.http_callback, j)
        },
        removeAllPackage: function() {
            this.package_queue = {};
            this.ready_queue = []
        }
    };
    TaskManager = {
        task_queue: [],
        pushTask: function(l, j, k) {
            this.task_queue.push({
                fn: l,
                args: j,
                scope: k
            })
        },
        getTask: function() {
            if (this.task_queue.length > 0) {
                var j = this.task_queue.shift();
                return j
            }
            return null
        },
        execTask: function() {
            var j = this.getTask();
            if (!j) {
                return
            }
            var l = j.scope || window,
            k = (j.args.constructor && j.args.constructor == Array) ? j.args: [j.args];
            if (typeof j.fn == "function") {
                j.fn.apply(l, k)
            }
        }
    };
    function b() {
        var m = Transport;
        while (true) {
            var l = m.peekPackage(),
            k = new Date().getTime();
            if (l && k - l.dwSendTime > l.dwTimeout) {
                l = m.shiftPackage();
                if (--l.dwRetryCnt > 0) {
                    if (l.head.cmd == "30") {
                        YAHOO.log("class timeout pkg: " + String(l))
                    }
                    var j = l.head.seq;
                    if (l.head.seq == j && (m.qqclient.logined == true || l.head.cmd == "22")) {
                        m.relaySendPackage(l)
                    }
                } else {
                    if (l && l.option) {
                        l.option.onFail.call(l.option.fscope, l.option.arguments)
                    }
                }
            }
            break
        }
    }
    function i() {
        var j = WEBQQ.obj.QQClient;
        j.relayShowHead()
    }
    function a() {
        var j = WEBQQ.obj.QQClient;
        j.taskBar.mf_flick()
    }
    function g() {
        var k = Transport,
        l = "";
        for (var j in k.package_queue) {
            l += k.package_queue[j]
        }
        YAHOO.log("All Timeout Packages: " + l)
    }
    var c = 0;
    function e() {
        var j = WEBQQ.obj.QQClient;
        c++;
        if (c % 120 == 0) {
            g()
        }
        if (c % 10 == 0) {
            b()
        }
        if (c % 120 == 0) {
            j.pollMsg()
        }
        i();
        a()
    }
    var d = YAHOO.util.Dom,
    h = YAHOO.util.Event;
    WEBQQ.obj.QQClient = {
        vip: false,
        act_conn: null,
        conn: [],
        cur_offset: 0,
        cs: null,
        sc: null,
        logined: false,
        password: "",
        ptwebqq: "",
        login_type: 0,
        login_time: 0,
        lsd_logined: false,
        clientKey: 0,
        uin: 0,
        nick: "",
        face: 0,
        orig_info: "",
        long_nick: "",
        web_session: "00000000",
        pt_confirm: 0,
        pre_online_stat: null,
        uin_online_stat: null,
        face_domain: webapp_server_domain + "/images/",
        sound_domain: webapp_server_domain + "/sound/",
        prompt_msg: {
            fix: "WebQQ – 能在网页上直接聊QQ",
            change: ""
        },
        offline_msg: [],
        css_stat: "",
        idle_timer: null,
        last_oper_time: 0,
        chat_mode: 0,
        webqq_setting: 1343242239,
        webqq_proxy_uri: "/conn_s",
        start_time: 0,
        end_time: 0,
        report_img: null,
        evil_flag: false,
        svrindex_and_port: [0, 0],
        server_last_reply: "",
        tmp_pic_ref: [],
        image_el: [],
        lc: {},
        transfer_table: [14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 50, 51, 96, 53, 54, 73, 74, 75, 76, 77, 78, 55, 56, 57, 58, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 32, 113, 114, 115, 63, 64, 59, 33, 34, 116, 36, 37, 38, 91, 92, 93, 29, 117, 72, 45, 42, 39, 62, 46, 47, 71, 95, 118, 119, 120, 121, 122, 123, 124, 27, 21, 23, 25, 26, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 52, 24, 22, 20, 60, 61, 89, 90, 31, 94, 65, 35, 66, 67, 68, 69, 70, 15, 16, 17, 18, 19, 28, 30, 40, 41, 43, 44, 48, 49],
        t_transfer_table: {
            14 : 0,
            1 : 1,
            2 : 2,
            3 : 3,
            4 : 4,
            5 : 5,
            6 : 6,
            7 : 7,
            8 : 8,
            9 : 9,
            10 : 10,
            11 : 11,
            12 : 12,
            13 : 13,
            0 : 14,
            50 : 15,
            51 : 16,
            96 : 17,
            53 : 18,
            54 : 19,
            73 : 20,
            74 : 21,
            75 : 22,
            76 : 23,
            77 : 24,
            78 : 25,
            55 : 26,
            56 : 27,
            57 : 28,
            58 : 29,
            79 : 30,
            80 : 31,
            81 : 32,
            82 : 33,
            83 : 34,
            84 : 35,
            85 : 36,
            86 : 37,
            87 : 38,
            88 : 39,
            97 : 40,
            98 : 41,
            99 : 42,
            100 : 43,
            101 : 44,
            102 : 45,
            103 : 46,
            104 : 47,
            105 : 48,
            106 : 49,
            107 : 50,
            108 : 51,
            109 : 52,
            110 : 53,
            111 : 54,
            112 : 55,
            32 : 56,
            113 : 57,
            114 : 58,
            115 : 59,
            63 : 60,
            64 : 61,
            59 : 62,
            33 : 63,
            34 : 64,
            116 : 65,
            36 : 66,
            37 : 67,
            38 : 68,
            91 : 69,
            92 : 70,
            93 : 71,
            29 : 72,
            117 : 73,
            72 : 74,
            45 : 75,
            42 : 76,
            39 : 77,
            62 : 78,
            46 : 79,
            47 : 80,
            71 : 81,
            95 : 82,
            118 : 83,
            119 : 84,
            120 : 85,
            121 : 86,
            122 : 87,
            123 : 88,
            124 : 89,
            27 : 90,
            21 : 91,
            23 : 92,
            25 : 93,
            26 : 94,
            125 : 95,
            126 : 96,
            127 : 97,
            128 : 98,
            129 : 99,
            130 : 100,
            131 : 101,
            132 : 102,
            133 : 103,
            134 : 104,
            52 : 105,
            24 : 106,
            22 : 107,
            20 : 108,
            60 : 109,
            61 : 110,
            89 : 111,
            90 : 112,
            31 : 113,
            94 : 114,
            65 : 115,
            35 : 116,
            66 : 117,
            67 : 118,
            68 : 119,
            69 : 120,
            70 : 121,
            15 : 122,
            16 : 123,
            17 : 124,
            18 : 125,
            19 : 126,
            28 : 127,
            30 : 128,
            40 : 129,
            41 : 130,
            43 : 131,
            44 : 132,
            48 : 133,
            49 : 134
        },
        ONLINE_STAT_ENUM: {
            online: {
                value: 10,
                icon: "online",
                desc: "在线"
            },
            offline: {
                value: 20,
                icon: "offline",
                desc: "离线"
            },
            away: {
                value: 30,
                icon: "away",
                desc: "离开"
            },
            invisible: {
                value: 40,
                icon: "hidden",
                desc: "隐身"
            },
            busy: {
                value: 50,
                icon: "busy",
                desc: "忙碌"
            }
        },
        STAT2DESC: {
            "10": "online",
            "20": "offline",
            "30": "away",
            "40": "hidden",
            "50": "busy"
        },
        sex: {
            "0": "-",
            "1": "男",
            "2": "女"
        },
        shengXiao: {
            "0": "-",
            "1": "鼠",
            "2": "牛",
            "3": "虎",
            "4": "兔",
            "5": "龙",
            "6": "蛇",
            "7": "马",
            "8": "羊",
            "9": "猴",
            "10": "鸡",
            "11": "狗",
            "12": "猪"
        },
        constellation: {
            "0": "-",
            "1": "水瓶座",
            "2": "双鱼座",
            "3": "白羊座",
            "4": "金牛座",
            "5": "双子座",
            "6": "巨蟹座",
            "7": "狮子座",
            "8": "处女座",
            "9": "天秤座",
            "10": "天蝎座",
            "11": "射手座",
            "12": "摩羯座"
        },
        bloodType: {
            "0": "-",
            "1": "A型",
            "2": "B型",
            "3": "O型",
            "4": "AB型",
            "5": "其它"
        },
        last_error: "",
        ERR_MSG_ENUM: {
            ok: "",
            failed_conn_server: "无法连接到服务器, 请检查网络状态, 或稍后再试！",
            page_not_ready: "页面内容尚未正确加载，请稍后再试！",
            unexpect_server_response: "未知的服务器响应消息！",
            failed_get_signature: "拉取签名失败！",
            failed_check_verify_code: "您输入的验证码不正确，请重新输入！",
            failed_login: "登录失败，请稍后再试！",
            failed_get_group_info: "对不起, 拉取您的好友分组数据出错，本次操作失败，点击确定后重新登录再试！",
            failed_get_user_list: "对不起, 拉取您的好友列表数据出错，本次操作失败，点击确定后重新登录再试！",
            failed_get_user_status: "对不起, 拉取您的好友状态数据出错，本次操作失败，点击确定后重新登录再试！",
            failed_get_user_info: "对不起, 拉取您的好友资料数据出错，本次操作失败，点击确定后重新登录再试！",
            no_longer_online: "掉线，请重新登录！",
            login_request_timeout: "与服务器失去联系，请检查网络后重新登录！",
            password_error: "您的帐号或密码不正确，请您确认：是否记错帐号或密码？是否区分字母大小写？是否开启小键盘？",
            privilege_error: "登录失败，“我的QQ”正在限量封测中，请确认您已经提交过试用申请并已收到了试用通知。",
            unknown_error: "对不起，发生了未知错误，请稍后再试！",
            conn_error: "对不起，服务器正忙，请稍后再试！",
            force_offline: "您的QQ帐号在另一地点登录，您已被迫下线。",
            logined_request_timeout: "获取信息失败，网络繁忙！"
        },
        cs_params: {
            FACE_MAX_INDEX: 173,
            LOGIN_RETRY_MAX_TIMES: 3,
            PROMPT_MSG_INTERVAL: 500,
            last_login_request_time: 0,
            login_retry_times: 0,
            cs_0x58_next_uin: 0,
            cs_0x26_next_pos: 0,
            cs_0x26_timeout: 0,
            cs_0x3e_next_pos: 0
        },
        bdylist: {
            friendList: {
                longnick_pointer: 0,
                level_pointer: 0,
                uins: []
            },
            allUsers: {},
            allClasses: {},
            groups: {},
            female: {
                on: 0,
                total: 0
            },
            male: {
                on: 0,
                total: 0
            }
        },
        pm: null,
        beginOnIdle: function() {
            var j = this;
            if (this.idle_timer) {
                clearInterval(this.idle_timer);
                this.idle_timer = null
            }
            this.idle_timer = setInterval(e, 500)
        },
        getLoginInfo: function() {
            var j = this,
            k = {
                onSuccess: j.onSuccLoginInfo ||
                function() {},
                onFail: j.onFailLoginInfo ||
                function() {},
                sscope: j,
                fscope: j,
                timeout: 6000,
                arguments: {},
                cmd: "22",
                body: j.cs.cs0x22(j.password, j.ptwebqq, j.login_type)
            };
            this.getCmdInfo(k)
        },
        parseLoginInfo: function(j) {
            return this.sc.sc0x22(j)
        },
        onSuccLoginInfo: function(k) {
            YAHOO.log("onSuccLoginInfo: " + k.params);
            var j = this.parseLoginInfo(k);
            if (true == j) {
                this.succLoginEvent.fire(k);
                if (!this.lsd_logined) {
                    this.getGroupInfo()
                }
                this.getClassInfo();
                this.lsd_logined = true
            }
        },
        renderSuccLoginUI: function(k, j) {
            YAHOO.log("renderSuccLoginUI: " + k + j);
            d.setStyle(d.get("webqq_starting"), "display", "none");
            this.addCloseHook();
            this.taskBar.mf_handleOnResize();
            this.mainPanel.mf_InitMainContent();
            this.mainPanel._status_menu_button_node.className = "my_state " + this.css_stat;
            this.mainPanel._my_avatar_img_node.className = "";
            if (this.getBitValue(19, 1) == 1) {
                this.taskBar.setMagnetOn();
                pgvSendClick({
                    hottag: "WEBQQ.MagnetOn"
                })
            } else {
                this.taskBar.setMagnetOff();
                pgvSendClick({
                    hottag: "WEBQQ.MagnetOff"
                })
            }
            this.mainPanel.mf_ShowWindow();
            this.mainPanel._title_el.innerHTML = this.uin;
            if (this.getBitValue(27, 2) == 2) {
                this.mainPanel.disableGroupMsg();
                pgvSendClick({
                    hottag: "WEBQQ.disableGroupMsg"
                })
            } else {
                if (this.getBitValue(27, 2) == 0) {
                    this.mainPanel.enableGroupMsg();
                    pgvSendClick({
                        hottag: "WEBQQ.enableGroupMsg"
                    })
                }
            }
            this.mainPanel.mf_getLoginMailInfo();
            var l = parseInt(this.mainPanel.mf_GetTabPos());
            switch (l) {
            case 0:
                this.mainPanel._msgbox_set_default_el.checked = true;
                this.mainPanel.openMsgboxTab();
                break;
            case 1:
                this.mainPanel._buddy_state_set_default_el.checked = true;
                this.mainPanel.openBuddyStateTab();
                break;
            case 2:
                this.mainPanel._impression_set_default_el.checked = true;
                this.mainPanel.openImpressionTab();
                break;
            case 3:
                this.mainPanel._musicbox_set_default_el.checked = true;
                this.mainPanel.openMusicBoxTab();
                break;
            case 4:
                this.mainPanel._web_browser_set_default_el.checked = true;
                this.mainPanel.openWebBrowserTab();
                break;
            default:
                break
            }
            this.mainPanel.mainTab.show();
            this.removeMsg();
            this.mainPanel.mf_loadBuddyFeeds();
            this.mainPanel.mf_loadMyBuddyImpression();
            this.mainPanel.loadWeather();
            setTimeout(function() {
                d.get("feedback_tip").style.display = "none"
            },
            10000)
        },
        onFailLoginInfo: function(j) {
            if (this.retryServer() == true) {
                this.getLoginInfo()
            } else {
                this.reportStat(56507);
                this.closeConn();
                alert(this.ERR_MSG_ENUM.failed_conn_server);
                this.showLoginPage()
            }
        },
        parseUserInfo: function(j) {
            return this.sc.sc0x06(j)
        },
        onSuccUserInfo: function(k) {
            var j = this.parseUserInfo(k);
            if (true == j) {
                this.succUserEvent.fire(k)
            }
        },
        renderSuccUserUI: function(k, j) {
            this.mainPanel._title_el.innerHTML = (this.nick + "(" + this.uin + ")").forHtml();
            this.mainPanel.mf_SetHead(this.uin, this.face);
            this.mainPanel._qzone_button_node.href = "http://user.qzone.qq.com/" + this.uin;
            this.mainPanel._status_menu_button_node.className = "my_state " + this.css_stat
        },
        onFailUserInfo: function(j) {},
        getGroupInfo: function() {
            var j = this,
            k = {
                onSuccess: j.onSuccGroupInfo ||
                function() {},
                onFail: j.onFailGroupInfo ||
                function() {},
                sscope: j,
                fscope: j,
                arguments: {},
                cmd: "3c",
                body: j.cs.cs0x3c(1)
            };
            this.getCmdInfo(k)
        },
        parseGroupInfo: function(j) {
            return this.sc.sc0x3c(j)
        },
        onSuccGroupInfo: function(k) {
            var j = this.parseGroupInfo(k);
            if (true == j) {
                this.succGroupEvent.fire(k);
                this.getQQInfo()
            }
        },
        renderSuccGroupUI: function(l, j) {
            this.mainPanel._user_list_el.innerHTML = "";
            var m = this.bdylist.groups;
            for (var k in m) {
                this.mainPanel.mf_addGroup(m[k]);
                this.mainPanel.mf_addGroupSplitter(m[k], "online");
                this.mainPanel.mf_addGroupSplitter(m[k], "away");
                this.mainPanel.mf_addGroupSplitter(m[k], "offline")
            }
        },
        onFailGroupInfo: function(j) {
            this.renderFailGroupUI(j)
        },
        parseLevelInfo: function(j) {
            return this.sc.sc0x5c(j)
        },
        onSuccLevelInfo: function(k) {
            var j = this.parseLevelInfo(k);
            if (true == j) {
                this.succLevelEvent.fire(k)
            }
        },
        renderSuccLevelUI: function(o, l) {
            if (this.level >= 0) {
                var k = parseInt(this.level / 64),
                n = parseInt((this.level % 64) / 16),
                j = parseInt(((this.level % 64) % 16) / 4),
                q = ((this.level % 64) % 16) % 4,
                p = '<div class="my_qqlevel_icons">';
                for (var m = 0; m < k; m++) {
                    p += '<div class="queen"></div>'
                }
                for (var m = 0; m < n; m++) {
                    p += '<div class="sun"></div>'
                }
                for (var m = 0; m < j; m++) {
                    p += '<div class="moon"></div>'
                }
                for (var m = 0; m < q; m++) {
                    p += '<div class="star"></div>'
                }
                p += "</div>";
                this.mainPanel._my_qqlevel_panel_node.innerHTML = p;
                this.mainPanel._my_qqlevel_panel_node.title = "等级:" + this.level + " (使用WebQQ升级中...)\n在线天数:" + this.online_days + "，升级剩余天数:" + this.remain_days
            }
        },
        onFailLevelInfo: function(j) {},
        parseLongNickInfo: function(j) {
            return this.sc.sc0x67(j)
        },
        sig_content: "",
        onSuccLongNickInfo: function(k) {
            var j = this.parseLongNickInfo(k);
            if (true == j) {
                this.succLongNickEvent.fire(k)
            }
        },
        renderSuccLongNickUI: function(k, j) {
            this.mainPanel.mf_setSigContent(this.sig_content || "点击设置签名")
        },
        onFailLongNickInfo: function(j) {},
        parseListInfo: function(j) {
            return this.sc.sc0x58(j)
        },
        onSuccListInfo: function(l) {
            var k = this.parseListInfo(l);
            if (0 == k) {
                this.succListEvent.fire(l);
                this.mainPanel._class_list_el.innerHTML = "";
                this.getClassInfo()
            } else {
                if (1 == k) {
                    this.succListEvent.fire(l);
                    var j = this,
                    m = {
                        onSuccess: j.onSuccListInfo ||
                        function() {},
                        onFail: j.onFailListInfo ||
                        function() {},
                        sscope: j,
                        fscope: j,
                        arguments: {},
                        cmd: "58",
                        body: j.cs.cs0x58(j.cs_params.cs_0x58_next_uin)
                    };
                    this.getCmdInfo(m)
                } else {
                    this.onFailClassInfo(l)
                }
            }
        },
        renderSuccListUI: function(q, p) {
            this.mainPanel._user_friend_el.title = "共" + this.bdylist.friendList.uins.length + "个好友";
            var r = this.getClassCount();
            this.mainPanel._user_class_el.title = "共" + r + "个群";
            var k = this.bdylist.groups,
            s, n, m;
            for (var n in k) {
                s = k[n].online_users.index;
                var o = s.length;
                for (m = 0; m < o; ++m) {
                    if (n == "_1000") {
                        this.mainPanel.mf_addOnlineUser(s[m], "online", n)
                    } else {
                        this.mainPanel.mf_addUser(s[m], "online", 1)
                    }
                    var l = this.bdylist.allUsers[s[m]];
                    if (l && l.vip_level > 0) {
                        this.mainPanel.mf_updateUserVip(s[m])
                    }
                }
                s = k[n].away_users.index;
                var o = s.length;
                for (m = 0; m < o; ++m) {
                    if (n == "_1000") {
                        this.mainPanel.mf_addOnlineUser(s[m], "away", n)
                    } else {
                        this.mainPanel.mf_addUser(s[m], "away", 1)
                    }
                    var l = this.bdylist.allUsers[s[m]];
                    if (l && l.vip_level > 0) {
                        this.mainPanel.mf_updateUserVip(s[m])
                    }
                }
                s = k[n].offline_users.index;
                for (m = 0, o = s.length; m < o; ++m) {
                    this.mainPanel.mf_addUser(s[m], "offline", 1)
                }
                this.mainPanel.mf_updateGroupStat(k[n])
            }
        },
        onFailListInfo: function(j) {},
        parseNickInfo: function(j) {
            return this.sc.sc0x26(j)
        },
        onSuccNickInfo: function(l) {
            var k = this.parseNickInfo(l);
            if (0 == k) {
                this.succNickEvent.fire(l)
            } else {
                if (1 == k) {
                    var j = this,
                    m = {
                        onSuccess: j.onSuccNickInfo ||
                        function() {},
                        onFail: j.onFailNickInfo ||
                        function() {},
                        sscope: j,
                        fscope: j,
                        arguments: {},
                        cmd: "26",
                        body: j.cs.cs0x26(j.cs_params.cs_0x26_next_pos, j.cs_params.cs_0x26_timeout++)
                    };
                    this.getCmdInfo(m)
                }
            }
        },
        renderSuccNickUI: function(m, k) {
            var n = this.bdylist.allUsers;
            for (var l in n) {
                var j = n[l];
                if (j.vip_level > 0 && (j.stat == 10 || j.stat == 30)) {
                    this.mainPanel.mf_updateUserVip(l)
                }
                this.mainPanel.mf_updateUserRealName(l, j.remark)
            }
        },
        onFailNickInfo: function(j) {},
        parseRemarkInfo: function(j) {
            return this.sc.sc0x3e(j)
        },
        onSuccRemarkInfo: function(l) {
            var k = this.parseRemarkInfo(l);
            if (0 == k) {
                this.succRemarkEvent.fire(l)
            } else {
                if (1 == k) {
                    var j = this,
                    m = {
                        onSuccess: j.onSuccRemarkInfo ||
                        function() {},
                        onFail: j.onFailRemarkInfo ||
                        function() {},
                        sscope: j,
                        fscope: j,
                        arguments: {},
                        cmd: "3e",
                        body: j.cs.cs0x3e_0x04(j.cs_params.cs_0x3e_next_pos)
                    };
                    this.getCmdInfo(m)
                }
            }
        },
        renderSuccRemarkUI: function(m, k) {
            var n = this.bdylist.allUsers;
            for (var l in n) {
                var j = n[l];
                if (j.vip_level > 0 && (j.stat == 10 || j.stat == 30)) {
                    this.mainPanel.mf_updateUserVip(l)
                }
                if (j.remark) {
                    this.mainPanel.mf_updateUserRealName(l, j.remark);
                    this.mainPanel.mf_setRealnameOfBuddy(l, j.remark, j.nick)
                }
            }
            this.mainPanel.mf_loadAllImpressionsOfBuddys(this.bdylist.friendList.uins)
        },
        onFailRemarkInfo: function(j) {},
        getClassInfo: function() {
            var n = this.bdylist.allClasses,
            k = 0;
            for (var l in n) {
                if (n[l].member_got == false) {
                    var j = this,
                    m = {
                        onSuccess: j.onSuccClassInfo ||
                        function() {},
                        onFail: j.onFailClassInfo ||
                        function() {},
                        sscope: j,
                        fscope: j,
                        arguments: {
                            info: {
                                group_uin: l
                            }
                        },
                        retrycnt: 1,
                        cmd: "30",
                        body: j.cs.cs0x30_0x72(l, n[l].cs_0x30_0x72_next_max_uin)
                    };
                    this.getCmdInfo(m);
                    k++
                }
            }
        },
        parseClassInfo: function(j) {
            return this.sc.sc0x30(j)
        },
        onSuccClassInfo: function(m) {
            var l = this.parseClassInfo(m);
            if (0 == l) {
                this.succClassEvent.fire(m)
            } else {
                if (1 == l) {
                    var n = m.info.group_uin,
                    p = this.bdylist.allClasses;
                    var j = this,
                    o = {
                        onSuccess: j.onSuccClassInfo ||
                        function() {},
                        onFail: j.onFailClassInfo ||
                        function() {},
                        sscope: j,
                        fscope: j,
                        arguments: {
                            info: {
                                group_uin: n
                            }
                        },
                        cmd: "30",
                        body: j.cs.cs0x30_0x72(n, p[n].cs_0x30_0x72_next_max_uin)
                    };
                    var k = this.getCmdInfo(o);
                    YAHOO.log("onSuccClassInfo:" + k)
                }
            }
        },
        renderSuccClassUI: function(l, j) {
            var m = this.bdylist.allClasses;
            for (var k in m) {
                if (m[k].member_got == true) {
                    this.mainPanel.mf_addClass(m[k])
                }
            }
        },
        onFailClassInfo: function(l) {
            var m = l.info.group_uin,
            o = this.bdylist.allClasses;
            var j = this,
            n = {
                onSuccess: j.onSuccClassInfo ||
                function() {},
                onFail: j.onFailClassInfo ||
                function() {},
                sscope: j,
                fscope: j,
                arguments: {
                    info: {
                        group_uin: m
                    }
                },
                cmd: "30",
                body: j.cs.cs0x30_0x72(m, o[m].cs_0x30_0x72_next_max_uin)
            };
            var k = this.getCmdInfo(n);
            YAHOO.log("onFailClassInfo:" + k)
        },
        getClassMemberInfo: function() {
            var n = this.bdylist.allClasses;
            for (var l in k) {
                var k = n[l];
                if (k.member_got == true && k.member_nick_got == false) {
                    var j = this,
                    m = {
                        onSuccess: j.onSuccClassMemberInfo ||
                        function() {},
                        onFail: j.onFailClassMemberInfo ||
                        function() {},
                        sscope: j,
                        fscope: j,
                        arguments: {},
                        cmd: "0126",
                        body: j.cs.cs0x0126(k)
                    };
                    this.getCmdInfo(m)
                }
            }
        },
        parseClassMemberInfo: function(j) {
            return this.sc.sc0x0126(j)
        },
        onSuccClassMemberInfo: function(k) {
            var j = this.parseClassInfo(k);
            if (0 == j) {} else {
                if (1 == j) {
                    this.getClassMemberInfo()
                }
            }
        },
        renderSuccClassMemberUI: function(m, k) {
            var j = this.bdylist.allClasses;
            for (var l in j) {
                if (j[l].member_got == true) {
                    this.mainPanel.mf_addClass(j[l])
                }
            }
        },
        onFailClassMemberInfo: function(j) {},
        getQQInfo: function() {
            var n = {};
            n[this.uin] = 0;
            var k = this,
            j = {
                onSuccess: k.onSuccUserInfo ||
                function() {},
                onFail: k.onFailUserInfo ||
                function() {},
                sscope: k,
                fscope: k,
                arguments: {},
                cmd: "06",
                body: k.cs.cs0x06(k.uin)
            },
            q = {
                onSuccess: k.onSuccLevelInfo ||
                function() {},
                onFail: k.onFailLevelInfo ||
                function() {},
                sscope: k,
                fscope: k,
                arguments: {},
                cmd: "5c",
                body: k.cs.cs0x5c_0x88()
            },
            p = {
                onSuccess: k.onSuccLongNickInfo ||
                function() {},
                onFail: k.onFailLongNickInfo ||
                function() {},
                sscope: k,
                fscope: k,
                arguments: {
                    oUins: n
                },
                cmd: "67",
                body: k.cs.cs0x67_0x03([k.uin])
            },
            o = {
                onSuccess: k.onSuccListInfo ||
                function() {},
                onFail: k.onFailListInfo ||
                function() {},
                sscope: k,
                fscope: k,
                arguments: {},
                cmd: "58",
                body: k.cs.cs0x58(k.cs_params.cs_0x58_next_uin)
            },
            m = {
                onSuccess: k.onSuccNickInfo ||
                function() {},
                onFail: k.onFailNickInfo ||
                function() {},
                sscope: k,
                fscope: k,
                arguments: {},
                cmd: "26",
                body: k.cs.cs0x26(k.cs_params.cs_0x26_next_pos, k.cs_params.cs_0x26_timeout++)
            },
            l = {
                onSuccess: k.onSuccRemarkInfo ||
                function() {},
                onFail: k.onFailRemarkInfo ||
                function() {},
                sscope: k,
                fscope: k,
                arguments: {},
                cmd: "3e",
                body: k.cs.cs0x3e_0x04(k.cs_params.cs_0x3e_next_pos)
            };
            this.getCmdInfo([j, q, p, o, m, l])
        },
        getCmdInfo: function(r) {
            if (Object.prototype.toString.apply(r) != "[object Array]") {
                r = [r]
            }
            var p = [];
            for (var l = 0; l < r.length; l++) {
                var j = r[l],
                k = j.cmd,
                m = j.body,
                q = j.reply_seq,
                s = (k == "22") ? 0 : (q || this.pm.cs_seq++),
                n = new f(this.uin, k, s, this.web_session, m);
                n.setSendTime(new Date().getTime());
                n.setOption(j);
                p.push(s);
                this.pm.sendPackage(n)
            }
            return p
        },
        getLDLongNickInfo: function(m) {
            var n = {};
            for (var l = 0; l < m.length; l++) {
                n[m[l]] = 0
            }
            var j = this,
            o = {
                onSuccess: j.onSuccLDLongNickInfo ||
                function() {},
                onFail: j.onFailLDLongNickInfo ||
                function() {},
                sscope: j,
                fscope: j,
                arguments: {
                    oUins: n
                },
                cmd: "67",
                body: j.cs.cs0x67_0x03(m)
            };
            var k = this.getCmdInfo(o);
            YAHOO.log("getLDLongNickInfo:" + k)
        },
        parseLDLongNickInfo: function(j) {
            return this.sc.sc0x67(j)
        },
        onSuccLDLongNickInfo: function(m) {
            var l = this.parseLDLongNickInfo(m),
            o = m.oUins;
            if (true == l) {
                for (var n in o) {
                    var k = this.mainPanel._tabsManage._uin2container[n],
                    j = this.bdylist.allUsers[n];
                    if (k && j) {
                        k.mf_setSignature(j.long_nick.content)
                    }
                    if (j && n == this.mainPanel._private_info_panel_ref.uin) {
                        this.mainPanel._BuddySignatureInTips_node.innerHTML = String(j.long_nick.content).escape2name();
                        this.mainPanel._BuddySignatureInTips_node.title = j.long_nick.content
                    }
                }
            }
        },
        onFailLDLongNickInfo: function(j) {},
        initEvents: function() {
            this.succLoginEvent = new YAHOO.util.CustomEvent("succLogin");
            this.failLoginEvent = new YAHOO.util.CustomEvent("failLogin");
            this.succUserEvent = new YAHOO.util.CustomEvent("succUser");
            this.failUserEvent = new YAHOO.util.CustomEvent("failUser");
            this.succGroupEvent = new YAHOO.util.CustomEvent("succGroup");
            this.failGroupEvent = new YAHOO.util.CustomEvent("failGroup");
            this.succLevelEvent = new YAHOO.util.CustomEvent("succLevel");
            this.failLevelEvent = new YAHOO.util.CustomEvent("failLevel");
            this.succLongNickEvent = new YAHOO.util.CustomEvent("succLongNick");
            this.failLongNickEvent = new YAHOO.util.CustomEvent("failLongNick");
            this.succListEvent = new YAHOO.util.CustomEvent("succList");
            this.failListEvent = new YAHOO.util.CustomEvent("failList");
            this.succNickEvent = new YAHOO.util.CustomEvent("succList");
            this.failNickEvent = new YAHOO.util.CustomEvent("failList");
            this.succRemarkEvent = new YAHOO.util.CustomEvent("succRemark");
            this.failRemarkEvent = new YAHOO.util.CustomEvent("failRemark");
            this.succClassEvent = new YAHOO.util.CustomEvent("succClass");
            this.failClassEvent = new YAHOO.util.CustomEvent("failClass");
            this.succLoginEvent.subscribe(this.renderSuccLoginUI, null, this);
            this.succUserEvent.subscribe(this.renderSuccUserUI, null, this);
            this.succGroupEvent.subscribe(this.renderSuccGroupUI, null, this);
            this.succLevelEvent.subscribe(this.renderSuccLevelUI, null, this);
            this.succLongNickEvent.subscribe(this.renderSuccLongNickUI, null, this);
            this.succListEvent.subscribe(this.renderSuccListUI, null, this);
            this.succNickEvent.subscribe(this.renderSuccNickUI, null, this);
            this.succRemarkEvent.subscribe(this.renderSuccRemarkUI, null, this);
            this.succClassEvent.subscribe(this.renderSuccClassUI, null, this)
        },
        http_callback: {
            timeout: 30000
        },
        init: function() {
            this.taskBar = WEBQQ.cls.Taskbar.getInstance();
            this.report_img = d.get("Main_mainwindow_report_img");
            if (!ssn("uin") || !ssn("skey") || !ssn("ptwebqq")) {
                var m = getEnv();
                if (m && this.report_img) {
                    this.report_img.src = "http://58.60.13.192/cgi-bin/webqq/webqq_stat?o=" + pf[0] + "&b=" + pf[1] + "&r=" + window.screen.width + "X" + window.screen.height + "&ref=" + document.referrer
                }
                this.showLoginPage();
                return
            }
            this.start_time = new Date();
            this.reset();
            this.initSetting();
            this.initEvents();
            this.mainPanel = WEBQQ.cls.MainPanel.getInstance();
            var n = null;
            var l = Math.floor(Math.random() * 2) + 1;
            var j = ["conn_frame" + l, "conn_frame" + (l % 2 + 1)];
            try {
                n = window.frames[j[0]] ? window.frames[j[0]].Connect: null;
                if (n) {
                    this.conn.push(n)
                }
            } catch(o) {}
            try {
                n = window.frames[j[1]] ? window.frames[j[1]].Connect: null;
                if (n) {
                    this.conn.push(n)
                }
            } catch(o) {}
            this.conn.push(WEBQQ.util.Connect);
            this.act_conn = this.conn[this.cur_offset++];
            if (!YAHOO.env.ua.ie && !YAHOO.env.ua.gecko) {
                this.act_conn = this.conn[this.conn.length - 1]
            }
            this.pm = Transport;
            this.cs = WEBQQ.Protocal.CS;
            this.sc = WEBQQ.Protocal.SC;
            this.pm.init(this);
            this.sc.init(this);
            this.uin = Number(String(ssn("uin")).substr(1));
            this.cookie_uin = String(ssn("uin"));
            this.password = ssn("skey");
            this.ptwebqq = ssn("ptwebqq");
            if (this.uin == 1002000110) {
                alert(this.conn.length + ":" + this.act_conn + ":" + this.webqq_proxy_uri)
            }
            this.reportStat(56501);
            var k = this;
            this.http_callback = {
                success: k.recvMsgCallback,
                failure: k.recvMsgCallback,
                timeout: 30000,
                scope: k
            };
            this.beginOnIdle();
            this.getLoginInfo()
        },
        pollMsg: function() {
            if (this.logined == true && this.act_conn) {
                var j = this.cs.cs0x00(),
                k = new f(this.uin, "00", this.pm.cs_seq++, this.web_session, j);
                this.pm.sendPackage(k)
            }
        },
        recvMsgCallback: function(j) {
            if ((!j || (!j.responseText) || (j.responseText == "") || (j.responseText == "success")) && !this.isExit) {
                this.pollMsg();
                return true
            }
            this.pollMsg();
            YAHOO.log("server->client: " + j.responseText);
            var l = "\x1d",
            n = ";";
            var p = String(j.responseText).split(l);
            for (var q = 0; q < p.length; q++) {
                var u = p[q];
                this.server_last_reply = u;
                var m = u.split(n);
                if (m.length <= 3) {
                    this.pollMsg();
                    return true
                }
                if ((parseInt(m[0]) != this.uin) || (m[1] != "22" && !this.logined)) {
                    return true
                }
                var k = parseInt(m[1], 16),
                t = Number(m[2]);
                var s = this.pm.removePackage(t);
                if (s && s.option) {
                    s.option.arguments.params = m;
                    s.option.onSuccess.call(s.option.sscope, s.option.arguments)
                }
                try {
                    switch (k) {
                    case 1:
                        this.sc.sc0x01(m);
                        break;
                    case 23:
                        this.sc.sc0x17(m);
                        break;
                    case 241:
                        this.sc.sc0xf1(m);
                        break;
                    case 128:
                        this.sc.sc0x80(m);
                        break;
                    case 129:
                        this.sc.sc0x81(m);
                        break;
                    case 34:
                    case 6:
                    case 60:
                    case 92:
                    case 103:
                    case 88:
                    case 38:
                    case 62:
                    case 48:
                    case 294:
                        break;
                    default:
                        YAHOO.log("unknown message: " + m.join(";"));
                        break
                    }
                } catch(r) {}
            }
            return true
        },
        initSetting: function() {
            var k = Number(ssn("webqq_setting")) || this.webqq_setting;
            this.webqq_setting = k;
            var j = this;
            window.onfocus = function() {}
        },
        setBitValue: function(p, l, o) {
            if (p < 0 || p > 30 || l < 1 || l > 31) {
                return
            }
            var j = this.webqq_setting,
            m = (j >> (p + 1)) << (p + 1),
            k = (j << (30 - p + l) & 2147483647) >> (30 - p + l);
            o = o << (p - l + 1);
            this.webqq_setting = m | o | k;
            var n = new Date();
            n.setTime(n.getTime() + 15552000000);
            document.cookie = "webqq_setting=" + this.webqq_setting + "; EXPIRES=" + n.toGMTString() + "; PATH=/;"
        },
        getBitValue: function(l, k) {
            if (l < 0 || l > 30 || k < 1 || k > 31) {
                return 0
            }
            var j = this.webqq_setting;
            return ((j << (30 - l)) & 2147483647) >> (31 - k)
        },
        clearError: function() {
            this.last_error = this.ERR_MSG_ENUM.ok;
            this.cs_params.login_retry_times = 0
        },
        reset: function() {
            if (this.pm) {
                this.pm.cs_seq = 0
            }
        },
        promptMsg: function() {
            if (!this.prompt_msg_interval) {
                var k = 0;
                var j = this;
                this.prompt_msg_interval = setInterval(function() {
                    document.title = j.prompt_msg.change;
                    j.prompt_msg.change = j.prompt_msg.change.substr(1) + j.prompt_msg.change.charAt(0)
                },
                this.cs_params.PROMPT_MSG_INTERVAL)
            }
        },
        removeMsg: function() {
            if (this.prompt_msg_interval) {
                clearInterval(this.prompt_msg_interval);
                this.prompt_msg_interval = null;
                this.mainPanel.mf_resetDocumentTitle()
            }
        },
        isMaskSound: function() {
            return (this.getBitValue(28, 1) == 0) || (this.getBitValue(27, 2) == 3)
        },
        isMaskUserMsg: function() {
            return this.getBitValue(27, 2) == 3
        },
        isMaskClassMsg: function(j) {
            return this.getBitValue(27, 1) == 1
        },
        getChatBox: function(j) {
            return this.mainPanel._tabsManage._uin2container[j] || null
        },
        isActiveChatBox: function(j) {
            return this.mainPanel._tabsManage._actTalkWin == j
        },
        notify_uin_list: [],
        notify_grp_list: [],
        addNotify: function(n) {
            var k = this.bdylist.allUsers[n] || this.bdylist.allClasses[n];
            if (!k) {
                return
            }
            var o = k.group_id;
            if (k.group_id == -1 && k.class_id == -1) {
                o = n
            }
            for (var m = 0,
            j = this.notify_uin_list.length; m < j; m++) {
                if (this.notify_uin_list[m].uin == n) {
                    return
                }
            }
            var l = this.mainPanel._tabsManage._uin2container[n] || null;
            this.notify_uin_list.unshift({
                uin: n,
                grp_id: o,
                tab_win: l
            });
            if (!this.notify_grp_list[o]) {
                this.notify_grp_list[o] = 1
            } else {
                this.notify_grp_list[o]++
            }
        },
        removeNotify: function(l) {
            for (var k = 0,
            j = this.notify_uin_list.length; k < j; k++) {
                if (this.notify_uin_list[k].uin == l) {
                    var m = this.notify_uin_list[k].grp_id;
                    this.notify_grp_list[m]--;
                    if (this.notify_grp_list[m] <= 0) {
                        this.notify_grp_list[m] = 0;
                        this.mainPanel.mf_SwcGroupInfo(m, true)
                    }
                    this.notify_uin_list.splice(k, 1);
                    this.mainPanel.mf_SwcUinStat(l, true);
                    this.taskBar.mf_update_flick_status();
                    break
                }
            }
            this.mainPanel.mf_removeFromMidArea(l);
            this.removeMsg()
        },
        playMsgSnd: function(l) {
            var k = null,
            j = "";
            switch (l) {
            case 1:
                j = "msg";
                break;
            case 2:
                j = "system";
                break;
            default:
                break
            }
            if (h.isIE) {
                k = document.getElementById("sound_control") || document.createElement("bgsound");
                k.setAttribute("src", this.sound_domain + j + ".wav");
                k.setAttribute("loop", 1)
            } else {
                k = document.getElementById("sound_control") || document.createElement("div");
                k.innerHTML = '<embed width="0" height="0"  autostart="true" src="' + this.sound_domain + j + '.swf"></embed>'
            }
            k.id = "sound_control";
            document.body.appendChild(k);
            setTimeout(function() {
                try {
                    if (k) {
                        document.body.removeChild(k);
                        delete k
                    }
                } catch(m) {}
            },
            3000)
        },
        updateArrowIcon: function(k) {
            var o = this.taskBar._chat_tasks || [];
            var p = Math.floor((Math.abs(parseInt(d.getStyle(this.taskBar._chat_area_ref, "top"))) || 0) / this.taskBar.TASKBAR_HEIGHT) * this.taskBar.TASKBAR_HEIGHT;
            for (var l = 0,
            j = this.notify_uin_list.length; l < j; l++) {
                var n = this.notify_uin_list[l].uin;
                var q = o[n];
                var m = Math.floor(q.eleRef.offsetTop / this.taskBar.TASKBAR_HEIGHT) * this.taskBar.TASKBAR_HEIGHT;
                if (m > p) {
                    this.taskBar._right_next_ref.className = k ? "ararrow": "nrarrow"
                }
                if (m < p) {
                    this.taskBar._left_prev_ref.className = k ? "alarrow": "nlarrow"
                }
            }
        },
        updateUinIcon: function(k) {
            var p = this.bdylist.groups;
            for (var o in this.notify_grp_list) {
                if (this.notify_grp_list[o]) {
                    this.mainPanel.mf_SwcGroupInfo(o, k)
                }
            }
            for (var m = 0,
            j = this.notify_uin_list.length; m < j; m++) {
                var l = this.notify_uin_list[m].tab_win;
                var n = this.notify_uin_list[m].uin;
                this.mainPanel.mf_SwcUinStat(n, k);
                if (l) {
                    this.taskBar.mf_update_sta(l, k ? this.taskBar.UPDATE_TYPE.go: this.taskBar.UPDATE_TYPE.notify)
                }
            }
        },
        actChat: function(j, k) {
            this.mainPanel.mf_act_chat_with(j, k)
        },
        showLoginPage: function() {
            window.location = "./"
        },
        reportStat: function(j) {
            this.report_img.src = "http://58.60.13.192/cgi-bin/webqq/webqq_report?id=" + j + "&r=" + new Date().getTime()
        },
        reportText: function(k) {
            var j = getEnv();
            if (j && this.report_img) {
                this.report_img.src = "http://58.60.13.192/cgi-bin/webqq/webqq_stat_offline_1222?o=" + j[0] + "&b=" + j[1] + "&r=" + window.screen.width + "X" + window.screen.height + "&ref=" + document.referrer + "&u=" + this.uin + "&l=100&s=-100&t=0&p=" + k + "&rnd=" + new Date().getTime()
            }
        },
        reportBrowserRecord: function(k, j) {
            this.report_img.src = "http://58.60.13.192/cgi-bin/webqq/webqq_browser_record?u=" + k + "&s=" + j
        },
        getClassCnt: function() {
            var j = 0;
            for (var k in this.bdylist.allClasses) {
                j++
            }
            return j
        },
        closeConn: function() {
            if (this.logined) {
                this.removeCloseHook();
                this.logined = false
            }
            if (this.pm) {
                this.pm.removeAllPackage()
            }
        },
        closeWinHook: function(k) {
            var j = "离开页面，会退出WebQQ，您是否要继续？";
            if (h.isSafari) {
                return j
            }
            k = h.getEvent(k);
            k.returnValue = j
        },
        addCloseHook: function() {
            h.on(window, "beforeunload", this.closeWinHook, this, true);
            h.on(window, "unload",
            function() {
                var j = this,
                k = {
                    onSuccess: function() {},
                    onFail: function() {},
                    sscope: j,
                    fscope: j,
                    arguments: {},
                    cmd: "01",
                    body: j.cs.cs0x01()
                };
                this.getCmdInfo(k)
            },
            this, true)
        },
        removeCloseHook: function() {
            h.removeListener(window, "beforeunload", this.closeWinHook)
        },
        retryServer: function() {
            if (this.cur_offset < this.conn.length) {
                this.act_conn = this.conn[this.cur_offset++];
                this.cs_params.login_request_retry_times = 0;
                return true
            }
            this.act_conn = this.conn[0];
            return false
        },
        is_exit: false,
        isFriend: function(k) {
            var j = -1;
            if (this.bdylist.allUsers[k]) {
                if ((this.bdylist.allUsers[k].group_id != -1) && (this.bdylist.allUsers[k].group_id != "_1000") && (this.bdylist.allUsers[k].group_id != "1000") && (this.bdylist.allUsers[k].group_id != "1001")) {
                    j = this.bdylist.allUsers[k].group_id
                }
            }
            return j
        },
        getFriendGroupID: function(k) {
            var j = -1;
            if (this.bdylist.allUsers[k]) {
                j = this.bdylist.allUsers[k].group_id
            }
            return j
        },
        getClassCount: function() {
            var j = 0;
            for (var k in this.bdylist.allClasses) {
                j++
            }
            return j
        },
        getClassTempSession: function(l, n) {
            var j = this,
            m = {
                onSuccess: j.onSuccLDGetClassTempSession ||
                function() {},
                onFail: j.onFailLDGetClassTempSession ||
                function() {},
                sscope: j,
                fscope: j,
                arguments: {
                    info: {
                        to_uin: n
                    }
                },
                cmd: "30",
                body: j.cs.cs0x30_0x73(l, n)
            };
            var k = this.getCmdInfo(m);
            YAHOO.log("getClassTempSession:" + k)
        },
        onSuccLDGetClassTempSession: function(l) {
            var n = l.params;
            var j = parseInt(n[4], 10);
            if (j == 0) {
                var m = l.info.to_uin;
                var k = this.bdylist.allUsers[m] || {};
                k.SigC2CMsg = n[5]
            }
        },
        getVerifyCodeSession: function(n, m) {
            var j = this,
            l = {
                onSuccess: j.onSuccLDGetVerifyCodeSession ||
                function() {},
                onFail: j.onFailLDGetVerifyCodeSession ||
                function() {},
                sscope: j,
                fscope: j,
                arguments: {
                    info: {
                        to_uin: m
                    }
                },
                cmd: "ae",
                body: j.cs.cs0xae_0x01(n, m)
            };
            var k = this.getCmdInfo(l);
            YAHOO.log("getVerifyCodeSession:" + k)
        },
        onSuccLDGetVerifyCodeSession: function(l) {
            var o = l.params;
            var m = parseInt(o[3], 10),
            j = parseInt(o[4], 10);
            if (m == 1) {
                if (j == 0) {
                    var n = l.info.to_uin;
                    var k = this.bdylist.allUsers[n] || {};
                    k.VerifySig = o[5]
                } else {
                    if (j == 1) {}
                }
            }
        },
        sendC2CMsg: function(l, m, o) {
            var j = this,
            n = {
                onSuccess: j.onSuccLDSendC2CMsg ||
                function() {},
                onFail: j.onFailLDSendC2CMsg ||
                function() {
                    alert("发送失败")
                },
                sscope: j,
                fscope: j,
                arguments: {},
                cmd: "16",
                timeout: 6,
                body: j.cs.cs0x16_0x0b(l, m, o)
            };
            var k = this.getCmdInfo(n);
            return this.pm.cs_seq + 1000000
        },
        sendClassMsg: function(l, n) {
            var j = this,
            m = {
                onSuccess: j.onSuccLDClassMsg ||
                function() {},
                onFail: j.onFailLDClassMsg ||
                function() {
                    alert("发送失败")
                },
                sscope: j,
                fscope: j,
                arguments: {},
                cmd: "30",
                timeout: 6,
                body: j.cs.cs0x30_0x0a(l, n)
            };
            var k = this.getCmdInfo(m);
            return this.pm.cs_seq + 1000000
        },
        sendSessionMsg: function(k, n, t, q, m) {
            var o = this.bdylist.allUsers[k],
            r = o.class_id,
            j = o.SessionTime;
            o.SessionTime = new Date().getTime();
            if ((new Date().getTime() - j) > 1800000) {
                this.getClassTempSession(r, k)
            }
            if ((new Date().getTime() - j) > 150000) {
                this.getVerifyCodeSession(0, k)
            }
            var l = 0,
            p = this;
            if (o.SigC2CMsg == "") {
                this.getClassTempSession(r, k);
                l = 1500
            }
            if (o.VerifySig == "") {
                this.getVerifyCodeSession(0, k);
                l = 1500
            }
            var s = this;
            setTimeout(function() {
                var v = {
                    onSuccess: s.onSuccLDSendSessionMsg ||
                    function() {},
                    onFail: s.onFailLDSendSessionMsg ||
                    function() {
                        alert("发送失败")
                    },
                    sscope: s,
                    fscope: s,
                    arguments: {},
                    cmd: "e1",
                    timeout: 6,
                    body: s.cs.cs0xe1_0x0b(k, o.VerifySig, o.SigC2CMsg, q, m)
                };
                var u = s.getCmdInfo(v);
                YAHOO.log("sendSessionMsg:" + u)
            },
            l);
            return this.pm.cs_seq + 1000000
        },
        replyCS17: function(q, m, k, p, o) {
            var j = this,
            n = {
                onSuccess: j.onSuccLDReplyCS17 ||
                function() {},
                onFail: j.onFailLDReplyCS17 ||
                function() {},
                sscope: j,
                fscope: j,
                arguments: {},
                retrycnt: 1,
                reply_seq: k,
                cmd: "17",
                body: j.cs.cs0x17(q, j.uin, m, p, o)
            };
            var l = this.getCmdInfo(n)
        },
        applyLongConnId: function(m, l) {
            var j = this,
            n = {
                onSuccess: j.onSuccLDApplyLongConnId ||
                function() {},
                onFail: j.onFailLDApplyLongConnId ||
                function() {},
                sscope: j,
                fscope: j,
                arguments: {},
                cmd: "16",
                body: j.cs.cs0x16_0x81(m, l)
            };
            var k = this.getCmdInfo(n);
            YAHOO.log("applyLongConnId:" + k)
        },
        agreeLongConnId: function(m, o, l) {
            var j = this,
            n = {
                onSuccess: j.onSuccLDApplyLongConnId ||
                function() {},
                onFail: j.onFailLDApplyLongConnId ||
                function() {},
                sscope: j,
                fscope: j,
                arguments: {},
                cmd: "16",
                body: j.cs.cs0x16_0x83(m, o, l)
            };
            var k = this.getCmdInfo(n);
            YAHOO.log("applyLongConnId:" + k)
        },
        refuseLongConnId: function(m, o, l) {
            var j = this,
            n = {
                onSuccess: j.onSuccLDRefuseLongConnId ||
                function() {},
                onFail: j.onFailLDRefuseLongConnId ||
                function() {},
                sscope: j,
                fscope: j,
                arguments: {},
                cmd: "16",
                body: j.cs.cs0x16_0x85(m, o, l)
            };
            var k = this.getCmdInfo(n);
            YAHOO.log("refuseLongConnId:" + k)
        },
        applyOfflinePicAddr: function(k, m) {
            var j = this,
            n = {
                onSuccess: j.onSuccLDApplyOfflinePicAddr ||
                function() {},
                onFail: j.onFailLDApplyOfflinePicAddr ||
                function() {},
                sscope: j,
                fscope: j,
                arguments: {},
                cmd: "0129",
                body: j.cs.cs0x0129(k, m)
            };
            var l = this.getCmdInfo(n);
            YAHOO.log("applyOfflinePicAddr:" + l)
        },
        onSuccLDApplyOfflinePicAddr: function(q) {
            var m = q.params;
            var t = parseInt(m[4]);
            if (t != 0) {
                return
            }
            var r = m[6],
            n = parseInt(m[3]),
            s = parseInt(m[7]),
            j = String(m[5]);
            var o = this.bdylist.allUsers[r] || null;
            if (o) {
                for (var p = o.tmp_pic_ref.length - 1; p >= 0; p--) {
                    var k = o.tmp_pic_ref[p].split("_"),
                    l = k[0];
                    if ((parseInt(l)) == 0) {
                        if (s == parseInt(k[1])) {
                            d.get(o.tmp_pic_ref[p]).src = j + "." + k[2];
                            o.history.update_pic_url(o.tmp_pic_ref[p], j + "." + k[2]);
                            o.tmp_pic_ref.splice(p, 1);
                            break
                        }
                    }
                }
            }
        },
        showUserPic: function(s, l, r) {
            var n = this.bdylist.allUsers[s] || null;
            if (n) {
                var q = 0;
                for (var o = 0; o < n.tmp_pic_ref.length; o++) {
                    var k = n.tmp_pic_ref[o].split("_"),
                    t = k[3];
                    if (t == l) {
                        q++
                    }
                }
                for (var o = n.tmp_pic_ref.length - 1; o >= 0; o--) {
                    var k = n.tmp_pic_ref[o].split("_"),
                    t = k[3];
                    if (l == t) {
                        var p = k[0],
                        m = k[2],
                        j = chat_pic_server_domain + "/" + this.uin + "/" + p + "/" + r + "/" + this.svrindex_and_port[0] + "/" + this.svrindex_and_port[1] + "/" + q + "/" + t + "/" + (this.pm.cs_seq++) + "/" + m; (d.get(n.tmp_pic_ref[o]) || {}).src = j;
                        n.history.update_pic_url(n.tmp_pic_ref[o], j);
                        h.on(n.tmp_pic_ref[o], "error",
                        function() {
                            this.src = img_server_domain + "/images/img_error.gif";
                            n.history.update_pic_url(this.getAttribute("id"), img_server_domain + "/images/img_error.gif")
                        });
                        n.tmp_pic_ref.splice(o, 1)
                    }
                }
            }
        },
        getFileInfo: function(t, s, o, k) {
            var m = this.bdylist.allUsers[t] || null;
            var l = null;
            if (m) {
                var r = m.tmp_file_ref.length;
                for (var n = m.tmp_file_ref.length - 1; n >= 0; n--) {
                    var p = m.tmp_file_ref[n].split("*");
                    if (p[1] == s) {
                        var q = p[0],
                        l = p[2],
                        j = chat_pic_server_domain + "/" + this.uin + "/" + q + "/" + s + "/" + this.svrindex_and_port[0] + "/" + this.svrindex_and_port[1] + "/" + o + "/" + k + "/" + r + "/f/" + (this.pm.cs_seq++) + "/" + encodeURIComponent(decodeURIComponent(l));
                        m.tmp_file_ref.splice(n, 1);
                        l = [j, unescape(l)];
                        break
                    }
                }
            }
            return l
        },
        showClassChatPic: function() {
            for (var o = this.tmp_pic_ref.length - 1; o >= 0; o--) {
                var k = this.tmp_pic_ref[o].split("_"),
                l = k[0];
                if (parseInt(l) == 1) {
                    var q = parseInt(k[5]);
                    if (parseInt(new Date().getTime()) - q > 5000) {
                        var p = k[1],
                        m = k[2],
                        r = k[3],
                        s = k[4];
                        var j = qun_space_server_domain + "/cgi/svr/chatimg/get?pic=" + r + "&gid=" + p + "&time=" + m; (d.get(this.tmp_pic_ref[o]) || {}).src = j;
                        var n = this.bdylist.allUsers[s] || this.bdylist.allClasses[s];
                        if (n) {
                            n.history.update_pic_url(this.tmp_pic_ref[o], j)
                        }
                        h.on(this.tmp_pic_ref[o], "error",
                        function() {
                            this.src = img_server_domain + "/images/img_error.gif"
                        });
                        this.tmp_pic_ref.splice(o, 1)
                    }
                }
            }
        },
        relayShowHead: function() {
            for (var l = 0; l < 10; l++) {
                var k = this.image_el.shift() || null;
                if (k) {
                    var j = this.bdylist.allUsers[k.uin];
                    k.img.src = face_server_domain + "/cgi/svr/face/getface?type=1&me=" + this.uin + "&uin=" + j.uin
                }
            }
        },
        addFriendPassive: function(s) {
            var q = s.type,
            o = s.from_uin,
            r = s.group_id || 0,
            l = s.realname || "",
            m = "";
            switch (q) {
            case 1:
                var k = s.signature;
                r = s.group_id;
                m = this.cs.cs0xa8(q, o, [k, r]);
                break;
            case 3:
                r = s.group_id;
                m = this.cs.cs0xa8(q, o, [r]);
                break;
            case 4:
                m = this.cs.cs0xa8(q, o, []);
                break;
            case 5:
                var j = s.msg;
                m = this.cs.cs0xa8(q, o, [j]);
                break;
            case 6:
                var j = s.msg;
                r = s.group_id;
                m = this.cs.cs0xa8(q, o, [r, j]);
                break
            }
            var t = this,
            p = {
                onSuccess: t.onSuccLDAddFriendPassive ||
                function(u) {
                    if (u.info.type == 5) {
                        return
                    }
                    t.mainPanel.addBuddy.addBuddyFinished(u)
                },
                onFail: t.onFailLDAddFriendPassive ||
                function() {},
                sscope: t,
                fscope: t,
                arguments: {
                    info: {
                        friend_uin: o,
                        type: q,
                        group_id: r,
                        remark: l
                    }
                },
                cmd: "a8",
                body: m
            };
            var n = this.getCmdInfo(p)
        },
        submitMyDetails: function(l, m) {
            var k = [];
            k[0] = "";
            k[1] = "";
            k[2] = m.nickName === "" ? "-": m.nickName;
            k[3] = m.country === "" ? "-": m.country;
            k[4] = m.province === "" ? "-": m.province;
            k[5] = m.postcode === "" ? "-": m.postcode;
            k[6] = m.address === "" ? "-": m.address;
            k[7] = m.phone === "" ? "-": m.phone;
            k[8] = m.age === "" ? "-": m.age;
            k[9] = m.sex === "" ? "-": m.sex;
            k[10] = m.realName === "" ? "-": m.realName;
            k[11] = m.email === "" ? "-": m.email;
            k[12] = m.pagerProvider === "" ? "-": m.pagerProvider;
            k[13] = m.stationName === "" ? "-": m.stationName;
            k[14] = m.stationNO === "" ? "-": m.stationNO;
            k[15] = m.pagerNO === "" ? "-": m.pagerNO;
            k[16] = m.pagerType === "" ? "-": m.pagerType;
            k[17] = m.occupation === "" ? "-": m.occupation;
            k[18] = m.homepage === "" ? "-": m.homepage;
            k[19] = m.author === "" ? "-": m.author;
            k[20] = m.icqNO === "" ? "-": m.icqNO;
            k[21] = m.icqPwd === "" ? "-": m.icqPwd;
            k[22] = m.avatar === "" ? "-": m.avatar;
            k[23] = m.mobile === "" ? "-": m.mobile;
            k[24] = m.secret === "" ? "-": m.secret;
            k[25] = m.perInfo === "" ? "-": m.perInfo;
            k[26] = m.cityNo === "" ? "-": m.cityNo;
            k[27] = m.secretEmail === "" ? "-": m.secretEmail;
            k[28] = m.idCard === "" ? "-": m.idCard;
            k[29] = m.GSMType === "" ? "-": m.GSMType;
            k[30] = m.GSMOpenInfo === "" ? "-": m.GSMOpenInfo;
            k[31] = m.contactOpenInfo === "" ? "-": m.contactOpenInfo;
            k[32] = m.college === "" ? "-": m.college;
            k[33] = m.constellation === "" ? "0": m.constellation;
            k[34] = m.shengXiao === "" ? "0": m.shengXiao;
            k[35] = m.bloodType === "" ? "0": m.bloodType;
            k[36] = "";
            var j = k.join("\x1f");
            l.cmd = "04";
            l.body = this.cs.cs0x04(j);
            this.getCmdInfo(l)
        },
        getUserDetails: function(j, l) {
            l.cmd = "06";
            l.body = this.cs.cs0x06(j);
            var k = this.getCmdInfo(l);
            YAHOO.log("getUserDetails:" + k)
        },
        parseUserDetails: function(n) {
            var l = "";
            var o = unescape(n[17]).toHtml();
            var j = /[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^\"\"])*$/;
            if (j.test(o)) {
                if (o.indexOf("://") == -1) {
                    l = '<a href="http://' + o + '" target="_blank" title="' + o + '">' + o + "</a>"
                } else {
                    l = '<a href="' + o + '" target="_blank" title="' + o + '">' + o + "</a>"
                }
            } else {
                l = o
            }
            var k = {
                country: "",
                province: "",
                postcode: "",
                address: "",
                phone: "",
                age: 1,
                sex: "",
                realName: "",
                email: "1@qq.com",
                pagerProvider: "",
                stationName: "",
                stationNO: "",
                pagerNO: "",
                pagerType: "",
                occupation: "",
                homepage: "",
                author: "",
                icqNO: "",
                icqPwd: "",
                avatar: "",
                mobile: "",
                secret: "",
                perInfo: "",
                cityNo: "",
                secretEmail: "",
                idCard: "",
                GSMType: "",
                GSMOpenInfo: "",
                contactOpenInfo: "",
                college: "",
                constellation: "",
                shengXiao: "",
                bloodType: "",
                qqLevel: ""
            };
            var m = {
                uin: decodeURIComponent(n[0]),
                nickName: (decodeURIComponent(n[1]) == "") ? decodeURIComponent(n[0]) : decodeURIComponent(n[1]),
                country: decodeURIComponent(n[2]),
                province: decodeURIComponent(n[3]),
                postcode: decodeURIComponent(n[4]),
                address: decodeURIComponent(n[5]),
                phone: decodeURIComponent(n[6]),
                age: decodeURIComponent(n[7]),
                sex: decodeURIComponent(n[8]),
                realName: decodeURIComponent(n[9]),
                email: decodeURIComponent(n[10]),
                pagerProvider: decodeURIComponent(n[11]),
                stationName: decodeURIComponent(n[12]),
                stationNO: decodeURIComponent(n[13]),
                pagerNO: decodeURIComponent(n[14]),
                pagerType: decodeURIComponent(n[15]),
                occupation: decodeURIComponent(n[16]),
                homepage: decodeURIComponent(n[17]),
                homepageLink: l,
                author: decodeURIComponent(n[18]),
                icqNO: decodeURIComponent(n[19]),
                icqPwd: decodeURIComponent(n[20]),
                avatar: decodeURIComponent(n[21]),
                mobile: decodeURIComponent(n[22]),
                secret: decodeURIComponent(n[23]),
                perInfo: decodeURIComponent(n[24]),
                cityNo: decodeURIComponent(n[25]),
                secretEmail: decodeURIComponent(n[26]),
                idCard: decodeURIComponent(n[27]),
                GSMType: decodeURIComponent(n[28]),
                GSMOpenInfo: decodeURIComponent(n[29]),
                contactOpenInfo: decodeURIComponent(n[30]),
                college: decodeURIComponent(n[31]),
                constellation: this.constellation[decodeURIComponent(n[32])],
                shengXiao: this.shengXiao[decodeURIComponent(n[33])],
                bloodType: this.bloodType[decodeURIComponent(n[34])],
                qqLevel: decodeURIComponent(n[35])
            };
            return m
        },
        RemarkFriend: function(l, o) {
            var k = parseInt(l.uin, 10);
            if (typeof o != "undefined" && o != "" && k != 0) {
                var j = this,
                n = {
                    onSuccess: j.onSuccLDRemarkFriend ||
                    function(q) {
                        var p = q.info.friend_uin,
                        r = q.info.remark;
                        l.remark = r;
                        j.mainPanel.mf_updateUserRealName(p, r)
                    },
                    onFail: j.onFailLDRemarkFriend ||
                    function() {},
                    sscope: j,
                    fscope: j,
                    arguments: {
                        info: {
                            friend_uin: k,
                            remark: o
                        }
                    },
                    cmd: "3e",
                    body: j.cs.cs0x3e_0x05(k, encodeURIComponent(o))
                };
                var m = this.getCmdInfo(n);
                YAHOO.log("RemarkFriend:" + m)
            }
        },
        getUinInfo: function(m, k) {
            var j = this,
            n = {
                onSuccess: j.onSuccLDGetUinInfo ||
                function(q) {
                    var r = j,
                    F = q.params,
                    C = q.info.other_uin;
                    if (!r.bdylist.allUsers[C]) {
                        r.bdylist.allUsers[C] = new WEBQQ.obj.USER(C, -1)
                    }
                    var I = r.bdylist.allUsers[C];
                    var D = String(F[3]);
                    D = D.split("\x1e");
                    I.nick = String(D[1] || C);
                    I.gender = (D[8] == "女") ? "女": "男";
                    I.face = parseInt(D[21]) || 0;
                    if ((I.face) >= r.cs_params.FACE_MAX_INDEX * 3) {
                        I.face = 0
                    }
                    var A = q.info.msg_array;
                    if (A.length >= 3) {
                        var G = A[0],
                        y = A[1],
                        x = A[2];
                        switch (parseInt(G)) {
                        case 1:
                        case 2:
                        case 4:
                            var o = parseInt(A[3]);
                            r.mainPanel.mf_addSysMsg({
                                cs_cmd: 128,
                                msg_type: parseInt(G),
                                from_uin: y,
                                to_uin: x,
                                msg_array: [],
                                time: o,
                                nick: I.nick
                            });
                            break;
                        case 40:
                            var z = String(A[3]);
                            var o = parseInt(A[4]);
                            r.mainPanel.mf_addSysMsg({
                                cs_cmd: 128,
                                msg_type: parseInt(G),
                                from_uin: y,
                                to_uin: x,
                                msg_array: [z],
                                time: o,
                                nick: I.nick
                            });
                            break;
                        case 41:
                            var s = unescape(A[3]),
                            u = parseInt(A[4]),
                            o = parseInt(A[5]);
                            r.mainPanel.mf_addSysMsg({
                                cs_cmd: 128,
                                msg_type: parseInt(G),
                                from_uin: y,
                                to_uin: x,
                                msg_array: [s, u],
                                time: o,
                                nick: I.nick
                            });
                            break;
                        case 42:
                            var u = parseInt(A[3]),
                            o = parseInt(A[4]);
                            r.mainPanel.mf_addSysMsg({
                                cs_cmd: 128,
                                msg_type: parseInt(G),
                                from_uin: y,
                                to_uin: x,
                                msg_array: [u],
                                time: o,
                                nick: I.nick
                            });
                            break;
                        case 3:
                        case 43:
                            var t = parseInt(A[3]),
                            o = parseInt(A[4]);
                            r.mainPanel.mf_addSysMsg({
                                cs_cmd: 128,
                                msg_type: parseInt(G),
                                from_uin: y,
                                to_uin: x,
                                msg_array: [t],
                                time: o,
                                nick: I.nick
                            });
                            var v = C;
                            if (r.isFriend(v) === -1) {
                                var H = parseInt(F[4]),
                                p = null,
                                B = null,
                                E = r.bdylist.groups;
                                if (!r.bdylist.allUsers[v]) {
                                    r.bdylist.allUsers[v] = new WEBQQ.obj.USER(v, t)
                                }
                                r.bdylist.allUsers[v].group_id = t;
                                var I = r.bdylist.allUsers[v];
                                I.face = 0;
                                if ((I.face) >= r.cs_params.FACE_MAX_INDEX) {
                                    I.face = 0
                                }
                                H = parseInt(F[4]);
                                if (H == 40) {
                                    H = 20
                                }
                                I.stat = H;
                                p = E[I.group_id];
                                B = E._1000;
                                var w = v;
                                switch (H) {
                                case 10:
                                    p.online_users.add_user(w);
                                    r.mainPanel.mf_addUser(w, "online", 1);
                                    E._1000.online_users.add_users(w);
                                    r.mainPanel.mf_addOnlineUser(w, "online", "_1000");
                                    break;
                                case 20:
                                    p.offline_users.add_user(w);
                                    r.mainPanel.mf_addUser(w, "offline", 1);
                                    break;
                                case 30:
                                    p.away_users.add_user(w);
                                    r.mainPanel.mf_addUser(w, "away", 1);
                                    E._1000.away_users.add_users(w);
                                    r.mainPanel.mf_addOnlineUser(w, "away", "_1000");
                                default:
                                    break
                                }
                                r.mainPanel.mf_updateGroupStat(p);
                                r.mainPanel.mf_updateGroupStat(B);
                                if (I.gender == "女") {
                                    if (H == 10 || H == 30) {
                                        r.bdylist.female.on++
                                    }
                                    r.bdylist.female.total++
                                } else {
                                    if (I.gender == "男") {
                                        if (H == 10 || H == 30) {
                                            r.bdylist.male.on++
                                        }
                                        r.bdylist.male.total++
                                    }
                                }
                                r.mainPanel.mf_updateGenderStat(r.bdylist.male, r.bdylist.female)
                            }
                            r.RemarkFriend(I);
                            break;
                        case 44:
                            var s = unescape(A[3]),
                            t = parseInt(msgArrar[4]),
                            o = parseInt(A[5]);
                            r.mainPanel.mf_addSysMsg({
                                cs_cmd: 128,
                                msg_type: parseInt(G),
                                from_uin: y,
                                to_uin: x,
                                msg_array: [s, t],
                                time: o,
                                nick: I.nick
                            });
                            break;
                        default:
                            break
                        }
                        if (!r.isMaskUserMsg()) {
                            r.playMsgSnd(2)
                        }
                    }
                },
                onFail: j.onFailLDGetUinInfo ||
                function() {},
                sscope: j,
                fscope: j,
                arguments: {
                    info: {
                        other_uin: m,
                        msg_array: k
                    }
                },
                cmd: "06",
                body: j.cs.cs0x06(m)
            };
            var l = this.getCmdInfo(n);
            YAHOO.log("getUinInfo:" + l)
        },
        sendRemoveBuddy: function(l, j) {
            l.cmd = "0a";
            l.body = this.cs.cs0x0a(j);
            var k = this.getCmdInfo(l);
            YAHOO.log("sendRemoveBuddy:" + k)
        },
        sendMoveBuddy: function(m, j, l) {
            m.cmd = "3d";
            m.body = this.cs.cs0x3d(j, l);
            var k = this.getCmdInfo(m);
            YAHOO.log("sendMoveBuddy:" + k)
        },
        sendMoveBuddyToBlacklist: function(l) {
            var k = false,
            j = false;
            var o = l.argument.friend_uin,
            p = l.argument.group_id;
            var r = this,
            q = {
                onSuccess: function(s) {
                    k = true;
                    if (j == true) {
                        l.onSuccess.call(l.scope, s)
                    }
                },
                onFail: function() {
                    alert("从自己好友列表删除好友的过程超时！")
                },
                sscope: r,
                fscope: r,
                arguments: {
                    info: {
                        friend_uin: o,
                        group_id: p
                    }
                },
                cmd: "0a",
                body: r.cs.cs0x0a(o)
            },
            n = {
                onSuccess: r.onSuccLDRemarkFriend ||
                function(s) {
                    j = true;
                    if (k == true) {
                        l.onSuccess.call(l.scope, s)
                    }
                },
                onFail: function() {
                    alert("从对方好友列表删除自己的过程超时！")
                },
                sscope: r,
                fscope: r,
                arguments: {
                    info: {
                        friend_uin: o,
                        group_id: p
                    }
                },
                cmd: "1c",
                body: r.cs.cs0x1c(o)
            };
            var m = this.getCmdInfo([q, n]);
            YAHOO.log("sendMoveBuddyToBlacklist:" + m)
        },
        isRetryLogin: function(k) {
            if (this.uin_online_stat == this.ONLINE_STAT_ENUM.offline) {
                if (this.evil_flag == true) {
                    if (confirm("您所在的网络可能存在危害其他QQ用户的行为，您的号码被迫下线。您重新登录时可能会被要求输入验证码，建议您检查一下您的上网环境是否安全。")) {
                        this.showLoginPage()
                    }
                    return true
                } else {
                    var j = this;
                    setTimeout(function() {
                        j.retryLogin.apply(j)
                    },
                    100)
                }
                return true
            } else {
                return false
            }
        },
        retryLogin: function() {
            this.reset();
            this.clearError();
            this.login_type = 2;
            this.beginOnIdle();
            this.getLoginInfo()
        },
        will_set_stat: null,
        changeStat2Online: function() {
            if (this.uin_online_stat == this.ONLINE_STAT_ENUM.online) {
                return
            }
            this.pre_online_stat = this.uin_online_stat;
            this.will_set_stat = this.ONLINE_STAT_ENUM.online;
            if (this.isRetryLogin()) {
                return
            }
            var j = this,
            l = {
                onSuccess: j.sc.sc0x0d ||
                function() {},
                onFail: function() {},
                sscope: j.sc,
                fscope: j.sc,
                arguments: {},
                cmd: "0d",
                body: j.cs.cs0x0d(10)
            };
            var k = this.getCmdInfo(l);
            YAHOO.log("changeStat2Online:" + k)
        },
        changeStat2Away: function() {
            if (this.uin_online_stat == this.ONLINE_STAT_ENUM.away) {
                return
            }
            this.pre_online_stat = this.uin_online_stat;
            this.will_set_stat = this.ONLINE_STAT_ENUM.away;
            if (this.isRetryLogin()) {
                return
            }
            var j = this,
            l = {
                onSuccess: j.sc.sc0x0d ||
                function() {},
                onFail: function() {},
                sscope: j.sc,
                fscope: j.sc,
                arguments: {},
                cmd: "0d",
                body: j.cs.cs0x0d(30)
            };
            var k = this.getCmdInfo(l);
            YAHOO.log("changeStat2Away:" + k)
        },
        changeStat2Busy: function() {
            if (this.uin_online_stat == this.ONLINE_STAT_ENUM.busy) {
                return
            }
            this.pre_online_stat = this.uin_online_stat;
            this.will_set_stat = this.ONLINE_STAT_ENUM.busy;
            if (this.isRetryLogin()) {
                return
            }
            var j = this,
            l = {
                onSuccess: j.sc.sc0x0d ||
                function() {},
                onFail: function() {},
                sscope: j.sc,
                fscope: j.sc,
                arguments: {},
                cmd: "0d",
                body: j.cs.cs0x0d(30)
            };
            var k = this.getCmdInfo(l);
            YAHOO.log("changeStat2Busy:" + k)
        },
        changeStat2Invisible: function() {
            if (this.uin_online_stat == this.ONLINE_STAT_ENUM.invisible) {
                return
            }
            this.pre_online_stat = this.uin_online_stat;
            this.will_set_stat = this.ONLINE_STAT_ENUM.invisible;
            if (this.isRetryLogin(true)) {
                return
            }
            var j = this,
            l = {
                onSuccess: j.sc.sc0x0d ||
                function() {},
                onFail: function() {},
                sscope: j.sc,
                fscope: j.sc,
                arguments: {},
                cmd: "0d",
                body: j.cs.cs0x0d(40)
            };
            var k = this.getCmdInfo(l);
            YAHOO.log("changeStat2Invisible:" + k)
        },
        changeStat2Offline: function() {
            if (this.uin_online_stat == this.ONLINE_STAT_ENUM.offline) {
                return
            }
            this.pre_online_stat = this.uin_online_stat;
            this.will_set_stat = this.ONLINE_STAT_ENUM.offline;
            var j = this,
            l = {
                onSuccess: j.sc.sc0x0d ||
                function() {},
                onFail: function() {},
                sscope: j.sc,
                fscope: j.sc,
                arguments: {},
                cmd: "0d",
                body: j.cs.cs0x0d(20)
            };
            var k = this.getCmdInfo(l);
            YAHOO.log("changeStat2Offline:" + k)
        },
        toString: function() {
            return "WEBQQ.obj.QQClient Singleton Object"
        }
    }
})(); (function() {
    var d = YAHOO.util.Event;
    function c(f) {
        f = d.getEvent(f);
        var e = d.getTarget(f);
        if ((e.tagName.toUpperCase() != "INPUT" || e.type.toUpperCase() == "PASSWORD") && e.tagName.toUpperCase() != "TEXTAREA" && e.tagName.toUpperCase() != "LI") {
            d.preventDefault(f);
            d.stopPropagation(f)
        }
    }
    function b(e) {}
    function a() {
        YAHOO.log = function() {};
        YAHOO.log("WEBQQ.obj.QQClient.init will execute...");
        WEBQQ.obj.QQClient.init();
        YAHOO.log("WEBQQ.obj.QQClient.init executed...", "info");
        if (d.isIE) {
            d.on(window.document, "selectstart",
            function(e) {
                b(e)
            });
            d.on(window.document, "dragstart",
            function(e) {
                b(e)
            })
        }
        d.on(window.document, "contextmenu",
        function(e) {
            b(e)
        })
    }
    d.onDOMReady(a)
})();