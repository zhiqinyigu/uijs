BD.IMG.albumConf = {
	preCacheMaxNum : 1,
	nextCacheMaxNum : 1,
	displayNum : 4,
	displayPosition : 2,
	nexPageKey : 39,
	prePageKey : 37,
	browsePreKey : 38,
	browseNextKey : 40
};
BD.IMG.detaiImg = (function() {
	var host = "i";
	try {
		document.execCommand("BackgroundImageCache", false, true)
	} catch (e) {
	}
	window.onerror = function() {
		return true
	};
	function trim(str) {
		return str.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "")
	}
	BD.IMG.trim = trim;
	function json2Query(json) {
		if (json == null || typeof json != "object") {
			return json
		}
		var query = [];
		for (var i in json) {
			query[query.length] = i + "=" + json[i]
		}
		return query.join("&")
	}
	BD.IMG.json2Query = json2Query;
	function query2Json(query) {
		if (query == null || typeof query != "string") {
			return query
		}
		var json = {};
		var queryMap = query.split("&");
		for (var i = 0, len = queryMap.length; i < len; i++) {
			var s = queryMap[i].split("=");
			json[s[0]] = s[1]
		}
		return json
	}
	BD.IMG.query2Json = query2Json;
	function G(id) {
		return document.getElementById(id)
	}
	var Browser = (function() {
		var isIE = (navigator.userAgent.indexOf("MSIE") != -1) && !window.opera;
		var isWebKit = (navigator.userAgent.indexOf("AppleWebKit/") > -1);
		var isOpera = (typeof window.opera !== "undefined") ? true : false;
		var isGecko = (navigator.userAgent.indexOf("Gecko") > -1)
				&& (navigator.userAgent.indexOf("KHTML") == -1);
		return {
			isIE : isIE,
			isWebKit : isWebKit,
			isOpera : isOpera,
			isGecko : isGecko
		}
	})();
	BD.IMG.Browser = Browser;
	if (!Browser.isIE) {
		function __attachEvent(type, handler) {
			type = type.replace(/^on/, "");
			this.addEventListener(type, handler, false)
		}
		window.attachEvent = document.attachEvent = HTMLElement.prototype.attachEvent = __attachEvent;
		function __detachEvent(type, handler) {
			type = type.replace(/^on/, "");
			this.removeEventListener(type, handler, false)
		}
		window.detachEvent = document.detachEvent = HTMLElement.prototype.detachEvent = __detachEvent
	}
	function addStyle(a, b) {
		var c = document.styleSheets[0];
		if (c.addRule) {
			c.addRule(a, b)
		} else {
			if (c.insertRule) {
				c.insertRule(a + " { " + b + " }", c.cssRules.length)
			}
		}
	}
	function getBodySize() {
		var W = 0, H = 0, SL = 0, ST = 0, SW = 0, SH = 0;
		var w = window, d = document, dd = d.documentElement;
		W = dd.clientWidth || d.body.clientWidth;
		H = w.innerHeight || dd.clientHeight || d.body.clientHeight;
		ST = d.body.scrollTop || dd.scrollTop;
		SL = d.body.scrollLeft || dd.scrollLeft;
		SW = Math.max(d.body.scrollWidth, dd.scrollWidth || 0);
		SH = Math.max(d.body.scrollHeight, dd.scrollHeight || 0, H);
		return {
			w : W,
			h : H
		}
	}
	if (window.HTMLElement) {
		HTMLElement.prototype.__defineGetter__("children", function() {
					var tmp = [], j = 0, n;
					for (var i = 0; i < this.childNodes.length; i++) {
						n = this.childNodes[i];
						if (n.nodeType == 1) {
							tmp[j++] = n;
							if (n.name) {
								if (!tmp[n.name]) {
									tmp[n.name] = []
								}
								tmp[n.name][tmp[n.name].length] = n
							}
							if (n.id) {
								tmp[n.id] = n
							}
						}
					}
					return tmp
				})
	}
	function zoom(w, h) {
		if ((this.srcWidth > w) || (this.srcHeight > h)) {
			var widthRate = w / this.srcWidth;
			var heightRate = h / this.srcHeight;
			if (widthRate < heightRate) {
				this.style.width = w + "px";
				this.style.height = this.srcHeight * widthRate + "px";
				this.zoomRate = widthRate
			} else {
				this.style.width = this.srcWidth * heightRate + "px";
				this.style.height = h + "px";
				this.zoomRate = heightRate
			}
		} else {
			this.zoomRate = 1;
			this.style.width = this.srcWidth + "px";
			this.style.height = this.srcHeight + "px"
		}
	}
	if (!Browser.isOpera) {
		addStyle("#imgList div img", "display:none")
	}
	function smallImageZoom(obj) {
		obj.style.display = "inline";
		obj.srcWidth = obj.width;
		obj.srcHeight = obj.height;
		obj.zoom = zoom;
		obj.zoom(100, 100)
	}
	BD.IMG.smallImgZoom = smallImageZoom;
	function smallImageError(obj) {
		obj.style.display = "inline";
		obj.srcWidth = 127;
		obj.srcHeight = 140;
		obj.zoom = zoom;
		obj.zoom(80, 80)
	}
	BD.IMG.smallImgErr = smallImageError;
	var net = (function() {
		function xmlhttpFactory() {
			var xmlhttp;
			if (window.XMLHttpRequest) {
				xmlhttp = new XMLHttpRequest()
			} else {
				if (window.ActiveXObject) {
					try {
						xmlhttp = new ActiveXObject("Msxml2.XMLHTTP.3.0")
					} catch (e) {
						xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
					}
				}
			}
			return xmlhttp
		}
		function getRequest(url, callback, async) {
			var xmlhttp = xmlhttpFactory();
			if (async == true) {
				xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState != 4) {
						return
					}
					callback(xmlhttp.responseText)
				};
				xmlhttp.open("GET", url, true);
				xmlhttp.send(null)
			} else {
				xmlhttp.open("GET", url, false);
				xmlhttp.send(null);
				callback(xmlhttp.responseText)
			}
		}
		return {
			getRequest : getRequest
		}
	})();
	var sizeConfig = {
		ecomWidth : 217,
		isEcom : BD.IMG.gconf.isEcom,
		imgContainerMargin : 20,
		albumWidth : 122,
		albumHeight : 582,
		picInfoHeight : 34,
		imgFromHeight : 34,
		ecomMargin : BD.IMG.gconf.ecomMargin,
		containerMargin : BD.IMG.gconf.containerMargin
	};
	var sizeHandle = (function() {
		var imgContainerWidth, detailImgWidth, picwrapHeight, detailImgHeight, picInfoWidth, containerWidth;
		function ecomWidthHandle() {
			var size = getBodySize();
			if (size.w < 455) {
				size.w = 455
			}
			if (size.w > 750) {
				imgContainerWidth = size.w - sizeConfig.ecomWidth
						- sizeConfig.ecomMargin - sizeConfig.containerMargin;
				detailImgWidth = imgContainerWidth - sizeConfig.albumWidth
			}
			if (523 <= size.w && size.w <= 750) {
				imgContainerWidth = 750 - sizeConfig.ecomWidth
						- sizeConfig.ecomMargin - sizeConfig.containerMargin;
				detailImgWidth = imgContainerWidth - sizeConfig.albumWidth
			}
			if (size.w < 523) {
				imgContainerWidth = size.w - sizeConfig.containerMargin;
				detailImgWidth = imgContainerWidth - sizeConfig.albumWidth
			}
			picInfoWidth = detailImgWidth;
			if (picInfoWidth > 600) {
				picInfoWidth = 600
			}
			containerWidth = imgContainerWidth + sizeConfig.ecomWidth
					+ sizeConfig.ecomMargin
		}
		function normalWidthHandle() {
			var size = getBodySize();
			if (size.w < 455) {
				size.w = 455
			}
			imgContainerWidth = size.w - sizeConfig.imgContainerMargin;
			detailImgWidth = imgContainerWidth - sizeConfig.albumWidth;
			picInfoWidth = detailImgWidth;
			if (picInfoWidth > 845) {
				picInfoWidth = 845
			}
			containerWidth = imgContainerWidth;
			imgFromWidth = picInfoWidth
		}
		function heightHandle() {
			var size = getBodySize();
			if (size.h < 270) {
				size.h = 270
			}
			detailImgHeight = size.h;
			picwrapHeight = detailImgHeight - sizeConfig.picInfoHeight
					- sizeConfig.imgFromHeight
		}
		function get() {
			if (sizeConfig.isEcom) {
				ecomWidthHandle()
			} else {
				normalWidthHandle()
			}
			heightHandle();
			return {
				imgContainerWidth : imgContainerWidth,
				detailImgWidth : detailImgWidth,
				detailImgHeight : detailImgHeight,
				picwrapHeight : picwrapHeight,
				picwrapWidth : detailImgWidth - 8,
				picInfoWidth : picInfoWidth,
				containerWidth : containerWidth
			}
		}
		BD.IMG.detailImgSizeInit = function init() {
			var size = get();
			addStyle("#container", "width:" + size.containerWidth + "px");
			if (sizeConfig.isEcom) {
				addStyle("#imgContainer", "float:left; margin-right: -"
								+ sizeConfig.ecomWidth + "px;width:"
								+ size.imgContainerWidth + "px;");
				addStyle("#ecomContainer", "float:right;width:"
								+ sizeConfig.ecomWidth + "px");
				if (BD.IMG.gconf.isIM && BD.IMG.gconf.isMA) {
					addStyle("#imContainer", "margin-top:15px")
				} else {
					if (BD.IMG.gconf.isIM) {
						addStyle("#imContainer", "margin-top:21px")
					}
				}
			} else {
				addStyle("#imgContainer", "width:" + size.imgContainerWidth
								+ "px;");
				addStyle("#ecomContainer", "display:none")
			}
			addStyle("#imgContainer", "width:" + size.imgContainerWidth + "px;");
			addStyle("#detailImg", "width:" + size.detailImgWidth + "px");
			addStyle("#picWrap", "height:" + size.picwrapHeight + "px;width:"
							+ size.picwrapWidth + "px");
			addStyle("#picInfo", "width:" + size.picInfoWidth + "px")
		};
		return {
			get : get
		}
	})();
	var slide = (function() {
		var albumObj;
		var preCallBack;
		var nextCallBack;
		var slideConfig = {
			distance : 112
		};
		function slideToUp(ImgObj, num) {
			var distance = slideConfig.distance;
			var currentTop = slideConfig.distance;
			var firstNode = albumObj.children[0];
			if (firstNode.children.length > 0) {
				firstNode.children[0].style.display = "none"
			}
			var slid = setInterval(function() {
						if (currentTop > 18) {
							currentTop = currentTop - 18;
							firstNode.style.height = currentTop + "px"
						} else {
							firstNode.style.height = "0px";
							clearInterval(slid);
							albumObj.removeChild(firstNode);
							firstNode.style.height = slideConfig.distance;
							var currentPN = DataManager.getCurrentPN();
							if (ImgObj && ImgObj.pageNum == currentPN) {
								firstNode.className = "select"
							} else {
								firstNode.className = "noselect"
							}
							firstNode.innerHTML = Album.getImgeHtml(ImgObj);
							firstNode.style.height = distance + "px";
							firstNode.id = "pn_" + num;
							albumObj.appendChild(firstNode);
							nextCallBack()
						}
					}, 8)
		}
		function slideToDown(ImgObj, num) {
			var distance = slideConfig.distance;
			var currentTop = 0;
			var albumObjChildren = albumObj.children;
			var firstNode = albumObjChildren[0];
			var lastNode = albumObjChildren[albumObjChildren.length - 1];
			var currentPN = DataManager.getCurrentPN();
			if (lastNode.children.length > 0) {
				lastNode.children[0].style.display = "none"
			}
			lastNode.style.height = "0px";
			if (ImgObj && ImgObj.pageNum == currentPN) {
				lastNode.className = "select"
			} else {
				lastNode.className = "noselect"
			}
			albumObj.insertBefore(lastNode, firstNode);
			var slid = setInterval(function() {
						if (distance - currentTop > 18) {
							lastNode.style.height = currentTop + "px";
							currentTop = currentTop + 18
						} else {
							clearInterval(slid);
							lastNode.style.height = distance + "px";
							lastNode.id = "pn_" + num;
							lastNode.innerHTML = Album.getImgeHtml(ImgObj);
							preCallBack()
						}
					}, 8)
		}
		return {
			pre : slideToDown,
			next : slideToUp,
			setAlbum : function(obj) {
				albumObj = obj
			},
			setPreCallBack : function(callBack) {
				preCallBack = callBack
			},
			setNextCallBack : function(callBack) {
				nextCallBack = callBack
			}
		}
	})();
	var DataManager = (function() {
		var imgData = {};
		var currPN;
		var listNum;
		var currMaxPn;
		var currMinPn;
		var queryParam = {};
		function getListNum() {
			return listNum
		}
		function getCurrentPN() {
			return currPN
		}
		function getCurrentImgData() {
			return imgData[currPN]
		}
		function resetCurrentPN(pn) {
			testLoadData(pn);
			currPN = pn
		}
		function getImgByPN(pn) {
			testLoadData(pn);
			return imgData[pn]
		}
		function testLoadData(pn) {
			if (currPN < pn) {
				if (currMaxPn < listNum - 1 && currMaxPn - pn <= 1) {
					loadData(currMaxPn + 1)
				}
			} else {
				if (currMinPn > 0 && pn - currMinPn <= 1) {
					if (currMinPn - 30 > 0) {
						loadData(currMinPn - 30)
					} else {
						loadData(0)
					}
				}
			}
		}
		function getImgsByPn(pn, num) {
			var temp = [];
			for (var i = 0; i < num; i++) {
				var tempPN = pn + i;
				if (tempPN < listNum) {
					temp.push(imgData[tempPN])
				} else {
					return temp
				}
			}
			return temp
		}
		function dataCallBack(data) {
			try {
				eval("var temData=" + data)
			} catch (e) {
			}
			listNum = temData.listNum;
			if (currPN > listNum - 1) {
				currPN = listNum - 1
			}
			for (var i = 0; i < temData.data.length - 1; i++) {
				var temp = temData.data[i];
				currMaxPn = temp.pageNum > currMaxPn ? temp.pageNum : currMaxPn;
				currMinPn = temp.pageNum < currMinPn ? temp.pageNum : currMinPn;
				temp.fromURL = trim(temp.fromURL);
				temp.objURL = trim(temp.objURL);
				temp.fromPageTitle = trim(temp.fromPageTitle);
				imgData[temp.pageNum] = temp
			}
		}
		function loadData(pn) {
			queryParam.pn = pn;
			var queryStr = json2Query(queryParam);
			var url = host + "?" + queryStr + "&" + (new Date()).getTime();
			net.getRequest(url, dataCallBack, false)
		}
		function init() {
			var quStr = window.location.search.substring(1);
			var searchConf = query2Json(quStr);
			currPN = BD.IMG.gconf.realPn;
			listNum = BD.IMG.gconf.listNum;
			queryParam.tn = "baiduimagejson";
			queryParam.ct = "201326592";
			queryParam.cl = searchConf.cl;
			queryParam.lm = searchConf.lm;
			queryParam.word = BD.IMG.gconf.word;
			queryParam.z = searchConf.z;
			queryParam.rn = 30;
			queryParam.ic = searchConf.ic || "";
			queryParam.s = searchConf.s || "";
			var hashValue = trim(window.location.hash);
			if (hashValue.length > 0) {
				hashValue = hashValue.replace("#pn", "");
				hashValue = parseInt(hashValue);
				if (!isNaN(hashValue) && 0 <= hashValue && hashValue < listNum) {
					currPN = hashValue
				}
			}
			var temppn = currPN;
			if (temppn - 14 >= 0) {
				temppn = temppn - 14
			} else {
				temppn = 0
			}
			currMaxPn = temppn;
			currMinPn = temppn;
			loadData(temppn);
			if (BD.IMG.gconf.realPn == currPN) {
				var tempDate = BD.IMG.curObj;
				tempDate.pageNum = currPN;
				imgData[tempDate.pageNum] = tempDate;
				tempDate.fromURL = trim(tempDate.fromURL);
				tempDate.objURL = trim(tempDate.objURL);
				tempDate.fromPageTitle = trim(tempDate.fromPageTitle)
			}
		}
		return {
			init : init,
			getCurrentPN : getCurrentPN,
			resetCurrentPN : resetCurrentPN,
			getImgByPN : getImgByPN,
			getImgsByPn : getImgsByPn,
			getCurrentImgData : getCurrentImgData,
			getListNum : getListNum
		}
	})();
	BD.IMG.StatCof = (function() {
		var searchConf = query2Json(window.location.search.substring(1));
		return {
			host : "http://p.baidu.com/",
			tn : BD.IMG.gconf.tn,
			q : BD.IMG.gconf.word,
			cl : searchConf.cl,
			lm : searchConf.lm,
			z : searchConf.z,
			fr : searchConf.fr,
			ad : BD.IMG.gconf.isEcom
		}
	})();
	BD.IMG.statistic = (function() {
		var ASYN_WAIT_TIME = 100;
		function monitorRequest(host, query) {
			var img = window["__log__" + (new Date()).getTime()] = document
					.createElement("img");
			img.src = host + "?" + query + "&" + new Date() * Math.random()
		}
		function DetailImgStat(event, args) {
			var imgData = DataManager.getCurrentImgData();
			var host = BD.IMG.StatCof.host + "5.gif";
			var query = {};
			query.p = args.p;
			query.q = BD.IMG.StatCof.q;
			query.pn = imgData.pageNum;
			query.cl = BD.IMG.StatCof.cl;
			query.lm = BD.IMG.StatCof.lm;
			query.z = BD.IMG.StatCof.z;
			query.tn = BD.IMG.StatCof.tn;
			query.ad = BD.IMG.StatCof.ad;
			query.di = imgData.di;
			query.tp = args.tp;
			query.fr = BD.IMG.StatCof.fr;
			return {
				host : host,
				query : query,
				isAsyn : false
			}
		}
		function albumStat(event, args) {
			var host = BD.IMG.StatCof.host + "5.gif";
			var imgData = DataManager.getCurrentImgData();
			var query = {};
			query.p = args.p;
			query.q = BD.IMG.StatCof.q;
			query.pn = imgData.pageNum;
			query.cl = BD.IMG.StatCof.cl;
			query.lm = BD.IMG.StatCof.lm;
			query.z = BD.IMG.StatCof.z;
			query.tn = BD.IMG.StatCof.tn;
			query.ad = BD.IMG.StatCof.ad;
			query.di = imgData.di;
			query.nb = args.nb;
			query.fr = BD.IMG.StatCof.fr;
			return {
				host : host,
				query : query,
				isAsyn : false
			}
		}
		function jsonTemplateStat(event, args) {
			var host = BD.IMG.StatCof.host + "5.gif";
			var imgData = DataManager.getCurrentImgData();
			var query = {};
			query.p = args.p;
			query.q = BD.IMG.StatCof.q;
			query.pn = imgData.pageNum;
			query.cl = BD.IMG.StatCof.cl;
			query.lm = BD.IMG.StatCof.lm;
			query.z = BD.IMG.StatCof.z;
			query.tn = "baiduimagejson";
			query.ad = BD.IMG.StatCof.ad;
			query.fr = BD.IMG.StatCof.fr;
			return {
				host : host,
				query : query,
				isAsyn : false
			}
		}
		function fromSiteStat(event, args) {
			var host = BD.IMG.StatCof.host + "5.gif";
			var imgData = DataManager.getCurrentImgData();
			var query = {};
			query.p = args.p;
			query.q = BD.IMG.StatCof.q;
			query.pn = imgData.pageNum;
			query.cl = BD.IMG.StatCof.cl;
			query.lm = BD.IMG.StatCof.lm;
			query.z = BD.IMG.StatCof.z;
			query.tn = BD.IMG.StatCof.tn;
			query.f = imgData.fromURL;
			query.fr = BD.IMG.StatCof.fr;
			return {
				host : host,
				query : query,
				isAsyn : false
			}
		}
		var positionHandle = {
			12 : DetailImgStat,
			13 : albumStat,
			14 : jsonTemplateStat,
			15 : fromSiteStat
		};
		function send(event, position, args) {
			var e = event || window.event;
			if (typeof args == "undefined") {
				args = {}
			}
			var handler = positionHandle[position];
			if (typeof handler != "undefined") {
				args.p = position;
				var result = handler.apply(this, [e, args]);
				var host = result.host;
				var query = result.query;
				if (typeof query == "object") {
					query = json2Query(query)
				}
				var isAsyn = result.isAsyn;
				monitorRequest(host, query);
				if (isAsyn) {
					e.returnValue = false;
					if (e.preventDefault) {
						e.preventDefault()
					}
					setTimeout(function() {
								location.href = o.href
							}, ASYN_WAIT_TIME)
				}
			}
		}
		function setHandle(position, handle) {
			positionHandle[position] = handle
		}
		return {
			send : send,
			setHandle : setHandle
		}
	})();
	var Ecom = function() {
		var isRefreshing = false;
		var quStr = window.location.search.substring(1);
		var searchConf = query2Json(quStr);
		var ecomTimer;
		var queryParam = {
			ct : "520093696",
			tn : "baiduimageecom",
			word : BD.IMG.gconf.word,
			stn : ""
		};
		function refresh() {
			if (isRefreshing) {
				return
			}
			isRefreshing = true;
			queryParam.stn = BD.IMG.gconf.tn;
			var queryStr = json2Query(queryParam);
			var url = host + "?" + queryStr + "&" + (new Date().getTime());
			net.getRequest(url, refreshCallback, true)
		}
		function refreshCallback(responseText) {
			var response = trim(responseText);
			if (response.length > 0) {
				G("imContainer").innerHTML = responseText
			}
			isRefreshing = false
		}
		return {
			refresh : refresh
		}
	}();
	var Album = (function() {
		var listNum;
		var albumObj;
		var slidePre;
		var slideNext;
		var ImgSwitcher;
		var AlbumConfig;
		var albumState = {
			topImgPN : "",
			isBrowse : false,
			isCanBrowse : true,
			isBrowsing : false,
			browseQueue : 0
		};
		function browsePre() {
			if (albumState.isBrowsing == true) {
				return
			}
			if (albumState.topImgPN == -AlbumConfig.preCacheMaxNum) {
				albumState.isBrowse = false;
				albumState.isCanBrowse = true;
				albumState.browseQueue = 0;
				return
			}
			if (albumState.browseQueue != 0) {
				albumState.browseQueue--
			}
			albumState.isBrowsing = true;
			if (albumState.topImgPN <= 0) {
				slide.pre(null, albumState.topImgPN - 1);
				albumState.topImgPN--
			}
			if (albumState.topImgPN > 0) {
				slide.pre(DataManager.getImgByPN(albumState.topImgPN - 1),
						albumState.topImgPN - 1);
				albumState.topImgPN--
			}
			return
		}
		function browseNext() {
			if (albumState.isBrowsing == true) {
				return
			}
			if (albumState.topImgPN + AlbumConfig.preCacheMaxNum
					+ AlbumConfig.displayNum == listNum) {
				albumState.isBrowse = false;
				albumState.isCanBrowse = true;
				albumState.browseQueue = 0;
				return
			}
			if (albumState.browseQueue != 0) {
				albumState.browseQueue++
			}
			albumState.isBrowsing = true;
			var nextImgPn = albumState.topImgPN + AlbumConfig.preCacheMaxNum
					+ AlbumConfig.displayNum + AlbumConfig.nextCacheMaxNum;
			if (nextImgPn >= listNum) {
				slide.next(null, nextImgPn);
				albumState.topImgPN++
			}
			if (nextImgPn < listNum) {
				slide.next(DataManager.getImgByPN(nextImgPn), nextImgPn);
				albumState.topImgPN++
			}
			return
		}
		function browsePreCallback() {
			albumState.isCanBrowse = true;
			albumState.isBrowsing = false;
			if (albumState.topImgPN == -AlbumConfig.preCacheMaxNum) {
				if (slidePre.currClass && slidePre.currClass != "preNone") {
					slidePre.className = "preNone";
					slidePre.currClass = "preNone"
				}
			}
			if (slideNext.currClass && slideNext.currClass != "nextNormal") {
				slideNext.className = "nextNormal";
				slideNext.currClass = "nextNormal"
			}
			if (albumState.isBrowse || albumState.browseQueue != 0) {
				browsePre()
			}
		}
		function browseNextCallback() {
			albumState.isCanBrowse = true;
			albumState.isBrowsing = false;
			if (albumState.topImgPN + AlbumConfig.preCacheMaxNum
					+ AlbumConfig.displayNum == listNum) {
				if (slideNext.currClass && slideNext.currClass != "nextNone") {
					slideNext.className = "nextNone";
					slideNext.currClass = "nextNone"
				}
			}
			if (slidePre.currClass && slidePre.currClass != "preNormal") {
				slidePre.className = "preNormal";
				slidePre.currClass = "preNormal"
			}
			if (albumState.isBrowse || albumState.browseQueue != 0) {
				browseNext()
			}
		}
		function browse(type) {
			if (listNum <= AlbumConfig.displayNum) {
				return
			}
			if (albumState.browseQueue != 0) {
				return
			}
			if (albumState.isBrowse) {
				return
			}
			albumState.isBrowse = true;
			if (type == "pre") {
				browsePre()
			}
			if (type == "next") {
				browseNext()
			}
		}
		function stopBrowse() {
			albumState.isBrowse = false
		}
		function scrollToPn(pn) {
			if (listNum <= AlbumConfig.displayNum) {
				return
			}
			var temTopPN = pn - AlbumConfig.displayPosition
					- AlbumConfig.preCacheMaxNum + 1;
			if (temTopPN < -AlbumConfig.preCacheMaxNum) {
				temTopPN = -AlbumConfig.preCacheMaxNum
			}
			albumState.browseQueue = albumState.topImgPN - temTopPN;
			if (albumState.browseQueue > 0) {
				browsePre()
			} else {
				if (albumState.browseQueue < 0) {
					browseNext()
				}
			}
		}
		function wheel(event) {
			if (albumState.browseQueue != 0) {
				return
			}
			var delta = 0;
			var e = event || window.event;
			if (e.wheelDelta) {
				delta = event.wheelDelta / 120
			} else {
				if (e.detail) {
					delta = -event.detail / 3
				}
			}
			if (delta && delta > 0) {
				if (albumState.isCanBrowse && albumState.browseQueue == 0) {
					albumState.isCanBrowse = false;
					browsePre()
				}
			} else {
				if (delta && delta < 0) {
					if (albumState.isCanBrowse && albumState.browseQueue == 0) {
						albumState.isCanBrowse = false;
						browseNext()
					}
				}
			}
			if (e.preventDefault) {
				e.preventDefault()
			}
			e.returnValue = false
		}
		function getImgeHtml(ImgObj) {
			var imgHtml = "";
			if (!!ImgObj) {
				imgHtml = '<table cellspacing="0"><tr><td align="center" valign="middle"><img name="'
						+ ImgObj.pageNum
						+ '" title="第'
						+ ImgObj.pageNum
						+ '张" onload="BD.IMG.smallImgZoom(this)" onerror="BD.IMG.smallImgErr(this)" src="'
						+ ImgObj.thumbURL + '"></tr></table>'
			}
			return imgHtml
		}
		function __imgClick(e) {
			var e = e || window.event;
			var obj = e.target || e.srcElement;
			if (obj.nodeName == "IMG") {
				var pn = parseInt(obj.name);
				var currObj = DataManager.getImgByPN(pn);
				currObj.tp = null;
				currObj.nb = 7;
				if (ImgSwitcher(pn)) {
					BD.IMG.statistic.send(e, 13, {
								nb : 7
							})
				}
			}
		}
		function keyTurnPage(e) {
			var e = e || window.event;
			var keycode = e.keyCode || e.which;
			var currentPN = DataManager.getCurrentPN();
			var listNum = DataManager.getListNum();
			if (e.ctrlKey && keycode == AlbumConfig.nexPageKey) {
				if (currentPN < listNum - 1) {
					if (window.SwitchPageTimer) {
						clearTimeout(window.SwitchPageTimer)
					}
					window.SwitchPageTimer = setTimeout(function() {
								ImgSwitcher(currentPN + 1)
							}, 300)
				}
				if (e.preventDefault) {
					e.preventDefault()
				}
				e.returnValue = false
			}
			if (e.ctrlKey && keycode == AlbumConfig.prePageKey) {
				if (currentPN > 0) {
					if (window.SwitchPageTimer) {
						clearTimeout(window.SwitchPageTimer)
					}
					window.SwitchPageTimer = setTimeout(function() {
								ImgSwitcher(currentPN - 1)
							}, 300)
				}
				if (e.preventDefault) {
					e.preventDefault()
				}
				e.returnValue = false
			}
		}
		function keyBrowse(e) {
			var e = e || window.event;
			var keycode = e.keyCode || e.which;
			var node = e.target || e.srcElement;
			if (node.nodeName == "INPUT") {
				return
			}
			if (!e.ctrlKey && keycode == AlbumConfig.browsePreKey) {
				if (albumState.isBrowsing == false) {
					Album.browse("pre")
				}
				if (e.preventDefault) {
					e.preventDefault()
				}
				e.returnValue = false
			}
			if (!e.ctrlKey && keycode == AlbumConfig.browseNextKey) {
				if (albumState.isBrowsing == false) {
					Album.browse("next")
				}
				if (e.preventDefault) {
					e.preventDefault()
				}
				e.returnValue = false
			}
		}
		function init(config) {
			AlbumConfig = config;
			albumObj = G("imgList");
			slidePre = G("slidePre");
			slideNext = G("slideNext");
			slide.setAlbum(albumObj);
			slide.setPreCallBack(browsePreCallback);
			slide.setNextCallBack(browseNextCallback);
			var currentPN = DataManager.getCurrentPN();
			listNum = DataManager.getListNum();
			if (currentPN - AlbumConfig.preCacheMaxNum
					- AlbumConfig.displayPosition + 1 > -AlbumConfig.preCacheMaxNum) {
				if (currentPN + AlbumConfig.displayNum
						- AlbumConfig.displayPosition + 1 > listNum) {
					albumState.topImgPN = listNum - AlbumConfig.displayNum
							- AlbumConfig.preCacheMaxNum
				} else {
					albumState.topImgPN = currentPN
							- AlbumConfig.preCacheMaxNum
							- AlbumConfig.displayPosition + 1
				}
			} else {
				albumState.topImgPN = -AlbumConfig.preCacheMaxNum
			}
			var tempPn = albumState.topImgPN;
			var AlbumTotalImgNum = AlbumConfig.displayNum
					+ AlbumConfig.nextCacheMaxNum + AlbumConfig.preCacheMaxNum;
			var initImgData;
			if (albumState.topImgPN > 0) {
				initImgData = DataManager.getImgsByPn(tempPn, AlbumTotalImgNum)
			} else {
				initImgData = DataManager.getImgsByPn(0, AlbumTotalImgNum)
			}
			for (var i = 0, j = 0; i < AlbumTotalImgNum; i++, tempPn++) {
				var tempDivObj = document.createElement("div");
				if (tempPn < 0 || tempPn >= listNum) {
					tempDivObj.className = "noselect"
				} else {
					var tempDivObj = document.createElement("div");
					var temImg = initImgData[j];
					j++;
					if (temImg.pageNum == currentPN) {
						tempDivObj.className = "select"
					} else {
						tempDivObj.className = "noselect"
					}
					tempDivObj.innerHTML = getImgeHtml(temImg);
					tempDivObj.innerHTML = getImgeHtml(temImg)
				}
				tempDivObj.id = "pn_" + tempPn;
				albumObj.appendChild(tempDivObj)
			}
			if (listNum > AlbumConfig.displayNum) {
				if (albumState.topImgPN == -AlbumConfig.preCacheMaxNum) {
					slidePre.className = "preNone";
					slidePre.currClass = "preNone"
				} else {
					slidePre.className = "preNormal";
					slidePre.currClass = "preNormal"
				}
				if (albumState.topImgPN == listNum - AlbumConfig.displayNum
						- AlbumConfig.preCacheMaxNum) {
					slideNext.className = "nextNone";
					slideNext.currClass = "nextNone"
				} else {
					slideNext.className = "nextNormal";
					slideNext.currClass = "nextNormal"
				}
				slidePre.attachEvent("onmouseout", stopBrowse);
				slidePre.attachEvent("onmouseup", stopBrowse);
				slidePre.attachEvent("onmouseover", function() {
							if (albumState.topImgPN != -AlbumConfig.preCacheMaxNum) {
								slidePre.className = "preHover";
								slidePre.currClass = "preHover"
							}
						});
				slidePre.attachEvent("onmouseout", function() {
							if (albumState.topImgPN != -AlbumConfig.preCacheMaxNum) {
								slidePre.className = "preNormal";
								slidePre.currClass = "preNormal"
							}
						});
				slidePre.attachEvent("onmousedown", function(event) {
							browse("pre")
						});
				slideNext.attachEvent("onmouseout", stopBrowse);
				slideNext.attachEvent("onmouseup", stopBrowse);
				slideNext.attachEvent("onmousedown", function(event) {
							browse("next")
						});
				slideNext.attachEvent("onmouseover", function() {
							var currentPN = DataManager.getCurrentPN();
							if (albumState.topImgPN
									+ AlbumConfig.preCacheMaxNum
									+ AlbumConfig.displayNum < listNum) {
								slideNext.className = "nextHover";
								slideNext.currClass = "nextHover"
							}
						});
				slideNext.attachEvent("onmouseout", function() {
							var currentPN = DataManager.getCurrentPN();
							if (albumState.topImgPN
									+ AlbumConfig.preCacheMaxNum
									+ AlbumConfig.displayNum < listNum) {
								slideNext.className = "nextNormal";
								slideNext.currClass = "nextNormal"
							}
						});
				if (Browser.isGecko) {
					albumObj.attachEvent("DOMMouseScroll", wheel)
				} else {
					albumObj.attachEvent("onmousewheel", wheel)
				}
			}
			albumObj.attachEvent("onclick", __imgClick);
			document.attachEvent("onkeydown", keyBrowse);
			document.attachEvent("onkeyup", Album.stopBrowse)
		}
		return {
			init : init,
			browse : browse,
			stopBrowse : stopBrowse,
			scrollToPn : scrollToPn,
			setSwitcher : function(switcher) {
				ImgSwitcher = switcher
			},
			isCanSwitch : function() {
				if (albumState.browseQueue != 0 || albumState.isBrowsing) {
					return false
				}
				return true
			},
			getImgeHtml : getImgeHtml
		}
	})();
	var DetailImg = (function() {
		var detailSize;
		var ImgData;
		var srcPic;
		var imgContainer;
		var detailImg;
		var picWrap;
		var ImgSwitcher;
		var container;
		var picInfo;
		var switchType;
		var listNum;
		var imgElement;
		var imgFrom;
		function resizeDetailSize() {
			var size = sizeHandle.get();
			if (Math.abs(size.detailImgWidth - detailSize.detailImgWidth) > 10
					|| Math.abs(size.detailImgHeight
							- detailSize.detailImgHeight) > 10) {
				imgElement.zoom(size.picwrapWidth - 5, size.picwrapHeight - 5);
				G("rate").innerHTML = parseInt(imgElement.zoomRate * 100) + "%";
				picWrap.style.width = size.picwrapWidth + "px";
				picWrap.style.height = size.picwrapHeight + "px";
				picInfo.style.width = size.picInfoWidth + "px";
				detailImg.style.width = size.detailImgWidth + "px";
				imgContainer.style.width = size.imgContainerWidth + "px";
				container.style.width = size.containerWidth + "px";
				detailSize = size
			}
		}
		function resetDetailSize() {
			var size = sizeHandle.get();
			imgElement.zoom(size.picwrapWidth - 5, size.picwrapHeight - 5);
			G("rate").innerHTML = parseInt(imgElement.zoomRate * 100) + "%";
			picWrap.style.width = size.picwrapWidth + "px";
			picWrap.style.height = size.picwrapHeight + "px";
			picInfo.style.width = size.picInfoWidth + "px";
			detailImg.style.width = size.detailImgWidth + "px";
			imgContainer.style.width = size.imgContainerWidth + "px";
			container.style.width = size.containerWidth + "px";
			detailSize = size
		}
		function resetImgData(data) {
			ImgData = data;
			var errTest = ErrorImgTest();
			srcPic.innerHTML = '<img src="' + ImgData.objURL + '" >';
			imgElement = srcPic.children[0];
			imgElement.attachEvent("onload", errTest.ok);
			imgElement.attachEvent("onerror", errTest.err);
			imgElement.attachEvent("onerror", BD.IMG.resetErrorData);
			imgElement.zoom = zoom;
			imgElement.srcWidth = ImgData.width;
			imgElement.srcHeight = ImgData.height;
			imgElement.zoom(detailSize.picwrapWidth - 5,
					detailSize.picwrapHeight - 5);
			imgInfoOut();
			setNextClass()
		}
		BD.IMG.resetErrorData = function() {
			srcPic.innerHTML = '<img src="http://img.baidu.com/img/image/error.gif">';
			imgElement = srcPic.children[0];
			imgElement.zoom = zoom;
			imgElement.srcWidth = 318;
			imgElement.srcHeight = 73;
			imgElement.zoom(detailSize.picwrapWidth - 5,
					detailSize.picwrapHeight - 5)
		};
		function switchNext(e) {
			var e = e || window.event;
			var currentPN = DataManager.getCurrentPN();
			if (currentPN < listNum - 1) {
				if (ImgSwitcher(currentPN + 1)) {
					BD.IMG.statistic.send(e, 12, {
								tp : 3
							})
				}
			}
			if (e.preventDefault) {
				e.preventDefault()
			}
			e.returnValue = false
		}
		function setNextClass() {
			var currentPN = DataManager.getCurrentPN();
			if (currentPN < listNum - 1) {
				if (picWrap.currClass == "nextPage") {
					return
				}
				picWrap.className = "nextPage";
				picWrap.title = "下一张";
				picWrap.currClass = "nextPage"
			} else {
				picWrap.className = "lastPage";
				picWrap.title = "最后一张";
				picWrap.currClass = "lastPage"
			}
		}
		function imgInfoOut() {
			G("size").innerHTML = ImgData.width + "x" + ImgData.height;
			G("rate").innerHTML = parseInt(imgElement.zoomRate * 100) + "%";
			G("fileSize").innerHTML = ImgData.filesize + "k";
			G("fileType").innerHTML = ImgData.type;
			G("imgTitle").innerHTML = '<a class="imgTitle" href="'
					+ ImgData.fromURL
					+ '" onclick="BD.IMG.statistic.send(event, 15);" target="_blank" >'
					+ ImgData.fromPageTitle + "</a>";
			G("imgSite").innerHTML = '图片来自：<a href="'
					+ ImgData.fromURL
					+ '" onclick="BD.IMG.statistic.send(event, 15);" target="_blank" >'
					+ truncateUrl(ImgData.fromURL) + "</a>"
		}
		function truncateUrl(url) {
			reg = /[http,https]:\/\/([^\/]*)/;
			var _url = url.match(reg)[1];
			if (_url.length > 24) {
				_url = _url.slice(0, 24) + "/..."
			} else {
				_url = _url + "/..."
			}
			if (_url.match(/hi.baidu.com\//)) {
				_url = "百度空间"
			}
			return _url
		}
		function ErrorImgTest() {
			var errorHost = BD.IMG.StatCof.host + "6.gif?u=" + ImgData.objURL
					+ "&f=" + ImgData.fromURL;
			var queryWord = BD.IMG.gconf.word;
			var sizeStr = "z=" + BD.IMG.gconf.z;
			var imgLoadStart = (new Date()).getTime();
			var tag = true;
			function ok() {
				if (tag) {
					var size = -1;
					var event = window.event;
					if (event && event.srcElement) {
						var el = event.srcElement;
						size = el.fileSize
					}
					var sizeArg = "&imgSize=" + size;
					var loadTime = (new Date()).getTime() - imgLoadStart;
					var img = window["__log__" + (new Date()).getTime()] = document
							.createElement("img");
					img.src = errorHost + "&tm=" + loadTime + "&q=" + queryWord
							+ "&" + sizeStr + sizeArg + "&"
							+ (new Date()).getTime();
					tag = false
				}
			}
			function err() {
				if (tag) {
					var img = window["__log__" + (new Date()).getTime()] = document
							.createElement("img");
					img.src = errorHost + "&tm=-1&q=" + queryWord + "&"
							+ sizeStr + "&" + (new Date()).getTime();
					tag = false
				}
			}
			return {
				ok : ok,
				err : err
			}
		}
		function init() {
			srcPic = G("srcPic");
			imgContainer = G("imgContainer");
			picInfo = G("picInfo");
			detailImg = G("detailImg");
			picWrap = G("picWrap");
			container = G("container");
			imgFrom = G("imgFrom");
			listNum = DataManager.getListNum();
			detailSize = sizeHandle.get();
			var currPn = DataManager.getCurrentPN();
			ImgData = DataManager.getImgByPN(currPn);
			window.attachEvent("onresize", resizeDetailSize);
			resetImgData(ImgData);
			resetDetailSize();
			picWrap.attachEvent("onclick", switchNext);
			picWrap.attachEvent("onmouseover", setNextClass);
			var zoomSrc = G("zoomSrc");
			zoomSrc.attachEvent("onclick", function(event) {
						window.open(ImgData.objURL, "_blank");
						BD.IMG.statistic.send(event, 12, {
									tp : 2
								})
					});
			window.attachEvent("onload", resetDetailSize)
		}
		return {
			setImgSwitcher : function setImgSwitcher(Switcher) {
				ImgSwitcher = Switcher
			},
			init : init,
			resetImgData : resetImgData
		}
	})();
	var ImgMediator = (function() {
		function switcher(num) {
			if (Album.isCanSwitch() == false) {
				return false
			}
			var currPn = DataManager.getCurrentPN();
			if (currPn == num) {
				return false
			}
			var currObj = DataManager.getImgByPN(num);
			if (G("pn_" + currPn)) {
				G("pn_" + currPn).className = "noselect"
			}
			if (G("pn_" + num)) {
				G("pn_" + num).className = "select"
			}
			DataManager.resetCurrentPN(num);
			DetailImg.resetImgData(currObj);
			Album.scrollToPn(num);
			window.location.hash = "pn" + num;
			scroll(0, 0);
			if (BD.IMG.gconf.isIM) {
				Ecom.refresh()
			}
			return true
		}
		function init() {
			Album.setSwitcher(switcher);
			DetailImg.setImgSwitcher(switcher)
		}
		return {
			switcher : switcher,
			init : init
		}
	})();
	function init(AlbumConfig) {
		DataManager.init();
		ImgMediator.init();
		Album.init(AlbumConfig);
		DetailImg.init();
		scroll(0, 0)
	}
	return {
		init : init
	}
})();