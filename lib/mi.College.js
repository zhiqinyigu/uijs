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
			step = Self.step;
		Self._body = UI.html('<div class="beginnerWrap clear"></div>')[0];
		Self._body.innerHTML = '<div class="beginnerPad"><div class="hd"><a href="#" class="close" title="关闭"></a></div><div class="con"><div class="be_cWrap"><div class="be_qaList">&#183;<a href="/college/talk.php">我能广播什么</a><br />&#183;<a href="/college/yulu.php">每日经典语录</a><br />&#183;<a href="/college/jiqiao.php">微博生存技巧</a></div><div class="beginSteps"><h3><a href="#" class="openSteps"></a></h3><div class="lstepWrap"><ul class="clear"><li><a href="' + step[0] + '"><em></em>有头有脸</a><em class="arrow"></em></li><li><a href="' + step[1] + '"><em></em>全面印象</a><em class="arrow"></em></li><li><a href="' + step[2] + '"><em></em>初始啼声</a><em class="arrow"></em></li><li><a href="' + step[3] + '"><em></em>新鲜达人</a><em class="arrow"></em></li><li class="finish"><a href="#">领取礼包</a></li></ul><div class="scrollTxt"></div></div></div></div></div><div class="ft"></div></div><div class="beginnerCon" style="display:none"></div><div class="beginnerSuc" style="display:none"></div></div>';
		UI.css('.beginnerWrap{position:absolute;z-index:99;top:78px;left:102px;padding-left:102px}.beginnerPad,.beginnerPad .ft{width:102px;overflow:hidden;background:url(http://mat1.gtimg.com/www/mb/images/beginnerBg1.png) no-repeat;_background:none;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=crop,src="http://mat1.gtimg.com/www/mb/images/beginnerBg1.png")}.beginnerPad{position:absolute;top:-10px;left:0}.beginnerPad .hd,.openSteps,.showSteps h3,.lstepWrap li a,.lstepWrap em,.rstepWrap .top span,.rstepWrap .bot span,.beginnerCon h2,.rstepWrap h4,.rstepWrap .cntBox,.rstepWrap a,.rstepWrap em{background:url(http://mat1.gtimg.com/www/mb/images/beginnerBg2.png) no-repeat}.openSteps{position:absolute;display:block;width:93px;height:55px;background-position:-196px 0}.beginnerPad .hd{width:21px;height:60px;padding:19px 0 0 74px;margin-left:4px;border-bottom:1px solid #98D6ED}.beginnerPad .con{width:99px;margin-left:2px;background:#fff;border-top:1px solid #fff}.beginnerPad .be_cWrap{width:95px;margin:0 auto;background:#DEEEF8}.beginnerPad .be_qaList{padding:10px 4px;color:#2094C3;font-family:"Simsun";line-height:21px}.beginnerPad .be_qaList a{color:#2094C3}.beginnerPad .ft{height:10px;_margin-left:-102px;_padding-left:102px;background-position:-102px 0}.beginnerPad .close{float:none;margin:0;text-indent:0}.beginSteps{width:93px;height:48px;margin:0 auto;overflow:hidden}.showSteps h3{height:55px;background-position:-98px 0}.showSteps .openSteps,.lstepWrap{display:none}.showSteps .lstepWrap{display:block}.lstepWrap{width:85px;padding:0 3px;border:1px solid #B2D6E4;border-width:0 1px;background:#fff}.lstepWrap li{float:left;width:100%}.lstepWrap li a{display:block;width:100%;padding-top:1px;line-height:25px;color:#B0560C;background-position:-95px -83px}.lstepWrap .cur a,.lstepWrap .finish a{font-weight:bold;text-align:center;background-position:0 -83px}.lstepWrap .cur a:hover,.rstepWrap .done a:hover{text-decoration:none;cursor:default}.lstepWrap .finish a{color:#fff;background-position:-226px -212px}.lstepWrap em,.rstepWrap em{display:inline-block;float:left;width:14px;height:13px;margin:6px 4px 0 7px;_margin-right:1px;background-position:-321px 0}.lstepWrap em.arrow{display:block;clear:both;float:none;width:20px;margin:2px auto;background-position:-369px 0}.lstepWrap .done a em,.rstepWrap .done em{background-position:-345px 0}.lstepWrap .cur a em,.lstepWrap .finish em{display:none}.scrollTxt{width:81px;overflow:hidden;margin:8px auto 0;line-height:1.231;white-space:nowrap;color:#DC8F50}.scrollTxt a{color:#DC8F50}.beginnerCon{position:relative;width:800px;height:557px;padding-top:40px;background:url(http://mat1.gtimg.com/www/mb/images/beginnerBg3.png) no-repeat}.beginnerCon h2{width:402px;height:30px;margin:0 0 23px 40px;background-position:0 -179px}.giftWrap{width:704px;margin-left:105px;overflow:hidden;*zoom:1}.giftWrap li{float:left;width:124px;margin-right:110px}.giftWrap h3{width:124px;height:29px;padding-top:101px;overflow:hidden;font:normal 16px/29px "MicroSoft YaHei","SimHei";color:#EE7800;text-align:center;background-image:url(http://mat1.gtimg.com/www/mb/images/beginnerBg4a.jpg);background-repeat:no-repeat}.giftWrap p{padding:0 8px;text-align:center}.g2{background-position:-129px 0}.g3{background-position:-258px 0}.g4{background-position:-387px 0}.rstepWrap .top{border-color:#F9E197;background-color:#FFFDF2}.rstepWrap .bot,.rstepWrap .cntBox{border-color:#F9E197;background-color:#FEFBDE}.rstepWrap .top .left{background-position:-299px -15px}.rstepWrap .top .right{background-position:-315px -15px}.rstepWrap .bot .left{background-position:-299px -31px}.rstepWrap .bot .right{background-position:-315px -31px}.rstepWrap{width:766px;margin:20px auto 0}.rstepWrap h3{padding:0 0 12px 10px;font:normal 18px/29px "MicroSoft YaHei","SimHei"}.rstepWrap .cntBox{padding:10px 20px 10px 24px;background-position:0 -240px;background-repeat:repeat-x}.rstepWrap li{float:left;width:144px;height:176px}.rstepWrap h4{width:140px;height:50px;overflow:hidden;zoom:1;line-height:51px;font-size:14px;font-weight:bold;background-position:0 -113px}.rstepWrap h4.last{background-position:-160px -113px}.rstepWrap h4 b{float:left;display:block;width:44px;margin-right:9px;_margin-right:6px;font:bold 26px/48px Arial, Helvetica;color:#F98C05;text-align:center}.rstepWrap p{height:105px;padding:0 28px 0 24px}.rstepWrap a{display:block;zoom:1;width:116px;height:19px;margin-top:-155px;padding:157px 0 0 24px;font-family:"Simsun";color:#DC8F50;background-position:-390px 0}.rstepWrap .done a,.rstepWrap .done .bg{color:#5C9B16;cursor:default}.rstepWrap em{margin-top:3px;*margin-top:4px;_margin-top:3px;margin-left:0}.rstepWrap .bg{display:block;position:relative;width:144px;height:176px;margin:-176px 0 0 -24px;background:#fff;filter:alpha(opacity:0);opacity:0;cursor:pointer}.beginnerSuc{position:relative;width:800px;height:948px;padding-top:4px;background:url(http://mat1.gtimg.com/www/mb/images/beginnerBg5.png) no-repeat}.beginnerSuc .bg{width:792px;height:305px;margin:0 auto;background:url(http://mat1.gtimg.com/www/mb/images/beginnerBg6.jpg) no-repeat}.gifts{width:754px;height:218px;margin:0 auto;background:url(http://mat1.gtimg.com/www/mb/images/beginnerBg7a.jpg) no-repeat}.gifts h2{height:55px;padding-left:32px;font:normal 20px/49px "MicroSoft YaHei","SimHei";color:#E9C055;background:none}.giftBox{width:735px;margin-left:13px}.giftBox li{float:left;width:125px;padding:0 59px;margin-right:2px;text-align:center}.giftBox h3{width:125px;height:30px;padding-top:61px;overflow:hidden;font:normal 16px/29px "MicroSoft YaHei","SimHei";background-image:url(http://mat1.gtimg.com/www/mb/images/beginnerBg4a.jpg);background-repeat:no-repeat}.giftBox .g1{background-position:0 -135px}.giftBox .g2{background-position:-129px -135px}.giftBox .g3{background-position:-258px -135px}.giftBox .g4{background-position:-387px -135px}.giftBox a{font-family:"Simsun";color:#B0560C}.photoWrap{position:relative;top:-22px;width:740px;height:396px;margin:0 auto}.photoTxt{position:absolute;z-index:1;left:19px;top:97px;width:702px;text-indent:2em}.beginnerCon .close,.beginnerSuc .close{float:none;position:absolute;top:15px;right:15px;margin:0}');
		UI.append(Self._body,document.body);

		Self._close = dom('.close');
		Self._btn = dom('.openSteps');
		Self._cont = dom('.beginnerCon');
		Self._success = dom('.beginnerSuc');
		Self._finish = dom('.finish a');
		Self._scrollTxt = dom('.scrollTxt');
		Self._follow = UI.html('<input type="button" class="addAttention">')[0];
		Self._cont.innerHTML = '<a href="#" class="close" title="关闭" onclick="MI.S(\'tips_college_\'+MI.user.account,-1);MI.College.hideCont(this.parentNode);return false"></a><h2></h2><ul class="giftWrap"><li><h3 class="g2">纪念版皮肤</h3><p>精美纪念版皮肤<br />优质主播专享！</p></li><li><h3 class="g3">手机达人勋章</h3><p>点亮你的手机勋章<br />多种方式玩微博！</p></li><li><h3 class="g4">醒目位置推荐</h3><p>将你推荐到找人页面让更多人关注你！</p></li></ul><div class="HSR rstepWrap"><div class="top"><span class="left"></span><span class="right"></span></div><div class="cntBox"><h3>需要完成的几件事</h3><ol class="clear"><li class="done"><h4><b>1</b>有头有脸</h4><p>上传头像，做有头有脸的主播，让听众们对你有良好的第一印象！</p><a href="' + step[0] + '"><em></em>现在去完成&gt;&gt;<span class="bg"></span></a></li><li><h4><b>2</b>全面印象</h4><p>尽量详细填写你的个人资料、教育和工作情况，让听众对你印象更全面！</p><a href="' + step[1] + '"><em></em>现在去完成&gt;&gt;<span class="bg"></span></a></li><li><h4><b>3</b>初试啼声</h4><p>发送你的第一条广播，不管是生活奇遇，还是现在心情，看有没有听众来响应！</p><a href="' + step[2] + '"><em></em>现在去完成&gt;&gt;<span class="bg"></span></a></li><li><h4><b>4</b>新鲜达人</h4><p>用wap、短/彩信、客户端等任意无线方式发广播，即可点亮手机达人勋章！</p><a href="' + step[3] + '"><em></em>现在去完成&gt;&gt;<span class="bg"></span></a></li><li><h4 class="last"><b>5</b>领取礼包</h4><p>领取礼包，晋升优质主播，更有想不到的小惊喜等你发现！</p><a href="#" onclick="MI.College._finish.onclick();return false"><em></em>现在去完成&gt;&gt;<span class="bg"></span></a></li></ol></div><div class="bot"><span class="left"></span><span class="right"></span></div></div>';
		Self._steps = $$(Self._body,'.beginSteps .lstepWrap li');
		Self._stepsBig = $$(Self._body,'.beginnerCon .rstepWrap li');

		Self._close.onclick = function(){ //关闭
			if (confirm('确定关闭广播学院？\r\n\r\n关闭广播学院后你还可以在其他设置里重新打开。')) {
				UI.hide(Self._body);
				UI.ajax({url:'/asyn/userAttrSave.php',data:{t:17,v:1},success:function(){}})
				Self.hideBg();
			}
			return false;
		}
		Self._btn.onclick = function(){ //展开领取步骤
			var T = this,
				P = this.parentNode.parentNode,
				height,
				finished = UI.hasClass(this,'finished');
			if (!UI.hasClass(P,'showSteps')) {
				//if (!finished) {
					if (!T.sending) {
						UI.get('/asyn/college.php','r=' + MI.random(),function(data){
							//data = '{result:0,msg:"",info:{step:[1,1,0,1],user:{name:"xhlv",nick:"xhlv",time:"2分钟"}}}';
							data = MI.json(data);
							if (data.result == 0) {
								//Status
								data.info.finished = 1;
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
										UI.hide(Self._stepsBig[4].lastChild);
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
								Self._finish.finished = data.info.finished;

								//Scroll Text
								var user = data.info.user;
								if (user) {
									var text = user.nick + ' ' + user.time + '前晋升为优质主播';
									Self._scrollTxt.innerHTML = '<a href="/' + user.name + '" title="' + text + '" style="display:inline-block;margin-left:60px">' + text + '</a>';
									Self._scrollTxtCont = Self._scrollTxt.firstChild;
									Self._scrollTxtCont.onmouseover = function(){
										Self.scrollStop = 1;
									}
									Self._scrollTxtCont.onmouseout = function(){
										Self.scrollStop = 0;
									}
								}

								Self.data = data;
								UI.addClass(P,'showSteps');
								UI.C(P,'height','auto');
								height = UI.height(P);
								UI.C(P,'height','');
								UI.animate(P,'height',height,function(){
									if (MI.S('tips_college_' + MI.user.account) != -1) {
										Self.showCont(Self._cont);
									}
								});
							}
							T.sending = 0;
						});
						MI.S('tips_collegeStep_' + MI.user.account,1)
						T.sending = 1;
					}
					if (finished) {
						Self._finish.innerHTML = '<em></em>我的礼包';
						Self._finish.parentNode.className = 'done';
					}
				//}
				//else {
				//	Self._finish.onclick();
				//}
			}
			T.blur();
			return false;
		}
		Self._finish.onclick = function(){ //领取礼包
			var T = this,
				successNotDisplay = Self._success.style.display == 'none';
			if ((successNotDisplay && Self._finish.finished) || UI.hasClass(Self._btn,'finished')) {
				if (Self._success.innerHTML != '') {
					if (successNotDisplay) {
						show();
					}
				}
				else if (!T.sending) {
					UI.get('/asyn/collegePodium.php','r=' + MI.random(),function(data){
						//data = '{result:0,msg:"",info:\'<script>window["collegeFollow"]=function(){MI.College.follow()};window["collegeTalk"]=function(pic){MI.College.talk(pic)};window["GetGroupData"]=function(){return new Array({account:"123",nick:"ghj",picUrl:"http://college.t.qq.com/head_50.jpg"},{account:"123",nick:"ghj",picUrl:"http://college.t.qq.com/head_50.jpg"},{account:"123",nick:"gdsahj",picUrl:"http://college.t.qq.com/head_50.jpg"},{account:"123",nick:"ghdsaj",picUrl:"http://college.t.qq.com/head_50.jpg"},{account:"123",nick:"ghjiii",picUrl:"http://college.t.qq.com/head_50.jpg"},{account:"123",nick:"ghj",picUrl:"http://college.t.qq.com/head_50.jpg"},{account:"123",nick:"gdsahj",picUrl:"http://college.t.qq.com/head_50.jpg"},{account:"123",nick:"ghdsaj",picUrl:"http://college.t.qq.com/head_50.jpg"});};function postGroupPhoto(value){alert(value);}</script><a href="#" class="close" onclick="MI.College.hideCont(this.parentNode);return false"></a><div class="bg"></div><div class="gifts"><h2>你已获得以下特权，可立刻使用：</h2><ul class="giftBox clear"><li><h3 class="g1">发图权限</h3><p><a href="/">去看看&gt;&gt;</a></p></li><li><h3 class="g2">换肤权限</h3><p><a href="/setting_theme.php">去看看&gt;&gt;</a></p></li><li><h3 class="g3">手机达人勋章</h3><p><a href="/">去看看&gt;&gt;</a></p></li><li><h3 class="g4">醒目位置推荐</h3><p><a href="/people">去看看&gt;&gt;</a></p></li></ul></div><div class="photoWrap"><p class="photoTxt">恭喜你晋升优质主播！看看腾讯薇薇替你拍的纪念照吧，原来还有9位和你一样的优质主播刚刚得到晋升。能在同一张纪念照中合影，是不是很有缘份呢？</p><div><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="GroupPhoto" width="740" height="396" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"><param name="movie" value="/GroupPhoto.swf" /><param name="wmode" value="transparent" /><param name="quality" value="high" /><param name="allowScriptAccess" value="always" /><embed src="/GroupPhoto.swf" quality="high" width="740" height="396" wmode="transparent" name="GroupPhoto" align="middle" play="true" loop="false" quality="high" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed></object></div></div>\'}';
						var js = data;
						data = MI.json(data);
						if (data.result == 0) {
							UI.evalScript(js);
							Self._success.innerHTML = data.info;
							show();
						}
						T.sending = 0;
					});
					T.sending = 1;
				}
			}
			else if (Self._cont.style.display == 'none' && !Self._finish.finished) {
				Self.showCont(Self._cont);
			}
			function show(){
				if (MI.dialog._bg.style.display == 'none') {
					Self.showBg();
				}
				UI.hide(Self._cont);
				Self.showCont(Self._success);
			}
			T.blur();
			return false;
		}
		function dom(className){
			return $$(Self._body,className)[0];
		}

		//Position Event
		Self.position();
		UI.EA(window,'resize',Self.position);

		//Auto Open
		setTimeout(function(){
			if (MI.S('tips_collegeStep_' + MI.user.account) == 1) {//!UI.hasClass(Self._btn,'finished') && 
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
	cur : null, //Current Step
	step : ['/setting/face','/setting','/' + MI.user.account + '/mine','/client.php?t=mobile'],
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
		if (window.GetGroupData) {
			var users = GetGroupData(),
				account = [];
			UI.each(users,function(o){
				account.push(o.account);
			});
			if (account.length) {
				MI.follow(account.join(','),this._follow,function(){
					MI.tip('收听成功');
				});
			}
		}
	},
	talkTxt : '我刚刚晋升了#优质主播#！看看我和其他新晋主播的纪念照吧，是不是很有意思？希望认识更多有趣的朋友！',
	talk : function(pic){
		if (!this.talk.sending) {
			UI.ajax({
				url : '/publish.php',
				data : {
					pic : pic,
					content : this.talkTxt,
					countType : '',
					viewModel : 0
				},
				success : function(){
					
				}
			});
		}
		this.talk.sending = 1;
	}
}