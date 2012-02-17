/*
 * 微博前端API配置
 * Demo：http://www.qq.com/mb/mat1/mb/js/demo.html
 * JS: http://www.qq.com/mb/mat1/mb/js/mi.api.js
 * CSS: http://www.qq.com/mb/mat1/mb/css/style.api.css
 */
MIApp = {};
/*
 * 微博前端API ID申请
 * 负责人RTX：xxx
 * PV量：10万
 * 使用功能：礼物
 * 域名：xxx.qq.com
 */
MIApi = {
	init : function(o){ //初始化
		//API ID
		window.MIApiId = o.id;
		MI.api.type = MIApiId;
		
		//用户信息
		if (o.user){
			for (var i in o.user){
				if (UI.isObject(o.user[i])){ //对象，如MI.user.fun
					for (var j in o.user[i]){
						MI.user[i][j] = o.user[i][j];
					}
				}
				else {
					MI.user[i] = o.user[i];
				}
			}
		}
	},
	1001 : {
		//rtx : 'xhlv',
		//pv : '1000',
		//fun : 'Demo',
		host : 'www.qq.com'
	},
	1002 : {
		//rtx : 'saralau',
		//pv : '10w',
		//fun : '礼物',
		host : 'view.news.qq.com'
	},
	1003 : {
		//rtx : 'saralau',
		//pv : '10w',
		//fun : '礼物',
		//url : 'http://z.t.qq.com/zhufu/index.htm',
		host : 'z.t.qq.com'
	},
	1004 : {
		//rtx : 'gionouyang',
		//pv : '75w/250w',
		//fun : '导航',
		host : 'app.t.qq.com'
	},
	1005 : {
		//rtx : 'terryye',
		//pv : '1000W以内 目前约100W',
		//fun : '@好友',
		//url : 'http://vip.qq.com/11years/finger',
		host : 'vip.qq.com'
	},
	1006 : {
		//rtx : 'neobai',
		//pv : '200W',
		//fun : '导航',
		//url : '',
		host : 'tshop.qq.com'
	}
};
setTimeout(function(){
	if (!window.MIApiId || (window.MIApiId && (!MIApi[MIApiId] || (MIApi[MIApiId] && (MIApi[MIApiId].host && MIApi[MIApiId].host != document.location.host))))){
		alert('请@xhlv申请微博前端API ID及相关文档！');
	}
},1000);
window.UI && UI.getCss('http://www.qq.com/mb/mat1/mb/css/style.api.css');