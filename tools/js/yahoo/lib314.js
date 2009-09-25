function isIE() {
	if(navigator.appName!="Microsoft Internet Explorer") {
		return false
	}return true
}function correctPNG() {
	for(var i=0;i<document.images.length;i++) {
		var img=document.images[i]var LW=img.widthvar LH=img.heightvar imgName=img.src.toUpperCase()if(imgName.substring(imgName.length-3,imgName.length)=="PNG") {
			img.style.filter+="progid:DXImageTransform.Microsoft.AlphaImageLoader(src="+img.src+", sizingmethod=scale);"img.src="http://cn.yimg.com/i/fix/tran.gif"img.width=LWimg.height=LH
		}
	}
}if(isIE()) {
	window.attachEvent("onload",correctPNG);
}function scale_img(i_d) {
	if(isNaN(i_d[0])||isNaN(i_d[1])) {
		return [60,60];
	}var w=0,h=0;
	if(i_d[0]>60||i_d[1]>60) {
		if(i_d[0]<i_d[1]) {
			h=60;
			w=Math.floor(i_d[0]*(60/i_d[1]));
		}else {
			w=60;
			h=Math.floor(i_d[1]*(60/i_d[0]));
		}
	}else {
		w=i_d[0];
		h=i_d[1];
	}return [w,h];
}function preload_img(imgs) {
	var o_img=new Array;
	for(var i=0;i<imgs.length;i++) {
		o_img[i]=new Image;
		o_img[i].src=imgs[i];
	}
}preload_img(["http://cn.yimg.com/i/hp/ny/patabsa.gif","http://cn.yimg.com/i/hp/ny/patabsb.gif","http://cn.yimg.com/i/hp/ny/patabsc.gif","http://cn.yimg.com/i/hp/ny/patabs1.gif","http://cn.yimg.com/i/hp/ny/icopr.gif","http://cn.yimg.com/i/hp/ny/icclr.gif","http://cn.yimg.com/i/hp/ny/ctabbg.gif","http://cn.yimg.com/i/hp/ny/tabarr.gif","http://cn.yimg.com/i/hp/ny/tabtop.gif","http://cn.yimg.com/i/hp/ny/loading.gif"]);
if(navigator.userAgent.toLowerCase().indexOf('msie 5.0')>0) {
	document.write('<link media=\"screen\" href=\"http://cn.yimg.com/i/css/hp/ny/yhppa_ie5.css?n122112\" type=\"text/css\" rel=\"stylesheet\" />');
}var we_ico=new Array;
we_ico[1]="http://cn.yimg.com/i/we/d/1.gif";
we_ico[2]="http://cn.yimg.com/i/we/d/6.gif";
we_ico[3]="http://cn.yimg.com/i/we/d/3.gif";
we_ico[4]="http://cn.yimg.com/i/we/d/13.gif";
we_ico[5]="http://cn.yimg.com/i/we/d/14.gif";
we_ico[6]="http://cn.yimg.com/i/we/d/15.gif";
we_ico[7]="http://cn.yimg.com/i/we/d/15.gif";
we_ico[8]="http://cn.yimg.com/i/we/d/11.gif";
we_ico[9]="http://cn.yimg.com/i/we/d/10.gif";
we_ico[10]="http://cn.yimg.com/i/we/d/20.gif";
we_ico[11]="http://cn.yimg.com/i/we/d/21.gif";
we_ico[12]="http://cn.yimg.com/i/we/d/23.gif";
we_ico[13]="http://cn.yimg.com/i/we/d/24.gif";
we_ico[14]="http://cn.yimg.com/i/we/d/23.gif";
we_ico[15]="http://cn.yimg.com/i/we/a/15.gif";
we_ico[16]="http://cn.yimg.com/i/we/d/27.gif";
we_ico[17]="http://cn.yimg.com/i/we/d/22.gif";
we_ico[18]="http://cn.yimg.com/i/we/d/22.gif";
we_ico[19]="http://cn.yimg.com/i/we/d/17.gif";
we_ico[20]="http://cn.yimg.com/i/we/d/12.gif";
we_ico[21]="http://cn.yimg.com/i/we/d/18.gif";
var _rnd=Math.random();
var pa_m={
	mail_api:"/mail/pa_module.php?module=mail&section=pa_mail&rnd="+_rnd+"&pid=1154057302&nvi="+_rnd,album_api:"/photo/main_page_gallery.php?nvi="+_rnd,mus_api:"/musicbox/home_interface.php?rnd="+_rnd,weath_api:"/weather_stock.html?type=weather&nvi="+_rnd,fin_api:"/weather_stock.html?type=stock&nvi="+_rnd,myweb_api:"/myweb/home_api.php?nvi="+_rnd,is_request:true,conobj:null,pa_panel:null,pa_con_height:120,pa_cur_con:null,pa_cur_pre:null,close_timer:null,wait_timer:null,wait_close_timer:null,is_in_anim:false,is_in_pa:true,is_load_da:false,loadstr:"<div class=\"loading\"><strong>"+_TXT_LOAD+"</strong><br /><img src=\"http://cn.yimg.com/i/hp/ny/loading.gif\" width=\"120\" height=\"15\"/></div>",warnstr:"<div class=\"pawarn\">"+_TXT_CONN_F+"</div>",mail:{
		logonstr:_MAIL_LOGON,nonestr:_MAIL_BLANK,reststr:_MAIL_REST
	},myweb:{
		nonestr:_MYWEB_BLANK,conid:"pamywebcon"
	},finance:{
		searchstr:_FINA_SEARCH
	},musicbox:{
		noconid:"pamus_no",conid:"pamus_con"
	}
};
function string_len(str,len) {
	if(str.length>len) {
		return str.substring(0,len)+"..";
	}return str;
}function number_len(num) {
	if(num.indexOf('.')==-1) {
		return (num+".00");
	}else if(num.length-num.indexOf('.')>2) {
		return (num.match(/^[+-]{
			0,1
		}\d+.\d{
			1,2
		}/g));
	}else {
		return (num.match(/^[+-]{
			0,1
		}\d+.\d{
			1,2
		}/g)+"0");
	}
}function pa_preview_cont(pa,id) {
	if(pa_m.conobj!=null&&pa_m.is_load_da) {
		ycn.Connect.abort(pa_m.conobj);
	}var cb={
		scope:this,success:null,failure:null,arguments:null
	};
	pa.innerHTML=pa_m.loadstr;
	pa_m.is_load_da=true;
	switch(id) {
		case 'pamail':cb.success=function (o) {
			try{
				if(o.responseText.indexOf('<!-')>=0) {
					o.responseText=o.responseText.substring(0,o.responseText.indexOf('<!-'));
				}var da=eval('('+o.responseText+')');
				if(da.MailResultSet.MailStatus=='1') {
					var m_html="<div class=\"maillst\">"+"<ul>"+"<li class=\"mlfrom\">"+_TXT_MAIL_FROM+"</li>"+"<li class=\"mlsubject\">"+_TXT_MAIL_SUBJECT+"</li>"+"<li class=\"mldate\">"+_TXT_MAIL_DATE+"</li>";
					for(var i=0;i<da.MailResultSet.UserMails.length;i++) {
						m_html+="<li class=\"mlfrom seen"+da.MailResultSet.UserMails[i].seen+"\"><a href=\""+da.MailResultSet.UserMails[i].url+"\">"+da.MailResultSet.UserMails[i].mfrom+"</a></li>";
						m_html+="<li class=\"mlsubject seen"+da.MailResultSet.UserMails[i].seen+"\"><a href=\""+da.MailResultSet.UserMails[i].url+"\">"+da.MailResultSet.UserMails[i].msubject+"</a></li>";
						m_html+="<li class=\"mldate seen"+da.MailResultSet.UserMails[i].seen+"\"><a href=\""+da.MailResultSet.UserMails[i].url+"\">"+da.MailResultSet.UserMails[i].mdtt+"</a></li>";
					}m_html+="</ul>";
					m_html+="</div>";
					m_html+=_MAIL_BOTTOM;
					pa.innerHTML=m_html;
				}else if(da.MailResultSet.MailStatus=='2') {
					pa.innerHTML=pa_m.mail.nonestr;
				}else if(da.MailResultSet.MailStatus=='3') {
					pa.innerHTML=pa_m.mail.reststr;
				}pa_m.is_load_da=false;
			}catch(e) {
				pa_m.is_load_da=false;
				pa.innerHTML=pa_m.warnstr;
			}
		};
		cb.failure=function () {
			pa.innerHTML=pa_m.mail.logonstr;
			pa_m.is_load_da=false;
		};
		if(!pa_m.is_request) {
			pa.innerHTML=pa_m.mail.logonstr;
			pa_m.is_load_da=false;
		}else {
			try{
				pa_m.conobj=ycn.Connect.asyncRequest('GET',pa_m.mail_api,cb,null);
			}catch(e) {
				pa.innerHTML=pa_m.warnstr;
				pa_m.is_load_da=false;
			}
		}break;
		case 'paalb':cb.success=function (o) {
			try{
				if(o.responseText.indexOf('<!-')>=0) {
					o.responseText=o.responseText.substring(0,o.responseText.indexOf('<!-'));
				}var da=eval('('+o.responseText+')');
				var d=scale_img([da.AlbumResultSet.AlbumCoverWidth,da.AlbumResultSet.AlbumCoverHeight]);
				if(da.AlbumResultSet.yid==null) {
					pa.innerHTML=(ycn.Common.getEl('paalb_con_b'))?ycn.Common.getEl('paalb_con_b').innerHTML:pa_m.mail.warnstr;
				}else if(da.AlbumResultSet.AlbumQuantity=='0') {
					pa.innerHTML=(ycn.Common.getEl('paalb_con_a'))?ycn.Common.getEl('paalb_con_a').innerHTML:"";
				}else {
					var m_html="<dl class=\"paalbcon\">"+"<dd><div class=\"at1\"><div style=\"width:60px;height:60px;margin:0 auto;overflow:hidden;\"><a href=\""+da.AlbumResultSet.AlbumUrl+"\" target=\"_blank\"><img src=\""+da.AlbumResultSet.AlbumCover+"\" width=\""+d[0]+"\" height=\""+d[1]+"\" title=\""+da.AlbumResultSet.AlbumTitle+"\" /></a></div></div><a href=\""+da.AlbumResultSet.AlbumUrl+"\">"+da.AlbumResultSet.AlbumTitle+"</a></dd>"+"<dd><div class=\"at1\"><a href=\"http://cn.up.photos.yahoo.com/ed/"+da.AlbumResultSet.yid+"/create_album?.dir=/\" target=\"_blank\"><img src=\"http://cn.yimg.com/i/hp/ny/ic/icalbnew.gif\" title=\""+_TXT_ALB_CREATE+"\" /></a></div><a href=\"http://cn.up.photos.yahoo.com/ed/"+da.AlbumResultSet.yid+"/create_album?.dir=/\">"+_TXT_ALB_CREATE+"</a></dd>"+"<dd style=\"text-align:left;\">"+"<div id=\"paalb_con_inf\">"+_TXT_ALB_C1+"&nbsp;<strong>"+da.AlbumResultSet.AlbumQuantity+"</strong>&nbsp;"+_TXT_ALB_C2+"</div>"+"<p><a href=\"http://cn.photos.yahoo.com/ph/my_photos\">&gt;&gt;"+_TXT_ALB_C4+"</a><br /><a href=\"http://gallery.photos.cn.yahoo.com/site/help/help1.php\">&gt;&gt;"+_TXT_ALB_C5+"</a></p>"+"</dd>"+"</dl>";
					pa.innerHTML=m_html;
				}pa_m.is_load_da=false;
			}catch(e) {
				pa_m.is_load_da=false;
				pa.innerHTML=pa_m.warnstr;
			}
		};
		cb.failure=function () {
			pa.innerHTML=(ycn.Common.getEl('paalb_con_b'))?ycn.Common.getEl('paalb_con_b').innerHTML:pa_m.mail.warnstr;
			pa_m.is_load_da=false;
		};
		if(!pa_m.is_request) {
			pa.innerHTML=(ycn.Common.getEl('paalb_con_b'))?ycn.Common.getEl('paalb_con_b').innerHTML:pa_m.mail.warnstr;
			pa_m.is_load_da=false;
		}else {
			try{
				pa_m.conobj=ycn.Connect.asyncRequest('GET',pa_m.album_api,cb,null);
			}catch(e) {
				pa.innerHTML=pa_m.warnstr;
				pa_m.is_load_da=false;
			}
		}break;
		case 'pamus':cb.success=function (o) {
			var html_template="<div class=\"precon\"><dl class=\"mucon\"><dd class=\"mulc\">"+"__MBOXLCON__</dd>"+"<dd class=\"murc\"><span id=\"pamus_crt\">__MBOXRCON_TOP__</span>"+"<span id=\"pamus_crb\">__MBOXRCON_BOTTOM__</span>"+"<div style=\"margin-top:.2em;\">__MBOXRCON_ENTRY__</div>"+"</dd></dl></div>";
			try{
				if(o.responseText.indexOf('<!-')>=0) {
					o.responseText=o.responseText.substring(0,o.responseText.indexOf('<!-'));
				}var da=eval('('+o.responseText+')');
				var total_songnum=parseInt(da.MusicBoxResult.Total);
				var songnum=(parseInt(da.MusicBoxResult.Total)>=2)?2:parseInt(da.MusicBoxResult.Total);
				var mbox_lt,mbox_rt,mbox_rb,mbox_entry;
				if(songnum>0) {
					mbox_rt="<div class=\"muinf\">"+_MBOXTXT_1.replace('__SONGNUM__',total_songnum)+"</div>";
					mbox_rb="<div class=\"musong\">"+_MBOXTXT_3+"<br />";
					for(var mbox_s_i=0;mbox_s_i<songnum;mbox_s_i++) {
						mbox_rb+="-&nbsp;<a href=\""+da.MusicBoxResult.SongList[mbox_s_i].SongURL+"\" target=\"_blank\">"+string_len(da.MusicBoxResult.SongList[mbox_s_i].SongName,15)+"</a><br />";
					}mbox_rb+="</div>";
				}else {
					mbox_rt="<div class=\"muinf\"><strong>"+_MBOXTXT_2+"</strong></div>";
					mbox_rb="<div style=\"color:#666;line-height:1.8em;\">"+_MBOXTXT_4+"</div>"
				}mbox_entry=(ycn.Common.getEl("pamus_entry"))?ycn.Common.getEl("pamus_entry").innerHTML:"";
				mbox_lt=(ycn.Common.getEl("pamus_clt"))?ycn.Common.getEl("pamus_clt").innerHTML:"";
				html_template=html_template.replace("__MBOXLCON__",mbox_lt);
				html_template=html_template.replace("__MBOXRCON_TOP__",mbox_rt);
				html_template=html_template.replace("__MBOXRCON_BOTTOM__",mbox_rb);
				html_template=html_template.replace("__MBOXRCON_ENTRY__",mbox_entry);
				pa.innerHTML=html_template;
				pa_m.is_load_da=false;
			}catch(e) {
				pa_m.is_load_da=false;
				pa.innerHTML=pa_m.warnstr;
			}
		};
		cb.failure=function () {
			if(ycn.Common.getEl('pamus_con')) {
				pa.innerHTML=ycn.Common.getEl('pamus_con').innerHTML;
			}else {
				pa.innerHTML=pa_m.warnstr;
			}
		};
		if(!pa_m.is_request) {
			if(ycn.Common.getEl('pamus_con')) {
				pa.innerHTML=ycn.Common.getEl('pamus_con').innerHTML;
			}else {
				pa.innerHTML=pa_m.warnstr;
			}
		}else {
			try{
				pa_m.conobj=ycn.Connect.asyncRequest('GET',pa_m.mus_api,cb,null);
			}catch(e) {
				pa.innerHTML=pa_m.warnstr;
				pa_m.is_load_da=false;
			}
		}break;
		case 'paweath':cb.success=function (o) {
			try{
				if(o.responseText.indexOf('<!-')>=0) {
					o.responseText=o.responseText.substring(0,o.responseText.indexOf('<!-'));
				}var da=eval('('+o.responseText+')');
				var m_html="<div class=\"paweacon\">"+"<div class=\"weatit\"><strong>"+da.WeatherCity+"</strong><em><a href=\"http://cn.yahoo.com/myweather.html\">"+_TXT_WEA_L1+"&gt;&gt;</a></em></div>"+"<dl class=\"weadd\">"+"<dd>"+"<img src=\""+we_ico[da.TodayNum]+"\"/><strong>"+_TXT_WEA_L2+"</strong><br />"+da.TodayWord+"<br /><span class=\"weanum\">"+da.TodayWeather+"</span>"+"</dd>"+"<dd style=\"border-left:1px solid #e5e5e5;\">"+"<img src=\""+we_ico[da.TomorrowNum]+"\"/><strong>"+_TXT_WEA_L3+"</strong><br />"+da.TomorrowWord+"<br /><span class=\"weanum\">"+da.TomorrowWeather+"</span>"+"</dd>"+"</dl>"+"<div style=\"text-align:right;line-height:3em;\"><a href=\"http://weather.cn.yahoo.com/\">"+_TXT_WEA_L4+"&gt;&gt;</a>&nbsp;&nbsp;</div>"+"</div>";
				pa.innerHTML=m_html;
				pa_m.is_load_da=false;
			}catch(e) {
				pa_m.is_load_da=false;
				pa.innerHTML=pa_m.warnstr;
			}
		};
		cb.failure=function () {
			pa.innerHTML=pa_m.warnstr;
			pa_m.is_load_da=false;
		};
		try{
			pa_m.conobj=ycn.Connect.asyncRequest('GET',pa_m.weath_api,cb,null);
		}catch(e) {
			pa.innerHTML=pa_m.warnstr;
			pa_m.is_load_da=false;
		}break;
		case 'pafin':cb.success=function (o) {
			try{
				if(o.responseText.indexOf('<!-')>=0) {
					o.responseText=o.responseText.substring(0,o.responseText.indexOf('<!-'));
				}var da=eval('('+o.responseText+')');
				if(da.length>0) {
					var m_html="<table width=\"330\" align=\"center\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"stocktb\"><tr>";
					var i=0;
					while(da[i]&&i<8) {
						m_html+="<tr><td><a href=\"http://cn.finance.yahoo.com/q?s="+da[i].code+"\" title=\""+da[i].name+"\" target=\"_blank\">"+string_len(da[i].name,3)+"</a></td>"+"<td class=\"s_"+da[i].color+"\">"+number_len(da[i].price)+"</td>"+"<td class=\"s_"+da[i].color+"\">"+number_len(da[i].percent)+"</td>";
						i++;
						if(da[i]) {
							m_html+="<td><a href=\"http://cn.finance.yahoo.com/q?s="+da[i].code+"\" title=\""+da[i].name+"\" target=\"_blank\">"+string_len(da[i].name,3)+"</a></td>"+"<td class=\"s_"+da[i].color+"\">"+number_len(da[i].price)+"</td>"+"<td class=\"s_"+da[i].color+"\">"+number_len(da[i].percent)+"</td></tr>";
							i++;
						}else {
							m_html+="<td>&nbsp;&nbsp;</td>"+"<td>&nbsp;&nbsp;</td>"+"<td>&nbsp;&nbsp;</td></tr>";
							break;
						}
					}m_html+="</tr></table><div style=\"text-align:right;line-height:1.6em;\"><a href=\"http://cn.yahoo.com/mystock.html\">"+_TXT_FINA_L1+"&gt;&gt;</a>&nbsp;&nbsp;</div>";
					m_html+=pa_m.finance.searchstr;
					pa.innerHTML=m_html;
				}else {
					pa.innerHTML=pa_m.warnstr;
				}pa_m.is_load_da=false;
			}catch(e) {
				pa_m.is_load_da=false;
				pa.innerHTML=pa_m.warnstr;
			}
		};
		cb.failure=function () {
			pa.innerHTML=pa_m.warnstr;
			pa_m.is_load_da=false;
		};
		try{
			pa_m.conobj=ycn.Connect.asyncRequest('GET',pa_m.fin_api,cb,null);
		}catch(e) {
			pa.innerHTML=pa_m.warnstr;
			pa_m.is_load_da=false;
		}break;
		case 'pamyw':cb.success=function (o) {
			try{
				if(o.responseText.indexOf('<!-')>=0) {
					o.responseText=o.responseText.substring(0,o.responseText.indexOf('<!-'));
				}var da=eval('('+o.responseText+')');
				if(da.TOTAL>0) {
					var m_html="<div class=\"myweblst\"><ul>";
					for(var i=0;i<da.DATA.length;i++) {
						m_html+="<li class=\"mwtit\">&nbsp;"+(i+1)+".<a href=\""+da.DATA[i].URL+"\" target=\"_blank\">"+da.DATA[i].TITLE+"</a></li><li class=\"mwda\">"+da.DATA[i].DATE+"&nbsp;</li>";
					}m_html+="</ul>"+"<div style=\"text-align:right;line-height:1.6em;\"><a href=\"http://myweb.cn.yahoo.com/my.html\">"+_TXT_MYWEB_L1+"&gt;&gt;</a></div>"+"<div class=\"x\"></div>"+"</div>";
					pa.innerHTML=m_html;
				}else if(da.TOTAL==0) {
					pa.innerHTML=pa_m.myweb.nonestr;
				}else {
					if(ycn.Common.getEl(pa_m.myweb.conid)) {
						pa.innerHTML=ycn.Common.getEl(pa_m.myweb.conid).innerHTML;
					}else {
						pa.innerHTML=pa_m.warnstr;
					}
				}pa_m.is_load_da=false;
			}catch(e) {
				pa_m.is_load_da=false;
				pa.innerHTML=pa_m.warnstr;
			}
		};
		cb.failure=function () {
			if(ycn.Common.getEl(pa_m.myweb.conid)) {
				pa.innerHTML=ycn.Common.getEl(pa_m.myweb.conid).innerHTML;
			}else {
				pa.innerHTML=pa_m.warnstr;
			}pa_m.is_load_da=false;
		};
		try{
			pa_m.conobj=ycn.Connect.asyncRequest('GET',pa_m.myweb_api,cb,null);
		}catch(e) {
			pa.innerHTML=pa_m.warnstr;
			pa_m.is_load_da=false;
		}break;
		default:pa_m.is_load_da=false;
		pa.innerHTML=pa_m.warnstr;
		break;
	};
}function disp_pa_preview(el) {
	if(!pa_m.is_in_pa||pa_m.pa_cur_pre==el.id) {
		return ;
	}var p=el.parentNode;
	while(p.tagName.toLowerCase()!='ul'&&p.tagName.toLowerCase()!='body') {
		p=p.parentNode;
	}if(p.tagName.toLowerCase()!='ul') {
		return ;
	}var con=ycn.Common.getEl(p.id+"previewdiv");
	if(!con) {
		return ;
	}pa_m.pa_cur_pre=el.id;
	if(pa_m.pa_cur_con!=null&&pa_m.pa_cur_con!=con) {
		con.innerHTML='';
		var o_con=pa_m.pa_cur_con;
		o_con.innerHTML='';
		if(ycn.Common.getEl(o_con.id.replace("previewdiv",""))) {
			var o_tabs=ycn.Common.getEl(o_con.id.replace("previewdiv",""));
			o_tabs.className="patabslst "+o_tabs.id;
		}var m=(o_con.offsetHeight)?o_con.offsetHeight:pa_m.pa_con_height;
		o_con.style.visibility="hidden";
		o_con.style.overflow="hidden";
		var close_con=function () {
			m-=30;
			if(m<=0) {
				o_con.style.height=0;
				o_con.style.display="none";
				window.clearInterval(tt_1)
			}else {
				o_con.style.height=m+"px";
			}
		}var tt_1=window.setInterval(close_con,1);
	}var class_name=p.id+"_"+el.id;
	el.parentNode.parentNode.className=(el.parentNode.parentNode.className.indexOf(class_name)>0)?el.parentNode.parentNode.className:"patabslst "+class_name;
	var n=(con.offsetHeight)?con.offsetHeight:0;
	pa_m.is_in_anim=true;
	pa_m.pa_cur_con=con;
	con.style.visibility="visible";
	con.style.display="block";
	con.style.overflow="hidden";
	var open_con=function () {
		n+=30;
		if(n>=pa_m.pa_con_height) {
			con.style.height=pa_m.pa_con_height+"px";
			con.style.overflow="visible";
			pa_m.is_in_anim=false;
			pa_preview_cont(con,el.id);
			window.clearInterval(tt_0);
		}else {
			con.style.height=n+"px";
		}
	}var tt_0=window.setInterval(open_con,1);
}function do_wait_open(e) {
	if(pa_m.is_in_anim||pa_m.is_in_pa) {
		return ;
	}if(ycn.Common.isIE()) {
		var el=window.event.srcElement;
	}else {
		var el=this;
	}while(el.tagName.toLowerCase()!='li'&&el.tagName.toLowerCase()!='body') {
		el=el.parentNode;
	}if(el.tagName.toLowerCase()!='li') {
		return ;
	}el=el.getElementsByTagName('a')[0];
	if(pa_m.wait_timer) {
		window.clearTimeout(pa_m.wait_timer);
	}pa_m.wait_timer=window.setTimeout(function () {
		disp_pa_preview(el);
	},200);
}function keep_pre_con(e) {
	if(pa_m.is_in_anim||pa_m.is_in_pa) {
		return ;
	}if(pa_m.wait_close_timer!=null) {
		window.clearTimeout(pa_m.wait_close_timer);
	}if(pa_m.wait_timer) {
		window.clearTimeout(pa_m.wait_timer);
	}ycn.Event.stopEvent(ycn.Event.getEvent(e));
}function keep_pa_preview(e) {
	pa_m.is_in_pa=true;
	if(pa_m.wait_close_timer!=null) {
		window.clearTimeout(pa_m.wait_close_timer);
	}ycn.Event.stopEvent(ycn.Event.getEvent(e));
}function close_pa_preview(e) {
	pa_m.is_in_pa=false;
	pa_m.wait_close_timer=window.setTimeout(function () {
		do_close_pa(e)
	},2000);
	ycn.Event.stopEvent(ycn.Event.getEvent(e));
}function do_close_pa(e) {
	if(pa_m.is_in_pa) {
		return ;
	}if(pa_m.is_in_anim) {
		return ;
	}pa_m.is_in_anim=true;
	var o_con=pa_m.pa_cur_con;
	if(!o_con) {
		pa_m.is_in_anim=false;
		return ;
	}if(ycn.Common.getEl(o_con.id.replace("previewdiv",""))) {
		var o_tabs=ycn.Common.getEl(o_con.id.replace("previewdiv",""));
		o_tabs.className="patabslst "+o_tabs.id;
	}var m=(o_con.offsetHeight)?o_con.offsetHeight:pa_m.pa_con_height;
	o_con.innerHTML='';
	o_con.style.visibility="hidden";
	o_con.style.overflow="hidden";
	var close_con=function () {
		m-=30;
		if(m<=0) {
			o_con.style.height=0;
			o_con.style.display="none";
			pa_m.is_in_anim=false;
			pa_m.pa_cur_con=null;
			pa_m.pa_cur_pre=null;
			window.clearInterval(pa_m.close_timer);
		}else {
			o_con.style.height=m+"px";
		}
	}pa_m.close_timer=window.setInterval(close_con,1);
}function init_pa_tabs(is_login) {
	pa_m.is_request=(is_login!='undefined')?is_login:true;
	var pa=ycn.Common.getEl('pabd');
	var patabs1=ycn.Common.getEl('patabs1');
	var patabs2=ycn.Common.getEl('patabs2');
	if(!pa||!patabs1||!patabs2)return ;
	pa_m.pa_panel=pa;
	var prediv=new Array;
	prediv[0]=ycn.Common.getElByClassName('div','papreviewdiv',1,pa);
	prediv[1]=ycn.Common.getElByClassName('div','papreviewdiv',2,pa);
	if(!prediv[0]||!prediv[1]) {
		return ;
	}var tabs1=patabs1.getElementsByTagName('li');
	var tabs2=patabs2.getElementsByTagName('li');
	for(var i=0;i<tabs1.length;i++) {
		ycn.Event.addEvent(tabs1[i],'mouseover',do_wait_open);
	}for(var i=0;i<tabs2.length;i++) {
		ycn.Event.addEvent(tabs2[i],'mouseover',do_wait_open);
	}ycn.Event.addEvent(pa,'mouseout',close_pa_preview);
	ycn.Event.addEvent(pa,'mouseover',keep_pa_preview);
	ycn.Event.addEvent(prediv[0],'mouseover',keep_pre_con);
	ycn.Event.addEvent(prediv[1],'mouseover',keep_pre_con);
	if(ycn.Common.getEl('patop')) {
		ycn.Event.addEvent(ycn.Common.getEl('patop'),'mouseover',function () {
			if(pa_m.wait_timer) {
				clearTimeout(pa_m.wait_timer);
			}
		});
	}
}function setcookie(name,value,domain) {
	value=escape(value);
	var nameString=name+"="+value;
	var extime=new Date();
	extime.setTime(extime.getTime()+315360000);
	var expiryString=";expires="+extime.toGMTString();
	var domainString="";
	var pathString=";path=/";
	var setvalue=nameString+expiryString;
	document.cookie=setvalue;
}function getcookie(name) {
	var CookieFound=false;
	var start=0;
	var end=0;
	var CookieString=document.cookie;
	var i=0;
	while(i<=CookieString.length) {
		start=i;
		end=start+name.length;
		if(CookieString.substring(start,end)==name) {
			CookieFound=true;
			break;
		}i++;
	}if(CookieFound) {
		start=end+1;
		end=CookieString.indexOf(";",start);
		if(end<start)end=CookieString.length;
		var getvalue=CookieString.substring(start,end);
		return unescape(getvalue);
	}return "";
}var tab_m={
	is_in_tab:false,tab_timer:null,tabs:{
	},con_height:{
	},cur_con:{
	},cur_tab:{
	}
};
function init_tab_con(tab_id,tab_con_id,defau_id,is_t) {
	var s=getcookie('CN_FP_TAB');
	if(!is_t) {
		tab_m.con_height[tab_id]=ycn.Common.getEl(tab_con_id).offsetHeight;
		ycn.Event.addEvent(ycn.Common.getEl(tab_id).getElementsByTagName('li')[0],'click',open_cont);
		if(s&&s.indexOf(tab_id+"=")>=0) {
			var cv=s.substring(s.indexOf(tab_id+"=")).substring(0,s.substring(s.indexOf(tab_id+"=")).indexOf(',end')).replace(tab_id+"=","").split(',');
			if(cv[2]=='close') {
				var opt=ycn.Common.getEl(tab_id).getElementsByTagName("li")[0];
			}
		}return ;
	}var op;
	if(s&&s.indexOf(tab_id)>=0) {
		var cv=s.substring(s.indexOf(tab_id+"=")).substring(0,s.substring(s.indexOf(tab_id+"=")).indexOf(',end')).replace(tab_id+"=","").split(',');
		cv[1]=(cv[1]=='')?'tab1':cv[1];
		var el=ycn.Common.getElByClassName("li",cv[1].replace(' on',''),1,ycn.Common.getEl(tab_id));
		var pre_con_id=el.getElementsByTagName('A')[0].className;
		ycn.Common.getEl(cv[0]).innerHTML=ycn.Common.getEl(pre_con_id).innerHTML;
		el.className+=" on";
		el.innerHTML="<span class=\"att\"></span>"+el.innerHTML;
		el.innerHTML=el.innerHTML.replace("pipe","arr");
		tab_m.cur_con[el.parentNode.id]=el.getElementsByTagName('a')[0].className;
		op=cv[2];
	}else {
		var el=ycn.Common.getElByClassName("li","tab1",1,ycn.Common.getEl(tab_id));
		ycn.Common.getEl(tab_con_id).innerHTML=ycn.Common.getEl(defau_id).innerHTML;
		el.className+=" on";
		el.innerHTML="<span class=\"att\"></span>"+el.innerHTML;
		el.innerHTML=el.innerHTML.replace("pipe","arr");
		ycn.Common.getEl(tab_con_id).innerHTML=ycn.Common.getEl(defau_id).innerHTML;
		op='open';
	}tab_m.con_height[tab_id]=ycn.Common.getEl(tab_con_id).offsetHeight;
	var opt=ycn.Common.getEl(tab_id).getElementsByTagName("li")[0];
	tab_m.cur_tab[tab_id]=el;
	if(op=='open') {
		open_cont_act(opt,true);
	}
}function click_tab(e) {
	if(ycn.Common.isIE()) {
		var el=window.event.srcElement;
	}else {
		var el=this;
	}while(el.tagName.toLowerCase()!='li'&&el.tagName.toLowerCase()!='body') {
		el=el.parentNode;
	}if(el.tagName.toLowerCase()!='li') {
		return ;
	}var lnk=el.getElementsByTagName('a')[0];
	if(lnk&&lnk.name) {
		lnk.name=lnk.name.replace(2,1);
	}if(el==tab_m.cur_tab[el.parentNode.id]) {
		if(lnk&&lnk.name) {
			lnk.name=lnk.name.replace(1,2);
		}return ;
	}var itm=el.getElementsByTagName('a')[0];
	change_tab_link(itm,true);
	change_tab_act(el);
	chkrd(e);
	ycn.Event.stopEvent(ycn.Event.getEvent(e));
}function change_tab_act(el) {
	tab_m.cur_tab[el.parentNode.id]=el;
	var group_id=el.parentNode.id,tab_a;
	for(var i=0;i<tab_m.tabs[group_id].length;i++) {
		tab_m.tabs[group_id][i].className=tab_m.tabs[group_id][i].className.replace(" on","");
		tab_a=tab_m.tabs[group_id][i].getElementsByTagName('a')[0];
		if(tab_m.tabs[group_id][i]!=el) {
			tab_a.style.fontWeight="normal";
		}else {
			tab_a.style.fontWeight="bold";
		}if(ycn.Common.getElByClassName('span','att',1,tab_m.tabs[group_id][i])) {
			tab_m.tabs[group_id][i].removeChild(ycn.Common.getElByClassName('span','att',1,tab_m.tabs[group_id][i]));
		}if(ycn.Common.getElByClassName('span','arr',1,tab_m.tabs[group_id][i])) {
			ycn.Common.getElByClassName('span','arr',1,tab_m.tabs[group_id][i]).className="pipe";
		}
	}var swi=el.parentNode.getElementsByTagName('li')[0];
	var state=swi.className.toLowerCase().replace('first ','');
	el.className+=" on";
	el.innerHTML="<span class=\"att\"></span>"+el.innerHTML;
	el.innerHTML=el.innerHTML.replace("pipe","arr");
	tab_m.cur_con[el.parentNode.id]=el.getElementsByTagName('a')[0].className;
	if(state=='open') {
		var curInsertClass=el.getElementsByTagName('a')[0].className;
		curInsertId=curInsertClass.substring(0,curInsertClass.indexOf("_"));
		document.getElementById(curInsertId).innerHTML=document.getElementById(curInsertClass).innerHTML;
		ycn.Common.getElByClassName('div','bel',1,document.getElementById(curInsertId)).visibility='hidden';
	}else {
		open_cont_act(swi);
	}var cv=getcookie('CN_FP_TAB'),v,c;
	if(!cv) {
		v=group_id+"="+group_id+"con,"+el.className+","+state+",end";
		setcookie('CN_FP_TAB',v);
	}else if(cv&&cv.indexOf(group_id+"=")<0) {
		v=group_id+"="+group_id+"con,"+el.className+","+state+",end";
		setcookie('CN_FP_TAB',cv+"|"+v);
	}else if(cv&&cv.indexOf(group_id+"=")>=0) {
		c=cv.substring(cv.indexOf(group_id+"="));
		c=c.substring(0,c.indexOf(',end'))+',end';
		v=group_id+"="+group_id+"con,"+el.className.replace(' on','')+","+state+",end";
		setcookie('CN_FP_TAB',cv.replace(c,v));
	}
}function out_tab(e) {
	tab_m.is_in_tab=false;
	if(ycn.Common.isIE()) {
		var el=window.event.srcElement;
	}else {
		var el=this;
	}while(el.tagName.toLowerCase()!='li'&&el.tagName.toLowerCase()!='body') {
		el=el.parentNode;
	}if(el.tagName.toLowerCase()!='li') {
		return ;
	}if(el.className.indexOf(" on")>=0) {
		return ;
	}if(tab_m.tab_timer!=null) {
		window.clearTimeout(tab_m.tab_timer);
	}var itm=el.getElementsByTagName('a')[0];
	change_tab_link(itm,true);
	ycn.Event.stopEvent(ycn.Event.getEvent(e));
}function over_tab(e) {
	tab_m.is_in_tab=true;
	if(ycn.Common.isIE()) {
		var el=window.event.srcElement;
	}else {
		var el=this;
	}while(el.tagName.toLowerCase()!='li'&&el.tagName.toLowerCase()!='body') {
		el=el.parentNode;
	}if(el.tagName.toLowerCase()!='li') {
		return ;
	}if(el.className.indexOf(" on")>=0) {
		return ;
	}if(tab_m.tab_timer!=null) {
		window.clearTimeout(tab_m.tab_timer);
	}var itm=el.getElementsByTagName('a')[0];
	tab_m.tab_timer=window.setTimeout(function () {
		change_tab_link(itm,false,el.offsetWidth);
	},50);
	ycn.Event.stopEvent(ycn.Event.getEvent(e));
}function change_tab_link(el,isc,w) {
	if(!isc) {
		el.style.margin="1px 1px 1px 0";
		el.style.width=(w)?(w-3)+"px":"97%";
		el.style.height="18px";
		el.style.overflow="hidden";
		el.style.backgroundColor="#9eceff";
		el.style.color="#0e4ec0";
		el.style.fontWeight="bold";
	}else {
		el.style.margin="";
		el.style.width="";
		el.style.height="";
		el.style.overflow="";
		el.style.backgroundColor="";
		el.style.color="";
		el.style.fontWeight="normal";
	}
}function open_cont(e) {
	if(ycn.Common.isIE()) {
		var el=window.event.srcElement;
	}else {
		var el=this;
	}while(el.tagName.toLowerCase()!='li'&&el.tagName.toLowerCase()!='body') {
		el=el.parentNode;
	}if(el.tagName.toLowerCase()!='li') {
		return ;
	}open_cont_act(el);
	ycn.Event.stopEvent(ycn.Event.getEvent(e));
}function open_cont_act(el,is_disp) {
	var con=ycn.Common.getEl(el.parentNode.id+"con");
	if(!con) {
		return ;
	}var con_c=ycn.Common.getElByClassName('div','bel',1,con);
	if(!con_c) {
		return ;
	}var group_id=el.parentNode.id,op;
	if(typeof(is_disp)!='undefined') {
		if(is_disp) {
			el.className="first open";
			con.style.height="auto";
			con_c.style.visibility="visible";
			op='open';
		}else {
			el.className="first close";
			con_c.style.visibility="hidden";
			con.style.height="5px";
			con.style.padding=0;
			op='close';
		}
	}else {
		el.className=(el.className.indexOf('open')>0)?el.className.replace('open','close'):el.className.replace('close','open');
		var state=el.className.replace('first ','');
		if(state=='open') {
			var h=con.offsetHeight;
			var max_h=(tab_m.con_height[el.parentNode.id]<=5)?120:tab_m.con_height[el.parentNode.id];
			var anim=function () {
				h+=50;
				if(h>=max_h) {
					con.style.height="auto";
					con.style.padding=".5em 0 0 0";
					con_c.style.visibility="visible";
					if(tab_m.cur_con[el.parentNode.id]&&ycn.Common.getEl(el.parentNode.id+"con")&&ycn.Common.getEl(tab_m.cur_con[el.parentNode.id])) {
						ycn.Common.getEl(el.parentNode.id+"con").innerHTML=ycn.Common.getEl(tab_m.cur_con[el.parentNode.id]).innerHTML;
					}if(tt) {
						window.clearInterval(tt);
					}
				}else {
					con.style.height=h+"px";
				}
			}var tt=setInterval(anim,1);
		}else {
			var h=con.offsetHeight;
			tab_m.con_height[group_id]=h;
			con_c.style.visibility="hidden";
			var anim=function () {
				h-=50;
				if(h<=5) {
					con.style.height="5px";
					con.style.padding=0;
					if(tt) {
						window.clearInterval(tt);
					}
				}else {
					con.style.height=h+"px";
				}
			}var tt=window.setInterval(anim,1);
		}op=state;
	}var cv=getcookie('CN_FP_TAB'),v,c,o;
	if(!cv) {
		v=group_id+"="+group_id+"con,,"+op+",end";
		setcookie('CN_FP_TAB',v);
	}else if(cv&&cv.indexOf(group_id+"=")<0) {
		v=group_id+"="+group_id+"con,,"+op+",end";
		setcookie('CN_FP_TAB',cv+"|"+v);
	}else if(cv&&cv.indexOf(group_id+"=")>=0) {
		c=cv.substring(cv.indexOf(group_id+"="));
		c=c.substring(0,c.indexOf(',end'))+',end';
		o=c.split(',');
		o[2]=op;
		v=o[0]+","+o[1]+","+o[2]+","+o[3];
		setcookie('CN_FP_TAB',cv.replace(c,v));
	}
}var pl_isover=false;
var pl_timer;
function dolisten() {
	var schListen1=document.getElementById("sch_listen1");
	var schListen2=document.getElementById("sch_listen2");
	ycn.Event.addEvent(schListen1,'mouseover',function () {
		pl_isover=true;
		var show=function () {
			if(pl_isover) {
				document.getElementById("too_sch_div").style.display='block';
			}
		}pl_timer=window.setTimeout(show,100);
	});
	ycn.Event.addEvent(schListen1,'mouseout',function () {
		pl_isover=false;
		var show=function () {
			if(!pl_isover) {
				document.getElementById("too_sch_div").style.display='none';
			}
		}pl_timer=window.setTimeout(show,100);
	});
	ycn.Event.addEvent(schListen2,'mouseover',function () {
		pl_isover=true;
		var show=function () {
			if(pl_isover) {
				document.getElementById("too_sch_div2").style.display='block';
			}
		}pl_timer=window.setTimeout(show,100);
	});
	ycn.Event.addEvent(schListen2,'mouseout',function () {
		pl_isover=false;
		var show=function () {
			if(!pl_isover) {
				document.getElementById("too_sch_div2").style.display='none';
			}
		}pl_timer=window.setTimeout(show,100);
	});
}ycn.Event.addEvent(window,'load',dolisten);
ycn.Event.addEvent(window,'load',function () {
	if(document.forms['search']&&document.forms['search'].elements['p']) {
		document.forms['search'].elements['p'].focus();
	}
});
function URLEncode(plaintext) {
	var SAFECHARS="0123456789"+"ABCDEFGHIJKLMNOPQRSTUVWXYZ"+"abcdefghijklmnopqrstuvwxyz"+"-_.!~*'()";
	var HEX="0123456789ABCDEF";
	var encoded="";
	for(var i=0;i<plaintext.length;i++) {
		var ch=plaintext.charAt(i);
		if(ch==" ") {
			encoded+="+";
		}else if(SAFECHARS.indexOf(ch)!=-1) {
			encoded+=ch;
		}else {
			var charCode=ch.charCodeAt(0);
			if(charCode>255) {
				encoded+="+";
			}else {
				encoded+="%";
				encoded+=HEX.charAt((charCode>>4)&0xF);
				encoded+=HEX.charAt(charCode&0xF);
			}
		}
	}return encoded;
};
ycn.Event.addEvent(document,'mousedown',chkrd);
function chkrd(e) {
	var e=ycn.Event.getEvent(e);
	var el=(e.target)?((e.target.nodeType==3)?e.target.parentNode:e.target):e.srcElement;
	if(el.tagName.toLowerCase()=='body'||el.tagName.toLowerCase()=='html') {
		return ;
	}if(el.tagName.toLowerCase()!='a') {
		if(el.parentNode.tagName.toLowerCase()!='a') {
			return ;
		}else {
			el=el.parentNode;
		}
	}if(!el.href||!el.name||el.name=='') {
		return ;
	}var newurl;
	if(document.images) {
		newurl="http://cn.rd.yahoo.com/home/"+el.name+"/"+'url='+URLEncode(el.href)+"/"+"*"+"http://cn.yimg.com/search/yisou/clk.gif?_rnd="+Math.random();
		(new Image()).src=newurl;
	}
}