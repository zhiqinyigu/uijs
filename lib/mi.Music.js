/**
 * QQ Music 
 * Author : raymli@tencent.com
 * Datetime : 2010-9-7
 * Last Eidt: 2010-9-16

*/

function MusicJsonCallback(data){MI.Music.smartBoxCallback(data)}
function searchCallBack(data){MI.Music.searchCallBack(data)}
MI.Music = {
	//Dom
	Self : null,
	tipsMsg : ['对不起，该功能目前不支持您的浏览器。','对不起，您需要先安装QuickTime才能播放','下载最新版QQ音乐播放控件'],
	build : function(o){
		Self = o;
		_Key = '';
		_P = 1;
		_Pn = 5;
		_Pi = 1;
		_LastPlay = null;
		if(!Self.music){
			Self.music = {};
		}
		//Self._music = o;
		//Self._musicAnchor = o.$('.newMusic');
		//Add QQ Music
		//build music dom
		var html = UI.html('<div class="mloadWrap"><div class="musicTab"><ul><li class="select">输入歌曲名</li><li style="display:none;"><a href="#">我收藏的音乐</a></li></ul><a href="#" class="close" title="关闭">关闭</a></div><div class="m_searchBox clear"><input type="text" class="inputTxt" id="musicSearchBox" value="" autocomplete="off" /><button type="button" class="btn2">搜索</button></div><div class="m_sResult" style="display:none">&nbsp;</div><div class="m_noResult" style="display:none"><p>对不起，未找到"<span>%key%</span>"的相关歌曲。</p><p>请检查关键词是否正确，或更换其他关键字搜索。</p></div><div class="m_noFav" style="display:none"><h4>您尚未在列表中收藏任何歌曲</h4><p>您可以打开 <a href="#">QQ空间音乐盒</a> 或 <a href="#">QQ音乐播放器</a> 添加音乐收藏</p></div></div>'),frag = document.createDocumentFragment();
		UI.each(html,function(o){
			UI.append(o,frag);
		});
		UI.append(frag,Self._music);
		
		//Dom
		Self._musicBox = $$(Self._music,'.mloadWrap')[0];
		Self._musicClose = $$(Self._music,'.close')[0];

		Self._musicSearchKey = $('musicSearchBox');
		Self._musicSearchBtn = $$(Self._music,'.btn2')[0];

		Self._musicSearchResult = $$(Self._music,'.m_sResult')[0];
		Self._musicSearchNoResult = $$(Self._music,'.m_noResult')[0];
		Self._musicSearchNoResultTipsKey = $$(Self._musicSearchNoResult,'span')[0];

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
		Self._musicSearchBtn.onclick = function(){
			MI.Music.searchSubmit(Self._musicSearchKey.value);
			MI.Music.stop('',true);
			return false;
		}
		Self._musicClose.onclick = function(){
			MI.Music.hide();
			MI.Music.stop('',true);
			return false;
		}

		//smartbox
		Self.musicBox = new MI.SmartBox('musicSearchBox','','music',{left:0,top:2,width:278});
		Self.musicBox.url = 'http://soso.music.qq.com/fcgi-bin/cgiSearchKeyWordMusicBox';
		Self.musicBox.param = 'utf8=1&w=%key%';
		MI.Music.show();
		//async QQMusicInstance js
		if(typeof initMusicR != 'function'){
			UI.getScript(MI.version.QQMusicInstance);
		}
	},
	searchSubmit : function(key,p,n){
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
		if(!key)	return;
		Self.musicBox.hide();
		p = parseInt(p) > 0?parseInt(p):_P;
		n = parseInt(n) > 0?parseInt(n):_Pn;
		_Key = key;
		_Pi = p;
		var url = 'http://shopcgi.qqmusic.qq.com/fcgi-bin/shopsearch.fcg';
		//var url = '/asyn/musicsearch.php';
		var param = ['uin=' ,'value='+UI.url.encode(key) ,'page_no='+p ,'page_record_num='+n ,'type=qry_song' ,'out=json','r='+MI.random(),'utf8=1'];
		UI.getScript(url+"?"+param.join('&'),'','gb2312');

		var r = Self._musicSearchResult;
		//UI.addClass(r,'loading');
		UI.show(r);
		MI.Bos('btnMusicPlayerSearch');
	},
	searchCallBack : function(data){
		var r = Self._musicSearchResult;
		var nr = Self._musicSearchNoResult;
		var nrk = Self._musicSearchNoResultTipsKey;
		//UI.removeClass(r,'loading');
		var noerr;
		var s = [];
		var opage = $$(Self._music,'.pages')[0];
		if(data){
			UI.hide(nr);
			if(data.result == 0 && data.songlist){
				r.innerHTML = '';
				s.push('<div class="m_total clear"><div class="left">搜索结果('+data.totalnum+'首)</div></div>')
				s.push('<div class="m_list"><ul class="clear">');
				if(data.songlist.length > 0){
					var songlist;
					//music{song_id,location,singer_name,song_name}
					for(var i=0,l=data.songlist.length;i<l;i++){
						songlist = data.songlist[i];
						var str = MI.Music.cut(this.getHTML(songlist.song_name),this.getHTML(songlist.singer_name));
						s.push('<li music="'+songlist.song_id+','+songlist.location+','+songlist.singer_name+','+songlist.song_name+'"><div><a href="#" title="'+songlist.song_name+' - '+songlist.singer_name+'">'+str[0]+'<span>- '+str[1]+'</span></a></div><a href="#" class="ico btn_play" id="play_'+songlist.song_id+'" title="试听音乐"></a></li>');
					}
				}				
				s.push('</ul></div>');
				var html = UI.html(s.join('')),frag = document.createDocumentFragment();
				UI.each(html,function(o){
					UI.append(o,frag);
				});
				UI.append(frag,r);
				UI.each($$('.m_list li'),function(o){
					o.onclick = function(){
						MI.Music.addPreview(this);
						MI.Music.stop();
						return false;
					}
					var playBtn = $$(o,'.btn_play')[0];
					if(_LastPlay){
						if(playBtn.id == _LastPlay.id){
							UI.A(playBtn,'play','1');
							UI.A(_LastPlay,'title','试听音乐');
							UI.removeClass(playBtn,'btn_play');
							UI.addClass(playBtn,'btn_pause');
						}
					}
					playBtn.onclick = function(e){
						//music{song_id,location,singer_name,song_name}
						UI.E(e).stop();
						var play =  parseInt(UI.A(this,'play'));

						if(_LastPlay){
							UI.A(_LastPlay,'play','0');
							UI.A(_LastPlay,'title','试听音乐');
							UI.removeClass(_LastPlay,'btn_pause');
							UI.addClass(_LastPlay,'btn_play');
						}
						if(!play){//btn_pause btn_play
							UI.A(this,'play','1');
							UI.removeClass(this,'btn_play');
							UI.addClass(this,'btn_pause');
							UI.A(this,'title','暂停播放');
							_LastPlay = this;
							var music = UI.A(o,'music');
							var m =music.split(',');
							var arg = {};
							arg.songName = m[3];
							arg.location = m[1];
							arg.singerName = m[2];
							arg.songID = m[0];
							MI.Music.play(arg);

						}else{
							MI.Music.stop(this);
						}
						return false;
					}
				});
				var page = MI.Music.addPage(data);
				if(opage){
					UI.replace(page,opage);
				}else{
					UI.append(page,Self._musicBox);
				}
				noerr = true;
			}else{}
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
	addPage : function(o){
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
		var key = o.search;
		var page_hold = 5;
		var totalnum = parseInt(o.totalnum);
		var curnum = parseInt(_Pn);
		var cur_page = _Pi;
		var total_page = Math.ceil(totalnum/curnum);
		var tmp='';

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
				MI.Music.searchSubmit(key,p);
				return false;
			}
		});
		return html;
	},
	addPreview : function(o){
		//music{song_id,location,singer_name,song_name}
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
			"location" : m[1]
		}
		UI.before(Self._musicPreview,Self._musicBox);
		
		var link = $$(Self._musicPreview,'.fileName')[0];
		link.onclick = function(){
			//显示音乐搜索浮层
			//MI.Music.show();
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

		//Self._txt.value += Self._txtMusic;//'分享音乐 ' + m[3] + ' - ' + m[2];
		if (Self._txt.value == '') {
			Self._txt.value = Self.txtMusic;
			Self.countTxt();
			Self._txt.select();
		}
	},
	cut : function(str1,str2){
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
		try{
		if(data.head.error == 0){
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
						MI.Music.searchSubmit(Self.musicBox._key.value);
					}
				});
				s=l=null;
				
			}
		}
		}catch(e){}
	},
	getHTML : function(str){
		if(!str)	return '';
		str = MI.string.html(str);
		var s = UI.html('<div>'+str+'</div>')[0];
		return s.innerHTML;
	},
	play : function(music){
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

		if(!music.location || !music.songID)	return false;
		var name,url,qusid,ifexp,qzonekey,singerName,iSongId,iSongType;
		name = music.songName;
		url = 'http://stream'+music.location+'.qqmusic.qq.com:0/'+music.songID+'.wma';
		qusid = music.songID;
		ifexp = true;
		qzonekey = '';
		singerName = music.singerName;
		iSongId = music.songID;
		iSongType = 3;

		if(typeof playSongWithNoCheck == 'function'){
			playSongWithNoCheck(name,url,qusid,ifexp,qzonekey,singerName,iSongId,iSongType);
			MI.Bos('btnMusicPlayerPreview');
		}

	},
	stop : function(o,b){
		var e = o ? o : _LastPlay;
		if(e){
			UI.A(e,'play','0');
			UI.removeClass(e,'btn_pause');
			UI.addClass(e,'btn_play');
		}
		if(b){
			_LastPlay = null;
		}
		try{stopPlayer();}catch(e){}
	},
	show : function(){
		UI.show(Self._musicBox);
		if(!UI.trim(Self._musicSearchKey.value)){
			Self._musicSearchKey.focus();
		}
	},
	hide : function(){
		UI.hide(Self._musicBox);
		MI.Music.stop();
	}
}
