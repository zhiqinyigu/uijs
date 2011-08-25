/**
 * MI.List
 * Author : xhlv@tencent.com
 * Datetime : 
 * Last Eidt: 
*/
/**
 * MI.List List分组
 * @namespace MI.List List分组
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
		document.location.href = 'http://t.qq.com/list_user.php?lid=' + data.createId;
	},
	editCall :function(){ //Call Back Function
		document.location.reload();
	},
	delCall : null, //Call Back Function
	url : { //Ajax Url
		add : MI.url.listAdd,
		edit : MI.url.listEdit,
		del : MI.url.listDel,
		follow : MI.url.listFollow,
		list : MI.url.list,
		join : MI.url.listJoin,
		joins : MI.url.listJoins,
		exit : MI.url.listExit
	},
	defaultList : {
		'名人' : 0,
		'有趣用户' : 0,
		'好友' : 0,
		'同事' : 0,
		'同学' : 0,
		'家人亲戚' : 0
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
			<tbody><tr><th>' + _('名称：') + '</th><td><input type="text" name="name" id="name" class="inputTxt"><p class="cNote">' + _('{0}个中文、字母、数字、下划线或减号','1-13') + '</p></td></tr>\
			<tr><th>' + _('描述：') + '</th><td><textarea class="inputArea" name="descrip" id="descrip"></textarea><p class="cNote">' + _('{0}字以内',100) + '</p></td></tr>\
			<tr><th>' + _('标签：') + '</th><td class="tb_tag"><input type="text" class="inputTxt" name="listTags" id="listTags"><p class="cNote">' + _('每个标签{0}个字以内，以空格间隔，最多填写{1}个',8,10) + '</p></td></tr>\
			<tr><th>' + _('浏览权限：') + '</th><td class="viewRight"><label for="priv"><input type="radio" checked name="priv" id="priv" value="0" class="check1"><b></b>' + _('所有人可见') + '</label><label for="privB"><input type="radio" name="priv" id="privB" value="1" class="check1"><b></b>' + _('只有我自己可见<span class="cNote">（且不通知被收录者）</span>') + '</label></td></tr>\
			<tr><th></th><td><button type="submit" class="btn2">' + _('确定') + '</button><button type="button" class="btn2">' + _('取消') + '</button></td></tr>\
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
								if (length == 0) return _('这里一定要填');
								if (str.match(/[^\u4e00-\u9fa5\w-\s]/g)) return _('仅支持中文、字母、数字、下划线或减号');
								if (length < 1 || length > 13) return _('仅支持{0}个中文、字母、数字、下划线或减号','1-13');
							},
							noIco : true
						},
						descrip : {
							rule : function(str){
								if (str.length > 100) return _('{0}字以内',100);
							},
							noIco : true
						},
						listTags : {
							rule : function(str){
								str = UI.trim(str);
								var length = str.length,w=str.split('');
								if (str.match(/[^\u4e00-\u9fa5\w\s]/g)) return _('仅支持中文、字母、数字');
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
			Self._list = UI.html('<div class="listFun"><ul></ul><div class="newList"><a href="#">' + _('创建名单') + '</a></div></div>')[0];
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
					MI.ajax({
						url : Self.url.list,
						type : 'get',
						data : 'account=' + account + '&r=' + MI.random(),
						success : function(data){
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
						}
					});
				//}
				//Self.xhr.list = 1;
			}
		}
	},
	listFollowCss : 0,
	listFollowReset : function(){ //状态重置
		var Self = this;
		if (!Self.listFollowCss){
			UI.css('.foedSets{width:'+ ((window.MILang=="en_US")?'400px' : '360px') +';padding:20px 10px 8px}.foedSets .foset{width:70px;overflow:hidden;position:relative;margin-top:-44px;float:right}.tbSendMsg .foedSets table{clear:both;}.tbSendMsg .foedSets th{padding-right:3px}.foedSets td{line-height:19px}.foedSets .inputTxt{width:180px}.foedSets .DcreateList .inputTxt{width:218px}.foedSets .funBox{padding-top:10px;text-align:right}.D .foedSets label{position:static;padding:0;color:#333;white-space:nowrap}.Dlist{position:relative;float:left;margin-right:5px}.Dlist .citySel{width:161px;border-color:#ADB6C5}.DmyList{display:none;clear:both;position:absolute;top:20px;left:0;width:190px;padding:5px 0;border:1px solid #ADB6C5;border-top:0;background:#fff}.D .cityDropDis .DmyList{display:block}.D .DmyList label{display:block;width:180px;margin:0 auto;overflow:hidden}.DcreateList{clear:both;width:'+ ((window.MILang=="en_US")?'290px' : '250px') +';overflow:hidden;margin-top:10px;padding:8px 10px;border:1px solid #F4E4B4;background:#FFFFE9}.DcreateList label{margin-right:15px}.DcreateList p{padding:2px 0;white-space:nowrap}.DcreateList .btn1{margin:0 10px 0 5em}');
			UI.EA(document.body,'click',function(){
				var list = $$('.foedSets .Dlist')[0];
				if (list){
					UI.removeClass(list,'cityDropDis');
				}
			});
			Self.listFollowCss = 1;
		}
		Self.listFollowCreateAuto = 0;
	},
	listFollow : function(id,opt){ //收听成功，加入名单
		var Self = this;
		opt = opt || {};
		Self.listFollowReset();
		MI.ajax({
			url : Self.url.list,
			type : 'get',
			data : 'position=follow&account=' + id + '&r=' + MI.random(),
			success : function(data){
			data = MI.json(data);
				if (data.result == 0){
					var html = [],
						index = 0;
					for (var i in data.info){
						html.push('<label for="list_' + i + '" title="' + data.info[i].name + '"><input type="checkbox" id="list_' + i + '" class="check1" value="' + i + '"' + (data.info[i].inlist ? ' checked inlist="1"' : '') + (!data.info[i].inlist && data.info[i].userNum >= Self.listMaxUserNum ? ' disabled title="' + _('成员数超过上限') + '"' : '') + '>' + data.info[i].name + (data.info[i].locked ? '<em class="ico_slock"></em>' : '') + '</label>');
						index++;
						if (Self.defaultList[data.info[i].name] != null)
						{
							Self.defaultList[data.info[i].name] = 1;
						}
					}
					for (var i in Self.defaultList){
	                                    if(index >= Self.listMaxNum || index >= 6)
	                                        {
	                                            break;
	                                        }
						if (Self.defaultList[i] == 0)
						{
							html.push('<label for="' + i + '" title="' + i + '"><input type="checkbox" defaultlist="1" id="' + i + '" class="check1" value="' + i + '"' + '>' + i + '<em class="ico_slock"></em>' + '</label>');
							index++;						
						}
					}
					
					MI.dialog.show({
						title : '<h1 class="DmainTit">' + (opt.title || _('收听 {0} 成功',data.nick || id)) + '</h1>',
						width : 450,
						start : function(){
							Self.listFollowListTxt();
							/*setTimeout(function(){
								MI.focus($('bkName'));
							},0);*/
						},
						closeEnd : function(){		
							if (MI.isS && !opt.bkname) {
								var closeCnt = parseInt(MI.S('option_iUserCloseCnt_' + MI.user.account));
								if (isNaN(closeCnt)) {
									closeCnt = 1;
								}
								else {
									if (3 < closeCnt) {
										closeCnt = 1;
									}
									else {
										closeCnt++;
									}
								}
								MI.S('option_iUserCloseCnt_' + MI.user.account, closeCnt);
							}
						},
						end : function(){
							MI.Bos('btnListFollowClose','',0.01);
							UI.remove($('foedSets'));
							if (MI.isS && !opt.bkname) {
								var closeCnt = parseInt(MI.S('option_iUserCloseCnt_' + MI.user.account));
								if (!isNaN(closeCnt) && closeCnt == 3) {
									MI.S('option_iUserCloseCnt_' + MI.user.account, 0);
									MI.confirm({
										title: _('以后不再提示设置备注和名单分组？'),
										confirm: function(){
											MI.ajax({
												url : MI.url.otherSave,
												type : 'post',
												data : {ft : 0}
											});
											MI.dialog.hide();
										}
									});
								}
							}
						},
						html : '<div class="foedSets" id="foedSets">'
						+ (opt.foset || '<div class="foset">[<a href="http://t.qq.com/setting_others.php#co" target="_blank" onclick="MI.Bos(\'btnListFollowSet\')">' + _('收听设置') + '</a>]</div>') + '<table border="0" cellspacing="0" cellpadding="0"><tbody>'
							+ (opt.bkname ||
							'<tr><th>' + _('填写备注姓名：') + '</th><td>\
								<form action="/404' + Self.url.joins + '" method="post" id="listFollowSaveForm" onsubmit="return false">\
									<span><input type="text" class="inputTxt" value="" name="bkName" id="bkName"><br><span></span></span>\
								</form>\
							</td></tr>')
							+ '<tr><th>' + _('选择名单分组：') + '</th><td>\
								<div class="Dlist">\
									<a href="#" class="citySel"><span></span></a>\
									<div class="DmyList">' + html.join('') + '</div>\
								</div>\
								' + (index < Self.listMaxNum ? '<a href="#" onclick="MI.List.listFollowCreate();return false">' + _('新建名单') + '</a>' : '') + '\
								<div class="DcreateList" style="display:none">\
									<form action="' + Self.url.add + '" method="post" id="listFollowForm" onsubmit="return false">\
										<p><span><input type="text" id="name" name="name" class="inputTxt"></span><br><span></span></p>\
										<p>' + _('浏览权限：') + '<label><input type="radio" class="check1" id="priv" name="priv" value="0" checked>' + _('所有人可见') + '</label><label><input type="radio" class="check1" name="priv" id="privB" value="1">' + _('仅自己可见') + '</label><span></span></p>\
										<p><button class="btn1" type="submit">' + _('创建') + '</button><a href="#" onclick="MI.List.listFollowCreateCancel();return false">' + _('取消') + '</a></p>\
									</form>\
								</div>\
							</td></tr>\
							<tr><th></th><td class="funBox">' + (opt.bkname || '<div class="left" style="position: relative; left: -87px; top: 3px;"><label><input type="checkbox" id="idUserCanelFunBox" class="check1" onclick="MI.Bos(\'btnListCancelTips\')">' + _('不再弹出') + '</label></div>') + '<button class="btn1" onclick="' + (opt.bkname || 'if(MI.isS){if($(\'idUserCanelFunBox\').checked){MI.ajax({url:MI.url.otherSave,type:\'post\',data:{ft:0}});}MI.S(\'option_iUserCloseCnt_\' + MI.user.account, 0);}') + 'MI.List.listFollowSave(\'' + id + '\')">' + _('完成') + '</button></td></tr>\
						</tbody></table></div>'
						/*html : '<div class="fotoList" id="fotoList"><div class="foset">[<a href="/setting_others.php#co" onclick="MI.Bos(\'btnListFollowSet\')">' + _('收听设置') + '</a>]</div><h4>' + _('为“{0}”选择名单：',data.nick || id) + '</h4>\
		<div class="myCreateList clear">' + html.join('') + '</div>\
		<div class="createlistWrap">\
			' + (index < Self.listMaxNum ? '<a href="#" class="ffsong" onclick="MI.List.listFollowCreate();return false">+' + _('创建新名单') + '</a>' : '') + '\
			<div class="createList" style="display:none">\
				<form action="' + Self.url.add + '" method="post" id="listFollowForm" onsubmit="return false">\
					<p><span><input type="text" id="name" name="name" class="inputTxt"></span><button type="submit" class="btn2">' + _('创建') + '</button><a href="#" onclick="MI.List.listFollowCreateCancel();return false">' + _('取消') + '</a><br' + (UI.B.ie ? ' style="display:none"' : '') + '><span></span></p>\
					<p>' + _('浏览权限：') + '<label><input type="radio" class="check1" id="priv" name="priv" value="0" checked>' + _('所有人可见') + '</label><label><input type="radio" class="check1" name="priv" value="1">' + _('仅自己可见') + '</label><span></span></p>\
				</form>\
			</div>\
		</div>\
		<div class="btnBox"><button class="btn2" onclick="MI.List.listFollowSave(\'' + id + '\')">' + _('保存') + '</button><a href="#" onclick="MI.Bos(\'btnListFollowCancel\');MI.dialog.hide();return false">' + _('暂不收录') + '</a></div></div>'*/
					});
					
					//Event
					$$('.foedSets .Dlist a')[0].onclick = function(e){
						UI.toggleClass(this.parentNode,'cityDropDis');
						UI.E(e).stop();
						return false;
					}
					$$('.foedSets .DmyList')[0].onclick = function(e){
						Self.listFollowListTxt();
						UI.E(e).stop();
					}
					
					MI.app({
						Validate : function(){
							Self.followValidate = new MI.Validate({
								id : 'listFollowForm',
								inputs : {
									name : {
										rule : function(str){
											str = UI.trim(str);
											var strArr = str.split(",");
											if (strArr.length > Self.defaultList.length)
											{
												return _('仅支持中文、字母、数字、下划线或减号');
											}
											for (var i in strArr)
											{
												str = strArr[i];
												var length = MI.string.length(str),w=str.split('');
												//if (length == 0) return _('这里一定要填');
												if (str.match(/[^\u4e00-\u9fa5\w-\s]/g)) return _('仅支持中文、字母、数字、下划线或减号');
												if (length < 1 || length > 26) return _('仅支持{0}个中文、字母、数字、下划线或减号','1-13');
											}
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
									Self.listFollowCreateSave(data);
									Self.listFollowListTxt();
									if (Self.listFollowCreateAuto){
										Self.listFollowSave(id);
									}
								}
							});
							new MI.Validate({
								id : 'listFollowSaveForm',
								inputs : {
									bkName : {
										rule : function(str){
											var length = str.length,w=str.split('');
											if (str.match(/[^\u4e00-\u9fa5\w-]/g)) return _('仅支持中文、字母、数字、下划线或减号');
											if (length > 12) return _('仅支持{0}个中文、字母、数字、下划线或减号','1-12');
										},
										noIco : true
									}
								},
								messages : function(el){
									return el.parentNode.lastChild;
								},
								success : function(data){
								}
							});
						}
					});
					MI.Bos('btnListFollowShow','',0.01);
				}
			}
		});
	},
	listFollowListTxt : function(){ //显示已选的名单
		var checked = [],
			input = $$('.foedSets .DmyList input');
		UI.each(input,function(o,i){
			if (o.checked){
				checked.push('<em>' + UI.text(o.parentNode) + '</em>');
			}
		});
		$$('.foedSets .Dlist a')[0].innerHTML = (checked.length ? checked.join(',') : '') + '<span></span>';
	},
	listFollowSaveCall : null, // 保存成功后的回调函数
	listFollowSave : function(account){
		var Self = this,
			body = $('foedSets'),
			li = $$(body,'.DmyList label input'),
			ids = [],
			exits = [],
			bkName = '';
		if ($('bkName')){
			bkName = $('bkName').value;
		}
		var namearr = [];
		for (var i in li)
		{
			if (li[i].checked && Self.defaultList[li[i].value] == 0)
			{
				namearr.push(li[i].value);
			}
		}
		if (namearr.length > 0)
		{
				var namestr = namearr.join(",");
				$('name').value = namestr;
				$('priv').checked = false;
				$('privB').checked = true;
				Self.listFollowCreateAuto = 1;
				$$(body,'.DcreateList button')[0].click();
				return;		
		}
		
		
		if ($$(body,'.DcreateList')[0].style.display != 'none'){ //自动创建未保存的名单
			Self.listFollowCreateAuto = 1;
			$$(body,'.DcreateList button')[0].click();
			return;
		}
		UI.each(li,function(o){
			if (o.checked){
				ids.push(o.value);
			}
			else if (UI.A(o,'inlist')) {
				exits.push(o.value);
			}
		});
		if (ids.length || exits.length || bkName){
			MI.ajax({
				url : Self.url.joins,
				data : {lids:ids.join(','),exits:exits.join(','),bkName:bkName,account:account},
				success : function(){
					if (Self.listFollowSaveCall){
						Self.listFollowSaveCall(account);
					}
					MI.tip(_('保存成功'));
				}
			});
			if (Self.listCache[Self.listAccount]) {
				Self.listCache[Self.listAccount].info[id].inlist = true;
			}
		}
		else {
			MI.dialog.hide();
		}
		MI.Bos('btnListFollowSave','',0.01);
	},
	listFollowCreate : function(){
		var body = $('foedSets'),
			el = UI.prev($$(body,'.DcreateList')[0]),
			name = $$(body,'.DcreateList input')[0];
		UI.show(UI.next(el));
		//MI.focus(name);
		MI.Bos('btnListFollowCreate');
	},
	listFollowCreateAuto : 0, //自动创建未保存的名单
	listFollowCreateCancel : function(){
		var body = $('foedSets'),
			el = $$(body,'.DcreateList a')[0],
			error = $$(body,'.DcreateList .error')[0],
			priv = $('priv'),
			P = el.parentNode.parentNode.parentNode;
		UI.hide(P);
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
			body = $('foedSets'),
			el = $$(body,'.DcreateList a')[0],
			priv = $('priv'),
			P = el.parentNode.parentNode.parentNode,
			list = $$(body,'.DmyList')[0],
			name = $('name').value;
		if (list){
			$('name').value = '';
			
			if (typeof(data.createId) == "object")
			{
				var nameArr = name.split(",");
				for (var i in nameArr)
				{
					name = nameArr[i];
				
					if (Self.defaultList[name] != null)
					{
						labelArr = $$(body,'.DmyList label');
						for (var i in labelArr)
						{
							if (labelArr[i].title == name)
							{
								labelArr[i].innerHTML = '<input type="checkbox" id="list_' + data.createId[name] + '" class="check1" checked value="' + data.createId[name] + '">' + name + (data.locked ? '<em class="ico_slock"></em>' : '');
								UI.A(labelArr[i], 'for', 'list_'+ data.createId[name])
								Self.defaultList[name] = 1;
								break;
							}
						}
					}else
					{
						UI.prepend(UI.html('<label for="list_' + data.createId[name] + '" title="' + name + '"><input type="checkbox" id="list_' + data.createId[name] + '" class="check1" checked value="' + data.createId[name] + '">' + name + (data.locked ? '<em class="ico_slock"></em>' : '') + '</label>')[0],list);
					}
				}
			}else
			{
	
					if (Self.defaultList[name] != null)
					{
						labelArr = $$(body,'.DmyList label');
						for (var i in labelArr)
						{
							if (labelArr[i].title == name)
							{
								labelArr[i].innerHTML = '<input type="checkbox" id="list_' + data.createId + '" class="check1" checked value="' + data.createId + '">' + name + (data.locked ? '<em class="ico_slock"></em>' : '');
								UI.A(labelArr[i], 'for', 'list_'+ data.createId)
								Self.defaultList[name] = 1;
								break;
							}
						}
					}else
					{
						UI.prepend(UI.html('<label for="list_' + data.createId + '" title="' + name + '"><input type="checkbox" id="list_' + data.createId + '" class="check1" checked value="' + data.createId + '">' + name + (data.locked ? '<em class="ico_slock"></em>' : '') + '</label>')[0],list);
					}
		
			}
		}
		UI.hide(P);
		if (list.childNodes.length >= Self.listMaxNum){
			UI.hide($$(body,'.DcreateList a')[0]);
		}
		if (priv){
			priv.click();
		}
		MI.Bos('btnListFollowCreateSave');
	},
	listJoin : function(id,account,call){
		var Self = this;
		MI.ajax({
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
		MI.ajax({
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
			title : _('确定要退出“{0}”名单吗？',name),
			content : _('退出后将减少你被他人发现和收听的几率哦'),
			confirm : function(){
				Self.listExit(id,MI.user.account,function(data){
					data = MI.json(data);
					if (data.result == 0){
						MI.Bos('btnListSelfExit');
						MI.tip(_('退出成功'),function(){
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
			MI.ajax({
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
								//todo 为空时，刷新我收听的list列表
							});
						}*/
						//else {
							el.className = isDel ? 'btn_addRss' : 'btn_delRss';
							el.value = isDel ? _('订阅名单') : _('取消订阅');
							//刷新名单收听数
							MI.countNum($('listListenNum_' + id),isDel ? -1 : 1);
						//}
						if (call) {
							call(!isDel); //isFollow
						}
					}
					else{
						try{
							if (parent.MI && parent.MI.alert){
								parent.MI.alert(data.msg);
							}
							else {
								MI.alert(data.msg);
							}
						}catch(e){}
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
		Self._confirm.innerHTML = _('确定');
		Self._privA.checked = true;
		UI.A(Self._form,'action',Self.url.add);

		if (Self.validate) {
			Self.validate.clearMessage();
		}
		Self.call = Self.addCall;

		MI.dialog.show({
			title : '<h1 class="DmainTit">' + _('创建名单') + '</h1>',
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
		Self._confirm.innerHTML = _('确定');
		UI.A(Self._form,'action',Self.url.edit);

		if (Self.validate) {
			Self.validate.clearMessage();
		}
		Self.call = Self.editCall;

		MI.dialog.show({
			title : '<h1 class="DmainTit">' + _('编辑名单') + '</h1>',
			html : Self._form,
			width : 500
		});
		if(priv == 1){
			Self._privB.checked = true;
		}
		else {
			Self._privA.checked = true;
		}
		setTimeout(function(){
			MI.focus(Self._name);
		},0);
		MI.Bos('btnListEdit');
	},
	del : function(id){
		var Self = this,li = $(id);
		MI.confirm({
			type:'error',title:_('确定要删除吗？'),content:_('删除名单后将不可恢复'),
				confirmTxt:_('确定'),confirm:function(){
				//if (!Self.xhr.del) {
					MI.ajax({
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
			},cancelTxt:_('取消'),cancel:function(){
				
			}
		});
		MI.Bos('btnListDel');
	}
}
