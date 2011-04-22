MI.tmpl.mapPop = '<div class="mapPop"><div class="ht"></div><div class="userPic"><a target="_blank" href="/<%=name%>"  title="<%=(bkname||nick).toTitle()%>(@<%=chName || name%>)"><img src="<%=pic%>" onerror="MI.Pic(this,50)" onclick=MI.Bos("btnPopHead") /></a><div class="attentBoxWrap attentBox"><input class="addAttention" type="button" value="立即收听" /><a class="delAttention" href="#">取消</a></div></div><div class="msgBox"><div class="userName" onclick=MI.Bos("btnPopUserName") rel="<%=name%>"><strong><a target="_blank" href="/<%=name%>" title="<%=(bkname||nick).toTitle()%>(@<%=chName || name%>)"><%=bkname||nick%></a>' + MIIcon('flag') + '<%=icon%>:</strong></div><div class="msgCnt"><%=content||"&nbsp;"%></div><div class="mediaWrap"><%if(image && image.length){%><%for(var j=0;j<image.length;j++){%><div class="picBox"><a target="_blank" href="/p/t/<%=id%>" class="pic"><img style="display:block;" src="<%=image[j]%>/160" onload="if(this.height>100) this.height=100;" /></a></div><%}%><%}%></div><div class="pubInfo"><span class="left"><a class="time" rel="<%=timestamp%>" href="/p/t/<%=id%>" target="_blank"><%=time%></a> <%=from%> <%=city%></span></div></div><div class="r lt"><em></em></div><div class="r rt"><em></em></div><div class="r lb"><em></em></div><div class="r rb"><em></em></div><div class="hc"></div><div class="hb"></div><div class="arr"><em></em></div><a href="javascript:void(0)" class="close"></a><div class="s"><div class="slt"><b></b></div><div class="srt"><b></b></div><div class="slb"><b></b></div><div class="srb"><b></b></div><div class="sarr"><b></b></div></div></div>';
/**
 * 地图气泡
 * @namespace MI.MapPop 地图气泡
 * @constructor
 * @param {Object} {zoom:Number,x:Number,y:Number,id:String,url:String,data:String,fixed:Boolean,maxNum:Number,rndTime:Number}
 *            @example
 *            MI.mapPop = new MI.MapPop({zoom:4,x:116.397428,y:39.90923,id:'mapBox',
				url:'/map/mapnews.php',data:'t=0',fixed:false,maxNum:3,rndTime:5000
 *            });
 */
MI.MapPop = function(args) {

	if(!args.id) return;
	
	var	_zoom = args.zoom || 4,            //地图缩放级别 3~13 
		_x = args.x || 116.397428,         //地图中心点坐标经度
		_y = args.y || 39.90923,           //地图中心点坐标纬度
		_fixed = args.fixed || false, 		//是否固定当前视野，默认不固定
		_maxNum = args.maxNum || 1,      	//同时显示地图标记数目，至少1个
		_rndTime = args.rndTime || 3000,  	//气泡随机时间，毫秒
		_wrapId = args.id || 'mapBox',     	//地图父容器id
		_url =  args.url || '/map/mapnews.php',    //数据来源
		_data = args.data || 'n=0',    		//请求的数据种类，默认全世界
		_autoPlay =  args.autoPlay===undefined ? true : args.autoPlay,	//地图创建后是否自动拉取数据
		_moveBtn = args.moveBtn===undefined ? true : args.moveBtn,    		//是否显示地图移动按钮
		
		_user = {},  						//气泡数据缓存容器
		_removeId = [],    					//待移除的气泡id列表
		_zIndex = 1,      					//气泡临时zIndex
		_box = UI.DC('div'),  				//包裹元素
		_map = null,       					//引用地图对象
		_pop = null;  						//引用当前气泡实例
		
	//创建地图	
	(function(){
		var mapOptions = new MMapOptions();				//构建地图辅助类
		mapOptions.zoom=_zoom;							//要加载的地图的缩放级别
		mapOptions.center=new MLngLat(_x,_y);			//要加载的地图的中心点经纬度坐标
		mapOptions.toolbar = _moveBtn ? SHOW : HIDE;	//设置地图初始化工具条
		mapOptions.overviewMap = HIDE; 					//设置鹰眼地图的状态，
		mapOptions.scale = SHOW;					 	//设置地图初始化比例尺状态
		mapOptions.returnCoordType = COORD_TYPE_OFFSET;//返回数字坐标
		mapOptions.zoomBox = false;						//鼠标滚轮缩放和双击放大时是否有红框动画效果。
		_map = new MMap(_wrapId,mapOptions); 			//地图初始化 绑定地图包裹元素id--mapBox
		_map.setZoomEnabled(false);  					//禁止缩放
		//_map.setDragEnabled(false);  					// 禁止拖动地图
		
		//显示地图工具条时隐藏缩放按钮
		if(_moveBtn) {
			var panZoomTool = $("panZoom");
			panZoomTool.style.overflow = 'hidden';
			panZoomTool.style.height = panZoomTool.style.width = 70 + 'px';
		}


		//解决chrome下 窗口resize时，图片消失不显示的问题，暂时没有好的办法
		if (/chrome\/(\d+\.\d)/i.test(navigator.userAgent)) {
			var tms16 = UI.G('Mapabc.Layer.TMS_16');
			if(tms16) {
				var pic = UI.children(tms16);
				UI.EA(window,'resize', function(){
					UI.each(pic,function(o){UI.show(o)});  //遍历所有图片，设为显示状态
				})
			}	
		}
		
	})();			
		
	var Pop =  function(o){
		this.name = o.name;
		this.chName = o.chName;
		this.bkname = o.bkname;
		this.nick = o.nick;
		this.pic = o.pic;
		this.icon = o.icon;
		this.flag = o.flag;
		this.city = o.city;
		this.pos = o.pos; 
		this.time = o.time;
		this.timestamp = o.timestamp;
		this.content = o.content;
		this.from = o.from;
		this.image = o.image;
		this.id = o.id;
		this.follow = o.follow;
	}
	
	Pop.prototype = {
		_body : null,
		buildHTML : function(){  //根据模板，生成气泡html
			var o = this;
			var id = o.id.substring(4);  //去掉id前面的'mbox'四个字母 
			return  new UI.tmplString(MI.tmpl.mapPop)({id:id,name:o.name,chName:o.chName,bkname:o.bkname,icon:o.icon,flag:o.flag,pic:o.pic,nick:o.nick,
					city:o.city,time:o.time,content:o.content,from:o.from,image:o.image,timestamp:o.timestamp});
		},   
		show : function(el){
			Pop.random();
			var eid = el.parentNode.id;
			this._body = _box;
			//UI.hide(this._body);  //隐藏父元素
			this._body.innerHTML = this.buildHTML();
			UI.append(this._body,el);
			this.setEvent();
			UI.show(this._body);
			this.setPos(el);
		},
		hide : function(){
			UI.hide(this._body);
		},
		remove : function(id){
			if(!id) return;
			_map.removeOverlayById(id);
			_removeId.shift();
			//delete _user[id];
		},
		setEvent : function(){
			var Self = this,
				_follow =  $$(Self._body,'.addAttention')[0],
				_unfollow = $$(Self._body,'.delAttention')[0],
				_close = $$(Self._body,'.close')[0];

			if(Self.name == MI.user.account){
				UI.hide(_follow);
				UI.hide(_unfollow);
			}
			else if(Self.follow) {
				UI.show(_unfollow);
				UI.hide(_follow);
			}
			else {
				UI.show(_follow);
				UI.hide(_unfollow);	
			};
			_close.onclick = function(e) {
				UI.E(e).stop();
				Self.hide();
			}
			_follow.onclick = function(e){
				UI.E(e).stop();
				var account = Self.name,T = this;
				MI.follow(account,T,function(isFollow){
					UI.hide(_follow);
					UI.show(_unfollow);
					_follow.className = 'addAttention';
					for(var i in _user) {
						if(o[i].name == account) o[i].follow = 1;
					}
					MI.Bos('btnPopFollow');
				});
			}
			_unfollow.onclick = function(e) {
				UI.E(e).stop();
				var account = Self.name,T = this;
				MI.follow(account,T,function(isFollow){
					UI.hide(_unfollow);
					UI.show(_follow);
					_unfollow.className = 'delAttention';
					for(var i in _user) {
						if(o[i].name == account) o[i].follow = 0;
					}
					MI.Bos('btnPopUnFollow');
				});
			}

		},
		setPos : function(el){
			var Self = this;
			
			//气泡定位
			var p = UI.G("mapBox_Mapabc_Container"),  	//地图wrap
				mapWrap = UI.G(_wrapId),          		//地图可见wrap
				mapHeight = UI.height(mapWrap),
				mapWidth = UI.width(mapWrap),
				left = parseInt(el.parentNode.style.left) + parseInt(p.style.left),
				top = parseInt(el.parentNode.style.top) + parseInt(p.style.top),
				_mapPop = $$(Self._body,'.mapPop')[0],
				height = UI.height(_mapPop),   
				t = top < height + 99 ? height + 99 - top : 0, //箭头高度+标记高度 99
				l = left -95 < 0 ? 95 - left : 0; 			 //气泡左侧相对标记偏移95
				
			if(UI.B.ie6) {	
				UI.addClass(_mapPop,'fixie6');
				UI.removeClass(_mapPop,'fixie6');	
				$$(_mapPop,'.hb')[0].style.height = height % 2 == 1 ? 10 + 'px' : 11 + 'px'; //修复ie6下绝对定位一像素的bug	
			}	
				
			t = top > mapHeight ? mapHeight - top : t;   			//30是标记点的高度
			l = left + 380 > mapWidth ? mapWidth - left  -380 : l;  //气泡右侧相对标记距离380
			if(!_fixed) _map.panBy(new MSize(-l,-t),100,SLIDING_EXPO); //移动地图中心
			
			
			//投影设置
			var _s = $$(Self._body,'.s')[0],
				_slt = $$(_s,'.slt')[0],
				_srb = $$(_s,'.srb')[0],
				sh = Math.ceil((height)*0.6),  //设置投影高度为气泡高度(不包括箭头和圆角)的0.6倍，数值可调，无所谓
				w = 420 + sh;   //固定投影可见底部宽度420px，数值可调无所谓

			sh = sh%2 == 1 ? sh + 1 : sh;  //解决chrome下高度四舍五入后渲染的偏差
			w = w%2 == 1 ? w + 1 : w;
			_s.style.width = w + 'px';
			_s.style.height = sh + 'px';
			_slt.getElementsByTagName("b")[0].style.marginLeft = sh + 'px';  //光线45度角，设置投影偏移量等于投影高度
			_srb.getElementsByTagName("b")[0].style.marginRight = sh + 'px';
			
			//图片onload后 重设定位,如果已经load完，不需要设
			if(Self.image && Self.image.length) {
				UI.each($$(Self._body,'.mediaWrap img'),function(o){
					UI.EA(o,'load',function(){
						if(_pop == Self) Self.setPos(el);
					})
				})
			}
		
		
		}
	}
	
	
	//创建气泡
	Pop.show = function(el){
		if(!el) return;
		var w = el.parentNode;
		if(w == (_box.parentNode && _box.parentNode.parentNode)) {
			UI.show(_box);
			Pop.random();
			return;
		}
		w.style.overflow = 'visible';
		w.style.zIndex = ++_zIndex;
		if(_user[w.id]) {
			_pop = new Pop(_user[w.id]);
			_pop.show(el);
			return; 
		}
	}


	//绑定标记事件
	Pop.build = function(el){
		if(!el) return;
		clearTimeout(Pop.delay);
		UI.EA(el,'click',function(){
			Pop.show(el);
			MI.Bos('btnMapMark')  //点击地图标记
		});
		UI.EA(el,'mouseover',function(){
			clearTimeout(Pop.delay);
			el.parentNode.style.zIndex = ++_zIndex;
		});
		UI.EA(el,'mouseout',function(){
			 Pop.random();
			 if(el.parentNode != _pop) el.parentNode.style.zIndex = --_zIndex;
		});
		Pop.show(el);
	}

	//随机气泡
	Pop.random = function(){
		clearTimeout(Pop.delay);
		var o = _user;
		Pop.delay = setTimeout(function(){
			for(i in o) {
				if(o[i] && !o[i].added) {   //仅展现未展现过的气泡
					o[i].added = true;
					Pop.addMark(o[i]);
					return;
				}	
			}
			Pop.pullData();   //所有气泡都展现完毕后，发新的请求
		},_rndTime)
	}

	//拉取数据
	Pop.pullData = function(){   //参数city，城市类型
		UI.get(_url,_data + '&r=' + MI.random(),function(data){
			data = MI.json(data);
			if(data.result == 0) {
				var o = data.info.talk;
				for(var i=o.length-1;i>=0;i--){
					o[i].id = 'mbox' + o[i].id;
					if(!_user[o[i].id]) {
						_user[o[i].id] = o[i];
					}	
				}
				Pop.random();  //取得数据后，随机展现气泡，
			}
			else {
				setTimeout(Pop.pullData,15000); //result不为0，15秒重发。
			}
		});
	}

	//生成html点标记
	Pop.addMark = function(o){
		if (o.pos && o.pos.length){
			var opt = new MBoxOptions();
			opt.content = '<div class="selPoint"><em class="markPoint"></em></div>';
			var box = new MBox(new MLngLat(o.pos[0]*1,o.pos[1]*1),opt);
			box.id = o.id;
			_map.addOverlay(box,false);
			_removeId.push(o.id);   //加入待移除列表
			if(_removeId.length > _maxNum) _pop.remove(_removeId[0]);  //移除前一个地图覆盖物
			var el = $$($(box.id),'.selPoint')[0];
			Pop.build(el);
		}
	}
	
	//切换城市。
	Pop.changePlace = function(data,zoom,x,y){
		clearTimeout(Pop.delay)  //停止随机冒泡
		zoom = zoom || _zoom;
		Pop.user = {}; //清空气泡数据,防止旧数据干扰
		_map.clearMap();   //清除所有覆盖物
		_map.setZoomEnabled(true); //设置允许地图缩放
		if(x && y) _map.setZoomAndCenter(zoom,new MLngLat(x,y))   //根据城市信息，重新设置中心点和缩放
		_map.setZoomEnabled(false) //设置禁止地图缩放
		_data = data;				//更改数据请求参数
		Pop.pullData();				//拉取数据
	}
	
	if(_autoPlay) Pop.pullData();  //new MI.MapPop后自动拉取初次数据。
	
	//MI.MapPop实例接口
	/*this.setZoomLeave = function(z){
		_map.setZoomLeave(z);
	}
	this.setCenter = function(x,y){
		_map.setCenter(new MLngLat(x,y));
	}
	this.setZoomAndCenter = function(z,x,y) {
	}
	this.changePlace = Pop.changePlace;*/
	
	return {
/**
 * 缩放地图
 * 
 * @param {Number} Number 缩放级别 
 *            @example
 *			  zoom的范围在3到13之间，3视野是全世界。
 *            MI.mapPop.setZoom(10);
 */
		setZoom : function(zoom) {
			_map.setZoomEnabled(true); 
			_map.setZoomLeave(zoom);
			_map.setZoomEnabled(false); 
		},
		
/**
 * 移动地图中心到到指定经纬度
 * 
 * @param {Number} Number 经度
 * @param {Number} Number 纬度 
 *            @example
 *            MI.mapPop.setCenter(116.454564,39.456454);
 */
		setCenter : function(x,y){
			_map.setCenter(new MLngLat(x,y));
		},
/**
 * 移动地图中心到到指定经纬度同时缩放地图
 * 
 * @param {Number} Number 缩放级别
 * @param {Number} Number 经度
 * @param {Number} Number 纬度 
 *            @example
 *            MI.mapPop.setCenter(116.454564,39.456454);
 */		

		setZoomAndCenter : function(zoom,x,y){
			_map.setZoomEnabled(true); 
			_map.setZoomAndCenter(zoom,new MLngLat(x,y));
			_map.setZoomEnabled(false); 
		},
/**
 * 更改数据请求来源
 * 
 * @param {String} String  
 *            @example
 *            MI.mapPop.setUrl('/map/mapnews.php');
 */
		setUrl : function(url){
			_url = url || _url;
		},
/**
 * 更改数据请求参数
 * 
 * @param {String} String  
 *            @example
 *            MI.mapPop.setUrl('n=1');
 */
		setData : function(data) {
			_data = data || _data
		},
/**
 * 切换地图中心，缩放，数据请求参数，并且清空地图覆盖物data,zoom,x,y
 * 
 * @param {String} String 请求参数
 * @param {Number} Number 缩放级别
 * @param {Number} Number 经度
 * @param {Number} Number 纬度 
 *            @example
 *            MI.mapPop.changePlace('n=1&s=2',10,115.456445,38.45644);
 */			
		changePlace : Pop.changePlace
	}
}



