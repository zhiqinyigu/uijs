/**
 * QQ Music 
 * Author : raymli@tencent.com
 * Datetime : 2010-9-7
 * Last Eidt: 2010-10-14

*/
function MusicJsonCallback(data){MI.Music.smartBoxCallback(data)}
function searchCallBack(data){MI.Music.searchCallBack(data)}
function searchJsonCallback(data){MI.Music.searchCallBack(data)}
function jsonCallback(data){MI.Music.favMusicCallBack(data)}
//include QQMusicInstance js
if(typeof initMusicR != 'function'){
	UI.getScript(MI.version.QQMusicInstance);
}
MI.tmpl.videoTool = '<div class="vTools" style="display:block"><a href="#" class="vClose"><em></em>收起</a><a href="$VideoRealUrl" class="vUrl" target="_blank"><em></em>$VideoTitle</a></div>';
MI.tmpl.videoThumbs = '<a href="#" class="vThumbs" url="$VideoPlayUrl"><span class="mask"><em></em></span><img src="$VideoPicUrl" /></a>';
MI.tmpl.videoObject = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="460" height="372" ><param name="wmode" value="transparent" /><param name="movie" value="$VideoPlayUrl" /><param name="allowScriptAccess" value="never" /><param name="allownetworking" value="internal" /><param name="allowFullScreen" value="true" /><param name="flashvars" value="playMovie=true"><param name="swfversion" value="50536.0.0.0" /><param name="expressinstall" value="Scripts/expressInstall.swf" /></object>';
MI.tmpl.videoEmbed = '<embed src="$VideoPlayUrl" quality="high" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="460" height="372" allowScriptAccess="never" allowFullScreen="true" allownetworking="internal" flashvars="playMovie=true" wmode="transparent"></embed>';
MI.tmpl.videoHTML5 = '<video width="460" height="362" controls="1" autoplay="autoplay" autobuffer="true" src="$VideoPlayUrl"></video>';
MI.Music = {
	//Dom
	talkBox : null,
	tipsMsg : ['对不起，该功能目前不支持您的浏览器。','对不起，您需要先安装QuickTime才能播放','下载最新版QQ音乐播放控件'],
	lastMusic : null,
	builded : false,
	build : function(o){
		var Self = this;
		Self.talkBox = o;
		_DefaultKey = '输入歌名/歌手名，点击搜索找歌';
		_Key = '';
		_P = 1;
		this.PageNum = 5;
		_Pi = 1;
		_Pfav = 1;
		Self.lastMusic = null;
		Self.musicState = null;
		if(!o.music){
			o.music = {};
		}
		//Self._music = o;
		//Self._musicAnchor = o.$('.newMusic');
		//Add QQ Music
		//build music dom
		var html = UI.html('<div class="mloadWrap" style="display:none"><div class="musicTab"><ul><li class="select"><b>搜索音乐</b></li><li><a href="#">我收藏的音乐</a></li></ul><a href="#" class="close" title="关闭">关闭</a></div><div class="m_searchBox clear"><input type="text" class="inputTxt" id="musicSearchBox" value="" autocomplete="off" /><button type="button" class="btn2">搜索</button></div></div>'),frag = document.createDocumentFragment();
		UI.each(html,function(o){
			UI.append(o,frag);
		});
		UI.append(frag,o._music);
		
		//Dom
		o._musicBox = $$(o._music,'.mloadWrap')[0];
		o._musicClose = $$(o._music,'.close')[0];

		o._musicSearchBox = $$(o._music,'.m_searchBox')[0];
		o._musicSearchKey = $('musicSearchBox');
		o._musicSearchBtn = $$(o._music,'.btn2')[0];

		Self.switchSearchKey();
		Self.bindSwitchTabs();

		//Event
		UI.EA(o._musicSearchKey,'keydown',function(e){
			var E = UI.E(e);
			if(E.key == 13){
				UI.E(e).stop();
				o._musicSearchBtn.click();
				o._musicSearchKey.blur();
				Self.stop('',true);
			}
		});
		UI.EA(o._musicSearchKey,'focus',function(e){
			var E = UI.E(e);
			Self.switchSearchKey();
		});
		UI.EA(o._musicSearchKey,'blur',function(e){
			var E = UI.E(e);
			Self.switchSearchKey();
		});
		o._musicSearchBtn.onclick = function(){
			Self.searchMusic(o._musicSearchKey.value);
			Self.stop('',true);
			return false;
		}
		o._musicClose.onclick = function(){
			Self.hide();
			Self.stop('',true);
			return false;
		}

		//smartbox
		MI.app({
			Base : function(){
				o.musicBox = new MI.SmartBox('musicSearchBox','','music',{left:0,top:2,width:212});
				o.musicBox.url = 'http://soso.music.qq.com/fcgi-bin/cgiSearchKeyWordMusicBox';
				o.musicBox.param = 'utf8=1&w=%key%';
			}
		});
		//Self.show();
		Self.builded = true;
	},
	switchSearchKey : function(a,b){
		var Self = this,k = Self.talkBox._musicSearchKey;
		var d = _DefaultKey;
		if(!UI.trim(k.value)){
			k.style.color = '#999';
			k.value  = d;
		}else if(UI.trim(k.value) == d){
			k.style.color = '#000';
			k.value  = '';
		}
	},
	bindSwitchTabs : function(){
		var Self = this,musicTab = $$(Self.talkBox._musicBox,'.musicTab')[0],
			tabs = $$(musicTab,'li');

		UI.each(tabs,function(o,num){
			if(num == 0){
				Self.lastTabs = o;
			}else{
				$$(o,'a')[0].onclick = function(){return false;}
			}
			o.onclick = function(){
				Self.bindSwitchTabsClick(this,num);
			}
		});
	},
	bindSwitchTabsClick : function(o,num){
		var Self = this;
		if(!o)	return;
		UI.A(Self.talkBox._musicBox,'tabs',num);
		if(o != Self.lastTabs){
			UI.removeClass(Self.lastTabs,'select');
			Self.lastTabs.innerHTML = '<a href="#">'+UI.text(Self.lastTabs)+'</a>';
			$$(Self.lastTabs,'a')[0].onclick = function(){return false;}

			UI.addClass(o,'select');
			o.innerHTML = '<b>'+UI.text(o)+'</b>';
			Self.lastTabs = o;

			Self.switchTabs(num);
		}
	},
	switchTabs : function(idx){
		var Self = this,box = Self.talkBox._musicBox,sBox = Self.talkBox._musicSearchBox,rCon = $$(box,'.rSearch')[0],fCon = $$(box,'.rFav')[0];
		switch(idx){
			case 0:
				UI.show(sBox);
				if(rCon)UI.show(rCon);
				if(fCon)UI.hide(fCon);
				break;
			case 1:
				UI.hide(sBox);
				if(fCon)UI.show(fCon);
				if(rCon)UI.hide(rCon);
				if(!fCon)Self.favMusic();
				break;
		}
	},
	tmpl : {//
		listAll : '<div class="m_sResult rSearch">\
				<%if(retcode == 0){%>\
					<%if(list.length > 0){%>\
						<div class="m_total clear">\
							<div class="left">搜索结果(<%=totalnum%>首)</div>\
							<div class="right">试听</div>\
						</div>\
						<div class="m_list">\
							<ul class="clear">\
							<%for(var i=0,n=list.length;i<n;i++){%>\
								<%var musicid = list[i].musicid,\
									songname = list[i].songname,\
									singername = list[i].singername,\
									songurl = list[i].songurl,\
									str = MI.Music.cut(MI.Music.getHTML(songname ),MI.Music.getHTML(singername));%>\
								<li music="<%=musicid%>,<%=songurl%>,<%=singername%>,<%=songname%>"><div><a href="#" title="点击添加-<%=songname%> - <%=singername%>"><%=str[0]%><span>- <%=str[1]%></span></a></div><a href="#" class="ico btn_play" id="play_<%=musicid%>" title="试听音乐"></a></li>\
							<%}%>\
							</ul>\
						</div>\
					<%}else{%>\
						<div class="m_noResult"><p>对不起，未找到"<%=_Key%>"的相关歌曲。</p><p>请检查关键词是否正确，或更换其他关键字搜索。</p></div>\
					<%}%>\
				<%}else{%>\
					<div class="m_noResult"><h4>系统繁忙，请稍后再试</h4></div>\
				<%}%>\
			</div>',
		listAll2 : '<div class="m_sResult rFav">\
				<%if(code == 0){%>\
					<div class="m_total clear">\
						<div class="left"<%for(var i=0,n=DirList.length;i<n;i++){if(SongDirID == DirList[i].DirID){%> title="<%=DirList[i].DirName%>"><%=MI.string.cut(DirList[i].DirName,32)%><%;break;}}%>(<%=SongList.length%>首)</div>\
						<div class="right">\
							<%if(DirList.length > 0){%>\
							<select>\
								<%for(var i=0,n=DirList.length;i<n;i++){%>\
								<option value="<%=DirList[i].DirID%>" DirName="<%=DirList[i].DirName%>" DirShow="<%=DirList[i].DirShow%>" DirTime="<%=DirList[i].DirTime%>" <%if(SongDirID == DirList[i].DirID){%>selected="true"<%}%>><%=DirList[i].DirName%></option>\
								<%}%>\
							</select>\
							<%}%>\
						</div>\
					</div>\
					<%if(SongList.length > 0){%>\
					<div class="m_list">\
						<ul class="clear">\
						<%for(var i=(curnum*curpage),n=(curnum*curpage+MI.Music.PageNum) > SongList.length ? SongList.length : (curnum*curpage+MI.Music.PageNum);i<n;i++){%>\
							<%var musicid = SongList[i].id,\
								songname = SongList[i].songname,\
								singername = SongList[i].singername,\
								songurl = SongList[i].url,\
								type = SongList[i].type,\
								str = MI.Music.cut(MI.Music.getHTML(songname ),MI.Music.getHTML(singername));%>\
							<%if(songurl){%><li music="<%=musicid%>,<%=songurl%>,<%=singername%>,<%=songname%>,<%=type%>"><div><a href="#" title="点击添加-<%=songname%> - <%=singername%>"><%=str[0]%><span>- <%=str[1]%></span></a></div><a href="#" class="ico btn_play" id="play_<%=musicid%>" title="试听音乐"></a></li><%}%>\
						<%}%>\
						</ul>\
					</div>\
					<%}else{%>\
						<div class="m_noFav"><h4>您尚未在列表中收藏任何歌曲</h4></div>\
					<%}%>\
				<%}else{%>\
					<div class="m_noFav"><h4>系统繁忙，请稍后再试</h4></div>\
				<%}%>\
			</div>'
	},
	favMusic : function(dirid,p){//list id
		this.stop('',true);
		dirid = dirid ? dirid : 200;
		var ouin = MI.Uin();
		if(!ouin)	return;
		var url = 'http://qzone-music.qq.com/fcg-bin/fcg_music_fav_getinfo.fcg';
		var param = ['dirinfo=1' ,'dirid='+dirid,'uin='+ouin,'r='+MI.random()];
		UI.getScript(url+"?"+param.join('&'),'','gb2312');
	},
	favMusicCallBack : function(data,page){
		var Self = this,noerr;
		Self.talkBox.favMusicData = data;

		if(data){
			data.curnum = this.PageNum;
			_Pfav= page ? page : 1;
			data.curpage=_Pfav-1;
			//if(data.code == 0){
				//改造一下数据结构，兼容搜索的接口
				data.totalnum = data.SongNum;
				var rCon = $$(Self.talkBox._musicBox,'.rFav')[0];
				var newSearch = UI.html(new UI.tmplString(Self.tmpl.listAll2)(data)),frag = document.createDocumentFragment();
				UI.each(newSearch,function(o){
					UI.append(o,frag);
				});
				if(!rCon){
					UI.append(frag,Self.talkBox._musicBox);
				}else{
					UI.replace(frag,rCon);
				}
				rCon = $$(Self.talkBox._musicBox,'.rFav')[0];

				var opage = $$(rCon,'.pages')[0];
				var page = Self.addPage(data,1);
				if(opage){
					UI.replace(page,opage);
				}else{
					UI.append(page,rCon);
				}
				var oSelect = $$(rCon,'select')[0];
				oSelect.onchange = function(){
					Self.favMusic(this.value);
				}
				Self.bindSongClickEvent(rCon,1);

				noerr = true;
			//}else{}
		}else{}

		if(!noerr){
			err = false;
		}
	},
	searchMusic : function(key,p,n){
		/*
		http://shopcgi.qqmusic.qq.com/fcgi-bin/shopsearch.fcg?value=&type=qry_song&out=json&page_no=1&page_record_num=10&uin=
		参数：
		value：｛搜索关键词｝
		type：{固定为qry_song}
		out：｛输出数据格式 json：输出json格式数据｝
		page_no：｛返回第几页结果｝
		page_record_num：｛每页返回几条记录｝
		uin：｛QQ号码｝
		*/
		var Self = this;
		if(!key || UI.trim(key) == _DefaultKey)	return;
		Self.talkBox.musicBox.hide();
		p = parseInt(p) > 0?parseInt(p):_P;
		n = parseInt(n) > 0?parseInt(n):this.PageNum;
		_Key = key;
		_Pi = p;
		//http://cgi.music.soso.com/fcgi-bin/fcg_search_xmldata.q?w=我和你&p=3&page_record_num=5&source=10
		var url = 'http://cgi.music.soso.com/fcgi-bin/fcg_search_xmldata.q';
		//var url = 'http://shopcgi.qqmusic.qq.com/fcgi-bin/shopsearch.fcg';
		//var url = '/asyn/musicsearch.php';
		var param = ['uin=' ,'w='+UI.encode(key) ,'p='+p ,'perpage='+n ,'source=10' ,'r='+MI.random(),'ie=utf-8 '];
		//var param = ['uin=' ,'value='+UI.encode(key) ,'page_no='+p ,'page_record_num='+n ,'type=qry_song' ,'out=json','r='+MI.random(),'utf8=1'];
		UI.getScript(url+"?"+param.join('&'),'','gb2312');

		MI.Bos('btnMusicPlayerSearch');
	},

	searchCallBack : function(data){
		//UI.removeClass(r,'loading');
		var Self = this,noerr;
		var s = [];

		if(data){
			//if(data.retcode == 0){
				var rCon = $$(Self.talkBox._musicBox,'.rSearch')[0];
				var newSearch = UI.html(new UI.tmplString(Self.tmpl.listAll)(data)),frag = document.createDocumentFragment();
				UI.each(newSearch,function(o){
					UI.append(o,frag);
				});
				if(!rCon){
					UI.append(frag,Self.talkBox._musicBox);
				}else{
					UI.replace(frag,rCon);
				}
				rCon = $$(Self.talkBox._musicBox,'.rSearch')[0];

				var opage = $$(rCon,'.pages')[0];
				var page = Self.addPage(data);
				if(opage){
					UI.replace(page,opage);
				}else{
					UI.append(page,rCon);
				}
				
				Self.bindSongClickEvent(rCon);

				noerr = true;
			//}else{}
		}else{}

		if(!noerr){
			nrk.innerHTML = _Key;
			UI.hide(r);
			UI.show(nr);
			if(opage){
					UI.remove(opage);
			}
			err = false;
		}
	},
	bindSongClickEvent : function(o,fav){
		if(!o)	return;
		var Self = this,
			m_sResult = o;
		fav=fav?fav:'';
		//Event
		UI.each($$(m_sResult,'.m_list li'),function(o){
			o.onclick = function(){
				Self.addPreview(this,fav);
				Self.stop();
				return false;
			}
			var playBtn = $$(o,'.btn_play')[0];
			if(Self.lastMusic){
				if(playBtn.id == Self.lastMusic.id){
					UI.A(playBtn,'play','1');
					UI.A(Self.lastMusic,'title','试听音乐');
					UI.removeClass(Self.lastMusic,'loading');
					UI.removeClass(playBtn,'btn_play');
					UI.addClass(playBtn,'btn_pause');
				}
			}
			playBtn.onclick = function(e){
				//music{song_id,songurl,singer_name,song_name}
				//这里有写啰嗦，后续小部分重构一下
				UI.E(e).stop();
				var play =  parseInt(UI.A(this,'play'));

				if(Self.lastMusic){
					UI.A(Self.lastMusic,'play','0');
					UI.A(Self.lastMusic,'title','试听音乐');
					UI.removeClass(Self.lastMusic,'loading');
					UI.removeClass(Self.lastMusic,'btn_pause');
					UI.addClass(Self.lastMusic,'btn_play');
				}
				if(!play){//btn_pause btn_play
					UI.A(this,'play','1');
					UI.removeClass(this,'btn_play');
					UI.addClass(this,'btn_pause');
					UI.addClass(this,'loading');
					UI.A(this,'title','暂停播放');
					Self.lastMusic = this;
					var music = UI.A(o,'music');
					var m =music.split(',');
					var arg = {};
					arg.songName = m[3];
					arg.songurl = m[1];
					arg.singerName = m[2];
					arg.songID = m[0];
					arg.type = m[4]?m[4]:'';
					Self.play(arg,fav);

				}else{
					Self.stop(this);
				}
				return false;
			}
		});
	},
	favPage : function(page){
		var Self = this;
		if(!Self.talkBox.favMusicData)	return;
		Self.talkBox.favMusicData.curnum = _P;
		Self.talkBox.favMusicData.curpage = page;
		Self.favMusicCallBack(Self.talkBox.favMusicData,page);

	},
	addPage : function(o,fav){
		//分页还有不少问题，暂时没空完善。最终的结果希望与腾讯网滚动列表页一致（经过UED，体验比较好）。
		/*
		<div class="pages" style="display:">
			<a href="#" class="disabled">上一页</a>
			<a href="#" class="cur">1</a>
			<a href="#">2</a>
			<a href="#">3</a>
			<a href="#">下一页</a>
		</div>
		*/
		var frag = document.createDocumentFragment(),s=[];
		var key = _Key;//o.keyword;
		var page_hold = this.PageNum;
		var totalnum = parseInt(o.totalnum);
		var curnum = parseInt(this.PageNum);
		var cur_page = fav ? _Pfav : _Pi;
		var total_page = Math.ceil(totalnum/curnum);
		if(!fav){
			total_page = total_page > 100 ? 100 : total_page;
		}
		var tmp='';
		if(totalnum <= 0 || totalnum <=page_hold){
			return UI.html('<div></div>')[0];
		}
		function r(cur){
			var start;// = (cur-2)<2 ? 2 : (cur-2);
			if((cur - 2) <= 2){
				start = 2;
			}else if((total_page - cur) < 4){
				start = cur - (4 - (total_page - cur));
			}else{
				start = cur - 2;
			}
			var end;
			if((cur - 2) <= 2){
				end = 5;
			}else if((cur > 1) && (cur < 3)){
				end = cur + 3;
			}else{
				end = cur + 2;
			}
			//start = start<2 ? 2 : start;
			end = end >=total_page ? total_page : end;
			var s = [],tmp;
			for(var i=start;i<end;i++){
				tmp = '<a href="#"';
				if(i == cur){tmp +=' class="cur"';}
				tmp+='page="'+i+'">'+i+'</a>';
				s.push(tmp);

			}
			return s.join('');
		}

		//page
		s.push('<div class="pages">');
		//prev page
		tmp = '<a href="#"';
		if(cur_page <= 1){tmp +=' class="disabled"';}
		tmp+='page="'+(cur_page-1)+'">上一页</a>';
		s.push(tmp);
		//first page
		if(total_page >1){
			tmp = '<a href="#"';
			if(cur_page <= 1){tmp +=' class="cur"';}
			tmp+='page="1">1</a>';
			s.push(tmp);
		}
		//
		if(cur_page >= page_hold && total_page > page_hold){
			s.push('<span>...</span>');
		}

		s.push(r(cur_page));

		//$page_total &gt; $count) and ($page_cur &lt;= ($page_total - $count + 1)
		if((total_page > page_hold) && cur_page <= (total_page - page_hold + 1)){
			s.push('<span>...</span>');
		}
		//last page 
		tmp = '<a href="#"';
		if(cur_page >= total_page){tmp +=' class="cur"';}
		tmp+='page="'+total_page+'">'+total_page+'</a>';
		s.push(tmp);
		//next page
		tmp = '<a href="#"';
		if(cur_page >= total_page){tmp +=' class="disabled"';}
		tmp+='page="'+(cur_page+1)+'">下一页</a>';
		s.push(tmp);

		s.push('</div>');
		var html = UI.html(s.join(''))[0];

		UI.each($$(html,'a'),function(o){
			o.onclick = function(e){
				if(UI.hasClass(this,'disabled') || UI.hasClass(this,'cur'))	return false;
				var p = parseInt(UI.A(this,'page'));
				if(fav){
					MI.Music.favPage(p);
				}else{
					MI.Music.searchMusic(key,p);
				}
				return false;
			}
		});
		return html;
	},
	addPreview : function(o,fav){
		//music{song_id,songurl,singer_name,song_name}
		var Self = this;
		var prview = '<span class="preview"><span class="link"><a class="fileName" href="#"><span class="m_name">%song_name%</span><b class="m_Intro">%song_fullname%<span> - %singer_name%</span></b></a></span><a class="del" href="#" title="删除">[删除]</a></span>';
		var attr = UI.A(o,'music');
		var op = $$(Self.talkBox._music,'.preview')[0];
		var m = attr.split(',');

		var p = prview.replace(/\%song_name\%/g,MI.string.cut(MI.string.html(m[3]),10)).replace(/\%singer_name\%/g,MI.string.html(m[2])).replace(/\%song_fullname\%/g,MI.string.html(m[3]));
		Self.talkBox._musicPreview = UI.html(p)[0];
		if(op)	UI.remove(op);
		//Self.music = attr;
		//Self.music = '["'+escape(m[0])+'","'+escape(m[1])+'","'+escape(m[2])+'","'+escape(m[3])+'"]';
		Self.talkBox.music = {
			"id" : m[0],
			"song" : m[3],
			"singer" : m[2],
			"songurl" : m[1],
			"songtype" : (m[4] && m[4] % 10 == 1) ? 2 : ''
		}
		UI.before(Self.talkBox._musicPreview,Self.talkBox._musicBox);
		
		var link = $$(Self.talkBox._musicPreview,'.fileName')[0];
		link.onclick = function(){
			//显示音乐搜索浮层
			Self.show();
			return false;
		}

		var del = $$(Self.talkBox._musicPreview,'.del')[0];
		del.onclick = function(e){
			UI.E(e).stop();
			Self.talkBox.delMusic();
			return false;
		}
		UI.hide(Self.talkBox._musicBox);
		UI.hide(Self.talkBox._musicAnchor);

		UI.ajax({
			url : '/asyn/musicPlayUrl.php',
			data : {
				musicID : m[0],
				musicSong : escape(m[3]),
				musicSinger : escape(m[2]),
				musicLocation : m[1]
			},
			success : function(data){
				data = MI.json(data);
				var shorturl = '',url = '';
				if(data.result == 0){
					shorturl = data.url;
					url =  ' http://url.cn/' + shorturl;
				}
				Self.talkBox.music.shorturl = shorturl;
				Self.talkBox.txtMusic = '#分享音乐# ' + m[3].replace(/\&quot;/gi,'"') + '-' + m[2].replace(/\&quot;/gi,'"') + url+' ';
				if(Self.talkBox._txt.value != Self.talkBox.txtMusic){
					Self.talkBox._txt.value += Self.talkBox.txtMusic;//'#'+Self.txtMusic+'# ' + m[3] + '-' + m[2] + '';
				}else{
					Self.talkBox._txt.value = Self.talkBox.txtMusic;
				}
				Self.talkBox.countTxt();
				Self.talkBox.focus();
			}
		})
		MI.Bos('btnMusicAddTalkBox'+fav);
	},
	cut : function(str1,str2){
		//双标题互斥截字 还不够完善后续优化
		var snum = 48;//行内文字总数；
		var fix1 = 36;
		var fix2 = snum-fix1;
		var s=[str1,str2];
		var s1 = MI.string.length(str1);
		var s2 = MI.string.length(str2);
		if((s1+s2) > snum){
			if(s1 > fix1 && s2 <= fix2){
				s[0] = MI.string.cut(str1,snum-s2);
				s[1] = str2;
			}else if (s1 <= fix1 && s2 > fix2){
				s[0] = str1;
				s[1] = MI.string.cut(str2,snum-s1);
			}else{
				s[0] = MI.string.cut(str1,fix1);
				s[1] = MI.string.cut(str2,fix2);
			}
		}
		return s;
	},
	smartBoxCallback : function(data){
		//加try catch防止不必要的报错影响页面呈现
		var Self = this,musicBox = Self.talkBox.musicBox;
		try{
			if(data.head.error == 0 && data.item){
				if(data.item.length > 0){			
					var s = [];
					var l = data.item.length;
					musicBox.indexMax = l - 1;
					musicBox.index = -1;
					s.push('<ul>');
					for(var i=0;i<l;i++){
						s.push('<li value=\"'+ data.item[i].w +'\">' + data.item[i].w + '</li>');
					}
					s.push('</ul>');
					musicBox._select.innerHTML = s.join("");
					musicBox.show();
					musicBox._list = $$(musicBox._select,'li');
					//Event
					UI.each(musicBox._list,function(el,i){
						el.onmouseover = function(){
							musicBox.select(i);
						}
						el.onclick = function(){
							musicBox._key.value = this.innerHTML;
							Self.searchMusic(musicBox._key.value);
						}
					});
					s=l=null;
				}else{
					musicBox.hide();
				}
			}else{
				musicBox.hide();
			}
		}catch(e){musicBox.hide();}
	},
	getHTML : function(str){
		//取韩文、日文等，防止直接用字符串造成截字乱码
		if(!str)	return '';
		str = MI.string.html(str);
		var s = UI.html('<div>'+str+'</div>')[0];
		return s.innerHTML;
	},
	play : function(music,fav){
		//function playSongWithNoCheck(name,url,qusid,ifexp,qzonekey,singerName,iSongId,iSongType)
		/*
		name : 歌曲名
		url : 歌曲url
		qusid : 固定为'-1'
		ifexp : 固定为true
		qzonekey :固定置空''
		singerName : 歌手名
		iSongId : 歌曲id
		iSongType : 搜索接口中固定为3
		*/
		try{MI.TalkList.musicStop(1);}catch(e){}
		if(!music.songID)	return false;
		var name,url,qusid,ifexp,qzonekey,singerName,iSongId,iSongType;
		name = music.songName;
		url = music.songurl;
		qusid = (music.type && music.type % 10 == 1) ? -1 : music.songID;
		ifexp = true;
		qzonekey = '';
		singerName = music.singerName;
		iSongId = music.songID;
		iSongType = 3;
		if(typeof playSongWithNoCheck == 'function'){
			//不加延时可能因为上一个播放停止状态导致当前播放被中止
			setTimeout(function(){
				playSongWithNoCheck(name,url,qusid,ifexp,qzonekey,singerName,iSongId,iSongType,MI.Music.playerCallback);
				MI.Music.musicState = 1;
				MI.Bos('btnMusicPlayerPreview'+fav);
			},1000);
		}

	},
	playerCallback : function(s){
		//播放器 OnStateChanged 回调
		/*
			以下事件还未侦听，后续做页内播放器将完善事件侦听机制
			OnInitialized,OnUninitialized,OnPlayProgress,OnPlayError,OnPlaySrcChanged
		*/
		/*	OnStateChanged 状态码
			QPS_Undefined       = 0,     Undefined (Initial or crashed)
			QPS_Stopped         = 1,     Player has been stopped
			QPS_Paused          = 2,     Player has been paused
			QPS_Playing         = 3,     Player is playing media
			QPS_Buffering       = 4,     Player is in data buffering
			QPS_BeginPlay       = 5,     Player begin to play
			QPS_PlayEnd         = 6,     Player meet the end of media
		*/
		switch (s){
			//除了缓冲和载入状态，其余状态要显示歌曲名
			case 5:case 3:case 2:case 0:default:
				UI.removeClass(MI.Music.lastMusic,'loading');
				state = 1;
				break;
			case 6:case 1:
				//MI.Music.stop('',true);
				break;
		}
		/*if(a == 3 || typeof a == 'undefined'){
			UI.removeClass(MI.Music.lastMusic,'loading');
		}*/
	},
	stop : function(o,b){
		var e = o ? o : MI.Music.lastMusic;
		if(e){
			UI.A(e,'play','0');
			UI.removeClass(e,'btn_pause');
			UI.removeClass(e,'loading');
			UI.addClass(e,'btn_play');
		}
		if(b){
			MI.Music.lastMusic = null;
		}
		if(MI.Music.musicState){
			try{stopPlayer();}catch(e){}
		}
		MI.Music.musicState = 0;
	},
	clear : function(){
		var Self = this,
			musicTab = $$(Self.talkBox._musicBox,'.musicTab')[0],
			tabs = $$(musicTab,'li');
		Self.stop();
		Self.talkBox._musicSearchKey.value = '';
		Self.switchSearchKey();
		Self.bindSwitchTabsClick(tabs[0],0);
		UI.each($$(Self.talkBox._musicBox,'.m_sResult'),function(o){
			UI.remove(o);
		});
	},
	show : function(){
		UI.show(this.talkBox._musicBox);
		this.talkBox._musicSearchKey.focus();
		UI.hide(this.talkBox._videoBox);
	},
	hide : function(){
		UI.hide(this.talkBox._musicBox);
		this.stop();
	}
}
MI.getMusicData = function(url){
	var s={};
	var u = url.split("?");
	if(u[1]){
		var p = u[1].split("&");
		for(var i=0,l=p.length;i<l;i++){
			var v = p[i].split("=");
			s[v[0]] = v[1];
		}
	}
	return s;
}
MI.openMusic = function(url){
	if(!url)	return;

	var songData = MI.getMusicData(url);
	var oPostData = {
		"type":"1",
		"vip":"-1",
		"userName":"",
		"playXsosoFlag":"0"
	};
	var playUrl = songData.url;//'http://upload'+songData.stream+'.music.qzone.soso.com/'+(parseInt(songData.songID)+12000000)+'.wma';
	//var url = 'http://music.soso.com/url_player.html?song='+escape(UI.decode(songData.song))+'&singer='+escape(UI.decode(songData.singer))+'&url='+escape(playUrl)+'&stream=0&songID=0';
	var url = 'http://music.soso.com/url_player.html?song='+(songData.song)+'&singer='+(songData.singer)+'&url='+escape(playUrl)+'&stream=0&songID=0';
	var win = window.open(url, "_webSosoMusicPlayerFrame", MI.listen_feature);
	if(!win){
		MI.alert("弹出窗口被拦截,请取消拦截!");
		MI.Bos('btnMusicPlayerWinBlock');
	}else{
		MI.Bos('btnMusicPlayerWinOpen');
	}
	return false;
}
MI.OpenPostWindow = function(sUrl, sWindowName, oPostData){
	this._openPlayer("http://cache.music.soso.com/sosocache/music/playerdata_loading.html");
	if (typeof sWindowName !== "string"){
		sWindowName = "";
	}
	var sFormId = "post_window_form";
	var oForm = document.getElementById(sFormId);
	if (oForm != null) {
		document.body.removeChild(oForm);
	}
	var oForm = document.createElement("form");
	oForm.id = sFormId;
	oForm.action = sUrl;
	oForm.method = "POST";
	oForm.target = sWindowName;
	for (key in oPostData){
		var oInput = document.createElement("input");
		oInput.type = "hidden";
		oInput.name = key;
		oInput.value = oPostData[key];
		oForm.appendChild(oInput);
	}
	document.body.appendChild(oForm);
	oForm.submit();
}
MI.listen_feature = 'toolbar=no,location=no,menubar=no,resizable=yes,status=yes,scrollbars=no,width=750,height=550,left=100,top=10';
MI.mediaMutex = function(obj,b){
	var p = UI.parents(obj,'mediaWrap')[0];
	if(!p)	return;
	var s = ['picBox','videoBox'];
	for(var i=0,l=s.length;i<l;i++){
		if(!b){
			if(!UI.parents(obj,s[i])[0]){
				UI.hide($$(p,'.'+s[i])[0]);
				if(s[i] == 'picBox'){
					var picBox = $$(p,'.'+s[i])[0];
					if(picBox){
						if(UI.hasClass(picBox,'big')){
							UI.removeClass(picBox,'big');
						}
						var canvas = $$(picBox,'canvas')[0];
						if(canvas){
							UI.hide(canvas);
						}
					}
				}
			}else{
				UI.show($$(p,'.'+s[i])[0]);
			}
		}else{
			UI.show($$(p,'.'+s[i])[0]);
		}
	}
	
}
MI.TalkList.music = function(a,b){ //Music Event
	//关闭正在播放的音乐
	try{MI.TalkList.musicClose()}catch(e){}
	//关闭正在播放的其他视频
	try{MI.TalkList.videoClose();}catch(e){}
	//var _this = a;
	var musicBox = a;//_this.parentNode,
	mThumbsBox = $$(musicBox,'.mThumbsBox')[0],
	mBox = $$(musicBox,'.mBox')[0],
	mTitBox = $$(mBox,'.mTitBox')[0],
	mPlayerPlaying = $$(mTitBox,'.mPlayerPlaying')[0],
	mPlayerState = $$(mTitBox,'.mPlayerState')[0];

	MI.TalkList.lastMusic = musicBox;

	if(MI.Music){
		MI.Music.stop('',true);
	}
	MI.music.info = {
		songurl : UI.A(musicBox,'songurl'),
		songID : UI.A(musicBox,'songid'),
		songName : UI.A(musicBox,'song'),
		singerName : UI.A(musicBox,'singer'),
		songtype : UI.A(musicBox,'songtype')
	}
	var link = '<a class="mPlayerPlaying" href="http://music.soso.com/url_player.html?song=%esong%&singer=%esinger%&url=%songurl%&stream=0&songID=0" target="_blank" title="%song%-%singer%"><span style="margin-right:10px;">%song%-%singer%</span></a>';
	
	link = link.replace(/\%esong\%/gi,escape(UI.A(musicBox,'song'))).replace(/\%esinger\%/gi,escape(UI.A(musicBox,'singer'))).replace(/\%song\%/gi,UI.A(musicBox,'song')).replace(/\%singer\%/gi,UI.A(musicBox,'singer')).replace(/\%songurl\%/gi,UI.A(musicBox,'songurl')).replace(/\%songid\%/gi,UI.A(musicBox,'songid'));

	if(!mPlayerPlaying){
		UI.append(UI.html(link)[0],mTitBox);
		mPlayerPlaying = $$(mTitBox,'.mPlayerPlaying')[0];
	}
	if(!mPlayerState)	UI.append(UI.html('<span class="mPlayerState"></span>')[0],mTitBox)
	
	mPlayerPlaying.onclick = function(){
		MI.TalkList.musicClose();
		MI.openMusic(this.href);
		//MI.Bos('btnMusicPlayerWinOpen');
		return false;
	}

	UI.hide(mThumbsBox);
	
	mBox.style.display = 'block';
	if(typeof initMusicR != 'function'){
		UI.getScript(MI.version.QQMusicInstance,function(){
			if(initMusicR){
				MI.TalkList.musicPlay(MI.music.info);
			}
		});
	}else{
		MI.TalkList.musicPlay(MI.music.info);
	}
	//MI.mediaMutex(mBox);
}
MI.TalkList.musicPlay = function(music){
	//function playSongWithNoCheck(name,url,qusid,ifexp,qzonekey,singerName,iSongId,iSongType)
	/*
	name : 歌曲名
	url : 歌曲url
	qusid : 固定为'-1'
	ifexp : 固定为true
	qzonekey :固定置空''
	singerName : 歌手名
	iSongId : 歌曲id
	iSongType : 搜索接口中固定为3
	*/
	if(!music.songurl || !music.songID)	return false;
	var name,url,qusid,ifexp,qzonekey,singerName,iSongId,iSongType;
	name = music.songName;
	url = music.songurl
	qusid = (music.songtype && music.songtype != 1) ? -1 : music.songID;
	ifexp = true;
	qzonekey = '';
	singerName = music.singerName;
	iSongId = music.songID;
	iSongType = 3;
	
	if(typeof playSongWithNoCheck == 'function'){
		setTimeout(function(){
			var musicBox = MI.TalkList.lastMusic;
			mBox = $$(musicBox,'.mBox')[0],
			mTitBox = $$(mBox,'.mTitBox')[0],
			mPlayerPlaying = $$(mTitBox,'.mPlayerP\laying')[0],
			mPlayerState = $$(mTitBox,'.mPlayerState')[0],
			mPlay = $$(mBox,'.btn_mPlay')[0],
			mPause = $$(mBox,'.btn_mPause_hover')[0];
			UI.show(mPause);
			UI.hide(mPlay);

			UI.A(musicBox,'play','1');
			MI.TalkList.musicScroll(musicBox);
			//默认就展示歌曲名，正在载入的提示以后等状态稳定再做
			//MI.TalkList.musicTit(MI.TalkList.lastMusic,'loading');
			playSongWithNoCheck(name,url,qusid,ifexp,qzonekey,singerName,iSongId,iSongType,MI.TalkList.musicPlayerOnStateChanged);
			//var BosStr = iSongId+'@@'+name+"@@"+singerName;
			//MI.Bos('btnMusicPlay',encodeURI(BosStr));
			MI.music.state = 3;
			MI.GoTop.showMusicBox(1);
			MI.Bos('btnMusicPlay');
		},1000);
	}
}
MI.TalkList.musicPlayBtn = function(o,b){//b=1播放，b=0停止
	if(o){
		var mPlay = $$(o,'.btn_mPlay')[0],
		mPause = $$(o,'.btn_mPause_hover')[0];
		UI.hide(b ? mPlay: mPause);
		UI.show(b ? mPause: mPlay);
	}
}
MI.TalkList.musicTit = function(m,s){
	var musicBox = m,
	mBox = $$(musicBox,'.mBox')[0],
	mTitBox = $$(mBox,'.mTitBox')[0],
	mPlay = $$(mBox,'.btn_mPlay')[0],
	mPause = $$(mBox,'.btn_mPause_hover')[0],
	mPlayerPlaying = $$(mTitBox,'.mPlayerPlaying')[0],
	mPlayerState = $$(mTitBox,'.mPlayerState')[0];

	var state = 0;
	switch (s){
		//除了缓冲和载入状态，其余状态要显示歌曲名
		case 6:case 5:case 3:case 2:case 1:case 0:case "undefined":default:
			state = 1;
			break;
		case 4:
			mPlayerState.innerHTML = '<em class="loading"></em>正在缓冲...';
			state = 0;
			break;
		case 'loading':
			mPlayerState.innerHTML = '<em class="loading"></em>正在载入...';
			state = 0;
			break;
	}
	if(state ==1){
		UI.show(mPlayerPlaying);
		UI.hide(mPlayerState);
		MI.TalkList.musicScroll(musicBox);
		
	}else{
		UI.show(mPlayerState);
		UI.hide(mPlayerPlaying);
		MI.TalkList.musicMarqueePause();
	}
	musicBox=mBox=mPlay=mPause=mTit=null;
}
MI.TalkList.musicPlayerOnStateChanged = function(s){
	//播放器 OnStateChanged 回调
	/*
		以下事件还未侦听，后续做页内播放器将完善事件侦听机制
		OnInitialized,OnUninitialized,OnPlayProgress,OnPlayError,OnPlaySrcChanged
	*/
	/*	OnStateChanged 状态码
		QPS_Undefined       = 0,     Undefined (Initial or crashed)
		QPS_Stopped         = 1,     Player has been stopped
		QPS_Paused          = 2,     Player has been paused
		QPS_Playing         = 3,     Player is playing media
		QPS_Buffering       = 4,     Player is in data buffering
		QPS_BeginPlay       = 5,     Player begin to play
		QPS_PlayEnd         = 6,     Player meet the end of media
	*/
	//对播放状态做wording提示处理
	MI.TalkList.musicTit(MI.TalkList.lastMusic,s);
	MI.music.state = s;
	//暂时不对播放状态做其他逻辑处理
	switch(s){
		case 3:case "undefined":
			break;
		case 2:
			//暂停播放
			MI.TalkList.musicPause();
			break;
		case 6:case 1:
			//播放完成|停止播放
			//MI.TalkList.musicStop(1);
			break;
		case 101:case 102://101 浏览器不支持，102 需要安装quicktime插件
			MI.TalkList.musicClose();
			break;
	}
	s=null;
}
MI.TalkList.musicScroll = function(o){
	if(!o)	return;
	
	var musicBox = o,
	mBox = $$(musicBox,'.mBox')[0],
	mTitBox = $$(mBox,'.mTitBox')[0],
	mTit = MI.TalkList.musicLastMarquee = $$(mTitBox,'.mPlayerPlaying')[0];
	var state = UI.A(musicBox,'play');
	var l = 2,w;
	var s = $$(mTit,'span');
	//记录一下原始歌曲名占用宽度，用于滚动归为
	if(s.length == 1){
		w = UI.width(mTit);//UI.width(mTit);
		UI.A(mTit,'sWidth',w);
	}else{
		w = UI.A(mTit,'sWidth');
	}
	var pw = UI.width(mTitBox);
	if(w <= pw){
		l = Math.ceil((pw*2) / w);
	}
	if(state == 1){
		if(s.length < l){
			for(var i=1;i<=l;i++){
				mTit.appendChild(s[0].cloneNode(true));
			}
		}
	//setTimeout(function(){
		MI.TalkList.musicMarquee(mTit)
	//},1000)
	}
	mTit.onmouseover = function(){
		//if(UI.A(this.parentNode.parentNode,'play') == 1){
			MI.TalkList.musicMarqueePause();
		//}
	}
	mTit.onmouseout = function(){
		if(UI.A(this.parentNode.parentNode.parentNode,'play') == 1){
			MI.TalkList.musicMarquee(this);
		}
	}
	musicBox=mBox=mTitBox=mTit=null;
}
MI.TalkList.musicMarquee = function(o){
	if(MI.TalkList.musicDelay){
		clearInterval(MI.TalkList.musicDelay);
	}
	var w = UI.A(o,'sWidth');
	var fix = -20;
	var om = o.style.marginLeft;
	var m= om ? parseInt(om) : fix;

	MI.TalkList.musicDelay = setInterval(function(){
		UI.C(o,'marginLeft',m+'px');
		m = parseInt(o.style.marginLeft);
		m--;
		if(Math.abs(m)>=w){
			m=fix-(UI.B.ie ? 0 : 1);
		}
	},40)
}
MI.TalkList.musicMarqueePause = function(){
	if(MI.TalkList.musicDelay){
		clearInterval(MI.TalkList.musicDelay);
	}
}
MI.TalkList.musicMarqueeStop = function(o){
	if(MI.TalkList.musicDelay){
		clearInterval(MI.TalkList.musicDelay);
	}
	UI.C(MI.TalkList.musicLastMarquee,'marginLeft','0');
	var s = $$(MI.TalkList.musicLastMarquee,'span');
	if(s.length > 1){
		for(var i=1,num=s.length;i<num;i++){
			UI.remove(s[i]);
		}
	}
}
MI.TalkList.musicPause = function(a){
	var musicBoxCur = MI.TalkList.lastMusic,
	mBox = $$(musicBoxCur,'.mBox')[0],
	mPlay = $$(mBox,'.btn_mPlay')[0],
	mPause = $$(mBox,'.btn_mPause_hover')[0];
	UI.show(mPause);
	UI.hide(mPlay);
	try{pausePlayer()}catch(e){}
	if(a){
		MI.TalkList.musicPlayBtn(musicBoxCur);
	}
	UI.A(musicBoxCur,'play','0');
	//MI.TalkList.musicMarqueePause();
	MI.TalkList.musicMarqueeStop();
	MI.music.state = 2;
	MI.GoTop.showMusicBox(0);
}
MI.TalkList.musicStop = function(a){
	var musicBoxCur = MI.TalkList.lastMusic,
	mClose = $$(mBox,'.btn_mClose')[0],
	mPlay = $$(mBox,'.btn_mPlay')[0],
	mPause = $$(mBox,'.btn_mPause_hover')[0];
	UI.hide(mPause);
	UI.show(mPlay);
	try{stopPlayer();}catch(e){}
	//if(a){
		MI.TalkList.musicPlayBtn(musicBoxCur);
	//}
	UI.A(musicBoxCur,'play','0');
	MI.TalkList.musicMarqueeStop();
	MI.music.state = 1;
	MI.GoTop.showMusicBox(0);
}
MI.TalkList.musicClose = function(a){
	//延时1s防止缓冲时无法停止播的bug
	setTimeout(function(){try{stopPlayer();}catch(e){};},200)
	MI.GoTop.hideMusicBox();
	if(MI.TalkList.musicPlayDetec){
		clearInterval(MI.TalkList.musicPlayDetec);
	}
	MI.TalkList.musicMarqueeStop();
	try{
		var musicBox = a ? a : MI.TalkList.lastMusic,
		mThumbsBox = $$(musicBox,'.mThumbsBox')[0],
		mBox = $$(musicBox,'.mBox')[0],
		mTit = $$(musicBox,'.openSosoPlayer')[0],
		mClose = $$(mBox,'.btn_mClose')[0],
		mPlay = $$(mBox,'.btn_mPlay')[0],
		mPause = $$(mBox,'.btn_mPause_hover')[0];
		UI.A(musicBox,'play','0');

		UI.hide(mPause);
		UI.show(mPlay);
		UI.hide(mBox);
		UI.show(mThumbsBox);
	}catch(e){}
	MI.music.state = null;
}
//video event process
MI.TalkList.videoUrlVoid = function(a){ //Video url
	var url = a;
	var r = /http:\/\/([^\/]+)\//i;
	var h = url.match(r);
	var c = '';
	if(!h[1])	return c;
	var m = ['qq.com','tudou.com','youku.com','56.com'];
	for(var i=0,n=m.length;i<n;i++){
		var patt = new RegExp(m[i]);
		if(patt.test(h[1])){
			c = m[i].split('.')[0];
			break;
		}
	}
	return c;
}
MI.TalkList.videoVid = function(a){ //Video url
	var url = a;
	var c = '';
	var reg = new RegExp("(^|&)vid=([^&]*)(&|$)"); 
	var r = url.split("?")[1].match(reg);
	if(r[2])	c = r[2];
	return c;
}
MI.TalkList.video = function(a,b){ //Video Event
	//关闭正在播放的音乐
	try{MI.TalkList.musicClose()}catch(e){}
	//关闭正在播放的其他视频
	try{MI.TalkList.videoClose();}catch(e){}
	var _this = a;
	var box;
	if(b == 1){
		box = $$(_this.parentNode.parentNode,'.videoBox')[0];
	}else if(b == 2){
		box = _this.parentNode.parentNode;
	}
	MI.TalkList.lastVideo = box;
	//MI.TalkList.videoCheck();//close last video
	var vUrl = box.getAttribute('playurl');
	var vMp4Url;
	var videoSource = MI.TalkList.videoUrlVoid(vUrl);
	if(videoSource == 'qq' && UI.B.ipad){
		var vid = MI.TalkList.videoVid(vUrl);
		var aysn = 'http://vv.video.qq.com/geturl';
		var url = aysn + "?vid="+vid+"&otype=json&r="+MI.random();
		var c = '';
		UI.getScript(url,function(){//get html5 video
			vMp4Url = QQVideoOutputJson.vd.vi[0].url;
			if(vMp4Url){
				MI.TalkList.videoOpen(_this,b,vMp4Url,'mp4');
			}
		});
	}else{
		MI.TalkList.videoOpen(_this,b,vUrl,'flash');
	}

	return false;
}
MI.TalkList.videoOpen = function(vCon,cType,vUrl,vType){
	var _this = vCon;
	var _videoObject;
	if(vType == 'mp4'){
		_videoObject = MI.tmpl.videoHTML5;
	}else{
		_videoObject = UI.B.ie ? MI.tmpl.videoObject : MI.tmpl.videoEmbed;
	}
	var box,vBox,flash;
	if(cType == 1){
		box = $$(_this.parentNode.parentNode,'.videoBox')[0];
	}else if(cType == 2){
		box = _this.parentNode.parentNode;
	}
	var vWrap = $$(box,'.vWrap')[0],vBox = $$(box,'.vBox')[0],vThumbsBox = $$(box,'.vThumbsBox')[0];
	var vBoxCon = UI.html('<div class="vBox" style="display:block"></div>')[0];
	
	var picurl = unescape(box.getAttribute('minipicurl')),playurl = vUrl ? vUrl : unescape(box.getAttribute('playurl')),realurl = unescape(box.getAttribute('realurl')),title = box.getAttribute('title')?box.getAttribute('title'):box.getAttribute('reltitle'),title = MI.string.cut(title,40),shorturl=unescape(box.getAttribute('shorturl'));
	
	if(cType == 1){
		var tTools = $$(box,'.vTools')[0],flash = _videoObject.replace(/\$VideoPlayUrl/g,playurl).replace(/\$MiniPic/g,picurl);
		//var oTools = UI.html(MI.tmpl.videoTool.replace('$VideoTitle',escape(title)).replace('$VideoRealUrl',encodeURI(realurl)))[0],vClose = $$(oTools,'.vClose')[0];
		if(vThumbsBox){
			//vSimple.setAttribute('url',playurl);//多视频时使用。目前只显示单个视频，先注释掉。
			UI.hide(vThumbsBox);
		}
		//UI.replace(oTools,tTools);
		//vClose.onclick = MI.TalkList.videoClose;
		UI.show(tTools);
		if(box.play){
			var a=$$(_this.parentNode.parentNode,'.videoBox')[0];
			var c=$$(a,'.vClose')[0];
			try{
				MI.TalkList.videoClose(c,1);
			}catch(e){alert(e)}
			box.play = 0;
			return false;
		}
		if(!vBox){
			UI.append(vBoxCon,vWrap);
		}
	}else if(cType == 2){
		var tools = $$(box,'.vTools')[0];
		flash =_videoObject.replace(/\$VideoPlayUrl/g,playurl);
		if(box.play){
			box.play = 0;
			return false;
		}
		UI.hide(vThumbsBox);
		tools.style.display = 'block';
		if(!vBox){
			UI.append(vBoxCon,vWrap);
		}
	}
	box.play = 1;
	UI.addClass(box,'vPlay');
	if(!UI.B.ipad)	UI.addClass($$(box,'.vBox')[0],'loading');
	if(UI.B.ipad && vType == 'flash'){
		flash = '<div style="font-size:14px;margin:5px;">暂不支持视频播放</div>';
	}
	vBoxCon.innerHTML = flash;
	MI.mediaMutex(vWrap);
	MI.Bos('btnVideoView',shorturl);
	return false;
}
MI.TalkList.videoClose = function(a,b){
	/*var _this = b ? a : this;
	var p = _this.parentNode.parentNode;
	var vWrap = $$(p,'.vWrap')[0];
	var bThumbs = Number(vWrap.getAttribute('thumbs'));
	var vThumbsBox = $$(p,'.vThumbsBox')[0];//this.parentNode.nextSibling.firstChild;
	var tools = _this.parentNode;
	var box = _this.parentNode.parentNode;
	var vBox = $$(box,'.vBox')[0];*/
	var box = MI.TalkList.lastVideo;
	var vWrap = $$(box,'.vWrap')[0],vBox = $$(box,'.vBox')[0],vThumbsBox = $$(box,'.vThumbsBox')[0],tools = $$(box,'.vTools')[0]
	box.play = 0;
	UI.removeClass(box,'vPlay');
	UI.removeClass(vBox,'loading');
	vThumbsBox.style.display = 'inline';
	tools.style.display = 'none';
	UI.remove(vBox);
	MI.mediaMutex(vWrap,1);
	return false;
}
