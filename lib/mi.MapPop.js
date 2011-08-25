MI.tmpl.mapPop = '<div class="mapPop"><div class="userPic"><a target="_blank" href="/<%=name%>"  title="<%=(bkname||nick).toTitle()%>(@<%=chName || name%>)"><img src="<%=pic%>" onerror="MI.Pic(this,50)" onclick=MI.Bos("btnPopHead") /></a><div class="attentBoxWrap attentBox"><input class="addAttention" type="button" style="display:none" value="立即收听" /><a class="delAttention" style="display:none" href="#">取消</a></div></div><div class="msgBox"><div class="userName" onclick=MI.Bos("btnPopUserName") rel="<%=name%>"><strong><a target="_blank" href="/<%=name%>" title="<%=(bkname||nick).toTitle()%>(@<%=chName || name%>)"><%=bkname||nick%></a>' + MIIcon('flag') + '<%=icon%>:</strong></div><div class="msgCnt"><%=content||"&nbsp;"%></div><div class="mediaWrap"><%if(image && image.length){%><%for(var j=0;j<image.length;j++){%><div class="picBox"><a target="_blank" href="/p/t/<%=id%>" class="pic"><img style="display:block;" src="<%=image[j]%>/160" onload="if(this.height>100) this.height=100;" /></a></div><%}%><%}%></div><div class="pubInfo"><span class="left"><a class="time" rel="<%=timestamp%>" href="/p/t/<%=id%>" target="_blank"><%=time%></a> <%=from%> <%=city%></span></div></div></div></div>';
/**
 * 地图气泡
 * @namespace MI.MapPop 地图气泡
 * @constructor
 * @param {Object} {zoom:Number,x:Number,y:Number,id:String,url:String,data:String,fixed:Boolean,maxNum:Number,rndTime:Number}
 *			@example
 *			MI.mapPop = new MI.MapPop({zoom:4,x:116.397428,y:39.90923,id:'mapBox',
				url:'/map/mapnews.php',data:'t=0',fixed:false,maxNum:3,rndTime:5000
 *			});
 */


MI.MapPop = function(args) {

	if(!args.id) return;
	
	var	_zoom = args.zoom || 4,			//地图缩放级别 3~13 
		_x = args.x || 39.90923,		 //地图中心点坐标经度
		_y = args.y || 116.397428,		   //地图中心点坐标纬度
		_maxNum = args.maxNum || 1,	  	//同时显示地图标记数目，至少1个
		_rndTime = args.rndTime || 3000,  	//气泡随机时间，毫秒
		_wrapId = args.id || 'mapBox',	 	//地图父容器id
		_url =  args.url || '/map/mapnews.php',	//数据来源
		_data = args.data || 'n=0',			//请求的数据种类，默认全世界
		_autoPlay =  args.autoPlay===undefined ? true : args.autoPlay,	//地图创建后是否自动拉取数据
	
		SM = soso.maps,	
		_user = {},  						//气泡数据缓存容器
		_userNum = 0,						//待显示的气泡数目
		_isFirstTime = true;				//是否第一次拉取
		_removeId = [],						//待移除的气泡id列表
		tMap = null,	   					//引用地图对象
		_pop = null,  						//引用当前气泡实例
		info = null; 						//信息窗口
		
	//创建地图	
	(function(){
		tMap = new SM.Map(document.getElementById(_wrapId), {
			animation : true, 					//是否启用地图移动/缩放动画，默认启用。
			center : new SM.LatLng(_x,_y), 		//地图中心地理坐标。
			keyBoard : true, 					//是否启用键盘操作地图功能，默认启用。
			scrollWheel : true, 				//是否启用鼠标滚轮缩放功能，默认启用。
			zoomInByDblClick : true, 			//是否启用鼠标双击放大功能，默认启用。
			zoomLevel : _zoom 					//地图缩放级别。
		});

		var navControl = new SM.NavigationControl({
			align: SM.ALIGN.TOP_LEFT,
			margin: new SM.Size(5, 15),
			style:SM.NavigationControlStyle.NORMAL, //样式包含平移和缩放按钮。
			map: tMap
			
		  });
		
		window.onresize = function(){
			tMap.notifyResize();  //通知地图其容器大小发生变化，使地图重新适应容器大小。
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
			return  new UI.tmplString(MI.tmpl.mapPop)({id:o.id,name:o.name,chName:o.chName,bkname:o.bkname,icon:o.icon,flag:o.flag,pic:o.pic,nick:o.nick,
					city:o.city,time:o.time,content:o.content,from:o.from,image:o.image,timestamp:o.timestamp});
		},
		show : function(mark){
			var Self = this;
			var html = this.buildHTML();
			if(!info) {
				info = new SM.InfoWindow({
					map : tMap,
					autoMove : true,
					animation : SM.Animation.POP
				});
			};

			info.open(html,mark);
			SM.Event.addListener(info,'domready',function(){  //信息内容加载到dom树时触发
				Self.setInfoEvent();
			});
			SM.Event.addListener(mark,'click',function(){
				info.open(html,mark);
			});
			Pop.random();
		},
		setInfoEvent : function(html,mark){
			this._body = $$(document.body,'.mapPop')[0];
			if(this._body){
				this.setEvent();
				this._body.onmouseover = function(){
					clearTimeout(Pop.delay);
				};
				this._body.onmouseout = function(){
					Pop.random();
				};
			}
		},
		setEvent : function(){ //follow事件
			var Self = this,
				_follow =  $$(Self._body,'.addAttention')[0],
				_unfollow = $$(Self._body,'.delAttention')[0],
				_close = $$(Self._body,'.close')[0];

			if(Self.name == MI.user.account) return;
			if(Self.follow) {
				UI.show(_unfollow);
				UI.hide(_follow);
			}
			else {
				UI.show(_follow);
				UI.hide(_unfollow);	
			};
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
		}
	}
	
	
	//创建气泡
	Pop.show = function(mark){
		if(_user[mark.id]) {
			_pop = new Pop(_user[mark.id]);
			_pop.show(mark);
		}
	}


	//绑定标记事件
	Pop.build = function(mark){
		if(!mark) return;
		clearTimeout(Pop.delay);
		Pop.show(mark);
		SM.Event.addListener(mark,'mouseover',function(){
			clearTimeout(Pop.delay);
		});
		SM.Event.addListener(mark,'mouseout',function(){
			Pop.random();
		});
	}

	//随机气泡
	Pop.random = function(undelay){
		clearTimeout(Pop.delay);
		var o = _user;
		var t = undelay ? 0 : _rndTime;
		if(_userNum<3) Pop.pullData();   //气泡数小于三个的时候，发新的请求
		Pop.delay = setTimeout(function(){
			for(i in o) {
				if(o[i] && !o[i].added) {   //仅展现未展现过的气泡
					Pop.addMark(o[i]);
					o[i].added = true;
					_userNum--;
					return;
				}	
			}
		},t);
	}

	//拉取数据
	Pop.pullData = function(){   //参数city，城市类型
		UI.get(_url,_data + '&r=' + MI.random(),function(data){
			data = MI.json(data);
			if(data.result == 0) {
				var o = data.info.talk;
				for(var i=o.length-1;i>=0;i--){
					if(o[i].pos=='' || o[i].pos==undefined || !o[i].pos[0] || !o[i].pos[1]) continue;
					if(!_user[o[i].id]) {
						_user[o[i].id] = o[i];
						_userNum++;
					}	
				}
				if(_isFirstTime) Pop.random(1);  //取得数据后，随机展现气泡，
			}
			else {
				setTimeout(Pop.pullData,15000); //result不为0，15秒重发。
			}
		});
	}

	//生成html点标记
	Pop.addMark = function(o){
		if (o.pos && o.pos.length){
			var icon = new SM.MarkerImage('http://mat1.gtimg.com/www/mb/images/map/mapb2_110321.png',
					new SM.Size(28,32),new SM.Point(12,35),new SM.Point(0,35)
			);

			var mark = new SM.Marker({
				map : tMap,
				position : new SM.LatLng(o.pos[1],o.pos[0]),
				icon : icon
			});
			mark.id = o.id;
			_removeId.push(mark);
			Pop.build(mark);
			if(_removeId.length > _maxNum) {
				_removeId.shift().setMap(null);
			};
		}
	}
	
	//切换城市。
	Pop.changePlace = function(data,zoom,x,y){
		clearTimeout(Pop.delay)  //停止随机冒泡
		UI.each(_removeId,function(o){
			o.setMap(null);   	//清除所有地图标记
		});	
		_removeId = [];
		_user = {};								//清空气泡数据,防止旧数据干扰
		_userNum = 0;							//待显示的气泡数目
		_isFirstTime = true;					//是否第一次拉取
		tMap.moveTo(new SM.LatLng(x*1,y*1));	//根据城市信息，重新设置中心点
		tMap.zoomTo(zoom); 						//设置缩放
		_data = data;							//更改数据请求参数
		Pop.pullData();							//拉取数据
	}
	
	if(_autoPlay) Pop.pullData();  //new MI.MapPop后自动拉取初次数据。

/**
 * 切换城市接口
 * @namespace MI.MapPop 地图气泡
 * @constructor
 * @param {Object} {data:String,zoom:Number,x:Number,y:Number}
 *			@example
 *			MI.mapPop.changePlace("n&#61;1",4,39.914850,116.403765);
 */	
	return {
		changePlace : function(data,zoom,x,y){
			Pop.changePlace(data,zoom,x,y);			  
		}
	}
}
