/**
 * MI.List
 * Author : xhlv@tencent.com
 * Datetime : 
 * Last Eidt: 
*/
/**
 * MI.List List����
 * @namespace MI.List List����
 * @type Object
 */
MI.List = {
	listMaxNum : 20, //List Max Num
	listMaxUserNum : 200, //List Max User Num
	validate : null, //Validate Object
	xhr : {},
	call : null, //Call Back Function
	addCall : function(data){ //Call Back Function
		//document.location.href = '/list_mine.php';
		document.location.href = '/list_user.php?lid=' + data.createId;
	},
	editCall :function(){ //Call Back Function
		document.location.reload();
	},
	delCall : null, //Call Back Function
	url : { //Ajax Url
		add : '/asyn/createlist.php',
		edit : '/asyn/editlist.php',
		del : '/asyn/dellist.php',
		follow : '/asyn/list.php',
		list : '/asyn/mylist.php',
		join : '/asyn/joinlist.php',
		joins : '/asyn/joinlists.php',
		exit : '/asyn/exitlist.php'
	},
	build : function(){
		var Self = this;
		//Css
		UI.css('.tbAddList .inputTxt{width:170px; border:1px solid #86A1B4;}\
			.tbAddList .inputNum,.tbAddList .tb_tag .inputTxt{width:375px}\
			.tbAddList .inputArea{width:375px; height:75px;border:1px solid #86A1B4;}\
			.tbAddList{padding:15px 0 10px;line-height:21px}.tbAddList td span{margin-left:5px;vertical-align:top}\
			.tbAddList .btn2{margin-right:12px;}\
			.tbAddList .tbAddList th{padding:0}\
			.tbAddList .viewRight label{cursor:default;position:relative;padding:0 15px 0 0;*top:-2px;_top:0;font-family:Tahoma,Arial;line-height:1.75;color:#333}');

		//Dom
		Self._form = UI.html('<form action="' + Self.url.add + '" method="post" id="listForm" onsubmit="return false" style="display:none"><div class="tbAddList"><table border="0" cellspacing="0" cellpadding="0">\
			<tbody><tr><th>' + _('���ƣ�') + '</th><td><input type="text" name="name" id="name" class="inputTxt"><p class="cNote">' + _('{0}�����ġ���ĸ�����֡��»��߻����','1-13') + '</p></td></tr>\
			<tr><th>' + _('������') + '</th><td><textarea class="inputArea" name="descrip" id="descrip"></textarea><p class="cNote">' + _('{0}������',100) + '</p></td></tr>\
			<tr><th>' + _('��ǩ��') + '</th><td class="tb_tag"><input type="text" class="inputTxt" name="listTags" id="listTags"><p class="cNote">' + _('ÿ����ǩ{0}�������ڣ��Կո����������д{1}��',8,10) + '</p></td></tr>\
			<tr><th>' + _('���Ȩ�ޣ�') + '</th><td class="viewRight"><label for="priv"><input type="radio" checked name="priv" id="priv" value="0" class="check1"><b></b>' + _('�����˿ɼ�') + '</label><label for="privB"><input type="radio" name="priv" id="privB" value="1" class="check1"><b></b>' + _('ֻ�����Լ��ɼ�') + '</label></td></tr>\
			<tr><th></th><td><button type="submit" class="btn2">' + _('ȷ��') + '</button><button type="button" class="btn2">' + _('ȡ��') + '</button></td></tr>\
		</tbody></table></div><input type="hidden" id="lid" name="lid" /><b></b></form>')[0];
		Self._btn = $$(Self._form,'button');
		Self._confirm = Self._btn[0];
		Self._cancel = Self._btn[1];
		UI.append(Self._form,document.body);
		Self._name = $('name');
		Self._privA = $('priv');
		Self._privB = $('privB');
		Self._descrip = $('descrip');
		Self._tags = $('listTags');
		Self._lid = $('lid');

		//Event
		Self._cancel.onclick = function(){
			MI.dialog.hide();
		}
		MI.app({
			Validate : function(){
				Self.validate = new MI.Validate({
					id : 'listForm',
					inputs : {
						name : {
							rule : function(str){
								str = UI.trim(str);
								var length = str.length,w=str.split('');
								if (length == 0) return _('����һ��Ҫ��');
								if (str.match(/[^\u4e00-\u9fa5\w-\s]/g)) return _('��֧�����ġ���ĸ�����֡��»��߻����');
								if (length < 1 || length > 13) return _('��֧��{0}�����ġ���ĸ�����֡��»��߻����','1-13');
							},
							noIco : true
						},
						descrip : {
							rule : function(str){
								if (str.length > 100) return _('{0}������',100);
							},
							noIco : true
						},
						listTags : {
							rule : function(str){
								str = UI.trim(str);
								var length = str.length,w=str.split('');
								if (str.match(/[^\u4e00-\u9fa5\w\s]/g)) return _('��֧�����ġ���ĸ������');
							},
							noIco : true
						},
						lid : {
							noIco : true
						},
						priv : {
							noIco : true
						}
					},
					messages : function(el){
						return UI.next(el);
					},
					success : function(data){
						if (Self.call) {
							Self.call(data);
						}
					}
				});
			}
		});

		Self.build = null;
	},
	listCache : {},
	listTarget : null,
	listAccount : null,
	listDisplay : null,
	list : function(el,account){
		/*
			asyn/mylist.php
			{
				"result":0,"msg":"",info:{
					"3731099507207149":{"name":"luyan","inlist":false},
					"940427326761916":{"name":"luyan","inlist":false}
				}
			}
		*/
		var Self = this,
			Time,Time_1,Time_2,Time_3;
		if (Self.listTarget != el) {
			Self.listHide();
		}
		Self.listTarget = el;
		Self.listAccount = account;
		if (!Self._list) {
			//Dom
			Self._list = UI.html('<div class="listFun"><ul></ul><div class="newList"><a href="#">' + _('��������') + '</a></div></div>')[0];
			Self._listCont = $$(Self._list,'ul')[0];
			Self._listNew = $$(Self._list,'.newList a')[0];

			//Event
			Self._listNew.onclick = function(){
				Self.listHide();
				Self.add();
				Self.call = function(data){
					MI.dialog.hide();
					for (var i in Self.listCache) {
						var info = {};
						info[data.createId] = {
							name : Self._name.value,
							inlist : false
						}
						for (var j in Self.listCache[i].info) {
							info[j] = Self.listCache[i].info[j];
						}
						Self.listCache[i].info = info;
					}
					Self.listShow();

					//Auto Join
					var input = $$(Self._listCont,'input')[0];
					input.checked = true;
					input.onclick();
				}
				MI.Bos('btnListAddInList');
				return false;
			}
			Self._list.onclick = function(e){
				UI.E(e).stop();
			}
			/*UI.EA(document.body,'click',function(){
				Self.listHide();
			});*/
		}
		if (UI.hasClass(el,'open')) {
			Self.listHide();
		}
		else {
			if (Self.listCache[account]) {
				Self.listShow(Self.listCache[account]);
			}
			else {
				//if (!Self.xhr.list) {
					Time = + new Date();
					UI.get(Self.url.list,'account=' + account + '&r=' + MI.random(),function(data){
						Time_1 = + new Date() - Time;
						data = MI.json(data);
						if (data.result == 0) {
							Self.listCache[account] = data;
							Self.listShow(data);
						}
						//Self.xhr.list = 0;
				
						//Speed
						Time_2 = + new Date() - Time;
						setTimeout(function(){
							Time_3 = + new Date() - Time;
							MI.Speed('t_asyn_listbtn',1,Time_1,Time_2,Time_3);
						},0);
					});
				//}
				//Self.xhr.list = 1;
			}
		}
	},
	listFollowCss : 0,
	listFollow : function(id){ //�����ɹ�����������
		var Self = this;
		if (!Self.listFollowCss){
			UI.css('.foedSets{padding:20px 10px 8px}.tbSendMsg .foedSets th{padding-right:3px}.foedSets td{line-height:19px}.foedSets .inputTxt{width:180px}.foedSets .DcreateList .inputTxt{width:218px}.foedSets .funBox{padding-top:10px;text-align:right}.D .foedSets label{position:static;padding:0;color:#333;white-space:nowrap}.Dlist{position:relative;float:left;margin-right:5px}.Dlist .citySel{width:161px;border-color:#ADB6C5}.DmyList{display:none;clear:both;position:absolute;top:20px;left:0;width:190px;padding:5px 0;border:1px solid #ADB6C5;border-top:0;background:#fff}.D .cityDropDis .DmyList{display:block}.D .DmyList label{display:block;width:180px;margin:0 auto;overflow:hidden}.DcreateList{clear:both;width:232px;overflow:hidden;margin-top:10px;padding:8px 10px;border:1px solid #F4E4B4;background:#FFFFE9}.DcreateList label{margin-right:15px}.DcreateList p{padding:2px 0;white-space:nowrap}.DcreateList .btn1{margin:0 10px 0 5em}');
			Self.listFollowCss = 1;
		}
		UI.get(Self.url.list,'position=follow&account=' + id + '&r=' + MI.random(),function(data){
			data = MI.json(data);
			if (data.result == 0){
				var html = [],
					index = 0;
				for (var i in data.info){
					html.push('<label for="list_' + i + '" title="' + data.info[i].name + '"><input type="checkbox" id="list_' + i + '" class="check1" value="' + i + '"' + (data.info[i].inlist ? ' checked inlist="1"' : '') + (!data.info[i].inlist && data.info[i].userNum >= Self.listMaxUserNum ? ' disabled title="' + _('��Ա����������') + '"' : '') + '>' + data.info[i].name + (data.info[i].locked ? '<em class="ico_slock"></em>' : '') + '</label>');
					index++;
				}
				MI.dialog.show({
					title : '<h1 class="DmainTit">' + _('�����ɹ�������������') + '</h1>',
					width : 380,
					end : function(){
						MI.Bos('btnListFollowClose');
						UI.remove($('fotoList'));
					},
					html : '<div class="foedSets"><table border="0" cellspacing="0" cellpadding="0"><tbody>\
						<tr><th>' + _('��ע��') + '</th><td><input type="text" class="inputTxt"><div></div></td></tr>\
						<tr><th>' + _('ѡ��������') + '</th><td>\
							<div class="Dlist">\
								<a href="#" onclick="UI.toggleClass(this.parentNode,\'cityDropDis\');return false" class="citySel"><em>������...</em>��<em>������...</em><span></span></a>\
								<div class="DmyList">' + html.join('') + '</div>\
							</div>\
							' + (index < Self.listMaxNum ? '<a href="#" onclick="MI.List.listFollowCreate();return false">' + _('�½�����') + '</a>' : '') + '\
							<div class="DcreateList" style="display:none">\
								<form action="' + Self.url.add + '" method="post" id="listFollowForm" onsubmit="return false">\
									<p><span><input type="text" id="name" name="name" class="inputTxt"></span><span></span></p>\
									<p>���Ȩ�ޣ�<label><input type="radio" class="check1" id="priv" name="priv" value="0" checked>' + _('�����˿ɼ�') + '</label><label><input type="radio" class="check1" name="priv" value="1">' + _('���Լ��ɼ�') + '</label><span></span></p>\
									<p><button class="btn1" type="submit">' + _('����') + '</button><a href="#" onclick="MI.List.listFollowCreateCancel();return false">' + _('ȡ��') + '</a></p>\
								</form>\
							</div>\
						</td></tr>\
						<tr><th></th><td class="funBox"><button class="btn1" onclick="MI.List.listFollowSave(\'' + id + '\')">' + _('���') + '</button></td></tr>\
					</tbody></table></div>'
					/*html : '<div class="fotoList" id="fotoList"><div class="foset">[<a href="/setting_others.php#co" onclick="MI.Bos(\'btnListFollowSet\')">' + _('��������') + '</a>]</div><h4>' + _('Ϊ��{0}��ѡ��������',data.nick || id) + '</h4>\
	<div class="myCreateList clear">' + html.join('') + '</div>\
	<div class="createlistWrap">\
		' + (index < Self.listMaxNum ? '<a href="#" class="ffsong" onclick="MI.List.listFollowCreate();return false">+' + _('����������') + '</a>' : '') + '\
		<div class="createList" style="display:none">\
			<form action="' + Self.url.add + '" method="post" id="listFollowForm" onsubmit="return false">\
				<p><span><input type="text" id="name" name="name" class="inputTxt"></span><button type="submit" class="btn2">' + _('����') + '</button><a href="#" onclick="MI.List.listFollowCreateCancel();return false">' + _('ȡ��') + '</a><br' + (UI.B.ie ? ' style="display:none"' : '') + '><span></span></p>\
				<p>' + _('���Ȩ�ޣ�') + '<label><input type="radio" class="check1" id="priv" name="priv" value="0" checked>' + _('�����˿ɼ�') + '</label><label><input type="radio" class="check1" name="priv" value="1">' + _('���Լ��ɼ�') + '</label><span></span></p>\
			</form>\
		</div>\
	</div>\
	<div class="btnBox"><button class="btn2" onclick="MI.List.listFollowSave(\'' + id + '\')">' + _('����') + '</button><a href="#" onclick="MI.Bos(\'btnListFollowCancel\');MI.dialog.hide();return false">' + _('�ݲ���¼') + '</a></div></div>'*/
				});
				
				MI.app({
					Validate : function(){
						Self.followValidate = new MI.Validate({
							id : 'listFollowForm',
							inputs : {
								name : {
									rule : function(str){
										str = UI.trim(str);
										var length = str.length,w=str.split('');
										//if (length == 0) return _('����һ��Ҫ��');
										if (str.match(/[^\u4e00-\u9fa5\w-\s]/g)) return _('��֧�����ġ���ĸ�����֡��»��߻����');
										if (length < 1 || length > 13) return _('��֧��{0}�����ġ���ĸ�����֡��»��߻����','1-13');
									},
									noIco : true
								},
								priv : {
									noIco : true
								}
							},
							messages : function(el){
								return el.parentNode.parentNode.lastChild;
							},
							success : function(data){
								data.locked = $('priv').checked ? 0 : 1;
								MI.List.listFollowCreateSave(data);
							}
						});
					}
				});
				MI.Bos('btnListFollowShow');
			}
		});
	},
	listFollowSave : function(account){
		var Self = this,
			body = $('fotoList'),
			li = $$(body,'.myCreateList label input'),
			ids = [],
			exits = [];
		UI.each(li,function(o){
			if (o.checked){
				ids.push(o.value);
			}
			else if (UI.A(o,'inlist')) {
				exits.push(o.value);
			}
		});
		if (ids.length || exits.length){
			UI.ajax({
				url : Self.url.joins,
				data : {lids:ids.join(','),exits:exits.join(','),account:account},
				success : function(){
					MI.tip(_('����ɹ�'));
				}
			});
			if (Self.listCache[Self.listAccount]) {
				Self.listCache[Self.listAccount].info[id].inlist = true;
			}
		}
		else {
			MI.dialog.hide();
		}
		MI.Bos('btnListFollowSave');
	},
	listFollowCreate : function(){
		var body = $('fotoList'),
			el = $$(body,'.createlistWrap a')[0],
			name = $$(body,'.createlistWrap .createList input')[0];
		UI.hide(el);
		UI.show(UI.next(el));
		MI.focus(name);
		MI.Bos('btnListFollowCreate');
	},
	listFollowCreateCancel : function(){
		var body = $('fotoList'),
			el = $$(body,'.createlistWrap .createList a')[0],
			error = $$(body,'.createlistWrap .createList .error')[0],
			priv = $('priv'),
			P = el.parentNode.parentNode.parentNode;
		UI.hide(P);
		UI.show(UI.prev(P));
		if (error){
			error.innerHTML = '';
		}
		if (priv){
			priv.click();
		}
		MI.Bos('btnListFollowCreateCancel');
	},
	listFollowCreateSave : function(data){
		var Self = this,
			body = $('fotoList'),
			el = $$(body,'.createlistWrap .createList a')[0],
			priv = $('priv'),
			P = el.parentNode.parentNode.parentNode,
			list = $$(body,'.myCreateList')[0],
			name = $('name').value;
		if (list){
			$('name').value = '';
			UI.prepend(UI.html('<label for="list_' + data.createId + '" title="' + name + '"><input type="checkbox" id="list_' + data.createId + '" class="check1" checked value="' + data.createId + '">' + name + (data.locked ? '<em class="ico_slock"></em>' : '') + '</label>')[0],list);
		}
		UI.hide(P);
		UI.show(UI.prev(P));
		if (list.childNodes.length >= Self.listMaxNum){
			UI.hide($$(body,'.createlistWrap a')[0]);
		}
		if (priv){
			priv.click();
		}
		MI.Bos('btnListFollowCreateSave');
	},
	listJoin : function(id,account,call){
		var Self = this;
		UI.ajax({
			url : Self.url.join,
			data : {lid:id,accounts:account},
			success : call
		});
		if (Self.listCache[Self.listAccount]) {
			Self.listCache[Self.listAccount].info[id].inlist = true;
		}
		MI.Bos('btnListJoin');
	},
	listExit : function(id,account,call){
		var Self = this;
		UI.ajax({
			url : Self.url.exit,
			data : {lid:id,accounts:account},
			success : call
		});
		if (Self.listCache[Self.listAccount]) {
			Self.listCache[Self.listAccount].info[id].inlist = false;
		}
		MI.Bos('btnListExit');
	},
	listExitHis : function(name,id){
		var Self = this;
		name = name ? MI.string.cut(name,6) : ''; 
		MI.confirm({
			type : 'error',
			title : _('ȷ��Ҫ�˳���{0}��������',name),
			content : _('�˳��󽫼����㱻���˷��ֺ������ļ���Ŷ'),
			confirm : function(){
				Self.listExit(id,MI.user.account,function(data){
					data = MI.json(data);
					if (data.result == 0){
						MI.Bos('btnListSelfExit');
						MI.tip(_('�˳��ɹ�'),function(){
							document.location.reload();
						});
					}
					else if(data.msg) {
						MI.alert(data.msg);
					}
				});
			}
		});
	},
	listShow : function(data){
		var Self = this,
			data = data || Self.listCache[Self.listAccount],
			html = [],
			index = 0;
		for (var i in data.info) {
			html.push('<li><label for="list_' + i + '" title="' + data.info[i].name + '"><input type="checkbox"' + (data.info[i].inlist ? ' checked' : '') + ' name="inputlist" id="list_' + i + '" class="check1" value="' + i + '">' + MI.string.cut(data.info[i].name,14) + (data.info[i].locked ? '<em class="ico_slock"></em>' : '') + '</label></li>');
			index++;
		}
		Self._listCont.innerHTML = html.join('');
		Self._listCont.style.cssText = index > 11 ? 'white-space:nowrap;overflow:auto;overflow-x:hidden;height:250px' : '';
		UI.each($$(Self._listCont,'input'),function(o){
			o.onclick = function(){
				var T = this,
					P = T.parentNode,
					id = this.value,
					account = Self.listAccount,
					curLi,
					curLoaded;
				UI.addClass(P,'loading');
				setTimeout(function(){
					if (curLoaded){
						UI.removeClass(P,'loading');
					}
				},400);
				if (this.checked) {
					Self.listJoin(id,account,callBack);
				}
				else {
					Self.listExit(id,account,callBack);
				}
				curLi = T;

				function callBack(data){
					data = MI.json(data);
					curLoaded = 1;
					UI.removeClass(curLi.parentNode,'loading');
					if (data.result != 0){
						MI.alert(data.msg);
						Self.listCache[Self.listAccount].info[id].inlist = !Self.listCache[Self.listAccount].info[id].inlist;
					}
				}
			}
		});

		if (index >= Self.listMaxNum) {
			UI.hide(Self._listNew.parentNode);
		}
		else {
			UI.show(Self._listNew.parentNode);
		}
		UI.toggleClass(Self.listTarget,'open');
		UI.after(Self._list,Self.listTarget);
		UI.show(Self._list);
		Self.listDisplay = 1;
		MI.Bos('btnListButton');
	},
	listHide : function(){
		var Self = this;
		if (Self.listDisplay) {
			UI.removeClass(Self.listTarget,'open');
			UI.hide(Self._list);
			Self.listDisplay = 0;
		}
	},
	follow : function(id,el,call){
		var Self = this;
		if (!el.sending) {
			var isDel = UI.hasClass(el,'btn_delRss'),type = isDel ? '2' : '1';
			UI.ajax({
				url : Self.url.follow,
				data : {lid:id,type:type,r:MI.random()},
				success : function(data){
					data = MI.json(data);
					if (data.result == 0) {
						/*if (del) {
							var Parent = el.parentNode;
							UI.animate(Parent,'opacity',0,function(){
								var ct = Parent.parentNode;
								UI.remove(Parent);
								//todo Ϊ��ʱ��ˢ����������list�б�
							});
						}*/
						//else {
							el.className = isDel ? 'btn_addRss' : 'btn_delRss';
							el.value = isDel ? _('��������') : _('ȡ������');
							//ˢ������������
							MI.countNum($('listListenNum_' + id),isDel ? -1 : 1);
						//}
						if (call) {
							call(!isDel); //isFollow
						}
					}
					else{
						MI.alert(data.msg);
					}
					el.sending = 0;
				}
			});
		}
		el.sending = 1;
		MI.Bos('btnListFollow');
	},
	add : function(){
		var Self = this;
		if (Self.build) {
			Self.build();
		}

		//Form
		Self._name.value = Self._descrip.value = Self._tags.value = Self._lid.value = '';
		Self._confirm.innerHTML = _('ȷ��');
		Self._privA.checked = true;
		UI.A(Self._form,'action',Self.url.add);

		if (Self.validate) {
			Self.validate.clearMessage();
		}
		Self.call = Self.addCall;

		MI.dialog.show({
			title : '<h1 class="DmainTit">' + _('��������') + '</h1>',
			html : Self._form,
			width : 500
		});
		setTimeout(function(){
			Self._name.focus();
		},0);
		MI.Bos('btnListAdd');
	},
	edit : function(id,name,descrip,priv,tags){
		var Self = this;
		if (Self.build) {
			Self.build();
		}

		//Form
		Self._name.value = name;
		Self._descrip.value = descrip;
		Self._tags.value = tags || '';
		Self._lid.value = id;
		Self._confirm.innerHTML = _('ȷ��');
		if(priv == 1){
			Self._privB.checked = true;
		}
		else {
			Self._privA.checked = true;
		}
		UI.A(Self._form,'action',Self.url.edit);

		if (Self.validate) {
			Self.validate.clearMessage();
		}
		Self.call = Self.editCall;

		MI.dialog.show({
			title : '<h1 class="DmainTit">' + _('�༭����') + '</h1>',
			html : Self._form,
			width : 500
		});
		setTimeout(function(){
			MI.focus(Self._name);
		},0);
		MI.Bos('btnListEdit');
	},
	del : function(id){
		var Self = this,li = $(id);
		MI.confirm({
			type:'error',title:_('ȷ��Ҫɾ����'),content:_('ɾ�������󽫲��ɻָ�'),
				confirmTxt:_('ȷ��'),confirm:function(){
				//if (!Self.xhr.del) {
					UI.ajax({
						url : Self.url.del,
						data : {lid:id,r:MI.random()},
						success : function(data){
							data = MI.json(data);
							if (data.result == 0) {
								MI.dialog.hide();
								if (li) {
									UI.animate(li,'opacity',0,function(){
										UI.remove(li);
										if ($('pageNav')) {
											MI.bottom('pageNav');
										}
									});
								}
								//Self.xhr.del = 0;
								if (Self.delCall) {
									Self.delCall();
								}
							}
						}
					});
				//}
				//Self.xhr.del = 1;
			},cancelTxt:_('ȡ��'),cancel:function(){
				
			}
		});
		MI.Bos('btnListDel');
	}
}