String.prototype.convCR = function(a) {
    return ( !! a) ? this.replace(/<br \/>/g, "\n") : this.replace(/\n/g, "<br />")
};
String.prototype.convSP = function(a) {
    return ( !! a) ? this.replace(/&nbsp;/g, " ") : this.replace(/\x20\x20/g, "&nbsp;&nbsp;")
};
var ua = navigator.userAgent,
type = 0,
system;
var Browser = {
    isIE: false,
    isIE7: false,
    isIE6: false
};
if (ua.indexOf("MSIE 6.0") > -1) {
    Browser.isIE = true;
    Browser.isIE6 = true
} else {
    if (ua.indexOf("MSIE 7.0") > -1) {
        Browser.isIE = true;
        Browser.isIE7 = true
    } else {}
}
window._showLinkBubbleSwitch = true;
function ubbReplace(f, j, o, m, e) {
    var p;
    var c;
    var q = ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"];
    if (!m) {
        m = "picsize";
        c = "adjustSize"
    } else {
        c = m
    }
    f = f.replace(/([\.\? -!:-@\[-`\{-~、。·ˉˇ¨〃々～‖…‘’“”〔〕〈〉！＂＃￥％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝ˊˋ﹐﹑﹒﹔﹕﹖﹗﹙﹚﹛﹜﹝﹞﹟﹠﹡﹢﹣﹤﹥﹦﹨﹩﹪﹫]{18})/g, "$1<wbr>");
    if (/(all)|(egg)/.test(j)) {
        f = f.replace("[ft=#ff9900,3,]Qzone5.0，今夏最大的惊喜[/ft]", '<img src="http://imgcache.qq.com/ac/qzone_v5/function/color_egg/e_' + Math.floor(Math.random() * 11).toString() + '.gif" />')
    }
    if (/(all)|(face)/.test(j)) {
        f = f.replace(/\[em\]e(\d{1,3})\[\/em\]/g, "<img style='vertical-align:baseline  !important' src='http://" + e + "/qzone/em/e$1.gif'><wbr>")
    }
    if (/(all)/.test(j)) {
        f = f.replace(/\[ol\]/g, "<ol style='list-style-type:decimal'>").replace(/\[\/ol\]/g, "</ol>").replace(/\[ul\]/g, "<ul style='list-style-type:disc'>").replace(/\[\/ul\]/g, "</ul>").replace(/\[li\]/g, "<li style='margin:25px;'>").replace(/\[\/li\]/g, "</li>")
    }
    if (/(all)|(namecard)/.test(j)) {
        f = f.replace(/\[card=(\d+)\](.+?)\[\/card\]/g, "<a href='http://user.qzone.qq.com/$1' link='nameCard_$1' target='_blank'>$2</a>")
    }
    if (/(all)|(anchor)/.test(j)) {
        if (top.isStar) {
            f = f.replace(/\[url(|=([^\]]+))\]\[\/url\]/g,
            function() {
                var r = arguments;
                var i = /^http:\/\/anchor/i;
                var a = "";
                if (i.test(r[2])) {
                    a = r[2]
                } else {
                    if (i.test(r[3])) {
                        a = r[3]
                    }
                }
                if (!a) {
                    return r[0]
                }
                return '<a href="' + a + '"></a><wbr>'
            })
        }
        f = f.replace(/\[url(|=([^\]]+))\](.+?)\[\/url\]/g,
        function() {
            var s = arguments;
            var r = /^http:\/\//i;
            var u = /[\"\']/i;
            var i = /\[(em|video|flash|audio|quote|ffg|url|marque|email)/i;
            var t = /^(https?:\/\/)?[\w\-.]+\.(qq|paipai|soso|taotao)\.com($|\/|\\)/i;
            var v = "";
            var a = "";
            if (!s[1]) {
                if (r.test(s[3])) {
                    v = a = s[3]
                }
            } else {
                if (r.test(s[2])) {
                    v = s[3];
                    a = s[2]
                } else {
                    if (r.test(s[3])) {
                        v = s[2];
                        a = s[3]
                    }
                }
            }
            if (!a || !v || u.test(a) || i.test(v)) {
                return s[0]
            } else {
                if ((/all/.test(j) && parent.ownermode) || (t.test(a) && !/blogjumper/.test(a)) || window._showLinkBubbleSwitch) {
                    return '<a href="' + a + '" target="_blank">' + v + "</a><wbr>"
                } else {
                    return '<a href="' + a + '" link="' + a + '" target="_blank" onclick="showLinkBubble(this);return false">' + v + "</a><wbr>"
                }
            }
        })
    }
    if (/all/.test(j)) {
        f = f.replace(/\[ppk_url=(http[^\]\"\']+)]([^\[]+)\[\/ppk_url\]/g, "<a href='http://" + e + "/qzone/blogjumper.html#url=$1' target='_blank' style='color:#EF6EA8'>$2</a><wbr>")
    }
    var l = -1;
    if (/paper/.test(j)) {
        l = 650
    } else {
        if (/prePaper/.test(j)) {
            l = 635
        }
    }
    if (/(all)|(image)/.test(j)) {
        var k = /sign/.test(j) ? "540,160": ((/all/.test(j)) ? "670,999": "540,999");
        if (l > 0) {
            k = l + k.toString().substr(k.toString().indexOf(","))
        }
        if ( !! o) {
            k = o
        }
        if (/imageLimit/.test(j)) {
            var b = 0;
            p = /\[img\]http(.[^\]\'\"]*)\[\/img\]/i;
            while (p.exec(f) != null) {
                if (b >= 1) {
                    f = f.replace(p, " <a href='http$1' target='_blank'>{点击查看贴图}</a> ")
                } else {
                    f = f.replace(p, "<wbr><a href='http$1' target='_blank'><img style='vertical-align:baseline  !important' onload='" + m + "(this," + k + ")'  src='http$1' border='0'></a><wbr> ")
                }
                b++
            }
        } else {
            if (/imageHide/.test(j)) {
                p = /\[img\]http(.[^\]\'\"]*)\[\/img\]/ig;
                f = f.replace(p, " <a href='http$1' target='_blank'>{点击查看贴图}</a> ")
            } else {
                f = f.replace(/\[img,(\d{1,3}),(\d{1,3})\]http(.[^\]\'\"]*)\[\/img\]/ig, "<wbr><img style='vertical-align:baseline  !important' src='http$3' border='0' width='$1' height='$2' onload='" + c + "(this,520,1024,true)'><wbr>");
                f = f.replace(/\[img\]http(.[^\]\'\"]*)\[\/img\]/ig, "<wbr><a href='http$1' target='_blank'><img style='vertical-align:baseline  !important' onload='" + m + "(this," + k + ")'  src='http$1' border='0'></a><wbr>")
            }
        }
    }
    if (/(all)|(qqshow)/.test(j)) {
        f = f.replace(/\[qqshow,(\d{1,3}),(\d{1,3}),(\d{1,3}),(\d{1,3})(,.*?|)\]http(.[^\]\'\"]*)\[\/qqshow\]/ig, "<wbr><img style='vertical-align:baseline  !important' transImg='1' src='http$6' border='0' width='$3' height='$4' onload='" + c + "(this,520,1024,true)'><wbr>")
    }
    if (/(all)|(flash)/.test(j)) {
        p = /\[flash(,(\d{1,3}),(\d{1,3})|)\]([^\[]+?)\[\/flash\]/ig;
        f = f.replace(p,
        function() {
            var w = arguments;
            var a = w[4];
            var t = /^http:\/\/((\w+\.|)video|v).qq.com/i.test(a);
            var s = /^http:\/\/(?:cnc.|edu.)?imgcache.qq.com/i.test(a);
            var i = /^http:\/\/comic.qq.com/i.test(a);
            var v = t | s | i ? "all": "internal";
            var x = t ? "true": "false";
            var r = t | s | i ? "always": "never";
            if (w[1]) {
                var u = parent.insertFlash({
                    allowscriptaccess: r,
                    id: Math.random(),
                    allownetworking: v,
                    allowFullScreen: x,
                    src: a,
                    width: ((l > 0 && w[2] > l) ? l: w[2]),
                    height: w[3]
                })
            } else {
                var u = parent.insertFlash({
                    allowscriptaccess: r,
                    id: Math.random(),
                    allownetworking: v,
                    allowFullScreen: x,
                    src: a,
                    width: ((l > 0 && w[2] > l) ? l: "")
                })
            }
            return '<img style="vertical-align:baseline  !important" src="about:blank" srcHTML="' + u + '" onerror="loadEmbed(this)" style="display:none"/>'
        });
        p = /\[flasht,(\d{1,4}),(\d{1,4}),(\d{1,4}),(\d{1,4})\]([^\[]+?)\[\/flasht\]/ig;
        f = f.replace(p,
        function() {
            var a = arguments;
            strHTML = parent.insertFlash({
                wmode: "transparent",
                type: "application/octet-stream",
                style: "position:absolute;left:" + a[3] + ";top:" + a[4],
                quality: "high",
                menu: "false",
                id: Math.random(),
                id: Math.random(),
                allownetworking: "internal",
                src: a[5],
                height: a[2],
                width: ((l > 0 && a[1] > l) ? l: a[1])
            });
            return '<img style="vertical-align:baseline  !important" src="about:blank" srcHTML="' + strHTML + '" onerror="loadEmbed(this)" style="display:none"/>'
        })
    }
    if (/(all)|(video)/.test(j)) {
        p = new RegExp("\\[video,([0-9]{1,3}),([0-9]{1,3}),([truefals]{4,5}),([truefals]{4,5})\\](http:\\/\\/video\\.qq\\.com\\/res\\/[\u2E80-\u9FFF0-9a-zA-Z&#=;.:_\\-?%/+/]{1,})\\[\\/video\\]", "ig");
        f = f.replace(p,
        function() {
            var i = arguments;
            var a = "<EMBED allowNetworking='all' enableContextMenu='False' src='" + i[5] + "' width='" + ((l > 0 && i[1] > l) ? l: i[1]) + "' height='" + i[2] + "' loop = '" + i[3] + "' autostart='" + i[4] + "' showstatusbar='1'/><wbr>";
            return '<img style="vertical-align:baseline  !important" src="about:blank" srcHTML="' + a + '" onerror="loadEmbed(this)" style="display:none"/>'
        });
        p = new RegExp("\\[video,([0-9]{1,3}),([0-9]{1,3}),([truefals]{4,5}),([truefals]{4,5})\\]([\u2E80-\u9FFF0-9a-zA-Z&#=;.:_\\-?%/+/]{1,})\\[\\/video\\]", "g");
        f = f.replace(p,
        function() {
            var i = arguments;
            var a = "<EMBED allowNetworking='internal' enableContextMenu='False' src='" + i[5] + "' width='" + ((l > 0 && i[1] > l) ? l: i[1]) + "' height='" + i[2] + "' loop = '" + i[3] + "' autostart='" + i[4] + "' showstatusbar='1'/><wbr>";
            return '<img style="vertical-align:baseline  !important" src="about:blank" srcHTML="' + a + '" onerror="loadEmbed(this)" style="display:none"/>'
        });
        p = new RegExp("\\[video,([truefals]{4,5}),([truefals]{4,5})\\](http:\\/\\/video\\.qq\\.com\\/res\\/[\u2E80-\u9FFF0-9a-zA-Z&#=;.:_\\-?%/+/]{1,})\\[\\/video\\]", "ig");
        f = f.replace(p,
        function() {
            var i = arguments;
            var a = "<EMBED allowNetworking='all' enableContextMenu='False' src='" + i[3] + "' loop = '" + i[1] + "' autostart='" + i[2] + "' showstatusbar='1'" + ((l > 0) ? (" width='" + l + "'") : "") + "/><wbr>";
            return '<img style="vertical-align:baseline  !important" src="about:blank" srcHTML="' + a + '" onerror="loadEmbed(this)" style="display:none"/>'
        });
        p = new RegExp("\\[video,([truefals]{4,5}),([truefals]{4,5})\\]([\u2E80-\u9FFF0-9a-zA-Z&#=;.:_\\-?%/+/]{1,})\\[\\/video\\]", "g");
        f = f.replace(p,
        function() {
            var i = arguments;
            var a = "<EMBED allowNetworking='internal' enableContextMenu='False' src='" + i[3] + "' loop = '" + i[1] + "' autostart='" + i[2] + "' showstatusbar='1'" + ((l > 0) ? (" width='" + l + "'") : "") + "/><wbr>";
            return '<img style="vertical-align:baseline  !important" src="about:blank" srcHTML="' + a + '" onerror="loadEmbed(this)" style="display:none"/>'
        })
    }
    if (/(all)|(vphoto)/.test(j)) {
        p = new RegExp("\\[vphoto,(\\d+),(\\d{5,11})](.*?)\\[\\/vphoto\\]", "ig");
        f = f.replace(p,
        function() {
            var a = arguments;
            return "<EMBED allowFullScreen='true' allowNetworking='all' enableContextMenu='False' src='http://imgcache.qq.com/qzone/client/photo/swf/vphoto.swf?btn_play_btn=1&uin=" + a[2] + "' width='400' height='300' showstatusbar='1'/><wbr>"
        })
    }
    if (/(all)|(quote)/.test(j)) {
        var f = f.replace(/\[quote=([^\]]*)\]/g, "\x00$1<br />\x02").replace(/\[\/quote\]/g, "\x01").replace(/\[quote\]/g, "\x00");
        var h = 2;
        for (var d = 0; d < h; d++) {
            f = f.replace(/\x00([^\x00\x01\x02]*)\x02?([^\x00\x01\x02]*)\x01/g,
            function(r, i, s) {
                if (s == "") {
                    return '<div class="mode_table_quote"><span class="mode_table_quote_title">引用内容：</span><br/>' + i + "</div>"
                } else {
                    return '<div class="mode_table_quote"><span class="mode_table_quote_title">' + i + "引用内容：</span><br/>" + s + "</div>"
                }
            })
        }
        f = f.replace(/[\x00\x02\x01]/g, "")
    }
    var n = 0;
    var g;
    f = f.replace(/\[\/?quote[^\]]*\]/g, "");
    if (/(all\b)|(glow\b)/.test(j) && Browser.isIE) {
        p = /\[ffg,([#\w]{1,10}),([#\w]{1,10})\]/g;
        if (g = f.match(p)) {
            n += g.length;
            f = f.replace(p, '<font style="filter: glow(color=$1,strength=3); display:inline-block; color:$2;">')
        }
    } else {
        if (/glow_limit/.test(j) && Browser.isIE) {
            p = /\[ffg,([#\w]{1,10}),([#\w]{1,10})\](.{1,80})\[\/ft\]/;
            if (g = f.match(p)) {
                if (!/\[f/.test(g[3])) {
                    f = f.replace(p, '<font style="filter: glow(color=$1,strength=3); display:inline-block; color:$2;">$3</font>')
                }
            }
        }
    }
    if (/(all\b)|(glow_msg\b)/.test(j) && Browser.isIE) {
        f = f.replace(/\[cx1\]([^\r]*?)\[\/cx1\]/g, '<span class="title_cx1">$1</span>');
        f = f.replace(/\[cx2\]([^\r]*?)\[\/cx2\]/g, '<span class="title_cx2">$1</span>')
    }
    if (/(all)|(font)/.test(j)) {
        p = /\[ffg,([a-zA-z#0-9]{1,10}),([a-zA-z&#=;0-9]{1,10})\]/g;
        if (g = f.match(p)) {
            n += g.length;
            f = f.replace(p, "<font color='$1'><wbr>")
        }
        p = new RegExp("\\[ft=([^\\]]+)\\]", "g");
        if (g = f.match(p)) {
            n += g.length;
            f = f.replace(p,
            function() {
                var r = arguments[1].split(",");
                var a = r[0] ? " color=" + r[0] : "";
                var i = r[1] ? r[1] : null;
                var t = r[2] ? " face=" + r[2] : "";
                return "<font" + a + t + ' style="line-height:1.3em;' + (!i ? "": ("font-size:" + q[i - 1])) + '">'
            })
        }
        p = new RegExp("\\[ftc=([a-zA-z#0-9]{1,10})\\]", "g");
        if (g = f.match(p)) {
            n += g.length;
            f = f.replace(p, "<font color='$1'><wbr>")
        }
        p = new RegExp("\\[fts=([1-6]{1,1})\\]", "g");
        if (g = f.match(p)) {
            n += g.length;
            f = f.replace(p,
            function(r, i) {
                return "<font style='line-height:1.3em;font-size:" + q[i - 1] + "'><wbr style='line-height:1.3em;'>"
            })
        }
        p = new RegExp("\\[ftf=([\u4E00-\u9FFFa-zA-Z_0-9,&#=;\\ ]{1,})\\]", "g");
        if (g = f.match(p)) {
            n += g.length;
            f = f.replace(p, "<font face='$1'><wbr>")
        }
        p = new RegExp("\\[B\\]", "g");
        f = f.replace(p, "<B><wbr>");
        p = new RegExp("\\[\\/B\\]", "g");
        f = f.replace(p, "</B><wbr>");
        p = new RegExp("\\[M\\]", "g");
        f = f.replace(p, "<center>");
        p = new RegExp("\\[\\/M\\]", "g");
        f = f.replace(p, "</center>");
        p = new RegExp("\\[R\\]", "g");
        f = f.replace(p, "<center style='text-align: right'>");
        p = new RegExp("\\[\\/R\\]", "g");
        f = f.replace(p, "</center>");
        p = new RegExp("\\[U\\]", "g");
        f = f.replace(p, "<U><wbr>");
        p = new RegExp("\\[\\/U\\]", "g");
        f = f.replace(p, "</U><wbr>");
        p = new RegExp("\\[I\\]", "g");
        f = f.replace(p, "<I><wbr>");
        p = new RegExp("\\[\\/I\\]", "g");
        f = f.replace(p, "</I><wbr>")
    }
    p = /\[\/ft\]/g;
    if (g = f.match(p)) {
        n -= g.length;
        f = f.replace(p, "</font><wbr style='line-height:1.3em;'>")
    }
    if (n > 0) {
        f += (new Array(n + 1)).join("</font><wbr style='line-height:1.3em;'>")
    }
    f = f.replace(/\[\/?f[tf][^\]]*\]/g, "").replace(/\[\/?[BMRUI]\]/g, "");
    if (/(all)|(email)/.test(j)) {
        p = new RegExp("\\[email\\](.*?)\\[\\/email\\]", "g");
        f = f.replace(p, "<a href='mailto:$1' target='_blank'>$1</a><wbr>");
        p = new RegExp("\\[email=(.*?)\\](.*?)\\[\\/email\\]", "g");
        f = f.replace(p, "<a href='mailto:$2' target='_blank'>$1</a><wbr>")
    }
    if (/(all)|(marquee)/.test(j)) {
        p = new RegExp("\\[marque\\]", "g");
        f = f.replace(p, "<marquee><wbr>");
        p = new RegExp("\\[\\/marque\\]", "g");
        f = f.replace(p, "</marquee><wbr>")
    }
    if (/(all)|(audio)/.test(j)) {
        f = f.replace(/\[audio,(true|false),(true|false)(\]|,true\]|,false\])([\u2E80-\u9FFF0-9a-zA-Z&#=;.:_\-?\%\/+\/]{1,})\[\/audio\]/ig,
        function(t, s, r, w, v, i) {
            var u = "<EMBED allowNetworking='internal' src='" + v + "' loop='" + s + "' autostart='" + r + "'" + ((w == ",true]") ? " height='0' width='0'": "") + " showstatusbar='1' /><wbr>";
            return '<img style="vertical-align:baseline !important" src="about:blank" srcHTML="' + u + '" onerror="loadEmbed(this)" style="display:none"/>'
        })
    }
    parent._musicParams = new parent.Array();
    if (/(all)|(audio)/.test(j)) {
        f = f.replace(/\[music\](.*?)\[\/music\]/ig,
        function() {
            var a = arguments[1].split("|");
            var i = parent.insertFlash({
                width: (a.length / 6 > 1) ? 440 : 410,
                height: (a.length / 6 > 1) ? 190 : 100,
                src: "http://" + parent.imgcacheDomain + "/music/musicbox_v2_1/img/MusicFlash.swf",
                bgColor: "#ffffff",
                scale: "showall",
                wmode: "opaque",
                id: "musicFlash" + parent._musicParams.length,
                name: "musicFlash" + parent._musicParams.length,
                menu: "true",
                allowScriptAccess: "always",
                wmode: "transparent"
            },
            "9,0,0,0");
            parent._musicParams.push(arguments[0]);
            return '<img style="vertical-align:baseline !important" src="about:blank" srcHTML="' + i + '" onerror="loadEmbed(this)" style="display:none"/>'
        })
    }
    return f
}
function adjustSize(j, a, f, c) {
    var b = j.width,
    e = j.height,
    g = false;
    if (b < 1) {
        var d = new Image();
        d.src = j.src;
        b = d.width;
        e = d.height
    }
    if ((b / e) > (a / f)) {
        if (b > a) {
            j.style.width = a;
            g = true;
            b = a
        }
    } else {
        if (e > f) {
            j.style.height = f;
            g = true;
            e = f
        }
    }
    if (c && g) {
        j.style.cursor = "pointer";
        j.title = "点击预览原图";
        j.onclick = function() {
            window.open(j.src)
        }
    }
    j.onload = null;
    if ( !! j.transImg && Browser.isIE && !Browser.isIE7) {
        j.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, src=" + j.src + ", sizingmethod=scale);";
        j.style.height = e;
        j.style.width = b;
        j.src = "/ac/b.gif"
    }
}
function picsize(d, c, b) {
    d.onload = null;
    var a = new Image();
    a.src = d.src;
    if (a.width > c && a.height > b) {
        if (a.width / a.height > c / b) {
            d.height = c * a.height / a.width;
            d.width = c
        } else {
            d.width = b * a.width / a.height;
            d.height = b
        }
    } else {
        if (a.width > c) {
            d.height = c * a.height / a.width;
            d.width = c
        } else {
            if (a.height > b) {
                d.width = b * a.width / a.height;
                d.height = b
            } else {
                d.width = a.width;
                d.height = a.height
            }
        }
    }
}
function setImges(b) {
    for (var d = 1; d < b.length; d++) {
        var c = $(b[d]);
        if (c) {
            c.src = b[0].src;
            c.style.display = ""
        }
    }
    b.length = 1;
    b[0].onload = null
}
function showLinkBubble(a) {
    parent.showBubble(a, '<div style="padding-top:4px;color:#f00"><img src="http://' + parent.imgcacheDomain + '/qzone_v4/bt_alert.gif" style="margin:0 2px -2px 0"/>请勿打开陌生人发送的链接。谨防中奖等诈骗信息。</div>', '<div><a href="http://imgcache.qq.com/qzone/blogjumper.html#url=' + a.link + '" target="_blank" style="color:#00f;text-decoration:underline">打开链接</a></div>', 5000, "", "commentLink")
}
function loadEmbed(a) {
    a.onerror = null;
    setTimeout(function() {
        a.outerHTML = a.srcHTML
    },
    100)
} (function() {
    qzReg = new Object();
    function b(d, e, c) {
        qzReg[d] = new RegExp("");
        qzReg[d].compile(e, c)
    }
    if (Browser.isIE) {
        b("toStrong", "<([\\/]?)(strong|b)>", "ig");
        b("toItalic", "<([\\/]?)(em|i)>", "ig");
        b("toUnderline", "<([\\/]?)(ins|u)>", "ig");
        b("toAlignCenter", "<(div|p)[^>]+align=center[^>]*>(.*?)<\\/(div|p)[^>]*>", "ig");
        b("toAlignRight", "<(div|p)[^>]+align=right[^>]*>(.*?)<\\/(div|p)[^>]*>", "ig");
        b("glowFont", "<font[^>]+glow\\(color=#(\\w{6})[^>]*>", "ig");
        b("removeDumpDiv", "^<(div|p)></(div|p)>", "i")
    } else {
        b("toStrong", "<(div|span)[^>]+font-weight: bold[^>]*>(.*?)<\\/(div|span)[^>]*>", "ig");
        b("toItalic", "<(div|span)[^>]+font-style: italic[^>]*>(.*?)<\\/(div|span)[^>]*>", "ig");
        b("toUnderline", "<(div|span)[^>]+text-decoration: underline[^>]*>(.*?)<\\/(div|span)[^>]*>", "ig");
        b("toAlignCenter", "<(div|p)[^>]+text-align: center[^>]*>(.*?)<\\/(div|p)[^>]*>", "ig");
        b("toAlignRight", "<(div|p)[^>]+text-align: right[^>]*>(.*?)<\\/(div|p)[^>]*>", "ig")
    }
    b("toNameCard", '<a[^>]+link="nameCard_(\\d+)"[^>]*>(.*?)<\\/a[^>]*>', "ig");
    b("toMail", '<a[^>]+href="mailto:(.*?)"[^>]*>(.*?)<\\/a[^>]*>', "ig");
    b("toUrl", '<a[^>]+href="(.*?)"[^>]*>(.*?)<\\/a[^>]*>', "ig");
    b("toEmotion", "<img[^>]+em\\/e(\\d{1,3}).gif[^>]*>", "ig");
    b("fullFont", '<font[^>]+style="[^"].+color=#(\\w+).+color:s#(\\w+).+"[^>]*>([^\\<]+)<\\/font[^>]*>', "ig");
    b("delScript", "<script[^>]*>(.*?)<\\/script[^>]*>", "ig");
    b("fixBlankUBB", "\\[(url|ft|b|i|u|m|r|email)[^\\[]*?\\](\x20*?)\\[\\/(url|ft|b|i|u|m|r|email)\\]", "ig");
    b("replyQuote", "<blockquote [^>]+?>引自：<cite>(.+?)<\\/cite>[^<]+?<ins>(.+?)<\\/ins>.+?<q>(.+)<\\/q><\\/blockquote>", "ig");
    b("blockLine", "<(div|p)[^>]*>(.*?)<\\/(div|p)[^>]*>", "ig");
    String.prototype.HTMLToUBB = function(c) {
        var d = this;
        d = d.replace(qzReg.replyQuote, "[quote=引自：$1  于 $2 发表的评论]$3[/quote]");
        if ((/blockquote/i).test(d)) {
            d = d.replace(qzReg.replyQuote, "[quote=引自：$1  于 $2 发表的评论]$3[/quote]")
        }
        if (Browser.isIE) {
            d = d.replace(qzReg.removeDumpDiv, "");
            d = d.replace(qzReg.toStrong, "[$1B]");
            d = d.replace(qzReg.toItalic, "[$1I]");
            d = d.replace(qzReg.toUnderline, "[$1U]")
        } else {
            d = d.replace(qzReg.toStrong, "[B]$2[/B]");
            d = d.replace(qzReg.toItalic, "[I]$2[/I]");
            d = d.replace(qzReg.toUnderline, "[U]$2[/U]")
        }
        d = d.replace(qzReg.toAlignCenter, "[M]$2[/M]");
        d = d.replace(qzReg.toAlignRight, "[R]$2[/R]");
        d = d.replace(qzReg.glowFont, "[ffg,#$1,#FFFFFF]");
        d = d.replace(/<font([^>]+)>/ig,
        function() {
            var f = arguments;
            var e = /color(: |=)([#\w]{1,7})/.exec(f[1]);
            var g = /size=["]?(\d{1})/.exec(f[1]);
            var h = /face=("|)([^"\s]+)("|)/.exec(f[1]);
            return "[ft=" + (e ? e[2] : "") + "," + (g ? g[1] : "") + "," + (h ? h[2] : "") + "]"
        });
        d = d.replace(/<\/font[^>]*>/ig, "[/ft]");
        if (!Browser.isIE) {
            d = d.replace(/<(div|span)([^>]+)>(.*?)<\/(div|span)[^>]*>/ig,
            function() {
                var f = arguments;
                var e = /color: ([^;]+)/.exec(f[2]);
                var g = /font-family: ([^;]+)/.exec(f[2]);
                return "[ft=" + (e ? e[1] : "") + ",," + (g ? g[1] : "") + "]" + f[3] + "[/ft]"
            })
        }
        d = d.replace(qzReg.blockLine, "$2\n");
        d = d.replace(/<b(r|r\/)>/ig, "\n");
        d = d.replace(qzReg.delScript, "");
        d = d.replace(qzReg.toNameCard, "[card=$1]$2[/card]");
        d = d.replace(qzReg.toMail, "[email=$2]$1[/email]");
        d = d.replace(qzReg.toUrl, "[url=$1]$2[/url]");
        d = d.replace(qzReg.toEmotion, "[em]e$1[/em]");
        d = d.replace(/<img([^>]+)>/ig,
        function() {
            try {
                var p = arguments;
                var l = /orgSrc="([^"]+)"/i.exec(p[1]);
                var f = (l && l[1]) ? l[1] : (/src="([^"]+)"/i.exec(p[1])[1]);
                var r = /WIDTH(: |=)(\d{1,3})/i.exec(p[1]);
                var n = /HEIGHT(: |=)(\d{1,3})/i.exec(p[1]);
                var u = /TRANSIMG=(\"*)(\d{1})/i.exec(p[1]);
                var k = /ORIGINWIDTH=(\"*)(\d{1,3})/i.exec(p[1]);
                var s = /ORIGINHEIGHT=(\"*)(\d{1,3})/i.exec(p[1]);
                var g = /ORIGINSRC="([^"]+)"/i.exec(p[1]);
                var q = (Browser.isIE ? /class=(flash|video|audio|qqVideo|vphoto)/i.exec(p[1]) : /class="(flash|video|audio|qqVideo|vphoto)/i.exec(p[1]));
                var i = /em\/e(\d{1,3}).gif/i.exec(p[1]);
                if (i) {
                    return "[em]e" + i[1] + "[/em]"
                }
                if (q) {
                    var j = /_cacheID="([^"]+)"/i.exec(p[1]);
                    var m = getEditorCache(c, j[1]);
                    switch (q[1]) {
                    case "qqVideo":
                    case "flash":
                        return "[flash," + r[2] + "," + n[2] + "]" + m + "[/flash]";
                        break;
                    case "video":
                        return "[video," + r[2] + "," + n[2] + "," + m[1] + "," + m[2] + "]" + m[0] + "[/video]";
                        break;
                    case "audio":
                        return "[audio," + m[1] + "," + m[2] + "," + m[3] + "]" + m[0] + "[/audio]";
                        break;
                    case "vphoto":
                        return "[vphoto," + m[0] + "," + m[2] + "]" + m[1] + "[/vphoto]";
                        break;
                    default:
                        return ""
                    }
                }
                if ( !! u && !!k && !!s) {
                    if (!r) {
                        r = k
                    }
                    if (!n) {
                        n = s
                    }
                    return "[qqshow," + k[2] + "," + s[2] + "," + r[2] + "," + n[2] + "]" + ( !! g ? g[1] : f) + "[/qqshow]"
                }
                if (r && n) {
                    return "[img," + r[2] + "," + n[2] + "]" + f + "[/img]"
                }
                return "[img]" + f + "[/img]"
            } catch(o) {
                return ""
            }
        });
        d = d.replace(qzReg.fullFont, "[ffg,#$1,#$2]$3[/ft]");
        d = d.replace(/<[^>]*?>/g, "");
        d = d.replace(/&shy;/ig, "");
        d = d.replace(/&nbsp;/ig, " ");
        d = d.replace(/&lt;/ig, "<");
        d = d.replace(/&gt;/ig, ">");
        d = d.replace(/&amp;/ig, "&");
        d = d.replace(/\n$/i, "");
        d = d.replace(qzReg.fixBlankUBB, "");
        return d
    };
    b("ubbNameCard", "\\[card=(\\d+)\\](.+?)\\[\\/card\\]", "g");
    b("ubbURL", "\\[url=(http[^\\]\\\"\\']+)]([^\\[]+)\\[\\/url\\]", "g");
    b("ubbPPKURL", "\\[ppk_url=(http[^\\]\\\"\\']+)]([^\\[]+)\\[\\/ppk_url\\]", "g");
    b("ubbEmotion", "\\[em\\]e(\\d{1,3})\\[\\/em\\]", "g");
    b("ubbQQShow", "\\[qqshow,(\\d{1,3}),(\\d{1,3}),(\\d{1,3}),(\\d{1,3})\\]http(.[^\\]\\'\\\"]*)\\[\\/qqshow\\]", "ig");
    b("ubbResizeImg", "\\[img,(\\d{1,3}),(\\d{1,3})\\]http(.[^\\]\\'\\\"]*)\\[\\/img\\]", "ig");
    b("ubbImage", "\\[img\\]http(.[^\\]\\'\\\"]*)\\[\\/img\\]", "ig");
    b("ubbGlow", "\\[ffg,([#\\w]{1,10}),([#\\w]{1,10})\\]", "g");
    b("ubbFont", "\\[ft=([^\\]]+)\\]", "g");
    b("ubbFontColor", "\\[ftc=([#\\w]{1,10})\\]", "g");
    b("ubbFontSize", "\\[fts=([1-6]{1,1})\\]", "g");
    b("ubbFontFace", "\\[ftf=(.[^\\]]+)\\]", "g");
    b("ubbFlash", "\\[flash(|,(\\d+),(\\d+))\\](.*?)\\[\\/flash\\]", "ig");
    b("ubbVideo", "\\[video,(\\d+|true|false),(\\d+|true|false)(|,(true|false),(true|false))\\](.*?)\\[\\/video\\]", "ig");
    b("ubbAudio", "\\[audio,(true|false),(true|false),(true|false)](.*?)\\[\\/audio\\]", "ig");
    b("ubbVphoto", "\\[vphoto,(\\d+),(\\d{5,11})](.*?)\\[\\/vphoto\\]", "ig");
    b("isQQVideo", "http:\\/\\/((\\w+\\.|)video|v).qq.com", "i");
    String.prototype.UBBToHTML = function(d) {
        var f = this;
        f = f.replace(/&/ig, "&amp;");
        f = f.replace(/  /ig, "&nbsp;&nbsp;");
        f = f.replace(/</ig, "&lt;");
        f = f.replace(/>/ig, "&gt;");
        f = f.replace(/(.+)(\n|)/ig, "<div>$1</div>");
        f = f.replace(/<div>\s+?<\/div>/ig, "<div>&#173;</div>");
        f = f.replace(qzReg.ubbEmotion, "<img src='http://imgcache.qq.com/qzone/em/e$1.gif' onresizestart='return false'>");
        f = f.replace(qzReg.ubbNameCard, "<a href='http://user.qzone.qq.com/$1' link='nameCard_$1' class='nameCard'>$2</a>");
        f = f.replace(/\[url(|=([^\]]+))\](.+?)\[\/url\]/g,
        function() {
            var k = arguments;
            var j = /^http:\/\//i;
            var l = /[\"\']/i;
            var i = /\[(em|video|flash|audio|vphoto|quote|ffg|url|marque|email)/i;
            var m = "";
            var h = "";
            if (!k[1]) {
                if (j.test(k[3])) {
                    m = h = k[3]
                }
            } else {
                if (j.test(k[2])) {
                    m = k[3];
                    h = k[2]
                } else {
                    if (j.test(k[3])) {
                        m = k[2];
                        h = k[3]
                    }
                }
            }
            if (!h || !m || l.test(h) || i.test(m)) {
                return k[0]
            } else {
                return '<a href="' + h + '" target="_blank">' + m + "</a><wbr>"
            }
        });
        f = f.replace(qzReg.ubbPPKURL, "<a href='$1' target='_blank' style='color:#EF6EA8'>$2</a>").replace(qzReg.ubbURL, "<a href='$2' target='_blank'>$1</a>").replace(qzReg.ubbURL, "<a href='$1' target='_blank'>$1</a>");
        if (Browser.isIE && !Browser.isIE7) {
            f = f.replace(qzReg.ubbQQShow, "<img originSrc='http$5' style='width:$3;height:$4;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"http$5\", sizingMethod=\"scale\");' border='0' originWidth='$1' originHeight='$2' transImg='1' width='$3' height='$4' src='http://imgcache.qq.com/ac/qzone_v4/b.gif' />")
        } else {
            f = f.replace(qzReg.ubbQQShow, "<img originSrc='http$5' style='width:$3;height:$4;' border='0' originWidth='$1' originHeight='$2' transImg='1' width='$3' height='$4' src='http$5' />")
        }
        f = f.replace(qzReg.ubbResizeImg, "<img src='http$3' border='0' width='$1' height='$2' />");
        f = f.replace(qzReg.ubbImage, "<img src='http$1' border='0' />");
        var g = 0;
        var c;
        if (c = f.match(qzReg.ubbGlow)) {
            g += c.length;
            f = f.replace(qzReg.ubbGlow, '<font style="filter: glow(color=$1,strength=3);color: $1;height:auto;" class="lightFont" title="发光字">')
        }
        if (c = f.match(qzReg.ubbFont)) {
            g += c.length;
            f = f.replace(qzReg.ubbFont,
            function() {
                var j = arguments[1].split(",");
                var h = j[0] ? " color=" + j[0] : "";
                var i = j[1] ? " size=" + (j[1] > 6 ? 6 : j[1]) : "";
                var k = j[2] ? " face=" + j[2] : "";
                return "<font" + h + i + k + ">"
            })
        }
        if (c = f.match(qzReg.ubbFontColor)) {
            g += c.length;
            f = f.replace(qzReg.ubbFontColor, "<font color='$1'>")
        }
        if (c = f.match(qzReg.ubbFontSize)) {
            g += c.length;
            f = f.replace(qzReg.ubbFontSize, "<font size='$1' style='line-height:1.5em'>")
        }
        if (c = f.match(qzReg.ubbFontFace)) {
            g += c.length;
            f = f.replace(qzReg.ubbFontFace, "<font face='$1'>")
        }
        var e = /\[\/ft\]/g;
        if (c = f.match(e)) {
            g -= c.length;
            f = f.replace(e, "</font>")
        }
        if (g > 0) {
            f += (new Array(g + 1)).join("</font>")
        }
        var e = new RegExp("\\[email\\](.*?)\\[\\/email\\]", "g");
        f = f.replace(e, "<a href='mailto:$1' target='_blank'>$1</a>");
        var e = new RegExp("\\[email=(.*?)\\](.*?)\\[\\/email\\]", "g");
        f = f.replace(e, "<a href='mailto:$2' target='_blank'>$1</a>");
        if (Browser.isIE) {
            f = f.replace(/\[([\/]?)B\]/g, "<$1B>");
            f = f.replace(/\[([\/]?)U\]/g, "<$1U>");
            f = f.replace(/\[([\/]?)I\]/g, "<$1I>")
        } else {
            f = f.replace(/\[B\]/g, "<div style='font-weight: bold'>");
            f = f.replace(/\[\/B\]/g, "</div>");
            f = f.replace(/\[U\]/g, "<div style='text-decoration: underline'>");
            f = f.replace(/\[\/U\]/g, "</div>");
            f = f.replace(/\[I\]/g, "<div style='font-style: italic'>");
            f = f.replace(/\[\/I\]/g, "</div>")
        }
        f = f.replace(/\[M\]/g, "<div align=center>");
        f = f.replace(/\[\/M\]/g, "</div>");
        f = f.replace(/\[R\]/g, "<div align=right>");
        f = f.replace(/\[\/R\]/g, "</div>");
        f = a(f);
        f = f.replace(qzReg.ubbFlash,
        function() {
            var i = arguments;
            var j = i[1] ? i[2] : "260";
            var k = i[1] ? i[3] : "185";
            var l = i[4];
            var m = "";
            return '<img src="http://imgcache.qq.com/ac/qzone_v4/b.gif" class="' + (qzReg.isQQVideo.test(i[4]) ? "qqVideo": "flash") + '" style="width:' + j + "px;height:" + k + 'px" _cacheID="' + m + '"/>'
        });
        f = f.replace(qzReg.ubbVideo,
        function() {
            var i = arguments;
            var k = i[3] ? i[1] : "260";
            var l = i[3] ? i[2] : "185";
            var m = i[3] ? i[4] : i[1];
            var j = i[3] ? i[5] : i[2];
            var n = [i[6], m, j];
            var o = "";
            return '<img src="http://imgcache.qq.com/ac/qzone_v4/b.gif" class="video" style="width:' + k + "px;height:" + l + 'px" _cacheID="' + o + '"/>'
        });
        f = f.replace(qzReg.ubbAudio,
        function() {
            var h = arguments;
            var i = [h[4], h[1], h[2], h[3]];
            var j = "";
            return '<img src="http://imgcache.qq.com/ac/qzone_v4/b.gif" class="audio" style="width:300px;height:70px" _cacheID="' + j + '" onresizestart="return false"/>'
        });
        f = f.replace(qzReg.ubbVphoto,
        function() {
            var h = arguments;
            var i = [h[1], h[3], h[2]];
            var j = "";
            return '<img src="' + h[3] + '" class="vphoto" style="width:480px;height:360px" _cacheID="' + j + '" onresizestart="return false"/>'
        });
        return f
    };
    function a(d) {
        d = d.replace(/\[quote\=引自：(.+?)(?:\x20|&nbsp;){1,2}于\x20(.+?)\x20发表的评论\]/g, "\x03引自：<cite>$1</cite>&nbsp;&nbsp;于 <ins>$2</ins> 发表的评论<br />\x02").replace(/\[\/quote\]/g, "\x01");
        for (var c = 0; c < 2; c++) {
            d = d.replace(/\x03([^\x03\x01\x02]*?)\x02([^\x03\x01\x02]*?)\x01/g,
            function(f, e, g) {
                return '<blockquote style="width:400px;border:dashed 1px gray;margin:10px;padding:10px">' + e + "引用内容：<br /><br /><q>" + g + "</q></blockquote>"
            })
        }
        return d.replace(/[\x03\x02\x01]/g, "")
    }
})();
function purge(f) {
    var c = f.attributes,
    e, b, g;
    if (c) {
        b = c.length;
        for (e = 0; e < b; e += 1) {
            g = c[e].name;
            if (typeof f[g] === "function") {
                f[g] = null
            }
        }
    }
    c = f.childNodes;
    if (c) {
        b = c.length;
        for (e = 0; e < b; e += 1) {
            purge(f.childNodes[e])
        }
    }
};