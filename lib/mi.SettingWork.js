/**
 * MI.SettingWork
 * Author : xhlv@tencent.com
 * Datetime : 
 * Last Eidt: 
*/
MI.SettingWork = {
	xhr : null,
	schoolKeyBoxUrl : '/asyn/work_oper.php?op=6&',
	schoolListValue : {},
	departmentValue : {},
	setFormTitle : ['',_('修改工作信息')],
	build : function(){
		var Self = this;
		//Form Dom
		Self._setForm = $('setForm');
		Self._cancelBtn = $$(Self._setForm,'.cancelBtn')[0];
		Self._setFormTitle = $$(Self._setForm,'.title h3')[0];
		Self.setFormTitle[0] = Self._setFormTitle.innerHTML;

		//List Dom
		Self._emptyListTip = $$('.set_noInfo')[0];
		Self._shoolListWrap = $('shoolListWrap');

		//Smart Box
		MI.app({
			Base : function(){
				Self.schoolKeyBox = new MI.SmartBox('c',function(){
					$('c').focus();$('c').blur();
				},'',{left:-1,top:UI.B.ie?1:1,width:202});
				Self.schoolKeyBox.url = Self.schoolKeyBoxUrl;
			}
		});

		//Validate
		UI.getScript(MI.version.Validate,function(){
			Self.setForm = new MI.Validate({
				id : 'setForm',
				inputs : {
					op : {noIco : true},
					id : {noIco : true},
					sy : {
						rule : function(str){
							str = UI.trim(str);
							var length = str.length,w=str.split(''),
								ey = $('ey').nextSibling.nextSibling;
							if (length == 0 && $('ey').value) {
								ey.innerHTML = '';
								return _('请输入正确的入职年份');
							}
							if (length) {
								if (str <= $('ey').value) {
									ey.innerHTML = '';
								}
								/*else {
									ey.innerHTML = '请输入正确的离职年份';
									UI.addClass(ey,'error');
								}*/
							}
							if (length == 0) return _('这里一定要填');
						},
						noIco : true
					},
					ey : {
						rule : function(str){
							str = UI.trim(str);
							var length = str.length,w=str.split('');
							if (length == 0) return _('这里一定要填');
							if (str < $('sy').value) return _('请输入正确的离职年份');
						},
						noIco : true
					},
					c : {
						rule : function(str){
							str = UI.trim(str);
							var length = str.length,w=str.split('');
							if (length == 0) return '这里一定要填');
							if (length > 15) return _('{0}字以内，请准确填写',15);
						},
						noIco : true
					},
					d : {
						rule : function(str){
							str = UI.trim(str);
							var length = str.length,w=str.split('');
							if (length > 10) return _('{0}字以内，请准确填写',10);
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
								sy : $('sy').value,
								ey : $('ey').value,
								c : $('c').value,
								d : $('d').value,
								id : data.index
							};
						if (type == 1) { //Add
							//Self.addSchool(obj);
							document.location.href = '/setting_work.php';
						}
						else if (type == 3) { //Edit
							Self.updateSchool(obj);
						}
						Self.cancelEditSchool();
					});
				}
			});
			
		});

		//Event
		Self._cancelBtn.onclick = function(){
			Self.cancelEditSchool();
			return false;
		}
		UI.each(Self.getSchoolList(),function(o){ //School List
			Self.schoolListEvent(o);
		});
		$('privSchool').onclick = function(){ //privSchool
			var checked = this.checked;
			UI.ajax({
				url : '/asyn/priv_set.php',
				data : {
					c : this.checked ? 0 : 1
				},
				success : function(){
					Self.privTip(checked);
				}
			});
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
	addSchool : function(obj){ //Add School
		var school = UI.html('<div class="friendList folds" id="school_' + obj.id + '"><div class="headCnt"><div class="left"><a href="#" class="eduSchool">' + obj.s + '</a><span class="eduDepartment">' + obj.d + '</span></div><div class="right"><em class="cNote">' + _('所有人可见') + '</em><span>|</span><a href="#" class="eduYear">' + _('{0}年',obj.sy) + '-' + (obj.ey == 9999 ? _('至今') : _('{0}年',obj.ey)) + '</a><span>|</span><a href="#" class="eduDel">' + _('删除') + '</a></div></div><div class="cntBox"></div></div>')[0];//<span>|</span><a href="#" class="eduEdit">修改</a><span>|</span><a href="#" class="eduFindFriend">找校友</a><a href="#" class="btn"></a>
		UI.append(school,Self._shoolListWrap);
		Self.schoolListEvent(school);
		Self.displaySchoolListTip();
		setTimeout(function(){
			document.location.hash = 'shoolListWrap';
		},100);
	},
	updateSchool : function(obj){ //Update School
		var el = $('school_' + obj.id);
		$$(el,'.eduSchool')[0].innerHTML = MI.string.html(obj.c);
		$$(el,'.eduDepartment')[0].innerHTML = MI.string.html(obj.d);
		var y = $$(el,'.eduYear')[0];
		y.innerHTML = _('{0}年',obj.sy) + '-' + (obj.ey == 9999 ? _('至今') : _('年',obj.ey));
		UI.A(y,'rel',obj.sy + '_' + obj.ey);
		setTimeout(function(){
			document.location.hash = 'shoolListWrap';
		},100);
	},
	findSchool : function(el){
		var Self = this,
			content = $$(el,'.cntBox')[0],
			school = encodeURI($$(el,'.eduSchool')[0].innerHTML),
			department = $$(el,'.eduDepartment')[0];
		if (department){
			department = encodeURI(department.innerHTML);
		}
		if (content.innerHTML == '') {
			UI.get('/asyn/colleagues.php','company=' + school + '&department=' + (department ? department : '') + '&r=' + MI.random(),function(data){//edu_oper.php
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
					var empty = '<div class="noResult">' + _('暂时找不到该公司的同事，你可以邀请他们来微博。') + '<a href="/invite/friends.php">' + _('现在去邀请') + '<span class="ffsong">&gt;&gt;</span></a></div>';
					if (data.info && data.info.users.length) {
						var tmpl = '<div class="title clear"><span class="left">' + _('共有<b>{0}</b>位本公司同事','<%=num%>') + '</span><a href="/search/user.php?pos=706&high=1&c=<%=school%>" class="right ffsong" target="_blank"<%if(num<11){%> style="display:none"<%}%>>' + _('查看全部') + '&gt;&gt;</a></div>\
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
						content.innerHTML = new UI.tmplString(tmpl)(data.info);
						MI.FollowBtn.build(content,'li a');
					}
					else {
						content.innerHTML = empty;
					}
					UI.toggleClass(el,'folds');
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
			title : _('确认删除此公司信息？'),
			confirm : function(){
				if (Self.xhr) {
					Self.xhr.abort();
				}
				Self.xhr = UI.ajax({
					url : '/asyn/work_oper.php',
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
		var y = UI.A($$(el,'.eduYear')[0],'rel').split('_');
		$('sy').value = y[0];
		$('ey').value = y[1];
		$('c').value = UI.text($$(el,'.eduSchool')[0]);
		$('d').value = UI.text($$(el,'.eduDepartment')[0]);
		Self._setFormTitle.innerHTML = Self.setFormTitle[1];

		document.location.hash = 'setForm';
	},
	cancelEditSchool : function(){ //Cancel EditSchool
		var Self = this;
		UI.hide(Self._cancelBtn);
		Self.setForm.clearMessage();
		$('op').value = '1';
		$('id').value = '';
		$('sy').value = '';
		$('ey').value = '';
		$('c').value = '';
		$('d').value = '';
		Self._setFormTitle.innerHTML = Self.setFormTitle[0];
	},
	citySelectDisplay : function(){
		if (this._schoolType.value > 3){
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
window.Self = MI.SettingEdu;
