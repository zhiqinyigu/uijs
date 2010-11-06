T[7] = {
	name : "friend",
	title : "\u627e\u670b\u53cb",
	getUpdate : function() {
		var date = new Date;
		var h = date.getHours();
		var d = date.getDate();
		if (h < 12)
			d--;
		date.setDate(d);
		date.setHours(12);
		date.setMinutes(0);
		date.setSeconds(0);
		return Math.floor(date.getTime() / 1E3)
	},
	css : "#cnt-friend .wrapper{width:196px;margin:0 auto;text-align:left;} #cnt-friend .bg{background:url(http://imgcache.qq.com/city_v1/app/qqinner/20100526/img/bg.gif);}#cnt-friend .photos_bigw{overflow:hidden;position:relative;width:196px;height:100px;} #cnt-friend .photos_big{width:19600px;position:absolute;top:5px;left:0;} #cnt-friend .photos_big li{float:left;width:192px;position:relative;} #cnt-friend .photos_big .pb span, #cnt-friend .photos_big .pb img{width:92px;height:92px;} #cnt-friend .photos_big .pb{float:left;position:relative;width:96px;height:96px;} #cnt-friend .photos_big .pb span{position:absolute;top:0;left:4px;display:block;background-position:0 -397px;cursor:pointer;} #cnt-friend .photos_big .pb img{display:block;margin-left:4px;} #cnt-friend .photos_smallw{overflow:hidden;width:160px;height:30px;position:absolute;top:6px;left:18px;z-index:2;} #cnt-friend .photos_small .ps, #cnt-friend .photos_small .ps span, #cnt-friend .photos_small .ps img{width:30px;height:30px;} #cnt-friend .photos_small{height:42px;position:relative;background-color:#f3f3f3;border-top:1px solid #dfdfdf;*zoom:1;} #cnt-friend .photos_small .slist{height:30px;width:16000px;position:absolute;top:0;left:0;} #cnt-friend .photos_small .slist li{float:left;padding:0 5px;} #cnt-friend .photos_small .ps{display:block;position:relative;} #cnt-friend .photos_small .ps span{position:absolute;top:0;left:0;display:block;background-position:-93px -397px;cursor:normal;} #cnt-friend .photos_small .ps img{display:block;} #cnt-friend .photos_small .prev, #cnt-friend .photos_small .next{position:absolute;display:block;width:8px;height:12px;top:15px;left:7px;background-position:-127px -397px;} #cnt-friend .photos_small .next{left:181px;background-position:-136px -397px;} #cnt-friend .photos_small .cur{position:absolute;top:3px;left:58px;width:81px;height:36px;z-index:1;background-color:#7ec5ed;} #cnt-friend .photos_small .cur p{height:32px;margin:2px;background-color:#fff;} #cnt-friend .mnum .photos_bigw{height:300px;} #cnt-friend .mnum .photos_big{top:0;} #cnt-friend .mnum .photos_big .pb{margin-top:6px;} #cnt-friend .mnum .btns{padding:11px 0 0 7px;}  #cnt-friend .mnum .photos_small .prev{left:165px} #cnt-friend .mnum .btns span, #cnt-friend .mnum .btns span a{float:left;height:20px;background-position:0 -490px;} #cnt-friend .mnum .btns span{margin-right:3px;padding-left:2px;} #cnt-friend .mnum .btns span a{padding:0 6px 0 4px;line-height:21px;overflow:hidden;background-position:100% -490px;outline: none;*hide-focus:expression(function(ele){ele.hideFocus=true;}(this));} #head ul.tabs li#tab-friend a{background-position:-24px -496px;}#head ul.tabs li#tab-friend a.active{background-position: -24px -518px;}#head ul.tabs li#tab-friend a.upd{background-position:-24px -540px;}#adminPage table span.friend{background-position:-29px -566px;}",
	myMarquee : function(id, size, inter, move) {
		var _ = this;
		_.id = id;
		_.size = size;
		_.inter = inter;
		_.move = move;
		_.cnt = Math.floor(_.size / _.move) + 1;
		_.cut = _.size % _.move;
		_.element = document.getElementById(id);
		_.c = 0;
		_.interID = null;
		_.moving = false;
		_.toLeft = function() {
			if (!_.moving) {
				_.c = 0;
				_.moving = true;
				_.interID = window.setInterval(T[7].cityBind123(_._left, _),
						_.inter)
			}
		};
		_.toRight = function() {
			if (!_.moving) {
				_.c = 0;
				_.moving = true;
				_.interID = window.setInterval(T[7].cityBind123(_._right, _),
						_.inter)
			}
		};
		_._left = function() {
			_.c++;
			if (_.c == _.cnt) {
				clearInterval(_.interID);
				_.element.scrollLeft = parseInt(_.element.scrollLeft) - _.cut;
				_.moving = false
			} else
				_.element.scrollLeft = parseInt(_.element.scrollLeft) - _.move
		};
		_._right = function() {
			_.c++;
			if (_.c == _.cnt) {
				clearInterval(_.interID);
				_.element.scrollLeft = parseInt(_.element.scrollLeft) + _.cut;
				_.moving = false
			} else
				_.element.scrollLeft = parseInt(_.element.scrollLeft) + _.move
		}
	},
	showNum : 30,
	ERRCSS : "width:40px;height:40px;margin:25px;margin-left:30px;",
	sff : {
		m : {},
		cur : 0,
		total : 6,
		html : ' \t\t\t<div id="city_normal" class="wrapper"> \t\t\t\t<div class="photos_bigw"> \t\t\t\t\t<ul class="photos_big"><li> \t\t\t\t\t\t<a id="city_bp1" href="javascript:void(0);" rel="forward" rev="friend/index" target="_blank" class="pb"  title="\u70b9\u51fb\u67e5\u770b\u8be6\u7ec6\u8d44\u6599" onfocus="blur()" ><img alt="" onerror="if(this.src!=\'error.gif\'){this.src=\'error.gif\';this.style.cssText=T[7].ERRCSS;}"/><span class="bg"></span></a> \t\t\t\t\t\t<a id="city_bp2" href="javascript:void(0);" rel="forward" rev="friend/index" target="_blank" class="pb"  title="\u70b9\u51fb\u67e5\u770b\u8be6\u7ec6\u8d44\u6599" onfocus="blur()" ><img alt="" onerror="if(this.src!=\'error.gif\'){this.src=\'error.gif\';this.style.cssText=T[7].ERRCSS;}"/><span class="bg"></span></a> \t\t\t\t\t</li></ul> \t\t\t\t</div> \t\t\t\t<div class="photos_small"> \t\t\t\t\t<div id="city_small_slide" class="photos_smallw"> \t\t\t\t\t\t<ul id="city_slist" class="slist"></ul> \t\t\t\t\t</div> \t\t\t\t\t<div class="cur"><p></p></div> \t\t\t\t\t<a id="city_sprev" rev="friend/index" href="javascript:void(0);" onfocus="blur()" class="prev bg"></a> \t\t\t\t\t<a id="city_snext" rev="friend/index" href="javascript:void(0);" onfocus="blur()" class="next bg"></a> \t\t\t\t</div> \t\t\t</div>',
		init : function() {
			var self = T[7];
			var _ = this;
			_.m = new self.myMarquee("city_small_slide", 80, 10, 5);
			$("#city_sprev").click(self.cityBind123(_.prev, _));
			$("#city_snext").click(self.cityBind123(_.next, _))
		},
		_changeBig : function(c) {
			$("#city_bp1 img").attr("style", "");
			if ($("#city_s" + c + " img").attr("src") == "error.gif")
				$("#city_bp1 img").attr("style", T[7].ERRCSS);
			$("#city_bp1 img").attr("src",
					$("#city_s" + c + " img").attr("src"));
			$("#city_bp1").attr("rev", $("#city_s" + c + " img").attr("rev"));
			c = c + 1;
			$("#city_bp2 img").attr("style", "");
			if ($("#city_s" + c + " img").attr("src") == "error.gif")
				$("#city_bp2 img").attr("style", T[7].ERRCSS);
			$("#city_bp2 img").attr("src",
					$("#city_s" + c + " img").attr("src"));
			$("#city_bp2").attr("rev", $("#city_s" + c + " img").attr("rev"))
		},
		_bindPhotoClick : function() {
			var _ = this;
			var self = T[7];
			var left = _.cur - 1;
			var right = _.cur + 2;
			if (left >= 0) {
				$("#city_s" + left).bind("click", self.cityBind123(_.prev, _));
				$("#city_s" + left).attr("style", "cursor:pointer;")
			}
			if (right < self.showNum) {
				$("#city_s" + right).bind("click", self.cityBind123(_.next, _));
				$("#city_s" + right).attr("style", "cursor:pointer;")
			}
		},
		_unbindPhotoClick : function() {
			var self = T[7];
			var _ = self.sff;
			var left = _.cur - 1;
			var right = _.cur + 2;
			if (left >= 0) {
				$("#city_s" + left).unbind("click");
				$("#city_s" + left).attr("style", "cursor:normal;")
			}
			if (right < self.showNum) {
				$("#city_s" + right).unbind("click");
				$("#city_s" + right).attr("style", "cursor:normal;")
			}
		},
		prev : function() {
			var _ = this;
			if (_.m.moving || _.cur == 0)
				return false;
			_._unbindPhotoClick();
			_.cur -= 2;
			_.m.toLeft.apply(_.m);
			_._changeBig(_.cur);
			$("#city_snext").attr("rel", "");
			_._bindPhotoClick();
			return false
		},
		next : function() {
			var _ = this;
			var self = T[7];
			if (_.m.moving)
				return false;
			if (_.cur == _.total - 2) {
				$("#city_snext").attr("rel", "forward");
				return true
			}
			if (_.total < self.showNum) {
				var d = city_data.d;
				var end = _.total + 2;
				for (var i = _.total; i < end; ++i)
					$("#city_slist")
							.append('<li id="city_s'
									+ i
									+ '"><a class="ps"><img rev="friend/index/curtab/guest/guest/'
									+ d[i].uin
									+ '" src="'
									+ d[i].url
									+ '" alt="" onerror="this.src==\'error.gif\'?(\'\'):(this.src=\'error.gif\');"/><span class="bg"></span></a></li>');
				_.total += 2;
				if (_.total == self.showNum)
					$("#city_slist")
							.append('<li title="\u70b9\u51fb\u8fdb\u5165\u7fa4\u7a7a\u95f4\u627e\u670b\u53cb"><a class="ps" href="javascript:void(0);" rel="forward" rev="friend/index" target="_blank" onfocus="blur()" style="cursor:pointer"><img alt="" src="http://imgcache.qq.com/city_v1/img/daren_default.jpg" onerror="this.src==\'error.gif\'?(\'\'):(this.src=\'error.gif\');"/><span class="bg"></span></a></li>')
			}
			_.m.toRight.apply(_.m);
			_._unbindPhotoClick();
			_.cur += 2;
			_._changeBig(_.cur);
			_._bindPhotoClick();
			return false
		},
		setImgUrl : function() {
			var self = T[7];
			var d = city_data.d;
			$("#city_slist")
					.append('<li title="\u70b9\u51fb\u8fdb\u5165\u7fa4\u7a7a\u95f4\u627e\u670b\u53cb"><a class="ps" href="javascript:void(0);" style="cursor:pointer" rel="forward" onclick="" rev="friend/index" target="_blank" onfocus="blur()" ><img alt="" src="http://imgcache.qq.com/city_v1/img/daren_default.jpg" onerror="this.src==\'error.gif\'?(\'\'):(this.src=\'error.gif\');"/><span class="bg"></span></a></li>');
			for (var i = 0; i < this.total; ++i)
				$("#city_slist")
						.append('<li id="city_s'
								+ i
								+ '"><a class="ps"><img rev="friend/index/curtab/guest/guest/'
								+ d[i].uin
								+ '" src="'
								+ d[i].url
								+ '" alt="" onerror="this.src==\'error.gif\'?(\'\'):(this.src=\'error.gif\');"/><span class="bg"></span></a></li>');
			$("#city_bp1 img").attr("src", d[0].url);
			$("#city_bp2 img").attr("src", d[1].url);
			$("#city_bp1").attr("rev",
					"friend/index/curtab/guest/guest/" + d[0].uin);
			$("#city_bp2").attr("rev",
					"friend/index/curtab/guest/guest/" + d[1].uin);
			self.sff._bindPhotoClick()
		}
	},
	bff : {
		m : {},
		cur : 0,
		total : 6,
		html : ' \t\t\t<div id="city_expand" class="wrapper mnum"> \t\t\t\t<div id="city_big_slide" class="photos_bigw"> \t\t\t\t\t<ul id="city_blist" class="photos_big"></ul> \t\t\t\t</div> \t\t\t\t<div class="photos_small"> \t\t\t\t\t<p class="btns"> \t\t\t\t\t\t<span class="bg"><a href="javascript:void(0);" rel="forward" rev="friend/index/curtab/girl" target="_blank" class="bg">\u7f8e\u5973</a></span> \t\t\t\t\t\t<span class="bg"><a href="javascript:void(0);" rel="forward" rev="friend/index/curtab/boy" target="_blank" class="bg">\u5e05\u54e5</a></span> \t\t\t\t\t\t<span class="l bg"><a href="javascript:void(0);" rel="forward" rev="friend/index/curtab/home" target="_blank" class="bg">\u6211\u7684\u627e\u670b\u53cb</a></span> \t\t\t\t\t</p> \t\t\t\t\t<a id="city_bprev" rev="friend/index" href="javascript:void(0);" onfocus="blur()" class="prev bg"></a> \t\t\t\t\t<a id="city_bnext" rev="friend/index" href="javascript:void(0);" onfocus="blur()" class="next bg"></a> \t\t\t\t</div> \t\t\t</div>',
		init : function() {
			var _ = this;
			var self = T[7];
			_.m = new self.myMarquee("city_big_slide", 192, 5, 20);
			$("#city_bprev").click(self.cityBind123(_.prev, _));
			$("#city_bnext").click(self.cityBind123(_.next, _))
		},
		prev : function() {
			var _ = this;
			if (_.m.moving || _.cur == 0)
				return false;
			_.cur -= 6;
			_.m.toLeft.apply(_.m);
			$("#city_bnext").attr("rel", "");
			return false
		},
		next : function() {
			var _ = this;
			var self = T[7];
			if (_.m.moving)
				return false;
			if (_.total == self.showNum && _.cur == _.total - 6) {
				$("#city_bnext").attr("rel", "forward");
				return true
			}
			if (_.total < self.showNum) {
				var d = city_data.d;
				var end = _.total + 6;
				var page = end / 6;
				$("#city_blist").append("<li id=city_b" + page + "></li>");
				for (var j = _.total; j < end; ++j)
					$("#city_b" + page)
							.append('<a rel="forward" rev="friend/index/curtab/guest/guest/'
									+ d[j].uin
									+ '" target="_blank" class="pb" title="\u70b9\u51fb\u67e5\u770b\u8be6\u7ec6\u8d44\u6599"><img src="'
									+ d[j].url
									+ '" alt="" onerror="if(this.src!=\'error.gif\'){this.src=\'error.gif\';this.style.cssText=T[7].ERRCSS;}"/><span class="bg"></span></a>');
				_.total += 6
			}
			_.m.toRight.apply(_.m);
			_.cur += 6;
			return false
		},
		setImgUrl : function() {
			var self = T[7];
			var d = city_data.d;
			var page = this.total / 6;
			for (var i = 0; i < page; ++i) {
				$("#city_blist").append("<li id=city_b" + i + "></li>");
				var j = i * 6;
				var end = (j + 1) * 6;
				for (; j < end; ++j)
					$("#city_b" + i)
							.append('<a rel="forward" rev="friend/index/curtab/guest/guest/'
									+ d[j].uin
									+ '" target="_blank" class="pb" title="\u70b9\u51fb\u67e5\u770b\u8be6\u7ec6\u8d44\u6599"><img src="'
									+ d[j].url
									+ '" alt="" onerror="if(this.src!=\'error.gif\'){this.src=\'error.gif\';this.style.cssText=T[7].ERRCSS;}"/><span class="bg"></span></a>')
			}
		}
	},
	cityBind123 : function() {
		var __method = arguments[0];
		var __object = arguments[1];
		return function() {
			return __method.apply(__object)
		}
	},
	run : function(s) {
		var self = T[7];
		var p = self.p;
		p.html(self.sff.html + self.bff.html);
		self.sff.init();
		self.bff.init();
		$
				.getScript(
						"http://imgcache.qq.com/city_v1/js/data/findFriend/qun_data.js",
						function() {
							function randArray(a, cnt) {
								var r = Math.ceil(a.length * Math.random());
								var b = a.splice(r, a.length - r);
								var c = b.concat(a);
								if (--cnt <= 0)
									return c;
								else
									return randArray(c, cnt)
							}
							var self = T[7];
							var p = self.p;
							if (typeof city_data == "undefined") {
								p
										.html('<center><br /><br /><br /><br /><a href="javascript:void(0);" rel="forward" rev="friend/index" target="_blank" title="\u70b9\u51fb\u8fdb\u5165\u7fa4\u7a7a\u95f4\u627e\u670b\u53cb" onfocus="blur()" >\u8fdb\u5165\u7fa4\u7a7a\u95f4\u627e\u670b\u53cb</a></center>');
								return
							}
							city_data.d = randArray(city_data.d, 1);
							self.sff.setImgUrl();
							self.bff.setImgUrl();
							$(window).unload(function() {
										self.sff._unbindPhotoClick()
									})
						})
	},
	resize : function(s) {
		if (s.v == "expand") {
			$("#city_normal").hide();
			$("#city_expand").show()
		} else if (s.v == "normal") {
			$("#city_expand").hide();
			$("#city_normal").show()
		}
	}
};
F["t7.js"] = function(jv) {
	App.runOver(jv)
};
G.scriptLoaded("t7.js");
