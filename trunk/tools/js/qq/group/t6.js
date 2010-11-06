T[6] = {
	name : "city",
	title : "\u57ce\u5e02\u8fbe\u4eba",
	css : '#cnt-city .city_none {text-align:center;}#cnt-city .wrap{ width:194px; height:389px;margin:6px auto; text-align:left;}#cnt-city .qc_title{padding:2px 6px 0;text-align:right;background:#f2f2f2;}#cnt-city .qc_title h2{float:left;color:#000;font-size:12px;}#cnt-city .qc_title h2 a{ font-weight: normal;}#cnt-city .cnt{padding:7px 6px;}#cnt-city .photos{padding:0 0 7px;*zoom:1;}#cnt-city .photos:after{clear:both;content:".";display:block;height:0;visibility:hidden;}#cnt-city .photos a {float:left;display:block;height:62px;width:62px;};#cnt-city .photos img{width:60px;height:60px;float:left;margin-right:1px;}#cnt-city .posts li{padding:5px 0 4px;border-top:1px dashed #dcdcdc;width:182px;}#cnt-city .posts li span{color:#808080;}#cnt-city .posts li.curr{ background:#e5f2ff;}#head ul.tabs li#tab-city a{background-position:-48px -496px;}#head ul.tabs li#tab-city a.active{background-position: -48px -518px;}#head ul.tabs li#tab-city a.upd{background-position:-48px -540px;}#adminPage table span.city{background-position:-53px -566px;}',
	cities : [11, 12, 1301, 1401, 1501, 2101, 2201, 2301, 31, 3201, 3301, 3401,
			3501, 3601, 3701, 4101, 4201, 4301, 4401, 4403, 4501, 4601, 50,
			5101, 5201, 5301, 5401, 6101, 6201, 6301, 6401, 6501],
	updateTime : 0,
	getUpdate : function() {
		var date = new Date;
		var h = date.getHours();
		var d = date.getDate();
		if (h >= 10 && h < 15)
			h = 10;
		else
			h = 15;
		if (h < 10)
			d--;
		date.setDate(d);
		date.setHours(h);
		date.setMinutes(0);
		date.setSeconds(0);
		return Math.floor(date.getTime() / 1E3)
	},
	toAllowedCity : function(code) {
		var self = T[6];
		code = code.toString().replace(/(^"|"$)/g, "");
		if (!code)
			code = 4403;
		code = (code + "0000").substr(0, 4);
		var ret = 4403;
		var cc = code.substr(0, 2);
		if (cc == 81 || cc == 82 || cc == 71 || cc == 99 || cc == 98)
			ret = 98;
		else
			for (var i in self.cities) {
				var j = self.cities[i] + "";
				if (cc == j.substr(0, 2) && j != 4403) {
					ret = j;
					break
				}
			}
		ret = code == 4403 ? 4403 : ret;
		return ret
	},
	callback : function(o) {
		var self = T[6];
		if (!o)
			return self.finalErr();
		self.updateTime = o.updateTime;
		$("#cnt-city .qc_title h2")
				.html("<h2>"
						+ o.name
						+ "\u52a8\u9759 "
						+ (D.fl.ad
								? '<a href="http://qun.qq.com/air/#'
										+ mp.dp.gid
										+ '/city/index/m/set" rel="forward" rev="city/index/m/set" target="_blank">\u8bbe\u7f6e</a>'
								: ""));
		var u = function(g, p) {
			return "http://qun.qq.com/air/#" + mp.dp.gid
					+ '/city" rel="forward" rev="city'
		};
		var c = [];
		for (var i in o.action) {
			if (c.length >= 3)
				break;
			c
					.push('<a href="'
							+ u(o.action[i].groupId, o.action[i].postId)
							+ '" target="_blank"><img src="'
							+ o.action[i].smallurl
							+ '" alt="'
							+ o.action[i].title
							+ "\" onerror=\"this.src='error.gif';$(this).css('width','40px');$(this).css('height','40px');$(this).css('margin','10px');this.onerror=null;\"/></a>");
			delete o.action[i]
		}
		$("#cnt-city .photos").html(c.join(""));
		var a = {
			action : "\u6d3b\u52a8",
			cmdAction : "\u63a8\u8350",
			post : "\u7cbe\u534e",
			summary : "\u603b\u7ed3"
		};
		c = [];
		for (var j in o)
			for (var k in o[j])
				c
						.push("<li onmouseover=\"this.className='curr'\" onmouseout=\"this.className=''\"><span>["
								+ (a[j] || "")
								+ ']</span><a href="'
								+ u(o[j][k].groupId, o[j][k].postId)
								+ '" target="_blank" title="'
								+ o[j][k].title
								+ '">' + o[j][k].title + "</a></li>");
		$("#cnt-city .posts").html(c.join(""));
		self.resize(self.s)
	},
	fetchCityCodeCb : function(o) {
		var self = T[6];
		o = o || {};
		G.jsonp("http://imgcache.qq.com/city_v1/js/data/citydata/qunmini_"
						+ (o.data || 4403) + ".js?callback=",
				"qunCityCallback", self.callback, self.errhandle, 3E3)
	},
	errhandle : function() {
		var self = T[6];
		G
				.jsonp(
						"http://imgcache.qq.com/city_v1/js/data/citydata/qunmini_4403.js?callback=",
						"qunCityCallback", self.callback, self.finalErr, 3E3)
	},
	finalErr : function() {
		var self = T[6];
		$("#cnt-city")
				.html('<div class="city_none"><a href="http://qun.qq.com/air/#'
						+ mp.dp.gid
						+ '/city" rel="forward" rev="city" target="_blank">\u8fdb\u5165\u7fa4\u7a7a\u95f4\u67e5\u770b\u57ce\u5e02\u52a8\u9759</a></div>');
		self.resize(self.s)
	},
	run : function(s) {
		var self = T[6];
		self.s = s;
		self.p
				.html('<div class="wrap"><div class="move"><div class="qc_title"><h2></h2><a href="http://qun.qq.com/air/#'
						+ mp.dp.gid
						+ '/city" rel="forward" rev="city" target="_blank">\u66f4\u591a</a></div><div class="cnt"><p class="photos"></p><ul class="posts"></ul></div></div></div>');
		G.jsonp(
				"http://api.city.qq.com/json.php?mod=qun&act=getcitycode&group="
						+ mp.dp.gid + "&clientuin=" + G.cookie("clientuin")
						+ "&clientkey=" + G.cookie("clientkey") + "&r="
						+ Math.random() + "&callback=", "loadDefaultCityCb",
				self.fetchCityCodeCb, self.errhandle, 3E3)
	},
	resize : function(s) {
		var self = T[6];
		if (s.v == "expand")
			$("#cnt-city .posts li").show();
		else
			$("#cnt-city .posts li").each(function(k) {
						if (k != 0)
							$(this).hide();
						else
							$(this).show()
					});
		$("#cnt-city .city_none").css(
				"margin-top",
				Math.ceil((s.ht - $("#cnt-city .city_none").height()) / 2)
						+ "px");
		self.s = s
	}
};
F["t6.js"] = function(jv) {
	App.runOver(jv)
};
G.scriptLoaded("t6.js");
