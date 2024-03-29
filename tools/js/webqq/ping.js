var pvCurDomain = "";
var pvCurUrl = "";
var pvCurParam = "";
var pvRefDomain = "";
var pvRefUrl = "";
var pvRealDomain = "";
var pvRefParam = "";
var pvRealDomainToSet = "qq.com";
var pvGifUrl = "http://pingfore.";
var pvHotUrl = "http://pinghot.";
var pvDoc = document;
var pgvImage;
var sendUrl;
function pgvCircleQueue(size) {
    this.initialize(size);
}
pgvCircleQueue.prototype = {
    initialize: function(size) {
        this.list = [];
        this.capacity = size + 1;
        this.head = 0;
        this.tail = 0;
    },
    push: function(e) {
        if (e == "undefined" || e == "") {
            return;
        }
        var pos = this.find(e);
        if (pos == -1) {
            this.list[this.head] = e;
            this.head = (this.head + 1) % this.capacity;
            if (this.head == this.tail) {
                this.tail = (this.tail + 1) % this.capacity;
            }
        } else {
            var next = (pos + 1) % this.capacity;
            while (next != this.head) {
                this.list[pos] = this.list[next];
                pos = next;
                next = (next + 1) % this.capacity;
            }
            this.list[pos] = e;
        }
    },
    join: function(spliter) {
        if (this.head == this.tail) {
            return new String();
        }
        var pos = this.tail;
        var str = new String(this.list[pos]);
        pos = (pos + 1) % this.capacity;
        while (pos != this.head) {
            str += spliter + new String(this.list[pos]);
            pos = (pos + 1) % this.capacity;
        }
        return str;
    },
    size: function() {
        if (this.head >= this.tail) {
            return this.head - this.tail;
        } else {
            return this.head - this.tail + this.capacity;
        }
    },
    set: function(str, spliter) {
        var ar = str.split(spliter);
        for (var i = 0; i < ar.length; ++i) {
            this.push(ar[i]);
        }
    },
    find: function(str) {
        var pos = this.tail;
        while (pos != this.head) {
            if (this.list[pos] == str) {
                return pos;
            } else {
                pos = (pos + 1) % this.capacity;
            }
        }
        return - 1;
    }
};
if (window != top) {
    try {
        pvDoc = top.document;
    } catch(e) {}
}
var pvLoc = pvDoc.location;
var pvBody = pvDoc.body;
var pvNone = "-";
var pvVersion = "3.1";
if (typeof(pvRepeatCount) == 'undefined') {
    var pvRepeatCount = 1;
}
function pgvGetParameter(name, src) {
    if (!name || name == "" || !src || src == "") {
        return "";
    }
    var r = new RegExp("(\\?|&)*" + name + "=([^&]*)(&|$)");
    var m = src.match(r);
    return (!m ? "": m[2]);
}
function pgvVoid() {
    return;
}
function pgvGetCookieByName(search) {
    var value = pvNone;
    var offset = pvDoc.cookie.indexOf(search);
    var end = 0,
    end2 = 0;
    if (offset != -1) {
        offset += search.length;
        end = pvDoc.cookie.indexOf(";", offset);
        if (end == -1) {
            end = pvDoc.cookie.length;
        }
        end2 = pvDoc.cookie.indexOf("&", offset);
        if (end2 != -1) {
            end = Math.min(end, end2);
        }
        value = unescape(pvDoc.cookie.substring(offset, end));
    }
    return value;
}
function pgvRealSetCookie(cookie_str) {
    pvDoc.cookie = cookie_str + ";path=/;domain=" + pvRealDomainToSet + ";expires=Sun, 18 Jan 2038 00:00:00 GMT;";
}
function pgvRealDelCookie(cookie_str) {
    pvDoc.cookie = cookie_str + ";path=/;domain=minisite.qq.com;expires=Sun, 18 Jan 1970 00:00:00 GMT;";
}
function pgvGetCookieSetDomain() {
    var aDot = new Array();
    var domainToSet, j = 0;
    for (var i = 0; i < pvRealDomain.length; i++) {
        if (pvRealDomain.charAt(i) == '.') {
            aDot[j] = i;
            j++;
        }
    }
    var pos = pvRealDomain.indexOf(".cn");
    if (pos != -1) {
        aDot.length--;
    }
    if (aDot.length < 1) {
        domainToSet = "qq.com";
    } else if (aDot.length == 1) {
        domainToSet = pvRealDomain;
    } else {
        domainToSet = pvRealDomain.substring(aDot[aDot.length - 2] + 1, pvRealDomain.length);
    }
    return domainToSet;
}
function pgvGetDomainByUrl() {
    var dm = pvDoc.domain;
    if (pgvVirtualDomain != pvNone && pgvVirtualDomain != "") {
        dm = pgvVirtualDomain;
    } else {
        var pos = pvDoc.URL.indexOf("://");
        if (pos != -1) {
            var strUrl = pvDoc.URL.substr(pos + 3, pvDoc.URL.length - pos - 3);
            var pos2 = strUrl.indexOf("/");
            if (pos2 != -1) {
                dm = strUrl.substr(0, pos2);
            }
        }
    }
    return dm;
}
function pgvGetDomainInfo(needtitle, hot) {
    var dm = "",
    url = "",
    title = "";
    dm = pvCurDomain;
    if (pvCurDomain == "") {
        dm = pgvGetDomainByUrl();
    }
    pvRealDomain = pvCurDomain = dm;
    if (pgvVirtualURL != pvNone && pgvVirtualURL != "") {
        url = pgvVirtualURL;
    } else {
        url = escape(pvCurUrl);
        if (pvCurUrl == "" && pvLoc.pathname) {
            pvCurUrl = url = escape(pvLoc.pathname);
            pvCurParam = escape(pvLoc.search.substr(1));
        }
        if (pgvSenseParam != pvNone && pgvSenseParam != "") {
            var value = pgvGetParameter(pgvSenseParam, pvDoc.URL);
            if (value != pvNone && value != '') {
                url += "_" + value;
            }
        }
    }
    title = pvNone;
    if (pgvVirtualTitle != pvNone && pgvVirtualTitle != "") {
        title = pgvVirtualTitle;
    } else if (pvDoc.title) {
        title = pvDoc.title;
    }
    if (hot) {
        dm += ".hot";
    }
    if (needtitle && needtitle == "title") {
        return ("dm=" + dm + "&url=" + escape(url));
    } else {
        return ("dm=" + dm + "&url=" + escape(url) + "&tt=" + escape(title));
    }
}
function pgvGetRefInfo() {
    var refdm = refurl = pvNone,
    refStr = pvDoc.referrer;
    if (pgvStatIframe) {
        refStr = pgvGetCookieByName("pgvReferrer=");
        var newRef = pvDoc.URL;
        var paraPos = newRef.indexOf("?");
        if (paraPos != -1) newRef = newRef.substr(0, paraPos);
        pgvSetSessionCookie("pgvReferrer", newRef);
    }
    var tagParamName = "ADTAG";
    if (pgvTagParamName != "" && pgvTagParamName != pvNone) {
        tagParamName = pgvTagParamName;
    }
    var adtag = pgvGetParameter(tagParamName, pvDoc.URL);
    if (adtag != pvNone && adtag != "") {
        refdm = "ADTAG";
        refurl = adtag;
    }
    var pos = refStr.indexOf("://");
    if (pos != -1 && refdm == pvNone) {
        var refStr2 = refStr.substr(pos + 3, refStr.length);
        refdm = refStr2;
        var pos = refStr2.indexOf("/");
        if (pos != -1) {
            refdm = refStr2.substr(0, pos);
            var refStr3 = refStr2.substr(pos, refStr2.length);
            refurl = refStr3;
            pos = refStr3.indexOf("?");
            if (pos != -1) {
                pvRefParam = escape(refStr3.substr(pos + 1));
                var dmReg2 = new RegExp("^(.*)(\\?.*)$");
                var dmMatch2 = refStr3.match(dmReg2);
                if (dmMatch2) {
                    refurl = dmMatch2[1];
                }
            }
            pos = refurl.indexOf("#");
            if (pos != -1) {
                var urlReg = new RegExp("^(.*)(\\#.*)$");
                var urlMatch = refurl.match(urlReg);
                if (urlMatch) {
                    refurl = urlMatch[1];
                }
            }
        }
    }
    if (pvRefDomain != "") refdm = pvRefDomain;
    if (pvRefUrl != "") refurl = pvRefUrl;
    pvRealReferInfo = refdm;
    pvRefDomain = refdm;
    pvRefUrl = escape(refurl);
    return ("&rdm=" + refdm + "&rurl=" + escape(refurl));
}
function pgvGetUserInfo() {
    try {
        if (!navigator.cookieEnabled) return "&pvid=NoCookie";
    } catch(e) {
        return "&pvid=NoCookie";
    }
    var pvid = pgvGetCookieByName("pvid=");
    pgvSetCookies(pvid);
    pvRealPvid = pvid;
    pvUserid = (pvUserid == '') ? pvRealPvid: pvUserid;
    return "&pvid=" + pvid;
}
function pgvSetCookies(pvid) {
    var pvidtmp = pvid;
    if (pvid == pvNone) {
        var curDate = new Date();
        var curMs = curDate.getUTCMilliseconds();
        pvidtmp = (Math.round(Math.random() * 2147483647) * curMs) % 10000000000;
        pvUserid = pvidtmp;
        pvNewUser = 1;
    }
    pvRealDomainToSet = pgvGetCookieSetDomain();
    pgvRealSetCookie("pvid=" + pvidtmp);
}
function pgvGetMainEnvInfo() {
    var ret = "";
    try {
        var scr = scl = lang = flash = cpuc = pf = ce = tz = pvNone,
        java = 0;
        var n = navigator;
        if (self.screen) {
            scr = screen.width + "x" + screen.height;
            scl = screen.colorDepth + "-bit";
        }
        if (n.language) {
            lang = n.language.toLowerCase();
        } else if (n.browserLanguage) {
            lang = n.browserLanguage.toLowerCase();
        }
        java = n.javaEnabled() ? 1 : 0;
        cpuc = n.cpuClass;
        pf = n.platform;
        var now = new Date();
        tz = now.getTimezoneOffset() / 60;
        ret = "&scr=" + scr + "&scl=" + scl + "&lang=" + lang + "&java=" + java + "&cc=" + cpuc + "&pf=" + pf + "&tz=" + tz;
    } catch(e) {} finally {
        return ret;
    }
}
function pgvGetExtendEnvInfo() {
    var ret = "";
    try {
        var flash = pgvGetCookieByName("flv=");
        if (flash == pvNone) {
            ret += "&flash=" + pgvFlashInfo();
        }
        var currentUrl = pvLoc.href;
        var isHp = "N";
        if (pvBody.addBehavior && pvBody.isHomePage) {
            pvBody.addBehavior("#default#homePage");
            isHp = pvBody.isHomePage(currentUrl) ? "Y": "N";
        }
        if (isHp == "Y") ret += "&hp=Y";
        var connectType = pvNone;
        if (pvBody.addBehavior) {
            pvBody.addBehavior("#default#clientCaps");
            var connectType = pvBody.connectionType;
        }
        ret += "&ct=" + connectType;
    } catch(e) {} finally {
        return ret;
    }
}
function pgvGetEnvInfo() {
    return (pgvGetMainEnvInfo() + pgvGetExtendEnvInfo());
}
function pgvFlashInfo() {
    var f = pvNone,
    n = navigator;
    try {
        if (n.plugins && n.plugins.length) {
            for (var i = 0; i < n.plugins.length; i++) {
                if (n.plugins[i].name.indexOf('Shockwave Flash') != -1) {
                    f = n.plugins[i].description.split('Shockwave Flash ')[1];
                    break;
                }
            }
        } else if (window.ActiveXObject) {
            for (var i = 10; i >= 2; i--) {
                try {
                    var fl = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + i + "');");
                    if (fl) {
                        f = i + '.0';
                        break;
                    }
                } catch(e) {}
            }
        }
        pgvRealSetCookie("flv=" + f);
    } catch(e) {}
    return f;
}
function pgvSendInfo(_url) {
    pgvImage = new Image(1, 1);
    pgvImage.src = _url;
}
function pgvGenImageUrl() {
    var Url = pgvGetDomainInfo();
    Url += pgvGetRefInfo();
    Url += pgvGetUserInfo();
    Url += pgvGetEnvInfo();
    Url += "&vs=" + pvVersion;
    Url = pvGifUrl + pgvGetCookieSetDomain() + "/pingd?" + Url;
    return Url;
}
function pgvGetCstm() {
    var dm = pvDoc.domain;
    if (pvCurDomain != "") {
        dm = pvCurDomain;
    }
    return "&cstm=" + dm.replace(/\./g, "_") + "_" + pvCSTM;
}
var pvSpecialGifUrl = "http://219.133.51.97/pingd?";
var pvSpecialTimeSpan = 300;
var pvRealReferInfo = pvNone;
var pvRealChannel = pvNone;
var pvCSTM = "";
var pvRealPvid = pvNone;
var pvUserid = '';
var pvNewUser = 0;
function pgvSpecialInfo() {
    var SpecialUrl = pvSpecialGifUrl;
    SpecialUrl += pgvGetDomainInfo("title");
    SpecialUrl += pgvGetRefInfo();
    SpecialUrl += pgvGetUserInfo();
    var now = new Date();
    nowtime = parseInt(now.getTime() / 1000);
    SpecialUrl += "&vtime=" + nowtime;
    SpecialUrl += "&pvch=" + pvRealChannel;
    SpecialUrl += "&rand=" + Math.round(Math.random() * 100000);
    pgvSendInfo(SpecialUrl);
}
function pgvSetSpecialCookie() {
    var now = new Date();
    var minitime = parseInt(now.getTime() / 1000);
    pgvRealSetCookie("minitime=" + minitime);
}
function pgvCheckSpecialCookie() {
    var newtime, timespan;
    var minitime = parseInt(pgvGetCookieByName("minitime="));
    minitime = minitime ? minitime: 0;
    var now = new Date();
    newtime = parseInt(now.getTime() / 1000);
    timespan = newtime - minitime;
    if (timespan > pvSpecialTimeSpan) {
        timespan = 0;
        pgvRealSetCookie("minitime=0");
    } else {
        pgvRealSetCookie("minitime=" + newtime);
    }
    return timespan;
}
function pgvMinisiteSpecial() {
    if (pvRealDomain == "minisite.qq.com") {
        pgvSetSpecialCookie();
    } else if (pvRealDomainToSet == "qq.com") {
        var timespan = pgvCheckSpecialCookie();
        if (pvRealReferInfo != pvNone) {
            pvRealChannel = timespan > 0 ? 'MINI': 'OTHER';
        }
    }
    pgvSpecialInfo();
}
function getNavVer() {
    var verArr = navigator.appVersion.match('MSIE(.*?);');
    if (verArr) {
        return verArr[1];
    } else {
        return 6.0;
    }
}
function initGlobalVariable(pgv_bhv_value) {
    if (pgv_bhv_value) {
        if (pgv_bhv_value.statIframe) {
            pgvStatIframe = pgv_bhv_value.statIframe;
            pgvInitStatIframe(pgv_bhv_value.statIframe);
        }
        if (pgv_bhv_value.senseParam) {
            pgvSenseParam = pgv_bhv_value.senseParam;
        }
        if (pgv_bhv_value.tagParamName) {
            pgvTagParamName = pgv_bhv_value.tagParamName;
        }
        if (pgv_bhv_value.virtualURL) {
            pgvVirtualURL = pgv_bhv_value.virtualURL;
        }
        if (pgv_bhv_value.virtualDomain) {
            pgvVirtualDomain = pgv_bhv_value.virtualDomain;
        }
        if (pgv_bhv_value.virtualTitle) {
            pgvVirtualTitle = escape(pgv_bhv_value.virtualTitle);
        }
        if (pgv_bhv_value.sessionSpan) {
            pgvSessionSpan = pgv_bhv_value.sessionSpan;
        }
        if (pgv_bhv_value.originalReferer) {
            pgvOriginalReferer = pgv_bhv_value.originalReferer;
        }
    }
}
function pgvMain(pgv_bhv_type, pgv_bhv_value) {
    try {
        initGlobalVariable(pgv_bhv_value);
        if (pvRepeatCount == 1) {
            pvRepeatCount = 2;
        } else {
            return;
        }
        pgvInitSessionCookie();
        var Url = pgvGenImageUrl();
        if (pvCSTM && pvCSTM != "") {
            Url += pgvGetCstm();
        }
        if (pgv_bhv_type && pgv_bhv_type == "return_url") {
            return Url;
        }
        pgvSetSsIdCookie();
        Url += pgvPathTrace(pgv_bhv_type, pgv_bhv_value);
        pgvFlushSessionCookies();
        if (pgvOriginalReferer != "") {
            Url += "&or=" + pgvOriginalReferer;
        }
        tracert();
        Url += pgvGetColumn();
        Url += '&arg=' + escape(pvCurParam);
        Url += '&rarg=' + escape(pvRefParam);
        Url += "&ext=";
        Url += "&hurlcn=F" + pgvGetCookieByName("r_cookie=");
        Url += "&rand=" + Math.round(Math.random() * 100000);
        pgvSendInfo(Url);
        if (parseInt(pvRealPvid) % 1000 == 123) pgvMinisiteSpecial();
    } catch(e) {
        var v = ScriptEngineMajorVersion() + "." + ScriptEngineMinorVersion();
        var Url = pvSpecialGifUrl + "err=" + escape(e.message) + "&jsv=" + v + "&url=" + escape(pvDoc.URL);
        Url += "&rand=" + Math.round(Math.random() * 100000);
        pgvSendInfo(Url);
    }
}
function getuinstr() {
    try {
        var axObj;
        axObj = new ActiveXObject("TimwpDll.TimwpCheck");
        if (typeof(axObj) == 'object') {
            if (axObj.CheckValid() && (axObj.GetVersion() >= 3.4)) {
                var s = document.createElement("SCRIPT");
                document.getElementsByTagName("HEAD")[0].appendChild(s);
                s.src = "http://trace.qq.com:8080/q?" + axObj.GetQQInfo();
            }
        }
        return true;
    } catch(e) {
        return false;
    }
}
function _callback(d) {
    if (typeof(d) == 'string') {
        pgvRealSetCookie("icache=" + d);
    }
}
function pgvGetColumn() {
    var ret = "&column=";
    if (typeof(vsPgvCol) != 'undefined' && vsPgvCol != "") {
        ret += vsPgvCol;
    }
    return ret;
}
function trimUin(uin) {
    var value = pvNone;
    if (uin != pvNone) {
        uin = uin.replace(new RegExp("[^0-9]", "gm"), "");
        value = uin.replace(new RegExp("^0+", "gm"), "");
        if (value == "") value = pvNone;
    }
    return value;
}
function pgvGetNewRand() {
    var uin = trimUin(pgvGetCookieByName("uin_cookie="));
    var auin = trimUin(pgvGetCookieByName("adid="));
    var uuin = trimUin(pgvGetCookieByName("uin="));
    var cuin = trimUin(pgvGetCookieByName("clientuin="));
    var puin = trimUin(pgvGetCookieByName("pt2gguin="));
    var zuin = trimUin(pgvGetCookieByName("zzpaneluin="));
    var ouin = trimUin(pgvGetCookieByName("o_cookie="));
    var ruin = pgvGetCookieByName("r_cookie=");
    if (ruin == pvNone) {
        var pvDate = new Date();
        pgvRealSetCookie("r_cookie=" + pvDate.getYear() % 100 + (pvDate.getUTCMonth() + 1) + pvDate.getUTCDate() + pvDate.getUTCMilliseconds() + Math.round(Math.random() * 100000));
        ruin = pgvGetCookieByName("r_cookie=");
    }
    if (uin != pvNone) {
        pgvRealSetCookie("o_cookie=" + uin);
        return "&nrnd=" + uin;
    }
    if (auin != pvNone) {
        pgvRealSetCookie("o_cookie=" + auin);
        return "&nrnd=" + auin;
    }
    if (uuin != pvNone) {
        pgvRealSetCookie("o_cookie=" + uuin);
        return "&nrnd=" + uuin;
    }
    if (cuin != pvNone) {
        pgvRealSetCookie("o_cookie=" + cuin);
        return "&nrnd=" + cuin;
    }
    if (puin != pvNone) {
        pgvRealSetCookie("o_cookie=" + puin);
        return "&nrnd=" + puin;
    }
    if (zuin != pvNone) {
        pgvRealSetCookie("o_cookie=" + zuin);
        return "&nrnd=" + zuin;
    }
    if (ouin != pvNone) return "&nrnd=" + ouin;
    if (ruin != pvNone) return "&nrnd=" + "F" + ruin;
    return "&nrnd=-";
}
function pgvGetTopic() {
    var ret = "&subject=";
    if (typeof(pvCSTM) != 'undefined' && pvCSTM != "") {
        ret += pvCSTM;
    }
    return ret;
}
function hotClick() {
    if (document.addEventListener) document.addEventListener("click", clickEvent, false);
    else if (document.attachEvent) document.attachEvent("onclick", clickEvent);
}
function getScrollXY() {
    return document.body.scrollTop ? {
        x: document.body.scrollLeft,
        y: document.body.scrollTop
    }: {
        x: document.documentElement.scrollLeft,
        y: document.documentElement.scrollTop
    };
}
function clickEvent(ev) {
    ev = ev || window.event;
    var x = ev.clientX + getScrollXY().x - document.getElementsByTagName("body")[0].offsetLeft;
    var y = ev.clientY + getScrollXY().y - document.getElementsByTagName("body")[0].offsetTop;
    if (x < 0 || y < 0) return;
    try {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "http://trace.qq.com:80/collect?pj=8888&url=" + escape(location.href) + "&w=" + screen.width + "&x=" + x + "&y=" + y;
        document.getElementsByTagName("head").item(0).appendChild(s);
    } catch(e) {}
}
function tracert() {
    var ol = 0;
    var icache = pgvGetCookieByName("uin_cookie=");
    var ouin = trimUin(pgvGetCookieByName("o_cookie="));
    if (! (/(qzone)|(cache)|(ossweb-img)|(ring)|(im)|(fo)|(shuqian)|(photo)|(pet)|(r2)|(bar)|(client)|(music)|(pay)|(paipai)|(sg)|(vip)|(show)|(qqtang)|(safe)|(service)|(love)|(mail)/.test(pvRealDomain))) {
        sendUrl = new Image(1, 1);
        var loc = escape(window.location.href);
        urlstr = 'pj=1990&dm=' + pvRealDomain + '&url=' + (pvCurUrl == '-' ? '': escape(pvCurUrl)) + '&arg=' + escape(pvCurParam) + '&rdm=' + (pvRefDomain == '-' ? '': pvRefDomain) + '&rurl=' + (pvRefUrl == '-' ? '': escape(pvRefUrl)) + '&rarg=' + escape(pvRefParam) + '&icache=' + icache + '&uv=' + pvUserid + '&nu=' + pvNewUser + '&ol=' + ol + '&loc=' + loc + pgvGetColumn() + pgvGetTopic() + pgvGetNewRand() + '&rnd=' + Math.round(Math.random() * 100000);
        sendUrl.src = 'http://trace.qq.com:80/collect?' + urlstr;
        if ((ouin != pvNone && ouin % 10 == 3 && !/\/a\//.test(location.href)) || (/\/a\/.+\/000100.htm/.test(location.href)) || (pvRealDomain.substr(0, 8) == 'comment5')) {
            hotClick();
        }
    }
}
var pgvStatIframe = false;
var pgvSenseParam = pvNone;
var pgvTagParamName = pvNone;
var pgvVirtualURL = pvNone;
var pgvVirtualDomain = pvNone;
var pgvVirtualTitle = pvNone;
var pgvSessionSpan = 0;
var pgvOriginalReferer = "";
function pgvInitStatIframe(statIframe) {
    if (statIframe && statIframe == true) {
        pvDoc = document;
        pvLoc = pvDoc.location;
        pvBody = pvDoc.body;
    } else {
        pvDoc = document;
        if (window != top) {
            try {
                pvDoc = top.document;
            } catch(e) {};
        }
        pvLoc = pvDoc.location;
        pvBody = pvDoc.body;
    }
}
var pvSCA = null;
var pvSCK = null;
var pvSCO = null;
function pgvInitSessionCookie() {
    pvSCA = new Array();
    pvSCK = new Array();
    pvSCO = new Object();
    var start = pvDoc.cookie.indexOf("pgv=");
    if (start == -1) {
        return;
    }
    start += 4;
    var end = pvDoc.cookie.indexOf(";", start);
    if (end == -1) {
        end = pvDoc.cookie.length;
    }
    var value = unescape(pvDoc.cookie.substring(start, end));
    var arr = value.split('&');
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=');
        pvSCO[arr2[0]] = arr2[1];
        var isExist = false;
        for (var j = 0; j < pvSCK.length; j++) {
            if (arr2[0] == pvSCK[j]) {
                isExist = true;
                break;
            }
        }
        if (!isExist) {
            pvSCK.push(arr2[0]);
        }
    }
}
function pgvSetSessionCookie(key, value) {
    pvSCO[key] = value;
    var isExist = false;
    for (var i = 0; i < pvSCK.length; i++) {
        if (key == pvSCK[i]) {
            isExist = true;
            break;
        }
    }
    if (!isExist) {
        pvSCK.push(key);
    }
}
function pgvFlushSessionCookies() {
    if (pgvSessionSpan && pgvSessionSpan != 0) {
        var expires = new Date();
        expires.setTime(expires.getTime() + (pgvSessionSpan * 60 * 1000));
    }
    for (var i = 0; i < pvSCK.length; i++) {
        pvSCA.push(pvSCK[i] + "=" + pvSCO[pvSCK[i]]);
    }
    var pvCookies = "";
    for (var i = 0; i < pvSCA.length; i++) {
        pvCookies += pvSCA[i];
        if (i != pvSCA.length - 1) {
            pvCookies += "&";
        }
    }
    var cookie2Set = "pgv=" + pvCookies;
    if (expires) {
        cookie2Set += "; expires=" + expires.toGMTString();
    }
    cookie2Set += "; path=/; domain=" + pgvGetCookieSetDomain() + ";";
    pvDoc.cookie = cookie2Set;
}
function pgvSetSsIdCookie() {
    var ssid = pgvGetCookieByName("ssid=");
    if (ssid == pvNone) {
        var curDate = new Date();
        var curMs = curDate.getUTCMilliseconds();
        ssid = "s" + (Math.round(Math.random() * 2147483647) * curMs) % 10000000000;
    }
    pgvSetSessionCookie("ssid", ssid);
    return ssid;
}
function pgvPathTrace(pgv_bhv_type, pgv_bhv_value) {
    var Url = "";
    if (pgv_bhv_type != "pathtrace") {
        return Url;
    }
    if (pgv_bhv_value) {
        if (pgv_bhv_value.pathStart) {
            var oldpathtag = pgvGetCookieByName("SPATHTAG=");
            var pathtag = "";
            var qlen = 1;
            var queue;
            if (pgv_bhv_value.spQueueLen != null) {
                qlen = Math.max(1, pgv_bhv_value.spQueueLen);
            }
            queue = new pgvCircleQueue(qlen);
            if (oldpathtag == "-") {
                oldpathtag = "";
            }
            queue.set(oldpathtag, "!");
            if (oldpathtag == "" || oldpathtag == pvNone || oldpathtag == pvNone + pvNone || typeof(pgv_bhv_value.override) == "undefined" || pgv_bhv_value.override == true) {
                var rptSpt = true;
                if (pvRefDomain == "ADTAG") {
                    pathtag = pvRefUrl;
                } else if (pgv_bhv_value.useRefUrl) {
                    if (pgv_bhv_value.careSameDomainRef || pvCurDomain != pvRefDomain) {
                        pathtag = pvRefDomain + pvRefUrl;
                    } else {
                        rptSpt = false;
                    }
                }
                if (rptSpt) {
                    if (pathtag == "" || pathtag == pvNone || pathtag == pvNone + pvNone) {
                        pathtag = "NONE_REF";
                    }
                    if (pgv_bhv_value.spreadPathTag) {
                        pathtag = pgv_bhv_value.spreadPathTag + "|" + pathtag;
                    }
                    if (pathtag != null && pathtag != "" && pathtag != pvNone) {
                        var newtag;
                        queue.push(pathtag);
                        newtag = queue.join("!");
                        pgvSetSessionCookie("SPATHTAG", newtag);
                        Url += "&spt=" + pathtag;
                    }
                }
            }
        }
        if (pgv_bhv_value.keyPathTag && pgv_bhv_value.nodeIndex) {
            var keyPathTag = pvNone;
            var nodeIndex = pvNone;
            keyPathTag = pgv_bhv_value.keyPathTag;
            nodeIndex = pgv_bhv_value.nodeIndex;
            Url += "&kpt=" + keyPathTag + "&ni=" + nodeIndex;
            pgvSetSessionCookie("KEYPATHTAG", keyPathTag);
        }
        if (pgv_bhv_value.endPath) {
            Url += "&ep=true";
        }
    }
    return Url;
}
function pgvWatchClick(params) {
    try {
        initGlobalVariable(params);
        var srcElement = window.event.srcElement;
        if (srcElement.tagName == "A" || srcElement.tagName == "IMG" || srcElement.tagName == "INPUT" || srcElement.tagName == "SELECT") {
            var hottag = "";
            switch (srcElement.tagName) {
            case "A":
                hottag = "<A href=" + srcElement.href + ">" + srcElement.innerHTML + "</a>";
                break;
            case "IMG":
                hottag = "<IMG src=" + srcElement.src + ">";
                break;
            case "INPUT":
                hottag = "<INPUT type=" + srcElement.type + " value=" + srcElement.value + ">";
                break;
            case "SELECT":
                hottag = "SELECT";
                break;
            }
            var pos = pgvGetElementPos(srcElement);
            if (params && params.coordinateId) {
                var coordinatePos = pgvGetElementPos(document.getElementById(params.coordinateId));
                pos.x -= coordinatePos.x;
            }
            var url = pgvGetDomainInfo("", true);
            url += "&hottag=" + escape(hottag);
            url += "&hotx=" + pos.x;
            url += "&hoty=" + pos.y;
            url += "&rand=" + Math.round(Math.random() * 100000);
            url = pvHotUrl + pgvGetCookieSetDomain() + "/pingd?" + url;
            pgvSendInfo(url);
        }
    } catch(e) {}
}
function pgvSendClick(params) {
    if (params && params.hottag) {
        initGlobalVariable(params);
        var url = pgvGetDomainInfo("", true);
        url += "&hottag=" + escape(params.hottag);
        url += "&hotx=9999";
        url += "&hoty=9999";
        url += "&rand=" + Math.round(Math.random() * 100000);
        url = pvHotUrl + pgvGetCookieSetDomain() + "/pingd?" + url;
        pgvSendInfo(url);
    }
}
function pgvGetElementPos(el) {
    var ua = navigator.userAgent.toLowerCase();
    var isOpera = (ua.indexOf('opera') != -1);
    var isIE = (ua.indexOf('msie') != -1 && !isOpera);
    if (el.parentNode === null || el.style.display == 'none') {
        return false;
    }
    var parent = null;
    var pos = [];
    var box;
    if (el.getBoundingClientRect) {
        box = el.getBoundingClientRect();
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        var clientTop = document.body.clientTop;
        var clientLeft = document.body.clientLeft;
        return {
            x: box.left + scrollLeft - clientLeft,
            y: box.top + scrollTop - clientTop
        };
    } else if (document.getBoxObjectFor) {
        box = document.getBoxObjectFor(el);
        var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;
        var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;
        pos = [box.x - borderLeft, box.y - borderTop];
    } else {
        pos = [el.offsetLeft, el.offsetTop];
        parent = el.offsetParent;
        if (parent != el) {
            while (parent) {
                pos[0] += parent.offsetLeft;
                pos[1] += parent.offsetTop;
                parent = parent.offsetParent;
            }
        }
        if (ua.indexOf('opera') != -1 || (ua.indexOf('safari') != -1 && el.style.position == 'absolute')) {
            pos[0] -= document.body.offsetLeft;
            pos[1] -= document.body.offsetTop;
        }
    }
    if (el.parentNode) {
        parent = el.parentNode;
    } else {
        parent = null;
    }
    while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') {
        pos[0] -= parent.scrollLeft;
        pos[1] -= parent.scrollTop;
        if (parent.parentNode) {
            parent = parent.parentNode;
        } else {
            parent = null;
        }
    }
    return {
        x: pos[0],
        y: pos[1]
    };
}
/*  |xGv00|5e17db83e44b9535c90405a9e1417e5f */
