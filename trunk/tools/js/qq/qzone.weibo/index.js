var photoDoctorOk = false;var controller = {};
var t = controller;
//主逻辑
(function(){
 	//<li><a href="#" class="c_tx"><strong>888</strong></a><span class="block">听众</span><a href="#" class="sup icons">+16</a></li>
	function _getUserTpl(){
		return tmpl([
		'<div class="moving bbor3">',
			'<div class="user_head">',
				'<p class="bg">',
					'<a href="profile.html" title="<%=nick%>(@<%=account%>)" class="user_head_50"><span class="skin_portrait_round"></span><img src="<%=portrait%>/50" alt="<%=nick%>(@<%=account%>)" /></a>',
				'</p>',
			'</div>',
			'<div class="tx_info">',
				'<p class="name"><a href="profile.html" title="<%=nick%>(@<%=account%>)" ><%=nick%></a></p>',
				'<p>@<%=account%></p>',
			'</div>',
		'</div>',
		'<div class="info">',
			'<ul>',
				'<li><a href="profile.html"><strong class="c_tx" id="myTweetNum"><%=sendnum%></strong></a><span class="block">广播</span></li>',
				'<li><a href="follow.html#type=follower"><strong class="c_tx" id="myFollowerNum"><%=follower%></strong></a><span class="block">听众</span><a href="follow.html#type=follower"></a><a href="follow.html#type=follower" class="sup icons none" id="newFollowing"></a></li>',
				'<li><a href="follow.html#type=following"><strong class="c_tx" id="myFollowingNum"><%=following%></strong></a><span class="block">收听</span></a></li>',
			'</ul>',
		'</div>'
		].join(''));
	}
					
	QZFL.object.extend(controller,{
		init : function(){
			t.uin = TWT.status.getLoginUin();
			t.mode = t.mode || TWT.status.getViewMode();
			$("oriViewMode").checked = t.mode & (1<<1);
			$("imgViewMode").checked = t.mode & (1<<2);
			t.items = [];
			t.html = [];
			t.type = 0;
			t.more = 0;
			t.loading=0;
			t.perpend=1;
			t.prepend=0;
			t.tweet = new TWT.Tweet({container:'tweetArea',type:0,viewMode:(t.mode & (1<<2))});
			t.listen = new TWT.listenInfo({container:'listenArea'});
			if(t.mode & (1<<1))
			{
				t.org = 1;
				t.getMain(t.type,'','',1);
			}
			else
			{
				t.org = 0;
				t.getMain(t.type,'','',0);
			}
			t.getUser();
			var editor = new TWT.widget.MainEditor({container:'main_editor'});
			editor.onSuccess = function(d){
				$('myTweetNum').innerHTML = parseInt($('myTweetNum').innerHTML) + 1;
				d.account = t.info.account;
				d.nick = t.info.nick;
				d.portrait = t.info.portrait;
				d.flag1 = t.info.flag1;
				t.tweet.prepend([d],true);
			}
			QZONE.FP.scrollNotify = function(offset){
				if(offset<200)
				{
					if(t.more < 5 && !t.loading)
					{	
						t.loading = 1;
						t.getMore();
					}
					else if(t.havecache){
						clearInterval(t.loadmore);
					}					
				}
				else
				{
					return false;
				}
			};
			t.updataTime = setInterval(function(){t.getUpdata();},30000);
		},
		liout : function(o){
			var _id = o.getAttribute('id');
			if(QZFL.css.hasClassName($(_id),'ok_ar'))
			{
				return false;
			}
	        //QZFL.css.removeClassName(o,"bg3"); 
			$e('#'+_id).find('a').removeClass('bg2');
		},
		limove : function(o){
			var _id = o.getAttribute('id');
			if(QZFL.css.hasClassName($(_id),'ok_ar'))
			{
				return false;
			}
			$e('#'+_id).find('a').addClass('bg2');
	        //QZFL.css.addClassName(o,'bg3'); 
		},
		newTag : function(n){
			clearInterval(t.updataTime);
			t.uin = TWT.status.getLoginUin();
			t.items = [];
			t.html = [];
			t.type = n;
			t.more = 0;
			var _or = 0;
			if(t.mode & (1<<1))
			{
				_or = 1;	
			}
			$('tweetArea').innerHTML = '<p id="loading" class="loadbox"><img src="/qzonestyle/qzone_app/app_weibo_v1/img/loading_comment.gif" alt="loading"/>正在获取信息，请稍后...</p>';
			t.moreTime = 0;
			t.tweet.imgList = [];
			$e('#myMain').find('a').removeClass('bg2');
			$e('#aboutMe').find('a').removeClass('bg2');
			$e('#myMsg').find('a').removeClass('bg2');
			switch(n)
			{
				case 0:
					t.tweet.type = 0;
					$('myTits').innerHTML = '我的主页';
					$('myMain').className = 'tbor3 bg2 ok_ar';
					$('aboutMe').className = 'tbor3';
					$('myMsg').className = 'tbor3';
					$('showoriMode').style.display = 'inline';
					
					TWT.util.show($('msgTit'));
					TWT.util.hide($("myMsgs"));
					TWT.util.hide($("msgTips"));
					//TWT.util.hide($("myMainNum"));
					t.getMain(n,'','',_or);
					t.updataTime = setInterval(function(){t.getUpdata();},30000);
					break;
				case 1:
					t.tweet.type = 0;
					$('myTits').innerHTML = '提及我的';
					$('myMain').className = 'tbor3';
					$('aboutMe').className = 'tbor3 bg2 ok_ar';
					$('myMsg').className = 'tbor3';
					$('showoriMode').style.display = 'none';
					TWT.util.show($('msgTit'));
					TWT.util.hide($("msgTips"));
					TWT.util.hide($("aboutMeNum"));
					TWT.util.hide($("myMsgs"));
					//TWT.util.hide($("myMainNum"));
					t.getMain(n,'','',_or);
					break;
				case 2:
					t.tweet.type = 2;
					$('myMain').className = 'tbor3';
					$('aboutMe').className = 'tbor3';
					$('myMsg').className = 'tbor3 bg2 ok_ar';
					TWT.util.hide($("aboutMeNum"));
					TWT.util.show($("myMsgs"));
					TWT.util.hide($('msgTit'));
					//TWT.util.hide($("myMainNum"));
					$('showoriMode').style.display = 'none';
					t.getMyMsg(0,'','');
					break;
			}
			//t.tweet = new TWT.Tweet({container:'tweetArea'});
		},
		changeMyMsg : function(type){
			t.prepend = t.moreTime = 0;
			if(!type){
				t.getMyMsg(0,'','');	
			}else{
				t.getMyMsg(1,'','');	
			} 
		},
		getMyMsg :function(ty,time,dir){
			var url = TWT.util.getUrl("mymsg");
			var data = {
				uin : t.uin,
				type: ty,
				num : 15,
				time : time,
				direction : dir,
				refesh : 0
			};
			TWT.net.dataLoader(url,data,t.getMyMsgSuc,t.getMyMsgErr);				  
		},
		getMyMsgSuc : function(d){
			d.tweets.tweet = d.tweets.tweet || [];
			if(t.prepend){
				t.tweet.prepend(d.tweets.tweet);
				t.prepend = 0;
				t.firstTime = d.tweets.tweet[0].time;
				QZFL.css.addClassName($("msgTips"),"none");
			}else if(t.moreTime){
				t.tweet.append(d.tweets.tweet);
			}else{
				t.tweet.show(d.tweets.tweet);
				t.firstTime = d.tweets.tweet[0].time;
			}
			if(d.tweets.tweet.length){
				t.moreTime = d.tweets.tweet[d.tweets.tweet.length-1].time;
			}
		},
		getMyMsgErr : function(){
			$e(".loadbox").setHtml(d.result.msg);
		},
		relax : function(){
			//var mode = TWT.status.getViewMode();
			$("oriViewMode").checked = mode & (1<<1);
			$("imgViewMode").checked = mode & (1<<2);
		},
		//更新数
		getUpdata : function(){
			var url = TWT.util.getUrl('update');
			var data = {
				uin : t.uin
			}
			TWT.net.dataLoader(url,data,t.getUpdataSuc,t.getUpDataErr);
		},
		getUpdataSuc:function(d){
			for(i in d.count){
				t.setupdataShow(d.count[i]);		
			} 
		},
		getUpdataErr:function(d){
					 
		},
		setupdataShow : function(d){
			switch(d.type){
				case 5://新消息
					if(d.num>0){
						TWT.util.show($('msgTips'));
						//QZFL.css.removeClassName($("msgTips"),"none");
						//QZFL.css.removeClassName($("myMainNum"),"none");
						$('newMsg').innerHTML = d.num;
						if(d.num<100){
							$('myMainNum').innerHTML = '+' + d.num;
						}else{
							$('myMainNum').innerHTML = '+99';
						}
					}else{
						TWT.util.hide($('msgTips'));
						//QZFL.css.addClassName($("msgTips"),"none");
						//QZFL.css.addClassName($("myMainNum"),"none");
					}
					break;
				case 6://提及我的
					if(d.num>0){
						QZFL.css.removeClassName($("aboutMeNum"),"none");
						if(d.num<100){
							$('aboutMeNum').innerHTML = '+' + d.num;
						}else{
							$('aboutMeNum').innerHTML = '+99';
						}
					}else{
						QZFL.css.addClassName($("aboutMeNum"),"none");
					}
					break;
				case 7://私信
					//$('myMsgNum');
					if(d.num>0){
						//QZFL.css.removeClassName($("myMsgNum"),"none");
						//$('myMsgNum').innerHTML = '+'+d.num;
					}else{
							
					}
					break;
				case 8://新fans
					if(d.num>0){
						QZFL.css.removeClassName($("newFollowing"),"none");
						//$('newFollowing').innerHTML = '+'+d.num;;
						if(d.num<100){
							$('newFollowing').innerHTML = '+' + d.num;
						}else{
							$('newFollowing').innerHTML = '+99';
						}
					}else{
						QZFL.css.addClassName($("newFollowing"),"none");
					}
					break;
			}	
		},
		upDataNew : function(){
			t.prepend = 1;
			t.getMain(this.type,this.firstTime,2,this.org);
		},
		//拉取听众列表
		getUser: function(){
			var url = TWT.util.getUrl('user');
			var data = {
				uin : t.uin,
				start : 0,
				num : 8,
				type : 0,
				portrait: 1,
				sort: 1
			};
			TWT.net.dataLoader(url,data,t.getUserSuc,t.getUserErr);
		},
		getUserSuc : function(d){
			d.infos.self = 1;
			d.infos.ouin = 0;
			t.listen.show(d.infos);
			/*
			var _userTmp = tmpl([
				'<li>',
					'<a href="profile.html#id=<%=account%>&uin=<%=uin%>" title="<%=nick%>@<%=account%>" class="user_head_35"><span class="skin_portrait_round"></span><img src="<%=portrait%>/50"  style="width:35px; height:35px;" title="<%=nick%>@<%=account%>" /></a>',
				'</li>'
			].join(''));
			var _html = [];
			for(i in d.infos.info)
			{
				_html.push(_userTmp(d.infos.info[i]));	
			}
			$('myFollow').innerHTML = _html.join('');
			if(d.infos.total > 8)
			{
				TWT.util.show($('seeAllfollow'));	
			}
			*/
		},
		getUserErr : function(d){
			//QZONE.FP.showMsgbox(d.result.msg,5,2000);
			$e(".loadbox").setHtml(d.result.msg);
		},
		//更多内容
		getMore : function(){
			t.getMain(this.type,this.moreTime,1,this.org);
			t.more++;
		},
		getMain : function(ty,time,dir,or){
			/*
			公用参数: uin,num 
			# 0: 拉取主页
		  # 1: 拉取提到我的
		  # 2: 拉取私信
			time: 上次拉取结果的最后（最老）一条tweet的发表时间，拉第一页的时候不用提供 
			direction: 
			0: 第一页 
			1: 向下翻页 
			*/
			var url = TWT.util.getUrl("index");
			var data = {
				uin : t.uin,
				type: ty,
				num : 15,
				time : time,
				direction : dir,
				original : or
			};
			TWT.net.dataLoader(url,data,t.getMainSuc,t.getMainErr);
		},
		getMainSuc : function(d){
			t.getUpdata();
			t.loading  = 0;
			if($('loading'))
			{
				$('tweetArea').removeChild($('loading'));
			}
			try{
				TWT.data.save('weiboMyname',d.info.account);
				TWT.data.save('weiboMynick',d.info.nick);
				TWT.data.save('weiboMyportrait',d.info.portrait);
				TWT.data.save('weiboMyflag1',d.info.flag1);
			}catch(e){
			}
			d.tweets.tweet = d.tweets.tweet || [];
			if(t.prepend){
				t.tweet.prepend(d.tweets.tweet);
				t.prepend = 0;
				t.firstTime = d.tweets.tweet[0].time;
				QZFL.css.addClassName($("msgTips"),"none");
				//TWT.util.hide($('myMainNum'));
			}else if(t.moreTime){
				t.tweet.append(d.tweets.tweet);
			}else{
				t.tweet.show(d.tweets.tweet);
				t.firstTime = d.tweets.tweet[0].time;
			}
			if(d.tweets.tweet.length){
				t.moreTime = d.tweets.tweet[d.tweets.tweet.length-1].time;
			}
			if(d.invite>0)
			{	
				$('myInvite').innerHTML = '('+d.invite+')';
				$('myInvite').style.display = 'inline';
			}
			TWT.data.save('weiboInvite',d.invite);

			if(d.info){
				t.info = d.info;
				$('userInfo').innerHTML = _getUserTpl()(d.info); 
				TWT.data.save('imgFlag',d.info.imgflag);
				try{
					(TWT.data.get('imgFlagCb')||QZFL.emptyFn)();
				}catch(e){}
			}
			if(d.hots){
				TWT.data.save('weiboHotTegic',d.hots.hot);
				TWT.util.showHotTopic("hotTopic","hotTopicTitle");
			}
			t.havecache = d.tweets.more;
			if(d.tweets.more < 2){	
				$e('#moretweet').show();
			}else{
				t.more = 7;
				$e('#moretweet').hide();
			}
			if(d.favihts){
				TWT.favList.show('myFav','',d.favihts.faviht);
			}
		},
		getMainErr : function(d){
			//QZONE.FP.showMsgbox(d.result.msg,5,2000);
			$e(".loadbox").setHtml(d.result.msg);
		},
		//定时拉取新数据
		referPage : function(){
					
		},
		changeViewMode : function(bit,value){
			TWT.status.setViewMode(bit,value);
			if(bit == 2){
				t.tweet.changeMode(value);
			}else if(bit==1){
				t.more = 0;
				t.tweet.imgList = [];
				this.moreTime = 0;
				this.mode = TWT.status.getViewMode();//位标志，1：只原创，2：展示图片
				$('tweetArea').innerHTML = '<p id="loading" class="loadbox"><img src="/qzonestyle/qzone_app/app_weibo_v1/img/loading_comment.gif" alt="loading"/>正在获取信息，请稍后...</p>';
				if(value){
					this.mode |= 1<<bit;
					this.org = 1;
					t.getMain(this.type,'','',1);
				}else{
					this.mode &= ~1<<bit;
					this.org = 0;
					t.getMain(this.type,'','',0);
				}				
			}
		},
		searchfocus : function(o){
	        QZFL.css.removeClassName(o,"bor2"); 
	        QZFL.css.addClassName(o,"bor4"); 
			if(o.value == '搜索')		  
			{
				o.value = '';	
			}
		},
		searchblur : function(o){
	        QZFL.css.removeClassName(o,"bor4"); 
	        QZFL.css.addClassName(o,"bor2"); 
			if(o.value == '')		  
			{
				o.value = '搜索';	
			}					 
		},
		keySearch :function(e){
			var _key = e.keyCode;
			if(_key == 13)
			{
				if(ltrim($('searchTxt').value) != '' )
				{
					TWT.util.go('search.html','type=tweet&keyword='+$('searchTxt').value);	
				}
				else
				{
					TWT.util.go('search.html','type=user');	
				}
			}
			if($('searchTxt').value.length>140){
				return false;	
			}
		},
		startSearch : function(){
			if(ltrim($('searchTxt').value) != '' && trim($('searchTxt').value) != '搜索' )
			{
				TWT.util.go('search.html','type=tweet&keyword='+$('searchTxt').value);	
			}
			else
			{
				TWT.util.go('search.html','type=user');	
			}
		}	
	});
})()
var photoDoctorOk = true;/*  |xGv00|b0156c698b0c8c5dd0292f6a31e06d20 */