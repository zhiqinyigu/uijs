/* Copyright (C) 2009 Microsoft Corporation */
registerNamespace("Live.Controls.CustomizeDialog");
registerNamespace("$Config.Themes.FeaturedThemes");
registerNamespace("Live.Themes");
registerNamespace("live.theme");
function createNetworkBatch(c, d) {
	var b = new $Network(c, d), a = {};
	a.abort = function() {
		b.abort()
	};
	a.execute = function(a) {
		b.load(a)
	};
	a.add = function(d, j, a, e, g, h, i, f) {
		var c = h;
		if (i)
			c = c | N.Flags.CLIENTPROXY;
		b.add(d, (new $Request(j, d, c, a)).setHeaders(g).setPostString(e)
						.setTimeout(f).setObject(a && a.pool))
	};
	return a
}
Live.Controls.CustomizeDialogThemesTab = function(l) {
	Live.Controls.CustomizeDialogThemesTab.initializeBase(this, arguments);
	var e = this, a = {};
	a.selectedRecentThemeThumbnail = null;
	var b = new $Memory.Groups, d = l, k = "35em", c;
	this.initialize = function(b) {
		var a = e.getParameters();
		if (a.height != null)
			k = a.height;
		if (a.featured != null)
			c = a.featured;
		Live.Controls.CustomizeDialogThemesTab.getBaseMethod(this,
				"initialize", "$Binding").call(this, b)
	};
	this.dispose = function(c) {
		Live.Controls.CustomizeDialogThemesTab.getBaseMethod(this, "dispose",
				"$Binding").call(this, c);
		if (b != null) {
			b.dispose();
			b = null
		}
		a = null;
		e = null
	};
	this.getTabHeight = function() {
		return k
	};
	this.getDisplayName = function() {
		return GetString("live.sndefaultstrings.strings.l_themepicker_title")
	};
	this.getTabID = function() {
		return "ThemesTab"
	};
	this.getTabContainerDiv = function() {
		return l
	};
	this.init = function() {
	};
	this.render = function() {
		b.create(null).dispose();
		$Config.Themes._cssFiles = null;
		window.setTimeout(t, 0)
	};
	this.queryState = function() {
		return {
			themeID : $Config.Themes.current,
			themeVersion : $Config.Themes.version
		}
	};
	this.applyState = function(a) {
		$Config.Themes.applyTheme(a.themeID, false, a.themeVersion)
	};
	this.commitCurrentState = function() {
	};
	function t() {
		p()
	}
	this.ChangeSelection = function(m) {
		var j = d.getElementsByTagName("A"), c = null, n = $Config.Themes.current, h = null;
		for (var i = 0; i < j.length; i++) {
			var g = j[i];
			if (g.code != null) {
				var o = g.code, k = g.code.split(":");
				h = k[0];
				if (h.toLowerCase() == m.toLowerCase()) {
					c = g;
					break
				}
			}
		}
		if (c != null) {
			if (a.selectedThumbnail != null
					&& a.selectedThumbnail.parentNode != null)
				a.selectedThumbnail.parentNode.className = "Thumbnail";
			c.parentNode.className = "Thumbnail On";
			a.selectedThumbnail = c;
			var b = null;
			try {
				b = c.parentNode.parentNode.parentNode.parentNode;
				if (b.childNodes[1].style.display == "block")
					b = null
			} catch (p) {
			}
			if (b != null)
				f(b);
			var l = {
				OldTheme : n,
				NewTheme : h
			};
			if (h != null)
				e.fire("onthemeselected", l)
		}
	};
	function q() {
		$Config.Themes.FeaturedThemes.div = document.createElement("div");
		$Config.Themes.FeaturedThemes.div.id = "FeaturedThemeDiv";
		$Config.Themes.FeaturedThemes.div.tabIndex = "-1";
		d.appendChild($Config.Themes.FeaturedThemes.div);
		$Config.Themes.FeaturedThemes.FeaturedThemesDivParent = g($Config.Themes.FeaturedThemes.div);
		$Config.Themes.FeaturedThemes.FeaturedThemesDivParent.style.display = "none";
		i(
				GetString("live.sndefaultstrings.strings.l_themepicker_featuredthemes"),
				$Config.Themes.FeaturedThemes.FeaturedThemesDivParent)
	}
	function p() {
		if ($Config.Themes != null && Live.Themes.ThemePicker != null
				&& Live.Themes.ThemePicker.data != null) {
			q();
			if (c != null && c.length > 0) {
				var e = c.split(",");
				if (e.length > 0) {
					var b = 0, a = document.createElement("div");
					a.className = "Contents";
					a.style.display = "block";
					$Config.Themes.FeaturedThemes.div.appendChild(a);
					var i = {};
					for (var g = 0; g < e.length; g++) {
						if (b >= 8)
							break;
						var m = e[g], k = j(m);
						if (k != null) {
							b++;
							i[m] = k
						}
					}
					if (b > 0) {
						$Config.Themes.FeaturedThemes.FeaturedThemesDivParent.style.display = "block";
						h(a, i)
					}
				}
			}
			r(
					GetString("live.sndefaultstrings.strings.l_themepicker_yourthemes"),
					d);
			var f = document.createElement("ul");
			d.appendChild(f);
			f.className = "Categories";
			for (var l in Live.Themes.ThemePicker.data)
				s(l, Live.Themes.ThemePicker.data[l], f)
		}
	}
	function j(d) {
		var a = null;
		for (var c in Live.Themes.ThemePicker.data) {
			var b = Live.Themes.ThemePicker.data[c];
			try {
				a = b[d]
			} catch (e) {
			}
			if (a != null)
				return a
		}
		return null
	}
	function r(c, b) {
		var a = g(b);
		i(c, a)
	}
	function g(b) {
		var a = document.createElement("div");
		a.className = "Group";
		b.appendChild(a);
		return a
	}
	function i(d, c) {
		var a = document.createElement("h4");
		c.appendChild(a);
		var b = document.createElement("span");
		b.innerText = d;
		a.appendChild(b)
	}
	function o(a) {
		var b;
		if (a.srcElement.tagName.toLowerCase() == "a")
			b = a.srcElement;
		else
			b = a.srcElement.parentNode;
		f(b.parentNode.parentNode);
		a.returnValue = false;
		return false
	}
	function f(h) {
		var i = h.childNodes[0].childNodes[0], a = h.childNodes[1];
		if (a.getAttribute("thumbnailsDownloaded") != "true") {
			var k = a.childNodes[0];
			for (var e = 0; e < k.childNodes.length; e++) {
				var j = k.childNodes[e].childNodes[0].childNodes[0];
				j.src = j.getAttribute("src1")
			}
			a.setAttribute("thumbnailsDownloaded", "true")
		}
		var b = a.style.display == "block";
		a.style.display = b ? "none" : "block";
		i.setAttribute("title", GetString(b
						? "live.sndefaultstrings.strings.l_themepicker_expand"
						: "live.theme.strings.l_themepicker_collapse"));
		var d = i.childNodes[0], l = b ? "expand_" : "collapse_", m = b
				? "collapse_"
				: "expand_";
		d
				.setAttribute(
						"alt",
						GetString(b
								? "live.sndefaultstrings.strings.l_themepicker_expand"
								: "live.sndefaultstrings.strings.l_themepicker_collapse"));
		d.setAttribute("src", d.getAttribute("src").replace(l, m));
		if (!b) {
			var c = a.parentNode.parentNode.parentNode.parentNode, g = a.offsetTop
					+ a.offsetHeight, f = c.scrollTop + c.offsetHeight;
			if (g > f)
				c.scrollTop += g - f
		}
	}
	function m(a) {
		var b;
		if (a.srcElement.tagName.toLowerCase() == "a")
			b = a.srcElement;
		else
			b = a.srcElement.parentNode;
		var c = b.childNodes[0];
		c.setAttribute("src", c.getAttribute("src")
						.replace("_rest_", "_hover_"));
		a.returnValue = false;
		return false
	}
	function n(a) {
		var b;
		if (a.srcElement.tagName.toLowerCase() == "a")
			b = a.srcElement;
		else
			b = a.srcElement.parentNode;
		var c = b.childNodes[0];
		c.setAttribute("src", c.getAttribute("src")
						.replace("_hover_", "_rest_"));
		a.returnValue = false;
		return false
	}
	function s(j, f, r) {
		var i = GetString("live.sndefaultstrings.strings.themecategory."
				+ j.toLowerCase());
		if (!i)
			return;
		var l = 0;
		for (themeId in f) {
			var t = f[themeId];
			l++
		}
		if (l == 0)
			return;
		a.selectedThumbnail = null;
		var d = document.createElement("li");
		r.appendChild(d);
		d.className = "Category";
		d.code = j;
		var k = document.createElement("h4");
		d.appendChild(k);
		var c = document.createElement("a");
		k.appendChild(c);
		c.setAttribute("href", "#");
		c
				.setAttribute(
						"title",
						GetString("live.sndefaultstrings.strings.l_themepicker_expand"));
		b.create(null).Events.register(c, {
					onclick : o
				});
		b.create(null).Events.register(c, {
					onmouseover : m
				});
		b.create(null).Events.register(c, {
					onmouseout : n
				});
		var e = document.createElement("img");
		c.appendChild(e);
		e.setAttribute("src", $Config.Themes.url
						+ "hig/img/glyph/collapse_~right~_rest_dark.gif");
		e.setAttribute("width", "10");
		e.setAttribute("height", "10");
		e
				.setAttribute(
						"alt",
						GetString("live.sndefaultstrings.strings.l_themepicker_expand"));
		var p = document.createElement("span");
		c.appendChild(p);
		p.innerText = i;
		var g = document.createElement("div");
		d.appendChild(g);
		g.className = "Contents";
		var s = document.createElement("hr");
		d.appendChild(s);
		function q() {
			h(g, f, d)
		}
		window.setTimeout(q, 0)
	}
	function h(m, l, h) {
		var k = false, j = document.createElement("ul");
		m.appendChild(j);
		j.className = "Thumbnails";
		for (themeId in l) {
			var d = l[themeId], i = document.createElement("li");
			j.appendChild(i);
			i.className = "Thumbnail";
			var e = document.createElement("a");
			i.appendChild(e);
			var g = null;
			if (d.displayName != null)
				g = d.displayName;
			else
				g = "";
			e.href = "#";
			b.create(null).Events.register(e, {
						onclick : u
					});
			e.code = themeId + ":" + d.version;
			if ($Config.Themes.current.toLowerCase() == themeId.toLowerCase()) {
				i.className = "Thumbnail On";
				k = true;
				if (h == null)
					a.selectedRecentThemeThumbnail = e;
				else
					a.selectedThumbnail = e
			}
			var c = document.createElement("img");
			e.appendChild(c);
			c.style.height = "32px";
			c.style.width = "32px";
			if (h == null)
				c.setAttribute("src", $Config.Themes.baseUrl + themeId + "/"
								+ d.version + "/img/" + d.thumbnail);
			else
				c.setAttribute("src1", $Config.Themes.baseUrl + themeId + "/"
								+ d.version + "/img/" + d.thumbnail);
			c.alt = g;
			c.setAttribute("title", g);
			c.setAttribute("themable", "false")
		}
		if (h != null && k)
			f(h)
	}
	function u(i) {
		event.returnValue = false;
		var b = i.srcElement;
		if ("IMG" == b.tagName)
			b = b.parentElement;
		var k = b.code, c = b.code.split(":"), d = c[0], g = c[1], h = $Config.Themes.current, j = $Config.Themes.current
				+ ":" + $Config.Themes.version;
		$Config.Themes.applyTheme(d, false, g);
		if (a.selectedThumbnail != null
				&& a.selectedThumbnail.parentNode != null)
			a.selectedThumbnail.parentNode.className = "Thumbnail";
		if (a.selectedRecentThemeThumbnail != null)
			a.selectedRecentThemeThumbnail.parentNode.className = "Thumbnail";
		b.parentNode.className = "Thumbnail On";
		a.selectedThumbnail = b;
		var f = {
			OldTheme : h,
			NewTheme : d
		};
		e.fire("onthemeselected", f)
	}
};
Live.Controls.CustomizeDialogThemesTab.Events = new $Enum("onthemeselected");
Live.Controls.CustomizeDialogThemesTab.registerClass(
		"Live.Controls.CustomizeDialogThemesTab", "$Binding");
if ($Config.Themes == null)
	$Config.Themes = {};
$Config.Themes._previousTheme = null;
$Config.Themes._networkRequestBatch = null;
$Config.Themes._cssFiles = null;
$Config.Themes.applyTheme = function(o, i, r, c) {
	if ($Config.Themes._networkRequestBatch != null) {
		if (c)
			c(false);
		return false
	}
	if ($Config.Themes.current == null) {
		if (c)
			c(false);
		return false
	}
	if ($Config.Themes.current != o || i) {
		var j = $Config.Themes.current, g = $Config.Themes.version, n = false;
		$Config.Themes.current = o;
		$Config.Themes.version = r;
		$Config.Themes.ThemeBaseUrl = $Config.Themes.baseUrl
				+ $Config.Themes.current + "/" + $Config.Themes.version + "/";
		if (!i) {
			$Config.Themes._previousTheme = j;
			$Config.Themes._previousThemeVersion = g
		}
		var b = document.getElementsByTagName("link");
		for (var a = 0; a < b.length; a++)
			if (b[a].href.startsWith($Config.Themes.baseUrl
					+ $Config.Themes.current + "/" + $Config.Themes.version)) {
				n = true;
				b[a].disabled = false
			}
		if (!n) {
			if (i) {
				if (c)
					c(false);
				return false
			}
			var b = document.getElementsByTagName("link"), h = [], l = false;
			if ($Config.Themes._cssFiles == null) {
				$Config.Themes._cssFiles = [];
				l = true
			}
			var e = null;
			for (var a = 0; a < b.length; a++) {
				var f = b[a].href;
				if (e == null && f.startsWith($Config.Themes.baseUrl))
					e = b[a];
				if (f.startsWith($Config.Themes.baseUrl + j + "/" + g)) {
					if (l)
						$Config.Themes._cssFiles
								.push(f.substring(($Config.Themes.baseUrl + j
										+ "/" + g).length))
				} else if (f.startsWith($Config.Themes.baseUrl)
						&& b[a].disabled)
					h.push(b[a])
			}
			if ($Config.Themes._networkRequestBatch != null) {
				$Config.Themes._networkRequestBatch.abort();
				$Config.Themes._networkRequestBatch = null
			}
			$Config.Themes._networkRequestBatch = createNetworkBatch();
			for (var a = $Config.Themes._cssFiles.length - 1; a >= 0; a--) {
				var d = null;
				if (h.length != 0)
					d = h.pop();
				else if (e != null) {
					d = document.createElement("link");
					d.rel = "stylesheet";
					d.type = "text/css";
					e.insertAdjacentElement("beforeBegin", d)
				}
				$Config.Themes._networkRequestBatch.add($Network.Type.CSS,
						$Config.Themes.baseUrl + $Config.Themes.current + "/"
								+ $Config.Themes.version
								+ $Config.Themes._cssFiles[a], {
							pool : d
						})
			}
			var s = function() {
				$Config.Themes._networkRequestBatch = null;
				$Config.Themes.applyTheme($Config.Themes.current, true,
						$Config.Themes.version, c);
				if (c)
					c(true)
			};
			$Config.Themes._networkRequestBatch.execute(s)
		} else {
			var b = document.getElementsByTagName("link");
			for (var a = 0; a < b.length; a++)
				if (b[a].href != ""
						&& b[a].href.startsWith($Config.Themes.baseUrl)
						&& !b[a].href.startsWith($Config.Themes.baseUrl
								+ $Config.Themes.current + "/"
								+ $Config.Themes.version))
					b[a].disabled = true;
			var p = document.getElementsByTagName("IMG");
			for (var a = 0; a < p.length; a++) {
				var k = p[a], q = k.src, m = $Config.Themes.baseUrl
						+ $Config.Themes._previousTheme + "/"
						+ $Config.Themes._previousThemeVersion + "/";
				if (q.startsWith(m) && k.getAttribute("themable") != "false")
					k.src = q.replace(m, $Config.Themes.ThemeBaseUrl)
			}
			$Config.Themes._previousTheme = null;
			$Config.Themes._previousThemeVersion = null
		}
		return true
	}
};
registerNamespace("Live.Controls");
Live.Controls.NonModalDialog;
Live.Controls.CustomizeDialog = function(i) {
	Live.Controls.CustomizeDialog.initializeBase(this, arguments);
	var b = this, w = window.ActiveXObject ? 1 : 0, v = Spaces.IsRTL(), a = {}, c = new $Memory.Groups, f = true, g = false, e = 0, l = i, x = i, u = -1 < navigator.userAgent
			.search(/MSIE (\d+)/)
			&& RegExp.$1 <= 6, z = -1 < navigator.userAgent
			.search(/MSIE (\d+)/)
			&& RegExp.$1 == 7, d = null, k = false;
	this.initialize = function(d) {
		Live.Controls.CustomizeDialog.getBaseMethod(this, "initialize",
				"$Binding").call(this, d);
		a.tabs = {};
		a.initialState = {};
		var c = b.getParameters();
		if (c.minwidth == null)
			a.minwidth = "50em";
		else
			a.minwidth = c.minwidth;
		a.dialog = null;
		if (a.elHeader == null) {
			a.elHeader = document
					.getElementById("idCustomizeDialogMenuBarHeading");
			if (u)
				a.elHeader.style.width = a.minwidth;
			else
				a.elHeader.style.minWidth = a.minwidth
		}
		o();
		m();
		b.fire("ontabsinitialized", b);
		k = true
	};
	this.dispose = function(d) {
		Live.Controls.CustomizeDialog
				.getBaseMethod(this, "dispose", "$Binding").call(this, d);
		if (c != null) {
			c.dispose();
			c = null
		}
		a.tabs = null;
		if (a.dialog != null) {
			a.dialog.dispose();
			a.dialog = null
		}
		a = null;
		b = null
	};
	function o() {
		if (a.tabsContainer == null) {
			var d = '<div class="Body"></div><div class="ButtonArea"><button id="Live_CustomizeDialog_OK" class="Live_Controls_Button">'
					+ GetString("live.sndefaultstrings.strings.customizedialog.closetab")
					+ "</button></div>";
			a.tabsContainer = c.create("show").Nodes.create("div", {
						innerHTML : d,
						className : "CustomizeDialogMenuBar CustomizeDialog"
					}, {
						display : "none"
					}, null);
			i.insertAdjacentElement("afterend", a.tabsContainer);
			a.elDialogBody = a.tabsContainer.childNodes[0];
			a.elButtonArea = a.tabsContainer.childNodes[1];
			var b = a.tabsContainer.childNodes[1].childNodes[0];
			c.create(null).Events.register(b, {
						onclick : p
					});
			c.create(null).Events.register(b, {
						onkeypress : n
					});
			c.create(null).Events.register(a.tabsContainer, $Browser.isSafari()
							? {
								onkeydown : j
							}
							: {
								onkeypress : j
							});
			$Binding.extend(b)
		}
	}
	function r() {
		var b = a.dialog;
		if (b == null) {
			b = new Web.UI.Dialog;
			c.create(null).Events.register(document, {
						onclick : h
					});
			b.setContents(a.tabsContainer);
			a.dialog = b;
			a.shadow = new Web.UI.ShadowPopup(b);
			c.create(null).Properties.register(a.shadow)
		}
		return b
	}
	function h() {
		f = true;
		b.fire("onok", b);
		b.fire("onhide", b);
		if (g) {
			try {
				l.focus()
			} catch (e) {
				$Tracing.Error.SubmitFromException(e,
						"Live.Controls.CustomizeDialog.onDialogHidden()", 51)
			}
			g = false
		}
		var c = d[a.currentTab.getTabID()];
		if (c && c.parentNode)
			c.parentNode.className = "Tab"
	}
	function j() {
		if (event.keyCode === 27) {
			g = true;
			if (!f) {
				a.dialog.hide();
				h()
			}
			event.returnValue = false;
			return false
		}
	}
	function n() {
		g = true;
		if (!f) {
			a.dialog.hide();
			h()
		}
		event.returnValue = false;
		event.cancelBubble = true;
		return false
	}
	function p() {
		if (!f) {
			a.dialog.hide();
			h()
		}
		event.returnValue = false;
		return false
	}
	function m() {
		d = {};
		var e = 0, f = a.elHeader.getElementsByTagName("A"), g = f.length;
		while (e < g) {
			var b = f[e];
			b.parentNode.className = "Tab";
			c.create(null).Events.register(b, {
						onclick : q
					});
			d[b.getAttribute("tabid")] = b;
			e++
		}
	}
	function t(b) {
		var a = null;
		try {
			a = b.getTabWidth()
		} catch (c) {
		}
		if (a == null)
			return "35em";
		return a
	}
	function s(b) {
		var a = null;
		try {
			a = b.getTabHeight()
		} catch (c) {
		}
		if (a == null)
			return "35em";
		return a
	}
	this.selectMenuTab = function(h) {
		function n() {
			b.selectMenuTab(h)
		}
		if (!k) {
			setTimeout(n, 1);
			return
		}
		var x = a.dialog, g;
		if (x == null) {
			while ((Web == null || Web.UI == null || Web.UI.Dialog == null)
					&& e < 500) {
				e++;
				setTimeout(n, 100);
				return false
			}
			r();
			e = 0
		}
		if (a.tabs[h] == null) {
			var c = document.createElement("DIV");
			c.className = d[h].getAttribute("tabclassname");
			e++;
			$Binding.extend(c);
			while ((c.webBindings == null || c.webBindings.length == 0)
					&& e < 500) {
				setTimeout(n, 100);
				return false
			}
			if (c.webBindings == null || c.webBindings.length == 0)
				return;
			else
				g = c.webBindings[0];
			a.tabs[g.getTabID()] = g;
			a.elDialogBody.appendChild(c);
			g.init();
			a.initialState[h] = g.queryState();
			c.innerHTML = "";
			c.style.display = "none";
			g.render()
		}
		if (a.currentTab != null)
			a.currentTab.getTabContainerDiv().style.display = "none";
		a.tabs[h].getTabContainerDiv().style.display = "block";
		l = d[h];
		a.currentTab = a.tabs[h];
		var q = t(a.currentTab);
		a.elButtonArea.style.width = q;
		a.elDialogBody.style.width = q;
		a.elDialogBody.style.height = s(a.currentTab);
		for (var h in a.tabs) {
			var u = a.tabs[h], p = d[u.getTabID()];
			if (p && p.parentNode)
				p.parentNode.className = u == a.currentTab
						? "CurrentTab"
						: "Tab"
		}
		var o = d[a.currentTab.getTabID()].parentNode, j;
		if (w)
			j = 2;
		else
			j = 3;
		var m = Web.UI.getLocation(o);
		if (!$Browser.isSafari())
			a.tabsContainer.style.pixelTop = m.y + o.offsetHeight - j;
		else
			a.tabsContainer.style.pixelTop = document.body.scrollTop + m.y
					+ o.offsetHeight - j;
		if (v) {
			var i = a.tabsContainer.style;
			i.visibility = "hidden";
			i.display = "block";
			i.pixelLeft = m.right - a.tabsContainer.offsetWidth;
			i.visibility = "visible";
			i.display = "none"
		} else
			a.tabsContainer.style.pixelLeft = m.x;
		a.elDialogBody.style.display = "block";
		a.dialog.show();
		f = false;
		b.fire("onshow", b);
		a.shadow.invalidate();
		if (g != null && g.OnSelected != null)
			g.OnSelected();
		setTimeout(a.dialog.setFocus, 10);
		e = 0;
		return true
	};
	function q(c) {
		var a = c.srcElement.getAttribute("tabid");
		b.selectMenuTab(a);
		b.fire("onmenutabdisplayed", a);
		event.returnValue = false;
		event.cancelBubble = true
	}
};
Live.Controls.CustomizeDialog.Events = new $Enum("onshow", "onhide", "onok",
		"oncancel", "ontabsinitialized", "onmenutabdisplayed");
Live.Controls.CustomizeDialog.registerClass("Live.Controls.CustomizeDialog",
		"$Binding");
registerNamespace("Spaces.Customize");
Spaces.Customize.CustomizeManager = function() {
	Spaces.Customize.CustomizeManager.initializeBase(this, arguments);
	var b = this, c, g, f, e = new $Memory.Groups, h = e.create(null), a = null, d = null;
	this.initialize = function() {
		Spaces.Customize.CustomizeManager.callBaseMethod(this, "initialize",
				arguments);
		b.registerFor("Spaces.LayoutManager", o);
		b.registerFor("Live.Controls.CustomizeDialogThemesTab", l);
		b.registerFor("Live.Controls.CustomizeDialog", m);
		b.registerFor("Spaces.Customize.CustomThemeTab", n);
		b.registerFor("Spaces.Customize.ModuleTab", q);
		b.registerFor("Spaces.Customize.LayoutTab", p)
	};
	this.dispose = function() {
		Spaces.Customize.CustomizeManager.callBaseMethod(this, "dispose",
				arguments);
		if (e != null) {
			e.dispose();
			e = null
		}
		b = null;
		a = null
	};
	function o(e, b) {
		if (b) {
			d = e;
			var c = true;
			if (c) {
				var a = document.getElementById("EditSaveButton");
				a.disabled = false;
				a.className = a.className.replace("Disabled", "Default")
			}
		}
	}
	function l(c, b) {
		var a = c;
		if (b)
			h.Events.register(a, {
						onthemeselected : i
					});
		else
			a.detachEvent("onthemeselected", i)
	}
	function j() {
		var b = window.location.href;
		if (b.indexOf("tab=Module") > 0)
			a.selectMenuTab("ModuleTab");
		else if (b.indexOf("tab=Themes") > 0)
			a.selectMenuTab("ThemesTab");
		else if (b.indexOf("tab=Layout") > 0)
			a.selectMenuTab("LayoutTab");
		else if (b.indexOf("tab=Custom") > 0)
			a.selectMenuTab("CustomThemeTab")
	}
	function m(c, b) {
		var d = {};
		a = c;
		if (b) {
			h.Events.register(a, {
						onmenutabdisplayed : k
					});
			h.Events.register(a, {
						ontabsinitialized : j
					})
		} else {
			a.detachEvent("onmenutabdisplayed", k);
			a.detachEvent("ontabsinitialized", j)
		}
	}
	function k(a) {
		if (a.Package == "CustomThemeTab" && c != null)
			c.OnSelected();
		else if (a.Package == "ModuleTab" && g != null)
			g.OnSelected();
		else if (a.Package == "LayoutTab" && f != null)
			f.OnSelected()
	}
	function n(b, a) {
		if (a)
			c = b
	}
	function q(b, a) {
		if (a)
			g = b
	}
	function p(b, a) {
		if (a)
			f = b
	}
	function i(a) {
		if (a.Package.OldTheme != a.Package.NewTheme) {
			if (d)
				d.dirtyPage();
			if (c != null)
				c.SetThemeProperties(a.Package.NewTheme);
			else
				d.themeChanged = true
		}
	}
};
Spaces.Customize.CustomizeManager.registerClass(
		"Spaces.Customize.CustomizeManager", "$Binding");
registerNamespace("Spaces.Customize");
Spaces.Customize.LayoutTab = function(g) {
	Spaces.Customize.LayoutTab.initializeBase(this, arguments);
	var b = this, d = null, e = [], a = null, c, j = "35em", h = "35em", f = false;
	this.initialize = function() {
		Spaces.Customize.LayoutTab
				.callBaseMethod(this, "initialize", arguments);
		b.registerFor("Spaces.LayoutManager", i)
	};
	this.dispose = function() {
		Spaces.Customize.LayoutTab.callBaseMethod(this, "dispose", arguments);
		if (d != null) {
			d.dispose();
			d = null
		}
		b = null;
		g = null;
		e = null;
		a = null
	};
	this.getTabWidth = function() {
		return j
	};
	this.getTabHeight = function() {
		h = screen.height <= 768 ? "25em" : "35em";
		return h
	};
	this.getDisplayName = function() {
		return GetString("live.sndefaultstrings.strings.secondarynav.spacescustomize.layout.title")
	};
	this.getTabID = function() {
		return "LayoutTab"
	};
	this.getTabContainerDiv = function() {
		return g
	};
	this.init = function() {
		b._initializeHelper()
	};
	this.OnSelected = function() {
		if (f)
			return;
		f = true;
		b.render(true)
	};
	this.render = function(c) {
		if (!c)
			return;
		for (var a = 0; a < g_Spaces_Customize_Arguments_Layout.item_list_args.inner_binding_args.length; a++)
			var d = b
					._addLayoutItem(g_Spaces_Customize_Arguments_Layout.item_list_args.inner_binding_args[a]);
		b._setSelected(b.queryState())
	};
	this._addLayoutItem = function(f) {
		var h = document.createElement("div");
		g.appendChild(h);
		h.className = "layoutContainer";
		var a = document.createElement("a");
		h.appendChild(a);
		e.push(a);
		a.setAttribute("href", "#");
		a.setAttribute("layoutid", f.layout_id);
		var c = document.createElement("img");
		a.appendChild(c);
		c.alt = c.title = f.tooltip;
		c.src = f.url;
		c.style.pixelWidth = f.width;
		c.style.pixelHeight = f.height;
		d.create(null).Events.register(a, {
					onclick : b._layoutItemClicked
				})
	};
	this._layoutItemClicked = function(c) {
		var a = c.srcElement;
		if (a.nodeName == "IMG")
			a = a.parentElement;
		var d = a.getAttribute("layoutid");
		b.applyState(d);
		c.returnValue = false;
		return false
	};
	this.queryState = function() {
		if (a && a.getLayoutTypeName())
			return a.getLayoutTypeName();
		return ""
	};
	this.applyState = function(d) {
		if (!d) {
			d = c;
			if (!d)
				return
		}
		if (a && a.getLayoutTypeName()) {
			if (!c)
				c = a.getLayoutTypeName();
			if (d != a.getLayoutTypeName()) {
				a.setLayout(d);
				b._setSelected(d)
			}
		}
	};
	this.commitCurrentState = function() {
	};
	this._initializeHelper = function() {
		if (!d)
			d = new $Memory.Groups
	};
	this._setSelected = function(c) {
		if (!f)
			return;
		for (var b = 0; b < e.length; b++) {
			var a = e[b];
			if (a.getAttribute("layoutid") == c)
				a.className += " SelectionBG";
			else
				a.className = a.className
						.removeSpaceDelimitedString("SelectionBG")
		}
	};
	function i(e, d) {
		if (d) {
			a = e;
			if (!c && a.getLayoutTypeName()) {
				c = a.getLayoutTypeName();
				b._setSelected(c)
			}
		} else
			a = null
	}
};
Spaces.Customize.LayoutTab.registerClass("Spaces.Customize.LayoutTab",
		"$Binding");
registerNamespace("Spaces.Customize");
Spaces.Customize.ModuleTab = function(k, e) {
	Spaces.Customize.ModuleTab.initializeBase(this, arguments);
	e = this.getParameters();
	var f = this, a = null, b = new $Memory.Groups, c = k, v = "35em", i = "35em", g = false, d = false;
	this.initialize = function() {
		Spaces.Customize.ModuleTab
				.callBaseMethod(this, "initialize", arguments);
		f.registerFor("Spaces.LayoutManager", n)
	};
	this.dispose = function() {
		Spaces.Customize.ModuleTab.callBaseMethod(this, "dispose", arguments);
		if (b != null) {
			b.dispose();
			b = null
		}
		f = null
	};
	this.getTabWidth = function() {
		return v
	};
	this.getTabHeight = function() {
		i = screen.height <= 768 ? "25em" : "35em";
		return i
	};
	this.getDisplayName = function() {
		return GetString("live.sndefaultstrings.strings.secondarylayout.editpartssetting")
	};
	this.getTabID = function() {
		return "ModuleTab"
	};
	this.getTabContainerDiv = function() {
		return k
	};
	this.init = function() {
	};
	function t() {
		if (b)
			b.dispose();
		if (c && c.firstChild)
			c.removeChild(c.firstChild)
	}
	this.OnSelected = function() {
		if (g)
			if (d)
				t();
			else
				return;
		d = false;
		g = true;
		f.render(true)
	};
	this.refresh = function() {
		d = true
	};
	this.render = function(f) {
		if (!f)
			return;
		if (b == null)
			b = new Web.UI.Utilities.CleanupHelper;
		else
			b.dispose();
		var d = document.createElement("div");
		c.appendChild(d);
		d.style.display = "block";
		var e = document.createElement("ul");
		d.appendChild(e);
		e.className = "Categories";
		for (var a = 0; a < g_Spaces_Customize_Arguments_Parts.categories.length; a++)
			if (r(g_Spaces_Customize_Arguments_Parts.categories[a]))
				q(g_Spaces_Customize_Arguments_Parts.categories[a], e)
	};
	this.queryState = function() {
	};
	this.applyState = function() {
	};
	this.commitCurrentState = function() {
	};
	function n(c, b) {
		if (b)
			a = c;
		else
			a = null
	}
	function p(a) {
		var b;
		if (a.srcElement.tagName.toLowerCase() == "a")
			b = a.srcElement;
		else
			b = a.srcElement.parentNode;
		s(b.parentNode.parentNode);
		a.returnValue = false;
		return false
	}
	function s(d) {
		var c = d.childNodes[0].childNodes[0], e = d.childNodes[1], a = e.style.display == "block";
		e.style.display = a ? "none" : "block";
		c
				.setAttribute(
						"title",
						a
								? GetString("live.sndefaultstrings.strings.customize.expand")
								: GetString("live.sndefaultstrings.strings.customize.collapse"));
		var b = c.childNodes[0], f = a ? "expand" : "collapse", g = a
				? "collapse"
				: "expand";
		b
				.setAttribute(
						"alt",
						a
								? GetString("live.sndefaultstrings.strings.customize.expand")
								: GetString("live.sndefaultstrings.strings.customize.collapse"));
		b.setAttribute("src", b.getAttribute("src").replace(f, g))
	}
	function m(a) {
		var b;
		if (a.srcElement.tagName.toLowerCase() == "a")
			b = a.srcElement;
		else
			b = a.srcElement.parentNode;
		var c = b.childNodes[0];
		c.setAttribute("src", c.getAttribute("src").replace("rest", "hover"));
		a.returnValue = false;
		return false
	}
	function o(a) {
		var b;
		if (a.srcElement.tagName.toLowerCase() == "a")
			b = a.srcElement;
		else
			b = a.srcElement.parentNode;
		var c = b.childNodes[0];
		c.setAttribute("src", c.getAttribute("src").replace("hover", "rest"));
		a.returnValue = false;
		return false
	}
	function r(c) {
		var d = false;
		for (var b = 0; b < c.parts.length; b++) {
			var e = a.findPartDefinition(c.parts[b]);
			if (e != null) {
				d = true;
				break
			}
		}
		return d
	}
	function h(a, b) {
		var c = true;
		if (a && b)
			for (var d = 0; d < a.length; d++)
				if (a[d] == b) {
					c = false;
					break
				}
		if (c == true)
			a.push(b);
		return c
	}
	function q(g, C) {
		var v = true, z = g.name.toLowerCase() != "featured", n;
		if (z)
			n = '<li class="Category Collapsable"><h4><a id="ModuleTab_{0}_anchor" href="#" title="{1}"><img src="{2}" alt="{1}"><span>{3}</span></a></h4><div id="ModuleTab_CategoryDiv_{0}" style="display:{5};" class="Contents"><ul>{4}{6}</ul></div><div style="clear:both;"></div></li><div style="margin-top: -2px; margin-bottom: -2px;"><hr /></div>';
		else
			n = '<li class="Category"><h4><span>{3}</span></h4><div id="ModuleTab_CategoryDiv_{0}" style="display:{5};" class="Contents"><ul>{4}{6}</ul></div><div style="clear:both;"></div></li><div style="margin-top: -2px; margin-bottom: -2px;"><hr /></div>';
		var s = "", y = [];
		for (var i = 0; i < g.parts.length; i++) {
			var c = a.findPartDefinition(g.parts[i]), d = a
					.findParts(g.parts[i]);
			if (c != null)
				if (c.type.toLowerCase().indexOf("gadgetgallery:") == 0) {
					if (h(y, c.type)) {
						var u = '<li><a href="#" class="item" id="ModuleTab_Part_{4}" name="ModuleTab_Part_{4}" title="{0}" partid="{4}"><img src="{1}" alt="{0}" title="{0}"><span class="label" nowrap>{2}</span><span class="action" id="ModuleTab_{5}_{4}">{3}</span></a></li>', t = a
								.findPartById(c.type), A = t != null
								? t.visible
								: false;
						s += u
								.format(
										c.tooltip.encodeHtml(),
										c.thumbnail_url,
										c.title.encodeHtml(),
										A
												? GetString("live.sndefaultstrings.strings.modulepicker2.hide")
														.encodeHtml()
												: GetString("live.sndefaultstrings.strings.modulepicker2.show")
														.encodeHtml(), c.type,
										A ? "Hide" : "Show")
					}
				} else if (c.type.toLowerCase() == "gadgetgallery") {
					for (var f = 0; f < d.length; f++)
						if (h(y, d[f].id)) {
							var u = '<li><a href="#" class="item" id="ModuleTab_Part_{4}" name="ModuleTab_Part_{4}" title="{0}" partid="{4}"><img src="{1}" alt="{0}" title="{0}"><span class="label" nowrap>{2}</span><span class="action" id="ModuleTab_{5}_{4}">{3}</span></a>';
							"</li>";
							s += u
									.format(
											d[f].title.encodeHtml(),
											c.thumbnail_url,
											d[f].title.encodeHtml(),
											d[f].visible
													? GetString("live.sndefaultstrings.strings.modulepicker2.hide")
															.encodeHtml()
													: GetString("live.sndefaultstrings.strings.modulepicker2.show")
															.encodeHtml(),
											d[f].id, d[f].visible
													? "Hide"
													: "Show")
						}
				} else {
					var u = '<li><a href="#" class="item" id="ModuleTab_PartDef_{5}" name="ModuleTab_PartDef_{5}" title="{0}" partdef="{5}"><img src="{1}" alt="{0}" title="{0}"><span class="label" nowrap>{2}</span><span class="action" id="ModuleTab_{6}_{5}">{3}</span></a>{4}</li>', l = "", k = "", q = "";
					if (c.max_instances == 1) {
						if (!c.required) {
							var t = a.findPartById(c.type);
							if (t != null && t.issubpart) {
								l = GetString("live.sndefaultstrings.strings.modulepicker2.unavailable")
										.encodeHtml();
								k = "Unavailable"
							} else if (d.length > 0 && d[0].visible) {
								l = GetString("live.sndefaultstrings.strings.modulepicker2.hide")
										.encodeHtml();
								k = "Hide"
							} else {
								l = GetString("live.sndefaultstrings.strings.modulepicker2.show")
										.encodeHtml();
								k = "Show"
							}
						}
					} else {
						var D = a.getInstanceCount(g.parts[i]);
						if (D < c.max_instances) {
							l = GetString("live.sndefaultstrings.strings.modulepicker2.add")
									.encodeHtml();
							k = "Show"
						}
						q += '<div class="subitems">';
						for (var f = 0; f < d.length; f++) {
							var B = '<a href="#" class="item" id="ModuleTab_Part_{2}"  name="ModuleTab_Part_{2}" title="{0}" partid="{2}"><span></span><span class="label" nowrap>{0}</span><span class="action" id="ModuleTab_{3}_{2}">{1}</span></a>';
							q += B
									.format(
											d[f].title.encodeHtml(),
											d[f].visible
													? GetString("live.sndefaultstrings.strings.modulepicker2.hide")
															.encodeHtml()
													: GetString("live.sndefaultstrings.strings.modulepicker2.show")
															.encodeHtml(),
											d[f].id, d[f].visible
													? "Hide"
													: "Show")
						}
						q += "</div>"
					}
					s += u.format(c.tooltip.encodeHtml(), c.thumbnail_url,
							c.title.encodeHtml(), l, q, c.type, k)
				}
		}
		var r = "";
		if (g.name.toLowerCase() == "gadgets" && e.gallerylink != "") {
			r = '<li><a href="{0}" class="gallerylink">{1}</a></li>';
			r = r
					.format(
							e.gallerylink.encodeHtml(),
							GetString("live.sndefaultstrings.strings.modulepicker.addGadgetsFromGallery"))
		}
		n = n
				.format(
						g.name,
						v
								? GetString("live.sndefaultstrings.strings.customize.collapse")
								: GetString("live.sndefaultstrings.strings.customize.expand"),
						v
								? $Config.Themes.url
										+ "hig/img/glyph/expand_~Right~_rest_dark.gif"
								: $Config.Themes.url
										+ "hig/img/glyph/collapse_~Right~_rest_dark.gif",
						g.title.encodeHtml(), s, v ? "block" : "none", r);
		C.insertAdjacentHTML("beforeEnd", n);
		if (z) {
			var x = document.getElementById("ModuleTab_" + g.name + "_anchor");
			b.create(null).Events.register(x, {
						onclick : p
					});
			b.create(null).Events.register(x, {
						onmouseover : m
					});
			b.create(null).Events.register(x, {
						onmouseout : o
					})
		}
		var E = document.getElementById("ModuleTab_CategoryDiv_" + g.name), w = E
				.getElementsByTagName("a");
		for (var i = 0; i < w.length; i++)
			if (w[i].className != "gallerylink")
				b.create(null).Events.register(w[i], {
							onclick : j
						})
	}
	function l(b) {
		var d = [];
		if (b) {
			b = b.toLowerCase();
			for (var c = 0; c < g_Spaces_Customize_Arguments_Parts.partdefs.length; c++)
				if (a.isSameAllocationGroup(b,
						g_Spaces_Customize_Arguments_Parts.partdefs[c].type))
					d.push(g_Spaces_Customize_Arguments_Parts.partdefs[c])
		}
		return d
	}
	function j(l) {
		event.returnValue = false;
		if (a) {
			var f = l.srcElement;
			if ("A" != f.tagName)
				f = f.parentElement;
			var g = f.getAttribute("partid"), b = a.findPartById(g), c = a
					.findPartDefinition(b != null ? b.type : f
							.getAttribute("partdef"));
			if (b == null && c != null)
				b = a.findPartById(c.type);
			if (b != null && b.issubpart)
				return false;
			var j = null;
			if (c == null && g.toLowerCase().indexOf("gadgetgallery:") == 0) {
				c = a.findPartDefinition(g);
				j = g.substr("gadgetgallery:".length)
			}
			var d = Spaces.Customize.ModuleTab.OpTypes, e = d.NoOp;
			if (b == null)
				if (c.max_instances > 1) {
					var k = a.getInstanceCount(c.type);
					if (k < c.max_instances
							&& c.type.toLowerCase() != "gadgetgallery")
						e = d.Create
				} else
					e = d.Add;
			else if (!c.required)
				if (b.visible)
					e = d.Hide;
				else
					e = d.Show;
			switch (e) {
				case d.Create :
					b = {
						id : c.type + a.generateHash().toLowerCase(),
						type : c.type,
						visible : 1,
						title : c.title
					};
					g_Spaces_Customize_Arguments_Parts.parts.push(b);
					addLink = true;
					break;
				case d.Add :
					b = a.findPartById(c.type);
					if (b == null) {
						if (c.type.toLowerCase().indexOf("gadgetgallery:") == 0)
							b = {
								id : c.type,
								type : "GadgetGallery",
								visible : 1,
								title : c.title
							};
						else
							b = {
								id : c.type,
								type : c.type,
								visible : 1,
								title : c.title
							};
						g_Spaces_Customize_Arguments_Parts.parts.push(b)
					}
					break;
				case d.Remove :
					b.visible = false;
					break;
				case d.Show :
				case d.Hide :
					if (b)
						b.visible = !b.visible
			}
			if (e != d.NoOp && b != null && c != null) {
				a.dirtyPage();
				var i = document.getElementById(b.id);
				if (i)
					i.style.display = b.visible ? "" : "none";
				else if (b.visible) {
					var h = null;
					h = b.type == "GettingStarted" ? (h = a
							.GetLayoutCellById("SupplementalN")) : null;
					a
							.generatePartTemplate(
									b.id,
									b.title,
									GetString("live.sndefaultstrings.strings.spacesettings.placeholder")
											.format('<span class="bold">',
													"</span>"), c.expansion, j,
									h)
				}
				u(b, c, e == d.Create)
			}
		}
		return false
	}
	function u(d, f, n) {
		if (n) {
			var e = document.getElementsByName("ModuleTab_PartDef_" + f.type);
			for (var c = 0; c < e.length; c++) {
				var g = e[c], h = '<a href="#" class="item" name="ModuleTab_Part_{2}" title="{0}" partid="{2}"><span></span><span class="label" nowrap>{0}</span><span class="action">{1}</span></a>';
				h = h
						.format(
								d.title.encodeHtml(),
								d.visible
										? GetString("live.sndefaultstrings.strings.modulepicker2.hide")
												.encodeHtml()
										: GetString("live.sndefaultstrings.strings.modulepicker2.show")
												.encodeHtml(), d.id);
				g.nextSibling.insertAdjacentHTML("afterBegin", h);
				b.create(null).Events.register(g.nextSibling.childNodes[0], {
							onclick : j
						})
			}
		}
		var k = l(f.type);
		for (var i = 0; i < k.length; i++) {
			var e = document
					.getElementsByName("ModuleTab_PartDef_" + k[i].type);
			for (var c = 0; c < e.length; c++) {
				var g = e[c];
				if (f.max_instances > 1) {
					var m = a.getInstanceCount(f.type);
					g.childNodes[2].innerHTML = m < f.max_instances
							? GetString("live.sndefaultstrings.strings.modulepicker2.add")
									.encodeHtml()
							: ""
				} else
					g.childNodes[2].innerHTML = d.visible
							? GetString("live.sndefaultstrings.strings.modulepicker2.hide")
									.encodeHtml()
							: GetString("live.sndefaultstrings.strings.modulepicker2.show")
									.encodeHtml()
			}
		}
		var e = document.getElementsByName("ModuleTab_Part_" + d.id);
		for (var c = 0; c < e.length; c++) {
			var g = e[c];
			g.childNodes[2].innerHTML = d.visible
					? GetString("live.sndefaultstrings.strings.modulepicker2.hide")
							.encodeHtml()
					: GetString("live.sndefaultstrings.strings.modulepicker2.show")
							.encodeHtml()
		}
	}
};
Spaces.Customize.ModuleTab.registerClass("Spaces.Customize.ModuleTab",
		"$Binding");
Spaces.Customize.ModuleTab.skipClass = true;
Spaces.Customize.ModuleTab.Params = new $Enum("gallerylink");
Spaces.Customize.ModuleTab.OpTypes = new $Enum("NoOp", "Create", "Add",
		"Remove", "Show", "Hide");
registerNamespace("Spaces.Customize");
Spaces.Customize.CustomThemeTab = function(ab, Z) {
	Spaces.Customize.CustomThemeTab.initializeBase(this, arguments);
	Z = this.getParameters();
	var b = g_Spaces_Customize_Arguments_CustomTheme, B = false, l, t, g, K, k = null, L = 16777215, Db = "0123456789ABCDEF", w = 2147483647, F = w
			- 1, d = null, h = null, s, Bb = "35em", X = "35em", r = [{
		title : GetString("live.sndefaultstrings.strings.customtheme.pickerdarkred"),
		color : "C00000"
	}, {
		title : GetString("live.sndefaultstrings.strings.customtheme.pickerred"),
		color : "FF0000"
	}, {
		title : GetString("live.sndefaultstrings.strings.customtheme.pickerorange"),
		color : "FFC000"
	}, {
		title : GetString("live.sndefaultstrings.strings.customtheme.pickeryellow"),
		color : "FFFF00"
	}, {
		title : GetString("live.sndefaultstrings.strings.customtheme.pickerlightgreen"),
		color : "92D050"
	}, {
		title : GetString("live.sndefaultstrings.strings.customtheme.pickergreen"),
		color : "00B050"
	}, {
		title : GetString("live.sndefaultstrings.strings.customtheme.pickerlightblue"),
		color : "00B0F0"
	}, {
		title : GetString("live.sndefaultstrings.strings.customtheme.pickerblue"),
		color : "0070C0"
	}, {
		title : GetString("live.sndefaultstrings.strings.customtheme.pickerdarkblue"),
		color : "002060"
	}, {
		title : GetString("live.sndefaultstrings.strings.customtheme.pickerpurple"),
		color : "7030A0"
	}], e = [{
				tbid : "CustomThemeTab_TextCategory_Text",
				arg : "text_color"
			}, {
				tbid : "CustomThemeTab_TextCategory_Link",
				arg : "link_color"
			}, {
				tbid : "CustomThemeTab_BackgroundCategory_Body",
				arg : "body_background_color"
			}, {
				tbid : "CustomThemeTab_BackgroundCategory_Page",
				arg : "page_background_color"
			}, {
				tbid : "CustomThemeTab_BackgroundCategory_Selection",
				arg : "selection_background_color"
			}, {
				tbid : "CustomThemeTab_BackgroundCategory_Hover",
				arg : "hover_background_color"
			}, {
				tbid : "CustomThemeTab_ModulesCategory_BorderColor",
				arg : "container_border_color"
			}, {
				tbid : "CustomThemeTab_ModulesCategory_Background",
				arg : "container_background_color"
			}, {
				tbid : "CustomThemeTab_ModulesCategory_HeaderBackground",
				arg : "container_header_background_color"
			}, {
				tbid : "CustomThemeTab_ModulesCategory_HeaderLink",
				arg : "container_header_link_color"
			}], m = this, n = null, f = new $Memory.Groups, c = f.create(null), z = ab, V = false, x = false, o = 0, M = 1, U = 2, A = Spaces
			.IsRTL();
	this.initialize = function() {
		Spaces.Customize.CustomThemeTab.callBaseMethod(this, "initialize",
				arguments);
		m.registerFor("Spaces.LayoutManager", kb);
		m.registerFor("Live.Controls.CustomizeDialog", fb)
	};
	this.dispose = function() {
		Spaces.Customize.CustomThemeTab.callBaseMethod(this, "dispose",
				arguments);
		W();
		m = null
	};
	function W() {
		if (f != null) {
			f.dispose();
			f = null;
			c = null
		}
		if (t) {
			t.onreadystatechange = null;
			t.onload = null
		}
		if (d) {
			d.dispose();
			d = null
		}
		if (l && l._element) {
			$Binding.remove(l._element);
			l = null
		}
		if (g && g._element) {
			$Binding.remove(g._element);
			g = null
		}
		if (h) {
			h.detachEvent("oncancel", u);
			h.detachEvent("onok", u);
			h = null
		}
		if (z && z.firstChild)
			z.removeChild(z.firstChild);
		s = null
	}
	this.getTabWidth = function() {
		return Bb
	};
	this.getTabHeight = function() {
		X = screen.height <= 768 ? "25em" : "35em";
		return X
	};
	this.getDisplayName = function() {
		return GetString("live.sndefaultstrings.strings.customtheme.tab")
	};
	this.getTabID = function() {
		return "CustomThemeTab"
	};
	this.getTabContainerDiv = function() {
		return ab
	};
	this.init = function() {
	};
	function a(b) {
		var a = s[b];
		if (a == null)
			a = s[b] = document.getElementById(b);
		return a
	}
	function mb() {
		if (d && d.IsVisible() == true)
			d.hide()
	}
	this.OnSelected = function() {
		if (V) {
			if (x) {
				x = false;
				if (o & U) {
					W();
					m.render(true)
				} else if (o & M) {
					if (k)
						v(true);
					else
						v(false);
					hb()
				}
				o = 0
			}
		} else {
			x = false;
			o = 0;
			V = true;
			m.render(true)
		}
	};
	this.render = function(j) {
		if (!j)
			return;
		if (f != null) {
			f.dispose();
			f = null
		}
		c = null;
		f = new $Memory.Groups;
		c = f.create(null);
		s = {};
		s.aDefaultColorSwatches = [];
		if (d == null) {
			var h = {};
			h.max_row_size = 18;
			d = new Spaces.Customize.ColorPicker(h)
		}
		var g = '<div style="display:block;" id="divCustomizationTab" ><div class="instructions" id="divInstructions" >{0}</div><ul class="Categories" id="CustomColors_Categories"></ul><div style="display:block;"><a id="CustomThemeTab_revert" href="#">{1}</a></div></div>';
		g = g
				.format(
						GetString("live.sndefaultstrings.strings.customtheme.helpertext")
								.format(g_js_siteType),
						GetString("live.sndefaultstrings.strings.customtheme.revert")
								.encodeHtml());
		z.insertAdjacentHTML("beforeEnd", g);
		c.Events.register(document.getElementById("CustomThemeTab_revert"), {
					onclick : Cb
				});
		c.Events
				.register(
						document.getElementById("divCustomizationTab").parentNode.parentNode.parentNode,
						{
							onclick : mb
						});
		var b = document.getElementById("CustomColors_Categories");
		gb(b);
		cb(b);
		bb(b);
		eb(b);
		E(document.getElementById("CustomThemeTab_BackgroundCategory_anchor").parentNode.parentNode);
		E(document
				.getElementById("CustomThemeTab_BackgroundImageCategory_anchor").parentNode.parentNode);
		E(document.getElementById("CustomThemeTab_ModulesCategory_anchor").parentNode.parentNode);
		var e = {}, a;
		e["importance"] = "Med";
		e["makevisible"] = "1";
		a = document.createElement("div");
		a.innerHTML = GetString("live.sndefaultstrings.strings.customtheme.disabled");
		l = $Spaces.attachElementBindingSync(a,
				"Spaces.Controls.NotificationBar", null, e, "nb");
		var i = document.getElementById("divInstructions");
		document.getElementById("divCustomizationTab").insertBefore(a, i);
		J(false);
		if (n.themeChanged == true)
			m.SetThemeProperties($Config.Themes.current);
		if (k == null)
			if (g_isInitialThemeSponsored.toLowerCase() == "true") {
				k = true;
				v(true)
			} else {
				k = false;
				v(false)
			}
		else if (k)
			v(true);
		else
			v(false);
		qb()
	};
	this.queryState = function() {
	};
	this.applyState = function() {
	};
	this.commitCurrentState = function() {
	};
	this.IsSponsoredTheme = function() {
		return k
	};
	function N(c) {
		a("CustomThemeTab_TextCategory_Text").disabled = c;
		a("CustomThemeTab_TextCategory_Link").disabled = c;
		a("CustomThemeTab_BackgroundCategory_Page").disabled = c;
		a("CustomThemeTab_BackgroundCategory_Body").disabled = c;
		a("CustomThemeTab_BackgroundCategory_Selection").disabled = c;
		a("CustomThemeTab_BackgroundCategory_Hover").disabled = c;
		a("CustomThemeTab_ModulesCategory_Background").disabled = c;
		a("CustomThemeTab_ModulesCategory_HeaderBackground").disabled = c;
		a("CustomThemeTab_ModulesCategory_HeaderLink").disabled = c;
		a("CustomThemeTab_ModulesCategory_BorderColor").disabled = c;
		a("CustomThemeTab_ModulesCategory_BorderStyle").disabled = c;
		a("CustomThemeTab_BackgroundImageCategory_Repeat").disabled = c;
		a("CustomThemeTab_BackgroundImageCategory_Alignment").disabled = c;
		a("CustomThemeTab_BackgroundImageCategory_Placement").disabled = c;
		a("CustomThemeTab_BackgroundImageCategory_Transparency").disabled = c;
		a("CustomThemeTab_BackgroundImageCategory_HideFrameImage").disabled = c;
		if (c == true) {
			a("idUploadImage").disabled = true;
			a("CustomThemeTab_BackgroundImageCategory_ShowBackgroundImage").disabled = true;
			a("CustomThemeTab_BackgroundImageCategory_HideBackgroundImage").disabled = true;
			a("CustomThemeTab_BackgroundImageCategory_UseCustomImage").disabled = true
		} else {
			a("CustomThemeTab_BackgroundImageCategory_ShowBackgroundImage").disabled = false;
			a("CustomThemeTab_BackgroundImageCategory_HideBackgroundImage").disabled = false;
			a("CustomThemeTab_BackgroundImageCategory_UseCustomImage").disabled = false;
			if (b.show_default_background_image == 1
					|| b.hide_background_image == 1)
				a("idUploadImage").disabled = true;
			else
				a("idUploadImage").disabled = false
		}
		a("CustomThemeTab_TextCategory_fontStyle_bold").disabled = c;
		a("CustomThemeTab_TextCategory_fontStyle_italic").disabled = c;
		a("CustomThemeTab_TextCategory_fontType").disabled = c;
		a("CustomThemeTab_TextCategory_fontSize").disabled = c;
		a("CustomThemeTab_ModulesCategory_fontStyle_italic").disabled = c;
		a("CustomThemeTab_ModulesCategory_fontType").disabled = c;
		a("CustomThemeTab_ModulesCategory_fontSize").disabled = c;
		document.getElementById("idFileBox").disabled = c
	}
	this.SetThemeProperties = function(f) {
		var c = false;
		if (Live.Themes && Live.Themes.ThemePicker
				&& Live.Themes.ThemePicker.data && !c) {
			var d = Live.Themes.ThemePicker.data;
			for (var e in d)
				if (d[e][f] != null) {
					var b = d[e][f], a = b["displayName"];
					c = true;
					if (b["type"] == "sponsored" || b["type"] == "premium"
							|| b["type"] == "test" || a != null && a != ""
							&& a.substr(0, 1) == "*"
							&& a.substr(a.length - 1, 1) == "*") {
						k = true;
						n.ApplyRemoveCustomCSS(false)
					} else {
						k = false;
						n.ApplyRemoveCustomCSS(true)
					}
					break
				}
		}
		if (!c) {
			k = true;
			n.ApplyRemoveCustomCSS(false)
		}
		x = true;
		o = o | M;
		return
	};
	function J(a) {
		if (l && l._element)
			if (a == true)
				l._element.style.display = "block";
			else
				l._element.style.display = "none"
	}
	function v(a) {
		if (a == true) {
			if (!B) {
				J(true);
				N(true);
				B = true
			}
		} else if (B) {
			J(false);
			N(false);
			B = false
		}
	}
	function gb(c) {
		var a = C(
				"CustomThemeTab_TextCategory",
				c,
				GetString("live.sndefaultstrings.strings.customtheme.textheader"));
		j(
				a,
				"CustomThemeTab_TextCategory_Text",
				GetString("live.sndefaultstrings.strings.customtheme.textcolor"),
				b.text_color);
		j(
				a,
				"CustomThemeTab_TextCategory_Link",
				GetString("live.sndefaultstrings.strings.customtheme.linkcolor"),
				b.link_color);
		a.appendChild(document.createElement("br"));
		R(a, "CustomThemeTab_TextCategory", b.text_font_type, b.text_font_size,
				b.text_font_bold, b.text_font_italic)
	}
	function cb(c) {
		var a = C(
				"CustomThemeTab_BackgroundCategory",
				c,
				GetString("live.sndefaultstrings.strings.customtheme.backgroundheader"));
		j(
				a,
				"CustomThemeTab_BackgroundCategory_Page",
				GetString("live.sndefaultstrings.strings.customtheme.backgroundpage"),
				b.page_background_color);
		j(
				a,
				"CustomThemeTab_BackgroundCategory_Body",
				GetString("live.sndefaultstrings.strings.customtheme.backgroundbody"),
				b.body_background_color);
		j(
				a,
				"CustomThemeTab_BackgroundCategory_Selection",
				GetString("live.sndefaultstrings.strings.customtheme.backgroundselected"),
				b.selection_background_color);
		j(
				a,
				"CustomThemeTab_BackgroundCategory_Hover",
				GetString("live.sndefaultstrings.strings.customtheme.backgroundhover"),
				b.hover_background_color)
	}
	function bb(h) {
		var a = C(
				"CustomThemeTab_BackgroundImageCategory",
				h,
				GetString("live.sndefaultstrings.strings.customtheme.catbkgimg"));
		db(a);
		var f = {};
		K = document.createElement("div");
		f["importance"] = "Med";
		f["makevisible"] = "1";
		g = $Spaces.attachElementBindingSync(K,
				"Spaces.Controls.NotificationBar", null, f, "nb");
		a.appendChild(K);
		y();
		var e = document.createElement("div");
		e.setAttribute("id", "idUploadControlDiv");
		a.appendChild(e);
		ib(e, b.spaceCnsId, b.bkgFolderCnsId, b.tempImageCnsId, b.postUrl);
		var d = document.createElement("div");
		d.style.paddingBottom = "10px";
		d.style.paddingLeft = "20px";
		d.innerHTML += '<input id="CustomThemeTab_BackgroundImageCategory_HideFrameImage" type="checkbox" '
				+ (b.show_frame_image == 1 ? "" : "CHECKED")
				+ " />"
				+ '<label for="CustomThemeTab_BackgroundImageCategory_HideFrameImage" style="padding-right:5px">'
				+ GetString("live.sndefaultstrings.strings.customtheme.hideframeimage")
				+ "</label>";
		a.appendChild(d);
		c.Events
				.register(
						document
								.getElementById("CustomThemeTab_BackgroundImageCategory_HideFrameImage"),
						{
							onclick : I
						});
		q(
				a,
				"CustomThemeTab_BackgroundImageCategory_Repeat",
				GetString("live.sndefaultstrings.strings.customtheme.repeat"),
				["default", "repeat", "norepeat"],
				[
						GetString("live.sndefaultstrings.strings.customtheme.option._default"),
						GetString("live.sndefaultstrings.strings.customtheme.option.repeat"),
						GetString("live.sndefaultstrings.strings.customtheme.option.norepeat")],
				b.background_repeat, "50%", "50%", "85%");
		q(
				a,
				"CustomThemeTab_BackgroundImageCategory_Alignment",
				GetString("live.sndefaultstrings.strings.customtheme.alignment"),
				["default", "left", "center", "right"],
				[
						GetString("live.sndefaultstrings.strings.customtheme.option._default"),
						GetString("live.sndefaultstrings.strings.customtheme.option.left"),
						GetString("live.sndefaultstrings.strings.customtheme.option.center"),
						GetString("live.sndefaultstrings.strings.customtheme.option.right")],
				b.background_alignment, "50%", "50%", "85%");
		q(
				a,
				"CustomThemeTab_BackgroundImageCategory_Placement",
				GetString("live.sndefaultstrings.strings.customtheme.placement"),
				["default", "top", "center", "bottom"],
				[
						GetString("live.sndefaultstrings.strings.customtheme.option._default"),
						GetString("live.sndefaultstrings.strings.customtheme.option.top"),
						GetString("live.sndefaultstrings.strings.customtheme.option.center"),
						GetString("live.sndefaultstrings.strings.customtheme.option.bottom")],
				b.background_placement, "50%", "50%", "85%");
		q(
				a,
				"CustomThemeTab_BackgroundImageCategory_Transparency",
				GetString("live.sndefaultstrings.strings.customtheme.transparency"),
				["default", "0", "1.5", "2.5", "4", "5.5", "7"],
				[
						GetString("live.sndefaultstrings.strings.customtheme.option._default"),
						"0", "2", "4", "6", "8", "10"],
				b.background_transparency, "50%", "50%", "85%")
	}
	function R(f, a, k, j, i, h) {
		var g, e, c, b, d;
		if (a == "CustomThemeTab_ModulesCategory") {
			g = "live.sndefaultstrings.strings.spacesettings.titlefont";
			e = "live.sndefaultstrings.strings.spacesettings.titlesize";
			c = "38%";
			b = "62%";
			d = "75%"
		} else {
			g = "live.sndefaultstrings.strings.spacesettings.font";
			e = "live.sndefaultstrings.strings.spacesettings.size";
			c = "23%";
			b = "77%";
			d = "70%"
		}
		q(
				f,
				a + "_fontType",
				GetString(g),
				[
						"default",
						GetString("live.sndefaultstrings.strings.L_RTEFONTARIALDEF_TEXT"),
						GetString("live.sndefaultstrings.strings.L_RTEFONTCOURIERNEWDEF_TEXT"),
						GetString("live.sndefaultstrings.strings.L_RTEFONTTIMESNEWROMANDEF_TEXT"),
						GetString("live.sndefaultstrings.strings.L_RTEFONTTAHOMADEF_TEXT"),
						GetString("live.sndefaultstrings.strings.L_RTEFONTVERDANADEF_TEXT"),
						GetString("live.sndefaultstrings.strings.L_RTELUCIDAHANDDEF_TEXT"),
						GetString("live.sndefaultstrings.strings.L_RTEFONTSEGOEDEF_TEXT"),
						GetString("live.sndefaultstrings.strings.L_RTEFONTENTRY1DEF_TEXT")],
				[
						GetString("live.sndefaultstrings.strings.customtheme.option._default"),
						GetString("live.sndefaultstrings.strings.L_RTEFONTARIAL_TEXT"),
						GetString("live.sndefaultstrings.strings.L_RTEFONTCOURIERNEW_TEXT"),
						GetString("live.sndefaultstrings.strings.L_RTEFONTTIMESNEWROMAN_TEXT"),
						GetString("live.sndefaultstrings.strings.L_RTEFONTTAHOMA_TEXT"),
						GetString("live.sndefaultstrings.strings.L_RTEFONTVERDANA_TEXT"),
						GetString("live.sndefaultstrings.strings.L_RTELUCIDAHAND_TEXT"),
						GetString("live.sndefaultstrings.strings.L_RTEFONTSEGOE_TEXT"),
						GetString("live.sndefaultstrings.strings.L_RTEFONTENTRY1_TEXT")],
				k, c, b, d);
		q(
				f,
				a + "_fontSize",
				GetString(e),
				["default", "x-small", "small", "medium"],
				[
						GetString("live.sndefaultstrings.strings.customtheme.option._default"),
						GetString("live.sndefaultstrings.strings.customtheme.size.xs"),
						GetString("live.sndefaultstrings.strings.customtheme.size.small"),
						GetString("live.sndefaultstrings.strings.customtheme.size.normal")],
				j, c, b, d);
		ub(f, a + "_fontStyle", c, b, i, h);
		pb(a, i, h)
	}
	function pb(a, c, b) {
		if (c)
			document.getElementById(a + "_fontStyle_bold").checked = true;
		if (b)
			document.getElementById(a + "_fontStyle_italic").checked = true
	}
	function ib(f, h, d, e, g) {
		var a, b = document.createElement("div");
		b.style.paddingTop = "10px";
		b.style.paddingLeft = "23px";
		b.style.paddingBottom = "5px";
		b.setAttribute("id", "idTempformDiv");
		a = '<form method="post" id="tempform" action="{0}" enctype="multipart/form-data" style="margin:0"> <input type="hidden" name="myBackgroundCnsId" value="{1}" /><input type="hidden" name="tempImageCnsId" value="{2}" /><input type="hidden" name="spaceCnsId" value="{3}" /><input type="hidden" name="docDomain" value="{5}" /><input type="hidden" name="{6}" value="{7}" /><label for="idFileBox" id="idFileBoxLabel" style="display:none">'
				+ GetString("live.sndefaultstrings.strings.customtheme.usecustom")
				+ "</label>";
		if ($Browser.isIE())
			a += '<input type="file" style="height:2em;width:155px;" id="idFileBox" name="postedBinary" /><input type="submit" style="height:2em;margin-left:5px" id="idUploadImage" value="{4}" /></form>';
		else {
			a += '<input type="file" style="height:20px;" id="idFileBox" name="postedBinary" />';
			if (A)
				a += "<br />";
			a += '<input type="submit" style="height:20px;margin-left:5px" id="idUploadImage" value="{4}" /></form>'
		}
		a = a.format(g, d, e, h,
				GetString("live.sndefaultstrings.strings.customtheme.upload")
						.encodeHtml(), document.domain, C_CANARY_COOKIE_NAME,
				GetCookieValue(C_CANARY_COOKIE_NAME));
		b.innerHTML = a;
		f.appendChild(b);
		if (document
				.getElementById("CustomThemeTab_BackgroundImageCategory_UseCustomImage").checked != 1)
			document.getElementById("idUploadImage").disabled = true;
		c.Events.register(document.getElementById("tempform"), {
					onsubmit : yb
				});
		c.Events.register(document.getElementById("idFileBox"), {
					onclick : wb
				})
	}
	function wb() {
		var b = document
				.getElementById("CustomThemeTab_BackgroundImageCategory_UseCustomImage");
		if (b.checked == false) {
			b.checked = true;
			a("idUploadImage").disabled = false;
			a("CustomThemeTab_BackgroundImageCategory_HideFrameImage").checked = true;
			p(false, true)
		}
	}
	function yb() {
		if (document
				.getElementById("CustomThemeTab_BackgroundImageCategory_UseCustomImage").checked != 1) {
			event.returnValue = false;
			return false
		}
		var a = zb();
		if (a == true)
			xb(
					document.getElementById("tempform"),
					rb,
					document.getElementById("idUploadControlDiv"),
					GetString("live.sndefaultstrings.strings.customtheme.uploading"));
		event.returnValue = false
	}
	function zb() {
		if (document.getElementById("idFileBox").value.trim() == "") {
			g
					.show(
							"Med",
							false,
							GetString("live.sndefaultstrings.strings.customtheme.specifyfile"),
							null, null);
			document.getElementById("idFileBoxLabel").innerText = GetString("live.sndefaultstrings.strings.customtheme.specifyfile");
			return false
		}
		return true
	}
	function rb(a) {
		var c = true;
		if (a != null)
			if (a["myBackgroundCnsId"] == null || a["customImageCnsId"] == null
					|| a["customImagePreAuthUrl"] == null) {
				g
						.show(
								"Med",
								false,
								GetString("live.sndefaultstrings.strings.customtheme.uploadfailed"),
								null, null);
				document.getElementById("idFileBoxLabel").innerText = GetString("live.sndefaultstrings.strings.customtheme.uploadfailed")
			} else {
				b.bkgFolderCnsId = a["myBackgroundCnsId"];
				b.NewCustomImageId = a["customImageCnsId"];
				b.NewPreAuthUrl = a["customImagePreAuthUrl"];
				p(c)
			}
		else {
			g
					.show(
							"Med",
							false,
							GetString("live.sndefaultstrings.strings.customtheme.uploadfailed"),
							null, null);
			document.getElementById("idFileBoxLabel").innerText = GetString("live.sndefaultstrings.strings.customtheme.uploadfailed")
		}
	}
	function y() {
		if (g) {
			var a = document.getElementById("idFileBoxLabel");
			if (a)
				a.innerText = GetString("live.sndefaultstrings.strings.customtheme.usecustom");
			g.hide()
		}
	}
	function eb(c) {
		var f = "38%", e = "62%", d = "75%", a = C(
				"CustomThemeTab_ModulesCategory",
				c,
				GetString("live.sndefaultstrings.strings.customtheme.moduleheader"));
		j(
				a,
				"CustomThemeTab_ModulesCategory_Background",
				GetString("live.sndefaultstrings.strings.customtheme.modulebackground"),
				b.container_background_color);
		j(
				a,
				"CustomThemeTab_ModulesCategory_HeaderBackground",
				GetString("live.sndefaultstrings.strings.customtheme.moduleheaderbackground"),
				b.container_header_background_color);
		j(
				a,
				"CustomThemeTab_ModulesCategory_HeaderLink",
				GetString("live.sndefaultstrings.strings.customtheme.moduleheadertextlink"),
				b.container_header_link_color);
		j(
				a,
				"CustomThemeTab_ModulesCategory_BorderColor",
				GetString("live.sndefaultstrings.strings.customtheme.moduleborder"),
				b.container_border_color);
		q(
				a,
				"CustomThemeTab_ModulesCategory_BorderStyle",
				GetString("live.sndefaultstrings.strings.customtheme._borderstyle"),
				["Default", "None", "Dotted", "Dashed", "Solid"],
				[
						GetString("live.sndefaultstrings.strings.customtheme.borderstyle._default"),
						GetString("live.sndefaultstrings.strings.customtheme.borderstyle.none"),
						GetString("live.sndefaultstrings.strings.customtheme.borderstyle.dotted"),
						GetString("live.sndefaultstrings.strings.customtheme.borderstyle.dashed"),
						GetString("live.sndefaultstrings.strings.customtheme.borderstyle.solid")],
				b.container_border_style, f, e, d);
		R(a, "CustomThemeTab_ModulesCategory", b.header_font_type,
				b.header_font_size, null, b.header_font_italic)
	}
	function j(k, a, m, i) {
		var h = '<label>{0}</label><div class="colorrow"><div>{1}<label style="display:none" for="{2}">{3}</label><input class="colorinput LTRbox" type="text" id="{2}" value="{4}" MAXLENGTH="7" style="width:6em"></input><a href="#" class="ColorPickerAnchor" id = "{2}_picker" title="{7}" ><img src="{6}" style="display:block;" alt="{7}" /></a></div></div><span id="{2}_error" class="errorhex">{5}</span>', e = "", j = '<a id="{0}_default" class="{1}" href="#" title="{2}" alt="{2}" eventTarget="{0}" eventValue="" style="margin-left:5px"></a>';
		e += j.format(a, i == w ? "defswatchon" : "defswatch", "");
		var l = '<a id="{0}" class="{1}" style="background-color:#{2};" href="#" title="{3}" alt="{3}" eventTarget="{4}" eventValue="#{2}" ></a>';
		for (var b = 0; b < r.length; b++)
			e += l.format(a + "_" + r[b].color, i == Y(r[b].color)
							? "swatchon"
							: "swatch", r[b].color, r[b].title.encodeHtml(), a);
		var d = H(i);
		if (d.length > 0)
			d = "#" + d;
		h = h
				.format(
						m.encodeHtml(),
						e,
						a,
						GetString("live.sndefaultstrings.strings.spacesettings.colorlabel")
								.encodeHtml(),
						d,
						GetString("live.sndefaultstrings.strings.customtheme.errorbadhex")
								.encodeHtml(),
						Z.cp_icon,
						GetString("live.sndefaultstrings.strings.customtheme.colorpicker")
								.encodeHtml());
		k.insertAdjacentHTML("beforeEnd", h);
		var g = document.getElementById(a + "_default");
		s.aDefaultColorSwatches.push(g);
		P(g);
		c.Events.register(g, {
					onclick : Q
				});
		var f = document.getElementById(a + "_picker");
		c.Events.register(f, {
					onclick : nb
				});
		f.style.cursor = f.firstChild.style.cursor = "pointer";
		c.Events.register(document.getElementById(a), {
					onchange : O
				})
	}
	function qb() {
		var e = document.getElementById("divCustomizationTab"), d = e
				.getElementsByTagName("a"), f = d.length, a;
		for (var b = 0; b < f; b++) {
			a = d[b];
			if (a.className == "swatch" || a.className == "swatchon")
				c.Events.register(a, {
							onclick : Q
						})
		}
	}
	function S(g) {
		var a;
		if ($Browser.isIE())
			a = g.currentStyle.backgroundColor.toUpperCase();
		else if ("undefined" != typeof window.getComputedStyle) {
			var h = getComputedStyle(g, null);
			a = h.getPropertyValue("background-color");
			if (a.toLowerCase() != "transparent") {
				var e, d, c, b;
				a = a.substring(4, a.length - 1);
				e = a.split(", ");
				d = parseInt(e[0], 10);
				c = parseInt(e[1], 10);
				b = parseInt(e[2], 10);
				function f(a) {
					var c = "0123456789ABCDEF", b = c.substr(a & 15, 1);
					while (a > 15) {
						a >>= 4;
						b = c.substr(a & 15, 1) + b
					}
					return b
				}
				d = f(d);
				c = f(c);
				b = f(b);
				d = d.length < 2 ? "0" + d : d;
				c = c.length < 2 ? "0" + c : c;
				b = b.length < 2 ? "0" + b : b;
				a = "#" + d + c + b
			}
		}
		return a
	}
	function q(k, h, m, f, j, n, e, d, b) {
		if (!e)
			e = "40%";
		if (!d)
			d = "60%";
		if (!b)
			b = "60%";
		var g = '<div class="dropdownrow"><div style="width:' + e + ";float:"
				+ (A ? "right" : "left")
				+ '"><label for="{0}">{1}</label></div>' + '<div style="width:'
				+ d + ";float:" + (A ? "right" : "left")
				+ '"><select style="width:' + b
				+ '" id="{0}">{2}</select></div>' + "</div>", i = "";
		for (var a = 0; a < f.length; a++) {
			var l = '<option value="{0}" {1}>{2}</option>';
			i += l.format(f[a].encodeHtml(), f[a] == n ? "SELECTED" : "", j[a]
							.encodeHtml())
		}
		g = g.format(h, m.encodeHtml(), i);
		k.insertAdjacentHTML("beforeEnd", g);
		c.Events.register(document.getElementById(h), {
					onchange : T
				});
		if (!$Browser.isIE())
			c.Events.register(document.getElementById(h), {
						onkeypress : vb
					})
	}
	function vb() {
		window.setTimeout(T, 1)
	}
	function ub(j, b, f, e, i, h) {
		var d;
		if (b == "CustomThemeTab_ModulesCategory_fontStyle")
			d = "live.sndefaultstrings.strings.spacesettings.titlestyle";
		else
			d = "live.sndefaultstrings.strings.spacesettings.style";
		if (!f)
			f = "40%";
		if (!e)
			e = "60%";
		var g = '<div class="fontstylerow" style="margin-left:4px;"><div style="width:'
				+ f
				+ ";float:"
				+ (A ? "right" : "left")
				+ '"><label>{0}</label></div>'
				+ '<div style="width:'
				+ e
				+ ";float:"
				+ (A ? "right" : "left")
				+ ';margin-top:-2px;" >{1}</div>' + "</div>", a = "";
		if (i != null) {
			a += '<input id="{0}_bold" type="checkbox" value="bold" /><label for="{0}_bold" style="padding-right:5px">{1}</label>';
			a = a
					.format(
							b,
							GetString("live.sndefaultstrings.strings.spacesettings.bold"))
		}
		if (h != null) {
			a += '<input id="{0}_italic" type="checkbox" value="italic"  /><label for="{0}_italic" style="padding-right:5px">{1}</label>';
			a = a
					.format(
							b,
							GetString("live.sndefaultstrings.strings.spacesettings.italic"))
		}
		g = g.format(GetString(d), a);
		j.insertAdjacentHTML("beforeEnd", g);
		if (i != null)
			c.Events.register(document.getElementById(b + "_bold"), {
						onclick : I
					});
		if (h != null)
			c.Events.register(document.getElementById(b + "_italic"), {
						onclick : I
					})
	}
	function db(e) {
		var d = '<div class="radiobuttonrows"><input type="radio" name="defaultBackgroundButton" id="{0}" value="{1}"></input><label for="{0}">{2}</label><br /><input type="radio" name="defaultBackgroundButton" id="{3}" value="{4}"></input><label for="{3}">{5}</label><br /><input type="radio" name="defaultBackgroundButton" id="{6}" value="{7}"></input><label for="{6}">{8}</label></div>';
		d = d
				.format(
						"CustomThemeTab_BackgroundImageCategory_ShowBackgroundImage",
						"Show",
						GetString("live.sndefaultstrings.strings.customtheme.usedefault"),
						"CustomThemeTab_BackgroundImageCategory_HideBackgroundImage",
						"Hide",
						GetString("live.sndefaultstrings.strings.customtheme.hideimage"),
						"CustomThemeTab_BackgroundImageCategory_UseCustomImage",
						"Custom",
						GetString("live.sndefaultstrings.strings.customtheme.usecustom"));
		e.insertAdjacentHTML("beforeEnd", d);
		var a = document
				.getElementById("CustomThemeTab_BackgroundImageCategory_HideBackgroundImage");
		c.Events.register(a, {
					onclick : D
				});
		if (!$Browser.isIE())
			c.Events.register(a, {
						onkeypress : G
					});
		a = document
				.getElementById("CustomThemeTab_BackgroundImageCategory_ShowBackgroundImage");
		c.Events.register(a, {
					onclick : D
				});
		if (!$Browser.isIE())
			c.Events.register(a, {
						onkeypress : G
					});
		a = document
				.getElementById("CustomThemeTab_BackgroundImageCategory_UseCustomImage");
		c.Events.register(a, {
					onclick : D
				});
		if (!$Browser.isIE())
			c.Events.register(a, {
						onkeypress : G
					});
		if (b.show_default_background_image == 1)
			document
					.getElementById("CustomThemeTab_BackgroundImageCategory_ShowBackgroundImage").checked = 1;
		else if (b.hide_background_image == 1)
			document
					.getElementById("CustomThemeTab_BackgroundImageCategory_HideBackgroundImage").checked = 1;
		else if (b.show_custom_background_image == 1)
			document
					.getElementById("CustomThemeTab_BackgroundImageCategory_UseCustomImage").checked = 1
	}
	function C(d, e, f) {
		var b = '<li class="Category"><h4><a id="{0}_anchor" href="#" title="{1}"><img src="{2}" alt="{1}"><span>{3}</span></a></h4><div id="{0}_categorydiv" style="display:block;" class="Contents"></div><hr />';
		b = b.format(d,
				GetString("live.sndefaultstrings.strings.customize.collapse"),
				$Config.Themes.url
						+ "hig/img/glyph/expand_~Right~_rest_dark.gif", f
						.encodeHtml());
		e.insertAdjacentHTML("beforeEnd", b);
		var a = document.getElementById(d + "_anchor");
		c.Events.register(a, {
					onclick : sb
				});
		c.Events.register(a, {
					onmouseover : jb
				});
		c.Events.register(a, {
					onmouseout : lb
				});
		return document.getElementById(d + "_categorydiv")
	}
	this.ApplyCustomTheme = function() {
		x = true;
		o = o | U
	};
	function Cb() {
		if (!m.IsSponsoredTheme()) {
			for (var b = 0; b < e.length; b++)
				a(e[b].tbid).value = "";
			a("CustomThemeTab_ModulesCategory_BorderStyle").value = "Default";
			a("CustomThemeTab_BackgroundImageCategory_Repeat").value = "default";
			a("CustomThemeTab_BackgroundImageCategory_Alignment").value = "default";
			a("CustomThemeTab_BackgroundImageCategory_Placement").value = "default";
			a("CustomThemeTab_BackgroundImageCategory_Transparency").value = "default";
			a("CustomThemeTab_BackgroundImageCategory_ShowBackgroundImage").checked = true;
			a("CustomThemeTab_BackgroundImageCategory_HideBackgroundImage").checked = false;
			a("CustomThemeTab_BackgroundImageCategory_UseCustomImage").checked = false;
			a("CustomThemeTab_BackgroundImageCategory_HideFrameImage").checked = false;
			a("CustomThemeTab_TextCategory_fontType").value = "default";
			a("CustomThemeTab_TextCategory_fontSize").value = "default";
			a("CustomThemeTab_ModulesCategory_fontType").value = "default";
			a("CustomThemeTab_ModulesCategory_fontSize").value = "default";
			a("CustomThemeTab_TextCategory_fontStyle_bold").checked = false;
			a("CustomThemeTab_TextCategory_fontStyle_italic").checked = false;
			a("CustomThemeTab_ModulesCategory_fontStyle_italic").checked = false;
			a("idUploadImage").disabled = true;
			p(false, true)
		}
		event.returnValue = false
	}
	function Q(a) {
		event.returnValue = false;
		if (!m.IsSponsoredTheme()) {
			if (a.srcElement.tagName.toLowerCase() == "a")
				anchor = a.srcElement;
			else
				anchor = a.srcElement.parentNode;
			var b = document.getElementById(anchor.getAttribute("eventTarget"));
			b.value = anchor.getAttribute("eventValue");
			p()
		}
	}
	function nb() {
		event.cancelBubble = true;
		event.returnValue = false;
		if (!m.IsSponsoredTheme()) {
			var a;
			if (event.srcElement.tagName.toLowerCase() == "a")
				a = event.srcElement;
			else
				a = event.srcElement.parentNode;
			if (d.IsVisible() == true)
				d.hide();
			else {
				var b = a.id.replace("_picker", ""), e = Ab(b), c = {};
				c.colorSwatchParentInfo = b;
				d.show(a, ob, e, c)
			}
		}
		return false
	}
	function ob(a, b) {
		if (a != null) {
			var c = document.getElementById(b.colorSwatchParentInfo);
			c.value = a;
			O()
		}
	}
	function Ab(c) {
		var a;
		switch (c) {
			case "CustomThemeTab_TextCategory_Text" :
				a = b.text_color;
				break;
			case "CustomThemeTab_TextCategory_Link" :
				a = b.link_color;
				break;
			case "CustomThemeTab_BackgroundCategory_Page" :
				a = b.page_background_color;
				break;
			case "CustomThemeTab_BackgroundCategory_Body" :
				a = b.body_background_color;
				break;
			case "CustomThemeTab_BackgroundCategory_Selection" :
				a = b.selection_background_color;
				break;
			case "CustomThemeTab_BackgroundCategory_Hover" :
				a = b.hover_background_color;
				break;
			case "CustomThemeTab_ModulesCategory_Background" :
				a = b.container_background_color;
				break;
			case "CustomThemeTab_ModulesCategory_HeaderBackground" :
				a = b.container_header_background_color;
				break;
			case "CustomThemeTab_ModulesCategory_HeaderLink" :
				a = b.container_header_link_color;
				break;
			case "CustomThemeTab_ModulesCategory_BorderColor" :
				a = b.container_border_color;
				break;
			default :
				a = null
		}
		if (a == w)
			a = S(document.getElementById(c + "_default"));
		else
			a = "#" + H(a);
		return a
	}
	function hb() {
		var b = s.aDefaultColorSwatches;
		for (var a = 0; a < b.length; a++) {
			var c = b[a];
			P(c)
		}
	}
	function P(a) {
		a.title = GetString("live.sndefaultstrings.strings.customtheme.pickerdefault")
				.format(Spaces.Utility.GetLtrString(S(a)));
		a.alt = a.title
	}
	function O() {
		p()
	}
	function T() {
		p()
	}
	function I() {
		p()
	}
	function D() {
		function c() {
			if (a("CustomThemeTab_BackgroundImageCategory_UseCustomImage").checked) {
				a("idUploadImage").disabled = false;
				a("CustomThemeTab_BackgroundImageCategory_HideFrameImage").checked = true;
				b.show_frame_image = 0
			} else {
				a("idUploadImage").disabled = true;
				if (a("CustomThemeTab_BackgroundImageCategory_HideBackgroundImage").checked) {
					a("CustomThemeTab_BackgroundImageCategory_HideFrameImage").checked = true;
					b.show_frame_image = 0
				} else {
					a("CustomThemeTab_BackgroundImageCategory_HideFrameImage").checked = false;
					b.show_frame_image = 1
				}
			}
			p()
		}
		window.setTimeout(c, 1)
	}
	function G() {
		D()
	}
	function Y(a) {
		a = a.trim().toUpperCase();
		if (a.startsWith("#"))
			a = a.substr(1);
		if (a.length == 0)
			return w;
		var b = 0;
		for (var c = 0; c < a.length; c++) {
			var d = Db.indexOf(a.charAt(c));
			if (d == -1)
				return F;
			b *= 16;
			b += d;
			if (b > L)
				return F
		}
		return b < 0 || b > L ? F : b
	}
	function H(b) {
		if (b == w || b < 0 || b > L)
			return "";
		var a = b.toString(16);
		while (a.length < 6)
			a = "0" + a;
		return a.toUpperCase()
	}
	function p(i, f) {
		var d = false;
		if (i == null || i != null && i == false)
			do {
				for (var g = 0; g < e.length; g++) {
					var k = Y(a(e[g].tbid).value);
					if (k != F) {
						a(e[g].tbid + "_error").style.display = "none";
						if (b[e[g].arg] != k)
							d = true;
						b[e[g].arg] = k;
						if (d) {
							var l;
							if (k == w)
								l = a(e[g].tbid + "_default");
							else
								l = a(e[g].tbid + "_" + H(k));
							var j = a(e[g].tbid + "_default");
							j.className = l == j ? "defswatchon" : "defswatch";
							for (var p = 0; p < r.length; p++) {
								j = a(e[g].tbid + "_" + r[p].color);
								j.className = l == j ? "swatchon" : "swatch"
							}
						}
					} else
						a(e[g].tbid + "_error").style.display = "block"
				}
				if (d)
					if (!f)
						break;
				var h = a("CustomThemeTab_BackgroundImageCategory_ShowBackgroundImage").checked
						? 1
						: 0;
				if (b.show_default_background_image != h) {
					d = true;
					y();
					b.show_default_background_image = h
				}
				h = a("CustomThemeTab_BackgroundImageCategory_HideBackgroundImage").checked
						? 1
						: 0;
				if (b.hide_background_image != h) {
					d = true;
					y();
					b.hide_background_image = h
				}
				h = a("CustomThemeTab_BackgroundImageCategory_UseCustomImage").checked
						? 1
						: 0;
				if (b.show_custom_background_image != h) {
					d = true;
					b.show_custom_background_image = h
				}
				var q = a("CustomThemeTab_BackgroundImageCategory_HideFrameImage").checked
						? 0
						: 1;
				if (b.show_frame_image != q) {
					d = true;
					b.show_frame_image = q
				}
				if (d && !f)
					break;
				var c = a("CustomThemeTab_ModulesCategory_BorderStyle").value;
				if (b.container_border_style != c) {
					d = true;
					b.container_border_style = c;
					if (!f)
						break
				}
				c = a("CustomThemeTab_BackgroundImageCategory_Repeat").value;
				if (b.background_repeat != c) {
					d = true;
					b.background_repeat = c;
					if (!f)
						break
				}
				c = a("CustomThemeTab_BackgroundImageCategory_Alignment").value;
				if (b.background_alignment != c) {
					d = true;
					b.background_alignment = c;
					if (!f)
						break
				}
				c = a("CustomThemeTab_BackgroundImageCategory_Placement").value;
				if (b.background_placement != c) {
					d = true;
					b.background_placement = c;
					if (!f)
						break
				}
				c = a("CustomThemeTab_BackgroundImageCategory_Transparency").value;
				if (b.background_transparency != c) {
					d = true;
					b.background_transparency = c;
					if (!f)
						break
				}
				c = a("CustomThemeTab_TextCategory_fontType").value;
				if (b.text_font_type != c) {
					d = true;
					b.text_font_type = c;
					if (!f)
						break
				}
				c = a("CustomThemeTab_TextCategory_fontSize").value;
				if (b.text_font_size != c) {
					d = true;
					b.text_font_size = c;
					if (!f)
						break
				}
				c = a("CustomThemeTab_TextCategory_fontStyle_bold").checked;
				if (b.text_font_bold != c) {
					d = true;
					b.text_font_bold = c;
					if (!f)
						break
				}
				c = a("CustomThemeTab_TextCategory_fontStyle_italic").checked;
				if (b.text_font_italic != c) {
					d = true;
					b.text_font_italic = c;
					if (!f)
						break
				}
				c = a("CustomThemeTab_ModulesCategory_fontType").value;
				if (b.header_font_type != c) {
					d = true;
					b.header_font_type = c;
					if (!f)
						break
				}
				c = a("CustomThemeTab_ModulesCategory_fontSize").value;
				if (b.header_font_size != c) {
					d = true;
					b.header_font_size = c;
					if (!f)
						break
				}
				c = a("CustomThemeTab_ModulesCategory_fontStyle_italic").checked;
				if (b.header_font_italic != c) {
					d = true;
					b.header_font_italic = c;
					if (!f)
						break
				}
			} while (false);
		if (d || i != null && i == true) {
			n.dirtyPage();
			var o = n.GenerateCSS();
			if ($Browser.isMozilla()) {
				var m = document.getElementById("CustomTheme");
				m.innerHTML = o
			} else if ($Browser.isSafari()) {
				var m = document.getElementById("CustomTheme");
				m.innerText = o
			} else {
				var m = document.styleSheets("CustomTheme");
				if (m)
					m.cssText = o
			}
		}
	}
	function sb(b) {
		var a;
		if (b.srcElement.tagName.toLowerCase() == "a")
			a = b.srcElement;
		else
			a = b.srcElement.parentNode;
		E(a.parentNode.parentNode);
		event.returnValue = false
	}
	function E(c) {
		var e = c.childNodes[0].childNodes[0], d = c.childNodes[1], a = d.style.display == "block";
		d.style.display = a ? "none" : "block";
		e
				.setAttribute(
						"title",
						a
								? GetString("live.sndefaultstrings.strings.customize.expand")
								: GetString("live.sndefaultstrings.strings.customize.collapse"));
		var b = e.childNodes[0], f = a ? "expand_" : "collapse_", g = a
				? "collapse_"
				: "expand_";
		b
				.setAttribute(
						"alt",
						a
								? GetString("live.sndefaultstrings.strings.customize.expand")
								: GetString("live.sndefaultstrings.strings.customize.collapse"));
		b.setAttribute("src", b.getAttribute("src").replace(f, g))
	}
	function jb(b) {
		var a;
		if (b.srcElement.tagName.toLowerCase() == "a")
			a = b.srcElement;
		else
			a = b.srcElement.parentNode;
		var c = a.childNodes[0];
		c.setAttribute("src", c.getAttribute("src")
						.replace("_rest_", "_hover_"));
		event.returnValue = false
	}
	function lb(b) {
		var a;
		if (b.srcElement.tagName.toLowerCase() == "a")
			a = b.srcElement;
		else
			a = b.srcElement.parentNode;
		var c = a.childNodes[0];
		c.setAttribute("src", c.getAttribute("src")
						.replace("_hover_", "_rest_"));
		event.returnValue = false
	}
	function kb(b, a) {
		if (a)
			n = b;
		else
			n = null
	}
	function fb(b, a) {
		h = b;
		if (f == null) {
			f = new Web.UI.Utilities.CleanupHelper;
			c = f.create(null)
		}
		if (a) {
			h.attachEvent("oncancel", u);
			h.attachEvent("onok", u)
		} else {
			h.detachEvent("oncancel", u);
			h.detachEvent("onok", u);
			h = null
		}
	}
	function u() {
		if (t) {
			t.onreadystatechange = null;
			t.onload = null
		}
		if (d && d.IsVisible())
			d.hide()
	}
	function tb(d) {
		var b = null;
		if (d && d.getElementsByTagName) {
			var a;
			try {
				a = d.contentWindow.document.getElementsByTagName("form")
			} catch (f) {
				a = null
			}
			if (!a || a.length == 0)
				return null;
			var c = a[0], e = c.elements.length;
			b = {};
			for (i = 0; i < e; i++)
				b[c.elements[i].name] = c.elements[i].value
		}
		return b
	}
	function xb(f, n, k, m) {
		var h = null, e = document.createElement("div"), a, b = false;
		$Config.domain = g_spacesLiveComRootDomain;
		$Network.registerBaseDomain();
		var l = f.target;
		y();
		function j() {
			if ($Browser.isIE()) {
				if (a.readyState == "complete") {
					b = true;
					d()
				}
			} else {
				b = true;
				d()
			}
		}
		function d(g) {
			a.onreadystatechange = null;
			a.onload = null;
			var c = document.getElementById("idCancelImageUpload");
			if (c != null)
				c.detachEvent("onclick", d);
			y();
			if (b == true)
				h = tb(a);
			else
				h = null;
			k.removeChild(e);
			f.target = l;
			if (g) {
				event.returnValue = false;
				try {
					document.getElementById("idFileBox").focus()
				} catch (i) {
				}
			}
			if (b == true)
				n(h);
			return false
		}
		function i() {
			var c = false;
			if ($Browser.isIE()) {
				if (a.readyState == "complete")
					c = true
			} else
				c = true;
			if (c == true) {
				a.onreadystatechange = null;
				a.onload = null;
				try {
					if ($Browser.isIE())
						a.onreadystatechange = j;
					else
						a.onload = j;
					f.submit()
				} catch (e) {
					b = true;
					d()
				}
			}
		}
		e.innerHTML = '<iframe name="imageUploadFrame"></iframe>';
		f.target = "imageUploadFrame";
		a = e.firstChild;
		t = a;
		a.src = SpacesUrlBuilder.GetDomainSetterProxyUrl();
		a.style.display = "none";
		g
				.show(
						"Low",
						false,
						m
								+ "<a style='padding-left:10px' id='idCancelImageUpload' href='#'>"
								+ GetString("live.sndefaultstrings.strings.customtheme.cancel")
								+ "</a>", null, null);
		c.Events.register(document.getElementById("idCancelImageUpload"), {
					onclick : d
				});
		if ($Browser.isIE())
			a.onreadystatechange = i;
		else
			a.onload = i;
		k.appendChild(e)
	}
};
Spaces.Customize.CustomThemeTab.registerClass(
		"Spaces.Customize.CustomThemeTab", "$Binding");
Spaces.Customize.CustomThemeTab.skipClass = true;
registerNamespace("Spaces.Customize");
Spaces.Customize.ColorPicker = function(o) {
	var e = this, h = Spaces.Customize.ColorPicker, c = Web.UI.Popup, r, n = new $Memory.Groups, a = n
			.create(null), b = null, m = false, u = false, i = null, q = null, t = null, j = null, k = null, d = null, g = null, l = null, p = null, f = null;
	function A() {
		if (o == null || o.max_row_size == null
				|| o.max_row_size > h.ColorTable.length)
			r = 18;
		else
			r = o.max_row_size
	}
	this.dispose = function() {
		if (n != null) {
			n.dispose();
			n = null;
			a = null
		}
		if (b)
			b.dispose();
		if (d != null)
			d.dispose();
		h = null;
		c = null;
		i = null;
		q = null;
		b = null;
		k = null;
		d = null;
		g = null;
		l = null;
		p = null;
		j = null;
		f = null;
		e = null
	};
	this.IsVisible = function() {
		return m
	};
	this.show = function(o, C, E, D, A) {
		if (e.IsVisible())
			return;
		if (o == null)
			return;
		l = D;
		g = C;
		p = E;
		f = o;
		if (u == false) {
			b = new c;
			i = a.Nodes.create("DIV", {
						className : "colorpicker_popup_contents"
					}, null, null, null);
			q = a.Nodes.create("DIV", {
						className : "colorpicker_colortable"
					}, null, i, null);
			var B, n;
			for (var d = 0; d < h.ColorTable.length; d++) {
				if (d % r == 0)
					B = a.Nodes.create("DIV", {
								className : "colorpicker_row"
							}, null, q, null);
				n = a.Nodes.create("A", {
							className : "colorpicker_swatch",
							id : "id_color_swatch_" + d,
							href : "#",
							_hexValue : h.ColorTable[d]
						}, {
							backgroundColor : h.ColorTable[d]
						}, B, null);
				n.innerHTML = "&nbsp;";
				a.Events.register(n, {
							onclick : x
						});
				a.Events.register(n, {
							onkeypress : v
						});
				if (d == 0)
					k = n
			}
			if ($Browser.isIE()) {
				t = a.Nodes.create("div", {
							className : "colorpicker_morecolors"
						}, null, i);
				j = a.Nodes.create("a", {
					className : "colorpicker_morecolors_link",
					innerHTML : GetString("live.sndefaultstrings.strings.spacesettings.morecolors"),
					href : "#"
				}, null, t);
				a.Events.register(j, {
							onclick : y
						});
				a.Events.register(j, {
							onkeypress : w
						});
				a.Events.register(j, {
							onblur : s
						})
			}
			if ($Browser.isIE())
				if (Spaces.IsRTL()) {
					b.setDock(c.VDock.Bottom, c.HDock.Right);
					b.setAnchor(c.VAnchor.Top, c.HAnchor.Left)
				} else {
					b.setDock(c.VDock.Bottom, c.HDock.Left);
					b.setAnchor(c.VAnchor.Top, c.HAnchor.Right)
				}
			b.setContents(i);
			if (A != null)
				b.getContents().style.zIndex = A;
			else
				b.getContents().style.zIndex = 10000010;
			m = true;
			u = true
		} else if (!e.IsVisible())
			m = true;
		b.display(f, false);
		window.setTimeout(z, 1)
	};
	this.hide = function() {
		b.hide();
		m = false
	};
	function x() {
		event.cancelBubble = true;
		event.returnValue = false;
		var a = event.srcElement;
		if (!a._hexValue)
			return false;
		var b = a._hexValue;
		e.hide();
		if (g) {
			f.focus();
			g(b, l)
		}
		return false
	}
	function s() {
		event.returnValue = false;
		event.cancelBubble = true;
		if (e.IsVisible()) {
			var a = document.getElementById("id_color_swatch_0");
			if (a && a.focus) {
				function b() {
					try {
						a.focus()
					} catch (b) {
					}
				}
				window.setTimeout(b, 1)
			}
		}
		return false
	}
	function z() {
		if (k)
			try {
				k.focus()
			} catch (b) {
			}
		if (!$Browser.isIE())
			a.Events.register(document.getElementById("id_color_swatch_"
							+ (h.ColorTable.length - 1)), {
						onblur : s
					})
	}
	function y() {
		event.cancelBubble = true;
		event.returnValue = false;
		if (d == null)
			d = new Spaces.Customize.WindowsColorPicker;
		e.hide();
		d.setColor(p);
		if (d.getColorFromUser()) {
			var a = d.getColor();
			if (g)
				g(a, l)
		}
		f.focus();
		return false
	}
	function w() {
		if (event.keyCode == 27) {
			e.hide();
			event.cancelBubble = true;
			event.returnValue = true;
			f.focus();
			return false
		}
	}
	function v() {
		if (event.keyCode == 27) {
			e.hide();
			event.returnValue = true;
			event.cancelBubble = true;
			f.focus();
			return false
		}
	}
	A()
};
Spaces.Customize.ColorPicker.ColorTable = ["#330000", "#333300", "#336600",
		"#339900", "#33CC00", "#33FF00", "#66FF00", "#66CC00", "#669900",
		"#666600", "#663300", "#660000", "#FF0000", "#FF3300", "#ff6600",
		"#FF9900", "#FFCC00", "#FFFF00", "#330033", "#333333", "#336633",
		"#339933", "#33CC33", "#33FF33", "#66FF33", "#66CC33", "#669933",
		"#666633", "#663333", "#660033", "#FF0033", "#FF3333", "#FF6633",
		"#FF9933", "#FFCC33", "#FFFF33", "#330066", "#333366", "#336666",
		"#339966", "#33CC66", "#33FF66", "#66FF66", "#66CC66", "#669966",
		"#666666", "#663366", "#660066", "#FF0066", "#FF3366", "#FF6666",
		"#FF9966", "#FFCC66", "#FFFF66", "#330099", "#333399", "#336699",
		"#339999", "#33CC99", "#33FF99", "#66FF99", "#66CC99", "#669999",
		"#666699", "#663399", "#660099", "#FF0099", "#FF3399", "#FF6699",
		"#FF9999", "#FFCC99", "#FFFF99", "#3300CC", "#3333CC", "#3366CC",
		"#3399CC", "#33CCCC", "#33FFCC", "#66FFCC", "#66CCCC", "#6699CC",
		"#6666CC", "#6633CC", "#6600CC", "#FF00CC", "#FF33CC", "#FF66CC",
		"#FF99CC", "#FFCCCC", "#FFFFCC", "#3300FF", "#3333FF", "#3366FF",
		"#3399FF", "#33CCFF", "#33FFFF", "#66FFFF", "#66CCFF", "#6699FF",
		"#6666FF", "#6633FF", "#6600FF", "#FF00FF", "#FF33FF", "#FF66FF",
		"#FF99FF", "#FFCCFF", "#FFFFFF", "#0000FF", "#0033FF", "#0066FF",
		"#0099FF", "#00CCFF", "#00FFFF", "#99FFFF", "#99CCFF", "#9999FF",
		"#9966FF", "#9933FF", "#9900FF", "#CC00FF", "#CC33FF", "#CC66FF",
		"#CC99FF", "#CCCCFF", "#CCFFFF", "#0000CC", "#0033CC", "#0066CC",
		"#0099CC", "#00CCCC", "#00FFCC", "#99FFCC", "#99CCCC", "#9999CC",
		"#9966CC", "#9933CC", "#9900CC", "#CC00CC", "#CC33CC", "#CC66CC",
		"#CC99CC", "#CCCCCC", "#CCFFCC", "#000099", "#003399", "#006699",
		"#009999", "#00CC99", "#00FF99", "#99FF99", "#99CC99", "#999999",
		"#996699", "#993399", "#990099", "#CC0099", "#CC3399", "#CC6699",
		"#CC9999", "#CCCC99", "#CCFF99", "#000066", "#003366", "#006666",
		"#009966", "#00CC66", "#00FF66", "#99FF66", "#99CC66", "#999966",
		"#996666", "#993366", "#990066", "#CC0066", "#CC3366", "#CC6666",
		"#CC9966", "#CCCC66", "#CCFF66", "#000033", "#003333", "#006633",
		"#009933", "#00CC33", "#00FF33", "#99FF33", "#99CC33", "#999933",
		"#996633", "#993333", "#990033", "#CC0033", "#CC3333", "#CC6633",
		"#CC9933", "#CCCC33", "#CCFF33", "#000000", "#003300", "#006600",
		"#009900", "#00CC00", "#00FF00", "#99FF00", "#99CC00", "#999900",
		"#996600", "#993300", "#990000", "#CC0000", "#CC3300", "#CC6600",
		"#CC9900", "#CCCC00", "#CCFF00", "#000000", "#111111", "#222222",
		"#333333", "#444444", "#444444", "#444444", "#555555", "#666666",
		"#777777", "#888888", "#999999", "#AAAAAA", "#BBBBBB", "#CCCCCC",
		"#DDDDDD", "#EEEEEE", "#FFFFFF"];
Spaces.Customize.WindowsColorPicker = function() {
	var a = null, b = null;
	this.getColor = function() {
		return b.toUpperCase()
	};
	this.setColor = function(a) {
		b = a
	};
	this.getColorFromUser = function() {
		if (a == null) {
			var d = null;
			try {
				d = document.createElement("DIV");
				document.body.insertAdjacentElement("beforeEnd", d);
				d.innerHTML = "<OBJECT CLASSID='clsid:3050f819-98b5-11cf-bb82-00aa00bdce0b' width='0' height='0'></OBJECT>";
				a = d.childNodes[0]
			} catch (f) {
				if (d)
					d.removeNode(true);
				d = a = null
			}
		}
		if (a == null)
			return false;
		var e = a.ChooseColorDlg(b);
		e = c(e);
		if (b.toLowerCase() == e.toLowerCase())
			return false;
		b = e;
		return true
	};
	this.dispose = function() {
		if (a && a.parentNode) {
			a.parentNode.removeNode(true);
			a = null
		}
		b = null
	};
	function c(a) {
		if (a == null || typeof a == "undefined")
			a = "";
		a = a.toString(16);
		if (a.length < 6) {
			var b = "000000".substring(0, 6 - a.length);
			a = b.concat(a)
		}
		return "#" + a
	}
};
registerNamespace("Spaces");
function debugLog() {
}
function getWidgets(b) {
	var a = b.getElementsByTagName("widget");
	if (a.length == 0)
		a = $Dom.Css.getElementsByCssSelector(".Widget", b);
	return a
}
Spaces.LayoutManager = function(F, D) {
	Spaces.LayoutManager.initializeBase(this, arguments);
	D = this.getParameters();
	var b = this, g = F, j = false, t = false, x = false, d = null, h = null, a = g_Spaces_Customize_Arguments_CustomTheme, C = null, u = false, n = ":temp", A = 0, z, i = [], k = [], l = null;
	b.initialize = function() {
		d = document.getElementById("EditSaveButton");
		h = document.getElementById("EditCancelButton");
		C = document.getElementById("tblLayoutBar");
		d.attachEvent("onclick", s);
		d.className = d.className.replace("disabledMainNav", "");
		h.attachEvent("onclick", r);
		p();
		Spaces.LayoutManager.callBaseMethod(this, "initialize", arguments);
		window.attachEvent("onbeforeunload", y);
		b.themeChanged = false
	};
	this.dispose = function() {
		z = null;
		i = null;
		k = null;
		if (d) {
			d.detachEvent("onclick", s);
			d = null
		}
		if (h) {
			h.detachEvent("onclick", r);
			h = null
		}
		Spaces.LayoutManager.callBaseMethod(this, "dispose", arguments)
	};
	function m(f) {
		for (var c = 0; c < i.length; c++) {
			var a = i[c];
			if (a.emptyDropRegion) {
				a.removeChild(a.lastChild);
				a.emptyDropRegion = false
			}
			if (!f) {
				var e = false, b = a.childNodes;
				if (b.length >= 0)
					for (var d = 0; d < b.length; d++)
						if (b[d].nodeType != 3) {
							e = true;
							break
						}
				if (!e)
					if (a.offsetWidth > 1) {
						a.innerHTML = '<div class="ContainerBorder EmptyRegionMarker DisabledTextColor" style="border-style:dashed">'
								+ GetString("live.sndefaultstrings.strings.layoutmanager.dragHere")
								+ "</div>";
						a.emptyDropRegion = true
					}
			}
		}
	}
	function p() {
		i = [];
		k = [];
		for (var b = 0; b < g.rows.length; b++)
			for (var c = 0; c < g.rows[b].cells.length; c++) {
				var a = g.rows[b].cells[c];
				if (a.getAttribute("istarget") == "true"
						&& a.style.display != "none") {
					i.push(a);
					k[a.id] = a
				}
			}
		m(false)
	}
	b.generateHash = function() {
		return n + A++
	};
	b.GetLayoutCellCount = function() {
		return i.length
	};
	b.GetLayoutCell = function(a) {
		return i[a]
	};
	b.GetLayoutCellById = function(a) {
		return k[a]
	};
	function w(c) {
		var a = window.location.href;
		for (var b = 0; b < c.length; b++) {
			a = a.replace("&" + c[b], "");
			a = a.replace(c[b] + "&", "");
			a = a.replace("?" + c[b], "")
		}
		return a
	}
	var r = function() {
		var b = ["customize=true", "tnt=true", "tab=Module", "tab=Themes",
				"tab=Layout", "tab=Custom"], a = w(b);
		if (!j) {
			document.getElementById("cssHideLayoutBar").disabled = false;
			x = false;
			window.location.replace(a)
		} else if (confirm(s_verifyCancel)) {
			t = true;
			q();
			document.body.style.cursor = "wait";
			window.location.replace(a)
		}
		return false
	};
	b.dirtyPage = function() {
		m(false);
		if (!j) {
			j = true;
			d.disabled = false;
			d.className = d.className.replace("Disabled", "Default");
			b.fire("onpagedirty");
			var a = document.getElementById("EmptySpace");
			if (a)
				a.style.display = "none"
		}
	};
	b.isDirtyPage = function() {
		return j
	};
	var y = function() {
		if (j && !u && !t)
			event.returnValue = s_checksave
	}, q = function() {
		h.disabled = true;
		h.className = h.className.replace("Default", "Disabled");
		d.disabled = true;
		d.className = d.className.replace("Default", "Disabled")
	}, s = function() {
		try {
			q();
			B(null)
		} catch (a) {
			alert("\n" + a.message + "\n")
		}
		return false
	};
	b.getLayoutTypeName = function() {
		var a = g.className.indexOf(" ");
		return g.className.substr(0, a)
	};
	function e(e, f) {
		var a = getWidgets(e), d = a.length;
		for (var c = 0; c < d; c++) {
			var b;
			if (a.length != d)
				b = a[0];
			else
				b = a[c];
			f.insertAdjacentElement("beforeEnd", b)
		}
	}
	function f(e, f) {
		var a = getWidgets(e), c = a.length;
		for (var d = Math.round(c / 2); d < c; d++) {
			var b;
			if (a.length != c)
				b = a[0];
			else
				b = a[d];
			f.insertAdjacentElement("beforeEnd", b)
		}
	}
	b.setLayout = function(j) {
		if (j == null)
			return;
		try {
			if ($Browser.isSafari())
				g.style.display = "none";
			var a = b.getLayoutTypeName();
			debugLog("SetLayout: from " + a + " to " + j);
			if (a == j)
				return;
			g.className = j + " " + g.className.removeSpaceDelimitedString(a);
			p();
			m(true);
			var c = b.GetLayoutCellById("MainFocus"), h = b
					.GetLayoutCellById("SupplementalW"), i = b
					.GetLayoutCellById("SupplementalNE"), d = b
					.GetLayoutCellById("SupplementalE");
			switch (j) {
				case "OneCol" :
					e(h, c);
					e(i, c);
					e(d, c);
					c.setAttribute("fp", "ZigZag");
					break;
				case "ClassicThreeCol" :
				case "RightHeavyThreeCol" :
				case "LeftHeavyThreeCol" :
					if (a != "OneCol")
						if (a == "SymmetricFourCol")
							e(i, d);
						else if (a != "ClassicThreeCol"
								&& a != "RightHeavyThreeCol"
								&& a != "LeftHeavyThreeCol") {
							if (a == "ClassicTwoCol")
								f(h, d);
							else
								f(d, h);
							if (j == "ClassicThreeCol")
								c.setAttribute("fp", "ZigZag");
							else
								c.setAttribute("fp", "TopToBottom")
						}
				case "ClassicTwoCol" :
					if (a != "OneCol")
						if (a == "ClassicThreeCol" || a == "RightHeavyThreeCol"
								|| a == "LeftHeavyThreeCol")
							e(d, h);
						else if (a == "SymmetricFourCol") {
							e(i, h);
							e(d, c)
						} else if (a == "SymmetricTwoCol"
								|| a == "BackwardsTwoCol")
							e(d, h);
					c.setAttribute("fp", "TopToBottom");
					break;
				case "SymmetricTwoCol" :
				case "BackwardsTwoCol" :
					if (a == "OneCol") {
						if (j == "SymmetricTwoCol")
							f(c, d)
					} else if (a == "ClassicThreeCol"
							|| a == "RightHeavyThreeCol"
							|| a == "LeftHeavyThreeCol")
						e(h, d);
					else if (a == "SymmetricFourCol") {
						e(h, c);
						e(i, d)
					} else if (a == "ClassicTwoCol")
						e(h, d);
					if (j == "BackwardsTwoCol")
						c.setAttribute("fp", "ZigZag");
					else
						c.setAttribute("fp", "TopToBottom");
					break;
				case "SymmetricFourCol" :
					c.setAttribute("fp", "TopToBottom");
					if (a == "OneCol") {
						f(c, i);
						f(c, h);
						f(i, d)
					} else if (a == "SymmetricTwoCol" || a == "BackwardsTwoCol") {
						f(c, h);
						f(d, i)
					} else if (a == "ClassicTwoCol") {
						f(h, i);
						f(c, d)
					} else if (a == "ClassicThreeCol"
							|| a == "RightHeavyThreeCol"
							|| a == "LeftHeavyThreeCol")
						f(d, i)
			}
		} catch (l) {
			debugLog(l.message)
		}
		if (!$Browser.isIE())
			setTimeout(function() {
						document.body.appendChild(document
								.createElement("span"))
					}, 0);
		if ($Browser.isSafari())
			g.style.display = "";
		b.fire("onlayoutchange");
		b.dirtyPage()
	};
	var B = function(B) {
		u = true;
		document.body.style.cursor = "wait";
		var d = document.createElement("Form");
		d.method = "post";
		var q = document.createElement("input");
		q.type = "hidden";
		q.name = "rLayout";
		q.value = b.getLayoutTypeName();
		d.appendChild(q);
		var x = document.createElement("input");
		x.type = "hidden";
		x.name = "rColor";
		x.value = $Config.Themes.current;
		d.appendChild(x);
		if (B) {
			var v = document.createElement("input");
			v.type = "hidden";
			v.name = "rReturn";
			v.value = B;
			d.appendChild(v)
		}
		var c = document.createElement("input");
		c.type = "hidden";
		c.name = "homePageLayout";
		d.appendChild(c);
		c.value = '<P I="1" N="Home" L="' + q.value + '" T="Base" xmlns="">';
		c.value += "<CT";
		c.value += ' TC="' + a.text_color + '"';
		c.value += ' LC="' + a.link_color + '"';
		c.value += ' BBC="' + a.body_background_color + '"';
		c.value += ' PBC="' + a.page_background_color + '"';
		c.value += ' SBC="' + a.selection_background_color + '"';
		c.value += ' HBC="' + a.hover_background_color + '"';
		c.value += ' CBC="' + a.container_border_color + '"';
		c.value += ' CBGC="' + a.container_background_color + '"';
		c.value += ' CHBC="' + a.container_header_background_color + '"';
		c.value += ' CHLC="' + a.container_header_link_color + '"';
		var h;
		switch (a.container_border_style) {
			case "Default" :
				h = "0";
				break;
			case "None" :
				h = "1";
				break;
			case "Dotted" :
				h = "2";
				break;
			case "Dashed" :
				h = "3";
				break;
			case "Solid" :
				h = "4"
		}
		c.value += ' CBS="' + h + '"';
		if (a.show_frame_image != 1)
			c.value += ' DFI="0"';
		var s;
		switch (a.background_repeat) {
			case "default" :
				s = "0";
				break;
			case "repeat" :
				s = "1";
				break;
			case "norepeat" :
				s = "2"
		}
		c.value += ' IR="' + s + '"';
		if (a.NewCustomImageId && a.NewCustomImageId != "")
			c.value += ' ICD="' + a.NewCustomImageId + '"';
		else if (a.currImageCnsId && a.currImageCnsId != "")
			c.value += ' ICD="' + a.currImageCnsId + '"';
		else
			c.value += ' ICD=""';
		c.value += ' DDBI="1"';
		var r = "";
		if (a.show_default_background_image == 1)
			r = "0";
		else if (a.show_custom_background_image == 1)
			r = "2";
		else if (a.hide_background_image == 1)
			r = "1";
		c.value += ' IDS="' + r + '"';
		var j = "";
		switch (a.background_alignment) {
			case "default" :
				j = "0";
				break;
			case "left" :
				j = "1";
				break;
			case "center" :
				j = "2";
				break;
			case "right" :
				j = "3"
		}
		c.value += ' IH="' + j + '"';
		var k = "";
		switch (a.background_placement) {
			case "default" :
				k = "0";
				break;
			case "top" :
				k = "1";
				break;
			case "center" :
				k = "2";
				break;
			case "bottom" :
				k = "3"
		}
		c.value += ' IV="' + k + '"';
		var f = "";
		switch (a.background_transparency) {
			case "default" :
				f = "0";
				break;
			case "0" :
				f = "1";
				break;
			case "1.5" :
				f = "2";
				break;
			case "2.5" :
				f = "4";
				break;
			case "4" :
				f = "6";
				break;
			case "5.5" :
				f = "8";
				break;
			case "7" :
				f = "10"
		}
		c.value += ' IT="' + f + '"';
		if (a.text_font_type.toLowerCase() != "default")
			c.value += ' FF="' + a.text_font_type + '"';
		if (a.text_font_size.toLowerCase() != "default")
			c.value += ' FS="' + a.text_font_size + '"';
		var e = 0;
		if (a.text_font_bold)
			e = e | 1;
		if (a.text_font_italic)
			e = e | 2;
		c.value += ' FY="' + e + '"';
		if (a.header_font_type.toLowerCase() != "default")
			c.value += ' HFF="' + a.header_font_type + '"';
		if (a.header_font_size.toLowerCase() != "default")
			c.value += ' HFS="' + a.header_font_size + '"';
		e = 0;
		if (a.header_font_italic)
			e = e | 2;
		c.value += ' HFY="' + e + '"';
		c.value += " />";
		c.value += "<Rs>";
		var D = b.GetLayoutCellCount(), y, g, A, t, i, z;
		for (y = 0; y < D; y++) {
			t = b.GetLayoutCell(y);
			var C = o(t.id);
			if (C == "-1")
				continue;
			c.value += '<R T="' + o(t.id) + '">' + "<Ms>";
			var m = getWidgets(t);
			A = m.length;
			for (g = 0; g < A; g++)
				if (m[g].style.display != "none") {
					i = m[g].id.toString();
					z = m[g].getAttribute("spaces:manifest");
					if (i.indexOf(n) > 0)
						i = i.substr(0, i.indexOf(n));
					if (z != null) {
						var F = m[g].getAttribute("spaces:title");
						c.value += '<M T="GadgetGallery"  N="' + F + '" I="'
								+ z + '">'
					} else {
						c.value += '<M T="' + i + '"';
						c.value += " >"
					}
					c.value += "</M>"
				}
			c.value += "</Ms></R>"
		}
		c.value += "</Rs>";
		c.value += "</P>";
		document.body.insertAdjacentElement("beforeEnd", d);
		var l = document.createElement("input");
		l.type = "hidden";
		l.name = "myBackgroundsCnsId";
		if (a.bkgFolderCnsId && a.bkgFolderCnsId != "")
			l.value = a.bkgFolderCnsId;
		else
			l.value = "";
		d.appendChild(l);
		var p = document.createElement("input");
		p.type = "hidden";
		p.name = "lastCustomImageCnsId";
		if (a.NewCustomImageId && a.NewCustomImageId != "")
			p.value = a.NewCustomImageId;
		else
			p.value = "";
		d.appendChild(p);
		var w = document.createElement("input");
		w.type = "hidden";
		w.name = C_CANARY_COOKIE_NAME;
		w.value = GetCookieValue(C_CANARY_COOKIE_NAME);
		d.appendChild(w);
		d.style.display = "none";
		d.action = "/Customize/LayoutSettings/" + E();
		d.submit()
	};
	function o(b) {
		var a = "-1";
		switch (b.toLowerCase()) {
			case "mainfocus" :
				a = "0";
				break;
			case "supplemental" :
				a = "1";
				break;
			case "supplementalnw" :
				a = "2";
				break;
			case "supplementalw" :
				a = "3";
				break;
			case "supplementalsw" :
				a = "4";
				break;
			case "supplementals" :
				a = "5";
				break;
			case "supplementalse" :
				a = "6";
				break;
			case "supplementale" :
				a = "7";
				break;
			case "supplementalne" :
				a = "8";
				break;
			case "supplementaln" :
				a = "9"
		}
		return a
	}
	b.generatePartTemplate = function(f, e, h, g, c, d) {
		var i = '<div class="ContainerNoPadding spDefaultFrame" pf:n="1" pf:edit="1" pf:id="'
				+ f
				+ '">'
				+ '  <div class="sppPartTitle">'
				+ '    <div class="partHeader">'
				+ '      <div class="ContainerHeader">'
				+ '        <table style="table-layout:fixed; width:100%" cellpadding="0" cellspacing="0">'
				+ "        <tr>"
				+ '        <td width="100%">'
				+ '            <div class="ellipse partDetail" style="white-space:nowrap"><div class="Title2">'
				+ '               <h2 class="LineHeightStandard ContainerHeaderLinkColor" style="font-size:100%">'
				+ e.encodeHtml()
				+ "</h2>"
				+ "            </div></div>"
				+ "        </td>"
				+ '        <td class="sppfMenuCell">'
				+ '            <a href="#" onclick="showFrameMenu(this);return false;" class="sppfMenu"><img class="HoverButton" src="'
				+ $Config.Themes.url
				+ "hig/img/glyph/showmenu_rest_~ContainerHeaderTextLuminance~.gif"
				+ '" hb:hoversrc="'
				+ $Config.Themes.url
				+ "hig/img/glyph/showmenu_hover_~ContainerHeaderTextLuminance~.gif"
				+ '"></a>'
				+ "        </td>"
				+ "        </tr>"
				+ "        </table>"
				+ "      </div>"
				+ "    </div>"
				+ "  </div>"
				+ '  <div class="ContainerPadding">'
				+ h
				+ "  </div>" + "</div>", a = null;
		if ($Browser.isIE())
			a = document.createElement("spaces:widget");
		else
			a = document.createElement("div");
		a.id = f;
		if (c) {
			a.setAttribute("spaces:manifest", c);
			a.setAttribute("spaces:title", e)
		}
		a.innerHTML = i;
		a.className = "Widget " + g;
		$Binding.validate(a);
		$Binding.extend(a.getElementsByTagName("a")[0]);
		$Binding.extend(a.getElementsByTagName("img")[0]);
		if (d == null)
			el = b.GetLayoutCellById("MainFocus").insertAdjacentElement(
					"afterBegin", a);
		else
			d.insertAdjacentElement("afterBegin", a);
		b.dirtyPage()
	};
	this.removePart = function(d, a) {
		b.dirtyPage();
		var c = b.findPartById(a);
		c.visible = false;
		d.style.display = "none"
	};
	var E = function() {
		var c = "", b = location.search.substring(1).split("&");
		for (var a = 0; a < b.length; a++)
			if (b[a].split("=")[0].search(/^powertoy$/i) != -1) {
				c = "?" + b[a];
				break
			}
		return c
	};
	this.findPartDefinition = function(a) {
		if (a) {
			a = a.toLowerCase();
			for (var b = 0; b < g_Spaces_Customize_Arguments_Parts.partdefs.length; b++)
				if (a == g_Spaces_Customize_Arguments_Parts.partdefs[b].type
						.toLowerCase())
					return g_Spaces_Customize_Arguments_Parts.partdefs[b]
		}
		return null
	};
	this.findPartById = function(b) {
		if (b) {
			b = b.toLowerCase();
			for (var a = 0; a < g_Spaces_Customize_Arguments_Parts.parts.length; a++) {
				if (b == g_Spaces_Customize_Arguments_Parts.parts[a].id
						.toLowerCase())
					return g_Spaces_Customize_Arguments_Parts.parts[a];
				if (g_Spaces_Customize_Arguments_Parts.parts[a].subparts != null) {
					var d = g_Spaces_Customize_Arguments_Parts.parts[a].subparts;
					for (var c = 0; c < d.length; c++)
						if (b == d[c].id.toLowerCase())
							return d[c]
				}
			}
		}
		return null
	};
	this.findParts = function(a) {
		var c = [];
		if (a) {
			a = a.toLowerCase();
			for (var b = 0; b < g_Spaces_Customize_Arguments_Parts.parts.length; b++)
				if (a == g_Spaces_Customize_Arguments_Parts.parts[b].type
						.toLowerCase())
					c.push(g_Spaces_Customize_Arguments_Parts.parts[b])
		}
		return c
	};
	this.getInstanceCount = function(a) {
		var d = 0, e = g_Spaces_Customize_Arguments_Parts;
		a = a.toLowerCase();
		for (var c = 0; c < e.parts.length; c++)
			if (b.isSameAllocationGroup(a, e.parts[c].type.toLowerCase()))
				d++;
		return d
	};
	this.isSameAllocationGroup = function(a, b) {
		a = a.toLowerCase();
		b = b.toLowerCase();
		if (a == b)
			return true;
		if (a == "links" || a == "booklist" || a == "friendslist"
				|| a == "movielist")
			if (b == "links" || b == "booklist" || b == "friendslist"
					|| b == "movielist")
				return true;
		return false
	};
	this.ApplyRemoveCustomCSS = function(d, e) {
		var a;
		if (!e)
			if (l == false && d == false || l == true && d == true)
				return;
		if (d == true) {
			a = b.GenerateCSS();
			l = true
		} else {
			a = "";
			l = false
		}
		if ($Browser.isMozilla()) {
			var c = document.getElementById("CustomTheme");
			c.innerHTML = a
		} else {
			var c = document.styleSheets("CustomTheme");
			if (c)
				c.cssText = a
		}
	};
	this.GenerateCSS = function() {
		var a = g_Spaces_Customize_Arguments_CustomTheme, f = ".ContainerNoPadding, .ContainerLeftNav, .ContainerMovable, .ContainerFullView, .ContainerBorder, .abHeader, .abArea, .taskbar, #maintbl, .searchsubnav, .blueNB, .SimpleBorder, .innerList, #PartsBucket", h = ".blueBottom, .onlinePhotoBox, .blueBox, .beNormalTab, .bePreviewSelectedTab, .beBlogNormalTab, .beSelectedTab, .beborderleftdarkbg, .bline, .beborderleft, .beborderleftdarkbg, .blogpost .MSN_EDITCONTAINER, div#bePicRow, .blogpost .MSN_TOOLBAR, .blogpost .MSN_EDITCONTAINER, #FullExplorer, div#navBar div.AdminNav, div.bvEntry .footer, .borderline", d = "", b, e = 2147483647;
		if (a.page_background_color != e) {
			b = ".PageBG, .PageBGColor, .mainbody {background-color:#{0};}\r\n";
			d += b.format(c(a.page_background_color))
		}
		if (a.show_frame_image == 0)
			d += ".BodyBG {background-image:none;}\r\n";
		if (a.show_default_background_image == 0)
			if (a.show_custom_background_image == 0)
				d += ".PageBG, .mainbody{background-image:none;}\r\n";
			else if (a.NewPreAuthUrl != null && a.NewPreAuthUrl != "")
				d += ".PageBG{background-image: url(" + a.NewPreAuthUrl
						+ ");}\r\n";
			else if (a.OriginalCustomPreAuthUrl != null
					&& a.OriginalCustomPreAuthUrl != "")
				d += ".PageBG{background-image: url("
						+ a.OriginalCustomPreAuthUrl + ");}\r\n";
			else
				d += ".PageBG{background-image:none;}\r\n";
		if (a.background_repeat == "repeat")
			d += ".PageBG, .mainbody{background-repeat:repeat;}\r\n";
		else if (a.background_repeat == "norepeat")
			d += ".PageBG, .mainbody{background-repeat:no-repeat;}\r\n";
		if (a.background_alignment != "default")
			if (a.background_placement != "default")
				d += ".PageBG, .mainbody{background-position:"
						+ a.background_placement + " " + a.background_alignment
						+ ";}\r\n";
			else
				d += ".PageBG, .mainbody{background-position:top "
						+ a.background_alignment + ";}\r\n";
		else if (a.background_placement != "default")
			d += ".PageBG, .mainbody{background-position:"
					+ a.background_placement + " center;}\r\n";
		if (a.background_transparency != "default") {
			var j = Number(a.background_transparency), g = 100 - 10 * j, i = g
					/ 100;
			if ($Browser.isIE())
				d += ".SPTransparency, .ContainerLeftNav {filter:progid:DXImageTransform.Microsoft.Alpha(opacity="
						+ g + ");}\r\n";
			else
				d += ".SPTransparency, .ContainerLeftNav {opacity:" + i
						+ "}\r\n"
		}
		if (a.container_background_color != e) {
			b = ".ContainerBGColor, .ContainerBG, .ContainerBG2, .ContainerBGColor2 {background-color:#{0};}\r\n";
			d += b.format(c(a.container_background_color));
			b = ".taskbar, .SUContentPane, .partsmb, .MPInfo, .ContainerNoPadding, .ContainerMovable, .ContainerFullView, .Container {background-color:#{0};}\r\n";
			d += b.format(c(a.container_background_color));
			b = ".LeftNav, .ContainerLeftNav {background-color:#{0};}\r\n";
			d += b.format(c(a.container_background_color));
			b = ".spAToolbar {background-color:#{0};background-image:none;background-repeat:no-repeat;}\r\n";
			d += b.format(c(a.container_background_color));
			b = ".beborderleftdarkbg, .beNormalTab, .beBlogNormalTab {background-color:#{0};}\r\n";
			d += b.format(c(a.container_background_color))
		}
		if (a.link_color != e) {
			b = "a, a:visited, .linklist, .onlinePhotoBox a, .linkedEllipseColor {color:#{0};}\r\n a.cxp_ic_name {color:#{0} !important;}\r\n";
			d += b.format(c(a.link_color))
		}
		if (a.text_color != e) {
			b = ".Toolbar, .spAToolbar, .spAToolbar a, .spAToolbar a:visited, .PrimaryTextColor, a:visited.PrimaryTextColor {color:#{0};}\r\n";
			d += b.format(c(a.text_color));
			b = ".LeftNav .List li a, .LeftNav .List li a:visited, .LeftNav .List li a:hover, .spAToolbar, .spAToolbar a, .spAToolbara:visited {color:#{0};}\r\n";
			d += b.format(c(a.text_color));
			b = "body, label, .bvSectionContentPC tr td, .search input, .belink, .contentFont, .onlinePhotoBox {color:#{0};}\r\n";
			d += b.format(c(a.text_color));
			b = ".tips {color:#{0} !important}\r\n";
			d += b.format(c(a.text_color));
			b = ".TextAdLabel, .SecondaryTextColor, a:visited.SecondaryTextColor, .partsubhead, .graytitle, .notgray, .msheader td {color:#{0};}\r\n";
			d += b.format(c(a.text_color));
			b = ".frex_title {color:#{0};}\r\n";
			d += b.format(c(a.text_color))
		}
		if (a.container_border_color != e) {
			b = f + ", " + h + " {border-color:#{0};}\r\n";
			d += b.format(c(a.container_border_color));
			b = ".line {background-color:#{0};color:#{0};}\r\n";
			d += b.format(c(a.container_border_color))
		}
		if (a.container_border_style != "Default") {
			b = f + " {border-style:{0};}\r\n";
			b += ".ContainerBorderLeft {border-left-style:{0};}\r\n";
			b += ".ContainerBorderRight {border-right-style:{0};}\r\n";
			b += ".ContainerBorderBottom {border-bottom-style:{0};}\r\n";
			b += ".ContainerBorderTop {border-top-style:{0};}\r\n";
			d += b.format(a.container_border_style.toLowerCase())
		}
		if (a.body_background_color != e) {
			b = "body, .BackgroundBody, .BodyBG{background-color:#{0};}\r\n";
			d += b.format(c(a.body_background_color));
			b = ".FooterTextColor, a:visited.FooterTextColor, div.Footer, div.Footer a, div.Footer a:visited {color:#{0};}\r\n";
			d += b.format(c(v(a.body_background_color)))
		}
		if (a.selection_background_color != e) {
			b = ".SelectionBG, .LeftNav .List .On, .dragDropSlider {background-color:#{0};}\r\n";
			d += b.format(c(a.selection_background_color));
			b = ".beSelectedTab, .bePreviewSelectedTab, .beborderleft, .beborderleftdarkbg, .blueBottom, .onlinePhotoBox {background-color:#{0};}\r\n";
			d += b.format(c(a.selection_background_color))
		}
		if (a.hover_background_color != e) {
			b = ".HoverBG, .LeftNav .List li a:hover  {background-color:#{0};}\r\n";
			d += b.format(c(a.hover_background_color))
		}
		if (a.container_header_background_color != e) {
			b = ".ContainerHeaderBGColor, .ContainerHeader, .ContainerLeftNav .ContainerHeader, .ContainerFullView .ContainerHeader {background-color:#{0};background-image:none;background-repeat:no-repeat;}\r\n";
			d += b.format(c(a.container_header_background_color))
		}
		if (a.container_header_link_color != e) {
			b = ".ContainerHeader, .ContainerHeader a, .ContainerHeader a:visited, .ContainerHeaderTextColor, a:visited.ContainerHeaderTextColor, .ContainerHeaderLinkColor, a:visited.ContainerHeaderLinkColor {color:#{0};}\r\n";
			d += b.format(c(a.container_header_link_color))
		}
		if (a.container_header_background_color != e
				|| a.container_background_color != e)
			d += ".ContainerBG2, .ContainerLeftNav {background-image:none;background-repeat:no-repeat;}\r\n";
		d += ".ContainerPadding, .ContainerPadding td, .ContainerPadding th, ul.subnav, ul.List, .ContainerFullView, .ContainerFullView td, .ContainerFullView th {";
		if (a.text_font_type != "default")
			d += "font-family: " + a.text_font_type + ";";
		if (a.text_font_size != "default")
			d += "font-size: " + a.text_font_size + ";";
		if (a.text_font_bold == true)
			d += "font-weight: bold;";
		if (a.text_font_italic == true)
			d += "font-style: italic;";
		d += "}\r\n";
		d += ".ContainerHeader, .ContainerHeader td, .ContainerHeader th {";
		if (a.header_font_type != "default")
			d += "font-family: " + a.header_font_type + ";";
		if (a.header_font_size != "default")
			d += "font-size: " + a.header_font_size + ";";
		if (a.header_font_italic == true)
			d += "font-style: italic;";
		d += "}\r\n";
		return d
	};
	function v(g) {
		var a = g, h = a % 256;
		a = Math.floor(a / 256);
		var i = a % 256, j = Math.floor(a / 256), c = 161, f = 4473924, e = 16777215, d = .2126
				* j + .7152 * i + .0722 * h, b;
		if (d > c)
			b = f;
		else
			b = e;
		return b
	}
	function c(b) {
		if (b == 2147483647 || b < 0 || b > 16777215)
			return "";
		var a = b.toString(16);
		while (a.length < 6)
			a = "0" + a;
		return a.toUpperCase()
	}
};
Spaces.LayoutManager.prototype = new $Event.DOM;
Spaces.LayoutManager.Events = new $Enum("onlayoutchange", "onpagedirty",
		"onpartdragdrop");
Spaces.LayoutManager.registerClass("Spaces.LayoutManager", "$Binding");
Spaces.LayoutManager.OpTypes = new $Enum("NoOp", "Create", "Add", "Remove",
		"Show", "Hide");
var _deScr = $Browser.isSafari() ? document.body : document.documentElement, Spaces_LayoutManager_DragDropManager = Spaces.LayoutManager.DragDropManager = function(
		m) {
	var i = Web.UI, g = $Browser.isSafari() ? document.body : i.getLayoutRoot(), c = m
			|| g, a = this, k = false, h, f, e, b, d, n = i.getLocation;
	this.resetTargets = function() {
		f = [];
		e = [];
		b = [];
		d = []
	};
	this.resetTargets();
	this.addTargetElement = function(a, b, d) {
		if (c.contains(a))
			e.push({
						element : a,
						context : b,
						testFunction : d
					});
		else
			throw new Error("The provided element is not in the specified drag-drop scope.");
	};
	function l(c, a, d, e, f) {
		var b = 0;
		while (b < c.length && c[b].x < a.x)
			b++;
		a.context = d;
		a.element = e;
		a.testFunction = f;
		c.insert(b, a)
	}
	this.addTargetRegion = function(a, b, c) {
		var d = new i.Rect(a.x, a.y, a.width, a.height);
		l(f, d, b, null, c)
	};
	function o(p, o) {
		var l = n(c), h = {
			srcElement : p,
			definition : o
		}, m = event, f = m.clientX + c.scrollLeft - l.left
				+ (c == g ? 0 : g.scrollLeft), i = m.clientY + c.scrollTop
				- l.top + (c == g ? 0 : g.scrollTop), e;
		for (var j = d.length - 1; j >= 0; j--) {
			e = d[j];
			if (!(f > e.left && f < e.right && i > e.top && i < e.bottom))
				if (!e.testFunction || !e.testFunction(f, i)) {
					h.target = e;
					a.fire("ontargetleave", h);
					d.removeAt(j)
				}
		}
		var r = true, q = false, k = 0;
		while (k < b.length) {
			e = b[k];
			if (f > e.left && f < e.right && i > e.top && i < e.bottom)
				if (!e.testFunction || e.testFunction(f, i)) {
					h.target = e;
					if (!d.exists(e)) {
						d.push(e);
						a.fire("ontargetenter", h)
					}
					a.fire("ontargetover", h)
				}
			k++
		}
		return h.definition
	}
	var j = Spaces.LayoutManager.DragDrop;
	function p(c, e) {
		switch (e) {
			case j.State.Moving :
				c = o(c.dragElement, c);
				a.fire("ondrag", {
							srcElement : c.dragElement,
							definition : c
						});
				break;
			case j.State.Complete :
				a.fire("ondragend", {
							targets : d,
							srcElement : c.dragElement,
							definition : c
						});
				objItem = b.pop();
				while (objItem) {
					objItem.context = objItem.elements = objItem.testFunction = null;
					objItem = b.pop()
				}
				if (k)
					a.dispose()
		}
	}
	this.recalc = function() {
		b = [];
		b = f.clone();
		for (var d = 0; d < e.length; d++) {
			var a = e[d], c = n(a.element, m);
			l(b, new i.Rect(c.left, c.top, c.width, c.height), a.context,
					a.element, a.testFunction)
		}
	};
	this.dispose = function() {
		window.detachEvent("onunload", a.dispose);
		var b = e.pop();
		while (b) {
			b.context = b.element = b.testFunction = null;
			b = e.pop()
		}
		b = f.pop();
		while (b) {
			b.context = b.element = b.testFunction = null;
			b = f.pop()
		}
		for (var d in this._htEvents)
			this._htEvents[d].clear();
		h = c = null
	};
	this.start = function(f, e, b, d) {
		k = b;
		h = j(f, c, p, e, false, true, d);
		a.fire("ondraginit", {
					srcElement : h
				});
		a.recalc();
		a.fire("ondragstart");
		return h
	};
	window.attachEvent("onunload", a.dispose)
};
Spaces_LayoutManager_DragDropManager.TargetType = new $Enum("Element", "Region");
Spaces_LayoutManager_DragDropManager.Events = new $Enum("ondrag", "ondraginit",
		"ondragstart", "ondragend", "ontargetenter", "ontargetover",
		"ontargetleave");
Spaces_LayoutManager_DragDropManager.prototype = new $Event.DOM;
Spaces_LayoutManager_DragDropManager
		.registerClass("Spaces.LayoutManager.DragDropManager");
Spaces.LayoutManager.DragDrop = function(d, z, j, n, y, x, s) {
	if ($Browser.isSafari())
		s = false;
	var i, f, p = true, a = null, k = null, m = Web.UI, t = m.getLocation, h = m
			.getLayoutRoot(), b = z || h, w = d.offsetWidth, v = d.offsetHeight, l = Spaces.LayoutManager.DragDrop.State.Initialize, c, g = 0, e = 0;
	if (event.button == $Browser.Button.LEFT || x) {
		document.attachEvent("onmousemove", q);
		i = b.scrollHeight;
		f = b.scrollWidth;
		q();
		event.returnValue = false
	} else
		event.returnValue = true;
	function q() {
		if (!$Browser.isSafari())
			document.selection.empty();
		if (l == Spaces.LayoutManager.DragDrop.State.Initialize) {
			if (n) {
				if (!Spaces.LayoutManager.DragDrop.pool)
					a = document.createElement("div");
				else {
					a = Spaces.LayoutManager.DragDrop.pool;
					a.style.display = ""
				}
				a.className = "Spaces_LayoutManager_DragDrop";
				var C = u(d);
				d.className = d.className
						.removeSpaceDelimitedString("Spaces_LayoutManager_DragDrop_Source")
						+ " Spaces_LayoutManager_DragDrop_Source";
				a.style.pixelWidth = w;
				a.style.pixelHeight = v;
				a.appendChild(C);
				a.style.zIndex = 1e6;
				a.style.position = "absolute";
				C.style.position = "static"
			} else {
				a = d;
				a.className = a.className
						.removeSpaceDelimitedString("Spaces_LayoutManager_DragDrop")
						+ " Spaces_LayoutManager_DragDrop"
			}
			a.style.position = "absolute";
			if (n && a.parentElement != b)
				if (b == _deScr)
					document.body.appendChild(a);
				else
					b.appendChild(a);
			a.attachEvent("onmouseup", o);
			a.attachEvent("onlosecapture", r);
			a.setCapture();
			var z = t(d, h);
			c = m.getMouseLocation(event, h).subtract(z.left, z.top);
			if (j)
				j({
							dragElement : a,
							srcElement : d
						}, l);
			l = Spaces.LayoutManager.DragDrop.State.Moving;
			if (y)
				k = new m.FramePopup(a)
		}
		var A = t(b), s = new m.Point(event.clientX + h.scrollLeft,
				event.clientY + h.scrollTop), q = s.x - A.left - c.x
				+ (b != h ? b.scrollLeft : 0), p = s.y - A.top - c.y
				+ (b != h ? b.scrollTop : 0);
		q = q > -c.x ? q + c.x < f ? q : f - c.x : -c.x;
		p = p > -c.y ? p + c.y < i ? p : i - c.y : -c.y;
		if (q < f + a.offsetWidth)
			a.style.pixelLeft = q;
		if (p < b.scrollHeight + a.offsetHeight)
			a.style.pixelTop = p > -c.y ? p : -c.y;
		g = g == 0 ? s.y - a.offsetTop : g;
		e = e == 0 ? s.x - a.offsetLeft : e;
		var B = $Browser.isSafari() ? document.documentElement : b;
		if (a.offsetTop <= b.scrollTop)
			b.scrollTop -= g;
		else if (a.offsetTop + g > b.scrollTop + B.clientHeight
				&& a.offsetTop + g < i)
			b.scrollTop += g;
		if (a.offsetLeft <= b.scrollLeft)
			b.scrollLeft -= e;
		else if (a.offsetLeft + e > b.scrollLeft + B.clientWidth
				&& a.offsetLeft + e < f)
			b.scrollLeft += e;
		if (k)
			k.positionAt(new m.Rect(a.offsetLeft, a.offsetTop, a.offsetWidth,
							a.offsetHeight), a.currentStyle.zIndex - 1);
		var x = {
			scrollHeight : i,
			scrollWidth : f,
			dragElement : a,
			srcElement : d,
			ev : window.event
		};
		if (j)
			j(x, l);
		i = x.scrollHeight;
		f = x.scrollWidth;
		event.returnValue = false;
		return false
	}
	function u(e) {
		var f;
		if (!s) {
			var b, c = e.childNodes;
			for (var a = 0; a < c.length; a++)
				if (c[a].tagName == "DIV")
					b = c[a];
			var f = e.cloneNode(false), g = b.cloneNode(false), d = null;
			for (var a = 0; a < b.childNodes.length; a++)
				if (b.childNodes[a].className
						&& b.childNodes[a].className.indexOf("sppPartTitle") >= 0) {
					d = b.childNodes[a].cloneNode(true);
					d.style.pixelHeight = b.scrollHeight;
					g.appendChild(d);
					break
				}
			f.appendChild(g)
		} else
			f = e.cloneNode(true);
		return f
	}
	function o() {
		if (p) {
			p = false;
			l = Spaces.LayoutManager.DragDrop.State.Complete;
			a.releaseCapture();
			document.detachEvent("onmousemove", q);
			a.detachEvent("onmouseup", o);
			a.detachEvent("onlosecapture", r);
			if (j)
				j({
							dragElement : a,
							srcElement : d,
							ev : window.event
						}, l);
			if (n) {
				d.className = d.className
						.removeSpaceDelimitedString("Spaces_LayoutManager_DragDrop_Source");
				if (n && a.filters && a.filters.length > 0) {
					a.innerHTML = "";
					if (!Spaces.LayoutManager.DragDrop.pool)
						Spaces.LayoutManager.DragDrop.pool = a;
					a.style.display = "none"
				} else
					a.removeNode(true)
			} else
				a.className = a.className
						.removeSpaceDelimitedString("Spaces_LayoutManager_DragDrop");
			if (k) {
				k.dispose();
				k = null
			}
			d = b = null
		}
	}
	function r() {
		if (p)
			o()
	}
	return a
};
Spaces.LayoutManager.DragDrop.State = $Enum("Initialize", "Moving", "Complete");
Spaces.LayoutManager.DragDrop.pool = null;
var _deScr = $Browser.isSafari() ? document.body : document.documentElement;
Spaces.LayoutManager.PartDragDrop = function(H, o) {
	Spaces.LayoutManager.PartDragDrop.initializeBase(this, arguments);
	o = this.getParameters();
	var j = null, w = 0, x = 0, c = H, f = null, v = this, d = null, a = null, e = null, k = null, i = -2, I = cacheWidth = 0, e;
	v.initialize = function() {
		Spaces.LayoutManager.PartDragDrop.callBaseMethod(this, "initialize",
				arguments);
		v.registerFor("Spaces.LayoutManager", z);
		var a = $Dom.Css.getElementsByCssSelector(".partDetail", c);
		debugLog(c.id + " - " + a.length);
		if (a.length >= 1) {
			f = a[0];
			f.attachEvent("onmousedown", t);
			f.style.cursor = "move"
		}
	};
	this.dispose = function() {
		if (f) {
			f.detachEvent("onmousedown", t);
			f = null
		}
		c = null;
		Spaces.LayoutManager.PartDragDrop.callBaseMethod(this, "dispose",
				arguments)
	};
	var z = function(b, a) {
		if (!a)
			return;
		j = b
	}, t = function(g) {
		if (g.srcElement.tagName == "A" || g.srcElement.tagName == "IMG")
			return;
		var b = new Spaces.LayoutManager.DragDropManager;
		b.attachEvent("ondragstart", F);
		b.attachEvent("ontargetenter", D);
		b.attachEvent("ontargetleave", E);
		b.attachEvent("ondrag", u);
		b.attachEvent("ondragend", G);
		if (a == null)
			B();
		var i = j.GetLayoutCellCount();
		d = [];
		for (var f = 0; f < i; f++) {
			var e = j.GetLayoutCell(f);
			if (e.getAttribute("istarget") != null
					&& e.getAttribute("istarget") == "true")
				d[d.length] = p(e)
		}
		debugLog(c.outerHTML);
		debugLog(o.sc);
		var h = b.start(c, true, false, o.sc == "1" ? true : false);
		h.style.cursor = "move"
	}, B = function() {
		var b = document.createElement("div");
		b.className = "dragDropSlider";
		b.id = "splitLine";
		b.style.position = "absolute";
		b.style.overflow = "hidden";
		b.style.zIndex = 1;
		b.style.display = "none";
		document.body.insertAdjacentElement("beforeEnd", b);
		a = b
	}, F = function() {
	}, D = function() {
	}, E = function() {
	};
	function u(K) {
		var L = K.Package.srcElement;
		try {
			var z = false, m = 0, t = _deScr.scrollTop, o = _deScr.scrollLeft;
			while (m < d.length && !z) {
				b = d[m];
				if (b.left < event.clientX + o && b.right > event.clientX + o
						&& b.top < event.clientY + t
						&& b.bottom > event.clientY + t)
					z = true;
				else
					m++
			}
			if (z) {
				var j = d[m].source;
				e = j;
				var v = getWidgets(j), H = v.length, I = false;
				for (var n = 0; n < v.length; n++)
					if (v[n].style.display == "") {
						I = true;
						break
					}
				debugLog("Rebuild Cache");
				if (j.getAttribute("fillPattern") == "ZigZag")
					j.targetRegions = new g(C);
				else
					j.targetRegions = new g(s);
				j.bounds = p(j);
				for (var n = 0; n < H; n++) {
					var u = v[n];
					if (j.getAttribute("fillPattern") == "ZigZag"
							&& u.className != "FullRegionWidth")
						j.targetRegions.AddRegion(new q(u, u.id, y));
					else
						j.targetRegions.AddRegion(new q(u, u.id, r))
				}
				if (H == 0 || !I) {
					i = -1;
					a.style.top = d[m].top;
					a.style.left = d[m].left + 6;
					a.style.width = d[m].width - 6;
					a.style.height = 4;
					a.style.display = ""
				} else {
					var E = new h(event.clientX + o, event.clientY + t), f = j.targetRegions
							.FindRegion(E);
					if (f != null && c != f.region.source) {
						var l = f.region.bounds, A = parseInt(f.region.source.currentStyle.paddingLeft), G = parseInt(f.region.source.currentStyle.paddingRight), B = parseInt(f.region.source.currentStyle.paddingTop), F = parseInt(f.region.source.currentStyle.paddingBottom);
						if ("top" == f.quadrant || "bottom" == f.quadrant) {
							a.style.left = l.left + A;
							a.style.width = l.width - A - G;
							a.style.height = 4;
							if ("top" == f.quadrant)
								a.style.top = l.top + B - 6;
							else
								a.style.top = l.bottom - F + 2
						} else {
							var J = j.bounds, D = (J.left + J.right) / 2 - 1;
							a.style.top = l.top - B;
							a.style.width = 4;
							a.style.height = l.height - B - F;
							if ("right" == f.quadrant && E.x < D
									|| "left" == f.quadrant && E.x > D)
								a.style.left = D;
							else if ("left" == f.quadrant)
								a.style.left = l.left + A - 4;
							else
								a.style.left = l.right - G
						}
						k = f;
						i = 1;
						a.style.display = ""
					} else {
						k = null;
						a.style.display = "none"
					}
				}
			} else {
				a.style.display = "none";
				i = -2;
				e = null
			}
			if (event.clientX - w + o < cacheWidth + this.offsetWidth)
				this.style.pixelLeft = event.clientX - w + o;
			if (event.clientY - x + t < document.body.scrollHeight
					+ this.offsetHeight)
				this.style.pixelTop = event.clientY - x + t
		} catch (M) {
			debugLog("\n" + M.message + "\n")
		}
	}
	var G = function(m) {
		try {
			debugLog("ondragend");
			u(m);
			c.className = c.className.replace("dragSource", "").trim();
			a.style.display = "none";
			a = null;
			if (i != -2 && e != null && e.targetRegions != null) {
				var f = null, g;
				if (i == -1) {
					g = "afterBegin";
					f = e
				} else if (k != null && k.region.source != c) {
					var h = e.targetRegions.GetDropInfo(c);
					g = h.targetString;
					f = h.target
				}
				if (f != null) {
					var l = A(c, "td");
					f.insertAdjacentElement(g, c);
					debugLog(c.outerHTML);
					l.targetRegions = e.targetRegions = null;
					var d = $Dom
							.getAnyElementByTagName("spaces:view", c, false);
					for (var b = 0; b < d.length; b++) {
						d[b].className = d[b].className
								.removeSpaceDelimitedString("viewActive");
						d[b].className += e.getAttribute("op") == d[b]
								.getAttribute("op") ? " viewActive" : ""
					}
					j.fire("onpartdragdrop");
					j.dirtyPage()
				}
			}
		} catch (n) {
			debugLog("\n" + n.message + "\n")
		}
	};
	function A(a, b) {
		b = b.toLowerCase();
		while (a != null && a.tagName.toLowerCase() != b)
			a = a.parentElement;
		return a
	}
	function m(a) {
		a = parseInt(a);
		return a.toString() == "NaN" ? 0 : a
	}
	function p(b) {
		if (!b)
			return null;
		var a = {};
		a.source = b;
		var c = b.currentStyle;
		a.height = b.offsetHeight + m(c.marginTop) + m(c.marginBottom);
		a.width = b.offsetWidth + m(c.marginLeft) + m(c.marginRight);
		a.left = a.top = 0;
		while (b && b.tagName != "BODY") {
			a.left += b.offsetLeft;
			a.top += b.offsetTop;
			b = b.offsetParent
		}
		a.bottom = a.top + a.height;
		a.right = a.left + a.width;
		return a
	}
	function h(a, b) {
		return {
			x : a,
			y : b
		}
	}
	function n(b, a, c) {
		return (b.y - a.y) * (c.x - a.x) - (b.x - a.x) * (c.y - a.y)
	}
	function l(a, d, b, c) {
		return n(a, d, b) * n(a, b, c) > 0 && n(a, b, c) * n(a, c, d) > 0
	}
	function y(b, a) {
		if (a.top < b.y && a.top + a.height > b.y && a.left < b.x
				&& a.left + a.width > b.x) {
			var g = new h(a.left, a.top), f = new h(a.right, a.top), d = new h(
					a.right, a.bottom), e = new h(a.left, a.bottom), c = new h(
					(a.left + a.right) / 2, (a.top + a.bottom) / 2);
			if (l(b, g, c, f))
				return "top";
			else if (l(b, g, c, e))
				return "left";
			else if (l(b, c, f, d))
				return "right";
			else if (l(b, e, c, d))
				return "bottom";
			return "top"
		}
		return ""
	}
	function r(b, a) {
		if (a.top < b.y && a.top + a.height > b.y)
			if ((a.top + a.bottom) / 2 > b.y)
				return "top";
			else
				return "bottom";
		else
			return ""
	}
	function s() {
		var a = "afterEnd";
		if (this.active.quadrant == "top")
			a = "beforeBegin";
		return {
			target : this.active.region.source,
			targetString : a
		}
	}
	function C(f) {
		var c = "afterEnd";
		if (k.quadrant == "top")
			c = "beforeBegin";
		var b = this.Regions, g = b.length, a = this.active.region.index, e = this.active.region.source;
		if (this.active.quadrant == "left")
			c = "beforeBegin";
		else if (this.active.quadrant == "right")
			c = "afterEnd";
		else if (e.className == "left")
			if (this.active.quadrant == "bottom" && a + 1 < g) {
				var d = this.FindRegionFromElement(f);
				if (b[a + 1].source.className == "right" && d != null
						&& d.source == b[a + 1].source && a + 2 < g
						&& b[a + 2].source.className == "left")
					e = b[a + 2].source;
				else if (b[a + 1].source.className == "right"
						&& (!d || d && d.index > a))
					e = b[a + 1].source;
				c = "afterEnd"
			} else if (this.active.quadrant == "top") {
				var d = this.FindRegionFromElement(f);
				if (d && d.index < a)
					c = "afterEnd"
			} else
				c = "beforeBegin";
		if (e.className == "right")
			if (this.active.quadrant == "top" && a - 1 >= 0) {
				var d = this.FindRegionFromElement(f);
				if (d && d.index < a)
					c = "afterEnd";
				else if (b[a - 1].source.className == "right")
					e = b[a - 1].source;
				else if (b[a - 1].source == f)
					c = "afterEnd"
			} else if (this.active.quadrant == "bottom" && a + 1 < g)
				if (b[a + 1].source.className == "left") {
					e = b[a + 1].source;
					c = "afterEnd";
					var d = this.FindRegionFromElement(f);
					if (a + 2 < g && d && d.index <= a + 1
							&& b[a + 2].source.className == "right")
						e = b[a + 2].source
				} else if (b[a + 1].source == f && a + 2 < g
						&& b[a + 2].source.className == "right") {
					e = b[a + 2].source;
					c = "afterEnd"
				}
		return {
			target : e,
			targetString : c
		}
	}
	function q(b, c, a) {
		this.source = b;
		this.bounds = p(b);
		this.type = c;
		if (a != null)
			this.GetQuadrant = a;
		return this
	}
	q.prototype.GetQuadrant = r;
	function g(a) {
		this.Regions = [];
		this.active = null;
		if (a != null)
			this.GetDropInfo = a;
		return this
	}
	g.prototype.GetDropInfo = s;
	g.prototype.FindRegionFromElement = function(b) {
		for (var a = 0; a < this.Regions.length; a++)
			if (this.Regions[a].source == b)
				return this.Regions[a];
		return null
	};
	g.prototype.FindRegion = function(d) {
		if (this.Regions.length > 0) {
			var a = this.Regions[0], b = a.bounds, f = false, c;
			if (d.y < b.top) {
				this.active = {
					region : a,
					quadrant : "top"
				};
				return this.active
			}
			for (var e = 0; e < this.Regions.length; e++) {
				a = this.Regions[e];
				b = a.bounds;
				c = a.GetQuadrant(d, b);
				if (f && c == "")
					c = "top";
				if (c != "") {
					this.active = {
						region : a,
						quadrant : c
					};
					return this.active;
					break
				}
				f = b.top < d.y && b.top + b.height > d.y
			}
			this.active = {
				region : this.Regions[this.Regions.length - 1],
				quadrant : "bottom"
			};
			return this.active
		}
		this.active = null;
		return this.active
	};
	g.prototype.AddRegion = function(a) {
		for (var c = 0; c < this.Regions.length; c++) {
			var b = this.Regions[c];
			if (b.bounds.top == a.bounds.top) {
				b.bounds.bottom = a.bounds.bottom = Math.max(b.bounds.bottom,
						a.bounds.bottom);
				b.bounds.height = a.bounds.height = Math.max(b.bounds.height,
						a.bounds.height);
				break
			}
		}
		a.index = this.Regions.length;
		this.Regions[this.Regions.length] = a
	}
};
Spaces.LayoutManager.PartDragDrop.registerClass(
		"Spaces.LayoutManager.PartDragDrop", "$Binding");
Spaces.LayoutManager.PartDragDrop.Params = new $Enum("sc");
$Network.registerFpp("CustomizationService", function() {
	var c = $Network.FppProxy, a = c.__string, e = c.__primitive, h = c.__array, i = c.__custom, d = c.__enum, j = c.__date, f = c.__object, g = c.__oArray, b = new $Network.FppProxy("CustomizationService");
	b.rfc("PartPreference", [a("Name"), a("Value")]);
	b.FppStatus = new $Flags("SUCCESS", 0, "ERR_HTTP_MISCONFIGURATION", -7,
			"ERR_HTTP_PARSE_FAILURE", -6, "ERR_HTTP_CONNECT_FAILURE", -5,
			"ERR_HTTP_TIMEOUT", -4, "ERR_SERVER_UNCAUGHT", -3,
			"ERR_APP_SPECIFIC", -2, "ERR_FPP_PROTOCOL", -1);
	b.rfc("FppError", [a("ErrorCode"), a("Message"), f("ErrorObj"),
					a("StackTrace")]);
	b.rfc("FppReturnPackage", [d("Status"), f("Value"), g("OutRefParams"),
					i(b.FppError, "Error"), f("ProfilingInfo")]);
	b.FppCommandType = new $Flags("FPP", 0, "FPP_JSON", 1, "FPP_RP", 2,
			"FPP_RP_JSON", 3);
	b.FppVersion = new $Flags("BASE", 0, "ONE", 1, "TWO", 2, "CURRENT", 2);
	b.rfc("FppProxySettings", [d("Version"), d("CommandType"), a("PartnerId"),
					a("SessionId"), a("AuthUser"), a("ServerTunnelingUrl"),
					e("UseClientXmlProxy"), a("CanaryToken"),
					e("DefaultRetry"), e("Notify"), d("DateType")]);
	b.FppDateType = new $Flags("Local", 0, "UTC", 1);
	b.rfm("savePreferences", [a("pageUrl"), a("partId"), h("prefs")],
			"savePreferences", $Network.Type.XMLPost, null,
			"Microsoft.Spaces.WebUser.FireAnt.CustomizationService");
	b.seal();
	return b
});
registerNamespace("Spaces.TnT");
Spaces.TnT.DataType = new $Enum("Text", "Font", "Style", "Size", "Align",
		"Color");
Spaces.TnT.Type = {};
var __Spaces_TnT_Type = Spaces.TnT.Type;
Spaces.TnT.Type.Font = new $Flags("Tahoma", 0, "Arial", 1, "ArialBlack", 2,
		"Verdana", 3, "TimesNewRoman", 4, "LucidaHandWriting", 5, "CourierNew",
		6, "Segoe", 7, "Font8", 8, "Default", 9);
Spaces.TnT.Type.Style = new $Flags("Bold", 1, "Italic", 2, "Underline", 4);
Spaces.TnT.Type.Alignment = new $Flags("Left", 0, "Center", 1, "Right", 2);
Spaces.TnT.Type.Size = new $Flags("Smallest", 0, "ExtraSmall", 1, "Small", 2,
		"Normal", 3, "Large", 4, "ExtraLarge", 5, "Largest", 6, "Default", 7,
		"Medium", 8);
registerNamespace("Spaces.TnT");
Spaces.TnT.getFullColor = function(a, b) {
	if (a == "#" || a == "" || a == null)
		return Spaces.TnT.PreviewGroup.EmptyColor;
	if (a.charAt(0) == "#")
		a = a.substring(1, a.length);
	a = Spaces.TnT.PreviewGroup.ColorDefault.substring(0, 6 - a.length) + a;
	return b ? a : "#" + a
};
Spaces.TnT.getFontSize = function(a, c) {
	var b = Spaces.TnT.SettingGroupBase.Groups;
	switch (c) {
		case b.Title :
			if (a == __Spaces_TnT_Type.Size.Normal)
				return Spaces.TnT.PreviewGroup.SizeMap[__Spaces_TnT_Type.Size.Default]
	}
	return Spaces.TnT.PreviewGroup.SizeMap[a]
};
Spaces.TnT.applyStyle = function(b, a, f, e) {
	if (null == b)
		return;
	var c = Spaces.TnT.Type.Style;
	b.style.fontFamily = Spaces.TnT.PreviewGroup.FontMap[a.font];
	b.style.fontSize = Spaces.TnT.getFontSize(a.size, e);
	var d = Spaces.TnT.PreviewGroup.AlignMap[a.align];
	if (Spaces.IsRTL())
		if (d.toLowerCase() == "left")
			d = "right";
		else if (d.toLowerCase() == "right")
			d = "left";
	b.style.textAlign = d;
	b.style.fontWeight = (a.style & c.Bold) == c.Bold ? "bold" : "normal";
	b.style.fontStyle = (a.style & c.Italic) == c.Italic ? "italic" : "normal";
	b.style.textDecoration = (a.style & c.Underline) == c.Underline
			? "underline"
			: "none";
	b.style.verticalAlign = "baseline";
	if (f)
		b.innerHTML = a.text ? a.text.encodeHtml() : " ";
	b.style.color = a.color.charAt(0) == "z" ? "" : a.color
};
Spaces.TnT.getNotification = function(a) {
	if ("string" == typeof a)
		a = document.getElementById(a);
	var b = null;
	if (a) {
		var e = 0;
		if (a.webBindings)
			e = a.webBindings.length;
		for (var c = 0; c < e; c++) {
			var d = a.webBindings[c];
			if (Object.compare("Spaces.Controls.NotificationBar", d)) {
				b = d;
				break
			}
		}
		if (!b)
			b = $Spaces.attachElementBindingSync(a,
					"Spaces.Controls.NotificationBar", null, {})
	}
	return b
};
Spaces.TnT.showWarning = function(c, a) {
	var b = Spaces.TnT.getNotification(c);
	if (!a)
		a = "";
	b.show(Spaces.Controls.NotificationBar.Importance.Med, false, a
					.encodeHtml())
};
Spaces.TnT.hideWarning = function(b) {
	var a = Spaces.TnT.getNotification(b);
	a.hide()
};
registerNamespace("Spaces.TnT");
Spaces.TnT.Locale = new function() {
	var a = __Spaces_TnT_Type;
	this.Font = ["L_RTEFONTDEFAULT_TEXT", a.Font.Default,
			"L_RTEFONTTAHOMA_TEXT", a.Font.Tahoma, "L_RTEFONTARIAL_TEXT",
			a.Font.Arial, "L_RTEFONTARIALBLACK_TEXT", a.Font.ArialBlack,
			"L_RTEFONTVERDANA_TEXT", a.Font.Verdana,
			"L_RTEFONTTIMESNEWROMAN_TEXT", a.Font.TimesNewRoman,
			"L_RTELUCIDAHAND_TEXT", a.Font.LucidaHandWriting,
			"L_RTEFONTCOURIERNEW_TEXT", a.Font.CourierNew,
			"L_RTEFONTSEGOE_TEXT", a.Font.Segoe, "L_RTEFONTENTRY1_TEXT",
			a.Font.Font8];
	this.Style = ["spacesettings.bold", a.Style.Bold, "spacesettings.italic",
			a.Style.Italic, "spacesettings.underline", a.Style.Underline];
	this.TitleSize = ["L_RTEFSDEFAULT_TEXT", a.Size.Default,
			"L_RTEFSSMALLEST_TEXT", a.Size.Smallest, "L_RTEFSXSMALL_TEXT",
			a.Size.ExtraSmall, "L_RTEFSSMALL_TEXT", a.Size.Small,
			"L_RTEFSMEDIUM_TEXT", a.Size.Medium, "L_RTEFSLARGE_TEXT",
			a.Size.Large, "L_RTEFSXLARGE_TEXT", a.Size.ExtraLarge,
			"L_RTEFSLARGEST_TEXT", a.Size.Largest];
	this.TaglineSize = ["L_RTEFSDEFAULT_TEXT", a.Size.Default,
			"L_RTEFSSMALLEST_TEXT", a.Size.Smallest, "L_RTEFSXSMALL_TEXT",
			a.Size.ExtraSmall, "L_RTEFSSMALL_TEXT", a.Size.Small,
			"L_RTEFSMEDIUM_TEXT", a.Size.Normal, "L_RTEFSLARGE_TEXT",
			a.Size.Large, "L_RTEFSXLARGE_TEXT", a.Size.ExtraLarge,
			"L_RTEFSLARGEST_TEXT", a.Size.Largest];
	if (!Spaces.IsRTL())
		this.Align = ["spacessettings.columnnameleft", a.Alignment.Left,
				"spacessettings.columnnamecenter", a.Alignment.Center,
				"spacessettings.columnnameright", a.Alignment.Right];
	else
		this.Align = ["spacessettings.columnnameright", a.Alignment.Left,
				"spacessettings.columnnamecenter", a.Alignment.Center,
				"spacessettings.columnnameleft", a.Alignment.Right]
};
registerNamespace("Spaces.TnT");
Spaces.TnT.CustomData = function() {
	function e(a, c, b) {
		if (null == a || "undefined" == typeof a)
			a = "";
		if (c)
			a = a.trim();
		if ("" == a && b)
			a = b;
		return a
	}
	function f(a) {
		return "undefined" == typeof a || null == a || "" == a
	}
	function d(a, c) {
		for (var b in a)
			if (typeof b != "function" && a[b] == c)
				return a[b];
		return null
	}
	var a = Spaces.TnT.Type;
	function b(j, o, m, n, g, l, f) {
		this.text = e(o);
		this.font = e(m);
		this.size = e(n);
		this.style = !g ? 0 : g;
		this.color = e(l);
		this.align = !f ? 0 : f;
		var h = this;
		function c(b) {
			return (a.Style[b] & h.style) == a.Style[b] ? 1 : 0
		}
		function i() {
			return Spaces.TnT.getFullColor(h.color, true)
		}
		function k(f) {
			var e = 0, d = ["Bold", "Italic", "Underline"], b = 0;
			for (var c = 0; c < d.length; c++) {
				b = a.Style[d[c]];
				if ((f & b) == b)
					e |= b
			}
			return e
		}
		this.isBold = function() {
			return c("Bold") ? true : false
		};
		this.isItalic = function() {
			return c("Italic") ? true : false
		};
		this.isUnderlined = function() {
			return c("Underline") ? true : false
		};
		this.serialize = function() {
			return b.Pattern.format(this.font, this.size, c("Bold"),
					c("Italic"), c("Underline"), i(), this.align)
		};
		this.deserialize = function(b) {
			this.font = d(a.Font, parseInt(b.charAt(0)));
			if (this.font == null)
				this.font = a.Font.Tahoma;
			this.size = d(a.Size, parseInt(b.charAt(1)));
			if (this.size == null)
				this.size = j;
			this.style = k(parseInt(b.charAt(2)) | parseInt(b.charAt(3)) * 2
					| parseInt(b.charAt(4)) * 4);
			this.color = b.charAt(5) != "z" ? "#" + b.substr(5, 6) : "";
			this.align = d(a.Alignment, parseInt(b.charAt(11)));
			if (this.align == null)
				this.align = a.Alignment.Left
		};
		this.toString = function() {
			return "Text: {0}\nFont: {1}\nSize: {2}\nStyle: {3}\n Color: {4}\nAlign: {5}"
					.format(this.text, a.Font.toString(this.font), a.Size
									.toString(this.size), a.Style
									.toString(this.style), this.color,
							a.Alignment.toString(this.align))
		}
	}
	b.Length = 12;
	b.Pattern = "{0}{1}{2}{3}{4}{5}{6}";
	var c = function(g, h) {
		var e = new b(a.Size.Default), d = new b(a.Size.Default);
		this.getTitlePackage = function() {
			return e
		};
		this.getTaglinePackage = function() {
			return d
		};
		this._setTitlePackage = function(a) {
			e = a
		};
		this._setTaglinePackage = function(a) {
			d = a
		};
		this.serialize = function() {
			return "{0}|{1}".format(e.serialize(), d.serialize())
		};
		this.deserialize = function(a) {
			if (f(a))
				a = c.Default;
			var b = a.split("|");
			e.deserialize(b[0]);
			d.deserialize(b[1])
		};
		this.toString = function() {
			return;
			"Title:\n----------------------------------\n{0}\n\nTagline:\n----------------------------------\n{1}"
					.format(e.toString(), d.toString())
		};
		if (!h)
			this.deserialize(g)
	};
	c.Default = "97100zzzzzz0|97000zzzzzz0";
	c.Length = b.Length * 2 + 1;
	c.make = function(d, e) {
		var h = new b(a.Size.Default, d.text, d.font, d.size, d.style, d.color,
				d.align), g = new b(a.Size.Default, e.text, e.font, e.size,
				e.style, e.color, e.align), f = new c(null, true);
		f._setTitlePackage(h);
		f._setTaglinePackage(g);
		return f
	};
	c.DefaultPackage = function(g, h) {
		var e = new b(a.Size.Default), d = new b(a.Size.Default), f = c.Default
				.split("|");
		e.deserialize(f[0]);
		d.deserialize(f[1]);
		e.text = g;
		d.text = h;
		return c.make(e, d)
	};
	return c
}();
registerNamespace("Spaces.TnT");
Spaces.TnT.SettingSection = function(g, c) {
	var d = Spaces.TnT.SettingSection;
	d.initializeBase(this, arguments);
	var b = null, i = this, f = null, e = null, a = null;
	this.dispose = function() {
		b.dispose();
		if (null != a)
			a.dispose();
		a = null;
		f = null;
		e = null;
		d.callBaseMethod(this, "dispose", arguments)
	};
	this.initialize = function() {
		d.callBaseMethod(this, "initialize", arguments);
		a = new $Memory.Groups;
		f = a.create().Nodes.create("div", null, {
					paddingBottom : "3px"
				}, g);
		var h = a.create().Nodes.create("h4", null, null, f);
		h.innerHTML = "&nbsp;&nbsp;" + c.title;
		h.style.fontWeight = "Bold";
		e = a.create().Nodes.create("div", {
					className : "tnt_group_pane"
				}, null, g);
		b = Spaces.TnT.SettingGroupBase.createGroup(c.group_type, c.data, c);
		e.appendChild(b.getContainer());
		b.doDDX(true)
	};
	this.getGroupInstance = function() {
		return b
	};
	this.revert = function(a) {
		b.revert(a)
	}
};
Spaces.TnT.SettingSection
		.registerClass("Spaces.TnT.SettingSection", "$Binding");
Spaces.TnT.SettingSection.Params = new $Enum("group_type");
Spaces.TnT.SettingGroupBase = function() {
	this.getContainer = function() {
		throw "Abstract base method should be implemented";
	};
	Spaces.TnT.SettingGroupBase.registerBaseMethod(this, "getContainer");
	this.dispose = function() {
		throw "Abstract base method should be implemented";
	};
	Spaces.TnT.SettingGroupBase.registerBaseMethod(this, "dispose");
	this.doDDX = function() {
		throw "Abstract base method should be implemented";
	};
	Spaces.TnT.SettingGroupBase.registerBaseMethod(this, "doDDX")
};
Spaces.TnT.SettingGroupBase.Groups = new $Enum("Title", "Tagline", "Preview");
Spaces.TnT.SettingGroupBase.createGroup = function(c, b, a) {
	switch (c) {
		case Spaces.TnT.SettingGroupBase.Groups.Title :
		case Spaces.TnT.SettingGroupBase.Groups.Tagline :
			return new Spaces.TnT.TitleTaglineSettingGroup(b, a);
		case Spaces.TnT.SettingGroupBase.Groups.Preview :
			return new Spaces.TnT.PreviewGroup(b, a)
	}
};
registerNamespace("Spaces.TnT");
Spaces.TnT.TitleTaglineSettingGroup = function(g, c) {
	var m = Spaces.TnT.SettingGroupBase.Groups;
	Spaces.TnT.TitleTaglineSettingGroup.initializeBase(this, arguments);
	var j = [{
		title : GetString("live.sndefaultstrings.strings.customtheme.pickerdarkred"),
		color : "C00000"
	}, {
		title : GetString("live.sndefaultstrings.strings.customtheme.pickerred"),
		color : "FF0000"
	}, {
		title : GetString("live.sndefaultstrings.strings.customtheme.pickerorange"),
		color : "FFC000"
	}, {
		title : GetString("live.sndefaultstrings.strings.customtheme.pickeryellow"),
		color : "FFFF00"
	}, {
		title : GetString("live.sndefaultstrings.strings.customtheme.pickerlightgreen"),
		color : "92D050"
	}, {
		title : GetString("live.sndefaultstrings.strings.customtheme.pickergreen"),
		color : "00B050"
	}, {
		title : GetString("live.sndefaultstrings.strings.customtheme.pickerlightblue"),
		color : "00B0F0"
	}, {
		title : GetString("live.sndefaultstrings.strings.customtheme.pickerblue"),
		color : "0070C0"
	}, {
		title : GetString("live.sndefaultstrings.strings.customtheme.pickerdarkblue"),
		color : "002060"
	}, {
		title : GetString("live.sndefaultstrings.strings.customtheme.pickerpurple"),
		color : "7030A0"
	}], h = null, d = null, b = null, B = null, e = null, C = null, f = this, n = null, k = null, l = null, r = "text", p = "font", q = "size", v = "align", i = "color", w = "bold", u = "italic", t = "underline", a = {}, S = Spaces.TnT.PreviewGroup.ColorDefault;
	this.onchange = new $Event;
	this._disposeColorPicker = function() {
		if (e) {
			if (e.IsVisible())
				e.hide();
			e.dispose();
			e = null;
			d.create("colorpicker").Events.dispose()
		}
	};
	this.dispose = function() {
		f._disposeColorPicker();
		if (d) {
			d.dispose();
			h = null;
			B = null;
			for (var b in a)
				a[b] = null;
			d = null;
			m = null;
			C = null;
			a = null;
			n = null;
			k = null;
			l = null
		}
		f = null
	};
	function y(b, c) {
		for (var a = 0; a < b.length; a++)
			if (b[a] && b[a].value == c)
				return a;
		return 0
	}
	function o(a) {
		return a.options[a.selectedIndex].value
	}
	this.validate = function() {
		var b = Q(a[i].value) && R(a[r].value);
		return b
	};
	function Q(a) {
		var b = true;
		if (a != "" && a != "#") {
			a = Spaces.TnT.getFullColor(a);
			b = a != null
					&& a.match(Spaces.TnT.PreviewGroup.ColorPattern) != null
		}
		if (b)
			Spaces.TnT.hideWarning(k);
		else
			Spaces.TnT
					.showWarning(
							k,
							GetString("live.sndefaultstrings.strings.customtheme.errorbadhex"));
		return b
	}
	function R(b) {
		if (c.group_type == m.Title) {
			var a = !(b.trim().encodeHtml() == "");
			if (a)
				Spaces.TnT.hideWarning(l);
			else
				Spaces.TnT
						.showWarning(
								l,
								GetString("live.sndefaultstrings.strings.spacesettings.titlerequiredpopup"));
			return a
		} else
			return true
	}
	function A() {
		var d = 0, c = [w, u, t];
		for (var b = 0; b < c.length; b++)
			if (a[c[b]].checked)
				d |= a[c[b]].value;
		return d
	}
	this.revert = function(a) {
		g = a;
		if (!$Browser.isIE()) {
			Spaces.TnT.hideWarning(k);
			Spaces.TnT.hideWarning(l)
		}
		this.doDDX(true)
	};
	function M(j, i, g, k, f, e, h) {
		var d = b.Nodes.create("input", {
					type : j,
					dataType : f,
					id : c.group_type + f
				}, {
					width : i
				}, g);
		if (e)
			d.maxLength = e;
		h.htmlFor = d.id;
		x(d, z);
		a[k] = d;
		return d
	}
	function J(f, j, h, l, g, i) {
		var d = b.Nodes.create("select", {
					dataType : g,
					id : c.group_type + g
				}, null, h);
		d.style.width = j;
		i.htmlFor = d.id;
		var k = f.length;
		for (var e = 0; e < k; e += 2)
			d.options.add(new Option(GetString("live.sndefaultstrings.strings."
							+ f[e]), f[e + 1]));
		a[l] = d;
		E(d, O);
		return d
	}
	function K(d, k, m, j, i, h) {
		var c = d.insertRow(d.rows.length), a = c.insertCell(c.cells.length);
		a.style.width = "34%";
		a.vAlign = "top";
		var f = b.Nodes.create("label", null, null, a);
		f.innerHTML = k;
		a = c.insertCell(c.cells.length);
		M("text", m, a, j, i, h, f);
		var g = d.insertRow(d.rows.length), e = l = g.insertCell(0);
		e.colSpan = 2;
		l = b.Nodes.create("div", null, {
					display : "none"
				}, e);
		return c
	}
	function s(e, h, i, j, g, f) {
		var a = e.insertRow(e.rows.length), c = a.insertCell(a.cells.length);
		c.style.width = "34%";
		var d = b.Nodes.create("label", null, null, c);
		d.innerHTML = h;
		c = a.insertCell(a.cells.length);
		J(i, j, c, g, f, d);
		return a
	}
	function P(l, p) {
		var e = l.insertRow(l.rows.length), h = e.insertCell(e.cells.length);
		h.style.width = "34%";
		var o = b.Nodes.create("label", null, null, h);
		o.innerHTML = p;
		h = e.insertCell(e.cells.length);
		var k = b.Nodes.create("div", null, null, h), j = Spaces.TnT.Locale.Style, m = new $StringBuilder, i = [
				w, u, t], n = [g.isBold() ? "checked" : "",
				g.isItalic() ? "checked" : "",
				g.isUnderlined() ? "checked" : ""];
		for (var d = 0; d < i.length; d++)
			m
					.append('<nobr><input type="checkbox" id="{0}" {2}/><label for="{0}">{1}</label></nobr>'
							.format(c.group_type + i[d],
									GetString("live.sndefaultstrings.strings."
											+ j[2 * d]), n[d]));
		k.innerHTML = m.toString();
		var f = k.getElementsByTagName("input");
		for (var d = 0; d < f.length; d++) {
			f[d].value = j[d * 2 + 1];
			a[i[d]] = f[d];
			f[d].dataType = Spaces.TnT.DataType.Style;
			D(f[d], N)
		}
		return e
	}
	function I(l, w, y, h, q) {
		var g = l.insertRow(l.rows.length), f = g.insertCell(g.cells.length);
		f.style.width = "34%";
		f.vAlign = "top";
		var v = b.Nodes.create("label", null, null, f);
		v.innerHTML = w;
		f = g.insertCell(g.cells.length);
		var u = b.Nodes.create("div", null, {
					height : "23px"
				}, f);
		for (var e = 0; e < j.length; e++) {
			var t = b.Nodes.create("a", {
						id : c.group_type + h + "_" + j[e].color,
						href : "#",
						title : j[e].title,
						alt : j[e].title,
						eventTarget : c.group_type + h,
						eventValue : "#" + j[e].color,
						className : "swatch"
					}, {
						backgroundColor : "#" + j[e].color,
						fontSize : "8.7pt",
						marginBottom : "5px"
					}, u);
			b.Events.register(t, {
						onclick : L
					})
		}
		var o = b.Nodes.create("div", null, null, f), p = b.Nodes.create(
				"label", null, {
					display : "none"
				}, o);
		p.htmlFor = c.group_type + h;
		p.innerHTML = GetString("live.sndefaultstrings.strings.spacesettings.colorlabel")
				.encodeHtml();
		var m = b.Nodes.create("input", {
					type : "text",
					dataType : h,
					id : c.group_type + h
				}, {
					width : y
				}, o);
		if (q)
			m.maxLength = q;
		a[i] = m;
		x(m, z);
		n = b.Nodes.create("a", {
					id : c.group_type + "_pickerAnchor",
					href : "#",
					tabIndex : "0"
				}, {
					verticalAlign : "bottom",
					position : "relative",
					top : "-1px"
				}, o);
		C = b.Nodes.create("img", {
			src : c.cp_icon,
			border : "0",
			alt : GetString("live.sndefaultstrings.strings.customtheme.colorpicker")
		}, null, n);
		H();
		B = n;
		d.create("colorpicker").Events.register(n, {
					onclick : F
				});
		var s = l.insertRow(l.rows.length), r = s.insertCell(s.cells.length);
		r.colSpan = g.cells.length;
		k = b.Nodes.create("div", null, {
					display : "none"
				}, r);
		k.innerText = GetString("live.sndefaultstrings.strings.customtheme.errorbadhex");
		return g
	}
	this._tryHideColorPicker = function() {
		if (e && e.IsVisible())
			e.hide()
	};
	function L() {
		event.returnValue = false;
		var a;
		if (event.srcElement.tagName.toLowerCase() == "a")
			a = event.srcElement;
		else
			a = event.srcElement.parentNode;
		var b = document.getElementById(a.eventTarget);
		b.value = a.eventValue;
		f.onchange.fire({
					group : f,
					dataType : b.dataType,
					value : b.value
				});
		return false
	}
	this.isColorPickerVisible = function() {
		if (e && e.IsVisible())
			return true;
		else
			return false
	};
	function F() {
		event.returnValue = false;
		event.cancelBubble = true;
		var b = Spaces.TnT.PopupMgr._instance.getCustomDialog();
		if (f.isColorPickerVisible()) {
			e.hide();
			b._registerHandlers(false);
			return false
		}
		if (b.isColorPickerVisible(c.group_type)) {
			b.hideOtherColorPicker(c.group_type);
			b._registerHandlers(false)
		}
		var g;
		if (event.srcElement.tagName.toLowerCase() == "a")
			g = event.srcElement;
		else
			g = event.srcElement.parentNode;
		var d = a[i].value;
		if (d == null)
			d = "#000000";
		b._registerHandlers(true);
		e.show(g, G, d, null);
		return false
	}
	function G(b) {
		Spaces.TnT.PopupMgr._instance.getCustomDialog()
				._registerHandlers(false);
		if (b != null) {
			a[i].value = b;
			f.onchange.fire({
						group : f,
						dataType : a[i].dataType,
						value : b
					})
		}
	}
	function z() {
		var a = event.srcElement;
		f.onchange.fire({
					group : f,
					dataType : a.dataType,
					value : a.value
				})
	}
	function O() {
		var a = event.srcElement;
		f.onchange.fire({
					group : f,
					dataType : a.dataType,
					value : o(a)
				})
	}
	function N() {
		var a = event.srcElement;
		f.onchange.fire({
					group : f,
					dataType : a.dataType,
					value : A()
				})
	}
	function x(b, a) {
		if ($Browser.isIE()) {
			d.create(null).Events.register(b, {
						onpropertychange : a
					});
			d.create(null).Events.register(b, {
						onkeyup : a
					});
			d.create(null).Events.register(b, {
						onchange : a
					})
		} else {
			d.create(null).Events.register(b, {
						onkeyup : a
					});
			d.create(null).Events.register(b, {
						onchange : a
					})
		}
	}
	function E(b, a) {
		d.create(null).Events.register(b, {
					onchange : a
				})
	}
	function D(b, a) {
		d.create(null).Events.register(b, {
					onclick : a
				})
	}
	function H() {
		var a = {};
		a.max_row_size = 18;
		e = new Spaces.Customize.ColorPicker(a)
	}
	this.getContainer = function() {
		if (null == h) {
			d = new $Memory.Groups;
			b = d.create(null);
			h = b.Nodes.create("table", {
						width : "100%",
						border : "0",
						cellpadding : "0",
						cellspacing : "0"
					});
			h.className = "fixedTable";
			var a = c.group_type == m.Title
					? c.max_title_length
					: c.max_tagline_length, f = c.group_type == m.Title
					? GetString("live.sndefaultstrings.strings.spacesettings.text")
					: GetString("live.sndefaultstrings.strings.customtheme.textcolor")
							.encodeHtml();
			K(h, f, "230px", r, Spaces.TnT.DataType.Text, a);
			s(h, GetString("live.sndefaultstrings.strings.spacesettings.font"),
					Spaces.TnT.Locale.Font, "200px", p,
					Spaces.TnT.DataType.Font);
			var e = c.group_type == m.Title
					? Spaces.TnT.Locale.TitleSize
					: Spaces.TnT.Locale.TaglineSize;
			s(h, GetString("live.sndefaultstrings.strings.spacesettings.size"),
					e, "200px", q, Spaces.TnT.DataType.Size);
			P(
					h,
					GetString("live.sndefaultstrings.strings.spacesettings.style"),
					"100%");
			I(
					h,
					GetString("live.sndefaultstrings.strings.spacesettings.color"),
					"80px", Spaces.TnT.DataType.Color, 7);
			s(
					h,
					GetString("live.sndefaultstrings.strings.spacesettings.alignment"),
					Spaces.TnT.Locale.Align, "200px", v,
					Spaces.TnT.DataType.Align)
		}
		return h
	};
	this.doDDX = function(e) {
		if (e) {
			a[r].value = g.text;
			var b = y(a[p], g.font);
			a[p].selectedIndex = b;
			var c = y(a[q], g.size);
			a[q].selectedIndex = c;
			a[i].value = g.color;
			a[v].selectedIndex = g.align;
			a[w].checked = g.isBold();
			a[u].checked = g.isItalic();
			a[t].checked = g.isUnderlined()
		} else {
			var d = {
				text : a[r].value,
				font : parseInt(o(a[p])),
				size : parseInt(o(a[q])),
				color : Spaces.TnT.getFullColor(a[i].value),
				align : parseInt(o(a[v])),
				style : parseInt(A())
			};
			return d
		}
	}
};
Spaces.TnT.TitleTaglineSettingGroup.registerClass(
		"Spaces.TnT.TitleTaglineSettingGroup", "Spaces.TnT.SettingGroupBase");
registerNamespace("Spaces.TnT");
Spaces.TnT.PreviewGroup = function(i) {
	var a = null, f = null, h = null, g = null, j = i.getTitlePackage(), e = i
			.getTaglinePackage(), b = Spaces.TnT.SettingGroupBase.Groups, c = Spaces.TnT.DataType, m = Spaces.TnT.PreviewGroup.FontMap, o = Spaces.TnT.PreviewGroup.SizeMap, l = Spaces.TnT.PreviewGroup.AlignMap, d = Spaces.TnT.Type.Style;
	this.setPackage = function(a) {
		i = a;
		j = i.getTitlePackage();
		e = i.getTaglinePackage()
	};
	this.getContainer = function() {
		if (null == f) {
			a = new $Memory.Groups;
			f = a.create().Nodes.create("div");
			var b = a.create().Nodes.create("div", {
						className : "ContainerBGColor PrimaryTextColor"
					}, {
						borderStyle : "solid",
						borderWidth : "1px",
						padding : "2px"
					}, f);
			h = a.create().Nodes.create("h1", null, null, b);
			g = a.create().Nodes.create("div", null, null, b);
			h.innerHTML = j.text.encodeHtml();
			g.innerHTML = e.text == null ? "" : e.text.encodeHtml()
		}
		return f
	};
	this.dispose = function() {
		if (null != a)
			a.dispose();
		a = null;
		h = null;
		g = null;
		f = null;
		j = null;
		e = null;
		b = c = m = o = l = d = null
	};
	this.doDDX = function(a) {
		if (!a)
			return false;
		n(h, j, b.Title);
		n(g, e, b.Tagline)
	};
	function n(c, b, a) {
		Spaces.TnT.applyStyle(c, b, true, a)
	}
	function k(j, a, i) {
		var e = i == b.Title ? h : g;
		switch (j) {
			case c.Text :
				e.innerHTML = a.encodeHtml();
				break;
			case c.Font :
				e.style.fontFamily = m[a];
				break;
			case c.Size :
				e.style.fontSize = Spaces.TnT.getFontSize(a, i);
				break;
			case c.Align :
				var f = l[a];
				if (Spaces.IsRTL())
					if (f.toLowerCase() == "left")
						f = "right";
					else if (f.toLowerCase() == "right")
						f = "left";
				e.style.textAlign = f;
				break;
			case c.Color :
				a = Spaces.TnT.getFullColor(a);
				e.style.color = a.charAt(0) == "z" ? "" : a;
				break;
			case c.Style :
				e.style.fontWeight = (a & d.Bold) == d.Bold ? "bold" : "normal";
				e.style.fontStyle = (a & d.Italic) == d.Italic
						? "italic"
						: "normal";
				e.style.textDecoration = (a & d.Underline) == d.Underline
						? "underline"
						: "none"
		}
	}
	this.update = function(c, d, a) {
		if (b == null)
			return;
		switch (a) {
			case b.Title :
				k(c, d, a);
				break;
			case b.Tagline :
				k(c, d, a)
		}
	}
};
Spaces.TnT.PreviewGroup.ColorDefault = "000000";
Spaces.TnT.PreviewGroup.EmptyColor = "zzzzzz";
Spaces.TnT.PreviewGroup.ColorPattern = /^#[0-9a-fA-F]{6}$/;
Spaces.TnT.PreviewGroup.FontMap = new function() {
	this[__Spaces_TnT_Type.Font.Tahoma] = GetString("live.sndefaultstrings.strings.L_RTEFONTTAHOMADEF_TEXT");
	this[__Spaces_TnT_Type.Font.Arial] = GetString("live.sndefaultstrings.strings.L_RTEFONTARIALDEF_TEXT");
	this[__Spaces_TnT_Type.Font.ArialBlack] = GetString("live.sndefaultstrings.strings.L_RTEFONTARIALBLACKDEF_TEXT");
	this[__Spaces_TnT_Type.Font.Verdana] = GetString("live.sndefaultstrings.strings.L_RTEFONTVERDANADEF_TEXT");
	this[__Spaces_TnT_Type.Font.TimesNewRoman] = GetString("live.sndefaultstrings.strings.L_RTEFONTTIMESNEWROMANDEF_TEXT");
	this[__Spaces_TnT_Type.Font.LucidaHandWriting] = GetString("live.sndefaultstrings.strings.L_RTELUCIDAHANDDEF_TEXT");
	this[__Spaces_TnT_Type.Font.CourierNew] = GetString("live.sndefaultstrings.strings.L_RTEFONTCOURIERNEWDEF_TEXT");
	this[__Spaces_TnT_Type.Font.Segoe] = GetString("live.sndefaultstrings.strings.L_RTEFONTSEGOEDEF_TEXT");
	this[__Spaces_TnT_Type.Font.Font8] = GetString("live.sndefaultstrings.strings.L_RTEFONTENTRY1DEF_TEXT");
	this[__Spaces_TnT_Type.Font.Default] = ""
};
Spaces.TnT.PreviewGroup.SizeMap = new function() {
	this[__Spaces_TnT_Type.Size.Smallest] = "xx-small", this[__Spaces_TnT_Type.Size.ExtraSmall] = "x-small", this[__Spaces_TnT_Type.Size.Small] = "small", this[__Spaces_TnT_Type.Size.Normal] = "medium", this[__Spaces_TnT_Type.Size.Medium] = "medium", this[__Spaces_TnT_Type.Size.Large] = "large", this[__Spaces_TnT_Type.Size.ExtraLarge] = "x-large", this[__Spaces_TnT_Type.Size.Largest] = "xx-large", this[__Spaces_TnT_Type.Size.Default] = ""
};
Spaces.TnT.PreviewGroup.AlignMap = new function() {
	this[__Spaces_TnT_Type.Alignment.Left] = "left", this[__Spaces_TnT_Type.Alignment.Center] = "center", this[__Spaces_TnT_Type.Alignment.Right] = "right"
};
Spaces.TnT.PreviewGroup.registerClass("Spaces.TnT.PreviewGroup",
		"Spaces.TnT.SettingGroupBase");
registerNamespace("Spaces.TnT");
Spaces.TnT.CustomizeDialog = function(l, f) {
	var q = Spaces.TnT.CustomizeDialog, r = Spaces.TnT.DataType, h = null, d = null, e = null, k = this, c = null, b = null, g = null, i = null, j = null, a = new $UI.Popover;
	this.base_dispose = this.hide;
	function m(b) {
		var a = {};
		for (var c in b)
			a[c] = b[c];
		return a
	}
	this.getOwnerElement = function() {
		return l
	};
	this.getPreviewSection = function() {
		return g
	};
	this.getCustomData = function() {
		var d = c.getGroupInstance().doDDX(false), a = b.getGroupInstance()
				.doDDX(false), e = Spaces.TnT.CustomData.make(d, a);
		return e
	};
	this.validateAll = function() {
		var d = c.getGroupInstance().validate()
				&& b.getGroupInstance().validate();
		if (!d)
			a.disableButton(Spaces.TnT.CustomizeDialog.BUTTON_OK);
		return d
	};
	this.doModal = function(b) {
		if (!h) {
			h = new $Memory.Groups;
			d = h.create(null);
			i = new Spaces.TnT.CustomData(f.theme);
			i.getTitlePackage().text = f.title;
			i.getTaglinePackage().text = f.tagline;
			e = p()
		}
		try {
			a.show(b, l)
		} catch (c) {
		}
		e.parentElement.style.display = "block"
	};
	this.dispose = function() {
		k.disposeColorPicker();
		if (!h)
			return;
		h.dispose();
		if (c)
			c.dispose();
		if (b)
			b.dispose();
		if (g)
			g.dispose();
		if (a)
			a.hide();
		c = null;
		b = null;
		g = null;
		a = null;
		l = null;
		e = null;
		h = null;
		d = null;
		i = null;
		j = null;
		for (var m in f)
			f[m] = null
	};
	this._registerHandlers = function(a) {
		if (a)
			h.create("colorpicker").Events.register(k.body, {
						onclick : o
					});
		else
			h.create("colorpicker").Events.dispose()
	};
	this.disposeColorPicker = function() {
		k._registerHandlers(false);
		c.getGroupInstance()._disposeColorPicker();
		b.getGroupInstance()._disposeColorPicker()
	};
	function o() {
		k._registerHandlers(false);
		c.getGroupInstance()._tryHideColorPicker();
		b.getGroupInstance()._tryHideColorPicker()
	}
	this.isColorPickerVisible = function(a) {
		if (a == "Title")
			return b.getGroupInstance().isColorPickerVisible();
		else
			return c.getGroupInstance().isColorPickerVisible()
	};
	this.hideOtherColorPicker = function(a) {
		if (a == "Title")
			b.getGroupInstance()._tryHideColorPicker();
		else
			c.getGroupInstance()._tryHideColorPicker()
	};
	function n(d) {
		Spaces.TnT.hideWarning(j);
		var i = c.getGroupInstance(), f = b.getGroupInstance(), k = i
				.validate(), h = f.validate(), e;
		if (k && h) {
			a.enableButton(Spaces.TnT.CustomizeDialog.BUTTON_OK);
			e = true
		} else {
			a.disableButton(Spaces.TnT.CustomizeDialog.BUTTON_OK);
			e = false
		}
		if (k && h || Spaces.TnT.DataType.Text == d.dataType)
			if (d.group == i)
				g.getGroupInstance().update(d.dataType, d.value,
						Spaces.TnT.SettingGroupBase.Groups.Title);
			else if (d.group == f)
				g.getGroupInstance().update(d.dataType, d.value,
						Spaces.TnT.SettingGroupBase.Groups.Tagline);
		return e
	}
	this.enableButton = function(b) {
		a.enableButton(b)
	};
	this.disableButton = function(b) {
		a.disableButton(b)
	};
	function p() {
		a.shadow = true;
		a.modal = true;
		a.width = "416px";
		var h = null;
		a.header = GetString("live.sndefaultstrings.strings.spacesettings.customizeheading");
		k.body = a.body = e = d.Nodes.create("div", {
					className : "titletagline_settings",
					id : "idTntSettingsDiv"
				}, {
					width : "380px",
					overflow : "hidden"
				}, null);
		var u = d.Nodes.create("div", {
					className : "tnr_div_sep"
				}, null, e);
		h = m(f);
		h.group_type = Spaces.TnT.SettingGroupBase.Groups.Title;
		h.data = i.getTitlePackage();
		h.title = GetString("live.sndefaultstrings.strings.spacesettings.titlesetting");
		c = $Spaces.attachElementBindingSync(u, "Spaces.TnT.SettingSection",
				null, h, "tnt");
		c.getGroupInstance().onchange.attach(n);
		var s = d.Nodes.create("div", {
					className : "tnr_div_sep"
				}, null, e);
		h = m(f);
		h.group_type = Spaces.TnT.SettingGroupBase.Groups.Tagline;
		h.data = i.getTaglinePackage();
		h.title = GetString("live.sndefaultstrings.strings.spacesettings.taglinesetting");
		b = $Spaces.attachElementBindingSync(s, "Spaces.TnT.SettingSection",
				null, h, "tnt");
		b.getGroupInstance().onchange.attach(n);
		var r = d.Nodes.create("div", null, null, e);
		h = m(f);
		h.group_type = Spaces.TnT.SettingGroupBase.Groups.Preview;
		h.data = i;
		h.title = GetString("live.sndefaultstrings.strings.spacesettings.preview");
		g = $Spaces.attachElementBindingSync(r, "Spaces.TnT.SettingSection",
				null, h, "tnt");
		var h = Spaces.TnT.CustomData.DefaultPackage(f.title, f.tagline), o = d.Nodes
				.create("div", null, {
							paddingLeft : "15px",
							marginTop : "2px"
						}, e), l = d.Nodes.create("a", {
					href : "#"
				}, null, o);
		d.Events.register(l, {
					onclick : function() {
						c.revert(h.getTitlePackage());
						b.revert(h.getTaglinePackage());
						g.getGroupInstance().setPackage(h);
						g.getGroupInstance().doDDX(true);
						Spaces.TnT.hideWarning(j);
						event.returnValue = false;
						return false
					}
				});
		l.innerHTML = GetString("live.sndefaultstrings.strings.spacesettings.revert");
		var q = d.Nodes.create("div", null, {
					paddingLeft : "15px",
					marginTop : "2px"
				}, e);
		j = d.Nodes.create("div", null, {
					display : "none"
				}, q);
		var t = GetString("live.sndefaultstrings.strings.global.save"), p = GetString("live.sndefaultstrings.strings.global.cancel");
		a.addButton(Spaces.TnT.CustomizeDialog.BUTTON_OK, t, true, false);
		a.addButton(Spaces.TnT.CustomizeDialog.BUTTON_CANCEL, p, false, true);
		return e
	}
	this.showWarning = function(a) {
		Spaces.TnT.showWarning(j, a)
	};
	this.hideWarning = function() {
		Spaces.TnT.hideWarning(j)
	}
};
Spaces.TnT.CustomizeDialog.BUTTON_OK = "save";
Spaces.TnT.CustomizeDialog.BUTTON_CANCEL = "cancel";
registerNamespace("Spaces.TnT");
Spaces.TnT.PopupMgr = function(d, b) {
	var f = Spaces.TnT.PopupMgr;
	f.initializeBase(this, arguments);
	b = this.getParameters();
	var a = null, x = this, j = null, k = null, e = null, i, g, c;
	function u(b) {
		var a = {};
		for (var c in b)
			a[c] = b[c];
		return a
	}
	this.initialize = function() {
		f.callBaseMethod(this, "initialize", arguments);
		e = new $Memory.Groups;
		e.create(null).Events.register(d, {
					onclick : r
				});
		f._instance = this;
		i = document.getElementById("titletaglineNormal");
		g = document.getElementById("titletaglineDisabled");
		this.registerFor("Spaces.LayoutManager", o);
		if (b.displayonload == "true")
			window.setTimeout(m, 1)
	};
	this.dispose = function() {
		if (null != e)
			e.dispose();
		if (a) {
			a.dispose();
			a = null
		}
		d = null;
		f.callBaseMethod(this, "dispose", arguments);
		f = null;
		c = j = k = null
	};
	this.getCustomDialog = function() {
		return a
	};
	function s(d, e) {
		if (Spaces.TnT.CustomizeDialog.BUTTON_OK == e) {
			a.hideWarning();
			if (a.validateAll()) {
				if (!c)
					c = l(b.fppurl);
				d.disableButton(Spaces.TnT.CustomizeDialog.BUTTON_OK);
				d.disableButton(Spaces.TnT.CustomizeDialog.BUTTON_CANCEL);
				try {
					if (!Boolean.parse(b.in_layout))
						c.save_old_layout(n, null, h, b.ms_timeout);
					else
						n()
				} catch (f) {
					d.enableButton(Spaces.TnT.CustomizeDialog.BUTTON_OK);
					d.enableButton(Spaces.TnT.CustomizeDialog.BUTTON_CANCEL)
				}
			}
			return false
		} else {
			a.dispose();
			a = null;
			return true
		}
	}
	function n(d) {
		var d = a.getCustomData();
		if (!c)
			c = new l(b.fppurl);
		c.update_value(d.serialize(), d.getTitlePackage().text, d
						.getTaglinePackage().text, false, p, null, h,
				b.ms_timeout)
	}
	function t() {
		var c = a.getCustomData();
		Spaces.TnT.applyStyle(document.getElementById("spacetitle"), c
						.getTitlePackage(), true,
				Spaces.TnT.SettingGroupBase.Groups.Title);
		Spaces.TnT.applyStyle(document.getElementById("spacetagline"), c
						.getTaglinePackage(), true,
				Spaces.TnT.SettingGroupBase.Groups.Tagline);
		b.title = c.getTitlePackage().text;
		b.tagline = c.getTaglinePackage().text;
		b.theme = c.serialize();
		c = null;
		a.dispose();
		a = null;
		window.setTimeout(function() {
					window.location = b.authormodeurl
				}, 1)
	}
	function r() {
		m();
		event.returnValue = false;
		return false
	}
	function m() {
		a = new Spaces.TnT.CustomizeDialog(d, u(b));
		a.doModal(s)
	}
	function o(b, a) {
		if (a) {
			j = b;
			e.create(null).Events.register(j, {
						onpagedirty : q
					})
		}
	}
	function q() {
		if (!k) {
			k = true;
			d.parentElement.disabled = true;
			d.parentElement.innerText = d.innerText;
			if (i)
				i.style.display = "none";
			if (g)
				g.style.display = "block"
		}
	}
	function p(a) {
		switch (a) {
			case TnTService.ErrorCode.Success :
				t();
				break;
			default :
				h(a)
		}
	}
	function h(b) {
		if (b == TnTService.ErrorCode.ContainsProfanity)
			str = "live.sndefaultstrings.strings.spacesettings.profanity";
		else
			str = "live.sndefaultstrings.strings.spacesettings.exception";
		a.showWarning(GetString(str));
		a.enableButton(Spaces.TnT.CustomizeDialog.BUTTON_OK);
		a.enableButton(Spaces.TnT.CustomizeDialog.BUTTON_CANCEL)
	}
	function l(b) {
		var a = new TnTService.FppProxySettings;
		a.Version = TnTService.FppVersion.TWO;
		a.CanaryToken = C_CANARY_COOKIE_NAME;
		return TnTService.initializeEx(
				"http://" + window.location.hostname + b, a)
	}
};
Spaces.TnT.PopupMgr._instance = null;
Spaces.TnT.PopupMgr.registerClass("Spaces.TnT.PopupMgr", "$Binding");
Spaces.TnT.PopupMgr.Params = new $Enum("cp_icon", "title", "tagline", "theme",
		"max_title_length", "max_tagline_length", "fppurl", "ms_timeout",
		"authormodeurl", "displayonload");
$Network.registerFpp("TnTService", function() {
	var c = $Network.FppProxy, b = c.__string, e = c.__primitive, h = c.__array, i = c.__custom, d = c.__enum, j = c.__date, f = c.__object, g = c.__oArray, a = new $Network.FppProxy("TnTService");
	a.ErrorCode = new $Flags("Success", 0, "ContainsProfanity", 1,
			"StyleStringError", 2, "SchemaViolation", 3, "Unknown", 4);
	a.InviteReturnCodes = new $Flags("Success", 0, "GenericError", 1,
			"InputValidationError", 2, "QuotaExceeded", 3, "QuotaEmpty", 4,
			"ABCHError_CanRetry", 5, "ABCHError_NoRetry", 6);
	a.rfc("InviteReturnData", [d("Code"), b("Detail"), b("DisplayMessage")]);
	a.rfc("ServerEventData", [b("Category"), b("Message")]);
	a.rfc("ServerTracingObject", [h("m_serverTraceCollection")]);
	a.FppStatus = new $Flags("SUCCESS", 0, "ERR_HTTP_MISCONFIGURATION", -7,
			"ERR_HTTP_PARSE_FAILURE", -6, "ERR_HTTP_CONNECT_FAILURE", -5,
			"ERR_HTTP_TIMEOUT", -4, "ERR_SERVER_UNCAUGHT", -3,
			"ERR_APP_SPECIFIC", -2, "ERR_FPP_PROTOCOL", -1);
	a.rfc("FppError", [b("ErrorCode"), b("Message"), f("ErrorObj"),
					b("StackTrace")]);
	a.rfc("FppReturnPackage", [d("Status"), f("Value"), g("OutRefParams"),
					i(a.FppError, "Error"), f("ProfilingInfo")]);
	a.FppCommandType = new $Flags("FPP", 0, "FPP_JSON", 1, "FPP_RP", 2,
			"FPP_RP_JSON", 3);
	a.FppVersion = new $Flags("BASE", 0, "ONE", 1, "TWO", 2, "CURRENT", 2);
	a.rfc("FppProxySettings", [d("Version"), d("CommandType"), b("PartnerId"),
					b("SessionId"), b("AuthUser"), b("ServerTunnelingUrl"),
					e("UseClientXmlProxy"), b("CanaryToken"),
					e("DefaultRetry"), e("Notify"), d("DateType")]);
	a.FppDateType = new $Flags("Local", 0, "UTC", 1);
	a.rfm("save_old_layout", [], "save_old_layout", $Network.Type.XMLPost,
			null, "Microsoft.Spaces.Web.Parts.TnTFireant.TnTFireant");
	a.rfm("update_value", [b("arg"), b("title"), b("tagline"), e("revert")],
			"update_value", $Network.Type.XMLPost, null,
			"Microsoft.Spaces.Web.Parts.TnTFireant.TnTFireant");
	a.seal();
	return a
});
registerNamespace("Microsoft.Spaces.WMP");
Microsoft.Spaces.WMP = function(g, d) {
	Microsoft.Spaces.WMP.initializeBase(this, arguments);
	var r = this, j = Boolean.parse(d.authormode), n = g, s = d.preference, m = d.moduleid, u = d.helplink, b = null, a = new WMPFpp.WMPParams;
	a.Url = "http://";
	a.UIMode = WMPFpp.UIMode.Full;
	a.PlayCount = 1;
	a.AutoStart = false;
	var f = new WMPFpp.FppProxySettings;
	f.Version = WMPFpp.FppVersion.TWO;
	f.CanaryToken = C_CANARY_COOKIE_NAME;
	var h = WMPFpp.initializeEx(
			"http://" + window.location.hostname + d.fppurl, f), c = new WMPFpp.WMPParams;
	c.Url = "http://";
	c.UIMode = WMPFpp.UIMode.Full;
	c.PlayCount = 1;
	c.AutoStart = false;
	this.initialize = function() {
		Microsoft.Spaces.WMP.callBaseMethod(this, "initialize", arguments);
		if (null == b)
			b = new $Memory.Groups;
		b.create(null).Events.register(g, {
					onclick : o
				})
	};
	this.dispose = function() {
		Microsoft.Spaces.WMP.callBaseMethod(this, "dispose", arguments);
		if (b) {
			b.dispose();
			b = null
		}
		r = null;
		j = null;
		n = null;
		m = null;
		b = null;
		a = null;
		h = null;
		m_util = null;
		uiMode = null;
		c = null
	};
	function o() {
		var a = event.srcElement.getAttribute("action");
		if (a == "reset") {
			p();
			event.returnValue = false
		} else if (a == "save") {
			q();
			event.returnValue = false
		}
	}
	function q() {
		if (l())
			h.setpreference(a, k);
		else
			e($Request.extractHost(document.location, true))
	}
	function k() {
		e($Request.extractHost(document.location, true))
	}
	function e(a) {
		document.location.href = a
	}
	function p() {
		e($Request.extractHost(document.location, true))
	}
	function l() {
		try {
			var b;
			b = document.getElementById("MPInfoURLUp");
			a.Url = b.value && b.value != "" ? b.value : c.Url;
			b = document.getElementById("MPInfoPlayCountUp");
			a.PlayCount = b.value;
			b = document.getElementById("MPInfoUIMode");
			a.UIMode = b.value;
			b = document.getElementById("MPInfoAutoStartUp");
			a.AutoStart = Boolean.parse(b.checked);
			return true
		} catch (d) {
			return false
		}
	}
};
Microsoft.Spaces.WMP.registerClass("Microsoft.Spaces.WMP", "$Binding");
Microsoft.Spaces.WMP.skipClass = true;
$Network.registerFpp("WMPFpp", function() {
	var c = $Network.FppProxy, b = c.__string, e = c.__primitive, i = c.__array, g = c.__custom, d = c.__enum, j = c.__date, f = c.__object, h = c.__oArray, a = new $Network.FppProxy("WMPFpp");
	a.UIMode = new $Flags("Invisible", 0, "None", 1, "Mini", 2, "Full", 3);
	a.rfc("WMPParams", [b("Url"), d("UIMode"), e("PlayCount"), e("AutoStart")]);
	a.InviteReturnCodes = new $Flags("Success", 0, "GenericError", 1,
			"InputValidationError", 2, "QuotaExceeded", 3, "QuotaEmpty", 4,
			"ABCHError_CanRetry", 5, "ABCHError_NoRetry", 6);
	a.rfc("InviteReturnData", [d("Code"), b("Detail"), b("DisplayMessage")]);
	a.rfc("ServerEventData", [b("Category"), b("Message")]);
	a.rfc("ServerTracingObject", [i("m_serverTraceCollection")]);
	a.FppStatus = new $Flags("SUCCESS", 0, "ERR_HTTP_MISCONFIGURATION", -7,
			"ERR_HTTP_PARSE_FAILURE", -6, "ERR_HTTP_CONNECT_FAILURE", -5,
			"ERR_HTTP_TIMEOUT", -4, "ERR_SERVER_UNCAUGHT", -3,
			"ERR_APP_SPECIFIC", -2, "ERR_FPP_PROTOCOL", -1);
	a.rfc("FppError", [b("ErrorCode"), b("Message"), f("ErrorObj"),
					b("StackTrace")]);
	a.rfc("FppReturnPackage", [d("Status"), f("Value"), h("OutRefParams"),
					g(a.FppError, "Error"), f("ProfilingInfo")]);
	a.FppCommandType = new $Flags("FPP", 0, "FPP_JSON", 1, "FPP_RP", 2,
			"FPP_RP_JSON", 3);
	a.FppVersion = new $Flags("BASE", 0, "ONE", 1, "TWO", 2, "CURRENT", 2);
	a.rfc("FppProxySettings", [d("Version"), d("CommandType"), b("PartnerId"),
					b("SessionId"), b("AuthUser"), b("ServerTunnelingUrl"),
					e("UseClientXmlProxy"), b("CanaryToken"),
					e("DefaultRetry"), e("Notify"), d("DateType")]);
	a.FppDateType = new $Flags("Local", 0, "UTC", 1);
	a.rfm("setpreference", [g("wmpParams")], "setpreference",
			$Network.Type.XMLPost, null,
			"Microsoft.Spaces.Web.Parts.WMP.FireAnt.WMPFpp");
	a.seal();
	return a
});
registerNamespace("Spaces.PartPrefs");
Spaces.PartPrefs.FramePrefUI = function(k, h) {
	Spaces.PartPrefs.FramePrefUI.initializeBase(this, arguments);
	h = this.getParameters();
	var j = this, i = k, b = h.frame, g, a, d, f, e;
	this.initialize = function() {
		Spaces.PartPrefs.FramePrefUI.callBaseMethod(this, "initialize",
				arguments);
		var h = b.getFramePrefs(), j = "";
		if (b.canChangeTitle) {
			g = h.name;
			j += '<label for="partName">'
					+ GetString("live.sndefaultstrings.strings.framePrefs._title")
					+ " </label>"
					+ '<input style="width:200px" id="partName" maxlength="48" type="text" value="'
					+ h.name.encodeHtmlAttribute() + '" /><p />'
		}
		if (b.hideTitle != "2")
			j += '<input id="partHideTitle" type="checkbox" '
					+ (h.hideTitle ? ' checked="checked" ' : "")
					+ '/><label for="partHideTitle">'
					+ GetString("live.sndefaultstrings.strings.framePrefs.hideTitle")
					+ "</label><br>";
		j += '<input id="partHideBorder" type="checkbox" '
				+ (h.hideBorder ? ' checked="checked" ' : "")
				+ '/><label for="partHideBorder">'
				+ GetString("live.sndefaultstrings.strings.framePrefs.hideBorder")
				+ "</label><br>";
		if (b.canSpanWidth)
			j += '<input id="fullWidth" type="checkbox" '
					+ (h.fullWidth ? ' checked="checked" ' : "")
					+ '/><label for="fullWidth">'
					+ GetString("live.sndefaultstrings.strings.framePrefs.useFullWidth")
					+ "</label>";
		i.innerHTML = j;
		var k = i.getElementsByTagName("INPUT");
		a = c(k, "partName");
		d = c(k, "partHideTitle");
		f = c(k, "partHideBorder");
		e = c(k, "fullWidth")
	};
	this.dispose = function() {
		Spaces.PartPrefs.FramePrefUI.callBaseMethod(this, "dispose", arguments)
	};
	this.validate = function() {
		var b = true;
		if (a) {
			var c = a.value.trim();
			if (c.length > 48) {
				b = false;
				this.errorMsg = GetString("live.sndefaultstrings.strings.framePrefs.title.error.tooLong")
			} else if (c.length == 0) {
				b = false;
				this.errorMsg = GetString("live.sndefaultstrings.strings.framePrefs.title.error.empty")
			}
		}
		return b
	};
	this.errorMsg = null;
	this.getPrefs = function() {
		var b = {
			hideBorder : f.checked
		};
		if (a && a.value != g)
			b.name = a.value;
		if (d)
			b.hideTitle = d.checked;
		if (e)
			b.fullWidth = e.checked;
		return b
	};
	this.onPersist = function() {
		b.applyFramePrefs(j.getPrefs())
	};
	function c(b, c) {
		for (var a = 0; a < b.length; a++)
			if (b[a].id == c)
				return b[a]
	}
};
Spaces.PartPrefs.FramePrefUI.registerClass("Spaces.PartPrefs.FramePrefUI",
		"$Binding");
Spaces.PartPrefs.FramePrefUI.Params = new $Enum("frame");
registerNamespace("Spaces.Customize");
registerNamespace("Spaces.PartPrefs");
var g_currPartPrefPopover;
Spaces.Customize._fppService = null;
Spaces.Customize.GetFppService = function() {
	if (!Spaces.Customize._fppService) {
		var a = new CustomizationService.FppProxySettings;
		a.UseClientXmlProxy = true;
		a.Version = CustomizationService.FppVersion.TWO;
		a.CanaryToken = C_CANARY_COOKIE_NAME;
		Spaces.Customize._fppService = CustomizationService.initializeEx(
				"http://" + window.location.hostname
						+ "/CustomizationService.fpp", a)
	}
	return Spaces.Customize._fppService
};
Spaces.PartPrefs.PartPrefPopOver = function(f, g, e) {
	if (typeof $UI == "undefined" || typeof $UI.Popover == "undefined")
		return;
	var m = this, d, a = new $UI.Popover;
	a.width = "450";
	a.shadow = false;
	a.modal = true;
	var b = document.getElementById("SpacesPopOversPartPrefPopOver");
	if (b == null) {
		b = document.createElement("div");
		b.id = "SpacesPopOversPartPrefPopOver";
		g_currPartPrefPopOver = a;
		document.body.appendChild(b)
	}
	var c;
	function j() {
		var d = null;
		if (e) {
			d = e;
			var c = e;
			for (var f = 0; f < 10; f++) {
				if (c.tagName.toLowerCase() == "a") {
					d = c;
					break
				}
				if (c.parentElement)
					c = c.parentElement
			}
		}
		i();
		a.header = GetString("live.sndefaultstrings.strings.framePrefs.header");
		a.body = b;
		var h = GetString("live.sndefaultstrings.strings.global.save"), g = GetString("live.sndefaultstrings.strings.global.cancel");
		a.addButton("ok", h, true, false);
		a.addButton("cancel", g, false, true);
		a.show(k, null)
	}
	function i() {
		b.innerHTML = '<div class="notify" style="display:none" nb:importance="High" nb:fullwidth="0"></div><div class="spPartPrefPopover"></div>';
		$Binding.validate(b.childNodes[0]);
		d = b.childNodes[0].webBindings[0];
		c = $Spaces.attachElementBindingSync(b.childNodes[1], g, null, {
					frame : f
				})
	}
	var k = function(m, k) {
		var b = true;
		if (k == "ok")
			if (c.validate()) {
				var g = [], i = c.getPrefs();
				for (var j in i) {
					var e = new CustomizationService.PartPreference;
					e.Name = j;
					e.Value = i[j];
					g.push(e)
				}
				Spaces.Customize.GetFppService().savePreferences("",
						f.getPartId(), g, l, null, h, 1e4);
				b = false
			} else {
				d.show(Spaces.Controls.NotificationBar.Importance.High, false,
						c.errorMsg, null, null);
				b = false
			}
		if (b) {
			a = null;
			g_currPartPrefPopOver = null
		}
		return b
	};
	function l() {
		c.onPersist();
		g_currPartPrefPopOver.hide();
		a = null;
		g_currPartPrefPopOver = null
	}
	function h() {
		m_fppCallInProgress = false;
		d
				.show(
						Spaces.Controls.NotificationBar.Importance.High,
						false,
						GetString("live.sndefaultstrings.strings.partPrefs.persistError"),
						null, null)
	}
	j()
}