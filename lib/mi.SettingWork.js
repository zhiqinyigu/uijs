MI.SettingWork = {
	xhr : null,
	/*schoolKeyBoxUrl : '/asyn/edu_oper.php?op=6&type=',
	departmentKeyBoxUrl : '/asyn/edu_oper.php?op=6&type=',*/
	schoolListValue : {},
	departmentValue : {},
	setFormTitle : ['','�޸Ĺ�����Ϣ'],
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
		/*Self.schoolKeyBox = new MI.SmartBox('s',function(){
			$('s').focus();$('s').blur();
		},'',{left:-1,top:UI.B.ie?1:1,width:202});
		Self.schoolKeyBox.url = Self.schoolKeyBoxUrl;
		Self.departmentKeyBox = new MI.SmartBox('d',function(){
			$('d').focus();$('d').blur();
		},'',{left:-1,top:UI.B.ie?1:1,width:202});
		Self.departmentKeyBox.url = Self.departmentKeyBoxUrl + '&s=' + $('s').value + '&';*/

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
								return '��������ȷ����ְ���';
							}
							if (length) {
								if (str <= $('ey').value) {
									ey.innerHTML = '';
								}
								/*else {
									ey.innerHTML = '��������ȷ����ְ���';
									UI.addClass(ey,'error');
								}*/
							}
							if (length == 0) return '����һ��Ҫ��';
						},
						noIco : true
					},
					ey : {
						rule : function(str){
							str = UI.trim(str);
							var length = str.length,w=str.split('');
							if (length == 0) return '����һ��Ҫ��';
							if (str < $('sy').value) return '��������ȷ����ְ���';
						},
						noIco : true
					},
					c : {
						rule : function(str){
							str = UI.trim(str);
							var length = str.length,w=str.split('');
							if (length == 0) return '����һ��Ҫ��';
							if (length > 15) return '15�����ڣ���׼ȷ��д';
						},
						noIco : true
					},
					d : {
						rule : function(str){
							str = UI.trim(str);
							var length = str.length,w=str.split('');
							if (length > 10) return '10�����ڣ���׼ȷ��д';
						},
						noIco : true
					}
				},
				messages : function(el){
					return UI.next(el);
				},
				success : function(data){
					MI.tip('����ɹ���',function(){
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
	},
	schoolListEvent : function(el){
		var Self = this,
			id = el.id.split('_')[1],
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
	},
	privTip : function(checked){
		var tip = checked ? '�����˿ɼ�' : '�������������˿ɼ�';
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
	addSchool : function(obj){ //Add School
		var school = UI.html('<div class="friendList folds" id="school_' + obj.id + '"><div class="headCnt"><div class="left"><a href="#" class="eduSchool">' + obj.s + '</a><span class="eduDepartment">' + obj.d + '</span></div><div class="right"><em class="cNote">�����˿ɼ�</em><span>|</span><a href="#" class="eduYear">' + obj.sy + '��-' + (obj.ey == 9999 ? '����' : obj.ey + '��') + '</a><span>|</span><a href="#" class="eduDel">ɾ��</a></div></div><div class="cntBox"></div></div>')[0];//<span>|</span><a href="#" class="eduEdit">�޸�</a><span>|</span><a href="#" class="eduFindFriend">��У��</a><a href="#" class="btn"></a>
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
		y.innerHTML = obj.sy + '��-' + (obj.ey == 9999 ? '����' : obj.ey + '��');
		UI.A(y,'rel',obj.sy + '_' + obj.ey);
		setTimeout(function(){
			document.location.hash = 'shoolListWrap';
		},100);
	},
	delSchool : function(el){ //Delete School
		var Self = this;
		MI.confirm({
			type : 'error',
			title : 'ȷ��ɾ���˹�˾��Ϣ��',
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
