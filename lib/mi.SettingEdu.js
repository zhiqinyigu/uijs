/**
 * MI.SettingEdu
 * Author : xhlv@tencent.com
 * Datetime : 
 * Last Eidt: 
*/
MI.SettingEdu = {
	xhr : null,
	schoolKeyBoxUrl : 'http://t.qq.com/asyn/edu_oper.php?op=6&type=',
	departmentKeyBoxUrl : 'http://t.qq.com/asyn/edu_oper.php?op=10&type=',
	schoolListValue : {},
	departmentValue : {},
	setFormTitle : ['',_('修改教育信息')],
	build : function(){
		var Self = this;
		//Form Dom
		Self._setForm = $('setForm');
		Self._schoolType = $('schooltype');
		Self._schoolTypeDefault = 4;
		Self._citySelect = UI.html('<div class="selfunBox"><span class="selName">' + _('学校所在地:') + '</span><select name="nation" id="nation"><option value="">' + _('国家/地区') + '</option></select><b></b><select name="province" id="province"><option value="">' + _('省份') + '</option></select><b></b><select name="city" id="city"><option value="">' + _('城市') + '</option></select></div>')[0];
		Self._schoolList = UI.html('<div class="selScholl"><div class="selTab clear"><a href="#" class="all cur">' + _('全部') + '</a><a href="#">A</a><a href="#">B</a><a href="#">C</a><a href="#">D</a><a href="#">E</a><a href="#">F</a><a href="#">G</a><a href="#">H</a><a href="#">I</a><a href="#">J</a><a href="#">K</a><a href="#">L</a><a href="#">M</a><a href="#">N</a><a href="#">O</a><a href="#">P</a><a href="#">Q</a><a href="#">R</a><a href="#">S</a><a href="#">T</a><a href="#">U</a><a href="#">V</a><a href="#">W</a><a href="#">X</a><a href="#">Y</a><a href="#">Z</a></div><div class="tmask"></div><div class="selListWrap"></div><div class="noScholl" style="display:none">' + _('暂时没有符合条件的学校') + '</div><div class="bmask"></div><div class="noSchollTip"><em class="ico_help"></em>' + _('没有自己的学校？可发条广播到#教育信息申请#话题申请添加自己的学校。') + '<a href="#" onclick="MI.SettingEdu.applySchoolDisplay(1);return false">' + _('去申请添加') + '<span class="ffsong">&gt;&gt;</span></a></div></div>')[0];
		Self._schoolListWrap = $$(Self._schoolList,'.selListWrap')[0];
		Self._schoolListTip = $$(Self._schoolList,'.noScholl')[0];
		UI.prepend(Self._citySelect,Self._schoolList);
		Self._departmentList = UI.html('<div class="selDpmt"><div class="tmask"></div><div class="selDpmt"><div class="selListWrap"></div></div><div class="noScholl" style="display:none">' + _('暂时没有符合条件的院系') + '</div><div class="bmask"></div><div class="noSchollTip"><em class="ico_help"></em>' + _('没有自己的院系？可发条广播到#教育信息申请#话题申请添加自己的院系。') + '<a href="#" onclick="MI.SettingEdu.applySchoolDisplay(2);return false">' + _('去申请添加') + '<span class="ffsong">&gt;&gt;</span></a></div></div>')[0];
		Self._departmentListWrap = $$(Self._departmentList,'.selListWrap')[0];
		Self._departmentListTip = $$(Self._departmentList,'.noScholl')[0];
		Self._cancelBtn = $$(Self._setForm,'.cancelBtn')[0];
		Self._setFormTitle = $$(Self._setForm,'.title h3')[0];
		Self.setFormTitle[0] = Self._setFormTitle ? Self._setFormTitle.innerHTML : '';

		//List Dom
		Self._emptyListTip = $$('.set_noInfo')[0];
		Self._shoolListWrap = $('shoolListWrap');

		//Apply Dom
		Self._applySchool = UI.html('<div class="applyScholl"><p class="cNote">' + _('你可以申请添加') + '<span id="applySchoolTypeTxt"></span>，' + _('申请通过后，相关信息将出现在对应的选择列表内，添加后通过这些信息可以方便的找到更多的同学。') + '</p><p>' + _('你发出的申请会以广播的形式发到') + '<a href="http://t.qq.com/k/%E6%95%99%E8%82%B2%E4%BF%A1%E6%81%AF%E7%94%B3%E8%AF%B7" target="_blank">#教育信息申请#</a>' + _('话题中。') + '</p><form onsubmit="MI.SettingEdu.applySchool();return false"><table border="0" cellspacing="0" cellpadding="0">\
		<tbody><tr>\
		<th>' + _('学历：') + '</th><td><select id="applySchoolType" onchange="MI.SettingEdu.applySchoolType(this)"><option value="6">' + _('博士') + '</option><option value="5">' + _('硕士') + '</option><option value="4" selected>' + _('大学') + '</option><option value="3">' + _('高中') + '</option><option value="2">' + _('初中') + '</option><option value="1">' + _('小学') + '</option></select></td></tr>\
		<tr><th><span>*</span>' + _('学校所在地：') + '</th><td class="applyCity"><select name="applyNation" id="applyNation"><option value="">' + _('国家/地区') + '</option></select><b></b><select name="applyProvince" id="applyProvince"><option value="">' + _('省份') + '</option></select><b></b><select name="applyCity" id="applyCity"><option value="">' + _('城市') + '</option></select></td></tr>\
		<tr><th><span id="applySchoolMust">*</span>' + _('学校名称：') + '</th><td><input type="text" class="inputTxt" id="applySchoolName"> <span class="error" id="applySchoolNameTip" style="display:none">' + _('这里一定要填') + '</span></td></tr>\
		<tr id="applyDepartment"><th><span id="applyDepartmentMust" style="display:none">*</span>' + _('院系名称：') + '</th><td><input type="text" class="inputTxt" id="applyDepartmentName"> <span class="error" id="applyDepartmentNameTip" style="display:none">' + _('这里一定要填') + '</span></td></tr>\
		<tr><th></th><td><button type="submit" class="btn2">' + _('申请添加') + '</button> <span class="error" id="applySubmitTip" style="display:none">' + _('申请已提交，请不要连续发布重复内容') + '</span></td></tr>\
		</tbody></table></form>\
		<div class="talkWrap" style="height:0;overflow:hidden"><div class="cont"><textarea class="inputTxt">x</textarea></div><div class="bot"><input type="button" class="inputBtn sendBtn"><span class="countTxt">' + _('还能输入<em>140</em>字') + '</span></div></div>\
		</div>')[0];

		//Smart Box
		MI.app({
			Base : function(){
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
			}
		});
		function setSmartBoxUrl(){
			Self.schoolKeyBox.url = Self.schoolKeyBoxUrl + (Self._schoolType ? Self._schoolType.value : Self._schoolTypeDefault) + '&';
			Self.departmentKeyBox.url = Self.departmentKeyBoxUrl + (Self._schoolType ? Self._schoolType.value : Self._schoolTypeDefault) + '&s=' + encodeURIComponent($('s').value) + '&';
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
								if (length == 0) return _('这里一定要填');
							},
							noIco : true
						},
						s : {
							rule : function(str){
								str = UI.trim(str);
								var length = MI.string.length(str),w=str.split('');
								if (length == 0) return _('这里一定要填');
								if (length > 50) return _('{0}字以内，请准确填写',25);
							},
							url : 'http://t.qq.com/asyn/edu_oper.php?op=9&r=' + MI.random() + '&',
							noIco : true
						},
						d : {
							rule : function(str){
								str = UI.trim(str);
								var length = MI.string.length(str),w=str.split('');
								if (length > 50) return _('{0}字以内，请准确填写',25);
							},
							url : function(){
								return 'http://t.qq.com/asyn/edu_oper.php?op=11&s=' + encodeURIComponent($('s').value) + '&r=' + MI.random() + '&';
							},
							noIco : true
						}
					},
					messages : function(el){
						return UI.next(el);
					},
					success : function(data){
						MI.tip(_('保存成功！'),function(){
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
					Self.citySelect.first(_('中国') + ',1');
					Self.citySelect.second(_('北京') + ',11');

					Self.applyCitySelect = new MI.RelateSelect({
						id : $$(Self._applySchool,'.applyCity')[0],
						data : MI.city,
						tips : []
					});
					Self.applyCitySelect.first(',');
					Self.applyCitySelect.first(_('中国') + ',1');
					Self.applyCitySelect.second(_('北京') + ',11');
				});
			},
			CityAll : null
		});
		//Apply Talk Box
		Self.applyBox = new MI.TalkBox($$(Self._applySchool,'.talkWrap')[0]);
		Self.applyBox.successStart = function(){
			MI.tip(_('提交申请成功！'));
		}
		Self.applyBox.failStart = function(){
			UI.show('applySubmitTip');
		}

		//Event
		if(Self._cancelBtn) {
			Self._cancelBtn.onclick = function(){
				Self.cancelEditSchool();
				return false;
			}
		}
		if(Self._schoolType) {
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
				var value = Self._schoolType ? Self._schoolType.value : Self._schoolTypeDefault;
				if ($('nation').value != 1 && value > 3) {
					UI.hide('province');
					setTimeout(function(){
						UI.hide('province');
					},0);
				}
				else if (value < 4) {
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
		var $privSchool = $('privSchool');
		if($privSchool) {
			$privSchool.onclick = function(){ //privSchool
				var checked = this.checked;
				MI.ajax({
					url : 'http://t.qq.com/asyn/priv_set.php',
					data : {
						s : this.checked ? 0 : 1
					},
					success : function(){
						Self.privTip(checked);
					}
				});
			}
		}
		
		setTimeout(function(){ // 自动展开最下面的找人
			var _find = $$('.friendList .eduFind'),num = _find.length;
			if (num){
				_find[num - 1].onclick();
			}
		},40);
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
		var tip = checked ? _('所有人可见') : _('所有人不可见');
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
			document.location.reload();
		}
	},
	selectSchool : function(){ //Select School
		var Self = this,
			_cont = MI.dialog._cont,
			citySelect = $$(Self._citySelect,'select'),
			selTab = $$(Self._schoolList,'.selTab a'),
			schoolType = Self._schoolType ? Self._schoolType.value : Self._schoolTypeDefault;
		if (schoolType < 4) {
			Self.citySelect.build(MI.cityAll);
			Self.citySelect.first(',');
			Self.citySelect.first(_('北京') + ',1');
			Self.citySelect.second(_('东城') + ',1');
		}
		else {
			Self.citySelect.build(MI.city);
			Self.citySelect.first(',');
			Self.citySelect.first(_('中国') + ',1');
			Self.citySelect.second(_('北京') + ',11');
		}

		MI.dialog.show({width:630,title:'<h1 class="DmainTit">' + _('选择学校') + '</h1>',html:Self._schoolList});

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
			MI.ajax({
				url: 'http://t.qq.com/asyn/schoolist.php',
				data: Self.schoolListValue,
				type: 'get',
				success: function(data) {
					pageLink(data);
				}
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
	applyType : 1,
	applySchoolDisplay : function(type){ //1-School 2-Department
		var Self = this;
		MI.dialog.show({
			title : '<h1 class="DmainTit">' + _('申请添加') + '' + (type == 1 ? _('学校/') : '') + _('院系') + '</h1>',
			width : 540,
			html : Self._applySchool
		});
		var applySchoolName = $('applySchoolName'),
			applyDepartmentName = $('applyDepartmentName');
		if (type == 1) {
			UI.A(applySchoolName,'disabled','');
			UI.show('applySchoolMust');
			UI.hide('applyDepartmentMust');
			$('applySchoolTypeTxt').innerHTML = _('学校或院系');

			applySchoolName.value = '';
			applySchoolName.focus();
		}
		else if (type == 2) {
			UI.A(applySchoolName,'disabled','disabled');
			UI.hide('applySchoolMust');
			UI.show('applyDepartmentMust');
			$('applySchoolTypeTxt').innerHTML = _('院系');
			applySchoolName.value = $('s').value;
			applyDepartmentName.focus();
		}
		$('applySchoolType').parentNode.parentNode.style.display = $('applyNation').parentNode.parentNode.style.display = type == 1 ? '' : 'none';

		Self.applyType = type;
	},
	applySchool : function(){
		var Self = this,txt = _('#教育信息申请# 申请添加');
		if (Self.applyType == 1) {
			add('applySchoolType');
			add('applyNation');
			add('applyProvince');
			add('applyCity');
			txt += _('的');
		}
		add('applySchoolName');
		add('applyDepartmentName');

		UI.hide('applySchoolNameTip');
		UI.hide('applyDepartmentNameTip');
		UI.hide('applySubmitTip');
		if ($('applySchoolName').value == '') {
			UI.show('applySchoolNameTip');
			return;
		}
		else if (Self.applyType == 2 && $('applyDepartmentName').value == '') {
			UI.show('applyDepartmentNameTip');
			return;
		}

		var data = {
			op : Self.applyType,
			school : $('applySchoolName').value,
			department : $('applyDepartmentName').value
		};
		if (Self.applyType == 1) {
			data.background = $('applySchoolType').value;
			if (data.background < 4) { //非大学：省 城市 区
				data.province = option($('applyNation'));
				data.provinceId = $('applyNation').value;
				data.city = option($('applyProvince'));
				data.cityId = $('applyProvince').value;
				data.district = option($('applyCity'));
				data.districtId = $('applyCity').value;
				delete data.department;
			}
			else { //大学：国家 省
				data.nation = option($('applyNation'));
				data.nationId = $('applyNation').value;
				data.province = option($('applyProvince'));
				data.provinceId = $('applyProvince').value;
			}
		}
		Self.applyBox._txt.value = txt;
		Self.applyBox.countTxt();
		setTimeout(function(){
			Self.applyBox.send();
			MI.ajax({
				url : 'asyn/createSchool.php',
				data : data,
				success : function(){
					
				}
			});
		},0);
		
		function add(id){
			var el = $(id),value = el.value;
			if (UI.C(el,'display') != 'none') {
				if (el.nodeName == 'SELECT') {
					value = el.childNodes[el.selectedIndex].innerHTML;
				}
				if (value) {
					txt += '【' + value.slice(0,40) + '】';
				}
			}
		}
		function option(el){
			var text = '';
			if (el.style.display != 'none') {
				text = el.childNodes[el.selectedIndex].innerHTML;
			}
			return text;
		}
	},
	applySchoolType : function(el){
		var d = $('applyDepartment');
		if(el.value > 3){
			this.applyCitySelect.build(MI.city);
			this.applyCitySelect.first(_('中国') + ',1');
			this.applyCitySelect.second(_('东城') + ',1');
			UI.show(d);
			$('applyDepartmentName').value = ''
		}
		else {
			this.applyCitySelect.build(MI.cityAll);
			this.applyCitySelect.first(_('北京') + ',1');
			this.applyCitySelect.second(_('东城区') + ',1');
			UI.hide(d);
		}
	},
	selectDepartment : function(){ //Select Department
		var Self = this,
			_cont = MI.dialog._cont,
			schoolType = Self._schoolType ? Self._schoolType.value : Self._schoolTypeDefault;
		if ($('s').value == '') {
			MI.alert(_('请先选择学校'));
		}
		else {
			MI.dialog.show({width:630,title:'<h1 class="DmainTit">' + _('选择院系') + '</h1>',html:Self._departmentList});

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
			MI.ajax({
				url: 'http://t.qq.com/asyn/deplist.php',
				data: Self.departmentValue,
				type: 'get',
				success: function(data) {
					pageLink(data);
				}
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
		var school = UI.html('<div class="friendList folds" id="school_' + obj.id + '"><div class="headCnt"><div class="left"><a href="#" class="eduSchool">' + obj.s + '</a><span class="eduDepartment">' + obj.d + '</span></div><div class="right"><em class="cNote">' + _('所有人可见') + '</em><span>|</span><a href="#" class="eduYear">' + obj.y + _('年入学') + '</a><span>|</span><a href="#" class="eduDel">' + _('删除') + '</a></div></div><div class="cntBox"></div></div>')[0];//<span>|</span><a href="#" class="eduEdit">' + _('修改') + '</a><span>|</span><a href="#" class="eduFindFriend">' + _('找校友') + '</a><a href="#" class="btn"></a>
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
		$$(el,'.eduYear')[0].innerHTML = obj.y + _('年入学');
	},
	findSchool : function(el){
		var Self = this,
			content = $$(el,'.cntBox')[0],
			school = $$(el,'.eduSchool')[0].innerHTML,
			department = $$(el,'.eduDepartment')[0];
		if (department){
			department = department.innerHTML;
		}
		if (content.innerHTML == '') {
			MI.ajax({
				url: 'http://t.qq.com/asyn/schoolmates.php',
				data: {school: school, department: department ? department : '', r: MI.random()},
				type: 'get',
				success: function(data) {//edu_oper.php
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
						var empty = '<div class="noResult">' + _('暂时找不到该学校的校友，你可以邀请他们来微博。') + '<a href="/invite/friends.php">' + _('现在去邀请') + '<span class="ffsong">&gt;&gt;</span></a></div>';
						if (data.info && data.info.users.length) {
							var tmpl = '<div class="title clear"><span class="left">' + _('共有<b>{0}</b>位本校校友','<%=num%>') + '</span><a href="/search/user.php?pos=704&high=1&school=<%=school%>" class="right ffsong" target="_blank"<%if(num<11){%> style="display:none"<%}%>>' + _('查看全部') + '&gt;&gt;</a></div>\
								<ul class="imgList"><%\
									var n = users.length;\
									if (n>8) {\
										n=8;\
									}\
									for(var i=0;i<n;i++){\
										%><li><a href="/<%=users[i].name%>" title="<%=users[i].nick%>(@<%=users[i].chName || users[i].name%>)" target="_blank"><img src="<%if(users[i].pic){%><%=users[i].pic%>/50<%}else{%>http://mat1.gtimg.com/www/mb/images/head_50.jpg<%}%>"><%=MI.string.cut(users[i].nick,8,"")%></a></li><%\
									}\
								%></ul>';
							data.info.school = school;
							try{
								content.innerHTML = new UI.tmplString(tmpl)(data.info);
							}catch(e){
								content.innerHTML = empty;
							}
							MI.FollowBtn.build(content,'li a');
						}
						else {
							content.innerHTML = empty;
						}
						UI.toggleClass(el,'folds');
					}
				}
			});
		}
		else {
			UI.toggleClass(el,'folds');
		}
	},
	delSchool : function(el){ //Delete School
		var Self = this;
		MI.confirm({
			type : 'error',
			title : _('确认删除此学校信息？'),
			confirm : function(){
				if (Self.xhr) {
					Self.xhr.abort();
				}
				Self.xhr = MI.ajax({
					url : 'http://t.qq.com/asyn/edu_oper.php',
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
		var value = this._schoolType ? this._schoolType.value : this._schoolTypeDefault;
		if (value != 1 && value < 4){
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
