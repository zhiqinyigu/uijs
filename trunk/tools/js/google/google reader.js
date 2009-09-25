var e=false,h=null,i=true;
function j(a) {
	throwa;
}var m,aa=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],ba=["AM","PM"],ca="0";
function da(a,b) {
	a=String(a);
	return (new Array(Math.max(0,b-a.length+1))).join(ca)+a
}var n="";
function ea() {
	return Array.prototype.join.call(arguments,n)
}var o=" ",fa=", ",ga=":";
function ha(a) {
	var b=a.getMonth(),c=a.getDate(),d=a.getFullYear(),f=a.getHours(),a=a.getMinutes();
	if(d<=0)d=-d+1;
	return ea(aa[b],o,da(c,1),fa,da(d,4),o,da(f%12||12,1),ga,da(a,2),o,ba[f>=12&&f<24?1:0])
}function ia(a) {
	var b=a.getHours(),a=a.getMinutes();
	return ea(da(b%12||12,1),ga,da(a,2),o,ba[b>=12&&b<24?1:0])
}function ja(a) {
	var b=a.getMonth(),c=a.getDate(),a=a.getFullYear();
	if(a<=0)a=-a+1;
	return ea(aa[b],o,da(c,1),fa,da(a,4))
};
var ka=/["^<>?&\\\/,]+/,la=80,ma="readerNewSubscriptionInfo",na="/reader/api/0/preference/set",oa="/reader/api/0/preference/list",pa="/reader/api/0/search/items/ids",qa="/reader/api/0/stream/items/ids",ra="/reader/api/0/stream/details",sa="/reader/api/0/stream/items/contents",ta="/reader/api/0/stream/items/count",ua="/reader/api/0/preference/stream/list",va="/reader/api/0/preference/stream/set",wa="/reader/api/0/tag/list",xa="/reader/api/0/edit-tag",ya="/reader/api/0/subscription/list",za="/reader/api/0/subscription/edit",
Aa="/reader/api/0/item/delete",Ba="/reader/api/0/item/edit",Ca="/reader/api/0/subscription/quickadd",Da="/reader/api/0/unread-count",Ea="/reader/api/0/mark-all-as-read",Fa="/reader/api/0/token",Ga="/reader/api/0/subscribed",Ha="/reader/api/0/bundles",Ia="/reader/api/0/recommendations",Ja="/reader/api/0/recommended",Ka="/reader/api/0/friend/list",La="/reader/api/0/friend/edit",Ma="/reader/api/0/unshare-all",Na="/reader/atom/",Oa="/reader/public/atom/",Pa="/reader/public/javascript/",Qa="/reader/public/javascript-sub/",
Ra="/reader/settings",Sa="/reader/overview",Ta="/reader/directory",Ua="/reader/directory/search",Va="/reader/trends",Wa="/reader/friends-manager",Xa="/reader/user-info",Ya="/reader/clip-creator/",Za="/s2",$a="/reader/shared/",ab="/reader/perf",bb="/reader/email-this",cb="/reader/email-shared",db="/reader/email-invite",eb="/reader/offline-manifest",fb="/reader/ping",gb="/reader/link-frame",hb="none",ib=hb,jb="ice-cream",kb="ninjas",lb="sea",mb="label",nb=mb,ob="source",pb=ob,qb="state",rb="recommendations",
sb="pref",tb="link",ub=tb,vb="post",wb="reading-list",xb=wb,yb="read",zb=yb,Ab="kept-unread",Bb="starred",Cb=Bb,Db="root",Eb="broadcast",Fb="recommendations-dismissed",Gb="recommendations-subscribed",Hb="broadcast-friends",Ib="created",Lb=Ib,Mb="self",Nb="skimmed",Ob="tracking-item-link-used",Pb="tracking-body-link-used",Qb="tracking-kept-unread",Rb="tracking-emailed",Sb="blogger-following",Tb={
	id:"new-user-test-id","default":h
},q="true",Ub={
	id:"read-items-visible","default":q
},Vb={
	id:"show-all-tree-items",
	"default":q
},Wb={
	id:"is-card-view","default":q
},Xb="false",Yb={
	id:"is-in-scour-mode","default":Xb
},Zb={
	id:"shared-design","default":h
},$b={
	id:"show-minimized-navigation","default":Xb
},ac={
	id:"show-oldest-interrupt","default":q
},bc={
	id:"show-scroll-help","default":q
},cc={
	id:"show-scour-help-go-on","default":q
},dc={
	id:"show-scour-help-go-off","default":q
},ec={
	id:"scroll-tracking-enabled","default":q
},fc={
	id:"start-page","default":"home"
},gc="blogger-following-opt-out",hc={
	id:gc,"default":Xb
},ic={
	id:"show-blogger-following-intro",
	"default":q
},jc={
	id:"friends-opt-in","default":Xb
},kc={
	id:"friends-share-to-group","default":"CONTACTS"
},lc={
	id:"friends-v2-upsell","default":Xb
},mc={
	id:"confirm-mark-as-read","default":q
},nc={
	id:"tree-alpha-sort","default":Xb
},oc={
	id:"show-fast-ui-promo","default":q
},pc={
	id:"lhn-prefs","default":"{}"
},qc={
	id:"is-expanded","default":q
},rc={
	id:"is-translated","default":Xb
},sc="global",tc={
	id:"ranking","default":sc
},uc={
	id:"subscription-ordering","default":h
},vc={
	id:"viewer-read-items-visible","default":q
},
wc="BUNDLE",xc="FEED_FINDER_SEARCH_RESULT",yc="RECOMMENDATION",zc="SUBSCRIBE_BUTTON",Ac="render-tree-view-item",Bc="render-card-view-item",Cc="startup-to-overview",Dc="scour-mode-enter-sync",Ec="scour-mode-leave-sync",Fc="token-fetch",Gc="stream-contents-fetch",Hc="tree-view-settings",Ic="gaia-bar-settings",Jc="friends-settings",Kc=Jc,Lc="friends-hide-on-hover",Mc="gaia-bar-help",Nc="viewer-buttons",Oc=Nc,Pc="viewer-details-link",Qc="viewer-refresh-button",Rc="lhn-minimized",Sc="lhn-minimized-menu",
Tc="service-quickadd",Uc="keyboard-shortcut",Vc="konami",Wc=Vc,Xc="mozilla",Yc=Xc,Zc="ie",$c=Zc,ad="ie6",bd=ad,cd="ie7",dd=cd,ed="safari",fd=ed,gd="android",hd=gd,id="chrome",jd=id,kd="opera",ld=kd,md="unknown",nd=0,od=3,pd=0,qd=1,rd=2,sd=3,td="addfollowing",ud="hidefollowing",vd="showfollowing",wd="ignoreinvite",xd="addfollowers",yd="removefollowers",zd="CONTACTS",Ad="FRIENDS",Bd="news",Cd="funandgames",Dd="finance",Ed="sports",Fd="lifestyle",Gd="technology",Hd={
	Bk:83000,dl:"sharing.html"
},Id={
	Bk:69988,
	dl:"sharing.html"
},Jd={
	Bk:69980,dl:"faq.html#oldestfirst"
},Kd={
	Bk:97875,dl:"publishers.html#faq"
};
var Ld="ERROR",Md="Starred items",Nd="Items shared by %1",Od="%1 has no shared items.",Pd="Blogs I&#39;m following",Qd="Friends&#39; shared items",Rd={
	Ha:"Read items",gd:"My read items",ac:"Your read items",Ic:"You have no read items.",Jc:Ld,hd:Ld,Lc:"Items read by %1",Mc:"%1 hasn&#39;t yet read anything.",Nc:Ld
},Sd={
	Ha:"All items",gd:"My reading list",ac:"Your reading list",Ic:"Your reading list is empty.",Jc:"Your reading list has no unread items.",hd:Ld,Lc:"The reading list of %1",Mc:"The reading list of %1 is currently empty.",
	Nc:"You have no unread items from the reading list of %1"
},Td={
	Ha:Md,gd:"My starred items",ac:"Your starred items",Ic:"You have no starred items.",Jc:"You have no unread starred items.",hd:Ld,Lc:"Items starred by %1",Mc:"%1 has no starred items.",Nc:"You have read all of the items starred by %1."
},Ud={
	gd:"My &quot;%1&quot; items",ac:"Your &quot;%1&quot; items",Ic:"You have no &quot;%1&quot; items.",Jc:"You have no unread &quot;%1&quot; items.",hd:Ld,Lc:"&quot;%1&quot; via %2",Mc:"There are currently no &quot;%1&quot; via %2 items.",
	Nc:"You have read all of the &quot;%1&quot; via %2 items."
},Vd={
	ac:"Your saved items",Ha:"Saved items"
},Wd={
	ac:"Your shared items",Ha:"Shared items",gd:"My shared items",Ic:"You have no shared items.",Jc:Ld,hd:Ld,Lc:Nd,Mc:Od,Nc:Ld
},Xd={
	ac:Pd,Ha:Pd,gd:Pd,Ic:"The blogs you&#39;re following have no items.",Jc:"The blogs you&#39;re following have no unread items.",hd:Ld,Lc:Ld,Mc:Ld,Nc:Ld
},Yd={
	ac:Qd,Ha:Qd,gd:Qd,Ic:'Your friends haven&#39;t shared any items. <span class="friends-empty-msg">You can view more about your friends and your profile in your <span class="link friends-settings">settings page</span>.</span>',
	Jc:'You have no unread items from your friends. <span class="friends-empty-msg">You can view more about your friends and your profile in your <span class="link friends-settings">settings page</span>.</span>',hd:Ld,Lc:Ld,Mc:Ld,Nc:Ld
},Zd={
	ac:"Your skimmed items",Ha:"Skimmed items"
},$d={
	ac:"Your posts",Ha:"Posts",gd:"My posts",Ic:"You have no posts. &lt;span class=&quot;post-empty-msg&quot;&gt;...but you can add updates to your Shared Items using the form above or share links from the web by using the bookmarklet.&lt;/span&gt;",
	Jc:"You have no unread posts.",hd:Ld,Lc:"Posts by %1",Mc:"%1 has no posts.",Nc:"You have read all of the posts by %1."
},ae={
	ac:"Your links",Ha:"Links",gd:"My links",Ic:"You have no links.",Jc:"You have no unread links.",hd:Ld,Lc:"Links by %1",Mc:"%1 has no links.",Nc:"You have read all of the links posted by %1."
},be={
	ac:"Your notes",Ha:"Notes",gd:"My notes",Ic:"You have no notes.",Jc:"You have no unread notes.",hd:Ld,Lc:Ld,Mc:Ld,Nc:Ld
},ce={
	ac:"Your stuff",Ha:"Your stuff",gd:"My stuff",Ic:"You haven&#39;t created any stuff yet.",
	Jc:"None of your stuff is unread.",hd:Ld,Lc:Ld,Mc:Ld,Nc:Ld
},de={
	Qp:"Your tags:",Lo:"You have no tags",Mo:"Tags can be added to subscriptions by clicking on &quot;Settings&quot;.",Qq:"No tags match!",prompt:"Type in a tag name..."
},ee={
	Qp:"Your subscriptions:",Lo:"You have no subscriptions",Mo:"Subscriptions can be added by clicking on &quot;Settings&quot;",Qq:"No subscriptions match!",prompt:"Type in a subscription..."
},fe={
	Qp:"Your friends:",Lo:"You have no friends",Mo:'Friends can be added by clicking on "Sharing settings"',
	Qq:"No friends match!",prompt:"Type in a friend's name..."
};
var ge=ge||{
},he=this;
var ie=".",je="var ";
function ke(a,b,c) {
	a=a.split(ie);
	c=c||he;
	var d;
	!(a[0] in c)&&c.execScript&&c.execScript(je+a[0]);
	while(a.length&&(d=a.shift()))if(!a.length&&le(b))c[d]=b;
	else c=c[d]?c[d]:(c[d]={
	})
}function me(a,b) {
	a=a.split(ie);
	b=b||he;
	for(var c;c=a.shift();)if(b[c])b=b[c];else return h;return b
}function ne() {
}function oe(a) {
	a.ud=function () {
		return a.vG||(a.vG=new a)
	}
}var pe="object",qe="number",re="length",se="array",te="function",ue="null";
function ve(a) {
	var b=typeofa;
	if(b==pe)if(a) {
		if(typeofa.length==qe&&typeofa.splice!="undefined"&&!we(a,re))return se;
		if(typeofa.call!="undefined")return te
	}else return ue;
	else if(b==te&&typeofa.call=="undefined")return pe;
	return b
}function xe(a,b) {
	if(b in a)for(var c in a)if(c==b&&Object.prototype.hasOwnProperty .call(a,b))return i;return e
}if(Object.prototype.propertyIsEnumerable )var we=function (a,b) {
	return ainstanceofObject?Object.prototype.propertyIsEnumerable .call(a,b):xe(a,b)
};
else we=xe;
function le(a) {
	return typeofa!="undefined"
}function ye(a) {
	return a===h
}function ze(a) {
	return ve(a)==se
}function Ae(a) {
	var b=ve(a);
	return b==se||b==pe&&typeofa.length==qe
}var Be="string";
function Ce(a) {
	return typeofa==Be
}function De(a) {
	return ve(a)==te
}function Ee(a) {
	a=ve(a);
	return a==pe||a==se||a==te
}var Fe="closure_hashCode_";
function Ge(a) {
	if(a.hasOwnProperty &&a.hasOwnProperty (Fe)) {
		var b=a.closure_hashCode_;
		if(b)return b
	}a.closure_hashCode_||(a.closure_hashCode_=++He);
	return a.closure_hashCode_
}var He=0;
function r(a,b) {
	var c=a.MB;
	if(arguments.length>2) {
		var d=Array.prototype.slice.call(arguments,2);
		c&&d.unshift.apply(d,c);
		c=d
	}b=a.OB||b;
	a=a.NB||a;
	var f=b||he;
	d=c?function () {
		var g=Array.prototype.slice.call(arguments);
		g.unshift.apply(g,c);
		return a.apply(f,g)
	}:function () {
		return a.apply(f,arguments)
	};
	d.MB=c;
	d.OB=b;
	d.NB=a;
	return d
}function t(a) {
	var b=Array.prototype.slice.call(arguments,1);
	b.unshift(a,h);
	return r.apply(h,b)
}
var Ie=Date.now||function () {
	return (new Date).getTime()
},Je="\\{\\$",Ke="\\}",Le="gi";
function u(a,b) {
	b=b||{
	};
	for(var c in b)a=a.replace(new RegExp(Je+c+Ke,Le),b[c]);return a
}function Me(a,b,c) {
	ke(a,b,c)
}function Ne(a,b,c) {
	a[b]=c
}function v(a,b) {
	function c() {
	}c.prototype=b.prototype;
	a.d=b.prototype;
	a.prototype=new c;
	a.prototype.constructor =a
}
function Oe(a,b,c) {
	if(a.indexOf)return a.indexOf(b,c);
	if(Array.indexOf)return Array.indexOf(a,b,c);
	c=c==h?0:c<0?Math.max(0,a.length+c):c;
	for(c=c;c<a.length;c++)if(c in a&&a[c]===b)return c;return -1
}function Pe(a,b,c) {
	if(a.forEach)a.forEach(b,c);
	else if(Array.forEach)Array.forEach(a,b,c);
	else {
		var d=a.length,f=Ce(a)?a.split(n):a;
		for(var g=0;g<d;g++)g in f&&b.call(c,f[g],g,a)
	}
}
function Qe(a,b,c) {
	if(a.filter)return a.filter(b,c);
	if(Array.filter)return Array.filter(a,b,c);
	var d=a.length,f=[],g=0,k=Ce(a)?a.split(n):a;
	for(var l=0;l<d;l++)if(l in k) {
		var p=k[l];
		if(b.call(c,p,l,a))f[g++]=p
	}return f
}function Re(a,b,c) {
	if(a.map)return a.map(b,c);
	if(Array.map)return Array.map(a,b,c);
	var d=a.length,f=[],g=0,k=Ce(a)?a.split(n):a;
	for(var l=0;l<d;l++)if(l in k)f[g++]=b.call(c,k[l],l,a);return f
}
function Se(a,b,c,d) {
	if(a.reduce)return d?a.reduce(r(b,d),c):a.reduce(b,c);
	var f=c;
	Pe(a,function (g,k) {
		f=b.call(d,f,g,k,a)
	});
	return f
}function Te(a,b,c) {
	if(a.some)return a.some(b,c);
	if(Array.some)return Array.some(a,b,c);
	var d=a.length,f=Ce(a)?a.split(n):a;
	for(var g=0;g<d;g++)if(g in f&&b.call(c,f[g],g,a))return i;return e
}
function Ue(a,b,c) {
	if(a.every)return a.every(b,c);
	if(Array.every)return Array.every(a,b,c);
	var d=a.length,f=Ce(a)?a.split(n):a;
	for(var g=0;g<d;g++)if(g in f&&!b.call(c,f[g],g,a))return e;return i
}function Ve(a,b) {
	if(a.contains)return a.contains(b);
	return Oe(a,b)>-1
}function We(a,b) {
	Ve(a,b)||a.push(b)
}function Xe(a,b,c) {
	Ye(a,c,0,b)
}function Ze(a,b) {
	b=Oe(a,b);
	var c;
	if(c=b!=-1)$e(a,b);
	return c
}function $e(a,b) {
	return Array.prototype.splice.call(a,b,1).length==1
}
function af(a) {
	if(ze(a))return a.concat();
	else {
		var b=[];
		for(var c=0,d=a.length;c<d;c++)b[c]=a[c];return b
	}
}function bf(a) {
	if(ze(a))return a.concat();
	return af(a)
}function cf(a) {
	for(var b=1;b<arguments.length;b++) {
		var c=arguments[b];
		if(Ae(c)) {
			c=bf(c);
			a.push.apply(a,c)
		}else a.push(c)
	}
}function Ye(a) {
	return Array.prototype.splice.apply(a,df(arguments,1))
}function df(a,b,c) {
	return arguments.length<=2?Array.prototype.slice.call(a,b):Array.prototype.slice.call(a,b,c)
}
function ef(a,b) {
	Array.prototype.sort.call(a,b||ff)
}function ff(a,b) {
	return a>b?1:a<b?-1:0
}var gf;
function hf(a,b) {
	a.className=b
}function jf(a) {
	return (a=a.className)&&typeofa.split==te?a.split(o):[]
}function w(a) {
	var b=jf(a),c=1;
	for(var d=1;d<arguments.length;d++)if(Ve(b,arguments[d]))c&=0;else {
		b.push(arguments[d]);
		c&=1
	}a.className=b.join(o);
	return Boolean(c)
}
function x(a) {
	var b=jf(a),c=df(arguments,1),d=0;
	for(var f=0;f<b.length;f++)if(Ve(c,b[f])) {
		Ye(b,f--,1);
		d++
	}a.className=b.join(o);
	return d==c.length
}function kf(a,b,c) {
	var d=jf(a),f=e;
	for(var g=0;g<d.length;g++)if(d[g]==b) {
		Ye(d,g--,1);
		f=i
	}if(f) {
		d.push(c);
		a.className=d.join(o)
	}return f
}function lf(a,b) {
	return Ve(jf(a),b)
}function y(a,b,c) {
	c?w(a,b):x(a,b)
}function mf(a,b) {
	return a.indexOf(b)==0
}function nf(a,b) {
	var c=a.length-b.length;
	return c>=0&&a.lastIndexOf(b,c)==c
}var of="$$$$";
function pf(a) {
	for(var b=1;b<arguments.length;b++) {
		var c=String(arguments[b]).replace(/\$/g,of);
		a=a.replace(/\%s/,c)
	}return a
}function qf(a) {
	return a.replace(/[\s\xa0]+/g,o).replace(/^\s+|\s+$/g,n)
}function rf(a) {
	return /^[\s\xa0]*$/.test(a)
}function sf(a) {
	return rf(a==h?n:String(a))
}var tf="\n";
function uf(a) {
	return a.replace(/(\r\n|\r|\n)/g,tf)
}function vf(a) {
	return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,n)
}function wf(a,b) {
	a=String(a).toLowerCase();
	b=String(b).toLowerCase();
	return a<b?-1:a==b?0:1
}
var xf=/^[a-zA-Z0-9\-_.!~*'()]*$/;function yf(a) {a=String(a);if(!xf.test(a))return encodeURIComponent(a);return a}function zf(a) {return decodeURIComponent(a.replace(/\+/g,o))}var Af="<br />",Bf="<br>";function Cf(a,b) {return a.replace(/(\r\n|\r|\n)/g,b?Af:Bf)}var Df="&amp;",Ef="&lt;",Ff="&gt;",Gf="&quot;",Hf="&",If="<",Jf=">",Kf='"';
function Lf(a,b) {
	if(b)return a.replace(Mf,Df).replace(Nf,Ef).replace(Of,Ff).replace(Pf,Gf);
	else {
		if(!Qf.test(a))return a;
		if(a.indexOf(Hf)!=-1)a=a.replace(Mf,Df);
		if(a.indexOf(If)!=-1)a=a.replace(Nf,Ef);
		if(a.indexOf(Jf)!=-1)a=a.replace(Of,Ff);
		if(a.indexOf(Kf)!=-1)a=a.replace(Pf,Gf);
		return a
	}
}var Mf=/&/g,Nf=/</g,Of=/>/g,Pf=/\"/g,Qf=/[&<>\"]/,Rf="document";
function Sf(a) {
	if(a.indexOf(Hf)!=-1)return Rf in he&&!(a.indexOf(If)!=-1)?Tf(a):Uf(a);
	return a
}var Vf="a";
function Tf(a) {
	var b=he.document.createElement(Vf);
	b.innerHTML=a;
	b.normalize&&b.normalize();
	a=b.firstChild.nodeValue;
	b.innerHTML=n;
	return a
}var Wf="amp",Xf="lt",Yf="gt",Zf="quot",$f="#";
function Uf(a) {
	return a.replace(/&([^;
	]+);
	/g,function (b,c) {
		switch(c) {
			case Wf:return Hf;
			case Xf:return If;
			case Yf:return Jf;
			case Zf:return Kf;
			default:if(c.charAt(0)==$f) {
				c=Number(ca+c.substr(1));
				if(!isNaN(c))return String.fromCharCode(c)
			}return b
		}
	})
}var ag="...";
function bg(a,b,c) {
	if(c)a=Sf(a);
	if(a.length>b)a=a.substring(0,b-3)+ag;
	if(c)a=Lf(a);
	return a
}var cg={
	"\u0008":"\\b","\u000c":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\u000b":"\\x0B",'"':'\\"',"'":"\\'","\\":"\\\\"
};
function dg(a) {
	a=String(a);
	if(a.quote)return a.quote();
	else {
		var b=[Kf];
		for(var c=0;c<a.length;c++)b[c+1]=eg(a.charAt(c));b.push(Kf);return b.join(n)
	}
}var fg="\\x",gg="\\u";
function eg(a) {
	if(a in cg)return cg[a];
	var b=a,c=a.charCodeAt(0);
	if(c>31&&c<127)b=a;
	else {
		if(c<256) {
			b=fg;
			if(c<16||c>256)b+=ca
		}else {
			b=gg;
			if(c<4096)b+=ca
		}b+=c.toString (16).toUpperCase()
	}return cg[a]=b
}var hg="\\$1",ig="\\x08";
function jg(a) {
	return String(a).replace(/([-()\[\]{
	}+?*.$\^|,:#<!\\])/g,hg).replace(/\x08/g,ig)
}var kg="(\\d*)(\\D*)",lg="g";
function mg(a,b) {
	var c=0;
	a=vf(String(a)).split(ie);
	b=vf(String(b)).split(ie);
	var d=Math.max(a.length,b.length);
	for(var f=0;c==0&&f<d;f++) {
		var g=a[f]||n,k=b[f]||n,l=new RegExp(kg,lg),p=new RegExp(kg,lg);
		do{
			var s=l.exec(g)||[n,n,n],A=p.exec(k)||[n,n,n];
			if(s[0].length==0&&A[0].length==0)break;
			c=s[1].length==0?0:parseInt(s[1],10);
			var I=A[1].length==0?0:parseInt(A[1],10);
			c=ng(c,I)||ng(s[2].length==0,A[2].length==0)||ng(s[2],A[2])
		}while(c==0)
	}return c
}
function ng(a,b) {
	if(a<b)return -1;
	else if(a>b)return 1;
	return 0
}if("StopIteration" in he)var pg=he.StopIteration;
else pg=Error("StopIteration");
function qg() {
}qg.prototype.next=function () {
	j(pg)
};
qg.prototype.ji=function () {
	return this
};
function rg(a) {
	if(ainstanceofqg)return a;
	if(typeofa.ji==te)return a.ji(e);
	if(Ae(a)) {
		var b=0,c=new qg;
		c.next=function () {
			while(i) {
				if(b>=a.length)j(pg);
				if(!(b in a)) {
					b++;
					continue
				}return a[b++]
			}
		};
		return c
	}j(Error("Not implemented"))
}
function sg(a,b,c) {
	if(Ae(a))try{
		Pe(a,b,c)
	}catch(d) {
		if(d!==pg)j(d)
	}else {
		a=rg(a);
		try{
			while(i)b.call(c,a.next(),undefined,a)
		}catch(d) {
			if(d!==pg)j(d)
		}
	}
}function tg(a,b,c) {
	a=rg(a);
	try{
		while(i)if(b.call(c,a.next(),undefined,a))return i
	}catch(d) {
		if(d!==pg)j(d)
	}return e
}function ug(a,b,c) {
	for(var d in a)b.call(c,a[d],d,a)
}function vg(a) {
	var b=0;
	for(var c in a)b++;return b
}function wg(a) {
	var b=[],c=0;
	for(var d in a)b[c++]=a[d];return b
}function xg(a) {
	var b=[],c=0;
	for(var d in a)b[c++]=d;return b
}
function yg(a,b) {
	for(var c in a)if(a[c]==b)return i;return e
}function zg(a) {
	for(var b in a)return e;return i
}function Ag(a,b) {
	var c;
	if(c=b in a)delete a[b];
	return c
}function Bg(a,b,c) {
	if(b in a)j(Error('The object already contains the key "'+b+Kf));
	Cg(a,b,c)
}function Dg(a,b,c) {
	if(b in a)return a[b];
	return c
}function Cg(a,b,c) {
	a[b]=c
}function Eg(a) {
	var b={
	},c=xg(a);
	for(var d=0,f=c.length;d<f;d++) {
		var g=c[d];
		b[a[g]]=g
	}return b
}
var Fg=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"];
function Gg(a) {
	var b,c;
	for(var d=1;d<arguments.length;d++) {
		c=arguments[d];
		for(b in c)a[b]=c[b];for(var f=0;f<Fg.length;f++) {
			b=Fg[f];
			if(Object.prototype.hasOwnProperty .call(c,b))a[b]=c[b]
		}
	}
}var Hg="Uneven number of arguments";
function Ig() {
	var a=arguments.length;
	if(a==1&&ze(arguments[0]))return Ig.apply(h,arguments[0]);
	if(a%2)j(Error(Hg));
	var b={
	};
	for(var c=0;c<a;c+=2)b[arguments[c]]=arguments[c+1];return b
}function Jg(a) {
	if(typeofa.wc==te)return a.wc();
	if(Ae(a)||Ce(a))return a.length;
	return vg(a)
}function Kg(a) {
	if(typeofa.hc==te)return a.hc();
	if(Ce(a))return a.split(n);
	if(Ae(a)) {
		var b=[],c=a.length;
		for(var d=0;d<c;d++)b.push(a[d]);return b
	}return wg(a)
}
function Lg(a) {
	if(typeofa.ph==te)return a.ph();
	if(typeofa.hc==te)return undefined;
	if(Ae(a)||Ce(a)) {
		var b=[];
		a=a.length;
		for(var c=0;c<a;c++)b.push(c);return b
	}return xg(a)
}function Mg(a,b) {
	if(typeofa.contains==te)return a.contains(b);
	if(typeofa.vo==te)return a.vo(b);
	if(Ae(a)||Ce(a))return Ve(a,b);
	return yg(a,b)
}function Ng(a,b,c) {
	if(typeofa.forEach==te)a.forEach(b,c);
	else if(Ae(a)||Ce(a))Pe(a,b,c);
	else {
		var d=Lg(a),f=Kg(a),g=f.length;
		for(var k=0;k<g;k++)b.call(c,f[k],d&&d[k],a)
	}
}
function Og(a,b,c) {
	if(typeofa.every==te)return a.every(b,c);
	if(Ae(a)||Ce(a))return Ue(a,b,c);
	var d=Lg(a),f=Kg(a),g=f.length;
	for(var k=0;k<g;k++)if(!b.call(c,f[k],d&&d[k],a))return e;return i
}function Pg(a) {
	this.ta={
	};
	this.I=[];
	var b=arguments.length;
	if(b>1) {
		if(b%2)j(Error(Hg));
		for(var c=0;c<b;c+=2)this.set(arguments[c],arguments[c+1])
	}else a&&this.Pn(a)
}m=Pg.prototype;m.Z=0;m.mk=0;m.wc=function () {
	return this.Z
};
m.hc=function () {
	this.qi();
	var a=[];
	for(var b=0;b<this.I.length;b++)a.push(this.ta[this.I[b]]);return a
};m.ph=function () {
	this.qi();
	return this.I.concat()
};
m.De=function (a) {
	return Qg(this.ta,a)
};
m.vo=function (a) {
	for(var b=0;b<this.I.length;b++) {
		var c=this.I[b];
		if(Qg(this.ta,c)&&this.ta[c]==a)return i
	}return e
};
m.G=function (a,b) {
	if(this===a)return i;
	if(this.Z!=a.wc())return e;
	b=b||Rg;
	this.qi();
	for(var c,d=0;c=this.I[d];d++)if(!b(this.N(c),a.N(c)))return e;return i
};function Rg(a,b) {
	return a===b
}m=Pg.prototype;
m.clear=function () {
	this.ta={
	};
	this.Z=this.I.length=0;
	this.mk=0
};
m.remove=function (a) {
	if(Qg(this.ta,a)) {
		delete this.ta[a];
		this.Z--;
		this.mk++;
		this.I.length>2*this.Z&&this.qi();
		return i
	}return e
};
m.qi=function () {
	if(this.Z!=this.I.length) {
		var a=0,b=0;
		while(a<this.I.length) {
			var c=this.I[a];
			if(Qg(this.ta,c))this.I[b++]=c;
			a++
		}this.I.length=b
	}if(this.Z!=this.I.length) {
		var d={
		},a=0,b=0;
		while(a<this.I.length) {
			var c=this.I[a];
			if(!Qg(d,c)) {
				this.I[b++]=c;
				d[c]=1
			}a++
		}this.I.length=b
	}
};
m.N=function (a,b) {
	if(Qg(this.ta,a))return this.ta[a];
	return b
};
m.set=function (a,b) {
	if(!Qg(this.ta,a)) {
		this.Z++;
		this.I.push(a);
		this.mk++
	}this.ta[a]=b
};
m.Pn=function (a) {
	var b;
	if(ainstanceofPg) {
		b=a.ph();
		a=a.hc()
	}else {
		b=xg(a);
		a=wg(a)
	}for(var c=0;c<b.length;c++)this.set(b[c],a[c])
};m.Rc=function () {
	return new Pg(this)
};
m.ji=function (a) {
	this.qi();
	var b=0,c=this.I,d=this.ta,f=this.mk,g=this,k=new qg;
	k.next=function () {
		while(i) {
			if(f!=g.mk)j(Error("The map has changed since the iterator was created"));
			if(b>=c.length)j(pg);
			var l=c[b++];
			return a?l:d[l]
		}
	};
	return k
};
if(Object.prototype.hasOwnProperty )var Qg=function (a,b) {
	return Object.prototype.hasOwnProperty .call(a,b)
};
else Qg=function (a,b) {
	return b in a&&a[b]!==Object.prototype[b]
};
function Sg(a,b) {
	if(ainstanceofSg) {
		this.$h(b==h?a.Ad:b);
		this.fn(a.qp());
		this.kn(a.Mg);
		this.Ym(a.Ie);
		this.cn(a.sf);
		this.bn(a.bb);
		this.dn(a.mc.Rc());
		this.$m(a.Sf)
	}else if(a&&(a=String(a).match(Tg()))) {
		this.$h(!!b);
		this.fn(a[1],i);
		this.kn(a[2],i);
		this.Ym(a[3],i);
		this.cn(a[4]);
		this.bn(a[5],i);
		this.dn(a[6]);
		this.$m(a[7],i)
	}else {
		this.$h(!!b);
		this.mc=new Ug(h,this,this.Ad)
	}
}m=Sg.prototype;
m.Fc=n;
m.Mg=n;
m.Ie=n;
m.sf=h;
m.bb=n;
m.Sf=n;
m.OG=e;
m.Ad=e;
var Vg="//",Wg="@",Xg="?";
m.toString =function () {
	if(this.ub)return this.ub;
	var a=[];
	this.Fc&&a.push(Yg(this.Fc,Zg),ga);
	if(this.Ie) {
		a.push(Vg);
		this.Mg&&a.push(Yg(this.Mg,Zg),Wg);
		a.push($g(this.Ie));
		this.sf!=h&&a.push(ga,String(this.sf))
	}this.bb&&a.push(Yg(this.bb,ah));
	var b=String(this.mc);
	b&&a.push(Xg,b);
	this.Sf&&a.push($f,Yg(this.Sf,bh));
	return this.ub=a.join(n)
};
var ch="/";
m.Nm=function (a) {
	var b=this.Rc(),c=a.DF();
	if(c)b.fn(a.qp());
	else c=a.FF();
	if(c)b.kn(a.Mg);
	else c=a.Qv();
	if(c)b.Ym(a.Ie);
	else c=a.BF();
	var d=a.bb;
	if(c)b.cn(a.sf);
	else {
		if(c=a.Tv()) {
			if(d.charAt(0)!=ch)if(this.Qv()&&!this.Tv())d=ch+d;
			else {
				var f=b.bb.lastIndexOf(ch);
				if(f!=-1)d=b.bb.substr(0,f+1)+d
			}d=dh(d)
		}
	}if(c)b.bn(d);
	else c=a.CF();
	if(c)b.dn(a.Bb());
	else c=a.vF();
	c&&b.$m(a.Sf);
	return b
};
m.Rc=function () {
	return eh(this.Fc,this.Mg,this.Ie,this.sf,this.bb,this.mc.Rc(),this.Sf,this.Ad)
};
m.qp=function () {
	return this.Fc
};
m.fn=function (a,b) {
	this.Me();
	delete this.ub;
	if(this.Fc=b?a?decodeURIComponent(a):n:a)this.Fc=this.Fc.replace(/:$/,n);
	return this
};
m.DF=function () {
	return !!this.Fc
};
m.kn=function (a,b) {
	this.Me();
	delete this.ub;
	this.Mg=b?a?decodeURIComponent(a):n:a;
	return this
};
m.FF=function () {
	return !!this.Mg
};
m.Ym=function (a,b) {
	this.Me();
	delete this.ub;
	this.Ie=b?a?decodeURIComponent(a):n:a;
	return this
};
m.Qv=function () {
	return !!this.Ie
};
m.cn=function (a) {
	this.Me();
	delete this.ub;
	if(a) {
		a=Number(a);
		if(isNaN(a)||a<0)j(Error("Bad port number "+a));
		this.sf=a
	}else this.sf=h;
	return this
};
m.BF=function () {
	return this.sf!=h
};
m.bn=function (a,b) {
	this.Me();
	delete this.ub;
	this.bb=b?a?decodeURIComponent(a):n:a;
	return this
};
m.Tv=function () {
	return !!this.bb
};
m.CF=function () {
	return this.mc.toString ()!==n
};
m.dn=function (a) {
	this.Me();
	delete this.ub;
	if(ainstanceofUg) {
		this.mc=a;
		this.mc.fi=this;
		this.mc.$h(this.Ad)
	}else this.mc=new Ug(a,this,this.Ad);
	return this
};
m.Bb=function () {
	return this.mc.toString ()
};
m.cb=function (a,b) {
	this.Me();
	delete this.ub;
	this.mc.set(a,b);
	return this
};
m.tE=function (a) {
	return this.mc.N(a)
};
m.$m=function (a,b) {
	this.Me();
	delete this.ub;
	this.Sf=b?a?decodeURIComponent(a):n:a;
	return this
};
m.vF=function () {
	return !!this.Sf
};
m.Me=function () {
	if(this.OG)j(Error("Tried to modify a read-only Uri"))
};
m.$h=function (a) {
	this.Ad=a;
	this.mc&&this.mc.$h(a)
};
function eh(a,b,c,d,f,g,k,l) {
	l=new Sg(h,l);
	a&&l.fn(a);
	b&&l.kn(b);
	c&&l.Ym(c);
	d&&l.cn(d);
	f&&l.bn(f);
	g&&l.dn(g);
	k&&l.$m(k);
	return l
}var fh="..",gh="./",hh="/.";
function dh(a) {
	if(a==fh||a==ie)return n;
	else if(!(a.indexOf(gh)!=-1)&&!(a.indexOf(hh)!=-1))return a;
	else {
		var b=mf(a,ch);
		a=a.split(ch);
		var c=[];
		for(var d=0;d<a.length;) {
			var f=a[d++];
			if(f==ie)b&&d==a.length&&c.push(n);
			else if(f==fh) {
				if(c.length>1||c.length==1&&c[0]!=n)c.pop();
				b&&d==a.length&&c.push(n)
			}else {
				c.push(f);
				b=i
			}
		}return c.join(ch)
	}
}
function $g(a) {
	if(Ce(a))return encodeURIComponent(a);
	return h
}var ih=/^[a-zA-Z0-9\-_.!~*'():\/;?]*$/;function Yg(a,b) {var c=h;if(Ce(a)) {c=a;ih.test(c)||(c=encodeURI(a));if(c.search(b)>=0)c=c.replace(b,jh)}return c}var kh="%";function jh(a) {a=a.charCodeAt(0);return kh+(a>>4&15).toString(16)+(a&15).toString(16)}var lh=h;function Tg() {lh||(lh=/^(?:([^:\/?#]+):)?(?:\/\/(?:([^\/?#]*)@)?([^\/?#:@]*)(?::([0-9]+))?)?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/);return lh}
var Zg=/[#\/\?@]/g,ah=/[\#\?]/g,bh=/#/g,mh="=";
function Ug(a,b,c) {
	this.Fa=new Pg;
	this.fi=b||h;
	this.Ad=!!c;
	if(a) {
		a=a.split(Hf);
		for(b=0;b<a.length;b++) {
			c=a[b].indexOf(mh);
			var d=h,f=h;
			if(c>=0) {
				d=a[b].substring(0,c);
				f=a[b].substring(c+1)
			}else d=a[b];
			d=zf(d);
			d=this.$f(d);
			this.add(d,f?zf(f):n)
		}
	}
}m=Ug.prototype;
m.Z=0;
m.wc=function () {
	return this.Z
};
m.add=function (a,b) {
	this.gj();
	a=this.$f(a);
	if(this.De(a)) {
		var c=this.Fa.N(a);
		ze(c)?c.push(b):this.Fa.set(a,[c,b])
	}else this.Fa.set(a,b);
	this.Z++;
	return this
};
m.remove=function (a) {
	a=this.$f(a);
	if(this.Fa.De(a)) {
		this.gj();
		var b=this.Fa.N(a);
		if(ze(b))this.Z-=b.length;
		else this.Z--;
		return this.Fa.remove(a)
	}return e
};
m.clear=function () {
	this.gj();
	this.Fa.clear();
	this.Z=0
};
m.De=function (a) {
	a=this.$f(a);
	return this.Fa.De(a)
};
m.vo=function (a) {
	var b=this.hc();
	return Ve(b,a)
};
m.ph=function () {
	var a=this.Fa.hc(),b=this.Fa.ph(),c=[];
	for(var d=0;d<b.length;d++) {
		var f=a[d];
		if(ze(f))for(var g=0;g<f.length;g++)c.push(b[d]);else c.push(b[d])
	}return c
};
m.hc=function (a) {
	if(a) {
		a=this.$f(a);
		if(this.De(a)) {
			var b=this.Fa.N(a);
			if(ze(b))return b;
			else {
				a=[];
				a.push(b)
			}
		}else a=[]
	}else {
		b=this.Fa.hc();
		a=[];
		for(var c=0;c<b.length;c++) {
			var d=b[c];
			ze(d)?cf(a,d):a.push(d)
		}
	}return a
};
m.set=function (a,b) {
	this.gj();
	a=this.$f(a);
	if(this.De(a)) {
		var c=this.Fa.N(a);
		if(ze(c))this.Z-=c.length;
		else this.Z--
	}this.Fa.set(a,b);
	this.Z++;
	return this
};
m.N=function (a,b) {
	a=this.$f(a);
	if(this.De(a)) {
		a=this.Fa.N(a);
		return ze(a)?a[0]:a
	}else return b
};
m.toString =function () {
	if(this.ub)return this.ub;
	var a=[],b=0,c=this.Fa.ph();
	for(var d=0;d<c.length;d++) {
		var f=c[d],g=yf(f);
		f=this.Fa.N(f);
		if(ze(f))for(var k=0;k<f.length;k++) {
			b>0&&a.push(Hf);
			a.push(g,mh,yf(f[k]));
			b++
		}else {
			b>0&&a.push(Hf);
			a.push(g,mh,yf(f));
			b++
		}
	}return this.ub=a.join(n)
};
m.gj=function () {
	delete this.ub;
	this.fi&&delete this.fi.ub
};
m.Rc=function () {
	var a=new Ug;
	a.Fa=this.Fa.Rc();
	return a
};
m.$f=function (a) {
	a=String(a);
	if(this.Ad)a=a.toLowerCase();
	return a
};
m.$h=function (a) {
	if(a&&!this.Ad) {
		this.gj();
		Ng(this.Fa,function (b,c) {
			var d=c.toLowerCase();
			if(c!=d) {
				this.remove(c);
				this.add(d,b)
			}
		},this)
	}this.Ad=a
};
function nh(a,b) {
	this.x=le(a)?a:0;
	this.y=le(b)?b:0
}nh.prototype.Rc=function () {
	return new nh(this.x,this.y)
};
var oh="(",ph=")";
nh.prototype.toString =function () {
	return oh+this.x+fa+this.y+ph
};
function qh(a,b) {
	this.width=a;
	this.height=b
}function rh(a,b) {
	if(a==b)return i;
	if(!a||!b)return e;
	return a.width==b.width&&a.height==b.height
}m=qh.prototype;
m.Rc=function () {
	return new qh(this.width,this.height)
};
var sh=" x ";
m.toString =function () {
	return oh+this.width+sh+this.height+ph
};
m.ceil=function () {
	this.width=Math.ceil(this.width);
	this.height=Math.ceil(this.height);
	return this
};
m.floor=function () {
	this.width=Math.floor(this.width);
	this.height=Math.floor(this.height);
	return this
};
m.round=function () {
	this.width=Math.round(this.width);
	this.height=Math.round(this.height);
	return this
};
var th,uh,vh,wh,xh,yh,zh,Ah,Bh,Ch,Dh;
function Eh() {
	if(he.navigator)return he.navigator.userAgent;
	return h
}var Fh="Opera",Gh="MSIE",Hh="WebKit",Ih="Mobile",Jh="Gecko",Kh="Camino",Lh="Mac",Mh="Win",Nh="Linux";
(function () {
	var a=e,b=e,c=e,d=e,f=e,g=e,k=e,l=e,p=e,s=n,A=Eh();
	if(A) {
		g=he.navigator;
		a=A.indexOf(Fh)==0;
		b=!a&&A.indexOf(Gh)!=-1;
		p=(c=!a&&A.indexOf(Hh)!=-1)&&A.indexOf(Ih)!=-1;
		f=(d=!a&&!c&&g.product==Jh)&&g.vendor==Kh;
		var I,L;
		if(he.opera&&typeofhe.opera.version==te)I=he.opera.version();
		else {
			if(d)L=/rv\:([^\);
			]+)(\)|;
			)/;
			else if(b)L=/MSIE\s+([^\);
			]+)(\)|;
			)/;
			else if(c)L=/WebKit\/(\S+)/;
			if(L) {
				L.test(A);
				I=RegExp.$1
			}
		}s=g.platform||n;
		g=s.indexOf(Lh)!=-1;
		k=s.indexOf(Mh)!=-1;
		l=s.indexOf(Nh)!=-1
	}th=a;
	uh=b;
	vh=
	d;
	wh=f;
	xh=c;
	yh=p;
	zh=I;
	Ah=s;
	Bh=g;
	Ch=k;
	Dh=l
})();
var Oh=th,z=uh,Ph=vh,Qh=xh,Rh=yh;
function Sh(a) {
	return mg(zh,a)>=0
}function Th() {
	gf||(gf=new Uh);
	return gf
}function Vh(a) {
	return a?new Uh(Wh(a)):Th()
}function Xh(a) {
	return Ce(a)?document.getElementById(a):a
}var Yh=Xh;
function Zh(a,b,c) {
	return Th().ZD(a,b,c)
}var $h="style",ai="class",bi="for";
function ci(a,b) {
	ug(b,function (c,d) {
		if(d==$h)a.style.cssText=c;
		else if(d==ai)a.className=c;
		else if(d==bi)a.htmlFor=c;
		else if(d in di)a.setAttribute(di[d],c);
		else a[d]=c
	})
}var ei="height",fi="width",di={
	cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",rowspan:"rowSpan",valign:"vAlign",height:ei,width:fi,usemap:"useMap",frameborder:"frameBorder"
},hi="500",ii="CSS1Compat",ji="9.50";
function ki(a) {
	a=a||he||window;
	var b=a.document;
	if(Qh&&!Sh(hi)&&!Rh) {
		if(typeofa.innerHeight=="undefined")a=window;
		b=a.innerHeight;
		var c=a.document.documentElement.scrollHeight;
		if(a==a.top)if(c<b)b-=15;
		return new qh(a.innerWidth,b)
	}a=Vh(b).Iu()==ii&&(!Oh||Oh&&Sh(ji))?b.documentElement:b.body;
	return new qh(a.clientWidth,a.clientHeight)
}function li(a) {
	return Vh(a).Bv()
}function mi() {
	var a=Th();
	return a.o.apply(a,arguments)
}var ni=mi;
function oi(a) {
	return Th().OF(a)
}
function pi(a,b) {
	a.appendChild(b)
}function qi(a) {
	var b;
	while(b=a.firstChild)a.removeChild(b)
}function ri(a,b) {
	b.parentNode&&b.parentNode.insertBefore(a,b)
}function si(a,b) {
	b.parentNode&&b.parentNode.insertBefore(a,b.nextSibling)
}function B(a) {
	return a&&a.parentNode?a.parentNode.removeChild(a):h
}function ti(a,b) {
	var c=b.parentNode;
	c&&c.replaceChild(a,b)
}function ui(a) {
	return vi(a.firstChild,i)
}function vi(a,b) {
	while(a&&a.nodeType!=1)a=b?a.nextSibling:a.previousSibling;
	return a
}
var wi=Qh&&mg(zh,"521")<=0;
function xi(a,b) {
	if(typeofa.contains!="undefined"&&!wi&&b.nodeType==1)return a==b||a.contains(b);
	if(typeofa.compareDocumentPosition!="undefined")return a==b||Boolean(a.compareDocumentPosition(b)&16);
	while(b&&a!=b)b=b.parentNode;
	return b==a
}function Wh(a) {
	return a.nodeType==9?a:a.ownerDocument||a.document
}function yi(a) {
	return a=Qh?a.document||a.contentWindow.document:a.contentDocument||a.contentWindow.document
}var zi="textContent";
function Ai(a,b) {
	if(zi in a)a.textContent=b;
	else if(a.firstChild&&a.firstChild.nodeType==3) {
		while(a.lastChild!=a.firstChild)a.removeChild(a.lastChild);
		a.firstChild.data=b
	}else {
		qi(a);
		var c=Wh(a);
		a.appendChild(c.createTextNode(b))
	}
}function Bi(a,b) {
	var c=[];
	Ci(a,b,c,i);
	return c.length?c[0]:undefined
}function Ci(a,b,c,d) {
	if(a!=h)for(var f=0,g;g=a.childNodes[f];f++) {
		if(b(g)) {
			c.push(g);
			if(d)return
		}Ci(g,b,c,d)
	}
}var Di={
	SCRIPT:1,STYLE:1,HEAD:1,IFRAME:1,OBJECT:1
},Ei={
	IMG:o,BR:tf
},Fi="tabindex";
function Gi(a) {
	var b=a.getAttributeNode(Fi);
	if(b&&b.specified) {
		a=a.tabIndex;
		return typeofa==qe&&a>=0
	}return e
}var Hi="tabIndex";
function Ii(a,b) {
	if(b)a.tabIndex=0;
	else a.removeAttribute(Hi)
}var Ji="innerText";
function Ki(a) {
	if(z&&Ji in a)a=uf(a.innerText);
	else {
		var b=[];
		Li(a,b,i);
		a=b.join(n)
	}a=a.replace(/\xAD/g,n);
	a=a.replace(/+/g,o);
	if(a!=o)a=a.replace(/^\s/,n);
	return a
}
function Li(a,b,c) {
	if(!(a.nodeName in Di))if(a.nodeType==3)c?b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g,n)):b.push(a.nodeValue);
	else if(a.nodeName in Ei)b.push(Ei[a.nodeName]);
	else {
		a=a.firstChild;
		while(a) {
			Li(a,b,c);
			a=a.nextSibling
		}
	}
}function Mi(a) {
	if(a&&typeofa.length==qe)if(Ee(a))return typeofa.item==te||typeofa.item==Be;
	else if(De(a))return typeofa.item==te;
	return e
}function Uh(a) {
	this.z=a||he.document||document
}m=Uh.prototype;
m.e=function (a) {
	return Ce(a)?this.z.getElementById(a):a
};
var Ni="*",Oi="528";
m.ZD=function (a,b,c) {
	c=c||this.z;
	a=a&&a!=Ni?a.toLowerCase():n;
	if(c.querySelectorAll&&(a||b)&&(!Qh||this.Iu()==ii||Sh(Oi)))return c.querySelectorAll(a+(b?ie+b:n));
	if(b&&c.getElementsByClassName) {
		c=c.getElementsByClassName(b);
		if(a) {
			var d=[];
			for(var f=0,g;g=c[f];f++)a==g.nodeName.toLowerCase()&&d.push(g);return d
		}else return c
	}c=c.getElementsByTagName(a||Ni);if(b) {
		var d=[];
		for(var f=0,g;g=c[f];f++) {
			a=g.className;
			typeofa.split==te&&Ve(a.split(o),b)&&d.push(g)
		}return d
	}else return c
};
var Pi=' name="',Qi='">';
m.o=function (a,b) {
	if(z&&b&&b.name)a=If+a+Pi+Lf(b.name)+Qi;
	var c=this.createElement(a);
	b&&ci(c,b);
	if(arguments.length>2) {
		function d(k) {
			if(k)this.appendChild(c,Ce(k)?this.createTextNode(k):k)
		}for(var f=2;f<arguments.length;f++) {
			var g=arguments[f];
			Ae(g)&&!(Ee(g)&&g.nodeType>0)?Pe(Mi(g)?af(g):g,d,this):d.call(this,g)
		}
	}return c
};
m.AA=Uh.prototype.o;
m.createElement=function (a) {
	return this.z.createElement(a)
};
m.createTextNode=function (a) {
	return this.z.createTextNode(a)
};
var C="div";
m.OF=function (a) {
	var b=this.z.createElement(C);
	b.innerHTML=a;
	if(b.childNodes.length==1)return b.firstChild;
	else {
		a=this.z.createDocumentFragment();
		while(b.firstChild)a.appendChild(b.firstChild);
		return a
	}
};
var Ri="position:absolute;width:0;height:0;width:1",Si="1px",Ti="BackCompat";
m.Iu=function () {
	if(this.z.compatMode)return this.z.compatMode;
	if(Qh)return this.z.compatMode=this.o(C,{
		style:Ri
	}).style.width==Si?Ti:ii;
	return Ti
};
var Ui="script",Vi="document.parentWindow=window";
m.Bv=function () {
	var a=this.z;
	if(a.parentWindow)return a.parentWindow;
	if(Qh&&!Sh(hi)&&!Rh) {
		var b=a.createElement(Ui);
		b.innerHTML=Vi;
		var c=a.documentElement;
		c.appendChild(b);
		c.removeChild(b);
		return a.parentWindow
	}return a.defaultView
};
m.Xf=function () {
	var a=this.z,b;
	if(!Qh&&a.compatMode==ii) {
		b=a.documentElement.scrollLeft;
		a=a.documentElement.scrollTop
	}else {
		b=a.body.scrollLeft;
		a=a.body.scrollTop
	}return new nh(b,a)
};
m.appendChild=pi;
m.ny=qi;
m.removeNode=B;
m.Su=ui;
m.contains=xi;
var Wi,Xi,Yi="ScriptEngine",Zi="JScript";
(function () {
	var a=e,b=ca;
	if(Yi in he) {
		if(a=he.ScriptEngine()==Zi)b=he.ScriptEngineMajorVersion()+ie+he.ScriptEngineMinorVersion()+ie+he.ScriptEngineBuildVersion()
	}Wi=a;
	Xi=b
})();
function $i(a) {
	this.md=Wi?[]:n;
	a!=h&&this.a.apply(this,arguments)
}$i.prototype.set=function (a) {
	this.clear();
	this.a(a)
};
if(Wi) {
	$i.prototype.io=0;
	$i.prototype.a=function (a,b) {
		if(b==h)this.md[this.io++]=a;
		else {
			this.md.push.apply(this.md,arguments);
			this.io=this.md.length
		}return this
	}
}else $i.prototype.a=function (a,b) {
	this.md+=a;
	if(b!=h)for(var c=1;c<arguments.length;c++)this.md+=arguments[c];return this
};$i.prototype.clear=function () {
	if(Wi) {
		this.io=this.md.length=0
	}else this.md=n
};
$i.prototype.toString =function () {
	if(Wi) {
		var a=this.md.join(n);
		this.clear();
		a&&this.a(a);
		return a
	}else return this.md
};
var D=$i,E=oi;
function F(a) {
	return Lf(String(a))
}function aj() {
}var bj="pop",cj="contains",dj="implementation",ej="createDocument",fj="compatMode",gj="XMLHttpRequest",hj="Wii",ij="Chrome",jj="Android";
function kj() {
	this.mF=document.all?i:e;
	this.AF=bj in Array.prototype;
	this.Pv=cj in document;
	this.rF=dj in document&&ej in document.implementation;
	this.oF=fj in document;
	this.yF=gj in window;
	var a=navigator.userAgent,b=/\(.*\)AppleWebKit\/(.*)\((.*)/.exec(a);
	if(b) {
		this.le=i;
		this.XM=parseInt(b[1],10)
	}else this.le=e;
	this.gf=window.opera;
	this.$G=a.indexOf(hj)!=-1;
	this.Vp=this.le&&a.indexOf(ij)!=-1;
	this.uw=this.le&&a.indexOf(jj)!=-1
}m=kj.prototype;
m.Kc=function () {
	return this.mF&&!this.Pv&&!this.gf
};
m.JA=function () {
	return this.Kc()&&this.AF&&!this.gf
};
m.vs=function () {
	return this.JA()&&this.oF
};
m.ii=function () {
	return this.Kc()&&this.yF
};
var lj="ui=wii";
m.Sd=function () {
	return window.location.search.indexOf(lj)!=-1||this.gf&&this.$G
};
m.Og=function () {
	return this.rF&&!this.Pv&&!this.gf&&!this.le
};
var mj="1.9";
m.ws=function () {
	return this.Og()&&Sh(mj)
};
m.LA=function () {
	return this.Og()&&!this.ws()
};
m.Kn=function () {
	return this.le&&this.XM>=520
};
var nj="wii",oj="mozilla2",pj="mozilla3",qj="safari3";
m.fw=function (a) {
	var b=a||document.body;
	function c(d) {
		w(b,d)
	}this.Kc()&&c(Zc);
	this.vs()&&!this.ii()&&c(ad);
	this.ii()&&c(cd);
	this.gf&&c(kd);
	this.Sd()&&c(nj);
	this.Og()&&c(Xc);
	this.LA()&&c(oj);
	this.ws()&&c(pj);
	this.le&&c(ed);
	this.Kn()&&c(qj);
	this.Vp&&c(id);
	this.uw&&c(gd)
};
var H=new kj;
function J(a,b) {
	return (b||document).getElementById(a)
}function M(a,b,c) {
	a=Zh(c,b,a);
	if(a.length>=1)return a[0];
	else j(Error())
}
function rj(a) {
	if(a==h)j(new Error);
	var b={
	};
	a=a.getElementsByTagName(Ni);
	for(var c=0,d;d=a[c];c++) {
		var f=jf(d);
		for(var g=0;g<f.length;g++) {
			var k=f[g];
			if(!k)continue;
			k in b||(b[k]=[]);
			b[k].push(d)
		}
	}return b
}function N(a,b,c) {
	return c?(new Uh(c)).AA(a,b):ni(a,b)
}function sj(a) {
	return document.createTextNode(a)
}var tj="area";
function uj(a,b) {
	function c(d) {
		for(var f=0;f<d.length;f++)d[f].target=b
	}c(a.getElementsByTagName(Vf));c(a.getElementsByTagName(tj))
}
function vj(a,b) {
	if(b) {
		b=new Date;
		return a.getMonth()==b.getMonth()&&a.getDate()==b.getDate()&&a.getFullYear()==b.getFullYear()||Math.abs(b.getTime()-a.getTime())<43200000?ia(a):ja(a)
	}else return ha(a)
}var wj="seconds ago",xj="1 minute ago",yj="%1 minutes ago",zj="1 hour ago",Aj="%1 hours ago",Bj="yesterday",Cj="%1 days ago";
function Dj(a) {
	var b=new Date,c=b.getTime(),d=a.getTime();
	if(d>c)return h;
	c=Math.floor((c-d)/60000);
	if(c<60)switch(c) {
		case 0:return wj;
		case 1:return xj;
		default:return O(yj,c)
	}c=Math.floor(c/60);
	if(c<24)return c==1?zj:O(Aj,c);
	c=(new Date).getTimezoneOffset()*60000;
	b=(new Date(b.getFullYear(),b.getMonth(),b.getDate())).getTime();
	a=(new Date(a.getFullYear(),a.getMonth(),a.getDate())).getTime();
	a=Math.floor((b+c)/86400000)-Math.floor((a+c)/86400000);
	if(a<7)return a==1?Bj:O(Cj,a);
	return h
}var Ej="+";
function Fj(a,b,c,d) {
	return a=a<c.length?c[a]:O(d,a+(b?Ej:n))
}var Gj="%1";
function O(a,b) {
	if(binstanceofArray) {
		for(var c=0;c<b.length;c++)a=a.replace(kh+(c+1),b[c]);return a
	}else return a.replace(Gj,b)
}var Hj="%1 (%2)";function Ij(a) {
	var b=Dj(a);
	if(b) {
		a=vj(a,i);
		return O(Hj,[a,b])
	}else return vj(a,e)
}function Jj(a) {
	return window.location.protocol+Vg+window.location.host+a
}
var Kj=new RegExp("<(/s*(blockquote|body|center|dd|dir|div|dl|dt|form|h1|h2|h3|h4|h5|h6|head|html|hr|isindex|li|menu|noframes|ol|p|table|td|th|tr|title|ul)[^>]*|s*br[^>]*)>",Le),Lj=/<[^>]*>/gi,Mj=/</g,Nj=/>/g;
function Oj(a,b) {
	if(!a)return n;
	if(b)a=a.replace(Kj,o);
	a=a.replace(Lj,n);
	return a.replace(Mj,Ef).replace(Nj,Ff)
}function Pj(a) {
	return a[a.selectedIndex].value
}function P(a,b,c) {
	a+=a.indexOf(Xg)==-1?Xg:Hf;
	return a+yf(b)+mh+yf(c)
}function Qj(a,b,c) {
	if(a)a+=Hf;
	return a+yf(b)+mh+yf(c)
}
var Q="hidden",Rj="'";
function Sj(a,b) {
	try{
		y(a,Q,!b)
	}catch(c) {
		j("Cannot set display for node"+(a.id?"with id of '"+a.id+Rj:n))
	}
}var Tj="x-";
function Uj(a) {
	if(!a)return n;
	if(a.indexOf(Tj)==0)a=a.substring(2);
	a=a.split(ch);
	return vf(a[0]).toLowerCase()
}function Vj(a,b) {
	if(a.length<=b)return a;
	var c=a.split(/\s+/);
	a=[];
	var d=0;
	for(var f=0;f<c.length&&d<=b;f++) {
		a.push(c[f]);
		d+=c[f].length+(f?1:0)
	}a=a.join(o);
	if(f!=c.length)a+=ag;
	return a
}function Wj() {
	return (new Date).getTime()
}
function Xj(a) {
	var b=[];
	for(var c=0,d;d=a[c];c++)b.push(d[0]+mh+yf(d[1]));return b.join(Hf)
}var Yj=h;function Zj(a) {
	if(!Yj)try{
		Yj=new Sg(window.location.href)
	}catch(b) {
		return undefined
	}return Yj.tE(a)
}var $j="hl",ak="gl";
function bk(a) {
	if(window._DISPLAY_LOCALE)if(Zj($j))a=P(a,$j,_DISPLAY_LOCALE);
	var b=Zj(ak);
	if(b)a=P(a,ak,b);
	return a
}function ck(a,b) {
	var c;
	return function () {
		c&&window.clearTimeout(c);
		var d=this;
		c=window.setTimeout(function () {
			c=h;
			b.call(d)
		},a)
	}
}var dk=_USER_ID?Na:Oa,ek;
function fk(a) {
	ek=a
}function gk(a) {
	try{
		this.streamId=a.replace(/&#38;
		/g,Hf)
	}catch(b) {
		this.streamId=h
	}this.ar=h;
	this.ah=[];
	this.gG();
	if(this.J.Ka) {
		a=this.rb();
		for(var c=0;c<a.qe.length;c++)a.qe[c]=hk(a.qe[c]);this.streamId=a.O()
	}this.ox=e
}var ik,jk,kk,lk,mk,nk,ok,pk,qk,rk,sk,tk,uk,vk,wk,xk,yk;function zk(a,b,c,d) {
	this.xB=a;
	this.Ka=b;
	this.mN=c;
	this.Hh=d
}
gk.prototype.gG=function () {
	var a;
	if(this.J&&this.Jinstanceofzk)return ;
	else a=thisinstanceofAk?ik:thisinstanceofBk&&!this.oa.Yc?jk:Ck(this.streamId)?this.JE():kk;
	this.J=a
};
(function () {
	var a=zk;
	lk=new a(e,i,e,i);
	mk=new a(i,i,e,i);
	ik=new a(e,e,e,e);
	nk=new a(e,i,i,i);
	ok=new a(e,i,i,i);
	jk=new a(i,i,i,e);
	pk=new a(i,i,i,e);
	qk=new a(e,i,i,i);
	rk=new a(e,i,i,i);
	sk=new a(e,i,i,i);
	tk=new a(e,i,i,i);
	uk=new a(i,i,i,i);
	kk=new a(i,e,e,i);
	vk=new a(i,e,e,i);
	wk=new a(e,e,e,e);
	xk=new a(e,e,e,e);
	yk=new a(e,e,e,i)
})();
var Dk="alerts";
gk.prototype.JE=function () {
	try{
		var a=this.rb(),b=a.getName();
		if(a.type==qb&&b&&b==Dk)return vk;
		if(a.type==qb||a.type==pb)switch(b) {
			case zb:return lk;
			case Ab:return lk;
			case Nb:return lk;
			case Cb:return nk;
			case xb:return mk;
			case Eb:return ok;
			case vb:return qk;
			case ub:return rk;
			case Lb:return sk;
			case Mb:return tk;
			case Hb:return pk
		}else if(a.type==rb)return yk;
		return uk
	}catch(c) {
		return h
	}
};
function Ek(a) {
	return Fk(a.O())
}function Gk(a) {
	if(a.ha())return new Hk(a.Bb(),a.Nj);
	return new Fk(a.streamId)
}
function Fk(a) {
	a=new gk(a);
	var b=ek?ek(a):h;
	return b?new Bk(b):a
}m=gk.prototype;
m.Ou=function () {
	if(this.ha()||this.streamId==h)return h;
	var a=this.streamId.substring(this.streamId.indexOf(ch,1)+1,this.streamId.length);
	a=yf(a);
	return this.streamId.substring(0,this.streamId.indexOf(ch,1)+1)+a
};
var Ik="feed/",Jk="tv/",Kk="-";
m.zl=function (a,b) {
	if(this.streamId.indexOf(a)==0)return this.Ou();
	if(this.streamId.indexOf(Ik)!=0&&this.streamId.indexOf(Jk)!=0) {
		var c=this.rb();
		b&&!c.hf()&&c.$j(Kk);
		return c.type==sb||c.type==qb?a+c.O():a+yf(c.O())
	}return a+this.Ou()
};
m.Ru=function () {
	if(this.ha())return h;
	var a=this.zl(dk);
	return a?this.yv(a):h
};
var Lk="/reader/api/0/stream/contents/";
m.dp=function (a) {
	if(this.ha())return h;
	var b=this.zl(Lk);
	return a?b:b?this.yv(b):h
};
var Mk="ot",Nk="r",Ok="scr",Pk="trans",Qk="xt";
m.yv=function (a) {
	if(this.Cx)a=P(a,Mk,this.Cx);
	if(this.ar)a=P(a,Nk,this.ar);
	if(this.QJ)a=P(a,Ok,this.QJ);
	if(this.dA)a=P(a,Pk,this.dA);
	for(var b=0;b<this.ah.length;b++)a=P(a,Qk,this.ah[b].O());return a
};var Rk="/reader/view/";m.Oi=function (a) {
	if(this.ha())return h;
	return (a=this.zl(Rk,a))?bk(a):h
};
m.xE=function () {
	if(this.ha())return h;
	return this.zl(Oa)
};
m.G=function (a) {
	if(!(ainstanceofgk))return e;
	function b(c) {
		return c.ha()?c.Bb():c.dp(i)
	}return b(this)==b(a)
};
m.rb=function () {
	return Sk(this.streamId)
};
function Tk() {
	return Ek(R.jv())
}function Uk() {
	return Ek(R.yb())
}gk.prototype.mg=function () {
	return this.Ec(R.jv())
};
gk.prototype.lq=function () {
	return this.mg()||this.Ec(R.xd())||this.Ec(R.yb())||this.Ec(R.fe())||this.Ec(R.hv())
};
gk.prototype.Ec=function (a) {
	return Ek(a).G(this)
};
gk.prototype.Xp=function () {
	return this.J==kk
};
function Hk(a,b) {
	return new Ak(a,b)
}m=gk.prototype;
m.ha=function () {
	return this.J==ik||this.J==wk
};
m.Eb=function () {
	return this.J==jk
};
m.AG=function () {
	return this.J==sk
};
m.yw=function () {
	return this.J==pk
};
m.Hh=function () {
	return this.J.Hh
};
m.TG=function () {
	return this.J==xk||this.J==wk
};
m.yf=function (a) {
	this.ar=a
};
m.cL=function (a) {
	this.dA=a
};
m.$y=function (a) {
	this.Cx=a
};
m.FK=function (a) {
	this.ox=a
};
m.$B=function () {
	this.ah=[]
};
m.fB=function (a) {
	this.ah.push(a)
};
m.Wp=function (a) {
	for(var b=0,c;c=this.ah[b];b++)if(c.G(a))return i;return e
};m.tF=function () {
	return this.ah.length>0
};
m.Zc=function () {
	return this.J.Ka&&!this.rb().hf()
};
function Bk(a,b) {
	this.oa=a;
	gk.call(this,b||a.f().streamId)
}v(Bk,gk);
var Vk="search/";
function Ak(a,b) {
	this.Jj=a;
	this.Nj=b||[];
	gk.call(this,Vk+a)
}v(Ak,gk);
Ak.prototype.Bb=function () {
	return this.Jj
};
Ak.prototype.Vi=function () {
	if(!this.Nj)return h;
	var a=[];
	for(var b=0,c;c=this.Nj[b];b++)a.push(c.streamId);return a
};function Wk(a,b) {
	Ak.call(this,a.Jj,a.Nj);
	this.J=wk;
	this.streamId=h;
	this.Xq=a;
	this.uz=b
}v(Wk,Ak);
Wk.prototype.G=function (a) {
	if(!(ainstanceofWk))return e;
	return this.Xq.streamId==a.Xq.streamId&&this.uz==a.uz
};
function Xk() {
	this.An={
	};
	if(S) {
		var a=this;
		S.Lb(function () {
			a.An={
			}
		})
	}
}m=Xk.prototype;
m.Xc=function (a,b,c) {
	var d=this.An;
	if(a.streamId in d) {
		c(d[a.streamId]);
		return
	}function f(p) {
		d[a.streamId]=p;
		c(p)
	}if(a.Eb()) {
		f(a.oa.op(Nd));
		return
	}function g() {
		return b
	}var k=a.J.Ka&&this.UB();
	function l() {
		var p=a.rb();
		if(a.Zc())f(p.rh(Yk));
		else b?g().Bj(function () {
			f(p.rh(Yk))
		}):c(h)
	}if(S&&(S.cm()||!b))S.$e(a,function (p) {
		if(p)f(Lf(p.q));
		else if(k)l();
		else b?g().Ze(f):c(h)
	});
	else if(k)l();
	else b?g().Ze(f):c(h)
};
m.MK=function (a) {
	this.zx=a
};
m.UB=function () {
	return this.zx?this.zx():i
};
m.cC=function (a) {
	a.streamId in this.An&&delete this.An[a.streamId]
};
m.PG=function () {
	var a=window.location.pathname;
	return a.indexOf(Rk)==a.length-"/reader/view/".length
};
var Zk=new Xk;
function $k() {
}$k.prototype.Fo=e;
$k.prototype.n=function () {
	if(!this.Fo) {
		this.k();
		this.Fo=i
	}
};
$k.prototype.k=function () {
};
function al(a,b) {
	$k.call(this);
	this.rx=b;
	this.Tf=[];
	this.uC(a)
}v(al,$k);
m=al.prototype;
m.xo=h;
m.Eo=h;
m.Wj=function (a) {
	this.xo=a
};
m.Qy=function (a) {
	this.Eo=a
};
m.he=function () {
	if(this.Tf.length)return this.Tf.pop();
	return this.wt()
};
m.Ag=function (a) {
	this.Tf.length<this.rx?this.Tf.push(a):this.Qt(a)
};
m.uC=function (a) {
	if(a>this.rx)j(Error("[goog.structs.SimplePool] Initial cannot be greater than max"));
	for(var b=0;b<a;b++)this.Tf.push(this.wt())
};m.wt=function () {
	return this.xo?this.xo():{
	}
};
m.Qt=function (a) {
	if(this.Eo)this.Eo(a);
	else if(De(a.n))a.n();
	else for(var b in a)delete a[b]
};
m.k=function () {
	al.d.k.call(this);
	var a=this.Tf;
	while(a.length)this.Qt(a.pop());
	delete this.Tf
};
function bl(a,b) {
	this.type=a;
	this.currentTarget=this.target=b
}v(bl,$k);
m=bl.prototype;
m.k=function () {
	delete this.type;
	delete this.target;
	delete this.currentTarget
};
m.tf=e;
m.wf=i;
m.stopPropagation=function () {
	this.tf=i
};
m.preventDefault=function () {
	this.wf=e
};
function cl(a,b) {
	a&&this.C(a,b)
}v(cl,bl);
var dl=[1,4,2];
m=cl.prototype;
m.type=h;
m.target=h;
m.relatedTarget=h;
m.offsetX=0;
m.offsetY=0;
m.clientX=0;
m.clientY=0;
m.screenX=0;
m.screenY=0;
m.button=0;
m.keyCode=0;
m.charCode=0;
m.ctrlKey=e;
m.altKey=e;
m.shiftKey=e;
m.metaKey=e;
m.Qa=h;
var el="mouseover",fl="mouseout",gl="keypress";
m.C=function (a,b) {
	this.type=a.type;
	this.target=a.target||a.srcElement;
	this.currentTarget=b;
	this.relatedTarget=a.relatedTarget?a.relatedTarget:this.type==el?a.fromElement:this.type==fl?a.toElement:h;
	this.offsetX=typeofa.layerX==qe?a.layerX:a.offsetX;
	this.offsetY=typeofa.layerY==qe?a.layerY:a.offsetY;
	this.clientX=typeofa.clientX==qe?a.clientX:a.pageX;
	this.clientY=typeofa.clientY==qe?a.clientY:a.pageY;
	this.screenX=a.screenX||0;
	this.screenY=a.screenY||0;
	this.button=a.button;
	this.keyCode=a.keyCode||
	0;
	this.charCode=a.charCode||(this.type==gl?a.keyCode:0);
	this.ctrlKey=a.ctrlKey;
	this.altKey=a.altKey;
	this.shiftKey=a.shiftKey;
	this.metaKey=a.metaKey;
	this.Qa=a;
	delete this.wf;
	delete this.tf
};
var T="click",hl="420";
m.Tp=function (a) {
	return z?this.type==T?a==0:!!(this.Qa.button&dl[a]):Qh&&!Sh(hl)?this.Qa.button==1&&a==0:this.Qa.button==a
};
m.stopPropagation=function () {
	this.tf=i;
	if(this.Qa.stopPropagation)this.Qa.stopPropagation();
	else this.Qa.cancelBubble=i
};
m.preventDefault=function () {
	this.wf=e;
	if(this.Qa.preventDefault)this.Qa.preventDefault();
	else {
		this.Qa.returnValue=e;
		try{
			this.Qa.keyCode=-1
		}catch(a) {
		}
	}
};
m.k=function () {
	cl.d.k.call(this);
	this.Qa=h
};
function il() {
}var jl=0;
m=il.prototype;
m.aq=h;
m.rg=h;
m.cy=h;
m.src=h;
m.type=h;
m.capture=h;
m.cj=h;
m.Ea=0;
m.Th=e;
m.jo=e;
var kl="Invalid listener argument";
m.C=function (a,b,c,d,f,g) {
	if(De(a))this.aq=i;
	else if(a&&a.handleEvent&&De(a.handleEvent))this.aq=e;
	else j(Error(kl));
	this.rg=a;
	this.cy=b;
	this.src=c;
	this.type=d;
	this.capture=!!f;
	this.cj=g;
	this.jo=e;
	this.Ea=++jl;
	this.Th=e
};
m.handleEvent=function (a) {
	if(this.aq)return this.rg.call(this.cj||this.src,a);
	return this.rg.handleEvent.call(this.rg,a)
};
var ll={
},ml={
},nl={
},ol=new al(0,600);
ol.Wj(function () {
	return {
		Z:0
	}
});
ol.Qy(function (a) {
	a.Z=0
});
var pl=new al(0,600);
pl.Wj(function () {
	return []
});
pl.Qy(function (a) {
	a.length=0;
	delete a.pj;
	delete a.Nq
});
var ql=new al(0,600);
ql.Wj(function () {
	function a(b) {
		return rl.call(a.src,a.Ea,b)
	}return a
});
function sl() {
	return new il
}var tl=new al(0,600);
tl.Wj(sl);
function ul() {
	return new cl
}var vl=(function () {
	var a=h;
	if(z) {
		a=new al(0,600);
		a.Wj(ul)
	}return a
})(),wl="on",xl=wl,yl={
};
function U(a,b,c,d,f) {
	if(b)if(ze(b)) {
		for(var g=0;g<b.length;g++)U(a,b[g],c,d,f);return h
	}else {
		d=!!d;
		var k=ml;
		b in k||(k[b]=ol.he());
		k=k[b];
		if(!(d in k)) {
			k[d]=ol.he();
			k.Z++
		}k=k[d];
		var l=Ge(a),p;
		if(k[l]) {
			p=k[l];
			for(var g=0;g<p.length;g++) {
				k=p[g];
				if(k.rg==c&&k.cj==f) {
					if(k.Th)break;
					return p[g].Ea
				}
			}
		}else {
			p=k[l]=pl.he();
			k.Z++
		}g=ql.he();
		g.src=a;
		k=tl.he();
		k.C(c,g,a,b,d,f);
		c=k.Ea;
		g.Ea=c;
		p.push(k);
		ll[c]=k;
		nl[l]||(nl[l]=pl.he());
		nl[l].push(k);
		if(a.addEventListener) {
			if(a==he||!a.At)a.addEventListener(b,g,d)
		}else a.attachEvent(zl(b),
		g);
		return c
	}else j(Error("Invalid event type"))
}function Al(a,b,c,d,f) {
	if(ze(b)) {
		for(var g=0;g<b.length;g++)Al(a,b[g],c,d,f);return h
	}a=U(a,b,c,d,f);ll[a].jo=i;return a
}function V(a,b,c,d,f) {
	if(ze(b)) {
		for(var g=0;g<b.length;g++)V(a,b[g],c,d,f);return h
	}d=!!d;a=Bl(a,b,d);if(!a)return e;for(var g=0;g<a.length;g++)if(a[g].rg==c&&a[g].capture==d&&a[g].cj==f)return Cl(a[g].Ea);return e
}
function Cl(a) {
	if(!ll[a])return e;
	var b=ll[a];
	if(b.Th)return e;
	var c=b.src,d=b.type,f=b.cy,g=b.capture;
	if(c.removeEventListener) {
		if(c==he||!c.At)c.removeEventListener(d,f,g)
	}else c.detachEvent&&c.detachEvent(zl(d),f);
	c=Ge(c);
	f=ml[d][g][c];
	if(nl[c]) {
		var k=nl[c];
		Ze(k,b);
		k.length==0&&delete nl[c]
	}b.Th=i;
	f.Nq=i;
	Dl(d,g,c,f);
	delete ll[a];
	return i
}
function Dl(a,b,c,d) {
	if(!d.pj)if(d.Nq) {
		for(var f=0,g=0;f<d.length;f++) {
			if(d[f].Th) {
				tl.Ag(d[f]);
				continue
			}if(f!=g)d[g]=d[f];
			g++
		}d.length=g;
		d.Nq=e;
		if(g==0) {
			pl.Ag(d);
			delete ml[a][b][c];
			ml[a][b].Z--;
			if(ml[a][b].Z==0) {
				ol.Ag(ml[a][b]);
				delete ml[a][b];
				ml[a].Z--
			}if(ml[a].Z==0) {
				ol.Ag(ml[a]);
				delete ml[a]
			}
		}
	}
}
function El(a,b,c) {
	var d=0,f=a==h,g=b==h,k=c==h;
	c=!!c;
	if(f)ug(nl,function (p) {
		for(var s=p.length-1;s>=0;s--) {
			var A=p[s];
			if((g||b==A.type)&&(k||c==A.capture)) {
				Cl(A.Ea);
				d++
			}
		}
	});
	else {
		a=Ge(a);
		if(nl[a]) {
			a=nl[a];
			for(f=a.length-1;f>=0;f--) {
				var l=a[f];
				if((g||b==l.type)&&(k||c==l.capture)) {
					Cl(l.Ea);
					d++
				}
			}
		}
	}return d
}function Bl(a,b,c) {
	var d=ml;
	if(b in d) {
		d=d[b];
		if(c in d) {
			d=d[c];
			a=Ge(a);
			if(d[a])return d[a]
		}
	}return h
}
function Fl(a,b,c,d,f) {
	d=!!d;
	if(a=Bl(a,b,d))for(b=0;b<a.length;b++)if(a[b].rg==c&&a[b].capture==d&&a[b].cj==f)return a[b];return h
}function zl(a) {
	if(a in yl)return yl[a];
	return yl[a]=xl+a
}function Gl(a,b,c,d) {
	var f=1,g=ml;
	if(b in g) {
		g=g[b];
		if(c in g) {
			g=g[c];
			a=Ge(a);
			if(g[a]) {
				g=g[a];
				if(g.pj)g.pj++;
				else g.pj=1;
				try{
					var k=g.length;
					for(var l=0;l<k;l++) {
						var p=g[l];
						if(p&&!p.Th)f&=Hl(p,d)!==e
					}
				}finally{
					g.pj--;
					Dl(b,c,a,g)
				}
			}
		}
	}return Boolean(f)
}function Hl(a,b) {
	b=a.handleEvent(b);
	a.jo&&Cl(a.Ea);
	return b
}
function Il(a,b) {
	if(Ce(b))b=new bl(b,a);
	else if(binstanceofbl)b.target=b.target||a;
	else {
		var c=b;
		b=new bl(b.type,a);
		Gg(b,c)
	}var c=1,d,f=b.type,g=ml;
	if(!(f in g))return i;
	g=g[f];
	f=i in g;
	g=e in g;
	if(f) {
		d=[];
		for(var k=a;k;k=k.mp())d.push(k);for(k=d.length-1;!b.tf&&k>=0;k--) {
			b.currentTarget=d[k];
			c&=Gl(d[k],b.type,i,b)&&b.wf!=e
		}
	}if(g)if(f)for(k=0;!b.tf&&k<d.length;k++) {
		b.currentTarget=d[k];
		c&=Gl(d[k],b.type,e,b)&&b.wf!=e
	}else for(a=a;!b.tf&&a;a=a.mp()) {
		b.currentTarget=a;
		c&=Gl(a,b.type,e,b)&&b.wf!=e
	}return Boolean(c)
}
var Jl="window.event";
function rl(a,b) {
	if(!ll[a])return i;
	a=ll[a];
	var c=a.type,d=ml;
	if(!(c in d))return i;
	d=d[c];
	var f;
	if(z) {
		f=b||me(Jl);
		if(b=i in d) {
			if(f.keyCode<0||f.returnValue!=undefined)return i;
			Kl(f)
		}Ge(a.src);
		d=vl.he();
		d.C(f,this);
		f=i;
		try{
			if(b) {
				var g=pl.he();
				for(var k=d.currentTarget;k;k=k.parentNode)g.push(k);for(var l=g.length-1;!d.tf&&l>=0;l--) {
					d.currentTarget=g[l];
					f&=Gl(g[l],c,i,d)
				}for(var l=0;!d.tf&&l<g.length;l++) {
					d.currentTarget=g[l];
					f&=Gl(g[l],c,e,d)
				}
			}else f=Hl(a,d)
		}finally{
			if(g) {
				g.length=0;
				pl.Ag(g)
			}d.n();
			vl.Ag(d)
		}return f
	}g=new cl(b,this);
	try{
		f=Hl(a,g)
	}finally{
		g.n()
	}return f
}function Kl(a) {
	var b=e;
	if(a.keyCode==0)try{
		a.keyCode=-1;
		return
	}catch(c) {
		b=i
	}if(b||a.returnValue==undefined)a.returnValue=i
}function Ll(a) {
	this.w=a
}v(Ll,$k);
var Ml=new al(0,100);
m=Ll.prototype;
m.l=function (a,b,c,d,f) {
	if(ze(b)) {
		for(var g=0;g<b.length;g++)this.l(a,b[g],c,d,f);return
	}this.jJ(U(a,b,c||this,d||e,f||this.w||this))
};
m.jJ=function (a) {
	if(this.I)this.I[a]=i;
	else if(this.lf) {
		this.I=Ml.he();
		this.I[this.lf]=i;
		this.lf=h;
		this.I[a]=i
	}else this.lf=a
};
m.wa=function (a,b,c,d,f) {
	if(!this.lf&&!this.I)return ;
	if(ze(b)) {
		for(var g=0;g<b.length;g++)this.wa(a,b[g],c,d,f);return
	}if(a=Fl(a,b,c||this,d||e,f||this.w||this)) {
		a=a.Ea;
		Cl(a);
		if(this.I)Ag(this.I,a);
		else if(this.lf==a)this.lf=h
	}
};
m.vf=function () {
	if(this.I) {
		for(var a in this.I) {
			Cl(a);
			delete this.I[a]
		}Ml.Ag(this.I);
		this.I=h
	}else this.lf&&Cl(this.lf)
};
m.k=function () {
	Ll.d.k.call(this);
	this.vf()
};
m.handleEvent=function () {
	j(Error("EventHandler.handleEvent not implemented"))
};
function W() {
}v(W,$k);
m=W.prototype;
m.At=i;
m.Sx=h;
m.mp=function () {
	return this.Sx
};
m.addEventListener=function (a,b,c,d) {
	U(this,a,b,c,d)
};
m.removeEventListener=function (a,b,c,d) {
	V(this,a,b,c,d)
};
m.dispatchEvent=function (a) {
	return Il(this,a)
};
m.k=function () {
	W.d.k.call(this);
	El(this);
	this.Sx=h
};
var Nl="7",Ol="readystatechange",Pl="load";
function Ql(a,b) {
	this.Cb=a;
	this.qF=!!b;
	this.cq=this.Hw();
	if(!this.cq) {
		a=z&&!Sh(Nl)?Ol:Pl;
		this.Dm=U(this.Cb,a,this.Iv,e,this);
		this.ej=window.setInterval(r(this.Iv,this),100)
	}
}v(Ql,W);
m=Ql.prototype;
m.Dm=h;
m.cm=function () {
	return this.cq
};
m.sx=function () {
	if(this.ej) {
		window.clearInterval(this.ej);
		this.ej=h
	}
};
m.k=function () {
	delete this.Cb;
	this.sx();
	Cl(this.Dm);
	Ql.d.k.call(this)
};
var Rl="complete";
m.Hw=function () {
	var a=e;
	try{
		a=z?this.Cb.readyState==Rl:!!yi(this.Cb).body&&(!this.qF||!!yi(this.Cb).body.firstChild)
	}catch(b) {
	}return a
};
var Sl="ifload";
m.Iv=function () {
	if(this.Hw()) {
		this.sx();
		Cl(this.Dm);
		this.Dm=h;
		this.cq=i;
		this.dispatchEvent(Sl)
	}
};
function Tl(a,b) {
	W.call(this);
	this.fj=a||1;
	this.gk=b||Ul;
	this.ho=r(this.YL,this);
	this.yq=Ie()
}v(Tl,W);
Tl.prototype.enabled=e;
var Ul=he.window;
m=Tl.prototype;
m.W=h;
m.setInterval=function (a) {
	this.fj=a;
	if(this.W&&this.enabled) {
		this.stop();
		this.start()
	}else this.W&&this.stop()
};
m.YL=function () {
	if(this.enabled) {
		var a=Ie()-this.yq;
		if(a>0&&a<this.fj*0.8) {
			this.W=this.gk.setTimeout(this.ho,this.fj-a);
			return
		}this.JC();
		if(this.enabled) {
			this.W=this.gk.setTimeout(this.ho,this.fj);
			this.yq=Ie()
		}
	}
};
var Vl="tick";
m.JC=function () {
	this.dispatchEvent(Vl)
};
m.start=function () {
	this.enabled=i;
	if(!this.W) {
		this.W=this.gk.setTimeout(this.ho,this.fj);
		this.yq=Ie()
	}
};
m.stop=function () {
	this.enabled=e;
	if(this.W) {
		this.gk.clearTimeout(this.W);
		this.W=h
	}
};
m.k=function () {
	Tl.d.k.call(this);
	this.stop();
	delete this.gk
};
function Wl(a,b,c) {
	if(De(a)) {
		if(c)a=r(a,c)
	}else if(a&&typeofa.handleEvent==te)a=r(a.handleEvent,a);
	else j(Error(kl));
	return Ul.setTimeout(a,b||0)
}function Xl(a) {
	Ul.clearTimeout(a)
}var Yl="history_state",Zl='<input type="text" name="%s" id="%s" style="display:none" />',$l="https",am="https:///",bm='javascript:""',cm="history_iframe",dm='src="',em='<iframe id="%s" style="display:none" %s></iframe>';
function fm(a,b,c,d) {
	W.call(this);
	if(a&&!b)j(Error("Can't use invisible history without providing a blank page."));
	var f;
	if(c)f=c;
	else {
		f=Yl+gm;
		document.write(pf(Zl,f,f));
		f=Xh(f)
	}this.Il=f;
	this.eb=c?li(Wh(c)):window;
	this.LB=this.eb.location.href.split($f)[0]+$f;
	this.Ol=b;
	if(z&&!b)this.Ol=window.location.protocol==$l?am:bm;
	this.W=new Tl(150);
	this.gi=!a;
	this.F=new Ll(this);
	if(a||z) {
		if(d)a=d;
		else {
			a=cm+gm;
			b=this.Ol?dm+Lf(this.Ol)+Kf:n;
			document.write(pf(em,a,b));
			a=Xh(a)
		}this.Cb=a;
		this.jA=i;
		this.cw=new Ql(this.Cb);
		this.cw.cm()?this.Gv():this.F.l(this.cw,Sl,this.Gv)
	}if(z) {
		this.F.l(this.eb,Pl,this.mI);
		this.qz=this.Go=e
	}this.gi&&this.Yh(this.af(),i);
	gm++
}v(fm,W);
m=fm.prototype;
m.hb=e;
m.tm=e;
m.mf=h;
m.Nh=h;
m.k=function () {
	fm.d.k.call(this);
	this.F.n();
	this.pb(e)
};
m.Gv=function () {
	ye(this.ql())&&this.Zh(this.Il.value)
};
var hm="pageshow";
m.pb=function (a) {
	if(a==this.hb)return ;
	if(z&&!this.Go) {
		this.qz=a;
		return
	}if(a) {
		if(Oh)this.F.l(this.eb.document,im,this.CI);
		else Ph&&this.F.l(this.eb,hm,this.Vq);
		if(!z||this.Go) {
			this.F.l(this.W,Vl,this.Wx);
			this.hb=i;
			if(!z)this.mf=this.af();
			this.W.start();
			this.dispatchEvent(new jm(this.af()))
		}
	}else {
		this.hb=e;
		this.F.vf();
		this.W.stop()
	}
};
m.mI=function () {
	this.Go=i;
	this.Zh(this.Il.value,i);
	this.pb(this.qz)
};
m.Vq=function (a) {
	if(a.Qa.persisted) {
		this.pb(e);
		this.pb(i)
	}
};
m.af=function () {
	return this.Nh!==h?this.Nh:this.gi?this.kp(this.eb):this.ql()||n
};
m.Kr=function (a,b) {
	this.Uy(a,e,b)
};
m.DJ=function (a,b) {
	this.Uy(a,i,b)
};
m.kp=function (a) {
	a=a.location.href;
	var b=a.indexOf($f);
	return b<0?n:a.substring(b+1)
};
m.Uy=function (a,b,c) {
	if(this.af()!=a)if(this.gi) {
		this.Yh(a,b);
		z&&this.Zh(a,b,c);
		this.hb&&this.Wx()
	}else {
		this.Zh(a,b);
		this.Nh=this.mf=this.Il.value=a;
		this.dispatchEvent(new jm(a))
	}
};
m.Yh=function (a,b) {
	a=this.LB+(a||n);
	var c=this.eb.location;
	if(a!=c.href)if(b)c.replace(a);
	else c.href=a
};
var km="text/html",lm="replace",mm="<title>%s</title><body>%s</body>";
m.Zh=function (a,b,c) {
	if(!nm&&(this.jA||a!=this.ql())) {
		a=yf(a);
		if(z) {
			var d=yi(this.Cb);
			d.open(km,b?lm:undefined);
			d.write(pf(mm,Lf(c||this.eb.document.title),a));
			d.close()
		}else {
			a=this.Ol+$f+a;
			if(c=this.Cb.contentWindow)if(b)c.location.replace(a);
			else c.location.href=a
		}this.jA=e
	}
};
m.ql=function () {
	if(z) {
		var a=yi(this.Cb);
		return a.body?zf(a.body.innerHTML):h
	}else if(nm)return h;
	else {
		if(a=this.Cb.contentWindow) {
			var b;
			try{
				b=zf(this.kp(a))
			}catch(c) {
				this.tm||this.Zy(i);
				return h
			}this.tm&&this.Zy(e);
			return b||h
		}else return h
	}
};
m.Wx=function () {
	if(this.gi) {
		var a=this.kp(this.eb);
		a!=this.mf&&this.Zb(a)
	}if(!this.gi||z) {
		a=this.ql()||n;
		if(this.Nh==h||a==this.Nh) {
			this.Nh=h;
			a!=this.mf&&this.Zb(a)
		}
	}
};
m.Zb=function (a) {
	this.mf=this.Il.value=a;
	if(this.gi) {
		z&&this.Zh(a);
		this.Yh(a)
	}else this.Zh(a);
	this.dispatchEvent(new jm(this.af()))
};
m.Zy=function (a) {
	if(this.tm!=a)this.W.setInterval(a?10000:150);
	this.tm=a
};
m.CI=function () {
	this.W.stop();
	this.W.start()
};
var nm=Qh&&mg(zh,"419")<=0,om="mousedown",pm="keydown",qm="mousemove",im=[om,pm,qm],gm=0,rm="navigate";
function jm(a) {
	bl.call(this,rm);
	this.hM=a
}v(jm,bl);
function sm() {
	fm.call(this);
	this.Qw=e;
	Al(this.eb,Pl,this.AI,e,this)
}v(sm,fm);
sm.prototype.Yh=function (a,b) {
	if(this.Qw)sm.d.Yh.call(this,a,b);
	else {
		this.yy=a;
		this.NJ=b
	}
};
sm.prototype.AI=function () {
	this.Qw=i;
	this.yy&&this.Yh(this.yy,this.NJ)
};
function tm() {
	if(this.Yl=!(H.le&&!H.Kn())&&!H.gf) {
		this.Nl=new sm;
		U(this.Nl,rm,this.Dl,e,this);
		this.wq=h;
		this.Dw=i
	}
}tm.prototype.C=function () {
	if(!this.Yl)return ;
	this.Nl.pb(i)
};
tm.prototype.aL=function (a) {
	this.Vw=this.wq=a;
	if(this.Dw) {
		this.Nl.DJ(a);
		this.Dw=e
	}else this.Nl.Kr(a)
};
var um=/[']/g;
tm.prototype.Ub=function (a,b) {
	if(!this.Yl)return ;
	function c(g) {
		return yf(g).replace(um,function (k) {
			k=k.charCodeAt(0);
			return kh+(k>>4&15).toString (16)+(k&15).toString (16)
		})
	}a=a;
	if(b) {
		a+=ch;
		var d=[];
		for(var f=0;f<b.length;f++)d.push(c(b[f]));a+=d.join(ch)
	}this.aL(a)
};tm.prototype.Dl=function (a) {
	a=a.hM;
	if(a==this.wq)return ;
	if(a==this.Vw)return ;
	this.wq=h;
	this.Vw=a;
	(a=this.Bu(a))&&a[0].Mm(a[1])
};
tm.prototype.Bu=function (a) {
	var b=a.split(ch);
	a=b[0];
	b=b.slice(1);
	for(var c=0;c<b.length;c++)try{
		b[c]=zf(b[c])
	}catch(d) {
		return h
	}for(var f in vm) {
		c=vm[f];
		if(c.R()==a)return [c,b]
	}return h
};
tm.prototype.zH=function () {
	if(!this.Yl)return e;
	var a=window.location.hash;
	return a&&a.length>1?this.Bu(a.substring(1))!=h:e
};
function wm() {
}wm.prototype.Ub=function (a) {
	xm.Ub(this.R(),a)
};
wm.prototype.R=function () {
	return this.L
};
var ym="stream";
function zm() {
	wm.call(this);
	this.L=ym
}v(zm,wm);
zm.prototype.Mm=function (a) {
	var b=Fk(a.join(ch));
	if(X.f()&&X.f().G(b)&&X.V) {
		Am();
		Bm(b)
	}else Cm(function (c) {
		b.Eb()&&c||Dm(b)
	})
};
var vm={
},xm;
vm.RA=new zm;
var Em="525";
function Fm(a,b,c) {
	if(!z&&!(Qh&&Sh(Em)))return i;
	if(z&&!c&&(b==17||b==18))return e;
	if(a>=48&&a<=57)return i;
	if(a>=96&&a<=106)return i;
	if(a>=65&&a<=90)return i;
	if(a==27&&Qh)return e;
	switch(a) {
		case 13:case 27:case 32:case 63:case 107:case 109:case 110:case 111:case 186:case 189:case 187:case 188:case 190:case 191:case 192:case 222:case 219:case 220:case 221:return i;
		default:return e
	}
}
function Gm(a) {
	if(a>=48&&a<=57)return i;
	if(a>=96&&a<=106)return i;
	if(a>=65&&a<=90)return i;
	switch(a) {
		case 32:case 63:case 107:case 109:case 110:case 111:case 186:case 189:case 187:case 188:case 190:case 191:case 192:case 222:case 219:case 220:case 221:return i;
		default:return e
	}
}var Hm=[];
function Im(a) {
	Jm(window,Pl,a,e)
}var Km="resize";
function Lm(a) {
	Jm(window,Km,a,e)
}var Mm=[];
function Nm(a) {
	Mm.push(a)
}function Om() {
	for(var a=0,b;b=Mm[a];a++)b();Pm()
}var Qm="unload";
function Pm() {
	for(var a=0,b;b=Hm[a];a++)Rm(b.m,b.Qa,b.HD,b.QM);Rm(window,Qm,Om,e)
}function Sm(a,b) {
	Tm(J(a),b)
}function Tm(a,b) {
	var c=b.Co?t(b.Co,b.$):b.$;
	Jm(a,b.event,c,e)
}var Um="scroll",Vm="mousewheel";
function Jm(a,b,c,d) {
	H.gf&&b==Um&&Jm(a,Vm,c,d);
	if(a.addEventListener) {
		a.addEventListener(b,c,d);
		if(b==T&&!Wm(a))a.onclick=function () {
			return e
		}
	}else if(a.attachEvent) {
		var f=Wm(a)?c:function () {
			c();
			return e
		};
		c.Ss=f;
		a.attachEvent(wl+b,f)
	}Hm.push({
		m:a,Qa:b,HD:c,QM:d
	})
}
function Rm(a,b,c,d) {
	if(a.removeEventListener) {
		a.removeEventListener(b,c,d);
		if(b==T&&!Wm(a))a.onclick=h
	}else if(a.detachEvent) {
		a.detachEvent(wl+b,c.Ss);
		c.Ss=h
	}
}var Xm="input";
function Wm(a) {
	return a==window||a==window.document||a.tagName.toLowerCase()==Xm
}function Ym(a,b) {
	function c() {
		U(document,T,function (d) {
			var f=a(d);
			if(!f)return ;
			finstanceofArray||(f=[f]);
			var g=e;
			for(d=d.target;d;d=d.parentNode) {
				for(var k=0,l;l=f[k];k++)if(d==l) {
					g=i;
					break
				}if(g)break
			}g||b()
		})
	}Zm?c():Im(c)
}
function $m(a,b,c) {
	return an(13,a,b,c)
}var bn="key";
function an(a,b,c,d) {
	var f=new cn(b),g=U(f,bn,function (k) {
		if(k.keyCode==a&&(!d||d()))c(k)
	});
	return function () {
		Cl(g);
		f.n()
	}
}function dn(a,b) {
	a=a.target;
	while(a) {
		if(Oe(b,a)!=-1)return i;
		a=a.parentNode
	}return e
}var Zm=e;
Im(function () {
	Zm=i
});
Jm(window,Qm,Om,e);
var en="text/javascript",fn="/ui/ProfileLauncher/dommanifest.js",gn="head";
function hn(a) {
	if(window.addProfileEditor) {
		a();
		return
	}else {
		var b=mi(Ui,{
			type:en,src:Za+fn
		});
		window.manifest={
			serverBase:Za
		};
		var c=window.setInterval(function () {
			if(window.addProfileEditor) {
				window.clearInterval(c);
				a()
			}
		},50);
		document.getElementsByTagName(gn)[0].appendChild(b)
	}
}var jn="reader";
function kn() {
	var a={
		service:jn
	};
	if(window._DISPLAY_LOCALE)a.hl=window._DISPLAY_LOCALE;
	return a
}
function ln(a,b,c,d) {
	var f=kn();
	if(d) {
		d=d;
		for(var g=0;g<d.length;g++)f[d[g][0]]=d[g][1]
	}hn(function () {
		window.addProfileEditor(b,a,f,c)
	})
}var mn=e,nn=e,on=[],pn="/ui/HovercardLauncher/dommanifest.js?callback=FR_Friends_initializeHovercards";
function qn(a) {
	on.push(a);
	if(mn)rn();
	else if(on.length==1) {
		a=mi(Ui,{
			type:en,src:Za+pn
		});
		document.getElementsByTagName(gn)[0].appendChild(a)
	}
}
function rn() {
	mn=i;
	if(!nn) {
		window._HovercardLauncherComponentInit({
			serverBase:Za
		});
		nn=i
	}for(var a=0,b;b=on[a];a++)b();on=[]
}Me("FR_Friends_initializeHovercards",rn);function sn(a,b,c) {
	qn(function () {
		var d=kn();
		if(c)d.nickname=c;
		window.addHovercard(b,a,d)
	})
}var tn=0,un="alternate",vn="related",wn="enclosure",xn="via",yn="feed",zn=[un,vn,"self",wn,xn,yn],An="ReaderJsonCallback",Bn="callback",Cn="n";
function Dn(a,b,c) {
	function d(g) {
		window[f]=h;
		c(g)
	}var f=An+tn;
	tn++;
	window[f]=d;
	a=new Sg(a);
	a.cb(Bn,f);
	b>=0&&a.cb(Cn,b+n);
	b=N(Ui,{
		type:en,src:a.toString ()
	});
	document.getElementsByTagName(gn)[0].appendChild(b)
}function En(a,b,c) {
	Dn(Jj(Pa+a.streamId),b,c)
}function Fn(a,b) {
	Dn(Jj(Qa+a.streamId),-1,b)
}function Gn(a) {
	var b={
	};
	for(var c=0;c<zn.length;c++)if(zn[c] in a)b[zn[c]]=a[zn[c]];return b
}var Hn="http://www.google.com";
function In(a) {
	if(a.href.indexOf(Hn+Oa)==-1)return h;
	try{
		var b=Fk(a.href.replace(Hn+Oa,n))
	}catch(c) {
		return h
	}a=Lf(a.title);
	return {
		h:b,q:a
	}
}function Jn() {
	var a={
	};
	if(!window||!window.location||!window.location.href)return a;
	var b=window.location.href.split($f)[1];
	if(!b)return a;
	b=b.split(Hf);
	for(var c=0,d;d=b[c];c++) {
		var f=d.indexOf(mh);
		a[d.substring(0,f)]=d.substring(f+1)
	}return a
}function Kn(a,b,c) {
	b=b.split($f)[0]+c;
	Ln(a,b)
}function Ln(a,b) {
	try{
		a.location.replace(b)
	}catch(c) {
		a.location=b
	}
}
function Mn(a) {
	return a.replace(/[\r|\n]/g,n)
}function Nn(a) {
	try{
		return le(a._USER_ID)&&le(a._USER_EMAIL)
	}catch(b) {
		return e
	}
}var On="#refresh=1";
function _finishSignIn() {
	Kn(top,_OPENER_URL,On)
}function Pn() {
}Pn.prototype.Qk=function () {
	return h
};
function Qn() {
	Pn.call(this)
}v(Qn,Pn);
Qn.prototype.CE=function () {
	if(document.selection&&document.selection.createRange)return document.selection.createRange().text?document.selection.createRange().htmlText:n;
	else if(window.getSelection) {
		var a=window.getSelection();
		if(a.rangeCount>0) {
			var b=Th().createElement(C);
			b.appendChild(a.getRangeAt(0).cloneContents());
			return b.innerHTML
		}
	}return n
};
Qn.prototype.Qk=function () {
	return Mn(this.CE())
};
function Rn() {
	Pn.call(this)
}v(Rn,Pn);
var Sn="meta",Tn="name",Un="DESCRIPTION",Vn="content";
Rn.prototype.Qk=function () {
	var a=document.getElementsByTagName(Sn);
	for(var b=0,c;c=a[b];b++) {
		var d=c.getAttribute(Tn);
		if(d&&d.toUpperCase()==Un)return c.getAttribute(Vn)
	}return h
};
function Wn() {
	Pn.call(this)
}v(Wn,Pn);
var Xn="youtube.com",Yn="/watch",Zn="embed_code";
Wn.prototype.Qk=function () {
	var a=new Sg(window.location.href);
	if(!nf(a.Ie,Xn))return h;
	if(Yn!=a.bb)return h;
	if(a=document.getElementById(Zn))return a.value;
	return h
};
var $n=[new Wn,new Qn,new Rn,new Pn];
function ao() {
	var a=h;
	for(var b=0;a=$n[b];b++) {
		if(a=a.Qk())return a
	}return n
}var bo="GR________link_bookmarklet_node",co="GR________link_bookmarklet_frame";
function eo(a,b,c) {
	if(a[b]) {
		Kn(window,window.location.href,$f);
		c()
	}
}function fo() {
	return (window.GR________bookmarklet_domain||window.location.protocol+Vg+window.location.host)+gb
}
function go() {
	var a=new ho;
	a.Hb(document.title);
	a.jn(window.location.href);
	a.Zj(ao());
	a.gn(window.location.host);
	a.hn(window.location.protocol+Vg+window.location.host+ch);
	return a
}function io(a,b) {
	if(!document)return e;
	var c=document.contentType;
	if(c&&Uj(c)==a)return i;
	if(document.body&&document.body.childNodes.length==2&&document.body.firstChild.tagName&&document.body.firstChild.tagName.toLowerCase()==b)return i;
	return e
}var jo='<img src="';
function ko() {
	var a=new ho,b=document.location.pathname.split(ch);
	a.Hb(b[b.length-1]);
	b=document.location.href;
	a.jn(b);
	a.Zj(jo+b+Qi);
	a.gn(window.location.host);
	a.hn(window.location.protocol+Vg+window.location.host+ch);
	return a
}var lo=u("Video"),mo='<a href="',no="</a>";
function oo() {
	var a=new ho,b=document.location.pathname.split(ch);
	a.Hb(b[b.length-1]);
	b=document.location.href;
	a.jn(b);
	a.Zj(mo+b+Qi+lo+no);
	a.gn(window.location.host);
	a.hn(window.location.protocol+Vg+window.location.host+ch);
	return a
}var po=h;
function qo(a,b) {
	this.fq=a;
	this.rA=b
}m=qo.prototype;
m.clear=function (a) {
	window.clearInterval(this.ej);
	if(this.fq)return ;
	var b=Yh(bo);
	b.innerHTML=n;
	a&&b.parentNode.removeChild(b);
	po=h
};
m.qE=function () {
	if(Qh)return window.frames[co];
	var a=Yh(co);
	return a?a.contentWindow:h
};
m.zh=function () {
	return this.qE()?i:e
};
var ro="refresh",so="close";
m.fD=function () {
	if(!this.fq&&!this.zh())return ;
	var a=Jn(),b=this;
	eo(a,ro,function () {
		b.clear();
		b.C(go())
	});
	eo(a,so,r(b.clear,b,i))
};
m.C=function (a) {
	this.fq?this.hG(a):this.cG(a);
	this.ej=window.setInterval(r(this.fD,this),50)
};
var to="height=378,width=520",uo="Grrr! A popup blocker may be preventing Google Reader from opening the page. If you have a popup blocker, try disabling it to open the window.";
m.hG=function (a) {
	if(!window.open(this.rA?this.cE(a):n,co,to)) {
		alert(uo);
		return
	}this.rA||this.Kz(a)
};
var vo='<iframe frameborder="0" id="',wo='" name="',xo='" style="width:100%;height:100%;border:0px;padding:0px;margin:0px"></iframe>';
m.cG=function (a) {
	if(this.zh())return ;
	Yh(bo).innerHTML=vo+co+wo+co+xo;
	this.Kz(a)
};
m.Kz=function (a) {
	a=a.ND(fo(),co);
	document.body.appendChild(a);
	a.submit()
};
m.cE=function (a) {
	return a.OD(fo())
};
function ho() {
}m=ho.prototype;
m.Hb=function (a) {
	this.q=a
};
m.jn=function (a) {
	this.Ae=a
};
m.Zj=function (a) {
	this.Gg=a
};
m.gn=function (a) {
	this.GL=a
};
m.hn=function (a) {
	this.HL=a
};
m.WK=function (a) {
	this.Cz=a
};
var yo="srcItemId",zo="title",Ao="url",Bo="srcTitle",Co="srcUrl",Do="snippet";
m.fv=function (a) {
	if(this.Cz)a(yo,this.Cz);
	else {
		a(zo,this.q);
		a(Ao,this.Ae);
		a(Bo,this.GL);
		a(Co,this.HL);
		a(Do,bg(this.Gg,100000))
	}
};
var Eo="form",Fo="POST",Go="utf-8",Ho='<input type="hidden" name="',Io='" value="';
m.ND=function (a,b) {
	var c=Th().createElement(Eo);
	c.method=Fo;
	c.target=b;
	c.action=a;
	c.acceptCharset=Go;
	var d=[];
	function f(g,k) {
		if(!k)return ;
		d.push(Ho+Lf(g)+Io+Lf(k)+Qi)
	}this.fv(f);
	c.innerHTML=d.join(n);
	return c
};
m.OD=function (a) {
	var b=a;
	this.fv(function (c,d) {
		if(d)b=P(b,c,d)
	});
	return b
};
m.pn=function (a,b) {
	(a=a||z||Oh)||this.uL();
	po=new qo(a,b);
	po.C(this)
};
m.eC=function () {
	po&&po.clear(i)
};
m.BG=function () {
	return po!=h
};
var Jo="absolute",Ko="fixed",Lo="#fff",Mo="4px solid #c3d9ff",No="8px",Oo="520px",Po="378px";
m.uL=function () {
	document.body.scrollTop=document.documentElement.scrollTop=0;
	var a=Yh(bo);
	if(!a) {
		a=Th().createElement(C);
		a.id=bo;
		a.style.position=z&&mg(zh,6)==0?Jo:Ko;
		a.style.background=Lo;
		a.style.border=Mo;
		a.style.top=No;
		a.style.right=No;
		a.style.width=Oo;
		a.style.height=Po;
		a.style.zIndex=100000;
		document.body.appendChild(a)
	}
};
Me("removeLinkFrame",function () {
	po.clear(i)
});
var Qo="video",Ro="embed",So="img";
if(!Nn(window))if(io(Qo,Ro))oo().pn(i,i);
else io("image",So)?ko().pn(Qh?e:i,Qh?e:i):go().pn();
var To={
},Uo={
	blue:{
		Hf:Lo,qf:"#bccceb",Kg:"#090992",Jg:"#bccceb",og:"#1010c8",me:"#7a7ee0",Rf:"#e5ecf9",de:"#898de9"
	},green:{
		Hf:Lo,qf:"#d8dbbc",Kg:"#2d8509",Jg:"#d8dbbc",og:"#58bf2f",me:"#97e07a",Rf:"#f5fbeb",de:"#adb094"
	},slate:{
		Hf:"#123",qf:"#345",Kg:"#5e805e",Jg:"#5e6f80",og:"#abc",me:"#5e6f80",Rf:"#152939",de:"#abc"
	},gray:{
		Hf:Lo,qf:"#ccc",Kg:"#666",Jg:"#ccc",og:"#999",me:"#ccc",Rf:"#eee",de:"#aaa"
	},khaki:{
		Hf:"#f2e9ca",qf:"#8e7c6a",Kg:"#d52",Jg:"#cba",og:"#543",me:"#ba9",Rf:"#eae0c6",de:"#987"
	},
	pink:{
		Hf:Lo,qf:"#aaa",Kg:"#d69",Jg:"#ddd",og:"#e684ad",me:"#ebc",Rf:"#fcf0f7",de:"#a88"
	},black:{
		Hf:"#000",qf:"#aaa",Kg:"#ccc",Jg:"#d8dbbc",og:"#d52",me:"#7a2b0e",Rf:"#111",de:"#999"
	}
},Vo="left",Wo={
	margin:0,padding:0,background:"transparent none",border:hb,textAlign:Vo,textIndent:ca,textDecoration:hb,fontWeight:"normal"
},Xo="readerpublishermodule",Yo='<div id="',Zo='" class="reader-publisher-module"></div>';
function $o(a,b) {
	this.Am=Xo+this.eE();
	this.Ge=a;
	this.Fc=To.c;
	this.q=To.t;
	this.zL=To.s==q;
	this.jg=To.b==q;
	if(b) {
		b.innerHTML=n;
		b.id=this.Am;
		this.ou(J(this.Am))
	}else {
		document.write(Yo+this.Am+Zo);
		var c=this;
		window.setTimeout(function () {
			c.ou(J(c.Am))
		},0)
	}
}var ap="GRC_c";
$o.prototype.eE=function () {
	ap in window||(window.GRC_c=0);
	return window.GRC_c++
};
function bp(a) {
	To=a
}var cp="h3",dp="ul",ep="li",fp="i",gp="s",hp="from <a>%1</a>",ip="f",jp="Read more...";
$o.prototype.ou=function (a) {
	function b(s) {
		return s
	}var c=this.IE();
	this.Ud(c.RH,a);
	if(this.q) {
		var d=N(cp);
		this.Ud(c.QH,d);
		d.appendChild(sj(this.q));
		a.appendChild(d)
	}d=N(dp);
	this.Ud(c.qH,d);
	for(var f=0,g;g=this.Ge.items[f];f++) {
		if(!g.alternate)continue;
		var k=N(ep);
		this.Ud(c.pH,k);
		var l=N(Vf,{
			href:b(g.alternate.href),title:g.title,"class":fp
		});
		this.Ud(c.mH,l);
		var p=Oj(g.title||g.content);
		sf(p)||(p=Vj(p,48));
		l.appendChild(sj(p));
		k.appendChild(l);
		if(this.zL&&!this.jg&&g.origin.title) {
			l=g.origin;
			g=N(C,
			{
				"class":gp
			});
			this.Ud(c.oH,g);
			k.appendChild(g);
			var p=l.title;
			if(p.length>48)p=p.substring(0,48);
			g.innerHTML=O(hp,p);
			if(l.htmlUrl) {
				l=N(Vf,{
					href:b(l.htmlUrl)
				});
				l.innerHTML=p;
				this.Ud(c.nH,l);
				g.replaceChild(l,g.getElementsByTagName(Vf)[0])
			}
		}d.appendChild(k)
	}a.appendChild(d);
	b=N(C,{
		"class":ip
	});
	this.Ud(c.ED,b);
	if(this.Ge.id) {
		(d=this.Ge.id.indexOf(Ik)==0)||(d=this.Ge.id.indexOf(Jk)==0);
		f=this.Ge.alternate&&this.Ge.alternate.href;
		if(!d||f) {
			f=N(Vf);
			this.Ud(c.de,f);
			f.href=d?this.Ge.alternate.href:bk(Hn+$a+
			this.Ge.id);
			f.appendChild(sj(jp));
			b.appendChild(f)
		}
	}a.appendChild(b)
};
var kp="arial, sans-serif",lp="10pt",mp="solid 4px ",np="0.5em",op="0.2em 0",pp="0 0.5em",qp="8px 8px 0 0",rp="solid 1px ",sp="0.2em",tp="0.4em 0 0.4em 0",up="right",vp="0 0 4px 4px",wp="0.2em 8px",xp="small",yp="nowrap",zp="underline";
$o.prototype.IE=function () {
	if(this.Fc==Kk)return {
	};
	var a=Uo[this.Fc];
	return {
		RH:{
			fontFamily:kp,fontSize:lp,MozBorderRadius:No,background:a.Hf,border:mp+a.qf,margin:np
		},QH:{
			padding:op,margin:pp,MozBorderRadius:qp,borderBottom:rp+a.Jg,color:a.Kg
		},qH:{
			padding:sp,margin:pp,overflow:Q
		},pH:{
			listStyleType:hb,padding:tp
		},mH:{
			color:a.og,borderBottom:rp+a.me
		},oH:{
			paddingLeft:np,color:a.me
		},nH:{
			color:a.me
		},ED:{
			textAlign:up,borderTop:rp+a.qf,background:a.Rf,MozBorderRadius:vp,padding:wp,fontSize:xp,whiteSpace:yp
		},
		de:{
			color:a.de,textDecoration:zp
		}
	}
};
$o.prototype.Ud=function (a,b) {
	if(!a)return ;
	Ap(b);
	for(var c in a)b.style[c]=a[c]
};function Ap(a) {
	for(var b in Wo)a.style[b]=Wo[b]
}window.GRC_p=bp;window.GRC=$o;function Bp(a) {
	this.lz=a
}var Cp="settings-notifier-state";
Bp.prototype.ap=function (a) {
	if(this.lz)return (this.lz[Cp]&a)>0;
	return e
};
Bp.prototype.SG=function () {
	return this.ap(1)
};
Bp.prototype.DG=function () {
	return this.ap(2)
};
Bp.prototype.ZG=function () {
	return this.ap(4)
};
var Dp,Ep=h;
function Fp(a) {
	Ep=a
}
function Gp(a) {
	Dp=new Hp;
	Dp.dG();
	Dp.Ds(function () {
		Ip();
		var b=new Bp(Dp.nl()),c=b.SG()&&X.f()&&X.f().G(Uk());
		if(b.ZG()||c)X.u();
		b.DG()&&Jp.u();
		Kp.u();
		S.u();
		Y.u();
		Dp.sa=e;
		Lp.UA()
	});
	a&&typeofa==te&&Dp.Ds(a)
}function Hp() {
	this.sa=e;
	this.Vv=[]
}m=Hp.prototype;
var Mp="settings-link",Np="edit-extras";
m.dG=function () {
	this.sn(J(Mp),Np,t(Op,Ic))
};
var Pp="display";
m.sn=function (a,b,c) {
	if(a.tagName&&a.tagName.toLowerCase()==Vf)a.href=P(Ra,Pp,b);
	return U(a,T,function (d) {
		d.preventDefault();
		function f() {
			Dp.vL(b);
			c&&c()
		}Ep?Ep(f):f()
	})
};
var Qp="settings-frame",Rp="?mode=nochrome",Sp="settings-initial-display";
m.vL=function (a) {
	if(this.sa)return ;
	this.sa=i;
	Lp.TF();
	this.nl()&&B(this.nl().parentNode);
	Tp(window,Qp,bk(Ra+Rp));
	var b=0,c=this,d=window.setInterval(function () {
		b++;
		var f=c.nl();
		if(b>=800||f) {
			if(a)f[Sp]=a;
			f.hideCallbacks=c.Vv;
			window.clearInterval(d)
		}
	},50);
	Up()
};
m.nl=function () {
	return J(Qp)
};
m.Ds=function (a) {
	this.Vv.push(a)
};
var Vp='<iframe id="',Wp='" src="',Xp='" frameborder="0" scrolling=no></iframe>';
function Tp(a,b,c) {
	var d=J(b,a.document);
	if(!d) {
		d=N(C,h,a.document);
		a.document.body.appendChild(d);
		d.innerHTML=Vp+b+wo+b+Wp+c+Xp;
		d=J(b,a.document)
	}return d
}function Yp(a) {
	return eval(oh+a+ph)
}var Zp=h;
function $p(a) {
	Zp||(Zp=new aq);
	return Zp.Vm(a)
}function aq() {
}aq.prototype.Vm=function (a) {
	var b=[];
	this.yr(a,b);
	return b.join(n)
};
var bq="boolean";
aq.prototype.yr=function (a,b) {
	switch(typeofa) {
		case Be:this.Hy(a,b);
		break;
		case qe:this.eK(a,b);
		break;
		case bq:b.push(a);
		break;
		case "undefined":b.push(ue);
		break;
		case pe:if(a==h) {
			b.push(ue);
			break
		}if(ze(a)) {
			this.dK(a,b);
			break
		}this.fK(a,b);
		break;
		case te:break;
		default:j(Error("Unknown type: "+typeofa))
	}
};
var cq={
	'"':'\\"',"\\":"\\\\","/":"\\/","\u0008":"\\b","\u000c":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\u000b":"\\u000b"
},dq="000",eq="00";
aq.prototype.Hy=function (a,b) {
	b.push(Kf,a.replace(/[\\\"\x00-\x1f\x80-\uffff]/g,function (c) {
		if(c in cq)return cq[c];
		var d=c.charCodeAt(0),f=gg;
		if(d<16)f+=dq;
		else if(d<256)f+=eq;
		else if(d<4096)f+=ca;
		return cq[c]=f+d.toString (16)
	}),Kf)
};
aq.prototype.eK=function (a,b) {
	b.push(isFinite(a)&&!isNaN(a)?a:ue)
};
var fq="[",gq=",",hq="]";
aq.prototype.dK=function (a,b) {
	var c=a.length;
	b.push(fq);
	var d=n;
	for(var f=0;f<c;f++) {
		b.push(d);
		this.yr(a[f],b);
		d=gq
	}b.push(hq)
};
var iq="{",jq="}";
aq.prototype.fK=function (a,b) {
	b.push(iq);
	var c=n;
	for(var d in a)if(a.hasOwnProperty (d)) {
		var f=a[d];
		if(typeoff!=te) {
			b.push(c);
			this.Hy(d,b);
			b.push(ga);
			this.yr(f,b);
			c=gq
		}
	}b.push(jq)
};
function kq() {
	this.yn=h
}m=kq.prototype;
m.R=function () {
	return this.L
};
m.Xc=function () {
	return this.q
};
m.Wi=function () {
	if(!le(this.Gg)) {
		var a=Oj(this.pi,i)||n;
		this.Gg=bg(a,200)
	}return this.Gg
};
m.Ve=function (a) {
	return this.pe[a]
};
m.We=function (a) {
	if(a in this.pe)return this.pe[a].cf;
	return h
};
m.Uf=function () {
	return this.co
};
m.Ah=function (a) {
	for(var b=0;b<this.fd.length;b++)if(this.fd[b].G(a))return i;return e
};m.yk=function (a) {
	if(this.Ah(a))return e;
	this.fd.push(a);
	this.yn&&this.yn(a,h);
	return i
};
m.fr=function (a) {
	var b=-1;
	for(var c=0;c<this.fd.length;c++)if(this.fd[c].G(a)) {
		b=c;
		break
	}if(b>=0) {
		$e(this.fd,b);
		this.yn&&this.yn(h,a);
		return i
	}return e
};
m.vp=function (a,b) {
	var c=[];
	for(var d=0;d<this.us.length;d++) {
		var f=this.us[d];
		if(a&&!a(f))continue;
		if(b) {
			var g=b(f.h);
			if(g)f={
				h:f.h,q:g
			}
		}c.push(f)
	}return c
};
m.lg=function () {
	return this.Ah(R.vd())
};
m.isReadStateLocked=function () {
	return this.cJ
};
m.Cc=function () {
	return this.gm
};
m.Eh=function () {
	return this.FG||this.gm
};
var lq="Can only create broadcast tags from entries created within Reader.";
m.Ni=function () {
	if(!this.Eh())j(Error(lq));
	return (new mq(this.Ku())).yb()
};
m.Ku=function () {
	if(!this.Eh())j(Error(lq));
	return this.kc.h.rb().userId
};
m.ll=function () {
	if(!this.gm)return h;
	return Jp.ol(Ek(this.Ni()))
};
m.PD=function () {
	if(this.Zn)return this.Zn;
	var a=[],b=this.gm;
	b&&this.ll()&&!this.ll().Yc&&a.push(this.ll());
	var c=this.vp(function (g) {
		return g.h.Eb()
	});
	for(var d=0,f;f=c[d];d++) {
		f=f.h.oa;
		if(!f||b&&Ve(a,f))continue;
		a.push(f)
	}for(var d=0;b=this.Os[d];d++) {
		f=Jp.ip(b.userId);
		if(!f||f.Yc||Ve(a,f))continue;
		a.push(f)
	}return this.Zn=a
};
m.Fu=function () {
	var a=N(C);
	a.innerHTML=this.pi;
	return a
};
function nq() {
}m=nq.prototype;
m.R=function () {
	return this.L
};
m.Xc=function () {
	return this.q
};
m.kl=function () {
	return this.mC
};
m.We=function (a) {
	if(a in this.pe)return this.pe[a].cf;
	return h
};
m.Ue=function () {
	return this.$a.length
};
m.Uf=function () {
	return this.co
};
m.Ri=function () {
	return this.$a
};
var oq="ltr";
function pq(a) {
	var b;
	kq.call(this);
	this.L=a.id;
	this.q=a.title;
	this.ZI=new Date(a.published*1000);
	this.NN=new Date(a.updated*1000);
	if(a.origin) {
		b=Fk(a.origin.streamId);
		this.kc={
			h:b,q:a.origin.title,PF:a.origin.htmlUrl
		};
		this.Os=a.annotations;
		if(b.J.Ka) {
			b=b.rb();
			this.gm=b.eu(R.hv());
			this.FG=b.eu(R.jE())
		}
	}this.co=Lf(a.author);
	this.fd=[];
	if(a.categories)for(var b=0;b<a.categories.length;b++)try{
		this.fd.push(Sk(a.categories[b]))
	}catch(c) {
	}this.pe={
	};
	this.us=[];
	var d=Gn(a);
	for(var f in d) {
		var g=d[f];
		if(g.length==
		0)continue;
		this.pe[f]={
			cf:g[0].href,P:g[0].type
		};
		if(g[0].streamId)this.pe[f].h=Fk(g[0].streamId);
		if(f==xn)for(var b=0;b<g.length;b++) {
			var k=In(g[b]);
			k&&this.us.push(k)
		}
	}f=a.content||a.summary;
	function l(p) {
		return p?Sf(qf(p)):n
	}if(f&&l(this.q)!=l(f.content)) {
		this.Ws=f.direction;
		this.pi=f.content
	}else {
		this.Ws=oq;
		this.pi=n
	}this.st=parseInt(a.crawlTimeMsec,10);
	this.cJ=!_USER_ID||a.isReadStateLocked;
	if(a.mediaGroup) {
		l=[];
		for(var b=0;b<a.mediaGroup.content.length;b++)l.push({
			Ae:a.mediaGroup.content[b].url
		});
		this.PH={
			vb:l
		}
	}this.kf=a
}v(pq,kq);
pq.prototype.yk=function (a) {
	if(!pq.d.yk.call(this,a))return ;
	if(!this.kf.categories)this.kf.categories=[];
	this.kf.categories.push(a.O())
};
pq.prototype.fr=function (a) {
	if(!pq.d.fr.call(this,a))return e;
	if(!this.kf.categories)return e;
	var b=-1;
	for(var c=0;c<this.kf.categories.length;c++)try{
		if(Sk(this.kf.categories[c]).G(a)) {
			b=c;
			break
		}
	}catch(d) {
	}if(b>=0)$e(this.kf.categories,b);
	return i
};
pq.prototype.Vm=function () {
	return $p(this.kf)
};
function qq(a) {
	try{
		var b=Yp(a);
		return new pq(b)
	}catch(c) {
		return h
	}
}function rq(a) {
	nq.call(this);
	a=Yp(a);
	this.L=a.id;
	this.q=a.title;
	this.mC=a.continuation;
	this.MN=new Date(a.updated*1000);
	this.co=Lf(a.author);
	this.$a=[];
	for(var b=0;b<a.items.length;b++)this.$a.push(new sq(a.items[b]));this.pe={
	};
	a=Gn(a);
	for(var c in a) {
		b=a[c];
		if(b.length==0)continue;
		this.pe[c]={
			cf:b[0].href,P:b[0].type
		}
	}
}v(rq,nq);
var sq=pq;
function tq(a) {
	this.ta=new Pg;
	a&&this.Pn(a)
}var uq="o";
function vq(a) {
	var b=typeofa;
	return b==pe?uq+Ge(a):b.substr(0,1)+a
}m=tq.prototype;
m.wc=function () {
	return this.ta.wc()
};
m.add=function (a) {
	this.ta.set(vq(a),a)
};
m.Pn=function (a) {
	a=Kg(a);
	var b=a.length;
	for(var c=0;c<b;c++)this.add(a[c])
};m.vf=function (a) {
	a=Kg(a);
	var b=a.length;
	for(var c=0;c<b;c++)this.remove(a[c])
};m.remove=function (a) {
	return this.ta.remove(vq(a))
};
m.clear=function () {
	this.ta.clear()
};
m.contains=function (a) {
	return this.ta.De(vq(a))
};
m.hc=function () {
	return this.ta.hc()
};
m.Rc=function () {
	return new tq(this)
};
m.G=function (a) {
	return this.wc()==Jg(a)&&this.WG(a)
};
m.WG=function (a) {
	var b=Jg(a);
	if(this.wc()>b)return e;
	if(!(ainstanceoftq)&&b>5)a=new tq(a);
	return Og(this,function (c) {
		return Mg(a,c)
	})
};
m.ji=function () {
	return this.ta.ji(e)
};
function wq(a) {
	W.call(this);
	var b;
	if(a)if(ze(a)) {
		b=[];
		for(var c=0;c<a.length;c++)b.push(a[c].z)
	}else b=[a.z];else b=[Vh().z];this.Wk=b;this.Uw=Ie();this.F=a=new Ll(this);for(var c=0;c<this.Wk.length;c++) {
		a.l(this.Wk[c],xq,this.Dl,i);
		a.l(this.Wk[c].body,yq,this.Dl,i)
	}
}
v(wq,W);
wq.prototype.gH=n;
wq.prototype.ux=0;
var zq="dblclick",Aq="mouseup",yq=[T,zq,om,Aq,qm],Bq="keyup",xq=[pm,Bq];
wq.prototype.k=function () {
	wq.d.k.call(this);
	this.F.n();
	this.F=h;
	delete this.Wk
};
wq.prototype.Dl=function (a) {
	var b=e;
	switch(a.type) {
		case qm:if(typeofthis.Yw==qe&&this.Yw!=a.clientX||typeofthis.Zw==qe&&this.Zw!=a.clientY)b=i;
		this.Yw=a.clientX;
		this.Zw=a.clientY;
		break;
		default:b=i
	}b&&this.DM(Ie(),a.type)
};
var Cq="activity";
wq.prototype.DM=function (a,b) {
	this.Uw=a;
	this.gH=b;
	if(a>this.ux) {
		this.dispatchEvent(Cq);
		this.ux=a+3000
	}
};
wq.prototype.fE=function (a) {
	return (a||Ie())-this.Uw
};
var Dq;
function Eq(a) {
	Dq=a
}function Fq(a,b,c) {
	var d=a.fd;
	a={
	};
	var f;
	for(var f=0,g;g=d[f];f++)a[g.O()]=i;d=[];for(f=0,g;g=b[f];f++)g.O() in a||d.push(g);b=[];for(f=0,g;g=c[f];f++)g.O() in a&&b.push(g);return {
		Td:d,se:b
	}
}function Gq(a,b,c,d) {
	b=Fq(a,b,c);
	if(b.Td.length==0&&b.se.length==0)return ;
	Dq(a,b.Td,b.se,d)
}var Hq="Oops...an error occurred. Please try again in a few seconds.";
function Iq(a,b,c,d) {
	var f=Jq(a,b,c);
	f?f.exec(d):Z(Hq,Kq);
	Lq(a,b,c)
}Dq=Iq;
function Lq(a,b,c) {
	var d=R.vd(),f=Y&&Y.cm();
	for(var g=0,k;k=b[g];g++) {
		f&&k.G(d)&&Y.NM(a);
		a.yk(k)
	}for(var g=0,k;k=c[g];g++) {
		f&&k.G(d)&&Y.PM(a);
		a.fr(k)
	}
}function Jq(a,b,c) {
	var d=a.kc.h.streamId;
	a=a.R();
	if(d&&a)return new Mq(d,a,b,c);
	return h
}var Nq=h;
function Oq(a) {
	S?S.aa(function (b) {
		a(b.length>0)
	}):Pq(ya,function (b) {
		a(b.subscriptions.length>0)
	})
}var Qq=h;
function Rq(a) {
	Qq=a
}
function Sq(a,b) {
	if(!_USER_ID) {
		b(e);
		return
	}if(a.Zc()) {
		b(i);
		return
	}if(a.Eb()) {
		b(i);
		return
	}if(Qq&&Qq(a,b))return ;
	var c=new Tq;
	c.va(function (d) {
		b(d.text==q)
	});
	a=P(Ga,gp,a.streamId);
	c.N(a)
}var Uq="output",Vq="json";
function Pq(a,b,c,d) {
	Wq(P(a,Uq,Vq),b,c,d)
}function Xq(a,b,c,d) {
	var f=Yq;
	if(d&&window[d]&&!f) {
		b(window[d]);
		window[d]=h;
		return
	}var g=new Tq;
	g.va(function () {
		var k=eval(oh+g.text+ph);
		b(k)
	});
	c&&g.Va(c);
	g.N(a)
}var Wq=Xq;
function Zq(a) {
	Wq=a
}
var $q="Are you sure you want to mark %1 items from %2 as read?",ar="Are you sure you want to mark more than %1 items from %2 as read?";
function br(a,b,c) {
	a=O(b<1000?$q:ar,[b,a]);
	c(confirm(a))
}function cr(a,b,c,d,f,g,k) {
	function l() {
		var p=new dr(a.streamId,c);
		b&&p.GK((b+1)*1000-1);
		p.exec(d,k)
	}Y?Y.uh(a,function (p) {
		p>50?(f||br)(c,p,function (s) {
			if(s)l();
			else g&&g()
		}):l()
	}):l()
}function er(a) {
	var b=[];
	a=a.fd;
	for(var c=0,d;d=a[c];c++)d.type==nb&&b.push(d);return b
}
function Op(a,b,c) {
	if(!_USER_ID)return ;
	a=t(fr,a,b||1,c||0.05);
	Nq?Nq(a):a()
}function gr(a) {
	Nq=a
}var hr="opmsg",ir="opusec",jr="op",kr="browser";
function fr(a,b,c) {
	if(Math.random()>c)return ;
	c=md;
	if(H.Og())c=Yc;
	else if(H.ii())c=dd;
	else if(H.vs())c=bd;
	else if(H.Kc())c=$c;
	else if(H.Vp)c=jd;
	else if(H.uw)c=hd;
	else if(H.le)c=fd;
	else if(H.gf)c=ld;
	var d=hr;
	if(typeofb==qe) {
		b=Math.round(b);
		d=ir
	}(new Tq).Tb(ab,Xj([[jr,a],[d,b],[kr,c]]))
}function lr(a,b) {
	if(!_USER_ID)return ;
	b=R.gc(b);
	Gq(a,[b],[])
}
function hk(a) {
	while(a.search(ka)!=-1)a=a.replace(ka,o);
	return a
}var mr;
function nr() {
	mr||(mr=[R.vd()]);
	return mr
}
var or={
	Dj:{
		cc:"item-star-active star link",Pe:function () {
			return [R.xd()]
		},Ye:function () {
			return []
		},Ed:"Remove star"
	},Aj:{
		cc:"item-star star link",Pe:function () {
			return []
		},Ye:function () {
			return [R.xd()]
		},Ed:"Add star"
	},sk:function () {
		return R.xd()
	}
},pr={
	Dj:{
		cc:"read-state-read read-state link",Pe:nr,Ye:function () {
			return [R.Zf()]
		},Ed:"Mark as read"
	},Aj:{
		cc:"read-state-unread read-state link",Pe:function () {
			return [R.Zf()]
		},Ye:nr,Ed:"Mark as read"
	},sk:function () {
		return R.vd()
	}
},qr={
	Dj:{
		cc:"read-state-kept-unread read-state link",
		Pe:function () {
			return [R.Zf()]
		},Ye:nr,Ed:"Keep unread"
	},Aj:{
		cc:"read-state-not-kept-unread read-state link",Pe:nr,Ye:function () {
			return [R.Zf()]
		},Ed:"Keep unread"
	},sk:function () {
		return R.Zf()
	}
},rr={
	Dj:{
		cc:"broadcast-active broadcast link",Pe:function () {
			return [R.yb()]
		},Ye:function () {
			return []
		},Ed:"Unshare"
	},Aj:{
		cc:"broadcast-inactive broadcast link",Pe:function () {
			return []
		},Ye:function () {
			return [R.yb()]
		},Ed:"Share"
	},sk:function () {
		return R.yb()
	}
},sr="empty";
function tr(a,b,c) {
	this.p=b;
	this.m=a;
	this.zj=c;
	this.Aw=a&&lf(a,sr);
	this.pG()
}m=tr.prototype;
m.pG=function () {
	if(this.m) {
		this.nf&&Cl(this.nf);
		this.nf=U(this.m,T,this.Ga,e,this)
	}if(!this.p.Sg)this.p.Sg=[];
	this.p.Sg.push(this);
	this.Zb()
};
m.n=function () {
	this.nf&&Cl(this.nf);
	Ze(this.p.Sg,this);
	this.p.Sg.length==0&&delete this.p.Sg
};
m.Ga=function (a) {
	a&&a.preventDefault();
	a=this.cv(i);
	Gq(this.p,a.Pe(),a.Ye());
	for(var a=0,b;b=this.p.Sg[a];a++)b.Zb()
};m.zI=function (a) {
	this.Qx=a
};
var ur=" unselectable";
m.Zb=function () {
	if(this.m) {
		var a=this.cv();
		this.m.className=a.cc+ur;
		if(this.Aw)w(this.m,sr);
		else try{
			if(a.Ed&&!this.Aw&&this.m.innerHTML!=a.Ed)this.m.innerHTML=a.Ed
		}catch(b) {
		}
	}this.Qx&&this.Qx()
};
m.cv=function (a) {
	return this.KG()?a?this.zj.Aj:this.zj.Dj:a?this.zj.Dj:this.zj.Aj
};
m.KG=function () {
	return this.p.Ah(this.zj.sk())
};
function vr(a,b) {
	tr.call(this,a,b,or)
}v(vr,tr);
function wr(a,b) {
	tr.call(this,a,b,pr)
}v(wr,tr);
function xr(a,b) {
	tr.call(this,a,b,qr)
}v(xr,tr);
function yr(a,b) {
	tr.call(this,a,b,rr)
}v(yr,tr);
var zr=/\s*;
\s/,Ar=";domain=",Br=";path=",Cr=";expires=";
function Dr(a,b,c,d,f) {
	if(/[;
	=]/.test(a))j(Error('Invalid cookie name "'+a+Kf));
	if(/;
	/.test(b))j(Error('Invalid cookie value "'+b+Kf));
	le(c)||(c=-1);
	f=f?Ar+f:n;
	d=d?Br+d:n;
	if(c<0)c=n;
	else if(c==0)c=Cr+(new Date(1970,1,1)).toUTCString();
	else {
		c=new Date((new Date).getTime()+c*1000);
		c=Cr+c.toUTCString()
	}document.cookie=a+mh+b+f+d+c
}
function Er(a,b) {
	a=a+mh;
	var c=String(document.cookie).split(zr);
	for(var d=0,f;f=c[d];d++)if(f.indexOf(a)==0)return f.substr(a.length);return b
}function Fr(a,b,c) {
	var d=Gr(a);
	Dr(a,n,0,b,c);
	return d
}function Gr(a) {
	var b={
	};
	return Er(a,b)!==b
}function Hr(a,b,c,d) {
	c=new Ir(a,c);
	c.Qg(ob,yc);
	c.exec(d);
	(new Mq(a,b,[R.lv()],[])).exec()
}var Jr="tz";
function Kr(a,b,c) {
	a=P(ra,gp,a.streamId);
	a=Qj(a,Jr,-(new Date).getTimezoneOffset());
	Pq(a,b,c)
}var Lr={
};
function Mr(a,b) {
	Lr[a.streamId]=b
}
function Nr(a,b) {
	if(a.streamId in Lr) {
		b(Lr[a.streamId]);
		return
	}var c=new Tq;
	c.va(function (f) {
		f=f.text;
		f=f!=ue?f:h;
		Lr[a.streamId]=f;
		b(f)
	});
	c.Va(function () {
		Lr[a.streamId]=h;
		b(h)
	});
	var d=P(Ja,gp,a.streamId);
	c.N(d)
}function Or(a,b,c) {
	return function () {
		Pr(a,b,c);
		return e
	}
}var Qr="Are you sure you&#39;d like to unsubscribe from these feeds?",Rr="Are you sure you&#39;d like to unsubscribe from &quot;%1&quot;?";
function Pr(a,b,c,d) {
	function f() {
		(new Sr(a,b)).exec(c)
	}if(d) {
		f();
		return
	}d=ainstanceofArray&&a.length>1?Qr:O(Rr,b);
	Tr(Sf(d),f)
}function Ur(a,b,c,d) {
	(new Vr(a,b.Td,b.se,c)).exec(d)
}var Wr="|",Xr=".google.com",Yr="You have subscribed to %1.";
function Zr(a) {
	var b=Er(ma).split(Wr),c=decodeURIComponent(b[0].replace(/\+/g,o));
	b=decodeURIComponent(b[1].replace(/\+/g,o));
	b=Fk(b);
	Fr(ma,ch,Xr);
	a(O(Yr,c));
	Dm(b)
}var $r='"%1" is not a valid tag name. The following characters are not allowed: ",<,>,?,&,/,\\,^';
function as(a) {
	if(sf(a))return [];
	var b=[];
	a=qf(a);
	a=a.split(/\s*,\s/);
	for(var c=0;c<a.length;c++) {
		var d=a[c];
		if(sf(d))continue;
		if(d.search(ka)!=-1)j(O($r,d));
		b.push(d)
	}return b
}function bs(a) {
	var b=[];
	for(var c=0;c<a.length;c++) {
		var d=R.vh(a[c]);
		b.push(d.O())
	}return b
}var cs="auto-discovery",ds="application/atom+xml";
function es(a,b) {
	if(!a.Hh())return ;
	var c=J(cs);
	if(c) {
		var d=c.href;
		if(d==Jj(a.xE())||d==Jj(a.Ru()))return ;
		B(c)
	}Zk.Xc(a,b,function (f) {
		c=N(tb,{
			rel:un,id:cs,type:ds,href:a.Ru(),title:f
		});
		document.getElementsByTagName(gn)[0].appendChild(c)
	})
}var fs={
},gs=e,hs="default";
function is(a,b,c) {
	if(!gs) {
		if(c) {
			b(a[hs]);
			return
		}window.setTimeout(function () {
			is(a,b)
		},50);
		return
	}b(fs[a.id]||a[hs])
}function js(a) {
	var b;
	is(a,function (c) {
		b=c
	},i);
	return b
}var ks="_STREAM_LIST_PREFS";
function ls() {
	if(gs)return ;
	Pq(oa,function (a) {
		for(var b=0,c;c=a.prefs[b];b++)fs[c.id]=c.value;gs=i
	},undefined,ks)
}function Ip() {
	gs=e;
	ls()
}var ms="k=",ns="&v=";
function os(a,b,c) {
	fs[a.id]=b;
	var d=new Tq;
	d.va(function () {
		c&&c()
	});
	d.Va(function () {
		Z(Hq,Kq)
	});
	d.Ej=e;
	d.Tb(na,ms+yf(a.id)+ns+yf(b))
}function ps(a,b) {
	this.id=a;
	this.II=b
}var qs="order-by-";
ps.prototype.pE=function () {
	return qs+this.id
};
ps.prototype.K=function () {
	return J(this.pE())
};
var rs="newest",ss={
	date:rs
},ts={
};
function us(a,b) {
	ts[a]=new ps(a,b)
}var vs="magic",ws="m";
us(vs,ws);
us(rs,Cn);
var xs="oldest";
us(xs,uq);
function ys(a) {
	is(Ub,function (b) {
		a(b==q)
	})
}function zs(a) {
	os(Ub,a.toString ())
}function As(a) {
	is(Yb,function (b) {
		a(b==q)
	})
}function Bs(a,b) {
	os(Yb,a.toString (),b)
}function Cs() {
	return js(Vb)==q
}function Ds(a) {
	is(dc,function (b) {
		a(b==q)
	})
}function Es(a) {
	os(dc,a.toString ())
}function Fs(a) {
	is(cc,function (b) {
		a(b==q)
	})
}function Gs(a) {
	os(cc,a.toString ())
}
function Hs(a) {
	is(Tb,function (b) {
		if(b!=h)b=parseInt(b.toString (),10);
		a(b)
	})
}function Is(a,b) {
	os(Tb,a.toString (),b)
}function Js() {
	if(!Ks())return e;
	return js(bc)==q
}function Ls(a) {
	os(bc,a.toString ())
}function Ms(a) {
	os(ac,a.toString ())
}function Ns(a) {
	is($b,function (b) {
		a(b==q)
	})
}function Ks() {
	var a;
	Os(function (b) {
		a=b
	});
	return a
}function Os(a) {
	is(ec,function (b) {
		a(b==q)
	})
}var Ps=e,Qs="Your start page has been changed to &quot;%1&quot;";
function Rs(a,b) {
	os(fc,a.toString ());
	Z(O(Qs,b),Ss)
}
function Ts(a) {
	is(fc,function (b) {
		a(b)
	})
}var Us="view",Vs="card";
function Ws() {
	if(!Ps) {
		var a=Zj(Us);
		if(a)return a==Vs
	}return js(Wb)==q
}function Xs(a) {
	Ps=i;
	os(Wb,a.toString ())
}function Ys(a) {
	os(jc,a.toString ())
}function Zs(a) {
	is(jc,function (b) {
		a(b==q)
	})
}function $s(a) {
	is(lc,function (b) {
		a(b==q)
	})
}function at(a) {
	os(lc,a.toString ())
}function bt(a,b) {
	os(mc,a.toString (),b)
}function ct(a) {
	is(mc,function (b) {
		a(b==q)
	})
}function dt(a) {
	os(Zb,a.toString ())
}function et(a) {
	is(Zb,function (b) {
		a(b)
	})
}
function ft(a,b) {
	os(ic,a.toString (),b)
}function gt(a) {
	is(ic,function (b) {
		a(b==q)
	})
}function ht(a,b) {
	os(hc,a?Xb:q,b)
}function it() {
	return js(nc)==q
}function jt(a,b,c,d) {
	this.top=le(a)?Number(a):undefined;
	this.right=le(b)?Number(b):undefined;
	this.bottom=le(c)?Number(c):undefined;
	this.left=le(d)?Number(d):undefined
}jt.prototype.Rc=function () {
	return new jt(this.top,this.right,this.bottom,this.left)
};
var kt="t, ",lt="r, ",mt="b, ",nt="l)";
jt.prototype.toString =function () {
	return oh+this.top+kt+this.right+lt+this.bottom+mt+this.left+nt
};
jt.prototype.contains=function (a) {
	return ot(this,a)
};
jt.prototype.expand=function (a,b,c,d) {
	if(Ee(a)) {
		this.top-=a.top;
		this.right+=a.right;
		this.bottom+=a.bottom;
		this.left-=a.left
	}else {
		this.top-=a;
		this.right+=b;
		this.bottom+=c;
		this.left-=d
	}return this
};
function ot(a,b) {
	if(!a||!b)return e;
	return b.x>=a.left&&b.x<=a.right&&b.y>=a.top&&b.y<=a.bottom
}
function pt(a,b,c,d) {
	this.left=a;
	this.top=b;
	this.width=c;
	this.height=d
}pt.prototype.Rc=function () {
	return new pt(this.left,this.top,this.width,this.height)
};
var qt=" - ",rt="w x ",st="h)";
pt.prototype.toString =function () {
	return oh+this.left+fa+this.top+qt+this.width+rt+this.height+st
};
pt.prototype.contains=function (a) {
	return this.left<=a.left&&this.left+this.width>=a.left+a.width&&this.top<=a.top&&this.top+this.height>=a.top+a.height
};
var tt;
function ut(a,b) {
	var c=Wh(a);
	if(c.defaultView&&c.defaultView.getComputedStyle) {
		if(a=c.defaultView.getComputedStyle(a,n))return a[b]
	}return h
}function vt(a,b) {
	return ut(a,b)||(a.currentStyle?a.currentStyle[b]:h)||a.style[b]
}var wt="position";
function xt(a) {
	return vt(a,wt)
}var yt="px";
function zt(a,b,c) {
	var d;
	if(binstanceofnh) {
		d=b.x;
		b=b.y
	}else {
		d=b;
		b=c
	}a.style.left=typeofd==qe?Math.round(d)+yt:d;
	a.style.top=typeofb==qe?Math.round(b)+yt:b
}
function At(a) {
	a=a?a.nodeType==9?a:Wh(a):Th().z;
	if(z&&a.compatMode!=ii)return a.body;
	return a.documentElement
}var Bt="1.8.0.11",Ct="TR",Dt="static",Et="relative";
function Ft(a) {
	var b=Wh(a),c=Ph&&b.getBoxObjectFor&&xt(a)==Jo&&(a.style.top==n||a.style.left==n);
	if(typeoftt=="undefined")tt=wh&&!Sh(Bt);
	var d=new nh(0,0),f=At(b);
	if(a==f)return d;
	var g=h;
	if(a.getBoundingClientRect&&!c) {
		c=a.getBoundingClientRect();
		b=Vh(b).Xf();
		d.x=c.left+b.x;
		d.y=c.top+b.y
	}else if(b.getBoxObjectFor&&!c&&!tt) {
		c=b.getBoxObjectFor(a);
		b=b.getBoxObjectFor(f);
		d.x=c.screenX-b.screenX;
		d.y=c.screenY-b.screenY
	}else {
		g=a;
		do{
			d.x+=g.offsetLeft;
			d.y+=g.offsetTop;
			if(g!=a) {
				d.x+=g.clientLeft||0;
				d.y+=
				g.clientTop||0
			}if(Qh&&xt(g)==Ko) {
				d.x+=b.body.scrollLeft;
				d.y+=b.body.scrollTop;
				break
			}g=g.offsetParent
		}while(g&&g!=a);
		if(Oh||Qh&&xt(a)==Jo)d.y-=b.body.offsetTop;
		g=a.offsetParent;
		while(g&&g!=b.body) {
			d.x-=g.scrollLeft;
			if(!Oh||g.tagName!=Ct)d.y-=g.scrollTop;
			g=g.offsetParent
		}
	}if(Ph&&a.getBoundingClientRect) {
		a=xt(a);
		if(a==Dt||a==Et) {
			d.x=Math.floor(d.x);
			d.y=Math.floor(d.y)
		}
	}return d
}function Gt(a) {
	return Ft(a).y
}
function Ht(a,b,c) {
	var d=Ft(a);
	if(binstanceofnh) {
		c=b.y;
		b=b.x
	}zt(a,a.offsetLeft+(b-d.x),a.offsetTop+(c-d.y))
}function It(a,b,c) {
	if(binstanceofqh) {
		c=b.height;
		b=b.width
	}else {
		if(c==undefined)j(Error("missing height argument"));
		c=c
	}a.style.width=typeofb==qe?Math.round(b)+yt:b;
	a.style.height=typeofc==qe?Math.round(c)+yt:c
}
function Jt(a) {
	if(vt(a,Pp)!=hb)return new qh(a.offsetWidth,a.offsetHeight);
	var b=a.style,c=b.display,d=b.visibility,f=b.position;
	b.visibility=Q;
	b.position=Jo;
	b.display=n;
	var g=a.offsetWidth;
	a=a.offsetHeight;
	b.display=c;
	b.position=f;
	b.visibility=d;
	return new qh(g,a)
}function Kt(a) {
	var b=Ft(a);
	a=Jt(a);
	return new pt(b.x,b.y,a.width,a.height)
}var Lt="opacity",Mt="MozOpacity",Nt="filter",Ot="alpha(opacity=";
function Pt(a,b) {
	var c=a.style;
	if(Lt in c)c.opacity=b;
	else if(Mt in c)c.MozOpacity=b;
	else if(Nt in c) {
		a=Wh(a).documentMode>=8?Rj:n;
		c.filter=a+Ot+b*100+ph+a
	}
}function Qt(a,b) {
	a.style.display=b?n:hb
}function Rt(a) {
	return a?Ce(a)||a.nodeType==3?i:Te(a,Rt):e
}var St=Ph&&!Sh(mj),Tt="rtl",Ut="direction";
function Vt(a) {
	return Tt==vt(a,Ut)
}var Wt=Ph?"MozUserSelect":Qh?"WebkitUserSelect":h,Xt="unselectable";
function Yt(a,b,c) {
	c=!c?a.getElementsByTagName(Ni):h;
	if(Wt) {
		b=b?hb:n;
		a.style[Wt]=b;
		if(c)for(var a=0,d;d=c[a];a++)d.style[Wt]=b
	}else if(z||Oh) {
		b=b?wl:n;
		a.setAttribute(Xt,b);
		if(c)for(var a=0,d;d=c[a];a++)d.setAttribute(Xt,b)
	}
}function Zt() {
}oe(Zt);
Zt.prototype.bI=0;
Zt.prototype.oE=function () {
	return ga+(this.bI++).toString (36)
};
function $t(a) {
	W.call(this);
	this.j=a||Vh();
	this.Oj=au
}v($t,W);
$t.prototype.SF=Zt.ud();
var au=h,bu="disable",cu="enable",du="highlight",eu="unhighlight",fu="activate",gu="deactivate",hu="select",iu="unselect",ju="check",ku="uncheck",lu="focus",mu="blur",nu="open";
function ou(a,b) {
	switch(a) {
		case 1:return b?bu:cu;
		case 2:return b?du:eu;
		case 4:return b?fu:gu;
		case 8:return b?hu:iu;
		case 16:return b?ju:ku;
		case 32:return b?lu:mu;
		case 64:return b?nu:so;
		default:
	}j(Error("Invalid component state"))
}m=$t.prototype;
m.L=h;
m.j=h;
m.U=e;
m.g=h;
m.Oj=h;
m.zm=h;
m.A=h;
m.T=h;
m.Qc=h;
m.wA=h;
m.R=function () {
	return this.L||(this.L=this.SF.oE())
};
m.Vy=function (a) {
	if(this.A&&this.A.Qc) {
		Ag(this.A.Qc,this.L);
		Bg(this.A.Qc,a,this)
	}this.L=a
};
m.e=function () {
	return this.g
};
m.Jd=function (a) {
	this.g=a
};
var pu="Unable to set parent component";
m.Gr=function (a) {
	if(this==a)j(Error(pu));
	if(a&&this.A&&this.L&&this.A.Hu(this.L)&&this.A!=a)j(Error(pu));
	this.A=a
};
m.mp=function () {
	return this.A
};
m.o=function () {
	this.g=this.j.createElement(C)
};
m.nc=function (a) {
	this.sy(a)
};
var qu="Component already rendered";
m.sy=function (a,b) {
	if(this.U)j(Error(qu));
	this.g||this.o();
	a?a.insertBefore(this.g,b||h):this.j.z.body.appendChild(this.g);
	if(!this.A||this.A.U)this.ea()
};
m.ka=function (a) {
	if(this.U)j(Error(qu));
	else if(a&&this.Mb(a)) {
		this.wA=i;
		if(!this.j||this.j.z!=Wh(a))this.j=Vh(a);
		this.Wd(a);
		this.ea()
	}else j(Error("Invalid element to decorate"))
};
m.Mb=function () {
	return i
};
m.Wd=function (a) {
	this.g=a
};
m.ea=function () {
	this.U=i;
	this.fh(function (a) {
		!a.U&&a.e()&&a.ea()
	})
};
m.Ra=function () {
	this.fh(function (a) {
		a.U&&a.Ra()
	});
	this.U=e
};
m.k=function () {
	$t.d.k.call(this);
	this.U&&this.Ra();
	this.fh(function (a) {
		a.n()
	});
	!this.wA&&this.g&&B(this.g);
	this.Qc=this.T=h;
	this.zm=this.g=h;
	this.A=h
};
m.KK=function (a) {
	this.zm=a
};
m.bc=function (a,b) {
	this.uk(a,this.Wf(),b)
};
m.uk=function (a,b,c) {
	if(a.U&&(c||!this.U))j(Error(qu));
	if(b<0||b>this.Wf())j(Error("Child component index out of bounds"));
	if(!this.Qc||!this.T) {
		this.Qc={
		};
		this.T=[]
	}if(a.A==this) {
		Cg(this.Qc,a.R());
		Ze(this.T,a)
	}else Bg(this.Qc,a.R(),a);
	a.Gr(this);
	Xe(this.T,a,b);
	if(a.U&&this.U&&a.A==this) {
		c=this.Y();
		c.insertBefore(a.e(),c.childNodes[b+1]||h)
	}else if(c) {
		this.g||this.o();
		b=this.Vf(b+1);
		a.sy(this.Y(),b?b.g:h)
	}else this.U&&!a.U&&a.g&&a.ea()
};
m.Y=function () {
	return this.g
};
m.Gh=function () {
	if(this.Oj==h)this.Oj=Vt(this.U?this.g:this.j.z.body);
	return this.Oj
};
m.ci=function (a) {
	if(this.U)j(Error(qu));
	this.Oj=a
};
m.Ov=function () {
	return !!this.T&&this.T.length!=0
};
m.Wf=function () {
	return this.T?this.T.length:0
};
m.Hu=function (a) {
	return this.Qc&&a?Dg(this.Qc,a)||h:h
};
m.Vf=function (a) {
	return this.T?this.T[a]||h:h
};
m.fh=function (a,b) {
	this.T&&Pe(this.T,a,b)
};
m.Pl=function (a) {
	return this.T&&a?Oe(this.T,a):-1
};
m.removeChild=function (a,b) {
	if(a) {
		var c=Ce(a)?a:a.R();
		a=this.Hu(c);
		if(c&&a) {
			Ag(this.Qc,c);
			Ze(this.T,a);
			if(b) {
				a.Ra();
				a.g&&B(a.g)
			}a.Gr(h)
		}
	}if(!a)j(Error("Child is not in parent component"));
	return a
};
m.oJ=function (a,b) {
	return this.removeChild(this.Vf(a),b)
};
m.ny=function (a) {
	while(this.Ov())this.oJ(0,a)
};
var ru,su="role";
function tu(a,b) {
	if(Ph||ru) {
		a.setAttribute(su,b);
		a.AN=b
	}
}var uu="aria-";
function vu(a,b,c) {
	if(Ph||ru)a.setAttribute(uu+b,c)
}var wu="activedescendant";
function xu(a,b) {
	vu(a,wu,b?b.id:n)
}function yu(a) {
	var b;
	while(a) {
		b=Ge(a);
		if(b=zu[b])break;
		a=a.d?a.d.constructor :h
	}if(b)return De(b.ud)?b.ud():new b;
	return h
}function Au(a,b) {
	if(!De(a))j(Error("Invalid component class "+a));
	if(!De(b))j(Error("Invalid renderer class "+b));
	a=Ge(a);
	zu[a]=b
}function Bu(a,b) {
	if(!a)j(Error("Invalid class name "+a));
	if(!De(b))j(Error("Invalid decorator function "+b));
	Cu[a]=b
}
function Du(a) {
	var b=jf(a);
	for(var c=0,d=b.length;c<d;c++)if(a=b[c] in Cu?Cu[b[c]]():h)return a;return h
}var zu={
},Cu={
};
function cn(a) {
	W.call(this);
	a&&this.mi(a)
}v(cn,W);
m=cn.prototype;
m.g=h;
m.km=h;
m.sq=h;
m.lm=h;
m.nj=-1;
m.lj=-1;
m.ax=0;
var Eu={
	"3":13,"12":144,"63232":38,"63233":40,"63234":37,"63235":39,"63236":112,"63237":113,"63238":114,"63239":115,"63240":116,"63241":117,"63242":118,"63243":119,"63244":120,"63245":121,"63246":122,"63247":123,"63248":44,"63272":46,"63273":36,"63275":35,"63276":33,"63277":34,"63289":144,"63302":45
},Fu={
	Up:38,Down:40,Left:37,Right:39,Enter:13,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,"U+007F":46,Home:36,End:35,PageUp:33,PageDown:34,Insert:45
},Gu={
	61:187,
	59:186
},Hu=z||Qh&&Sh(Em);
m=cn.prototype;
m.yd=function (a) {
	if(Hu&&!Fm(a.keyCode,this.nj,a.shiftKey))this.handleEvent(a);
	else this.lj=Ph&&a.keyCode in Gu?Gu[a.keyCode]:a.keyCode
};
m.bF=function () {
	this.nj=-1
};
m.handleEvent=function (a) {
	var b=a.Qa,c,d;
	if(z&&a.type==gl) {
		c=this.lj;
		d=c!=13&&c!=27?b.keyCode:0
	}else if(Qh&&a.type==gl) {
		c=this.lj;
		d=b.charCode>=0&&b.charCode<63232&&Gm(c)?b.charCode:0
	}else if(Oh) {
		c=this.lj;
		d=Gm(c)?b.keyCode:0
	}else {
		c=b.keyCode||this.lj;
		d=b.charCode||0;
		if(Bh&&d==63&&!c)c=191
	}var f=c,g=b.keyIdentifier;
	if(c)if(c>=63232&&c in Eu)f=Eu[c];
	else {
		if(c==25&&a.shiftKey)f=9
	}else if(g&&g in Fu)f=Fu[g];
	a=f==this.nj;
	this.nj=f;
	if(Qh) {
		if(a&&b.timeStamp-this.ax<50)return ;
		this.ax=b.timeStamp
	}b=new Iu(f,
	d,a,b);
	try{
		this.dispatchEvent(b)
	}finally{
		b.n()
	}
};
m.mi=function (a) {
	this.lm&&this.detach();
	this.g=a;
	this.km=U(this.g,gl,this);
	this.sq=U(this.g,pm,this.yd,e,this);
	this.lm=U(this.g,Bq,this.bF,e,this)
};
m.detach=function () {
	if(this.km) {
		Cl(this.km);
		Cl(this.sq);
		Cl(this.lm);
		this.sq=this.km=h;
		this.lm=h
	}this.g=h;
	this.nj=-1
};
m.k=function () {
	cn.d.k.call(this);
	this.detach()
};
function Iu(a,b,c,d) {
	cl.call(this,d);
	this.type=bn;
	this.keyCode=a;
	this.charCode=b;
	this.repeat=c
}v(Iu,cl);
var Ju;
function Ku() {
}oe(Ku);
m=Ku.prototype;
m.Qe=function () {
	return undefined
};
m.o=function (a) {
	return a.j.o(C,{
		className:this.jh(a).join(o)
	},a.vb)
};
m.Y=function (a) {
	return a
};
m.Yk=function (a,b,c) {
	if(a=a.e?a.e():a)if(z&&!Sh(Nl)) {
		var d=this.$o(jf(a),b);
		d.push(b);
		t(c?w:x,a).apply(h,d)
	}else y(a,b,c)
};
m.Zt=function (a,b,c) {
	this.Yk(a,b,c)
};
m.Mb=function () {
	return i
};
m.ka=function (a,b) {
	b.id&&a.Vy(b.id);
	var c=this.Y(b);
	c&&c.firstChild?a.Xm(c.firstChild.nextSibling?af(c.childNodes):c.firstChild):a.Xm(h);
	var d=0,f=this.ga(),g=this.Yi(),k=e,l=e;
	c=e;
	var p=jf(b);
	Pe(p,function (A) {
		if(!k&&A==f) {
			k=i;
			if(g==f)l=i
		}else if(!l&&A==g)l=i;
		else d|=this.sp(A)
	},this);
	a.ez(d);
	if(!k) {
		p.push(f);
		if(g==f)l=i
	}l||p.push(g);
	(a=a.Uc)&&p.push.apply(p,a);
	if(z&&!Sh(Nl)) {
		var s=this.$o(p);
		if(s.length>0) {
			p.push.apply(p,s);
			c=i
		}
	}if(!k||!l||a||c)hf(b,p.join(o));
	return b
};
m.Dh=function (a) {
	a.Gh()&&this.ci(a.e(),i);
	a.Da()&&this.Kd(a,a.H())
};
m.My=function (a) {
	if(Ph) {
		var b=this.Qe();
		b&&tu(a,b)
	}
};
m.Vj=function (a,b) {
	Yt(a,!b,!z&&!Oh)
};
var Lu="-rtl";
m.ci=function (a,b) {
	this.Yk(a,this.Yi()+Lu,b)
};
m.ef=function (a) {
	if(a.Dc(32)&&(a=a.Ja()))return Gi(a);
	return e
};
m.Kd=function (a,b) {
	var c;
	if(a.Dc(32)&&(c=a.Ja())) {
		if(!b&&a.Ew()) {
			try{
				c.blur()
			}catch(d) {
			}a.Ew()&&a.dg(h)
		}Gi(c)!=b&&Ii(c,b)
	}
};
m.B=function (a,b) {
	Qt(a,b)
};
m.Wa=function (a,b,c) {
	var d=a.e();
	if(d) {
		var f=this.Mi(b);
		f&&this.Yk(a,f,c);
		this.lA(d,b,c)
	}
};
var Mu="disabled",Nu="pressed",Ou="selected",Pu="checked",Qu="expanded";
m.lA=function (a,b,c) {
	if(Ph) {
		Ju||(Ju=Ig(1,Mu,4,Nu,8,Ou,16,Pu,64,Qu));
		(b=Ju[b])&&vu(a,b,c)
	}
};
m.Vb=function (a,b) {
	var c=this.Y(a);
	if(c) {
		qi(c);
		if(b)if(Ce(b))Ai(c,b);
		else {
			function d(f) {
				if(f) {
					var g=Wh(c);
					c.appendChild(Ce(f)?g.createTextNode(f):f)
				}
			}ze(b)?Pe(b,d):d(b)
		}
	}
};
m.Ja=function (a) {
	return a.e()
};
var Ru="goog-control";
m.ga=function () {
	return Ru
};
m.Yi=function () {
	return this.ga()
};
m.jh=function (a) {
	var b=this.ga(),c=[b],d=this.Yi();
	d!=b&&c.push(d);
	(b=this.SD(a.db))&&c.push.apply(c,b);
	(a=a.Uc)&&c.push.apply(c,a);
	z&&!Sh(Nl)&&c.push.apply(c,this.$o(c));
	return c
};
var Su="_";
m.$o=function (a,b) {
	var c=[];
	if(b)a=a.concat([b]);
	Pe([],function (d) {
		if(Ue(d,t(Ve,a))&&(!b||Ve(d,b)))c.push(d.join(Su))
	});
	return c
};
m.SD=function (a) {
	if(a) {
		var b=[];
		for(var c=1;a;c<<=1)if(a&c) {
			b.push(this.Mi(c));
			a&=~c
		}return b
	}return h
};
m.Mi=function (a) {
	this.Jk||this.tt();
	return this.Jk[a]
};
m.sp=function (a) {
	this.Hz||this.wC();
	a=parseInt(this.Hz[a],10);
	return isNaN(a)?0:a
};
var Tu="-disabled",Uu="-hover",Vu="-active",Wu="-selected",Xu="-checked",Yu="-focused",Zu="-open";
m.tt=function () {
	var a=this.Yi();
	this.Jk=Ig(1,a+Tu,2,a+Uu,4,a+Vu,8,a+Wu,16,a+Xu,32,a+Yu,64,a+Zu)
};
m.wC=function () {
	this.Jk||this.tt();
	this.Hz=Eg(this.Jk)
};
function $u(a) {
	var b=Du(a);
	b&&b.ka(a);
	return b
}function av(a,b,c) {
	$t.call(this,c);
	this.v=b||yu(this.constructor );
	this.Xm(a)
}v(av,$t);
m=av.prototype;
m.vb=h;
m.db=0;
m.ek=39;
m.Ek=255;
m.wn=0;
m.ia=i;
m.Uc=h;
m.zp=i;
m.Ak=e;
m.td=function () {
	return this.w||(this.w=new Ll(this))
};
m.Cr=function (a) {
	this.U&&a!=this.zp&&this.au(a);
	this.zp=a
};
m.Ja=function () {
	return this.v.Ja(this)
};
m.sl=function () {
	return this.M||(this.M=new cn)
};
m.Bs=function (a) {
	if(a) {
		if(this.Uc)Ve(this.Uc,a)||this.Uc.push(a);
		else this.Uc=[a];
		this.v.Zt(this,a,i)
	}
};
m.pJ=function (a) {
	if(a&&this.Uc) {
		Ze(this.Uc,a);
		if(this.Uc.length==0)this.Uc=h;
		this.v.Zt(this,a,e)
	}
};
m.Yk=function (a,b) {
	b?this.Bs(a):this.pJ(a)
};
m.o=function () {
	var a=this.v.o(this);
	this.Jd(a);
	this.v.My(a);
	this.Ak||this.v.Vj(a,e);
	this.H()||this.v.B(a,e)
};
m.Y=function () {
	return this.v.Y(this.e())
};
m.Mb=function (a) {
	return this.v.Mb(a)
};
m.Wd=function (a) {
	a=this.v.ka(this,a);
	this.Jd(a);
	this.v.My(a);
	this.Ak||this.v.Vj(a,e);
	this.ia=a.style.display!=hb
};
m.ea=function () {
	av.d.ea.call(this);
	this.v.Dh(this);
	if(this.ek&-2) {
		this.zp&&this.au(i);
		if(this.Dc(32)) {
			var a=this.Ja();
			if(a) {
				var b=this.td(),c=this.sl();
				c.mi(a);
				b.l(c,bn,this.Qb);
				b.l(a,lu,this.El);
				b.l(a,mu,this.dg)
			}
		}
	}
};
m.au=function (a) {
	var b=this.td(),c=this.e();
	if(a) {
		b.l(c,el,this.Bp);
		b.l(c,om,this.fg);
		b.l(c,Aq,this.bj);
		b.l(c,fl,this.Ap);
		z&&b.l(c,zq,this.Dv)
	}else {
		b.wa(c,el,this.Bp);
		b.wa(c,om,this.fg);
		b.wa(c,Aq,this.bj);
		b.wa(c,fl,this.Ap);
		z&&b.wa(c,zq,this.Dv)
	}
};
m.Ra=function () {
	av.d.Ra.call(this);
	this.w&&this.w.vf();
	this.M&&this.M.detach();
	this.H()&&this.Da()&&this.v.Kd(this,e)
};
m.k=function () {
	av.d.k.call(this);
	if(this.w) {
		this.w.n();
		delete this.w
	}if(this.M) {
		this.M.n();
		delete this.M
	}delete this.v;
	this.Uc=this.vb=h
};
m.Vb=function (a) {
	this.v.Vb(this.e(),a);
	this.Xm(a)
};
m.Xm=function (a) {
	this.vb=a
};
m.ih=function () {
	var a=this.vb;
	if(!a||Ce(a))return a;
	return (a=ze(a)?Re(a,Ki).join(n):Ki(a))&&vf(a)
};
m.ci=function (a) {
	av.d.ci.call(this,a);
	var b=this.e();
	b&&this.v.ci(b,a)
};
m.Vj=function (a) {
	this.Ak=a;
	var b=this.e();
	b&&this.v.Vj(b,a)
};
m.H=function () {
	return this.ia
};
var bv="show",cv="hide";
m.B=function (a,b) {
	if(b||this.ia!=a&&this.dispatchEvent(a?bv:cv)) {
		(b=this.e())&&this.v.B(b,a);
		this.Da()&&this.v.Kd(this,a);
		this.ia=a;
		return i
	}return e
};
m.Da=function () {
	return !this.je(1)
};
m.LG=function () {
	var a=this.A;
	return !!a&&typeofa.Da==te&&!a.Da()
};
m.pb=function (a) {
	if(!this.LG()&&this.ng(1,!a)) {
		if(!a) {
			this.setActive(e);
			this.Ld(e)
		}this.H()&&this.v.Kd(this,a);
		this.Wa(1,!a)
	}
};
m.Ld=function (a) {
	this.ng(2,a)&&this.Wa(2,a)
};
m.Xl=function () {
	return this.je(4)
};
m.setActive=function (a) {
	this.ng(4,a)&&this.Wa(4,a)
};
m.TK=function (a) {
	this.ng(8,a)&&this.Wa(8,a)
};
m.zG=function () {
	return this.je(16)
};
m.nK=function (a) {
	this.ng(16,a)&&this.Wa(16,a)
};
m.Ew=function () {
	return this.je(32)
};
m.Sy=function (a) {
	this.ng(32,a)&&this.Wa(32,a)
};
m.Bc=function () {
	return this.je(64)
};
m.Oa=function (a) {
	this.ng(64,a)&&this.Wa(64,a)
};
m.je=function (a) {
	return !!(this.db&a)
};
m.Wa=function (a,b) {
	if(this.Dc(a)&&b!=this.je(a)) {
		this.v.Wa(this,a,b);
		this.db=b?this.db|a:this.db&~a
	}
};
m.ez=function (a) {
	this.db=a
};
m.Dc=function (a) {
	return !!(this.ek&a)
};
m.Af=function (a,b) {
	if(this.U&&this.je(a)!=b)j(Error(qu));
	!b&&this.je(a)&&this.Wa(a,e);
	this.ek=b?this.ek|a:this.ek&~a
};
m.ic=function (a) {
	return !!(this.Ek&a)&&this.Dc(a)
};
m.kK=function (a,b) {
	this.Ek=b?this.Ek|a:this.Ek&~a
};
m.Oy=function (a,b) {
	this.wn=b?this.wn|a:this.wn&~a
};
m.ng=function (a,b) {
	return this.Dc(a)&&this.je(a)!=b&&(!(this.wn&a)||this.dispatchEvent(ou(a,b)))&&!this.Fo
};
var dv="enter";
m.Bp=function (a) {
	a.relatedTarget&&!xi(this.e(),a.relatedTarget)&&this.dispatchEvent(dv)&&this.Da()&&this.ic(2)&&this.Ld(i)
};
var ev="leave";
m.Ap=function (a) {
	if(a.relatedTarget&&!xi(this.e(),a.relatedTarget)&&this.dispatchEvent(ev)) {
		this.ic(4)&&this.setActive(e);
		this.ic(2)&&this.Ld(e)
	}
};
m.fg=function (a) {
	if(this.Da()) {
		this.ic(2)&&this.Ld(i);
		if(a.Tp(0)) {
			this.ic(4)&&this.setActive(i);
			this.v.ef(this)&&this.Ja().focus()
		}
	}!this.Ak&&a.Tp(0)&&a.preventDefault()
};
m.bj=function (a) {
	if(this.Da()) {
		this.ic(2)&&this.Ld(i);
		this.Xl()&&this.xg(a)&&this.ic(4)&&this.setActive(e)
	}
};
m.Dv=function (a) {
	this.Da()&&this.xg(a)
};
var fv="action";
m.xg=function () {
	this.ic(16)&&this.nK(!this.zG());
	this.ic(8)&&this.TK(i);
	this.ic(64)&&this.Oa(!this.Bc());
	return this.dispatchEvent(fv)
};
m.El=function () {
	this.ic(32)&&this.Sy(i)
};
m.dg=function () {
	this.ic(4)&&this.setActive(e);
	this.ic(32)&&this.Sy(e)
};
m.Qb=function (a) {
	if(this.H()&&this.Da()&&this.xh(a)) {
		a.preventDefault();
		a.stopPropagation();
		return i
	}return e
};
m.xh=function (a) {
	return a.keyCode==13&&this.xg(a)
};
Au(av,Ku);
Bu(Ru,function () {
	return new av(h)
});
function gv() {
	return Ku.call(this)
}v(gv,Ku);
oe(gv);
gv.prototype.o=function (a) {
	return a.j.o(C,{
		"class":this.ga()
	})
};
var hv="HR";
gv.prototype.ka=function (a,b) {
	if(b.tagName==hv) {
		var c=b;
		b=this.o(a);
		ri(b,c);
		B(c)
	}else w(b,this.ga());
	return b
};
gv.prototype.Vb=function () {
};
var iv="goog-menuseparator";
gv.prototype.ga=function () {
	return iv
};
function jv(a,b) {
	av.call(this,h,a||gv.ud(),b);
	this.Af(1,e);
	this.Af(2,e);
	this.Af(4,e);
	this.Af(32,e);
	this.ez(1)
}v(jv,av);
var kv="separator";
jv.prototype.ea=function () {
	jv.d.ea.call(this);
	tu(this.e(),kv)
};
Bu(iv,function () {
	return new jv
});
function lv() {
}oe(lv);
function mv(a,b) {
	a=new a;
	a.ga=function () {
		return b
	};
	return a
}m=lv.prototype;
m.Qe=function () {
	return undefined
};
m.EF=function (a) {
	if(a) {
		var b=a.getAttributeNode(Fi);
		if(b&&b.specified) {
			a=a.tabIndex;
			return typeofa==qe&&a>=0
		}
	}return e
};
m.No=function (a,b) {
	if(a)a.tabIndex=b?0:-1
};
m.o=function (a) {
	return a.j.o(C,{
		"class":this.jh(a).join(o)
	})
};
m.Y=function (a) {
	return a
};
var nv="DIV";
m.Mb=function (a) {
	return a.tagName==nv
};
m.ka=function (a,b) {
	b.id&&a.Vy(b.id);
	var c=this.ga(),d=e,f=jf(b);
	f&&Pe(f,function (g) {
		if(g==c)d=i;
		else g&&this.YK(a,g,c)
	},this);
	d||w(b,c);
	this.yC(a,b);
	return b
};
var ov="-horizontal",pv="horizontal",qv="-vertical",rv="vertical";
m.YK=function (a,b,c) {
	if(b==c+Tu)a.pb(e);
	else if(b==c+ov)a.Fr(pv);
	else b==c+qv&&a.Fr(rv)
};
m.yC=function (a,b) {
	if(b) {
		var c=b.firstChild,d;
		while(c&&c.parentNode==b) {
			d=c.nextSibling;
			if(c.nodeType==1) {
				var f=this.ep(c);
				if(f) {
					f.Jd(c);
					a.Da()||f.pb(e);
					a.bc(f);
					f.ka(c)
				}
			}else if(!c.nodeValue||vf(c.nodeValue)==n)b.removeChild(c);
			c=d
		}
	}
};
m.ep=function (a) {
	return Du(a)
};
var sv="1.9a";
m.Dh=function (a) {
	var b=a.e();
	Yt(b,i,Ph);
	if(z)b.hideFocus=i;
	var c=this.Qe();
	c&&tu(b,c);
	if(a.Ua==pv&&Ph&&!Sh(sv)&&a.Gh()) {
		var d=this.Y(b);
		a.fh(function (f) {
			var g=f.e();
			g&&g.parentNode==d&&tv(f)
		})
	}
};
m.Ja=function (a) {
	return a.e()
};
var uv="goog-container";
m.ga=function () {
	return uv
};
m.jh=function (a) {
	var b=this.ga();
	b=[b,b+(a.Ua==pv?ov:qv)];
	a.Da()||b.push(this.ga()+Tu);
	return b
};
var vv="display:-moz-box;position:relative;top:4px",wv="display:-moz-box;position:relative";
function tv(a) {
	var b=a.e();
	if(b) {
		var c=b.nextSibling;
		b.parentNode.insertBefore(a.j.o(C,{
			style:ainstanceofjv?vv:wv
		},b),c)
	}
}function xv(a) {
	if(a=a.e()) {
		var b=a.parentNode;
		b.parentNode.insertBefore(a,b);
		B(b)
	}
}
function yv(a,b,c) {
	$t.call(this,c);
	this.v=b||lv.ud();
	this.Ua=a||rv
}v(yv,$t);
m=yv.prototype;
m.w=h;
m.dH=h;
m.M=h;
m.v=h;
m.Ua=h;
m.ia=i;
m.hb=i;
m.Xo=i;
m.zc=-1;
m.La=h;
m.Jq=e;
m.vB=e;
m.Ce=h;
m.td=function () {
	return this.w||(this.w=new Ll(this))
};
m.Ja=function () {
	return this.dH||this.v.Ja(this)
};
m.sl=function () {
	return this.M||(this.M=new cn(this.Ja()))
};
m.o=function () {
	this.Jd(this.v.o(this))
};
m.Y=function () {
	return this.v.Y(this.e())
};
m.Mb=function (a) {
	return this.v.Mb(a)
};
m.Wd=function (a) {
	this.Jd(this.v.ka(this,a));
	if(a.style.display==hb)this.ia=e
};
m.ea=function () {
	yv.d.ea.call(this);
	var a=this.e();
	this.v.Dh(this);
	this.B(this.ia,i);
	var b=this.td();
	b.l(this,dv,this.xp);
	b.l(this,du,this.yp);
	b.l(this,eu,this.Dp);
	b.l(this,nu,this.fF);
	b.l(this,so,this.VE);
	b.l(a,om,this.fg);
	b.l(Wh(a),Aq,this.YE);
	b.l(a,[om,Aq,el,fl],this.UE);
	this.ef()&&this.$t(i)
};
m.$t=function (a) {
	var b=this.td(),c=this.Ja();
	if(a) {
		b.l(c,lu,this.El);
		b.l(c,mu,this.dg);
		b.l(this.sl(),bn,this.Qb)
	}else {
		b.wa(c,lu,this.El);
		b.wa(c,mu,this.dg);
		b.wa(this.sl(),bn,this.Qb)
	}
};
m.Ra=function () {
	yv.d.Ra.call(this);
	this.te(-1);
	this.w&&this.w.vf();
	this.La&&this.La.Oa(e);
	this.Jq=e
};
m.k=function () {
	yv.d.k.call(this);
	if(this.w) {
		this.w.n();
		this.w=h
	}if(this.M) {
		this.M.n();
		this.M=h
	}this.La=this.Ce=h;
	this.v=h
};
m.xp=function () {
	return i
};
m.yp=function (a) {
	var b=this.Pl(a.target);
	if(b>-1&&b!=this.zc) {
		var c=this.Te();
		c&&c.Ld(e);
		this.zc=b;
		c=this.Te();
		this.Jq&&c.setActive(i);
		if(this.La&&c!=this.La)c.Dc(64)?c.Oa(i):this.La.Oa(e)
	}vu(this.e(),wu,a.target.e().id)
};
m.Dp=function (a) {
	if(a.target==this.Te())this.zc=-1;
	vu(this.e(),wu,h)
};
m.fF=function (a) {
	if((a=a.target)&&a!=this.La&&a.A==this) {
		this.La&&this.La.Oa(e);
		this.La=a
	}
};
m.VE=function (a) {
	if(a.target==this.La)this.La=h
};
m.fg=function (a) {
	this.hb&&this.ue(i);
	var b=this.Ja();
	this.v.EF(b)?b.focus():a.preventDefault()
};
m.YE=function () {
	this.ue(e)
};
m.UE=function (a) {
	var b=this.sE(a.target);
	if(b)switch(a.type) {
		case om:b.fg(a);
		break;
		case Aq:b.bj(a);
		break;
		case el:b.Bp(a);
		break;
		case fl:b.Ap(a);
		break
	}
};
m.sE=function (a) {
	if(this.Ce) {
		var b=this.e();
		while(a&&a.parentNode&&a!=b) {
			var c=a.id;
			if(c in this.Ce)return this.Ce[c];
			a=a.parentNode
		}
	}return h
};
m.El=function () {
};
m.dg=function () {
	this.te(-1);
	this.ue(e);
	this.La&&this.La.Oa(e)
};
m.Qb=function (a) {
	if(this.Da()&&this.Wf()!=0&&this.xh(a)) {
		a.preventDefault();
		a.stopPropagation();
		return i
	}return e
};
m.xh=function (a) {
	var b=this.Te();
	if(b&&typeofb.Qb==te&&b.Qb(a))return i;
	if(this.La&&this.La!=b&&typeofthis.La.Qb==te&&this.La.Qb(a))return i;
	switch(a.keyCode) {
		case 27:if(this.ef())this.Ja().blur();
		else return e;
		break;
		case 36:this.LF();
		break;
		case 35:this.MF();
		break;
		case 38:if(this.Ua==rv)this.Ip();
		else return e;
		break;
		case 37:if(this.Ua==pv)this.Gh()?this.Hp():this.Ip();
		else return e;
		break;
		case 40:if(this.Ua==rv)this.Hp();
		else return e;
		break;
		case 39:if(this.Ua==pv)this.Gh()?this.Ip():this.Hp();
		else return e;
		break;
		default:return e
	}return i
};
m.uk=function (a,b,c) {
	a.Oy(2,i);
	a.Oy(64,i);
	if(this.ef()||!this.vB)a.Af(32,e);
	a.Cr(e);
	yv.d.uk.call(this,a,b,c);
	var d=a.e();
	if(d) {
		if(!d.id)d.id=a.R();
		if(!this.Ce)this.Ce={
		};
		Cg(this.Ce,d.id,a)
	}c&&this.U&&this.Gh()&&this.Ua==pv&&Ph&&!Sh(sv)&&tv(a);
	b<=this.zc&&this.zc++
};
m.removeChild=function (a,b) {
	var c=this.Pl(a);
	if(c!=-1)if(c==this.zc)a.Ld(e);
	else c<this.zc&&this.zc--;
	b&&this.U&&this.Gh()&&this.Ua==pv&&Ph&&!Sh(sv)&&xv(a);
	(c=a.e())&&c.id&&Ag(this.Ce,c.id);
	a=yv.d.removeChild.call(this,a,b);
	a.Cr(i);
	return a
};
m.Fr=function (a) {
	if(this.e())j(Error(qu));
	this.Ua=a
};
m.H=function () {
	return this.ia
};
m.B=function (a,b) {
	if(b||this.ia!=a&&this.dispatchEvent(a?bv:cv)) {
		this.ia=a;
		if(b=this.e()) {
			Qt(b,a);
			this.ef()&&this.v.No(this.Ja(),this.hb&&this.ia)
		}return i
	}return e
};
m.Da=function () {
	return this.hb
};
m.pb=function (a) {
	if(this.hb!=a&&this.dispatchEvent(a?cu:bu)) {
		if(a) {
			this.hb=i;
			this.fh(function (b) {
				if(b.xA)delete b.xA;
				else b.pb(i)
			})
		}else {
			this.fh(function (b) {
				if(b.Da())b.pb(e);
				else b.xA=i
			});
			this.hb=e;
			this.ue(e)
		}this.ef()&&this.v.No(this.Ja(),a&&this.ia)
	}
};
m.ef=function () {
	return this.Xo
};
m.Kd=function (a) {
	a!=this.Xo&&this.U&&this.$t(a);
	this.Xo=a;
	this.hb&&this.ia&&this.v.No(this.Ja(),a)
};
m.te=function (a) {
	if(a=this.Vf(a))a.Ld(i);
	else this.zc>-1&&this.Te().Ld(e)
};
m.Ld=function (a) {
	this.te(this.Pl(a))
};
m.Te=function () {
	return this.Vf(this.zc)
};
m.LF=function () {
	this.Ll(function (a,b) {
		return (a+1)%b
	},this.Wf()-1)
};
m.MF=function () {
	this.Ll(function (a,b) {
		a--;
		return a<0?b-1:a
	},0)
};
m.Hp=function () {
	this.Ll(function (a,b) {
		return (a+1)%b
	},this.zc)
};
m.Ip=function () {
	this.Ll(function (a,b) {
		a--;
		return a<0?b-1:a
	},this.zc)
};
m.Ll=function (a,b) {
	b=b<0?this.Pl(this.La):b;
	var c=this.Wf();
	b=a(b,c);
	var d=0;
	while(d<=c) {
		var f=this.Vf(b);
		if(f&&this.$s(f)) {
			this.zK(b);
			return i
		}d++;
		b=a(b,c)
	}return e
};
m.$s=function (a) {
	return a.H()&&a.Da()&&a.Dc(2)
};
m.zK=function (a) {
	this.te(a)
};
m.ue=function (a) {
	this.Jq=a
};
function zv(a,b,c) {
	bl.call(this,a,b);
	this.item=c
}v(zv,bl);
var Av="-checkbox",Bv="-content",Cv="-highlight";
function Dv() {
	Ku.call(this);
	var a=this.Yi();
	this.Ug={
		ft:a+Av,content:a+Bv,aw:a+Cv
	}
}v(Dv,Ku);
oe(Dv);
m=Dv.prototype;
var Ev="menuitem";
m.Qe=function () {
	return Ev
};
m.o=function (a) {
	var b=a.j.o(C,{
		"class":this.jh(a).join(o)
	},this.ut(a.vb,a.j));
	this.Ry(a,b,a.Dc(8)||a.Dc(16));
	return b
};
m.Y=function (a) {
	return a&&a.firstChild
};
var Fv="goog-option";
m.ka=function (a,b) {
	this.pF(b)||b.appendChild(this.ut(b.childNodes,a.j));
	if(lf(b,Fv)) {
		a.Wh(i);
		this.Wh(a,b,i)
	}return Dv.d.ka.call(this,a,b)
};
m.Vb=function (a,b) {
	var c=this.Y(a),d=this.Ep(a)?c.firstChild:h;
	Dv.d.Vb.call(this,a,b);
	if(d&&!this.Ep(a))c.insertBefore(d,c.firstChild||h)
};
m.pF=function (a) {
	a=vi(a.firstChild,i);
	return !!a&&a.className.indexOf(this.Ug.content)!=-1
};
m.ut=function (a,b) {
	return b.o(C,{
		"class":this.Ug.content
	},a)
};
var Gv="menuitemcheckbox";
m.Wh=function (a,b,c) {
	if(b) {
		tu(b,c?Gv:this.Qe());
		this.Ry(a,b,c)
	}
};
m.Ep=function (a) {
	if(a=this.Y(a)) {
		a=a.firstChild;
		return !!a&&!!a.className&&a.className.indexOf(this.Ug.ft)!=-1
	}return e
};
m.Ry=function (a,b,c) {
	if(c!=this.Ep(b)) {
		y(b,Fv,c);
		b=this.Y(b);
		c?b.insertBefore(a.j.o(C,{
			"class":this.Ug.ft
		}),b.firstChild||h):b.removeChild(b.firstChild)
	}
};
var Hv="goog-option-selected";
m.Mi=function (a) {
	switch(a) {
		case 2:return this.Ug.aw;
		case 16:case 8:return Hv;
		default:return Dv.d.Mi.call(this,a)
	}
};
m.sp=function (a) {
	switch(a) {
		case Hv:return 16;
		case this.Ug.aw:return 2;
		default:return Dv.d.sp.call(this,a)
	}
};
var Iv="goog-menuitem";
m.ga=function () {
	return Iv
};
function Jv(a,b,c,d) {
	av.call(this,a,d||Dv.ud(),c);
	this.Xb(b)
}v(Jv,av);
Jv.prototype.Ca=function () {
	var a=this.zm;
	return a!=h?a:this.ih()
};
Jv.prototype.Xb=function (a) {
	this.KK(a)
};
Jv.prototype.Wh=function (a) {
	this.Af(16,a);
	var b=this.e();
	b&&this.v.Wh(this,b,a)
};
Bu(Iv,function () {
	return new Jv(h)
});
function Kv() {
	lv.call(this)
}v(Kv,lv);
oe(Kv);
m=Kv.prototype;
var Lv="menu";
m.Qe=function () {
	return Lv
};
var Mv="UL";
m.Mb=function (a) {
	return a.tagName==Mv||Kv.d.Mb.call(this,a)
};
m.ep=function (a) {
	return a.tagName==hv?new jv:Kv.d.ep.call(this,a)
};
m.Kf=function (a,b) {
	return xi(a.e(),b)
};
var Nv="goog-menu";
m.ga=function () {
	return Nv
};
var Ov="haspopup";
m.Dh=function (a) {
	Kv.d.Dh.call(this,a);
	a=a.e();
	tu(a,Lv);
	vu(a,Ov,q)
};
function Pv(a) {
	jv.call(this,gv.ud(),a)
}v(Pv,jv);
Bu(iv,function () {
	return new jv
});
function Qv(a,b) {
	yv.call(this,rv,b||Kv.ud(),a);
	this.Kd(e)
}v(Qv,yv);
m=Qv.prototype;
m.Yn=i;
m.Ks=e;
m.ga=function () {
	return this.v.ga()
};
m.Kf=function (a) {
	return this.v.Kf(this,a)||this.Ov()&&Te(this.T,function (b) {
		return typeofb.Kf==te&&b.Kf(a)
	})
};
m.ba=function (a) {
	this.bc(a,i)
};
m.Rg=function (a,b) {
	this.uk(a,b,i)
};
m.Kj=function (a) {
	(a=this.removeChild(a,i))&&a.n()
};
m.Yf=function (a) {
	return this.Vf(a)
};
m.Ue=function () {
	return this.Wf()
};
m.Ri=function () {
	return this.T||[]
};
m.Hr=function (a,b) {
	var c=this.H();
	c||Qt(this.e(),i);
	Ht(this.e(),a,b);
	c||Qt(this.e(),e)
};
m.Ly=function (a) {
	(this.Yn=a)&&this.Kd(i)
};
m.hK=function (a) {
	this.Ks=a
};
m.B=function (a,b) {
	(b=Qv.d.B.call(this,a,b))&&a&&this.U&&this.Yn&&this.Ja().focus();
	return b
};
m.xp=function (a) {
	this.Yn&&this.Ja().focus();
	return Qv.d.xp.call(this,a)
};
m.$s=function (a) {
	return (this.Ks||a.Da())&&a.H()&&a.Dc(2)
};
function Rv() {
	Ku.call(this)
}v(Rv,Ku);
oe(Rv);
m=Rv.prototype;
var Sv="button";
m.Qe=function () {
	return Sv
};
m.o=function (a) {
	var b=Rv.d.o.call(this,a),c=a.Zi();
	c&&this.Lr(b,c);
	(a=a.Ca())&&this.Xb(b,a);
	return b
};
m.ka=function (a,b) {
	b=Rv.d.ka.call(this,a,b);
	a.hL(this.Ca(b));
	a.bL(this.Zi(b));
	return b
};
m.Ca=ne;
m.Xb=ne;
m.Zi=function (a) {
	return a.title
};
m.Lr=function (a,b) {
	if(a)a.title=b||n
};
var Tv="goog-button";
m.ga=function () {
	return Tv
};
function Uv() {
	Rv.call(this)
}v(Uv,Rv);
oe(Uv);
m=Uv.prototype;
m.Qe=function () {
	return undefined
};
m.o=function (a) {
	this.iz(a);
	return a.j.o(Sv,{
		"class":this.jh(a).join(o),disabled:!a.Da(),title:a.Zi()||n,value:a.Ca()||n
	},a.ih()||n)
};
var Vv="BUTTON",Wv="INPUT",Xv="submit",Yv="reset";
m.Mb=function (a) {
	return a.tagName==Vv||a.tagName==Wv&&(a.type==Sv||a.type==Xv||a.type==Yv)
};
m.ka=function (a,b) {
	this.iz(a);
	b.disabled&&w(b,this.Mi(1));
	return Uv.d.ka.call(this,a,b)
};
m.Dh=function (a) {
	a.td().l(a.e(),T,a.xg)
};
m.Vj=ne;
m.ci=ne;
m.ef=function (a) {
	return a.Da()
};
m.Kd=ne;
m.Wa=function (a,b,c) {
	Uv.d.Wa.call(this,a,b,c);
	if((a=a.e())&&b==1)a.disabled=c
};
m.Ca=function (a) {
	return a.value
};
m.Xb=function (a,b) {
	if(a)a.value=b
};
m.lA=ne;
m.iz=function (a) {
	a.Cr(e);
	a.kK(255,e);
	a.Af(32,e)
};
function Zv(a,b,c) {
	av.call(this,a,b||Uv.ud(),c)
}v(Zv,av);
m=Zv.prototype;
m.Ca=function () {
	return this.Ng
};
m.Xb=function (a) {
	this.Ng=a;
	this.v.Xb(this.e(),a)
};
m.hL=function (a) {
	this.Ng=a
};
m.Zi=function () {
	return this.js
};
m.Lr=function (a) {
	this.js=a;
	this.v.Lr(this.e(),a)
};
m.bL=function (a) {
	this.js=a
};
m.k=function () {
	Zv.d.k.call(this);
	delete this.Ng;
	delete this.js
};
m.ea=function () {
	Zv.d.ea.call(this);
	if(this.Dc(32)) {
		var a=this.Ja();
		a&&this.td().l(a,Bq,this.xh)
	}
};
m.xh=function (a) {
	return (a.keyCode==13&&a.type==bn||a.keyCode==32&&a.type==Bq)&&this.xg(a)
};
Bu(Tv,function () {
	return new Zv(h)
});
function $v() {
	Rv.call(this)
}v($v,Rv);
oe($v);
m=$v.prototype;
var aw="goog-inline-block ";
m.o=function (a) {
	var b={
		"class":aw+this.jh(a).join(o),title:a.Zi()||n
	};
	return a.j.o(C,b,this.Pk(a.vb,a.j))
};
m.Y=function (a) {
	return a&&a.firstChild.firstChild
};
var bw="-outer-box",cw="-inner-box";
m.Pk=function (a,b) {
	var c=aw+this.ga();
	return b.o(C,{
		"class":c+bw
	},b.o(C,{
		"class":c+cw
	},a))
};
m.Mb=function (a) {
	return a.tagName==nv
};
m.nF=function (a,b) {
	if((b=a.j.Su(b))&&b.className.indexOf(this.ga()+bw)!=-1) {
		if((a=a.j.Su(b))&&a.className.indexOf(this.ga()+cw)!=-1)return i
	}return e
};
var dw="goog-inline-block";
m.ka=function (a,b) {
	ew(b,i);
	ew(b,e);
	this.nF(a,b)||b.appendChild(this.Pk(b.childNodes,a.j));
	w(b,dw,this.ga());
	return $v.d.ka.call(this,a,b)
};
var fw="goog-custom-button";
m.ga=function () {
	return fw
};
function ew(a,b) {
	if(a) {
		var c=b?a.firstChild:a.lastChild,d;
		while(c&&c.parentNode==a) {
			d=b?c.nextSibling:c.previousSibling;
			if(c.nodeType==3) {
				var f=c.nodeValue;
				if(vf(f)==n)a.removeChild(c);
				else {
					c.nodeValue=b?f.replace(/^[\s\xa0]+/,n):f.replace(/[\s\xa0]+$/,n);
					break
				}
			}else break;
			c=d
		}
	}
}function gw() {
	$v.call(this)
}v(gw,$v);
oe(gw);
if(Ph)gw.prototype.Vb=function (a,b) {
	var c=gw.d.Y.call(this,a&&a.firstChild);
	c&&ti(this.createCaption(b,Vh(a)),c)
};
m=gw.prototype;
m.Y=function (a) {
	a=gw.d.Y.call(this,a&&a.firstChild);
	if(Ph&&a&&a.__goog_wrapper_div)a=a.firstChild;
	return a
};
m.ka=function (a,b) {
	var c=Zh(Ni,Nv,b)[0];
	if(c) {
		Qt(c,e);
		pi(Wh(c).body,c);
		var d=new Qv;
		d.ka(c);
		a.an(d)
	}return gw.d.ka.call(this,a,b)
};
m.Pk=function (a,b) {
	return gw.d.Pk.call(this,[this.createCaption(a,b),this.rC(b)],b)
};
var hw="-caption";
m.createCaption=function (a,b) {
	var c={
		"class":aw+this.ga()+hw
	};
	if(St&&Rt(a)) {
		c.__goog_wrapper_div=i;
		return b.o(C,c,mi(C,h,a))
	}else return b.o(C,c,a)
};
var iw="-dropdown",jw="\u00a0";
m.rC=function (a) {
	return a.o(C,{
		"class":aw+this.ga()+iw
	},jw)
};
var kw="goog-menu-button";
m.ga=function () {
	return kw
};
function lw(a,b) {
	this.w=new Ll(this);
	this.Ar(a||h);
	b&&this.eL(b)
}v(lw,W);
m=lw.prototype;
m.g=h;
m.IB=i;
m.Ts=h;
m.sa=e;
m.nL=e;
m.$w=-1;
m.Ww=-1;
m.JF=e;
var mw="toggle_display";
m.P=mw;
m.eL=function (a) {
	this.P=a
};
m.e=function () {
	return this.g
};
m.Ar=function (a) {
	this.ZC();
	this.g=a
};
m.ZC=function () {
	if(this.sa)j(Error("Can not change this state of the popup while showing."))
};
m.H=function () {
	return this.sa
};
m.B=function (a) {
	if(a) {
		if(!this.g)j(Error("Caller must call setElement before trying to show thepopup"));
		this.DL()
	}else this.Kl()
};
m.Gb=function () {
};
var nw="IFRAME",ow="move_offscreen";
m.DL=function () {
	if(this.sa)return ;
	if(!this.Rq())return ;
	this.Gb();
	var a=Wh(this.g);
	this.JF&&this.w.l(a,pm,this.lI,i);
	if(this.IB) {
		this.w.l(a,om,this.Gx,i);
		if(z) {
			var b=a.activeElement;
			while(b&&b.nodeName==nw) {
				try{
					var c=yi(b)
				}catch(d) {
					break
				}a=c;
				b=a.activeElement
			}this.w.l(a,om,this.Gx,i);
			this.w.l(a,gu,this.Fx)
		}else this.w.l(a,mu,this.Fx)
	}if(this.P==mw)this.xL();
	else this.P==ow&&this.Gb();
	this.sa=i;
	this.Vq()
};
m.Kl=function (a) {
	if(!this.sa||!this.fI(a))return e;
	this.w&&this.w.vf();
	if(this.P==mw)this.nL?Wl(this.Xv,0,this):this.Xv();
	else this.P==ow&&this.UH();
	this.sa=e;
	this.Sq(a);
	return i
};
var pw="visible";
m.xL=function () {
	this.g.style.visibility=pw;
	Qt(this.g,i)
};
m.Xv=function () {
	this.g.style.visibility=Q;
	Qt(this.g,e)
};
var qw="-200px";
m.UH=function () {
	this.g.style.left=qw;
	this.g.style.top=qw
};
var rw="beforeshow";
m.Rq=function () {
	return this.dispatchEvent(rw)
};
m.Vq=function () {
	this.$w=Ie();
	this.Ww=-1;
	this.dispatchEvent(bv)
};
var sw="beforehide";
m.fI=function (a) {
	return this.dispatchEvent({
		type:sw,target:a
	})
};
m.Sq=function (a) {
	this.Ww=Ie();
	this.dispatchEvent({
		type:cv,target:a
	})
};
m.Gx=function (a) {
	a=a.target;
	if(!xi(this.g,a)&&(!this.Ts||xi(this.Ts,a))&&!this.pz())this.Kl(a)
};
m.lI=function (a) {
	if(a.keyCode==27)if(this.Kl(a.target)) {
		a.preventDefault();
		a.stopPropagation()
	}
};
m.Fx=function (a) {
	var b=Wh(this.g);
	if(z||Oh) {
		if((a=b.activeElement)&&xi(this.g,a))return
	}else if(a.target!=b)return ;
	if(this.pz())return ;
	this.Kl()
};
m.pz=function () {
	return Ie()-this.$w<150
};
m.k=function () {
	lw.d.k.call(this);
	this.w.n();
	delete this.g;
	delete this.w
};
function tw(a,b) {
	this.NI=5;
	this.lc=b||undefined;
	lw.call(this,a)
}v(tw,lw);
tw.prototype.Hr=function (a) {
	this.lc=a||undefined;
	this.sa&&this.Gb()
};
tw.prototype.Gb=function () {
	if(!this.lc)return ;
	var a=!this.sa&&this.P!=ow,b=this.g;
	if(a) {
		this.g.style.visibility=Q;
		Qt(b,i)
	}this.lc.Gb(b,this.NI,this.uN);
	a&&Qt(b,e)
};
function uw(a,b,c,d,f,g,k) {
	var l=Ft(c),p=Ft(a);
	l=new nh(p.x-l.x+c.offsetLeft,p.y-l.y+c.offsetTop);
	var p=1,s=1,A=Jt(a);
	switch(vw(a,b)) {
		case 1:break;
		case 2:l.x+=A.width;
		p=-1;
		break;
		case 3:l.y+=A.height;
		s=-1;
		break;
		case 4:l.x+=A.width;
		l.y+=A.height;
		s=p=-1;
		break
	}if(f) {
		l.x+=p*f.x;
		l.y+=s*f.y
	}return ww(l,c,d,g,k)
}
function ww(a,b,c,d,f) {
	var g=a.x;
	a=a.y;
	c=vw(b,c);
	if(d||c!=1) {
		var k=Jt(b);
		switch(c) {
			case 1:g+=d.left;
			a+=d.top;
			break;
			case 2:g-=k.width;
			if(d) {
				g-=d.right;
				a+=d.top
			}break;
			case 3:a-=k.height;
			if(d) {
				g+=d.left;
				a-=d.bottom
			}break;
			case 4:g-=k.width;
			a-=k.height;
			if(d) {
				g-=d.right;
				a-=d.bottom
			}break
		}
	}c=i;
	f=f||0;
	if(f!=0) {
		var l=Vh(b);
		k=Jt(b);
		var p=ki(l.Bv());
		l=l.Xf();
		var s=new qh(0,0);
		xw(s,g,a,p,l);
		var A=f&48,I=A&&yw(k,f,p,d),L=e;
		if(k.width>s.width)if(f&1) {
			g-=k.width-s.width;
			L=i
		}else if(f&2)c=e;
		if(k.height>s.height)if(f&
		4) {
			a-=k.height-s.height;
			L=i
		}else if(f&8)c=e;
		if(g-l.x<0)if(f&1) {
			g=l.x;
			L=i
		}else if(f&2)c=e;
		if(a-l.y<0)if(f&4) {
			a=l.y;
			L=i
		}else if(f&8)c=e;
		if(c&&A) {
			L&&xw(s,g,a,p,l);
			(I=yw(k,f,s,d)||I)&&It(b,k)
		}
	}c&&zt(b,g,a);
	return c
}function xw(a,b,c,d,f) {
	a.width=d.width-(b-f.x);
	a.height=d.height-(c-f.y)
}function yw(a,b,c,d) {
	var f=e;
	if(b&16) {
		var g=d?d.right+d.left:0;
		if(a.width+g>c.width) {
			a.width=c.width-g;
			f=i
		}
	}if(b&32) {
		b=d?d.top+d.bottom:0;
		if(a.height+b>c.height) {
			a.height=c.height-b;
			f=i
		}
	}return f
}
function vw(a,b) {
	a=Vt(a);
	switch(b) {
		case 1:case 2:case 3:case 4:return b;
		case 5:return a?2:1;
		case 6:return a?1:2;
		case 7:return a?4:3;
		case 8:return a?3:4
	}
}function zw() {
}zw.prototype.Gb=function () {
};
function Aw(a,b) {
	this.X=a;
	this.Wg=b
}v(Aw,zw);
Aw.prototype.Gb=function (a,b,c) {
	uw(this.X,this.Wg,a,b,h,c)
};
function Bw(a,b,c) {
	Aw.call(this,a,b);
	this.tB=c||e
}v(Bw,Aw);
Bw.prototype.Gb=function (a,b,c) {
	var d=uw(this.X,this.Wg,a,b,h,c,10);
	if(!d) {
		(d=uw(this.X,b,a,this.Wg,h,c,10))||(this.tB?uw(this.X,this.Wg,a,b,h,c,5):uw(this.X,this.Wg,a,b,h,c,0))
	}
};
function Cw(a,b) {
	this.Ok=ainstanceofnh?a:new nh(a,b)
}v(Cw,zw);
Cw.prototype.Gb=function (a,b,c) {
	ww(this.Ok,a,b,c)
};
function Dw(a,b) {
	Cw.call(this,a,b)
}v(Dw,Cw);
Dw.prototype.Gb=function (a,b,c) {
	var d=At(a);
	uw(d,1,a,b,this.Ok,c)
};
function Ew(a,b,c,d) {
	Zv.call(this,a,c||gw.ud(),d);
	this.Af(64,i);
	b&&this.an(b);
	this.W=new Tl(500)
}v(Ew,Zv);
m=Ew.prototype;
m.Xn=i;
m.$p=e;
m.ea=function () {
	Ew.d.ea.call(this);
	this.i&&this.Dk(this.i,i);
	vu(this.e(),Ov,q)
};
m.Ra=function () {
	Ew.d.Ra.call(this);
	if(this.i) {
		this.Oa(e);
		this.i.Ra();
		this.Dk(this.i,e);
		var a=this.i.e();
		a&&B(a)
	}
};
m.k=function () {
	Ew.d.k.call(this);
	if(this.i) {
		this.i.n();
		delete this.i
	}this.W.n()
};
m.fg=function (a) {
	Ew.d.fg.call(this,a);
	if(this.Xl()) {
		this.Oa(!this.Bc());
		this.i&&this.i.ue(this.Bc())
	}
};
m.bj=function (a) {
	Ew.d.bj.call(this,a);
	this.i&&!this.Xl()&&this.i.ue(e)
};
m.xg=function () {
	this.setActive(e);
	return i
};
m.XE=function (a) {
	this.i&&this.i.H()&&!this.Kf(a.target)&&this.Oa(e)
};
m.Kf=function (a) {
	return a&&xi(this.e(),a)||this.i&&this.i.Kf(a)
};
m.xh=function (a) {
	if(a.type!=(a.keyCode==32?Bq:bn))return e;
	if(this.i&&this.i.H()) {
		var b=this.i.Qb(a);
		if(a.keyCode==27) {
			this.Oa(e);
			return i
		}return b
	}if(a.keyCode==40||a.keyCode==38||a.keyCode==32) {
		this.Oa(i);
		return i
	}return e
};
m.dF=function () {
	this.Oa(e)
};
m.eF=function () {
	this.Xl()||this.Oa(e)
};
m.dg=function (a) {
	this.$p||this.Oa(e);
	Ew.d.dg.call(this,a)
};
m.ul=function () {
	this.i||this.an(new Qv(this.j));
	return this.i||h
};
m.an=function (a) {
	var b=this.i;
	if(a!=b) {
		if(b) {
			this.Oa(e);
			this.U&&this.Dk(b,e);
			delete this.i
		}if(a) {
			this.i=a;
			a.Gr(this);
			a.B(e);
			a.Ly(this.$p);
			this.U&&this.Dk(a,i)
		}
	}return b
};
m.ba=function (a) {
	this.ul().ba(a)
};
m.Rg=function (a,b) {
	this.ul().Rg(a,b)
};
m.Kj=function (a) {
	this.ul().Kj(a)
};
m.Yf=function (a) {
	return this.i?this.i.Vf(a):h
};
m.Ue=function () {
	return this.i?this.i.Wf():0
};
m.B=function (a,b) {
	(a=Ew.d.B.call(this,a,b))&&!this.H()&&this.Oa(e);
	return a
};
m.pb=function (a) {
	Ew.d.pb.call(this,a);
	this.Da()||this.Oa(e)
};
m.gK=function (a) {
	this.Xn=a
};
m.Oa=function (a) {
	Ew.d.Oa.call(this,a);
	if(this.i) {
		if(a) {
			this.i.U||this.i.nc();
			this.Yx();
			this.i.te(-1)
		}else {
			this.setActive(e);
			this.i.ue(e)
		}this.i.B(a);
		this.GB(a)
	}
};
m.Yx=function () {
	var a=this.Xn?7:8;
	a=new Bw(this.e(),a,i);
	var b=this.i.e();
	if(!this.i.H()) {
		b.style.visibility=Q;
		Qt(b,i)
	}a.Gb(b,this.Xn?5:6,new jt(0,0,0,0));
	if(!this.i.H()) {
		Qt(b,e);
		b.style.visibility=pw
	}
};
m.Rh=function () {
	this.Yx()
};
m.Dk=function (a,b) {
	var c=this.td();
	b=b?c.l:c.wa;
	b.call(c,a,fv,this.dF);
	b.call(c,a,du,this.yp);
	b.call(c,a,eu,this.Dp)
};
m.yp=function (a) {
	vu(this.e(),wu,a.target.e().id)
};
m.Dp=function () {
	this.i.Te()||vu(this.e(),wu,h)
};
m.GB=function (a) {
	var b=this.td(),c=a?b.l:b.wa;
	c.call(b,this.j.z,om,this.XE,i);
	this.$p&&c.call(b,this.i,mu,this.eF);
	c.call(b,this.W,Vl,this.Rh);
	a?this.W.start():this.W.stop()
};
Bu(kw,function () {
	return new Ew(h)
});
function Fw(a,b,c) {
	this.id=a;
	this.nC=b;
	this.AC=c
}
var Gw=new Fw("ism",function (a) {
	return a==q
},function () {
	return e
}),Hw=new Fw("suc",function (a) {
	return a==q
},function () {
	return i
}),Iw=new Fw("sas",function (a) {
	return a==q
},Cs),Jw=new Fw("ssa",function (a) {
	return a==q
},it),Kw=new Fw("saf",function (a) {
	return a==q
},function () {
	return i
});
function Lw() {
	this.yg=Yp(js(pc))
}Lw.prototype.N=function (a,b) {
	if(a.id in this.yg&&b.id in this.yg[a.id])return b.nC(this.yg[a.id][b.id]);
	return b.AC()
};
Lw.prototype.set=function (a,b,c) {
	if(this.N(a,b)==c)return ;
	a.id in this.yg||(this.yg[a.id]={
	});
	this.yg[a.id][b.id]=c.toString ();
	os(pc,$p(this.yg))
};
var Mw=u("Show all"),Nw=u("Show updated"),Ow,Pw,Qw="nav";
function Rw() {
	Pw=new Lw;
	Ow=new Sw;
	Ow.nc(Yh(Qw));
	Ow.Ya()
}function Sw() {
	this.pB=new Tw;
	this.$J=new Uw;
	this.Li=new Vw;
	this.Zr=new Ww;
	this.ur=[this.pB,this.$J,this.Li,this.Zr]
}m=Sw.prototype;
m.nc=function (a) {
	var b=new D;
	for(var c=0,d;d=this.ur[c];c++)d.Ax?d.Sz({
		Cg:d
	},b):Xw({
		Cg:d
	},b);
	a.innerHTML=b.toString ()
};
var Yw="chrome-lhn-toggle",Zw="chrome-lhn-menu";
m.Ya=function () {
	for(var a=0,b;b=this.ur[a];a++) {
		b.Ya();
		b.On()
	}Ns(r(this.Dr,this));
	U(J(Yw),T,this.Cn,e,this);
	U(J(Zw),T,this.Yz,e,this)
};
var $w="lhn-hidden";
m.Bd=function () {
	return lf(document.body,$w)
};
m.Dr=function (a) {
	y(document.body,$w,a);
	y(J(Zw),Q,!a);
	if(a)Op(Rc);
	else {
		this.ca();
		this.em()&&this.Er(e)
	}
};
m.Cn=function () {
	this.Dr(!this.Bd())
};
var ax="lhn-menu";
m.em=function () {
	return lf(document.body,ax)
};
var bx="quick-add-bubble-holder";
m.Er=function (a) {
	y(document.body,ax,a);
	cx(J(Zw),a);
	if(a) {
		this.ca();
		Op(Sc);
		if(!this.sB) {
			var b=this;
			a=r(this.Er,this,e);
			Ym(function () {
				return b.em()?[J(Qw),J(Zw),J(bx)]:h
			},a);
			X.aB(a);
			this.sB=i
		}
	}
};
m.Yz=function () {
	if(!this.Bd())return ;
	this.Er(!this.em())
};
m.ca=function (a) {
	a=a||ki(window).height;
	if(this.em())a-=10;
	for(var b=0,c;c=this.ur[b];b++)c.ca(a)
};function dx(a,b) {
	this.id=a;
	this.Sz=b;
	this.Bd=this.Ab(Gw);
	this.Kw=this.Ab(Hw)
}m=dx.prototype;
m.Ab=function (a) {
	return Pw.N(this,a)
};
m.cd=function (a,b) {
	Pw.set(this,a,b)
};
var ex="lhn-",fx="-minimize",gx="-menubutton",hx="goog-menu lhn-menu",ix="Show unread counts",jx="Hide unread counts";
m.Ya=function () {
	if(this.Ax)return ;
	this.Fd=J(ex+this.id);
	U(J(ex+this.id+fx),T,this.fM,e,this);
	this.Dd=$u(J(ex+this.id+gx));
	var a=mv(Kv,hx);
	this.Dd.an(new Qv(undefined,a));
	this.Dd.gK(e);
	a=u(ix);
	var b=u(jx);
	this.vk(a,b,this.Ab(Hw),this.gM)
};
var kx="lhn-section-no-unread-counts";
m.gM=function (a) {
	this.Kw=a;
	this.cd(Hw,a);
	y(this.Fd,kx,!a)
};
m.On=function () {
};
m.vk=function (a,b,c,d) {
	var f=new Jv(a);
	f.Wh(i);
	f.Wa(16,c);
	this.Dd.ba(f);
	var g=new Jv(b);
	g.Wh(i);
	g.Wa(16,!c);
	this.Dd.ba(g);
	d=r(d,this);
	U(this.Dd,fv,function (k) {
		if(k.target==f) {
			f.Wa(16,i);
			g.Wa(16,e);
			d(i)
		}else if(k.target==g) {
			f.Wa(16,e);
			g.Wa(16,i);
			d(e)
		}
	})
};
m.Es=function (a,b,c) {
	var d=new Jv(a);
	c?this.Dd.Rg(d,0):this.Dd.ba(d);
	b=r(b,this);
	U(this.Dd,fv,function (f) {
		f.target==d&&b()
	})
};
m.wk=function (a) {
	var b=new Pv;
	a?this.Dd.Rg(b,0):this.Dd.ba(b)
};
var lx="lhn-section-minimized";
m.fM=function () {
	this.Bd=!this.Bd;
	y(this.Fd,lx,this.Bd);
	Ow.ca();
	this.cd(Gw,this.Bd)
};
var mx="lhn-section-footer";
m.Uu=function () {
	if(!this.wu)this.wu=M(this.Fd,mx,C);
	return this.wu
};
m.ca=function () {
};
var nx="selectors";
function Uw() {
	dx.call(this,nx,ox)
}v(Uw,dx);
var px="reading-list-selector",qx="star-selector";
Uw.prototype.Ya=function () {
	Uw.d.Ya.call(this);
	var a=Tk();
	rx=new sx(px,a,i);
	tx=new sx(qx,Ek(R.xd()),i);
	Y.uh(a,ux);
	Y.Vn(function (b,c,d) {
		b.G(a)&&ux(c,d)
	});
	vx=new wx;
	xx=new yx;
	zx=new Ax;
	Bx=new Cx;
	Dx();
	Ex()
};
var Fx="friends";
function Vw() {
	dx.call(this,Fx,Gx)
}v(Vw,dx);
var Hx="lhn-section-primary",Ix="lhn-section-secondary";
Vw.prototype.Ya=function () {
	Vw.d.Ya.call(this);
	Jx=new Kx;
	Lx();
	Mx.on(this.Ab(Kw));
	Zs(Nx);
	Mx.rK(function () {
		var a=Ek(R.fe());
		a=Mx.$u(a)[0];
		w(a.zb(),Hx);
		Mx.yc()&&w(Mx.yc(),Ix)
	})
};
Vw.prototype.On=function () {
	this.wk();
	this.vk(Mw,Nw,this.Ab(Kw),this.hs)
};
Vw.prototype.hs=function (a) {
	this.cd(Kw,a);
	Mx.on(a);
	Ow.ca()
};
Vw.prototype.ca=function () {
	Mx.ca()
};
var Ox="add";
function Tw() {
	this.Ax=i;
	dx.call(this,Ox,Px)
}v(Tw,dx);
var Qx="lhn-add-subscription";
Tw.prototype.Ya=function () {
	Tw.d.Ya.call(this);
	U(J(Qx),T,t(Rx,function (a) {
		Sx();
		a.stopPropagation()
	}))
};
var Tx="subscriptions";
function Ww() {
	dx.call(this,Tx,Ux)
}v(Ww,dx);
m=Ww.prototype;
var Vx="sub-tree-header",Wx="sub-tree-subscriptions",Xx="edit-subscriptions";
m.Ya=function () {
	Ww.d.Ya.call(this);
	Yx=new Zx;
	Yx.jz(!this.Ab(Jw));
	Yx.on(this.Ab(Iw));
	U(J(Vx),T,this.ly,e,this);
	Dp.sn(J(Wx),Xx,t(Op,Hc));
	Yx.load()
};
var $x="en",ay="Add a subscription...",by="Refresh",cy="Sort alphabetically",dy="Sort by drag and drop";
m.On=function () {
	this.wk(i);
	_DISPLAY_LOCALE.indexOf($x)==0&&this.Es(u(ay),function () {
		window.setTimeout(ey,1)
	},i);
	this.Es(u(by),this.ly,i);
	this.wk();
	var a=u(cy),b=u(dy);
	this.vk(a,b,this.Ab(Jw),this.ZL);
	this.wk();
	this.vk(Mw,Nw,this.Ab(Iw),this.hs)
};
m.ZL=function (a) {
	this.cd(Jw,a);
	Yx.jz(!a);
	Yx.display()
};
m.hs=function (a) {
	this.cd(Iw,a);
	Yx.on(a)
};
var fy="sub-tree-refreshing";
m.ly=function () {
	w(this.Fd,fy);
	Yx.u();
	Y.aa(t(x,this.Fd,fy))
};
var gy="sub-tree";
m.ca=function (a) {
	var b=J(gy);
	if(!b.offsetHeight)return ;
	var c=Gt(b),d=Kt(this.Uu()),f=Kt(this.Fd);
	c+=f.height-(d.top-f.top);
	b.style.height=Math.max(a-c,20)+yt
};
var hy="position:absolute;display:none;";
function iy(a,b,c) {
	this.j=c||(a?Vh(Xh(a)):Vh());
	tw.call(this,this.j.o(C,{
		style:hy
	}));
	this.Rk=new nh(1,1);
	this.Jb=h;
	this.$g=new tq;
	a&&this.mi(a);
	b!=h&&this.$K(b)
}v(iy,tw);
var jy=[];
m=iy.prototype;
m.className="goog-tooltip";
m.tL=500;
m.HF=0;
m.oc=0;
m.mi=function (a) {
	a=Xh(a);
	this.$g.add(a);
	U(a,el,this.aj,e,this);
	U(a,fl,this.Gl,e,this);
	U(a,qm,this.Kv,e,this);
	U(a,lu,this.Fl,e,this);
	U(a,mu,this.Gl,e,this)
};
m.detach=function (a) {
	if(a) {
		a=Xh(a);
		this.Gt(a);
		this.$g.remove(a)
	}else {
		var b=this.$g.hc();
		for(var c=0;a=b[c];c++)this.Gt(a);this.$g.clear()
	}
};m.Gt=function (a) {
	V(a,el,this.aj,e,this);
	V(a,fl,this.Gl,e,this);
	V(a,qm,this.Kv,e,this);
	V(a,lu,this.Fl,e,this);
	V(a,mu,this.Gl,e,this)
};
m.$K=function (a) {
	Ai(this.e(),a)
};
m.AK=function (a) {
	this.e().innerHTML=a
};
m.Ar=function (a) {
	var b=this.e();
	b&&B(b);
	iy.d.Ar.call(this,a);
	a&&pi(this.j.z.body,a)
};
m.Rq=function () {
	if(!lw.prototype.Rq.call(this))return e;
	if(this.anchor)for(var a,b=0;a=jy[b];b++)xi(a.e(),this.anchor)||a.B(e);We(jy,this);a=this.e();a.className=this.className;this.Lk();U(a,el,this.Mv,e,this);U(a,fl,this.Lv,e,this);this.lt();this.oc=2;return i
};
m.Sq=function () {
	Ze(jy,this);
	var a=this.e();
	for(var b,c=0;b=jy[c];c++)xi(a,b.anchor)&&b.B(e);this.Ux&&this.Ux.Tr();V(a,el,this.Mv,e,this);V(a,fl,this.Lv,e,this);this.anchor=undefined;this.vr=e;this.oc=0;lw.prototype.Sq.call(this)
};m.NH=function (a,b) {
	this.tn=h;
	if(this.anchor==a)if(this.vr||!this.zN)this.OI(a,b);
	else {
		this.oc=0;
		this.anchor=undefined
	}
};
m.OI=function (a,b) {
	if(b)b=b;
	else {
		b=new nh(this.Rk.x,this.Rk.y);
		b=new ky(b)
	}this.anchor=a;
	this.Hr(b);
	this.B(i)
};
m.MH=function (a) {
	this.Jl=h;
	if(a==this.anchor)if((this.Jb==h||this.Jb!=this.e()&&!this.$g.contains(this.Jb))&&!this.lF())this.B(e);
	else this.oc=2
};
m.lF=function () {
	return !!(this.gt&&this.gt.Jb)
};
m.aj=function (a) {
	this.Jb=a=this.jl(a.target);
	this.Lk();
	if(a!=this.anchor) {
		this.anchor=a;
		this.Ez(a);
		this.dt()
	}
};
m.jl=function (a) {
	while(a&&!this.$g.contains(a))a=a.parentNode;
	return a
};
m.Kv=function (a) {
	var b=this.j.Xf();
	this.Rk.x=a.clientX+b.x;
	this.Rk.y=a.clientY+b.y;
	this.vr=i
};
m.Fl=function (a) {
	this.Jb=a=this.jl(a.target);
	this.vr=i;
	if(this.anchor!=a) {
		this.anchor=a;
		var b=new ly(this.Jb);
		this.Lk();
		this.Ez(a,b);
		this.dt()
	}
};
m.dt=function () {
	for(var a,b=0;a=jy[b];b++)if(xi(a.e(),this.anchor)) {
		a.gt=this;
		this.Ux=a
	}
};
m.Gl=function (a) {
	var b=this.jl(a.target),c=this.jl(a.relatedTarget);
	if(b==c)return ;
	if(b==this.Jb)this.Jb=h;
	if(this.oc==1) {
		this.lt();
		this.anchor=h
	}else if(!a.relatedTarget||!xi(this.e(),a.relatedTarget))this.Tr()
};
m.Mv=function () {
	var a=this.e();
	if(this.Jb!=a) {
		this.Lk();
		this.Jb=a
	}
};
m.Lv=function (a) {
	var b=this.e();
	if(this.Jb==b&&!xi(b,a.relatedTarget)) {
		this.Jb=h;
		this.Tr()
	}
};
m.Ez=function (a,b) {
	if(this.oc==0||this.oc==3) {
		this.tn=Wl(r(this.NH,this,a,b),this.tL);
		this.oc=1
	}
};
m.lt=function () {
	if(this.tn) {
		Xl(this.tn);
		this.tn=h;
		this.oc=0
	}
};
m.Tr=function () {
	if(this.oc==2) {
		this.Jl=Wl(r(this.MH,this,this.anchor),this.HF);
		this.oc=3
	}
};
m.Lk=function () {
	if(this.Jl) {
		Xl(this.Jl);
		this.Jl=h;
		this.oc=2
	}
};
m.k=function () {
	var a=this.e();
	iy.d.k.call(this);
	this.detach();
	a&&B(a);
	this.Jb=h;
	delete this.j
};
function ky(a,b) {
	Dw.call(this,a,b)
}v(ky,Dw);
ky.prototype.Gb=function (a,b,c) {
	b=At(a);
	c=c?new jt(c.top+10,c.right,c.bottom,c.left+10):new jt(10,0,0,10);
	uw(b,5,a,5,this.Ok,c,9)||uw(b,5,a,7,this.Ok,c,5)
};
function ly(a) {
	Aw.call(this,a,4)
}v(ly,Aw);
ly.prototype.Gb=function (a,b,c) {
	var d=new nh(0,0);
	c=c?new jt(c.top,c.right,c.bottom,c.left-10):new jt(0,0,0,-10);
	uw(this.X,this.Wg,a,b,d,c,9)||uw(this.X,2,a,3,d,c,5)
};
function my(a,b,c,d,f,g) {
	this.ma=a;
	this.yJ=b;
	this.VJ=c;
	this.UC=d;
	this.LL=f;
	this.WJ=g;
	this.Gk={
		GN:0,Zk:0
	}
}my.prototype.xk=function () {
	var a=this.Gk.Zk;
	this.Gk.Zk+=this.WJ();
	this.kD(a,this.Gk.Zk)
};
my.prototype.kD=function (a,b) {
	this.jy();
	for(a=a;a<b;a++)this.ma.lh(a,r(this.eg,this,a))
};my.prototype.eg=function (a,b) {
	if(!b&&a==0) {
		this.UC();
		return
	}b&&this.yJ(a,b);
	a==this.Gk.Zk-1&&this.VJ();
	this.jy()
};
my.prototype.jy=function () {
	this.LL(this.ma.mh(),this.ma.Bh())
};
var ny={
};
function oy(a,b,c,d) {
	this.name=a;
	this.factory=b;
	this.sM=c;
	this.hD=d
}var X;
function py() {
	this.ma=h;
	this.fl=[];
	this.it=[];
	this.vm=t(Rx,r(this.vm,this));
	this.Ne=[];
	this.V=e
}m=py.prototype;
m.Ya=function () {
};
var qy="entries";
m.Ba=function () {
	if(!this.cu)this.cu=J(qy);
	return this.cu
};
m.reset=function () {
	this.fA(this.it);
	this.Ta=e;
	if(this.fa)for(var a=0,b;b=this.fa[a];a++)b.Lj();this.fa=[];this.Ba().innerHTML=n;this.jj=i;this.ja=this.Qf=-1
};
m.u=function (a,b) {
	if(this.V)ry&&ry.u();
	else this.f()&&Dm(this.f(),e,a,b)
};
m.f=function () {
	return this.ma?this.ma.h:h
};
var sy="shared";
m.tp=function () {
	var a=this.f();
	if(a.Ec(R.xd()))return Bb;
	else if(a.Ec(R.yb())||a.Ec(R.fe()))return sy;
	return hs
};
m.Ze=function (a) {
	var b=this.f();
	Zk.Xc(b,this.ma,function (c) {
		if(b.J.Ka) {
			var d=b.rb();
			if(d.type==nb||b.mg()||c==h)c=d.hf()?c:d.ge()
		}a(c)
	})
};
m.bg=function (a) {
	this.Ze(function (b) {
		a(b?Sf(b):n)
	})
};
m.Sn=function (a) {
	this.fl.push(a)
};
m.er=function (a) {
	for(var b=0,c;c=this.fl[b];b++)if(c==a) {
		this.fl.splice(b,1);
		break
	}
};
m.aB=function (a) {
	this.it.push(a)
};
m.fA=function (a) {
	a=a.slice();
	for(var b=0,c;c=a[b];b++)c()
};m.kq=function () {
	return e
};
m.Br=function (a) {
	if(this.kq(a))this.Oe=a
};
m.aC=function () {
	this.Oe=h
};
m.be=function (a,b,c) {
	this.Yq(a,b,c);
	this.lG(a,r(this.Hi,this,a,c),b)
};
m.Hi=function (a,b) {
	this.Fj=new my(this.ma,r(this.eg,this),r(this.Oo,this),r(this.Fv,this),r(this.updateStatus,this),r(this.BE,this));
	if(b)this.Md(this.Oe,i);
	else {
		this.aC();
		this.Md(this.jb(),i)
	}this.yf(this.sh(),i);
	this.Qf=this.ja=-1;
	this.reset();
	Up();
	this.$F(a);
	this.Fj.xk();
	this.lw();
	var c=this;
	Sq(this.f(),function (d) {
		c.jq=d;
		c.BL(d,a)
	});
	this.fA(this.fl)
};
m.xt=function (a,b) {
	this.ma=new ty(a,20);
	b()
};
m.lG=function (a,b,c) {
	if(this.ma&&this.ma!=c) {
		uy();
		this.ma.abort()
	}if(c) {
		this.ma=c;
		b();
		return
	}this.xt(a,b)
};
m.eg=function (a,b) {
	if(!this.Ta) {
		uy();
		this.Cw=i;
		this.XJ=Wj()
	}this.yi(b);
	if(!this.Ta) {
		this.Ta=i;
		this.bk()
	}
};
m.bk=function () {
	var a=this.Ba();
	a.style.visibility=pw;
	x(a,Q);
	this.ca()
};
m.Oo=function () {
	var a=this.fa.length;
	if(this.Cw&&a>0) {
		a=(Wj()-this.XJ)/a*1000;
		Op(this.jb().sM,a);
		this.Cw=e
	}this.jj=e
};
m.Fv=function () {
	uy()
};
var vy=["0 items","1 item","2 items","3 items","4 items","5 items","6 items","7 items","8 items","9 items","10 items"];
m=py.prototype;
var wy="more than %1 items",xy="%1 items";
m.HE=function (a,b) {
	if(b)return O(wy,a);
	return Fj(a,e,vy,xy)
};
var yy="entries-status",zy="loading",Ay="Loading more items...",By=" - sorted by oldest";
m.updateStatus=function (a,b) {
	this.Fp=b||a>this.fa.length;
	if(!this.du)this.du=J(yy);
	var c=this.du;
	if(this.jj) {
		w(c,zy);
		c.innerHTML=Ay
	}else {
		x(c,zy);
		c.innerHTML=this.HE(a,b);
		if(this.Lw())c.innerHTML+=By
	}
};
m.BE=function () {
	return this.jb()==ny.$b?this.Ta?1:5:20
};
m.UG=function () {
	return Cy.sh(this.f()).id==rs
};
m.Lw=function () {
	return Cy.sh(this.f()).id==xs
};
m.bi=function (a,b) {
	if(b)return ;
	zs(a);
	this.u(e)
};
var Dy="single-source";
m.Md=function (a) {
	if(this.V)return e;
	if(this.Oe&&this.Oe==ny.qk&&a!=this.Oe)return e;
	if(!this.kq(a))return e;
	y(this.Ba(),Dy,!(this.f().J.Ka||this.f().ha()));
	this.Ey=a;
	return i
};
m.jb=function () {
	if(!(this.f()&&this.f().ha()))return this.zw()?ny.$b:ny.pk;
	return this.Ey
};
m.zw=function () {
	if(this.Oe)return this.Oe==ny.$b||this.Oe==ny.qk;
	return Ws()
};
m.yf=function (a) {
	for(var b in ts) {
		var c=ts[b];
		c.K()&&y(c.K(),Ou,a==c)
	}
};
m.sh=function () {
	return Cy.sh(this.f())
};
m.VB=function () {
	return this.Ta&&!this.V&&this.jq&&!this.f().ha()&&this.fa.length>0
};
m.vm=function () {
	if(!this.VB())return ;
	var a=this;
	this.bg(function (b) {
		var c;
		if(a.UG())c=a.fa[0].ml().getTime();
		cr(a.f(),c,b,r(a.u,a,e),r(a.nx,a),r(a.EH,a),r(a.FH,a))
	})
};
m.nx=function (a,b,c) {
	br(a,b,c)
};
m.EH=function () {
};
m.FH=function () {
};
m.Aa=function () {
	return this.fa[this.ja]
};
m.yi=function (a) {
	var b=this.fa.length;
	a=new (this.jb().factory)(a,b);
	this.fa.push(a);
	this.qw(a.D)
};
m.qw=function (a) {
	this.Ba().appendChild(a)
};
m.is=function () {
	if(this.V||!this.Ta)return ;
	this.Aa()&&this.Aa().is()
};
m.fs=function () {
	if(this.V||!this.Ta)return ;
	if(this.Aa()) {
		if(this.jb()==ny.pk&&this.ja!=this.Qf)return ;
		this.Aa().fs()
	}
};
m.Dn=function () {
	if(this.V||!this.Ta)return ;
	this.Aa()&&this.Aa().Dn()
};
m.om=function () {
	if(this.V||!this.Ta)return ;
	this.Aa().om()
};
m.Gi=function (a) {
	this.Qf!=-1&&this.fa[this.Qf].collapse();
	this.Qf=this.ja=a;
	a=this.Aa();
	a.expand();
	a.Oh()
};
m.UD=function () {
	if(this.V||!this.Ta||!this.Aa())return h;
	var a=this.Aa().p,b=a.We(un);
	a=a.Xc();
	return {
		url:b,title:a
	}
};
m.Gm=function () {
};
m.Dq=function () {
	return h
};
m.ca=function () {
};
m.Gf=function (a) {
	this.Ne.push(a)
};
m.es=function (a) {
	if(this.V||!this.Ta)return ;
	var b=this.Aa();
	if(!b)return ;
	for(var c=0,d;d=b.Ne[c];c++)dinstanceofa&&d.Ga()
};m.MM=function (a,b) {
	var c=this.Ey,d=this.Ba();
	for(var f in ny) {
		var g=ny[f],k=c==g,l=J(a+g.name);
		l&&y(l,b,k);
		y(d,g.name,k)
	}
};
function Ey(a,b,c,d) {
	for(var f=0,g;g=b[f];f++)if(g.ko(a)) {
		a=new g.w(a,c,d);
		a.yi();
		Fy(c);
		Gy&&Gy(c);
		return a
	}j(new Error("Couldn't find a handler for entry node."))
}var Gy=h;
function Hy(a) {
	Gy=a
}var Iy="_blank",Jy="item-body";
function Ky(a) {
	a=a.Fu();
	uj(a,Iy);
	var b=ni(C),c=ni(C,{
		"class":Jy
	});
	c.appendChild(a);
	b.appendChild(c);
	return b
}function Ly(a,b) {
	this.$C=a;
	this.oi=b
}function My() {
	return i
}Ly.prototype.yi=function () {
	this.oi.appendChild(Ky(this.$C))
};
var Ny={
	w:Ly,ko:My
};
function Fy(a) {
	var b=a.getElementsByTagName(pe);
	for(var c=0,d;d=b[c];c++)Oy(d);a=a.getElementsByTagName(Ro);for(var c=0;b=a[c];c++)b.parentNode.tagName.toLowerCase()!=pe&&Oy(b)
}var Py="src",Qy="param",Ry="movie",Sy="value",Ty="500px",Uy="400px",Vy="span",Wy="link popout",Xy="Click to open in a new window",Yy="/reader/ui/3247397568-audio-player.swf",Zy="Popout";
function Oy(a) {
	var b=n;
	if(a.tagName.toLowerCase()==Ro&&a.getAttribute(Py))b=a.getAttribute(Py);
	else if(a.tagName.toLowerCase()==pe) {
		var c=a.getElementsByTagName(Qy);
		for(var d=0,f;f=c[d];d++)if(f.getAttribute(Tn)&&f.getAttribute(Tn).toLowerCase()==Ry) {
			b=f.getAttribute(Sy);
			break
		}
	}if(b==n)return ;
	c=a.getAttribute(fi)||Ty;
	d=a.getAttribute(ei)||Uy;
	f=N(Vy,{
		"class":Wy,title:Xy
	});
	f.onclick=b.indexOf(Yy)!=-1?t($y,a.cloneNode(i),c,d):t(az,b,c,d);
	f.innerHTML=Zy;
	a.parentNode.insertBefore(f,a.nextSibling)
}
function az(a,b,c) {
	bz(a,{
		target:Iy,width:b,height:c,toolbar:e,scrollbars:e,resizable:e,menubar:e
	})
}var cz="type",dz="text/css",ez="stylesheet",fz="popout-body",gz="popout-container";
function $y(a,b,c) {
	b=hz(n,{
		target:Iy,width:b,height:c,toolbar:e,scrollbars:e,resizable:e,menubar:e
	});
	c=b.document;
	var d=c.getElementsByTagName(gn)[0];
	if(d) {
		var f=document.getElementsByTagName(gn)[0].getElementsByTagName(tb),g=n;
		for(var k=0,l;l=f[k];k++)if(l.getAttribute(cz)==dz) {
			g=l.href;
			break
		}f=N(tb,{
			rel:ez,type:dz,href:g
		},c);
		d.appendChild(f)
	}w(c.body,fz);
	d=N(C,{
		"class":gz
	},c);
	c.body.appendChild(d);
	if(b.document.importNode)a=c.importNode(a,i);
	d.appendChild(a)
}
function iz(a,b) {
	this.mx=a;
	this.oi=b
}function jz(a) {
	a=a.Ve(wn);
	if(a==h)return e;
	var b=a.P;
	if(!a.cf||!b)return e;
	return i
}function kz(a) {
	return jz(a)
}var lz="audio",mz="mp3";
iz.prototype.yi=function () {
	var a=this.mx.Ve(wn),b=a.P,c=this.aE(b);
	c=oz({
		WC:c,VC:a.cf
	});
	M(c,Jy).appendChild(Ky(this.mx));
	if(Uj(b)==lz||b.toLowerCase()==mz)this.iL(c,a);
	this.oi.appendChild(c)
};
var pz="Original audio source",qz="Original video source",rz="Original enclosure";
iz.prototype.aE=function (a) {
	switch(Uj(a)) {
		case lz:return pz;
		case Qo:return qz;
		default:return rz
	}
};
var sz="/reader/ui/3247397568-audio-player.swf?audioUrl=",tz="audio-player-placeholder",uz="audio-player-embed";
iz.prototype.iL=function (a,b) {
	var c=new Sg(document.location.href);
	b=new Sg(sz+encodeURIComponent(b.cf));
	c=c.Nm(b);
	M(a,tz).innerHTML=vz(c.toString (),400,27,uz)
};
var wz={
	w:iz,ko:kz
},xz=[{
	IH:/^feed\/http:\/\/video\.google\.com\/.*(video)./i
}];
function yz(a,b) {
	this.um=a;
	this.oi=b;
	this.CN=zz(a)
}function Az(a) {
	if(!a)return e;
	return (Bz(a)||zz(a)!=h)&&!(a.Fu().getElementsByTagName(Ro).length>0)
}function zz(a) {
	a=a.kc.h.streamId;
	for(var b=0,c;c=xz[b];b++)if(c.IH.test(a))return c;return h
}var Cz="application/x-shockwave-flash";function Bz(a) {
	a=a.Ve(wn);
	if(a==h)return e;
	var b=a.P;
	if(!a.cf||!b)return e;
	return b==Cz
}yz.prototype.mE=function () {
	var a=this.um.PH;
	if(a!=h)return a.vb;
	return h
};
function Dz(a) {
	return Az(a)
}m=yz.prototype;
m.yi=function () {
	var a=Ky(this.um);
	Bz(this.um)?this.gB(a):this.hB(a);
	this.oi.appendChild(a)
};
var Ez="video-player-placeholder player",Fz="<object ",Gz='classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ',Hz='codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/',Iz='flash/swflash.cab#version=7,0,0,0" ',Jz='align="middle" ',Kz='width="',Lz='px" ',Mz='height="',Nz='px">',Oz='<param name="quality" value="best">',Pz='<param name="allowScriptAccess" value="never">',Qz='<param name="allowFullScreen" value="true">',Rz='<param name="wmode" value="transparent">',Sz='<param name="movie" value="',
Tz="<embed ",Uz='className="video-player-embed" ',Vz='type="application/x-shockwave-flash" ',Wz='" ',Xz='allowScriptAccess="never" ',Yz='allowFullScreen="true" ',Zz='quality="best" ',$z='bgcolor="#ffffff" ',aA='wmode="transparent" ',bA='FlashVars="playerMode=embedded" ',cA='pluginspage="http://www.macromedia.com/go/getflashplayer">',dA="</embed>",eA="</object>";
m.Tu=function (a) {
	var b=N(C,{
		"class":Ez
	});
	b.innerHTML=[Fz,Gz,Hz,Iz,Jz,Kz,400,Lz,Mz,326,Nz,Oz,Pz,Qz,Rz,Sz,a,Qi,Tz,Uz,Kz,400,Lz,Mz,326,Lz,Vz,dm,a,Wz,Xz,Yz,Zz,$z,aA,bA,cA,dA,eA].join(n);
	return b
};
m.gB=function (a) {
	this.py(a);
	var b=this.Tu(this.um.Ve(wn).cf);
	try{
		var c=a.getElementsByTagName(So)[0];
		c.parentNode.removeChild(c)
	}catch(d) {
	}a.insertBefore(b,a.firstChild)
};
m.hB=function (a) {
	w(M(a,Jy),Qo);
	this.iB(a)
};
var fA="google-video",gA="http://video.google.com/googleplayer.swf";
m.iB=function (a) {
	this.py(a);
	var b=a.getElementsByTagName(So)[0];
	w(M(a,Jy),fA);
	a=this.mE();
	if(!a)return ;
	var c;
	for(var d=0,f;f=a[d];d++) {
		c=f.Ae;
		if(c.indexOf(gA)==0) {
			c=c.replace(/&#38;
			/g,Hf);
			break
		}
	}if(!c)return ;
	c=this.Tu(c);
	b=b.parentNode;
	b.parentNode.replaceChild(c,b)
};
m.py=function (a) {
	a=a.getElementsByTagName(Ro);
	while(a[0])B(a[0])
};
var hA={
	w:yz,ko:Dz
};
function iA(a) {
	this.rr=a;
	this.p=a.p
}iA.prototype.Yb=function () {
	return i
};
function jA(a,b) {
	iA.call(this,a);
	this.kF=b
}v(jA,iA);
jA.prototype.K=function () {
	this.m=N(Vy);
	this.w=new this.kF(this.m,this.p);
	return this.m
};
jA.prototype.n=function () {
	this.w.n()
};
function kA(a) {
	jA.call(this,a,vr)
}v(kA,jA);
function lA(a) {
	jA.call(this,a,yr)
}v(lA,jA);
function mA(a) {
	jA.call(this,a,Ks()?xr:wr)
}v(mA,jA);
mA.prototype.Yb=function () {
	return !this.p.isReadStateLocked()
};
function nA(a,b) {
	this.p=a;
	this.Di=b;
	this.D=N(C);
	this.cs=[];
	this.Ne=[];
	this.la=[];
	this.tH=[];
	this.zA=this.Ln=e;
	this.hg()
}m=nA.prototype;
m.Lj=function () {
	for(var a=0,b;b=this.la[a];a++)Cl(b);this.Pt();this.Ot();for(var a=0;b=this.tH[a];a++)b()
};m.Pt=function () {
	for(var a=0,b;b=this.cs[a];a++)b.n();this.cs=[]
};m.Oh=function () {
	this.WB()&&this.Dn()
};
m.WB=function () {
	return !this.lg()&&!this.zA&&!this.isReadStateLocked()
};
m.hg=function () {
	this.si=this.TD();
	this.D.innerHTML=n;
	this.D.className=this.hp()
};
m.TD=function () {
	var a=this.p,b={
		pd:this.Pi(),origin:a.kc,vN:a.kc.PF,wN:a.kc.q,bd:a.Cc()?h:a.We(un),di:this.th(),yz:a.Eh()&&a.Ve(vn).h,tc:this.Uf(),eN:a
	};
	b.zz=b.yz?Jp&&Jp.ol(a.Ve(vn).h):i;
	b.$k=this.fp(this.ml());
	var c=h;
	b.friends=[];
	b.Cc=a.Cc();
	b.annotations=this.MD(a.Os);
	if(b.Cc) {
		c=a.ll();
		b.eo=a.Ku()
	}if(this.lL())b.friends=a.PD();
	b.Qd=a.vp(function (d) {
		if(d.h.G(X.f()))return e;
		d=d.h.rb().userId;
		if(a.Cc())if(c&&c.cg()==d)return e;
		for(var f=0,g;g=b.annotations[f];f++)if(g.userId==d)return e;return i
	},
	r(X.Dq,X));return b
};var oA="entry-actions";m.Cu=function () {
	var a=N(C,{
		"class":oA
	});
	this.Ne=[];
	var b=X.Ne;
	for(var c=0,d;d=b[c];c++) {
		d=new d(this);
		if(d.Yb()) {
			a.appendChild(d.K());
			this.Ne.push(d)
		}
	}return a
};
m.Ot=function () {
	for(var a=0,b;b=this.Ne[a];a++)b.n();this.Ne=[]
};m.Op=function (a) {
	this.Pt();
	var b=this;
	function c(d,f,g) {
		for(var k=0;k<f.length;k++) {
			var l=new d(f[k],b.p);
			g&&l.zI(g);
			b.cs.push(l)
		}
	}c(vr,a);
	this.isReadStateLocked()||c(wr,[h],r(this.HM,this))
};
m.is=function () {
	this.gs(vr)
};
m.fs=function () {
	this.gs(yr)
};
m.Dn=function () {
	if(this.isReadStateLocked())return ;
	this.gs(wr)
};
m.gs=function (a) {
	a=new a(h,this.p);
	a.Ga();
	a.n()
};
m.HM=function () {
	if(this.lg())w(this.D,yb);
	else {
		x(this.D,yb);
		if(this.p.Ah(R.Zf())) {
			this.zA=i;
			lr(this.p,Qb)
		}
	}
};
m.lg=function () {
	return (X.f().Hh()?X.jq:i)&&this.p.lg()
};
m.isReadStateLocked=function () {
	return this.p.isReadStateLocked()
};
var pA="entry",qA="read-state-locked";
m.hp=function () {
	var a=[pA];
	this.lg()&&a.push(yb);
	this.isReadStateLocked()&&a.push(qA);
	return a.join(o)
};
m.ml=function () {
	return new Date(this.p.st)
};
var rA="(title unknown)",sA="<a ";
m.Pi=function () {
	if(this.Xs)return this.Xs;
	var a=this.p.Xc();
	if(!a)a=this.p.Cc()?h:rA;
	else if(a.indexOf(sA)!=-1) {
		var b=ni(C);
		b.innerHTML=a;
		a=af(b.getElementsByTagName(Vf));
		for(var c=0,d;d=a[c];c++) {
			var f=ni(Vy);
			while(d.firstChild) {
				var g=d.firstChild;
				d.removeChild(g);
				f.appendChild(g)
			}d.parentNode.replaceChild(f,d)
		}a=b.innerHTML
	}return this.Xs=a
};
m.fp=function (a) {
	return Ij(a)
};
m.th=function () {
	var a=this.p.kc;
	return X.Dq(a.h)||a.q
};
var tA="you";
m.Uf=function () {
	if(this.p.Cc()&&!this.p.Ni().hf())return tA;
	return this.p.Uf()
};
m.en=function (a) {
	this.p.Ws==Tt&&w(a,Tt)
};
var uA="action-area";
m.Nr=function (a) {
	try{
		var b=M(this.D,uA);
		B(b)
	}catch(c) {
	}this.Ln=i;
	return this.wo(a)
};
m.Ch=function () {
	try{
		var a=M(this.D,uA);
		B(a)
	}catch(b) {
	}this.Ln=e
};
var vA="entry-via-link";
m.oG=function (a,b) {
	if(!a||a.length==0)return ;
	b=Zh(Vf,vA,b);
	for(var c=0,d;d=b[c];c++)this.la.push(wA(d,a[c].h))
};var xA="entry-annotation-author",yA="entry-annotation-author-link";
m.YA=function (a) {
	var b=this.si;
	for(var c=0,d;d=b.annotations[c];c++) {
		var f=zA({
			yB:d
		}),g=M(f,xA);
		if(d.Xa) {
			g.appendChild(AA({
				tc:d.Xa.Yc?tA:d.Xa.Sa(),by:d.Xa.Xe(),hm:!d.Xa.Yc||this.p.Ah(R.yb()),userId:d.Xa.cg()
			}));
			this.la.push(wA(M(g,yA),d.Xa.f()))
		}else g.appendChild(BA({
			tc:d.HB
		}));
		a.appendChild(f)
	}uj(a,Iy)
};
m.MD=function (a) {
	var b=[];
	for(var c=0,d;d=a[c];c++) {
		var f=Jp?Jp.ip(d.userId):h;
		b.push({
			content:d.content,userId:d.userId,Xa:f,HB:d.author
		})
	}return b
};
m.lL=function () {
	var a=X.f();
	return Jp!=h&&!a.Eb()&&!a.AG()&&!a.Ec(R.yb())&&!a.Ec(R.rp())
};
var CA="shift",DA="ctrl",EA="alt",FA="end",GA="1",HA="2",IA="3",JA="b",KA="c",LA="e",MA="j",NA="k",OA="l",PA="p",QA="q",RA="t",SA="u",TA="v",UA={
	8:"backspace",9:"tab",13:dv,16:CA,17:DA,18:EA,19:"pause",20:"caps-lock",27:"esc",32:"space",33:"pg-up",34:"pg-down",35:FA,36:"home",37:Vo,38:"up",39:up,40:"down",45:"insert",46:"delete",48:ca,49:GA,50:HA,51:IA,52:"4",53:"5",54:"6",55:Nl,56:"8",57:"9",65:Vf,66:JA,67:KA,68:"d",69:LA,70:ip,71:lg,72:"h",73:fp,74:MA,75:NA,76:OA,77:ws,78:Cn,79:uq,80:PA,81:QA,82:Nk,
	83:gp,84:RA,85:SA,86:TA,87:"w",88:"x",89:"y",90:"z",93:"context",107:"num-plus",109:"num-minus",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",187:"equals",188:gq,190:ie,191:ch,220:"\\",224:"win"
};
function VA(a) {
	W.call(this);
	this.ak={
	};
	this.oe={
		Hg:[],Tz:0
	};
	this.Al={
	};
	this.yK([27,112,113,114,115,116,117,118,119,120,121,122,123,19]);
	this.Ls=i;
	this.Js=e;
	this.nw(a)
}v(VA,W);
var WA={
	MA:0,OA:1,CA:2,BA:4,KA:8
},XA="shortcut",YA={
	QA:XA,PA:"shortcut_"
},ZA=h;
VA.prototype.mj=h;
VA.prototype.Iq=e;
function $A(a) {
	if(!ZA) {
		var b={
		};
		for(var c in UA)b[UA[c]]=c;ZA=b
	}return ZA[a]
}m=VA.prototype;m.iK=function (a) {
	this.Ls=a
};
m.mJ=function (a) {
	this.Gs(this.ak,this.wG(1,arguments),a)
};
m.wG=function (a,b) {
	if(Ce(b[a]))a=aB(b[a]);
	else {
		var c=b[a],d=0;
		if(!ze(c)) {
			c=b;
			d=a
		}a=[];
		for(;d<c.length;d+=2)a.push({
			keyCode:c[d],vx:c[d+1]
		})
	}return a
};
m.uM=function () {
	this.ak={
	}
};
m.yK=function (a) {
	this.Al={
	};
	for(var b,c=0;b=a[c];c++)this.Al[b]=i
};m.k=function () {
	VA.d.k.call(this);
	this.uM();
	this.jt()
};
function aB(a) {
	a=a.replace(/[+]*\+[+]/g,Ej).replace(/[]+/g,o).toLowerCase();
	var b=WA;
	a=a.split(o);
	var c=[];
	for(var d,f=0;d=a[f];f++) {
		d=d.split(Ej);
		var g,k=b.MA;
		for(var l,p=0;l=d[p];p++) {
			switch(l) {
				case CA:k|=b.OA;
				continue;
				case DA:k|=b.CA;
				continue;
				case EA:k|=b.BA;
				continue;
				case Sn:k|=b.KA;
				continue
			}g=$A(l);
			break
		}c.push({
			keyCode:g,vx:k
		})
	}return c
}m=VA.prototype;
var bB="1.8";
m.nw=function (a) {
	this.mj=a;
	U(this.mj,pm,this.yd,e,this);
	Bh&&Ph&&Sh(bB)&&U(this.mj,Bq,this.cF,e,this)
};
m.cF=function (a) {
	if(a.keyCode==224) {
		this.Iq=i;
		Wl(function () {
			this.Iq=e
		},400,this);
		return
	}var b=a.metaKey||this.Iq;
	if((a.keyCode==67||a.keyCode==88||a.keyCode==86)&&b) {
		a.metaKey=b;
		this.yd(a)
	}
};
m.jt=function () {
	V(this.mj,pm,this.yd,e,this);
	this.mj=h
};
m.Gs=function (a,b,c) {
	var d=b.shift();
	d=this.CH(d.keyCode,d.vx);
	var f=a[d];
	if(f&&c&&(b.length==0||Ce(f)))j(Error("Keyboard shortcut conflicts with existing shortcut"));
	if(b.length) {
		a[d]||(a[d]={
		});
		this.Gs(a[d],b,c)
	}else a[d]=c
};
m.pv=function (a,b,c) {
	b=b||0;
	if((c=(c||this.ak)[a[b]])&&!Ce(c)&&a.length-b>1)return this.pv(a,b+1,c);
	return c
};
m.CH=function (a,b) {
	return a&255|b<<8
};
var cB="TEXTAREA",dB="SELECT";
m.yd=function (a) {
	var b=a.target;
	if(a.keyCode==16||a.keyCode==17||a.keyCode==18)return ;
	if(b.tagName==cB||b.tagName==Wv||b.tagName==Vv||b.tagName==dB) {
		if(!a.altKey&&!a.ctrlKey&&!a.metaKey&&!this.YG(a.keyCode,b))return
	}else if((b.isContentEditable||b.ownerDocument&&b.ownerDocument.designMode==wl)&&!this.Al[a.keyCode]&&!this.Js)return ;
	b=a.keyCode&255|((a.shiftKey?1:0)|(a.ctrlKey?2:0)|(a.altKey?4:0)|(a.metaKey?8:0))<<8;
	var c,d,f=Ie();
	if(this.oe.Hg.length&&f-this.oe.Tz<=1500)c=this.pv(this.oe.Hg);
	else this.oe.Hg.length=
	0;
	c=c?c[b]:this.ak[b];
	if(!c) {
		c=this.ak[b];
		this.oe.Hg=[]
	}if(c&&Ce(c))d=c;
	else if(c) {
		this.oe.Hg.push(b);
		this.oe.Tz=f
	}else this.oe.Hg.length=0;
	if(d) {
		b=YA;
		c=new eB(b.QA,d,a.target);
		this.dispatchEvent(c);
		d=new eB(b.PA+d,d,a.target);
		this.dispatchEvent(d);
		if(this.Ls||!c.wf||!d.wf)a.preventDefault();
		this.oe.Hg.length=0
	}
};
var fB="text",gB="password";
m.YG=function (a,b) {
	if(this.Al[a]||this.Js)return i;
	if(b.tagName==Wv&&(b.type==fB||b.type==gB))return a==13;
	if(b.tagName==Wv||b.tagName==Vv)return a!=32;
	if(b.tagName==cB||b.tagName==dB)return e;
	return i
};
function eB(a,b,c) {
	bl.call(this,a,c);
	this.identifier=b
}v(eB,bl);
function hB() {
	VA.call(this,document)
}v(hB,VA);
hB.prototype.nw=function (a) {
	this.M=new cn(a);
	U(this.M,bn,this.yd,e,this)
};
hB.prototype.jt=function () {
	V(this.M,bn,this.yd,e,this);
	this.M.n();
	this.M=h
};
function iB() {
	this.w=new hB;
	this.w.iK(e);
	this.uo=this.$q=h;
	this.dj={
	};
	this.bq=e;
	U(this.w,XA,this.hF,e,this)
}m=iB.prototype;
m.hF=function (a) {
	a.identifier!=13&&a.preventDefault();
	if(this.bq||this.bD(a))return ;
	a=a.identifier;
	if(this.$q&&!this.$q(a))return ;
	if(a in this.dj) {
		this.dj[a]();
		Op(Uc,a,0.01)
	}this.uo&&this.uo()
};
m.RK=function (a) {
	this.$q=a
};
m.oK=function (a) {
	this.uo=a
};
m.Fs=function (a,b,c) {
	var d=this.Wu(a);
	if(c)b=r(b,c);
	this.dj[d]=b;
	this.w.mJ.apply(this.w,[d].concat(a))
};
m.XA=function (a,b) {
	b=this.Wu(b);
	b in this.dj&&this.Fs(a,this.dj[b])
};
m.Wu=function (a) {
	return a.join(Kk)
};
m.TF=function () {
	this.bq=i
};
m.UA=function () {
	this.bq=e
};
var jB="checkbox",kB="A",lB="offscreen";
m.bD=function (a) {
	try{
		var b=a.target,c=b.tagName;
		if(c==Wv&&b.type==fB||b.type==gB||b.type==jB||c==cB)return i;
		var d=jf(b);
		return c==kB&&Ve(d,lB)||mB(b)
	}catch(f) {
		return e
	}
};
var Lp=h,nB="top",oB="target";
function hz(a,b,c) {
	b||(b={
	});
	c=c||window;
	var d=typeofa.href!="undefined"?a.href:String(a);
	a=b.target||a.target;
	var f=[];
	for(var g in b)switch(g) {
		case fi:case ei:case nB:case Vo:f.push(g+mh+b[g]);
		break;
		case oB:break;
		default:f.push(g+mh+(b[g]?1:0))
	}b=f.join(gq);
	return c.open(d,a,b)
}var pB="google_popup";
function bz(a,b) {
	b||(b={
	});
	b.target=b.target||a.target||pB;
	b.width=b.width||690;
	b.height=b.height||500;
	a=hz(a,b);
	if(!a)return i;
	a.focus();
	return e
}var qB="hilite",rB="canceldismiss",sB="dismiss";
function tB(a,b,c) {
	W.call(this);
	this.qx=a;
	this.Fy=c;
	this.v=b;
	U(b,[qB,hu,rB,sB],this);
	this.Pd=h;
	this.Na=[];
	this.Ac=-1;
	this.rd=0;
	this.uc=this.S=h
}v(tB,W);
m=tB.prototype;
m.JH=10;
m.JB=i;
m.wB=e;
m.handleEvent=function (a) {
	if(a.target==this.v)switch(a.type) {
		case qB:this.bf(a.Qm);
		break;
		case hu:this.Tj();
		break;
		case rB:this.mo();
		break;
		case sB:this.It();
		break
	}
};
m.Kr=function (a,b) {
	if(this.Pd==a)return ;
	this.Pd=a;
	this.qx.GJ(this.Pd,this.JH,r(this.HH,this),b);
	this.mo()
};
m.Jr=function (a) {
	this.S=a
};
m.Bc=function () {
	return this.v.H()
};
m.Yv=function () {
	if(this.Ac>=this.rd&&this.Ac<this.rd+this.Na.length-1) {
		this.bf(this.Ac+1);
		return i
	}else if(this.Ac==-1) {
		this.bf(this.rd);
		return i
	}return e
};
m.Zv=function () {
	if(this.Ac>this.rd) {
		this.bf(this.Ac-1);
		return i
	}else this.wB&&this.Ac==this.rd&&this.bf(-1);
	return e
};
m.bf=function (a) {
	this.Ac=a;
	this.v.bf(a);
	return this.jp(a)!=-1
};
var uB="update";
m.Tj=function () {
	var a=this.jp(this.Ac);
	if(a!=-1) {
		a=this.Na[a];
		this.Fy.ZJ(a);
		this.Nb();
		this.dispatchEvent({
			type:uB,Qm:a
		});
		return i
	}else {
		this.Nb();
		this.dispatchEvent({
			type:uB,Qm:h
		});
		return e
	}
};
m.Nb=function () {
	this.Ac=-1;
	this.Pd=h;
	this.rd+=this.Na.length;
	this.Na=[];
	window.clearTimeout(this.uc);
	this.uc=h;
	this.v.Nb()
};
m.It=function () {
	if(!this.uc)this.uc=window.setTimeout(r(this.Nb,this),100)
};
m.mo=function () {
	window.setTimeout(r(function () {
		if(this.uc) {
			window.clearTimeout(this.uc);
			this.uc=h
		}
	},this),10)
};
m.k=function () {
	tB.d.k.call(this);
	this.v.n();
	this.Fy.n();
	this.qx=h
};
m.HH=function (a,b,c) {
	if(this.Pd!=a)return ;
	a=c?this.jp(this.Ac):h;
	this.rd+=this.Na.length;
	this.Na=b;
	c=[];
	for(var d=0;d<b.length;++d)c.push({
		id:this.Vu(d),data:b[d]
	});
	this.v.CJ(c,this.Pd,this.S);
	if(this.JB&&c.length!=0)this.bf(a!=h?this.Vu(a):this.rd);
	else this.Ac=-1
};
m.jp=function (a) {
	a=a-this.rd;
	if(a<0||a>=this.Na.length)return -1;
	return a
};
m.Vu=function (a) {
	return this.rd+a
};
function vB(a,b) {
	this.Na=a;
	this.SM=!b
}
vB.prototype.GJ=function (a,b,c) {
	var d=this.wE(a,b);
	if(d.length==0&&this.SM)d=this.DE(a,b);
	c(a,d)
};
var wB="(^|\\W+)";
vB.prototype.wE=function (a,b) {
	var c=[];
	if(a!=n) {
		a=jg(a);
		var d=new RegExp(wB+a,fp);
		tg(this.Na,function (f) {
			String(f).match(d)&&c.push(f);
			return c.length>=b
		})
	}return c
};
vB.prototype.DE=function (a,b) {
	var c=[];
	sg(this.Na,function (g,k) {
		var l=a.toLowerCase(),p=String(g).toLowerCase(),s=0;
		if(p.indexOf(l)!=-1)s=parseInt((p.indexOf(l)/4).toString (),10);
		else {
			var A=l.split(n),I=-1,s=0,L=10;
			for(var K=0,G;G=A[K];K++) {
				G=p.indexOf(G);
				if(G>I) {
					I=G-I-1;
					if(I>L-5)I=L-5;
					s+=I;
					I=G
				}else {
					s+=L;
					L+=5
				}
			}
		}s<l.length*6&&c.push({
			ML:g,Ay:s,index:k
		})
	});
	c.sort(function (g,k) {
		var l=g.Ay-k.Ay;
		if(l!=0)return l;
		return g.index-k.index
	});
	var d=[];
	for(var f=0;f<b&&f<c.length;f++)d.push(c[f].ML);return d
};
var xB="textarea",yB="character";function zB(a,b) {
	if(AB(a))a.selectionStart=b;
	else if(z) {
		var c=BB(a),d=c[0];
		if(d.inRange(c[1])) {
			if(a.type==xB) {
				a=a.value.substring(0,b);
				b=uf(a).length
			}d.collapse(i);
			d.move(yB,b);
			d.select()
		}
	}
}var CB="StartToEnd",DB="\r\n";
function EB(a,b,c) {
	b=b.duplicate();
	var d=a.text,f=d,g=b.text,k=g,l=e;
	while(!l)if(a.compareEndPoints(CB,a)==0)l=i;
	else {
		a.moveEnd(yB,-1);
		if(a.text==d)f+=DB;
		else l=i
	}if(c)return [f.length,-1];
	a=e;
	while(!a)if(b.compareEndPoints(CB,b)==0)a=i;
	else {
		b.moveEnd(yB,-1);
		if(b.text==g)k+=DB;
		else a=i
	}return [f.length,f.length+k.length]
}var FB="EndToStart";
function GB(a,b) {
	var c=0,d=0;
	if(AB(a)) {
		c=a.selectionStart;
		d=b?-1:a.selectionEnd
	}else if(z) {
		var f=BB(a),g=f[0];
		f=f[1];
		if(g.inRange(f)) {
			g.setEndPoint(FB,f);
			if(a.type==xB)return EB(g,f,b);
			c=g.text.length;
			d=b?-1:g.text.length+f.text.length
		}
	}return [c,d]
}function HB(a,b) {
	if(AB(a))a.selectionEnd=b;
	else if(z) {
		var c=BB(a),d=c[1];
		if(c[0].inRange(d)) {
			c=GB(a,i)[0];
			if(a.type==xB) {
				b=a.value.substring(0,b);
				b=uf(b).length;
				a=a.value.substring(0,c);
				c=uf(a).length
			}d.collapse(i);
			d.moveEnd(yB,b-c);
			d.select()
		}
	}
}
function IB(a,b) {
	var c=a.ownerDocument||a.document;
	if(AB(a)) {
		a.selectionStart=b;
		a.selectionEnd=b
	}else if(c.selection&&a.createTextRange) {
		a=a.createTextRange();
		a.collapse(i);
		a.move(yB,b);
		a.select()
	}
}function BB(a) {
	var b=a.ownerDocument||a.document,c=b.selection.createRange();
	if(a.type==xB) {
		b=b.body.createTextRange();
		b.moveToElementText(a)
	}else b=a.createTextRange();
	return [b,c]
}function AB(a) {
	try{
		return typeofa.selectionStart==qe
	}catch(b) {
		return e
	}
}var JB=",;";
function KB(a,b,c,d) {
	$k.call(this);
	this.UK(le(a)&&!(a===h)?a:JB);
	this.ex=b||n;
	this.SI=this.ug=c!=h?c:i;
	this.W=new Tl(d||150);
	this.Ob=new Ll(this);
	this.rk=new Ll(this);
	this.M=new cn;
	this.Xw=-1
}v(KB,$k);
m=KB.prototype;
m.YM=i;
m.KD=i;
m.qA=e;
m.cK=i;
m.xa=h;
m.xq=n;
m.Rd=e;
m.mr=e;
m.AM=i;
m.BB=function (a) {
	this.pa=a
};
m.EB=function (a) {
	vu(a,Ov,i);
	this.Ob.l(a,lu,this.Cj);
	this.Ob.l(a,mu,this.gI);
	this.xa||this.rk.l(a,pm,this.tI)
};
m.FB=function () {
	for(var a=0;a<arguments.length;a++)this.EB(arguments[a])
};
m.ZJ=function (a,b) {
	var c=this.pa.S;
	if(le(b)?b:this.ug) {
		b=GB(c,i)[0];
		b=this.wv(c.value,b);
		var d=this.Sr(c.value);
		a=a.toString ();
		this.bK.test(a)||(a=a.replace(/[\s\xa0]+$/,n)+this.BC);
		if(this.YM) {
			if(b!=0&&!rf(d[b-1]))a=o+a;
			if(b<d.length&&!rf(d[b+1]))a=a+o
		}if(a!=d[b]) {
			d[b]=a;
			c.value=d.join(n);
			a=0;
			for(var f=0;f<=b;f++)a+=d[f].length;c.focus();zB(c,a);HB(c,a)
		}
	}else c.value=a.toString ();this.mr=i
};m.k=function () {
	KB.d.k.call(this);
	this.Ob.n();
	delete this.Ob;
	this.rk.n();
	this.rk=h
};
var LB="[\\s",MB="]+",NB="[\\s]+",OB="^",PB="$",QB="\\s*[",RB="]$";
m.UK=function (a) {
	this.Vh=a;
	this.BC=this.Vh.substring(0,1);
	a=this.ug?LB+this.Vh+MB:NB;
	this.gA=new RegExp(OB+a+Wr+a+PB,lg);
	this.bK=new RegExp(QB+this.Vh+RB)
};
m.Qb=function (a) {
	switch(a.keyCode) {
		case 40:if(this.pa.Bc()) {
			this.TH();
			a.preventDefault();
			return i
		}else if(!this.ug) {
			this.Zb(i);
			a.preventDefault();
			return i
		}break;
		case 38:if(this.pa.Bc()) {
			this.VH();
			a.preventDefault();
			return i
		}break;
		case 9:this.Zb();
		if(this.pa.Tj()&&this.SI) {
			a.preventDefault();
			return i
		}break;
		case 13:this.Zb();
		if(this.pa.Tj()) {
			a.preventDefault();
			return i
		}break;
		case 27:if(this.pa.Bc()) {
			this.pa.Nb();
			return i
		}break;
		case 229:if(!this.Rd) {
			this.KL();
			return i
		}break;
		default:if(!this.AM) {
			this.W.stop();
			this.W.start()
		}
	}if(this.cK&&this.ug&&a.charCode&&this.Vh.indexOf(String.fromCharCode(a.charCode))!=-1) {
		this.Zb();
		if(this.pa.Tj()) {
			a.preventDefault();
			return i
		}
	}return e
};
m.lB=function () {
	this.M.mi(this.xa);
	this.Ob.l(this.M,bn,this.Mx);
	z&&this.Ob.l(this.xa,gl,this.Hx)
};
m.sJ=function () {
	this.Ob.wa(this.M,bn,this.Mx);
	this.M.detach();
	z&&this.Ob.wa(this.xa,gl,this.Hx);
	this.Rd&&this.Wr()
};
m.Cj=function (a) {
	this.rk.vf();
	this.pa&&this.pa.mo();
	if(a.target!=this.xa) {
		this.xa=a.target||h;
		this.W.start();
		this.Ob.l(this.W,Vl,this.Rh);
		this.xq=this.xa.value;
		this.lB()
	}
};
m.gI=function () {
	if(this.xa) {
		this.sJ();
		this.xa=h;
		this.W.stop();
		this.Ob.wa(this.W,Vl,this.Rh);
		this.pa&&this.pa.It()
	}
};
m.Rh=function () {
	this.Rd||this.Zb()
};
m.tI=function (a) {
	this.Cj(a)
};
m.Mx=function (a) {
	this.Xw=a.keyCode;
	this.pa&&!this.Rd&&this.Qb(a)
};
m.Kx=function () {
	this.Rd&&this.Xw!=229&&this.Wr()
};
m.Lx=function (a) {
	if(this.Rd&&(a.keyCode==13||a.keyCode==77&&a.ctrlKey))this.Wr()
};
m.KL=function () {
	if(this.Rd)return ;
	this.Ob.l(this.xa,Bq,this.Lx);
	this.Ob.l(this.xa,gl,this.Kx);
	this.Rd=i
};
m.Wr=function () {
	if(!this.Rd)return ;
	this.Rd=e;
	this.Ob.wa(this.xa,gl,this.Kx);
	this.Ob.wa(this.xa,Bq,this.Lx)
};
m.Hx=function (a) {
	if(this.ug&&this.Vh.indexOf(String.fromCharCode(a.charCode))!=-1) {
		this.Zb();
		this.pa.Tj()&&a.preventDefault()
	}
};
m.Zb=function (a) {
	if(a||this.xa&&this.xa.value!=this.xq) {
		if(!this.mr) {
			a=this.KI();
			if(this.pa) {
				this.pa.Jr(this.xa);
				this.pa.Kr(a,this.xa.value)
			}
		}this.xq=this.xa.value
	}this.mr=e
};
m.VH=function () {
	return this.qA?this.pa.Yv():this.pa.Zv()
};
m.TH=function () {
	return this.qA?this.pa.Zv():this.pa.Yv()
};
m.KI=function () {
	var a=GB(this.xa,i)[0],b=this.xa.value;
	return this.qM(this.Sr(b)[this.wv(b,a)])
};
m.qM=function (a) {
	return this.gA?String(a).replace(this.gA,n):a
};
m.wv=function (a,b) {
	var c=this.Sr(a);
	if(b==a.length)return c.length-1;
	a=0;
	for(var d=0,f=0;d<c.length&&f<b;d++) {
		f+=c[d].length;
		a=d
	}return a
};
m.Sr=function (a) {
	if(!this.ug)return [a];
	a=String(a).split(n);
	var b=[],c=[];
	for(var d=0,f=e;d<a.length;d++)if(this.ex&&this.ex.indexOf(a[d])!=-1) {
		if(this.KD&&!f) {
			b.push(c.join(n));
			c.length=0
		}c.push(a[d]);
		f=!f
	}else if(!f&&this.Vh.indexOf(a[d])!=-1) {
		c.push(a[d]);
		b.push(c.join(n));
		c.length=0
	}else c.push(a[d]);
	b.push(c.join(n));
	return b
};
var SB="ac-renderer",TB="ac-row",UB="active";
function VB(a,b,c,d) {
	this.A=a||Th().z.body;
	this.j=Vh(this.A);
	this.FJ=!a;
	this.g=h;
	this.Pd=n;
	this.Na=[];
	this.Dz=this.Ml=-1;
	this.ia=e;
	this.className=SB;
	this.lr=TB;
	this.ys=UB;
	this.Xg=b||h;
	this.TM=d!=h?d:i;
	this.KJ=c!=h?c:e;
	this.rq=h;
	this.En=e
}v(VB,W);
var WB=0;
m=VB.prototype;
m.CJ=function (a,b,c) {
	this.Pd=b;
	this.Na=a;
	this.Ml=0;
	this.Dz=Ie();
	this.S=c;
	this.Pj=[];
	this.kJ()
};
m.Nb=function () {
	this.S&&xu(this.S,h);
	if(this.ia) {
		this.ia=e;
		Qt(this.g,e)
	}
};
m.dd=function () {
	if(!this.ia) {
		this.ia=i;
		Qt(this.g,i)
	}
};
m.H=function () {
	return this.ia
};
m.$v=function (a) {
	this.NF();
	this.Ml=a;
	if(a>=0&&a<this.g.childNodes.length) {
		a=this.Pj[a];
		w(a,this.ys);
		this.S&&xu(this.S,a)
	}
};
m.NF=function () {
	this.Ml>=0&&x(this.Pj[this.Ml],this.ys)
};
m.bf=function (a) {
	if(a==-1)this.$v(-1);
	else for(var b=0;b<this.Na.length;b++)if(this.Na[b].id==a) {
		this.$v(b);
		return
	}
};
m.IK=function (a) {
	w(a,this.className)
};
var XB="display:none",YB="listbox",ZB="goog-acr-",$B="combobox",aC="autocomplete",bC="list";
m.LH=function () {
	if(!this.g) {
		var a=this.j.o(C,{
			style:XB
		});
		this.g=a;
		this.IK(a);
		tu(a,YB);
		a.id=ZB+WB++;
		if(this.S) {
			tu(this.S,$B);
			vu(this.S,aC,bC);
			vu(this.S,Ov,i)
		}this.j.appendChild(this.A,a);
		U(a,T,this.wh,e,this);
		U(a,om,this.Jv,e,this);
		U(this.j.z,T,this.Ev,e,this);
		U(a,el,this.aj,e,this)
	}
};
var cC="LEFT",dC="RIGHT";
m.kJ=function () {
	this.LH();
	if(this.En)this.g.style.visibility=Q;
	this.Pj.length=0;
	this.j.ny(this.g);
	if(this.Xg&&this.Xg.nc)this.Xg.nc(this,this.g,this.Na,this.Pd);
	else {
		var a=h;
		sg(this.Na,function (g) {
			g=this.BJ(g,this.Pd);
			this.En?this.g.insertBefore(g,a):this.j.appendChild(this.g,g);
			a=g
		},this)
	}if(this.Na.length==0) {
		this.Nb();
		return
	}else this.dd();
	this.TI(this.g);
	if(this.S&&this.FJ) {
		var b=Ft(this.S),c=Jt(this.S),d=Jt(At(this.S)),f=Jt(this.g);
		b.y=this.En?b.y-f.height:b.y+c.height;
		if((this.KJ||b.x+f.width>
		d.width)&&this.rq!=cC) {
			b.x=b.x+c.width-f.width;
			this.rq=dC
		}else this.rq=cC;
		Ht(this.g,b);
		if(this.En)this.g.style.visibility=pw
	}Yt(this.g,i)
};
m.k=function () {
	VB.d.k.call(this);
	if(this.g) {
		V(this.g,T,this.wh,e,this);
		V(this.g,om,this.Jv,e,this);
		V(this.j.z,T,this.Ev,e,this);
		V(this.g,el,this.aj,e,this);
		this.j.removeNode(this.g);
		this.g=h;
		this.ia=e
	}delete this.A
};
var eC="auto";
m.TI=function (a) {
	if(Ph&&Bh) {
		a.style.width=n;
		a.style.overflow=pw;
		a.style.width=a.offsetWidth;
		a.style.overflow=eC
	}
};
m.AJ=function (a,b,c) {
	c.innerHTML=Lf(a.data.toString ())
};
var fC="(.*?)(^|\\W+)(";
m.Jp=function (a,b) {
	if(a.nodeType==3) {
		var c,d=h;
		if(ze(b)) {
			c=b.length>0?b[0]:n;
			if(b.length>1)d=df(b,1)
		}else c=b;
		if(c.length==0)return ;
		var f=a.nodeValue;
		c=jg(c);
		c=new RegExp(fC+c+ph,Le);
		b=[];
		var g=0,k=c.exec(f);
		while(k) {
			b.push(k[1]);
			b.push(k[2]);
			b.push(k[3]);
			g=c.lastIndex;
			k=c.exec(f)
		}b.push(f.substring(g));
		if(b.length>1) {
			a.nodeValue=b[0]+b[1];
			d=this.j.createElement(JA);
			this.j.appendChild(d,this.j.createTextNode(b[2]));
			d=a.parentNode.insertBefore(d,a.nextSibling);
			for(f=b.length-1;f>=3;f--)a.parentNode.insertBefore(this.j.createTextNode(b[f]),
			d.nextSibling)
		}else d&&this.Jp(a,d)
	}else {
		a=a.firstChild;
		while(a) {
			d=a.nextSibling;
			this.Jp(a,b);
			a=d
		}
	}
};
var gC="goog-acri-",hC="option";
m.BJ=function (a,b) {
	var c=this.j.o(C,{
		className:this.lr,id:gC+WB++
	});
	tu(c,hC);
	this.Xg&&this.Xg.zJ?this.Xg.zJ(a,b,c):this.AJ(a,b,c);
	b&&this.TM&&this.Jp(c,b);
	w(c,this.lr);
	this.Pj.push(c);
	return c
};
m.mv=function (a) {
	while(a&&a!=this.g&&!lf(a,this.lr))a=a.parentNode;
	return a?Oe(this.Pj,a):-1
};
m.wh=function (a) {
	var b=this.mv(a.target);
	b>=0&&this.dispatchEvent({
		type:hu,Qm:this.Na[b].id
	});
	a.stopPropagation()
};
m.Jv=function (a) {
	this.dispatchEvent(rB);
	a.stopPropagation();
	a.preventDefault()
};
m.Ev=function () {
	this.dispatchEvent(sB)
};
m.aj=function (a) {
	a=this.mv(a.target);
	if(a>=0) {
		if(Ie()-this.Dz<300)return ;
		this.dispatchEvent({
			type:qB,Qm:this.Na[a].id
		})
	}
};
function iC(a,b,c,d) {
	a=new vB(a,!d);
	d=new VB;
	c=new KB(h,h,!!c);
	tB.call(this,a,d,c);
	c.BB(this);
	c.FB(b)
}v(iC,tB);
var jC="focusout",kC="focusin";
function lC(a) {
	W.call(this);
	this.g=a;
	a=z?jC:mu;
	this.rH=U(this.g,z?kC:lu,this,!z);
	this.sH=U(this.g,a,this,!z)
}v(lC,W);
lC.prototype.handleEvent=function (a) {
	var b=new cl(a.Qa);
	b.type=a.type==kC||a.type==lu?kC:jC;
	try{
		this.dispatchEvent(b)
	}finally{
		b.n()
	}
};
lC.prototype.k=function () {
	lC.d.k.call(this);
	Cl(this.rH);
	Cl(this.sH);
	delete this.g
};
function mC(a,b,c) {
	this.target=a;
	this.wp=b||a;
	this.zq=c||new pt;
	this.z=a.ownerDocument||a.document;
	U(this.wp,om,this.ck,e,this)
}v(mC,W);
m=mC.prototype;
m.screenX=0;
m.screenY=0;
m.Fz=0;
m.Gz=0;
m.vi=0;
m.wi=0;
m.hb=i;
m.Ke=e;
m.bw=0;
m.SH=0;
m.cz=function (a) {
	this.xf=a
};
m.pb=function (a) {
	this.hb=a
};
m.k=function () {
	mC.d.k.call(this);
	V(this.wp,om,this.ck,e,this);
	V(this.z,qm,this.Kq,e,this);
	V(this.z,Aq,this.Pf,e,this);
	this.xf&&V(this.xf,Um,this.Uq,e,this);
	delete this.target;
	delete this.wp
};
m.ck=function (a) {
	if(this.hb&&!this.Ke) {
		if(this.bw==0) {
			this.mw(a);
			if(this.Ke)a.preventDefault();
			else return
		}else a.preventDefault();
		U(this.z,qm,this.Kq,e,this);
		U(this.z,Aq,this.Pf,e,this);
		this.xf&&U(this.xf,Um,this.Uq,e,this);
		this.screenX=this.Fz=a.screenX;
		this.screenY=this.Gz=a.screenY;
		this.vi=this.target.offsetLeft;
		this.wi=this.target.offsetTop;
		this.Hd=Vh(this.z).Xf();
		this.SH=Ie()
	}
};
var nC="start";
m.mw=function (a) {
	if(this.dispatchEvent(new oC(nC,this,a.clientX,a.clientY,a))!==e)this.Ke=i
};
m.Pf=function (a) {
	V(this.z,qm,this.Kq,e,this);
	V(this.z,Aq,this.Pf,e,this);
	this.xf&&V(this.xf,Um,this.Uq,e,this);
	if(this.Ke) {
		this.Ke=e;
		var b=this.bx(this.vi),c=this.cx(this.wi);
		this.dispatchEvent(new oC(FA,this,a.clientX,a.clientY,a,b,c))
	}
};
var pC="beforedrag";
m.Kq=function (a) {
	if(this.hb) {
		var b=a.screenX-this.screenX,c=a.screenY-this.screenY;
		this.screenX=a.screenX;
		this.screenY=a.screenY;
		if(!this.Ke) {
			var d=this.Fz-this.screenX,f=this.Gz-this.screenY;
			if(d*d+f*f>this.bw) {
				this.mw(a);
				if(!this.Ke) {
					this.Pf(a);
					return
				}
			}
		}c=this.Ys(b,c);
		b=c.x;
		c=c.y;
		if(this.Ke)if(this.dispatchEvent(new oC(pC,this,a.clientX,a.clientY,a,b,c))!==e) {
			this.St(a,b,c);
			a.preventDefault()
		}
	}
};
m.Ys=function (a,b) {
	var c=Vh(this.z).Xf();
	a+=c.x-this.Hd.x;
	b+=c.y-this.Hd.y;
	this.Hd=c;
	this.vi+=a;
	this.wi+=b;
	a=this.bx(this.vi);
	b=this.cx(this.wi);
	return new nh(a,b)
};
m.Uq=function (a) {
	var b=this.Ys(0,0);
	a.clientX=this.Hd.x-this.screenX;
	a.clientY=this.Hd.x-this.screenY;
	this.St(a,b.x,b.y)
};
var qC="drag";
m.St=function (a,b,c) {
	this.zC(b,c);
	this.dispatchEvent(new oC(qC,this,a.clientX,a.clientY,a,b,c))
};
m.bx=function (a) {
	var b=this.zq,c=typeofb.left!="undefined"?b.left:h;
	b=typeofb.width!="undefined"?b.width:0;
	return Math.min(c!=h?c+b:Infinity,Math.max(c!=h?c:-Infinity,a))
};
m.cx=function (a) {
	var b=this.zq,c=typeofb.top!="undefined"?b.top:h;
	b=typeofb.height!="undefined"?b.height:0;
	return Math.min(c!=h?c+b:Infinity,Math.max(c!=h?c:-Infinity,a))
};
m.zC=function (a,b) {
	this.target.style.left=a+yt;
	this.target.style.top=b+yt
};
function oC(a,b,c,d,f,g,k) {
	bl.call(this,a);
	this.type=a;
	this.clientX=c;
	this.clientY=d;
	this.$M=f;
	this.left=le(g)?g:b.vi;
	this.top=le(k)?k:b.wi;
	this.bN=b
}v(oC,bl);
var rC="modal-dialog";
function sC(a,b,c) {
	$t.call(this,c);
	this.fb=a||rC;
	this.ps=!!b;
	this.tb=tC;
	this.F=new Ll(this);
	this.Ji=new lC(this.j.z)
}v(sC,$t);
m=sC.prototype;
m.fb=h;
m.ps=e;
m.xj=i;
m.Ut=i;
m.fo=0.3;
m.q=n;
m.vb=n;
m.tb=h;
m.xb=h;
m.ia=e;
m.Rt=e;
m.qa=h;
m.ya=h;
m.Hc=h;
m.Od=h;
m.ds=h;
m.Ef=h;
m.dc=h;
m.sb=h;
m.F=h;
m.td=function () {
	return this.F
};
m.Hb=function (a) {
	this.q=a;
	this.Od&&Ai(this.Od,a)
};
m.Xc=function () {
	return this.q
};
m.Vb=function (a) {
	this.vb=a;
	if(this.dc)this.dc.innerHTML=a
};
m.Y=function () {
	this.dc||this.nc();
	return this.dc
};
m.WD=function () {
	this.U||this.nc();
	return this.e()
};
m.Wm=function (a) {
	this.fo=a;
	this.qa&&Pt(this.qa,this.fo)
};
m.Xj=function (a) {
	this.xj=a;
	this.Eq()
};
var uC="-title-draggable";
m.pC=function () {
	var a=new mC(this.e(),this.Hc);
	w(this.Hc,this.fb+uC);
	return a
};
var vC="-title",wC="-title-text",xC="-title-close",yC="-buttons",zC="dialog",AC="labelledby";
m.o=function () {
	this.Eq();
	this.Jd(this.j.o(C,{
		className:this.fb,tabIndex:0
	},this.Hc=this.j.o(C,{
		className:this.fb+vC,id:this.R()
	},this.Od=this.j.o(Vy,{
		className:this.fb+wC
	},this.q),this.Ef=this.j.o(Vy,{
		className:this.fb+xC
	})),this.dc=this.j.o(C,{
		className:this.fb+Bv
	}),this.sb=this.j.o(C,{
		className:this.fb+yC
	}),this.Pz=this.j.o(Vy,{
		tabIndex:0
	})));
	this.ds=this.Hc.id;
	tu(this.e(),zC);
	vu(this.e(),AC,this.ds);
	if(this.vb)this.dc.innerHTML=this.vb;
	Qt(this.e(),e);
	this.tb&&this.tb.bo(this.sb)
};
var BC="iframe",CC="border: 0; vertical-align: bottom",DC="-bg";
m.Eq=function () {
	if(this.ps&&this.xj&&!this.ya) {
		this.ya=this.j.o(BC,{
			frameborder:0,style:CC,src:bm
		});
		this.ya.className=this.fb+DC;
		Qt(this.ya,e);
		Pt(this.ya,0)
	}else if((!this.ps||!this.xj)&&this.ya) {
		B(this.ya);
		this.ya=h
	}if(this.xj&&!this.qa) {
		this.qa=this.j.o(C,{
			className:this.fb+DC
		});
		Pt(this.qa,this.fo);
		Qt(this.qa,e)
	}else if(!this.xj&&this.qa) {
		B(this.qa);
		this.qa=h
	}
};
m.nc=function (a) {
	if(this.U)j(Error(qu));
	this.e()||this.o();
	a=a||this.j.z.body;
	this.qy(a);
	sC.d.nc.call(this,a)
};
m.qy=function (a) {
	this.ya&&a.appendChild(this.ya);
	this.qa&&a.appendChild(this.qa)
};
m.Mb=function (a) {
	return a&&a.tagName&&a.tagName==nv&&sC.d.Mb.call(this,a)
};
m.Wd=function (a) {
	sC.d.Wd.call(this,a);
	w(this.e(),this.fb);
	var b=this.fb+Bv;
	if(this.dc=Bi(this.e(),function (k) {
		return k.nodeType==1&&lf(k,b)
	}))this.vb=this.dc.innerHTML;
	else {
		this.dc=this.j.o(C,{
			className:b
		});
		if(this.vb)this.dc.innerHTML=this.vb;
		this.e().appendChild(this.dc)
	}var c=this.fb+vC,d=this.fb+wC,f=this.fb+xC;
	if(this.Hc=Bi(this.e(),function (k) {
		return k.nodeType==1&&lf(k,c)
	})) {
		this.Od=Bi(this.Hc,function (k) {
			return k.nodeType==1&&lf(k,d)
		});
		this.Ef=Bi(this.Hc,function (k) {
			return k.nodeType==1&&
			lf(k,f)
		})
	}else {
		this.Hc=this.j.o(C,{
			className:c
		});
		this.e().insertBefore(this.Hc,this.dc)
	}if(this.Od)this.q=Ki(this.Od);
	else {
		this.Od=this.j.o(Vy,{
			className:d
		},this.q);
		this.Hc.appendChild(this.Od)
	}vu(this.e(),AC,this.ds);
	if(!this.Ef) {
		this.Ef=this.j.o(Vy,{
			className:f
		});
		this.Hc.appendChild(this.Ef)
	}var g=this.fb+yC;
	if(this.sb=Bi(this.e(),function (k) {
		return k.nodeType==1&&lf(k,g)
	})) {
		this.tb=new EC(this.j);
		this.tb.ka(this.sb)
	}else {
		this.sb=this.j.o(C,{
			className:g
		});
		this.e().appendChild(this.sb);
		this.tb&&
		this.tb.bo(this.sb)
	}this.Eq();
	this.qy(Wh(this.e()).body);
	Qt(this.e(),e)
};
m.ea=function () {
	sC.d.ea.call(this);
	if(this.Ut&&!this.xb)this.xb=this.pC();
	this.F.l(this.Ef,T,this.Px);
	this.F.l(this.Ji,kC,this.Cj);
	tu(this.e(),zC);
	this.Od.id!==n&&vu(this.e(),AC,this.Od.id)
};
m.Ra=function () {
	this.F.wa(this.Ef,T,this.Px);
	this.F.wa(this.Ji,kC,this.Cj);
	this.H()&&this.B(e);
	if(this.xb) {
		this.xb.n();
		this.xb=h
	}sC.d.Ra.call(this)
};
var FC="position:fixed;width:0;height:0",GC="afterhide";
m.B=function (a) {
	if(a==this.ia)return ;
	var b=this.j.z,c=li(b)||window;
	this.U||this.nc(b.body);
	if(a) {
		this.uy();
		this.Gb();
		this.F.l(this.e(),pm,this.Jx,i);
		this.F.l(c,Km,this.Nx,i)
	}else {
		this.F.wa(this.e(),pm,this.Jx,i);
		this.F.wa(c,Km,this.Nx,i)
	}this.ya&&Qt(this.ya,a);
	this.qa&&Qt(this.qa,a);
	Qt(this.e(),a);
	if(a) {
		Ph&&this.e().focus();
		if(this.tb) {
			if(c=this.tb.Ao) {
				var d=this.sb.getElementsByTagName(Sv);
				for(var f=0,g;g=d[f];f++)if(g.name==c) {
					try{
						if(Qh||Oh) {
							var k=b.createElement(Xm);
							k.style.cssText=FC;
							this.e().appendChild(k);
							k.focus();
							this.e().removeChild(k)
						}g.focus()
					}catch(l) {
					}break
				}
			}
		}
	}if(this.ia=a)this.F.l(this.sb,T,this.Ex);
	else {
		this.F.wa(this.sb,T,this.Ex);
		this.dispatchEvent(GC);
		this.Rt&&this.n()
	}
};
m.H=function () {
	return this.ia
};
m.uy=function () {
	this.ya&&Qt(this.ya,e);
	this.qa&&Qt(this.qa,e);
	var a=this.j.z,b=li(a)||window,c=ki(b);
	b=a.body.scrollWidth;
	a=Math.max(a.body.scrollHeight,c.height);
	if(this.ya) {
		Qt(this.ya,i);
		It(this.ya,b,a)
	}if(this.qa) {
		Qt(this.qa,i);
		It(this.qa,b,a)
	}if(this.Ut) {
		c=Jt(this.e());
		this.xb.zq=new pt(0,0,b-c.width,a-c.height)
	}
};
m.Gb=function () {
	var a=li(this.j.z)||window;
	if(xt(this.e())==Ko) {
		var b=0,c=0
	}else {
		c=this.j.Xf();
		var b=c.x,c=c.y
	}var d=Jt(this.e());
	a=ki(a);
	b=Math.max(b+a.width/2-d.width/2,0);
	c=Math.max(c+a.height/2-d.height/2,0);
	zt(this.e(),b,c)
};
m.Px=function () {
	var a=this.tb,b=a&&a.lo;
	if(b) {
		a=a.N(b);
		this.dispatchEvent(new HC(b,a))&&this.B(e)
	}else this.B(e)
};
m.sK=function (a) {
	this.Rt=a
};
m.k=function () {
	sC.d.k.call(this);
	if(this.F) {
		this.F.n();
		this.F=h
	}if(this.Ji) {
		this.Ji.n();
		this.Ji=h
	}if(this.qa) {
		B(this.qa);
		this.qa=h
	}if(this.ya) {
		B(this.ya);
		this.ya=h
	}this.sb=this.Ef=h;
	this.Pz=h
};
m.Id=function (a) {
	this.tb=a;
	this.sb&&this.tb.bo(this.sb)
};
m.Ex=function (a) {
	if(a=this.vD(a.target)) {
		a=a.name;
		var b=this.tb.N(a);
		this.dispatchEvent(new HC(a,b))&&this.B(e)
	}
};
m.vD=function (a) {
	a=a;
	while(a!=h&&a!=this.sb) {
		if(a.tagName==Vv)return a;
		a=a.parentNode
	}return h
};
m.Jx=function (a) {
	var b=this.tb;
	if(a.keyCode==27) {
		var c=b&&b.lo;
		if(c) {
			b=b.N(c);
			this.dispatchEvent(new HC(c,b))&&this.B(e)
		}else this.B(e);
		a.stopPropagation()
	}else if(a.keyCode==13) {
		if((c=a.target&&a.target.tagName==Vv?a.target.name:b&&b.Ao)&&this.dispatchEvent(new HC(c,String(b.N(c))))) {
			this.B(e);
			a.preventDefault()
		}a.stopPropagation()
	}else if(a.keyCode==9&&a.shiftKey&&a.target==this.e()) {
		a.preventDefault();
		a.stopPropagation()
	}
};
m.Nx=function () {
	this.uy()
};
m.Cj=function (a) {
	this.Pz==a.target&&Wl(this.AD,0,this)
};
m.AD=function () {
	z&&this.j.z.body.focus();
	this.e().focus()
};
var IC="dialogselect";
function HC(a,b) {
	this.type=IC;
	this.Ea=a;
	this.caption=b
}v(HC,bl);
var tC;
function EC(a) {
	this.j=a||Vh();
	Pg.call(this)
}v(EC,Pg);
m=EC.prototype;
m.Ao=h;
m.g=h;
m.lo=h;
m.set=function (a,b,c,d) {
	Pg.prototype.set.call(this,a,b);
	if(c)this.Ao=a;
	if(d)this.lo=a;
	return this
};
m.bo=function (a) {
	this.g=a;
	this.nc()
};
m.nc=function () {
	if(this.g) {
		this.g.innerHTML=n;
		var a=Vh(this.g);
		Ng(this,function (b,c) {
			this.g.appendChild(a.o(Sv,{
				name:c
			},b))
		},this)
	}
};
var JC="cancel";
m.ka=function (a) {
	if(!a||a.nodeType!=1)return ;
	this.g=a;
	a=this.g.getElementsByTagName(Sv);
	for(var b=0,c,d,f;c=a[b];b++) {
		d=c.name||c.id;
		f=Ki(c)||c.value;
		d&&this.set(d,f,b==0,c.name==JC)
	}
};
m.RD=function (a) {
	var b=this.LD();
	for(var c=0,d;d=b[c];c++)if(d.name==a||d.id==a)return d;return h
};m.LD=function () {
	return this.g.getElementsByTagName(Vv)
};
var KC="OK",LC="Cancel",MC="Yes",NC="No",OC="Save",PC="Continue",QC="ok";
(function () {
	var a=u(KC),b=u(LC);
	u(MC);
	u(NC);
	u(OC);
	u(PC);
	tC=(new EC).set(QC,a,i).set(JC,b,e,i)
})();
function RC(a) {
	SC(bk(Ya+a.streamId))
}var TC="clipcreator";
function SC(a) {
	bz(a,{
		target:TC,width:780,height:460,scrollbars:i
	})
}
function UC(a,b,c) {
	if(!b.offsetHeight)return ;
	var d=Kt(a),f=d.top,g=f+d.height,k=Kt(b),l=k.top,p=l+k.height,s=0;
	for(b=b;b&&b!=a;b=b.offsetParent)s+=b.offsetTop;if(c==1)a.scrollTop=k.height<=d.height?s-(d.height-k.height)/2:s;else if(f>l||p>g||c)a.scrollTop=c==2||!c&&(f>l||k.height>d.height)?s:s+k.height-d.height
}var VC="ileft",WC="td",XC="ileft-table",YC="table";
function ZC(a,b) {
	a=$C({
		id:a,content:b
	});
	document.body.appendChild(a);
	b=M(a,VC,WC);
	var c=M(a,XC,YC);
	if(b.offsetHeight)c.style.height=b.offsetHeight+yt;
	return a
}function aD(a,b,c) {
	var d=Jt(a).height;
	c=c-d/2;
	if(c<0)c=0;
	else {
		var f=ki(window).height;
		if(c+d>f)c=f-d
	}zt(a,b,c)
}var bD=" fr-modal-dialog";
function cD(a,b) {
	sC.call(this,(a||n)+bD,b,window.top!=window?new Uh(window.top.document):undefined);
	this.sK(i)
}v(cD,sC);
cD.prototype.B=function (a) {
	cD.d.B.call(this,a);
	dD(!a)
};
var eD="hide-embeds";
function dD(a) {
	y(document.body,eD,!a)
}function fD(a) {
	if(_USER_ID==h)return h;
	var b=[];
	a=new iC(b,a,i);
	Kp.ag(function (c) {
		for(var d=0,f;f=c[d];d++)b.push(f.getName())
	});return a
}function gD(a) {
	a=new Date(a/1000);
	var b=Dj(a);
	return b?O(Hj,[vj(a,i),b]):vj(a,e)
}var hD="goog-button-body";
function iD(a) {
	return M(a,hD)
}function mB(a) {
	a=jf(a);
	return Ve(a,Tv)||Ve(a,hD)
}function jD(a,b) {
	iD(a).innerHTML=b
}var kD="goog-button-base-disabled";
function lD(a,b) {
	y(a,kD,b)
}var mD="goog-button-base-open";
function cx(a,b) {
	y(a,mD,b)
}function nD(a) {
	return lf(a,mD)
}var oD="http://www.google.com/support/reader/bin/answer.py",pD="answer",qD="http://www.google.com/intl/",rD="/googlereader/";
function sD(a) {
	if(_LOCALE_HAS_HELP_CENTER) {
		var b=new Sg(oD);
		b.cb($j,_DISPLAY_LOCALE);
		b.cb(pD,a.Bk);
		return b.toString ()
	}else return qD+_DISPLAY_LOCALE+rD+a.dl
}var tD="fr-confirm-dialog";
function Tr(a,b,c) {
	var d=new cD(tD);
	d.Wm(0.5);
	d.Xj(i);
	d.Id(tC);
	d.Vb(Lf(a));
	U(d,IC,function (f) {
		if(f.Ea==QC)b();
		else c&&c()
	});
	d.B(i)
}
function uD(a,b,c,d,f,g) {
	g=g>0?Ie()+g:0;
	return vD(a,b,c,d,f||[],g,0)
}var wD=["SCRIPT","STYLE",cB],xD="SPAN";
function vD(a,b,c,d,f,g,k) {
	if(g>0&&Ie()>=g||k>200)return e;
	var l=e;
	if(a.nodeType==3) {
		b=yD(a.nodeValue,b,c,d);
		if(b!=h) {
			l=Wh(a).createElement(xD);
			l.innerHTML=b;
			b=a.parentNode;
			while((c=l.firstChild)!=h)b.insertBefore(c,a);
			b.removeChild(a);
			l=i
		}
	}else if(a.hasChildNodes()&&!Ve(wD,a.tagName)) {
		var p=a.className.split(o);
		if(!Te(p,function (s) {
			return Ve(f,s)
		})) {
			++k;
			p=a.firstChild;
			while(p) {
				a=p.nextSibling;
				p=vD(p,b,c,d,f,g,k);
				l=l||p;
				p=a
			}
		}
	}return l
}var zD=/\W/;
function yD(a,b,c,d) {
	var f=e,g=d?a.toLowerCase():a,k=g.length;
	d=b.length;
	var l=new Array(d);
	for(var p=0;p<d;p++) {
		var s=b[p],A=[],I=s[0];
		if(I!=n) {
			var L=s[1];
			s=I.length;
			var K=0;
			while(K<k) {
				var G=g.indexOf(I,K);
				if(G==-1)break;
				else {
					K=G-1;
					var Jb=G+s;
					if(!L||(K<0||zD.test(g.charAt(K)))&&(Jb>=k||zD.test(g.charAt(Jb)))) {
						A.push(G);
						f=i
					}K=G+s
				}
			}
		}l[p]=A
	}if(f) {
		f=[];
		var K=0;
		while(i) {
			var Kb;
			g=-1;
			for(var p=0;p<d;p++) {
				var A=l[p];
				if(!(A.length==0)) {
					var G=A[0];
					while(G>=0&&G<K) {
						A.shift();
						G=A.length==0?-1:A[0]
					}if(G>=0&&
					(g<0||G<g)) {
						Kb=p;
						g=G
					}
				}
			}if(g<0)break;
			l[Kb].shift();
			f.push(Lf(a.substr(K,g-K)));
			s=b[Kb][0].length;
			p=Lf(a.substr(g,s));
			f.push(c(Kb,p));
			K=g+s
		}f.push(Lf(a.substr(K)));
		return f.join(n)
	}else return h
}function AD(a) {
	W.call(this);
	this.eb=a||window;
	this.qm=U(this.eb,Km,this.gF,e,this);
	this.un=ki(this.eb);
	if(this.NG())this.Jn=window.setInterval(r(this.et,this),500)
}v(AD,W);
m=AD.prototype;
m.qm=h;
m.eb=h;
m.un=h;
m.Jn=h;
m.NG=function () {
	return Qh&&Ch||Oh&&this.eb.self!=this.eb.top
};
m.k=function () {
	AD.d.k.call(this);
	if(this.qm) {
		Cl(this.qm);
		this.qm=h
	}if(this.Jn) {
		window.clearInterval(this.Jn);
		this.Jn=h
	}this.un=this.eb=h
};
m.gF=function () {
	this.et()
};
m.et=function () {
	var a=ki(this.eb);
	if(!rh(a,this.un)) {
		this.un=a;
		this.dispatchEvent(Km)
	}
};
var BD="google.gears.factory",CD="GearsFactory",DD="Gears.Factory",ED="ie_mobile",FD="window",GD="application/x-googlegears",HD="gears-factory";
function ID() {
	if(JD!=undefined)return JD;
	var a=me(BD);
	if(a)return JD=a;
	try{
		var b=me(CD);
		return JD=new b
	}catch(c) {
	}try{
		var a=new ActiveXObject(DD);
		a.getBuildInfo().indexOf(ED)!=-1&&a.privateSetGlobalObject(he);
		return JD=a
	}catch(c) {
	}if((b=me(FD))&&b.navigator.mimeTypes[GD])try{
		var d=b.document,a=d.getElementById(HD);
		if(!a) {
			a=d.createElement(pe);
			a.style.display=hb;
			a.width=ca;
			a.height=ca;
			a.type=GD;
			a.id=HD;
			d.documentElement.appendChild(a)
		}return JD=a
	}catch(c) {
	}return JD=h
}var JD=undefined;
function KD() {
	this.$a=[];
	this.Rz=[];
	this.Rj=[]
}v(KD,W);
m=KD.prototype;
m.gq=e;
m.nq=e;
m.Ig=h;
m.Mn=h;
m.Tt=h;
m.vn=h;
m.zn=h;
m.Rp=e;
m.ba=function () {
	j(Error("Call to pure virtual method"))
};
m.qB=function (a) {
	this.Rz.push(a);
	this.gq=a.nq=i
};
m.cz=function (a) {
	this.xf=a
};
m.C=function () {
	if(this.Rp)return ;
	for(var a,b=0;a=this.$a[b];b++)this.iw(a);this.Rp=i
};m.iw=function (a) {
	if(this.gq) {
		U(a.X,om,a.wx,e,a);
		this.vn&&w(a.X,this.vn)
	}this.nq&&this.zn&&w(a.X,this.zn)
};
m.rJ=function () {
	for(var a,b=0;a=this.$a[b];b++) {
		if(this.gq) {
			V(a.X,om,a.wx,e,a);
			this.vn&&x(a.X,this.vn)
		}this.nq&&this.zn&&x(a.X,this.zn)
	}this.$a.length=0
};
var LD="dragstart";
m.ck=function (a,b) {
	if(this.Tc)return ;
	this.Tc=b;
	var c=new MD(LD,this,this.Tc);
	if(this.dispatchEvent(c)==e) {
		c.n();
		this.Tc=h;
		return
	}c.n();
	b=b.ti;
	this.zi=this.oC(b);
	Wh(b).body.appendChild(this.zi);
	this.xb=this.qC(b,this.zi,a);
	this.xb.cz(this.xf);
	U(this.xb,qC,this.xx,e,this);
	U(this.xb,FA,this.Pf,e,this);
	this.hJ();
	this.Be=h;
	this.jG();
	this.xb.ck(a);
	a.preventDefault()
};
m.hJ=function () {
	this.fk=[];
	for(var a,b=0;a=this.Rz[b];b++)for(var c,d=0;c=a.$a[d];d++)this.dB(a,c);if(!this.Df)this.Df=new jt(0,0,0,0)
};
m.qC=function (a,b,c) {
	a=this.XD(a,b,c);
	b.style.position=Jo;
	b.style.left=a.x+yt;
	b.style.top=a.y+yt;
	return new mC(b)
};
var ND="drop",OD="dragend";
m.Pf=function (a) {
	var b=this.Be;
	if(b&&b.S) {
		var c=a.clientX;
		a=a.clientY;
		var d=this.ev(),f=c+d.x;
		d=a+d.y;
		var g;
		if(this.Ig)g=this.Ig(b.Cd,b.da,f,d);
		var k=new MD(qC,this,this.Tc,b.S,b.Cd,b.g,c,a,f,d);
		this.dispatchEvent(k);
		k.n();
		c=new MD(ND,this,this.Tc,b.S,b.Cd,b.g,c,a,f,d,g);
		b.S.dispatchEvent(c);
		c.n()
	}b=new MD(OD,this,this.Tc);
	this.dispatchEvent(b);
	b.n();
	V(this.xb,qC,this.xx,e,this);
	V(this.xb,FA,this.Pf,e,this);
	this.uB(this.Be?this.Be.Cd:h)
};
m.uB=function () {
	this.KC()
};
m.KC=function () {
	this.LC();
	this.xb.n();
	B(this.zi);
	delete this.Tc;
	delete this.zi;
	delete this.xb;
	delete this.fk;
	delete this.Be
};
var PD="dragout",QD="dragover";
m.xx=function (a) {
	var b=a.clientX,c=a.clientY,d=this.ev();
	b+=d.x;
	c+=d.y;
	d=this.Be;
	var f;
	if(d) {
		if(this.Ig)f=this.Ig(d.Cd,d.da,b,c);
		if(this.am(b,c,d.da)&&f==this.Mn)return ;
		if(d.S) {
			var g=new MD(PD,this,this.Tc,d.S,d.Cd,d.g);
			this.dispatchEvent(g);
			g.n();
			g=new MD(PD,this,this.Tc,d.S,d.Cd,d.g,undefined,undefined,undefined,undefined,this.Mn);
			d.S.dispatchEvent(g);
			g.n()
		}this.Mn=f;
		this.Be=h
	}if(!this.am(b,c,this.Df))return ;
	if((d=this.Be=this.LE(b,c))&&d.S) {
		if(this.Ig)f=this.Ig(d.Cd,d.da,b,c);
		g=new MD(QD,this,
		this.Tc,d.S,d.Cd,d.g);
		g.xe=f;
		this.dispatchEvent(g);
		g.n();
		a=new MD(QD,this,this.Tc,d.S,d.Cd,d.g,a.clientX,a.clientY,undefined,undefined,f);
		d.S.dispatchEvent(a);
		a.n()
	}d||this.sC(b,c)
};
m.jG=function () {
	var a,b,c,d;
	for(b=0;a=this.Rj[b];b++) {
		U(a.g,Um,this.ot,e,this);
		a.Nk=[];
		a.nr=a.g.scrollLeft;
		a.or=a.g.scrollTop;
		c=Ft(a.g);
		d=Jt(a.g);
		a.da=new jt(c.y,c.x+d.width,c.y+d.height,c.x)
	}for(b=0;d=this.fk[b];b++)for(c=0;a=this.Rj[c];c++)if(xi(a.g,d.g)) {
		a.Nk.push(d);
		d.sr=a
	}
};
m.LC=function () {
	for(var a=0,b;b=this.Rj[a];a++) {
		V(b.g,Um,this.ot,e,this);
		b.Nk=[]
	}
};
m.oB=function (a) {
	this.Rj.push(new RD(a))
};
m.ot=function (a) {
	for(var b=0,c;c=this.Rj[b];b++)if(a.target==c.g) {
		var d=c.or-c.g.scrollTop,f=c.nr-c.g.scrollLeft;
		c.or=c.g.scrollTop;
		c.nr=c.g.scrollLeft;
		for(var g=0,k;k=c.Nk[g];g++) {
			k.da.top+=d;
			k.da.left+=f;
			k.da.bottom+=d;
			k.da.right+=f
		}
	}
};
m.ZK=function (a) {
	this.Ig=a
};
m.oC=function (a) {
	a=this.dC(a);
	this.Tt&&w(a,this.Tt);
	return a
};
var SD="marginLeft",TD="marginTop";
m.XD=function (a) {
	var b=Ft(a);
	b.x+=(parseInt(vt(a,SD),10)||0)*2;
	b.y+=(parseInt(vt(a,TD),10)||0)*2;
	return b
};
var UD="tr",VD="tbody",WD="th";
m.dC=function (a) {
	var b=a.cloneNode(i);
	switch(a.tagName.toLowerCase()) {
		case UD:return mi(YC,h,mi(VD,h,b));
		case WC:case WD:return mi(YC,h,mi(VD,h,mi(UD,h,b)));
		default:return b
	}
};
m.dB=function (a,b) {
	var c=b.YD(),d=this.fk;
	for(var f=0;f<c.length;f++) {
		var g=c[f],k=Ft(g),l=Jt(g);
		k=new jt(k.y,k.x+l.width,k.y+l.height,k.x);
		d.push(new XD(k,a,b,g));
		if(d.length==1)this.Df=new jt(k.top,k.right,k.bottom,k.left);
		else {
			g=this.Df;
			g.left=Math.min(k.left,g.left);
			g.right=Math.max(k.right,g.right);
			g.top=Math.min(k.top,g.top);
			g.bottom=Math.max(k.bottom,g.bottom)
		}
	}
};
m.sC=function (a,b) {
	var c=new jt(this.Df.top,this.Df.right,this.Df.bottom,this.Df.left);
	for(var d,f=0;d=this.fk[f];f++) {
		if(d.da.right<=a&&d.da.right>c.left)c.left=d.da.right;
		if(d.da.left>=a&&d.da.left<c.right)c.right=d.da.left;
		if(d.da.bottom<=b&&d.da.bottom>c.top)c.top=d.da.bottom;
		if(d.da.top>=b&&d.da.top<c.bottom)c.bottom=d.da.top
	}this.Be=new XD(c)
};
m.LE=function (a,b) {
	for(var c,d=0;c=this.fk[d];d++)if(this.am(a,b,c.da))if(c.sr) {
		if(this.am(a,b,c.sr.da))return c
	}else return c;
	return h
};
m.am=function (a,b,c) {
	return a>=c.left&&a<c.right&&b>=c.top&&b<c.bottom
};
m.ev=function () {
	return Vh(this.zi).Xf()
};
m.k=function () {
	KD.d.k.call(this);
	this.rJ()
};
function MD(a,b,c,d,f,g,k,l,p,s,A) {
	bl.call(this,a);
	this.NC=b;
	this.Pa=c;
	this.PC=d;
	this.gb=f;
	this.QC=g;
	this.clientX=k;
	this.clientY=l;
	this.ON=p;
	this.PN=s;
	this.xe=A
}v(MD,bl);
MD.prototype.k=function () {
	MD.d.k.call(this);
	delete this.NC;
	delete this.Pa;
	delete this.PC;
	delete this.gb;
	delete this.QC
};
function YD(a,b) {
	this.X=Xh(a);
	this.data=b;
	this.A=h;
	if(!this.X)j(Error("Invalid argument"))
}v(YD,W);
m=YD.prototype;
m.ti=h;
m.Nu=function (a) {
	return a
};
m.YD=function () {
	return [this.X]
};
m.wx=function (a) {
	var b=this.Nu(a.target);
	b&&this.OH(a,b)
};
m.OH=function (a,b) {
	U(b,qm,this.Ph,e,this);
	U(b,fl,this.Ph,e,this);
	U(b,Aq,this.Lq,e,this);
	this.ti=b;
	this.Ur=new nh(a.clientX,a.clientY);
	a.preventDefault()
};
m.Ph=function (a) {
	if(Math.abs(a.clientX-this.Ur.x)+Math.abs(a.clientY-this.Ur.y)>5) {
		var b=this.ti;
		V(b,qm,this.Ph,e,this);
		V(b,fl,this.Ph,e,this);
		V(b,Aq,this.Lq,e,this);
		this.A.ck(a,this)
	}
};
m.Lq=function () {
	var a=this.ti;
	V(a,qm,this.Ph,e,this);
	V(a,fl,this.Ph,e,this);
	V(a,Aq,this.Lq,e,this);
	delete this.Ur;
	this.ti=h
};
function XD(a,b,c,d) {
	this.da=a;
	this.S=b;
	this.Cd=c;
	this.g=d
}XD.prototype.sr=h;
function RD(a) {
	this.Nk=[];
	this.g=a;
	this.or=this.nr=0;
	this.da=h
}function ZD() {
	KD.call(this)
}v(ZD,KD);
ZD.prototype.ba=function (a,b) {
	this.Cs(new YD(a,b))
};
ZD.prototype.Cs=function (a) {
	a.A=this;
	this.$a.push(a);
	this.Rp&&this.iw(a)
};
function $D(a,b) {
	$k.call(this);
	this.D=a;
	this.Qj=new Tl(50);
	this.F=new Ll(this);
	this.pr=new nh;
	this.By=this.RB(a,b);
	this.mn()
}v($D,$k);
m=$D.prototype;
m.RB=function (a,b) {
	a=Kt(a);
	if(b) {
		var c=a.height*0.25;
		b=b>c?c:b;
		a.top+=b;
		a.height-=2*b
	}return a
};
m.mn=function () {
	this.F.l(Wh(this.D),qm,this.vI);
	this.F.l(this.Qj,Vl,this.Rh)
};
m.Rh=function () {
	this.D.scrollTop+=this.pr.y
};
m.vI=function (a) {
	this.pr.y=this.SB(a.clientY,this.By.top,this.By.height);
	if(this.pr.y==0)this.Qj.stop();
	else this.Qj.enabled||this.Qj.start()
};
m.SB=function (a,b,c) {
	var d=0;
	if(a<b)d=-8;
	else if(a>b+c)d=8;
	return d
};
m.k=function () {
	$D.d.k.call(this);
	this.F.n();
	this.Qj.n()
};
function aE(a) {
	return 1-Math.pow(1-a,3)
}
function bE(a,b,c,d) {
	W.call(this);
	if(!ze(a)||!ze(b))j(Error("Start and end parameters must be arrays"));
	if(a.length!=b.length)j(Error("Start and end points must be the same length"));
	this.dk=a;
	this.XC=b;
	this.Ho=c;
	this.xs=d;
	this.Lf=[]
}v(bE,W);
var cE={
},dE=h;
function eE() {
	Ul.clearTimeout(dE);
	var a=Ie();
	for(var b in cE)cE[b].Bt(a);dE=zg(cE)?h:Ul.setTimeout(eE,20)
}function fE(a) {
	var b=Ge(a);
	b in cE||(cE[b]=a);
	dE||(dE=Ul.setTimeout(eE,20))
}
function gE(a) {
	a=Ge(a);
	delete cE[a];
	if(dE&&zg(cE)) {
		Ul.clearTimeout(dE);
		dE=h
	}
}m=bE.prototype;
m.db=0;
m.yu=0;
m.Fb=0;
m.ve=h;
m.bu=h;
m.uq=h;
var hE="begin",iE="play",jE="resume";
m.MI=function (a) {
	if(a||this.db==0) {
		this.Fb=0;
		this.Lf=this.dk
	}else if(this.db==1)return e;
	gE(this);
	this.ve=Ie();
	if(this.db==-1)this.ve-=this.Ho*this.Fb;
	this.bu=this.ve+this.Ho;
	this.uq=this.ve;
	this.Fb||this.Yd(hE);
	this.Yd(iE);
	this.db==-1&&this.Yd(jE);
	this.db=1;
	fE(this);
	this.Bt(this.ve);
	return i
};
var kE="stop";
m.stop=function (a) {
	gE(this);
	this.db=0;
	if(a)this.Fb=1;
	this.ms(this.Fb);
	this.Yd(kE);
	this.Yd(FA)
};
var lE="destroy";
m.k=function () {
	this.db!=0&&this.stop();
	this.Yd(lE);
	bE.d.k.call(this)
};
var mE="finish",nE="animate";
m.Bt=function (a) {
	this.Fb=(a-this.ve)/(this.bu-this.ve);
	if(this.Fb>=1)this.Fb=1;
	this.yu=1000/(a-this.uq);
	this.uq=a;
	De(this.xs)?this.ms(this.xs(this.Fb)):this.ms(this.Fb);
	if(this.Fb==1) {
		this.db=0;
		gE(this);
		this.Yd(mE);
		this.Yd(FA)
	}else this.db==1&&this.Yd(nE)
};
m.ms=function (a) {
	this.Lf=new Array(this.dk.length);
	for(var b=0;b<this.dk.length;b++)this.Lf[b]=(this.XC[b]-this.dk[b])*a+this.dk[b]
};m.Yd=function (a) {
	this.dispatchEvent(new oE(a,this))
};
function oE(a,b) {
	bl.call(this,a);
	this.coords=b.Lf;
	this.x=b.Lf[0];
	this.y=b.Lf[1];
	this.QN=b.Lf[2];
	this.cN=b.Ho;
	this.xN=b.Fb;
	this.gN=b.yu;
	this.oc=b.db;
	this.ZM=b
}v(oE,bl);
function pE(a,b,c) {
	W.call(this);
	this.Le=Xh(a);
	this.Zg=Xh(b);
	this.ae=c==i;
	this.Le.tabIndex=0;
	U(this.Le,T,this.oI,e,this);
	U(this.Le,pm,this.pI,e,this);
	this.Eg(this.ae)
}v(pE,W);
m=pE.prototype;
m.k=function () {
	El(this.Le);
	pE.d.k.call(this)
};
m.expand=function () {
	this.Eg(i)
};
m.collapse=function () {
	this.Eg(e)
};
m.Ga=function () {
	this.Eg(!this.ae)
};
var qE="toggle";
m.Eg=function (a) {
	this.Zg.style.display=a?n:hb;
	this.ns(a);
	this.ae=a;
	this.dispatchEvent(new rE(qE,this,this.ae))
};
m.Zl=function () {
	return this.ae
};
var sE="goog-zippy-collapsed",tE="goog-zippy-expanded";
m.ns=function (a) {
	if(a) {
		x(this.Le,sE);
		w(this.Le,tE)
	}else {
		x(this.Le,tE);
		w(this.Le,sE)
	}
};
m.pI=function (a) {
	if(a.keyCode==13||a.keyCode==32) {
		this.Ga();
		a.preventDefault();
		a.stopPropagation()
	}
};
m.oI=function () {
	this.Ga()
};
function rE(a,b,c) {
	bl.call(this,a,b);
	this.fN=c
}v(rE,bl);
var uE="overflow:hidden";
function vE(a,b,c) {
	var d=mi(C,{
		style:uE
	});
	b=Xh(b);
	b.parentNode.replaceChild(d,b);
	d.appendChild(b);
	this.Xk=d;
	this.ld=h;
	pE.call(this,a,b,c);
	a=this.ae;
	this.Xk.style.display=a?n:hb;
	this.ns(a)
}v(vE,pE);
m=vE.prototype;
m.Ns=500;
m.Ms=aE;
m.Eg=function (a) {
	if(this.ae==a&&!this.ld)return ;
	if(this.Xk.style.display==hb)this.Xk.style.display=n;
	var b=this.Zg.offsetHeight,c=0;
	if(this.ld) {
		a=this.ae;
		El(this.ld);
		this.ld.stop();
		c=b-Math.abs(parseInt(this.Zg.style.marginTop,10))
	}else c=a?0:b;
	this.ns(a);
	this.ld=new bE([0,c],[0,a?b:0],this.Ns,this.Ms);
	U(this.ld,[hE,nE,FA],this.dI,e,this);
	U(this.ld,FA,r(this.eI,this,a));
	this.ld.MI(e)
};
m.dI=function (a) {
	this.Zg.style.marginTop=0-(this.Zg.offsetHeight-a.y)+yt
};
m.eI=function (a) {
	if(a)this.Zg.style.marginTop=ca;
	El(this.ld);
	this.ae=a;
	this.ld=h;
	if(!a)this.Xk.style.display=hb;
	this.dispatchEvent(new rE(qE,this,a))
};
var wE="Message: ",xE='\nUrl: <a href="view-source:',yE='" target="_new">',zE="</a>\nLine: ",AE="\n\nBrowser stack:\n",BE="-> ",CE="[end]\n\nJS stack traversal:\n",DE="Exception trying to expose exception! You win, we lose. ";
function EE(a,b) {
	try{
		var c=FE(a);
		return wE+Lf(c.message)+xE+c.Vo+yE+c.Vo+zE+c.lineNumber+AE+Lf(c.stack+BE)+CE+Lf(GE(b)+BE)
	}catch(d) {
		return DE+d
	}
}var HE="window.location.href",IE="Unknown error",JE="Not available";
function FE(a) {
	var b=me(HE);
	return typeofa==Be?{
		message:a,name:IE,lineNumber:JE,fileName:b,stack:JE
	}:!a.lineNumber||!a.Vo||!a.stack?{
		message:a.message,name:a.name,lineNumber:a.lineNumber||a.line||JE,fileName:a.Vo||a.sourceURL||b,stack:a.stack||JE
	}:a
}
function GE(a) {
	return KE(a||arguments.callee.caller,[])
}var LE="[...circular reference...]",ME="[fn]",NE=")\n",OE="[exception trying to get caller]\n",PE="[...long stack...]",QE="[end]";
function KE(a,b) {
	var c=[];
	if(Ve(b,a))c.push(LE);
	else if(a&&b.length<50) {
		c.push(RE(a)+oh);
		var d=a.arguments;
		for(var f=0;f<d.length;f++) {
			f>0&&c.push(fa);
			var g;
			g=d[f];
			switch(typeofg) {
				case pe:g=g?pe:ue;
				break;
				case Be:g=g;
				break;
				case qe:g=String(g);
				break;
				case bq:g=g?q:Xb;
				break;
				case te:g=(g=RE(g))?g:ME;
				break;
				case "undefined":default:g=typeofg;
				break
			}if(g.length>40)g=g.substr(0,40)+ag;
			c.push(g)
		}b.push(a);
		c.push(NE);
		try{
			c.push(KE(a.caller,b))
		}catch(k) {
			c.push(OE)
		}
	}else a?c.push(PE):c.push(QE);
	return c.join(n)
}
var SE="[Anonymous]";
function RE(a) {
	a=String(a);
	if(!TE[a]) {
		var b=/function ([^\(]+)/.exec(a);
		TE[a]=b?b[1]:SE
	}return TE[a]
}var TE={
};
function UE(a,b,c,d,f) {
	this.BN=typeoff==qe?f:VE++;
	this.KN=d||Ie();
	this.Lh=a;
	this.WH=b;
	this.tN=c
}UE.prototype.eD=h;
UE.prototype.dD=h;
var VE=0;
UE.prototype.wK=function (a) {
	this.eD=a
};
UE.prototype.xK=function (a) {
	this.dD=a
};
UE.prototype.Yy=function (a) {
	this.Lh=a
};
UE.prototype.rh=function () {
	return this.WH
};
function WE(a) {
	this.r=a;
	this.A=h;
	this.T={
	};
	this.Nv=[]
}
WE.prototype.Lh=h;
function XE(a,b) {
	this.name=a;
	this.value=b
}XE.prototype.toString =function () {
	return this.name
};
new XE("OFF",Infinity);
new XE("SHOUT",1200);
new XE("SEVERE",1000);
new XE("WARNING",900);
var YE=new XE("INFO",800),ZE=new XE("CONFIG",700),$E=new XE("FINE",500);
new XE("FINER",400);
new XE("FINEST",300);
new XE("ALL",0);
m=WE.prototype;
m.getName=function () {
	return this.r
};
m.Vc=function () {
	return this.T
};
m.Yy=function (a) {
	this.Lh=a
};
m.dq=function (a) {
	if(this.Lh)return a.value>=this.Lh.value;
	if(this.A)return this.A.dq(a);
	return e
};
m.log=function (a,b,c) {
	this.dq(a)&&this.BH(this.lE(a,b,c))
};
m.lE=function (a,b,c) {
	var d=new UE(a,String(b),this.r);
	if(c) {
		d.wK(c);
		d.xK(EE(c,arguments.callee.caller))
	}return d
};
m.gg=function (a,b) {
	this.log(YE,a,b)
};
m.ce=function (a,b) {
	this.log($E,a,b)
};
m.BH=function (a) {
	if(this.dq(a.Lh)) {
		var b=this;
		while(b) {
			b.TB(a);
			b=b.A
		}
	}
};
m.TB=function (a) {
	for(var b=0;b<this.Nv.length;b++)this.Nv[b](a)
};
m.NK=function (a) {
	this.A=a
};
m.$A=function (a,b) {
	this.T[a]=b
};
var aF={
},bF=h;
function cF() {
	if(!bF) {
		bF=new WE(n);
		aF[n]=bF;
		bF.Yy(ZE)
	}
}function dF(a) {
	cF();
	return a in aF?aF[a]:eF(a)
}function eF(a) {
	var b=new WE(a),c=a.split(ie),d=c[c.length-1];
	c.length=c.length-1;
	c=c.join(ie);
	c=dF(c);
	c.$A(d,b);
	b.NK(c);
	return aF[a]=b
}var fF="propertychange";
function gF(a) {
	W.call(this);
	this.g=a;
	this.nf=U(this.g,z?fF:Qh&&a.tagName==cB?gl:Xm,this)
}v(gF,W);
gF.prototype.handleEvent=function (a) {
	a=a.Qa;
	if(a.type==fF&&a.propertyName==Sy||a.type==Xm||a.type==gl) {
		if(z) {
			var b=a.srcElement;
			if(b!=Wh(b).activeElement)return
		}a=new cl(a);
		a.type=Xm;
		try{
			this.dispatchEvent(a)
		}finally{
			a.n()
		}
	}
};
gF.prototype.k=function () {
	gF.d.k.call(this);
	Cl(this.nf);
	delete this.g
};
function hF(a,b) {
	$t.call(this,b);
	this.ab=a||n
}v(hF,$t);
m=hF.prototype;
m.qd=h;
m.o=function () {
	this.Jd(this.j.o(Xm,{
		type:fB
	}))
};
m.Wd=function (a) {
	hF.d.Wd.call(this,a);
	if(!this.ab)this.ab=a.getAttribute(mb)||n
};
m.ea=function () {
	hF.d.ea.call(this);
	this.ao();
	this.Ik();
	this.e().Sb=this
};
m.Ra=function () {
	hF.d.Ra.call(this);
	this.xi();
	this.e().Sb=h
};
m.ao=function () {
	var a=new Ll(this);
	a.l(this.e(),lu,this.Fl);
	a.l(this.e(),mu,this.Bl);
	Ph&&a.l(this.e(),[gl,pm,Bq],this.$E);
	a.l(window,Pl,this.jF);
	this.F=a;
	this.Rs()
};
m.Rs=function () {
	if(!this.FD&&this.F&&this.e().form) {
		this.F.l(this.e().form,Xv,this.aF);
		this.FD=i
	}
};
m.xi=function () {
	if(this.F) {
		this.F.n();
		this.F=h
	}
};
m.k=function () {
	hF.d.k.call(this);
	this.xi()
};
m.ok="label-input-label";
m.Fl=function () {
	x(this.e(),this.ok);
	if(!this.yh()&&!this.UF)this.e().value=n
};
m.Bl=function () {
	this.qd=h;
	this.Ik()
};
m.$E=function (a) {
	if(a.keyCode==27) {
		if(a.type==pm)this.qd=this.e().value;
		else if(a.type==gl)this.e().value=this.qd;
		else if(a.type==Bq)this.qd=h;
		a.preventDefault()
	}
};
m.aF=function () {
	if(!this.yh()) {
		this.e().value=n;
		Wl(this.RE,10,this)
	}
};
m.RE=function () {
	if(!this.yh())this.e().value=this.ab
};
m.jF=function () {
	this.Ik()
};
m.yh=function () {
	return this.e().value!=n&&this.e().value!=this.ab
};
m.clear=function () {
	this.e().value=n;
	if(this.qd!=h)this.qd=n
};
m.Xb=function (a) {
	if(this.qd!=h)this.qd=a;
	this.e().value=a;
	this.Ik()
};
m.Ca=function () {
	if(this.qd!=h)return this.qd;
	return this.yh()?this.e().value:n
};
m.Ik=function () {
	this.Rs();
	if(this.yh())x(this.e(),this.ok);
	else {
		this.UF||w(this.e(),this.ok);
		Wl(this.HJ,10,this)
	}
};
m.HJ=function () {
	if(this.e()&&!this.yh())this.e().value=this.ab
};
function iF(a) {
	$t.call(this,a);
	this.w=new Ll(this);
	this.Sb=new hF;
	this.i=this.vC()
}v(iF,$t);
m=iF.prototype;
m.lb=dF("goog.ui.ComboBox");
m.w=h;
m.Tl=h;
m.mf=h;
m.Sb=h;
m.i=h;
m.nk=-1;
m.Db=h;
m.Gq=mf;
m.If=h;
m.Bo=n;
m.pD=n;
m.uc=h;
m.RM=e;
var jF="off",kF="goog-combobox-button",lF="goog-combobox",mF="&nbsp;&#x25BC;";
m.o=function () {
	this.Db=this.j.o(Xm,{
		name:this.pD,autocomplete:jF
	});
	this.If=this.j.o(Vy,{
		"class":kF
	});
	this.Jd(this.j.o(Vy,{
		"class":lF
	},this.Db,this.If));
	if(this.RM) {
		this.If.innerHTML=mF;
		Yt(this.If,i)
	}this.Db.setAttribute(mb,this.Bo);
	this.Sb.ka(this.Db);
	this.i.Kd(e);
	this.bc(this.i,i)
};
m.ea=function () {
	iF.d.ea.call(this);
	this.w.l(this.e(),om,this.hI);
	this.w.l(this.j.z,om,this.kI);
	this.w.l(this.Db,mu,this.rI);
	this.M=new cn(this.Db);
	this.w.l(this.M,bn,this.Qb);
	this.Tl=new gF(this.Db);
	this.w.l(this.Tl,Xm,this.sI);
	this.w.l(this.i,fv,this.uI)
};
m.Ra=function () {
	this.w.vf();
	this.M.n();
	delete this.M;
	this.Tl.n();
	this.Tl=h;
	iF.d.Ra.call(this)
};
m.Mb=function () {
	return e
};
m.k=function () {
	iF.d.k.call(this);
	this.Kk();
	this.w.n();
	this.Sb.n();
	this.i.n();
	this.Sb=this.hN=h;
	this.Db=this.i=h;
	this.If=h
};
m.Nb=function () {
	this.Kk();
	this.Wv();
	this.i.te(-1)
};
m.ba=function (a) {
	this.i.ba(a)
};
m.Rg=function (a,b) {
	this.i.Rg(a,b)
};
m.Kj=function (a) {
	this.i.Kj(a)
};
m.nJ=function () {
	for(var a=this.Ue()-1;a>=0;--a)this.Kj(this.Yf(a))
};m.Yf=function (a) {
	return this.i.Yf(a)
};
m.Ue=function () {
	return this.i.Ue()
};
m.ul=function () {
	return this.i
};
var nF="getNumberOfVisibleItems() - ";
m.rE=function () {
	if(this.nk==-1) {
		var a=0;
		for(var b=0,c=this.i.Ue();b<c;b++) {
			var d=this.i.Yf(b);
			!(dinstanceofPv)&&d.H()&&a++
		}this.nk=a
	}this.lb.gg(nF+this.nk);
	return this.nk
};
m.pK=function (a) {
	this.Bo=a
};
var oF="setValue() - ",pF="change";
m.Xb=function (a) {
	this.lb.gg(oF+a);
	if(this.Sb.Ca()!=a) {
		this.Sb.Xb(a);
		this.dispatchEvent(pF)
	}
};
m.Ca=function () {
	return this.Sb.Ca()
};
m.af=function () {
	return Lf(vf(this.Sb.Ca().toLowerCase()))
};
m.vC=function () {
	var a=new Qv(this.j);
	a.B(e);
	a.Ly(e);
	a.hK(i);
	return a
};
var qF="no matching items, hiding",rF="showing menu";
m.xm=function () {
	var a=this.i.H(),b=this.rE();
	if(a&&b==0) {
		this.lb.ce(qF);
		this.Wv()
	}else if(!a&&b>0) {
		this.lb.ce(rF);
		this.Xy(n);
		this.Wy(this.af());
		Wl(this.Kk,1,this);
		a=Ft(this.e());
		this.i.Hr(a.x,a.y+this.e().offsetHeight);
		this.wL()
	}
};
var sF="goog-combobox-active";
m.wL=function () {
	this.i.B(i);
	w(this.e(),sF)
};
m.Wv=function () {
	this.i.B(e);
	x(this.e(),sF)
};
m.Kk=function () {
	if(this.uc) {
		Xl(this.uc);
		this.uc=h
	}
};
var tF="Menu is visible, dismissing",uF="Opening dropdown";
m.hI=function (a) {
	if(a.target==this.e()||a.target==this.Db||xi(this.If,a.target))if(this.i.H()) {
		this.lb.ce(tF);
		this.Nb()
	}else {
		this.lb.ce(uF);
		this.xm();
		this.Db.select();
		this.i.ue(i);
		a.preventDefault()
	}a.stopPropagation()
};
var vF="onDocClicked_() - dismissing immediately";
m.kI=function () {
	this.lb.gg(vF);
	this.Nb()
};
var wF="onMenuSelected_()",xF="Menu selection: ",yF=". Dismissing menu";
m.uI=function (a) {
	this.lb.gg(wF);
	if(this.dispatchEvent(new zv(fv,this,a.target))) {
		var b=a.target.ih();
		this.lb.ce(xF+b+yF);
		this.Xb(Sf(b));
		this.Nb()
	}a.stopPropagation()
};
var zF="onInputBlur_() - delayed dismiss";
m.rI=function () {
	this.lb.gg(zF);
	this.Kk();
	this.uc=Wl(this.Nb,250,this)
};
var AF="Dismiss on Esc: ",BF="Select on Tab: ",CF="Up/Down - maybe show menu";
m.Qb=function (a) {
	var b=this.i.H();
	if(b&&this.i.Qb(a))return i;
	var c=e;
	switch(a.keyCode) {
		case 27:if(b) {
			this.lb.ce(AF+this.Sb.Ca());
			this.Nb();
			c=i
		}break;
		case 9:if(b) {
			if(b=this.i.Te()) {
				this.lb.ce(BF+this.Sb.Ca());
				b.xg(a);
				c=i
			}
		}break;
		case 38:case 40:if(!b) {
			this.lb.ce(CF);
			this.xm();
			c=i
		}break
	}c&&a.preventDefault();
	return c
};
var DF="Key is modifying: ";
m.sI=function () {
	this.lb.ce(DF+this.Sb.Ca());
	var a=this.af();
	this.Xy(a);
	this.xm();
	var b=this.i.Te();
	if(a==n||!b||!b.H())this.Wy(a);
	this.mf=a;
	this.dispatchEvent(pF)
};
var EF="setItemVisibilityFromToken_() - ";
m.Xy=function (a) {
	this.lb.gg(EF+a);
	var b=e,c=0,d=!this.Gq(a,this.mf);
	for(var f=0,g=this.i.Ue();f<g;f++) {
		var k=this.i.Yf(f);
		if(kinstanceofPv) {
			k.B(b);
			b=e
		}else if(kinstanceofJv) {
			if(!k.H()&&!d)continue;
			var l=k.ih();
			l=this.EG(k)||l&&this.Gq(l.toLowerCase(),a);
			typeofk.Zm==te&&k.Zm(a);
			k.B(!!l);
			b=l||b
		}else b=k.H()||b;
		!(kinstanceofPv)&&k.H()&&c++
	}this.nk=c
};
var FF="setItemHighlightFromToken_() - ";
m.Wy=function (a) {
	this.lb.gg(FF+a);
	if(a==n) {
		this.i.te(-1);
		return
	}for(var b=0,c=this.i.Ue();b<c;b++) {
		var d=this.i.Yf(b),f=d.ih();
		if(f&&this.Gq(f.toLowerCase(),a)) {
			this.i.te(b);
			d.Zm&&d.Zm(a);
			return
		}
	}this.i.te(-1)
};
m.EG=function (a) {
	return typeofa.VG==te&&a.hq
};
function GF(a,b,c) {
	Jv.call(this,a,b,c)
}v(GF,Jv);
GF.prototype.hq=e;
GF.prototype.fz=function (a) {
	this.hq=a
};
GF.prototype.VG=function () {
	return this.hq
};
var HF="<b>",IF="</b>";
GF.prototype.Zm=function (a) {
	a=jg(a);
	var b=this.ih();
	if(b)this.e().innerHTML=b.replace(new RegExp(a,fp),function (c) {
		return HF+c+IF
	})
};
function JF() {
	W.call(this)
}v(JF,W);
m=JF.prototype;
m.Ng=0;
m.wj=0;
m.Hq=100;
m.gu=0;
m.Vr=1;
m.yG=e;
m.XH=e;
m.Xb=function (a) {
	a=this.Pm(a);
	if(this.Ng!=a) {
		this.Ng=a+this.gu>this.Hq?this.Hq-this.gu:a<this.wj?this.wj:a;
		!this.yG&&!this.XH&&this.dispatchEvent(pF)
	}
};
m.Ca=function () {
	return this.Pm(this.Ng)
};
m.vl=function () {
	return this.Pm(this.wj)
};
m.tl=function () {
	return this.Pm(this.Hq)
};
m.Pm=function (a) {
	if(this.Vr==h)return a;
	return this.wj+Math.round((a-this.wj)/this.Vr)*this.Vr
};
function KF(a) {
	$t.call(this,a);
	this.Sh=new JF;
	U(this.Sh,pF,this.TE,e,this)
}v(KF,$t);
m=KF.prototype;
var LF="progress-bar-";
m.o=function () {
	this.qc=this.zt();
	this.Jd(this.j.o(C,{
		"class":LF+this.Ua
	},this.qc));
	this.kz();
	this.JK();
	this.HK()
};
var MF="progressbar",NF="live",OF="polite";
m.ea=function () {
	KF.d.ea.call(this);
	this.ao();
	this.ik();
	tu(this.e(),MF);
	vu(this.e(),NF,OF)
};
m.Ra=function () {
	KF.d.Ra.call(this);
	this.xi()
};
var PF="progress-bar-thumb";
m.zt=function () {
	return this.j.o(C,{
		"class":PF
	})
};
m.ao=function () {
	z&&zh<7&&U(this.e(),Km,this.ik,e,this)
};
m.xi=function () {
	z&&zh<7&&V(this.e(),Km,this.ik,e,this)
};
m.Wd=function (a) {
	KF.d.Wd.call(this,a);
	w(this.e(),LF+this.Ua);
	a=Bi(this.e(),function (b) {
		return b.nodeType==1&&lf(b,PF)
	});
	if(!a) {
		a=this.zt();
		this.e().appendChild(a)
	}this.qc=a
};
m.Ca=function () {
	return this.Sh.Ca()
};
m.Xb=function (a) {
	this.Sh.Xb(a);
	this.e()&&this.kz()
};
var QF="valuenow";
m.kz=function () {
	vu(this.e(),QF,this.Ca())
};
m.vl=function () {
	return this.Sh.vl()
};
var RF="valuemin";
m.JK=function () {
	vu(this.e(),RF,this.vl())
};
m.tl=function () {
	return this.Sh.tl()
};
var SF="valuemax";
m.HK=function () {
	vu(this.e(),SF,this.tl())
};
m.Ua=pv;
m.TE=function () {
	this.ik();
	this.dispatchEvent(pF)
};
var TF="100%";
m.ik=function () {
	if(this.qc) {
		var a=this.vl(),b=this.tl();
		a=(this.Ca()-a)/(b-a);
		b=Math.round(a*100);
		if(this.Ua==rv)if(z&&zh<7) {
			this.qc.style.top=0;
			this.qc.style.height=TF;
			b=this.qc.offsetHeight;
			a=Math.round(a*b);
			this.qc.style.top=b-a+yt;
			this.qc.style.height=a+yt
		}else {
			this.qc.style.top=100-b+kh;
			this.qc.style.height=b+kh
		}else this.qc.style.width=b+kh
	}
};
m.sG=function () {
	var a=this.qc.style;
	if(this.Ua==rv) {
		a.left=0;
		a.width=TF
	}else {
		a.top=a.left=0;
		a.height=TF
	}
};
m.Fr=function (a) {
	if(this.Ua!=a) {
		var b=LF+this.Ua,c=LF+a;
		this.Ua=a;
		if(this.e()) {
			kf(this.e(),b,c);
			this.sG();
			this.ik()
		}
	}
};
m.k=function () {
	KF.d.k.call(this);
	this.xi();
	this.qc=h;
	this.Sh.n()
};
var UF="/ui/";
he.HtmlUtil_setServerBase=function (a) {
	UF=a
};
var VF,WF,XF;
function YF(a,b) {
	var c=307,d;
	if(z)c+=5;
	if(a) {
		d=Ft(a);
		var f=Jt(a);
		d.y+=f.height
	}else d=new nh(0,0);
	a=f.width>c?f.width:c;
	if(b) {
		d.x+=b.screenX-b.clientX;
		d.y+=b.screenY-b.clientY
	}if(d.x+313>screen.width)d.x=screen.width-313;
	if(d.y+600>screen.height)d.y=screen.height-600;
	return new pt(d.x,d.y,a,554)
}var ZF="id",$F="toolbar=no,location=no,menubar=no,scrollbars=no,resizable=yes,status=no,width=",aG=",height=",bG=",top=",cG=",left=",dG="_picker";
function eG(a,b,c,d) {
	var f;
	if(b) {
		b=Yh(b);
		var f=b.getAttribute(ZF)
	}else f=h;
	var g;
	g=!Qh&&b?li(Wh(b))||window:window;
	b=YF(b,c);
	c=$F+b.width+aG+b.height+bG+b.top+cG+b.left;
	a=fG(a,f,d);
	a.cb(fi,b.width);
	a.cb(ei,b.height);
	if(!VF||VF.closed)VF=g.open(a.toString (),dG,c);
	VF.focus()
}var gG="ui/ContactPicker",hG="inputId",iG="service";
function fG(a,b,c) {
	a=a.Nm(new Sg(gG));
	b&&a.cb(hG,b);
	if(c) {
		c.serviceName&&a.cb(iG,c.serviceName);
		c.hl&&a.cb($j,c.hl)
	}return a
}
var jG="done",kG="iframeDone",lG="picker-iframe-div",mG="position: absolute; background-color; #FFF",nG='<iframe id="picker-iframe" style="display:none; background-color; #FFF; border: 0"></iframe>',oG="picker-iframe",pG="block";
function qG(a,b,c) {
	WF&&rG();
	b=YF(a,h);
	a=fG(a,c);
	window.iframeDone=rG;
	a.cb(jG,kG);
	c=Yh(lG);
	if(c==h) {
		c=mi(C,{
			id:lG,style:mG,zIndex:10
		});
		document.body.appendChild(c);
		c.innerHTML=nG
	}var d=Yh(oG);
	d.style.display=pG;
	Ht(c,b.left,b.top);
	It(d,b.width,b.height);
	d.src=a;
	XF=c;
	WF=d
}
function rG() {
	B(XF);
	WF=XF=h
}Me("goog.focus.PickerLauncher.popPicker",function (a,b) {
	var c=new Sg(UF.replace(/ui\/?$/,n));
	eG(c,a,b)
});
Me("goog.focus.PickerLauncher.popIframe",qG);
var sG,tG,uG;
function vG(a,b) {
	var c;
	if(a) {
		c=Ft(a);
		var d=Jt(a);
		c.y+=d.height
	}else c=new nh(0,0);
	a=d.width>307?d.width:307;
	if(b) {
		c.x+=b.screenX-b.clientX;
		c.y+=b.screenY-b.clientY
	}if(c.x+313>screen.width)c.x=screen.width-313;
	if(c.y+600>screen.height)c.y=screen.height-600;
	return new pt(c.x,c.y,a,554)
}var wG="_chooser";
function xG(a,b,c,d) {
	var f;
	if(b) {
		b=Yh(b);
		f=b.getAttribute(ZF)
	}else f=h;
	var g;
	g=!Qh&&b?li(Wh(b))||window:window;
	b=vG(b,c);
	b=$F+b.width+aG+b.height+bG+b.top+cG+b.left;
	a=yG(a,f,d);
	if(!sG||sG.closed)sG=g.open(a.toString (),wG,b);
	sG.focus()
}var zG="widgets/ContactChooser",AG="tempTitle";
function yG(a,b,c) {
	a=a.Nm(new Sg(zG));
	b&&a.cb(hG,b);
	if(c) {
		c.serviceName&&a.cb(iG,c.serviceName);
		c.hl&&a.cb($j,c.hl);
		c.tempTitle&&a.cb(AG,c.tempTitle)
	}return a
}
var BG="chooser-iframe-div",CG='<iframe id="chooser-iframe" style="display:none;background-color; #FFF; border: 0"></iframe>',DG="chooser-iframe";
function EG(a,b,c) {
	tG&&FG();
	b=vG(a,h);
	a=yG(a,c);
	window.iframeDone=FG;
	a.cb(jG,kG);
	c=Yh(BG);
	if(c==h) {
		c=mi(C,{
			id:BG,style:mG,zIndex:10
		});
		document.body.appendChild(c);
		c.innerHTML=CG
	}var d=Yh(DG);
	d.style.display=pG;
	Ht(c,b.left,b.top);
	It(d,b.width,b.height);
	d.src=a;
	uG=c;
	tG=d
}function FG() {
	B(uG);
	tG=uG=h
}
Me("goog.focus.ChooserLauncher.popChooser",function (a,b,c) {
	var d=new Sg(UF.replace(/ui\/?$/,n));
	xG(d,a,b,c)
});
Me("goog.focus.ChooserLauncher.popIframe",EG);
function GG(a,b) {
	this.dN=[];
	this.Uj=Ce(a)?new Sg(a):a;
	if(this.Uj.bb.charAt(0)!=ch)j(Error());
	this.zr=b;
	this.to={
	};
	this.Sl=h;
	this.Pg={
	};
	this.Dx={
	};
	this.pw={
	};
	this.gl=h
}GG.prototype.EK=function (a) {
	this.sm=a
};
function HG(a) {
	this.JI=a;
	this.Fm=new tq;
	this.Of=h
}HG.prototype.kB=function (a) {
	this.Of?this.Of.addInput(a):this.Fm.add(a)
};
HG.prototype.Jr=function (a) {
	this.Of&&this.Of.setTarget(a)
};
var IG=";";
function JG(a) {
	var b=n;
	for(var c in a)b+=c+mh+a[c]+IG;return b
}m=GG.prototype;
m.Ql=function (a) {
	if(this.Wt)j(Error("Email autcomplete was already initialized. To attach it to an input field, please use attachAutocomplete()"));
	this.Wt=i;
	this.to=a||{
	};
	var b=this;
	this.$D().gD(function (c) {
		if(c=(c.contentWindow||c.contentDocument.defaultView)._EmailAc_create) {
			b.Sl=c;
			for(var d in b.Pg)b.hw(b.Pg[d]);if(b.gl) {
				c=Ge(b.gl);
				(c=b.pw[c])&&c.Jr(b.gl)
			}for(var d in b.Pg) {
				c=b.Pg[d];
				c=c.Fm.hc();
				for(var f=1;f<c.length;f++)V(c[f],lu,b.Ox,e,b)
			}
		}
	})
};
m.hw=function (a) {
	if(!this.Sl)return ;
	var b=a.JI;
	b.serverBase=this.Uj;
	b.onComplete=r(this.iI,this);
	for(var c in this.to)b[c]=this.to[c];c=a.Fm.hc();a.Of=this.Sl(c[0],b);for(b=1;b<c.length;b++)a.Of.addInput(c[b]);a.Fm.clear()
};m.Ck=function (a,b,c) {
	a=Yh(a);
	b=b||{
	};
	var d=Ge(a);
	this.Dx[d]=c;
	c=JG(b);
	var f=this.Pg[c];
	if(!f) {
		f=new HG(b);
		this.Pg[c]=f
	}f.kB(a);
	this.pw[d]=f;
	f.Of||(this.Sl?this.hw(f):U(a,lu,this.Ox,e,this))
};
m.Ox=function (a) {
	this.gl=a.target;
	this.Wt||this.Ql()
};
m.iI=function (a) {
	var b=this.Dx[Ge(a)];
	b&&b(a)
};
m.DB=function (a,b) {
	this.Ql();
	this.Ck(a,b)
};
m.CB=function (a) {
	this.Ck(a)
};
m.iH=function (a,b) {
	eG(this.Uj,a,b,{
		serviceName:this.zr,hl:this.sm
	})
};
m.hH=function (a,b) {
	xG(this.Uj,a,b,{
		serviceName:this.zr,hl:this.sm
	})
};
var KG="ui/EmailAc";
m.$D=function () {
	if(!this.Vt) {
		var a=this.Uj.Nm(new Sg(KG));
		a.cb(iG,this.zr);
		this.sm&&a.cb($j,this.sm);
		this.Vt=this.aI(a.toString ())
	}return this.Vt
};
m.aI=function (a) {
	return new LG(a)
};
Me("goog.ContactTools",GG);
Ne(GG.prototype,"setLocale",GG.prototype.EK);
Ne(GG.prototype,"attachAutocompleteTo",GG.prototype.DB);
Ne(GG.prototype,"attachAutocompleteAlsoTo",GG.prototype.CB);
Ne(GG.prototype,"initAutocomplete",GG.prototype.Ql);
Ne(GG.prototype,"attachAutocomplete",GG.prototype.Ck);
Ne(GG.prototype,"launchPicker",GG.prototype.iH);
Ne(GG.prototype,"launchChooser",GG.prototype.hH);
function LG(a) {
	this.Hk=[];
	this.vg=this.tC();
	document.body.appendChild(this.vg);
	z?U(this.vg,Ol,this.qI,e,this):U(this.vg,Pl,this.Ix,e,this);
	this.vg.src=a
}LG.prototype.gD=function (a) {
	this.Cb?a(this.Cb):this.Hk.push(a)
};
var MG="10px",NG="-99px",OG="-10px";
LG.prototype.tC=function () {
	var a=mi(BC);
	a.src=bm;
	var b=a.style;
	b.visibility=Q;
	b.width=b.height=MG;
	if(Qh)b.marginTop=b.marginLeft=NG;
	else {
		b.position=Jo;
		b.top=b.left=OG
	}return a
};
LG.prototype.qI=function () {
	this.vg.readyState==Rl&&this.Ix()
};
LG.prototype.Ix=function () {
	this.Cb=this.vg;
	delete this.vg;
	for(var a=0;this.Hk[a];++a)this.Hk[a](this.Cb);delete this.Hk
};function PG() {
}var QG="quickadd";
PG.prototype.pf=function (a,b) {
	if(a) {
		a.stopPropagation();
		a.preventDefault()
	}b=vf(b);
	if(rf(b))return ;
	Up();
	a=this.yE();
	a.Va(r(this.ey,this,b));
	a.va(r(this.aJ,this,b));
	a.Tb(Ca,Xj([[QG,b]]))
};
PG.prototype.yE=function () {
	return new Tq
};
PG.prototype.ey=function () {
	uy();
	Z(Hq,Kq)
};
PG.prototype.aJ=function (a,b) {
	uy();
	b=Yp(b.text);
	if(!b.query||b.query!=a) {
		this.ey(a,h);
		return
	}if(b.numResults==1) {
		a=Fk(b.streamId);
		Yx.Lb(RG(a));
		S.u();
		Y.u()
	}else (new SG(a)).select()
};
function RG(a) {
	function b() {
		Yx.uJ(b);
		X.Sn(TG(a));
		Yx.ze(a)
	}return b
}function TG() {
	function a() {
		X.er(a);
		X.rn()
	}return a
}var UG=h;
Ym(function () {
	return !UG||!UG.sa?h:UG.Ij
},function () {
	UG.Rb()
});
var VG="quick-add-btn",WG="quick-add-form",XG="quick-add-close";
function YG() {
	PG.call(this);
	this.Ij=Yh(bx);
	this.sa=e;
	U(Yh(VG),T,this.pf,e,this);
	U(Yh(WG),Xv,this.pf,e,this);
	U(Yh(XG),T,this.Rb,e,this);
	var a=Yh(QG);
	an(27,a,r(this.Rb,this))
}v(YG,PG);
function ey() {
	UG||(UG=new YG);
	UG.dd()
}function Sx() {
	UG||(UG=new YG);
	UG.Ga()
}YG.prototype.Ga=function () {
	this.sa?this.Rb():this.dd()
};
YG.prototype.dd=function () {
	var a=Yh(QG);
	a.value=n;
	var b=Yh(Qx),c=Kt(b);
	this.Ij.style.left=c.left+yt;
	this.Ij.style.top=c.top+c.height+yt;
	x(this.Ij,Q);
	this.sa=i;
	cx(b,i);
	b=Yh(VG);
	c=Yh(WG);
	a.style.width=n;
	c=Kt(c);
	var d=Kt(a);
	b=Kt(b);
	a.style.width=c.width-(b.width+(b.left-c.left-d.width))-2-1-4-1+yt;
	window.setTimeout(function () {
		a.focus()
	},0)
};
YG.prototype.Rb=function () {
	Yh(QG).blur();
	w(this.Ij,Q);
	this.sa=e;
	cx(Yh(Qx),e)
};
YG.prototype.pf=function (a) {
	this.Rb();
	var b=Yh(QG).value;
	YG.d.pf.call(this,a,b)
};
function ZG(a) {
	this.cc=a;
	this.Rb();
	this.tr=this.ay=n;
	this.sa=e
}m=ZG.prototype;
m.Rb=function () {
	this.Vd&&B(this.Vd);
	this.ee&&B(this.ee);
	this.ee=this.Vd=h;
	this.sa=this.Gw=e
};
var $G="banner-background",aH="banner-foreground";
m.C=function () {
	if(this.Gw)return ;
	this.Gw=i;
	this.Vd=bH();
	w(this.Vd,$G,this.cc);
	document.body.appendChild(this.Vd);
	this.ee=bH();
	w(this.ee,aH,this.cc);
	document.body.appendChild(this.ee)
};
m.dd=function () {
	this.C();
	this.dr();
	Sj(this.Vd,i);
	Sj(this.ee,i);
	this.sa=i
};
m.ai=function (a) {
	this.ay=a;
	this.dr()
};
m.Yj=function (a) {
	this.tr=a;
	this.dr()
};
m.dr=function () {
	this.C();
	this.gy(this.Vd);
	this.gy(this.ee)
};
var cH="primary-message",dH="secondary-message";
m.gy=function (a) {
	M(a,cH,C).innerHTML=this.ay||n;
	a=M(a,dH,C);
	if(this.tr) {
		a.innerHTML=this.tr;
		x(a,Q)
	}else w(a,Q)
};
m.H=function () {
	return this.sa
};
var eH,fH,gH=h;
function hH(a) {
	eH=a
}function iH(a) {
	fH=a
}function Dm(a,b,c,d) {
	gH=a;
	a.J.xB||b||!a.Zc()?Sq(a,function (f) {
		jH(a,function (g) {
			kH(g,d)
		},c||!f)
	}):kH(a,d)
}
function kH(a,b) {
	if(a.tF()) {
		var c=Math.round(Wj()/1000)-2592000;
		if(c%3600)c-=c%3600;
		if(S) {
			var d=S.ib(a);
			if(d) {
				d=Math.floor(d.yD/1000);
				c=Math.max(d,c)
			}
		}a.$y(c)
	}a.FK(b);
	Bm(a);
	eH(a)
}function jH(a,b,c) {
	if(!_USER_ID) {
		b(a);
		return
	}var d=Gk(a);
	fH(a,function (f) {
		d.yf(f.II);
		ys(function (g) {
			d.$B();
			g||c?d.$y(h):d.fB(R.vd());
			b(d)
		})
	})
}function lH() {
	gH=h
}var mH=[];
function nH() {
	mH.push(this)
}function Bm(a) {
	for(var b=0,c;c=mH[b];b++)c.ze(a)
}function oH() {
	nH.call(this)
}v(oH,nH);
oH.prototype.Um=function (a) {
	Dm(a)
};
function sx(a,b,c) {
	oH.call(this);
	this.Tx=J(a);
	this.h=b;
	a=this.Tx.getElementsByTagName(Vf)[0];
	a.href=b.Oi(c);
	U(a,T,this.wh,e,this)
}v(sx,oH);
sx.prototype.wh=function (a) {
	a.preventDefault();
	this.select()
};
sx.prototype.select=function () {
	this.Um(this.h)
};
sx.prototype.ze=function (a) {
	a=a&&a.G(this.h);
	y(this.Tx,Ou,a)
};
var ry=h,pH="-page";
function qH(a,b,c,d) {
	nH.call(this);
	this.zh=(this.L=a)&&J(a)!=h;
	this.HI=b;
	this.yI=c;
	this.jI=d;
	if(this.zh) {
		this.m=J(a);
		a=M(this.m,tb);
		El(a,T);
		U(a,T,this.wh,e,this);
		if(a.tagName.toLowerCase()==Vf&&this.ke)a.href=$f+this.ke+pH
	}
}v(qH,nH);
m=qH.prototype;
m.pp=function (a) {
	return a
};
m.ze=function () {
	this.Bg&&this.Bg.abort();
	this.zh&&x(this.m,Ou);
	this.xr=e;
	ry=h;
	this.jI()
};
m.wh=function (a) {
	a.preventDefault();
	this.select()
};
m.select=function () {
	if(!this.xr) {
		lH();
		for(var a=0,b;b=mH[a];a++)b!=this&&b.ze(h);this.zh&&w(this.m,Ou);this.xr=i;ry=this
	}this.u()
};var rH="viewer-page";m.u=function () {
	var a=this;
	this.Bg=new Tq;
	this.Bg.va(function () {
		uy();
		var b=N(C,{
			"class":rH
		});
		b.innerHTML=a.Bg.text;
		a.yI(b);
		a.Bg=h
	});
	this.Bg.Va(r(this.wI,this));
	Up();
	this.Bg.N(this.pp(this.HI))
};
var sH="An error has occurred";
m.wI=function () {
	uy();
	Z(Hq,Kq);
	var a=u(sH),b=tH();
	uH(b,a)
};
function vH(a,b,c,d) {
	var f=this;
	qH.call(this,a,b,function (g) {
		f.GI=g;
		uH(g,c);
		wH();
		d(g)
	},function () {
		X.V=e
	})
}v(vH,qH);
vH.prototype.Si=function (a) {
	var b=this.GI.getElementsByTagName(Ui);
	for(var c=0,d;d=b[c];c++)eval(d.innerHTML);return eval(a)
};function xH(a) {
	wm.call(this);
	this.L=a.prototype.ke+pH;
	this.FI=a
}v(xH,wm);
xH.prototype.Mm=function () {
	(new this.FI).select()
};
var yH=h,zH="keyboard-help-tearoff-link",AH="resized";
function BH() {
	yH==h&&CH();
	yH.H()||window.setTimeout(function () {
		yH.dd();
		var a=yH.ee;
		M(a,zH).onclick=DH;
		var b=M(a,dH),c=Kt(b),d=c.top;
		c=d+c.height;
		var f=ki(window).height;
		if(f<c) {
			a=Kt(a);
			d=f-(d+(a.top+a.height-c));
			a=M(yH.Vd,dH);
			a.style.height=b.style.height=d+yt;
			w(b,AH);
			w(a,AH)
		}
	},0)
}function EH() {
	var a=yH;
	a&&a.H()&&a.Rb()
}var FH="keyboard-help-banner",GH="Keyboard shortcuts",HH="keyboard-help-container";
function CH() {
	var a=new ZG(FH);
	a.ai(GH);
	a.Yj(J(HH).innerHTML);
	yH=a
}var IH="readerkeyboardshortcuts";
function DH() {
	EH();
	bz(_KEYBOARD_HELP_URL,{
		target:IH,width:780,height:550,toolbar:e,scrollbars:i,resizable:e,menubar:e
	})
}Ym(function () {
	var a=yH;
	return a&&a.H()?[a.Vd,a.ee]:h
},EH);
var JH="Home",KH="overview-selector";
function wx() {
	this.Mr=e;
	var a=u(JH),b=this;
	vH.call(this,KH,Sa,a,function (c) {
		b.Wb(c);
		vm.NA.Ub()
	})
}v(wx,vH);
wx.prototype.ke="overview";
wx.prototype.pp=function (a) {
	return H.Sd()?P(a,nj,q):a
};
var LH="fast-ui-promo",MH="fast-ui-promo-dismiss",NH="sub-link",OH="label-link",PH="overview-directory-link",QH="rec-preview",RH="rec-preview-body",SH="all-recs-link",TH="rec-preview-feed-title",UH="_OVERVIEW_REC_DATA",VH="recent-activity-star",WH="recent-activity-broadcast",XH="clip-promo-link",YH="clip-promo-blogger",ZH="clip-promo-image",$H="keyboard-shortcuts-banner-tip-link";
wx.prototype.Wb=function (a) {
	if(_DISPLAY_LOCALE.indexOf($x)==0&&js(oc)==q) {
		x(J(LH),Q);
		Al(J(MH),T,this.FC,e,this)
	}var b=rj(a),c=b[NH];
	a=b[OH];
	var d=J(PH);
	J(QH);
	J(RH);
	var f=J(SH),g=b[TH],k=this.Si(UH);
	if(g&&g.length>0) {
		for(var b=0,l;l=g[b];b++) {
			var p=Fk(Ik+k.recs[b].url);
			wA(l,p)
		}f.onclick=function () {
			zx.select()
		}
	}function s(I) {
		var L=I.id.substring("overview-".length);
		L=Fk(L);
		wA(I,L,h,i);
		I.target=Iy
	}if(c)for(var b=0;f=c[b];b++)s(f);if(a)for(var b=0;c=a[b];b++)s(c);if(d)d.onclick=function () {
		zx.select();
		return e
	};
	function A(I,L) {
		I=J(I);
		if(!I)return ;
		I=I.getElementsByTagName(Vf)[0];
		wA(I,L,h,i)
	}A(VH,Ek(R.xd()));
	A(WH,Uk());
	if(s=J(XH)) {
		A=Uk();
		J(YH).onclick=J(ZH).onclick=s.onclick=t(RC,A)
	}if(s=J($H))s.onclick=function () {
		DH();
		return e
	};
	if(this.Mr) {
		this.Mr=e;
		Op(Cc,(Wj()-_START_TIME)*1000)
	}
};
wx.prototype.FC=function () {
	B(J(LH));
	os(oc,e.toString ())
};
vm.NA=new xH(wx);
var aI=u("Enter Keywords"),bI=u("Username"),cI="Discover and search for feeds",dI="directory-selector";
function Ax() {
	var a=this,b=u(cI);
	vH.call(this,dI,Ta,b,function (c) {
		a.Wb(c);
		a.yN=new eI;
		vm.DA.Ub()
	})
}v(Ax,vH);
m=Ax.prototype;
m.ke="directory";
m.Wb=function (a) {
	this.Qh=rj(a);
	this.nG(a);
	this.WF();
	this.kG();
	this.iG(a);
	this.fG();
	this.eG();
	this.XF()
};
var fI="directory-box";
m.nG=function (a) {
	var b=this.Cy;
	this.Cy=e;
	if(!b&&S&&S.Ib.length==0) {
		x(J(fI),Q);
		b=i
	}gI(a,b?1:0)
};
var hI="_DIRECTORY_DATA",iI="bundle-subscribe",jI="bundle-show-details-link",kI="bundle-contents";
m.WF=function () {
	var a=this.Si(hI),b=this.Qh[iI],c=this.Qh[jI],d=this.Qh[kI];
	for(var f=0,g;g=b[f];f++) {
		var k=g.id.substring("bundle-add-".length);
		g.onclick=r(this.Mz,this,a.bundles[k]);
		g=new vE(c[f],d[f],e);
		g.Ns=300;
		g.Ms=function (l) {
			return l
		}
	}
};
var lI="discover-container",mI="full-bundles-container",nI="browse-bundles-link",oI="back-to-discover-link";
m.kG=function () {
	var a=J(lI),b=J(mI);
	U(J(nI),T,r(function () {
		w(a,Q);
		x(b,Q)
	}));
	U(J(oI),T,r(function () {
		x(a,Q);
		w(b,Q)
	}))
};
var pI="_RECS_DATA";
m.iG=function (a) {
	a=qI(a);
	var b=this.Si(pI).recs;
	for(var c=0,d;d=a[c];c++) {
		var f=b[c],g=Fk(Ik+f.url);
		d.Lz.onclick=r(this.QL,this,f,d.Om);
		d.kA.onclick=r(this.wM,this,f,d.Om);
		d.GC.onclick=r(this.HC,this,f,d.LJ);
		this.qG(d.tu,f,g);
		wA(d.uA,g);
		wA(d.Xz,g)
	}
};
var rI="directory-search-form",sI="directory-search-query",tI="directory-search-button",uI="discover-default-search";
m.fG=function () {
	var a=J(rI),b=J(sI),c=J(tI);
	b.value=aI;
	U(a,Xv,this.Vx,e,this);
	U(c,T,this.Vx,e,this);
	Al(b,lu,function () {
		if(b.value==aI) {
			b.value=n;
			x(b,uI)
		}
	},e,this)
};
m.Vx=function (a) {
	if(a) {
		a.stopPropagation();
		a.preventDefault()
	}a=J(sI);
	(a=vf(a.value))&&a!=aI&&(new SG(a)).select()
};
var vI="import-link",wI="import";
m.eG=function () {
	Dp.sn(J(vI),wI)
};
var xI="directory-category";
m.XF=function () {
	xI in this.Qh&&yI(this.Qh[xI])
};
var zI="bundle-",AI="bundle-added",BI="Subscribing to bundle &quot;%1&quot;...",CI="bundle";
m.Mz=function (a) {
	a.isadded=i;
	var b=this.Qh[zI+a.id];
	for(var c=0,d;d=b[c];c++)w(d,AI);c=Sf(BI);Z(O(c,a.title),DI);b=[];for(var c=0;d=a.subscriptions[c];c++)b.push(d.id);c=new Ir(b,h,[this.QD(a)]);c.EC();c.Qg(CI,a.id);c.Qg(ob,wc);c.exec(r(this.iC,this,a))
};var EI="Subscribed to bundle &quot;%1&quot;.";m.iC=function (a) {
	var b=Sf(EI);
	Z(O(b,a.title),Ss)
};
m.QD=function (a) {
	a=hk(a.title);
	a=as(a)[0];
	return R.vh(a)
};
m.select=function (a) {
	this.Cy=a;
	Rx(r(Ax.d.select,this))
};
function yI(a) {
	for(var b=0,c;c=a[b];b++) {
		var d=c.id.substring("directory-category-".length);
		c.onclick=t(FI,d)
	}
}function FI(a) {
	(new SG(n,a)).select()
}m=Ax.prototype;
m.qG=function (a,b,c) {
	GI(function () {
		return c
	},function () {
		return function (d) {
			Ur(c.streamId,d,b.title)
		}
	},a)
};
var HI="result-subscribed";
m.wM=function (a,b) {
	var c=Ik+a.url,d=a.externalDocId;
	Pr(c,a.title,t(x,b,HI),i);
	c&&d?(new Mq(c,d,h,[R.lv()])).exec():Z(Hq,Kq)
};
m.QL=function (a,b) {
	Hr(Ik+a.url,a.externalDocId,a.title,t(w,b,HI))
};
var II="recommended-feed-highlight",JI='This feed has been removed from your recommendations. <span class="link" id="rec-dismissed-undo-link">Undo</span>',KI="rec-dismissed-undo-link",LI="There was a problem removing this recommendation.";
m.HC=function (a,b) {
	var c=this,d=Ik+a.url,f=a.externalDocId;
	w(b,II);
	a=[R.kv()];
	this.Qz(d,f,a,h,function () {
		window.setTimeout(t(w,b,Q),1000);
		Z(JI,Ss);
		J(KI).onclick=function () {
			c.IJ(d,f,b)
		}
	},function () {
		Z(LI,Kq)
	})
};
var MI="Restored the feed back into your recommendations.",NI="There was a problem restoring the recommended feed.";
m.IJ=function (a,b,c) {
	w(c,II);
	var d=[R.kv()];
	this.Qz(a,b,h,d,function () {
		x(c,Q);
		window.setTimeout(function () {
			x(c,II)
		},1000);
		Z(MI,Ss)
	},function () {
		Z(NI,Kq)
	})
};
m.Qz=function (a,b,c,d,f,g) {
	var k;
	if(a&&b)k=new Mq(a,b,c,d);
	k?k.exec(f):g()
};
var OI="service-quickadd-form",PI="service-quickadd-username",QI="service-quickadd-service",RI="service-quickadd-button";
function eI() {
	PG.call(this);
	this.xu=J(OI);
	this.hi=J(PI);
	this.Iy=J(QI);
	this.QB=J(RI);
	if(this.xu) {
		U(this.xu,Xv,this.pf,e,this);
		U(this.QB,T,this.pf,e,this);
		this.hi.value=bI;
		Al(this.hi,lu,function () {
			if(this.hi.value==bI) {
				this.hi.value=n;
				x(this.hi,uI)
			}
		},e,this)
	}
}v(eI,PG);
var SI="Please enter a username for the service you&#39;d like to subscribe to.";
eI.prototype.pf=function (a) {
	var b=this.Iy[this.Iy.selectedIndex].value,c=vf(this.hi.value);
	if(sf(c)||c==bI) {
		alert(SI);
		a.stopPropagation();
		a.preventDefault();
		return
	}b=O(b,c);
	YG.d.pf.call(this,a,b);
	Op(Tc)
};
vm.DA=new xH(Ax);
var TI="cat",UI='Feeds in the "{$category}" category',VI='Feeds matching "{$query}"in the "{$category}" category',WI='Feeds matching "{$query}"';
function SG(a,b,c) {
	var d=P(Ua,QA,a);
	if(b)d=P(d,TI,b);
	if(c)d=P(d,nC,c);
	var f=n;
	if(rf(a)&&b) {
		f=f=u(UI,{
			category:this.Gu(b)
		})
	}else if(b) {
		f=f=u(VI,{
			query:Lf(a),category:this.Gu(b)
		})
	}else {
		f=f=u(WI,{
			query:Lf(a)
		})
	}var g=this;
	vH.call(this,h,d,f,function (k) {
		g.uK(k);
		vm.EA.Ub([a,b||n,c||0])
	},i)
}v(SG,vH);
m=SG.prototype;
var XI="News",YI="Fun & Games",ZI="Finance",$I="Sports",aJ="Lifestyle",bJ="Technology";
m.Gu=function (a) {
	var b=u(XI),c=u(YI),d=u(ZI),f=u($I),g=u(aJ),k=u(bJ);
	switch(a) {
		case Bd:return b;
		case Cd:return c;
		case Dd:return d;
		case Ed:return f;
		case Fd:return g;
		case Gd:return k
	}return n
};
var cJ="_DIRECTORY_SEARCH_DATA",dJ="directory-search-results-previous-page",eJ="directory-search-results-next-page",fJ="directory-search-return";
m.uK=function (a) {
	var b=qI(a),c=this.Si(cJ);
	for(var d=0,f;f=b[d];d++) {
		var g=c.results[d],k=Fk(g.streamid);
		wA(f.uA,k);
		wA(f.Xz,k);
		f.kA.onclick=r(this.xM,this,g,f.Om);
		this.rG(f.tu,g,k);
		f.Lz.onclick=r(this.RL,this,g,f.Om)
	}var l=c.pagestatus;
	if(l.haspreviouspage) {
		b=J(dJ);
		b.onclick=function () {
			(new SG(l.query,l.categoryid,l.previouspagestart)).select()
		}
	}if(l.hasnextpage) {
		b=J(eJ);
		b.onclick=function () {
			(new SG(l.query,l.categoryid,l.nextpagestart)).select()
		}
	}J(fJ).onclick=function () {
		zx.select(i)
	};
	(a=Zh(undefined,
	xI,a))&&yI(a)
};
m.rG=function (a,b,c) {
	GI(function () {
		return c
	},function () {
		return function (d) {
			Ur(c.streamId,d,b.title)
		}
	},a)
};
m.RL=function (a,b) {
	a=new Ir(a.streamid,a.title);
	a.Qg(ob,xc);
	a.exec(t(w,b,HI))
};
m.xM=function (a,b) {
	Pr(a.streamid,a.title,function () {
		x(b,HI)
	},i)
};
var gJ="directory-search";
function hJ() {
	wm.call(this);
	this.L=gJ
}v(hJ,wm);
hJ.prototype.Mm=function (a) {
	var b=a[0],c=a[1];
	a=parseInt(a[2],10);
	(new SG(b,c,a)).select()
};
vm.EA=new hJ;
var iJ=u("Welcome to Google Reader!");
function Cx() {
	var a=this;
	vH.call(this,h,_DIRECTORY_WELCOME_URL,iJ,function (b) {
		a.Wb(b);
		vm.FA.Ub();
		a.Ii=i
	})
}v(Cx,Ax);
m=Cx.prototype;
var jJ="directory-welcome";
m.ke=jJ;
m.Ii=e;
var kJ="directory-welcome-button";
m.Wb=function () {
	U(J(kJ),T,r(zx.select,zx))
};
m.Km={
};
m.cr=e;
m.sz=e;
var lJ="staff-picks";
m.wH=function (a,b) {
	if(lf(b,Q))return ;
	var c=this;
	Pq(Ha,function (d) {
		if(d=d.bundles[lJ]) {
			U(a,T,r(c.SL,c,d),e,c);
			x(b,Q)
		}
	})
};
m.SL=function (a) {
	this.Mz(a)
};
m.JJ=function (a,b) {
	if(this.cr)this.ry(a,b);
	else {
		var c=this;
		Pq(Ia,function (d) {
			c.Km=d;
			c.cr=i;
			c.ry(a,b)
		})
	}
};
var mJ="new-user-actual-recommendations",nJ="rec-add-subs-icon",oJ="rec-add-subs",pJ="new-user-rec-",qJ="directory-welcome-rec-snippet-indent",rJ="directory-welcome-rec-snippet";
m.ry=function (a,b) {
	var c=this.sz,d=J(mJ);
	if(!this.cr||this.Km.recs.length<1) {
		x(d,Q);
		return
	}d.innerHTML=n;
	a=Math.min(a,this.Km.recs.length);
	for(var f=0;f<a;f++) {
		var g=this.Km.recs[f],k=Fk(Ik+g.url);
		g=mi(PA,h,mi(Vy,{
			"class":c?nJ:oJ
		},mi(Vf,{
			id:pJ+f
		},g.title)),g.snippet?mi(C,{
			"class":c?qJ:rJ
		},g.snippet):h);
		pi(d,g);
		wA(J(pJ+f),k)
	}x(d,Q);
	x(b,Q)
};
function Dx() {
	if(!mf(_DISPLAY_LOCALE,$x))return ;
	Oq(function (a) {
		Hs(function (b) {
			if(b==h&&!a) {
				b=_USER_ID%3;
				Is(b)
			}Bx=sJ(b)
		})
	})
}
function tJ(a) {
	Is(a);
	Bx=sJ(a);
	Bx.select()
}Me("FR_hex",tJ);
function sJ(a) {
	switch(a) {
		case 2:return new uJ;
		case 1:return new vJ;
		case 0:default:return new Cx
	}
}function vJ() {
	var a=this;
	vH.call(this,h,_DIRECTORY_WELCOME_URL,iJ,function (b) {
		if(a.Ii)return ;
		a.ln(b);
		a.Wb(b);
		vm.GA.Ub();
		a.Ii=i
	})
}v(vJ,Cx);
var wJ="directory-welcome-1";
vJ.prototype.ke=wJ;
var xJ="directory-welcome-1-staff-picks-button",yJ="directory-welcome-staff-pics-container",zJ="new-user-recommendations";
vJ.prototype.ln=function () {
	w(J(jJ),Q);
	this.wH(J(xJ),J(yJ));
	this.JJ(2,J(zJ));
	x(J(wJ),Q)
};
var AJ="directory-welcome-add-subscription-link",BJ="directory-welcome-big-add-icon",CJ="directory-welcome-discover-link",DJ="directory-welcome-view-all-recommendations";
vJ.prototype.Wb=function () {
	var a=J(AJ),b=J(BJ),c=J(CJ),d=J(DJ);
	a&&U(a,T,function (f) {
		ey();
		f.stopPropagation()
	});
	b&&U(b,T,function (f) {
		ey();
		f.stopPropagation()
	});
	c&&U(c,T,r(zx.select,zx));
	d&&U(d,T,r(zx.select,zx))
};
function uJ() {
	var a=this;
	vH.call(this,h,_DIRECTORY_WELCOME_URL,iJ,function (b) {
		if(a.Ii)return ;
		a.ln(b);
		a.Wb(b);
		vm.HA.Ub();
		a.Ii=i
	})
}v(uJ,vJ);
uJ.prototype.ke="directory-welcome-2";
var EJ="directory-welcome-1-lhs-content-box",FJ="directory-welcome-2-lhs-content-box",GJ="directory-welcome-1-intro",HJ="directory-welcome-2-intro";
uJ.prototype.ln=function (a) {
	J(EJ).innerHTML=J(FJ).innerHTML;
	J(GJ).innerHTML=J(HJ).innerHTML;
	this.sz=i;
	w(J(yJ),Q);
	uJ.d.ln.call(this,a);
	lf(J(zJ),Q)&&x(J(zJ),Q)
};
uJ.prototype.Wb=function (a) {
	uJ.d.Wb.call(this,a);
	this.jL()
};
var IJ="feed/http://jakeandamir.com/rss",JJ="jake-and-amir",KJ="feed/http://rsspect.com/rss/qwantz.xml",LJ="dinosaur-comics",MJ="feed/http://blog.makezine.com/index.xml",NJ="make-magazine",OJ="feed/http://mfrost.typepad.com/cute_overload/rss.xml",PJ="cute-overload",QJ="feed/http://www.latartinegourmande.com/feed/",RJ="la-tartine",SJ="feed/http://www.boston.com/bigpicture/index.xml",TJ="big-picture-blog";
uJ.prototype.jL=function () {
	var a=Fk(IJ);
	wA(J(JJ),a);
	a=Fk(KJ);
	wA(J(LJ),a);
	a=Fk(MJ);
	wA(J(NJ),a);
	a=Fk(OJ);
	wA(J(PJ),a);
	a=Fk(QJ);
	wA(J(RJ),a);
	a=Fk(SJ);
	wA(J(TJ),a)
};
vm.GA=new xH(vJ);
vm.HA=new xH(uJ);
vm.FA=new xH(Cx);
var UJ=e,VJ=1,WJ="loading-area";
function Up(a) {
	VJ++;
	a=J(WJ,a);
	x(a,Q);
	w(document.body,zy);
	if(!UJ) {
		a.style.marginLeft=a.offsetWidth/-2+yt;
		UJ=i
	}
}function uy(a) {
	VJ>0&&VJ--;
	if(VJ==0) {
		w(J(WJ,a),Q);
		x(document.body,zy)
	}
}function Z(a,b,c,d) {
	XJ(a,b,c,d)
}var YJ;
function XJ(a,b,c) {
	YJ&&window.clearTimeout(YJ);
	var d=J(ZJ);
	J($J).innerHTML=a;
	d.className=b.className;
	if(b!=DI) {
		a=c||7;
		YJ=window.setTimeout(t(w,d,Q),a*1000)
	}
}var Ss={
	className:"info-message"
},DI={
	className:"progress-message"
},Kq={
	className:"error-message"
};
var aK='className="';
function vz(a,b,c,d) {
	return [Fz,Gz,Hz,Iz,Jz,Kz,b,Lz,Mz,c,Nz,Oz,Pz,Qz,Rz,Sz,a,Qi,Tz,d?aK+d+Wz:n,Kz,b,Lz,Mz,c,Lz,Vz,dm,a,Wz,Xz,Yz,Zz,$z,aA,bA,cA,dA,eA].join(n)
}function wA(a,b,c,d) {
	a.href=b.Oi(d);
	b=t(bK,b,c);
	return U(a,T,b)
}
function bK(a,b,c) {
	c.preventDefault();
	b&&b();
	Dm(a)
}var cK=h;
function dK(a) {
	if(!cK)cK=document.title;
	document.title=cK+(a?o+a:n)
}
var eK=u('You have been signed out of Reader. <a href="{$link}">Sign back in.</a>',{
	link:_LOGIN_URL
}),fK="The feed being requested cannot be found.",gK={
	400:fK,401:eK,403:"You don&#39;t have permission to view this feed.",404:fK,500:"Sorry, an unexpected condition has occurred which is preventing Google Reader from fulfilling the request."
},hK="You have read all of the items shared by %1.",iK="&quot;%1&quot; has no unread items.",jK="&quot;%1&quot; has no items.";
function kK(a,b,c) {
	var d=b.ad;
	if(d&&d in gK) {
		c(gK[d],e);
		return
	}var f=a.Wp(R.vd());
	if(a.Eb()) {
		a=f?a.oa.op(hK):a.oa.op(Od);
		c(a,f)
	}else if(a.J.Ka&&a.Zc()) {
		b=f?lK:mK;
		c(a.rb().rh(b),f)
	}else {
		var g=f?iK:jK;
		Zk.Xc(a,b,function (k) {
			c(O(g,k),f)
		})
	}
}var nK="dialogHeight:140px;dialogWidth:400px;scroll:no;status:no;unadorned:yes";
function oK(a,b) {
	if(H.ii()) {
		a={
			_message:a,_initialValue:b,_newValue:h
		};
		window.showModalDialog(_PROMPT_URL,a,nK);
		return a._newValue
	}else return window.prompt(a,b)
}
function pK(a,b,c,d) {
	this.L=a;
	this.Gp=b;
	this.pt=c;
	this.WL=b.length;
	for(var a=0;b=this.Gp[a];a++)U(b,T,r(this.wr,this,a));d&&this.wr(d)
}pK.prototype.R=function () {
	return this.L
};
var qK="tab-header-selected";
pK.prototype.wr=function (a) {
	for(var b=0;b<this.Gp.length;b++) {
		var c=this.pt[b];
		y(this.Gp[b],qK,b==a);
		y(c,Q,b!=a)
	}
};
var rK="chart-data",sK="map",tK="rect";
pK.prototype.Rl=function (a,b) {
	a=this.pt[a];
	var c=M(a,rK,Xm),d=b||Yp(c.value);
	if(!d)return ;
	a.getElementsByTagName(So)[0].src=d.chartUrl;
	var f=a.getElementsByTagName(sK)[0];
	qi(f);
	var g=new Tq;
	g.va(function () {
		var k=Yp(g.text);
		for(var l=0,p;p=k.chartshape[l];l++) {
			if(!(p.name in d.chartValues))continue;
			var s=d.chartValues[p.name];
			p=ni(tj,{
				shape:tK,alt:s,title:s,coords:p.coords
			});
			f.appendChild(p)
		}
	});
	g.N(d.chartJsonUrl)
};
var uK="tab-group",vK="tab-header",wK="tab-contents";
function gI(a,b) {
	a=Zh(C,uK,a);
	var c=[];
	for(var d=0,f;f=a[d];d++) {
		var g=Zh(C,vK,f),k=Zh(C,wK,f);
		c.push(new pK(f.id,g,k,b))
	}return c
}var xK="dl",yK="dt",zK="dd";
function AK(a,b) {
	var c=N(Vy);
	c.innerHTML=a;
	a=c.getElementsByTagName(xK);
	var c=n,d=n;
	for(var f=0;f<a.length;f++) {
		d=a[f];
		for(var g=d.firstChild;g;g=g.nextSibling) {
			if(g.nodeName.toLowerCase()==yK)c=g.innerHTML;
			if(g.nodeName.toLowerCase()==zK) {
				d=g.innerHTML;
				b[c](c,d)
			}
		}
	}
}function BK(a,b,c) {
	a.innerHTML=c;
	x(a,Q)
}
var CK="feed-result-row",DK="result-title",EK="folder-chooser";
function qI(a) {
	var b=[],c=rj(a);
	a=c[CK];
	var d=c.result,f=c.subscribe,g=c[DK],k=c.view,l=c.unsubscribe,p=c[EK];
	c=c.dismiss;
	if(a)for(var s=0,A;A=a[s];s++)b.push({
		LJ:A,Om:d[s],Lz:f[s],uA:k[s],kA:l[s],tu:p[s],Xz:g[s],GC:c?c[s]:h
	});
	return b
}var FK="BackgroundImageCache";
function GK() {
	if(H.Kc()&&!H.ii())try{
		document.execCommand(FK,e,i)
	}catch(a) {
	}
}function HK(a) {
	this.Ae=a
}
HK.prototype.send=function (a) {
	try{
		var b=new Tq;
		b.Pw(e);
		b.va(function (d) {
			a(d.Mw())
		});
		b.Va(function () {
			a(e)
		});
		b.N(this.Ae)
	}catch(c) {
		a(e)
	}
};
var IK=h;
function JK(a) {
	IK=a
}function Tq() {
	this.Ej=i;
	this.sc=this.PE();
	this.jK(i);
	this.Pw(i);
	this.aA=0;
	this.Jz=this.lx=e
}var KK;
m=Tq.prototype;
m.kx=function (a) {
	this.lx=i;
	this.AH=a
};
var LK="Msxml2.XMLHTTP";
m.PE=function () {
	try{
		return new XMLHttpRequest
	}catch(a) {
		return new ActiveXObject(LK)
	}
};
m.va=function (a) {
	this.al=a
};
m.Va=function (a) {
	this.Ei=a
};
m.gz=function (a) {
	this.Jz=a
};
m.Pw=function (a) {
	this.sN=a
};
var MK="HEAD";
m.MG=function () {
	return this.vj==MK||this.Em.indexOf(fb)!=-1
};
m.getResponseHeader=function (a) {
	try{
		return this.sc.getResponseHeader(a)
	}catch(b) {
		return h
	}
};
m.setTimeout=function (a) {
	this.Uz=a
};
m.clearTimeout=function () {
	this.Vz&&window.clearTimeout(this.Vz)
};
m.uF=function () {
	this.status==401&&IK&&IK();
	var a=parseInt(this.status,10);
	return a==0||(this.Jz?a!=200:a>=400)
};
var NK="X-Reader-Google-Bad-Token",OK="END";
m.jK=function (a) {
	if(a) {
		this.$n=i;
		var b=this;
		this.sc.onreadystatechange=function () {
			if(b.sc.readyState==4) {
				b.clearTimeout();
				if(b.getResponseHeader(NK)==q) {
					b.rM();
					return
				}if(!b.rt()||b.uF()) {
					if(b.Ei) {
						b.qj();
						b.Ei()
					}return
				}b.log(OK,e,i);
				b.al&&b.al(b)
			}
		}
	}else this.$n=e
};
m.rM=function () {
	if(this.aA>=5)return ;
	this.aA++;
	_COMMAND_TOKEN_EXPIRES=0;
	window.setTimeout(r(this.Tb,this,this.Em,this.EI),0)
};
m.rt=function () {
	try{
		this.status=this.sc.status;
		this.document=this.sc.responseXML;
		this.text=this.sc.responseText;
		return i
	}catch(a) {
		return e
	}
};
var PK="ck",QK="client";
m.fL=function (a) {
	this.Em=a;
	if(this.Ej) {
		var b=Wj();
		a=P(a,PK,b)
	}a=P(a,QK,Um);
	this.fi=a=bk(a)
};
var RK="GET";
m.N=function (a) {
	this.kw(a,RK,h)
};
var SK="T";
m.Tb=function (a,b) {
	this.EI=b;
	var c=this;
	TK(function (d) {
		c.kw(a,Fo,Qj(b,SK,d))
	})
};
var UK="Content-Type",VK="application/x-www-form-urlencoded",WK="Content-Length";
m.PK=function (a) {
	try{
		this.sc.setRequestHeader(UK,VK);
		H.Og()&&this.sc.setRequestHeader(WK,a.length)
	}catch(b) {
		this.qj(b.message)
	}
};
var XK="Failed a request via ",YK=" for ";
m.qj=function (a) {
	var b=XK+this.vj.toUpperCase()+YK+this.Em;
	if(a)b+=tf+a
};
var ZK="No URL was supplied.";
m.kw=function (a,b,c) {
	this.vj=b;
	a?this.fL(a):this.qj(ZK);
	KK&&KK(this);
	if(this.Uz) {
		var d=this;
		this.Vz=window.setTimeout(function () {
			d.abort();
			d.Ei()
		},this.Uz)
	}if($K) {
		var d=this;
		$K(this,function (f) {
			if(f)d.send(c);
			else {
				d.clearTimeout();
				d.qj()
			}
		})
	}else this.send(c)
};
m.send=function (a) {
	try{
		this.sc.open(this.vj,this.fi,this.$n);
		this.vj==Fo&&this.PK(a);
		this.log(this.vj);
		this.ve=Wj();
		this.sc.send(a)
	}catch(b) {
		if(this.Ei) {
			this.qj();
			this.Ei()
		}return
	}if(!this.$n) {
		this.rt();
		this.al&&this.al()
	}
};
m.abort=function () {
	this.sc.onreadystatechange=function () {
	};
	this.sc.abort();
	this.clearTimeout()
};
m.Mw=function () {
	try{
		return !(this.sc.status!=200)
	}catch(a) {
		return e
	}
};
m.log=function (a,b,c) {
	a=Wj()-this.ve;
	c&&this.lx&&window.setTimeout(t(Op,this.AH,a*1000,0.05),1000)
};
function aL(a) {
	var b=new Tq;
	b.kx(Fc);
	b.va(function (c) {
		bL(c.text);
		a&&a(_COMMAND_TOKEN)
	});
	b.N(Fa)
}function TK(a) {
	if(Wj()>_COMMAND_TOKEN_EXPIRES)aL(a);
	else a&&a(_COMMAND_TOKEN)
}
function bL(a) {
	_COMMAND_TOKEN=a;
	_COMMAND_TOKEN_EXPIRES=Wj()+1800000
}var $K=h;
function cL(a) {
	$K=a
}function dL(a) {
	var b=new Tq;
	b.va(function () {
		eval(oh+b.text+ph).userId!=_USER_ID&&eL(a)
	});
	b.Va(eL);
	b.N(Xa)
}function fL(a,b) {
	var c=new Tq;
	c.va(t(gL,a,b));
	c.Va(eL);
	c.N(Xa)
}var hL="email-address";
function gL(a,b,c) {
	if(!c.Mw()) {
		eL();
		return
	}c=eval(oh+c.text+ph);
	if(c.userId!=_USER_ID) {
		J(hL).innerHTML=c.userEmail;
		b(c.userId)
	}_USER_ID=c.userId;
	_USER_PROFILE_ID=c.userProfileId;
	_USER_EMAIL=c.userEmail;
	_IS_BLOGGER_USER=c.isBloggerUser;
	b=Fk(_INPUT_STREAM_ID);
	if(b.J.Ka) {
		b=b.rb();
		if(b.type==qb&&b.getName()==xb) {
			b.$j(_USER_ID);
			_INPUT_STREAM_ID=Ek(b).streamId
		}
	}R.$j(_USER_ID);
	a()
}var iL="https://www.google.com/accounts/Logout?nui=1&service=reader";
function eL(a) {
	a&&a();
	window.location.href=_LOGIN_URL?_LOGIN_URL:iL
}function jL() {
}var kL="progress-bar";
jL.prototype.C=function (a) {
	this.Fk=lL({
		GF:a,label:this.gv(0)
	});
	this.Vs=new KF;
	this.Vs.ka(M(this.Fk,kL))
};
var mL="progress-bar-label";
jL.prototype.ye=function (a) {
	this.Vs.Xb(a);
	M(this.Fk,mL).innerHTML=this.gv(a)
};
var nL="%1% completed. Please wait...";
jL.prototype.gv=function (a) {
	return O(nL,a)
};
function oL(a,b,c,d,f) {
	this.$d=a;
	this.UJ=b;
	this.mb=c;
	this.Vg=d;
	this.xG=f;
	this.ma=h
}m=oL.prototype;
m.jD=function () {
	if(this.Ul)return ;
	this.mb(0,this.$d);
	var a=this;
	this.tv([Tk()],this.$d,function (b) {
		a.fJ=b;
		a.xH=i
	});
	this.tv([Ek(R.xd()),Uk(),Ek(R.Zf())],this.UJ,function (b) {
		a.TJ=b;
		a.yH=i
	});
	this.vA()
};
var pL="offsync";
m.tv=function (a,b,c) {
	b=[[Cn,b],[pL,q]];
	for(var d=0,f;f=a[d];d++)b.push([gp,f.streamId]);a=qa+Xg+Xj(b);Pq(a,function (g) {
		c(g.itemRefs)
	})
};
m.vA=function () {
	if(!this.xH||!this.yH) {
		window.setTimeout(r(this.vA,this),50);
		return
	}var a={
	},b=[];
	function c(d) {
		for(var f=0,g;g=d[f];f++)if(!(g.id in a)) {
			b.push(g);
			a[g.id]=g
		}else if(g.directStreamIds) {
			var k=g.directStreamIds,l=a[g.id].directStreamIds;
			if(!l)l=a[g.id].directStreamIds=[];
			for(var g=0,p;p=k[g];g++)Oe(l,p)==-1&&l.push(p)
		}
	}c(this.fJ);c(this.TJ);this.nD(b)
};m.nD=function (a) {
	if(this.Ul)return ;
	this.$d=a.length;
	var b=Math.ceil(this.$d/100);
	this.fc=[];
	this.Ia=[];
	this.aD=a;
	this.ju(0,b)
};
var qL="i=",rL="&i=";
m.ju=function (a,b) {
	if(this.Ul)return ;
	var c=a*100,d=(a+1)*100;
	this.GM(c-1);
	var f;
	if(d>=this.$d) {
		d=this.$d;
		f=r(this.xD,this)
	}else f=r(this.ju,this,a+1,b);
	var g=this.aD.slice(c,d),k=new Tq,l=this;
	k.Va(r(this.rw,this));
	k.va(function () {
		if(l.Ul)return ;
		l.fc.push(k.text);
		var p=(new rq(k.text)).Ri();
		for(var s=0,A;A=p[s];s++) {
			var I=g[s];
			if(I.directStreamIds)for(var L=0,K;K=I.directStreamIds[L];L++) {
				K=Sk(K);
				A.yk(K)
			}l.Ia.push(A)
		}f()
	});
	a=[];
	for(var b=0;c=g[b];b++)a.push(c.id);a=qL+a.join(rL);b=P(sa,pL,q);k.Tb(b,
	a)
};m.GM=function (a) {
	this.mb(a+1,this.$d)
};
m.rw=function (a) {
	this.Ul=i;
	a||this.xG(this.Ia)
};
m.xD=function () {
	this.mb(this.$d,this.$d);
	this.Vg(this.Ia)
};
function sL(a) {
	this.h=a;
	this.Au=new tL;
	this.ec=[];
	this.Ia=[];
	this.Bq()
}m=sL.prototype;
m.Bh=function () {
	return e
};
m.abort=function () {
};
m.Rv=function () {
	return i
};
m.Pu=function (a) {
	if(a<0||a>=this.mh())return h;
	if(a>=this.Ia.length) {
		var b=a;
		if(b%40!=0||b==0)b+=40-b%40;
		if(b>=this.ec.length)b=this.ec.length;
		this.uH(this.Ia.length,b+1)
	}return this.Ia[a]
};
m.lh=function (a,b) {
	b(this.Pu(a))
};
m.mh=function () {
	return this.ec.length
};
m.Ze=function (a) {
	Zk.Xc(this.h,h,a)
};
m.pl=function (a) {
	a(h)
};
m.Bj=function (a) {
	a()
};
m.Bq=function () {
	var a=this;
	this.Au.iE(this.h.streamId,!this.h.Wp(R.vd()),function (b) {
		a.ec=b
	})
};
m.uH=function (a,b) {
	var c=this;
	this.Au.Ri(this.ec.slice(a,b),function (d) {
		c.Ia=c.Ia.concat(d)
	})
};
function uL() {
	try{
		this.bh=ID()
	}catch(a) {
	}
}m=uL.prototype;
m.RG=function () {
	return Boolean(this.bh)
};
m.QG=function () {
	return Boolean(this.bh)&&this.bh.hasPermission
};
var vL="Google Reader",wL="/reader/ui/573007822-app-icon-32.png";
m.getPermission=function () {
	return this.bh.getPermission(vL,wL)
};
var xL="beta.database",yL="1.0";
m.VD=function () {
	try{
		return this.bh.create(xL,yL)
	}catch(a) {
		return h
	}
};
var zL="beta.localserver";
m.kE=function () {
	try{
		return this.bh.create(zL,yL)
	}catch(a) {
		return h
	}
};
m.cI=function (a) {
	return a.replace(/[^a-zA-Z0-9\.\-@_]/g,n)
};
var AL="reader_offline=";
function BL(a) {
	this.r=a;
	this.sA=parseInt(_USER_ID,10).toString (16);
	this.hr=AL+this.sA;
	this.DH=eb;
	this.tg=CL.kE();
	this.tJ()
}m=BL.prototype;
var DL="reader_offline",EL="/reader/";
m.SK=function () {
	Dr(DL,this.sA,31536000000,EL)
};
m.open=function () {
	if(!this.tg)return ;
	this.SK();
	if(!this.rj)try{
		this.createManagedStore()
	}catch(a) {
	}try{
		this.rj.manifestUrl=this.DH;
		this.tg.openManagedStore(this.r,this.hr)
	}catch(a) {
	}
};
m.createManagedStore=function () {
	this.rj=this.tg.createManagedStore(this.r,this.hr)
};
m.XG=function () {
	try{
		return this.rj.updateStatus==0||this.rj.updateStatus==3
	}catch(a) {
		return e
	}
};
var FL="offline-update-refresh";
m.ye=function () {
	var a=this.rj,b=a.currentVersion;
	a.checkForUpdate();
	var c=this,d=window.setInterval(function () {
		if(c.XG()) {
			window.clearInterval(d);
			if(!(a.updateStatus==3)) {
				var f=a.currentVersion;
				if(b&&b!=n&&b!=f) {
					Z(GL(),Ss,30);
					J(FL).onclick=function () {
						window.location.reload(i)
					}
				}
			}
		}
	},1000)
};
m.tJ=function () {
	this.tg.removeManagedStore(this.r);
	this.tg.removeStore(this.r)
};
m.canServeLocally=function (a) {
	return this.tg.canServeLocally(a)
};
m.ir=function () {
	this.tg.removeManagedStore(this.r,this.hr)
};
function _FR_z() {
	HL.ir();
	IL();
	JL(e);
	Bs(e)
}function _FR_r() {
	HL.ir()
}function tL() {
}m=tL.prototype;
m.ID=function (a,b,c) {
	this.Ci=a;
	this.mb=b;
	this.Vg=c;
	this.cA=new KL(LL);
	this.go=Math.ceil(a.length/250);
	this.mb(0,this.Ci.length);
	this.zs(0)
};
m.zs=function (a) {
	var b=a*250,c=this.Ci.slice(b,(a+1)*250);
	this.mb(b,this.Ci.length);
	for(var b=0,d;d=c[b];b++)this.eB(d);a++;if(a>=this.go) {
		this.mb(this.Ci.length,this.Ci.length);
		this.Vg(this.cA);
		return
	}window.setTimeout(r(this.zs,this,a),10)
};
m.eB=function (a) {
	var b=this.rl(a),c=a.kc.h.streamId;
	if(a.Vm().length>104585)return ;
	var d=this.cA,f=this.KE(a);
	for(var g=0,k;k=f[g];g++)d.ki(this.uv(b,k));d.ki(this.uv(b,c));d.ki(this.av(a))
};m.rl=function (a) {
	a=a.R().split(ch);
	return a[a.length-1]
};
m.hE=function (a) {
	return a.lg()?1:0
};
m.KE=function (a) {
	var b=[];
	a=a.fd;
	for(var c=0,d;d=a[c];c++)b.push(d.O());return b
};var ML="REPLACE INTO ",NL=" (itemDocId, streamId) VALUES(?,?)";m.uv=function (a,b) {
	var c=new OL(ML+LL.Bf.r+NL);
	c.Kb([a,b]);
	return c
};
var PL="SELECT ",QL=".itemDocId FROM ",RL=" LEFT JOIN ",SL=" ON ",TL=".itemDocId=",UL=".itemDocId WHERE ",VL=".streamId = ?",WL=" AND ",XL=".isRead = 0",YL=" ORDER BY ",ZL=".timestampMsec DESC",$L="itemDocId";
m.iE=function (a,b,c) {
	var d=LL.Bf.r,f=LL.ne.r;
	d=PL+d+QL+d+RL+f+SL+d+TL+f+UL+d+VL;
	b||(d+=WL+f+XL);
	d+=YL+f+ZL;
	b=new OL(d);
	b.Kb([a]);
	b.zf(function (g) {
		var k=[];
		if(g)while(g.isValidRow()) {
			k.push(g.fieldByName($L));
			g.next()
		}c(k)
	});
	b.ua(LL)
};
var aM="SELECT COUNT(*) as c, ",bM=".streamId as s FROM ",cM=".itemDocId = ",dM=".isRead = 0 GROUP BY ",eM=".streamId";
m.NE=function (a) {
	var b=LL.Bf.r,c=LL.ne.r;
	b=new OL(aM+b+bM+b+RL+c+SL+b+cM+c+UL+c+dM+b+eM);
	b.zf(function (d) {
		var f=[];
		if(d)while(d.isValidRow()) {
			f.push({
				id:d.fieldByName(gp),count:d.fieldByName(KA)
			});
			d.next()
		}a(f)
	});
	b.ua(LL)
};
var fM=" (streamId, itemDocId) VALUES(?,?)",gM="DELETE FROM ",hM=" WHERE streamId = ? AND itemDocId = ?";
m.LM=function (a,b,c) {
	c=c?new OL(ML+LL.Bf.r+fM):new OL(gM+LL.Bf.r+hM);
	c.Kb([b.O(),this.rl(a)]);
	c.ua(LL)
};
var iM="UPDATE ",jM=" SET isRead = ?  WHERE itemDocId = ?";
m.FM=function (a,b) {
	var c=new OL(iM+LL.ne.r+jM);
	c.Kb([b?1:0,this.rl(a)]);
	c.ua(LL)
};
m.EM=function (a) {
	this.av(a).ua(LL)
};
var kM=" (itemDocId, sourceStreamId, timestampMsec, timestampScrubber, isRead, content) VALUES(?,?,?,?,?,?)";
m.av=function (a) {
	var b=this.rl(a),c=a.kc.h.streamId,d=a.st,f=this.hE(a);
	a=a.Vm();
	var g=new OL(ML+LL.ne.r+kM);
	g.Kb([b,c,d,0,f,a]);
	return g
};
var lM="SELECT content FROM ",mM=" WHERE itemDocId in (",nM=") ORDER BY timestampMsec DESC";
m.Ri=function (a,b) {
	var c=new OL(lM+LL.ne.r+mM+oM(a)+nM);
	c.Kb(a);
	c.zf(function (d) {
		var f=[];
		if(d)while(d.isValidRow()) {
			var g=d.fieldByName(Vn);
			g=qq(g);
			f.push(g);
			d.next()
		}b(f)
	});
	c.ua(LL)
};
var pM={
	L:"entry-fetches",wg:50
},qM={
	L:"entry-inserts",wg:25
},rM={
	L:"entry-queries",wg:20
},sM={
	L:"edit-tags-enable",wg:1
},tM={
	L:"prefs",wg:4
},uM={
	L:"edit-tags-disable",wg:100
};
function vM(a) {
	this.bt=a
}v(vM,jL);
var wM="Status: ";
vM.prototype.C=function (a) {
	jL.prototype.C.call(this,wM+a);
	this.Fb=0;
	this.Sj=h;
	this.ZA();
	xM.open(this.Fk)
};
var yM="link cancel-progress";
vM.prototype.ZA=function () {
	var a=N(C,{
		"class":yM
	});
	a.innerHTML=LC;
	Tm(a,{
		event:T,$:this.bt
	});
	this.Fk.appendChild(a)
};
vM.prototype.at=function () {
	this.bt()
};
vM.prototype.ye=function (a,b,c) {
	if(this.Sj&&this.Sj.L!=a.L)this.Fb+=this.Sj.wg;
	this.Sj=a;
	a=Math.ceil(this.Sj.wg*(b/c))+this.Fb;
	jL.prototype.ye.call(this,a)
};
var zM=h,AM=h,BM=new tL,CM,DM;
function Cm(a,b) {
	if(!EM) {
		a(e);
		return e
	}if(zM!=h&&!b) {
		a(Boolean(zM));
		return i
	}FM(a)
}function GM(a) {
	zM=a
}var HM="is-connected",IM="is-disconnected",JM="scour";
function KM(a) {
	if(a>10000)return ;
	if(document.body&&J(HM)&&J(IM)) {
		y(document.body,JM,Boolean(zM));
		LM(zM);
		MM()
	}else window.setTimeout(t(KM,!a?200:a+200),a)
}var NM="is-syncing";
function LM(a) {
	var b=!a;
	a=a;
	Sj(J(NM),AM);
	if(AM) {
		a=b=e
	}Sj(J(HM),b);
	Sj(J(IM),a)
}var OM=new HK(fb),PM=e;
function QM(a) {
	PM=a
}
function FM(a) {
	if(PM) {
		window.setTimeout(t(RM,a),50);
		return
	}QM(i);
	OM.send(function (b) {
		b=!b;
		GM(b);
		b?a(b):fL(t(a,b),SM);
		QM(e)
	})
}function RM(a) {
	PM?window.setTimeout(t(RM,a),50):a(zM)
}Ym(function (a) {
	if(TM) {
		if((a=a.target)&&a.id==IM) {
			UM(e);
			xM.close();
			VM();
			return
		}
	}return xM&&xM.Bc()&&!AM?[xM.tj,xM.sj,xM.sv()]:h
},function () {
	xM.close()
});
Lm(function () {
	xM&&xM.Bc()&&xM.hy()
});
function WM() {
	this.eq=e
}m=WM.prototype;
m.C=function () {
	var a=this.sj=XM(),b=this.tj=YM();
	document.body.appendChild(a);
	document.body.appendChild(b);
	LM(zM);
	this.hy()
};
m.hy=function () {
	var a=this.sv();
	a=Kt(a);
	var b=a.top+a.height;
	this.sj.style.top=b+yt;
	this.sj.style.left=a.left+yt;
	this.tj.style.top=b+3+yt;
	this.tj.style.left=a.left+3+yt
};
var ZM="global-info",$M="offline-status";
m.sv=function () {
	return M(J(ZM),$M)
};
m.Bc=function () {
	return this.eq
};
m.close=function () {
	if(!this.Bc())return ;
	B(this.sj);
	B(this.tj);
	this.eq=e
};
var aN="scour-menu-container",bN="scour-menu-contents";
m.open=function (a) {
	if(this.Bc()&&!AM) {
		this.close();
		return
	}if(J(aN))J(bN).innerHTML=n;
	else this.C();
	J(bN).appendChild(a);
	a=Kt(this.sj);
	var b=this.tj;
	b.style.width=a.width+yt;
	b.style.height=a.height+yt;
	this.eq=i
};
var xM=new WM;
function JL(a,b) {
	if(a&&!b&&!cN()) {
		window.setTimeout(dN,500);
		return
	}eN();
	AM=e;
	if(a&&fN) {
		Op(Dc,(Wj()-fN)*1000,0.25);
		fN=h
	}GM(a);
	if(!a&&gN) {
		Op(Ec,(Wj()-gN)*1000,0.25);
		gN=h
	}KM();
	hN();
	if(!b) {
		a=X.f();
		a=!a||a.Eb()||a.ha();
		X.V||a?Ts(iN):X.u();
		Y.u()
	}
}function jN(a) {
	Wj();
	a.Un(function (b,c) {
		kN.ye(qM,b,c)
	});
	a.bB(function () {
		if(!AM)return ;
		Bs(i,function () {
			Wj();
			LL.lk.Un(function (b,c) {
				kN.ye(tM,b,c)
			});
			LL.lk.be(function () {
				JL(i)
			})
		})
	});
	a.ua()
}
function lN(a) {
	Wj();
	BM.ID(a,function (b,c) {
		kN.ye(rM,b,c)
	},function (b) {
		DM=b;
		jN(b)
	})
}function eN() {
	xM&&xM.close()
}var fN=h,gN=h,mN="Downloading %1 items...",nN="Offline mode is already enabled.",oN="Synchronizing your items has failed.";
function pN() {
	if(AM)return ;
	eN();
	qN(i);
	Ds(function (a) {
		a&&Es(e)
	});
	Oq(function (a) {
		if(a) {
			kN.C(O(mN,2000));
			Cm(function (b) {
				if(b) {
					Z(nN,Kq);
					xM.close();
					return
				}CL.getPermission();
				rN();
				AM=i;
				fN=Wj();
				LM(b);
				try{
					sN(sM,function () {
						tN.xn()||tN.C();
						LL.clear();
						LL.C();
						CM=new oL(2000,50,uN,t(vN,Wj()),wN);
						CM.jD()
					})
				}catch(c) {
					AM=e;
					LM(b);
					Z(oN,Kq)
				}
			})
		}else {
			xN();
			return
		}
	})
}function wN() {
	Cm(function (a) {
		yN(a)
	})
}function vN(a,b) {
	uN(b.length,b.length);
	window.setTimeout(t(lN,b),10)
}function uN(a,b) {
	kN.ye(pM,a,b)
}
function sN(a,b) {
	try{
		zN(a,b)
	}catch(c) {
		b()
	}
}var AN="Synchronizing...";
function VM() {
	if(AM)return ;
	eN();
	qN(e);
	kN.C(AN);
	Cm(function (a) {
		if(a)return ;
		AM=i;
		gN=Wj();
		LM(a);
		try{
			sN(uM,function () {
				LL.ZB();
				JL(e);
				Bs(e);
				Fs(function (c) {
					c&&Gs(e)
				})
			})
		}catch(b) {
			AM=e;
			LM(a);
			Z(oN,Kq)
		}
	},i)
}function BN() {
	AM=e;
	Cm(function (a) {
		try{
			CM.rw(i)
		}catch(b) {
		}try{
			DM.at()
		}catch(b) {
		}xM.close();
		LM(a)
	})
}var kN=new vM(BN);
function CN(a) {
	this.Ct=CL.cI(a);
	this.bs=[];
	try{
		this.create();
		this.open()
	}catch(b) {
		j(Error('Could not open offline database, "'+this.Ct+'"\n'+b.message))
	}
}m=CN.prototype;
m.create=function () {
	this.zo=CL.VD()
};
m.close=function () {
	this.zo.close()
};
m.open=function () {
	this.zo.open(this.Ct)
};
m.C=function () {
	this.IM();
	this.xC()
};
var DN="schemas_master",EN="TEXT",FN=" (tableName, fieldMap) VALUES(?,?)";
m.IM=function () {
	this.zy=new GN(DN,this,{
		tableName:{
			P:EN,Iw:i
		},fieldMap:{
			P:EN
		}
	});
	this.zy.create();
	for(var a=0,b;b=this.bs[a];a++)if(this.zF(b)) {
		b.od();
		b.create();
		var c=new OL(ML+this.zy.r+FN);
		c.Kb([b.r,b.ov()]);
		c.ua(this)
	}
};
var HN="SELECT fieldMap FROM schemas_master WHERE tableName=?",IN="fieldMap";
m.zF=function (a) {
	var b=i,c=new OL(HN);
	c.Kb([a.r]);
	c.zf(function (d) {
		if(d&&d.isValidRow())b=d.fieldByName(IN)!=a.ov()
	});
	c.ua(this);
	return b
};
m.ni=function (a) {
	this.bs.push(a);
	return a
};
m.xC=function () {
	for(var a=0,b;b=this.bs[a];a++)b.create()
};m.execute=function (a,b,c) {
	try{
		var d=new OL(a);
		b&&d.Kb(b);
		c&&d.zf(c);
		d.ua(this);
		return i
	}catch(f) {
		j(Error("Could not execute the following: "+a+tf+f.message))
	}
};
var JN="GR-global",KN="users",LN="PRIMARY KEY (id, hostname)";
function MN() {
	try{
		CN.call(this,JN)
	}catch(a) {
		return this
	}this.In=this.ni(new GN(KN,this,{
		id:{
			P:EN
		},email:{
			P:EN
		},hostname:{
			P:EN
		}
	},LN))
}v(MN,CN);
MN.prototype.xn=function () {
	return this.In.Fi()
};
MN.prototype.clear=function () {
	this.In.od()
};
var NN=" (id,email,hostname) VALUES(?,?,?)";
MN.prototype.C=function () {
	MN.d.C.call(this);
	var a=new OL(ML+this.In.r+NN);
	a.Kb([ON(_USER_ID),_USER_EMAIL,Hn]);
	var b=new KL(this);
	b.ki(a);
	b.ua()
};
var PN="items",QN="INTEGER",RN="streams",SN="PRIMARY KEY (itemDocId, streamId)",TN="edittagrequests",UN="streamId";
function VN(a) {
	var b=e;
	try{
		CN.call(this,a)
	}catch(c) {
		b=i
	}if(!b) {
		this.ne=this.ni(new GN(PN,this,{
			itemDocId:{
				P:EN,Iw:i
			},sourceStreamId:{
				P:EN
			},timestampMsec:{
				P:QN
			},timestampScrubber:{
				P:QN
			},isRead:{
				P:QN
			},content:{
				P:EN
			}
		}));
		this.Bf=this.ni(new GN(RN,this,{
			itemDocId:{
				P:EN
			},streamId:{
				P:EN
			}
		},SN));
		this.Bi=this.ni(new GN(TN,this,{
			itemDocId:{
				P:EN
			},sourceStreamId:{
				P:EN
			},tagId:{
				P:EN
			},action:{
				P:QN
			},timestampMsec:{
				P:QN
			}
		}));
		this.lk=this.ni(new WN(this));
		this.Tw=new XN(this.ne,this,[$L]);
		this.Iz=new XN(this.Bf,this,
		[UN])
	}
}v(VN,CN);
VN.prototype.ZB=function () {
	this.Bi.reset()
};
VN.prototype.xn=function () {
	return this.ne.Fi()&&this.Bf.Fi()&&this.Bi.Fi()&&this.lk.Fi()
};
VN.prototype.clear=function () {
	this.ne.od();
	this.Bf.od();
	this.Bi.od();
	this.lk.od();
	this.Tw.od();
	this.Iz.od()
};
VN.prototype.C=function () {
	VN.d.C.call(this);
	this.Tw.create();
	this.Iz.create()
};
function OL(a) {
	this.Bz=a
}OL.prototype.Kb=function (a) {
	this.rf=a
};
OL.prototype.zf=function (a) {
	this.vy=a
};
OL.prototype.ua=function (a) {
	var b;
	try{
		b=a.zo.execute(this.Bz,this.rf?this.rf:h)
	}catch(c) {
		j(Error("Could not execute query: "+this.Bz+tf+c.message+(this.rf?"\nPARAMS:\n"+this.rf:n)))
	}this.vy&&this.vy(b);
	try{
		b.close()
	}catch(c) {
	}
};
var YN=",?";
function oM(a) {
	return (new Array(a.length+1)).join(YN).substring(1)
}function KL(a) {
	this.nd=a;
	this.uf=[]
}m=KL.prototype;
m.ki=function (a) {
	this.uf.push(a)
};
m.Un=function (a) {
	this.mb=a
};
m.bB=function (a) {
	this.Vg=a
};
var ZN="BEGIN";
m.ua=function () {
	this.go=Math.ceil(this.uf.length/1000);
	this.mb&&this.mb(0,this.uf.length);
	try{
		this.nd.execute(ZN)
	}catch(a) {
		j(Error("Could not run BEGIN for transaction: "+this.uf+tf+a.message))
	}this.xy(0)
};
var $N="COMMIT";
m.xy=function (a) {
	var b=a*1000,c=(a+1)*1000,d=this.nd;
	try{
		var f=this.uf.slice(b,c);
		for(var b=0,g;g=f[b];b++) {
			if(this.no)return ;
			try{
				g.ua(d)
			}catch(k) {
				this.kr(k.message);
				return e
			}
		}if(this.mb) {
			if(this.no)return ;
			this.mb(c,this.uf.length)
		}
	}catch(k) {
		this.kr(k.message);
		return
	}a++;
	if(a>=this.go) {
		if(this.mb) {
			a=this.uf.length;
			this.mb(a,a)
		}try{
			d.execute($N)
		}catch(k) {
			j(Error("Could not run COMMIT for transaction: "+this.uf+tf+k.message))
		}if(this.Vg) {
			if(this.no)return ;
			this.Vg()
		}return
	}window.setTimeout(r(this.xy,
	this,a),10)
};
var aO="ROLLBACK";
m.kr=function () {
	this.nd.execute(aO)
};
m.at=function () {
	this.no=i;
	try{
		this.kr()
	}catch(a) {
	}
};
var bO="_index";
function XN(a,b,c) {
	this.r=a.r+Su+c.join(Su)+bO;
	this.XL=a;
	this.nd=b;
	this.oD=c
}var cO="DROP INDEX ",dO="IF EXISTS ";
XN.prototype.od=function (a) {
	this.nd.execute(cO+(a?n:dO)+this.r)
};
var eO="CREATE INDEX ",fO="IF NOT EXISTS ";
XN.prototype.create=function (a) {
	this.nd.execute(eO+(a?n:fO)+this.r+SL+this.XL.r+oh+this.oD.join(gq)+ph)
};
function GN(a,b,c,d) {
	this.r=a;
	this.nd=b;
	this.mu=c;
	this.nt=d
}m=GN.prototype;
var gO="SELECT name FROM sqlite_master WHERE type='table' and name=?";
m.Fi=function () {
	var a=new OL(gO);
	a.Kb([this.r]);
	var b=e;
	a.zf(function (d) {
		b=d&&d.isValidRow()
	});
	try{
		a.ua(this.nd)
	}catch(c) {
	}return b
};
var hO="DROP TABLE ";
m.od=function (a) {
	(new OL(hO+(a?n:dO)+this.r)).ua(this.nd)
};
var iO="CREATE TABLE ";
m.create=function (a) {
	a=iO+(a?n:fO)+this.r+o+this.bE();
	(new OL(a)).ua(this.nd)
};
m.reset=function () {
	this.od();
	this.create()
};
m.ov=function () {
	return $p(this.mu)
};
var jO=" PRIMARY KEY",kO=" NOT NULL",lO=" UNIQUE";
m.bE=function () {
	var a=this.mu,b=[];
	b.push(oh);
	var c=0;
	for(var d in a) {
		c>0&&b.push(fa);
		b.push(d);
		var f=a[d];
		b.push(o+f.P);
		f.Iw&&b.push(jO);
		f.lN||b.push(kO);
		f.rN&&b.push(lO);
		c++
	}this.nt&&b.push(fa+this.nt);
	b.push(ph);
	return b.join(n)
};
var mO="tags",nO=[{
	bb:oa,ri:"prefs"
},{
	bb:ua,ri:"stream_prefs"
},{
	bb:ya,ri:Tx
},{
	bb:wa,ri:mO
},{
	bb:Ka,ri:Fx
}],oO={
};
for(var pO=0,qO;qO=nO[pO];pO++)oO[qO.bb]=qO.ri;
var rO="userdata",sO="INT",tO="PRIMARY KEY (id, page)";function WN(a) {
	GN.call(this,rO,a,{
		id:{
			definition:EN
		},page:{
			definition:sO
		},json:{
			definition:EN
		}
	},tO)
}v(WN,GN);
m=WN.prototype;
m.be=function (a) {
	this.Zq=0;
	this.qD=a;
	for(var b in oO)this.rD(b)
};var uO=" (id,page,json) VALUES(?,?,?)";m.Bb=function (a,b,c) {
	var d=new OL(ML+this.r+uO);
	d.Kb([oO[a],b+1,c.substring(b*104585,(b+1)*104585)]);
	return d
};
m.Un=function (a) {
	this.mb=a
};
var vO="?output=json";
m.rD=function (a) {
	var b=this,c=new Tq;
	c.va(function () {
		var d=new KL(LL),f=c.text,g=Math.round(f.length/104585);
		for(var k=0;k<=g;k++)d.ki(b.Bb(a,k,f));d.ua();b.Zq++;b.mb(b.Zq,nO.length);b.Zq>=nO.length&&b.qD()
	});c.N(a+vO)
};var wO="SELECT * FROM ",xO=" WHERE id=? ORDER BY page ASC";
m.OE=function (a,b) {
	a=a.indexOf(Xg)>0?a.substring(0,a.indexOf(Xg)):a;
	(a=oO[a])||b(h);
	LL.execute(wO+this.r+xO,[a],function (c) {
		var d=[];
		while(c.isValidRow()) {
			d.push(c.fieldByName(Vq));
			c.next()
		}c=d.join(n);
		if(sf(c))return ;
		b(eval(oh+c+ph))
	})
};
function yO(a,b,c,d) {
	for(var f=0,g;g=b[f];f++)zO(a,g,i);for(var f=0;g=c[f];f++)zO(a,g,e);Lq(a,b,c);(new tL).EM(a);d&&d()
}var AO="INSERT INTO ",BO=" (itemDocId, sourceStreamId, tagId, action, timestampMsec) VALUES(?,?,?,?,?)";
function zO(a,b,c) {
	var d=new OL(AO+LL.Bi.r+BO);
	d.Kb([a.R(),a.kc.h.streamId,b.O(),c?1:0,Wj()]);
	d.ua(LL);
	d=new tL;
	d.LM(a,b,c);
	b.G(R.vd())&&d.FM(a,c)
}var CO=" ORDER BY timestampMsec";
function zN(a,b) {
	try{
		LL.execute(wO+LL.Bi.r+CO,h,function (d) {
			DO(d,a,b)
		})
	}catch(c) {
		j(Error("Could not send offline requests. "+c.message))
	}
}var EO="sourceStreamId",FO="tagId";
function DO(a,b,c) {
	var d=0,f={
	},g={
	},k={
	};
	function l(gi,qU) {
		return (gi?GA:ca)+Kk+qU.O()
	}while(a.isValidRow()) {
		var p=a.fieldByName($L),s=a.fieldByName(EO),A=Sk(a.fieldByName(FO)),I=a.fieldByName(fv)==1,L=l(I,A);
		if(!(L in f)) {
			f[L]={
				oz:I,ei:A,qq:{
				}
			};
			d++
		}f[L].qq[p]=1;
		k[p]=s;
		var K=p+Kk+A.O();
		K in g||(g[K]={
			aH:p,FN:s,ei:A,Qn:0,oy:0
		});
		if(I)g[K].Qn++;
		else g[K].oy++;
		a.next()
	}if(d==0) {
		c();
		return
	}for(K in g) {
		var G=g[K];
		if(G.Qn==G.oy&&G.Qn>0) {
			function Jb(gi) {
				gi=l(gi,G.ei);
				delete f[gi].qq[G.aH]
			}Jb(i);
			Jb(e)
		}
	}var Kb=
	0;
	function nz() {
		Kb++;
		kN.ye(b,Kb,d);
		Kb>=d&&c()
	}for(var L in f) {
		a=f[L];
		g=[];
		s=[];
		for(var p in a.qq) {
			g.push(p);
			s.push(k[p])
		}if(g.length==0) {
			nz();
			continue
		}a=new Mq(s,g,a.oz?[a.ei]:[],a.oz?[]:[a.ei]);
		a.Qg(pL,q);
		a.exec(nz)
	}
}var GO=Math.pow(2,32),HO="Unread count computation took ",IO=" ms in queries";
function JO(a) {
	var b=Wj(),c=[];
	(new tL).NE(function (d) {
		c=d
	});
	aj(HO+(Wj()-b)+IO);
	b={
		max:GO,unreadcounts:[]
	};
	b.unreadcounts=c;
	a(b)
}var KO,LO;
function MO() {
	KO=new cD(h,i)
}function NO(a) {
	this.L=a
}
NO.prototype.C=function (a) {
	LO&&Cl(LO);
	a(KO)
};
NO.prototype.l=function (a,b) {
	LO=U(a,IC,b)
};
NO.prototype.display=function () {
	var a=KO;
	if(a.H()) {
		if(J(this.L))return ;
		a.B(e)
	}uy();
	a.B(i)
};
var OO="scour-disabled-element-error",PO="Google Reader is currently in offline mode.",QO="Go online",RO="Stay in offline mode";
function SO() {
	var a=new NO(OO);
	a.C(function (b) {
		b.Hb(PO);
		var c=new EC;
		c.set(QC,QO,i);
		c.set(JC,RO,e,i);
		b.Id(c);
		b.Vb(TO({
			QE:UO()
		}));
		a.l(b,function (d) {
			d.Ea==QC&&VM()
		})
	});
	a.display()
}
var VO="scour-not-connected-prompt",WO="Connection error.",XO="Start using offline mode",YO="Stay online",ZO="Unable to switch to online mode.",$O="Would you prefer to read in <b>offline mode</b>? It is possible that not all of the items available for download have been captured.";
function yN(a) {
	var b=new NO(VO);
	b.C(function (c) {
		c.Hb(WO);
		var d=new EC;
		a||d.set(QC,XO,i);
		d.set(JC,a?KC:YO,e,i);
		c.Id(d);
		c.Vb(aP({
			VA:a?ZO:$O
		}));
		b.l(c,function (f) {
			if(f.Ea==QC) {
				JL(i);
				return
			}f.Ea==JC&&Cm(function (g) {
				JL(g,i)
			})
		})
	});
	b.display()
}var bP="No Subscriptions Available";
function xN() {
	var a=new cD(h,i),b=new EC;
	b.set(QC,KC,i);
	a.Id(b);
	a.Hb(bP);
	a.Vb(cP());
	a.B(i)
}var dP="scour-no-sync=items-error",eP="No Items Available For Offline Mode";
function dN() {
	var a=new NO(dP);
	a.C(function (b) {
		b.Hb(eP);
		var c=new EC;
		c.set(QC,KC,i);
		b.Id(c);
		b.Vb(fP());
		a.l(b,function () {
		})
	});
	a.display()
}var CL=new uL,tN,LL,HL,Yq=_USER_ID&&CL.RG(),EM=Yq&&CL.QG(),gP=e,hP="You have not synchronized Google Reader for offline use, it cannot be used in offline mode.";
function iP() {
	aL();
	FM(function (a) {
		rN();
		var b=HL=new BL(ON(_USER_ID));
		b.open();
		Cm(function (c) {
			c||b.ye()
		});
		jP(b);
		ls();
		As(function (c) {
			var d=kP()&&cN();
			d&&c&&GM(i);
			if(!d&&a) {
				alert(hP);
				IL(i)
			}IL();
			KM();
			gP=i
		})
	})
}function lP() {
	KM();
	gP=i
}function mP() {
	gP=i
}
function jP(a) {
	cL(function (b,c) {
		if(b.MG()) {
			c(i);
			return
		}Cm(function (d) {
			if(!d) {
				c(i);
				return
			}d=b.Em;
			if(a.canServeLocally(d)) {
				b.fi=d;
				c(i)
			}else c(e)
		})
	});
	Eq(function (b,c,d,f) {
		Cm(function (g) {
			g?yO(b,c,d,f):Iq(b,c,d,f)
		})
	});
	gr(function (b) {
		Cm(function (c) {
			c||b()
		})
	});
	Zq(function (b,c,d,f) {
		Cm(function (g) {
			g?LL.lk.OE(b,c):Xq(b,c,d,f)
		})
	});
	Y.DK(function (b,c) {
		Cm(function (d) {
			d?JO(b,c):Y.gx(b,c)
		})
	});
	Fp(Rx);
	Hy(function (b) {
		Cm(function (c) {
			c&&nP(b)
		})
	});
	Zk.MK(function () {
		var b=e;
		Cm(function (c) {
			b=!c
		});
		return b
	})
}
function nP(a) {
	var b=a.getElementsByTagName(So);
	for(var c=0,d;d=b[c];c++)oP(d);b=a.getElementsByTagName(pe);for(var c=0;d=b[c];c++)pP(d);a=a.getElementsByTagName(Ro);for(var c=0;b=a[c];c++)pP(b)
}var qP="/reader/ui/3281528951-placeholder.png",rP="image-placeholder",sP="Click to load this image";function oP(a) {
	var b=a.src,c=a.title;
	a.src=qP;
	w(a,rP);
	Al(a,T,t(tP,a,b,c));
	a.title=sP
}var uP="Could not load this image. Please check your Internet connection.";
function tP(a,b,c,d) {
	a.onerror=function () {
		Z(uP,Kq);
		oP(a)
	};
	x(a,rP);
	a.onclick=h;
	a.title=c;
	a.src=b;
	d.stopPropagation();
	d.preventDefault()
}var vP="embed-placeholder",wP="Click to load this embedded content";
function pP(a) {
	var b=a.parentNode,c=N(C,{
		"class":vP
	});
	c.style.width=(a.getAttribute(fi)||300)+yt;
	c.style.height=(a.getAttribute(ei)||200)+yt;
	c.title=wP;
	c.onclick=t(xP,a,c,b);
	b.replaceChild(c,a)
}function xP(a,b,c) {
	c.replaceChild(a,b)
}var TM=e;
function UM(a) {
	TM=a
}var yP="scour-help-dismiss";
function hN() {
	Cm(function (a) {
		(a?Fs:Ds)(function (b) {
			if(!b)return ;
			b=a?zP():AP();
			var c=M(b,yP);
			Tm(c,{
				event:T,$:function () {
					a||Es(e);
					xM.close();
					UM(e)
				}
			});
			xM.open(b);
			UM(i)
		})
	})
}var BP="SELECT * from ",CP=" where id<>'",DP=" WHERE id in (",EP="Removed users from global database: ";
function SM(a) {
	rN();
	var b=tN.In.r;
	a=BP+b+CP+ON(a)+Rj;
	a=new OL(a);
	a.zf(function (c) {
		if(c) {
			var d=[];
			while(c.isValidRow()) {
				var f=c.fieldByName(ZF);
				d.push(f);
				(new BL(f)).ir();
				c.next()
			}c=new OL(gM+b+DP+oM(d)+ph);
			c.Kb(d);
			c.ua(tN);
			aj(EP+d.join(gq))
		}
	});
	a.ua(tN)
}var FP="scour-capable",GP="sign-out",HP="continue";
function IP() {
	Yq?dL(SM):window.setTimeout(t(dL,SM),2000);
	MO();
	if(!Yq)return ;
	Yq&&w(document.body,FP);
	var a=J(GP);
	Tm(a,{
		event:T,$:function () {
			window.location.href=P(_LOGOUT_URL,HP,_LOGIN_URL)
		},Co:Rx
	});
	J(HM)&&Tm(J(HM),{
		event:T,$:pN
	});
	J(IM)&&Tm(J(IM),{
		event:T,$:VM
	});
	hN()
}var JP="GR-";
function ON(a) {
	return JP+parseInt(a,10).toString (16)
}function rN() {
	if(tN&&LL)return ;
	try{
		tN=new MN;
		LL=new VN(ON(_USER_ID))
	}catch(a) {
		return
	}
}function kP() {
	return tN&&tN.xn()&&LL&&LL.xn()
}
function IL(a) {
	Cm(function (b) {
		if(!b||a)try{
			tN.C();
			LL.C()
		}catch(c) {
		}
	})
}var KP=" LIMIT 1";
function cN() {
	if(!kP())return e;
	var a=e,b=new OL(wO+LL.ne.r+KP);
	b.zf(function (c) {
		a=c&&c.isValidRow()
	});
	b.ua(LL);
	return a
}function Rx(a) {
	var b=[];
	if(arguments.length>1)b=Array.prototype.slice.call(arguments,1);
	Cm(function (c) {
		c?SO():a.apply(h,b)
	})
}var LP=e;
function qN(a) {
	LP=a
}var MP=h,NP="search-submit",OP="search-input";
function PP() {
	var a=J(NP),b=J(OP);
	$m(b,QP);
	$m(a,QP);
	U(a,T,QP);
	an(27,b,function () {
		b.blur()
	});
	an(9,b,function (c) {
		b.blur();
		RP.open(c)
	});
	SP()
}var TP="search-restrict-input";
function QP() {
	if(LP)return ;
	var a=J(OP).value;
	if(sf(a)) {
		a=MP||Tk();
		Dm(a)
	}else X.search(a,e,[MP]);
	J(OP).blur();
	J(TP).blur();
	w(J(TP),hF.prototype.ok)
}function UP() {
	window.setTimeout(function () {
		J(OP).focus()
	},1)
}function wH() {
	if(LP)return ;
	J(OP).value=n
}var RP;
function VP() {
	iF.call(this)
}v(VP,iF);
VP.prototype.o=function () {
	this.g=WP({
		tG:TP,uG:this.Bo
	});
	this.Jd(this.g);
	this.Db=this.g.getElementsByTagName(Xm)[0];
	this.Sb.ka(this.Db);
	this.If=M(this.g,Tv,C);
	this.i.Kd(i);
	var a=this;
	$m(this.Db,QP,function () {
		return !a.i.H()
	});
	an(9,this.Db,function (b) {
		if(b.shiftKey) {
			a.Nb();
			window.setTimeout(function () {
				J(OP).focus()
			},1)
		}
	});
	this.bc(this.i,i)
};
VP.prototype.ea=function () {
	VP.d.ea.call(this);
	U(this.i,du,this.PJ,e,this)
};
VP.prototype.PJ=function (a) {
	a=a.target.e();
	UC(a.parentNode,a)
};
VP.prototype.open=function (a) {
	this.xm();
	this.Db.select();
	this.i.ue(i);
	a&&a.preventDefault()
};
var XP="main-item";
function YP(a,b) {
	GF.call(this,a,b);
	this.Bs(XP)
}v(YP,GF);
var ZP="search-restrict";
function SP() {
	var a=RP=new VP;
	$P();
	Kp.Lb($P);
	S.Lb($P);
	a.nc(J(ZP));
	U(a,pF,function (b) {
		if(sf(b.target.Ca()))MP=h
	});
	U(a,fv,function (b) {
		MP=b.item.zm
	});
	U(a,bv,t(dD,e));
	U(a,cv,t(dD,i))
}var aQ="Folders",bQ="Subscriptions";
function $P() {
	var a=RP;
	a.nJ();
	a.pK(Sd.Ha);
	a.ba(new YP(Sd.Ha,Tk()));
	a.ba(new YP(Rd.Ha,Ek(R.vd())));
	a.ba(new YP(Td.Ha,Ek(R.xd())));
	a.ba(new YP(Wd.Ha,Uk()));
	a.ba(new YP(Yd.Ha,Ek(R.fe())));
	a.ba(new YP(be.Ha,Ek(R.cp())));
	Kp.ag(function (b) {
		S.aa(function (c) {
			var d=new GF(aQ);
			d.fz(i);
			d.pb(e);
			a.ba(d);
			for(var d=0,f;f=b[d];d++)a.ba(new GF(f.ge(),Ek(f)));d=new GF(bQ);d.fz(i);d.pb(e);a.ba(d);for(var d=0;f=c[d];d++)a.ba(new GF(Lf(f.q),f.h))
		})
	})
}var cQ="$1 $2";
function dQ(a) {
	var b=[];
	a=a.replace(/([^\s\-])"([^\s])/g,cQ);var c=h,d=/(-?)"(.*?)"/;while(c=d.exec(a)) {var f=c[2];c[1]==Kk||b.push(f);a=a.substring(0,c.index)+a.substring(c.index+c[0].length)}return b.concat(vf(a.replace(/\xa0|[ \t]+/g,o)).split(o))}var eQ='<b class="highlighted';
	function fQ(a,b) {
		if(!a)return ;
		var c=dQ(b);
		if(c==0)return ;
		for(var b=0,d;d=c[b];b++)d.length<=1&&c.splice(b,1);var f=[];for(var b=0,d;d=c[b];b++)f.push([d.toLowerCase(),i]);function g(k,l) {
			return eQ+k%7+Qi+l+IF
		}for(var b=0;c=a[b];b++)uD(c,f,g,i)
	}function gQ(a,b) {
		a=dQ(a);
		var c=b.length;
		for(var d=0,f;f=a[d];d++) {
			f=hQ(f,b);
			if(f!=-1&&f<c)c=f
		}return c<b.length?ag+b.substring(c):b
	}var iQ="[a-zA-Z0-9]+\\s+[a-zA-Z0-9]+\\s+",jQ="[a-zA-Z0-9]+\\s+";
	function hQ(a,b) {
		var c=jg(a);
		function d(g) {
			return b.search(new RegExp(g+c,fp))
		}a=[d(iQ),d(jQ),d(n)];
		a.sort(function (g,k) {
			return g-k
		});
		d=-1;
		for(var f=0;f<a.length;f++)if(a[f]!=-1) {
			d=a[f];
			break
		}return d
	}function kQ(a,b) {
		var c=X.f();
		if(!c||!c.ha())return e;
		b=c.Vi()?c.Vi().join(n)==b.join(n):i;
		return c.Bb()==a&&b
	}var lQ="search";
	function mQ() {
		wm.call(this);
		this.L=lQ
	}v(mQ,wm);
	mQ.prototype.Mm=function (a) {
		var b=a[0],c=a[1],d=a.slice(2);
		function f() {
			return Re(d,Fk)
		}a=X;
		var g=kQ(b,d);
		if(c!=h&&c!=n) {
			c=parseInt(c,10);
			g?a.Dy(c):a.search(b,c,f())
		}else if(g&&a.jb()==ny.qk)a.Aa().so();
		else if(g&&a.jb()==ny.jd&&a.V) {
			Am();
			Bm(a.f())
		}else a.search(b,h,f())
	};
	vm.jd=new mQ;
	var nQ="Trends",oQ="trends-selector",pQ="?tz=";
	function yx() {
		var a=u(nQ),b=this;
		vH.call(this,oQ,Va+pQ+-(new Date).getTimezoneOffset(),a,function (c) {
			b.Wb(c);
			vm.SA.Ub()
		})
	}v(yx,vH);
	m=yx.prototype;
	var qQ="trends";
	m.ke=qQ;
	m.select=function (a) {
		Rx(r(qH.prototype.select,this,a));
		return e
	};
	var rQ="trends-bucket-chart",sQ="ja",tQ="trends-mobile-sorting-header",uQ="sorting-container ",vQ="sorting-container",wQ="top10-link",xQ="show-top10",yQ="top20-link",zQ="show-top20",AQ="top40-link",BQ="show-top40",CQ="trends-sorting-stream-link",DQ="trends-sorting-unsubscribe",EQ="trends-cloud-stream-link";
	m.Wb=function (a) {
		this.Fn=gI(a);
		for(var b=0;b<this.Fn.length;b++)if(this.Fn[b].R()==rQ)for(var c=0;c<this.Fn[b].WL;c++)this.Fn[b].Rl(c);_DISPLAY_LOCALE.indexOf(sQ)==0&&w(J(tQ),Q);var d=rj(a);function f(p,s) {
			p.className=uQ+s
		}function g(p,s) {
			if(!(p in d))return ;
			p=d[p];
			for(var A=0,I;I=p[A];A++)I.onclick=t(f,d[vQ][A],s)
		}g(wQ,xQ);g(yQ,zQ);g(AQ,BQ);function k(p) {
			p=p.parentNode.parentNode.id.substring("trends-".length);
			return Fk(p)
		}if(c=d[CQ])for(var b=0;g=c[b];b++) {
			a=k(g);
			wA(g,a,h,i)
		}if(g=d[DQ])for(var b=
		0,l;l=g[b];b++) {
			a=k(l);
			l.onclick=Or(a.streamId,Oj(c[b].innerHTML),r(this.iF,this,l.parentNode.parentNode))
		}if(k=d[EQ])for(var b=0;g=k[b];b++) {
			a=g.parentNode.id.substring("trends-".length);
			a=Fk(a);
			wA(g,a,h,i)
		}
	};
	var FQ="sorting";
	m.iF=function (a) {
		var b=a.id,c=Zh(YC,FQ,J(qQ));
		for(var d=0;a=c[d];d++) {
			var f=a.getElementsByTagName(UD),g=[];
			for(var k=0,a;a=f[k];k++)a.id==b&&g.push(a);if(g.length) {
				var l;
				for(var k=0,a;a=g[k];k++) {
					l=a.parentNode;
					l.removeChild(a)
				}this.zD(l)
			}
		}
	};
	var GQ="first-row ",HQ="alt ",IQ="top10 ",JQ="top20 ",KQ="top40 ";
	m.zD=function (a) {
		var b=0;
		for(a=a.firstChild;a;a=a.nextSibling) {
			if(!a.tagName||a.tagName.toLowerCase()!=UD)continue;
			var c=n;
			if(b==0)c+=GQ;
			if(b%2==0)c+=HQ;
			if(b<10)c+=IQ;
			if(b<20)c+=JQ;
			if(b<40)c+=KQ;
			a.className=c;
			b++
		}
	};
	vm.SA=new xH(yx);
	var ZJ="message-area-outer",$J="message-area-inner",LQ,Yx,Cy,rx,tx,vx,xx,zx,Bx,Jx;
	function _FR_scrollMain(a) {
		xm=new tm;
		R=new mq(a);
		MQ();
		NQ();
		Cy=new OQ;
		H.Sd()&&PQ();
		fk(r(Jp.ol,Jp));
		Im(IP);
		if(EM)iP();
		else Yq?lP():mP();
		hH(function (b) {
			X.be(b)
		});
		iH(function (b,c) {
			c(Cy.sh(b))
		});
		Rq(function (b,c) {
			if(S) {
				S.$e(b,function (d) {
					c(d!=h)
				});
				return i
			}return e
		});
		GK();
		is(pc,QQ)
	}function QQ() {
		if(!gP) {
			window.setTimeout(QQ,50);
			return
		}LQ=new AD;
		U(LQ,Km,MM);
		RQ();
		Gp(SQ);
		X=new TQ;
		X.Ya();
		X.Gf(kA);
		X.Gf(lA);
		X.Gf(UQ);
		X.Gf(VQ);
		X.Gf(WQ);
		X.Gf(mA);
		X.Gf(XQ);
		YQ();
		MM();
		ZQ()
	}var $Q="newSub";
	function YQ() {
		H.fw();
		if(Zk.PG())Er(ma)?Zr(function () {
			function a() {
				X.er(a);
				X.rn()
			}X.Sn(a)
		}):aR();
		else {
			Dm(Fk(_INPUT_STREAM_ID));
			Zj($Q)==q&&X.rn()
		}bR();
		Rw();
		PP();
		H.Sd()&&cR();
		xm.C()
	}function RQ() {
		J(id).innerHTML=dR()
	}var eR="reading-list-unread-count",fR="unread";
	function ux(a,b) {
		var c=Tk(),d=J(eR);
		gR(d,c,a,b);
		b=J(px);
		y(b,fR,a)
	}
	var hR="shift+s",iR="shift+d",jR="shift+a",kR="shift+n",lR="shift+p",mR="shift+j",nR="shift+k",oR="shift+x",pR="shift+o",qR="g h",rR="g shift+t",sR="g d",tR="g a",uR="g s",vR="g shift+s",wR="g f",xR="g shift+f",yR="g t",zR="g l",AR="g u";
	function BR() {
		Lp=new iB;
		var a=Yx,b=Yx.Kh,c=X,d=r(Lp.Fs,Lp),f=r(Lp.XA,Lp);
		d([MA],c.Je,c);
		d([NA],c.Lg,c);
		d([Cn],r(c.Je,c,i));
		d([PA],r(c.Lg,c,i));
		d([13],c.rc,c);
		d([uq],c.rc,c);
		d([32],r(c.vz,c,i));
		d([32,1],r(c.vz,c,e));
		d([40],r(c.Cm,c,i));
		d([38],r(c.Cm,c,e));
		d([34],r(c.Hd,c,i));
		d([33],r(c.Hd,c,e));
		d([35],r(c.zu,c,i));
		d([36],r(c.zu,c,e));
		d([RA],c.RC,c);
		f([OA],[RA]);
		d([TA],c.om,c);
		d([gp],c.is,c);
		d([hR],c.fs,c);
		d([ws],c.Dn,c);
		d([LA],c.Jo,c);
		d([iR],c.$L,c);
		d([187],r(c.ct,c,10));
		f([61],[187]);
		f([107],[187]);
		d([189],r(c.ct,c,-10));
		f([109],[189]);
		d([Vf],t(Rx,ey));
		d([GA],r(c.Md,c,ny.$b,e));
		f([97],[GA]);
		d([HA],r(c.Md,c,ny.pk,e));
		f([98],[HA]);
		d([IA],function () {
			c.f().ha()&&c.Md(ny.jd,e)
		});
		f([99],[IA]);
		d([jR],c.vm,c);
		d([Nk],function () {
			a.u();
			c.u(undefined,i)
		});
		d([SA],Ow.Cn,Ow);
		d([85,1],Ow.Yz,Ow);
		d([kR],b.Je,b);
		d([lR],b.Lg,b);
		f([mR],[kR]);
		f([nR],[lR]);
		d([oR],b.rc,b);
		d([pR],b.Rx,b);
		d([qR],vx.select,vx);
		d([rR],xx.select,xx);
		d([sR],zx.select,zx);
		d([tR],rx.select,rx);
		d([uR],tx.select,tx);
		d([vR],function () {
			Bm(Uk())
		});
		d([wR],CR.dd,CR);
		d([xR],function () {
			Dm(Ek(R.fe()))
		}),d([yR],DR.dd,DR);
		f([zR],[yR]);
		d([AR],ER.dd,ER);
		d([191,1],BH);
		d([27],EH);
		Lp.oK(EH);
		Lp.RK(function (g) {
			return !FR(g)
		});
		d([37],function () {
		});
		d([39],function () {
		});
		d([JA],function () {
		});
		d([ch],UP);
		H.Sd()&&GR(d)
	}var HR=e,IR="main",JR="loaded";
	function KR() {
		if(HR)return ;
		HR=i;
		x(J(IR),Q);
		w(document.body,JR);
		uy();
		MM();
		BR();
		LR();
		JK(function () {
			Z(eK,Kq,60)
		});
		window.clearTimeout(_STUCK_TIMEOUT)
	}
	var MR="blogger-following-intro-bubble",NR="blogger-following-intro-button",OR="Your Blogger followed blogs <i>will not</i> be shown. You can re-show them on the settings page.";
	function LR() {
		gt(function (a) {
			if(!a)return ;
			a=PR();
			if(!a)return ;
			UC(Yx.wd(),a.zb());
			a=a.Vc();
			UC(Yx.wd(),a[a.length-1].zb());
			var b=ZC(MR,QR());
			Al(J(NR),T,function () {
				B(b);
				ft(e)
			});
			var c=u(OR);
			Al(J(gc),T,function () {
				B(b);
				ft(e);
				ht(e,function () {
					Z(c,Ss);
					Kp.u();
					S.u();
					Y.u()
				})
			});
			RR()
		})
	}
	function PR() {
		if(!Yx)return h;
		var a=Ek(R.hh());
		a=Yx.$u(a);
		if(!a||a.length==0)return h;
		return a[0]
	}function RR() {
		var a=PR();
		if(!a)return ;
		var b=J(MR);
		if(!b)return ;
		if(Ow&&Ow.Bd()) {
			w(b,Q);
			return
		}x(b,Q);
		a=Kt(a.bv());
		aD(b,a.left+a.width,a.top+a.height/2)
	}var SR={
		trends:yx,overview:wx,directory:Ax
	},TR="page";
	function aR() {
		Oq(function (a) {
			if(a) {
				if(!xm.zH()) {
					(a=Zj(TR))&&a in SR?(new SR[a]).select():Ts(iN)
				}
			}else {
				os(oc,e.toString ());
				_DISPLAY_LOCALE.indexOf($x)==0?Bx.select():zx.select()
			}
		})
	}
	function iN(a) {
		Kp.ag(function () {
			try{
				var b=Fk(a);
				if(b.lq()||Kp.xF(b)) {
					Dm(b);
					return
				}
			}catch(c) {
			}vx.Mr=i;
			vx.select()
		})
	}var UR="viewer-footer",VR="debug-footer",WR="viewer-page-container";
	function MM() {
		Mx&&Mx.ca();
		var a=ki(window).height;
		function b(c) {
			var d=Gt(c),f=J(UR);
			f=f&&f.offsetHeight?f.offsetHeight:0;
			var g=J(VR);
			f+=g&&g.offsetHeight?g.offsetHeight:0;
			d=a-d-f;
			if(d>0)c.style.height=d+yt
		}if(X)X.V?b(J(WR)):b(X.Ba());
		!H.Sd()&&Ow&&Ow.ca(a);
		X&&X.rz()&&X.mA();
		RR()
	}
	var XR="chrome-title",YR="page-view",ZR="chrome-viewer",$R="invisible";
	function uH(a,b,c) {
		if(!c)X.Ba().scrollTop=0;
		Yx.ro();
		X.V=i;
		X.reset();
		J(XR).innerHTML=b;
		w(J(id),YR);
		b=J(WR);
		b.innerHTML=n;
		b.appendChild(a);
		b.scrollTop=0;
		x(J(ZR),$R);
		MM()
	}function Am() {
		X.V=e;
		x(J(id),YR);
		J(WR).innerHTML=n;
		MM()
	}function SQ() {
		if(!X.V) {
			var a=X.f();
			S.$e(a,function (b) {
				b||a.Zc()||aR()
			})
		}MM()
	}function aS() {
		return X.UD()
	}Me("getPermalink",aS);
	function bS() {
		W.call(this);
		oH.call(this);
		this.wb=this.Ma=h;
		this.$c={
		};
		this.Jh={
		};
		this.pq=0;
		this.zg=[];
		this.Kh=new cS(this);
		this.z=document;
		this.jk=i;
		this.Pp();
		var a=this;
		Y.Vn(function (b,c,d) {
			if(b.streamId in a.$c) {
				b=a.$c[b.streamId];
				for(var f=0,g;g=b[f];f++)g.os(c,d)
			}
		})
	}v(bS,oH);Gg(bS.prototype,W.prototype);m=bS.prototype;m.K=function (a) {
		return J(a,this.z)
	};
	m.jz=function (a) {
		this.jk=a
	};
	m.Lb=function (a) {
		this.zg.push(a)
	};
	m.uJ=function (a) {
		for(var b=0,c;c=this.zg[b];b++)if(c==a) {
			this.zg.splice(b,1);
			return
		}
	};
	m.load=function () {
		var a=this;
		this.Aq(function (b,c) {
			a.$c={
			};
			a.Jh={
			};
			a.pq=0;
			a.bH=0;
			a.yo(b,c);
			a.display();
			for(var b=0;c=a.zg[b];b++)c();a.ro();gH&&a.ze(gH)
		})
	};m.JD=function () {
		return this.Lp+this.bH++
	};
	m.display=function () {
		var a=this.wd(),b=new D;
		this.Ma.Ps(b);
		a.innerHTML=b.toString ();
		this.kk&&this.Kh.C(this.Ma);
		if(!this.cD) {
			U(a,T,this.IC,e,this);
			this.cD=i
		}
	};
	m.IC=function (a) {
		var b=a.target,c=b;
		while(c&&!(c.id in this.Jh))c=c.parentNode;
		if(c)if(this.Jh[c.id].Jt(b)) {
			a.stopPropagation();
			a.preventDefault()
		}
	};
	m.Dg=function (a) {
		if(a==this.wb) {
			a.u();
			return
		}this.wb&&this.wb.Et();
		this.wb=a;
		a.select();
		this.kk&&this.Kh.JG()?this.Kh.set(a):UC(this.wd(),a.zb())
	};
	m.ro=function () {
		if(this.wb) {
			this.wb.Et();
			this.wb=h
		}
	};
	m.ze=function (a) {
		if(a&&this.wb&&this.wb.h.G(a))return ;
		if(a&&a.streamId in this.$c) {
			a=this.$c[a.streamId][0];
			for(var b=a.A;b;b=b.A)b.Za||b.rc();this.Dg(a)
		}else this.wb&&this.ro()
	};m.$u=function (a) {
		return this.$c[a.streamId]
	};
	var dS="scroll-tree-show-updated",eS="both";
	m.on=function (a) {
		this.pL=a;
		y(this.wd(),dS,!a);
		if(H.Kc())for(var b in this.Jh) {
			a=this.Jh[b].qh();
			a.style.clear=a.currentStyle.clear==Vo?eS:Vo
		}
	};
	function fS(a,b,c) {
		this.qb=a;
		this.Dt=(this.A=b)?b.Dt+1:0;
		this.cc=c;
		this.Za=i;
		this.Fe=0;
		this.ui=e;
		this.yj={
		};
		a.Jh[this.ie(IR)]=this;
		a.pq++
	}m=fS.prototype;
	m.R=function () {
		if(!this.L)this.L=this.qb.JD();
		return this.L
	};
	m.ie=function (a) {
		return this.R()+Kk+a
	};
	m.K=function (a) {
		a in this.yj||(this.yj[a]=this.qb.K(this.ie(a)));
		return this.yj[a]
	};
	var gS="unread-count";
	m.ME=function () {
		return this.K(gS)
	};
	m.qh=function () {
		return this.K(IR)
	};
	m.bv=function () {
		return this.K(Tn)
	};
	var hS="icon";
	m.dE=function () {
		return this.K(hS)
	};
	m.zb=function () {
		return this.K(tb)
	};
	m.CK=function (a) {
		this.yj.link=a
	};
	var iS="name-unread",jS="updated",kS="updated-intermediate";
	m.os=function (a,b) {
		if(this.Fe==a&&this.ui==b)return ;
		gR(this.ME(),this.h,a,b);
		var c=this.bv(),d=a>0;
		y(c,iS,d);
		y(this.qh(),fR,d);
		c.title=this.getName().il+(d?o+lS(a,b):n);
		if(Y.dw) {
			c=this.zb();
			w(c,jS);
			window.setTimeout(t(w,c,kS),700);
			window.setTimeout(t(x,c,jS,kS),1000)
		}this.Fe=a;
		this.ui=b
	};
	var mS="name-text";
	m.Jt=function (a) {
		var b=e,c=[];
		do{
			c=jf(a);
			a=a.parentNode
		}while(a&&c.length==0);
		for(var a=0,d;d=c[a];a++)switch(d) {
			case qE:this.rc();
			b=i;
			break;
			case Tn:case mS:case gS:case hS:case tb:this.Cl();
			b=i;
			break
		}return b
	};
	var nS="collapsed";
	m.rc=function () {
		var a=this.qh();
		this.Za?kf(a,Qu,nS):kf(a,nS,Qu);
		this.Za=!this.Za;
		Cy.Eg(this.h,this.Za);
		this.qb.kk&&this.qb.Kh.fy();
		this.dE().src=this.oh()
	};
	m.Cl=function () {
		this.qb.Dg(this)
	};
	m.u=function () {
	};
	var oS="tree-selected",pS="tree-link-selected";
	m.select=function () {
		w(this.qh(),oS);
		w(this.zb(),pS)
	};
	m.Et=function () {
		x(this.qh(),oS);
		x(this.zb(),pS)
	};
	var qS="-d-",rS="suffix-node",sS="suffix";
	m.Ps=function (a) {
		var b=this;
		this.yj={
		};
		function c(l) {
			return [l,l+qS+b.Dt].join(o)
		}this.Fe=this.uh();
		this.ui=this.Ow();
		var d=this.Fe>0,f=d?o+lS(this.Fe,this.ui):n,g=this.getName(),k=this.Vc();
		tS({
			className:this.cc,OL:this.h.Oi(i),RF:this.oh(),ht:k,Sw:this.Zu(),Rw:this.Yu(),Zl:this.Za,Nw:d,eM:k.length==0,hA:f,Oz:this.up(),cH:g.il,displayName:g.za,aM:c(qE),QF:c(hS),YH:c(Tn),ZH:c(mS),tM:c(gS),VL:c(rS),lM:this.ie(IR),kM:this.ie(tb),jM:this.ie(hS),mM:this.ie(Tn),oM:this.ie(gS),nM:this.ie(sS),PB:a
		},a)
	};
	m.uh=function () {
		return 0
	};
	m.Ow=function () {
		return e
	};
	m.getName=function () {
		var a,b;
		a=b=this.r;
		if(b.length>24&&!H.Sd())b=b.substring(0,21)+ag;
		return {
			za:b,il:a
		}
	};
	m.Vc=function () {
		return []
	};
	m.ru=function (a) {
		var b=this.Vc();
		if(b.length) {
			cf(a,b);
			for(var c=0,d;d=b[c];c++)d.ru(a)
		}
	};m.up=function () {
		return h
	};
	m.Zu=function () {
		return h
	};
	m.Yu=function () {
		return h
	};
	function uS(a,b,c,d) {
		fS.call(this,a,b,c);
		this.h=d;
		this.Za=i;
		d.streamId in a.$c||(a.$c[d.streamId]=[]);
		a.$c[d.streamId].push(this)
	}v(uS,fS);
	m=uS.prototype;
	m.u=function () {
		this.qb.Um(this.h)
	};
	m.select=function () {
		if(!gH||!gH.G(this.h))this.qb.Um(this.h);
		uS.d.select.call(this)
	};
	m.uh=function () {
		var a=Y.ib(this.h);
		return a?a.Ff:0
	};
	m.Ow=function () {
		var a=Y.ib(this.h);
		return a?a.ff:e
	};
	m.f=function () {
		return this.h
	};
	var vS="sub",wS="/reader/ui/4183653108-tree-view-subscription.gif";
	function xS(a,b,c,d) {
		uS.call(this,a,c,vS,b.h);
		this.r=b.q;
		this.Kp=d||wS
	}v(xS,uS);
	var yS="<em>Untitled Subscription</em>",zS="Untitled Subscription";
	xS.prototype.getName=function () {
		return this.r?fS.prototype.getName.call(this):{
			za:yS,il:zS
		}
	};
	xS.prototype.oh=function () {
		return this.Kp
	};
	var AS="folder",BS="/reader/ui/3544433079-tree-view-folder-open.gif",CS="/reader/ui/1891922333-tree-view-folder-closed.gif";
	function DS(a,b,c,d,f) {
		uS.call(this,a,c,AS,Ek(b));
		this.Za=Cy.Zl(this.h);
		this.ab=b;
		this.r=b.ge();
		this.BI=d||BS;
		this.fC=f||CS;
		this.T=[]
	}v(DS,uS);
	DS.prototype.oh=function () {
		return this.Za?this.BI:this.fC
	};
	DS.prototype.Vc=function () {
		return this.qb.jk?ES.DI(this,this.T):this.T
	};
	DS.prototype.bc=function (a,b) {
		b?this.T.unshift(a):this.T.push(a)
	};
	var FS="tag",GS="/reader/ui/3446887091-tree-view-tag.gif";
	function HS(a,b,c,d) {
		uS.call(this,a,c,FS,Ek(b));
		this.ab=b;
		this.r=b.ge();
		this.Kp=d||GS
	}v(HS,uS);
	HS.prototype.oh=function () {
		return this.Kp
	};
	function cS(a) {
		this.qb=a;
		this.Ma=h;
		this.pg=[];
		this.jf={
		};
		this.lc=-1
	}m=cS.prototype;
	m.C=function (a) {
		this.Ma=a;
		this.fy()
	};
	m.fy=function () {
		var a=h;
		if(this.lc!=-1) {
			a=[];
			for(var b=this.Se();b;b=b.A)a.push(b.R());this.Hn(this.Se(),e)
		}this.pg=[];this.jf={
		};
		var c=this;
		function d(g) {
			if(g!=c.Ma) {
				c.pg.push(g);
				c.jf[g.R()]=c.pg.length-1
			}if(g.Za) {
				g=g.Vc();
				for(var k=0,l;l=g[k];k++)d(l)
			}
		}d(this.Ma);this.lc=-1;if(a)for(b=0;b<a.length;b++) {
			var f=a[b];
			if(f in this.jf) {
				this.lc=this.jf[f];
				var b=this.pg[this.lc];
				this.Hn(b,i,i);
				break
			}
		}
	};
	var IS="cursor";
	m.Hn=function (a,b,c) {
		a=a.zb();
		y(a,IS,b);
		b&&!c&&UC(this.qb.wd(),a)
	};
	m.set=function (a) {
		if(!a||!(a.R() in this.jf))return ;
		this.lc!=-1&&this.Hn(this.Se(),e);
		this.lc=this.jf[a.R()];
		this.Hn(a,i)
	};
	m.Je=function () {
		this.Mq(+1)
	};
	m.Lg=function () {
		this.Mq(-1)
	};
	m.Mq=function (a,b) {
		var c=this.lc;
		if(c==-1) {
			var d=this.qb.wb;
			if(d&&d.R() in this.jf)c=this.jf[d.R()]
		}b=!this.qb.pL||b;
		while(i) {
			c+=a;
			if(c<0||c>=this.pg.length)break;
			d=this.pg[c];
			if(!b||d.Fe>0) {
				this.set(d);
				break
			}
		}
	};
	m.rc=function () {
		var a=this.Se();
		while(a!=this.Ma) {
			if(a.Vc().length>0) {
				a.rc();
				break
			}a=a.A
		}
	};
	m.expand=function () {
		var a=this.Se();
		a.Za||a.rc()
	};
	m.collapse=function () {
		var a=this.Se();
		a.Za&&a.rc()
	};
	m.Rx=function () {
		this.qb.Dg(this.Se())
	};
	m.Se=function () {
		return this.pg[this.lc]
	};
	m.JG=function () {
		return this.lc!=-1
	};
	m.YJ=function () {
		this.Mq(1,i);
		this.Se().Fe>0&&this.Rx()
	};
	function JS(a,b,c) {
		YD.call(this,b,c);
		this.A=a
	}v(JS,YD);
	JS.prototype.Nu=function (a) {
		a=a;
		while(a!=h&&!lf(a,tb))a=a.parentNode;
		return a
	};
	function KS(a) {
		ZD.call(this);
		this.Nf=[];
		this.Sm=h;
		this.OC=a
	}v(KS,ZD);
	KS.prototype.ba=function (a,b) {
		this.Cs(new JS(this,a,b))
	};
	KS.prototype.pM=function (a) {
		for(var b=a.target;b!=h;b=b.parentNode)if(b.tagName&&b.tagName.toLowerCase()==ep) {
			a.preventDefault();
			break
		}
	};
	var LS="bottom",MS="upper-middle",NS="lower-middle",OS="tree-drop-target-in",PS="tree-drop-target-below",QS="tree-drop-target-above",RS="tree-flying-item";
	KS.prototype.C=function () {
		var a=this,b=Yh(gy);
		this.oB(b);
		this.Nf.push(U(b,om,this.pM,e,this));
		this.ZK(function (d,f,g,k) {
			if(d&&d.datainstanceofuS)return d.data.f().J.Ka&&d.data.f().Zc()?k<f.top+(f.bottom-f.top)/4?nB:!d.data.Za&&k>f.top+3*(f.bottom-f.top)/4?LS:k<f.top+(f.bottom-f.top)/2?MS:NS:k<(f.top+f.bottom)/2?nB:LS
		});
		this.qB(this);
		var c=h;
		this.Nf.push(U(a,QD,function (d) {
			if(d.gb.datainstanceoffS) {
				var f=d.Pa.data.f().J.Ka&&d.Pa.data.f().Zc(),g=d.xe==MS||d.xe==NS,k=d.gb.data.A;
				if(!Yx.jk) {
					if(f||
					k==h)return ;
					c=k.A==h?d.gb.data:k;
					w(c.zb(),OS);
					return
				}if(f&&!g&&k.A!=h)return ;
				g=d.xe;
				if(f)if(d.xe==MS)g=nB;
				else if(d.xe==NS)g=LS;
				if(f&&d.gb.data.Za&&g==LS)return ;
				if(g==LS)w(d.gb.X,PS);
				else g==nB?w(d.gb.X,QS):w(d.gb.X,OS)
			}
		}));
		this.Nf.push(U(a,PD,function (d) {
			x(d.gb.X,QS,PS,OS);
			if(c!=h) {
				x(c.zb(),OS);
				c=h
			}
		}));
		this.Nf.push(U(a,LD,function (d) {
			var f=e;
			Cm(function (g) {
				f=g
			});
			if(f) {
				d.preventDefault();
				return
			}w(d.Pa.X,RS);
			Pt(d.Pa.X,0.5);
			a.Sm=new $D(b)
		}));
		this.Nf.push(U(a,OD,function (d) {
			x(d.Pa.X,RS);
			Pt(d.Pa.X,1);
			if(Nt in d.Pa.X.style)d.Pa.X.style.filter=n;
			if(c!=h) {
				x(c.zb(),OS);
				c=h
			}a.Sm.n()
		}));
		this.Nf.push(U(a,ND,function (d) {
			x(d.gb.X,QS,PS,OS);
			a.OC(d)
		}));
		ZD.prototype.C.call(this)
	};
	KS.prototype.k=function () {
		for(var a=0,b;b=this.Nf[a];a++)Cl(b);this.Sm&&this.Sm.n();KS.d.k.call(this)
	};var SS="sub-tree-item-";function Zx() {
		bS.call(this);
		this.Lp=SS;
		this.kk=i;
		this.ls=0
	}v(Zx,bS);
	m=Zx.prototype;
	m.Pp=function () {
		var a=r(this.load,this);
		Kp.Lb(a);
		S.Lb(a);
		var b=this;
		Y.Lb(function (c) {
			if(c.length!=b.ls)if(S.GG())b.ls=c.length;
			else S.u()
		})
	};
	m.Aq=function (a) {
		Kp.ag(function () {
		});
		S.aa(function () {
		});
		Y.aa(function () {
		});
		var b=this;
		Y.aa(function () {
			Cy.Tq(function () {
				Kp.ag(function (c) {
					S.aa(function (d) {
						var f=Wj();
						b.ls=Y.Ib.length;
						a(d,c);
						d=Wj();
						Op(Ac,(d-f)/b.pq*1000);
						KR()
					})
				})
			})
		})
	};
	var TS="/reader/ui/3799162523-tree-view-following-folder-open.gif",US="/reader/ui/1900848991-tree-view-following-folder-closed.gif";
	m.yo=function (a,b) {
		var c=this.Ma=new DS(this,R.gc(Db),h),d={
		},f=0,g=[],k={
		};
		for(var l=0,p;p=b[l];l++)k[p.O()]=1;var s=R.hh().O();if(js(hc)!=q)k[s]=1;for(var l=0,A;A=a[l];l++) {
			var I=e;
			if(A.qg)for(var L=0,p;p=A.qg[L];L++) {
				var K=p.O();
				if(K in k)I=i;
				else continue;
				if(!(K in d)) {
					var p=Sk(K),G=K==s;
					d[K]=new DS(this,p,c,G?TS:undefined,G?US:undefined);
					f++
				}d[K].bc(new xS(this,A,d[K]))
			}I||g.push(A)
		}for(var l=0,p;p=b[l];l++) {
			a=p.O();
			a in d&&c.bc(d[a])
		}for(var l=0,A;A=g[l];l++)c.bc(new xS(this,A,c));for(var l=
		0,p;p=b[l];l++)p.O() in d||c.bc(new HS(this,p,c));s in d&&c.bc(d[s])
	};m.wd=function () {
		return this.K(gy)
	};
	m.u=function () {
		Y.u()
	};
	m.display=function () {
		bS.prototype.display.call(this);
		H.Sd()||this.YF()
	};
	var VS="newdraggroup";
	m.YF=function () {
		this.Ai&&this.Ai.n();
		var a=this;
		this.Ai=new KS(function (f) {
			Rx(r(a.ZE,a,f))
		});
		this.dispatchEvent({
			type:VS,aN:this.Ai
		});
		var b=[];
		this.Ma.ru(b);
		this.RI(b);
		for(var c=0,d;d=b[c];c++)this.Ai.ba(d.zb(),d);this.Ai.C()
	};
	m.RI=function (a) {
		var b=this.wd().getElementsByTagName(Vf),c={
		};
		for(var d=0,f;f=b[d];d++)c[f.id]=f;for(var d=0;b=a[d];d++) {
			f=b.ie(tb);
			b.CK(c[f])
		}
	};
	var WS="Saved changes to &quot;%1.&quot;";
	m.ZE=function (a) {
		if(a.Pa==a.gb)return ;
		var b=a.Pa.data.f().J.Ka&&a.Pa.data.f().Zc(),c=a.xe;
		if(b)if(a.xe==MS)c=nB;
		else if(a.xe==NS&&!a.gb.data.Za)c=LS;
		var d=a.Pa.data.A,f=c==MS||c==NS?a.gb.data:a.gb.data.A;
		c=c==LS;
		var g=h;
		if(d==f) {
			if(this.jk) {
				ES.yx(f,a.Pa.data,a.gb.data,c);
				b=O(WS,a.Pa.data.r);
				Z(b,Ss);
				this.display()
			}
		}else if(d==this.Ma)b||(g={
			Td:[f.ab]
		});
		else if(f==this.Ma)b||(g={
			se:[d.ab]
		});
		else b||(g={
			Td:[f.ab],se:[d.ab]
		});
		if(g) {
			this.jk&&ES.yx(f,a.Pa.data,a.gb.data,c);
			Ur(a.Pa.data.h.streamId,g,a.Pa.data.r)
		}
	};
	m.CG=function (a) {
		if(a.streamId in this.$c) {
			a=this.$c[a.streamId];
			for(var b=0,c;c=a[b];b++)if(cinstanceofDS)return i
		}return e
	};function XS() {
		this.Mf=e
	}var YS="interrupt-friend",ZS="interruption",$S="friend-interruption",aT="iframe-container";
	XS.prototype.np=function (a,b) {
		var c=ni(C,{
			id:YS
		});
		w(c,ZS,$S);
		b&&w(c,b);
		document.body.appendChild(c);
		c.innerHTML=bT();
		ln(a,M(c,aT));
		return c
	};
	XS.prototype.my=function () {
		function a() {
			X.er(a);
			X.rn()
		}X.Sn(a);
		X.u()
	};
	function cT(a) {
		XS.call(this);
		this.h=a
	}v(cT,XS);
	cT.prototype.Yb=function (a,b) {
		b(a&&a.G(this.h),this)
	};
	function dT() {
		XS.call(this)
	}v(dT,XS);
	dT.prototype.Yb=function (a,b) {
		b(X.zw()&&Js(),this)
	};
	var eT="dismiss-link";
	dT.prototype.K=function () {
		var a=this.D=fT();
		Dp.sn(M(a,Mp),Np,r(this.Uk,this));
		Al(M(a,eT),T,this.Uk,e,this);
		return a
	};
	dT.prototype.Uk=function () {
		Ls(e);
		B(this.D)
	};
	function gT() {
		cT.call(this,Uk())
	}v(gT,cT);
	m=gT.prototype;
	var hT="broadcast-page-link",iT="style-broadcast-page-link",jT="broadcast-email-link",kT="broadcast-clip-link",lT="style-choices",mT="Default",nT="Ice Cream",oT="Ninjas",pT="Sea";
	m.K=function () {
		var a=qT();
		this.Ny(M(a,hT));
		this.Ny(M(a,iT));
		this.mK(M(a,jT));
		this.lK(M(a,kT));
		var b=this;
		et(function (c) {
			var d=M(a,lT);
			d.appendChild(b.xl(ib,mT,c,d));
			d.appendChild(b.xl(jb,nT,c,d));
			d.appendChild(b.xl(kb,oT,c,d));
			d.appendChild(b.xl(lb,pT,c,d))
		});
		return a
	};
	var rT="style-choice-radio",sT="style-choice-image";
	m.xl=function (a,b,c,d) {
		if(c==h)c=ib;
		b=tT({
			DC:b,Ft:a,checked:c==a
		});
		U(M(b,rT),T,t(dt,a));
		U(M(b,sT),T,function () {
			var f=d.getElementsByTagName(Xm);
			for(var g=0,k;k=f[g];g++)k.checked=k.value==a;dt(a)
		});return b
	};var uT="<wbr></wbr>/",vT="reader-shared-items-preview";m.Ny=function (a,b) {
		var c=bk(Jj($a+_USER_ID));
		if(b)a.innerHTML=c.split(ch).join(uT);
		a.href=c;
		U(a,T,function (d) {
			d.preventDefault();
			bz(c,{
				target:vT,width:900,height:500,toolbar:i,scrollbars:i,location:i,statusbar:i,menubar:i,resizable:i
			})
		})
	};
	m.mK=function (a) {
		U(a,T,t(wT,R.yb()))
	};
	m.lK=function (a) {
		var b=Uk();
		U(a,T,t(RC,b))
	};
	function xT() {
		cT.call(this,Uk())
	}v(xT,cT);
	xT.prototype.K=function () {
		var a=bk(Jj($a+_USER_ID));
		return yT({
			kL:a,kb:sD(Id)
		})
	};
	function zT() {
		XS.call(this)
	}v(zT,XS);
	zT.prototype.Yb=function (a,b) {
		var c=this;
		ys(function (d) {
			b(d&&js(ac)==q&&X.Lw(),c)
		})
	};
	zT.prototype.K=function () {
		var a=this.D=AT({
			kb:sD(Jd)
		});
		Al(M(a,eT),T,this.Uk,e,this);
		return a
	};
	zT.prototype.Uk=function () {
		Ms(e);
		B(this.D)
	};
	function BT() {
		XS.call(this);
		this.Mf=i
	}v(BT,XS);
	BT.prototype.K=function () {
		var a=X.f(),b=this;
		return CT(function () {
			X.bg(function (c) {
				c=new Ir(a.streamId,c);
				c.Qg(ob,zc);
				c.exec(r(b.my,b))
			})
		},i,a.J.Ka?sy:yn)
	};
	BT.prototype.Yb=function (a,b) {
		if(!a.Hh()||a.Eb()) {
			b(e,this);
			return
		}var c=this;
		Sq(a,function (d) {
			if(d) {
				Mr(a,h);
				b(e,c)
			}else Nr(a,function (f) {
				b(f==h,c)
			})
		})
	};
	function DT() {
		XS.call(this)
	}v(DT,XS);
	var ET="rec",FT="preview-interruption-back";
	DT.prototype.K=function () {
		var a=CT(r(this.TL,this),i,ET);
		U(M(a,FT),T,function () {
			zx.select()
		});
		return a
	};
	DT.prototype.TL=function () {
		var a=this;
		X.bg(function (b) {
			Hr(X.f().streamId,a.gJ,b,r(a.my,a))
		})
	};
	DT.prototype.Yb=function (a,b) {
		if(!a.Hh()) {
			b(e,this);
			return
		}var c=this;
		Sq(a,function (d) {
			if(d) {
				Mr(a,h);
				b(e,c)
			}else Nr(a,function (f) {
				if(f!=h)c.gJ=f;
				b(f!=h,c)
			})
		})
	};
	function GT() {
		XS.call(this);
		this.Mf=i
	}v(GT,XS);
	var HT="profile-other-content",IT="friend-settings",JT="friend-show-element",KT="friend-hide-element";
	GT.prototype.K=function () {
		var a=X.f().oa,b=this.np(a.Ui()),c=LT({
			name:a.Sa()
		});
		M(b,HT).appendChild(c);
		U(M(c,IT),T,function () {
			Jx.Vk(1)
		});
		var d=M(c,JT);
		c=M(c,KT);
		this.Py(d,c,a,e);
		this.Py(c,d,a,i);
		return b
	};
	GT.prototype.Py=function (a,b,c,d) {
		U(a,T,function () {
			Sj(a,e);
			Sj(b,i);
			MT([c],d)
		})
	};
	GT.prototype.Yb=function (a,b) {
		b(a.Eb()&&a.oa.hj()&&!a.oa.bm(),this)
	};
	function NT() {
		XS.call(this);
		this.Mf=i
	}v(NT,XS);
	NT.prototype.Yb=function (a,b) {
		b(a.Eb()&&a.oa.bm(),this)
	};
	var OT="preview-interruption invite",PT="options",QT="following-invite-back";
	NT.prototype.K=function () {
		var a=X.f().oa,b=this.np(a.Ui(),OT),c=js(kc)!=Ad,d=M(b,HT);
		c=RT({
			Xa:a,nb:c
		});
		d.appendChild(c);
		ST([a],[M(d,PT,C)],function (f) {
			f?X.u():Jx.Vk(1)
		});
		Al(M(b,QT),T,function () {
			Jx.Vk(1)
		});
		return b
	};
	function TT() {
		cT.call(this,Ek(R.cp()));
		this.m=h;
		this.ig=e;
		this.Mf=i
	}v(TT,cT);
	var UT="Add a title to your note";
	TT.prototype.K=function () {
		this.m=VT({
			gw:UT,pm:_LINK_BOOKMARKLET_URL,kH:WT()
		});
		this.mn();
		return this.m
	};
	var XT="bookmarklet-link",YT="title-container",ZT="tag-container",$T="add-to-shared-items",aU="show-opts",bU="hide-opts",cU="button-publish";
	TT.prototype.mn=function () {
		dU(M(this.m,XT));
		var a=this.LN=M(this.m,YT),b=this.lC=M(this.m,fB),c=this.kC=M(this.m,xB),d=this.HN=M(this.m,ZT),f=this.IN=M(this.m,mO);
		this.rB=M(this.m,$T);
		var g=this.EN=M(this.m,aU),k=this.iN=M(this.m,bU);
		Sj(a,e);
		Sj(d,e);
		Sj(k,e);
		var l=c.value,p=this;
		U(b,lu,function () {
			lf(b,wl)||w(b,wl);
			if(!p.Wz)b.value=n;
			p.Wz=i
		});
		U(c,lu,function () {
			lf(c,wl)||w(c,wl);
			if(!p.ig)c.value=n;
			p.ig=i
		});
		var s=M(this.m,cU);
		lD(s,i);
		var A=new gF(c);
		U(A,Xm,function () {
			var I=sf(c.value||n)||!p.ig;
			lD(s,
			I)
		});
		U(b,mu,function () {
			x(b,wl);
			if(sf(b.value)) {
				b.value=UT;
				p.Wz=e
			}
		});
		U(c,mu,function () {
			x(c,wl);
			if(sf(c.value)) {
				c.value=l;
				p.ig=e
			}
		});
		U(g,T,function () {
			Sj(a,i);
			Sj(d,i);
			Sj(g,e);
			Sj(k,i)
		});
		U(k,T,function () {
			Sj(a,e);
			Sj(d,e);
			Sj(g,i);
			Sj(k,e)
		});
		U(s,T,this.YI,e,this);
		fD(f)
	};
	TT.prototype.YI=function () {
		var a=this.lC.value||n;
		if(a==UT)a=n;
		var b=this.kC.value||n;
		if(sf(b)||!this.ig)return ;
		var c=as(M(this.m,mO).value),d=new eU;
		d.Hb(a);
		d.Zj(b,i);
		d.gL(bs(c));
		d.VK(this.rB.checked);
		d.XI(r(X.u,X));
		this.ig=e
	};
	function fU() {
		cT.call(this,Ek(R.rp()));
		this.m=h;
		this.ig=e;
		this.Mf=i
	}v(fU,TT);
	fU.prototype.K=function () {
		var a=gU({
			pm:_LINK_BOOKMARKLET_URL
		});
		a=this.m=hU({
			jH:a,gw:UT
		});
		this.mn();
		var b=this.np(_USER_PROFILE_ID);
		M(b,HT).appendChild(a);
		return b
	};
	function dU(a) {
		U(a,T,function (b) {
			alert(WT());
			b.preventDefault()
		})
	}var iU='Right-click on this link and choose "Add to favorites" and then use it to add any item from around the web to Google Reader.',jU="Drag this link to your browser's toolbar and then use it to add any item from around the web to Google Reader.";
	function WT() {
		return H.Kc()?iU:jU
	}function kU() {
		XS.call(this);
		this.Mf=i
	}v(kU,XS);
	kU.prototype.Yb=function (a,b) {
		a=Yx.wb;
		if(!a) {
			b(e,this);
			return
		}function c(d) {
			return d&&d.f().G(Ek(R.hh()))
		}b(c(a)||c(a.A),this)
	};
	kU.prototype.K=function () {
		return lU()
	};
	function mU(a,b,c) {
		this.He=c;
		this.Xd=b;
		this.Tm=a;
		this.Ht=h;
		this.kj=this.Hl=e;
		this.Tk=gI(this.He)[0]
	}m=mU.prototype;
	var nU="viewer-details-stats-container";
	m.Mu=function () {
		return M(this.He,nU)
	};
	m.reset=function () {
		Cl(this.Ht);
		Sj(this.He,e);
		this.Tk.wr(0);
		this.Xd.innerHTML=n;
		this.Mu().innerHTML=n;
		this.Hl=this.kj=e;
		this.Zp=e
	};
	var oU="show details";
	m.qK=function () {
		this.Xd.innerHTML=oU;
		w(this.He,Q);
		this.Ht=U(this.Xd,T,t(Rx,r(this.cM,this)))
	};
	var pU="hide details",rU="details-loading";
	m.cM=function () {
		if(this.Zp)return ;
		this.kj=!this.kj;
		if(!this.kj) {
			this.Xd.innerHTML=oU;
			Sj(this.He,e);
			this.Tm.ca();
			return
		}if(this.Hl) {
			Sj(this.He,i);
			this.Xd.innerHTML=pU;
			this.Tm.ca();
			return
		}this.Xd.innerHTML=n;
		this.Zp=i;
		w(this.Xd,rU);
		this.kj&&Op(Pc);
		Kr(this.Tm.f(),r(this.nu,this),r(this.nu,this,i))
	};
	var sU="-1",tU="viewer-no-details",uU="details unavailable";
	m.nu=function (a,b) {
		if(this.Hl)return ;
		this.Hl=i;
		b=b||a.streamDetailsError||(!a.subscribers||a.subscribers==sU)&&!a.velocity&&a.successfulCrawlTimeUsec==sU&&a.failedCrawlTimeUsec==sU;
		var c=vU({
			subscribers:a.subscribers,velocity:a.velocity,Nz:a.successfulCrawlTimeUsec,UL:gD(a.successfulCrawlTimeUsec),iu:a.failedCrawlTimeUsec,iD:gD(a.failedCrawlTimeUsec),lastFailureWasParseFailure:a.lastFailureWasParseFailure,kb:sD(Kd)
		});
		this.Mu().appendChild(c);
		y(this.He,tU,b);
		if(b)c.innerHTML=uU;
		else {
			this.Tk.Rl(0,a.dayChart);
			this.Tk.Rl(1,a.hourChart);
			this.Tk.Rl(2,a.dowChart)
		}x(this.Xd,rU);
		this.Xd.innerHTML=pU;
		Sj(this.He,i);
		this.Tm.ca();
		this.Zp=e
	};
	var wU="preview-subscribe-button";
	function CT(a,b,c) {
		b=xU({
			HG:b,kN:c==yn,hm:c==sy,Jw:c==ET
		});
		M(b,wU).onclick=a;
		return b
	}function WQ(a) {
		iA.call(this,a);
		this.Ga=t(Rx,r(this.Ga,this))
	}v(WQ,iA);
	m=WQ.prototype;
	var yU="email",zU="link unselectable",AU="Email";
	m.K=function () {
		this.m=N(Vy,{
			"class":yU
		});
		var a=N(Vy,{
			"class":zU
		});
		a.innerHTML=AU;
		this.m.appendChild(a);
		U(this.m,T,this.Ga,e,this);
		return this.m
	};
	m.n=function () {
		V(this.m,T,this.Ga,e,this);
		this.gh&&this.zd()
	};
	m.Ga=function () {
		this.gh?this.zd():this.Pr()
	};
	var BU="email-active";
	m.zd=function () {
		this.gh=e;
		for(var a=0,b;b=this.la[a];a++)Cl(b);for(var a=0;b=this.Zd[a];a++)b();x(this.m,BU);this.rr.Ch()
	};var CU="email-this-subject",DU="email-this-to",EU="email-this-cancel",FU="email-this-send";
	m.Pr=function () {
		this.gh=i;
		this.na=this.rr.Nr(GU({
			userName:_USER_NAME,userEmail:_USER_EMAIL
		}));
		var a=this.rr.Pi();
		a=a?HU(Oj(Sf(a))):n;
		M(this.na,CU).value=a;
		w(this.m,BU);
		a=M(this.na,DU);
		var b=M(this.na,EU),c=M(this.na,FU);
		this.la=[];
		this.la.push(U(b,T,this.zd,e,this));
		this.la.push(U(c,T,this.Gy,e,this));
		this.Zd=[];
		this.Zd.push($m(b,r(this.zd,this)));
		this.Zd.push($m(c,r(this.Gy,this)));
		a.focus();
		IU(a);
		UC(X.Ba(),this.na)
	};
	var JU="email-this-to-error",KU="email-this-subject-error",LU="email-this-comment-error",MU="Your email could not be sent",NU="Your email has been sent",OU="emailTo",PU="comment",QU="email-this-comment",RU="subject",SU="ccMe",TU="email-this-ccme";
	m.Gy=function () {
		var a=new Tq,b=M(this.na,JU),c=M(this.na,KU),d=M(this.na,LU);
		w(b,Q);
		w(c,Q);
		w(d,Q);
		a.Va(function () {
			Z(MU,Kq);
			AK(a.text,{
				emailTo:t(BK,b),subject:t(BK,c),comment:t(BK,d)
			})
		});
		var f=this;
		a.va(function () {
			Z(NU,Ss);
			f.zd()
		});
		a.Tb(bb,Xj([[fp,this.p.R()],[OU,M(this.na,DU).value],[PU,M(this.na,QU).value],[RU,M(this.na,CU).value],[SU,M(this.na,TU).checked.toString ()]]));
		lr(this.p,Rb)
	};
	function UQ(a) {
		iA.call(this,a);
		this.Ga=t(Rx,r(this.Ga,this))
	}v(UQ,iA);
	var UU="broadcast-with-note link",VU="Share with note";
	UQ.prototype.K=function () {
		this.m=N(Vy,{
			"class":UU
		});
		var a=N(Vy,{
			"class":zU
		});
		a.innerHTML=VU;
		this.m.appendChild(a);
		U(this.m,T,this.Ga,e,this);
		return this.m
	};
	UQ.prototype.n=function () {
		V(this.m,T,this.Ga,e,this)
	};
	UQ.prototype.Ga=function () {
		if(this.Mh&&this.Mh.BG()) {
			this.Mh.eC();
			this.Mh=h
		}else {
			this.Mh=new ho;
			this.Mh.WK(this.p.R());
			this.Mh.pn()
		}
	};
	UQ.prototype.Yb=function () {
		if(!this.p.Eh())return i;
		return this.p.Ni().hf()
	};
	function VQ(a) {
		iA.call(this,a);
		this.Sk=t(Rx,r(this.Sk,this))
	}v(VQ,iA);
	VQ.prototype.Yb=function () {
		return this.p.Eh()&&!this.p.Ni().hf()
	};
	var WU="note-delete link",XU="Delete";
	VQ.prototype.K=function () {
		this.m=N(Vy,{
			"class":WU
		});
		var a=N(Vy,{
			"class":zU
		});
		a.innerHTML=XU;
		this.m.appendChild(a);
		U(this.m,T,this.Sk,e,this);
		return this.m
	};
	VQ.prototype.n=function () {
		V(this.m,T,this.Sk,e,this)
	};
	VQ.prototype.Sk=function () {
		var a=new eU;
		a.BK(this.p.R());
		a.CC(r(X.u,X))
	};
	var YU=e,ZU=h;
	function XQ(a) {
		iA.call(this,a)
	}v(XQ,iA);
	m=XQ.prototype;
	var $U="entry-tagging-action-title",aV="tag link unselectable";
	m.K=function () {
		this.la=[];
		this.nm=N(Vy,{
			"class":$U
		});
		this.Jy();
		this.la.push(U(this.nm,T,this.Ga,e,this));
		this.m=N(Vy,{
			"class":aV
		});
		this.m.appendChild(this.nm);
		this.ss=this.Av();
		this.m.appendChild(this.ss);
		return this.m
	};
	m.n=function () {
		for(var a=0,b;b=this.la[a];a++)Cl(b);this.mm&&this.mm.n()
	};var bV="Edit tags: ",cV="Add tags";m.Jy=function () {
		var a=this.nm;
		a.innerHTML=n;
		a.appendChild(sj(er(this.p).length>0?bV:cV))
	};
	var dV="user-tags-list";
	m.Av=function () {
		var a=er(this.p),b=N(dp,{
			"class":dV
		}),c=i;
		for(var d=0,f;f=a[d];d++) {
			var g=eV({
				tagName:f.getName()
			}),k=g.getElementsByTagName(Vf)[0];
			this.la.push(wA(k,Ek(f),h,i));
			if(c)c=e;
			else g.insertBefore(sj(fa),g.firstChild);
			b.appendChild(g)
		}return b
	};
	m.Ga=function () {
		this.gh?this.zd():window.setTimeout(r(this.Pr,this),0)
	};
	m.Pr=function () {
		this.gh=i;
		this.bG();
		var a=Kt(this.na),b=Gt(this.Wc()),c=X.Ba(),d=Kt(c),f=Kt(this.nm);
		b=f.top-(b-a.top)-d.top+c.scrollTop;
		f=f.left+f.width-d.left;
		if(f+a.width>d.width)f=d.width-a.width;
		this.na.style.top=b+yt;
		this.na.style.left=f+yt;
		x(this.na,$R);
		a=this.Wc();
		d=this.Lu();
		a.value=d.length?d.join(fa)+fa:n;
		a.focus();
		IB(a,a.value.length);
		UC(c,this.na);
		if(!YU) {
			YU=i;
			Ym(function () {
				return ZU?ZU.na:h
			},r(this.zd,this))
		}ZU=this
	};
	m.Lu=function () {
		var a=er(this.p),b=[];
		for(var c=0;c<a.length;c++)b.push(a[c].getName());return b
	};var fV="tags-edit-save",gV="tags-edit-cancel";m.bG=function () {
		var a=this.na=hV();
		w(a,$R);
		var b=r(this.MJ,this),c=r(this.zd,this),d=r(this.YB,this);
		this.Yo=[];
		this.Zd=[];
		var f=this.Wc();
		this.Zd.push($m(f,b,d));
		this.Zd.push(an(27,f,c,d));
		this.mm=fD(f);
		d=M(a,fV);
		this.Zd.push($m(d,b));
		this.Yo.push(U(d,T,b));
		b=M(a,gV);
		this.Zd.push($m(b,c));
		this.Yo.push(U(b,T,c));
		X.Ba().appendChild(a)
	};
	var iV="tags-edit-tags";
	m.Wc=function () {
		return M(this.na,iV)
	};
	m.MJ=function () {
		try{
			var a=as(this.Wc().value)
		}catch(b) {
			alert(b);
			return
		}a=jV(this.Lu(),a);
		function c(f) {
			var g=[];
			for(var k=0;k<f.length;k++)g.push(R.vh(f[k]));return g
		}this.zd();var d=this;Gq(this.p,c(a.Td),c(a.se),function () {
			d.Jy();
			var f=d.ss,g=d.Av();
			f.parentNode.replaceChild(g,f);
			d.ss=g
		})
	};
	m.zd=function () {
		this.gh=e;
		B(this.na);
		ZU=this.na=h;
		for(var a=0,b;b=this.Yo[a];a++)Cl(b);for(var a=0;b=this.Zd[a];a++)b()
	};m.YB=function () {
		return !this.mm||!this.mm.v.H()
	};
	function kV(a) {
		py.call(this);
		this.ob=a;
		this.of=100
	}v(kV,py);
	m=kV.prototype;
	m.Ya=function () {
		kV.d.Ya.call(this);
		this.aG()
	};
	m.reset=function () {
		this.qr(0);
		var a=this.Qi();
		B(a);
		kV.d.reset.call(this);
		this.Ba().appendChild(a);
		this.Jm=0;
		this.Im=-1
	};
	m.Hi=function (a,b) {
		this.JL=-1;
		kV.d.Hi.call(this,a,b)
	};
	m.eg=function (a,b) {
		kV.d.eg.call(this,a,b);
		if(this.Po==b.R()) {
			this.Po=h;
			this.Jm=a;
			this.Im=a-1;
			this.Xh(a);
			window.setTimeout(r(this.Rm,this),200)
		}
	};
	m.Oo=function () {
		kV.d.Oo.call(this);
		if(this.Po&&this.Fp)if(this.fa.length<100) {
			this.jj=i;
			this.Fj.xk()
		}else this.Po=h;
		else this.hx()
	};
	m.Lg=function (a) {
		if(this.V||!this.Ta)return ;
		if(this.ja<=0)return ;
		this.Xh(this.ja-1,a)
	};
	m.yc=function () {
		return this.Ta?this.Ba():h
	};
	m.Cm=function (a) {
		if(!this.yc())return ;
		var b=H.Sd()?60:30;
		this.ob.nz(a?b:-b)
	};
	m.Hd=function (a) {
		if(!this.yc())return ;
		var b=this.ob.$i()-50;
		this.ob.nz(a?+b:-b)
	};
	m.zu=function (a) {
		if(!this.yc())return ;
		a?this.ob.Ir(this.ob.xv()):this.ob.Ir(0)
	};
	m.vz=function (a) {
		if(this.V) {
			this.Hd(a);
			return
		}if(!this.Ta)return ;
		if(this.ja==-1) {
			a&&this.Je();
			return
		}var b=this.Aa().D,c=b.offsetTop;
		b=c+b.offsetHeight;
		var d=this.ob.wl(),f=this.ob.$i();
		f=d+f;
		if(a&&b<=f||!a&&c>=d)if(a)this.ja>=this.fa.length-1?this.wz():this.Je();
		else this.Lg();
		else this.Hd(a)
	};
	m.wz=function () {
	};
	m.Je=function (a) {
		if(this.V||!this.Ta)return ;
		if(this.ja>=this.fa.length-1)return ;
		this.Xh(this.ja+1,a,e,2)
	};
	m.Xh=function (a,b,c,d) {
		if(this.ja==a)return ;
		this.Aa();
		this.JL=Wj();
		this.jN=this.fa[a].lg();
		this.jb().hD||(b=i);
		this.ja=a;
		if(c)this.hk();
		else b?this.Rm():this.Gi(this.ja,d)
	};
	m.Rm=function (a) {
		var b=this.Ba(),c=this.Aa().D;
		if(this.jb()==ny.$b) {
			this.hk();
			this.qr(c.offsetTop)
		}else {
			this.hk();
			UC(b,c,a)
		}
	};
	m.qr=function (a) {
		if(this.ob.wl()==a)return ;
		this.mq=i;
		this.OJ=a;
		var b=this;
		window.setTimeout(function () {
			b.mq=e
		},2000);
		this.ob.Ir(a)
	};
	m.BM=function () {
		var a=this.ob.wl();
		if(this.mq&&a==this.OJ) {
			this.mq=e;
			return
		}if(this.V||this.jb()!=ny.$b)return ;
		if(a==0) {
			this.ja=0;
			this.hk();
			return
		}var b=this.ob.$i(),c=a+b-this.Qi().offsetHeight;
		for(var d=0,f;f=this.fa[d];d++) {
			var g=f.D,k=g.offsetTop;
			g=k+g.offsetHeight;
			if(f.Ln&&g>=a+15&&k<a||(a<=k||g>=c||this.ja==-1&&d==0&&g>a)&&k<a+b*0.67) {
				if(this.ja!=d) {
					this.ja=d;
					this.hk()
				}break
			}
		}
	};
	m.CM=ck(100,kV.prototype.BM);
	var lV="current-entry";
	m.hk=function () {
		var a=lV,b=J(a);
		if(b)b.id=n;
		if(b=this.Aa()) {
			if(Ks()&&this.jb()==ny.$b&&this.UI!=b) {
				var c=this.ja;
				if(c<this.Jm) {
					for(var d=c;d<this.Jm;d++)this.fa[d].Oh();this.Jm=c
				}if(c>this.Im) {
					for(var d=this.Im+1;d<=c;d++)this.fa[d].Oh();this.Im=c
				}
			}b.D.id=a;this.UI=b
		}
	};m.hx=function () {
		this.kt();
		var a=this;
		this.Cq=window.setTimeout(function () {
			a.Cq=h;
			a.vH()
		},200)
	};
	m.kt=function () {
		this.Cq&&window.clearTimeout(this.Cq)
	};
	m.vH=function () {
		if(!this.Fp||this.V||this.jj)return ;
		var a=this;
		function b() {
			a.jj=i;
			a.Fj.xk()
		}if(this.ja>=this.fa.length-5) {
			b();
			return
		}var c=this.ob.$i(),d=this.ob.wl()+c,f=this.ob.xv(),g=this.Du();
		d=f-g-d;
		f=this.jb()==ny.$b?2:0.5;
		d<=c*f&&b()
	};
	m.Du=function () {
		return 0
	};
	m.Gi=function (a,b) {
		kV.d.Gi.call(this,a);
		this.Rm(b)
	};
	m.rc=function (a) {
		if(this.f()&&this.f().ha()&&this.jb()==ny.jd) {
			this.V?this.Aa().so():this.Aa().Cp(a);
			return
		}if(this.V||!this.Ta||this.jb()==ny.$b)return ;
		if(this.ja!=this.Qf)this.ja!=-1&&this.Gi(this.ja);
		else {
			if(this.ja!=-1) {
				this.Aa().collapse();
				this.Rm();
				if(H.Kc()) {
					var b=this.Ba();
					b.style.styleFloat=Vo;
					window.setTimeout(function () {
						b.style.styleFloat=hb;
						b=h
					},1)
				}
			}this.Qf=-1
		}
	};
	var mV="magnification",nV="magnification-active";
	m.ct=function (a) {
		var b=mV+this.of;
		x(document.body,b);
		this.of+=a;
		if(this.of<100)this.of=100;
		else if(this.of>150)this.of=150;
		y(document.body,nV,this.of>100);
		b=mV+this.of;
		w(document.body,b)
	};
	m.Yq=function () {
		w(this.Qi(),Q);
		this.kt()
	};
	var oV="scroll-filler-all-items-link",pV="scroll-filler-overview-link",qV="scroll-filler-offline-link",rV="scroll-filler-search-link",sV="http://blogsearch.google.com/blogsearch?q=";
	m.aG=function () {
		J(oV)&&wA(J(oV),Tk());
		if(J(pV))J(pV).onclick=function () {
			vx.select();
			return e
		};
		if(J(qV))J(qV).onclick=VM;
		if(J(rV)) {
			var a=this;
			J(rV).onclick=function () {
				J(rV).href=sV+a.f().Bb();
				return i
			}
		}
	};
	var tV="scroll-filler";
	py.prototype.Qi=function () {
		if(!this.su)this.su=J(tV);
		return this.su
	};
	kV.prototype.rz=function () {
		var a;
		if(this.jb()!=ny.$b)Cm(function (b) {
			a=b
		});
		else a=i;
		a=a||this.f()&&this.f().ha();
		return !this.V&&a&&this.fa&&this.fa.length&&!this.Fp
	};
	kV.prototype.mA=function () {
		var a=this.fa[this.fa.length-1],b=this.Qi();
		x(b,Q);
		if(this.jb()==ny.$b) {
			var c=this.ob.$i();
			a=a.D.offsetHeight;
			b.style.height=(a<c?c-a:0)+yt
		}else b.style.height=eC
	};
	kV.prototype.qw=function (a) {
		this.Ba().insertBefore(a,this.Qi())
	};
	kV.prototype.updateStatus=function (a,b) {
		kV.d.updateStatus.call(this,a,b);
		!b&&this.Ta&&a>0&&this.rz()&&this.mA()
	};
	function uV() {
	}function TQ() {
		kV.call(this,new vV(this));
		this.sw=[];
		this.Vl=[]
	}v(TQ,kV);
	m=TQ.prototype;
	var wV="viewer-details-placeholder",xV="viewer-details",yV="viewer-details-toggle";
	m.Ya=function () {
		TQ.d.Ya.call(this);
		this.Jo=t(Rx,r(this.Jo,this));
		Y.Vn(function (d,f,g) {
			var k=X.f();
			k&&d.G(k)&&X.oA(f,g)
		});
		this.kd(new gT);
		this.kd(new dT);
		this.kd(new zT);
		this.kd(new GT);
		this.kd(new NT);
		this.kd(new TT);
		this.kd(new fU);
		this.kd(new BT);
		this.kd(new DT);
		this.kd(new kU);
		var a=this;
		ys(function (d) {
			a.bi(d,i)
		});
		var b=J(wV),c=J(xV);
		ti(c,b);
		this.Xr=new mU(this,J(yV),c);
		this.vK()
	};
	var zV="stream-prefs-menu",AV="stream-prefs-menu-contents",BV="show-all",CV="show-new",DV="view-search",EV="view-cards",FV="view-list",GV="entries-up",HV="entries-down",IV="mark-all-as-read",JV="stream-unsubscribe",KV="stream-rename",LV="stream-translate",MV="viewer-translate-revert-link",NV="set-as-start",OV="viewer-refresh";
	m.vK=function () {
		var a=this;
		Ym(function () {
			return a.iq()?[J(zV),J(AV)]:h
		},function () {
			a.Jf()
		});
		Sm(BV,{
			event:T,$:r(this.bi,this,i,e)
		});
		Sm(CV,{
			event:T,$:r(this.bi,this,e,e)
		});
		Sm(DV,{
			event:T,$:r(this.Md,this,ny.jd,e)
		});
		Sm(EV,{
			event:T,$:r(this.Md,this,ny.$b,e)
		});
		Sm(FV,{
			event:T,$:r(this.Md,this,ny.pk,e)
		});
		Sm(GV,{
			event:T,$:function () {
				a.Lg(e);
				Op(Oc)
			}
		});
		Sm(HV,{
			event:T,$:function () {
				a.Je(e);
				Op(Oc)
			}
		});
		Tm(this.Ba(),{
			event:Um,$:r(this.CM,this)
		});
		Tm(this.Ba(),{
			event:Um,$:r(this.hx,this)
		});
		for(var b in ts) {
			var c=ts[b];
			Tm(c.K(),{
				event:T,$:r(this.yf,this,c,e)
			})
		}Sm(zV,{
			event:T,$:r(this.Zz,this),Co:Rx
		});
		Sm(IV,{
			event:T,$:r(this.vm,this)
		});
		Sm(JV,{
			event:T,$:r(this.vM,this)
		});
		Sm(KV,{
			event:T,$:r(this.xJ,this)
		});
		Sm(LV,{
			event:T,$:r(this.$z,this,e)
		});
		Sm(MV,{
			event:T,$:r(this.$z,this,e)
		});
		Sm(NV,{
			event:T,$:r(this.bM,this)
		});
		Sm(OV,{
			event:T,$:function () {
				Op(Qc);
				a.u(e,i)
			}
		});
		Nm(r(this.qr,this,0))
	};
	m.kq=function () {
		return i
	};
	m.reset=function () {
		TQ.d.reset.call(this);
		this.Vl=[];
		this.Uv=e;
		if(this.f()&&!this.f().ha()) {
			this.qo();
			this.Mk()
		}this.Xr&&this.Xr.reset()
	};
	m.u=function (a,b) {
		!this.V&&this.f().ha()?this.iy():TQ.d.u.call(this,a,b)
	};
	m.Hi=function (a,b) {
		TQ.d.Hi.call(this,a,b);
		b=Cy.oq(a);
		this.hz(b);
		this.tz(b);
		this.mG();
		a.Xp()&&this.Xr.qK();
		Y.uh(a,r(this.oA,this))
	};
	var PV="tagged";
	m.tp=function () {
		var a=TQ.d.tp.call(this),b=this.f();
		if(a==hs&&b.J.Ka&&!b.lq()&&!Yx.CG(b))return PV;
		return a
	};
	var QV="viewer-search-parent";
	m.pu=function () {
		var a=this.ma.jr;
		J(QV).innerHTML=RV(a)
	};
	var SV="viewer-search-item-parent";
	m.qo=function () {
		J(QV).innerHTML=n;
		J(SV).innerHTML=n
	};
	var TV="search-item-bottom-links";
	m.Mk=function () {
		var a=J(TV);
		if(a)a.innerHTML=n
	};
	m.search=function (a,b,c,d) {
		var f=new Ak(a,c);
		b!==0&&!b&&vm.jd.Ub([a,n].concat(f.Vi()));
		lH();
		d||this.Br(ny.jd);
		var g=this,k=new UV(f,function () {
			var l=k.f();
			Bm(l);
			g.be(l,k,!d);
			g.Mk();
			g.pu();
			if(b===0||b)g.Dy(b)
		},c,20,undefined)
	};
	m.iy=function () {
		this.search(this.f().Bb(),undefined,this.f().Nj,i)
	};
	m.Dy=function (a) {
		var b=this;
		this.ma.lh(a,function () {
			while(a>=b.fa.length)b.Fj.xk();
			b.fa[a].Cp(h)
		})
	};
	m.Yq=function (a,b,c) {
		TQ.d.Yq.call(this,a,b,c);
		if(!a.ha()) {
			vm.RA.Ub([a.streamId]);
			wH()
		}a.cL(Cy.oq(a))
	};
	var VV="state-stream",WV="search-stream",XV="item-stream";
	m.$F=function (a) {
		Am();
		w(J(ZR),$R);
		this.KF();
		var b=a.Zc()&&a.J.Ka&&!a.yw()&&a.rb().type==qb&&!a.mg()&&!a.G(Ek(R.hh()));
		y(J(ZR),VV,b);
		y(J(ZR),VV,b);
		y(J(id),WV,a.ha());
		y(J(id),XV,a.TG())
	};
	m.xt=function (a,b) {
		var c=this;
		Cm(function (d) {
			c.ma=d?new sL(a):new ty(a,20);
			b()
		})
	};
	var YV="&nbsp;",ZV="quick-add-success-title";
	m.lw=function () {
		var a=this.f(),b=this.ma,c=this;
		this.Ze(function (d) {
			var f=J(XR);
			function g(k) {
				if(d==h) {
					f.innerHTML=YV;
					return
				}if(k) {
					f.innerHTML=n;
					k=N(Vf,{
						target:Iy,href:k
					});
					k.innerHTML=d;
					f.appendChild(k)
				}else f.innerHTML=d
			}if(a.J.Ka&&!a.Zc()) {
				if(a.Eb()||a.J==ok) {
					g($a+a.rb().userId);
					return
				}g($a+a.streamId);
				return
			}a.Xp()?g($f):g(h);
			b.pl(function (k) {
				g(k);
				J(ZV).innerHTML=d;
				c.ca()
			})
		})
	};
	var $V="Feed settings...",aW="Folder settings...",bW={
		"single-feed":{
			Ee:"single-feed-menu",Tg:$V
		},"friend-stream":{
			Ee:"friend-stream-menu",Tg:$V
		},folder:{
			Ee:"folder-menu",Tg:aW
		},"reading-list":{
			Ee:"reading-list-menu",Tg:"View settings..."
		},"state-stream":{
			Ee:"state-stream-menu",Tg:h
		},"search-stream":{
			Ee:"search-stream-menu",Tg:h
		}
	},cW="friend-stream",dW="single-feed";
	TQ.prototype.mG=function () {
		var a=this.f(),b=J(zV),c=J(AV);
		for(var d in bW) {
			var f=bW[d].Ee;
			x(b,f);
			x(c,f)
		}var d;
		if(a&&a.ha())d=WV;
		else if(a&&a.Eb()) {
			d=cW;
			this.Np()
		}else if(!a.J.Ka||!a.Zc()) {
			d=dW;
			this.Np()
		}else {
			d=a.rb();
			if(d.type==nb||d.G(R.fe())||d.G(R.hh()))d=AS;
			else if(a.mg()) {
				d=wb;
				var g=this;
				Ts(function (k) {
					g.dz(g.f().streamId==k)
				})
			}else d=VV
		}a=bW[d];
		jD(b,a.Tg);
		w(b,a.Ee);
		w(c,a.Ee)
	};
	var eW="stream-folder-chooser";
	TQ.prototype.Np=function () {
		this.uu&&this.uu.close();
		var a=this.f();
		this.uu=new fW(a,r(this.AB,this),J(eW),i)
	};
	TQ.prototype.AB=function (a) {
		this.Jf();
		var b=this;
		this.bg(function (c) {
			Ur(b.f().streamId,a,c,function () {
				b.Np()
			})
		})
	};
	var gW=["0 new items","1 new item","2 new items","3 new items","4 new items","5 new items","6 new items","7 new items","8 new items","9 new items","10 new items"];
	m=TQ.prototype;
	var hW="%1 new items";
	m.oA=function (a,b) {
		J(CV).innerHTML=Fj(a,b,gW,hW)
	};
	m.bk=function () {
		x(J(ZR),$R);
		TQ.d.bk.call(this)
	};
	m.eg=function (a,b) {
		TQ.d.eg.call(this,a,b);
		if(!this.Uv&&b!=h) {
			this.Mt(e);
			this.Uv=i
		}this.Ta||es(this.f(),this.Fj.ma)
	};
	m.kd=function (a) {
		this.sw.push(a)
	};
	m.Mt=function (a) {
		var b=this.f(),c=this;
		for(var d=0,f;f=this.sw[d];d++) {
			if(a&&!f.Mf)continue;
			f.Yb(b,function (g,k) {
				g&&c.Lt(k)
			})
		}
	};
	m.Lt=function (a) {
		a=a.K();
		ri(a,this.Ba().firstChild);
		this.Vl.push(a);
		this.ca()
	};
	m.bC=function () {
		Pe(this.Vl,B)
	};
	m.Du=function () {
		var a=0;
		for(var b=0,c;c=this.Vl[b];b++)a+=c.offsetHeight;return a
	};m.Fv=function () {
		uy();
		var a=this.f(),b=new xT,c=this;
		b.Yb(a,function (d) {
			if(d) {
				c.Lt(b);
				c.bk()
			}else kK(a,c.ma,r(c.tK,c))
		})
	};
	var iW="h2",jW="no-entries-msg",kW="View all items";
	m.tK=function (a,b) {
		this.ma.ad||this.Mt(i);
		var c=N(iW);
		c.innerHTML=a;
		a=N(C,{
			id:jW
		});
		a.appendChild(c);
		if(b) {
			b=N(Vy,{
				"class":tb
			});
			b.innerHTML=kW;
			var d=this;
			Tm(b,{
				event:T,$:function () {
					d.bC();
					d.u(i)
				}
			});
			a.appendChild(b)
		}this.Ba().appendChild(a);
		this.f().yw()&&U(M(c,Jc),T,function () {
			Jx.select()
		});
		this.bk()
	};
	m.RC=function () {
		this.es(XQ)
	};
	m.Jo=function () {
		this.es(WQ)
	};
	m.$L=function () {
		this.es(UQ)
	};
	m.yc=function () {
		return this.V?J(WR):TQ.d.yc.call(this)
	};
	m.wz=function () {
		Yx.Kh.YJ()
	};
	var lW="link-selected";
	m.bi=function (a,b) {
		y(J(BV),lW,a);
		y(J(CV),lW,!a);
		TQ.d.bi.call(this,a,b)
	};
	var mW="view-";
	m.Md=function (a,b) {
		if(!TQ.d.Md.call(this,a,b))return e;
		this.MM(mW,lW);
		var c=this.Ba();
		if(!b) {
			c.style.visibility=Q;
			var d=this;
			window.setTimeout(function () {
				!d.f().ha()&&Xs(a==ny.$b);
				H.Kc()&&d.f().ha()?d.iy():d.be(d.f(),!H.Kc()?d.ma:h)
			},1)
		}return i
	};
	m.yf=function (a,b) {
		TQ.d.yf.call(this,a,b);
		if(!b) {
			Cy.yf(this.f(),a);
			this.Jf();
			this.u()
		}
	};
	m.$z=function (a) {
		var b=Cy.oq(this.f());
		this.hz(!b);
		if(!a) {
			Cy.dL(this.f(),!b);
			this.tz(!b);
			this.Jf();
			this.u()
		}
	};
	m.hz=function (a) {
		var b=J(LV);
		y(b,Ou,a)
	};
	var nW="viewer-translated-by";
	m.tz=function (a) {
		a?x(J(nW),Q):w(J(nW),Q)
	};
	m.Zz=function () {
		var a=J(zV),b=J(AV);
		if(this.iq()) {
			cx(a,e);
			w(b,Q)
		}else {
			document.body.appendChild(b);
			var c=Kt(a);
			b.style.left=c.left-1+yt;
			b.style.top=c.top+c.height-1+yt;
			b.style.maxHeight=ki(window).height-c.top-c.height+yt;
			cx(a,i);
			x(b,Q)
		}
	};
	m.iq=function () {
		return nD(J(zV))
	};
	m.Jf=function () {
		this.iq()&&this.Zz()
	};
	m.vM=function () {
		this.Jf();
		var a=this,b=this.f().streamId;
		this.bg(function (c) {
			Pr(b,c,r(a.u,a,e))
		})
	};
	var oW="What would you like to call this subscription?";
	m.xJ=function () {
		this.Jf();
		var a=this;
		this.bg(function (b) {
			var c=oK(oW,b);
			c&&c!=b&&Ur(a.f().streamId,{
				Td:[],se:[]
			},c,function () {
				Zk.cC(a.f());
				a.lw()
			})
		})
	};
	m.bM=function () {
		this.Jf();
		var a=this;
		Ts(function (b) {
			var c=a.f().streamId;
			(b=c==b)?Rs(fc[hs],JH):a.bg(function (d) {
				Rs(c,d)
			});
			a.dz(!b)
		})
	};
	m.dz=function (a) {
		var b=J(NV);
		if(!b)return ;
		y(b,Ou,a)
	};
	var pW="quick-add-success";
	m.rn=function () {
		x(J(pW),Q);
		this.ca()
	};
	m.KF=function () {
		w(J(pW),Q);
		this.ca()
	};
	m.AL=function (a) {
		y(J(zV),Q,!a)
	};
	var qW="unsubscribed-stream";
	m.BL=function (a,b) {
		this.jq=a;
		this.AL(a);
		b=!b||!b.ha();
		y(J(id),qW,!(a&&b))
	};
	m.Gm=function (a) {
		var b=this.f();
		if(!b.ha())return ;
		fQ(a,b.Bb())
	};
	m.Dq=function (a) {
		return (a=S.ib(a))?Lf(a.q):h
	};
	m.ca=function () {
		MM()
	};
	var rW="mark-as-read-dialog",sW="Mark all as read?",tW="Mark all as read",uW="confirm-mark-all-read-cb";
	m.nx=function (a,b,c) {
		var d=this;
		ct(function (f) {
			if(!f) {
				c(i);
				return
			}f=new cD(rW);
			f.Wm(0.5);
			var g=u(sW);
			f.Xj(i);
			f.Hb(g);
			g=u(tW);
			var k=u(LC),l=new EC;
			l.set(QC,g,i);
			l.set(JC,k,e,i);
			f.Id(l);
			g=vW({
				title:a,count:b,IG:b>=1000
			});
			k=M(g,uW,Xm);
			f.Y().appendChild(g);
			U(f,IC,r(d.GH,d,c,k));
			f.B(i)
		})
	};
	m.GH=function (a,b,c) {
		b.checked&&bt(e);
		a(c.Ea==QC)
	};
	function vV(a) {
		uV.call(this);
		this.WM=a
	}v(vV,uV);
	m=vV.prototype;
	m.wl=function () {
		return this.sd()?this.sd().scrollTop:0
	};
	m.Ir=function (a) {
		if(this.sd())this.sd().scrollTop=a
	};
	m.nz=function (a) {
		if(this.sd())this.sd().scrollTop+=a
	};
	m.xv=function () {
		return this.sd()?this.sd().scrollHeight:0
	};
	m.$i=function () {
		return this.sd()?this.sd().offsetHeight:0
	};
	m.sd=function () {
		return this.WM.yc()
	};
	function wW(a,b) {
		this.ks=[];
		nA.call(this,a,b)
	}v(wW,nA);
	wW.prototype.Lj=function () {
		var a;
		wW.d.Lj.call(this);
		for(var a=0,b;b=this.ks[a];a++)b.n()
	};var xW=[hA,wz,Ny];m=wW.prototype;
	var yW="created-with-image",zW="created-no-title";m.hp=function () {
		var a=wW.d.hp.call(this).split(o);
		if(this.p.Cc()) {
			a.push(Ib);
			this.si.by&&a.push(yW);
			this.si.pd||a.push(zW)
		}return a.join(o)
	};
	var AW="entry-date",BW="entry-body",CW="entry-body-empty",DW="entry-title",EW="entry-title-link",FW="entry-source-title",GW="entry-annotations",HW="entry-author-name",IW="entry-post-author-name",JW="friend-link";
	m.Qu=function () {
		var a=this.p,b=this.si,c=KW(b);
		this.Rn(M(c,AW,C));
		var d=M(c,BW,C);
		Ey(a,xW,d);
		if(a.pi) {
			this.en(d);
			Ph&&!Sh(mj)&&this.EJ(d);
			var f=d.getElementsByTagName(Vf);
			for(var g=0,k;k=f[g];g++)this.la.push(U(k,T,this.iM,e,this))
		}else w(d,CW);g=M(c,DW,iW);this.en(g);if(b.bd) {
			f=M(c,EW,Vf);
			this.la.push(U(f,T,this.Hv,e,this))
		}this.oG(b.Qd,c);
		g=[g,d];
		if(b.pd) {
			d=M(c,FW);
			g.push(d);
			if(a.Eh())if(a.Ve(vn).h)b.zz&&this.la.push(wA(d,a.Ve(vn).h));
			else d.href=a.We(vn);
			else this.la.push(wA(d,b.origin.h))
		}if(b.annotations.length>
		0) {
			b=M(c,GW,C);
			this.YA(b);
			g.push(b)
		}a.Uf()&&!a.Cc()&&g.push(M(c,HW,Vy));
		X.Gm(g);
		if(a.Cc()) {
			b=M(c,IW,Vf);
			a=Ek(a.Ni());
			this.la.push(wA(b,a))
		}a=Zh(Vf,JW,c);
		for(var g=0;b=a[g];g++) {
			if(d=(d=b.name)?Jp.ip(d):h) {
				sn(d.Ui(),b,d.Sa());
				this.la.push(wA(b,d.f()))
			}
		}return c
	};
	var LW="0x",MW="/reader/urllog",NW="bl_url";
	m.iM=function (a) {
		lr(this.p,Pb);
		var b=LW+this.p.R().substring("tag:google.com,2005:reader/item/".length),c=new Tq;
		c.Ej=e;
		c.Tb(MW,Xj([[Ao,a.currentTarget.href],[NW,this.p.We(un)],[ZF,b]]))
	};
	m.Rn=function (a) {
		a=new iy(a);
		this.ks.push(a);
		this.la.push(U(a,rw,r(this.sD,this,a)))
	};
	var OW="Received:",PW="Starred:",QW="Shared:",RW="Tagged:",SW="goog-tooltip date-tooltip text-tooltip";
	m.sD=function (a) {
		if(a.uD)return ;
		var b=u(OW),c=u(PW),d=u(QW),f=u(RW);
		b=b;
		var g=X.tp();
		if(g==Bb)b=c;
		else if(g==sy||this.p.vp().length>0)b=d;
		else if(g==PV)b=f;
		a.className=SW;
		a.AK(TW({
			eJ:b,dJ:vj(this.ml()),$I:vj(this.p.ZI)
		}));
		a.uD=i
	};
	var UW="goog-tooltip text-tooltip";
	m.EJ=function (a) {
		a=a.getElementsByTagName(So);
		for(var b=0,c;c=a[b];b++)if(c.hasAttribute(zo)) {
			var d=c.getAttribute(zo);
			c.removeAttribute(zo);
			c=new iy(c,d);
			c.className=UW;
			this.ks.push(c)
		}
	};
	m.Nr=function (a) {
		X.Xh(this.Di,e,i);
		return wW.d.Nr.call(this,a)
	};
	m.Hv=function (a) {
		if(H.Vp) {
			a.preventDefault();
			this.om()
		}else {
			this.Fq()&&this.Oh();
			lr(this.p,Ob)
		}
	};
	var VW="about:blank",WW="GoogleReaderPopup";
	m.om=function () {
		var a=this.p.We(un);
		if(!a)return ;
		var b=hz(VW,{
			target:WW+Wj()
		});
		if(b) {
			b.opener=h;
			b.document.location=a
		}else alert(uo);
		this.Fq()&&this.Oh();
		lr(this.p,Ob)
	};
	m.Fq=function () {
		return i
	};
	function XW(a,b) {
		if(!le(this.Or))this.Or=i;
		wW.call(this,a,b)
	}v(XW,wW);
	m=XW.prototype;
	var YW="cornerstar",ZW="card-content",$W="card-actions";
	m.hg=function () {
		XW.d.hg.call(this);
		var a=this.D,b=H.Og()||H.Kn()?aX():bX();
		a.appendChild(b);
		var c=this.Qu(),d=this.Cu();
		if(this.Or) {
			var f=cX();
			c.appendChild(f);
			var g=M(f,YW,C)
		}M(b,ZW,C).appendChild(c);
		M(b,$W,C).appendChild(d);
		this.la.push(U(a,T,r(this.SE,this,d,f)));
		this.Op(this.Or?[g]:[])
	};
	m.SE=function (a,b,c) {
		if(dn(c,[a,b]))return ;
		if(c.Tp(1))return ;
		X.Xh(this.Di)
	};
	var dX="card-bottom";
	m.wo=function (a) {
		a=eX({
			qt:a,hu:dX
		});
		var b=M(this.D,$W,C);
		x(b,dX);
		si(a,b);
		return a
	};
	m.Ch=function () {
		XW.d.Ch.call(this);
		var a=M(this.D,$W,C);
		w(a,dX)
	};
	m.Fq=function () {
		return Ks()
	};
	ny.$b=new oy("cards",XW,Bc,e);
	function fX(a,b) {
		wW.call(this,a,b)
	}v(fX,wW);
	m=fX.prototype;
	m.hg=function () {
		fX.d.hg.call(this);
		var a=this.D,b=this.zE();
		a.appendChild(b.D);
		this.Op([b.IL])
	};
	m.Cp=function () {
		vm.jd.Ub([X.f().Bb(),this.Di].concat(X.f().Vi()));
		var a=new Wk(X.f(),this.Di),b=X.ma;
		X.Br(ny.qk);
		X.be(a,new gX(a,[this.p]),i);
		this.Oh();
		X.Xh(0,i,i);
		X.Aa().yL(b)
	};
	m.AE=function (a,b,c) {
		return hX({
			$k:this.fp(a),pd:this.Pi(),bd:b,di:this.th(),snippet:c
		})
	};
	var iX="entry-source-title-link";
	m.GE=function (a) {
		return M(a,iX,Vf)
	};
	m.XK=function (a,b) {
		this.la.push(wA(a,b.h))
	};
	var jX="entry-secondary-snippet",kX="star";
	m.zE=function () {
		var a=this.p,b=a.We(un),c=a.kc;
		a=a.pi;
		a=Oj(a)||n;
		a=gQ(X.f().Bb(),a);
		if(a.length>350)a=a.substring(0,350)+ag;
		b=this.AE(this.ml(),b,a);
		this.Rn(M(b,AW,Vy));
		a=M(b,jX,C);
		this.en(a);
		var d=this.GE(b);
		this.XK(d,c);
		c=M(b,EW,Vf);
		this.la.push(U(c,T,this.Cp,e,this));
		c.onclick=function () {
			return e
		};
		X.Gm([c,d,M(a,Do,Vy)]);
		return {
			D:b,IL:M(b,kX,C)
		}
	};
	m.wo=function () {
		return h
	};
	ny.jd=new oy(lQ,fX,"render-search-view-item",e);
	function lX(a,b) {
		XW.call(this,a,b)
	}v(lX,XW);
	var mX="search-return-link",nX="search-source-link";
	lX.prototype.yL=function (a) {
		this.SJ=a;
		X.qo();
		X.Mk();
		J(SV).innerHTML=oX();
		a=J(TV);
		a.innerHTML=pX({
			RJ:this.th()
		});
		var b=Zh(Vy,mX,J(id));
		b[0].onclick=b[1].onclick=r(this.so,this);
		wA(M(a,nX,Vf),this.p.kc.h)
	};
	lX.prototype.so=function () {
		X.V=e;
		X.Br(ny.jd);
		X.qo();
		X.Mk();
		var a=X.f();
		X.be(a.Xq,this.SJ,i);
		X.pu();
		vm.jd.Ub([X.f().Bb(),n].concat(X.f().Vi()))
	};
	ny.qk=new oy("single",lX,Bc,e);
	function qX(a,b) {
		if(!le(this.qn))this.qn=i;
		wW.call(this,a,b)
	}v(qX,wW);
	m=qX.prototype;
	m.expand=function () {
		this.Ro=this.Qu();
		this.Qo=this.Cu();
		this.D.appendChild(this.Ro);
		this.D.appendChild(this.Qo);
		w(this.D,Qu)
	};
	m.collapse=function () {
		this.D.removeChild(this.Ro);
		this.D.removeChild(this.Qo);
		this.Ch();
		this.Ot();
		this.Qo=this.Ro=h;
		x(this.D,Qu)
	};
	m.fp=function (a) {
		return vj(a,i)
	};
	m.Pi=function () {
		return Oj(qX.d.Pi.call(this))
	};
	m.th=function () {
		return this.p.Cc()?this.p.Uf():qX.d.th.call(this)
	};
	var rX="entry-secondary",sX="list-star",tX="entry-original",uX="no-star";
	m.hg=function () {
		qX.d.hg.call(this);
		var a=this.si;
		a.snippet=this.p.Wi();
		this.D.innerHTML=vX(a);
		var b=rj(this.D),c=b[AW][0],d=b.collapsed[0],f=b[rX][0],g=b.snippet[0],k=b[FW][0],l=b[DW][0],p=this.qn?b[sX][0]:h;
		b=a.bd?b[tX][0]:h;
		y(this.D,uX,!this.qn);
		this.Rn(c);
		this.en(f);
		X.Gm([g,k,l]);
		this.Op(this.qn?[p]:[]);
		this.la.push(U(d,T,r(this.WE,this,b,p)));
		a.bd&&this.la.push(U(b,T,this.Hv,e,this))
	};
	m.WE=function (a,b,c) {
		if(dn(c,[a,b]))return ;
		a=lf(this.D,Qu);
		X.Gi(this.Di);
		a&&X.rc()
	};
	var wX="action-area-visible";
	m.wo=function (a) {
		a=eX({
			qt:a
		});
		w(this.D,wX);
		this.D.appendChild(a);
		return a
	};
	m.Ch=function () {
		qX.d.Ch.call(this);
		x(this.D,wX)
	};
	ny.pk=new oy(bC,qX,"render-list-view-item",i);
	function xX(a,b,c) {
		this.Ae=a;
		this.ym=i;
		this.Wn=[];
		function d(f) {
			for(var g=0;g<f.length;g++)if(!(f[g]instanceofyX)&&f[g])f[g]=R.vh(f[g]);return f
		}this.zk=d(b||[]);this.gr=d(c||[])
	}m=xX.prototype;m.EC=function () {
		this.ym=e
	};
	m.Qg=function (a,b) {
		this.Wn.push([a,b])
	};
	m.Hj=function (a,b,c) {
		if(ainstanceofArray)for(var d=0,f;f=a[d];d++)c.push([b,f]);else c.push([b,a])
	};m.dy=function (a,b,c) {
		for(var d=0,f;f=a[d];d++)c.push([b,f.O()])
	};var zX="async";m.Pb=function () {
		var a=[];
		this.dy(this.zk,Vf,a);
		this.dy(this.gr,Nk,a);
		this.ww()&&a.push([zX,q]);
		return a
	};
	m.oo=function () {
		if(!Kp)return ;
		var a=e;
		for(var b=0,c;c=this.zk[b];b++)if(!Kp.wF(c)&&Kp.mL(c)) {
			a=i;
			break
		}a&&Kp.u()
	};
	m.exec=function (a,b) {
		if(this.ym) {
			var c=this.xc();
			c&&Z(c,DI)
		}var d=this;
		this.Yg=new Tq;
		this.Yg.va(function () {
			if(d.ym) {
				var g=d.vc();
				if(g) {
					var k=d.bp();
					Z(g,Ss,k)
				}
			}if(g=d.Re())for(k=0;k<g.length;k++)g[k]&&g[k].u();d.Gj();a&&a()
		});this.Yg.gz(i);this.Yg.Va(function () {
			if(d.ym) {
				var g=Hq;
				g&&Z(g,Kq,7,d.Yg.text)
			}b&&b()
		});
		this.re();
		this.Yg.Ej=e;
		c=this.Ae;
		if(this.Wn.length)c+=Xg+Xj(this.Wn);
		var f=Xj(this.Pb());
		this.Yg.Tb(c,f)
	};
	m.xc=function () {
		return h
	};
	m.vc=function () {
		return h
	};
	m.bp=function () {
		return 7
	};
	m.Re=function () {
		return h
	};
	m.ww=function () {
		return e
	};
	m.re=function () {
	};
	m.Gj=function () {
	};
	function AX(a,b,c,d,f,g) {
		xX.call(this,a,f,g);
		this.pc=b;
		this.q=d;
		this.r=c
	}v(AX,xX);
	var BX="ac";
	AX.prototype.Pb=function () {
		var a=AX.d.Pb.call(this);
		this.Hj(this.pc,gp,a);
		this.r&&this.Hj(this.r,BX,a);
		this.q&&a.push([RA,this.q]);
		return a
	};
	function CX(a,b,c,d,f) {
		xX.call(this,a,d,f);
		this.pc=b;
		this.im=c
	}v(CX,xX);
	CX.prototype.Pb=function () {
		var a=CX.d.Pb.call(this);
		this.Hj(this.pc,gp,a);
		this.Hj(this.im,fp,a);
		return a
	};
	function Mq(a,b,c,d) {
		CX.call(this,xa,a,b,c,d)
	}v(Mq,CX);
	Mq.prototype.Gj=function () {
		this.oo()
	};
	Mq.prototype.ww=function () {
		return i
	};
	function dr(a,b) {
		AX.call(this,Ea,a,undefined,b)
	}v(dr,AX);
	m=dr.prototype;
	var DX="Marking all items in &quot;%1&quot; as read...";
	m.xc=function () {
		return O(DX,Lf(this.q))
	};
	var EX="Marked %1 items as read.";
	m.vc=function () {
		return O(EX,Lf(this.q))
	};
	m.GK=function (a) {
		this.px=a
	};
	var FX="ts";
	m.Pb=function () {
		var a=dr.d.Pb.call(this);
		this.px&&a.push([FX,this.px]);
		return a
	};
	m.Re=function () {
		return [Y]
	};
	var GX="subscribe";
	function Ir(a,b,c,d) {
		AX.call(this,za,a,GX,b,c,d)
	}v(Ir,AX);
	var HX="Subscribing to &quot;%1&quot;...";
	Ir.prototype.xc=function () {
		return O(HX,Lf(this.q))
	};
	Ir.prototype.vc=function () {
		return O(Yr,Lf(this.q))
	};
	Ir.prototype.Gj=function () {
		this.oo()
	};
	Ir.prototype.Re=function () {
		return [Y,S]
	};
	function IX(a,b,c,d,f,g) {
		AX.call(this,a,b,c,d,f,g)
	}v(IX,AX);
	IX.prototype.ky=function () {
		this.dh&&S.u();
		this.oo()
	};
	var JX="unsubscribe";
	function Sr(a,b) {
		IX.call(this,za,a,JX,b)
	}v(Sr,IX);
	m=Sr.prototype;
	var KX="Unsubscribing...",LX="Unsubscribing from &quot;%1&quot;...";
	m.xc=function () {
		return this.pcinstanceofArray?KX:O(LX,Lf(this.q))
	};
	var MX="Unsubscribed.",NX="You have unsubscribed from &quot;%1.&quot;";
	m.vc=function () {
		return this.pcinstanceofArray?MX:O(NX,Lf(this.q))
	};
	m.bp=function () {
		return 10
	};
	m.re=function () {
		var a=this.pcinstanceofArray?this.pc:[this.pc];
		this.dh=e;
		for(var b=0;b<a.length;b++) {
			var c=Fk(a[b]);
			if(!S.ib(c)) {
				this.dh=i;
				break
			}S.vJ(c)
		}this.dh||S.Cf()
	};
	m.Gj=function () {
		this.ky()
	};
	m.Re=function () {
		return [Y]
	};
	var OX="edit";
	function Vr(a,b,c,d) {
		IX.call(this,za,a,OX,d,b,c)
	}v(Vr,IX);
	m=Vr.prototype;
	var PX="Saving changes...",QX="Saving changes to &quot;%1&quot;...";
	m.xc=function () {
		return this.pcinstanceofArray?PX:O(QX,Lf(this.q))
	};
	var RX="Saved changes.";
	m.vc=function () {
		return this.pcinstanceofArray?RX:O(WS,Lf(this.q))
	};
	m.Re=function () {
		return [Y]
	};
	m.re=function () {
		var a=this.pcinstanceofArray?this.pc:[this.pc];
		this.dh=e;
		for(var b=0;b<a.length;b++) {
			var c=Fk(a[b]);
			c=S.ib(c);
			if(!c) {
				this.dh=i;
				break
			}var d={
			};
			for(var f=0;f<c.qg.length;f++)d[c.qg[f].O()]=i;for(var f=0;f<this.zk.length;f++)d[this.zk[f].O()]=i;for(var f=0;f<this.gr.length;f++)delete d[this.gr[f].O()];c.qg=[];for(var g in d)c.qg.push(Sk(g));if(this.q)c.q=this.q
		}this.dh||S.Cf()
	};m.Gj=function () {
		return this.ky()
	};
	function _FR_clipCreatorMain(a,b,c) {
		Im(function () {
			H.fw();
			SX(a,b,c)
		})
	}
	var TX="clip-stream-has-no-items";
	function SX(a,b,c) {
		a=Fk(a);
		if(J(TX))return ;
		(new UX(a,b,c)).C()
	}function UX(a,b,c) {
		this.h=a;
		this.NL=b;
		this.jg=c;
		this.Wb()
	}m=UX.prototype;
	m.C=function () {
		_IS_BLOGGER_USER&&this.qL();
		this.tD();
		this.qu();
		this.$x()
	};
	m.tD=function () {
		this.yl().value=this.NL
	};
	m.qu=function () {
		this.EE().value=this.Wi()
	};
	var VX="publisher-snippet";
	m.EE=function () {
		return J(VX)
	};
	var WX="publisher-scheme";
	m.nv=function () {
		return J(WX)
	};
	var XX="publisher-title";
	m.yl=function () {
		return J(XX)
	};
	var YX="publisher-sources";
	m.qv=function () {
		return J(YX)
	};
	var ZX="main-clip-creator",$X="publisher-preview";
	m.iv=function () {
		return M(J(ZX),$X)
	};
	var aY="publisher-count";
	m.Ju=function () {
		return J(aY)
	};
	m.wc=function () {
		return parseInt(Pj(this.Ju()),10)
	};
	m.lp=function () {
		var a={
		};
		a.c=Pj(this.nv());
		a.t=this.yl().value;
		this.jg||(a.s=this.qv().checked.toString ());
		a.b=this.jg;
		return a
	};
	m.uE=function (a) {
		var b=this.lp(),c=[];
		for(var d in b) {
			if(a&&d==RA)continue;
			c.push(d+ga+dg(b[d]))
		}return iq+c.join(gq)+jq
	};
	var bY="GRC_p(",cY=");new GRC";
	m.vE=function (a) {
		return bY+this.uE(a)+cY
	};
	var dY="/reader/ui/publisher-",eY=".js",fY='<script type="text/javascript" src="',gY='"><\/script>';
	m.Wi=function (a) {
		var b=Jj(dY+_DISPLAY_LOCALE+eY),c=h;
		if(this.jg)c=Jj(Qa+this.h.streamId);
		else {
			c=Jj(Pa+this.h.streamId);
			c=P(c,Cn,this.wc())
		}c=P(c,Bn,this.vE(a));
		function d(f) {
			return fY+f+gY
		}return d(b)+tf+d(c)
	};
	m.QK=function () {
		var a=this.iv();
		bp(this.lp());
		new $o(this.jm,a);
		this.lp().c==Kk&&this.ty(this.iv())
	};
	m.$x=function () {
		var a=this;
		function b() {
			a.QK();
			a.qu();
			_IS_BLOGGER_USER&&a.zM()
		}if(this.jm&&!this.jg&&this.jm.items.length==this.wc()) {
			b();
			return
		}this.jg?Fn(this.h,function (c) {
			a.jm=c;
			b()
		}):En(this.h,this.wc(),function (c) {
			a.jm=c;
			b()
		})
	};
	var hY="publisher-blogger-widget",iY="publisher-snippet-message-blogger",jY="publisher-snippet-message";
	m.qL=function () {
		x(J(hY),Q);
		x(J(iY),Q);
		w(J(jY),Q)
	};
	var kY="publisher-blogger-widget-title",lY="publisher-blogger-widget-content";
	m.zM=function () {
		J(kY).value=this.yl().value;
		J(lY).value=this.Wi(i)
	};
	m.ty=function (a) {
		a.style&&Ap(a);
		for(a=a.firstChild;a;a=a.nextSibling)this.ty(a)
	};m.Wb=function () {
		var a=h,b=this;
		function c() {
			a&&window.clearTimeout(a);
			a=window.setTimeout(function () {
				b.$x();
				a=h
			},250)
		}var d=this.yl();
		d.onkeypress=d.onblur=this.nv().onchange=c;
		if(d=this.Ju())d.onchange=c;
		if(d=this.qv())d.onchange=d.onclick=c;
		window.opener?this.OK():w(J(so),Q)
	};
	var mY="close-link",nY="logo-container";
	m.OK=function () {
		J(mY).onclick=function () {
			window.close();
			return e
		};
		J(nY).onclick=function () {
			return e
		}
	};
	var Kp=h,S=h;
	function oY() {
		this.Ib=[];
		this.ed={
		};
		this.zg=[];
		this.rm=this.sg=e;
		this.vq=0
	}m=oY.prototype;
	m.aa=function (a) {
		if(this.sg)a(this.Ib);
		else {
			this.rm||this.ix();
			window.setTimeout(r(this.aa,this,a),50)
		}
	};
	m.$e=function (a,b) {
		var c=this;
		this.aa(function () {
			b(c.Ib[c.ed[a.streamId]])
		})
	};
	m.ib=function (a) {
		if(!this.sg)return h;
		return this.Ib[this.ed[a.streamId]]
	};
	m.vJ=function (a) {
		if(!this.sg)return e;
		if(!a.streamId in this.ed)return e;
		var b=this.ed[a.streamId];
		delete this.ed[a.streamId];
		$e(this.Ib,b);
		for(var c in this.ed)this.ed[c]>b&&this.ed[c]--;return i
	};m.ix=function () {
		this.sg=e;
		this.rm=i;
		var a=[],b=this;
		this.oj(a,function () {
			b.Ib=a;
			b.ed={
			};
			for(var c=0,d;d=b.Ib[c];c++)b.ed[d.h.streamId]=c;b.sg=i;b.rm=e;b.vq=Wj()
		})
	};m.Hs=function (a) {
		this.Ib.push(a);
		this.ed[a.h.streamId]=this.Ib.length-1
	};
	m.cm=function () {
		return this.sg
	};
	m.u=function () {
		this.ix();
		this.aa(r(this.eA,this))
	};
	m.Cf=function () {
		this.vq=Wj();
		this.eA()
	};
	m.eA=function () {
		for(var a=0,b;b=this.zg[a];a++)b(this.Ib)
	};m.Lb=function (a) {
		this.zg.push(a)
	};
	m.GG=function () {
		return this.yA(5)
	};
	m.yA=function (a) {
		return Wj()-this.vq<a*1000
	};
	function pY(a,b) {
		this.we=a;
		this.Wo=b
	}m=pY.prototype;
	m.aa=function (a) {
		var b=this;
		this.we.aa(function (c) {
			var d=[];
			for(var f=0,g;g=c[f];f++)b.Wo(g)&&d.push(g);a(d)
		})
	};m.$e=function (a,b) {
		var c=this;
		this.we.$e(a,function (d) {
			b(d&&c.Wo(d)?d:h)
		})
	};
	m.ib=function (a) {
		return (a=this.we.ib(a))&&this.Wo(a)?a:h
	};
	m.u=function () {
		this.we.u()
	};
	m.Lb=function (a) {
		this.we.Lb(r(this.aa,this,a))
	};
	var qY=0,rY="keyboard-selector-input-";
	function sY(a,b,c) {
		oH.call(this);
		this.we=a;
		this.uj=b;
		this.tk=e;
		this.Pc=new ZG(c);
		this.ow=rY+qY++
	}v(sY,oH);
	m=sY.prototype;
	m.dd=function () {
		this.we.aa(r(this.CL,this))
	};
	m.CL=function (a) {
		this.tk=i;
		this.Do=h;
		var b=gH&&this.we.ib(gH)||a[0];
		this.Uh=b?b.h:h;
		this.Qr(a);
		this.Pc.dd();
		if(a.length==0) {
			var c=this;
			window.setTimeout(function () {
				c.Rb()
			},20000)
		}this.Wc().value=n;
		this.Wc().focus()
	};
	var tY="initial-stream-list";
	m.Qr=function (a) {
		if(a.length) {
			this.Pc.ai(this.uj.prompt);
			this.Nt(a,this.uj.Qp,tY)
		}else {
			this.Pc.ai(this.uj.Lo);
			this.Pc.Yj(this.uj.Mo)
		}
	};
	m.Rb=function () {
		this.tk=e;
		this.Pc.Rb();
		var a=this.Wc();
		a.blur();
		V(a,mu,this.Bl,e,this);
		B(a);
		V(this.M,bn,this.yd,e,this);
		this.M.n();
		this.M=h
	};
	m.Zb=function (a) {
		if(this.Do)return ;
		this.we.aa(r(this.OM,this,a))
	};
	var uY="Matches:",vY="multiple-matches",wY='<div class="no-matches">',xY="</div>";
	m.OM=function (a,b) {
		if(b.length==0) {
			this.Qr(b);
			return
		}var c=[],d=this.Wc().value.toLowerCase(),f=-1;
		if(this.Uh==h)this.Uh=b[0].h;
		for(var g=0,k;k=b[g];g++)if(k.q.toLowerCase().indexOf(d)==0) {
			if(k.h.G(this.Uh))f=c.length;
			c.push(k)
		}if(f==-1)f=0;
		if((a==40||a==39)&&f<c.length-1)f++;
		else if((a==38||a==37)&&f>0)f--;
		this.Uh=c.length?c[f].h:h;
		if(c.length&&a==13) {
			this.Pc.ai(c[f].q);
			this.Pc.Yj(n);
			var l=this;
			this.Do=window.setTimeout(function () {
				l.Um(l.Uh);
				l.Rb()
			},400)
		}else if(sf(d))this.Qr(b);
		else if(c.length) {
			this.Pc.ai(d);
			this.Nt(c,uY,vY)
		}else {
			this.Pc.ai(d);
			this.Pc.Yj(wY+this.uj.Qq+xY)
		}
	};
	var yY='<h6 class="stream-list-header">Use the return key to select and the arrow keys to navigate.</h6><div class="stream-list ',zY='"><span class="stream-list-label">',AY='</span><ul class="streams">',BY='<li class="stream',CY=" selected",DY="</li>",EY='<li class="separator">&bull;</li>',FY="</li></ul></div>";
	m.Nt=function (a,b,c) {
		b=yY+c+zY+b+AY;
		c=[];
		for(var d=0,f;f=a[d];d++) {
			var g=this.Uh.G(f.h);
			c.push(BY+(g?CY:n)+Qi);
			c.push(Lf(f.q));
			c.push(DY);
			c.push(EY)
		}b+=c.join(n)+FY;
		this.Pc.Yj(b)
	};
	m.ze=function () {
	};
	var GY="keyboard-selector-input";
	m.Wc=function () {
		var a=J(this.ow);
		if(!a) {
			a=N(Xm,{
				type:fB,"class":GY,id:this.ow,autocomplete:jF
			});
			document.body.appendChild(a);
			this.ZF(a)
		}return a
	};
	m.ZF=function (a) {
		this.M=new cn(a);
		U(this.M,bn,this.yd,e,this);
		U(a,mu,this.Bl,e,this)
	};
	m.yd=function (a) {
		if(!this.tk)return ;
		this.tq&&window.clearTimeout(this.tq);
		var b=a.keyCode,c=this;
		this.tq=window.setTimeout(function () {
			if(b==27)c.Rb();
			else {
				c.Zb(b);
				window.setTimeout(function () {
					var d=c.Wc().value.length;
					IB(c.Wc(),d);
					c.tq=h
				},1)
			}
		},1)
	};
	m.Bl=function () {
		if(!this.tk)return ;
		var a=this;
		window.setTimeout(function () {
			a.Do||a.Rb()
		},1)
	};
	var DR,ER,CR;
	function HY() {
		pY.call(this,Jp,function (a) {
			a=a.oa;
			return a.hj()&&!a.Fh
		})
	}v(HY,pY);
	HY.prototype.aa=function (a) {
		HY.d.aa.call(this,function (b) {
			var c=R.fe();
			b.unshift({
				h:Ek(c),q:c.gp()
			});
			a(b)
		})
	};
	var IY="label-keyboard-selector",JY="subscription-keyboard-selector",KY="friend-keyboard-selector";
	function bR() {
		DR=new sY(new pY(Kp,function (a) {
			return a.ab.type==nb
		}),de,IY);
		ER=new sY(S,ee,JY);
		CR=new sY(new HY,fe,KY)
	}var LY=[38,38,40,40,37,39,37,39,JA,Vf],MY=0;
	function FR(a) {
		if(LY[MY]==a)MY++;
		else MY=0;
		if(MY>=LY.length) {
			MY=0;
			NY();
			return i
		}return e
	}var OY="Ninja!";
	function NY() {
		var a=lf(document.body,Vc);
		Op(Wc,a?jF:wl,1);
		y(document.body,Vc,!a);
		var b=J(OP);
		if(!a&&b&&!b.value)b.value=OY;
		a?Y.u():Y.yM(30)
	}var PY;
	function GI(a,b,c) {
		var d=M(c,Tv);
		U(d,T,function () {
			var f=new fW(a(c),b(c),c);
			f.open();
			S.Lb(r(f.bz,f))
		})
	}Ym(function () {
		return PY?PY.m:h
	},function () {
		PY.close()
	});
	function fW(a,b,c,d) {
		this.$a=[];
		this.h=a;
		this.Bn=function (f) {
			if(!f)return ;
			b(f)
		};
		this.m=c;
		if(d) {
			this.kg=i;
			this.open();
			this.bz()
		}
	}m=fW.prototype;
	m.G=function (a) {
		if(!(ainstanceoffW))return e;
		return a.m==this.m
	};
	m.open=function () {
		if(PY&&this.G(PY)) {
			PY.close();
			return
		}this.kg||PY&&PY.close();
		this.be();
		this.kg||cx(M(this.m,Tv),i);
		x(this.Ti(),Q);
		if(!this.kg) {
			PY=this;
			this.Ti().style.width=this.m.offsetWidth-2+yt
		}
	};
	m.close=function () {
		for(var a=0,b;b=this.$a[a];a++)b.Lj();this.vt&&Cl(this.vt);a=this.Ti();a.innerHTML=n;this.kg||cx(M(this.m,Tv),e);w(a,Q);this.kg||(PY=h)
	};m.Eu=function (a) {
		S.$e(this.h,function (b) {
			a(b?b.qg:[])
		})
	};
	m.be=function () {
		var a=this;
		this.Eu(function (b) {
			a.$a=[];
			a.Qs=b;
			Kp.ag(function (c) {
				for(var d=0,f;f=c[d];d++)a.ba(f);a.cB()
			})
		})
	};m.Ti=function () {
		if(!this.dx)this.dx=this.m.getElementsByTagName(dp)[0];
		return this.dx
	};
	m.ba=function (a) {
		a=new QY(this,a,this.Bn);
		this.Ti().appendChild(a.m);
		this.$a.push(a)
	};
	var RY="New folder...";
	m.cB=function () {
		var a=SY({
			vu:RY
		});
		this.vt=U(a,T,this.sL,e,this);
		this.Ti().appendChild(a)
	};
	var TY="What would you like to call this new folder?";
	m.sL=function () {
		this.kg||this.close();
		var a=oK(TY,n);
		if(!a)return ;
		this.Bn(this.vv(R.vh(a)))
	};
	var UY="Change folders...",VY="Add to a folder...";
	m.bz=function () {
		var a=iD(this.m);
		this.Eu(function (b) {
			a.innerHTML=b.length>0?UY:VY
		})
	};
	var WY='One of the tags you tried to enter is invalid. The following characters are not allowed: ",<,>,?,&,/,\\,^';
	m.vv=function (a) {
		var b=[],c=[],d=this.vw(a),f=this.Qs;
		for(var g=0,k;k=f[g];g++) {
			var l=k.ge();
			b.push(l);
			if(d&&k.G(a))continue;
			c.push(l)
		}d||c.push(a.ge());
		a=[];
		try{
			a=as(c.join(gq))
		}catch(p) {
			alert(WY);
			return h
		}return jV(b,a)
	};
	m.vw=function (a) {
		for(var b=0,c;c=this.Qs[b];b++)if(a.G(c))return i;return e
	};var XY="chooser-item-selected";function QY(a,b,c) {
		this.po=a;
		this.ab=b;
		this.Bn=c;
		this.m=SY({
			vu:b.ge()
		});
		a.vw(b)&&w(this.m,XY);
		this.nf=U(this.m,T,this.Cl,e,this)
	}QY.prototype.Lj=function () {
		Cl(this.nf)
	};
	QY.prototype.Cl=function () {
		var a=this.po.vv(this.ab);
		this.po.kg||this.po.close();
		this.Bn(a)
	};
	function ty(a,b,c) {
		this.h=a;
		this.To=b||0;
		this.Zx=c||0;
		this.fc=[];
		this.mD=2;
		this.bJ=[];
		this.Ia=[];
		this.lu={
		};
		this.ad=this.jc=h;
		this.el=[];
		this.YC=i
	}m=ty.prototype;
	m.Bh=function () {
		return this.ad==h&&(this.fc.length==0||this.kl()!=h)
	};
	m.Yp=function () {
		return this.jc!=h
	};
	m.oL=function (a) {
		return this.Zx>0&&!this.Yp()&&this.Bh()&&this.Ia.length-a<=this.Zx
	};
	m.kl=function () {
		if(this.fc.length==0)return h;
		var a=this.fc[this.fc.length-1];
		if(a==h)return h;
		return a.kl()
	};
	m.lD=function (a,b) {
		if(this.Yp())j("Already fetching data for stream: "+this.f().dp());
		this.jc=new Tq;
		var c=this;
		this.jc.va(function () {
			c.VI(c.jc.text);
			c.ad=h;
			c.jc=h;
			b()
		});
		this.jc.Va(function () {
			Z(Hq,Kq);
			c.ad=c.jc.status;
			c.jc=h;
			b()
		});
		this.fu(a)
	};
	var YY="freshness";
	m.fu=function () {
		var a=this.f().dp(),b=this.kl();
		if(b!=h)a=P(a,KA,b);
		if(this.To) {
			var c=this.To;
			if(this.mh())c*=this.mD;
			a=P(a,Cn,c)
		}this.YC||(a=P(a,YY,Xb));
		if(b==h&&this.f().ox)a=P(a,ro,q);
		this.jc.kx(Gc);
		this.jc.N(a)
	};
	m.As=function (a) {
		this.fc.length==0&&a!=h&&ZY(this.f(),a)
	};
	m.f=function () {
		return this.h
	};
	m.VI=function (a) {
		this.bJ.push(a);
		a=new rq(a);
		this.As(a);
		this.fc.push(a);
		var b=R.vd(),c=this.f().Wp(b);
		a=a.Ri();
		for(var d=0;d<a.length;d++) {
			var f=a[d],g=f.R();
			if(!(g in this.lu))if(!c||!f.Ah(b)) {
				this.lu[g]=this.Ia.length;
				this.Ia.push(f)
			}
		}
	};
	m.abort=function () {
		this.jc&&this.jc.abort();
		this.TA=i
	};
	m.Rv=function (a) {
		return a<this.Ia.length
	};
	m.Pu=function (a) {
		if(a<0||!this.Rv(a))return h;
		return this.Ia[a]
	};
	m.lh=function (a,b,c) {
		if(this.TA)return ;
		var d=this;
		if(a<0) {
			b(h);
			return
		}if(a<this.Ia.length) {
			b(this.Ia[a]);
			!c&&this.oL(a)&&this.lh(this.Ia.length,function () {
			},i);
			return
		}if(this.Bh()) {
			if(this.Yp())this.el.push({
				ew:a,Zs:b,Bx:c
			});
			else {
				this.el=[{
					ew:a,Zs:b,Bx:c
				}];
				this.lD(a,function () {
					var f=d.el;
					d.el=[];
					for(var g=0,k;k=f[g];g++)d.lh(k.ew,k.Zs,k.Bx)
				})
			}return
		}b(h)
	};m.mh=function () {
		return this.Ia.length
	};
	m.Ze=function (a) {
		var b=this;
		this.Bj(function () {
			b.ad?a(h):a(b.fc[0].Xc())
		})
	};
	m.pl=function (a) {
		var b=this;
		this.Bj(function () {
			b.ad?a(h):a(b.fc[0].We(un))
		})
	};
	m.Bj=function (a) {
		if(this.fc.length==0&&!this.ad) {
			window.setTimeout(r(this.Bj,this,a),50);
			return
		}if(this.fc[0]||this.ad)a()
	};
	function gX(a,b) {
		this.h=a;
		this.$a=b
	}m=gX.prototype;
	m.mh=function () {
		return this.$a.length
	};
	m.Bh=function () {
		return e
	};
	m.lh=function (a,b) {
		if(a<0||a>=this.$a.length) {
			b(h);
			return
		}b(this.$a[a])
	};
	m.pl=function (a) {
		a(h)
	};
	m.Ze=function (a) {
		a(h)
	};
	m.abort=function () {
	};
	function MQ(a,b) {
		if(!_USER_ID)return ;
		ls();
		Kp=new $Y;
		S=new aZ;
		a||(Y=new bZ(b))
	}var cZ="help-link";
	function ZQ() {
		if(J(cZ))J(cZ).onclick=function () {
			Op(Mc);
			return i
		};
		var a=J(nY);
		if(a) {
			a.href=bk(a.href);
			H.le&&Al(a,T,function () {
				window.setTimeout(function () {
					window.location=a.href
				},0)
			})
		}
	}function aZ() {
		oY.call(this)
	}v(aZ,oY);
	var dZ="_STREAM_LIST_SUBSCRIPTIONS";
	aZ.prototype.oj=function (a,b) {
		Pq(ya,function (c) {
			for(var d=0,f;f=c.subscriptions[d];d++) {
				var g=[];
				for(var k=0,l;l=f.categories[k];k++)g.push(Sk(l.id));a.push({
					h:Fk(f.id),q:f.title,qg:g,yD:f.firstitemmsec,xz:f.sortid
				})
			}b()
		},undefined,dZ)
	};
	function $Y() {
		oY.call(this)
	}v($Y,oY);
	m=$Y.prototype;
	var eZ="all",fZ="_STREAM_LIST_TAGS";
	m.oj=function (a,b) {
		Pq(wa,function (c) {
			for(var d=0,f;f=c.tags[d];d++) {
				var g=Sk(f.id);
				a.push({
					h:Ek(g),q:g.gp(),ab:g,DN:f.shared==eZ,xz:f.sortid
				})
			}b()
		},undefined,fZ)
	};
	m.wF=function (a) {
		return this.ib(Ek(a))!=h
	};
	m.xF=function (a) {
		return this.ib(a)!=h
	};
	m.mL=function (a) {
		if(a.type==nb)return i;
		if(a.type==qb&&a.G(R.xd()))return i;
		return e
	};
	m.ag=function (a) {
		this.aa(function (b) {
			var c=[];
			for(var d=0,f;f=b[d];d++)f.ab.type==nb&&c.push(f.ab);a(c)
		})
	};function OQ() {
		oY.call(this);
		this.So=0;
		this.u()
	}v(OQ,oY);
	m=OQ.prototype;
	m.Tq=function (a) {
		this.aa(function () {
			a()
		})
	};
	var gZ="_STREAM_LIST_STREAM_PREF";
	m.oj=function (a,b) {
		var c=this;
		Pq(ua,function (d) {
			for(var f in d.streamprefs) {
				var g={
				};
				for(var k=0,l;l=d.streamprefs[f][k];k++)g[l.id]=l.value;a.push({
					h:Fk(f),q:f,Hm:g
				})
			}c.So=0;
			b()
		},function () {
			c.So++;
			if(c.So<10) {
				c.sg=e;
				c.rm=e
			}else {
				uy();
				Z(Hq,Kq)
			}
		},gZ)
	};
	m.Ab=function (a,b) {
		a=this.ib(a);
		if(a==h||!(b.id in a.Hm))return b[hs];
		return a.Hm[b.id]
	};
	m.Zl=function (a) {
		if(!a.J.Ka)return e;
		if(!this.wy) {
			var b=R.gc(Db);
			this.wy=Ek(b)
		}if(a.G(this.wy))return i;
		return this.Ab(a,qc)==q
	};
	m.oq=function (a) {
		return this.Ab(a,rc)==q
	};
	m.sh=function (a) {
		var b=this.Ab(a,tc);
		if(b in ss)b=ss[b];
		var c=a.Ec(R.fe());
		return b==sc||a.Xp()&&b==vs||!a.mg()&&!c&&a.lq()?ts.newest:ts[b]
	};
	m.cd=function (a,b,c) {
		if(this.Ab(a,b)==c)return ;
		var d=this.ib(a);
		if(d==h) {
			d={
				h:a,q:a.streamId,Hm:{
				}
			};
			this.Hs(d)
		}d.Hm[b.id]=c;
		d=new Tq;
		d.gz(i);
		d.Va(function () {
			Z(Hq,Kq)
		});
		d.Ej=e;
		d.Tb(va,Xj([[gp,a.streamId],[NA,b.id],[TA,c]]))
	};
	m.Eg=function (a,b) {
		if(!a.J.Ka)return ;
		this.cd(a,qc,b.toString ())
	};
	m.bi=function (a,b) {
		return this.cd(a,vc,b.toString ())
	};
	m.dL=function (a,b) {
		return this.cd(a,rc,b.toString ())
	};
	m.yf=function (a,b) {
		this.cd(a,tc,b.id)
	};
	function UV(a,b,c,d,f) {
		ty.call(this,a,d);
		this.ec=h;
		this.Jj=a.Bb();
		this.Uo=0;
		this.jr={
			query:this.Jj,bA:0,Io:0
		};
		this.KH=f?f:1000;
		this.Bq(b,c)
	}v(UV,ty);
	m=UV.prototype;
	m.Bh=function () {
		if(!this.sF()||this.ec.length==0)return e;
		if(this.ad)return e;
		return this.fc.length==0||this.Uo<this.ec.length
	};
	var hZ="num",iZ="thousands";
	m.Bq=function (a,b) {
		if(this.Bw)return ;
		this.Bw=i;
		this.JN=Wj();
		var c=P(pa,QA,this.Jj);
		c=P(c,hZ,this.KH);
		if(b)for(var d=0,f;f=b[d];d++)c=P(c,gp,f.streamId);var g=this;Pq(c,function (k) {
			k=k.results;
			g.jr.bA=k.length>=1000?iZ:k.length;
			g.jr.Io=0;
			g.Bw=e;
			g.ec=k;
			a()
		},function () {
			g.ad=500;
			a()
		})
	};
	m.sF=function () {
		return this.ec!=h
	};
	var jZ="sa",kZ="N";
	m.fu=function () {
		var a=this.To;
		if(a)if(this.mh())a*=2;
		var b=this.Uo;
		a=b+a;
		if(a>=this.ec.length)a=this.ec.length;
		this.Uo=a;
		var c=[];
		for(var d=b;d<a;d++)c.push(this.ec[d].id);a=qL+c.join(rL);c=sa;if(b>0) {
			c=P(c,jZ,kZ);
			c=P(c,nC,b)
		}this.jc.Tb(c,a)
	};
	m.As=function () {
	};
	m.Ze=function (a) {
		a(lZ({
			query:this.f().Bb()
		}))
	};
	m.pl=function (a) {
		a(h)
	};
	m.abort=function () {
	};
	function mZ() {
		this.Wq={
		};
		this.VM=/^(?:[0-9A-F]{
			8
		})*$/
	}m=mZ.prototype;
	m.DI=function (a,b) {
		var c=this.dv(a,b);
		a={
		};
		for(var d=0,f;f=c[d];d++)a[f]=d;c=[];var f;for(var d=0,g;g=b[d];d++) {
			f=this.Xi(g.f());
			c[a[f]]=g
		}return c=Qe(c,function (k) {
			return k!=h
		})
	};
	m.dv=function (a,b) {
		var c=[],d=[];
		for(var f=0,g;g=b[f];f++)c.push(this.Xi(g.f()));if(a.f().streamId in this.Wq)d=this.Wq[a.f().streamId];else {
			if((g=Cy.Ab(a.f(),uc))&&this.VM.test(g)) {
				var k;
				for(var f=0;f<g.length;f+=8) {
					k=g.substring(f,f+8);
					Ve(c,k)&&d.push(k)
				}
			}var k;
			if(d.length==0)for(var f=0,g;g=b[f];f++) {
				k=this.Xi(g.f());
				d[f]=k
			}
		}for(var f=0,k;k=c[f];f++)Ve(d,k)||d.push(k);this.az(a,d,i);return d
	};
	m.az=function (a,b,c) {
		this.Wq[a.f().streamId]=b;
		c||window.setTimeout(function () {
			Cy.cd(a.f(),uc,b.join(n))
		},2000)
	};
	m.yx=function (a,b,c,d) {
		if(b==c)return ;
		var f=this.dv(a,[b]),g;
		b=this.Xi(b.f());
		var k=this.Xi(c.f());
		c=h;
		for(var l=0,p;p=f[l];l++) {
			if(p==b)c=l;
			if(p==k)g=l
		}d&&g++;
		if(g==c)return ;
		if(c!=h) {
			f.splice(c,1);
			f.splice(g<c?g:g-1,0,b)
		}else f.splice(g,0,b);
		this.az(a,f)
	};
	m.Xi=function (a) {
		return (S.ib(a)||Kp.ib(a)).xz
	};
	var ES=new mZ,nZ="com.google",oZ="com.blogger";
	function jV(a,b) {
		var c={
		},d;
		for(d=0;d<b.length;d++)c[b[d]]=1;b={
		};
		for(d=0;d<a.length;d++) {
			var f=a[d];
			if(c[f])delete c[f];
			else b[f]=1
		}a={
			Td:[],se:[]
		};
		for(var g in c)a.Td.push(g);for(var k in b)a.se.push(k);return a
	}function yX(a,b,c) {
		this.userId=a;
		if(this.userId==Kk)this.userId=_USER_ID;
		this.type=b;
		this.qe=c
	}var pZ="user";
	yX.prototype.O=function () {
		var a=[];
		a.push(pZ);
		a.push(this.userId);
		a.push(this.type);
		a=a.concat(this.qe);
		return a.join(ch)
	};
	yX.prototype.G=function (a) {
		if(!(ainstanceofyX))return e;
		return a.O()==this.O()
	};
	yX.prototype.eu=function (a) {
		if(!(ainstanceofyX))return e;
		return a.type+a.qe==this.type+this.qe
	};
	function Sk(a) {
		var b=Ck(a);
		if(b)return new yX(b[1],b[2],b.slice(3));
		else j('Malformed tag from "'+a+Kf)
	}function Ck(a) {
		a=a.split(ch);
		return a.length<3?h:a[0]==pZ?a:h
	}m=yX.prototype;
	m.gp=function () {
		return this.type==nb?this.getName():this.rh(Yk)
	};
	m.ge=function () {
		return this.type==nb?this.getName():this.rh(qZ)
	};
	m.nE=function () {
		return [this.getName(),this.zv()]
	};
	m.zv=function () {
		if(!this.hf())return h;
		var a=Ek(this);
		if(a.Eb())return a.oa.Sa();
		if(!(this.userId in rZ))return this.userId;
		return rZ[this.userId]
	};
	m.$j=function (a) {
		this.userId=a
	};
	var rZ={
	};
	function ZY(a,b) {
		if(!a.J.Ka)return ;
		a=a.rb();
		b=b.Uf();
		rZ[a.userId]=b
	}yX.prototype.hf=function () {
		return this.userId!=_USER_ID&&this.userId!=Kk
	};
	var Yk=[function (a) {
		return a.ac
	},function (a) {
		return a.Lc
	}],qZ=[function (a) {
		return a.Ha
	},function () {
		return h
	}],mK=[function (a) {
		return a.Ic
	},function (a) {
		return a.Mc
	}],lK=[function (a) {
		return a.Jc
	},function (a) {
		return a.Nc
	}];
	yX.prototype.rh=function (a) {
		var b=this.hf()?1:0;
		a=a[b];
		if(this.type==qb||this.type==pb) {
			b=this.getName();
			var c=h;
			if(b==zb)c=Rd;
			else if(b==Cb)c=Td;
			else if(b==xb)c=Sd;
			else if(b==Ab)c=Vd;
			else if(b==Eb)c=Wd;
			else if(b==Hb)c=Yd;
			else if(b==vb)c=$d;
			else if(b==ub)c=ae;
			else if(b==Lb)c=be;
			else if(b==Mb)c=ce;
			else if(b==Nb)c=Zd;
			else if(this.G(R.hh()))c=Xd;
			if(!c)return b;
			a=a(c);
			return O(Sf(a),this.zv())
		}else return O(a(Ud),this.nE())
	};
	var sZ="http://www.google.com/reader/";
	yX.prototype.qp=function () {
		return sZ
	};
	yX.prototype.getName=function () {
		if(this.type==nb)return this.qe[0];
		else if(this.type==rb)return this.qe[1];
		else if(this.type==qb||this.type==pb)return this.qe[1];
		return h
	};
	function mq(a) {
		this.$j(a)
	}m=mq.prototype;
	m.$j=function (a) {
		this.userId=a
	};
	m.jv=function () {
		return this.gc(xb)
	};
	m.vd=function () {
		return this.gc(zb)
	};
	m.Zf=function () {
		return this.gc(Ab)
	};
	m.kv=function () {
		return this.gc(Fb)
	};
	m.lv=function () {
		return this.gc(Gb)
	};
	m.xd=function () {
		return this.gc(Cb)
	};
	m.hh=function () {
		return this.rv(oZ,Sb)
	};
	m.hv=function () {
		return this.Xu(vb)
	};
	m.jE=function () {
		return this.Xu(ub)
	};
	m.cp=function () {
		return this.gc(Lb)
	};
	m.rp=function () {
		return this.gc(Mb)
	};
	m.yb=function () {
		return this.gc(Eb)
	};
	m.fe=function () {
		return this.gc(Hb)
	};
	m.vh=function (a) {
		return new yX(this.userId,nb,[a])
	};
	m.gc=function (a) {
		return this.rv(nZ,a)
	};
	m.Xu=function (a) {
		return this.FE(nZ,a)
	};
	m.rv=function (a,b) {
		return new yX(this.userId,qb,[a,b])
	};
	m.FE=function (a,b) {
		return new yX(this.userId,pb,[a,b])
	};
	var R,Y;
	function bZ(a) {
		oY.call(this);
		this.Nn=h;
		this.Mp=0;
		this.Lm=h;
		this.wm=1000;
		this.KB=!a;
		this.Us=0;
		this.jx=r(this.gx,this);
		this.iA=[];
		var b=this;
		this.Lb(function (c) {
			b.dw=i;
			for(var d=0,f;f=c[d];d++)b.Sp(f);b.dw=e
		})
	}v(bZ,oY);m=bZ.prototype;m.DK=function (a) {
		this.jx=a
	};
	var tZ="autorefresh",uZ="_STREAM_LIST_UNREAD_COUNTS";
	m.gx=function (a,b) {
		var c=Da;
		if(this.xw) {
			c=P(c,tZ,++this.Us);
			this.xw=e
		}else this.Us=0;
		Pq(c,a,b,uZ)
	};
	m.oj=function (a,b) {
		if(Jp) {
			var c=this;
			Jp.nh(function () {
				c.fx(a,b)
			},1);
			return
		}this.fx(a,b)
	};
	m.fx=function (a,b) {
		this.Lm&&window.clearTimeout(this.Lm);
		var c=this;
		function d() {
			var k=c.Ib;
			for(var l=0;l<k.length;l++)a.push(k[l])
		}function f(k) {
			return k<3600000?4:8
		}function g() {
			if(c.KB)c.Lm=window.setTimeout(function () {
				if(c.Nn==h)c.Nn=new wq;
				var k=c.Nn.fE();
				if(k>600000&&c.Mp<f(k)) {
					c.Mp++;
					g()
				}else {
					c.Mp=0;
					c.Lm=h;
					c.xw=i;
					c.u()
				}
			},300000)
		}this.jx(function (k) {
			if(k.denied)d();
			else {
				c.wm=k.max;
				var l={
				};
				for(var p=0,s;s=k.unreadcounts[p];p++) {
					s={
						h:Fk(s.id),q:s.id,Ff:s.count,ff:s.count>=c.wm
					};
					a.push(s);
					l[s.h.streamId]=
					i
				}k=c.Ib;
				for(var p=0;s=k[p];p++)s.h.streamId in l||a.push({
					h:s.h,q:s.q,Ff:0,ff:0
				})
			}b();
			g()
		},function () {
			d();
			b();
			g()
		})
	};
	m.uh=function (a,b) {
		this.$e(a,function (c) {
			c?b(c.Ff,c.ff):b(0,e)
		})
	};
	m.NM=function (a) {
		this.pA(a,-1)
	};
	m.PM=function (a) {
		this.pA(a,1)
	};
	m.pA=function (a,b) {
		var c={
		},d=[];
		function f(l) {
			if(l.streamId in c)return ;
			c[l.streamId]=i;
			d.push(l)
		}f(a.kc.h);
		var g=a.fd;
		for(var a=0,k;k=g[a];a++)f(Ek(k));for(var a=0;f=d[a];a++)this.JM(f,b)
	};
	m.yM=function (a) {
		for(var b=0,c;c=this.Ib[b];b++) {
			c.Ff=a;
			c.ff=e;
			this.Sp(c)
		}
	};
	m.JM=function (a,b) {
		var c=this;
		this.$e(a,function (d) {
			if(d==h) {
				d={
					h:a,q:a.streamId,Ff:0,ff:e
				};
				c.Hs(d)
			}if(d.ff)return ;
			var f=d.Ff,g=f+b;
			if(g<0)g=0;
			if(g>=c.wm) {
				g=c.wm;
				d.ff=i
			}d.Ff=g;
			g!=f&&c.Sp(d)
		})
	};
	m.Sp=function (a) {
		for(var b=0,c;c=this.iA[b];b++)c(a.h,a.Ff,a.ff)
	};m.Vn=function (a) {
		this.iA.push(a)
	};
	function lS(a,b,c) {
		if(a>0) {
			var d=oh;
			d+=a;
			if(b)d+=Ej;
			d+=ph;
			return (c?c+o:n)+d
		}else return c||n
	}
	function gR(a,b,c,d) {
		if(c>0) {
			c=lS(c,d);
			a.innerHTML=YV+c;
			x(a,Q);
			b.mg()&&dK(c)
		}else {
			w(a,Q);
			b.mg()&&dK(n)
		}
	}function PQ() {
		if(Oh&&!Sh(ji))zh=ji
	}var vZ="fast",wZ="viewer-top-controls";
	function cR() {
		window.history.navigationMode=vZ;
		var a=J(yy),b=J(wZ);
		B(a);
		b.insertBefore(a,b.firstChild);
		Ow.Dr(i)
	}function GR(a) {
		var b=X;
		a([175],r(b.Cm,b,e));
		a([176],r(b.Cm,b,i));
		a([178],b.Lg,b);
		a([177],b.Je,b);
		a([172],Ow.Cn,Ow);
		a([173],Ow.Cn,Ow)
	}var xZ=h,yZ="/s2/";
	function IU(a) {
		if(!xZ) {
			xZ=new GG(yZ,jn);
			xZ.Ql({
				groups:i,max:500
			})
		}xZ.Ck(a)
	}function HU(a) {
		if(!a)return n;
		if(a.length>=la)a=a.substr(0,la-"...".length-1)+ag;
		return a
	}function zZ(a,b) {
		this.QI=a;
		this.cl=b||h;
		this.Sc=new cD(h,i);
		a=new EC;
		a.set(QC,KC,e,e);
		a.set(JC,LC,e,i);
		this.Sc.Id(a)
	}m=zZ.prototype;
	m.display=function (a,b,c,d) {
		if(c)c=HU(c);
		this.Sc.Vb(AZ({
			userName:_USER_NAME,userEmail:_USER_EMAIL,PL:c||n,hC:b,gC:d||n,bl:this.cl
		}));
		this.Sc.Hb(a);
		U(this.Sc,IC,this.MC,e,this);
		this.Sc.B(i)
	};
	var BZ="email-to-error",CZ="email-subject-error",DZ="email-comment-error",EZ="email-comment",FZ="email-subject",GZ="email-to",HZ="email-ccme";
	m.MC=function (a) {
		if(a.Ea==JC||!this.tA())return i;
		var b=new Tq,c=this,d=this.Sc.WD(),f=this.cl?h:M(d,BZ),g=M(d,CZ),k=M(d,DZ);
		this.cl||w(f,Q);
		w(g,Q);
		w(k,Q);
		b.Va(function () {
			Z(MU,Kq);
			AK(b.text,{
				emailTo:t(BK,f),subject:t(BK,g),comment:t(BK,k)
			})
		});
		b.va(function () {
			Z(NU,Ss);
			c.Sc.B(e);
			c.Yt()
		});
		a=[];
		a.push([PU,M(d,EZ).value]);
		a.push([RU,M(d,FZ).value]);
		if(!this.cl) {
			a.push([OU,M(d,GZ).value]);
			a.push([SU,M(d,HZ).checked.toString ()])
		}if(d=this.Zo())a=a.concat(d);
		b.Tb(this.QI,Xj(a));
		return e
	};
	m.Zo=function () {
		return h
	};
	m.tA=function () {
		return i
	};
	m.Yt=function () {
	};
	function IZ(a) {
		zZ.call(this,cb);
		this.ei=a
	}v(IZ,zZ);
	IZ.prototype.Zo=function () {
		return [[gp,this.ei.O()]]
	};
	var JZ="Tell your friends about your shared items",KZ="Note to go along with a link to your shared items:",LZ="%1 has shared items with you through Google Reader",MZ="Hi, I thought you might be interested in viewing the items that I&#39;ve shared through Google Reader.";
	IZ.prototype.display=function () {
		zZ.prototype.display.call(this,JZ,KZ,O(LZ,[_USER_NAME]),MZ);
		var a=M(this.Sc.Y(),GZ);
		a.focus();
		IU(a)
	};
	function wT(a) {
		(new IZ(a)).display()
	}function NZ(a,b,c) {
		this.ts=a;
		function d(f,g) {
			return wf(f.displayName,g.displayName)
		}a.sort(d);
		a=OZ({
			br:a
		});
		zZ.call(this,db,a);
		this.VF=b;
		this.TC=c
	}v(NZ,zZ);
	var PZ="email-input";
	NZ.prototype.tA=function () {
		var a=this.Sc.Y();
		a=Zh(Xm,PZ,a);
		for(var b=0,c;c=a[b];b++)if(c.checked)return i;return e
	};
	NZ.prototype.Zo=function () {
		var a=this.Sc.Y();
		a=Zh(Xm,PZ,a);
		if(a.length!=this.ts.length)return h;
		var b=[];
		for(var c=0,d;d=a[c];c++)d.checked&&b.push([SA,this.ts[c].userId]);return b
	};
	var QZ="I&#39;ve been using Google Reader and thought you might like to try it out. With Reader, keeping up with your favorite websites is as easy as checking your email.",RZ="\n\nYou may want to check out and subscribe to my shared items. To take a look at them, visit this page:\n\n",SZ="Tell your friends about Google Reader",TZ="Note to go along with a link to Reader:",UZ="%1 has invited you to try out Google Reader",VZ="all-link",WZ="none-link";
	NZ.prototype.display=function () {
		var a=QZ;
		if(this.VF)a+=RZ+bk(Jj($a+_USER_ID));
		zZ.prototype.display.call(this,SZ,TZ,O(UZ,[_USER_NAME]),Sf(a));
		var b=this.Sc.Y();
		M(b,EZ).focus();
		if(this.ts.length>1) {
			a=M(b,VZ,Vy);
			var c=M(b,WZ,Vy);
			b=b.getElementsByTagName(Xm);
			U(a,T,t(Pe,b,function (d) {
				d.checked=i
			}));
			U(c,T,t(Pe,b,function (d) {
				d.checked=e
			}))
		}
	};
	NZ.prototype.Yt=function () {
		this.TC()
	};
	var Jp;
	function XZ() {
		oY.call(this);
		this.Yr=[];
		this.tx=h
	}v(XZ,oY);
	m=XZ.prototype;
	var YZ="cts",ZZ="_STREAM_LIST_FRIENDS";
	m.oj=function (a,b) {
		this.Yr=[];
		this.tx=h;
		var c=this,d=Ka;
		if(this.ku) {
			d=P(d,YZ,q);
			this.ku=e
		}Pq(d,function (f) {
			var g=e;
			for(var k=0,l;l=f.friends[k];k++) {
				l=new $Z(l);
				l.f()?a.push({
					h:l.f(),q:l.za,oa:l
				}):c.Yr.push(l);
				if(l.fm)g=i;
				if(l.Yc)c.tx=l
			}if(g)window._STREAM_LIST_UNREAD_COUNTS=h;
			b()
		},function () {
			var f=c.Ib;
			if(f)for(var g=0;g<f.length;g++)a.push(f[g]);b()
		},ZZ)
	};m.lJ=function () {
		this.ku=i;
		this.u()
	};
	m.ol=function (a) {
		return (a=this.ib(a))?a.oa:h
	};
	m.ip=function (a) {
		a=new mq(a);
		return this.ol(Ek(a.yb()))
	};
	m.nh=function (a,b) {
		var c=this;
		this.aa(function (d) {
			var f=[];
			for(var g=0;d[g];g++) {
				if(b&&!d[g].oa.ij(b))continue;
				f.push(d[g].oa)
			}for(var g=0;d=c.Yr[g];g++) {
				if(b&&!d.ij(b))continue;
				f.push(d)
			}a(f)
		})
	};
	m.gE=function (a) {
		this.nh(function (b) {
			a(Se(b,function (c,d) {
				return c+(d.Yc?0:1)
			},0))
		},2)
	};
	function $Z(a) {
		this.h=a.stream?new Bk(this,a.stream):h;
		this.za=(this.$H=a.displayName.length>40)?Vj(a.displayName,40):a.displayName;
		this.Cv=a.givenName;
		this.jC=a.contactId;
		this.WI=a.profileIds;
		this.LI=a.photoUrl;
		this.rs=a.userIds;
		this.Xt=a.emailAddresses;
		function b(c) {
			return (a.flags&1<<c)!=0
		}this.Yc=b(pd);
		this.Fh=b(qd);
		this.fm=b(rd);
		this.UM=b(sd);
		this.Gn=a.types
	}m=$Z.prototype;
	m.f=function () {
		return this.h
	};
	m.ij=function (a) {
		return Ve(this.Gn,a)
	};
	m.li=function (a) {
		this.Gn.push(a)
	};
	m.Mj=function (a) {
		Ze(this.Gn,a)
	};
	m.wJ=function () {
		this.Gn=[]
	};
	m.Sa=function () {
		return Lf(this.za)
	};
	m.kh=function (a) {
		return this.Xt[a||0]
	};
	m.Ui=function () {
		return this.WI[0]
	};
	var a_="/reader/ui/152731298-profile-default.gif";
	m.Xe=function () {
		return this.LI||a_
	};
	m.LK=function (a) {
		this.fm=a
	};
	m.Ty=function (a) {
		this.Fh=a
	};
	m.hj=function () {
		return this.ij(1)
	};
	m.$l=function () {
		return this.ij(nd)
	};
	m.bm=function () {
		return this.ij(2)
	};
	m.cg=function () {
		return this.rs.length>0?this.rs[0]:h
	};
	m.op=function (a) {
		return O(a,this.Sa())
	};
	m.mt=function (a) {
		return wf(this.za,a.za)
	};
	function NQ() {
		Jp=new XZ
	}function b_(a,b) {
		xX.call(this,La);
		this.WA=a;
		this.Q=b
	}v(b_,xX);
	b_.prototype.Pb=function () {
		var a=[];
		a.push([fv,this.WA]);
		if(this.Q)for(var b=0,c;c=this.Q[b];b++)this.Hj(c.rs,SA,a);return a
	};function c_(a) {
		b_.call(this,ud,a)
	}v(c_,b_);
	var d_="Hiding %1...";
	c_.prototype.xc=function () {
		if(this.Q.length!=1)return h;
		return O(d_,this.Q[0].Sa())
	};
	var e_="%1 will no longer appear in your friends&#39; shared items list.";
	c_.prototype.vc=function () {
		if(this.Q.length!=1)return h;
		return O(e_,this.Q[0].Sa())
	};
	c_.prototype.Re=function () {
		return [Y]
	};
	c_.prototype.re=function () {
		for(var a=0,b;b=this.Q[a];a++)b.Ty(i);Jp.Cf()
	};function f_(a) {
		b_.call(this,vd,a)
	}v(f_,b_);
	var g_="Restoring %1...";
	f_.prototype.xc=function () {
		if(this.Q.length!=1)return h;
		return O(g_,this.Q[0].Sa())
	};
	var h_="%1 has been restored to your friends&#39; shared items list.";
	f_.prototype.vc=function () {
		if(this.Q.length!=1)return h;
		return O(h_,this.Q[0].Sa())
	};
	f_.prototype.re=function () {
		for(var a=0,b;b=this.Q[a];a++) {
			b.Ty(e);
			b.LK(i);
			if(!b.$l()) {
				b.li(2);
				b.Mj(1)
			}
		}Jp.Cf()
	};
	f_.prototype.Re=function () {
		return [Y]
	};
	function i_(a,b) {
		b_.call(this,td,a);
		this.$r=b
	}v(i_,b_);
	m=i_.prototype;
	m.re=function () {
		for(var a=0,b;b=this.Q[a];a++) {
			b.Mj(2);
			b.li(1);
			this.$r&&b.li(nd)
		}Jp.Cf()
	};
	var j_="sym";
	m.Pb=function () {
		var a=i_.d.Pb.call(this);
		this.$r&&a.push([j_,this.$r]);
		return a
	};
	var k_="Subscribing to {$name}'s shared items...";
	m.xc=function () {
		if(this.Q.length!=1)return h;
		return u(k_,{
			name:this.Q[0].Sa()
		})
	};
	var l_="You are now subscribed to {$name}'s shared items";
	m.vc=function () {
		if(this.Q.length!=1)return h;
		return u(l_,{
			name:this.Q[0].Sa()
		})
	};
	m.Re=function () {
		return [Y]
	};
	function m_(a) {
		b_.call(this,wd,a)
	}v(m_,b_);
	m_.prototype.re=function () {
		for(var a=0,b;b=this.Q[a];a++)b.wJ();Jp.Cf()
	};var n_="Ignoring {$name}...";m_.prototype.xc=function () {
		if(this.Q.length!=1)return h;
		return u(n_,{
			name:this.Q[0].Sa()
		})
	};
	var o_="{$name} will no longer appear in your invite list.";
	m_.prototype.vc=function () {
		if(this.Q.length!=1)return h;
		return u(o_,{
			name:this.Q[0].Sa()
		})
	};
	function p_(a) {
		b_.call(this,yd,a)
	}v(p_,b_);
	p_.prototype.Pb=function () {
		var a=q_.d.Pb.call(this);
		for(var b=0,c;c=this.Q[b];b++)a.push([KA,c.jC]);return a
	};p_.prototype.re=function () {
		for(var a=0,b;b=this.Q[a];a++)b.Mj(nd);Jp.Cf()
	};var r_="Removing {$name}...";p_.prototype.xc=function () {
		if(this.Q.length!=1)return h;
		return u(r_,{
			name:this.Q[0].Sa()
		})
	};
	var s_="{$name} will no longer be able to see your shared items.";
	p_.prototype.vc=function () {
		if(this.Q.length!=1)return h;
		return u(s_,{
			name:this.Q[0].Sa()
		})
	};
	function q_(a) {
		b_.call(this,xd,a);
		var b=[];
		for(var c=0,d;d=a[c];c++)b.push(d.kh());this.Ko=b.join(gq)
	}v(q_,b_);m=q_.prototype;m.re=function () {
		for(var a=0,b;b=this.Q[a];a++) {
			b.li(nd);
			if(b.bm()) {
				b.Mj(2);
				b.li(1)
			}
		}Jp.Cf()
	};
	var t_="inv";
	m.Pb=function () {
		var a=q_.d.Pb.call(this);
		a.push([t_,this.Ko]);
		return a
	};
	var u_="Creating your friend list...";
	m.xc=function () {
		return u(u_)
	};
	var v_="Your friend list has been created";
	m.vc=function () {
		return u(v_)
	};
	m.bp=function () {
		return 30
	};
	function w_(a) {
		q_.call(this,[]);
		this.Ko=a;
		a=this.Ko.split(gq);
		this.Fw=a.length>1&&!rf(a[1])
	}v(w_,q_);
	var x_="Inviting your friend to see your shared stuff...",y_="Inviting your friends to see your shared stuff...";
	w_.prototype.xc=function () {
		var a=u(x_),b=u(y_);
		return this.Fw?b:a
	};
	var z_="Your friend invitation has been sent",A_="Your friend invitations have been sent";
	w_.prototype.vc=function () {
		var a=u(z_),b=u(A_);
		return this.Fw?b:a
	};
	function MT(a,b,c) {
		a=b?new c_(a):new f_(a);
		a.exec(c)
	}var B_="You have moved your shared items",C_="You have cleared your shared items",D_="An error occured clearing your items.";
	function E_(a) {
		var b=new Tq,c=u(B_),d=u(C_),f=u(D_);
		b.Va(function () {
			Z(f,Kq)
		});
		b.va(function () {
			a?Z(c,Ss):Z(d,Ss)
		});
		var g=[];
		a&&g.push([Vf,a]);
		b.Tb(Ma,Xj(g))
	}
	var F_="Clear all Shared Items",G_="unshare-clear-radio-button",H_="unshare-move-radio-button",I_="unshare-move-taglist",J_="New Tag Name:",K_="unshare-move-newtag-option",L_="unshare-newtag-name";
	function M_(a) {
		Kp.ag(function (b) {
			u(F_);
			var c=new cD(h,i);
			c.Id(tC);
			c.Xj(i);
			c.Hb(N_());
			c.Vb(O_({
				fH:b
			}));
			c.B(i);
			var d=c.tb.RD(QC),f=Yh(G_),g=Yh(H_),k=Yh(I_);
			d.disabled=i;
			k.selectedIndex=0;
			function l() {
				d.disabled=!f.checked&&!g.checked||g.checked&&k.selectedIndex==0
			}function p() {
				k.disabled=!g.checked;
				l()
			}var s=[];
			s.push(U(g,T,p));
			s.push(U(Yh(G_),T,p));
			var A=u(J_),I=n,L=Yh(K_),K=Yh(L_);
			s.push(U(k,pF,function () {
				l();
				if(k.options[k.selectedIndex]==L) {
					var G=oK(A,n);
					if(G&&G.search(ka)!=-1) {
						alert(O($r,G));
						G=
						h
					}if(G!=h&&G.length!=0) {
						I=G;
						K.innerHTML=P_({
							eH:Lf(G,e)
						})
					}else {
						k.selectedIndex=0;
						l()
					}
				}else K.innerHTML=n
			}));
			Al(c,IC,function (G) {
				for(var Jb=0,Kb;Kb=s[Jb];Jb++)Cl(Kb);if(G.Ea==QC)if(g.checked) {
					G=k.options[k.selectedIndex];
					G=G==L?R.vh(I).O():G.value;
					E_(G);
					if(a) {
						a();
						Kp.u()
					}
				}else {
					E_();
					a&&a()
				}c.n()
			})
		})
	}function Nx(a) {
		a&&Mx.Ky(Q_)
	}function R_(a,b) {
		var c=new Tq;
		c.va(function () {
			a(parseInt(c.text,10))
		});
		c.Va(b);
		b=P(ta,gp,R.yb().O());
		c.N(b)
	}
	function S_(a,b,c) {
		Up();
		Jp.nh(function (d) {
			uy();
			var f=le(b)&&b;
			if(b) {
				Ys(i);
				at(i)
			}T_(d,a,f,c)
		},od)
	}function U_(a) {
		Up();
		Jp.lJ();
		S_(i,undefined,a)
	}var V_="friend-picker-dialog",W_="Save changes",X_="friends-list",Y_="friend-container",Z_="friend-container-selected",$_="continue-v1-sharing",a0="friends-list-disabled";
	function T_(a,b,c,d) {
		var f=[];
		if(b)for(var b=0,g;g=a[b];b++)g.$l()||f.push(g);else f=a;if(f.length==0) {
			d?d():Jx.select();
			return
		}ef(f,function (L,K) {
			return L.mt(K)
		});
		a=new cD(V_);
		a.Wm(0.5);
		a.Xj(i);
		b=new EC;
		d=u(W_);
		g=u(LC);
		b.set(QC,d,i);
		b.set(JC,g,e,i);
		a.Id(b);
		a.Hb(b0({
			kb:sD(Hd)
		}));
		b=c0({
			Ki:f,rL:c
		});
		a.Y().appendChild(b);
		var k=M(b,X_,C),l=k.getElementsByTagName(Xm),p=Zh(C,Y_,b);
		function s(L,K,G) {
			if(K.disabled)return ;
			if(G.target!=K)K.checked=!K.checked;
			y(L,Z_,K.checked)
		}var A=c?M(b,$_,Xm):h;
		A&&U(A,T,function (L) {
			y(k,
			a0,A.checked);
			for(var K=0,G;G=l[K];K++) {
				G.checked||s(p[K],G,L);
				G.disabled=A.checked
			}
		});
		function I(L,K) {
			if(A&&A.checked)return ;
			for(var G=0,Jb;Jb=l[G];G++) {
				var Kb=p[G];
				if(!Jb.checked&&L)s(Kb,Jb,K);
				else Jb.checked&&!L&&s(Kb,Jb,K)
			}
		}c=M(b,VZ,Vy);
		b=M(b,WZ,Vy);
		U(c,T,t(I,i));
		U(b,T,t(I,e));
		for(b=0;b<l.length;b++) {
			I=p[b];
			U(I,T,r(s,h,I,l[b]))
		}U(a,IC,t(d0,f,l,A));
		a.B(i)
	}
	function d0(a,b,c,d) {
		if(d.Ea==JC)return ;
		if(c&&c.checked) {
			Jp.aa(function () {
				Jx.select()
			});
			return
		}var f=[];
		for(var c=0;d=b[c];c++)d.checked?f.push(a[c]):a[c].Mj(nd);os(kc,Ad,function () {
			if(f.length==0)return ;
			(new q_(f)).exec(function () {
				Jx.select()
			})
		})
	}function Q_() {
		$s(function (a) {
			a||e0()
		})
	}var f0="friends-v2-info-bubble",g0="friends-tree-item-0-name",h0="friends-v2intro-edit-button",i0="friends-v2intro-nothanks",j0="friends-no-thanks";
	function e0() {
		if(J(f0))return ;
		var a=Kt(J(g0));
		if(!a.width)return ;
		var b=ZC(f0,k0({
			kb:sD(Hd)
		}));
		aD(b,a.left+a.width,a.top+a.height/2);
		a=J(h0);
		Al(a,T,function () {
			B(b);
			S_(e,i);
			Mx.nA();
			Mx.Ky(h)
		});
		a=M(J(i0),j0,Vy);
		Al(a,T,function () {
			B(b);
			Ys(i);
			at(i);
			os(kc,zd)
		})
	}var Mx,l0="friends-tree-item-",m0="friends-settings-link";
	function n0() {
		bS.call(this);
		this.Lp=l0;
		this.kk=e;
		var a=t(Op,Kc,undefined,undefined);
		U(J(m0),T,a)
	}v(n0,bS);
	m=n0.prototype;
	m.Pp=function () {
		Jp.Lb(r(this.load,this))
	};
	var o0="friends-tree";
	m.wd=function () {
		return this.K(o0)
	};
	m.Aq=function (a) {
		Jp.aa(function () {
		});
		Y.aa(function () {
		});
		Jp.nh(function (b) {
			Y.aa(function () {
				Cy.Tq(function () {
					var c=[],d={
					};
					for(var f=0,g;g=b[f];f++) {
						if(g.Fh)continue;
						if(g.f().streamId in d)continue;
						d[g.f().streamId]=1;
						c.push(g)
					}a(c,[])
				})
			})
		},1)
	};
	m.ca=function () {
		if(!this.Ma)return ;
		this.Is&&this.Is();
		if(!this.Ma.Za)return ;
		var a,b=this.Ma.Vc();
		for(var c=0,d;d=b[c];c++)if(d.zb().offsetHeight) {
			a=d;
			break
		}if(b=this.yc()) {
			b.style.height=eC;
			if(a) {
				if(Ow.Zr.Bd) {
					a=ki(window).height;
					c=Gt(b);
					d=Jt(Ow.Li.Uu()).height;
					var f=Jt(Ow.Zr.Fd).height;
					a=a-c-d-f
				}else a=a.zb().offsetHeight*6;
				if(b.offsetHeight>a)b.style.height=a+yt
			}
		}
	};
	m.Ky=function (a) {
		this.Is=a
	};
	m.yc=function () {
		return this.Ma.qh().getElementsByTagName(dp)[0]
	};
	m.ze=function (a) {
		n0.d.ze.call(this,a);
		a&&this.wb&&this.wb.h.G(a)&&a.Eb()&&UC(this.yc(),this.wb.zb())
	};
	m.yo=function (a) {
		var b=this.Ma=new p0(this,R.fe(),h);
		b.Rr=e;
		this.Pq=0;
		if(!this.Oq)this.Oq={
		};
		for(var c=0,d;d=a[c];c++) {
			if(d.Yc)continue;
			this.iJ(d);
			d=new q0(this,d,b);
			b.bc(d)
		}
	};
	m.iJ=function (a) {
		if(a.fm&&a.hj()&&!(a.cg() in this.Oq)) {
			this.Pq++;
			this.Oq[a.cg()]=1
		}else this.Ma.Rr=i
	};
	var r0="friends-tree-invite-info";
	m.display=function () {
		bS.prototype.display.call(this);
		if(H.Kc())if(this.Ma.Vc().length) {
			var a=this.yc(),b=ni(C);
			a.parentNode.replaceChild(b,a);
			b.appendChild(a)
		}this.Wl=M(this.wd(),r0);
		a=M(this.Wl,tb,Vy);
		U(a,T,function (c) {
			c.stopPropagation();
			Jx.Vk(1)
		});
		this.nA();
		MM();
		this.Kt&&this.Kt()
	};
	m.rK=function (a) {
		this.Kt=a
	};
	m.Dg=function (a) {
		var b=this;
		Rx(function () {
			bS.prototype.Dg.call(b,a)
		})
	};
	var s0="1 new person sharing with you",t0="{$count} new people sharing with you",u0="info";
	m.nA=function () {
		if(!this.Wl)return ;
		var a=this;
		Jp.gE(function (b) {
			var c=u(s0),d=u(t0,{
				count:b
			});
			M(a.Wl,u0,Vy).innerHTML=b>1?d:c;
			$s(function (f) {
				y(a.Wl,Q,b==0||!f)
			})
		})
	};
	function p0(a,b,c) {
		DS.call(this,a,b,c);
		this.Za=i
	}v(p0,DS);
	p0.prototype.Vc=function () {
		return this.T
	};
	var v0="%1 New!";
	p0.prototype.up=function () {
		return this.Rr&&this.qb.Pq>0?O(v0,this.qb.Pq):h
	};
	p0.prototype.Zu=function () {
		return w0()
	};
	p0.prototype.getName=function () {
		return {
			za:this.r,il:this.r
		}
	};
	var x0="friend";
	function q0(a,b,c) {
		uS.call(this,a,c,x0,b.f());
		this.oa=b;
		this.r=b.Yc?R.yb().gp():b.za;
		this.r=bg(this.r,18)
	}v(q0,uS);
	m=q0.prototype;
	m.oh=function () {
		return this.oa.Xe()
	};
	var y0="New!";
	m.up=function () {
		return this.A.Rr&&!this.oa.Yc&&this.oa.fm?y0:h
	};
	m.Yu=function () {
		return z0()
	};
	m.IF=function () {
		Op(Lc);
		MT([this.oa],i)
	};
	var A0="friends-tree-item-action";
	m.Jt=function (a) {
		lf(a,A0)?this.IF():this.Cl();
		return i
	};
	m.os=function (a,b) {
		var c=this.Fe!=a||this.ui!=b;
		q0.d.os.call(this,a,b);
		c&&this.qb.ca()
	};
	function Lx() {
		Zs(function (a) {
			a||B0()
		});
		Mx=new n0;
		Mx.load()
	}var C0="friends-new-user-ok";
	function B0() {
		var a=D0({
			kb:sD(Hd)
		}),b=M(a,C0);
		Al(b,T,function () {
			Sj(Ow.Li.Fd,i);
			B(a);
			Mx.ca();
			S_(e,i,function () {
				os(kc,Ad,function () {
					Jx.select()
				})
			})
		});
		Sj(Ow.Li.Fd,e);
		si(a,Ow.Li.Fd)
	}var E0="Sharing Settings";
	function Kx() {
		var a=u(E0);
		vH.call(this,m0,Wa,a,r(this.xI,this));
		this.as=0;
		Jp.Lb(r(this.GD,this))
	}v(Kx,vH);
	m=Kx.prototype;
	var F0="friends-manager";
	m.ke=F0;
	m.xI=function (a) {
		if(this.Si(ZZ).length>0)Jp.u();
		else window._STREAM_LIST_FRIENDS=h;
		var b=this;
		Jp.nh(function (c) {
			is(kc,function (d) {
				b.Gc=d==Ad;
				R_(function (f) {
					b.nn=f;
					b.yt(a,c)
				},function () {
					b.yt(a,c)
				})
			})
		});
		vm.IA.Ub()
	};
	var G0="nof";
	m.pp=function (a) {
		if(Jp.yA(300))return P(a,G0,q);
		return a
	};
	m.Vk=function (a) {
		this.as=a;
		this.xr?this.u():this.select()
	};
	m.GD=function () {
		if(!J(F0))return ;
		var a=this;
		Jp.nh(function (b) {
			a.Xx(b)
		})
	};
	m.yt=function (a,b) {
		Up();
		gI(a,this.as);
		this.as=0;
		this.Xx(b)
	};
	var H0="followers-tab-contents",I0="following-tab-contents",J0="followers-tab-header",K0="following-tab-header",L0="follower-container",M0="invite-container",N0="name-email",O0="following-container";
	m.Xx=function (a) {
		var b=J(H0),c=J(I0);
		b.innerHTML=n;
		c.innerHTML=n;
		ef(a,function (A,I) {
			return A.mt(I)
		});
		var d=[],f={
		},g=[],k=[],l=[];
		for(var p=0,s;s=a[p];p++) {
			if(s.Yc)continue;
			if(s.hj())if(!(s.f().streamId in f)) {
				g.push(s);
				f[s.f().streamId]=1
			}s.$l()&&d.push(s);
			s.bm()&&k.push(s);
			if((s.$l()||s.hj())&&!s.UM)l.push(s)
		}this.BD=J(J0);
		this.CD=J(K0);
		this.KM(d.length,g.length);
		f=sD(Hd);
		a=P0({
			Ki:d,Fg:this.nn,Nd:this.Gc,nb:!this.Gc,Gd:l.length,kb:f
		});
		b.appendChild(a);
		b=Q0({
			tw:k,DD:g,Fg:this.nn,Nd:this.Gc,nb:!this.Gc,
			Gd:l.length,kb:f
		});
		c.appendChild(b);
		c=Zh(C,L0,a);
		this.Tn(d,c,u0);
		this.Gc&&this.nB(d,c);
		d=Zh(C,M0,b);
		this.Tn(k,d,N0);
		this.mB(k,d);
		ST(k,d,function (A,I,L) {
			B(L)
		});
		k=Zh(C,O0,b);
		this.Tn(g,k,N0);
		this.jB(g,k);
		this.jw(a,l);
		this.jw(b,l);
		uy()
	};
	var R0="People I'm sharing with ({$count})",S0="People sharing with me ({$count})";
	m.KM=function (a,b) {
		this.BD.innerHTML=u(R0,{
			count:a
		});
		this.CD.innerHTML=u(S0,{
			count:b
		})
	};
	var T0="preview-link";
	m.mB=function (a,b) {
		for(var c=0,d;d=b[c];c++) {
			var f=a[c];
			d=M(d,T0);
			wA(d,f.f())
		}
	};
	var U0="remove-link";
	m.nB=function (a,b) {
		for(var c=0,d;d=b[c];c++) {
			var f=a[c],g=M(d,U0);
			U(g,T,r(this.qJ,this,f,d))
		}
	};
	var V0="hide-link";
	m.jB=function (a,b) {
		for(var c=0,d;d=b[c];c++) {
			var f=a[c];
			d=M(d,V0);
			U(d,T,r(this.dM,this,f))
		}
	};
	m.qJ=function (a,b) {
		(new p_([a])).exec(t(B,b))
	};
	m.dM=function (a) {
		MT([a],!a.Fh)
	};
	var W0="unshare-all-link",X0="unshare-info",Y0="add-emails-text-area",Z0="send-invites-button",$0="friend-picker-link",a1="You're already friends with all of your contacts. Try inviting others by using their email addresses.",b1="change-sharing-with",c1="email-your-friends";
	m.jw=function (a,b) {
		if(this.nn&&this.nn>0) {
			var c=M(a,W0,Vy),d=M(a,X0,C);
			U(c,T,function () {
				M_(function () {
					w(d,Q)
				})
			})
		}if(!!this.Gc) {
			c=M(a,Y0);
			IU(c);
			var f=M(a,Z0);
			U(f,T,r(this.aK,this,c));
			c=M(a,$0);
			U(c,T,t(U_,function () {
				var g=u(a1);
				alert(g)
			}))
		}c=M(a,b1);
		U(c,T,this.XB,e,this);
		if(b.length>0) {
			a=M(a,c1);
			U(a,T,r(this.FL,this,b))
		}
	};
	var d1="Choose who to share with",e1="change-sharing-group",f1="save",g1="share-with-friends-input";
	m.XB=function () {
		var a=u(d1),b=new cD(e1,i),c=new EC,d=u(OC),f=u(LC);
		c.set(f1,d,i);
		c.set(JC,f,e,i);
		b.Id(c);
		b.Xj(i);
		b.Hb(a);
		b.Wm(0.5);
		a=h1({
			Nd:this.Gc
		});
		c=M(a,g1);
		U(b,IC,r(this.nI,this,c));
		b.Y().appendChild(a);
		b.B(i)
	};
	m.nI=function (a,b) {
		if(b.Ea==JC)return ;
		b=h;
		if(a.checked&&!this.Gc) {
			b=Ad;
			this.Gc=i
		}else if(!a.checked&&this.Gc) {
			b=zd;
			this.Gc=e
		}if(b) {
			Up();
			a=this.Gc?U_:r(Jp.u,Jp);
			os(kc,b,a)
		}
	};
	m.FL=function (a) {
		var b=[];
		for(var c=0,d;d=a[c];c++) {
			if(!d.cg())continue;
			b.push({
				userId:d.cg(),SC:d.kh(),displayName:d.za
			})
		}(new NZ(b,i,function () {
		})).display()
	};
	m.aK=function (a) {
		if(rf(a.value))return ;
		(new w_(a.value)).exec(function () {
			a.value=n
		})
	};
	m.Tn=function (a,b,c) {
		if(b.length!=a.length)return ;
		for(var d=0,f;f=b[d];d++) {
			var g=a[d];
			f=M(f,c);
			if(!g.Ui())continue;
			sn(g.Ui(),f,g.Sa())
		}
	};
	var i1="allow-button",j1="ignore-link",k1="also-share-input";
	function ST(a,b,c) {
		for(var d=0,f;f=a[d];d++) {
			var g=b[d],k=M(g,i1),l=M(g,j1),p=Zh(undefined,k1,g);
			U(k,T,r(l1,h,f,g,p.length>0?p[0]:h,c));
			U(l,T,r(m1,h,f,g,c))
		}
	}function l1(a,b,c,d) {
		(new i_([a],c?c.checked:e)).exec(t(d,i,a,b))
	}function m1(a,b,c) {
		(new m_([a])).exec(t(c,e,a,b))
	}vm.IA=new xH(Kx);
	function eU() {
		this.rf=[]
	}m=eU.prototype;
	m.Hb=function (a) {
		this.q=a
	};
	m.jn=function (a) {
		this.Ae=a
	};
	m.hn=function (a) {
		this.EL=a
	};
	m.gn=function (a) {
		this.Az=a
	};
	m.gL=function (a) {
		this.qs=a
	};
	m.Zj=function (a,b) {
		a=vf(a);
		function c(d) {
			var f=mi(C);
			f.innerHTML=d;
			for(var d=0,g;g=f.childNodes[d];d++)if(g.nodeType==1)return e;return i
		}if(b&&c(a)) {
			a=a?Cf(a):n;
			this.lH=i
		}this.Gg=a
	};
	m.VK=function (a) {
		this.mz=a
	};
	m.BK=function (a) {
		this.im=a
	};
	m.Xc=function () {
		return this.q
	};
	m.th=function () {
		return this.Az
	};
	m.Wi=function () {
		return this.Gg
	};
	m.Oc=function (a,b) {
		b&&this.rf.push([a,b])
	};
	var n1="Adding a note...",o1="Your note has been added and shared.",p1="Your note has been added.",q1="annotation",r1="share",s1="linkify";
	m.XI=function (a,b) {
		Z(n1,DI);
		var c=new Tq,d=this;
		c.va(function () {
			d.mz?Z(o1,Ss):Z(p1,Ss);
			a()
		});
		c.Va(function () {
			Z(Hq,Kq,7,c.text);
			b&&b()
		});
		this.Oc(zo,this.q);
		this.Oc(Ao,this.Ae);
		this.Oc(Co,this.EL);
		this.Oc(Bo,this.Az);
		this.Oc(q1,this.zB?Cf(this.zB):n);
		if(this.qs)for(var f in this.qs)this.Oc(mO,this.qs[f]);this.Oc(Do,this.Gg);this.Oc(r1,this.mz?q:Xb);this.Oc(fp,this.im);this.Oc(s1,this.lH?q:Xb);c.Tb(Ba,Xj(this.rf))
	};var t1="Are you sure you'd like to delete this note? This operation cannot be undone.";
	m.CC=function (a) {
		Tr(t1,r(this.wD,this,a))
	};
	var u1="Deleting a note...",v1="Your note has been deleted.";
	m.wD=function (a) {
		Z(u1,DI);
		var b=new Tq;
		b.va(function () {
			Z(v1,Ss);
			a()
		});
		b.Va(function () {
			Z(Hq,Kq,7,b.text)
		});
		this.Oc(fp,this.im);
		b.Tb(Aa,Xj(this.rf))
	};
	var w1,x1="your-items-tree-item-";
	function y1() {
		bS.call(this);
		this.Lp=x1;
		this.kk=e
	}v(y1,bS);
	m=y1.prototype;
	var z1="your-items-tree";
	m.wd=function () {
		return this.K(z1)
	};
	m.Pp=function () {
	};
	m.Aq=function (a) {
		Y.aa(function () {
			Cy.Tq(function () {
				a([],[])
			})
		})
	};
	m.yo=function () {
		var a=this.Ma=new A1(this,R.rp(),h);
		a.bc(new B1(this,R.yb(),a));
		a.bc(new B1(this,R.cp(),a))
	};
	m.Dg=function (a) {
		Rx(r(y1.d.Dg,this,a))
	};
	function A1(a,b,c) {
		DS.call(this,a,b,c)
	}v(A1,DS);
	A1.prototype.Vc=function () {
		return this.T
	};
	A1.prototype.rc=function () {
		DS.prototype.rc.call(this);
		MM()
	};
	var C1="your-items";
	function B1(a,b,c) {
		uS.call(this,a,c,C1,Ek(b));
		this.r=b.ge()
	}v(B1,uS);
	var D1="/reader/ui/913345171-broadcast-active.png",E1="/reader/ui/3262861168-icon-posted-items.png";
	B1.prototype.oh=function () {
		return this.h.Ec(R.yb())?D1:E1
	};
	function Ex() {
		w1=new y1;
		w1.load()
	};
	var F1='<div class="banner"><div class="primary-message"></div><div class="secondary-message"></div></div>';
	function bH(a,b) {
		a=b||new D;
		a.a(F1);
		if(!b)return E(a.toString ())
	};
	var G1="The blogs you follow in Blogger have been added as subscriptions in Google Reader. You can manage the blogs you follow using the {$startLink_1}Blogger dashboard{$endLink}. {$startLink_2}Learn more{$endLink}",H1='<a target="_blank" href="http://www.blogger.com/manage-blogs-following.g">',I1='<a target="_blank" href="http://help.blogger.com/bin/answer.py?answer=99761">',J1='<div class="interruption small-interruption">';
	function lU(a,b) {
		a=u(G1,{
			startLink_1:H1,endLink:no,startLink_2:I1
		});
		var c=b||new D;
		c.a(J1,a,xY);
		if(!b)return E(c.toString ())
	}
	var K1="The blogs you follow in Blogger have been added as subscriptions in Google Reader. Subscriptions can be managed in Reader without affecting your following list in Blogger. {$startLink}Learn more{$endLink}",L1="You can also {$startSpan}hide followed blogs{$endSpan} if you'd rather not see them in Reader.",M1='<span class="link" id="blogger-following-opt-out">',$="</span>",N1="<h3>Blogs I'm following</h3><p>",O1="</p><p>",P1='</span><div id="blogger-following-button-container">';
	function QR(a,b) {
		a=u(K1,{
			startLink:I1,endLink:no
		});
		var c=u(L1,{
			startSpan:M1,endSpan:$
		}),d=u(KC),f=b||new D;
		f.a(N1,a,O1,c,P1);
		Q1({
			id:NR,Bm:i,content:d
		},f);
		f.a(xY);
		if(!b)return f.toString ()
	};
	var R1='<div role="wairole:button" tabIndex="0" class="goog-button goog-button-base unselectable goog-inline-block ',S1="goog-button-float-left",T1=" goog-menu-button",U1=" goog-button-tight",V1='id="',W1='><div class="goog-button-base-outer-box goog-inline-block"><div class="goog-button-base-inner-box goog-inline-block"><div class="goog-button-base-pos"><div class="goog-button-base-top-shadow">&nbsp;</div><div class="goog-button-base-content"><div class="goog-button-body">',X1='<div class="goog-menu-button-dropdown"></div>',
	Y1="</div></div></div></div></div>";
	function Q1(a,b) {
		var c=b||new D;
		c.a(R1,!a.Bm?S1:n,a.dm?T1:n,a.Ih?U1:n,a.ra?o+a.ra:n,Kf,a.id?V1+a.id+Kf:n,W1,a.content,xY,a.dm?X1:n,Y1);
		if(!b)return c.toString ()
	};
	var Z1="From:",$1="To:",a2="Subject:",b2="{$startBold}{$commentPrompt}{$endBold} (Optional, no more than 1,000 characters)",c2='<div class="email-area"><table class="email-entry-table"><tbody><tr><td class="field-name">',d2=" </td><td>",e2=" &lt;",f2='&gt;</td></tr><tr><td class="field-name"',g2='style="vertical-align: top"',h2="</td><td>",i2='<input type="text" class="email-to"><div class="form-error-message email-to-error hidden"></div>',j2='</td></tr><tr><td class="field-name">',k2='</td><td><input type="text" class="email-subject" value="',
	l2='"><div class="form-error-message email-subject-error hidden"></div></td></tr><tr><td colspan="2">',m2='<br><div class="form-error-message email-comment-error hidden"></div><textarea class="email-comment" rows="7">',n2="</textarea>",o2="Send me a copy of this email",p2='<div><label><input type="checkbox" name="ccMe" class="email-ccme" value="true">',q2="</label></div>",r2="</td></tr></tbody></table></div>";
	function AZ(a,b) {
		var c=u(Z1),d=u($1),f=u(a2),g=u(b2,{
			startBold:HF,commentPrompt:F(a.hC),endBold:IF
		}),k=b||new D;
		k.a(c2,c,d2,F(a.userName),e2,F(a.userEmail),f2,a.bl?g2:n,Jf,d,h2,a.bl?a.bl:i2,j2,f,k2,F(a.PL),l2,g,m2,a.gC.replace(Bf,tf,lg),n2);
		if(!a.bl) {
			a=u(o2);
			k.a(p2,a,q2)
		}k.a(r2);
		if(!b)return k.toString ()
	}
	var s2="Select: ",t2="All",u2="None",v2="<div class='recipient-list-container'><div class='options'><span class='select'>",w2="</span> <span class='link all-link'>",x2="</span> | <span class='link none-link'>",y2='</span></div><ul class="recipient-list">',z2='<li><label title="',A2='"><input type="checkbox" checked="checked" class="email-input" />',B2="</label></li>",C2="</ul></div>";
	function OZ(a,b) {
		var c=b||new D;
		if(a.br.length==1)c.a(F(a.br[0].displayName));
		else {
			var d=u(s2),f=u(t2),g=u(u2);
			c.a(v2,d,w2,f,x2,g,y2);
			a=a.br;
			d=a.length;
			for(f=0;f<d;f++) {
				g=a[f];
				c.a(z2,F(g.SC),A2,F(g.displayName),B2)
			}c.a(C2)
		}if(!b)return c.toString ()
	};
	var D2='<li class="chooser-item">';
	function SY(a,b) {
		var c=b||new D;
		c.a(D2,F(a.vu),DY);
		if(!b)return E(c.toString ())
	};
	var E2='<div id="followers-page"><div id="followers-intro" ',F2='class="hidden"',G2='><div class="intro-text">',H2='These are the people who can see the stuff you share. To stop sharing with them, use the "remove" link next to their name. {$startLink}Learn more{$endLink}',I2='" target="_blank">',J2="These are the people who can see the stuff you share. To stop sharing with them, edit your Gmail chat contacts. {$startLink}Learn more{$endLink}",K2='</div></div><div id="followers-list-container" ',L2=
	">&nbsp;",M2='<div class=\'follower-container\'><div class="follower"><div class="info"><div class="image"><img src="',N2='" width="40" height="40" alt="',O2='"/></div><div class="name-email"><span class="name">',P2='<br /><span class="email">',Q2='</div></div><div class="options">',R2="Remove",S2='<span class="remove-link link unselectable">',T2="</div></div></div>",U2='</div><div id="followers-additional">',V2="</div></div>";
	function P0(a,b) {
		var c=b||new D;
		c.a(E2,a.Ki.length==0?F2:n,G2);
		if(a.Nd) {
			var d=u(H2,{
				startLink:mo+F(a.kb)+I2,endLink:no
			});
			c.a(d)
		}else {
			d=u(J2,{
				startLink:mo+F(a.kb)+I2,endLink:no
			});
			c.a(d)
		}c.a(K2,a.Ki.length==0?F2:n,L2);
		d=a.Ki;
		var f=d.length;
		for(var g=0;g<f;g++) {
			var k=d[g];
			c.a(M2,F(k.Xe()),N2,F(k.za),O2,F(k.za),$);
			var l=k.Xt.length;
			for(var p=0;p<l;p+=1)c.a(P2,F(k.kh(p)),$);c.a(Q2);if(!a.nb) {
				k=u(R2);
				c.a(S2,k,$)
			}c.a(T2)
		}c.a(U2);
		W2({
			Fg:a.Fg,Nd:a.Nd,nb:a.nb,Gd:a.Gd
		},c);
		c.a(V2);
		if(!b)return E(c.toString ())
	}
	var X2='These are the people who have chosen to share with you. If you\'d like to stop seeing their shared items in Reader, use the "Hide" link next to their name. {$startLink}Learn more{$endLink}',Y2='<div id="following-page"><div id="following-intro"><div class="intro-text">',Z2='<div id="invite-list-container">',$2='<div id="following-list-container">&nbsp;',a3='</div><div id="following-additional">';
	function Q0(a,b) {
		var c=u(X2,{
			startLink:mo+F(a.kb)+I2,endLink:no
		}),d=b||new D;
		d.a(Y2,c,V2);
		if(a.tw.length>0) {
			d.a(Z2);
			c=a.tw;
			var f=c.length;
			for(var g=0;g<f;g++)b3({
				df:c[g],nb:a.nb
			},d);
			d.a(xY)
		}d.a($2);
		c=a.DD;
		f=c.length;
		for(g=0;g<f;g++)c3({
			eh:c[g]
		},d);
		d.a(a3);
		W2({
			Fg:a.Fg,Nd:a.Nd,nb:a.nb,Gd:a.Gd
		},d);
		d.a(V2);
		if(!b)return E(d.toString ())
	}
	var d3="Preview",e3='<div class="invite-container"><div class="following invite"><div class="name-email"><img src="',f3='" width="15" height="15" alt="',g3='"/><span class="name">',h3='</span><span> - </span><a class="preview-link" href="">',i3='</a><br /><span class="email">',j3="</span></div>";
	function b3(a,b) {
		var c=u(d3),d=b||new D;
		d.a(e3,F(a.df.Xe()),f3,F(a.df.za),g3,F(a.df.za),h3,c,i3,F(a.df.kh()),j3);
		k3({
			df:a.df,nb:a.nb
		},d);
		d.a(V2);
		if(!b)return E(d.toString ())
	}
	var l3="Allow",m3="or",n3="Ignore",o3='<div class="options">',p3="Also share my stuff with {$xxx}",q3='<label><input class=\'also-share-input\' type="checkbox" checked="checked" />',r3="</label>",s3='<div class="allow-or-ignore">',t3='<span class="or">',u3='</span><span class="link unselectable ignore-link shown-friend">',v3="</span></span></div></div>";
	function k3(a,b) {
		var c=u(l3),d=u(m3),f=u(n3),g=b||new D;
		g.a(o3);
		if(!a.nb) {
			a=u(p3,{
				xxx:F(a.df.Cv)
			});
			g.a(q3,a,r3)
		}g.a(s3);
		Q1({
			ra:i1,content:c
		},g);
		g.a(t3,d,u3,f,v3);
		if(!b)return E(g.toString ())
	}
	var w3='<div class="following-container"><div class="following"><div class="name-email"><img src="',x3='</span><span class="email">',y3='</span></div><div class="options"><span class="hide-link',z3=" hidden-friend",A3=" shown-friend",B3="(Hidden) ",C3="Show",D3="<span class='hidden-indicator'>",E3="</span>&nbsp;<span class='link unselectable'>",F3="Hide",G3="<span class='link unselectable'>",H3="</span></div></div></div>";
	function c3(a,b) {
		var c=b||new D;
		c.a(w3,F(a.eh.Xe()),f3,F(a.eh.za),g3,F(a.eh.za),x3,F(a.eh.kh()),y3,a.eh.Fh?z3:A3,Qi);
		if(a.eh.Fh) {
			a=u(B3);
			var d=u(C3);
			c.a(D3,a,E3,d,$)
		}else {
			a=u(F3);
			c.a(G3,a,$)
		}c.a(H3);
		if(!b)return E(c.toString ())
	}
	var I3="Change",J3="<div class=\"followers-get-more\"><div class='sharing-group-info'>",K3='You are currently sharing with "Friends".',L3="<span class='sharing-with'>",M3="You are currently sharing with your chat contacts.",N3=" <span class='link change-sharing-with'>",O3="{$startBold}You are sharing {$sharedCount} items{$endBold} that your friends will be able to see.",P3="If you'd like to start fresh, you can {$startSpan}move or clear your shared items{$endSpan}.",Q3='<span class="unshare-all-link link unselectable">',
	R3="<div class='unshare-info'><div class=\"your-sharing-info\">",S3='</div><div class="start-fresh">',T3="Share with more people",U3='<div class="email-invite"><div class="email-invite-heading">',V3="You can {$startSpan}email them a link{$endSpan} to your shared items.",W3="<span class='email-your-friends link'>",X3="1 of your friends doesn't use Reader.",Y3="{$notUsingReaderCount} of your friends don't use Reader.",Z3="Or find new people by entering email addresses separated by commas.",$3="Send invites",
	a4="Or {$startSpan}find more friends{$endSpan} from your contacts.",b4="<span class='friend-picker-link link'>",c4="<br><br>",d4="{$startSpan}Find more friends{$endSpan} from your contacts.",e4="<textarea class='add-emails-text-area' rows=\"4\"></textarea>";
	function W2(a,b) {
		var c=u(I3),d=b||new D;
		d.a(J3);
		if(a.Nd) {
			var f=u(K3);
			d.a(L3,f,$)
		}else {
			f=u(M3);
			d.a(L3,f,$)
		}d.a(N3,c,j3);
		if(a.Fg) {
			c=u(O3,{
				startBold:HF,sharedCount:F(a.Fg),endBold:IF
			});
			f=u(P3,{
				startSpan:Q3,endSpan:$
			});
			d.a(R3,c,S3,f,V2)
		}if(a.Gd>0||!a.nb) {
			c=u(T3);
			d.a(U3,c,xY);
			if(a.Gd>0) {
				c=u(V3,{
					startSpan:W3,endSpan:$
				});
				if(a.Gd==1) {
					f=u(X3);
					d.a(f,Bf)
				}else {
					f=u(Y3,{
						notUsingReaderCount:F(a.Gd)
					});
					d.a(f,Bf)
				}d.a(c)
			}if(!a.nb) {
				c=u(Z3);
				f=u($3);
				if(a.Gd>0) {
					a=u(a4,{
						startSpan:b4,endSpan:$
					});
					d.a(c4,a)
				}else {
					a=u(d4,{
						startSpan:b4,
						endSpan:$
					});
					d.a(a)
				}d.a(c4,c,e4);
				Q1({
					ra:Z0,content:f
				},d)
			}d.a(xY)
		}d.a(xY);
		if(!b)return E(d.toString ())
	}
	var f4='Share with "Friends"',g4="Share with all of my chat contacts",h4="(Anyone you can chat with in Gmail can automatically see your shared items)",i4='<div id="change-sharing-group-dialog"><form><div class="choose-sharing-with-friends"><input type="radio" name="share-with-group" class="share-with-friends-input" id="share-with-friends-input" ',j4='checked="checked"',k4='></input><label for="share-with-friends-input"><b>',l4='</b></label></div><div class="choose-sharing-with-contacts"><input type="radio" name="share-with-group" id="share-with-contacts-input" ',
	m4='></input><div class="info"><label for="share-with-contacts-input"><b>',n4="</b><br>",o4="</label></div></div></form></div>";
	function h1(a,b) {
		var c=u(f4),d=u(g4),f=u(h4),g=b||new D;
		g.a(i4,a.Nd?j4:n,k4,c,l4,!a.Nd?j4:n,m4,d,n4,f,o4);
		if(!b)return E(g.toString ())
	};
	var p4='<table class="friend-content layout-table"><tr><td class="friend-content-column"><div class="iframe-container"></div></td><td class="friend-content-column profile-other-content"></td></tr></table>';
	function bT(a,b) {
		a=b||new D;
		a.a(p4);
		if(!b)return a.toString ()
	}
	var q4='You have been subscribed to items shared by {$name}, because {$name} is your friend. You can hide {$name} from your friends\' shared items list by clicking the "Hide" button below.{$break}{$break}You can always see all of your "hidden" friends on the  {$startSpan}settings page{$endSpan}.',r4='<span class="link friend-settings">',s4="Show {$name}",t4="Hide {$name}",u4='<div class="hide-friend-msg">',v4='<div class="friend-display-toggle">',w4="friend-show-element hidden";
	function LT(a,b) {
		var c=u(q4,{
			name:a.name,"break":Bf,startSpan:r4,endSpan:$
		}),d=u(s4,{
			name:a.name
		});
		a=u(t4,{
			name:a.name
		});
		var f=b||new D;
		f.a(u4,c,v4);
		Q1({
			ra:w4,content:d
		},f);
		Q1({
			ra:KT,content:a
		},f);
		f.a(V2);
		if(!b)return E(f.toString ())
	}
	var x4="Clear your shared items",y4="Move your shared items to the following tag:",z4="Select a tag...",A4="New Tag...",B4="{$startBold}You will not be able to undo this operation.{$endBold}",C4='<p><input type="radio" value="clear" name="moveorclear" id="unshare-clear-radio-button"> <label for="unshare-clear-radio-button">',D4='</label></p><p><input type="radio" value="move" name="moveorclear" id="unshare-move-radio-button"> <label for="unshare-move-radio-button">',E4='</label></p><select id="unshare-move-taglist" disabled="disabled"><option id="unshare-newtag-topitem">',
	F4="</option>",G4='<option value="',H4='<option id="unshare-move-newtag-option">',I4='</option></select><span id="unshare-newtag-name"></span><p>',J4="</p>";
	function O_(a,b) {
		var c=u(x4),d=u(y4),f=u(z4),g=u(A4),k=u(B4,{
			startBold:HF,endBold:IF
		}),l=b||new D;
		l.a(C4,c,D4,d,E4,f,F4);
		a=a.fH;
		c=a.length;
		for(d=0;d<c;d++) {
			f=a[d];
			l.a(G4,F(f.O()),Qi,F(f.ge()),F4)
		}l.a(H4,g,I4,k,J4);
		if(!b)return l.toString ()
	}var K4="Move or clear your shared items?";
	function N_(a,b) {
		a=u(K4);
		var c=b||new D;
		c.a(a);
		if(!b)return c.toString ()
	}var L4='Move shared to "{$labelName}".';
	function P_(a,b) {
		a=u(L4,{
			labelName:F(a.eH)
		});
		var c=b||new D;
		c.a(a);
		if(!b)return c.toString ()
	}var M4="Your shared items will be visible to your Google Friends. {$startLink}Learn More{$endLink}",N4="Start sharing",O4='<div id="friends-v2-new-user-promo" class="lhn-section">',P4='<br><b><input id="friends-new-user-promo-ok" class="friends-new-user-ok" type="button" value="',Q4='"></b></div>';
	function D0(a,b) {
		a=u(M4,{
			startLink:mo+F(a.kb)+Qi,endLink:no
		});
		var c=u(N4),d=b||new D;
		d.a(O4,a,P4,c,Q4);
		if(!b)return E(d.toString ())
	}var R4="View",S4='<div class="friends-tree-invite-info hidden"><span class="info"></span> <span class="link">';
	function w0(a,b) {
		a=u(R4);
		var c=b||new D;
		c.a(S4,a,j3);
		if(!b)return c.toString ()
	}var T4='<span class="friends-tree-item-action">';
	function z0(a,b) {
		a=u(F3);
		var c=b||new D;
		c.a(T4,a,$);
		if(!b)return c.toString ()
	}
	var U4="&laquo; Back to sharing settings",V4="{$xxx} wants to share with you.",W4='You can subscribe to {$xxx_001}\'s shared items in Reader by clicking "Allow" and you can also add {$xxx_002} to the list of people you would like to share your stuff with.',X4='<div class="interruption-header">',Y4='</div><div class="following-invite-msg">',Z4='<span class="link following-invite-back">';
	function RT(a,b) {
		var c=u(U4),d=b||new D,f=u(V4,{
			xxx:F(a.Xa.za)
		}),g=u(W4,{
			xxx_001:F(a.Xa.za),xxx_002:F(a.Xa.Cv)
		});
		d.a(X4,f,Y4,g,xY);
		k3({
			df:a.Xa,nb:a.nb
		},d);
		d.a(Z4,c,$);
		if(!b)return E(d.toString ())
	}var $4="Choose people to share with",a5="When you add people to your friends list, they will be able to see the stuff you share. {$startLink}Learn more{$endLink}",b5="<div id='friend-picker-title'><div class='heading'>",c5="</div><div class='instruction'>";
	function b0(a,b) {
		var c=u($4);
		a=u(a5,{
			startLink:mo+F(a.kb)+I2,endLink:no
		});
		var d=b||new D;
		d.a(b5,c,c5,a,V2);
		if(!b)return E(d.toString ())
	}
	var d5="To get started, select some friends from your chat contacts (you can always add more later).",e5="<div id='friend-picker-contents'><div class='preamble'><div class='instructions'>",f5="</div><div class='options'><span class='select'>",g5="</span> <span class='all-link link'>",h5="</span> | <span class='none-link link'>",i5="</span></div><div class='friends-list'>",j5="<div class='friend-container friend-container-selected'><div class='input-image'><input type='checkbox' checked='checked'></input><img src='",
	k5="' height='32' width='32' /></div><div class='name-email'><div class='name'>",l5="</div><div class='email'>",m5="{$startBold}Keep sharing with my Gmail Chat contacts. Do not create a separate friends list.{$endBold} (Anyone you can chat with in Gmail can automatically see your shared items)",n5="<div class='prologue'><div class='cb-container'><input type='checkbox' class='continue-v1-sharing' id='cb-continue-share'></input></div><div class='inst-container'><label for='cb-continue-share'>",o5="</label></div></div>";
	function c0(a,b) {
		var c=u(d5),d=u(s2),f=u(t2),g=u(u2),k=b||new D;
		k.a(e5,c,f5,d,g5,f,h5,g,i5);
		c=a.Ki;
		d=c.length;
		for(f=0;f<d;f++) {
			g=c[f];
			k.a(j5,F(g.Xe()),k5,F(g.za),l5,F(g.kh()),T2)
		}k.a(xY);
		if(a.rL) {
			a=u(m5,{
				startBold:HF,endBold:IF
			});
			k.a(n5,a,o5)
		}k.a(V2);
		if(!b)return E(k.toString ())
	}
	var p5="Customize your Friend List!",q5="Google Friends are the people you share your stuff with. You can now manage your friends list for easy sharing across Google products.",r5="Learn more",s5="Or {$startSpan}no thanks{$endSpan} (continue sharing with my chat contacts)",t5="<span class='link friends-no-thanks'>",u5="<div id='friends-v2intro-contents'><div id='friends-v2intro-heading'>",v5='</div><div id="friends-v2intro-info">',w5='</div><a href="',x5="</a><div id='friends-v2intro-options'><div id='friends-v2intro-continue'>",
	y5="</div><div id='friends-v2intro-nothanks'>";
	function k0(a,b) {
		var c=u(p5),d=u(q5),f=u(r5),g=u(PC),k=u(s5,{
			startSpan:t5,endSpan:$
		}),l=b||new D;
		l.a(u5,c,v5,d,w5,F(a.kb),I2,f,x5);
		Q1({
			id:h0,Bm:i,content:g
		},l);
		l.a(y5,k,T2);
		if(!b)return l.toString ()
	};
	var z5='"><table class="info-bubble"><tbody><tr><td class="arrow" rowspan="3"></td><td class="itl i"></td><td class="it i"></td><td class="itr i"></td></tr><tr><td class="ileft i"><table class=\'ileft-table\' cellpadding=\'0\' cellspacing=\'0\'><tbody class=\'ileft-table-body\'><tr><td class="il i">&nbsp;</td></tr><tr><td class="empty i">&nbsp;</td></tr><tr><td class="il i">&nbsp;</td></tr></tbody></table></td><td class="ic i">',A5='</td><td class="ir i"></td></tr><tr><td class="ibl i"></td><td class="ib i"></td><td class="ibr i"></td></tr></tbody></table></div>';
	function $C(a,b) {
		var c=b||new D;
		c.a(Yo,F(a.id),z5,a.content,A5);
		if(!b)return E(c.toString ())
	};
	var B5='<div id="lhn-',C5='" class="lhn-section ',D5='"><div id="lhn-',E5='-minimize" class="lhn-button lhn-minimize"></div><div id="lhn-',F5='-menubutton" class="lhn-button lhn-menubutton goog-menu-button"></div>';
	function Xw(a,b) {
		var c=b||new D;
		c.a(B5,F(a.Cg.id),C5,a.Cg.Bd?lx:n,o,!a.Cg.Kw?kx:n,D5,F(a.Cg.id),E5,F(a.Cg.id),F5);
		a.Cg.Sz(a,c);
		c.a(xY);
		if(!b)return c.toString ()
	}var G5='" class="selector"><a href="" class="link"><span class="text">',H5='<div class="selector-icon"></div>',I5="</a></div>";
	function J5(a,b) {
		var c=b||new D;
		c.a(Yo,F(a.id),G5,a.label,$,a.Sv?H5:n,I5);
		if(!b)return c.toString ()
	}var K5="All items{$startSpan}{$endSpan}",L5='<span id="reading-list-unread-count" class="unread-count">',M5="Browse for stuff",N5='<div class="lhn-section-secondary">',O5='</div><div class="lhn-section-primary">',P5='</div><div class="lhn-section-secondary">',Q5='<div id="your-items-tree-container" class="scroll-tree-container"><ul id="your-items-tree" class="scroll-tree"></ul></div>';
	function ox(a,b) {
		a=u(JH);
		var c=u(K5,{
			startSpan:L5,endSpan:$
		}),d=u(Md),f=u(nQ),g=u(M5),k=b||new D;
		k.a(N5);
		J5({
			id:KH,label:a
		},k);
		k.a(O5);
		J5({
			id:px,label:c
		},k);
		k.a(P5);
		J5({
			id:qx,label:d,Sv:i
		},k);
		k.a(Q5);
		J5({
			id:oQ,label:f,Sv:i
		},k);
		J5({
			id:dI,label:g
		},k);
		k.a(xY);
		if(!b)return k.toString ()
	}
	var R5="Sharing settings &raquo;",S5='<div id="friends-tree-container" class="selector scroll-tree-container"><ul id="friends-tree" class="scroll-tree"></ul><div class="lhn-section-footer"><span id="friends-settings-link"><a class="link" href="">',T5="</a></span></div></div>";
	function Gx(a,b) {
		a=u(R5);
		var c=b||new D;
		c.a(S5,a,T5);
		if(!b)return c.toString ()
	}var U5="Add a subscription",V5='<div id="lhn-add-subscription-section">',W5="scour-disabled",X5='<span class="subscribe-button">';
	function Px(a,b) {
		a=u(U5);
		var c=b||new D;
		c.a(V5);
		Q1({
			id:Qx,ra:W5,Bm:i,content:X5+a+$
		},c);
		c.a(xY);
		if(!b)return c.toString ()
	}var Y5="refreshing...",Z5="Manage subscriptions &raquo;",$5='<div class="lhn-section-primary"><span id="sub-tree-header" class="unselectable">Subscriptions</span><span id="sub-tree-refreshing" class="hidden">',a6='</span></div><div id="sub-tree-container" class="scroll-tree-container lhn-section-secondary"><ul id="sub-tree" class="scroll-tree"></ul></div><div class="lhn-section-footer"><a href="" id="sub-tree-subscriptions">';
	function Ux(a,b) {
		a=u(Y5);
		var c=u(Z5),d=b||new D;
		d.a($5,a,a6,c,I5);
		if(!b)return d.toString ()
	};
	var b6='<div class="tip-box tip-left ',c6='" id="',d6='"><div class="arr">&nbsp;</div><div class="c">';
	function e6(a,b) {
		var c=b||new D;
		c.a(b6,a.ra?a.ra:n,c6,a.id?a.id:n,d6);
		f6({
			content:a.content
		},c);
		c.a(V2);
		if(!b)return c.toString ()
	};
	var g6='<div class="interruption preview-interruption"><div class="interruption-header">',h6="These items are being shared in Google Reader.",i6="You are not subscribed to this recommended feed yet.",j6="You are not subscribed to this feed yet.",k6="</div><p>",l6="Subscribe in Reader to keep up with newly shared items.",m6="If you'd like to automatically receive updates to this feed, you can subscribe now.",n6='<span class="subscribe-button"> ',o6="Subscribe",p6="Sign in to subscribe",q6="&laquo; Back to my recommended feeds",
	r6='<div class="link preview-interruption-back">';
	function xU(a,b) {
		var c=b||new D;
		c.a(g6);
		if(a.hm) {
			var d=u(h6);
			c.a(d)
		}else if(a.Jw) {
			d=u(i6);
			c.a(d)
		}else {
			d=u(j6);
			c.a(d)
		}c.a(k6);
		if(a.hm) {
			d=u(l6);
			c.a(d)
		}else {
			d=u(m6);
			c.a(d)
		}c.a(J4);
		d=new D(n6);
		if(a.HG) {
			var f=u(o6);
			d.a(f)
		}else {
			f=u(p6);
			d.a(f)
		}d.a($);
		Q1({
			ra:wU,content:d
		},c);
		if(a.Jw) {
			a=u(q6);
			c.a(r6,a,xY)
		}c.a(xY);
		if(!b)return E(c.toString ())
	};
	var s6='<div><div class="progress-bar-header">',t6='</div><div class="progress-bar"><div class="progress-bar-thumb"></div><div class="progress-bar-inner"></div></div><div class="progress-bar-label">';
	function lL(a,b) {
		var c=b||new D;
		c.a(s6,F(a.GF),t6,F(a.label),V2);
		if(!b)return E(c.toString ())
	};
	var u6='<table cellpadding="0" cellspacing="0" border="0" class="round-box ',v6='"><tr><td class="s tl',w6=" sq",x6='"><td class="s"></td><td class="s tr',y6='"></tr><tr><td class="s"></td><td class="c">',z6='</td><td class="s"></td></tr><tr><td class="s bl',A6='"><td class="s"></td><td class="s br',B6='"></tr></table>';
	function f6(a,b) {
		var c=b||new D;
		c.a(u6,a.ra?a.ra:n,c6,a.id?a.id:n,v6,a.pN?w6:n,x6,a.qN?w6:n,y6,a.content,z6,a.nN?w6:n,A6,a.oN?w6:n,B6);
		if(!b)return c.toString ()
	};
	var C6="The action you attempted can't be performed while {$startBold}offline{$endBold}. ",D6='<div id="scour-disabled-element-error"><p>',E6="</p></div>";
	function TO(a,b) {
		var c=u(C6,{
			startBold:HF,endBold:IF
		}),d=b||new D;
		d.a(D6,c,a.QE,E6);
		if(!b)return d.toString ()
	}var F6="If your computer is connected to the Internet, you can switch back to {$startBold}online{$endBold} mode then perform this action.";
	function UO(a,b) {
		a=u(F6,{
			startBold:HF,endBold:IF
		});
		var c=b||new D;
		c.a(a);
		if(!b)return c.toString ()
	}var G6='{$startParagraph}You currently have no subscriptions in Google Reader. You cannot use offline mode until you have some subscriptions to read.{$endParagraph}{$startParagraph}To subscribe to feeds you can use the green "Add Subscription" link on the left.{$endParagraph}',H6="<p>",I6='<div id="scour-nosubs-error">';
	function cP(a,b) {
		a=u(G6,{
			startParagraph:H6,endParagraph:J4
		});
		var c=b||new D;
		c.a(I6,a,xY);
		if(!b)return c.toString ()
	}var J6="{$startParagraph}You currently have no items downloaded for {$startBold}offline mode{$endBold} in Google Reader. You will need to synchronize before going offline.{$endParagraph}{$startParagraph}To synchronize you can use the icon near your email address at the top of the page.{$endParagraph}",K6='<div id="scour-nosyncitems-error">';
	function fP(a,b) {
		a=u(J6,{
			startParagraph:H6,startBold:HF,endBold:IF,endParagraph:J4
		});
		var c=b||new D;
		c.a(K6,a,xY);
		if(!b)return c.toString ()
	}var L6="A connection to the internet could not be made. ",M6='<div id="scour-not-connected-prompt"><p>';
	function aP(a,b) {
		var c=u(L6),d=b||new D;
		d.a(M6,c,a.VA,E6);
		if(!b)return d.toString ()
	};
	var N6="To use Google Reader in {$startBold}offline mode{$endBold}, click the icon above.",O6="Dismiss this message",P6='<div class="scour-help">',Q6='<br><br><span class="link scour-help-dismiss">';
	function AP(a,b) {
		a=u(N6,{
			startBold:HF,endBold:IF
		});
		var c=u(O6),d=b||new D;
		d.a(P6,a,Q6,c,j3);
		if(!b)return E(d.toString ())
	}
	var R6="You are now in {$startBold}offline mode{$endBold} and can disconnect from the Internet.",S6="To return Google Reader to {$startEmphasis}online mode{$endEmphasis}, click the icon above.",T6="<em>",U6="</em>";
	function zP(a,b) {
		a=u(R6,{
			startBold:HF,endBold:IF
		});
		var c=u(S6,{
			startEmphasis:T6,endEmphasis:U6
		}),d=u(O6),f=b||new D;
		f.a(P6,a,c4,c,Q6,d,j3);
		if(!b)return E(f.toString ())
	}var V6="An update for the Google Reader offline feature is available.",W6="Refresh.",X6=' <span class="link" id="offline-update-refresh">';
	function GL(a,b) {
		a=u(V6);
		var c=u(W6),d=b||new D;
		d.a(a,X6,c,$);
		if(!b)return d.toString ()
	};
	var Y6='<table cellpadding="0" cellspacing="0" border="0" class="round-box" id="scour-menu-container"><tr><td class="s tl"></td><td class="s"></td><td class="s tr"></td></tr><tr><td class="s"></td><td class="c" id="scour-menu-contents"></td><td class="s"></td></tr><tr><td class="s bl"></td><td class="s"></td><td class="s br"></td></tr></table>';
	function XM(a,b) {
		a=b||new D;
		a.a(Y6);
		if(!b)return E(a.toString ())
	}var Z6='<table cellpadding="0" cellspacing="0" border="0" class="round-box" id="scour-menu-container-shadow"><tr><td class="s tl"></td><td class="s"></td><td class="s tr"></td></tr><tr><td class="s"></td><td class="c"></td><td class="s"></td></tr><tr><td class="s bl"></td><td class="s"></td><td class="s br"></td></tr></table>';
	function YM(a,b) {
		a=b||new D;
		a.a(Z6);
		if(!b)return E(a.toString ())
	};
	function dR(a,b) {
		a=b||new D;
		$6(h,a);
		a7(h,a);
		if(!b)return a.toString ()
	}var b7="Show: {$startSpan_1}{$startSpan_2}Search{$endSpan} - {$endSpan}{$startSpan_3}Expanded{$endSpan} - {$startSpan_4}List{$endSpan}",c7='<span id="view-search-container">',d7='<span class="unselectable link" id="view-search">',e7='<span class="unselectable link" id="view-cards">',f7='<span class="unselectable link" id="view-list">',g7="Navigation",h7='<div id="chrome-header"><span id="chrome-view-links">',i7='<span id="chrome-title">&nbsp;</span></div>';
	function $6(a,b) {
		a=u(b7,{
			startSpan_1:c7,startSpan_2:d7,endSpan:$,startSpan_3:e7,startSpan_4:f7
		});
		var c=u(g7),d=b||new D;
		d.a(h7,a,$);
		Q1({
			id:Zw,dm:i,ra:Q,content:c
		},d);
		d.a(i7);
		if(!b)return d.toString ()
	}var j7='<table id="chrome-viewer-container"><tr><td id="chrome-lhn-toggle"><div id="chrome-lhn-toggle-icon"></div></td><td id="chrome-viewer" class="invisible">',k7='<div id="viewer-container">',l7='<div id="viewer-page-container"></div></div>',m7="</td></tr></table>";
	function a7(a,b) {
		a=b||new D;
		a.a(j7);
		n7(h,a);
		a.a(k7);
		o7(h,a);
		a.a(l7);
		p7(h,a);
		a.a(m7);
		if(!b)return a.toString ()
	}
	var q7="Show: {$startSpan_1}{$endSpan} - {$startSpan_2}all items{$endSpan}",r7='<span class="unselectable link" id="show-new">',s7='<span class="unselectable link" id="show-all">',t7="Translated by Google - {$startSpan}View Original{$endSpan}",u7='<span class="link" id="viewer-translate-revert-link">',v7="Sort by newest",w7="Sort by oldest",x7="Sort by auto",y7="Set as start page",z7="Unsubscribe",A7="Rename subscription...",B7="Translate into my language",C7='You have subscribed to "{$startSpan}{$endSpan}."',
	D7='<span id="quick-add-success-title">',E7='<div id="viewer-header"><div id="viewer-top-controls"><div id="viewer-all-new-links">',F7="scour-disabled viewer-buttons",G7='<span id="viewer-translated-by" class="hidden">',H7='</span><span id="viewer-search-parent"></span><span id="viewer-search-item-parent"></span><div id="viewer-details-toggle" class="unselectable link"></div></div><ul id="stream-prefs-menu-contents" class="hidden"><li id="order-by-newest" class="reading-list-menu-item folder-menu-item single-feed-menu-item friend-stream-menu-item menu-item"><span class="menu-item-label">',
	I7='</span></li><li id="order-by-oldest" class="reading-list-menu-item folder-menu-item single-feed-menu-item friend-stream-menu-item menu-item"><span class="menu-item-label">',J7='</span></li><li id="order-by-magic" class="reading-list-menu-item folder-menu-item menu-item"><span class="menu-item-label">',K7='</span></li><li id="set-as-start" class="reading-list-menu-item divider menu-item"><span class="menu-item-label">',L7='</span></li><li id="stream-unsubscribe" class="single-feed-menu-item divider menu-item"><span class="menu-item-label">',
	M7='</span></li><li id="stream-rename" class="single-feed-menu-item menu-item"><span class="menu-item-label">',N7='</span></li><li id="stream-translate" class="reading-list-menu-item folder-menu-item single-feed-menu-item friend-stream-menu-item divider menu-item"><span class="menu-item-label">',O7='</span></li><li id="stream-folder-chooser" class="single-feed-menu-item friend-stream-menu-item divider menu-item"><span class="goog-button-body"></span><ul></ul></li></ul><div id="quick-add-success" class="hidden">',
	P7='</div><div id="viewer-details-placeholder"></div></div>';
	function n7(a,b) {
		a=u(q7,{
			startSpan_1:r7,endSpan:$,startSpan_2:s7
		});
		var c=u(tW),d=u(by),f=u(aW),g=u(t7,{
			startSpan:u7,endSpan:$
		}),k=u(v7),l=u(w7),p=u(x7),s=u(y7),A=u(z7),I=u(A7),L=u(B7),K=u(C7,{
			startSpan:D7,endSpan:$
		}),G=b||new D;
		G.a(E7,a,xY);
		Q1({
			id:IV,Ih:i,ra:F7,content:c
		},G);
		Q1({
			id:OV,Ih:i,ra:Nc,content:d
		},G);
		Q1({
			id:zV,Ih:i,dm:i,ra:W5,content:f
		},G);
		G.a(G7,g,H7,k,I7,l,J7,p,K7,s,L7,A,M7,I,N7,L,O7,K,P7);
		if(!b)return G.toString ()
	}
	var Q7="No more items.",R7="Go: {$startLink_1}Home{$endLink} - {$startLink_2}All items{$endLink}",S7='<a href="?page=overview" id="scroll-filler-overview-link">',T7='<a href="" id="scroll-filler-all-items-link">',U7="Not finding what you are looking for?{$startLink}Try your search on Google Blog Search.{$endLink}",V7='<a href="" id="scroll-filler-search-link" target="_blank">',W7='<div id="entries"><div id="scroll-filler">',X7="No more items in {$startStrong}Offline{$endStrong} mode.",Y7="<strong>",
	Z7="</strong>",$7="{$startSpan}Go online{$endSpan} to check for new items.",a8='<span class="link" id="scroll-filler-offline-link">',b8='<div id="scroll-filler-offline-message" class="scroll-filler-message"><p>',c8='<div id="scroll-filler-message" class="scroll-filler-message"><p>',d8='</p></div><div id="search-item-bottom-links"></div></div><div id="scroll-filler-search-message" class="scroll-filler-message"><p>',e8="</p></div></div>";
	function o7(a,b) {
		a=u(Q7);
		var c=u(R7,{
			startLink_1:S7,endLink:no,startLink_2:T7
		}),d=u(U7,{
			startLink:V7,endLink:no
		}),f=b||new D;
		f.a(W7);
		var g=u(X7,{
			startStrong:Y7,endStrong:Z7
		}),k=u($7,{
			startSpan:a8,endSpan:$
		});
		f.a(b8,g,k,E6);
		f.a(c8,a,O1,c,d8,d,e8);
		if(!b)return f.toString ()
	}var f8="Previous item",g8="Next item",h8='<div id="viewer-footer">',i8='<div class="arrow"></div><div class="text">',j8='<div class="text">',k8='</div><div class="arrow"></div>',l8='<div id="entries-status"></div></div>';
	function p7(a,b) {
		a=u(f8);
		var c=u(g8),d=b||new D;
		d.a(h8);
		Q1({
			id:GV,Ih:i,content:i8+a+xY
		},d);
		Q1({
			id:HV,Ih:i,content:j8+c+k8
		},d);
		d.a(l8);
		if(!b)return d.toString ()
	};
	var m8='<div class="card card-common"><div class="card-content"></div>',n8='<div class="card-actions card-bottom"></div></div>';
	function aX(a,b) {
		a=b||new D;
		a.a(m8,n,n8);
		if(!b)return E(a.toString ())
	}var o8='<div class="ccard-container card-common"><div class="rt t1"></div><div class="rt t2"></div><div class="rt t3"></div><div class="ccard"><div class="card-content"></div>',p8='<div class="card-actions card-bottom"></div></div><div class="rb b1"></div><div class="rb b2"></div><div class="rb b3"></div></div>';
	function bX(a,b) {
		a=b||new D;
		a.a(o8,n,p8);
		if(!b)return E(a.toString ())
	}var q8='<div class="entry-icons"><div class="link empty cornerstar"></div></div>';
	function cX(a,b) {
		a=b||new D;
		a.a(q8);
		if(!b)return E(a.toString ())
	}
	var r8='<div class="collapsed"><div class="entry-icons"><div class="link empty list-star"></div></div><div class="entry-date">',s8='</div><div class="entry-main">',t8='<a class="entry-original" target="_blank" href="',u8='"></a>',v8='<span class="entry-source-title link">',w8='</span><div class="entry-secondary"><h2 class="entry-title">',x8='</h2><span class="entry-secondary-snippet">',y8='<span class="snippet">',z8="</span></span></div></div></div>";
	function vX(a,b) {
		var c=b||new D;
		c.a(r8,a.$k,s8,a.bd?t8+a.bd+u8:n,v8);
		a.friends.length>0?A8({
			friends:a.friends
		},c):c.a(a.di);
		c.a(w8,a.pd,x8,a.snippet&&a.pd?qt:n,y8,a.snippet,z8);
		if(!b)return c.toString ()
	}var B8='<img align="absmiddle" src="',C8='" class="entry-via-friend-image" alt="" title="',D8="Shared by {$length} friends",E8="{$length} friends";
	function A8(a,b) {
		var c=b||new D,d=a.friends,f=d.length;
		for(var g=0;g<f;g++) {
			var k=d[g];
			c.a(B8,F(k.Xe()),C8,F(k.Sa()),Qi)
		}if(a.friends.length==1)c.a(F(a.friends[0].za));
		else if(a.friends.length<3) {
			a=u(D8,{
				length:F(a.friends.length)
			});
			c.a(T6,a,U6)
		}else {
			a=u(E8,{
				length:F(a.friends.length)
			});
			c.a(T6,a,U6)
		}if(!b)return E(c.toString ())
	}var F8='<div class="action-area ';
	function eX(a,b) {
		var c=b||new D;
		c.a(F8,a.hu?F(a.hu):n,Qi,a.qt,xY);
		if(!b)return E(c.toString ())
	}
	var G8="{$startBold}Note to go along with the item:{$endBold} (Optional, no more than 1,000 characters)",H8="Send",I8='<div class="email-this-area"><table class="email-entry-table"><tbody><tr><td class="field-name">',J8='&gt;</td></tr><tr><td class="field-name">',K8='</td><td><input type="text" class="email-this-to"><div class="form-error-message email-this-to-error hidden"></div></td></tr><tr><td class="field-name">',L8='</td><td><input type="text" class="email-this-subject"><div class="form-error-message email-this-subject-error hidden"></div></td></tr><tr><td colspan="2">',
	M8='<br><div class="form-error-message email-this-comment-error hidden"></div><textarea class="email-this-comment" rows="6"></textarea><div><label><input type="checkbox" name="ccMe" class="email-this-ccme" value="true">',N8="</label></div><div class=\"email-this-buttons\" tabindex='-1'>",O8="</div></td></tr></tbody></table></div>";
	function GU(a,b) {
		var c=u(Z1),d=u($1),f=u(a2),g=u(G8,{
			startBold:HF,endBold:IF
		}),k=u(o2),l=u(H8),p=u(LC),s=b||new D;
		s.a(I8,c,d2,F(a.userName),e2,F(a.userEmail),J8,d,K8,f,L8,g,M8,k,N8);
		Q1({
			ra:FU,content:l
		},s);
		Q1({
			ra:EU,content:p
		},s);
		s.a(O8);
		if(!b)return s.toString ()
	}
	var P8='<div class="entry-container"><div class="entry-main"><div class="entry-date">',Q8='</div><h2 class="entry-title">',R8='<a class="entry-title-link" target="_blank" href="',S8='<div class="entry-title-go-to"></div>',T8='</h2><div class="entry-author"><span class="entry-source-title-parent">',U8="from {$startLink}{$sourceTitle}{$endLink} in Google Reader",V8='<a class="entry-source-title" target="_blank">',W8="from {$startSpan}{$sourceTitle}{$endSpan} in Google Reader",X8='<span class="entry-source-title">',
	Y8="from {$startLink}{$sourceTitle}{$endLink}",Z8="</span> ",$8='</div><div class="entry-annotations"></div><div class="entry-body"></div></div></div>';
	function KW(a,b) {
		var c=b||new D;
		c.a(P8,a.$k,Q8,a.bd?R8+a.bd+Qi+(a.pd?a.pd+S8:n)+no:a.pd?a.pd:n,T8);
		if(a.yz)if(a.zz) {
			var d=u(U8,{
				startLink:V8,sourceTitle:a.di,endLink:no
			});
			c.a(d)
		}else {
			d=u(W8,{
				startSpan:X8,sourceTitle:a.di,endSpan:$
			});
			c.a(d)
		}else {
			d=u(Y8,{
				startLink:V8,sourceTitle:a.di,endLink:no
			});
			c.a(d)
		}c.a(Z8);
		a.Cc?a9({
			tc:a.tc,eo:a.eo,Qd:a.Qd
		},c):b9({
			tc:a.tc,Qd:a.Qd
		},c);
		c.a($8);
		if(!b)return E(c.toString ())
	}
	var c9="From {$startLink}{$authorName}{$endLink} in Google Reader",d9='<a target="_blank" name="',e9='" class="entry-post-author-name friend-link link">',f9='<div class="entry-source-post-author">';
	function a9(a,b) {
		var c=u(c9,{
			startLink:d9+a.eo+e9,authorName:a.tc,endLink:no
		}),d=b||new D;
		g9({
			Qd:a.Qd
		},d);
		d.a(f9,c,xY);
		if(!b)return E(d.toString ())
	}var h9="by {$startSpan}{$authorName}{$endSpan}",i9='<span class="entry-author-name">';
	function b9(a,b) {
		var c=b||new D;
		if(a.tc) {
			var d=u(h9,{
				startSpan:i9,authorName:a.tc,endSpan:$
			});
			c.a(d)
		}g9({
			Qd:a.Qd
		},c);
		if(!b)return E(c.toString ())
	}var j9='<div class="entry-via">',k9="via {$startLink}{$title}{$endLink}",l9='<a class="entry-via-link link" target="_blank" href="';
	function g9(a,b) {
		var c=b||new D;
		a=a.Qd;
		var d=a.length;
		for(var f=0;f<d;f++) {
			var g=a[f];
			c.a(j9);
			if(g.h.Eb())m9({
				Xa:g.h.oa
			},c);
			else {
				g=u(k9,{
					startLink:l9+g.h.Oi()+Qi,title:g.q,endLink:no
				});
				c.a(g)
			}c.a(xY)
		}if(!b)return E(c.toString ())
	}var n9="Shared by {$startLink}{$xxx}{$endLink}",o9='<a name="',p9='" class="entry-via-link link friend-link" target="_blank" href="',q9='" class="entry-via-friend-image" alt="">';
	function m9(a,b) {
		var c=b||new D,d=u(n9,{
			startLink:o9+a.Xa.cg()+p9+a.Xa.f().Oi()+Qi,xxx:a.Xa.Sa(),endLink:no
		});
		c.a(B8,a.Xa.Xe(),q9,d);
		if(!b)return E(c.toString ())
	}
	var r9='<div class="entry-annotation"><table cellpadding="0" cellspacing="0"><tr><td valign="top" class="entry-annotation-author-container"><span class="entry-annotation-author"></span></td><td valign="top" class="entry-annotation-box-container">',s9="entry-annotation-box",t9='<div class="entry-annotation-body">&#8220;',u9="&#8221;</div>",v9="</td></tr></table></div>";
	function zA(a,b) {
		var c=b||new D;
		c.a(r9);
		e6({
			ra:s9,content:t9+a.yB.content+u9
		},c);
		c.a(v9);
		if(!b)return E(c.toString ())
	}
	var w9="Shared by {$startSpan}{$authorName}{$endSpan}:",x9='<span class="entry-annotation-author-name">';
	function BA(a,b) {
		a=u(w9,{
			startSpan:x9,authorName:F(a.tc),endSpan:$
		});
		var c=b||new D;
		c.a(a);
		if(!b)return E(c.toString ())
	}var y9='" class="entry-annotation-profile-image" alt="">',z9="Shared by {$startLink}{$authorName}{$endLink}:",A9='" class="entry-annotation-author-link friend-link" target="_blank" href="">',B9="Noted by {$startLink}{$authorName}{$endLink}:";
	function AA(a,b) {
		var c=b||new D;
		c.a(B8,a.by,y9);
		if(a.hm) {
			a=u(z9,{
				startLink:o9+a.userId+A9,authorName:a.tc,endLink:no
			});
			c.a(a)
		}else {
			a=u(B9,{
				startLink:o9+a.userId+A9,authorName:a.tc,endLink:no
			});
			c.a(a)
		}if(!b)return E(c.toString ())
	}var C9="Published:",D9='<table><tr><td class="label">',E9='</td></tr><tr><td class="label">';
	function TW(a,b) {
		var c=u(C9),d=b||new D;
		d.a(D9,F(a.eJ),h2,F(a.dJ),E9,c,h2,F(a.$I),m7);
		if(!b)return d.toString ()
	}
	var F9='<div class="search-result"><div class="entry-icons"><div class="empty star"></div></div><div class="entry-main">',G9='<div class="entry-secondary"><h2 class="entry-title"><a class="entry-title-link" target="_blank" href="',H9='</a></h2><div class="entry-secondary-snippet"><span class="snippet">',I9='</span></div></div><div class="entry-attribution"><span class="entry-source-title"><a class="entry-source-title-link" target="_blank">',J9='</a></span>&nbsp;-&nbsp;<span class="entry-date">';
	function hX(a,b) {
		var c=b||new D;
		c.a(F9,a.bd?t8+a.bd+u8:n,G9,a.bd,Qi,a.pd,H9,a.snippet,I9,a.di,J9,a.$k,H3);
		if(!b)return E(c.toString ())
	}var K9="Separate tags by commas",L9='<div class="tags-edit"><input type="text" class="tags-edit-tags" autocomplete="off"><div class="help">',M9='</div><div class="tags-edit-buttons">';
	function hV(a,b) {
		a=u(K9);
		var c=u(OC),d=u(LC),f=b||new D;
		f.a(L9,a,M9);
		Q1({
			ra:fV,content:c
		},f);
		Q1({
			ra:gV,content:d
		},f);
		f.a(V2);
		if(!b)return E(f.toString ())
	}
	var N9='<li><a href="">',O9="</a></li>";
	function eV(a,b) {
		var c=b||new D;
		c.a(N9,F(a.tagName),O9);
		if(!b)return E(c.toString ())
	};
	var P9='<li class="',Q9=" expanded",R9=" collapsed",S9=" unread",T9='"><div class="',U9=" hidden",V9='"></div><a class="link" href="',W9='"><img class="',X9='" width="16" height="16" src="',Y9='" alt=""><span class="',Z9=" name-unread",$9='" title="',a$='"><span class="',b$='</span><span class="',c$="</span></span>",d$='<span class="',e$="<ul>",f$="</ul>";
	function tS(a,b) {
		var c=b||new D;
		c.a(P9,F(a.className),ur,a.Zl?Q9:R9,a.Nw?S9:n,c6,F(a.lM),T9,F(a.aM),a.eM?U9:n,V9,F(a.OL),c6,F(a.kM),W9,F(a.QF),X9,F(a.RF),c6,F(a.jM),Y9,F(a.YH),a.Nw?Z9:n,c6,F(a.mM),$9,F(a.cH),F(a.hA),a$,F(a.ZH),Qi,F(a.displayName),b$,F(a.tM),c6,F(a.oM),Qi,F(a.hA),c$,a.Oz?d$+F(a.VL)+c6+F(a.nM)+Qi+F(a.Oz)+$:n,a.Rw?a.Rw:n,no,a.Sw?a.Sw:n);
		if(a.ht.length>0) {
			c.a(e$);
			var d=a.ht,f=d.length;
			for(var g=0;g<f;g++)d[g].Ps(a.PB,c);c.a(f$)
		}c.a(DY);if(!b)return c.toString ()
	};var g$='What\'s in "Your Stuff"?',h$="There are several ways to create and share stuff using Reader. You can:",i$="{$startBold}Share{$endBold} items you have read, {$startBold}share anything{$endBold} from around the web by using the {$linkBookmarklet} bookmarklet or just {$startBold}share your thoughts{$endBold} using the Notes feature.",j$='<div class="interrupt-your-stuff"><b>',k$="</b> ";
	function hU(a,b) {
		var c=u(g$),d=u(h$),f=u(i$,{
			startBold:HF,endBold:IF,linkBookmarklet:a.jH
		}),g=b||new D;
		g.a(j$,c,k$,d,H6,f,O1);
		l$(a,g);
		g.a(E6);
		if(!b)return E(g.toString ())
	}
	var m$="Share anything from around the web",n$='<div class="interruption friend-interruption"><table class="notes-container layout-table"><tr><td class="bookmarklet-container"><div class="interruption-header">',o$='</div><div class="description">',p$='</div><div class="bookmarklet">',q$='<div class="drag">',r$='</div></div></td><td class="or-container">-',s$='-</td><td class="form-container">';
	function VT(a,b) {
		var c=u(m$),d=u(qC),f=u(m3),g=b||new D;
		g.a(n$,c,o$,F(a.kH),p$);
		gU({
			pm:a.pm
		},g);
		g.a(q$,d,r$,f,s$);
		l$(a,g);
		g.a(v9);
		if(!b)return E(g.toString ())
	}
	var t$="Choose a style for your shared items page.",u$="See your shared items page in a new window.",v$="Your shared items are available publicly {$startLink}at this web page{$endLink}. You can choose people to share with in {$startBold}Sharing settings{$endBold}.",w$='<a href="" target="_blank" class="link broadcast-page-link">',x$="Other things you can do with your shared items:",y$="{$startSpan}Email{$endSpan} the link to your friends.",z$='<span class="link broadcast-email-link">',A$="{$startSpan}Add a clip{$endSpan} to your web site or blog.",
	B$='<span class="link broadcast-clip-link">',C$='<div class="interruption friend-interruption"><table class="friend-content layout-table"><tr><td class="friend-content-column"><div class="style-chooser">',D$='<div class="style-choices"></div><div class="style-link"><a target="_blank" href="" class="style-broadcast-page-link link">',E$='</a></div></div></td><td class="friend-content-column">',F$="</p></td></tr></table></div>";
	function qT(a,b) {
		a=u(t$);
		var c=u(u$),d=u(v$,{
			startLink:w$,endLink:no,startBold:HF,endBold:IF
		}),f=u(x$),g=u(y$,{
			startSpan:z$,endSpan:$
		}),k=u(A$,{
			startSpan:B$,endSpan:$
		}),l=b||new D;
		l.a(C$,a,D$,c,E$,d,H6,f,O1,g,O1,k,F$);
		if(!b)return E(l.toString ())
	}
	var G$="You haven't shared any items yet.",H$="Sharing interesting items with your friends is easy: simply click on the sharing icon.",I$="The item will then instantly appear on your {$startLink_1}public page shared page{$endLink}. You can choose people to share with in {$startBold}Sharing settings{$endBold}. {$startLink_2}Learn more about sharing.{$endLink}",J$='<div class="interruption"><div class="interruption-header">',K$='</p><img src="',L$="/reader/ui/2950437805-share-icon-en.gif?hl=en",M$=
	'" alt=""/><p>';
	function yT(a,b) {
		var c=u(G$),d=u(H$);
		a=u(I$,{
			startLink_1:mo+F(a.kL)+I2,endLink:no,startBold:HF,endBold:IF,startLink_2:mo+F(a.kb)+I2
		});
		var f=b||new D;
		f.a(J$,c,k6,d,K$,F(L$),M$,a,E6);
		if(!b)return E(f.toString ())
	}
	var N$="Have some thoughts to share?",O$="Add tags:",P$="separate tags with commas",Q$="Add to shared items",R$="Show Options",S$="Hide Options",T$="Post note",U$='<div class="posting-form"><div class="title-container"><input type="text" class="text" value="',V$='"/><br/></div><textarea class="textarea">',W$='</textarea><table class="posting-form-layout"><tr><td><div class="tag-container"><table><tr><td class="add-tags">',X$='</td><td><input class="tags" type="text" size="30"> <br/><span class="tag-instructions">',
	Y$='</span></td></tr></table></div><label><input class="add-to-shared-items" type="checkbox" checked="checked" />',aaa='</label> - <span class="show-opts link">',baa='</span><span class="hide-opts link">',caa='</span></td><td class="posting-form-button-cell">';
	function l$(a,b) {
		var c=u(N$),d=u(O$),f=u(P$),g=u(Q$),k=u(R$),l=u(S$),p=u(T$),s=b||new D;
		s.a(U$,F(a.gw),V$,c,W$,d,X$,f,Y$,g,aaa,k,baa,l,caa);
		Q1({
			ra:cU,Bm:i,content:p
		},s);
		s.a(v9);
		if(!b)return E(s.toString ())
	}
	var daa="Sort by oldest only shows items from the last 30 days.{$startLink}Learn more{$endLink}{$startSpan}Dismiss{$endSpan}",eaa='<a target="_blank" class="learn-more-link" href="',Z$='<span class="dismiss-link link">';
	function AT(a,b) {
		a=u(daa,{
			startLink:eaa+F(a.kb)+Qi,endLink:no,startSpan:Z$,endSpan:$
		});
		var c=b||new D;
		c.a(J1,a,xY);
		if(!b)return E(c.toString ())
	}
	var faa='As you view items in your reading list, they will be automatically marked as read as you scroll down (when in the "Expanded" view).',gaa="If you'd prefer to disable this feature, you can turn it off in{$startLink}Settings{$endLink}.",haa='<a href="" class="settings-link">',iaa="Dismiss";
	function fT(a,b) {
		a=u(faa);
		var c=u(gaa,{
			startLink:haa,endLink:no
		}),d=u(iaa),f=b||new D;
		f.a(J1,a,o,c,Z$,d,j3);
		if(!b)return E(f.toString ())
	};
	var jaa="Results: {$startBold}{$totalResults}{$endBold} for {$startBold}{$query}{$endBold}.",kaa="<span>",laa=" (<b>",maa="</b> seconds)";
	function RV(a,b) {
		var c=u(jaa,{
			startBold:HF,totalResults:F(a.bA),endBold:IF,query:F(a.query)
		}),d=b||new D;
		d.a(kaa,c,a.Io?laa+F(a.Io)+maa:n,$);
		if(!b)return d.toString ()
	}var naa="Search for {$startEmphasis}{$query}{$endEmphasis}",oaa='<span class="search-stream-title">';
	function lZ(a,b) {
		a=u(naa,{
			startEmphasis:T6,query:F(a.query),endEmphasis:U6
		});
		var c=b||new D;
		c.a(oaa,a,$);
		if(!b)return c.toString ()
	}var paa="&laquo; Back to search results",$$='<span class="link search-return-link">';
	function oX(a,b) {
		a=u(paa);
		var c=b||new D;
		c.a($$,a,$);
		if(!b)return c.toString ()
	}
	var qaa='View more items from "{$searchSourceTitle}"',raa="Or go {$startSpan}back to your search results{$endSpan} page",saa='<div class="search-item-bottom-links"><p><a href="" class="search-source-link">',taa="</a></p><p>";
	function pX(a,b) {
		a=u(qaa,{
			searchSourceTitle:F(a.RJ)
		});
		var c=u(raa,{
			startSpan:$$,endSpan:$
		}),d=b||new D;
		d.a(saa,a,taa,c,E6);
		if(!b)return d.toString ()
	}var uaa='<div id="search-restrict-button">',vaa='<div class="search-restrict-contents"><input id="',waa='" label="',xaa='" autocomplete="off"></div>';
	function WP(a,b) {
		var c=b||new D;
		c.a(uaa);
		Q1({
			Ih:i,dm:i,content:vaa+F(a.tG)+waa+F(a.uG)+xaa
		},c);
		c.a(xY);
		if(!b)return E(c.toString ())
	};
	var yaa='<div class="viewer-details-stats">',zaa="0.0",Aaa="Posts per week:",Baa="<span class='posts-label'>",Caa="</span><span class='posts-value'>",Daa="Subscribers:",Eaa="<span class='subscribers-label'>",Faa="</span><span class='subscribers-value'>",Gaa="Last updated:",Haa="<span class='last-updated-label'>",Iaa="</span><span class='last-updated-value'>",Jaa="Learn more.",Kaa="A parsing error was encountered.",Laa="A fetching error was encountered.",Maa='  <a href="';
	function vU(a,b) {
		var c=b||new D;
		c.a(yaa);
		if(a.velocity!=zaa) {
			var d=u(Aaa);
			c.a(Baa,d,Caa,F(a.velocity),$)
		}if(a.subscribers!=sU) {
			d=u(Daa);
			c.a(Eaa,d,Faa,F(a.subscribers),$)
		}if(a.Nz!=-1||a.iu!=-1) {
			d=u(Gaa);
			c.a(Haa,d,Iaa);
			if(a.Nz>a.iu)c.a(F(a.UL));
			else {
				d=u(Jaa);
				c.a(F(a.iD),o);
				if(a.lastFailureWasParseFailure) {
					var f=u(Kaa);
					c.a(f)
				}else {
					f=u(Laa);
					c.a(f)
				}c.a(Maa,F(a.kb),I2,d,no)
			}c.a($)
		}c.a(xY);
		if(!b)return E(c.toString ())
	}
	var Naa='<div class="style-choice"><div class="style-choice-image ',Oaa='"></div><input type="radio" ',Paa=' name="style-choice-radio" class="style-choice-radio" value="',Qaa='"><div class="style-choice-name">';
	function tT(a,b) {
		var c=b||new D;
		c.a(Naa,F(a.Ft),Oaa,a.checked?j4:n,Paa,F(a.Ft),Qaa,F(a.DC),V2);
		if(!b)return E(c.toString ())
	}var Raa="Note in Reader",Saa='<a class="bookmarklet-link unselectable" href="';
	function gU(a,b) {
		var c=u(Raa),d=b||new D;
		d.a(Saa,F(a.pm),Qi,c,no);
		if(!b)return d.toString ()
	}var Taa="<div class='error-page'><div>";
	function tH(a,b) {
		a=u(Hq);
		var c=b||new D;
		c.a(Taa,a,V2);
		if(!b)return E(c.toString ())
	}var Uaa="Don't ask me again",Vaa="<div>",Waa="Are you sure you want to mark {$startBold}more than {$count} items{$endBold} from {$title} as read?",Xaa="Are you sure you want to mark {$startBold}{$count} items{$endBold} from {$title} as read?",Yaa="<br><br><label><input type='checkbox' id='confirm-mark-all-read-cb' class='confirm-mark-all-read-cb'></input>";
	function vW(a,b) {
		var c=u(Uaa),d=b||new D;
		d.a(Vaa);
		if(a.IG) {
			a=u(Waa,{
				startBold:HF,count:F(a.count),endBold:IF,title:a.title
			});
			d.a(a)
		}else {
			a=u(Xaa,{
				startBold:HF,count:F(a.count),endBold:IF,title:a.title
			});
			d.a(a)
		}d.a(Yaa,c,q2);
		if(!b)return E(d.toString ())
	};
	var Zaa='<div class="entry-enclosure"><div class="item-body"></div><div class="audio-player-container player"><script type="text/javascript">',$aa="function FlashRequest(command, args) {}",aba='<\/script><div class="audio-player-placeholder"></div><div class="view-enclosure-parent"><a href="',bba='" class="" target="_blank"><span class="view-enclosure">',cba="</span></a></div></div></div>";
	function oz(a,b) {
		var c=b||new D;
		c.a(Zaa,F($aa),aba,F(a.VC),bba,F(a.WC),cba);
		if(!b)return E(c.toString ())
	};
	