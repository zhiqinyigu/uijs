var _S_JV_ = "webbug_meta_ref_mod_noiframe_async_fc_:8.58c", _S_DPID_ = "-9999-0-0-1", _S_DOMAINROOT = "sina.com.cn";
var _S_PW_ = window;
var _S_PWD_ = _S_PW_.document;
var _S_PWDL_ = _S_PWD_.location;
var _S_BN_ = navigator;
var _S_NAN_ = _S_BN_.appName.indexOf('Microsoft Internet Explorer') > -1
		? 'MSIE'
		: _S_BN_.appName;
var _S_NAV_ = _S_BN_.appVersion;
var _S_PURL_ = _S_PWDL_.href.toLowerCase();
var _S_PREF_ = _S_PWD_.referrer.toLowerCase();
var _SP_MPID_ = "";
var _S_PID_ = "", _S_UNA_ = "SUP", _S_MI_ = "", _S_SID_ = "Apache", _S_GID_ = "SINAGLOBAL", _S_LV_ = "ULV", _S_UO_ = "UOR", _S_UPA_ = "_s_upa", _S_IFW = 320, _S_IFH = 240, _S_GIDT = 0, _S_EXT1 = "", _S_EXT2 = "", _S_SMC = 0, _S_SMM = 10000;
try {
	if (_S_ET >= 0) {
		_S_ET = _S_ET;
	} else {
		var _S_ET = 0;
	}
} catch (e) {
	var _S_ET = 0;
}
var _S_HTTP = _S_PURL_.indexOf('https') > -1 ? 'https://' : 'http://';
var _S_BCNDOMAIN = "beacon.sina.com.cn";
var _S_CP_RF = _S_HTTP + _S_BCNDOMAIN + "/a.gif";
var _S_CP_RF_D = _S_HTTP + _S_BCNDOMAIN + "/d.gif";
var _S_CP_RF_E = _S_HTTP + _S_BCNDOMAIN + "/e.gif";
var _S_CP_FC = _S_HTTP + _S_BCNDOMAIN + "/fc.html";
var _S_DIV_ = "<div style='position:absolute;top:0;left:0;width:0;height:0;z-index:1'><div style='position:absolute;top:0;left:0;width:1;height:1;'><iframe id='SUDA_FC' src='' width=1 height=1 SCROLLING=NO FRAMEBORDER=0></iframe></div><div style='position:absolute;top:0;left:0;width:0;height:0;visibility:hidden' id='SUDA_CS_DIV'></div></div>";
_S_PWD_.write(_S_DIV_);
function _S_gKeyV(src, k, e, sp) {
	if (src == "") {
		return "";
	}
	if (sp == "") {
		sp = "=";
	}
	k = k + sp;
	var ps = src.indexOf(k);
	if (ps < 0) {
		return "";
	}
	ps = ps + k.length;
	var pe = src.indexOf(e, ps);
	if (pe < ps) {
		pe = src.length;
	}
	return src.substring(ps, pe);
}
function _S_gUCk(ckName) {
	if (("undefined" == ckName) || ("" == ckName))
		return "";
	return _S_gKeyV(_S_PWD_.cookie, ckName, ";", "")
};
function _S_sUCk(ckName, ckValue, ckdays) {
	if (ckValue != null) {
		if (("undefined" == ckdays) || (null == ckdays)) {
			_S_PWD_.cookie = ckName + "=" + ckValue + ";domain="
					+ _S_DOMAINROOT + ";path=/";
		} else {
			var now = new Date();
			var time = now.getTime();
			time = time + 86400000 * ckdays;
			now.setTime(time);
			time = now.getTime();
			_S_PWD_.cookie = ckName + "=" + ckValue + ";domain="
					+ _S_DOMAINROOT + ";expires=" + now.toUTCString()
					+ ";path=/";
		}
	}
}
function _S_gMeta(MName) {
	pMeta = _S_PWD_.getElementsByName(MName);
	return (pMeta.length > 0) ? pMeta[0].content : "";
}
function _S_gCid() {
	try {
		metaTxt = _S_gMeta("publishid");
		if ("" != metaTxt) {
			pbidList = metaTxt.split(",");
			if (pbidList.length > 0) {
				if (pbidList.length >= 3) {
					_S_DPID_ = "-9999-0-" + pbidList[1] + "-" + pbidList[2];
				}
				return pbidList[0];
			}
		} else {
			return "0";
		}
	} catch (e) {
		return "0";
	}
}
function _S_gsSID() {
	var sid = _S_gUCk(_S_SID_);
	if ("" == sid) {
		_S_sSID();
	}
	return sid;
}
function _S_sSID() {
	_S_p2Bcn("", _S_CP_RF_D);
}
function _S_sSIDV(_s_sidv) {
	if ("" != _s_sidv) {
		_S_sUCk(_S_SID_, _s_sidv);
	}
}
function _S_gGID() {
	return _S_gUCk(_S_GID_);
}
function _S_sGID(gid) {
	if ("" != gid) {
		_S_sUCk(_S_GID_, gid, 3650);
	}
}
function _S_IFC2GID() {
	var _S_ifc = _S_PWD_.getElementById("SUDA_FC");
	if (_S_ifc) {
		_S_ifc.src = _S_CP_FC + "?a=g&n=" + _S_GID_ + "&r=" + Math.random();
	}
}
function _S_gsGID() {
	if ("" != _S_GID_) {
		var gid = _S_gUCk(_S_GID_);
		if ("" == gid) {
			_S_IFC2GID();
		}
		return gid;
	} else {
		return "";
	}
}
function _S_p2Bcn(q, u) {
	var scd = _S_PWD_.getElementById("SUDA_CS_DIV");
	if (null != scd) {
		var now = new Date();
		scd.innerHTML = "<img width=0 height=0 src='" + u + "?" + q + "gUid_"
				+ now.getTime() + "' border='0' alt='' />";
	}
}
function _S_gConType() {
	var ct = "";
	try {
		_S_PWD_.body.addBehavior("#default#clientCaps");
		ct = _S_PWD_.body.connectionType;
	} catch (e) {
		ct = "unkown";
	}
	return ct;
}
function _S_isHome() {
	var cul = "";
	var isH = "";
	try {
		cul = _S_PURL_;
		_S_PWD_.body.addBehavior("#default#homePage");
		isH = _S_PWD_.body.isHomePage(cul) ? "Y" : "N";
	} catch (e) {
		isH = "unkown";
	}
	return isH;
}
function _S_isFreshMeta() {
	var ph = _S_PWD_.documentElement.innerHTML.substring(0, 1024);
	var reg = new RegExp(
			"<meta\\s*http-equiv\\s*=((\\s*refresh\\s*)|(\'refresh\')|(\"refresh\"))\s*content\s*=",
			"ig");
	return reg.test(ph);
}
function _S_isIFrameSelf() {
	if (_S_PW_.top == _S_PW_) {
		return false;
	} else {
		try {
			if (_S_PWD_.body.clientHeight == 0) {
				return false;
			}
			if ((_S_PWD_.body.clientHeight >= _S_IFH)
					&& (_S_PWD_.body.clientWidth >= _S_IFW)) {
				return false;
			} else {
				return true;
			}
		} catch (e) {
			return true;
		}
	}
}
function _S_gJVer() {
	var p, appsign, appver, jsver = 1.0, isN6 = 0;
	if ('MSIE' == _S_NAN_) {
		appsign = 'MSIE';
		p = _S_NAV_.indexOf(appsign);
		if (p >= 0) {
			appver = parseInt(_S_NAV_.substring(p + 5));
			if (3 <= appver) {
				jsver = 1.1;
				if (4 <= appver) {
					jsver = 1.3;
				}
			}
		}
	} else if (("Netscape" == _S_NAN_) || ("Opera" == _S_NAN_)
			|| ("Mozilla" == _S_NAN_)) {
		jsver = 1.3;
		appsign = 'Netscape6';
		p = _S_NAV_.indexOf(appsign);
		if (p >= 0) {
			jsver = 1.5;
		}
	}
	return jsver;
}
function _S_gPageInfo(pid, ref) {
	return _S_gsSID() + "|pid:" + pid + "||st:" + _S_gMC() + "|et:" + _S_ET
			+ "|" + escape(ref) + "|hp:" + _S_isHome() + "|lb:1|PGLS:"
			+ _S_gMeta("stencil") + "|keys:" + escape(_S_gMeta("keywords"))
			+ "|" + _S_EXT1 + "|" + _S_EXT2 + "|*|";
}
function _S_gEnvInfo() {
	var now = new Date();
	return "sz:" + screen.width + "x" + screen.height + "||dp:"
			+ screen.colorDepth + "||ac:" + _S_BN_.appCodeName + "||an:"
			+ _S_NAN_ + "||av:0||cpu:" + _S_BN_.cpuClass + "||pf:"
			+ _S_BN_.platform + "||jv:" + _S_gJVer() + "||ct:" + _S_gConType()
			+ "||lg:" + _S_BN_.systemLanguage + "||tz:"
			+ now.getTimezoneOffset() / 60;
}
function _S_pBeacon(pid, ext1, ext2) {
	try {
		var gid = _S_gsGID();
		if ("" == gid) {
			if (_S_GIDT < 1) {
				_S_PW_.setTimeout("_S_pBeacon('" + pid + "','" + ext1 + "','"
								+ ext2 + "',0)", 3000);
				_S_GIDT++;
				return;
			} else {
				gid = _S_gsSID();
				_S_sGID(gid);
			}
		}
		if (("undefined" == pid) || ("" == pid)) {
			pid = _S_gCid() + _S_DPID_;
		}
		_SP_MPID_ = pid;
		_S_EXT1 = ("undefined" == ext1) ? _S_EXT1 : ext1;
		_S_EXT2 = ("undefined" == ext2) ? _S_EXT2 : ext2;
		var ckValue = _S_gEnvInfo();
		var unStr = _S_gSUP();
		var lvStr = _S_gsLVisit(_S_gsSID());
		var envStr = "UNIPROINFO=" + ckValue + "||un:" + unStr + "||lv:"
				+ lvStr + "||uo:" + _S_gUOR() + ";";
		var refUrl = _S_gRef();
		var cPageStr = _S_gPageInfo(_SP_MPID_, refUrl);
		var lbStr = gid + "|*|" + cPageStr;
		lbStr = envStr + "UNIPROPATH=" + lbStr + ";";
		_S_p2Bcn(lbStr, _S_CP_RF);
	} catch (e) {
	}
}
function _S_pSt(pid, ext1, ext2) {
	try {
		if ((_S_isFreshMeta()) || (_S_isIFrameSelf())) {
			return;
		}
		if (_S_ET > 0) {
			return;
		}
		++_S_ET;
		_S_PW_.setTimeout("_S_gsSID()", 500);
		_S_PW_.setTimeout("_S_pBeacon('" + pid + "','" + ext1 + "','" + ext2
						+ "',0)", 3000);
	} catch (e) {
	}
}
function _S_pStM(pid, ext1, ext2) {
	++_S_ET;
	_S_pBeacon(pid, ext1, ext2);
}
function _S_MC() {
	if (_S_SMC == 0) {
		_S_SMC++;
		var c = _S_gUCk(_S_UPA_);
		if (c == "") {
			c = 0;
		}
		c++;
		if (c < _S_SMM) {
			var r1 = /[&|?]c=spr(_[A-Za-z0-9]{2,}){3,}/;
			var r2 = /[\%3f|\%26]c\%3dspr(_[A-Za-z0-9]{2,}){3,}/;
			if (_S_PURL_.match(r1) || _S_PREF_.match(r1) || _S_PURL_.match(r2)
					|| _S_PREF_.match(r2)) {
				c = c + _S_SMM;
			}
		}
		_S_sUCk(_S_UPA_, c);
	}
}
function _S_gMC() {
	var c = _S_gUCk(_S_UPA_);
	if (c == "") {
		c = 0;
	}
	return c;
}
function _S_acTrack(eid) {
	try {
		var pn = _S_acTrack.arguments.length;
		if (pn > 0 && eid != '') {
			setTimeout("_S_acTrack_i('" + eid + "')", 100);
		}
	} catch (e) {
		;
	}
}
function _S_acTrack_i(eid) {
	var s = "AcTrack||" + _S_gGID() + "||" + _S_gsSID() + "||" + _S_gSUP()
			+ "||" + eid + "||";
	_S_p2Bcn(s, _S_CP_RF_E);
}
function _S_uaTrack(acode, aext) {
	try {
		var pn = _S_uaTrack.arguments.length;
		if (pn > 0) {
			if (pn == 1) {
				aext = '';
			}
			if (acode != '') {
				setTimeout("_S_uaTrack_i('" + acode + "','" + aext + "')", 100);
			}
		}
	} catch (e) {
		;
	}
}
function _S_uaTrack_i(acode, aext) {
	var s = "UATrack||" + _S_gGID() + "||" + _S_gsSID() + "||" + _S_gSUP()
			+ "||" + acode + "||" + aext + "||";
	_S_p2Bcn(s, _S_CP_RF_E);
}
function _S_gSUP() {
	if (_S_MI_ != "") {
		return _S_MI_;
	}
	var sup = unescape(_S_gUCk(_S_UNA_));
	if (sup != "") {
		var ag = _S_gKeyV(sup, "ag", "&", "");
		var user = _S_gKeyV(sup, "user", "&", "");
		var uid = _S_gKeyV(sup, "uid", "&", "");
		var sex = _S_gKeyV(sup, "sex", "&", "");
		var bday = _S_gKeyV(sup, "dob", "&", "");
		_S_MI_ = ag + ":" + user + ":" + uid + ":" + sex + ":" + bday;
		return _S_MI_;
	} else {
		return "";
	}
}
function _S_gsLVisit(sid) {
	var lvi = _S_gUCk(_S_LV_);
	var lva = lvi.split(":");
	var lvr = "";
	if (lva.length >= 6) {
		if (sid != lva[4]) {
			var lvn = new Date();
			var lvd = new Date(parseInt(lva[0]));
			lva[1] = parseInt(lva[1]) + 1;
			if (lvn.getMonth() != lvd.getMonth()) {
				lva[2] = 1;
			} else {
				lva[2] = parseInt(lva[2]) + 1;
			}
			if (((lvn.getTime() - lvd.getTime()) / 86400000) >= 7) {
				lva[3] = 1;
			} else {
				if (lvn.getDay() < lvd.getDay()) {
					lva[3] = 1;
				} else {
					lva[3] = parseInt(lva[3]) + 1;
				}
			}
			lvr = lva[0] + ":" + lva[1] + ":" + lva[2] + ":" + lva[3];
			lva[5] = lva[0];
			lva[0] = lvn.getTime();
			_S_sUCk(_S_LV_, lva[0] + ":" + lva[1] + ":" + lva[2] + ":" + lva[3]
							+ ":" + sid + ":" + lva[5], 360);
		} else {
			lvr = lva[5] + ":" + lva[1] + ":" + lva[2] + ":" + lva[3];
		}
	} else {
		var lvn = new Date();
		lvr = ":1:1:1";
		_S_sUCk(_S_LV_, lvn.getTime() + lvr + ":" + sid + ":", 360);
	}
	return lvr;
}
function _S_gRef() {
	var re = /^[^\?&#]*.swf([\?#])?/;
	if ((_S_PREF_ == "") || (_S_PREF_.match(re))) {
		var ref = _S_gKeyV(_S_PURL_, "ref", "&", "");
		if (ref != "") {
			return ref;
		}
	}
	return _S_PREF_;
}
function _S_gHost(sUrl) {
	var r = new RegExp('^http(?:s)?\://([^/]+)', 'im');
	if (sUrl.match(r)) {
		return sUrl.match(r)[1].toString();
	} else {
		return "";
	}
}
function _S_gSDomain(sHost) {
	var p = sHost.indexOf('.sina.');
	if (p > 0) {
		return sHost.substr(0, p);
	} else {
		return sHost;
	}
}
function _S_sUOR() {
	var uoc = _S_gUCk(_S_UO_), uor = "", uol = "", up_t = "", up = "";
	var r1 = /[&|?]c=spr(_[A-Za-z0-9]{1,}){3,}/;
	var ct = new Date();
	if (_S_PURL_.match(r1)) {
		up_t = _S_PURL_.match(r1)[0];
	} else {
		if (_S_PREF_.match(r1)) {
			up_t = _S_PREF_.match(r1)[1];
		}
	}
	if (up_t == "") {
		var r2 = /[\%3f|\%26]c\%3dspr(_[A-Za-z0-9]{2,}){3,}/;
		if (_S_PURL_.match(r2)) {
			up_t = _S_PURL_.match(r2)[0];
		} else {
			if (_S_PREF_.match(r2)) {
				up_t = _S_PREF_.match(r2)[1];
			}
		}
	}
	if (up_t != "") {
		up_t = up_t.substr(up_t.indexOf('spr_')) + ":" + ct.getTime();
	}
	if (uoc == "") {
		if (_S_gUCk(_S_LV_) == "" && _S_gUCk(_S_LV_) == "") {
			uor = _S_gSDomain(_S_gHost(_S_PREF_));
			uol = _S_gSDomain(_S_gHost(_S_PURL_));
		}
		_S_sUCk(_S_UO_, uor + "," + uol + "," + up_t, 365);
	} else {
		var ucg = 0, uoa = uoc.split(",");
		if (uoa.length >= 1) {
			uor = uoa[0];
		}
		if (uoa.length >= 2) {
			uol = uoa[1];
		}
		if (uoa.length >= 3) {
			up = uoa[2];
		}
		if (up_t != "") {
			ucg = 1;
		} else {
			var upa = up.split(":");
			if (upa.length >= 2) {
				var upd = new Date(parseInt(upa[1]));
				if (upd.getTime() < (ct.getTime() - 86400000 * 30)) {
					ucg = 1;
				}
			}
		}
		if (ucg) {
			_S_sUCk(_S_UO_, uor + "," + uol + "," + up_t, 365);
		}
	}
}
function _S_gUOR() {
	var uoc = _S_gUCk(_S_UO_);
	var upa = uoc.split(":");
	if (upa.length >= 2) {
		return upa[0];
	} else {
		return "";
	}
}
_S_sUOR();
if (_S_SMC == 0) {
	if ('MSIE' == _S_NAN_) {
		_S_PWD_.attachEvent("onclick", _S_MC);
		_S_PWD_.attachEvent("onmousemove", _S_MC);
		_S_PW_.attachEvent("onscroll", _S_MC);
	} else {
		_S_PWD_.addEventListener("click", _S_MC, false);
		_S_PWD_.addEventListener("mousemove", _S_MC, false);
		_S_PW_.addEventListener("scroll", _S_MC, false);
	}
}

_S_PWD_
		.write("<scr"
				+ "ipt type='text/javascript' src='http://image2.sina.com.cn/unipro/pub/survey_20091215.js'></scr"
				+ "ipt>");
_S_PWD_
		.write("<scr"
				+ "ipt type='text/javascript' src='http://image2.sina.com.cn/unipro/pub/SinaJoy_v3.js'></scr"
				+ "ipt>");
_S_PW_.setTimeout("init_SinaMonitorJS(300,10,'user_survey','opened')", 3000);
_S_PW_.setTimeout("popSinaJoy()", 2000);
