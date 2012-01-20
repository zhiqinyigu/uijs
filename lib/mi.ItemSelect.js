(function(){
/**
 * ID获取DOM
 * 
 * @param {String} String DOM的ID
 * @return {Object} Object DOM对象
 *            @example
 *            var talkBox = $('talkBox');
 */
var $ = UI.G;
/**
 * CSS路径获取DOM
 * 
 * @param {String} String DOM的CSS路径
 * @return {Array} Array DOM对象的数组
 *            @example
 *            var talkBox = $$('#talkBox')[0];
 *            var heads = $$('.LC .userPic img');
 */
var $$ = UI.GC;
if (!(window.MIApp && !window.MIApp.lib)){
	window.$ = UI.G;
	window.$$ = UI.GC;
}
/*
 * 成员选择js
 * type参数为类型，0 表示双列，参见点名页，1 表示单列下拉
 * 如果结构和默认html不一致，建议覆盖getBody方法
 * 列表项结构和数据不同建议覆盖refresh方法
 * 后台拉取列表数据接口格式不同，建议覆盖dataHandler方法
 * @author sapjax(609004948@qq.com)
 * @constructor
 * @param {Object} 配置对象
 * @example 
 * MI.select = new MI.ItemSelect({
 *			type : 1,
 *			splitStr : ' ',
 *			target : $('inputBox'),
 *			dataUrl : 'http://t.qq.com/asyn/userFriends.php?',
 *			queryData : {u:MI.user.account,t:1},
 *			noResultTip : _('你还没有数据')
 *		});
 */ 
MI.ItemSelect = function(opt){
	//关键参数
	this.type = opt.type || 0;									//类型 0：双列,1:下拉
	this.target = opt.target;									//目标位置（或者输入框）
	this.dataUrl = opt.dataUrl;									//搜索数据来源url
	this.queryData = opt.queryData || {}; 						//拉取参数
	this.max = opt.max || 5;									//最大已选择数目
	this.splitStr = opt.splitStr || ',';						//下拉类型的输入框文本分隔字符
	this.ajaxType = opt.ajaxType || 'get';						//数据拉取方式
	this.bodyClass = opt.bodyClass|| 'selectBox'; 				//主结构class，用于css
	this.itemType = opt.itemType || _('人');					//选择的类型
	this.body = opt.body || this.getBody();						//目标结构
	this.maxHeight = opt.maxHeight || 195;						//下拉类型列表最大高度
	this.noSearchTip = opt.noSearchTip || _('没有搜索到结果');  //没有搜索结果提示
	this.noResultTip = opt.noResultTip || _('还没有成员');		//拉取空数据提示
	this.defaultValue = opt.defaultValue;						//搜索框默认文本(双列)
	this.awaysSetPos = opt.awaysSetPos || 0; 					//是否总是调整位置(双列)
	
	//可选class配置
	this.selectedClass = opt.selectedClass || 'selectedList';	//已选择的列表class
	this.unSelectedClass = opt.unSelectedClass || 'unSelectList';//未选择的列表class
	this.itemClass = opt.itemClass || 'unSelectItem';			//未选择列表元素class
	this.itemTag = opt.itemTag || 'li';							//列表元素标签 
	this.deleteClass = opt.deleteClass || 'delete';				//已选择列表元素删除按钮class
	this.searchClass = opt.searchClass || 'searchInput';		//搜索框class
	this.selectedTipClass = opt.selectedTipClass || 'selectedTip';//已选择数目提示
	this.overflowTipClass = opt.overflowTipClass || 'overflowTip';//超出最大数提示
		
	//以下为非自定义属性	
	this.grayClass = 'placeholder';									//输入框置灰
	this.hoverClass = 'hover';									//鼠标悬浮class
	this.closeClass = 'close';									//关闭按钮
	this.attrName = 'data-account';								//自动绑定的id属性

	this.fullData = {};											//拉取的全部数据
	this.searchData = {};										//保存当前搜索筛选的数据
	this.selected = {data:{},body:null,num:0};					//已选择模块对象
	this.unSelected = {data:{},body:null};						//未选择对象
	
	this.init();
}

MI.ItemSelect.prototype = {
	//初始化
	init : function(){
		var Self = this;
		Self.selected.body = $$(Self.body,'.' + Self.selectedClass)[0];
		Self.unSelected.body = $$(Self.body,'.' + Self.unSelectedClass)[0];
		Self.searchInput = $$(Self.body,'.' + Self.searchClass)[0] || Self.target;
		Self.selectedTip = $$(Self.body,'.' + Self.selectedTipClass)[0];
		Self.overflowTip = $$(Self.body,'.' + Self.overflowTipClass)[0];
		Self.close = $$(Self.body,'.' + Self.closeClass)[0];
		
		if(Self.type == 1) {
			UI.append(Self.body,document.body);
			Self.queryList = [];
			Self.setPos(Self.target);
			Self.unSelected.body.style.maxHeight = Self.maxHeight + 'px';
		} else {
			UI.append(Self.body,Self.target);
			Self.show();
			Self.pullData();
		} 
		Self.bindEvent();
	},
	//事件绑定
	bindEvent : function(){
		var Self = this;
		//选择
		Self.unSelected.body.onclick = function(e) {
			var p = UI.E(e).target;
			p = UI.hasClass(p,Self.itemClass) ? p : UI.parents(p,Self.itemClass)[0];
			if(p) {
				Self.unSelectEvent(UI.A(p,Self.attrName));
				Self.autoFocus();
				UI.removeClass(Self.searchInput,Self.grayClass);
			}	
		}
		//删除	
		Self.selected.body.onclick = function(e) {
			var p = UI.E(e).target;
			p = UI.hasClass(p,Self.itemClass) ? p : UI.parents(p,Self.itemClass)[0];
			if(p) {
				Self.selectEvent(UI.A(p,Self.attrName));
			}	
		}
		Self.unSelected.body.onmouseover  = Self.selected.body.onmouseover = function(e) {
			var p = UI.E(e).target;
			p = UI.hasClass(p,Self.itemClass) ? p : UI.parents(p,Self.itemClass)[0];
			if(p){
				UI.addClass(p,Self.hoverClass);
			}	
		}
		Self.unSelected.body.onmouseout  = Self.selected.body.onmouseout = function(e) {
			var p = UI.E(e).target;
			p = UI.hasClass(p,Self.itemClass) ? p : UI.parents(p,Self.itemClass)[0];
			if(p){
				UI.removeClass(p,Self.hoverClass);
			}	
		}
		//此处需要修改，可能重复执行
		Self.searchInput.oninput = Self.searchInput.onpropertychange = function(e){
			clearTimeout(Self.searchDelay);
			if(UI.B.ie && (Self.searchInput.value == Self.lastValue)) return; //避免ie空触发
			Self.searchDelay = setTimeout(function(){
				if(Self.searchInput.value != Self.searchInput.defaultValue) {
					if(Self.type == 1)  {
						Self.show();
						Self.queryList = Self.searchInput.value.replace(/@/g,'').split(Self.splitStr);
						Self.refreshSearchData(Self.queryList);
						if(Self.queryList.length) Self.search(Self.getEditingValue());
					} else {
						Self.search(Self.searchInput.value);
					}	
				}
				Self.lastValue = Self.searchInput.value;
			},100);	
		}
		//解决ie9以下首字符不触发
		if(UI.B.ie) Self.searchInput.onkeyup = Self.searchInput.onpropertychange;
		
		Self.searchInput.onfocus = function(){
			if(this.value == this.defaultValue){
				this.value = '';
				UI.removeClass(this,Self.grayClass);
			}
			if((Self.type == 1)) {
				if(!Self.pulled) Self.pullData();
				Self.show();
			}
		}	
		Self.searchInput.onblur = function(){
			clearTimeout(Self.placeDelay);
			var that = this;
			Self.placeDelay = setTimeout(function(){
				if(!UI.trim(that.value)){
					that.value = that.defaultValue;
					UI.addClass(that,Self.grayClass);
				}
			},300);
		}
		
		if(Self.type == 1) {
			Self.close.onclick = function(){
				Self.hide();
				return false;
			}
			UI.EA(document.body,'click',function(){
				Self.hide();	
			});
			UI.EA(Self.body,'click',function(e){
				UI.E(e).stop();
			});
			UI.EA(Self.searchInput,'click',function(e){
				UI.E(e).stop();	
			});
		}
		Self.bindKeyboardEvent(Self.searchInput);
	},
	//Self.searchInput.focus();
	autoFocus : function() {
		var Self = this;
		try {
			MI.selectTxt(Self.searchInput,Self.searchInput.value.length,Self.searchInput.value.length);
		} catch(e) {};	
	},
	//选中某个关联操作
	unSelectEvent : function(id){
		var Self = this;
		clearTimeout(Self.placeDelay);
		if(!id) return;
		Self.add(id);
		Self.doSelect(id);
		if(Self.type !=1) {
			Self.refresh(Self.selected);
		} else {
			Self.searchInput.value = Self.getResultValue(id) + Self.splitStr;
			
		}
		Self.refresh({body:Self.unSelected.body,data:Self.searchData});
		Self.showTip();
		if(Self.itemList && !Self.itemList.length) { //选择完最后一个，自动开始搜索
			Self.search('');	
		}
		if(Self.refreshDataEvent) Self.refreshDataEvent(Self.selected.data);
	},
	//删除选中某个关联操作	
	selectEvent : function(id) {
		var Self = this;
		if(!id) return;
		Self.unSelected.data[id] = Self.selected.data[id];
		Self.searchData[id] = Self.selected.data[id];
		Self.del(id);
		if(Self.type == 1) Self.searchInput.value = Self.getResultValue(id) + Self.splitStr;
		if(Self.type !=1) Self.refresh(Self.selected);
		Self.refresh({body:Self.unSelected.body,data:Self.searchData});
		Self.showTip();
	},
	/**
	 * 还原所有数据到未选择状态
	 *
	 *  @example
	 *		var o = new MI.ItemSelect({...});
	 *		o.resetAllData();
	 *
	 */	
	resetAllData : function(){
		var Self = this;
		UI.each(Self.selected.data,function(o,id){
			Self.del(id);
		});	
		Self.showTip();
	},
	//选中某个到右侧
	doSelect : function(id){
		var Self = this;
		if(!Self.unSelected.data[id]) return false;
		delete Self.unSelected.data[id];
		delete Self.searchData[id];
	},
	//添加到已选中
	add : function(id){
		var Self = this;
		if(Self.selected.data[id]) return false;
		Self.selected.data[id] = Self.unSelected.data[id];
		Self.selected.num++;
	},
	//从已选中删除
	del : function(id){
		var Self = this;
		if(!Self.selected.data[id]) return false;
		Self.unSelected.data[id] = Self.selected.data[id];
		delete Self.selected.data[id];
		Self.selected.num--;
	},
	//搜索
	search : function(key){
		var Self = this;
		Self.searchData = {};
		key = key.replace(/@/g,'');
		if(key in Self.selected.data) {
			Self.showTip();
			return false;
		}
		key = key.toLowerCase();
		UI.each(Self.unSelected.data,function(o,i){
			if(o.name.toLowerCase().hasString(key) || o.nick.toLowerCase().hasString(key)){
				Self.searchData[o.name] = o;
			}
		})
		Self.refresh({body:Self.unSelected.body,data:Self.searchData});
		clearTimeout(Self.selectFirstDelay);
		Self.selectFirstDelay = setTimeout(function(){
			Self.itemList = UI.GT(Self.unSelected.body,Self.itemTag);
			Self.setIndex(0);
		},200);	
		Self.showTip();
	},
	//根据输入框操作刷新选择和未选择列数据
	refreshSearchData : function(queryList){
		if(!queryList.length) return;
		var Self = this;
		UI.each(queryList,function(query){
			if(query == Self.splitStr) return;
			if(query in Self.unSelected.data) {
				Self.add(query);
				Self.doSelect(query);	
			};
		});			
		UI.each(Self.selected.data,function(o,id){
			var exist = false;
			UI.each(queryList,function(query){
				if(query == Self.splitStr) return;
				if(query == id) exist = true;
			});
			if(!exist) 	Self.del(id);
		});
		Self.showTip();
		if(Self.refreshDataEvent) Self.refreshDataEvent(Self.selected.data);
	},
	//检查输入框中是否已有此id
	checkInputValue : function(queryList,id){
		var Self = this;
		var num = 0;
		UI.each(queryList,function(o){
			if(o == id) num++;
		});
		return num;		
	},
	//返回选择操作的最后结果
	getResultValue : function(id) {
		var Self = this;
		var tmpArr = [];
		UI.each(Self.selected.data,function(o,i){
			if(o) tmpArr.push('@' + o.name);
		});
		return tmpArr.join(Self.splitStr);	
	},
	//获取正在输入的字符
	getEditingValue : function(){
		var Self = this;
		var text = Self.searchInput.value;
		var cursorX = MI.cursorX(Self.searchInput);
		var tmpStr = text.substring(0,cursorX);
		var str = tmpStr.substring(tmpStr.lastIndexOf(Self.splitStr) + 1);
		return str.replace(/@/g,'');
	},
	bindKeyboardEvent : function(input){
		var Self = this;
		Self.curr = 0;
		UI.EA(input,'keydown',function(e){
			Self.itemList = Self.itemList || UI.GT(Self.unSelected.body,Self.itemTag);
			if(!Self.itemList.length) return;
			if(!Self.display) return true;
			Self.liHeight = Self.liHeight || UI.height(Self.itemList[0]);
			var E = UI.E(e),index = Self.curr,maxNum = Self.itemList.length - 1;
			
			//up down
			if(E.key == 38 || E.key == 40){
				if (E.key == 38) {
					index--
				}
				else if (E.key == 40) {
					index++;
				}
				if (index < 0) {
					index = maxNum;
				}
				else if (index > maxNum) {
					index = 0;
				}
				Self.setIndex(index);
				E.prevent();
			}
			//Enter
			else if (E.key == 13 && Self.curr>=0) {
				Self.unSelectEvent(UI.A(Self.itemList[Self.curr],Self.attrName));
				Self.setIndex(Self.curr);
				Self.autoFocus();
				E.prevent();
			}
		});
		
		//ESC
		UI.EA(input,'keyup',function(e){
			var E = UI.E(e);
			if(E.key == 27) {
				clearTimeout(Self.searchDelay);
				Self.hide();
				E.prevent();
			};
		})
	},
	//设定结果列表当前项
	setIndex : function(index){ 
		var Self = this;
		if(!Self.itemList.length) return;
		if(Self.curr>=0) UI.removeClass(Self.itemList[Self.curr],Self.hoverClass);
		UI.addClass(Self.itemList[index],Self.hoverClass);
		Self.unSelected.body.parentNode.scrollTop = (index+1)*Self.liHeight - 100;
		Self.curr = index;
	}, 
	//拉取数据
	pullData : function(call){
		var Self = this;
		if(Self.pulled) return;
		MI.ajax({
			url : Self.dataUrl,
			type : Self.ajaxType,
			data : Self.queryData,
			success : function(data){
				data = MI.json(data);
				if(data.result == 0 && data.info) {
					Self.unSelected.data = Self.fullData = Self.searchData = Self.dataHandler(data.info);
					Self.pulled = 1;
					Self.refresh(Self.unSelected);
					if(call) call(Self.fullData);
				}
			}
		});
	},
	//处理数据,数据为空
	dataHandler : function(info){
		var Self = this;
		var	tmpData = {};
		UI.each(info,function(o,i){
			tmpData[o.name] = o;
			Self.hasData = 1;
		});
		return tmpData;
	},
	setRightTip : function(txt) {
		var Self = this;
		Self.overflowTip.innerHTML  = txt;
		UI.show(Self.unSelected.body);
		UI.removeClass(Self.overflowTip,Self.overflowTipClass);	
	},
	setErrorTip : function(txt){
		var Self = this;
		Self.overflowTip.innerHTML = txt;
		UI.hide(Self.unSelected.body);
		UI.addClass(Self.overflowTip,Self.overflowTipClass);
	},
	//提示处理
	showTip : function(){
		var Self = this;
		var total = _('已选择{0}',Self.selected.num) + Self.itemType;
		var overflow = _('已超出{0}',Self.selected.num - Self.max) + Self.itemType;

		if(Self.type == 1) {
			if(Self.unSelected.body.innerHTML.hasString(Self.noSearchTip)) {
				Self.setErrorTip(Self.noSearchTip);
			} else if(Self.selected.num > Self.max) {
				Self.setErrorTip(overflow)
			} else {
				Self.setRightTip(total)
			}	 
		} else {
			Self.selectedTip.innerHTML = Self.selected.num ? total : '';
			Self.overflowTip.innerHTML = (Self.selected.num > Self.max) ? overflow : '';
		}
	},
	show : function(){
		var Self = this;
		Self.awaysSetPos && Self.setPos(Self.searchInput);
		Self.body.style.display = 'block';
		Self.display = 1;	
	},
	hide : function(){
		var Self = this;
		if(Self.type != 1) return false;
		UI.hide(Self.body);
		Self.display = 0;
	},
	setPos : function(target){
		var Self = this;
		Self.body.style.cssText = "left:" + (UI.getX(target) + 1) + 'px;top:' + (UI.getY(target) -  2 + UI.height(target)) + 'px;width:' + UI.width(target) + 'px;';	
	},
	//刷新结构
	refresh : function(obj){
		var Self = this;
		var temp = '<li data-account="<%=name%>" class="' + Self.itemClass + '"><a><img src="<%=url%>/20"></a><p class="friendName"><%=nick%><em>(@<%=name%>)</em></p><span class="ico_indetail delete">X</span></li>';
		var html = '';
		UI.each(obj.data,function(o,i){
			html += UI.tmplString(temp)(o);
		});	
		obj.body.innerHTML =  (!html && (obj.body == Self.unSelected.body)) ? 
			'<div class="empty">' + (Self.hasData ?  Self.noSearchTip : (Self.pulled ? Self.noResultTip : _('数据加载中...'))) + '</div>' : 			 html.replace(/src="\/20"/gi,'src="http://mat1.gtimg.com/www/mb/images/head_20.jpg"'); //处理无头像
		
		//兼容ie6最大高度
		if((Self.type == 1) && UI.B.ie6 && (obj.body == Self.unSelected.body)) {
			var h = UI.height(Self.unSelected.body);
			Self.unSelected.body.style.height = h > Self.maxHeight ? Self.maxHeight + 'px' : 'auto';
		}
	},	
	//默认结构html
	getBody : function(){
		var Self = this,
			dvalue = Self.defaultValue || _('输入姓名/ID搜索'),
			dTip = Self.dTip || _('已选择0{0}',Self.itemType),
			html = '<div class="itemSelect ' + Self.bodyClass + ' ' + (Self.type == 1 ? 'selectDropList' : '') + '" style="display:">\
			    <div class="inviteFriend">\
			        <div class="searchBox clear">\
			            <div class="searchLeft">\
							' + (Self.type == 1 ? '<div><span class="overflowTip">请选择好友</span><a class="close" title="关闭"></a></div>' : '<input type="submit" value="' + _('搜索') + '" class="inputBtn"><input type="text" class="inputTxt searchInput" autocomplete="off" maxlength="50" id="qunsearchKey" value="' + dvalue + '" name="content">') + '\
			            </div>\
			        </div>\
			    </div>\
			    <div class="friendList">\
			        <ul class="unSelectList"><div class="empty"></div></ul>\
			    </div>\
			    <div class="selectedNum">\
			        <h4><span class="cSign overflowTip"></span><span class="selectedTip">' + dTip + '</span></h4>\
			         <div class="friendList">\
			            <ul class="selectedList"></ul>\
			         </div>\
			    </div>\
			</div>';
		return UI.html(html)[0];
	}		
};

})();