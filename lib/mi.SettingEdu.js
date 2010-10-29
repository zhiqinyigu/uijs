MI.SettingEdu = {
	xhr : null,
	schoolKeyBoxUrl : '/asyn/edu_oper.php?op=6&type=',
	departmentKeyBoxUrl : '/asyn/edu_oper.php?op=10&type=',
	schoolListValue : {},
	departmentValue : {},
	setFormTitle : ['','修改教育信息'],
	build : function(){
		var Self = this;
		//Form Dom
		Self._setForm = $('setForm');
		Self._schoolType = $('schooltype');
		Self._citySelect = UI.html('<div class="selfunBox"><span class="selName">学校所在地:</span><select name="nation" id="nation"><option value="">国家/地区</option></select><b></b><select name="province" id="province"><option value="">省份</option></select><b></b><select name="city" id="city"><option value="">城市</option></select></div>')[0];
		Self._schoolList = UI.html('<div class="selScholl"><div class="selTab clear"><a href="#" class="all cur">全部</a><a href="#">A</a><a href="#">B</a><a href="#">C</a><a href="#">D</a><a href="#">E</a><a href="#">F</a><a href="#">G</a><a href="#">H</a><a href="#">I</a><a href="#">J</a><a href="#">K</a><a href="#">L</a><a href="#">M</a><a href="#">N</a><a href="#">O</a><a href="#">P</a><a href="#">Q</a><a href="#">R</a><a href="#">S</a><a href="#">T</a><a href="#">U</a><a href="#">V</a><a href="#">W</a><a href="#">X</a><a href="#">Y</a><a href="#">Z</a></div><div class="tmask"></div><div class="selListWrap"></div><div class="noScholl" style="display:none">暂时没有符合条件的学校</div><div class="bmask"></div><div class="noSchollTip"><em class="ico_help"></em>没有自己的学校？可发条广播到#教育信息申请#话题申请添加自己的学校。<a href="#" onclick="MI.SettingEdu.applySchoolDisplay();return false">去申请添加<span class="ffsong">&gt;&gt;</span></a></div></div>')[0];
		Self._schoolListWrap = $$(Self._schoolList,'.selListWrap')[0];
		Self._schoolListTip = $$(Self._schoolList,'.noScholl')[0];
		UI.prepend(Self._citySelect,Self._schoolList);
		Self._departmentList = UI.html('<div class="selDpmt"><div class="tmask"></div><div class="selDpmt"><div class="selListWrap"></div></div><div class="noScholl" style="display:none">暂时没有符合条件的院系</div><div class="bmask"></div><div class="noSchollTip"><em class="ico_help"></em>没有自己的院系？可发条广播到#教育信息申请#话题申请添加自己的院系。<a href="#" onclick="MI.SettingEdu.applySchoolDisplay();return false">去申请添加<span class="ffsong">&gt;&gt;</span></a></div></div>')[0];
		Self._departmentListWrap = $$(Self._departmentList,'.selListWrap')[0];
		Self._departmentListTip = $$(Self._departmentList,'.noScholl')[0];
		Self._cancelBtn = $$(Self._setForm,'.cancelBtn')[0];
		Self._setFormTitle = $$(Self._setForm,'.title h3')[0];
		Self.setFormTitle[0] = Self._setFormTitle.innerHTML;

		//List Dom
		Self._emptyListTip = $$('.set_noInfo')[0];
		Self._shoolListWrap = $('shoolListWrap');

		//Apply Dom
		Self._applySchool = UI.html('<div class="applyScholl"><p class="cNote">你可以申请添加学校或院系，申请通过后，相关信息将出现在对应的选择列表内，添加后通过这些信息可以方便的找到更多的同学。</p><p>你发出的申请会以广播的形式发到<a href="http://t.qq.com/k/%E6%95%99%E8%82%B2%E4%BF%A1%E6%81%AF%E7%94%B3%E8%AF%B7" target="_blank">#教育信息申请#</a>话题中。</p><form onsubmit="MI.SettingEdu.applySchool();return false"><table border="0" cellspacing="0" cellpadding="0">\
		<tbody><tr>\
		<th>学历：</th><td><select id="applySchoolType"><option value="6">博士</option><option value="5">硕士</option><option value="4" selected>大学</option><option value="3">高中</option><option value="2">初中</option><option value="1">小学</option></select></td></tr>\
		<tr><th><span>*</span>学校所在地：</th><td class="applyCity"><select name="applyNation" id="applyNation"><option value="">国家/地区</option></select><b></b><select name="applyProvince" id="applyProvince"><option value="">省份</option></select><b></b><select name="applyCity" id="applyCity"><option value="">城市</option></select></td></tr>\
		<tr><th><span>*</span>学校名称：</th><td><input type="text" class="inputTxt" id="applySchoolName"> <span class="error" id="applySchoolNameTip" style="display:none">这里一定要填</span></td></tr>\
		<tr><th>院系名称：</th><td><input type="text" class="inputTxt" id="applyDepartmentName"></td></tr>\
		<tr><th></th><td><button type="submit" class="btn2">申请添加</button> <span class="error" id="applySubmitTip" style="display:none">申请已提交，请不要连续发布重复内容</span></td></tr>\
		</tbody></table></form>\
		<div class="talkWrap" style="height:0;overflow:hidden"><div class="cont"><textarea class="inputTxt">x</textarea></div><div class="bot"><input type="button" class="inputBtn sendBtn"><span class="countTxt">还能输入<em>140</em>字</span></div></div>\
		</div>')[0];

		//Smart Box
		Self.schoolKeyBox = new MI.SmartBox('s',function(){
			$('s').focus();$('s').blur();
		},'',{left:-1,top:UI.B.ie?1:1,width:202});
		Self.departmentKeyBox = new MI.SmartBox('d',function(){
			$('d').focus();$('d').blur();
		},'',{left:-1,top:UI.B.ie?1:1,width:202});
		setSmartBoxUrl();
		UI.EA($('d'),'focus',function(){
			setSmartBoxUrl();
		});
		function setSmartBoxUrl(){
			Self.schoolKeyBox.url = Self.schoolKeyBoxUrl + Self._schoolType.value + '&';
			Self.departmentKeyBox.url = Self.departmentKeyBoxUrl + Self._schoolType.value + '&s=' + encodeURIComponent($('s').value) + '&';
		}

		MI.app({
			Validate : function(){ //Validate
				Self.setForm = new MI.Validate({
					id : 'setForm',
					inputs : {
						op : {noIco : true},
						schooltype : {noIco : true},
						id : {noIco : true},
						y : {
							rule : function(str){
								str = UI.trim(str);
								var length = str.length,w=str.split('');
								if (length == 0) return '这里一定要填';
							},
							noIco : true
						},
						s : {
							rule : function(str){
								str = UI.trim(str);
								var length = MI.string.length(str),w=str.split('');
								if (length == 0) return '这里一定要填';
								if (length > 50) return '25字以内，请准确填写';
							},
							url : '/asyn/edu_oper.php?op=9&r=' + MI.random() + '&',
							noIco : true
						},
						d : {
							rule : function(str){
								str = UI.trim(str);
								var length = MI.string.length(str),w=str.split('');
								if (length > 50) return '25字以内，请准确填写';
							},
							url : function(){
								return '/asyn/edu_oper.php?op=11&s=' + encodeURIComponent($('s').value) + '&r=' + MI.random() + '&';
							},
							noIco : true
						}
					},
					messages : function(el){
						return UI.next(el);
					},
					success : function(data){
						MI.tip('保存成功！',function(){
							var type = $('op').value,
								obj = {
									y : $('y').value,
									s : $('s').value,
									d : $('d').value,
									id : data.index
								};
							if (type == 1) { //Add
								//Self.addSchool(obj);
								document.location.href = '/setting_edu.php';
							}
							else if (type == 3) { //Edit
								Self.updateSchool(obj);
							}
							Self.cancelEditSchool();
						});
					}
				});
				
			},
			City : function(){ //City
				UI.getScript(MI.version.RelateSelect,function(){
					Self.citySelect = new MI.RelateSelect({
						id : Self._citySelect,
						data : MI.city,
						tips : []
					});
					Self.citySelect.first(',');
					Self.citySelect.first('中国,1');
					Self.citySelect.second('北京,11');

					Self.applyCitySelect = new MI.RelateSelect({
						id : $$(Self._applySchool,'.applyCity')[0],
						data : MI.city,
						tips : []
					});
					Self.applyCitySelect.first(',');
					Self.applyCitySelect.first('中国,1');
					Self.applyCitySelect.second('北京,11');
				});
			},
			CityAll : null
		});
		//Apply Talk Box
		Self.applyBox = new MI.TalkBox($$(Self._applySchool,'.talkWrap')[0]);
		Self.applyBox.successStart = function(){
			MI.tip('提交申请成功！');
		}
		Self.applyBox.failStart = function(){
			UI.show('applySubmitTip');
		}

		//Event
		Self._cancelBtn.onclick = function(){
			Self.cancelEditSchool();
			return false;
		}
		Self._schoolType.onchange = function(){ //School Type
			Self.schoolKeyBox.url = Self.schoolKeyBoxUrl + this.value + '&';
			var department = $('d').parentNode.parentNode;
			if (this.value < 4) {
				UI.hide(department);
			}
			else {
				UI.show(department);
			}
			$('s').value = '';
			$('d').value = '';
			setSmartBoxUrl();
		}
		$$('.ico_school')[0].parentNode.onclick = function(){ //Open City Select
			Self.selectSchool();
			return false;
		}
		$$('.ico_dpmt')[0].parentNode.onclick = function(){ //Open Select Department
			Self.selectDepartment();
			return false;
		}
		UI.each($$(Self._citySelect,'select'),function(o){ //City Select
			UI.EA(o,'change',function(){
				if ($('nation').value != 1 && Self._schoolType.value > 3) {
					UI.hide('province');
					setTimeout(function(){
						UI.hide('province');
					},0);
				}
				else if (Self._schoolType.value < 4) {
					UI.show('province');
					setTimeout(function(){
						UI.show('province');
					},0);
				}
				if (UI.B.ie && Self.citySelectEvent) {
					Self.citySelectEvent();
				}
				setTimeout(function(){
					Self.citySelectDisplay();
					if (!UI.B.ie && Self.citySelectEvent) {
						Self.citySelectEvent();
					}
				},0);
			});
		});
		UI.each(Self.getSchoolList(),function(o){ //School List
			Self.schoolListEvent(o);
		});
		$('privSchool').onclick = function(){ //privSchool
			var checked = this.checked;
			UI.ajax({
				url : '/asyn/priv_set.php',
				data : {
					s : this.checked ? 0 : 1
				},
				success : function(){
					Self.privTip(checked);
				}
			});
		}
	},
	schoolListEvent : function(el){
		var Self = this,
			id = el.id.split('_')[1],
			_find = $$(el,'.eduFind')[0],
			_edit = $$(el,'.eduEdit')[0],
			_del = $$(el,'.eduDel')[0];
		if (_edit) {
			_edit.onclick = function(){
				Self.editSchool(el);
				return false;
			}
		}
		if (_del) {
			_del.onclick = function(){
				Self.delSchool(el);
				return false;
			}
		}
		if (_find) {
			_find.onclick = function(){
				Self.findSchool(el);
				return false;
			}
		}
	},
	privTip : function(checked){
		var tip = checked ? '所有人可见' : '所有人不可见';
		UI.each($$('.friendList .cNote'),function(o){
			o.innerHTML = tip;
		});
	},
	getSchoolList : function(){
		return $$('.friendList');
	},
	displaySchoolListTip : function(){ //Control Empty School Tip
		var Self = this;
		if (Self.getSchoolList().length) {
			UI.hide(Self._emptyListTip);
		}
		else {
			UI.show(Self._emptyListTip);
		}
	},
	selectSchool : function(){ //Select School
		var Self = this,
			_cont = MI.dialog._cont,
			citySelect = $$(Self._citySelect,'select'),
			selTab = $$(Self._schoolList,'.selTab a'),
			schoolType = Self._schoolType.value;
		if (schoolType < 4) {
			Self.citySelect.build(MI.cityAll);
			Self.citySelect.first(',');
			Self.citySelect.first('北京,1');
			Self.citySelect.second('东城,1');
		}
		else {
			Self.citySelect.build(MI.city);
			Self.citySelect.first(',');
			Self.citySelect.first('中国,1');
			Self.citySelect.second('北京,11');
		}

		MI.dialog.show({width:630,title:'<h1 class="mainTit">选择学校</h1>',html:Self._schoolList});

		//Reset
		Self.citySelectDisplay();
		Self.schoolListValue = {
			type : schoolType,
			key : Self.citySelectKey(),
			letter : $$(Self._schoolList,'.selTab a.cur')[0].innerHTML.replace(/\W/g,'')
		};

		load();

		//Event
		Self.citySelectEvent = function(){
				Self.schoolListValue.key = Self.citySelectKey();
				load();
		}
		UI.each(selTab,function(o){
			o.onclick = function(){
				if (!UI.hasClass(this,'cur')){
					UI.removeClass($$(Self._schoolList,'.selTab a.cur')[0],'cur');
					UI.addClass(this,'cur');
					Self.schoolListValue.letter = this.innerHTML.replace(/\W/g,'');
					load();
				}
				this.blur();
				return false;
			}
		});

		//Show Loading
		function showLoad(){
			MI.dialog.showLoad(_cont.parentNode,'',0,UI.width(_cont.parentNode),UI.height($$(_cont,'.selScholl')[0]));
		}
		//Load Data
		function load(){
			showLoad();
			var key = '';
			for (var i in Self.schoolListValue) {
				key += i + '=' + encodeURIComponent(Self.schoolListValue[i]) + '&';
			}
			UI.get('/asyn/schoolist.php',key,function(data){
				pageLink(data);
			});
		}
		//Link Event
		function pageLink(data){
			if (data) {
				Self._schoolListWrap.innerHTML = data;
				UI.show(Self._schoolListWrap);
				UI.hide(Self._schoolListTip);
			}
			else {
				UI.hide(Self._schoolListWrap);
				UI.show(Self._schoolListTip);
			}
			MI.dialog.hideLoad();
			UI.each($$(MI.dialog._cont,'.selList a'),function(o){
				o.onclick = function(){
					$('s').value = this.title;
					$('s').focus();
					$('s').blur();
					MI.dialog.hide();
					return false;
				}
			});
		}
	},
	applySchoolDisplay : function(){
		var Self = this;
		MI.dialog.show({
			title : '<h1 class="mainTit">申请添加学校/院系</h1>',
			width : 540,
			html : Self._applySchool
		});
		$('applySchoolName').value = '';
		$('applySchoolName').focus();
	},
	applySchool : function(){
		var Self = this,txt = '#教育信息申请# 申请添加';
		add('applySchoolType');
		add('applyNation');
		add('applyProvince');
		txt += '的';
		add('applySchoolName');
		add('applyDepartmentName');

		UI.hide('applySchoolNameTip');
		UI.hide('applySubmitTip');
		if ($('applySchoolName').value == '') {
			UI.show('applySchoolNameTip');
			return;
		}

		Self.applyBox._txt.value = txt;
		setTimeout(function(){
			Self.applyBox.send();
		},0);
		
		function add(id){
			var el = $(id),value = el.value;
			if (UI.C(el,'display') != 'none') {
				if (el.nodeName == 'SELECT') {
					value = el.childNodes[el.selectedIndex].innerHTML;
				}
				if (value) {
					txt += '【' + value + '】';
				}
			}
		}
	},
	selectDepartment : function(){ //Select Department
		var Self = this,
			_cont = MI.dialog._cont,
			schoolType = Self._schoolType.value;
		if ($('s').value == '') {
			MI.alert('请先选择学校');
		}
		else {
			MI.dialog.show({width:630,title:'<h1 class="mainTit">选择院系</h1>',html:Self._departmentList});

			//Reset
			Self.departmentValue = {
				type : schoolType,
				s : $('s').value
			};

			load();
		}

		//Show Loading
		function showLoad(){
			MI.dialog.showLoad(_cont.parentNode,'',0,UI.width(_cont.parentNode),UI.height($$(_cont,'.selDpmt')[0]));
		}
		//Load Data
		function load(){
			showLoad();
			var key = '';
			for (var i in Self.departmentValue) {
				key += i + '=' + encodeURIComponent(Self.departmentValue[i]) + '&';
			}
			UI.get('/asyn/deplist.php',key,function(data){
				pageLink(data);
			});
		}
		//Link Event
		function pageLink(data){
			if (data) {
				Self._departmentListWrap.innerHTML = data;
				UI.show(Self._departmentListWrap);
				UI.hide(Self._departmentListTip);
			}
			else {
				UI.hide(Self._departmentListWrap);
				UI.show(Self._departmentListTip);
			}
			MI.dialog.hideLoad();
			UI.each($$(MI.dialog._cont,'.selList a'),function(o){
				o.onclick = function(){
					$('d').value = this.title;
					$('d').focus();
					$('d').blur();
					MI.dialog.hide();
					return false;
				}
			});
		}
	},
	addSchool : function(obj){ //Add School
		var school = UI.html('<div class="friendList folds" id="school_' + obj.id + '"><div class="headCnt"><div class="left"><a href="#" class="eduSchool">' + obj.s + '</a><span class="eduDepartment">' + obj.d + '</span></div><div class="right"><em class="cNote">所有人可见</em><span>|</span><a href="#" class="eduYear">' + obj.y + '年入学</a><span>|</span><a href="#" class="eduDel">删除</a></div></div><div class="cntBox"></div></div>')[0];//<span>|</span><a href="#" class="eduEdit">修改</a><span>|</span><a href="#" class="eduFindFriend">找校友</a><a href="#" class="btn"></a>
		UI.append(school,Self._shoolListWrap);
		Self.schoolListEvent(school);
		Self.displaySchoolListTip();
		setTimeout(function(){
			document.location.hash = 'shoolListWrap';
		},100);
	},
	updateSchool : function(obj){ //Update School
		var el = $('school_' + obj.id);
		$$(el,'.eduSchool')[0].innerHTML = obj.s;
		$$(el,'.eduDepartment')[0].innerHTML = obj.d;
		$$(el,'.eduYear')[0].innerHTML = obj.y + '年入学';
	},
	findSchool : function(el){
		var Self = this,
			content = $$(el,'.cntBox')[0],
			school = $$(el,'.eduSchool')[0].innerHTML;
		if (content.innerHTML == '') {
			UI.get('/asyn/schoolmates.php','school=' + school,function(data){//edu_oper.php
				data = MI.json(data);
				/*
				data = {
					result:0,
					msg:"",
					info:{
						users:[
							{
								name : 'xhlv',
								nick : 'xhlv',
								pic : 'http://t2.qlogo.cn/mbloghead/7509c670ff7865356ab4'
							},
							{
								name : 'ericcao',
								nick : 'ericcao',
								pic : 'http://t2.qlogo.cn/mbloghead/7509c670ff7865356ab4'
							}
						],
						num:33
					}
				};*/
				if (data.result == 0) {
					if (data.info && data.info.users.length) {
						var tmpl = '<div class="title clear"><span class="left">共有<b><%=num%></b>位本校校友</span><a href="/search/*.php?s=<%=school%>" class="right ffsong" target="_blank" style="display:none">查看全部&gt;&gt;</a></div>\
							<ul class="imgList"><%\
								for(var i=0,num=users.length;i<num;i++){\
									%><li><a href="/<%=users[i].name%>"><img src="<%=users[i].pic%>/50" target="_blank"><%=users[i].nick%></a><div class="btn"><input type="button" value="<%=users[i].name%>" class="addAttention"></div></li><%\
								}\
							%></ul>';
						data.info.school = school;
						content.innerHTML = new UI.tmplString(tmpl)(data.info);
						Self.followBtn(content);
					}
					else {
						content.innerHTML = '<div class="noResult">暂时找不到该学校的校友，你可以邀请他们来微博。<a href="/invite/friends.php">现在去邀请<span class="ffsong">&gt;&gt;</span></a></div>';
					}
					UI.toggleClass(el,'folds');
				}
			});
		}
		else {
			UI.toggleClass(el,'folds');
		}
	},
	followBtn : function(el){
		UI.each($$(el || document.body,'.addAttention'),function(o){
			var del = UI.html('<a href="#" class="delAttention" style="display:none">取消</a>')[0];
			UI.after(del,o);
			if(o.style.display=='none') UI.show(del);
			o.onclick = function(){
				var userList=UI.parents(this,'userList')[0],user=(userList?$$(userList,'.userInfo a')[0]:this.parentNode.previousSibling).href.match(/[^\/]+$/g)[0].replace('#M',''),S=this;
				MI.follow(user,this,function(){
					UI.hide(S);
					S.className='addAttention';
					UI.show(S.nextSibling);
				});
				MI.Bos('btnFollowKnowUsersSchool');
				return false;
			}
			del.onclick = function(){
				var userList=UI.parents(this,'userList')[0],user=(userList?$$(userList,'.userInfo a')[0]:this.parentNode.previousSibling).href.match(/[^\/]+$/g)[0].replace('#M',''),S=this;
				MI.follow(user,this,function(){
					UI.hide(S);
					S.className='delAttention';
					UI.show(S.previousSibling);
				});
				MI.Bos('btnUnFollowKnowUsersSchool');
				return false;
			}
		});
	},
	delSchool : function(el){ //Delete School
		var Self = this;
		MI.confirm({
			type : 'error',
			title : '确认删除此学校信息？',
			confirm : function(){
				if (Self.xhr) {
					Self.xhr.abort();
				}
				Self.xhr = UI.ajax({
					url : '/asyn/edu_oper.php',
					data : {op:2,id:el.id.split('_')[1]},
					success : function(data){
						data = MI.json(data);
						if (data.result == 0) {
							MI.dialog.hide();
							UI.animate(el,'opacity',0,function(){
								UI.remove(el);
								Self.displaySchoolListTip();
							});
						}
					}
				});
			}
		});
	},
	editSchool : function(el){ //Edit School
		var Self = this;
		UI.show(Self._cancelBtn);
		Self.setForm.clearMessage();
		$('op').value = '3';
		$('id').value = el.id.split('_')[1];
		$('y').value = $$(el,'.eduYear')[0].innerHTML.replace(/\D/g,'');
		$('s').value = $$(el,'.eduSchool')[0].innerHTML;
		$('d').value = $$(el,'.eduDepartment')[0].innerHTML;
		Self._setFormTitle.innerHTML = Self.setFormTitle[1];

		document.location.hash = 'setForm';
	},
	cancelEditSchool : function(){ //Cancel EditSchool
		var Self = this;
		UI.hide(Self._cancelBtn);
		Self.setForm.clearMessage();
		$('op').value = '1';
		$('id').value = '';
		$('y').value = '';
		$('s').value = '';
		$('d').value = '';
		Self._setFormTitle.innerHTML = Self.setFormTitle[0];
	},
	citySelectDisplay : function(){
		if (this._schoolType.value != 1 && this._schoolType.value < 4){
			UI.show($('city'));
		}
		else {
			UI.hide($('city'));
		}
	},
	citySelectKey : function(){
		var Self = this,
			city = [];
		Self.citySelectDisplay();
		UI.each($$(Self._citySelect,'select'),function(o){
			if (o.style.display != 'none' && o.value) {
				city.push(o.childNodes[o.selectedIndex].innerHTML);
			}
		});
		return city.join('_');
	}
}
