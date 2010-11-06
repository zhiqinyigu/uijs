/**
 * MI.List List分组
 * @namespace MI.List List分组
 * @type Object
 */
MI.List = {
	listMaxNum : 20, //List Max Num
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
		exit : '/asyn/exitlist.php'
	},
	build : function(){
		var Self = this;
		//Css
		UI.css('.tbAddList .inputTxt{width:170px; border:1px solid #86A1B4;}\
			.tbAddList .inputNum{width:375px;}\
			.tbAddList .inputArea{width:375px; height:75px;border:1px solid #86A1B4;}\
			.tbAddList{padding:15px 0 10px;line-height:21px}.tbAddList td span{margin-left:5px;vertical-align:top}\
			.tbAddList .btn2{margin-right:12px;}');

		//Dom
		Self._form = UI.html('<form action="' + Self.url.add + '" method="post" id="listForm" onsubmit="return false" style="display:none"><div class="tbAddList"><table border="0" cellspacing="0" cellpadding="0">\
			<tbody><tr><td>名称：</td><td><input type="text" name="name" id="name" class="inputTxt"><span></span></td></tr>\
			<tr><td>描述：</td><td><textarea class="inputArea" name="descrip" id="descrip"></textarea><p class="cNote">140字以内</p></td></tr>\
			<tr><td></td><td><button type="submit" class="btn2">确定</button><button type="button" class="btn2">取消</button></td></tr>\
		</tbody></table></div><input type="hidden" id="lid" name="lid" /><b></b></form>')[0];
		Self._btn = $$(Self._form,'button');
		Self._confirm = Self._btn[0];
		Self._cancel = Self._btn[1];
		UI.append(Self._form,document.body);
		Self._name = $('name');
		Self._descrip = $('descrip');
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
								if (length == 0) return '这里一定要填';
								if (str.match(/[^\u4e00-\u9fa5\w-]/g)) return '<br>仅支持中文、字母、数字、下划线或减号';
								if (length < 1 || length > 13) return '<br>仅支持1-13个中文、字母、数字、下划线或减号';
							},
							noIco : true
						},
						descrip : {
							rule : function(str){
								if (str.length > 140) return '140字以内';
							},
							noIco : true
						},
						lid : {
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
		var Self = this;
		if (Self.listTarget != el) {
			Self.listHide();
		}
		Self.listTarget = el;
		Self.listAccount = account;
		if (!Self._list) {
			//Dom
			Self._list = UI.html('<div class="listFun"><ul></ul><div class="newList"><a href="#">创建List</a></div></div>')[0];
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
				if (!Self.xhr.list) {
					UI.get(Self.url.list,'account=' + account + '&r=' + MI.random(),function(data){
						data = MI.json(data);
						if (data.result == 0) {
							Self.listCache[account] = data;
							Self.listShow(data);
						}
						Self.xhr.list = 0;
					});
				}
				Self.xhr.list = 1;
			}
		}
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
	},
	listShow : function(data){
		var Self = this,
			data = data || Self.listCache[Self.listAccount],
			html = [],
			index = 0;
		for (var i in data.info) {
			html.push('<li><label for="list_' + i + '" title="' + data.info[i].name + '"><input type="checkbox"' + (data.info[i].inlist ? ' checked' : '') + ' name="inputlist" id="list_' + i + '" class="check1" value="' + i + '">' + MI.string.cut(data.info[i].name,14) + '</label></li>');
			index++;
		}
		Self._listCont.innerHTML = html.join('');
		Self._listCont.style.cssText = index > 11 ? 'white-space:nowrap;overflow:auto;overflow-x:hidden;height:250px' : '';
		UI.each($$(Self._listCont,'input'),function(o){
			o.onclick = function(){
				var id = this.value,account = Self.listAccount;
				if (this.checked) {
					Self.listJoin(id,account);
				}
				else {
					Self.listExit(id,account);
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
	},
	listHide : function(){
		var Self = this;
		if (Self.listDisplay) {
			UI.removeClass(Self.listTarget,'open');
			UI.hide(Self._list);
			Self.listDisplay = 0;
		}
	},
	follow : function(id,el,del){
		var Self = this;
		if (!el.sending) {
			var isDel = del || UI.hasClass(el,'btn_delRss'),type = isDel ? '2' : '1';
			UI.ajax({
				url : Self.url.follow,
				data : {lid:id,type:type,r:MI.random()},
				success : function(data){
					data = MI.json(data);
					if (data.result == 0) {
						if (del) {
							var Parent = el.parentNode;
							UI.animate(Parent,'opacity',0,function(){
								var ct = Parent.parentNode;
								UI.remove(Parent);
								//todo 为空时，刷新我收听的list列表
							});
						}
						else {
							el.className = isDel ? 'btn_addRss' : 'btn_delRss';
							el.value = isDel ? '订阅List' : '取消订阅';
							//刷新List收听数
							MI.countNum($('listListenNum_' + id),isDel ? -1 : 1);
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
	},
	add : function(){
		var Self = this;
		if (Self.build) {
			Self.build();
		}

		//Form
		Self._name.value = Self._descrip.value = Self._lid.value = '';
		Self._confirm.innerHTML = '确定';
		UI.A(Self._form,'action',Self.url.add);

		if (Self.validate) {
			Self.validate.clearMessage();
		}
		Self.call = Self.addCall;

		MI.dialog.show({
			title : '<h1 class="DmainTit">创建List</h1>',
			html : Self._form,
			width : 480
		});
		setTimeout(function(){
			Self._name.focus();
		},0);
	},
	edit : function(id,name,descrip){
		var Self = this;
		if (Self.build) {
			Self.build();
		}

		//Form
		Self._name.value = name;
		Self._descrip.value = descrip;
		Self._lid.value = id;
		Self._confirm.innerHTML = '确定';
		UI.A(Self._form,'action',Self.url.edit);

		if (Self.validate) {
			Self.validate.clearMessage();
		}
		Self.call = Self.editCall;

		MI.dialog.show({
			title : '<h1 class="DmainTit">编辑List</h1>',
			html : Self._form,
			width : 480
		});
		setTimeout(function(){
			MI.focus(Self._name);
		},0);
	},
	del : function(id){
		var Self = this,li = $(id);
		MI.confirm({
			type:'error',title:'确定要删除吗？',content:'删除List后将不可恢复，你在List中收录的人员信息也将丢失',
				confirmTxt:'确定',confirm:function(){
				if (!Self.xhr.del) {
					UI.ajax({
						url : Self.url.del,
						data : {lid:id,r:MI.random()},
						success : function(data){
							data = MI.json(data);
							if (data.result == 0) {
								MI.dialog.hide();
								UI.animate(li,'opacity',0,function(){
									UI.remove(li);
									if ($('pageNav')) {
										MI.bottom('pageNav');
									}
								});
								Self.xhr.del = 0;
							}
						}
					});
				}
				Self.xhr.del = 1;
			},cancelTxt:'取消',cancel:function(){
				
			}
		});
	}
}