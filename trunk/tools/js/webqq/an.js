var r = new Object(),
_dm = window.location.href,
_pr = document.referrer,
_px,
_pid,
_cid,
_pidf,
_cidf,
rp,
rc,
_pi;
function _gv(name) {
    var str = window.location.search,
    pst, pen;
    if (str.indexOf(name) != -1) {
        pst = str.indexOf(name) + name.length + 1;
        pen = str.indexOf("&", pst);
        if (pen == -1) {
            return str.substring(pst);
        } else {
            return str.substring(pst, pen);
        }
    } else {
        return null;
    }
}
rp = _gv('pid');
rc = _gv('cid');
_pi = _pr.indexOf('?');
if (_pi == -1) {
    _px = _pr
} else {
    _px = _pr.substring(0, _pi);
}
function _ssc(_nm) {
    var _st = document.cookie.indexOf(_nm + "=");
    var _l = _st + _nm.length + 1;
    if ((!_st) && (_nm != document.cookie.substring(0, _nm.length))) {
        return '';
    }
    if (_st == -1) return '';
    var nd = document.cookie.indexOf(';', _l);
    if (nd == -1) nd = document.cookie.length;
    return unescape(document.cookie.substring(_l, nd));
}
function _ssgd() {
    var _tm = /^(http:\/\/)?([^\/]+)/gi;
    var _tm1 = /[^\.\/]+\.[^\.\/]+$/;
    var _dmarr = _dm.match(_tm);
    var _dmarr1 = _dmarr[0].match(_tm1);
    return _dmarr1[0];
}
function _ssdc(_n) {
    document.cookie = _n + '=;path=/;domain=' + _ssgd() + ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}
function _ych() {
    var _dvs = document.getElementsByTagName('div'),
    _chs = '';
    if (_dvs.length == 0) return null;
    for (_ic = 0; _ic < _dvs.length; _ic++) {
        _t = _dvs[_ic].getAttribute('ss_c');
        if (typeof _t == 'string' && _t != '') {
            _chs += _t + '^';
        }
    }
    _chs = _chs.substr(0, _chs.length - 1);
    if (_chs && (typeof _chs) == 'string') {
        return _chs;
    } else {
        return null
    }
}
function _ssm() {
    var d = document,
    c = new Date().getUTCMilliseconds(),
    m = d.cookie.match(/suid=([^;]*)(;|$)/),
    pdm = _ssgd();
    if ((typeof rp) == "string") {
        if (rp == _ssc('pid')) {
            d.cookie = "ss_pidf=1;path=/;domain=" + pdm + ";";
        } else {
            _ssdc('ss_pidf');
        }
        d.cookie = "pid=" + rp + ";path=/;domain=" + pdm + ";";
    } else {
        if (_ssc('pid') != "") {
            d.cookie = "ss_pidf=1;path=/;domain=" + pdm + ";";
        }
    }
    var _r1 = _px.match(/^(http:\/\/)(([a-zA-Z0-9]|\-)+\.)*((soso)\.com)\/.*/g);
    var _r2 = _px.match(/^(http:\/\/)(([a-zA-Z0-9]|\-)+\.)*((wenwen)\.com)\/.*/g);
    if (! (_r1 || _r2)) {
        _ssdc('ss_cidf');
        _ssdc('cid');
    }
    if ((typeof rc) == "string") {
        if (rc == _ssc('cid')) {
            d.cookie = "ss_cidf=1;path=/;domain=" + pdm + ";";
        } else {
            _ssdc('ss_cidf');
        }
        d.cookie = "cid=" + rc + ";path=/;domain=" + pdm + ";";
    } else {
        if (_ssc('cid') != "") {
            d.cookie = "ss_cidf=1;path=/;domain=" + pdm + ";";
        }
    }
    if (!m) {
        d.cookie = "suid=" + (Math.round(Math.random() * 2147483647) * c) % 10000000000 + ";path=/;domain=" + pdm + ";expires=Sun, 18 Jan 2038 00:00:00 GMT;";
    }
    var _divs = _ych();
    _divs == null ? (_divs = '') : (_divs = '&div=' + _divs);
    var isrc = "http://dr.soso.com/p1.gif?ref=" + escape(_pr) + _divs + "&rand=" + Math.random();
    d.write("<IMG SRC='" + isrc + "' width=0 height=0>");
}
_ssm();