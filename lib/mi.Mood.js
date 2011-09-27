MI.Mood = {
	dataString:{},		//缓存收听的心情String数据，传给flash
	curveData:{},		//缓存收听的心情数据
	place:(MI.boss && {'11':1,'13':2,'7':3}[MI.boss]) || 0,  //所在页面位置1：主页，2：我的广播，3客人页
	flashCount:0,  //递增计数，避免页面多个曲线flash，混淆
	published:-1,   //今天是否发表过 0: 没有，1发表过，-1 状态未知
	type:0,  //0:心情，1:祈福
	isDemo:false, //显示demo动画,只在第一次发表签到后显示
	isFloat:function(){   //返回当前是否是浮层状态
		return MI.dialog.display;  
	},
	getCurveData:function(account,callBack,callBack2){
		var Self = this;
		MI.ajax({
			//url:'/asyn/signList.php',
			url:MI.url.signList,
			data:{u:account},
			success:function(sourceData){
				var data = MI.json(sourceData);
				if(data.result==0){
					Self.dataString[account] = sourceData;
					Self.curveData[account] = data.info;
					Self.published = data.info.code || 0;  //今日是否签过到，从后台拉取
					if(!data.info.total) Self.isDemo = true;
					if(callBack) callBack(sourceData); //传入字符串
				} else {
					if(callBack2){
						callBack2(data);
					}
				}
			}
		});	   
	},
	insertFlash:function(account,target){  //加载flash曲线数据
		var Self = this,flashId = 'MoodCurve';
		if(Self.type==1) return;
		if(!Self.curveData[account]) {
			Self.getCurveData(account,buildFlash);
		} else {
			buildFlash();
		}
		
		function buildFlash(){
			var o = Self.curveData[account];
			var isFloat = Self.isFloat();
			var isDemo = Self.isDemo;
			if((!target || !o.total || !o.talk.length) && !isDemo) return; //无数据返回
			Self.flashCount++;
			flashId += Self.flashCount;
			
			var flashUrl = (isDemo && isFloat) ? 'http://mat1.gtimg.com/www/mb/swf/MoodDemo_110805.swf' : 'http://mat1.gtimg.com/www/mb/swf/Mood_110812.swf' ;
			var htmlStr = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="' + flashId + '" width="100%" height="100%" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"><param name="movie" value="' + flashUrl + '" /><param name="wmode" value="transparent" /><param name="quality" value="high" /><param name="align" value="middle" /><param name="allowScriptAccess" value="always" /><param value="langVer=' + window.MILang + '" name="FlashVars" /> <embed src="' + flashUrl + '" quality="high" width="100%" height="100%" name="' + flashId + '" align="middle" play="true" loop="false" quality="high" wmode="transparent" allowScriptAccess="always" FlashVars="langVer=' + window.MILang + '" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed></object>';
			target.innerHTML = htmlStr;
			UI.show(target.parentNode);
			if(!isDemo){
				drawCurve();
			} else {
				var delay = setInterval(function(){
					if(!Self.isFloat()) clearInterval(delay);
					if(!Self.isDemo) {
						clearInterval(delay);
						Self.insertFlash(account,target);
					}
				},250);
			}
		}
		
		function drawCurve(){
			clearTimeout(Self.delayDraw);
			if(document[flashId] && document[flashId]._drawCurve) {
				document[flashId]._drawCurve(Self.dataString[account]);
				Self.Bos('CurveShow');
			} else {
				Self.delayDraw = setTimeout(drawCurve,200);
			}
		}
	},
	demoPlayFinish:function(){
		var Self = this;
		Self.isDemo = false;
	},
	Bos:function(eventType,moodType){  //曲线上的点，统计
		if(!eventType) return;
		var Self = this;
		var place = Self.isFloat()? 'Box' : ['','Home','Home','Guest'][Self.place];
		MI.Bos('btnMood' + place + eventType,moodType); 
	},
	showDetail:function(account,type,timestamp){	 //日历筛选模式
		var Self = this,
			isMe = account == MI.user.account,
			user = isMe ? (account + '/mine') : account,
			t =  new Date(timestamp*1000),
			y = t.getFullYear(),
			m = t.getMonth(),
			d = t.getDate();

		var url = 'http://t.qq.com/' +  user + '?filter=9&nocale=1&date=' + y + Self.ft(m + 1) + Self.ft(d);
		//if(!Self.place || Self.place==1 || (Self.place==3 && Self.isFloat())){  
		//	window.open(url);
		//} else {
			//自己的广播页，和客人页的客人日历，才当前页跳转  
			location.href = url;
		//}
		return false;
	},
	ft:function(t){ //formatTime
		return ((t + '').length == 1 ? '0' : '') + t;
	}
};

window['_flash_Mood_Bos'] = function(e,t){
	MI.Mood.Bos(e,t);
}	
window['_flash_Mood_calendar'] = function(u,t,d){
	MI.Mood.showDetail(u,t,d);
}
/**
 * 打开签到浮层
 *
 * @param {Number} type 要显示的浮层选项卡，0表示签到，1表示收听的心情
 *
 *  @example
 *		MI.Mood.floatBox.show(0);
 *
 */
MI.Mood.floatBox = (function(){
		var t = MI.Mood.type;
		var name = [_('心情'),_('祈福')][t];
		var word1 = [_('的'),_('在')][t];
		var topic = ['',_('# # ')][t];	 //事件话题
		var eventTip = _('');  //小黄条事件wording

		var ico_50 = 'http://mat1.gtimg.com/www/mb/images/tFace/';
		var ico_20 = 'http://mat1.gtimg.com/www/mb/images/tFace/';

		var html1 = '<a title="' + _('狂喜') + '" href=""><img src="' + ico_50 + '01_50.gif"><em></em></a>\
						<a title="' + _('偷乐') + '" href=""><img src="' + ico_50 + '02_50.gif"><em></em></a>\
						<a title="' + _('无感') + '" href=""><img src="' + ico_50 + '03_50.gif"><em></em></a>\
						<a title="' + _('伤心') + '" href=""><img src="' + ico_50 + '04_50.gif"><em></em></a>\
						<a title="' + _('咆哮') + '" href=""><img src="' + ico_50 + '05_50.gif"><em></em></a>';
		var html2 = '<a title="' + _('祈福') + '" href=""><img src="' + ico_50 + '06_50.gif"><em></em></a>\
						<a title="' + _('献花') + '" href=""><img src="' + ico_50 + '07_50.gif"><em></em></a>\
						<a title="' + _('点烛') + '" href=""><img src="' + ico_50 + '08_50.gif"><em></em></a>';
		var html3 = '<a class="select" href="">' + _('全部') + '<em></em></a>\
						<a title="' + _('狂喜') + '" href=""><img src="' + ico_20 + '01_20.gif"><em></em></a>\
						<a title="' + _('偷乐') + '" href=""><img src="' + ico_20 + '02_20.gif"><em></em></a>\
						<a title="' + _('无感') + '" href=""><img src="' + ico_20 + '03_20.gif"><em></em></a>\
						<a title="' + _('伤心') + '" href=""><img src="' + ico_20 + '04_20.gif"><em></em></a>\
						<a title="' + _('咆哮') + '" href=""><img src="' + ico_20 + '05_20.gif"><em></em></a>';



		var html = '<div class="DshareWrap">\
						<div class="tabStyle1 shareTitle">\
							<ul>\
								<li class="select"><a href="#">' + _('我{0}{1}',word1,name) + '</a></li>\
								<li><a href="#">' + _('大家{0}{1}',word1,name) + '</a></li>\
								<li style="display:' + ['none','none'][t] + '"><a class="listDropBtn" href="javascript:void(0)"><span>' + _('名单的{0}',name) + '</span><em class="btn_ldrop"></em></a></li>'  + '\
							</ul>\
						</div>\
						<div class="temper wMood">\
							<div style="display:none;"><p class="guide"></p></div>\
							<dl class="clear">\
								<dt>' + [_('选择'),_('祈福')][t] + _('心情：') + '</dt>\
				   				<dd class="temperList">' + [html1,html2][t] + '</dd>\
								<dt>' + [_('抒发情绪：'),_('祈福宣言：')][t] + '</dt>\
								<dd style="position:relative;_zoom:1">\
									<textarea id="tempertext" class="tempertext inputArea textarea" style="border-color: rgb(206, 206, 206);"></textarea>\
								</dd>\
								<dt></dt>\
								<dd>\
									<p class="btnBox" style="float:none;">\
									<button class="tsendBtn inputBtn sendBtn" style="float:right;">' + _('广播') + '</button>\
									<span class="countTxt" style="height:33px;">' + _('还能输入<em>140</em>字') + '</span></p>\
								</dd>\
								<dt class="lastMLabel" style="display:none;">' + _('最近{0}：',name) + '</dt>\
								<dd class="lastMCont" style="display:none;"></dd>\
								</dl>\
								<div class="temperAssistant" style="display:none"><label><input type="checkbox" checked="checked"><span>' + _('收听') + '<a href="http://t.qq.com/xinqingxiaozhushou" target="_blank">' + _('心情小助手') + '</a></span></label></div>\
						</div>\
						<div class="temper rMood" style="display:none;">\
							<div class="recent">\
								<span class="recentTitle">' + _('今天，大家{0}{1}：',word1,name) + '</span>' + [html3,''][t] + '\
							</div>\
							<div class="temperConList">\
								<ul>\
								</ul>\
							</div>\
							<p style="display:none;text-align:center;position:relative;top:-135px;"><a href="#" class="lookOther">' + _('看看大家的{0}',name) + '</a></p>\
							<div class="pages">\
							</div>\
						</div>\
						 <div class="temper success" style="display:none;">\
							<div class="talkSuc" style="">\
								<span class="tstip"><span class="ico_tsW"><span class="ico_ts"></span></span><span class="msg">' + _('广播成功！') + '</span></span>\
								<p><a href="#" class="lookOther">' + _('看看大家的{0}',name) + '</a></p>\
							</div>\
							<div class="temperFlash" style="display:none">\
								<p><a href="http://t.qq.com/' + MI.user.account + '/mine?filter=9" target="_blank" onclick="MI.Bos(\'btnMoodBoxCurveLink\')"><span>' + _('心情曲线：') + '</span></a>' + _('记录每天心情，绘制我的专属心情曲线！') + '</p>\
								<div class="flashWrap" style="height:100px;"></div>\
							</div>\
						</div>\
					 </div>';		   
			
			var _body,_wTab,_rTab,_mTab,_wMood,_rMood,_sMood,_guide,_mList,_talkBox,_lastMLabel,_lastMCont,_lookOther,
				_send,_count,_flashWrap,_rTitle,_rList,_tstip,_rMoodList,_page,_helper;
			var currData = [];	
			var wType=0;
			//var typeArr = [[1,2,4,8,16],[32,64,128]][t];
			var typeArr = [[1,2,3,4,5],[6,7,8]][t];
			var rType=0;
			var userType = 'undefined';   //是收听的人还是随机
			var inserted = 0;
			var moodCache = {};  //心情数据缓存
			var SHOW_NUM = 6;  //一页显示的心情数目
			//var typeArr2 = [0,1,2,4,8,16];
			var typeArr2 = [0,1,2,3,4,5];
			var u = MI.user.account;
			var today = new Date();
			var talkBox;
			var moodListId = 0; 
				

			function buildBody(){
				if(!_body) {
					 _body = UI.html(html)[0];
					 _wTab = $$(_body,'.shareTitle a')[0];
					 _rTab = $$(_body,'.shareTitle a')[1];
					 _mTab = $$(_body,'.shareTitle a')[2];
					 _wMood = $$(_body,'.wMood')[0];			
					 _rMood = $$(_body,'.rMood')[0];
					 _sMood = $$(_body,'.success')[0];
					 _guide = $$(_wMood,'.guide')[0];
					 _mList = $$(_body,'.temperList a'); //心情种类
					 _talkBox = $$(_body,'.tempertext')[0];
					 _lastMLabel = $$(_body,'.lastMLabel')[0];
					 _lastMCont = $$(_body,'.lastMCont')[0];
					 _lookOther = $$(_body,'.lookOther');
					 _send = $$(_body,'.tsendBtn')[0];
					 _count = $$(_body,'.countTxt')[0];
					 _flashWrap = $$(_body,'.flashWrap')[0];
					 _tstip = $$(_body,'.tstip')[0];
		   			 _rTitle = $$(_body,'.recentTitle')[0];
					 _rList = $$(_body,'.recent a');  //心情种类
					 _rMoodList = $$(_body,'.temperConList')[0];
					 _page = $$(_body,'.pages')[0];
					 _helper = $$(_body,'.temperAssistant input')[0]; //心情小助手
					 
					 //talkBox
					 talkBox = new MI.TalkBox(_wMood);
					 talkBox.boxType = 'mood';
					 talkBox.addList = MI.moodAddList;
					 talkBox.txtMax = 140 - topic.length;
					 if(topic) talkBox.topic = topic;
					 talkBox.successStart=function(data){
							MI.dialog.hideLoad();
							MI.Mood.curveData[u] = null;  //清除之前的数据，重新拉取
							switchBox([2,1][t]);
							switchTab([0,1][t]);
							//_published = 1;  //今日已发表过
							MI.Mood.published = 1;
							talkBox.emotion = '';
							setTimeout(function(){
								if(UI.B.ie) MI.Mood.insertFlash(u,_flashWrap);
								inserted = 1;
							},100);
							followHelper();
					 };
					 talkBox.failStart = function(data){
						 MI.dialog.hideLoad();
						 setTip(data.msg);
					 }
					 bindEvent();
				} 
				return _body;
			}	
			

			function selectCurr(list,curr){
				UI.each(list,function(o,i){
					UI.removeClass(o,'select');
					if(i==curr) UI.addClass(o,'select');
				})
			}
			
			//选择wording
			function showWording(){
				if(!MI.Mood.curveData[u]) {
					MI.Mood.getCurveData(u,toggleWording);
				} else {
					toggleWording();
				};
				showWording = function(){};
			}

			function toggleWording(){
				var oldMoods = MI.Mood.curveData[u].talk;
				var total = MI.Mood.curveData[u].total;
				var P = _guide.parentNode;
				if(t==1){
					_guide.innerHTML = eventTip;  //事件
					UI.addClass(P,'relayList');  
				} else {
					if(total<=3){
						_guide.innerHTML = _('<a href="http://t.qq.com/k/%E5%86%99%E5%BF%83%E6%83%85%E8%B5%A2%E5%A5%BD%E7%A4%BC" target="_blank">乐斗送好礼，心情爽翻天！写心情，4重礼包疯狂送！查看详情>></a>');
						UI.addClass(P,'relayList');	
					} else {
						UI.addClass(P,'guide02');
						_guide.innerHTML = [
						_('今天，你开心么？'),
						_('今天遇上什么事了？'),
						_('每日心情调频，今天的你在哪个波段？'),
						_('记录每日微心情'),
						_('抓拍下你的心情吧'),
						_('Mark 一下今天的心情吧'),
						_('为每天的心情留个爪~')
						][today.getDay()];
					}
				}
				UI.show(P);
				
				if(total>0 && oldMoods.length>0) {
					if(MI.Mood.curveData[u].followHelper*1) return false; //显示收听小助手时，不显示最近心情
					var o = oldMoods[0];
					var cnt = fmtCont(o.content,40);
					_lastMCont.innerHTML = '<a target="_blank" href="http://t.qq.com/' + u + '/mine?filter=9" title="' + cnt.text + '">' + cnt.cont + '<span class="time">' + fmtTime(o.timestamp) + '</span></a>'; 
					UI.show(_lastMLabel);
					UI.show(_lastMCont);
					_lastMCont.onclick = function(){
						//MI.Mood.showDetail(u,o.sign,o.timestamp);
						MI.Bos('btnMoodBoxCurrent');
						//return false;
					}
				}
			};
			
			//输入框引导wording部分...............................
			
			var _selectWord= '';
			var _wordList = [
				[
					[_('人逢喜事需留爪，记一笔~'),
					_('今天诸事给力，得瑟一下~'),
					_('黄瓜必须拍，人生必须嗨！'),
					_('淫生苦短，必须性感。'),
					_('我签的不是心情，是骄傲！')
					],
					[_('如果感到开心，你就写心情~'),
					_('今天很欢乐，好心情要保鲜'),
					_('心满意足享受每一点快乐，是走向幸福的唯一途径。')
					],
					[_('今日无悲喜，平平淡淡才是真'),
					_('无感的一天，明天求进步')
					],
					[_('今日遭遇小黑叉，记一笔转个运！'),
					_('麦兜说：大难不死，必有锅粥。所以，要开心哦！'),
					_('只要活着一定会遇上好事的。'),
					_('不准不开心，微笑面对，勇敢体会。'),
					_('开心了就笑，不开心了就过会儿再笑。'),
					_('人生留下的不过是深浅不一的印记，付之一笑的回忆。'),
					_('要笑得灿烂,令世界黯然;即使忧伤,也要无比鲜艳。')
					],
					[_('怒了，刨个洞，大喊三千声！'),
					_('怒火中烧一声吼啊~地球都要抖一抖哇~'),
					_('表生气了，就算被狗咬了，也不要去咬它。'),
					_('生活的一半是倒霉，另一半是如何处理倒霉。'),
					_('与其生别人的气，不如睡自己的觉。'),
					_('快乐是一天，不快乐也是一天，为什么不天天快乐呢？'),
					_('什么叫快乐？就是按捺住内心咆哮的冲动对每个人微笑。'),
					_('成熟不是心变老，而是怒火在燃烧还保持微笑。')
					]
				],
					[
						[_('愿逝者安息，生者坚强。'),
						_('愿你在天堂那边，找到一片宁静的天地。'),
						_('祝福生还的同胞，生活还将继续，你们仍要坚强。'),
						_('此刻，我们都是你的亲人。')
						],
						[_('轻轻放一朵小花，在那遥远的地方陪你。'),
						_('亲爱的你，不曾相识的你，愿你安息。'),
						_('洁白的百合，一如你纯真的微笑，你要知道，你不孤独......'),
						_('天堂里没有车来车往......')
						],
						[_('一点点的温暖，照亮你回家的路......'),
						_('点一支蜡烛，在黑暗的世界为你指路。'),
						_('忍住悲伤，忍住愤懑，只愿你安静的走一程。')
						]
					]
				][t];
			
			//返回0和给定数之间随机数
			function getRnd(n){
				return Math.floor(Math.random()*n);
			}
			//选择心情时的wording，用户没有输入时出现
			function selectWording(i){
				var wording = _wordList[i][getRnd(_wordList[i].length)];
				clearWording();
				if(_talkBox.value == ''){
					_talkBox.value = _selectWord = wording;
					t==0 &&  UI.addClass(_talkBox,'gray');
				}
				talkBox.focus();
			}

			//清除wording
			function clearWording(){
				if(_selectWord && _talkBox.value == _selectWord) {
					_talkBox.value = _talkBox.value.replace(_selectWord,'');
					_selectWord = '';
					t==0 && UI.removeClass(_talkBox,'gray');	
				}
				talkBox.countTxt();
			}
			

			//输入框引导wording部分结束....................

			//显示错误提示
			function setTip(str){
				_count.innerHTML = '<span class="error">' + str + '</span>';
			};
			
			//发布前检查
			function checkPublish(){   
				if(!wType) {
					setTip(_('请选择一个{0}',name));
					MI.Bos('btnMoodWriteNoType');
					return false;
				}
				if(!UI.trim(_talkBox.value) || (t==0 && _talkBox.value == _selectWord)) {
					t==0 && clearWording();
					setTip(_('为{0}写点话吧',name)),
					MI.Bos('btnMoodWriteNoCont');
					_talkBox.focus();
					return false;
				}  
				return true;
			}
			//切换选项卡
			function switchBox(n,listid){
				if(MI.Mood.published && n==0) {
					n = 2;
					_tstip.innerHTML = _('今天已经写过{0}',name)
					_tstip.parentNode.style.width = '200px';
					_tstip.parentNode.style.textAlign = 'center';
				}	
				UI.each([_wMood,_rMood,_sMood],function(o,i){
					UI.hide(o);
					if(n==i) UI.show(o);
				});
				if(n==0) showWording();
				if(n==1 && !listid) {
						moodListId = 0; //从名单心情切换会大家的心情，重置moodListId
						showMoodList(); //名单tab不重复请求
				}
				if(n==2) {
					if(!UI.B.ie || (UI.B.ie && !inserted)) {
						MI.Mood.insertFlash(u,_flashWrap);
						inserted = 1;
					}	
				}	
			}
			//切换选项卡样式
			function switchTab(n) {
				UI.each([_wTab,_rTab,_mTab],function(o,i){
					if(n==i) UI.addClass(o.parentNode,'select');
					else UI.removeClass(o.parentNode,'select');
				});
			}
			//发布心情
			function publish(){
				if(!checkPublish() || talkBox._btn.disable) return;
				MI.dialog.showLoad();
				talkBox.emotion = wType;
				talkBox.send();
			};
			
			//显示收听的心情列表100条
			function showMoodList(){
				var cacheId =  userType;
				if(moodCache[cacheId] && moodCache[cacheId].length) {		  
					buildList(moodCache[cacheId]);
					return;
				}
				if(userType === 'undefined') _rTitle.parentNode.style.visibility = 'hidden';
				setTimeout(function(){
					MI.dialog.showLoad();
				},20);
				MI.ajax({
					//url:'/asyn/friendSigns.php',
					url:MI.url.friendSigns,
					data:{t:0,ut:userType,index:0,num:100},
					success:function(data){
						MI.dialog.hideLoad();
						UI.C(_body,'visibility','visible');
						_rTitle.parentNode.style.visibility = 'visible';
						data = MI.json(data);
						if(data.result==0){
							userType = data.info.ut;
							moodCache[userType] = data.info.talk;
							buildList(moodCache[userType]);
						}
					}
				})
			}
			

			//初始化列表
			function buildList(o,listid,type){
				var T = _rTitle.parentNode,L = _lookOther[0].parentNode
				currData = [];
				if(o.length) { //筛选心情类型
					UI.each(o,function(p,i){
						if(rType == 0 || rType == p.sign) currData.push(p);
					})
				}
				if(!o.length || !currData.length) {
					var str = rType==0 ? _('今天还没有人写过心情') :  _('今天还没有人写过此类心情');
					if(t==1) str = _('今天还没有人祈福');
					_rMoodList.innerHTML = '<p class="empty" style="zoom:1;height:21px;padding-top:20px;text-align:center;">' + str + '</p>';
					if(rType == 0) {
						UI.hide(T);
						if(moodListId !=0) {
							UI.show(L);
						} else {
							UI.hide(L);
						}	
					} else {
						UI.show(T);
						UI.hide(L);
					}
				} else {
					UI.show(T);
					UI.hide(L);
				}
				createPage(currData.length,0);
				createList(0,SHOW_NUM);
				MI.dialog.hideLoad();
			}
			

			//创建列表
			function createList(start,end){
				if(!currData.length) return;
				var str = '<ul>',o,len,time,ft = MI.Mood.ft,url,content,cnt;
				for(i=start;i<end;i++){
					o = currData[i];
					if(!o) continue;
					time = fmtTime(o.timestamp);
					len = 48 - MI.string.length((o.bkName || o.nick) + time);
					url = 'http://t.qq.com/' + o.name + '?filter=9';
					content = o.content;
					if(moodListId != 0) {  //名单心情数据，补全心情图片
						content =  '<img class="temperPic20" src="' + ico_20 + '0' + o.sign + '_20.gif">' + content;
					} 
					cnt = fmtCont(content,len);

					str += '<li><a style="cursor:pointer" target="_blank" onclick="MI.Bos(\'btnMoodBoxLookSingle\');" href="' + url + '">';
					str += '<img class="userPic" width=20 height=20 src="' + o.pic.replace(/\/50$/,'/20') + '" />';
					str += '<p class="temperCon" title="' + cnt.text + '">' + (o.bkName || o.nick) + '： ';
					str +=  cnt.cont + '</p>';
					str += '<span class="time">' + time + '</span>';
					str += '</a></li>';
				}
				str += '</ul>';
				_rMoodList.innerHTML = str;
			}

			//格式化时间
			function fmtTime(timestamp){
				var date = new Date(timestamp*1000),
					m = date.getMonth(),
					d = date.getDate(),
					ft = MI.Mood.ft,
					time;

					if(m == today.getMonth() && d == today.getDate()){
						time = ft(date.getHours()) + ':' +  ft(date.getMinutes());  //是今天则显示时间
					} else {
						time = (m + 1) + _('月') + d + _('日');  //不是今天 显示日期
					} 
					return time;
			}

			//格式化内容
			function fmtCont(str,len){
				var img = str.match(/<img[^<>]+?>/g);
				var tmpTxt = str.replace(img[0],''); //心情图标
				var cnt = tmpTxt = tmpTxt.replace(/<(a|em|span)[^<>]+?>|<\/(a|em|span)>/gi,'');
				UI.each(img,function(o,i){  //处理表情图片等
					cnt = cnt.replace(o,'&' + i + '&');
				});
				cnt = MI.string.cut(cnt,len);
				UI.each(img,function(o,i){
					o = o.replace('crs=','src=').replace('class=\'crs dn\'','class=\'crs\'');
					cnt = cnt.replace('&' + i + '&',o);
				})
				cnt = cnt.replace(/&\d{0,2}$/,'');  //截断的表情
				return {
					text:tmpTxt.replace(/<img[^<>]+?>/g,''),
					cont:img[0] + cnt
				}
				
			}
			

			//翻页
			function createPage(num,pn){
				if(!MI.Mood.page) MI.Mood.page = new MI.Page({
					target:_page,
					num:3
				});
	   
				var p = Math.ceil(num/SHOW_NUM);	//总页数	
				if(p<=1) {
					_page.innerHTML = ' ';   //只有1页不显示翻页
					return;
				}
				MI.Mood.page.show(pn + 1,p);
				pageEvent(num,p);
			}

			function pageEvent(num,p){
				UI.each(UI.GT(_page,'a'),function(o){
					o.onclick = function(){
						var n = parseInt(UI.A(this,'page'))-1;
						if(n<0 || n >= p) return false;
						createList(n*SHOW_NUM,(n+1)*SHOW_NUM);
						setTimeout(function(){
							pageEvent(num,p);	
						},0);	
						return false;
					}
				});
			};

			function keySend(e){
				var E = UI.E(e);
				if (E.ctrl && E.key == 13) { //Alt+S : E.alt && E.key == 83
					setTimeout(publish,250);
					MI.Bos('btnCtrlEnter');
				}
			}
			
			//存储心情小助手状态,存储相反的状态
			function setHelperState(checked){
				UI.cookie('mb_moodHelperState',(!checked)*1,30);
			}				 
			
			//显隐心情小助手
			function showHelper(){
				var follow = 0; //拉到数据才显示
				if(MI.Mood.curveData[u]) follow = MI.Mood.curveData[u].followHelper; //0不显示，1显示
				if(!t && follow*1) {
					UI.show(_helper.parentNode.parentNode);
					_helper.checked = !(UI.cookie('mb_moodHelperState')*1);
				} else {
					UI.hide(_helper.parentNode.parentNode);
					_helper.checked = false;
				}
			}
			
			//收听小助手
			function followHelper(){
				var mList = MI.List,mListFollow = null;
				if(UI.isObject(mList)) mListFollow = MI.List.listFollow;
				if(!t && _helper.checked) {
					MI.List = MI.List || {};
					MI.List.listFollow = function(){}; //阻止名单备注对话框弹出
					MI.follow('xinqingxiaozhushou',_helper,function(){
						MI.List = mList;
						if(MI.List) MI.List.listFollow = mListFollow; //恢复原始对象
						UI.hide(_helper.parentNode.parentNode);
						if($$(_tstip,'.msg')[0]){
							$$(_tstip,'.msg')[0].innerHTML = _('广播成功，你已经收听了') + '<a href="http://t.qq.com/xinqingxiaozhushou" target="_blank">' + _('心情小助手') + '</a>';
							_tstip.parentNode.style.width = '280px';
						}
					});
					setTimeout(function(){   //请求没有成功返回的情况
						MI.List = mList;
						if(MI.List) MI.List.listFollow = mListFollow;
					},3000);
				}
			}
			
			function bindEvent(){
				UI.each(_mList,function(o,i){
					o.onclick = function(){
						selectCurr(_mList,i);
						wType = typeArr[i];
						selectWording(i);
						return false;
					};
				})

				UI.each([_wTab,_rTab],function(o,i){
					o.onclick = function(){
						if(!UI.hasClass(o,'select')) {
							switchTab(i);
							switchBox(i);
							MI.Bos(i==0 ? 'btnMoodBoxWriteTab':'btnMoodBoxLookTab');
						}
						return false;
					}
				});
				
				UI.each(_rList,function(o,i){
					o.onclick = function(){
						selectCurr(_rList,i);
						rType = typeArr2[i];
						if(!moodListId) {
							showMoodList();
						} else {
							buildList(MI.Mood.listData[moodListId].userUin);	
						}	
						MI.Bos('btnMoodBoxLookFilter_' + rType);
						return false;
					};
				})
				
				UI.each(_lookOther,function(o){
					o.onclick = function(){
						switchTab(1);
						switchBox(1);
						MI.Bos('btnMoodBoxLookOther');
						return false;
					}
				})
				
				if(t==0){
					UI.EA(_talkBox,'keydown',clearWording);
					//UI.EA(_talkBox,'keyup',clearWording);
					UI.EA(_talkBox,'mouseup',clearWording);
					_talkBox.onblur = _talkBox.onbeforeeditfocus = null;
				}
				
				_helper.onchange = function(){
					setHelperState(this.checked);
				}

				UI.EA(_send,'mouseover',function(){
					_send.onclick = publish;
				});
				
				UI.EA(_talkBox,'focus',function(){
					talkBox._body.onkeydown = keySend;
				});
				_send.onclick = publish;
				talkBox._body.onkeydown = keySend;

				MI.Mood.listDrop = new MI.NewListDrop({
					url : MI.url.MoodList || '/asyn/userEmotionStatistics.php',	//拉取列表心情数据接口	
						refresh : 1, 						//每次都重新构建列表结构
						tab : _mTab, 						//列表按钮
						current : 0, 						//当前页id
						className : 'MDdropBox',
						linkEvent : function(listObj){ 		//下拉列表中a链接的事件
							getMoodListData(UI.A(this,'listid'),rType,this.innerHTML);
							listObj.isSelected = 1;  //保留tab选中状态
							listObj.setPos();   //解决文字变粗后，偏差问题
						},
						showEvent : function(listObj){
							if(!UI.hasClass(listObj._tabParent,'select')) {
								listObj.isSelected = 0; //非当前tab，不保留选中
								listObj.current = -1;
							}
						},
						bos : 'btnListMood' 			 //显示列表时上报代码	
					});
			}
			
			//显示名单心情
			function showList(listId,type,listName){
				selectCurr(_rList,type);
				switchTab(2);
				switchBox(1,listId);
				rType = type;
				moodListId = listId;
				buildList(MI.Mood.listData[listId].userUin);
				UI.GT(_mTab,'span')[0].innerHTML = MI.string.cut(listName,10);
			}
			
			//获取名单数据，并显示对应心情
			function getMoodListData(listId,type,listName){
				if(!MI.Mood.listData) {
					MI.dialog.showLoad();
					MI.ajax({
						url:MI.Mood.listDrop.url,
						data:{u:MI.user.account},
						success:function(data){
							MI.dialog.hideLoad();
							var data = MI.json(data);
							if(data.result==0){
								MI.Mood.listDrop.listData = data.info.list;
								MI.Mood.listData = {};
								UI.each(data.info.list,function(o,i){
									MI.Mood.listData[o.listId] = o;
								
								})
								showList(listId,type,listName);
							} 
						}	
					})
				} else {
					showList(listId,type,listName);
				}
			}
			
			//外部打开心情浮层接口，打开名单心情时需要传参数
			function show(listId,type,listName){
				if(!_body) buildBody();
				MI.dialog.show({
					title:'<h1 class="DmainTit"></h1>',
					html:_body,
					width:460,
					start:function(){
						if(!UI.isUndefined(type) && listName) { //直接打开名单心情
							getMoodListData(listId,type,listName)
						}
						else {   
							if(MI.Mood.published<0) {          //根据是否发表过心情，判断打开的TAB
								MI.Mood.getCurveData(u,function(){
									showHelper();
									switchTab(MI.Mood.published);
									switchBox(MI.Mood.published);
									MI.dialog.hideLoad();
									UI.C(_body,'visibility','visible');
								},function(data){
									MI.dialog.hideLoad();
									MI.alert(data.msg);
								});
							} else {
								switchTab(MI.Mood.published);
								switchBox(MI.Mood.published);
							}
						}
					}
				});
				if(UI.isUndefined(type) && (MI.Mood.published<0)) {
					MI.dialog.showLoad();
					UI.C(_body,'visibility','hidden');
				}		
			};
			
			return {
				show:show
			}		   
})();

//新的dropList，拉取json格式数据
MI.NewListDrop = function(args){
	var Self = this;
	this.refresh = args.refresh;  //是否每次都重建列表结构
	this.url = args.url; 			//拉取列表数据接口	
	this._tab = args.tab; 			//列表按钮
	this.current = args.current; 	//当前页id
	this.linkEvent = args.linkEvent; //下拉列表中a链接的事件
	this.showEvent = args.showEvent;
	this.hideEvent = args.hideEvent;
	this.ctrlHtml = args.ctrlHtml || ''; 	 //列表底部额外结构
	this.className = args.className || '';
	this.bos = args.bos; 			 //显示列表时上报代码
	this.clickTrigger = args.clickTrigger; //是否点击触发展开列表
	this.delay = {};
	this._tab.onmouseover = function(){
		Self.startLoad();
	}
	this._tab.onmouseout = function(){
		Self.cancelLoad();
	}
	if(this.clickTrigger) this._tab.onclick = function(){
		Self.startLoad();  //点击触发
	}	
}

MI.NewListDrop.prototype = {
	startLoad : function(){
		var Self = this;
		clearTimeout(Self.delay.hide);
		clearTimeout(Self.delay.load);
		Self.delay.load = setTimeout(function(){
			Self.load();
		},100);
		Self.bos && MI.Bos(Self.bos);
		return false;
	},
	load : function(){
		var Self = this;
		if(Self.listData) {
			Self.show();
		}	
		else {
			MI.ajax({
				url:Self.url,
				data:{u:MI.user.account},
				success:function(data){
					var data = MI.json(data);
					if(data.result==0){
						Self.listData = data.info.list;
						Self.show();
					} else {
						//nothing
					}
				}
			});	   	
		}			   
	},
	cancelLoad : function(){
		var Self = this;
		Self.hide();
		clearTimeout(Self.delay.load);
		Self.delay.load = -1;   //重置计时器
	},
	show: function(){
		var Self = this;
		if(Self.delay.load < 0) return false;   //数据返回前，鼠标离开，不显示
		if(!Self.builded) {
			Self.build();
		}
		Self.showEvent && Self.showEvent(Self);
		if(Self.refresh) {
			Self.creatList();
		}
		UI.show(Self._body);
		Self.setPos();
		Self.page(0);
		
		try{
			Self.firstLink.focus();
		} catch(e){};
		UI.addClass(Self._tabParent,'select');
		UI.addClass(Self._arrow,'lopen');
	},
	build: function(){
		var Self = this;
		Self.wrapHtml = '<div class="' + Self.className + '" style="position:absolute;z-index:99999;display:none;"><div class="ldList"><a href="#" class="ld_btn pageUp" title="' + _('向上滚动') + '" style="display:none"><em></em></a><div class="ldListBox"><ul></ul></div><a href="#" class="ld_btn pageDown" title="' + _('向下滚动') + '" style="display:none"><em></em></a></div>' + (Self.ctrlHtml || '') + '</div>';
		Self._body = UI.html(Self.wrapHtml)[0];
		Self._pageUp = $$(Self._body,'.pageUp')[0];		
		Self._pageDown = $$(Self._body,'.pageDown')[0];
		Self._listUl =  $$(Self._body,'.ldListBox ul')[0];
		Self._arrow = UI.GT(Self._tab,'em')[0];		//箭头
		Self._tabParent = Self._tab.parentNode; 
		Self.isSelected = UI.hasClass(Self._tabParent,'select'); //当前tab是否默认选中
		
		Self.creatList();
		UI.append(Self._body,document.body);
		Self._body.onmouseout = function(){
			Self.cancelLoad();
		}
		Self._body.onmouseover = function(){
			clearTimeout(Self.delay.hide);
		}
		Self.builded = 1;
		Self.pageEvent();
	},
	creatList : function(){
		var Self = this,html = '';
		UI.each(Self.listData,function(o){
			html += (Self.current == o.listId) ? '<li class="on"><a style="cursor:default">' + o.listName + '</a></li>' :
			'<li><a href="' + (o.href || 'javascript:void(0)') + '" title="' + o.listName + '" listid="' + o.listId + '">' + o.listName + '</a></li>';
		})
		Self._listUl.innerHTML = html;

		UI.each($$(Self._listUl,'li a'),function(o,i){
			if(i == 0) Self.firstLink = o;
			if(UI.hasClass(o.parentNode,'on')) return false;
			if(Self.linkEvent) o.onclick = function(){
				Self.linkEvent.call(o,Self);
				Self.hide();
				Self.current = UI.A(o,'listid'); //修改当前项
				return false;
			}	
		});		
	},
	hide : function(){
		var Self = this;
		Self.delay.hide = setTimeout(function(){
			if(!Self.builded) return false;
			UI.hide(Self._body);
			UI.removeClass(Self._arrow,'lopen');
			if(!Self.isSelected) UI.removeClass(Self._tabParent,'select');
			Self.hideEvent && Self.hideEvent(Self);
		},200);			   
	},
	setPos : function(){
		var Self = this,liHeight,listHeight,windowHeight;
		Self._body.style.left = UI.getX(Self._tab)  + 1 + 'px';
		Self._body.style.top = UI.getY(Self._tab) + UI.height(Self._tab) + 'px';
		Self._listUl.style.height = 'auto';
		Self.liHeight = liHeight = UI.height(Self.firstLink);
		
		listHeight = UI.height(Self._body);
		windowHeight = UI.windowHeight() + UI.scrollY() - UI.getY(Self._tab) - (Self.isLab ? 65 : 40);
		if (windowHeight < 210){
		//	windowHeight = 210;
		}
		if(!UI.hasClass(document.body,'ipad') && listHeight > windowHeight){
			Self._listUl.style.cssText = 'overflow:hidden;height:' + liHeight * Math.floor(windowHeight / liHeight) + 'px';
		}
	},
	pageEvent : function(){
		var Self = this,
		_pageUp = Self._pageUp,_pageDown = Self._pageDown,liHeight = 17;

		_pageUp.onmousedown = function(){
			Self.page(-liHeight);
			Self.delay.page = setInterval(function(){
				Self.page(-liHeight);
			},100);
			return false;
		}
		_pageDown.onmousedown = function(){
			Self.page(liHeight);
			Self.delay.page = setInterval(function(){
				Self.page(liHeight);
			},100);
			return false;
		}
		_pageUp.onclick = _pageDown.onclick = _pageUp.onmouseup = _pageDown.onmouseup = function(){
			clearInterval(Self.delay.page);
			return false;
		}
		var pageScroll = function(e){
			var E = UI.E(e);
			if (E.wheel == 1){
				Self.page(-liHeight);
			}
			else {
				Self.page(liHeight);
			}
			E.prevent();
		}
		UI.EA(Self._listUl.parentNode.parentNode,'mousewheel',pageScroll);
		if (!UI.B.ie){
			Self._listUl.parentNode.parentNode.onmousewheel = pageScroll;
		}
	},
	page : function(action){
		var Self = this,
			height = UI.height(Self._listUl),
			totalHeight = Self._listUl.scrollHeight,
			scrollTop = Self._listUl.scrollTop + action || 0;
		Self._listUl.scrollTop = scrollTop;
		if (Self._listUl.scrollTop > 0){
			UI.show(Self._pageUp);
		}
		else {
			UI.hide(Self._pageUp);
			clearInterval(Self.delay.page);
		}
		if (height + scrollTop < totalHeight){
			UI.show(Self._pageDown);
		}
		else {
			UI.hide(Self._pageDown);
			clearInterval(Self.delay.page);
		}
	}
};
					
