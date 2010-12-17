/**
 * MI.College
 * Author : xhlv@tencent.com
 * Datetime : 
 * Last Eidt: 
*/
/**
 * MI.College 个人标签
 * @namespace MI.College 个人标签
 * @type Object
 */
MI.College = {
	/**
	 * 创建广播学院
	 * 
	 *            @example
	 *            MI.College.build();
	 */
	build : function(){
		var Self = this,
			step = Self.step,
			finished = MI.user.collegeFinished;
		Self._body = UI.html('<div class="beginnerWrap clear"></div>')[0];
		Self._body.innerHTML = '<a href="#" class="close" title="关闭"></a><a href="#" class="openCnts"></a><div class="beginnerPad"><div class="hd"></div><div class="con"><div class="be_cWrap"><div class="be_qaList">&#183;<a href="/college_talk.php">我能广播什么</a><br />&#183;<a href="/college_anas.php">每日经典语录</a><br />&#183;<a href="/college_tips.php">微博生存技巧</a></div><div class="beginSteps"><h3><a href="#" class="openSteps"></a></h3><div class="lstepWrap"><ul class="clear"><li><a href="' + step[0] + '" onclick="MI.Bos(\'btnCollegeStep_1\')"><em></em>有头有脸</a><em class="arrow"></em></li><li><a href="' + step[1] + '" onclick="MI.Bos(\'btnCollegeStep_2\')"><em></em>全面印象</a><em class="arrow"></em></li><li><a href="' + step[2] + '" onclick="MI.Bos(\'btnCollegeStep_3\')"><em></em>初试啼声</a><em class="arrow"></em></li><li><a href="' + step[3] + '" onclick="MI.Bos(\'btnCollegeStep_4\')"><em></em>手机达人</a><em class="arrow"></em></li><li class="finish"><a href="#">领取礼包</a></li></ul><div class="scrollTxt"></div></div></div></div></div><div class="ft"></div></div><div class="beginnerCon" style="display:none"></div><div class="beginnerSuc" style="display:none"></div></div>';
		UI.css('.beginnerWrap{position:absolute;z-index:9999;top:78px;left:102px;padding-left:102px}.beginnerWrap .close{position:absolute;right:auto;left:78px;top:9px;float:none;margin:0;text-indent:0}.beginnerWrap .openCnts{position:absolute;z-index:50;left:13px;top:40px;display:block;width:72px;height:20px}.beginnerPad,.beginnerPad .ft{width:102px;overflow:hidden;background:url(http://mat1.gtimg.com/www/mb/images/beginnerBg1.png) no-repeat;_background:none;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=crop,src="http://mat1.gtimg.com/www/mb/images/beginnerBg1.png")}.beginnerPad{position:absolute;top:-10px;left:0}.beginnerPad .hd,.openSteps,.showSteps h3,.lstepWrap li a,.lstepWrap em,.rstepWrap .top span,.rstepWrap .bot span,.beginnerCon h2,.rstepWrap h4,.rstepWrap .cntBox,.rstepWrap a,.rstepWrap em{background:url(http://mat1.gtimg.com/www/mb/images/beginnerBg2b.png) no-repeat}.openSteps{position:absolute;display:block;width:93px;height:55px;background-position:-196px 0}.beginnerPad .hd{width:95px;height:79px;margin-left:4px;border-bottom:1px solid #98D6ED}.beginnerPad .con{width:99px;margin-left:2px;background:#fff;border-top:1px solid #fff}.beginnerPad .be_cWrap{width:95px;margin:0 auto;background:#DEEEF8}.beginnerPad .be_qaList{padding:10px 4px;color:#2094C3;font-family:"Simsun";line-height:21px}.beginnerPad .be_qaList a{color:#2094C3}.beginnerPad .ft{height:10px;_margin-left:-102px;_padding-left:102px;background-position:-102px 0}.beginSteps{width:93px;height:48px;margin:0 auto;overflow:hidden}.openSteps.doneSteps{background-position:-196px -58px}.showSteps h3{height:55px;background-position:-98px 0}.showSteps .openSteps,.lstepWrap{display:none}.showSteps .lstepWrap{display:block}.lstepWrap{width:85px;padding:0 3px;border:1px solid #B2D6E4;border-width:0 1px;background:#fff}.lstepWrap li{float:left;width:100%}.lstepWrap li a{display:block;width:100%;padding-top:1px;line-height:25px;color:#B0560C;background-position:-95px -83px}.lstepWrap .cur a,.lstepWrap .finish a{font-weight:bold;text-align:center;background-position:0 -83px}.lstepWrap .cur a:hover,.rstepWrap .done a:hover{text-decoration:none;cursor:default}.lstepWrap .finish a{color:#fff;background-position:-226px -212px}.lstepWrap em,.rstepWrap em{display:inline-block;float:left;width:14px;height:13px;margin:6px 4px 0 7px;_margin-right:1px;background-position:-321px 0}.lstepWrap em.arrow{display:block;clear:both;float:none;width:20px;margin:2px auto;background-position:-369px 0}.lstepWrap .done a em,.rstepWrap .done em{background-position:-345px 0}.lstepWrap .cur a em,.lstepWrap .finish em{display:none}.scrollTxt{width:81px;overflow:hidden;margin:8px auto 0;line-height:1.231;white-space:nowrap;color:#DC8F50}.scrollTxt a{color:#DC8F50}.beginnerCon{position:relative;width:800px;height:557px;overflow:hidden;padding-top:40px;background:url(http://mat1.gtimg.com/www/mb/images/beginnerBg3.png) no-repeat}.beginnerCon h2{width:402px;height:30px;margin:0 0 23px 40px;background-position:0 -179px}.giftWrap{width:704px;margin-left:105px;overflow:hidden;*zoom:1}.giftWrap li{float:left;width:124px;margin-right:110px}.giftWrap h3{width:124px;height:29px;padding-top:101px;overflow:hidden;font:normal 16px/29px "MicroSoft YaHei","SimHei";color:#EE7800;text-align:center;background-image:url(http://mat1.gtimg.com/www/mb/images/beginnerBg4b.jpg);background-repeat:no-repeat}.giftWrap p{padding:0 8px;text-align:center}.g3{background-position:-129px 0}.g4{background-position:-258px 0}.rstepWrap .top{border-color:#F9E197;background-color:#FFFDF2}.rstepWrap .bot,.rstepWrap .cntBox{border-color:#F9E197;background-color:#FEFBDE}.rstepWrap .top .left{background-position:-299px -15px}.rstepWrap .top .right{background-position:-315px -15px}.rstepWrap .bot .left{background-position:-299px -31px}.rstepWrap .bot .right{background-position:-315px -31px}.rstepWrap{width:766px;margin:20px auto 0}.rstepWrap h3{padding:0 0 12px 10px;font:normal 18px/29px "MicroSoft YaHei","SimHei"}.rstepWrap .cntBox{padding:10px 20px 10px 24px;background-position:0 -240px;background-repeat:repeat-x}.rstepWrap li{float:left;width:144px;height:176px}.rstepWrap h4{width:140px;height:50px;overflow:hidden;zoom:1;line-height:51px;font-size:14px;font-weight:bold;background-position:0 -113px}.rstepWrap h4.last{background-position:-160px -113px}.rstepWrap h4 b{float:left;display:block;width:44px;margin-right:9px;_margin-right:6px;font:bold 26px/48px Arial, Helvetica;color:#F98C05;text-align:center}.rstepWrap p{height:105px;padding:0 28px 0 24px}.rstepWrap a{display:block;zoom:1;width:116px;height:19px;margin-top:-155px;padding:157px 0 0 24px;font-family:"Simsun";color:#DC8F50;background-position:-390px 0}.rstepWrap .done a,.rstepWrap .done .bg{color:#5C9B16;cursor:default}.rstepWrap em{margin-top:3px;*margin-top:4px;_margin-top:3px;margin-left:0}.rstepWrap .bg,.giftBox b{display:block;background:#fff;filter:alpha(opacity:0);opacity:0;cursor:pointer}.rstepWrap .bg{position:relative;width:144px;height:176px;margin:-176px 0 0 -24px}.beginnerSuc{position:relative;width:800px;height:748px;padding-top:4px;background:url(http://mat1.gtimg.com/www/mb/images/beginnerBg5b.png) no-repeat}.beginnerSuc .bg{width:792px;height:198px;margin:0 auto;background:url(http://mat1.gtimg.com/www/mb/images/beginnerBg6b.jpg) no-repeat}.gifts{width:754px;height:179px;margin:0 auto;background:url(http://mat1.gtimg.com/www/mb/images/beginnerBg7b.jpg) no-repeat}.gifts h2{height:46px;background:none;visibility:hidden}.giftBox{width:732px;margin-left:12px}.giftBox li{float:left;width:216px;height:83px;padding:0 2px 0 26px}.giftBox h3{height:78px;padding:5px 0 0 88px;font:normal 16px/29px "MicroSoft YaHei","SimHei";background-image:url(http://mat1.gtimg.com/www/mb/images/beginnerBg4b.jpg);background-repeat:no-repeat}.giftBox .g2{background-position:0 -135px}.giftBox .g3{background-position:0 -223px}.giftBox .g4{background-position:0 -311px}.giftBox p{width:216px;height:83px;overflow:hidden;margin-top:-83px}.giftBox a{display:block;padding:38px 15px 0 88px;font-family:"Simsun";color:#B0560C;line-height:19px}.giftBox b{width:216px;height:83px;margin:-73px 0 0 -88px}.photoWrap{position:relative;width:740px;height:330px;margin:0 auto}.photoTxt{position:absolute;z-index:1;left:19px;top:52px;width:702px;text-indent:2em}.beginnerCon .close,.beginnerSuc .close{left:auto;top:15px;right:15px}');
		UI.append(Self._body,document.body);

		Self._close = dom('.close');
		Self._btn = dom('.openSteps');
		Self._openCont = dom('.openCnts');
		Self._cont = dom('.beginnerCon');
		Self._success = dom('.beginnerSuc');
		Self._finish = dom('.finish a');
		Self._scrollTxt = dom('.scrollTxt');
		Self._follow = UI.html('<input type="button" class="addAttention">')[0];
		Self._cont.innerHTML = '<a href="#" class="close" title="关闭" onclick="MI.S(\'tips_college_\'+MI.user.account,-1);MI.College.hideCont(this.parentNode);MI.Bos(\'btnCollegeCloseStep\');return false"></a><h2></h2><ul class="giftWrap"><li><h3 class="g2">纪念版皮肤</h3><p>精美纪念版皮肤<br />新星主播专享！</p></li><li><h3 class="g3">手机达人勋章</h3><p>点亮你的手机勋章<br />多种方式玩微博！</p></li><li><h3 class="g4">醒目位置推荐</h3><p>将你推荐到找人页面让更多人关注你！</p></li></ul><div class="HSR rstepWrap"><div class="top"><span class="left"></span><span class="right"></span></div><div class="cntBox"><h3>需要完成的几件事</h3><ol class="clear"><li><h4><b>1</b>有头有脸</h4><p>上传头像，做有头有脸的主播，让听众们对你有良好的第一印象！</p><a href="' + step[0] + '"><em></em>现在去完成&gt;&gt;<span class="bg"></span></a></li><li><h4><b>2</b>全面印象</h4><p>为自己打上标签，让大家对你认识更全面！标签需大于等于1个。</p><a href="' + step[1] + '"><em></em>现在去完成&gt;&gt;<span class="bg"></span></a></li><li><h4><b>3</b>初试啼声</h4><p>发送你的第一条广播，不管是生活奇遇，还是现在心情，看有没有听众来响应！</p><a href="' + step[2] + '"><em></em>现在去完成&gt;&gt;<span class="bg"></span></a></li><li><h4><b>4</b>手机达人</h4><p>用wap、短/彩信、客户端等任意无线方式发广播，即可点亮手机达人勋章！</p><a href="' + step[3] + '"><em></em>现在去完成&gt;&gt;<span class="bg"></span></a></li><li><h4 class="last"><b>5</b>领取礼包</h4><p>领取礼包，晋升新星主播，更有想不到的小惊喜等你发现！</p><a href="#" onclick="MI.College._finish.onclick();return false"><em></em>现在去完成&gt;&gt;<span class="bg"></span></a></li></ol></div><div class="bot"><span class="left"></span><span class="right"></span></div></div>';
		Self._steps = $$(Self._body,'.beginSteps .lstepWrap li');
		Self._stepsBig = $$(Self._body,'.beginnerCon .rstepWrap li');
		if (finished) {
			UI.addClass(Self._btn,'doneSteps');
		}

		Self._close.onclick = function(){ //关闭
			if (confirm('确定关闭广播学院？\r\n\r\n关闭广播学院后你还可以在 设置→其他设置 中重新打开。')) {
				UI.hide(Self._body);
				UI.ajax({url:'/asyn/userAttrSave.php',data:{t:20,v:1},success:function(){}});
				MI.Bos('btnCollegeClose',UI.hasClass(Self._btn.parentNode.parentNode,'showSteps') ? 0 : 1);
				Self.hideBg();
			}
			return false;
		}
		Self._btn.onclick = function(){ //展开领取步骤
			var T = this,
				P = this.parentNode.parentNode,
				height;
			if (!UI.hasClass(P,'showSteps') || Self.showStep) {
				if (!finished || Self.showStep) {
					if (!T.sending) {
						UI.get('/asyn/college.php','r=' + MI.random(),function(data){
							//data = '{result:0,msg:"",info:{step:[1,1,1,1],user:{name:"xhlv",nick:"xhlv",time:"2分钟"}}}';
							data = MI.json(data);
							if (data.result == 0) {
								//Status
								data.info.finished = 1;
								var lastLink = Self._stepsBig[4].lastChild;
								UI.each(data.info.step,function(o,i){
									var className = '',link;
									if (o) {
										className = 'done';
										link = Self._stepsBig[i].lastChild;
										link.innerHTML = '<em></em>已完成';
										link.onclick = function(){
											return false;
										}
									}
									else {
										data.info.finished = 0;
										UI.hide(lastLink);
									}
									if (i == Self.cur - 1) {
										className += ' cur';
										Self._steps[i].firstChild.onclick = function(){
											return false;
										}
									}
									UI.addClass(Self._steps[i],className);
									UI.addClass(Self._stepsBig[i],className);
								});
								if (finished) {
									UI.hide(lastLink);
								}
								Self._finish.finished = data.info.finished;

								//Scroll Text
								var user = data.info.user;
								if (user) {
									var text = user.nick + ' ' + user.time + '前晋升为新星主播';
									Self._scrollTxt.innerHTML = '<a href="/' + user.name + '" title="' + text + '" style="display:inline-block;margin-left:60px">' + text + '</a>';
									Self._scrollTxtCont = Self._scrollTxt.firstChild;
									Self._scrollTxtCont.onmouseover = function(){
										Self.scrollStop = 1;
									}
									Self._scrollTxtCont.onmouseout = function(){
										Self.scrollStop = 0;
									}
								}
								else {
									UI.hide(Self._scrollTxt);
								}

								var tips_collegeStep = MI.S('tips_collegeStep_' + MI.user.account);
								Self.data = data;
								UI.addClass(P,'showSteps');
								UI.C(P,'height','auto');
								height = UI.height(P);
								UI.C(P,'height',tips_collegeStep == 1 ? height : '');
								UI.animate(P,'height',height,function(){
									if ((tips_collegeStep != 1 && MI.S('tips_college_' + MI.user.account) != -1) || Self.showStep) {
										Self.showCont(Self._cont);
										Self.showStep = 0;
									}
								});
								MI.S('tips_collegeStep_' + MI.user.account,1)
							}
							T.sending = 0;
						});
						T.sending = 1;
					}
					if (finished) {
						Self._finish.innerHTML = '<em></em>我的礼包';
						Self._finish.parentNode.className = 'done';
					}
				}
				else {
					Self._finish.onclick();
				}
			}
			T.blur();
			return false;
		}
		Self._finish.onclick = function(){ //领取礼包
			var T = this,
				successNotDisplay = Self._success.style.display == 'none';
			if ((successNotDisplay && Self._finish.finished) || finished) {
				if (Self._success.innerHTML != '') {
					if (successNotDisplay) {
						show();
					}
				}
				else if (!T.sending) {
					UI.get('/asyn/collegePodium.php','r=' + MI.random(),function(data){
						//data = '{result:0,msg:"",info:'<script>window["collegeFollow"]=function(){MI.College.follow()};window["collegeTalk"]=function(pic){MI.College.talk(pic)};window["GetGroupData"]=function(){return new Array({account:"123",nick:"ghj",picUrl:"http://college.t.qq.com/head_50.jpg"},{account:"123",nick:"ghj",picUrl:"http://college.t.qq.com/head_50.jpg"},{account:"123",nick:"gdsahj",picUrl:"http://college.t.qq.com/head_50.jpg"},{account:"123",nick:"ghdsaj",picUrl:"http://college.t.qq.com/head_50.jpg"},{account:"123",nick:"ghjiii",picUrl:"http://college.t.qq.com/head_50.jpg"},{account:"123",nick:"ghj",picUrl:"http://college.t.qq.com/head_50.jpg"},{account:"123",nick:"gdsahj",picUrl:"http://college.t.qq.com/head_50.jpg"},{account:"123",nick:"ghdsaj",picUrl:"http://college.t.qq.com/head_50.jpg"});};function postGroupPhoto(value){alert(value);}</script><a href="#" class="close" onclick="MI.College.hideCont(this.parentNode);MI.Bos(\'btnCollegeCloseGifts\');return false"></a><div class="bg"></div><div class="gifts"><h2>你已获得以下特权，可立刻使用：</h2><ul class="giftBox clear"><li><h3 class="g2">纪念版皮肤</h3><p><a href="/t684000002?setTheme=1">已获得两套纪念版皮肤&gt;&gt;<b></b></a></p></li><li><h3 class="g3">手机达人勋章</h3><p><a href="/">展示勋章在你的页面右侧&gt;&gt;<b></b></a></p></li><li><h3 class="g4">醒目位置推荐</h3><p><a href="/people?show=xxzb">将你推荐在找人页面内&gt;&gt;<b></b></a></p></li></ul></div><div class="photoWrap"><p class="photoTxt">恭喜你晋升新星主播！看看腾讯薇薇替你拍的纪念照吧，原来还有7位和你一样的新星主播刚刚得到晋升。能在同一张纪念照中合影，是不是很有缘份呢？</p><div><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="GroupPhoto" width="740" height="330" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"><param name="movie" value="http://mat1.gtimg.com/www/mb/swf/GroupPhoto_v1.swf" /><param name="wmode" value="" /><param name="quality" value="high" /><param name="allowScriptAccess" value="always" /><embed src="http://mat1.gtimg.com/www/mb/swf/GroupPhoto_v1.swf" quality="high" width="740" height="330" wmode="transparent" name="GroupPhoto" align="middle" play="true" loop="false" quality="high" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed></object></div></div>'}';
						var js = data;
						//data = data.replace(/GroupPhoto.swf/g,'GroupPhoto_.swf');
						data = MI.json(data);
						if (data.result == 0) {
							UI.evalScript(js);
							Self._success.innerHTML = data.info;// + '<div style="background:#FFF;height:20px;left:490px;position:absolute;top:850px;width:100px;"></div>';
							show();
						}
						T.sending = 0;
					});
					T.sending = 1;
				}
			}
			else if (Self._cont.style.display == 'none' && !Self._finish.finished) {
				Self.showCont(Self._cont);
				MI.Bos('btnCollegeStep_5',0);
			}
			function show(){
				if (MI.dialog._bg.style.display == 'none') {
					Self.showBg();
				}
				UI.hide(Self._cont);
				Self.showCont(Self._success);
				MI.Bos('btnCollegeStep_5',1);
			}
			T.blur();
			return false;
		}
		Self._openCont.onclick = function(){
			if (Self._cont.style.display == 'none') {
				Self.showStep = 1;
				UI.hide(Self._success);
				Self._btn.onclick();
			}
			return false;
		}
		function dom(className){
			return $$(Self._body,className)[0];
		}

		//Position Event
		Self.position();
		var delay;
		UI.EA(window,'resize',function(){
			clearTimeout(delay);
			delay = setTimeout(function(){
				Self.position();
			},100);
		});

		//Auto Open
		setTimeout(function(){
			if (MI.S('tips_collegeStep_' + MI.user.account) == 1 && !finished) {//!UI.hasClass(Self._btn,'finished') && 
				Self._btn.onclick();
			}
		},0);

		//Current Step
		var pathName = document.location.href;
		UI.each(Self.step,function(o,i){
			if (!Self.cur && pathName.hasString(o)) {
				Self.cur = i + 1;
			}
		});

		//Scroll Text
		setInterval(function(){
			if (!Self.scrollStop) {
				var cont = Self._scrollTxtCont,
					left,
					width;
				if (cont) {
					left = parseInt(UI.C(cont,'marginLeft') || 0);
					width = UI.width(cont);
					if (left < -width) {
						left = UI.width(Self._scrollTxt); 
					}
					cont.style.marginLeft = left - Self.scrollStep + 'px';
				}
			}
		},Self.scrollSpeed);
	},
	clear : function(){
		MI.S('tips_college_' + MI.user.account,'');
		MI.S('tips_collegeStep_' + MI.user.account,'');
	},
	showStep : 0,
	cur : null, //Current Step
	step : ['/setting_face.php','/setting_tag.php','/college_talk.php','/client.php?t=mobile'],
	scrollStep : 1,
	scrollStop : 0,
	scrollSpeed : 50,
	position : function(){
		var headWrap = $('headWrap');
		if (headWrap) {
			if (!this.width) {
				this.width = UI.width(this._body) - (UI.B.ie ? 0 : 4);
			}
			this._body.style.cssText += ';left:' + (UI.getX(headWrap) - this.width) + 'px;top:' + UI.height(headWrap) + 'px';
		}
	},
	showCont : function(cont){
		this.showBg();
		//UI.C(cont,'opacity',0);
		UI.show(cont);
		/*UI.animate(cont,'opacity',1,function(){
			UI.show('GroupPhoto'); //显示合影Flash，在IE中Flash无法透明度渐变
		});*/
		MI.dialog.resizeBg();
	},
	hideCont : function(target){
		//UI.animate(target,'opacity',0,function(){
			this.hideBg();
			UI.hide(target);
		//});
	},
	showBg : function(){
		UI.C(this._body,'zIndex','9999');
		UI.append(MI.dialog._body,document.body);
		UI.show(MI.dialog._bg);
		UI.show(MI.dialog._body);
		MI.dialog.display = 1;
	},
	hideBg : function(){
		UI.hide(MI.dialog._bg);
		UI.hide(MI.dialog._body);
		MI.dialog.display = 0;
		UI.C(this._body,'zIndex','99');
	},
	follow : function(){
		var Self = this;
		if (window.GetGroupData) {
			var users = GetGroupData(),
				account = [];
			UI.each(users,function(o){
				account.push(o.account);
			});
			if (account.length) {
				MI.follow(account.join(','),Self._follow,function(){
					Self._follow.className = 'addAttention';
					UI.hide(Self._success);
					Self.hideBg();
					UI.show(MI.dialog._bg);
					MI.tip('收听成功');
				});
				MI.Bos('btnCollegeFollow');
			}
		}
	},
	talkTxt : '我刚刚晋升了#新星主播#！看看我和其他新晋主播的纪念照吧，是不是很有意思？希望认识更多有趣的朋友！',
	talk : function(pic){
		var Self = this;
		if (!Self.talk.sending) {
			UI.ajax({
				url : '/publish.php',
				data : {
					pic : pic,
					content : Self.talkTxt,
					countType : '',
					viewModel : 0
				},
				success : function(){
					UI.hide(Self._success);
					Self.hideBg();
					UI.show(MI.dialog._bg);
					MI.tip('合影成功！',function(){
						document.location.href = '/' + MI.user.account;
					});
				}
			});
			MI.Bos('btnCollegeTalk');
		}
		Self.talk.sending = 1;
	}
}