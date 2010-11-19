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
MI.Music = {
	//Dom
	Self : null,
	tipsMsg : ['对不起，该功能目前不支持您的浏览器。','对不起，您需要先安装QuickTime才能播放','下载最新版QQ音乐播放控件'],
	lastMusic : null,
	build : function(o){
		Self = o;
		_DefaultKey = '输入歌名/歌手名，点击搜索找歌';
		_Key = '';
		_P = 1;
		this.PageNum = 5;
		_Pi = 1;
		_Pfav = 1;
		MI.Music.lastMusic = null;
		MI.Music.musicState = null;
		if(!Self.music){
			Self.music = {};
		}
		//Self._music = o;
		//Self._musicAnchor = o.$('.newMusic');
		//Add QQ Music
		//build music dom
		var html = UI.html('<div class="mloadWrap"><div class="musicTab"><ul><li class="select"><b>搜索音乐</b></li><li><a href="#">我收藏的音乐</a></li></ul><a href="#" class="close" title="关闭">关闭</a></div><div class="m_searchBox clear"><input type="text" class="inputTxt" id="musicSearchBox" value="" autocomplete="off" /><button type="button" class="btn2">搜索</button></div></div>'),frag = document.createDocumentFragment();
		UI.each(html,function(o){
			UI.append(o,frag);
		});
		UI.append(frag,Self._music);
		
		//Dom
		Self._musicBox = $$(Self._music,'.mloadWrap')[0];
		Self._musicClose = $$(Self._music,'.close')[0];

		Self._musicSearchBox = $$(Self._music,'.m_searchBox')[0];
		Self._musicSearchKey = $('musicSearchBox');
		Self._musicSearchBtn = $$(Self._music,'.btn2')[0];

		MI.Music.switchSearchKey();
		MI.Music.bindSwitchTabs();

		//Event
		UI.EA(Self._musicSearchKey,'keydown',function(e){
			var E = UI.E(e);
			if(E.key == 13){
				UI.E(e).stop();
				Self._musicSearchBtn.click();
				Self._musicSearchKey.blur();
				MI.Music.stop('',true);
			}
		});
		UI.EA(Self._musicSearchKey,'focus',function(e){
			var E = UI.E(e);
			MI.Music.switchSearchKey();
		});
		UI.EA(Self._musicSearchKey,'blur',function(e){
			var E = UI.E(e);
			MI.Music.switchSearchKey();
		});
		Self._musicSearchBtn.onclick = function(){
			MI.Music.searchMusic(Self._musicSearchKey.value);
			MI.Music.stop('',true);
			return false;
		}
		Self._musicClose.onclick = function(){
			MI.Music.hide();
			MI.Music.stop('',true);
			return false;
		}

		//smartbox
		Self.musicBox = new MI.SmartBox('musicSearchBox','','music',{left:0,top:2,width:212});
		Self.musicBox.url = 'http://soso.music.qq.com/fcgi-bin/cgiSearchKeyWordMusicBox';
		Self.musicBox.param = 'utf8=1&w=%key%';
		MI.Music.show();
	},
	switchSearchKey : function(a,b){
		var k = Self._musicSearchKey;
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
		var musicTab = $$(Self._musicBox,'.musicTab')[0],
			tabs = $$(musicTab,'li');

		UI.each(tabs,function(o,num){
			if(num == 0){
				MI.Music.lastTabs = o;
			}else{
				$$(o,'a')[0].onclick = function(){return false;}
			}
			o.onclick = function(){
				MI.Music.bindSwitchTabsClick(this,num);
			}
		});
	},
	bindSwitchTabsClick : function(o,num){
		if(!o)	return;
		UI.A(Self._musicBox,'tabs',num);
		if(o != MI.Music.lastTabs){
			UI.removeClass(MI.Music.lastTabs,'select');
			MI.Music.lastTabs.innerHTML = '<a href="#">'+UI.text(MI.Music.lastTabs)+'</a>';
			$$(MI.Music.lastTabs,'a')[0].onclick = function(){return false;}

			UI.addClass(o,'select');
			o.innerHTML = '<b>'+UI.text(o)+'</b>';
			MI.Music.lastTabs = o;

			MI.Music.switchTabs(num);
		}
	},
	switchTabs : function(idx){
		var box = Self._musicBox,sBox = Self._musicSearchBox,rCon = $$(box,'.rSearch')[0],fCon = $$(box,'.rFav')[0];
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
				if(!fCon)MI.Music.favMusic();
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
								<%var songid = list[i].songid,\
									songname = list[i].songname,\
									singername = list[i].singername,\
									songurl = list[i].songurl,\
									str = MI.Music.cut(MI.Music.getHTML(songname ),MI.Music.getHTML(singername));%>\
								<li music="<%=songid%>,<%=songurl%>,<%=singername%>,<%=songname%>"><div><a href="#" title="点击添加-<%=songname%> - <%=singername%>"><%=str[0]%><span>- <%=str[1]%></span></a></div><a href="#" class="ico btn_play" id="play_<%=songid%>" title="试听音乐"></a></li>\
							<%}%>\
							</ul>\
						</div>\
					<%}else{%>\
						<div class="m_noResult"><p>对不起，未找到"<%=keyword%>"的相关歌曲。</p><p>请检查关键词是否正确，或更换其他关键字搜索。</p></div>\
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
							<%var songid = SongList[i].id,\
								songname = SongList[i].songname,\
								singername = SongList[i].singername,\
								songurl = SongList[i].url,\
								str = MI.Music.cut(MI.Music.getHTML(songname ),MI.Music.getHTML(singername));%>\
							<%if(songurl){%><li music="<%=songid%>,<%=songurl%>,<%=singername%>,<%=songname%>"><div><a href="#" title="点击添加-<%=songname%> - <%=singername%>"><%=str[0]%><span>- <%=str[1]%></span></a></div><a href="#" class="ico btn_play" id="play_<%=songid%>" title="试听音乐"></a></li><%}%>\
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
		MI.Music.stop('',true);
		dirid = dirid ? dirid : 200;
		var ouin = MI.Uin();
		if(!ouin)	return;
		var url = 'http://qzone-music.qq.com/fcg-bin/fcg_music_fav_getinfo.fcg';
		var param = ['dirinfo=1' ,'dirid='+dirid,'uin='+ouin,'r='+MI.random()];
		UI.getScript(url+"?"+param.join('&'),'','gb2312');
	},
	favMusicCallBack : function(data,page){
		var noerr;
		Self.favMusicData = data;

		if(data){
			data.curnum = this.PageNum;
			_Pfav= page ? page : 1;
			data.curpage=_Pfav-1;
			//if(data.code == 0){
				//改造一下数据结构，兼容搜索的接口
				data.totalnum = data.SongNum;
				var rCon = $$(Self._musicBox,'.rFav')[0];
				var newSearch = UI.html(new UI.tmplString(MI.Music.tmpl.listAll2)(data)),frag = document.createDocumentFragment();
				UI.each(newSearch,function(o){
					UI.append(o,frag);
				});
				if(!rCon){
					UI.append(frag,Self._musicBox);
				}else{
					UI.replace(frag,rCon);
				}
				rCon = $$(Self._musicBox,'.rFav')[0];

				var opage = $$(rCon,'.pages')[0];
				var page = MI.Music.addPage(data,1);
				if(opage){
					UI.replace(page,opage);
				}else{
					UI.append(page,rCon);
				}
				var oSelect = $$(rCon,'select')[0];
				oSelect.onchange = function(){
					MI.Music.favMusic(this.value);
				}
				MI.Music.bindSongClickEvent(rCon,1);

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
		if(!key || UI.trim(key) == _DefaultKey)	return;
		Self.musicBox.hide();
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
		var noerr;
		var s = [];

		if(data){
			//if(data.retcode == 0){
				var rCon = $$(Self._musicBox,'.rSearch')[0];
				var newSearch = UI.html(new UI.tmplString(MI.Music.tmpl.listAll)(data)),frag = document.createDocumentFragment();
				UI.each(newSearch,function(o){
					UI.append(o,frag);
				});
				if(!rCon){
					UI.append(frag,Self._musicBox);
				}else{
					UI.replace(frag,rCon);
				}
				rCon = $$(Self._musicBox,'.rSearch')[0];

				var opage = $$(rCon,'.pages')[0];
				var page = MI.Music.addPage(data);
				if(opage){
					UI.replace(page,opage);
				}else{
					UI.append(page,rCon);
				}
				
				MI.Music.bindSongClickEvent(rCon);

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
		var m_sResult = o;
		fav=fav?fav:'';
		//Event
		UI.each($$(m_sResult,'.m_list li'),function(o){
			o.onclick = function(){
				MI.Music.addPreview(this,fav);
				MI.Music.stop();
				return false;
			}
			var playBtn = $$(o,'.btn_play')[0];
			if(MI.Music.lastMusic){
				if(playBtn.id == MI.Music.lastMusic.id){
					UI.A(playBtn,'play','1');
					UI.A(MI.Music.lastMusic,'title','试听音乐');
					UI.removeClass(MI.Music.lastMusic,'loading');
					UI.removeClass(playBtn,'btn_play');
					UI.addClass(playBtn,'btn_pause');
				}
			}
			playBtn.onclick = function(e){
				//music{song_id,songurl,singer_name,song_name}
				//这里有写啰嗦，后续小部分重构一下
				UI.E(e).stop();
				var play =  parseInt(UI.A(this,'play'));

				if(MI.Music.lastMusic){
					UI.A(MI.Music.lastMusic,'play','0');
					UI.A(MI.Music.lastMusic,'title','试听音乐');
					UI.removeClass(MI.Music.lastMusic,'loading');
					UI.removeClass(MI.Music.lastMusic,'btn_pause');
					UI.addClass(MI.Music.lastMusic,'btn_play');
				}
				if(!play){//btn_pause btn_play
					UI.A(this,'play','1');
					UI.removeClass(this,'btn_play');
					UI.addClass(this,'btn_pause');
					UI.addClass(this,'loading');
					UI.A(this,'title','暂停播放');
					MI.Music.lastMusic = this;
					var music = UI.A(o,'music');
					var m =music.split(',');
					var arg = {};
					arg.songName = m[3];
					arg.songurl = m[1];
					arg.singerName = m[2];
					arg.songID = m[0];
					MI.Music.play(arg,fav);

				}else{
					MI.Music.stop(this);
				}
				return false;
			}
		});
	},
	favPage : function(page){
		if(!Self.favMusicData)	return;
		Self.favMusicData.curnum = _P;
		Self.favMusicData.curpage = page;
		MI.Music.favMusicCallBack(Self.favMusicData,page);

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
		var key = o.keyword;
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
		var prview = '<span class="preview"><span class="link"><a class="fileName" href="#"><span class="m_name">%song_name%</span><b class="m_Intro">%song_fullname%<span> - %singer_name%</span></b></a></span><a class="del" href="#" title="删除">[删除]</a></span>';
		var attr = UI.A(o,'music');
		var op = $$(Self._music,'.preview')[0];
		var m = attr.split(',');

		var p = prview.replace(/\%song_name\%/g,MI.string.cut(MI.string.html(m[3]),10)).replace(/\%singer_name\%/g,MI.string.html(m[2])).replace(/\%song_fullname\%/g,MI.string.html(m[3]));
		Self._musicPreview = UI.html(p)[0];
		if(op)	UI.remove(op);
		//Self.music = attr;
		//Self.music = '["'+escape(m[0])+'","'+escape(m[1])+'","'+escape(m[2])+'","'+escape(m[3])+'"]';
		Self.music = {
			"id" : m[0],
			"song" : m[3],
			"singer" : m[2],
			"songurl" : m[1]
		}
		UI.before(Self._musicPreview,Self._musicBox);
		
		var link = $$(Self._musicPreview,'.fileName')[0];
		link.onclick = function(){
			//显示音乐搜索浮层
			MI.Music.show();
			return false;
		}

		var del = $$(Self._musicPreview,'.del')[0];
		del.onclick = function(e){
			UI.E(e).stop();
			Self.delMusic();
			return false;
		}
		UI.hide(Self._musicBox);
		UI.hide(Self._musicAnchor);

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
				Self.txtMusic = '#分享音乐# ' + m[3].replace(/\&quot;/gi,'"') + '-' + m[2].replace(/\&quot;/gi,'"') + ' http://url.cn/' + data.url+' ';
				if(Self._txt.value != Self.txtMusic){
					Self._txt.value += Self.txtMusic;//'#'+Self.txtMusic+'# ' + m[3] + '-' + m[2] + '';
				}else{
					Self._txt.value = Self.txtMusic;
				}
				Self.countTxt();
				Self.focus();
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
		try{
			if(data.head.error == 0 && data.item){
				if(data.item.length > 0){			
					var s = [];
					var l = data.item.length;
					Self.musicBox.indexMax = l - 1;
					Self.musicBox.index = -1;
					s.push('<ul>');
					for(var i=0;i<l;i++){
						s.push('<li value=\"'+ data.item[i].w +'\">' + data.item[i].w + '</li>');
					}
					s.push('</ul>');
					Self.musicBox._select.innerHTML = s.join("");
					Self.musicBox.show();
					Self.musicBox._list = $$(Self.musicBox._select,'li');
					//Event
					UI.each(Self.musicBox._list,function(el,i){
						el.onmouseover = function(){
							Self.musicBox.select(i);
						}
						el.onclick = function(){
							Self.musicBox._key.value = this.innerHTML;
							MI.Music.searchMusic(Self.musicBox._key.value);
						}
					});
					s=l=null;
				}else{
					Self.musicBox.hide();
				}
			}else{
				Self.musicBox.hide();
			}
		}catch(e){Self.musicBox.hide();}
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
		qusid = music.songID;
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
		var musicTab = $$(Self._musicBox,'.musicTab')[0],
			tabs = $$(musicTab,'li');
		MI.Music.stop();
		Self._musicSearchKey.value = '';
		MI.Music.switchSearchKey();
		MI.Music.bindSwitchTabsClick(tabs[0],0);
		UI.each($$(Self._musicBox,'.m_sResult'),function(o){
			UI.remove(o);
		});
	},
	show : function(){
		UI.show(Self._musicBox);
		Self._musicSearchKey.focus();
	},
	hide : function(){
		UI.hide(Self._musicBox);
		MI.Music.stop();
	}
}
