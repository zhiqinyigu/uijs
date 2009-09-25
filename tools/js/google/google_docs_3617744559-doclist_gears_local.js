var aa=navigator,i=Error,ba=Boolean,ca=encodeURIComponent,da=parseInt,ea=parseFloat,fa=String,ga=window,ha=Number,ia=Function,ja=Object,la=document,ma=decodeURIComponent,na=isNaN,oa=screen,l=Math;
function pa(a,b) {
	return a.stop=b
}function qa(a,b) {
	return a.filter=b
}function ra(a,b) {
	return a.toString =b
}function sa(a,b) {
	return a.length=b
}function ta(a,b) {
	return a.title=b
}function ua(a,b) {
	return a.position=b
}function va(a,b) {
	return a.className=b
}function wa(a,b) {
	return a.width=b
}function xa(a,b) {
	return a.text=
	b
}function ya(a,b) {
	return a.checked=b
}function n(a,b) {
	return a.innerHTML=b
}function Aa(a,b) {
	return a.value=b
}function Ba(a,b) {
	return a.disabled=b
}function Ca(a,b) {
	return a.message=b
}function Da(a,b) {
	return a.currentTarget=b
}function Ea(a,b) {
	return a.left=b
}function Fa(a,b) {
	return a.removeChild=b
}function Ga(a,b) {
	return a.target=b
}function Ha(a,b) {
	return a.screenX=b
}function Ia(a,b) {
	return a.screenY=b
}function Ja(a,b) {
	return a.createDocument=b
}function Ka(a,b) {
	return a.status=b
}function La(a,b) {
	return a.remove=
	b
}function Ma(a,b) {
	return a.appendData=b
}function Na(a,b) {
	return a.keyCode=b
}function Oa(a,b) {
	return a.bottom=b
}function Pa(a,b) {
	return a.href=b
}function Qa(a,b) {
	return a.getContext=b
}function Ra(a,b) {
	return a.type=b
}function Sa(a,b) {
	return a.contains=b
}function Ta(a,b) {
	return a.tabIndex=b
}function Ua(a,b) {
	return a.clear=b
}function Va(a,b) {
	return a.reset=b
}function Wa(a,b) {
	return a.name=b
}function Xa(a,b) {
	return a.overflow=b
}function Ya(a,b) {
	return a.display=b
}function Za(a,b) {
	return a.height=b
}function $a(a,
b) {
	return a.setActive=b
}function ab(a,b) {
	return a.clientX=b
}function bb(a,b) {
	return a.clientY=b
}function cb(a,b) {
	return a.right=b
}function db(a,b) {
	return a.visibility=b
}var eb="scrollTop",fb="previousSibling",gb="altKey",hb="activeElement",ib="length",o=ib,jb="title",kb="version",lb=kb,_P="prototype",mb="relatedTarget",nb="className",ob="width",r=ob,pb="text",qb=pb,rb="checked",sb=rb,tb="slice",ub="nodeType",vb="document",wb="data",xb="ctrlKey",yb="innerHTML",Ab="offsetWidth",Bb="tBodies",Cb="selected",
Db=Cb,Eb="value",s=Eb,Fb="location",Gb="item",Hb="button",Ib=Hb,Jb="offsetLeft",Kb="color",Lb=Kb,Mb="message",Nb=Mb,Ob="hasOwnProperty",Pb=Ob,Qb="style",u=Qb,Rb="capture",Sb="nodeName",Tb="currentTarget",Ub="body",Vb="left",Wb=Vb,Xb="target",v=Xb,Yb="screenX",Zb="screenY",$b="lastChild",ac="status",bc=ac,cc="charCode",dc="cells",ec="scrollHeight",fc="keyCode",gc="firstChild",hc="enabled",jc=hc,kc="scrollLeft",lc="compatMode",mc="sort",nc=mc,oc="bottom",pc="currentStyle",qc="href",rc=qc,sc="rows",
tc="type",x=tc,uc="tabIndex",vc="childNodes",wc="shiftKey",xc="tagName",yc="defaultView",zc="attributes",Ac=zc,Bc="name",Cc=Bc,Dc="parentNode",Ec="fileName",Fc="display",Gc=Fc,Hc="nextSibling",Ic="offsetTop",Jc="contentWindow",Kc="height",y=Kc,Lc="offsetHeight",Mc="setActive",Nc="nodeValue",Oc="clientX",Pc="clientY",Qc="documentElement",Rc="right",Sc=Rc,Tc=Tc||{
},Uc=this;
var Vc=".",Wc="var ",Yc=function (a,b) {
	var c=a.split(Vc),d=Uc,e;
	if(!(c[0] in d)&&d.execScript)d.execScript(Wc+c[0]);
	while(c[o]&&(e=
	c.shift()))if(!c[o]&&Xc(b))d[e]=b;
	else d=d[e]?d[e]:(d[e]={
	})
},Zc=function (a) {
	var b=a.split(Vc),c=Uc;
	for(var d;d=b.shift();)if(c[d])c=c[d];else return null;return c
},$c=function () {
};
var ad="object",bd="number",cd="array",dd="function",fd="null",hd=function (a) {
	var b=typeofa;
	if(b==ad)if(a) {
		if(typeofa[o]==bd&&typeofa.splice!="undefined"&&!gd(a,ib))return cd;
		if(typeofa.call!="undefined")return dd
	}else return fd;
	else if(b==dd&&typeofa.call=="undefined")return ad;
	return b
};
if(ja[_P].propertyIsEnumerable )var gd=
function (a,b) {
	return ja[_P].propertyIsEnumerable .call(a,b)
};
else gd=function (a,b) {
	if(b in a)for(var c in a)if(c==b&&ja[_P][Pb].call(a,b))return true;return false
};var Xc=function (a) {
	return typeofa!="undefined"
},id=function (a) {
	return a===null
},jd=function (a) {
	return Xc(a)&&!id(a)
},kd=function (a) {
	return hd(a)==cd
},ld=function (a) {
	var b=hd(a);
	return b==cd||b==ad&&typeofa[o]==bd
},md="string",nd=function (a) {
	return typeofa==md
};
var od=function (a) {
	return typeofa==bd
},pd=function (a) {
	return hd(a)==dd
},qd=
function (a) {
	var b=hd(a);
	return b==ad||b==cd||b==dd
},ud=function (a) {
	if(a[Pb]&&a.hasOwnProperty (rd))return a[rd];
	if(!a[rd])a[rd]=++td;
	return a[rd]
},vd="removeAttribute",wd=function (a) {
	if(vd in a)a.removeAttribute(rd);
	try{
		delete a[rd]
	}catch(b) {
	}
},rd="closure_hashCode_",td=0,xd=function (a,b) {
	var c=a.wR;
	if(arguments[o]>2) {
		var d=Array[_P][tb].call(arguments,2);
		if(c)d.unshift.apply(d,c);
		c=d
	}b=a.zR||b;
	a=a.xR||a;
	var e,f=b||Uc;
	e=c?function () {
		var g=Array[_P][tb].call(arguments);
		g.unshift.apply(g,c);
		return a.apply(f,
		g)
	}:function () {
		return a.apply(f,arguments)
	};
	e.wR=c;
	e.zR=b;
	e.xR=a;
	return e
},yd=function (a) {
	var b=Array[_P][tb].call(arguments,1);
	b.unshift(a,null);
	return xd.apply(null,b)
},zd=function (a,b) {
	for(var c in b)a[c]=b[c]
},Ad=Date.P7||function () {
	return (new Date).getTime()
},Bd="\\{\\$",Cd="\\}",Dd="gi",z=function (a,b) {
	var c=b||{
	};
	for(var d in c)a=a.replace(new RegExp(Bd+d+Cd,Dd),c[d]);return a
},Ed=function (a,b) {
	Yc(a,b)
},Gd=function (a,b,c) {
	a[b]=c
},Hd="args[",Id="]",Jd="oScope.__applyTemp__.peek().(",Kd=",",
Ld=");";
if(!ia[_P].apply)ia[_P].apply=function (a,b) {
	var c=[],d,e;
	if(!a)a=Uc;
	if(!b)b=[];
	for(var f=0;f<b[o];f++)c[f]=Hd+f+Id;e=Jd+c.join(Kd)+Ld;if(!a.__applyTemp__)a.__applyTemp__=[];a.__applyTemp__.push(this);d=eval(e);a.__applyTemp__.pop();return d
};ia[_P].bind=function (a) {
	if(arguments[o]>1) {
		var b=Array[_P][tb].call(arguments,1);
		b.unshift(this,a);
		return xd.apply(null,b)
	}else return xd(this,a)
};
ia[_P].partial=function () {
	var a=Array[_P][tb].call(arguments);
	a.unshift(this,null);
	return xd.apply(null,
	a)
};
ia[_P].inherits=function (a) {
	A(this,a)
};
var A=function (a,b) {
	function c() {
	}c.prototype=b[_P];
	a.b=b[_P];
	a.prototype=new c;
	a[_P].constructor =a
};
ia[_P].mixin=function (a) {
	zd(this[_P],a)
};
var B=function () {
};
B[_P].Jy=false;
B[_P].Gu=function () {
	return this.Jy
};
B[_P].RU=B[_P].Gu;
B[_P].j=function () {
	if(!this.Jy) {
		this.e();
		this.Jy=true
	}
};
B[_P].e=function () {
};
var Md="@",C="",Nd=function (a) {
	if(/^\s*$/.test(a))return false;
	var b=/\\["\\\/bfnrtu]/g,c=/"[^"\\\n\r\u2028\u2029\x00-\x1f\x7f-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,d=/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,e=/^[\],:{
	}\s\u2028\u2029]*$/;
	return e.test(a.replace(b,Md).replace(c,Id).replace(d,C))
},Od="(",Pd=")",Qd="Invalid JSON string: ",Rd=function (a) {
	a=fa(a);
	if(typeofa.parseJSON==dd)return a.parseJSON();
	if(Nd(a))try{
		return eval(Od+a+Pd)
	}catch(b) {
	}throwi(Qd+a);
},Sd=function (a) {
	return eval(Od+
	a+Pd)
},Td=null,Vd=function (a) {
	if(!Td)Td=new Ud;
	return Td.cd(a)
},Ud=function () {
};
Ud[_P].cd=function (a) {
	if(a!=null&&typeofa.toJSONString==dd)return a.toJSONString();
	var b=[];
	this.fD(a,b);
	return b.join(C)
};
var Wd="boolean",Xd="Unknown type: ";
Ud[_P].fD=function (a,b) {
	switch(typeofa) {
		case md:this.WN(a,b);
		break;
		case bd:this.R2(a,b);
		break;
		case Wd:b.push(a);
		break;
		case "undefined":b.push(fd);
		break;
		case ad:if(a==null) {
			b.push(fd);
			break
		}if(kd(a)) {
			this.Q2(a,b);
			break
		}this.S2(a,b);
		break;
		default:throwi(Xd+typeofa);
	}
};
var Yd={
	'"':'\\"',"\\":"\\\\","/":"\\/","\u0008":"\\b","\u000c":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\u000b":"\\u000b"
},Zd='"',$d="\\u",ae="000",be="00",ce="0";
Ud[_P].WN=function (a,b) {
	b.push(Zd,a.replace(/[\\\"\x00-\x1f\x80-\uffff]/g,function (c) {
		if(c in Yd)return Yd[c];
		var d=c.charCodeAt(0),e=$d;
		if(d<16)e+=ae;
		else if(d<256)e+=be;
		else if(d<4096)e+=ce;
		return Yd[c]=e+d.toString (16)
	}),Zd)
};
Ud[_P].R2=function (a,b) {
	b.push(isFinite(a)&&!na(a)?a:fd)
};
var de="[";
Ud[_P].Q2=function (a,b) {
	var c=a[o];
	b.push(de);
	var d=C;
	for(var e=0;e<c;e++) {
		b.push(d);
		this.fD(a[e],b);
		d=Kd
	}b.push(Id)
};
var ee="{",fe=":",ge="}";
Ud[_P].S2=function (a,b) {
	b.push(ee);
	var c=C;
	for(var d in a) {
		b.push(c);
		this.WN(d,b);
		b.push(fe);
		this.fD(a[d],b);
		c=Kd
	}b.push(ge)
};
var he=function (a) {
	B.call(this);
	this.Nb=a.token;
	this.DP=a.timepoints;
	this.u6=a.uriPrefix;
	this.hQ=a.uriParams;
	this.O1=a.refreshEnabled;
	this.EC=a.refreshMinInterval;
	this.Q1=a.refreshMaxInterval;
	this.SM=a.refreshVariance;
	this.uZ=a.idleTime;
	this.od=a.ge;
	this.lz=a.gs;
	this.kN=a.requestTimeout;
	this.ck=a.locale;
	this.t7=a.de;
	this.sI=a.gswu;
	this.io=a.domain;
	this.fi=a.email;
	this.FF=a.email?a.email.toLowerCase():C;
	this.Vk=a.statusRequestMinInterval;
	this.qn=a.statusRequestMaxInterval;
	this.v1=a.psd;
	this.B7=a.epc;
	this.ET=a.epm;
	this.$T=a.fsb;
	this.k_=a.rtl;
	this.I1=a.protocolVersion;
	var b=this.fA();
	for(var c=0;c<b[o];c++)a[b[c]]=undefined;this.gD=a
};A(he,B);he[_P].fA=function () {
	return []
};
he[_P].Jb=function () {
	return this.Nb
};
he[_P].Jz=function () {
	return this.uZ
};
he[_P].Va=function () {
	return this.fi
};
he[_P].cd=function () {
	return Vd(this.gD)
};
he[_P].e=function () {
	he.b.e.call(this);
	this.DP=null;
	this.hQ=null;
	this.sI=null;
	this.gD=null
};
var ie=function (a) {
	this.Sk=a.appName;
	this.h=a.element;
	this.xZ=a.imagePath;
	this.Ck=a.searchTextBox;
	this.xo=a.docsSearchButton;
	this.fj=a.webSearchButton;
	this.Gr=a.webSearchUrl;
	this.Sv=a.searchForm;
	this.vL=a.logoSection;
	this.ON=a.searchSection;
	this.hP=a.ssol;
	this.FN=a.ssl;
	this.MN=a.searchOptionsSection;
	this.LF=a.blankHistoryPage;
	this.fF=a.actionStatusElement;
	this.tL=a.loadingStatusElement;
	this.vF=a.additionalStatusElement;
	this.RE=a.uploadUrl;
	this.uF=a.additionalNewActions;
	this.x_=a.learnMoreWelcomeUrl;
	this.tP=a.surveyLink;
	this.C5=a.surveyPromoCode;
	this.P1=a.refreshIntervalForNewDoc;
	this.jh=a.ehf;
	this.sG=a.ecm;
	this.m8=a.wdu;
	this.Z0=a.pageInitialization;
	this.gH=a.dw;
	this.pU=a.gsb;
	this.lU=a.ggwu;
	this.jU=a.gglu;
	this.kU=a.gglo;
	this.iU=a.ggcu;
	this.J7=a.ggar;
	this.rI=a.glmu;
	this.hU=a.gdmu;
	this.mU=a.gilu;
	this.qU=a.gulu;
	this.oU=a.gmrv;
	this.nU=a.gi;
	this.mz=a.gsi;
	this.cR=a.appDisplayUrl;
	this.k7=a.appTestUrl;
	this.R7=a.offlineAuthUrl;
	this.VR=a.cleardotUrl;
	this.io=a.domain;
	this.aI=a.evh;
	this.XH=a.elsv;
	this.lt=
	a.ehpd;
	this.Do=a.edrf;
	this.yj=a.ecf;
	this.hy=a.cookieFetchElement;
	this.El=a.egpt;
	this.YH=a.esd;
	this.DT=a.emsd;
	this.CT=a.emsdt;
	this.J_=a.mslmu;
	this.OH=a.ecodt;
	this.kt=a.ecod;
	this.Wd=a.ess;
	this.Eo=a.egv;
	this.A7=a.eenp;
	this.JB=a.logoutElement;
	this.eU=a.gacn;
	this.eU=a.gacn;
	this.gU=a.gsn;
	this.vw=a.shareHelpUrl;
	this.WH=a.ehvw;
	this.BT=a.ehvt;
	this.NH=a.ecdd;
	this.TH=a.egi;
	this.y1=a.printElement;
	he.call(this,a)
};
A(ie,he);
var je="element",ke="searchTextBox",le="docsSearchButton",me="webSearchButton",ne="searchForm",
oe="actionStatusElement",pe="loadingStatusElement",qe="additionalStatusElement",re="cookieFetchElement",se="dw",te="logoutElement",ve="surveyLink",we="ssol",xe="ssl",ye="searchOptionsSection",ze="searchSection",Ae="logoSection",Be="printElement";
ie[_P].fA=function () {
	var a=ie.b.fA.call(this);
	a=a.concat([je,ke,le,me,ne,oe,pe,qe,re,se,te,ve,we,xe,ye,ze,Ae,Be]);
	return a
};
ie[_P].c=function () {
	return this.h
};
ie[_P].e=function () {
	ie.b.e.call(this);
	this.h=null;
	this.xZ=null;
	this.Ck=null;
	this.xo=null;
	this.fj=
	null;
	this.Gr=null;
	this.Sv=null;
	this.hP=null;
	this.FN=null;
	this.K7=null;
	this.LF=null;
	this.fF=null;
	this.tL=null;
	this.vF=null;
	this.RE=null;
	this.uF=null;
	this.tP=null;
	this.hy=null;
	this.JB=null;
	this.gD=null;
	this.vL=null;
	this.ON=null;
	this.MN=null;
	this.y1=null
};
var Ce="dispose",De=function (a) {
	B.call(this);
	this.n=a;
	Gd(this,Ce,this.j)
};
A(De,B);
De[_P].Kb=function () {
};
De[_P].e=function () {
	De.b.e.call(this);
	this.n.j();
	this.n=null
};
;
var Ee=function (a) {
	return a[a[o]-1]
},Fe=function (a,b,c) {
	if(a.indexOf)return a.indexOf(b,c);
	if(Array.indexOf)return Array.indexOf(a,b,c);
	var d=c==null?0:(c<0?l.max(0,a[o]+c):c);
	for(var e=d;e<a[o];e++)if(e in a&&a[e]===b)return e;return -1
},Ge=function (a,b,c) {
	if(a.forEach)a.forEach(b,c);
	else if(Array.forEach)Array.forEach(a,b,c);
	else {
		var d=a[o],e=nd(a)?a.split(C):a;
		for(var f=0;f<d;f++)if(f in e)b.call(c,e[f],f,a)
	}
},He=function (a,b,c) {
	if(a.filter)return a.filter(b,c);
	if(Array.filter)return Array.filter(a,
	b,c);
	var d=a[o],e=[],f=0,g=nd(a)?a.split(C):a;
	for(var h=0;h<d;h++)if(h in g) {
		var j=g[h];
		if(b.call(c,j,h,a))e[f++]=j
	}return e
},Ie=function (a,b,c) {
	if(a.map)return a.map(b,c);
	if(Array.map)return Array.map(a,b,c);
	var d=a[o],e=[],f=0,g=nd(a)?a.split(C):a;
	for(var h=0;h<d;h++)if(h in g)e[f++]=b.call(c,g[h],h,a);return e
},Je=function (a,b,c,d) {
	if(a.reduce)return d?a.reduce(xd(b,d),c):a.reduce(b,c);
	var e=c;
	Ge(a,function (f,g) {
		e=b.call(d,e,f,g,a)
	});
	return e
},Ke=function (a,b,c) {
	if(a.some)return a.some(b,c);
	if(Array.some)return Array.some(a,
	b,c);
	var d=a[o],e=nd(a)?a.split(C):a;
	for(var f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return true;return false
},Le=function (a,b,c) {
	if(a.every)return a.every(b,c);
	if(Array.every)return Array.every(a,b,c);
	var d=a[o],e=nd(a)?a.split(C):a;
	for(var f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return false;return true
},Ne=function (a,b,c) {
	var d=Me(a,b,c);
	return d<0?null:(nd(a)?a.charAt(d):a[d])
},Me=function (a,b,c) {
	var d=a[o],e=nd(a)?a.split(C):a;
	for(var f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return -1
},
Oe=function (a,b) {
	if(a.contains)return a.contains(b);
	return Fe(a,b)>-1
};
var Pe=function (a) {
	if(!kd(a))for(var b=a[o]-1;b>=0;b--)delete a[b];sa(a,0)
},Re=function (a,b,c) {
	Qe(a,c,0,b)
},Te=function (a,b) {
	var c=Fe(a,b),d;
	if(d=c!=-1)Se(a,c);
	return d
},Se=function (a,b) {
	return Array[_P].splice.call(a,b,1)[o]==1
},Ue=function (a) {
	if(kd(a))return a.concat();
	else {
		var b=[];
		for(var c=0,d=a[o];c<d;c++)b[c]=a[c];return b
	}
},Ve=function (a) {
	for(var b=1;b<arguments[o];b++) {
		var c=arguments[b];
		if(!kd(c))a.push(c);
		else a.push.apply(a,
		c)
	}
},Qe=function (a) {
	return Array[_P].splice.apply(a,We(arguments,1))
},We=function (a,b,c) {
	return arguments[o]<=2?Array[_P][tb].call(a,b):Array[_P][tb].call(a,b,c)
},Ye=function (a,b,c) {
	var d=0,e=a[o]-1,f=c||Xe;
	while(d<=e) {
		var g=d+e>>1,h=f(b,a[g]);
		if(h>0)d=g+1;
		else if(h<0)e=g-1;
		else return g
	}return -(d+1)
},Ze=function (a,b) {
	Array[_P][nc].call(a,b||Xe)
},af=function (a,b,c) {
	if(!ld(a)||!ld(b)||a[o]!=b[o])return false;
	var d=a[o],e=c||$e;
	for(var f=0;f<d;f++)if(!e.call(null,a[f],b[f]))return false;return true
},
Xe=function (a,b) {
	return a>b?1:(a<b?-1:0)
},$e=function (a,b) {
	return a===b
};
var bf="StopIteration";
if(bf in Uc)var cf=Uc.StopIteration;
else cf=i(bf);
var df=function () {
};
df[_P].next=function () {
	throwcf;
};
df[_P].Bn=function () {
	return this
};
var ef="Not implemented",gf=function (a) {
	if(ainstanceofdf)return a;
	if(typeofa.Bn==dd)return a.Bn(false);
	if(ld(a)) {
		var b=0,c=new df;
		c.next=function () {
			while(true) {
				if(b>=a[o])throwcf;
				if(!(b in a)) {
					b++;
					continue
				}return a[b++]
			}
		};
		return c
	}throwi(ef);
},hf=function (a,b,c) {
	if(ld(a))try{
		Ge(a,b,c)
	}catch(d) {
		if(d!==cf)throwd;
	}else {
		a=gf(a);
		try{
			while(true)b.call(c,
			a.next(),undefined,a)
		}catch(d) {
			if(d!==cf)throwd;
		}
	}
};
var jf=function (a,b,c) {
	for(var d in a)b.call(c,a[d],d,a)
},kf=function (a) {
	var b=0;
	for(var c in a)b++;return b
},lf=function (a) {
	var b=[],c=0;
	for(var d in a)b[c++]=a[d];return b
},mf=function (a) {
	var b=[],c=0;
	for(var d in a)b[c++]=d;return b
},nf=function (a,b) {
	for(var c in a)if(a[c]==b)return true;return false
},of=function (a) {
	for(var b in a)return false;return true
},qf=function (a) {
	var b=mf(a);
	for(var c=b[o]-1;c>=0;c--)pf(a,b[c])
},pf=function (a,b) {
	var c;
	if(c=b in a)delete a[b];
	return c
},rf='The object already contains the key "',
tf=function (a,b,c) {
	if(b in a)throwi(rf+b+Zd);
	sf(a,b,c)
},uf=function (a,b,c) {
	if(b in a)return a[b];
	return c
},sf=function (a,b,c) {
	a[b]=c
},vf=function (a) {
	var b={
	};
	for(var c in a)b[c]=a[c];return b
},wf=["constructor",Ob,"isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],xf=function (a) {
	var b,c;
	for(var d=1;d<arguments[o];d++) {
		c=arguments[d];
		for(b in c)a[b]=c[b];for(var e=0;e<wf[o];e++) {
			b=wf[e];
			if(ja[_P][Pb].call(c,b))a[b]=c[b]
		}
	}
};
var D=function (a) {
	this.ab={
	};
	this.Ea=[];
	if(a)this.Ue(a)
};
D[_P].eb=0;
D[_P].Fr=0;
D[_P].D=function () {
	return this.eb
};
D[_P].ca=function () {
	this.ss();
	var a=[];
	for(var b=0;b<this.Ea[o];b++) {
		var c=this.Ea[b];
		a.push(this.ab[c])
	}return a
};
D[_P].Nc=function () {
	this.ss();
	return this.Ea.concat()
};
D[_P].Da=function (a) {
	return yf(this.ab,a)
};
D[_P].Xh=function (a) {
	for(var b=0;b<this.Ea[o];b++) {
		var c=this.Ea[b];
		if(yf(this.ab,c)&&this.ab[c]==a)return true
	}return false
};
D[_P].Qa=function () {
	return this.eb==0
};
Ua(D[_P],
function () {
	this.ab={
	};
	sa(this.Ea,0);
	this.eb=0;
	this.Fr=0
});
La(D[_P],function (a) {
	if(yf(this.ab,a)) {
		delete this.ab[a];
		this.eb--;
		this.Fr++;
		if(this.Ea[o]>2*this.eb)this.ss();
		return true
	}return false
});
D[_P].ss=function () {
	if(this.eb!=this.Ea[o]) {
		var a=0,b=0;
		while(a<this.Ea[o]) {
			var c=this.Ea[a];
			if(yf(this.ab,c))this.Ea[b++]=c;
			a++
		}sa(this.Ea,b)
	}if(this.eb!=this.Ea[o]) {
		var d={
		},a=0,b=0;
		while(a<this.Ea[o]) {
			var c=this.Ea[a];
			if(!yf(d,c)) {
				this.Ea[b++]=c;
				d[c]=1
			}a++
		}sa(this.Ea,b)
	}
};
D[_P].o=function (a,b) {
	if(yf(this.ab,
	a))return this.ab[a];
	return b
};
D[_P].k=function (a,b) {
	if(!yf(this.ab,a)) {
		this.eb++;
		this.Ea.push(a);
		this.Fr++
	}this.ab[a]=b
};
D[_P].Ue=function (a) {
	var b,c;
	if(ainstanceofD) {
		b=a.Nc();
		c=a.ca()
	}else {
		b=mf(a);
		c=lf(a)
	}for(var d=0;d<b[o];d++)this.k(b[d],c[d])
};D[_P].Ca=function () {
	return new D(this)
};
var zf="The map has changed since the iterator was created";
D[_P].Bn=function (a) {
	this.ss();
	var b=0,c=this.Ea,d=this.ab,e=this.Fr,f=this,g=new df;
	g.next=function () {
		while(true) {
			if(e!=f.Fr)throwi(zf);
			if(b>=c[o])throwcf;
			var h=c[b++];
			return a?h:d[h]
		}
	};
	return g
};
if(ja[_P][Pb])var yf=function (a,b) {
	return ja[_P][Pb].call(a,b)
};
else yf=function (a,b) {
	return b in a&&a[b]!==ja[_P][b]
};
var Af=function (a) {
	B.call(this);
	this.nt=new D;
	this.hH=a
};
A(Af,B);
Af[_P].k=function (a,b) {
	this.nt.k(a,b)
};
Af[_P].execute=function (a) {
	var b=this.nt.o(a)||this.hH;
	if(b)return b.apply(undefined,Array[_P][tb].call(arguments,1))
};
Af[_P].e=function () {
	Af.b.e.call(this);
	this.nt.clear();
	this.nt=null;
	this.hH=null
};
var Bf=function (a,b) {
	return a.indexOf(b)==0
},Cf=function (a,b) {
	var c=a[o]-b[o];
	return c>=0&&a.lastIndexOf(b,c)==c
},Df="$$$$",Ff=function (a) {
	for(var b=1;b<arguments[o];b++) {
		var c=fa(arguments[b]).replace(/\$/g,Df);
		a=a.replace(/\%s/,c)
	}return a
},Gf=function (a) {
	return /^[\s\xa0]*$/.test(a)
},Hf=function (a) {
	return Gf(a==null?C:fa(a))
};
var If="\n",Jf=function (a) {
	return a.replace(/(\r\n|\r|\n)/g,If)
},Kf=function (a) {
	return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,C)
};
var Lf=function (a) {
	return a.replace(/[\s\xa0]+$/,
	C)
},Mf=function (a,b) {
	var c=fa(a).toLowerCase(),d=fa(b).toLowerCase();
	return c<d?-1:(c==d?0:1)
},Nf=/^[a-zA-Z0-9\-_.!~*'()]*$/,Of=function(a) {a=fa(a);if(!Nf.test(a))return ca(a);return a},E=" ",Pf=function(a) {return ma(a.replace(/\+/g,E))},Qf="<br />",Rf="<br>",Sf=function(a,b) {return a.replace(/(\r\n|\r|\n)/g,b?Qf:Rf)},Tf="&amp;",Uf="&lt;",Vf="&gt;",Wf="&quot;",Xf="&",Yf="<",Zf=">",eg=function(a,b) {if(b)return a.replace($f,Tf).replace(ag,Uf).replace(bg,Vf).replace(cg,Wf);else{if(!dg.test(a))return a;
if(a.indexOf(Xf)!=-1)a=a.replace($f,Tf);
if(a.indexOf(Yf)!=-1)a=a.replace(ag,Uf);
if(a.indexOf(Zf)!=-1)a=a.replace(bg,Vf);
if(a.indexOf(Zd)!=-1)a=a.replace(cg,Wf);
return a
}
},$f=/&/g,ag=/</g,bg=/>/g,cg=/\"/g,dg=/[&<>\"]/,fg=" &#160;",gg=function (a,b) {
return Sf(a.replace(//g,fg),b)
},hg="\\$1",ig="\\x08",jg=function (a) {
return fa(a).replace(/([-()\[\]{
}+?*.$\^|,:#<!\\])/g,hg).replace(/\x08/g,ig)
};
var kg=function () {
return Array[_P].join.call(arguments,C)
},lg="(\\d*)(\\D*)",mg="g",og=function (a,b) {
var c=
0,d=Kf(fa(a)).split(Vc),e=Kf(fa(b)).split(Vc),f=l.max(d[o],e[o]);
for(var g=0;c==0&&g<f;g++) {
var h=d[g]||C,j=e[g]||C,k=new RegExp(lg,mg),m=new RegExp(lg,mg);
do{
	var p=k.exec(h)||[C,C,C],q=m.exec(j)||[C,C,C];
	if(p[0][o]==0&&q[0][o]==0)break;
	var t=p[1][o]==0?0:da(p[1],10),w=q[1][o]==0?0:da(q[1],10);
	c=ng(t,w)||ng(p[2][o]==0,q[2][o]==0)||ng(p[2],q[2])
}while(c==0)
}return c
},ng=function (a,b) {
if(a<b)return -1;
else if(a>b)return 1;
return 0
};
var pg,F,qg,rg,sg,tg,ug,vg,wg,xg,yg,zg,Ag="Opera",Bg="MSIE",Cg="WebKit",Dg="Mobile",Eg="Gecko",Fg="Camino",Gg="Mac",Hg="Win",Ig="Linux",Jg=function () {
var a=false,b=false,c=false,d=false,e=false,f=false,g=false,h=false,j=false,k=C;
if(Uc.navigator) {
var m=Uc.navigator,p=m.userAgent;
a=p.indexOf(Ag)==0;
b=!a&&p.indexOf(Bg)!=-1;
c=!a&&p.indexOf(Cg)!=-1;
j=c&&p.indexOf(Dg)!=-1;
d=!a&&!c&&m.product==Eg;
e=d&&m.vendor==Fg;
var q,t;
if(a)q=opera.version();
else {
	if(d)t=/rv\:([^\);
	]+)(\)|;
	)/;
	else if(b)t=/MSIE\s+([^\);
	]+)(\)|;
	)/;
	else if(c)t=/WebKit\/(\S+)/;
	if(t) {
		t.test(p);
		q=RegExp.$1
	}
}k=m.platform||C;
f=k.indexOf(Gg)!=-1;
g=k.indexOf(Hg)!=-1;
h=k.indexOf(Ig)!=-1
}pg=a;
F=b;
qg=d;
rg=e;
sg=c;
tg=sg;
ug=q;
vg=k;
wg=f;
xg=g;
yg=h;
zg=j
};
Jg();
var Kg=function (a,b) {
return og(a,b)
},Lg=function (a) {
return og(ug,a)>=0
};
var Mg="u",Ng="w",Og="m",Pg="l",Qg=function () {
var a=Mg;
if(xg)a=Ng;
else if(wg)a=Og;
else if(yg)a=Pg;
return a
},Sg=function (a) {
var b=[];
b.push(Qg());
for(var c=0;c<a[o];++c) {
var d=new Date(a[c]);
b.push(d.getTimezoneOffset()|0)
}return Rg(b)
},Tg="r",Rg=function (a) {
var b=a[o];
if(b<2)return C;
var c=[a[0]],d=a[1],e=d,f=1,g=2;
while(g<b) {
e=a[g++];
if(e!==d) {
	c.push(mg+Ug(d)+Tg+Ug(f));
	d=e;
	f=1
}else f++
}c.push(mg+Ug(e)+Tg+Ug(f));
return c.join(C)
},Vg="-",Ug=function (a) {
if(a>=0)return a.toString (16).toUpperCase();
else {
var b=
-a;
return Vg+b.toString (16).toUpperCase()
}
};
var Wg=function (a) {
if(typeofa.D==dd)return a.D();
if(ld(a)||nd(a))return a[o];
return kf(a)
},Xg=function (a) {
if(typeofa.ca==dd)return a.ca();
if(nd(a))return a.split(C);
if(ld(a)) {
var b=[],c=a[o];
for(var d=0;d<c;d++)b.push(a[d]);return b
}return lf(a)
},Yg=function (a) {
if(typeofa.Nc==dd)return a.Nc();
if(typeofa.ca==dd)return undefined;
if(ld(a)||nd(a)) {
var b=[],c=a[o];
for(var d=0;d<c;d++)b.push(d);return b
}return mf(a)
},Zg=function (a,b) {
if(typeofa.contains==dd)return a.contains(b);
if(typeofa.Xh==dd)return a.Xh(b);
if(ld(a)||nd(a))return Oe(a,b);
return nf(a,b)
},$g=function (a) {
if(typeofa.Qa==dd)return a.Qa();
if(ld(a)||nd(a))return a[o]==0;
return of(a)
},ah=function (a) {
if(typeofa.clear==dd)a.clear();
else if(ld(a))Pe(a);
else qf(a)
},bh=function (a,b,c) {
if(typeofa.forEach==dd)a.forEach(b,c);
else if(ld(a)||nd(a))Ge(a,b,c);
else {
var d=Yg(a),e=Xg(a),f=e[o];
for(var g=0;g<f;g++)b.call(c,e[g],d&&d[g],a)
}
},ch=function (a,b,c) {
if(typeofa.some==dd)return a.some(b,c);
if(ld(a)||nd(a))return Ke(a,b,c);
var d=Yg(a),e=Xg(a),f=
e[o];
for(var g=0;g<f;g++)if(b.call(c,e[g],d&&d[g],a))return true;return false
},dh=function (a,b,c) {
if(typeofa.every==dd)return a.every(b,c);
if(ld(a)||nd(a))return Le(a,b,c);
var d=Yg(a),e=Xg(a),f=e[o];
for(var g=0;g<f;g++)if(!b.call(c,e[g],d&&d[g],a))return false;return true
};var G=function (a,b) {
var c;
if(ainstanceofG) {
this.Zm(b==null?a.fg:b);
this.nw(a.qg);
this.rw(a.al);
this.ew(a.vj);
this.lw(a.Bi);
this.If(a.Xc());
this.bn(a.bh().Ca());
this.Sq(a.Ej)
}else if(a&&(c=fa(a).match(eh()))) {
this.Zm(!(!b));
this.nw(c[1],true);
this.rw(c[2],true);
this.ew(c[3],true);
this.lw(c[4]);
this.If(c[5],true);
this.bn(c[6]);
this.Sq(c[7],true)
}else {
this.Zm(!(!b));
this.bd=new fh(null,this,this.fg)
}
};
G[_P].qg=C;
G[_P].al=C;
G[_P].vj=C;
G[_P].Bi=null;
G[_P].Sa=C;
G[_P].bd=null;
G[_P].Ej=C;
G[_P].i_=false;
G[_P].fg=false;
var gh="//",hh="?",ih="#";
ra(G[_P],function () {
if(this.kd)return this.kd;
var a=[];
if(this.qg)a.push(jh(this.qg,lh),fe);
if(this.vj) {
a.push(gh);
if(this.al)a.push(jh(this.al,lh),Md);
a.push(mh(this.vj));
if(this.Bi!=null)a.push(fe,fa(this.Bi))
}if(this.Sa)a.push(jh(this.Sa,oh));
var b=fa(this.bd);
if(b)a.push(hh,b);
if(this.Ej)a.push(ih,jh(this.Ej,ph));
return this.kd=a.join(C)
});
var qh="/";
G[_P].sN=function (a) {
var b=this.Ca(),c=a.kZ();
if(c)b.nw(a.qg);
else c=a.mZ();
if(c)b.rw(a.al);
else c=a.dZ();
if(c)b.ew(a.vj);
else c=a.iZ();
var d=a.Xc();
if(c)b.lw(a.Bi);
else {
c=a.hZ();
if(c)if(!/^\//.test(d))d=b.Xc().replace(/\/?[^\/]*$/,qh+d)
}if(c)b.If(d);
else c=a.jZ();
if(c)b.bn(a.rd());
else c=a.fZ();
if(c)b.Sq(a.Ej);
return b
};
G[_P].Ca=function () {
return rh(this.qg,this.al,this.vj,this.Bi,this.Sa,this.bd.Ca(),this.Ej,this.fg)
};
G[_P].nw=function (a,b) {
this.hi();
delete this.kd;
this.qg=b?sh(a):a;
if(this.qg)this.qg=this.qg.replace(/:$/,C);
return this
};
G[_P].kZ=function () {
return !(!this.qg)
};
G[_P].rw=function (a,b) {
this.hi();
delete this.kd;
this.al=b?sh(a):a;
return this
};
G[_P].mZ=function () {
return !(!this.al)
};
G[_P].ew=function (a,b) {
this.hi();
delete this.kd;
this.vj=b?sh(a):a;
return this
};
G[_P].dZ=function () {
return !(!this.vj)
};
var th="Bad port number ";
G[_P].lw=function (a) {
this.hi();
delete this.kd;
if(a) {
a=ha(a);
if(na(a)||a<0)throwi(th+a);
this.Bi=a
}else this.Bi=null;
return this
};
G[_P].iZ=function () {
return this.Bi!=null
};
G[_P].Xc=function () {
return this.Sa
};
G[_P].If=function (a,b) {
this.hi();
delete this.kd;
this.Sa=b?sh(a):a;
return this
};
G[_P].hZ=function () {
return !(!this.Sa)
};
G[_P].jZ=function () {
return this.bd!==null&&this.bd.toString ()!==C
};
G[_P].bn=function (a) {
this.hi();
delete this.kd;
if(ainstanceoffh) {
this.bd=a;
this.bd.SE=this;
this.bd.Zm(this.fg)
}else this.bd=new fh(a,this,this.fg);
return this
};
G[_P].rd=function () {
return this.bd.toString ()
};
G[_P].bh=function () {
return this.bd
};
G[_P].ed=function (a,b) {
this.hi();
delete this.kd;
this.bd.k(a,b);
return this
};
G[_P].oc=function (a) {
return this.bd.ca(a)
};
G[_P].dJ=function (a) {
return this.bd.o(a)
};
G[_P].Sq=function (a,b) {
this.hi();
delete this.kd;
this.Ej=b?sh(a):a;
return this
};
G[_P].fZ=function () {
return !(!this.Ej)
};
var uh="Tried to modify a read-only Uri";
G[_P].hi=function () {
if(this.i_)throwi(uh);
};
G[_P].Zm=function (a) {
this.fg=a;
if(this.bd)this.bd.Zm(a)
};
var rh=function (a,b,c,d,e,f,g,h) {
var j=new G(null,h);
j.nw(a);
j.rw(b);
j.ew(c);
j.lw(d);
j.If(e);
j.bn(f);
j.Sq(g);
return j
},sh=function (a) {
return a?ma(a):C
},mh=function (a) {
if(nd(a))return ca(a);
return null
},vh=/^[a-zA-Z0-9\-_.!~*'():\/;?]*$/,jh=
function (a,b) {
var c=null;
if(nd(a)) {
c=a;
if(!vh.test(c))c=encodeURI(a);
if(c.search(b)>=0)c=c.replace(b,wh)
}return c
},xh="%",wh=function (a) {
var b=a.charCodeAt(0);
return xh+(b>>4&15).toString (16)+(b&15).toString (16)
},yh=null,eh=function () {
if(!yh)yh=/^(?:([^:\/?#]+):)?(?:\/\/(?:([^\/?#]*)@)?([^\/?#:@]*)(?::([0-9]+))?)?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;
return yh
},lh=/[#\/\?@]/g,oh=/[\#\?]/g,ph=/#/g,zh="=",fh=function (a,b,c) {
this.ec=new D;
this.SE=b;
this.fg=!(!c);
if(a) {
var d=a.split(Xf);
for(var e=0;e<d[o];e++) {
	var f=
	d[e].indexOf(zh),g=null,h=null;
	if(f>=0) {
		g=d[e].substring(0,f);
		h=d[e].substring(f+1)
	}else g=d[e];
	g=Pf(g);
	g=this.Jj(g);
	this.add(g,h?Pf(h):C)
}
}
};
fh[_P].eb=0;
fh[_P].D=function () {
return this.eb
};
fh[_P].add=function (a,b) {
this.Xj();
a=this.Jj(a);
if(!this.Da(a))this.ec.k(a,b);
else {
var c=this.ec.o(a);
if(kd(c))c.push(b);
else this.ec.k(a,[c,b])
}this.eb++;
return this
};
La(fh[_P],function (a) {
a=this.Jj(a);
if(this.ec.Da(a)) {
this.Xj();
var b=this.ec.o(a);
if(kd(b))this.eb-=b[o];
else this.eb--;
return this.ec.remove(a)
}return false
});
Ua(fh[_P],function () {
this.Xj();
this.ec.clear();
this.eb=0
});
fh[_P].Qa=function () {
return this.eb==0
};
fh[_P].Da=function (a) {
a=this.Jj(a);
return this.ec.Da(a)
};
fh[_P].Xh=function (a) {
var b=this.ca();
return Oe(b,a)
};
fh[_P].Nc=function () {
var a=this.ec.ca(),b=this.ec.Nc(),c=[];
for(var d=0;d<b[o];d++) {
var e=a[d];
if(kd(e))for(var f=0;f<e[o];f++)c.push(b[d]);else c.push(b[d])
}return c
};fh[_P].ca=function (a) {
var b;
if(a) {
var c=this.Jj(a);
if(this.Da(c)) {
	var d=this.ec.o(c);
	if(kd(d))return d;
	else {
		b=[];
		b.push(d)
	}
}else b=
[]
}else {
var e=this.ec.ca();
b=[];
for(var f=0;f<e[o];f++) {
	var g=e[f];
	if(kd(g))Ve(b,g);
	else b.push(g)
}
}return b
};
fh[_P].k=function (a,b) {
this.Xj();
a=this.Jj(a);
if(this.Da(a)) {
var c=this.ec.o(a);
if(kd(c))this.eb-=c[o];
else this.eb--
}this.ec.k(a,b);
this.eb++;
return this
};
fh[_P].o=function (a,b) {
a=this.Jj(a);
if(this.Da(a)) {
var c=this.ec.o(a);
return kd(c)?c[0]:c
}else return b
};
ra(fh[_P],function () {
if(this.kd)return this.kd;
var a=[],b=0,c=this.ec.Nc();
for(var d=0;d<c[o];d++) {
var e=c[d],f=Of(e),g=this.ec.o(e);
if(kd(g))for(var h=0;h<g[o];h++) {
	if(b>0)a.push(Xf);
	a.push(f,zh,Of(g[h]));
	b++
}else {
	if(b>0)a.push(Xf);
	a.push(f,zh,Of(g));
	b++
}
}return this.kd=a.join(C)
});
fh[_P].Xj=function () {
delete this.kd;
if(this.SE)delete this.SE.kd
};
fh[_P].Ca=function () {
var a=new fh;
a.ec=this.ec.Ca();
return a
};
fh[_P].Jj=function (a) {
var b=fa(a);
if(this.fg)b=b.toLowerCase();
return b
};
fh[_P].Zm=function (a) {
var b=a&&!this.fg;
if(b) {
this.Xj();
bh(this.ec,function (c,d) {
	var e=d.toLowerCase();
	if(d!=e) {
		this.remove(d);
		this.add(e,c)
	}
},this)
}this.fg=
a
};
fh[_P].extend=function () {
for(var a=0;a<arguments[o];a++) {
var b=arguments[a];
bh(b,function (c,d) {
	this.add(d,c)
},this)
}
};
var Bh=function () {
B.call(this);
this.Ja=Ah++
},Ch,Dh;
A(Bh,B);
Bh[_P].cs=null;
Bh[_P].xl=true;
var Eh=2,Ah=0,Fh=new G(C),Gh=null,Hh=null,Ih=null,Jh=null,Kh=C;
Bh[_P].Lc=function () {
return Fh
};
Bh[_P].MI=function () {
var a=this.Lc().Ca(),b=Kh;
if(b)a.If(Kh+a.Xc());
return a
};
Bh[_P].l=function () {
return this.Ja
};
Bh[_P].K=function () {
return 0
};
Bh[_P].oc=function () {
return new D
};
Bh[_P].ac=function () {
return this.bh().toString ()
};
Bh[_P].Gz=function () {
return null
};
var Lh="token",Mh="tzfp",Nh="tzo";
Bh[_P].bh=function () {
var a=
new fh,b=this.oc();
if(b)bh(b,function (h,j) {
a.k(j,h)
});
var c=Gh;
if(c)a.k(Lh,c);
a.k(kb,Eh);
var d=Hh,e=Ih;
if(d&&e) {
a.k(Mh,d);
a.k(Nh,e)
}var f=Jh;
if(f)for(var g in f)a.k(g,f[g]);return a
};Bh[_P].T=function () {
if(!this.cs)this.cs=this.It().toString ();
return this.cs
};
Bh[_P].It=function () {
var a=this.MI(),b=this.bh();
a.bn(b);
b.remove(Lh);
b.remove(kb);
b.remove(Nh);
b.remove(Mh);
var c=Jh;
if(c)for(var d in c)b.remove(d);return a
};Bh[_P].eB=function () {
this.cs=null
};
Bh[_P].uD=function (a) {
this.xl=a
};
Bh[_P].VN=function () {
var a=
this.oc(),b={
};
bh(a,function (c,d) {
b[d]=c
});
b.communicationType=this.K();
b.id=this.l();
return b
};
var Oh=function (a,b,c) {
if(Xc(c)&&!id(c))a.k(b,c)
},Ph=function (a,b) {
return Xc(a)&&!id(a)&&Xc(a[b])?a[b]:undefined
},Qh=function (a) {
Gh=a
},Rh=function (a) {
if(a) {
Hh=Sg(a);
Ih=(new Date).getTimezoneOffset()
}
},Sh=function (a) {
var b=Jh||{
};
xf(b,a);
Jh=b
},Th=function (a) {
Ch=a
},Uh=function (a) {
Dh=a
},Vh=function () {
return new Bh
},Wh=new Af(Vh),Xh=function (a,b) {
Wh.k(a,b)
};
var Yh=function (a,b) {
B.call(this);
this.ek=b;
this.Kc=[];
this.uS(a)
};
A(Yh,B);
Yh[_P].ty=null;
Yh[_P].Iy=null;
Yh[_P].Lq=function (a) {
this.ty=a
};
Yh[_P].jO=function (a) {
this.Iy=a
};
Yh[_P].Hd=function () {
if(this.Kc[o])return this.Kc.pop();
return this.Jg()
};
Yh[_P].Ld=function (a) {
if(this.Kc[o]<this.ek)this.Kc.push(a);
else this.Qg(a)
};
var Zh="[goog.structs.SimplePool] Initial cannot be greater than max";
Yh[_P].uS=function (a) {
if(a>this.ek)throwi(Zh);
for(var b=0;b<a;b++)this.Kc.push(this.Jg())
};Yh[_P].Jg=function () {
return this.ty?
this.ty():{
}
};
Yh[_P].Qg=function (a) {
if(this.Iy)this.Iy(a);
else if(pd(a.j))a.j();
else for(var b in a)delete a[b]
};Yh[_P].e=function () {
Yh.b.e.call(this);
var a=this.Kc;
while(a[o])this.Qg(a.pop());
this.Kc=null
};
var H=function (a,b) {
Ra(this,a);
Ga(this,b);
Da(this,this[v])
};
A(H,B);
H[_P].e=function () {
delete this[x];
delete this[v];
delete this[Tb]
};
H[_P].Ei=false;
H[_P].Km=true;
H[_P].stopPropagation=function () {
this.Ei=true
};
H[_P].preventDefault=function () {
this.Km=false
};
var $h=function (a,b) {
if(a)this.hg(a,b)
};
A($h,H);
var ai=[1,4,2];
Ra($h[_P],null);
Ga($h[_P],null);
Da($h[_P],null);
$h[_P].relatedTarget=null;
$h[_P].offsetX=0;
$h[_P].offsetY=0;
ab($h[_P],0);
bb($h[_P],0);
Ha($h[_P],0);
Ia($h[_P],0);
$h[_P].button=0;
Na($h[_P],0);
$h[_P].charCode=0;
$h[_P].ctrlKey=false;
$h[_P].altKey=false;
$h[_P].shiftKey=false;
$h[_P].metaKey=false;
$h[_P].Wc=null;
$h[_P].hg=function (a,b) {
Ra(this,a[x]);
Ga(this,a[v]||a.srcElement);
Da(this,b);
this.relatedTarget=a[mb]?a[mb]:(this[x]==bi?a.fromElement:
(this[x]==ci?a.toElement:null));
this.offsetX=typeofa.layerX==bd?a.layerX:a.offsetX;
this.offsetY=typeofa.layerY==bd?a.layerY:a.offsetY;
ab(this,typeofa[Oc]==bd?a[Oc]:a.pageX);
bb(this,typeofa[Pc]==bd?a[Pc]:a.pageY);
Ha(this,a[Yb]||0);
Ia(this,a[Zb]||0);
this.button=a[Ib];
Na(this,a[fc]||0);
this.charCode=a[cc]||(this[x]==di?a[fc]:0);
this.ctrlKey=a[xb];
this.altKey=a[gb];
this.shiftKey=a[wc];
this.metaKey=a.metaKey;
this.Wc=a;
this.Km=null;
this.Ei=null
};
var ei="420";
$h[_P].fm=function (a) {
return F?(this[x]==
fi?a==0:!(!(this.Wc[Ib]&ai[a]))):(sg&&!Lg(ei)?this.Wc[Ib]==1&&a==0:this.Wc[Ib]==a)
};
$h[_P].stopPropagation=function () {
this.Ei=true;
if(this.Wc.stopPropagation)this.Wc.stopPropagation();
else this.Wc.cancelBubble=true
};
$h[_P].preventDefault=function () {
this.Km=false;
if(!this.Wc.preventDefault) {
this.Wc.returnValue=false;
try{
	Na(this.Wc,-1)
}catch(a) {
}
}else this.Wc.preventDefault()
};
$h[_P].e=function () {
$h.b.e.call(this);
this.Wc=null
};
var gi=function () {
},hi=0;
gi[_P].iB=null;
gi[_P].Me=null;
gi[_P].LM=null;
gi[_P].src=null;
Ra(gi[_P],null);
gi[_P].capture=null;
gi[_P].Bp=null;
gi[_P].jb=0;
gi[_P].Hm=false;
gi[_P].Lx=false;
var ii="Invalid listener argument";
gi[_P].hg=function (a,b,c,d,e,f) {
if(pd(a))this.iB=true;
else if(a&&a.ce&&pd(a.ce))this.iB=false;
else throwi(ii);
this.Me=a;
this.LM=b;
this.src=c;
Ra(this,d);
this.capture=!(!e);
this.Bp=f;
this.Lx=false;
this.jb=++hi;
this.Hm=false
};
gi[_P].ce=function (a) {
if(this.iB)return this.Me.call(this.Bp||
this.src,a);
return this.Me.ce.call(this.Me,a)
};
var ji={
},ki={
},li={
},mi=new Yh(0,600);
mi.Lq(function () {
return {
eb:0
}
});
mi.jO(function (a) {
a.eb=0
});
var ni=new Yh(0,600);
ni.Lq(function () {
return []
});
ni.jO(function (a) {
sa(a,0);
delete a.cq;
delete a.cC
});
var oi=new Yh(0,600);
oi.Lq(function () {
var a=function (b) {
return pi.call(a.src,a.jb,b)
};
return a
});
var qi=function () {
return new gi
},ri=new Yh(0,600);
ri.Lq(qi);
var si=function () {
return new $h
},ti=function () {
var a=null;
if(F) {
a=new Yh(0,600);
a.Lq(si)
}return a
},ui=ti(),vi="on",wi=vi,xi={
},yi="Invalid event type",
zi=function (a,b,c,d,e) {
if(!b)throwi(yi);
else if(kd(b)) {
for(var f=0;f<b[o];f++)zi(a,b[f],c,d,e);return null
}var g=!(!d),h=ki;if(!(b in h))h[b]=mi.Hd();h=h[b];if(!(g in h)) {
h[g]=mi.Hd();
h.eb++
}h=h[g];
var j=ud(a),k,m;
if(!h[j]) {
k=h[j]=ni.Hd();
h.eb++
}else {
k=h[j];
for(var f=0;f<k[o];f++) {
	m=k[f];
	if(m.Me==c&&m.Bp==e) {
		if(m.Hm)break;
		return k[f].jb
	}
}
}var p=oi.Hd();
p.src=a;
m=ri.Hd();
m.hg(c,p,a,b,g,e);
var q=m.jb;
p.jb=q;
k.push(m);
ji[q]=m;
if(!li[j])li[j]=ni.Hd();
li[j].push(m);
if(a.addEventListener) {
if(a==Uc||!a.bH)a.addEventListener(b,
p,g)
}else a.attachEvent(Ai(b),p);
return q
},Bi=function (a,b,c,d,e) {
if(kd(b)) {
for(var f=0;f<b[o];f++)Bi(a,b[f],c,d,e);return null
}var g=zi(a,b,c,d,e),h=ji[g];h.Lx=true;return g
},Ci=function (a,b,c,d,e) {
if(kd(b)) {
for(var f=0;f<b[o];f++)Ci(a,b[f],c,d,e);return null
}var g=!(!d),h=Di(a,b,g);if(!h)return false;for(var f=0;f<h[o];f++)if(h[f].Me==c&&h[f][Rb]==g&&h[f].Bp==e)return Ei(h[f].jb);return false
},Ei=function (a) {
if(!ji[a])return false;
var b=ji[a];
if(b.Hm)return false;
var c=b.src,d=b[x],e=b.LM,f=b[Rb];
if(c.removeEventListener) {
if(c==Uc||!c.bH)c.removeEventListener(d,e,f)
}else if(c.detachEvent)c.detachEvent(Ai(d),e);
var g=ud(c),h=ki[d][f][g];
if(li[g]) {
var j=li[g];
Te(j,b);
if(j[o]==0)delete li[g]
}b.Hm=true;
h.cC=true;
Fi(d,f,g,h);
delete ji[a];
return true
},Fi=function (a,b,c,d) {
if(!d.cq)if(d.cC) {
for(var e=0,f=0;e<d[o];e++) {
	if(d[e].Hm) {
		ri.Ld(d[e]);
		continue
	}if(e!=f)d[f]=d[e];
	f++
}sa(d,f);
d.cC=false;
if(f==0) {
	ni.Ld(d);
	delete ki[a][b][c];
	ki[a][b].eb--;
	if(ki[a][b].eb==0) {
		mi.Ld(ki[a][b]);
		delete ki[a][b];
		ki[a].eb--
	}if(ki[a].eb==
	0) {
		mi.Ld(ki[a]);
		delete ki[a]
	}
}
}
},Gi=function (a,b,c) {
var d=0,e=a==null,f=b==null,g=c==null;
c=!(!c);
if(!e) {
var h=ud(a);
if(li[h]) {
	var j=li[h];
	for(var k=j[o]-1;k>=0;k--) {
		var m=j[k];
		if((f||b==m[x])&&(g||c==m[Rb])) {
			Ei(m.jb);
			d++
		}
	}
}
}else jf(li,function (p) {
for(var q=p[o]-1;q>=0;q--) {
	var t=p[q];
	if((f||b==t[x])&&(g||c==t[Rb])) {
		Ei(t.jb);
		d++
	}
}
});
return d
},Di=function (a,b,c) {
var d=ki;
if(b in d) {
d=d[b];
if(c in d) {
	d=d[c];
	var e=ud(a);
	if(d[e])return d[e]
}
}return null
},Hi=function (a,b,c,d,e) {
var f=!(!d),g=Di(a,b,f);
if(g)for(var h=0;h<g[o];h++)if(g[h].Me==c&&g[h][Rb]==f&&g[h].Bp==e)return g[h];return null
},Ii="click",Ji="mousedown",Ki="keypress",Li="blur",Mi="focus",fi=Ii,Ni=Ji,Oi="mouseup",bi="mouseover",ci="mouseout",Pi="mousemove",di=Ki,Qi="keydown",Ri="keyup",Si=Li,Ti=Mi,Ui="contextmenu",Ai=function (a) {
if(a in xi)return xi[a];
return xi[a]=wi+a
},Wi=function (a,b,c,d) {
var e=1,f=ki;
if(b in f) {
f=f[b];
if(c in f) {
	f=f[c];
	var g=ud(a);
	if(f[g]) {
		var h=f[g];
		if(!h.cq)h.cq=1;
		else h.cq++;
		try{
			var j=h[o];
			for(var k=0;k<j;k++) {
				var m=
				h[k];
				if(m&&!m.Hm)e&=Vi(m,d)!==false
			}
		}finally{
			h.cq--;
			Fi(b,c,g,h)
		}
	}
}
}return ba(e)
},Vi=function (a,b) {
var c=a.ce(b);
if(a.Lx)Ei(a.jb);
return c
},Xi=function (a,b) {
if(nd(b))b=new H(b,a);
else if(!(binstanceofH)) {
var c=b;
b=new H(b[x],a);
xf(b,c)
}else Ga(b,b[v]||a);
var d=1,e,f=b[x],g=ki;
if(!(f in g))return true;
g=g[f];
var h=true in g,j=false in g;
if(h) {
e=[];
for(var k=a;k;k=k.Ul())e.push(k);for(var m=e[o]-1;!b.Ei&&m>=0;m--) {
	Da(b,e[m]);
	d&=Wi(e[m],b[x],true,b)&&b.Km!=false
}
}if(j)if(h)for(var m=0;!b.Ei&&m<e[o];m++) {
Da(b,
e[m]);
d&=Wi(e[m],b[x],false,b)&&b.Km!=false
}else for(var p=a;!b.Ei&&p;p=p.Ul()) {
Da(b,p);
d&=Wi(p,b[x],false,b)&&b.Km!=false
}return ba(d)
},Yi="window.event",pi=function (a,b) {
if(!ji[a])return true;
var c=ji[a],d=c[x],e=ki;
if(!(d in e))return true;
e=e[d];
var f;
if(F) {
var g=b||Zc(Yi),h=true in e;
if(h) {
	if(g[fc]<0||g.returnValue!=undefined)return true;
	Zi(g)
}ud(c.src);
var j=ui.Hd();
j.hg(g,this);
f=true;
try{
	if(h) {
		var k=ni.Hd();
		for(var m=j[Tb];m;m=m[Dc])k.push(m);for(var p=k[o]-1;!j.Ei&&p>=0;p--) {
			Da(j,k[p]);
			f&=
			Wi(k[p],d,true,j)
		}for(var p=0;!j.Ei&&p<k[o];p++) {
			Da(j,k[p]);
			f&=Wi(k[p],d,false,j)
		}
	}else f=Vi(c,j)
}finally{
	if(k) {
		sa(k,0);
		ni.Ld(k)
	}j.j();
	ui.Ld(j)
}return f
}var q=new $h(b,this);
try{
f=Vi(c,q)
}finally{
q.j()
}return f
},Zi=function (a) {
var b=false;
if(a[fc]==0)try{
Na(a,-1);
return
}catch(c) {
b=true
}if(b||a.returnValue==undefined)a.returnValue=true
};
var $i=function (a) {
this.F=a
};
A($i,B);
var aj=new Yh(0,100);
$i[_P].d=function (a,b,c,d,e) {
if(kd(b)) {
for(var f=0;f<b[o];f++)this.d(a,b[f],c,d,e);return
}var g=zi(a,b,c||this,d||false,e||this.F||this);if(this.Ea)this.Ea[g]=true;else if(this.Cc) {
this.Ea=aj.Hd();
this.Ea[this.Cc]=true;
this.Cc=null;
this.Ea[g]=true
}else this.Cc=g
};
$i[_P].M=function (a,b,c,d,e) {
if(!this.Cc&&!this.Ea)return ;
if(kd(b)) {
for(var f=0;f<b[o];f++)this.M(a,b[f],c,d,e);return
}var g=Hi(a,b,c||this,d||false,e||this.F||this);if(g) {
var h=g.jb;
Ei(h);
if(this.Ea)pf(this.Ea,h);
else if(this.Cc==h)this.Cc=null
}
};
$i[_P].vc=function () {
if(this.Ea) {
for(var a in this.Ea) {
	Ei(a);
	delete this.Ea[a]
}aj.Ld(this.Ea);
this.Ea=null
}else if(this.Cc)Ei(this.Cc)
};
$i[_P].e=function () {
$i.b.e.call(this);
this.vc()
};
var bj="EventHandler.handleEvent not implemented";
$i[_P].ce=function () {
throwi(bj);
};
var cj;
;
var dj="_",ej=function (a) {
a=a.replace(/-/g,dj);
cj=a
},gj=function (a,b,c) {
if(!fj[b])fj[b]={
};
fj[b][c]=a;
if(cj==null)cj=c
},fj={
},hj="DateTimeConstants",ij=function (a,b) {
gj(a,hj,b)
},jj=ij;
;
;
;
;
;
;
;
;
;
var kj=function (a) {
De.call(this,a)
};
A(kj,De);
kj[_P].m=null;
kj[_P].ba=function () {
return this.m||(this.m=new $i(this))
};
kj[_P].Kb=function () {
var a=this.n;
Uh(a.I1);
Qh(a.Jb());
Sh(a.hQ);
Th(a.u6);
Rh(a.DP);
if(a.ck)ej(a.ck)
};
kj[_P].e=function () {
kj.b.e.call(this);
if(this.m) {
this.m.j();
this.m=null
}
};
var lj="start",mj="num",nj="numResults",oj="desc",pj="query",qj="q",rj="queryNameOnly",sj="qNameOnly",tj="refresh",uj=function (a) {
Bh.call(this);
this.Mw=Ph(a,lj)||0;
this.kk=Ph(a,mj)||Ph(a,nj);
this.Kf=this.p(a,mc,3);
var b=Ph(a,oj);
this.so=Xc(b)&&!id(b)?b:true;
this.Cv=Ph(a,pj)||Ph(a,qj);
this.yq=Ph(a,rj)||Ph(a,sj);
this.TM=Ph(a,tj)
};
A(uj,Bh);
uj[_P].ds=null;
uj[_P].p=function (a,b,c) {
var d=Ph(a,b);
return jd(d)?d:c
};
uj[_P].setStart=function (a) {
this.Mw=a
};
uj[_P].BO=function (a) {
this.kk=a
};
uj[_P].mp=function () {
return null
};
uj[_P].JK=function () {
switch(this.Kf) {
case 0:case 3:case 4:case 5:case 6:return true;
default:return false
}
};
uj[_P].Lu=function (a,b) {
var c=this.mp();
if(c)return c(a,b)!=0;
return true
};
uj[_P].rd=function () {
return this.Cv
};
uj[_P].LV=function () {
return this.yq
};
uj[_P].GO=function (a) {
this.TM=a
};
uj[_P].oc=function () {
var a=new D;
if(this.jK()) {
Oh(a,lj,this.Mw);
Oh(a,nj,this.kk);
Oh(a,mc,this.Kf);
Oh(a,oj,this.so);
Oh(a,qj,this.Cv);
Oh(a,sj,this.yq);
Oh(a,tj,this.TM)
}return a
};
uj[_P].WI=function () {
if(!this.ds) {
var a=
this.It();
a.bh().remove(mc);
a.bh().remove(oj);
this.ds=a.toString ()
}return this.ds
};
uj[_P].It=function () {
var a=uj.b.It.call(this),b=a.bh();
b.remove(lj);
b.remove(nj);
b.remove(tj);
return a
};
uj[_P].eB=function () {
uj.b.eB.call(this);
this.ds=null
};
uj[_P].jK=function () {
return true
};
uj[_P].RF=function () {
return true
};
uj[_P].TK=function () {
return true
};
uj[_P].RK=function () {
return false
};
uj[_P].hb=function (a) {
return a&&this.Cv==a.rd()&&this.yq==a.yq
};
var vj=function (a) {
uj.call(this);
this.wq=a
};
A(vj,uj);
vj[_P].K=function () {
return 10
};
var wj=function (a) {
this.storeId=a.storeId;
this.timeMs=a.timeMs;
this.backendError=a.backendError
};
wj[_P].j=function () {
};
var xj="server",zj=function (a) {
this.qe=Xc(a)&&!id(a)&&Xc(a.response)&&!id(a.response);
this.De=a.error;
this.Tg=a.errorMessage;
this.C7=a.errorCause;
this.D7=a.errorDetail;
var b=[],c=a.stats;
if(c)for(var d=0;d<c[o];d++)b.push(new wj(c[d]));this.on=b||[];this.Ja=yj++;this.jP=xj
},yj=0;zj[_P].K=function () {
return 0
};
zj[_P].l=function () {
return this.Ja
};
zj[_P].$t=function () {
return this.jP
};
zj[_P].Qk=function (a) {
this.jP=a
};
var Aj=function (a) {
return new zj(a)
},Bj=new Af(Aj),Cj=function (a,b) {
return Bj.execute(b,
a)
},Dj=function (a,b) {
Bj.k(a,b)
};
;
var Ej=function (a) {
this.ab=new D;
if(a)this.Ue(a)
},Fj="o",Gj=function (a) {
var b=typeofa;
return b==ad?Fj+ud(a):b.substr(0,1)+a
};
Ej[_P].D=function () {
return this.ab.D()
};
Ej[_P].add=function (a) {
this.ab.k(Gj(a),a)
};
Ej[_P].Ue=function (a) {
var b=Hj(a),c=b[o];
for(var d=0;d<c;d++)this.add(b[d])
};Ej[_P].vc=function (a) {
var b=Hj(a),c=b[o];
for(var d=0;d<c;d++)this.remove(b[d])
};La(Ej[_P],function (a) {
return this.ab.remove(Gj(a))
});
Ua(Ej[_P],function () {
this.ab.clear()
});
Ej[_P].Qa=function () {
return this.ab.Qa()
};
Sa(Ej[_P],
function (a) {
return this.ab.Da(Gj(a))
});
Ej[_P].ca=function () {
return this.ab.ca()
};
Ej[_P].Ca=function () {
return new Ej(this)
};
Ej[_P].hb=function (a) {
return this.D()!=Wg(a)?false:this.o_(a)
};
Ej[_P].o_=function (a) {
var b=Wg(a);
if(this.D()>b)return false;
if(!(ainstanceofEj)&&b>5)a=new Ej(a);
return dh(this,function (c) {
return Zg(a,c)
})
};
Ej[_P].Bn=function () {
return this.ab.Bn(false)
};
var Hj=function (a) {
return Xg(a)
};
var Ij="Message: ",Jj='\nUrl: <a href="view-source:',Kj='" target="_new">',Lj="</a>\nLine: ",Mj="\n\nBrowser stack:\n",Nj="-> ",Oj="[end]\n\nJS stack traversal:\n",Pj="Exception trying to expose exception! You win, we lose. ",Sj=function (a,b) {
try{
var c=Qj(a),d=Ij+eg(c[Nb])+Jj+c[Ec]+Kj+c[Ec]+Lj+c.lineNumber+Mj+eg(c.stack+Nj)+Oj+eg(Rj(b)+Nj);
return d
}catch(e) {
return Pj+e
}
},Tj="document.location.href",Uj="Unknown error",Vj="Not available",Qj=function (a) {
var b=Zc(Tj);
return typeofa==md?{
message:a,name:Uj,
lineNumber:Vj,fileName:b,stack:Vj
}:(!a.lineNumber||!a[Ec]||!a.stack?{
message:a[Nb],name:a[Cc],lineNumber:a.lineNumber||a.line||Vj,fileName:a[Ec]||a.sourceURL||b,stack:a.stack||Vj
}:a)
},Rj=function (a) {
return Wj(a||arguments.callee.caller,[])
},Xj="[...circular reference...]",Yj=", ",Zj="true",$j="false",ak="[fn]",bk="...",ck=")\n",dk="[exception trying to get caller]\n",ek="[...long stack...]",fk="[end]",Wj=function (a,b) {
var c=[];
if(Oe(b,a))c.push(Xj);
else if(a&&b[o]<50) {
c.push(gk(a)+Od);
var d=a.arguments;
for(var e=0;e<d[o];e++) {
	if(e>0)c.push(Yj);
	var f,g=d[e];
	switch(typeofg) {
		case ad:f=g?ad:fd;
		break;
		case md:f=g;
		break;
		case bd:f=fa(g);
		break;
		case Wd:f=g?Zj:$j;
		break;
		case dd:f=gk(g);
		f=f?f:ak;
		break;
		case "undefined":default:f=typeofg;
		break
	}if(f[o]>40)f=f.substr(0,40)+bk;
	c.push(f)
}b.push(a);
c.push(ck);
try{
	c.push(Wj(a.caller,b))
}catch(h) {
	c.push(dk)
}
}else if(a)c.push(ek);
else c.push(fk);
return c.join(C)
},hk="[Anonymous]",gk=function (a) {
var b=fa(a);
if(!ik[b]) {
var c=/function ([^\(]+)/.exec(b);
if(c) {
	var d=c[1],
	e=/^\$(.+)\$$/.exec(d);
	if(e)d=e[1].replace(/\${
		1,2
	}/g,Vc);
	ik[b]=d
}else ik[b]=hk
}return ik[b]
},ik={
};
var kk=function (a,b,c) {
this.a8=jk++;
this.CP=Ad();
this.rh=a;
this.c0=b;
this.uL=c
};
kk[_P].eI=null;
kk[_P].dI=null;
var jk=0;
kk[_P].y3=function (a) {
this.eI=a
};
kk[_P].z3=function (a) {
this.dI=a
};
kk[_P].Tq=function (a) {
this.rh=a
};
kk[_P].Ot=function () {
return this.c0
};
var lk=function (a) {
this.kg=a;
this.X=null;
this.lc={
};
this.ru=[]
};
lk[_P].rh=null;
var mk=function (a,b) {
Wa(this,a);
Aa(this,b)
};
ra(mk[_P],function () {
return this[Cc]
});
var nk="OFF",ok=new mk(nk,Infinity),pk="SHOUT",qk=new mk(pk,1200),rk="SEVERE",sk=new mk(rk,1000),tk="WARNING",uk=new mk(tk,900),vk="INFO",wk=new mk(vk,800),xk="CONFIG",yk=new mk(xk,700),zk="FINE",Ak=new mk(zk,500),Bk="FINER",Ck=new mk(Bk,400),Dk="FINEST",Ek=new mk(Dk,300),Fk="ALL",Gk=new mk(Fk,0),Hk=[ok,qk,sk,uk,wk,yk,Ak,Ck,Ek,Gk],Ik=null,
Jk=function (a) {
if(!Ik) {
var b=Ik={
},c=Hk;
for(var d=0;d<c[o];d++) {
	var e=c[d];
	b[e[Cc]]=e
}
}return Ik[a]
},Lk=function (a) {
return Kk(a)
};
lk[_P].q=function () {
return this.kg
};
lk[_P].LQ=function (a) {
this.ru.push(a)
};
lk[_P].Y1=function (a) {
return Te(this.ru,a)
};
lk[_P].J=function () {
return this.X
};
lk[_P].Tq=function (a) {
this.rh=a
};
lk[_P].kB=function (a) {
if(this.rh)return a[s]>=this.rh[s];
if(this.X)return this.X.kB(a);
return false
};
lk[_P].log=function (a,b,c) {
if(!this.kB(a))return ;
var d=new kk(a,fa(b),this.kg);
if(c) {
d.y3(c);
d.z3(Sj(c,arguments.callee.caller))
}this.D_(d)
};
lk[_P].hn=function (a,b) {
this.log(sk,a,b)
};
lk[_P].cl=function (a,b) {
this.log(uk,a,b)
};
lk[_P].qa=function (a,b) {
this.log(wk,a,b)
};
lk[_P].Cj=function (a,b) {
this.log(Ak,a,b)
};
lk[_P].dz=function (a,b) {
this.log(Ek,a,b)
};
lk[_P].D_=function (a) {
if(!this.kB(a.rh))return ;
var b=this;
while(b) {
b.AR(a);
b=b.J()
}
};
lk[_P].AR=function (a) {
for(var b=0;b<this.ru[o];b++)this.ru[b](a)
};lk[_P].X3=function (a) {
this.X=a
};
lk[_P].HQ=function (a,b) {
this.lc[a]=b
};
var Mk={
},Nk=null,Ok=function () {
if(!Nk) {
Nk=
new lk(C);
Mk[C]=Nk;
Nk.Tq(yk)
}
};
var Pk=function () {
Ok();
return Nk
},Kk=function (a) {
Ok();
return a in Mk?Mk[a]:Qk(a)
},Qk=function (a) {
var b=new lk(a),c=a.split(Vc),d=c[c[o]-1];
sa(c,c[o]-1);
var e=c.join(Vc),f=Kk(e);
f.HQ(d,b);
b.X3(f);
Mk[a]=b;
return b
};
var Rk=function () {
};
Rk[_P].o=function () {
};
Rk[_P].k=function () {
};
Rk[_P].pb=function () {
};
Rk[_P].ta=function () {
};
Rk[_P].wt=function () {
};
Rk[_P].se=function () {
};
Rk[_P].Bc=function () {
};
Rk[_P].fO=function () {
};
Rk[_P].pa=function () {
};
Rk[_P].mm=function () {
};
Rk[_P].Op=$c;
var Sk=function () {
};
Sk[_P].k=function () {
};
Sk[_P].pb=function () {
return new Tk
};
Sk[_P].ta=function () {
return null
};
Sk[_P].wt=function () {
return null
};
Sk[_P].pa=function () {
var a=C,b=this.Bc();
if(this.St&&this.St())a=this.St().pa()+(b.indexOf(de)!=
-1?C:qh);
return a+b
};
Sk[_P].mm=function () {
};
Sk[_P].St=null;
var Uk=function (a) {
this.ab={
};
this.ga=[];
this.ri={
};
if(a)for(var b=0,c;c=a[b];b++)this.add(c)
};Uk[_P].add=function (a) {
this.ga.push(a);
var b=a.Bc();
if(b!=null) {
this.ab[b]=a;
this.ri[b]=this.ga[o]-1
}
};
Uk[_P].o=function (a) {
return this.ab[a]||null
};
Uk[_P].yb=function (a) {
return this.ga[a]||null
};
Uk[_P].D=function () {
return this.ga[o]
};
Uk[_P].Yq=function (a,b) {
if(b==null)this.removeNode(a);
else {
var c=this.ri[a];
if(c!=null) {
	this.ab[a]=b;
	this.ga[c]=
	b
}else this.add(b)
}
};
Uk[_P].removeNode=function (a) {
var b=this.ri[a];
if(b!=null) {
this.ga.splice(b,1);
delete this.ab[a];
delete this.ri[a];
for(var c in this.ri)if(this.ri[c]>b)this.ri[c]--
}return b!=null
};Uk[_P].indexOf=function (a) {
return this.ri[a]
};
var Tk=function () {
Uk.call(this)
};
A(Tk,Uk);
var Vk="Can't add to EmptyNodeList";
Tk[_P].add=function () {
throwi(Vk);
};
var Wk=function (a,b) {
var c=function () {
};
c.prototype=a;
var d=new c;
d.Bc=function () {
return b
};
return d
};
var Xk=function (a) {
if(a)this.MO(a)
},Yk="()",Zk="name()",$k="count()",al="position()",bl="$",cl="*|text()",dl="@*",el="*";
Xk[_P].MO=function (a,b,c,d) {
this.eE=a;
if(!c&&!d) {
if(Cf(a,hh)) {
	this.CR=true;
	a=a.substring(0,a[o]-1)
}if(Cf(a,Yk))if(Cf(a,Zk)||Cf(a,$k)||Cf(a,al)) {
	var e=a.lastIndexOf(qh);
	if(e!=-1) {
		this.$y=a.substring(e+1);
		a=a.substring(0,e)
	}else {
		this.$y=a;
		a=Vc
	}if(this.$y==$k)this.UZ=true
}
}this.rk=b||a.split(qh);
this.cb=this.rk[o];
this.Yp=this.rk[this.cb-1];
this.P=this.rk[0];
if(this.cb==1) {
this.RC=
this;
this.Mp=Bf(a,bl)
}else {
this.RC=fl(this.P,null,this,null);
this.Mp=this.RC.Mp;
this.P=this.RC.P
}if(this.cb==1&&!this.Mp) {
this.VZ=a==Vc||a==C;
this.b_=Bf(a,Md);
this.SZ=a==cl;
this.RZ=a==dl;
this.TZ=a==el
}
};
Xk[_P].J=function () {
if(!this.a1) {
if(this.cb>1)this.pM=fl(null,this.rk.slice(0,this.rk[o]-1),this,null);
this.a1=true
}return this.pM
};
Xk[_P].YI=function () {
if(!this.j0) {
if(this.cb>1)this.LL=fl(null,this.rk.slice(1),null,this);
this.j0=true
}return this.LL
};
Xk[_P].p=function (a) {
if(a==null)a=gl();
else if(this.Mp)a=
a.yz?a.yz():gl();
if(this.UZ) {
var b=this.AV(a);
return b.D()
}if(this.cb==1)return a.wt(this.P);
else if(this.cb==0)return a.o();
var c=a.ta(this.P);
return c==null?null:this.YI().p(c)
};
Xk[_P].AV=function (a,b) {
return this.Uz(a,false,b)
};
Xk[_P].$I=function (a,b) {
return this.Uz(a,true,b)
};
Xk[_P].Uz=function (a,b,c) {
if(a==null)a=gl();
else if(this.Mp)a=a.yz?a.yz():gl();
if(this.cb==0&&b)return a;
else if(this.cb==0&&!b)return new Uk([a]);
else if(this.cb==1)if(b)return a.ta(this.P,c);
else {
var d=a.ta(this.P);
return d&&
d.Op()?d.pb():a.pb(this.P)
}else {
var e=a.ta(this.P,c);
if(e==null&&b)return null;
else if(e==null&&!b)return new Tk;
return this.YI().Uz(e,b,c)
}
};
Xk[_P].CR=false;
Xk[_P].rk=[];
Xk[_P].cb=null;
Xk[_P].P=null;
Xk[_P].Yp=null;
Xk[_P].VZ=false;
Xk[_P].b_=false;
Xk[_P].SZ=false;
Xk[_P].RZ=false;
Xk[_P].TZ=false;
Xk[_P].$y=null;
Xk[_P].pM=null;
Xk[_P].LL=null;
var il=function (a) {
var b=hl[a];
if(b==null) {
b=new Xk(a);
hl[a]=b
}return b
},fl=function (a,b,c,d) {
var e=a||b.join(qh),f=hl[e];
if(f==null) {
f=new Xk;
f.MO(e,b,c,d);
hl[e]=
f
}return f
},hl={
};
var jl=function () {
this.ul=new Uk;
this.IF=new D;
this.IB={
};
this.$p={
};
this.yF={
};
this.KT=0;
this.yu={
}
},kl=null;
A(jl,Rk);
var gl=function () {
if(!kl)kl=new jl;
return kl
},ll=function () {
kl=null
};
jl[_P].Nh=function (a,b,c) {
var d=!(!b),e=c||a.Bc();
if(!Bf(e,bl))e=bl+e;
a.fO(e);
this.ul.add(a);
this.IF.k(e,d)
};
jl[_P].be=function (a) {
return this.yF[a]?this.yF[a].$I():this.ul.o(a)
};
jl[_P].o=function () {
return this.ul
};
var ml="Can't set on DataManager";
jl[_P].k=function () {
throwi(ml);
};
jl[_P].pb=function (a) {
return a?
new Uk([this.ta(a)]):this.ul
};
jl[_P].ta=function (a) {
return this.be(a)
};
jl[_P].wt=function (a) {
var b=this.be(a);
return b?b.o():null
};
jl[_P].Bc=function () {
return C
};
jl[_P].pa=function () {
return C
};
jl[_P].mm=function () {
var a=this.ul.D();
for(var b=0;b<a;b++) {
var c=this.ul.yb(b),d=this.IF.o(c.Bc());
if(d)c.mm()
}
};
jl[_P].Op=function () {
return false
};
var nl="/...",ol="/*";
jl[_P].Or=function (a,b,c) {
var d=0;
if(Cf(b,nl)) {
d=1000;
b=b.substring(0,b[o]-4)
}else if(Cf(b,ol)) {
d=1;
b=b.substring(0,b[o]-2)
}c=c||C;
var e=
b+fe+c+fe+ud(a),f={
Ay:b,id:c,fz:a
},g=il(b),h=ud(a);
if(!this.$p[h])this.$p[h]={
};
this.$p[h][e]={
Me:f,Su:[]
};
while(g) {
var j={
	Me:f,N_:d
},k=this.IB[g.eE];
if(k==null) {
	k={
	};
	this.IB[g.eE]=k
}k[e]=j;
d=0;
g=g.J();
this.$p[h][e].Su.push({
	jb:e,s0:k
})
}
};
var pl="([^\\/]+)";
jl[_P].qF=function (a,b,c) {
var d=b.indexOf(el);
if(d==-1) {
this.Or(a,b,c);
return
}var e=b.substring(0,d)+bk,f=bl;
if(Cf(b,nl)) {
b=b.substring(0,b[o]-4);
f=C
}var g=jg(b),h=g.replace(/\\\*/g,pl)+f,j=new RegExp(h),k=function (q) {
var t=j.exec(q);
if(t) {
	t.shift();
	a(q,c,t)
}
};
this.Or(k,e,c);
var m=ud(a);
if(!this.yu[m])this.yu[m]={
};
var p=b+fe+c;
this.yu[m][p]={
Me:{
	Ay:e,fz:k,id:c
}
}
};
jl[_P].aN=function (a,b,c) {
this.dN(this.yu,true,a,b,c)
};
jl[_P].cN=function (a,b,c) {
if(b&&Cf(b,nl))b=b.substring(0,b[o]-4);
else if(b&&Cf(b,ol))b=b.substring(0,b[o]-2);
this.dN(this.$p,false,a,b,c)
};
jl[_P].dN=function (a,b,c,d,e) {
var f=ud(c),g=a[f];
if(g!=null)for(var h in g) {
var j=g[h],k=j.Me;
if((!d||d==k.Ay)&&(!e||e==k.id)) {
	if(b)this.cN(k.fz,k.Ay,k.id);
	if(j.Su)for(var m=0;m<j.Su[o];m++) {
		var p=
		j.Su[m];
		delete p.s0[p.jb]
	}delete g[h]
}
}
};
jl[_P].Xd=function (a) {
if(this.w7)return ;
var b=il(a),c=0;
while(b) {
var d=this.IB[b.eE];
if(d)for(var e in d) {
	var f=d[e],g=f.Me;
	if(c<=f.N_)g.fz(a,g.id)
}c++;
b=b.J()
}this.KT++
};
var ql=function (a,b,c) {
this.X=c;
this.Lg=b;
this.Eh(a)
};
ql[_P].Eh=function (a) {
this.P=a;
this.zd=null
};
ql[_P].o=function () {
return !qd(this.P)?this.P:this.pb()
};
var rl="Can't set group nodes to new values yet";
ql[_P].k=function (a) {
if(a&&qd(this.P))throwi(rl);
if(this.X)this.X.P[this.Lg]=a;
this.P=a;
this.zd=null;
gl().Xd(this.pa())
};
var sl="Selector not supported yet (";
ql[_P].pb=function (a) {
if(!this.P)return new Tk;
if(!a||a==el) {
this.my(false);
return this.zd
}else if(a.indexOf(el)==-1)return this.P[a]!=null?
new Uk([this.ta(a)]):new Tk;
else throwi(sl+a+Pd);
};
ql[_P].my=function (a) {
if(this.zd&&!a)return ;
if(!qd(this.P)) {
this.zd=new Tk;
return
}var b=new Uk;
if(this.P!=null) {
var c;
if(kd(this.P)) {
	var d=this.P[o];
	for(var e=0;e<d;e++) {
		var f=this.P[e],g=f.id,h=g!=null?fa(g):de+e+Id;
		c=new ql(f,h,this);
		b.add(c)
	}
}else for(var h in this.P) {
	var j=this.P[h];
	if(j.Bc)b.add(j);
	else if(!pd(j)) {
		c=new ql(j,h,this);
		b.add(c)
	}
}
}this.zd=b
};
ql[_P].ta=function (a,b) {
if(!this.P)return null;
var c=this.pb().o(a);
if(!c&&b) {
var d={
};
if(kd(this.P)) {
	d.id=a;
	this.P.push(d)
}else this.P[a]=d;
c=new ql(d,a,this);
if(this.zd)this.zd.add(c)
}return c
};
ql[_P].wt=function (a) {
if(this.zd) {
var b=this.pb().o(a);
return b?b.o():null
}else return this.P?this.P[a]:null
};
var tl="/count()";
ql[_P].se=function (a,b) {
var c=null,d=null,e=false;
if(b!=null)if(b.Bc) {
d=b;
d.X=this
}else d=kd(b)||qd(b)?new ql(b,a,this):new ul(this.P,a,this);
if(kd(this.P)) {
this.my();
var f=this.zd.indexOf(a);
if(b==null) {
	var g=this.zd.o(a);
	if(g)c=g.pa();
	this.P.splice(f,1)
}else if(f)this.P[f]=
b;
else this.P.push(b);
if(f==null)e=true;
this.zd.Yq(a,d)
}else if(qd(this.P)) {
if(b==null) {
	this.my();
	var g=this.zd.o(a);
	if(g)c=g.pa();
	delete this.P[a]
}else {
	if(!this.P[a])e=true;
	this.P[a]=b
}if(this.zd)this.zd.Yq(a,d)
}var h=gl();
if(d) {
h.Xd(d.pa());
if(e&&this.Op()) {
	h.Xd(this.pa());
	h.Xd(this.pa()+tl)
}
}else if(c) {
h.Xd(c);
if(this.Op()) {
	h.Xd(this.pa());
	h.Xd(this.pa()+tl)
}
}return d
};
ql[_P].Bc=function () {
return this.Lg
};
ql[_P].fO=function (a) {
this.Lg=a
};
ql[_P].pa=function () {
var a=C;
if(this.X)a=this.X.pa()+qh;
return a+this.Lg
};
ql[_P].mm=function () {
};
ql[_P].Op=function () {
return this.c_!=null?this.c_:kd(this.P)
};
var ul=function (a,b,c) {
Sk.call(this);
this.Lg=b;
this.X=a;
this.$0=c||this.X
};
A(ul,Sk);
ul[_P].o=function () {
return this.X[this.Lg]
};
ul[_P].k=function (a) {
var b=this.X[this.Lg];
this.X[this.Lg]=a;
if(b!=a)gl().Xd(this.pa())
};
ul[_P].Bc=function () {
return this.Lg
};
ul[_P].St=function () {
return this.$0
};
var vl=function (a,b,c) {
ql.call(this,a,b,c);
B.call(this)
};
A(vl,ql);
xf(vl[_P],B[_P]);
vl[_P].BE=false;
vl[_P].Xu=null;
var wl="VALID";
vl[_P].bs=wl;
vl[_P].BB=null;
vl[_P].s4=function (a) {
this.BE=a
};
vl[_P].GC=function (a) {
this.se(a,null)
};
vl[_P].kD=function (a) {
this.bs=a
};
var xl="INVALID";
vl[_P].SK=function (a) {
var b=this.BB;
return !b||new Date-b>a||this.bs==xl
};
vl[_P].J3=function (a) {
this.BB=a
};
vl[_P].vO=function (a) {
this.Xu=a
};
vl[_P].Dp=function (a) {
return this.bs==wl&&jd(this.Xu)&&this.Xu>=a
};
vl[_P].PR=function () {
this.Xu=
null
};
vl[_P].e=function () {
B[_P].e.call(this);
this.k(null);
this.BB=null
};
var yl=function (a) {
this.id=a.id;
this.name=a.name;
this.value=a.value;
var b=this.q(),c=b.indexOf(Vc);
this.CJ=b.substring(0,c);
vl.call(this,this,this.l())
};
A(yl,vl);
yl[_P].l=function () {
return this.id
};
yl[_P].q=function () {
return this.name
};
yl[_P].p=function () {
return this.value
};
var zl=function (a) {
zj.call(this,a);
var b=[];
if(this.qe) {
var c=a.response;
if(c) {
	var d=c.prefs;
	for(var e in d) {
		var f={
		};
		f.id=e;
		f.name=e;
		f.value=d[e];
		b.push(new yl(f))
	}
}
}this.Sc=b
};
A(zl,zj);
zl[_P].K=function () {
return 10
};
zl[_P].Xz=function () {
return this.Sc
};
zl[_P].e=function () {
zl.b.e.call(this);
this.Sc=null
};
var Al=function (a) {
return new zl(a)
};
Dj(10,Al);
var Bl=function (a) {
Bh.call(this);
this.uk=a.value?Rd(a.value):a;
this.Sc=null
};
A(Bl,Bh);
var Cl="savedview",Dl="doclist.nameWidth",El="doclist.dateWidth",Fl="splitpane.splitterLeft",Gl="navpane.allItems",Hl="navpane.allFolders",Il="navpane.itemsByType",Jl="navpane.savedSearches",Kl="navpane.sharedWith",Ll="cardlayout.home",Ml="prefs",Nl=new G(Ml);
Bl[_P].Lc=function () {
return Nl
};
Bl[_P].K=function () {
return 10
};
var Ol="doclist",Pl="splitpane",Ql="navpane",Rl="viewmanager.view",Sl="viewmanager",Tl="cardlayout",
Ul=function (a) {
switch(a) {
case Dl:case El:return Ol;
case Fl:return Pl;
case Gl:case Hl:case Il:case Jl:case Kl:return Ql;
case Rl:return Sl;
case Ll:return Tl;
default:break
}if(Bf(a,Cl+Vc))return Cl;
return null
};
Bl[_P].Xz=function () {
if(!this.Sc) {
var a=this.uk,b=[];
for(var c in a) {
	var d={
	};
	d.id=c;
	d.name=c;
	d.value=a[c];
	b.push(new yl(d))
}this.Sc=b
}return this.Sc
};
Bl[_P].S_=function (a) {
this.Sc=null;
var b=a.uk,c=this.uk;
for(var d in b)c[d]=b[d]
};Bl[_P].oc=function () {
var a=new D;
if(this.uk) {
wd(this.uk);
a.k(Eb,
Vd(this.uk))
}return a
};
var Vl=function (a) {
var b=a.split(Vc);
return b[1]
},Wl=function (a,b) {
return kg(a,Vc,b)
},Xl=function (a) {
return new Bl(a)
};
Xh(10,Xl);
;
var am=function (a) {
this.name=a.name;
this[Yl]=Xc(a[Yl])?a[Yl]:0;
this[Zl]=a[Zl];
this[$l]=a[$l]||false
},bm="offlineEnabled",Yl="minimumRole",Zl="actionCategory",$l=bm,fm=function (a) {
return a[Yl]!=null
};
am[_P].q=function () {
return this.name
};
am[_P].tV=function () {
return this[Yl]
};
am[_P].Yg=function () {
return this[Zl]
};
am[_P].Iu=function () {
return this[$l]
};
am[_P].Qb=function () {
return 0
};
am[_P].hb=function (a) {
return a&&a.Qb&&this.Qb()==a.Qb()
};
am[_P].j=function () {
};
var hm=function (a) {
am.call(this,a);
this[gm]=a[gm]
};
A(hm,am);
var im="actionType",gm=im;
hm[_P].Vo=function () {
return this[gm]
};
hm[_P].Qb=function () {
return 2
};
hm[_P].hb=function (a) {
return hm.b.hb.call(this,a)&&this.Vo()==a.Vo()
};
var lm=function (a) {
am.call(this,a);
this.Gf=null;
this.url=a.url;
this[jm]=a[jm];
this.scope=a.scope;
var b=a[km]||[],c=new Ej;
c.Ue(b);
this.Ow=c
};
A(lm,am);
var jm="allowMultiple",km="supportedMimeTypes";
var mm=/\{docid\}/i,nm=/\-/g,om=/\s/g,pm=/\./g,qm=/\,/g,rm=dj;
lm[_P].Yc=function () {
return this.Gf
};
lm[_P].j4=function (a) {
this.Gf=a
};
lm[_P].mf=function () {
return this.url
};
lm[_P].mB=function () {
return this[jm]
};
lm[_P].kp=function () {
return this.scope
};
lm[_P].dW=function () {
return this.Ow.ca()
};
lm[_P].isSupported=
function (a) {
return this.Ow.contains(a)
};
lm[_P].II=function (a) {
var b=a.join(Kd);
return this.mf().replace(mm,ca(b))
};
lm[_P].zJ=function (a) {
var b=a.join(Kd).replace(nm,rm).replace(om,rm).replace(pm,rm).replace(qm,rm);
return b
};
lm[_P].Qb=function () {
return 1
};
lm[_P].hb=function (a) {
return lm.b.hb.call(this,a)&&this.mB()==a.mB()&&this.mf()==a.mf()&&this.kp()==a.kp()
};
lm[_P].j=function () {
this.Ow.clear();
this.Ow=null
};
var sm=function (a) {
this.id=a.id;
this.name=a.name;
this.value=a.value
};
sm[_P].l=function () {
return this.id
};
sm[_P].q=function () {
return this.name
};
sm[_P].p=function () {
return this.value
};
sm[_P].sa=function (a) {
this.value=a
};
sm[_P].H_=function () {
return Wk(this,this.q())
};
sm[_P].j=function () {
var a=this.p();
if(a&&a.j)a.j();
this.value=null
};
var tm=function (a,b) {
this.kl=a;
this.Sw=b
};
tm[_P].hb=function (a) {
return a&&this.kl==this.kl&&this.Sw==a.Sw
};
var um="dee5f2",vm="5a6986",wm="e0ecff",xm="206cff",ym="dfe2ff",zm="0000cc",Am="e0d5f9",Bm="5229a3",Cm="fde9f4",Dm="854f61",Em="ffe3e3",Fm="cc0000",Gm="fff0e1",Hm="ec7000",Im="fadcb3",Jm="b36d00",Km="f3e7b3",Lm="ab8b00",Mm="ffffd4",Nm="636330",Om="f9ffef",Pm="64992c",Qm="f1f5ec",Rm="006633",Sm=[new tm(um,vm),new tm(wm,xm),new tm(ym,zm),new tm(Am,Bm),new tm(Cm,Dm),new tm(Em,Fm),new tm(Gm,Hm),
new tm(Im,Jm),new tm(Km,Lm),new tm(Mm,Nm),new tm(Om,Pm),new tm(Qm,Rm),new tm(vm,um),new tm(xm,wm),new tm(zm,ym),new tm(Bm,Am),new tm(Dm,Cm),new tm(Fm,Em),new tm(Hm,Gm),new tm(Jm,Im),new tm(Lm,Km),new tm(Nm,Mm),new tm(Pm,Om),new tm(Rm,Qm)],Tm=null,Um=[0,1,2,3,4,5,12,13,14,15,16,17,6,7,8,9,10,11,18,19,20,21,22,23],Vm=new tm(Qm,Rm),Wm="eeeeee",Xm="222222",Ym=new tm(Wm,Xm),Zm=function () {
return 0
},$m=function () {
return -1
},an=function () {
if(!Tm) {
var a=Tm=[];
for(var b=0;b<Um[o];b++)a.push(Sm[Um[b]])
}return Tm
},
bn=function (a) {
if(a<0)return Ym;
if(a==Zm())return Vm;
if(a>Sm[o])return Vm;
return Sm[a-1]
},cn=function (a) {
for(var b=0;b<Sm[o];b++)if(Sm[b].hb(a))return b+1;if(Vm.hb(a))return Zm();return $m()
};var dn=function (a) {
var b=undefined;
if(fm(a)&&a.url!=null&&a.scope!=null&&a[km]!=null)b=new lm(a);
else if(fm(a)&&a[gm]!=null)b=new hm(a);
else if(fm(a))b=new am(a);
return b
};
var fn=function (a) {
this.url=a.url||C;
this.width=a.width||0;
this.height=a.height||0;
this.sizeId=en(this.qW(),this.fV())
};
fn[_P].mf=function () {
return this.url
};
fn[_P].qW=function () {
return this.width
};
fn[_P].fV=function () {
return this.height
};
fn[_P].$V=function () {
return this.sizeId
};
var gn="x",en=function (a,b) {
return kg(a,gn,b)
};
var hn=function (a) {
this.email=a.email;
this.name=a.name;
this.count=a.count;
this.hosted=a.hosted?true:false;
this.me=a.me?true:false;
vl.call(this,this,this.l())
};
A(hn,vl);
hn[_P].Ja=null;
var jn=function (a) {
var b=[];
for(var c=0;a&&c<a[o];c++)b.push(new hn(a[c]));return b
},kn="h@";hn[_P].l=function () {
return this.Ja||(this.Ja=(this.Np()?kn:C)+this.Va())
};
hn[_P].Va=function () {
return this.email
};
hn[_P].q=function () {
return this.name
};
var ln="me";
hn[_P].S=function () {
var a=z(ln);
return this.lB()?a:this.q()
};
hn[_P].D=function () {
return this.count
};
hn[_P].Np=function () {
return this.hosted
};
hn[_P].lB=function () {
return this.me
};
var mn=" <";
ra(hn[_P],function () {
return this.q()+mn+this.Va()+Zf
});
hn[_P].hb=function (a) {
return this.q()==a.q()&&this.Va()==a.Va()&&this.Np()==a.Np()&&this.lB()==a.lB()
};
var nn=function (a,b) {
return b.D()-a.D()
};
var I=function (a,b) {
this.serviceId=a.serviceId;
this.mimeType=a.mimeType;
this.sourceId=a.sourceId;
this.instanceId=a.id;
this.delta=a.delta||false;
var c=this.KK();
this.name=a.name||(c?undefined:C);
this[on]=pn(a[on]||[]);
this.myRole=a.myRole;
this.owners=jn(a.owners);
this[qn]=jn(a[qn]);
this.viewers=jn(a.viewers);
this.sharedHtml=a.sharedHtml||null;
this[rn]=a[rn]||null;
this[sn]=a[sn]||null;
this[tn]=a[tn]||null;
this[un]=a[un]||null;
this[vn]=a[vn]?new hn(a[vn]):null;
this[wn]=a[wn]||null;
var d={
},e=a.actions;
if(e)for(var f=0;f<e[o];f++) {
var g=e[f],h=dn(g),j=h.Yg(),k=d[j];
if(!k)k=[];
k.push(h);
d[j]=k
}this.actions=d;
var m={
},p=a[xn];
if(p)for(var q in p) {
var t=p[q];
if(typeoft==Wd)t={
	id:q,name:q,value:t
};
var w=new sm(t);
m[w.l()]=w
}this[xn]=m;
if(!c)for(var $ in yn)this.h3(yn[$]);this[zn]=Xc(a[zn])?a[zn]:0;this[An]=Xc(a[An])?a[An]:(c?undefined:C);this[Bn]=a[Bn]||[];this.stub=a.stub||b;this[Cn]={
};
this[Dn]=a[Dn];
this[En]=a[En];
this[Fn]=a[Fn];
this[Gn]=a[Gn]||(c?undefined:0);
this[Hn]=a[Hn]||0;
this[In]=a[In]||
[];
this[Jn]=a[Jn]||[];
vl.call(this,this,this.l())
};
A(I,vl);
var Kn=function (a,b) {
var c=[];
if(a)for(var d=0;d<a[o];d++)c.push(new I(a[d],b));return c
};I[_P].Ja=null;I[_P].e1=null;var qn="collaborators",rn="lastEditedText",sn="lastEditedUtc",tn="lastViewedByMeText",un="lastViewedByMeUtc",En="lastSyncedText",Dn="lastSyncedUtc",vn="lastCollaborator",wn="activationUtc",xn=zc,zn="nChildren",An="description",Bn="parents",Cn="knownChildren",Fn="requiresSync",Gn=Kb,Hn="nChildrenDelta",In="addedParents",Jn=
"removedParents",on="thumbnails",Ln="starred",Mn="published",Nn="hidden",On="collaboratorsCanInvite",Pn="active",Qn="shared",Rn="mine",Sn="openInvites",Tn=Ln,Un="trashed",Vn=Mn,Wn="deleted",Xn=Nn,Yn="synced_gears",Zn="syncable_gd",$n="shareable",ao=On,yn={
C6:Pn,c7:Tn,E6:"archived",g7:Un,X6:Qn,U6:Vn,G6:"blogged",O6:Rn,J6:Wn,N6:Xn,e7:Yn,d7:Zn,W6:$n,H6:ao,S6:Sn
};
var co=function (a) {
var b=a.split(Vc);
return bo(b[0],ce,b[1])
},bo=function (a,b,c) {
return kg(a,Vc,b,Vc,c)
};
I[_P].l=function () {
return this.Ja||
(this.Ja=bo(this.Yc(),this.Zt(),this.ap()))
};
I[_P].Yc=function () {
return this.serviceId
};
I[_P].jf=function () {
return this.mimeType
};
I[_P].Zt=function () {
return this.sourceId
};
I[_P].ap=function () {
return this.instanceId
};
I[_P].q=function () {
return this.name
};
I[_P].gW=function () {
return this[on]
};
I[_P].fW=function (a,b) {
return this.gW().o(en(a,b))
};
I[_P].S3=function (a) {
this.name=a
};
I[_P].VI=function () {
return this.myRole
};
I[_P].Kj=function () {
return this.owners
};
I[_P].Nl=function () {
return this[qn]
};
I[_P].Zl=
function () {
return this.viewers
};
I[_P].Nz=function () {
return this[rn]
};
I[_P].Mt=function () {
return this[sn]
};
I[_P].SI=function () {
return this[tn]
};
I[_P].dp=function () {
return this[un]
};
I[_P].Oz=function () {
return this[En]
};
I[_P].lV=function () {
return this[Dn]
};
I[_P].cp=function () {
return this[vn]
};
I[_P].uI=function () {
return this[wn]
};
I[_P].Xg=function (a) {
return this.actions[a]
};
I[_P].ki=function () {
var a=Xg(this.actions),b=[];
for(var c=0;c<a[o];c++)b=b.concat(a[c]);return b
};I[_P].oz=function () {
return Xg(this[xn])
};
I[_P].getAttribute=function (a) {
return this[xn][a]
};
I[_P].c3=function (a,b) {
this[xn][a]=b
};
I[_P].Vz=function () {
return this[zn]
};
I[_P].CO=function (a) {
this[zn]=a
};
I[_P].Dt=function () {
return this[An]
};
I[_P].p3=function (a) {
this[An]=a
};
I[_P].hJ=function () {
return this[Fn]
};
I[_P].gf=function () {
return this[Gn]
};
I[_P].g3=function (a) {
this[Gn]=a
};
I[_P].sz=function () {
return bn(this.gf())
};
I[_P].Id=function () {
return this[Bn]
};
I[_P].gZ=function (a) {
return Oe(this.Id(),a)
};
I[_P].kK=function () {
return this.Id()[o]>0
};
I[_P].VK=function () {
return this.stub
};
I[_P].KK=function () {
return this.delta
};
I[_P].aJ=function () {
return this[Hn]
};
I[_P].vI=function () {
return this[In]
};
I[_P].fJ=function () {
return this[Jn]
};
I[_P].h3=function (a) {
if(!this.getAttribute(a)) {
var b={
	id:a,name:a,value:false
};
this.c3(a,new sm(b))
}
};
I[_P].rJ=function () {
return this.Kj()[o]+this.Nl()[o]+this.Zl()[o]-1
};
I[_P].h_=function (a) {
return this.UE(this.Kj(),a)||this.UE(this.Nl(),a)||this.UE(this.Zl(),a)
};
I[_P].UE=function (a,b) {
for(var c=0;c<a[o];c++)if(a[c].Va()==
b)return true;return false
};I[_P].oQ=function (a) {
return this.q()!=a.q()||this.gf()!=a.gf()
};
I[_P].YP=function (a) {
this.name=a.name;
if(this[Gn]!=a[Gn]) {
this[Gn]=a[Gn];
this.e1=null
}
};
I[_P].q6=function (a) {
if(a.q())this.name=a.q();
var b=a.oz();
if(b[o]>0)for(var c=0;c<b[o];c++)this[xn][b[c].l()]=b[c];if(a.aJ())this[zn]=l.max(this[zn]+a.aJ(),0);if(a.Dt())this[An]=a.Dt();var d=new Ej(this.Id());if(a.vI()[o]>0)d.Ue(a.vI());if(a.fJ()[o]>0)d.vc(a.fJ());this[Bn]=d.ca();if(Xc(a.gf())&&this.gf()!=a.gf())this[Gn]=
a.gf()
};I[_P].jS=function (a) {
var b=a.oz(),c={
};
for(var d=0;d<b[o];d++)c[b[d].l()]=b[d].H_();this[xn]=c;this[Bn]=Ue(a.Id())
};I[_P].I3=function (a) {
this[Cn]=a
};
I[_P].Lt=function () {
return this[Cn]
};
I[_P].NQ=function (a) {
sf(this.Lt(),a,a)
};
I[_P].b2=function (a) {
pf(this.Lt(),a)
};
I[_P].Yl=function () {
var a={
};
a[Dn]=this.lV();
a[En]=this.Oz();
a[Fn]=this.hJ();
return a
};
I[_P].RO=function (a) {
var b=false;
if(a&&a[Dn]) {
this[Dn]=a[Dn];
this[En]=a[En];
this[Fn]=a[Fn];
b=true
}var c={
id:Yn,name:Yn,value:b
},d=new sm(c);
this[xn][d.l()]=
d
};
ra(I[_P],function () {
return this.q()
});
I[_P].cd=function () {
var a={
};
a.id=this.l();
a.name=this.q();
a[An]=this.Dt();
a[Bn]=this.Id();
a[Gn]=this.gf();
var b={
},c=this.oz();
for(var d=0;d<c[o];d++) {
var e=c[d],f=e.l();
switch(f) {
	case Tn:case Un:case Wn:case Xn:case $n:b[e.l()]=e.p();
	break;
	default:break
}
}a[xn]=b;
return Vd(a)
};
I[_P].e=function () {
I.b.e.call(this)
};
var pn=function (a) {
var b=new D;
for(var c=0;c<a[o];c++) {
var d=new fn(a[c]);
b.k(d.$V(),d)
}return b
},eo=function (a,b) {
return b.Mt()-a.Mt()
},fo=function (a,
b) {
return b.dp()-a.dp()
},go=function (a,b) {
return b.uI()-a.uI()
},ho=function (a,b) {
var c=a.getAttribute(Tn).p(),d=b.getAttribute(Tn).p();
return c&&d||!c&&!d?eo(a,b):(c?-1:1)
};
var io=function (a) {
zj.call(this,a);
if(this.qe) {
var b=a.response;
this.Rg=Kn(b.docs||[]);
this.rM=Kn(b.parents||[],true);
this.Nd=b.resultsCount;
this.cF=b.actionInfo||{
}
}
};
A(io,zj);
io[_P].K=function () {
return 3
};
io[_P].Hb=function () {
return this.Rg
};
io[_P].Id=function () {
return this.rM
};
io[_P].jJ=function () {
return this.Nd
};
io[_P].e=function () {
io.b.e.call(this);
this.Rg=null;
this.rM=null;
this.cF=null
};
var jo=function (a) {
return new io(a)
};
Dj(3,jo);
var ko="services",lo="mimeTypes",mo="mimeTypeSets",no="sources",oo="star",po="viewed",qo="containers",ro="orphans",so="parent",to="email",uo="named",vo="private",wo="sharedWithDomain",xo="shareFilters",yo="dateFilter",zo="hosted",Ao="defaultRequest",Bo="path",Co=function (a,b) {
uj.call(this,b);
this.Dg=a;
this.tg=Ph(b,ko);
this.Bf=Ph(b,lo);
this.ti=Ph(b,mo);
this.gd=Ph(b,no);
var c=Ph(b,oo);
this.Tk=jd(c)?c:2;
var d=Ph(b,Nn);
this.Ke=jd(d)?d:1;
var e=Ph(b,po);
this.Lh=jd(e)?e:2;
var f=Ph(b,Rn);
this.vh=jd(f)?f:
2;
var g=Ph(b,Mn);
this.vk=jd(g)?g:2;
var h=Ph(b,qo);
this.Wh=jd(h)?h:2;
var j=Ph(b,ro);
this.lg=jd(j)?j:2;
this.X=Ph(b,so);
this.fi=Ph(b,to);
this.hk=Ph(b,uo);
var k=Ph(b,vo);
this.Ci=jd(k)?k:2;
var m=Ph(b,wo);
this.Ui=jd(m)?m:2;
this.Rk=Ph(b,xo);
this.Zh=Ph(b,yo);
this.Gp=Ph(b,zo);
this.v7=Ph(b,Ao);
this.Sa=Ph(b,Bo);
var p={
};
if(b)pf(b,Ao);
p.view=a;
p.opt_opts=b;
this.UN=p
};
A(Co,uj);
var Do="vr",Mo=new G(Do);
Co[_P].Lc=function () {
return Mo
};
Co[_P].K=function () {
return 3
};
Co[_P].Ca=function (a) {
var b=this.UN,c=b.opt_opts;
if(c) {
c=vf(c);
if(a)jf(a,function (d,e) {
	c[e]=d
})
}else c=a;
return new Co(b.view,c)
};
Co[_P].cd=function () {
return Vd(this.UN)
};
var No=function (a) {
try{
var b=Rd(a);
if(b&&b.view)return new Co(b.view,b.opt_opts)
}catch(c) {
}return null
};
Co[_P].sd=function () {
return this.Dg
};
Co[_P].kf=function () {
return this.Bf
};
Co[_P].mp=function () {
var a;
switch(this.Kf) {
case 0:a=go;
break;
case 3:a=eo;
break;
case 6:a=fo;
break;
case 5:a=ho;
break;
case 1:case 2:default:break
}var b;
b=a&&!this.so?function (c,d) {
return a(c,d)*-1
}:a;
return b
};
Co[_P].Lu=function (a,b) {
switch(this.Kf) {
case 2:var c=a.Kj(),d=b.Kj();
if(c[o]==d[o]) {
	for(var e=0;e<c[o];e++)if(!c[e].hb(d[e]))return false;return true
}else return false;case 1:return a.q()==b.q();default:return Co.b.Lu.call(this,a,b)
}
};Co[_P].J=function () {
return this.X
};
Co[_P].Nk=function (a) {
this.X=a;
this.eB()
};
Co[_P].Va=function () {
return this.fi
};
Co[_P].Xc=function () {
return this.Sa
};
var Oo="view";
Co[_P].oc=function () {
var a=Co.b.oc.call(this);
a.k(Oo,this.Dg);
Oh(a,ko,this.tg);
Oh(a,lo,this.Bf);
Oh(a,
mo,this.ti);
Oh(a,no,this.gd);
Oh(a,so,this.X);
Oh(a,to,this.fi);
Oh(a,zo,this.Gp);
Oh(a,Bo,this.Sa);
Oh(a,Nn,this.Ke);
Oh(a,oo,this.Tk);
Oh(a,Rn,this.vh);
Oh(a,Mn,this.vk);
Oh(a,qo,this.Wh);
Oh(a,ro,this.lg);
Oh(a,po,this.Lh);
Oh(a,uo,this.hk);
Oh(a,vo,this.Ci);
Oh(a,wo,this.Ui);
Oh(a,xo,this.Rk?Vd(this.Rk):this.Rk);
Oh(a,yo,this.Zh?Vd(this.Zh):this.Zh);
return a
};
var Po="vr?",Qo=function (a) {
if(Bf(a,Po))return a.slice(3);
return a
},Ro="mimeTypeSet",So=function (a) {
var b=Qo(a),c=b.split(Xf),d=new D;
for(var e=0;e<c[o];e++) {
var f=
c[e].split(zh);
d.k(f[0],Pf(fa(f[1])))
}var g=d.Nc(),h=2,j={
};
for(var e=0;e<g[o];e++) {
var k=g[e];
if(d.Da(k)) {
	var m=d.o(k);
	switch(k) {
		case Oo:h=ha(m);
		break;
		case mc:j[k]=ha(m);
		break;
		case ko:case lo:case Ro:case no:j[k]=m.split(Kd);
		break;
		case xo:case yo:try{
			j[k]=Rd(m)
		}catch(p) {
			j[k]=undefined
		}break;
		case oj:case sj:case zo:case Ao:j[k]=m.toLowerCase()==Zj;
		break;
		case Nn:var q=ha(m);
		j[k]=jd(q)?q:1;
		break;
		case po:case oo:case Rn:case Mn:case qo:case ro:case vo:case wo:var q=ha(m);
		j[k]=jd(q)?q:2;
		break;
		default:j[k]=
		m;
		break
	}
}
}return new Co(h,j)
},To=function (a) {
var b=null;
switch(a) {
case 1:b=false;
break;
case 0:b=true;
break;
default:break
}return b
};
Co[_P].RF=function (a) {
var b=this.Dg;
if(a.getAttribute(Wn).p())return true;
var c=a.getAttribute(Un).p(),d=a.getAttribute(Xn).p(),e=this.Ke;
if(b!=1&&c)return true;
else if(b==1&&!c)return true;
else if(d&&e==1)return true;
else if(!d&&e==0)return true;
else if(this.X&&!Oe(a.Id(),this.X))return true;
else if(this.lg==0&&a.kK())return true;
return false
};
Co[_P].si=function (a,b) {
if(a==
1&&b)return false;
else if(a==0&&!b)return false;
return true
};
Co[_P].TK=function (a,b,c,d,e) {
if(this.rd()&&!d)return false;
if(this.hk&&!e||this.Zh||this.Rk||this.Ui&&this.Ui!=2)return false;
if(a.VK())return false;
if(a.getAttribute(Wn).p())return false;
var f=this.fi;
if(f&&!a.h_(f))return false;
var g=this.X;
if(g&&!a.gZ(g))return false;
var h=a.getAttribute(Vn).p(),j=this.vk;
if(!this.si(j,h))return false;
var k=a.getAttribute(Rn).p(),m=this.vh;
if(!this.si(m,k))return false;
var p=a.getAttribute(Tn).p(),q=
this.Tk;
if(!this.si(q,p))return false;
var t=a.getAttribute(Xn).p(),w=this.Ke;
if(!this.si(w,t))return false;
var $=jd(a.dp()),za=this.Lh;
if(!this.si(za,$))return false;
var ka=!a.getAttribute(Qn).p()&&!a.getAttribute(Vn).p(),ic=this.Ci;
if(!this.si(ic,ka))return false;
var zb=!a.kK(),Fd=this.lg;
if(!this.si(Fd,zb))return false;
var sd=Oe(b,a.jf()),ff=this.Wh;
if(!this.si(ff,sd))return false;
var ue=false;
switch(this.Dg) {
case 0:if(!a.getAttribute(Pn).p())ue=true;
break;
case 1:if(!a.getAttribute(Un).p())ue=true;
break;
case 2:if(a.getAttribute(Un).p())ue=true;
break;
default:break
}if(ue)return false;
var ed=this.tg;
if(ed&&ed[o]>0)if(!Oe(ed,a.Yc()))return false;
var Ef=this.Bf;
if(Ef&&Ef[o]>0||c&&c[o]>0)if(!Ef||!Oe(Ef,a.jf()))if(!c||!Oe(c,a.jf()))return false;
var kh=this.gd;
if(kh&&kh[o]>0)if(!Oe(kh,a.Zt()))return false;
return true
};
Co[_P].ph=function (a,b) {
if(a!=2&&b!=2)if(a!=b)return true;
return false
};
Co[_P].nB=function (a,b) {
if(a&&a[o]>0&&b&&b[o]>0) {
var c=false;
for(var d=0;d<a[o]&&!c;d++)if(Oe(b,a[d]))c=true;if(!c)return true
}return false
};
Co[_P].RK=function (a,b) {
var c=a.lg,d=a.J();
if(this.X&&c==0||d&&this.lg==0)return true;
var e=this.Dg,f=a.sd();
if(e==3||f==3)return false;
if(e!=f&&(e!=2&&f!=2||e==1||f==1))return true;
if(this.ph(this.Ke,a.Ke))return true;
if(this.ph(this.Lh,a.Lh))return true;
if(this.ph(this.Tk,a.Tk))return true;
if(this.ph(this.vk,a.vk))return true;
if(this.ph(this.vh,a.vh))return true;
if(this.ph(this.Ci,a.Ci))return true;
if(this.ph(this.Ui,a.Ui))return true;
if(this.ph(this.Wh,a.Wh))return true;
if(this.ph(this.lg,a.lg))return true;
if(this.nB(this.tg,a.tg))return true;
var g=this.Bf,h=a.kf();
if(this.nB(g,h))return true;
if(this.nB(this.gd,a.gd))return true;
if(this.Wh==1)if(h&&h[o]>0) {
var j=false;
for(var k=0;k<h[o]&&!j;k++)if(!Oe(b,h[k]))j=true;if(!j)return true
}if(a.Wh==1)if(g&&g[o]>0) {
var j=false;
for(var k=0;k<g[o]&&!j;k++)if(!Oe(b,g[k]))j=true;if(!j)return true
}return false
};Co[_P].ZZ=function () {
if(!this.X)return false;
var a=new Co(2,{
parent:this.X,hidden:2
});
return this.hb(a)
};
Co[_P].hb=function (a) {
return Co.b.hb.call(this,
a)&&this.Dg==a.sd()&&Uo(this.tg||[],a.tg||[])&&Uo(this.Bf||[],a.kf()||[])&&Uo(this.ti||[],a.ti||[])&&Uo(this.gd||[],a.gd||[])&&this.Tk==a.Tk&&this.Ke==a.Ke&&this.Lh==a.Lh&&this.X==a.J()&&this.fi==a.Va()&&this.Gp==a.Gp&&this.vh==a.vh&&this.vk==a.vk&&this.Wh==a.Wh&&this.lg==a.lg&&this.Cv==a.rd()&&this.Sa==a.Xc()&&this.hk==a.hk&&this.Ci==a.Ci&&this.Ui==a.Ui&&Vo(this.Zh||{
},a.Zh||{
})&&Uo(this.Rk||[],a.Rk||[],Wo,true)
};
var Uo=function (a,b,c,d) {
if(!d) {
Ze(a);
Ze(b);
return af(a,b,c)
}if(!ld(a)||!ld(b)||a[o]!=
b[o])return false;
return Xo(a,b,c)&&Xo(b,a,c)
},Xo=function (a,b,c) {
var d=c||$e,e=a[o],f=b[o];
for(var g=0;g<e;g++) {
var h=a[g],j=false;
for(var k=0;k<f;k++)if(d(h,b[k])) {
	j=true;
	break
}if(!j)return false
}return true
},Vo=function (a,b,c) {
if(!qd(a)||!qd(b))return false;
var d=c||Yo;
for(var e in a)if(!d.call(null,a[e],b[e]))return false;for(var e in b)if(!d.call(null,b[e],a[e]))return false;return true
},Yo=function (a,b) {
return a===b
},Wo=function (a,b) {
if(!qd(a)||!qd(b))return false;
return a.emails===b.emails&&
Uo(a.shareTypes||[],b.shareTypes||[])
},Zo=function (a) {
return new Co(a.view,a)
};
Xh(3,Zo);
var bp=function (a) {
this.type=a.type;
this.name=a.name;
this.iconUrl=a.iconUrl;
this.iconLargeUrl=a.iconLargeUrl||a.iconUrl;
this[$o]=Xc(a[$o])?a[$o]:false;
this[ap]=Xc(a[ap])?a[ap]:false;
vl.call(this,this,Of(this.Ia()))
};
A(bp,vl);
var $o="container",ap="syncableContents";
bp[_P].Ia=function () {
return this.type
};
bp[_P].l=function () {
return this.Ia()
};
bp[_P].q=function () {
return this.name
};
bp[_P].Ie=function () {
return this.iconUrl
};
bp[_P].ig=function () {
return this[$o]
};
bp[_P].Ep=function () {
return this[ap]
};
var cp=function (a) {
this.id=a.id;
this.name=a.name;
this.iconUrl=a.iconUrl||null;
this.iconLargeUrl=a.iconLargeUrl||a.iconUrl||null;
this.mimetypes=a.mimetypes;
vl.call(this,this,this.l())
};
A(cp,vl);
cp[_P].l=function () {
return this.id
};
cp[_P].q=function () {
return this.name
};
cp[_P].Ie=function () {
return this.iconUrl
};
cp[_P].kf=function () {
return this.mimetypes
};
var dp=function (a) {
this.id=a.id;
vl.call(this,{
},this.l())
};
A(dp,vl);
dp[_P].l=function () {
return this.id
};
var kp=function (a) {
this.id=a.id;
this.name=a.name;
this.iconUrl=a.iconUrl;
this.iconLargeUrl=a.iconLargeUrl||a.iconUrl||null;
this.baseUrl=a.baseUrl||null;
this[ep]=a[ep]||false;
var b=new Ej;
this.Bf=b;
var c=[],d=new D,e=new D,f=this.l(),g=a[fp];
if(g)for(var h=0;h<g[o];h++) {
var j=g[h],k=dn(j);
k.j4(f);
b.Ue(k.dW());
c.push(k);
var m=k.Yg(),p=d.o(m)||[];
p.push(k);
d.k(m,p);
var q=k.kp(),t=e.o(q)||[];
t.push(k);
e.k(q,t)
}this[fp]=c;
this.Qx=d;
this.ZC=e;
this[gp]=a[gp]||false;
this.syncWorkerUrl=a.syncWorkerUrl||null;
this.captureWorkerUrl=a.captureWorkerUrl||null;
this[hp]=a[hp]||null;
this[ip]=a[ip]||{
};
this[jp]=a[jp]||false;
vl.call(this,this,this.l())
};
A(kp,vl);
var ep="contentAccess",fp="actions",ip="mimeTypeIcons",jp="serviceDefaultIcon",gp=bm,hp="cookieFetchUrl";
kp[_P].l=function () {
return this.id
};
kp[_P].q=function () {
return this.name
};
kp[_P].Ie=function () {
return this.iconUrl
};
kp[_P].CI=function () {
return this[ep]
};
kp[_P].kf=function () {
return this.Bf.ca()
};
kp[_P].isSupported=function (a) {
return this.Bf.contains(a)
};
kp[_P].ki=function () {
return this[fp]
};
kp[_P].xU=function (a) {
return this.Qx.o(a)
};
kp[_P].nJ=function (a) {
return this.ZC.o(a)
};
kp[_P].Vt=function (a,b,c) {
var d=this.xU(c);
if(d)for(var e=0;e<d[o];e++) {
var f=d[e];
if(f.kp()==a&&f.isSupported(b))return f
}return null
};
kp[_P].sV=function (a) {
return this[ip][a]||null
};
kp[_P].l_=function () {
return this[jp]
};
kp[_P].Iu=function () {
return this[gp]
};
kp[_P].KU=function () {
return this[hp]
};
kp[_P].e=function () {
kp.b.e.call(this);
var a=this[fp];
for(var b=0;b<a[o];b++)a[b].j();
this[fp]=null;this.Qx.clear();this.Qx=null;this.ZC.clear();this.ZC=null
};var lp="protected",mp=function (a) {
this.id=a.id;
this.name=a.name;
this.value=a.value;
this[lp]=Xc(a[lp])?a[lp]:false;
vl.call(this,this,this.l())
};
A(mp,vl);
mp[_P].l=function () {
return this.id
};
mp[_P].q=function () {
return this.name
};
mp[_P].p=function () {
return this.value
};
var np=function (a) {
var b=new Ej;
b.Ue(a.serviceIds);
this.V2=b;
this.sourceId=a.sourceId;
this.name=a.name;
var c={
},d=a.credentials;
if(d)for(var e=0;e<d[o];e++) {
var f=d[e],g=new mp(f);
c[g.l()]=g
}this.credentials=c;
vl.call(this,this,this.l())
};
A(np,vl);
np[_P].l=function () {
return this.sourceId
};
np[_P].q=function () {
return this.name
};
np[_P].q_=function (a) {
return this.V2.contains(a)
};
var op="$Services",pp=function () {
vl.call(this,{
},op);
gl().Nh(this)
};
A(pp,vl);
pp[_P].pw=function (a) {
for(var b=0;b<a[o];b++)this.i4(a[b])
};pp[_P].i4=function (a) {
this.se(a.l(),a)
};
var qp="$Sources",rp=function () {
vl.call(this,{
},qp);
gl().Nh(this)
};
A(rp,vl);
rp[_P].qw=function (a) {
for(var b=0;b<a[o];b++)this.m4(a[b])
};rp[_P].m4=function (a) {
this.se(a.l(),a)
};
var tp=function () {
vl.call(this,{
},sp);
gl().Nh(this)
};
A(tp,vl);
var sp="$MimeTypes";
tp[_P].jw=function (a) {
for(var b=0;b<a[o];b++)this.P3(a[b])
};tp[_P].P3=function (a) {
this.se(Of(a.Ia()),a)
};
var up="$MimeTypeSets",vp=function () {
vl.call(this,{
},up);
gl().Nh(this)
};
A(vp,vl);
vp[_P].iw=function (a) {
for(var b=0;b<a[o];b++)this.Q3(a[b])
};vp[_P].Q3=function (a) {
this.se(Of(a.l()),a)
};
var wp=function (a) {
vl.call(this,[],a.T());
this.oa=a
};
A(wp,vl);
wp[_P].Nd=0;
wp[_P].ua=function () {
return this.oa
};
wp[_P].ue=function (a) {
for(var b=0;b<a[o];b++)this.Oi(a[b]);var c=this.pb().D();if(c>this.Nd)this.Nd=c
};wp[_P].Oi=function (a) {
this.se(a.l(),a)
};
wp[_P].jJ=function () {
return this.Nd
};
wp[_P].c4=function (a) {
this.Nd=a
};
wp[_P].Dp=function (a) {
return wp.b.Dp.call(this,l.min(this.Nd,a))
};
wp[_P].GC=function (a) {
var b=this.ta(a);
wp.b.GC.call(this,a);
if(b)this.Nd--
};
var yp=function () {
vl.call(this,{
},xp);
gl().Nh(this)
};
A(yp,vl);
var xp="$Documents";
yp[_P].ue=function (a) {
for(var b=0;b<a[o];b++)this.Oi(a[b])
};yp[_P].Oi=function (a) {
this.se(a.l(),a)
};
var zp="$People",Ap=function () {
vl.call(this,{
},zp);
gl().Nh(this)
};
A(Ap,vl);
Ap[_P].KD=function (a) {
for(var b=0;b<a[o];b++)this.Y3(a[b])
};Ap[_P].Y3=function (a) {
this.se(a.l(),a)
};
var Bp="$Preferences",Cp=function () {
vl.call(this,{
},Bp);
gl().Nh(this)
};
A(Cp,vl);
Cp[_P].mw=function (a) {
var b=[],c=[];
for(var d=0;d<a[o];d++) {
var e=a[d];
if(e.CJ==Cl)b.push(e);
else c.push(e)
}for(var d=0;d<b[o];d++)this.FO(b[d]);for(var d=0;d<c[o];d++)this.FO(c[d])
};Cp[_P].FO=function (a) {
var b=a.CJ,c=Dp(b),d=a.l(),e=Ep(b,d);
if(!e||e.p()!=a.p())if(!Hf(a.p()))c.se(d,a);
if(Hf(a.p())&&e)c.se(d,null)
};
Cp[_P].IV=function (a) {
return Dp(a.wq)
};
var Dp=function (a) {
var b=gl().be(Bp),c=b.ta(a);
if(!c) {
var d={
	id:a
};
c=new dp(d);
b.se(c.l(),c)
}return c
},Ep=function (a,b) {
return Dp(a).ta(b)
};
var Fp="$Doclists",Gp=function () {
vl.call(this,{
},Fp);
gl().Nh(this)
};
A(Gp,vl);
Gp[_P].SU=function (a) {
if(!a)return null;
var b=this.ta(a.T());
if(!b) {
b=new wp(a);
this.se(a.T(),b)
}return b
};
var Hp=function () {
this.ud=[]
};
Hp[_P].P=null;
Hp[_P].ol=false;
Hp[_P].Eh=function (a) {
this.P=a
};
Hp[_P].Kq=function (a) {
this.ol=a
};
Hp[_P].nh=function () {
return this.ol
};
Hp[_P].AF=function (a) {
this.ud.push(a)
};
Hp[_P].tF=function (a) {
if(a)this.ud=this.ud.concat(a.ud)
};
Hp[_P].k2=function (a) {
this.ud=a.ud;
this.ol=a.nh();
this.P=a.P
};
Ua(Hp[_P],function () {
this.ud=[];
this.P=null;
this.ol=false
});
Hp[_P].Fz=function () {
return this.ud[0]||null
};
Hp[_P].Qa=function () {
return this.ud[o]==0
};
Hp[_P].Ca=function () {
var a=new Hp;
if(this.ud)a.ud=Ue(this.ud);
a.P=this.P;
a.ol=this.ol;
return a
};
var Ip=function (a,b) {
var c=new Hp;
c.Kq(a.nh());
c.Eh(a.P);
if(!a.Qa()) {
var d=a.ud,e=b?Fe(d,b):d[o]-1;
c.ud=d.slice(0,e)
}return c
};
var Jp=function () {
this.Vd=[]
};
Jp[_P].qf=0;
Jp[_P].Xi=0;
Jp[_P].Aj=function (a) {
this.Vd[this.Xi++]=a
};
Jp[_P].$h=function () {
if(this.qf==this.Xi)return undefined;
var a=this.Vd[this.qf];
delete this.Vd[this.qf];
this.qf++;
return a
};
Jp[_P].peek=function () {
if(this.qf==this.Xi)return undefined;
return this.Vd[this.qf]
};
Jp[_P].D=function () {
return this.Xi-this.qf
};
Jp[_P].Qa=function () {
return this.Xi-this.qf==0
};
Ua(Jp[_P],function () {
this.Vd=[];
this.qf=0;
this.Xi=0
});
Sa(Jp[_P],function () {
return Zg(this.Vd)
});
La(Jp[_P],
function (a) {
var b=Fe(this.Vd,a);
if(b<0)return false;
if(b==this.qf)this.$h();
else {
Se(this.Vd,b);
this.Xi--
}return true
});
Jp[_P].ca=function () {
var a=[];
for(var b=this.qf;b<this.Xi;b++)a.push(this.Vd[b]);return a
};var Kp=function () {
return gl().be(op).pb()
},Lp=function (a) {
return gl().be(op).ta(a)
},Mp=function (a) {
return gl().be(sp).ta(Of(a))
};
var Np=function (a) {
return gl().be(xp).ta(a)
},Op=function (a) {
var b=[],c=gl().be(xp);
for(var d=0;d<a[o];d++)b.push(c.ta(a[d]));return b
},Pp=function (a) {
return Lp(a.Yc())
},Qp=function (a) {
var b=new D;
for(var c=0;c<a[o];c++) {
var d=Pp(a[c]);
b.k(d.l(),d)
}return b.ca()
},Rp=function (a) {
return Mp(a.jf())
},Sp=function (a) {
var b=Pp(a),c=Rp(a),d=b.sV(c.Ia());
if(!d)d=b.l_()?b.Ie():c.Ie();
return d
},Tp=function (a) {
var b=[],c=Kp(),d=c.D();
for(var e=0;e<d;e++) {
var f=c.yb(e);
if(f.isSupported(a))b.push(f)
}return b
},Up="owned",Vp=function (a,b,c) {
var d=c||Up,e=a.Ia(),f=Tp(e)[0];
if(f==null)return false;
var g=f.Vt(d,e,b);
return g?true:false
},Wp=function (a) {
var b=[],c=gl().be(qp).pb(),d=c.D();
for(var e=0;e<d;e++) {
var f=c.yb(e);
if(f.q_(a))b.push(f)
}return b
},Xp=function (a) {
var b=[];
for(var c=0;c<a[o];c++)b.push(a[c].ap());return b
},Yp=function (a) {
var b=Rp(a);
return b&&b.ig()
},Zp=function () {
var a=
new Xk(sp),b=a.$I().pb(),c=[],d=b.D();
for(var e=0;e<d;e++) {
var f=b.yb(e);
if(f.ig())c.push(f)
}return c
},$p=function () {
return Zp()[0]
};
var aq=function (a) {
var b=a.split(qh);
if(b[o]>0) {
var c=gl().be(b[0]);
for(var d=1;d<b[o]&&c;d++)c=c.ta(b[d]);return c
}return null
},bq=function (a) {
return Dp(a)
},cq=function (a,b) {
return Ep(a,b)
},dq="trash",eq="root",fq=function (a,b,c,d) {
var e=new Hp,f=a;
while(c.Da(f)) {
e.AF(f);
f=c.o(f)
}if(d) {
var g=e.Fz()||b,h=Np(g);
if(h) {
	var j;
	j=h.getAttribute(Un).p()?dq:(h.getAttribute(Xn).p()?
	Nn:eq);
	e.Eh(j)
}
}e.Kq(d);
return e
},gq=function (a) {
var b=false,c=new Ej,d=new Jp,e=new D;
d.Aj(a);
var f,g,h;
while(!d.Qa()) {
f=d.$h();
if(!c.contains(f)) {
	c.add(f);
	g=Np(f);
	if(g&&!g.VK()) {
		h=g.Id();
		if(h[o]==0) {
			b=true;
			break
		}else for(var j=0;j<h[o];j++)if(!c.contains(h[j])) {
			d.Aj(h[j]);
			if(!e.Da(h[j]))e.k(h[j],f)
		}
	}
}
}return fq(f,a,e,b)
},iq=function (a) {
if(!kd(a))return hq(a);
var b=[];
for(var c=0;c<a[o];c++)b.push(hq(a[c]));return b
},hq=function (a) {
var b=Wk(a,a.l());
b.jS(a);
return b
};
var jq="all",kq="other",lq="new",mq="open",oq=function (a) {
var b=[],c=[];
if(a&&a[o]==0)return [];
var d=new Ej;
for(var e=0;e<a[o];e++)d.add(Pp(a[e]));var f=d.ca();for(var e=0;e<f[o];e++)b=b.concat(f[e].ki());var g=Kp(),h=g.D();for(var e=0;e<h;e++) {
var j=g.yb(e);
if(!d.contains(j)) {
	var k=j.nJ(jq),m=j.nJ(kq);
	b=b.concat(k?k:[],m?m:[])
}
}if(a[o]==1&&a[0].ki()) {
var p=new D;
for(var e=0;e<b[o];e++) {
	var q=b[e],t=q.Yg(),w=p.o(t)||[];
	w.push(q);
	p.k(t,w)
}var $=a[0].ki();
for(var e=0;e<$[o];e++) {
	var za=$[e];
	p.k(za.Yg(),
	[za])
}b=[];
var ka=p.Nc();
for(var e=0;e<ka[o];e++) {
	var w=p.o(ka[e]);
	b=b.concat(w)
}
}for(var e=0;e<b[o];e++) {
var q=b[e];
if(q.Yg()!=lq&&q.Yg()!=mq&&nq(a,q))c.push(q)
}return c
},nq=function (a,b) {
var c=b.Qb(),d=c==2,e=c==1;
if(d)return true;
if(a[o]>1&&!b.mB())return false;
if(e) {
var f=b.kp(),g=b.Yc();
for(var h=0;h<a[o];h++) {
	var j=a[h],k=j.VI();
	if(b.tV()>k)return false;
	if(!b.isSupported(j.jf()))return false;
	var m=j.Yc();
	switch(f) {
		case Up:if(m!=g)return false;
		break;
		case kq:if(m==g||!Lp(m).CI())return false;
		break;
		case jq:if(m!=g&&!Lp(m).CI())return false;
		break
	}
}
}else {
if(a[o]==1) {
	var p=a[0].ki();
	for(var h=0;h<p[o];h++)if(p[h].hb(b))return true
}return false
}return true
};var pq=function (a) {
zj.call(this,a);
this.ey=a.confirmNeeded;
this.dy=a.confirmMessage;
var b=[];
if(this.qe) {
var c=a.response.docs;
if(c)for(var d=0;d<c[o];d++)b.push(new I(c[d]))
}this.Rg=b
};A(pq,zj);pq[_P].K=function () {
return 1
};
pq[_P].Hb=function () {
return this.Rg
};
var qq=function (a) {
return new pq(a)
};
Dj(1,qq);
var sq=function (a,b,c) {
Bh.call(this);
var d=od(a),e=d?a:(a.Qb()==2?a.Vo():null),f=b?(kd(b)?b:[b]):[],g;
if(f[o]>0&&nd(f[0])) {
g=f;
f=null
}else {
g=[];
for(var h=0;h<f[o];h++)g.push(f[h].l())
}this.Ic=e;this.En=d?null:a;this.Xf=f;this.Ce=g;var j=c||{
};
this.UD=j.shareAs;
var k=j.shareWith;
this.el=j.acls;
this.zw=nd(k)?k.split(Kd):k;
this.dD=j.sendEmail;
this.oE=j.subject||undefined;
this.jq=j.message||undefined;
this.Sx=j.ccSelf;
this.xa=Xc(j.value)?j.value:j.v;
this.Nv=Xc(j.sValue)?j.sValue:j.sv;
this.ZB=Xc(j.nValue)?
j.nValue:j.nv;
this.Pw=j.tags;
var m=j.addedFolders;
this.Oh=nd(m)?[m]:m||[];
m=j.removedFolders;
this.Ii=nd(m)?[m]:m||[];
m=j.unlink;
this.Ih=kd(m)?rq(m):m||new D;
m=j.link;
this.sh=kd(m)?rq(m):m||new D;
this.Gs=j.confirm;
if(Xc(j.displayStatus))this.uD(j.displayStatus);
this.Sa=j.path;
this.xr=false
};
A(sq,Bh);
var tq="ar",uq=new G(tq),rq=function (a) {
var b=new D;
for(var c=0;c<a[o];c++) {
var d=a[c].split(ih);
if(d[o]==2)vq(b,d[0],d[1])
}return b
},wq=function (a) {
var b=[];
bh(a,function (c,d) {
bh(c,function (e) {
	b.push(kg(d,
	ih,e))
})
});
return b
};
sq[_P].Lc=function () {
return uq
};
sq[_P].K=function () {
return 1
};
sq[_P].Qb=function () {
return this.Ic
};
sq[_P].Xg=function () {
return this.En
};
sq[_P].Hb=function () {
return this.Xf
};
sq[_P].p=function () {
return this.xa
};
sq[_P].getStringValue=function () {
return this.Nv
};
sq[_P].bO=function (a) {
this.Gs=a
};
sq[_P].Xc=function () {
return this.Sa
};
sq[_P].hG=function () {
var a=new sq(this.Ic);
a.En=this.En;
if(this.Xf)a.Xf=Ue(this.Xf);
if(this.Ce)a.Ce=Ue(this.Ce);
a.UD=this.UD;
if(this.zw)a.zw=Ue(this.zw);
if(this.el)a.el=vf(this.el);
a.dD=this.dD;
a.oE=this.oE;
a.jq=this.jq;
a.Sx=this.Sx;
a.xa=this.xa;
a.Nv=this.Nv;
a.ZB=this.ZB;
if(this.Pw)a.Pw=Ue(this.Pw);
if(this.Oh)a.Oh=Ue(this.Oh);
if(this.Ii)a.Ii=Ue(this.Ii);
if(this.sh)a.sh=this.sh.Ca();
if(this.Ih)a.Ih=this.Ih.Ca();
a.Gs=this.Gs;
a.uD(this.xl);
if(this.Sa)a.Sa=this.Sa.Ca();
a.xr=this.xr;
return a
};
sq[_P].Nx=function () {
var a=this.Ic;
if(a==0||a==2||a==10||a==8)return true;
if(a==0||a==2||a==10||a==16||a==8)return true;
return false
};
sq[_P].iW=function () {
var a=
this.Ic;
switch(a) {
case 2:case 2:return this.fu(Un);
case 10:case 10:return this.fu(Xn);
case 0:case 0:return this.fu(Tn);
case 16:case 16:return this.fu(Zn);
case 8:case 8:return this.zU();
default:return null
}
};
sq[_P].fu=function (a) {
var b=this.Xf,c=b[o],d=this.xa,e=[];
for(var f=0;f<c;f++) {
var g=b[f],h=g.getAttribute(a).p();
if(d&&!h||!d&&h)e.push(g.l())
}var j=this.hG();
j.xa=!d;
j.Ce=e;
j.Xf=null;
j.xr=true;
return [j]
};
sq[_P].zU=function () {
var a=[],b=this.hG();
b.Oh=[];
b.Ii=[];
b.Xf=null;
b.Ce=[];
b.xr=true;
var c=
b.sh=new D,d=b.Ih=new D;
this.kF(this.Oh,true,d);
this.kF(this.Ii,false,c);
var e=this.Ih;
if(e&&!e.Qa())this.BL(e,c);
var f=this.sh;
if(f&&!f.Qa())this.BL(f,d);
a.push(b);
return a
};
sq[_P].kF=function (a,b,c) {
var d=this.Xf,e=d[o];
if(e>0)for(var f=0;f<a[o];f++) {
var g=a[f];
for(var h=0;h<e;h++) {
	var j=d[h],k=j.Id(),m=false,p=k[o];
	for(var q=0;q<p;q++) {
		var t=k[q];
		if(g==t) {
			m=true;
			break
		}
	}if(b?!m:m)vq(c,j.l(),g)
}
}
};
var vq=function (a,b,c) {
var d;
if(a.Da(b))d=a.o(b);
else {
d=new Ej;
a.k(b,d)
}d.add(c)
};
sq[_P].BL=function (a,
b) {
bh(a,function (c,d) {
if(b.Da(d))b.o(d).Ue(c);
else b.k(d,c)
})
};
var xq="a",yq="docs",zq="v",Aq="sv",Bq="nv",Cq="tags",Dq="addedFolders",Eq="removedFolders",Fq="link",Gq="unlink",Hq="confirm",Iq="acls",Jq="shareWith",Kq="shareAs",Lq="subject",Mq="sendEmail",Nq="ccSelf";
sq[_P].oc=function () {
var a=new D;
a.k(xq,this.Ic);
Oh(a,yq,this.Ce);
Oh(a,zq,this.xa);
Oh(a,Aq,this.Nv);
Oh(a,Bq,this.ZB);
Oh(a,Cq,this.Pw);
Oh(a,Dq,this.Oh);
Oh(a,Eq,this.Ii);
Oh(a,Fq,wq(this.sh));
Oh(a,Gq,wq(this.Ih));
Oh(a,Hq,this.Gs);
Oh(a,Iq,
this.el?Vd(this.el):this.el);
Oh(a,Jq,this.zw);
Oh(a,Kq,this.UD);
Oh(a,Lq,this.oE);
Oh(a,Mb,this.jq);
Oh(a,Mq,this.dD);
Oh(a,Nq,this.Sx);
return a
};
sq[_P].e=function () {
sq.b.e.call(this);
this.sh.clear();
this.sh=null;
this.Ih.clear();
this.Ih=null
};
var Oq=function (a) {
return new sq(a.a,a.docs,a)
};
Xh(1,Oq);
var Pq=function () {
B.call(this);
this.et=new yp;
this.Wv=new pp;
this.Hw=new rp;
this.hv=new tp;
this.iv=new vp;
this.wo=new Gp;
this.vM=new Ap;
this.Av=new Cp
};
A(Pq,B);
Pq[_P].ue=function (a,b,c,d) {
var e=this.et,f=this.wo,g=f.pb(),h=g.D(),j=gl();
a=this.cV(e,a);
for(var k=0;k<a[o];k++) {
var m=a[k],p=e.ta(m.l());
if(p) {
	var q=p.Lt();
	m.I3(q);
	if(!d)m.RO(p.Yl());
	var t=mf(q);
	if(p.oQ(m)&&t[o]>0) {
		var w=t[o];
		for(var $=0;$<w;$++) {
			var za=e.ta(t[$]);
			if(za) {
				j.Xd(za.pa());
				for(var ka=0;ka<h;ka++) {
					var ic=g.yb(ka),zb=ic.ta(t[$]);
					if(zb)j.Xd(zb.pa())
				}
			}
		}
	}
}
}e.ue(a);
var Fd,sd;
if(b) {
Fd=f.ta(b);
if(Fd) {
	sd=Fd.ua();
	Fd.c4(c);
	Fd.ue(a)
}else b=null
}var ff=Zp(),ue=[];
if(ff&&ff[o]>0)for(var k=0;k<ff[o];k++)ue.push(ff[k].Ia());for(var k=0;k<h;k++) {
var ic=g.yb(k),ed=ic.ua(),Ef=false;
if(Fd&&ed.T()==b)break;
var kh=false,bs=ed.rd();
if(bs&&sd&&bs==sd.rd())kh=true;
var Eo=false,cs=ed.hk;
if(cs&&sd&&cs==sd.hk)Eo=true;
if(sd&&ed.RK(sd,ue))Ef=true;
var Fo=[],Go=ed.ti,ds=Go?Go[o]:0;
for(var Ho=0;Ho<ds;Ho++) {
	var es=gl().be(up).ta(Go[Ho]);
	Ve(Fo,es.kf())
}var Io=
[];
for(var nh=0;nh<a[o];nh++) {
	var m=a[nh],zb=ic.ta(m.l());
	if(!Ef&&ed.TK(m,ue,Fo,kh,Eo)) {
		Io.push(iq(m));
		if(!ed.JK()&&(!zb||ed.Lu(m,zb)))ic.kD(xl)
	}else if(zb) {
		var Jo=iq(m);
		Jo.s4(true);
		Io.push(Jo)
	}
}ic.ue(Io)
}for(var nh=0;nh<a[o];nh++) {
var m=a[nh],Ko=m.l(),fs=m.Id();
for(var cm=0;cm<fs[o];cm++) {
	var dm=e.ta(fs[cm]);
	if(dm)if(m.getAttribute(Wn).p())dm.b2(Ko);
	else dm.NQ(Ko)
}
}if(sd&&sd.ZZ()&&jd(c)) {
var Lo=sd.J(),em=e.ta(Lo);
if(em&&em.Vz()!=c) {
	em.CO(c);
	e.Oi(em);
	for(var k=0;k<h;k++) {
		var ic=g.yb(k),ed=ic.ua();
		if(Fd&&ed.T()==b)break;
		var zb=ic.ta(Lo);
		if(zb) {
			zb.CO(c);
			ic.Oi(zb)
		}
	}
}
}
};
Pq[_P].cV=function (a,b) {
var c=[];
for(var d=0;d<b[o];d++) {
var e=b[d];
if(e.KK()) {
	var f=a.ta(e.l());
	if(f) {
		var g=iq(f);
		g.q6(e);
		c.push(g)
	}
}else c.push(e)
}return c
};
Pq[_P].s3=function (a) {
var b=this.et,c=this.wo.pb(),d=c.D(),e=gl();
for(var f=0;f<a[o];f++) {
var g=a[f],h=Np(g.l()),j=g;
if(!h) {
	b.Oi(g);
	continue
}var k=h.oQ(g);
if(k) {
	h.YP(g);
	j=h;
	b.Oi(j);
	var m=mf(j.Lt());
	for(var p=0;p<m[o];p++) {
		var q=b.ta(m[p]);
		if(q)e.Xd(q.pa())
	}for(var p=0;p<
	d;p++) {
		var t=c.yb(p),w=t.ta(j.l());
		if(w) {
			var $=t.ua().Lu(w,j);
			w.YP(g);
			if(!t.ua().JK()&&$)t.kD(xl);
			e.Xd(w.pa())
		}for(var za=0;za<m[o];za++) {
			var q=t.ta(m[za]);
			if(q)e.Xd(q.pa())
		}
	}
}
}
};
Pq[_P].pw=function (a) {
this.Wv.pw(a)
};
Pq[_P].qw=function (a) {
this.Hw.qw(a)
};
Pq[_P].jw=function (a) {
this.hv.jw(a)
};
Pq[_P].iw=function (a) {
this.iv.iw(a)
};
Pq[_P].KD=function (a) {
this.vM.KD(a)
};
Pq[_P].mw=function (a) {
this.Av.mw(a)
};
Pq[_P].ag=function (a) {
switch(a.K()) {
case 3:return this.wo.SU(a);
case 5:return this.vM;
case 2:var b=a.Au;
if(b&1)return this.Wv;
else if(b&2)return this.hv;
else if(b&32)return this.iv;
else if(b&4)return this.Hw;
return null;
case 10:return this.Av.IV(a);
default:return null
}
};
Pq[_P].e=function () {
Pq.b.e.call(this);
ll();
this.et.j();
this.et=null;
this.Wv.j();
this.Wv=null;
this.Hw.j();
this.Hw=null;
this.hv.j();
this.hv=null;
this.iv.j();
this.iv=null;
this.wo.j();
this.wo=null;
this.Av.j();
this.Av=null
};
var Qq=function () {
this.nd=[]
};
A(Qq,B);
Qq[_P].Lw=function (a,b) {
var c=Xc(b)?b:Ad(),d=new Rq(a,c),e=this.nd,f;
for(f=e[o]-1;f>=0;f--)if(d.Wi>=e[f].Wi)break;Re(e,d,f+1)
};Qq[_P].Xn=function (a,b) {
var c=Xc(b)?b:Ad(),d=this.nd;
for(var e=d[o]-1;e>=0;e--)if(d[e][Cc]==a) {
d[e].Dl=c-d[e].Wi;
break
}
};
Va(Qq[_P],function () {
sa(this.nd,0)
});
Qq[_P].e=function () {
Qq.b.e.call(this);
var a=this.nd;
for(var b=0;b<a[o];b++)a[b].j();this.nd=null
};var Rq=function (a,b) {
B.call(this);
Wa(this,a);
this.Wi=b;
this.Dl=null
};
A(Rq,B);
var Sq,Tq="ScriptEngine",Uq="JScript";
(function () {
var a=Tq in Uc,b=false,c=ce;
if(a) {
b=Uc.ScriptEngine()==Uq;
if(b)c=Uc.ScriptEngineMajorVersion()+Vc+Uc.ScriptEngineMinorVersion()+Vc+Uc.ScriptEngineBuildVersion()
}Sq=b
})();
var Vq=function () {
this.Yb=Sq?[]:C;
this.g.apply(this,arguments)
};
Vq[_P].k=function (a) {
this.clear();
this.g(a)
};
if(Sq) {
Vq[_P].Jx=0;
Vq[_P].g=function () {
if(arguments[o]==1)this.Yb[this.Jx++]=arguments[0];
else {
	this.Yb.push.apply(this.Yb,arguments);
	this.Jx=this.Yb[o]
}return this
}
}else Vq[_P].g=function () {
for(var a=0;a<arguments[o];a++)this.Yb+=arguments[a];return this
};Ua(Vq[_P],function () {
if(Sq) {
sa(this.Yb,0);
this.Jx=0
}else this.Yb=C
});
ra(Vq[_P],function () {
if(Sq) {
var a=this.Yb.join(C);
this.clear();
if(a)this.g(a);
return a
}else return this.Yb
});
var Wq=function () {
B.call(this);
this.Im=new D;
this.Ji=new D;
this.Ug=new D
};
A(Wq,B);
var Xq=null;
Wq[_P].Ua=false;
var Yq=function () {
if(!Xq)Xq=new Wq;
return Xq
};
Wq[_P].a4=function (a) {
if(!this.Wa())return ;
var b=this.Im,c=a.l();
if(!b.o(c))b.k(c,a)
};
Wq[_P].iE=function (a,b,c) {
if(!this.Wa())return ;
var d=this.Im.o(a);
if(d&&d.K()==16)return ;
var e=this.Ji;
if(!e.o(a))e.k(a,new Qq);
e.o(a).Lw(b,c)
};
Wq[_P].Bs=function (a,b,c) {
if(!this.Wa())return ;
var d=this.Ji;
if(d.o(a))d.o(a).Xn(b,c)
};
Wq[_P].Lw=function (a,b,c) {
if(!this.Wa())return ;
var d=this.Ug;
if(!d.o(a))d.k(a,new Qq);
this.Ug.o(a).Lw(b,c)
};
Wq[_P].Xn=function (a,b,c) {
if(!this.Wa())return ;
var d=this.Ug;
if(d.o(a))d.o(a).Xn(b,c)
};
Wq[_P].Wa=function () {
return this.Ua
};
Wq[_P].Z=function (a) {
this.Ua=a
};
var Zq="\nRequest event trace:\n",$q="\n Request hash: ",ar=" start: ",br=" duration: ";
Wq[_P].OV=function () {
var a=new Vq;
a.g(Zq);
var b=this.Im,c=this.Ji;
bh(c,function (d,e) {
var f=b.o(e);
if(f) {
	var g=c.o(e),h=g.nd;
	a.g($q,f.T(),If);
	for(var j=0;j<h[o];j++) {
		var k=h[j];
		a.g(k[Cc],ar,k.Wi,br,
		k.Dl,If)
	}
}
},this);
return a.toString ()
};
var cr="\nEvent trace:\n",dr="\nLogType: ";
Wq[_P].aV=function () {
var a=new Vq;
a.g(cr);
var b=this.Ug;
bh(b,function (c,d) {
var e=b.o(d),f=e.nd;
a.g(dr,d,If);
for(var g=0;g<f[o];g++) {
	var h=f[g];
	a.g(h[Cc],ar,h.Wi,br,h.Dl,If)
}
},this);
return a.toString ()
};
Wq[_P].eZ=function () {
return this.Ji.D()>0||this.Ug.D()>0
};
Wq[_P].YV=function () {
var a=[],b=this.Im,c=this.Ji;
bh(c,function (e,f) {
var g=b.o(f);
if(g) {
	var h=c.o(f),j=h.nd,k=g.K(),m=k==1?(g.Qb()==0?99:g.Qb()):k+1000,p=0;
	switch(k) {
		case 3:case 5:p=
		g.kk;
		break;
		case 1:p=g.Ce[o];
		break
	}for(var q=0;q<j[o];q++) {
		var t=j[q],w={
		};
		w.eventCode=er(t[Cc]);
		w.clientTime=t.Dl;
		w.uiCode=m;
		w.eventSize=p;
		a.push(w)
	}h.j()
}
},this);
b.clear();
c.clear();
var d=this.Ug;
bh(d,function (e,f) {
var g=d.o(f),h=g.nd;
for(var j=0;j<h[o];j++) {
	var k=h[j],m={
	};
	m.eventCode=er(k[Cc]);
	m.clientTime=k.Dl;
	a.push(m)
}g.j()
},this);
d.clear();
return Vd(a)
};
Wq[_P].e=function () {
Wq.b.e.call(this);
this.Im.clear();
this.Im=null;
bh(this.Ji,function (a) {
a.j()
},this);
this.Ji.clear();
this.Ji=null;
bh(this.Ug,
function (a) {
a.j()
},this);
this.Ug.clear();
this.Ug=null
};
var fr="server_roundtrip",gr="response_parse",hr="response_process",ir="load_time",jr="css_download_parse",kr="js_download_parse",lr="create_doclist",mr="page_initialization",nr="flush_response_buffer",or="urchin_call",pr="ui_frame_load_time",qr="action_load_time",er=function (a) {
switch(a) {
case fr:return 10;
case gr:return 1;
case hr:return 2;
case ir:return 3;
case jr:return 4;
case kr:return 5;
case lr:return 6;
case mr:return 7;
case nr:return 8;
case or:return 9;
case pr:return 11;
case qr:return 12;
default:return null
}
};
var rr="initialize",sr="initialize_error",tr="status_change",ur=rr,vr=sr,wr=function (a,b,c,d,e) {
H.call(this,a,b);
Ka(this,c);
this.X0=d;
Ca(this,e)
};
A(wr,H);
var xr="debug_details",yr=function (a,b) {
H.call(this,xr);
this.GR=a;
this.I5=b
};
A(yr,H);
var zr=function (a,b,c) {
H.call(this,a);
this.n2=b;
this.J5=c
};
A(zr,H);
var Ar="progressupdate",Br=Ar,Cr="documentsync",Dr=function (a,b,c) {
H.call(this,a);
Ka(this,b);
this.nE=c
};
A(Dr,H);
var Er=function (a,b,c,d) {
Dr.call(this,Br,a,b);
this.EE=c||0;
this.mG=d||0
};
A(Er,Dr);
var Fr=function (a,b,c,d) {
H.call(this,a);
this.Jo=b;
this.Io=c;
this.Q7=d||0
};
A(Fr,H);
var Gr=function (a,b) {
H.call(this,Cr);
this.U7=a;
this.Wf=b
};
A(Gr,H);
var Hr="clearstores",Ir=function (a) {
H.call(this,Hr);
this.B5=a
};
A(Ir,H);
var Jr="complete",Kr="error",Lr=Jr,Mr="success",Nr=Kr,Or="ready";
var Pr=function (a,b,c,d,e) {
H.call(this,a,b);
this.kb=c;
this.Ec=d;
this.OM=e
};
A(Pr,H);
Pr[_P].e=function () {
Pr.b.e.call(this);
this.kb=undefined;
this.Ec=undefined;
this.OM=undefined
};
var Qr=function (a) {
zj.call(this,a);
if(this.qe) {
var b=a.response,c=[],d=b.people;
if(d)for(var e=0;e<d[o];e++)c.push(new hn(d[e]));this.wM=c||[]
}
};A(Qr,zj);Qr[_P].K=function () {
return 5
};
Qr[_P].e=function () {
Qr.b.e.call(this);
this.wM=null
};
var Rr=function (a) {
return new Qr(a)
};
Dj(5,Rr);
var Sr=function (a) {
zj.call(this,a);
var b=[],c=[],d=[],e=[],f,g=null,h=null,j=null,k=null;
if(this.qe) {
var m=a.response,p=m.services;
if(p)for(var q=0;q<p[o];q++)b.push(new kp(p[q]));var t=m.mimetypes;if(t)for(var q=0;q<t[o];q++)c.push(new bp(t[q]));var w=m.mimeTypeSets;if(w)for(var q=0;q<w[o];q++)d.push(new cp(w[q]));var $=m.sources;if($)for(var q=0;q<$[o];q++)e.push(new np($[q]));f=m.token;if(a.vr)g=new io(a.vr);if(a.folders)h=new io(a.folders);if(a.people)j=new Qr(a.people);if(a.prefs)k=new zl(a.prefs)
}this.tg=
b;this.Bf=c||[];this.ti=d||[];this.gd=e||[];this.yl=g;this.Jl=h;this.Dm=j;this.Fm=k;this.Nb=f
};A(Sr,zj);Sr[_P].K=function () {
return 2
};
Sr[_P].kf=function () {
return this.Bf
};
Sr[_P].Jb=function () {
return this.Nb
};
Sr[_P].Qk=function (a) {
Sr.b.Qk.call(this,a);
if(this.yl)this.yl.Qk(a);
if(this.Jl)this.Jl.Qk(a);
if(this.Dm)this.Dm.Qk(a);
if(this.Fm)this.Fm.Qk(a)
};
Sr[_P].e=function () {
Sr.b.e.call(this);
this.tg=null;
this.Bf=null;
this.ti=null;
this.gd=null;
if(this.yl) {
this.yl.j();
this.yl=null
}if(this.Jl) {
this.Jl.j();
this.Jl=null
}if(this.Dm) {
this.Dm.j();
this.Dm=null
}if(this.Fm) {
this.Fm.j();
this.Fm=null
}this.Nb=null
};
var Tr=function (a) {
return new Sr(a)
};
Dj(2,Tr);
var Ur=function (a) {
Bh.call(this);
this.Au=a
};
A(Ur,Bh);
var Vr="ir",Wr=new G(Vr);
Ur[_P].Lc=function () {
return Wr
};
Ur[_P].K=function () {
return 2
};
var Xr="init";
Ur[_P].oc=function () {
var a=new D;
a.k(Xr,this.Au);
return a
};
var Yr=function (a) {
return new Ur(a.init)
};
Xh(2,Yr);
var Zr=function () {
Bh.call(this)
};
A(Zr,Bh);
var $r=new G(ac);
Zr[_P].Lc=function () {
return $r
};
Zr[_P].K=function () {
return 9
};
var as=function () {
return new Zr
};
Xh(9,as);
var gs='Invalid cookie name "',hs='Invalid cookie value "',is=";domain=",js=";path=",ks=";expires=",ls=function (a,b,c,d,e) {
if(/[;
=]/.test(a))throwi(gs+a+Zd);
if(/;
/.test(b))throwi(hs+b+Zd);
if(!Xc(c))c=-1;
var f=e?is+e:C,g=d?js+d:C,h;
if(c<0)h=C;
else if(c==0) {
var j=new Date(1970,1,1);
h=ks+j.toUTCString()
}else {
var k=new Date((new Date).getTime()+c*1000);
h=ks+k.toUTCString()
}la.cookie=a+zh+b+f+g+h
},ms=function (a,b) {
var c=a+zh,d=fa(la.cookie).split(/\s*;
\s/);
for(var e=0,f;f=d[e];e++)if(f.indexOf(c)==
0)return f.substr(c[o]);return b
},os=function (a,b,c) {
var d=ns(a);
ls(a,C,0,b,c);
return d
},ns=function (a) {
var b={
};
return ms(a,b)!==b
};
var ps=C,qs=C,rs=C,ss=C,ts=false,us=null,vs=C,ws=function (a) {
ts=a
},xs=function (a) {
us=a
},ys=function (a) {
ps=a
},zs=function (a) {
qs=a
},As=function (a) {
rs=a
},Bs=function (a) {
ss=a
},Ds=function (a) {
try{
ls(Cs(),a)
}catch(b) {
vs=a
}
},Es=function () {
try{
os(Cs())
}catch(a) {
vs=C
}
},Fs="HUSER",Gs="GAUSER",Cs=function () {
return ts?Fs:Gs
};
var J=function () {
};
A(J,B);
J[_P].bH=true;
J[_P].oM=null;
J[_P].Ul=function () {
return this.oM
};
J[_P].addEventListener=function (a,b,c,d) {
zi(this,a,b,c,d)
};
J[_P].removeEventListener=function (a,b,c,d) {
Ci(this,a,b,c,d)
};
J[_P].dispatchEvent=function (a) {
return Xi(this,a)
};
J[_P].e=function () {
J.b.e.call(this);
Gi(this);
this.oM=null
};
var Hs=function (a,b,c,d) {
this.top=Xc(a)?ha(a):undefined;
cb(this,Xc(b)?ha(b):undefined);
Oa(this,Xc(c)?ha(c):undefined);
Ea(this,Xc(d)?ha(d):undefined)
};
Hs[_P].Ca=function () {
return new Hs(this.top,this[Sc],this[oc],this[Wb])
};
var Is="t, ",Js="r, ",Ks="b, ",Ls="l)";
ra(Hs[_P],function () {
return Od+this.top+Is+this[Sc]+Js+this[oc]+Ks+this[Wb]+Ls
});
Sa(Hs[_P],function (a) {
return Ms(this,a)
});
Hs[_P].expand=function (a,b,c,d) {
if(qd(a)) {
this.top-=a.top;
this.right+=a[Sc];
this.bottom+=a[oc];
this.left-=a[Wb]
}else {
this.top-=
a;
this.right+=b;
this.bottom+=c;
this.left-=d
}return this
};
var Ns=function (a,b) {
if(a==b)return true;
if(!a||!b)return false;
return a.top==b.top&&a[Sc]==b[Sc]&&a[oc]==b[oc]&&a[Wb]==b[Wb]
},Ms=function (a,b) {
if(!a||!b)return false;
return b.x>=a[Wb]&&b.x<=a[Sc]&&b.y>=a.top&&b.y<=a[oc]
};
var Os=function (a,b) {
this.x=Xc(a)?ha(a):undefined;
this.y=Xc(b)?ha(b):undefined
};
Os[_P].Ca=function () {
return new Os(this.x,this.y)
};
ra(Os[_P],function () {
return Od+this.x+Yj+this.y+Pd
});
;
var Ps=function (a,b,c,d) {
Ea(this,Xc(a)?ha(a):undefined);
this.top=Xc(b)?ha(b):undefined;
wa(this,Xc(c)?ha(c):undefined);
Za(this,Xc(d)?ha(d):undefined)
};
Ps[_P].Ca=function () {
return new Ps(this[Wb],this.top,this[r],this[y])
};
var Qs=" - ",Rs="w x ",Ss="h)";
ra(Ps[_P],function () {
return Od+this[Wb]+Yj+this.top+Qs+this[r]+Rs+this[y]+Ss
});
var Ts=function (a,b) {
wa(this,Xc(a)?ha(a):undefined);
Za(this,Xc(b)?ha(b):undefined)
},Us=function (a,b) {
if(a==b)return true;
if(!a||!b)return false;
return a[r]==b[r]&&a[y]==b[y]
};
Ts[_P].Ca=function () {
return new Ts(this[r],this[y])
};
var Vs=" x ";
ra(Ts[_P],function () {
return Od+this[r]+Vs+this[y]+Pd
});
Ts[_P].hR=function () {
return this[r]*this[y]
};
Ts[_P].Qa=function () {
return !this.hR()
};
Ts[_P].ceil=function () {
wa(this,l.ceil(this[r]));
Za(this,l.ceil(this[y]));
return this
};
Ts[_P].floor=function () {
wa(this,l.floor(this[r]));
Za(this,l.floor(this[y]));
return this
};
Ts[_P].round=function () {
wa(this,l.round(this[r]));
Za(this,l.round(this[y]));
return this
};
Ts[_P].scale=function (a) {
this.width*=a;
this.height*=a;
return this
};
var Ws=function (a,b) {
return a+l.random()*(b-a)
};
var Ys=function (a,b) {
J.call(this);
this.he=a||1;
this.rr=b||Xs;
this.Ix=xd(this.S5,this);
this.Yp=Ad()
};
A(Ys,J);
Ys[_P].enabled=false;
var Xs=Uc.window,Zs=0.8;
Ys[_P].U=null;
Ys[_P].setInterval=function (a) {
this.he=a;
if(this.U&&this[jc]) {
this.stop();
this.start()
}else if(this.U)this.stop()
};
Ys[_P].S5=function () {
if(this[jc]) {
var a=Ad()-this.Yp;
if(a>0&&a<this.he*Zs) {
	this.U=this.rr.setTimeout(this.Ix,this.he-a);
	return
}this.mT();
if(this[jc]) {
	this.U=this.rr.setTimeout(this.Ix,this.he);
	this.Yp=Ad()
}
}
};
var $s="tick";
Ys[_P].mT=function () {
this.dispatchEvent($s)
};
Ys[_P].start=function () {
this.enabled=true;
if(!this.U) {
this.U=this.rr.setTimeout(this.Ix,this.he);
this.Yp=Ad()
}
};
pa(Ys[_P],function () {
this.enabled=false;
if(this.U) {
this.rr.clearTimeout(this.U);
this.U=null
}
});
Ys[_P].e=function () {
Ys.b.e.call(this);
this.stop();
this.rr=null
};
var at=function (a,b,c) {
if(pd(a)) {
if(c)a=xd(a,c)
}else if(a&&typeofa.ce==dd)a=xd(a.ce,a);
else throwi(ii);
return Xs.setTimeout(a,b||0)
},bt=function (a) {
Xs.clearTimeout(a)
};
var ct=function () {
J.call(this);
this.Sm=new D;
this.Lb=new D;
this.Bm=new D;
this.Md=new D;
var a=this.U=new Ys;
a.setInterval(this.Vk);
this.m=new $i(this)
};
A(ct,J);
var dt="statuschange",et=dt,ft=rr,gt=sr,ht="online";
ct[_P].DB=ht;
ct[_P].pn=30000;
ct[_P].Vk=30000;
ct[_P].qn=120000;
var it="detroit.net.BaseCommunicationsManager";
ct[_P].w=Lk(it);
ct[_P].Ka=false;
ct[_P].ba=function () {
return this.m
};
ct[_P].$t=function () {
return xj
};
ct[_P].OO=function (a) {
this.Vk=a;
this.pn=a;
this.U.setInterval(this.Vk)
};
ct[_P].NO=
function (a) {
this.qn=a
};
ct[_P].wV=function () {
var a=this.pn,b=this.qn;
if(a&&a<b)this.pn=l.min(a*2,b);
return this.pn
};
ct[_P].ZH=function (a) {
var b=this.U;
if(a)this.m.d(b,$s,this.qJ);
else this.m.M(b,$s,this.qJ)
};
var jt="Starting initialization.";
ct[_P].Kb=function () {
this.w.qa(jt)
};
var kt="Initialization finished.";
ct[_P].Ko=function () {
this.w.qa(kt);
this.Ka=true;
var a=this.Md,b=a.ca();
for(var c=0;c<b[o];c++)this.Pe(b[c]);a.clear();this.dispatchEvent(ft)
};var lt="Initialization finished for error.";ct[_P].UT=
function () {
this.w.qa(lt);
var a=this.Md,b=a.ca();
for(var c=0;c<b[o];c++) {
var d=b[c],e=d.l();
a.remove(e);
this.Lb.k(e,d);
this.Bv(e)
}this.dispatchEvent(gt)
};
var mt="sendRequest with id=",nt=" and hash=",ot=" and communicationType=",pt="sendRequest before initialization with id=";
ct[_P].Pe=function (a) {
if(this.Ka) {
this.w.qa(mt+a.l()+nt+a.T()+ot+a.K());
this.Lb.k(a.l(),a);
this.Ff(a)
}else {
this.w.qa(pt+a.l()+nt+a.T()+ot+a.K());
this.Md.k(a.l(),a)
}
};
ct[_P].Ff=function () {
};
var qt="processReady with id=";
ct[_P].FM=
function (a) {
var b=this.Lb,c=b.o(a);
if(c) {
this.w.qa(qt+a+nt+c.T()+ot+c.K());
this.dispatchEvent(new Pr(Or,this,c));
b.remove(a);
this.Sm.k(a,c)
}
};
var rt="processSuccess with id=";
ct[_P].HM=function (a,b) {
var c=this.Sm,d=c.o(a);
if(d) {
this.w.qa(rt+a+nt+d.T()+ot+d.K());
c.remove(a);
var e=Yq();
e.iE(a,gr);
var f=Cj(b,d.K());
e.Bs(a,gr);
f.Qk(this.$t());
this.dispatchEvent(new Pr(Mr,this,d,f,b));
if(d.K()==2&&d.Au&8) {
	Qh(f.Jb());
	var g=this.Bm;
	bh(this.Bm,function (h) {
		this.Pe(h)
	},this);
	g.clear()
}if(d.K()==9)this.fd(ht)
}
};
var st="processError with id=",tt=" and opt_errorCode=",ut="Exception while reloading due to auth problem.",vt="offline";
ct[_P].Bv=function (a,b) {
var c=this.Sm,d=c.o(a);
if(d) {
this.w.qa(st+a+ot+d.K()+tt+b);
c.remove(a);
if(b==403) {
	this.Bm.k(a,d);
	this.Pe(new Ur(8))
}else if(b==302)try{
	Es();
	Uc[Fb].reload()
}catch(e) {
	this.w.cl(ut,e)
}else {
	this.dispatchEvent(new Pr(Nr,this,d));
	this.fd(vt)
}
}
};
ct[_P].DQ=function () {
this.Lb.clear();
this.Sm.clear();
this.Bm.clear();
this.Md.clear()
};
var wt="Get the server status.";
ct[_P].qJ=function () {
this.w.qa(wt);
this.Pe(new Zr);
if(this.pn<this.qn)this.U.setInterval(this.wV())
};
ct[_P].zb=function () {
return this.DB
};
var xt="Changing communications manager status to ";
ct[_P].fd=function (a) {
if(this.DB!=a) {
this.w.qa(xt+a);
this.DB=a;
var b=this.U;
switch(a) {
	case ht:b.stop();
	var c=this.pn=this.Vk;
	b.setInterval(c);
	break;
	case vt:b.start();
	break;
	default:break
}this.dispatchEvent(new yt(et,a))
}
};
ct[_P].e=function () {
ct.b.e.call(this);
var a=[this.Lb,this.Sm,this.Bm,this.Md];
bh(a,function (b) {
bh(b,
function () {
});
b.clear()
},this);
this.Lb=null;
this.Bm=null;
this.Sm=null;
this.Md=null;
this.U.stop();
this.U.j();
this.U=null;
this.m.j();
this.m=null
};
var yt=function (a,b) {
H.call(this,a);
this.Ag=b
};
A(yt,H);
;
var zt=function () {
if(!qg)return ;
this.oj={
};
this.kx={
};
this.Jw=[]
};
var At="goog.net.xhrMonitor";
zt[_P].w=Lk(At);
var Bt="Pushing context: ",Ct=" (";
zt[_P].NM=function (a) {
if(!qg)return ;
var b=nd(a)?a:(qd(a)?ud(a):C);
this.w.dz(Bt+a+Ct+b+Pd);
this.Jw.push(b)
};
var Dt="Popping context: ";
zt[_P].zM=function () {
if(!qg)return ;
var a=this.Jw.pop();
this.w.dz(Dt+a);
this.p6(a)
};
var Et="Opening XHR : ";
zt[_P].L_=function (a) {
if(!qg)return ;
var b=ud(a);
this.w.Cj(Et+b);
for(var c=0;c<this.Jw[o];c++) {
var d=this.Jw[c];
this.Sr(this.oj,
d,b);
this.Sr(this.kx,b,d)
}
};
var Ft="Closing XHR : ";
zt[_P].K_=function (a) {
if(!qg)return ;
var b=ud(a);
this.w.Cj(Ft+b);
delete this.kx[b];
for(var c in this.oj) {
Te(this.oj[c],b);
if(this.oj[c][o]==0)delete this.oj[c]
}
};
var Gt="Updating dependent contexts";
zt[_P].p6=function (a) {
var b=this.kx[a],c=this.oj[a];
if(b&&c) {
this.w.dz(Gt);
Ge(b,function (d) {
	Ge(c,function (e) {
		this.Sr(this.oj,d,e);
		this.Sr(this.kx,e,d)
	},this)
},this)
}
};
zt[_P].Sr=function (a,b,c) {
if(!a[b])a[b]=[];
if(!Oe(a[b],c))a[b].push(c)
};
var Ht=new zt;
var Jt=function () {
return It()
};
var It=null,Kt=null,Lt=null,Mt=function (a,b) {
It=a;
Kt=b;
Lt=null
},Ot=function () {
var a=Nt();
return a?new ActiveXObject(a):new XMLHttpRequest
},Pt=function () {
var a=Nt(),b={
};
if(a) {
b[0]=true;
b[1]=true
}return b
};
Mt(Ot,Pt);
var Qt=null,Rt="MSXML2.XMLHTTP.6.0",St="MSXML2.XMLHTTP.3.0",Tt="MSXML2.XMLHTTP",Ut="Microsoft.XMLHTTP",Vt="Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed",Nt=function () {
if(!Qt&&typeofXMLHttpRequest=="undefined"&&
typeofActiveXObject!="undefined") {
var a=[Rt,St,Tt,Ut];
for(var b=0;b<a[o];b++) {
	var c=a[b];
	try{
		new ActiveXObject(c);
		Qt=c;
		return c
	}catch(d) {
	}
}throwi(Vt);
}return Qt
};
var Wt=function () {
J.call(this);
this.headers=new D
};
A(Wt,J);
var Xt="goog.net.XhrLite";
Wt[_P].w=Lk(Xt);
Wt[_P].gb=false;
Wt[_P].db=null;
Wt[_P].jx=null;
Wt[_P].mL=C;
Wt[_P].gL=C;
Wt[_P].km=0;
Wt[_P].Vp=C;
Wt[_P].Xy=false;
Wt[_P].aB=false;
Wt[_P].Zi=0;
Wt[_P].$k=null;
Wt[_P].br=function (a) {
this.Zi=l.max(0,a)
};
var Yt="[goog.net.XhrLite] Object is active with another request",Zt="GET",$t="Opening Xhr",au="Error opening Xhr: ",bu="POST",cu="Content-Type",du="application/x-www-form-urlencoded;charset=utf-8",eu="Will abort after ",
fu="ms if incomplete",gu="Sending request",hu="Send error: ";
Wt[_P].send=function (a,b,c,d) {
if(this.gb)throwi(Yt);
var e=b||Zt;
this.mL=a;
this.Vp=C;
this.km=0;
this.gL=e;
this.gb=true;
this.db=new Jt;
this.jx=Lt||(Lt=Kt());
Ht.L_(this.db);
this.db.onreadystatechange=xd(this.eM,this);
try{
this.th($t);
this.db.open(e,a,true)
}catch(f) {
this.th(au+f[Nb]);
this.De(5,f);
return
}var g=c?fa(c):C,h=this.headers.Ca();
if(d)bh(d,function (j,k) {
h.k(k,j)
});
if(e==bu&&!h.Da(cu))h.k(cu,du);
bh(h,function (j,k) {
this.db.setRequestHeader(k,
j)
},this);
try{
if(this.$k) {
	Xs.clearTimeout(this.$k);
	this.$k=null
}if(this.Zi>0) {
	this.th(eu+this.Zi+fu);
	this.$k=Xs.setTimeout(xd(this.T5,this),this.Zi)
}this.th(gu);
this.Xy=false;
this.aB=true;
this.db.send(g);
this.aB=false
}catch(f) {
this.th(hu+f[Nb]);
this.De(5,f)
}
};
Wt[_P].dispatchEvent=function (a) {
if(this.db) {
Ht.NM(this.db);
try{
	Wt.b.dispatchEvent.call(this,a)
}finally{
	Ht.zM()
}
}else Wt.b.dispatchEvent.call(this,a)
};
var iu="Timed out after ",ju="ms, aborting",ku="timeout";
Wt[_P].T5=function () {
if(typeofTc==
"undefined") {
}else if(this.db) {
this.Vp=iu+this.Zi+ju;
this.km=8;
this.th(this.Vp);
this.dispatchEvent(ku);
this.abort(8)
}
};
Wt[_P].De=function (a,b) {
this.gb=false;
if(this.db)this.db.abort();
this.Vp=b;
this.km=a;
this.tH();
this.qs()
};
Wt[_P].tH=function () {
if(!this.Xy) {
this.Xy=true;
this.dispatchEvent(Lr);
this.dispatchEvent(Nr)
}
};
var lu="Aborting",mu="abort";
Wt[_P].abort=function (a) {
if(this.db) {
this.th(lu);
this.gb=false;
this.db.abort();
this.km=a||7;
this.dispatchEvent(Lr);
this.dispatchEvent(mu);
this.qs()
}
};
Wt[_P].e=
function () {
if(this.db) {
this.gb=false;
this.db.abort();
this.qs(true)
}Wt.b.e.call(this)
};
var nu="Local request error detected and ignored",ou="readystatechange",pu="Request complete",qu=" [";
Wt[_P].eM=function () {
if(!this.gb)return ;
if(typeofTc=="undefined") {
}else if(this.jx[1]&&this.ip()==4&&this.zb()==2)this.th(nu);
else {
if(this.aB&&this.ip()==4) {
	at(this.eM,0,this);
	return
}this.dispatchEvent(ou);
if(this.nh()) {
	this.th(pu);
	this.gb=false;
	if(this.WK()) {
		this.dispatchEvent(Lr);
		this.dispatchEvent(Mr)
	}else {
		this.km=
		6;
		this.Vp=this.aA()+qu+this.zb()+Id;
		this.tH()
	}this.qs()
}
}
};
Wt[_P].qs=function (a) {
if(this.db) {
this.db.onreadystatechange=this.jx[0]?$c:null;
var b=this.db;
this.db=null;
this.jx=null;
if(this.$k) {
	Xs.clearTimeout(this.$k);
	this.$k=null
}if(!a) {
	Ht.NM(b);
	this.dispatchEvent(Or);
	Ht.zM()
}Ht.K_(b)
}
};
Wt[_P].je=function () {
return this.gb
};
Wt[_P].nh=function () {
return this.ip()==4
};
Wt[_P].WK=function () {
switch(this.zb()) {
case 0:case 200:case 204:case 304:return true;
default:return false
}
};
Wt[_P].ip=function () {
return this.db?
this.db.readyState:0
};
var ru="Can not get status: ";
Wt[_P].zb=function () {
try{
return this.ip()>2?this.db[bc]:-1
}catch(a) {
this.w.cl(ru+a[Nb]);
return -1
}
};
Wt[_P].aA=function () {
try{
return this.ip()>2?this.db.statusText:C
}catch(a) {
this.w.Cj(ru+a[Nb]);
return C
}
};
Wt[_P].iJ=function () {
return this.db?this.db.responseText:C
};
Wt[_P].getResponseHeader=function (a) {
return this.db&&this.nh()?this.db.getResponseHeader(a):undefined
};
Wt[_P].th=function (a) {
this.w.Cj(a+qu+this.gL+E+this.mL+E+this.zb()+Id)
};
var su="[goog.structs.Pool] Min can not be greater than max",tu=function (a,b) {
B.call(this);
this.EL=a||0;
this.ek=b||10;
if(this.EL>this.ek)throwi(su);
this.Kc=new Jp;
this.gg=new Ej;
this.Tr()
};
A(tu,B);
tu[_P].Hd=function () {
var a=this.W1();
if(a)this.gg.add(a);
return a
};
tu[_P].Ld=function (a) {
if(this.gg.remove(a)) {
this.qx(a);
return true
}return false
};
tu[_P].W1=function () {
var a;
while(this.LI()>0) {
a=this.Kc.$h();
if(!this.eC(a))this.Tr();
else break
}if(!a&&this.D()<this.ek)a=this.Jg();
return a
};
tu[_P].qx=function (a) {
this.gg.remove(a);
if(this.eC(a)&&this.D()<this.ek)this.Kc.Aj(a);
else this.Qg(a)
};
tu[_P].Tr=function () {
var a=this.Kc;
while(this.D()<this.EL)a.Aj(this.Jg());
while(this.D()>this.ek&&this.LI()>0)this.Qg(a.$h())
};
tu[_P].Jg=function () {
return {
}
};
tu[_P].Qg=function (a) {
if(typeofa.j==dd)a.j();
else for(var b in a)a[b]=null
};tu[_P].eC=function (a) {
if(typeofa.DR==dd)return a.DR();
return true
};
Sa(tu[_P],function (a) {
return this.Kc.contains(a)||this.gg.contains(a)
});
tu[_P].D=function () {
return this.Kc.D()+this.gg.D()
};
tu[_P].iV=function () {
return this.gg.D()
};
tu[_P].LI=function () {
return this.Kc.D()
};
tu[_P].Qa=function () {
return this.Kc.Qa()&&this.gg.Qa()
};
var uu="[goog.structs.Pool] Objects not released";
tu[_P].e=function () {
tu.b.e.call(this);
if(this.iV()>0)throwi(uu);
hf(this.gg,this.Qg,this);
this.gg.clear();
this.gg=null;
var a=this.Kc;
while(!a.Qa())this.Qg(a.$h());
this.Kc=null
};
var vu=function (a,b) {
this.Cc=a;
this.xa=b
};
vu[_P].p=function () {
return this.xa
};
vu[_P].Ca=function () {
return new vu(this.Cc,this.xa)
};
var wu=function (a) {
this.ne=[];
if(a)this.LZ(a)
};
wu[_P].BK=function (a,b) {
var c=new vu(a,b),d=this.ne;
d.push(c);
this.XB(d[o]-1)
};
wu[_P].LZ=function (a) {
var b,c;
if(ainstanceofwu) {
b=a.Nc();
c=a.ca();
if(a.D()<=0) {
	var d=this.ne;
	for(var e=0;e<b[o];e++)d.push(new vu(b[e],c[e]));return
}
}else {
b=mf(a);
c=lf(a)
}for(var e=0;e<b[o];e++)this.BK(b[e],c[e])
};La(wu[_P],function () {
var a=this.ne,b=a[o],c=a[0];
if(b<=0)return undefined;
else if(b==1)ah(a);
else {
a[0]=a.pop();
this.WB(0)
}return c.p()
});
wu[_P].peek=function () {
var a=
this.ne;
if(a[o]==0)return undefined;
return a[0].p()
};
wu[_P].WB=function (a) {
var b=this.ne,c=b[o],d=b[a];
while(a<l.floor(c/2)) {
var e=this.mV(a),f=this.QV(a),g=f<c&&b[f].Cc<b[e].Cc?f:e;
if(b[g].Cc>d.Cc)break;
b[a]=b[g];
a=g
}b[a]=d
};
wu[_P].XB=function (a) {
var b=this.ne,c=b[a];
while(a>0) {
var d=this.EV(a);
if(b[d].Cc>c.Cc) {
	b[a]=b[d];
	a=d
}else break
}b[a]=c
};
wu[_P].mV=function (a) {
return a*2+1
};
wu[_P].QV=function (a) {
return a*2+2
};
wu[_P].EV=function (a) {
return l.floor((a-1)/2)
};
wu[_P].ca=function () {
var a=this.ne,
b=[],c=a[o];
for(var d=0;d<c;d++)b.push(a[d].p());return b
};wu[_P].Nc=function () {
var a=this.ne,b=[],c=a[o];
for(var d=0;d<c;d++)b.push(a[d].Cc);return b
};wu[_P].Xh=function (a) {
return ch(this.ne,function (b) {
return b.p()==a
})
};
wu[_P].Da=function (a) {
return ch(this.ne,function (b) {
return b.Cc==a
})
};
wu[_P].Ca=function () {
return new wu(this)
};
wu[_P].D=function () {
return Wg(this.ne)
};
wu[_P].Qa=function () {
return $g(this.ne)
};
Ua(wu[_P],function () {
ah(this.ne)
});
var xu=function () {
wu.call(this)
};
A(xu,wu);
xu[_P].Aj=function (a,b) {
this.BK(a,b)
};
xu[_P].$h=function () {
return this.remove()
};
var yu=function (a,b) {
this.Hv=new xu;
tu.call(this,a,b)
};
A(yu,tu);
yu[_P].Hd=function (a,b) {
if(!a)return yu.b.Hd.call(this);
var c=b||100;
this.Hv.Aj(c,a);
this.zA();
return undefined
};
yu[_P].zA=function () {
var a=this.Hv;
while(a.D()>0) {
var b=this.Hd();
if(!b)return ;
else {
	var c=a.$h();
	c.apply(this,[b])
}
}
};
yu[_P].qx=function (a) {
yu.b.qx.call(this,a);
this.zA()
};
yu[_P].Tr=function () {
yu.b.Tr.call(this);
this.zA()
};
yu[_P].e=function () {
yu.b.e.call(this);
this.Hv.clear();
this.Hv=null
};
var zu=function (a,b,c) {
yu.call(this,b,c);
this.MA=a
};
A(zu,yu);
zu[_P].Jg=function () {
var a=new Wt,b=this.MA;
if(b)bh(b,function (c,d) {
a.headers.k(d,c)
});
return a
};
zu[_P].Qg=function (a) {
a.j()
};
zu[_P].eC=function (a) {
return !a.Gu()&&!a.je()
};
var Au=function (a,b,c,d,e) {
this.MB=Xc(a)?a:1;
this.Zi=Xc(e)?l.max(0,e):0;
this.An=new zu(b,c,d);
this.Ef=new D;
this.m=new $i(this)
};
A(Au,J);
var Bu=[Or,Lr,Mr,Nr,mu,ku];
Au[_P].br=function (a) {
this.Zi=l.max(0,a)
};
var Cu="[goog.net.XhrManager] ID in use";
Au[_P].send=function (a,b,c,d,e,f,g) {
var h=this.Ef;
if(h.o(a))throwi(Cu);
var j=new Du(b,xd(this.of,this,a),c,d,e,g);
this.Ef.k(a,j);
var k=xd(this.DW,this,a);
this.An.Hd(k,f)
};
Au[_P].abort=function (a,b) {
var c=this.Ef.o(a);
if(c) {
var d=c.dl;
c.W2(true);
if(b) {
	this.gN(d,
	c.ix);
	Bi(d,Or,function () {
		this.An.Ld(d)
	},false,this);
	this.Ef.remove(a)
}if(d)d.abort()
}
};
Au[_P].DW=function (a,b) {
var c=this.Ef.o(a);
if(c&&!c.dl) {
this.SQ(b,c.ix);
b.br(this.Zi);
c.dl=b;
this.dispatchEvent(new Eu(Or,this,a,b));
this.vN(a,b);
if(c.Kr)b.abort()
}else this.An.Ld(b)
};
Au[_P].of=function (a,b) {
switch(b[x]) {
case Or:this.vN(a,b[v]);
break;
case Lr:return this.WW(a,b[v],b);
case Mr:this.zp(a,b[v]);
break;
case ku:case Nr:this.wp(a,b[v]);
break;
case mu:this.vW(a,b[v]);
break
}return null
};
Au[_P].vN=function (a,
b) {
var c=this.Ef.o(a);
if(c&&!c.nG&&c.Yr<=this.MB) {
c.yZ();
b.send(c.mf(),c.X_,c.ac(),c.Gz())
}else {
if(c) {
	this.gN(b,c.ix);
	this.Ef.remove(a)
}this.An.Ld(b)
}
};
Au[_P].WW=function (a,b,c) {
var d=this.Ef.o(a);
if(b.km==7||b.WK()||d.Yr>this.MB) {
this.dispatchEvent(new Eu(Lr,this,a,b));
if(d) {
	d.i3(true);
	if(d.Yx)return d.Yx.call(b,c)
}
}return null
};
Au[_P].vW=function (a,b) {
this.dispatchEvent(new Eu(mu,this,a,b))
};
Au[_P].zp=function (a,b) {
this.dispatchEvent(new Eu(Mr,this,a,b))
};
Au[_P].wp=function (a,b) {
var c=this.Ef.o(a);
if(c.Yr>this.MB)this.dispatchEvent(new Eu(Nr,this,a,b))
};
Au[_P].gN=function (a,b,c) {
var d=c||Bu;
this.m.M(a,d,b)
};
Au[_P].SQ=function (a,b,c) {
var d=c||Bu;
this.m.d(a,d,b)
};
Au[_P].e=function () {
Au.b.e.call(this);
this.An.j();
this.An=null;
this.m.j();
this.m=null;
var a=this.Ef;
bh(a,function (b) {
b.j()
});
a.clear();
this.Ef=null
};
var Eu=function (a,b,c,d) {
H.call(this,a,b);
this.id=c;
this.dl=d
};
A(Eu,H);
Eu[_P].e=function () {
Eu.b.e.call(this);
this.id=null;
this.dl=null
};
var Du=function (a,b,c,d,e,f) {
this.Er=a;
this.X_=c||
Zt;
this.Ta=d;
this.MA=e;
this.Yr=0;
this.nG=false;
this.Kr=false;
this.ix=b;
this.Yx=f;
this.dl=null
};
A(Du,B);
Du[_P].mf=function () {
return this.Er
};
Du[_P].ac=function () {
return this.Ta
};
Du[_P].Gz=function () {
return this.MA
};
Du[_P].yZ=function () {
this.Yr++
};
Du[_P].i3=function (a) {
this.nG=a
};
Du[_P].W2=function (a) {
this.Kr=a
};
Du[_P].e=function () {
Du.b.e.call(this);
this.ix=null;
this.Yx=null
};
var Fu="Content-control",Gu="no-cache",Hu=function () {
ct.call(this);
var a=new D;
a.k(Fu,Gu);
var b=new Au(2,a,0,2,20000);
this.ba().d(b,[Or,Mr,Nr],this.of);
this.hj=b
};
A(Hu,ct);
var Iu="detroit.net.CommunicationsManager";
Hu[_P].w=Lk(Iu);
var Ju=null,Ku=function () {
if(!Ju)Ju=new Hu;
return Ju
};
Hu[_P].Kb=function () {
Hu.b.Kb.call(this);
this.Ko()
};
Hu[_P].br=function (a) {
this.hj.br(a)
};
var Lu="&&&START&&&",Mu=function (a) {
if(a.indexOf(Lu)==0)a=a.substring(Lu[o]);
return Sd(a)
};
Hu[_P].Ff=function (a) {
Yq().iE(a.l(),fr);
this.hj.send(a.l(),a.MI().toString (),bu,a.ac(),a.Gz(),100)
};
Hu[_P].of=function (a) {
var b=a.id,c=a.dl;
switch(a[x]) {
case Or:this.AA(b,c);
break;
case Mr:this.zp(b,c);
break;
case Nr:this.wp(b,c);
break
}
};
Hu[_P].AA=function (a) {
this.FM(a)
};
Hu[_P].zp=function (a,b) {
Yq().Bs(a,fr);
var c;
try{
c=Mu(b.iJ())
}catch(d) {
this.Bv(a);
return
}this.HM(a,c)
};
Hu[_P].wp=function (a,b) {
Yq().Bs(a,fr);
this.Bv(a,b.zb())
};
Hu[_P].e=function () {
Hu.b.e.call(this);
this.hj.j();
this.hj=null
};
var Nu=function (a) {
if(a&&!a.sort)a.sort=4;
uj.call(this,a)
};
A(Nu,uj);
var Ou="people",Pu=new G(Ou);
Nu[_P].Lc=function () {
return Pu
};
Nu[_P].K=function () {
return 5
};
Nu[_P].mp=function () {
switch(this.Kf) {
case 4:return nn;
default:return null
}
};
var Qu=function (a) {
return new Nu(a)
};
Xh(5,Qu);
var Ru=function (a,b) {
var c=null;
switch(a) {
case 1:c=new Co(2,{
	sort:3,defaultRequest:true,containers:1,start:0,num:50
});
break;
case 2:c=new Co(2,{
	mimeTypes:[b],orphans:0,sort:1,desc:false,start:0,num:50
});
break;
case 3:c=new Nu({
	sort:1,desc:false,start:0,num:50
});
break;
case 4:c=new Bl({
});
break;
default:break
}return c
};
var Su=function (a) {
Bh.call(this);
this.U2=a
};
A(Su,Bh);
var Tu="stat",Uu=new G(Tu);
Su[_P].Lc=function () {
return Uu
};
Su[_P].K=function () {
return 16
};
var Vu="events";
Su[_P].oc=function () {
var a=new D;
a.k(Vu,this.U2);
return a
};
var Wu=function (a) {
return new Su(a.events)
};
Xh(16,Wu);
var Xu=function (a,b,c) {
this.Zp=a;
this.he=b||0;
this.F=c;
this.We=xd(this.uo,this)
};
A(Xu,B);
Xu[_P].Ja=0;
Xu[_P].e=function () {
Xu.b.e.call(this);
this.stop();
this.Zp=null;
this.F=null
};
Xu[_P].start=function (a) {
this.stop();
this.Ja=at(this.We,Xc(a)?a:this.he)
};
pa(Xu[_P],function () {
if(this.je())bt(this.Ja);
this.Ja=0
});
Xu[_P].jI=function () {
this.uo();
this.stop()
};
Xu[_P].je=function () {
return this.Ja!=0
};
Xu[_P].uo=function () {
this.Ja=0;
if(this.Zp)this.Zp.call(this.F)
};
var Yu=function () {
J.call(this);
this.yc=new Pq;
this.m=new $i(this);
var a=Ku();
this.Ni(a);
this.Qr(a);
this.Wb=a;
this.Lb=new D;
this.Cm=new D;
this.vm=new D;
this.Md=new Ej;
this.tN=[];
this.PC=new D;
this.wk=new Xu(this.qE,30000,this);
var b=new Ys(120000);
this.lr=b;
this.m.d(b,$s,this.$J)
};
A(Yu,J);
Yu[_P].dt=null;
var Zu="detroit.store.DocumentStore";
Yu[_P].w=Lk(Zu);
Yu[_P].Xe=null;
Yu[_P].Ka=false;
Yu[_P].cL=false;
Yu[_P].sq=false;
Yu[_P].hD=true;
Yu[_P].ff=null;
Yu[_P].n=null;
Yu[_P].O=null;
Yu[_P].Am=null;
Yu[_P].pE=
true;
var $u=Jr,av=rr,bv="before_doc_initialization",cv=null,dv=function () {
if(!cv)cv=new Yu;
return cv
};
Yu[_P].kO=function (a) {
if(!this.dt) {
var b=a?a.Ca():Ru(1);
b.setStart(0);
b.BO(50);
this.vm.k(b.T(),b);
this.Lb.k(b.T(),b);
this.dt=b
}
};
Yu[_P].MK=function () {
return !(!this.dt)
};
Yu[_P].j3=function (a) {
this.n=a;
var b=this.wk,c=false;
if(this.wk) {
c=b.je();
b.j()
}this.wk=b=new Xu(this.qE,this.n.v1,this);
if(c)b.start()
};
Yu[_P].Xm=function (a) {
var b=this.O;
this.O=a;
if(a)if(a.Ka&&!a.QK()) {
this.pF(a);
this.AC()
}else if(a.QK()) {
this.O=
null;
this.AC()
}else this.m.d(a,[ur,vr],this.PJ);
if(b) {
this.X1(b);
this.m.M(b,[ur,vr],this.PJ)
}
};
var ev="syncinformation";
Yu[_P].pF=function (a) {
var b=this.m;
b.d(a.au(),ev,this.aK);
b.d(a.Xl(),Cr,this.bK)
};
Yu[_P].X1=function (a) {
var b=this.m;
b.M(a.au(),ev,this.aK);
b.M(a.Xl(),Cr,this.bK)
};
Yu[_P].FT=function (a) {
if(this.hD!=a&&this.Ka) {
var b=this.Wb,c=this.ff;
if(a&&b.zb()==ht)this.Ni(b);
else if(!a&&c)this.Ni(c)
}this.hD=a
};
Yu[_P].Ni=function (a) {
var b=this.Xe;
if(b!=a) {
if(b)this.U1(b);
this.Xe=a;
if(a)this.IQ(a)
}
};
var fv="Gears pass-through enabled. All requests will be channeled through the Gears communications manager.";
Yu[_P].pO=function (a) {
if(!a&&this.Xe==this.ff)this.Ni(this.Wb);
this.ff=a;
var b=this.n;
if(a&&b&&b.El) {
this.w.qa(fv);
this.Ni(a);
this.Bq(this.Wb)
}
};
Yu[_P].IQ=function (a) {
this.m.d(a,[Or,Mr,Nr],this.of)
};
Yu[_P].U1=function (a) {
this.m.M(a,[Or,Mr,Nr],this.of)
};
Yu[_P].Qr=function (a) {
this.m.d(a,[et],this.ni)
};
Yu[_P].Bq=function (a) {
this.m.M(a,[et],this.ni)
};
Yu[_P].IE=function () {
this.Wb.Pe(new Zr)
};
Yu[_P].$Z=
function () {
return this.O&&!this.O.Ka
};
Yu[_P].p_=function (a,b) {
var c=a.K();
return this.O&&(c==3||c==1||c==4||c==7)&&b.$t()==xj
};
Yu[_P].Kb=function (a,b) {
if(!this.Ka&&!this.sq) {
this.sq=true;
this.at();
if(this.ff&&this.n.El) {
	this.w.qa(fv);
	this.Ni(this.ff);
	this.Bq(this.Wb)
}var c=this.Lb,d=this.vm,e=Ru(3);
c.k(e.T(),e);
d.k(e.T(),e);
e=Ru(4);
c.k(e.T(),e);
d.k(e.T(),e);
if(!b)at(function () {
	this.Lf(new Ur(a||55))
},5,this)
}
};
var gv="folders",hv="initialization",iv="mimetypes",jv="mimetypesets";
Yu[_P].pe=function (a,
b) {
if(a) {
var c=this.yc,d,e,f=false;
switch(b) {
	case yq:this.dispatchEvent(bv);
	e=this.dt;
	d=c.ag(e);
	break;
	case gv:e=Ru(2,$p().Ia());
	f=true;
	d=c.ag(e);
	break;
	case Ou:e=Ru(3);
	break;
	case Ml:e=Ru(4);
	this.yc.mw(a.Xz());
	break;
	case hv:c.pw(a.tg);
	c.jw(a.kf());
	c.iw(a.ti);
	c.qw(a.gd);
	break;
	case ko:c.pw(a.tg);
	break;
	case iv:c.jw(a.kf());
	break;
	case jv:c.iw(a.ti);
	break;
	case no:c.qw(a.gd);
	break;
	default:break
}if(e)if(!f)this.IM(e,a);
else this.GM(e,a)
}
};
Yu[_P].Ko=function () {
if(this.sq) {
this.sq=false;
this.Ka=true;
this.dispatchEvent(av);
var a=this.Md.ca();
for(var b=0;b<a[o];b++)this.Zx(a[b]);this.at();Yq().Xn(hv,qr);if(this.Wb.zb()==ht) {
	at(this.$J,10000,this);
	this.lr.start()
}
}
};
Yu[_P].AC=function () {
var a=this.tN;
for(var b=0;b<a[o];b++) {
var c=a[b],d=c.request,e=c.response;
this.wJ(d,e)
}
};
var kv="Get sync information for request: ";
Yu[_P].wJ=function (a,b) {
if(this.$Z()) {
this.tN.push({
	request:a,response:b
});
return
}var c=a.T();
this.w.qa(kv+c);
var d=b.Hb(),e=[];
for(var f=0;f<d[o];f++)e.push(d[f].l());this.PC.k(c,e);this.O.au().Yl(c,e)
};
Yu[_P].Yl=function (a,b) {
return a+b
};
Yu[_P].PJ=function (a) {
if(a[x]==vr)this.O=null;
else if(a[x]==ur) {
var b=this.O;
this.pF(b)
}this.AC()
};
Yu[_P].aK=function (a) {
var b=a.n2,c=a.J5,d=this.PC.o(b);
if(d) {
this.PC.remove(b);
var e=Op(d),f=[];
for(var g=0;g<e[o];g++) {
	var h=hq(e[g]),j=c[h.l()];
	h.RO(j);
	f.push(h)
}this.yc.ue(f,undefined,undefined,true)
}
};
var lv="Received document sync update.";
Yu[_P].bK=function (a) {
if(a.Wf) {
this.w.Cj(lv);
this.yc.ue(a.Wf,undefined,undefined,true)
}
};
var mv="Server is ONLINE.",nv="Server is OFFLINE.";
Yu[_P].ni=function (a) {
var b=this.Xe,c=a.Ag;
if(c==ht) {
this.w.qa(mv);
if(this.O&&this.O.od)this.lr.start();
if(this.hD)this.Ni(this.Wb)
}else if(c==vt) {
if(this.O&&this.O.od)this.lr.stop();
if(this.ff) {
	this.w.qa(nv);
	this.Ni(this.ff)
}
}this.lT(b)
};
var ov="Checking if there are latency stats to send.",pv="Sending latency stats.";
Yu[_P].$J=function () {
this.w.qa(ov);
var a=Yq();
if(a.eZ()&&this.Wb==this.Xe) {
this.w.qa(pv);
this.w.qa(a.OV());
this.w.qa(a.aV());
var b=a.YV(),c=new Su(b);
c.uD(false);
this.Lf(c);
this.w.qa(b)
}
};
var qv="Received READY for request id: ",rv="Received SUCCESS for request id: ",sv="Received ERROR for request id: ";
Yu[_P].of=function (a) {
var b=a.kb,c=b.T(),d=a.Ec;
if(!this.Lb.Da(c))return ;
switch(a[x]) {
case Or:this.w.qa(qv+b.l());
break;
case Mr:this.w.qa(rv+b.l());
this.IM(b,d);
break;
case Nr:this.w.qa(sv+b.l());
if(this.Xe!=this.Wb||!this.ff) {
	this.As(b,d);
	this.Cm.k(c,d);
	if(this.Ka)this.Zx(c);
	else this.Md.add(c)
}break
}
};
Yu[_P].IM=function (a,b) {
this.C1(a,b);
if(this.p_(a,b))this.wJ(a,b)
};
Yu[_P].C1=function (a,
b) {
var c=a.T();
this.GM(a,b);
this.Cm.k(c,b);
if(this.Ka)this.Zx(c);
else this.Md.add(c)
};
Yu[_P].GM=function (a,b) {
var c=Yq();
c.iE(a.l(),hr);
if(b.De)this.As(a,b);
var d=a.T();
if(b.qe) {
var e=this.yc;
switch(b.K()) {
	case 2:var f=a.Au;
	if(f&1)this.pe(b,ko);
	if(f&2)this.pe(b,iv);
	if(f&32)this.pe(b,jv);
	if(f&4)this.pe(b,no);
	if(f&16) {
		this.pe(b.Jl,gv);
		this.pe(b.Dm,Ou);
		this.pe(b.Fm,Ml);
		this.pe(b.yl,yq)
	}if(f&1&&f&2&&f&32&&f&4)this.Ko();
	break;
	case 3:this.D1(d,b);
	var g=e.ag(a);
	g.J3(new Date);
	g.vO(a.Mw+a.kk-1);
	g.kD(wl);
	break;
	case 1:case 4:case 7:this.A1(b);
	break;
	case 5:this.B1(a,b);
	break;
	case 10:break;
	case 0:default:if(!b.De)this.As(a,b);
	break
}
}else if(!b.De&&a.K()!=16)this.As(a,b);
c.Bs(a.l(),hr)
};
Yu[_P].B1=function (a,b) {
var c=this.yc.ag(a);
c.vO(a.Mw+a.kk-1);
this.yc.KD(b.wM)
};
Yu[_P].A1=function (a) {
this.yc.ue(a.Hb())
};
Yu[_P].D1=function (a,b) {
var c=this.yc;
c.s3(b.Id());
c.ue(b.Hb(),a,b.Nd)
};
Yu[_P].As=function (a,b) {
this.dispatchEvent(new tv(Kr,this,a,b))
};
Yu[_P].Zx=function (a) {
var b=this.Lb,c=b.o(a),d=this.Cm,e=d.o(a);
if(!e) {
var f={
};
f.error=true;
e=Cj(f,c.K())
}if(c) {
b.remove(a);
this.Md.remove(a);
this.vm.remove(a);
d.remove(a);
this.dispatchEvent(new tv($u,this,c,e))
}this.at()
};
Yu[_P].A2=function (a) {
var b=a.uk,c={
},d=true;
for(var e in b) {
var f=Ul(e),g=cq(f,e);
if(!g||b[e].toString ()!=g.p()) {
	c[e]=b[e];
	if(f==Cl)d=false
}
}if(kf(c)>0) {
var h=new Bl(c);
this.yc.mw(h.Xz());
if(this.Am)this.Am.S_(h);
else this.Am=h;
if(d)this.wk.start();
else this.qE()
}
};
var uv="submit";
Yu[_P].Lf=function (a) {
var b=Yq();
b.a4(a);
var c=this.Lb,d=a.T();
if(!c.o(d)) {
if(a.K()==10&&this.pE) {
	this.A2(a);
	return
}c.k(d,a);
this.dispatchEvent(new tv(uv,this,a));
this.Xe.Pe(a)
}this.at()
};
Yu[_P].qE=function () {
this.wk.stop();
this.pE=false;
this.Lf(this.Am);
this.Am=null;
this.pE=true
};
var vv="idle";
Yu[_P].at=function () {
var a=this.cL,b=this.je();
if(b!=a) {
this.dispatchEvent(new tv(b?Pn:vv,this));
this.cL=b
}
};
Yu[_P].lT=function (a) {
a.DQ();
var b=this.Lb,c=this.vm;
if(b.D()>0)bh(b,function (d,e) {
if(!c.o(e))this.Xe.Pe(d)
},this)
};
Yu[_P].je=function () {
return this.sq||this.Lb.D()>
0||this.Cm.D()>0||this.Md.D()>0
};
Yu[_P].j_=function (a) {
return this.Lb.Da(a.T())
};
Yu[_P].e=function () {
Yu.b.e.call(this);
cv=null;
this.yc.j();
this.yc=null;
if(this.Wb) {
this.Wb.j();
this.Wb=null
}if(this.ff) {
this.ff.j();
this.ff=null
}this.Xe=null;
this.Am=null;
this.wk.j();
this.wk=null;
this.lr.j();
this.lr=null;
this.m.j();
this.m=null;
this.Lb.clear();
this.Lb=null;
this.Cm.clear();
this.Cm=null;
this.vm.clear();
this.vm=null;
this.Md.clear();
this.Md=null;
this.n=null
};
var tv=function (a,b,c,d) {
H.call(this,a,b);
this.kb=
c;
this.Ec=d
};
A(tv,H);
var wv="docsperf",xv="google.com",yv=function (a,b,c) {
B.call(this);
this.iy=a||wv;
this.uG=b||xv;
this.f_=c;
var d,e;
if(c) {
d=new Ys(30000);
e=new $i(this);
e.d(d,$s,this.MY)
}this.U=d;
this.m=e;
if(d)d.start();
ga.getCreationTime=xd(this.LU,this);
ga.getStartLoadTime=xd(this.sJ,this)
};
A(yv,B);
yv[_P].wz=function () {
try{
var a=ms(this.iy);
return a&&nd(a)?Rd(Pf(a)):{
}
}catch(b) {
return {
}
}
};
yv[_P].cO=function (a) {
try{
ls(this.iy,Of(Vd(a)),30,undefined,this.uG)
}catch(b) {
}
};
yv[_P].YM=function () {
try{
os(this.iy,undefined,
this.uG)
}catch(a) {
}
};
yv[_P].MY=function () {
var a=this.wz(),b=(new Date).getTime();
jf(a,function (c,d) {
if(c+30000<b)pf(a,d)
});
if(kf(a)>0)this.cO(a);
else {
this.YM();
this.U.stop()
}
};
yv[_P].sJ=function (a) {
var b=this.wz()[a];
return b?new Date(b):null
};
var zv="__NEW__";
yv[_P].LU=function () {
return this.sJ(zv)
};
yv[_P].PD=function (a,b) {
var c=this.wz();
c[a]=b?b.getTime():(new Date).getTime();
this.cO(c);
if(this.U)this.U.start()
};
yv[_P].l3=function (a) {
this.PD(zv,a)
};
yv[_P].e=function () {
yv.b.e.call(this);
if(this.m) {
this.m.j();
this.m=null
}if(this.U) {
this.U.j();
this.U=null
}if(this.f_)this.YM()
};
var Av="top",Bv=function (a,b,c) {
if(!b)b={
};
var d=c||ga,e=typeofa[rc]!="undefined"?a[rc]:fa(a),f=b[v]||a[v],g=[];
for(var h in b)switch(h) {
case ob:case Kc:case Av:case Vb:g.push(h+zh+b[h]);
break;
case Xb:break;
default:g.push(h+zh+(b[h]?1:0))
}var j=g.join(Kd),k=d.open(e,f,j);
return k
};
var Cv=function (a,b) {
J.call(this);
this.C=a;
this.m=new $i(this);
this.tk=b;
this.m.d(a,$u,this.Rj)
};
A(Cv,J);
Cv[_P].tI=C;
Cv[_P].dL=null;
var Dv="unexecuted",Ev=null,Fv=function (a) {
if(!Ev) {
var b=a||new yv(undefined,undefined,true);
Ev=new Cv(dv(),b)
}return Ev
};
Cv[_P].C3=function (a) {
this.tI=a
};
Cv[_P].Rj=function (a) {
var b=a.kb,c=b.K();
if(a[x]==$u&&c==1) {
this.dL=b;
this.dispatchEvent(new Gv(Jr,this,b,a.Ec))
}
};
Cv[_P].nC=function (a,b) {
var c=Rp(a);
if(c.ig())this.dispatchEvent(new Gv(Dv,this,new sq(100,[a],b?{
path:b
}:
{
})));
else {
var d=Pp(a),e=d.Vt(Up,a.jf(),mq);
if(e) {
	var f=new sq(e,[a]);
	this.execute(f)
}
}
};
Cv[_P].execute=function (a) {
if(a.Qb()==101) {
this.dispatchEvent(new Gv(Dv,this,a));
return
}var b=a.Xg();
if(!b)b=new hm({
actionType:a.Qb()
});
if(nq(a.Hb(),b))switch(b.Qb()) {
case 1:this.LT(a);
break;
case 2:this.fI(a);
break;
default:break
}
};
Cv[_P].MT=function () {
var a=this.dL;
if(a&&a.Nx()) {
var b=a.iW(),c=b[o];
for(var d=0;d<c;d++) {
	var e=b[d];
	this.fI(e)
}
}
};
Cv[_P].NT=function () {
var a=this.tI;
ga.location=a
};
var Hv="_blank";
Cv[_P].LT=function (a) {
var b=a.Hb(),c=Xp(a.Hb()),d=a.Xg(),e=d.II(c),f=d.zJ(c);
switch(d.Yg()) {
case mq:for(var g=0;g<b[o];g++)this.tk.PD(b[g].ap());break;case lq:this.tk.l3();break
}f=Hf(f)?Hv:f;var h=Bv(e,{
target:f
});
if(!h) {
}else h.focus()
};
Cv[_P].fI=function (a) {
this.C.Lf(a)
};
Cv[_P].e=function () {
Cv.b.e.call(this);
Ev=null;
this.C=null;
this.m.j();
this.m=null;
this.tk=null
};
var Gv=function (a,b,c,d) {
H.call(this,a,b);
this.kb=c;
this.Ec=d
};
A(Gv,H);
var Iv="hex",Jv="rgb",Kv=" is not a valid color string",Qv=function (a) {
var b={
};
a=fa(a);
var c=a.charAt(0)==ih?a:ih+a;
if(Lv(c)) {
b.cm=Mv(c);
Ra(b,Iv);
return b
}else {
var d=Nv(a);
if(d[o]) {
	b.cm=Ov(d[0],d[1],d[2]);
	Ra(b,Jv);
	return b
}else if(Pv.hasOwnProperty (a.toLowerCase())) {
	b.cm=Pv[a.toLowerCase()];
	Ra(b,uo);
	return b
}
}throwi(a+Kv);
},Rv=/#(.)(.)(.)/,Sv="'",Tv="' is not a valid hex color",Uv="#$1$1$2$2$3$3",Mv=function (a) {
if(!Lv(a))throwi(Sv+a+Tv);
if(a[o]==4)a=a.replace(Rv,Uv);
return a.toLowerCase()
},Vv=
function (a) {
a=Mv(a);
var b=da(a.substr(1,2),16),c=da(a.substr(3,2),16),d=da(a.substr(5,2),16);
return [b,c,d]
},Wv='"(',Xv='") is not a valid RGB color',Ov=function (a,b,c) {
a=ha(a);
b=ha(b);
c=ha(c);
if(na(a)||a<0||a>255||na(b)||b<0||b>255||na(c)||c<0||c>255)throwi(Wv+a+Kd+b+Kd+c+Xv);
var d=Yv(a.toString (16)),e=Yv(b.toString (16)),f=Yv(c.toString (16));
return ih+d+e+f
};
var Zv=/^#(?:[0-9a-f]{
3
}) {
1,2
}$/i,Lv=function (a) {
return Zv.test(a)
},$v=/^(?:rgb)?\((0|[1-9]\d{
0,2
}),\s?(0|[1-9]\d{
0,2
}),\s?(0|[1-9]\d{
0,2
})\)$/i,
Nv=function (a) {
var b=a.match($v);
if(b) {
var c=ha(b[1]),d=ha(b[2]),e=ha(b[3]);
if(c>=0&&c<=255&&d>=0&&d<=255&&e>=0&&e<=255)return [c,d,e]
}return []
},Yv=function (a) {
return a[o]==1?ce+a:a
};
var aw="#00ffff",bw="#000000",cw="#a9a9a9",dw="#2f4f4f",ew="#696969",fw="#ff00ff",gw="#808080",hw="#d3d3d3",iw="#778899",jw="#708090",kw="#ffffff",Pv={
aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:aw,aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:bw,blanchedalmond:"#ffebcd",blue:"#0000ff",
blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:aw,darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:cw,darkgrey:cw,darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",
darkslategray:dw,darkslategrey:dw,darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:ew,dimgrey:ew,dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:fw,gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:gw,grey:gw,green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",
lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:hw,lightgrey:hw,lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:iw,lightslategrey:iw,lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:fw,maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",
mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",
peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:jw,slategrey:jw,snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",
white:kw,whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"
};
var lw;
var nw=function () {
if(!lw)lw=new mw;
return lw
},pw=function (a) {
return a?new mw(ow(a)):nw()
},qw=function () {
return nw().W
},rw=function (a) {
return nd(a)?la.getElementById(a):a
},sw=rw,tw=function (a,b,c) {
return nw().hf(a,b,c)
},uw=tw,vw="class",ww="for",yw=function (a,b) {
jf(b,function (c,d) {
if(d==Qb)a[u].cssText=c;
else if(d==vw)va(a,c);
else if(d==ww)a.htmlFor=c;
else if(d in xw)a.setAttribute(xw[d],c);
else a[d]=c
})
},xw={
o7:"cellPadding",p7:"cellSpacing",r7:"colSpan",X7:"rowSpan",i8:"vAlign",height:Kc,width:ob,
h8:"useMap",I7:"frameBorder"
},zw="500",Aw="CSS1Compat",Bw="9.50",Cw=function (a) {
var b=a||Uc||ga,c=b[vb];
if(sg&&!Lg(zw)&&!zg) {
if(typeofb.innerHeight=="undefined")b=ga;
var d=b.innerHeight,e=b[vb][Qc][ec];
if(b==b.top)if(e<d)d-=15;
return new Ts(b.innerWidth,d)
}var f=pw(c),g=f.IU()==Aw&&(!pg||pg&&Lg(Bw))?c[Qc]:c[Ub];
return new Ts(g.clientWidth,g.clientHeight)
},Dw=function (a) {
var b=a||Uc||ga,c=b[vb],d,e;
if(!sg&&c[lc]==Aw) {
d=c[Qc][kc];
e=c[Qc][eb]
}else {
d=c[Ub][kc];
e=c[Ub][eb]
}return new Os(d,e)
},Ew=function (a) {
return pw(a).rW()
},
Fw=function () {
var a=nw();
return a.f.apply(a,arguments)
},Gw=function (a) {
return nw().createElement(a)
},Hw=function (a) {
return nw().uK(a)
},Iw=function (a,b) {
a.appendChild(b)
},Jw=function (a) {
var b;
while(b=a[gc])a.removeChild(b)
},Kw=function (a,b) {
if(b[Dc])b[Dc].insertBefore(a,b)
},Lw=function (a,b) {
if(b[Dc])b[Dc].insertBefore(a,b[Hc])
},Mw=function (a) {
return a&&a[Dc]?a[Dc].removeChild(a):null
},Ow=function (a) {
return Nw(a[gc],true)
},Pw=function (a) {
return Nw(a[Hc],true)
},Qw=function (a) {
return Nw(a[fb],false)
},
Nw=function (a,b) {
while(a&&a[ub]!=1)a=b?a[Hc]:a[fb];
return a
};
var Rw="521",Sw=sg&&Kg(ug,Rw)<=0,Tw=function (a,b) {
if(typeofa.contains!="undefined"&&!Sw&&b[ub]==1)return a==b||a.contains(b);
if(typeofa.compareDocumentPosition!="undefined")return a==b||ba(a.compareDocumentPosition(b)&16);
while(b&&a!=b)b=b[Dc];
return b==a
},ow=function (a) {
return a[ub]==9?a:a.ownerDocument||a[vb]
},Uw=function (a) {
return sg?a[vb]||a[Jc][vb]:a.contentDocument||a[Jc][vb]
},Vw="textContent",Ww=function (a,b) {
if(Vw in a)a.textContent=
b;
else if(a[gc]&&a[gc][ub]==3) {
while(a[$b]!=a[gc])a.removeChild(a[$b]);
a[gc].data=b
}else {
while(a.hasChildNodes())a.removeChild(a[$b]);
var c=ow(a);
a.appendChild(c.createTextNode(b))
}
},Yw=function (a,b) {
var c=[];
Xw(a,b,c,true);
return c[o]?c[0]:undefined
},Xw=function (a,b,c,d) {
if(a!=null)for(var e=0,f;f=a[vc][e];e++) {
if(b(f)) {
	c.push(f);
	if(d)return
}Xw(f,b,c,d)
}
},Zw={
SCRIPT:1,STYLE:1,HEAD:1,IFRAME:1,OBJECT:1
},$w={
IMG:E,BR:If
},ax="innerText",cx=function (a) {
var b;
if(F&&ax in a)b=Jf(a.innerText);
else {
var c=
[];
bx(a,c,true);
b=c.join(C)
}b=b.replace(/\xAD/g,C);
b=b.replace(/+/g,E);
if(b!=E)b=b.replace(/^\s/,C);
return b
},bx=function (a,b,c) {
if(a[Sb] in Zw) {
}else if(a[ub]==3)if(c)b.push(fa(a[Nc]).replace(/(\r\n|\r|\n)/g,C));
else b.push(a[Nc]);
else if(a[Sb] in $w)b.push($w[a[Sb]]);
else {
var d=a[gc];
while(d) {
	bx(d,b,c);
	d=d[Hc]
}
}
},dx=function (a) {
if(a&&typeofa[o]==bd)if(qd(a))return typeofa[Gb]==dd||typeofa[Gb]==md;
else if(pd(a))return typeofa[Gb]==dd;
return false
},mw=function (a) {
this.W=a||Uc[vb]||la
};
mw[_P].Oi=
function (a) {
this.W=a
};
mw[_P].c=function (a) {
return nd(a)?this.W.getElementById(a):a
};
mw[_P].hf=function (a,b,c) {
var d=a||el,e=c||this.W,f=e.getElementsByTagName(d);
if(b) {
var g=[];
for(var h=0,j;j=f[h];h++) {
	var k=j[nb];
	if(typeofk.split==dd&&Oe(k.split(E),b))g.push(j)
}return g
}else return f
};
mw[_P].uQ=mw[_P].hf;
var ex=' name="',K='">';
mw[_P].f=function (a,b) {
if(F&&b&&b[Cc])a=Yf+a+ex+eg(b[Cc])+K;
var c=this.createElement(a);
if(b)yw(c,b);
if(arguments[o]>2) {
function d(g) {
	if(g)this.appendChild(c,nd(g)?this.createTextNode(g):
	g)
}for(var e=2;e<arguments[o];e++) {
	var f=arguments[e];
	if(ld(f)&&!(qd(f)&&f[ub]>0))Ge(dx(f)?Ue(f):f,d,this);
	else d.call(this,f)
}
}return c
};
mw[_P].createElement=function (a) {
return this.W.createElement(a)
};
mw[_P].createTextNode=function (a) {
return this.W.createTextNode(a)
};
var L="div";
mw[_P].uK=function (a) {
var b=this.W.createElement(L);
n(b,a);
if(b[vc][o]==1)return b[gc];
else {
var c=this.W.createDocumentFragment();
while(b[gc])c.appendChild(b[gc]);
return c
}
};
var fx="position:absolute;width:0;height:0;width:1",
gx="1px",hx="BackCompat";
mw[_P].IU=function () {
if(this.W[lc])return this.W[lc];
if(sg) {
var a=this.f(L,{
	style:fx
}),b=a[u][r]==gx?hx:Aw;
return this.W.compatMode=b
}return hx
};
var ix="script",jx="document.parentWindow=window";
mw[_P].rW=function () {
var a=this.W;
if(a.parentWindow)return a.parentWindow;
if(sg&&!Lg(zw)&&!zg) {
var b=a.createElement(ix);
n(b,jx);
var c=a[Qc];
c.appendChild(b);
c.removeChild(b);
return a.parentWindow
}return a[yc]
};
mw[_P].appendChild=Iw;
mw[_P].Hi=Jw;
mw[_P].Kp=Kw;
mw[_P].NZ=Lw;
mw[_P].removeNode=
Mw;
mw[_P].ka=Ow;
mw[_P].qb=Pw;
mw[_P].eJ=Qw;
Sa(mw[_P],Tw);
mw[_P].fn=Ww;
var kx,mx=function (a,b,c) {
if(nd(b))lx(a,c,b);
else jf(b,yd(lx,a))
},lx=function (a,b,c) {
a[u][nx(c)]=b
};
var ox=function (a,b) {
var c=ow(a);
if(c[yc]&&c[yc].getComputedStyle) {
var d=c[yc].getComputedStyle(a,C);
if(d)return d[b]
}return null
},px=function (a,b) {
return a[pc]?a[pc][b]:null
},qx=function (a,b) {
return ox(a,b)||px(a,b)||a[u][b]
},rx="px",sx=function (a,b,c) {
var d,e;
if(binstanceofOs) {
d=b.x;
e=b.y
}else {
d=b;
e=c
}Ea(a[u],typeofd==bd?l.round(d)+rx:d);
a[u].top=typeofe==bd?l.round(e)+rx:e
},tx=function (a) {
return new Os(a[Jb],
a[Ic])
},ux=function (a) {
var b;
b=a?(a[ub]==9?a:ow(a)):qw();
if(F&&b[lc]!=Aw)return b[Ub];
return b[Qc]
},vx="position",wx="absolute",xx="1.8.0.11",yx="fixed",zx="TR",Ax=function (a) {
var b=ow(a),c=qg&&b.getBoxObjectFor&&qx(a,vx)==wx&&(a[u].top==C||a[u][Wb]==C);
if(typeofkx=="undefined")kx=rg&&!Lg(xx);
var d=new Os(0,0),e=ux(b);
if(a==e)return d;
var f=null,g;
if(a.getBoundingClientRect) {
g=a.getBoundingClientRect();
var h=Dw(Ew(b));
d.x=g[Wb]+h.x;
d.y=g.top+h.y
}else if(b.getBoxObjectFor&&!c&&!kx) {
g=b.getBoxObjectFor(a);
var j=b.getBoxObjectFor(e);
d.x=g[Yb]-j[Yb];
d.y=g[Zb]-j[Zb]
}else {
f=a;
do{
	d.x+=f[Jb];
	d.y+=f[Ic];
	if(sg&&qx(f,vx)==yx) {
		d.x+=b[Ub][kc];
		d.y+=b[Ub][eb];
		break
	}f=f.offsetParent
}while(f&&f!=a);
if(pg||sg&&qx(a,vx)==wx)d.y-=b[Ub][Ic];
f=a.offsetParent;
while(f&&f!=b[Ub]) {
	d.x-=f[kc];
	if(!pg||f[xc]!=zx)d.y-=f[eb];
	f=f.offsetParent
}
}return d
},Cx=function (a,b) {
var c=Bx(a),d=Bx(b);
return new Os(c.x-d.x,c.y-d.y)
},Bx=function (a) {
var b=new Os;
if(a[ub]==1)if(a.getBoundingClientRect) {
var c=a.getBoundingClientRect();
b.x=c[Wb];
b.y=c.top
}else {
var d=Dw(Ew(ow(a))),e=Ax(a);
b.x=e.x-d.x;
b.y=e.y-d.y
}else {
b.x=a[Oc];
b.y=a[Pc]
}return b
},Dx=function (a,b,c) {
var d=Ax(a);
if(binstanceofOs) {
c=b.y;
b=b.x
}var e=b-d.x,f=c-d.y;
sx(a,a[Jb]+e,a[Ic]+f)
},Ex="missing height argument",Fx=function (a,b,c) {
var d;
if(binstanceofTs) {
d=b[y];
b=b[r]
}else {
if(c==undefined)throwi(Ex);
d=c
}wa(a[u],typeofb==bd?l.round(b)+rx:b);
Za(a[u],typeofd==bd?l.round(d)+rx:d)
},Gx="none",Hx=function (a) {
if(qx(a,Fc)!=Gx)return new Ts(a[Ab],a[Lc]);
var b=a[u],c=b.visibility,
d=b.position;
db(b,Nn);
ua(b,wx);
Ya(b,C);
var e=a[Ab],f=a[Lc];
Ya(b,Gx);
ua(b,d);
db(b,c);
return new Ts(e,f)
},nx=function (a) {
return fa(a).replace(/\-([a-z])/g,function (b,c) {
return c.toUpperCase()
})
},Ix="opacity",Jx="MozOpacity",Kx="filter",Lx="alpha(opacity=",Mx=function (a,b) {
var c=a[u];
if(Ix in c)c.opacity=b;
else if(Jx in c)c.MozOpacity=b;
else if(Kx in c)qa(c,Lx+b*100+Pd)
},M=function (a,b) {
Ya(a[u],b?C:Gx)
},Nx="rtl",Ox="direction",Px=function (a) {
return Nx==qx(a,Ox)
},Qx="MozUserSelect",Rx="WebkitUserSelect",
Sx=qg?Qx:(sg?Rx:null),Tx="unselectable",Ux=function (a,b,c) {
var d=!c?a.getElementsByTagName(el):null,e=Sx;
if(e) {
var f=b?Gx:C;
a[u][e]=f;
if(d)for(var g=0,h;h=d[g];g++)h[u][e]=f
}else if(F||pg) {
var f=b?vi:C;
a.setAttribute(Tx,f);
if(d)for(var g=0,h;h=d[g];g++)h.setAttribute(Tx,f)
}
},Vx=function (a) {
return new Ts(a[Ab],a[Lc])
},Wx="border-box",$x=function (a,b) {
if(F) {
var c=ow(a),d=a[u];
if(c[lc]==Aw) {
	var e=Xx(a),f=Yx(a);
	d.pixelWidth=b[r]-f[Wb]-e[Wb]-e[Sc]-f[Sc];
	d.pixelHeight=b[y]-f.top-e.top-e[oc]-f[oc]
}else {
	d.pixelWidth=
	b[r];
	d.pixelHeight=b[y]
}
}else Zx(a,b,Wx)
},ay="auto",by="pixelWidth",cy="pixelHeight",ey=function (a) {
var b=ow(a),c=F&&a[pc];
if(c&&b[lc]==Aw&&c[r]!=ay&&c[y]!=ay) {
var d=dy(a,c[r],ob,by),e=dy(a,c[y],Kc,cy);
return new Ts(d,e)
}else {
var f=Vx(a),g=Xx(a),h=Yx(a);
return new Ts(f[r]-h[Wb]-g[Wb]-g[Sc]-h[Sc],f[y]-h.top-g.top-g[oc]-h[oc])
}
},fy=";box-sizing:",Zx=function (a,b,c) {
var d=a[u];
if(qg)d.MozBoxSizing=c;
else if(sg)d.WebkitBoxSizing=c;
else if(pg) {
var e=a.getAttribute(Qb)||C;
e=e.replace(/box-sizing:[^;
]+/g,
C)+fy+c;
a.setAttribute(Qb,e)
}else d.l7=c;
wa(d,b[r]+rx);
Za(d,b[y]+rx)
},dy=function (a,b,c,d) {
if(/^\d+px?$/.test(b))return da(b,10);
else {
var e=a[u][c],f=a.runtimeStyle[c];
a.runtimeStyle[c]=a[pc][c];
a[u][c]=b;
var g=a[u][d];
a[u][c]=e;
a.runtimeStyle[c]=f;
return g
}
},gy="pixelLeft",hy=function (a,b) {
return dy(a,px(a,b),Vb,gy)
},iy="Left",jy="Right",ky="Top",ly="Bottom",my=function (a,b) {
if(F) {
var c=hy(a,b+iy),d=hy(a,b+jy),e=hy(a,b+ky),f=hy(a,b+ly);
return new Hs(e,d,f,c)
}else {
var c=ox(a,b+iy),d=ox(a,b+jy),e=
ox(a,b+ky),f=ox(a,b+ly);
return new Hs(ea(e),ea(d),ea(f),ea(c))
}
},ny="padding",Xx=function (a) {
return my(a,ny)
};
var oy={
thin:2,medium:4,thick:6
},py="Style",qy="Width",ry=function (a,b) {
if(px(a,b+py)==Gx)return 0;
var c=px(a,b+qy);
if(c in oy)return oy[c];
return dy(a,c,Vb,gy)
},sy="borderLeft",ty="borderRight",uy="borderTop",vy="borderBottom",wy="borderLeftWidth",xy="borderRightWidth",yy="borderTopWidth",zy="borderBottomWidth",Yx=function (a) {
if(F) {
var b=ry(a,sy),c=ry(a,ty),d=ry(a,uy),e=ry(a,vy);
return new Hs(d,
c,e,b)
}else {
var b=ox(a,wy),c=ox(a,xy),d=ox(a,yy),e=ox(a,zy);
return new Hs(ea(d),ea(c),ea(e),ea(b))
}
};
var Ay=function (a) {
return 1-l.pow(1-a,3)
},By="Start and end parameters must be arrays",Cy="Start and end points must be the same length",Dy=function (a,b,c,d) {
J.call(this);
if(!kd(a)||!kd(b)) {
throwi(By);
return
}if(a[o]!=b[o]) {
throwi(Cy);
return
}this.nn=a;
this.HT=b;
this.Ry=c;
this.bF=d;
this.pj=[]
};
A(Dy,J);
var Ey=[],Fy=null,Gy=function () {
Xs.clearTimeout(Fy);
var a=Ad();
Ge(Ey,function (b) {
if(b)b.cH(a)
});
Fy=Ey[o]==0?null:Xs.setTimeout(Gy,20)
},Hy=function (a) {
if(!Oe(Ey,a))Ey.push(a);
if(Fy==null)Fy=Xs.setInterval(Gy,
20)
},Iy=function (a) {
Te(Ey,a);
if(Ey[o]==0&&Fy!=null) {
Xs.clearInterval(Fy);
Fy=null
}
};
Dy[_P].hc=0;
Dy[_P].pI=0;
Dy[_P].Oe=0;
Dy[_P].zg=null;
Dy[_P].bI=null;
Dy[_P].zB=null;
var Jy="begin",Ky="play",Ly="resume";
Dy[_P].play=function (a) {
if(a||this.hc==0) {
this.Oe=0;
this.pj=this.nn
}else if(this.hc==1)return false;
Iy(this);
this.zg=Ad();
if(this.hc==-1)this.zg-=this.Ry*this.Oe;
this.bI=this.zg+this.Ry;
this.zB=this.zg;
if(this.Oe==0)this.Vf(Jy);
this.Vf(Ky);
if(this.hc==-1)this.Vf(Ly);
this.hc=1;
Hy(this);
this.cH(this.zg);
return true
};
var My="stop",Ny="end";
pa(Dy[_P],function (a) {
Iy(this);
this.hc=0;
if(a)this.Oe=1;
this.ME(this.Oe);
this.Vf(My);
this.Vf(Ny)
});
var Oy="pause";
Dy[_P].pause=function () {
if(this.hc==1) {
Iy(this);
this.hc=-1;
this.Vf(Oy)
}
};
var Py="destroy";
Dy[_P].e=function () {
if(this.hc!=0)this.stop();
this.Vf(Py);
Dy.b.e.call(this)
};
Dy[_P].hT=function () {
this.j()
};
var Qy="finish",Ry="animate";
Dy[_P].cH=function (a) {
this.Oe=(a-this.zg)/(this.bI-this.zg);
if(this.Oe>=1)this.Oe=1;
this.pI=1000/(a-this.zB);
this.zB=a;
if(pd(this.bF))this.ME(this.bF(this.Oe));
else this.ME(this.Oe);
if(this.Oe==1) {
this.hc=0;
Iy(this);
this.Vf(Qy);
this.Vf(Ny)
}else if(this.hc==1)this.Vf(Ry)
};
Dy[_P].ME=function (a) {
this.pj=new Array(this.nn[o]);
for(var b=0;b<this.nn[o];b++)this.pj[b]=(this.HT[b]-this.nn[b])*a+this.nn[b]
};Dy[_P].Vf=function (a) {
this.dispatchEvent(new Sy(a,this))
};
var Sy=function (a,b) {
H.call(this,a);
this.coords=b.pj;
this.x=b.pj[0];
this.y=b.pj[1];
this.n8=b.pj[2];
this.Dl=b.Ry;
this.T7=b.Oe;
this.H7=b.pI;
this.e8=b.hc;
this.j7=b
};
A(Sy,H);
var Ty=function (a,b,c,d,e) {
Dy.call(this,b,c,d,e);
this.ob=a
};
A(Ty,Dy);
var Uy="Start and end points must be 2D",Vy=function (a,b,c) {
Ty.apply(this,arguments);
if(b[o]!=2||c[o]!=2) {
throwi(Uy);
return
}var d=[Jy,Ry,Ny];
zi(this,d,this.$_,false,this)
};
A(Vy,Ty);
Vy[_P].$_=function (a) {
Ea(this.ob[u],l.round(a.x)+rx);
this.ob[u].top=l.round(a.y)+rx
};
var Wy=function (a,b,c,d) {
var e=[a[Jb],a[Ic]];
zi(this,Jy,this.n4,false,this);
Vy.call(this,a,e,b,c,d)
};
A(Wy,Vy);
Wy[_P].n4=function () {
this.nn=[this.ob[Jb],this.ob[Ic]]
};
var Xy=function (a,b,c) {
Ga(this,a);
this.iA=b||a;
this.Ua=true;
this.zo=false;
this.$u=c||new Ps;
this.W=this[v].ownerDocument||this[v][vb];
Ha(this,0);
Ia(this,0);
this.po=0;
this.qo=0;
zi(this.iA,Ni,this.mn,false,this)
};
A(Xy,J);
Xy[_P].L3=function (a) {
this.$u=a||new Ps
};
Xy[_P].Z=function (a) {
this.Ua=a
};
Xy[_P].e=function () {
Xy.b.e.call(this);
Ci(this.iA,Ni,this.mn,false,this);
Ci(this.W,Pi,this.UB,false,this);
Ci(this.W,Oi,this.Fl,false,this);
delete this[v];
delete this.iA
};
Xy[_P].mn=function (a) {
if(this.Ua&&!this.zo) {
var b=
this.dispatchEvent(new Yy(lj,this,a[Oc],a[Pc],a));
if(b!==false) {
	zi(this.W,Pi,this.UB,false,this);
	zi(this.W,Oi,this.Fl,false,this);
	Ha(this,a[Yb]);
	Ia(this,a[Zb]);
	this.po=this[v][Jb];
	this.qo=this[v][Ic];
	this.zo=true;
	a.preventDefault()
}
}
};
Xy[_P].Fl=function (a) {
if(this.zo) {
this.zo=false;
Ci(this.W,Pi,this.UB,false,this);
Ci(this.W,Oi,this.Fl,false,this);
var b=this.nL(this.po),c=this.oL(this.qo);
this.dispatchEvent(new Yy(Ny,this,a[Oc],a[Pc],a,b,c))
}
};
var Zy="beforedrag",$y="drag";
Xy[_P].UB=function (a) {
if(this.zo&&
this.Ua) {
var b=a[Yb]-this[Yb],c=a[Zb]-this[Zb];
this.po+=b;
this.qo+=c;
var d=this.nL(this.po),e=this.oL(this.qo);
Ha(this,a[Yb]);
Ia(this,a[Zb]);
var f=this.dispatchEvent(new Yy(Zy,this,a[Oc],a[Pc],a,d,e));
if(f!==false) {
	this.dT(d,e);
	this.dispatchEvent(new Yy($y,this,a[Oc],a[Pc],a,d,e));
	a.preventDefault()
}
}
};
Xy[_P].nL=function (a) {
var b=this.$u,c=typeofb[Wb]!="undefined"?b[Wb]:null,d=typeofb[r]!="undefined"?b[r]:0,e=c!=null?c+d:Infinity,f=c!=null?c:-Infinity;
return l.min(e,l.max(f,a))
};
Xy[_P].oL=function (a) {
var b=
this.$u,c=typeofb.top!="undefined"?b.top:null,d=typeofb[y]!="undefined"?b[y]:0,e=c!=null?c+d:Infinity,f=c!=null?c:-Infinity;
return l.min(e,l.max(f,a))
};
Xy[_P].dT=function (a,b) {
Ea(this[v][u],a+rx);
this[v][u].top=b+rx
};
var Yy=function (a,b,c,d,e,f,g) {
H.call(this,a);
Ra(this,a);
ab(this,c);
bb(this,d);
this.m7=e;
Ea(this,Xc(f)?f:b.po);
this.top=Xc(g)?g:b.qo;
this.x7=b
};
A(Yy,H);
var az=function (a,b) {
va(a,b)
},bz=function (a) {
var b=a[nb];
return b&&typeofb.split==dd?b.split(E):[]
},N=function (a) {
var b=bz(a),c=We(arguments,1),d=1;
for(var e=0;e<c[o];e++)if(!Oe(b,c[e])) {
b.push(c[e]);
d&=1
}else d&=0;
va(a,b.join(E));
return ba(d)
},cz=function (a) {
var b=bz(a),c=We(arguments,1),d=0;
for(var e=0;e<b[o];e++)if(Oe(c,b[e])) {
Qe(b,e--,1);
d++
}va(a,b.join(E));
return d==c[o]
},dz=function (a,b,c) {
var d=bz(a),e=false;
for(var f=0;f<d[o];f++)if(d[f]==b) {
Qe(d,f--,1);
e=true
}if(e) {
d.push(c);
va(a,d.join(E))
}return e
},
O=function (a,b) {
return Oe(bz(a),b)
},ez=function (a,b,c) {
if(c)N(a,b);
else cz(a,b)
},fz=function (a,b) {
var c=!O(a,b);
ez(a,b,c);
return c
};
var gz="525",hz=function (a) {
if(!F&&!(sg&&Lg(gz)))return true;
if(a>=48&&a<=57)return true;
if(a>=96&&a<=106)return true;
if(a>=65&&a<=90)return true;
if(a==27&&sg)return false;
switch(a) {
case 13:case 27:case 32:case 63:case 107:case 109:case 110:case 111:case 186:case 189:case 187:case 188:case 190:case 191:case 192:case 222:case 219:case 220:case 221:return true;
default:return false
}
},iz=function (a) {
if(a>=48&&a<=57)return true;
if(a>=96&&a<=106)return true;
if(a>=65&&a<=90)return true;
switch(a) {
case 32:case 63:case 107:case 109:case 110:case 111:case 186:case 189:case 187:case 188:case 190:case 191:case 192:case 222:case 219:case 220:case 221:return true;
default:return false
}
};
var jz=function () {
this.pB=false;
this.qB=false;
this.Pc=[];
this.Xb=[];
this.Oy=null;
this.Gw=null;
this.Qw=null;
this.Vy=null;
this.GT=300
};
A(jz,J);
var kz="dragover",lz="dragout",mz="dragend",nz=5;
jz[_P].Ka=false;
jz[_P].t3=function (a) {
this.Oy=a
};
var oz="Call to pure virtual method";
jz[_P].u=function () {
throwi(oz);
};
jz[_P].Of=function (a) {
this.Xb.push(a);
a.qB=true;
this.pB=true
};
jz[_P].hg=function () {
if(this.Ka)return ;
for(var a,b=0;a=this.Pc[b];b++)this.zK(a);this.Ka=true
};jz[_P].zK=function (a) {
if(this.pB) {
zi(a.ob,
Ni,a.HL,false,a);
if(this.Gw)N(a.ob,this.Gw)
}if(this.qB&&this.Qw)N(a.ob,this.Qw)
};
jz[_P].k6=function (a) {
if(this.pB) {
Ci(a.ob,Ni,a.HL,false,a);
if(this.Gw)cz(a.ob,this.Gw)
}if(this.qB&&this.Qw)cz(a.ob,this.Qw)
};
var pz="marginLeft",qz="marginTop";
jz[_P].PF=function (a) {
var b=Ax(a),c=qx(a,pz),d=qx(a,qz);
if(F) {
if(d==ay)d=ce;
if(c==ay)c=ce
}b.x-=da(c,10)*2;
b.y-=da(d,10)*2;
return b
};
jz[_P].zC=function (a,b) {
var c=a;
if(qg&&wg) {
var d=pw(a);
c=d.f(L,{
},a);
var e=a[u][r];
if(e&&e.indexOf(xh)==-1) {
	wa(c[u],a[u][r]);
	wa(a[u],
	C)
}else wa(c[u],b[Ab]);
Xa(c[u],ay)
}return c
};
var rz="dragstart";
jz[_P].mn=function (a,b) {
if(this.Ed)return ;
var c=b.Yh,d=this.PF(c),e=b.Zg();
if(this.Oy)N(e,this.Oy);
this.Al=e=this.zC(e,c);
var f=e[u];
ua(f,wx);
Ea(f,d.x+rx);
f.top=d.y+rx;
ow(c)[Ub].appendChild(e);
this.Ed=b;
this.mc=new Xy(e);
zi(this.mc,$y,this.IL,false,this);
zi(this.mc,Ny,this.Fl,false,this);
zi(ow(e),Qi,this.lk,false,this);
this.PM();
this.Mh=null;
var g=new sz(rz,this,this.Ed);
this.dispatchEvent(g);
this.mc.mn(a);
a.preventDefault()
};
jz[_P].PM=
function () {
this.Rw=[];
for(var a,b=0;a=this.Xb[b];b++)for(var c,d=0;c=a.Pc[d];d++)this.KQ(a,c);if(!this.Yi)this.Yi=new Hs(0,0,0,0)
};var tz="drop";jz[_P].Fl=function (a) {
var b=this.Mh;
if(b&&b.Mb) {
var c=a[Oc],d=a[Pc],e=ux(this.Al),f=c+e[kc],g=d+e[eb],h=new sz($y,this,this.Ed,b.Mb,b.hm,b.h,c,d,f,g);
this.dispatchEvent(h);
var j=new sz(tz,this,this.Ed,b.Mb,b.hm,b.h,c,d,f,g);
b.Mb.dispatchEvent(j);
var k=new sz(mz,this,this.Ed);
this.dispatchEvent(k);
this.uj();
this.rs()
}else {
var k=new sz(mz,this,this.Ed);
this.dispatchEvent(k);
this.uj();
this.zF()
}
};
jz[_P].uj=function () {
Ci(this.mc,$y,this.IL,false,this);
Ci(this.mc,Ny,this.Fl,false,this);
Ci(ow(this.Al),Qi,this.lk,false,this);
this.mc.j()
};
jz[_P].zF=function () {
var a=this.PF(this.Ed.Yh),b=this.Vy=new Wy(this.Al,[a.x,a.y],this.GT);
b.play();
zi(b,Ny,this.qX,false,this)
};
jz[_P].rs=function () {
var a=this.Vy;
if(a) {
Gi(a);
a.hT()
}Mw(this.Al);
delete this.Vy;
delete this.Ed;
delete this.Al;
delete this.mc;
delete this.Rw;
delete this.Mh
};
jz[_P].qX=function () {
this.rs()
};
jz[_P].IL=function (a) {
var b=
a[Oc],c=a[Pc],d=ux(this.Al);
b+=d[kc];
c+=d[eb];
var e=this.Mh;
if(e) {
if(this.jB(b,c,e.xd))return ;
this.fH()
}if(!this.jB(b,c,this.Yi))return ;
e=this.Mh=this.eW(b,c);
if(e&&e.Mb) {
this.dispatchEvent(new sz(kz,this,this.Ed,e.Mb,e.hm,e.h));
e.Mb.dispatchEvent(new sz(kz,this,this.Ed,e.Mb,e.hm,e.h))
}if(!e)this.qS(b,c)
};
jz[_P].fH=function () {
var a=this.Mh;
if(a.Mb) {
this.dispatchEvent(new sz(lz,this,this.Ed,a.Mb,a.hm,a.h));
a.Mb.dispatchEvent(new sz(lz,this,this.Ed,a.Mb,a.hm,a.h))
}this.Mh=null
};
var uz="tr",vz="td",
wz="th",yz=function (a) {
switch(a[xc].toLowerCase()) {
case uz:case vz:case wz:return xz(a);
default:return a.cloneNode(true)
}
},zz="TABLE",Az="TBODY",Bz="COL",Cz="COLGROUP",Dz="table",Ez="tbody",xz=function (a) {
var b=Fz(a,zz,3),c=Fz(a,Az,2),d=[];
if(b) {
var e=b[vc];
for(var f=0;f<e[o];f++)if(Mf(e[f][xc],Bz)==0||Mf(e[f][xc],Cz)==0)d.push(e[f].cloneNode(true))
}var g=b?b.cloneNode(false):Gw(Dz),h=c?c.cloneNode(false):Gw(Ez);for(var f=0;f<d[o];f++)g.appendChild(d[f]);g.appendChild(h);switch(a[xc].toLowerCase()) {
case uz:h.appendChild(a.cloneNode(true));
break;
case vz:case wz:h.appendChild(Fw(uz,null,a.cloneNode(true)));
break;
default:break
}return g
},Fz=function (a,b,c) {
var d=ow(a),e=0;
while(a&&Mf(a[xc],b)!=0) {
if(a==d||e>=c)return null;
a=a[Dc];
e++
}return a
};
jz[_P].KQ=function (a,b) {
var c=b.ah(),d=this.Rw;
for(var e=0;e<c[o];e++) {
var f=c[e],g=Ax(f),h=Hx(f),j=new Hs(g.y,g.x+h[r],g.y+h[y],g.x);
d.push(new Gz(j,a,b,f));
if(d[o]==1)this.Yi=new Hs(j.top,j[Sc],j[oc],j[Wb]);
else {
	var k=this.Yi;
	Ea(k,l.min(j[Wb],k[Wb]));
	cb(k,l.max(j[Sc],k[Sc]));
	k.top=l.min(j.top,
	k.top);
	Oa(k,l.max(j[oc],k[oc]))
}
}
};
jz[_P].qS=function (a,b) {
var c=new Hs(this.Yi.top,this.Yi[Sc],this.Yi[oc],this.Yi[Wb]);
for(var d,e=0;d=this.Rw[e];e++) {
if(d.xd[Sc]<=a&&d.xd[Sc]>c[Wb])Ea(c,d.xd[Sc]);
if(d.xd[Wb]>=a&&d.xd[Wb]<c[Sc])cb(c,d.xd[Wb]);
if(d.xd[oc]<=b&&d.xd[oc]>c.top)c.top=d.xd[oc];
if(d.xd.top>=b&&d.xd.top<c[oc])Oa(c,d.xd.top)
}this.Mh=new Gz(c)
};
jz[_P].eW=function (a,b) {
for(var c,d=0;c=this.Rw[d];d++)if(this.jB(a,b,c.xd))return c;return null
};jz[_P].jB=function (a,b,c) {
return a>c[Wb]&&a<c[Sc]&&
b>c.top&&b<c[oc]
};
jz[_P].lk=function (a) {
if(a[fc]==27)this.ER()
};
jz[_P].ER=function () {
if(this.Mh!=null)this.fH();
var a=new sz(mz,this,this.Ed);
this.dispatchEvent(a);
this.uj();
this.zF()
};
jz[_P].Z1=function () {
for(var a,b=0;a=this.Pc[b];b++)this.Vb(a);sa(this.Pc,0)
};jz[_P].Vb=function () {
throwi(oz);
};
jz[_P].e=function () {
jz.b.e.call(this);
this.Z1()
};
var sz=function (a,b,c,d,e,f,g,h,j,k) {
H.call(this,a);
this.Qy=b;
this.Bl=c;
this.y7=d;
this.Sg=e;
this.Cl=f;
ab(this,g);
bb(this,h);
this.k8=j;
this.l8=k
};
A(sz,H);
var Hz=
"Invalid argument",Iz=function (a,b) {
this.ob=rw(a);
this.data=b;
if(!this.ob)throwi(Hz);
};
A(Iz,J);
Iz[_P].X=null;
Iz[_P].Yh=null;
Iz[_P].$g=function (a) {
return a
};
Iz[_P].Zg=function () {
var a=this.Yh;
return a?yz(a):null
};
Iz[_P].ah=function () {
return [this.ob]
};
Iz[_P].HL=function (a) {
if(!a.fm(0))return ;
var b=this.$g(a[v]);
if(b) {
zi(b,Pi,this.sm,true,this);
zi(b,ci,this.sm,true,this);
zi(b,Oi,this.VB,true,this);
this.Yh=b;
this.Jr=new Os(a[Oc],a[Pc]);
a.preventDefault()
}
};
Iz[_P].sm=function (a) {
if(!a.fm(0))return ;
var b=
l.abs(a[Oc]-this.Jr.x)+l.abs(a[Pc]-this.Jr.y);
if(b>nz) {
var c=this.Yh;
Ci(c,Pi,this.sm,true,this);
Ci(c,ci,this.sm,true,this);
Ci(c,Oi,this.VB,true,this);
delete this.Jr;
this.X.mn(a,this)
}
};
Iz[_P].VB=function () {
var a=this.Yh;
Ci(a,Pi,this.sm,true,this);
Ci(a,ci,this.sm,true,this);
Ci(a,Oi,this.VB,true,this);
delete this.Jr;
this.Yh=null
};
var Gz=function (a,b,c,d) {
this.xd=a;
this.Mb=b;
this.hm=c;
this.h=d
};
var Jz=function (a) {
jz.call(this);
this.oa=a
};
A(Jz,jz);
Jz[_P].oo=null;
Jz[_P].ua=function () {
return this.oa
};
Jz[_P].sw=function (a) {
this.oa=a
};
Jz[_P].u=function (a,b) {
a.X=this;
this.Pc.push(a);
if(b)this.zK(a)
};
Jz[_P].Vb=function (a) {
if(this.Ed==a)this.oo=a;
else this.bN(a)
};
Jz[_P].bN=function (a) {
var b=this.Pc;
for(var c=0;c<b[o];c++)if(a==b[c]) {
b.splice(c,1);
this.k6(a)
}
};
Jz[_P].Sb=function () {
return this.Pc
};
Jz[_P].rs=function () {
Jz.b.rs.call(this);
if(this.oo) {
this.bN(this.oo);
this.oo=null
}
};
Jz[_P].e=function () {
Jz.b.e.call(this);
this.oo=null
};
var Kz=function (a,b,c) {
Iz.call(this,a,c);
this.F=b
};
A(Kz,Iz);
Kz[_P].Ts=null;
Kz[_P].ah=function () {
var a=this.F;
if(a&&a.ah)return a.ah();
return Kz.b.ah.call(this)
};
Kz[_P].$g=function (a) {
var b=this.F;
this.Ts=b&&b.EI?b.EI(a):null;
if(b&&b.$g)return b.$g(a);
return Kz.b.$g.call(this,a)
};
Kz[_P].Zg=function () {
var a=this.F;
if(a&&typeofa.Zg==dd)return a.Zg(this.Yh);
return Kz.b.Zg.call(this)
};
Kz[_P].e=function () {
Kz.b.e.call(this);
this.F=null
};
var Lz=function () {
B.call(this);
this.gd=new Ej;
this.Xb=new Ej
};
A(Lz,B);
Lz[_P].Of=function (a) {
this.Xb.add(a);
bh(this.gd,function (b) {
b.Of(a)
});
a.hg()
};
Lz[_P].Pr=function (a) {
this.gd.add(a);
bh(this.Xb,function (b) {
a.Of(b)
});
a.hg()
};
Lz[_P].e=function () {
Mz.b.e.call(this);
bh(this.gd,function (a) {
a.j()
});
this.gd.clear();
this.gd=null;
bh(this.Xb,function (a) {
a.j()
});
this.Xb.clear();
this.Xb=null
};
;
var Mz=function () {
B.call(this);
this.pp=new D
};
A(Mz,B);
Mz[_P].fo=function (a) {
return new Jz(a)
};
Mz[_P].NI=function (a) {
var b=this.pp.o(a);
if(!b)this.pp.k(a,b=new Lz);
return b
};
Mz[_P].Of=function (a,b) {
this.NI(b).Of(a)
};
Mz[_P].Pr=function (a,b) {
this.NI(b).Pr(a)
};
Mz[_P].e=function () {
Mz.b.e.call(this);
bh(this.pp,function (a) {
a.j()
});
this.pp.clear();
this.pp=null
};
var P=function (a) {
J.call(this);
this.i=a||pw();
this.Lv=Nz
};
A(P,J);
var Oz=0,Nz=null,Pz="action",Qz="change",Rz="highlight",Sz="unhighlight",Tz=Pz,Uz=Qz,Vz="Component already rendered",Wz="Unable to set parent component",Xz="disable",Yz="enable",Zz="activate",$z="deactivate",aA="select",bA="unselect",cA="check",dA="uncheck",eA="close",fA="Invalid component state",gA=function (a,b) {
switch(a) {
case 1:return b?Xz:Yz;
case 2:return b?Rz:Sz;
case 4:return b?Zz:$z;
case 8:return b?aA:bA;
case 16:return b?cA:dA;
case 32:return b?Mi:Li;
case 64:return b?mq:eA;
default:
}throwi(fA);
},hA=function (a) {
Nz=a
};
P[_P].Ja=null;
P[_P].i=null;
P[_P].z=false;
P[_P].h=null;
P[_P].Lv=null;
P[_P].Y=null;
P[_P].X=null;
P[_P].lc=null;
P[_P].Tf=null;
P[_P].kQ=null;
P[_P].l=function () {
return this.Ja||(this.Ja=this.xV())
};
P[_P].AD=function (a) {
if(this.X&&this.X.Tf) {
pf(this.X.Tf,this.Ja);
tf(this.X.Tf,a,this)
}this.Ja=a
};
P[_P].c=function () {
return this.h
};
P[_P].Hk=function (a) {
this.h=a
};
P[_P].Nk=function (a) {
if(this==a)throwi(Wz);
if(a&&this.X&&
this.X.AI(this.Ja))throwi(Wz);
this.X=a
};
P[_P].J=function () {
return this.X
};
P[_P].Ul=function () {
return this.X
};
P[_P].f=function () {
this.h=this.i.createElement(L)
};
P[_P].ub=function (a) {
this.HC(a)
};
P[_P].HC=function (a,b) {
if(this.z)throwi(Vz);
if(!this.h)this.f();
if(a)a.insertBefore(this.h,b||null);
else this.i.W[Ub].appendChild(this.h);
if(!this.X||this.X.z)this.t()
};
var iA="Invalid element to decorate";
P[_P].Q=function (a) {
if(this.z)throwi(Vz);
else if(a&&this.Na(a)) {
this.kQ=true;
if(!this.i||this.i.W!=
ow(a))this.i=pw(a);
this.Oa(a);
this.t()
}else throwi(iA);
};
P[_P].Na=function () {
return true
};
P[_P].Oa=function (a) {
this.h=a
};
P[_P].t=function () {
this.z=true;
this.Zd(function (a) {
if(!a.z&&a.c())a.t()
})
};
P[_P].$=function () {
this.Zd(function (a) {
if(a.z)a.$()
});
this.z=false
};
P[_P].e=function () {
P.b.e.call(this);
if(this.z)this.$();
this.Zd(function (a) {
a.j()
});
if(!this.kQ&&this.h)Mw(this.h);
this.lc=null;
this.Tf=null;
this.h=null;
this.Y=null;
this.X=null
};
P[_P].G=function (a) {
return this.l()+Vc+a
};
P[_P].A=function (a) {
this.Y=
a
};
P[_P].Ft=function (a) {
return a.substring(this.l()[o]+1)
};
P[_P].xV=function () {
return fe+Oz++
};
P[_P].I=function (a,b) {
this.Ud(a,this.pd(),b)
};
var jA="Child component index out of bounds";
P[_P].Ud=function (a,b,c) {
if(a.z&&(c||!this.z))throwi(Vz);
if(b<0||b>this.pd())throwi(jA);
a.Nk(this);
if(!this.Tf||!this.lc) {
this.Tf={
};
this.lc=[]
}tf(this.Tf,a.l(),a);
Re(this.lc,a,b);
if(c) {
if(!this.h)this.f();
var d=this.Mc(b+1);
a.HC(this.fa(),d?d.h:null)
}else if(this.z&&!a.z&&a.h)a.t()
};
P[_P].fa=function () {
return this.h
};
P[_P].fb=function () {
if(this.Lv==null)this.Lv=Px(this.z?this.h:this.i.W[Ub]);
return this.Lv
};
P[_P].Oc=function () {
return !(!this.lc)&&this.lc[o]!=0
};
P[_P].pd=function () {
return this.lc?this.lc[o]:0
};
P[_P].AI=function (a) {
return this.Tf&&a?uf(this.Tf,a)||null:null
};
P[_P].Mc=function (a) {
return this.lc?this.lc[a]||null:null
};
P[_P].Zd=function (a,b) {
if(this.lc)Ge(this.lc,a,b)
};
P[_P].Wj=function (a) {
return this.lc&&a?Fe(this.lc,a):-1
};
var kA="Child is not in parent component";
Fa(P[_P],function (a,b) {
if(a) {
var c=
nd(a)?a:a.l();
a=this.AI(c);
if(c&&a) {
	pf(this.Tf,c);
	Te(this.lc,a);
	if(b) {
		a.$();
		if(a.h)Mw(a.h)
	}a.Nk(null)
}
}if(!a)throwi(kA);
return a
});
P[_P].Aq=function (a,b) {
return this.removeChild(this.Mc(a),b)
};
P[_P].Hi=function (a) {
while(this.Oc())this.Aq(0,a)
};
var lA=function () {
J.call(this);
this.Fk=new D
};
A(lA,J);
lA[_P].cz=null;
lA[_P].XE=null;
lA[_P].hA=null;
lA[_P].CB=null;
lA[_P].A3=function (a) {
this.cz=a
};
lA[_P].w4=function (a) {
this.XE=a
};
lA[_P].x4=function (a) {
this.hA=a
};
lA[_P].dn=function (a,b) {
var c=[],d=this.Fk;
bh(a,function (e,f) {
if(e==this.$c(f))return ;
if(e)d.k(f,b);
else d.remove(f);
c.push(f)
},this);
this.dispatchEvent(new mA(c))
};
lA[_P].Mj=function () {
var a=this.cz,b=this.Fk.Nc();
return a?a(b):b
};
lA[_P].cc=function () {
var a=this.Mj();
return Op(a)
};
lA[_P].Pj=
function () {
var a=this.Mj(),b=this.XE;
return b?b(a):new D
};
lA[_P].gA=function (a) {
var b=this.hA;
return b?b(a):new Ej
};
lA[_P].Wx=function (a) {
var b=[],c=this.Fk;
bh(a,function (d) {
if(!this.$c(d))return ;
c.remove(d);
b.push(d)
},this);
this.dispatchEvent(new mA(b))
};
lA[_P].OR=function () {
this.Wx(this.Mj())
};
lA[_P].Y5=function (a,b) {
var c=this.Fk,d=[a];
if(c.Da(a))c.remove(a);
else {
c.k(a,b);
if(b==Ii) {
	var e=this.Mj();
	for(var f=0;f<e[o];f++) {
		var g=e[f];
		if(g!=a) {
			c.remove(g);
			d.push(g)
		}
	}
}
}this.dispatchEvent(new mA(d))
};
lA[_P].$c=function (a) {
return this.Fk.Da(a)
};
var nA="slect_in_view";
lA[_P].t6=function () {
this.dispatchEvent(nA)
};
lA[_P].FD=function (a) {
this.CB=a
};
lA[_P].e=function () {
lA.b.e.call(this);
this.Fk.clear();
this.Fk=null;
this.cz=null;
this.XE=null;
this.hA=null
};
var mA=function (a) {
H.call(this,aA);
this.vZ=a
};
A(mA,H);
var pA=function () {
J.call(this);
this.m=new $i(this);
this.m.d(this,oA,this.ni)
};
A(pA,J);
pA[_P].V=null;
pA[_P].C=null;
pA[_P].bq=null;
pA[_P].vQ=60000;
pA[_P].us=null;
var qA="The server encountered an error. Please try again later.",rA=z(qA),oA=Qz,sA=Mb,tA="loading";
pA[_P].Ht=function () {
return rA
};
pA[_P].jD=function (a) {
var b=this.m;
if(this.V)b.M(this.V,Jr,this.EJ);
this.V=a;
if(a)b.d(a,Jr,this.EJ)
};
pA[_P].Pq=function (a) {
var b=this.m;
if(this.C) {
b.M(this.C,Kr,this.NJ);
b.M(this.C,[vv,Pn],this.MJ)
}this.C=a;
if(a) {
b.d(a,
Kr,this.NJ);
b.d(a,[vv,Pn],this.MJ)
}
};
pA[_P].fd=function (a,b,c) {
if(this.dispatchEvent(new uA(oA,b,a,undefined,undefined,c))&&b==Kr)alert(a)
};
var vA="clear";
pA[_P].ts=function (a) {
this.dispatchEvent(new uA(vA,a))
};
pA[_P].EJ=function (a) {
var b=a.kb,c=a.Ec,d=null;
if(b.xr) {
d=null;
this.ts();
return
}if(b.K()==1&&b.xl&&(!c||!c.De)) {
switch(b.Qb()) {
	case 0:d=this.aW(b);
	break;
	case 10:d=this.gV(b);
	break;
	case 2:d=this.hW(b);
	break;
	case 8:d=this.yU(b);
	break;
	case 3:d=this.$U(b);
	break;
	default:break
}if(d)this.dispatchEvent(new uA(oA,
Pz,d,this.jW(b),b))
}
};
pA[_P].NJ=function (a) {
var b=a.Ec,c=a.kb,d=null;
d=b&&b.De&&b.Tg?b.Tg:this.Ht();
if(d&&c.xl)this.dispatchEvent(new uA(oA,Kr,d))
};
pA[_P].ni=function () {
if(this.us)bt(this.us);
this.us=at(this.RR,this.vQ,this)
};
pA[_P].RR=function () {
this.ts();
this.us=null
};
pA[_P].MJ=function (a) {
switch(a[x]) {
case Pn:if(!this.bq)this.bq=at(this.kT,0,this);
break;
case vv:if(this.bq) {
	bt(this.bq);
	this.bq=null
}this.ts(tA);
break;
default:break
}
};
var wA="Loading...";
pA[_P].kT=function () {
var a=z(wA);
this.dispatchEvent(new uA(oA,
tA,a))
};
var xA="{$num} documents have been starred.",yA='"{$name}" has been starred.',zA="{$num} documents have been unstarred.",AA='"{$name}" has been unstarred.';
pA[_P].aW=function (a) {
var b=a.Hb(),c=b[o];
if(a.p()) {
if(c>1) {
	var d=z(xA,{
		num:c
	});
	return d
}else if(c==1) {
	var e=z(yA,{
		name:b[0].q()
	});
	return e
}
}else if(c>1) {
var f=z(zA,{
	num:a.Hb()[o]
});
return f
}else if(c==1) {
var g=z(AA,{
	name:b[0].q()
});
return g
}return null
};
var BA="{$num} documents have been hidden.",CA='"{$name}" has been hidden.',DA="{$num} documents are no longer hidden.",
EA='"{$name}" is no longer hidden.';
pA[_P].gV=function (a) {
var b=a.Hb(),c=b[o];
if(a.p()) {
if(c>1) {
	var d=z(BA,{
		num:a.Hb()[o]
	});
	return d
}else if(c==1) {
	var e=z(CA,{
		name:a.Hb()[0].q()
	});
	return e
}
}else if(c>1) {
var f=z(DA,{
	num:a.Hb()[o]
});
return f
}else if(c==1) {
var g=z(EA,{
	name:a.Hb()[0].q()
});
return g
}return null
};
var FA="{$num} documents have been moved to the trash.",GA='"{$name}" has been moved to the trash.',HA="{$num} documents have been taken out of the trash.",IA='"{$name}" has been taken out of the trash.';
pA[_P].hW=function (a) {
var b=a.Hb(),c=b[o];
if(a.p()) {
if(c>1) {
	var d=z(FA,{
		num:c
	});
	return d
}else if(c==1) {
	var e=z(GA,{
		name:b[0].q()
	});
	return e
}
}else if(c>1) {
var f=z(HA,{
	num:c
});
return f
}else if(c==1) {
var g=z(IA,{
	name:b[0].q()
});
return g
}return null
};
var JA="{$num} documents have been deleted.",KA='"{$name}" has been deleted.',LA="All items in the trash have been deleted.";
pA[_P].$U=function (a) {
if(a.p()) {
var b=a.Hb(),c=b[o];
if(c>1) {
	var d=z(JA,{
		num:c
	});
	return d
}else if(c==1) {
	var e=z(KA,{
		name:b[0].q()
	});
	return e
}else {
	var f=z(LA);
	return f
}
}return null
};
var MA="Undo";
pA[_P].jW=function (a) {
if(a.Nx()) {
var b=z(MA);
return b
}return null
};
pA[_P].GG=function (a) {
var b=[];
for(var c=0;c<a[o];c++) {
var d=Np(a[c]);
if(d)b.push(Zd+d.q()+Zd)
}return b.join(Kd)
};
var NA="{$num} documents have been moved from {$from} to {$to}.",OA='"{$name}" has been moved from {$from} to {$to}.',PA="{$num} documents have been moved to {$to}.",QA='"{$name}" has been moved to {$to}.',RA="{$num} documents have been moved from {$from} to another folder.",
SA='"{$name}" has been moved from {$from} to another folder.',TA="{$num} documents have been moved to another folder.",UA='"{$name}" has been moved to another folder.',VA="{$num} documents have been added to {$to}.",WA='"{$name}" has been added to {$to}.',XA="{$num} documents have been added to another folder.",YA='"{$name}" has been added to another folder.',ZA="{$num} documents have been removed from {$from}.",$A='"{$name}" has been removed from {$from}.',aB="{$num} documents have been removed from current folder.",
bB='"{$name}" has been removed from current folder.';
pA[_P].yU=function (a) {
var b=this.GG(a.Oh),c=this.GG(a.Ii),d=a.Hb(),e=d[o],f=a.Oh[o],g=a.Ii[o],h=a.sh.Qa(),j=a.Ih.Qa();
if((f>0||!h)&&(g>0||!j)) {
if(h&&j) {
	if(e>1) {
		var k=z(NA,{
			num:e,from:c,to:b
		});
		return k
	}else if(e==1) {
		var m=z(OA,{
			name:d[0].q(),from:c,to:b
		});
		return m
	}
}else if(h) {
	if(e>1) {
		var p=z(PA,{
			num:e,to:b
		});
		return p
	}else if(e==1) {
		var q=z(QA,{
			name:d[0].q(),to:b
		});
		return q
	}
}else if(j) {
	if(e>1) {
		var t=z(RA,{
			num:e,from:c
		});
		return t
	}else if(e==1) {
		var w=
		z(SA,{
			name:d[0].q(),from:c
		});
		return w
	}
}else if(e>1) {
	var $=z(TA,{
		num:e
	});
	return $
}else if(e==1) {
	var za=z(UA,{
		name:d[0].q()
	});
	return za
}
}else if(f>0||!h) {
if(h) {
	if(e>1) {
		var ka=z(VA,{
			num:e,to:b
		});
		return ka
	}else if(e==1) {
		var ic=z(WA,{
			name:d[0].q(),to:b
		});
		return ic
	}
}else if(e>1) {
	var zb=z(XA,{
		num:e
	});
	return zb
}else if(e==1) {
	var Fd=z(YA,{
		name:d[0].q()
	});
	return Fd
}
}else if(g>0||!j)if(j) {
if(e>1) {
	var sd=z(ZA,{
		num:e,from:c
	});
	return sd
}else if(e==1) {
	var ff=z($A,{
		name:d[0].q(),from:c
	});
	return ff
}
}else if(e>1) {
var ue=
z(aB,{
	num:e
});
return ue
}else if(e==1) {
var ed=z(bB,{
	name:d[0].q()
});
return ed
}return null
};
pA[_P].e=function () {
pA.b.e.call(this);
this.m.j();
this.m=null;
this.V=null
};
var uA=function (a,b,c,d,e,f) {
H.call(this,a);
this.Ag=b;
Ka(this,c);
this.i6=d;
this.kb=e;
this.a_=f
};
A(uA,H);
var cB="goog-inline-block",dB="change-owner-label",eB="change-owner-wrap-input",fB="change-owner-section",gB=cB;
;
var hB=[768,111,276,6,264,44,2,0,2,1,2,1,2,0,73,5,54,19,18,0,102,6,2,6,3,1,2,3,36,0,31,26,92,10,337,2,57,0,2,15,4,3,14,1,30,2,57,0,2,15,10,0,11,1,30,2,57,17,35,1,16,2,57,0,2,15,21,1,30,2,57,0,2,25,43,0,60,25,42,2,59,24,44,1,57,0,2,24,44,1,59,25,43,1,71,41,62,0,3,6,13,7,99,0,3,8,12,5,75,1,28,0,2,0,2,0,5,1,50,19,2,1,9,44,10,0,102,13,29,3,774,0,947,2,30,2,30,1,31,1,67,29,10,0,46,2,156,0,119,27,117,16,8,1,78,4,933,3,585,1,195,27,3903,5,106,1,30568,0,4,0,5,0,24,4,21239,0,738,15,17,3],jB=function (a,b) {
var c=
b||10;
if(c>a[o])return a;
var d=[],e=0,f=0,g=0;
for(var h=0;h<a[o];h++) {
var j=a.charCodeAt(h),k=false;
if(j>=768) {
	if(hB[0]>hB[1])for(var m=1;m<hB[o];m++)hB[m]+=hB[m-1];var p=Ye(hB,j);k=p>=0||-p%2==0
}if(e>=c&&j>32&&!k) {
	d.push(a.substring(g,h),iB);
	g=h;
	e=0
}if(!f)if(j==60||j==38)f=j;
else if(j<=32)e=0;
else if(k) {
}else e++;
else if(j==62&&f==60)f=0;
else if(j==59&&f==38) {
	f=0;
	e++
}
}d.push(a.substr(g));
return d.join(C)
},kB="<wbr></wbr>",lB="&shy;",mB="<wbr>",iB=sg?kB:(pg?lB:mB);
var Q=Vq;
var nB=Hw,oB=function (a) {
return eg(fa(a))
},pB=jB;
var qB="^OD~",rB=function (a,b,c) {
var d=arguments[o];
for(var e=3;e<d;e+=2) {
var f=arguments[e];
if(typeofb[f]!="undefined")b[qB+f]=b[f];
b[f]=arguments[e+1]
}var g;
if(c)a(b,c);
else g=a(b);
for(var e=3;e<d;e+=2) {
var f=arguments[e],h=qB+f;
if(typeofb[h]!="undefined") {
	b[f]=b[h];
	delete b[h]
}else delete b[f]
}if(!c)return g
};
var sB='<div class="',tB="change-owner-contents",uB="</div>",zB=function (a,b) {
var c=b||new Q;
c.g(sB,tB,K);
vB(a,c);
wB(a,c);
xB(a,c);
yB(a,c);
c.g(uB);
if(!b)return nB(c.toString ())
},AB="change-owner-document-item",BB='"><span class="',CB="  ",DB="doclist-icon",EB='" style="background-image:url(',FB=')">&nbsp;</span><span class="',GB="doclist-spacing",HB='">&nbsp;</span>',IB="&rlm;",JB="&lrm;",KB='<span class="',LB="doclist-name",MB='" title="',NB='  ">',OB="&nbsp;</span>",PB="<span> - </span>",QB="Published",
RB="doclist-sharing",SB="doclist-info",TB="</span>",UB="&nbsp;&nbsp;&nbsp;",VB="doclist-user",WB=",  ",XB="</span></div>",YB=function (a,b) {
var c=b||new Q;
c.g(sB,AB,BB,gB,CB,DB,EB,a.sf,FB,gB,CB,GB,HB,a.Ra?IB:JB,KB,LB,MB,oB(a.R.q()),NB,oB(a.R.q()),OB,a.Gm||a.R.rJ()>0?PB:C);
if(a.Gm) {
var d=z(QB);
c.g(a.Ra?IB:JB,KB,RB,BB,SB,K,d,TB,a.Ra?UB:C,TB)
}c.g(a.Ra?IB:JB,KB,VB,K);
var e=a.Uf,f=e[o];
for(var g=0;g<f;g++) {
var h=e[g];
c.g(oB(h.S()),!(g==f-1)||a.Te[o]>0?WB:C)
}var j=a.Te,k=j[o];
for(var m=0;m<k;m++) {
var p=
j[m];
c.g(oB(p.S()),!(m==k-1)?WB:C)
}c.g(XB);
if(!b)return c.toString ()
},ZB="change-owner-top-info",$B='"  id="',aC='">&nbsp;</div>',vB=function (a,b) {
var c=b||new Q;
c.g(sB,ZB,$B,a.PP,aC);
if(!b)return c.toString ()
},bC="change-owner-document-list",cC='"></div>',wB=function (a,b) {
var c=b||new Q;
c.g(sB,bC,$B,a.EH,cC);
if(!b)return c.toString ()
},dC='<div id="',xB=function (a,b) {
var c=b||new Q;
c.g(dC,a.gG,K);
eC(a,c);
fC(a,c);
c.g(uB);
if(!b)return c.toString ()
},gC="New owner:",hC="Choose from contacts",iC='"><div class="',
jC='</div><div class="',kC='"><input type="text"  class="',lC="change-owner-field",mC='"></input>&nbsp;<span class="',nC="change-owner-link",oC="</span></div></div>",eC=function (a,b) {
var c=z(gC),d=z(hC),e=b||new Q;
e.g(sB,fB,iC,dB,K,c,jC,eB,kC,lC,$B,a.KL,mC,nC,$B,a.Zn,K,d,oC);
if(!b)return e.toString ()
},pC="Message to the new owner:",qC='"><textarea class="',rC="change-owner-message",sC='"></textarea></div></div>',fC=function (a,b) {
var c=z(pC),d=b||new Q;
d.g(sB,fB,iC,dB,K,c,jC,eB,qC,rC,$B,a.ZF,sC);
if(!b)return d.toString ()
},
tC="change-owner-bottom-info",yB=function (a,b) {
var c=b||new Q;
c.g(sB,tC,$B,a.NF,aC);
if(!b)return c.toString ()
};
var uC="1.9a",vC=qg&&!Lg(uC),wC="activedescendant",xC=wC,yC="role",zC=function (a,b) {
if(qg) {
a.setAttribute(yC,b);
a.W7=b
}
},AC="http://www.w3.org/2005/07/aaa",BC="aria-",CC=function (a,b,c) {
if(qg)if(vC)a.setAttributeNS(AC,b,c);
else a.setAttribute(BC+b,c)
};
var DC="focusin",EC="focusout",FC=function (a) {
J.call(this);
this.h=a;
var b=F?DC:Mi,c=F?EC:Li;
this.y_=zi(this.h,b,this,!F);
this.z_=zi(this.h,c,this,!F)
};
A(FC,J);
FC[_P].ce=function (a) {
var b=a.Wc,c=new $h(b);
Ra(c,a[x]==DC||a[x]==Mi?DC:EC);
try{
this.dispatchEvent(c)
}finally{
c.j()
}
};
FC[_P].e=function () {
FC.b.e.call(this);
Ei(this.y_);
Ei(this.z_);
this.h=null
};
var GC="modal-dialog",R=function (a,b,c) {
P.call(this,c);
this.xc=a||GC;
this.TE=!(!b);
this.Rf=HC;
this.m=new $i(this);
this.Po=new FC(this.i.W)
};
A(R,P);
R[_P].xc=null;
R[_P].TE=false;
R[_P].SB=true;
R[_P].yo=true;
R[_P].pR=0.3;
R[_P].we=C;
R[_P].Ta=C;
R[_P].Rf=null;
R[_P].mc=null;
R[_P].ya=false;
R[_P].qT=false;
R[_P].jc=null;
R[_P].kc=null;
R[_P].Td=null;
R[_P].Mf=null;
R[_P].xE=null;
R[_P].$i=null;
R[_P].vb=null;
R[_P].Fb=null;
R[_P].m=null;
R[_P].Uc=function (a) {
this.we=a;
if(this.Mf)Ww(this.Mf,a)
};
R[_P].cA=function () {
return this.we
};
R[_P].ma=function (a) {
this.Ta=a;
if(this.vb)n(this.vb,a)
};
R[_P].ac=function () {
return this.Ta
};
R[_P].fa=function () {
if(!this.vb)this.ub();
return this.vb
};
R[_P].lf=function () {
if(!this.z)this.ub();
return this.Td
};
R[_P].yJ=function () {
if(!this.z)this.ub();
return this.Mf
};
R[_P].Kl=function () {
if(!this.z)this.ub();
return this.Fb
};
R[_P].R3=function (a) {
this.SB=a;
this.KB()
};
var IC="-title-draggable";
R[_P].u3=function (a) {
this.yo=a;
if(this.yo&&!this.mc&&this.h)this.mc=this.FG();
else if(!this.yo&&this.mc) {
if(this.h)cz(this.Td,
this.xc+IC);
this.mc.j();
this.mc=null
}
};
R[_P].FG=function () {
var a=new Xy(this.h,this.Td);
N(this.Td,this.xc+IC);
return a
};
var JC="-title",KC="span",LC="-title-text",MC="-title-close",NC="-content",OC="-buttons",PC="dialog",QC="labelledby";
R[_P].f=function () {
this.KB();
this.h=this.i.f(L,{
className:this.xc,tabIndex:0
},this.Td=this.i.f(L,{
className:this.xc+JC,id:this.l()
},this.Mf=this.i.f(KC,{
className:this.xc+LC
},this.we),this.$i=this.i.f(KC,{
className:this.xc+MC
})),this.vb=this.i.f(L,{
className:this.xc+
NC
}),this.Fb=this.i.f(L,{
className:this.xc+OC
}),this.wP=this.i.f(KC,{
tabIndex:0
}));
this.xE=this.Td.id;
zC(this.h,PC);
CC(this.h,QC,this.xE);
if(this.Ta)n(this.vb,this.Ta);
M(this.h,false);
if(this.Rf)this.Rf.Fx(this.Fb)
};
var RC="iframe",SC="border: 0",TC="-bg";
R[_P].KB=function () {
if(this.TE&&!this.kc) {
this.kc=this.i.f(RC,{
	frameborder:0,style:SC,className:this.xc+TC
});
M(this.kc,false);
Mx(this.kc,0)
}else if(!this.TE&&this.kc) {
Mw(this.kc);
this.kc=null
}if(this.SB&&!this.jc) {
this.jc=this.i.f(L,{
	className:this.xc+
	TC
});
Mx(this.jc,this.pR);
M(this.jc,false)
}else if(!this.SB&&this.jc) {
Mw(this.jc);
this.jc=null
}
};
R[_P].ub=function (a) {
if(this.z)throwi(Vz);
if(!this.h)this.f();
var b=a||this.i.W[Ub];
this.iN(b);
R.b.ub.call(this,b)
};
R[_P].iN=function (a) {
if(this.kc)a.appendChild(this.kc);
if(this.jc)a.appendChild(this.jc)
};
var UC="DIV";
R[_P].Na=function (a) {
return a&&a[xc]&&a[xc]==UC&&R.b.Na.call(this,a)
};
R[_P].Oa=function (a) {
this.h=a;
N(this.h,this.xc);
var b=this.xc+NC;
this.vb=Yw(this.h,function (g) {
return g[ub]==1&&O(g,
b)
});
if(this.vb)this.Ta=this.vb[yb];
else {
this.vb=this.i.f(L,{
	className:b
});
if(this.Ta)n(this.vb,this.Ta);
this.h.appendChild(this.vb)
}var c=this.xc+JC,d=this.xc+LC,e=this.xc+MC;
this.Td=Yw(this.h,function (g) {
return g[ub]==1&&O(g,c)
});
if(this.Td) {
this.Mf=Yw(this.Td,function (g) {
	return g[ub]==1&&O(g,d)
});
this.$i=Yw(this.Td,function (g) {
	return g[ub]==1&&O(g,e)
})
}else {
this.Td=this.i.f(L,{
	className:c
});
this.h.insertBefore(this.Td,this.vb)
}if(this.Mf)this.we=cx(this.Mf);
else {
this.Mf=this.i.f(KC,{
	className:d
},
this.we);
this.Td.appendChild(this.Mf)
}CC(this.h,QC,this.xE);
if(!this.$i) {
this.$i=this.i.f(KC,{
	className:e
},this.we);
this.Td.appendChild(this.$i)
}var f=this.xc+OC;
this.Fb=Yw(this.h,function (g) {
return g[ub]==1&&O(g,f)
});
if(this.Fb) {
this.Rf=new VC(this.i);
this.Rf.Q(this.Fb)
}else {
this.Fb=this.i.f(L,{
	className:f
});
this.h.appendChild(this.Fb);
if(this.Rf)this.Rf.Fx(this.Fb)
}this.KB();
this.iN(ow(this.h)[Ub])
};
R[_P].t=function () {
R.b.t.call(this);
if(this.yo&&!this.mc)this.mc=this.FG();
this.m.d(this.$i,fi,this.iM);
this.m.d(this.Po,DC,this.wm);
zC(this.h,PC);
if(this.Mf.id!==C)CC(this.h,QC,this.Mf.id)
};
R[_P].$=function () {
this.m.M(this.$i,fi,this.iM);
this.m.M(this.Po,DC,this.wm);
if(this.La())this.s(false);
if(this.mc) {
this.mc.j();
this.mc=null
}R.b.$.call(this)
};
var WC="resize",XC="afterhide";
R[_P].s=function (a) {
if(a==this.ya)return ;
var b=this.i.W,c=Ew(b)||ga;
if(!this.z)this.ub(b[Ub]);
if(a) {
this.oN();
this.gc();
this.m.d(this.h,Qi,this.lk,true);
this.m.d(c,WC,this.fM,true)
}else {
this.m.M(this.h,Qi,this.lk,true);
this.m.M(c,
WC,this.fM,true)
}if(this.kc)M(this.kc,a);
if(this.jc)M(this.jc,a);
M(this.h,a);
if(a) {
if(qg)this.h.focus();
if(this.ae()) {
	var d=this.ae().mo;
	if(d) {
		var e=this.Fb.getElementsByTagName(Hb);
		for(var f=0,g;g=e[f];f++)if(g[Cc]==d) {
			try{
				g.focus()
			}catch(h) {
			}break
		}
	}
}
}this.ya=a;
if(!a) {
this.m.M(this.Fb,fi,this.UL);
this.dispatchEvent(XC);
if(this.qT)this.j()
}else this.m.d(this.Fb,fi,this.UL)
};
R[_P].La=function () {
return this.ya
};
R[_P].oN=function () {
if(this.kc)M(this.kc,false);
if(this.jc)M(this.jc,false);
var a=this.i.W,
b=Ew(a)||ga,c=Cw(b),d=a[Ub].scrollWidth,e=l.max(a[Ub][ec],c[y]);
if(this.kc) {
M(this.kc,true);
Fx(this.kc,d,e)
}if(this.jc) {
M(this.jc,true);
Fx(this.jc,d,e)
}if(this.yo) {
var f=Hx(this.h);
this.mc.$u=new Ps(0,0,d-f[r],e-f[y])
}
};
R[_P].gc=function () {
var a=this.i.W,b=Ew(a)||ga,c=Dw(b),d=c.x,e=c.y,f=Hx(this.h),g=Cw(b),h=l.max(d+g[r]/2-f[r]/2,0),j=l.max(e+g[y]/2-f[y]/2,0);
sx(this.h,h,j)
};
R[_P].iM=function () {
var a=this.ae(),b=a&&a.Pn;
if(b) {
var c=a.o(b);
if(this.dispatchEvent(new YC(b,c)))this.s(false)
}else this.s(false)
};
R[_P].e=function () {
R.b.e.call(this);
if(this.m) {
this.m.j();
this.m=null
}if(this.Po) {
this.Po.j();
this.Po=null
}if(this.jc) {
Mw(this.jc);
this.jc=null
}if(this.kc) {
Mw(this.kc);
this.kc=null
}this.$i=null;
this.Fb=null;
this.wP=null
};
R[_P].lb=function (a) {
this.Rf=a;
if(this.Fb)this.Rf.Fx(this.Fb)
};
R[_P].ae=function () {
return this.Rf
};
R[_P].UL=function (a) {
var b=this.TT(a[v]);
if(b) {
var c=b[Cc],d=this.ae().o(c);
if(this.dispatchEvent(new YC(c,d)))this.s(false)
}
};
var ZC="BUTTON";
R[_P].TT=function (a) {
var b=a;
while(b!=
null&&b!=this.Fb) {
if(b[xc]==ZC)return b;
b=b[Dc]
}return null
};
R[_P].lk=function (a) {
var b;
if(a[fc]==27) {
b=this.ae();
if(b.Pn) {
	var c=b.o(b.Pn);
	if(this.dispatchEvent(new YC(b.Pn,c)))this.s(false)
}else this.s(false);
a.stopPropagation()
}else if(a[fc]==13) {
b=this.ae();
var d=a[v]&&a[v][xc]==ZC?a[v][Cc]:b.mo;
if(d&&this.dispatchEvent(new YC(d,b.o(d))))this.s(false);
a.stopPropagation()
}else if(a[fc]==9&&a[wc]&&a[v]==this.h) {
a.preventDefault();
a.stopPropagation()
}
};
R[_P].fM=function () {
this.oN()
};
R[_P].wm=function (a) {
if(this.wP==
a[v])at(this.ZT,0,this)
};
R[_P].ZT=function () {
if(F)this.i.W[Ub].focus();
this.h.focus()
};
var $C="dialogselect",YC=function (a,b) {
Ra(this,$C);
this.jb=a;
this.caption=b
};
A(YC,H);
var aD=$C,VC=function (a) {
this.i=a||pw();
D.call(this)
},HC;
A(VC,D);
VC[_P].mo=null;
VC[_P].h=null;
VC[_P].Pn=null;
VC[_P].k=function (a,b,c,d) {
D[_P].k.call(this,a,b);
if(c)this.mo=a;
if(d)this.Pn=a
};
VC[_P].Fx=function (a) {
this.h=a;
this.ub()
};
VC[_P].ub=function () {
if(this.h) {
n(this.h,C);
var a=pw(this.h);
bh(this,function (b,c) {
	this.h.appendChild(a.f(Hb,
	{
		name:c
	},b))
},this)
}
};
VC[_P].Q=function (a) {
if(!a||a[ub]!=1)return ;
this.h=a;
var b=this.h.getElementsByTagName(Hb);
for(var c=0,d,e,f;d=b[c];c++) {
e=d[Cc]||d.id;
f=cx(d)||d[s];
if(e)this.k(e,f,c==0,d[Cc]==bD)
}
};
VC[_P].n3=function (a) {
this.mo=a
};
VC[_P].vU=function (a) {
var b=this.h.getElementsByTagName(Hb);
for(var c=0,d;d=b[c];c++)if(d[Cc]==a||d.id==a)return d;return null
};var cD="cancel",bD=cD,dD="OK",eD="Cancel",fD="Yes",gD="No",hD="Save",iD="Continue",jD="ok",kD="yes",lD="no",mD="continue",nD="save";(function () {
var a=
z(dD),b=z(eD),c=z(fD),d=z(gD),e=z(hD),f=z(iD),g=new VC;
g.k(jD,a,true);
var h=new VC;
h.k(jD,a,true);
h.k(bD,b,false,true);
HC=h;
var j=new VC;
j.k(kD,c,true);
j.k(lD,d,false,true);
var k=new VC;
k.k(kD,c);
k.k(lD,d,true);
k.k(bD,b,false,true);
var m=new VC;
m.k(mD,f);
m.k(nD,e);
m.k(bD,b,true,true)
})();
var oD=function () {
R.call(this,undefined,true);
this.m=new $i(this)
};
A(oD,R);
var pD="choose_owner",qD=pD,rD="confirm_trash";
oD[_P].Ae=false;
oD[_P].Ye=false;
oD[_P].Mu=false;
oD[_P].Fs=null;
oD[_P].os=null;
oD[_P].FH=null;
oD[_P].qq=null;
oD[_P].Pb=null;
oD[_P].My=null;
oD[_P].um=null;
oD[_P].fy=null;
oD[_P].Vw=null;
oD[_P].Mn=null;
oD[_P].$F=null;
oD[_P].ls=null;
oD[_P].ps=null;
var sD="Deleting shared items",tD=z(sD),uD="Choose new owner",vD=z(uD),wD=z(uD),xD="Change owner",yD=z(xD),zD="Trash for everyone",AD=z(zD),
BD=z(eD),CD="changeownerdialog";
oD[_P].f=function () {
oD.b.f.call(this);
N(this.c(),CD)
};
var DD="change_owner",ED="choose_cancel",FD="trash_trash",GD="trash_cancel";
oD[_P].ib=function (a) {
switch(a) {
case qD:if(!this.os) {
	var b=new VC;
	b.k(DD,yD,false);
	b.k(ED,BD,false,true);
	this.os=b
}return this.os;
case rD:if(!this.Fs) {
	var b=new VC;
	b.k(pD,wD,false);
	b.k(FD,AD,false);
	b.k(GD,BD,false,true);
	this.Fs=b
}return this.Fs
}
};
oD[_P].qD=function (a) {
this.Pb=a
};
oD[_P].Yn=function () {
if(!this.Ye) {
var a=this.Pb;
a.Ph(this.um);
this.m.d(this.fy,fi,this.qp);
this.Ye=true
}
};
oD[_P].qp=function (a) {
this.Pb.Yu(this.um,a)
};
oD[_P].gw=function (a) {
this.$F=a
};
oD[_P].Qq=function (a) {
Aa(this.ls,a)
};
oD[_P].T3=function (a) {
Aa(this.um,a)
};
oD[_P].Oq=function (a) {
this.FH=a
};
oD[_P].ED=function (a) {
this.Mu=a
};
oD[_P].gp=function () {
return Ue(this.qq)
};
oD[_P].Wo=function () {
return Ue(this.FH)
};
oD[_P].Rl=function () {
return this.$F
};
oD[_P].Ql=function () {
return this.ls[s]
};
Va(oD[_P],function () {
if(!this.Ae)return ;
this.T3(C);
this.Qq(C)
});
oD[_P].g2=function (a) {
var b=
new Vq,c=a[o],d={
};
this.AZ(d);
for(var e=0;e<c;e++) {
var f=a[e];
this.h1(d,f);
YB(d,b)
}n(this.My,b.toString ())
};
oD[_P].Ga=function (a,b,c) {
if(!this.Ae) {
this.oy();
this.Ae=true
}this.qq=b;
this.g2(b);
switch(a) {
case qD:this.G4();
break;
case rD:this.J4(c);
break
}
};
var HD="You are transferring ownership of this item:",ID="You are transferring ownership of these items:",JD="Links will be included with your message. You will become a collaborator on this item.",KD="Links will be included with your message. You will become a collaborator on these items.";
oD[_P].G4=function () {
var a=this.qq[o]==1;
this.lb(this.ib(qD));
this.K4();
this.Uc(vD);
var b=z(HD),c=z(ID);
n(this.Vw,a?b:c);
var d=z(JD),e=z(KD);
n(this.Mn,a?d:e);
if(this.Pb&&!this.Ye)this.Yn();
Ya(this.ps[u],C)
};
var LD="Ownership Change: {$title} + 1 more item",MD="Ownership Change: {$title} + {$numItems} more items",ND="Ownership Change: {$title}",OD="I've given you ownership of this item using Google Docs. To open it, just click the link below.",PD="I've given you ownership of these items using Google Docs.  To open them, just click the links below.";
oD[_P].K4=function () {
var a=this.qq,b=a[o],c=new Vq;
if(b>0)c.g(a[0].q());
for(var d=1;d<b&&d<2;d++)c.g(Yj+a[d].q());var e=c.toString ();if(b>2) {
var f=z(LD,{
	title:e
}),g=z(MD,{
	title:e,numItems:b-2
});
e=b==3?f:g
}else {
var h=z(ND,{
	title:e
});
e=h
}this.gw(e);
var j=z(OD),k=z(PD);
this.Qq(b==1?j:k)
};
var QD="You are the owner of this shared item that will be moved to your trash:",RD="You are the owner of these shared items that will be moved to your trash:",SD="If you choose a new owner, the item will not be moved to trash for everyone else.",
TD="If you choose a new owner, the items will not be moved to trash for everyone else.",UD="If you choose a new owner, the item will not be moved to trash for everyone else (not yet implemented for spreadsheets).",VD="If you choose a new owner, the items will not be moved to trash for everyone else (not yet implemented for spreadsheets).";
oD[_P].J4=function (a) {
this.lb(this.ib(rD));
this.Uc(tD);
var b=z(QD),c=z(RD),d=this.qq[o]==1;
n(this.Vw,d?b:c);
var e=z(SD),f=z(TD);
n(this.Mn,d?e:f);
if(a) {
var g=z(UD),
h=z(VD);
n(this.Mn,d?g:h)
}Ya(this.ps[u],Gx)
};
oD[_P].oy=function () {
var a={
};
this.oe(a);
var b=zB(a),c=this.fa();
c.appendChild(b);
var d=pw(c);
this.My=d.c(a.EH);
this.um=d.c(a.KL);
this.fy=d.c(a.Zn);
this.Vw=d.c(a.PP);
this.Mn=d.c(a.NF);
this.ls=d.c(a.ZF);
this.ps=d.c(a.gG)
};
var WD="new-owner",XD="contacts",YD="top-info",ZD="bottom-info",$D="choose-owner";
oD[_P].oe=function (a) {
a.EH=this.G(yq);
a.KL=this.G(WD);
a.Zn=this.G(XD);
a.PP=this.G(YD);
a.NF=this.G(ZD);
a.ZF=this.G(rC);
a.gG=this.G($D)
};
oD[_P].AZ=function (a) {
a.Ra=
this.fb()
};
oD[_P].h1=function (a,b) {
a.R=b;
a.sf=Sp(b);
a.Gm=b.getAttribute(Vn).p();
a.Uf=b.Nl();
a.Te=b.Zl()
};
oD[_P].e=function () {
oD.b.e.call(this);
this.m.j();
this.m=null;
this.os=null;
this.Fs=null;
this.My=null;
this.um=null;
this.fy=null;
this.Vw=null;
this.Mn=null;
this.ls=null;
this.ps=null
};
var aE=function () {
R.call(this,this.ja,true)
};
A(aE,R);
var bE="confirm-dialog";
aE[_P].ja=bE;
aE[_P].vw=null;
aE[_P].is=null;
aE[_P].hs=null;
aE[_P].pv=null;
aE[_P].js=null;
aE[_P].Fw=null;
aE[_P].Es=null;
var cE="skip_invites",dE="cant_change_owner_offline",eE=cE,fE="cant_change_owner",gE="cant_change_owner_spreadsheets",hE=dE,iE="error_message",jE="confirm_message",kE="cant_change_owner_any",lE="cant_change_owner_some",mE=dE,nE="skip_invites_cancel",oE="cant_share_any_ok",pE="cant_share_unselect_ok",qE="cant_change_owner_any_ok",
rE="cant_change_owner_unselect_ok",sE="cant_change_owner_offline_ok",tE="cant_share";
aE[_P].Ga=function (a,b,c,d) {
this.sl=a;
switch(a) {
case tE:this.E4(b,c);
break;
case fE:this.D4(b,c);
break;
case hE:this.B4();
break;
case eE:this.M4();
break;
case iE:this.L4();
break;
case jE:this.I4();
break;
case gE:this.C4(b,c,d);
break
}
};
aE[_P].l4=function (a) {
this.vw=a
};
var uE="cant_share_any",vE="cant_share_some",wE="skip_invites_ok";
aE[_P].ib=function (a) {
var b=z(dD),c=z(eD),d=z(fD),e=z(gD),f;
switch(a) {
case jD:if(!this.pv) {
	f=
	new VC;
	f.k(jD,b,true);
	this.pv=f
}f=this.pv;
break;
case mE:if(!this.hs) {
	f=new VC;
	f.k(sE,b,true);
	this.hs=f
}f=this.hs;
break;
case uE:if(!this.is) {
	f=new VC;
	f.k(oE,b,true);
	this.is=f
}f=this.is;
break;
case vE:if(!this.js) {
	f=new VC;
	f.k(pE,b,true);
	f.k(bD,c,false,true);
	this.js=f
}f=this.js;
break;
case kE:if(!this.UF) {
	f=new VC;
	f.k(qE,b,true);
	this.UF=f
}f=this.UF;
break;
case lE:if(!this.VF) {
	f=new VC;
	f.k(rE,b,true);
	f.k(bD,c,false,true);
	this.VF=f
}f=this.VF;
break;
case Hq:if(!this.Es) {
	f=new VC;
	f.k(kD,d,true);
	f.k(bD,e,false,
	true);
	this.Es=f
}f=this.Es;
break;
case cE:if(!this.Fw) {
	f=new VC;
	f.k(wE,b,true);
	f.k(nE,c,false,true);
	this.Fw=f
}f=this.Fw;
break
}return f
};
var xE="You do not have permission to share the item selected.",yE="You do not have permission to share the items selected.",zE="You do not have permission to share {$num} of the items selected. Click OK to select only the sharable items.";
aE[_P].E4=function (a,b) {
var c=z(xE),d=z(yE),e=z(zE,{
num:b
}),f=a==1;
M(this.lf(),false);
if(a==b) {
this.ma(f?c:d);
this.lb(this.ib(uE))
}else {
this.ma(e);
this.lb(this.ib(vE))
}
};
var AE="You do not have permission to change the owner of the item selected.",BE="You do not have permission to change the owner of the items selected.",CE="You do not have permission to change the owner of {$num} of the items selected. Click OK to select only the items whose owner can be changed.";
aE[_P].D4=function (a,b) {
var c=z(AE),d=z(BE),e=z(CE,{
num:b
}),f=a==1;
M(this.lf(),false);
if(a==b) {
this.ma(f?c:d);
this.lb(this.ib(kE))
}else {
this.ma(e);
this.lb(this.ib(lE))
}
};
var DE="Change owner isn't implemented for spreadsheets yet.",
EE="You do not have permission to change the owner of the items selected (and change owner isn't implemented for spreadsheets, yet).",FE="You do not have permission to change the owner of {$num} of the items selected (and change owner isn't implemented for spreadsheets, yet). Click OK to select only the items whose owner can be changed.";
aE[_P].C4=function (a,b,c) {
var d=z(DE),e=z(EE),f=z(FE,{
num:b
}),g=a==c;
M(this.lf(),false);
if(a==b) {
this.ma(g?d:e);
this.lb(this.ib(kE))
}else {
this.ma(f);
this.lb(this.ib(lE))
}
};
var GE="You cannot change the owner of items while offline.";
aE[_P].B4=function () {
M(this.lf(),false);
var a=z(GE);
this.ma(a);
this.lb(this.ib(mE))
};
var HE="Skipping Invitations",IE="If you skip sending an email notification, folks will have to sign in before they notice what you have shared. {$tagBegin}Learn more{$tagEnd}",JE='<a target="_blank" href="',KE="</a>";
aE[_P].M4=function () {
var a=z(HE),b=z(IE,{
tagBegin:JE+this.vw+K,tagEnd:KE
});
M(this.lf(),true);
this.Uc(a);
this.ma(b);
this.lb(this.ib(cE))
};
aE[_P].L4=function () {
M(this.lf(),false);
this.lb(this.ib(jD))
};
aE[_P].I4=function () {
M(this.lf(),false);
this.lb(this.ib(Hq))
};
aE[_P].e=function () {
aE.b.e.call(this);
this.pv=null;
this.is=null;
this.hs=null;
this.js=null;
this.Fw=null;
this.Es=null
};
var LE="manage-sharing-link",ME="manage-sharing-deemphasize",NE="manage-sharing-heading",OE="manage-sharing-wrap-input",PE="manage-sharing-title",QE="manage-sharing-scroll-list-item",RE="manage-sharing-vertical-spacer",SE="manage-sharing-scroll-list",TE="manage-sharing-close-icon",UE=cB,VE="email-item";
var WE="manage-sharing-contents",ZE=function (a,b) {
var c=b||new Q;
c.g(sB,WE,K);
XE(a,c);
YE(a,c);
c.g(uB);
if(!b)return nB(c.toString ())
},$E="To:",aF="Subject:",bF="Message:",cF="Note: a link to the file will be included in the message",dF="CC me",eF='<table class="',fF="manage-sharing-email-contents",gF='"   id="',hF='"><tr><th>',iF='</th><td id="',jF='">&nbsp;</td></tr><tr><td class="',kF='"/></tr><tr><th>',lF='</th><td><div class="',mF='"><input type="text" id="',nF='"  class="',oF="manage-sharing-big-text-input",
pF='"/></div></td></tr><tr><td class="',qF='"/></tr><tr><th width="1%">',rF='</th><td class="',sF="manage-sharing-right",tF='</td></tr><tr><td colspan="2"><div class="',uF="manage-sharing-big-text-field",vF='"></textarea></div></td></tr><tr><td class="',wF='"/></tr><tr><td colspan="2"><input type="checkbox" id="',xF='"/><label for=',yF="</label></td></tr></table>",YE=function (a,b) {
var c=z($E),d=z(aF),e=z(bF),f=z(cF),g=z(dF),h=b||new Q;
h.g(eF,fF,gF,a.LH,hF,c,iF,a.GP,jF,RE,kF,d,lF,OE,mF,a.rP,nF,oF,
pF,RE,qF,e,rF,ME,CB,sF,K,f,tF,OE,qC,uF,$B,a.CL,vF,RE,wF,a.Rx,xF,a.Rx,Zf,g,yF);
if(!b)return h.toString ()
},zF='<table id="',AF='"><tr><td class="',BF="manage-sharing-share-left",CF='</td><td class="',DF="manage-sharing-vertical-line",EF='"/><td id="',FF="manage-sharing-share-right",GF='"></td></tr></table>',XE=function (a,b) {
var c=b||new Q;
c.g(zF,a.XO,AF,BF,K);
HF(a,c);
c.g(CF,DF,EF,a.CH,nF,FF,GF);
if(!b)return c.toString ()
},IF="Invite people",JF="as collaborators",KF="as viewers",LF="Separate email addresses with commas.",
MF='<table width="100%"><tbody><tr><td class="',NF='</td></tr><tr><td><div><input type="radio" name="',OF='" value="',PF='" id="',QF='"><label for="',RF='</label></input>&nbsp;&nbsp;<input type="radio" name="',SF='</label></input></div></td></tr><tr><td><div class="',TF="manage-sharing-text-field",UF='"></textarea></div><div class="',VF='</div></td></tr><tr><td class="',WF='"/></tr><tr><td><button id="',XF='" name="',YF='</button></td></tr><tr><td class="',ZF='"/></tr><tr><td class="',$F="manage-sharing-horizontal-line",
aG='"/></tr><tr><td>',bG="</td></tr></tbody></table>",HF=function (a,b) {
var c=z(IF),d=z(JF),e=z(KF),f=z(LF),g=z(hC),h=b||new Q;
h.g(MF,NE,K,c,NF,a.ZO,OF,a.ZR,PF,a.Bx,QF,a.Bx,K,d,RF,a.ZO,OF,a.y6,PF,a.Dx,QF,a.Dx,K,e,SF,OE,qC,TF,$B,a.MH,UF,ME,K,f,jC,LE,PF,a.eG,K,g,VF,RE,WF,a.DK,XF,a.QZ,OF,a.EK,K,a.EK,YF,RE,ZF,$F,ZF,RE,aG);
cG(a,h);
h.g(bG);
if(!b)return h.toString ()
},dG="Advanced permissions",eG="Collaborators may invite others",fG="Only the owner may change this",gG="Invitations may be used by anyone",hG=
"Allows mailing lists",iG="Learn more",jG='<table><tbody><tr><td colspan="2" class="',kG='</td></tr><tr><td><input type="checkbox" id="',lG='"/></td><td><label for="',mG='</label></td></tr><tr><td/><td><label for="',nG='" class="',oG='</label></td></tr><tr><td class="',pG='"/></tr><tr><td><input type="checkbox" id="',qG='</label>&nbsp;&nbsp;<a href="',rG='" target="_blank">',sG="</a></td></tr></tbody></table>",cG=function (a,b) {
var c=z(dG),d=z(eG),e=z(fG),f=z(gG),g=z(hG),h=z(iG),j=b||new Q;
j.g(jG,
NE,K,c,kG,a.On,lG,a.On,K,d,mG,a.On,nG,ME,K,e,oG,RE,pG,a.zx,lG,a.zx,K,f,mG,a.On,nG,ME,K,g,qG,a.FB,rG,h,sG);
if(!b)return j.toString ()
},tG="You can invite people and set advanced permissions for these items. The existing permissions may vary.",uG="{$length} items selected",vG='<table><tbody><tr><td class="',wG='</td></tr><tr><td class="',xG='"/></tr><tr><td><div class="',yG='<span title="',zG="&nbsp;</span></div>",AG="</div></td></tr></tbody></table>",BG=function (a,b) {
var c=z(tG),d=b||new Q,e=z(uG,{
length:a.Wf[o]
});
d.g(vG,PE,K,e,wG,RE,ZF,ME,K,c,wG,RE,xG,SE,K);
var f=(new Q(sB,QE,BB,UE,CB,DB,EB)).toString (),g=(new Q(FB,UE,CB,GB,HB,a.Ra?IB:JB,yG)).toString (),h=a.Wf,j=h[o];
for(var k=0;k<j;k++) {
var m=h[k];
d.g(f,Sp(m),g,oB(m.q()),NB,oB(m.q()),zG)
}d.g(AG);
if(!b)return d.toString ()
},CG="This document is not shared.",DG="This document is currently shared.",EG='"><table><tbody>',FG='<tr><td class="',GG='"/></tr>',HG="</tbody></table></div></td></tr></tbody></table>",KG=function (a,b) {
var c=b||new Q;
c.g(vG,PE,K);
if(a.Uf[o]+
a.Te[o]==0) {
var d=z(CG);
c.g(d)
}else {
var e=z(DG);
c.g(e)
}c.g(wG,RE,xG,SE,EG);
IG(a,c);
c.g(FG,RE,GG);
JG(a,c);
c.g(HG);
if(!b)return c.toString ()
},LG='<tr><td colspan="2">',MG="Collaborators ({$xxx})",NG="remove all",OG='</span>&nbsp;-&nbsp;<span class="',PG="Collaborators (0)",QG='</td></tr><tr><td colspan="2" class="',RG="Collaborators may edit the document and invite more people.",SG="Collaborators may edit the document.",TG="</td></tr>",UG='<tr><td colspan="2" class="',VG="{$xxx} - owner",WG='<tbody id="',
XG='" width="1%">',YG='</td><td><span class="',ZG="Remove {$xxx}",$G='"  title="',aH='">&nbsp;</span></td></tr>',bH="</tbody>",IG=function (a,b) {
var c=b||new Q;
c.g(LG);
if(a.Uf[o]>0) {
var d=z(MG,{
	xxx:a.nM[o]+a.Uf[o]
}),e=z(NG);
c.g(KB,NE,K,d,OG,LE,$B,a.kH,K,e,TB)
}else {
var f=z(PG);
c.g(KB,NE,K,f,TB)
}c.g(QG,ME,K);
if(a.QF) {
var g=z(RG);
c.g(g)
}else {
var h=z(SG);
c.g(h)
}c.g(TG);
if(a.Uf[o]>0) {
var j=(new Q(UG,QE,K,a.Ra?IB:JB)).toString (),k=a.nM,m=k[o];
for(var p=0;p<m;p++) {
	var q=k[p],t=z(VG,{
		xxx:oB(q.S())
	});
	c.g(j,
	t,TG)
}c.g(WG,a.jG,K);
var w=(new Q(FG,QE,XG,a.Ra?IB:JB)).toString (),$=(new Q(YG,UE,CB,TE,$B)).toString (),za=a.Uf,ka=za[o];
for(var ic=0;ic<ka;ic++) {
	var zb=za[ic],Fd=z(ZG,{
		xxx:zb.Va()
	});
	c.g(w,oB(zb.S()),$,a.BH[zb.Va()],$G,Fd,aH)
}c.g(bH)
}if(!b)return c.toString ()
},cH="Viewers may see the document but not edit it.",dH="Viewers ({$length})",eH='<tr><td colspan="2"><span class="',fH='&nbsp;-&nbsp;<span class="',JG=function (a,b) {
var c=z(cH),d=b||new Q,e=z(dH,{
length:a.Te[o]
});
d.g(eH,NE,K,e,TB);
if(a.Te[o]>
0) {
var f=z(NG);
d.g(fH,LE,$B,a.lH,K,f,TB)
}d.g(QG,ME,K,c,TG);
if(a.Te[o]>0) {
d.g(WG,a.iQ,K);
var g=(new Q(FG,QE,XG,a.Ra?IB:JB)).toString (),h=(new Q(YG,UE,CB,TE,$B)).toString (),j=a.Te,k=j[o];
for(var m=0;m<k;m++) {
	var p=j[m],q=z(ZG,{
		xxx:p.Va()
	});
	d.g(g,oB(p.S()),h,a.BH[p.Va()],$G,q,aH)
}d.g(bH)
}if(!b)return d.toString ()
};
var gH="send",kH=function (a,b,c) {
R.call(this,undefined,true);
this.Zu=a;
this.io=c||null;
this.Pb=b||null;
this.VD=new $i(this);
this.Tx=new $i(this);
var d=new VC;
d.k(gH,hH,false);
d.k(iH,jH,false);
this.lb(d)
};
A(kH,R);
var lH="invite_collaborators",iH="skip_sending_invitations",mH=On,nH="deleteUserShare",oH="share";
kH[_P].bb=oH;
kH[_P].Ae=false;
kH[_P].Zs=C;
kH[_P].Bb=null;
kH[_P].Sd=null;
kH[_P].Yf=null;
kH[_P].Kn=null;
kH[_P].Cx=null;
kH[_P].Ux=null;
kH[_P].Lp=null;
kH[_P].kj=null;
kH[_P].il=null;
kH[_P].Ly=null;
kH[_P].sr=null;
kH[_P].nr=null;
kH[_P].iq=null;
kH[_P].Tn=null;
kH[_P].jt=null;
kH[_P].xw=null;
var pH="Share this file",qH=z(pH),rH="Tell these people about the file?",sH=z(rH),tH="Invite collaborators",uH=z(tH),vH="Invite viewers",wH=z(vH),xH="Send",hH=z(xH),yH="Skip sending invitation",jH=z(yH);
kH[_P].s=function (a) {
kH.b.s.call(this,a);
if(a)if(this.bb==to)this.iq.focus();
else this.Yf.focus()
};
kH[_P].Ga=function (a) {
this.bb=a;
if(!this.Ae)return ;
if(a==to) {
M(this.jt,true);
M(this.xw,false);
this.Uc(sH);
M(this.Kl(),
true);
n(this.sr,eg(this.Yf[s]));
Aa(this.nr,this.zS());
this.ug(true)
}else {
M(this.jt,false);
M(this.xw,true);
this.Uc(qH);
M(this.Kl(),false)
}
};
kH[_P].ms=function (a,b,c) {
var d=a[o];
for(var e=0;e<d;e++)if(a[e].getAttribute(b).p()!=c)return false;return true
};kH[_P].ug=function (a) {
var b=this.Kl(),c=b.getElementsByTagName(Hb);
for(var d=0,e;e=c[d];d++)Ba(e,!a)
};kH[_P].CD=function (a) {
Aa(this.Lp,a);
n(this.Lp,a)
};
kH[_P].mO=function (a) {
if(!this.Ae)this.Zs=a;
else {
Aa(this.Yf,a);
n(this.sr,eg(a))
}
};
kH[_P].Zq=function (a) {
this.Sd=
a;
if(this.Ae) {
this.f2();
var b=this.ms(a,ao,true);
ya(this.kj,b);
var c=this.ms(a,Rn,true);
Ba(this.kj,!c);
var d=this.ms(a,Sn,true);
ya(this.il,d)
}
};
kH[_P].Wl=function () {
return this.Sd
};
kH[_P].Rl=function () {
return this.nr[s]
};
kH[_P].Ql=function () {
return this.iq[s]
};
kH[_P].RV=function () {
return this.Kn[sb]?30:20
};
var zH="managesharingdialog";
kH[_P].f=function () {
kH.b.f.call(this);
N(this.c(),zH);
var a={
};
this.oe(a);
this.Bb=a;
var b=ZE(a),c=this.fa();
c.appendChild(b)
};
kH[_P].t=function () {
kH.b.t.call(this);
var a=
this.Bb,b=this.i;
this.Yf=b.c(a.MH);
this.Kn=b.c(a.Bx);
this.Cx=b.c(a.Dx);
this.Ux=b.c(a.eG);
this.Lp=b.c(a.DK);
this.kj=b.c(a.On);
this.il=b.c(a.zx);
this.Ly=b.c(a.CH);
this.sr=b.c(a.GP);
this.nr=b.c(a.rP);
this.iq=b.c(a.CL);
this.Tn=b.c(a.Rx);
this.jt=b.c(a.LH);
this.xw=b.c(a.XO);
var c=this.VD;
c.d(this.Lp,fi,this.DX);
c.d(this.Kn,fi,this.ZJ);
c.d(this.Cx,fi,this.ZJ);
c.d(this.kj,fi,this.EW);
c.d(this.il,fi,this.BW);
var d=this.Pb;
if(d) {
d.Ph(this.Yf);
c.d(this.Ux,fi,this.qp)
}this.Ae=true;
this.reset();
this.Zq(this.Sd);
this.Ga(this.bb);
if(this.Zs) {
this.mO(this.Zs);
this.Zs=C
}
};
kH[_P].s2=function (a) {
var b=this.Tx;
b.vc();
if(jd(a.R)) {
var c=this.i,d=c.c(a.jG);
if(d)b.d(d,fi,this.KJ);
var e=c.c(a.iQ);
if(e)b.d(e,fi,this.KJ);
var f=c.c(a.lH);
if(f)b.d(f,fi,this.cX);
var g=c.c(a.kH);
if(g)b.d(g,fi,this.bX)
}
};
Va(kH[_P],function () {
if(!this.Ae)return ;
Aa(this.Yf,C);
ya(this.kj,false);
ya(this.il,false);
n(this.sr,C);
Aa(this.nr,C);
Aa(this.iq,C);
this.Tn.selected=false;
ya(this.Kn,true);
this.CD(uH);
ya(this.Tn,false)
});
kH[_P].refresh=function () {
var a=
Ie(this.Sd,function (b) {
return Np(b.l())
});
this.Zq(a);
this.Ga(this.bb)
};
kH[_P].f2=function () {
var a=new Vq,b=this.Sd,c={
};
if(b[o]==1) {
this.g1(c,b[0]);
KG(c,a)
}else {
this.j1(c,b);
BG(c,a)
}n(this.Ly,a.toString ());
this.s2(c)
};
kH[_P].j1=function (a,b) {
a.Wf=b;
a.QF=this.ms(b,ao,true)
};
var AH="delete-all-viewers",BH="delete-all-collaborators",CH="viewers-list",DH="collaborators-list";
kH[_P].g1=function (a,b) {
a.R=b;
var c={
},d=He(b.Zl(),this.Pp);
a.Te=d;
for(var e=0;e<d[o];e++) {
var f=d[e].Va();
c[f]=this.yL(f)
}var g=
He(b.Nl(),this.Pp);
a.Uf=g;
for(var e=0;e<g[o];e++) {
var f=g[e].Va();
c[f]=this.yL(f)
}a.BH=c;
a.nM=He(b.Kj(),this.Pp);
a.lH=this.G(AH);
a.kH=this.G(BH);
a.iQ=this.G(CH);
a.jG=this.G(DH);
a.QF=b.getAttribute(ao).p()
};
kH[_P].Pp=function (a) {
return a.Va().indexOf(Md)>-1
};
var EH="{$title} + 1 more item",FH="{$title} + {$numItems} more items";
kH[_P].zS=function () {
var a=this.Sd||[],b=a[o],c=new Vq;
if(b>0)c.g(a[0].q());
for(var d=1;d<b&&d<2;d++)c.g(Yj+a[d].q());var e=c.toString ();if(b>2) {
var f=z(EH,{
	title:e
}),g=z(FH,
{
	title:e,numItems:b-2
});
e=b==3?f:g
}return e
};
var GH="emails",HH="share-type-name",IH="as-collaborators",JH="as-viewers",KH="choose-contacts",LH="invite-button",MH="can-invite-others",NH="anyone-can-use",OH="doc-share-info",PH="to-field",QH="subject-field",RH="message-field",SH="cc-me",TH="email-section",UH="share-section";
kH[_P].oe=function (a) {
a.MH=this.G(GH);
a.ZO=this.G(HH);
a.Bx=this.G(IH);
a.Dx=this.G(JH);
a.eG=this.G(KH);
a.DK=this.G(LH);
a.On=this.G(MH);
a.zx=this.G(NH);
a.CH=this.G(OH);
a.GP=this.G(PH);
a.rP=this.G(QH);
a.CL=this.G(RH);
a.Rx=this.G(SH);
a.LH=this.G(TH);
a.XO=this.G(UH);
a.FB=this.Zu;
a.Wf=this.Sd;
a.QZ=lH;
a.EK=uH;
a.ZR=30;
a.y6=20
};
kH[_P].qp=function (a) {
this.Pb.Yu(this.Yf,a)
};
kH[_P].DX=function (a) {
var b=a[v];
if(this.dispatchEvent(new YC(b[Cc],b[yb])))this.s(false)
};
kH[_P].ZJ=function (a) {
switch(da(a[v][s],10)) {
case 30:this.CD(uH);
break;
case 20:this.CD(wH);
break
}
};
kH[_P].KJ=function (a) {
var b=a[v]&&a[v].id&&this.ZU(a[v].id);
if(b)this.dispatchEvent(new VH(nH,this.Sd,b.split(Kd)))
};
kH[_P].ZU=
function (a) {
var b=this.Ft(a);
return b.indexOf(VE)==0?b.substring(VE[o]+1):C
};
kH[_P].yL=function (a) {
var b=kg(VE,Vc,a);
return this.G(b)
};
kH[_P].BW=function () {
this.dispatchEvent(new VH(Sn,this.Sd,undefined,this.il[sb]))
};
kH[_P].EW=function () {
this.dispatchEvent(new VH(mH,this.Sd,undefined,this.kj[sb]))
};
kH[_P].bX=function () {
var a=He(this.Sd[0].Nl(),this.Pp);
a=Ie(a,function (b) {
return b.Va()
});
this.dispatchEvent(new VH(nH,this.Sd,a))
};
kH[_P].cX=function () {
var a=He(this.Sd[0].Zl(),this.Pp);
a=Ie(a,function (b) {
return b.Va()
});
this.dispatchEvent(new VH(nH,this.Sd,a))
};
kH[_P].e=function () {
kH.b.e.call(this);
this.VD.j();
this.VD=null;
this.Tx.j();
this.Tx=null;
this.Yf=null;
this.Kn=null;
this.Cx=null;
this.Ux=null;
this.Lp=null;
this.kj=null;
this.il=null;
this.Ly=null;
this.sr=null;
this.nr=null;
this.iq=null;
this.Tn=null;
this.jt=null;
this.xw=null
};
var VH=function (a,b,c,d) {
Ra(this,a);
Aa(this,d||false);
this.Wf=b||[];
this.zT=c||[]
};
A(VH,H);
var WH="search",XH="creation",YH=WH,ZH="dataLoad",$H="savedSearch",aI="viewLayout";
var bI="share-wrapinput";
var cI="share-table",dI="share-table-ie",eI='"><col /><col /><tbody>',fI="</tbody></table>",gI=function (a,b) {
var c=b||new Q;
c.g(eF,cI,CB,F?dI:C,eI,a.y2,fI);
if(!b)return nB(c.toString ())
},nI=function (a,b) {
var c=b||new Q;
hI(a,c);
iI(a,c);
jI(a,c);
kI(a,c);
lI(a,c);
mI(a,c);
if(!b)return c.toString ()
},oI='<tr><td vAlign="top" class="',pI="share-labelcell",qI="share-fieldlabel",rI='</span><td><div class="',sI="share-invitelist",tI='"></textarea></div>',hI=function (a,b) {
var c=z($E),d=b||new Q;
d.g(oI,pI,BB,qI,
K,c,rI,bI,qC,sI,$B,a.$O,tI);
if(!b)return d.toString ()
},uI='<tr><td><td><div class="',vI="share-link",iI=function (a,b) {
var c=z(hC),d=b||new Q;
d.g(uI,vI,$B,a.Zn,K,c,uB);
if(!b)return d.toString ()
},wI="as Collaborators",xI="as Viewers",yI='<tr><td><td><select id="',zI='"><option value="',AI='</option><option value="',BI='</option></select><span>&nbsp;-&nbsp;</span><span class="',CI="share-explain",DI='"></span>',jI=function (a,b) {
var c=z(wI),d=z(xI),e=b||new Q;
e.g(yI,a.SN,zI,0,K,c,AI,1,K,d,BI,CI,$B,a.dG,
DI);
if(!b)return e.toString ()
},EI="share-field",FI='"></input></div>',kI=function (a,b) {
var c=z(aF),d=b||new Q;
d.g(FG,pI,BB,qI,K,c,rI,bI,kC,EI,$B,a.YO,FI);
if(!b)return d.toString ()
},GI='<tr><td colSpan="2"><div class="',HI="share-invitationmessage",II='"></textarea></div></td></tr>',lI=function (a,b) {
var c=b||new Q;
c.g(GI,bI,qC,HI,$B,a.WO,II);
if(!b)return c.toString ()
},JI="Links will be included with your message.",KI='<tr><td colSpan="2"><span class="',LI="share-linkmessage",MI="</span></td></tr>",
mI=function (a,b) {
var c=z(JI),d=b||new Q;
d.g(KI,LI,K,c,MI);
if(!b)return d.toString ()
};
var OI=function () {
R.call(this,undefined,true);
this.Uc(NI);
this.lb(this.ib());
this.m=new $i(this)
};
A(OI,R);
var PI="send_invitations";
OI[_P].va=null;
OI[_P].Vn=null;
OI[_P].xg=null;
OI[_P].er=null;
OI[_P].yw=null;
OI[_P].ww=null;
OI[_P].WD=null;
OI[_P].Pb=null;
OI[_P].Ye=false;
OI[_P].Ae=false;
var QI="Add collaborators or viewers",NI=z(QI),RI="they will be able to make changes",SI=z(RI),TI="they will be able to view the document",UI=z(TI),VI="Send invitations",WI=z(VI),XI="Skip sending invitations",YI=z(XI),
ZI=z(eD),$I="skip_invitations";
OI[_P].ib=function () {
if(!this.va) {
var a=new VC;
a.k(PI,WI,false);
a.k($I,YI,false);
a.k(cD,ZI,false,true);
this.va=a
}return this.va
};
Va(OI[_P],function () {
if(!this.Ae) {
this.oy();
this.Ae=true
}this.k4(0);
this.LO(C);
this.Qq(C);
this.gw(C);
this.ug(true)
});
OI[_P].s=function (a) {
OI.b.s.call(this,a);
this.ug(true);
if(a) {
if(this.xg)this.xg.focus();
if(this.Pb&&!this.Ye)this.Yn()
}
};
OI[_P].ug=function (a) {
var b=this.Kl(),c=b.getElementsByTagName(Hb);
for(var d=0,e;e=c[d];d++)Ba(e,!a)
};var aJ=
"sharedialog",bJ="share-sendinvitations";OI[_P].f=function () {
OI.b.f.call(this);
N(this.c(),aJ);
var a=this.va.vU(PI);
if(a)N(a,bJ)
};
OI[_P].oy=function () {
var a={
};
this.oe(a);
var b=this.BS(a),c=this.fa();
c.appendChild(b);
var d=pw(c);
this.xg=d.c(a.$O);
this.fG=d.c(a.Zn);
this.er=d.c(a.SN);
this.Vn=d.c(a.dG);
this.yw=d.c(a.YO);
this.ww=d.c(a.WO);
this.m.d(this.er,Qz,this.AY);
Ww(this.Vn,SI)
};
OI[_P].BS=function (a) {
var b=nI(a);
return gI({
y2:b
})
};
var cJ="selection",dJ="choiceDescription",eJ="shareSubject",fJ="shareMessage";
OI[_P].oe=function (a) {
a.$O=this.G(Ou);
a.Zn=this.G(XD);
a.SN=this.G(cJ);
a.dG=this.G(dJ);
a.YO=this.G(eJ);
a.WO=this.G(fJ)
};
OI[_P].AY=function () {
this.eQ()
};
OI[_P].eQ=function () {
switch(this.Yz()) {
case 0:Ww(this.Vn,SI);
break;
case 1:Ww(this.Vn,UI);
break
}
};
OI[_P].qD=function (a) {
this.Pb=a
};
OI[_P].Yn=function () {
if(!this.Ye) {
var a=this.Pb;
a.Ph(this.xg);
this.m.d(this.fG,fi,this.qp);
this.Ye=true
}
};
OI[_P].qp=function (a) {
this.Pb.Yu(this.xg,a)
};
OI[_P].k4=function (a) {
Aa(this.er,a);
this.eQ()
};
OI[_P].Yz=function () {
return ha(this.er[s])
};
OI[_P].gw=function (a) {
Aa(this.yw,a)
};
OI[_P].Rl=function () {
return this.yw[s]
};
OI[_P].Qq=function (a) {
Aa(this.ww,a)
};
OI[_P].Ql=function () {
return this.ww[s]
};
OI[_P].LO=function (a) {
Aa(this.xg,a)
};
var gJ="I've shared this item with you using Google Docs.  To open it, just click the link below.",hJ="I've shared these items with you using Google Docs.  To open them, just click the links below.";
OI[_P].Zq=function (a) {
this.WD=a;
var b=a[o],c=a[0].q();
if(b>1)c+=Yj+a[1].q();
var d=c;
if(b>2) {
var e=z(EH,{
	title:d
}),
f=z(FH,{
	title:d,numItems:b-2
});
d=b==3?e:f
}this.gw(d);
var g=z(gJ),h=z(hJ);
this.Qq(b==1?g:h)
};
OI[_P].Wl=function () {
return this.WD
};
OI[_P].e=function () {
OI.b.e.call(this);
this.m.j();
this.m=null;
this.va=null;
this.Pb=null;
this.fG=null;
this.Vn=null;
this.xg=null;
this.er=null;
this.yw=null;
this.ww=null;
this.WD=null
};
var iJ=function (a) {
pq.call(this,a)
};
A(iJ,pq);
iJ[_P].K=function () {
return 4
};
var jJ=function (a) {
return new iJ(a)
};
Dj(4,jJ);
var kJ=function (a,b,c,d,e) {
Bh.call(this);
this.Gf=a;
this.jv=b;
this.Iw=c;
this.kg=d;
this.b1=e
};
A(kJ,Bh);
var lJ="cr",mJ=new G(lJ);
kJ[_P].Lc=function () {
return mJ
};
kJ[_P].K=function () {
return 4
};
kJ[_P].Yc=function () {
return this.Gf
};
kJ[_P].jf=function () {
return this.jv
};
kJ[_P].Zt=function () {
return this.Iw
};
kJ[_P].q=function () {
return this.kg
};
var nJ="service",oJ="mimeType",pJ="source",qJ="parentId";
kJ[_P].oc=function () {
var a=new D;
a.k(nJ,this.Gf);
a.k(oJ,this.jv);
a.k(pJ,this.Iw);
Oh(a,Bc,this.kg);
Oh(a,qJ,this.b1);
return a
};
var rJ=function (a) {
return new kJ(a.serviceId,a.mimeType,a.sourceId,a.name,a.parentId)
};
Xh(4,rJ);
var sJ=function (a,b,c) {
this.C=a;
this.wq=b;
this.CM=xd(this.td,this);
this.PE=new Xu(this.Cr,0,this);
this.PQ();
this.n0=c;
this.Sf=new Ej
};
A(sJ,J);
sJ[_P].YC=false;
var tJ="preferencechange";
sJ[_P].uH=function (a,b) {
this.dispatchEvent(new uJ(tJ,this,a,b))
};
sJ[_P].PQ=function () {
var a=this.wq;
if(a) {
var b=bq(a),c=b.pa()+ol;
gl().qF(this.CM,c)
}
};
sJ[_P].d2=function () {
gl().aN(this.CM)
};
sJ[_P].td=function (a,b,c) {
if(!this.YC) {
this.Sf.Ue(c);
if(this.n0)this.Cr();
else this.PE.start()
}
};
sJ[_P].Cr=function () {
var a=this.wq;
if(a) {
var b=bq(a);
if(!b)return ;
var c=this.Sf,d=b.pb();
bh(c.ca(),function (g) {
	var h=d.o(g);
	this.uH(g,h?h.p().toString ():null)
},this);
for(var e=0;e<d.D();e++) {
	var f=d.yb(e);
	if(!c.contains(f.l()))this.uH(f.q(),f.p().toString ())
}c.clear()
}
};
sJ[_P].re=function (a) {
var b=new Bl(vf(a));
this.YC=true;
this.C.Lf(b);
this.YC=false
};
sJ[_P].e=function () {
sJ.b.e.call(this);
this.C=null;
this.wq=null;
this.d2();
this.PE.j();
this.PE=null
};
var uJ=function (a,b,c,d) {
H.call(this,a,b);
Wa(this,c);
Aa(this,d)
};
A(uJ,H);
var vJ=function (a,b) {
B.call(this);
this.zf=a;
this.fB=b
};
A(vJ,B);
vJ[_P].Lk=function (a) {
this.zf=a
};
vJ[_P].isCollapsed=function () {
return this.fB
};
vJ[_P].Ch=function (a) {
this.fB=a
};
vJ[_P].V5=function () {
return {
maxResults:this.zf,isCollapsed:this.fB
}
};
var wJ=function (a,b,c,d,e) {
B.call(this);
this.DM=a;
var f=b.wa;
f[YH]=true;
f[$H]=a;
b.an(f);
this.Nb=b;
this.kg=c;
this.Px=jd(d)?d:true;
this.Sn=e||null
};
A(wJ,B);
wJ[_P].qd=function () {
return this.DM
};
wJ[_P].Jb=function () {
return this.Nb
};
wJ[_P].q=function () {
return this.kg
};
wJ[_P].ZN=function (a) {
this.Px=a
};
wJ[_P].Fu=function () {
return this.Px
};
wJ[_P].mD=function (a) {
this.Sn=a
};
wJ[_P].cd=function () {
var a=this.Nb,b=a.wa;
b[$H]=undefined;
a.an(b);
var c=this.Sn,d={
historyString:a.dg(),name:this.kg,version:1,cardShown:this.Px,
cardViewPreference:c?c.V5():null
};
b[$H]=this.DM;
a.an(b);
return Vd(d)
};
var yJ=function (a,b) {
var c;
try{
c=Rd(b)
}catch(d) {
return null
}var e=c.cardViewPreference,f=e?new vJ(e.maxResults,e.isCollapsed):null,g=new wJ(a,xJ(c.historyString),c.name,c.cardShown,f);
return g
},zJ=function (a) {
var b=cq(Cl,a);
return b?yJ(a,b.p()):null
};
wJ[_P].e=function () {
wJ.b.e.call(this);
this.Nb=null;
this.Sn=null
};
;
var AJ="list",BJ=function (a,b,c) {
B.call(this);
this.oa=a;
var d=b||{
};
if(!jd(d[aI]))d[aI]=AJ;
this.wa=d;
this.vu=c
};
A(BJ,B);
var CJ="saved-search",DJ=Ln,EJ="created-by-me",FJ="owned-by-me",GJ=Nn,HJ=dq,IJ=gv,JJ="not-in-folders",KJ=WH,LJ=Ou,MJ="opened-by-me",NJ="documents",OJ="spreadsheets",PJ="presentations",QJ=CJ,RJ="advanced-search",SJ="application/vnd.google-apps.folder";
BJ[_P].WA=null;
BJ[_P].ua=function () {
return this.oa
};
BJ[_P].an=function (a) {
this.Xj();
this.wa=a
};
BJ[_P].cd=function () {
if(!this.oa)return null;
var a={
viewRequest:this.oa.cd(),options:this.wa
};
return Vd(a)
};
var TJ=function (a) {
try{
var b=Rd(a),c=b.viewRequest;
if(b&&c) {
	var d=No(c);
	if(d)return new BJ(d,b.options)
}
}catch(e) {
}return null
},UJ="doc",VJ="spread",WJ="pres",XJ="pdfs",YJ="DoclistBlob",ZJ="home",xJ=function (a,b) {
var c=null,d={
},e=a.split(qh),f=e.shift(),g=f;
switch(f) {
case jq:c=new Co(2,{
	sort:3,defaultRequest:true,containers:1
});
break;
case DJ:c=new Co(2,{
	sort:3,star:0
});
break;
case EJ:case FJ:c=new Co(2,{
	sort:3,mine:0,containers:1
});
break;
case GJ:c=new Co(2,{
	sort:3,hidden:0
});
break;
case HJ:c=new Co(1,{
	sort:3,hidden:2
});
break;
case IJ:var h=$J(e.shift());
if(b&&b.parent)h=b.parent;
c=!Hf(h)?new Co(2,{
	parent:h,hidden:2
}):new Co(2,{
	mimeTypes:[SJ],orphans:0,sort:1,desc:false
});
break;
case eq:c=new Co(2,{
	containers:0,orphans:0
});
break;
case JJ:c=new Co(2,{
	orphans:0,containers:1
});
break;
case KJ:d[YH]=true;
var j=$J(e.shift());
if(b&&b.query)j=b.query;
c=new Co(2,{
	query:j,sort:3,hidden:2
});
break;
case RJ:d[YH]=true;
var k=$J(e.shift());
c=So(k);
break;
case QJ:var m;
m=b&&b[$H]?b[$H]:e.shift();
if(!Hf(m)) {
	var p=zJ(m);
	return p?p.Jb():null
}else return null;
case LJ:var q,t;
if(b&&b.email) {
	q=b.email;
	t=b.hosted
}else {
	q=$J(e.shift());
	t=e.shift()==zo
}c=new Co(2,{
	email:q,hosted:t,sort:3,hidden:2
});
break;
case pj:var k=$J(e.shift());
c=So(k);
break;
case MJ:c=new Co(2,{
	viewed:0,sort:6,containers:1
});
break;
case NJ:c=new Co(2,{
	mimeTypeSets:[UJ],sort:3
});
break;
case OJ:c=new Co(2,{
	mimeTypeSets:[VJ],sort:3
});
break;
case PJ:c=new Co(2,{
	mimeTypeSets:[WJ],sort:3
});
break;
case XJ:c=new Co(2,{
	mimeTypeSets:[YJ],sort:3
});
break;
case ZJ:break;
default:return null
}return new BJ(c,d,g)
},aK=function (a) {
return new xJ(IJ,{
parent:a
})
};
BJ[_P].rb=function (a,b) {
var c=this.oa,d=this.wa,e=d?d[XH]:null,f=d?d[YH]:null,g=d?d[$H]:null,h=a==RJ&&c,j=a==QJ&&c;
if(!(h||j)) {
var k={
};
if(c)switch(a) {
	case LJ:k.email=c.Va();
	k.hosted=c.Gp;
	break;
	case IJ:if(b)k.parent=c.J();
	break;
	case KJ:k.query=c.rd();
	break;
	case QJ:k[$H]=g;
	default:break
}var m=xJ(a,k);
if(!m||c&&!c.hb(m.ua())||!c&&m.ua())return false
}switch(a) {
case IJ:return b&&
!f&&!g||!b&&!e&&!f&&!g;
case KJ:case RJ:return !e&&f&&!g;
case jq:case DJ:case EJ:case FJ:case GJ:case HJ:case eq:case JJ:case LJ:case MJ:case NJ:case OJ:case PJ:case XJ:case ZJ:return !e&&!f&&!g;
case QJ:return !e&&f&&g;
default:return false
}
};
var bK="/hosted";
BJ[_P].dg=function () {
var a=this.wa,b=this.ua(),c,d=this.WA;
if(d!=null)return d;
if(this.rb(jq))c=d=jq;
else if(this.rb(DJ))c=d=DJ;
else if(this.rb(FJ)||this.rb(EJ))c=d=FJ;
else if(this.rb(GJ))c=d=GJ;
else if(this.rb(HJ))c=d=HJ;
else if(this.rb(eq))c=d=
eq;
else if(this.rb(JJ))c=d=JJ;
else if(this.rb(KJ)) {
var e=b.rd();
c=KJ;
d=c+qh+cK(e)
}else if(this.rb(RJ)) {
c=RJ;
var f=Qo(b.WI());
d=c+qh+f
}else if(this.rb(QJ)) {
c=QJ;
d=c+qh+a[$H]
}else if(this.rb(LJ)) {
var g=b.Va(),h=b.Gp;
c=LJ;
d=c+qh+cK(g)+(h?bK:C)
}else if(this.rb(IJ))c=d=IJ;
else if(this.rb(IJ,true)) {
var j=b.J();
c=IJ;
d=c+qh+j
}else if(this.rb(MJ))c=d=MJ;
else if(this.rb(NJ))c=d=NJ;
else if(this.rb(OJ))c=d=OJ;
else if(this.rb(PJ))c=d=PJ;
else if(this.rb(XJ))c=d=XJ;
else if(this.rb(ZJ))c=d=ZJ;
else {
c=pj;
d=c+qh+b.WI()
}this.vu=
c;
this.WA=d;
return d
};
BJ[_P].Xj=function () {
this.WA=null
};
var dK="+",cK=function (a) {
return a?Of(a).replace(/%20/g,dK):C
},$J=function (a) {
return a?Pf(a):C
},eK="All items",fK="Starred",gK="Created by me",hK="Owned by me",iK="Hidden",jK="Trash",kK="Items not in folders",lK="Root folder",mK="Search results",nK="Advanced search",oK="Saved search - {$savedSearchName}",pK="Saved search",qK="Person - {$email}",rK="Folders",sK="Folder - {$folderName}",tK="Folder",uK="Opened by me",vK="Documents",wK="Spreadsheets",
xK="Presentations",yK="PDFs",zK="Home";
BJ[_P].q=function () {
this.dg();
var a=C,b=this.oa;
switch(this.vu) {
case jq:var c=z(eK);
a=c;
break;
case DJ:var d=z(fK);
a=d;
break;
case EJ:var e=z(gK);
a=e;
break;
case FJ:var f=z(hK);
a=f;
break;
case GJ:var g=z(iK);
a=g;
break;
case HJ:var h=z(jK);
a=h;
break;
case JJ:var j=z(kK);
a=j;
break;
case eq:a=lK;
break;
case KJ:var k=z(mK);
a=k;
break;
case RJ:var m=z(nK);
a=m;
break;
case QJ:var p=this.wa[$H],q=zJ(p);
if(q) {
	var t=z(oK,{
		savedSearchName:q.q()
	});
	a=t
}else {
	var w=z(pK);
	a=w
}break;
case LJ:var $=
z(qK,{
	email:b.Va()
});
a=$;
break;
case IJ:var za=b.J();
if(Hf(za)) {
	var ka=z(rK);
	a=ka
}else {
	var ic=Np(za);
	if(ic) {
		var zb=z(sK,{
			folderName:ic.q()
		});
		a=zb
	}else {
		var Fd=z(tK);
		a=Fd
	}
}break;
case MJ:var sd=z(uK);
a=sd;
break;
case NJ:var ff=z(vK);
a=ff;
break;
case OJ:var ue=z(wK);
a=ue;
break;
case PJ:var ed=z(xK);
a=ed;
break;
case XJ:var Ef=z(yK);
a=Ef;
break;
case ZJ:var kh=z(zK);
a=kh;
break;
default:break
}return a
};
var AK="{$appName} - {$title}";
BJ[_P].sW=function (a) {
var b=this.q(),c=z(AK,{
appName:a,title:b
});
return Hf(b)?a:
c
};
var BK="No starred items.",CK="No items created by you.",DK="No items owned by you.",EK="No hidden items.",FK="No items in the trash.",GK="No items outside folders.",HK="No items in the root folder.",IK="No items matched your search.",JK="No items shared between you and {$name}.",KK="No folders.",LK="No items in this folder.",MK="No items opened by you.",NK="No documents.",OK="No spreadsheets.",PK="No presentations.",QK="No PDFs.",RK="No items matched your criteria.";
BJ[_P].yV=function () {
this.dg();
var a=C,b=this.oa;
switch(this.vu) {
case jq:break;
case DJ:var c=z(BK);
a=c;
break;
case EJ:var d=z(CK);
a=d;
break;
case FJ:var e=z(DK);
a=e;
break;
case GJ:var f=z(EK);
a=f;
break;
case HJ:var g=z(FK);
a=g;
break;
case JJ:var h=z(GK);
a=h;
break;
case eq:a=HK;
break;
case KJ:var j=z(IK);
a=j;
break;
case LJ:var k=z(JK,{
	name:b.Va()
});
a=k;
break;
case IJ:var m=b.J();
if(Hf(m)) {
	var p=z(KK);
	a=p
}else {
	var q=z(LK);
	a=q
}break;
case MJ:var t=z(MK);
a=t;
break;
case NJ:var w=z(NK);
a=w;
break;
case OJ:var $=z(OK);
a=$;
break;
case PJ:var za=z(PK);
a=za;
break;
case XJ:var ka=z(QK);
a=ka;
break;
case RJ:case QJ:default:a=z(RK);
break
}return a
};
BJ[_P].hb=function (a) {
var b=this.dg(),c=a.dg();
if(b!=c)return false;
var d=this.wa,e=a.wa;
return d[YH]==e[YH]&&d[$H]==e[$H]
};
BJ[_P].Ca=function () {
return new BJ(this.oa.Ca(),vf(this.wa),this.vu)
};
BJ[_P].T=function () {
var a=this.oa,b=a?a.T():this.dg(),c=new G;
c.ed(aI,this.wa[aI]);
return kg(b,qh,c.toString ())
};
BJ[_P].e=function () {
BJ.b.e.call(this);
if(this.oa) {
this.oa.j();
this.oa=null
}this.wa=null
};
;
var SK="textarea",TK="character",WK=function (a,b) {
if(UK(a))a.selectionStart=b;
else if(F) {
var c=VK(a),d=c[0],e=c[1];
if(d.inRange(e)) {
	if(a[x]==SK) {
		var f=a[s].substring(0,b);
		b=Jf(f)[o]
	}d.collapse(true);
	d.move(TK,b);
	d.select()
}
}
},YK=function (a) {
return XK(a,true)[0]
},ZK="StartToEnd",$K="\r\n",aL=function (a,b,c) {
var d=b.duplicate(),e=a[qb],f=e,g=d[qb],h=g,j=false;
while(!j)if(a.compareEndPoints(ZK,a)==0)j=true;
else {
a.moveEnd(TK,-1);
if(a[qb]==e)f+=$K;
else j=true
}if(c)return [f[o],-1];
var k=false;
while(!k)if(d.compareEndPoints(ZK,
d)==0)k=true;
else {
d.moveEnd(TK,-1);
if(d[qb]==g)h+=$K;
else k=true
}return [f[o],f[o]+h[o]]
},bL="EndToStart",XK=function (a,b) {
var c=0,d=0;
if(UK(a)) {
c=a.selectionStart;
d=b?-1:a.selectionEnd
}else if(F) {
var e=VK(a),f=e[0],g=e[1];
if(f.inRange(g)) {
	f.setEndPoint(bL,g);
	if(a[x]==SK)return aL(f,g,b);
	c=f[qb][o];
	d=!b?f[qb][o]+g[qb][o]:-1
}
}return [c,d]
},cL=function (a,b) {
if(UK(a))a.selectionEnd=b;
else if(F) {
var c=VK(a),d=c[0],e=c[1];
if(d.inRange(e)) {
	var f=YK(a);
	if(a[x]==SK) {
		var g=a[s].substring(0,b);
		b=Jf(g)[o];
		var h=
		a[s].substring(0,f);
		f=Jf(h)[o]
	}e.collapse(true);
	e.moveEnd(TK,b-f);
	e.select()
}
}
},VK=function (a) {
var b=a.ownerDocument||a[vb],c=b.selection.createRange(),d;
if(a[x]==SK) {
d=c.duplicate();
d.moveToElementText(a)
}else d=a.createTextRange();
return [d,c]
},UK=function (a) {
try{
return typeofa.selectionStart==bd
}catch(b) {
return false
}
};
var dL="<br><br>",eL=function (a,b,c,d,e,f,g) {
R.call(this,e,f,g);
this.Uc(a);
this.ma(b+dL);
this.We=c;
this.Vs=Xc(d)?d:C;
zi(this,aD,this.dM);
var h=z(dD),j=z(eD),k=new VC(g);
k.k(jD,h,true);
k.k(bD,j,false,true);
this.lb(k)
};
A(eL,R);
eL[_P].We=$c;
eL[_P].Vs=C;
eL[_P].Se=null;
eL[_P].Yj=false;
eL[_P].Ya=1;
eL[_P].zs=0;
var fL="-userInput",gL="input",hL="overflow: auto";
eL[_P].f=function () {
eL.b.f.call(this);
var a=this.xc,b={
className:a+fL,value:this.Vs
};
if(this.Ya==1) {
this.Se=this.i.f(gL,b);
Ra(this.Se,pb);
if(this.zs)this.Se.size=
this.zs
}else {
this.Se=this.i.f(SK,b);
this.Se.rows=this.Ya;
if(this.zs)this.Se.cols=this.zs
}var c=this.fa();
c.appendChild(this.i.f(L,{
style:hL
},this.Se));
if(this.Ya>1)this.ae().n3(null)
};
eL[_P].s=function (a) {
R[_P].s.call(this,a);
if(a) {
this.Yj=false;
Aa(this.Se,this.Vs);
this.Se.select()
}
};
eL[_P].o3=function (a) {
this.Vs=a
};
eL[_P].dM=function (a) {
if(!this.Yj) {
this.Yj=true;
if(a.jb==jD)at(xd(this.We,this,this.Se[s]),1);
else at(xd(this.We,this,null),1)
}
};
eL[_P].e=function () {
Mw(this.Se);
Ci(this,aD,this.dM,true,
this);
eL.b.e.call(this);
this.u7=null;
this.Se=null
};
var iL="/ui/",jL=function (a) {
iL=a
};
Uc.HtmlUtil_setServerBase=jL;
var kL,lL,mL,nL=function (a,b) {
var c=307,d;
if(a) {
d=Ax(a);
var e=Hx(a);
d.y+=e[y]
}else d=new Os(0,0);
var f=e[r]>c?e[r]:c,g=554,h=313,j=600;
if(b) {
d.x+=b[Yb]-b[Oc];
d.y+=b[Zb]-b[Pc]
}if(d.x+h>oa[r])d.x=oa[r]-h;
if(d.y+j>oa[y])d.y=oa[y]-j;
var k=new Ps(d.x,d.y,f,g);
return k
},pL=function (a,b) {
var c=new G(iL.replace(/ui\/?$/,C));
oL(c,a,b)
},qL="id",rL="toolbar=no,location=no,menubar=no,scrollbars=no,resizable=yes,status=no,width=",sL=",height=",tL=",top=",uL=",left=",vL="_picker",oL=function (a,b,c,d) {
var e;
if(b) {
b=
sw(b);
var e=b.getAttribute(qL)
}else e=null;
var f;
f=!sg&&b?Ew(ow(b))||ga:ga;
var g=nL(b,c),h=rL+g[r]+sL+g[y]+tL+g.top+uL+g[Wb],j=wL(a,e,d);
if(!kL||kL.closed)kL=f.open(j.toString (),vL,h);
kL.focus()
},xL="ui/ContactPicker",yL="inputId",zL="hl",wL=function (a,b,c) {
var d=a.sN(new G(xL));
if(b)d.ed(yL,b);
if(c) {
if(c.serviceName)d.ed(nJ,c.serviceName);
if(c.hl)d.ed(zL,c.hl)
}return d
},AL="done",BL="iframeDone",CL="picker-iframe-div",DL="position: absolute; background-color; #FFF",EL='<iframe id="picker-iframe" style="display:none; background-color; #FFF; border: 0"></iframe>',
FL="picker-iframe",GL="block",IL=function (a,b,c) {
if(lL)HL();
var d=nL(a,null),e=wL(a,c);
ga.iframeDone=HL;
e.ed(AL,BL);
var f=sw(CL);
if(f==null) {
var f=Fw(L,{
	id:CL,style:DL,zIndex:10
});
la[Ub].appendChild(f);
n(f,EL)
}var g=sw(FL);
Ya(g[u],GL);
Dx(f,d[Wb],d.top);
Fx(g,d[r],d[y]);
g.src=e;
mL=f;
lL=g
},HL=function () {
Mw(mL);
mL=null;
lL=null
},JL="goog.focus.PickerLauncher.popPicker";
Ed(JL,pL);
var KL="goog.focus.PickerLauncher.popIframe";
Ed(KL,IL);
var LL=function (a,b) {
this.z7=[];
this.Uv=nd(a)?new G(a):a;
if(this.Uv.Xc().charAt(0)!=qh)throwi();
this.XN=b;
this.KH=false;
this.yv=[];
this.rx=null
};
LL[_P].xO=function (a) {
this.ck=a
};
var ML="Email autcomplete was already initialized. To attach it to an input field, please use attachAutocomplete()";
LL[_P].cB=function (a) {
if(this.KH)throwi(ML);
this.KH=true;
var b=a||{
},c=this;
b.serverBase=this.Uv.toString ();
this.YU().OT(function (d) {
var e=d[Jc]||d.contentDocument[yc],f=e._EmailAc_create;
if(f) {
	var g=null;
	if(c.yv[o]>0)g=c.yv;
	var h=f(g,b);
	c.yv=[];
	c.rx=xd(h.addInput,h)
}
})
};
LL[_P].Ph=function (a) {
a=sw(a);
if(!this.rx)this.yv.push(a);
else this.rx(a)
};
LL[_P].lR=function (a,b) {
this.cB(b);
this.Ph(a)
};
LL[_P].kR=function (a) {
this.Ph(a)
};
LL[_P].Yu=function (a,b) {
var c={
serviceName:this.XN,hl:this.ck
};
oL(this.Uv,a,b,c)
};
var NL="ui/EmailAc";
LL[_P].YU=function () {
if(!this.JH) {
var a=this.Uv.sN(new G(NL));
a.ed(nJ,this.XN);
if(this.ck)a.ed(zL,this.ck);
this.JH=this.h0(a.toString ())
}return this.JH
};
LL[_P].h0=function (a) {
return new OL(a)
};
var PL="goog.ContactTools";
Ed(PL,LL);
var QL="setLocale";
Gd(LL[_P],QL,LL[_P].xO);
var RL="attachAutocompleteTo";
Gd(LL[_P],RL,LL[_P].lR);
var SL="attachAutocompleteAlsoTo";
Gd(LL[_P],SL,LL[_P].kR);
var TL="initAutocomplete";
Gd(LL[_P],TL,LL[_P].cB);
var UL="attachAutocomplete";
Gd(LL[_P],UL,LL[_P].Ph);
var VL="launchPicker";
Gd(LL[_P],VL,LL[_P].Yu);
var WL="load",OL=function (a) {
this.es=[];
this.sk=this.tS();
la[Ub].appendChild(this.sk);
if(F)zi(this.sk,ou,this.H0,false,this);
else zi(this.sk,WL,this.$L,false,this);
this.sk.src=a
};
OL[_P].OT=function (a) {
if(this.qi)a(this.qi);
else this.es.push(a)
};
var XL="10px",YL="-10px";
OL[_P].tS=function () {
var a=Fw(RC),b=a[u];
db(b,Nn);
wa(b,Za(b,XL));
if(!sg) {
ua(b,wx);
b.top=Ea(b,YL)
}else b.marginTop=b.marginLeft=YL;
return a
};
OL[_P].H0=function () {
if(this.sk.readyState==Jr)this.$L()
};
OL[_P].$L=function () {
this.qi=this.sk;
delete this.sk;
for(var a=0;this.es[a];++a)this.es[a](this.qi);delete this.es
};var ZL="New",$L="Upload",aM="Share",bM="Publish",cM="Star",dM="Unstar",eM="unstar",fM="Add to folder",gM="Move to",hM="Remove from folder",iM="Hide",jM="Hide selected items. They will only appear in folders and in the Hidden view.",kM="hide",lM="Rename",mM="Delete",nM="Move selected items to the Trash.  You'll need to empty the Trash to permanently delete them.",oM="Empty trash",pM="This will permanently delete your items.",qM="Undelete",rM="Change color",sM="Edit",tM="Show in Home",uM="More actions",
vM="more",wM="No items selected.",xM="Please select only one item.",yM="Insufficient permissions to perform this action.",S=function (a,b) {
B.call(this);
this.n=a;
this.Pa=b;
this.m=new $i(this);
this.uh={
};
var c=this.uh,d=z(ZL),e=new zM(lq,d);
c[e.Ub]=e;
var f=z($L),g=new zM(AM,f);
c[g.Ub]=g;
var h=z(aM);
if(a.YH) {
var j=new zM(BM,h);
c[j.Ub]=j
}z(bM);
var k=z(cM),m=new zM(oo,k);
c[m.Ub]=m;
var p=z(dM),q=new zM(eM,p);
c[q.Ub]=q;
z(fM);
var t=z(gM),w=new zM(CM,t);
c[w.Ub]=w;
var $=z(hM),za=new zM(DM,$);
c[za.Ub]=za;
var ka=
z(iM),ic=z(jM),zb={
};
zb.toolTip=ic;
var Fd=new zM(kM,ka,zb);
c[Fd.Ub]=Fd;
var sd=z(lM),ff=new zM(EM,sd);
c[ff.Ub]=ff;
var ue=z(mM),ed=z(nM);
zb={
};
zb.toolTip=ed;
var Ef=new zM(FM,ue,zb);
c[Ef.Ub]=Ef;
var kh=z(oM),bs=z(pM);
zb={
};
zb.toolTip=bs;
var Eo=new zM(GM,kh,zb);
c[Eo.Ub]=Eo;
var cs=z(qM),Fo=new zM(HM,cs);
c[Fo.Ub]=Fo;
var Go=z(rM);
if(a.yj) {
var ds=new zM(Kb,Go);
c[ds.Ub]=ds
}if(a.Wd) {
var Ho=z(sM),es=new zM(IM,Ho);
c[es.Ub]=es;
var Io=z(tM),nh=new zM(JM,Io);
c[nh.Ub]=nh;
var Jo=new zM(KM,ue);
c[Jo.Ub]=Jo;
var Ko=new zM(LM,
sd);
c[Ko.Ub]=Ko
}var fs=z(uM),cm=new zM(vM,fs);
c[cm.Ub]=cm;
var dm=new zM(MM,C);
c[dm.Ub]=dm;
var Lo=new zM(NM,C);
c[Lo.Ub]=Lo;
var em=z(wM);
this.wi=em;
var O0=z(xM);
this.O0=O0;
var P0=z(yM);
this.m0=P0
};
A(S,B);
S[_P].Gc=null;
S[_P].ea=null;
S[_P].V=null;
S[_P].C=null;
S[_P].O=null;
S[_P].aa=null;
S[_P].uh=null;
S[_P].Ti=null;
S[_P].dk=null;
S[_P].wn=false;
S[_P].Si=null;
S[_P].Th=null;
S[_P].mj=null;
S[_P].yh=null;
S[_P].Ba=null;
S[_P].jk=null;
S[_P].Sh=null;
S[_P].dr=null;
S[_P].Ey=null;
S[_P].xs=null;
S[_P].rv=null;
S[_P].Un=
null;
S[_P].uC=null;
S[_P].tv=null;
S[_P].ft=null;
S[_P].Pb=null;
var AM="upload",BM=oH,CM="addtofolder",GM="emptytrash",HM="undelete",FM="delete",DM="removefromfolder",EM="rename",IM="editsavedsearch",JM="showsavedsearch",KM="deletesavedsearch",LM="renamesavedsearch",MM="listlayout",NM="gridlayout";
S[_P].Yt=function () {
if(!this.Si) {
this.Si=new aE;
this.Si.l4(this.n.vw);
this.m.d(this.Si,aD,this.DY)
}return this.Si
};
S[_P].Nj=function () {
if(!this.Ti) {
this.Ti=new OI;
this.Ti.qD(this.zt());
this.m.d(this.Ti,aD,
this.EY)
}return this.Ti
};
S[_P].mi=function () {
if(!this.dk) {
this.dk=new kH(this.n.J_,this.zt());
this.m.d(this.dk,$C,this.MX);
this.m.d(this.dk,mH,this.QW);
this.m.d(this.dk,Sn,this.CW);
this.m.d(this.dk,nH,this.eX)
}return this.dk
};
S[_P].vt=function () {
if(!this.mj) {
this.mj=new aE;
this.m.d(this.mj,aD,this.KW)
}return this.mj
};
S[_P].Ll=function () {
if(!this.Th) {
this.Th=new oD;
this.Th.qD(this.zt());
this.m.d(this.Th,aD,this.LW)
}return this.Th
};
var OM="Sync now (for offline access)",PM="sync",QM="Change Owner",
RM="change-owner",SM="Use the checkboxes to select one or more items.",TM="submenu",UM="No actions are available for this selection.";
S[_P].cu=function (a,b) {
var c=ainstanceofI?[a]:this.ea.cc(),d=oq(c),e=this.O;
if(e&&e.od&&e.$a()) {
var f=Qp(c),g=c[o]>0&&dh(f,function (zb) {
	return zb.Iu()
});
if(g) {
	var h=z(OM),j={
	};
	j.name=h;
	j[Zl]=PM;
	j[$l]=true;
	j[gm]=200;
	d.unshift(new hm(j))
}
}if(this.n.kt&&c[o]>0) {
var k=false;
for(var m=0;m<c[o];m++) {
	var p=c[m];
	if(this.hB(p)&&!this.gB(p)) {
		k=true;
		break
	}
}if(k) {
	var q=z(QM),
	j={
	};
	j.name=q;
	j[Zl]=RM;
	j[gm]=201;
	if(e)j.enabled=e.$a();
	d.push(new hm(j))
}
}if(this.n.yj&&c[o]>0&&this.fR(c)) {
var j={
};
j.name=this.uh.color.S();
j[Zl]=Kb;
j[gm]=13;
j[$l]=true;
d.push(new hm(j))
}var t=[],w=null,$={
};
$.enabled=false;
if(!b)if(c[o]==0) {
var za=z(SM);
w=new zM(TM,za,$);
t.push(w)
}else if(d[o]==0) {
var ka=z(UM);
w=new zM(TM,ka,$);
t.push(w)
}$.enabled=true;
for(var m=0;m<d[o];m++) {
var ic=d[m];
$.action=ic;
w=new zM(TM,ic.q(),$);
t.push(w)
}return t
};
S[_P].jD=function (a) {
this.V=a
};
S[_P].p4=function (a) {
this.Gc=
a
};
S[_P].h4=function (a) {
this.ea=a
};
S[_P].Pq=function (a) {
var b=this.m;
if(this.C)b.M(this.C,$u,this.hu);
this.C=a;
if(a)b.d(a,$u,this.hu);
this.aa=new sJ(a,Cl)
};
S[_P].Xm=function (a) {
this.O=a;
this.m.d(a,tr,this.qc)
};
var VM="folder";
S[_P].xA=function (a,b) {
var c=Mp(a);
if(c) {
var d,e;
d=c.ig()?Lp(VM):Tp(a)[0];
e=Wp(d.l())[0];
if(c.ig()) {
	var f=new kJ(d.l(),a,e.l(),undefined,b);
	this.uC=f;
	this.C.Lf(f)
}else {
	var g=d.Vt(Up,a,lq),h=new sq(g,[]);
	this.V.execute(h);
	this.TN()
}
}else if(nd(a))Bv(a,{
target:Hv
})
};
S[_P].hu=function (a) {
if(this.dr&&
this.dr.T()==a.kb.T()) {
var b=a.Ec,c=b.Tg||this.Gc.Ht();
if(b.De)this.Dw(iE,c);
else if(b.ey)this.Dw(jE,b.dy);
else if(this.wn)this.mi().s(false);
else this.Nj().s(false);
return
}var d=a.kb.T(),e=this.uC;
if(e&&d==e.T()) {
if(a[x]==$u) {
	var f=a.Ec.Hb(),g;
	for(var h=0;h<f[o];h++) {
		var j=f[h];
		if(j.Vz()==0) {
			g=j;
			break
		}
	}if(g)if(Yp(g)) {
		var k=xJ(IJ,{
			parent:g.l()
		}),m=k.wa;
		m[XH]=true;
		m[ZH]=false;
		this.Pa.Dc(k)
	}
}return
}if(this.Un&&this.Un.T()==a.kb.T()) {
var b=a.Ec,c=b.Tg||this.Gc.Ht(),p=this.Ll();
if(b.De)this.Cw(iE,c);
else if(b.ey)this.Cw(jE,b.dy);
else {
	if(p.Mu) {
		var q=p.Wo();
		if(q&&q[o]>0) {
			this.V.execute(new sq(2,q,{
				value:true
			}));
			p.Oq(null)
		}
	}p.s(false)
}return
}if(this.Ey&&this.Ey.T()==a.kb.T()||this.rv&&this.rv.T()==a.kb.T()||this.xs&&this.xs.T()==a.kb.T()) {
var b=a.Ec,c=b.Tg||this.Gc.Ht();
if(b.De)this.Dw(iE,c);
else if(b.ey)this.Dw(jE,b.dy);
else {
	var t=this.mi();
	t.refresh()
}return
}
};
S[_P].Dw=function (a,b) {
if(this.wn)this.mi().ug(true);
else this.Nj().ug(true);
var c=this.Yt();
c.Ga(a);
c.ma(b);
c.s(true)
};
S[_P].Cw=function (a,
b) {
var c=this.vt();
c.Ga(a);
c.ma(b);
c.s(true)
};
S[_P].TN=function (a) {
if(!a) {
this.kv=new at(xd(this.TN,this,true),this.n.P1);
return
}else this.kv=null;
this.C.Lf(new Co(2,{
sort:3,defaultRequest:true,containers:1,start:0,num:10
}))
};
S[_P].dK=function () {
this.V.NT()
};
S[_P].yW=function (a,b) {
var c=Np(a);
if(c) {
var d=b?[b]:this.ea.cc();
if(d[o]>0) {
	var e=new sq(8,d,{
		addedFolders:[a]
	});
	this.V.execute(e)
}else this.Dd()
}
};
S[_P].UX=function (a,b) {
var c=Np(a);
if(c) {
var d=this.ea,e=b?[b]:d.cc(),f={
	addedFolders:[a]
};
if(b)f.removedFolders=
d.gA(b).ca();
else if(e[o]>0)f.unlink=d.Pj();
else {
	this.Dd();
	return
}var g=new sq(8,e,f);
this.V.execute(g)
}
};
S[_P].mY=function (a) {
var b=this.ea,c=a?[a]:b.cc(),d={
};
if(a)d.removedFolders=b.gA(a).ca();
else if(c[o]>0)d.unlink=b.Pj();
else {
this.Dd();
return
}var e=new sq(8,c,d);
this.V.execute(e)
};
S[_P].Dd=function () {
this.Gc.fd(this.wi,sA)
};
S[_P].pT=function () {
this.Gc.fd(this.m0,sA)
};
S[_P].Gy=function () {
this.Gc.fd(this.O0,sA)
};
S[_P].TJ=function (a) {
var b=this.ea.cc();
if(b[o]>0) {
if(a) {
	var c=a.J();
	if(c)this.V.execute(new sq(8,
	b,{
		removedFolders:[c]
	}))
}
}else this.Dd()
};
S[_P].FA=function (a,b) {
var c=a?[a]:this.ea.cc(),d=c[o];
if(d==0) {
this.Dd();
return
}this.jk=new Ej;
for(var e=0;e<d;e++) {
var f=c[e];
if(!f.getAttribute($n).p())this.jk.add(f.l())
}var g=this.n.DT;
if(g&&!this.n.CT)for(var e=0;e<d;e++) {
var f=c[e];
if(f.Yc()==VJ) {
	g=false;
	break
}
}this.wn=g;
var h=this.jk.D();
if(h>0) {
var j=this.Yt();
j.Ga(tE,d,h);
j.s(true)
}else if(g) {
var k=this.mi();
k.reset();
k.Ga(oH);
k.Zq(c);
if(b)k.mO(b);
k.s(true)
}else {
var m=this.Nj();
m.reset();
m.Zq(c);
if(b)m.LO(b);
m.s(true)
}
};
var WM="Please enter some people to invite to share this document.",XM="Please enter some people to invite to share these documents.";
S[_P].MX=function (a) {
var b=this.mi(),c=this.Yt(),d=a.jb;
switch(d) {
case lH:if(Hf(b.Yf[s])) {
	c.Ga(iE);
	var e=z(WM),f=z(XM);
	c.ma(b.Wl()[o]==1?e:f);
	c.s(true);
	return false
}b.s(false);
b.Ga(to);
b.s(true);
return false;
case gH:case iH:b.ug(false);
if(d==gH)this.eD(true);
else {
	c.Ga(eE);
	c.s(true)
}return false
}return true
};
S[_P].EY=function (a) {
var b=this.Nj(),
c=this.Yt(),d=a.jb;
switch(d) {
case cD:break;
case PI:case $I:if(!b.xg[s]) {
	c.Ga(iE);
	var e=z(WM),f=z(XM);
	c.ma(b.Wl()[o]==1?e:f);
	c.s(true);
	return false
}b.ug(false);
if(d==PI)this.eD(true);
else {
	c.Ga(eE);
	c.s(true)
}return false
}return true
};
S[_P].DY=function (a) {
switch(a.jb) {
case kD:if(this.wn)this.mi().ug(false);
var b=this.dr;
b.bO(true);
this.V.execute(b);
break;
case wE:this.eD(false);
break;
case nE:if(this.wn)this.mi().ug(true);
else this.Nj().s(true);
break;
case pE:this.ea.Wx(this.jk);
break;
case oE:break
}
};
S[_P].eX=
function (a) {
var b={
};
b[0]=a.zT;
var c=new sq(12,a.Wf,{
acls:b
});
this.Ey=c;
this.V.execute(c)
};
S[_P].QW=function (a) {
var b=new sq(14,a.Wf,{
value:a[s]
});
this.xs=b;
this.V.execute(b)
};
S[_P].CW=function (a) {
var b=new sq(15,a.Wf,{
value:a[s]
});
this.rv=b;
this.V.execute(b)
};
S[_P].eD=function (a,b) {
if(!this.n.kt) {
var c=this.Nj(),d=new sq(11,c.Wl(),{
	shareWith:c.xg[s],sendEmail:a,shareAs:c.Yz(),subject:a?c.Rl():C,message:a?c.Ql():C,confirm:b||false,displayStatus:false
})
}else if(this.wn) {
var c=this.mi(),e=c.RV(),f=
c.Yf[s].split(Kd),g={
};
g[e]=f;
d=new sq(12,c.Wl(),{
	acls:g,sendEmail:a,ccSelf:c.Tn[sb],subject:a?c.Rl():C,message:a?c.Ql():C,confirm:b||false,displayStatus:false
})
}else {
var c=this.Nj(),e=0;
e=c.Yz()==0?30:20;
var f=c.xg[s].split(Kd),g={
};
g[e]=f;
d=new sq(12,c.Wl(),{
	acls:g,sendEmail:a,subject:a?c.Rl():C,message:a?c.Ql():C,confirm:b||false,displayStatus:false
})
}this.dr=d;
this.V.execute(d)
};
S[_P].ku=function (a,b) {
var c=b?[b]:this.ea.cc();
if(c[o]>0)this.V.execute(new sq(10,c,{
value:a
}));
else this.Dd()
};
S[_P].hB=
function (a) {
return a.getAttribute(Rn).p()
};
S[_P].YZ=function (a) {
return a.rJ()>0||a.getAttribute(Vn).p()
};
S[_P].gB=function (a) {
return a.jf()==$p().Ia()
};
S[_P].JJ=function (a) {
var b=a?[a]:this.ea.cc(),c=b[o];
if(c==0) {
this.Dd();
return
}if(!this.n.kt)this.V.execute(new sq(2,b,{
value:true
}));
else {
var d=[],e=[],f=0,g=this.n.OH;
for(var h=0;h<c;h++) {
	var j=b[h];
	if(this.hB(j)&&this.YZ(j)&&!this.gB(j)) {
		d.push(j);
		if(!g&&j.Yc()==VJ)f++
	}else e.push(j)
}var k=d[o];
if(k>0) {
	var m=this.Ll();
	m.reset();
	if(!g&&f>0)m.Ga(rD,
	d,true);
	else m.Ga(rD,d);
	m.Oq(e);
	m.ED(true);
	m.s(true)
}else this.V.execute(new sq(2,b,{
	value:true
}))
}
};
S[_P].JW=function (a) {
var b=a?[a]:this.ea.cc();
this.YF(b)
};
S[_P].YF=function (a,b) {
var c=0,d=this.n.OH;
this.Sh=new Ej;
for(var e=0;e<a[o];e++) {
var f=a[e];
if(!this.hB(f)||this.gB(f))this.Sh.add(f.l());
if(!d&&f.Yc()==VJ) {
	this.Sh.add(f.l());
	c++
}
}var g=this.Sh.D(),h=a[o];
if(g>0) {
var j=this.vt();
if(!d&&c>0)j.Ga(gE,h,g,c);
else j.Ga(fE,h,g);
j.s(true)
}else if(b) {
var k=this.Ll();
k.reset();
k.ED(true);
k.Oq(b);
k.Ga(qD,
a);
k.s(true)
}else {
var k=this.Ll();
k.reset();
k.ED(false);
k.Ga(qD,a);
k.s(true)
}
};
var YM="Please enter a new owner for this document.",ZM="Please enter a new owner for these documents.",$M="A document can only have one owner. Please enter a single new owner for this document.",aN="Documents can only have one owner. Please enter a single new owner for these documents.";
S[_P].LW=function (a) {
var b=this.Ll();
switch(a.jb) {
case pD:var c=this.O;
if(c&&c.Ka&&!this.Xa) {
	var d=this.vt();
	d.Ga(hE);
	d.s(true);
	return false
}b.s(false);
this.YF(b.gp(),b.Wo());
return false;
case FD:var e=b.gp().concat(b.Wo());
this.V.execute(new sq(2,e,{
	value:true
}));
break;
case GD:case ED:if(b.Mu) {
	var f=b.Wo();
	if(f&&f[o]>0) {
		this.V.execute(new sq(2,f,{
			value:true
		}));
		b.Oq(null)
	}
}break;
case DD:var g=b.um[s],d=this.vt();
if(!g) {
	var h=z(YM),j=z(ZM);
	this.Cw(iE,b.gp()[o]==1?h:j);
	return false
}g=Kf(g);
if(Cf(g,Kd))g=g.substring(0,g[o]-1);
if(g.split(Kd)[o]>1) {
	var k=z($M),m=z(aN);
	this.Cw(iE,b.gp()[o]==1?k:m);
	return false
}if(this.n.kt) {
	var p={
	};
	p[40]=g.split(Kd);
	var q=true,t=new sq(12,b.gp(),{
		acls:p,sendEmail:q,subject:q?b.Rl():C,message:q?b.Ql():C,confirm:false,displayStatus:false
	});
	this.Un=t;
	this.V.execute(t)
}return false
}return true
};
S[_P].KW=function (a) {
var b=this.Ll();
switch(a.jb) {
case kD:var c=this.Un;
c.bO(true);
this.V.execute(c);
break;
case rE:this.ea.Wx(this.Sh);
break;
case sE:if(b.Mu) {
	var d=b.Wo();
	if(d&&d[o]>0) {
		this.V.execute(new sq(2,d,{
			value:true
		}));
		b.Oq(null)
	}
}b.s(false);
break;
case qE:case bD:case jD:break
}
};
S[_P].UJ=function (a) {
var b=a?[a]:this.ea.cc();
if(b[o]==1) {
var c=b[0];
if(c.VI()>=30)this.V.execute(new sq(101,b));
else this.pT()
}else if(b[o]>1)this.Gy();
else this.Dd()
};
S[_P].BA=function (a,b) {
var c=b?[b]:this.ea.cc();
if(c[o]==1) {
c=iq(c);
for(var d=0;d<c[o];d++)c[d].S3(a);this.C.yc.ue(c);this.V.execute(new sq(7,c,{
	sValue:a,displayStatus:false
}))
}else if(c[o]>1)this.Gy();
else this.Dd()
};
S[_P].IW=function (a,b) {
var c=b?[b]:this.ea.cc();
if(c[o]==1) {
c=iq(c);
for(var d=0;d<c[o];d++)c[d].p3(a);this.C.yc.ue(c);this.V.execute(new sq(9,c,{
	sValue:a,displayStatus:false
}))
}else if(c[o]>
1)this.Gy();
else this.Dd()
};
var bN="Emptying the trash will permanently delete all items in the trash. Continue?";
S[_P].OJ=function (a) {
var b=z(bN),c,d=a?[a]:this.ea.cc();
if(d[o]>0)c=new sq(3,d,{
value:true
});
else if(confirm(b))c=new sq(3,null,{
value:true,confirm:true
});
if(c)this.V.execute(c)
};
var cN="Un-delete all the items in the trash?";
S[_P].cK=function (a) {
var b=z(cN),c,d=a?[a]:this.ea.cc();
if(d[o]>0)c=new sq(2,d,{
value:false
});
else if(confirm(b))c=new sq(2,null,{
value:false,confirm:true
});
if(c)this.V.execute(c)
};
S[_P].GA=function (a,b) {
this.GJ(a,Tn,0,b)
};
S[_P].KY=function (a,b) {
this.GJ(a,Zn,16,b)
};
S[_P].GJ=function (a,b,c,d) {
var e=d?[d]:this.ea.cc();
if(e[o]>0) {
e=iq(e);
for(var f=0;f<e[o];f++)e[f].getAttribute(b).sa(a);this.C.yc.ue(e);var g=new sq(c,e,{
	value:a,displayStatus:false
});
this.V.execute(g)
}else this.Dd()
};
S[_P].mA=function (a,b) {
var c=b?[b]:this.ea.cc();
if(c[o]>0) {
c=iq(c);
for(var d=0;d<c[o];d++)c[d].g3(a);this.C.yc.ue(c);var e=new sq(13,c,{
	nValue:a,displayStatus:false
});
this.V.execute(e)
}else this.Dd()
};
var dN="off";
S[_P].qc=function (a) {
var b=this.Xa=a[bc]!=dN;
if(this.yh&&!b)this.yh.s(false)
};
S[_P].eK=function (a) {
this.Pa.r2(a)
};
S[_P].vT=function (a) {
var b=yJ(a.l(),a.p());
this.wT(b)
};
S[_P].b5=function (a) {
var b=yJ(a.l(),a.p());
b.ZN(true);
this.xk(b.qd(),b);
this.Pa.Dc(xJ(ZJ))
};
S[_P].nH=function (a) {
var b={
};
b[a.l()]=C;
this.aa.re(b)
};
S[_P].z2=function (a,b) {
var c=yJ(a.l(),a.p()),d=b.ua(),e=c.Jb(),f=new BJ(d,e.wa,e.dg()),g=new wJ(c.qd(),f,c.q()),h={
};
h[a.l()]=g.cd();
this.aa.re(h)
};
var eN="Rename Saved Search",
fN="Please enter a new name for the saved search:";
S[_P].hN=function (a) {
var b=this.Ba=yJ(a.l(),a.p());
if(b) {
if(!this.yh) {
	var c=z(eN),d=z(fN);
	this.yh=new eL(c,d,xd(this.e2,this),undefined,undefined,true,undefined)
}this.yh.o3(b.q());
this.yh.s(true)
}
};
S[_P].e2=function (a) {
if(!Hf(a)) {
var b=this.Ba,c=new wJ(b.qd(),b.Jb(),a);
this.xk(b.qd(),c)
}
};
S[_P].xk=function (a,b) {
var c={
};
c[a]=b.cd();
this.aa.re(c)
};
var gN="This action can only be performed on one item at a time. Please select one item and try again.";
S[_P].rA=function (a,b) {
var c=b?[b]:this.ea.cc();
if(c[o]==0)this.Dd();
else if(ainstanceofam)if(a.Yg()==PM) {
var d=this.O;
if(d&&d.Ka) {
	var e=[];
	for(var f=0;f<c[o];f++)e.push(c[f].l());d.Xl().H5(e)
}
}else if(a.Yg()==RM)this.JW(b);else this.V.execute(new sq(a,c));else z(gN)
};S[_P].BI=function (a) {
var b=a||this.ea.cc(),c=null;
for(var d=0;d<b[o];d++) {
var e=b[d];
if(id(c))c=e.gf();
else if(c!=e.gf()) {
	c=null;
	break
}
}return id(c)?c:bn(c)
};
S[_P].gR=function (a) {
for(var b=0;b<a[o];b++)if(!a[b].getAttribute(Tn).p())return false;
return true
};S[_P].fR=function (a) {
var b=$p().Ia();
for(var c=0;c<a[o];c++)if(a[c].jf()!=b)return false;return true
};S[_P].W3=function (a) {
this.tv=a
};
S[_P].S0=function (a) {
if(this.tv)this.tv(a)
};
S[_P].v3=function (a) {
this.ft=a
};
S[_P].wT=function (a) {
if(this.ft)this.ft(a)
};
S[_P].eS=function () {
if(!this.Pb) {
var a=this.n,b=new LL(a.$T,a.gU);
b.xO(a.ck);
b.cB({
	rightAlign:a.k_
});
this.Pb=b
}
};
S[_P].zt=function () {
if(!this.Pb)this.eS();
return this.Pb
};
S[_P].e=function () {
S.b.e.call(this);
this.uh=null;
if(this.kv)bt(this.kv);
this.kv=null;
this.uC=null;
this.wi=null;
this.tv=null;
this.ft=null;
this.Gc=null;
this.V=null;
this.ea=null;
this.C=null;
this.n=null;
this.rv=null;
this.Un=null;
this.xs=null;
this.dr=null;
if(this.Pb) {
this.Pb.j();
this.Pb=null
}if(this.Ti) {
this.Ti.j();
this.Ti=null
}if(this.Si) {
this.Si.j();
this.Si=null
}if(this.Th) {
this.Th.j();
this.Th=null
}if(this.mj) {
this.mj.j();
this.mj=null
}if(this.yh) {
this.yh.j();
this.yh=null
}if(this.Ba) {
this.Ba.j();
this.Ba=null
}if(this.jk) {
this.jk.clear();
this.jk=null
}if(this.Sh) {
this.Sh.clear();
this.Sh=null
}if(this.aa) {
this.aa.j();
this.aa=null
}
};
var zM=function (a,b,c) {
B.call(this);
this.Ub=a;
this.oT=b;
var d=c||{
},e=d.contextMenu;
this.c8=id(e)||!Xc(e)?true:e;
var f=d.toolBar;
this.d8=jd(f)?f:true;
this.kh=d.iconUrl;
this.Gf=d.serviceId;
this.jv=d.mimeType;
this.Iw=d.sourceId;
this.En=d.action;
var g=d.enabled;
this.Ua=id(g)||!Xc(g)?true:g;
this.CE=d.toolTip
};
zM[_P].S=function () {
return this.oT
};
zM[_P].Zc=function () {
return this.CE
};
zM[_P].Ie=function () {
return this.kh
};
zM[_P].Yc=function () {
return this.Gf
};
zM[_P].jf=function () {
return this.jv
};
zM[_P].Zt=function () {
return this.Iw
};
zM[_P].Xg=function () {
return this.En
};
zM[_P].e=function () {
zM.b.e.call(this);
this.Ub=null
};
var hN="Can't use invisible history without providing a blank page.",iN="history_state",jN='<input type="text" name="%s" id="%s" style="display:none" />',kN="history_iframe",lN='src="',mN='<iframe id="%s" style="display:none" %s></iframe>',oN=function (a,b,c,d) {
J.call(this);
if(a&&!b)throwi(hN);
var e;
if(c)e=c;
else {
var f=iN+nN;
la.write(Ff(jN,f,f));
e=rw(f)
}this.Fp=e;
this.gj=c?Ew(ow(c)):ga;
this.rR=this.gj[Fb][rc].split(ih)[0]+ih;
this.ZA=b;
this.U=new Ys(150);
this.vn=!a;
this.m=new $i(this);
if(a||F) {
var g;
if(d)g=d;
else {
	var h=kN+nN,j=this.ZA?lN+eg(this.ZA)+Zd:C;
	la.write(Ff(mN,h,j));
	g=rw(h)
}this.qi=g
}if(F) {
this.m.d(this.gj,WL,this.C0);
this.Ny=false;
this.cP=false
}if(this.vn)this.yD(this.Jb());
else this.Ym(this.Fp[s]);
nN++
};
A(oN,J);
oN[_P].Ua=false;
oN[_P].bv=false;
oN[_P].xf=null;
oN[_P].nm=null;
oN[_P].e=function () {
oN.b.e.call(this);
this.m.j();
this.Z(false)
};
var pN="pageshow";
oN[_P].Z=function (a) {
if(a==this.Ua)return ;
if(F&&!this.Ny) {
this.cP=a;
return
}if(a) {
if(pg)this.m.d(this.gj[vb],qN,this.V0);
else if(qg)this.m.d(this.gj,
pN,this.kC);
if(!F||this.Ny) {
	this.m.d(this.U,$s,this.yM);
	this.Ua=true;
	this.U.start();
	this.dispatchEvent(new rN(this.Jb()))
}
}else {
this.Ua=false;
this.m.vc();
this.U.stop()
}
};
oN[_P].C0=function () {
this.Ny=true;
if(this.Fp[s])this.Ym(this.Fp[s],true);
this.Z(this.cP)
};
oN[_P].kC=function (a) {
if(a.Wc.persisted) {
this.Z(false);
this.Z(true)
}
};
oN[_P].Jb=function () {
return this.nm!==null?this.nm:(this.vn?this.Pz(this.gj):this.Kz()||C)
};
oN[_P].Qi=function (a,b) {
this.E3(a,false,b)
};
oN[_P].Pz=function (a) {
var b=a[Fb][rc],
c=b.indexOf(ih);
return c<0?C:b.substring(c+1)
};
oN[_P].E3=function (a,b,c) {
if(this.Jb()!=a)if(this.vn) {
this.yD(a,b);
if(F)this.Ym(a,b,c);
if(this[jc])this.yM()
}else {
this.Ym(a,b);
this.nm=this.xf=Aa(this.Fp,a);
this.dispatchEvent(new rN(a))
}
};
oN[_P].yD=function (a,b) {
var c=this.rR+(a||C),d=this.gj[Fb];
if(c!=d[rc])if(b)d.replace(c);
else Pa(d,c)
};
var sN="text/html",tN="replace",uN="<title>%s</title><body>%s</body>";
oN[_P].Ym=function (a,b,c) {
if(!vN&&a!=this.Kz()) {
a=Of(a);
if(F) {
	var d=Uw(this.qi);
	d.open(sN,b?
	tN:undefined);
	d.write(Ff(uN,c||this.gj[vb][jb],a));
	d.close()
}else {
	var e=this.ZA+ih+a,f=this.qi[Jc];
	if(f)if(b)f[Fb].replace(e);
	else Pa(f[Fb],e)
}
}
};
oN[_P].Kz=function () {
if(F) {
var a=Uw(this.qi);
return a[Ub]?Pf(a[Ub][yb]):null
}else if(vN)return null;
else {
var b=this.qi[Jc];
if(b) {
	var c;
	try{
		c=Pf(this.Pz(b))
	}catch(d) {
		if(!this.bv)this.yO(true);
		return null
	}if(this.bv)this.yO(false);
	return c||null
}else return null
}
};
oN[_P].yM=function () {
if(this.vn) {
var a=this.Pz(this.gj);
if(a!=this.xf)this.Re(a)
}if(!this.vn||
F) {
var b=this.Kz()||C;
if(this.nm==null||b==this.nm) {
	this.nm=null;
	if(b!=this.xf)this.Re(b)
}
}
};
oN[_P].Re=function (a) {
this.xf=Aa(this.Fp,a);
if(this.vn) {
if(F)this.Ym(a);
this.yD(a)
}else this.Ym(a);
this.dispatchEvent(new rN(this.Jb()))
};
oN[_P].yO=function (a) {
if(this.bv!=a)this.U.setInterval(a?10000:150);
this.bv=a
};
oN[_P].V0=function () {
this.U.stop();
this.U.start()
};
var wN="419",vN=sg&&Kg(ug,wN)<=0,qN=[Ni,Qi,Pi],nN=0,xN="navigate",rN=function (a) {
H.call(this,xN);
this.Bg=a
};
A(rN,H);
var yN=function (a,b) {
J.call(this);
this.ya=!a;
this.Le=new oN(a,b);
this.m=new $i(this);
this.m.d(this.Le,xN,this.AX)
};
A(yN,J);
yN[_P].Z=function (a) {
this.Le.Z(a)
};
yN[_P].Jb=function () {
return this.sM(this.Le.Jb())
};
yN[_P].Qi=function (a,b) {
this.Le.Qi(this.T2(a),b)
};
yN[_P].sM=function (a) {
return this.ya?xJ(a):TJ(a)
};
yN[_P].T2=function (a) {
return this.ya?a.dg():a.cd()
};
yN[_P].AX=function (a) {
this.dispatchEvent(new rN(this.sM(a.Bg)))
};
yN[_P].e=function () {
yN.b.e.call(this);
this.m.j();
this.m=null;
this.Le.j();
this.Le=
null
};
var zN="position:absolute;left:0;top:-1000px;",AN="X",BN=function (a) {
this.Ew=Fw(L,{
style:zN
},AN);
Iw(qw()[Ub],this.Ew);
this.kL=this.Ew[Ab];
if(a)this.wE=zi(a,$s,this.aG,false,this);
else this.he=Uc.setInterval(xd(this.aG,this),50)
};
A(BN,J);
BN[_P].wE=null;
BN[_P].he=null;
BN[_P].e=function () {
BN.b.e.call(this);
Mw(this.Ew);
if(this.wE)Ei(this.wE);
if(this.he)ga.clearInterval(this.he)
};
var CN="fontsizechange";
BN[_P].aG=function () {
var a=this.Ew[Ab];
if(this.kL!=a) {
this.kL=a;
this.dispatchEvent(CN)
}
};
var FN=function (a) {
J.call(this);
var b;
if(!a)b=[pw().W];
else if(kd(a)) {
b=[];
for(var c=0;c<a[o];c++)b.push(a[c].W)
}else b=[a.W];this.Rg=b;this.yB=Ad();this.w_=C;var d=new $i(this);this.m=d;for(var c=0;c<this.Rg[o];c++) {
d.d(this.Rg[c],DN,this.of,true);
d.d(this.Rg[c][Ub],EN,this.of,true)
}
};
A(FN,J);
FN[_P].FL=0;
var GN="dblclick",EN=[fi,GN,Ni,Oi,Pi],DN=[Qi,Ri];
FN[_P].e=function () {
FN.b.e.call(this);
this.m.j();
this.m=null;
this.Rg=null
};
FN[_P].of=function (a) {
var b=false;
switch(a[x]) {
case Pi:if(typeofthis.hL==
bd&&this.hL!=a[Oc]||typeofthis.iL==bd&&this.iL!=a[Pc])b=true;
this.hL=a[Oc];
this.iL=a[Pc];
break;
default:b=true
}if(b)this.s6(Ad(),a[x])
};
var HN="activity";
FN[_P].s6=function (a,b) {
this.yB=a;
this.w_=b;
if(a>this.FL) {
this.dispatchEvent(HN);
this.FL=a+3000
}
};
FN[_P].Jz=function (a) {
var b=a||Ad();
return b-this.yB
};
var IN=function (a,b) {
J.call(this);
var c=b||this.OU();
this.tZ=a;
this.ij=c;
this.yR=xd(this.x0,this);
this.OB()
};
A(IN,J);
IN[_P].IA=false;
IN[_P].pq=null;
IN[_P].OK=false;
var JN=null,KN=new Ej;
IN[_P].OU=function () {
KN.add(this);
if(JN==null)JN=new FN;
return JN
};
IN[_P].R_=function () {
KN.remove(this);
if(JN!=null&&KN.Qa()) {
JN.j();
JN=null
}
};
IN[_P].OB=function () {
var a=this.tZ+1-(Ad()-this.ij.yB);
if(a>0)this.pq=at(this.yR,a);
else this.tR()
};
IN[_P].x0=function () {
this.pq=null;
this.OB()
};
IN[_P].tR=function () {
this.OK=
true;
zi(this.ij,HN,this.TL,false,this);
this.IA=true;
this.dispatchEvent(vv)
};
IN[_P].TL=function () {
this.sR()
};
IN[_P].sR=function () {
this.OK=false;
this.VM();
this.dispatchEvent(Pn);
this.OB()
};
IN[_P].VM=function () {
if(this.IA) {
Ci(this.ij,HN,this.TL,false,this);
this.IA=false
}
};
IN[_P].e=function () {
this.VM();
if(this.pq!=null) {
Uc.clearTimeout(this.pq);
this.pq=null
}this.R_();
IN.b.e.call(this)
};
var LN=function (a,b,c,d,e,f,g,h,j,k,m,p,q) {
B.call(this);
this.C=a;
this.V=b;
this.ea=c;
this.di=d;
this.Le=e;
this.Gc=f;
this.na=g;
this.n=h;
this.ij=j;
this.Hp=k;
this.tk=m;
this.jz=p;
this.Pa=q;
f.jD(b);
f.Pq(a);
g.Pq(a);
g.jD(b);
g.p4(f);
g.h4(c)
};
A(LN,B);
LN[_P].O=null;
LN[_P].Xm=function (a) {
this.O=a;
this.na.Xm(a)
};
LN[_P].e=function () {
LN.b.e.call(this);
this.C.j();
this.C=null;
this.V.j();
this.V=null;
this.ea.j();
this.ea=null;
this.di.j();
this.di=null;
this.Le.j();
this.Le=null;
this.Gc.j();
this.Gc=null;
this.n=null;
this.Hp.j();
this.Hp=null;
this.ij.j();
this.ij=null;
if(this.O) {
this.O.j();
this.O=null
}this.tk.j();
this.tk=null;
this.jz.j();
this.jz=null;
this.Pa.j();
this.j8=null
};
var MN=function (a) {
P.call(this,a)
};
A(MN,P);
MN[_P].m=null;
MN[_P].Pf=null;
MN[_P].XQ=true;
MN[_P].mx=10;
MN[_P].ba=function () {
return this.m||(this.m=new $i(this))
};
MN[_P].za=function () {
return this.Pf||(this.Pf=new $i(this))
};
MN[_P].Ul=function () {
return this.XQ?this.J():null
};
MN[_P].$=function () {
MN.b.$.call(this);
if(this.m)this.m.vc()
};
MN[_P].df=function (a,b,c) {
var d=this.l(),e=0,f=c||this.mx,g=b||this.c();
while(a&&(!a.id||!Bf(a.id,d))) {
if(a==g||e>f)return null;
a=a[Dc];
e++
}return a
};
MN[_P].e=function () {
MN.b.e.call(this);
if(this.m) {
this.m.j();
this.m=null
}if(this.Pf) {
this.Pf.j();
this.Pf=null
}
};
var NN=function (a,b) {
MN.call(this,b);
this.da=a
};
A(NN,MN);
NN[_P].gb=false;
$a(NN[_P],function (a) {
if(this.gb!=a) {
this.gb=a;
if(this.z) {
	this.ie();
	Ya(this.c()[u],a?C:Gx)
}
}
});
Qa(NN[_P],function () {
return this.da
});
NN[_P].Na=function () {
return false
};
NN[_P].ie=function () {
};
NN[_P].Fa=function () {
};
NN[_P].hE=function () {
};
NN[_P].NE=function () {
return false
};
NN[_P].Pl=function () {
return new Ej
};
NN[_P].Pj=function () {
return new D
};
NN[_P].e=function () {
NN.b.e.call(this);
this.da=null
};
var ON=function () {
J.call(this)
};
A(ON,J);
ON[_P].nx=null;
var PN="requestview",QN="viewchange";
ON[_P].vH=function (a) {
this.dispatchEvent(new RN(QN,a))
};
ON[_P].Dc=function (a) {
this.dispatchEvent(new RN(PN,a))
};
ON[_P].r2=function (a) {
var b=this.nx;
if(!b||b.wa[aI]==a)return ;
var c=b.Ca(),d=c.wa;
d[aI]=a;
d[ZH]=true;
c.an(d);
this.dispatchEvent(new RN(PN,c))
};
ON[_P].X2=function (a) {
this.nx=a
};
ON[_P].e=function () {
ON.b.e.call(this);
this.nx=null
};
var RN=function (a,b,c) {
H.call(this,a,c);
this.Bg=b
};
A(RN,H);
RN[_P].e=function () {
RN.b.call.j(this);
this.Bg=null
};
var SN=function (a,b,c) {
J.call(this);
this.fi=a;
this.h=c;
this.m=new $i(this);
if(b.Ka)this.start();
else this.m.d(b,av,this.iu)
};
A(SN,J);
SN[_P].U=null;
SN[_P].iu=function () {
this.start()
};
var TN="border: 0px; width: 1px; height:1px;";
SN[_P].start=function () {
if(!this.U) {
var a=this.h,b=pw(a),c=Kp(),d=c.D(),e=this.fi;
for(var f=0;f<d;f++) {
	var g=c.yb(f),h=g.KU();
	if(!Hf(h)) {
		var j=new G(h);
		j.ed(to,e);
		b.appendChild(a,b.f(RC,{
			src:j.toString (),style:TN
		}))
	}
}this.U=at(this.NY,10000,this)
}
};
SN[_P].NY=function () {
this.stop();
this.dispatchEvent(Jr)
};
pa(SN[_P],function () {
if(this.U) {
bt(this.U);
this.U=null;
var a=this.h,b=pw(a);
b.Hi(a)
}
});
SN[_P].e=function () {
SN.b.e.call(this);
this.stop();
this.h=null;
this.m.j();
this.m=null
};
var UN=function (a) {
Bh.call(this);
this.H1=a
};
A(UN,Bh);
var VN="survey",WN=new G(VN);
UN[_P].Lc=function () {
return WN
};
UN[_P].K=function () {
return 6
};
var XN="promoCode";
UN[_P].oc=function () {
var a=new D;
a.k(XN,this.H1);
return a
};
var YN=function (a) {
return new UN(a.promoCode)
};
Xh(6,YN);
var ZN=function (a) {
B.call(this);
this.Xe=a;
this.m=new $i(this);
this.CC=[];
this.KM=[]
};
A(ZN,B);
ZN[_P].I_=function (a,b) {
this.CC[b]=a;
this.m.d(a,fi,xd(this.jY,this,b))
};
ZN[_P].jY=function (a) {
var b=this.KM;
if(!b[a]) {
b[a]=true;
this.m.M(this.CC[a],fi);
this.Xe.Pe(new UN(a))
}
};
ZN[_P].e=function () {
ZN.b.e.call(this);
this.CC=null;
this.KM=null;
this.m.j();
this.m=null
};
var $N=function (a,b,c,d,e,f) {
R.call(this,d,e,f);
this.We=c;
this.Uc(a);
this.ma(b+dL);
this.xx=new $i(this);
this.xx.d(this,aD,this.hX);
var g=z(dD),h=new VC(f);
h.k(jD,g,true);
this.lb(h)
};
A($N,R);
$N[_P].Yj=false;
$N[_P].s=function (a) {
R[_P].s.call(this,a);
if(a)this.Yj=false
};
$N[_P].hX=function (a) {
if(!this.Yj) {
this.Yj=true;
if(a.jb==jD&&this.We)at(this.We,1)
}
};
$N[_P].e=function () {
$N.b.e.call(this);
this.xx.j();
this.xx=null;
this.We=null
};
var aO="autocomplete-text",bO="autocomplete-icon",cO=cB;
var dO="autocomplete-default",eO='">&nbsp;</span><span class="',fO='"><div>',gO="</div></span>",hO=function (a,b) {
var c=b||new Q;
c.g(KB,cO,CB,dO,eO,cO,CB,aO,fO,oB(a[Nb]),gO);
if(!b)return c.toString ()
},iO="autocomplete-star-on",jO="autocomplete-star-off",kO='" style="background-image: url(',lO=function (a,b) {
var c=b||new Q;
c.g(KB,cO,CB,a.R.getAttribute(Tn).p()?iO:jO,eO,cO,CB,bO,kO,a.sf,FB,cO,CB,aO,fO,oB(a.R.q()),gO);
if(!b)return c.toString ()
},mO=function (a,b) {
var c=b||new Q;
c.g(KB,cO,CB,bO,eO,cO,CB,
bO,eO,cO,CB,aO,fO,oB(a[Nb]),gO);
if(!b)return c.toString ()
},nO="Searching for matches...",oO="Searching for more matches...",pO=function (a,b) {
var c=b||new Q;
c.g(KB,aO,K);
if(a.q0<=a.o0) {
var d=z(nO);
c.g(d)
}else {
var e=z(oO);
c.g(e)
}c.g(TB);
if(!b)return c.toString ()
},qO="No matches found.",rO=function (a,b) {
var c=z(qO),d=b||new Q;
d.g(KB,aO,K,c,TB);
if(!b)return d.toString ()
},sO="autocomplete-separator",tO='<img style="width: 1; height: 1" />',uO=function (a,b) {
var c=b||new Q;
c.g(sB,sO,K,F?tO:C,uB);
if(!b)return c.toString ()
};
var vO=function () {
return new Date
},wO=function (a) {
var b=new Date(a.getTime());
b.setDate(b.getDate()-1);
return b
},xO=function (a) {
var b=a.getDay(),c=new Date(a.getTime());
c.setUTCDate(c.getDate()-b);
return c
},zO=function (a,b) {
return a.getDate()==b.getDate()&&yO(a,b)
},yO=function (a,b) {
return a.getMonth()==b.getMonth()&&AO(a,b)
},AO=function (a,b) {
return a.getFullYear()==b.getFullYear()
};
var BO="hilite",CO="dismiss",EO=function (a,b,c) {
J.call(this);
this.cv=a;
this.Gk=c;
this.r=b;
zi(b,[BO,aA,DO,CO],this);
this.Nb=null;
this.Ya=[];
this.fe=-1;
this.ef=0;
this.Mb=null;
this.af=null
};
A(EO,J);
EO[_P].O_=10;
EO[_P].nR=true;
EO[_P].YQ=false;
var DO="canceldismiss";
EO[_P].ce=function (a) {
if(a[v]==this.r)switch(a[x]) {
case BO:this.rf(a.Lm);
break;
case aA:this.sg();
break;
case DO:this.Qn();
break;
case CO:this.$s();
break
}
};
EO[_P].Qi=function (a,b) {
if(this.Nb==a)return ;
this.Nb=a;
this.cv.p2(this.Nb,this.O_,xd(this.M_,
this),b);
this.Qn()
};
EO[_P].SO=function (a) {
this.Mb=a
};
EO[_P].isOpen=function () {
return this.r.La()
};
EO[_P].UA=function () {
if(this.fe>=this.ef&&this.fe<this.ef+this.Ya[o]-1) {
this.rf(this.fe+1);
return true
}else if(this.fe==-1) {
this.rf(this.ef);
return true
}return false
};
EO[_P].VA=function () {
if(this.fe>this.ef) {
this.rf(this.fe-1);
return true
}else if(this.YQ&&this.fe==this.ef)this.rf(-1);
return false
};
EO[_P].rf=function (a) {
this.fe=a;
this.r.rf(a);
return this.$o(a)!=-1
};
var FO="update";
EO[_P].sg=function () {
var a=
this.$o(this.fe);
if(a!=-1) {
var b=this.Ya[a];
this.Gk.bD(b);
this.$e();
this.dispatchEvent({
	type:FO,Lm:b
});
return true
}else {
this.$e();
this.dispatchEvent({
	type:FO,Lm:null
});
return false
}
};
EO[_P].$e=function () {
this.fe=-1;
this.Nb=null;
this.ef+=this.Ya[o];
sa(this.Ya,0);
ga.clearTimeout(this.af);
this.af=null;
this.r.$e()
};
EO[_P].$s=function () {
if(!this.af)this.af=ga.setTimeout(xd(this.$e,this),100)
};
EO[_P].Qn=function () {
ga.setTimeout(xd(function () {
if(this.af) {
	ga.clearTimeout(this.af);
	this.af=null
}
},this),10)
};
EO[_P].e=function () {
EO.b.e.call(this);
this.r.j();
this.Gk.j();
this.cv=null
};
EO[_P].M_=function (a,b,c) {
if(this.Nb!=a)return ;
var d=c?this.$o(this.fe):null;
this.ef+=this.Ya[o];
this.Ya=b;
var e=[];
for(var f=0;f<b[o];++f)e.push({
id:this.Iz(f),data:b[f]
});
this.r.j2(e,this.Nb,this.Mb);
if(this.nR&&e[o]!=0) {
var g=d!=null?this.Iz(d):this.ef;
this.rf(g)
}else this.fe=-1
};
EO[_P].$o=function (a) {
var b=a-this.ef;
if(b<0||b>=this.Ya[o])return -1;
return b
};
EO[_P].Iz=function (a) {
return this.ef+a
};
;
var GO=function (a) {
J.call(this);
if(a)this.jj(a)
};
A(GO,J);
GO[_P].h=null;
GO[_P].Uu=null;
GO[_P].vB=null;
GO[_P].Vu=null;
GO[_P].Wu=-1;
GO[_P].Sp=-1;
GO[_P].lL=0;
var HO={
"3":13,"12":144,"63232":38,"63233":40,"63234":37,"63235":39,"63236":112,"63237":113,"63238":114,"63239":115,"63240":116,"63241":117,"63242":118,"63243":119,"63244":120,"63245":121,"63246":122,"63247":123,"63248":44,"63272":46,"63273":36,"63275":35,"63276":33,"63277":34,"63289":144,"63302":45
},IO={
Up:38,Down:40,Left:37,Right:39,Enter:13,F1:112,
F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,"U+007F":46,Home:36,End:35,PageUp:33,PageDown:34,Insert:45
},JO={
61:187
},KO=F||sg&&Lg(gz);
GO[_P].EX=function (a) {
if(KO&&!hz(a[fc]))this.ce(a);
else this.Sp=qg&&a[fc] in JO?JO[a[fc]]:a[fc]
};
GO[_P].GX=function () {
this.Wu=-1
};
GO[_P].ce=function (a) {
var b=a.Wc,c,d;
if(F&&a[x]==di) {
c=this.Sp;
d=c!=13&&c!=27?b[fc]:0
}else if(sg&&a[x]==di) {
c=this.Sp;
d=b[cc]>=0&&b[cc]<63232&&iz(c)?b[cc]:0
}else if(pg) {
c=this.Sp;
d=iz(c)?b[fc]:0
}else {
c=b[fc]||
this.Sp;
d=b[cc]||0;
if(wg&&d==63&&!c)c=191
}var e=c,f=b.keyIdentifier;
if(c) {
if(c>=63232&&c in HO)e=HO[c];
else if(c==25&&a[wc])e=9
}else if(f&&f in IO)e=IO[f];
var g=e==this.Wu;
this.Wu=e;
if(sg) {
if(g&&b.timeStamp-this.lL<50)return ;
this.lL=b.timeStamp
}var h=new LO(e,d,g,b);
try{
this.dispatchEvent(h)
}finally{
h.j()
}
};
GO[_P].jj=function (a) {
if(this.Vu)this.detach();
this.h=a;
this.Uu=zi(this.h,di,this);
this.vB=zi(this.h,Qi,this.EX,false,this);
this.Vu=zi(this.h,Ri,this.GX,false,this)
};
GO[_P].detach=function () {
if(this.Uu) {
Ei(this.Uu);
Ei(this.vB);
Ei(this.Vu);
this.Uu=null;
this.vB=null;
this.Vu=null
}this.h=null;
this.Wu=-1
};
GO[_P].e=function () {
GO.b.e.call(this);
this.detach()
};
var MO="key",LO=function (a,b,c,d) {
$h.call(this,d);
Ra(this,MO);
Na(this,a);
this.charCode=b;
this.V7=c
};
A(LO,$h);
var NO=",;",OO="[\\s",PO="]+",QO="[\\s]+",RO="^",SO="|",TO="\\s*[",UO="]$",VO=function (a,b,c,d) {
B.call(this);
this.Qe=jd(a)?a:NO;
this.aq=b||C;
this.jg=c!=null?c:true;
this.x1=this.jg;
this.U=new Ys(d||150);
this.jH=this.Qe.substring(0,1);
var e=this.jg?OO+this.Qe+PO:QO;
this.Ww=new RegExp(RO+e+SO+e+bl,mg);
this.O2=new RegExp(TO+this.Qe+UO);
this.md=new $i(this);
this.Fn=new $i(this);
this.sb=new GO
};
A(VO,B);
VO[_P].A6=true;
VO[_P].sU=true;
VO[_P].gQ=false;
VO[_P].P2=true;
VO[_P].Ob=null;
VO[_P].EB=C;
VO[_P].bl=false;
VO[_P].UC=false;
VO[_P].Xr=function (a) {
this.N=a
};
var WO="haspopup";
VO[_P].Ex=function (a) {
zC(a,aA);
CC(a,WO,true);
this.md.d(a,Ti,this.wm);
this.md.d(a,Si,this.gC);
if(!this.Ob)this.Fn.d(a,Qi,this.aM)
};
VO[_P].jT=function (a) {
if(a==this.Ob)this.gC();
this.md.M(a,Ti,this.wm);
this.md.M(a,Si,this.gC);
if(!this.Ob)this.Fn.M(a,Qi,this.aM)
};
VO[_P].DF=function () {
for(var a=0;a<arguments[o];a++)this.Ex(arguments[a])
};VO[_P].qH=function () {
for(var a=0;a<arguments[o];a++)this.jT(arguments[a])
};VO[_P].bD=function (a,b) {
var c=
this.N.Mb;
if(Xc(b)?b:this.jg) {
var d=YK(c),e=this.np(c[s],d),f=this.ln(c[s]),g=a.toString ();
if(!this.O2.test(g))g=Lf(g)+this.jH;
if(this.A6) {
	if(e!=0&&!Gf(f[e-1]))g=E+g;
	if(e<f[o]&&!Gf(f[e+1]))g=g+E
}if(g!=f[e]) {
	f[e]=g;
	Aa(c,f.join(C));
	var h=0;
	for(var j=0;j<=e;j++)h+=f[j][o];c.focus();WK(c,h);cL(c,h)
}
}else Aa(c,a.toString ());this.UC=true
};VO[_P].e=function () {
VO.b.e.call(this);
this.md.j();
this.md=null;
this.Fn.j();
this.Fn=null
};
VO[_P].rc=function (a) {
switch(a[fc]) {
case 40:if(this.N.isOpen()) {
	this.WB();
	a.preventDefault();
	return true
}else if(!this.jg) {
	this.Re(true);
	a.preventDefault();
	return true
}break;
case 38:if(this.N.isOpen()) {
	this.XB();
	a.preventDefault();
	return true
}break;
case 9:this.Re();
if(this.N.sg()&&this.x1) {
	a.preventDefault();
	return true
}break;
case 13:this.Re();
if(this.N.sg()) {
	a.preventDefault();
	return true
}break;
case 27:if(this.N.isOpen()) {
	this.N.$e();
	return true
}break;
case 229:if(!this.bl) {
	this.md.d(this.Ob,Ri,this.iC);
	this.bl=true;
	return true
}break
}if(this.P2&&this.jg&&a[cc]&&this.Qe.indexOf(fa.fromCharCode(a[cc]))!=
-1) {
this.Re();
if(this.N.sg()) {
	a.preventDefault();
	return true
}
}return false
};
VO[_P].MQ=function () {
this.sb.jj(this.Ob);
this.md.d(this.sb,MO,this.bM);
if(F)this.md.d(this.Ob,di,this.ZL)
};
VO[_P].a2=function () {
this.md.M(this.sb,MO,this.bM);
this.sb.detach();
if(F)this.md.M(this.Ob,di,this.ZL);
if(this.bl)this.md.M(this.Ob,Ri,this.iC)
};
VO[_P].wm=function (a) {
this.Fn.vc();
if(this.N)this.N.Qn();
if(a[v]!=this.Ob) {
this.Ob=a[v];
this.U.start();
this.md.d(this.U,$s,this.hM);
this.EB=this.Ob[s];
this.MQ()
}
};
VO[_P].gC=
function () {
if(this.Ob) {
this.a2();
this.Ob=null;
this.bl=false;
this.U.stop();
this.md.M(this.U,$s,this.hM);
if(this.N)this.N.$s()
}
};
VO[_P].hM=function () {
if(!this.bl)this.Re()
};
VO[_P].aM=function (a) {
this.wm(a)
};
VO[_P].bM=function (a) {
if(this.N&&!this.bl)this.rc(a)
};
VO[_P].iC=function (a) {
if(a[fc]==13) {
this.bl=false;
this.md.M(this.Ob,Ri,this.iC)
}
};
VO[_P].ZL=function (a) {
if(this.jg&&this.Qe.indexOf(fa.fromCharCode(a[cc]))!=-1) {
this.Re();
if(this.N.sg())a.preventDefault()
}
};
VO[_P].Re=function (a) {
if(a||this.Ob&&
this.Ob[s]!=this.EB) {
if(!this.UC) {
	var b=this.rC();
	if(this.N) {
		this.N.SO(this.Ob);
		this.N.Qi(b,this.Ob[s])
	}
}this.EB=this.Ob[s]
}this.UC=false
};
VO[_P].XB=function () {
return this.gQ?this.N.UA():this.N.VA()
};
VO[_P].WB=function () {
return this.gQ?this.N.VA():this.N.UA()
};
VO[_P].rC=function () {
var a=YK(this.Ob),b=this.Ob[s];
return this.HE(this.ln(b)[this.np(b,a)])
};
VO[_P].HE=function (a) {
return this.Ww?fa(a).replace(this.Ww,C):a
};
VO[_P].np=function (a,b) {
var c=this.ln(a);
if(b==a[o])return c[o]-1;
var d=0;
for(var e=
0,f=0;e<c[o]&&f<b;e++) {
f+=c[e][o];
d=e
}return d
};
VO[_P].ln=function (a) {
if(!this.jg)return [a];
var b=fa(a).split(C),c=[],d=[];
for(var e=0,f=false;e<b[o];e++)if(this.aq&&this.aq.indexOf(b[e])!=-1) {
if(this.sU&&!f) {
	c.push(d.join(C));
	sa(d,0)
}d.push(b[e]);
f=!f
}else if(!f&&this.Qe.indexOf(b[e])!=-1) {
d.push(b[e]);
c.push(d.join(C));
sa(d,0)
}else d.push(b[e]);
c.push(d.join(C));
return c
};
var XO="ac-renderer",YO="ac-row",ZO=function (a,b,c,d) {
this.X=a||qw()[Ub];
this.i=pw(this.X);
this.l2=!a;
this.h=null;
this.Nb=C;
this.Ya=[];
this.uu=-1;
this.lP=-1;
this.ya=false;
va(this,XO);
this.TC=YO;
this.iF=Pn;
this.tl=b;
this.v6=d!=null?d:true;
this.v2=c!=null?c:false;
this.uB=null;
this.Uw=false
};
A(ZO,J);
var $O=0;
ZO[_P].Jn=null;
ZO[_P].j2=function (a,b,c) {
this.Nb=b;
this.Ya=a;
this.uu=0;
this.lP=Ad();
this.Mb=c;
this.Eq=[];
this.fc()
};
ZO[_P].$e=function () {
if(this.ya) {
this.ya=false;
M(this.h,false)
}
};
ZO[_P].U4=function () {
if(!this.ya) {
this.ya=
true;
M(this.h,true)
}
};
ZO[_P].La=function () {
return this.ya
};
ZO[_P].tK=function (a) {
this.rZ();
this.uu=a;
if(a>=0&&a<this.h[vc][o]) {
var b=this.Eq[a];
N(b,this.iF);
CC(this.h,wC,b.id);
Ww(this.Jn,cx(b))
}
};
ZO[_P].rZ=function () {
if(this.uu>=0)cz(this.Eq[this.uu],this.iF)
};
ZO[_P].rf=function (a) {
if(a==-1)this.tK(-1);
else for(var b=0;b<this.Ya[o];b++)if(this.Ya[b].id==a) {
this.tK(b);
return
}
};
ZO[_P].O3=function (a) {
N(a,this[nb])
};
var aP="display:none",bP="region",cP="live",dP="rude",eP="menu",fP="goog-acr-",gP="controls";
ZO[_P].Q_=function () {
if(!this.h) {
this.Jn=this.i.f(L,{
	style:aP
});
zC(this.Jn,bP);
CC(this.Jn,cP,dP);
this.i.appendChild(this.X,this.Jn);
this.h=this.i.f(L,{
	style:aP
});
this.O3(this.h);
zC(this.h,eP);
var a=this.h.id=fP+$O++;
CC(this.Mb,gP,a);
this.i.appendChild(this.X,this.h);
zi(this.h,fi,this.gu,false,this);
zi(this.h,Ni,this.RJ,false,this);
zi(this.i.W,fi,this.LJ,false,this);
zi(this.h,bi,this.nu,false,this)
}
};
var hP="LEFT",iP="RIGHT",jP="visible";
ZO[_P].fc=function () {
this.Q_();
if(this.Uw)db(this.h[u],Nn);
sa(this.Eq,
0);
this.i.Hi(this.h);
if(this.tl&&this.tl.ub)this.tl.ub(this,this.h,this.Ya,this.Nb);
else {
var a=null;
hf(this.Ya,function (f) {
	f=this.i2(f,this.Nb);
	if(this.Uw)this.h.insertBefore(f,a);
	else this.i.appendChild(this.h,f);
	a=f
},this)
}if(this.Ya[o]==0) {
this.$e();
return
}else this.U4();
this.zC(this.h);
if(this.Mb&&this.l2) {
var b=Ax(this.Mb),c=Hx(this.Mb),d=Hx(ux(this.Mb)),e=Hx(this.h);
b.y=this.Uw?b.y-e[y]:b.y+c[y];
if((this.v2||b.x+e[r]>d[r])&&this.uB!=hP) {
	b.x=b.x+c[r]-e[r];
	this.uB=iP
}else this.uB=hP;
Dx(this.h,
b);
if(this.Uw)db(this.h[u],jP)
}Ux(this.h,true)
};
ZO[_P].e=function () {
ZO.b.e.call(this);
if(this.h) {
Ci(this.h,fi,this.gu,false,this);
Ci(this.h,Ni,this.RJ,false,this);
Ci(this.i.W,fi,this.LJ,false,this);
Ci(this.h,bi,this.nu,false,this);
this.i.removeNode(this.h);
this.h=null;
this.ya=false
}this.X=null
};
ZO[_P].zC=function (a) {
if(qg&&wg) {
wa(a[u],C);
Xa(a[u],jP);
wa(a[u],a[Ab]);
Xa(a[u],ay)
}
};
ZO[_P].h2=function (a,b,c) {
n(c,eg(a[wb].toString ()))
};
var kP="(.*?)(^|\\W+)(",lP="b";
ZO[_P].TA=function (a,b) {
if(a[ub]==3) {
var c,
d=null;
if(kd(b)) {
	c=b[o]>0?b[0]:C;
	if(b[o]>1)d=We(b,1)
}else c=b;
if(c[o]==0)return ;
var e=a[Nc];
c=jg(c);
var f=new RegExp(kP+c+Pd,Dd),g=[],h=0,j=f.exec(e);
while(j) {
	g.push(j[1]);
	g.push(j[2]);
	g.push(j[3]);
	h=f.lastIndex;
	j=f.exec(e)
}g.push(e.substring(h));
if(g[o]>1) {
	a.nodeValue=g[0]+g[1];
	var k=this.i.createElement(lP);
	this.i.appendChild(k,this.i.createTextNode(g[2]));
	k=a[Dc].insertBefore(k,a[Hc]);
	for(var m=g[o]-1;m>=3;m--)a[Dc].insertBefore(this.i.createTextNode(g[m]),k[Hc])
}else if(d)this.TA(a,d)
}else {
var p=
a[gc];
while(p) {
	var q=p[Hc];
	this.TA(p,b);
	p=q
}
}
};
var mP="goog-acri-",nP="menuitem";
ZO[_P].i2=function (a,b) {
var c=this.i.f(L,{
className:this.TC
});
if(this.tl&&this.tl.jN)this.tl.jN(a,b,c);
else this.h2(a,b,c);
if(b&&this.v6)this.TA(c,b);
c.id=mP+$O++;
N(c,this.TC);
zC(c,nP);
this.Eq.push(c);
return c
};
ZO[_P].mJ=function (a) {
while(a&&a!=this.h&&!O(a,this.TC))a=a[Dc];
return a?Fe(this.Eq,a):-1
};
ZO[_P].gu=function (a) {
var b=this.mJ(a[v]);
if(b>=0)this.dispatchEvent({
type:aA,Lm:this.Ya[b].id
});
a.stopPropagation()
};
ZO[_P].RJ=function (a) {
this.dispatchEvent(DO);
a.stopPropagation()
};
ZO[_P].LJ=function () {
this.dispatchEvent(CO)
};
ZO[_P].nu=function (a) {
var b=this.mJ(a[v]);
if(b>=0) {
if(Ad()-this.lP<300)return ;
this.dispatchEvent({
	type:BO,Lm:this.Ya[b].id
})
}
};
;
var rP=function (a,b,c) {
var d=new oP,e=new pP(c),f=new qP(a.C);
EO.call(this,f,e,d);
d.Xr(this);
f.Xr(this);
this.cv=f;
this.lh=d;
this.r=e;
this.da=a;
this.D2=b
};
A(rP,EO);
Qa(rP[_P],function () {
return this.da
});
rP[_P].Hz=function () {
var a=this.$o(this.fe);
return a!=-1?this.Ya[a]:null
};
rP[_P].OD=function (a) {
this.cv.OD(a)
};
rP[_P].ce=function (a) {
if(a[v]==this.r)switch(a[x]) {
case BO:this.rf(a.Lm);
break;
case aA:this.rf(a.Lm);
this.sg(Ii);
break;
case DO:this.Qn();
break;
case CO:this.$s();
break
}
};
rP[_P].search=function () {
this.D2()
};
rP[_P].sg=function (a) {
var b=this.Hz();
if(b) {
this.Gk.bD(b,a);
this.$e();
return true
}return false
};
rP[_P].$o=function (a) {
var b=a-this.ef;
if(b<0||b>=this.Ya[o])return -1;
return b
};
rP[_P].jV=function (a) {
var b=a.Ia(),c=this.Ya;
for(var d=0;d<c[o];d++) {
var e=c[d];
if(e.Ia()==b)switch(b) {
	case 0:if(e.Y==a.Y)return d;
	break;
	case 1:case 2:if(e.Y.l()==a.Y.l())return d;
	break;
	case 3:case 4:return d
}
}return -1
};
rP[_P].qZ=function (a) {
var b=this.jV(a),c=this.Iz(b);
this.rf(c)
};
rP[_P].Ex=function (a) {
this.lh.DF(a)
};
var qP=
function (a) {
this.C=a;
this.m=new $i(this);
this.m.d(a,$u,this.Rj)
};
qP[_P].$D=true;
qP[_P].OD=function (a) {
this.$D=a
};
qP[_P].Gv=null;
qP[_P].oa=null;
qP[_P].N=null;
qP[_P].Nb=null;
qP[_P].tn=new D;
qP[_P].Xr=function (a) {
this.N=a
};
var sP='(^|<| |")',tP="i",uP="Search for all items containing '{$text}'",vP="Shared: {$user}";
qP[_P].p2=function (a,b,c) {
var d=[];
if(a&&!Gf(a)) {
this.Nb=a;
var e=jg(a),f=new RegExp(sP+e,tP);
if(this.$D) {
	var g=z(uP,{
		text:a
	});
	d.push(new wP(g,0,a))
}var h=gl().be(xp).pb(),j=h.D();
for(var k=
0;k<j&&d[o]<b;k++) {
	var m=h.yb(k);
	if(m.q().match(f))d.push(new wP(m.q(),1,m))
}var p=gl().be(zp).pb(),q=p.D();
for(var k=0;k<q&&d[o]<b;k++) {
	var t=p.yb(k);
	if(t.q().match(f)||t.Va().match(f)) {
		var w=z(vP,{
			user:t.toString ()
		});
		d.push(new wP(w,2,t))
	}
}if(d[o]<b&&!this.fK(a,b,true)) {
	var $=this.Gv;
	if($)bt($);
	d.push(new wP(null,3,null));
	this.Gv=at(xd(this.o2,this,a,b),1000)
}else if(!this.$D&&d[o]==0)d.push(new wP(null,4,null))
}c(a,d)
};
qP[_P].fK=function (a,b,c) {
var d=this.tn.o(a);
if(d&&vO().getTime()-d.qr>1800000) {
this.tn.remove(a);
d=null
}return d&&(c||d.pl<b)?true:(a[o]>1?this.fK(a.substring(0,a[o]-1),b,false):false)
};
qP[_P].o2=function (a,b) {
this.oa=new Co(2,{
query:a,queryNameOnly:true,start:0,num:b,sort:3,hidden:2
});
this.C.Lf(this.oa)
};
qP[_P].Rj=function (a) {
var b=a.kb.T(),c=this.oa;
switch(a[x]) {
case $u:if(c&&b==c.T()) {
	this.tn.k(c.rd(),{
		qr:vO().getTime(),pl:a.Ec.Nd
	});
	if(this.N.isOpen()&&this.Nb==c.rd()) {
		var d=this.N.Hz();
		this.N.Qi(C);
		this.N.Qi(c.rd());
		this.oa=null;
		if(d)this.N.qZ(d)
	}
}else if(a.kb.LV&&a.kb.yq)this.tn.k(a.kb.rd(),
{
	qr:vO().getTime(),pl:a.Ec.Nd
});
break;
default:break
}
};
qP[_P].j=function () {
this.m.j();
this.E7=null;
this.C=null;
this.oa=null;
this.tn.clear();
this.tn=null;
bt(this.Gv);
this.Gv=null
};
var pP=function (a) {
ZO.call(this,null,this,a)
};
A(pP,ZO);
pP[_P].jN=function (a,b,c) {
var d=a[wb];
switch(d.Ia()) {
case 0:n(c,hO({
	message:d.Ot()
}));
break;
case 1:var e=d.Y;
n(c,lO({
	R:e,sf:Sp(e)
}));
break;
case 2:n(c,mO({
	message:d.Ot()
}));
break;
case 3:case 4:Ya(c[u],Gx);
break;
default:break
}
};
pP[_P].fc=function () {
var a=false,b=false,c=
0,d=this.Ya[o];
if(d>0&&this.Ya[d-1][wb].Ia&&this.Ya[d-1][wb].Ia()==3) {
a=true;
c++
}if(d>0&&this.Ya[0][wb].Ia)switch(this.Ya[0][wb].Ia()) {
case 0:c++;
break;
case 4:b=true;
break;
default:break
}pP.b.fc.call(this);
if(a) {
if(d>1) {
	var e=this.i.createElement(L);
	n(e,uO());
	this.h.appendChild(e)
}var f=this.i.f(L);
n(f,pO({
	q0:d,o0:c
}));
this.h.appendChild(f)
}else if(b) {
var f=this.i.f(L);
n(f,rO());
this.h.appendChild(f)
}
};
var xP="/^[\\s",yP="]+|[\\s",zP="]+$",oP=function (a,b) {
this.N=null;
this.Vd=[];
this.Qe=Xc(a)?a:Kd;
this.jH=this.Qe.substring(0,1);
this.Ww=new RegExp(xP+this.Qe+yP+this.Qe+zP,mg);
this.aq=b||C;
this.R5=50;
this.wB=null;
this.aH=null;
this.VS=0;
this.jg=false;
this.QE=true
};
A(oP,B);
oP[_P].DF=function () {
for(var a=0;a<arguments[o];a++) {
var b=arguments[a];
this.Vd.push(b);
zi(b,di,this.aL,false,this);
zi(b,Qi,this.$K,false,this);
zi(b,Ri,this.bL,false,this);
var c=[Ti,fi];
zi(b,c,this.lI,false,this);
zi(b,Si,this.MF,false,this)
}
};
oP[_P].qH=function () {
for(var a=0;a<arguments[o];a++) {
var b=arguments[a];
Ci(b,di,this.aL,
false,this);
Ci(b,Qi,this.$K,false,this);
Ci(b,Ri,this.bL,false,this);
var c=[Ti,fi];
Ci(b,c,this.lI,false,this);
Ci(b,Si,this.MF,false,this);
Te(this.Vd,b)
}
};
oP[_P].Xr=function (a) {
this.N=a
};
var AP="tab",BP="enter";
oP[_P].bD=function (a,b) {
var c=this.aH;
switch(b) {
case AP:Aa(c,a.toString ());
break;
case Ii:case BP:var d=a.Ia();
if(d==0) {
	if(b==Ii)this.N.search()
}else if(d==1) {
	this.N.getContext().V.nC(a.Y);
	Aa(c,C);
	this.N.$e()
}else if(d==2) {
	var e=a.Y,f=xJ(LJ,{
		email:e.Va(),hosted:e.Np()
	});
	this.da.Pa.Dc(f);
	Aa(c,
	C);
	this.N.$e()
}break
}
};
oP[_P].aL=function (a) {
var b=a[fc],c=this.N.Hz();
if(this.Qe.indexOf(fa.fromCharCode(a[cc]))!=-1) {
if(this.N&&this.N.sg()&&this.jg)a.preventDefault()
}else if(b==13) {
if(this.N&&this.N.sg(BP)&&c&&(c.Ia()==1||c.Ia()==2))a.preventDefault();
this.QE=false
}else if(b!=40&&b!=38&&b!=27&&b!=9)this.lC(a)
};
oP[_P].$K=function (a) {
var b=a[fc];
this.QE=true;
if(b==40) {
if(this.N&&this.N.UA())a.preventDefault()
}else if(b==38) {
if(this.N&&this.N.VA())a.preventDefault()
}else if(b==9) {
Uc.clearTimeout(this.wB);
this.Kx(a[Tb]);
if(this.N&&this.N.sg(AP))a.preventDefault()
}else if(b==27) {
if(this.N)this.N.$e()
}else if(F&&(b==8||b==46))this.lC(a)
};
oP[_P].bL=function (a) {
var b=a[fc];
if(this.QE&&b!=40&&b!=38&&b!=27&&b!=9) {
a.preventDefault();
this.lC(a)
}
};
oP[_P].lC=function (a) {
Uc.clearTimeout(this.wB);
this.wB=Uc.setTimeout(xd(this.Kx,this,a[Tb]),this.R5)
};
oP[_P].lI=function (a) {
if(this.N)this.N.Qn();
this.Kx(a[Tb])
};
oP[_P].MF=function () {
if(this.N)this.N.$s()
};
oP[_P].Kx=function (a) {
var b=YK(a),c=this.rC(a[s],b);
this.aH=
a;
this.VS=this.np(a[s],b);
if(this.N) {
this.N.SO(a);
this.N.Qi(c)
}
};
oP[_P].rC=function (a,b) {
return this.HE(this.ln(a)[this.np(a,b)])
};
oP[_P].HE=function (a) {
return fa(a).replace(this.Ww,C)
};
oP[_P].np=function (a,b) {
var c=this.ln(a),d=0;
for(var e=0,f=0;e<c[o]&&f<b;e++) {
f+=c[e][o];
d=e
}return d
};
oP[_P].ln=function (a) {
if(!this.jg)return [a];
var b=fa(a).split(C),c=[],d=[];
for(var e=0,f=false;e<b[o];e++)if(this.aq&&this.aq.indexOf(b[e])!=-1) {
if(!f) {
	c.push(d.join(C));
	sa(d,0)
}d.push(b[e]);
f=!f
}else if(!f&&this.Qe.indexOf(b[e])!=
-1) {
d.push(b[e]);
c.push(d.join(C));
sa(d,0)
}else d.push(b[e]);
c.push(d.join(C));
return c
};
oP[_P].e=function () {
VO.b.e.call(this);
this.qH.apply(this,this.Vd)
};
var wP=function (a,b,c) {
this.jq=a;
this.Cg=b;
this.Y=c
};
wP[_P].Ot=function () {
return this.jq
};
wP[_P].Ia=function () {
return this.Cg
};
ra(wP[_P],function () {
return this.Y.toString ()
});
var T=function (a,b,c,d) {
NN.call(this,a,d);
var e=this.za(),f=a.C;
e.d(f,$u,this.Rj);
var g=b?f.yc.ag(b):null;
this.$b=g;
this.ia=b;
this.bB=xd(this.BX,this);
e.d(a.ea,aA,this.BY,false,this);
this.Sf=new Ej;
this.ur=new Ej;
this.wb=new Uk;
this.zf=b?b.kk:null;
this.xh=new Ys(this.Rz());
e.d(this.xh,$s,this.kY);
if(this.jl)e.d(a.Hp,Pn,this.qA);
var h=a.O;
if(h&&this.gJ())e.d(h,tr,this.qc);
this.Xa=h?h.$a():true;
this.uf=c;
this.wc=new D;
this.Ne=new Ej
};
A(T,NN);
T[_P].dj=null;
T[_P].Jv=false;
T[_P].Ev=false;
T[_P].dB=true;
T[_P].ej=false;
T[_P].Jh=null;
T[_P].Cq=false;
T[_P].Iv=false;
T[_P].Ao=false;
T[_P].kP=0;
T[_P].Kg=0;
var CP="detroit.ui.DataView";
T[_P].w=Lk(CP);
T[_P].Ka=false;
T[_P].mt=false;
T[_P].jl=false;
T[_P].Sa=null;
T[_P].zL=false;
T[_P].fp=function () {
return this.wb.D()
};
T[_P].gJ=function () {
return false
};
T[_P].Xc=function () {
return this.Sa
};
T[_P].If=function (a) {
this.Sa=a
};
T[_P].Lk=function (a) {
this.zf=a;
this.zL=true
};
T[_P].QR=function () {
this.Ne.clear()
};
T[_P].$m=function (a,b) {
if(b)this.Ne.add(a);
else this.Ne.remove(a)
};
T[_P].oB=function (a) {
return this.Ne.contains(a)
};
T[_P].$a=function () {
return this.Xa
};
T[_P].Co=function (a) {
a=a&&this.getContext().n.O1;
if(a!=this.jl&&this.z) {
var b=this.xh;
if(a) {
	b.setInterval(this.Rz());
	b.start();
	this.za().d(this.getContext().Hp,Pn,this.qA)
}else {
	b.stop();
	this.za().M(this.getContext().Hp,Pn,this.qA)
}
}this.jl=a
};
T[_P].Fd=function (a) {
this.dB=a
};
T[_P].b4=function (a) {
this.Cq=a
};
T[_P].Rz=function () {
var a=this.getContext(),b=a.n,c=l.min(l.max((a.ij.Jz()/2),b.EC),b.Q1),d=b.SM;
return l.floor(Ws(c-
d,c+d))
};
T[_P].kY=function () {
if(!this.gb) {
this.Jv=true;
return
}this.Dv()
};
T[_P].qA=function () {
if(!this.gb) {
this.Jv=true;
return
}this.xh.setInterval(Ws(0,this.getContext().n.SM))
};
T[_P].t=function () {
T.b.t.call(this);
this.nF();
if(this.dB&&!this.mt)this.Qt(true);
else if(!this.mt&&!this.Kg)this.Kg=50;
this.mt=true;
if(this.jl)this.xh.start();
if(!this.dB&&this.Iv) {
this.zr();
this.Iv=false
}
};
T[_P].$=function () {
T.b.$.call(this);
if(this.jl)this.xh.stop()
};
T[_P].nF=function () {
var a=this.$b;
if(a) {
var b=a.pa();
gl().qF(this.bB,
b+ol)
}
};
T[_P].ZM=function () {
gl().aN(this.bB)
};
T[_P].BX=function (a,b,c) {
if(!this.ej&&!this.Ao) {
if(!this.Jh)this.Jh=at(this.Re,5,this);
var d=this.$b,e=this.Sf,f=this.ur;
for(var g=0;g<c[o];g++) {
	var h=c[g];
	e.add(h);
	var j=d.ta(h);
	if(j)if(j.BE)f.add(h);
	else if(f.contains(h))f.remove(h)
}
}
};
T[_P].ag=function () {
return this.$b
};
T[_P].qc=function (a) {
var b=a[bc]!=dN;
if(b!=this.Xa) {
this.DD(b);
this.Xa=b
}
};
T[_P].DD=function () {
if(!this.ej&&!this.Ao&&this.getContext().C.Ka) {
if(!this.Jh)this.Jh=at(this.Re,5,this);
var a=this.Sf,b=this.wb;
for(var c=0;c<b.D();c++) {
	var d=b.yb(c),e=d.getAttribute(Yn).p();
	if(!e)a.add(d.l())
}
}
};
T[_P].Dv=function (a) {
if(this.$b.SK(this.getContext().n.EC)||a) {
var b=this.Ev;
if(!b&&!this.ej) {
	this.Ev=true;
	this.Kg=0;
	this.wb=new Uk;
	this.ia.GO(true);
	this.$b.PR();
	this.Qt(true)
}if(!b)if(this.jl)this.xh.setInterval(this.Rz());
this.Jv=false
}
};
T[_P].Tc=function (a,b) {
if(a==this.ia||a&&this.ia&&a.hb(this.ia))return ;
if(this.$b)this.ZM();
this.ia=a;
var c=this.$b=this.getContext().C.yc.ag(a);
if(!this.zL)this.zf=
a?a.kk:null;
if(c)if(this.z) {
this.nF();
if(b) {
	this.Kg=50;
	this.zr()
}else this.Qt(true)
}else this.Iv=true
};
T[_P].Qt=function (a) {
var b=this.ia,c=50,d=b&&!this.ej&&!this.getContext().C.j_(b),e=this.zf,f=this.fp();
if(d||a) {
this.Kg=f+c;
if(Xc(e))this.Kg=l.min(this.Kg,e)
}if(d)this.NU(f,this.bJ())
};
T[_P].bJ=function () {
var a=this.zf,b=50,c=this.fp();
return !Xc(a)?b:l.max(l.min(a-c,b),0)
};
T[_P].NU=function (a,b) {
this.ej=true;
this.ia.setStart(a);
this.ia.BO(b);
var c=this.$b;
if(c.Dp(a+b-1))this.hI();
else this.getContext().C.Lf(this.ia)
};
T[_P].fc=function () {
this.Ka=true
};
T[_P].Re=function () {
if(!this.gb) {
this.Cq=true;
return
}this.Cq=false;
var a=this.Jh;
if(a) {
bt(a);
this.Jh=null
}if(this.ej) {
}else {
this.QM();
this.Zw()
}
};
T[_P].QM=function () {
if(this.fp()==0)this.zr();
else {
var a=this.$b,b=this.Sf.ca(),c=this.ia;
for(var d=0;d<b[o];d++) {
	var e=b[d],f=a.ta(e);
	if(!f||f.BE&&c.RF(f))this.fN(e,true);
	else if(f)this.ng(f)
}this.Sf.clear()
}this.bG()
};
T[_P].bG=function () {
var a=this.$b;
if(a.pb().D()==0)if(a.jJ&&a.Nd>0) {
}else this.tj()
};
T[_P].tj=function () {
};
T[_P].eN=function (a) {
var b=this.ur,c=b.ca();
for(var d=0;d<c[o];d++) {
var e=c[d];
this.fN(e,a)
}b.clear()
};
T[_P].fN=function (a,b) {
var c=this.$b;
if(b) {
this.og(a);
this.V1(a)
}this.ur.remove(a);
c.GC(a)
};
T[_P].og=function () {
};
T[_P].LD=function (a) {
this.Iv=a
};
$a(T[_P],function (a,b) {
T.b[Mc].call(this,a,b);
if(this.gb) {
var c=this.$b;
if(this.Jv||c&&c.bs==xl)this.Dv();
else if(this.Cq)this.zr();
else {
	this.eN(true);
	this.OL()
}
}
});
T[_P].zr=function () {
this.Ao=true;
this.Cq=false;
var a=this.Jh;
if(a) {
bt(a);
this.Jh=null
}this.eN(true);
var b=this.bg(),c=b[o];
b=b.slice(0,this.Kg);
var d=this.wb;
c=d.D();
var e=c<=b[o]&&this.Ka;
for(var f=0;f<c&&e;f++)if(b[f].l()!=d.yb(f).l()) {
e=false;
break
}if(c>0&&e&&!this.Ev) {
this.QM();
this.appendData(b.slice(d.D()))
}else this.fc();
this.bG();
this.Zw();
this.Sf.clear();
this.Fa(this.dj);
this.OL();
this.Ao=false
};
T[_P].Fa=function (a) {
this.dj=a
};
T[_P].OL=function () {
this.dispatchEvent(Uz)
};
Ma(T[_P],function () {
});
T[_P].bg=function () {
var a=this.$b.pb(),b=[],c=a.D();
for(var d=0;d<c;d++)b.push(a.yb(d));var e=
this.ia.mp();if(e)b.sort(e);return b
};T[_P].ng=function () {
};
T[_P].hI=function () {
this.zr();
this.Ev=false;
this.ej=false;
this.ia.GO(false)
};
T[_P].Rj=function (a) {
var b=a.kb.T(),c=this.ia;
if(c&&b==c.T())switch(a[x]) {
case $u:var d=this.bJ(),e=this.$b,f=a.Ec,g=!f||f.De||!f.qe;
if(e.Dp(d-1)||g)this.hI();
else this.getContext().C.Lf(this.ia);
break;
default:break
}
};
T[_P].Zw=function () {
};
T[_P].BY=function (a) {
if(this.ia.K()==3) {
var b=this.$b.pb(),c=a.vZ,d=c[o];
for(var e=0;e<d;e++) {
	var f=b.o(c[e]);
	if(f)this.cQ(f)
}
}
};
T[_P].cQ=function () {
};
T[_P].Pl=function () {
var a=this.wb,b=new Ej,c=a.D();
for(var d=0;d<c;d++)b.add(a.yb(d).l());return b
};T[_P].r3=function (a) {
this.wb=a
};
T[_P].V1=function (a) {
this.wb.removeNode(a)
};
T[_P].e=function () {
T.b.e.call(this);
this.ZM();
this.Sf.clear();
this.Sf=null;
this.ur.clear();
this.ur=null;
this.wb=null;
this.Sa=null;
this.dj=null;
bt(this.Jh);
if(this.xh) {
this.xh.j();
this.xh=null
}this.$b=null;
this.ia=null;
this.bB=null;
bh(this.wc.ca(),function (a) {
a.j()
});
this.wc.clear();
this.wc=null;
this.Ne.clear();
this.Ne=null
};
var DP="All types",EP='<select><option value="',FP="</option>",GP='<option value="',HP="</select>",IP=function (a,b) {
var c=z(DP),d=b||new Q;
d.g(EP,a.WQ,K,c,FP);
var e=a.mimeTypes,f=e[o];
for(var g=0;g<f;g++) {
var h=e[g];
d.g(GP,h.Ia(),PF,a.xT[h.l()],K,h.q(),FP)
}d.g(HP);
if(!b)return nB(d.toString ())
};
var OP=function (a) {
B.call(this);
var b={
},c={
};
a=a||{
};
for(var d in a) {
var e=a[d];
if(e&&e!=JP(d)) {
	b[d]=e;
	c[d]=KP(d,e)
}
}if(b[LP]) {
if(!b[MP]) {
	var d=MP,f=JP(d);
	b[d]=f;
	c[d]=KP(d,f)
}if(!b[NP]) {
	var d=NP,f=JP(d);
	b[d]=f;
	c[d]=KP(d,f)
}
}this.ax=b;
this.xH=c
};
A(OP,B);
var PP=z(eK),QP=z(kK),RP="within",SP=WH,TP="sharingType",UP="sharedWith",VP="folderSearchType",MP="dateRestrictType",NP=RP,LP="withinDate",WP="allitems",XP="ownedbyme",YP="sharedbyme",ZP="sharedwithme",$P="sharedwithdomain",aQ=Mn,bQ="datemodified",
cQ="dateopenedbyme",dQ="datecreated",eQ=bQ,fQ=cQ,gQ=dQ,hQ="oneday",iQ="threedays",jQ="oneweek",kQ="twoweeks",lQ="onemonth",mQ="twomonths",nQ="sixmonths",oQ="oneyear",pQ="all-types",qQ="all_items",rQ="items_not_in_folders";
OP[_P].oa=null;
OP[_P].ca=function () {
return vf(this.ax)
};
OP[_P].zz=function () {
return vf(this.xH)
};
var sQ="any";
OP[_P].ua=function () {
if(this.oa)return this.oa;
var a=this.ax,b={
},c=2;
b.query=a.has;
b.named=a.named;
var d=a.type;
if(d&&d!=pQ)b.mimeTypes=[d];
var e=a[SP];
if(e&&e!=WP)switch(e) {
case Ln:b.star=
0;
break;
case Nn:b.hidden=0;
break;
case XP:b.mine=0;
break;
case dq:c=1;
break
}var f=a[TP];
if(f&&f!=sQ)switch(f) {
case vo:b[vo]=0;
break;
case aQ:b.published=0;
break;
case YP:b.mine=0;
b[vo]=1;
break;
case $P:b.sharedWithDomain=0;
break;
case ZP:b.mine=1;
b[vo]=1;
break
}var g=a[UP],h=a.owner,j=[];
if(g) {
var k={
};
k.emails=g;
k.shareTypes=[20,30,40];
j.push(k)
}if(h) {
var k={
};
k.emails=h;
k.shareTypes=[40];
j.push(k)
}if(j[o]>0)b.shareFilters=j;
var m=a[VP];
switch(m) {
case rQ:b.orphans=0;
break;
case qQ:break;
default:b.parent=
m;
break
}var p=a[LP];
if(p) {
var q={
};
q.date=p;
var t=a[MP]||JP(MP),w=a[NP]||JP(NP);
q.restrictType=this.oW(t);
q.rangeUnit=this.pW(w);
q.rangeValue=this.MV(w);
b.dateFilter=q
}this.oa=new Co(c,b);
return this.oa
};
OP[_P].oW=function (a) {
switch(a) {
case eQ:return bQ;
case fQ:return cQ;
case gQ:return dQ
}
};
var tQ="day",uQ="week",vQ="month",wQ="year";
OP[_P].pW=function (a) {
switch(a) {
case hQ:case iQ:return tQ;
case jQ:case kQ:return uQ;
case lQ:case mQ:case nQ:return vQ;
case oQ:return wQ
}
};
OP[_P].MV=function (a) {
switch(a) {
case hQ:case oQ:case jQ:case lQ:return 1;
case kQ:case mQ:return 2;
case iQ:return 3;
case nQ:return 6
}
};
var xQ=function (a) {
switch(a) {
case bQ:return eQ;
case cQ:return fQ;
case dQ:return gQ
}
},yQ=function (a,b) {
switch(a) {
case tQ:switch(b) {
	case 1:return hQ;
	case 3:return iQ
}break;
case uQ:switch(b) {
	case 1:return jQ;
	case 2:return kQ
}break;
case vQ:switch(b) {
	case 1:return lQ;
	case 2:return mQ;
	case 6:return nQ
}break;
case wQ:switch(b) {
	case 1:return oQ
}break
}
},BQ=function (a) {
var b={
};
b.has=a.rd();
b.named=a.hk;
var c=a.kf();
if(c&&c[o]>0) {
var d=Mp(c[0]);
if(d)b.type=
d.Ia()
}var e=zQ(a);
if(e)b[SP]=e;
var f=AQ(a);
if(f)b[TP]=f;
var g=a.Rk;
if(g) {
var h=null,j=null;
for(var k=0;k<g[o];k++) {
	var m=g[k],p=m.shareTypes,q=m.emails;
	if(!q||Hf(q))break;
	if(p[o]===1&&p[0]==40)if(j)j.g(Yj,q);
	else {
		j=new Vq;
		j.g(q)
	}else if(h)h.g(Yj,q);
	else {
		h=new Vq;
		h.g(q)
	}
}if(h)b[UP]=h.toString ();
if(j)b.owner=j.toString ()
}b[VP]=a.J()?a.J():(a.lg==0?rQ:qQ);
var t=a.Zh;
if(t) {
b[MP]=xQ(t.restrictType);
b[NP]=yQ(t.rangeUnit,t.rangeValue);
b[LP]=t.date
}var w=new OP(b);
w.oa=a;
return w
},CQ="has",DQ="owner",KP=
function (a,b) {
switch(a) {
case CQ:case uo:case DQ:case UP:case LP:return b;
case tc:if(b==pQ) {
	var c=z(DP);
	return c
}else {
	var d=Mp(b);
	return d.q()
}break;
case SP:return EQ(b);
case TP:return FQ(b);
case MP:return GQ(b);
case NP:return HQ(b);
case VP:return IQ(b)
}
},zQ=function (a) {
if(a.Tk==0)return Ln;
if(a.Ke==0)return Nn;
if(a.sd()==1)return dq;
if(a.vh==0)return XP
},AQ=function (a) {
if(a.vk==0)return aQ;
if(a.Ci==0)return vo;
if(a.Ui==0)return $P;
if(a.Ci==1)if(a.vh==0)return YP;
else if(a.vh==1)return ZP
},EQ=function (a) {
switch(a) {
case WP:case XP:var b=
z(hK);
return b;
case Ln:var c=z(fK);
return c;
case Nn:var d=z(iK);
return d;
case dq:var e=z(jK);
return e;
default:return C
}
},JQ="Any",KQ="Private (not shared)",LQ="Shared by me",MQ="Shared with me",NQ="Shared with everyone in my domain",FQ=function (a) {
switch(a) {
case sQ:var b=z(JQ);
return b;
case vo:var c=z(KQ);
return c;
case YP:var d=z(LQ);
return d;
case ZP:var e=z(MQ);
return e;
case $P:var f=z(NQ);
return f;
case aQ:var g=z(QB);
return g;
default:return C
}
},OQ="1 day",PQ="{$numDays} days",QQ="1 week",RQ="{$numWeeks} weeks",
SQ="1 month",TQ="{$numMonths} months",UQ="1 year",HQ=function (a) {
var b=z(OQ),c=3,d=z(PQ,{
numDays:c
}),e=z(QQ),f=2,g=z(RQ,{
numWeeks:f
}),h=z(SQ),j=2,k=z(TQ,{
numMonths:j
});
j=6;
var m=z(TQ,{
numMonths:j
}),p=z(UQ);
switch(a) {
case hQ:return b;
case iQ:return d;
case jQ:return e;
case kQ:return g;
case lQ:return h;
case mQ:return k;
case nQ:return m;
case oQ:return p
}
},VQ="Modified",WQ="Created",GQ=function (a) {
switch(a) {
case eQ:var b=z(VQ);
return b;
case fQ:var c=z(uK);
return c;
case gQ:var d=z(WQ);
return d
}
},IQ=function (a) {
switch(a) {
case qQ:return PP;
case rQ:return QP;
default:var b=Np(a);
if(b)return b.q()
}return C
},JP=function (a) {
switch(a) {
case tc:return pQ;
case SP:return WP;
case TP:return sQ;
case MP:return eQ;
case NP:return hQ;
case VP:return qQ;
default:return C
}
};
OP[_P].hb=function (a) {
var b=this.ax,c=a.ca();
for(var d in b)if(b[d]!==c[d])return false;for(var d in c)if(c[d]!==b[d])return false;return true
};OP[_P].e=function () {
OP.b.e.call(this);
this.ax=null;
this.xH=null;
this.oa=null
};
var XQ=function (a,b,c,d) {
T.call(this,a,b,c,d);
this.gk=new D
};
A(XQ,T);
var YQ="select-mime-type-view";
XQ[_P].ja=YQ;
XQ[_P].Qm=null;
XQ[_P].f=function () {
this.h=this.i.f(L,{
"class":this.ja
})
};
XQ[_P].tj=function () {
if(this.Qm[o]!=0)return ;
else this.fc()
};
XQ[_P].og=function (a) {
var b=this.gk.o(a);
if(this.gk.remove(a)) {
var c=this.i.c(b);
this.i.removeNode(c)
}
};
XQ[_P].ng=function (a) {
var b=this.gk.o(a.l());
if(b) {
var c=this.i.c(b);
xa(c,a.q());
Aa(c,a.Ia())
}else this.appendData([a])
};
var ZQ="option";
Ma(XQ[_P],function (a) {
var b=
this.Qm,c=this.wb,d=this.i;
for(var e=0;e<a[o];e++) {
var f=d.createElement(ZQ),g=a[e];
xa(f,g.q());
Aa(f,g.Ia());
var h=this.G(g.l());
f.id=h;
this.gk.k(g.l(),h);
b.appendChild(f);
c.add(g)
}
});
XQ[_P].fc=function () {
XQ.b.fc.call(this);
var a={
},b=this.bg(),c=this.rS(b);
this.n1(a,c,b);
var d=IP(a);
this.Qm=d;
var e=this.h;
this.i.Hi(e);
e.appendChild(d)
};
XQ[_P].rS=function (a) {
var b={
};
for(var c=0;c<a[o];c++) {
var d=a[c].l(),e=this.G(d);
b[a[c].l()]=e;
this.gk.k(d,e)
}return b
};
XQ[_P].n1=function (a,b,c) {
a.xT=b;
a.mimeTypes=
c;
a.WQ=pQ
};
XQ[_P].p=function () {
return this.Qm[s]
};
Va(XQ[_P],function () {
this.Qm.selectedIndex=0
});
XQ[_P].sa=function (a) {
Aa(this.Qm,a)
};
XQ[_P].e=function () {
XQ.b.e.call(this);
this.gk.clear();
this.gk=null
};
var $Q="doclistrightclick",aR="doclistdatapath";
var bR="<div dir='ltr' style='overflow:hidden'><div dir='rtl' style='width:2000px'>",cR=function (a,b) {
var c=b||new Q;
c.g(bR);
if(!b)return c.toString ()
},dR="</div></div>",eR=function (a,b) {
var c=b||new Q;
c.g(dR);
if(!b)return c.toString ()
};
var fR="-icon ",gR="-icon",hR='  style="background-image: url(',iR=');"',jR='>&nbsp;</span><span class="',kR="-container ",lR="-container",mR="-caption ",nR="-caption",oR="<div>",pR='</span><span class="',qR="-subcaption ",rR="-subcaption",sR="</div></span></span>",tR=function (a,b) {
var c=b||new Q;
if(a.mN)cR(null,c);
c.g(KB,a.Rs,fR,a.Cu,a.xi?CB+a.xi+gR:C,Zd,a.lM?hR+a.lM+iR:C,jR,a.Rs,kR,a.Cu,a.xi?CB+a.xi+lR:C,BB,a.Rs,mR,a.Cu,a.xi?CB+a.xi+nR:C,K,a.content?oR+oB(a.content)+uB:C,pR,a.Rs,qR,a.Cu,a.xi?CB+
a.xi+rR:C,fO,oB(a.A5),sR);
if(a.mN)eR(null,c);
if(!b)return c.toString ()
};
var uR=function () {
},vR=null;
uR[_P].KA=function (a) {
return a&&a[uc]>=1
};
uR[_P].zj=function (a,b) {
if(a)Ta(a,b?l.max(a[uc],1):-1)
};
uR[_P].Ge=function () {
return undefined
};
uR[_P].f=function (a) {
var b=this.Gj(a);
return a.i.f(L,b?{
"class":b.join(E)
}:null,a.ac())
};
uR[_P].fa=function (a) {
return a
};
uR[_P].Ty=function (a,b,c) {
var d=a.c();
if(d)ez(d,b,c)
};
uR[_P].Na=function () {
return true
};
uR[_P].Q=function (a,b) {
if(b.id)a.AD(b.id);
var c=this.fa(b);
if(c&&c[gc])a.Wm(c[gc][Hc]?Ue(c[vc]):c[gc]);
else a.Wm(null);
a.QD(this.bW(bz(b)));
N(b,this.H());
var d=a.Zf;
if(d)Ge(d,function (e) {
this.Ty(a,e,true)
},this);
return b
};
var wR="-rtl";
uR[_P].tf=function (a) {
var b=a.c();
Ux(b,true,qg);
ez(b,this.H()+wR,a.fb());
var c=this.Ge();
if(c)zC(b,c)
};
uR[_P].Qd=function (a,b,c) {
var d=a.c();
if(d) {
var e=this.So(b);
if(e)ez(d,e,c);
this.o6(a,b,c)
}
};
var xR="disabled",yR="pressed",zR="expanded";
uR[_P].o6=function (a,b,c) {
var d;
switch(b) {
case 1:d=xR;
break;
case 4:d=yR;
break;
case 8:d=Cb;
break;
case 16:d=rb;
break;
case 64:d=zR;
break;
case 2:case 32:default:break
}if(d) {
var e=
a.c();
if(e)CC(e,d,c)
}
};
uR[_P].ma=function (a,b) {
var c=this.fa(a);
if(c)if(nd(b))Ww(c,b);
else {
Jw(c);
if(b) {
	function d(e) {
		if(e) {
			var f=ow(c);
			c.appendChild(nd(e)?f.createTextNode(e):e)
		}
	}if(kd(b))Ge(b,d);
	else d(b)
}
}
};
uR[_P].Tb=function (a) {
return a.c()
};
var AR="goog-control";
uR[_P].H=function () {
return AR
};
uR[_P].Gj=function (a) {
var b=this.BU(a.hc),c=a.Zf;
return c?b.concat(c):b
};
uR[_P].BU=function (a) {
var b=[this.H()];
if(a)for(var c=1;a;c<<=1)if(a&c) {
b.push(this.So(c));
a&=~c
}return b
};
var BR="-disabled",CR="-hover",
DR="-active",ER="-selected",FR="-checked",GR="-focused",HR="-open";
uR[_P].So=function (a) {
if(a) {
var b=this.H();
switch(a) {
	case 1:return b+BR;
	case 2:return b+CR;
	case 4:return b+DR;
	case 8:return b+ER;
	case 16:return b+FR;
	case 32:return b+GR;
	case 64:return b+HR
}
}return null
};
uR[_P].bW=function (a) {
var b=0;
if(a)Ge(a,function (c) {
b|=this.Zz(c)
},this);
return b
};
var IR="hover",JR="focused";
uR[_P].Zz=function (a) {
if(a) {
var b=Ee(a.split(Vg));
switch(b) {
	case xR:return 1;
	case IR:return 2;
	case Pn:return 4;
	case Cb:return 8;
	case rb:return 16;
	case JR:return 32;
	case mq:return 64
}
}return 0
};
var U=function (a,b,c) {
P.call(this,c);
this.r=b||vR||(vR=new uR);
this.Wm(a)
};
A(U,P);
var KR={
},LR=function (a,b) {
KR[a]=b
},MR=function (a) {
if(a) {
var b=bz(a);
for(var c=0,d=b[o];c<d;c++) {
	var e=b[c];
	if(e&&e in KR)return KR[e]()
}
}return null
};
U[_P].r=null;
U[_P].Ta=null;
U[_P].hc=0;
U[_P].or=39;
U[_P].$r=255;
U[_P].Nw=0;
U[_P].ya=true;
U[_P].F=null;
U[_P].sb=null;
U[_P].Zf=null;
U[_P].uA=true;
U[_P].He=function () {
return this.F||(this.F=new $i(this))
};
U[_P].qO=function (a) {
if(this.z&&a!=this.uA)throwi(Vz);
this.uA=a
};
U[_P].Tb=
function () {
return this.r.Tb(this)
};
U[_P].Kt=function () {
return this.sb||(this.sb=new GO)
};
U[_P].HO=function (a) {
if(this.c())throwi(Vz);
this.r=a
};
U[_P].Nr=function (a) {
if(a) {
if(this.Zf)this.Zf.push(a);
else this.Zf=[a];
this.r.Ty(this,a,true)
}
};
U[_P].XM=function (a) {
if(a&&this.Zf) {
Te(this.Zf,a);
if(this.Zf[o]==0)this.Zf=null;
this.r.Ty(this,a,false)
}
};
U[_P].PH=function (a,b) {
if(b)this.Nr(a);
else this.XM(a)
};
U[_P].f=function () {
this.Hk(this.r.f(this))
};
U[_P].fa=function () {
return this.r.fa(this.c())
};
U[_P].Na=
function (a) {
return this.r.Na(a)
};
U[_P].Oa=function (a) {
this.Hk(this.r.Q(this,a));
if(a[u][Gc]==Gx)this.ya=false
};
U[_P].t=function () {
U.b.t.call(this);
var a=this.c();
this.r.tf(this);
this.s(this.ya,true);
if(this.or&-2) {
var b;
if(this.uA) {
	b=this.He();
	b.d(a,bi,this.am);
	b.d(a,Ni,this.ee);
	b.d(a,Oi,this.ou);
	b.d(a,ci,this.mu)
}if(this.Jd(32)) {
	b=this.He();
	var c=this.Tb();
	b.d(c,Ti,this.ju);
	b.d(c,Si,this.eh);
	var d=this.Kt();
	d.jj(c);
	b.d(d,MO,this.rc)
}
}
};
U[_P].$=function () {
U.b.$.call(this);
if(this.F)this.F.vc();
if(this.sb)this.sb.detach()
};
U[_P].e=function () {
U.b.e.call(this);
if(this.F) {
this.F.j();
this.F=null
}if(this.sb) {
this.sb.j();
this.sb=null
}this.r=null;
this.Ta=null;
this.Zf=null
};
U[_P].ac=function () {
return this.Ta
};
U[_P].ma=function (a) {
this.r.ma(this.c(),a);
this.Wm(a)
};
U[_P].Wm=function (a) {
this.Ta=a
};
U[_P].Ro=function () {
if(!this.Ta||nd(this.Ta))return this.Ta;
var a=kd(this.Ta)?Ie(this.Ta,cx).join(C):cx(this.Ta);
return a&&Kf(a)
};
U[_P].vg=function (a) {
this.ma(a)
};
U[_P].La=function () {
return this.ya
};
var NR="show";
U[_P].s=function (a,
b) {
if(b||this.ya!=a&&this.dispatchEvent(a?NR:kM)) {
this.ya=a;
var c=this.c();
if(c) {
	M(c,a);
	if(a&&this.Wa()&&this.Jd(32))this.r.zj(this.Tb(),true);
	else {
		this.Rq(false);
		this.r.zj(this.Tb(),false)
	}
}return true
}return false
};
U[_P].Wa=function () {
return !this.oi(1)
};
U[_P].g_=function () {
var a=this.J();
return a&&typeofa.Wa==dd&&!a.Wa()
};
U[_P].Z=function (a) {
if(!this.g_()&&this.$j(1,!a)) {
if(this.Jd(32)) {
	if(!a)this.Rq(false);
	var b=a&&this.ya;
	this.r.zj(this.Tb(),b);
	if(!b)this.Rq(false)
}if(!a) {
	this.setActive(false);
	this.Pd(false)
}this.Qd(1,!a)
}
};
U[_P].Pd=function (a) {
if(this.$j(2,a))this.Qd(2,a)
};
U[_P].je=function () {
return this.oi(4)
};
$a(U[_P],function (a) {
if(this.$j(4,a))this.Qd(4,a)
});
U[_P].$c=function () {
return this.oi(8)
};
U[_P].dn=function (a) {
if(this.$j(8,a))this.Qd(8,a)
};
U[_P].GK=function () {
return this.oi(16)
};
U[_P].$N=function (a) {
if(this.$j(16,a))this.Qd(16,a)
};
U[_P].Rq=function (a) {
if(this.$j(32,a))this.Qd(32,a)
};
U[_P].isOpen=function () {
return this.oi(64)
};
U[_P].ra=function (a) {
if(this.$j(64,a))this.Qd(64,
a)
};
U[_P].oi=function (a) {
return !(!(this.hc&a))
};
U[_P].Qd=function (a,b) {
if(this.Jd(a)&&b!=this.oi(a)) {
this.r.Qd(this,a,b);
this.hc=b?this.hc|a:this.hc&~a
}
};
U[_P].QD=function (a) {
this.hc=a
};
U[_P].Jd=function (a) {
return !(!(this.or&a))
};
U[_P].Rd=function (a,b) {
if(b!=this.Jd(a)) {
if(this.z)throwi(Vz);
if(!b&&this.oi(a))this.Qd(a,false);
this.or=b?this.or|a:this.or&~a
}
};
U[_P].ke=function (a) {
return !(!(this.$r&a))&&this.Jd(a)
};
U[_P].e3=function (a,b) {
this.$r=b?this.$r|a:this.$r&~a
};
U[_P].tD=function (a,b) {
this.Nw=
b?this.Nw|a:this.Nw&~a
};
U[_P].$j=function (a,b) {
return this.Jd(a)&&this.oi(a)!=b&&(!(this.Nw&a)||this.dispatchEvent(gA(a,b)))&&!this.Gu()
};
U[_P].am=function (a) {
if(a[mb]&&!Tw(this.c(),a[mb])&&this.dispatchEvent(BP)&&this.Wa()&&this.ke(2))this.Pd(true)
};
var OR="leave";
U[_P].mu=function (a) {
if(a[mb]&&!Tw(this.c(),a[mb])&&this.dispatchEvent(OR)) {
if(this.ke(4))this.setActive(false);
if(this.ke(2))this.Pd(false)
}
};
U[_P].ee=function (a) {
if(this.Wa()) {
if(this.ke(2))this.Pd(true);
if(this.ke(4)&&a.fm(0))this.setActive(true)
}var b=
this.Tb();
if(this.r.KA(b)) {
if(!qg)b.focus()
}else a.preventDefault()
};
U[_P].ou=function (a) {
if(this.Wa()&&this.ke(2))this.Pd(true);
if(this.je()&&this.mg(a)&&this.ke(4))this.setActive(false)
};
U[_P].mg=function () {
if(this.ke(16))this.$N(!this.GK());
if(this.ke(8))this.dn(true);
if(this.ke(64))this.ra(!this.isOpen());
return this.dispatchEvent(Tz)
};
U[_P].ju=function () {
if(this.ke(32))this.Rq(true)
};
U[_P].eh=function () {
if(this.ke(4))this.setActive(false);
if(this.ke(32))this.Rq(false)
};
U[_P].rc=function (a) {
return this.ya&&
this.Wa()&&a[fc]==13&&this.mg(a)
};
LR(AR,function () {
return new U(null)
});
var PR=function () {
return uR.call(this)
};
A(PR,uR);
var QR=null,RR=function () {
return QR||(QR=new PR)
},SR="goog-menuseparator";
PR[_P].f=function (a) {
return a.i.f(L,{
"class":this.H()
})
};
var TR="HR";
PR[_P].Q=function (a,b) {
if(b[xc]==TR) {
var c=b;
b=this.f(a);
Kw(b,c);
Mw(c)
}else N(b,this.H());
return b
};
PR[_P].ma=function () {
};
PR[_P].H=function () {
return SR
};
var UR=function (a,b) {
U.call(this,null,a||RR(),b);
this.Rd(1,false);
this.Rd(2,false);
this.Rd(4,false);
this.Rd(32,false);
this.QD(1)
};
A(UR,U);
var VR="separator";
UR[_P].t=function () {
UR.b.t.call(this);
zC(this.c(),VR)
};
LR(SR,function () {
return new UR
});
var WR=function () {
},XR=null;
WR[_P].Ge=function () {
return undefined
};
WR[_P].KA=function (a) {
return a&&a[uc]>=1
};
WR[_P].zj=function (a,b) {
if(a)Ta(a,b?l.max(a[uc],1):-1)
};
WR[_P].f=function (a) {
return a.i.f(L,{
"class":this.Gj(a).join(E)
})
};
WR[_P].fa=function (a) {
return a
};
WR[_P].Na=function (a) {
return a[xc]==UC
};
var YR="-horizontal",ZR="-vertical";
WR[_P].Q=function (a,b) {
if(b.id)a.AD(b.id);
this.cT(a,b);
var c=this.H(),d=false,e=bz(b);
if(e)Ge(e,function (f) {
if(f==c)d=true;
else if(f==c+BR)a.Z(false);
else if(f==
c+YR)a.JD($R);
else if(f==c+ZR)a.JD(aS)
});
if(!d)N(b,c);
return b
};
WR[_P].cT=function (a,b) {
if(b) {
var c=b[gc],d;
while(c&&c[Dc]==b) {
	d=c[Hc];
	if(c[ub]==1) {
		var e=this.Uo(c);
		if(e) {
			e.Hk(c);
			a.I(e);
			e.Q(c)
		}
	}else if(!c[Nc]||Kf(c[Nc])==C)b.removeChild(c);
	c=d
}
}
};
WR[_P].Uo=function (a) {
return MR(a)
};
WR[_P].tf=function (a) {
var b=a.c();
Ux(b,true,qg);
var c=this.Ge();
if(c)zC(b,c);
if(a.uc==$R&&qg&&!Lg(uC)&&a.fb()) {
var d=this.fa(b);
a.Zd(function (e) {
	var f=e.c();
	if(f&&f[Dc]==d)bS(e)
})
}
};
WR[_P].Tb=function (a) {
return a.c()
};
var cS="goog-container";
WR[_P].H=function () {
return cS
};
WR[_P].Gj=function (a) {
var b=this.H(),c=a.uc==$R,d=[b,b+(c?YR:ZR)];
if(!a.Wa())d.push(this.H()+BR);
return d
};
WR[_P].FI=function () {
return aS
};
var dS="display:-moz-box;position:relative;top:4px",eS="display:-moz-box;position:relative",bS=function (a) {
var b=a.c();
if(b) {
var c=b[Dc],d=b[Hc],e=ainstanceofUR?dS:eS;
c.insertBefore(a.i.f(L,{
	style:e
},b),d)
}
},fS=function (a) {
var b=a.c();
if(b) {
var c=b[Dc];
c[Dc].insertBefore(b,c);
Mw(c)
}
};
var V=function (a,b,c) {
P.call(this,c);
this.r=b||XR||(XR=new WR);
this.uc=a||this.r.FI()
};
A(V,P);
var gS="horizontal",hS="vertical",$R=gS,aS=hS;
V[_P].F=null;
V[_P].im=null;
V[_P].sb=null;
V[_P].r=null;
V[_P].uc=null;
V[_P].ya=true;
V[_P].Ua=true;
V[_P].Hl=true;
V[_P].dc=-1;
V[_P].tc=null;
V[_P].TB=false;
V[_P].Uh=null;
V[_P].He=function () {
return this.F||(this.F=new $i(this))
};
V[_P].Tb=function () {
return this.im||this.r.Tb(this)
};
V[_P].Kt=function () {
return this.sb||(this.sb=new GO(this.Tb()))
};
V[_P].HO=function (a) {
if(this.c())throwi(Vz);
this.r=a
};
V[_P].f=function () {
this.Hk(this.r.f(this))
};
V[_P].fa=function () {
return this.r.fa(this.c())
};
V[_P].Na=function (a) {
return this.r.Na(a)
};
V[_P].Oa=function (a) {
this.Hk(this.r.Q(this,a));
if(a[u][Gc]==Gx)this.ya=false
};
V[_P].t=function () {
V.b.t.call(this);
var a=this.c();
this.r.tf(this);
this.s(this.ya,true);
var b=this.He();
b.d(this,BP,this.oA);
b.d(this,Rz,this.lu);
b.d(this,Sz,this.qu);
b.d(this,mq,this.cY);
b.d(this,eA,this.OW);
b.d(a,Ni,this.ee);
b.d(ow(a),Oi,this.jX);
b.d(a,[Ni,Oi,bi,ci],this.NW);
if(this.Hl)this.SH(true)
};
V[_P].SH=function (a) {
var b=this.He(),c=this.Tb();
if(a) {
b.d(c,Ti,this.ju);
b.d(c,Si,this.eh);
b.d(this.Kt(),MO,this.rc)
}else {
b.M(c,Ti,this.ju);
b.M(c,Si,this.eh);
b.M(this.Kt(),MO,this.rc)
}
};
V[_P].$=function () {
V.b.$.call(this);
this.Fc(-1);
if(this.F)this.F.vc();
if(this.tc)this.tc.ra(false);
this.TB=false
};
V[_P].e=function () {
V.b.e.call(this);
if(this.F) {
this.F.j();
this.F=null
}if(this.sb) {
this.sb.j();
this.sb=null
}this.Uh=null;
this.tc=null;
this.r=null
};
V[_P].oA=function (a) {
var b=a[v];
if(b&&this.Mx(b)) {
b.Pd(true);
if(this.TB)b.setActive(true)
}return false
};
V[_P].lu=function (a) {
var b=this.Wj(a[v]);
if(b>-1&&b!=this.dc) {
var c=this.Sl();
if(c)c.Pd(false);
this.dc=b;
c=this.Sl();
if(this.tc&&c!=this.tc)if(c.Jd(64))c.ra(true);
else this.tc.ra(false)
}CC(this.c(),xC,a[v].c().id)
};
V[_P].qu=function (a) {
if(a[v]==this.Sl())this.dc=-1;
CC(this.c(),xC,null)
};
V[_P].cY=function (a) {
var b=a[v];
if(b&&b!=this.tc&&b.J()==this) {
if(this.tc)this.tc.ra(false);
this.tc=b
}
};
V[_P].OW=function (a) {
if(a[v]==this.tc)this.tc=null
};
V[_P].ee=function (a) {
if(this.Ua)this.Dh(true);
var b=this.Tb();
if(this.r.KA(b))b.focus();
else a.preventDefault()
};
V[_P].jX=function () {
this.Dh(false)
};
V[_P].NW=function (a) {
var b=this.CV(a[v]);
if(b)switch(a[x]) {
case Ni:b.ee(a);
break;
case Oi:b.ou(a);
break;
case bi:b.am(a);
break;
case ci:b.mu(a);
break
}
};
V[_P].CV=function (a) {
if(this.Uh) {
var b=this.c();
while(a&&a[Dc]&&a!=b) {
	var c=a.id;
	if(c in this.Uh)return this.Uh[c];
	a=a[Dc]
}
}return null
};
V[_P].ju=function () {
};
V[_P].eh=function () {
this.Fc(-1);
this.Dh(false);
if(this.tc)this.tc.ra(false)
};
V[_P].rc=function (a) {
if(!this.Ua||
this.pd()==0)return false;
var b=this.Sl();
if(b&&typeofb.rc==dd&&b.rc(a))return true;
if(this.tc&&this.tc!=b&&typeofthis.tc.rc==dd&&this.tc.rc(a))return true;
switch(a[fc]) {
case 27:if(this.Hl)this.Tb().blur();
else return false;
break;
case 36:this.rK();
break;
case 35:this.pZ();
break;
case 38:if(this.uc==aS)this.SA();
else return false;
break;
case 37:if(this.uc==$R)if(this.fb())this.RA();
else this.SA();
else return false;
break;
case 40:if(this.uc==aS)this.RA();
else return false;
break;
case 39:if(this.uc==$R)if(this.fb())this.SA();
else this.RA();
else return false;
break;
default:return false
}a.preventDefault();
return true
};
V[_P].Ud=function (a,b,c) {
a.tD(2,true);
a.tD(64,true);
a.Rd(32,false);
a.qO(false);
V.b.Ud.call(this,a,b,c);
var d=a.c();
if(d) {
if(!d.id)d.id=a.l();
if(!this.Uh)this.Uh={
};
tf(this.Uh,d.id,a)
}if(c&&this.z&&this.fb()&&this.uc==$R&&qg&&!Lg(uC))bS(a);
if(b<=this.dc)this.dc++
};
Fa(V[_P],function (a,b) {
var c=this.Wj(a);
if(c!=-1)if(c==this.dc)a.Pd(false);
else if(c<this.dc)this.dc--;
if(b&&this.z&&this.fb()&&this.uc==$R&&qg&&
!Lg(uC))fS(a);
var d=a.c();
if(d&&d.id)pf(this.Uh,d.id);
a=V.b.removeChild.call(this,a,b);
a.qO(true);
return a
});
V[_P].JD=function (a) {
if(this.c())throwi(Vz);
this.uc=a
};
V[_P].La=function () {
return this.ya
};
V[_P].s=function (a,b) {
if(b||this.ya!=a&&this.dispatchEvent(a?NR:kM)) {
this.ya=a;
var c=this.c();
if(c) {
	M(c,a);
	if(this.Hl)this.r.zj(this.Tb(),this.Ua&&this.ya)
}return true
}return false
};
V[_P].Wa=function () {
return this.Ua
};
V[_P].Z=function (a) {
if(this.Ua!=a&&this.dispatchEvent(a?Yz:Xz)) {
if(a) {
	this.Ua=true;
	this.Zd(function (b) {
		if(b.lQ)delete b.lQ;
		else b.Z(true)
	})
}else {
	this.Zd(function (b) {
		if(b.Wa())b.Z(false);
		else b.lQ=true
	});
	this.Ua=false;
	this.Dh(false)
}if(this.Hl)this.r.zj(this.Tb(),a&&this.ya)
}
};
V[_P].xD=function (a) {
if(a!=this.Hl&&this.z)this.SH(a);
this.Hl=a;
if(this.Ua&&this.ya)this.r.zj(this.Tb(),a)
};
V[_P].Fc=function (a) {
var b=this.Mc(a);
if(b)b.Pd(true);
else if(this.dc>-1)this.Sl().Pd(false)
};
V[_P].Pd=function (a) {
this.Fc(this.Wj(a))
};
V[_P].Sl=function () {
return this.Mc(this.dc)
};
V[_P].rK=function () {
this.tu(function (a,
b) {
return (a+1)%b
},this.pd()-1)
};
V[_P].pZ=function () {
this.tu(function (a,b) {
a--;
return a<0?b-1:a
},0)
};
V[_P].RA=function () {
this.tu(function (a,b) {
return (a+1)%b
},this.dc)
};
V[_P].SA=function () {
this.tu(function (a,b) {
a--;
return a<0?b-1:a
},this.dc)
};
V[_P].tu=function (a,b) {
var c=b<0?this.Wj(this.tc):b,d=this.pd();
c=a(c,d);
var e=0;
while(e<=d) {
var f=this.Mc(c);
if(f&&this.Mx(f)) {
	this.Fc(c);
	return true
}e++;
c=a(c,d)
}return false
};
V[_P].Mx=function (a) {
return a.La()&&a.Wa()&&a.Jd(2)
};
V[_P].Dh=function (a) {
this.TB=
a
};
var iS=function (a,b,c) {
H.call(this,a,b);
this.item=c
};
A(iS,H);
var jS=function () {
uR.call(this)
};
A(jS,uR);
var kS=null;
jS[_P].Ge=function () {
return nP
};
jS[_P].f=function (a) {
var b=jS.b.f.call(this,a);
this.Ok(a,b,a.Jd(8)||a.Jd(16));
return b
};
jS[_P].fa=function (a) {
return this.gK(a)?a[$b]:a
};
var lS="goog-option";
jS[_P].Q=function (a,b) {
var c=O(b,lS);
a.aw(c);
b=jS.b.Q.call(this,a,b);
this.Ok(a,b,c);
return b
};
var mS="menuitemradio";
jS[_P].Ok=function (a,b,c) {
zC(b,c?mS:this.Ge());
this.JO(a,b,c)
};
var nS="menuitemcheckbox";
jS[_P].aw=function (a,b,c) {
zC(b,c?nS:this.Ge());
this.JO(a,
b,c)
};
var oS="-checkbox";
jS[_P].JO=function (a,b,c) {
var d=this.H()+oS,e=this.gK(b);
if(c&&!e) {
var f=a.i.f(L),g,h=this.fa(b)[gc];
while(g=h) {
	h=g[Hc];
	f.appendChild(g)
}n(b,C);
b.appendChild(a.i.f(L,{
	"class":d
}));
b.appendChild(f)
}else if(!c&&e) {
var g,h=this.fa(b)[gc],j=b[$b];
while(g=h) {
	h=g[Hc];
	b.appendChild(g)
}var k;
for(g=j;g;g=k) {
	k=g[fb];
	b.removeChild(g)
}
}ez(b,lS,c)
};
var pS="-highlight",qS="goog-option-selected";
jS[_P].So=function (a) {
switch(a) {
case 2:return this.H()+pS;
case 16:case 8:return qS;
default:return jS.b.So.call(this,
a)
}
};
jS[_P].Zz=function (a) {
return a==qS?16:jS.b.Zz.call(this,a)
};
var rS="goog-menuitem";
jS[_P].H=function () {
return rS
};
jS[_P].gK=function (a) {
var b=this.H()+oS;
return a&&a[gc]&&a[gc][ub]==1&&a[gc][nb]==b
};
var sS=function (a,b,c,d) {
U.call(this,a,d||kS||(kS=new jS),c);
this.sa(b)
};
A(sS,U);
sS[_P].p=function () {
var a=this.Y;
return a!=null?a:this.Ro()
};
sS[_P].sa=function (a) {
this.A(a)
};
sS[_P].Ok=function (a) {
this.Rd(8,a);
if(this.GK()&&!a)this.$N(false);
var b=this.c();
if(b)this.r.Ok(this,b,a)
};
sS[_P].aw=function (a) {
this.Rd(16,a);
var b=this.c();
if(b)this.r.aw(this,b,a)
};
LR(rS,function () {
return new sS(null)
});
var tS=function () {
WR.call(this)
};
A(tS,WR);
var uS=null;
tS[_P].Ge=function () {
return eP
};
var vS="UL";
tS[_P].Na=function (a) {
return a[xc]==vS||tS.b.Na.call(this,a)
};
tS[_P].Uo=function (a) {
return a[xc]==TR?new UR:tS.b.Uo.call(this,a)
};
tS[_P].ze=function (a,b) {
return Tw(a.c(),b)
};
var wS="goog-menu";
tS[_P].H=function () {
return wS
};
tS[_P].tf=function (a) {
tS.b.tf.call(this,a);
var b=a.c();
zC(b,eP);
CC(b,WO,Zj)
};
var xS=function (a) {
UR.call(this,RR(),a)
};
A(xS,UR);
LR(SR,function () {
return new UR
});
var yS=function (a,b) {
V.call(this,aS,b||uS||(uS=new tS),a);
this.xD(false)
};
A(yS,V);
yS[_P].Vr=true;
yS[_P].ZQ=false;
yS[_P].H=function () {
return this.r.H()
};
yS[_P].ze=function (a) {
return this.r.ze(this,a)||this.Oc()&&Ke(this.lc,function (b) {
return typeofb.ze==dd&&b.ze(a)
})
};
yS[_P].u=function (a) {
this.I(a,true)
};
yS[_P].Fg=function (a,b) {
this.Ud(a,b,true)
};
yS[_P].Vb=function (a) {
var b=this.removeChild(a,true);
if(b)b.j()
};
yS[_P].Df=function (a) {
var b=this.Aq(a,true);
if(b)b.j()
};
yS[_P].eg=function (a) {
return this.Mc(a)
};
yS[_P].bc=function () {
return this.pd()
};
yS[_P].Sb=function () {
return this.lc||[]
};
yS[_P].setPosition=function (a,b) {
var c=this.La();
if(!c)M(this.h,true);
Dx(this.h,a,b);
if(!c)M(this.h,false)
};
yS[_P].hp=function () {
return this.La()?Ax(this.h):null
};
yS[_P].Xv=function (a) {
this.Vr=a;
if(a)this.xD(true)
};
yS[_P].s=function (a,b) {
var c=yS.b.s.call(this,a,b);
if(c&&a&&this.z&&this.Vr)this.Tb().focus();
return c
};
yS[_P].oA=function (a) {
if(this.Vr)this.Tb().focus();
return yS.b.oA.call(this,a)
};
yS[_P].Mx=function (a) {
return (this.ZQ||
a.Wa())&&a.La()&&a.Jd(2)
};
var W=function (a,b,c,d,e,f) {
this.kh=b;
this.Ve=c||C;
sS.call(this,a,d,e,f||zS||(zS=new AS));
this.Nr(c)
};
A(W,sS);
W[_P].pi=null;
W[_P].Jc=null;
W[_P].xe=null;
W[_P].Xk=null;
W[_P].xj=false;
W[_P].Ie=function () {
return this.kh
};
W[_P].Jk=function (a) {
if(a!=this.kh&&this.c())this.r.Jk(this,a);
this.kh=a
};
W[_P].Zc=function () {
return this.xe
};
W[_P].wg=function (a) {
if(a!=this.xe&&this.c())this.r.wg(this,a);
this.xe=a
};
W[_P].TD=function (a) {
this.xe=a
};
W[_P].Pi=function (a) {
if(a!=this.Xk&&this.c())this.r.Pi(this,a);
this.Xk=
a
};
W[_P].pa=function () {
return this.Jc
};
W[_P].te=function (a) {
if(a!=this.Jc&&this.c())this.r.te(this,a);
this.Jc=a
};
W[_P].Kk=function (a) {
var b=this.c();
if(a&&this.pi!=a&&b)b.id=this.G(a);
this.pi=a
};
W[_P].Hf=function (a) {
if(this.xj!=a&&this.c())this.r.Hf(this,a);
this.xj=a
};
W[_P].Od=function (a) {
var b=this.c();
if(b&&this.Ve!=a)this.r.WF(this,this.Ve,a);
this.Ve=a
};
W[_P].Um=function (a) {
this.Ve=a
};
W[_P].f=function () {
W.b.f.call(this);
if(this.pi) {
var a=this.c();
a.id=this.G(this.pi)
}
};
var AS=function () {
jS.call(this)
};
A(AS,jS);
AS[_P].zN=false;
var BS=qg&&!Lg(uC),zS=null;
AS[_P].Ok=function (a,b,c) {
zC(b,c?mS:this.Ge());
ez(b,lS,c)
};
AS[_P].aw=function (a,b,c) {
zC(b,c?nS:this.Ge());
ez(b,lS,c)
};
AS[_P].f=function (a) {
var b=this.Gj(a),c=a.i,d=c.f(L,b?{
"class":b.join(E)
}:null),e={
};
this.oe(e,a);
n(d,tR(e));
var f=a.ac();
if(!nd(f))this.ma(d,f);
if(a.Zc())this.wg(a,a.Zc(),d);
if(a.pa())this.te(a,a.pa(),d);
if(a.xj)this.Hf(a,a.xj,d);
this.Ok(a,d,a.Jd(8)||a.Jd(16));
return d
};
AS[_P].Q=function (a,b) {
b=AS.b.Q.call(this,a,b);
a.TD(this.Zc(b));
return b
};
AS[_P].oe=function (a,b) {
a.mN=b.fb()&&this.zN&&BS;
a.Rs=this.H();
a.xi=b.Ve;
a.Cu=cB;
a.lM=b.Ie();
var c=b.ac();
a.content=nd(c)?c:null;
a.A5=b.Xk?b.Xk:C
};
var CS="url(";
AS[_P].Jk=function (a,b) {
var c=this.Hj(a);
if(c)c[u].backgroundImage=CS+b+Pd
};
AS[_P].Zc=function (a) {
return a&&a[jb]
};
AS[_P].wg=function (a,b,c) {
var d=c||a.c();
if(d)ta(d,b)
};
AS[_P].Pi=function (a,b) {
var c=this.cW(a);
if(c)a.i.fn(c,b)
};
AS[_P].te=function (a,b,c) {
var d=c||a.c();
if(d) {
d.setAttribute($Q,(!Gf(b)).toString ());
d.setAttribute(aR,
b)
}
};
var DS="-dragover";
AS[_P].Hf=function (a,b,c) {
var d=c||a.c();
if(d)ez(d,this.H()+DS,b)
};
AS[_P].fa=function (a) {
return this.zI(a)
};
AS[_P].Hj=function (a,b) {
var c=b||a.c();
return c?a.i.hf(KC,this.H()+gR,c)[0]:null
};
AS[_P].wU=function (a) {
return this.zI(a.c())
};
AS[_P].cW=function (a) {
var b=a.c();
return b?a.i.hf(KC,this.H()+rR,b)[0]:null
};
AS[_P].zI=function (a) {
var b=pw(a);
return a?b.hf(KC,this.H()+nR,a)[0]:null
};
AS[_P].WF=function (a,b,c) {
a.XM(b);
a.Nr(c);
this.XF(this.Hj(a),b,c,gR);
this.XF(this.wU(a),b,
c,nR)
};
AS[_P].XF=function (a,b,c,d) {
if(a) {
if(b)cz(a,b+d);
if(c)N(a,c+d)
}
};
AS[_P].H=function () {
return rS
};
var ES=function () {
return new W(null)
};
LR(rS,ES);
var FS="No items",GS=function (a,b,c,d,e) {
T.call(this,a,b,false,e);
this.Ma=new D;
this.Vg=new D;
this.No=new D;
this.ci=c;
var f=id(d)||!Xc(d)?true:d,g=this.ry();
if(f)this.I(g);
this.IK=f;
this.B=g;
var h=z(FS);
this.wi=h
};
A(GS,T);
var HS="menudataview";
GS[_P].ja=HS;
GS[_P].Gb=null;
GS[_P].Mk=function (a) {
this.wi=a
};
GS[_P].Aa=function () {
return this.B
};
GS[_P].ry=function () {
return new yS(this.i)
};
GS[_P].f=function () {
var a=this.i;
this.h=a.f(L,{
"class":this.ja
});
if(this.IK) {
var b=this.B;
b.f();
a.appendChild(this.h,
b.c())
}if(this.ci)this.Ds()
};
GS[_P].t=function () {
this.ba();
this.setActive(true);
if(this.ci)this.px();
GS.b.t.call(this)
};
GS[_P].Ds=function () {
var a=this.getContext().di,b=a.fo(this.ia),c=new Kz(this.c(),this);
b.u(c);
a.Of(b,UJ);
this.Gb=b
};
GS[_P].px=function () {
var a=this.ba(),b=this.Gb;
a.d(b,kz,this.gh);
a.d(b,lz,this.fh);
a.d(b,tz,this.Sj)
};
GS[_P].Tc=function (a,b) {
GS.b.Tc.call(this,a,b);
if(this.ci) {
var c=this.Gb;
if(c)c.sw(a)
}
};
GS[_P].gh=function () {
};
GS[_P].fh=function () {
};
GS[_P].Sj=function () {
};
GS[_P].Yo=
function () {
return null
};
GS[_P].Nt=function () {
return null
};
GS[_P].fc=function () {
GS.b.fc.call(this);
var a=this.B;
while(a.bc()>0) {
var b=a.Mc(0);
if(this.oh(b)) {
	b.$();
	a.removeChild(b)
}else a.Vb(b)
}this.Ma.clear();
var c=this.Vg.ca();
for(var d=0;d<c[o];d++)a.u(c[d]);c=this.No.ca();for(var d=0;d<c[o];d++)a.u(c[d]);var e=this.bg();this.appendData(e)
};GS[_P].og=function (a) {
var b=this.Ma,c=b.o(a);
if(b.remove(a))this.B.Vb(c)
};
Ma(GS[_P],function (a) {
var b=this.wb,c=a[o],d=this.B,e=this.Ma,f=this.No.D();
for(var g=
0;g<c;g++) {
var h=a[g],j=this.Gd(h);
d.Ud(j,d.bc()-f,true);
e.k(h.l(),j);
b.add(h)
}
});
GS[_P].ng=function (a) {
var b=this.Ma.o(a.l());
if(b)this.tb(b,a);
else {
b=this.Gd(a);
var c=this.B;
c.Ud(b,c.bc()-this.No.D(),true);
this.Ma.k(a.l(),b)
}
};
GS[_P].Gd=function (a) {
var b=new W;
this.tb(b,a);
return b
};
GS[_P].tb=function () {
};
GS[_P].Eg=function (a,b) {
var c=a.l(),d=b?this.No:this.Vg;
d.k(c,a)
};
GS[_P].oh=function (a) {
return this.Vg.Da(a.l())||this.No.Da(a.l())
};
GS[_P].ah=function () {
return []
};
GS[_P].tj=function () {
var a=this.B;
if(a.bc()!=0)return ;
else {
var b=new W(this.wi);
b.Z(false);
a.u(b)
}
};
GS[_P].e=function () {
GS.b.e.call(this);
if(this.IK)this.B.j();
this.B=null;
this.Ma.clear();
this.Ma=null
};
var IS=function (a,b) {
this.F=new $i(this);
this.fw(a);
if(b)this.t4(b)
};
A(IS,J);
var JS="toggle_display";
IS[_P].h=null;
IS[_P].mR=true;
IS[_P].GF=null;
IS[_P].wf=false;
IS[_P].S4=false;
IS[_P].jL=-1;
IS[_P].AB=-1;
IS[_P].Cg=JS;
IS[_P].Ia=function () {
return this.Cg
};
IS[_P].t4=function (a) {
this.Cg=a
};
IS[_P].c=function () {
return this.h
};
IS[_P].fw=function (a) {
this.IT();
this.h=a
};
var KS="Can not change this state of the popup while showing.";
IS[_P].IT=function () {
if(this.wf)throwi(KS);
};
IS[_P].La=function () {
return this.wf
};
IS[_P].Zj=function () {
return this.wf||Ad()-this.AB<150
};
var LS="Caller must call setElement before trying to show thepopup";
IS[_P].s=function (a) {
if(a) {
if(!this.h)throwi(LS);
this.e5()
}else this.QA()
};
IS[_P].gc=function () {
};
var MS="IFRAME",NS="move_offscreen";
IS[_P].e5=function () {
if(this.wf)return ;
if(!this.B0())return ;
this.gc();
if(this.mR) {
var a=ow(this.h);
this.F.d(a,Ni,this.YL,true);
if(F) {
	var b=a[hb];
	while(b&&b[Sb]==MS) {
		try{
			var c=Uw(b)
		}catch(d) {
			break
		}a=c;
		b=a[hb]
	}this.F.d(a,Ni,this.YL,true);
	this.F.d(a,
	$z,this.XL)
}else this.F.d(a,Si,this.XL)
}if(this.Cg==JS) {
db(this.h[u],jP);
M(this.h,true)
}else if(this.Cg==NS)this.gc();
this.wf=true;
this.kC()
};
IS[_P].QA=function (a) {
if(this.wf) {
if(!this.A0(a))return ;
if(this.F)this.F.vc();
if(this.Cg==JS)if(this.S4)at(this.nK,0,this);
else this.nK();
else if(this.Cg==NS)this.a0();
this.wf=false;
this.G0(a)
}
};
IS[_P].nK=function () {
db(this.h[u],Nn);
M(this.h,false)
};
var OS="-200px";
IS[_P].a0=function () {
Ea(this.h[u],OS);
this.h[u].top=OS
};
var PS="beforeshow";
IS[_P].B0=function () {
return this.dispatchEvent(PS)
};
IS[_P].kC=function () {
this.jL=Ad();
this.AB=-1;
this.dispatchEvent(NR)
};
var QS="beforehide";
IS[_P].A0=function (a) {
return this.dispatchEvent({
type:QS,target:a
})
};
IS[_P].G0=function (a) {
this.AB=Ad();
this.dispatchEvent({
type:kM,target:a
})
};
IS[_P].YL=function (a) {
if(!Tw(this.h,a[v])&&(!this.GF||Tw(this.GF,a[v])))this.QA(a[v])
};
IS[_P].XL=function (a) {
var b=ow(this.h);
if(F) {
var c=b[hb];
if(c&&Tw(this.h,c))return
}else if(a[v]!=b)return ;
if(Ad()-this.jL<150)return ;
this.QA()
};
IS[_P].e=function () {
IS.b.e.call(this);
this.F.j();
this.h=null;
this.F=null
};
var RS=function (a,b) {
this.s1=5;
this.Em=b;
IS.call(this,a)
};
A(RS,IS);
RS[_P].fq=null;
RS[_P].hp=function () {
return this.Em
};
RS[_P].setPosition=function (a) {
this.Em=a;
if(this.wf)this.gc()
};
RS[_P].HD=function (a,b,c,d) {
this.fq=a==null||ainstanceofHs?a:new Hs(a,b,c,d);
if(this.wf)this.gc()
};
RS[_P].gc=function () {
if(!this.Em)return ;
if(!this.wf) {
db(this.h[u],Nn);
M(this.h,true)
}this.Em.gc(this.h,this.s1,this.fq);
if(!this.wf)M(this.h,false)
};
var US=function (a,b,c,d,e,f,g) {
var h=Ax(c),j=Ax(a),k=new Os(j.x-h.x+c[Jb],
j.y-h.y+c[Ic]),m=1,p=1,q=Hx(a),t=SS(a,b);
switch(t) {
case 1:break;
case 2:k.x+=q[r];
m=-1;
break;
case 3:k.y+=q[y];
p=-1;
break;
case 4:k.x+=q[r];
k.y+=q[y];
m=-1;
p=-1;
break
}if(e) {
k.x+=m*e.x;
k.y+=p*e.y
}return TS(k,c,d,f,g)
},TS=function (a,b,c,d,e) {
var f=SS(b,c);
if(d||f!=1) {
var g=Hx(b);
switch(f) {
	case 1:a.x+=d[Wb];
	a.y+=d.top;
	break;
	case 2:a.x-=g[r];
	if(d) {
		a.x-=d[Sc];
		a.y+=d.top
	}break;
	case 3:a.y-=g[y];
	if(d) {
		a.x+=d[Wb];
		a.y-=d[oc]
	}break;
	case 4:a.x-=g[r];
	a.y-=g[y];
	if(d) {
		a.x-=d[Sc];
		a.y-=d[oc]
	}break
}
}var h=e||0;
if(h!=0) {
var j=
ow(b),k=Ew(j)||ga,m=Hx(b),p=Cw(k),q=Dw(k),t=a.x-q.x,w=p[r]-t,$=a.y-q.y,za=p[y]-$;
if(m[r]>w)if(h&1)a.x-=m[r]-w;
else if(h&2)return false;
if(m[y]>za)if(h&4)a.y-=m[y]-za;
else if(h&8)return false;
if(a.x-q.x<0)if(h&1)a.x-=a.x-q.x;
else if(h&2)return false;
if(a.y-q.y<0)if(h&4)a.y-=a.y-q.y;
else if(h&8)return false
}sx(b,a);
return true
},SS=function (a,b) {
var c=Px(a);
switch(b) {
case 1:case 2:case 3:case 4:return b;
case 5:return c?2:1;
case 6:return c?1:2;
case 7:return c?4:3;
case 8:return c?3:4
}
},VS=function (a) {
switch(a) {
case 1:return 2;
case 2:return 1;
case 3:return 4;
case 4:return 3;
case 5:return 6;
case 6:return 5;
case 7:return 8;
case 8:return 7
}
},WS=function (a) {
switch(a) {
case 1:return 3;
case 2:return 4;
case 3:return 1;
case 4:return 2;
case 5:return 7;
case 6:return 8;
case 7:return 5;
case 8:return 6
}
};
var XS=function () {
};
XS[_P].gc=function () {
};
var YS=function (a,b) {
this.ob=a;
this.co=b
};
A(YS,XS);
YS[_P].gc=function (a,b,c) {
US(this.ob,this.co,a,b,null,c)
};
var ZS=function (a,b,c) {
YS.call(this,a,b);
this.TQ=c||false
};
A(ZS,YS);
ZS[_P].gc=function (a,
b,c) {
var d=US(this.ob,this.co,a,b,null,c,10);
if(!d) {
d=US(this.ob,b,a,this.co,null,c,10);
if(!d)if(this.TQ)d=US(this.ob,this.co,a,b,null,c,5);
else US(this.ob,this.co,a,b,null,c,0)
}
};
var $S=function (a,b) {
this.Ls=ainstanceofOs?a:new Os(a,b)
};
A($S,XS);
$S[_P].gc=function (a,b,c) {
var d=ux(a),e=new Os(this.Ls.x+d[kc],this.Ls.y+d[eb]);
US(d,1,a,b,e,c)
};
var aT=function (a,b) {
$S.call(this,a,b)
};
A(aT,$S);
aT[_P].gc=function (a,b,c) {
var d=ux(a),e=new Os(this.Ls.x+d[kc],this.Ls.y+d[eb]),f=10;
if(US(d,1,a,b,e,c,f))return ;
if(US(d,1,a,WS(b),e,c,f))return ;
if(US(d,1,a,VS(b),e,c,f))return ;
if(US(d,1,a,WS(VS(b)),e,c,f))return ;
US(d,1,a,b,e,c)
};
var bT=function (a) {
yS.call(this,a);
this.Xv(true);
this.Xb=new D
};
A(bT,yS);
bT[_P].ya=false;
bT[_P].AE=false;
bT[_P].fL=0;
bT[_P].xy=null;
bT[_P].Oa=function (a) {
bT.b.Oa.call(this,a);
var b=a.getAttribute(ww)||a.htmlFor;
if(b)this.jj(this.i.c(b),3)
};
bT[_P].t=function () {
bT.b.t.call(this);
bh(this.Xb,this.BF,this);
this.F.d(this,Tz,this.SL);
this.F.d(this.i.W,Ni,this.qv,true);
if(sg)this.F.d(this.i.W,Ui,this.qv,true)
};
bT[_P].$=function () {
bT.b.$.call(this);
bh(this.Xb,this.pH,this);
this.F.M(this,Tz,this.SL);
this.F.M(this.i.W,
Ni,this.qv,true);
if(sg)this.F.M(this.i.W,Ui,this.qv,true)
};
var cT="Can not attach menu to the same element more than once.";
bT[_P].jj=function (a,b,c,d,e) {
var f=ud(a);
if(this.Xb.Da(f))throwi(cT);
var g={
h:a,sn:b,fv:c,Ee:d?Ui:Ni,fq:e
};
this.Xb.k(f,g);
if(this.z)this.BF(g)
};
bT[_P].BF=function (a) {
this.F.d(a.h,a.Ee,this.gM)
};
var dT="Menu not attached to provided element, unable to detach.";
bT[_P].detach=function (a) {
var b=ud(a);
if(!this.Xb.Da(b))throwi(dT);
if(this.z)this.pH(this.Xb.o(b));
this.Xb.remove(b)
};
bT[_P].pH=function (a) {
this.F.M(a.h,a.Ee,this.gM)
};
bT[_P].SD=function (a) {
this.AE=a
};
bT[_P].gr=function (a,b,c) {
var d=this.La();
if((d||this.mQ())&&this.AE) {
this.ih();
return
}var e=a.sn?new ZS(a.h,a.sn):new aT(b,c),f=a.fv||5;
if(!d)db(this.h[u],Nn);
M(this.h,true);
e.gc(this.h,f,a.fq);
if(!d)db(this.h[u],jP);
this.xy=a.h;
this.Fc(-1);
this.s(true)
};
bT[_P].Bw=function (a,b,c) {
this.gr({
fv:c
},a,b)
};
bT[_P].W4=function (a,b,c) {
this.gr({
fv:c,h:a,sn:b
},0,0)
};
bT[_P].ih=function () {
this.s(false);
if(!this.La()) {
this.fL=Ad();
this.xy=null
}
};
bT[_P].mQ=function () {
return Ad()-this.fL<50
};
bT[_P].SL=function () {
this.ih()
};
bT[_P].gM=function (a) {
var b=this.Xb.Nc();
for(var c=0;c<b[o];c++) {
var d=this.Xb.o(b[c]);
if(d.h==a[Tb]) {
	this.gr(d,a[Oc],a[Pc]);
	a.preventDefault();
	a.stopPropagation();
	return
}
}
};
bT[_P].qv=function (a) {
if(this.La()&&!this.ze(a[v]))this.ih()
};
bT[_P].eh=function (a) {
bT.b.eh.call(this,a);
this.ih()
};
bT[_P].e=function () {
bT.b.e.call(this);
if(this.Xb) {
this.Xb.clear();
this.Xb=null
}
};
var eT=function (a) {
bT.call(this,a)
};
A(eT,bT);
var fT="visble";
eT[_P].s=function (a) {
eT.b.s.call(this,a);
var b=this.h;
if(b) {
Za(b[u],C);
if(a) {
	var c=Cw(),d=b[u];
	if(b[Lc]+b[Ic]>c[y])Za(d,c[y]-b[Ic]);
	if(qg&&wg) {
		wa(d,C);
		Xa(d,fT);
		wa(d,b[Ab]);
		Xa(d,ay)
	}
}
}
};
eT[_P].gr=function (a,b,c) {
var d=this.La();
if((d||this.mQ())&&this.AE) {
this.ih();
return
}if(this.fb()) {
var e=a.sn?new ZS(a.h,4):new aT(b,c),f=2
}else {
var e=a.sn?new ZS(a.h,a.sn):new aT(b,c),f=a.fv||1
}if(!d)db(this.h[u],Nn);
M(this.h,true);
e.gc(this.h,f,a.fq);
if(!d)db(this.h[u],jP);
this.xy=a.h;
this.Fc(-1);
this.s(true)
};
var gT="No saved searches",hT=function (a,b,c,d) {
GS.call(this,a,b,false,c,d);
var e=z(gT);
this.Mk(e)
};
A(hT,GS);
var iT="popupmenusavedview-item";
hT[_P].Qp=iT;
hT[_P].tb=function (a,b) {
var c=yJ(b.q(),b.p());
if(c) {
a.vg(c.q());
a.A(c.Jb());
a.Kk(b.l());
a.te(b.pa());
a.Od(this.Qp)
}
};
hT[_P].ry=function () {
return new eT(this.i)
};
var jT=function (a) {
MN.call(this,a);
this.Gg=new Hs(0,0,0,0);
this.zi=new Hs(0,0,0,0);
this.GB=1;
this.un=[]
};
A(jT,MN);
var kT="goog-ninegrid",lT="goog-ninegrid-middlerow",mT="goog-ninegrid-cholder",nT="goog-ninegrid-corner",oT="goog-ninegrid-corner-left",pT="goog-ninegrid-corner-right",qT="goog-ninegrid-edge-t",rT="goog-ninegrid-edge-b",sT="goog-ninegrid-border";
jT[_P].Qh=sT;
var tT="goog-ninegrid-cbgcolor";
jT[_P].ao=tT;
jT[_P].uR=C;
var uT="goog-ninegrid-edge";
jT[_P].Sy=uT;
jT[_P].rm=null;
jT[_P].vb=null;
jT[_P].bo=null;
jT[_P].Is=null;
jT[_P].Fj=function () {
return kT
};
jT[_P].fa=function () {
return this.vb
};
jT[_P].rD=function (a) {
var b=this.vb,c=this.Is;
if(this.z&&b)c.removeChild(b);
this.vb=a;
if(this.z&&a)c.appendChild(a)
};
jT[_P].$v=function (a) {
if(this.z&&this.Qh!=a) {
var b=this.Qh,c=this.un,d=[this.rm,c[0][1],c[1][1]];
for(var e=0;e<d[o];e++) {
	var f=d[e];
	cz(f,b);
	N(f,a)
}this.ha()
}this.Qh=a
};
jT[_P].bw=function (a) {
if(this.z&&this.ao!=a) {
var b=this.bo;
cz(b,this.ao);
N(b,a);
this.ha()
}this.ao=a
};
jT[_P].setLineWidth=
function (a) {
this.GB=a;
if(this.z)this.ha()
};
jT[_P].At=function (a,b) {
return this.un[a][b==0?0:2]
};
jT[_P].st=function () {
return this.Gg.Ca()
};
var vT="Illegal negative sized border. Top: ",wT=" Left: ",xT=" Ri";
jT[_P].Vm=function (a) {
a.top=Xc(a.top)?a.top:this.Gg.top;
cb(a,Xc(a[Sc])?a[Sc]:this.Gg[Sc]);
Oa(a,Xc(a[oc])?a[oc]:this.Gg[oc]);
Ea(a,Xc(a[Wb])?a[Wb]:this.Gg[Wb]);
if(a.top<0||a[Sc]<0||a[oc]<0||a[Wb]<0)throwi(vT+a.top+wT+a[Wb]+xT);
if(Ns(this.Gg,a))return ;
this.Gg=a.Ca();
if(this.z)this.ha()
};
jT[_P].kw=
function (a) {
a.top=Xc(a.top)?a.top:this.zi.top;
cb(a,Xc(a[Sc])?a[Sc]:this.zi[Sc]);
Oa(a,Xc(a[oc])?a[oc]:this.zi[oc]);
Ea(a,Xc(a[Wb])?a[Wb]:this.zi[Wb]);
if(Ns(this.zi,a))return ;
this.zi=a.Ca();
if(this.z)this.ha()
};
jT[_P].eo=function (a,b) {
var c=b||C,d=this.i,e=d.f(L,{
className:c
});
d.appendChild(a,e);
return e
};
var yT="goog-ninegrid-corner-right-ie",zT="goog-ninegrid-corner-left-ie";
jT[_P].wG=function (a,b) {
var c=F?(b?yT:zT):C,d=nT+E+(b?pT:oT)+E+c;
return this.eo(a,d)
};
var AT=" goog-ninegrid-edge-tb-ie";
jT[_P].mS=
function (a,b) {
return this.eo(a,this.Qh+E+(b?qT:rT)+(F?AT:C))
};
jT[_P].xG=function (a,b) {
var c=[],d=this.eo(a,this.Sy);
c[0]=this.wG(d,false);
c[2]=this.wG(d,true);
c[1]=this.mS(d,b);
return c
};
var BT="px ";
jT[_P].ZP=function () {
var a=this.Gg,b=this.zi,c=this.GB,d=[a.top+rx,a[oc]+rx],e=[a[Wb]+rx,C,a[Sc]+rx],f=c+rx;
for(var g=0;g<2;g++)for(var h=0;h<3;h++) {
var j=this.un[g][h][u];
if(j[y]!=d[g])Za(j,d[g]);
if(j[r]!=e[h])wa(j,e[h]);
if(h==1)if(g==0&&a.top&&j.borderTopWidth!=f)j.borderTopWidth=f;
else if(g==1&&a[oc]&&
j.borderBottomWidth!=f)j.borderBottomWidth=f
}var k=this.rm[u];
if(k.borderLeftWidth!=f)k.borderLeftWidth=f;
if(k.borderRightWidth!=f)k.borderRightWidth=f;
var m=new Hs(l.max(0,b.top),l.max(0,b[Sc]),l.max(0,b[oc]),l.max(0,b[Wb])),p=new Hs(l.min(0,b.top),a[Sc]+l.min(0,b[Sc]),l.min(0,b[oc]),a[Wb]+l.min(0,b[Wb])),q=p.top+BT+p[Sc]+BT+p[oc]+BT+p[Wb]+rx,t=m.top+BT+m[Sc]+BT+m[oc]+BT+m[Wb]+rx,w=this.bo[u];
if(w.margin!=q)w.margin=q;
if(w.padding!=t)w.padding=t
};
jT[_P].f=function () {
var a=this.i,b=this.h=a.f(L,{
"class":this.uR+
E+kT
}),c=Fw(L,{
className:this.Qh+E+lT
}),d=this.eo(c,this.ao),e=this.eo(d,mT),f=this.un;
f[0]=this.xG(b,true);
a.appendChild(b,c);
f[1]=this.xG(b,false);
if(this.fa())a.appendChild(e,this.fa());
this.rm=c;
this.bo=d;
this.Is=e
};
jT[_P].Na=function (a) {
if(!O(a,kT))return false;
var b=this.i,c=b.ka(a),d=b.qb(c);
if(!(d&&O(d,lT)&&O(d,this.Qh)))return false;
this.rm=d;
var e=b.ka(d);
if(!(e&&O(e,this.ao)))return false;
this.bo=e;
var f=b.ka(e);
if(!(f&&O(f,mT)))return false;
this.Is=f;
if(f[vc][o]==1)this.vb=b.ka(f);
else if(f[vc][o]!=
0)return false;
var g=this.un,h=b.ka(a);
if(!h||!O(h,this.Sy))return false;
var j=[],k,m,p;
k=b.ka(h);
m=b.qb(k);
p=b.qb(m);
if(!(O(k,nT)&&O(k,oT)&&O(m,nT)&&O(m,pT)&&O(p,qT)))return false;
j[0]=k;
j[1]=p;
j[2]=m;
g[0]=j;
var q=b.qb(d);
if(!q||!O(q,this.Sy))return false;
var t=[];
k=b.ka(q);
m=b.qb(k);
p=b.qb(m);
if(!(O(k,nT)&&O(k,oT)&&O(m,nT)&&O(m,pT)&&O(p,rT)))return false;
t[0]=k;
t[1]=p;
t[2]=m;
g[1]=t;
return true
};
jT[_P].t=function () {
jT.b.t.call(this);
this.ZP()
};
jT[_P].ha=function () {
if(this.z)this.ZP()
};
jT[_P].e=function () {
jT.b.e.call(this);
this.Gg=null;
this.zi=null;
this.un=null;
this.rm=null;
this.vb=null;
this.bo=null;
this.Is=null
};
var CT=function (a,b) {
jT.call(this,b);
this.Ms=a||15
};
A(CT,jT);
CT[_P].Og=15;
CT[_P].JF=kw;
CT[_P].by=kw;
CT[_P].d6=false;
CT[_P].KF=kw;
CT[_P].Cs=kw;
CT[_P].e6=false;
CT[_P].qR=kw;
CT[_P].ay=kw;
CT[_P].c6=true;
CT[_P].Yv=function (a) {
this.JF=a
};
CT[_P].Zv=function (a) {
this.KF=a
};
CT[_P].Vm=function (a) {
if(this.lK(a,this.Ms)) {
var b=this.st();
CT.b.Vm.call(this,a);
this.Og|=b.top!=a.top?3:0;
this.Og|=b[Sc]!=a[Sc]?10:0;
this.Og|=b[oc]!=a[oc]?12:0;
this.Og|=b[Wb]!=a[Wb]?5:0;
if(this.z)this.ha()
}
};
CT[_P].eO=function (a) {
if(this.lK(this.st(),
a)) {
this.Og|=this.Ms^a;
this.Ms=a;
if(this.z)this.ha()
}
};
CT[_P].lK=function (a,b) {
var c=a.top==a[oc]||!(b&1||b&2)||!(b&4||b&8),d=a[Wb]==a[Sc]||!(b&1||b&4)||!(b&2||b&8);
return c&&d
};
CT[_P].t=function () {
CT.b.t.call(this);
this.Br()
};
CT[_P].ha=function () {
if(this.z) {
CT.b.ha.call(this);
this.Br()
}
};
var DT="af",ET="tl",FT="bl",GT="br";
CT[_P].Br=function () {
CT.b.ha.call(this);
var a=this.rm,b=this.WU(a),c=this.XU(a),d=this.DV(this.c());
if(b!=this.Cs||c!=this.by||d!=this.ay) {
this.Cs=b;
this.by=c;
this.ay=d;
this.Og=
15
}if(this.Og) {
var e=F&&ug<7,f=e?null:this.KG(DT),g=this.st(),h=g[Wb],j=g.top;
this.cw(ET,this.At(0,0),1,e,f,h,j);
this.cw(uz,this.At(0,1),2,e,f,h,j);
this.cw(FT,this.At(1,0),4,e,f,h,j);
this.cw(GT,this.At(1,1),8,e,f,h,j);
this.Og=0
}
};
var HT="backgroundColor";
CT[_P].DV=function (a) {
return this.Cz(a[Dc],HT,this.c6,this.qR)
};
CT[_P].WU=function (a) {
return this.Cz(a,HT,this.e6,this.KF)
};
var IT="borderRightColor";
CT[_P].XU=function (a) {
return this.Cz(a,IT,this.d6,this.JF)
};
var JT="transparent";
CT[_P].Cz=function (a,
b,c,d) {
if(c)return C;
var e=KT(a,b);
try{
var f=Qv(e==JT||e==bw?d:e);
return f.cm
}catch(g) {
return d
}
};
var KT=function (a,b) {
var c=ow(a);
if(c[yc]&&c[yc].getComputedStyle) {
la[yc].getComputedStyle(a,C);
return la[yc].getComputedStyle(a,C)[b]
}else return a[pc]?a[pc][b]:a[u][b]
},LT="rc",MT=new G(LT),NT="c",OT="ic",PT="bc",QT="h",RT="lw",TT=function (a,b,c,d,e,f,g) {
var h=MT.Ca();
h.ed(xq,a);
h.ed(NT,ST(b));
h.ed(OT,ST(c));
h.ed(PT,ST(d));
h.ed(Ng,f);
h.ed(QT,g);
h.ed(RT,e);
h.ed(kb,1);
return h.toString ()
},UT="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='",
VT="', sizingMethod='crop')",WT=") no-repeat ";
CT[_P].cw=function (a,b,c,d,e,f,g) {
if(!(this.Og&c))return ;
if(this.Ms&c)if(d) {
e=this.KG(a);
qa(b[u],UT+e+VT)
}else {
var h=a==ET||a==FT?0:-f,j=a==ET||a==uz?0:-g;
b[u].background=CS+e+WT+h+BT+j+rx
}else b[u].background=this.Cs
};
CT[_P].KG=function (a) {
var b=this.st(),c,d;
switch(a) {
case DT:case ET:c=b[Wb];
d=b.top;
break;
case uz:c=b[Sc];
d=b.top;
break;
case FT:c=b[Wb];
d=b[oc];
break;
case GT:c=b[Sc];
d=b[oc];
break
}return TT(a,this.by,this.Cs,this.ay,this.GB,c,d)
};
var ST=
function (a) {
if(Bf(a,ih))return a.substring(1);
return a
};
var XT=function (a,b,c) {
B.call(this);
this.Zp=a;
this.he=b;
this.F=c;
this.We=xd(this.M0,this)
};
A(XT,B);
XT[_P].YD=false;
XT[_P].U=null;
XT[_P].jI=function () {
if(this.U==null)this.uo();
else this.YD=true
};
XT[_P].e=function () {
XT.b.e.call(this);
if(this.U) {
bt(this.U);
this.U=null
}
};
XT[_P].M0=function () {
this.U=null;
if(this.YD) {
this.YD=false;
this.uo()
}
};
XT[_P].uo=function () {
this.U=at(this.We,this.he);
this.Zp.call(this.F)
};
var YT=function (a,b,c,d) {
T.call(this,a,b,c,d);
this.XS=new XT(this.Rt,100,this);
this.z6=0.5
};
A(YT,T);
YT[_P].xn=null;
YT[_P].Fq=null;
YT[_P].HN=false;
YT[_P].cn=null;
YT[_P].lp=function () {
return this.c()
};
var ZT="scroll";
YT[_P].qL=function () {
this.ba().d(this.lp(),ZT,this.WJ)
};
YT[_P].MD=function (a) {
this.HN=a
};
YT[_P].WJ=function (a,b) {
if(!b) {
this.HN=true;
if(this.cn) {
	bt(this.cn);
	this.cn=null
}this.cn=at(xd(this.MD,this,false),50)
}if(this.gb) {
if(this.Fq)if(b)this.Fq=null;
else return ;
if(this.Ao||this.ej)if(b)return ;
else this.Fq=at(xd(this.WJ,this,null,true),100);
this.XS.jI()
}
};
YT[_P].Rt=function () {
var a=this.Ne;
bh(this.wc,function (b,c) {
if(a.contains(c))b.Rt()
});
if(this.e_())this.Qt()
};
YT[_P].e_=function () {
if(this.fp()>=this.ag().Nd)return false;
var a=this.lp();
if(a&&this.xn) {
var b=Ax(a),c=this.xn,d=this.uf?c.top-b.y:a[eb],e=c[y],f=a[ec]-d-e,g=e*this.z6;
return f==0?false:f<g
}return false
};
YT[_P].tw=function () {
var a=this.lp();
if(!this.uf&&a) {
var b=Ax(a),c=Hx(a);
this.uw(new Ps(b.x,b.y,c[r],c[y]))
}
};
YT[_P].uw=function (a) {
this.xn=
a;
bh(this.wc,function (b) {
b.uw(a)
})
};
YT[_P].e=function () {
YT.b.e.call(this);
bt(this.Fq);
this.Fq=null;
bt(this.cn);
this.cn=null;
this.xn=null
};
var X=function (a,b,c) {
P.call(this,c);
this.n=b||$T;
this.wK=a||this.n.eT;
this.q7=null;
aU[this.l()]=this
};
A(X,P);
var aU={
};
X[_P].Tv=false;
X[_P].xK=19;
X[_P].nc=false;
X[_P].CE=null;
X[_P].UQ=C;
X[_P].e=function () {
X.b.e.call(this);
if(this.aj) {
this.aj.removeNode(this);
this.aj=null
}this.h=null;
delete aU[this.Ja]
};
var bU=".label",cU="treeitem",dU="level",eU="presentation",fU="group",gU="setsize",hU="posinset";
X[_P].zu=function () {
var a=this.c();
if(a) {
var b=this.bp();
if(b&&!b.id)b.id=this.Ja+bU;
zC(a,cU);
CC(a,
Cb,false);
CC(a,zR,false);
CC(a,dU,this.Ol());
if(b)CC(a,QC,b.id);
var c=this.Hj();
if(c)zC(c,eU);
var d=this.Dz();
if(d)zC(d,eU);
var e=this.Ml();
zC(e,fU);
var f=this.pd();
for(var g=1;g<=f;g++) {
	var a=this.Mc(g-1).c();
	CC(a,gU,f);
	CC(a,hU,g)
}
}
};
X[_P].f=function () {
var a;
if(F) {
var b=this.i.createElement(L);
Ya(b[u],Gx);
la[Ub].appendChild(b);
var c=new Vq;
this.yE(c);
n(b,c);
var d=b.removeChild(b[gc]);
la[Ub].removeChild(b);
a=d
}else {
var b=this.i.createElement(L),c=new Vq;
this.yE(c);
n(b,c);
a=b.removeChild(b[gc])
}this.h=
a;
return a
};
X[_P].t=function () {
X.b.t.call(this);
this.zu();
var a=this.Ab();
if(a)a.Yq(this)
};
var iU="Can only add nodes before siblings",jU="classic";
X[_P].add=function (a,b) {
var c,d=this.pd()==0,e=a.J(),f=b;
if(f==null) {
if(e!=null)e.remove(a);
c=this.Mz();
this.I(a)
}else {
if(b.J()!=this)throwi(iU);
if(e!=null)e.remove(a);
this.Ud(a,this.Wj(f))
}if(f) {
if(f==this.Mo)this.Mo=a;
a.wh=f.wh;
f.wh=a;
a.ik=f
}else {
if(!this.Mo)this.Mo=a;
if(this.Tp)this.Tp.ik=a;
a.wh=this.Tp;
this.Tp=a
}var g=this.Ab();
if(g)a.aj=g;
var h=
this.Ol();
if(h!=null)a.Mg=h+1;
if(this.z&&!g.rE) {
var j=this.Ml(),k=a.f(),m=f?f.c():null;
j.insertBefore(k,m);
if(this.z)a.t();
if(c)c.Ar();
if(d) {
	this.Ha(this.Ib());
	if(g&&g.n.rj!=jU)this.Yw()
}
}return a
};
var kU="Can only remove children";
La(X[_P],function (a) {
var b=this.Ab(),c=b?b.pc():null;
if(c==a||a.contains(c))if(b.hasFocus()) {
this.select();
at(this.L0,10,this)
}else this.select();
if(a.J()!=this)throwi(kU);
this.removeChild(a.l());
if(this.Tp==a)this.Tp=a.wh;
if(this.Mo==a)this.Mo=a[Hc];
if(a.wh)a.wh.ik=a.ik;
if(a.ik)a.ik.wh=a.wh;
var d=a.Hu();
a.aj=null;
a.Mg=null;
if(b&&this.z&&!b.rE) {
var e=this.Ml(),f=a.c();
e.removeChild(f);
a.h=null;
if(this.z)a.$();
if(d) {
	var g=this.Mz();
	if(g)g.Ar()
}if(!this.Oc()) {
	Ya(e[u],Gx);
	this.Ar();
	this.Yw()
}
}return a
});
X[_P].L0=function () {
this.select()
};
var lU="getTree called on BaseNode";
X[_P].Ab=function () {
throwi(lU);
};
var mU="getDepth called on BaseNode";
X[_P].Ol=function () {
throwi(mU);
};
Sa(X[_P],function (a) {
while(a) {
if(a==this)return true;
a=a.J()
}return false
});
X[_P].Zo=function () {
return this.Mc(0)
};
X[_P].Mz=function () {
return this.Mc(this.pd()-1)
};
X[_P].Hu=function () {
return this.ik==null
};
X[_P].$c=function () {
return this.Tv
};
X[_P].select=function () {
this.f4(true)
};
X[_P].f4=function () {
var a=this.Ab();
if(!a)return ;
a.Eb(this)
};
X[_P].KO=function (a) {
if(this.Tv==a)return ;
this.Tv=a;
this.bQ();
var b=this.Ab();
if(b.n.rj!=jU)this.Yw();
var c=this.c();
if(c) {
CC(c,Cb,a);
if(a)CC(b.c(),wC,this.Ja)
}
};
X[_P].Ib=function () {
return this.nc
};
X[_P].Ha=function (a) {
var b;
this.nc=a;
var c=this.Ab(),d=this.c();
if(this.Oc()) {
var e=
c?c.pc():null;
if(!a&&this.contains(e))this.select();
if(d) {
	b=this.Ml();
	if(b)Ya(b[u],a?GL:Gx);
	this.Ar()
}
}else {
b=this.Ml();
if(b)Ya(b[u],Gx)
}if(c&&c.n.rj==jU)this.Yw();
if(d)CC(d,zR,a)
};
X[_P].tr=function () {
this.Ha(!this.Ib())
};
X[_P].expand=function () {
this.Ha(true)
};
X[_P].collapse=function () {
this.Ha(false)
};
X[_P].QC=function () {
var a=this.J();
if(a) {
a.Ha(true);
a.QC()
}
};
var nU='" style="',oU="display:none;";
X[_P].yE=function (a) {
var b=this.Ab(),c=!b.eP||b==this.J()&&!b.fP,d=c?this.n.HS:this.n.GS;
a.g(sB,this.n.RS,
PF,this.Ja,K,this.UV(),sB,d,nU,this.nV(),this.Ib()&&this.Oc()?C:oU,K);
this.Zd(function (e) {
e.yE(a)
});
a.g(dR)
};
var pU='" style="padding-',qU="right:",rU="left:",sU='px">';
X[_P].UV=function () {
this.Ab();
var a=new Vq;
a.g(sB,this.Tt(),pU,this.fb()?qU:rU,l.max(0,(this.Ol()-1)*this.xK),sU,this.KI(),this.hV(),this.kV(),uB);
return a.toString ()
};
var tU=" selected";
X[_P].Tt=function () {
var a;
a=this.$c()?tU:C;
return this.n.US+a
};
var uU='" ',vU=" title=",wU="<span>";
X[_P].kV=function () {
var a=this.CE;
this.Ab();
var b=
new Vq;
b.g(KB,this.n.SS,uU,a?vU+eg(a)+uU:E,Zf,this.wK,TB,wU,this.UQ,TB);
return b.toString ()
};
var xU='<img class="',yU='" src="',zU='<img style="display:none"';
X[_P].hV=function () {
var a=this.tt();
return a?kg(xU,a,yU,this.n.vs,K):kg(zU,yU,this.n.vs,K)
};
var AU="getCalculatedIconClass called on Abstract Node";
X[_P].tt=function () {
throwi(AU);
};
var BU='<img type="expand" class="';
X[_P].KI=function () {
return kg(BU,this.JI(),yU,this.n.vs+K)
};
X[_P].JI=function () {
var a=this.Ab(),b=!a.eP||a==this.J()&&!a.fP,
c=this.n,d=new Vq;
d.g(this.n.rl,E,c.JS,E);
if(this.Oc()) {
var e=0;
if(a&&a.Y4)e=this.Ib()?2:1;
if(a&&!b)e+=this.Hu()?4:8;
switch(e) {
	case 1:d.g(c.NS);
	break;
	case 2:d.g(c.MS);
	break;
	case 4:d.g(c.UG);
	break;
	case 5:d.g(c.LS);
	break;
	case 6:d.g(c.KS);
	break;
	case 8:d.g(c.VG);
	break;
	case 9:d.g(c.PS);
	break;
	case 10:d.g(c.OS);
	break;
	default:d.g(c.TG)
}
}else if(a&&b)d.g(c.TG);
else if(this.Hu())d.g(c.UG);
else d.g(c.VG);
return d.toString ()
};
var CU="background-position:",DU=";";
X[_P].nV=function () {
return kg(CU,this.TI(),DU)
};
var EU="-100",FU="px 0";
X[_P].TI=function () {
return (this.Hu()?EU:(this.Ol()-1)*this.xK)+FU
};
X[_P].c=function () {
if(!this.h)this.h=this.i.c(this.Ja);
return this.h
};
X[_P].jp=function () {
var a=this.c();
if(!a)return null;
return a[gc]
};
X[_P].Dz=function () {
var a=this.jp();
return a?a[gc]:null
};
X[_P].Hj=function () {
var a=this.jp();
return a?a[vc][1]:null
};
X[_P].bp=function () {
var a=this.jp();
return a&&a[$b]?a[$b][fb]:null
};
X[_P].Ml=function () {
var a=this.c();
return a?a[$b]:null
};
X[_P].hw=function (a) {
this.wK=a;
var b=
this.bp();
if(b) {
n(b,a);
var c=this.Ab();
if(c)c.Yq(this)
}
};
var GU="Upate not yet supported";
X[_P].ha=function () {
throwi(GU);
};
X[_P].bQ=function () {
var a=this.jp();
if(a)va(a,this.Tt())
};
X[_P].Ar=function () {
var a=this.Ab();
if(a.rE)return ;
var b=this.Dz();
va(b,this.JI());
var c=this.Ml();
c[u].backgroundPosition=this.TI()
};
X[_P].Yw=function () {
var a=this.Ab();
if(a.rE)return ;
var b=this.Hj();
if(b)va(b,this.tt())
};
var HU="expand";
X[_P].jC=function (a) {
var b=a[v],c=b.getAttribute(tc);
if(c==HU&&this.Oc()) {
this.tr();
return
}this.select();
this.bQ()
};
X[_P].hC=function (a) {
a.preventDefault()
};
X[_P].D0=function (a) {
var b=a[v]||a.srcElement,c=b.getAttribute(tc);
if(c==HU&&this.Oc())return ;
this.tr()
};
X[_P].lk=function (a) {
var b=true,c;
switch(a[fc]) {
case 39:if(a[gb])break;
if(this.Oc())if(!this.Ib())this.Ha(true);
else this.Zo().select();
break;
case 37:if(a[gb])break;
if(this.Oc()&&this.Ib())this.Ha(false);
else {
	var d=this.J(),e=this.Ab();
	if(d&&(e.hr||d!=e))d.select()
}break;
case 40:c=this.vV();
if(c)c.select();
break;
case 38:c=
this.JV();
if(c)c.select();
break;
default:b=false
}if(b) {
a.preventDefault();
var e=this.Ab();
if(e)e.TR()
}return b
};
X[_P].RI=function () {
if(!this.Ib()||!this.Oc())return this;
return this.Mz().RI()
};
X[_P].vV=function () {
if(this.Oc()&&this.Ib())return this.Zo();
else {
var a=this,b;
while(a!=null) {
	b=a.ik;
	if(b!=null)return b;
	a=a.J()
}return null
}
};
X[_P].JV=function () {
var a=this.wh;
if(a!=null)return a.RI();
var b=this.J(),c=this.Ab();
if(!c.hr&&b==c)return null;
return b
};
var IU=function (a,b,c) {
X.call(this,a,b,c)
};
A(IU,X);
IU[_P].aj=null;
IU[_P].Ol=function () {
if(this.Mg!=null)return this.Mg;
var a=0,b=this.J();
while(b!=null) {
a++;
b=b.J()
}this.Mg=a;
return a
};
IU[_P].Ab=function () {
if(this.aj)return this.aj;
var a=this.J();
if(a)return this.aj=a.Ab();
return null
};
IU[_P].tt=function () {
var a=this.Ab()?this.Ab().n.rj:this.n.rj,b=a==jU&&this.Ib()||a!=jU&&this.$c();
if(b&&this.Zy)return this.Zy;
if(!b&&this.XA)return this.XA;
if(this.Oc()) {
if(b&&this.n.WG)return this.n.rl+E+this.n.WG;
else if(!b&&this.n.RG)return this.n.rl+E+this.n.RG
}else if(this.n.YG)return this.n.rl+E+this.n.YG;
return C
};
var JU=function (a) {
this.Zb={
};
if(a)this.a3(a)
};
JU[_P].xa=undefined;
JU[_P].k=function (a,b) {
this.DO(a,b,false)
};
JU[_P].add=function (a,b) {
this.DO(a,b,true)
};
var KU='The collection already contains the key "';
JU[_P].DO=function (a,b,c) {
var d=this;
for(var e=0;e<a[o];e++) {
var f=a.charAt(e);
if(!d.Zb[f])d.Zb[f]=new JU;
d=d.Zb[f]
}if(c&&d.xa!==undefined)throwi(KU+a+Zd);
else d.xa=b
};
JU[_P].a3=function (a) {
var b=Yg(a),c=Xg(a);
for(var d=0;d<b[o];d++)this.k(b[d],c[d])
};JU[_P].o=function (a) {
var b=this;
for(var c=0;c<
a[o];c++) {
var d=a.charAt(c);
if(!b.Zb[d])return undefined;
b=b.Zb[d]
}return b.xa
};
JU[_P].ca=function () {
var a=[];
this.AJ(a);
return a
};
JU[_P].AJ=function (a) {
if(this.xa!==undefined)a.push(this.xa);
for(var b in this.Zb)this.Zb[b].AJ(a)
};JU[_P].Nc=function (a) {
var b=[];
if(a) {
var c=this;
for(var d=0;d<a[o];d++) {
	var e=a.charAt(d);
	if(!c.Zb[e])return [];
	c=c.Zb[e]
}c.Lz(a,b)
}else this.Lz(C,b);
return b
};
JU[_P].Lz=function (a,b) {
if(this.xa!==undefined)b.push(a);
for(var c in this.Zb)this.Zb[c].Lz(a+c,b)
};JU[_P].Da=function (a) {
return this.o(a)!==
undefined
};
JU[_P].Xh=function (a) {
if(this.xa===a)return true;
for(var b in this.Zb)if(this.Zb[b].Xh(a))return true;return false
};Ua(JU[_P],function () {
this.Zb={
};
this.xa=undefined
});
var LU='The collection does not have the key "';
La(JU[_P],function (a) {
var b=this,c=[];
for(var d=0;d<a[o];d++) {
var e=a.charAt(d);
if(!b.Zb[e])throwi(LU+a+Zd);
c.push([b,e]);
b=b.Zb[e]
}var f=b.xa;
delete b.xa;
while(c[o]>0) {
var g=c.pop(),h=g[0],e=g[1];
if(of(h.Zb[e].Zb))delete h.Zb[e];
else break
}return f
});
JU[_P].Ca=function () {
return new JU(this)
};
JU[_P].D=function () {
return Wg(this.ca())
};
JU[_P].Qa=function () {
return this.xa===undefined&&$g(this.Zb)
};
var MU=function () {
this.Qc=new JU
};
MU[_P].Qc=null;
MU[_P].Yb=C;
MU[_P].LB=null;
MU[_P].dv=null;
MU[_P].gq=0;
MU[_P].om=0;
MU[_P].$X=function (a) {
var b=false;
switch(a[fc]) {
case 40:case 38:if(a[xb]) {
	this.s_(a[fc]==40?1:-1);
	b=true
}break;
case 8:var c=this.Yb[o]-1;
b=true;
if(c>0) {
	this.Yb=this.Yb.substring(0,c);
	this.ZK(this.Yb)
}else if(c==0)this.Yb=C;
else b=false;
break;
case 27:this.Yb=C;
b=true;
break
}return b
};
var NU="~",OU="\u0080",PU="\ufffd";
MU[_P].UY=function (a) {
var b=false;
if(!a[xb]&&!a[gb]) {
var c=fa.fromCharCode(a[fc]).toLowerCase();
if((c[o]==1&&c>=E&&c<=NU||c>=OU&&c<=PU)&&(c!=E||!(!this.Yb))) {
	this.Yb+=c;
	b=this.ZK(this.Yb)
}
}return b
};
MU[_P].U3=function (a) {
var b=a.bp();
if(b) {
var c=cx(b);
if(!Hf(c)) {
	c=c.toLowerCase();
	a.l();
	var d=this.Qc.o(c);
	if(d)d.push(a);
	else {
		var e=[a];
		this.Qc.k(c,e)
	}
}
}
};
MU[_P].c2=function (a) {
var b=a.bp();
if(b) {
var c=cx(b);
if(!Hf(c)) {
	c=c.toLowerCase();
	var d=this.Qc.o(c);
	if(d) {
		Te(d,a);
		if(!(!d[o]))this.Qc.remove(c)
	}
}
}
};
MU[_P].ZK=function (a) {
var b=false,c=this.Qc.Nc(a);
if(c&&c[o]) {
this.om=0;
this.gq=0;
var d=this.Qc.o(c[0]);
if(b=this.RN(d))this.LB=c
}return b
};
MU[_P].s_=function (a) {
var b=false,c=this.LB;
if(c) {
var d,e=false;
if(this.dv) {
	var f=this.om+a;
	if(f>=0&&f<this.dv[o]) {
		this.om=f;
		d=this.dv
	}else e=true
}if(!d) {
	var g=this.gq+a;
	if(g>=0&&g<c[o])this.gq=g;
	if(c[o]>this.gq)d=this.Qc.o(c[this.gq]);
	if(d&&d[o]&&e)this.om=a==-1?d[o]-1:0
}if(b=this.RN(d))this.LB=c
}return b
};
MU[_P].RN=function (a) {
var b;
if(a) {
if(this.om<a[o]) {
	b=a[this.om];
	this.dv=a
}if(b) {
	b.QC();
	b.select()
}
}return !(!b)
};
Ua(MU[_P],function () {
this.Yb=C
});
var QU="6",RU="BackgroundImageCache",SU="Failed to enable background image cache",TU=function (a,b,c) {
X.call(this,a,b,c);
this.Db=this;
if(F&&Lg(QU))try{
la.execCommand(RU,false,true)
}catch(d) {
this.w.cl(SU)
}
};
A(TU,X);
TU[_P].m=null;
TU[_P].sb=null;
var UU="goog.ui.tree.TreeControl";
TU[_P].w=Lk(UU);
TU[_P].im=null;
TU[_P].nc=true;
TU[_P].Tv=true;
TU[_P].hz=false;
TU[_P].aU=null;
TU[_P].eP=true;
TU[_P].Y4=true;
TU[_P].hr=true;
TU[_P].fP=true;
TU[_P].Hh=null;
TU[_P].Ab=function () {
return this
};
TU[_P].Ol=function () {
return 0
};
TU[_P].QC=function () {
};
TU[_P].pA=function () {
this.hz=true;
N(this.h,JR);
if(this.Db)this.Db.select()
};
TU[_P].kA=function () {
this.hz=false;
cz(this.h,JR)
};
TU[_P].hasFocus=function () {
return this.hz
};
TU[_P].Ib=function () {
return !this.hr||TU.b.Ib.call(this)
};
TU[_P].Ha=function (a) {
if(!this.hr)this.nc=a;
else TU.b.Ha.call(this,a)
};
TU[_P].KI=function () {
return C
};
TU[_P].Hj=function () {
var a=this.jp();
return a?a[gc]:null
};
TU[_P].Dz=function () {
return null
};
TU[_P].Ar=function () {
};
TU[_P].Tt=function () {
return TU.b.Tt.call(this)+
(this.hr?C:E+this.n.QS)
};
TU[_P].tt=function () {
var a=this.Ab()?this.Ab().n.rj:this.n.rj,b=a==jU&&this.Ib()||a!=jU&&this.$c();
if(b&&this.Zy)return this.Zy;
if(!b&&this.XA)return this.XA;
if(b&&this.n.XG)return this.n.rl+E+this.n.XG;
else if(!b&&this.n.SG)return this.n.rl+E+this.n.SG;
return C
};
TU[_P].Eb=function (a) {
if(this.Db==a)return ;
var b=false;
if(this.Db) {
b=this.Db==this.aU;
this.Db.KO(false)
}this.Db=a;
if(this.Db) {
this.Db.KO(true);
if(b)this.Db.select()
}this.dispatchEvent(Qz)
};
TU[_P].pc=function () {
return this.Db
};
var VU="tree";
TU[_P].zu=function () {
TU.b.zu.call(this);
var a=this.c();
zC(a,VU);
CC(a,QC,this.bp().id)
};
TU[_P].f=function () {
this.Hh=new MU;
var a=TU.b.f.call(this);
this.im=this.im||a;
return a
};
var WU="hideFocus";
TU[_P].t=function () {
TU.b.t.call(this);
va(this.h,this.n.TS);
this.h.setAttribute(WU,true);
this.Ln();
this.zu()
};
TU[_P].$=function () {
TU.b.$.call(this);
this.sj()
};
TU[_P].Ln=function () {
this.sb=new GO(this.h);
var a=new $i(this);
a.d(this.im,Si,this.kA);
a.d(this.im,Ti,this.pA);
a.d(this.sb,MO,this.rc);
a.d(this.h,Ji,this.tA);
a.d(this.h,Ii,this.tA);
a.d(this.h,GN,this.tA);
Ta(this.h,0);
this.m=a
};
TU[_P].sj=function () {
if(this.m) {
this.m.j();
this.m=null
}if(this.sb) {
this.sb.j();
this.sb=null
}
};
var XU="Received event ";
TU[_P].tA=function (a) {
this.w.Cj(XU+a[x]);
var b=this.zV(a);
if(b)switch(a[x]) {
case Ji:b.jC(a);
break;
case Ii:b.hC(a);
break;
case GN:b.D0(a);
break
}
};
TU[_P].rc=function (a) {
var b=false;
b=this.Hh.$X(a)||this.Db&&this.Db.lk(a)||this.Hh.UY(a);
if(b)a.preventDefault();
return b
};
TU[_P].zV=function (a) {
var b=
null,c=a[v];
while(c!=null) {
var d=c.id;
b=aU[d];
if(b)return b;
if(c==this.c())break;
c=c[Dc]
}return null
};
TU[_P].createNode=function (a) {
return new IU(a,this.n,this.i)
};
TU[_P].Yq=function (a) {
if(this.Hh)this.Hh.U3(a)
};
TU[_P].removeNode=function (a) {
if(this.Hh)this.Hh.c2(a)
};
TU[_P].TR=function () {
if(this.Hh)this.Hh.clear()
};
var YU="goog-tree-expanded-folder-icon",ZU="goog-tree-collapsed-folder-icon",$T={
vs:"images/cleardot.gif",eT:"Tree Item",rj:jU,TS:"goog-tree-root goog-tree-item",QS:"goog-tree-hide-root",
RS:"goog-tree-item",GS:"goog-tree-children",HS:"goog-tree-children-nolines",US:"goog-tree-row",SS:"goog-tree-item-label",rl:"goog-tree-icon",JS:"goog-tree-expand-icon",NS:"goog-tree-expand-icon-plus",MS:"goog-tree-expand-icon-minus",PS:"goog-tree-expand-icon-tplus",OS:"goog-tree-expand-icon-tminus",LS:"goog-tree-expand-icon-lplus",KS:"goog-tree-expand-icon-lminus",VG:"goog-tree-expand-icon-t",UG:"goog-tree-expand-icon-l",TG:"goog-tree-expand-icon-blank",WG:YU,RG:ZU,YG:"goog-tree-file-icon",XG:YU,
SG:ZU
};
var $U=function (a,b,c) {
TU.call(this,a,b,c);
this.Eb(null)
};
A($U,TU);
$U[_P].Ha=function (a) {
if(a)$U.b.Ha.call(this,true)
};
$U[_P].select=function () {
$U.b.select.call(this);
this.dispatchEvent(new aV(aA,eq,this))
};
var bV="deselect",cV="message-node";
$U[_P].Eb=function (a) {
var b=this.pc();
$U.b.Eb.call(this,a);
var c=a&&a.vf(),d=b&&b.vf();
if(b&&b!=a&&b==this)this.dispatchEvent(new aV(bV,eq,this));
else if(!d&&c)this.dispatchEvent(new aV(aA,cV,this));
else if(d&&!c)this.dispatchEvent(new aV(bV,cV,this))
};
$U[_P].vf=
function () {
return false
};
var aV=function (a,b,c) {
H.call(this,a,b);
this.g8=c
};
A(aV,H);
var dV=function (a,b,c,d) {
IU.call(this,a,b,d);
this.U_=c
};
A(dV,IU);
dV[_P].ya=true;
dV[_P].f=function () {
var a=dV.b.f.call(this);
this.s(this.ya);
return a
};
dV[_P].vf=function () {
return this.U_
};
var eV="collapsed";
dV[_P].Ha=function (a) {
dV.b.Ha.call(this,a);
this.dispatchEvent(a?zR:eV)
};
dV[_P].s=function (a) {
this.ya=a;
var b=this.c();
if(b)Ya(b[u],a?C:Gx)
};
var fV=function (a,b,c,d,e) {
YT.call(this,a,b,jd(c),e);
this.Ju=!jd(c);
this.xN=d;
this.Rc=c||this.FS();
if(this.Ju)this.I(this.Rc);
this.Qc=new D
};
A(fV,YT);
fV[_P].jQ=false;
fV[_P].Fj=function () {
return C
};
fV[_P].kJ=function () {
return C
};
fV[_P].eA=function () {
var a=$T;
a.vs=this.getContext().n.VR;
return a
};
fV[_P].f=function () {
var a=this.i,b=this.h=a.f(L,{
"class":this.Fj()
});
if(this.Ju) {
N(b,this.kJ());
this.ID(true);
this.Rc.ub(b)
}
};
fV[_P].ID=function (a,b) {
if(this.Ju)this.Rc.hw(this.lJ(b?b:this.xN,a))
};
fV[_P].FS=
function () {
return new $U(this.xN,this.eA(),this.i)
};
fV[_P].fc=function () {
fV.b.fc.call(this);
var a=this.Rc;
bh(this.Qc.ca(),function (e) {
a.remove(e)
},this);
this.Qc.clear();
var b=this.wc;
bh(b.ca(),function (e) {
this.removeChild(e,true)
},this);
b.clear();
this.QR();
var c=this.bg(),d=a.Zo();
if(d&&d.vf())if(c[o]==0) {
d.hw(this.Tz());
d.s(true)
}else d.s(false);
this.appendData(c);
this.tw()
};
fV[_P].Tz=function () {
return C
};
fV[_P].UI=function () {
return C
};
fV[_P].s=function (a) {
if(a&&!this.jQ) {
this.jQ=true;
this.tw()
}
};
fV[_P].og=function (a) {
var b=this.Qc,c=b.o(a),d=this.Rc;
if(b.remove(a))d.remove(c);
var e=this.wc,f=this.xt(a).T(),g=e.o(f);
if(e.remove(f))this.removeChild(g,true);
if(b.Qa()) {
var h=d.Zo();
if(h&&h.vf()) {
	h.hw(this.Tz());
	h.s(true)
}
}
};
Ma(fV[_P],function (a) {
var b=this.wb,c=a[o],d=this.Rc;
if(c>0) {
var e=d.Zo();
if(e&&e.vf())e.s(false)
}var f=this.Qc;
for(var g=0;g<c;g++) {
var h=a[g],j=this.Gd(h);
d.add(j);
this.rF(j);
f.k(h.l(),j);
b.add(h)
}
});
fV[_P].ng=function (a) {
var b=this.wb;
if(!b.o(a.Bc()))b.add(a);
var c=this.Qc.o(a.l());
if(c)this.tb(c,a);
else {
c=this.Gd(a);
this.Rc.add(c);
this.rF(c);
this.Qc.k(a.l(),c)
}
};
fV[_P].Gd=function (a) {
var b=new dV(null,this.eA(),false,this.i);
this.tb(b,a);
var c=this.za();
c.d(b,zR,this.TY);
c.d(b,eV,this.SY);
return b
};
fV[_P].rF=function (a) {
var b=this.M7=new dV(this.UI(),this.eA(),true,this.i);
a.add(b)
};
fV[_P].tb=function () {
};
fV[_P].xt=function () {
return null
};
fV[_P].lJ=function () {
return C
};
fV[_P].TY=function (a) {
var b=this.i,c=a[v];
if(c.vf())return ;
var d=c.Y,e=this.wc,f=this.xt(d),g=f.T();
if(!e.Da(g)) {
var h=
this.zG(null,c,null);
e.k(g,h);
h.setActive(true);
h.Tc(f,true);
this.I(h);
h.f();
b.appendChild(this.h,h.c());
h.uw(this.xn);
if(this.z)h.t()
}this.$m(g,true);
a.stopPropagation()
};
fV[_P].zG=function () {
return null
};
fV[_P].SY=function (a) {
var b=a[v];
if(b.vf())return ;
var c=b.Y,d=this.xt(c);
this.$m(d.T(),false);
a.stopPropagation()
};
fV[_P].e=function () {
fV.b.e.call(this);
if(this.Ju) {
this.Rc.j();
this.Rc=null
}this.Qc.clear();
this.Qc=null
};
var gV=cB,hV="treedoclistview-spacing";
var iV="treedoclistview-node-icon",jV="treedoclistview-node-name",kV=" &nbsp;</span>",lV=function (a,b) {
var c=b||new Q;
c.g(KB,gV,CB,hV,eO,gV,CB,iV,EB,a.sf,FB,gV,CB,hV,eO,jV,K,oB(a.R.q()),kV);
if(!b)return c.toString ()
},mV="treedoclistview-root-node-name",nV="  treedoclistview-disabled-root-node-name",oV=function (a,b) {
var c=b||new Q;
c.g(KB,mV,!a[jc]?nV:C,K,oB(a[Cc]),kV);
if(!b)return c.toString ()
},pV="treedoclistview-node-message",qV=function (a,b) {
var c=b||new Q;
c.g(KB,pV,K,oB(a[Nb]),TB);
if(!b)return c.toString ()
};
var rV=function (a,b,c,d,e) {
fV.call(this,a,b,c,d,e)
};
A(rV,fV);
var sV="treedoclistview";
rV[_P].ja=sV;
var tV="treedoclistview-root";
rV[_P].w2=tV;
var uV=z(KK),vV="Loading items...",wV=z(vV);
rV[_P].Fj=function () {
return this.ja
};
rV[_P].kJ=function () {
return this.w2
};
rV[_P].t=function () {
rV.b.t.call(this);
this.setActive(true);
this.qL()
};
rV[_P].tb=function (a,b) {
a.hw(lV({
R:b,sf:Sp(b)
}));
a.A(b.l())
};
rV[_P].lJ=function (a,b) {
return oV({
enabled:b,name:a
})
};
rV[_P].xt=function (a) {
return new Co(2,{
mimeTypes:[SJ],parent:a
})
};
rV[_P].Tz=function () {
return qV({
message:uV
})
};
rV[_P].UI=function () {
return qV({
message:wV
})
};
rV[_P].zG=function (a,b,c) {
return new rV(this.getContext(),a,b,c,this.i)
};
var xV="modal-dialog-ie",yV="Remove from current folder",AV=function (a,b,c) {
R.call(this,F?xV:undefined,undefined,c);
this.bb=a;
this.da=b;
var d;
if(a==zV) {
var e=z(yV);
d=e
}else {
var f=z(kK);
d=f
}var g=new rV(b,null,null,d,c);
this.I(g);
this.jd=g;
var h=new $i(this);
this.zy=h;
h.d(this,aD,this.lA);
this.lb(this.ib());
this.R3(false);
this.u3(false)
};
A(AV,R);
var BV="movetofolder-dialog-make-folder";
AV[_P].G_=BV;
var CV="movetofolder-dialog-title";
AV[_P].EP=CV;
var DV="movetofolder-dialog-title-text";
AV[_P].FP=DV;
var EV="movetofolder-dialog-title-text-begin";
AV[_P].U5=EV;
var FV="movetofolder-dialog";
AV[_P].Ve=FV;
var GV="movetofolder-dialog-ie";
AV[_P].xu=GV;
var HV="movetofolder-dialog-tree-view-ie";
AV[_P].wZ=HV;
AV[_P].eq=null;
AV[_P].lq=null;
AV[_P].ox=null;
AV[_P].Us=null;
AV[_P].fs=null;
AV[_P].Rr=null;
AV[_P].Fv=null;
AV[_P].M2=null;
AV[_P].Rv=null;
AV[_P].vo=null;
var IV="move_to_folder",JV="select_folder",KV=IV,LV="add_to_folder",MV="remove_from_folder",NV=JV,OV="select_all_items",PV=JV,QV="search_all_items",zV=
IV,RV="search_folder";
Qa(AV[_P],function () {
return this.da
});
AV[_P].ib=function () {
var a=this.QI(),b=this.jd.Rc,c=b.pc(),d=this.bb;
switch(d) {
case zV:if(b.$c())return a?this.NV():this.yI();
else if(c&&c.vf())return this.yI();
else if(a)return this.tU();
return this.PU();
case RV:if(b.$c()||c&&!c.vf())return this.pJ();
else if(c&&c.vf())return this.XV();
return this.pJ()
}
};
var SV="Move to folder",TV="Select",UV="Search all items";
AV[_P].$d=function (a) {
switch(a) {
case KV:var b=z(SV);
return b;
case LV:var c=z(fM);
return c;
case MV:var d=z(hM);
return d;
case NV:var e=z(TV);
return e;
case OV:var f=z(UV);
return f;
case bD:default:var g=z(eD);
return g
}
};
AV[_P].PU=function () {
if(!this.Us) {
var a=this.Us=new VC(this.i);
a.k(KV,this.$d(KV));
a.k(bD,this.$d(bD),false,true)
}return this.Us
};
AV[_P].yI=function () {
if(!this.fs) {
var a=this.fs=new VC(this.i);
a.k(bD,this.$d(bD),false,true)
}return this.fs
};
AV[_P].tU=function () {
if(!this.Rr) {
var a=this.Rr=new VC(this.i);
a.k(KV,this.$d(KV));
a.k(LV,this.$d(LV));
a.k(bD,this.$d(bD),false,
true)
}return this.Rr
};
AV[_P].NV=function () {
if(!this.Fv) {
var a=this.Fv=new VC(this.i);
a.k(MV,this.$d(MV));
a.k(bD,this.$d(bD),false,true)
}return this.Fv
};
AV[_P].pJ=function () {
if(!this.QN) {
var a=this.QN=new VC(this.i);
a.k(NV,this.$d(NV));
a.k(OV,this.$d(OV),false,true);
a.k(bD,this.$d(bD),false,true)
}return this.QN
};
AV[_P].XV=function () {
if(!this.Rv) {
var a=this.Rv=new VC(this.i);
a.k(OV,this.$d(OV),false,true);
a.k(bD,this.$d(bD),false,true)
}return this.Rv
};
AV[_P].QI=function () {
var a=this.ox,b=this.getContext().ea;
return a&&a.J()||!b.Pj().Qa()
};
AV[_P].f=function () {
AV.b.f.call(this);
N(this.c(),F?this.xu:this.Ve);
var a=this.i,b=this.fa(),c=this.jd;
c.f();
if(F)N(c.c(),this.wZ);
a.appendChild(b,c.c());
this.eq=this.xS();
Ya(this.eq[u],Gx);
a.appendChild(b,this.eq)
};
var VV="Make a new folder";
AV[_P].xS=function () {
var a=z(VV);
return this.i.f(L,{
"class":this.G_
},a)
};
AV[_P].t=function () {
AV.b.t.call(this);
var a=this.zy;
a.d(this.eq,fi,this.LX);
a.d(this.da.Pa,QN,this.pf);
var b=this.jd.Rc;
a.d(b,aA,this.HJ);
a.d(b,bV,this.HJ)
};
AV[_P].LX=function () {
};
AV[_P].lA=function (a) {
switch(a.jb) {
case KV:var b=this.jd,c=b.Rc.pc();
if(c) {
	this.da.na.UX(c.Y,this.vo);
	this.s(false)
}else a.preventDefault();
break;
case LV:var b=this.jd,c=b.Rc.pc();
if(c) {
	this.da.na.yW(c.Y,this.vo);
	this.s(false)
}else a.preventDefault();
break;
case MV:this.da.na.mY(this.vo);
this.s(false);
break;
case NV:var d=this.jd.Rc,c=d.pc();
if(d.$c()||c) {
	this.dispatchEvent(PV);
	this.s(false)
}else a.preventDefault();
break;
case OV:this.dispatchEvent(QV);
this.s(false);
break;
default:this.s(false);
break
}
};
AV[_P].pf=function (a) {
this.ox=a.Bg.ua();
if(this.La())this.lb(this.ib());
else this.lN=true
};
AV[_P].HJ=function () {
this.lb(this.ib())
};
var WV="Move: ",XV="{$moveMsg} {$item}",YV="No items selected",ZV="{$moveMsg} {$num} items",$V="Current folder: none",aW="Search folders";
AV[_P].s=function (a,b) {
AV.b.s.call(this,a);
var c=this.bb;
switch(c) {
case zV:this.vo=b;
if(a) {
	var d=this.getContext().ea.cc(),e=d[o],f=this.lq;
	if(!f) {
		f=this.lq=this.i.f(KC,{
			"class":this.FP
		});
		this.yJ().appendChild(f);
		N(this.lf(),
		this.EP)
	}var g=z(WV),h=this.QU(g),j;
	if(b) {
		var k=z(XV,{
			moveMsg:h,item:lV({
				R:b,sf:Sp(b)
			})
		});
		n(f,k);
		j=!this.getContext().ea.gA(b).Qa()
	}else {
		switch(e) {
			case 0:var m=z(YV);
			n(f,m);
			break;
			case 1:var p=d[0],q=z(XV,{
				moveMsg:h,item:lV({
					R:p,sf:Sp(p)
				})
			});
			n(f,q);
			break;
			default:var t=z(ZV,{
				moveMsg:h,num:e
			});
			n(f,t);
			break
		}j=this.QI()
	}if(j)this.jd.ID(true);
	else {
		var w=z($V);
		this.jd.ID(false,w)
	}if(this.lN||this.jd.Rc.$c())this.lb(this.ib())
}break;
case RV:var f=this.lq;
if(!f) {
	f=this.lq=this.i.f(KC,{
		"class":this.FP
	});
	this.yJ().appendChild(f);
	N(this.lf(),this.EP);
	var $=z(aW);
	n(f,$)
}if(this.lN||this.jd.Rc.$c())this.lb(this.ib());
break
}var za=this.jd;
za.s(a);
za.setActive(a);
if(!a)this.dispatchEvent(eA)
};
AV[_P].gc=function () {
};
AV[_P].QU=function (a) {
return kg(KB,this.U5,K,a,TB)
};
AV[_P].e=function () {
AV.b.e.call(this);
this.da=null;
this.eq=null;
this.lq=null;
this.ox=null;
this.Us=null;
this.Rr=null;
this.Fv=null;
this.fs=null;
this.M2=null;
this.Rv=null;
this.vo=null;
this.jd.j();
this.jd=null;
this.zy.j();
this.zy=null
};
var bW=function () {
uR.call(this)
};
A(bW,uR);
var cW=null;
bW[_P].Ge=function () {
return Hb
};
bW[_P].f=function (a) {
var b={
},c=this.Gj(a);
if(c)b[vw]=c.join(E);
if(!a.Wa())b.disabled=true;
if(a.Zc())b.title=a.Zc();
if(a.p())b.value=a.p();
return a.i.f(Hb,b,a.Ro()||C)
};
var dW="INPUT",eW="reset";
bW[_P].Na=function (a) {
return a[xc]==ZC||a[xc]==dW&&(a[x]==Hb||a[x]==uv||a[x]==eW)
};
bW[_P].Q=function (a,b) {
b=bW.b.Q.call(this,a,b);
a.TD(this.Zc(b));
a.v4(this.p(b));
if(b.disabled) {
a.QD(a.hc|1);
N(b,this.So(1))
}return b
};
bW[_P].Qd=
function (a,b,c) {
bW.b.Qd.call(this,a,b,c);
if(b==1) {
var d=a.c();
if(d&&(d[xc]==ZC||d[xc]==dW))Ba(d,c)
}
};
bW[_P].p=function (a) {
return a&&a[s]
};
bW[_P].sa=function (a,b) {
if(a&&(a[xc]==ZC||a[xc]==dW))Aa(a,b)
};
bW[_P].Zc=function (a) {
return a&&a[jb]
};
bW[_P].wg=function (a,b) {
if(a)ta(a,b)
};
var fW="-collapse-right",gW="-collapse-left";
bW[_P].Ch=function (a,b) {
var c=a.fb(),d=this.H()+(c?fW:gW),e=this.H()+(c?gW:fW);
a.PH(d,b&1);
a.PH(e,b&2)
};
var hW="goog-button";
bW[_P].H=function () {
return hW
};
var iW=function (a,b,c) {
U.call(this,a,b||cW||(cW=new bW),c)
};
A(iW,U);
iW[_P].xa=null;
iW[_P].xe=null;
iW[_P].p=function () {
return this.xa
};
iW[_P].sa=function (a) {
this.xa=a;
this.r.sa(this.c(),a)
};
iW[_P].v4=function (a) {
this.xa=a
};
iW[_P].Zc=function () {
return this.xe
};
iW[_P].wg=function (a) {
this.xe=a;
this.r.wg(this.c(),a)
};
iW[_P].TD=function (a) {
this.xe=a
};
iW[_P].Ch=function (a) {
this.r.Ch(this,a)
};
iW[_P].e=function () {
iW.b.e.call(this);
this.xa=null;
this.xe=null
};
LR(hW,function () {
return new iW(null)
});
iW[_P].rc=
function (a) {
return this.Wa()&&(a[fc]==13||a[fc]==32)&&this.mg(a)
};
var jW=function () {
bW.call(this)
};
A(jW,bW);
var kW=null;
var lW="goog-inline-block ";
jW[_P].f=function (a) {
var b=this.Gj(a),c={
"class":lW+b.join(E),title:a.Zc()||C
};
return a.i.f(L,c,this.Os(a.ac(),a.i))
};
jW[_P].fa=function (a) {
return a&&a[gc]&&a[gc][gc]
};
var mW="-outer-box",nW="-inner-box";
jW[_P].Os=function (a,b) {
var c=lW+this.H();
return b.f(L,{
"class":c+mW
},b.f(L,{
"class":c+nW
},a))
};
jW[_P].Na=function (a) {
return a[xc]==UC
};
jW[_P].bZ=function (a,b) {
var c=a.i.ka(b);
if(c&&c[nb].indexOf(this.H()+mW)!=-1) {
var d=
a.i.ka(c);
if(d&&d[nb].indexOf(this.H()+nW)!=-1)return true
}return false
};
jW[_P].Q=function (a,b) {
oW(b,true);
oW(b,false);
if(!this.bZ(a,b))b.appendChild(this.Os(b[vc],a.i));
N(b,cB,this.H());
return jW.b.Q.call(this,a,b)
};
var pW="goog-custom-button";
jW[_P].H=function () {
return pW
};
var oW=function (a,b) {
if(a) {
var c=b?a[gc]:a[$b],d;
while(c&&c[Dc]==a) {
	d=b?c[Hc]:c[fb];
	if(c[ub]==3) {
		var e=c[Nc];
		if(Kf(e)==C)a.removeChild(c);
		else {
			c.nodeValue=b?e.replace(/^[\s\xa0]+/,C):Lf(e);
			break
		}
	}else break;
	c=d
}
}
};
var qW=function () {
jW.call(this)
};
A(qW,jW);
var rW=null;
qW[_P].Ge=function () {
return eP
};
qW[_P].fa=function (a) {
return qW.b.fa.call(this,a&&a[gc])
};
qW[_P].Q=function (a,b) {
var c=uw(el,wS,b)[0];
if(c) {
M(c,false);
Iw(ow(c)[Ub],c);
var d=new yS;
d.Q(c);
a.dd(d)
}return qW.b.Q.call(this,a,b)
};
qW[_P].Os=function (a,b) {
return qW.b.Os.call(this,[this.createCaption(a,b),this.pS(b)],b)
};
qW[_P].createCaption=function (a,b) {
return b.f(L,{
"class":lW+this.H()+nR
},a)
};
var sW="-dropdown",tW="\u00a0";
qW[_P].pS=function (a) {
return a.f(L,
{
"class":lW+this.H()+sW
},tW)
};
var uW="goog-menu-button";
qW[_P].H=function () {
return uW
};
var vW=function (a,b,c,d) {
iW.call(this,a,c||rW||(rW=new qW),d);
this.Rd(64,true);
this.dd(b)
};
A(vW,iW);
vW[_P].B=null;
vW[_P].gl=true;
vW[_P].OA=true;
vW[_P].t=function () {
vW.b.t.call(this);
if(this.B)this.EF(this.B)
};
vW[_P].$=function () {
vW.b.$.call(this);
if(this.B) {
this.ra(false);
this.B.$();
var a=this.B.c();
if(a)Mw(a)
}
};
vW[_P].e=function () {
vW.b.e.call(this);
if(this.B) {
this.B.j();
this.B=null
}
};
vW[_P].ee=function (a) {
vW.b.ee.call(this,a);
if(this.je()) {
this.ra(!this.isOpen());
if(this.B)this.B.Dh(this.isOpen())
}
};
vW[_P].ou=function (a) {
vW.b.ou.call(this,a);
if(this.B) {
if(!this.je())this.B.Dh(false);
if(this.B.Vr&&this.B.Tb())this.B.Tb().focus()
}
};
vW[_P].mg=function () {
this.setActive(false);
return true
};
vW[_P].tp=function (a) {
if(this.B&&this.B.La()&&!this.ze(a[v]))this.ra(false)
};
vW[_P].ze=function (a) {
return a&&Tw(this.c(),a)||this.B&&this.B.ze(a)
};
vW[_P].rc=function (a) {
if(this.B) {
if(this.B.La()) {
	var b=this.B.rc(a);
	if(a[fc]==27) {
		this.ra(false);
		return true
	}return b
}if(a[fc]==40||a[fc]==38) {
	this.ra(true);
	return true
}
}return false
};
vW[_P].$l=function () {
if(this.B)this.ra(false)
};
vW[_P].QJ=function () {
if(this.B&&!this.je())this.ra(false)
};
vW[_P].eh=function (a) {
if(this.OA&&this.B)this.ra(false);
vW.b.eh.call(this,a)
};
vW[_P].Aa=function () {
if(!this.B)this.dd(new yS(this.i));
return this.B
};
vW[_P].dd=function (a) {
var b=this.B;
if(a!=b) {
this.He();
if(b) {
	this.ra(false);
	if(this.z)this.R1(b)
}this.B=a;
if(a) {
	a.Nk(this);
	a.s(false);
	if(this.OA)a.Xv(false);
	if(this.z)this.EF(a)
}
}return b
};
vW[_P].u=function (a) {
this.Aa().u(a)
};
vW[_P].Fg=function (a,
b) {
this.Aa().Fg(a,b)
};
vW[_P].Vb=function (a) {
if(this.B)this.B.Vb(a)
};
vW[_P].Df=function (a) {
if(this.B)this.B.Df(a)
};
vW[_P].eg=function (a) {
return this.B&&this.B.eg(a)
};
vW[_P].bc=function () {
return this.B?this.B.bc():0
};
vW[_P].s=function (a,b) {
var c=vW.b.s.call(this,a,b);
if(this.B&&c&&!this.La())this.ra(false);
return c
};
vW[_P].Z=function (a) {
vW.b.Z.call(this,a);
if(this.B&&!this.Wa())this.ra(false)
};
vW[_P].Z2=function (a) {
this.gl=a
};
vW[_P].gr=function () {
this.ra(true)
};
vW[_P].ra=function (a) {
vW.b.ra.call(this,
a);
if(!this.B||!this.B.Oc())return ;
var b=this.He();
if(a) {
if(!this.B.z)this.B.ub();
this.B.Fc(-1);
this.t1();
this.B.s(true);
b.d(this.i.W,Ni,this.tp,true);
if(!this.OA)b.d(this.B,Li,this.QJ)
}else {
this.setActive(false);
this.B.s(false);
this.B.Dh(false);
b.M(this.i.W,Ni,this.tp,true);
b.M(this.B,Li,this.QJ)
}
};
vW[_P].t1=function () {
var a=this.gl?7:8,b=new ZS(this.c(),a),c=this.B.c();
if(!this.B.La()) {
db(c[u],Nn);
M(c,true)
}var d=this.gl?5:6;
b.gc(c,d,new Hs(0,0,0,0));
if(!this.B.La()) {
M(c,false);
db(c[u],jP)
}
};
vW[_P].EF=
function (a) {
var b=this.He();
b.d(a,Tz,this.$l);
b.d(a,Rz,this.lu);
b.d(a,Sz,this.qu)
};
vW[_P].R1=function (a) {
var b=this.He();
b.M(a,Tz,this.$l);
b.M(a,Rz,this.lu);
b.M(a,Sz,this.qu)
};
vW[_P].lu=function (a) {
CC(this.c(),xC,a[v].c().id)
};
vW[_P].qu=function () {
CC(this.c(),xC,null)
};
LR(uW,function () {
return new vW(null)
});
var yW=function (a,b,c,d) {
iW.call(this,a,c||wW||(wW=new xW),d);
this.Rd(64,true);
this.EO(b)
};
A(yW,iW);
yW[_P].la=null;
yW[_P].gl=true;
yW[_P].$=function () {
yW.b.$.call(this);
if(this.la)this.ra(false)
};
yW[_P].e=function () {
yW.b.e.call(this);
if(this.la) {
this.la.j();
this.la=null
}
};
yW[_P].ee=function (a) {
yW.b.ee.call(this,a);
if(this.la&&this.je())this.ra(!this.isOpen())
};
yW[_P].mg=function () {
this.setActive(false);
return true
};
yW[_P].tp=function (a) {
if(this.la&&this.la.Zj()&&!this.ze(a[v]))this.ra(false)
};
yW[_P].ze=
function (a) {
return a&&Tw(this.c(),a)||this.la&&this.la.c()&&Tw(this.la.c(),a)
};
yW[_P].rc=function (a) {
if(this.la) {
if(this.la.Zj()) {
	if(a[fc]==27) {
		this.ra(false);
		return true
	}return false
}if(a[fc]==40||a[fc]==38) {
	this.ra(true);
	return true
}
}return false
};
yW[_P].SJ=function () {
if(this.la)this.ra(false)
};
yW[_P].EO=function (a) {
var b=this.la;
if(a!=b) {
if(b)this.ra(false);
this.la=a;
if(a)a.s(false)
}return b
};
yW[_P].s=function (a) {
yW.b.s.call(this,a);
if(this.la&&!this.La())this.ra(false)
};
yW[_P].Z=function (a) {
yW.b.Z.call(this,
a);
if(this.la&&!this.Wa())this.ra(false)
};
yW[_P].ra=function (a) {
yW.b.ra.call(this,a);
var b=this.He();
if(a) {
this.u1();
this.la.s(true);
b.d(this.la,Tz,this.SJ);
b.d(this.i.W,Ni,this.tp,true)
}else {
this.la.s(false);
b.M(this.la,Tz,this.SJ);
b.M(this.i.W,Ni,this.tp,true)
}
};
yW[_P].u1=function () {
var a=this.gl?7:8,b=new ZS(this.c(),a),c=this.la.c();
if(!this.la.Zj()) {
db(c[u],Nn);
M(c,true)
}var d=this.gl?5:6;
b.gc(c,d,new Hs(0,0,0,0));
if(!this.la.Zj()) {
M(c,false);
db(c[u],jP)
}
};
var xW=function () {
qW.call(this)
};
A(xW,
qW);
var wW=null;
var zW="goog-popup-button";
xW[_P].H=function () {
return zW
};
var AW=function () {
return new yW(null)
};
LR(zW,AW);
var BW=function (a) {
uj.call(this);
Ur.call(this,a)
};
A(BW,uj);
xf(BW[_P],Ur[_P]);
BW[_P].jK=function () {
return false
};
BW[_P].oc=function () {
return Ur[_P].oc.call(this)
};
var CW="search-options-help-text",DW="search-options-save-search-link",EW="search-options-label-col",FW="search-options-field-col",GW="search-options-spacer-col",HW="search-options-textfield",IW="search-options-shortfield";
var JW="search-options",MW=function (a,b) {
var c=b||new Q;
c.g(sB,JW,K);
KW(a,c);
LW(a,c);
c.g(uB);
if(!b)return nB(c.toString ())
},NW="Search Options",OW="Hide Search Options",PW="search-options-header",QW="search-options-header-text",RW="search-options-hide-link",KW=function (a,b) {
var c=z(NW),d=z(OW),e=b||new Q;
e.g(sB,PW,BB,QW,K,c,pR,RW,$B,a.oK,K,d,XB);
if(!b)return e.toString ()
},SW='<select id="',TW='" tabindex="7"><option value="',UW="Shared with everyone in my domain.",VW="</option></select>",WW=function (a,
b) {
var c=z(JQ),d=z(KQ),e=z(LQ),f=z(MQ),g=z(QB),h=b||new Q;
h.g(SW,a.bP,nG,HW,TW,a.bR,K,c,AI,a.z1,K,d,AI,a.O4,K,e,AI,a.Q4,K,f,FP);
if(a.XZ) {
var j=z(UW);
h.g(GP,a.P4,K,j,FP)
}h.g(GP,a.J1,K,g,VW);
if(!b)return h.toString ()
},XW='" tabindex="10"><option value="',YW=function (a,b) {
var c=z(VQ),d=z(uK),e=b||new Q;
e.g(SW,a.eH,nG,HW,XW,a.$S,K,c,AI,a.aT,K,d,VW);
if(!b)return e.toString ()
},ZW='" tabindex="5"><option value="',$W=function (a,b) {
var c=z(eK),d=z(hK),e=z(fK),f=z(iK),g=z(jK),h=b||new Q;
h.g(SW,a.KN,nG,HW,ZW,
a.VQ,K,c,AI,a.Y0,K,d,AI,a.k5,K,e,AI,a.oZ,K,f,AI,a.f6,K,g,VW);
if(!b)return h.toString ()
},aX="Has the words:",bX="Sharing:",cX="Named:",dX="Shared With:",eX="Type:",fX="Owner is:",gX="Save changes",hX="Search:",iX="e.g. John Doe, johndoe@example.com",jX="Search folders:",kX="Date",lX="Search Docs",mX="Save this search",nX="search-options-contents",oX='" cellpadding="0" cellspacing="6" width="90%"><colgroup><col class="',pX='" /><col class="',qX='" /></colgroup><tr><th>',rX="</th><td>",sX='<input type="text" class="',
tX='" tabindex="1"/>',uX="</td><td>&nbsp;</td><th>",vX='</th><td valign="top">',wX="</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><th>",xX='" tabindex="2"/>',yX='" tabindex="8"/>',zX='</td><td>&nbsp;</td><td><span id="',AX="search-options-heading",BX='"></span></td></tr><tr><th>',CX='</th><td valign="top" id="',DX='"></td><td>&nbsp;</td><th>',EX='" tabindex="9"/>',FX='</td><td>&nbsp;</td><td><table><tbody><tr><td><div id="',GX="search-options-horizontal-limit",HX='"></div></td><td><span class="',IX=
"search-options-spacer",JX='">&nbsp;</span><span id="',KX="search-options-saved-searches-link",LX='</span><span id="',MX="</span></td></tr></tbody></table></td></tr><tr><th>",NX='</td><td>&nbsp;</td><th>&nbsp;</th><td class="',OX='</td><td>&nbsp;</td><td><button id="',PX='" type="button" tabindex="13">',QX='</button>&nbsp;&nbsp;<button id="',RX='" type="button" tabindex="14">',SX="</button></td></tr><tr><th>&nbsp;</th><td></td><th>&nbsp;</th><th>&nbsp;</th><td>",TX="</span></td></tr></table>",LW=
function (a,b) {
var c=z(aX),d=z(bX),e=z(cX),f=z(dX),g=z(eX),h=z(fX),j=z(lM),k=z(gX),m=z(hX),p=z(iX),q=z(jX),t=z(kX),w=z(lX),$=z(eD),za=z(mX),ka=b||new Q;
ka.g(eF,nX,oX,EW,pX,FW,pX,GW,pX,EW,pX,FW,pX,GW,pX,FW,qX,c,rX);
if(a.Ki)UX(null,ka);
ka.g(sX,HW,OF,a.nZ,PF,a.iK,tX);
if(a.Ki)VX(null,ka);
ka.g(uX,d,vX);
WW(a,ka);
ka.g(wX,e,rX);
if(a.Ki)UX(null,ka);
ka.g(sX,HW,PF,a.JL,xX);
if(a.Ki)VX(null,ka);
ka.g(uX,f,rX);
if(a.Ki)UX(null,ka);
ka.g(sX,HW,PF,a.aP,yX);
if(a.Ki)VX(null,ka);
ka.g(zX,a.CN,nG,AX,BX,g,CX,a.UP,DX,h,rX);
if(a.Ki)UX(null,ka);
ka.g(sX,HW,PF,a.mM,EX);
if(a.Ki)VX(null,ka);
ka.g(FX,a.BN,nG,GX,HX,IX,JX,a.DN,nG,KX,K,j,LX,a.EN,nG,DW,K,k,MX,m,vX);
$W(a,ka);
ka.g(NX,CW,K,p,wX,q,iF,a.JN,DX,t,vX);
YW(a,ka);
ka.g(OX,a.IN,PX,w,QX,a.SF,RX,$,SX);
WX(a,ka);
ka.g(zX,a.AN,nG,DW,K,za,TX);
if(!b)return ka.toString ()
},XX="3 days",YX="2 weeks",ZX="2 months",$X="6 months",aY='<select class="',bY='" tabindex="11"><option value="',cY=function (a,b) {
var c=z(OQ),d=z(XX),e=z(QQ),f=z(YX),g=z(SQ),h=z(ZX),j=z($X),k=z(UQ),m=b||new Q;
m.g(aY,
IW,PF,a.qQ,bY,a.N0,K,c,AI,a.Q5,K,d,AI,a.Q0,K,e,AI,a.h6,K,f,AI,a.P0,K,g,AI,a.g6,K,h,AI,a.g5,K,j,AI,a.R0,K,k,VW);
if(!b)return m.toString ()
},dY="within:",eY="of",fY="e.g. today, Friday, Mar 26, 3/26/04",gY="<table><tr><th>",hY="</td><td>&nbsp;",iY='&nbsp;</td><td><input type="text" class="',jY='" tabindex="12"/></td><td>&nbsp;</td></tr><tr><td/><td colspan="3" class="',kY="</td><td>&nbsp;</td></tr></table>",WX=function (a,b) {
var c=z(dY),d=z(eY),e=z(fY),f=b||new Q;
f.g(gY,c,rX);
cY(a,f);
f.g(hY,d,iY,IW,PF,
a.pQ,jY,CW,K,e,kY);
if(!b)return f.toString ()
},lY="<div style='overflow:auto'>",UX=function (a,b) {
var c=b||new Q;
c.g(lY);
if(!b)return c.toString ()
},VX=function (a,b) {
var c=b||new Q;
c.g(uB);
if(!b)return c.toString ()
};
var Y=function (a,b) {
NN.call(this,a,b);
var c=new BW(2),d=new XQ(a,c,false,b);
d.Fd(false);
d.LD(true);
this.I(d);
this.bj=d;
var e;
e=new AV(RV,a,b);
this.I(e);
this.le=e;
var f=a.C;
if(f.Ka)this.Jf();
else {
this.Vc=true;
this.ba().d(f,av,this.Jf)
}var g=new RS;
g.HD(3,0,0,0);
this.ui=g;
var h=new yW(this.Wt(PP),g,undefined,b);
h.A(qQ);
this.rg=h;
this.I(h);
this.aa=new sJ(a.C,Cl);
this.za().d(this.aa,tJ,this.td)
};
A(Y,NN);
var mY=WH,nY=CJ,oY="dirty-saved-search";
Y[_P].bb=mY;
Y[_P].Vc=false;
Y[_P].Ba=null;
Y[_P].Om=null;
Y[_P].it=
false;
Y[_P].Ye=false;
Y[_P].WC=null;
Y[_P].bC=null;
Y[_P].Bb=null;
Y[_P].PA=null;
Y[_P].Cp=null;
Y[_P].mq=null;
Y[_P].JE=null;
Y[_P].Gq=null;
Y[_P].aD=null;
Y[_P].fr=null;
Y[_P].jn=null;
Y[_P].zm=null;
Y[_P].jo=null;
Y[_P].Ir=null;
Y[_P].Hr=null;
Y[_P].yk=null;
Y[_P].$C=null;
Y[_P].Ox=null;
Y[_P].zk=null;
Y[_P].Li=null;
Y[_P].Ak=null;
Y[_P].Bk=null;
var pY="This search is saved as:",qY=z(pY),rY="Search has been modified:",sY=z(rY),tY=z(mX),uY="Save as new",vY=z(uY);
Y[_P].Ga=function (a) {
if(a!=this.bb) {
this.bb=a;
this.ha()
}
};
Y[_P].IO=function (a) {
this.Ba=a;
if(!a) {
this.Om=null;
if(this.bb==nY||this.bb==oY)this.Ga(mY)
}else this.Om=BQ(this.Ba.Jb().ua());
this.ie()
};
Y[_P].f=function () {
var a={
};
this.oe(a);
this.Bb=a;
this.h=MW(a);
this.bj.f();
this.rg.f();
var b=this.le;
b.ub();
var c=this.ui;
c.fw(b.c())
};
Y[_P].t=function () {
Y.b.t.call(this);
var a=this.i;
this.PA=a.c(this.Bb.oK);
this.Cp=a.c(this.Bb.iK);
this.mq=a.c(this.Bb.JL);
this.JE=a.c(this.Bb.UP);
this.Gq=a.c(this.Bb.KN);
this.aD=a.c(this.Bb.JN);
this.fr=a.c(this.Bb.bP);
this.jn=a.c(this.Bb.aP);
this.zm=a.c(this.Bb.mM);
this.jo=a.c(this.Bb.eH);
this.Ir=a.c(this.Bb.qQ);
this.Hr=a.c(this.Bb.pQ);
this.yk=a.c(this.Bb.AN);
this.$C=a.c(this.Bb.IN);
this.Ox=a.c(this.Bb.SF);
this.zk=a.c(this.Bb.CN);
this.Li=a.c(this.Bb.BN);
this.Ak=a.c(this.Bb.DN);
this.Bk=a.c(this.Bb.EN);
this.JE.appendChild(this.bj.c());
this.aD.appendChild(this.rg.c());
this.it=true;
var b=this.ba();
b.d(this.Ox,fi,this.FW);
b.d(this.$C,fi,this.yY);
b.d(this.PA,fi,this.yX);
b.d(this.yk,fi,this.vY);
b.d(this.Ak,fi,this.nY);
b.d(this.Bk,fi,this.uY);
var c=this.le;
b.d(this.ui,[kM,NR],this.wA);
b.d(c,eA,this.vA);
b.d(c,[PV,QV],this.VX);
b.d(c,eA,this.yA);
if(this.Ac)this.ha()
};
$a(Y[_P],function (a,b) {
Y.b[Mc].call(this,a,b);
this.bj.setActive(a,b)
});
Y[_P].Jf=function () {
var a=$p(),b=this.le.jd;
b.Tc(new Co(2,{
mimeTypes:[a.Ia()],orphans:0,sort:1,desc:false
}),true);
if(this.Vc) {
this.Vc=false;
at(function () {
	this.ba().M(this.getContext().C,av,this.Jf)
},5,this)
}
};
var wY="hide-search-options",xY="search-folders",yY="sharing-type",zY="shared-with",AY="date-restrict-type",
BY="within-date",CY="save-search",DY="search-docs-button",EY="cancel-button",FY="saved-search-label",GY="saved-search-desc",HY="saved-search-rename-link",IY="saved-search-save-changes-link";
Y[_P].oe=function (a) {
a.oK=this.G(wY);
a.iK=this.G(CQ);
a.JL=this.G(uo);
a.UP=this.G(tc);
a.KN=this.G(WH);
a.JN=this.G(xY);
a.bP=this.G(yY);
a.aP=this.G(zY);
a.mM=this.G(DQ);
a.eH=this.G(AY);
a.qQ=this.G(RP);
a.pQ=this.G(BY);
a.AN=this.G(CY);
a.IN=this.G(DY);
a.SF=this.G(EY);
a.CN=this.G(FY);
a.BN=this.G(GY);
a.DN=this.G(HY);
a.EN=
this.G(IY);
a.nZ=C;
this.r1(a);
this.q1(a);
this.l1(a);
this.k1(a);
a.Ki=qg&&!Lg(uC)
};
Y[_P].l1=function (a) {
a.$S=eQ;
a.aT=fQ;
a.s7=gQ
};
Y[_P].r1=function (a) {
a.bR=sQ;
a.z1=vo;
a.O4=YP;
a.Q4=ZP;
a.P4=$P;
a.J1=aQ;
a.XZ=this.getContext().n.io
};
Y[_P].q1=function (a) {
a.VQ=WP;
a.Y0=XP;
a.k5=Ln;
a.oZ=Nn;
a.f6=dq
};
Y[_P].k1=function (a) {
a.N0=hQ;
a.Q5=iQ;
a.Q0=jQ;
a.h6=kQ;
a.P0=lQ;
a.g6=mQ;
a.g5=nQ;
a.R0=oQ
};
Y[_P].ie=function () {
this.ha();
switch(this.bb) {
case mY:this.Vx();
break;
case nY:case oY:this.d5(this.Om);
break
}
};
Y[_P].ha=function () {
if(!this.z) {
this.Ac=
true;
return
}switch(this.bb) {
case mY:M(this.zk,false);
M(this.Ak,false);
M(this.Bk,false);
M(this.Li,false);
n(this.yk,tY);
break;
case nY:M(this.zk,true);
n(this.zk,qY);
n(this.Li,eg(this.Ba.q()));
M(this.Li,true);
M(this.Ak,true);
M(this.Bk,false);
n(this.yk,vY);
break;
case oY:M(this.zk,true);
n(this.zk,sY);
n(this.Li,eg(this.Ba.q()));
M(this.Li,true);
M(this.Li,true);
M(this.Ak,false);
M(this.Bk,true);
n(this.yk,vY);
break
}if(!this.Ye)this.Yn();
var a=this.ba();
if(this.bb==nY)a.d(this.h,[Ri,fi],this.yA);
else a.M(this.h,
[Ri,fi],this.yA)
};
Va(Y[_P],function () {
this.Ba=null;
this.WC=null;
this.bb=mY;
if(this.z) {
this.Vx();
this.ie()
}
});
Y[_P].Vx=function () {
if(this.it) {
Aa(this.Cp,C);
Aa(this.mq,C);
this.bj.reset();
Aa(this.Gq,JP(SP));
var a=JP(VP);
this.rg.A(a);
this.rg.ma(this.Wt(IQ(a)));
Aa(this.fr,JP(TP));
Aa(this.jn,C);
Aa(this.zm,C);
Aa(this.jo,JP(MP));
Aa(this.Ir,JP(NP));
Aa(this.Hr,C)
}
};
Y[_P].d5=function (a) {
if(this.it) {
this.Vx();
var b=a.ca(),c=a.zz();
for(var d in b)switch(d) {
	case CQ:Aa(this.Cp,c[d]);
	break;
	case uo:Aa(this.mq,c[d]);
	break;
	case tc:this.bj.sa(b[d]);
	break;
	case SP:Aa(this.Gq,b[d]);
	break;
	case TP:Aa(this.fr,b[d]);
	break;
	case UP:Aa(this.jn,c[d]);
	break;
	case DQ:Aa(this.zm,c[d]);
	break;
	case MP:Aa(this.jo,b[d]);
	break;
	case NP:Aa(this.Ir,b[d]);
	break;
	case LP:Aa(this.Hr,c[d]);
	break;
	case VP:this.rg.A(b[d]);
	this.rg.ma(this.Wt(c[d]));
	break
}
}
};
Y[_P].Xt=function () {
var a={
};
if(this.it) {
a.has=this.Cp[s];
a.named=this.mq[s];
a.type=this.bj.p();
a[SP]=this.Gq[s];
a[TP]=this.fr[s];
a[UP]=this.jn[s];
a.owner=this.zm[s];
var b=this.Hr[s];
if(b) {
	a[MP]=
	this.jo[s];
	a[NP]=this.Ir[s];
	a[LP]=b
}a[VP]=this.rg.Y
}return new OP(a)
};
Y[_P].Yn=function () {
if(!this.Ye) {
var a=this.getContext().na.zt();
a.Ph(this.jn);
a.Ph(this.zm);
this.Ye=true
}
};
Y[_P].FW=function () {
this.dispatchEvent(cD)
};
Y[_P].yX=function () {
this.dispatchEvent(kM)
};
Y[_P].yY=function () {
this.dispatchEvent(WH)
};
var JY="New Saved Search",KY="Please enter a name for the new saved search:";
Y[_P].vY=function () {
if(!this.bC) {
var a=z(JY),b=z(KY);
this.bC=new eL(a,b,xd(this.f0,this),undefined,undefined,true)
}this.bC.s(true)
};
Y[_P].nY=function () {
if(!this.Ba)return ;
var a=cq(Cl,this.Ba.qd());
if(a)this.getContext().na.hN(a)
};
Y[_P].uY=function () {
if(!this.Ba)return ;
var a=cq(Cl,this.Ba.qd());
if(a) {
this.getContext().na.z2(a,this.Xt());
if(this.bb==oY)this.Ga(nY);
var b=this.Xt().ua(),c=this.Ba.Jb(),d=new BJ(b,c.wa,c.dg());
this.getContext().Pa.Dc(d)
}
};
var LY="saveSearch";
Y[_P].f0=function (a) {
if(!Hf(a)) {
this.WC=a;
this.dispatchEvent(LY)
}
};
Y[_P].wA=function () {
this.Vq(this.ui.Zj())
};
Y[_P].vA=function () {
this.Xq(false)
};
Y[_P].td=function (a) {
var b=
a[Cc],c=this.Ba;
if(c&&b==c.qd()) {
var d=zJ(b);
if(!d)this.IO(null);
else {
	this.Ba=d;
	this.ha();
	if(this.bb==nY) {
		this.Om=BQ(d.Jb().ua());
		this.ie()
	}
}
}
};
Y[_P].yA=function (a) {
var b=a[v];
if(b==this.yk||b==this.Bk||b==this.Ak)return ;
if(this.bb!=nY||!this.Om)return ;
if(!this.Om.hb(this.Xt()))this.Ga(oY)
};
Y[_P].Xq=function (a) {
this.Vq(a)
};
Y[_P].Vq=function (a) {
var b=this.le;
if(b.La()!=a)b.s(a)
};
Y[_P].VX=function (a) {
var b,c=this.rg;
switch(a[x]) {
case PV:var d=this.le.jd.Rc;
if(d.$c())b=rQ;
else {
	var e=Np(d.pc().Y);
	b=e.l()
}break;
case QV:b=qQ;
break
}c.A(b);
c.ma(this.Wt(IQ(b)))
};
Y[_P].Wt=function (a) {
return this.i.f(L,undefined,a)
};
Y[_P].e=function () {
Y.b.e.call(this);
this.PA=null;
this.Cp=null;
this.mq=null;
this.JE=null;
this.Gq=null;
this.aD=null;
this.fr=null;
this.jn=null;
this.zm=null;
this.jo=null;
this.Ir=null;
this.Hr=null;
this.yk=null;
this.$C=null;
this.Ox=null;
this.zk=null;
this.Li=null;
this.Ak=null;
this.Bk=null;
this.bj.j();
this.bj=null;
this.rg.j();
this.rg=null;
this.le.j();
this.le=null
};
var MY=function (a,b,c,d,e,f,g,h,j) {
B.call(this);
this.Gr=a;
this.Ck=b;
this.xo=c;
this.fj=d;
this.Sv=e;
this.zl=j;
var k=f.n;
if(k.Wd) {
this.dq=k.vL;
this.Hq=k.ON;
this.jr=k.hP;
this.Ah=k.FN;
this.nN=g;
this.aa=new sJ(f.C,Cl)
}this.Zr=new rP(f,xd(this.search,this),h);
this.da=f;
this.m=new $i(this)
};
A(MY,B);
var NY="search-options-header-link";
MY[_P].pL=NY;
var OY="search-options-header-link-disabled";
MY[_P].rH=OY;
MY[_P].Xa=true;
MY[_P].vd=null;
MY[_P].Mm=null;
MY[_P].L2=null;
MY[_P].Pm=null;
MY[_P].Nm=null;
var PY="search-options-border";
MY[_P].H2=PY;
var QY="search-options-background";
MY[_P].J2=QY;
var RY="search-options-container";
MY[_P].I2=RY;
var SY="#69c17d";
MY[_P].E2=SY;
MY[_P].G2=SY;
var TY=null,UY=function () {
return TY
},VY=function (a) {
TY=a
},WY="autocomplete";
MY[_P].Kb=function () {
var a=this.m;
if(this.fj)a.d(this.fj,fi,this.ZY);
a.d(this.Sv,uv,this.zY);
if(this.da.n.Wd) {
a.d(this.jr,fi,this.yp);
a.d(this.Ah,fi,this.VJ)
}var b=this.Ck;
b.setAttribute(WY,dN);
this.Zr.Ex(b);
var c=this.da.O;
if(c) {
a.d(c,tr,this.qc);
this.Xa=c.$a()
}
};
MY[_P].GZ=
function () {
var a=this.Mm=new hT(this.da,null,false,this.zl);
a.setActive(true);
a.Fd(false);
a.Tc(new vj(Cl));
var b=this.zl;
a.f();
b.appendChild(this.Ah,a.c());
a.t();
var c=a.Aa();
c.ub();
c.jj(this.Ah,3);
c.W4(this.Ah,3);
var d=this.m;
d.d(c,Tz,this.xY)
};
MY[_P].xY=function (a) {
if(this.Xa) {
var b=a[v].Y;
if(b)this.da.Pa.Dc(b)
}
};
MY[_P].qc=function (a) {
var b=this.Xa=a[bc]!=dN;
this.Zr.OD(b);
Ba(this.xo,!b);
if(this.fj)Ba(this.fj,!b);
var c=b?this.pL:this.rH,d=!b?this.pL:this.rH;
if(this.jr) {
N(this.jr,c);
cz(this.jr,d)
}if(this.Ah) {
N(this.Ah,
c);
cz(this.Ah,d)
}if(this.vd&&!b)this.pK()
};
MY[_P].VJ=function () {
if(this.Xa) {
this.m.M(this.Ah,fi,this.VJ);
if(!this.Mm)this.GZ()
}
};
MY[_P].yp=function () {
if(this.Xa)this.ir()
};
MY[_P].ir=function (a) {
if(!this.vd) {
var b=this.zl,c=this.Pm=b.f(L,{
	"class":this.I2
});
this.da.n.MN.appendChild(c);
var d=this.L2=new CT(15,b);
d.$v(this.H2);
d.bw(this.J2);
d.Yv(this.E2);
d.Zv(this.G2);
d.Vm(new Hs(3,3,3,3));
d.kw(new Hs(0,0,0,0));
var e=this.vd=new Y(this.da,b);
e.f();
d.rD(e.c());
d.ub(c);
e.t();
var f=this.m;
f.d(e,[cD,kM],
this.zX);
f.d(e,WH,this.c1);
f.d(e,LY,this.wY)
}if(this.dq)M(this.dq,false);
if(this.Hq)M(this.Hq,false);
if(this.Pm)M(this.Pm,true);
if(a) {
this.vd.IO(a);
this.vd.Ga(nY)
}else this.vd.Ga(mY);
this.vd.ie();
this.vd.setActive(true);
this.nN()
};
MY[_P].oJ=function () {
var a=this.vd.Xt(),b=a.ua(),c={
};
c[YH]=true;
return new BJ(b,c)
};
MY[_P].c1=function () {
this.da.Pa.Dc(this.oJ())
};
MY[_P].wY=function () {
var a=this.VV();
if(a) {
var b={
},c=new wJ(a,this.oJ(),this.vd.WC);
b[a]=c.cd();
this.aa.re(b);
this.da.Pa.Dc(c.Jb());
if(this.vd.gb)this.ir(c)
}else this.c5()
};
var XY="Sorry!",YY="Sorry, you can only have {$num} saved searches.";
MY[_P].c5=function () {
if(!this.Nm) {
var a=z(XY),b=z(YY,{
	num:50
});
this.Nm=new $N(a,b,undefined,undefined,true,this.zl)
}this.Nm.s(true)
};
MY[_P].VV=function () {
var a=bq(Cl),b=a.pb(),c=b.D();
if(c>=50)return null;
var d=[];
for(var e=0;e<c;e++) {
var f=b.yb(e).Bc();
d[Vl(f)]=true
}if(d[o]<50)return Wl(Cl,d[o]);
for(var e=0;e<d[o];e++)if(!d[e])return Wl(Cl,e);return null
};MY[_P].zX=function () {
this.pK()
};
MY[_P].pK=function () {
this.vd.setActive(false);
if(this.Pm)M(this.Pm,false);
if(this.dq)M(this.dq,true);
if(this.Hq)M(this.Hq,true);
this.nN()
};
var ZY="q=";
MY[_P].ZY=function () {
var a=this.Gr;
a+=(a.indexOf(hh)!=-1?Xf:hh)+ZY;
Bv(a+ca(this.Ck[s]))
};
MY[_P].zY=function (a) {
a.preventDefault();
this.search()
};
MY[_P].search=function () {
var a=xJ(KJ,{
query:this.Ck[s]
});
this.da.Pa.Dc(a)
};
MY[_P].e=function () {
MY.b.e.call(this);
this.Zr.j();
this.Zr=null;
this.m.j();
this.m=null;
this.Gr=null;
this.Ck=null;
this.xo=null;
this.fj=null;
this.Hq=null;
this.dq=null;
this.jr=null;
this.Ah=null;
if(this.Nm) {
this.Nm.j();
this.Nm=null
}if(this.Mm) {
this.Mm.Aa().j();
this.Mm.j();
this.Mm=null
}if(this.vd) {
this.vd.j();
this.vd=null
}this.Y7=null;
this.Pm=null;
if(this.aa) {
this.aa.j();
this.aa=null
}
};
var $Y=function (a) {
this.NB=a||100;
this.Rh=[]
};
$Y[_P].nq=0;
$Y[_P].add=function (a) {
this.Rh[this.nq]=a;
this.nq=(this.nq+1)%this.NB
};
$Y[_P].o=function (a) {
a=this.NL(a);
return this.Rh[a]
};
$Y[_P].k=function (a,b) {
a=this.NL(a);
this.Rh[a]=b
};
$Y[_P].D=function () {
return this.Rh[o]
};
$Y[_P].Qa=function () {
return this.Rh[o]==0
};
Ua($Y[_P],function () {
sa(this.Rh,0);
this.nq=0
});
$Y[_P].ca=function () {
return this.uV(this.D())
};
$Y[_P].uV=function (a) {
var b=this.D(),c=this.D()-a,d=[];
for(var e=c;e<b;e++)d[e]=this.o(e);return d
};
$Y[_P].Nc=function () {
var a=[],b=this.D();
for(var c=0;c<b;c++)a[c]=c;return a
};$Y[_P].Da=function (a) {
return a<this.D()
};
$Y[_P].Xh=function (a) {
var b=this.D();
for(var c=0;c<b;c++)if(this.o(c)==a)return true;return false
};var aZ="Out of bounds exception";$Y[_P].NL=function (a) {
if(a>=this.Rh[o])throwi(aZ);
if(this.Rh[o]<this.NB)return a;
return (this.nq+ha(a))%this.NB
};
var bZ=function () {
this.UM=Ad()
},cZ=new bZ;
bZ[_P].k=function (a) {
this.UM=a
};
Va(bZ[_P],function () {
this.k(Ad())
});
bZ[_P].o=function () {
return this.UM
};
var dZ=function (a) {
this.yC=a||C;
this.l5=cZ
};
dZ[_P].V4=true;
dZ[_P].a5=true;
dZ[_P].Z4=true;
dZ[_P].dP=false;
var eZ="Must override formatRecord";
dZ[_P].oI=function () {
throwi(eZ);
};
var gZ=function (a) {
var b=new Date(a.CP);
return fZ(b.getFullYear()-2000)+fZ(b.getMonth()+1)+fZ(b.getDate())+E+fZ(b.getHours())+fe+fZ(b.getMinutes())+fe+fZ(b.getSeconds())+Vc+fZ(l.floor(b.getMilliseconds()/10))
},fZ=function (a) {
if(a<10)return ce+a;
return fa(a)
},hZ=function (a,b) {
var c=a.CP-b,d=c/1000,e=d.toFixed(3),f=0;
if(d<1)f=
2;
else while(d<100) {
f++;
d*=10
}while(f-->0)e=E+e;
return e
},iZ=function (a) {
dZ.call(this,a)
};
A(iZ,dZ);
iZ[_P].dP=true;
var jZ="dbg-sh",kZ="dbg-sev",lZ="dbg-w",mZ="dbg-i",nZ="dbg-f",oZ="] ",pZ="s] ",qZ="</span><br>";
iZ[_P].oI=function (a) {
var b;
switch(a.rh[s]) {
case qk[s]:b=jZ;
break;
case sk[s]:b=kZ;
break;
case uk[s]:b=lZ;
break;
case wk[s]:b=mZ;
break;
case Ak[s]:default:b=nZ;
break
}var c=[];
c.push(this.yC,E);
if(this.V4)c.push(de,gZ(a),oZ);
if(this.a5)c.push(de,gg(hZ(a,this.l5.o())),pZ);
if(this.Z4)c.push(de,eg(a.uL),
oZ);
c.push(KB,b,K,Sf(gg(eg(a.Ot()))));
if(this.dP&&a.eI)c.push(Rf,Sf(gg(a.dI)));
c.push(qZ);
return c.join(C)
};
var rZ="1",sZ=function (a,b) {
this.dm=a||C;
this.yC=b||C;
this.ym=[];
this.Ov=new $Y(500);
this.MM=xd(this.K0,this);
this.dU=new iZ(this.yC);
this.RT={
};
this.lD(true);
this.Ua=this.DI(hc)==rZ;
Uc.setInterval(xd(this.B2,this),7500)
},tZ="LOGGING";
sZ[_P].nQ=tZ;
sZ[_P].mb=null;
sZ[_P].ZE=false;
sZ[_P].FK=false;
sZ[_P].OF=null;
sZ[_P].xB=Ad();
sZ[_P].hg=function () {
if(this.Ua)this.oC()
};
sZ[_P].Wa=function () {
return this.Ua
};
sZ[_P].Z=function (a) {
this.Ua=a;
if(this.Ua) {
this.oC();
if(this.mb)this.hx()
}this.dO(hc,a?1:0)
};
sZ[_P].lD=
function (a) {
if(a==this.FK)return ;
this.FK=a;
var b=Pk();
if(a)b.LQ(this.MM);
else b.Y1(this.MM)
};
var uZ="<hr>";
sZ[_P].RQ=function () {
this.sQ(uZ)
};
sZ[_P].UR=function () {
this.Ov.clear();
if(this.mb)this.hx()
};
sZ[_P].K0=function (a) {
if(this.RT[a.uL])return ;
var b=this.dU.oI(a);
this.sQ(b)
};
sZ[_P].sQ=function (a) {
if(this.Ua) {
this.oC();
this.Ov.add(a);
this.aF(a)
}else this.Ov.add(a)
};
sZ[_P].aF=function (a) {
this.ym.push(a);
Uc.clearTimeout(this.OF);
if(Ad()-this.xB>750)this.$E();
else this.OF=Uc.setTimeout(xd(this.$E,this),
250)
};
sZ[_P].$E=function () {
this.xB=Ad();
if(this.mb) {
var a=this.mb[vb][Ub],b=a&&a[ec]-(a[eb]+a.clientHeight)<=100;
this.mb[vb].write(this.ym.join(C));
sa(this.ym,0);
if(b)this.mb.scrollTo(0,1000000)
}
};
sZ[_P].rQ=function () {
var a=this.Ov.ca();
for(var b=0;b<a[o];b++)this.aF(a[b])
};var vZ="dbg",wZ="0,0,800,500",xZ="width=",yZ=",toolbar=no,resizable=yes,scrollbars=yes,left=",zZ=",status=no,screenx=",AZ=",screeny=",BZ="Logger popup was blocked";sZ[_P].oC=function () {
if(this.mb&&!this.mb.closed||this.ZE)return ;
var a=this.DI(vZ,wZ).split(Kd),b=ha(a[0]),c=ha(a[1]),d=ha(a[2]),e=ha(a[3]);
this.ZE=true;
this.mb=ga.open(C,vZ+this.dm,xZ+d+sL+e+yZ+b+tL+c+zZ+b+AZ+c);
if(!this.mb)if(!this.f5) {
alert(BZ);
this.f5=true
}this.ZE=false;
if(this.mb)this.hx()
};
var CZ='<style>*{font:normal 14px monospace;}.dbg-sev{color:#F00}.dbg-w{color:#E92}.dbg-sh{font-weight:bold;color:#000}.dbg-i{color:#666}.dbg-f{color:#999}.dbg-ev{color:#0A0}.dbg-m{color:#990}</style><hr><div class="dbg-ev" style="text-align:center">',DZ="<br><small>Logger: ",
EZ="</small></div><hr>";
sZ[_P].hx=function () {
if(!this.mb)return ;
this.mb[vb].open();
var a=CZ+this.nQ+DZ+this.dm+EZ;
this.aF(a);
this.rQ()
};
sZ[_P].dO=function (a,b) {
a+=this.dm;
la.cookie=a+zh+ca(b)+ks+(new Date(Ad()+2592000000)).toUTCString()
};
sZ[_P].DI=function (a,b) {
a+=this.dm;
var c=fa(la.cookie),d=c.indexOf(a+zh);
if(d!=-1) {
var e=c.indexOf(DU,d);
return ma(c.substring(d+a[o]+1,e==-1?c[o]:e))
}else return b||C
};
sZ[_P].B2=function () {
if(!this.mb||this.mb.closed)return ;
var a=this.mb[Yb]||this.mb.screenLeft||
0,b=this.mb[Zb]||this.mb.screenTop||0,c=this.mb.outerWidth||800,d=this.mb.outerHeight||500;
this.dO(vZ,a+Kd+b+Kd+c+Kd+d)
};
var FZ=function (a,b) {
sZ.call(this,a,b)
};
A(FZ,sZ);
var GZ="log",HZ="logmsg";
FZ[_P].$E=function () {
this.xB=Ad();
if(this.mb) {
var a=this.Be.c(GZ),b=a[ec]-(a[eb]+a[Lc])<=100;
for(var c=0;c<this.ym[o];c++) {
	var d=this.Be.f(L,{
		className:HZ
	});
	n(d,this.ym[c]);
	a.appendChild(d)
}sa(this.ym,0);
this.rN();
if(b)a.scrollTop=a[ec]
}
};
var IZ='<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3.org/TR/html4/loose.dtd"><html><head><title>Logging: ',JZ='</title><style>html,body{height:100%;width:100%;margin:0px;padding:0px;background-color:#FFF;overflow:hidden}*{}.dbg-sev{color:#F00}.dbg-w{color:#C40}.dbg-sh{font-weight:bold;color:#000}.dbg-i{color:#444}.dbg-f{color:#999}.dbg-ev{color:#0A0}.dbg-m{color:#990}.logmsg{border-bottom:1px solid #CCC;padding:2px;font:medium monospace;}#head{position:absolute;width:100%;font:x-small arial;border-bottom:2px solid #999;background-color:#EEE;}#head p{margin:0px 5px;}#log{position:absolute;width:100%;overflow:auto;background-color:#FFF;}#options{position:absolute;right:0px;width:50%;height:100%;border-left:1px solid #999;background-color:#DDD;display:none;padding-left: 5px;font:normal small arial;overflow:auto;}#openbutton,#closebutton{text-decoration:underline;color:#00F;cursor:pointer;position:absolute;top:0px;right:5px;font:x-small arial;}#clearbutton{text-decoration:underline;color:#00F;cursor:pointer;position:absolute;top:0px;right:50px;font:x-small arial;}select{font:x-small arial;margin-right:10px;}hr{border:0;height:5px;background-color:#8c8;color:#8c8;}</style></head><body><div id="log"></div><div id="head"><p><b>Logging: ',
KZ="</b></p><p>",LZ='</p><span id="clearbutton">clear</span><span id="openbutton">options</span></div><div id="options"><big><b>Options:</b></big><div id="optionsarea"></div><span id="closebutton">save and close</span></div></body></html>',MZ="openbutton",NZ="closebutton",OZ="clearbutton";
FZ[_P].hx=function () {
if(!this.mb)return ;
var a=this.mb[vb];
a.open();
var b=IZ+this.dm+JZ+this.dm+KZ+this.nQ+LZ;
a.write(b);
a.close();
(F?a[Ub]:this.mb).onresize=xd(this.rN,this);
this.Be=new mw(a);
this.Be.c(MZ).onclick=
xd(this.U0,this);
this.Be.c(NZ).onclick=xd(this.XR,this);
this.Be.c(OZ).onclick=xd(this.UR,this);
this.rQ()
};
var PZ="optionsarea",QZ="INHERIT",RZ="sel",SZ="(root)",TZ="options";
FZ[_P].U0=function () {
var a=this.Be.c(PZ);
n(a,C);
var b=UZ(),c=this.Be;
for(var d=0;d<b[o];d++) {
var e=Lk(b[d]),f=e.rh?e.rh[Cc]:QZ,g=c.f(L,{
},this.VU(RZ+b[d],f),c.f(KC,{
},b[d]||SZ));
a.appendChild(g)
}Ya(this.Be.c(TZ)[u],GL);
return false
};
FZ[_P].VU=function (a,b) {
var c=this.Be,d=c.f(aA,{
id:a
}),e=Hk;
for(var f=0;f<e[o];f++) {
var g=e[f],
h=c.f(ZQ,{
},g[Cc]);
if(b==g[Cc])h.selected=true;
d.appendChild(h)
}d.appendChild(c.f(ZQ,{
selected:b==QZ
},QZ));
return d
};
FZ[_P].XR=function () {
Ya(this.Be.c(TZ)[u],Gx);
var a=UZ(),b=this.Be;
for(var c=0;c<a[o];c++) {
var d=Lk(a[c]),e=b.c(RZ+a[c]),f=e.options[e.selectedIndex][qb];
if(f==QZ)d.Tq(null);
else d.Tq(Jk(f))
}return false
};
var VZ="head";
FZ[_P].rN=function () {
var a=this.Be,b=a.c(GZ),c=a.c(VZ);
b[u].top=c[Lc]+rx;
Za(b[u],a.W[Ub][Lc]-c[Lc]-(F?4:0)+rx)
};
var UZ=function () {
var a=mf(Mk);
a.sort();
return a
};
var WZ="detroit",XZ="initializeFromPage",YZ="finishPageInitialization",ZZ="logStartEvent",$Z="logCompleteEvent",a_=function (a) {
kj.call(this,a);
var b=dv(),c=new yv(undefined,undefined,true),d=Fv(c),e=new lA,f=new Mz,g=new yN(!a.aI,a.LF),h=new pA,j=new ON,k=new S(a,j),m=new FN(pw(a.c())),p=new IN(a.Jz(),m),q=new BN;
if(a.RE)d.C3(a.RE);
if(Xc(a.kN))Ku().br(a.kN);
if(a.ET)Yq().Z(true);
this.da=new LN(b,d,e,f,g,h,k,a,m,p,c,q,j);
this.zl=new mw;
var t=Px(a.c());
this.Iq=new MY(a.Gr,a.Ck,a.xo,a.fj,a.Sv,this.da,
xd(this.iH,this),t,this.zl);
VY(this.Iq);
k.v3(xd(this.Iq.ir,this.Iq));
this.DC=new ZN(Ku());
var w;
if(a.hy)w=new SN(a.FF,b,a.hy);
this.Ks=w;
this.wl=new FZ(WZ);
hA(t);
Gd(this,WC,this.Fa);
Gd(this,XZ,this.FZ);
Gd(this,YZ,this.WT);
Gd(this,ZZ,this.E_);
Gd(this,$Z,this.C_)
};
A(a_,kj);
a_[_P].Dg=null;
a_[_P].cb=null;
Qa(a_[_P],function () {
return this.da
});
a_[_P].sd=function () {
return this.Dg
};
a_[_P].Kb=function () {
a_.b.Kb.call(this);
try{
la.execCommand(RU,false,true)
}catch(a) {
}var b=this.n,c=this.wl,d=c.Wa();
this.RH(d);
var e=this.n.gH;
if(e)this.ba().d(e,fi,this.aX);
Ku().Kb();
var f=this.getContext().C;
f.j3(b);
this.ba().d(f,bv,this.kX);
f.Kb(undefined,b.Z0);
this.getContext().Le.Z(true);
if(b.lt) {
var g=this.sd(),h=g.ja,j=Yw(b.c(),function (m) {
	return m[ub]==1&&O(m,h)
});
this.sd().Q(j)
}else this.sd().ub(b.c());
this.Iq.Kb();
var k=b.tP;
if(k)this.DC.I_(k,b.C5);
this.ba().d(this.getContext().jz,CN,this.sX)
};
a_[_P].FZ=function (a,b) {
var c;
switch(b) {
case yq:case gv:c=3;
break;
case Ou:c=5;
break;
case hv:c=2;
break;
case Ml:c=10;
break;
default:return
}var d=Sd(a),e=Cj(d,c);
this.pe(e,d,b)
};
a_[_P].pe=function (a,b,c) {
this.getContext().C.pe(a,c)
};
a_[_P].WT=function () {
this.getContext().C.Ko()
};
a_[_P].kX=function () {
var a=this.getContext().C;
if(!a.MK()) {
a.kO();
var b=xJ(jq),c=b.wa||{
};
c[ZH]=false;
c.history=false;
b.an(c);
this.da.Pa.Dc(b)
}
};
a_[_P].sX=function () {
this.iH(true)
};
a_[_P].Fa=function (a,b) {
if(b||!Us(this.cb,a)) {
this.cb=a;
this.sd().Fa(a)
}
};
a_[_P].iH=function (a) {
var b=Cw();
b.height-=this.n.c()[Ic];
this.Fa(b,a)
};
a_[_P].E_=function (a,
b,c) {
Yq().Lw(a,b,c)
};
a_[_P].C_=function (a,b,c) {
Yq().Xn(a,b,c)
};
var b_="Disable debug window",c_="Enable debug window";
a_[_P].RH=function (a) {
var b=this.wl;
b.Z(a);
b.lD(a);
if(a)b.RQ();
var c=this.n.gH;
if(c)n(c,a?b_:c_)
};
a_[_P].aX=function () {
this.RH(!this.wl.Wa())
};
a_[_P].e=function () {
a_.b.e.call(this);
this.da.j();
this.da=null;
this.Iq.j();
this.b8=null;
this.DC.j();
this.DC=null;
this.Ks.j();
this.Ks=null;
this.sd().j();
this.Dg=null;
this.wl.Z(false);
this.wl.lD(false);
this.wl=null
};
;
;
var d_=function (a,b) {
J.call(this);
this.nb=a;
this.tq=[];
if(b!=null)this.hg(b)
};
A(d_,J);
var e_="goog.gears.Worker";
d_[_P].w=Lk(e_);
var f_="Not a valid JSON string",g_="json";
d_[_P].PX=function (a,b) {
var c=new h_(Mb,a,null,b);
if(this.dispatchEvent(c)) {
var d;
try{
	d=Sd(a)
}catch(e) {
	this.w.qa(f_,e)
}if(d!=undefined) {
	var f=new h_(g_,a,d,b);
	if(this.dispatchEvent(f)&&ba(d)&&d[o]==2&&od(d[0]))this.dispatchEvent(new h_(i_,a,d,b))
}
}
};
d_[_P].Ja=null;
var j_="Can only set the worker id once";
d_[_P].hg=function (a) {
if(this.Ja!=
null)throwi(j_);
this.Ja=a;
this.nb.FC(this);
for(var b=0;b<this.tq[o];b++)this.sendMessage(this.tq[b]);sa(this.tq,0)
};d_[_P].cD=function (a,b) {
this.N2([a,b])
};
d_[_P].N2=function (a) {
var b=Vd(a);
this.sendMessage(b)
};
d_[_P].sendMessage=function (a) {
if(this.Ja!=null)this.nb.sendMessage(a,this);
else this.tq.push(a)
};
d_[_P].l=function () {
return this.Ja
};
d_[_P].e=function () {
d_.b.e.call(this);
this.nb.n6(this);
this.nb=null;
sa(this.tq,0)
};
var i_="command",h_=function (a,b,c,d) {
H.call(this,a);
Ca(this,b);
this.ak=
c;
this.V_=d
};
A(h_,H);
var k_=function (a,b) {
B.call(this);
this.B_=b;
this.Nf=a;
this.b0=de+a.l()+oZ;
a.addEventListener(i_,this.WL,false,this)
};
A(k_,B);
k_[_P].WL=function (a) {
var b=a.ak[0];
if(b==this.B_) {
var c=a.ak[1],d=new mk(c[1],c[2]),e=this.b0+c[3],f=c[4],g=Lk(c[0]);
g.log(d,e,f)
}
};
k_[_P].e=function () {
k_.b.e.call(this);
this.Nf.removeEventListener(i_,this.WL,false,this);
this.Nf=null
};
var l_="google.gears.factory",m_="GearsFactory",n_="Gears.Factory",o_="window",p_="application/x-googlegears",q_="gears-factory",s_=function () {
if(r_!=undefined)return r_;
var a=Zc(l_);
if(a)return r_=a;
try{
var b=Zc(m_);
return r_=new b
}catch(c) {
}try{
return r_=new ActiveXObject(n_)
}catch(c) {
}var d=Zc(o_);
if(d&&d.navigator.mimeTypes[p_])try{
var e=d.document,a=e.getElementById(q_);
if(!a) {
	a=e.createElement(ad);
	a.style.display=Gx;
	a.width=ce;
	a.height=ce;
	a.type=p_;
	a.id=q_;
	e.documentElement.appendChild(a)
}return r_=
a
}catch(c) {
}return r_=null
},r_=undefined,t_="navigator.mimeTypes",v_=function () {
if(u_!=undefined)return u_;
var a=Zc(l_),b=Zc(t_);
if(a||Zc(m_)||b&&b[p_])return u_=true;
if(typeofActiveXObject!="undefined")try{
new ActiveXObject(n_);
return u_=true
}catch(c) {
return u_=false
}return u_=false
},u_=undefined;
;
var w_="google.gears.workerPool",x_=function () {
J.call(this);
this.gx={
};
var a=Zc(w_);
this.nb=a?a:this.dV();
this.nb.onmessage=xd(this.QX,this)
};
A(x_,J);
x_[_P].nb=null;
var y_="beta.workerpool",z_="1.0";
x_[_P].dV=function () {
var a=s_();
return a.create(y_,z_)
};
x_[_P].createWorker=function (a) {
var b=this.nb.createWorker(a),c=new d_(this,b);
this.FC(c);
return c
};
x_[_P].createWorkerFromUrl=function (a) {
var b=this.nb.createWorkerFromUrl(a),c=new d_(this,b);
this.FC(c);
return c
};
x_[_P].allowCrossOrigin=function () {
this.nb.allowCrossOrigin()
};
x_[_P].sendMessage=function (a,b) {
this.nb.sendMessage(a,b.l())
};
var A_="uknown_worker";
x_[_P].QX=function (a,b,c) {
if(!this.Gu()) {
var d=this.gx;
if(!d[b])this.dispatchEvent(new B_(A_,b,a,c));
var e=d[b];
if(e)e.PX(a,c)
}
};
x_[_P].FC=function (a) {
this.gx[a.l()]=a
};
x_[_P].n6=function (a) {
delete this.gx[a.l()]
};
x_[_P].e=function () {
x_.b.e.call(this);
this.nb=null;
this.gx=null
};
var B_=function (a,b,c,d) {
H.call(this,a);
this.Z7=b;
Ca(this,c);
this.V_=d
};
A(B_,H);
;
var D_=function (a) {
B.call(this);
var b=a.stores,c=[];
for(var d=0;d<b[o];d++) {
var e=b[d];
c.push(new C_(e))
}this.oP=c
};
A(D_,B);
D_[_P].e=function () {
D_.b.e.call(this);
this.oP=null
};
var C_=function (a) {
B.call(this);
this.t5=a.storeType;
this.Gf=a.serviceId||null;
this.Er=a.url;
this.v_=a.lastCaptureSuccess;
this.HR=a.capturedTimestamp
};
A(C_,B);
C_[_P].Yc=function () {
return this.Gf
};
C_[_P].mf=function () {
return this.Er
};
var E_=function (a,b,c,d) {
B.call(this);
this.IC=c;
this.OC=d;
this.Nf=a;
this.nb=b;
a.addEventListener(i_,this.Qj,false,this)
};
A(E_,B);
var F_="detroit.gears.WorkerCreatorServer";
E_[_P].w=Lk(F_);
var G_="Created worker with ID ",H_=" for URL ";
E_[_P].Qj=function (a) {
var b=a.ak[0];
if(b==this.IC) {
var c=a.ak[1],d=c[0],e=this.nb.createWorkerFromUrl(d);
this.w.qa(G_+e.l()+H_+d);
this.Nf.cD(this.OC,[d,e.l()])
}
};
E_[_P].e=function () {
E_.b.e.call(this);
this.Nf.removeEventListener(i_,this.Qj,false,this);
this.Nf=null;
this.nb=
null
};
var I_=function (a,b) {
J.call(this);
this.nb=a;
this.$w=b;
this.Kv=[];
var c=new Au(2,undefined,0,2,20000),d=new $i(this);
d.d(c,[Or,Mr,Nr],this.of);
this.m=d;
this.hj=c
};
A(I_,J);
var J_="detroit.gears.WorkerLoader";
I_[_P].w=Lk(J_);
var K_=C,L_=function (a) {
K_=a
},M_="Starting load of worker with ",N_=" uris.";
I_[_P].mm=function () {
var a=this.hj,b=this.$w;
this.w.qa(M_+b[o]+N_);
for(var c=0;c<b[o];c++)a.send(c,b[c])
};var O_='Received event "',P_='" for id ',Q_=" with uri ";I_[_P].of=function (a) {
var b=a.id,c=a.dl;
this.w.qa(O_+a[x]+P_+b+Q_+this.$w[b]);
switch(a[x]) {
case Or:this.AA(b,c);
break;
case Mr:this.zp(b,c);
break;
case Nr:this.wp(b,c);
break
}
};
I_[_P].AA=function () {
};
I_[_P].zp=function (a,b) {
this.Kv[a]=b.iJ();
if(this.d_())this.VT()
};
I_[_P].wp=function () {
this.TF()
};
I_[_P].TF=function () {
this.dispatchEvent(new R_(Nr,this))
};
I_[_P].d_=function () {
var a=true,b=this.Kv;
if(b[o]==this.$w[o]) {
for(var c=0;c<b[o];c++)if(!jd(b[c])) {
	a=false;
	break
}
}else a=false;
return a
};
var S_="All uris loaded.",T_="Exception while creating worker.",
U_="Worker created.";
I_[_P].VT=function () {
this.w.qa(S_);
var a=this.uU(),b;
try{
b=this.nb.createWorker(a+this.Kv.join(C))
}catch(c) {
this.w.hn(T_,c);
this.TF();
return
}this.w.qa(U_);
this.dispatchEvent(new R_(Mr,this,b))
};
var V_="navigator=";
I_[_P].uU=function () {
var a={
userAgent:aa.userAgent,product:aa.product,vendor:aa.vendor,platform:aa.platform,mimeTypes:[]
};
return V_+Vd(a)+DU+K_
};
I_[_P].e=function () {
I_.b.e.call(this);
this.m.j();
this.m=null;
this.hj.j();
this.hj=null;
this.$w=null;
this.Kv=null
};
var R_=function (a,
b,c) {
H.call(this,a,b);
this.B6=c
};
A(R_,H);
var W_=function (a) {
zj.call(this,a);
var b;
if(this.qe) {
var c=a.response;
b=c.success
}this.sP=b
};
A(W_,zj);
W_[_P].K=function () {
return 15
};
var X_=function (a) {
return new W_(a)
};
Dj(15,X_);
var Y_=function () {
Bh.call(this)
};
A(Y_,Bh);
var Z_=new G(Hr);
Y_[_P].Lc=function () {
return Z_
};
Y_[_P].K=function () {
return 15
};
var $_=function () {
return new Y_
};
Xh(15,$_);
var a0=function (a) {
zj.call(this,a);
var b,c;
if(this.qe) {
var d=a.response;
b=d.syncDebugInfo;
c=d.captureDebugInfo
}this.Yk=b;
this.lj=c
};
A(a0,zj);
a0[_P].K=function () {
return 17
};
var b0=function (a) {
return new a0(a)
};
Dj(17,b0);
var c0=function () {
Bh.call(this)
};
A(c0,Bh);
var d0="gearsdebug",e0=new G(d0);
c0[_P].Lc=function () {
return e0
};
c0[_P].K=function () {
return 17
};
var f0=function () {
return new c0
};
Xh(17,f0);
var g0=function (a,b) {
Bh.call(this);
this.L1=a;
this.t2=b
};
A(g0,Bh);
var h0="su",i0=new G(h0);
g0[_P].Lc=function () {
return i0
};
g0[_P].K=function () {
return 8
};
var j0="rawResponse",k0="responseCommunicationType";
g0[_P].oc=function () {
var a=new D;
a.k(j0,this.L1);
a.k(k0,this.t2);
return a
};
var l0=function (a) {
return new g0(a.rawResponse,a.responseCommunicationType)
};
Xh(8,l0);
var m0=function (a,b) {
ct.call(this);
this.nb=a;
this.zn=new I_(a,b)
};
A(m0,ct);
var n0="detroit.gears.CommunicationsManager";
m0[_P].w=Lk(n0);
m0[_P].Tm=null;
m0[_P].av=null;
m0[_P].fx=null;
m0[_P].Wb=null;
m0[_P].lE=false;
var o0="gears";
m0[_P].$t=function () {
return o0
};
m0[_P].ND=function (a) {
var b=this.ba();
if(this.Wb)b.M(this.Wb,Mr,this.YJ);
this.Wb=a;
if(a)b.d(a,Mr,this.YJ)
};
m0[_P].Kb=function () {
m0.b.Kb.call(this);
this.ba().d(this.zn,[Mr,Nr],this.aZ);
this.zn.mm()
};
m0[_P].Xx=function () {
if(!this.lE) {
this.lE=true;
this.Pe(new Y_)
}
};
m0[_P].JC=function () {
this.Pe(new c0)
};
m0[_P].Ff=function (a) {
this.FM(a.l());
this.Tm.cD(4,a.VN())
};
m0[_P].aZ=function (a) {
var b=this.ba();
b.M(this.zn,[Mr,Nr]);
switch(a[x]) {
case Mr:var c=this.Tm=a.B6;
this.av=new k_(c,1);
this.fx=new E_(c,this.nb,13,14);
b.d(c,i_,this.Qj);
this.Ko();
break;
case Nr:this.UT();
break;
default:break
}
};
m0[_P].YJ=function (a) {
switch(a[x]) {
case Or:break;
case Mr:var b=a.OM;
if(b)switch(a.kb.K()) {
	case 9:case 6:case 16:break;
	default:if(!this.lE)this.Pe(new g0(b,a.Ec.K()));
	break
}break;
case Nr:break
}
};
var p0="Received command with CommandId=";
m0[_P].Qj=function (a) {
var b=a.ak;
if(b) {
var c=b[0],d=b[1],e=d.id;
if(c!=1)this.w.qa(p0+c);
switch(c) {
	case 5:this.HM(e,d);
	break;
	case 6:this.Bv(e);
	break;
	default:break
}
}
};
m0[_P].e=function () {
m0.b.e.call(this);
if(this.Tm) {
this.Tm.j();
this.Tm=null
}if(this.zn) {
this.zn.j();
this.zn=null
}if(this.av) {
this.av.j();
this.av=null
}if(this.fx) {
this.fx.j();
this.fx=null
}this.nb=null;
this.Wb=null
};
var q0=function (a,b,c,d) {
J.call(this);
this.IC=a;
this.OC=b;
this.JT=c;
this.Lb=new Jp;
this.m=new $i(this);
if(d)this.cr(d)
};
A(q0,J);
var r0="detroit.gears.BaseWorkerClient";
q0[_P].w=Lk(r0);
q0[_P].Nf=null;
var s0="Setting worker.",t0="Sending pending requests";
q0[_P].cr=function (a) {
this.w.qa(s0);
var b=this.Nf;
if(b)this.m.M(b,i_,this.Qj);
this.Nf=a;
if(a) {
this.m.d(a,i_,this.Qj);
this.w.qa(t0);
var c=this.Lb;
while(!c.Qa())this.Ff(c.$h())
}
};
q0[_P].Ff=function (a) {
var b=this.Nf;
if(!b)this.Lb.Aj(a);
else b.cD(this.IC,
a.VN())
};
q0[_P].Qj=function (a) {
var b=a.ak[0],c=a.ak[1];
if(b==this.OC) {
var d=Cj(c,c.communicationType);
this.xq(d)
}else if(b=this.JT);
};
q0[_P].xq=function () {
};
q0[_P].e=function () {
q0.b.e.call(this);
this.Nf=null;
this.Lb.clear();
this.Lb=null;
this.m.j();
this.m=null
};
var u0=function (a,b) {
H.call(this,a);
Ka(this,b)
};
A(u0,H);
var v0=function (a) {
zj.call(this,a);
var b,c;
if(this.qe) {
var d=a.response;
b=d.eventType;
c=d.status
}this.Ee=b;
this.Za=c
};
A(v0,zj);
v0[_P].K=function () {
return 13
};
v0[_P].zb=function () {
return this.Za
};
var w0=function (a) {
return new v0(a)
};
Dj(13,w0);
var x0=function (a,b) {
Bh.call(this);
this.Ic=a;
this.Za=b
};
A(x0,Bh);
var y0="communicationsmanager",z0=new G(y0);
x0[_P].Lc=function () {
return z0
};
x0[_P].K=function () {
return 13
};
x0[_P].Qb=function () {
return this.Ic
};
x0[_P].zb=function () {
return this.Za
};
x0[_P].oc=function () {
var a=new D;
a.k(im,this.Ic);
a.k(ac,this.Za);
return a
};
var A0=function (a) {
return new x0(a.actionType,a.status)
};
Xh(13,A0);
var B0=function (a) {
q0.call(this,22,23,24,a)
};
A(B0,q0);
var C0="detroit.gears.CommunicationsManagerClient";
B0[_P].w=Lk(C0);
B0[_P].IE=function () {
this.Ff(new x0(0))
};
B0[_P].fd=function (a) {
this.Ff(new x0(1,a))
};
B0[_P].xq=function (a) {
if(a.K()==13)this.dispatchEvent(this.qj(a))
};
B0[_P].qj=function (a) {
return new u0(a.Ee,a.zb())
};
;
var D0="Google Documents",E0="Google Spreadsheets",F0="Google Presentations",G0="Google Doclist",H0=function (a) {
switch(a) {
case UJ:var b=z(D0);
return b;
case VJ:var c=z(E0);
return c;
case WJ:var d=z(F0);
return d;
case VM:default:var e=z(G0);
return e
}
};
var I0=Ar,J0=function (a,b,c) {
H.call(this,a);
Ka(this,b);
this.nE=c
};
A(J0,H);
var K0=function (a,b,c,d) {
J0.call(this,I0,a,b);
this.EE=c;
this.mG=d
};
A(K0,J0);
var L0=function (a,b,c,d,e,f) {
H.call(this,a);
this.Jo=b;
this.n7=c;
this.Io=d;
this.qI=e||false;
this.DH=f||false
};
A(L0,H);
var M0=function (a) {
H.call(this,Hr);
this.B5=a
};
A(M0,H);
var N0=function (a) {
zj.call(this,a);
var b,c,d,e,f,g,h,j,k,m,p;
if(this.qe) {
var q=a.response;
b=q.eventType;
c=q.status;
d=q.subStatus;
e=q.captured;
f=q.totalCount;
g=q.completedCount;
h=q.clearStoresSuccess;
j=q.failureType;
k=q.failureServiceIds;
m=q.gaiaFailure;
p=q.doclistFailure
}this.Ee=b;
this.Za=c;
this.rn=d;
this.IR=e;
this.FE=f;
this.$x=g;
this.SR=h;
this.bz=j;
this.az=k||[];
this.fU=m;
this.sT=p
};
A(N0,zj);
N0[_P].K=function () {
return 12
};
N0[_P].zb=function () {
return this.Za
};
var Q0=function (a) {
return new N0(a)
};
Dj(12,Q0);
var R0=function (a) {
Bh.call(this);
this.Ic=a
};
A(R0,Bh);
var S0="resourcemanager",T0=new G(S0);
R0[_P].Lc=function () {
return T0
};
R0[_P].K=function () {
return 12
};
R0[_P].Qb=function () {
return this.Ic
};
R0[_P].oc=function () {
var a=new D;
a.k(im,this.Ic);
return a
};
var U0=function (a) {
return new R0(a.actionType)
};
Xh(12,U0);
var V0=function (a) {
q0.call(this,19,20,21,a)
};
A(V0,q0);
var W0="detroit.gears.ResourceManagerClient";
V0[_P].w=Lk(W0);
V0[_P].xq=function (a) {
if(a.K()==12)this.dispatchEvent(this.qj(a))
};
var X0="captureclientsinitialized",Y0="warning";
V0[_P].qj=function (a) {
var b=a.Ee;
switch(b) {
case X0:case dt:return new J0(b,a.zb(),a.rn);
case I0:return new K0(a.zb(),a.rn,a.FE,a.$x);
case Hr:return new M0(a.SR);
case Kr:case Y0:return new L0(b,a.bz,a.IR,a.az,a.fU,a.sT)
}
};
var Z0=function (a) {
zj.call(this,a);
var b,c,d;
if(this.qe) {
var e=a.response;
b=e.eventType;
c=e.requestHash;
d=e.syncInformation
}this.Ee=b;
this.KC=c;
this.K5=d
};
A(Z0,zj);
Z0[_P].K=function () {
return 14
};
Z0[_P].Yl=function () {
return this.K5
};
var $0=function (a) {
return new Z0(a)
};
Dj(14,$0);
var a1=function (a,b,c) {
Bh.call(this);
this.Ic=a;
this.KC=b;
this.Ce=c
};
A(a1,Bh);
var b1="storemanager",c1=new G(b1);
a1[_P].Lc=function () {
return c1
};
a1[_P].K=function () {
return 14
};
a1[_P].Qb=function () {
return this.Ic
};
var d1="requestHash";
a1[_P].oc=function () {
var a=new D;
a.k(im,this.Ic);
a.k(yq,this.Ce);
a.k(d1,this.KC);
return a
};
var e1=function (a) {
return new a1(a.actionType,a.requestHash,a.docs)
};
Xh(14,e1);
var f1=function (a) {
q0.call(this,25,26,27,a)
};
A(f1,q0);
var g1="detroit.gears.StoreManagerClient";
f1[_P].w=Lk(g1);
f1[_P].Yl=function (a,b) {
this.Ff(new a1(0,a,b))
};
f1[_P].xq=function (a) {
if(a.K()==14)this.dispatchEvent(this.qj(a))
};
f1[_P].qj=function (a) {
return new zr(a.Ee,a.KC,a.Yl())
};
var h1=function (a) {
zj.call(this,a);
var b,c,d,e,f,g,h,j,k,m;
if(this.qe) {
var p=a.response;
b=p.eventType;
c=p.status;
d=p.subStatus;
e=p.totalCount;
f=p.completedCount;
g=p.success;
h=p.failureType;
j=p.failureServiceIds;
k=p.numUnsyncedDocs;
m=p.rawDocs
}this.Ee=b;
this.Za=c;
this.rn=d;
this.FE=e;
this.$x=f;
this.sP=g;
this.bz=h;
this.az=j||[];
this.r0=k||0;
this.K1=m||[];
this.Xf=Kn(m)
};
A(h1,zj);
h1[_P].K=function () {
return 11
};
h1[_P].zb=function () {
return this.Za
};
h1[_P].Hb=function () {
return this.Xf
};
var i1=function (a) {
return new h1(a)
};
Dj(11,i1);
var j1=function (a,b) {
Bh.call(this);
this.Ic=a;
this.Ce=b||[]
};
A(j1,Bh);
var k1="syncagent",l1=new G(k1);
j1[_P].Lc=function () {
return l1
};
j1[_P].K=function () {
return 11
};
j1[_P].Qb=function () {
return this.Ic
};
j1[_P].oc=function () {
var a=new D;
a.k(im,this.Ic);
a.k(yq,this.Ce);
return a
};
var m1=function (a) {
return new j1(a.actionType,a.docs)
};
Xh(11,m1);
var n1=function (a) {
q0.call(this,15,16,17,a)
};
n1.inherits(q0);
var o1="detroit.gears.SyncAgentClient";
n1[_P].w=Lk(o1);
n1[_P].D5=function () {
this.Ff(new j1(0))
};
n1[_P].H5=function (a) {
this.Ff(new j1(2,a))
};
n1[_P].$H=function () {
this.Ff(new j1(1))
};
q0[_P].xq=function (a) {
if(a.K()==11)this.dispatchEvent(this.qj(a))
};
var p1="syncclientsinitialized";
n1[_P].qj=function (a) {
switch(a.Ee) {
case dt:case p1:return new Dr(a.Ee,a.zb(),a.rn);
case Br:return new Er(a.zb(),a.rn,a.FE,a.$x);
case Cr:return new Gr(a.K1,a.Hb());
case Hr:return new Ir(a.sP);
case Kr:case Y0:return new Fr(a.Ee,a.bz,a.az,a.r0)
}
};
var q1="syncData",r1="documentData",s1="syncClientData",t1="storeVersionData",u1=function (a) {
B.call(this);
this.vP=this.Ct(a,q1);
this.GH=this.Ct(a,r1);
this.uP=this.Ct(a,s1);
this.nP=this.Ct(a,t1)
};
A(u1,B);
u1[_P].Ct=function (a,b) {
var c=[],d=a[b];
for(var e=0;e<d[o];e++)switch(b) {
case q1:c.push(new v1(d[e]));
break;
case r1:c.push(new w1(d[e]));
break;
case s1:c.push(new x1(d[e]));
break;
case t1:c.push(new y1(d[e]));
break
}return c
};
u1[_P].e=function () {
u1.b.e.call(this);
this.vP=null;
this.GH=null;
this.uP=null;
this.nP=null
};
var v1=function (a) {
B.call(this);
this.Za=a.syncStatus;
this.rn=a.syncSubStatus;
this.n5=a.syncStatusText;
this.z5=a.syncSubStatusText;
this.M5=a.syncStartedTimestampText;
this.G5=a.syncCompletedTimestampText
};
A(v1,B);
v1[_P].zb=function () {
return this.Za
};
v1[_P].aA=function () {
return this.n5
};
var w1=function (a) {
B.call(this);
this.rT=a.documentId;
this.kg=a.documentName;
this.W_=a.metadataDirty;
this.rG=a.contentState
};
A(w1,B);
w1[_P].q=function () {
return this.kg
};
var x1=function (a) {
B.call(this);
this.Gf=
a.serviceId||null;
this.Er=a.url;
this.Ka=a.initialized;
this.Kr=a.aborted
};
A(x1,B);
x1[_P].Yc=function () {
return this.Gf
};
x1[_P].mf=function () {
return this.Er
};
var y1=function (a) {
B.call(this);
this.s5=a.storeName;
this.v5=a.storeVersion
};
A(y1,B);
y1[_P].q=function () {
return this.s5
};
var z1="There were some problems updating software. You should still be able to continue using {$appName} Offline.",A1=function (a) {
J.call(this);
this.n=a;
this.m=new $i(this);
this.Vh=new D;
this.Uk=new D;
this.mr=new D;
this.bk=new D;
this.ii=new D;
this.yn=new D;
this.wQ=z(z1,{
appName:a.Sk
})
};
A(A1,J);
var B1="Checking for new documents...",C1=z(B1),D1="Synchronizing documents...",E1=z(D1),F1="Errors occurred while updating software and syncing documents.",G1=z(F1),H1="An error occurred while syncing documents.",
I1=z(H1),J1="An error occurred while updating software.",K1=z(J1),L1="detroit.gears.GearsManager";
A1[_P].w=Lk(L1);
A1[_P].Ka=false;
A1[_P].Wb=null;
A1[_P].C=null;
A1[_P].nb=null;
A1[_P].Za=null;
A1[_P].od=false;
A1[_P].sE=false;
A1[_P].wL=true;
A1[_P].xL=null;
var M1="logout-disabled";
A1[_P].F_=M1;
A1[_P].QK=function () {
return this.ii.o(4)!=null
};
A1[_P].yt=function () {
return this.Vh.o(4)
};
A1[_P].Xl=function () {
return this.Vh.o(0)
};
A1[_P].PV=function () {
return this.Vh.o(1)
};
A1[_P].uz=function () {
return this.Vh.o(2)
};
A1[_P].au=function () {
return this.Vh.o(3)
};
A1[_P].$a=function () {
return this.Za!=dN
};
A1[_P].cZ=function () {
return !(!this.yn.o(1))
};
A1[_P].lZ=function () {
return !(!this.yn.o(0))
};
A1[_P].ND=function (a) {
var b=this.Wb;
if(b)this.Bq(b);
this.Wb=a;
if(this.od&&a)this.Qr(a)
};
A1[_P].Pq=function (a) {
this.C=a
};
var N1="Change status from ",O1=" to ",P1="s";
A1[_P].q4=function (a) {
var b=this.Za;
if(b!=a) {
this.w.qa(N1+b+O1+a+Vc);
this.Za=a;
var c=this.uJ(a);
this.dispatchEvent(new wr(tr,this,a,null,c));
var d,e=this.bk;
switch(a) {
	case P1:d=
	e.o(0);
	break;
	case NT:d=e.o(1);
	break
}if(d)this.Fy(d)
}
};
A1[_P].QO=function (a) {
if(!this.sE&&a) {
this.sE=true;
if(this.od)this.Xl().$H()
}
};
A1[_P].M3=function (a) {
var b=this.n.JB;
if(this.wL!=a&&b) {
fz(b,this.F_);
if(a)Pa(b,this.xL);
else b.removeAttribute(qc)
}this.wL=a
};
A1[_P].Xx=function () {
this.yt().Xx()
};
A1[_P].JC=function () {
this.yt().JC()
};
var Q1="var config = ",R1="Error initializing Gears. Gears not installed or does not have permission",S1="Error initializing Gears.";
A1[_P].Kb=function () {
try{
if(this.hK()) {
	var a=
	this.n;
	this.Uk.k(2,ht);
	var b=a.io;
	ws(!Hf(b));
	xs(b);
	Ds(a.FF);
	ys(a.lU);
	As(a.jU);
	Bs(a.kU);
	zs(a.iU);
	var c=this.m;
	c.d(this,tr,this.qc);
	this.xL=this.n.JB[rc];
	var d=new n1,e=this.Vh;
	e.k(0,d);
	c.d(d,dt,this.JY);
	c.d(d,Br,this.IY);
	c.d(d,Kr,this.HY);
	if(this.sE)d.$H();
	var f=new V0;
	e.k(1,f);
	c.d(f,dt,this.sY);
	c.d(f,I0,this.rY);
	c.d(f,[Kr,Y0],this.qY);
	var g=this.Wb;
	if(g)this.Qr(g);
	var h=new B0;
	e.k(2,h);
	if(a.El) {
		c.d(h,dt,this.EA);
		this.Bq(g)
	}var j=new f1;
	e.k(3,j);
	L_(Q1+a.cd()+DU);
	var k=this.nb=new x_,m=new m0(k,a.sI);
	e.k(4,m);
	m.ND(g);
	c.d(m,[ft,gt],this.VW);
	c.d(m,[Nr,Mr],this.uX);
	m.Kb();
	m.OO(a.Vk);
	m.NO(a.qn);
	m.ZH(true);
	if(!a.El) {
		g.OO(a.Vk);
		g.NO(a.qn);
		g.ZH(true)
	}this.C.pO(m);
	this.C.Xm(this);
	this.od=true;
	this.cj()
}else {
	this.w.hn(R1);
	this.dispatchEvent(vr)
}
}catch(p) {
this.w.hn(S1,p);
this.dispatchEvent(vr)
}
};
A1[_P].NK=function () {
return v_()&&s_()[lb]&&og(s_()[lb],this.n.oU)>=0
};
var T1="0.3.0",U1="{$appName} Offline",V1="{$appName} will be able to store and access information on this computer.",W1="32x32",X1="beta.timer";
A1[_P].hK=function () {
if(v_()) {
var a=s_();
if(og(a[lb],T1)>=0) {
	if(a.hasPermission)return true;
	var b=this.n,c=z(U1,{
		appName:b.Sk
	}),d=z(V1,{
		appName:b.Sk
	});
	return a.getPermission(c,b.mz[W1],d)
}else {
	try{
		s_().create(X1,z_)
	}catch(e) {
		return false
	}return true
}
}return false
};
A1[_P].LK=function () {
return og(s_()[lb],T1)>=0
};
var Y1="You can always create a desktop shortcut later by visiting 'Settings' in {$appName}.",Z1="{$appName} for {$domain}",$1="beta.desktop",a2="0.3.6",b2="Error in creating the desktop shortcut icon.";
A1[_P].EG=function () {
if(this.LK()&&this.hK()) {
var a=this.n,b=z(Y1,{
	appName:a.Sk
}),c=a.Sk,d=a.io;
if(!Hf(d)) {
	var e=z(Z1,{
		appName:c,domain:d
	});
	c=e
}try{
	var f=s_().create($1);
	if(og(s_()[lb],a2)>=0)f.createShortcut(c,Vc,a.mz,b);
	else f.createShortcut(c,b,Vc,a.mz)
}catch(g) {
	this.w.cl(b2,g)
}
}
};
A1[_P].qc=function () {
this.M3(this.$a())
};
var c2="Received INITIALIZE from CommunicationsManager. Setting the worker for the SyncAgent and ResoureManager clients",d2="Received INITIALIZE_ERROR from CommunicationsManager. Setting that status as ERROR.";
A1[_P].VW=function (a) {
if(a[x]==ft) {
this.w.qa(c2);
var b=this.yt().Tm;
this.Xl().cr(b);
this.PV().cr(b);
this.uz().cr(b);
this.au().cr(b);
var c={
};
c.gears=true;
Sh(c);
this.Ka=true;
this.dispatchEvent(ur)
}else if(a[x]==gt) {
this.w.hn(d2);
this.ii.k(4,true);
this.cj();
this.dispatchEvent(vr)
}
};
var e2="Setting the status for the communications manager client.";
A1[_P].EA=function (a) {
var b=this.Uk;
if(a.Ag)b.k(2,a.Ag);
else {
var c=a[bc]==0?ht:vt;
b.k(2,c)
}if(!this.n.El) {
this.w.qa(e2);
this.uz().fd(b.o(2))
}this.cj()
};
A1[_P].JY=
function (a) {
if(a[bc]==0)this.bk.remove(0);
this.Uk.k(0,a[bc]);
this.mr.k(0,a.nE);
this.C.FT(a[bc]!=2);
this.cj()
};
A1[_P].IY=function (a) {
this.bk.k(0,a);
if(this.Za==P1)this.Fy(a)
};
var f2="Error received from the sync agent of error type: ",g2=' for service ids: "';
A1[_P].HY=function (a) {
this.w.hn(f2+a.Jo+g2+a.Io+Zd);
this.ii.k(0,a);
this.cj()
};
A1[_P].sY=function (a) {
if(a[bc]==0)this.bk.remove(1);
this.Uk.k(1,a[bc]);
this.mr.k(1,a.nE);
this.cj()
};
A1[_P].rY=function (a) {
this.bk.k(1,a);
if(this.Za==NT)this.Fy(a)
};
var h2="progress_update";
A1[_P].Fy=function (a) {
this.dispatchEvent(new wr(h2,this,this.Za,a,this.uJ(this.Za)))
};
var i2="Error received from the resource manager of failure type: ",j2='Service ids "',k2="Gaia failure: ",l2="Doclist failure: ";
A1[_P].qY=function (a) {
this.w.hn(i2+a.Jo);
this.w.cl(j2+a.Io+Zd);
this.w.cl(k2+a.qI);
this.w.cl(l2+a.DH);
switch(a[x]) {
case Kr:this.ii.k(1,a);
this.cj();
break;
case Y0:this.yn.k(1,a);
break
}
};
var m2="Handle Gears communications manager event.";
A1[_P].uX=function (a) {
this.w.Cj(m2);
switch(a[x]) {
case Mr:var b=a.kb.K();
if(b==15)this.l6();
else if(b==17) {
	var c=a.Ec,d=new D_(c.lj),e=new u1(c.Yk);
	this.dispatchEvent(new yr(d,e))
}break;
default:break
}
};
var n2="e";
A1[_P].uJ=function (a) {
var b=null;
switch(a) {
case vi:var c=this.yn,d=c.o(1);
if(d)b=this.wQ+this.pz(d);
break;
case P1:var e=this.mr.o(0);
if(e==1)b=C1;
else if(e==2)b=E1;
break;
case n2:var f=this.ii,g=f.o(1),h=f.o(0);
if(g&&h)b=G1+this.vJ(h)+this.pz(g);
else if(h)b=I1+this.vJ(h);
else if(g)b=K1+this.pz(g);
break;
default:break
}return b
};
var o2="syncclient",p2=" Failed to initialize syncing for the applications: {$appNames}",q2="documentsynctimeout",r2=" Failed to sync documents for the applications: {$appNames}",s2="documentmetadatasync",t2=" Failed to sync document metadata for the Doc Home page.";
A1[_P].vJ=function (a) {
var b=this.xI(a.Io);
switch(a.Jo) {
case o2:var c=z(p2,{
	appNames:b
});
return c;
case q2:var d=z(r2,{
	appNames:b
});
return d;
case s2:var e=z(t2);
return e
}return C
};
var u2="captureclient",v2=" Failed to initialize software updates for the applications: {$appNames}",
w2="resourcescapture",x2="failedcapture",y2="authentication",z2="Docs Home page",A2=" Failed to update software for the applications: {$appNames}";
A1[_P].pz=function (a) {
var b=this.xI(a.Io),c=C;
switch(a.Jo) {
case u2:var d=z(v2,{
	appNames:b
});
c=d;
break;
case w2:case x2:var e=[];
if(a.qI) {
	var f=z(y2);
	e.push(f)
}if(a.DH) {
	var g=z(z2);
	e.push(g)
}if(b)e=e.concat(b);
var h=z(A2,{
	appNames:e.join(Yj)
});
c=h;
break
}return c
};
A1[_P].xI=function (a) {
if(!a||a[o]==0)return null;
var b=new Vq;
for(var c=0;c<a[o];c++) {
b.g(H0(a[c]));
if(c!=a[o]-1)b.g(Yj)
}return b.toString ()
};
A1[_P].Qr=function (a) {
this.m.d(a,[et],this.EA)
};
A1[_P].Bq=function (a) {
this.m.M(a,[et],this.EA)
};
var B2="ni";
A1[_P].cj=function () {
var a=B2;
if(v_()) {
a=tP;
if(this.od) {
	var b=this.Uk;
	a=b.o(2)==ht?vi:dN;
	if(this.ii.D()>0)a=n2;
	switch(b.o(1)) {
		case 1:a=NT;
		break;
		case 0:default:break
	}switch(b.o(0)) {
		case 1:case 2:a=P1;
		break;
		case 0:default:break
	}
}
}this.q4(a)
};
var C2="Disabling Gears";
A1[_P].l6=function () {
var a=this.C;
a.pO(null);
a.Xm(null);
this.yH();
this.w.qa(C2);
this.od=
false;
this.Ka=false;
this.cj()
};
A1[_P].yH=function () {
this.m.vc();
var a=this.Vh;
bh(a,function (b) {
b.j()
});
a.clear();
if(this.nb) {
this.nb.j();
this.nb=null
}this.bk.clear();
this.Uk.clear();
this.mr.clear();
this.ii.clear();
this.yn.clear()
};
A1[_P].e=function () {
A1.b.e.call(this);
this.yH();
this.n=null;
this.Vh=null;
this.m.j();
this.m=null;
this.C=null;
this.bk=null;
this.Uk=null;
this.mr=null;
this.ii=null;
this.yn=null
};
var D2=function (a) {
a_.call(this,a);
if(a.od) {
this.getContext().Xm(new A1(a));
var b=this.Ks;
if(b)this.ba().d(b,Jr,this.ZW)
}
};
A(D2,a_);
D2[_P].Kb=function () {
var a=this.n;
if(a.od) {
Lk(e_).Tq(uk);
var b=this.getContext(),c=b.O;
c.ND(Ku());
c.Pq(b.C);
if(!this.Ks)c.QO(true);
if(a.lz&&a.od)c.Kb()
}D2.b.Kb.call(this)
};
D2[_P].pe=function (a,b,c) {
D2.b.pe.call(this,a,b,c);
var d=this.n;
if(d.lz&&d.od)this.O.yt().Pe(new g0(b,a.K()))
};
D2[_P].ZW=function () {
var a=this.getContext().O;
if(a)a.QO(true)
};
var E2=function (a,b) {
NN.call(this,a,b);
this.za().d(a.Gc,oA,this.ni);
this.za().d(a.Gc,vA,this.HA);
this.SC=new CT(null,b)
};
A(E2,NN);
E2[_P].vb=null;
E2[_P].uE=null;
E2[_P].yr=null;
var F2="actionstatusbox";
E2[_P].ja=F2;
var G2="actionstatusbox-border";
E2[_P].Qh=G2;
var H2="actionstatusbox-bg";
E2[_P].oR=H2;
var I2="actionstatusbox-text";
E2[_P].P5=I2;
var J2="actionstatusbox-undo";
E2[_P].j6=J2;
var K2="#fad163";
E2[_P].lS=K2;
E2[_P].kS=K2;
E2[_P].Pg=false;
E2[_P].Zk=C;
E2[_P].zP=false;
E2[_P].Hy=false;
E2[_P].KE=C;
E2[_P].Nq=
function (a) {
if(this.Pg!=a&&this.z)this.Mq(a);
this.Pg=a
};
E2[_P].Mq=function (a) {
Ya(this.h[u],a?C:Gx);
if(F&&a)this.SC.ha()
};
E2[_P].q3=function (a) {
if(this.Hy!=a&&this.z)this.iO(a);
this.Hy=a
};
E2[_P].iO=function (a) {
Ya(this.yr[u],a?C:Gx)
};
E2[_P].RD=function (a,b) {
if(this.Zk!=a&&this.z)this.ar(a,b);
this.Zk=a;
this.zP=b
};
E2[_P].u4=function (a) {
if(this.KE!=a&&this.z)this.TO(a);
this.KE=a
};
E2[_P].ar=function (a,b) {
n(this.uE,b?a:eg(a))
};
E2[_P].TO=function (a) {
n(this.yr,eg(a))
};
var L2="display: ",M2="none;";
E2[_P].f=
function () {
var a=this.i;
this.h=a.f(L,{
"class":this.ja,style:L2+this.Pg?C:M2
});
this.vb=a.f(L,{
},this.uE=a.f(KC,{
"class":this.P5
}),this.yr=a.f(KC,{
"class":this.j6
}));
var b=this.SC;
b.rD(this.vb);
b.Vm(new Hs(3,3,3,3));
b.kw(new Hs(1,3,1,3));
b.$v(this.Qh);
b.bw(this.oR);
b.Zv(this.lS);
b.Yv(this.kS);
this.SC.ub(this.h)
};
E2[_P].t=function () {
E2.b.t.call(this);
this.Mq(this.Pg);
this.iO(this.Hy);
this.ar(this.Zk,this.zP);
this.TO(this.KE);
this.ba().d(this.yr,fi,this.VY)
};
E2[_P].ni=function (a) {
var b=true,c=false,d=
a[bc],e=a.i6;
switch(a.Ag) {
case Pz:c=a.kb.Nx();
break;
case tA:return ;
default:break
}this.Nq(b);
this.RD(d,a.a_);
this.q3(c);
this.u4(e)
};
E2[_P].HA=function (a) {
if(!a.Ag||a.Ag!=tA)this.Nq(false)
};
E2[_P].VY=function () {
this.getContext().V.MT()
};
E2[_P].e=function () {
E2.b.e.call(this);
this.uE=null;
this.vb=null;
this.yr=null
};
var N2=function () {
uR.call(this)
};
A(N2,uR);
var O2=null,P2=0,Q2=function () {
return O2||(O2=new N2)
};
N2[_P].f=function (a) {
var b=this.Gj(a);
return a.i.f(L,b?{
"class":b.join(E)
}:null,this.sS(a.ac(),a.cb,a.i))
};
N2[_P].sS=function (a,b,c) {
var d=[];
for(var e=0,f=0;e<b[y];e++) {
var g=[];
for(var h=0;h<b[r];h++) {
	var j=a&&a[f++];
	g.push(this.ky(j,c))
}d.push(this.uy(g,c))
}return this.AS(d,c)
};
var R2="-table",S2="-body",T2="grid";
N2[_P].AS=function (a,b) {
var c=b.f(Dz,{
"class":this.H()+R2
},b.f(Ez,{
"class":this.H()+S2
},
a));
c.cellSpacing=0;
c.cellPadding=0;
zC(c,T2);
return c
};
var U2="-row";
N2[_P].uy=function (a,b) {
return b.f(uz,{
"class":this.H()+U2
},a)
};
var V2="-cell",W2="-cell-",X2="gridcell";
N2[_P].ky=function (a,b) {
var c=b.f(vz,{
"class":this.H()+V2,id:this.H()+W2+P2++
},a);
zC(c,X2);
return c
};
N2[_P].Na=function () {
return false
};
N2[_P].Q=function () {
return null
};
N2[_P].ma=function (a,b) {
if(a) {
var c=uw(Ez,this.H()+S2,a)[0];
if(c) {
	var d=0;
	Ge(c[sc],function (k) {
		Ge(k[dc],function (m) {
			Jw(m);
			if(b) {
				var p=b[d++];
				if(p)Iw(m,p)
			}
		})
	});
	if(d<b[o]) {
		var e=[],f=pw(a),g=c[sc][0][dc][o];
		while(d<b[o]) {
			var h=b[d++];
			e.push(this.ky(h,f));
			if(e[o]==g) {
				var j=this.uy(e,f);
				Iw(c,j);
				sa(e,0)
			}
		}if(e[o]>0) {
			while(e[o]<g)e.push(this.ky(C,f));
			var j=this.uy(e,f);
			Iw(c,j)
		}
	}
}Ux(a,true,qg)
}
};
var Y2="TD";
N2[_P].vz=function (a,b) {
var c=a.c();
while(b&&b[ub]==1&&b!=c) {
if(b[xc]==Y2&&O(b,this.H()+V2))return b[gc];
b=b[Dc]
}return null
};
var Z2="-cell-hover",$2="activedescendent";
N2[_P].qK=function (a,b,c) {
if(b) {
var d=b[Dc];
ez(d,this.H()+Z2,c);
var e=a.c()[gc];
CC(e,$2,
d.id)
}
};
var a3="-cell-selected";
N2[_P].PN=function (a,b,c) {
if(b) {
var d=b[Dc];
ez(d,this.H()+a3,c)
}
};
var b3="goog-palette";
N2[_P].H=function () {
return b3
};
var c3=function (a) {
J.call(this);
this.Pc=[];
this.sx(a)
};
A(c3,J);
c3[_P].Pc=null;
c3[_P].Db=null;
c3[_P].Gk=null;
c3[_P].g4=function (a) {
this.Gk=a
};
c3[_P].bc=function () {
return this.Pc[o]
};
c3[_P].yK=function (a) {
return a?Fe(this.Pc,a):-1
};
c3[_P].eg=function (a) {
return this.Pc[a]
};
c3[_P].sx=function (a) {
if(a) {
Ge(a,function (b) {
	this.Rm(b,false)
},this);
Ve(this.Pc,a)
}
};
c3[_P].u=function (a) {
this.Fg(a,this.bc())
};
c3[_P].Fg=function (a,b) {
if(a) {
this.Rm(a,false);
Re(this.Pc,a,b)
}
};
c3[_P].Vb=function (a) {
if(a&&Te(this.Pc,
a))if(a==this.Db) {
this.Db=null;
this.dispatchEvent(aA)
}
};
c3[_P].Df=function (a) {
this.Vb(this.eg(a))
};
c3[_P].pc=function () {
return this.Db
};
c3[_P].Eb=function (a) {
if(a!=this.Db) {
this.Rm(this.Db,false);
this.Db=a;
this.Rm(a,true)
}this.dispatchEvent(aA)
};
c3[_P].Vl=function () {
return this.yK(this.Db)
};
c3[_P].en=function (a) {
this.Eb(this.eg(a))
};
Ua(c3[_P],function () {
Pe(this.Pc);
this.Db=null
});
c3[_P].e=function () {
c3.b.e.call(this);
this.Pc=null;
this.Db=null
};
c3[_P].Rm=function (a,b) {
if(a)if(typeofthis.Gk==dd)this.Gk(a,
b);
else if(typeofa.dn==dd)a.dn(b)
};
var d3=function (a,b,c) {
U.call(this,a,b||Q2(),c)
};
A(d3,U);
d3[_P].cb=null;
d3[_P].dc=-1;
d3[_P].L=null;
d3[_P].e=function () {
d3.b.e.call(this);
if(this.L) {
this.L.j();
this.L=null
}this.cb=null
};
d3[_P].Wm=function (a) {
d3.b.Wm.call(this,a);
this.xF();
if(this.L) {
this.L.clear();
this.L.sx(a)
}else {
this.L=new c3(a);
this.L.g4(xd(this.Rm,this));
this.He().d(this.L,aA,this.DA)
}this.dc=-1
};
d3[_P].Ro=function () {
return null
};
d3[_P].vg=function () {
};
d3[_P].am=function (a) {
d3.b.am.call(this,a);
var b=this.r.vz(this,a[v]);
if(b&&
a[mb]&&Tw(b,a[mb]))return ;
if(b!=this.Jt())this.tO(b)
};
d3[_P].mu=function (a) {
d3.b.mu.call(this,a);
var b=this.r.vz(this,a[v]);
if(b&&a[mb]&&Tw(b,a[mb]))return ;
if(b==this.Jt())this.r.qK(this,b,false)
};
d3[_P].ee=function (a) {
d3.b.ee.call(this,a);
if(this.je()) {
var b=this.r.vz(this,a[v]);
if(b!=this.Jt())this.tO(b)
}
};
d3[_P].mg=function () {
var a=this.Jt();
if(a) {
this.Eb(a);
return this.dispatchEvent(Tz)
}return false
};
d3[_P].rc=function (a) {
var b=this.ac(),c=b?b[o]:0,d=this.cb[r];
if(c==0||!this.Wa())return false;
if(a[fc]==13||a[fc]==32)return this.mg(a);
if(a[fc]==36) {
this.Fc(0);
return true
}else if(a[fc]==35) {
this.Fc(c-1);
return true
}var e=this.dc<0?this.Vl():this.dc;
switch(a[fc]) {
case 37:if(e==-1)e=c;
if(e>0) {
	this.Fc(e-1);
	a.preventDefault();
	return true
}break;
case 39:if(e<c-1) {
	this.Fc(e+1);
	a.preventDefault();
	return true
}break;
case 38:if(e==-1)e=c+d-1;
if(e>=d) {
	this.Fc(e-d);
	a.preventDefault();
	return true
}break;
case 40:if(e==-1)e=-d;
if(e<c-d) {
	this.Fc(e+d);
	a.preventDefault();
	return true
}break
}return false
};
d3[_P].DA=
function () {
};
d3[_P].$q=function (a,b) {
if(this.c())throwi(Vz);
this.cb=od(a)?new Ts(a,b):a;
this.xF()
};
d3[_P].Jt=function () {
var a=this.ac();
return a&&a[this.dc]
};
d3[_P].Fc=function (a) {
if(a!=this.dc) {
this.sK(this.dc,false);
this.dc=a;
this.sK(a,true)
}
};
d3[_P].tO=function (a) {
var b=this.ac();
this.Fc(b?Fe(b,a):-1)
};
d3[_P].Vl=function () {
return this.L?this.L.Vl():-1
};
d3[_P].pc=function () {
return this.L&&this.L.pc()
};
d3[_P].en=function (a) {
if(this.L)this.L.en(a)
};
d3[_P].Eb=function (a) {
if(this.L)this.L.Eb(a)
};
d3[_P].sK=
function (a,b) {
if(this.c()) {
var c=this.ac();
if(c&&a>=0&&a<c[o])this.r.qK(this,c[a],b)
}
};
d3[_P].Rm=function (a,b) {
if(this.c())this.r.PN(this,a,b)
};
d3[_P].xF=function () {
var a=this.ac();
if(a)if(this.cb&&this.cb[r]) {
var b=l.ceil(a[o]/this.cb[r]);
if(!od(this.cb[y])||this.cb[y]<b)Za(this.cb,b)
}else {
var c=l.ceil(l.sqrt(a[o]));
this.cb=new Ts(c,c)
}else this.cb=new Ts(0,0)
};
var g3=function (a,b,c) {
d3.call(this,null,b||e3||(e3=new f3),c);
this.pD(a)
};
A(g3,d3);
g3[_P].Hg=null;
g3[_P].pD=function (a) {
this.Hg=a;
this.oq=null;
this.ma(this.ny())
};
g3[_P].dh=function () {
var a=this.pc();
return a?this.r.GU(this,a):null
};
g3[_P].Fh=function (a) {
var b=-1,c=this.Hg;
for(var d=0;d<c[o];d++)if(c[d].hb(a)) {
b=d;
break
}this.en(b)
};
g3[_P].ny=function () {
var a=this.i,b=this.r;
return Ie(this.Hg,function (c,d) {
return b.oS(c,d,a)
})
};
var f3=function () {
N2.call(this)
};
A(f3,N2);
var e3=null;
var h3=z(xq),i3=
"documentcolor-palette";
f3[_P].H=function () {
return i3
};
var j3="-colorswatch-ie",k3="-colorswatch",l3="background-color:",m3="; color:";
f3[_P].oS=function (a,b,c) {
var d=c.f(L,{
"class":this.H()+(F?j3:k3),style:kg(l3,a.kl,m3,a.Sw)
},h3);
d.$R=b;
return d
};
var n3="-cell-selected-dark";
f3[_P].PN=function (a,b,c) {
if(b) {
var d=b,e=this.H()+(this.WZ(d[u].backgroundColor)?n3:a3),f=b[Dc];
ez(f,e,c);
n(d,c?C:h3)
}
};
f3[_P].WZ=function (a) {
var b=Vv(Qv(a).cm),c=0;
for(var d=0;d<b[o];d++)c+=b[d];return c<400
};f3[_P].GU=function (a,
b) {
return a.Hg[b.$R]
};
var o3="Default color",p3="Remove color",s3=function (a,b) {
bT.call(this,b);
this.tT=a;
var c=new g3(a,null,b);
c.$q(6);
this.u(c);
this.ys=c;
var d=z(o3),e=new W(d);
e.A(q3);
this.u(e);
var f=z(p3);
e=new W(f);
e.A(r3);
this.u(e);
this.m=new $i(this)
};
A(s3,bT);
var t3="colorpick",q3="defaultcolorpick",r3="removecolor";
s3[_P].f=function () {
if(!this.c())s3.b.f.call(this)
};
s3[_P].dh=function () {
return this.ys.dh()
};
s3[_P].Fh=function (a) {
this.ys.Fh(a)
};
s3[_P].t=function () {
s3.b.t.call(this);
var a=this.m;
a.d(this.ys,Tz,
this.SW);
a.d(this,Tz,this.NX)
};
s3[_P].SW=function () {
this.dispatchEvent(t3)
};
s3[_P].NX=function (a) {
switch(a[v].Y) {
case q3:this.dispatchEvent(q3);
break;
case r3:this.dispatchEvent(r3);
break
}
};
s3[_P].e=function () {
s3.b.e.call(this);
this.m.j();
this.m=null;
this.tT=null;
this.ys=null
};
;
var u3=function (a,b,c,d,e) {
GS.call(this,a,b,c,d,e)
};
A(u3,GS);
u3[_P].tb=function (a,b) {
a.vg(b.q());
a.Jk(Sp(b));
a.A(b.l());
a.Kk(b.l())
};
;
var v3=function (a,b,c,d) {
GS.call(this,a,b,false,c,d)
};
A(v3,GS);
v3[_P].tb=function (a,b) {
a.vg(b.q());
a.Jk(b.Ie());
var c=b.Ia();
a.A(c);
a.Kk(c)
};
v3[_P].bg=function () {
var a=this.$b.pb(),b=a.D(),c=[],d=[];
for(var e=0;e<b;e++) {
var f=a.yb(e);
if(!this.filter(f))if(f.ig())d.push(f);
else c.push(f)
}b=d[o];
for(var e=0;e<b;e++)c.push(d[e]);return c
};qa(v3[_P],function () {
return false
});
var w3=function (a,b,c,d) {
v3.call(this,a,b,c,d);
var e=a.n.uF;
for(var f=0;f<e[o];f++) {
var g=e[f];
this.Eg(new W(g.name,undefined,undefined,g.url,d),true)
}
};
A(w3,v3);
qa(w3[_P],function (a) {
if(a.ig())return false;
return !Vp(a,lq)
});
var x3=function (a,b,c,d) {
w3.call(this,a,b,c,d)
};
A(x3,w3);
x3[_P].ry=function () {
return new eT(this.i)
};
var y3=function () {
jS.call(this)
},z3;
A(y3,jS);
var A3="goog-submenu";
y3[_P].f=function (a) {
var b=y3.b.f.call(this,a);
N(b,A3);
this.jF(a,b);
return b
};
y3[_P].Q=function (a,b) {
var b=y3.b.Q.call(this,a,b);
N(b,A3);
this.jF(a,b);
var c=uw(L,wS,b);
if(c[o]) {
var d=new yS(a.i),e=c[0];
M(e,false);
a.i.W[Ub].appendChild(e);
d.Q(e);
a.dd(d)
}return b
};
var B3="goog-submenu-arrow";
y3[_P].tf=function (a) {
y3.b.tf.call(this,a);
var b=a.c(),c=a.i.uQ(KC,B3,b)[0];
C3(a,c);
if(c!=b[$b])b.appendChild(c)
};
y3[_P].jF=function (a,b) {
var c=
a.i.f(KC);
va(c,B3);
C3(a,c);
b.appendChild(c)
};
var D3="\u25c4",E3="\u25ba",F3="goog-submenu-arrow-rtl",C3=function (a,b) {
var c=D3,d=E3;
if(a.fb()) {
N(b,F3);
Ww(b,a.Ur?c:d)
}else {
cz(b,F3);
Ww(b,a.Ur?d:c)
}
};
var G3=function (a,b,c,d) {
sS.call(this,a,b,c,d||z3||(z3=new y3))
};
A(G3,sS);
G3[_P].af=null;
G3[_P].iP=null;
G3[_P].JA=false;
G3[_P].ic=null;
G3[_P].Ho=false;
G3[_P].Ur=true;
G3[_P].t=function () {
G3.b.t.call(this);
var a=this.Aa();
if(!a.z)a.ub();
zi(a,Rz,this.VL,false,this);
zi(this.J(),kM,this.cM,false,this)
};
G3[_P].$=function () {
if(this.ic)Ci(this.ic,Rz,this.VL,false,this);
Ci(this.J(),kM,this.cM,false,this);
G3.b.$.call(this);
if(this.ic&&!this.Ho) {
this.ic.$();
Mw(this.ic.c())
}
};
G3[_P].e=function () {
if(this.ic&&
!this.Ho) {
this.ic.j();
this.ic=null
}G3.b.e.call(this)
};
G3[_P].Pd=function (a,b) {
G3.b.Pd.call(this,a,b);
if(b)this.Aa().Dh(true);
if(!a) {
bt(this.af);
this.af=at(this.ai,350,this)
}
};
G3[_P].aE=function () {
if(this.J().Sl()==this) {
this.Aa();
this.sH();
this.PO(true);
this.L7=false
}
};
G3[_P].ai=function () {
if(this.ic&&this.ic.J()==this) {
this.PO(false);
var a=this.ic.Sb();
for(var b=0;b<a[o];b++)if(typeofa[b].ai==dd)a[b].ai()
}
};G3[_P].ml=function () {
bt(this.af);
bt(this.iP)
};
G3[_P].s=function (a,b) {
var c=G3.b.s.call(this,
a,b);
if(c&&!this.La())this.ai();
return c
};
G3[_P].w1=function () {
var a=this.ic;
a.Nk(this);
a.s(false,true);
a.Xv(false);
a.xD(false);
if(!a.c())a.f()
};
G3[_P].sH=function () {
var a=this.J().Sb();
for(var b=0;b<a[o];b++)if(a[b]!=this&&typeofa[b].ai==dd) {
a[b].ai();
a[b].ml()
}
};
G3[_P].rc=function (a) {
var b=a[fc];
if(!this.JA)if(this.Wa()&&b==39) {
this.aE();
this.Aa().rK();
this.ml()
}else return false;
else if(this.Aa().rc(a)) {
}else if(b==37)this.ai();
else return false;
a.preventDefault();
return true
};
G3[_P].VL=function () {
if(this.ic.J()==
this) {
this.ml();
this.Ul().Pd(this);
this.sH()
}
};
G3[_P].cM=function (a) {
if(a[v]==this.Ul()) {
this.ai();
this.ml()
}
};
G3[_P].am=function (a) {
if(this.Wa()) {
this.ml();
this.iP=at(this.aE,350,this)
}G3.b.am.call(this,a)
};
G3[_P].mg=function () {
this.ml();
this.aE();
return true
};
var H3="goog-submenu-open";
G3[_P].PO=function (a) {
var b=this.Aa();
if(a!=b.La()) {
if(a) {
	this.BM();
	b.Fc(-1);
	this.JA=true;
	N(this.c(),H3)
}else {
	this.JA=false;
	cz(this.c(),H3)
}b.s(a)
}
};
G3[_P].BM=function () {
var a=new ZS(this.c(),this.Ur?6:5),b=this.Aa(),
c=b.c();
if(!b.La()) {
db(c[u],Nn);
M(c,true)
}a.gc(c,this.Ur?5:6,new Hs(0,0,0,0));
if(!b.La()) {
M(c,false);
db(c[u],jP)
}
};
G3[_P].u=function (a) {
this.Aa().u(a)
};
G3[_P].Fg=function (a,b) {
this.Aa().Fg(a,b)
};
G3[_P].Vb=function (a) {
this.Aa().Vb(a)
};
G3[_P].Df=function (a) {
this.Aa().Df(a)
};
G3[_P].eg=function (a) {
return this.Aa().eg(a)
};
G3[_P].bc=function () {
return this.Aa().bc()
};
G3[_P].Sb=function () {
return this.Aa().Sb()
};
G3[_P].Aa=function () {
if(!this.ic) {
this.dd(new yS(this.i));
this.Ho=false
}else if(this.Ho)this.ic.Nk(this);
return this.ic
};
G3[_P].dd=function (a) {
this.ic=a;
this.Ho=true;
this.w1()
};
G3[_P].ze=function (a) {
return this.Aa().ze(a)
};
LR(A3,function () {
return new G3
});
var K3=function (a,b,c,d,e) {
this.kh=b;
this.Ve=c||C;
G3.call(this,a,d,e,I3||(I3=new J3));
this.Nr(c)
};
A(K3,G3);
K3[_P].pi=C;
K3[_P].Jc=null;
K3[_P].xe=null;
K3[_P].Xk=null;
K3[_P].xj=false;
K3[_P].YS=null;
G3[_P].BM=function () {
var a=this.fb(),b=a?1:2,c=a?2:1,d=new ZS(this.c(),b),e=this.ic.c();
if(!this.ic.La()) {
db(e[u],Nn);
M(e,true)
}d.gc(e,c,new Hs(0,0,0,0));
if(!this.ic.La()) {
M(e,false);
db(e[u],jP)
}
};
K3[_P].Jk=function (a) {
var b=this.c();
if(a!=this.kh&&b)b[gc][u].backgroundImage=CS+a+Pd;
this.kh=a
};
K3[_P].Ie=function () {
return this.kh
};
K3[_P].wg=function (a) {
if(a!=this.xe&&this.c())this.r.wg(this,a);
this.xe=a
};
K3[_P].Zc=function () {
return this.xe
};
K3[_P].Pi=function (a) {
if(a!=this.Xk&&this.c())this.r.Pi(this,a);
this.Xk=a
};
K3[_P].te=function (a) {
if(a!=this.Jc&&this.c())this.r.te(this,a);
this.Jc=a
};
K3[_P].pa=function () {
return this.Jc
};
K3[_P].Hf=function (a) {
if(this.xj!=a&&this.c())this.r.Hf(this,a);
this.xj=a
};
K3[_P].Kk=function (a) {
var b=this.c();
if(this.pi!=a&&b)b.id=this.G(a);
this.pi=a
};
K3[_P].Od=function (a) {
var b=this.c();
if(b&&this.Ve!=
a)this.r.WF(this,this.Ve,a);
this.Ve=a
};
K3[_P].sD=function (a) {
this.YS=a;
this.I(a,true);
this.dd(a.Aa())
};
var J3=function () {
AS.call(this)
};
A(J3,AS);
J3[_P].y5=A3;
J3[_P].iR=B3;
var I3=null;
var L3=" goog-inline-block";
J3[_P].f=function (a) {
var b=J3.b.f.call(this,a);
N(b,this.y5);
var c=Fw(KC,{
"class":this.iR+L3
});
b.appendChild(c);
b.id=a.G(a.pi);
return b
};
var M3="No folders",N3="Unhide",Q3=function (a,b) {
NN.call(this,a,b);
var c=this.i,d=a.na.uh,e=z(M3);
this.O7=e;
var f=z(N3);
this.VP=f;
var g=d.hide;
this.mK=g.S();
g=d[FM];
this.gT=g.S();
var h={
},j={
},k={
},m={
};
this.Cd=h;
this.dC=j;
this.nI=k;
this.kq=m;
var p={
},q={
};
this.su=p;
this.Dy=q;
this.xb=new s3(an(),b);
this.CZ(a,c,d);
this.EZ(a,c,d);
this.JZ(a,c,d);
var t=this.za(),w=a.C;
if(w.Ka)this.Jf();
else {
this.Vc=true;
t.d(w,av,this.Jf)
}var $=new eT;
h[O3]=$;
jf(h,function (ka) {
this.I(ka)
},this);
this.yy=h[P3];
t.d(a.Pa,
QN,this.pf);
var za=a.O;
if(za) {
t.d(za,tr,this.qc);
this.Xa=za.$a();
this.UH(this.Xa)
}
};
A(Q3,NN);
var R3="goog-toolbar-item-addtofolder";
Q3[_P].ux=R3;
Q3[_P].yy=null;
Q3[_P].Xp=null;
Q3[_P].Vc=false;
Q3[_P].Kw=0;
Q3[_P].Xa=true;
var P3="default",S3=VM,O3="datasource";
Q3[_P].f=function () {
Q3.b.f.call(this);
var a=this.i,b=this.h,c=this.Cd,d=lf(c),e=d[o];
for(var f=0;f<e;f++) {
var g=d[f];
if(!g.c())g.f();
a.appendChild(b,g.c())
}
};
Q3[_P].t=function () {
Q3.b.t.call(this);
var a=this.za(),b=this.Cd,c=lf(b),d=c[o],e=lf(this.dC);
lf(this.nI);
var f=lf(this.kq);
for(var g=0;g<d;g++) {
var h=c[g],j=e[g],k=f[g];
if(j)a.d(j.Aa(),Tz,this.xp);
if(k) {
	a.d(k,[NR,kM],this.RX);
	a.d(k,Tz,this.sA)
}a.d(h,Tz,this.XW)
}var m=this.xb;
a.d(m,t3,this.rp);
a.d(m,q3,this.sp);
a.d(m,r3,this.up)
};
Q3[_P].MU=function (a) {
var b=0;
while(a&&b<15) {
if(a[Ac]&&a[Ac][$Q]&&a[Ac][$Q][Nc]==Zj)return a[Ac][aR][Nc];
a=a[Dc];
b++
}return null
};
Q3[_P].Bw=function (a,b,c) {
var d=this.fb()?2:1;
this.ih();
if(c) {
var e=this.MU(c);
if(e) {
	this.IZ(e);
	this.Cd[O3].Bw(a,b,d);
	return
}
}this.yy.Bw(a,
b,d)
};
Q3[_P].ih=function () {
jf(this.Cd,function (a) {
a.ih()
})
};
var T3="goog-toolbar-item-new",U3="goog-toolbar-item-upload",V3="goog-toolbar-item-hide",W3="goog-toolbar-item-delete";
Q3[_P].CZ=function (a,b,c) {
var d=new eT;
this.Cd[P3]=d;
var e,f,g,h;
f=c[lq];
e=new K3(f.S(),null,T3,null,b);
e.A(lq);
var j=this.sy(P3,a,b);
e.sD(j);
d.u(e);
f=c[AM];
e=new W(f.S(),null,U3,null,b);
e.A(AM);
d.u(e);
e=new xS;
d.u(e);
f=c[CM];
e=new W(f.S(),null,this.ux,null,b);
e.A(CM);
d.u(e);
f=c.hide;
e=new W(f.S(),null,V3,null,b);
e.A(kM);
if(this.getContext().n.jh)d.u(e);
h=e;
f=c[FM];
e=new W(f.S(),null,W3,null,b);
e.A(FM);
d.u(e);
g=e;
f=c[EM];
e=new W(f.S(),null,undefined,null,b);
e.A(EM);
if(this.getContext().n.Do)d.u(e);
f=c.more;
e=new K3(f.S(),null,undefined,null,b);
e.A(vM);
var k=new eT(b);
k.SD(true);
e.dd(k);
this.kq[P3]=k;
d.u(e);
this.su[P3]=h;
this.Dy[P3]=g
};
var X3="goog-toolbar-item-removefromfolder";
Q3[_P].EZ=function (a,b,c) {
var d=new eT;
this.Cd[S3]=d;
var e,f,g,h;
f=c[lq];
e=new K3(f.S(),null,T3,null,b);
e.A(lq);
var j=this.sy(S3,a,b);
e.sD(j);
d.u(e);
f=c[AM];
e=new W(f.S(),null,U3,null,b);
e.A(AM);
d.u(e);
e=new xS;
d.u(e);
f=c[CM];
e=new W(f.S(),null,this.ux,null,b);
e.A(CM);
d.u(e);
f=c[DM];
e=new W(f.S(),null,X3,null,b);
e.A(DM);
d.u(e);
f=c.hide;
e=new W(f.S(),null,V3,null,b);
e.A(kM);
if(this.getContext().n.jh)d.u(e);
g=e;
f=c[FM];
e=new W(f.S(),null,W3,null,b);
e.A(FM);
d.u(e);
h=e;
f=c[EM];
e=new W(f.S(),null,undefined,null,b);
e.A(EM);
if(this.getContext().n.Do)d.u(e);
f=c.more;
e=new K3(f.S(),null,undefined,null,b);
e.A(vM);
var k=new eT(b);
k.SD(true);
e.dd(k);
this.kq[S3]=k;
d.u(e);
this.su[S3]=g;
this.Dy[S3]=h
};
var Y3="goog-toolbar-item-emptytrash",Z3="goog-toolbar-item-undelete";
Q3[_P].JZ=function (a,b,c) {
var d=new eT;
this.Cd.trash=d;
var e,f;
f=c[lq];
e=new K3(f.S(),null,T3,null,b);
e.A(lq);
var g=this.sy(dq,a,b);
e.sD(g);
d.u(e);
f=c[AM];
e=new W(f.S(),null,U3,null,b);
e.A(AM);
d.u(e);
e=new xS;
d.u(e);
f=c[GM];
e=new W(f.S(),null,Y3,null,b);
e.A(GM);
d.u(e);
f=c[HM];
e=new W(f.S(),null,Z3,null,b);
e.A(HM);
d.u(e)
};
Q3[_P].IZ=function (a) {
var b=this.Cd[O3];
while(b.bc()>0)b.Df(0);
var c=aq(a);
if(cinstanceofI)this.DZ(a,c);
else if(cinstanceofyl&&this.getContext().n.Wd)this.HZ(a,c)
};
var $3="goog-menuitem-heading",a4="goog-menuitem-subheading",b4="{$num} items",c4="goog-toolbar-item-star-off",d4="goog-toolbar-item-star-on",e4="goog-toolbar-item-share",f4="goog-toolbar-item-unhide",g4="unhide";
Q3[_P].DZ=function (a,b) {
var c=this.getContext(),d=c.ea,e=true,f=c.ea.cc();
if(f[o]>0&&d.$c(b.l()))e=false;
if(!e&&f[o]==1)e=true;
var g=this.Cd[O3];
g.A(e?a:null);
var h=c.na,j=h.uh,k,m;
if(e) {
m=
new W(b.q(),Sp(b),$3);
m.Rd(2,false);
g.u(m);
m=new W(this.TU(b),null,a4);
m.Z(false);
g.u(m)
}else {
var p=z(b4,{
	num:f[o]
});
m=new W(p,null,$3);
m.Rd(2,false);
g.u(m)
}m=new xS;
g.u(m);
var q=e?b.getAttribute(Tn).p():h.gR(f);
if(q) {
k=j.unstar;
m=new W(k.S(),null,c4);
m.A(eM)
}else {
k=j.star;
m=new W(k.S(),null,d4);
m.A(oo)
}g.u(m);
var t=c.O;
if((!e||!Yp(b)||b.getAttribute($n).p())&&c.n.YH) {
k=j[BM];
m=new W(k.S(),null,e4);
m.A(BM);
if(t)m.Z(t.$a());
g.u(m)
}var w=this.Xp;
if(w&&w.sd()==1) {
k=j[GM];
m=new W(k.S(),null,Y3);
m.A(GM);
g.u(m);
if(t)m.Z(t.$a());
k=j[HM];
m=new W(k.S(),null,Z3);
m.A(HM);
g.u(m)
}else {
k=j[CM];
m=new W(k.S(),null,this.ux,null);
m.A(CM);
g.u(m);
var $=e?b.getAttribute(Xn).p():w&&w.Ke==0;
if($) {
	m=new W(this.VP,null,f4,null,this.i);
	m.A(g4)
}else {
	m=new W(this.mK,null,V3,null,this.i);
	m.A(kM)
}g.u(m);
m=new W(this.gT,null,W3,null,this.i);
m.A(FM);
g.u(m);
if(e&&this.getContext().n.Do) {
	k=j[EM];
	m=new W(k.S(),null,undefined,null,this.i);
	m.A(EM);
	g.u(m)
}
}var za=null;
za=e?this.getContext().na.cu(b,true):this.getContext().na.cu(undefined,
true);
var ka=za&&za[o]>0;
if(ka) {
m=new xS;
g.u(m);
this.sF(g,za,e?b:undefined)
}
};
Q3[_P].HZ=function (a,b) {
var c=this.getContext(),d=this.Cd[O3];
d.A(a);
var e=c.O,f=true;
if(e)f=e.$a();
var g=c.na,h=g.uh,j,k;
j=h[IM];
k=new W(j.S(),null,undefined,null,this.i);
k.A(IM);
k.Z(f);
d.u(k);
j=h[JM];
k=new W(j.S(),null,undefined,null,this.i);
k.A(JM);
var m=yJ(b.q(),b.p());
k.Z(!m.Fu());
d.u(k);
j=h[KM];
k=new W(j.S(),null,W3,null,this.i);
k.A(KM);
k.Z(f);
d.u(k);
j=h[LM];
k=new W(j.S(),null,undefined,null,this.i);
k.A(LM);
k.Z(f);
d.u(k)
};
Q3[_P].sy=function (a,b,c) {
var d;
d=new x3(b,null,false,c);
d.Aa().SD(true);
d.setActive(true);
d.Fd(false);
d.Tc(new BW(2),true);
this.dC[a]=d;
return d
};
Q3[_P].TU=function (a) {
var b=a.Kj(),c=[];
for(var d=0;d<b[o];d++)c.push(b[d].S());return c.join(Yj)+Yj+a.Nz()
};Q3[_P].qc=function (a) {
var b=this.Xa=a[bc]!=dN;
this.UH(b)
};
Q3[_P].UH=function (a) {
var b=this.Cd;
jf(b,function (c) {
var d=c.Sb();
for(var e=0;e<d[o];e++) {
	var f=d[e],g=f.Y;
	if(g==lq||g==AM||g==GM||g==BM)f.Z(a)
}
},this)
};
var h4="publish";
Q3[_P].XW=
function (a) {
var b=a[v].J().Y,c,d;
if(b) {
var e=aq(b);
if(einstanceofI)c=e;
else if(einstanceofyl)d=e
}var f=a[v].Y;
if(f) {
var g=this.getContext().na;
switch(f) {
	case AM:g.dK();
	break;
	case BM:g.FA(c);
	break;
	case h4:break;
	case DM:g.TJ(this.Xp);
	break;
	case kM:g.ku(true,c);
	break;
	case g4:g.ku(false,c);
	break;
	case FM:g.JJ(c);
	break;
	case GM:g.OJ(c);
	break;
	case HM:g.cK(c);
	break;
	case oo:g.GA(true,c);
	break;
	case eM:g.GA(false,c);
	break;
	case EM:g.UJ(c);
	break;
	case CM:g.S0(c);
	break;
	case IM:g.vT(d);
	break;
	case JM:g.b5(d);
	break;
	case KM:g.nH(d);
	break;
	case LM:g.hN(d);
	break;
	case lq:break;
	default:if(finstanceofam)g.rA(f,c);
	break
}
}
};
Q3[_P].xp=function (a) {
var b=a[v],c=this.Xp,d=c?c.J():null;
this.getContext().na.xA(b.Y,d);
a.stopPropagation();
this.ih()
};
Q3[_P].RX=function (a) {
if(a[x]==NR) {
var b=a[v],c=lf(this.kq);
for(var d=0;d<c[o];d++)if(c[d]==b) {
	this.cy(b);
	return
}
}
};
Q3[_P].sA=function (a) {
var b=a[v].Y;
this.getContext().na.rA(b)
};
Q3[_P].rp=function (a) {
this.nf(a,cn(this.xb.dh()))
};
Q3[_P].sp=function (a) {
this.nf(a,Zm())
};
Q3[_P].up=
function (a) {
this.nf(a,$m())
};
Q3[_P].nf=function (a,b) {
var c=a[v].J().J().Y,d;
if(c) {
var e=aq(c);
if(einstanceofI)d=e
}this.getContext().na.mA(b,d)
};
Q3[_P].cy=function (a) {
var b=this.Kw;
while(a.bc()!=b)a.Df(a.bc()-1);
var c=this.getContext().na.cu();
this.sF(a,c)
};
Q3[_P].sF=function (a,b,c) {
var d=this.i,e=this.getContext().na,f=c?[c]:null;
for(var g=0;g<b[o];g++) {
var h=b[g],j,k=h.Xg();
if(k&&k.Qb()==2&&k.Vo()==13) {
	j=new K3(h.S(),undefined,undefined,undefined,d);
	j.dd(this.xb);
	this.xb.Fh(e.BI(f))
}else j=new W(h.S(),
undefined,undefined,h.Xg(),d);
var m=k&&k.Iu(),p=this.Xa?true:m;
j.Z(h.Ua&&p);
a.u(j)
}
};
Q3[_P].pf=function (a) {
var b=a.Bg.ua();
this.Xp=b;
var c=this.Cd,d=c[P3];
if(b&&b.sd()==1)d=c.trash;
else if(b&&b.J())d=c[S3];
this.yy=d;
if(this.getContext().n.jh)this.fS(b)
};
Q3[_P].fS=function (a) {
var b=lf(this.su);
for(var c=0;c<b[o];c++) {
var d=b[c];
if(a&&a.Ke==0) {
	d.vg(this.VP);
	d.A(g4);
	d.Od(f4)
}else {
	d.vg(this.mK);
	d.A(kM);
	d.Od(V3)
}
}
};
Q3[_P].Jf=function () {
$p();
if(this.Vc) {
this.Vc=false;
at(function () {
	this.za().M(this.getContext().C,
	av,this.Jf)
},5,this)
}
};
Q3[_P].e=function () {
Q3.b.e.call(this);
this.xb.j();
this.xb=null;
jf(this.Cd,function (a) {
a.j()
});
this.Cd=null;
this.dC=null;
this.nI=null;
this.kq=null;
this.Xp=null;
this.Vc=null;
this.su=null;
this.Dy=null
};
var i4="documentpill",j4="documentpill-label",k4=cB;
var l4='" style="color: #',m4='; vertical-align: middle;"><div class="',n4='" style="border-color: #',o4="; background-color: #",p4=';"><div>',q4="</div></div></div></div>",r4=function (a,b) {
var c=b||new Q;
c.g(sB,k4,CB,a.wv?j4:i4,l4,a[Lb].Sw,m4,k4,CB,a.wv?j4+mW:i4+mW,n4,a[Lb].kl,iC,k4,CB,a.wv?j4+nW:i4+nW,n4,a[Lb].kl,o4,a[Lb].kl,p4,oB(a[Cc]),q4);
if(!b)return c.toString ()
};
var s4=function () {
B.call(this)
};
A(s4,B);
s4[_P].n=null;
var t4=null,u4=function () {
if(!t4)t4=new s4;
return t4
};
s4[_P].Kb=function (a) {
this.n=a
};
s4[_P].kn=function (a,b) {
return this.n.yj&&(b||a.gf()>0)
};
var v4="&nbsp;";
s4[_P].Xo=function (a,b) {
var c=a.R,d=a.W0;
if(this.kn(c,d&&d.wv)) {
var e=d||{
};
this.i1(e,c);
return r4(e,b)
}else {
var f=eg(c.q());
if(Hf(f))f=v4;
if(b)b.g(f);
else return f
}
};
s4[_P].i1=function (a,b) {
a.color=b.sz();
Wa(a,b.q())
};
s4[_P].e=function () {
s4.b.e.call(this);
this.n=null
};
var w4=function () {
MN.call(this);
this.zE=new Ej
};
A(w4,MN);
w4[_P].Lr=null;
w4[_P].yx=false;
w4[_P].Gx=false;
w4[_P].add=function (a,b) {
this.zE.add(a);
a.tD(16,true);
if(!this.Lr||b) {
a.Qd(16,true);
this.YN(a)
}var c=this.ba();
c.d(a,cA,this.PY);
c.d(a,dA,this.QY);
c.d(a,Tz,this.OY)
};
w4[_P].YN=function (a) {
var b=this.Lr;
if(b&&b!=a) {
this.yx=true;
b.Qd(16,false);
this.yx=false
}this.Lr=a
};
w4[_P].PY=function (a) {
this.YN(a[Tb])
};
w4[_P].QY=function (a) {
if(!this.yx) {
this.Gx=true;
a.preventDefault()
}
};
w4[_P].OY=function (a) {
if(this.Gx) {
a.stopPropagation();
this.Gx=false;
return false
}
};
w4[_P].e=function () {
w4.b.e.call(this);
this.zE.clear();
this.zE=null;
this.Lr=null
};
var x4=function () {
qW.call(this)
};
A(x4,qW);
var y4=null;
var z4="goog-color-menu-button",A4="-indicator";
x4[_P].createCaption=function (a,b) {
var c=b.f(L,{
"class":z4+A4
},a);
return x4.b.createCaption(c,b)
};
x4[_P].sa=function (a,b) {
if(a) {
var c=this.fa(a);
if(c&&c[gc]) {
	var d;
	try{
		d=Qv(b).cm
	}catch(e) {
		d=null
	}c[gc][u].borderBottomColor=d||(F?C:JT)
}
}
};
x4[_P].tf=function (a) {
this.sa(a.c(),a.p());
N(a.c(),z4);
x4.b.tf.call(this,a)
};
var B4=function (a,b,c) {
this.Hg=a||[];
d3.call(this,null,b||Q2(),c);
this.pD(this.Hg)
};
A(B4,d3);
B4[_P].oq=null;
B4[_P].pD=function (a) {
this.Hg=a;
this.oq=null;
this.ma(this.ny())
};
var C4="background-color";
B4[_P].dh=function () {
var a=this.pc();
if(a) {
var b=a[u][nx(C4)];
return D4(b)
}else return null
};
B4[_P].Fh=function (a) {
var b=D4(a);
if(!this.oq)this.oq=Ie(this.Hg,function (c) {
return D4(c)
});
this.en(b?Fe(this.oq,b):-1)
};
var E4="goog-palette-colorswatch";
B4[_P].ny=function () {
var a=this.i;
return Ie(this.Hg,function (b) {
return a.f(L,
{
	"class":E4,style:l3+b
})
})
};
var D4=function (a) {
if(a)try{
return Qv(a).cm
}catch(b) {
}return null
};
var F4=function (a,b,c,d) {
vW.call(this,a,b,c||y4||(y4=new x4),d)
};
A(F4,vW);
var G4={
M6:["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],b7:["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],T6:["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc","#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd","#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0","#cc0000","#e69138","#f1c232","#6aa84f","#45818e",
"#3d85c6","#674ea7","#a64d79","#990000","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47","#660000","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
},H4=function (a,b) {
var c=new yS(b);
if(a)Ge(a,c.u,c);
jf(G4,function (d) {
var e=new B4(d,null,b);
e.$q(8);
c.u(e)
});
return c
};
F4[_P].dh=function () {
return this.p()
};
F4[_P].Fh=function (a) {
this.sa(a)
};
F4[_P].sa=function (a) {
for(var b=0,c;c=this.eg(b);b++)if(typeofc.Fh==dd)c.Fh(a);F4.b.sa.call(this,a)
};F4[_P].$l=function (a) {
if(typeofa[v].dh==
dd)this.sa(a[v].dh());
else if(a[v].p()==Gx)this.sa(null);
F4.b.$l.call(this,a);
a.stopPropagation();
this.dispatchEvent(Tz)
};
F4[_P].ra=function (a) {
if(a&&this.bc()==0) {
this.dd(H4(null,this.i));
this.sa(this.p())
}F4.b.ra.call(this,a)
};
LR(z4,function () {
return new F4(null)
});
var I4=function (a,b,c,d) {
vW.call(this,a,b,c,d);
this.gO(a)
};
A(I4,vW);
I4[_P].L=null;
I4[_P].Cy=null;
I4[_P].t=function () {
I4.b.t.call(this);
this.LE()
};
I4[_P].Oa=function (a) {
I4.b.Oa.call(this,a);
var b=this.Ro();
if(b)this.gO(b);
else this.en(0)
};
I4[_P].e=function () {
I4.b.e.call(this);
if(this.L) {
this.L.j();
this.L=null
}this.Cy=null
};
I4[_P].$l=function (a) {
this.Eb(a[v]);
I4.b.$l.call(this,a);
a.stopPropagation();
this.dispatchEvent(Tz)
};
I4[_P].DA=function () {
var a=this.pc();
I4.b.sa.call(this,a&&a.p());
this.LE()
};
I4[_P].dd=function (a) {
var b=I4.b.dd.call(this,a);
if(a!=b) {
if(this.L)this.L.clear();
if(a)if(this.L)this.L.sx(a.Sb());
else this.vy(a.Sb())
}return b
};
I4[_P].gO=function (a) {
this.Cy=a;
this.LE()
};
I4[_P].u=function (a) {
I4.b.u.call(this,a);
if(this.L)this.L.u(a);
else this.vy(this.Aa().Sb())
};
I4[_P].Fg=function (a,b) {
I4.b.Fg.call(this,a,b);
if(this.L)this.L.Fg(a,b);
else this.vy(this.Aa().Sb())
};
I4[_P].Vb=function (a) {
I4.b.Vb.call(this,a);
if(this.L)this.L.Vb(a)
};
I4[_P].Df=function (a) {
I4.b.Df.call(this,a);
if(this.L)this.L.Df(a)
};
I4[_P].Eb=function (a) {
if(this.L)this.L.Eb(a)
};
I4[_P].en=function (a) {
if(this.L)this.Eb(this.L.eg(a))
};
I4[_P].sa=function (a) {
if(jd(a)&&this.L)for(var b=0,c;c=this.L.eg(b);b++)if(c&&typeofc.p==dd&&c.p()==a) {
this.Eb(c);
return
}this.Eb(null)
};
I4[_P].pc=function () {
return this.L&&this.L.pc()
};
I4[_P].Vl=function () {
return this.L&&this.L.Vl()
};
I4[_P].vy=function (a) {
this.L=new c3(a);
this.He().d(this.L,aA,this.DA)
};
I4[_P].LE=function () {
var a=this.pc();
this.ma(a?a.Ro():this.Cy)
};
I4[_P].ra=function (a) {
I4.b.ra.call(this,
a);
if(this.isOpen())this.Aa().Fc(this.Vl())
};
var J4=function () {
return new I4(null)
},K4="goog-select";
LR(K4,J4);
var L4=function () {
jW.call(this)
};
A(L4,jW);
var M4=null,N4=function () {
return M4||(M4=new L4)
},O4="goog-toolbar-button";
L4[_P].H=function () {
return O4
};
var P4=function () {
qW.call(this)
};
A(P4,qW);
var Q4=null,R4=function () {
return Q4||(Q4=new P4)
},S4="goog-toolbar-menu-button";
P4[_P].H=function () {
return S4
};
var T4=function () {
P4.call(this)
};
A(T4,P4);
var U4=null;
T4[_P].createCaption=function (a,b) {
return x4[_P].createCaption.call(this,a,b)
};
T4[_P].sa=function (a,b) {
x4[_P].sa.call(this,a,b)
};
var V4="goog-toolbar-color-menu-button";
T4[_P].tf=function (a) {
this.sa(a.c(),a.p());
N(a.c(),V4);
T4.b.tf.call(this,a)
};
var W4=function () {
return PR.call(this)
};
A(W4,PR);
var X4=null,Y4=function () {
return X4||(X4=new W4)
},Z4="goog-toolbar-separator";
W4[_P].f=function (a) {
return a.i.f(L,{
"class":this.H()+L3
},tW)
};
W4[_P].Q=function (a,b) {
b=W4.b.Q.call(this,a,b);
N(b,cB);
return b
};
W4[_P].H=function () {
return Z4
};
var $4=function () {
WR.call(this)
};
A($4,WR);
var a5=null;
var b5="toolbar";
$4[_P].Ge=function () {
return b5
};
$4[_P].Uo=function (a) {
return a[xc]==TR?new UR(Y4()):$4.b.Uo.call(this,a)
};
var c5="goog-toolbar";
$4[_P].H=function () {
return c5
};
$4[_P].FI=function () {
return $R
};
var d5=function (a,b,c) {
V.call(this,b,a||a5||(a5=new $4),c)
};
A(d5,V);
LR(O4,function () {
return new iW(null,N4())
});
var e5="goog-toolbar-toggle-button";
LR(e5,function () {
var a=new iW(null,N4());
a.Rd(16,true);
return a
});
LR(V4,function () {
return new F4(null,null,U4||(U4=new T4))
});
LR(S4,function () {
return new vW(null,null,R4())
});
var f5="goog-toolbar-select";
LR(f5,function () {
return new I4(null,null,R4())
});
LR(Z4,function () {
return new UR(Y4())
});
var g5=function (a,b,c) {
d5.call(this,a,b,c)
};
A(g5,d5);
g5[_P].eh=function () {
this.Fc(-1);
this.Dh(false)
};
var h5="-icon goog-inline-block",i5="-caption goog-inline-block";
g5[_P].wy=function (a,b,c) {
var d=this.i,e=d.f(L,{
"class":b+h5
});
n(e,v4);
if(c)e[u].backgroundImage=CS+c+Pd;
return [e,d.f(L,{
"class":b+i5
},d.f(L,undefined,a))]
};
var j5=function () {
xW.call(this)
};
A(j5,xW);
var k5=null,l5=function () {
return k5||(k5=new j5)
},m5="goog-toolbar-popup-button";
j5[_P].H=function () {
return m5
};
var n5=function () {
return new yW(null,
null,l5())
};
LR(m5,n5);
var o5=function (a,b,c) {
iW.call(this,a,b||kW||(kW=new jW),c);
this.Rd(16,true)
};
A(o5,iW);
var p5=function () {
return new o5(null)
},q5="goog-toggle-button";
LR(q5,p5);
var r5=function (a,b,c) {
NN.call(this,a,c);
var d=this.OG(c);
if(d)this.I(d);
this.hd=d
};
A(r5,NN);
r5[_P].OG=function (a) {
return new g5(undefined,undefined,a)
};
r5[_P].Je=function () {
return this.hd
};
r5[_P].ld=function (a,b,c,d,e,f) {
var g,h;
if(c) {
g=c[b];
h=d?this.hd.wy(g.S(),d):this.i.f(L,undefined,g.S())
}var j,k=this.i;
switch(a) {
case 1:j=new iW(h,N4(),k);
break;
case 2:j=new vW(h,e,R4(),k);
break;
case 3:j=new UR(Y4(),k);
break;
case 4:j=new yW(h,e,l5(),k);
break;
case 5:j=new o5(h,N4(),k);
break
}if(b) {
j.A(b);
if(g&&
g.Zc())j.wg(g.Zc())
}if(!f)this.hd.I(j,!this.getContext().n.lt);
return j
};
r5[_P].Ze=function (a,b,c,d,e) {
var f;
if(d)f=d[c];
switch(b) {
case 2:a.dd(e);
break;
case 4:a.EO(e);
break;
default:break
}if(c) {
a.A(c);
if(f&&f.Zc())a.wg(f.Zc())
}
};
r5[_P].e=function () {
r5.b.e.call(this);
this.hd=null
};
;
;
;
var s5=function (a,b) {
r5.call(this,a,b);
var c=new w3(a,null,false,b);
c.setActive(true);
c.Fd(false);
this.I(c);
c.Tc(new BW(2),true);
this.hq=c;
var d=new yS(b);
this.qm=d;
var e;
e=new AV(zV,a,b);
this.I(e);
this.le=e;
var f=new RS;
f.HD(3,0,0,0);
this.ui=f;
var g;
if(a.n.yj)g=new s3(an(),b);
this.xb=g;
this.Qu=new D;
this.ot=[];
this.no=[];
this.Ss=[];
this.AL=false;
this.lm=new w4
};
A(s5,r5);
s5[_P].Pu=null;
s5[_P].tB=null;
s5[_P].Ru=null;
s5[_P].gm=null;
s5[_P].Rp=null;
s5[_P].rB=null;
s5[_P].sB=null;
s5[_P].Nu=null;
s5[_P].Ou=
null;
s5[_P].YK=null;
s5[_P].XK=null;
s5[_P].NA=null;
s5[_P].Vc=false;
s5[_P].xf=null;
s5[_P].Kw=0;
s5[_P].Xa=true;
s5[_P].Xw=null;
s5[_P].MP=null;
var t5=T3,u5=U3,v5=e4,w5=R3,x5=V3,y5=W3,z5="goog-toolbar-item-listlayout",A5="goog-toolbar-item-gridlayout";
s5[_P].f=function () {
s5.b.f.call(this);
this.DS();
this.i.appendChild(this.h,this.Je().c());
this.IG()
};
s5[_P].IG=function () {
var a=this.i,b=this.h,c=this.hq;
if(c) {
c.f();
a.appendChild(b,c.c())
}var d=this.le;
if(d) {
d.ub();
var e=this.ui;
this.getContext().na.W3(xd(this.T0,
this));
e.fw(d.c())
}
};
s5[_P].DS=function () {
var a=this.getContext(),b=a.n,c=a.na,d=c.uh,e=this.no,f=this.ot,g=[],h,j;
h=this.Pu=this.ld(2,lq,d,t5,this.hq.Aa());
e.push(h);
f.push(h);
g.push(h);
h=this.tB=this.ld(1,AM,d,u5);
e.push(h);
f.push(h);
g.push(h);
h=this.ld(3);
e.push(h);
f.push(h);
g.push(h);
j=d[BM];
if(j) {
h=this.Ru=this.ld(1,BM,d,v5);
e.push(h);
f.push(h)
}h=this.gm=this.ld(4,CM,d,w5,this.ui);
e.push(h);
f.push(h);
h=this.Rp=this.ld(1,kM,d,x5,undefined,!b.jh);
if(b.jh) {
e.push(h);
f.push(h)
}h=this.rB=this.ld(1,
FM,d,y5);
e.push(h);
f.push(h);
h=this.ld(1,EM,d,undefined,undefined,!b.Do);
if(b.Do) {
e.push(h);
f.push(h);
this.sB=h
}h=this.ld(1,GM,d,Y3,undefined,true);
g.push(h);
this.Nu=h;
h=this.ld(1,HM,d,Z3,undefined,true);
g.push(h);
h=this.Ou=this.ld(2,vM,d,undefined,this.qm);
e.push(h);
f.push(h);
h=this.ld(5,MM,d,z5,undefined,!b.Eo);
if(b.Eo) {
e.push(h);
f.push(h);
g.push(h);
this.r_=h;
this.lm.add(h);
h.Ch(2)
}h=this.ld(5,NM,d,A5,undefined,!b.Eo);
if(b.Eo) {
e.push(h);
f.push(h);
g.push(h);
this.r_=h;
this.lm.add(h);
h.Ch(1)
}this.gI(g)
};
s5[_P].gI=function (a) {
this.Qu.k(1,a);
this.Ss=this.no;
var b=this.getContext(),c=b.C;
if(c.Ka)this.Jf();
else {
this.Vc=true;
this.za().d(c,av,this.Jf)
}this.NA=this.Rp.ac();
var d=this.za();
d.d(b.Pa,QN,this.pf);
var e=b.O;
if(e)d.d(e,tr,this.qc)
};
s5[_P].Na=function (a) {
var b=c5,c=Yw(a,function (d) {
return d[ub]==1&&O(d,b)
});
if(!c)return false;
this.MP=c;
return true
};
var B5="goog-toolbar-item-separator",C5="goog-toolbar-item-rename",D5="goog-toolbar-item-moreactions";
s5[_P].Oa=function (a) {
s5.b.Oa.call(this,a);
var b=
this.Je();
b.Q(this.MP);
var c=this.getContext(),d=c.na,e=d.uh,f=this.no,g=this.ot,h=[];
b.Zd(function (k) {
var m=k.c();
if(O(m,t5)) {
	this.Pu=k;
	this.Ze(k,2,lq,e,this.hq.Aa());
	f.push(k);
	g.push(k);
	h.push(k)
}else if(O(m,u5)) {
	this.tB=k;
	this.Ze(k,1,AM,e);
	f.push(k);
	g.push(k);
	h.push(k)
}else if(O(m,B5)) {
	this.Ze(k,3);
	f.push(k);
	g.push(k);
	h.push(k)
}else if(O(m,v5)) {
	var p=e[BM];
	if(p) {
		this.Ru=k;
		this.Ze(k,1,BM,e);
		f.push(k);
		g.push(k)
	}
}else if(O(m,w5)) {
	this.gm=k;
	this.Ze(k,4,CM,e,this.ui);
	f.push(k);
	g.push(k)
}else if(O(m,
x5)) {
	this.Rp=k;
	this.Ze(k,1,kM,e);
	f.push(k);
	g.push(k)
}else if(O(m,y5)) {
	this.rB=k;
	this.Ze(k,1,FM,e);
	f.push(k);
	g.push(k)
}else if(O(m,C5)) {
	this.sB=k;
	this.Ze(k,1,EM,e);
	f.push(k);
	g.push(k)
}else if(O(m,D5)) {
	this.Ou=k;
	this.Ze(k,2,vM,e,this.qm);
	f.push(k);
	g.push(k)
}else if(O(m,z5)) {
	this.YK=k;
	this.Ze(k,5,EM,e);
	this.lm.add(k);
	f.push(k);
	g.push(k)
}else if(O(m,A5)) {
	this.XK=k;
	this.Ze(k,5,EM,e);
	this.lm.add(k);
	f.push(k);
	g.push(k)
}
},this);
var j=this.Nu=this.ld(1,GM,e,Y3,undefined,true);
h.push(j);
j=this.ld(1,HM,e,Z3,
undefined,true);
h.push(j);
this.gI(h);
this.IG()
};
s5[_P].t=function () {
s5.b.t.call(this);
var a=this.ba(),b=this.Je();
a.d(b,Tz,this.RY);
a.d(this.hq.Aa(),Tz,this.xp);
var c=this.le;
a.d(this.gm,[mq,eA],this.wA);
a.d(c,eA,this.vA);
a.d(this.Ou,mq,this.SX);
a.d(this.qm,Tz,this.sA);
var d=this.xb;
if(d) {
a.d(d,t3,this.rp);
a.d(d,q3,this.sp);
a.d(d,r3,this.up)
}
};
s5[_P].Jf=function () {
var a=$p(),b=this.le.jd;
b.Tc(new Co(2,{
mimeTypes:[a.Ia()],orphans:0,sort:1,desc:false
}),true);
if(this.Vc) {
this.Vc=false;
at(function () {
	this.za().M(this.getContext().C,
	av,this.Jf)
},5,this)
}
};
s5[_P].qc=function (a) {
var b=this.Xa=a[bc]!=dN;
this.Pu.Z(b);
this.tB.Z(b);
this.Nu.Z(b);
var c=this.Ru;
if(c)c.Z(b)
};
s5[_P].Xq=function (a,b) {
if(this.gm.isOpen()!=a)this.gm.ra(a);
this.Vq(a,b)
};
s5[_P].Vq=function (a,b) {
var c=this.le;
if(c.La()!=a||b)c.s(a,b)
};
s5[_P].T0=function (a) {
this.Xq(true,a)
};
s5[_P].wA=function (a) {
this.Vq(a[x]==mq)
};
s5[_P].vA=function () {
this.Xq(false)
};
s5[_P].xp=function (a) {
var b=this.xf,c=b&&b.ua()?b.ua().J():null;
this.getContext().na.xA(a[v].Y,c)
};
s5[_P].zZ=function () {
var a=
this.qm;
this.Kw=a.bc();
this.AL=true
};
s5[_P].cy=function () {
var a=this.qm;
if(!this.AL)this.zZ();
var b=this.Kw;
while(a.bc()!=b)a.Df(a.bc()-1);
var c=this.getContext().na,d=c.cu(),e=d[o],f=this.i;
for(var g=0;g<e;g++) {
var h=d[g],j,k=h.Xg();
if(k&&k.Qb()==2&&k.Vo()==13) {
	j=new K3(h.S(),undefined,undefined,undefined,f);
	j.dd(this.xb);
	this.xb.Fh(c.BI())
}else j=new W(h.S(),undefined,undefined,h.Xg(),f);
var m=k&&k.Iu(),p=this.Xa?true:m;
j.Z(h.Ua&&p);
a.u(j)
}
};
s5[_P].SX=function () {
this.cy()
};
s5[_P].sA=function (a) {
var b=
a[v].Y;
this.getContext().na.rA(b)
};
s5[_P].RY=function (a) {
var b=a[v].Y,c=this.getContext().na;
switch(b) {
case AM:c.dK();
break;
case BM:c.FA();
break;
case h4:break;
case DM:c.TJ(this.xf&&this.xf.ua()?this.xf.ua():null);
break;
case kM:c.ku(true);
break;
case g4:c.ku(false);
break;
case FM:c.JJ();
break;
case GM:c.OJ();
break;
case HM:c.cK();
break;
case EM:c.UJ();
break;
case CM:var d=this.getContext();
if(d.ea.Mj()[o]==0)d.na.Dd();
else this.Xq(!this.ui.Zj());
break;
case MM:c.eK(AJ);
break;
case NM:c.eK(T2);
break;
default:break
}
};
s5[_P].pf=function (a) {
this.xf=a.Bg;
var b=this.xf.ua(),c=this.Ss,d=this.Qu.o(b?b.sd():2),e;
e=b&&b.J()?this.ot:(d?d:this.no);
if(c!=e) {
var f=this.Je();
bh(c,function (j) {
	f.removeChild(j,true)
});
bh(e,function (j) {
	f.I(j,true)
})
}this.Ss=e;
if(this.getContext().n.jh) {
var g=this.Rp;
if(g) {
	var h=z(N3);
	if(b&&b.Ke==0) {
		if(!this.Xw)this.Xw=this.Je().wy(h,f4);
		g.ma(this.Xw);
		g.A(g4)
	}else {
		g.ma(this.NA);
		g.A(kM)
	}
}
}
};
s5[_P].rp=function (a) {
this.nf(a,cn(this.xb.dh()))
};
s5[_P].sp=function (a) {
this.nf(a,Zm())
};
s5[_P].up=function (a) {
this.nf(a,
$m())
};
s5[_P].nf=function (a,b) {
this.getContext().na.mA(b)
};
s5[_P].e=function () {
s5.b.e.call(this);
this.Qu.clear();
this.Qu=null;
this.no=null;
this.ot=null;
this.Ss=null;
this.hq=null;
this.qm=null;
this.le=null;
this.Ou=null;
this.Pu=null;
this.gm=null;
this.rB=null;
this.Nu=null;
this.Rp=null;
this.sB=null;
this.Ru=null;
this.YK=null;
this.XK=null;
this.NA=null;
this.Xw=null;
this.xb=null;
this.lm.j();
this.lm=null
};
var E5=function (a,b,c,d) {
T.call(this,a,b,c,d);
var e=this.CS(d);
this.I(e);
this.hd=e;
this.Ma=new D
};
A(E5,T);
E5[_P].Je=function () {
return this.hd
};
E5[_P].CS=function (a) {
return new g5(undefined,undefined,a)
};
E5[_P].f=function () {
E5.b.f.call(this);
this.hd.f()
};
E5[_P].fc=function () {
E5.b.fc.call(this);
var a=this.hd;
while(a.pd()>0)a.Aq(0,true);
this.Ma.clear();
var b=this.bg();
this.appendData(b)
};
E5[_P].og=function (a) {
var b=this.Ma,c=b.o(a);
if(b.remove(a))this.hd.removeChild(c,true)
};
Ma(E5[_P],function (a) {
var b=
this.wb,c=a[o],d=this.hd,e=this.Ma;
for(var f=0;f<c;f++) {
var g=a[f],h=this.Gd(g);
d.I(h,true);
e.k(g.l(),h);
b.add(g)
}
});
E5[_P].ng=function (a) {
var b=this.Ma.o(a.l());
if(b)this.tb(b,a);
else {
b=this.Gd(a);
this.hd.I(b,true);
this.Ma.k(a.l(),b)
}
};
E5[_P].Gd=function (a) {
var b=new vW;
this.tb(b,a);
return b
};
E5[_P].tb=function () {
};
E5[_P].e=function () {
E5.b.e.call(this);
if(this.hd) {
this.hd.j();
this.hd=null
}this.Ma.clear();
this.Ma=null
};
var F5=function (a,b,c,d) {
E5.call(this,a,b,c,d);
this.Lk(5);
var e=a.O;
if(e)this.za().d(e,tr,this.qc);
this.mC=[]
},G5;
A(F5,E5);
var H5="goog-toolbar-item";
F5[_P].a6=H5;
var I5="New {$newItem}...",J5="View all...";
F5[_P].tb=function (a,b) {
var c=this.za();
a.ma(this.hd.wy(b.q(),this.a6,b.Ie()));
a.HO(R4());
var d=new Co(2,{
start:0,num:5,mimeTypeSets:[b.l()],viewed:0,sort:6,desc:true
}),e=new u3(this.da,d,false,false);
e.Lk(5);
this.B=e.Aa();
c.d(e.Aa(),Tz,this.dY);
var f=b.kf(),g=false;
for(var h=0;h<f[o];h++) {
var j=
Mp(f[h]);
if(j&&(j.ig()||Vp(j,lq))) {
	var k=z(I5,{
		newItem:j.q()
	}),m=new W(k,j.Ie(),G5);
	m.A(j.Ia());
	m.Z(this.$a());
	this.mC.push(m);
	c.d(m,Tz,this.xp);
	e.Eg(m);
	g=true
}
}if(g) {
m=new xS;
e.Eg(m)
}var p=z(J5);
m=new W(p);
m.Z(true);
m.A(b.l());
c.d(m,Tz,this.XY);
e.Eg(m,true);
e.f();
e.setActive(true);
this.I(e);
a.dd(e.Aa())
};
F5[_P].xp=function (a) {
var b=a[v];
b.J().s(false);
this.getContext().na.xA(b.Y);
a.stopPropagation()
};
F5[_P].XY=function (a) {
var b=a[v];
b.J().s(false);
var c=new Co(2,{
mimeTypeSets:[b.Y],sort:3
});
this.getContext().Pa.Dc(new BJ(c));
a.stopPropagation()
};
F5[_P].dY=function (a) {
var b=a[v],c=Np(b.Y);
if(c)this.getContext().V.nC(c)
};
F5[_P].qc=function (a) {
var b=a[bc]!=dN;
bh(this.mC,function (c) {
c.Z(b)
})
};
F5[_P].e=function () {
F5.b.e.call(this);
this.mC=null
};
var K5=function (a,b) {
r5.call(this,a,b);
var c=new BW(32),d=new F5(a,c,false,b);
d.Fd(false);
d.LD(true);
d.setActive(true);
this.I(d);
this.OP=d
};
A(K5,r5);
var L5="goog-toolbar-explorer";
K5[_P].Z5=L5;
K5[_P].OG=function () {
return null
};
K5[_P].Je=function () {
return this.OP.Je()
};
K5[_P].f=function () {
K5.b.f.call(this);
var a=this.i,b=this.h;
this.OP.f();
a.appendChild(b,this.Je().c());
N(this.Je().c(),this.Z5)
};
K5[_P].e=function () {
K5.b.e.call(this);
this.hd=null
};
var M5=function (a) {
MN.call(this,a)
};
A(M5,MN);
M5[_P].gE=0;
M5[_P].Wy=0;
M5[_P].GE=0;
var N5="pager";
M5[_P].ja=N5;
var O5="pager-table";
M5[_P].xP=O5;
var P5="pager-description";
M5[_P].Xs=P5;
var Q5="pager-action";
M5[_P].fl=Q5;
M5[_P].Du=null;
M5[_P].Ys=null;
M5[_P].In=null;
M5[_P].mv=null;
var R5="Select:",S5="None";
M5[_P].f=function () {
var a=this.i,b=z(R5),c=z(S5);
this.h=a.f(L,{
"class":this.ja
},this.Du=a.f(Dz,{
"class":this.xP,cellSpacing:0,cellPadding:0
},a.f(Ez,{
},a.f(uz,{
},a.f(vz,{
},b,E,this.In=a.f(KC,{
"class":this.fl
},
this.wI()),this.mv=a.f(KC,{
"class":this.fl
},c)),a.f(vz,{
align:this.fb()?Vb:Rc
},this.Ys=a.f(KC,{
"class":this.Xs
},this.GI()))))))
};
M5[_P].Na=function (a) {
if(!O(a,this.ja))return false;
var b=this.i,c=b.ka(a);
if(!(c&&O(c,this.xP)))return false;
this.Du=c;
var d=b.ka(c);
if(!d)return false;
var e=b.ka(d);
if(!e)return false;
var f=b.ka(e);
if(!f)return false;
var g=b.ka(f);
if(!(g&&O(g,this.fl)))return false;
this.In=g;
var h=b.qb(g);
if(!(h&&O(h,this.fl)))return false;
this.mv=h;
var j=b.qb(f);
if(!j)return false;
var k=
b.ka(j);
if(!(k&&O(k,this.Xs)))return false;
this.Ys=k;
return true
};
M5[_P].t=function () {
M5.b.t.call(this);
var a=this.ba();
a.d(this.In,fi,this.AW);
a.d(this.mv,fi,this.aY);
this.Br()
};
M5[_P].Br=function () {
if(this.z) {
Ya(this.Du[u],this.GE<=0?Gx:C);
n(this.Ys,eg(this.GI()));
n(this.In,eg(this.wI()))
}
};
M5[_P].ha=function (a,b,c) {
this.gE=a;
this.Wy=b;
this.GE=c;
this.Br()
};
var T5="Showing items {$start}-{$end} of {$total}";
M5[_P].GI=function () {
var a=z(T5,{
start:this.gE,end:this.Wy,total:this.GE
});
return a
};
var U5=
"All {$num}";
M5[_P].wI=function () {
var a=z(U5,{
num:this.Wy-this.gE+1
});
return a+Yj
};
var V5="select_all";
M5[_P].AW=function () {
this.dispatchEvent(V5)
};
var W5="select_none";
M5[_P].aY=function () {
this.dispatchEvent(W5)
};
M5[_P].e=function () {
M5.b.e.call(this);
this.Du=null;
this.Ys=null;
this.In=null;
this.mv=null
};
var X5="propertychange",Y5="TEXTAREA",Z5=function (a) {
J.call(this);
this.h=a;
var b=F?X5:(sg&&a[xc]==Y5?Ki:gL);
this.A_=zi(this.h,b,this)
};
A(Z5,J);
Z5[_P].ce=function (a) {
var b=a.Wc;
if(b[x]==X5&&b.propertyName==Eb||b[x]==gL||b[x]==Ki) {
if(F) {
	var c=b.srcElement;
	if(c!=ow(c)[hb])return
}var d=new $h(b);
Ra(d,gL);
try{
	this.dispatchEvent(d)
}finally{
	d.j()
}
}
};
Z5[_P].e=function () {
Z5.b.e.call(this);
Ei(this.A_);
this.h=null
};
var $5=function (a,b) {
P.call(this,b);
this.jm=a||C
};
A($5,P);
$5[_P].$f=null;
$5[_P].f=function () {
this.h=this.i.f(gL,{
type:pb
})
};
var a6="label";
$5[_P].Oa=function (a) {
this.h=a;
if(!this.jm)this.jm=a.getAttribute(a6)||C
};
$5[_P].t=function () {
$5.b.t.call(this);
this.Ln();
this.ns();
this.h.t_=this
};
$5[_P].$=function () {
$5.b.$.call(this);
this.sj();
this.h.t_=null
};
$5[_P].Ln=function () {
var a=new $i(this);
a.d(this.h,Ti,this.pA);
a.d(this.h,Si,this.kA);
if(qg)a.d(this.h,[di,Qi,Ri],this.rX);
var b=ga;
a.d(b,WL,this.$Y);
this.m=a;
this.CF()
};
$5[_P].CF=function () {
if(!this.cU&&this.m&&this.h.form) {
this.m.d(this.h.form,uv,this.tX);
this.cU=true
}
};
$5[_P].sj=function () {
if(this.m) {
this.m.j();
this.m=null
}
};
$5[_P].e=function () {
$5.b.e.call(this);
this.sj();
this.h=null
};
var b6="label-input-label";
$5[_P].lx=b6;
$5[_P].pA=function () {
cz(this.h,this.lx);
if(!this.Tj()&&!this.$A)Aa(this.h,C)
};
$5[_P].kA=function () {
this.$f=null;
this.ns()
};
$5[_P].rX=function (a) {
if(a[fc]==27) {
if(a[x]==Qi)this.$f=this.h[s];
else if(a[x]==di)Aa(this.h,this.$f);
else if(a[x]==Ri)this.$f=null;
a.preventDefault()
}
};
$5[_P].tX=function () {
if(!this.Tj()) {
Aa(this.h,C);
at(this.zW,10,this)
}
};
$5[_P].zW=function () {
if(!this.Tj())Aa(this.h,this.jm)
};
$5[_P].$Y=function () {
this.ns()
};
$5[_P].Tj=function () {
return this.h[s]!=C&&this.h[s]!=this.jm
};
Ua($5[_P],function () {
Aa(this.h,C);
if(this.$f!=null)this.$f=C
});
$5[_P].sa=function (a) {
if(this.$f!=null)this.$f=a;
Aa(this.h,a);
this.ns()
};
$5[_P].p=function () {
if(this.$f!=null)return this.$f;
return this.Tj()?this.h[s]:C
};
$5[_P].ns=function () {
this.CF();
if(!this.Tj()) {
if(!this.$A)N(this.h,this.lx);
at(this.u2,10,this)
}else cz(this.h,this.lx)
};
$5[_P].kI=function () {
var a=this.Tj();
this.$A=true;
this.h.focus();
if(!a)Aa(this.h,this.jm);
this.h.select();
at(this.YT,10,this)
};
$5[_P].YT=function () {
this.$A=false
};
$5[_P].u2=function () {
if(this.h&&!this.Tj())Aa(this.h,this.jm)
};
var c6=function (a,b) {
$5.call(this,a,b);
this.Pf=new $i(this)
};
A(c6,$5);
var d6="label-editable";
c6[_P].ja=d6;
var aaa="label-editable-focus";
c6[_P].gz=aaa;
var baa="label-editable-hover";
c6[_P].wu=baa;
c6[_P].fC=null;
c6[_P].gt=false;
c6[_P].GL=25;
c6[_P].Y_=2;
c6[_P].HF=true;
c6[_P].lh=null;
c6[_P].d3=function (a) {
this.HF=a
};
c6[_P].nD=function (a) {
this.ja=a
};
c6[_P].wD=function (a) {
this.gz=a
};
c6[_P].zD=function (a) {
this.wu=a
};
c6[_P].f=function () {
c6.b.f.call(this);
this.VO()
};
c6[_P].Oa=function (a) {
c6.b.Oa.call(this,
a);
this.VO()
};
var caa="size";
c6[_P].VO=function () {
var a=this.h;
a.setAttribute(WY,dN);
a.setAttribute(caa,this.GL);
N(a,this.ja)
};
c6[_P].t=function () {
c6.b.t.call(this);
this.jR()
};
c6[_P].$=function () {
c6.b.$.call(this);
this.iT()
};
c6[_P].sa=function (a) {
c6.b.sa.call(this,a);
this.wF()
};
c6[_P].pX=function () {
this.lO(true)
};
c6[_P].oX=function () {
this.lO(false)
};
c6[_P].lO=function (a) {
if(this.gt!=a) {
this.gt=a;
var b=this.c();
if(a) {
	this.fC=this.p();
	N(b,this.gz);
	cz(b,this.wu);
	b.select()
}else {
	cz(b,this.gz);
	if(this.p()!=
	this.fC)this.dispatchEvent(Uz)
}this.dispatchEvent(a?Ti:Si)
}
};
c6[_P].FX=function (a) {
var b=this.c();
if(a[fc]==13)b.blur();
else if(a[fc]==27) {
this.sa(this.fC);
b.blur()
}
};
c6[_P].nu=function () {
if(!this.gt&&this.z)N(this.c(),this.wu)
};
c6[_P].TX=function () {
if(!this.gt&&this.z)cz(this.c(),this.wu)
};
c6[_P].LY=function () {
this.wF()
};
c6[_P].wF=function () {
if(this.HF) {
var a=this.c();
a.size=l.max(this.GL,a[s][o]+this.Y_)
}
};
c6[_P].jR=function () {
var a=this.c(),b=this.Pf;
b.d(a,Ti,this.pX);
b.d(a,Si,this.oX);
b.d(a,di,
this.FX);
b.d(a,bi,this.nu);
b.d(a,ci,this.TX);
this.lh=new Z5(a);
b.d(this.lh,gL,this.LY)
};
c6[_P].iT=function () {
this.Pf.vc();
this.lh.j();
this.lh=null
};
c6[_P].e=function () {
c6.b.e.call(this);
if(this.lh) {
this.lh.j();
this.lh=null
}this.Pf.j();
this.Pf=null
};
var e6=cB;
var f6="Add description",daa='"  cellSpacing="0"   cellPadding="0"><tbody><tr><td><span class="',eaa="path-container",faa='  path-item-icon"></span>',gaa="path-spacing",haa="path-root  path-item",g6="path-action",h6='"></span><span class="',iaa='  path-item-icon"></span><span class="',jaa="path-adddescription",i6='"  ',j6=' style="display:none;" ',k6='  id="',l6="Choose color",kaa="path-spacer",laa="path-addcolor",maa='</td></tr><tr><td><div class="',m6="path-desc-label",naa='"  style="overflow:auto;"  ',
oaa='"></div></td></tr></tbody></table>',paa=function (a,b) {
var c=z(f6),d=b||new Q;
d.g(eF,Bo,daa,e6,CB,eaa,$B,a.uM,K,!a.ok?KB+e6+faa:C,KB,e6,CB,gaa,K,!a.ok?v4:C,pR,e6,E,!a.ok?haa:g6,$B,a.wN,h6,e6,$B,a.qP,DI,a.ok?KB+e6+iaa+e6+$B+a.$G+DI:C,pR,e6,CB,jaa,i6,!a.ok?j6:C,k6,a.oF,fO,c,gO);
if(a.AT) {
var e=z(l6);
d.g(KB,e6,CB,kaa,h6,e6,CB,laa,i6,!a.ok?j6:C,k6,a.lF,fO,e,gO)
}d.g(maa,e6,CB,m6,naa,!a.ok?j6:C,k6,a.oH,oaa);
if(!b)return nB(d.toString ())
};
var qaa="path-name-label",raa="path-name-label-focus",saa="path-name-label-hover",taa="path-desc-label-focus",uaa="path-desc-label-hover",n6=function (a,b,c,d) {
NN.call(this,a,d);
this.pk=b;
this.Sa=c||new Hp;
var e=this.Lj(),f=e?e.q():undefined,g=new c6(f,d);
g.nD(qaa);
g.wD(raa);
g.zD(saa);
this.I(g);
this.vi=g;
g=new c6(vaa,d);
g.nD(m6);
g.wD(taa);
g.zD(uaa);
this.I(g);
this.Ng=g;
var h;
if(a.n.yj) {
h=new s3(an(),d);
this.I(h)
}this.xb=h;
this.ba().d(a.C,$u,this.Rj);
this.sC=xd(this.hY,this);
this.tM={
}
};
A(n6,NN);
var vaa=
z(f6),o6=z(l6);
n6[_P].mx=6;
n6[_P].oa=null;
n6[_P].dx=false;
n6[_P].MC=false;
n6[_P].tC=null;
n6[_P].mE=null;
n6[_P].Mv=null;
n6[_P].ho=null;
n6[_P].ro=null;
n6[_P].Hn=null;
n6[_P].Gn=null;
n6[_P].Lj=function () {
return this.pk?Np(this.pk):null
};
n6[_P].f=function () {
var a=this.tM;
this.oe(a);
this.h=paa(a);
this.Ng.f();
this.vi.f();
if(this.xb) {
this.xb.f();
this.i.appendChild(this.i.W[Ub],this.xb.c())
}
};
var waa="rootAction",xaa="subPath",yaa="addDescriptionLabel",zaa="descriptionLabel",Aaa="addColorLabel",Baa="currentFolder";
n6[_P].oe=function (a) {
a.uM=this.G(Bo);
a.wN=this.G(waa);
a.qP=this.G(xaa);
a.oF=this.G(yaa);
a.oH=this.G(zaa);
a.lF=this.G(Aaa);
a.AT=this.getContext().n.yj;
a.$G=this.G(Baa);
a.ok=this.pk
};
var Caa="path-arrow goog-inline-block",Daa="&nbsp";
n6[_P].jy=function () {
var a=this.i.f(KC,{
"class":Caa
},E);
n(a,Daa);
return a
};
var p6="All folders";
n6[_P].SV=function () {
switch(this.Sa.P) {
case dq:var a=z(jK);
return a;
case Nn:var b=z(iK);
return b;
case eq:var c=z(p6);
return c;
default:return C
}
};
n6[_P].BV=function (a) {
if(a) {
var b=
{
};
b.R=a;
return u4().Xo(b)
}return v4
};
n6[_P].t=function () {
n6.b.t.call(this);
var a=this.i,b=this.tM;
this.tC=a.c(b.uM);
this.Mv=a.c(b.wN);
this.mE=a.c(b.qP);
this.Hn=a.c(b.oF);
this.ro=a.c(b.oH);
this.ho=a.c(b.$G);
this.Gn=a.c(b.lF);
a.appendChild(this.ro,this.Ng.c());
var c=this.pk;
if(c) {
a.appendChild(this.tC,this.ho);
a.appendChild(this.ho,this.vi.c())
}if(this.pk) {
var d=this.ba();
d.d(this.Mv,fi,this.tY);
d.d(this.Hn,fi,this.xW);
d.d(this.vi,Uz,this.WX);
d.d(this.Ng,Uz,this.gX);
d.d(this.Ng,Si,this.fX);
if(this.Gn) {
	var e=
	this.xb;
	e.jj(this.Gn,this.fb()?4:3);
	d.d(e,t3,this.rp);
	d.d(e,q3,this.sp);
	d.d(e,r3,this.up)
}
}this.Nn()
};
n6[_P].Xc=function () {
return this.Sa
};
n6[_P].If=function (a) {
this.Sa.k2(a);
this.Nn()
};
$a(n6[_P],function (a) {
n6.b[Mc].call(this,a);
if(this.gb&&this.MC)this.Nn()
});
n6[_P].hF=function (a) {
if(this.pk&&this.z) {
var b=this.vi.c();
if(a)if(qg)at(b.focus,0,b);
else b.focus();
else b.blur()
}
};
var Eaa="Loading path...",Faa="... ";
n6[_P].Nn=function () {
if(!this.gb) {
this.MC=true;
return
}this.MC=false;
var a=this.pk,b=
this.Sa,c;
if(a)if(!b.nh()) {
var d=gq(b.Qa()?a:b.Fz());
b.tF(d);
if(d.nh()) {
	b.Kq(true);
	b.Eh(d.P);
	this.dx=false
}else if(!this.dx) {
	var e=b.Qa()?a:b.Fz(),f=this.oa=new Co(2,{
		parent:e,path:true,hidden:2,containers:2
	});
	this.dx=true;
	this.getContext().C.Lf(f);
	var g=z(Eaa);
	c=g
}else {
	this.dx=false;
	c=Faa
}
}this.N1(c)
};
var Gaa="path-message",Haa="path-item",Iaa="path-action-nolink";
n6[_P].N1=function (a) {
var b=this.i,c=this.Sa,d=c.ud,e=this.mE,f=this.ho,g=this.za(),h=gl();
h.cN(this.sC);
g.vc();
b.Hi(e);
if(!c.nh()) {
if(a) {
	b.appendChild(e,
	b.f(L,{
		"class":Gaa
	},a));
	b.appendChild(e,this.jy())
}
}else {
var j=this.Mv;
n(j,kg(oR,this.SV(),uB))
}var k=this.Lj();
if(k) {
h.Or(this.sC,k.pa());
this.vi.sa(k.q());
N(f,Haa)
}if(k||d[o]>0)b.appendChild(e,this.jy());
if(f)M(f,k?true:false);
var m,p;
for(var q=0;q<d[o];q++) {
var t=Np(d[q]),w=t&&u4().kn(t)?Iaa:g6;
b.appendChild(e,m=b.f(KC,{
	"class":w+L3
},p=b.f(L,{
	id:this.G(d[q])
})));
n(p,this.BV(t));
b.appendChild(e,this.jy());
g.d(p,fi,this.gY);
if(t)h.Or(this.sC,t.pa())
}this.RM();
this.M1()
};
n6[_P].RM=function () {
var a=
this.Lj(),b=a?a.Dt():C;
this.Ng.sa(b);
var c=Hf(b);
M(this.ro,a&&!c);
M(this.Hn,a&&c)
};
n6[_P].M1=function () {
if(this.xb) {
var a=this.Lj(),b=a?a.sz():null;
this.xb.Fh(b);
var c=this.Gn;
if(a&&u4().kn(a)) {
	var d={
	};
	d.color=a.sz();
	Wa(d,o6);
	n(c,r4(d))
}else n(c,o6);
M(c,!(!a))
}
};
n6[_P].Rj=function (a) {
var b=a.kb.T(),c=this.oa;
if(c&&b==c.T())switch(a[x]) {
case $u:this.Nn();
break;
default:break
}
};
n6[_P].q2=function () {
var a;
switch(this.Sa.P) {
case dq:a=HJ;
break;
case Nn:a=GJ;
break;
case eq:default:a=IJ;
break
}var b=xJ(a);
this.getContext().Pa.Dc(b)
};
n6[_P].tY=function () {
this.q2()
};
n6[_P].xW=function () {
Ya(this.Hn[u],Gx);
Ya(this.ro[u],C);
this.Ng.kI()
};
n6[_P].WX=function (a) {
a.stopPropagation();
this.getContext().na.BA(this.vi.p(),this.Lj())
};
n6[_P].gX=function (a) {
a.stopPropagation();
this.getContext().na.IW(this.Ng.p(),this.Lj())
};
n6[_P].fX=function () {
this.RM()
};
n6[_P].rp=function (a) {
this.nf(a,cn(this.xb.dh()))
};
n6[_P].sp=function (a) {
this.nf(a,Zm())
};
n6[_P].up=function (a) {
this.nf(a,$m())
};
n6[_P].nf=function (a,b) {
this.getContext().na.mA(b,
this.Lj())
};
n6[_P].m2=function (a) {
var b=aK(a),c=b.wa||{
};
c.path=Ip(this.Sa,a);
b.an(c);
this.getContext().Pa.Dc(b)
};
n6[_P].gY=function (a) {
var b=this.df(a[v]);
if(!b)return ;
var c=this.Ft(b.id);
if(c)this.m2(c)
};
n6[_P].hY=function () {
this.Sa.clear();
this.Nn()
};
n6[_P].e=function () {
n6.b.e.call(this);
this.Ng.j();
this.Ng=null;
this.vi.j();
this.vi=null;
if(this.xb) {
this.xb.j();
this.xb=null
}this.Sa=null;
this.tC=null;
this.mE=null;
this.Mv=null;
this.ro=null;
this.Hn=null;
this.Gn=null;
this.ho=null
};
;
var s6=function () {
this.nd=[];
this.qC=new D;
this.zg=0;
this.TP=0;
this.SP=0;
this.RP=0;
this.on=new D;
this.QP=0;
this.lG=0;
this.k0=1;
this.Yy=new Yh(0,4000);
this.Yy.Jg=function () {
return new q6
};
this.mP=new Yh(0,50);
this.mP.Jg=function () {
return new r6
};
var a=this;
this.YA=new Yh(0,2000);
this.YA.Jg=function () {
return fa(a.k0++)
};
this.YA.Qg=function () {
};
this.fT=3
},Jaa="goog.debug.Trace";
s6[_P].w=Lk(Jaa);
var r6=function () {
this.pl=0;
this.qr=0;
this.VE=0
},Kaa=" ms)",Laa=" [VarAlloc = ";
ra(r6[_P],function () {
var a=
[];
a.push(this[x],E,this.pl,Ct,l.round(this.qr*10)/10,Kaa);
if(this.VE)a.push(Laa,this.VE,Id);
return a.join(C)
});
var q6=function () {
},Maa="    ",Naa=" Start        ",Oaa=" Done ",Paa=" ms ",Qaa=" Comment      ",Raa="[VarAlloc ";
q6[_P].W5=function (a,b,c) {
var d=[];
if(b==-1)d.push(Maa);
else d.push(t6(this.cI-b));
d.push(E,u6(this.cI-a));
if(this.Go==0)d.push(Naa);
else if(this.Go==1) {
d.push(Oaa);
var e=this.f8-this.Wi;
d.push(t6(e),Paa)
}else d.push(Qaa);
d.push(c,this);
if(this.b6>0)d.push(Raa,this.b6,oZ);
return d.join(C)
};
ra(q6[_P],function () {
return this[x]==null?this.bS:de+this[x]+oZ+this.bS
});
Va(s6[_P],function (a) {
this.fT=a;
for(var b=0;b<this.nd[o];b++) {
var c=this.Yy.id;
if(c)this.YA.Ld(c);
this.Yy.Ld(this.nd[b])
}sa(this.nd,0);
this.qC.clear();
this.zg=v6();
this.TP=0;
this.SP=0;
this.RP=0;
this.QP=0;
this.lG=0;
var d=this.on.Nc();
for(var b=0;b<d[o];b++) {
var e=d[b],f=this.on.o(e);
f.pl=0;
f.qr=0;
f.VE=0;
this.mP.Ld(f)
}this.on.clear()
});
var Saa="|  ",Taa=" Unstopped timers:\n",Uaa=" ms, started at ",Vaa=" TOTAL ",Waa="Total tracers created ",
Xaa="Total comments created ",Yaa="Overhead start: ",w6=" ms\n",Zaa="Overhead end: ",$aa="Overhead comment: ";
ra(s6[_P],function () {
var a=[],b=-1,c=[];
for(var d=0;d<this.nd[o];d++) {
var e=this.nd[d];
if(e.Go==1)c.pop();
a.push(E,e.W5(this.zg,b,c.join(C)));
b=e.cI;
a.push(If);
if(e.Go==0)c.push(Saa)
}if(this.qC.D()!=0) {
var f=v6();
a.push(Taa);
hf(this.qC,function (j) {
	a.push(CB,j,Ct,f-j.Wi,Uaa,u6(j.Wi),ck)
})
}var g=this.on.Nc();
for(var d=0;d<g[o];d++) {
var h=this.on.o(g[d]);
if(h.pl>1)a.push(Vaa,h,If)
}a.push(Waa,
this.QP,If,Xaa,this.lG,If,Yaa,this.TP,w6,Zaa,this.SP,w6,$aa,this.RP,w6);
return a.join(C)
});
var aba="   ",t6=function (a) {
a=l.round(a);
var b=C;
if(a<1000)b=E;
if(a<100)b=CB;
if(a<10)b=aba;
return b+a
},u6=function (a) {
a=l.round(a);
var b=a/1000%60,c=a%1000;
return fa(100+b).substring(1,3)+Vc+fa(1000+c).substring(1,4)
},v6=function () {
return Ad()
};
var Z=function (a,b,c,d,e,f,g) {
YT.call(this,a,b,d,g);
this.r=c;
this.Mg=e||0;
this.qM=f;
this.qk=new D;
this.ko={
};
this.ba().d(this,Uz,this.iX);
this.bi=new Ej;
this.tm=new D
};
A(Z,YT);
Z[_P].Gb=null;
Z[_P].ct=null;
Z[_P].eL=null;
Z[_P].mx=10;
Z[_P].Rb=function () {
return null
};
Z[_P].Pt=function () {
return null
};
Z[_P].HI=function () {
return false
};
Z[_P].gJ=function () {
return true
};
Z[_P].oV=function () {
var a=z(vV);
return a
};
Z[_P].Sz=function () {
var a=new BJ(this.ia),b=a.yV();
return eg(b)
};
Z[_P].XI=function () {
return null
};
Z[_P].ZI=function (a,b,c) {
var d=c?a.qb(b):a.eJ(b);
while(d&&d!=b) {
if(d[u][Gc]!=Gx)return d;
d=c?a.qb(d):a.eJ(d)
}return d==b?null:d
};
Z[_P].t=function () {
var a=this.ba();
if(!this.mt) {
this.oO();
this.bt(this.oV())
}var b=this.Rb();
a.d(b,Ni,this.jC);
a.d(b,fi,this.hC);
a.d(b,Oi,this.J0);
a.d(b,Pi,this.I0);
if(this.HI()) {
var c=this.getContext().di,d=c.fo(this.ia),e=new Kz(b,this);
d.u(e);
d.t3(this.r.Bz());
a.d(d,mz,this.vp);
a.d(d,kz,this.gh);
a.d(d,lz,this.fh);
a.d(d,tz,this.Sj);
c.Pr(d,UJ);
c.Of(d,UJ);
this.Gb=d
}Z.b.t.call(this)
};
Z[_P].EM=function () {
};
Z[_P].fc=function () {
Z.b.fc.call(this);
this.Lo(undefined,true);
bh(this.wc,function (b) {
Mw(b.c())
});
this.EM();
this.oO();
this.r3(new Uk);
this.ko={
};
var a=this.bg();
a=a.slice(0,this.Kg);
this.appendData(a);
this.qL();
bh(this.wc,function (b,c) {
var d=this.qk.o(c)||null,e=d?Np(d):null,f=e?this.li(e):null;
if(b&&d&&e&&f) {
	var g=this.ly(b.c());
	if(!this.oB(c))Ya(g[u],Gx);
	this.i.NZ(g,f)
}else {
	this.wc.remove(c);
	b.j();
	this.$m.isOpen(c,false);
	this.qk.remove(c)
}
},this);
this.tw();
this.iI()
};
Z[_P].iI=
function () {
};
Z[_P].XD=function () {
return false
};
Z[_P].iX=function () {
this.wH()
};
Z[_P].wH=function () {
var a=this.ct;
if(a)bt(a);
this.ct=at(this.Rt,0,this)
};
Z[_P].oO=function () {
var a={
};
this.wC(a);
n(this.Rb(),this.r.qy(a))
};
Z[_P].tj=function () {
this.bt(this.Sz())
};
Z[_P].bt=function (a) {
var b=this.Pt();
if(b) {
var c={
};
this.xC(c,a);
n(b,this.r.ql(c))
}
};
$a(Z[_P],function (a,b) {
Z.b[Mc].call(this,a,b);
if(a) {
if(b&&b[XH])if(!this.Ka)this.tj()
}else this.Lo(undefined,true);
var c=this.Ne;
bh(this.wc,function (d,e) {
if(c.contains(e))d.setActive(a)
},
this)
});
Z[_P].Wr=function () {
};
Ma(Z[_P],function (a) {
var b=this.wb,c=a[o],d=this.ko,e={
};
this.Bu(e);
var f=vO(),g=wO(f),h=xO(f),j=this.XD(),k=new Vq;
for(var m=0;m<c;m++) {
var p=a[m],q=Rp(p),t=Pp(p);
if(p&&q&&t) {
	if(j) {
		var w=this.ia.Kf==6,$=x6(f,g,h,p,d,w);
		if($) {
			this.AM(e,$);
			this.r.py(e,k)
		}
	}this.uq(e,p,q,t,true);
	this.r.createDocument(e,k);
	b.add(p)
}
}this.Wr(k.toString ())
});
Z[_P].ng=function (a,b) {
if(!a)return ;
var c=Rp(a),d=Pp(a),e=this.li(a);
if(e&&a&&c&&d) {
var f={
};
Ya(e[u],C);
if(this.XD()) {
	var g=vO(),h=wO(g),
	j=xO(g),k=new Vq,m=this.ia.Kf==6,p=x6(g,h,j,a,this.ko,m);
	if(p) {
		var q={
		};
		this.AM(q,p);
		this.r.py(q,k);
		var t=this.LG(k.toString ());
		this.i.Kp(t,e)
	}
}if(!b)this.Lo(a.l(),true);
this.uq(f,a,c,d);
var w=this.wb;
if(!w.o(a.Bc()))w.add(a);
var $=this.r.Ps(f);
this.oD(e,a,c,f);
this.BD(e,$)
}
};
Z[_P].LG=function () {
return null
};
Z[_P].oD=function () {
};
Z[_P].BD=function (a,b) {
n(a,b)
};
Z[_P].og=function (a) {
var b=this.li(a);
if(b) {
this.Lo(a);
Ya(b[u],Gx);
var c=this.r.dA();
if(!Hf(c))N(b,c);
var d=this.i,e=Np(a);
if(e&&Yp(e)&&this.qk.Xh(a)) {
	var f=
	aK(a).ua().T();
	d.removeNode(Pw(b));
	var g=this.wc,h=g.o(f);
	g.remove(f);
	this.qk.remove(f);
	this.$m(f,false);
	h.j()
}var j=this.ZI(d,b,false);
if(j&&!this.UK(j)) {
	var k=this.ZI(d,b,true);
	if(!k||!this.UK(k)) {
		var m=this.bu(j.id);
		this.ko[m]=false;
		d.removeNode(j)
	}
}
}
};
var y6="dd";
Z[_P].UK=function (a) {
var b=this.Oj(a.id);
return b&&b!=y6
};
Z[_P].Bu=function (a) {
a.Ra=this.fb();
a.$a=this.$a();
var b=this.getContext().O;
a.u0=b&&b.od;
a.qt=this.getContext().n.TH;
a.yN=this.Mg;
a.Jm=qg&&!Lg(uC)
};
var z6="dr",A6="dcc",B6="dc",
C6="ds",D6="dsg",E6="dst",F6="dn",G6="dni";
Z[_P].uq=function (a,b,c,d,e) {
if(!e)this.Bu(a);
a.R=b;
a.gv=c;
a.sf=Sp(b);
var f=b.l();
a.selected=this.getContext().ea.$c(f);
a.Ky=this.yf(z6,b);
a.JR=this.yf(A6,b);
a.cG=this.yf(B6,b);
a.fE=this.yf(C6,b);
a.O5=this.yf(D6,b);
a.LR=this.yf(E6,b);
a.aC=this.yf(F6,b);
a.e0=this.yf(G6,b);
var g=a.NR=c.ig();
if(g) {
var h=aK(f).ua().T();
a.MR=this.oB(h)
}var j=b.Xg(mq)||d.Vt(Up,b.jf(),mq),k=[b.ap()];
a.ad=j?j.II(k):null;
a.xm=j?j.zJ(k):null;
a.rename=this.bi.contains(f);
this.vq(a,
b);
a.Uf=b.Nl();
a.Te=b.Zl();
a.Gm=b.getAttribute(Vn).p();
var m=this.ia;
a.sort=m?m.Kf:null
};
Z[_P].vq=function (a,b) {
var c=b.Id(),d=a.x6,e=a.Fe=[];
for(var f=0;f<c[o];f++) {
var g=Np(c[f]);
if(g&&g.l()!=d&&!g.getAttribute(Wn).p()&&!g.getAttribute(Un).p())e.push(g)
}
};
Z[_P].wC=function (a) {
a.$a=this.$a();
var b=this.ia;
a.sort=b?b.Kf:null;
a.kr=b?b.so:false;
a.qt=this.getContext().n.TH
};
Z[_P].xC=function (a,b) {
Ca(a,b);
a.HK=this.uf;
a.Ws=this.Mg;
a.Ra=this.fb()
};
Z[_P].AM=function (a,b) {
a.vl=b;
a.x2=this.sc(y6,b);
a.Ra=
this.fb();
a.Ws=this.Mg
};
Z[_P].Fa=function (a) {
Z.b.Fa.call(this,a)
};
var x6=function (a,b,c,d,e,f) {
var g=new Date;
if(f)g.setTime(d.dp());
else g.setTime(d.Mt());
var h=null;
h=zO(a,g)?1:(zO(b,g)?2:(g>c?3:(yO(a,g)?4:(AO(a,g)?5:6))));
if(!e[h]) {
e[h]=true;
return h
}return null
};
Z[_P].vp=function () {
this.eL=new Date
};
Z[_P].gh=function (a) {
var b=this.df(a.Cl);
if(!b)return ;
var c=this.cg(b.id);
if(!c)return ;
if(Yp(c)) {
var d=this.li(c);
N(d,this.r.Et())
}
};
Z[_P].fh=function (a) {
var b=this.df(a.Cl);
if(!b)return ;
var c=this.cg(b.id);
if(!c)return ;
if(Yp(c)) {
var d=this.li(c);
cz(d,this.r.Et())
}
};
Z[_P].Sj=function (a) {
var b=this.cg(a.Cl.id);
if(!b)return ;
if(Yp(b)) {
var c=a.Bl.Ts;
if(c&&c[o]>0) {
	var d=Op(c),e=a.Qy.ua().J(),f=new sq(8,d,{
		addedFolders:[b.l()],removedFolders:e?[e]:undefined
	});
	if(f&&d[o]>0)this.getContext().V.execute(f)
}
}
};
Z[_P].$g=function (a) {
var b=this.df(a);
if(b) {
var c=this.Oj(b.id);
switch(c) {
	case z6:case F6:var d=this.cg(b.id);
	b=d?this.eu(d,z6):null;
	break;
	default:b=null;
	break
}
}return b
};
Z[_P].ah=function () {
var a=[];
if(this.z&&
this.gb) {
var b=this.wb,c=b.D();
for(var d=0;d<c;d++) {
	var e=b.yb(d);
	if(Yp(e)) {
		var f=this.li(e);
		if(f)a.push(f)
	}
}
}return a
};
Z[_P].EI=function (a) {
var b=this.df(a);
if(b) {
var c=this.Oj(b.id);
switch(c) {
	case z6:case F6:var d=this.cg(b.id),e=this.getContext().ea.Mj();
	return e[o]>1&&Oe(e,d.l())?e:[d.l()];
	default:break
}
}return null
};
Z[_P].Zg=function () {
return null
};
Z[_P].ee=function () {
return false
};
Z[_P].jC=function (a) {
if(a.fm(2)) {
a.preventDefault();
return
}var b=a[v],c=this.Oj(b.id);
if(this.ee(a,c))return ;
var d=
this.df(b);
if(!d) {
a.preventDefault();
return
}var e=d.id,f=this.cg(e);
if(!f) {
a.preventDefault();
return
}c=this.Oj(e);
if(c!=B6&&c!=G6)a.preventDefault();
switch(c) {
case C6:this.getContext().na.GA(!f.getAttribute(Tn).p(),f);
break;
case D6:this.getContext().na.KY(!f.getAttribute(Zn).p(),f);
break;
case B6:case A6:break;
case F6:break;
case G6:a.stopPropagation();
break;
default:break
}
};
Z[_P].IJ=function () {
return false
};
var H6="ml",I6="vl";
Z[_P].hC=function (a) {
var b=this.eL;
if(b&&new Date-b<500) {
a.stopPropagation();
a.preventDefault();
return
}if(a.fm(2)) {
a.preventDefault();
return
}var c=this.df(a[v]);
if(!c) {
a.preventDefault();
return
}var d=c.id,e=this.Oj(d);
this.getContext().O;
switch(e) {
case H6:return ;
default:break
}if(this.IJ(a,e,d))return ;
var f=this.cg(d,e==I6);
if(!f) {
a.preventDefault();
return
}switch(e) {
case F6:case z6:case I6:if(Yp(f)) {
	a.preventDefault();
	a.stopPropagation();
	this.getContext().V.nC(f,this.Xc())
}else {
	this.getContext().tk.PD(f.ap());
	if(!wg&&!a[xb]||wg&&!a.metaKey)a.stopPropagation()
}break;
case E6:var g=
this.li(f),h=this.wc,j=aK(f.l()).ua(),k=j.T();
if(this.oB(k)) {
	dz(c,this.r.Ez(),this.r.rz());
	this.$m(k,false);
	h.o(k).setActive(false);
	var m=Pw(g);
	if(m)Ya(m[u],Gx)
}else {
	dz(c,this.r.rz(),this.r.Ez());
	this.$m(k,true);
	if(h.Da(k)) {
		h.o(k).setActive(true);
		var m=Pw(g);
		if(m)Ya(m[u],C)
	}else {
		var p=this.XI(j),q=p.ag(),t={
		};
		if(!q.SK(this.getContext().n.EC)&&q.Dp(49)) {
			p.b4(true);
			p.Fd(false);
			t[ZH]=false
		}h.k(k,p);
		this.qk.k(k,f.l());
		p.uw(this.xn);
		p.f();
		var w=this.ly(p.c());
		Lw(w,g);
		p.t();
		p.setActive(true,t)
	}
}break;
case G6:a.stopPropagation();
break;
default:a.preventDefault();
break
}
};
var J6="checkbox";
Z[_P].J0=function (a) {
if(a.fm(2)) {
a.preventDefault();
return
}var b=this.df(a[v]);
if(!b) {
a.preventDefault();
return
}var c=b.id,d=this.cg(c);
if(!d) {
a.preventDefault();
return
}var e=this.Oj(c);
if(e!=B6&&e!=G6)a.preventDefault();
switch(e) {
case B6:case A6:var f=this.getContext().ea,g=d.l();
if(f.CB&&this.m_(a)) {
	var h=this.UU(g);
	f.dn(h,J6);
	f.FD(g)
}else {
	f.Y5(g,J6);
	f.FD(g)
}break;
case G6:a.stopPropagation();
break;
default:break
}
};
Z[_P].I0=function (a) {
a.preventDefault()
};
Z[_P].UU=function (a) {
var b=this.getContext().ea,c=!b.$c(a),d=this.wb,e=d.indexOf(b.CB),f=d.indexOf(a),g=e<=f?e:f,h=e>f?e:f,j={
};
for(var k=g;k<=h;k++) {
var m=d.yb(k);
j[m.l()]=c
}return j
};
Z[_P].m_=function (a) {
return a[wc]
};
Z[_P].hE=function (a) {
if(a&&a[o]==1) {
var b=a[0];
if(this.wb.o(b)) {
	var c=Np(b);
	if(c&&!this.bi.contains(b)) {
		this.bi.add(b);
		this.ng(c,true);
		var d=this.eu(c,G6),e=new c6(undefined,this.i);
		this.tm.k(c.l(),e);
		e.d3(false);
		e.nD(C);
		e.wD(C);
		e.zD(C);
		e.A(b);
		e.Q(d);
		e.kI();
		e.c();
		var f=this.ba();
		f.d(e,
		Si,this.XX);
		f.d(e,Uz,this.YX)
	}return true
}else {
	var g=this.wc;
	return ch(this.Ne,function (h) {
		var j=g.o(h);
		return j&&j.hE(a)
	})
}
}return false
};
Z[_P].XX=function (a) {
var b=this.df(a[v].c());
if(!b) {
a.preventDefault();
return
}var c=b.id,d=this.cg(c);
if(!d) {
a.preventDefault();
return
}this.Lo(d.l())
};
Z[_P].YX=function (a) {
var b=a[v],c=b.Y,d=Np(c);
if(d)this.getContext().na.BA(b.p(),d)
};
Z[_P].Lo=function (a,b) {
var c=a?new Ej([a]):this.bi;
bh(c,function (d) {
if(this.bi.contains(d)) {
	this.bi.remove(d);
	var e=this.tm.o(d);
	this.tm.remove(d);
	var f=this.ag().ta(d);
	if(e) {
		if(f&&b)this.getContext().na.BA(e.p(),f);
		var g=this.ba();
		g.M(e.c(),Si);
		g.M(e,Uz);
		e.j()
	}if(f)this.ng(f)
}
},this)
};
Z[_P].df=function (a,b,c) {
return Z.b.df.call(this,a,b||this.Rb(),c)
};
Z[_P].cg=function (a,b) {
var c=this.bu(a);
return c?this.$b.ta(c)||(b?Np(c):null):null
};
Z[_P].bu=function (a) {
var b=this.Ft(a),c=b.search(/\./);
if(c>=0&&b[o]>c+1)return b.substring(c+1);
return null
};
Z[_P].li=function (a) {
return this.eu(a,z6)
};
Z[_P].eu=function (a,b) {
return this.i.c(this.yf(b,
a))
};
Z[_P].Oj=function (a) {
var b=this.Ft(a),c=b.search(/\./);
return c>=0?b.substring(0,c):null
};
Z[_P].yf=function (a,b) {
return this.sc(a,nd(b)?b:b.l())
};
Z[_P].sc=function (a,b) {
return kg(this.l(),Vc,a,Vc,b)
};
Z[_P].cQ=function (a) {
var b=this.li(a),c=this.eu(a,B6);
if(b&&c) {
var d={
},e=Rp(a);
this.uq(d,a,e,Pp(a));
this.oD(b,a,e,d);
ya(c,d[Db])
}
};
Z[_P].ly=function () {
return null
};
Z[_P].Pl=function (a) {
var b=Z.b.Pl.call(this);
if(!a) {
var c=this.wc,d;
bh(this.Ne,function (e) {
	d=c.o(e);
	if(d)b.Ue(d.Pl())
})
}return b
};
Z[_P].Pj=
function () {
var a=new D;
this.PG(a);
return a
};
Z[_P].PG=function (a) {
var b=this.Pl(true),c=this.ia,d=c?c.J():null;
if(d) {
var e;
bh(b,function (g) {
	if(a.Da(g))e=a.o(g);
	else {
		e=new Ej;
		a.k(g,e)
	}e.add(d)
})
}var f=this.wc;
bh(this.Ne,function (g) {
var h=f.o(g);
if(h)h.PG(a)
})
};
Z[_P].e=function () {
Z.b.e.call(this);
bt(this.ct);
this.ct=null;
this.Gb=null;
this.qk.clear();
this.qk=null;
this.bi.clear();
this.bi=null;
bh(this.tm,function (a) {
a.j()
});
this.tm.clear();
this.tm=null;
this.ko=null
};
var K6=function () {
};
K6[_P].Bz=function () {
return C
};
K6[_P].Et=function () {
return C
};
K6[_P].rz=function () {
return C
};
K6[_P].Ez=function () {
return C
};
K6[_P].dA=function () {
return C
};
K6[_P].Gt=function () {
return C
};
K6[_P].Az=function () {
return C
};
K6[_P].Wz=function () {
return C
};
K6[_P].qy=function (a,b) {
return b?null:C
};
K6[_P].ql=function (a,b) {
return b?null:C
};
K6[_P].py=function (a,b) {
return b?null:C
};
Ja(K6[_P],function (a,b) {
return b?null:C
});
K6[_P].Ps=function (a,b) {
return b?null:C
};
K6[_P].Qs=function (a,b) {
return b?null:C
};
var L6="headerbarview-text-emphasis",M6="headerbarview-text-deemphasis",N6="headerbarview-link",O6="headerbarview-link-disabled",P6="headerbarview-horizontal-limit";
var bba="Items shared between you and",cba="headerbarview",dba='&nbsp;<span class="',eba=function (a,b) {
var c=z(bba),d=b||new Q;
d.g(sB,cba,K,c,dba,L6,K,oB(a.yT),XB);
if(!b)return d.toString ()
},fba="Search results for:",gba="headerbarview-search",hba="</span>&nbsp;&nbsp;",iba=function (a,b) {
var c=z(fba),d=b||new Q;
d.g(sB,gba,K,c,v4,a.Cb.has?KB+L6+K+oB(a.Cb.has)+hba:C);
Q6(a,d);
d.g(uB);
if(!b)return d.toString ()
},jba="Show search options",kba="headerbarview-saved-search",lba="headerbarview-saved-search-icon",
mba='</span>&nbsp;&nbsp;<span class="',nba="headerbarview-smaller",R6="&nbsp;&nbsp;",S6='</span></div><div class="',oba="headerbarview-right",pba='"><span id="',qba='</span>&nbsp;&nbsp;<span id="',rba="</span>&nbsp;&nbsp;</div></div>",sba=function (a,b) {
var c=z(jba),d=z(mM),e=b||new Q;
e.g(sB,kba,iC,P6,BB,lba,CB,cB,eO,L6,K,oB(a.C2),mba,nba,K);
if(a.Cb.has) {
var f=z(aX);
e.g(KB,M6,K,f,OB,oB(a.Cb.has),R6)
}Q6(a,e);
e.g(S6,oba,pba,a.gP,K,c,qba,a.mH,K,d,rba);
if(!b)return e.toString ()
},tba="Shared with:",uba=
"Created by:",vba="Folder search:",T6='">&nbsp;',Q6=function (a,b) {
var c=b||new Q;
if(a.Cb.named) {
var d=z(cX);
c.g(KB,M6,K,d,OB,oB(a.Cb.named),R6)
}if(a.Cb.type) {
var e=z(eX);
c.g(KB,M6,K,e,OB,oB(a.Cb.type),R6)
}if(a.Cb[SP]) {
var f=z(hX);
c.g(KB,M6,K,f,OB,oB(a.Cb[SP]),R6)
}if(a.Cb[TP]) {
var g=z(bX);
c.g(KB,M6,K,g,OB,oB(a.Cb[TP]),R6)
}if(a.Cb[UP]) {
var h=z(tba);
c.g(KB,M6,K,h,OB,oB(a.Cb[UP]),R6)
}if(a.Cb.owner) {
var j=z(uba);
c.g(KB,M6,K,j,OB,oB(a.Cb.owner),R6)
}if(a.Cb[VP]) {
var k=z(vba);
c.g(KB,M6,K,k,OB,oB(a.Cb[VP]),
R6)
}if(a.Cb[LP]) {
var m=z(kX);
c.g(KB,M6,K,m,v4,oB(a.Cb[MP]),TB);
if(a.iD)c.g(v4,oB(a.iD),v4);
else {
	var p=z(RP),q=z(eY);
	c.g(KB,M6,T6,p,OB,oB(a.Cb[NP]),KB,M6,T6,q,OB,oB(a.Cb[LP]),R6)
}
}if(!b)return c.toString ()
};
var U6=function (a,b,c) {
NN.call(this,a,c);
this.oa=b;
this.NN=BQ(b);
this.aa=new sJ(a.C,Cl);
var d=this.za();
d.d(this.aa,tJ,this.td);
d.d(a.C,$u,this.hu);
var e=true,f=a.O;
if(f) {
d.d(f,tr,this.qc);
e=f.$a()
}this.Xa=e
};
A(U6,NN);
U6[_P].bb=null;
U6[_P].Ba=null;
U6[_P].Vv=C;
U6[_P].Ac=false;
var V6="saved_search";
U6[_P].Bt=function () {
return this.bb
};
U6[_P].qd=function () {
return this.Ba?this.Ba.qd():null
};
U6[_P].Ga=function (a) {
if(a!=this.bb) {
this.bb=a;
this.ie()
}
};
U6[_P].Z3=function (a) {
if(!this.Ba||this.Ba.qd()!=a) {
this.Ba=
zJ(a);
if(this.Bt()==V6)this.ie()
}
};
U6[_P].t=function () {
U6.b.t.call(this);
if(this.Ac)this.ha()
};
U6[_P].ie=function () {
this.ha()
};
var wba="search-options-header-show-search-options",xba="search-options-header-delete";
U6[_P].o1=function (a) {
a.gP=this.G(wba);
a.mH=this.G(xba);
a.Cb=this.NN.zz();
a.C2=this.Ba?this.Ba.q():C;
a.iD=this.Vv
};
U6[_P].p1=function (a) {
a.Cb=this.NN.zz();
a.iD=this.Vv
};
U6[_P].m1=function (a) {
a.yT=this.oa.Va()
};
var W6="person";
U6[_P].ha=function () {
if(!this.z) {
this.Ac=true;
return
}if(!this.bb) {
this.ba().vc();
n(this.h,C);
return
}var a={
};
switch(this.bb) {
case WH:this.p1(a);
n(this.h,iba(a));
break;
case V6:this.o1(a);
n(this.h,sba(a));
var b=this.i,c=b.c(a.gP),d=b.c(a.mH);
if(this.Xa) {
	N(c,N6);
	N(d,N6);
	var e=this.ba();
	e.d(d,fi,this.dX);
	e.d(c,fi,this.yp,this)
}else {
	N(c,O6);
	N(d,O6)
}break;
case W6:this.m1(a);
n(this.h,eba(a));
break
}this.Ac=false
};
U6[_P].td=function (a) {
var b=a[Cc],c=this.Ba;
if(c&&b==c.qd()) {
var d=zJ(b);
if(!d) {
	this.Ba=null;
	if(this.bb==V6) {
		this.Ga(WH);
		this.ie()
	}
}else {
	this.Ba=d;
	if(this.bb==V6)this.ie()
}
}
};
var yba="date not recognized",zba="after: {$fromDate} before: {$toDate}";
U6[_P].hu=function (a) {
if(this.oa.T()==a.kb.T()&&a.Ec) {
var b=a.Ec.cF;
if(this.oa.Zh) {
	var c=b.filterStartDate,d=b.filterEndDate;
	if(!c||!d) {
		var e=z(yba);
		this.Vv=e
	}else {
		var f=z(zba,{
			fromDate:c,toDate:d
		});
		this.Vv=f
	}this.ie()
}
}
};
U6[_P].dX=function () {
if(!this.Ba)return ;
var a=cq(Cl,this.Ba.qd());
if(a)this.getContext().na.nH(a)
};
U6[_P].yp=function () {
if(!this.Ba)return ;
var a=UY();
if(a)a.ir(this.Ba)
};
U6[_P].qc=function (a) {
var b=a[bc]!=dN;
this.Xa=b;
if(this.Bt()==V6)this.ha()
};
U6[_P].sw=function (a) {
this.oa=a;
this.ie()
};
U6[_P].Fa=function (a,b) {
U6.b.Fa.call(this,a,b);
var c=this.i,d=c.hf(undefined,P6,this.c());
for(var e=0;e<d[o];e++)wa(d[e][u],a[r])
};U6[_P].e=function () {
U6.b.e.call(this)
};
var X6="doclistview-inner",Y6="doclistview-inner-ie",Z6="doclist-folder-triangle-collapsed",$6="doclist-folder-triangle-expanded",a7="doclist-dragdrop-drag",b7="gridview-doc-drag-target",c7=DB,d7="doclist-tombstone",e7=cB;
var f7=function (a,b,c,d,e,f,g,h) {
Z.call(this,a,b,c,d,e,f,h);
var j=new M5(h);
this.I(j);
this.nk=j;
var k=new n6(a,b.J(),g,h);
this.I(k);
this.Kd=k;
var m=new U6(a,b,h);
this.I(m);
this.bm=m
};
A(f7,Z);
f7[_P].Qo=null;
f7[_P].Uj=null;
f7[_P].pg=null;
f7[_P].Jp=null;
f7[_P].rq=true;
f7[_P].ZD=true;
f7[_P].wa=null;
var Aba="doclistview-inner-ie-child",Bba="doclistview-inner-child",g7="doclistview-ie",h7="doclistview";
f7[_P].f=function () {
var a=this.i,b=F?(this.uf?Aba:Y6):(this.uf?Bba:X6);
this.JG();
var c=this.h=a.f(L,{
"class":F?
g7:h7
},this.Jp=a.f(L,{
"class":b
},this.Kd.c(),this.Uj=a.f(L,{
style:oU
}),this.Qo=a.f(L,{
"class":this.r.Gt()
})));
this.HG();
var d=this.nk;
d.f();
a.appendChild(c,d.c());
if(this.uf)Ya(d.c()[u],Gx)
};
f7[_P].HG=function () {
var a=this.bm;
a.f();
this.i.appendChild(this.Uj,a.c())
};
f7[_P].JG=function () {
var a=this.Kd,b=this.ia,c;
if(b) {
var d=new BJ(b,{
});
c=d.rb(IJ);
var e=d.rb(HJ),f=d.rb(GJ),g=a.Xc();
if(c||e||f)g.Kq(true);
if(e)g.Eh(dq);
else if(f)g.Eh(Nn);
else if(c)g.Eh(eq)
}a.f();
if(this.uf||b&&!b.J()&&!c) {
Ya(a.c()[u],
Gx);
this.rq=false
}
};
f7[_P].Na=function (a) {
if(!O(a,F?g7:h7))return false;
var b=this.i,c=b.ka(a);
if(!(c&&O(c,F?Y6:X6)))return false;
this.Jp=c;
var d=b.ka(c);
if(!(d&&O(d,this.r.Gt())))return false;
this.Qo=d;
var e=b.qb(c);
if(!e)return false;
return true
};
f7[_P].Oa=function (a) {
f7.b.Oa.call(this,a);
var b=this.i;
this.JG();
var c=this.Qo;
b.Kp(this.Kd.c(),c);
b.Kp(this.Uj=b.f(L,{
style:oU
}),c);
this.HG();
var d=b.qb(this.Jp);
this.nk.Q(d)
};
f7[_P].t=function () {
var a=this.ba(),b=this.nk;
a.d(b,V5,this.eY);
a.d(b,W5,this.fY);
f7.b.t.call(this)
};
f7[_P].Rb=function () {
return this.Qo
};
f7[_P].r6=function () {
var a=this.wa,b=false;
if(a[YH]||a[$H]) {
this.ZD=false;
this.Kd.setActive(false);
Ya(this.Kd.c()[u],Gx)
}else if(this.rq) {
this.ZD=true;
this.Kd.setActive(true);
Ya(this.Kd.c()[u],C)
}var c=a&&(a[YH]||a[$H])||this.ia.Va(),d=this.bm;
if(c!=d.gb)b=true;
if(this.z)if(!c) {
if(d.gb) {
	Ya(this.Uj[u],Gx);
	d.setActive(false);
	this.Fa(this.dj);
	b=true
}
}else {
Ya(this.Uj[u],C);
d.setActive(true);
var e=null;
if(!this.getContext().n.Wd) {
	var f=this.ia,g=
	f.rd(),h=f.Va();
	if(!Hf(g))e=WH;
	else if(!Hf(h))e=W6
}else if(a[$H])e=V6;
else if(this.wa[YH])e=WH;
else if(!Hf(this.ia.Va()))e=W6;
if(e) {
	var j=d.Bt();
	if(e==V6) {
		var k=d.qd(),m=this.wa[$H];
		if(k!=m) {
			d.Z3(m);
			b=true
		}
	}if(e!=j) {
		d.Ga(e);
		b=true
	}
}this.Fa(this.dj)
}return b
};
f7[_P].Tc=function (a,b) {
f7.b.Tc.call(this,a,b);
this.bm.sw(a)
};
var Cba='Welcome to Google Docs! Click the "New" button to create a new online document or the "Upload" button to edit a file from your desktop. Your documents will show up here. {$tagBegin}Learn more{$tagEnd}',
Dba='<a id="',Eba='" target="_blank" href="';
f7[_P].Sz=function () {
var a=f7.b.Sz.call(this);
if(Hf(a)) {
var b=z(Cba,{
	tagBegin:Dba+this.sc(H6,ce)+Eba+this.getContext().n.x_+K,tagEnd:KE
});
a=b
}return a
};
$a(f7[_P],function (a,b) {
f7.b[Mc].call(this,a,b);
if(a) {
this.NE(b);
if(b&&b[XH])if(this.rq)this.Kd.hF(true)
}else if(this.rq)this.Kd.hF(false);
if(this.rq)this.Kd.setActive(a&&this.ZD)
});
f7[_P].NE=function (a) {
this.wa=a||this.wa;
return this.r6()
};
f7[_P].Zw=function () {
var a=this.$b;
a.pb().D();
this.nk.ha(this.kP+
1,this.kP+this.fp(),a.Nd)
};
f7[_P].oD=function (a,b,c,d) {
az(a,this.r.Az(d[Db]));
if(!d.$a&&!b.getAttribute(Yn).p()&&c.Ep())N(a,this.r.Wz());
if(F) {
var e=this.yf(C6,b),f=this.i.c(e);
if(f)va(f,f[nb]+C)
}
};
f7[_P].NC=function () {
};
f7[_P].Fa=function (a,b) {
f7.b.Fa.call(this,a);
if(a) {
if(!b) {
	var c=this.pg;
	if(c)bt(c);
	this.pg=at(xd(this.Fa,this,a,true),0);
	return
}var d=jd(a[y]);
a=a.Ca();
var e=this.h;
if(e&&d)Za(e[u],a[y]);
if(d)Za(a,l.max(a[y]-this.nk.c()[Lc],0));
var f=this.Jp;
if(f) {
	if(d)Za(f[u],a[y]);
	if(F)wa(f[u],
	a[r])
}if(F)wa(this.nk.c()[u],a[r]);
if(this.bm.gb) {
	if(d)Za(a,l.max(a[y]-this.Uj[Lc],0));
	this.bm.Fa(a)
}var g=this.Kd.c();
if(g[u][Gc]!=Gx&&d)Za(a,l.max(a[y]-g[Lc],0));
this.pg=null;
this.NC(a,d);
this.wH()
}if(a&&a[y]!=null)Za(a,null);
this.tw();
var h=this.Ne;
bh(this.wc,function (j,k) {
if(h.contains(k))j.Fa(a,b)
})
};
f7[_P].MD=function (a) {
f7.b.MD.call(this,a);
if(!a)this.Zw()
};
f7[_P].eY=function () {
var a={
},b=this.wb,c=b.D();
for(var d=0;d<c;d++) {
var e=b.yb(d);
a[e.l()]=true
}this.getContext().ea.dn(a,J6)
};
f7[_P].fY=
function () {
this.getContext().ea.OR()
};
f7[_P].Xc=function () {
var a=this.ia,b=a?a.J():null,c,d=this.qM;
if(d)c=d.Xc();
else {
c=new Hp;
var e=this.Kd.Xc();
c.tF(e);
c.Kq(e.nh());
c.Eh(e.P)
}if(b)c.AF(b);
return c
};
f7[_P].If=function (a) {
f7.b.If.call(this,a);
this.Kd.If(a)
};
f7[_P].e=function () {
f7.b.e.call(this);
this.nk=null;
this.Kd=null;
bt(this.pg);
this.pg=null;
this.Qo=null;
this.Jp=null;
this.Uj=null;
this.wa=null;
this.bm=null;
this.qM=null
};
var i7="gridview-doc-selected";
var Fba="gridview-message",Gba=function (a,b) {
var c=b||new Q;
c.g(sB,Fba,K,a[Nb],uB);
if(!b)return c.toString ()
},j7='<a href="',k7='" target="',Hba='<img src="',l7='" style="width: ',m7="px; height: ",Iba='px;" />',Jba='<span style="margin: 40px;" class="goog-inline-block"><span class="',Kba="); width: ",Lba='px;">&nbsp;</span></span>',Mba=function (a,b) {
var c=b||new Q;
c.g(a.ad?j7+a.ad+k7+a.xm+K:C,a.BP?Hba+a.BP+l7+a.vE+m7+a.AP+Iba:Jba+e7+CB+c7+EB+a.sf+Kba+a.vE+m7+a.AP+Lba,a.ad?KE:C);
if(!b)return c.toString ()
},
Nba='<input type="checkbox"',n7="  checked",o7='"/>',Oba=function (a,b) {
var c=b||new Q;
c.g(Nba,a[Db]?n7:C,k6,a.cG,o7);
if(!b)return c.toString ()
},Pba="gridview-star",p7="doclist-star-on",q7="doclist-star-off",Qba=function (a,b) {
var c=b||new Q;
c.g(KB,e7,E,Pba,E,a.R.getAttribute(Tn).p()?p7:q7,PF,a.fE,HB);
if(!b)return c.toString ()
},Rba="gridview-name",Sba=function (a,b) {
var c=b||new Q;
c.g(a.ad?j7+a.ad+k7+a.xm+K:C,KB,Rba,E,e7,PF,a.aC,K);
u4().Xo({
R:a.R
},c);
c.g(OB,a.ad?KE:C);
if(!b)return c.toString ()
},Tba=
"</div><div>",r7=function (a,b) {
var c=b||new Q;
c.g(oR);
Mba(a,c);
Qba(a,c);
c.g(Tba);
Oba(a,c);
Sba(a,c);
c.g(uB);
if(!b)return c.toString ()
},s7="gridview-doc",t7="  doclist-tr-off",Uba='px;" id ="',u7='="true"',v7='="',Vba='"style="width: 100px;">',Wba=function (a,b) {
var c=b||new Q;
c.g(sB,e7,CB,a[Db]?i7:s7,!a.$a&&!a.R.getAttribute(Yn).p()&&a.gv.Ep()?t7:C,l7,a.vE,Uba,a.Ky,Zd,$Q,u7,aR,v7,a.R.pa(),Vba);
r7(a,c);
c.g(uB);
if(!b)return c.toString ()
};
var y7=function (a,b,c,d) {
f7.call(this,a,b,w7||(w7=new x7),false,undefined,undefined,c,d)
};
A(y7,f7);
y7[_P].bt=function (a) {
var b=this.Rb();
this.i.Hi(b);
var c=new Vq,d={
};
this.xC(d,a);
this.r.ql(d,c);
n(b,c.toString ())
};
y7[_P].Wr=function (a) {
var b=this.i,c=b.createElement(L);
n(c,a);
b.appendChild(this.Rb(),c)
};
y7[_P].NC=function (a,b) {
var c=this.Rb();
if(c) {
var d=c[u];
if(b)Za(d,l.max(a[y],0));
if(F)wa(d,a[r])
}
};
y7[_P].lp=function () {
return this.Rb()
};
y7[_P].Zg=function () {
return null
};
y7[_P].uq=function (a,b,
c,d,e) {
y7.b.uq.call(this,a,b,c,d,e);
a.vE=144;
a.AP=144;
var f=b.fW(144,144);
if(f)a.BP=f.mf()
};
var x7=function () {
K6.call()
};
A(x7,K6);
var w7=null;
x7[_P].Bz=function () {
return a7
};
x7[_P].Et=function () {
return b7
};
x7[_P].dA=function () {
return F?d7:C
};
var Xba="gridview-grid";
x7[_P].Gt=function () {
return Xba
};
x7[_P].Az=function (a) {
return kg(e7,E,a?i7:s7)
};
var z7="doclist-tr-off";
x7[_P].Wz=function () {
return z7
};
x7[_P].ql=function (a,b) {
return Gba(a,b)
};
Ja(x7[_P],function (a,b) {
return Wba(a,b)
});
x7[_P].Ps=function (a,
b) {
return r7(a,b)
};
var A7="card-settings-max-results";
var B7="card-settings",Yba='"><table class="',Zba="card-settings-table",C7='"><tbody><tr>',$ba="card-settings-buttons",aca='"><button name="save">',bca='</button> <button name="cancel">',cca="</button></tbody></table></div>",eca=function (a,b) {
var c=z(hD),d=z(eD),e=b||new Q;
e.g(sB,B7,Yba,Zba,C7);
dca(a,e);
e.g(FG,$ba,aca,c,bca,d,cca);
if(!b)return nB(e.toString ())
},fca="Maximum list size",D7='<td class="',gca="card-settings-content",hca='"><label>',ica="</label> ",dca=function (a,b) {
var c=z(fca),d=b||
new Q;
d.g(D7,gca,hca,c,ica);
jca(a,d);
if(!b)return d.toString ()
},jca=function (a,b) {
var c=b||new Q;
c.g(aY,A7,K);
var d=a.P_,e=d[o];
for(var f=0;f<e;f++) {
var g=d[f];
c.g(GP,g,K,g,FP)
}c.g(HP);
if(!b)return c.toString ()
};
var G7=function (a) {
MN.call(this,a);
this.r=E7||(E7=new F7);
var b=new VC;
b.k(nD,kca,true);
b.k(cD,lca,false,true);
this.va=b
};
A(G7,MN);
var lca=z(eD),kca=z(hD);
G7[_P].Fb=null;
G7[_P].IS=B7;
G7[_P].Fb=null;
G7[_P].ev=null;
G7[_P].H=function () {
return this.IS
};
G7[_P].f=function () {
var a=this.r.wS(this.yS());
this.Hk(a);
this.Fb=this.r.Kl(this);
this.ev=this.r.pV(this)
};
G7[_P].yS=function () {
var a=[],b=0;
while(b<10) {
a[b]=b+1;
b++
}a[b++]=15;
a[b++]=20;
a[b]=25;
return a
};
G7[_P].La=function () {
return this.h[u][Gc]!=Gx
};
G7[_P].s=
function (a) {
M(this.h,a);
if(a&&this.va) {
var b=this.va.mo;
if(b) {
	var c=this.Fb.getElementsByTagName(Hb);
	for(var d=0,e;e=c[d];d++)if(e[Cc]==b) {
		e.focus();
		break
	}
}
}
};
G7[_P].qV=function () {
return da(this.ev[s],10)
};
G7[_P].N3=function (a) {
var b=this.ev;
for(var c=0;c<b.options[o];c++)if(a==b.options[c][s]) {
b.selectedIndex=c;
return
}b.selectedIndex=0
};
G7[_P].t=function () {
G7.b.t.call(this);
this.ba().d(this.Fb,fi,this.lA)
};
G7[_P].lA=function (a) {
if(a[v][xc]==ZC) {
var b=a[v][Cc],c=this.va.o(b);
this.dispatchEvent(new H7(b,
c))
}
};
G7[_P].e=function () {
G7.b.e.call(this);
this.Fb=null;
this.va=null;
this.ev=null
};
var H7=function (a,b) {
Ra(this,Hb);
this.jb=a;
this.caption=b
};
A(H7,H);
var F7=function () {
},E7=null;
F7[_P].wS=function (a,b) {
return eca({
P_:a
},b)
};
F7[_P].pV=function (a) {
var b=a.c();
return b?a.i.hf(aA,A7,b)[0]:null
};
F7[_P].Kl=function (a) {
var b=a.c();
return b?a.i.hf(el,a.H()+OC,b)[0]:null
};
var I7=function () {
bW.call(this)
};
A(I7,bW);
var J7=null;
var mca="goog-generic-button";
I7[_P].H=function () {
return mca
};
I7[_P].Na=function (a) {
return a[xc]==UC
};
I7[_P].Q=function (a,b) {
N(b,cB,this.H());
return I7.b.Q.call(this,a,b)
};
var K7="card-title",L7="card-settings-container",M7="card-link",N7="card-link-disabled",O7="card-view-all-link",P7="card-menu-control",Q7="card-collapse-expand-control",R7="card-expanded-icon",S7="card-collapsed-icon",T7="card-close-control",U7="card-icon",V7=cB;
var nca="View All",W7="card",X7="card-header",oca='"><table><tr><td class="',pca="card-title-container",qca='</div></td><td class="',rca="card-view-all-link-container",sca='</div></div></td><td class="',tca="card-controls-container",uca='</td></tr></table></div><div class="',vca='"></div><div class="',Y7="card-body",wca='"></div></div>',yca=function (a,b) {
var c=z(nca),d=b||new Q;
d.g(sB,W7,iC,X7,oca,pca,iC,K7,K,oB(a[jb]),qca,rca,iC,O7,E,V7,E,M7,fO,c,sca,tca,K);
xca(a,d);
d.g(uca,L7,vca,Y7,wca);
if(!b)return nB(d.toString ())
},
zca="card-controls",Aca="card-menu-control-icon",Z7='"></div></div><div class="',$7=' "><div class="',Bca="card-close-control-icon",Cca='"></div></div></div>',xca=function (a,b) {
var c=b||new Q;
c.g(sB,zca,iC,P7,E,V7,iC,Aca,E,U7,Z7,Q7,E,V7,$7,R7,E,U7,Z7,T7,E,V7,$7,Bca,E,U7,Cca);
if(!b)return c.toString ()
},Dca=function (a,b) {
var c=b||new Q;
c.g(C);
if(!b)return c.toString ()
},Eca='<table width="100%" border="0" id="',Fca="card-data-item",Gca="<tr>",Hca=function (a,b) {
var c=b||new Q;
c.g(Eca,a.Ky,nG,Fca,Zd,$Q,
u7,aR,v7,a.R.pa(),C7);
a8(a,c);
if(a.Il||a.R.cp()) {
c.g(Gca);
b8(a,c)
}c.g(fI);
if(!b)return c.toString ()
},c8='<td rowspan="2" class="',Ica="card-item-icon-td",Jca=')">&nbsp;</span><td id="',Kca="card-item-title-td",Lca='"><div><a class="',Mca="card-item-title",Nca='" href="',Oca="</a></div>",a8=function (a,b) {
var c=b||new Q;
Pca(a,c);
c.g(c8,Ica,BB,V7,CB,U7,EB,a.sf,Jca,a.aC,nG,Kca,Lca,Mca,k7,a.xm,Nca,a.ad||ih,K,pB(oB(a.R.q()),16),Oca);
Qca(a,c);
if(!b)return c.toString ()
},Rca="card-item-desc-td",Sca="card-item-desc",
Tca="Updated by  {$xxx}",b8=function (a,b) {
var c=b||new Q;
c.g(D7,Rca,iC,Sca,K);
if(a.Il)c.g(a.Il);
else d8(a,c);
if(a.R.cp()) {
var d=z(Tca,{
	xxx:oB(a.R.cp().S())
});
c.g(d)
}c.g(uB);
if(!b)return c.toString ()
},Uca="card-item-star-td",Vca="card-star",Wca="card-star-on",Xca="card-star-off",Pca=function (a,b) {
var c=b||new Q;
c.g(c8,Uca,PF,a.fE,BB,V7,CB,Vca,CB,a.R.getAttribute(Tn).p()?Wca:Xca,HB);
if(!b)return c.toString ()
},Yca="card-item-date",Zca="</td>",Qca=function (a,b) {
var c=b||new Q;
c.g(c8,Yca,K,a.ex?oB(a.R.SI()):
oB(a.R.Nz()),Zca);
if(!b)return c.toString ()
},$ca="In",e8='id="',ada="..",bda=".  ",d8=function (a,b) {
var c=b||new Q;
if(a.Fe[o]>0) {
var d=z($ca);
c.g(d);
var e=(new Q(KB,M7,Zd)).toString (),f=l.min(a.Fe[o],3);
for(var g=0;g<f;g+=1)c.g(e,a.mI?e8+a.mI[g]+Zd:C,Zf,oB(a.Fe[g].q()),TB,g<l.min(a.Fe[o],3)-1?Yj:C);c.g(a.Fe[o]>3?ada:C,bda)
}if(!b)return c.toString ()
},cda="card-message",dda=function (a,b) {
var c=b||new Q;
c.g(sB,cda,K,a[Nb],uB);
if(!b)return c.toString ()
};
var h8=function (a,b,c,d) {
Z.call(this,a,b,f8||(f8=new g8),undefined,undefined,undefined,d);
this.we=c;
this.Ri=new G7;
var e=J7||(J7=new I7);
this.bx=new iW(null,e,d);
this.I(this.bx);
this.ws=new iW(null,e,d);
this.I(this.ws);
this.Wn=new iW(null,e,d);
this.I(this.Wn);
this.pm=new vW(null,undefined,e,d);
this.pm.Z2(false);
this.pm.u(new sS(eda));
this.I(this.pm);
this.Lk(4);
var f=true,g=a.O,h=this.za();
if(g) {
h.d(g,tr,this.qc);
f=g.$a();
this.Uy(f)
}this.Xa=f;
this.aa=new sJ(a.C,Cl);
this.za().d(this.aa,tJ,this.td)
};
A(h8,Z);
var fda="Edit Settings...",eda=z(fda);
h8[_P].kz=null;
h8[_P].Jc=null;
h8[_P].nl=false;
h8[_P].Rt=function () {
};
h8[_P].Uc=function (a) {
if(this.we!=a&&this.c())this.r.Uc(this,a);
this.we=a
};
h8[_P].pa=function () {
return this.Jc
};
h8[_P].Bc=function () {
return this.Jc!=null?aq(this.Jc).q():null
};
h8[_P].te=function (a) {
if(a!=this.Jc) {
if(this.c())this.r.te(this,a);
this.Jc=a;
this.XP()
}
};
h8[_P].Rb=function () {
if(!this.kz)this.kz=this.r.Rb(this);
return this.kz
};
h8[_P].Pt=function () {
return this.Rb()
};
h8[_P].EU=
function () {
return this.Wn.c()
};
h8[_P].Wr=function (a) {
if(!Hf(a)) {
var b=this.i.createElement(L);
n(b,a);
this.Rb().appendChild(b)
}
};
var gda="collapsecard",hda="expandcard";
h8[_P].Ch=function (a) {
if(this.nl!=a) {
this.aO(a);
this.dispatchEvent(a?gda:hda);
this.nl=a
}
};
h8[_P].aO=function (a) {
if(this.c()) {
this.r.f3(this,a);
this.r.k3(this,!a)
}
};
h8[_P].f=function () {
var a={
};
this.f1(a);
var b=this.r;
this.Hk(b.nS(a));
this.Ri.ub(b.ZV(this));
this.Ri.s(false);
this.bx.Q(b.BJ(this));
this.ws.Q(b.CU(this));
this.Wn.Q(b.DU(this));
this.pm.Q(b.rV(this));
if(!Hf(this.Jc))b.te(this,this.Jc);
this.aO(this.nl)
};
h8[_P].t=function () {
h8.b.t.call(this);
var a=this.ba();
a.d(this.Ri,Hb,this.CY);
a.d(this.bx,Tz,this.YY);
a.d(this.ws,Tz,this.PW);
a.d(this.Wn,Tz,this.RW);
a.d(this.pm,Tz,this.OX);
this.Uy(this.Xa);
this.XP()
};
h8[_P].CY=function (a) {
if(nD==a.jb) {
var b=this.Ri.qV();
this.Lk(b);
this.Dv(true);
var c=this.qz();
c.Lk(b);
this.xk(c)
}this.Ri.s(false)
};
h8[_P].XP=function () {
var a=this.qz();
if(!a)return ;
var b=false,c=a.zf;
if(this.zf!=c) {
this.Lk(c);
b=true
}var d=a.isCollapsed();
if(this.nl!=d) {
this.Ch(d);
b=true
}if(b&&this.c())this.Dv(true)
};
h8[_P].td=function () {
};
h8[_P].YY=function () {
if(this.Xa)this.da.Pa.Dc(this.lW())
};
h8[_P].lW=function () {
var a=this.Ut();
if(a)return a.Jb();
var b=this.ia;
if(b)return new BJ(b);
return new BJ(jq)
};
h8[_P].Ut=function () {
if(this.Jc) {
var a=aq(this.Jc);
if(a) {
	var b=yJ(a.q(),a.p());
	if(!b.Sn)b.mD(this.yG());
	return b
}
}return null
};
h8[_P].qz=function () {
var a=this.Ut();
if(!a)return null;
var b=a.Sn;
if(!b) {
b=this.yG();
a.mD(b)
}return b
};
h8[_P].Fu=function () {
var a=this.Ut();
return a?a.Fu():true
};
h8[_P].yG=function () {
return new vJ(this.zf,this.nl)
};
h8[_P].PW=function () {
if(this.Xa)this.close()
};
h8[_P].RW=function () {
var a=!this.nl;
this.Ch(a);
var b=this.qz();
b.Ch(a);
this.xk(b)
};
h8[_P].OX=function () {
if(this.Xa) {
this.Ri.N3(this.zf);
this.Ri.s(true)
}
};
h8[_P].xk=function (a) {
var b=this.Ut();
b.mD(a);
var c={
};
c[b.qd()]=b.cd();
this.aa.re(c)
};
h8[_P].qc=function (a) {
var b=this.Xa=a[bc]!=dN;
this.Uy(b)
};
h8[_P].Uy=function (a) {
var b=this.r.BJ(this);
if(b)if(a) {
N(b,M7);
cz(b,N7)
}else {
N(b,N7);
cz(b,M7)
}
};
var i8="removecard";
h8[_P].close=function () {
this.dispatchEvent(i8)
};
h8[_P].vq=function (a,b) {
h8.b.vq.call(this,a,b);
var c={
},d=c.Fe=a.Fe,e=c.mI=[];
for(var f=0;f<d[o];f++)e.push(this.yf(I6,d[f]));a.Il=this.r.Qs(c)
};h8[_P].f1=function (a) {
ta(a,this.we);
a.Ra=this.fb()
};
var j8="<table><tr>",k8="</tr></table>";
h8[_P].uO=function (a,b) {
if(F) {
var c=this.i,d=c.createElement(L);
n(d,j8+b+k8);
var e=c.ka(d),f=e[sc][0];
for(var g=0;g<f[dc][o];g++) {
	va(a[dc][g],f[dc][g][nb]);
	a[dc][g].id=f[dc][g].id;
	n(a[dc][g],f[dc][g][yb])
}
}else n(a,b)
};
h8[_P].BD=function (a,b) {
var c=a[Bb][0],d=c[sc][0],e=b[0];
this.uO(d,e);
if(c[sc][o]>1) {
var f=c[sc][1],g=b[1];
this.uO(f,g)
}
};
h8[_P].$g=function (a) {
return this.r.$g(this,a)
};
h8[_P].ah=function () {
return [this.c()]
};
h8[_P].Zg=function () {
var a=yz(this.c());
Fx(a,Hx(this.c()));
return a
};
h8[_P].e=function () {
h8.b.e.call(this);
this.Ri=null;
this.bx=null;
this.ws=null;
this.Wn=null;
this.pm=null
};
var g8=function () {
K6.call(this)
};
g8.inherits(K6);
var f8=
null;
g8[_P].qy=function (a,b) {
return Dca(a,b)
};
Ja(g8[_P],function (a,b) {
return Hca(a,b)
});
g8[_P].Ps=function (a) {
return [a8(a),b8(a)]
};
g8[_P].Qs=function (a,b) {
return d8(a,b)
};
g8[_P].nS=function (a) {
return yca(a)
};
g8[_P].Rb=function (a) {
return this.Bj(a,Y7)
};
g8[_P].ZV=function (a) {
return this.Bj(a,L7)
};
g8[_P].$g=function (a,b) {
return O(b,X7)||O(b,K7)?a.c():null
};
g8[_P].BJ=function (a) {
return this.Bj(a,O7)
};
g8[_P].CU=function (a) {
return this.Bj(a,T7)
};
g8[_P].DU=function (a) {
return this.Bj(a,Q7)
};
g8[_P].rV=function (a) {
return this.Bj(a,
P7)
};
g8[_P].lf=function (a) {
return this.Bj(a,K7,KC)
};
g8[_P].Bj=function (a,b,c) {
var d=a.c();
return d?a.i.hf(c||L,b,d)[0]:null
};
g8[_P].Uc=function (a,b) {
var c=this.lf(a);
if(c)n(c,eg(b))
};
g8[_P].f3=function (a,b) {
var c=this.FU(a);
if(b)dz(c,R7,S7);
else dz(c,S7,R7)
};
g8[_P].FU=function (a) {
return Ow(a.EU())
};
g8[_P].k3=function (a,b) {
Ya(a.Rb()[u],b?GL:Gx)
};
g8[_P].te=function (a,b,c) {
var d=c||a.c();
if(d) {
d.setAttribute($Q,(!Gf(b)).toString ());
d.setAttribute(aR,b)
}
};
g8[_P].ql=function (a,b) {
return dda(a,b)
};
var l8=function (a,b,c) {
NN.call(this,a,c);
this.ll=b||false
};
A(l8,NN);
l8[_P].Wp=null;
l8[_P].lv=null;
var ida="compositeview-no-items-hidden";
l8[_P].ML=ida;
var jda="compositeview-no-items-shown";
l8[_P].l0=jda;
$a(l8[_P],function (a,b) {
l8.b[Mc].call(this,a,b);
this.Zd(function (c) {
c.setActive(a,b)
})
});
l8[_P].Co=function (a) {
this.Zd(function (b) {
b.Co(a)
})
};
l8[_P].Fd=function (a) {
this.Zd(function (b) {
b.Fd(a)
})
};
l8[_P].Pt=function () {
return this.lv
};
l8[_P].hO=function (a) {
az(this.lv,a?this.l0:this.ML)
};
l8[_P].f=function () {
l8.b.f.call(this);
var a=this.i,b=this.fa();
this.Zd(function (d) {
if(!d.c())d.f();
a.appendChild(b,this.QG(d,true))
},this);
var c=a.f(L,{
"class":this.ML
});
a.appendChild(b,c);
this.lv=c
};
l8[_P].t=function () {
l8.b.t.call(this);
this.$P()
};
l8[_P].Wk=function () {
};
l8[_P].QG=function (a,b) {
return this.ll?this.i.f(L,undefined,b?a.c():undefined):a.c()
};
l8[_P].tW=function (a) {
return this.ll?a.c()[Dc]:a.c()
};
l8[_P].I=function (a,b) {
this.Ud(a,this.pd(),b)
};
l8[_P].Ud=function (a,b,c) {
if(!this.ll)l8.b.Ud.call(this,a,b,c);
else {
l8.b.Ud.call(this,
a,b,false);
if(c) {
	if(!this.h)this.f();
	var d=this.fa()[vc][b],e=this.QG(a);
	this.fa().insertBefore(e,d);
	a.HC(e)
}
}this.$P()
};
l8[_P].$P=function () {
if(this.z) {
if(this.Wp)cz(this.fa(),this.Wp);
this.Wp=null;
if(this.Wp)N(this.fa(),this.Wp);
this.Zd(xd(function (a) {
	var b=a.c();
	if(b) {
		var c=this.ll?b[Dc]:b;
		this.Wk(c,b)
	}
},this))
}
};
l8[_P].Aq=function (a,b) {
return this.removeChild(this.Mc(a),b)
};
l8[_P].Hi=function (a) {
while(this.Oc())this.Aq(0,a)
};
Fa(l8[_P],function (a,b) {
if(this.ll) {
var c=this.tW(a);
l8.b.removeChild.call(this,
a,b);
c[Dc].removeChild(c)
}else l8.b.removeChild.call(this,a,b)
});
l8[_P].e=function () {
l8.b.e.call(this);
this.lv=null
};
var m8=function (a,b,c) {
T.call(this,a,b,false,c);
this.Ma=new D;
var d=this.DG();
this.I(d);
this.Bd=d
};
A(m8,T);
m8[_P].DG=function () {
return new l8(this.getContext(),true,this.i)
};
m8[_P].CG=function () {
return new NN(this.getContext(),this.i)
};
$a(m8[_P],function (a,b) {
m8.b[Mc].call(this,a,b);
this.Bd.setActive(a,b)
});
m8[_P].Gd=function (a) {
var b=this.CG();
this.tb(b,a);
return b
};
m8[_P].tb=function () {
};
m8[_P].f=function () {
this.h=this.i.f(L);
var a=this.Bd;
a.f();
this.i.appendChild(this.h,a.c())
};
m8[_P].fc=function () {
m8.b.fc.call(this);
this.WM();
this.Ma.clear();
this.Bd.hO(false);
var a=this.bg();
this.appendData(a)
};
m8[_P].og=function (a) {
var b=this.Ma,c=b.o(a);
if(b.remove(a))this.$M(c)
};
Ma(m8[_P],function (a) {
var b=this.wb,c=a[o],d=this.Ma;
for(var e=0;e<c;e++) {
var f=a[e];
if(this.Aw(f)) {
	var g=this.Gd(f);
	this.tx(g);
	d.k(f.l(),g);
	b.add(f)
}
}
});
m8[_P].Aw=function () {
return true
};
m8[_P].tx=function (a) {
this.Bd.I(a,true)
};
m8[_P].$M=function (a) {
this.Bd.removeChild(a,true)
};
m8[_P].WM=function () {
this.Bd.Hi(true)
};
m8[_P].ng=function (a) {
var b=this.wb,
c=a.l();
if(!b.o(a.Bc())&&this.Aw(a))b.add(a);
else if(!this.Aw(a)) {
this.og(c);
return
}var d=this.Ma.o(c);
if(d)this.tb(d,a);
else {
d=this.Gd(a);
this.tx(d);
this.Ma.k(a.l(),d)
}
};
m8[_P].Mk=function (a) {
this.Bd.Mk(a)
};
m8[_P].tj=function () {
this.Bd.hO(true)
};
m8[_P].e=function () {
m8.b.e.call(this);
this.Ma.clear();
this.Ma=null;
this.Bd=null
};
var n8=function (a,b,c) {
J.call(this);
this.Ad=this.BG(a,b,c)
};
A(n8,J);
n8[_P].DL=0;
n8[_P].BG=function (a,b,c) {
var d=c?kda(c):null,e=Ie(a,function (f) {
return new o8(f,d)
});
if(b)this.DL=b;
while(e[o]<this.DL)e.push(new o8([]));
return e
};
var kda=function (a) {
var b=new D;
for(var c=0;c<a[o];c++)b.k(a[c].Bc(),a[c]);return b
};n8[_P].pt=function (a,b) {
Ge(this.Ad,a,b)
};
n8[_P].Z_=function (a,b) {
var c=this.GV(a);
if(c.x==b.x) {
if(c.y==b.y)return null;
if(c.y==this.Ad[c.x].ye[o]-1&&b.y>c.y)return null
}this.AH(a);
b=this.p0(b);
this.zH(a,b.x,b.y);
this.dispatchEvent(new p8(a,b,false));
return b
};
n8[_P].p0=function (a) {
var b=a.x,c=a.y,d=this.Ad[o];
if(d==0)return new Os(0,0);
var e=d-1,f=b-e-1;
if(f==0)return new Os(b,0);
if(f>0)return new Os(e+1,0);
var g=this.Ad[b].ye[o];
if(g==0)return new Os(b,0);
else {
var h=g-1,j=a.y-h-1;
if(j>0)return new Os(b,h+1)
}return new Os(b,c)
};
n8[_P].GV=function (a) {
var b=-1,c=Me(this.Ad,function (d) {
b=d.TV(a);
return b!=-1
});
return b!=-1?new Os(c,b):null
};
n8[_P].GQ=function (a) {
var b=this.ST();
this.zH(a,
b,b!=-1?this.Ad[b].ye[o]:0,true)
};
n8[_P].zH=function (a,b,c,d) {
var e=false,f=this.Ad[b];
if(!f) {
f=new o8([]);
b=this.Ad[o];
this.Ad.push(f);
e=true
}f.Mr(a,c);
if(d)this.dispatchEvent(new q8(a,new Os(b,c),e))
};
n8[_P].ST=function () {
var a=this.Ad;
if(a[o]==0)return -1;
var b=0;
for(var c=1;c<a[o];c++)if(a[c].ye[o]<a[b].ye[o])b=c;return b
};n8[_P].S1=function (a) {
this.AH(a,true)
};
n8[_P].AH=function (a,b) {
this.HU(a).zq(a);
if(b)this.dispatchEvent(new r8(a))
};
n8[_P].WP=function (a) {
var b=this.ut();
this.pt(function (c) {
c.j()
});
this.Ad=this.BG(a,undefined,b);
this.dispatchEvent(new s8)
};
n8[_P].ut=function () {
return Je(this.Ad,function (a,b) {
Ve(a,b.ut());
return a
},[])
};
n8[_P].HU=function (a) {
return Ne(this.Ad,function (b) {
return Oe(b.ye,a)
})
};
n8[_P].cd=function () {
var a=Ie(this.Ad,function (b) {
return Ie(b.ut(),function (c) {
	return c.Bc()
})
});
return Vd(a)
};
n8[_P].e=function () {
n8.b.e.call(this);
this.pt(function (a) {
a.j()
})
};
var t8=function (a,b) {
H.call(this,a,b)
};
A(t8,H);
var u8="updateall",s8=function (a) {
t8.call(this,u8,a)
};
A(s8,t8);
var v8=function (a,b,c) {
t8.call(this,a,c);
this.ks=b
};
A(v8,t8);
var w8="move",p8=function (a,b,c,d,e) {
v8.call(this,d||w8,a,e);
ua(this,b);
this.PK=c
};
A(p8,v8);
var x8="add",q8=function (a,b,c,d) {
p8.call(this,a,b,c,x8,d)
};
A(q8,p8);
var y8="remove",r8=function (a,b) {
v8.call(this,y8,a,b)
};
A(r8,v8);
var o8=function (a,b) {
B.call(this);
var c=[];
Ge(a,function (d) {
if(dinstanceofh8)c.push(d);
else if(b) {
	var e=b.o(d);
	if(e)c.push(e)
}
});
this.ye=c
};
A(o8,B);
o8[_P].ut=function () {
return this.ye
};
o8[_P].TV=function (a) {
return Fe(this.ye,
a)
};
o8[_P].bU=function (a,b) {
Ge(this.ye,a,b)
};
o8[_P].Mr=function (a,b) {
Re(this.ye,a,b)
};
o8[_P].zq=function (a) {
Te(this.ye,a)
};
var z8=function (a,b,c,d) {
l8.call(this,a,b,d);
this.eR=c||false
};
A(z8,l8);
var lda="clear:both";
z8[_P].f=function () {
z8.b.f.call(this);
if(this.eR) {
var a=this.i.f(GT,{
	style:lda
});
this.i.appendChild(this.fa(),a)
}
};
var mda="styleFloat",nda="cssFloat";
z8[_P].Wk=function (a,b) {
z8.b.Wk.call(this,a,b);
var c=this.AU();
if(c)mx(a,ob,c);
if(F)mx(a,mda,Vb);
else mx(a,nda,Vb)
};
var A8="100%";
z8[_P].AU=function () {
switch(this.pd()) {
case 0:return null;
case 1:return A8;
default:return 1/this.pd()*100-0.5+xh
}
};
var B8=function (a,b,c) {
l8.call(this,a,b,c)
};
A(B8,l8);
B8[_P].Wk=function (a,b) {
B8.b.Wk.call(this,a,b);
mx(a,Fc,GL)
};
var C8=function (a,b) {
z8.call(this,a,true,true,b);
this.Gb=this.getContext().di.fo();
this.Py={
};
this.VC=[];
this.qh=new n8([],2);
this.uN()
};
A(C8,z8);
var oda="compositeview-no-items-search-options-link";
C8[_P].K2=oda;
var pda="showSearchOptions";
C8[_P].LN=pda;
var qda="homecompositeview-column";
C8[_P].aS=qda;
var rda="You don't have any saved searches.  {$tagBegin}Show search options{$tagEnd} to create and save your favorite search views.",sda="<span id=",tda=" class=";
C8[_P].t=function () {
C8.b.t.call(this);
var a=z(rda,{
tagBegin:sda+this.LN+tda+this.K2+Zf,tagEnd:TB
}),b=this.Pt();
n(b,a);
var c=this.ba();
if(this.getContext().n.NH) {
var d=this.Gb,e=this.getContext().di;
e.Pr(d,W7);
e.Of(d,W7);
c.d(d,rz,this.nA);
c.d(d,kz,this.gh);
c.d(d,lz,this.fh);
c.d(d,tz,this.mX);
c.d(d,mz,this.vp)
}c.d(b,fi,this.yp,this);
var f=this.qh;
c.d(f,x8,this.HX);
c.d(f,w8,this.IX);
c.d(f,y8,this.JX);
c.d(f,u8,this.KX)
};
C8[_P].nA=function (a) {
var b=a.Bl.ob;
this.qh.pt(function (c,d) {
var e=new Os(d,c.ye[o]);
this.VC.push(this.PZ(new D8(b,e,this),
this.Mc(d)))
},this);
this.Gb.PM()
};
C8[_P].PZ=function (a,b) {
var c=a.ob;
if(b.ll)c=this.i.f(L,undefined,c);
b.c().appendChild(c);
this.Gb.u(a);
return a
};
C8[_P].gh=function (a) {
a.Sg.x5()
};
C8[_P].fh=function (a) {
a.Sg.pP()
};
C8[_P].mX=function (a) {
a.Sg.pP();
if(a.Sg[wb]!=a.Bl[wb])this.qh.Z_(a.Bl[wb],a.Sg.hp())
};
C8[_P].vp=function () {
while(this.VC[o]>0)this.m6(this.VC.pop())
};
C8[_P].m6=function (a) {
this.Gb.Vb(a);
Mw(a.ob)
};
C8[_P].HV=function (a) {
for(var b=0;b<this.pd();b++) {
var c=this.Mc(b);
for(var d=0;d<c.pd();d++)if(a==
c.Mc(d))return new Os(b,d)
}return undefined
};C8[_P].yp=function (a) {
if(a[v].id==this.LN) {
var b=UY();
if(b)b.ir()
}
};
C8[_P].IX=function (a) {
this.zq(a.ks);
this.Mr(a.ks,a.position,a.PK)
};
C8[_P].HX=function (a) {
this.Mr(a.ks,a.position,a.PK)
};
C8[_P].Mr=function (a,b,c) {
if(c)this.mF(b.x);
this.Mc(b.x).Ud(a,b.y,true);
this.vD(a,true)
};
C8[_P].vD=function (a,b) {
a.setActive(b?this.gb:false);
if(this.getContext().n.NH)this.w3(a,b)
};
C8[_P].KX=function () {
this.uN()
};
C8[_P].uN=function () {
this.T1();
this.qh.pt(function (a) {
var b=
this.mF();
a.bU(function (c) {
	b.I(c,true);
	this.vD(c,true)
},this)
},this)
};
C8[_P].JX=function (a) {
this.zq(a.ks)
};
C8[_P].Wk=function (a,b) {
C8.b.Wk.call(this,a);
N(b,C8[_P].aS)
};
C8[_P].w3=function (a,b) {
if(b) {
var c=new E8(a,this);
this.Gb.u(c,true);
this.Py[a.l()]=c
}else {
var c=this.Py[a.l()];
if(c) {
	this.Gb.Vb(c);
	c.j();
	delete this.Py[a.l()]
}
}
};
C8[_P].mF=function (a) {
var b=new B8(this.getContext(),undefined,this.i);
if(a)this.Ud(b,a,true);
else this.I(b,true);
return b
};
C8[_P].T1=function () {
while(this.Oc()) {
var a=this.Mc(0);
while(a.Oc())this.zq(a.Mc(0));
this.removeChild(a,true)
}
};
C8[_P].zq=function (a) {
a.J().removeChild(a,true);
this.vD(a,false)
};
C8[_P].e=function () {
C8.b.e.call(this);
this.Gb.j();
this.Gb=null
};
var F8=function (a,b,c) {
Kz.call(this,a,b,c)
};
A(F8,Kz);
var uda="homecompositeview-drop-target";
F8[_P].IH=uda;
F8[_P].hp=function () {
return undefined
};
F8[_P].x5=function () {
N(this.ob,this.IH)
};
F8[_P].pP=function () {
cz(this.ob,this.IH)
};
var E8=function (a,b) {
F8.call(this,a.c(),a,a);
this.sZ=b
};
A(E8,F8);
E8[_P].hp=function () {
return this.sZ.HV(this[wb])
};
var D8=function (a,b) {
F8.call(this,vda(a),undefined);
this.Em=b
};
A(D8,F8);
var wda="margin",vda=function (a) {
var b=Fw(L),c=b[u],d=my(a,wda);
c.marginTop=d.top;
c.marginRight=d[Sc];
c.marginBottom=d[oc];
c.marginLeft=d[Wb];
var e=ey(a);
Za(c,e[y]);
return b
};
D8[_P].hp=function () {
return this.Em
};
var G8=function (a,b,c) {
m8.call(this,a,b,c);
this.XC=new sJ(a.C,Cl);
this.Rn=new sJ(a.C,Tl,true);
this.za().d(this.Rn,tJ,this.HW)
};
A(G8,m8);
var xda="homecompositedataview";
G8[_P].ja=xda;
G8[_P].f=function () {
G8.b.f.call(this);
N(this.c(),this.ja)
};
G8[_P].t=function () {
G8.b.t.call(this);
this.Rn.Cr();
var a=this.Bd;
this.za().d(a.qh,[x8,w8,y8,u8],this.GW);
this.ba().d(a,i8,this.lY)
};
G8[_P].GW=function (a) {
var b={
};
b[Ll]=a[v].cd();
this.Rn.re(b)
};
G8[_P].lY=function (a) {
var b=aq(a[v].pa());
this.og(b.l());
var c=yJ(b.l(),
b.p());
c.ZN(false);
this.xk(c)
};
G8[_P].HW=function (a) {
if(a[Cc]==Ll&&a[s])try{
var b=Rd(a[s]);
this.Bd.qh.WP(b)
}catch(a) {
}
};
G8[_P].xk=function (a) {
var b={
};
b[a.qd()]=a.cd();
this.XC.re(b)
};
G8[_P].DG=function () {
return new C8(this.getContext(),this.i)
};
G8[_P].CG=function () {
var a=new h8(this.getContext(),undefined,C,this.i);
a.Co(true);
return a
};
G8[_P].Aw=function (a) {
var b=yJ(a.q(),a.p());
return b.Fu()
};
G8[_P].tb=function (a,b) {
var c=yJ(b.q(),b.p());
if(c) {
a.Uc(c.q());
a.Tc(c.Jb().ua())
}a.te(b.pa())
};
G8[_P].tx=
function (a) {
this.Bd.qh.GQ(a)
};
G8[_P].$M=function (a) {
this.Bd.qh.S1(a)
};
G8[_P].WM=function () {
this.Bd.qh.WP([])
};
G8[_P].Fa=function (a) {
G8.b.Fa.call(this,a);
if(a) {
var b=this.c();
if(b)Za(b[u],a[y])
}
};
G8[_P].e=function () {
G8.b.e.call(this);
this.XC.j();
this.XC=null;
this.Rn.j();
this.Rn=null
};
var H8="doclist-col-name",I8="doclist-col-date",J8="doclist-tr",K8="doclist-tr-selected",L8="doclist-header-td-unsortable",M8="doclist-header-separator",N8="doclist-content-wrapper",O8="doclist-dateseparator",P8="doclist-lastedited";
var Q8='<tr class="',R8='"><td class="',yda="doclist-td-blank",zda='"><input type="checkbox" style="visibility:hidden" />',Ada=function (a,b) {
var c=b||new Q;
c.g(Q8,J8,R8,yda,zda);
if(!b)return c.toString ()
},Bda="doclist-tr-message",Cda='"><td colspan=5 class="',Dda="doclist-td-message",Eda='  doclist-td-message-child"  style="padding-',Fda="px;",Gda=function (a,b) {
var c=b||new Q;
if(!a.HK) {
var d=new Q;
Ada(null,d);
for(var e=0;e<3;e+=1)c.g(d)
}c.g(Q8,Bda,Cda,Dda,a.HK?Eda+(a.Ra?qU:rU)+E+((a.Ra?52:55)+18+
a.Ws*20)+Fda:C,K,a[Nb]);if(!b)return c.toString ()
},Hda="doclist-td-checkbox",Ida='"><input type="checkbox"',Jda=function (a,b) {
var c=b||new Q;
c.g(D7,Hda,PF,a.JR,Ida,a[Db]?n7:C,k6,a.cG,o7);
if(!b)return c.toString ()
},S8="doclist-td",Kda="doclist-star",Lda=function (a,b) {
var c=b||new Q;
c.g(D7,S8,PF,a.fE,iC,e7,CB,Kda,CB,a.R.getAttribute(Tn).p()?p7:q7,aC);
if(!b)return c.toString ()
},Mda="doclist-td-name",Nda='  style="padding-',Oda='px;"',Pda='style="visibility:hidden"',Qda="Last synchronized: {$xxx}",Rda=
"Last synchronized: Unknown",Sda="Unavailable offline",Tda="Edited offline",Uda="doclist-off",Vda='<input type="text" autocomplete="off" class="',Wda="doclist-name-input",Xda='" />',Yda="doclist-colored-folders-name-wrapper-ie",Zda="doclist-colored-folders-name-wrapper",$da=function (a,b) {
var c=b||new Q;
c.g(D7,Mda,Zd,a.yN?Nda+(a.Ra?qU:rU)+E+(3+a.yN*20)+Oda:C,e8,a.aC,K);
if(a.Ra&&a.Jm)cR(null,c);
c.g(sB,N8,BB,e7,CB,c7,CB,a.MR?$6:Z6,PF,a.LR,Zd,!a.NR?Pda:C,jR,e7,CB,c7,EB,a.sf,FB,e7,CB,GB,HB,a.ad&&!a.rename?
j7+a.ad+k7+a.xm+K:C,KB,LB,MB,oB(a.R.q()),CB);
if(a.gv.Ep()&&a.u0)if(a.R.getAttribute(Yn).p())if(a.R.Oz()) {
var d=z(Qda,{
	xxx:a.R.Oz()
});
c.g(d)
}else {
var e=z(Rda);
c.g(e)
}else if(a.gv.Ep()) {
var f=z(Sda);
c.g(f)
}c.g(K);
if(a.R.hJ()) {
var g=z(Tda);
c.g(KB,Uda,K,g,TB)
}c.g(a.Ra?IB:JB);
if(a.rename)c.g(Vda,Wda,OF,oB(a.R.q()),PF,a.e0,Xda);
else {
c.g(u4().kn(a.R)?sB+e7+CB+(F?Yda:Zda)+K:C);
u4().Xo({
	R:a.R
},c);
c.g(u4().kn(a.R)?uB:C)
}c.g(OB,a.ad&&!a.rename?KE:C,uB);
if(a.Ra&&a.Jm)eR(null,c);
if(!b)return c.toString ()
},aea=
"doclist-td-content",bea="doclist-folder",cea="doclist-owner",dea=function (a,b) {
var c=b||new Q;
c.g(D7,aea,K);
if(a.Ra&&a.Jm)cR(null,c);
c.g(a.ad?j7+a.ad+k7+a.xm+nG+N8+K:sB+N8+K);
if(a.Fe[o]>0||a.Gm) {
c.g(KB,RB,K);
if(a.Il)c.g(a.Il);
else {
	c.g(KB,bea,K);
	var d=a.Fe,e=d[o];
	for(var f=0;f<e;f++) {
		var g=d[f];
		c.g(oB(g.q()),!(f==e-1)||a.Gm?WB:C)
	}c.g(TB)
}if(a.Gm) {
	var h=z(QB);
	c.g(KB,SB,K,h,TB)
}c.g(a.Ra?UB:C,TB)
}c.g(a.Ra?IB:JB,KB,cea,K,oB(a.R.Kj()[0].S()),a.Uf[o]>0||a.Te[o]>0?WB:C,TB,a.Ra?IB:JB,KB,VB,K);
var j=a.Uf,
k=j[o];
for(var m=0;m<k;m++) {
var p=j[m];
c.g(oB(p.S()),!(m==k-1)||a.Te[o]>0?WB:C)
}var q=a.Te,t=q[o];
for(var w=0;w<t;w++) {
var $=q[w];
c.g(oB($.S()),!(w==t-1)?WB:C)
}c.g(TB,a.ad?KE:uB);
if(a.Ra&&a.Jm)eR(null,c);
if(!b)return c.toString ()
},eea="doclist-td-spacing",fea="updated",gea='"> ',hea='<span class="doclist-lastcollaborator">',iea=function (a,b) {
var c=b||new Q;
c.g(D7,eea,K);
if(a.Ra&&a.Jm)cR(null,c);
c.g(a.ad?j7+a.ad+k7+a.xm+nG+N8+K:sB+N8+K);
if(a.ex) {
c.g(KB,P8,K,oB(a.R.SI()),TB,a.Ra?IB:JB);
if(a.R.Mt()>
a.R.dp()) {
	var d=z(fea);
	c.g(KB,SB,gea,d,TB)
}
}else c.g(KB,P8,K,oB(a.R.Nz()),TB,a.Ra?IB:JB,a.R.cp()?(a.Ra?E:C)+hea+oB(a.R.cp().S())+TB:C);
c.g(a.ad?KE:uB);
if(a.Ra&&a.Jm)eR(null,c);
if(!b)return c.toString ()
},jea="doclist-syncable",kea="doclist-syncable-on",lea="doclist-syncable-off",mea=function (a,b) {
var c=b||new Q;
c.g(D7,S8,PF,a.O5,iC,e7,CB,jea,CB,a.R.getAttribute(Zn).p()?kea:lea,aC);
if(!b)return c.toString ()
},T8=function (a,b) {
var c=b||new Q;
Jda(a,c);
Lda(a,c);
$da(a,c);
dea(a,c);
iea(a,c);
if(a.qt)mea(a,
c);
if(!b)return c.toString ()
},nea='" id ="',U8="</tr>",oea=function (a,b) {
var c=b||new Q;
c.g(Q8,a[Db]?K8:J8,!a.$a&&!a.R.getAttribute(Yn).p()&&a.gv.Ep()?t7:C,nea,a.Ky,Zd,$Q,u7,aR,v7,a.R.pa(),K);
T8(a,c);
c.g(U8);
if(!b)return c.toString ()
},pea='<tr id="',qea='"></td><td colspan="4" class="',rea="style=\"padding-'",sea='px"',tea="TODAY",uea="YESTERDAY",vea="EARLIER THIS WEEK",wea="EARLIER THIS MONTH",xea="EARLIER THIS YEAR",yea="OLDER",zea=function (a,b) {
var c=b||new Q;
c.g(pea,a.x2,R8,O8,qea,O8,Zd,a.Ws?
rea+(a.Ra?qU:rU)+(35+a.Ws*20)+sea:C,Zf);
if(a.vl==1) {
var d=z(tea);
c.g(d)
}else if(a.vl==2) {
var e=z(uea);
c.g(e)
}else if(a.vl==3) {
var f=z(vea);
c.g(f)
}else if(a.vl==4) {
var g=z(wea);
c.g(g)
}else if(a.vl==5) {
var h=z(xea);
c.g(h)
}else if(a.vl==6) {
var j=z(yea);
c.g(j)
}if(!b)return c.toString ()
},Aea="<td  ",Bea='class="',Cea='><div class="',Dea="doclist-header-inner",Eea="doclist-sort-desc",Fea="doclist-sort-asc",V8=function (a,b) {
var c=b||new Q;
c.g(Aea,a.mk?Bea+a.mk+Zd:C,a.yi?k6+a.yi+Zd:C,Cea,Dea,K,a.uv?oB(a.uv):
v4,a.kM?KB+e7+CB+a.kM+HB:C,a.xv?KB+e7+CB+(a.vv?Eea:Fea)+HB:C,uB);
if(!b)return c.toString ()
},Gea="Name",Hea="Folders / Sharing",Iea="doclist-header",Jea="  doclist-header-star",Kea="doclist-header-star-icon-sort-desc",Lea="doclist-header-star-icon-sort-asc",Mea="doclist-header-star-icon",Nea="Date opened",Oea="doclist-header-spacer",Pea=function (a,b) {
var c=z(Gea),d=z(Hea),e=b||new Q;
e.g(Q8,Iea,K);
V8({
yi:a.KR
},e);
V8({
mk:M8+Jea+(!a.$a?CB+L8:C),yi:a.j5,kM:a[nc]==5?(a.kr?Kea:Lea):Mea,xv:a[nc]==5,vv:a.kr
},
e);
V8({
uv:c,mk:M8,yi:a.d0,xv:a[nc]==1,vv:a.kr
},e);
V8({
uv:d,mk:M8+(!a.$a?CB+L8:C),yi:a.R4,xv:a[nc]==2,vv:a.kr
},e);
var f=new Q;
if(a.ex) {
var g=z(Nea);
f.g(g)
}else {
var h=z(kX);
f.g(h)
}V8({
uv:f,mk:M8,yi:a.ZS,xv:a[nc]==3||a[nc]==6,vv:a.kr
},e);
if(a.qt)V8({
mk:M8,yi:a.N5
},e);
V8({
mk:Oea,yi:a.i5
},e);
e.g(U8);
if(!b)return e.toString ()
},Qea="doclist-table",Rea="  doclist-header-table",Sea='" cellspacing="0" cellpadding="1"><col class="',Tea="doclist-col-checkbox",W8='"/><col class="',Uea="doclist-col-star",X8="width: ",
Vea="doclist-col-sharing",Wea='<col class="doclist-col-syncable"/>',Xea='<thead class="',Yea="doclist-thead",Zea=function (a,b) {
var c=b||new Q;
c.g(eF,Qea,a.jM?Rea:C,Sea,Tea,W8,Uea,W8,H8,nU,a.$B?X8+a.$B+rx:C,W8,Vea,W8,I8,nU,a.dH?X8+a.dH+rx:C,o7,a.qt?Wea:C,Xea,Yea,K);
if(!b)return c.toString ()
},$ea='<tr style="height:0px;">',afa="</tr></thead></table>",Y8=function (a,b) {
var c=b||new Q;
Zea(a,c);
if(a.jM)Pea(a,c);
else c.g($ea);
c.g(afa);
if(!b)return c.toString ()
},bfa="jM",cfa="doclist-container",dfa=function (a,
b) {
var c=b||new Q;
if(a.nT)rB(Y8,a,c,bfa,true);
c.g(sB,cfa,K);
Y8(a,c);
c.g(uB);
if(!b)return c.toString ()
},efa="doclist-colored-folders-wrapper-ie",ffa="doclist-colored-folders-wrapper",gfa=function (a,b) {
var c=b||new Q;
c.g(sB,F?efa:ffa,E,e7,K);
if(!b)return c.toString ()
},hfa=function (a,b) {
var c=b||new Q;
c.g(uB);
if(!b)return c.toString ()
};
var a9=function (a,b,c,d,e,f,g) {
f7.call(this,a,b,Z8||(Z8=new $8),c,d,e,f,g);
this.Sc={
};
this.aa=new sJ(a.C,Ol);
this.za().d(this.aa,tJ,this.td)
};
A(a9,f7);
a9[_P].nj=null;
a9[_P].zh=null;
a9[_P].hh=null;
a9[_P].Ig=null;
a9[_P].pr=null;
var b9="sharing";
a9[_P].HI=function () {
return true
};
var c9="name-resizer",d9="date",e9="date-resizer";
a9[_P].xM=function () {
if(!this.uf) {
this.AG(b9,c9);
this.AG(d9,e9)
}
};
var f9="rs",ifa="doclistview-column-resizer",g9="lh";
a9[_P].AG=function (a,b) {
var c=this.sc(f9,b),d=this.i,e=
d.c(c);
if(!e) {
e=d.f(L,{
	"class":ifa,id:c
});
d.appendChild(this.Rb(),e)
}var f=d.c(this.sc(g9,a)),g=Cx(f,this.Rb()),h=Vx(f);
if(this.fb())g.x+=h[r];
g.x-=Vx(e)[r]/2;
h=Vx(f);
sx(e,g);
Za(e[u],h[y])
};
a9[_P].H4=function (a,b) {
this.aa.re(this.Sc);
this.uj();
var c=this.bu(b.id),d=this.i,e=this.sc(g9,d9),f=this.sc(g9,Bc),g=this.sc(g9,b9),h,j,k=this.fb();
switch(c) {
case c9:this.DJ=1;
if(k) {
	h=d.c(g);
	j=d.c(f)
}else {
	h=d.c(f);
	j=d.c(g)
}this.zh=this.tz(Bc);
this.ZG=k?j[Ab]:h[Ab];
break;
case e9:this.DJ=-1;
if(k) {
	h=d.c(e);
	j=d.c(g)
}else {
	h=
	d.c(g);
	j=d.c(e)
}this.zh=this.tz(d9);
this.ZG=k?h[Ab]:j[Ab];
break
}var m=new Ps(h[Jb]+4,0,h[Ab]+j[Ab]-12,0);
this.nj=new Xy(b,b,m);
this.HH=b[Jb];
var p=this.ba();
p.d(this.nj,$y,this.UW);
p.d(this.nj,Ny,this.TW);
this.nj.mn(a)
};
a9[_P].tz=function (a) {
var b;
switch(a) {
case Bc:b=H8;
break;
case d9:b=I8;
break
}return tw(Bz,b,this.Rb())
};
a9[_P].DD=function (a) {
a9.b.DD.call(this,a);
this.QH(Ln,a);
this.QH(b9,a)
};
a9[_P].QH=function (a,b) {
var c=this.sc(g9,a),d=this.i.c(c);
if(d)ez(d,L8,!b)
};
a9[_P].td=function (a) {
var b,c=
a[Cc];
switch(c) {
case El:b=d9;
break;
case Dl:b=Bc;
break;
default:return
}var d=ha(a[s]);
if(d) {
this.zh=this.tz(b);
this.pN(d);
this.Sc[c]=d
}
};
a9[_P].EM=function () {
if(this.Ig)Gi(this.Ig);
this.Ig=null;
this.hh=null;
this.pr=null
};
a9[_P].iI=function () {
this.xM()
};
a9[_P].bt=function (a) {
var b=this.xJ(),c=this.i,d=b[Bb];
while(d[o]>0)c.removeNode(d[0]);
var e=new Vq,f={
};
this.xC(f,a);
this.r.ql(f,e);
var g=this.vK(e.toString ());
if(g)this.i.appendChild(b,g)
};
$a(a9[_P],function (a,b) {
a9.b[Mc].call(this,a,b);
if(a)this.aa.Cr()
});
a9[_P].Wr=function (a) {
var b=this.vK(a);
if(b) {
var c=this.xJ();
this.i.appendChild(c,b)
}
};
a9[_P].XD=function () {
var a=this.ia,b=a.Kf;
return !this.uf&&a&&(b==3||b==6)&&a.so
};
var jfa='<table><tbody class="',kfa="doclist-tbody";
a9[_P].vK=function (a) {
var b=this.i,c=b.createElement(L),d=new Vq;
d.g(jfa,kfa,K,a,fI);
n(c,d.toString ());
var e=c[gc];
return e&&e[Bb][0]?e[Bb][0]:null
};
var lfa="<table><tbody>";
a9[_P].LG=function (a) {
var b=this.i,c=b.createElement(L);
n(c,lfa+a+fI);
var d=b.ka(c),e=b.ka(d);
return b.ka(e)
};
a9[_P].BD=function (a,b) {
if(F) {
var c=this.i,d=c.createElement(L);
n(d,j8+b+k8);
var e=c.ka(d),f=e.rows(0);
for(var g=0;g<f[dc][o];g++) {
	va(a.cells(g),f.cells(g)[nb]);
	a.cells(g).id=f.cells(g).id;
	n(a.cells(g),f.cells(g)[yb])
}
}else n(a,b)
};
a9[_P].Bu=function (a) {
a9.b.Bu.call(this,a);
a.x6=this.ia.J();
a.$B=this.Sc[Dl];
var b=this.ia;
a.ex=b?To(b.Lh):null
};
var mfa="syncable",h9="spacer";
a9[_P].wC=function (a) {
a9.b.wC.call(this,a);
a.KR=this.sc(g9,rb);
a.j5=this.sc(g9,Ln);
a.d0=this.sc(g9,Bc);
a.R4=this.sc(g9,b9);
a.ZS=
this.sc(g9,d9);
a.N5=this.sc(g9,mfa);
a.i5=this.sc(g9,h9);
var b=this.ia;
a.ex=b?To(b.Lh):null;
a.nT=!this.uf;
this.aa.Cr();
var c=this.Sc;
if(c) {
a.$B=c[Dl];
a.dH=c[El]
}
};
a9[_P].vq=function (a,b) {
a9.b.vq.call(this,a,b);
if(this.getContext().n.yj) {
var c={
};
c.Fe=a.Fe;
a.Il=this.r.Qs(c)
}
};
a9[_P].NC=function (a,b) {
var c=this.Rb();
if(c&&this.To()&&this.OI()) {
var d=this.OI(),e=this.To()[u];
if(b)Za(e,l.max(a[y]-d[Lc],0));
if(F) {
	wa(e,a[r]);
	wa(d[u],a[r])
}wa(this.eV()[u],this.kW()+rx)
}this.xM()
};
a9[_P].kW=function () {
var a=
this.To();
return l.max(a[Ab]-a.clientWidth,0)
};
a9[_P].xJ=function () {
if(!this.pr) {
var a=this.To(),b=pw(a),c=b.ka(a);
while(c&&c[xc]!=zz)c=b.qb(c);
if(c)this.pr=c
}return this.pr
};
a9[_P].To=function () {
if(!this.Ig) {
var a=this.Rb(),b=pw(a),c=b.ka(a);
while(c&&c[xc]!=UC)c=b.qb(c);
this.Ig=c
}return this.Ig
};
a9[_P].lp=function () {
return this.To()
};
a9[_P].OI=function () {
if(!this.hh) {
var a=this.Rb(),b=pw(a),c=b.ka(a);
while(c&&c[xc]!=zz)c=b.qb(c);
this.hh=c
}return this.hh
};
a9[_P].eV=function () {
return this.i.c(this.sc(g9,
h9))
};
a9[_P].ee=function (a,b) {
if(f9==b) {
this.H4(a,a[v]);
return true
}return false
};
a9[_P].IJ=function (a,b,c) {
if(b==g9) {
var d=this.getContext().O,e=null,f=this.bu(c);
switch(f) {
	case Bc:e=1;
	break;
	case b9:if(!d||d.$a())e=2;
	break;
	case d9:e=this.ia.Lh==0?6:3;
	break;
	case Ln:if(!d||d.$a())e=5;
	break;
	default:break
}var g=this.ia;
if(!id(e)&&g) {
	var h=!g.so;
	if(e!=g.Kf)switch(e) {
		case 1:case 2:h=false;
		break;
		case 6:case 3:h=true;
		break;
		case 5:h=true;
		break
	}var j={
	};
	j[YH]=this.wa&&this.wa[YH];
	this.getContext().Pa.Dc(new BJ(g.Ca({
		sort:e,
		desc:h
	}),j))
}return true
}return false
};
a9[_P].XI=function (a) {
return new a9(this.getContext(),a,true,this.Mg+1,this,undefined,this.i)
};
a9[_P].cS=function (a) {
var b=this.fb()?this.HH-a:a-this.HH;
b*=this.DJ;
return this.ZG+b
};
a9[_P].UW=function (a) {
this.aa.re(this.Sc);
this.pN(this.cS(a[Wb]))
};
a9[_P].pN=function (a) {
for(var b=0;b<this.zh[o];b++)if(this.zh[b][u][r]!=a)wa(this.zh[b][u],a+rx);if(qg&&this.uf)this.X5()
};a9[_P].TW=function () {
var a=this.i;
for(var b=0;b<this.zh[o];b++) {
var c=this.zh[b];
if(O(c,H8)) {
	var d=
	a.c(this.sc(g9,Bc));
	this.Sc[Dl]=d[Ab]
}else {
	var d=a.c(this.sc(g9,d9));
	if(O(c,I8))this.Sc[El]=d[Ab]
}
}this.aa.re(this.Sc);
this.uj()
};
a9[_P].X5=function () {
this.kG(false);
at(xd(this.kG,this,true),0)
};
var nfa="collapse",ofa="separate";
a9[_P].kG=function (a) {
var b=this.Rb();
if(b)b[u].borderCollapse=a?nfa:ofa
};
var pfa="Drag to add them to a folder or apply an attribute",qfa="doclist-multiselected",rfa="doclist-multiselected-numitems",sfa="doclist-multiselected-desc";
a9[_P].Zg=function (a) {
var b=this.cg(a.id);
if(!b)return ;
var c=this.getContext().ea.Mj(),d,e=this.i;
if(c[o]>1&&Oe(c,b.l())) {
var f=z(b4,{
	num:c[o]
}),g=z(pfa);
d=e.f(L,{
	"class":qfa
},e.f(L,{
	"class":rfa
},f),e.f(L,{
	"class":sfa
},g))
}else {
d=yz(a);
var h=e.hf(xq,undefined,d),j=h[0];
while(j) {
	var k=j[Dc],m=j[vc];
	k.removeChild(j);
	var p=m[0];
	while(p) {
		j.removeChild(p);
		e.appendChild(k,p);
		p=m[0]
	}j=h[0]
}
}wa(d[u],a[Ab]);
return d
};
var tfa="doclist-td-child";
a9[_P].ly=function (a) {
return this.i.f(uz,{
"class":J8
},Fw(vz,{
"class":tfa,colSpan:5
},a))
};
a9[_P].uj=function () {
if(this.nj) {
this.nj.j();
this.nj=null
}
};
a9[_P].e=function () {
a9.b.e.call(this);
this.pr=null;
this.hh=null;
this.uj();
this.zh=null;
this.Sc=null;
if(this.Ig)Gi(this.Ig);
this.Ig=null;
this.aa.j();
this.aa=null
};
var $8=function () {
K6.call()
};
A($8,K6);
var Z8=null;
$8[_P].Bz=function () {
return a7
};
$8[_P].Et=function () {
return b7
};
$8[_P].rz=function () {
return Z6
};
$8[_P].Ez=function () {
return $6
};
$8[_P].dA=function () {
return F?d7:C
};
var ufa="doclistview-list";
$8[_P].Gt=function () {
return ufa
};
$8[_P].Az=function (a) {
return a?K8:J8
};
$8[_P].Wz=function () {
return z7
};
$8[_P].qy=function (a,b) {
return dfa(a,b)
};
$8[_P].ql=function (a,b) {
return Gda(a,b)
};
$8[_P].py=function (a,b) {
return zea(a,b)
};
Ja($8[_P],function (a,b) {
return oea(a,b)
});
$8[_P].Ps=function (a,b) {
return T8(a,b)
};
$8[_P].Qs=function (a,b) {
var c=b||new Vq,d=a.Fe,e={
};
e.wv=true;
var f={
};
f.W0=e;
gfa(a,c);
for(var g=0;g<d[o];g++) {
f.R=d[g];
u4().Xo(f,c)
}hfa(a,c);
if(!b)return c.toString ()
};
var i9=function (a,b) {
NN.call(this,a,b);
this.za().d(a.Gc,oA,this.ni);
this.za().d(a.Gc,vA,this.HA)
};
A(i9,NN);
var vfa="loadingstatusbox";
i9[_P].ja=vfa;
i9[_P].Pg=false;
i9[_P].Zk=C;
i9[_P].Nq=function (a) {
if(this.Pg!=a&&this.z)this.Mq(a);
this.Pg=a
};
i9[_P].Mq=function (a) {
Ya(this.h[u],a?C:Gx)
};
i9[_P].RD=function (a) {
if(this.Zk!=a&&this.z)this.ar(a);
this.Zk=a
};
i9[_P].ar=function (a) {
n(this.h,eg(a))
};
i9[_P].f=function () {
var a=this.i;
this.h=a.f(L,{
"class":this.ja,style:L2+this.Pg?C:M2
})
};
i9[_P].t=function () {
i9.b.t.call(this);
this.Mq(this.Pg);
this.ar(this.Zk)
};
i9[_P].Na=function () {
return true
};
i9[_P].ni=function (a) {
switch(a.Ag) {
case tA:this.Nq(true);
this.RD(a[bc]);
break;
default:break
}
};
i9[_P].HA=function (a) {
if(a.Ag&&a.Ag==tA)this.Nq(false)
};
var j9=function (a,b,c) {
J.call(this);
this.ei=rw(a);
this.Bo=rw(b);
this.nc=c==true;
Ta(this.ei,0);
zi(this.ei,fi,this.E0,false,this);
zi(this.ei,Qi,this.F0,false,this);
this.Ha(this.nc)
};
A(j9,J);
var k9="toggle";
j9[_P].e=function () {
Gi(this.ei);
j9.b.e.call(this)
};
j9[_P].expand=function () {
this.Ha(true)
};
j9[_P].collapse=function () {
this.Ha(false)
};
j9[_P].tr=function () {
this.Ha(!this.nc)
};
j9[_P].Ha=function (a) {
Ya(this.Bo[u],a?C:Gx);
this.OE(a);
this.nc=a;
this.dispatchEvent(new l9(k9,this,this.nc))
};
var m9="goog-zippy-collapsed",
n9="goog-zippy-expanded";
j9[_P].OE=function (a) {
if(a) {
cz(this.ei,m9);
N(this.ei,n9)
}else {
cz(this.ei,n9);
N(this.ei,m9)
}
};
j9[_P].F0=function (a) {
if(a[fc]==13||a[fc]==32) {
this.tr();
a.preventDefault();
a.stopPropagation()
}
};
j9[_P].E0=function () {
this.tr()
};
var l9=function (a,b,c) {
H.call(this,a,b);
this.G7=c
};
A(l9,H);
var wfa="overflow:hidden",o9=function (a,b,c) {
var d=Fw(L,{
style:wfa
}),e=rw(b);
e[Dc].replaceChild(d,e);
d.appendChild(e);
this.ht=d;
this.Qf=null;
j9.call(this,a,e,c);
var f=this.nc;
Ya(this.ht[u],f?C:Gx);
this.OE(f)
};
A(o9,j9);
o9[_P].aR=500;
o9[_P].$Q=Ay;
o9[_P].Ha=function (a) {
if(this.nc==a&&!this.Qf)return ;
if(this.ht[u][Gc]==Gx)Ya(this.ht[u],C);
var b=this.Bo[Lc],c=0;
if(this.Qf) {
a=this.nc;
Gi(this.Qf);
this.Qf.stop();
c=b-l.abs(da(this.Bo[u].marginTop,10))
}else c=a?0:b;
this.OE(a);
this.Qf=new Dy([0,c],[0,a?b:0],
this.aR,this.$Q);
var d=[Jy,Ry,Ny];
zi(this.Qf,d,this.y0,false,this);
zi(this.Qf,Ny,xd(this.z0,this,a));
this.Qf.play(false)
};
o9[_P].y0=function (a) {
var b=this.Bo[Lc];
this.Bo[u].marginTop=0-(b-a.y)+rx
};
o9[_P].z0=function (a) {
Gi(this.Qf);
this.nc=a;
this.Qf=null;
if(!a)Ya(this.ht[u],Gx);
this.dispatchEvent(new l9(k9,this,a))
};
var q9=function (a,b) {
MN.call(this,b);
this.Vj=new p9(a,undefined,undefined,undefined,b);
this.I(this.Vj);
var c=new yS(b);
this.B=c;
this.I(c);
c.Xv(false);
this.L=new c3
};
A(q9,MN);
var xfa="goog-list";
q9[_P].ja=xfa;
q9[_P].Hc=null;
q9[_P].ji=true;
q9[_P].hh=null;
q9[_P].Tu=null;
q9[_P].PB=null;
q9[_P].Fj=function () {
return this.ja
};
q9[_P].Ib=function () {
var a=this.Hc;
return a&&a.nc
};
q9[_P].Ha=function (a) {
var b=this.Hc;
if(this.z&&b&&b.nc!=a)b.Ha(a);
else this.ji=a
};
q9[_P].getHeader=function () {
return this.Vj
};
q9[_P].f=
function () {
var a=this.Vj;
a.Ha(this.ji);
a.f();
var b=a.c(),c=a.op(),d=this.B;
if(!d.c())d.f();
var e,f=this.i;
this.h=f.f(L,{
"class":this.Fj()
},b,e=f.f(L,{
},d.c()));
this.Hc=F?new j9(c,e,this.ji):new o9(c,e,this.ji)
};
q9[_P].Na=function (a) {
if(!O(a,this.Fj()))return false;
var b=this.i,c=b.ka(a);
if(!c)return false;
this.hh=c;
var d=b.qb(c);
if(!d)return false;
this.Tu=d;
var e=this.B.H(),f=Yw(d,function (g) {
return g[ub]==1&&O(g,e)
});
if(!f)return false;
this.PB=f;
return true
};
q9[_P].Oa=function (a) {
q9.b.Oa.call(this,
a);
var b=this.Vj;
b.Ha(this.ji);
b.Q(this.hh);
var c=this.B;
c.Q(this.PB);
var d=b.op();
this.Hc=F?new j9(d,this.Tu,this.ji):new o9(d,this.Tu,this.ji);
var e=c.Sb();
for(var f=0;f<e[o];f++)this.L.u(e[f])
};q9[_P].t=function () {
q9.b.t.call(this);
this.Hc.Ha(this.ji);
var a=this.ba();
a.d(this.L,aA,this.CA);
a.d(this.B,Tz,this.FJ);
a.d(this.Vj,Tz,this.FJ)
};
q9[_P].CA=function () {
var a=this.L.pc();
if(a)this.dispatchEvent(new iS(Zz,this,a))
};
q9[_P].FJ=function (a) {
var b=a[v];
if(this.Ku(b))this.Eb(b)
};
q9[_P].Eb=function (a) {
this.L.Eb(a)
};
q9[_P].ow=function (a,b) {
var c=this.Ku(a);
if(b&&!c)this.L.u(a);
else if(!b&&c)this.L.Vb(a)
};
q9[_P].Ku=function (a) {
return this.L.yK(a)!=-1
};
q9[_P].rO=function () {
this.Eb(this.Vj)
};
q9[_P].u=function (a) {
this.L.u(a);
this.B.u(a)
};
q9[_P].Vb=function (a) {
this.removeChild(a)
};
Fa(q9[_P],function (a) {
this.L.Vb(a);
var b;
if(F) {
var c=a.c();
b=c?this.i.qb(c):null
}var d=this.B;
d.removeChild(a,true);
if(F) {
var e=d.c();
if(e)e[u].tQ=1;
if(b)b[u].tQ=1;
var f=this.L.pc();
if(f) {
	var g=f.c();
	if(g)g[u].tQ=1
}
}
});
q9[_P].Sb=function () {
return this.B.Sb()
};
q9[_P].nO=function (a) {
var b=this.Sb();
for(var c=0;c<b[o];c++)b[c].Z(a);var d=this.getHeader();d.c();d.Z(a)
};q9[_P].bc=function () {
return this.B.bc()
};
q9[_P].e=function () {
q9.b.e.call(this);
if(this.Hc) {
this.Hc.j();
this.Hc=null
}this.L.j();
this.L=null;
this.Vj=null;
this.B=null;
this.hh=null;
this.Tu=null;
this.PB=null
};
var t9=function (a,b,c,d,e,f) {
W.call(this,a,b,c,d,e,f||r9||(r9=new s9));
this.Rd(2,false);
this.Ok(true);
this.e3(90,false)
};
A(t9,W);
var p9=function (a,b,c,d,e,f) {
t9.call(this,a,b,c,d,e,f||u9||(u9=
new v9))
};
A(p9,t9);
p9[_P].nc=false;
p9[_P].Ib=function () {
return this.nc
};
p9[_P].Ha=function (a) {
if(a!=this.nc&&this.c())this.r.Ha(this,a);
this.nc=a
};
p9[_P].op=function () {
return this.r.op(this)
};
p9[_P].mg=function (a) {
if(a[v]==this.op())return false;
return p9.b.mg.call(this,a)
};
var s9=function () {
AS.call(this)
};
A(s9,AS);
s9[_P].zN=true;
var r9=null;
var w9="goog-listitem";
s9[_P].H=function () {
return w9
};
var yfa=function () {
return new t9(null)
};
LR(w9,yfa);
var v9=function () {
s9.call(this)
};
A(v9,s9);
var u9=null,
zfa="-zippy goog-inline-block";
v9[_P].f=function (a) {
var b=v9.b.f.call(this,a),c=a.i,d=c.f(KC,{
"class":this.H()+zfa
});
n(d,v4);
c.Kp(d,this.Hj(a,b));
return b
};
var x9="-zippy";
v9[_P].Na=function (a) {
if(!v9.b.Na.call(this,a))return false;
var b=this.H()+x9,c=a[gc];
if(!(c&&O(c,b)))return false;
return true
};
v9[_P].Ha=function () {
};
v9[_P].op=function (a) {
var b=a.c();
return b?a.i.hf(KC,this.H()+x9,b)[0]:null
};
var Afa="goog-listheaderitem";
v9[_P].H=function () {
return Afa
};
var y9=function (a,b,c,d,e) {
T.call(this,a,b,false,e);
var f=new q9(c);
this.I(f);
this.ga=f;
this.Vg=new D;
this.Oo=new D;
this.Ma=new D;
this.ci=d;
this.za().d(a.Pa,QN,this.pf)
};
A(y9,T);
y9[_P].wi=C;
var Bfa="navdataview";
y9[_P].ja=Bfa;
y9[_P].HB=null;
y9[_P].Pk=null;
y9[_P].Gb=null;
y9[_P].bf=true;
y9[_P].Mk=function (a) {
this.wi=a
};
y9[_P].Ha=function (a) {
this.ga.Ha(a)
};
y9[_P].Ib=function () {
return this.ga.Ib()
};
y9[_P].sO=function (a) {
var b=this.ga.getHeader();
b.A(a);
this.ga.ow(b,true)
};
y9[_P].f=function () {
this.h=this.i.f(L,
{
"class":this.ja
});
var a=this.ga;
a.f();
this.i.appendChild(this.h,a.c());
if(this.ci)this.Ds()
};
y9[_P].Na=function (a) {
if(!O(a,this.ja))return false;
var b=this.i,c=b.ka(a);
if(!c)return false;
this.HB=c;
return true
};
y9[_P].Oa=function (a) {
y9.b.Oa.call(this,a);
this.ga.Q(this.HB);
if(this.ci)this.Ds()
};
y9[_P].t=function () {
var a=this.ba(),b=this.ga;
a.d(b,Zz,this.jA,false,this);
this.setActive(true);
if(this.ci)this.px();
y9.b.t.call(this)
};
y9[_P].Tc=function (a,b) {
y9.b.Tc.call(this,a,b);
if(this.ci) {
var c=this.Gb;
if(c)c.sw(a)
}
};
y9[_P].Ds=function () {
var a=this.getContext().di,b=a.fo(this.ia),c=new Kz(this.c(),this);
b.u(c);
a.Of(b,UJ);
this.Gb=b
};
y9[_P].px=function () {
var a=this.ba(),b=this.Gb;
a.d(b,kz,this.gh);
a.d(b,lz,this.fh);
a.d(b,tz,this.Sj)
};
y9[_P].gh=function (a) {
var b=this.Nt(a.Cl.id);
if(b) {
if(this.oh(b)&&!this.ez(b))return ;
b.Hf(true)
}
};
y9[_P].fh=function (a) {
var b=this.Nt(a.Cl.id);
if(b) {
if(this.oh(b)&&!this.ez(b))return ;
b.Hf(false)
}
};
y9[_P].Sj=function (a) {
var b=this.Nt(a.Cl.id);
if(b) {
if(this.oh(b)&&!this.ez(b))return ;
b.Hf(false);
var c=a.Bl.Ts;
if(c&&c[o]>0) {
	var d=Op(c),e;
	e=this.oh(b)?this.bV(a,b,d):this.Yo(a,b,d);
	if(e&&d[o]>0)this.getContext().V.execute(e)
}
}
};
y9[_P].bV=function (a,b,c) {
var d=this.Oo.o(b.l());
return d?d(a,b,c):null
};
y9[_P].Yo=function () {
return null
};
y9[_P].Nt=function (a) {
if(this.z) {
var b=this.ga.Sb();
for(var c=0;c<b[o];c++)if(b[c].c().id==a)return b[c]
}return null
};y9[_P].jA=function (a) {
if(this.bf&&a[Gb])if(this.oh(a[Gb]))this.gF(a[Gb]);
else if(a[Gb].Y)this.getContext().Pa.Dc(this.Ij(a[Gb]))
};
y9[_P].gF=
function () {
};
y9[_P].Ij=function () {
return null
};
y9[_P].pf=function (a) {
var b=this.Pk;
if(b)bt(b);
this.Pk=at(xd(this.d4,this,a.Bg),10)
};
y9[_P].d4=function (a) {
if(this.Pk)this.Pk=null;
this.bf=false;
var b=this.ga,c=b.getHeader();
if(b.Ku(c)) {
var d=this.Ij(c);
if(d)if(a.hb(d)) {
	b.rO();
	this.bf=true;
	return
}
}var e=b.Sb();
for(var f=0;f<e[o];f++) {
var g=this.Ij(e[f]);
if(g)if(a.hb(g)) {
	b.Eb(e[f]);
	this.bf=true;
	return
}
}b.Eb(null);
this.bf=true
};
y9[_P].fc=function () {
y9.b.fc.call(this);
var a=this.ga,b=a.Sb();
while(b[o]>
0) {
var c=b[0];
if(this.oh(c))a.removeChild(c);
else a.Vb(c)
}this.Ma.clear();
var d=this.Vg.ca();
for(var e=0;e<d[o];e++)a.u(d[e]);var f=this.bg();this.appendData(f)
};y9[_P].og=function (a) {
var b=this.Ma,c=b.o(a);
if(b.remove(a))this.ga.Vb(c)
};
Ma(y9[_P],function (a) {
var b=this.wb,c=a[o],d=this.ga,e=this.Ma;
for(var f=0;f<c;f++) {
var g=a[f],h=this.Gd(g);
d.u(h);
e.k(g.l(),h);
b.add(g)
}
});
y9[_P].ng=function (a) {
var b=this.wb;
if(!b.o(a.Bc()))b.add(a);
var c=this.Ma.o(a.l());
if(c)this.tb(c,a);
else {
c=this.Gd(a);
this.ga.u(c);
this.Ma.k(a.l(),c)
}
};
y9[_P].Gd=function (a) {
var b=new t9;
this.tb(b,a);
return b
};
y9[_P].tb=function () {
};
y9[_P].Eg=function (a,b) {
var c=a.l();
this.Vg.k(c,a);
if(b)this.Oo.k(c,b)
};
y9[_P].oh=function (a) {
return this.Vg.Da(a.l())
};
y9[_P].ez=function (a) {
return this.Oo.Da(a.l())
};
y9[_P].ah=function () {
var a=[];
if(this.z) {
var b=this.ga.Sb();
for(var c=0;c<b[o];c++)a.push(b[c].c())
}return a
};y9[_P].tj=function () {
var a=this.ga;
if(a.bc()==0) {
var b=new t9(this.wi);
a.u(b);
a.ow(b,false)
}
};
y9[_P].e=function () {
y9.b.e.call(this);
this.ga.j();
this.ga=null;
this.HB=null;
this.Ma.clear();
this.Ma=null;
this.Vg.clear();
this.Vg=null;
this.Oo.clear();
this.Oo=null;
if(this.Pk) {
bt(this.Pk);
this.Pk=null
}
};
var z9=function (a,b,c,d) {
y9.call(this,a,b,c,true,d);
this.ga.getHeader().Od(this.LA)
};
A(z9,y9);
var Cfa="goog-list-heading-folders";
z9[_P].LA=Cfa;
z9[_P].Yo=function (a,b,c) {
var d=a.Qy.ua().J();
return new sq(8,c,{
addedFolders:[b.Y],removedFolders:d?[d]:undefined
})
};
z9[_P].gF=function (a) {
var b=a.Y;
if(!b)return ;
if(binstanceofBJ)this.getContext().Pa.Dc(b);
else if(binstanceofsq)this.getContext().V.execute(b)
};
z9[_P].Ij=function (a) {
var b=a.Y;
if(b)return a==this.ga.getHeader()||this.oh(a)?b:xJ(IJ,{
parent:b
});
return null
};
var A9="({$num} item)",B9="({$num} items)";
z9[_P].tb=function (a,b) {
var c={
};
c.R=b;
if(u4().kn(b))a.ma(this.i.uK(u4().Xo(c)));
else a.vg(b.q());
var d=b.Vz();
if(d==1) {
var e=z(A9,{
	num:d
});
a.Pi(e)
}else {
var f=z(B9,{
	num:d
});
a.Pi(f)
}var g=b.l();
a.Jk(Sp(b));
a.A(g);
a.Kk(g);
a.te(b.pa())
};
var C9=function (a,b,c,d) {
y9.call(this,a,b,c,false,d)
};
A(C9,y9);
C9[_P].Yo=function () {
return null
};
C9[_P].Ij=function (a) {
var b=a.Y;
return b?new BJ(new Co(2,{
mimeTypeSets:[b],sort:3
})):null
};
C9[_P].tb=function (a,b) {
a.vg(b.q());
a.Jk(b.Ie());
a.A(b.l());
a.Kk(b.l())
};
C9[_P].bg=function () {
var a=this.$b.pb(),b=[],c=a.D();
for(var d=0;d<c;d++) {
var e=a.yb(d),f=dh(e.kf(),function (h) {
	var j=Mp(h);
	return j&&j.ig()
});
if(!f)b.push(e)
}var g=this.ia.mp();
if(g)b.sort(g);
return b
};
var D9=function (a,b,c,d) {
y9.call(this,a,b,c,true,d)
};
A(D9,y9);
var Dfa="navpeopleview-item-people";
D9[_P].Qp=Dfa;
D9[_P].Yo=function (a,b,c) {
var d=this.getContext().na,e=b.Y.email;
d.FA(c[o]==1?c[0]:undefined,e);
return null
};
D9[_P].Ij=function (a) {
var b=a.Y;
return b?xJ(LJ,{
email:b.email,hosted:b.hosted
}):null
};
D9[_P].tb=function (a,b) {
a.vg(b.q());
var c=b.D();
if(c==1) {
var d=z(A9,{
	num:c
});
a.Pi(d)
}else {
var e=z(B9,{
	num:c
});
a.Pi(e)
}a.Od(this.Qp);
a.A({
email:b.Va(),hosted:b.Np()
});
a.Kk(b.l())
};
var E9=function (a,b,c,d) {
y9.call(this,a,b,c,false,d);
var e=this.za(),f=a.O;
if(f) {
e.d(f,tr,this.qc);
this.ga.nO(f.$a())
}
};
A(E9,y9);
var Efa="navsavedview-item-search";
E9[_P].Qp=Efa;
E9[_P].Ij=function (a) {
return a.Y
};
E9[_P].tb=function (a,b) {
var c=yJ(b.q(),b.p());
if(c) {
a.vg(c.q());
a.A(c.Jb());
a.AD(b.l());
a.te(b.pa());
a.Od(this.Qp)
}var d=this.getContext().O;
if(d&&!d.$a())a.Z(false)
};
E9[_P].Eg=function (a,b) {
E9.b.Eg.call(this,a,b);
var c=this.getContext().O;
if(c&&!c.$a())a.Z(false)
};
E9[_P].qc=function (a) {
var b=
a[bc]!=dN;
this.ga.nO(b)
};
var Ffa="Saved searches",Gfa="Shared with...",Hfa="Items by type",F9=function (a,b) {
NN.call(this,a,b);
var c=z(eK),d=new q9(c);
d.getHeader().Od(this.LA);
this.I(d);
this.Kh=d;
var e=z(Ffa),f;
if(a.n.Wd) {
f=new E9(this.getContext(),null,e,b);
f.Ha(false);
f.Fd(false);
this.I(f)
}this.Mi=f;
var g=z(p6),h=new z9(this.getContext(),null,g,b);
h.Fd(false);
this.I(h);
this.Wg=h;
var j=z(Gfa),k=new D9(this.getContext(),null,j,b);
k.Fd(false);
this.I(k);
this.Ai=k;
var m=z(Hfa),p=new C9(this.getContext(),null,m,b);
p.Ha(false);
p.Fd(false);
this.I(p);
this.fk=p;
var q=a.C;
if(q.Ka)this.GD();
else {
this.Vc=true;
this.za().d(q,av,this.GD)
}this.wj={
};
this.za().d(a.Pa,QN,this.pf);
this.aa=new sJ(a.C,Ql);
this.za().d(this.aa,tJ,this.td)
};
A(F9,NN);
var G9="navpane-list-allitems",H9="navpane-list-star",I9="navpane-list-hidden",J9="navpane-list-trash",K9="navpane-list-allfolders";
F9[_P].ja=Ql;
var Ifa="goog-list-heading-views";
F9[_P].LA=Ifa;
var Jfa="navpane-container-scrollable";
F9[_P].qG=Jfa;
var Kfa="navpane-container-info";
F9[_P].pG=Kfa;
F9[_P].Hs=null;
F9[_P].WE=null;
F9[_P].GN=null;
F9[_P].iz=null;
F9[_P].RB=null;
F9[_P].vC=null;
F9[_P].$n=null;
F9[_P].gy=0;
F9[_P].Gb=null;
F9[_P].bf=true;
F9[_P].Vc=false;
F9[_P].JU=function () {
if(!this.gy&&this.$n)this.gy=this.$n[Lc];
return this.gy
};
var L9="goog-list-item-pencilandpad",M9="goog-list-item-star",N9="goog-list-item-hidden",O9="goog-list-item-trash",P9="goog-list-item-itemsnotinfolders";
F9[_P].f=function () {
var a=this.i,b;
this.h=a.f(L,{
"class":this.ja
},this.Hs=b=a.f(L,{
"class":this.qG
}),this.$n=
a.f(L,{
"class":this.pG
}));
var c=this.Kh,d=c.getHeader(),e=this.wj;
d.A(xJ(jq));
c.ow(d,true);
e[G9]=d;
var f=z(hK),g=new t9(f);
g.Od(L9);
g.A(xJ(FJ));
c.u(g);
var h=z(uK);
g=new t9(h);
g.Od(L9);
g.A(xJ(MJ));
c.u(g);
var j=z(fK);
g=new t9(j);
g.Od(M9);
g.A(xJ(DJ));
c.u(g);
e[H9]=g;
var k=z(iK);
g=new t9(k);
g.Od(N9);
g.A(xJ(GJ));
if(this.getContext().n.jh) {
c.u(g);
e[I9]=g
}var m=z(jK);
g=new t9(m);
g.Od(O9);
g.A(xJ(HJ));
c.u(g);
e[J9]=g;
c.f();
a.appendChild(b,c.c());
if(this.getContext().n.Wd) {
var p=this.Mi;
p.f();
a.appendChild(b,
p.c())
}var q=this.Wg;
q.f();
a.appendChild(b,q.c());
e[K9]=q.ga.getHeader();
var t=z(kK);
g=new t9(t);
g.Od(P9);
g.A(xJ(JJ));
q.Eg(g,this.cJ);
var w=this.fk;
w.f();
a.appendChild(b,w.c());
var $=this.Ai;
$.f();
a.appendChild(b,$.c());
this.wO()
};
F9[_P].wO=function () {
var a=z(M3);
this.Wg.Mk(a);
var b=z(FS);
this.Ai.Mk(b);
if(this.getContext().n.Wd) {
var c=z(gT);
this.Mi.Mk(c)
}
};
F9[_P].Na=function (a) {
if(!O(a,this.ja))return false;
var b=this.i,c=b.ka(a);
if(!(c&&O(c,this.qG)))return false;
this.Hs=c;
var d=b.ka(c);
if(!d)return false;
this.WE=d;
var e=this.getContext().n.Wd,f;
if(e) {
f=b.qb(d);
if(!f)return false;
this.GN=f
}var g=b.qb(e?f:d);
if(!g)return false;
this.iz=g;
var h=b.qb(g);
if(!h)return false;
this.RB=h;
var j=b.qb(h);
if(!j)return false;
this.vC=j;
var k=a[$b];
if(!(k&&O(k,this.pG)))return false;
this.$n=k;
return true
};
F9[_P].Oa=function (a) {
F9.b.Oa.call(this,a);
var b=this.Kh,c=b.getHeader(),d=this.wj;
c.A(xJ(jq));
b.ow(c,true);
d[G9]=c;
b.Q(this.WE);
var e=b.Sb(),f=e[0];
f.Um(L9);
f.A(xJ(FJ));
f=e[1];
f.Um(L9);
f.A(xJ(MJ));
f=e[2];
f.Um(M9);
f.A(xJ(DJ));
d[H9]=f;
f=e[3];
f.Um(N9);
f.A(xJ(GJ));
if(this.getContext().n.jh)d[I9]=f;
f=e[4];
f.Um(O9);
f.A(xJ(HJ));
d[J9]=f;
if(this.getContext().n.Wd)this.Mi.Q(this.GN);
var g=this.Wg;
g.Q(this.iz);
d[K9]=g.ga.getHeader();
f=g.ga.Sb()[0];
f.Um(P9);
f.A(xJ(JJ));
g.Eg(f,this.cJ);
this.fk.Q(this.RB);
this.Ai.Q(this.vC);
this.wO()
};
F9[_P].t=function () {
F9.b.t.call(this);
var a=this.ba();
a.d(this.Kh,Zz,this.jA,false,this);
var b=this.wj,c=this.getContext().di,d=c.fo(),e=new Kz(b[G9].c(),null,G9);
d.u(e);
e=new Kz(b[H9].c(),
null,H9);
d.u(e);
if(this.getContext().n.jh) {
e=new Kz(b[I9].c(),null,I9);
d.u(e)
}e=new Kz(b[J9].c(),null,J9);
d.u(e);
e=new Kz(b[K9].c(),null,K9);
d.u(e);
c.Of(d,UJ);
this.Gb=d;
a.d(d,kz,this.gh);
a.d(d,lz,this.fh);
a.d(d,tz,this.Sj);
a.d(this.Kh.Hc,k9,this.Ap);
if(this.getContext().n.Wd)a.d(this.Mi.ga.Hc,k9,this.Ap);
a.d(this.Wg.ga.Hc,k9,this.Ap);
a.d(this.Ai.ga.Hc,k9,this.Ap);
a.d(this.fk.ga.Hc,k9,this.Ap)
};
F9[_P].td=function (a) {
var b=a[s]==Zj,c;
switch(a[Cc]) {
case Gl:c=this.Kh;
break;
case Jl:c=this.Mi;
break;
case Hl:c=
this.Wg;
break;
case Kl:c=this.Ai;
break;
case Il:c=this.fk;
break;
default:return
}if(c&&c.Ib()!=b)c.Ha(b)
};
F9[_P].Ap=function (a) {
var b=null,c=null;
if(this.getContext().n.Wd&&a[v]==this.Mi.ga.Hc) {
b=this.Mi.Ib();
c=Jl
}switch(a[v]) {
case this.Kh.Hc:b=this.Kh.Ib();
c=Gl;
break;
case this.Wg.ga.Hc:b=this.Wg.Ib();
c=Hl;
break;
case this.Ai.ga.Hc:b=this.Ai.Ib();
c=Kl;
break;
case this.fk.ga.Hc:b=this.fk.Ib();
c=Il;
break;
default:break
}if(c) {
var d={
};
d[c]=b?true:false;
this.aa.re(d)
}
};
F9[_P].gh=function (a) {
var b=this.wj[a.Sg[wb]];
if(b)b.Hf(true)
};
F9[_P].fh=function (a) {
var b=this.wj[a.Sg[wb]];
if(b)b.Hf(false)
};
F9[_P].Sj=function (a) {
var b=this.wj[a.Sg[wb]],c=a.Bl.Ts;
if(b&&c&&c[o]>0) {
b.Hf(false);
var d=null,e={
};
switch(a.Sg[wb]) {
	case G9:case K9:var f=a.Qy.ua(),g=f.sd();
	if(f.J()) {
		d=8;
		e.removedFolders=[f.J()]
	}else if(f.Ke==0) {
		d=10;
		e.value=false
	}else if(g==1) {
		d=2;
		e.value=false
	}break;
	case H9:d=0;
	e.value=true;
	break;
	case I9:d=10;
	e.value=true;
	break;
	case J9:d=2;
	e.value=true;
	break;
	default:break
}if(d!=null) {
	var h=Op(c);
	if(h[o]>0) {
		var j=
		new sq(d,h,e);
		this.getContext().V.execute(j)
	}
}
}
};
F9[_P].pf=function (a) {
this.e4(a.Bg)
};
F9[_P].GD=function () {
if(this.getContext().n.Wd) {
var a=this.Mi;
a.Tc(new vj(Cl),true);
if(this.getContext().n.WH)a.sO(xJ(ZJ))
}var b=$p(),c=this.Wg;
c.Tc(new Co(2,{
mimeTypes:[b.Ia()],orphans:0,sort:1,desc:false
}),true);
c.sO(xJ(IJ));
this.Ai.Tc(new Nu({
sort:1,desc:false,num:50
}),true);
this.fk.Tc(new BW(32),true);
if(this.Vc) {
this.Vc=false;
at(function () {
	this.za().M(this.getContext().C,av,this.GD)
},5,this)
}
};
F9[_P].e4=function (a,
b) {
this.bf=false;
var c=this.Kh,d=c.getHeader();
if(c.Ku(d)) {
var e=d.Y;
if(a.hb(e)) {
	c.rO();
	this.bf=true;
	return
}
}var f=c.Sb();
for(var g=0;g<f[o];g++) {
var h=f[g].Y;
if(a.hb(h)) {
	c.Eb(f[g]);
	this.bf=true;
	return
}
}this.bf=true;
if(b)this.getContext().Pa.Dc(a);
else c.Eb(null)
};
F9[_P].jA=function (a) {
if(!a[Gb])return ;
var b=a[Gb].Y;
if(this.bf&&b&&binstanceofBJ)this.getContext().Pa.Dc(b)
};
F9[_P].cJ=function (a,b,c) {
var d=new Ej,e=[],f,g;
for(var h=0;h<c[o];h++) {
f=c[h];
g=f.Id();
if(g[o]!=0) {
	e.push(f);
	d.Ue(f.Id())
}
}if(d.Qa())return null;
var j=d.ca();
return new sq(8,e,{
addedFolders:undefined,removedFolders:j
})
};
F9[_P].Fa=function (a) {
var b=this.c();
Za(b[u],a[y]);
var c=a[y]-this.JU();
if(c>=0)Za(this.Hs[u],c);
wa(b[u],a[r])
};
F9[_P].e=function () {
F9.b.e.call(this);
this.Hs=null;
this.$n=null;
this.Kh=null;
this.Wg=null;
this.N7=null;
this.S7=null;
this.wj=null;
this.Gb=null;
this.aa.j();
this.aa=null;
this.WE=null;
this.iz=null;
this.RB=null;
this.vC=null
};
var Q9=function (a,b) {
NN.call(this,a,b);
this.YE=new D;
var c=this.za();
c.d(a.Pa,PN,this.oY);
c.d(a.V,Dv,this.WY);
var d=a.ea;
d.A3(xd(this.QT,this));
d.w4(xd(this.PT,this));
d.x4(xd(this.nW,this));
c.d(a.Le,xN,this.ZX);
this.aa=new sJ(a.C,Sl,true);
if(this.getContext().n.XH)c.d(this.aa,tJ,this.td)
};
A(Q9,NN);
Q9[_P].wd=null;
Q9[_P].dj=null;
Q9[_P].em=null;
var R9=[],S9=function (a,b) {
if(b)R9.unshift(a);
else R9.push(a)
};
Q9[_P].f=function () {
Q9.b.f.call(this);
var a=this.wd;
if(a) {
a.f();
this.i.appendChild(this.h,a.c())
}
};
Q9[_P].Na=function () {
return true
};
Q9[_P].Oa=function (a) {
Q9.b.Oa.call(this,a);
var b=this.wd;
if(b) {
var c=this.i.ka(a);
if(c)b.Q(c);
else b.ub(this.c())
}
};
Q9[_P].ZX=function (a) {
var b=a.Bg,c=nd(b)?(this.getContext().n.aI?xJ(b):TJ(b)):b;
if(!c)return ;
if(!this.getContext().C.Ka) {
if(!this.em) {
	this.em=c;
	this.ba().d(this.getContext().C,av,this.iu)
}
}else this.Jq(c,true)
};
Q9[_P].iu=function () {
var a=this.em;
if(a) {
a.ua();
this.ba().M(this.getContext().C,av,this.iu);
this.Jq(a)
}
};
Q9[_P].oY=function (a) {
this.Jq(a.Bg)
};
Q9[_P].WY=function (a) {
var b=a.kb;
switch(b.Qb()) {
case 100:var c=b.Hb();
if(c[o]==1) {
	var d=c[0];
	if(Yp(d)) {
		var e=aK(d.l()),f=e.wa||{
		};
		f.path=b.Xc();
		this.Jq(e)
	}
}break;
case 101:if(this.wd)this.wd.hE(b.Ce);
break
}
};
Q9[_P].td=function (a) {
var b=xJ(a[s]);
this.Jq(b)
};
Q9[_P].sd=function (a) {
a.ua();
var b=a.wa,c=this.YE,d=a.T(),e=c.o(d),f=b?b.path:undefined;
if(!e) {
e=this.mW(a);
if(b&&Xc(b[ZH]))e.Fd(b[ZH]);
this.za().d(e,Uz,this.pf);
c.k(d,e);
this.I(e)
}else if(f)e.If(f);
return e
};
var Lfa="No handler registered for view creation.";
Q9[_P].mW=function (a) {
var b=R9,c=this.getContext(),d=this.i;
for(var e=0;e<b[o];e++) {
var f=b[e],g=f(a,c,d);
if(g)return g
}throwi(Lfa);
};
Q9[_P].pf=function (a) {
if(a[v].gb)this.dQ()
};
Q9[_P].dQ=function () {
var a=this.getContext().ea;
a.t6();
a.FD(null)
};
Q9[_P].fQ=function (a,b) {
var c=this.getContext(),d=a.sW(c.n.Sk);
ta(this.i.W,d);
if(!b||!jd(b.history)||b.history)c.Le.Qi(a,d)
};
Q9[_P].Jq=function (a,b) {
var c=a.ua();
if(c) {
var d=c.J();
if(d&&d.split(Vc)[o]==2)c.Nk(co(d))
}var e=a.wa,f=this.wd,g=true,h=false,j=this.getContext(),
k=j.C;
if(!b&&!k.MK()) {
k.kO(c);
if(f)return ;
e=e||{
};
if(!h)e[ZH]=false;
g=false
}var m=this.sd(a);
if(m==this.wd) {
if(m.NE(a.wa)) {
	j.Pa.vH(a);
	this.fQ(a,e)
}return
}if(this.z&&!m.z) {
var p;
if(this.getContext().n.lt&&!this.wd&&(p=this.i.ka(this.c())))m.Q(p);
else m.ub(this.c())
}m.setActive(true,e);
var q=this.dj;
if(q)m.Fa(q);
var t=this.wd;
if(t)t.setActive(false);
this.wd=m;
this.getContext().Pa.X2(a);
this.dQ();
j.Gc.ts();
this.fQ(a,e);
var w=a.dg();
if(j.n.XH&&c&&g&&w!=HJ&&!Bf(w,QJ)&&!Bf(w,RJ)&&!Bf(w,pj)&&!Bf(w,ZJ)) {
var $=
c.J(),za=$?Np($):undefined;
if(!(za&&za.getAttribute(Un).p())) {
	var ka={
	};
	ka[Rl]=Bf(w,KJ)?jq:w;
	this.aa.re(ka)
}
}this.dispatchEvent(Uz);
j.Pa.vH(a)
};
Q9[_P].Fa=function (a) {
this.dj=a;
var b=this.wd;
if(a&&b)b.Fa(a)
};
Q9[_P].QT=function (a) {
var b=this.wd;
if(b) {
var c=[],d=b.Pl().ca();
for(var e=0;e<a[o];e++)if(Oe(d,a[e]))c.push(a[e]);return c
}return a
};Q9[_P].PT=function (a) {
var b=this.wd,c=new D;
if(b) {
var d=b.Pj();
for(var e=0;e<a[o];e++) {
	var f=a[e];
	if(d.Da(f))c.k(f,d.o(f))
}
}return c
};
Q9[_P].nW=function (a) {
var b=
this.wd,c=new Ej;
if(b) {
var d=b.Pj(),e=a.l();
if(d.Da(e))c=d.o(e)
}return c
};
Q9[_P].e=function () {
Q9.b.e.call(this);
this.YE.clear();
this.YE=null;
this.wd=null;
this.aa.j();
this.aa=null;
if(this.em) {
this.em.j();
this.em=null
}
};
var T9=function (a,b) {
NN.call(this,a,b);
var c=new Q9(a,b);
this.I(c);
this.cx=c
};
A(T9,NN);
var Mfa="viewpane";
T9[_P].ja=Mfa;
var Nfa="viewpane-ie";
T9[_P].xu=Nfa;
T9[_P].f=function () {
var a=this.i;
this.h=a.f(L,{
"class":this.ja+E+(F?this.xu:C)
});
var b=this.cx;
b.f();
this.i.appendChild(this.h,b.c())
};
T9[_P].Na=function (a) {
if(!O(a,this.ja))return false;
if(F&&!O(a,this.xu))return false;
if(!this.i.ka(a))return false;
return true
};
T9[_P].Oa=function (a) {
T9.b.Oa.call(this,a);
this.cx.Q(this.i.ka(a))
};
T9[_P].Fa=function (a) {
var b=
this.c();
if(b) {
var c=b[u];
Za(c,a[y]);
if(F)wa(c,a[r])
}this.cx.Fa(a)
};
T9[_P].e=function () {
T9.b.e.call(this);
this.cx=null
};
var U9=function (a,b,c,d) {
P.call(this,d);
this.m=new $i(this);
this.uc=c;
this.Dj=a;
this.I(a);
this.Ek=b;
this.I(b)
};
A(U9,P);
var V9="goog-splitpane-first-container",W9="goog-splitpane-second-container",X9="goog-splitpane-handle";
U9[_P].Vi=null;
U9[_P].Yd=null;
U9[_P].Dk=null;
U9[_P].yg=null;
U9[_P].pu=5;
U9[_P].Ip=null;
U9[_P].Pv=null;
U9[_P].Gl=null;
U9[_P].tG=true;
U9[_P].as=0;
U9[_P].bE=0;
U9[_P].qN=0;
U9[_P].LC=null;
U9[_P].Hx=null;
var Ofa="goog-splitpane";
U9[_P].f=function () {
var a=this.i;
this.h=a.f(L,{
"class":Ofa
},
a.f(Dz,{
cellPadding:ce,cellSpacing:ce,border:ce
},a.f(Ez,null,a.f(uz,null,this.Yd=a.f(vz,{
"class":V9,valign:Av
}),this.yg=a.f(vz,{
"class":X9,width:this.pu
}),this.Dk=a.f(vz,{
"class":W9,valign:Av
})))));
this.XT()
};
U9[_P].Na=function (a) {
var b=V9,c=Yw(a,function (g) {
return g[ub]==1&&O(g,b)
});
if(!c)return false;
this.Yd=c;
var d=this.i,e=d.qb(c);
if(!(e&&O(e,X9)))return false;
this.yg=e;
var f=d.qb(e);
if(!(f&&O(f,W9)))return false;
this.Dk=f;
if(!this.Ip)this.Ip=this.Yd[Ab];
return true
};
U9[_P].Oa=function (a) {
U9.b.Oa.call(this,
a);
var b=this.i;
this.Dj.Q(b.ka(this.Yd));
this.Ek.Q(b.ka(this.Dk));
this.Vi=new Xy(this.yg,this.yg);
var c=Vx(a);
this.$q(new Ts(c[r],c[y]))
};
var Pfa="&nbsp;&nbsp";
U9[_P].XT=function () {
var a=this.i;
if(!this.Dj.c())this.Dj.f();
a.appendChild(this.Yd,this.Dj.c());
n(this.yg,Pfa);
if(!this.Ek.c())this.Ek.f();
a.appendChild(this.Dk,this.Ek.c());
this.Vi=new Xy(this.yg,this.yg)
};
U9[_P].t=function () {
U9.b.t.call(this);
this.m.d(this.yg,GN,this.lX);
this.m.d(this.Vi,lj,this.nA);
this.m.d(this.Vi,$y,this.nX);
this.m.d(this.Vi,
Ny,this.vp);
var a=Yx(this.Yd);
if(!na(a[Wb]))this.as=a[Wb];
if(this.Ip)this.Ik(this.Ip,true)
};
U9[_P].$=function () {
U9.b.$.call(this);
this.m.vc()
};
U9[_P].G3=function (a) {
this.Ip=a
};
U9[_P].D3=function (a) {
this.pu=a
};
U9[_P].Ik=function (a,b) {
var c=this.Hx=b||!this.Hx?this.c()[Ab]:this.Hx,d=this.pu,e=od(a)?a:(od(this.Gl)?this.Gl:l.floor(c/2));
this.Gl=e;
var f=c-e-d,g=this.LC?this.LC:this.c()[Lc];
$x(this.Yd,new Ts(e,g));
if(typeofthis.Dj.Fa==dd)this.Dj.Fa(new Ts(e,g));
$x(this.yg,new Ts(d,g));
$x(this.Dk,new Ts(f,
g));
if(typeofthis.Ek.Fa==dd)this.Ek.Fa(new Ts(f,g));
this.dispatchEvent(Uz)
};
U9[_P].$q=function (a) {
this.LC=a[y];
this.Ik(undefined,true)
};
U9[_P].h5=function () {
var a=this.as;
if(null!=this.Pv) {
this.Ik(this.Pv);
db(this.Yd[u],jP);
this.Pv=null
}else {
this.Pv=Vx(this.Yd)[r];
this.Ik(a);
db(this.Yd[u],Nn)
}
};
U9[_P].nA=function () {
var a=tx(this.c()),b=Vx(this.Yd)[r]+Vx(this.Dk)[r]-this.pu-this.as,c=new Ps(a.x+this.as,a.y,b,0);
this.Vi.L3(c);
db(this.Yd[u],jP);
this.bE=tx(this.yg).x;
this.qN=this.Gl
};
U9[_P].oG=function (a) {
var b=
this.fb()?this.bE-a:a-this.bE;
return this.qN+b
};
U9[_P].nX=function (a) {
if(this.tG) {
var b=this.oG(a[Wb]);
this.Ik(b)
}
};
U9[_P].vp=function (a) {
var b=this.oG(a[Wb]);
if(!this.tG)this.Ik(b)
};
U9[_P].lX=function () {
this.h5()
};
U9[_P].j=function () {
if(!this.RU()) {
U9.b.j.call(this);
this.Dj=null;
this.Ek=null;
this.Yd=null;
this.Dk=null;
this.m.j();
this.m=null;
this.Vi.j();
this.Vi=null
}
};
var Y9=function (a,b,c,d,e) {
NN.call(this,a,e);
var f=this.ES(a,e);
this.I(f);
this.DE=f;
var g=new CT(undefined,e);
this.I(g);
this.wr=g;
var h=new F9(a,e);
this.g0=h;
var j=new T9(a,e);
this.w6=j;
var k=new U9(h,j,gS);
if(!a.n.lt)k.G3(200);
k.D3(10);
this.Gh=k;
this.I(k);
var m=new E2(a,e);
this.I(m);
this.dF=m;
this.eF=b;
var p=new i9(a,e);
this.I(p);
this.rL=p;
this.sL=c;
this.wx=d;
this.aa=new sJ(a.C,Pl);
this.za().d(this.aa,tJ,this.td);
u4().Kb(a.n);
if(a.n.WH)S9(Qfa);
if(a.n.Eo)S9(Rfa);
S9(Sfa)
};
A(Y9,NN);
var Tfa="doclistappview";
Y9[_P].ja=Tfa;
var Ufa="doclistappview-toolbarcontainer";
Y9[_P].KP=Ufa;
var Vfa="goog-toolbar-dark-border";
Y9[_P].JP=Vfa;
var Wfa="goog-toolbar-dark-background";
Y9[_P].LP=Wfa;
var Z9="#67a7e3";
Y9[_P].HP=Z9;
Y9[_P].IP=Z9;
Y9[_P].Tw=null;
Y9[_P].NP=null;
Y9[_P].cE=null;
Y9[_P].pg=null;
Y9[_P].Js=null;
Y9[_P].dE=false;
var Qfa=function (a,b,c) {
if(a.rb(ZJ)) {
var d=new G8(b,new vj(Cl),c);
d.Fd(false);
d.LD(true);
if(b.n.BT) {
	var e=new K5(b,c),f=new B8;
	f.I(e);
	f.I(d);
	return f
}else return d
}return null
},Rfa=function (a,b,c) {
var d=
a.wa;
if(d[aI]==T2) {
var e=a.ua(),f=d.path,g=new y7(b,e,f,c);
g.Co(true);
return g
}return null
},Sfa=function (a,b,c) {
var d=a.ua(),e=a.wa,f=e.path,g=new a9(b,d,false,undefined,undefined,f,c);
g.Co(true);
return g
};
Y9[_P].f=function () {
var a=this.i,b=this.h=a.f(L,{
"class":this.ja
}),c=this.Tw=a.f(L,{
"class":this.KP
});
a.appendChild(b,c);
var d=this.DE,e=this.wr;
d.Je();
e.$v(this.JP);
e.bw(this.LP);
e.Yv(this.HP);
e.Zv(this.IP);
e.eO(this.fb()?2:1);
e.Vm(new Hs(3,3,3,3));
e.kw(new Hs(0,0,0,0));
d.f();
e.rD(d.c());
e.f();
this.i.appendChild(this.Tw,e.c());
var f=this.Gh;
f.f();
a.appendChild(b,f.c());
this.Ns()
};
Y9[_P].Ns=function () {
var a=this.i,b=this.dF;
b.f();
a.appendChild(this.eF,b.c());
this.rL.Q(this.sL)
};
Y9[_P].Na=function (a) {
var b=this.i,c=b.ka(a);
if(!(c&&O(c,this.KP)))return false;
this.Tw=c;
var d=b.ka(c);
if(!(d&&O(d,this.wr.Fj())))return false;
this.NP=d;
var e=b.qb(c);
if(!e)return false;
this.cE=e;
return true
};
Y9[_P].Oa=function (a) {
Y9.b.Oa.call(this,a);
var b=this.DE,c=this.wr;
b.Je();
c.$v(this.JP);
c.bw(this.LP);
c.Yv(this.HP);
c.Zv(this.IP);
c.eO(this.fb()?2:1);
c.Vm(new Hs(3,3,3,3));
c.kw(new Hs(0,0,0,0));
c.Q(this.NP);
b.Q(c.fa());
this.Gh.Q(this.cE);
this.Ns()
};
Y9[_P].t=function () {
Y9.b.t.call(this);
var a=this.ba();
if(this.getContext().n.sG)a.d(this.c(),Ui,this.YW);
a.d(this.Gh,Qz,this.FY)
};
Y9[_P].ES=function (a,b) {
return new s5(a,b)
};
Y9[_P].FY=function () {
if(!this.dE) {
var a={
};
a[Fl]=this.Gh.Gl;
this.aa.re(a)
}
};
Y9[_P].td=function (a) {
var b=a[s];
if(a[Cc]==Fl&&b) {
var c=ha(b);
if(jd(c)&&c!=this.Gh.Gl) {
	var d=this.Gh.c();
	if(d) {
		var e=d[Ab];
		c=l.min(c,l.max(e-50,0))
	}this.Gh.Ik(c)
}
}
};
Y9[_P].YW=function (a) {
if(!a[wc]) {
a.stopPropagation();
a.preventDefault();
this.X4(a[Oc],a[Pc],a[v])
}
};
Y9[_P].X4=function (a,b,c) {
if(this.getContext().n.sG) {
this.BZ();
this.Js.Bw(a,b,c)
}
};
Y9[_P].BZ=function () {
if(!this.Js) {
var a=this.i,b=this.Js=new Q3(this.getContext(),a);
this.I(b,true)
}
};
Y9[_P].Fa=function (a,b) {
if(a) {
if(!b) {
	var c=this.pg;
	if(c)bt(c);
	this.pg=at(xd(this.Fa,this,a,true),0);
	this.Fa(a,true);
	return
}var d=0,e=this.wr.c();
d+=e?e[Lc]:0;
if(F)Za(this.h[u],
a[y]);
var f=a.Ca();
Za(f,l.max(f[y]-d,0));
wa(f,l.max(f[r]-e[Jb],0));
this.dE=true;
this.Gh.$q(f);
this.dE=false
}
};
Y9[_P].e=function () {
Y9.b.e.call(this);
this.wr=null;
this.DE=null;
this.g0=null;
this.w6=null;
this.dF=null;
this.rL=null;
this.wx=null;
this.eF=null;
this.sL=null;
this.Gh=null;
this.Js=null;
bt(this.pg);
this.pg=null;
this.aa.j();
this.aa=null;
this.Tw=null;
this.cE=null
};
var $9="offlinedetails-heading",a$="offlinedetails-category",b$="offlinedetails-details",c$="offlinedetails-details-firstrow";
var bga=function (a,b) {
var c=b||new Q;
c.g(oR);
Xfa(a,c);
Yfa(a,c);
Zfa(a,c);
$fa(a,c);
aga(a,c);
c.g(uB);
if(!b)return nB(c.toString ())
},cga='" >Software Updates</div>',dga='">Server:</span><span>',ega='">URL:</span><span>',fga='">Last captured:</span><span>',d$="</span><span>",gga="  (Last capture success)",hga="  (Last capture failed)",Xfa=function (a,b) {
var c=b||new Q;
c.g(sB,$9,cga);
var d=(new Q(sB,c$,BB,a$,dga)).toString (),e=(new Q(S6,b$,BB,a$,ega)).toString (),f=(new Q(S6,b$,BB,a$,fga)).toString (),g=a.w5,
h=g[o];
for(var j=0;j<h;j++) {
var k=g[j];
c.g(d,oB(k.t5),d$,k.Yc()?Vg+oB(k.Yc()):C,e,oB(k.mf()),f,k.HR,d$,k.v_?gga:hga,XB)
}if(!b)return nB(c.toString ())
},iga='" >Syncing status</div>',jga='"><span>',kga='">Sync started:</span><span>',lga='">Sync completed:</span><span>',mga="</span><span>-",Yfa=function (a,b) {
var c=b||new Q;
c.g(sB,$9,iga);
var d=(new Q(sB,c$,jga)).toString (),e=(new Q(S6,b$,BB,a$,kga)).toString (),f=(new Q(S6,b$,BB,a$,lga)).toString (),g=a.L5,h=g[o];
for(var j=0;j<h;j++) {
var k=g[j];
c.g(d,
oB(k.aA()),mga,oB(k.z5),e,k.M5,f,k.G5,XB)
}if(!b)return nB(c.toString ())
},nga='" >Items downloaded</div>',e$="</span><span>(",f$=")</span><span>",oga="  - metadata changed",pga="  - metadata unchanged",qga="  - ",rga="  - no synced state",Zfa=function (a,b) {
var c=b||new Q;
c.g(sB,$9,nga);
var d=(new Q(BB,a$,K)).toString (),e=a.uT,f=e[o];
for(var g=0;g<f;g++) {
var h=e[g];
c.g(sB,g==0?c$:b$,d,oB(h.q()),e$,h.rT,f$,h.W_?oga:pga,d$,h.rG?qga+h.rG:rga,XB)
}if(!b)return nB(c.toString ())
},sga="Service sync clients",
tga='" >',uga="  - initialized",vga="  - aborted",$fa=function (a,b) {
var c=z(sga),d=b||new Q;
d.g(sB,$9,tga,c,uB);
var e=(new Q(BB,a$,K)).toString (),f=a.E5,g=f[o];
for(var h=0;h<g;h++) {
var j=f[h];
d.g(sB,h==0?c$:b$,e,oB(j.Yc()),e$,oB(j.mf()),f$,j.Ka?uga:C,d$,j.Kr?vga:C,XB)
}if(!b)return nB(d.toString ())
},wga='" >Store versions</div>',xga="</span><span>: ",aga=function (a,b) {
var c=b||new Q;
c.g(sB,$9,wga);
var d=(new Q(BB,a$,K)).toString (),e=a.u5,f=e[o];
for(var g=0;g<f;g++) {
var h=e[g];
c.g(sB,g==0?c$:b$,d,h.q(),
xga,oB(h.v5),XB)
}if(!b)return nB(c.toString ())
};
var yga="Offline Access Technical Details",zga="This has all the technical details related to the state of your offline access.",Aga="offlinedetails-content",g$=function (a,b,c,d) {
R.call(this,b,c,d);
var e=z(yga);
this.Uc(e);
var f=z(zga);
this.F=new $i(this);
this.da=a;
var g=this.fa(),h=this.i.f(L);
n(h,f);
g.appendChild(h);
N(g,Aga);
this.lb(this.ib())
};
A(g$,R);
g$[_P].va=null;
g$[_P].lo=null;
g$[_P].lj=null;
g$[_P].Yk=null;
Qa(g$[_P],function () {
return this.da
});
g$[_P].ib=function () {
if(!this.va) {
var a=this.va=
new VC(this.i),b=z(dD);
a.k(jD,b)
}return this.va
};
g$[_P].m3=function (a,b) {
this.lj=a;
this.Yk=b;
var c=this.fa();
if(this.lo) {
c.removeChild(this.lo);
this.lo=null
}var d={
};
this.oe(d);
c.appendChild(this.lo=bga(d))
};
g$[_P].oe=function (a) {
var b=this.Yk;
a.w5=this.lj.oP;
a.L5=b.vP;
a.uT=b.GH;
a.E5=b.uP;
a.u5=b.nP
};
g$[_P].e=function () {
g$.b.e.call(this);
this.F.j();
this.F=null;
this.va=null;
this.da=null;
this.lo=null;
if(this.lj) {
this.lj.j();
this.lj=null
}if(this.Yk) {
this.Yk.j();
this.Yk=null
}
};
var Bga="{$startParagraph}{$offlineProductName} will give you access to your documents when there is no internet connection.{$endParagraph}{$startParagraph}This feature will download your docs onto this computer. {$startStrong}Please make sure you are not using a public or shared computer.{$endStrong}{$endParagraph}",h$="<p>",i$="</p>",j$="<strong>",k$="</strong>",Cga='<p><a href="',Dga="</a></p>",m$=function (a,b) {
var c=z(Bga,{
startParagraph:h$,offlineProductName:a.w0,endParagraph:i$,startStrong:j$,
endStrong:k$
}),d=z(iG),e=b||new Q;
e.g(c,a.pC?a.pC:C,Cga,a.FB,rG,d,Dga);
l$(null,e);
if(!b)return e.toString ()
},Ega="{$startParagraph}You will need Google Gears for offline access, and {$startStrong}the installer will restart your browser.{$endStrong}{$endParagraph}",n$="pC",Fga=function (a,b) {
var c=z(Ega,{
startParagraph:h$,startStrong:j$,endStrong:k$,endParagraph:i$
}),d=b||new Q;
rB(m$,a,d,n$,c);
if(!b)return d.toString ()
},Gga=function (a,b) {
var c=b||new Q;
m$(a,c);
if(!b)return c.toString ()
},Hga="{$startParagraph}You will need to upgrade Google Gears for offline access, and {$startStrong}the installer will restart your browser.{$endStrong}{$endParagraph}",
Iga=function (a,b) {
var c=z(Hga,{
startParagraph:h$,startStrong:j$,endStrong:k$,endParagraph:i$
}),d=b||new Q;
rB(m$,a,d,n$,c);
if(!b)return d.toString ()
},Jga='<div class="offlineinstalldialog-icon"></div>',l$=function (a,b) {
var c=b||new Q;
c.g(Jga);
if(!b)return c.toString ()
},Kga="{$startParagraph}The Google Gears download page has been opened in another window. If you have closed it or it was prevented by a popup blocker you can try {$startLink} to open the download page again.{$endLink}",Lga=function (a,
b) {
var c=z(Kga,{
startParagraph:h$,startLink:j7+a.rU+rG,endLink:KE
}),d=b||new Q;
d.g(c);
l$(null,d);
if(!b)return d.toString ()
};
var o$="ig",t$=function (a,b,c) {
R.call(this,a,b,c);
this.Qv={
};
this.Bh={
};
this.sl=v_()?n2:tP;
this.F=new $i(this);
this.Gi(n2,p$);
this.Gi(tP,q$);
this.Gi(Mg,r$);
this.Gi(o$,s$)
};
A(t$,R);
t$[_P].Ac=false;
t$[_P].Ax=C;
t$[_P].rt=C;
t$[_P].Eu=function () {
this.Ac=true;
if(this.c()&&this.La())this.ha()
};
t$[_P].b3=function (a) {
this.Ax=a;
this.Eu()
};
t$[_P].B3=function (a) {
this.rt=a;
this.Eu()
};
t$[_P].Ga=function (a) {
if(a!=this.sl) {
var b=this.xz();
if(b&&this.z)b.bT();
this.sl=a;
this.Eu()
}
};
t$[_P].Bt=function () {
return this.sl
};
t$[_P].xz=function () {
return this.WV(this.sl)
};
t$[_P].WV=function (a) {
if(this.Bh[a])return this.Bh[a];
if(this.Qv[a])return this.Bh[a]=new this.Qv[a](this);
return null
};
t$[_P].Gi=function (a,b) {
this.Qv[a]=b;
if(this.Bh[a]) {
var c=this.sl==a;
this.Bh[a].j();
delete this.Bh[a];
if(c)this.Eu()
}
};
t$[_P].s=function (a) {
if(this.z&&a)if(this.Ac)this.ha();
t$.b.s.call(this,a)
};
t$[_P].f=function () {
t$.b.f.call(this);
this.ha()
};
t$[_P].t=function () {
t$.b.t.call(this);
this.F.d(this,aD,this.CA);
if(this.Ac)this.ha()
};
t$[_P].$=
function () {
t$.b.$.call(this);
this.F.vc()
};
t$[_P].ha=function () {
if(this.c()) {
var a=this.xz();
if(a)a.FQ();
this.Ac=false
}
};
t$[_P].CA=function (a) {
var b=this.xz();
if(b)b.XJ(a)
};
t$[_P].uW=function () {
Bv(this.rt)
};
t$[_P].e=function () {
t$.b.e.call(this);
this.F.j();
this.F=null;
this.Qv=null;
for(var a in this.Bh)this.Bh[a].j();this.Bh=null
};var u$=function (a,b) {
this.zc=a;
this.Cg=b;
this.i=a.i
};
A(u$,B);
u$[_P].Ta=C;
u$[_P].we=C;
u$[_P].Ia=function () {
return this.Cg
};
u$[_P].ae=function () {
return this.va
};
u$[_P].lb=function (a) {
this.va=
a
};
u$[_P].ac=function () {
return this.Ta
};
u$[_P].ma=function (a) {
this.Ta=a
};
u$[_P].cA=function () {
return this.we||this.zc.cA()
};
u$[_P].Uc=function (a) {
this.we=a
};
u$[_P].FQ=function () {
var a=this.zc,b=this.WS;
if(b)N(a.c(),b);
a.Uc(this.cA());
a.ma(this.ac());
a.lb(this.ae())
};
u$[_P].bT=function () {
var a=this.WS;
if(a)cz(this.zc.c(),a)
};
u$[_P].XJ=function () {
};
var Mga="Enable offline access",p$=function (a) {
u$.call(this,a,n2);
var b=z(Mga);
this.Fo=b
};
A(p$,u$);
var v$="eo",w$="ca";
p$[_P].ae=function () {
if(!this.va) {
var a=
z(eD),b=this.va=new VC(this.i);
b.k(v$,this.Fo,true,false);
b.k(w$,a,false,true)
}return this.va
};
var Nga="Install Google Gears",Oga="Get Google Gears now",q$=function (a) {
u$.call(this,a,tP);
var b=z(Nga);
this.CK=b;
var c=z(Oga);
this.Fo=c;
var d=z(eD);
this.FR=d
};
A(q$,u$);
q$[_P].OZ=C;
var Pga="goog-offlinedialog-bold";
q$[_P].vR=Pga;
var Qga="goog-offlinedialog-url";
q$[_P].dR=Qga;
var Rga="goog-offlinedialog-steps";
q$[_P].r5=Rga;
var Sga="goog-offlinedialog-step";
q$[_P].o5=Sga;
var Tga="goog-offlinedialog-step-number";
q$[_P].q5=Tga;
var Uga="goog-offlinedialog-step-description";
q$[_P].p5=Uga;
var x$="io";
q$[_P].ae=function () {
if(!this.va) {
var a=this.va=new VC(this.i);
a.k(x$,this.Fo,true,false);
a.k(w$,this.FR,false,true)
}return this.va
};
var Vga="You'll need to:",Wga="Restart your browser",Xga="Come back to {$appUrl}!";
q$[_P].ac=function () {
if(!this.Ta) {
var a=new Vq(this.OZ),b=z(Vga);
a.g(sB,this.r5,K,b);
a.g(this.bA(1,this.CK));
var c=z(Wga);
a.g(this.bA(2,c));
var d=z(Xga,{
	appUrl:KB+this.dR+K+this.zc.Ax+TB
});
a.g(this.bA(3,
d));
a.g(uB);
this.Ta=fa(a)
}return this.Ta
};
q$[_P].bA=function (a,b) {
return kg(sB,this.o5,BB,this.q5,K,a,pR,this.p5,K,b,XB)
};
q$[_P].XJ=function (a) {
switch(a.jb) {
case x$:case Mg:a.preventDefault();
this.zc.uW();
this.zc.Ga(o$);
break
}
};
var Yga="Install a new version of Google Gears",Zga="Upgrade Google Gears now",r$=function (a) {
q$.call(this,a,Mg);
var b=z(Yga);
this.CK=b;
var c=z(Zga);
this.Fo=c
};
A(r$,q$);
r$[_P].ae=function () {
if(!this.va) {
var a=z(eD),b=this.va=new VC(this.i);
b.k(Mg,this.Fo,true,false);
b.k(w$,
a,false,true)
}return this.va
};
var s$=function (a) {
u$.call(this,a,o$)
};
A(s$,u$);
var $ga="Close",aha="cl";
s$[_P].ae=function () {
if(!this.va) {
var a=z($ga),b=this.va=new VC(this.i);
b.k(aha,a,false,true)
}return this.va
};
var bha="Great! The Google Gears download page has been opened in a new window. If you accidentally closed it, you can {$aBegin}open the Google Gears download page again{$aEnd}.",cha="After you've downloaded and installed Google Gears, {$beginTag}restart your browser, and then come back to {$appUrl}!{$endTag}",
dha="</div><br/><div>";
s$[_P].ac=function () {
if(!this.Ta) {
var a=z(bha,{
	aBegin:JE+this.zc.rt+K,aEnd:KE
}),b=z(cha,{
	beginTag:sB+this.vR+K,endTag:uB,appUrl:this.Ax
});
this.Ta=kg(oR,a,dha,b,uB)
}return this.Ta
};
var eha="offlineinstalldialog",C$=function (a) {
t$.call(this,eha,true,a);
this.Gi(n2,y$);
this.Gi(tP,z$);
this.Gi(o$,A$);
this.Gi(Mg,B$)
};
A(C$,t$);
C$[_P].Zu=C;
C$[_P].RL=C;
C$[_P].V3=function (a) {
this.RL=a
};
C$[_P].K3=function (a) {
this.Zu=a
};
C$[_P].du=function () {
var a={
};
a.FB=this.Zu;
a.rU=this.rt;
a.w0=this.RL;
return a
};
var y$=function (a) {
p$.call(this,a);
this.ma(Gga(a.du()))
};
A(y$,p$);
var z$=function (a) {
q$.call(this,a);
this.ma(Fga(a.du()))
};
A(z$,q$);
var B$=function (a) {
r$.call(this,a);
this.ma(Iga(a.du()))
};
A(B$,
r$);
var A$=function (a) {
s$.call(this,a);
this.ma(Lga(a.du()))
};
A(A$,s$);
var fha="Offline Access Settings",gha="You have enabled the Google Gears browser plug-in to allow you to work with the Google Docs website even when you don't have a connection to the internet. {$beginTag}Learn more about working offline{$endTag}",hha="<a href=",D$=function (a,b,c,d) {
R.call(this,b,c,d);
var e=z(fha);
this.Uc(e);
var f=z(gha,{
beginTag:hha+a.n.rI+Zf,endTag:KE
});
this.F=new $i(this);
this.da=a;
var g=this.i.f(L,{
"class":this.Xs
});
n(g,f);
this.fa().appendChild(g);
if(a.O.LK())this.JQ();
this.QQ();
this.OQ();
this.lb(this.ib())
};
A(D$,R);
var iha="offlinesettingsdialog-description";
D$[_P].Xs=iha;
var jha="offlinesettingsdialog-setting";
D$[_P].z4=jha;
var kha="offlinesettingsdialog-setting-title";
D$[_P].A4=kha;
var lha="offlinesettingsdialog-setting-description";
D$[_P].y4=lha;
var mha="offlinedetails-viewofflinedetails-link";
D$[_P].t0=mha;
D$[_P].QL=null;
D$[_P].va=null;
D$[_P].PL=null;
D$[_P].By=false;
Qa(D$[_P],function () {
return this.da
});
D$[_P].ib=function () {
if(!this.va) {
var a=this.va=new VC(this.i),
b=z(dD);
a.k(jD,b)
}return this.va
};
var nha="Create desktop shortcut:",oha="Create desktop shortcut",pha="Creates a desktop shortcut.";
D$[_P].JQ=function () {
var a=z(nha),b=z(oha),c=z(pha);
this.fa().appendChild(this.MG(a,b,c,this.$W))
};
var qha="Reset and disable offline access:",rha="Reset my offline access",sha="You can reset so that Google Docs offline access will no longer be enabled on this computer. This will disable offline access for all Docs users on this computer.";
D$[_P].QQ=function () {
var a=
z(qha),b=z(rha),c=z(sha);
this.fa().appendChild(this.MG(a,b,c,this.pY))
};
var tha="offlineDetails",uha="Having trouble? View status with {$beginTag} technical details {$endTag}";
D$[_P].OQ=function () {
var a=this.G(tha),b=z(uha,{
beginTag:KB+this.t0+PF+a+K,endTag:TB
}),c=this.i.f(L);
n(c,b);
this.fa().appendChild(c);
var d=this.F;
d.d(c,fi,this.bY);
d.d(this.da.O,xr,this.vX);
this.QL=a
};
D$[_P].MG=function (a,b,c,d) {
var e=this.i,f,g=e.f(L,{
"class":this.z4
},e.f(L,{
"class":this.A4
},a),f=e.f(Hb,{
},b),e.f(L,{
"class":this.y4
},
c));
this.F.d(f,fi,d);
return g
};
D$[_P].$W=function () {
this.getContext().O.EG();
this.s(false)
};
D$[_P].pY=function () {
this.s(false);
this.getContext().O.Xx()
};
D$[_P].bY=function (a) {
if(a[v].id==this.QL) {
this.getContext().O.JC();
this.By=true
}
};
D$[_P].vX=function (a) {
if(this.By) {
this.s(false);
var b=this.PL;
if(!b)b=this.PL=new g$(this.getContext(),undefined,null,this.i);
b.m3(a.GR,a.I5);
b.s(true);
this.By=false
}
};
D$[_P].e=function () {
D$.b.e.call(this);
this.F.j();
this.F=null;
this.va=null
};
var E$=function () {
J.call(this)
};
A(E$,J);
E$[_P].xa=0;
E$[_P].Cf=0;
E$[_P].Af=100;
E$[_P].cf=0;
E$[_P].kE=1;
E$[_P].mh=false;
E$[_P].YB=false;
E$[_P].sa=function (a) {
a=this.Dq(a);
if(this.xa!=a) {
this.xa=a+this.cf>this.Af?this.Af-this.cf:(a<this.Cf?this.Cf:a);
if(!this.mh&&!this.YB)this.dispatchEvent(Uz)
}
};
E$[_P].p=function () {
return this.Dq(this.xa)
};
E$[_P].Wq=function (a) {
if(this.Cf!=a) {
var b=this.mh;
this.mh=true;
this.Cf=a;
if(a+this.cf>this.Af)this.cf=this.Af-this.Cf;
if(a>this.xa)this.sa(a);
if(a>this.Af) {
	this.cf=
	0;
	this.Uq(a);
	this.sa(a)
}this.mh=b;
if(!this.mh&&!this.YB)this.dispatchEvent(Uz)
}
};
E$[_P].Tl=function () {
return this.Dq(this.Cf)
};
E$[_P].Uq=function (a) {
a=this.Dq(a);
if(this.Af!=a) {
var b=this.mh;
this.mh=true;
this.Af=a;
if(a<this.xa)this.sa(a-this.cf);
if(a<this.Cf) {
	this.cf=0;
	this.Wq(a);
	this.sa(this.Af)
}if(a<this.Cf+this.cf)this.cf=this.Af-this.Cf;
if(a<this.xa+this.cf)this.cf=this.Af-this.xa;
this.mh=b;
if(!this.mh&&!this.YB)this.dispatchEvent(Uz)
}
};
E$[_P].ep=function () {
return this.Dq(this.Af)
};
E$[_P].Dq=
function (a) {
if(this.kE==null)return a;
return this.Cf+l.round((a-this.Cf)/this.kE)*this.kE
};
var F$=function (a) {
P.call(this,a);
this.Fi=new E$;
zi(this.Fi,Uz,this.MW,false,this)
};
A(F$,P);
var G$="progress-bar-";
F$[_P].f=function () {
this.ve=this.NG();
var a=G$+this.uc;
this.h=this.i.f(L,{
"class":a
},this.ve);
this.UO();
this.AO();
this.zO()
};
var vha="progressbar",wha="polite";
F$[_P].t=function () {
F$.b.t.call(this);
this.Ln();
this.Dr();
zC(this.h,vha);
CC(this.h,cP,wha)
};
F$[_P].$=function () {
F$.b.$.call(this);
this.sj()
};
var H$="progress-bar-thumb";
F$[_P].NG=function () {
return this.i.f(L,{
"class":H$
})
};
F$[_P].Ln=
function () {
if(F&&ug<7)zi(this.h,WC,this.Dr,false,this)
};
F$[_P].sj=function () {
if(F&&ug<7)Ci(this.h,WC,this.Dr,false,this)
};
F$[_P].Oa=function (a) {
this.h=a;
N(this.h,G$+this.uc);
var b=Yw(this.h,function (c) {
return c[ub]==1&&O(c,H$)
});
if(!b) {
b=this.NG();
this.h.appendChild(b)
}this.ve=b
};
F$[_P].p=function () {
return this.Fi.p()
};
F$[_P].sa=function (a) {
this.Fi.sa(a);
if(this.h)this.UO()
};
var xha="valuenow";
F$[_P].UO=function () {
CC(this.h,xha,this.p())
};
F$[_P].Tl=function () {
return this.Fi.Tl()
};
F$[_P].Wq=function (a) {
this.Fi.Wq(a);
if(this.h)this.AO()
};
var yha="valuemin";
F$[_P].AO=function () {
CC(this.h,yha,this.Tl())
};
F$[_P].ep=function () {
return this.Fi.ep()
};
F$[_P].Uq=function (a) {
this.Fi.Uq(a);
if(this.h)this.zO()
};
var zha="valuemax";
F$[_P].zO=function () {
CC(this.h,zha,this.ep())
};
F$[_P].uc=gS;
F$[_P].MW=function () {
this.Dr();
this.dispatchEvent(Uz)
};
F$[_P].Dr=function () {
if(this.ve) {
var a=this.Tl(),b=this.ep(),c=this.p(),d=(c-a)/(b-a),e=l.round(d*100);
if(this.uc==hS)if(F&&ug<7) {
	this.ve[u].top=0;
	Za(this.ve[u],A8);
	var f=this.ve[Lc],
	g=l.round(d*f);
	this.ve[u].top=f-g+rx;
	Za(this.ve[u],g+rx)
}else {
	this.ve[u].top=100-e+xh;
	Za(this.ve[u],e+xh)
}else wa(this.ve[u],e+xh)
}
};
F$[_P].KZ=function () {
var a=this.ve[u];
if(this.uc==hS) {
Ea(a,0);
wa(a,A8)
}else {
a.top=Ea(a,0);
Za(a,A8)
}
};
F$[_P].JD=function (a) {
if(this.uc!=a) {
var b=G$+this.uc,c=G$+a;
this.uc=a;
if(this.h) {
	dz(this.h,b,c);
	this.KZ();
	this.Dr()
}
}
};
F$[_P].e=function () {
F$.b.e.call(this);
this.sj();
this.h=null;
this.ve=null;
this.Fi.j()
};
var I$=function (a) {
P.call(this,a);
this.F=new $i(this);
this.Di=new F$(a);
this.I(this.Di);
this.Dn=new D
};
A(I$,P);
I$[_P].Ac=false;
I$[_P].Za=B2;
I$[_P].jE=null;
I$[_P].Cn=null;
I$[_P].QB=null;
I$[_P].BC=null;
I$[_P].G1=null;
I$[_P].iG=null;
var Aha="goog-offlinestatuscard";
I$[_P].ja=Aha;
var Bha="goog-offlinestatuscard-shadow";
I$[_P].N4=Bha;
var Cha="goog-offlinestatuscard-content";
I$[_P].iS=Cha;
var Dha="goog-offlinestatuscard-status";
I$[_P].m5=Dha;
var Eha="goog-offlinestatuscard-action";
I$[_P].fl=Eha;
var Fha=
"goog-offlinestatuscard-action-item";
I$[_P].EQ=Fha;
var Gha="goog-offlinestatuscard-action-item-last";
I$[_P].u_=Gha;
var Hha="goog-offlinestatuscard-message";
I$[_P].T_=Hha;
var Iha="goog-offlinestatuscard-progressbarstatus";
I$[_P].E1=Iha;
var Jha="goog-offlinestatuscard-closecard";
I$[_P].WR=Jha;
I$[_P].zb=function () {
return this.Za
};
I$[_P].fd=function (a) {
if(this.Za!=a)this.Ac=true;
this.Za=a;
if(this.z)this.ha()
};
I$[_P].f=function () {
var a=this.i;
this.h=a.f(L,{
"class":this.ja
},a.f(L,{
"class":this.N4
},a.f(L,
{
"class":this.iS
},this.iG=a.f(L,{
"class":this.WR
}),this.jE=a.f(L,{
"class":this.m5
}),this.BC=a.f(L,{
},this.JM=a.f(L,{
"class":this.E1
})),this.Cn=a.f(L,{
"class":this.fl
}),this.QB=a.f(L,{
"class":this.T_
}))));
this.Di.f();
a.Kp(this.Di.c(),this.JM);
this.ha()
};
I$[_P].t=function () {
I$.b.t.call(this);
var a=this.F;
a.d(this.Di,Uz,this.iY);
a.d(this.Cn,fi,this.wW);
a.d(this.iG,fi,this.YR);
if(this.Ac)this.ha()
};
I$[_P].$=function () {
I$.b.$.call(this);
this.F.vc()
};
I$[_P].YR=function () {
this.dispatchEvent(CO)
};
I$[_P].ha=
function () {
if(this.c()) {
var a=this.zb(),b=this.i;
this.hS(a);
this.dS(a);
this.gS(a);
var c=this.nz(a),d=this.QB;
M(d,c);
if(c)b.fn(d,c);
this.Ac=false
}
};
var Kha="Status: {$msg}";
I$[_P].hS=function (a) {
var b=z(Kha,{
msg:this.$z(a)
});
this.i.fn(this.jE,b)
};
I$[_P].dS=function (a) {
var b=this.ki(a);
Jw(this.Cn);
this.Dn.clear();
var c=b[o]-1;
for(var d=0;d<=c;d++)this.vS(b[d],d==c?this.u_:this.EQ)
};I$[_P].vS=function (a,b) {
var c=this.Cn,d=this.i,e=d.f(KC,{
"class":b
});
d.appendChild(c,e);
d.appendChild(c,d.createTextNode(E));
this.Dn.k(ud(e),a.Go);
M(e,true);
d.fn(e,a[Nb])
};
I$[_P].gS=function (a) {
var b=this.T4(a);
M(this.BC,b);
if(b)this.aQ()
};
I$[_P].T4=function (a) {
return a==P1||a==NT
};
I$[_P].iY=function () {
this.aQ()
};
I$[_P].wW=function (a) {
var b=this.Dn.o(ud(a[v]));
if(b)this.dispatchEvent(b)
};
I$[_P].aQ=function () {
this.i.fn(this.JM,this.KV())
};
var Lha="{$num}% complete.";
I$[_P].KV=function () {
var a=this.Di,b=l.round((a.p()-a.Tl())/(a.ep()-a.Tl())*100),c=z(Lha,{
num:b
});
return c
};
var J$="Offline. No connection available.",Mha="Online",
Nha="Synchronizing...",Oha="Updating software...",Pha="Errors have been found.";
I$[_P].$z=function (a) {
var b=C;
switch(a) {
case dN:var c=z(J$);
b=c;
break;
case vi:var d=z(Mha);
b=d;
break;
case P1:var e=z(Nha);
b=e;
break;
case NT:var f=z(Oha);
b=f;
break;
case n2:var g=z(Pha);
b=g;
break;
default:break
}return b
};
I$[_P].ki=function () {
return null
};
I$[_P].vG=function (a,b) {
return {
message:a,Go:b
}
};
I$[_P].nz=function () {
return C
};
I$[_P].e=function () {
I$.b.e.call(this);
this.Di.j();
this.Di=null;
this.F.j();
this.F=null;
this.Dn.clear();
this.Dn=null;
this.jE=null;
this.Cn=null;
this.QB=null;
this.BC=null;
this.G1=null
};
var K$=function (a) {
I$.call(this,a)
};
A(K$,I$);
K$[_P].tE=null;
K$[_P].Tg=null;
K$[_P].vx=null;
var Qha="Synchronized";
K$[_P].$z=function (a) {
var b=K$.b.$z.call(this,a);
switch(a) {
case vi:var c=z(Qha);
b=c;
break;
case P1:if(this.tE)b=this.tE;
break;
default:break
}return b
};
K$[_P].r4=function (a) {
this.tE=a;
this.ha()
};
K$[_P].x3=function (a) {
this.Tg=a;
this.ha()
};
K$[_P].Y2=function (a) {
this.vx=a;
this.ha()
};
K$[_P].nz=function (a) {
if(a==n2&&this.Tg)return this.Tg;
else if(a==vi&&this.vx)return this.vx;
return K$.b.nz.call(this)
};
var Rha="Settings",L$="settings",Sha="Try to connect now",M$="connect",Tha="Pause";
K$[_P].ki=function (a) {
var b=[],c,d,e=z(Rha);
b.push(this.vG(e,L$));
switch(a) {
case dN:var f=z(Sha);
c=f;
d=M$;
b.unshift(this.vG(c,d));
break;
case P1:z(Tha);
break
}return b
};
var N$=function (a) {
P.call(this,a);
this.F=new $i(this)
};
A(N$,P);
N$[_P].Ac=false;
N$[_P].Za=B2;
N$[_P].zc=null;
N$[_P].yd=null;
N$[_P].la=null;
N$[_P].Za=B2;
var Uha="goog-offlinestatus";
N$[_P].ja=Uha;
var Vha="New! Offline Access";
N$[_P].xQ=z(Vha);
var Wha="Paused (offline). Click to connect.";
N$[_P].BQ=z(Wha);
N$[_P].zQ=z(J$);
var Xha="Online. Click for details.";
N$[_P].AQ=z(Xha);
var Yha="Synchronizing. Click for details.";
N$[_P].CQ=z(Yha);
var Zha="Errors found. Click for details.";
N$[_P].yQ=z(Zha);
N$[_P].zb=
function () {
return this.Za
};
N$[_P].fd=function (a) {
if(this.n_(a))this.Ac=true;
this.Za=a;
if(this.z)this.ha();
if(this.yd)this.yd.fd(a)
};
N$[_P].n_=function (a) {
return this.Za!=a
};
N$[_P].H3=function (a) {
if(this.zc&&this.Wj(this.zc)>=0)this.removeChild(this.zc);
this.zc=a
};
N$[_P].o4=function (a) {
if(this.yd) {
this.F.M(this.yd,CO,this.zv,false,this);
this.la.j();
if(this.Wj(this.yd)>=0)this.removeChild(this.yd);
this.la=null;
this.yd=null
}this.yd=a;
this.F.d(this.yd,CO,this.zv,false,this);
a.fd(this.Za)
};
N$[_P].f=function () {
this.h=
this.i.f(KC,{
"class":this.ja
});
this.ha()
};
N$[_P].t=function () {
N$.b.t.call(this);
this.F.d(this.h,fi,this.gu);
if(this.Ac)this.ha()
};
N$[_P].$=function () {
N$.b.$.call(this);
this.F.vc()
};
N$[_P].ha=function () {
if(this.c()) {
var a=this.zb(),b=this.Qz(a),c=this.h;
ta(c,b[jb]);
var d=this.xl,e=this.tJ(d),f=this.tJ(a);
if(d&&O(c,e))dz(c,e,f);
else N(c,f);
this.xl=a;
if(b.yP)n(c,b[qb]);
else this.i.fn(c,b[qb]);
this.Ac=false
}
};
var O$="p";
N$[_P].Qz=function (a) {
var b=C,c=UB,d=true;
switch(a) {
case B2:case tP:c=this.xQ;
d=false;
break;
case O$:b=this.BQ;
break;
case dN:b=this.zQ;
break;
case vi:b=this.AQ;
break;
case P1:b=this.CQ;
break;
case n2:b=this.yQ;
break;
default:break
}return {
text:c,yP:d,title:b
}
};
var $ha="goog-offlinestatus-notinstalled",aia="goog-offlinestatus-installed",bia="goog-offlinestatus-paused",cia="goog-offlinestatus-offline",dia="goog-offlinestatus-online",eia="goog-offlinestatus-syncing",fia="goog-offlinestatus-error";
N$[_P].tJ=function (a) {
var b=C;
switch(a) {
case B2:b=$ha;
break;
case tP:b=aia;
break;
case O$:b=bia;
break;
case dN:b=cia;
break;
case vi:b=dia;
break;
case P1:case NT:b=eia;
break;
case n2:b=fia;
break;
default:break
}return b
};
N$[_P].gu=function () {
var a=this.zb();
if(a==B2||a==tP)this.d1();
else this.zv()
};
N$[_P].d1=function () {
var a=this.zc;
if(a) {
if(!a.z) {
	a.ub(this.i.W[Ub]);
	this.I(a)
}a.s(true)
}
};
N$[_P].zv=function () {
var a=this.yd;
if(a) {
if(!this.la) {
	if(!a.c())a.f();
	this.MZ(a);
	this.I(a);
	var b=this.FV(),c=new YS(this.c(),7);
	b.setPosition(c);
	b.fw(a.c())
}this.la.s(!this.la.Zj())
}
};
N$[_P].MZ=function (a) {
this.i.W[Ub].appendChild(a.c())
};
N$[_P].FV=function () {
if(!this.la) {
this.la=new RS;
this.la.HD(3,0,0,0)
}return this.la
};
N$[_P].e=function () {
N$.b.e.call(this);
if(this.F) {
this.F.j();
this.F=null
}if(this.zc) {
this.zc.j();
this.zc=null
}if(this.yd) {
this.yd.j();
this.yd=null
}if(this.la) {
this.la.j();
this.la=null
}
};
var gia="{$productName} Offline",P$=function (a,b) {
N$.call(this,b);
this.da=a;
var c=this.zc=new C$(b);
c.Uc(hia);
var d=a.O;
c.Ga(d.NK()?n2:(v_()?Mg:tP));
var e=a.n;
c.b3(e.cR);
c.B3(v_()?a.n.qU:a.n.mU);
c.K3(e.hU);
var f=z(gia,{
productName:e.Sk
});
c.V3(f);
this.H3(c);
var g=new K$(b);
this.o4(g);
var h=new $i(this);
this.m=h;
h.d(g,[Oy,M$,L$],this.GY);
if(d) {
h.d(d,[tr,h2],this.xX);
h.d(d,[ur,vr],this.wX)
}
};
A(P$,N$);
var iia="Install offline access for Google Docs",hia=z(iia),jia="goog-offlinestatus-message-new";
P$[_P].i0=
jia;
var kia="goog-offlinestatus-message-offline";
P$[_P].v0=kia;
P$[_P].gn=null;
P$[_P].AK=false;
Qa(P$[_P],function () {
return this.da
});
P$[_P].f=function () {
P$.b.f.call(this);
N(this.h,cB)
};
P$[_P].t=function () {
P$.b.t.call(this);
this.m.d(this.zc,aD,this.CX);
var a=this.getContext().O;
if(this.getContext().n.nU&&a.NK())this.VH()
};
P$[_P].$=function () {
P$.b.$.call(this);
this.m.vc()
};
P$[_P].CX=function (a) {
switch(a.jb) {
case v$:this.VH();
break;
default:break
}
};
P$[_P].VH=function () {
this.AK=true;
this.getContext().O.Kb()
};
P$[_P].GY=function (a) {
switch(a[x]) {
case M$:var b=this.da;
if(b.n.El)b.O.uz().IE();
else b.C.IE();
break;
case Oy:break;
case L$:if(!this.gn)this.gn=new D$(this.getContext(),undefined,true,this.i);
this.gn.s(true);
break;
default:break
}
};
P$[_P].xX=function (a) {
var b=a[bc];
this.fd(b);
var c=this.yd,d=a.X0;
if(d) {
var e=c.Di;
if(!d.EE) {
	e.Wq(0);
	e.Uq(1);
	e.sa(0)
}else {
	e.Wq(0);
	e.Uq(d.EE);
	e.sa(d.mG)
}
}var f=a[Nb],g=Hf(f);
c.r4(b==P1&&!g?f:null);
c.x3(b==n2&&!g?f:null);
c.Y2(b==vi&&!g?f:null)
};
var lia="Google Gears successfully activated. Synchronizing documents now. {$beginTag}Learn about offline access{$endTag}",
mia="An error occurred activating Google Gears. Please try again later.";
P$[_P].wX=function (a) {
if(!this.AK)return ;
var b=this.getContext(),c=a[x];
if(c==ur) {
b.O.EG();
this.zv();
var d=z(lia,{
	beginTag:JE+b.n.rI+K,endTag:KE
});
b.Gc.fd(d,sA,true);
b.O.Xl().D5()
}else if(c==vr) {
var e=z(mia);
this.getContext().Gc.fd(e,sA,true)
}
};
var nia="Offline",oia="New!",pia='<span><span class="',qia="</span></span>",ria="Error while updating software and syncing documents. Click for details.",sia="Error while updating software. Click for details.",
tia="Error while syncing documents. Click for details.";
P$[_P].Qz=function (a) {
var b=P$.b.Qz.call(this,a);
switch(a) {
case B2:case tP:var c=z(nia),d=z(oia);
xa(b,kg(pia,this.v0,K,c,pR,this.i0,K,d,qia));
b.yP=true;
break;
case vi:var e=this.da.O,f=e.cZ(),g=e.lZ();
if(f&&g) {
	var h=z(ria);
	ta(b,h)
}else if(f) {
	var j=z(sia);
	ta(b,j)
}else if(g) {
	var k=z(tia);
	ta(b,k)
}break;
default:xa(b,v4);
break
}return b
};
P$[_P].e=function () {
P$.b.e.call(this);
if(this.gn) {
this.gn.j();
this.gn=null
}this.m.j();
this.m=null;
this.da=null
};
var Q$=function (a,b,c,d,e) {
Y9.call(this,a,b,c,d,e);
var f,g=a.n;
if(g.od&&(g.pU||v_())) {
f=new P$(a,e);
this.I(f)
}this.ov=f
};
A(Q$,Y9);
var uia=" | ";
Q$[_P].Ns=function () {
Q$.b.Ns.call(this);
var a=this.ov;
if(a) {
if(this.getContext().n.lz)a.fd(vi);
a.f();
var b=this.i;
b.appendChild(this.wx,a.c());
b.appendChild(this.wx,b.f(KC,{
},uia))
}
};
Q$[_P].e=function () {
Q$.b.e.call(this);
if(this.ov) {
this.ov.j();
this.ov=null
}
};
var R$=function (a) {
D2.call(this,a);
this.Dg=new Q$(this.getContext(),a.fF,a.tL,a.vF)
};
A(R$,D2);
var via=[yq,ZJ,"all_docs","all_documents","all_spreadsheets","archived_docs","deleted_docs","starred_docs","tagged_docs",WH],wia="DocAction",xia=[qj,pj],yia=function (a) {
a=S$(a);
var b=a.dJ(Pz);
return !b||Oe(via,b)
},zia=function (a) {
a=S$(a);
var b=new G(wia);
b.bn(a.bh());
Pa(ga[Fb],b.toString ())
},T$="search/",Aia=function (a) {
a=S$(a);
var b=xia,c,d=a.bh();
for(var e=0;e<b[o];e++) {
var f=b[e],g=a.dJ(f);
if(!c&&!Hf(g))c=g;
d.remove(f)
}if(c) {
a.Sq(T$+Pf(c));
ga[Fb].replace(a.toString ().replace(/search%2F/,T$))
}
},
S$=function (a) {
return nd(a)?new G(a):a
};
function _createDoclist(a) {
var b=new ie(a),c=new R$(b);
c.Kb();
return c
}var Bia="getViewportSize";
Ed(Bia,Cw);
var Cia="isDoclistUri";
Ed(Cia,yia);
var Dia="redirectToOnlineAction";
Ed(Dia,zia);
var Eia="redirectToSearchIfNecessary";
Ed(Eia,Aia);
var U$="J",V$="F",W$="M",X$="A",Y$="S",Z$="May",$$="T",Fia={
L6:["BC","AD"],K6:["Before Christ","Anno Domini"],Q6:[U$,V$,W$,X$,W$,U$,U$,X$,Y$,"O","N","D"],P6:["January","February","March","April",Z$,"June","July","August","September","October","November","December"],Y6:["Jan","Feb","Mar","Apr",Z$,"Jun","Jul","Aug","Sep","Oct","Nov","Dec"],h7:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],a7:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],R6:[Y$,W$,$$,"W",$$,V$,Y$],Z6:["Q1","Q2",
"Q3","Q4"],V6:["1st quarter","2nd quarter","3rd quarter","4th quarter"],D6:["AM","PM"],I6:["EEEE, MMMM d, yyyy","MMMM d, yyyy","MMM d, yyyy","M/d/yy"],f7:["h:mm:ss a v","h:mm:ss a z","h:mm:ss a","h:mm a"],i7:null
},Gia="en";
jj(Fia,Gia);
