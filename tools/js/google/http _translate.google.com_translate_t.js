/* Copyright 2008 Google */
var tn_a=false,tn_b=null,tn_c=true;
function tn_d(a) {
	throwa;
}var tn_aa=Boolean,tn_e=undefined,tn_ba=encodeURIComponent,tn_ca=parseInt,tn_da=String,tn_f=window,tn_ea=Number,tn_fa=Object,tn_ga=document,tn_ha=decodeURIComponent,tn_ia=alert,tn_ja=screen,tn_ka=Array,tn_g=Math;
function tn_la(a,b) {
	return a.previousSibling=b
}function tn_ma(a,b) {
	return a.toString =b
}function tn_na(a,b) {
	return a.length=b
}function tn_oa(a,b) {
	return a.position=b
}function tn_pa(a,b) {
	return a.margin=b
}function tn_qa(a,b) {
	return a.className=b
}function tn_ra(a,b) {
	return a.width=b
}function tn_h(a,b) {
	return a.innerHTML=b
}function tn_i(a,b) {
	return a.value=b
}function tn_j(a,b) {
	return a.evaluate=b
}function tn_sa(a,b) {
	return a.currentTarget=b
}function tn_ta(a,b) {
	return a.target=b
}function tn_ua(a,b) {
	return a.lastChild=b
}function tn_va(a,b) {
	return a.keyCode=b
}function tn_wa(a,b) {
	return a.firstChild=b
}function tn_xa(a,b) {
	return a.padding=b
}function tn_ya(a,b) {
	return a.handleEvent=b
}function tn_za(a,b) {
	return a.type=b
}function tn_Aa(a,b) {
	return a.clear=b
}function tn_Ba(a,b) {
	return a.onclick=b
}function tn_Ca(a,b) {
	return a.name=b
}function tn_Da(a,b) {
	return a.parentNode=b
}function tn_Ea(a,b) {
	return a.display=b
}function tn_Fa(a,b) {
	return a.nextSibling=b
}function tn_k(a,b) {
	return a.height=b
}function tn_Ga(a,b) {
	return a.visibility=b
}var tn_l="appendChild",tn_Ha="scrollTop",tn_Ia="previousSibling",tn_m="push",tn_Ja="stop",tn_n="length",tn_Ka="position",tn_La="form",tn_="prototype",tn_Ma="test",tn_Na="relatedTarget",tn_Oa="className",tn_Pa="clearTimeout",tn_Qa="exec",tn_o="width",tn_Ra="text",tn_Sa="round",tn_Ta="abort",tn_Ua="slice",tn_Va="setTimeout",tn_p="replace",tn_q="nodeType",tn_Wa="document",tn_r="split",tn_Xa="floor",tn_Ya="getElementById",tn_Za="innerHTML",tn__a="concat",tn_0a="constructor",tn_1a="charAt",tn_2a="createTextNode",tn_3a="stopPropagation",tn_4a="callee",tn_s="value",tn_5a="location",tn_6a="preventDefault",tn_7a="insertBefore",tn_t="evaluate",tn_8a="button",tn_u="indexOf",tn_9a="message",tn_$a="hasOwnProperty",tn_v="dispatchEvent",tn_w="style",tn_ab="createCDATASection",tn_x="nodeName",tn_bb="body",tn_cb="history",tn_db="left",tn_eb="ownerDocument",tn_fb="removeChild",tn_gb="search",tn_y="target",tn_hb="lastChild",tn_z="call",tn_ib="match",tn_jb="getBoxObjectFor",tn_kb="isOpen",tn_lb="options",tn_mb="charCode",tn_nb="some",tn_ob="start",tn_pb="focus",tn_qb="getAttribute",tn_rb="createElement",tn_A="keyCode",tn_B="firstChild",tn_sb="forEach",tn_tb="scrollLeft",tn_ub="compatMode",tn_vb="bottom",tn_wb="setAttribute",tn_xb="href",tn_C="substring",tn_yb="handleEvent",tn_zb="cloneNode",tn_Ab="every",tn_D="type",tn_Bb="contains",tn_E="apply",tn_F="childNodes",tn_Cb="tagName",tn_Db="defaultView",tn_G="attributes",tn_Eb="removeAttribute",tn_Fb="axis",tn_Gb="name",tn_H="parentNode",tn_Hb="fileName",tn_I="nextSibling",tn_Ib="offsetTop",tn_Jb="contentWindow",tn_J="height",tn_Kb="offsetHeight",tn_K="join",tn_Lb="unshift",tn_Mb="setActive",tn_Nb="getElementsByTagName",tn_L="nodeValue",tn_Ob="toLowerCase",tn_Pb="createComment",tn_Qb="documentElement",tn_Rb="substr",tn_Sb="right",tn_Tb=tn_Tb||{
},tn_Ub=this;
var tn_Vb=function (a,b) {
	var c=a[tn_r]("."),d=b||tn_Ub;
	for(var e;e=c.shift();)if(d[e])d=d[e];else return tn_b;return d
},tn_Wb=function () {
},tn_Xb=function (a) {
	a.getInstance=function () {
		return a.Ag||(a.Ag=new a)
	}
};var tn_Zb=function (a) {
	var b=typeofa;
	if(b=="object")if(a) {
		if(typeofa[tn_n]=="number"&&typeofa.splice!="undefined"&&!tn_Yb(a,"length"))return "array";
		if(typeofa[tn_z]!="undefined")return "function"
	}else return "null";
	else if(b=="function"&&typeofa[tn_z]=="undefined")return "object";
	return b
},tn__b=function (a,b) {
	if(b in a)for(var c in a)if(c==b&&tn_fa[tn_][tn_$a][tn_z](a,b))return tn_c;return tn_a
};if(tn_fa[tn_].propertyIsEnumerable )var tn_Yb=function (a,b) {
	return ainstanceoftn_fa?tn_fa[tn_].propertyIsEnumerable [tn_z](a,b):tn__b(a,b)
};
else tn_Yb=tn__b;
var tn_0b=function (a) {
	return typeofa!="undefined"
},tn_1b=function (a) {
	return a===tn_b
};
var tn_M=function (a) {
	return tn_Zb(a)=="array"
},tn_2b=function (a) {
	var b=tn_Zb(a);
	return b=="array"||b=="object"&&typeofa[tn_n]=="number"
},tn_N=function (a) {
	return typeofa=="string"
};var tn_3b=function (a) {
	return tn_Zb(a)=="function"
},tn_4b=function (a) {
	var b=tn_Zb(a);
	return b=="object"||b=="array"||b=="function"
},tn_7b=function (a) {
	if(a[tn_$a]&&a[tn_$a](tn_5b)) {
		var b=a[tn_5b];
		if(b)return b
	}a[tn_5b]||(a[tn_5b]=++tn_6b);
	return a[tn_5b]
},tn_5b="closure_hashCode_",tn_6b=0,tn_8b=function (a,b) {
	var c=a.wg;
	if(arguments[tn_n]>2) {
		var d=tn_ka[tn_][tn_Ua][tn_z](arguments,2);
		c&&d[tn_Lb][tn_E](d,c);
		c=d
	}b=a.yg||b;
	a=a.xg||a;
	var e,f=b||tn_Ub;
	e=c?function () {
		var g=tn_ka[tn_][tn_Ua][tn_z](arguments);		g[tn_Lb][tn_E](g,c);
		return a[tn_E](f,g)
	}:function () {
		return a[tn_E](f,arguments)
	};
	e.wg=c;
	e.yg=b;
	e.xg=a;
	return e
},tn_9b=function (a) {
	var b=tn_ka[tn_][tn_Ua][tn_z](arguments,1);
	b[tn_Lb](a,tn_b);
	return tn_8b[tn_E](tn_b,b)
},tn_$b=Date.now||function () {
	return (new Date).getTime()
},tn_O=function (a,b) {
	function c() {
	}c.prototype=b[tn_];
	a.a=b[tn_];
	a.prototype=new c;
	a[tn_].constructor =a
};
var tn_ac=function (a,b,c) {
	if(a[tn_u])return a[tn_u](b,c);
	if(tn_ka[tn_u])return tn_ka[tn_u](a,b,c);
	var d=c==tn_b?0:c<0?tn_g.max(0,a[tn_n]+c):c;
	for(var e=d;e<a[tn_n];e++)if(e in a&&a[e]===b)return e;return -1
},tn_bc=function (a,b,c) {
	if(a[tn_sb])a[tn_sb](b,c);
	else if(tn_ka[tn_sb])tn_ka[tn_sb](a,b,c);
	else {
		var d=a[tn_n],e=tn_N(a)?a[tn_r](""):a;
		for(var f=0;f<d;f++)f in e&&b[tn_z](c,e[f],f,a)
	}
},tn_cc=function (a,b,c) {
	if(a.map)return a.map(b,c);
	if(tn_ka.map)return tn_ka.map(a,b,c);
	var d=a[tn_n],e=[],f=0,g=tn_N(a)?a[tn_r](""):a;
	for(var i=0;i<d;i++)if(i in g)e[f++]=b[tn_z](c,g[i],i,a);return e
},tn_dc=function (a,b,c) {
	if(a[tn_nb])return a[tn_nb](b,c);
	if(tn_ka[tn_nb])return tn_ka[tn_nb](a,b,c);
	var d=a[tn_n],e=tn_N(a)?a[tn_r](""):a;
	for(var f=0;f<d;f++)if(f in e&&b[tn_z](c,e[f],f,a))return tn_c;return tn_a
},tn_ec=function (a,b,c) {
	if(a[tn_Ab])return a[tn_Ab](b,c);
	if(tn_ka[tn_Ab])return tn_ka[tn_Ab](a,b,c);
	var d=a[tn_n],e=tn_N(a)?a[tn_r](""):a;
	for(var f=0;f<d;f++)if(f in e&&!b[tn_z](c,e[f],f,a))return tn_a;return tn_c
},tn_fc=function (a,b) {
	if(a[tn_Bb])return a[tn_Bb](b);
	return tn_ac(a,b)>-1
},tn_gc=function (a) {
	if(!tn_M(a))for(var b=a[tn_n]-1;b>=0;b--)delete a[b];tn_na(a,0)
},tn_ic=function (a,b,c) {
	tn_hc(a,c,0,b)
},tn_jc=function (a,b) {
	var c=tn_ac(a,b),d;
	if(d=c!=-1)tn_ka[tn_].splice[tn_z](a,c,1)[tn_n]==1;
	return d
};var tn_kc=function (a) {
	if(tn_M(a))return a[tn__a]();
	else {
		var b=[];
		for(var c=0,d=a[tn_n];c<d;c++)b[c]=a[c];return b
	}
},tn_lc=function (a) {
	if(tn_M(a))return a[tn__a]();
	return tn_kc(a)
},tn_mc=function (a) {
	for(var b=1;b<arguments[tn_n];b++) {
		var c=arguments[b];
		if(tn_2b(c)) {
			c=tn_lc(c);
			a[tn_m][tn_E](a,c)
		}else a[tn_m](c)
	}
},tn_hc=function (a) {
	return tn_ka[tn_].splice[tn_E](a,tn_nc(arguments,1))
},tn_nc=function (a,b,c) {
	return arguments[tn_n]<=2?tn_ka[tn_][tn_Ua][tn_z](a,b):tn_ka[tn_][tn_Ua][tn_z](a,b,c)
};
var tn_oc=function (a,b) {
	this.x=tn_0b(a)?a:0;
	this.y=tn_0b(b)?b:0
};
tn_oc[tn_].clone=function () {
	return new tn_oc(this.x,this.y)
};
tn_ma(tn_oc[tn_],function () {
	return "("+this.x+", "+this.y+")"
});
var tn_pc=function (a,b) {
	tn_ra(this,a);
	tn_k(this,b)
};
tn_pc[tn_].clone=function () {
	return new tn_pc(this[tn_o],this[tn_J])
};
tn_ma(tn_pc[tn_],function () {
	return "("+this[tn_o]+" x "+this[tn_J]+")"
});
tn_pc[tn_].ceil=function () {
	tn_ra(this,tn_g.ceil(this[tn_o]));
	tn_k(this,tn_g.ceil(this[tn_J]));
	return this
};
tn_pc[tn_].floor=function () {
	tn_ra(this,tn_g[tn_Xa](this[tn_o]));
	tn_k(this,tn_g[tn_Xa](this[tn_J]));
	return this
};tn_pc[tn_].round=function () {
	tn_ra(this,tn_g[tn_Sa](this[tn_o]));
	tn_k(this,tn_g[tn_Sa](this[tn_J]));
	return this
};
var tn_qc=function (a,b,c) {
	for(var d in a)b[tn_z](c,a[d],d,a)
},tn_rc=function (a) {
	var b=[],c=0;
	for(var d in a)b[c++]=a[d];return b
},tn_sc=function (a) {
	var b=[],c=0;
	for(var d in a)b[c++]=d;return b
},tn_tc=function (a,b) {
	var c;
	if(c=b in a)delete a[b];
	return c
},tn_vc=function (a,b,c) {
	if(b in a)tn_d(Error('The object already contains the key "'+b+'"'));
	tn_uc(a,b,c)
},tn_wc=function (a,b,c) {
	if(b in a)return a[b];
	return c
},tn_uc=function (a,b,c) {
	a[b]=c
},tn_xc=function (a) {
	var b={
	},c=tn_sc(a);
	for(var d=0,e=c[tn_n];d<e;d++) {
		var f=c[d];
		b[a[f]]=f
	}return b
},tn_yc=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],tn_zc=function (a) {
	var b,c;
	for(var d=1;d<arguments[tn_n];d++) {
		c=arguments[d];
		for(b in c)a[b]=c[b];for(var e=0;e<tn_yc[tn_n];e++) {
			b=tn_yc[e];
			if(tn_fa[tn_][tn_$a][tn_z](c,b))a[b]=c[b]
		}
	}
},tn_Ac=function () {
	var a=arguments[tn_n];
	if(a==1&&tn_M(arguments[0]))return tn_Ac[tn_E](tn_b,arguments[0]);
	if(a%2)tn_d(Error("Uneven number of arguments"));
	var b={
	};	for(var c=0;c<a;c+=2)b[arguments[c]]=arguments[c+1];return b
};var tn_Bc=function (a) {
	for(var b=1;b<arguments[tn_n];b++) {
		var c=tn_da(arguments[b])[tn_p](/\$/g,"$$$$");
		a=a[tn_p](/\%s/,c)
	}return a
},tn_Cc=function (a) {
	return a[tn_p](/(\r\n|\r|\n)/g,"\n")
},tn_Dc=function (a) {
	return a[tn_p](/^[\s\xa0]+|[\s\xa0]+$/g,"")
};var tn_Ec=/^[a-zA-Z0-9\-_.!~*'()]*$/,tn_Fc=function(a) {a=tn_da(a);if(!tn_Ec[tn_Ma](a))return tn_ba(a);return a},tn_Gc=function(a) {return tn_ha(a[tn_p](/\+/g," "))},tn_Hc=function(a,b) {return a[tn_p](/(\r\n|\r|\n)/g,b?"<br />":"<br>")},tn_Nc=function(a,b) {if(b)return a[tn_p](tn_Ic,"&amp;")[tn_p](tn_Jc,"&lt;")[tn_p](tn_Kc,"&gt;")[tn_p](tn_Lc,"&quot;");else{if(!tn_Mc[tn_Ma](a))return a;if(a[tn_u]("&")!=-1)a=a[tn_p](tn_Ic,"&amp;");if(a[tn_u]("<")!=-1)a=a[tn_p](tn_Jc,"&lt;");if(a[tn_u](">")!=-1)a=a[tn_p](tn_Kc,"&gt;");if(a[tn_u]('"')!=-1)a=a[tn_p](tn_Lc,"&quot;
");return a}},tn_Ic=/&/g,tn_Jc=/</g,tn_Kc=/>/g,tn_Lc=/\"/g,tn_Mc=/[&<>\"]/;var tn_Pc=function(a,b) {var c=0,d=tn_Dc(tn_da(a))[tn_r]("."),e=tn_Dc(tn_da(b))[tn_r]("."),f=tn_g.max(d[tn_n],e[tn_n]);for(var g=0;c==0&&g<f;g++) {var i=d[g]||"",j=e[g]||"",k=new RegExp("(\\d*)(\\D*)","g"),l=new RegExp("(\\d*)(\\D*)","g");do{var m=k[tn_Qa](i)||["","",""],n=l[tn_Qa](j)||["","",""];if(m[0][tn_n]==0&&n[0][tn_n]==0)break;var o=m[1][tn_n]==0?0:tn_ca(m[1],10),q=n[1][tn_n]==0?0:tn_ca(n[1],10);c=tn_Oc(o,q)||tn_Oc(m[2][tn_n]==0,n[2][tn_n]==0)||tn_Oc(m[2],n[2])}while(c==0)}return c},tn_Oc=function(a,b) {if(a<b)return-1;else if(a>b)return 1;return 0};var tn_Qc,tn_Rc,tn_Sc,tn_Tc,tn_Uc,tn_Vc,tn_Wc,tn_Xc,tn_Yc,tn_Zc,tn__c,tn_0c=function() {if(tn_Ub.navigator)return tn_Ub.navigator.userAgent;return tn_b},tn_1c=function() {var a=tn_a,b=tn_a,c=tn_a,d=tn_a,e=tn_a,f=tn_a,g=tn_a,i=tn_a,j=tn_a,k="",l=tn_0c();if(l) {var m=tn_Ub.navigator;a=l[tn_u]("Opera")==0;b=!a&&l[tn_u]("MSIE")!=-1;c=!a&&l[tn_u]("WebKit")!=-1;j=c&&l[tn_u]("Mobile")!=-1;d=!a&&!c&&m.product=="Gecko";e=d&&m.vendor=="Camino";var n,o;if(tn_Ub.opera&&typeof tn_Ub.opera.version=="function ")n=tn_Ub.opera.version();else{if(d)o=/rv\:([^\);]+)(\)|;)/;else if(b)o=/MSIE\s+([^\);]+)(\)|;)/;else if(c)o=/WebKit\/(\S+)/;if(o) {o[tn_Ma](l);n=RegExp.$1}}k=m.platform||"";f=k[tn_u]("Mac")!=-1;g=k[tn_u]("Win")!=-1;i=k[tn_u]("Linux")!=-1}tn_Qc=a;tn_Rc=b;tn_Sc=d;tn_Tc=e;tn_Uc=c;tn_Vc=j;tn_Wc=n;tn_Xc=k;tn_Yc=f;tn_Zc=g;tn__c=i};tn_1c();var tn_2c=tn_Qc,tn_P=tn_Rc,tn_3c=tn_Sc,tn_Q=tn_Uc,tn_4c=tn_Vc;var tn_5c=function(a) {return tn_Pc(tn_Wc,a)>=0};var tn_6c,tn_7c=function(a,b) {tn_qa(a,b)},tn_8c=function(a) {var b=a[tn_Oa];return b&&typeof b[tn_r]=="function "?b[tn_r](""):[]},tn_9c=function(a) {var b=tn_8c(a),c=1;for(var d=1;d<arguments[tn_n];d++)if(tn_fc(b,arguments[d]))c&=0;else{b[tn_m](arguments[d]);c&=1}tn_qa(a,b[tn_K](""));return tn_aa(c)},tn_$c=function(a) {var b=tn_8c(a),c=tn_nc(arguments,1),d=0;for(var e=0;e<b[tn_n];e++)if(tn_fc(c,b[e])) {tn_hc(b,e--,1);d++}tn_qa(a,b[tn_K](""));return d==c[tn_n]};var tn_ad=function(a,b,c) {c?tn_9c(a,b):tn_$c(a,b)};var tn_cd=function() {tn_6c||(tn_6c=new tn_bd);return tn_6c},tn_ed=function(a) {return a?new tn_bd(tn_dd(a)):tn_cd()};var tn_fd=function(a) {return tn_N(a)?tn_ga[tn_Ya](a):a},tn_R=tn_fd,tn_gd=function(a,b,c) {return tn_cd().hf(a,b,c)},tn_hd=tn_gd,tn_jd=function(a,b) {tn_qc(b,function(c,d) {if(d=="style")a[tn_w].cssText=c;else if(d=="class")tn_qa(a,c);else if(d=="for")a.htmlFor=c;else if(d in tn_id)a[tn_wb](tn_id[d],c);else a[d]=c})},tn_id={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",rowspan:"rowSpan",valign:"vAlign",height:"height",width:"width",usemap:"useMap",frameborder:"frameBorder"},tn_kd=function(a) {var b=a||tn_Ub||tn_f,c=b[tn_Wa];if(tn_Q&&!tn_5c("500")&&!tn_4c) {if(typeof b.innerHeight=="undefined")b=tn_f;var d=b.innerHeight,e=b[tn_Wa][tn_Qb].scrollHeight;if(b==b.top)if(e<d)d-=15;return new tn_pc(b.innerWidth,d)}var f=tn_ed(c),g=f.Td()=="CSS1Compat"&&(!tn_2c||tn_2c&&tn_5c("9.50"))?c[tn_Qb]:c[tn_bb];return new tn_pc(g.clientWidth,g.clientHeight)},tn_ld=function(a) {return tn_ed(a).Xd()},tn_md=function() {var a=tn_cd();return a.d[tn_E](a,arguments)},tn_nd=function(a,b) {a[tn_l](b)},tn_od=function(a) {var b;while(b=a[tn_B])a[tn_fb](b)},tn_pd=function(a,b) {b[tn_H]&&b[tn_H][tn_7a](a,b)},tn_qd=function(a,b) {b[tn_H]&&b[tn_H][tn_7a](a,b[tn_I])},tn_rd=function(a) {return a&&a[tn_H]?a[tn_H][tn_fb](a):tn_b},tn_sd=function(a,b) {var c=b[tn_H];c&&c.replaceChild(a,b)},tn_ud=function(a) {return tn_td(a[tn_B],tn_c)},tn_td=function(a,b) {while(a&&a[tn_q]!=1)a=b?a[tn_I]:a[tn_Ia];return a};var tn_vd=tn_Q&&tn_Pc(tn_Wc,"521")<=0,tn_wd=function(a,b) {if(typeof a[tn_Bb]!="undefined"&&!tn_vd&&b[tn_q]==1)return a==b||a[tn_Bb](b);if(typeof a.compareDocumentPosition!="undefined")return a==b||tn_aa(a.compareDocumentPosition(b)&16);while(b&&a!=b)b=b[tn_H];return b==a},tn_dd=function(a) {return a[tn_q]==9?a:a[tn_eb]||a[tn_Wa]},tn_xd=function(a) {var b;b=tn_Q?a[tn_Wa]||a[tn_Jb][tn_Wa]:a.contentDocument||a[tn_Jb][tn_Wa];return b},tn_yd=function(a,b) {if("textContent"in a)a.textContent=b;else if(a[tn_B]&&a[tn_B][tn_q]==3) {while(a[tn_hb]!=a[tn_B])a[tn_fb](a[tn_hb]);a[tn_B].data=b}else{tn_od(a);var c=tn_dd(a);a[tn_l](c[tn_2a](b))}},tn_zd={SCRIPT:1,STYLE:1,HEAD:1,IFRAME:1,OBJECT:1},tn_Ad={IMG:"",BR:"\n"},tn_Bd=function(a) {var b=a.getAttributeNode("tabindex");if(b&&b.specified) {var c=a.tabIndex;return typeof c=="number"&&c>=0}return tn_a},tn_Cd=function(a,b) {if(b)a.tabIndex=0;else a[tn_Eb]("tabIndex")},tn_Ed=function(a) {var b;if(tn_P&&"innerText"in a)b=tn_Cc(a.innerText);else{var c=[];tn_Dd(a,c,tn_c);b=c[tn_K]("")}b=b[tn_p](/\xAD/g,"");b=b[tn_p](/ +/g,"");if(b!="")b=b[tn_p](/^\s*/,"");return b},tn_Dd=function(a,b,c) {if(!(a[tn_x]in tn_zd))if(a[tn_q]==3)c?b[tn_m](tn_da(a[tn_L])[tn_p](/(\r\n|\r|\n)/g,"")):b[tn_m](a[tn_L]);else if(a[tn_x]in tn_Ad)b[tn_m](tn_Ad[a[tn_x]]);else{var d=a[tn_B];while(d) {tn_Dd(d,b,c);d=d[tn_I]}}},tn_Fd=function(a) {if(a&&typeof a[tn_n]=="number")if(tn_4b(a))return typeof a.item=="function "||typeof a.item=="string";else if(tn_3b(a))return typeof a.item=="function ";return tn_a},tn_bd=function(a) {this.R=a||tn_Ub[tn_Wa]||tn_ga};tn_bd[tn_].c=function(a) {return tn_N(a)?this.R[tn_Ya](a):a};tn_bd[tn_].hf=function(a,b,c) {var d=c||this.R,e=a&&a!="*"?a[tn_Ob]():"";if(d.querySelectorAll&&(e||b)&&(!tn_Q||this.Td()=="CSS1Compat"||tn_5c("528"))) {var f=e+(b?"."+b:"");return d.querySelectorAll(f)}if(b&&d.getElementsByClassName) {var g=d.getElementsByClassName(b);if(e) {var i=[];for(var j=0,k;k=g[j];j++)e==k[tn_x][tn_Ob]()&&i[tn_m](k);return i}else return g}var g=d[tn_Nb](e||"*");if(b) {var i=[];for(var j=0,k;k=g[j];j++) {var l=k[tn_Oa];typeof l[tn_r]=="function "&&tn_fc(l[tn_r](""),b)&&i[tn_m](k)}return i}else return g};tn_bd[tn_].d=function(a,b) {if(tn_P&&b&&b[tn_Gb])a="<"+a+' name="'+tn_Nc(b[tn_Gb])+'">';var c=this[tn_rb](a);b&&tn_jd(c,b);if(arguments[tn_n]>2) {function d(g) {if(g)this[tn_l](c,tn_N(g)?this[tn_2a](g):g)}for(var e=2;e<arguments[tn_n];e++) {var f=arguments[e];tn_2b(f)&&!(tn_4b(f)&&f[tn_q]>0)?tn_bc(tn_Fd(f)?tn_kc(f):f,d,this):d[tn_z](this,f)}}return c};tn_bd[tn_].createElement=function(a) {return this.R[tn_rb](a)};tn_bd[tn_].createTextNode=function(a) {return this.R[tn_2a](a)};tn_bd[tn_].Td=function() {if(this.R[tn_ub])return this.R[tn_ub];if(tn_Q) {var a=this.d("div",{style:"position:absolute;width:0;height:0;width:1"}),b=a[tn_w][tn_o]=="1px"?"BackCompat":"CSS1Compat";return this.R.compatMode=b}return"BackCompat"};tn_bd[tn_].Xd=function() {var a=this.R;if(a.parentWindow)return a.parentWindow;if(tn_Q&&!tn_5c("500")&&!tn_4c) {var b=a[tn_rb]("script");tn_h(b,"document.parentWindow=window");var c=a[tn_Qb];c[tn_l](b);c[tn_fb](b);return a.parentWindow}return a[tn_Db]};tn_bd[tn_].Ud=function() {var a=this.R,b,c;if(!tn_Q&&a[tn_ub]=="CSS1Compat") {b=a[tn_Qb][tn_tb];c=a[tn_Qb][tn_Ha]}else{b=a[tn_bb][tn_tb];c=a[tn_bb][tn_Ha]}return new tn_oc(b,c)};tn_bd[tn_].appendChild=tn_nd;tn_bd[tn_].Vd=tn_ud;tn_bd[tn_].contains=tn_wd;if("StopIteration"in tn_Ub)var tn_Gd=tn_Ub.StopIteration;else tn_Gd=Error("StopIteration");var tn_Hd=function() {};tn_Hd[tn_].next=function() {tn_d(tn_Gd)};tn_Hd[tn_].__iterator__=function() {return this};var tn_Id=function(a) {if(typeof a.Ha=="function ")return a.Ha();if(tn_N(a))return a[tn_r]("");if(tn_2b(a)) {var b=[],c=a[tn_n];for(var d=0;d<c;d++)b[tn_m](a[d]);return b}return tn_rc(a)},tn_Jd=function(a) {if(typeof a.Ra=="function ")return a.Ra();if(typeof a.Ha=="function ")return tn_e;if(tn_2b(a)||tn_N(a)) {var b=[],c=a[tn_n];for(var d=0;d<c;d++)b[tn_m](d);return b}return tn_sc(a)},tn_Kd=function(a,b,c) {if(typeof a[tn_sb]=="function ")a[tn_sb](b,c);else if(tn_2b(a)||tn_N(a))tn_bc(a,b,c);else{var d=tn_Jd(a),e=tn_Id(a),f=e[tn_n];for(var g=0;g<f;g++)b[tn_z](c,e[g],d&&d[g],a)}};var tn_Ld=function(a) {this.oa={};this.k=[];var b=arguments[tn_n];if(b>1) {if(b%2)tn_d(Error("Unevennumberofarguments"));for(var c=0;c<b;c+=2)this.set(arguments[c],arguments[c+1])}else a&&this.Re(a)};tn_Ld[tn_].u=0;tn_Ld[tn_].$b=0;tn_Ld[tn_].Ha=function() {this.ec();var a=[];for(var b=0;b<this.k[tn_n];b++) {var c=this.k[b];a[tn_m](this.oa[c])}return a};tn_Ld[tn_].Ra=function() {this.ec();return this.k[tn__a]()};tn_Ld[tn_].ua=function(a) {return tn_Md(this.oa,a)};tn_Aa(tn_Ld[tn_],function() {this.oa={};tn_na(this.k,0);this.u=0;this.$b=0});tn_Ld[tn_].remove=function(a) {if(tn_Md(this.oa,a)) {delete this.oa[a];this.u--;this.$b++;this.k[tn_n]>2*this.u&&this.ec();return tn_c}return tn_a};tn_Ld[tn_].ec=function() {if(this.u!=this.k[tn_n]) {var a=0,b=0;while(a<this.k[tn_n]) {var c=this.k[a];if(tn_Md(this.oa,c))this.k[b++]=c;a++}tn_na(this.k,b)}if(this.u!=this.k[tn_n]) {var d={},a=0,b=0;while(a<this.k[tn_n]) {var c=this.k[a];if(!tn_Md(d,c)) {this.k[b++]=c;d[c]=1}a++}tn_na(this.k,b)}};tn_Ld[tn_].get=function(a,b) {if(tn_Md(this.oa,a))return this.oa[a];return b};tn_Ld[tn_].set=function(a,b) {if(!tn_Md(this.oa,a)) {this.u++;this.k[tn_m](a);this.$b++}this.oa[a]=b};tn_Ld[tn_].Re=function(a) {var b,c;if(a instanceof tn_Ld) {b=a.Ra();c=a.Ha()}else{b=tn_sc(a);c=tn_rc(a)}for(var d=0;d<b[tn_n];d++)this.set(b[d],c[d])};tn_Ld[tn_].clone=function() {return new tn_Ld(this)};tn_Ld[tn_].__iterator__=function(a) {this.ec();var b=0,c=this.k,d=this.oa,e=this.$b,f=this,g=new tn_Hd;g.next=function() {while(tn_c) {if(e!=f.$b)tn_d(Error("Themaphaschangedsincetheiteratorwascreated"));if(b>=c[tn_n])tn_d(tn_Gd);var i=c[b++];return a?i:d[i]}};return g};if(tn_fa[tn_][tn_$a])var tn_Md=function(a,b) {return tn_fa[tn_][tn_$a][tn_z](a,b)};else tn_Md=function(a,b) {return b in a&&a[b]!==tn_fa[tn_][b]};var tn_Pd=function(a,b) {try{var c=tn_Nd(a),d="Message:"+tn_Nc(c[tn_9a])+'\nUrl: <a href="view-source:'+c[tn_Hb]+'" target="_new">'+c[tn_Hb]+"</a>\nLine:"+c.lineNumber+"\n\nBrowserstack:\n"+tn_Nc(c.stack+"->")+"[end]\n\nJSstacktraversal:\n"+tn_Nc(tn_Od(b)+"->");return d}catch(e) {return"Exceptiontryingtoexposeexception!Youwin,welose."+e}},tn_Nd=function(a) {var b=tn_Vb("window.location.href");return typeof a=="string"?{message:a,name:"Unknownerror",lineNumber:"Notavailable",fileName:b,stack:"Notavailable"}:!a.lineNumber||!a[tn_Hb]||!a.stack?{message:a[tn_9a],name:a[tn_Gb],lineNumber:a.lineNumber||a.line||"Notavailable",fileName:a[tn_Hb]||a.sourceURL||b,stack:a.stack||"Notavailable"}:a},tn_Od=function(a) {return tn_Qd(a||arguments[tn_4a].caller,[])},tn_Qd=function(a,b) {var c=[];if(tn_fc(b,a))c[tn_m]("[...circularreference...]");else if(a&&b[tn_n]<50) {c[tn_m](tn_Rd(a)+"(");var d=a.arguments;for(var e=0;e<d[tn_n];e++) {e>0&&c[tn_m](",");var f,g=d[e];switch(typeof g) {case "object":f=g?"object":"null";break;case "string":f=g;break;case "number":f=tn_da(g);break;case "boolean":f=g?"true":"false";break;case "function ":f=tn_Rd(g);f=f?f:"[fn]";break;case "undefined":default:f=typeof g;break}if(f[tn_n]>40)f=f[tn_Rb](0,40)+"...";c[tn_m](f)}b[tn_m](a);c[tn_m](")\n");try{c[tn_m](tn_Qd(a.caller,b))}catch(i) {c[tn_m]("[exceptiontryingtogetcaller]\n")}}else a?c[tn_m]("[...longstack...]"):c[tn_m]("[end]");return c[tn_K]("")},tn_Rd=function(a) {var b=tn_da(a);if(!tn_Sd[b]) {var c=/function ([^\(]+)/[tn_Qa](b);if(c) {var d=c[1];tn_Sd[b]=d}else tn_Sd[b]="[Anonymous]"}return tn_Sd[b]},tn_Sd={};var tn_Ud=function(a,b,c,d,e) {this.Gg=typeof e=="number"?e:tn_Td++;this.Hg=d||tn_$b();this.sb=a;this.Fg=b;this.Eg=c};tn_Ud[tn_].ef=tn_b;tn_Ud[tn_].df=tn_b;var tn_Td=0;tn_Ud[tn_].bg=function(a) {this.ef=a};tn_Ud[tn_].cg=function(a) {this.df=a};tn_Ud[tn_].qd=function(a) {this.sb=a};var tn_Vd=function(a) {this.Cg=a;this.C=tn_b;this.F={};this.xf=[]};tn_Vd[tn_].sb=tn_b;var tn_Wd=function(a,b) {tn_Ca(this,a);tn_i(this,b)};tn_ma(tn_Wd[tn_],function() {return this[tn_Gb]});new tn_Wd("OFF",Infinity);new tn_Wd("SHOUT",1200);new tn_Wd("SEVERE",1000);var tn_Xd=new tn_Wd("WARNING",900);new tn_Wd("INFO",800);var tn_Yd=new tn_Wd("CONFIG",700),tn_Zd=new tn_Wd("FINE",500);new tn_Wd("FINER",400);new tn_Wd("FINEST",300);new tn_Wd("ALL",0);tn_Vd[tn_].qd=function(a) {this.sb=a};tn_Vd[tn_].fd=function(a) {if(this.sb)return a[tn_s]>=this.sb[tn_s];if(this.C)return this.C.fd(a);return tn_a};tn_Vd[tn_].log=function(a,b,c) {this.fd(a)&&this.Mf(this.jf(a,b,c))};tn_Vd[tn_].jf=function(a,b,c) {var d=new tn_Ud(a,tn_da(b),this.Cg);if(c) {d.bg(c);d.cg(tn_Pd(c,arguments[tn_4a].caller))}return d};tn_Vd[tn_].warning=function(a,b) {this.log(tn_Xd,a,b)};tn_Vd[tn_].fine=function(a,b) {this.log(tn_Zd,a,b)};tn_Vd[tn_].Mf=function(a) {if(this.fd(a.sb)) {var b=this;while(b) {b.Ye(a);b=b.C}}};tn_Vd[tn_].Ye=function(a) {for(var b=0;b<this.xf[tn_n];b++)this.xf[b](a)};tn_Vd[tn_].hg=function(a) {this.C=a};tn_Vd[tn_].Se=function(a,b) {this.F[a]=b};var tn__d={},tn_0d=tn_b,tn_1d=function() {if(!tn_0d) {tn_0d=new tn_Vd("");tn__d[""]=tn_0d;tn_0d.qd(tn_Yd)}},tn_3d=function(a) {tn_1d();return a in tn__d?tn__d[a]:tn_2d(a)},tn_2d=function(a) {var b=new tn_Vd(a),c=a[tn_r]("."),d=c[c[tn_n]-1];tn_na(c,c[tn_n]-1);var e=c[tn_K]("."),f=tn_3d(e);f.Se(d,b);b.hg(f);tn__d[a]=b;return b};var tn_4d=function() {};tn_4d[tn_].Oc=tn_a;tn_4d[tn_].dispose=function() {if(!this.Oc) {this.b();this.Oc=tn_c}};tn_4d[tn_].b=function() {};var tn_5d=function(a,b) {tn_za(this,a);tn_ta(this,b);tn_sa(this,this[tn_y])};tn_O(tn_5d,tn_4d);tn_5d[tn_].b=function() {delete this[tn_D];delete this[tn_y];delete this.currentTarget};tn_5d[tn_].Ja=tn_a;tn_5d[tn_].vb=tn_c;tn_5d[tn_].stopPropagation=function() {this.Ja=tn_c};tn_5d[tn_].preventDefault=function() {this.vb=tn_a};var tn_6d=function(a,b) {tn_4d[tn_z](this);this.Nf=b;this.gb=[];this.$e(a)};tn_O(tn_6d,tn_4d);tn_6d[tn_].Jc=tn_b;tn_6d[tn_].Nc=tn_b;tn_6d[tn_].Vb=function(a) {this.Jc=a};tn_6d[tn_].Ae=function(a) {this.Nc=a};tn_6d[tn_].wa=function() {if(this.gb[tn_n])return this.gb.pop();return this.Kd()};tn_6d[tn_].Xa=function(a) {this.gb[tn_n]<this.Nf?this.gb[tn_m](a):this.Nd(a)};tn_6d[tn_].$e=function(a) {if(a>this.Nf)tn_d(Error("[goog.structs.SimplePool]Initialcannotbegreaterthanmax"));for(var b=0;b<a;b++)this.gb[tn_m](this.Kd())};tn_6d[tn_].Kd=function() {return this.Jc?this.Jc():{}};tn_6d[tn_].Nd=function(a) {if(this.Nc)this.Nc(a);else if(tn_3b(a.dispose))a.dispose();else for(var b in a)delete a[b]};tn_6d[tn_].b=function() {tn_6d.a.b[tn_z](this);var a=this.gb;while(a[tn_n])this.Nd(a.pop());delete this.gb};var tn_S=function(a,b) {a&&this.init(a,b)};tn_O(tn_S,tn_5d);var tn_7d=[1,4,2];tn_za(tn_S[tn_],tn_b);tn_ta(tn_S[tn_],tn_b);tn_S[tn_].relatedTarget=tn_b;tn_S[tn_].offsetX=0;tn_S[tn_].offsetY=0;tn_S[tn_].clientX=0;tn_S[tn_].clientY=0;tn_S[tn_].screenX=0;tn_S[tn_].screenY=0;tn_S[tn_].button=0;tn_va(tn_S[tn_],0);tn_S[tn_].charCode=0;tn_S[tn_].ctrlKey=tn_a;tn_S[tn_].altKey=tn_a;tn_S[tn_].shiftKey=tn_a;tn_S[tn_].metaKey=tn_a;tn_S[tn_].M=tn_b;tn_S[tn_].init=function(a,b) {tn_za(this,a[tn_D]);tn_ta(this,a[tn_y]||a.srcElement);tn_sa(this,b);this.relatedTarget=a[tn_Na]?a[tn_Na]:this[tn_D]==tn_8d?a.fromElement:this[tn_D]==tn_9d?a.toElement:tn_b;this.offsetX=typeof a.layerX=="number"?a.layerX:a.offsetX;this.offsetY=typeof a.layerY=="number"?a.layerY:a.offsetY;this.clientX=typeof a.clientX=="number"?a.clientX:a.pageX;this.clientY=typeof a.clientY=="number"?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||0;this.button=a[tn_8a];tn_va(this,a[tn_A]||0);this.charCode=a[tn_mb]||(this[tn_D]==tn_$d?a[tn_A]:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.M=a;delete this.vb;delete this.Ja};tn_S[tn_].ce=function(a) {return tn_P?this[tn_D]=="click"?a==0:!!(this.M[tn_8a]&tn_7d[a]):tn_Q&&!tn_5c("420")?this.M[tn_8a]==1&&a==0:this.M[tn_8a]==a};tn_S[tn_].stopPropagation=function() {this.Ja=tn_c;if(this.M[tn_3a])this.M[tn_3a]();else this.M.cancelBubble=tn_c};tn_S[tn_].preventDefault=function() {this.vb=tn_a;if(this.M[tn_6a])this.M[tn_6a]();else{this.M.returnValue=tn_a;try{tn_va(this.M,-1)}catch(a) {}}};tn_S[tn_].b=function() {tn_S.a.b[tn_z](this);this.M=tn_b};var tn_ae=function() {},tn_be=0;tn_ae[tn_].ed=tn_b;tn_ae[tn_].listener=tn_b;tn_ae[tn_].proxy=tn_b;tn_ae[tn_].src=tn_b;tn_za(tn_ae[tn_],tn_b);tn_ae[tn_].capture=tn_b;tn_ae[tn_].handler=tn_b;tn_ae[tn_].key=0;tn_ae[tn_].removed=tn_a;tn_ae[tn_].Hd=tn_a;tn_ae[tn_].init=function(a,b,c,d,e,f) {if(tn_3b(a))this.ed=tn_c;else if(a&&a[tn_yb]&&tn_3b(a[tn_yb]))this.ed=tn_a;else tn_d(Error("Invalidlistenerargument"));this.listener=a;this.proxy=b;this.src=c;tn_za(this,d);this.capture=!!e;this.handler=f;this.Hd=tn_a;this.key=++tn_be;this.removed=tn_a};tn_ya(tn_ae[tn_],function(a) {if(this.ed)return this.listener[tn_z](this.handler||this.src,a);return this.listener[tn_yb][tn_z](this.listener,a)});var tn_ce={},tn_de={},tn_ee={},tn_fe=new tn_6d(0,600);tn_fe.Vb(function() {return{u:0}});tn_fe.Ae(function(a) {a.u=0});var tn_ge=new tn_6d(0,600);tn_ge.Vb(function() {return[]});tn_ge.Ae(function(a) {tn_na(a,0);delete a.wc;delete a.me});var tn_he=new tn_6d(0,600);tn_he.Vb(function() {var a=function(b) {return tn_ie[tn_z](a.src,a.key,b)};return a});var tn_je=function() {return new tn_ae},tn_ke=new tn_6d(0,600);tn_ke.Vb(tn_je);var tn_le=function() {return new tn_S},tn_me=function() {var a=tn_b;if(tn_P) {a=new tn_6d(0,600);a.Vb(tn_le)}return a},tn_ne=tn_me(),tn_oe="on",tn_pe={},tn_T=function(a,b,c,d,e) {if(b)if(tn_M(b)) {for(var f=0;f<b[tn_n];f++)tn_T(a,b[f],c,d,e);return tn_b}else{var g=!!d,i=tn_de;b in i||(i[b]=tn_fe.wa());i=i[b];if(!(g in i)) {i[g]=tn_fe.wa();i.u++}i=i[g];var j=tn_7b(a),k,l;if(i[j]) {k=i[j];for(var f=0;f<k[tn_n];f++) {l=k[f];if(l.listener==c&&l.handler==e) {if(l.removed)break;return k[f].key}}}else{k=i[j]=tn_ge.wa();i.u++}var m=tn_he.wa();m.src=a;l=tn_ke.wa();l.init(c,m,a,b,g,e);var n=l.key;m.key=n;k[tn_m](l);tn_ce[n]=l;tn_ee[j]||(tn_ee[j]=tn_ge.wa());tn_ee[j][tn_m](l);if(a.addEventListener) {if(a==tn_Ub||!a.Ld)a.addEventListener(b,m,g)}else a.attachEvent(tn_qe(b),m);return n}else tn_d(Error("Invalideventtype"))},tn_re=function(a,b,c,d,e) {if(tn_M(b)) {for(var f=0;f<b[tn_n];f++)tn_re(a,b[f],c,d,e);return tn_b}var g=!!d,i=tn_se(a,b,g);if(!i)return tn_a;for(var f=0;f<i[tn_n];f++)if(i[f].listener==c&&i[f].capture==g&&i[f].handler==e)return tn_te(i[f].key);return tn_a},tn_te=function(a) {if(!tn_ce[a])return tn_a;var b=tn_ce[a];if(b.removed)return tn_a;var c=b.src,d=b[tn_D],e=b.proxy,f=b.capture;if(c.removeEventListener) {if(c==tn_Ub||!c.Ld)c.removeEventListener(d,e,f)}else c.detachEvent&&c.detachEvent(tn_qe(d),e);var g=tn_7b(c),i=tn_de[d][f][g];if(tn_ee[g]) {var j=tn_ee[g];tn_jc(j,b);j[tn_n]==0&&delete tn_ee[g]}b.removed=tn_c;i.me=tn_c;tn_ue(d,f,g,i);delete tn_ce[a];return tn_c},tn_ue=function(a,b,c,d) {if(!d.wc)if(d.me) {for(var e=0,f=0;e<d[tn_n];e++) {if(d[e].removed) {tn_ke.Xa(d[e]);continue}if(e!=f)d[f]=d[e];f++}tn_na(d,f);d.me=tn_a;if(f==0) {tn_ge.Xa(d);delete tn_de[a][b][c];tn_de[a][b].u--;if(tn_de[a][b].u==0) {tn_fe.Xa(tn_de[a][b]);delete tn_de[a][b];tn_de[a].u--}if(tn_de[a].u==0) {tn_fe.Xa(tn_de[a]);delete tn_de[a]}}}},tn_ve=function(a,b,c) {var d=0,e=a==tn_b,f=b==tn_b,g=c==tn_b;c=!!c;if(e)tn_qc(tn_ee,function(m) {for(var n=m[tn_n]-1;n>=0;n--) {var o=m[n];if((f||b==o[tn_D])&&(g||c==o.capture)) {tn_te(o.key);d++}}});else{var i=tn_7b(a);if(tn_ee[i]) {var j=tn_ee[i];for(var k=j[tn_n]-1;k>=0;k--) {var l=j[k];if((f||b==l[tn_D])&&(g||c==l.capture)) {tn_te(l.key);d++}}}}return d},tn_se=function(a,b,c) {var d=tn_de;if(b in d) {d=d[b];if(c in d) {d=d[c];var e=tn_7b(a);if(d[e])return d[e]}}return tn_b},tn_we=function(a,b,c,d,e) {var f=!!d,g=tn_se(a,b,f);if(g)for(var i=0;i<g[tn_n];i++)if(g[i].listener==c&&g[i].capture==f&&g[i].handler==e)return g[i];return tn_b},tn_xe="mousedown",tn_ye="mouseup",tn_8d="mouseover",tn_9d="mouseout",tn_$d="keypress",tn_qe=function(a) {if(a in tn_pe)return tn_pe[a];return tn_pe[a]=tn_oe+a},tn_Ae=function(a,b,c,d) {var e=1,f=tn_de;if(b in f) {f=f[b];if(c in f) {f=f[c];var g=tn_7b(a);if(f[g]) {var i=f[g];if(i.wc)i.wc++;else i.wc=1;try{var j=i[tn_n];for(var k=0;k<j;k++) {var l=i[k];if(l&&!l.removed)e&=tn_ze(l,d)!==tn_a}}finally{i.wc--;tn_ue(b,c,g,i)}}}}return tn_aa(e)},tn_ze=function(a,b) {var c=a[tn_yb](b);a.Hd&&tn_te(a.key);return c},tn_Be=function(a,b) {if(tn_N(b))b=new tn_5d(b,a);else if(b instanceof tn_5d)tn_ta(b,b[tn_y]||a);else{var c=b;b=new tn_5d(b[tn_D],a);tn_zc(b,c)}var d=1,e,f=b[tn_D],g=tn_de;if(!(f in g))return tn_c;g=g[f];var i=tn_c in g,j=tn_a in g;if(i) {e=[];for(var k=a;k;k=k.jc())e[tn_m](k);for(var l=e[tn_n]-1;!b.Ja&&l>=0;l--) {tn_sa(b,e[l]);d&=tn_Ae(e[l],b[tn_D],tn_c,b)&&b.vb!=tn_a}}if(j)if(i)for(var l=0;!b.Ja&&l<e[tn_n];l++) {tn_sa(b,e[l]);d&=tn_Ae(e[l],b[tn_D],tn_a,b)&&b.vb!=tn_a}else for(var m=a;!b.Ja&&m;m=m.jc()) {tn_sa(b,m);d&=tn_Ae(m,b[tn_D],tn_a,b)&&b.vb!=tn_a}return tn_aa(d)},tn_ie=function(a,b) {if(!tn_ce[a])return tn_c;var c=tn_ce[a],d=c[tn_D],e=tn_de;if(!(d in e))return tn_c;e=e[d];var f;if(tn_P) {var g=b||tn_Vb("window.event"),i=tn_c in e;if(i) {if(g[tn_A]<0||g.returnValue!=tn_e)return tn_c;tn_Ce(g)}tn_7b(c.src);var j=tn_ne.wa();j.init(g,this);f=tn_c;try{if(i) {var k=tn_ge.wa();for(var l=j.currentTarget;l;l=l[tn_H])k[tn_m](l);for(var m=k[tn_n]-1;!j.Ja&&m>=0;m--) {tn_sa(j,k[m]);f&=tn_Ae(k[m],d,tn_c,j)}for(var m=0;!j.Ja&&m<k[tn_n];m++) {tn_sa(j,k[m]);f&=tn_Ae(k[m],d,tn_a,j)}}else f=tn_ze(c,j)}finally{if(k) {tn_na(k,0);tn_ge.Xa(k)}j.dispose();tn_ne.Xa(j)}return f}var n=new tn_S(b,this);try{f=tn_ze(c,n)}finally{n.dispose()}return f},tn_Ce=function(a) {var b=tn_a;if(a[tn_A]==0)try{tn_va(a,-1);return}catch(c) {b=tn_c}if(b||a.returnValue==tn_e)a.returnValue=tn_c};var tn_U=function() {};tn_O(tn_U,tn_4d);tn_U[tn_].Ld=tn_c;tn_U[tn_].pe=tn_b;tn_U[tn_].jc=function() {return this.pe};tn_U[tn_].addEventListener=function(a,b,c,d) {tn_T(this,a,b,c,d)};tn_U[tn_].removeEventListener=function(a,b,c,d) {tn_re(this,a,b,c,d)};tn_U[tn_].dispatchEvent=function(a) {return tn_Be(this,a)};tn_U[tn_].b=function() {tn_U.a.b[tn_z](this);tn_ve(this);this.pe=tn_b};var tn_De=function(a) {return eval("("+a+")")};var tn_Fe=function(a,b) {tn_U[tn_z](this);this.tc=a||1;this.Ec=b||tn_Ee;this.Gd=tn_8b(this.pg,this);this.ke=tn_$b()};tn_O(tn_Fe,tn_U);tn_Fe[tn_].enabled=tn_a;var tn_Ee=tn_Ub.window,tn_Ge=0.8;tn_Fe[tn_].D=tn_b;tn_Fe[tn_].setInterval=function(a) {this.tc=a;if(this.D&&this.enabled) {this[tn_Ja]();this[tn_ob]()}else this.D&&this[tn_Ja]()};tn_Fe[tn_].pg=function() {if(this.enabled) {var a=tn_$b()-this.ke;if(a>0&&a<this.tc*tn_Ge) {this.D=this.Ec[tn_Va](this.Gd,this.tc-a);return}this.cf();if(this.enabled) {this.D=this.Ec[tn_Va](this.Gd,this.tc);this.ke=tn_$b()}}};tn_Fe[tn_].cf=function() {this[tn_v]("tick")};tn_Fe[tn_].start=function() {this.enabled=tn_c;if(!this.D) {this.D=this.Ec[tn_Va](this.Gd,this.tc);this.ke=tn_$b()}};tn_Fe[tn_].stop=function() {this.enabled=tn_a;if(this.D) {this.Ec[tn_Pa](this.D);this.D=tn_b}};tn_Fe[tn_].b=function() {tn_Fe.a.b[tn_z](this);this[tn_Ja]();delete this.Ec};var tn_He=function(a,b,c) {if(tn_3b(a)) {if(c)a=tn_8b(a,c)}else if(a&&typeof a[tn_yb]=="function ")a=tn_8b(a[tn_yb],a);else tn_d(Error("Invalidlistenerargument"));return tn_Ee[tn_Va](a,b||0)};var tn_Ie="complete";var tn_Ke=function() {return tn_Je()};var tn_Je=tn_b,tn_Le=tn_b,tn_Me=tn_b,tn_Ne=function(a,b) {tn_Je=a;tn_Le=b;tn_Me=tn_b},tn_Pe=function() {var a=tn_Oe();return a?new ActiveXObject(a):new XMLHttpRequest},tn_Qe=function() {var a=tn_Oe(),b={};if(a) {b[0]=tn_c;b[1]=tn_c}return b};tn_Ne(tn_Pe,tn_Qe);var tn_Re=tn_b,tn_Oe=function() {if(!tn_Re&&typeof XMLHttpRequest=="undefined"&&typeof ActiveXObject!="undefined") {var a=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"];for(var b=0;b<a[tn_n];b++) {var c=a[b];try{new ActiveXObject(c);tn_Re=c;return c}catch(d) {}}tn_d(Error("CouldnotcreateActiveXObject.ActiveXmightbedisabled,orMSXMLmightnotbeinstalled"))}return tn_Re};var tn_V=function() {tn_U[tn_z](this);this.headers=new tn_Ld};tn_O(tn_V,tn_U);tn_V[tn_].ga=tn_3d("goog.net.XhrIo");var tn_Se=[],tn_Ue=function(a,b,c,d,e,f) {var g=new tn_V;tn_Se[tn_m](g);b&&tn_T(g,tn_Ie,b);tn_T(g,"ready",tn_9b(tn_Te,g));f&&g.jg(f);g.send(a,c,d,e)},tn_Te=function(a) {a.dispose();tn_jc(tn_Se,a)};tn_V[tn_].Da=tn_a;tn_V[tn_].s=tn_b;tn_V[tn_].Fc=tn_b;tn_V[tn_].je="";tn_V[tn_].ge="";tn_V[tn_].Nb=0;tn_V[tn_].Ob="";tn_V[tn_].Qc=tn_a;tn_V[tn_].rc=tn_a;tn_V[tn_].cd=tn_a;tn_V[tn_].Ta=tn_a;tn_V[tn_].Xb=0;tn_V[tn_].cb=tn_b;tn_V[tn_].jg=function(a) {this.Xb=tn_g.max(0,a)};tn_V[tn_].send=function(a,b,c,d) {if(this.Da)tn_d(Error("[goog.net.XhrIo]Objectisactivewithanotherrequest"));var e=b||"GET";this.je=a;this.Ob="";this.Nb=0;this.ge=e;this.Qc=tn_a;this.Da=tn_c;this.s=new tn_Ke;this.Fc=tn_Me||(tn_Me=tn_Le());this.s.onreadystatechange=tn_8b(this.oe,this);try{this.ga.fine(this.va("OpeningXhr"));this.cd=tn_c;this.s.open(e,a,tn_c);this.cd=tn_a}catch(f) {this.ga.fine(this.va("ErroropeningXhr:"+f[tn_9a]));this.Rd(5,f);return}var g=c?tn_da(c):"",i=this.headers.clone();d&&tn_Kd(d,function(j,k) {i.set(k,j)});e=="POST"&&!i.ua("Content-Type")&&i.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");tn_Kd(i,function(j,k) {this.s.setRequestHeader(k,j)},this);try{if(this.cb) {tn_Ee[tn_Pa](this.cb);this.cb=tn_b}if(this.Xb>0) {this.ga.fine(this.va("Willabortafter"+this.Xb+"msifincomplete"));this.cb=tn_Ee[tn_Va](tn_8b(this.qg,this),this.Xb)}this.ga.fine(this.va("Sendingrequest"));this.rc=tn_c;this.s.send(g);this.rc=tn_a}catch(f) {this.ga.fine(this.va("Senderror:"+f[tn_9a]));this.Rd(5,f)}};tn_V[tn_].dispatchEvent=function(a) {if(this.s)try{tn_V.a[tn_v][tn_z](this,a)}finally{}else tn_V.a[tn_v][tn_z](this,a)};tn_V[tn_].qg=function() {if(!(typeof tn_Tb=="undefined"))if(this.s) {this.Ob="Timedoutafter"+this.Xb+"ms,aborting";this.Nb=8;this.ga.fine(this.va(this.Ob));this[tn_v]("timeout");this[tn_Ta](8)}};tn_V[tn_].Rd=function(a,b) {this.Da=tn_a;if(this.s) {this.Ta=tn_c;this.s[tn_Ta]();this.Ta=tn_a}this.Ob=b;this.Nb=a;this.Md();this.dc()};tn_V[tn_].Md=function() {if(!this.Qc) {this.Qc=tn_c;this[tn_v](tn_Ie);this[tn_v]("error")}};tn_V[tn_].abort=function(a) {if(this.s) {this.ga.fine(this.va("Aborting"));this.Da=tn_a;this.Ta=tn_c;this.s[tn_Ta]();this.Ta=tn_a;this.Nb=a||7;this[tn_v](tn_Ie);this[tn_v]("abort");this.dc()}};tn_V[tn_].b=function() {if(this.s) {this.Da=tn_a;this.Ta=tn_c;this.s[tn_Ta]();this.Ta=tn_a;this.dc(tn_c)}tn_V.a.b[tn_z](this)};tn_V[tn_].oe=function() {!this.cd&&!this.rc&&!this.Ta?this.Qf():this.ne()};tn_V[tn_].Qf=function() {this.ne()};tn_V[tn_].ne=function() {if(!this.Da)return;if(!(typeof tn_Tb=="undefined"))if(this.Fc[1]&&this.Gb()==4&&this.lc()==2)this.ga.fine(this.va("Localrequesterrordetectedandignored"));else{if(this.rc&&this.Gb()==4) {tn_He(this.oe,0,this);return}this[tn_v]("readystatechange");if(this.If()) {this.ga.fine(this.va("Requestcomplete"));this.Da=tn_a;if(this.gd()) {this[tn_v](tn_Ie);this[tn_v]("success")}else{this.Nb=6;this.Ob=this.nf()+"["+this.lc()+"]";this.Md()}this.dc()}}};tn_V[tn_].dc=function(a) {if(this.s) {this.s.onreadystatechange=this.Fc[0]?tn_Wb:tn_b;this.s=tn_b;this.Fc=tn_b;if(this.cb) {tn_Ee[tn_Pa](this.cb);this.cb=tn_b}a||this[tn_v]("ready")}};tn_V[tn_].qb=function() {return this.Da};tn_V[tn_].If=function() {return this.Gb()==4};tn_V[tn_].gd=function() {switch(this.lc()) {case 0:case 200:case 204:case 304:return tn_c;default:return tn_a}};tn_V[tn_].Gb=function() {return this.s?this.s.readyState:0};tn_V[tn_].lc=function() {try{return this.Gb()>2?this.s.status:-1}catch(a) {this.ga.warning("Cannotgetstatus:"+a[tn_9a]);return-1}};tn_V[tn_].nf=function() {try{return this.Gb()>2?this.s.statusText:""}catch(a) {this.ga.fine("Cannotgetstatus:"+a[tn_9a]);return""}};tn_V[tn_].Wd=function() {return this.s?this.s.responseText:""};tn_V[tn_].mf=function() {return this.s?this.s.responseXML:tn_b};tn_V[tn_].va=function(a) {return a+"["+this.ge+""+this.je+""+this.lc()+"]"};var tn_Ve="A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u2c00-\ufb1c\ufdfe-\ufe6f\ufefd-\uffff",tn_We="\u0591-\u07ff\ufb1d-\ufdfd\ufe70-\ufefc",tn_Xe={ar:tn_c,fa:tn_c,he:tn_c,"// id-Arab":tn_c,iw:tn_c,ku:tn_c,ps:tn_c,sd:tn_c,ug:tn_c,ur:tn_c,yi:tn_c};var tn_Ye=new RegExp("^[^"+tn_We+"]*["+tn_Ve+"]"),tn_Ze=new RegExp("^[^"+tn_Ve+"]*["+tn_We+"]");
var tn__e=function (a) {
	tn_U[tn_z](this);
	this.m=a;
	var b=tn_P?"propertychange":tn_Q&&a[tn_Cb]=="TEXTAREA"?"keypress":"input";
	this.Bg=tn_T(this.m,b,this)
};
tn_O(tn__e,tn_U);
tn_ya(tn__e[tn_],function (a) {
	var b=a.M;
	if(b[tn_D]=="propertychange"&&b.propertyName=="value"||b[tn_D]=="input"||b[tn_D]=="keypress") {
		if(tn_P) {
			var c=b.srcElement;
			if(c!=tn_dd(c).activeElement)return
		}var d=new tn_S(b);
		tn_za(d,"input");
		try{
			this[tn_v](d)
		}finally{
			d.dispose()
		}
	}
});
tn__e[tn_].b=function () {
	tn__e.a.b[tn_z](this);
	tn_te(this.Bg);
	delete this.m
};
var tn_0e=function (a,b,c,d) {
	this.top=tn_0b(a)?tn_ea(a):tn_e;
	this.right=tn_0b(b)?tn_ea(b):tn_e;
	this.bottom=tn_0b(c)?tn_ea(c):tn_e;
	this.left=tn_0b(d)?tn_ea(d):tn_e
};
tn_0e[tn_].clone=function () {
	return new tn_0e(this.top,this[tn_Sb],this[tn_vb],this[tn_db])
};
tn_ma(tn_0e[tn_],function () {
	return "("+this.top+"t, "+this[tn_Sb]+"r, "+this[tn_vb]+"b, "+this[tn_db]+"l)"
});
tn_0e[tn_].contains=function (a) {
	return tn_1e(this,a)
};
var tn_1e=function (a,b) {
	if(!a||!b)return tn_a;
	return b.x>=a[tn_db]&&b.x<=a[tn_Sb]&&b.y>=a.top&&b.y<=a[tn_vb]
};
var tn_2e,tn_3e=function (a,b) {
	var c=tn_dd(a);
	if(c[tn_Db]&&c[tn_Db].getComputedStyle) {
		var d=c[tn_Db].getComputedStyle(a,"");
		if(d)return d[b]
	}return tn_b
};
var tn_4e=function (a,b) {
	return tn_3e(a,b)||(a.currentStyle?a.currentStyle[b]:tn_b)||a[tn_w][b]
},tn_5e=function (a) {
	return tn_4e(a,"position")
},tn_6e=function (a,b,c) {
	var d,e;
	if(binstanceoftn_oc) {
		d=b.x;
		e=b.y
	}else {
		d=b;
		e=c
	}a[tn_w].left=typeofd=="number"?tn_g[tn_Sa](d)+"px":d;
	a[tn_w].top=typeofe=="number"?tn_g[tn_Sa](e)+"px":e
},tn_7e=function (a) {
	var b;
	b=a?a[tn_q]==9?a:tn_dd(a):tn_cd().R;
	if(tn_P&&b[tn_ub]!="CSS1Compat")return b[tn_bb];
	return b[tn_Qb]
},tn_8e=function (a) {
	var b=tn_dd(a),c=tn_3c&&b[tn_jb]&&tn_5e(a)=="absolute"&&(a[tn_w].top==""||a[tn_w][tn_db]=="");
	if(typeoftn_2e=="undefined")tn_2e=tn_Tc&&!tn_5c("1.8.0.11");
	var d=new tn_oc(0,0),e=tn_7e(b);
	if(a==e)return d;
	var f=tn_b,g;
	if(a.getBoundingClientRect&&!c) {
		g=a.getBoundingClientRect();
		var i=tn_ed(b).Ud();
		d.x=g[tn_db]+i.x;
		d.y=g.top+i.y
	}else if(b[tn_jb]&&!c&&!tn_2e) {
		g=b[tn_jb](a);
		var j=b[tn_jb](e);
		d.x=g.screenX-j.screenX;
		d.y=g.screenY-j.screenY
	}else {
		f=a;
		do{
			d.x+=f.offsetLeft;
			d.y+=f[tn_Ib];
			if(f!=a) {
				d.x+=f.clientLeft||0;
				d.y+=f.clientTop||0
			}if(tn_Q&&tn_5e(f)=="fixed") {
				d.x+=b[tn_bb][tn_tb];
				d.y+=b[tn_bb][tn_Ha];
				break
			}f=f.offsetParent
		}while(f&&f!=a);
		if(tn_2c||tn_Q&&tn_5e(a)=="absolute")d.y-=b[tn_bb][tn_Ib];
		f=a.offsetParent;
		while(f&&f!=b[tn_bb]) {
			d.x-=f[tn_tb];
			if(!tn_2c||f[tn_Cb]!="TR")d.y-=f[tn_Ha];
			f=f.offsetParent
		}
	}if(tn_3c&&a.getBoundingClientRect) {
		var k=tn_5e(a);
		if(k=="static"||k=="relative") {
			d.x=tn_g[tn_Xa](d.x);
			d.y=tn_g[tn_Xa](d.y)
		}
	}return d
},tn_9e=function (a,b,c) {
	var d;
	if(binstanceoftn_pc) {
		d=b[tn_J];
		b=b[tn_o]
	}else {
		if(c==tn_e)tn_d(Error("missing height argument"));
		d=c
	}tn_ra(a[tn_w],typeofb=="number"?tn_g[tn_Sa](b)+"px":b);
	tn_k(a[tn_w],typeofd=="number"?tn_g[tn_Sa](d)+"px":d)
},tn_$e=function (a) {
	if(tn_4e(a,"display")!="none")return new tn_pc(a.offsetWidth,a[tn_Kb]);
	var b=a[tn_w],c=b.display,d=b.visibility,e=b[tn_Ka];
	tn_Ga(b,"hidden");
	tn_oa(b,"absolute");
	tn_Ea(b,"");
	var f=a.offsetWidth,g=a[tn_Kb];
	tn_Ea(b,c);
	tn_oa(b,e);
	tn_Ga(b,d);
	return new tn_pc(f,g)
},tn_af=function (a,b) {
	tn_Ea(a[tn_w],b?"":"none")
};
var tn_bf=function (a) {
	return a?tn_N(a)||a[tn_q]==3?tn_c:tn_dc(a,tn_bf):tn_a
},tn_cf=tn_3c&&!tn_5c("1.9"),tn_df=function (a) {
	return "rtl"==tn_4e(a,"direction")
},tn_ef=tn_3c?"MozUserSelect":tn_Q?"WebkitUserSelect":tn_b,tn_ff=function (a,b,c) {
	var d=!c?a[tn_Nb]("*"):tn_b,e=tn_ef;
	if(e) {
		var f=b?"none":"";
		a[tn_w][e]=f;
		if(d)for(var g=0,i;i=d[g];g++)i[tn_w][e]=f
	}else if(tn_P||tn_2c) {
		var f=b?"on":"";
		a[tn_wb]("unselectable",f);
		if(d)for(var g=0,i;i=d[g];g++)i[tn_wb]("unselectable",f)
	}
};var tn_gf=function () {
};
tn_Xb(tn_gf);
tn_gf[tn_].Of=0;
tn_gf[tn_].kf=function () {
	return ":"+(this.Of++).toString (36)
};
var tn_W=function (a) {
	tn_U[tn_z](this);
	this.q=a||tn_ed();
	this.Tb=tn_hf
};
tn_O(tn_W,tn_U);
tn_W[tn_].Ef=tn_gf.getInstance();
var tn_hf=tn_b,tn_if="highlight",tn_jf="unhighlight",tn_kf="Component already rendered",tn_lf="Unable to set parent component",tn_mf=function (a,b) {
	switch(a) {
		case 1:return b?"disable":"enable";
		case 2:return b?tn_if:tn_jf;
		case 4:return b?"activate":"deactivate";
		case 8:return b?"select":"unselect";
		case 16:return b?"check":"uncheck";
		case 32:return b?"focus":"blur";
		case 64:return b?"open":"close";
		default:
	}tn_d(Error("Invalid component state"))
};
tn_W[tn_].ob=tn_b;
tn_W[tn_].q=tn_b;
tn_W[tn_].p=tn_a;
tn_W[tn_].m=tn_b;
tn_W[tn_].Tb=tn_b;
tn_W[tn_].jd=tn_b;
tn_W[tn_].C=tn_b;
tn_W[tn_].F=tn_b;
tn_W[tn_].$=tn_b;
tn_W[tn_].Qe=tn_b;
tn_W[tn_].gc=function () {
	return this.ob||(this.ob=this.Ef.kf())
};
tn_W[tn_].Ee=function (a) {
	if(this.C&&this.C.$) {
		tn_tc(this.C.$,this.ob);
		tn_vc(this.C.$,a,this)
	}this.ob=a
};
tn_W[tn_].c=function () {
	return this.m
};
tn_W[tn_].wb=function (a) {
	this.m=a
};
tn_W[tn_].rd=function (a) {
	if(this==a)tn_d(Error(tn_lf));
	if(a&&this.C&&this.ob&&this.C.Sd(this.ob)&&this.C!=a)tn_d(Error(tn_lf));
	this.C=a
};
tn_W[tn_].jc=function () {
	return this.C
};
tn_W[tn_].d=function () {
	this.m=this.q[tn_rb]("div")
};
tn_W[tn_].render=function (a) {
	this.ue(a)
};
tn_W[tn_].ue=function (a,b) {
	if(this.p)tn_d(Error(tn_kf));
	this.m||this.d();
	a?a[tn_7a](this.m,b||tn_b):this.q.R[tn_bb][tn_l](this.m);
	if(!this.C||this.C.p)this.z()
};
tn_W[tn_].decorate=function (a) {
	if(this.p)tn_d(Error(tn_kf));
	else if(a&&this.I(a)) {
		this.Qe=tn_c;
		if(!this.q||this.q.R!=tn_dd(a))this.q=tn_ed(a);
		this.aa(a);
		this.z()
	}else tn_d(Error("Invalid element to decorate"))
};
tn_W[tn_].I=function () {
	return tn_c
};
tn_W[tn_].aa=function (a) {
	this.m=a
};
tn_W[tn_].z=function () {
	this.p=tn_c;
	this.fb(function (a) {
		!a.p&&a.c()&&a.z()
	})
};
tn_W[tn_].T=function () {
	this.fb(function (a) {
		a.p&&a.T()
	});
	this.p=tn_a
};
tn_W[tn_].b=function () {
	tn_W.a.b[tn_z](this);
	this.p&&this.T();
	this.fb(function (a) {
		a.dispose()
	});
	!this.Qe&&this.m&&tn_rd(this.m);
	this.F=tn_b;
	this.$=tn_b;
	this.m=tn_b;
	this.jd=tn_b;
	this.C=tn_b
};
tn_W[tn_].fg=function (a) {
	this.jd=a
};
tn_W[tn_].Cd=function (a,b) {
	this.Bb(a,this.Oa(),b)
};
tn_W[tn_].Bb=function (a,b,c) {
	if(a.p&&(c||!this.p))tn_d(Error(tn_kf));
	if(b<0||b>this.Oa())tn_d(Error("Child component index out of bounds"));
	if(!this.$||!this.F) {
		this.$={
		};
		this.F=[]
	}if(a.C==this) {
		tn_uc(this.$,a.gc());
		tn_jc(this.F,a)
	}else tn_vc(this.$,a.gc(),a);
	a.rd(this);
	tn_ic(this.F,a,b);
	if(a.p&&this.p&&a.C==this) {
		var d=this.n();
		d[tn_7a](a.c(),d[tn_F][b+1]||tn_b)
	}else if(c) {
		this.m||this.d();
		var e=this.hb(b+1);
		a.ue(this.n(),e?e.m:tn_b)
	}else this.p&&!a.p&&a.m&&a.z()
};
tn_W[tn_].n=function () {
	return this.m
};
tn_W[tn_].rb=function () {
	if(this.Tb==tn_b)this.Tb=tn_df(this.p?this.m:this.q.R[tn_bb]);
	return this.Tb
};
tn_W[tn_].Ca=function (a) {
	if(this.p)tn_d(Error(tn_kf));
	this.Tb=a
};
tn_W[tn_].zf=function () {
	return !!this.F&&this.F[tn_n]!=0
};
tn_W[tn_].Oa=function () {
	return this.F?this.F[tn_n]:0
};
tn_W[tn_].Sd=function (a) {
	return this.$&&a?tn_wc(this.$,a)||tn_b:tn_b
};
tn_W[tn_].hb=function (a) {
	return this.F?this.F[a]||tn_b:tn_b
};
tn_W[tn_].fb=function (a,b) {
	this.F&&tn_bc(this.F,a,b)
};
tn_W[tn_].sc=function (a) {
	return this.F&&a?tn_ac(this.F,a):-1
};
tn_W[tn_].removeChild=function (a,b) {
	if(a) {
		var c=tn_N(a)?a:a.gc();
		a=this.Sd(c);
		if(c&&a) {
			tn_tc(this.$,c);
			tn_jc(this.F,a);
			if(b) {
				a.T();
				a.m&&tn_rd(a.m)
			}a.rd(tn_b)
		}
	}if(!a)tn_d(Error("Child is not in parent component"));
	return a
};
var tn_nf=function (a) {
	tn_W[tn_z](this,a)
};
tn_O(tn_nf,tn_W);
tn_nf[tn_].pb=tn_b;
tn_nf[tn_].aa=function (a) {
	tn_nf.a.aa[tn_z](this,a);
	this.ae()
};
tn_nf[tn_].d=function () {
	this.wb(this.q.d("input",{
		type:"text"
	}));
	this.ae()
};
tn_nf[tn_].ae=function () {
	this.ld();
	this.pb=new tn__e(this.c());
	tn_T(this.pb,"input",this.ld,tn_a,this)
};
tn_nf[tn_].ld=function () {
	var a=this.c(),b=a[tn_s],c="";
	if(tn_Ze[tn_Ma](b))c="rtl";
	else if(tn_Ye[tn_Ma](b))c="ltr";
	a.dir=c
};
tn_nf[tn_].P=function (a) {
	tn_i(this.c(),a);
	this.ld()
};
tn_nf[tn_].j=function () {
	return this.c()[tn_s]
};
tn_nf[tn_].b=function () {
	if(this.pb) {
		tn_ve(this.pb);
		this.pb.dispose();
		this.pb=tn_b;
		tn_nf.a.b[tn_z](this)
	}
};
var tn_of=function (a,b,c) {
	if(!tn_P&&!(tn_Q&&tn_5c("525")))return tn_c;
	if(tn_P&&!c&&(b==17||b==18))return tn_a;
	if(a>=48&&a<=57)return tn_c;
	if(a>=96&&a<=106)return tn_c;
	if(a>=65&&a<=90)return tn_c;
	if(a==27&&tn_Q)return tn_a;
	switch(a) {
		case 13:case 27:case 32:case 63:case 107:case 109:case 110:case 111:case 186:case 189:case 187:case 188:case 190:case 191:case 192:case 222:case 219:case 220:case 221:return tn_c;
		default:return tn_a
	}
},tn_pf=function (a) {
	if(a>=48&&a<=57)return tn_c;
	if(a>=96&&a<=106)return tn_c;
	if(a>=65&&a<=90)return tn_c;
	switch(a) {
		case 32:case 63:case 107:case 109:case 110:case 111:case 186:case 189:case 187:case 188:case 190:case 191:case 192:case 222:case 219:case 220:case 221:return tn_c;
		default:return tn_a
	}
};
var tn_qf,tn_rf="activedescendant",tn_sf=function (a,b) {
	if(tn_3c||tn_qf) {
		a[tn_wb]("role",b);
		a.roleName=b
	}
},tn_tf=function (a,b,c) {
	if(tn_3c||tn_qf)a[tn_wb]("aria-"+b,c)
};
var tn_X=function () {
},tn_uf;
tn_Xb(tn_X);
tn_X[tn_].U=function () {
	return tn_e
};
tn_X[tn_].d=function (a) {
	return a.q.d("div",{
		className:this.Pa(a)[tn_K](" ")
	},a.Fa)
};
tn_X[tn_].n=function (a) {
	return a
};
tn_X[tn_].Eb=function (a,b,c) {
	var d=a.c?a.c():a;
	if(d)if(tn_P&&!tn_5c("7")) {
		var e=this.Sc(tn_8c(d),b);
		e[tn_m](b);
		var f=c?tn_9c:tn_$c;
		tn_9b(f,d)[tn_E](tn_b,e)
	}else tn_ad(d,b,c)
};
tn_X[tn_].Od=function (a,b,c) {
	this.Eb(a,b,c)
};
tn_X[tn_].I=function () {
	return tn_c
};
tn_X[tn_].decorate=function (a,b) {
	b.id&&a.Ee(b.id);
	var c=this.n(b);
	c&&c[tn_B]?a.Bc(c[tn_B][tn_I]?tn_kc(c[tn_F]):c[tn_B]):a.Bc(tn_b);
	var d=0,e=this.h(),f=this.Jb(),g=tn_a,i=tn_a,j=tn_a,k=tn_8c(b);
	tn_bc(k,function (n) {
		if(!g&&n==e) {
			g=tn_c;
			if(f==e)i=tn_c
		}else if(!i&&n==f)i=tn_c;
		else d|=this.kc(n)
	},this);
	a.He(d);
	if(!g) {
		k[tn_m](e);
		if(f==e)i=tn_c
	}i||k[tn_m](f);
	var l=a.ca;
	l&&k[tn_m][tn_E](k,l);
	if(tn_P&&!tn_5c("7")) {
		var m=this.Sc(k);
		if(m[tn_n]>0) {
			k[tn_m][tn_E](k,m);
			j=tn_c
		}
	}if(!g||!i||l||j)tn_7c(b,k[tn_K](" "));
	return b
};
tn_X[tn_].Ba=function (a) {
	a.rb()&&this.Ca(a.c(),tn_c);
	a.B()&&this.ra(a,a.r)
};
tn_X[tn_].xe=function (a) {
	if(tn_3c) {
		var b=this.U();
		b&&tn_sf(a,b)
	}
};
tn_X[tn_].Za=function (a,b) {
	tn_ff(a,!b,!tn_P&&!tn_2c)
};
tn_X[tn_].Ca=function (a,b) {
	this.Eb(a,this.Jb()+"-rtl",b)
};
tn_X[tn_].na=function (a) {
	var b;
	if(a.X(32)&&(b=a.A()))return tn_Bd(b);
	return tn_a
};
tn_X[tn_].ra=function (a,b) {
	var c;
	if(a.X(32)&&(c=a.A())) {
		if(!b&&a.de()) {
			try{
				c.blur()
			}catch(d) {
			}a.de()&&a.xa(tn_b)
		}tn_Bd(c)!=b&&tn_Cd(c,b)
	}
};
tn_X[tn_].N=function (a,b) {
	tn_af(a,b)
};
tn_X[tn_].O=function (a,b,c) {
	var d=a.c();
	if(d) {
		var e=this.ib(b);
		e&&this.Eb(a,e,c);
		this.Ad(d,b,c)
	}
};
tn_X[tn_].Ad=function (a,b,c) {
	if(tn_3c) {
		tn_uf||(tn_uf=tn_Ac(1,"disabled",4,"pressed",8,"selected",16,"checked",64,"expanded"));
		var d=tn_uf[b];
		d&&tn_tf(a,d,c)
	}
};
tn_X[tn_].ha=function (a,b) {
	var c=this.n(a);
	if(c) {
		tn_od(c);
		if(b)if(tn_N(b))tn_yd(c,b);
		else {
			function d(e) {
				if(e) {
					var f=tn_dd(c);
					c[tn_l](tn_N(e)?f[tn_2a](e):e)
				}
			}tn_M(b)?tn_bc(b,d):d(b)
		}
	}
};
tn_X[tn_].A=function (a) {
	return a.c()
};
tn_X[tn_].h=function () {
	return "goog-control"
};
tn_X[tn_].Jb=function () {
	return this.h()
};
tn_X[tn_].Pa=function (a) {
	var b=this.h(),c=[b],d=this.Jb();
	d!=b&&c[tn_m](d);
	var e=this.ff(a.Ab);
	e&&c[tn_m][tn_E](c,e);
	var f=a.ca;
	f&&c[tn_m][tn_E](c,f);
	tn_P&&!tn_5c("7")&&c[tn_m][tn_E](c,this.Sc(c));
	return c
};
tn_X[tn_].Sc=function (a,b) {
	var c=[];
	if(b)a=a[tn__a]([b]);
	tn_bc([],function (d) {
		if(tn_ec(d,tn_9b(tn_fc,a))&&(!b||tn_fc(d,b)))c[tn_m](d[tn_K]("_"))
	});
	return c
};
tn_X[tn_].ff=function (a) {
	if(a) {
		var b=[];
		for(var c=1;a;c<<=1)if(a&c) {
			b[tn_m](this.ib(c));
			a&=~c
		}return b
	}return tn_b
};
tn_X[tn_].ib=function (a) {
	this.Ic||this.Id();
	return this.Ic[a]
};
tn_X[tn_].kc=function (a) {
	this.og||this.af();
	var b=tn_ca(this.og[a],10);
	return isNaN(b)?0:b
};
tn_X[tn_].Id=function () {
	var a=this.Jb();
	this.Ic=tn_Ac(1,a+"-disabled",2,a+"-hover",4,a+"-active",8,a+"-selected",16,a+"-checked",32,a+"-focused",64,a+"-open")
};
tn_X[tn_].af=function () {
	this.Ic||this.Id();
	this.og=tn_xc(this.Ic)
};
var tn_vf=function () {
	tn_X[tn_z](this)
};
tn_O(tn_vf,tn_X);
tn_Xb(tn_vf);
tn_vf[tn_].U=function () {
	return "button"
};
tn_vf[tn_].d=function (a) {
	var b=tn_vf.a.d[tn_z](this,a),c=a.mb();
	c&&this.Cc(b,c);
	var d=a.j();
	d&&this.P(b,d);
	return b
};
tn_vf[tn_].decorate=function (a,b) {
	b=tn_vf.a.decorate[tn_z](this,a,b);
	a.mg(this.j(b));
	a.lg(this.mb(b));
	return b
};
tn_vf[tn_].j=tn_Wb;
tn_vf[tn_].P=tn_Wb;
tn_vf[tn_].mb=function (a) {
	return a.title
};
tn_vf[tn_].Cc=function (a,b) {
	if(a)a.title=b||""
};
tn_vf[tn_].h=function () {
	return "goog-button"
};
var tn_wf=function (a) {
	this.K=a
};
tn_O(tn_wf,tn_4d);
var tn_xf=new tn_6d(0,100);
tn_wf[tn_].listen=function (a,b,c,d,e) {
	if(tn_M(b)) {
		for(var f=0;f<b[tn_n];f++)this.listen(a,b[f],c,d,e);return
	}var g=tn_T(a,b,c||this,d||tn_a,e||this.K||this);this.Uf(g)
};tn_wf[tn_].Uf=function (a) {
	if(this.k)this.k[a]=tn_c;
	else if(this.Va) {
		this.k=tn_xf.wa();
		this.k[this.Va]=tn_c;
		this.Va=tn_b;
		this.k[a]=tn_c
	}else this.Va=a
};
tn_wf[tn_].unlisten=function (a,b,c,d,e) {
	if(!this.Va&&!this.k)return ;
	if(tn_M(b)) {
		for(var f=0;f<b[tn_n];f++)this.unlisten(a,b[f],c,d,e);return
	}var g=tn_we(a,b,c||this,d||tn_a,e||this.K||this);if(g) {
		var i=g.key;
		tn_te(i);
		if(this.k)tn_tc(this.k,i);
		else if(this.Va==i)this.Va=tn_b
	}
};
tn_wf[tn_].zc=function () {
	if(this.k) {
		for(var a in this.k) {
			tn_te(a);
			delete this.k[a]
		}tn_xf.Xa(this.k);
		this.k=tn_b
	}else this.Va&&tn_te(this.Va)
};
tn_wf[tn_].b=function () {
	tn_wf.a.b[tn_z](this);
	this.zc()
};
tn_ya(tn_wf[tn_],function () {
	tn_d(Error("EventHandler.handleEvent not implemented"))
});
var tn_yf=function (a) {
	tn_U[tn_z](this);
	a&&this.attach(a)
};
tn_O(tn_yf,tn_U);
tn_yf[tn_].m=tn_b;
tn_yf[tn_].uc=tn_b;
tn_yf[tn_].hd=tn_b;
tn_yf[tn_].vc=tn_b;
tn_yf[tn_].Pb=-1;
tn_yf[tn_].Mb=-1;
tn_yf[tn_].ie=0;
var tn_zf={
	"3":13,"12":144,"63232":38,"63233":40,"63234":37,"63235":39,"63236":112,"63237":113,"63238":114,"63239":115,"63240":116,"63241":117,"63242":118,"63243":119,"63244":120,"63245":121,"63246":122,"63247":123,"63248":44,"63272":46,"63273":36,"63275":35,"63276":33,"63277":34,"63289":144,"63302":45
},tn_Af={
	Up:38,Down:40,Left:37,Right:39,Enter:13,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,"U+007F":46,Home:36,End:35,PageUp:33,PageDown:34,Insert:45
},tn_Bf={
	61:187,59:186
},tn_Cf=tn_P||tn_Q&&tn_5c("525");
tn_yf[tn_].sf=function (a) {
	if(tn_Cf&&!tn_of(a[tn_A],this.Pb,a.shiftKey))this[tn_yb](a);
	else this.Mb=tn_3c&&a[tn_A] in tn_Bf?tn_Bf[a[tn_A]]:a[tn_A]
};
tn_yf[tn_].tf=function () {
	this.Pb=-1
};
tn_ya(tn_yf[tn_],function (a) {
	var b=a.M,c,d;
	if(tn_P&&a[tn_D]==tn_$d) {
		c=this.Mb;
		d=c!=13&&c!=27?b[tn_A]:0
	}else if(tn_Q&&a[tn_D]==tn_$d) {
		c=this.Mb;
		d=b[tn_mb]>=0&&b[tn_mb]<63232&&tn_pf(c)?b[tn_mb]:0
	}else if(tn_2c) {
		c=this.Mb;
		d=tn_pf(c)?b[tn_A]:0
	}else {
		c=b[tn_A]||this.Mb;
		d=b[tn_mb]||0;
		if(tn_Yc&&d==63&&!c)c=191
	}var e=c,f=b.keyIdentifier;
	if(c)if(c>=63232&&c in tn_zf)e=tn_zf[c];
	else {
		if(c==25&&a.shiftKey)e=9
	}else if(f&&f in tn_Af)e=tn_Af[f];
	var g=e==this.Pb;
	this.Pb=e;
	if(tn_Q) {
		if(g&&b.timeStamp-this.ie<50)return ;
		this.ie=b.timeStamp
	}var i=new tn_Df(e,d,g,b);
	try{
		this[tn_v](i)
	}finally{
		i.dispose()
	}
});
tn_yf[tn_].attach=function (a) {
	this.vc&&this.detach();
	this.m=a;
	this.uc=tn_T(this.m,tn_$d,this);
	this.hd=tn_T(this.m,"keydown",this.sf,tn_a,this);
	this.vc=tn_T(this.m,"keyup",this.tf,tn_a,this)
};
tn_yf[tn_].detach=function () {
	if(this.uc) {
		tn_te(this.uc);
		tn_te(this.hd);
		tn_te(this.vc);
		this.uc=tn_b;
		this.hd=tn_b;
		this.vc=tn_b
	}this.m=tn_b;
	this.Pb=-1
};
tn_yf[tn_].b=function () {
	tn_yf.a.b[tn_z](this);
	this.detach()
};
var tn_Df=function (a,b,c,d) {
	tn_S[tn_z](this,d);
	tn_za(this,"key");
	tn_va(this,a);
	this.charCode=b;
	this.repeat=c
};
tn_O(tn_Df,tn_S);
var tn_Ff=function (a) {
	var b,c;
	while(a) {
		b=tn_7b(a);
		if(c=tn_Ef[b])break;
		a=a.a?a.a[tn_0a]:tn_b
	}if(c)return tn_3b(c.getInstance)?c.getInstance():new c;
	return tn_b
},tn_Gf=function (a,b) {
	if(!tn_3b(a))tn_d(Error("Invalid component class "+a));
	if(!tn_3b(b))tn_d(Error("Invalid renderer class "+b));
	var c=tn_7b(a);
	tn_Ef[c]=b
};
var tn_If=function (a,b) {
	if(!a)tn_d(Error("Invalid class name "+a));
	if(!tn_3b(b))tn_d(Error("Invalid decorator function "+b));
	tn_Hf[a]=b
},tn_Jf=function (a) {
	var b,c=tn_8c(a);
	for(var d=0,e=c[tn_n];d<e;d++)if(b=c[d] in tn_Hf?tn_Hf[c[d]]():tn_b)return b;return tn_b
},tn_Ef={
},tn_Hf={
};
var tn_Y=function (a,b,c) {
	tn_W[tn_z](this,c);
	this.e=b||tn_Ff(this[tn_0a]);
	this.Bc(a)
};
tn_O(tn_Y,tn_W);
tn_Y[tn_].Fa=tn_b;
tn_Y[tn_].Ab=0;
tn_Y[tn_].Wb=39;
tn_Y[tn_].cc=255;
tn_Y[tn_].Dc=0;
tn_Y[tn_].r=tn_c;
tn_Y[tn_].ca=tn_b;
tn_Y[tn_].Vc=tn_c;
tn_Y[tn_].ac=tn_a;
tn_Y[tn_].da=function () {
	return this.K||(this.K=new tn_wf(this))
};
tn_Y[tn_].od=function (a) {
	this.p&&a!=this.Vc&&this.Qd(a);
	this.Vc=a
};
tn_Y[tn_].A=function () {
	return this.e.A(this)
};
tn_Y[tn_].kb=function () {
	return this.Y||(this.Y=new tn_yf)
};
tn_Y[tn_].Te=function (a) {
	if(a) {
		if(this.ca)tn_fc(this.ca,a)||this.ca[tn_m](a);
		else this.ca=[a];
		this.e.Od(this,a,tn_c)
	}
};
tn_Y[tn_].Vf=function (a) {
	if(a&&this.ca) {
		tn_jc(this.ca,a);
		if(this.ca[tn_n]==0)this.ca=tn_b;
		this.e.Od(this,a,tn_a)
	}
};
tn_Y[tn_].Eb=function (a,b) {
	b?this.Te(a):this.Vf(a)
};
tn_Y[tn_].d=function () {
	var a=this.e.d(this);
	this.wb(a);
	this.e.xe(a);
	this.ac||this.e.Za(a,tn_a);
	this.r||this.e.N(a,tn_a)
};
tn_Y[tn_].n=function () {
	return this.e.n(this.c())
};
tn_Y[tn_].I=function (a) {
	return this.e.I(a)
};
tn_Y[tn_].aa=function (a) {
	a=this.e.decorate(this,a);
	this.wb(a);
	this.e.xe(a);
	this.ac||this.e.Za(a,tn_a);
	this.r=a[tn_w].display!="none"
};
tn_Y[tn_].z=function () {
	tn_Y.a.z[tn_z](this);
	this.e.Ba(this);
	if(this.Wb&-2) {
		this.Vc&&this.Qd(tn_c);
		if(this.X(32)) {
			var a=this.A();
			if(a) {
				var b=this.da(),c=this.kb();
				c.attach(a);
				b.listen(c,"key",this.ka);
				b.listen(a,"focus",this.Kb);
				b.listen(a,"blur",this.xa)
			}
		}
	}
};
tn_Y[tn_].Qd=function (a) {
	var b=this.da(),c=this.c();
	if(a) {
		b.listen(c,tn_8d,this.Xc);
		b.listen(c,tn_xe,this.za);
		b.listen(c,tn_ye,this.nb);
		b.listen(c,tn_9d,this.Wc);
		tn_P&&b.listen(c,"dblclick",this.Yd)
	}else {
		b.unlisten(c,tn_8d,this.Xc);
		b.unlisten(c,tn_xe,this.za);
		b.unlisten(c,tn_ye,this.nb);
		b.unlisten(c,tn_9d,this.Wc);
		tn_P&&b.unlisten(c,"dblclick",this.Yd)
	}
};
tn_Y[tn_].T=function () {
	tn_Y.a.T[tn_z](this);
	this.K&&this.K.zc();
	this.Y&&this.Y.detach();
	this.r&&this.B()&&this.e.ra(this,tn_a)
};
tn_Y[tn_].b=function () {
	tn_Y.a.b[tn_z](this);
	if(this.K) {
		this.K.dispose();
		delete this.K
	}if(this.Y) {
		this.Y.dispose();
		delete this.Y
	}delete this.e;
	this.Fa=tn_b;
	this.ca=tn_b
};
tn_Y[tn_].ha=function (a) {
	this.e.ha(this.c(),a);
	this.Bc(a)
};
tn_Y[tn_].Bc=function (a) {
	this.Fa=a
};
tn_Y[tn_].J=function () {
	var a=this.Fa;
	if(!a||tn_N(a))return a;
	var b=tn_M(a)?tn_cc(a,tn_Ed)[tn_K](""):tn_Ed(a);
	return b&&tn_Dc(b)
};
tn_Y[tn_].Ca=function (a) {
	tn_Y.a.Ca[tn_z](this,a);
	var b=this.c();
	b&&this.e.Ca(b,a)
};
tn_Y[tn_].Za=function (a) {
	this.ac=a;
	var b=this.c();
	b&&this.e.Za(b,a)
};
tn_Y[tn_].N=function (a,b) {
	if(b||this.r!=a&&this[tn_v](a?"show":"hide")) {
		var c=this.c();
		c&&this.e.N(c,a);
		this.B()&&this.e.ra(this,a);
		this.r=a;
		return tn_c
	}return tn_a
};
tn_Y[tn_].B=function () {
	return !this.Aa(1)
};
tn_Y[tn_].Jf=function () {
	var a=this.C;
	return !!a&&typeofa.B=="function"&&!a.B()
};
tn_Y[tn_].L=function (a) {
	if(!this.Jf()&&this.Ua(1,!a)) {
		if(!a) {
			this[tn_Mb](tn_a);
			this.ia(tn_a)
		}this.r&&this.e.ra(this,a);
		this.O(1,!a)
	}
};
tn_Y[tn_].ia=function (a) {
	this.Ua(2,a)&&this.O(2,a)
};
tn_Y[tn_].qb=function () {
	return this.Aa(4)
};
tn_Y[tn_].setActive=function (a) {
	this.Ua(4,a)&&this.O(4,a)
};
tn_Y[tn_].xd=function (a) {
	this.Ua(8,a)&&this.O(8,a)
};
tn_Y[tn_].Hf=function () {
	return this.Aa(16)
};
tn_Y[tn_].ag=function (a) {
	this.Ua(16,a)&&this.O(16,a)
};
tn_Y[tn_].de=function () {
	return this.Aa(32)
};
tn_Y[tn_].Ce=function (a) {
	this.Ua(32,a)&&this.O(32,a)
};
tn_Y[tn_].isOpen=function () {
	return this.Aa(64)
};
tn_Y[tn_].w=function (a) {
	this.Ua(64,a)&&this.O(64,a)
};
tn_Y[tn_].Aa=function (a) {
	return !!(this.Ab&a)
};
tn_Y[tn_].O=function (a,b) {
	if(this.X(a)&&b!=this.Aa(a)) {
		this.e.O(this,a,b);
		this.Ab=b?this.Ab|a:this.Ab&~a
	}
};
tn_Y[tn_].He=function (a) {
	this.Ab=a
};
tn_Y[tn_].X=function (a) {
	return !!(this.Wb&a)
};
tn_Y[tn_].Ma=function (a,b) {
	if(this.p&&this.Aa(a)!=b)tn_d(Error(tn_kf));
	!b&&this.Aa(a)&&this.O(a,tn_a);
	this.Wb=b?this.Wb|a:this.Wb&~a
};
tn_Y[tn_].W=function (a) {
	return !!(this.cc&a)&&this.X(a)
};
tn_Y[tn_].$f=function (a,b) {
	this.cc=b?this.cc|a:this.cc&~a
};
tn_Y[tn_].ze=function (a,b) {
	this.Dc=b?this.Dc|a:this.Dc&~a
};
tn_Y[tn_].Ua=function (a,b) {
	return this.X(a)&&this.Aa(a)!=b&&(!(this.Dc&a)||this[tn_v](tn_mf(a,b)))&&!this.Oc
};
tn_Y[tn_].Xc=function (a) {
	a[tn_Na]&&!tn_wd(this.c(),a[tn_Na])&&this[tn_v]("enter")&&this.B()&&this.W(2)&&this.ia(tn_c)
};
tn_Y[tn_].Wc=function (a) {
	if(a[tn_Na]&&!tn_wd(this.c(),a[tn_Na])&&this[tn_v]("leave")) {
		this.W(4)&&this[tn_Mb](tn_a);
		this.W(2)&&this.ia(tn_a)
	}
};
tn_Y[tn_].za=function (a) {
	if(this.B()) {
		this.W(2)&&this.ia(tn_c);
		if(a.ce(0)) {
			this.W(4)&&this[tn_Mb](tn_c);
			this.e.na(this)&&this.A()[tn_pb]()
		}
	}!this.ac&&a.ce(0)&&a[tn_6a]()
};
tn_Y[tn_].nb=function (a) {
	if(this.B()) {
		this.W(2)&&this.ia(tn_c);
		this.qb()&&this.Wa(a)&&this.W(4)&&this[tn_Mb](tn_a)
	}
};
tn_Y[tn_].Yd=function (a) {
	this.B()&&this.Wa(a)
};
tn_Y[tn_].Wa=function () {
	this.W(16)&&this.ag(!this.Hf());
	this.W(8)&&this.xd(tn_c);
	this.W(64)&&this.w(!this[tn_kb]());
	return this[tn_v]("action")
};
tn_Y[tn_].Kb=function () {
	this.W(32)&&this.Ce(tn_c)
};
tn_Y[tn_].xa=function () {
	this.W(4)&&this[tn_Mb](tn_a);
	this.W(32)&&this.Ce(tn_a)
};
tn_Y[tn_].ka=function (a) {
	if(this.r&&this.B()&&this.ya(a)) {
		a[tn_6a]();
		a[tn_3a]();
		return tn_c
	}return tn_a
};
tn_Y[tn_].ya=function (a) {
	return a[tn_A]==13&&this.Wa(a)
};
tn_Gf(tn_Y,tn_X);
tn_If("goog-control",function () {
	return new tn_Y(tn_b)
});
var tn_Z=function () {
	tn_vf[tn_z](this)
};
tn_O(tn_Z,tn_vf);
tn_Xb(tn_Z);
tn_Z[tn_].U=function () {
	return tn_e
};
tn_Z[tn_].d=function (a) {
	this.Ie(a);
	return a.q.d("button",{
		"class":this.Pa(a)[tn_K](" "),disabled:!a.B(),title:a.mb()||"",value:a.j()||""
	},a.J()||"")
};
tn_Z[tn_].I=function (a) {
	return a[tn_Cb]=="BUTTON"||a[tn_Cb]=="INPUT"&&(a[tn_D]=="button"||a[tn_D]=="submit"||a[tn_D]=="reset")
};
tn_Z[tn_].decorate=function (a,b) {
	this.Ie(a);
	b.disabled&&tn_9c(b,this.ib(1));
	return tn_Z.a.decorate[tn_z](this,a,b)
};
tn_Z[tn_].Ba=function (a) {
	a.da().listen(a.c(),"click",a.Wa)
};
tn_Z[tn_].Za=tn_Wb;
tn_Z[tn_].Ca=tn_Wb;
tn_Z[tn_].na=function (a) {
	return a.B()
};
tn_Z[tn_].ra=tn_Wb;
tn_Z[tn_].O=function (a,b,c) {
	tn_Z.a.O[tn_z](this,a,b,c);
	var d=a.c();
	if(d&&b==1)d.disabled=c
};
tn_Z[tn_].j=function (a) {
	return a[tn_s]
};
tn_Z[tn_].P=function (a,b) {
	if(a)tn_i(a,b)
};
tn_Z[tn_].Ad=tn_Wb;
tn_Z[tn_].Ie=function (a) {
	a.od(tn_a);
	a.$f(255,tn_a);
	a.Ma(32,tn_a)
};
var tn_Kf=function (a,b,c) {
	tn_Y[tn_z](this,a,b||tn_Z.getInstance(),c)
};
tn_O(tn_Kf,tn_Y);
tn_Kf[tn_].j=function () {
	return this.Pe
};
tn_Kf[tn_].P=function (a) {
	this.Pe=a;
	this.e.P(this.c(),a)
};
tn_Kf[tn_].mg=function (a) {
	this.Pe=a
};
tn_Kf[tn_].mb=function () {
	return this.Le
};
tn_Kf[tn_].Cc=function (a) {
	this.Le=a;
	this.e.Cc(this.c(),a)
};
tn_Kf[tn_].lg=function (a) {
	this.Le=a
};
tn_Kf[tn_].b=function () {
	tn_Kf.a.b[tn_z](this);
	delete this.Pe;
	delete this.Le
};
tn_Kf[tn_].z=function () {
	tn_Kf.a.z[tn_z](this);
	if(this.X(32)) {
		var a=this.A();
		a&&this.da().listen(a,"keyup",this.ya)
	}
};
tn_Kf[tn_].ya=function (a) {
	return (a[tn_A]==13&&a[tn_D]=="key"||a[tn_A]==32&&a[tn_D]=="keyup")&&this.Wa(a)
};
tn_If("goog-button",function () {
	return new tn_Kf(tn_b)
});
var tn_Lf=function () {
	tn_vf[tn_z](this)
};
tn_O(tn_Lf,tn_vf);
tn_Xb(tn_Lf);
var tn_Mf="goog-custom-button";
tn_Lf[tn_].d=function (a) {
	var b=this.Pa(a),c={
		"class":"goog-inline-block "+b[tn_K](" "),title:a.mb()||""
	};
	return a.q.d("div",c,this.Db(a.Fa,a.q))
};
tn_Lf[tn_].n=function (a) {
	return a&&a[tn_B][tn_B]
};
tn_Lf[tn_].Db=function (a,b) {
	var c="goog-inline-block "+this.h();
	return b.d("div",{
		"class":c+"-outer-box"
	},b.d("div",{
		"class":c+"-inner-box"
	},a))
};
tn_Lf[tn_].I=function (a) {
	return a[tn_Cb]=="DIV"
};
tn_Lf[tn_].yf=function (a,b) {
	var c=a.q.Vd(b);
	if(c&&c[tn_Oa][tn_u](this.h()+"-outer-box")!=-1) {
		var d=a.q.Vd(c);
		if(d&&d[tn_Oa][tn_u](this.h()+"-inner-box")!=-1)return tn_c
	}return tn_a
};
tn_Lf[tn_].decorate=function (a,b) {
	tn_Nf(b,tn_c);
	tn_Nf(b,tn_a);
	this.yf(a,b)||b[tn_l](this.Db(b[tn_F],a.q));
	tn_9c(b,"goog-inline-block",this.h());
	return tn_Lf.a.decorate[tn_z](this,a,b)
};
tn_Lf[tn_].h=function () {
	return tn_Mf
};
var tn_Nf=function (a,b) {
	if(a) {
		var c=b?a[tn_B]:a[tn_hb],d;
		while(c&&c[tn_H]==a) {
			d=b?c[tn_I]:c[tn_Ia];
			if(c[tn_q]==3) {
				var e=c[tn_L];
				if(tn_Dc(e)=="")a[tn_fb](c);
				else {
					c.nodeValue=b?e[tn_p](/^[\s\xa0]+/,""):e[tn_p](/[\s\xa0]+$/,"");
					break
				}
			}else break;
			c=d
		}
	}
};
var tn_Of=function (a,b,c) {
	tn_Kf[tn_z](this,a,b||tn_Lf.getInstance(),c)
};
tn_O(tn_Of,tn_Kf);
tn_If(tn_Mf,function () {
	return new tn_Of(tn_b)
});
var tn__=function () {
	tn_X[tn_z](this);
	var a=this.Jb();
	this.Cb={
		checkbox:a+"-checkbox",content:a+"-content",hover:a+"-highlight"
	}
};
tn_O(tn__,tn_X);
tn_Xb(tn__);
tn__[tn_].U=function () {
	return "menuitem"
};
tn__[tn_].d=function (a) {
	var b=a.q.d("div",{
		"class":this.Pa(a)[tn_K](" ")
	},this.Jd(a.Fa,a.q));
	this.Be(a,b,a.X(8)||a.X(16));
	return b
};
tn__[tn_].n=function (a) {
	return a&&a[tn_B]
};
tn__[tn_].decorate=function (a,b) {
	this.Af(b)||b[tn_l](this.Jd(b[tn_F],a.q));
	if(tn_fc(tn_8c(b),"goog-option")) {
		a.Ub(tn_c);
		this.Ub(a,b,tn_c)
	}return tn__.a.decorate[tn_z](this,a,b)
};
tn__[tn_].ha=function (a,b) {
	var c=this.n(a),d=this.Yc(a)?c[tn_B]:tn_b;
	tn__.a.ha[tn_z](this,a,b);
	if(d&&!this.Yc(a))c[tn_7a](d,c[tn_B]||tn_b)
};
tn__[tn_].Af=function (a) {
	var b=tn_td(a[tn_B],tn_c);
	return !!b&&b[tn_Oa][tn_u](this.Cb.content)!=-1
};
tn__[tn_].Jd=function (a,b) {
	return b.d("div",{
		"class":this.Cb.content
	},a)
};
tn__[tn_].Ub=function (a,b,c) {
	if(b) {
		tn_sf(b,c?"menuitemcheckbox":this.U());
		this.Be(a,b,c)
	}
};
tn__[tn_].Yc=function (a) {
	var b=this.n(a);
	if(b) {
		var c=b[tn_B];
		return !!c&&!!c[tn_Oa]&&c[tn_Oa][tn_u](this.Cb.checkbox)!=-1
	}return tn_a
};
tn__[tn_].Be=function (a,b,c) {
	if(c!=this.Yc(b)) {
		tn_ad(b,"goog-option",c);
		var d=this.n(b);
		c?d[tn_7a](a.q.d("div",{
			"class":this.Cb.checkbox
		}),d[tn_B]||tn_b):d[tn_fb](d[tn_B])
	}
};
tn__[tn_].ib=function (a) {
	switch(a) {
		case 2:return this.Cb.hover;
		case 16:case 8:return "goog-option-selected";
		default:return tn__.a.ib[tn_z](this,a)
	}
};
tn__[tn_].kc=function (a) {
	switch(a) {
		case "goog-option-selected":return 16;
		case this.Cb.hover:return 2;
		default:return tn__.a.kc[tn_z](this,a)
	}
};
tn__[tn_].h=function () {
	return "goog-menuitem"
};
var tn_Pf=function (a,b,c,d) {
	tn_Y[tn_z](this,a,d||tn__.getInstance(),c);
	this.P(b)
};
tn_O(tn_Pf,tn_Y);
tn_Pf[tn_].j=function () {
	var a=this.jd;
	return a!=tn_b?a:this.J()
};
tn_Pf[tn_].P=function (a) {
	this.fg(a)
};
tn_Pf[tn_].Ub=function (a) {
	this.Ma(16,a);
	var b=this.c();
	b&&this.e.Ub(this,b,a)
};
tn_If("goog-menuitem",function () {
	return new tn_Pf(tn_b)
});
var tn_Qf=function () {
	return tn_X[tn_z](this)
};
tn_O(tn_Qf,tn_X);
tn_Xb(tn_Qf);
var tn_Rf="goog-menuseparator";
tn_Qf[tn_].d=function (a) {
	return a.q.d("div",{
		"class":this.h()
	})
};
tn_Qf[tn_].decorate=function (a,b) {
	if(b[tn_Cb]=="HR") {
		var c=b;
		b=this.d(a);
		tn_pd(b,c);
		tn_rd(c)
	}else tn_9c(b,this.h());
	return b
};
tn_Qf[tn_].ha=function () {
};
tn_Qf[tn_].h=function () {
	return tn_Rf
};
var tn_Sf=function (a,b) {
	tn_Y[tn_z](this,tn_b,a||tn_Qf.getInstance(),b);
	this.Ma(1,tn_a);
	this.Ma(2,tn_a);
	this.Ma(4,tn_a);
	this.Ma(32,tn_a);
	this.He(1)
};
tn_O(tn_Sf,tn_Y);
tn_Sf[tn_].z=function () {
	tn_Sf.a.z[tn_z](this);
	tn_sf(this.c(),"separator")
};
tn_If(tn_Rf,function () {
	return new tn_Sf
});
var tn_0=function () {
};
tn_Xb(tn_0);
tn_0[tn_].U=function () {
	return tn_e
};
tn_0[tn_].Bf=function (a) {
	if(a) {
		var b=a.getAttributeNode("tabindex");
		if(b&&b.specified) {
			var c=a.tabIndex;
			return typeofc=="number"&&c>=0
		}
	}return tn_a
};
tn_0[tn_].Pc=function (a,b) {
	if(a)a.tabIndex=b?0:-1
};
tn_0[tn_].d=function (a) {
	return a.q.d("div",{
		"class":this.Pa(a)[tn_K](" ")
	})
};
tn_0[tn_].n=function (a) {
	return a
};
tn_0[tn_].I=function (a) {
	return a[tn_Cb]=="DIV"
};
tn_0[tn_].decorate=function (a,b) {
	b.id&&a.Ee(b.id);
	var c=this.h(),d=tn_a,e=tn_8c(b);
	e&&tn_bc(e,function (f) {
		if(f==c)d=tn_c;
		else f&&this.ig(a,f,c)
	},this);
	d||tn_9c(b,c);
	this.bf(a,b);
	return b
};
tn_0[tn_].ig=function (a,b,c) {
	if(b==c+"-disabled")a.L(tn_a);
	else if(b==c+"-horizontal")a.Ge(tn_Tf);
	else b==c+"-vertical"&&a.Ge(tn_Uf)
};
tn_0[tn_].bf=function (a,b) {
	if(b) {
		var c=b[tn_B],d;
		while(c&&c[tn_H]==b) {
			d=c[tn_I];
			if(c[tn_q]==1) {
				var e=this.fc(c);
				if(e) {
					e.wb(c);
					a.B()||e.L(tn_a);
					a.Cd(e);
					e.decorate(c)
				}
			}else if(!c[tn_L]||tn_Dc(c[tn_L])=="")b[tn_fb](c);
			c=d
		}
	}
};
tn_0[tn_].fc=function (a) {
	return tn_Jf(a)
};
tn_0[tn_].Ba=function (a) {
	var b=a.c();
	tn_ff(b,tn_c,tn_3c);
	if(tn_P)b.hideFocus=tn_c;
	var c=this.U();
	c&&tn_sf(b,c);
	if(a.pa==tn_Tf&&tn_3c&&!tn_5c("1.9a")&&a.rb()) {
		var d=this.n(b);
		a.fb(function (e) {
			var f=e.c();
			f&&f[tn_H]==d&&tn_Vf(e)
		})
	}
};
tn_0[tn_].A=function (a) {
	return a.c()
};
tn_0[tn_].h=function () {
	return "goog-container"
};
tn_0[tn_].Pa=function (a) {
	var b=this.h(),c=a.pa==tn_Tf,d=[b,b+(c?"-horizontal":"-vertical")];
	a.B()||d[tn_m](this.h()+"-disabled");
	return d
};
tn_0[tn_].gf=function () {
	return tn_Uf
};
var tn_Vf=function (a) {
	var b=a.c();
	if(b) {
		var c=b[tn_H],d=b[tn_I],e=ainstanceoftn_Sf?"display:-moz-box;position:relative;top:4px":"display:-moz-box;position:relative";
		c[tn_7a](a.q.d("div",{
			style:e
		},b),d)
	}
},tn_Wf=function (a) {
	var b=a.c();
	if(b) {
		var c=b[tn_H];
		c[tn_H][tn_7a](b,c);
		tn_rd(c)
	}
};
var tn_1=function (a,b,c) {
	tn_W[tn_z](this,c);
	this.e=b||tn_0.getInstance();
	this.pa=a||this.e.gf()
};
tn_O(tn_1,tn_W);
var tn_Tf="horizontal",tn_Uf="vertical";
tn_1[tn_].K=tn_b;
tn_1[tn_].Lf=tn_b;
tn_1[tn_].Y=tn_b;
tn_1[tn_].e=tn_b;
tn_1[tn_].pa=tn_b;
tn_1[tn_].r=tn_c;
tn_1[tn_].S=tn_c;
tn_1[tn_].Rc=tn_c;
tn_1[tn_].V=-1;
tn_1[tn_].H=tn_b;
tn_1[tn_].kd=tn_a;
tn_1[tn_].Ue=tn_a;
tn_1[tn_].Ea=tn_b;
tn_1[tn_].da=function () {
	return this.K||(this.K=new tn_wf(this))
};
tn_1[tn_].A=function () {
	return this.Lf||this.e.A(this)
};
tn_1[tn_].kb=function () {
	return this.Y||(this.Y=new tn_yf(this.A()))
};
tn_1[tn_].d=function () {
	this.wb(this.e.d(this))
};
tn_1[tn_].n=function () {
	return this.e.n(this.c())
};
tn_1[tn_].I=function (a) {
	return this.e.I(a)
};
tn_1[tn_].aa=function (a) {
	this.wb(this.e.decorate(this,a));
	if(a[tn_w].display=="none")this.r=tn_a
};
tn_1[tn_].z=function () {
	tn_1.a.z[tn_z](this);
	var a=this.c();
	this.e.Ba(this);
	this.N(this.r,tn_c);
	var b=this.da();
	b.listen(this,"enter",this.mc);
	b.listen(this,tn_if,this.nc);
	b.listen(this,tn_jf,this.pc);
	b.listen(this,"open",this.vf);
	b.listen(this,"close",this.pf);
	b.listen(a,tn_xe,this.za);
	b.listen(tn_dd(a),tn_ye,this.rf);
	b.listen(a,[tn_xe,tn_ye,tn_8d,tn_9d],this.of);
	this.na()&&this.Pd(tn_c)
};
tn_1[tn_].Pd=function (a) {
	var b=this.da(),c=this.A();
	if(a) {
		b.listen(c,"focus",this.Kb);
		b.listen(c,"blur",this.xa);
		b.listen(this.kb(),"key",this.ka)
	}else {
		b.unlisten(c,"focus",this.Kb);
		b.unlisten(c,"blur",this.xa);
		b.unlisten(this.kb(),"key",this.ka)
	}
};
tn_1[tn_].T=function () {
	tn_1.a.T[tn_z](this);
	this.$a(-1);
	this.K&&this.K.zc();
	this.H&&this.H.w(tn_a);
	this.kd=tn_a
};
tn_1[tn_].b=function () {
	tn_1.a.b[tn_z](this);
	if(this.K) {
		this.K.dispose();
		this.K=tn_b
	}if(this.Y) {
		this.Y.dispose();
		this.Y=tn_b
	}this.Ea=tn_b;
	this.H=tn_b;
	this.e=tn_b
};
tn_1[tn_].mc=function () {
	return tn_c
};
tn_1[tn_].nc=function (a) {
	var b=this.sc(a[tn_y]);
	if(b>-1&&b!=this.V) {
		var c=this.jb();
		c&&c.ia(tn_a);
		this.V=b;
		c=this.jb();
		this.kd&&c[tn_Mb](tn_c);
		if(this.H&&c!=this.H)c.X(64)?c.w(tn_c):this.H.w(tn_a)
	}tn_tf(this.c(),tn_rf,a[tn_y].c().id)
};
tn_1[tn_].pc=function (a) {
	if(a[tn_y]==this.jb())this.V=-1;
	tn_tf(this.c(),tn_rf,tn_b)
};
tn_1[tn_].vf=function (a) {
	var b=a[tn_y];
	if(b&&b!=this.H&&b.C==this) {
		this.H&&this.H.w(tn_a);
		this.H=b
	}
};
tn_1[tn_].pf=function (a) {
	if(a[tn_y]==this.H)this.H=tn_b
};
tn_1[tn_].za=function (a) {
	this.S&&this.bb(tn_c);
	var b=this.A();
	this.e.Bf(b)?b[tn_pb]():a[tn_6a]()
};
tn_1[tn_].rf=function () {
	this.bb(tn_a)
};
tn_1[tn_].of=function (a) {
	var b=this.lf(a[tn_y]);
	if(b)switch(a[tn_D]) {
		case tn_xe:b.za(a);
		break;
		case tn_ye:b.nb(a);
		break;
		case tn_8d:b.Xc(a);
		break;
		case tn_9d:b.Wc(a);
		break
	}
};
tn_1[tn_].lf=function (a) {
	if(this.Ea) {
		var b=this.c();
		while(a&&a[tn_H]&&a!=b) {
			var c=a.id;
			if(c in this.Ea)return this.Ea[c];
			a=a[tn_H]
		}
	}return tn_b
};
tn_1[tn_].Kb=function () {
};
tn_1[tn_].xa=function () {
	this.$a(-1);
	this.bb(tn_a);
	this.H&&this.H.w(tn_a)
};
tn_1[tn_].ka=function (a) {
	if(this.B()&&this.Oa()!=0&&this.ya(a)) {
		a[tn_6a]();
		a[tn_3a]();
		return tn_c
	}return tn_a
};
tn_1[tn_].ya=function (a) {
	var b=this.jb();
	if(b&&typeofb.ka=="function"&&b.ka(a))return tn_c;
	if(this.H&&this.H!=b&&typeofthis.H.ka=="function"&&this.H.ka(a))return tn_c;
	switch(a[tn_A]) {
		case 27:if(this.na())this.A().blur();
		else return tn_a;
		break;
		case 36:this.Cf();
		break;
		case 35:this.Df();
		break;
		case 38:if(this.pa==tn_Uf)this.ad();
		else return tn_a;
		break;
		case 37:if(this.pa==tn_Tf)this.rb()?this.$c():this.ad();
		else return tn_a;
		break;
		case 40:if(this.pa==tn_Uf)this.$c();
		else return tn_a;
		break;
		case 39:if(this.pa==tn_Tf)this.rb()?this.ad():this.$c();
		else return tn_a;
		break;
		default:return tn_a
	}return tn_c
};
tn_1[tn_].Bb=function (a,b,c) {
	a.ze(2,tn_c);
	a.ze(64,tn_c);
	if(this.na()||!this.Ue)a.Ma(32,tn_a);
	a.od(tn_a);
	tn_1.a.Bb[tn_z](this,a,b,c);
	var d=a.c();
	if(d) {
		if(!d.id)d.id=a.gc();
		if(!this.Ea)this.Ea={
		};
		tn_uc(this.Ea,d.id,a)
	}c&&this.p&&this.rb()&&this.pa==tn_Tf&&tn_3c&&!tn_5c("1.9a")&&tn_Vf(a);
	b<=this.V&&this.V++
};
tn_1[tn_].removeChild=function (a,b) {
	var c=this.sc(a);
	if(c!=-1)if(c==this.V)a.ia(tn_a);
	else c<this.V&&this.V--;
	b&&this.p&&this.rb()&&this.pa==tn_Tf&&tn_3c&&!tn_5c("1.9a")&&tn_Wf(a);
	var d=a.c();
	d&&d.id&&tn_tc(this.Ea,d.id);
	a=tn_1.a[tn_fb][tn_z](this,a,b);
	a.od(tn_c);
	return a
};
tn_1[tn_].Ge=function (a) {
	if(this.c())tn_d(Error(tn_kf));
	this.pa=a
};
tn_1[tn_].N=function (a,b) {
	if(b||this.r!=a&&this[tn_v](a?"show":"hide")) {
		this.r=a;
		var c=this.c();
		if(c) {
			tn_af(c,a);
			this.na()&&this.e.Pc(this.A(),this.S&&this.r)
		}return tn_c
	}return tn_a
};
tn_1[tn_].B=function () {
	return this.S
};
tn_1[tn_].L=function (a) {
	if(this.S!=a&&this[tn_v](a?"enable":"disable")) {
		if(a) {
			this.S=tn_c;
			this.fb(function (b) {
				if(b.wasDisabled)delete b.wasDisabled;
				else b.L(tn_c)
			})
		}else {
			this.fb(function (b) {
				if(b.B())b.L(tn_a);
				else b.wasDisabled=tn_c
			});
			this.S=tn_a;
			this.bb(tn_a)
		}this.na()&&this.e.Pc(this.A(),a&&this.r)
	}
};
tn_1[tn_].na=function () {
	return this.Rc
};
tn_1[tn_].ra=function (a) {
	a!=this.Rc&&this.p&&this.Pd(a);
	this.Rc=a;
	this.S&&this.r&&this.e.Pc(this.A(),a)
};
tn_1[tn_].$a=function (a) {
	var b=this.hb(a);
	if(b)b.ia(tn_c);
	else this.V>-1&&this.jb().ia(tn_a)
};
tn_1[tn_].ia=function (a) {
	this.$a(this.sc(a))
};
tn_1[tn_].jb=function () {
	return this.hb(this.V)
};
tn_1[tn_].Cf=function () {
	this.qc(function (a,b) {
		return (a+1)%b
	},this.Oa()-1)
};
tn_1[tn_].Df=function () {
	this.qc(function (a,b) {
		a--;
		return a<0?b-1:a
	},0)
};
tn_1[tn_].$c=function () {
	this.qc(function (a,b) {
		return (a+1)%b
	},this.V)
};
tn_1[tn_].ad=function () {
	this.qc(function (a,b) {
		a--;
		return a<0?b-1:a
	},this.V)
};
tn_1[tn_].qc=function (a,b) {
	var c=b<0?this.sc(this.H):b,d=this.Oa();
	c=a(c,d);
	var e=0;
	while(e<=d) {
		var f=this.hb(c);
		if(f&&this.Hc(f)) {
			this.dg(c);
			return tn_c
		}e++;
		c=a(c,d)
	}return tn_a
};
tn_1[tn_].Hc=function (a) {
	return a.r&&a.B()&&a.X(2)
};
tn_1[tn_].dg=function (a) {
	this.$a(a)
};
tn_1[tn_].bb=function (a) {
	this.kd=a
};
var tn_Xf=function () {
	tn_0[tn_z](this)
};
tn_O(tn_Xf,tn_0);
tn_Xb(tn_Xf);
tn_Xf[tn_].U=function () {
	return "menu"
};
tn_Xf[tn_].I=function (a) {
	return a[tn_Cb]=="UL"||tn_Xf.a.I[tn_z](this,a)
};
tn_Xf[tn_].fc=function (a) {
	return a[tn_Cb]=="HR"?new tn_Sf:tn_Xf.a.fc[tn_z](this,a)
};
tn_Xf[tn_].ta=function (a,b) {
	return tn_wd(a.c(),b)
};
tn_Xf[tn_].h=function () {
	return "goog-menu"
};
tn_Xf[tn_].Ba=function (a) {
	tn_Xf.a.Ba[tn_z](this,a);
	var b=a.c();
	tn_sf(b,"menu");
	tn_tf(b,"haspopup","true")
};
var tn_Yf=function (a) {
	tn_Sf[tn_z](this,tn_Qf.getInstance(),a)
};
tn_O(tn_Yf,tn_Sf);
tn_If(tn_Rf,function () {
	return new tn_Sf
});
var tn_Zf=function (a,b) {
	tn_1[tn_z](this,tn_Uf,b||tn_Xf.getInstance(),a);
	this.ra(tn_a)
};
tn_O(tn_Zf,tn_1);
tn_Zf[tn_].Gc=tn_c;
tn_Zf[tn_].Ve=tn_a;
tn_Zf[tn_].h=function () {
	return this.e.h()
};
tn_Zf[tn_].ta=function (a) {
	return this.e.ta(this,a)||this.zf()&&tn_dc(this.F,function (b) {
		return typeofb.ta=="function"&&b.ta(a)
	})
};
tn_Zf[tn_].Z=function (a) {
	this.Cd(a,tn_c)
};
tn_Zf[tn_].ja=function (a,b) {
	this.Bb(a,b,tn_c)
};
tn_Zf[tn_].ea=function (a) {
	return this.hb(a)
};
tn_Zf[tn_].Ga=function () {
	return this.Oa()
};
tn_Zf[tn_].ic=function () {
	return this.F||[]
};
tn_Zf[tn_].Zf=function (a) {
	this.Gc=a;
	a&&this.ra(tn_c)
};
tn_Zf[tn_].N=function (a,b) {
	var c=tn_Zf.a.N[tn_z](this,a,b);
	c&&a&&this.p&&this.Gc&&this.A()[tn_pb]();
	return c
};
tn_Zf[tn_].mc=function (a) {
	this.Gc&&this.A()[tn_pb]();
	return tn_Zf.a.mc[tn_z](this,a)
};
tn_Zf[tn_].Hc=function (a) {
	return (this.Ve||a.B())&&a.r&&a.X(2)
};
var tn__f=function () {
	tn_Lf[tn_z](this)
};
tn_O(tn__f,tn_Lf);
tn_Xb(tn__f);
var tn_0f="__goog_wrapper_div";
if(tn_3c)tn__f[tn_].ha=function (a,b) {
	var c=tn__f.a.n[tn_z](this,a&&a[tn_B]);
	c&&tn_sd(this.createCaption(b,tn_ed(a)),c)
};
tn__f[tn_].n=function (a) {
	var b=tn__f.a.n[tn_z](this,a&&a[tn_B]);
	if(tn_3c&&b&&b[tn_0f])b=b[tn_B];
	return b
};
tn__f[tn_].decorate=function (a,b) {
	var c=tn_hd("*","goog-menu",b)[0];
	if(c) {
		tn_af(c,tn_a);
		tn_nd(tn_dd(c)[tn_bb],c);
		var d=new tn_Zf;
		d.decorate(c);
		a.yb(d)
	}return tn__f.a.decorate[tn_z](this,a,b)
};
tn__f[tn_].Db=function (a,b) {
	return tn__f.a.Db[tn_z](this,[this.createCaption(a,b),this.Ze(b)],b)
};
tn__f[tn_].createCaption=function (a,b) {
	var c={
		"class":"goog-inline-block "+this.h()+"-caption"
	};
	if(tn_cf&&tn_bf(a)) {
		c[tn_0f]=tn_c;
		return b.d("div",c,tn_md("div",tn_b,a))
	}else return b.d("div",c,a)
};
tn__f[tn_].Ze=function (a) {
	return a.d("div",{
		"class":"goog-inline-block "+this.h()+"-dropdown"
	},"\u00a0")
};
tn__f[tn_].h=function () {
	return "goog-menu-button"
};
var tn_3f=function (a,b,c,d,e,f,g) {
	var i=tn_8e(c),j=tn_8e(a),k=new tn_oc(j.x-i.x+c.offsetLeft,j.y-i.y+c[tn_Ib]),l=1,m=1,n=tn_$e(a),o=tn_1f(a,b);
	switch(o) {
		case 1:break;
		case 2:k.x+=n[tn_o];
		l=-1;
		break;
		case 3:k.y+=n[tn_J];
		m=-1;
		break;
		case 4:k.x+=n[tn_o];
		k.y+=n[tn_J];
		l=-1;
		m=-1;
		break
	}if(e) {
		k.x+=l*e.x;
		k.y+=m*e.y
	}return tn_2f(k,c,d,f,g)
},tn_2f=function (a,b,c,d,e) {
	var f=a.x,g=a.y,i=tn_1f(b,c);
	if(d||i!=1) {
		var j=tn_$e(b);
		switch(i) {
			case 1:f+=d[tn_db];
			g+=d.top;
			break;
			case 2:f-=j[tn_o];
			if(d) {
				f-=d[tn_Sb];
				g+=d.top
			}break;
			case 3:g-=j[tn_J];
			if(d) {
				f+=d[tn_db];
				g-=d[tn_vb]
			}break;
			case 4:f-=j[tn_o];
			g-=j[tn_J];
			if(d) {
				f-=d[tn_Sb];
				g-=d[tn_vb]
			}break
		}
	}var k=tn_c,l=e||0;
	if(l!=0) {
		var m=tn_ed(b),n=tn_$e(b),o=tn_kd(m.Xd()),q=m.Ud(),r=new tn_pc(0,0);
		tn_4f(r,f,g,o,q);
		var t=l&48,p=t&&tn_5f(n,l,o,d),s=tn_a;
		if(n[tn_o]>r[tn_o])if(l&1) {
			f-=n[tn_o]-r[tn_o];
			s=tn_c
		}else if(l&2)k=tn_a;
		if(n[tn_J]>r[tn_J])if(l&4) {
			g-=n[tn_J]-r[tn_J];
			s=tn_c
		}else if(l&8)k=tn_a;
		if(f-q.x<0)if(l&1) {
			f=q.x;
			s=tn_c
		}else if(l&2)k=tn_a;
		if(g-q.y<0)if(l&4) {
			g=q.y;
			s=tn_c
		}else if(l&8)k=tn_a;
		if(k&&t) {
			s&&tn_4f(r,f,g,o,q);
			p=tn_5f(n,l,r,d)||p;
			p&&tn_9e(b,n)
		}
	}k&&tn_6e(b,f,g);
	return k
},tn_4f=function (a,b,c,d,e) {
	var f=b-e.x;
	tn_ra(a,d[tn_o]-f);
	var g=c-e.y;
	tn_k(a,d[tn_J]-g)
},tn_5f=function (a,b,c,d) {
	var e=tn_a;
	if(b&16) {
		var f=d?d[tn_Sb]+d[tn_db]:0;
		if(a[tn_o]+f>c[tn_o]) {
			tn_ra(a,c[tn_o]-f);
			e=tn_c
		}
	}if(b&32) {
		var g=d?d.top+d[tn_vb]:0;
		if(a[tn_J]+g>c[tn_J]) {
			tn_k(a,c[tn_J]-g);
			e=tn_c
		}
	}return e
},tn_1f=function (a,b) {
	var c=tn_df(a);
	switch(b) {
		case 1:case 2:case 3:case 4:return b;
		case 5:return c?2:1;
		case 6:return c?1:2;
		case 7:return c?4:3;
		case 8:return c?3:4
	}
},tn_6f=function () {
};
tn_6f[tn_].reposition=function () {
};
var tn_7f=function (a,b) {
	this.element=a;
	this.corner=b
};
tn_O(tn_7f,tn_6f);
tn_7f[tn_].reposition=function (a,b,c) {
	tn_3f(this.element,this.corner,a,b,tn_b,c)
};
var tn_8f=function (a,b,c) {
	tn_7f[tn_z](this,a,b);
	this.tg=c||tn_a
};
tn_O(tn_8f,tn_7f);
tn_8f[tn_].reposition=function (a,b,c) {
	var d=tn_3f(this.element,this.corner,a,b,tn_b,c,10);
	if(!d) {
		d=tn_3f(this.element,b,a,this.corner,tn_b,c,10);
		d||(this.tg?tn_3f(this.element,this.corner,a,b,tn_b,c,5):tn_3f(this.element,this.corner,a,b,tn_b,c,0))
	}
};
var tn_2=function (a,b,c,d) {
	tn_Kf[tn_z](this,a,c||tn__f.getInstance(),d);
	this.Ma(64,tn_c);
	b&&this.yb(b);
	this.D=new tn_Fe(500)
};
tn_O(tn_2,tn_Kf);
tn_2[tn_].Ed=tn_c;
tn_2[tn_].dd=tn_a;
tn_2[tn_].z=function () {
	tn_2.a.z[tn_z](this);
	this.g&&this.bc(this.g,tn_c);
	tn_tf(this.c(),"haspopup","true")
};
tn_2[tn_].T=function () {
	tn_2.a.T[tn_z](this);
	if(this.g) {
		this.w(tn_a);
		this.g.T();
		this.bc(this.g,tn_a);
		var a=this.g.c();
		a&&tn_rd(a)
	}
};
tn_2[tn_].b=function () {
	tn_2.a.b[tn_z](this);
	if(this.g) {
		this.g.dispose();
		delete this.g
	}this.D.dispose()
};
tn_2[tn_].za=function (a) {
	tn_2.a.za[tn_z](this,a);
	if(this.qb()) {
		this.w(!this[tn_kb]());
		this.g&&this.g.bb(this[tn_kb]())
	}
};
tn_2[tn_].nb=function (a) {
	tn_2.a.nb[tn_z](this,a);
	this.g&&!this.qb()&&this.g.bb(tn_a)
};
tn_2[tn_].Wa=function () {
	this[tn_Mb](tn_a);
	return tn_c
};
tn_2[tn_].qf=function (a) {
	this.g&&this.g.r&&!this.ta(a[tn_y])&&this.w(tn_a)
};
tn_2[tn_].ta=function (a) {
	return a&&tn_wd(this.c(),a)||this.g&&this.g.ta(a)
};
tn_2[tn_].ya=function (a) {
	var b=a[tn_A]==32?"keyup":"key";
	if(a[tn_D]!=b)return tn_a;
	if(this.g&&this.g.r) {
		var c=this.g.ka(a);
		if(a[tn_A]==27) {
			this.w(tn_a);
			return tn_c
		}return c
	}if(a[tn_A]==40||a[tn_A]==38||a[tn_A]==32) {
		this.w(tn_c);
		return tn_c
	}return tn_a
};
tn_2[tn_].oc=function () {
	this.w(tn_a)
};
tn_2[tn_].uf=function () {
	this.qb()||this.w(tn_a)
};
tn_2[tn_].xa=function (a) {
	this.dd||this.w(tn_a);
	tn_2.a.xa[tn_z](this,a)
};
tn_2[tn_].Sa=function () {
	this.g||this.yb(new tn_Zf(this.q));
	return this.g||tn_b
};
tn_2[tn_].yb=function (a) {
	var b=this.g;
	if(a!=b) {
		if(b) {
			this.w(tn_a);
			this.p&&this.bc(b,tn_a);
			delete this.g
		}if(a) {
			this.g=a;
			a.rd(this);
			a.N(tn_a);
			a.Zf(this.dd);
			this.p&&this.bc(a,tn_c)
		}
	}return b
};
tn_2[tn_].Z=function (a) {
	this.Sa().Z(a)
};
tn_2[tn_].ja=function (a,b) {
	this.Sa().ja(a,b)
};
tn_2[tn_].ea=function (a) {
	return this.g?this.g.hb(a):tn_b
};
tn_2[tn_].Ga=function () {
	return this.g?this.g.Oa():0
};
tn_2[tn_].N=function (a,b) {
	var c=tn_2.a.N[tn_z](this,a,b);
	c&&!this.r&&this.w(tn_a);
	return c
};
tn_2[tn_].L=function (a) {
	tn_2.a.L[tn_z](this,a);
	this.B()||this.w(tn_a)
};
tn_2[tn_].w=function (a) {
	tn_2.a.w[tn_z](this,a);
	if(this.g) {
		if(a) {
			this.g.p||this.g.render();
			this.se();
			this.g.$a(-1)
		}else {
			this[tn_Mb](tn_a);
			this.g.bb(tn_a)
		}this.g.N(a);
		this.Xe(a)
	}
};
tn_2[tn_].se=function () {
	var a=this.Ed?7:8,b=new tn_8f(this.c(),a,tn_c),c=this.g.c();
	if(!this.g.r) {
		tn_Ga(c[tn_w],"hidden");
		tn_af(c,tn_c)
	}var d=this.Ed?5:6;
	b.reposition(c,d,new tn_0e(0,0,0,0));
	if(!this.g.r) {
		tn_af(c,tn_a);
		tn_Ga(c[tn_w],"visible")
	}
};
tn_2[tn_].Sf=function () {
	this.se()
};
tn_2[tn_].bc=function (a,b) {
	var c=this.da(),d=b?c.listen:c.unlisten;
	d[tn_z](c,a,"action",this.oc);
	d[tn_z](c,a,tn_if,this.nc);
	d[tn_z](c,a,tn_jf,this.pc)
};
tn_2[tn_].nc=function (a) {
	tn_tf(this.c(),tn_rf,a[tn_y].c().id)
};
tn_2[tn_].pc=function () {
	this.g.jb()||tn_tf(this.c(),tn_rf,tn_b)
};
tn_2[tn_].Xe=function (a) {
	var b=this.da(),c=a?b.listen:b.unlisten;
	c[tn_z](b,this.q.R,tn_xe,this.qf,tn_c);
	this.dd&&c[tn_z](b,this.g,"blur",this.uf);
	c[tn_z](b,this.D,"tick",this.Sf);
	a?this.D[tn_ob]():this.D[tn_Ja]()
};
tn_If("goog-menu-button",function () {
	return new tn_2(tn_b)
});
var tn_3=function (a) {
	tn_U[tn_z](this);
	this.Ia=[];
	this.Dd(a)
};
tn_O(tn_3,tn_U);
tn_3[tn_].Ia=tn_b;
tn_3[tn_].Ya=tn_b;
tn_3[tn_].we=tn_b;
tn_3[tn_].Ga=function () {
	return this.Ia[tn_n]
};
tn_3[tn_].Gf=function (a) {
	return a?tn_ac(this.Ia,a):-1
};
tn_3[tn_].ea=function (a) {
	return this.Ia[a]||tn_b
};
tn_3[tn_].Dd=function (a) {
	if(a) {
		tn_bc(a,function (b) {
			this.Ac(b,tn_a)
		},this);
		tn_mc(this.Ia,a)
	}
};
tn_3[tn_].Z=function (a) {
	this.ja(a,this.Ga())
};
tn_3[tn_].ja=function (a,b) {
	if(a) {
		this.Ac(a,tn_a);
		tn_ic(this.Ia,a,b)
	}
};
tn_3[tn_].Ib=function () {
	return this.Ya
};
tn_3[tn_].La=function (a) {
	if(a!=this.Ya) {
		this.Ac(this.Ya,tn_a);
		this.Ya=a;
		this.Ac(a,tn_c)
	}this[tn_v]("select")
};
tn_3[tn_].Hb=function () {
	return this.Gf(this.Ya)
};
tn_3[tn_].zb=function (a) {
	this.La(this.ea(a))
};
tn_Aa(tn_3[tn_],function () {
	tn_gc(this.Ia);
	this.Ya=tn_b
});
tn_3[tn_].b=function () {
	tn_3.a.b[tn_z](this);
	this.Ia=tn_b;
	this.Ya=tn_b
};
tn_3[tn_].Ac=function (a,b) {
	if(a)if(typeofthis.we=="function")this.we(a,b);
	else typeofa.xd=="function"&&a.xd(b)
};
var tn_4=function (a,b,c,d) {
	tn_2[tn_z](this,a,b,c,d);
	this.ye(a)
};
tn_O(tn_4,tn_2);
tn_4[tn_].v=tn_b;
tn_4[tn_].Lc=tn_b;
tn_4[tn_].z=function () {
	tn_4.a.z[tn_z](this);
	this.Bd()
};
tn_4[tn_].aa=function (a) {
	tn_4.a.aa[tn_z](this,a);
	var b=this.J();
	b?this.ye(b):this.zb(0)
};
tn_4[tn_].b=function () {
	tn_4.a.b[tn_z](this);
	if(this.v) {
		this.v.dispose();
		this.v=tn_b
	}this.Lc=tn_b
};
tn_4[tn_].oc=function (a) {
	this.La(a[tn_y]);
	tn_4.a.oc[tn_z](this,a);
	a[tn_3a]();
	this[tn_v]("action")
};
tn_4[tn_].wf=function () {
	var a=this.Ib();
	tn_4.a.P[tn_z](this,a&&a.j());
	this.Bd()
};
tn_4[tn_].yb=function (a) {
	var b=tn_4.a.yb[tn_z](this,a);
	if(a!=b) {
		this.v&&this.v.clear();
		if(a)this.v?this.v.Dd(a.ic()):this.Kc(a.ic())
	}return b
};
tn_4[tn_].ye=function (a) {
	this.Lc=a;
	this.Bd()
};
tn_4[tn_].Z=function (a) {
	tn_4.a.Z[tn_z](this,a);
	this.v?this.v.Z(a):this.Kc(this.Sa().ic())
};
tn_4[tn_].ja=function (a,b) {
	tn_4.a.ja[tn_z](this,a,b);
	this.v?this.v.ja(a,b):this.Kc(this.Sa().ic())
};
tn_4[tn_].La=function (a) {
	this.v&&this.v.La(a)
};
tn_4[tn_].zb=function (a) {
	this.v&&this.La(this.v.ea(a))
};
tn_4[tn_].P=function (a) {
	if(tn_0b(a)&&!(a===tn_b)&&this.v)for(var b=0,c;c=this.v.ea(b);b++)if(c&&typeofc.j=="function"&&c.j()==a) {
		this.La(c);
		return
	}this.La(tn_b)
};
tn_4[tn_].Ib=function () {
	return this.v?this.v.Ib():tn_b
};
tn_4[tn_].Hb=function () {
	return this.v?this.v.Hb():-1
};
tn_4[tn_].Kc=function (a) {
	this.v=new tn_3(a);
	this.da().listen(this.v,"select",this.wf)
};
tn_4[tn_].Bd=function () {
	var a=this.Ib();
	this.ha(a?a.J():this.Lc)
};
tn_4[tn_].w=function (a) {
	tn_4.a.w[tn_z](this,a);
	this[tn_kb]()&&this.Sa().$a(this.Hb())
};
tn_If("goog-select",function () {
	return new tn_4(tn_b)
});
var tn_5=function (a,b) {
	var c;
	if(ainstanceoftn_5) {
		this.ab(b==tn_b?a.ma:b);
		this.wd(a.qa);
		this.yd(a.Yb);
		this.md(a.ba);
		this.ud(a.ub);
		this.td(a.Sb);
		this.vd(a.Ka.clone());
		this.nd(a.Fb)
	}else if(a&&(c=tn_da(a)[tn_ib](tn_9f()))) {
		this.ab(!!b);
		this.wd(c[1],tn_c);
		this.yd(c[2],tn_c);
		this.md(c[3],tn_c);
		this.ud(c[4]);
		this.td(c[5],tn_c);
		this.vd(c[6]);
		this.nd(c[7],tn_c)
	}else {
		this.ab(!!b);
		this.Ka=new tn_$f(tn_b,this,this.ma)
	}
};
tn_5[tn_].qa="";
tn_5[tn_].Yb="";
tn_5[tn_].ba="";
tn_5[tn_].ub=tn_b;
tn_5[tn_].Sb="";
tn_5[tn_].Fb="";
tn_5[tn_].Kf=tn_a;
tn_5[tn_].ma=tn_a;
tn_ma(tn_5[tn_],function () {
	if(this.Q)return this.Q;
	var a=[];
	this.qa&&a[tn_m](tn_ag(this.qa,tn_bg),":");
	if(this.ba) {
		a[tn_m]("//");
		this.Yb&&a[tn_m](tn_ag(this.Yb,tn_bg),"@");
		a[tn_m](tn_cg(this.ba));
		this.ub!=tn_b&&a[tn_m](":",tn_da(this.ub))
	}this.Sb&&a[tn_m](tn_ag(this.Sb,tn_dg));
	var b=tn_da(this.Ka);
	b&&a[tn_m]("?",b);
	this.Fb&&a[tn_m]("#",tn_ag(this.Fb,tn_eg));
	return this.Q=a[tn_K]("")
});
tn_5[tn_].clone=function () {
	return tn_fg(this.qa,this.Yb,this.ba,this.ub,this.Sb,this.Ka.clone(),this.Fb,this.ma)
};
tn_5[tn_].wd=function (a,b) {
	this.Na();
	delete this.Q;
	this.qa=b?a?tn_ha(a):"":a;
	if(this.qa)this.qa=this.qa[tn_p](/:$/,"");
	return this
};
tn_5[tn_].yd=function (a,b) {
	this.Na();
	delete this.Q;
	this.Yb=b?a?tn_ha(a):"":a;
	return this
};
tn_5[tn_].md=function (a,b) {
	this.Na();
	delete this.Q;
	this.ba=b?a?tn_ha(a):"":a;
	return this
};
tn_5[tn_].ud=function (a) {
	this.Na();
	delete this.Q;
	if(a) {
		a=tn_ea(a);
		if(isNaN(a)||a<0)tn_d(Error("Bad port number "+a));
		this.ub=a
	}else this.ub=tn_b;
	return this
};
tn_5[tn_].td=function (a,b) {
	this.Na();
	delete this.Q;
	this.Sb=b?a?tn_ha(a):"":a;
	return this
};
tn_5[tn_].vd=function (a) {
	this.Na();
	delete this.Q;
	if(ainstanceoftn_$f) {
		this.Ka=a;
		this.Ka.Oe=this;
		this.Ka.ab(this.ma)
	}else this.Ka=new tn_$f(a,this,this.ma);
	return this
};
tn_5[tn_].nd=function (a,b) {
	this.Na();
	delete this.Q;
	this.Fb=b?a?tn_ha(a):"":a;
	return this
};
tn_5[tn_].Na=function () {
	if(this.Kf)tn_d(Error("Tried to modify a read-only Uri"))
};
tn_5[tn_].ab=function (a) {
	this.ma=a;
	this.Ka&&this.Ka.ab(a)
};
var tn_gg=function (a,b) {
	return ainstanceoftn_5?a.clone():new tn_5(a,b)
},tn_fg=function (a,b,c,d,e,f,g,i) {
	var j=new tn_5(tn_b,i);
	a&&j.wd(a);
	b&&j.yd(b);
	c&&j.md(c);
	d&&j.ud(d);
	e&&j.td(e);
	f&&j.vd(f);
	g&&j.nd(g);
	return j
};
var tn_cg=function (a) {
	if(tn_N(a))return tn_ba(a);
	return tn_b
},tn_hg=/^[a-zA-Z0-9\-_.!~*'():\/;?]*$/,tn_ag=function(a,b) {var c=tn_b;if(tn_N(a)) {c=a;tn_hg[tn_Ma](c)||(c=encodeURI(a));if(c[tn_gb](b)>=0)c=c[tn_p](b,tn_ig)}return c},tn_ig=function(a) {var b=a.charCodeAt(0);return"%"+(b>>4&15).toString(16)+(b&15).toString(16)},tn_jg=tn_b,tn_9f=function() {tn_jg||(tn_jg=/^(?:([^:\/?#]+):)?(?:\/\/(?:([^\/?#]*)@)?([^\/?#:@]*)(?::([0-9]+))?)?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/);return tn_jg},tn_bg=/[#\/\?@]/g,tn_dg=/[\#\?]/g,tn_eg=/#/g,tn_$f=function(a,b,c) {this.G=new tn_Ld;this.Oe=b||tn_b;this.ma=!!c;if(a) {var d=a[tn_r]("&");for(var e=0;e<d[tn_n];e++) {var f=d[e][tn_u]("="),g=tn_b,i=tn_b;if(f>=0) {g=d[e][tn_C](0,f);i=d[e][tn_C](f+1)}else g=d[e];g=tn_Gc(g);g=this.Qa(g);this.add(g,i?tn_Gc(i):"")}}};tn_$f[tn_].u=0;tn_$f[tn_].add=function(a,b) {this.Lb();a=this.Qa(a);if(this.ua(a)) {var c=this.G.get(a);tn_M(c)?c[tn_m](b):this.G.set(a,[c,b])}else this.G.set(a,b);this.u++;return this};tn_$f[tn_].remove=function(a) {a=this.Qa(a);if(this.G.ua(a)) {this.Lb();var b=this.G.get(a);if(tn_M(b))this.u-=b[tn_n];else this.u--;return this.G.remove(a)}return tn_a};tn_Aa(tn_$f[tn_],function() {this.Lb();this.G.clear();this.u=0});tn_$f[tn_].ua=function(a) {a=this.Qa(a);return this.G.ua(a)};tn_$f[tn_].Ra=function() {var a=this.G.Ha(),b=this.G.Ra(),c=[];for(var d=0;d<b[tn_n];d++) {var e=a[d];if(tn_M(e))for(var f=0;f<e[tn_n];f++)c[tn_m](b[d]);else c[tn_m](b[d])}return c};tn_$f[tn_].Ha=function(a) {var b;if(a) {var c=this.Qa(a);if(this.ua(c)) {var d=this.G.get(c);if(tn_M(d))return d;else{b=[];b[tn_m](d)}}else b=[]}else{var e=this.G.Ha();b=[];for(var f=0;f<e[tn_n];f++) {var g=e[f];tn_M(g)?tn_mc(b,g):b[tn_m](g)}}return b};tn_$f[tn_].set=function(a,b) {this.Lb();a=this.Qa(a);if(this.ua(a)) {var c=this.G.get(a);if(tn_M(c))this.u-=c[tn_n];else this.u--}this.G.set(a,b);this.u++;return this};tn_$f[tn_].get=function(a,b) {a=this.Qa(a);if(this.ua(a)) {var c=this.G.get(a);return tn_M(c)?c[0]:c}else return b};tn_ma(tn_$f[tn_],function() {if(this.Q)return this.Q;var a=[],b=0,c=this.G.Ra();for(var d=0;d<c[tn_n];d++) {var e=c[d],f=tn_Fc(e),g=this.G.get(e);if(tn_M(g))for(var i=0;i<g[tn_n];i++) {b>0&&a[tn_m]("&");a[tn_m](f,"=",tn_Fc(g[i]));b++}else{b>0&&a[tn_m]("&");a[tn_m](f,"=",tn_Fc(g));b++}}return this.Q=a[tn_K]("")});tn_$f[tn_].Lb=function() {delete this.Q;this.Oe&&delete this.Oe.Q};tn_$f[tn_].clone=function() {var a=new tn_$f;a.G=this.G.clone();return a};tn_$f[tn_].Qa=function(a) {var b=tn_da(a);if(this.ma)b=b[tn_Ob]();return b};tn_$f[tn_].ab=function(a) {var b=a&&!this.ma;if(b) {this.Lb();tn_Kd(this.G,function(c,d) {var e=d[tn_Ob]();if(d!=e) {this.remove(d);this.add(e,c)}},this)}this.ma=a};var tn_kg=function(a,b) {this.la=a;this.zg=!!b;this.fe=this.ee();if(!this.fe) {var c=tn_P&&!tn_5c("7"),d=c?"readystatechange":"load";this.yc=tn_T(this.la,d,this.$d,tn_a,this);this.be=tn_f.setInterval(tn_8b(this.$d,this),100)}};tn_O(tn_kg,tn_U);tn_kg[tn_].yc=tn_b;tn_kg[tn_].le=function() {if(this.be) {tn_f.clearInterval(this.be);this.be=tn_b}};tn_kg[tn_].b=function() {delete this.la;this.le();tn_te(this.yc);tn_kg.a.b[tn_z](this)};tn_kg[tn_].ee=function() {var a=tn_a;try{a=tn_P?this.la.readyState=="complete":!!tn_xd(this.la)[tn_bb]&&(!this.zg||!!tn_xd(this.la)[tn_bb][tn_B])}catch(b) {}return a};tn_kg[tn_].$d=function() {if(this.ee()) {this.le();tn_te(this.yc);this.yc=tn_b;this.fe=tn_c;this[tn_v]("ifload")}};var tn_6=function(a,b,c,d) {tn_U[tn_z](this);if(a&&!b)tn_d(Error("Can'tuseinvisiblehistorywithoutprovidingablankpage."));var e;if(c)e=c;else{var f="history_state"+tn_lg;tn_ga.write(tn_Bc('<input type="text" name="%s" id="%s" style="display:none" />',f,f));e=tn_fd(f)}this.Zc=e;this.db=c?tn_ld(tn_dd(c)):tn_f;this.vg=this.db[tn_5a][tn_xb][tn_r]("#")[0]+"#";this.bd=b;if(tn_P&&!b)this.bd=tn_f[tn_5a].protocol=="https"?"https:///":'javascript:""';this.D=new tn_Fe(150);this.Zb=!a;this.eb=new tn_wf(this);if(a||tn_P) {var g;if(d)g=d;else{var i="history_iframe"+tn_lg,j=this.bd?'src="'+tn_Nc(this.bd)+'"':"";tn_ga.write(tn_Bc('<iframe id="%s" style="display:none" %s></iframe>',i,j));g=tn_fd(i)}this.la=g;this.rg=tn_c;this.Ff=new tn_kg(this.la);this.Ff.fe?this.Zd():this.eb.listen(this.Ff,"ifload",this.Zd)}if(tn_P) {this.eb.listen(this.db,"load",this.Pf);this.documentLoaded=tn_a;this.ng=tn_a}this.Zb&&this.pd(this.lb(),tn_c);tn_lg++};tn_O(tn_6,tn_U);tn_6[tn_].S=tn_a;tn_6[tn_].xc=tn_a;tn_6[tn_].Qb=tn_b;tn_6[tn_].tb=tn_b;tn_6[tn_].b=function() {tn_6.a.b[tn_z](this);this.eb.dispose();this.L(tn_a)};tn_6[tn_].Zd=function() {tn_1b(this.hc())&&this.xb(this.Zc[tn_s])};tn_6[tn_].L=function(a) {if(a==this.S)return;if(tn_P&&!this.documentLoaded) {this.ng=a;return}if(a) {if(tn_2c)this.eb.listen(this.db[tn_Wa],tn_mg,this.Tf);else tn_3c&&this.eb.listen(this.db,"pageshow",this.Rf);if(!tn_P||this.documentLoaded) {this.eb.listen(this.D,"tick",this.qe);this.S=tn_c;if(!tn_P)this.Qb=this.lb();this.D[tn_ob]();this[tn_v](new tn_ng(this.lb()))}}else{this.S=tn_a;this.eb.zc();this.D[tn_Ja]()}};tn_6[tn_].Pf=function() {this.documentLoaded=tn_c;this.xb(this.Zc[tn_s],tn_c);this.L(this.ng)};tn_6[tn_].Rf=function(a) {if(a.M.persisted) {this.L(tn_a);this.L(tn_c)}};tn_6[tn_].lb=function() {return this.tb!==tn_b?this.tb:this.Zb?this.Tc(this.db):this.hc()||""};tn_6[tn_].kg=function(a,b) {this.De(a,tn_a,b)};tn_6[tn_].ve=function(a,b) {this.De(a,tn_c,b)};tn_6[tn_].Tc=function(a) {var b=a[tn_5a][tn_xb],c=b[tn_u]("#");return c<0?"":b[tn_C](c+1)};tn_6[tn_].De=function(a,b,c) {if(this.lb()!=a)if(this.Zb) {this.pd(a,b);tn_P&&this.xb(a,b,c);this.S&&this.qe()}else{this.xb(a,b);this.tb=this.Qb=tn_i(this.Zc,a);this[tn_v](new tn_ng(a))}};tn_6[tn_].pd=function(a,b) {var c=this.vg+(a||""),d=this.db[tn_5a];if(c!=d[tn_xb])if(b)d[tn_p](c);else d.href=c};tn_6[tn_].xb=function(a,b,c) {if(!tn_og&&(this.rg||a!=this.hc())) {a=tn_Fc(a);if(tn_P) {var d=tn_xd(this.la);d.open("text/html",b?"replace":tn_e);d.write(tn_Bc("<title>%s</title><body>%s</body>",tn_Nc(c||this.db[tn_Wa].title),a));d.close()}else{var e=this.bd+"#"+a,f=this.la[tn_Jb];if(f)if(b)f[tn_5a][tn_p](e);else f[tn_5a].href=e}this.rg=tn_a}};tn_6[tn_].hc=function() {if(tn_P) {var a=tn_xd(this.la);return a[tn_bb]?tn_Gc(a[tn_bb][tn_Za]):tn_b}else if(tn_og)return tn_b;else{var b=this.la[tn_Jb];if(b) {var c;try{c=tn_Gc(this.Tc(b))}catch(d) {this.xc||this.Fe(tn_c);return tn_b}this.xc&&this.Fe(tn_a);return c||tn_b}else return tn_b}};tn_6[tn_].qe=function() {if(this.Zb) {var a=this.Tc(this.db);a!=this.Qb&&this.Ne(a)}if(!this.Zb||tn_P) {var b=this.hc()||"";if(this.tb==tn_b||b==this.tb) {this.tb=tn_b;b!=this.Qb&&this.Ne(b)}}};tn_6[tn_].Ne=function(a) {this.Qb=tn_i(this.Zc,a);if(this.Zb) {tn_P&&this.xb(a);this.pd(a)}else this.xb(a);this[tn_v](new tn_ng(this.lb()))};tn_6[tn_].Fe=function(a) {if(this.xc!=a)this.D.setInterval(a?10000:150);this.xc=a};tn_6[tn_].Tf=function() {this.D[tn_Ja]();this.D[tn_ob]()};var tn_og=tn_Q&&tn_Pc(tn_Wc,"419")<=0,tn_mg=[tn_xe,"keydown","mousemove"],tn_lg=0,tn_ng=function(a) {tn_5d[tn_z](this,"navigate");this.token=a};tn_O(tn_ng,tn_5d);function tn_pg(a,b,c) {this.x=a;this.y=b;this.coordinateFrame=c||tn_b}tn_ma(tn_pg[tn_],function() {return"[P "+this.x+","+this.y+"]"});tn_pg[tn_].clone=function() {return new tn_pg(this.x,this.y,this.coordinateFrame)};var tn_qg=(function() {var a=[" ","\u0120",-1,"!","\u0120",-1,"\u0120","\u0120",0,"\u0121","\u0120",-1,"\u0121","\u0120|\u0121",0,"\u0122","\u0120|\u0121",-1,"\u0120","[\u0120]",0,"\u0121","[\u0120]",-1,"\u0121","[\u0120\u0121]",0,"\u0122","[\u0120\u0121]",-1,"\u0121","[\u0120-\u0121]",0,"\u0122","[\u0120-\u0121]",-1];for(var b=0;b<a[tn_n];b+=3)if(a[b][tn_gb](new RegExp(a[b+1]))!=a[b+2])return tn_a;return tn_c})(),tn_rg="([ \t\r\n]+)?=([ \t\r\n]+)?",tn_sg="&#[0-9]+;|&#x[0-9a-fA-F]+;",tn_tg="[ \t\r\n]+version"+tn_rg+"(\"1\\.0\"|'1\\.0')",tn_ug=tn_qg?"A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0100-\u0131\u0134-\u013e\u0141-\u0148\u014a-\u017e\u0180-\u01c3\u01cd-\u01f0\u01f4-\u01f5\u01fa-\u0217\u0250-\u02a8\u02bb-\u02c1\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03ce\u03d0-\u03d6\u03da\u03dc\u03de\u03e0\u03e2-\u03f3\u0401-\u040c\u040e-\u044f\u0451-\u045c\u045e-\u0481\u0490-\u04c4\u04c7-\u04c8\u04cb-\u04cc\u04d0-\u04eb\u04ee-\u04f5\u04f8-\u04f9\u0531-\u0556\u0559\u0561-\u0586\u05d0-\u05ea\u05f0-\u05f2\u0621-\u063a\u0641-\u064a\u0671-\u06b7\u06ba-\u06be\u06c0-\u06ce\u06d0-\u06d3\u06d5\u06e5-\u06e6\u0905-\u0939\u093d\u0958-\u0961\u0985-\u098c\u098f-\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09dc-\u09dd\u09df-\u09e1\u09f0-\u09f1\u0a05-\u0a0a\u0a0f-\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32-\u0a33\u0a35-\u0a36\u0a38-\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8b\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2-\u0ab3\u0ab5-\u0ab9\u0abd\u0ae0\u0b05-\u0b0c\u0b0f-\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32-\u0b33\u0b36-\u0b39\u0b3d\u0b5c-\u0b5d\u0b5f-\u0b61\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99-\u0b9a\u0b9c\u0b9e-\u0b9f\u0ba3-\u0ba4\u0ba8-\u0baa\u0bae-\u0bb5\u0bb7-\u0bb9\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c60-\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cde\u0ce0-\u0ce1\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d28\u0d2a-\u0d39\u0d60-\u0d61\u0e01-\u0e2e\u0e30\u0e32-\u0e33\u0e40-\u0e45\u0e81-\u0e82\u0e84\u0e87-\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa-\u0eab\u0ead-\u0eae\u0eb0\u0eb2-\u0eb3\u0ebd\u0ec0-\u0ec4\u0f40-\u0f47\u0f49-\u0f69\u10a0-\u10c5\u10d0-\u10f6\u1100\u1102-\u1103\u1105-\u1107\u1109\u110b-\u110c\u110e-\u1112\u113c\u113e\u1140\u114c\u114e\u1150\u1154-\u1155\u1159\u115f-\u1161\u1163\u1165\u1167\u1169\u116d-\u116e\u1172-\u1173\u1175\u119e\u11a8\u11ab\u11ae-\u11af\u11b7-\u11b8\u11ba\u11bc-\u11c2\u11eb\u11f0\u11f9\u1e00-\u1e9b\u1ea0-\u1ef9\u1f00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2126\u212a-\u212b\u212e\u2180-\u2182\u3041-\u3094\u30a1-\u30fa\u3105-\u312c\uac00-\ud7a3":"A-Za-z",tn_vg=tn_qg?"\u4e00-\u9fa5\u3007\u3021-\u3029":"",tn_wg=tn_qg?"\u0300-\u0345\u0360-\u0361\u0483-\u0486\u0591-\u05a1\u05a3-\u05b9\u05bb-\u05bd\u05bf\u05c1-\u05c2\u05c4\u064b-\u0652\u0670\u06d6-\u06dc\u06dd-\u06df\u06e0-\u06e4\u06e7-\u06e8\u06ea-\u06ed\u0901-\u0903\u093c\u093e-\u094c\u094d\u0951-\u0954\u0962-\u0963\u0981-\u0983\u09bc\u09be\u09bf\u09c0-\u09c4\u09c7-\u09c8\u09cb-\u09cd\u09d7\u09e2-\u09e3\u0a02\u0a3c\u0a3e\u0a3f\u0a40-\u0a42\u0a47-\u0a48\u0a4b-\u0a4d\u0a70-\u0a71\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0b01-\u0b03\u0b3c\u0b3e-\u0b43\u0b47-\u0b48\u0b4b-\u0b4d\u0b56-\u0b57\u0b82-\u0b83\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0c01-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55-\u0c56\u0c82-\u0c83\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5-\u0cd6\u0d02-\u0d03\u0d3e-\u0d43\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb-\u0ebc\u0ec8-\u0ecd\u0f18-\u0f19\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86-\u0f8b\u0f90-\u0f95\u0f97\u0f99-\u0fad\u0fb1-\u0fb7\u0fb9\u20d0-\u20dc\u20e1\u302a-\u302f\u3099\u309a":"",tn_xg=tn_qg?"0-9\u0660-\u0669\u06f0-\u06f9\u0966-\u096f\u09e6-\u09ef\u0a66-\u0a6f\u0ae6-\u0aef\u0b66-\u0b6f\u0be7-\u0bef\u0c66-\u0c6f\u0ce6-\u0cef\u0d66-\u0d6f\u0e50-\u0e59\u0ed0-\u0ed9\u0f20-\u0f29":"0-9",tn_yg=tn_qg?"\u00b7\u02d0\u02d1\u0387\u0640\u0e46\u0ec6\u3005\u3031-\u3035\u309d-\u309e\u30fc-\u30fe":"",tn_zg=tn_ug+tn_vg,tn_Ag=tn_zg+tn_xg+"\\._:"+tn_wg+tn_yg+"-",tn_Bg="["+tn_zg+"_:]["+tn_Ag+"]*",tn_Cg="&"+tn_Bg+";",tn_Dg=tn_Cg+"|"+tn_sg,tn_Eg='"(([^<&"]|'+tn_Dg+")*)\"|'(([^<&']|"+tn_Dg+")*)'",tn_Fg="("+tn_Bg+")"+tn_rg+"("+tn_Eg+")",tn_Gg="[ \t\r\n]+version"+tn_rg+"(\"1\\.1\"|'1\\.1')",tn_Hg=tn_qg?":A-Z_a-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c-\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd":":A-Z_a-z",tn_Ig=tn_Hg+(tn_qg?"\\.0-9\u00b7\u0300-\u036f\u203f-\u2040-":"\\.0-9-"),tn_Jg="["+tn_Hg+"]["+tn_Ig+"]*",tn_Kg="&"+tn_Jg+";",tn_Lg=tn_Kg+"|"+tn_sg,tn_Mg='"(([^<&"]|'+tn_Lg+")*)\"|'(([^<&']|"+tn_Lg+")*)'",tn_Ng="("+tn_Jg+")"+tn_rg+"("+tn_Mg+")",tn_Og=tn_zg+tn_xg+"\\._"+tn_wg+tn_yg+"-",tn_Pg="["+tn_zg+"_]["+tn_Og+"]*";function tn_Qg() {}function tn_7(a) {a||tn_Rg("Assertion failed")}function tn_Sg(a,b) {var c=a[tn_u](b);if(c==-1)return[a];var d=[];d[tn_m](a[tn_Rb](0,c));while(c!=-1) {var e=a[tn_u](b,c+1);e!=-1?d[tn_m](a[tn_Rb](c+1,e-c-1)):d[tn_m](a[tn_Rb](c+1));c=e}return d}function tn_Tg(a,b) {if(b[tn_q]==3)return a[tn_2a](b[tn_L]);else if(b[tn_q]==4)return a[tn_ab](b[tn_L]);else if(b[tn_q]==1) {var c=a[tn_rb](b[tn_x]);for(var d=0;d<b[tn_G][tn_n];++d) {var e=b[tn_G][d],f=e[tn_x],g=e[tn_L];c[tn_wb](f,g)}for(var i=b[tn_B];i;i=i[tn_I]) {var j=arguments[tn_4a](a,i);c[tn_l](j)}return c}else return a[tn_Pb](b[tn_x])}function tn_Ug(a,b) {for(var c=0;c<a[tn_n];++c)b[tn_z](this,a[c],c)}function tn_Vg(a,b) {var c=[];for(var d=0;d<a[tn_n];++d)c[tn_m](b(a[d]));return c}function tn_Wg(a) {for(var b=0;b<a[tn_n]/2;++b) {var c=a[b],d=a[tn_n]-b-1;a[b]=a[d];a[d]=c}}function tn_Xg(a,b) {for(var c=0;c<b[tn_n];++c)a[tn_m](b[c])}function tn_Yg(a) {if(!a)return"";var b="";if(a[tn_q]==3||a[tn_q]==4||a[tn_q]==2)b+=a[tn_L];else if(a[tn_q]==1||a[tn_q]==9||a[tn_q]==11)for(var c=0;c<a[tn_F][tn_n];++c)b+=arguments[tn_4a](a[tn_F][c]);return b}function tn_Zg(a,b) {var c=[];tn__g(a,c,b);return c[tn_K]("")}function tn__g(a,b,c) {if(a[tn_q]==3)b[tn_m](tn_0g(a[tn_L]));else if(a[tn_q]==4)c?b[tn_m](a[tn_L]):b[tn_m]("<![CDATA["+a[tn_L]+"]]\>");else if(a[tn_q]==8)b[tn_m]("<!--"+a[tn_L]+"--\>");else if(a[tn_q]==1) {b[tn_m]("<"+tn_1g(a));for(var d=0;d<a[tn_G][tn_n];++d) {var e=a[tn_G][d];e&&e[tn_x]&&e[tn_L]&&b[tn_m](" "+tn_1g(e)+'="'+tn_0g(e[tn_L])[tn_p](/\"/g,"&quot;")+'"')}if(a[tn_F][tn_n]==0)b[tn_m]("/>");else{b[tn_m](">");for(var d=0;d<a[tn_F][tn_n];++d)arguments[tn_4a](a[tn_F][d],b,c);b[tn_m]("</"+tn_1g(a)+">")}}else if(a[tn_q]==9||a[tn_q]==11)for(var d=0;d<a[tn_F][tn_n];++d)arguments[tn_4a](a[tn_F][d],b,c)}function tn_1g(a) {return a.prefix&&a[tn_x][tn_u](a.prefix+":")!=0?a.prefix+":"+a[tn_x]:a[tn_x]}function tn_0g(a) {return(""+a)[tn_p](/&/g,"&amp;")[tn_p](/</g,"&lt;")[tn_p](/>/g,"&gt;")}function tn_2g(a,b,c) {return a[tn_wb](b,c)}function tn_3g(a,b) {return a[tn_l](b)}function tn_4g(a,b) {return a[tn_2a](b)}function tn_5g(a) {return a.createDocumentFragment()}function tn_Rg(a) {if(typeof Error!="undefined")tn_d(new Error(a||"Assertion Failed"));else tn_d(a)};function tn_6g(a) {var b=tn_Sg(a,"&"),c=b[0];for(var d=1;d<b[tn_n];++d) {var e=b[d][tn_u](";");if(e==-1) {c+=b[d];continue}var f=b[d][tn_C](0,e),g=b[d][tn_C](e+1),i;switch(f) {case "lt":i="<";break;case "gt":i=">";break;case "amp":i="&";break;case "quot":i='"';break;case "apos":i="'";break;case "nbsp":i=tn_da.fromCharCode(160);break;default:var j=tn_f[tn_Wa][tn_rb]("span");tn_h(j,"&"+f+"; ");i=j[tn_F][0][tn_L][tn_1a](0)}c+=i+g}return c}var tn_7g=new RegExp("^("+tn_Bg+")"),tn_8g=new RegExp(tn_Fg,"g"),tn_9g=new RegExp("^("+tn_Jg+")"),tn_$g=new RegExp(tn_Ng,"g");function tn_ah(a) {var b=/\/$/,c,d;if(a[tn_ib](/^<\?xml/))if(a[tn_gb](new RegExp(tn_tg))==5) {c=tn_7g;d=tn_8g}else if(a[tn_gb](new RegExp(tn_Gg))==5) {c=tn_9g;d=tn_$g}else tn_ia("VersionInfo is missing, or unknown version number.");else{c=tn_7g;d=tn_8g}var e=new tn_bh,f=e,g=[],i=f;g[tn_m](i);var j="",k=tn_Sg(a,"<");for(var l=1;l<k[tn_n];++l) {var m=tn_Sg(k[l],">"),n=m[0],o=tn_6g(m[1]||"");if(j) {var q=k[l][tn_u](j);if(q!=-1) {var r=k[l][tn_C](0,q);i.nodeValue+="<"+r;g.pop();i=g[g[tn_n]-1];o=k[l][tn_C](q+j[tn_n]);j=""}else{i.nodeValue+="<"+k[l];o=tn_b}}else if(n[tn_u]("![CDATA[")==0) {var t="![CDATA["[tn_n],q=k[l][tn_u]("]]\>");if(q!=-1) {var r=k[l][tn_C](t,q),p=e[tn_ab](r);i[tn_l](p)}else{var r=k[l][tn_C](t);o=tn_b;var p=e[tn_ab](r);i[tn_l](p);i=p;g[tn_m](p);j="]]\>"}}else if(n[tn_u]("!--")==0) {var t="!--"[tn_n],q=k[l][tn_u]("--\>");if(q!=-1) {var r=k[l][tn_C](t,q),p=e[tn_Pb](r);i[tn_l](p)}else{var r=k[l][tn_C](t);o=tn_b;var p=e[tn_Pb](r);i[tn_l](p);i=p;g[tn_m](p);j="--\>"}}else if(n[tn_1a](0)=="/") {g.pop();i=g[g[tn_n]-1]}else if(!(n[tn_1a](0)=="?"))if(!(n[tn_1a](0)=="!")) {var s=n[tn_ib](b),w=c[tn_Qa](n)[1],p=e[tn_rb](w),u;while(u=d[tn_Qa](n)) {var v=tn_6g(u[5]||u[7]||"");p[tn_wb](u[1],v)}i[tn_l](p);if(!s) {i=p;g[tn_m](p)}}o&&i!=f&&tn_3g(i,e[tn_2a](o))}return f}function tn_ch(a,b,c) {var d;if(b) {d=b[tn_z](tn_b,a);if(typeof d=="boolean"&&!d)return tn_a}for(var e=a[tn_B];e;e=e[tn_I])if(e[tn_q]==1) {d=arguments[tn_4a][tn_z](this,e,b,c);if(typeof d=="boolean"&&!d)return tn_a}if(c) {d=c[tn_z](tn_b,a);if(typeof d=="boolean"&&!d)return tn_a}}function tn_dh(a,b,c,d) {this.attributes=[];this.childNodes=[];tn_eh[tn_z](this,a,b,c,d)}var tn_eh=function(a,b,c,d) {this.nodeType=a-0;this.nodeName=""+b;this.nodeValue=""+c;this.ownerDocument=d;tn_wa(this,tn_b);tn_ua(this,tn_b);tn_Fa(this,tn_b);tn_la(this,tn_b);tn_Da(this,tn_b)},tn_fh=[],tn_gh=function(a) {if(!a)return;if(a[tn_0a]==tn_bh) {tn_gh(a[tn_Qb]);return}if(a[tn_0a]!=this)return;tn_fh[tn_m](a);for(var b=0;b<a[tn_G][tn_n];++b)tn_gh(a[tn_G][b]);for(var c=0;c<a[tn_F][tn_n];++c)tn_gh(a[tn_F][c]);tn_na(a[tn_G],0);tn_na(a[tn_F],0);tn_eh[tn_z](a,0,"","",tn_b)},tn_hh=function(a,b,c,d) {if(tn_fh[tn_n]>0) {var e=tn_fh.pop();tn_eh[tn_z](e,a,b,c,d);return e}else return new tn_dh(a,b,c,d)};tn_dh[tn_].appendChild=function(a) {if(this[tn_F][tn_n]==0)tn_wa(this,a);tn_la(a,this[tn_hb]);tn_Fa(a,tn_b);if(this[tn_hb])tn_Fa(this[tn_hb],a);tn_Da(a,this);tn_ua(this,a);this[tn_F][tn_m](a)};tn_dh[tn_].replaceChild=function(a,b) {if(b==a)return;for(var c=0;c<this[tn_F][tn_n];++c)if(this[tn_F][c]==b) {this[tn_F][c]=a;var d=b[tn_H];tn_Da(b,tn_b);tn_Da(a,d);d=b[tn_Ia];tn_la(b,tn_b);tn_la(a,d);if(a[tn_Ia])tn_Fa(a[tn_Ia],a);d=b[tn_I];tn_Fa(b,tn_b);tn_Fa(a,d);if(a[tn_I])tn_la(a[tn_I],a);if(this[tn_B]==b)tn_wa(this,a);if(this[tn_hb]==b)tn_ua(this,a);break}};tn_dh[tn_].insertBefore=function(a,b) {if(b==a)return;if(b[tn_H]!=this)return;a[tn_H]&&a[tn_H][tn_fb](a);var c=[];for(var d=0;d<this[tn_F][tn_n];++d) {var e=this[tn_F][d];if(e==b) {c[tn_m](a);tn_Da(a,this);tn_la(a,b[tn_Ia]);tn_la(b,a);if(a[tn_Ia])tn_Fa(a[tn_Ia],a);tn_Fa(a,b);if(this[tn_B]==b)tn_wa(this,a)}c[tn_m](e)}this.childNodes=c};tn_dh[tn_].removeChild=function(a) {var b=[];for(var c=0;c<this[tn_F][tn_n];++c) {var d=this[tn_F][c];if(d!=a)b[tn_m](d);else{if(d[tn_Ia])tn_Fa(d[tn_Ia],d[tn_I]);if(d[tn_I])tn_la(d[tn_I],d[tn_Ia]);if(this[tn_B]==d)tn_wa(this,d[tn_I]);if(this[tn_hb]==d)tn_ua(this,d[tn_Ia])}}this.childNodes=b};tn_dh[tn_].setAttribute=function(a,b) {for(var c=0;c<this[tn_G][tn_n];++c)if(this[tn_G][c][tn_x]==a) {this[tn_G][c].nodeValue=""+b;return}this[tn_G][tn_m](tn_hh(2,a,b,this))};tn_dh[tn_].getAttribute=function(a) {for(var b=0;b<this[tn_G][tn_n];++b)if(this[tn_G][b][tn_x]==a)return this[tn_G][b][tn_L];return tn_b};tn_dh[tn_].removeAttribute=function(a) {var b=[];for(var c=0;c<this[tn_G][tn_n];++c)this[tn_G][c][tn_x]!=a&&b[tn_m](this[tn_G][c]);this.attributes=b};tn_dh[tn_].getElementsByTagName=function(a) {var b=[];tn_ch(this,function(c) {c[tn_x]==a&&b[tn_m](c)},tn_b);return b};tn_dh[tn_].getElementById=function(a) {var b=tn_b;tn_ch(this,function(c) {if(c[tn_qb]("id")==a) {b=c;return tn_a}},tn_b);return b};function tn_bh() {tn_dh[tn_z](this,9,"#document",tn_b,tn_b);this.documentElement=tn_b}tn_bh.prototype=new tn_dh(9,"#document");tn_Aa(tn_bh[tn_],function() {tn_gh(this[tn_Qb]);this.documentElement=tn_b});tn_bh[tn_].appendChild=function(a) {tn_dh[tn_][tn_l][tn_z](this,a);this.documentElement=this[tn_F][0]};tn_bh[tn_].createElement=function(a) {return tn_hh(1,a,tn_b,this)};tn_bh[tn_].createDocumentFragment=function() {return tn_hh(11,"#document-fragment",tn_b,this)};tn_bh[tn_].createTextNode=function(a) {return tn_hh(3,"#text",a,this)};tn_bh[tn_].createComment=function(a) {return tn_hh(8,"#comment",a,this)};tn_bh[tn_].createCDATASection=function(a) {return tn_hh(4,"#cdata-section",a,this)};function tn_ih(a,b) {tn_jh(new tn_kh(a,b),b)}function tn_jh(a,b) {var c=b[tn_qb]("select");if(c) {b[tn_Eb]("select");tn_lh(a,b,c);return}var d=b[tn_qb]("display");if(d)if(tn_mh(d,a).o())b[tn_Eb]("display");else{b[tn_H][tn_fb](b);return}var e=b[tn_qb]("values");if(e) {b[tn_Eb]("values");tn_nh(a,b,e)}var f=b[tn_qb]("transclude");if(f) {var g=tn_oh(f,b[tn_eb]);if(g) {b[tn_H].replaceChild(g,b);tn_jh(a,g)}else b[tn_H][tn_fb](b);tn_gh(b);return}var i=b[tn_qb]("content");if(i) {b[tn_Eb]("content");tn_ph(a,b,i)}else{var j=[];for(var k=0;k<b[tn_F][tn_n];++k)b[tn_F][k][tn_q]==1&&j[tn_m](b[tn_F][k]);for(var k=0;k<j[tn_n];++k)tn_jh(a,j[k])}}function tn_lh(a,b,c) {var d=c[tn_r](/;/),e=tn_mh(d[0],a).l();if(e[tn_n]>0) {var f=[];for(var g=1;g<e[tn_n];++g) {var i=tn_Tg(b[tn_eb],b);f[tn_m](i);b[tn_H][tn_7a](i,b)}f[tn_m](b);var j=[];for(var k=1;k<d[tn_n];++k) {var l=d[k],m=0,n;if(l[tn_1a](m)=="#") {n="number";m++}else n="text";var o;if(l[tn_1a](m)=="-") {o="descending";m++}else o="ascending";var q=tn_qh(d[k][tn_Rb](m));j[tn_m]({expr:q,type:n,order:o})}var r=a.clone(e[0],0,e);tn_rh(r,j);for(var g=0;g<r.nodelist[tn_n];++g)r.nodelist[g][tn_q]==1&&tn_jh(r.clone(r.nodelist[g],g),f[g])}else b[tn_H][tn_fb](b)}function tn_nh(a,b,c) {var d=c[tn_r](/;/);for(var e=0;e<d[tn_n];++e) {var f=d[e][tn_u](":");if(f<0)continue;var g=d[e][tn_Rb](0,f),i=tn_mh(d[e][tn_Rb](f+1),a);if(g[tn_1a](0)=="$")a.Je(g[tn_Rb](1),i);else g&&tn_2g(b,g,i.f())}}function tn_ph(a,b,c) {while(b[tn_B])b[tn_fb](b[tn_B]);var d=tn_mh(c,a);if(d[tn_D]=="node-set")for(var e=0;e<d[tn_s][tn_n];++e) {var f=d[tn_s][e];if(f[tn_q]==1)for(var g=f[tn_B];g;g=g[tn_I]) {var i=tn_Tg(b[tn_eb],g);b[tn_l](i)}else if(f[tn_q]==2) {var j=b[tn_eb][tn_2a](f[tn_L]);b[tn_l](j)}}else{var j=tn_4g(b[tn_eb],d.f());b[tn_l](j)}}function tn_mh(a,b) {var c=tn_qh(a),d=c[tn_t](b);return d}function tn_oh(a,b) {var c=b[tn_Ya](a);if(c) {var d=tn_Tg(b,c);return d}else return tn_b};function tn_qh(a) {tn_sh();var b=tn_th[a];if(b)return b;if(a[tn_ib](/^(\$|@)?\w+$/i)) {var c=tn_uh(a);tn_th[a]=c;return c}if(a[tn_ib](/^\w+(\/\w+)*$/i)) {var c=tn_vh(a);tn_th[a]=c;return c}var d=a,e=[],f=tn_b,g=tn_b,i=tn_a,j=0,k=0,l=0;while(!i) {j++;a=a[tn_p](/^\s*/,"");g=f;f=tn_b;var m=tn_b,n="";for(var o=0;o<tn_wh[tn_n];++o) {var q=tn_wh[o].re[tn_Qa](a);k++;if(q&&q[tn_n]>0&&q[0][tn_n]>n[tn_n]) {m=tn_wh[o];n=q[0];break}}if(m&&(m==tn_xh||m==tn_yh||m==tn_zh||m==tn_Ah)&&(!g||g.tag==tn_Bh||g.tag==tn_Ch||g.tag==tn_Dh||g.tag==tn_Eh||g.tag==tn_Fh))m=tn_Gh;if(m) {a=a[tn_Rb](n[tn_n]);f={tag:m,match:n,prec:m.prec?m.prec:0,expr:new tn_Hh(n)}}else i=tn_c;while(tn_Ih(e,f)) {l++;tn_Qg("stack: "+tn_Jh(e))}}tn_Qg("stack: "+tn_Jh(e));e[tn_n]!=1&&tn_Rg("XPath parse error "+d+":\n"+tn_Jh(e));var q=e[0].expr;tn_th[d]=q;return q}var tn_th={};function tn_Ih(a,b) {var c=tn_b;if(a[tn_n]>0) {var d=a[a[tn_n]-1],e=tn_Kh[d.tag.key];if(e)for(var f=0;f<e[tn_n];++f) {var g=e[f],i=tn_Lh(a,g[1]);if(i[tn_n]) {c={tag:g[0],rule:g,match:i};c.prec=tn_Mh(c);break}}}var j;if(c&&(!b||c.prec>b.prec||b.tag[tn_db]&&c.prec>=b.prec)) {for(var f=0;f<c[tn_ib].matchlength;++f)a.pop();var k=tn_Vg(c[tn_ib],function(l) {return l.expr});c.expr=c.rule[3][tn_E](tn_b,k);a[tn_m](c);j=tn_c}else{b&&a[tn_m](b);j=tn_a}return j}function tn_Lh(a,b) {var c=a[tn_n],d=b[tn_n],e,f,g=[];g.matchlength=0;var i=0;for(e=d-1,f=c-1;e>=0&&f>=0;--e,f-=i) {i=0;var j=[];if(b[e]==tn_Nh) {e-=1;g[tn_m](j);while(f-i>=0&&a[f-i].tag==b[e]) {j[tn_m](a[f-i]);i+=1;g.matchlength+=1}}else if(b[e]==tn_Oh) {e-=1;g[tn_m](j);while(f-i>=0&&i<2&&a[f-i].tag==b[e]) {j[tn_m](a[f-i]);i+=1;g.matchlength+=1}}else if(b[e]==tn_Ph) {e-=1;g[tn_m](j);if(a[f].tag==b[e])while(f-i>=0&&a[f-i].tag==b[e]) {j[tn_m](a[f-i]);i+=1;g.matchlength+=1}else return[]}else if(a[f].tag==b[e]) {g[tn_m](a[f]);i+=1;g.matchlength+=1}else return[];tn_Wg(j);j.expr=tn_Vg(j,function(k) {return k.expr})}tn_Wg(g);return e==-1?g:[]}function tn_Mh(a) {var b=0;if(a.rule)if(a.rule[tn_n]>=3&&a.rule[2]>=0)b=a.rule[2];else for(var c=0;c<a.rule[1][tn_n];++c) {var d=a.rule[1][c].prec||2;b=tn_g.max(b,d)}else if(a.tag)b=a.tag.prec||2;else if(a[tn_n])for(var e=0;e<a[tn_n];++e) {var d=tn_Mh(a[e]);b=tn_g.max(b,d)}return b}function tn_Jh(a) {var b="";for(var c=0;c<a[tn_n];++c) {if(b)b+="\n";b+=a[c].tag.label}return b}function tn_kh(a,b,c,d,e) {this.node=a;this.stylesheet=b||tn_b;tn_oa(this,c||0);this.nodelist=d||[a];this.variables={};this.parent=e||tn_b;this.root=e?e.root:this.node[tn_q]==9?a:a[tn_eb]}tn_kh[tn_].clone=function(a,b,c) {return new tn_kh(a||this.node,this.stylesheet,typeof b!="undefined"?b:this[tn_Ka],c||this.nodelist,this)};tn_kh[tn_].Je=function(a,b) {this.variables[a]=b};tn_kh[tn_].Uc=function(a) {return typeof this.variables[a]!="undefined"?this.variables[a]:this.parent?this.parent.Uc(a):tn_b};tn_kh[tn_].gg=function(a) {this.node=this.nodelist[a];tn_oa(this,a)};function tn_Qh(a) {tn_i(this,a);tn_za(this,"string")}tn_Qh[tn_].f=function() {return this[tn_s]};tn_Qh[tn_].o=function() {return this[tn_s][tn_n]>0};tn_Qh[tn_].i=function() {return this[tn_s]-0};tn_Qh[tn_].l=function() {tn_Rg(this)};function tn_8(a) {tn_i(this,a);tn_za(this,"boolean")}tn_8[tn_].f=function() {return""+this[tn_s]};tn_8[tn_].o=function() {return this[tn_s]};tn_8[tn_].i=function() {return this[tn_s]?1:0};tn_8[tn_].l=function() {tn_Rg(this)};function tn_9(a) {tn_i(this,a);tn_za(this,"number")}tn_9[tn_].f=function() {return""+this[tn_s]};tn_9[tn_].o=function() {return!!this[tn_s]};tn_9[tn_].i=function() {return this[tn_s]-0};tn_9[tn_].l=function() {tn_Rg(this)};function tn_Rh(a) {tn_i(this,a);tn_za(this,"node-set")}tn_Rh[tn_].f=function() {return this[tn_s][tn_n]==0?"":tn_Yg(this[tn_s][0])};tn_Rh[tn_].o=function() {return this[tn_s][tn_n]>0};tn_Rh[tn_].i=function() {return this.f()-0};tn_Rh[tn_].l=function() {return this[tn_s]};function tn_Hh(a) {tn_i(this,a)}tn_j(tn_Hh[tn_],function() {return new tn_Qh(this[tn_s])});function tn_Sh() {this.absolute=tn_a;this.rootExpr=tn_b;this.steps=[]}tn_Sh[tn_].sa=function(a) {this.steps[tn_m](a)};tn_Sh[tn_].te=function(a) {this.steps[tn_Lb](a)};tn_j(tn_Sh[tn_],function(a) {var b;b=this.rootExpr?this.rootExpr[tn_t](a).l():this.absolute?[a.root]:[a.node];var c=[];for(var d=0;d<b[tn_n];++d) {var e=b[d];tn_Th(c,this.steps,0,e,a)}return new tn_Rh(c)});function tn_Th(a,b,c,d,e) {var f=b[c],g=e.clone(d),i=f[tn_t](g).l();for(var j=0;j<i[tn_n];++j)c==b[tn_n]-1?a[tn_m](i[j]):tn_Th(a,b,c+1,i[j],e)}function tn_Uh(a,b,c) {this.axis=a;this.nodetest=b;this.predicate=c||[]}tn_Uh[tn_].We=function(a) {this.predicate[tn_m](a)};tn_j(tn_Uh[tn_],function(a) {var b=a.node,c=[];if(this[tn_Fb]=="ancestor-or-self") {c[tn_m](b);for(var d=b[tn_H];d;d=d[tn_H])c[tn_m](d)}else if(this[tn_Fb]=="ancestor")for(var d=b[tn_H];d;d=d[tn_H])c[tn_m](d);else if(this[tn_Fb]=="attribute")tn_Xg(c,b[tn_G]);else if(this[tn_Fb]=="child")tn_Xg(c,b[tn_F]);else if(this[tn_Fb]==tn_Vh) {c[tn_m](b);tn_Wh(c,b)}else if(this[tn_Fb]=="descendant")tn_Wh(c,b);else if(this[tn_Fb]=="following")for(var d=b;d;d=d[tn_H])for(var e=d[tn_I];e;e=e[tn_I]) {c[tn_m](e);tn_Wh(c,e)}else if(this[tn_Fb]==tn_Xh)for(var d=b[tn_I];d;d=d[tn_I])c[tn_m](d);else if(this[tn_Fb]=="namespace")tn_Rg("not implemented: axis namespace");else if(this[tn_Fb]=="parent")b[tn_H]&&c[tn_m](b[tn_H]);else if(this[tn_Fb]=="preceding")for(var d=b;d;d=d[tn_H])for(var e=d[tn_Ia];e;e=e[tn_Ia]) {c[tn_m](e);tn_Yh(c,e)}else if(this[tn_Fb]==tn_Zh)for(var d=b[tn_Ia];d;d=d[tn_Ia])c[tn_m](d);else this[tn_Fb]=="self"?c[tn_m](b):tn_Rg("ERROR -- NO SUCH AXIS: "+this[tn_Fb]);var f=c;c=[];for(var g=0;g<f[tn_n];++g) {var d=f[g];this.nodetest[tn_t](a.clone(d,g,f)).o()&&c[tn_m](d)}for(var g=0;g<this.predicate[tn_n];++g) {var f=c;c=[];for(var i=0;i<f[tn_n];++i) {var d=f[i];this.predicate[g][tn_t](a.clone(d,i,f)).o()&&c[tn_m](d)}}return new tn_Rh(c)});function tn__h() {tn_i(this,new tn_8(tn_c))}tn_j(tn__h[tn_],function() {return this[tn_s]});function tn_0h() {}tn_j(tn_0h[tn_],function(a) {return new tn_8(a.node[tn_q]==1||a.node[tn_q]==2)});function tn_1h() {}tn_j(tn_1h[tn_],function(a) {return new tn_8(a.node[tn_q]==3)});function tn_2h() {}tn_j(tn_2h[tn_],function(a) {return new tn_8(a.node[tn_q]==8)});function tn_3h(a) {tn_ta(this,a)}tn_j(tn_3h[tn_],function(a) {return new tn_8(a.node[tn_q]==7&&(!this[tn_y]||a.node[tn_x]==this[tn_y]))});function tn_4h(a) {this.regex=new RegExp("^"+a+":");this.nsprefix=a}tn_j(tn_4h[tn_],function(a) {var b=a.node;return new tn_8(this.regex[tn_Ma](b[tn_x]))});function tn_5h(a) {tn_Ca(this,a)}tn_j(tn_5h[tn_],function(a) {var b=a.node;return new tn_8(b[tn_x]==this[tn_Gb])});function tn_6h(a) {this.expr=a}tn_j(tn_6h[tn_],function(a) {var b=this.expr[tn_t](a);return b[tn_D]=="number"?new tn_8(a[tn_Ka]==b.i()-1):new tn_8(b.o())});function tn_7h(a) {tn_Ca(this,a);this.args=[]}tn_7h[tn_].Fd=function(a) {this.args[tn_m](a)};tn_j(tn_7h[tn_],function(a) {var b=""+this[tn_Gb][tn_s],c=this.xpathfunctions[b];return c?c[tn_z](this,a):new tn_8(tn_a)});tn_7h[tn_].xpathfunctions={last:function(a) {tn_7(this.args[tn_n]==0);return new tn_9(a.nodelist[tn_n])},position:function(a) {tn_7(this.args[tn_n]==0);return new tn_9(a[tn_Ka]+1)},count:function(a) {tn_7(this.args[tn_n]==1);var b=this.args[0][tn_t](a);return new tn_9(b.l()[tn_n])},id:function(a) {tn_7(this.args[tn_n]==1);var b=this.args[0][tn_t](a),c=[],d;if(b[tn_D]=="node-set") {d=[];var e=b.l();for(var f=0;f<e[tn_n];++f) {var g=tn_Yg(e[f])[tn_r](/\s+/);for(var i=0;i<g[tn_n];++i)d[tn_m](g[i])}}else d=b.f()[tn_r](/\s+/);var j=a.node[tn_eb];for(var f=0;f<d[tn_n];++f) {var k=j[tn_Ya](d[f]);k&&c[tn_m](k)}return new tn_Rh(c)},"local-name":function() {tn_Rg("not implmented yet: XPath function local-name()")},"namespace-uri":function() {tn_Rg("not implmented yet: XPath function namespace-uri()")},name:function(a) {tn_7(this.args[tn_n]==1||this.args[tn_n]==0);var b;b=this.args[tn_n]==0?[a.node]:this.args[0][tn_t](a).l();return b[tn_n]==0?new tn_Qh(""):new tn_Qh(b[0][tn_x])},string:function(a) {tn_7(this.args[tn_n]==1||this.args[tn_n]==0);return this.args[tn_n]==0?new tn_Qh((new tn_Rh([a.node])).f()):new tn_Qh(this.args[0][tn_t](a).f())},concat:function(a) {var b="";for(var c=0;c<this.args[tn_n];++c)b+=this.args[c][tn_t](a).f();return new tn_Qh(b)},document:function(a) {var b=this.args[0][tn_t](a).f();if(b===""&&a.stylesheet)return new tn_Rh([a.stylesheet]);tn_Rg("Can't resolve uri in document(\""+b+'")')},"starts-with":function(a) {tn_7(this.args[tn_n]==2);var b=this.args[0][tn_t](a).f(),c=this.args[1][tn_t](a).f();return new tn_8(b[tn_u](c)==0)},contains:function(a) {tn_7(this.args[tn_n]==2);var b=this.args[0][tn_t](a).f(),c=this.args[1][tn_t](a).f();return new tn_8(b[tn_u](c)!=-1)},"substring-before":function(a) {tn_7(this.args[tn_n]==2);var b=this.args[0][tn_t](a).f(),c=this.args[1][tn_t](a).f(),d=b[tn_u](c),e;e=d==-1?"":b[tn_Rb](0,d);return new tn_Qh(e)},"substring-after":function(a) {tn_7(this.args[tn_n]==2);var b=this.args[0][tn_t](a).f(),c=this.args[1][tn_t](a).f(),d=b[tn_u](c),e;e=d==-1?"":b[tn_Rb](d+c[tn_n]);return new tn_Qh(e)},substring:function(a) {tn_7(this.args[tn_n]==2||this.args[tn_n]==3);var b=this.args[0][tn_t](a).f(),c=this.args[1][tn_t](a).i(),d;if(this.args[tn_n]==2) {var e=tn_g.max(0,tn_g[tn_Sa](c)-1);d=b[tn_Rb](e)}else{var f=this.args[2][tn_t](a).i(),g=tn_g[tn_Sa](c)-1,e=tn_g.max(0,g),i=tn_g[tn_Sa](f)-tn_g.max(0,-g);d=b[tn_Rb](e,i)}return new tn_Qh(d)},"string-length":function(a) {var b;b=this.args[tn_n]>0?this.args[0][tn_t](a).f():(new tn_Rh([a.node])).f();return new tn_9(b[tn_n])},"normalize-space":function(a) {var b;b=this.args[tn_n]>0?this.args[0][tn_t](a).f():(new tn_Rh([a.node])).f();b=b[tn_p](/^\s*/,"")[tn_p](/\s*$/,"")[tn_p](/\s+/g," ");return new tn_Qh(b)},translate:function(a) {tn_7(this.args[tn_n]==3);var b=this.args[0][tn_t](a).f(),c=this.args[1][tn_t](a).f(),d=this.args[2][tn_t](a).f();for(var e=0;e<c[tn_n];++e)b=b[tn_p](new RegExp(c[tn_1a](e),"g"),d[tn_1a](e));return new tn_Qh(b)},"boolean":function(a) {tn_7(this.args[tn_n]==1);return new tn_8(this.args[0][tn_t](a).o())},not:function(a) {tn_7(this.args[tn_n]==1);var b=!this.args[0][tn_t](a).o();return new tn_8(b)},"true":function() {tn_7(this.args[tn_n]==0);return new tn_8(tn_c)},"false":function() {tn_7(this.args[tn_n]==0);return new tn_8(tn_a)},lang:function(a) {tn_7(this.args[tn_n]==1);var b=this.args[0][tn_t](a).f(),c,d=a.node;while(d&&d!=d[tn_H]) {c=d[tn_qb]("xml:lang");if(c)break;d=d[tn_H]}if(c) {var e=new RegExp("^"+b+"$","i");return new tn_8(e[tn_Ma](c)||e[tn_Ma](c[tn_p](/_.*$/,"")))}else return new tn_8(tn_a)},number:function(a) {tn_7(this.args[tn_n]==1||this.args[tn_n]==0);return this.args[tn_n]==1?new tn_9(this.args[0][tn_t](a).i()):new tn_9((new tn_Rh([a.node])).i())},sum:function(a) {tn_7(this.args[tn_n]==1);var b=this.args[0][tn_t](a).l(),c=0;for(var d=0;d<b[tn_n];++d)c+=tn_Yg(b[d])-0;return new tn_9(c)},floor:function(a) {tn_7(this.args[tn_n]==1);var b=this.args[0][tn_t](a).i();return new tn_9(tn_g[tn_Xa](b))},ceiling:function(a) {tn_7(this.args[tn_n]==1);var b=this.args[0][tn_t](a).i();return new tn_9(tn_g.ceil(b))},round:function(a) {tn_7(this.args[tn_n]==1);var b=this.args[0][tn_t](a).i();return new tn_9(tn_g[tn_Sa](b))},"ext-join":function(a) {tn_7(this.args[tn_n]==2);var b=this.args[0][tn_t](a).l(),c=this.args[1][tn_t](a).f(),d="";for(var e=0;e<b[tn_n];++e) {if(d)d+=c;d+=tn_Yg(b[e])}return new tn_Qh(d)},"ext-if":function(a) {tn_7(this.args[tn_n]==3);return this.args[0][tn_t](a).o()?this.args[1][tn_t](a):this.args[2][tn_t](a)},"ext-cardinal":function(a) {tn_7(this.args[tn_n]>=1);var b=this.args[0][tn_t](a).i(),c=[];for(var d=0;d<b;++d)c[tn_m](a.node);return new tn_Rh(c)}};function tn_8h(a,b) {this.expr1=a;this.expr2=b}tn_j(tn_8h[tn_],function(a) {var b=this.expr1[tn_t](a).l(),c=this.expr2[tn_t](a).l(),d=b[tn_n];for(var e=0;e<c[tn_n];++e) {var f=c[e],g=tn_a;for(var i=0;i<d;++i)if(b[i]==f) {g=tn_c;i=d}g||b[tn_m](f)}return new tn_Rh(b)});function tn_9h(a,b) {this.filter=a;this.rel=b}tn_j(tn_9h[tn_],function(a) {var b=this.filter[tn_t](a).l(),c=[];for(var d=0;d<b[tn_n];++d) {var e=this.rel[tn_t](a.clone(b[d],d,b)).l();for(var f=0;f<e[tn_n];++f)c[tn_m](e[f])}return new tn_Rh(c)});function tn_$h(a,b) {this.expr=a;this.predicate=b}tn_j(tn_$h[tn_],function(a) {var b=this.expr[tn_t](a).l();for(var c=0;c<this.predicate[tn_n];++c) {var d=b;b=[];for(var e=0;e<d[tn_n];++e) {var f=d[e];this.predicate[c][tn_t](a.clone(f,e,d)).o()&&b[tn_m](f)}}return new tn_Rh(b)});function tn_ai(a) {this.expr=a}tn_j(tn_ai[tn_],function(a) {return new tn_9(-this.expr[tn_t](a).i())});function tn_bi(a,b,c) {this.expr1=a;this.expr2=c;this.op=b}tn_j(tn_bi[tn_],function(a) {var b;switch(this.op[tn_s]) {case "or":b=new tn_8(this.expr1[tn_t](a).o()||this.expr2[tn_t](a).o());break;case "and":b=new tn_8(this.expr1[tn_t](a).o()&&this.expr2[tn_t](a).o());break;case "+":b=new tn_9(this.expr1[tn_t](a).i()+this.expr2[tn_t](a).i());break;case "-":b=new tn_9(this.expr1[tn_t](a).i()-this.expr2[tn_t](a).i());break;case "*":b=new tn_9(this.expr1[tn_t](a).i()*this.expr2[tn_t](a).i());break;case "mod":b=new tn_9(this.expr1[tn_t](a).i()%this.expr2[tn_t](a).i());break;case "div":b=new tn_9(this.expr1[tn_t](a).i()/this.expr2[tn_t](a).i());break;case "=":b=this.compare(a,function(c,d) {return c==d});break;case "!=":b=this.compare(a,function(c,d) {return c!=d});break;case "<":b=this.compare(a,function(c,d) {return c<d});break;case "<=":b=this.compare(a,function(c,d) {return c<=d});break;case ">":b=this.compare(a,function(c,d) {return c>d});break;case ">=":b=this.compare(a,function(c,d) {return c>=d});break;default:tn_Rg("BinaryExpr.evaluate: "+this.op[tn_s])}return b});tn_bi[tn_].compare=function(a,b) {var c=this.expr1[tn_t](a),d=this.expr2[tn_t](a),e;if(c[tn_D]=="node-set"&&d[tn_D]=="node-set") {var f=c.l(),g=d.l();e=tn_a;for(var i=0;i<f[tn_n];++i)for(var j=0;j<g[tn_n];++j)if(b(tn_Yg(f[i]),tn_Yg(g[j]))) {e=tn_c;j=g[tn_n];i=f[tn_n]}}else if(c[tn_D]=="node-set"||d[tn_D]=="node-set")if(c[tn_D]=="number") {var k=c.i(),l=d.l();e=tn_a;for(var m=0;m<l[tn_n];++m) {var n=tn_Yg(l[m])-0;if(b(k,n)) {e=tn_c;break}}}else if(d[tn_D]=="number") {var l=c.l(),k=d.i();e=tn_a;for(var m=0;m<l[tn_n];++m) {var n=tn_Yg(l[m])-0;if(b(n,k)) {e=tn_c;break}}}else if(c[tn_D]=="string") {var k=c.f(),l=d.l();e=tn_a;for(var m=0;m<l[tn_n];++m) {var n=tn_Yg(l[m]);if(b(k,n)) {e=tn_c;break}}}else if(d[tn_D]=="string") {var l=c.l(),k=d.f();e=tn_a;for(var m=0;m<l[tn_n];++m) {var n=tn_Yg(l[m]);if(b(n,k)) {e=tn_c;break}}}else e=b(c.o(),d.o());else e=c[tn_D]=="boolean"||d[tn_D]=="boolean"?b(c.o(),d.o()):c[tn_D]=="number"||d[tn_D]=="number"?b(c.i(),d.i()):b(c.f(),d.f());return new tn_8(!!e)};function tn_ci(a) {tn_i(this,a)}tn_j(tn_ci[tn_],function() {return new tn_Qh(this[tn_s])});function tn_di(a) {tn_i(this,a)}tn_j(tn_di[tn_],function() {return new tn_9(this[tn_s])});function tn_ei(a) {tn_Ca(this,a)}tn_j(tn_ei[tn_],function(a) {return a.Uc(this[tn_Gb])});function tn_fi(a) {return a}function tn_gi(a,b) {b.absolute=tn_c;return b}function tn_hi(a,b) {b.absolute=tn_c;b.te(tn_ii(a[tn_s]));return b}function tn_ji() {var a=new tn_Sh;a.sa(tn_ii("."));a.absolute=tn_c;return a}function tn_ki(a) {var b=new tn_Sh;b.absolute=tn_c;b.sa(tn_ii(a[tn_s]));return b}function tn_li(a) {var b=new tn_Sh;b.sa(a);return b}function tn_mi(a,b,c) {a.sa(c);return a}function tn_ni(a,b) {a.sa(tn_ii(b[tn_s]));return a}function tn_oi(a,b,c) {var d=new tn_Sh;d.rootExpr=a;d.sa(c);return d}function tn_pi(a) {return tn_ii(a[tn_s])}function tn_qi(a) {return tn_ii(a[tn_s])}function tn_ri(a,b,c) {return new tn_Uh(a[tn_s],c)}function tn_si(a,b) {return new tn_Uh("attribute",b)}function tn_ti(a) {return new tn_Uh("child",a)}function tn_ui(a,b) {a.We(b);return a}function tn_ii(a) {switch(a) {case "//":return new tn_Uh("descendant-or-self",new tn__h);case ".":return new tn_Uh("self",new tn__h);case "..":return new tn_Uh("parent",new tn__h)}}function tn_vi() {return new tn_0h}function tn_wi(a) {return new tn_4h(a[tn_s])}function tn_xi(a) {return new tn_5h(a[tn_s])}function tn_yi(a) {var b=a[tn_s][tn_p](/\s*\($/,"");switch(b) {case "node":return new tn__h;case "text":return new tn_1h;case "comment":return new tn_2h;case "processing-instruction":return new tn_3h("")}}function tn_zi(a,b) {var c=a[tn_p](/\s*\($/,"");c!="processing-instruction"&&tn_Rg(c);return new tn_3h(b[tn_s])}function tn_Ai(a,b) {return new tn_6h(b)}function tn_Bi(a,b) {return b}function tn_Ci(a) {return new tn_7h(a)}function tn_Di(a,b,c,d) {var e=new tn_7h(a);e.Fd(c);for(var f=0;f<d[tn_n];++f)e.Fd(d[f]);return e}function tn_Ei(a,b) {return b}function tn_Fi(a,b,c) {return new tn_8h(a,c)}function tn_Gi(a,b,c) {return new tn_9h(a,c)}function tn_Hi(a,b,c) {c.te(tn_ii(b[tn_s]));return new tn_9h(a,c)}function tn_Ii(a,b) {return b[tn_n]>0?new tn_$h(a,b):a}function tn_Ji(a,b) {return new tn_ai(b)}function tn_Ki(a,b,c) {return new tn_bi(a,b,c)}function tn_Li(a) {var b=a[tn_s][tn_C](1,a[tn_s][tn_n]-1);return new tn_ci(b)}function tn_Mi(a) {return new tn_di(a[tn_s])}function tn_Ni(a,b) {return new tn_ei(b[tn_s])}function tn_uh(a) {if(a[tn_1a](0)=="$")return new tn_ei(a[tn_Rb](1));else if(a[tn_1a](0)=="@") {var b=new tn_5h(a[tn_Rb](1)),c=new tn_Uh("attribute",b),d=new tn_Sh;d.sa(c);return d}else if(a[tn_ib](/^[0-9]+$/))return new tn_di(a);else{var b=new tn_5h(a),c=new tn_Uh("child",b),d=new tn_Sh;d.sa(c);return d}}function tn_vh(a) {var b=tn_Sg(a,"/"),c=new tn_Sh;for(var d=0;d<b[tn_n];++d) {var e=new tn_5h(b[d]),f=new tn_Uh("child",e);c.sa(f)}return c}var tn_Vh="descendant-or-self",tn_Xh="following-sibling",tn_Zh="preceding-sibling",tn_Oi=["ancestor-or-self","ancestor","attribute","child",tn_Vh,"descendant",tn_Xh,"following","namespace","parent",tn_Zh,"preceding","self"][tn_K]("|"),tn_Pi={label:"|",prec:17,re:/^\|/},tn_Ch={label:"//",prec:19,re:/^\/\//},tn_Dh={label:"/",prec:30,re:/^\//},tn_Eh={label:"::",prec:20,re:/^::/},tn_Qi={label:":",prec:1000,re:/^:/},tn_Ri={label:"[axis]",re:new RegExp("^("+tn_Oi+")")},tn_Si={label:"(",prec:34,re:/^\(/},tn_Ti={label:")",re:/^\)/},tn_Ui={label:"..",prec:34,re:/^\.\./},tn_Vi={label:".",prec:34,re:/^\./},tn_Bh={label:"@",prec:34,re:/^@/},tn_Wi={label:",",re:/^,/},tn_Ah={label:"or",prec:10,re:/^or\b/},tn_zh={label:"and",prec:11,re:/^and\b/},tn_Xi={label:"=",prec:12,re:/^=/},tn_Yi={label:"!=",prec:12,re:/^!=/},tn_Zi={label:">=",prec:13,re:/^>=/},tn__i={label:">",prec:13,re:/^>/},tn_0i={label:"<=",prec:13,re:/^<=/},tn_1i={label:"<",prec:13,re:/^</},tn_2i={label:"+",prec:14,re:/^\+/,left:tn_c},tn_3i={label:"-",prec:14,re:/^\-/,left:tn_c},tn_xh={label:"div",prec:15,re:/^div\b/,left:tn_c},tn_yh={label:"mod",prec:15,re:/^mod\b/,left:tn_c},tn_4i={label:"[",prec:32,re:/^\[/},tn_5i={label:"]",re:/^\]/},tn_Fh={label:"$",re:/^\$/},tn_6i={label:"[ncname]",re:new RegExp("^"+tn_Pg)},tn_7i={label:"*",prec:15,re:/^\*/,left:tn_c},tn_8i={label:"[litq]",prec:20,re:/^'[^\']*'/},tn_9i={label:"[litqq]",prec:20,re:/^"[^\"]*"/},tn_$i={label:"[number]",prec:35,re:/^\d+(\.\d*)?/},tn_Gh={label:"[qname]",re:new RegExp("^("+tn_Pg+":)?"+tn_Pg)},tn_aj={label:"[nodetest-start]",re:/^(processing-instruction|comment|text|node)\(/},tn_wh=[tn_Ch,tn_Dh,tn_Ui,tn_Vi,tn_Eh,tn_Qi,tn_Ri,tn_aj,tn_Si,tn_Ti,tn_4i,tn_5i,tn_Bh,tn_Wi,tn_Ah,tn_zh,tn_Yi,tn_Xi,tn_Zi,tn__i,tn_0i,tn_1i,tn_2i,tn_3i,tn_7i,tn_Pi,tn_yh,tn_xh,tn_8i,tn_9i,tn_$i,tn_Gh,tn_6i,tn_Fh],tn_bj={label:"LocationPath"},tn_cj={label:"RelativeLocationPath"},tn_dj={label:"AbsoluteLocationPath"},tn_ej={label:"Step"},tn_fj={label:"NodeTest"},tn_gj={label:"Predicate"},tn_hj={label:"Literal"},tn_$={label:"Expr"},tn_ij={label:"PrimaryExpr"},tn_jj={label:"Variablereference"},tn_kj={label:"Number"},tn_lj={label:"FunctionCall"},tn_mj={label:"ArgumentRemainder"},tn_nj={label:"PathExpr"},tn_oj={label:"UnionExpr"},tn_pj={label:"FilterExpr"},tn_qj={label:"Digits"},tn_rj=[tn_bj,tn_cj,tn_dj,tn_ej,tn_fj,tn_gj,tn_hj,tn_$,tn_ij,tn_jj,tn_kj,tn_lj,tn_mj,tn_nj,tn_oj,tn_pj,tn_qj],tn_Oh={label:"?"},tn_Nh={label:"*"},tn_Ph={label:"+"},tn_sj=[[tn_bj,[tn_cj],18,tn_fi],[tn_bj,[tn_dj],18,tn_fi],[tn_dj,[tn_Dh,tn_cj],18,tn_gi],[tn_dj,[tn_Ch,tn_cj],18,tn_hi],[tn_dj,[tn_Dh],0,tn_ji],[tn_dj,[tn_Ch],0,tn_ki],[tn_cj,[tn_ej],31,tn_li],[tn_cj,[tn_cj,tn_Dh,tn_ej],31,tn_mi],[tn_cj,[tn_cj,tn_Ch,tn_ej],31,tn_ni],[tn_cj,[tn_ij,tn_Dh,tn_ej],31,tn_oi],[tn_ej,[tn_Vi],33,tn_pi],[tn_ej,[tn_Ui],33,tn_qi],[tn_ej,[tn_Ri,tn_Eh,tn_fj],33,tn_ri],[tn_ej,[tn_Bh,tn_fj],33,tn_si],[tn_ej,[tn_fj],33,tn_ti],[tn_ej,[tn_ej,tn_gj],33,tn_ui],[tn_fj,[tn_7i],33,tn_vi],[tn_fj,[tn_6i,tn_Qi,tn_7i],33,tn_wi],[tn_fj,[tn_Gh],33,tn_xi],[tn_fj,[tn_aj,tn_Ti],33,tn_yi],[tn_fj,[tn_aj,tn_hj,tn_Ti],33,tn_zi],[tn_gj,[tn_4i,tn_$,tn_5i],33,tn_Ai],[tn_ij,[tn_jj],33,tn_fi],[tn_ij,[tn_Si,tn_$,tn_Ti],33,tn_Bi],[tn_ij,[tn_hj],30,tn_fi],[tn_ij,[tn_kj],30,tn_fi],[tn_ij,[tn_lj],30,tn_fi],[tn_lj,[tn_Gh,tn_Si,tn_Ti],-1,tn_Ci],[tn_lj,[tn_Gh,tn_Si,tn_$,tn_mj,tn_Nh,tn_Ti],-1,tn_Di],[tn_mj,[tn_Wi,tn_$],-1,tn_Ei],[tn_oj,[tn_nj],20,tn_fi],[tn_oj,[tn_oj,tn_Pi,tn_nj],20,tn_Fi],[tn_nj,[tn_bj],20,tn_fi],[tn_nj,[tn_pj],19,tn_fi],[tn_nj,[tn_pj,tn_Dh,tn_cj],20,tn_Gi],[tn_nj,[tn_pj,tn_Ch,tn_cj],20,tn_Hi],[tn_pj,[tn_ij,tn_gj,tn_Nh],20,tn_Ii],[tn_$,[tn_ij],16,tn_fi],[tn_$,[tn_oj],16,tn_fi],[tn_$,[tn_3i,tn_$],-1,tn_Ji],[tn_$,[tn_$,tn_Ah,tn_$],-1,tn_Ki],[tn_$,[tn_$,tn_zh,tn_$],-1,tn_Ki],[tn_$,[tn_$,tn_Xi,tn_$],-1,tn_Ki],[tn_$,[tn_$,tn_Yi,tn_$],-1,tn_Ki],[tn_$,[tn_$,tn_1i,tn_$],-1,tn_Ki],[tn_$,[tn_$,tn_0i,tn_$],-1,tn_Ki],[tn_$,[tn_$,tn__i,tn_$],-1,tn_Ki],[tn_$,[tn_$,tn_Zi,tn_$],-1,tn_Ki],[tn_$,[tn_$,tn_2i,tn_$],-1,tn_Ki,tn_c],[tn_$,[tn_$,tn_3i,tn_$],-1,tn_Ki,tn_c],[tn_$,[tn_$,tn_7i,tn_$],-1,tn_Ki,tn_c],[tn_$,[tn_$,tn_xh,tn_$],-1,tn_Ki,tn_c],[tn_$,[tn_$,tn_yh,tn_$],-1,tn_Ki,tn_c],[tn_hj,[tn_8i],-1,tn_Li],[tn_hj,[tn_9i],-1,tn_Li],[tn_kj,[tn_$i],-1,tn_Mi],[tn_jj,[tn_Fh,tn_Gh],200,tn_Ni]],tn_Kh=[];function tn_sh() {if(tn_Kh[tn_n])return;tn_sj.sort(function(i,j) {var k=i[1][tn_n],l=j[1][tn_n];return k<l?1:k>l?-1:0});var a=1;for(var b=0;b<tn_rj[tn_n];++b)tn_rj[b].key=a++;for(b=0;b<tn_wh[tn_n];++b)tn_wh[b].key=a++;function c(i,j,k) {i[j]||(i[j]=[]);i[j][tn_m](k)}for(b=0;b<tn_sj[tn_n];++b) {var d=tn_sj[b],e=d[1];for(var f=e[tn_n]-1;f>=0;--f)if(e[f]==tn_Ph) {c(tn_Kh,e[f-1].key,d);break}else if(e[f]==tn_Nh||e[f]==tn_Oh) {c(tn_Kh,e[f-1].key,d);--f}else{c(tn_Kh,e[f].key,d);break}}var g=0;tn_Ug(tn_Kh,function(i) {if(i)g+=i[tn_n]})}function tn_Wh(a,b) {for(var c=b[tn_B];c;c=c[tn_I]) {a[tn_m](c);arguments[tn_4a](a,c)}}function tn_Yh(a,b) {for(var c=b[tn_hb];c;c=c[tn_Ia]) {a[tn_m](c);arguments[tn_4a](a,c)}}function tn_rh(a,b) {if(b[tn_n]==0)return;var c=[];for(var d=0;d<a.nodelist[tn_n];++d) {var e=a.nodelist[d],f={node:e,key:[]},g=a.clone(e,0,[e]);for(var i=0;i<b[tn_n];++i) {var j=b[i],k=j.expr[tn_t](g),l;if(j[tn_D]=="text")l=k.f();else if(j[tn_D]=="number")l=k.i();f.key[tn_m]({value:l,order:j.order})}f.key[tn_m]({value:d,order:"ascending"});c[tn_m](f)}c.sort(tn_tj);var m=[];for(var d=0;d<c[tn_n];++d)m[tn_m](c[d].node);a.nodelist=m;a.gg(0)}function tn_tj(a,b) {for(var c=0;c<a.key[tn_n];++c) {var d=a.key[c].order=="descending"?-1:1;if(a.key[c][tn_s]>b.key[c][tn_s])return+1*d;else if(a.key[c][tn_s]<b.key[c][tn_s])return-1*d}return 0}function tn_uj(a,b) {var c=tn_qh(a),d=c[tn_t](b);return d};function tn_vj(a,b) {var c=tn_5g(new tn_bh);tn_wj(new tn_kh(a,b),b,c);var d=tn_Zg(c);return d}function tn_wj(a,b,c) {var d=c[tn_q]==9?c:c[tn_eb],e=b[tn_x][tn_r](/:/);if(e[tn_n]==1||e[0]!="xsl")tn_xj(a,b,c,d);else switch(e[1]) {case "apply-imports":tn_ia("not implemented: "+e[1]);break;case "apply-templates":var f=tn_yj(b,"select"),g;g=f?tn_uj(f,a).l():a.node[tn_F];var i=a.clone(g[0],0,g);tn_zj(i,b);tn_Aj(i,b);var j=tn_yj(b,"mode"),k=b[tn_eb][tn_Qb],l=[];for(var m=0;m<k[tn_F][tn_n];++m) {var n=k[tn_F][m];n[tn_q]==1&&n[tn_x]=="xsl:template"&&n[tn_qb]("mode")==j&&l[tn_m](n)}for(var o=0;o<i.nodelist[tn_n];++o) {var q=i.nodelist[o];for(var m=0;m<l[tn_n];++m)tn_wj(i.clone(q,o),l[m],c)}break;case "attribute":var r=tn_yj(b,"name"),t=tn_Bj(r,a),p=tn_5g(d);tn_Cj(a,b,p);var s=tn_Yg(p);c[tn_wb](t,s);break;case "attribute-set":tn_ia("not implemented: "+e[1]);break;case "call-template":var t=tn_yj(b,"name"),k=b[tn_eb][tn_Qb],w=a.clone();tn_zj(w,b);for(var m=0;m<k[tn_F][tn_n];++m) {var n=k[tn_F][m];if(n[tn_q]==1&&n[tn_x]=="xsl:template"&&n[tn_qb]("name")==t) {tn_Cj(w,n,c);break}}break;case "choose":tn_Dj(a,b,c);break;case "comment":var p=tn_5g(d);tn_Cj(a,b,p);var u=tn_Yg(p),v=d[tn_Pb](u);c[tn_l](v);break;case "copy":var p=tn_Ej(c,a.node,d);p&&tn_Cj(a,b,p);break;case "copy-of":var f=tn_yj(b,"select"),s=tn_uj(f,a);if(s[tn_D]=="node-set") {var g=s.l();for(var m=0;m<g[tn_n];++m)tn_Fj(c,g[m],d)}else{var p=tn_4g(d,s.f());c[tn_l](p)}break;case "decimal-format":tn_ia("not implemented: "+e[1]);break;case "element":var r=tn_yj(b,"name"),t=tn_Bj(r,a),p=d[tn_rb](t);c[tn_l](p);tn_Cj(a,b,p);break;case "fallback":tn_ia("not implemented: "+e[1]);break;case "for-each":tn_Gj(a,b,c);break;case "if":var y=tn_yj(b,"test"),x=tn_uj(y,a);x!=tn_b&&x.o()&&tn_Cj(a,b,c);break;case "import":tn_ia("not implemented: "+e[1]);break;case "include":tn_ia("not implemented: "+e[1]);break;case "key":tn_ia("not implemented: "+e[1]);break;case "message":tn_ia("not implemented: "+e[1]);break;case "namespace-alias":tn_ia("not implemented: "+e[1]);break;case "number":tn_ia("not implemented: "+e[1]);break;case "otherwise":tn_ia("error if here: "+e[1]);break;case "output":break;case "preserve-space":break;case "processing-instruction":tn_ia("not implemented: "+e[1]);break;case "sort":break;case "strip-space":tn_ia("not implemented: "+e[1]);break;case "stylesheet":case "transform":tn_Cj(a,b,c);break;case "template":var z=tn_yj(b,"match");z&&tn_Hj(z,a)&&tn_Cj(a,b,c);break;case "text":var A=tn_Yg(b),p=d[tn_2a](A);c[tn_l](p);break;case "value-of":var f=tn_yj(b,"select"),s=tn_uj(f,a).f(),p=d[tn_2a](s);c[tn_l](p);break;case "param":tn_Ij(a,b,tn_a);break;case "variable":tn_Ij(a,b,tn_c);break;case "when":tn_ia("error if here: "+e[1]);break;case "with-param":tn_ia("error if here: "+e[1]);break;default:tn_ia("error if here: "+e[1]);break}}function tn_zj(a,b) {for(var c=0;c<b[tn_F][tn_n];++c) {var d=b[tn_F][c];d[tn_q]==1&&d[tn_x]=="xsl:with-param"&&tn_Ij(a,d,tn_c)}}function tn_Aj(a,b) {var c=[];for(var d=0;d<b[tn_F][tn_n];++d) {var e=b[tn_F][d];if(e[tn_q]==1&&e[tn_x]=="xsl:sort") {var f=tn_yj(e,"select"),g=tn_qh(f),i=tn_yj(e,"data-type")||"text",j=tn_yj(e,"order")||"ascending";c[tn_m]({expr:g,type:i,order:j})}}tn_rh(a,c)}function tn_Ij(a,b,c) {var d=tn_yj(b,"name"),e=tn_yj(b,"select"),f;if(b[tn_F][tn_n]>0) {var g=tn_5g(b[tn_eb]);tn_Cj(a,b,g);f=new tn_Rh([g])}else f=e?tn_uj(e,a):new tn_Qh("");if(c||!a.Uc(d))a.Je(d,f)}function tn_Dj(a,b,c) {for(var d=0;d<b[tn_F][tn_n];++d) {var e=b[tn_F][d];if(e[tn_q]!=1)continue;else if(e[tn_x]=="xsl:when") {var f=tn_yj(e,"test");if(tn_uj(f,a).o()) {tn_Cj(a,e,c);break}}else if(e[tn_x]=="xsl:otherwise") {tn_Cj(a,e,c);break}}}function tn_Gj(a,b,c) {var d=tn_yj(b,"select"),e=tn_uj(d,a).l(),f=a.clone(e[0],0,e);tn_Aj(f,b);for(var g=0;g<f.nodelist[tn_n];++g) {var i=f.nodelist[g];tn_Cj(f.clone(i,g),b,c)}}function tn_Cj(a,b,c) {var d=a.clone();for(var e=0;e<b[tn_F][tn_n];++e)tn_wj(d,b[tn_F][e],c)}function tn_xj(a,b,c,d) {if(b[tn_q]==3) {if(tn_Jj(b)) {var e=d[tn_2a](b[tn_L]);c[tn_l](e)}}else if(b[tn_q]==1) {var e=d[tn_rb](b[tn_x]);for(var f=0;f<b[tn_G][tn_n];++f) {var g=b[tn_G][f];if(g) {var i=g[tn_x],j=tn_Bj(g[tn_L],a);e[tn_wb](i,j)}}c[tn_l](e);tn_Cj(a,b,e)}else tn_Cj(a,b,c)}function tn_Jj(a) {if(!a[tn_L][tn_ib](/^\s*$/))return tn_c;var b=a[tn_H];if(b[tn_x]=="xsl:text")return tn_c;while(b&&b[tn_q]==1) {var c=b[tn_qb]("xml:space");if(c)if(c=="default")return tn_a;else if(c=="preserve")return tn_c;b=b[tn_H]}return tn_a}function tn_Bj(a,b) {var c=tn_Sg(a,"{");if(c[tn_n]==1)return a;var d="";for(var e=0;e<c[tn_n];++e) {var f=tn_Sg(c[e],"}");if(f[tn_n]!=2) {d+=c[e];continue}var g=tn_uj(f[0],b).f();d+=g+f[1]}return d}function tn_yj(a,b) {var c=a[tn_qb](b);return c?tn_6g(c):c}function tn_Fj(a,b,c) {if(b[tn_q]==11||b[tn_q]==9)for(var d=0;d<b[tn_F][tn_n];++d)arguments[tn_4a](a,b[tn_F][d],c);else{var e=tn_Ej(a,b,c);if(e) {for(var d=0;d<b[tn_G][tn_n];++d)arguments[tn_4a](e,b[tn_G][d],c);for(var d=0;d<b[tn_F][tn_n];++d)arguments[tn_4a](e,b[tn_F][d],c)}}}function tn_Ej(a,b,c) {if(b[tn_q]==1) {var d=c[tn_rb](b[tn_x]);a[tn_l](d);return d}if(b[tn_q]==3) {var d=c[tn_2a](b[tn_L]);a[tn_l](d)}else if(b[tn_q]==4) {var d=c[tn_ab](b[tn_L]);a[tn_l](d)}else if(b[tn_q]==8) {var d=c[tn_Pb](b[tn_L]);a[tn_l](d)}else b[tn_q]==2&&a[tn_wb](b[tn_x],b[tn_L]);return tn_b}function tn_Hj(a,b) {var c=tn_qh(a),d;if(c.steps&&!c.absolute&&c.steps[tn_n]==1&&c.steps[0][tn_Fb]=="child"&&c.steps[0].predicate[tn_n]==0)d=c.steps[0].nodetest[tn_t](b).o();else{d=tn_a;var e=b.node;while(!d&&e) {var f=c[tn_t](b.clone(e,0,[e])).l();for(var g=0;g<f[tn_n];++g)if(f[g]==b.node) {d=tn_c;break}e=e[tn_H]}}return d};function tn_Kj(a,b) {tn_f[a]=b}tn_Kj("nxslProcess",tn_ih);tn_Kj("xmlParse",tn_ah);tn_Kj("xsltProcess",tn_vj);tn_Kj("xmlText",tn_Zg);tn_Kj("xmlImportNode",tn_Tg);var tn_Lj="windo";function tn_Mj(a,b,c,d,e) {var f=((b?b[tn_eb]:tn_b)||tn_ga)[tn_rb](a);c&&tn_Nj(f,c);d&&tn_Oj(f,d);if(b&&!e) {tn_Pj(b,f);if(b[tn_Lj])f[tn_Lj]=b[tn_Lj]}return f}function tn_Qj(a) {return tn_Rj(a)+"px"}function tn_Nj(a,b) {var c=a[tn_w];tn_oa(c,"absolute");c.left=tn_Qj(b.x);c.top=tn_Qj(b.y)}function tn_Oj(a,b) {var c=a[tn_w];tn_ra(c,tn_Qj(b[tn_o]));tn_k(c,tn_Qj(b[tn_J]))}function tn_Sj(a) {tn_Ea(a[tn_w],"none")}function tn_Tj(a) {tn_Ea(a[tn_w],"")}var tn_Uj=tn_g.max,tn_Rj=tn_g[tn_Sa];function tn_Pj(a,b) {a[tn_l](b)}function tn_Vj(a) {if(a[tn_H]) {a[tn_H][tn_fb](a);tn_Wj(a)}}function tn_Xj(a,b) {var c=a[tn_n];for(var d=0;d<c;++d)b(a[d],d)}function tn_Yj(a,b,c) {for(var d in a)if(c||!a[tn_$a]||a[tn_$a](d))b(d,a[d])}function tn_Zj(a,b,c,d) {var e=c||0,f=d||b[tn_n];for(var g=e;g<f;++g)a[tn_m](b[g])}function tn__j(a) {var b=tn_a;if(a&&typeof a=="object")b=typeof Window=="function"?a instanceof Window:typeof a.navigator=="object"&&typeof a[tn_cb]=="object"&&typeof a[tn_Wa]=="object";return b}function tn_0j(a) {var b;b=tn__j(a)?a:a&&a[tn_Lj]?a[tn_Lj]:tn_f;return b};function tn_1j(a,b,c) {tn_2j([a],function(d) {b(d[0])},c)}function tn_2j(a,b,c) {var d=c||tn_ja[tn_o],e=tn_Mj("div",tn_f[tn_Wa][tn_bb],new tn_pg(-tn_ja[tn_o],-tn_ja[tn_J]),new tn_3j(d,tn_ja[tn_J])),f=[];for(var g=0;g<a[tn_n];g++) {var i=tn_Mj("div",e,tn_4j);tn_Pj(i,a[g]);f[tn_m](i)}tn_f[tn_Va](function() {var j=[],k=new tn_3j(0,0);for(var l=0;l<f[tn_n];l++) {var m=f[l],n=new tn_3j(m.offsetWidth,m[tn_Kb]);j[tn_m](n);m[tn_fb](a[l]);tn_Vj(m);tn_ra(k,tn_Uj(k[tn_o],n[tn_o]));tn_k(k,tn_Uj(k[tn_J],n[tn_J]))}tn_Vj(e);f=tn_b;b(j,k)},0)};var tn_5j="clearlisteners";var tn_6j=tn_a;function tn_7j() {this.Rb=[]}var tn_8j=function(a) {a||(a=tn_f);if(!a.gEventListenerPool)a.gEventListenerPool=new tn_7j;return a.gEventListenerPool},tn_9j=function(a) {tn_8j(tn_0j(a)).Wf(a)};tn_7j[tn_].Wf=function(a) {var b=this.Rb.pop(),c=a.Dg();if(c<this.Rb[tn_n]) {this.Rb[c]=b;b.eg(c)}a.eg(-1)};tn_Aa(tn_7j[tn_],function() {for(var a=0;a<this.Rb[tn_n];++a)this.Rb[a].eg(-1);this.Rb=[]});function tn_$j(a) {tn_ak(a,tn_5j);tn_Xj(tn_bk(a),function(b) {b.remove();tn_9j(b)})}function tn_bk(a,b) {var c=[],d=a.__e_;if(d)if(b)d[b]&&tn_Zj(c,d[b]);else tn_Yj(d,function(e,f) {tn_Zj(c,f)});return c}function tn_ak(a,b) {var c=[];tn_Zj(c,arguments,2);tn_Xj(tn_bk(a,b),function(d) {if(tn_6j)d[tn_E](a,c);else try{d[tn_E](a,c)}catch(e) {}})}function tn_Wj(a) {tn_ch(a,tn_$j)};var tn_4j=new tn_pg(0,0);tn_ma(tn_pg[tn_],function() {return"("+this.x+", "+this.y+")"});function tn_3j(a,b) {tn_ra(this,a);tn_k(this,b)}tn_ma(tn_3j[tn_],function() {return"("+this[tn_o]+", "+this[tn_J]+")"});function tn_ck(a) {this.ticks=a;this.tick=0}tn_ck[tn_].next=function() {this.tick++;var a=tn_g.PI*(this.tick/this.ticks-0.5);return(tn_g.sin(a)+1)/2};tn_ck[tn_].more=function() {return this.tick<this.ticks};if(tn_f.jstiming)tn_f.jstiming.report=function(a,b) {var c="";if(tn_f.jstiming.pt) {c+="&srt="+tn_f.jstiming.pt;delete tn_f.jstiming.pt}if(tn_f.external&&tn_f.external.tran)c+="&tran="+tn_f.external.tran;var d=a.t,e=d[tn_ob];delete d[tn_ob];var f=[],g=[];for(var i in d) {if(i[tn_u]("_")==0)continue;var j=d[i][1];if(j)d[j][0]&&g[tn_m](i+"."+(d[i][0]-d[j][0]));else e&&f[tn_m](i+"."+(d[i][0]-e[0]))}if(b)for(var k in b)c+="&"+k+"="+b[k];(new Image).src=["http://csi.gstatic.com/csi?v=3","&s=translate&action=",a[tn_Gb],g[tn_n]?"&it="+g[tn_K](",")+c:c,"&rt=",f[tn_K](",")][tn_K]("")};function _SetupURL(a) {var b=tn_R(a);tn_T(b,"focus",function(c) {if(c[tn_y][tn_s]=="http://")tn_i(c[tn_y],"")});tn_T(b,"blur",function(c) {if(c[tn_y][tn_s]=="")tn_i(c[tn_y],"http://")})}function _SetupBidi(a) {var b=new tn_nf;b.decorate(tn_R(a))}function _History() {this.history_obj=new tn_6;this.text_form=tn_e;this.dict_fired=tn_a;tn_T(this.history_obj,"navigate",this.sg,tn_a,this)}_History[tn_].sg=function(a) {if(!this.text_form)return;if(a.token[tn_n]==0&&this.text_form.heading) {var b=tn_R("nc_text"),c=tn_R("nc_sl"),d=tn_R("nc_tl");if(!b) {tn_i(this.text_form.original_text,"");tn_h(this.text_form.heading,"");tn_h(this.text_form.result_text,"");if(this.text_form.dictionary)tn_h(this.text_form.dictionary,"");if(this.text_form.translit)tn_h(this.text_form.translit,"");return}else if(tn_Cc(b[tn_s])!=tn_Cc(this.text_form.original_text[tn_s])||c[tn_s]!=this.text_form.source_selector.j()||d[tn_s]!=this.text_form.target_selector.j())a.token=c[tn_s]+"|"+d[tn_s]+"|"+b[tn_s];else if(!this.dict_fired) {this.dict_fired=tn_c;var e={timer:new tn_f.jstiming.Timer,original_text:b[tn_s],text_done:tn_c,text_data:this.text_form.result_text[tn_Za],dict_done:tn_a,dict_data:tn_e,report_done:tn_a,params:{}};tn_Ca(e.timer,"at");e.params.sl=c[tn_s];e.params.tl=d[tn_s];e.params.size=b[tn_s][tn_n];this.text_form.Mc(c[tn_s],d[tn_s],e);this.text_form.Me(d[tn_s],this.text_form.result_text[tn_Za]);return}}var f=this.text_form,g=tn_Gc(a.token),i=g[tn_r]("|",2);i[tn_n]==2&&i[tn_m](g[tn_C](i[0][tn_n]+i[1][tn_n]+2));if(i[0]&&i[0][tn_n]>0&&i[1]&&i[1][tn_n]>0) {f.source_selector.J(i[0],tn_c);f.target_selector.J(i[1],tn_c)}if(i[2]&&i[2][tn_n]>0) {tn_i(f.original_text,i[2]);f.heading&&f.zd()}};function tn_dk(a,b,c) {var d=tn_md("input",{type:"hidden",name:b,value:c});a[tn_l](d)}function _TranslateForm(a,b,c,d,e,f,g,i,j,k,l,m) {this.original_submit=tn_R(c);this.form=this.original_submit[tn_La];this.source_selector=a;this.target_selector=b;this.closure_submit=tn_e;this.original_text=tn_R(f);this.result_text=tn_R(g);this.dictionary=tn_R(i);this.heading=tn_R(j);this.web_path=k;this.text_path=l;this.translit=tn_R(m);this.has_swapped=tn_a;if(e) {this.history=e.history_obj;if(g) {e.text_form=this;this[tn_cb].L(tn_c)}}tn_T(tn_ga,"click",function(n) {if(n[tn_y]&&n[tn_y][tn_Oa]=="ll"&&n[tn_y][tn_B]&&n[tn_y][tn_B][tn_s])n.ctrlKey||n.altKey?this.target_selector.J(n[tn_y][tn_B][tn_s],tn_c):this.source_selector.J(n[tn_y][tn_B][tn_s],tn_c)},tn_a,this);if(tn_Q) {tn_T(this.original_submit,"click",this.Ke,tn_a,this);return}this.closure_submit=new tn_Of(tn_md("div",tn_b,this.original_submit[tn_s]));tn_rd(this.original_submit);this.closure_submit.render(tn_R(d));tn_T(this.closure_submit,"action",this.Ke,tn_a,this)}_TranslateForm[tn_]._submit=function() {this.has_swapped&&tn_dk(this[tn_La],"swap",1);this[tn_La].submit()};_TranslateForm[tn_]._swap=function() {var a=this.source_selector.j();if(a!="auto") {this.has_swapped=tn_c;var b=this.target_selector.j();b[tn_C](2,0)=="zh"?this.source_selector.J("zh-CN",tn_c):this.source_selector.J(b,tn_c);this.target_selector.J(a,tn_c)}};_TranslateForm[tn_].Ke=function(a) {if(this.web_path&&_isUrl(this.original_text[tn_s])) {tn_Ca(this.original_text,"u");this[tn_La].method="get";this[tn_La].action=this.web_path;this._submit();a[tn_6a]();return}else if(this.text_path) {tn_Ca(this.original_text,"text");this[tn_La].method="post";this[tn_La].action=this.text_path}if(this[tn_cb]) {var b="";this.result_text||(b+="web:");b+=this.source_selector.j()+"|"+this.target_selector.j()+"|"+tn_Fc(this.original_text[tn_s]);if(tn_f[tn_5a][tn_xb][tn_u]("#")+b[tn_n]>2000) {this._submit();a[tn_6a]();return}b==this[tn_cb].lb()&&this.heading&&this.zd();this[tn_cb].kg(b)}else this.heading&&this.zd();if(this.heading) {tn_h(this.heading,tr_in);tn_h(this.result_text,"");if(this.translit)tn_Ga(this.translit[tn_w],"hidden");if(this.dictionary)tn_Ga(this.dictionary[tn_w],"hidden")}else this._submit();a[tn_6a]()};_TranslateForm[tn_].zd=function(a,b) {var c=tn_Fc(this.original_text[tn_s]),d={timer:new tn_f.jstiming.Timer,original_text:c,text_done:tn_a,text_data:tn_e,dict_done:tn_a,dict_data:tn_e,report_done:tn_a,params:{}};tn_Ca(d.timer,"at");var e=this,f,g;if(a) {f=a;g=b}else{f=this.source_selector.j();g=this.target_selector.j()}var i="client=t&text="+c+"&sl="+f+"&tl="+g;if(this.has_swapped)i+="&swap=1";var j=f,k="/translate_a/t",l="POST";if(i[tn_n]<2000) {k+="?"+i;l="GET";i=""}tn_Ue(k,function() {if(!this.gd()) {e[tn_cb].ve("submit");e[tn_La].action+="#submit";e._submit();return}try{var m=tn_De(this.Wd()),n=m;this.has_swapped=tn_a;if(typeof m=="object"&&m[tn_n]==1) {tn_h(e.heading,"<i style=color:grey>"+tn_Nc(m[0])+"</i>");tn_Ea(e.heading[tn_w],"block");tn_h(e.result_text,"");if(e.translit)tn_h(e.translit,"");d.text_done=tn_c;return}var o=typeof m=="object"&&m[tn_n]==2;if(o) {n=m[0];j=m[1];e.Mc(j,g,d)}e.Me(g,n);var q=tn_e!=tn_Xe[g]?"right":"left";e.result_text[tn_w].textAlign=q;tn_h(e.result_text,tn_Hc(tn_Nc(n)));d.timer.tick("prt");var r=e.source_selector.J(j),t=e.target_selector.J(b);tn_h(e.heading,_makeLegend(r,t,o));tn_Ea(e.heading[tn_w],"block");var p=tn_R("zippyicon");if(p[tn_w].visibility!="visible") {tn_Ga(p[tn_w],"visible");tn_R("zippyspan").innerHTML+=sug_lab;tn_h(tn_R("sug_thk"),sug_thk);tn_h(tn_R("sug_exp"),sug_exp)}var s=tn_R("suggestion_form");tn_i(s[tn_Ra],e.original_text[tn_s]);tn_i(s.langpair,f+"|"+g);tn_i(s.utrans,n);tn_i(s.gtrans,n);d.params.sl=f;d.params.tl=g;d.params.size=e.original_text[tn_s][tn_n];d.text_done=tn_c;d.text_data=n;tn_ek(d)}catch(w) {e[tn_cb].ve("submit");e[tn_La].action+="#submit";e._submit();return}var u=tn_hd("a","q");for(var v=0;v<u[tn_n];++v) {var y=u[v][tn_xb][tn_u]("&");if(y>=0)u[v].href=u[v][tn_xb][tn_C](0,y);var x="";if(u[v][tn_xb][tn_ib]("translate_s")&&u[v][tn_xb][tn_C](u[v][tn_xb][tn_n]-j[tn_n])==j)x+="&sl="+j+"&tl="+g+"&q="+tn_Fc(e.original_text[tn_s]);else if(u[v][tn_xb][tn_ib]("translate_dict"))x+="&langpair="+j+"|"+g+"&q="+tn_Fc(e.original_text[tn_s]);u[v].href+=x}},l,i,tn_b,10000);f!="auto"&&this.Mc(f,g,d)};function tn_ek(a,b,c) {if(a.text_done&&a.dict_done&&!a.report_done) {a.report_done=tn_c;a.timer.tick("ol");var d=tn_a;for(var e in a.dict_data)for(var f in a.dict_data[e])if(a.dict_data[e][f][tn_Ob]()[tn_ib](a.text_data[tn_Ob]()))d=tn_c;if(!d&&a.dict_data) {a.params.found=0;a.params.text=a.original_text}tn_f.jstiming.report(a.timer,a.params)}else if(!a.report_done) {b||(b=5);c||(c=1);tn_f[tn_Va](function() {tn_ek(a,b,c+1)},100)}}_TranslateForm[tn_].Me=function(a,b) {var c=tn_e!=tn_Xe[a]?"right":"left",d=this.translit;if(!d)return;tn_h(d,"");var e=tn_Fc(b),f="client=t&text="+e+"&sl="+a+"&tl=und-Latn",g="/translate_a/t",i="POST";if(f[tn_n]<2000) {g+="?"+f;i="GET";f=""}tn_Ue(g,function() {if(!this.gd())return;var j=tn_De(this.Wd());tn_h(d,tn_Hc(tn_Nc(j)));tn_Ga(d[tn_w],"visible");d[tn_w].textAlign=c},i,f,tn_b,10000)};_TranslateForm[tn_].Mc=function(a,b,c) {function d(g,i) {if(g=="en"&&(i=="zh-TW"||i=="zh-CN"||i=="ko")||i=="en"&&(g=="zh-TW"||g=="zh-CN"||g=="ko"))return tn_c;return tn_a}var e=this.dictionary;if(e&&this.original_text[tn_s][tn_n]<=10&&d(a,b)) {var f="q="+tn_Fc(tn_Dc(this.original_text[tn_s]))+"&langpair="+a+"|"+b;tn_Ue("/translate_dict/feeds?client=tr&restrict=pr&"+f,function() {try{var g=this.mf(),i=g[tn_Nb]("primary");if(i[tn_n]==0) {tn_h(e,"");c.dict_done=tn_c;return}var j=[],k={};for(var l=0;l<i[tn_n];l++) {var m=i[l][tn_qb]("source_language"),n=i[l][tn_Nb]("term");for(var o=0;o<n[tn_n];o++)if(m!=n[o][tn_qb]("language")) {var q=n[o][tn_Nb]("text")[0][tn_F][0][tn_L],r=n[o][tn_Nb]("comment"),t=n[o][tn_qb]("part_of_speech");if(r[tn_n]>0)q=tn_Dc(q[tn_p](r[0][tn_F][0][tn_L],""));q=q[tn_p](/{.*?}/g,"");if(q[tn_n]>0&&q[tn_p](/[\(\)\[\]=.,;'`\-\u2019]|\s/g,"")[tn_n]>0) {var p=tn_e;if(t)p=t;if(k[p])k[p][tn_m](q);else{j[tn_m](p);k[p]=[q]}}}}if(j[tn_n]>0) {var s="<p class=thead>"+dhead+"</p><table>";for(var t in j) {s+="<tr><td valign=top>";if(j[t]&&pos[j[t]])s+=pos[j[t]-1];s+="</td><td><ol>";var n=k[j[t]];for(var w in n)s+="<li>"+n[w]+"</li>";s+="</ol></td></tr></tr>"}s+="<tr><td><a class=morelink href='http://www.google"+tld+"/dictionary?source=translation&hl="+tn_R("hl")[tn_s]+"&"+f+"'>"+dmore+"</a></td></tr></table>";tn_Ga(e[tn_w],"visible");tn_h(e,s)}else tn_h(e,"");c.timer.tick("dict");c.dict_done=tn_c;c.dict_data=k;tn_ek(c)}catch(u) {tn_h(e,"");c.dict_done=tn_c}},"GET",tn_b,tn_b,10000)}else{if(e)tn_h(e,"");c.dict_done=tn_c}};function _LanguageSelector(a,b) {this.original_select=tn_R(a);this.closure_select=tn_e;this.hidden_input=tn_e;if(tn_Q)return;this.keyboard_select_text="";this.keyboard_select_timer=tn_e;this.closure_select=new tn_4;var c=0,d=0;for(var e=0;e<this.original_select[tn_lb][tn_n];e++) {var f=this.original_select[tn_lb][e];this.closure_select.Z(new tn_Pf(tn_md("div",tn_b,f[tn_Ra]),f[tn_s]));if(f.selected)d=c;c++;if(f[tn_Oa]=="line-below") {this.closure_select.Z(new tn_Yf);c++}}this.closure_select.zb(d);this.hidden_input=tn_md("input",{name:this.original_select[tn_Gb],type:"hidden",value:this.original_select[tn_s]});tn_qd(this.hidden_input,this.original_select);tn_rd(this.original_select);this.closure_select.render(tn_R(b));tn_T(this.closure_select,tn_if,this.Xf,tn_a,this);tn_T(this.closure_select,"action",function(g) {tn_i(this.hidden_input,g[tn_y].j())},tn_a,this);tn_T(this.closure_select.kb(),"key",this.Yf,tn_a,this)}_LanguageSelector[tn_].Xf=function(a) {var b=a[tn_y].c(),c=b[tn_H],d=b[tn_Ib],e=b[tn_Kb],f=c[tn_Ha],g=c[tn_Kb];if(d<f)c.scrollTop=d;else if(d+e>f+g)c.scrollTop=d+e-g};_LanguageSelector[tn_].Yf=function(a) {tn_f[tn_Pa](this.keyboard_select_timer);var b=this.closure_select;this.keyboard_select_text+=tn_da.fromCharCode(a[tn_mb]);var c;c=b[tn_kb]()?b.Sa().V+1:b.Hb()+1;var d=0,e=new RegExp("^"+tn_da(this.keyboard_select_text)[tn_p](/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1")[tn_p](/\x08/g,"\\x08"),"i");do{if(c>=b.Ga())c=0;var f=b.ea(c).Fa;if(f&&f[tn_Za][tn_ib](e)) {if(b[tn_kb]())b.Sa().$a(c);else{b.zb(c);tn_i(this.hidden_input,b.j())}break}d++;c++}while(d<b.Ga());var g=this;this.keyboard_select_timer=tn_f[tn_Va](function() {g.keyboard_select_text=""},500)};_LanguageSelector[tn_].j=function() {return this.closure_select?this.closure_select.j():this.original_select[tn_s]};_LanguageSelector[tn_].J=function(a,b) {if(a) {if(this.closure_select)for(var c=0;c<this.closure_select.Ga();++c) {if(this.closure_select.ea(c).Fa&&this.closure_select.ea(c).j()==a) {if(b) {this.closure_select.zb(c);tn_i(this.hidden_input,this.closure_select.j())}return this.closure_select.ea(c).J()}}else for(var c=0;c<this.original_select[tn_n];++c)if(this.original_select[tn_lb][c][tn_s]==a) {if(b)this.original_select.selectedIndex=c;return this.original_select[tn_lb][c][tn_Ra]}return""}else return this.closure_select?this.closure_select.J():this.original_select[tn_lb][this.original_select.selectedIndex][tn_Ra]};var tn_fk="http://www.google"+tld+"/mb/plus_sm.gif",tn_gk="http://www.google"+tld+"/mb/minus_sm.gif";function _rolldown() {var a=tn_ga[tn_Ya]("zippyspan");tn_Ba(a,"");var b=tn_ga[tn_Ya]("suggestion_form");tn_Tj(b);var c=b[tn_zb](tn_c);tn_Sj(b);c.id="";tn_k(c[tn_w],"");var d=tn_ga[tn_Ya]("thanks"),e=d[tn_zb](tn_c),f=d[tn_w].padding[tn_n]>0?d[tn_w].padding[tn_C](0,d[tn_w].padding[tn_u]("px")):0,g=d[tn_w].margin[tn_n]>0?d[tn_w].margin[tn_C](0,d[tn_w].margin[tn_u]("em")):0;tn_Tj(e);e.id="";tn_pa(e[tn_w],"0em");tn_2j([c,e],function(i) {var j=new tn_ck(30);function k() {var l=j.next();if(j.more()) {tn_f[tn_Va](k,10);tn_k(b[tn_w],tn_Qj(tn_Uj(i[0][tn_J]*l,1)));tn_Tj(b);tn_k(d[tn_w],tn_Qj(tn_Uj(i[1][tn_J]*(1-l),1)));tn_xa(d[tn_w],tn_Qj(f*(1-l)));tn_pa(d[tn_w],g*(1-l)+"em")}else{tn_Ba(a,_rollup);for(var m=a[tn_B];m;m=m[tn_I])if(m[tn_q]==1&&m[tn_x]=="IMG") {m.src=tn_gk;break}tn_k(b[tn_w],"");tn_Sj(d);tn_k(d[tn_w],tn_Qj(0));tn_xa(d[tn_w],tn_Qj(0));tn_pa(d[tn_w],"0em");b.utrans[tn_pb]()}}tn_f[tn_Va](k,10)})}function _rollup() {var a=tn_ga[tn_Ya]("zippyspan");tn_Ba(a,"");var b=tn_ga[tn_Ya]("suggestion_form"),c=b[tn_zb](tn_c);tn_1j(c,function(d) {var e=new tn_ck(30);tn_k(b[tn_w],tn_Qj(d[tn_J]));function f() {var g=e.next();if(e.more()) {tn_f[tn_Va](f,10);tn_k(b[tn_w],tn_Qj(tn_Uj(d[tn_J]*(1-g),1)))}else{tn_Ba(a,_rolldown);for(var i=a[tn_B];i;i=i[tn_I])if(i[tn_q]==1&&i[tn_x]=="IMG") {i.src=tn_fk;break}tn_Sj(b);tn_k(b[tn_w],tn_Qj(0))}}tn_f[tn_Va](f,10)})}function _submitroll() {tn_f[tn_Va](function() {var a=tn_ga[tn_Ya]("zippyspan");tn_Ba(a,"");var b=tn_ga[tn_Ya]("suggestion_form"),c=b[tn_zb](tn_c);c.id="";var d=tn_ga[tn_Ya]("thanks");tn_Tj(d);var e=d[tn_zb](tn_c);tn_Sj(d);e.id="";tn_k(e[tn_w],"");tn_xa(e[tn_w],tn_Qj(2));tn_pa(e[tn_w],"0em");tn_2j([c,e],function(f) {var g=new tn_ck(20);tn_k(b[tn_w],tn_Qj(f[0][tn_J]));function i() {var j=g.next();if(g.more()) {tn_f[tn_Va](i,10);tn_Tj(d);tn_k(b[tn_w],tn_Qj(tn_Uj(f[0][tn_J]*(1-j),1)));tn_k(d[tn_w],tn_Qj(tn_Uj(f[1][tn_J]*j,1)));tn_xa(d[tn_w],tn_Qj(2*j));tn_pa(d[tn_w],j+"em")}else{tn_Ba(a,_rolldown);for(var k=a[tn_B];k;k=k[tn_I])if(k[tn_q]==1&&k[tn_x]=="IMG") {k.src=tn_fk;break}tn_k(d[tn_w],"");tn_xa(d[tn_w],tn_Qj(2));tn_pa(d[tn_w],"1em");tn_Sj(b)}}tn_f[tn_Va](i,10)})},1);return tn_c}function _csi(a,b,c,d) {var e={};if(d[tn_s][tn_n]>0) {if(b[tn_n]>0)e.sl=b;if(c[tn_n]>0)e.tl=c;e.size=d[tn_s][tn_n]}var f=tn_f.jstiming.load;f.tick("ol");tn_Ca(f,a);tn_f.jstiming.report(f,e)}function _lwords(a,b) {if(!a)return a;var c=a[tn_r](/\s+/),d=0;while(c[d]=="")++d;var e=c[d];for(++d;d<c[tn_n];++d)if(e[tn_n]+c[d][tn_n]<b)e+=" "+c[d];else break;return e[tn_n]<=b?e:e[tn_C](0,b)}function _isUrl(a) {a=tn_Dc(a);var b;try{b=tn_gg(a)}catch(c) {return tn_a}if(b.ba&&b.qa&&b.qa[tn_gb](/[\s\xa0]/)<0)return tn_c;if(0<=a[tn_gb](/[\s\xa0]/))return tn_a;b=tn_gg("http://"+a);if(!b.ba)return tn_a;var d=-1;if(b.ba.lastIndexOf(".")>=0)d=b.ba[tn_n]-b.ba.lastIndexOf(".")-1;if(d>=2&&d<=7)return tn_c;if(b.ba[tn_ib](/(\d{1,3}\.) {3}\d{1,3}/))return tn_c;return tn_a}tn_f.jstiming.load.tick("jl");