MI.TalkListFav = 1;
//收藏
MI.favorites = {
	//缓存分类数据
	favData : null,
	//分类最大数
	maxNum : 10,
	//分类接口请求操作
	remote : function(url,o,addCall,errCall){
		var Self = this;
		//url = 0 时 op = 4 ：获取分组，1：添加分组，2：删除分组 
		//url = 1 时 op=1 添加消息到分类(收藏消息) 2 删除消息分类(到未分类) op=3 修改消息分类
		var sendUrl = ['asyn/favoritemsggroup.php','asyn/favoritemsg.php'][url];
		MI.dialog.display && MI.dialog.showLoad();
		MI.ajax({
			url : sendUrl,
			data : o,
			success : function(data) {
				MI.dialog.hideLoad();
				data = MI.json(data);
				if(data.result == 0) {
					if(url==0) Self.favData = data.info.list;  //只有请求分类数据时才覆盖
					addCall && addCall(data);
				} else {
					if(errCall) {
						errCall(data)
					} else {
						MI.alert(data.msg);
						setTimeout(function(){
							clearTimeout(Self.selectDelay);
							clearTimeout(Self.delayHideDrop);
						},100);	
					}
				}
			}
		});
	},
	//第一次拉取数据
	getFavData : function(callBack){
		var Self = this;
		if(!Self.favData) {
			MI.app({
				Base : function(){
					Self.remote(0,{op:4},callBack);
				}
			});		   
		} else {
			callBack();
		}
	},
	//收藏成功，弹出选择分类浮层
	favSuccess : function(id){
		var Self = this;
		if(!Self._confirm) {
			Self._confirm = UI.html('<div style="" class="popupBox">\
					<div class="popupBoxCon">\
					<h3>' + _('广播收藏已成功！') + '</h3>\
					<div class="popupCon">\
						<a href="#" class="popupDropBtn" type="1"><span></span><em class="btn_ldrop"></em></a>\
						<button class="btn1">' + _('确定') + '</button>\
					</div>\
					</div>\
				</div>')[0];
			Self._cSelect = $$(Self._confirm,'.popupDropBtn')[0];
			Self._cSelectArr = $$(Self._confirm,'.btn_ldrop')[0];
			Self._cDefaultTxt = UI.GT(Self._cSelect,'span')[0];
			Self._cConfirm = $$(Self._confirm,'.btn1')[0];
			Self._cSelect.onclick = function(){
				clearTimeout(Self.selectDelay);
				Self.getFavData(function(){
					Self.showDrop(Self._cSelect);
				});	
				MI.Bos('btnPopSelectFav');
				return false;
			}

			Self._cConfirm.onclick = function(){
				var msgid = UI.A(Self._cSelect,'msgid');
				var groupid = UI.A(Self._cSelect,'groupid');
				Self.remote(1,{'id':msgid,'groupid':groupid,'op':1},function(){
					Self.hideSuccess();
				});
				return false;
			}
			
			//隐藏
			Self._confirm.onmouseover = function(){
				clearTimeout(Self.selectDelay);
			}

			Self._confirm.onmouseout = function(){
				Self.delayHideSelect();
			}
		}

		UI.A(Self._cSelect,'msgid',id);
		Self.resetTarget(Self._cSelect,0,_('选择分类'));
		clearTimeout(Self.selectDelay);
		UI.show(Self._confirm);
		UI.append(Self._confirm,$$($(id),'.msgBox')[0]);
		Self.delayHideSelect();	
	},
	//自动隐藏
	delayHideSelect : function(){
		var Self = this;
		Self.selectDelay = setTimeout(function(){
			UI.hide(Self._confirm);
			//Self.hideDrop();
		},2000)
	},
	hideSuccess : function(){
		var Self = this;
		clearTimeout(Self.selectDelay);
		UI.hide(Self._confirm);
		Self.hideDrop();
	},
	//显示分类选择下拉菜单
	showDrop : function(target){
		var Self = this;

		if(!Self.favData) {
			Self.getFavData(function(){
				Self.showDrop(target);
			});
			return false;
		}
		//点击按钮隐藏
		if(Self._dropTarget == target && Self._drop.style.display != 'none') {
			Self.hideDrop();
			return false;
		};

		var	groupid = UI.A(target,'groupid') || 0,
			msgid = UI.A(target,'msgid'),
			listHtml = '<ul class="favDrop">',
			str = '<li class="magcls"><span class="addCls"><em>╋</em></span><a href="javascript:void(0);">' + _('新建分类') + '</a></li>\
						<li style="display:" class="magcls">\
							<span class="addCls"><em>━</em></span><a class="cancelCls" href="#">' + _('取消分类') + '</a></li>\
						<li style="display:none"><input maxlength="16" type="text" class="inputTxt">\
							<input type="button" value="' + _('创建') + '" class="btn_create"></li>\
						<li class="tip" style="display:none;height:auto;text-align:center;"></li>\
					</ul>';

		for(i in Self.favData) {
			var o = Self.favData[i];
			listHtml += '<li class="' + (o.id == groupid ? 'select' : '') + '"><a href="#" groupid ="' +  o.id + '" title="' + o.name + '">' + o.name + '</a></li>';
		};

		if(!Self._drop) {
			Self._drop = UI.html('<div style="display:" class="popupListBox clear"></div>')[0];
			Self._drop.onmouseover = function(){
				clearTimeout(Self.delayHideDrop);
			}

			Self._drop.onmouseout = function(){
				Self.delayHideDrop = setTimeout(function(){
					Self.hideDrop()},1000);
			}
		}

		Self._drop.innerHTML = listHtml +  str;
		Self._dList = $$(Self._drop,'.favDrop')[0];
		Self._dAdd = $$(Self._drop,'.magcls a')[0];
		Self._dCancel= $$(Self._drop,'.cancelCls')[0];
		Self._dAddTxt= $$(Self._drop,'.inputTxt')[0];
		Self._dConfirm = $$(Self._drop,'.btn_create')[0];
		Self._dTip = $$(Self._drop,'.tip')[0];

		Self._dAdd.onclick = function(){
			UI.show(Self._dAddTxt.parentNode);
			UI.hide(this.parentNode);
			Self._dAddTxt.focus();
		};

		Self._dAddTxt.onkeyup = function(){
			UI.hide(Self._dTip);
		}
		
		//取消消息分类
		Self._dCancel.onclick = function(){
			Self.remote(1,{id:msgid,groupid:groupid,op:2},function(){
				Self.resetTarget(target,0,_('选择分类'));
			});
			MI.Bos('btnCancelFav');
			return false;
		};
		
		//新建分类
		Self._dConfirm.onclick = function(){
			var name = Self._dAddTxt.value,groupid=0;
			if(!UI.trim(name)) return false;
			Self.remote(0,{name:name,op:1},function(data){
				for(i in Self.favData){
					if(Self.favData[i].name == name) groupid = Self.favData[i].id;
				};
				Self.resetTarget(target,groupid,name);
				Self._dAddTxt.value = '';
				MI.favPage && Self.addNewTab(data);
			},function(data){
				Self.setTip(Self._dTip,data.msg,1);
				UI.show(Self._dTip);
			});
			MI.Bos('btnNewFav1');
		};

		//绑定修改分类事件
		UI.each(UI.GT(Self._dList,'a'),function(o){
			var id = UI.A(o,'groupid');
			if(!id) return;
			o.onclick = function(){
				if(!UI.A(target,'type')){  //消息上方下拉选择分类
					Self.remote(1,{'id':msgid,'oldgroupid':groupid,'groupid':id,'op':3},function(){ 
						Self.resetTarget(target,id,o.title);
					});
				} else { //收藏后弹出层
					Self.resetTarget(target,id,o.title);
				}	
				
				MI.Bos('btnChangeFav');
				return false;
			}
		});
		
		(Self.favData.length >= Self.maxNum) && UI.hide(Self._dAdd);
		Self._dCancel.parentNode.style.display = (groupid && MI.favPage) ? 'block' : 'none';
		clearTimeout(Self.delayHideDrop);
		UI.show(Self._drop);
		UI.addClass(UI.GT(target,'em')[0],'lopen');
		UI.append(Self._drop,target.parentNode);
		Self._dropTarget = target;
	},
	resetTarget : function(target,id,txt){
		var Self = this;
		UI.A(target,'groupid',id);
		UI.GT(target,'span')[0].innerHTML = txt;    //设置按钮的分类name和id
		Self.hideDrop();
	},
	hideDrop : function(){
		var Self = this;
		if(!Self._drop) return;
		UI.hide(Self._drop);
		UI.hide(Self._dTip);
		UI.removeClass(UI.GT(Self._dropTarget,'em')[0],'lopen');
		clearTimeout(Self.delayHideDrop);
	},
	setTip : function(el,txt,isError){
		el.innerHTML = isError ? '<span class="error">' + txt + '</span>' : txt;
	},
	addNewTab : function(data,removeName){
		if(!MI.favPage) return false;
		var Self = this,
			_newGroup,
			_list = $$(document.body,'.homeTit .homeTab')[0],
			_more = $$(document.body,'.fav_myfav_top')[0],
			o = data.info.newgroup;
		if(removeName) {
			UI.each(UI.GT(_list,'li span'),function(span){
				if(span.innerHTML == removeName) UI.remove(span.parentNode.parentNode);
			});
		} else if(!isRemove && Self.favData.length < 3) { //超过3个，不继续添加
			_newGroup = UI.html('<li><a href="' + o.href + '"><span>' + o.name + '</span></a></li>')[0];
			_list && UI.append(_newGroup,_list);
		}
		if(_more) _more.innerHTML = '';  //清空更多
	},
	//显示分类管理浮层
	showManage : function(){
		var Self = this,
			listHtml = '<table cellspacing="2" cellpadding="0" border="0" class="magClass"><tbody><tr><th class="clsTit">' + _('分类名称') + '</th><th class="clsTit">' + _('操作') + '</th></tr>';

		if(!Self.favData) {
			Self.getFavData(function(){
				Self.showManage();
			});
			return false;
		}

		if(!Self._ctrlPan) {
			Self._ctrlPan = UI.html('<div class="favManage"><div class="tableWrap"></div>\
				<p style="display:"><span class="addCls"><em>╋</em></span><a class="magcls" href="javascript:void(0)">' + _('新建分类') + '</a></p>\
				<div class="creatCls" style="display:none;">\
					<p><b style="padding-left:3em;"></b><input type="input" maxlength="16" value="" class="inputTxt focuson"></p>\
					<p style="color:#999">\
						<b style="padding-left:3em;"></b>' + _('1-8个中文、字母或数字,最多可建10个类') + '<br>\
					</p>\
					<p class="btnBox"><button class="btn2">' + _('创建') + '</button><a href="#">' + _('取消') + '</a></p>\
				</div>\
				<div class="tip"></div>\
			</div>')[0];
			
			Self._mTable = $$(Self._ctrlPan,'.tableWrap')[0];
			Self._mAdd= $$(Self._ctrlPan,'.magcls')[0];
			Self._mAddDetail = $$(Self._ctrlPan,'.creatCls')[0];
			Self._mAddTxt= $$(Self._mAddDetail,'.inputTxt')[0];
			Self._mConfirm = $$(Self._mAddDetail,'.btn2')[0];
			Self._mCancel= $$(Self._mAddDetail,'.btnBox a')[0];
			Self._mTip = $$(Self._ctrlPan,'.tip')[0];

			Self._mAdd.onclick = function(){
				UI.show(Self._mAddDetail);
				UI.hide(this.parentNode);
				Self._mAddTxt.focus();
				return false;
			}

			Self._mCancel.onclick = function(){
				UI.show(Self._mAdd.parentNode);
				UI.hide(Self._mAddDetail);
				return false;
			}

			Self._ctrlPan.onclick = function(){
				Self.setTip(Self._mTip,'');
			}
			
			//新建分类
			Self._mConfirm.onclick = function(){
				var name = Self._mAddTxt.value;
				if(!UI.trim(name)) return false;
				Self.remote(0,{name:name,op:1},function(data){
					Self.showManage();
					Self.addNewTab(data);
				},function(data){
					Self.setTip(Self._mTip,data.msg,1);
				});
				MI.Bos('btnnewFav2');
			}
		}

		for(i in Self.favData) {
			var o = Self.favData[i];
			listHtml += '<tr><td class="clsLeft">' + o.name + '</td><td class="clsRight">';
			listHtml +=  '<a gname= "' + o.name + '" groupid="' + o.id + '" href="#">' + _('删除') + '</a>';
			listHtml += '</td></tr>';
		};
		listHtml += '</tbody></table>';
		Self._mTable.innerHTML = listHtml;

		(Self.favData.length >= Self.maxNum) && UI.hide(Self._mAdd);
		
		//绑定删除分类事件
		UI.each($$(Self._mTable,'.clsRight a'),function(o){
			o.onclick = function(){
				var id = UI.A(this,'groupid'),
					gName = UI.A(this,'gname'),	
					tip = '<strong>' + _('是否删除分类"{0}',gName) + '</strong><br />' + _('删除分类不会取消收藏，被删除的分类下的收藏会重新成为未分类的收藏');
				MI.confirm({
					type : '',
					title : _('删除分类'),
					content : tip,
					confirmTxt : _('确定'),
					cancelTxt : _('取消'),
					confirm : function(){ //删除分类
						Self.remote(0,{groupid:id,op:2},function(data){
							Self.showManage();
							Self.addNewTab(data,gName);
						},function(data){
							Self.showManage();
							Self.setTip(Self._mTip,data.msg,1);
						});	
					},
					cancel : function(){
						Self.showManage();		 
					}
				});
				MI.Bos('btnDeleteFav');
				return false;	
			}	
		});

		MI.dialog.show({
			html : Self._ctrlPan,
			title : '<h1 class="DmainTit">' + _('管理分类') + '</h1>',
			start : function(){
				Self._mAddTxt.value = '';
				setTimeout(function(){
					Self._mAddTxt.focus();
				},100);	
				Self.setTip(Self._mTip,'');
			},
			end : function(){
				UI.hide(Self._mAddDetail);
				UI.show(Self._mAdd.parentNode);
			}
		});
	},
	//单独新建分类浮层
	singleNew : function(){
		var Self = this;
		if(!Self._singleNew) {
			Self._singleNew = UI.html('<div class="favManage">\
				<p><b></b>' + _('分类名称：') + '<input type="input" maxlength="16" class="inputTxt"></p>\
				<p style="color:#999">\
					<b style="padding-left:3em;"></b>' + _('1-8个中文、字母或数字,最多可建10个类') + '<br>\
				</p>\
				<p class="btnBox"><button class="btn2">' + _('确定') + '</button><button class="btn2">' + _('取消') + '</button></p>\
				<p class="tip"></p>\
				</div>')[0];

			Self._sConfirm = $$(Self._singleNew,'.btnBox .btn2')[0];
			Self._sCancel = $$(Self._singleNew,'.btnBox .btn2')[1];
			Self._sTxt = $$(Self._singleNew,'.inputTxt')[0];
			Self._sTip = $$(Self._singleNew,'.tip')[0];
			
			//新建分类
			Self._sConfirm.onclick = function(){
				var name = Self._sTxt.value;
				if(!UI.trim(name)) return false;
				Self.remote(0,{name:name,op:1},function(data){ //新建分类
					MI.dialog.hide();
					Self.addNewTab(data);
				},function(data){
					Self.setTip(Self._sTip,data.msg,1);
				})
				MI.Bos('btnNewFav3');
			}

			Self._sCancel.onclick = function(){
				MI.dialog.hide();
			}

			Self._singleNew.onclick = function(){
				Self.setTip(Self._sTip,'');
			}
		}			

		MI.dialog.show({
			html : Self._singleNew,
			title : '<h1 class="DmainTit">' + _('新建分类') + '</h1>',
			start : function(){
				setTimeout(function(){
					Self._sTxt.focus();
				},100);	
				Self._sTxt.value = '';
				Self.setTip(Self._sTip,'');
			}
		});
	}
}
